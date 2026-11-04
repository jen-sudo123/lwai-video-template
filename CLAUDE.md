# LWAI Video Template

Remotion 4 project for Lead with AI course videos. 1920×1080, 30fps, IBM Plex Serif + Public Sans.
Each video is a composition: a data file `src/data/<name>.ts` exporting a `VideoData`, registered in `src/Root.tsx`.

## Where things live

| Path | What |
|---|---|
| `src/scenes/` | Scene components. Props in `types.ts`, Zod schemas in `schemas.ts`, router in `SceneRenderer.tsx` |
| `src/Video.tsx` | Composition entry (audio, continuous `clipSrc` background, avatar, zoom) |
| `src/compositions/` | Custom one-off composition components (AiFluency, AdvancedModelsChatGPT, ...) |
| `src/tokens.ts` | Design tokens: `safeMargin: 80`, `lime500: #66C61C`, `titleGreen: #4a7c2f` |
| `src/data/` | Per-video data files, scripts (`*.script.txt`) and Whisper transcripts (`*.transcript.*`) |
| `public/` | Media. **Not in git** — lives in Google Drive (see below) |
| `out/` | Renders. Not in git — pushed to Drive `renders/` |

## Media: Google Drive, not git

All media (`public/`, plus the old `public-full/` archive) is stored in the Google Drive folder
`16DRNL5bx8kQ1dm3B2L648WRGbuLxI9YX` (rclone remote `gdrive:`), laid out as:

```
gdrive:public/...   mirror of public/ (same subpaths the data files reference)
gdrive:renders/     finished MP4s from out/
gdrive:dumping/     new raw assets dropped in for the next video
```

- `scripts/assets-pull.sh <CompositionId>` — download only the files that composition references.
  `scripts/assets-pull.sh --all` pulls everything (~4 GB, avoid).
- `scripts/assets-push.sh` — upload new/changed files in `public/` (and `public-full/` if present). Never deletes on Drive.
- `scripts/assets-push.sh --renders` — upload `out/*.mp4` to `gdrive:renders/`.
- `scripts/cloud-setup.sh` — setup script for Claude Code on the web (installs rclone, npm deps, Chrome).

Before working on a composition, pull its assets. After adding media (new VO, screen recording, images), push.
A missing-asset render error almost always means the pull was skipped.

## New video workflow

1. Raw assets arrive in `gdrive:dumping/` (locally: `../dumping/`). Pull with `rclone copy gdrive:dumping dumping`.
2. Organize into `public/<video-name>/` (`video/`, `images/`, `audio/`). Data files reference paths relative to `public/`
   (`clipSrc: 'video/<name>/<name>.mp4'`, `avatarSrc: '<name>/avatar.mp4'`).
3. Create `src/data/<name>.ts`, register in `src/Root.tsx`. **Check for composition-ID and filename collisions first**
   (e.g. `AiSkills` vs the old `Skills`).
