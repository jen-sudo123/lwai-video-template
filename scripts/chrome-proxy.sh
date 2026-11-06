#!/bin/bash
# Chrome wrapper for Remotion renders/stills in Claude Code cloud sessions.
#
# Why: cloud sessions reach the internet only through an HTTPS proxy ($HTTPS_PROXY).
# Remotion launches Chrome with --no-proxy-server, so Google Fonts (IBM Plex Serif /
# Public Sans) fail with ERR_CERT_AUTHORITY_INVALID or ERR_PROXY_CONNECTION_FAILED and
# the render aborts with "NetworkError". This wrapper strips Remotion's proxy flags and
# routes HTTPS through the session proxy, leaving plain-HTTP (Remotion's localhost
# server) direct. The proxy port changes when the container restarts, so it is read
# from $HTTPS_PROXY at launch, never hard-coded.
#
# Usage (cloud only; local Mac renders don't need it):
#   npx remotion still  src/index.ts <CompId> out/stills/x.png --frame=N --browser-executable=scripts/chrome-proxy.sh
#   npx remotion render src/index.ts <CompId> out/<name>.mp4 --browser-executable=scripts/chrome-proxy.sh --timeout=120000
# (Node API: pass browserExecutable: 'scripts/chrome-proxy.sh' to selectComposition/renderStill/renderMedia.)

# Pick a headless Chrome: the pre-installed Playwright one, else Remotion's own download.
CHROME=""
for c in /opt/pw-browsers/chromium_headless_shell-*/chrome-headless-shell-linux64/chrome-headless-shell \
         "$(dirname "$0")/../node_modules/.remotion/chrome-headless-shell/linux64/chrome-headless-shell-linux64/chrome-headless-shell"; do
  if [ -x "$c" ]; then CHROME="$c"; break; fi
done
if [ -z "$CHROME" ]; then
  echo "chrome-proxy.sh: no headless Chrome found (run: npx remotion browser ensure)" >&2
  exit 1
fi

# No proxy configured (e.g. local machine): run Chrome unchanged.
if [ -z "${HTTPS_PROXY:-}" ]; then
  exec "$CHROME" "$@"
fi

args=()
for a in "$@"; do
  case "$a" in
    --no-proxy-server|--proxy-server=*|--proxy-bypass-list=*) ;;
    *) args+=("$a") ;;
  esac
done
PROXY="${HTTPS_PROXY#http://}"
PROXY="${PROXY#https://}"
exec "$CHROME" "${args[@]}" "--proxy-server=https=${PROXY%/}" "--proxy-bypass-list=localhost;127.0.0.1;<-loopback>"
