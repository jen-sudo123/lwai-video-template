import { VideoData } from '../scenes/types';

// The AI Model Landscape — Lead with AI lesson.
// VO: audio/model-landscape.mp3 (Daan, eleven_v4, 247.5s). Script: model-landscape.v4.script.txt.
// Word timings: model-landscape.transcript.json (ElevenLabs Scribe). Audio starts at frame 0.
// Scene cuts sit on the [pause] gaps; local frame = round(word_t × 30) − scene start.
//
//  #  | comp frames   | dur | layout                 | VO
//  1  |    0 →  626   | 626 | checklist-slide        | "You already know..." LLM basics
//  2  |  626 →  835   | 209 | big-statement          | "If not, start with AI Fundamentals"
//  3  |  835 → 1224   | 389 | title-slide-transition | "Today is about the AI model landscape"
//  4  | 1224 → 1604   | 380 | big-statement          | "Zoom out ... engine behind an AI tool"
//  5  | 1604 → 1820   | 216 | split-contrast         | "GPT and Claude are different families"
//  6  | 1820 → 2529   | 709 | label-title-body cards | versions + speed/reasoning/info/multimodal
//  7  | 2529 → 2792   | 263 | big-statement          | "strong today, overtaken tomorrow"
//  8  | 2792 → 3124   | 332 | big-statement          | "fluency isn't mastering one model"
//  9  | 3124 → 3300   | 176 | title-slide-transition | "what these models share"
//  10 | 3300 → 3648   | 348 | big-statement          | "trained on massive data ... patterns"
//  11 | 3648 → 4409   | 761 | split-contrast         | shared strengths vs shared limitations
//  12 | 4409 → 4716   | 307 | big-statement          | "same task, different approach/results"
//  13 | 4716 → 4963   | 247 | big-statement          | "not the only voice in the room"
//  14 | 4963 → 5426   | 463 | checklist-slide        | second model: challenge/reframe/expose/test
//  15 | 5426 → 5890   | 464 | process-steps          | strategic-decision example, model A → model B
//  16 | 5890 → 6077   | 187 | big-statement          | "not faster, more critically"
//  17 | 6077 → 6346   | 269 | big-statement          | "agreement ≠ accuracy, verify"
//  18 | 6346 → 6584   | 238 | centered-quote         | "strong leaders seek dissenting views"
//  19 | 6584 → 7176   | 592 | takeaway-stack         | bottom line
//  20 | 7176 → 7458   | 282 | big-statement          | "not more AI, AI more thoughtfully" (+1s tail)

