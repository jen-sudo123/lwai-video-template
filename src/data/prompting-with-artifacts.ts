import { VideoData } from '../scenes/types';

// Prompting with Artifacts
// Audio: public/audio/prompting-with-artifacts.mp3 — 165.9s, VO speech 1.72s → 163.54s.
// No audioStartFrame: the title card sits over the 1.7s of lead-in silence,
// so composition frame = round(word_t × 30).
// Word timestamps: ElevenLabs Scribe → src/data/prompting-with-artifacts.transcript.json
//
//   #  scene                                   | sec           | frames        | dur  | layout
//   ---|----------------------------------------|---------------|---------------|------|---------------------
//   1  title                                    |   0.0 –   1.5 |    0 →   45   |   45 | title-card-green
//   2  the translation tax (definition)         |   1.5 –  11.5 |   45 →  345   |  300 | big-statement
//   3  artifacts → plain text → TAX stamp       |  11.5 –  26.6 |  345 →  798   |  453 | artifact-flow (tax)
//   4  modern AI is multimodal                  |  26.6 –  35.0 |  798 → 1050   |  252 | big-statement
//   5  screenshots/photos/audio/video → AI      |  35.0 –  41.6 | 1050 → 1248   |  198 | artifact-flow (direct)
//   6  describe vs show                         |  41.6 –  49.0 | 1248 → 1470   |  222 | split-contrast
//   7  AI sees / hears / works from evidence    |  49.0 –  61.4 | 1470 → 1842   |  372 | label-title-body (cards)
//   8  the tax drops                            |  61.4 –  72.0 | 1842 → 2160   |  318 | big-statement (fade)
//   9  example: dashboard screenshot            |  72.0 –  79.0 | 2160 → 2370   |  210 | artifact-prompt
//  10  example: deck / memo                     |  79.0 –  87.0 | 2370 → 2610   |  240 | artifact-prompt
//  11  example: whiteboard photo                |  87.0 –  95.4 | 2610 → 2862   |  252 | artifact-prompt
//  12  explain less, think together more        |  95.4 – 100.6 | 2862 → 3018   |  156 | big-statement
//  13  a simple framework                       | 100.6 – 107.2 | 3018 → 3216   |  198 | big-statement
//  14  observe / interpret / transform / verify | 107.2 – 148.0 | 3216 → 4440   | 1224 | process-steps
//  15  show the artifact, skip the tax          | 148.0 – 158.6 | 4440 → 4758   |  318 | big-statement (fade)
//  16  a real executive tool                    | 158.6 – 166.4 | 4758 → 4992   |  234 | big-statement

