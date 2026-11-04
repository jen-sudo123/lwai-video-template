import { VideoData } from '../scenes/types';

// Claude Models v3: Sonnet 5.5, Haiku 5.5, Opus 5.5, Fable 5.1, model picker,
// effort levels, how to choose, availability + pricing by seat type.
// Audio: audio/claude-models-v3.mp3 — Daan voice, ElevenLabs eleven_v4, take 1.
//   254.12s => 7624 frames @ 30fps. No silence pad (audio starts at frame 0).
//   Script: src/data/claude-models-v3.script.txt
//   Word timings: src/data/claude-models-v3.transcript.json (ElevenLabs Scribe)
//   Section headings were voiced as [long pause] (~1.5–2s); each pause holds a
//   white section heading (green title card is used only for the opening).
//
// Scene layout (comp frames):
//  #  Layout                      Start   Dur   End   VO
//  1  title-card-green                0    90    90   intro (overlaps)
//  2  big-statement (hook)           90   118   208   "The real skill..."
//  3  big-statement (overlap)       208   206   414   "The models overlap..."
//  4  big-statement (section)    414    56   470   [pause] The Model Line-Up
//  5  big-statement hero Sonnet     470    48   518   "Start with Sonnet."
//  6  label-title-body Sonnet       518   639  1157
//  7  big-statement hero Haiku     1157    72  1229
//  8  label-title-body Haiku       1229   497  1726
//  9  big-statement hero Opus      1726    55  1781
// 10  label-title-body Opus 1      1781   557  2338
// 11  label-title-body Opus 2      2338   336  2674
// 12  big-statement hero Fable     2674    84  2758
// 13  label-title-body Fable 1     2758   645  3403   (image)
// 14  label-title-body Fable 2     3403   643  4046
// 15  big-statement (section)   4046    45  4091   [pause] Where To Find...
// 16  label-title-body switch      4091   321  4412   (model-picker screenshot)
// 17  label-title-body effort      4412   742  5154   (effort screenshot)
// 18  big-statement (section)   5154    59  5213   [pause] How To Choose
// 19  label-title-body choose      5213   758  5971
// 20  big-statement try them       5971   248  6219
// 21  big-statement (section)   6219    59  6278   [pause] Availability...
// 22  label-title-body plans       6278   495  6773
// 23  label-title-body Fable seats 6773   715  7488
// 24  big-statement closing        7488   142  7630
//                                       Total 7630 (~254.3s)
export const claudeModelsV3: VideoData = {
  audioSrc: 'audio/claude-models-v3.mp3',
  scenes: [
    // 0.00 "Claude gives you several levels of AI capability."
    {
      layout: 'title-card-green',
      title: 'Claude Models',
      label: 'CHOOSING THE RIGHT MODEL',
      durationInFrames: 90,
    },
    // 3.48 "The real skill is knowing when to use each one."
    {
      layout: 'big-statement',
      text: 'Several levels of AI capability.\nThe real skill is knowing when to use each one.',
      highlight: 'when to use each one.',
      fontSize: 64,
      animation: 'kinetic',
      durationInFrames: 118,
    },
    // 6.92 "The models overlap in what they can do, but differ in speed,
    //       capability, and how quickly they use your allowance."
    {
      layout: 'big-statement',
      text: 'The models overlap in what they can do.\nThey differ in speed, capability, and allowance use.',
      highlight: 'speed, capability, and allowance use.',
      fontSize: 60,
      animation: 'fade',
      lineTimings: [0, 74],
      durationInFrames: 206,
    },
    // 13.81 [long pause]
    {
      layout: 'big-statement',
      text: 'The Model Line-Up',
      highlight: 'Line-Up',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 56,
    },

    // 15.68 "Start with Sonnet."
    {
      layout: 'big-statement',
      label: 'EVERYDAY WORK',
      text: 'Claude Sonnet 5.5',
      highlight: 'Sonnet 5.5',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 48,
    },
    // 17.28 "Claude Sonnet 5.5 is a practical starting point ... cost."
    {
      layout: 'label-title-body',
      label: 'CLAUDE SONNET 5.5',
      title: 'A Practical Starting Point',
      body: [
        'Built for everyday professional work',
        'Drafting, summarizing, research, document review, coding, multi-step tasks',
        'Where I would start for most leadership tasks',
        'Strong balance of speed, quality, and cost',
      ],
      // practical 19.36 / drafting 22.92 / most 31.28 / balance 35.04
      bodyTimings: [63, 170, 420, 533],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['star', 'pencil', 'user', 'compare'],
      durationInFrames: 639,
    },

    // 38.56 "Then there is Haiku 5.5,"
    {
      layout: 'big-statement',
      label: 'FAST & EFFICIENT',
      text: 'Claude Haiku 5.5',
      highlight: 'Haiku 5.5',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 72,
    },
    // 40.96 "designed for fast, efficient work. Use it for ... needs."
    {
      layout: 'label-title-body',
      label: 'CLAUDE HAIKU 5.5',
      title: 'Fast, Efficient Work',
      body: [
        'Designed for speed and efficiency',
        'Quick summaries, simple rewrites, sorting, many similar requests',
        'Best when instructions are clear and output is easy to check',
      ],
      // fast 41.68 / quick 44.08 / useful 51.52
      bodyTimings: [21, 93, 317],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'clock', 'check'],
      durationInFrames: 497,
    },

    // 57.52 "Then there is Opus."
    {
      layout: 'big-statement',
      label: 'DEMANDING WORK',
      text: 'Claude Opus 5.5',
      highlight: 'Opus 5.5',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 55,
    },
    // 59.36 "Opus 5.5 is built for ... technical problem."
    {
      layout: 'label-title-body',
      label: 'CLAUDE OPUS 5.5',
      title: 'For Harder, Messier Work',
      body: [
        'Demanding analysis, coding, and extended work across tools and documents',
        'Try it when the work is harder or messier',
        'Strategic options, financial analysis, conflicting documents, technical problems',
      ],
      // demanding 61.52 / harder 68.12 / comparing 69.68
      bodyTimings: [65, 263, 309],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['rocket', 'sliders', 'compare'],
      durationInFrames: 557,
    },
    // 77.92 "Think of it as an option ... same prompt."
    {
      layout: 'label-title-body',
      label: 'CLAUDE OPUS 5.5',
      title: 'When Sonnet’s First Pass Isn’t Enough',
      body: [
        'Try Opus when Sonnet’s first pass falls short',
        'Give it the missing context',
        'Explain what needs to improve, don’t just repeat the prompt',
      ],
      // option 78.72 / missing 82.72 / explain 83.84
      bodyTimings: [24, 144, 177],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['star', 'lightbulb', 'pencil'],
      durationInFrames: 336,
    },

    // 89.12 "Finally, there is Fable. Fable 5.1"
    {
      layout: 'big-statement',
      label: 'MOST POWERFUL MODEL',
      text: 'Claude Fable 5.1',
      highlight: 'Fable 5.1',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 84,
    },
    // 91.92 "is Anthropic's most powerful ... little human help."
    {
      layout: 'label-title-body',
      label: 'CLAUDE FABLE 5.1',
      title: 'Anthropic’s Most Powerful Model',
      body: [
        'Anthropic’s most powerful publicly available model',
        'Built for hard thinking tasks and multi-step AI systems',
        'Research, plan, write, and improve with little human help',
      ],
      // Anthropic's 92.64 / built 96.56 / research 104.16
      bodyTimings: [21, 139, 367],
      image: 'images/claude-models-v2/fable-5.webp',
      imageHeight: 620,
      durationInFrames: 645,
    },
    // 113.44 "The latest version also cut down ... daily individual tasks."
    {
      layout: 'label-title-body',
      label: 'CLAUDE FABLE 5.1',
      title: 'Powerful, but Usage-Hungry',
      body: [
        'Fewer unnecessary safety refusals on technical questions',
        'Long-context work is cheaper to run',
        'Draws down your usage much faster than other models',
        'Best suited for teams building serious AI systems',
      ],
      // cut down 114.72 / long-context 119.84 / draw 125.44 / best 129.32
      bodyTimings: [39, 192, 360, 477],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'trending', 'clock', 'user'],
      durationInFrames: 643,
    },
    // 134.85 [long pause]
    {
      layout: 'big-statement',
      text: 'Where to Find and Switch Models',
      highlight: 'Switch Models',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 45,
    },

    // 136.36 "To switch models, open a new or existing chat ... options."
    {
      layout: 'label-title-body',
      label: 'HOW TO SWITCH',
      title: 'Open the Model Picker',
      body: [
        'Open a new or existing chat',
        'Click the model name in the right corner of the prompt box',
        'The picker shows your available models',
      ],
      // open 137.52 / click 139.68 / model picker 143.92
      bodyTimings: [35, 99, 227],
      image: 'images/claude-models-v3/model-picker.png',
      durationInFrames: 321,
    },
    // 147.08 "You'll also notice the Effort options ... in your prompt."
    {
      layout: 'label-title-body',
      label: 'EFFORT',
      title: 'How Much Work Claude Puts In',
      body: [
        'Effort options sit in the same dropdown',
        'Lower effort saves time and usage, still strong',
        'Save the highest settings for genuinely difficult tasks',
        'Effort doesn’t set answer length: ask for length and format in your prompt',
      ],
      // Effort 148.16 / Lower 154.88 / highest 160.36 / Effort 164.72
      bodyTimings: [33, 234, 399, 530],
      image: 'images/claude-models-v3/effort.png',
      durationInFrames: 742,
    },
    // 171.79 [long pause]
    {
      layout: 'big-statement',
      text: 'How to Choose',
      highlight: 'Choose',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 59,
    },

    // 173.76 "Use Haiku ... usage or cost."
    {
      layout: 'label-title-body',
      label: 'HOW TO CHOOSE',
      title: 'Match the Model to the Task',
      body: [
        'Haiku: straightforward tasks where speed matters',
        'Sonnet: your starting point for daily work',
        'Opus: demanding analysis, or a stronger follow-up',
        'Fable: very difficult or long-running work worth the cost',
      ],
      // Haiku 173.76 / Sonnet 178.24 / Opus 185.04 / Fable 191.12
      bodyTimings: [0, 134, 338, 521],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'pencil', 'star', 'rocket'],
      durationInFrames: 758,
    },
    // 199.04 "Try the models on a task you know well. Compare ..."
    {
      layout: 'big-statement',
      text: 'Try the models on a task you know well.\nCompare how they follow instructions, handle evidence, and deliver.',
      highlight: 'a task you know well.',
      fontSize: 56,
      animation: 'fade',
      lineTimings: [0, 79],
      durationInFrames: 248,
    },
    // 207.31 [long pause]
    {
      layout: 'big-statement',
      text: 'Availability and Pricing',
      highlight: 'Pricing',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 59,
    },

    // 209.28 "Sonnet and Haiku are available ... subscription."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Who Gets What',
      body: [
        'Sonnet & Haiku: Free and paid plans, different usage limits',
        'Opus: paid plans',
        'Fable 5.1: paid plans, but usage isn’t always included',
      ],
      // Sonnet 209.28 / Opus 214.96 / Fable 217.92
      bodyTimings: [0, 171, 260],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'star', 'rocket'],
      durationInFrames: 495,
    },
    // 225.76 "On Pro and Team Standard seats ... seat type."
    {
      layout: 'label-title-body',
      label: 'CLAUDE FABLE 5.1',
      title: 'Fable Usage by Seat Type',
      body: [
        'Pro & Team Standard: uses additional paid usage credits',
        'Max, Ultra & Team Premium: included up to 50% of weekly allowance',
        'Beyond that: continue with usage credits, or switch models',
        'Enterprise: depends on your agreement and seat type',
      ],
      // Pro 225.76 / Max 231.36 / Beyond 238.96 / Enterprise 243.52
      bodyTimings: [0, 168, 396, 533],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'star', 'trending', 'compare'],
      durationInFrames: 715,
    },
    // 249.60 "The models and effort settings you see may also depend on your
    //         workspace permissions."
    {
      layout: 'big-statement',
      text: 'The models and effort settings you see\nmay depend on your workspace permissions.',
      highlight: 'workspace permissions.',
      fontSize: 60,
      animation: 'fade',
      durationInFrames: 142,
    },
  ],
};
