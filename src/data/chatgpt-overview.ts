import { VideoData } from '../scenes/types';

// ChatGPTOverview: new combined overview of ChatGPT features, models, privacy and plans.
// VO: audio/chatgpt-overview.mp3 (Daan, eleven_v4, take 1, 228.4 s), no pre-padding (audioStartFrame 0).
// Timings: src/data/chatgpt-overview.transcript.tsv. Scene start frame = round(word_t × 30).
// On-screen rule: product names always shown as names ("ChatGPT Work", never bare "Work"; "Pro plan" in plans).
export const chatGPTOverview: VideoData = {
  audioSrc: 'audio/chatgpt-overview.mp3',
  audioStartFrame: 0,
  scenes: [
    // 0 → 143 (0.00–4.76) hook
    { layout: 'title-card-green', title: 'ChatGPT', subtitle: 'More than a chatbot', durationInFrames: 143 },

    // 143 → 354 (4.76–11.80) operating system: write 80, research 109, analyze 135, automate 157, done 185
    {
      layout: 'label-title-body',
      label: 'ChatGPT',
      title: 'The Operating System for How Leaders Work',
      body: ['Write', 'Research', 'Analyze', 'Automate', 'Get work done'],
      bodyTimings: [80, 109, 135, 157, 185],
      image: 'chatgpt-overview/images/01-chatgpt-desktop-overview.png',
      durationInFrames: 211,
    },

    // 354 → 454 (11.80–15.12) section
    { layout: 'big-statement', text: 'Key Features', size: 'hero', animation: 'kinetic', durationInFrames: 100 },

    // 454 → 739 (15.12–24.64) Search vs Deep Research (Deep Research @ 18.40 → local 98)
    {
      layout: 'comparison',
      title: 'Search + Deep Research',
      leftImage: 'chatgpt-overview/images/02-search-citations.png',
      leftLabel: 'Search: live web information',
      rightImage: 'chatgpt-overview/images/03-deep-research-report.png',
      rightLabel: 'Deep Research: a structured, cited report',
      objectFit: 'contain',
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
      body: ['Speak naturally with ChatGPT', 'Advanced Voice: live video + screen sharing in the mobile apps'],
      bodyTimings: [16, 111],
      image: 'chatgpt-overview/images/04-voice-screen-sharing.webp',
      durationInFrames: 295,
    },

    // 1034 → 1289 (34.48–42.96) Image Generation
    {
      layout: 'label-title-body',
      label: 'Feature',
      title: 'Image Generation',
      body: ['Mock-ups, diagrams, posters + other visuals', 'Strong text rendering + instruction following'],
      bodyTimings: [46, 161],
      image: 'chatgpt-overview/images/05-chatgpt-images-2-5.png',
      durationInFrames: 255,
    },

    // 1289 → 1452 (42.96–48.40) Projects: organize 21, ongoing work 108
    {
      layout: 'label-title-body',
      label: 'Feature',
      title: 'Projects',
      body: ['Chats, files + instructions in one place', 'Organized around ongoing work'],
      bodyTimings: [21, 108],
      image: 'chatgpt-overview/images/06-projects-files-instructions.png',
      durationInFrames: 163,
    },

    // 1452 → 1558 (48.40–51.92) Skills: define 17
    {
      layout: 'label-title-body',
      label: 'Feature',
      title: 'Skills',
      body: ['How to carry out a recurring task'],
      bodyTimings: [17],
      image: 'chatgpt-overview/images/08-skills-panel.png',
      durationInFrames: 106,
    },

    // 1558 → 2069 (51.92–68.96) Apps 0, permissions 181, Plugins 244, availability 403
    {
      layout: 'label-title-body',
      label: 'Connect',
      title: 'Apps + Plugins',
      body: [
        'Apps: Google Drive, Microsoft 365, Slack, GitHub',
        'Within the permissions you set',
        'Plugins: skills, apps, or both',
        'Availability depends on plan + workspace settings',
      ],
      bodyTimings: [0, 181, 244, 403],
      image: 'chatgpt-overview/images/07-plugins-app-directory.jpg',
      durationInFrames: 511,
    },

    // 2069 → 2345 (68.96–78.16) ChatGPT Work: research 114, work across 175
    {
      layout: 'label-title-body',
      label: 'For Larger Tasks',
      title: 'ChatGPT Work',
      body: ['Researches + analyzes', 'Works across your connected apps + files'],
      bodyTimings: [114, 175],
      image: 'chatgpt-overview/images/09-work-presentation.png',
      durationInFrames: 276,
    },

    // 2345 → 2482 (78.16–82.72) outputs: documents 0, spreadsheets 24, presentations 55, reports 89, Sites 110
    {
      layout: 'label-title-body',
      label: 'ChatGPT Work',
      title: 'Finished Outputs',
      body: ['Documents', 'Spreadsheets', 'Presentations', 'Reports', 'Sites'],
      bodyTimings: [0, 24, 55, 89, 110],
      images: ['chatgpt-overview/images/10-work-spreadsheet.webp', 'chatgpt-overview/images/16-sites-dashboard.webp'],
      imageTimings: [24, 110],
      durationInFrames: 137,
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

    // 2693 → 2914 (89.76–97.12) Codex: dedicated 74, write/review 119
    {
      layout: 'label-title-body',
      label: 'For Software Development',
      title: 'Codex',
      body: ['A dedicated workspace for code', 'Write, review, debug + ship'],
      bodyTimings: [74, 119],
      image: 'chatgpt-overview/images/12-codex-workspace.png',
      durationInFrames: 221,
    },

    // 2914 → 3169 (97.12–105.64) desktop: unified 139, keeping 189
    {
      layout: 'label-title-body',
      label: 'On Desktop',
      title: 'Chat, ChatGPT Work + Codex',
      body: ['A more unified experience', 'Codex keeps its own workspace'],
      bodyTimings: [139, 189],
      image: 'chatgpt-overview/images/11-work-desktop.png',
      durationInFrames: 255,
    },

    // 3169 → 3259 (105.64–108.64) section
    { layout: 'big-statement', text: 'The Models', size: 'hero', animation: 'kinetic', durationInFrames: 90 },

    // 3259 → 3569 (108.64–118.96) depends on where + plan: 108, 232
    {
      layout: 'label-title-body',
      label: 'The Models',
      title: 'Models + Thinking Settings',
      body: ['Depends on Chat, ChatGPT Work or Codex', 'And on your plan + workspace settings'],
      bodyTimings: [108, 232],
      image: 'chatgpt-overview/images/13-thinking-settings.png',
      durationInFrames: 310,
    },

    // 3569 → 4186 (118.96–139.52) thinking settings: listed 57/81/163, explained 185/295/512
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

    // 4186 → 4704 (139.52–156.80) GPT-6: Sol 62, Astra 235, ChatGPT Work + Codex 348
    {
      layout: 'label-title-body',
      label: 'When You Select GPT-6',
      title: 'GPT-6 Sol + GPT-6 Astra',
      body: [
        'GPT-6 Sol: Instant through Extra High',
        'GPT-6 Astra: powers GPT-6 Pro',
        'Astra also handles demanding work in ChatGPT Work + Codex',
      ],
      bodyTimings: [62, 235, 348],
      image: 'chatgpt-overview/images/14-astra-model-art.webp',
      durationInFrames: 518,
    },

    // 4704 → 4776 (156.80–159.20) section
    { layout: 'big-statement', text: 'Privacy', size: 'hero', animation: 'kinetic', durationInFrames: 72 },

    // 4776 → 4922 (159.20–164.08) personal plans: manage 49
    {
      layout: 'label-title-body',
      label: 'Privacy',
      title: 'Personal Plans',
      body: ['Manage training + data-sharing preferences in Settings'],
      bodyTimings: [49],
      image: 'chatgpt-overview/images/15-privacy-data-controls.png',
      durationInFrames: 146,
    },

    // 4922 → 5160 (164.08–172.00) org plans: OpenAI 84
    {
      layout: 'label-title-body',
      label: 'Privacy',
      title: 'Business, Enterprise + Edu',
      body: ["Per OpenAI, organizational data isn't used to train models by default"],
      bodyTimings: [84],
      image: 'chatgpt-overview/images/19-plans-business-enterprise-usd.png',
      // Zoom to the Business card's "No training on your business data by default" line
      imageZoomKeyframes: [{ startFrame: 84, centerX: 0.25, centerY: 0.74, scale: 2.2 }],
      durationInFrames: 238,
    },

    // 5160 → 5402 (172.00–180.05) three rules: avoid 41, connect 108, verify 190
    {
      layout: 'checklist-slide',
      label: 'Whatever Your Plan',
      title: 'Three Rules',
      items: ['Avoid sharing sensitive information', 'Connect only the apps you trust', 'Always verify important outputs'],
      itemTimings: [41, 108, 190],
      durationInFrames: 242,
    },

    // 5402 → 5508 (180.05–183.60) section
    { layout: 'big-statement', text: 'Plans + Pricing', size: 'hero', animation: 'kinetic', durationInFrames: 106 },

    // 5508 → 6403 (183.60–213.44) individual plans, image pans to each plan as named: Free 0, Go 300, Plus 478, Pro 694
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Free, Go, Plus + Pro',
      body: [
        'Free: everyday chat + Search, limited tools',
        'Go: higher limits for everyday use',
        'Plus: advanced reasoning + more tools',
        'Pro plan: heavier use, more demanding reasoning',
      ],
      bodyTimings: [0, 300, 478, 694],
      image: 'chatgpt-overview/images/18-plans-individual-usd.png',
      imageZoomKeyframes: [
        { startFrame: 20, centerX: 0.14, centerY: 0.35, scale: 1.9 },
        { startFrame: 300, centerX: 0.38, centerY: 0.35, scale: 1.9 },
        { startFrame: 478, centerX: 0.62, centerY: 0.35, scale: 1.9 },
        { startFrame: 694, centerX: 0.86, centerY: 0.35, scale: 1.9 },
      ],
      durationInFrames: 895,
    },

    // 6403 → 6638 (213.44–221.28) organizations: shared 96, administration 144, security 173
    {
      layout: 'label-title-body',
      label: 'For Organizations',
      title: 'Business + Enterprise',
      body: ['Shared workspaces', 'Administration', 'Security + governance controls'],
      bodyTimings: [96, 144, 173],
      image: 'chatgpt-overview/images/19-plans-business-enterprise-usd.png',
      durationInFrames: 235,
    },

    // 6638 → 6870 (221.28–229.00) close
    {
      layout: 'centered-quote',
      text: 'Plans change often. Check the official ChatGPT pricing page.',
      highlight: 'official ChatGPT pricing page',
      durationInFrames: 232,
    },
  ],
};
