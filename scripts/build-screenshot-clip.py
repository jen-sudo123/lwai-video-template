#!/usr/bin/env python3
"""Build a continuous "screen recording" clip from screenshots, frame-aligned to a composition.

For data files whose demo is screenshots rather than footage. Each video-clip scene's comment line
ends with the screenshot number in brackets, e.g. `// f978 — 'demonstrate' 32.6s [02]`; the clip shows
that screenshot (cover-cropped to 1920x1080) for the scene's duration. Non-screenshot scenes hold the
previous screenshot (the clip layer is hidden behind them anyway), so clip time == composition time.

  python3 scripts/build-screenshot-clip.py src/data/<id>.ts public/<id>/images public/video/<id>.mp4
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

data, img_dir, out = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
src = data.read_text()
images = {p.name[:2]: p for p in img_dir.iterdir() if p.name[:2].isdigit()}

segments = []  # (image path, frames)
current = None
for comment, body in re.findall(r"    // (f\d+ — .*?)\n    \{(.*?)\n    \},", src, re.S):
    frames = int(re.search(r"durationInFrames: (\d+)", body).group(1))
    tag = re.search(r"\[(\d\d)\]$", comment)
    if tag:
        current = images[tag.group(1)]
    if current is None:  # scenes before the first screenshot: use the first one
        current = images[min(images)]
    if segments and segments[-1][0] == current:
        segments[-1] = (current, segments[-1][1] + frames)
    else:
        segments.append((current, frames))

with tempfile.TemporaryDirectory() as tmp:
    parts = []
    for i, (img, frames) in enumerate(segments):
        part = Path(tmp) / f'{i:03d}.mp4'
        subprocess.run([
            'ffmpeg', '-v', 'error', '-y', '-loop', '1', '-framerate', '30', '-i', str(img),
            '-vf', 'scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,format=yuv420p',
            '-frames:v', str(frames), '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18',
            '-tune', 'stillimage', '-g', '30', str(part),
        ], check=True)
        parts.append(part)
    listing = Path(tmp) / 'list.txt'
    listing.write_text(''.join(f"file '{p}'\n" for p in parts))
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', str(listing),
                    '-c', 'copy', '-movflags', '+faststart', str(out)], check=True)

total = sum(f for _, f in segments)
print(f'{out}: {len(segments)} segments, {total} frames ({total / 30:.2f}s)')
