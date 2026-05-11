# Public assets

Drop video assets here. Reference them in `src/data/sample-scenes.ts` using paths relative to this folder.

## Structure

```
public/
├── audio/        # Voiceover files (.mp3, .wav)
└── images/       # Photos, screenshots, charts, illustrations
```

## How to reference

In your scenes file:

```ts
{ layout: 'centered-image-caption', image: 'images/my-screenshot.png', ... }
```

Remotion's `staticFile()` helper resolves these paths automatically. Don't include `public/` in the path — start from `images/` or `audio/`.

## Sample assets

The sample video in `src/data/sample-scenes.ts` references:
- `images/sample-laptop.jpg`
- `images/sample-thinking.jpg`
- `images/sample-making.jpg`
- `images/sample-chart.png`

Drop your own files with these names to see the sample render, or edit `sample-scenes.ts` to point to whatever you have.
