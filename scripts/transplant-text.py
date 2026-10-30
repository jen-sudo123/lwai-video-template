#!/usr/bin/env python3
"""Restore text hidden in one screenshot by copying the same text from another screenshot.

  python3 scripts/transplant-text.py <dst> <src> <l> <t> <r> <b> [<src_scale> [<dx> <dy>]]
<l t r b> is the damaged box in dst (image px). A strip around it (the undamaged text either side)
is located in src by template matching (src first resized by src_scale), then the donor's text is
laid onto dst's own background (interpolated across the box) using a darkness alpha, so a different background (selected row,
grey bar) doesn't come with it.
"""
import sys
import cv2
import numpy as np

dst_p, src_p = sys.argv[1], sys.argv[2]
l, t, r, b = map(int, sys.argv[3:7])
scale = float(sys.argv[7]) if len(sys.argv) > 7 else 1.0
dst = cv2.imread(dst_p).astype(np.float32)
src = cv2.imread(src_p)
if scale != 1.0:
    src = cv2.resize(src, None, fx=scale, fy=scale, interpolation=cv2.INTER_CUBIC)
src = src.astype(np.float32)

pad = 60
L, T, R, B = l - pad, t - 6, r + pad, b + 6
tmpl = dst[T:B, L:R].copy()
mask = np.ones(tmpl.shape[:2], np.float32)
mask[t - T:b - T, l - L:r - L] = 0  # ignore the damaged part when matching
res = cv2.matchTemplate(cv2.cvtColor(src, cv2.COLOR_BGR2GRAY), cv2.cvtColor(tmpl, cv2.COLOR_BGR2GRAY),
                        cv2.TM_CCORR_NORMED, mask=mask)
_, score, _, (mx, my) = cv2.minMaxLoc(res)
dx, dy = mx - L, my - T
if len(sys.argv) > 9:  # explicit offset when the match is ambiguous (e.g. a fixed side nav)
    dx, dy = int(sys.argv[8]), int(sys.argv[9])
donor = src[t + dy:b + dy, l + dx:r + dx]

def alpha(p):
    g = p.mean(axis=2)
    bg, ink = np.percentile(g, 92), np.percentile(g, 3)
    return np.clip((bg - g) / max(bg - ink, 1), 0, 1), ink

a, _ = alpha(donor)
ink = donor.reshape(-1, 3)[np.argsort(donor.mean(axis=2).ravel())[:max(1, donor.shape[0] * donor.shape[1] // 50)]].mean(axis=0)
patch = dst[t:b, l:r]
# Background per pixel: interpolate between the brightest pixels in thin strips either side, row by row.
left = dst[t:b, l - 4:l].max(axis=1)
right = dst[t:b, r:r + 4].max(axis=1)
u = np.linspace(0, 1, r - l)[None, :, None]
bg = left[:, None, :] * (1 - u) + right[:, None, :] * u
patch[:] = bg * (1 - a[..., None]) + ink * a[..., None]
cv2.imwrite(dst_p, np.clip(dst, 0, 255).astype(np.uint8))
print(f'{dst_p}: matched in {src_p} at offset ({dx},{dy}), score {score:.3f}')