export const promptingWithArtifacts: VideoData = {
  audioSrc: 'audio/prompting-with-artifacts.mp3',
  scenes: [
    // 1 — title (0 → 45)
    {
      layout: 'title-card-green',
      title: 'Prompting with Artifacts',
      subtitle: 'Stop paying the translation tax',
      durationInFrames: 45,
    },

    // 2 — 1.5 → 11.5
    // VO: "Let's talk about something called the translation tax. The translation tax
    //      is the extra work that you do just to make AI usable."
    {
      layout: 'big-statement',
      label: 'THE TRANSLATION TAX',
      text: 'The extra work you do\njust to make AI usable.',
      highlight: 'just to make AI usable.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 300,
    },

    // 3 — 11.5 → 26.6 (scene start 345)
    // VO: "You take charts(12.10), slides(13.00), dashboards(13.76), notes(14.72), files(15.32),
    //      and you turn them into text(16.90) ... So instead of actually working,
    //      you're transcribing(23.26), and that's the tax(25.66)."
    {
      layout: 'artifact-flow',
      mode: 'tax',
      label: 'THE TRANSLATION TAX',
      titles: [
        { from: 0, text: 'Your real work lives in artifacts.' },
        { from: 160, text: 'So you turn it all into text.', highlight: 'text' },
        { from: 345, text: "Instead of working, you're transcribing.", highlight: "you're transcribing" },
      ],
      items: [
        { kind: 'chart', label: 'Charts' },
        { kind: 'slide', label: 'Slides' },
        { kind: 'dashboard', label: 'Dashboards' },
        { kind: 'notes', label: 'Notes' },
        { kind: 'file', label: 'Files' },
      ],
      itemTimings: [18, 45, 68, 97, 115],
      convertFrame: 162,
      stampFrame: 425,
      durationInFrames: 453,
    },

    // 4 — 26.6 → 35.0
    // VO: "But this doesn't need to be the case anymore because modern AI systems aren't
    //      just text-based anymore, they are multimodal(33.36)."
    {
      layout: 'big-statement',
      text: "Modern AI isn't just text-based.\nIt's multimodal.",
      highlight: 'multimodal.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 252,
    },

    // 5 — 35.0 → 41.6 (scene start 1050)
    // VO: "They can work directly with screenshots(36.64), photos(37.48), audio(38.28),
    //      video(38.72), and other inputs(39.68) natively(40.38)."
    {
      layout: 'artifact-flow',
      mode: 'direct',
      label: 'MULTIMODAL AI',
      titles: [{ from: 0, text: 'It works directly with what you have.', highlight: 'directly' }],
      items: [
        { kind: 'screenshot', label: 'Screenshots' },
        { kind: 'photo', label: 'Photos' },
        { kind: 'audio', label: 'Audio' },
        { kind: 'video', label: 'Video' },
        { kind: 'inputs', label: 'And more' },
      ],
      itemTimings: [49, 74, 98, 112, 140],
      aiFrame: 20,
      badgeFrame: 160,
      badgeText: 'Natively',
      durationInFrames: 198,
    },

    // 6 — 41.6 → 49.0 (scene start 1248)
    // VO: "So instead of asking, 'How do I describe this for the AI?' I can ask,
    //      'What(46.34) can I show the AI directly?'"
    {
      layout: 'split-contrast',
      leftLabel: 'INSTEAD OF ASKING',
      leftTitle: '“How do I describe this for the AI?”',
      rightLabel: 'ASK',
      rightTitle: '“What can I show the AI directly?”',
      rightLightUpFrame: 134,
      highlights: [
        { from: 0, value: 'left' },
        { from: 134, value: 'right' },
      ],
      durationInFrames: 222,
    },

    // 7 — 49.0 → 61.4 (scene start 1470)
    // VO: "And when you share that artifact, like a photo or screenshots, the AI can see(53.88)
    //      what you see. It can even hear(56.30) what you hear, and it can work(58.18) from
    //      the same evidence that you're working from."
    {
      layout: 'label-title-body',
      label: 'SHARE THE ARTIFACT',
      title: 'AI works from the same evidence you do.',
      body: [
        'See: what you see',
        'Hear: what you hear',
        'Work: from the same evidence',
      ],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'speaker-wave', 'bolt'],
      bodyTimings: [146, 219, 275],
      durationInFrames: 372,
    },

    // 8 — 61.4 → 72.0 (scene start 1842)
    // VO: "And that's how the translation tax drops. Nothing(64.28) gets lost in re-explaining
    //      anymore, and your(67.92) attention stays on the higher value work."
    {
      layout: 'big-statement',
      label: 'THE PAYOFF',
      text: 'The translation tax drops.\nNothing lost in re-explaining.\nFocus stays on higher-value work.',
      highlight: 'The translation tax drops.',
      size: 'title',
      fontSize: 68,
      animation: 'fade',
      lineTimings: [0, 86, 196],
      durationInFrames: 318,
    },

    // 9 — 72.0 → 79.0 (scene start 2160)
    // VO: "For example, you could upload(73.48) a screenshot of a dashboard and ask,
    //      'What(76.20) stands out here? What(77.32) should worry me?'"
    {
      layout: 'artifact-prompt',
      variant: 'dashboard',
      label: 'EXAMPLE 1 · SCREENSHOT',
      title: 'Upload the dashboard.',
      fileName: 'q3-dashboard.png',
      artifactTiming: 40,
      prompts: ['What stands out here?', 'What should worry me?'],
      promptTimings: [126, 160],
      durationInFrames: 210,
    },

    // 10 — 79.0 → 87.0 (scene start 2370)
    // VO: "Or you share a slide deck(80.06) or a memo and ask, 'What(82.08) would be unclear
    //      or perceived as risky from an investor's perspective?'"
    {
      layout: 'artifact-prompt',
      variant: 'deck',
      label: 'EXAMPLE 2 · DECK OR MEMO',
      title: 'Share the deck or memo.',
      fileName: 'series-b-deck.pdf',
      artifactTiming: 28,
      prompts: ["What would be unclear or risky from an investor's perspective?"],
      promptTimings: [92],
      durationInFrames: 240,
    },

    // 11 — 87.0 → 95.4 (scene start 2610)
    // VO: "Or you can take a photo(88.14) of a whiteboard after a messy brainstorm and ask,
    //      'Turn(91.50) this into a clear strategic narrative.'"
    {
      layout: 'artifact-prompt',
      variant: 'whiteboard',
      label: 'EXAMPLE 3 · PHOTO',
      title: 'Snap the whiteboard.',
      fileName: 'whiteboard.jpg',
      artifactTiming: 30,
      prompts: ['Turn this into a clear strategic narrative.'],
      promptTimings: [135],
      durationInFrames: 252,
    },

    // 12 — 95.4 → 100.6 (scene start 2862)
    // VO: "In all of these cases, you're explaining less(97.78) and thinking together more(99.68)."
    {
      layout: 'big-statement',
      text: 'Explain less.\nThink together more.',
      highlight: 'Think together more.',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 156,
    },

    // 13 — 100.6 → 107.2
    // VO: "Now, to make this work well, especially with more messy artifacts, there's a
    //      simple framework."
    {
      layout: 'big-statement',
      label: 'MAKING IT WORK',
      text: 'Messy artifacts need\na simple framework.',
      highlight: 'a simple framework.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 198,
    },

    // 14 — 107.2 → 148.0 (scene start 3216)
    // VO: observe(108.34) · interpret(118.04) · transform(131.74) · verify(142.26)
    {
      layout: 'process-steps',
      label: 'THE FRAMEWORK',
      title: 'Observe, interpret, transform, verify.',
      steps: [
        { title: 'Observe', body: 'Ask AI to describe only what it sees. No interpretation yet, so you can spot errors.' },
        { title: 'Interpret', body: "Have it show what's clear and what's missing or ambiguous. Add critical context." },
        { title: 'Transform', body: 'Turn the artifact into a plan, summary, decision brief, or analysis.' },
        { title: 'Verify', body: 'Check the final output as you would with any other modality.' },
      ],
      stepTimings: [34, 325, 736, 1052],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 1224,
    },

    // 15 — 148.0 → 158.6 (scene start 4440)
    // VO: "And that's how you use AI with artifacts like photos, screenshots, and even audio
    //      or video natively, rather(154.70) than paying a translation tax as the transcriber,"
    {
      layout: 'big-statement',
      text: 'Show the artifact.\nSkip the translation tax.',
      highlight: 'Skip the translation tax.',
      size: 'hero',
      animation: 'fade',
      lineTimings: [0, 196],
      durationInFrames: 318,
    },

    // 16 — 158.6 → 166.4 (scene start 4758)
    // VO: "and it's how AI becomes a real executive tool and not just a clever assistant."
    {
      layout: 'big-statement',
      text: 'A real executive tool,\nnot just a clever assistant.',
      highlight: 'A real executive tool,',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 234,
    },
  ],
};
