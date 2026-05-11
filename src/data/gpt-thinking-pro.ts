import { VideoData } from '../scenes/types';

// ChatGPT Thinking + Pro
// Audio: audio/gpt-thinking-pro.mp3
// Source script: videos/GPT Thinking & Pro/GPT Thinking Thinking& Pro.md
// Total audio duration: ~252.28s => 7568 frames @ 30fps

export const gptThinkingPro: VideoData = {
  audioSrc: 'audio/gpt-thinking-pro.mp3',
  avatarSrc: 'video/gpt-thinking-pro-avatar.mp4',
  scenes: [
    {
      layout: 'title-card-green',
      title: 'ChatGPT\nThinking and Pro',
      label: 'SELECTING MODELS',
      durationInFrames: 140,
    },
    {
      layout: 'label-title-body',
      label: 'UNDERUSED MODEL',
      title: 'The model most people are underusing',
      body: [
        'For everyday work, many people just start typing and leave performance on the table.',
      ],
      bodyTimings: [80],
      durationInFrames: 447,
    },
    {
      layout: 'large-label-body-split',
      bigLabel: 'GPT-5.5',
      subtitle: 'Pick the mode that matches the task',
      body: [
        `OpenAI's most capable model for research, documents, data, and coding.`,
        'The key idea: pick the mode that matches the difficulty and risk of the task.',
      ],
      bodyTimings: [80, 290],
      durationInFrames: 415,
    },
    {
      layout: 'centered-image-caption',
      image: 'images/gpt-thinking-pro/gdpval.png',
      caption: 'GDPval benchmark result from the GPT-5.5 release page',
      animation: 'fade',
      objectFit: 'contain',
      durationInFrames: 420,
    },
    {
      layout: 'three-mode-columns',
      label: 'THREE MODES',
      title: 'Instant, Thinking, and Pro',
      columns: [
        {
          label: 'MODE 1',
          title: 'Instant',
          body: [
            'Quick answers and conversational day-to-day work',
            'Translation, explanation, and other lightweight tasks',
            'Best when speed matters more than depth',
          ],
        },
        {
          label: 'MODE 2',
          title: 'Thinking',
          body: [
            'The default for senior knowledge work',
            'Analysis, synthesis, spreadsheets, slides, and research',
            'Follows more complex multi-step instructions',
          ],
        },
        {
          label: 'MODE 3',
          title: 'Pro',
          body: [
            'Maximum depth for hard, high-stakes work',
            'Use when weak reasoning becomes costly',
            'Accuracy matters more than speed',
          ],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 282, value: 0 },
        { from: 503, value: 1 },
        { from: 1065, value: 2 },
      ],
      durationInFrames: 1773,
    },
    {
      layout: 'model-picker-locations',
      title: 'Where to find the model picker',
      leftImage: 'images/gpt-thinking-pro/model-picker.png',
      leftLabel: 'DESKTOP / BROWSER',
      rightImage: 'images/gpt-thinking-pro/mobile.jpg',
      rightLabel: 'MOBILE APP',
      leftInnerZoomFrame: 235,
      rightAppearFrame: 274,
      leftFocusFrame: 564,
      durationInFrames: 918,
    },
    {
      layout: 'label-title-body',
      label: 'THINKING TIME',
      title: 'Standard vs Extended',
      body: [
        'Standard balances speed with depth and is enough for most harder tasks.',
        'Extended gives the model more time to reason through difficult problems.',
        'Extended is powerful, but it also burns through plan limits faster.',
      ],
      bodyTimings: [80, 260, 460],
      image: 'images/gpt-thinking-pro/thinking-time.png',
      imageLeft: true,
      durationInFrames: 959,
    },
    {
      layout: 'label-title-body',
      label: 'CHANGE YOUR MIND',
      title: 'Downshift mid-response',
      body: [
        'While it\'s thinking, use "Skip" or "Give me the answer now" to get a faster reply.',
        'Or use "Try again" at the bottom of a response to switch to a different model.',
      ],
      bodyTimings: [80, 280],
      durationInFrames: 600,
    },
    {
      layout: 'split-contrast',
      asCards: true,
      showDivider: false,
      leftLabel: 'THINKING AVAILABILITY',
      leftTitle: 'Plus and up',
      leftBodies: [
        'GPT-5.5 Thinking is positioned for Plus, Pro, Business, and Enterprise work.',
        'It should be the practical default for deeper professional tasks.',
      ],
      leftBodyTimings: [70, 260],
      rightLabel: 'PRO AVAILABILITY',
      rightTitle: 'Higher plans only',
      rightBodies: [
        'GPT-5.5 Pro is reserved for Pro, Business, and Enterprise plans.',
        'The more expensive the plan, the more room you have for heavy reasoning.',
      ],
      rightBodyTimings: [290, 490],
      highlights: [
        { from: 0, value: 'left' },
        { from: 244, value: 'right' },
      ],
      durationInFrames: 930,
    },
    {
      layout: 'checklist-slide',
      label: 'DEFAULT BEHAVIOR',
      title: 'When to drop to Instant, stay on Thinking, or reach for Pro',
      items: [
        'Default to Thinking for most real knowledge work.',
        'Force Instant when the task is light and speed matters more than nuance.',
        'Choose Pro when the task requires judgment and the cost of a weak answer is high.',
      ],
      itemTimings: [190, 376, 818],
      accentIndex: 0,
      durationInFrames: 960,
    },
  ],
};
