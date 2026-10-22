#!/usr/bin/env python3
"""Overlay a labelled pixel grid on screenshots so screen-demo rects/points can be read off.

Usage:
  python3 scripts/screenshot-grid.py public/<video>/images/*.jpg [--out out/grids]

Writes <out>/<name>.grid.png for each input: red verticals every 100px (bold every 500),
blue horizontals every 50px (bold every 250), each labelled in image pixels. Open the PNGs,
read x/y/w/h for the UI you want to spotlight, circle, underline, type into or click, and
use those numbers directly in the screen-demo shot (they are in the screenshot's own pixels).
"""
import argparse
import os

from PIL import Image, ImageDraw


def grid(path: str, out_dir: str) -> str:
    im = Image.open(path).convert('RGB')
    d = ImageDraw.Draw(im)
    for x in range(0, im.width, 100):
        d.line([(x, 0), (x, im.height)], fill=(255, 0, 0) if x % 500 == 0 else (255, 150, 150), width=1)
        d.text((x + 2, 2), str(x), fill='red')
    for y in range(0, im.height, 50):
        d.line([(0, y), (im.width, y)], fill=(0, 0, 255) if y % 250 == 0 else (150, 150, 255), width=1)
        d.text((2, y + 2), str(y), fill='blue')
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.join(out_dir, os.path.splitext(os.path.basename(path))[0] + '.grid.png')
    im.save(out)
    print(f'{out}  ({im.width}x{im.height})')
    return out


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('images', nargs='+')
    ap.add_argument('--out', default='out/grids')
    args = ap.parse_args()
    for p in args.images:
        grid(p, args.out)
