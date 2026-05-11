import { VideoData } from '../scenes/types';

// Audio: "asking-for-options.mp3" - 200.62s total -> ~6019 frames at 30fps
// Total video: 6164 frames (includes 150f blank outro).
//
// Scenes follow the 24-scene plan. Large audio slots are split into multiple
// shorter scenes — audio sync is frame-accurate because total per-slot duration
// is preserved from the original.
//
//   scene                              | audio slot dur | layout
//   -----------------------------------|----------------|--------------------
//   title hook                         |   45           | title-card-green
//   core idea                          |  409           | big-statement
//   the slow path (process)            |  300  ┐ 623   | process-steps
//   slow vs fast (contrast)            |  323  ┘        | split-contrast
//   with people vs AI                  |  342  ┐ 684   | split-contrast
//   5× stat / so ask                   |  342  ┘        | stat-hero
//   how to ask well (intro)            |  200  ┐ 448   | big-statement
//   basic move prompt example          |  248  ┘        | prompt-example
//   way 1: ask for variety             |  350  ┐ 592   | label-title-body
//   push off default path              |  242  ┘        | big-statement
//   way 2: define the spectrum         |  293           | big-statement
//   example: headlines                 |  396           | split-contrast
//   example: campaign range            |  332           | label-title-body
//   example: 2 weeks vs 6 months       |  215           | split-contrast
//   give two directions                |  200  ┐ 360   | big-statement
//   surface unexpected ideas           |  160  ┘        | big-statement
//   bad options clarify                |  533           | big-statement
//   when to use it (chapter)           |  150  ┐ 506   | big-statement
//   drafting / deciding / ideating     |  356  ┘        | checklist-slide
//   the cost is zero                   |  130  ┐ 433   | big-statement
//   secondary trigger / when not to    |  303  ┘        | label-title-body
//   closing takeaway                   |  145           | big-statement
//   blank outro                        |  150           | blank

