import { VideoData } from '../scenes/types';

// Claude Models v2: Haiku, Sonnet 5, Opus 5, Fable 5.1, updated line-up + effort options
// Audio: audio/claude-models-v2-daan-r4.mp3
//   r2 (2026-08-01): Opus section re-recorded — old "Opus 4.8" VO cut out and
//     replaced with a longer "Opus 5" take covering enterprise/agentic use,
//     self-correction, and effort guidance. Splice: original audio 0–62.3667s +
//     new Opus clip (47.26s) + original audio 88.8s–end.
//   r3 (2026-08-01): availability/pricing section re-recorded — old intro line
//     + "Opus 4.8 / Pro,Max,Team,Enterprise" pricing specifics replaced wholesale
//     with a shorter, plan-agnostic "Opus 5" pricing take. Splice (on r2 audio):
//     0–202.5333s + new pricing clip (29.28s) + 231.5333s–end.
//   r4 (2026-09-12): Fable section re-recorded — bumped to "Fable 5.1", drops
//     the old "recently released / paused for safety updates" line, adds new
//     "fewer safety refusals + cheaper long context" messaging, and changes
//     the usage-comparison line from "than Opus 4.8" to "than the other
//     models". New take has no standalone hero sentence — hero cut is now
//     just "Fable 5.1" itself, sliced out of the clip's own opening words.
//     Splice (on r3 audio): 0–109.6s + new Fable clip (44.33s) + 150.3333s–end.
//   KNOWN INCONSISTENCY: the untouched pricing section (scene 17, from r3)
//     still says "Claude Fable 5" (no ".1") — only this Fable deep-dive
//     section was updated to 5.1. Flag for a future pricing re-record.
// Total audio duration: 243.53s => 7306 frames @ 30fps
//
// Frame-accurate VO map (Whisper on the r4 Daan render, raw VO, no silence pad):
//   0.00 →   6.04  "You're paying for AI capability... which level of capability."
//   6.62 →  13.46  "Claude is not just one model... let's look at the line-up."
//  13.46 →  48.28  Sonnet section (hero + details)
//  48.28 →  62.37  Haiku section (hero + details)
//  62.37 → 109.60  Opus section (hero + details) — REVISED, Opus 5
// 109.60 → 153.98  Fable section (hero + details) — REVISED, Fable 5.1
// 153.98 → 180.06  how to switch + effort options
// 180.06 → 206.17  how to choose (recap)
// 206.17 → 235.50  availability + pricing — REVISED, Opus 5 (still says "Fable 5")
// 235.50 → 243.53  closing statement
//
// Scene layout:
//  #  Layout               Comp start  Duration  Comp end  VO coverage
//  1  title-card-green            0       90        90     [overlaps opening VO]
//  2  big-statement              90      109       199     hook
//  3  big-statement (fade)      199      205       404     not just one model
//  4  big-statement (Sonnet)    404       30       434     Sonnet hero
//  5  label-title-body          434      339       773     Sonnet: default & agentic
//  6  label-title-body          773      675      1448     Sonnet: best for everyday work
//  7  big-statement (Haiku)    1448       98      1546     Haiku hero
//  8  label-title-body         1546      325      1871     Haiku: speed over depth
//  9  big-statement (Opus)     1871       63      1934     Opus hero — Opus 5
// 10  label-title-body         1934      1354     3288     Opus: deeper reasoning — REVISED
// 11  big-statement (Fable)    3288       32      3320     Fable hero — Fable 5.1 — REVISED
// 12  label-title-body         3320      613      3933     Fable: most powerful model — REVISED
// 13  label-title-body         3933      686      4619     Fable: faster/cheaper/less restrictive — REVISED
// 14  label-title-body         4619      375      4994     how to switch
// 15  label-title-body         4994      407      5401     effort control
// 16  label-title-body         5401      784      6185     how to choose (recap)
// 17  label-title-body         6185      880      7065     availability + pricing — REVISED, Opus 5
// 18  big-statement            7065      243      7308     closing statement
//                                               ─────
//                                         Total: 7308 frames (~243.6s; audio is
//                                         243.53s, ~2 frames silent — negligible)
//
export const claudeModelsV2: VideoData = {
  audioSrc: 'audio/claude-models-v2-daan-r4.mp3',
  scenes: [
    // ── 00:00.00 → 00:03.00  title card (overlaps opening VO) ──────────
    {
      layout: 'title-card-green',
      title: 'Claude Models',
      label: 'CHOOSING THE RIGHT MODEL',
      durationInFrames: 90,
    },

    // ── 00:03.00 → 00:06.63  opening hook ───────────────────────────────
    // VO: "You're paying for AI capability. But the real skill is knowing
    //      when to use which level of capability."
    {
      layout: 'big-statement',
      text: "You're paying for AI capability.\nThe real skill is knowing which level to use.",
      highlight: 'which level to use.',
      fontSize: 72,
      animation: 'kinetic',
      durationInFrames: 109,
    },

    // ── 00:06.63 → 00:13.47  not just one model ─────────────────────────
    // VO: "Claude is not just one model. It gives you a set of models, and
    //      each one has a different job. Let's look at the model line-up."
    {
      layout: 'big-statement',
      text: 'Claude is not just one model.\nIt’s a set of models, each with a different job.',
      highlight: 'different job.',
      fontSize: 64,
      animation: 'fade',
      lineTimings: [0, 61],
      durationInFrames: 205,
    },

    // ── 00:13.47 → 00:14.47  Sonnet hero intro ──────────────────────────
    // VO: "Start with Sonnet."
    {
      layout: 'big-statement',
      label: 'EVERYDAY WORK',
      text: 'Claude Sonnet 5',
      highlight: 'Sonnet 5',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 30,
    },

    // ── 00:14.47 → 00:25.77  Sonnet: default & agentic ──────────────────
    // VO: "Claude Sonnet 5 is now the default model for Free and Pro users.
    //      It is also the model most people should use most of the time.
    //      Anthropic describes it as the most agentic Sonnet model yet."
    {
      layout: 'label-title-body',
      label: 'CLAUDE SONNET 5',
      title: 'The New Default Model',
      body: [
        'Default model for Free and Pro users',
        'The model most people should use most of the time',
        'Anthropic’s most agentic Sonnet model yet',
      ],
      bodyTimings: [0, 112, 217],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'user', 'sparkles'],
      durationInFrames: 339,
    },

    // ── 00:25.77 → 00:48.27  Sonnet: best for everyday work ─────────────
    // VO: "That means it is better at planning, using tools, following
    //      through on multi-step tasks, and handling everyday knowledge
    //      work. Think drafting, summarizing, research synthesis, artifact
    //      review, coding, and workflow automation. For most leadership
    //      tasks, Sonnet is the right starting point. It gives you a strong
    //      balance of speed, quality, and cost."
    {
      layout: 'label-title-body',
      label: 'CLAUDE SONNET 5',
      title: 'Tuned for Everyday Knowledge Work',
      body: [
        'Better at planning, using tools, and multi-step tasks',
        'Drafting, summarizing, research, coding, and workflow automation',
        'The right starting point for most leadership tasks',
        'Strong balance of speed, quality, and cost',
      ],
      bodyTimings: [0, 233, 441, 558],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'pencil', 'star', 'compare'],
      durationInFrames: 675,
    },

    // ── 00:48.27 → 00:49.87  Haiku hero intro ───────────────────────────
    // VO: "Then there is Haiku, the lightweight model."
    {
      layout: 'big-statement',
      label: 'SPEED & VOLUME',
      text: 'Claude Haiku 4.5',
      highlight: 'Haiku 4.5',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 98,
    },

    // ── 00:51.53 → 01:02.37  Haiku: speed over depth ────────────────────
    // VO: "Use Haiku when speed matters more than depth. It is useful for
    //      quick summaries, simple rewrites, classification, routing, or
    //      high-volume tasks where you do not need deep reasoning."
    {
      layout: 'label-title-body',
      label: 'CLAUDE HAIKU 4.5',
      title: 'Speed Over Depth',
      body: [
        'Use it when speed matters more than depth',
        'Quick summaries, rewrites, classification, routing, high-volume tasks',
      ],
      bodyTimings: [0, 83],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'clock'],
      durationInFrames: 325,
    },

    // ── 01:02.37 → 01:04.47  Opus hero intro ────────────────────────────
    // VO: "Then there is Opus."
    {
      layout: 'big-statement',
      label: 'DEEPER REASONING',
      text: 'Claude Opus 5',
      highlight: 'Opus 5',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 63,
    },

    // ── 01:04.47 → 01:49.61  Opus: deeper reasoning ─────────────────────
    // VO: "Opus 5 is the deeper reasoning model built for complex enterprise
    //      work and long-horizon agentic tasks. As Anthropic stated, it is
    //      particularly strong at checking and correcting its own work.
    //      Use it when the work is harder, messier, or higher-stakes. For
    //      example, a strategic decision, a complex financial analysis, a
    //      sensitive executive message, or a multi-step task where the
    //      first answer needs to be more complete and considered. Think of
    //      it as the specialist you bring in when Sonnet's first pass is
    //      not enough. Start with high effort and only move higher for
    //      genuinely demanding work. Lower effort can still produce strong
    //      results with less time and usage."
    {
      layout: 'label-title-body',
      label: 'CLAUDE OPUS 5',
      title: 'The Deeper Reasoning Model',
      body: [
        'Built for complex enterprise work and long-horizon agentic tasks',
        'Particularly strong at checking and correcting its own work',
        'Use it for harder, messier, higher-stakes work: strategic decisions, financial analysis, executive messages',
        'Start with high effort, only go higher for genuinely demanding work',
      ],
      bodyTimings: [68, 218, 375, 1046],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['rocket', 'check', 'star', 'sliders'],
      durationInFrames: 1354,
    },

    // ── 01:49.60 → 01:50.68  Fable hero intro ───────────────────────────
    // VO: "Fable 5.1 is..." (hero cuts right as "is" begins)
    {
      layout: 'big-statement',
      label: 'MOST POWERFUL MODEL',
      text: 'Claude Fable 5.1',
      highlight: 'Fable 5.1',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 32,
    },

    // ── 01:50.68 → 02:11.12  Fable: most powerful model ─────────────────
    // REVISED 2026: Fable 5.1 — VO: "...is Anthropic's most powerful publicly
    //      available model. It is built for hard-thinking tasks and for AI
    //      systems that can plan and carry out many steps over time. For
    //      example, it can research a topic, create a plan, write documents,
    //      improve them based on feedback, and manage tasks across tools
    //      with little human help."
    {
      layout: 'label-title-body',
      label: 'CLAUDE FABLE 5.1',
      title: 'Anthropic’s Most Powerful Model',
      body: [
        'Anthropic’s most powerful publicly available model',
        'Built for hard-thinking tasks and long, multi-step agentic work',
        'Research, plan, draft, and revise with little human help',
      ],
      bodyTimings: [10, 119, 332],
      image: 'images/claude-models-v2/fable-5.webp',
      imageHeight: 620,
      durationInFrames: 613,
    },

    // ── 02:11.12 → 02:33.98  Fable: faster, cheaper, less restrictive ───
    // REVISED 2026: Fable 5.1 — VO: "The latest version also cut down on
    //      unnecessary safety refusals on everyday technical questions and
    //      made long context work cheaper to run. However, as the most
    //      capable model, Fable 5.1 will draw down your usage much faster
    //      than the other models. So it is best suited for teams building
    //      serious AI systems, rather than most daily individual tasks."
    {
      layout: 'label-title-body',
      label: 'CLAUDE FABLE 5.1',
      title: 'Faster, Cheaper, Less Restrictive',
      body: [
        'Fewer unnecessary safety refusals on everyday technical questions',
        'Long context is now cheaper to run',
        'Draws down usage much faster than the other models',
        'Best suited for teams building serious AI systems',
      ],
      bodyTimings: [0, 187, 272, 487],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'trending', 'clock', 'user'],
      durationInFrames: 686,
    },

    // ── 02:09.53 → 02:22.03  how to switch ───────────────────────────────
    // VO: "Now, where do you find and switch these models? To switch
    //      models, start a new chat and click the model name in the right
    //      corner of the prompt box. That opens the model picker, where
    //      you'll see your available options."
    {
      layout: 'label-title-body',
      label: 'HOW TO SWITCH',
      title: 'Start a New Chat',
      body: [
        'Click the model name in the prompt box (top right)',
        'Opens the picker with your available options',
      ],
      bodyTimings: [109, 272],
      image: 'images/claude-models-v2/model-pickers-v2.png',
      durationInFrames: 375,
    },

    // ── 02:22.03 → 02:35.60  effort control ──────────────────────────────
    // VO: "You'll also notice the Effort options from the model selection
    //      dropdown. This lets you decide how much effort Claude should
    //      put into a response. Keep in mind: the higher the effort, the
    //      slower the response and the faster the credits run out."
    {
      layout: 'label-title-body',
      label: 'EFFORT CONTROL',
      title: 'Set the Depth of Every Response',
      body: [
        'Effort options live in the model selection dropdown',
        'Decide how much effort Claude puts into a response',
        'Higher effort = slower response, faster credit usage',
      ],
      bodyTimings: [0, 141, 272],
      image: 'images/claude-models-v2/effort-v2.png',
      durationInFrames: 407,
    },

    // ── 02:35.60 → 03:01.75  how to choose (recap) ───────────────────────
    // VO: "So how should you choose? Use Haiku when the task is simple and
    //      speed matters. Use Sonnet for most daily work: drafting,
    //      planning, summarizing, analysis, coding, and working with
    //      documents. Use Opus when the task needs deeper judgment or a
    //      stronger first pass. Use Fable when you are building with the
    //      API, working with very long context, or designing a
    //      long-running agentic workflow."
    {
      layout: 'label-title-body',
      label: 'HOW TO CHOOSE',
      title: 'Match the Model to the Task',
      body: [
        'Haiku: simple tasks where speed matters',
        'Sonnet: most daily work, drafting, planning, coding',
        'Opus: deeper judgment, a stronger first pass',
        'Fable: API building, long context, agentic workflows',
      ],
      bodyTimings: [50, 155, 386, 534],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'pencil', 'star', 'rocket'],
      durationInFrames: 784,
    },

    // ── 03:22.53 → 03:37.33  availability + pricing ─────────────────────
    // REVISED 2026-08-01: replaced wholesale, including the old intro line.
    // VO: "Sonnet 5 is available across all plans and is the default for
    //      Free and Pro. Opus 5 is available on paid plans with usage
    //      limits depending on the plan. Because it uses more compute than
    //      Sonnet, it will draw down your allowance faster, especially at
    //      higher effort settings. Claude Fable 5 is also not on the free
    //      tier and with capped usage at a maximum of 50% of a user's
    //      weekly subscription limit, depending on your specific account
    //      tier."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Who Gets What',
      body: [
        'Sonnet 5: Available across all plans, default for Free & Pro',
        'Opus 5: Available on paid plans, usage limits depend on the plan',
        'Uses more compute than Sonnet: draws down your allowance faster, especially at higher effort',
        'Fable 5: Not on the free tier, capped at up to 50% of your weekly subscription limit',
      ],
      bodyTimings: [15, 180, 342, 556],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'star', 'trending', 'rocket'],
      durationInFrames: 880,
    },

    // ── 03:30.75 → 03:38.83  closing statement ───────────────────────────
    // VO: "So keep in mind, the model you pick shapes the result before you
    //      write a single word. Start making that distinction today, and
    //      you'll get more out of Claude."
    {
      layout: 'big-statement',
      text: 'The model you pick shapes the result\nbefore you write a single word.',
      highlight: 'shapes the result',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 243,
    },
  ],
};
