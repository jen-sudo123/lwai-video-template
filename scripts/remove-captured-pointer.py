#!/usr/bin/env python3
"""Remove a captured mouse pointer (grey arrow with white outline + grey "presenter" halo) from a screenshot.

The halo is a translucent dark layer, so the pixels under it are the original times a radial
factor: dividing by that factor (measured from the background) restores the screenshot, text
included. The arrow itself is inpainted; text it covered can then be restored from another
screenshot that shows the same text (scripts/transplant-text.py).

  python3 scripts/remove-captured-pointer.py <image> <left> <top> <right> <bottom> [...]
The four numbers are the arrow's bounding box in image px (measure on a zoomed crop). Writes in place:
keep the originals elsewhere.
"""
import sys
import cv2
import numpy as np

HALO_R = 62  # px beyond the arrow centre where the halo has faded out


def arrow_polygon(l, t, r, b):
    w, h = r - l, b - t
    pts = [(.04, .05), (.98, .36), (.57, .55), (.43, .98)]  # tip, right wing, notch, tail
    return np.array([[l + x * w, t + y * h] for x, y in pts], np.int32)


def clean(path, l, t, r, b):
    im = cv2.imread(path).astype(np.float32)
    h, w = im.shape[:2]
    lum = im.mean(axis=2)
    cx, cy = (l + r) / 2, (t + b) / 2
    yy, xx = np.mgrid[0:h, 0:w]
    rad = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    poly = np.zeros((h, w), np.uint8)
    cv2.fillPoly(poly, [arrow_polygon(l, t, r, b)], 255)
    outline = cv2.dilate(poly, np.ones((9, 9), np.uint8))          # arrow + white stroke
    clear = outline == 0

    # Halo: background = high percentile per radius, compared with the ring just outside the halo.
    ref = np.percentile(lum[(rad >= HALO_R) & (rad < HALO_R + 8) & clear], 85)
    gain = np.ones(HALO_R + 1, np.float32)
    for r0 in range(HALO_R):
        ring = lum[(rad >= r0) & (rad < r0 + 3) & clear]
        if ring.size > 8:
            gain[r0] = max(1.0, ref / max(np.percentile(ring, 85), 1.0))
    first = next(i for i in range(HALO_R) if lum[(rad >= i) & (rad < i + 3) & clear].size > 8)
    start = min(first + 12, HALO_R - 1)                             # skip the pointer's own drop shadow
    gain[:start] = gain[start]                                      # under the arrow: same as just outside it
    gain = np.convolve(np.pad(gain, 3, mode='edge'), np.ones(7) / 7, mode='valid')
    inside = rad < HALO_R
    im[inside] *= gain[np.clip(rad[inside].astype(int), 0, HALO_R)][:, None]

    # Arrow: inpaint it whole (the grey fill hides most of what is underneath).
    out = np.clip(im, 0, 255).astype(np.uint8)
    out = cv2.inpaint(out, cv2.dilate(outline, np.ones((5, 5), np.uint8)), 5, cv2.INPAINT_TELEA)
    cv2.imwrite(path, out)


a = sys.argv[1:]
for i in range(0, len(a), 5):
    clean(a[i], *map(int, a[i + 1:i + 5]))
    print('cleaned', a[i])