4. Verify with CLI stills across scenes (Studio isn't available in cloud sessions):
   `npx remotion still src/index.ts <CompId> out/stills/<n>.png --frame=N`
5. **Never render without the user's explicit go-ahead**, even after they approve a preview. Approving ≠ render.
6. **Preview as an Artifact first, then Drive.** Every render (preview or final) is published as a private claude.ai Artifact
   for review BEFORE anything goes to Drive: re-encode to fit the 15 MB file limit
   (`ffmpeg -i out/<name>.mp4 -c:v libx264 -crf 30 -c:a aac -b:a 96k -movflags +faststart out/<name>-web.mp4`),
   page = video player + clickable scene list + open decisions. Push to Drive (`scripts/assets-push.sh --renders`)
   only after the user approves the Artifact.

Render command (local Mac: 8 GB RAM, so concurrency 1; close Studio first):
```
npx remotion render src/index.ts <CompId> out/<name>.mp4 --chrome-mode=chrome-for-testing --concurrency=1 --timeout=120000
```

## VO timing (most time-consuming part — get it right)

- Whisper once, save next to the data file: `whisper public/audio/<name>.mp3 --model small --word_timestamps True` → `src/data/<name>.transcript.*`.
- Scene start frame = sum of previous `durationInFrames`. Local frame = `round((word_t − scene_start_s) × 30)`.
- **`audioStartFrame` trims the file:** `Video.tsx` uses `<Audio startFrom={audioStartFrame}>` inside `<Sequence from={audioStartFrame}>`.
  So the audio must be pre-padded with exactly `audioStartFrame/30` s of silence (`ffmpeg -i in.wav -af "adelay=2000:all=1" out.wav` for 60),
  and Whisper run on the UNPADDED original. Don't change `Video.tsx` — other videos depend on the trim.
  Verify with a short render + `ffmpeg -af silencedetect`.
- Anchor each reveal to the word the card actually names, not the sentence start. Default no lead for bodyCards;
  ~8 frames lead for 18-frame fades. Tolerance ≤ 15 frames.
- Audit every `*Timings` array (`bodyTimings`, `itemTimings`, `left/rightBodyTimings`, `left/rightPromptTimings`) after the first pass.

## Voiceover (ElevenLabs)

Use the `lwai-voiceover` skill. Key: `ELEVENLABS_API_KEY` env var (cloud) / macOS Keychain service `11labs-use` (local Mac).
Default voice **Daan** `mY3gNkLi7iAw6IzipDpw`, model **`eleven_v4`** (standard since 2026-11; older videos used `eleven_multilingual_v2`).
v4 format: plain text, `[pause]` between paragraphs, sparse delivery tags (e.g. `[confident]` on line 1), numbers/URLs in normal written form.
No `<break>`/SSML and no speed/style settings on v4 (default voice settings). Show a storyboard table (scene / title / VO line) for approval before generating.
Scripts in `src/data/<id>.script.txt`; audio to `public/audio/<id>.mp3`.

## Brand + layout rules

- 80px safe margin on every edge; right-aligned text ends at x = 1840; vertically centred right columns start at y ≥ 160–190.
- No bare em-dashes in on-screen text — replace ` — ` with `, ` or a space.
- `@remotion/media` is NOT installed. Use `OffthreadVideo` from `remotion` (`Video` doesn't render visibly).
- Avatar overlay: outside `<Series>` in `Video.tsx`, top-right, `top: 20, right: 20`, 150px circle, `muted`.

## Scene gotchas

- `bodyCards: true` only works paired with `bodyRight: true` or `imageLeft: true`. 4+ cards → add `bodyCardCompact: true` (else overflows 1080px).
  `bodyCardIcons`: `user`, `briefcase`, `building-office`, `bolt`, `eye`.
- `label-title-body` with `image`: don't combine with `bodyRight + bodyCards` (both want the right side).
- `split-contrast`: `highlights[].from` must match `rightBodyTimings`.
- `ThinkingTraceUI`: pass `callouts: []` to hide the panel.
- `ChecklistSlide`: `label` renders between the title prefix and the lime `titleHighlight` word.
- `TitleCardGreen`: omit `subtitle` for title-only.
- `ThreeModeColumns`: column entry is triggered by the first `highlights` entry with `value === index`.
- `centered-image-caption`: default `objectFit: 'cover'`; use `'contain'` for full screenshots.

### video-clip
- VideoData-level `clipSrc` = one continuous background video; each scene's `videoStartTime` is the trim offset.
  With `clipSrc` set, the video and `clipZoomKeyframes` are rendered by `Video.tsx`, NOT `VideoClip.tsx` (`skipVideo` forced true).
- `clipZoomKeyframes`: `{ startFrame, scale, originX, originY }` — **origin is 0–100 percent, not 0–1.**
  30-frame lerp between keyframes. `startFrame: -30` starts a scene already zoomed. Measure origin from a real still.
- `overlayPosition`: `bottom` (default) | `top` | `right` | `top-right` | `center`. `panelLayout: 'text-left'` = white panel on left 46%.
- `bodyOpenFrom: N` — items with timing ≥ N render as open white text on the video.
- `openBodyVariant: 'quote'` with 2+ body items lays them out in a ROW and they collide. One item per scene; split scenes instead.
- White open-text looks invisible in Studio preview (video is at the composition layer) — check with a CLI still.
- Demo footage: default to clean `video-clip` scenes (no label/title/body card). For long concept-heavy demos,
  offer top explanation cards (`overlayPosition: 'top'`, label + 2-line title ≤ ~30 chars/line) — ask, don't assume.

## Cloud sessions (Claude Code on the web)

- Setup script: `bash scripts/cloud-setup.sh`. Env vars: `RCLONE_CONFIG_GDRIVE_TOKEN`, `ELEVENLABS_API_KEY`.
- Network must allow: `www.googleapis.com`, `oauth2.googleapis.com`, `downloads.rclone.org`, `api.elevenlabs.io`,
  `storage.googleapis.com` + `remotion.media` (Chrome download), plus npm/GitHub defaults.
- Stills/renders fail on Google Fonts (ERR_CERT_AUTHORITY_INVALID via the proxy) unless you add `--ignore-certificate-errors`.
- No Remotion Studio and no Whisper: verify with `remotion still`, transcribe with the `speech-to-text` skill (ElevenLabs Scribe, word timestamps).
- Nothing on the cloud machine survives the session: push media and renders to Drive, commit code before finishing.
- Renders: concurrency can go above 1 here, but keep `--timeout=120000`.

## Local Mac only

- Desktop is iCloud-synced: cold reads of node_modules crawl and `public-full/` files may be evicted (0 bytes).
- Remotion Studio: `npx remotion studio --port=3000 --no-open`. Never kill a server already on 3000/3001 without asking — it may be another session's.
