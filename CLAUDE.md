# LWAI Video Template — how we make course videos

Remotion 4 project for Lead with AI course videos. 1920×1080, 30fps, IBM Plex Serif + Public Sans.
Each video is a composition: a data file `src/data/<name>.ts` exporting a `VideoData`, registered in `src/Root.tsx`.
The template applies brand, layout and animation; a video is "built" by writing its data file, not by editing a timeline.

## How it works today (read first)

| Thing | Where it lives | In Git? |
|---|---|---|
| Code, data files, scripts, transcripts, skills | This repo (GitHub `jen-sudo123/lwai-video-template`, branch `main`) | **Yes** |
| Media (VO audio, screen recordings, images) | Production Mac: `~/Desktop/LWAI-Video-Production/lwai-video-template/public/` | No (`.gitignore`) |
| Media archive for older videos | Same Mac: `public-full/` | No |
| Rendered MP4s | Mac `out/`, then uploaded by hand to the lesson on **Circle** | No |

- **Production happens on the Mac.** Media only exists there, so preview and render only work there.
- **Google Drive is planned, not live.** The `scripts/assets-*.sh` scripts and `scripts/cloud-setup.sh` exist, but the
  Drive connection (`RCLONE_CONFIG_GDRIVE_TOKEN`) has never been set up. Don't tell the user files are in Drive; don't
  rely on `assets-pull.sh` / `assets-push.sh`. See "Planned: Google Drive" at the bottom.
- **The AI avatar is no longer used.** Don't add `avatarSrc` / `avatar*` fields to new videos. Older data files still
  have them; leave those alone (`Video.tsx` still supports them for re-renders).

## The role of Git

Git is the record of **how every video is built**. A data file + its media = a reproducible video. That's what lets us
fix a typo or re-time a scene months later and re-render, instead of rebuilding.

- **Commit:** `src/` (data files, scenes, compositions), `src/data/*.script.txt`, transcripts, `scripts/`, `.claude/skills/`, this file.
- **Never commit:** media (`public/`, `public-full/`), renders (`out/`, `*.mp4`, `*.wav`, `*.mp3`, `*.mov`), `.env`, API keys.
  The `.gitignore` blocks these; don't force-add them.
- **When to commit** (small, descriptive commits):
  1. After the data file is created and registered (`Add <VideoName> composition`).
  2. After the timing pass (`Time <VideoName> to voiceover`).
  3. After the final approved render (`<VideoName>: final, rendered <date>`), so `main` matches what's on Circle.
- **On the Mac:** `git pull` before starting work; `git add <files> && git commit -m "..." && git push` when done.
- **Claude Code on the web** works on a `claude/...` branch and pushes there; changes reach `main` via a pull request
  the user merges. After merging, `git pull` on the Mac.

## How to make a new video (step by step)

### 1. Script and storyboard
- Start from the lesson script or transcript. Save it as `src/data/<name>.script.txt`.
- Use the `lwai-video-storyboarding` skill: AIDA structure (hook, concept, examples, takeaway), one idea per scene,
  pick a layout per scene, plan in 2–4 s visual beats, list the assets needed.
- Edit for spoken readability (cut quoted commands, written-style rhetorical questions, fill-in-the-blank templates).
- **Gate:** show a storyboard table (scene / title / VO line) and get the user's approval.

### 2. Voiceover (ElevenLabs)
- Use the `lwai-voiceover` skill. Key: macOS Keychain service `11labs-use` (Mac) / `ELEVENLABS_API_KEY` env var (cloud).
- Default voice **Daan** `mY3gNkLi7iAw6IzipDpw`. Plain text + `<break>` tags only — no heavy SSML.
  Settings: stability 0.10, style 0.55, similarityBoost 0.85, speed 0.95.
- Save to `public/audio/<name>.mp3` on the Mac.
- **Gate:** user listens and approves before any timing work. Changing the script after this means re-timing.

### 3. Assets
- Raw media (screen recordings, images) is handed over and organised on the Mac into
  `public/<video-name>/` (`video/`, `images/`, `audio/`).
- Data files reference paths relative to `public/` (e.g. `clipSrc: 'video/<name>/<name>.mp4'`).
- Re-rendering an older video: `./restore-assets.sh <CompositionId>` moves its files from `public-full/` back into `public/`.
- A "missing file" render error almost always means a file isn't where the data file expects it.

### 4. Build the scenes
- Create `src/data/<name>.ts` and register it in `src/Root.tsx`.
  **Check for composition-ID and filename collisions first** (e.g. `AiSkills` vs the old `Skills`).
