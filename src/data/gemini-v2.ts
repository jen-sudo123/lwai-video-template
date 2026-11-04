import { VideoData } from '../scenes/types';

// Gemini overview v2 (Nov 2026 refresh)
// Audio: audio/gemini-v2.mp3  |  238.76s  ElevenLabs eleven_v4, Daan, take 2
// Timings from ElevenLabs Scribe word timestamps: src/data/gemini-v2.transcript.json
// Images: images/gemini-v2/ (sources + editorial notes in 00-source-dates-and-script-guide.txt)
//
//  #  scene                          | VO window (s)     | frames
//  1  title card                     |   0.00 →   2.70   |    81
//  2  hook                           |   2.70 →   8.08   |   161
//  3  reassembly of context quote    |   8.08 →  21.12   |   392
//  4  the context tax                |  21.12 →  29.68   |   256
//  5  payoff quote                   |  29.68 →  34.80   |   154
//  6  section: two ways              |  34.80 →  37.04   |    67
//  7  mode 1: standalone chatbot     |  37.04 →  52.80   |   473
//  8  mode 2: built into Workspace   |  52.80 →  67.12   |   430
//  9  section: key features          |  67.12 →  70.48   |   100
// 10  Deep Research                  |  70.48 →  75.52   |   152
// 11  Gemini Live                    |  75.52 →  81.20   |   170
// 12  Gems                           |  81.20 →  87.68   |   194
// 13  Canvas                         |  87.68 →  92.08   |   132
// 14  Nano Banana 2                  |  92.08 →  95.84   |   113
// 15  Gemini Omni                    |  95.84 → 102.48   |   199
// 16  Workspace Studio               | 102.48 → 108.24   |   173
// 17  Scheduled Actions              | 108.24 → 115.04   |   204
// 18  section: the models            | 115.04 → 116.64   |    48
// 19  model selector                 | 116.64 → 145.26   |   859
// 20  check the facts quote          | 145.26 → 154.52   |   278
// 21  personal privacy               | 154.52 → 162.56   |   241
// 22  Workspace privacy              | 162.56 → 171.84   |   278
// 23  section: plans & pricing       | 171.84 → 174.44   |    78
// 24  individual plans               | 174.44 → 196.48   |   661
// 25  Workspace plans                | 196.48 → 220.80   |   730
// 26  access depends on setup        | 220.80 → 228.24   |   223
// 27  closing quote                  | 228.24 → 240.50   |   368
//                                                  total   7215

const IMG = 'images/gemini-v2';

