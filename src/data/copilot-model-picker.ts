import { VideoData } from '../scenes/types';

// Copilot Model Picker: auto mode, choosing a specific model, quick response vs
// think deeper, when to switch, comparing fairly, access + pricing.
// Audio: audio/copilot-model-picker.mp3 (ElevenLabs, 153.89s, no silence pad;
//   audio starts at frame 0 and the title card overlaps the first line).
// Transcript: src/data/copilot-model-picker.transcript.json (ElevenLabs Scribe,
//   word timestamps, t = seconds into the mp3). Script: copilot-model-picker.script.txt.
// Model-picker screenshot (images/copilot-model-picker/model-picker.png) on scenes 2, 6, 9a, 9b.
//
// Scene boundaries (s): 0 · 3.0 · 13.0 · 16.3 · 38.9 · 42.0 · 56.1 · 67.3 · 79.1
//   · 94.0 · 96.7 · 115.8 · 129.7 · 145.7 → 155.0 (4650 frames)
// Local cue = round((word_t − scene_start) × 30), anchored to the word each card names.
export const copilotModelPicker: VideoData = {
  audioSrc: 'audio/copilot-model-picker.mp3',
  scenes: [
    // 0.0 → 3.0  VO: "Microsoft Copilot starts in auto mode."
    {
      layout: 'title-card-green',
      title: 'Copilot Models',
      label: 'CHOOSING THE RIGHT MODEL',
      durationInFrames: 90,
    },

    // 3.0 → 13.0  VO: "For many tasks, that works perfectly well. Depending on your access,
    //   Copilot may offer additional models in the model picker in the Copilot chat window."
    {
      layout: 'label-title-body',
      label: 'THE MODEL PICKER',
      title: 'Auto Mode',
      body: [
        'Works perfectly well for many tasks',
        'Depending on your access, more models in the model picker',
      ],
      bodyTimings: [13, 181], // "many" 3.42 · "additional" 9.04
      image: 'images/copilot-model-picker/model-picker.png',
      durationInFrames: 300,
    },

    // 13.0 → 16.3  VO: "So let's start with how the model picker works."
    {
      layout: 'big-statement',
      label: 'THE MODEL PICKER',
      text: 'How the Model Picker Works',
      highlight: 'Model Picker',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 99,
    },

    // 16.3 → 38.9  VO: "In auto, Copilot automatically chooses the model it thinks best suits
    //   your prompt. For most inconsequential routine work like drafting, summarizing, rewriting,
    //   translation, and quick questions, this is usually enough. However, for higher stakes,
    //   external-facing, or complex work, advanced models can be very useful."
    {
      layout: 'label-title-body',
      label: 'THE MODEL PICKER',
      title: 'Auto',
      body: [
        'Chooses the model it thinks best suits your prompt',
        'Usually enough for routine work: drafting, summarizing, rewriting, translation, quick questions',
        'Advanced models help with higher-stakes, external-facing, or complex work',
      ],
      bodyTimings: [53, 220, 490], // "automatically" 18.06 · "routine" 23.64 · "higher" 32.64
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sparkles', 'pencil', 'star'],
      durationInFrames: 678,
    },

    // 38.9 → 42.0  VO: "Now, let's look at choosing a specific model."
    {
      layout: 'big-statement',
      label: 'CHOOSING A MODEL',
      text: 'Choosing a Specific Model',
      highlight: 'Specific Model',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 93,
    },

    // 42.0 → 56.1  VO: "Open the model picker in your Copilot chat window. Depending on your
    //   interface, you may need to expand the menu to see additional choices. You may see
    //   options from OpenAI's GPT family and Anthropic's Claude family."
    {
      layout: 'label-title-body',
      label: 'CHOOSING A MODEL',
      title: 'Open the Model Picker',
      body: [
        'Open the model picker in your Copilot chat window',
        'You may need to expand the menu to see more choices',
        'Options from OpenAI’s GPT family and Anthropic’s Claude family',
      ],
      bodyTimings: [4, 168, 297], // "Open" 42.14 · "expand" 47.60 · "OpenAI's" 51.90
      image: 'images/copilot-model-picker/model-picker.png',
      // Zoom into the Claude / GPT rows as the VO names the families.
      imageZoomKeyframes: [
        { startFrame: 0, scale: 1, centerX: 0.5, centerY: 0.5 },
        { startFrame: 289, scale: 2, centerX: 0.18, centerY: 0.68 },
      ],
      durationInFrames: 423,
    },

    // 56.1 → 67.3  VO: "The exact models available can change, so do not focus too much on
    //   memorizing every model name. What matters more is that different models handle the
    //   same task differently."
    {
      layout: 'big-statement',
      text: 'Don’t memorize every model name.\nDifferent models handle the same task differently.',
      highlight: 'differently.',
      fontSize: 64,
      animation: 'fade',
      lineTimings: [0, 190], // "What matters" 62.70
      durationInFrames: 336,
    },

    // 67.3 → 79.1  VO: "For example, one may follow your instructions more closely. Another may
    //   structure the answer differently, handle a long document better, or produce writing
    //   that better matches the tone you want."
    {
      layout: 'label-title-body',
      label: 'WHY IT MATTERS',
      title: 'Same Task, Different Results',
      body: [
        'One may follow your instructions more closely',
        'Another may structure the answer differently',
        'One may handle a long document better',
        'Or produce writing that better matches your tone',
      ],
      bodyTimings: [49, 142, 195, 262], // "follow" 68.92 · "structure" 72.04 · "handle" 73.80 · "produce" 76.02
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'sliders', 'eye', 'pencil'],
      durationInFrames: 354,
    },

    // 79.1 → 85.8  VO: "Where your interface offers quick response and think deeper, use quick
    //   response for straightforward tasks"
    {
      layout: 'label-title-body',
      label: 'RESPONSE MODES',
      title: 'Quick Response',
      body: [
        'Answers right away',
        'Use it for straightforward tasks',
      ],
      bodyTimings: [48, 116], // "quick response" 80.70 · "use quick" 82.98
      image: 'images/copilot-model-picker/model-picker.png',
      imageZoomKeyframes: [
        { startFrame: 0, scale: 1, centerX: 0.5, centerY: 0.5 },
        { startFrame: 40, scale: 2.2, centerX: 0.18, centerY: 0.25 },
      ],
      durationInFrames: 201,
    },

    // 85.8 → 94.0  VO: "and try think deeper when the task needs more analysis. More reasoning
    //   may take longer and does not guarantee a correct answer."
    {
      layout: 'label-title-body',
      label: 'RESPONSE MODES',
      title: 'Think Deeper',
      body: [
        'Try it when the task needs more analysis',
        'Takes longer and doesn’t guarantee a correct answer',
      ],
      bodyTimings: [17, 116], // "think" 86.36 · "More" 89.66
      image: 'images/copilot-model-picker/model-picker.png',
      imageZoomKeyframes: [
        { startFrame: -30, scale: 2.2, centerX: 0.18, centerY: 0.25 },
        { startFrame: 10, scale: 2.2, centerX: 0.18, centerY: 0.39 },
      ],
      imageZoomNoEntry: true,
      durationInFrames: 246,
    },

    // 94.0 → 96.7  VO: "So when might you try another model?"
    {
      layout: 'big-statement',
      label: 'SWITCHING MODELS',
      text: 'When to Try Another Model',
      highlight: 'Another Model',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 81,
    },

    // 96.7 → 115.8  VO: "You may want to manually choose another available model when the first
    //   result is not quite what you need, when you want a second approach, or when you want to
    //   compare how different models handle the same instructions. You may also have learned
    //   through experience that one model works particularly well for a certain type of task."
    {
      layout: 'label-title-body',
      label: 'SWITCHING MODELS',
      title: 'Reasons to Switch',
      body: [
        'The first result isn’t quite what you need',
        'You want a second approach',
        'You want to compare how models handle the same instructions',
        'Experience shows one model suits a certain type of task',
      ],
      bodyTimings: [112, 209, 272, 425], // "first" 100.44 · "second" 103.68 · "compare" 105.78 · "experience" 110.86
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['x', 'compare', 'eye', 'star'],
      durationInFrames: 573,
    },

    // 115.8 → 129.7  VO: "The important thing is to keep the task the same when you compare. Use
    //   the same prompt, context, and source material. Then look at which model follows your
    //   instructions best and produces the most useful result."
    {
      layout: 'label-title-body',
      label: 'COMPARING MODELS',
      title: 'Keep the Task the Same',
      body: [
        'Same prompt, context, and source material',
        'Which model follows your instructions best?',
        'Which produces the most useful result?',
      ],
      bodyTimings: [137, 269, 346], // "same" 120.36 · "which" 124.76 · "produces" 127.32
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'check', 'star'],
      durationInFrames: 417,
    },

    // 129.7 → 145.7  VO: "Finally, a note on access and pricing. The models you see depend on your
    //   Microsoft license, your organization's admin settings, and when Microsoft rolls out each
    //   model. Plans, model availability, and usage limits are subject to change."
    {
      layout: 'label-title-body',
      label: 'ACCESS & PRICING',
      title: 'What You See Depends On',
      body: [
        'Your Microsoft license',
        'Your organization’s admin settings',
        'When Microsoft rolls out each model',
        'Plans, availability, and usage limits can change',
      ],
      bodyTimings: [151, 198, 268, 342], // "Microsoft" 134.74 · "organization's" 136.30 · "when" 138.62 · "Plans" 141.10
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'sliders', 'clock', 'trending'],
      durationInFrames: 480,
    },

    // 145.7 → 155.0  VO: "For the latest details, see Microsoft's official Copilot licensing
    //   guidance and subscription and usage-based billing guidance."
    {
      layout: 'big-statement',
      label: 'LATEST DETAILS',
      text: 'See Microsoft’s official guidance:\nCopilot licensing and usage-based billing.',
      highlight: 'official guidance:',
      fontSize: 64,
      animation: 'fade',
      lineTimings: [0, 94], // "Copilot" 148.84
      durationInFrames: 279,
    },
  ],
};
