# Progress Log

Shared handoff log for Codex and Claude Code. Read at the start of every session; update after meaningful work.
Format: `YYYY-MM-DD [Tool] — note`. Newest first within each section.

## Current status

Template is set up for both local Mac and Claude Code on the web. Media lives in Google Drive, not git.

## Completed

- 2026-10-22 [Claude] — Added `AGENTS.md` (shared instructions), slimmed `CLAUDE.md` to import it, created this log.
- (earlier) — Moved media to Google Drive; added `scripts/assets-pull.sh`, `assets-push.sh`, `cloud-setup.sh`.

## Decisions

- 2026-10-22 — `AGENTS.md` is the single source of truth for shared rules; `CLAUDE.md` imports it via `@AGENTS.md`
  and only adds Claude-specific notes. Reason: avoid two copies drifting apart when switching tools.
- (standing) — Never render without the user's explicit go-ahead; approving a preview is not approval to render.
- (standing) — Media stays out of git (Google Drive via rclone).

## Outstanding

- _None logged yet. Add open tasks here._

## Next steps

- _Add the next planned video or task here._
