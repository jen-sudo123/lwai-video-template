---
name: lwai-screen-demo
description: Turn screenshots into a tutorial that plays like a screen recording, using the `screen-demo` scene layout (virtual camera, spotlight, cursor + click, typed prompt, streamed reply, drawn marks, before/after compare). Use when a Lead with AI video has screenshots but no screen recording, or when the user asks for a screenshot-only demo, tutorial or walkthrough, or says screenshot scenes feel like a slideshow.
tags: [video, remotion, screenshots, tutorial, demo, lwai]
context: project
version: 1.0.0
---

# LWAI screen demo from screenshots

Screenshot tutorials fail when each image sits still beside a text card and then gets
swapped for the next one: that reads as a slideshow. The `screen-demo` layout fakes a screen
recording instead. The screenshot fills the frame and a virtual camera moves over it, guided
by the voiceover, with a cursor, typing and on-screen marks.

Reference implementation: `src/scenes/ScreenDemo.tsx` (component and prop types) and the
three demos in `src/data/agent-boundaries.ts` (`buildDemo`, `instructionsDemo`, `testsDemo`).
The previous slide-based version is kept there as `agentBoundariesSlides` for comparison.

## Principles

- **The camera does the work.** Show the screenshot full-frame and pan or zoom to whatever the
  narration names. Every move goes somewhere specific; no drifting for its own sake.
- **Spotlight beats captions.** Dim everything except the region being discussed. One short
  step label (top-left chip) is the only on-screen text; the voiceover carries the lesson.
- **Sell the action.** A cursor that travels and clicks, a prompt that types itself out and a
  reply that appears line by line make viewers believe they are watching the real tool.
- **Transitions carry meaning.** `slide` only when the narration changes app or place
  (Copilot Studio → SharePoint). `fade` for a new state of the same screen (prompt → reply).
  Sliding between states of the same screen makes it feel like a slideshow again.
- **Prove outcomes side by side.** For "nothing changed" or "this changed", use `compare`
  (before and after in one frame, highlight, stamp, one-line statement) rather than asking
  viewers to remember a screenshot from earlier.
- **Text cards stay.** Concept beats between demos remain normal text scenes.

## Workflow

1. **Inventory the screenshots.** Put them in `public/<video>/images/` (Drive-synced, not git)
   and note each one's pixel size (all rects are in screenshot pixels).
2. **Group them into demos.** A demo is a continuous run of screenshots with no text card in
   between. Each demo becomes one `screen-demo` scene, and each screenshot one shot inside it.
   Long runs (both boundary tests) are one scene so the move between them can slide.
3. **Measure.** `python3 scripts/screenshot-grid.py public/<video>/images/*.jpg` writes
   labelled grids to `out/grids/`. Read off x/y/w/h for every region you will spotlight,
   circle, underline, type into, reveal or click.
4. **Time from the word transcript** (`src/data/<video>.transcript.json`). The scene keeps the
   exact start frame and `durationInFrames` of the content it replaces, so the rest of the
   video doesn't move. All frames inside the scene are scene-local:
   `round((word_start_s - scene_start_s) * 30)`. Anchor each effect to the word it shows:
   camera move and spotlight on the noun ("the Tools section"), click on the verb ("open"),
   underline on the claim ("can't make changes"), compare stamp on "hasn't changed".
5. **Write the scene** (see the field reference below), register nothing new: it is just
   another entry in the video's `scenes`.
6. **Verify with stills** at the key moment of every shot (after its camera move, mid-typing,
   on the click, after each mark). `npx remotion still src/index.ts <CompId> out/stills/x.png --frame=N`.
   Check that spotlights and marks sit exactly on the text, the camera never shows blank
   canvas, and nothing important hides under the step chip (top-left) or logo (bottom-left).
   Fix numbers, re-check only the changed stills.
7. **Never render without the user's explicit go-ahead** (project rule).

## Field reference (`layout: 'screen-demo'`)

Scene: `label` (chip text, e.g. `TEST 1`), `steps` (`{ from, text, label? }`; a step `label`
switches the chip label from then on, e.g. `TEST 2`), `shots`, `durationInFrames`.

Shot (all frames scene-local, all rects `[x, y, w, h]` in screenshot pixels):

| Field | What it does | Tips |
|---|---|---|
| `from` | Frame the shot starts. The next shot's `from` ends it. | Put it on the word that introduces the new screen. |
| `image`, `imageSize` | Screenshot path under `public/` and its pixel size. | `imageSize` must match the file or every rect is off. |
| `transition` | `slide` (new app/place), `fade` (default, same screen), `cut`. | 15 frames; the outgoing shot stays underneath, so no timing shifts. |
| `camera` | Keyframes `{ frame, x, y, zoom }`: view centre in image px; zoom 1 = whole screenshot fits. | Moves take 26 frames from `frame`. 1.5–2.0 for reading UI text. Clamped so no blank canvas shows. |
| `spotlights` | `{ rect, from, to? }`: dims everything else, lime outline. | One at a time. Use `to` to hand over to the next one. |
| `marks` | `{ type: 'underline' \| 'circle', rect, from }`: drawn on in 16 frames. | Underline the exact phrase; circle short values (a date, a placeholder). |
| `cursor` | Keyframes `{ frame, x, y, click? }`: arrives at `x,y` by `frame`; click shows a ripple. | Start it ~25 frames before the click, away from the target. |
| `typing` | `{ rect, textX, text, from, to, fontSize, lineHeight? }`: white box over the input, text types in. | `rect` covers the already-typed text in the screenshot; `textX` = left edge of that text. Set `lineHeight` for wrapped prompts. |
| `reveal` | `{ rect, from, duration }`: wipes a reply in top to bottom. | Cover the whole reply body; 24–34 frames. |
| `compare` | Before/after panels with `crop`, `highlight`, `stamp`, `statement`. Shot needs no `image`. | `crop` to the table/region that matters so the text stays readable. |

## Capture tips (tell whoever takes the screenshots)

- Same window size for every shot, ideally 2× resolution, so zooms stay sharp.
- Capture a flipbook of states: before the click, after the click, an empty input box, the
  prompt typed, and the full reply (scroll the reply into view, or capture it in parts).
- An empty input box lets the typing effect match the app exactly (otherwise `typing` paints
  over the already-typed text with a close-but-not-exact font).
- Close toasts and banners ("Your agent has been saved") before capturing.

## Previewing in a browser without Studio

Cloud sessions have no Remotion Studio. A playable preview can be built with `@remotion/player`
bundled by esbuild into one HTML page. Things that broke on the first attempt:

- Separate media files didn't load inside the sandboxed preview frame: embed the audio and
  screenshots as base64 and turn them into blob URLs (shim `staticFile` from `remotion`).
- In a sandbox the page origin is `"null"`, so Remotion's `new URL(src, window.origin)` throws
  (black player with a warning icon). Patch those calls at bundle time to fall back to a valid
  base when the origin is `"null"`.
- When stitching the bundle into HTML, never cut at the last `<script>` tag: the bundle itself
  contains that string. Keep the page head in a separate file and append scripts to it.
