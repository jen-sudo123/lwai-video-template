import { VideoData } from '../scenes/types';

// Claude Models: Haiku, Sonnet, Opus
// Audio: audio/claude-models.mp3
// Total audio duration: 167.07s => 5012 frames @ 30fps
//
// Frame-accurate VO map (Whisper base, +2.04s silence offset):
//   0.00 →   2.04  [silence]
//   2.04 →   9.00  "You're paying for a frontier model… not using one."
//   9.00 →  18.40  "Claude gives you three models… shapes how useful the tool is."
//  18.40 →  39.72  "The first one is Claude Sonnet 4.6… charts, PDFs, or tables."
//  39.72 →  49.88  "That's the contrast to Claude's lightweight Haiku 4.5… depth."
//  49.88 →  64.08  "Finally, Claude Opus 4.8… multidisciplinary reasoning."
//  64.08 →  97.24  "However, the trade-off is usage… use Sonnet for everything else."
//  97.24 → 121.12  "To switch models… faster the credits run out."
// 121.12 → 167.07  "On availability… you'll get more out of both."
//
// Scene layout:
//  #  Layout               Comp start  Duration  Comp end  VO coverage
//  1  title-card-green            0       60        60     [silence]
//  2  big-statement              60      490       550     hook
//  3  big-statement (Sonnet)    550       60       610     Sonnet hero
//  4  label-title-body          610      580      1190     Sonnet details
//  5  big-statement (Haiku)    1190       60      1250     Haiku hero
//  6  label-title-body         1250      310      1560     Haiku details
//  7  big-statement (Opus)     1560       60      1620     Opus hero
//  8  label-title-body         1620      340      1960     Opus capabilities
//  9  split-contrast           1960      960      2920     compute trade-off
// 10  label-title-body         2920      310      3230     how to switch
// 11  label-title-body         3230      415      3645     effort options
// 12  label-title-body         3645     1367      5012     availability + close
//                                               ─────
//                                         Total: 5012 frames (167.07s)

