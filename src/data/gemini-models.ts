import { VideoData } from '../scenes/types';

// Gemini Models: Flash, Thinking, and Pro
// Audio: audio/gemini-models.wav (trimmed — 95.88→104.32s section removed)
// Total audio duration: ~138.5s => 4156 frames @ 30fps
// Model versions updated: 3.6 Flash, 3.6 Thinking, 3.1 Pro
// Mobile switching section removed; model picker zoom scene removed
//
// Whisper VO map (after trim):
//   0.00 →  16.08  Opening hook (title card + big-statement)
//  16.08 →  20.64  "Gemini is better understood as a set of model choices."
//  20.64 →  26.96  "...three practical options: Flash, Thinking, and Pro."
//  26.96 →  31.84  "The default is Gemini Flash. Fast, responsive, practical."
//  31.84 →  41.20  "Use it for summarizing, drafting, brainstorming..."
//  41.20 →  52.64  "When the task has more moving parts, switch to Gemini Thinking..."
//  52.64 →  62.80  "Use it when comparing options, trade-offs, structuring..."
//  62.80 →  65.32  "For heavier work, step up to Gemini Pro."
//  65.32 →  86.60  "Complex analysis, dense strategy... real consequences."
//  86.60 →  95.88  "To switch models on desktop, click the model name..."
//  95.88 → 117.20  "Advanced models use more compute... save it for..."  [was 104.32 in orig]
// 117.20 → 138.53  "Gemini Flash is available broadly... workspace users..."
//
// Scene layout:
//  #  Layout                Start    Dur    End   VO coverage
//  1  title-card-green          0     50     50   [pre-VO]
//  2  big-statement            50    432    482   0.00 → 16.08 opening hook
//  3  centered-image-caption  482    137    619   16.08 → 20.64 model choices
//  4  three-mode-columns      619    190    809   20.64 → 26.96 three options
//  5  big-statement           809    146    955   26.96 → 31.84 Flash hero
//  6  label-title-body        955    281   1236   31.84 → 41.20 Flash use cases
//  7  big-statement          1236    343   1579   41.20 → 52.64 Thinking hero
//  8  label-title-body       1579    305   1884   52.64 → 62.80 Thinking use cases
//  9  big-statement          1884     76   1960   62.80 → 65.32 Pro hero
// 10  label-title-body       1960    638   2598   65.32 → 86.60 Pro use cases
// 11  label-title-body       2598    278   2876   86.60 → 95.88 desktop switching
// 12  split-contrast         2876    642   3518   95.88 → 117.20 compute limits
// 13  label-title-body       3518    631   4149  117.20 → 138.53 availability
//                                          ────
//                                   Total: 4149 frames (~138.3s)

