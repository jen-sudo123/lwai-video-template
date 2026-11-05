#!/usr/bin/env python3
"""Remove the sliding VEED free-plan watermark from a 1920x1080 export.

The watermark is a white-filled, grey-outlined "VEED" logo (~364x82 px) that sits
in one of four corners (bands y=20..102 top or y=977..1059 bottom) and slides
horizontally between them every 30 s.

Method per frame:
  1. Locate the watermark in the top and bottom bands by template matching
     (frame padded horizontally so partially off-screen positions match).
  2. Build a mask of the filled logo shape at that position.
  3. Fill: result = plate + inpaint(frame - plate). Over static content (white
     corners, burned-in logo) this restores the plate exactly; over moving UI
     it interpolates smoothly.

Usage: remove-veed-watermark.py in.mp4 out.mp4 [--plate-a T] [--plate-b T] [--tpl-time T]
  --tpl-time : time (s) of a frame where the watermark sits top-right on pure white (default 2)
  --plate-a  : time of a frame whose non-TR corners are clean background (default 2)
  --plate-b  : time of a frame whose TR corner is clean background (default 10)
Requires: opencv-python-headless, numpy, ffmpeg.
"""
import argparse, subprocess, sys
import cv2, numpy as np

ap = argparse.ArgumentParser()
ap.add_argument('inp'); ap.add_argument('out')
ap.add_argument('--tpl-time', type=float, default=2.0)
ap.add_argument('--plate-a', type=float, default=2.0)
ap.add_argument('--plate-b', type=float, default=10.0)
ap.add_argument('--first-hop', type=int, default=133, help='last rest frame before the first corner hop')
ap.add_argument('--max-frames', type=int, default=0)
ap.add_argument('--debug', default=None, help='write per-frame detections to this file')
a = ap.parse_args()

cap = cv2.VideoCapture(a.inp)
fps = cap.get(cv2.CAP_PROP_FPS); W = int(cap.get(3)); H = int(cap.get(4)); N = int(cap.get(7))

def grab(t):
    cap.set(cv2.CAP_PROP_POS_FRAMES, int(round(t * fps))); ok, f = cap.read(); assert ok; return f

# --- template + filled mask from the top-right reference frame
ref = cv2.cvtColor(grab(a.tpl_time), cv2.COLOR_BGR2GRAY)
ys, xs = np.where(ref[:200, W // 2:] < 252)
X0, X1, Y0, Y1 = xs.min() + W // 2, xs.max() + W // 2, ys.min(), ys.max()
P = 4
tx0, ty0 = X0 - P, Y0 - P
tpl = ref[ty0:Y1 + P + 1, tx0:X1 + P + 1].astype(np.float32)
th, tw = tpl.shape
outline = (tpl < 252).astype(np.uint8)
# fill letter interiors: everything not reachable from the border
ff = outline.copy() * 255; h2 = np.zeros((th + 2, tw + 2), np.uint8)
cv2.floodFill(ff, h2, (0, 0), 128)
shape = (ff != 128).astype(np.uint8)
shape_mv = cv2.dilate(shape, np.ones((7, 25), np.uint8))  # motion-blurred slide frames
shape = cv2.dilate(shape, np.ones((7, 7), np.uint8))
print(f'template {tw}x{th} at ({tx0},{ty0})', file=sys.stderr)

# --- clean background plate
plate = grab(a.plate_a).copy()
pb = grab(a.plate_b)
plate[:ty0 + th + 20, W // 2:] = pb[:ty0 + th + 20, W // 2:]


# --- deterministic schedule (VEED free-plan watermark, observed on 1920x1080 exports)
# Rest corners cycle TR -> TL -> BR -> BL every 900 frames (30 s @30fps).
# Each hop takes 13 frames: slide out toward the nearer edge (5 frames), 2 hidden, slide in (6 frames).
XR, XL = tx0, 16          # template-x at rest: right corners / left corners
YT, YB = 15, 972          # template-y: top band / bottom band
OUT_R = [1542, 1568, 1616, 1697, 1817]       # x offsets sliding off the right edge
OUT_L = [5, -20, -68, -149, -268]            # sliding off the left edge
CORNERS = [('R', YT), ('L', YT), ('R', YB), ('L', YB)]  # TR, TL, BR, BL
FIRST, PERIOD = a.first_hop, 900

def positions(i):
    """List of (x, y, moving) watermark placements for frame i."""
    k, r = divmod(i - FIRST, PERIOD)    # hop k starts after frame FIRST + k*PERIOD
    if r == 0:                          # last rest frame before hop k
        side, y = CORNERS[k % 4]
        return [((XR if side == 'R' else XL), y, False)]
    if r >= 14:                         # at rest in the corner reached after hop k
        side, y = CORNERS[(k + 1) % 4]
        return [((XR if side == 'R' else XL), y, False)]
    if r <= 5:                          # sliding out of the previous corner
        side, y = CORNERS[k % 4]
        return [((OUT_R if side == 'R' else OUT_L)[r - 1], y, True)]
    if r <= 7:
        return []                       # off screen
    side, y = CORNERS[(k + 1) % 4]      # sliding in: out-path reversed
    path = (OUT_R if side == 'R' else OUT_L)[::-1] + [XR if side == 'R' else XL]
    return [(path[r - 8], y, True)]

ff_cmd = ['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(fps),
          '-i', '-', '-i', a.inp, '-map', '0:v', '-map', '1:a?', '-c:v', 'libx264', '-crf', '16', '-preset', 'medium',
          '-pix_fmt', 'yuv420p', '-c:a', 'copy', '-shortest', a.out]
enc = subprocess.Popen(ff_cmd, stdin=subprocess.PIPE)
dbg = open(a.debug, 'w') if a.debug else None

cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
i = 0
while True:
    ok, f = cap.read()
    if not ok or (a.max_frames and i >= a.max_frames): break
    mask = np.zeros((H, W), np.uint8)
    hits = positions(i)
    for (x, y, moving) in hits:
        sh = shape_mv if moving else shape
        sx0, sx1 = max(0, x), min(W, x + tw)
        if sx1 > sx0:
            mask[y:y + th, sx0:sx1] |= sh[:, sx0 - x:sx1 - x]
    if dbg: print(i, hits, file=dbg)
    if mask.any():
        delta = f.astype(np.int16) - plate.astype(np.int16)
        d8 = np.clip(delta + 128, 0, 255).astype(np.uint8)
        d8 = cv2.inpaint(d8, mask, 5, cv2.INPAINT_TELEA)
        fill = np.clip(plate.astype(np.int16) + d8.astype(np.int16) - 128, 0, 255).astype(np.uint8)
        f = np.where(mask[..., None] > 0, fill, f)
    enc.stdin.write(f.tobytes())
    i += 1
    if i % 600 == 0: print(f'{i}/{N}', file=sys.stderr)
enc.stdin.close(); enc.wait()
print('done', a.out, file=sys.stderr)