export const modelLandscape: VideoData = {
  audioSrc: 'audio/model-landscape.mp3',
  scenes: [
    // 1 — 0:00.00 → 0:20.88. Items on "how" 6.56, "what" 7.68, "where" 9.04,
    // "hallucinations" 11.76, "token" 15.04, "judgment" 16.88.
    {
      layout: 'checklist-slide',
      label: 'BEFORE WE START',
      title: 'You already know the basics',
      titleHighlight: 'the basics',
      items: [
        'How large language models work',
        "What they're good at",
        'Where they can fail',
        'Hallucinations',
        'Predicting language token by token',
        'Judgment and accountability stay human',
      ],
      itemTimings: [197, 230, 271, 353, 451, 506],
      durationInFrames: 626,
    },

    // 2 — 0:20.88 → 0:27.84. "If not, start with our AI Fundamentals Training."
    {
      layout: 'big-statement',
      label: 'NEW TO THIS?',
      text: 'Start with our\nAI Fundamentals Training.',
      highlight: 'AI Fundamentals Training.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 209,
    },

    // 3 — 0:27.84 → 0:40.80. "similar" 31.76, "differ" 33.28, "how AI-fluent leaders" 35.04.
    {
      layout: 'title-slide-transition',
      label: 'TODAY',
      text: 'The AI Model Landscape',
      body: [
        'Where models are similar',
        'Where they meaningfully differ',
        'How to choose intentionally',
      ],
      bodyTimings: [118, 163, 216],
      durationInFrames: 389,
    },

    // 4 — 0:40.80 → 0:53.45. "So first, let's zoom out. An AI model is ... the engine behind an AI tool."
    {
      layout: 'big-statement',
      label: 'THE LANDSCAPE',
      text: 'An AI model is the engine\nbehind an AI tool.',
      highlight: 'engine',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 380,
    },

    // 5 — 0:53.45 → 1:00.65. "GPT" 54.40, "Claude" 55.36.
    {
      layout: 'split-contrast',
      leftLabel: 'MODEL FAMILY',
      leftTitle: 'GPT',
      rightLabel: 'MODEL FAMILY',
      rightTitle: 'Claude',
      equal: true,
      rightLightUpFrame: 57,
      durationInFrames: 216,
    },

    // 6 — 1:00.65 → 1:24.29. "speed" 71.52, "complex" 75.32, "large amounts" 77.84, "images" 82.32.
    {
      layout: 'label-title-body',
      label: 'MANY VERSIONS',
      title: 'New models, different strengths',
      titleHighlight: 'different strengths',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        'Speed: Fast answers for everyday tasks',
        'Reasoning: Complex problems and coding',
        'Scale: Large amounts of information',
        'Multimodal: Images, audio, and video',
      ],
      bodyTimings: [326, 440, 515, 650],
      durationInFrames: 709,
    },

    // 7 — 1:24.29 → 1:33.08. "The landscape is constantly evolving ... overtaken by another tomorrow."
    {
      layout: 'big-statement',
      label: 'CONSTANTLY EVOLVING',
      text: 'Strongest today.\nOvertaken tomorrow.',
      highlight: 'Overtaken tomorrow.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 263,
    },

    // 8 — 1:33.08 → 1:44.13. "AI fluency isn't about mastering one specific model ..."
    {
      layout: 'big-statement',
      label: 'AI FLUENCY',
      text: "It's not mastering one model.\nIt's choosing the right one.",
      highlight: 'choosing the right one.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 332,
    },

    // 9 — 1:44.13 → 1:50.00. "Before we talk about differences, let's be clear about what these models share."
    {
      layout: 'title-slide-transition',
      label: 'COMMON GROUND',
      text: 'What They Have in Common',
      centered: true,
      durationInFrames: 176,
    },

    // 10 — 1:50.00 → 2:01.60. "trained on massive amounts of data ... recognizing patterns"
    {
      layout: 'big-statement',
      label: 'HOW THEY WORK',
      text: 'Trained on massive data.\nExperts at recognizing patterns.',
      highlight: 'recognizing patterns.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 348,
    },

    // 11 — 2:01.60 → 2:26.96. Left: "Conversational" 126.00, "files" 130.36 (sentence start), "Strong" 133.60.
    // Right: "Missing" 141.68, "Confident" 143.04, "over-generalization" 144.96.
    {
      layout: 'split-contrast',
      leftLabel: 'SHARED STRENGTHS',
      leftBodies: [
        'Thinking, drafting, and analysis',
        'Working with files and long documents',
        'Summarizing, synthesizing, and ideating',
      ],
      leftBodyTimings: [132, 263, 360],
      rightLabel: 'SHARED LIMITATIONS',
      rightBodies: ['Missing context', 'Confident-sounding errors', 'Over-generalization'],
      rightBodyTimings: [602, 643, 701],
      highlights: [
        { from: 0, value: 'left' },
        { from: 602, value: 'right' },
      ],
      durationInFrames: 761,
    },

    // 12 — 2:26.96 → 2:37.20. "Even when models can perform the same task ..."
    {
      layout: 'big-statement',
      label: 'THE DIFFERENCE',
      text: 'Same task.\nDifferent approach. Different results.',
      highlight: 'Different results.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 307,
    },

    // 13 — 2:37.20 → 2:45.44. "Here's an important insight ... the only voice in the room."
    {
      layout: 'big-statement',
      label: 'AN IMPORTANT INSIGHT',
      text: "One model shouldn't be\nthe only voice in the room.",
      highlight: 'the only voice in the room.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 247,
    },

    // 14 — 2:45.44 → 3:00.88. "challenge" 169.84, "reframe" 171.12, "expose" 172.60, "test" 174.32.
    // Label = the term, named at 178.08 ("This is cognitive diversification").
    {
      layout: 'checklist-slide',
      label: 'COGNITIVE DIVERSIFICATION',
      title: 'Bring in a second model',
      titleHighlight: 'second model',
      items: [
        'Challenge assumptions',
        'Reframe the problem',
        'Expose blind spots',
        'Test whether the answer holds up',
      ],
      itemTimings: [132, 171, 215, 267],
      durationInFrames: 463,
    },

    // 15 — 3:00.88 → 3:16.32. "one model" 184.40, "another model" 189.08.
    {
      layout: 'process-steps',
      label: 'EXAMPLE',
      title: 'A strategic decision',
      steps: [
        { title: 'Model one', body: 'Develops the recommendation.' },
        { title: 'Model two', body: 'Finds weaknesses, challenges assumptions, offers another view.' },
      ],
      stepTimings: [106, 246],
      activeTimings: [106, 246],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 464,
    },

    // 16 — 3:16.32 → 3:22.56. "not ... to go faster. ... to think more critically."
    {
      layout: 'big-statement',
      text: 'Not to go faster.\nTo think more critically.',
      highlight: 'To think more critically.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 187,
    },

    // 17 — 3:22.56 → 3:31.52. "agreement between models doesn't guarantee accuracy ... verified"
    {
      layout: 'big-statement',
      label: 'REMEMBER',
      text: "Agreement isn't accuracy.\nVerify important claims.",
      highlight: 'Verify important claims.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 269,
    },

    // 18 — 3:31.52 → 3:39.46. "Just like strong leaders seek out dissenting views ..."
    {
      layout: 'centered-quote',
      text: 'Strong leaders seek out dissenting views. Strong AI users build that challenge into their workflow.',
      highlight: 'build that challenge into their workflow.',
      animation: 'fade',
      durationInFrames: 238,
    },

    // 19 — 3:39.46 → 3:59.18. "multiple" 221.92, "intentional" 227.60, "one model" 232.12.
    {
      layout: 'takeaway-stack',
      label: 'BOTTOM LINE',
      title: 'Become fluent in the landscape',
      takeaways: [
        { kicker: 'Not', text: 'Multiple models for every task.' },
        { kicker: 'Instead', text: 'Intentional choices: which model, and when.' },
        { kicker: 'In practice', text: 'One everyday model, others for a new perspective or capability.' },
      ],
      timings: [74, 244, 380],
      durationInFrames: 592,
    },

    // 20 — 3:59.18 → end (247.6s) + 1s tail.
    {
      layout: 'big-statement',
      text: 'Not more AI.\nAI used more thoughtfully.',
      highlight: 'more thoughtfully.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 282,
    },
  ],
};
