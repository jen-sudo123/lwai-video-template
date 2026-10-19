#!/bin/bash
# Download a composition's media from Google Drive into public/.
#
#   scripts/assets-pull.sh ClaudeInstructions   # only what that composition references
#   scripts/assets-pull.sh --all                # the whole gdrive:public mirror (~4 GB)
#
# Files already present and unchanged are skipped. Remote name defaults to
# "gdrive" (see CLAUDE.md); override with LWAI_DRIVE_REMOTE.
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="${LWAI_DRIVE_REMOTE:-gdrive}"

if [ "${1:-}" = "--all" ]; then
  rclone copy "$REMOTE:public" public --exclude '.DS_Store' --stats-one-line -P
  exit
fi

ID="${1:?Usage: scripts/assets-pull.sh <CompositionId> | --all}"
list=$(mktemp)
trap 'rm -f "$list" "$list.files"' EXIT
python3 scripts/list-assets.py "$ID" > "$list"

grep $'^file\t' "$list" | cut -f2- > "$list.files" || true
if [ -s "$list.files" ]; then
  rclone copy "$REMOTE:public" public --files-from-raw "$list.files" --stats-one-line -P
fi
grep $'^dir\t' "$list" | cut -f2- | while IFS= read -r d; do
  rclone copy "$REMOTE:public/$d" "public/$d" --exclude '.DS_Store' --stats-one-line -P
done

missing=0
while IFS= read -r p; do
  [ -e "public/$p" ] || { echo "MISSING on Drive: $p"; missing=$((missing + 1)); }
done < "$list.files"
echo "$ID: $(wc -l < "$list.files" | tr -d ' ') files referenced, $missing missing"
