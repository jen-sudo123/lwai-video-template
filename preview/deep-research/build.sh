#!/bin/bash
# Builds the Deep Research preview page: esbuild bundle of entry.tsx + VO padded with the 3s title card.
# Output: $1 (default out/deep-research-preview.html). Publish it as an Artifact.
set -euo pipefail
cd "$(dirname "$0")/../.."
OUT="${1:-out/deep-research-preview.html}"; TMP=$(mktemp -d)
npx esbuild preview/deep-research/entry.tsx --bundle --minify --format=iife --target=es2020 \
  --define:process.env.NODE_ENV='"production"' --outfile="$TMP/bundle.js"
ffmpeg -v error -y -f lavfi -t 3 -i anullsrc=r=44100:cl=mono -i public/audio/DeepResearch.mp3 \
  -filter_complex "[1:a]aresample=44100,pan=mono|c0=c0[v];[0:a][v]concat=n=2:v=0:a=1,apad=pad_dur=2[o]" -map "[o]" -b:a 160k "$TMP/vo.mp3"
python3 - "$TMP" "$OUT" <<'PY'
import base64, sys
tmp, out = sys.argv[1], sys.argv[2]
t = open('preview/deep-research/page.tpl.html').read()
b = open(tmp + '/bundle.js').read().replace('</script', '<\\/script')
a = base64.b64encode(open(tmp + '/vo.mp3', 'rb').read()).decode()
open(out, 'w').write(t.replace('__AUDIO__', a).replace('__BUNDLE__', b))
PY
echo "$OUT"
