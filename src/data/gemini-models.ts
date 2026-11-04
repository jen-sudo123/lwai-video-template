import { VideoData } from '../scenes/types';

// Gemini Models: Flash, Thinking, and Pro (v2 — Nov 2026 update)
// Script: src/data/gemini-models.script.txt
// Audio:  audio/gemini-models-v2.mp3 (ElevenLabs, Daan, take B) — 165.05s => 4952 frames
// Words:  src/data/gemini-models-v2.words.json (word timestamps on take B)
// Audio starts at frame 0 (no audioStartFrame); the title card plays over the first line.
//
// Scene layout:
//  #  Layout                 Start   Dur    End   VO
//  1  title-card-green           0    50     50   "Most people pick..." (under title)
//  2  big-statement             50   340    390   hook + cost
//  3  three-mode-columns       390   278    668   "several model choices... Flash, Thinking, Pro"
//  4  label-title-body         668   209    877   "models you see may differ..."
//  5  big-statement            877   148   1025   Flash hero
//  6  label-title-body        1025   362   1387   Flash use cases
//  7  big-statement           1387   112   1499   Thinking hero
//  8  label-title-body        1499   316   1815   Thinking use cases
//  9  label-title-body        1815   300   2115   Thinking tip: constraints
// 10  big-statement           2115    87   2202   Pro hero
// 11  label-title-body        2202   346   2548   Pro strengths
// 12  label-title-body        2548   430   2978   Pro real consequences
// 13  label-title-body        2978   336   3314   how to switch (step cards)
// 14  centered-image-caption  3314   319   3633   model-picker-v2.png "3.6 Flash, 3.8 Thinking, 3.1 Pro"
// 15  label-title-body        3633   437   4070   practical notes: speed + limits
// 16  label-title-body        4070   305   4375   access: personal vs Workspace
// 17  label-title-body        4375   236   4611   availability can change
// 18  split-contrast          4611   167   4778   rule of thumb
// 19  big-statement           4778   204   4982   close (+30f tail after VO)

