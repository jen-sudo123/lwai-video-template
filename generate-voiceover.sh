#!/usr/bin/env bash
# Usage: bash generate-voiceover.sh <composition-id> [voice_id]
#
# Reads the script from src/data/<composition-id>.script.txt
# Outputs:
#   public/audio/<composition-id>.mp3
#   public/audio/<composition-id>.alignment.json
#
# After running, use Whisper to get timestamps:
#   whisper public/audio/<composition-id>.mp3 --model small --word_timestamps True

set -euo pipefail

if [[ -z "${1:-}" ]]; then
  echo "Usage: bash generate-voiceover.sh <composition-id> [voice_id]"
  echo "Example: bash generate-voiceover.sh my-new-video"
  exit 1
fi

COMP_ID="$1"
VOICE_ID="${2:-}"  # optional — 11labs-use picks default voice if omitted

SCRIPT_FILE="src/data/${COMP_ID}.script.txt"
AUDIO_OUT="public/audio/${COMP_ID}.mp3"
ALIGN_OUT="public/audio/${COMP_ID}.alignment.json"

if [[ ! -f "$SCRIPT_FILE" ]]; then
  echo "Script file not found: $SCRIPT_FILE"
  echo "Create it with your voiceover text, then run this again."
  exit 1
fi

echo "Generating voiceover for: $COMP_ID"
echo "  Script : $SCRIPT_FILE"
echo "  Audio  : $AUDIO_OUT"
echo "  Align  : $ALIGN_OUT"
echo ""

if [[ -n "$VOICE_ID" ]]; then
  11labs-use tts "$SCRIPT_FILE" "$AUDIO_OUT" "$ALIGN_OUT" "$VOICE_ID"
else
  11labs-use tts "$SCRIPT_FILE" "$AUDIO_OUT" "$ALIGN_OUT"
fi

echo ""
echo "Done. Audio saved to $AUDIO_OUT"
echo ""
echo "Next step — get timestamps with Whisper:"
echo "  whisper $AUDIO_OUT --model small --word_timestamps True --output_dir src/data"