export const askingForOptions: VideoData = {
  audioSrc: 'audio/asking-for-options.mp3',
  scenes: [
    // ── Scene 1: Title Hook ──────────────────────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Asking for Options',
      durationInFrames: 45,
    },

    // ── Scene 2: Core Idea ───────────────────────────────────────────────────
    // VO: "There is one small change you can make to almost any AI request...
    //      ask for options instead of an answer."
    {
      layout: 'big-statement',
      text: 'Ask for options,\nnot just an answer.',
      highlight: 'options',
      size: 'hero',
      animation: 'kinetic',
      wordJumps: [
        { wordIndex: 0, frame: 232 },
        { wordIndex: 1, frame: 243 },
        { wordIndex: 2, frame: 259 },
      ],
      durationInFrames: 409,
    },

    // ── Scene 3: The Slow Path ───────────────────────────────────────────────
    // VO: "Most leaders send a prompt, get a response, and then spend time
    //      revising it until it feels right."
    {
      layout: 'process-steps',
      label: 'THE SLOW PATH',
      title: 'What Most Leaders Do',
      steps: [
        { title: 'Prompt', body: 'Send a request and wait for a single response.' },
        { title: 'Revise', body: 'Edit and re-prompt until it feels closer.' },
        { title: 'Revise again', body: 'Still not quite right. Repeat until it sticks.' },
      ],
      stepTimings: [0, 60, 150],
      rightLabel: 'THE FASTER PATH',
      rightSteps: [
        { title: 'Ask for options', body: 'Request several versions in one prompt.' },
        { title: 'Choose the strongest', body: 'Pick the direction that resonates most.' },
        { title: 'Refine from there', body: 'Polish one strong option instead of starting over.' },
      ],
      rightStepTimings: [226, 286, 360],
      highlights: [
        { from: 0, value: 'left' },
        { from: 211, value: 'right' },
      ],
      durationInFrames: 562,
    },

    // ── Scene 5: With People vs With AI ─────────────────────────────────────
    // VO: "With humans, we naturally hesitate to make that kind of request.
    //      We know people are busy..."
    {
      layout: 'split-contrast',
      leftLabel: 'WITH PEOPLE',
      leftTitle: 'A bigger ask.',
      leftBodies: [
        'People are busy.',
        'Ten options instead of one carries real cost.',
      ],
      leftBodyTimings: [0, 189],
      rightLabel: 'WITH AI',
      rightTitle: 'No extra burden.',
      rightBodies: [
        'No competing priorities, no patience limit, no added cost.',
        'Five options cost nothing more than one.',
      ],
      rightBodyTimings: [333, 480],
      showDivider: false,
      rightBodyDelay: 333,
      highlights: [
        { from: 0, value: 'left' },
        { from: 333, value: 'right' },
      ],
      durationInFrames: 702,
    },

    // ── Scene 6: So Ask ───────────────────────────────────────────────────────
    // VO: "Ask. The output quality goes up almost every time."
    {
      layout: 'big-statement',
      text: 'Ask.\nThe output quality goes up almost every time.',
      highlight: 'Ask',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 50],
      durationInFrames: 159,
    },

    // ── Scene 7: The Basic Move ───────────────────────────────────────────────
    {
      layout: 'label-title-body',
      label: 'THE BASIC MOVE',
      title: '"Give me five options" is a start — but often not enough.',
      body: [],
      durationInFrames: 248,
    },

    // ── Scene 8: How to Ask Well ──────────────────────────────────────────────
    {
      layout: 'big-statement',
      label: 'HOW TO ASK WELL',
      text: 'Two ways to get\nbetter options.',
      highlight: 'better options',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 60],
      durationInFrames: 151,
    },

    // ── Scene 9: Way 1 + Way 2 ────────────────────────────────────────────────
    {
      layout: 'split-contrast',
      leftLabel: 'WAY 1',
      leftTitle: 'Ask for Variety Explicitly',
      leftBodies: [
        '"Give me five radically different options."',
        'That forces the model off its default path.',
      ],
      leftBodyTimings: [108, 344],
      leftBodyHighlightIndices: [1],
      rightLabel: 'WAY 2',
      rightTitle: 'Define the Range',
      rightBodies: [
        'Give the model two ends of a spectrum.',
        'It fills the range between them.',
      ],
      rightBodyTimings: [600, 670],
      showDivider: false,
      highlights: [
        { from: 0, value: 'left' },
        { from: 587, value: 'right' },
      ],
      durationInFrames: 767,
    },

    // ── Transition + Examples: Define the Range slides to top-left, then examples appear ──
    {
      layout: 'title-slide-transition',
      text: 'Define the Range',
      label: 'WAY 2',
      bodyRows: [
        { label: 'Headline / subject line', prompt: '"Give me a range from a BuzzFeed-style hook to a Wall Street Journal front-page lead."' },
        { label: 'Campaign / initiative ideas', prompt: '"Give me options from highly practical this quarter to genuinely bold."' },
        { label: 'Product / project decisions', prompt: '"What could we do in two weeks versus what would take six months?"' },
      ],
      bodyRowTimings: [60, 402, 761],
      durationInFrames: 1026,
    },

    // ── Scene 15: The Big Insight ─────────────────────────────────────────────
    {
      layout: 'define-range-diagram',
      modelAppearFrame: 80,
      durationInFrames: 360,
    },

    // ── Scene 17: Bad Options Are Useful Too ──────────────────────────────────
    // VO: "Seeing options that don't work often tells you exactly what you
    //      were looking for..."
    {
      layout: 'big-statement',
      text: 'Bad options clarify what you actually want.',
      highlight: 'clarify',
      fontSize: 56,
      animation: 'kinetic',
      image: 'images/features/Define the range.png',
      imageDelay: 80,
      durationInFrames: 437,
    },

    // ── Scene 18 + 19 merged: When to Use It + Use Cases ─────────────────────
    {
      layout: 'checklist-slide',
      label: 'WHEN TO USE IT',
      title: 'Almost always.',
      statement: 'Almost always.',
      statementWordJumps: [
        { wordIndex: 0, frame: 10 },
        { wordIndex: 1, frame: 40 },
      ],
      items: [
        'Drafting: emails, headlines, proposals.',
        'Deciding: trade-offs, roadmaps, priorities.',
        'Ideating: campaigns, workshops, strategy.',
      ],
      itemTimings: [95, 114, 194],
      accentIndex: 2,
      durationInFrames: 520,
    },


    // ── Scene 21: Secondary Trigger / When Not To ─────────────────────────────
    // VO: "If you asked for one answer and it didn't feel right, don't revise it.
    //      Ask for a range instead."
    {
      layout: 'label-title-body',
      label: '',
      title: "If you asked for one answer and it didn't feel right, don't revise it.",
      body: [
        'Ask for a range instead: Stop polishing one direction — request multiple so you have something concrete to react to.',
      ],
      bodyTimings: [248],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['compare'],
      highlights: [
        { from: 0, value: 'left' },
        { from: 248, value: 'right' },
      ],
      durationInFrames: 345,
    },

    // ── Scene 22: Closing Takeaway ────────────────────────────────────────────
    // VO: "What you are actually looking for will become obvious faster than
    //      you expect."
    {
      layout: 'big-statement',
      text: "Don't ask for the answer.\nAsk for the range.",
      highlight: 'range',
      fontSize: 80,
      animation: 'fade',
      lineTimings: [0, 42],
      durationInFrames: 145,
    },

    // ── Blank outro ───────────────────────────────────────────────────────────
    {
      layout: 'blank',
      durationInFrames: 150,
    },
  ],
};
