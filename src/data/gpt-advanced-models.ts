import { VideoData } from '../scenes/types';

export const gptAdvancedModels: VideoData = {
  audioSrc: 'audio/gpt-advanced-models.wav',
  audioInserts: [
    // Pause main VO at the end of scene 14 (Terra & Luna, frame 4858) to play
    // the GPT-6 Astra news-update clip (30.51s = 916 frames, no silence pad),
    // then resume main VO with no drift (nothing skipped).
    { cutFrame: 4858, resumeFrame: 5774, src: 'audio/gpt6-astra-update.mp3' },
  ],
  avatarSrc: 'video/gpt-advanced-models-avatar.mp4',
  avatarStartFrame: 0,
  // Avatar pauses in lockstep with the main VO during the GPT-6 Astra insert
  // above, so it doesn't drift out of sync once the main VO resumes.
  avatarCutFrame: 4858,
  avatarResumeFrame: 5774,
  scenes: [
    // 00:00 - title card (pre-VO)
    {
      layout: 'title-card-green',
      title: 'ChatGPT Advanced Models',
      durationInFrames: 58,
    },

    // 00:01.93 → 00:13.90 - hook: most people just type into the default model
    {
      layout: 'centered-quote',
      text: 'Leaving a lot of performance on the table.',
      durationInFrames: 359,
    },

    // 00:13.90 → 00:22.63 - eligible users get access to more powerful models, called reasoning/thinking/advanced
    {
      layout: 'label-title-body',
      label: 'Beyond the Default',
      title: 'Reasoning. Thinking. Advanced.',
      body: ['Access for eligible users', 'Much more powerful models'],
      bodyTimings: [56, 101],
      durationInFrames: 262,
    },

    // 00:22.63 → 00:26.27 - significantly improves output quality
    {
      layout: 'centered-quote',
      text: 'Significantly improves the quality of the output.',
      durationInFrames: 109,
    },

    // 00:26.27 → 00:35.50 - section heading: the lineup, built around speed and reasoning
    {
      layout: 'centered-quote',
      text: 'The Model Lineup',
      durationInFrames: 277,
    },

    // 00:35.50 → 00:57.77 - GPT-5.5 Instant: fast everyday model, quick tasks
    {
      layout: 'label-title-body',
      label: 'Everyday Model',
      title: 'GPT-5.5 Instant',
      body: [
        'Quick questions, writing, brainstorming, translation',
        'Image analysis + explaining concepts',
      ],
      bodyTimings: [388, 508],
      image: 'images/gpt-5-5-instant.jpg',
      durationInFrames: 668,
    },

    // 00:57.77 → 01:04.26 - transition to advanced models for higher stakes work
    {
      layout: 'centered-quote',
      text: 'Higher stakes work? Get into the advanced models.',
      durationInFrames: 195,
    },

    // 01:04.26 → 01:12.13 - GPT-5.6 Sol, access via Thinking and Pro
    {
      layout: 'label-title-body',
      label: 'GPT-5.6 Family',
      title: 'GPT-5.6 Sol',
      body: ['Access via Thinking or Pro'],
      bodyTimings: [119],
      image: 'images/gpt-5-6-sol-card.jpg',
      durationInFrames: 236,
    },

    // 01:12.13 → 01:23.17 - released last week, flagship reasoning model, handles work start to finish
    {
      layout: 'label-title-body',
      label: 'Flagship Reasoning Model',
      title: 'Released Last Week',
      body: [
        "OpenAI's flagship reasoning model",
        'Handles complex work start to finish',
      ],
      bodyTimings: [101, 199],
      durationInFrames: 331,
    },

    // 01:23.17 → 01:41.63 - not smarter answers, but longer focus, tool use, self-checking, finished outputs
    {
      layout: 'label-title-body',
      label: 'What Changed',
      title: 'Not Smarter. More Focused.',
      body: [
        'Staying focused across longer workflows',
        'Tool use + mid-task self-checking',
        'Rough inputs turned into finished outputs',
      ],
      bodyTimings: [219, 299, 423],
      durationInFrames: 554,
    },

    // 01:41.63 → 02:06.37 - benchmark strength across categories, plus visual judgment + computer use
    {
      layout: 'label-title-body',
      label: 'Benchmarks',
      title: 'Strong Across the Board',
      body: [
        'Coding, research, presentations, documents',
        'Spreadsheets, design, science, cybersecurity',
        'Plus: stronger visual judgment + computer use',
      ],
      bodyTimings: [118, 235, 521],
      image: 'images/artificial-analysis-intelligence-index.svg',
      durationInFrames: 742,
    },

    // 02:06.37 → 02:17.40 - inspects its own output, identifies problems, refines rather than first draft
    {
      layout: 'label-title-body',
      label: 'Self-Correcting',
      title: 'Inspect. Identify. Refine.',
      body: [
        'Reviews its own output for problems',
        'Refines instead of a first-draft dump',
      ],
      bodyTimings: [51, 193],
      durationInFrames: 331,
    },

    // 02:17.40 → 02:31.16 - more efficient: fewer tokens, fewer steps, less guidance
    {
      layout: 'centered-quote',
      text: 'Fewer tokens, fewer steps, less guidance needed.',
      durationInFrames: 413,
    },

    // 02:31.16 → 02:41.94 - GPT-5.6 family also includes Terra and Luna
    {
      layout: 'label-title-body',
      label: 'GPT-5.6 Family',
      title: 'Terra & Luna',
      body: ['Not available in standard ChatGPT configuration'],
      bodyTimings: [200],
      image: 'images/gpt-5-6-terra-luna-cards.jpg',
      durationInFrames: 323,
    },

    // NEWS UPDATE INSERT (composition frame 4858 -> 5774) - separate clip
    // audio/gpt6-astra-update.mp3 (30.51s, no silence pad), main VO paused via
    // audioInserts/avatarCutFrame above and resumes exactly where it left off.
    // VO: "Also GPT-6 Astra, a new flagship model that launched in limited
    //      preview on September 3rd, 2026, with broader rollout the next day.
    //      OpenAI is positioning it as a major step up in computer use,
    //      coding, math and cybersecurity, and early benchmarks show it well
    //      ahead of GPT-5.6 Sol. However, like Terra and Luna, GPT-6 Astra is
    //      currently only available in ChatGPT Work and Codex."
    {
      layout: 'label-title-body',
      label: 'New Flagship',
      title: 'GPT-6 Astra',
      body: [
        'Limited preview launch - Sept 3, 2026',
        'Major step up: computer use, coding, math, cybersecurity',
        'Ahead of GPT-5.6 Sol on early benchmarks',
        'Only available in ChatGPT Work and Codex',
      ],
      bodyTimings: [0, 327, 512, 698],
      image: 'images/gpt6-astra-terminal-bench-chart.svg',
      durationInFrames: 916,
    },

    // 02:41.94 → 02:44.34 - section heading: accessing the models
    {
      layout: 'centered-quote',
      text: 'Accessing the Models',
      durationInFrames: 72,
    },

    // 02:44.34 → 02:57.28 - open a new chat, model picker lives on web vs mobile
    {
      layout: 'comparison',
      title: 'Model Picker',
      leftImage: 'images/model-picker-web-v2.png',
      leftLabel: 'Web',
      rightImage: 'images/model-picker-mobile.jpeg',
      rightLabel: 'Mobile',
      objectFit: 'contain',
      durationInFrames: 142,
    },

    // 02:49.08 → 02:53.06 - zoom into the web picker's effort slider popup (right side)
    {
      layout: 'centered-image-caption',
      image: 'images/model-picker-web-v2.png',
      objectFit: 'contain',
      imageZoom: { centerX: 0.73, centerY: 0.63, scale: 1.9, startFrame: 0 },
      durationInFrames: 120,
    },

    // 02:53.06 → 02:57.28 - zoom into the top of the mobile picker screenshot
    {
      layout: 'centered-image-caption',
      image: 'images/model-picker-mobile.jpeg',
      objectFit: 'contain',
      imageZoom: { centerX: 0.5, centerY: 0.08, scale: 2.2, startFrame: 0 },
      durationInFrames: 126,
    },

    // 02:57.28 → 03:24.86 - choose the option that fits the task: Instant, Thinking, Pro
    {
      layout: 'label-title-body',
      label: 'Choosing a Model',
      title: 'Match the Model to the Task',
      body: [
        'Instant - routine, conversational work',
        'Thinking - judgment, research, multi-step tasks',
        'Pro - hardest, highest-stakes work',
      ],
      bodyTimings: [171, 310, 588],
      image: 'images/model-picker-mobile.jpeg',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.16, scale: 2.0 },
        { startFrame: 171, centerX: 0.38, centerY: 0.10, scale: 4.5 },
        { startFrame: 310, centerX: 0.38, centerY: 0.16, scale: 4.5 },
        { startFrame: 588, centerX: 0.38, centerY: 0.22, scale: 4.5 },
      ],
      durationInFrames: 827,
    },

    // 03:24.86 → 03:46.26 - reasoning effort: medium, high, extra high, saves for tasks needing depth
    {
      layout: 'label-title-body',
      label: 'Reasoning Effort',
      title: 'Medium, High, Extra High',
      body: [
        'Takes longer, uses credits faster',
        'Save for tasks that need real depth',
      ],
      bodyTimings: [367, 505],
      image: 'images/model-picker-web.png',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 30, centerX: 0.78, centerY: 0.45, scale: 1.8 },
      ],
      durationInFrames: 642,
    },

    // 03:46.26 → 03:59.14 - add follow-up instructions while it's processing
    {
      layout: 'centered-quote',
      text: 'Add instructions while it’s still processing - they get included in the answer.',
      durationInFrames: 386,
    },

    // 03:59.14 → 04:14.28 - tip: answer immediately, or retry a finished response with another model
    {
      layout: 'label-title-body',
      label: 'Tip',
      title: 'Answer Immediately or Retry',
      body: [
        'Ask it to answer now if you only need speed',
        'Retry a finished response with another model',
      ],
      bodyTimings: [236, 342],
      durationInFrames: 418,
    },

    // 04:14.28 → 04:15.08 - section heading: plan availability
    {
      layout: 'centered-quote',
      text: 'Plan Availability',
      durationInFrames: 60,
    },

    // 04:15.08 → 04:38.36 - availability by plan
    {
      layout: 'label-title-body',
      label: 'Availability',
      title: 'Plan Requirements',
      body: [
        'Instant - default on every plan',
        '5.6 Reasoning - requires Plus',
        'Pro / Business / Enterprise - more capacity + Pro access',
        'GPT-5.6 not yet rolled out to Free, Go, or logged-out users',
      ],
      bodyTimings: [90, 272, 510, 736],
      durationInFrames: 955,
    },

    // 04:46.92 → 05:08.01 - closing statement (runs to end of audio)
    {
      layout: 'centered-quote',
      text: 'More reasoning power means higher quality work.',
      durationInFrames: 634,
    },
  ],
};