- Pick layouts from `src/scenes/` (router: `SceneRenderer.tsx`, props: `types.ts`). One-off visuals go in `src/compositions/`.
- Follow the brand and scene rules below. **Commit.**

### 5. Time everything to the voiceover (slowest step — get it right)
- Transcribe once with word timestamps, save next to the data file as `src/data/<name>.transcript.*`.
  Mac: `whisper public/audio/<name>.mp3 --model small --word_timestamps True`. Cloud: `speech-to-text` skill (ElevenLabs Scribe).
- Scene start frame = sum of previous `durationInFrames`. Local frame = `round((word_t − scene_start_s) × 30)`.
- **`audioStartFrame` trims the file:** `Video.tsx` uses `<Audio startFrom={audioStartFrame}>` inside `<Sequence from={audioStartFrame}>`.
  So the audio must be pre-padded with exactly `audioStartFrame/30` s of silence (`ffmpeg -i in.wav -af "adelay=2000:all=1" out.wav` for 60),
  and transcription run on the UNPADDED original. Don't change `Video.tsx` — other videos depend on the trim.
  Verify with a short render + `ffmpeg -af silencedetect`.
- Anchor each reveal to the word the card actually names, not the sentence start. Default no lead for bodyCards;
  ~8 frames lead for 18-frame fades. Tolerance ≤ 15 frames.
- Audit every `*Timings` array (`bodyTimings`, `itemTimings`, `left/rightBodyTimings`, `left/rightPromptTimings`) after the first pass.
- **Commit.**

### 6. Preview
- Mac: Remotion Studio — `npx remotion studio --port=3000 --no-open` (or `./start-studio.sh`).
  Never kill a server already on 3000/3001 without asking — it may be another session's.
- Stills (Mac or cloud): `npx remotion still src/index.ts <CompId> out/stills/<n>.png --frame=N` across all scenes.
- Check overflow, margins, typos, zoom framing, white text on video.
- **Gate:** user approves the preview.

### 7. Render
- **Never render without the user's explicit go-ahead**, even after they approve a preview. Approving ≠ render.
- Mac (8 GB RAM, so concurrency 1; close Studio first):
  ```
  npx remotion render src/index.ts <CompId> out/<name>.mp4 --chrome-mode=chrome-for-testing --concurrency=1 --timeout=120000
  ```

### 8. Deliver and record
- The user uploads `out/<name>.mp4` to the lesson on Circle.
- **Commit and push** the final data file so `main` matches the published video.

## Brand + layout rules

- 80px safe margin on every edge; right-aligned text ends at x = 1840; vertically centred right columns start at y ≥ 160–190.
- No bare em-dashes in on-screen text — replace ` — ` with `, ` or a space.
- `@remotion/media` is NOT installed. Use `OffthreadVideo` from `remotion` (`Video` doesn't render visibly).
- Design tokens in `src/tokens.ts` (`safeMargin: 80`, `lime500: #66C61C`, `titleGreen`).

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

## Mac notes

- Desktop is iCloud-synced: cold reads of `node_modules` crawl and `public-full/` files may be evicted (0 bytes).
  If a file reads as 0 bytes, open it in Finder to force the download.

## Cloud sessions (Claude Code on the web)

- **No media in the cloud** (it's only on the Mac, Drive isn't live). Use cloud sessions for storyboards, scripts,
  voiceover generation, data-file and scene-code changes. Preview/render real videos on the Mac.
- Voiceover generated in the cloud must reach the Mac's `public/audio/` — hand the file to the user; it can't be committed.
- No Remotion Studio and no Whisper: use `remotion still` and the `speech-to-text` skill.
- Nothing on the cloud machine survives the session: commit and push code before finishing.

## Planned: Google Drive (not live yet)

Goal: move all media to Drive folder `16DRNL5bx8kQ1dm3B2L648WRGbuLxI9YX` (rclone remote `gdrive:`) with
`public/` (mirror of `public/`), `renders/` (finished MP4s) and `dumping/` (new raw assets), so cloud sessions can preview and render.
Scripts are ready but untested: `scripts/assets-pull.sh <CompositionId>`, `scripts/assets-push.sh [--renders]`,
`scripts/cloud-setup.sh` (needs `RCLONE_CONFIG_GDRIVE_TOKEN` and network access to `www.googleapis.com`,
`oauth2.googleapis.com`, `downloads.rclone.org`, `storage.googleapis.com`, `remotion.media`).
Once it works end to end, update "How it works today" above.
