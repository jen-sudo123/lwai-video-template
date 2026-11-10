# LWAI demo kit

The building blocks behind the hand-built demo videos (first used in `src/compositions/ClaudeSkills.tsx`,
in the style of `AdvancedModelsChatGPT.tsx`). Use it for a custom composition when the slide template
isn't enough: screenshot walkthroughs with a moving camera and cursor, and animated concept scenes.

```ts
import { makeScene, AppWindow, enter, markStyle, KIT_CSS } from '../kit';
```

## The model: one clock, in VO seconds

- `t = frame / fps` inside a `<Sequence from={TITLE_FRAMES}>`, so `t` matches the VO word timestamps
  (`src/data/<name>.transcript.json`) directly. Every cue is written as the second of the word it names.
- `const STARTS = [0, 13.24, …]` lists each scene's start; `const Scene = makeScene(STARTS)` gives a
  `<Scene t index>` that crossfades (0.5s) into the next one.
- Mount `<style>{KIT_CSS}</style>` once and `<LogoFooter />` on top (zIndex above the scenes).

## Pieces

| Module | What |
|---|---|
| `motion.ts` | `prog(t, at, dur)` 0→1 tween · `enter(t, at, {x, y, scale, dur, easing})` fade/slide-in style · `markStyle(t, at)` lime marker sweep (on a `.kit-mark` span) · `typed(t, at, text)` typewriter · easings `OUT`, `IN_OUT`, `BACK` |
| `theme.ts` | Colour tokens (`INK`, `MUTED`, `LINE`, `LIME`, `LIME_SOFT`, `GREEN`, `RED`) and `KIT_CSS`: `.kit-pad` (safe-area page), `.kit-label` (lime-dash eyebrow), `.kit-h1/h2/h3` (Plex Serif), `.kit-body`, `.kit-card`, `.kit-pill`, `.kit-tag`, `.kit-mono`, `.kit-mark` |
| `Scene.tsx` | `makeScene(starts, crossfade?)` |
| `AppWindow.tsx` | Screenshot in a browser window with camera, cursor, rings and STEP captions (below) |
| `icons.tsx` | `Check`, `Cross`, `FolderIcon`, `FileIcon`, `Spark`, `Toggle`, `Arrow` (animated draw-on) |
| `mocks.tsx` | `Composer` (prompt box) and `MenuList` (dropdown) for "how to use it" concept scenes |

## AppWindow

```tsx
<AppWindow
  t={t} start={71.68} src={staticFile('my-video/images/01.png')} imgW={1920} imgH={958}
  cam={[{ at: 75.0, x: 1350, y: 260, s: 1.7 }]}                  // centre on pixel (x, y) at zoom s
  cursor={[{ at: 71.9, x: 700, y: 520 }, { at: 74.9, x: 1532, y: 100, click: true }]}
  rings={[{ at: 75.7, x: 1496, y: 88, w: 76, h: 26, spot: true }]} // spot dims everything else
  steps={[{ at: 72.6, text: 'Customize' }, { at: 75.72, text: '+ Add' }]}
/>
```

- **Coordinates are the screenshot's own pixels** (`imgW` × `imgH`, default 1920×1080 — pass the real size).
  Measure them from the PNG, then confirm with a still: a ring 70px off is obvious on screen.
- Camera/cursor keyframes ease from the previous state (`dur` default 1.0s camera, 0.8s cursor). A cursor
  `click` fires when it arrives (`at + dur`). A camera key with `dur: 0.01` at the scene start begins a scene
  already zoomed (useful to continue from the previous shot).
- `numbered={false}` shows the captions without the STEP badge (for walkthroughs where they are labels, not a count).
- `left`, `top`, `width` place a smaller window (e.g. `left={70} top={150} width={1060}`) next to a text column.

## In a data file (no custom composition)

The same treatment is available as a scene layout, with times in seconds **from the scene start**:

```ts
{
  layout: 'app-window',
  image: 'my-video/images/01.png',
  imageHeight: 958,
  camera: [{ at: 2.2, x: 1350, y: 260, s: 1.7 }],
  cursor: [{ at: 0.4, x: 700, y: 520 }, { at: 1.2, x: 1532, y: 100, click: true }],
  rings: [{ at: 2.0, x: 1496, y: 88, w: 76, h: 26, spot: true }],
  steps: [{ at: 0.5, text: 'Customize' }, { at: 2.0, text: '+ Add' }],
  durationInFrames: 120,
}
```

## Style rules that make it look like the house style

- One idea per scene; the headline names it, the animation proves it. Prefer showing the thing
  (a folder tree that builds, a toggle that switches, a document that fills in) over bullet cards.
- Reveal each element on the word that names it; use `markStyle` on the one phrase that matters.
- Screenshot scenes: always move — zoom to what the VO names, click what it says to click, spotlight what to look at.
- Keep the 80px safe margin (`.kit-pad`), Plex Serif for headings, Public Sans for UI/body, lime only as accent.
- Before the named example is introduced, use generic names in mocks (`your-skill`), not the example's.
