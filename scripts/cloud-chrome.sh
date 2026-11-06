#!/bin/bash
# Cloud sessions only: Chrome wrapper for Remotion stills/renders.
# Remotion launches Chrome with --no-proxy-server, which bypasses the session's trusted
# HTTPS proxy, so Google Fonts fail with ERR_CERT_AUTHORITY_INVALID. This strips those
# flags and routes Chrome through $HTTPS_PROXY (TLS verification stays on).
#   npx remotion still src/index.ts <CompId> out/stills/x.png --frame=N --browser-executable=scripts/cloud-chrome.sh
CHROME="${CLOUD_CHROME:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
args=()
for a in "$@"; do
  case "$a" in --no-proxy-server|--proxy-server=*|--proxy-bypass-list=*) ;; *) args+=("$a") ;; esac
done
exec "$CHROME" --proxy-server="$HTTPS_PROXY" --proxy-bypass-list="localhost;127.0.0.1" "${args[@]}"
