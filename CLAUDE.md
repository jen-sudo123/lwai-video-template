# Claude Code instructions

@AGENTS.md

All shared project instructions, coding standards and workflows are in `AGENTS.md` (imported above).
Edit shared rules there, not here. This file holds only Claude Code–specific notes.

## Progress log

Follow the session protocol in `AGENTS.md`: read `PROGRESS.md` at the start, update it after meaningful
work (tag entries `[Claude]`), then commit and push.

## Cloud sessions (Claude Code on the web)

- Setup script: `bash scripts/cloud-setup.sh`. Env vars: `RCLONE_CONFIG_GDRIVE_TOKEN`, `ELEVENLABS_API_KEY`.
- Network must allow: `www.googleapis.com`, `oauth2.googleapis.com`, `downloads.rclone.org`, `api.elevenlabs.io`,
  `storage.googleapis.com` + `remotion.media` (Chrome download), plus npm/GitHub defaults.
- No Remotion Studio and no Whisper: verify with `remotion still`, transcribe with the `speech-to-text` skill (ElevenLabs Scribe, word timestamps).
- Nothing on the cloud machine survives the session: push media and renders to Drive, commit code before finishing.
- Renders: concurrency can go above 1 here, but keep `--timeout=120000`.
