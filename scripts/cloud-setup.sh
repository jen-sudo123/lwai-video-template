#!/bin/bash
# Setup script for Claude Code on the web (paste into the environment's setup script:
#   bash scripts/cloud-setup.sh
# ). Installs rclone + Chrome deps + npm packages and points rclone at the LWAI Drive folder.
#
# Environment variables to set on the cloud environment:
#   RCLONE_CONFIG_GDRIVE_TOKEN  the token JSON from `rclone config show gdrive` on the Mac (secret)
#   ELEVENLABS_API_KEY          for voiceovers (secret)
set -uo pipefail
cd "$(dirname "$0")/.."

SUDO=""; [ "$(id -u)" -ne 0 ] && command -v sudo >/dev/null && SUDO="sudo"

# Chrome runtime libs for Remotion renders, ffmpeg for silencedetect checks
$SUDO apt-get update -qq && $SUDO apt-get install -y -qq unzip ffmpeg \
  libnss3 libdbus-1-3 libatk1.0-0 libatk-bridge2.0-0 libgbm1 libasound2t64 libxrandr2 \
  libxkbcommon0 libxfixes3 libxcomposite1 libxdamage1 libpango-1.0-0 libcairo2 libcups2 \
  || $SUDO apt-get install -y -qq libasound2 || echo "apt install had problems; continuing"

if ! command -v rclone >/dev/null; then
  tmp=$(mktemp -d)
  curl -fsSL https://downloads.rclone.org/rclone-current-linux-amd64.zip -o "$tmp/rclone.zip"
  unzip -q "$tmp/rclone.zip" -d "$tmp"
  $SUDO install -m 755 "$tmp"/rclone-*-linux-amd64/rclone /usr/local/bin/rclone
  rm -rf "$tmp"
fi

# Remote "gdrive" rooted at the LWAI video media folder. The token comes from the
# RCLONE_CONFIG_GDRIVE_TOKEN env var, so it never has to be written to disk here.
mkdir -p ~/.config/rclone
cat > ~/.config/rclone/rclone.conf <<'EOF'
[gdrive]
type = drive
scope = drive
root_folder_id = 16DRNL5bx8kQ1dm3B2L648WRGbuLxI9YX
EOF

npm ci --no-audit --no-fund || npm install --no-audit --no-fund
npx remotion browser ensure || echo "Chrome download failed; renders will retry it"

if [ -n "${RCLONE_CONFIG_GDRIVE_TOKEN:-}" ]; then
  rclone lsd gdrive: >/dev/null && echo "Google Drive: connected" || echo "Google Drive: token set but listing failed"
else
  echo "Google Drive: RCLONE_CONFIG_GDRIVE_TOKEN not set, asset scripts won't work"
fi