export const geminiModels: VideoData = {
  audioSrc: 'audio/gemini-models.wav',
  scenes: [
    // ── 00:00.00  title card (pre-VO) ──────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Gemini Models',
      label: 'SELECTING MODELS',
      durationInFrames: 50,
    },

    // ── 00:00.00 → 00:16.08  opening hook ─────────────────────────────
    // VO: "Most people pick one AI model and use it for everything.
    //      That habit costs you. Either you are waiting too long for
    //      simple answers, or you are getting shallow responses on
    //      work that actually matters."
    {
      layout: 'big-statement',
      text: 'One model for everything\nis costing you.',
      highlight: 'costing',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 432,
    },

    // ── 00:16.08 → 00:20.64  model choices — image ────────────────────
    // VO: "Gemini is better understood as a set of model choices."
    {
      layout: 'centered-image-caption',
      image: 'images/gemini-models/models-option.png',
      objectFit: 'contain',
      caption: 'Three practical options',
      durationInFrames: 137,
    },

    // ── 00:20.64 → 00:26.96  three practical options ──────────────────
    // VO: "...three practical options, Flash, Thinking, and Pro."
    {
      layout: 'three-mode-columns',
      label: 'THREE OPTIONS',
      title: 'Pick the Model That Matches the Task',
      columns: [
        {
          label: 'DEFAULT',
          title: 'Flash',
          body: [
            'Fast, responsive, practical',
            'Everyday work that needs to get done',
          ],
        },
        {
          label: 'MIDDLE GROUND',
          title: 'Thinking',
          body: [
            'More room to reason',
            'Complex problems, trade-offs, plans',
          ],
        },
        {
          label: 'ADVANCED',
          title: 'Pro',
          body: [
            'Strongest performance',
            'High-stakes analysis and strategy',
          ],
        },
      ],
      highlights: [
        { from: 0, value: 0 },
        { from: 1, value: 1 },
        { from: 2, value: 2 },
        { from: 3, value: null },
        { from: 120, value: 0 },
        { from: 139, value: 1 },
        { from: 158, value: null },
      ],
      durationInFrames: 190,
    },

    // ── 00:26.96 → 00:31.84  Gemini Flash — hero intro ───────────────
    // VO: "The default is Gemini Flash. It is fast, responsive, and practical."
    {
      layout: 'big-statement',
      label: 'DEFAULT',
      text: 'Gemini Flash',
      highlight: 'Flash',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 146,
    },

    // ── 00:31.84 → 00:41.20  Gemini Flash — use cases ─────────────────
    // VO: "Use it for the work you simply need to get done like summarizing
    //      a document, drafting an email, brainstorming a list, or
    //      answering a straightforward question."
    {
      layout: 'label-title-body',
      label: 'GEMINI FLASH',
      title: 'Fast, Responsive, Practical',
      body: [
        'The default model for everyday work',
        'Summarize, draft, brainstorm, quick answers',
      ],
      bodyTimings: [0, 100],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'chat-bubble-left-right'],
      durationInFrames: 281,
    },

    // ── 00:41.20 → 00:52.64  Gemini Thinking — hero intro ────────────
    // VO: "When the task has more moving parts, switch to Gemini Thinking.
    //      It is still designed to be practical, but it gives Gemini more
    //      room to reason through the problem before it answers."
    {
      layout: 'big-statement',
      label: 'MIDDLE GROUND',
      text: 'Gemini Thinking',
      highlight: 'Thinking',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 343,
    },

    // ── 00:52.64 → 01:02.80  Gemini Thinking — use cases ─────────────
    // VO: "Use it when you are comparing options, working through
    //      trade-offs, structuring a plan, debugging, or turning
    //      scattered information into a clear recommendation."
    {
      layout: 'label-title-body',
      label: 'GEMINI THINKING',
      title: 'More Reasoning for Complex Problems',
      body: [
        'More room to reason before answering',
        'Compare options, structure plans, debug, synthesize',
      ],
      bodyTimings: [0, 50],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['light-bulb', 'puzzle-piece'],
      durationInFrames: 305,
    },

    // ── 01:02.80 → 01:05.32  Gemini Pro — hero intro ──────────────────
    // VO: "For heavier work, step up to Gemini Pro."
    {
      layout: 'big-statement',
      label: 'ADVANCED',
      text: 'Gemini Pro',
      highlight: 'Pro',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 76,
    },

    // ── 01:05.32 → 01:26.60  Gemini Pro — use cases ───────────────────
    // VO: "This is the option for complex analysis, dense strategy work...
    //      Use Pro when the answer has real consequences."
    {
      layout: 'label-title-body',
      label: 'GEMINI PRO',
      title: 'Advanced Work, Real Consequences',
      body: [
        'Complex analysis, strategy, code, dense technical work',
        'Use when the cost of a weak answer is high',
      ],
      bodyTimings: [0, 260],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['star', 'shield-check'],
      durationInFrames: 638,
    },

    // ── 01:26.60 → 01:35.88  how to switch — desktop ──────────────────
    // VO: "To switch models in Gemini on desktop, start a chat and click
    //      the model name in the prompt box. From there, choose the model
    //      available on your plan."
    {
      layout: 'label-title-body',
      label: 'HOW TO SWITCH',
      title: 'On Desktop',
      body: [
        'Click the model name in the prompt box',
      ],
      bodyTimings: [0],
      image: 'images/gemini-models/model-picker.png',
      durationInFrames: 278,
    },

    // ── 01:35.88 → 01:57.20  compute cost and limits ──────────────────
    // VO: "One key thing to understand is that advanced models use more
    //      compute. A simple Flash response uses less compute than a
    //      Thinking or Pro response — that is why the most capable options
    //      usually come with tighter limits. Do not spend your highest
    //      reasoning mode on simple tasks. Save it for work where better
    //      reasoning actually changes the outcome."
    {
      layout: 'split-contrast',
      leftLabel: 'FLASH',
      leftTitle: 'Less Compute',
      leftBodies: [
        'Fast responses, broad usage limits',
        'Right for everyday tasks where speed matters',
      ],
      leftBodyTimings: [0, 142],
      rightLabel: 'THINKING & PRO',
      rightTitle: 'More Compute',
      rightBodies: [
        'Deeper reasoning, tighter usage limits',
        'Save for work where quality changes the outcome',
      ],
      rightBodyTimings: [142, 407],
      showDivider: true,
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: null },
        { from: 142, value: 'left' },
        { from: 310, value: 'right' },
      ],
      durationInFrames: 642,
    },

    // ── 02:05.72 → 02:26.76  availability and pricing ─────────────────
    // VO: "On availability, Gemini Flash is available broadly, including
    //      on the free tier. Google AI Plus adds higher usage limits and
    //      access to Flash Thinking. Google AI Pro adds access to the
    //      Pro model. For workspace users, availability depends on your
    //      organization's edition, add-ons, and admin settings."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Who Gets What',
      body: [
        'Flash: Free tier — available broadly',
        'Google AI Plus: Higher limits + Flash Thinking',
        'Google AI Pro: Pro model + advanced capabilities',
        'Workspace: Depends on edition and admin settings',
      ],
      bodyTimings: [0, 155, 284, 458],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'plus', 'star', 'building-office'],
      durationInFrames: 631,
    },
  ],
};