export const geminiModels: VideoData = {
  audioSrc: 'audio/gemini-models-v2.mp3',
  scenes: [
    // 1 ── 0.00s title card ─────────────────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Gemini Models',
      label: 'SELECTING MODELS',
      durationInFrames: 50,
    },

    // 2 ── 1.67 → 13.02s hook ───────────────────────────────────────────
    // VO: "Most people pick one AI model and use it for everything. That can
    //      mean waiting longer than you need to for a simple answer, or missing
    //      the chance to use more reasoning on a complex problem."
    {
      layout: 'big-statement',
      text: 'One model for everything\nis costing you.',
      highlight: 'costing',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 340,
    },

    // 3 ── 13.02 → 22.28s three options ─────────────────────────────────
    // VO: "Gemini gives you several model choices... the options are Flash (20.02),
    //      Thinking (20.48), and Pro (21.24)."
    {
      layout: 'three-mode-columns',
      label: 'THREE OPTIONS',
      title: 'Pick the Model That Matches the Task',
      columns: [
        {
          label: 'EVERYDAY',
          title: 'Flash',
          body: ['Fast, everyday work', 'Summarize, draft, brainstorm'],
        },
        {
          label: 'MORE REASONING',
          title: 'Thinking',
          body: ['Complex problems', 'Options, trade-offs, plans'],
        },
        {
          label: 'ADVANCED',
          title: 'Pro',
          body: ['Demanding tasks', 'Where quality matters most'],
        },
      ],
      highlights: [
        { from: 202, value: 0 },
        { from: 216, value: 1 },
        { from: 239, value: 2 },
        { from: 262, value: null },
      ],
      durationInFrames: 278,
    },

    // 4 ── 22.28 → 29.22s options may differ ────────────────────────────
    // VO: "The models you see may differ, depending on your account (24.59),
    //      your Workspace license (25.29), and your administrator settings (26.73)."
    {
      layout: 'label-title-body',
      label: 'YOUR OPTIONS MAY DIFFER',
      title: 'What You See Depends On',
      body: ['Your account', 'Your Workspace license', 'Your administrator settings'],
      bodyTimings: [70, 91, 134],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'check', 'sliders'],
      durationInFrames: 209,
    },

    // 5 ── 29.22 → 34.17s Flash hero ────────────────────────────────────
    // VO: "Gemini Flash is a practical starting point for straightforward tasks."
    {
      layout: 'big-statement',
      label: 'FAST, EVERYDAY WORK',
      text: 'Gemini Flash',
      highlight: 'Flash',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 148,
    },

    // 6 ── 34.17 → 46.23s Flash use cases ───────────────────────────────
    // VO: "Use it for the work you simply need to get done. Summarizing (37.72),
    //      drafting (39.41), brainstorming (40.94), rewriting (42.54),
    //      answering (43.94)..."
    {
      layout: 'label-title-body',
      label: 'GEMINI FLASH',
      title: 'Work You Simply Need to Get Done',
      body: [
        'Summarize a document',
        'Draft an email',
        'Brainstorm a list',
        'Rewrite a paragraph',
        'Answer a straightforward question',
      ],
      bodyTimings: [107, 157, 203, 251, 293],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sparkles', 'chat-bubble-left-right', 'lightbulb', 'pencil', 'check'],
      durationInFrames: 362,
    },

    // 7 ── 46.23 → 49.98s Thinking hero ─────────────────────────────────
    // VO: "When the task has more moving parts, try Gemini Thinking."
    {
      layout: 'big-statement',
      label: 'MORE MOVING PARTS',
      text: 'Gemini Thinking',
      highlight: 'Thinking',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 112,
    },

    // 8 ── 49.98 → 60.49s Thinking use cases ────────────────────────────
    // VO: "comparing options (51.14), working through trade-offs (52.55),
    //      structuring a plan (54.00), debugging (55.17), turning scattered
    //      information (56.81) into a clear recommendation."
    {
      layout: 'label-title-body',
      label: 'GEMINI THINKING',
      title: 'More Reasoning for Complex Problems',
      body: [
        'Compare options',
        'Work through trade-offs',
        'Structure a plan',
        'Debug a messy issue',
        'Turn scattered information into a recommendation',
      ],
      bodyTimings: [35, 77, 121, 156, 205],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['compare', 'sliders', 'trending', 'eye', 'lightbulb'],
      durationInFrames: 316,
    },

    // 9 ── 60.49 → 70.51s Thinking tip ──────────────────────────────────
    // VO: "Give it the information and constraints that matter... include your
    //      budget (66.15), your deadlines (66.87), and the criteria (67.86)..."
    {
      layout: 'label-title-body',
      label: 'TIP',
      title: 'Give It the Constraints That Matter',
      body: ['Your budget', 'Your deadlines', 'The criteria to use'],
      bodyTimings: [170, 191, 221],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'clock', 'check'],
      durationInFrames: 300,
    },

    // 10 ── 70.51 → 73.40s Pro hero ─────────────────────────────────────
    // VO: "For heavier work, step up to Gemini Pro."
    {
      layout: 'big-statement',
      label: 'HEAVIER WORK',
      text: 'Gemini Pro',
      highlight: 'Pro',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 87,
    },

    // 11 ── 73.40 → 84.93s Pro strengths ────────────────────────────────
    // VO: "advanced math (74.63), coding, complex analysis (76.21), dense strategy
    //      work, and tasks where you need stronger performance (80.40) across
    //      text, files, images, or video."
    {
      layout: 'label-title-body',
      label: 'GEMINI PRO',
      title: 'Advanced Reasoning for Demanding Tasks',
      body: [
        'Advanced math and coding',
        'Complex analysis and dense strategy work',
        'Stronger performance across text, files, images, and video',
      ],
      bodyTimings: [37, 84, 210],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['star', 'trending', 'sparkles'],
      durationInFrames: 346,
    },

    // 12 ── 84.93 → 99.27s Pro real consequences ────────────────────────
    // VO: "Use Pro when the answer has real consequences. Pressure-testing (89.05),
    //      analyzing (91.29), working through (93.67), making sense (96.22)..."
    {
      layout: 'label-title-body',
      label: 'WHEN QUALITY MATTERS MOST',
      title: 'Use Pro When the Answer Has Real Consequences',
      body: [
        'Pressure-test a strategic brief',
        'Analyze multiple documents',
        'Work through a technical problem',
        'Make sense of a complex decision',
      ],
      bodyTimings: [123, 191, 262, 339],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'eye', 'sliders', 'lightbulb'],
      durationInFrames: 430,
    },

    // 13 ── 99.27 → 110.47s how to switch ───────────────────────────────
    // VO: "To switch models in Gemini on desktop, start a chat (101.60) and click
    //      the model name (102.88) in the prompt box. From there, choose (106.98)
    //      a model that's available on your plan."
    {
      layout: 'label-title-body',
      label: 'HOW TO SWITCH',
      title: 'On Desktop',
      body: [
        'Start a chat',
        'Click the model name in the prompt box',
        'Choose a model available on your plan',
      ],
      bodyTimings: [70, 108, 231],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['chat-bubble-left-right', 'sliders', 'check'],
      durationInFrames: 336,
    },

    // 14 ── 110.47 → 121.12s models in my interface ─────────────────────
    // VO: "In my interface, the options are three point six Flash for all-around
    //      help, three point eight Thinking for complex problems, and three point
    //      one Pro for advanced reasoning."
    // model-picker-v2.png = model-picker.png edited to match the current picker (3.8 Thinking, "Advanced reasoning")
    {
      layout: 'centered-image-caption',
      image: 'images/gemini-models/model-picker-v2.png',
      objectFit: 'contain',
      caption: 'The models in my interface',
      durationInFrames: 319,
    },

    // 15 ── 121.12 → 135.67s practical notes ────────────────────────────
    // VO: "More demanding reasoning (122.50) can take longer, and Thinking and Pro
    //      (125.30) have usage limits... Long conversations (130.00), large files,
    //      and complex requests can also affect how quickly you reach those limits."
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: 'Speed and Usage Limits',
      body: [
        'Takes longer: More demanding reasoning needs more time',
        'Usage limits: Thinking and Pro limits depend on your plan',
        'Heavier use: Long chats, large files, and complex requests',
      ],
      bodyTimings: [42, 126, 267],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['clock', 'sliders', 'bolt'],
      durationInFrames: 437,
    },

    // 16 ── 135.67 → 145.84s access ─────────────────────────────────────
    // VO: "For personal accounts (135.87), access depends on your Google AI plan.
    //      For Workspace accounts (139.11), it depends on your organization's
    //      license, any additional subscriptions, and your administrator settings."
    {
      layout: 'label-title-body',
      label: 'ACCESS',
      title: 'What Determines Access',
      body: [
        'Personal accounts: Your Google AI plan',
        'Workspace accounts: License, subscriptions, and admin settings',
      ],
      bodyTimings: [6, 103],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'sliders'],
      durationInFrames: 305,
    },

    // 17 ── 145.84 → 153.72s stay current ───────────────────────────────
    // VO: "Model availability and usage limits can change, so check (148.22)
    //      Google's support pages for the latest details. You'll find the links
    //      (151.46) with this lesson."
    {
      layout: 'label-title-body',
      label: 'STAY CURRENT',
      title: 'Availability and Limits Can Change',
      body: ["Check Google's support pages", 'Links are included with this lesson'],
      bodyTimings: [72, 169],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'check'],
      durationInFrames: 236,
    },

    // 18 ── 153.72 → 159.25s rule of thumb ──────────────────────────────
    // VO: "My rule of thumb is simple. Use Flash (155.16) for straightforward work,
    //      and Thinking (156.54) or Pro when the task needs more analysis."
    {
      layout: 'split-contrast',
      leftLabel: 'FLASH',
      leftTitle: 'Straightforward Work',
      leftBodies: ['Fast answers for everyday tasks'],
      leftBodyTimings: [44],
      rightLabel: 'THINKING OR PRO',
      rightTitle: 'More Analysis',
      rightBodies: ['When the task needs more reasoning'],
      rightBodyTimings: [85],
      showDivider: true,
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: null },
        { from: 44, value: 'left' },
        { from: 85, value: 'right' },
      ],
      durationInFrames: 167,
    },

    // 19 ── 159.25 → 166.05s close ──────────────────────────────────────
    // VO: "Give Gemini clear instructions, check the result, and use more
    //      reasoning when it helps solve the problem."
    {
      layout: 'big-statement',
      text: 'Clear instructions.\nCheck the result.',
      highlight: 'Check',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 204,
    },
  ],
};
