#!/bin/bash
# Move a composition's archived assets from public-full/ back into public/
# so it can be previewed or re-rendered.
#
#   ./restore-assets.sh ClaudeInstructions
#
# Asset list comes from scripts/list-assets.py. In a cloud session there is no
# public-full/ — use scripts/assets-pull.sh to fetch from Google Drive instead.
set -euo pipefail
cd "$(dirname "$0")"

ID="${1:?Usage: ./restore-assets.sh <CompositionId>}"

python3 scripts/list-assets.py "$ID" | python3 -c '
import os, sys, shutil
comp = sys.argv[1]
paths = set()
for line in sys.stdin:
    kind, p = line.rstrip("\n").split("\t", 1)
    if kind == "file":
        paths.add(p)
    else:
        # dynamic prefixes like staticFile(`dir/${name}`): restore the whole dir
        full = os.path.join("public-full", p)
        if os.path.isdir(full):
            for dp, _, fs in os.walk(full):
                paths |= {os.path.relpath(os.path.join(dp, x), "public-full") for x in fs}
restored = missing = 0
for p in sorted(paths):
    dst, src = os.path.join("public", p), os.path.join("public-full", p)
    if os.path.exists(dst): continue
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.move(src, dst); restored += 1; print("restored", p)
    else:
        missing += 1; print("MISSING ", p)
print(f"{comp}: {restored} restored, {missing} missing, {len(paths)} referenced")
' "$ID"
