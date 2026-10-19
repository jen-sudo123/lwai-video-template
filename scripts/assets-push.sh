#!/bin/bash
# Upload media to Google Drive. Copies new/changed files only; never deletes on Drive.
#
#   scripts/assets-push.sh            # public/ (and public-full/ if present) -> gdrive:public
#   scripts/assets-push.sh --renders  # out/*.mp4 -> gdrive:renders
set -euo pipefail
cd "$(dirname "$0")/.."
REMOTE="${LWAI_DRIVE_REMOTE:-gdrive}"
OPTS=(--exclude '.DS_Store' --exclude '**/.DS_Store' --stats-one-line -P)

if [ "${1:-}" = "--renders" ]; then
  rclone copy out "$REMOTE:renders" --include '*.mp4' --stats-one-line -P
  exit
fi

# public-full/ is the local archive of rendered videos' assets: same subpaths as public/.
# Push it first so public/ wins where both have a file. _superseded/ goes to its own folder.
if [ -d public-full ]; then
  rclone copy public-full "$REMOTE:public" "${OPTS[@]}" --exclude '_superseded/**' --exclude '/README.md'
  [ -d public-full/_superseded ] && rclone copy public-full/_superseded "$REMOTE:archive/_superseded" "${OPTS[@]}"
fi
rclone copy public "$REMOTE:public" "${OPTS[@]}"