export const geminiV2: VideoData = {
  audioSrc: 'audio/gemini-v2.mp3',
  scenes: [
    // 1 — VO: "Gemini's real advantage is this:"
    {
      layout: 'title-card-green',
      title: 'Gemini',
      label: 'SELECTING LLMs',
      durationInFrames: 81,
    },

    // 2 — VO: "for teams on Google Workspace, the assistant shows up where the work is already buried."
    {
      layout: 'label-title-body',
      label: 'Why Gemini',
      title: 'Where the Work Already Lives',
      body: ['Built for teams on Google Workspace'],
      bodyTimings: [20],
      image: `${IMG}/27-workspace-context-proximity.jpg`,
      durationInFrames: 161,
    },

    // 3 — VO: "For most leaders, the friction isn't the work itself. It's the constant reassembly of context..."
    {
      layout: 'centered-quote',
      text: "The friction isn't the work. It's the constant reassembly of context.",
      highlight: 'reassembly of context',
      highlightFrame: 125,
      durationInFrames: 392,
    },

    // 4 — VO: "Every time you ask a separate AI tool for help, you have to upload files, paste in background,
    //          and explain the situation all over again."
    {
      layout: 'label-title-body',
      label: 'Separate AI Tools',
      title: 'The Context Tax',
      body: [
        'Upload: The same files, again',
        'Paste: Background into every chat',
        'Explain: The whole situation from scratch',
      ],
      bodyTimings: [98, 132, 175],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['rocket', 'pencil', 'chat-bubble-left-right'],
      durationInFrames: 256,
    },

    // 5 — VO: "Gemini can reduce that context tax for teams already working inside Google."
    {
      layout: 'centered-quote',
      text: 'Gemini reduces the context tax for teams already working inside Google.',
      highlight: 'context tax',
      durationInFrames: 154,
    },

    // 6 — VO: "There are two main ways to use it."
    {
      layout: 'big-statement',
      text: 'Two Ways to Use Gemini',
      animation: 'fade',
      durationInFrames: 67,
    },

    // 7 — VO: "First, Gemini as a standalone chatbot. You go to gemini.google.com ... brainstorm, research,
    //          analyze files, and generate images."
    {
      layout: 'label-title-body',
      label: 'Mode 1',
      title: 'Standalone Chatbot',
      body: [
        'gemini.google.com',
        'Brainstorm, research, analyze files, generate images',
      ],
      bodyTimings: [107, 255],
      image: `${IMG}/01-gemini-overview.jpg`,
      durationInFrames: 473,
    },

    // 8 — VO: "The second mode is where it gets strategic... Gmail, Docs, Sheets, Slides, Drive, and Meet.
    //          The AI appears where the work is already happening."
    {
      layout: 'label-title-body',
      label: 'Mode 2',
      title: 'Built into Workspace',
      body: [
        'Gmail, Docs, Sheets, Slides, Drive, Meet',
        'AI appears where the work is happening',
      ],
      bodyTimings: [204, 346],
      image: `${IMG}/02-gemini-in-gmail.png`,
      imageSwaps: [
        { from: 223, src: `${IMG}/03-gemini-in-docs.png` },
        { from: 247, src: `${IMG}/04-gemini-in-sheets.png` },
        { from: 274, src: `${IMG}/05-gemini-in-slides.png` },
        { from: 293, src: `${IMG}/06-gemini-in-drive.png` },
        { from: 317, src: `${IMG}/07-gemini-in-meet.jpg` },
      ],
      durationInFrames: 430,
    },

    // 9 — VO: "Beyond the basics, the feature set has grown fast."
    {
      layout: 'big-statement',
      text: 'Key Features',
      animation: 'fade',
      durationInFrames: 100,
    },

    // 10 — VO: "Deep Research produces multi-source reports, and can draw on your Workspace files."
    {
      layout: 'label-title-body',
      label: 'Research',
      title: 'Deep Research',
      body: ['Multi-source reports', 'Can draw on your Workspace files'],
      bodyTimings: [46, 89],
      image: `${IMG}/08-deep-research-workspace.png`,
      durationInFrames: 152,
    },

    // 11 — VO: "Gemini Live gives you a real-time voice conversation, with optional camera or screen sharing."
    {
      layout: 'label-title-body',
      label: 'Voice',
      title: 'Gemini Live',
      body: ['Real-time voice conversation', 'Optional camera or screen sharing'],
      bodyTimings: [46, 103],
      image: `${IMG}/09-gemini-live-camera.png`,
      imageSwaps: [{ from: 115, src: `${IMG}/28-gemini-live-camera-demo.png` }],
      durationInFrames: 170,
    },

    // 12 — VO: "Gems are custom assistants for repeating workflows. So you stop rewriting the same prompt every Monday."
    {
      layout: 'label-title-body',
      label: 'Custom Assistants',
      title: 'Gems',
      body: ['Built for repeating workflows', 'Stop rewriting the same prompt'],
      bodyTimings: [22, 110],
      image: `${IMG}/10-gems-manager.avif`,
      imageSwaps: [{ from: 120, src: `${IMG}/11-gems-builder.avif` }],
      durationInFrames: 194,
    },

    // 13 — VO: "Canvas is a dedicated space for iterating on documents or code."
    {
      layout: 'label-title-body',
      label: 'Workspace',
      title: 'Canvas',
      body: ['Iterate on documents or code'],
      bodyTimings: [63],
      image: `${IMG}/12-canvas-code-and-preview.png`,
      durationInFrames: 132,
    },

    // 14 — VO: "Nano Banana 2 generates images, up to 4K."
    {
      layout: 'label-title-body',
      label: 'Images',
      title: 'Nano Banana 2',
      body: ['Image generation up to 4K'],
      bodyTimings: [34],
      image: `${IMG}/13-nano-banana-2.png`,
      imageSwaps: [{ from: 80, src: `${IMG}/14-nano-banana-infographic.png` }],
      durationInFrames: 113,
    },

    // 15 — VO: "Gemini Omni handles video generation and editing, using text, image, audio, and video inputs."
    {
      layout: 'label-title-body',
      label: 'Video',
      title: 'Gemini Omni',
      body: ['Video generation and editing', 'From text, image, audio, and video inputs'],
      bodyTimings: [43, 106],
      image: `${IMG}/15-gemini-omni.png`,
      imageSwaps: [{ from: 79, src: `${IMG}/16-omni-video-example.webp` }],
      durationInFrames: 199,
    },

    // 16 — VO: "Workspace Studio lets you build multi-step automations across your Google apps, without writing code."
    {
      layout: 'label-title-body',
      label: 'Automation',
      title: 'Workspace Studio',
      body: ['Multi-step automations across Google apps', 'No code required'],
      bodyTimings: [56, 132],
      image: `${IMG}/17-workspace-studio-workflow.png`,
      durationInFrames: 173,
    },

    // 17 — VO: "And Scheduled Actions automate recurring AI tasks, like a daily email summary or a regular research pull."
    {
      layout: 'label-title-body',
      label: 'Automation',
      title: 'Scheduled Actions',
      body: ['Automate recurring AI tasks', 'Daily email summaries, research pulls'],
      bodyTimings: [40, 108],
      image: `${IMG}/18-scheduled-actions-list.jpg`,
      imageSwaps: [{ from: 108, src: `${IMG}/19-scheduled-action-editor.jpg` }],
      durationInFrames: 204,
    },

    // 18 — VO: "Now, the models."
    {
      layout: 'big-statement',
      text: 'The Models',
      animation: 'fade',
      durationInFrames: 48,
    },

    // 19 — VO: "...Gemini 3.6 Flash, Gemini 3.8 Thinking, and Gemini 3.1 Pro. Your options may differ...
    //           Flash is your everyday option... Thinking is for complex problems... Pro provides advanced reasoning..."
    // No model images: the Drive release graphics aren't the account selector, and 21 labels 3.8 as Flash.
    {
      layout: 'label-title-body',
      label: 'Model Selector',
      title: 'Three Options',
      titleNote: 'Options vary by account and license',
      titleNoteDelay: 355,
      body: [
        'Gemini 3.6 Flash: Everyday writing, brainstorming, and summarizing',
        'Gemini 3.8 Thinking: Complex problems with several connected steps',
        'Gemini 3.1 Pro: Advanced reasoning for demanding analysis',
      ],
      bodyTimings: [137, 200, 267],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'lightbulb', 'star'],
      durationInFrames: 859,
    },

    // 20 — VO: "The more demanding options may take longer... always check important facts and assumptions."
    {
      layout: 'centered-quote',
      text: 'Whichever model you choose, check important facts and assumptions.',
      highlight: 'check important facts',
      highlightFrame: 188,
      durationInFrames: 278,
    },

    // 21 — VO: "On privacy: you can manage your Gemini Apps Activity, and choose whether your interactions help improve Google's AI."
    {
      layout: 'label-title-body',
      label: 'Privacy',
      title: 'Your Data Controls',
      body: ['Manage Gemini Apps Activity', 'Choose whether chats help improve Google AI'],
      bodyTimings: [51, 126],
      image: `${IMG}/23-personal-privacy-notice.jpg`,
      durationInFrames: 241,
    },

    // 22 — VO: "For Google Workspace customers, your submissions aren't used to train models.
    //           They stay within Workspace's enterprise security and admin controls."
    {
      layout: 'label-title-body',
      label: 'Workspace Customers',
      title: 'Enterprise Protection',
      body: [
        "No model training: Submissions aren't used to train models",
        'Stays in Workspace: Enterprise security and admin controls',
      ],
      bodyTimings: [84, 149],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['x', 'check'],
      durationInFrames: 278,
    },

    // 23 — VO: "Finally, plans and pricing."
    {
      layout: 'big-statement',
      text: 'Plans & Pricing',
      animation: 'fade',
      durationInFrames: 78,
    },

    // 24 — VO: "For individuals, Google offers three paid AI plans. Google AI Plus... Pro... Ultra..."
    // No prices on screen: the Drive plan graphics show historical May 2026 prices.
    {
      layout: 'label-title-body',
      label: 'Individuals',
      title: 'Google AI Plans',
      body: [
        "Google AI Plus: Expanded access to Gemini's features and limits",
        'Google AI Pro: Higher limits, broader advanced capabilities',
        'Google AI Ultra: Higher allowances for intensive work',
      ],
      bodyTimings: [133, 292, 460],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sparkles', 'star', 'rocket'],
      durationInFrames: 661,
    },

    // 25 — VO: "For organizations... Business Starter... Business Standard... Business Plus... And Enterprise..."
    {
      layout: 'label-title-body',
      label: 'Organizations',
      title: 'Workspace Plans',
      body: [
        'Business Starter: Gemini in Gmail, plus the Gemini app',
        'Business Standard: Gemini in Docs, Meet, and more',
        'Business Plus: Enhanced security, management, data retention',
        'Enterprise: Additional security, compliance, admin controls',
      ],
      bodyTimings: [171, 305, 435, 584],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'trending', 'sliders', 'check'],
      durationInFrames: 730,
    },

    // 26 — VO: "What your team can actually use depends on its Workspace license, any add-on subscriptions, and your admin settings."
    {
      layout: 'label-title-body',
      label: 'Your Access',
      title: 'Depends on Your Setup',
      body: ['Workspace license', 'Add-on subscriptions', 'Admin settings'],
      bodyTimings: [79, 127, 180],
      image: `${IMG}/24-workspace-plans-licensing.png`,
      durationInFrames: 223,
    },

    // 27 — VO: "So here's the bottom line. Gemini's real leverage is context proximity.
    //           It helps your team move faster, inside the work. But you still own the judgment."
    {
      layout: 'centered-quote',
      text: "Gemini's real leverage is context proximity. You still own the judgment.",
      highlight: 'context proximity',
      highlightFrame: 109,
      durationInFrames: 368,
    },
  ],
};
