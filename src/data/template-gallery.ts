import { VideoData } from '../scenes/types';

export const templateGallery: VideoData = {
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Template Gallery',
      subtitle: 'Reusable LWAI scene layouts',
      durationInFrames: 60,
    },
    {
      layout: 'checklist-slide',
      label: 'Checklist',
      title: 'Use this when a lesson has concrete criteria.',
      items: [
        'Define the job the AI should do.',
        'Add the constraints that matter.',
        'Ask for multiple directions.',
        'Choose the strongest and refine.',
      ],
      itemTimings: [0, 34, 68, 102],
      accentIndex: 2,
      durationInFrames: 180,
    },
    {
      layout: 'process-steps',
      label: 'Process',
      title: 'Show a workflow without turning it into dense text.',
      steps: [
        {
          title: 'Ask',
          body: 'Give the model a clear task and enough context to start.',
        },
        {
          title: 'Compare',
          body: 'Look across the options instead of polishing the first answer.',
        },
        {
          title: 'Refine',
          body: 'Use your judgment to steer the strongest direction.',
        },
      ],
      stepTimings: [0, 50, 100],
      durationInFrames: 180,
    },
    {
      layout: 'prompt-example',
      label: 'Prompt Upgrade',
      title: 'Show the exact before and after of a better prompt.',
      beforeLabel: 'Default prompt',
      before: 'Give me ideas for a launch campaign.',
      afterLabel: 'Stronger prompt',
      after: 'Give me 8 launch campaign options ranging from practical and low-cost to bold and category-defining.',
      afterTiming: 80,
      durationInFrames: 180,
    },
    {
      layout: 'takeaway-stack',
      label: 'Takeaways',
      title: 'Close a section with three crisp points.',
      takeaways: [
        {
          kicker: 'Principle',
          text: 'Options improve judgment because comparison is easier than invention.',
        },
        {
          kicker: 'Move',
          text: 'Name the range you want, then let the model fill the space.',
        },
        {
          kicker: 'Trigger',
          text: 'If one answer feels wrong, ask for a range instead.',
        },
      ],
      timings: [0, 46, 92],
      durationInFrames: 180,
    },

    // ── New layouts added from AskingForOptions ──

    {
      layout: 'title-slide-transition',
      label: 'SECTION',
      text: 'Title Slide Transition',
      bodyRows: [
        { label: 'Use case one', prompt: '"Show the first example prompt here."' },
        { label: 'Use case two', prompt: '"Show the second example prompt here."' },
        { label: 'Use case three', prompt: '"Show the third example prompt here."' },
      ],
      bodyRowTimings: [0, 60, 120],
      durationInFrames: 240,
    },

    {
      layout: 'define-range-diagram',
      modelAppearFrame: 60,
      durationInFrames: 180,
    },

    {
      layout: 'process-steps',
      label: 'TWO-COLUMN PROCESS',
      title: 'Compare two paths side by side.',
      steps: [
        { title: 'Step A1', body: 'First action in the left path.' },
        { title: 'Step A2', body: 'Second action in the left path.' },
      ],
      stepTimings: [0, 40],
      rightLabel: 'FASTER PATH',
      rightSteps: [
        { title: 'Step B1', body: 'First action in the right path.' },
        { title: 'Step B2', body: 'Second action in the right path.' },
      ],
      rightStepTimings: [80, 120],
      highlights: [
        { from: 0, value: 'left' },
        { from: 70, value: 'right' },
      ],
      durationInFrames: 180,
    },

    {
      layout: 'checklist-slide',
      label: 'CHECKLIST + STATEMENT',
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
      itemTimings: [90, 110, 180],
      accentIndex: 2,
      durationInFrames: 240,
    },

    {
      layout: 'big-statement',
      label: 'BIG STATEMENT + IMAGE',
      text: 'Use this when a point\nneeds visual support.',
      highlight: 'visual support',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 40],
      image: 'images/features/Define the range.png',
      imageDelay: 60,
      durationInFrames: 210,
    },

    {
      layout: 'label-title-body',
      label: '',
      title: 'Use cards with highlights to guide attention.',
      body: [
        'First card: describe the primary action here.',
        'Second card: describe the follow-up action here.',
      ],
      bodyTimings: [0, 80],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'eye'],
      highlights: [
        { from: 0, value: 'left' },
        { from: 60, value: 'right' },
      ],
      durationInFrames: 180,
    },

    // ── New layouts added from WelcomeToAiLeaderAdvanced ──

    {
      layout: 'big-statement',
      label: 'Big Statement',
      text: 'Use this when a single idea\nneeds to land.',
      highlight: 'single idea',
      animation: 'kinetic',
      durationInFrames: 150,
    },

    {
      layout: 'label-title-body',
      label: 'LABEL / TITLE / BODY',
      title: 'Present content with a supporting image.',
      body: [
        'First key point with supporting detail.',
        'Second key point — add context here.',
        'Third key point — final reinforcement.',
      ],
      bodyTimings: [0, 50, 100],
      durationInFrames: 180,
    },

    {
      layout: 'label-title-body',
      label: 'CARDS LAYOUT',
      title: 'Use cards when each point stands alone.',
      body: [
        'Speed: cuts task time from hours to minutes.',
        'Scale: handles volume a human cannot.',
        'Focus: frees you for high-judgment work.',
      ],
      bodyTimings: [0, 50, 100],
      bodyCards: true,
      durationInFrames: 180,
    },

    {
      layout: 'stat-hero',
      stat: '40%',
      label: 'STAT HERO',
      context: 'Use this to make a single number impossible to ignore.',
      durationInFrames: 150,
    },

    {
      layout: 'split-contrast',
      leftLabel: 'BEFORE',
      leftTitle: 'The old way',
      leftBody: 'Manual, slow, and easy to miss.',
      rightLabel: 'AFTER',
      rightTitle: 'The new way',
      rightBody: 'Automated, fast, and reliable every time.',
      dividerLabel: 'vs.',
      highlights: [
        { from: 0, value: 'left' },
        { from: 60, value: 'right' },
      ],
      durationInFrames: 150,
    },

    {
      layout: 'split-contrast',
      leftLabel: 'OLD WAY',
      leftTitle: '',
      leftBody: '',
      rightLabel: 'NEW WAY',
      rightTitle: '',
      rightBody: '',
      dividerLabel: 'to',
      labelsOnly: true,
      highlights: [
        { from: 0, value: 'left' },
        { from: 45, value: 'right' },
      ],
      durationInFrames: 120,
    },

    // ── New layouts added from GeminiInDocs ──

    // video-clip: basic overlay (bottom-left card, no zoom)
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 14.88,
      label: 'VIDEO CLIP',
      title: 'Screen recording with text overlay',
      body: [
        'Label + title + body over a live video background',
        'Body lines fade in on custom frame timings',
      ],
      bodyTimings: [40, 90],
      durationInFrames: 180,
    },

    // video-clip: top overlay
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 58.34,
      label: 'TOP OVERLAY',
      title: 'Text card pinned to the top',
      body: ['Use overlayPosition: "top" to keep the bottom of the frame clear'],
      bodyTimings: [40],
      overlayPosition: 'top',
      durationInFrames: 150,
    },

    // video-clip: top-right overlay
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 183.78,
      label: 'TOP-RIGHT OVERLAY',
      title: 'Card in the top-right corner',
      body: ['Use overlayPosition: "top-right" when content is left-heavy'],
      bodyTimings: [40],
      overlayPosition: 'top-right',
      durationInFrames: 150,
    },

    // video-clip: keyframe zoom — full → bottom → out → right
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 14.88,
      label: 'KEYFRAME ZOOM',
      title: 'Animate the camera with clipZoomKeyframes',
      body: [
        'Zoom in to any region at any frame',
        'Pan between regions smoothly',
        'Zoom back out on cue',
      ],
      bodyTimings: [40, 90, 140],
      overlayPosition: 'top',
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 },
        { startFrame: 40,  scale: 1.6, originX: 50, originY: 85 }, // bottom
        { startFrame: 100, scale: 1.0, originX: 50, originY: 50 }, // zoom out
        { startFrame: 140, scale: 1.6, originX: 90, originY: 20 }, // top-right
      ],
      durationInFrames: 240,
    },

    // ── New layouts added from the free Line Chart template ──

    {
      layout: 'line-chart',
      title: 'Revenue Growth',
      durationInFrames: 150,
    },
  ],
};
