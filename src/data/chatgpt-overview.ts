import { VideoData } from '../scenes/types';

// ChatGPTOverview: new combined overview of ChatGPT features, models, privacy and plans.
// VO: audio/chatgpt-overview.mp3 (Daan, eleven_v4, take 1, 228.4 s), no pre-padding (audioStartFrame 0).
// Timings: src/data/chatgpt-overview.transcript.tsv. Scene start frame = round(word_t × 30).
// On-screen rule: product names always shown as names ("ChatGPT Work", never bare "Work"; "Pro plan" in plans).
export const chatGPTOverview: VideoData = {
  audioSrc: 'audio/chatgpt-overview.mp3',
  audioStartFrame: 0,
  scenes: [
    // 0 → 143 (0.00–4.76) hook: no longer just the chatbot everyone has heard of
    {
      layout: 'title-card-green',
      title: 'ChatGPT',
      subtitle: 'More than a chatbot',
      durationInFrames: 143,
    },

    // 143 → 354 (4.76–11.80) operating system for how leaders work
    {
      layout: 'label-title-body',
      label: 'ChatGPT',
      title: 'The Operating System for How Leaders Work',
      body: ['Write', 'Research', 'Analyze', 'Automate', 'Get work done'],
      bodyTimings: [80, 109, 135, 157, 185],
      durationInFrames: 211,
    },

    // 354 → 454 (11.80–15.12) section: key features
    {
      layout: 'title-card-green',
      title: 'Key Features',
      durationInFrames: 100,
    },

    // 454 → 739 (15.12–24.64) Search vs Deep Research (Deep Research @ 18.40 → local 98)
    {
      layout: 'split-contrast',
      leftLabel: 'Feature',
      leftTitle: 'Search',
      leftBody: 'Live information from the web',
      rightLabel: 'Feature',
      rightTitle: 'Deep Research',
      rightBody: 'Many sources, one structured, cited report',
      rightBodyDelay: 98,
      highlights: [
        { from: 0, value: 'left' },
        { from: 98, value: 'right' },
      ],
      durationInFrames: 285,
    },

    // 739 → 1034 (24.64–34.48) Voice + Advanced Voice (@ 28.32 → local 111)
    {
      layout: 'label-title-body',
      label: 'Feature',
      title: 'Voice',
      body: [
        'Speak naturally with ChatGPT',
        'Advanced Voice: live video + screen sharing in the mobile apps',
      ],
      bodyTimings: [16, 111],
      durationInFrames: 295,
    },

    // 1034 → 1289 (34.48–42.96) Image Generation
    {
      layout: 'label-title-body',
      label: 'Feature',
      title: 'Image Generation',
      body: [
        'Mock-ups, diagrams, posters + other visuals',
        'Strong text rendering + instruction following',
      ],
      bodyTimings: [46, 161],
      durationInFrames: 255,
    },

    // 1289 → 2069 (42.96–68.96) building blocks: Projects 0, Skills 163, Apps 269, Plugins 513
    {
      layout: 'label-title-body',
      label: 'Organize + Connect',
      title: 'Projects, Skills, Apps + Plugins',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        'Projects: Chats, files + instructions around ongoing work',
        'Skills: How to carry out a recurring task',
        'Apps: Google Drive, Microsoft 365, Slack, GitHub, within your permissions',
        'Plugins: Skills, apps, or both, in one package',
      ],
      bodyTimings: [0, 163, 269, 513],
      titleNote: 'Availability depends on your plan + workspace settings',
      titleNoteDelay: 672,
      durationInFrames: 780,
    },

    // 2069 → 2482 (68.96–82.72) ChatGPT Work outputs: documents 276, spreadsheets 300,
    // presentations 331, reports 365, Sites 386
    {
      layout: 'label-title-body',
      label: 'For Larger Tasks',
      title: 'ChatGPT Work',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: ['Documents', 'Spreadsheets', 'Presentations', 'Reports', 'Sites'],
      bodyTimings: [276, 300, 331, 365, 386],
      // "It can research, analyze information, work across your connected apps and files" @ 72.16
      titleNote: 'Researches, analyzes + works across your connected apps and files',
      titleNoteDelay: 96,
      durationInFrames: 413,
    },

    // 2482 → 2693 (82.72–89.76) you stay in control: monitor 33, answer 79, redirect 123, approve 153
    {
      layout: 'process-steps',
      label: 'ChatGPT Work',
      title: 'You Stay in Control',
      horizontal: true,
      cardStyle: true,
      steps: [
        { title: 'Monitor', body: 'Track its progress' },
        { title: 'Answer', body: 'Respond to its questions' },
        { title: 'Redirect', body: 'Change its direction' },
        { title: 'Approve', body: 'Sign off on important actions' },
      ],
      stepTimings: [33, 79, 123, 153],
      durationInFrames: 211,
    },

    // 2693 → 3169 (89.76–105.64) Codex: dedicated 74, write/review 119, desktop 221
    {
      layout: 'label-title-body',
      label: 'For Software Development',
      title: 'Codex',
      body: [
        'A dedicated workspace for code',
        'Write, review, debug + ship',
        'On desktop: Chat, ChatGPT Work + Codex in one experience',
      ],
      bodyTimings: [74, 119, 221],
      durationInFrames: 476,
    },

    // 3169 → 3259 (105.64–108.64) section: the models
    {
      layout: 'title-card-green',
      title: 'The Models',
      durationInFrames: 90,
    },

    // 3259 → 3569 (108.64–118.96) what you see depends on where + plan: 108, 232
    {
      layout: 'label-title-body',
      label: 'The Models',
      title: 'Models + Thinking Settings',
      body: [
        'Depends on Chat, ChatGPT Work or Codex',
        'And on your plan + workspace settings',
      ],
      bodyTimings: [108, 232],
      durationInFrames: 310,
    },

    // 3569 → 4186 (118.96–139.52) thinking settings: names listed 57/81/163, explained 185/295/512
    {
      layout: 'process-steps',
      label: 'In Chat',
      title: 'Thinking Settings',
      horizontal: true,
      cardStyle: true,
      steps: [
        { title: 'Instant', body: 'Fast responses for straightforward tasks' },
        { title: 'Medium, High, Extra High', body: 'More thinking for connected steps + competing constraints' },
        { title: 'Pro', body: 'Particularly demanding work' },
      ],
      stepTimings: [57, 81, 163],
      activeTimings: [185, 295, 512],
      durationInFrames: 617,
    },

    // 4186 → 4704 (139.52–156.80) GPT-6 mapping: Sol 62, Astra 235, ChatGPT Work + Codex 348
    {
      layout: 'split-contrast',
      leftLabel: 'Instant through Extra High',
      leftTitle: 'GPT-6 Sol',
      leftBody: 'Powers everyday + extended thinking',
      leftBodyDelay: 62,
      rightLabel: 'GPT-6 Pro',
      rightTitle: 'GPT-6 Astra',
      rightBodies: ['Powers GPT-6 Pro', 'Demanding work in ChatGPT Work + Codex'],
      rightBodyTimings: [235, 348],
      highlights: [
        { from: 0, value: 'left' },
        { from: 235, value: 'right' },
      ],
      durationInFrames: 518,
    },

    // 4704 → 4776 (156.80–159.20) section: privacy
    {
      layout: 'title-card-green',
      title: 'Privacy',
      durationInFrames: 72,
    },

    // 4776 → 5160 (159.20–172.00) personal vs Business/Enterprise/Edu (@ 164.08 → local 146)
    {
      layout: 'split-contrast',
      leftLabel: 'Personal Plans',
      leftTitle: 'Your Settings',
      leftBody: 'Manage training + data-sharing preferences in Settings',
      rightLabel: 'Business, Enterprise + Edu',
      rightTitle: 'Not Used for Training',
      rightBody: 'Organizational data, by default (per OpenAI)',
      rightBodyDelay: 146,
      highlights: [
        { from: 0, value: 'left' },
        { from: 146, value: 'right' },
      ],
      durationInFrames: 384,
    },

    // 5160 → 5402 (172.00–180.05) three rules: avoid 41, connect 108, verify 190
    {
      layout: 'checklist-slide',
      label: 'Whatever Your Plan',
      title: 'Three Rules',
      items: [
        'Avoid sharing sensitive information',
        'Connect only the apps you trust',
        'Always verify important outputs',
      ],
      itemTimings: [41, 108, 190],
      durationInFrames: 242,
    },

    // 5402 → 5508 (180.05–183.60) section: plans + pricing
    {
      layout: 'title-card-green',
      title: 'Plans + Pricing',
      durationInFrames: 106,
    },

    // 5508 → 6403 (183.60–213.44) individual plans: Free 0, Go 300, Plus 478, Pro plan 694
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Free, Go, Plus + Pro',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        'Free: Everyday chat + Search, limited tool access',
        'Go: Higher limits for uploads, image generation + Voice',
        'Plus: Advanced reasoning, more Deep Research, Codex + ChatGPT Work',
        'Pro plan: Heavier use, higher allowances, more demanding reasoning',
      ],
      bodyTimings: [0, 300, 478, 694],
      durationInFrames: 895,
    },

    // 6403 → 6638 (213.44–221.28) organizations: shared 96, administration 144, security 173
    {
      layout: 'label-title-body',
      label: 'For Organizations',
      title: 'Business + Enterprise',
      body: [
        'Shared workspaces',
        'Administration',
        'Security + governance controls',
      ],
      bodyTimings: [96, 144, 173],
      durationInFrames: 235,
    },

    // 6638 → 6870 (221.28–229.00) close: check the official pricing page
    {
      layout: 'centered-quote',
      text: 'Plans change often. Check the official ChatGPT pricing page.',
      highlight: 'official ChatGPT pricing page',
      durationInFrames: 232,
    },
  ],
};