export const claudeModels: VideoData = {
  audioSrc: 'audio/claude-models.mp3',
  avatarSrc: 'avatar-claude-models.mp4',
  scenes: [
    // ── 00:00.00 → 00:02.04  title card (pre-VO silence) ──────────────
    {
      layout: 'title-card-green',
      title: 'Claude Models',
      label: 'SELECTING MODELS',
      durationInFrames: 60,
    },

    // ── 00:02.04 → 00:09.00  opening hook ─────────────────────────────
    // VO: "You're paying for a frontier model, most of the time you're not."
    {
      layout: 'big-statement',
      text: "You're paying for a frontier model.\nMost of the time, you're not using one.",
      highlight: 'not using one.',
      fontSize: 72,
      animation: 'kinetic',
      durationInFrames: 210,
    },

    // ── 00:09.00 → 00:18.40  three models overview ────────────────────
    // VO: "Claude gives you three models with genuinely different profiles,
    //      and knowing which one to reach for is the first decision that
    //      shapes how useful the tool actually is."
    {
      layout: 'label-title-body',
      label: 'THREE MODELS',
      title: 'Genuinely Different Profiles',
      body: [
        'Haiku 4.5: speed and high-volume throughput',
        'Sonnet 4.6: everyday knowledge work',
        'Opus 4.8: most demanding work',
      ],
      bodyTimings: [0, 0, 0],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 280,
    },

    // ── 00:18.40 → 00:20.40  Sonnet hero intro ─────────────────────────
    // VO: "The first one is Claude Sonnet 4.6…"
    {
      layout: 'big-statement',
      label: 'EVERYDAY WORK',
      text: 'Claude Sonnet 4.6',
      highlight: 'Sonnet',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 60,
    },

    // ── 00:20.40 → 00:39.67  Sonnet use cases ─────────────────────────
    // VO: "…which is tuned for everyday knowledge work, such as drafting,
    //      summarizing, planning, coding, and computer use tasks, like
    //      navigating tools, holding information from files, or completing
    //      actions in apps. It's also good at reading and reasoning from
    //      large work artifacts such as charts, PDFs, or tables."
    {
      layout: 'label-title-body',
      label: 'CLAUDE SONNET 4.6',
      title: 'Tuned for Everyday Knowledge Work',
      body: [
        'Drafting, summarizing, planning, fast and capable',
        'Coding and computer use: navigate tools, complete actions in apps',
        'Reads and reasons from charts, PDFs, and large documents',
      ],
      bodyTimings: [36, 93, 326],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'computer-desktop', 'document-text'],
      durationInFrames: 580,
    },

    // ── 00:39.67 → 00:41.67  Haiku hero intro ─────────────────────────
    // VO: "That's the contrast to Claude's lightweight Haiku 4.5 model…"
    {
      layout: 'big-statement',
      label: 'SPEED & VOLUME',
      text: 'Claude Haiku 4.5',
      highlight: 'Haiku',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 60,
    },

    // ── 00:41.67 → 00:52.00  Haiku use cases ─────────────────────────
    // VO: "…which is optimized for extreme speed and high volume
    //      throughput when you don't need too much depth."
    {
      layout: 'label-title-body',
      label: 'CLAUDE HAIKU 4.5',
      title: 'Extreme Speed, High Volume',
      body: [
        'Optimized for fast responses at scale',
        'Use when you need volume, not depth',
      ],
      bodyTimings: [57, 109],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'queue-list'],
      durationInFrames: 193,
    },

    // ── 00:52.00 → 00:54.00  Opus hero intro ──────────────────────────
    // VO: "Finally, Claude Opus 4.8…"
    {
      layout: 'big-statement',
      label: 'MOST DEMANDING WORK',
      text: 'Claude Opus 4.8',
      highlight: 'Opus',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 60,
    },

    // ── 00:54.00 → 01:05.33  Opus capabilities ────────────────────────
    // VO: "…is Anthropic's flagship model for your most demanding work.
    //      It leads the field on agentic coding, agentic computer use,
    //      knowledge work, financial analysis, and multidisciplinary
    //      reasoning."
    {
      layout: 'label-title-body',
      label: 'CLAUDE OPUS 4.8',
      title: "Anthropic's Flagship Model",
      body: [
        'Leads on agentic coding and agentic computer use',
        'Knowledge work, financial analysis, multidisciplinary reasoning',
      ],
      bodyTimings: [0, 66],
      image: 'images/claude-models/benchmark-4-8.webp',
      durationInFrames: 340,
    },

    // ── 01:05.33 → 01:37.33  compute trade-off ─────────────────────────
    // VO: "However, the trade-off is usage. As a frontier model, Opus 4.8
    //      requires significantly more compute per query than Sonnet,
    //      which means it costs more to run. Anthropic passes that reality
    //      into the plan structure. You get access to Opus on Pro, but
    //      with a limited credit allocation. Think of it like a premium
    //      resource on a shared budget. Use it for work that actually
    //      warrants it — complex analysis, high-stakes drafts, multi-step
    //      decisions — and use Sonnet for everything else."
    {
      layout: 'split-contrast',
      leftLabel: 'SONNET & HAIKU',
      leftTitle: 'Less Compute',
      leftBodies: [
        'Lower compute per query, broader usage limits',
        'Use Sonnet for everything that doesn\'t need Opus-level depth',
      ],
      leftBodyTimings: [0, 931],
      rightLabel: 'OPUS',
      rightTitle: 'More Compute',
      rightBodies: [
        'Significantly more compute per query',
        'Limited credit allocation on Pro — premium resource',
      ],
      rightBodyTimings: [107, 579],
      showDivider: true,
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: null },
        { from: 107, value: 'right' },
        { from: 931, value: 'left' },
      ],
      durationInFrames: 983,
    },

    // ── 01:34.21 → 01:44.88  how to switch models ─────────────────────
    // VO: "To switch models, start a new chat and click the model name
    //      in the right corner of the prompt box. That opens the model
    //      picker where you'll see your available options: Sonnet, Haiku,
    //      and Opus."
    {
      layout: 'label-title-body',
      label: 'HOW TO SWITCH',
      title: 'Start a New Chat',
      body: [
        'Click the model name in the prompt box (top right)',
        'Choose Sonnet, Haiku, or Opus from the picker',
      ],
      bodyTimings: [0, 104],
      image: 'images/claude-models/model-pickers.png',
      durationInFrames: 310,
    },

    // ── 01:47.67 → 02:01.50  effort options ───────────────────────────
    // VO: "You'll notice the effort options from the model selection
    //      drop-down. This lets you decide how much effort Claude should
    //      put into a response. Keep in mind that the higher the effort,
    //      the slower the response, and the faster the credits run out."
    {
      layout: 'label-title-body',
      label: 'EFFORT CONTROL',
      title: 'Set the Depth of Every Response',
      body: [
        'Effort options appear in the model selection drop-down',
        'Higher effort = more thorough, but slower and uses credits faster',
      ],
      bodyTimings: [0, 98],
      bodyTimings: [21, 257],
      image: 'images/claude-models/effort.png',
      durationInFrames: 415,
    },

    // ── 02:01.50 → 02:47.07  availability and plans ───────────────────
    // VO: "On availability, Claude Sonnet 4.6 is the default model for
    //      both the free and $20 Pro plans. Claude Opus 4.8 is available
    //      on Pro, Max, Team, and Enterprise plans. On Pro, Opus credits
    //      are intentionally capped — running a frontier model costs more
    //      compute than Sonnet, and the $20 price point reflects Sonnet-
    //      level usage. If you're regularly hitting that ceiling, that's
    //      the signal to move to Max, which starts at $100 per month for
    //      5× more usage, or $200 per month for 20×. The model you pick
    //      shapes the result before you write a single word. Most of your
    //      work belongs in Sonnet, your hardest problems belong in Opus.
    //      Start making that distinction today, and you'll get more out
    //      of both."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Who Gets What',
      body: [
        'Sonnet 4.6: Default on Free and Pro ($20/mo)',
        'Opus 4.8: Pro (limited credits), Max, Team, and Enterprise',
        'Pro Opus credits are capped — $20 reflects Sonnet-level usage',
        'Max: 5× more usage at $100/mo or 20× at $200/mo',
      ],
      bodyTimings: [0, 207, 382, 700],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'star', 'exclamation-circle', 'arrow-trending-up'],
      durationInFrames: 1140,
    },

    // ── 02:36.37 → 02:47.07  closing statement ─────────────────────────
    // VO: "The model you pick shapes the result before you write a single
    //      word. Most of your work belongs in Sonnet, your hardest problems
    //      belong in Opus. Start making that distinction today."
    {
      layout: 'big-statement',
      text: 'Most work belongs in Sonnet.\nSave Opus for what demands it.',
      highlight: 'Opus',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 321,
    },
  ],
};
