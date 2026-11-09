#!/bin/bash
# Cloud sessions only: Remotion launches Chrome with --no-proxy-server, which bypasses the session's
# HTTPS proxy, so Google Fonts fail with ERR_CERT_AUTHORITY_INVALID. This wrapper drops those flags and
# routes Chrome through $HTTPS_PROXY instead (TLS verification stays on).
#   npx remotion still src/index.ts <Comp> out/stills/x.png --frame=N --browser-executable=scripts/chrome-via-proxy.sh
#   npx remotion render src/index.ts <Comp> out/x.mp4 --browser-executable=scripts/chrome-via-proxy.sh --timeout=120000
CHROME="${LWAI_CHROME:-/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell}"
args=()
for a in "$@"; do
  case "$a" in --no-proxy-server|--proxy-server=*|--proxy-bypass-list=*) ;; *) args+=("$a") ;; esac
done
if [ -n "${HTTPS_PROXY:-}" ]; then
  exec "$CHROME" --proxy-server="$HTTPS_PROXY" --proxy-bypass-list="localhost;127.0.0.1" "${args[@]}"
fi
exec "$CHROME" "${args[@]}"
