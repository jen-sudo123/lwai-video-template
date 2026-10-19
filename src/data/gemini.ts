import { VideoData } from '../scenes/types';

// Gemini overview video
// Audio: audio/gemini.mp3  |  228.75s  (updated 2026-07-31)
// Timestamps aligned to Whisper base model word timestamps
//
// Visuals:
//   Static images  → images/gemini/  (screenshots from promo + asset packs)
//   Video clips    → video/gemini/   (imagen4-hero, omni-montage, canvas-hero)
//
//  scene                                  | VO window          | frames
//  ---------------------------------------|--------------------|---------
//  1  title card                          |  0.00 →   2.37    |    71
//  2  capabilities hook                   |  2.37 →   9.74    |   220
//  3  context tax quote                   |  9.74 →  34.04    |   729
//  4  section: two ways                   | 34.04 →  36.22    |    65
//  5  Gemini Chat                         | 36.22 →  52.14    |   478
//  6  Gemini in Workspace                 | 52.14 →  66.24    |   423
//  7  features bridge quote               | 66.24 →  70.04    |   114
//  8  Search & Deep Research              | 70.04 →  76.46    |   193
//  9  Gemini Live                         | 76.46 →  81.78    |   160
// 10  Gems                                | 81.78 →  88.44    |   200
// 11  Canvas                              | 88.44 →  92.90    |   134  ← video-clip
// 12  Image Generation                    | 92.90 → 100.56    |   230  ← video-clip
// 13  Gemini Omni                         |100.56 → 108.90    |   250  ← video-clip
// 14  Workspace Studio                    |108.90 → 117.18    |   248
// 15  Scheduled Actions                   |117.18 → 123.18    |   180
// 16  section: models                     |123.18 → 125.18    |    60
// 17  Gemini 3 Family                     |124.50 → 143.78    |   580
// 18  section: pricing                    |143.78 → 145.78    |    60
// 19  Paid Plans (individual)             |144.86 → 172.22    |   795
// 20  Workspace Plans                     |173.68 → 204.04    |   950
// 21  section: privacy                    |204.04 → 206.04    |    60
// 22  Consumer privacy                    |205.14 → 211.12    |   195
// 23  Enterprise privacy                  |212.46 → 219.04    |   200
// 24  closing quote                       |220.30 → 228.18    |   270
//                                                      total    6865

export const gemini: VideoData = {
  audioSrc: 'audio/gemini.mp3',
  scenes: [
    // 1 — Title card (0:00 → 0:02)
    {
      layout: 'title-card-green',
      title: 'Gemini',
      label: 'SELECTING LLMs',
      durationInFrames: 71,
    },

    // 2 — Capabilities hook (0:02 → 0:09)
    // VO: "The real advantage of Gemini is that for Google Workspace teams,
    //      the assistant can show up where the work is already buried."
    {
      layout: 'label-title-body',
      label: "Google's AI Assistant",
      title: 'Gemini',
      body: [
        'Chat, upload files, use voice or camera',
        'Write, analyze, research, and create',
      ],
      bodyTimings: [0, 100],
      images: [
        'images/gemini/gemini-logo.png',
        'images/gemini/gemini-capabilities-icons.png',
      ],
      imageTimings: [0, 80],
      durationInFrames: 220,
    },

    // 3 — Context tax quote (0:09 → 0:34)
    // VO: "For most leaders, the friction is the constant reassembly of context.
    //      ...Gemini can reduce that context tax for teams already working inside Google."
    {
      layout: 'centered-quote',
      text: 'Meets you where your work already happens.',
      durationInFrames: 729,
    },

    // 4 — Section break: Two Ways (0:34 → 0:36)
    // VO: "Gemini works in two modes."
    {
      layout: 'big-statement',
      text: 'Two Ways to Work',
      animation: 'fade',
      durationInFrames: 65,
    },

    // 5 — Gemini Chat (0:36 → 0:52)
    // VO: "First, there's Gemini as a standalone chatbot. You go to gemini.google.com
    //      and you can brainstorm, research, analyze files, generate images.
    //      It's a capable general-purpose assistant."
    {
      layout: 'label-title-body',
      label: 'Mode 1',
      title: 'Gemini Chat',
      body: [
        'Ask questions, brainstorm, generate images',
        'Analyze files, research — similar to ChatGPT',
      ],
      bodyTimings: [0, 337],
      image: 'images/gemini/gemini-chat.png',
      durationInFrames: 478,
    },

    // 6 — Gemini in Workspace (0:52 → 1:06)
    // VO: "The second mode is where it gets strategic. Gemini is embedded directly
    //      inside Google Workspace, showing up in Gmail, Docs, Sheets, Slides, Drive and Meet."
    {
      layout: 'label-title-body',
      label: 'Mode 2',
      title: 'Gemini in Workspace',
      body: [
        'Appears where work happens automatically',
        'Gmail, Docs, Sheets, Slides, Drive, Meet',
      ],
      bodyTimings: [0, 211],
      image: 'images/gemini/gemini-workspace.png',
      durationInFrames: 423,
    },

    // 7 — Features bridge (1:06 → 1:10)
    // VO: "Beyond the basics, the feature set has grown fast."
    {
      layout: 'centered-quote',
      text: 'Matches ChatGPT in range, with native Google integration.',
      durationInFrames: 114,
    },

    // 8 — Search & Deep Research (1:10 → 1:16)
    // VO: "Deep research. Produces multi-source reports grounded in your actual workspace data."
    {
      layout: 'label-title-body',
      label: 'Research',
      title: 'Search & Deep Research',
      body: [
        'Web search with source-specific filters',
        'Q&A grounded in your Workspace data',
      ],
      bodyTimings: [0, 100],
      image: 'images/gemini/deep-research.png',
      durationInFrames: 193,
    },

    // 9 — Gemini Live (1:16 → 1:21)
    // VO: "Gemini live, real-time voice conversation with optional camera or screen sharing."
    {
      layout: 'label-title-body',
      label: 'Voice',
      title: 'Gemini Live',
      body: [
        'Real-time voice conversations',
        'Optional camera or screen sharing for visual context',
      ],
      bodyTimings: [0, 80],
      image: 'images/gemini/gemini-live-crop.png',
      durationInFrames: 160,
    },

    // 10 — Gems (1:21 → 1:28)
    // VO: "Gems, custom assistance for repeating workflows, so you stop
    //      rewriting the same prompt every Monday."
    {
      layout: 'label-title-body',
      label: 'Tools',
      title: 'Gems',
      body: [
        'Build specialized assistants for repeat workflows',
        'Reduce repetitive prompting across your team',
      ],
      bodyTimings: [0, 101],
      image: 'images/gemini/gems-crop.png',
      durationInFrames: 200,
    },

    // 11 — Canvas (1:28 → 1:33)
    // VO: "Canvas, a dedicated space for iterating on documents or code."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini/canvas-hero.mp4',
      videoStartTime: 0,
      label: 'Tools',
      title: 'Canvas',
      body: [
        'Create and iterate on documents and code',
        'Export to Docs or deploy as live web apps',
      ],
      bodyTimings: [0, 67],
      panelLayout: 'text-left',
      durationInFrames: 134,
    },

    // 12 — Image Generation (1:33 → 1:41)
    // VO: "On the creative side, Gemini has nano-banana 2, image generation up to 4K..."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini/imagen4-hero.mp4',
      videoStartTime: 0,
      label: 'Creation',
      title: 'Image Generation',
      body: [
        'Nano Banana 2: high-quality images with strong text rendering',
        'Up to 4K output with photo editing capabilities',
      ],
      bodyTimings: [0, 161],
      panelLayout: 'text-left',
      durationInFrames: 230,
    },

    // 13 — Gemini Omni (1:41 → 1:50)
    // VO: "...and Gemini Omni, the latest multimodal model that lets you generate
    //      and edit video from blended text, audio, image and video inputs."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini/omni-montage.mp4',
      videoStartTime: 0,
      label: 'Multimodal',
      title: 'Gemini Omni',
      body: [
        'Blends text, audio, image, and video inputs',
        'Generate and edit video from multi-modal prompts',
      ],
      bodyTimings: [0, 72],
      panelLayout: 'text-left',
      durationInFrames: 250,
    },

    // 14 — Workspace Studio (1:50 → 1:58)
    // VO: "For productivity, we have Workspace Studio, so you can create
    //      multi-step automations across your Google apps without writing code."
    {
      layout: 'label-title-body',
      label: 'Automation',
      title: 'Workspace Studio',
      body: [
        'Agentic automation across Workspace apps',
        'Orchestrate multi-step processes end to end',
      ],
      bodyTimings: [0, 97],
      image: 'images/gemini/workspace-studio-crop.png',
      durationInFrames: 248,
    },

    // 15 — Scheduled Actions (1:58 → 2:03)
    // VO: "Scheduled actions automate recurring AI tasks like daily email
    //      summaries or research polls."
    {
      layout: 'label-title-body',
      label: 'Tools',
      title: 'Scheduled Actions',
      body: [
        'Automate recurring tasks: daily reports, research, email summaries',
      ],
      bodyTimings: [0],
      image: 'images/gemini/scheduled-actions-crop.png',
      durationInFrames: 180,
    },

    // 16 — Section break: Models (2:03 → 2:05)
    // VO: "In terms of models..."
    {
      layout: 'big-statement',
      text: 'The Models',
      animation: 'fade',
      durationInFrames: 60,
    },

    // 17 — Gemini 3 Family (2:05 → 2:24)
    // VO: "Google's current Gemini lineup includes Gemini 3.6 Flash for fast,
    //      capable everyday work and Gemini 3.1 Pro for more demanding reasoning,
    //      coding and multimodal tasks. In the interface: Flash, Thinking, Pro."
    {
      layout: 'label-title-body',
      label: 'Latest',
      title: 'Gemini 3 Family',
      body: [
        'Gemini 3.6 Flash: fast, capable everyday work',
        'Gemini 3.1 Pro: demanding reasoning, coding, and multimodal',
        'In the interface: Flash, Thinking, and Pro tiers',
      ],
      bodyTimings: [50, 185, 330],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'star', 'squares-2x2'],
      durationInFrames: 580,
    },

    // 18 — Section break: Pricing (2:24 → 2:26)
    {
      layout: 'big-statement',
      text: 'Plans & Pricing',
      animation: 'fade',
      durationInFrames: 60,
    },

    // 19 — Individual Paid Plans (2:26 → 2:53)
    // VO: "For individuals, Google offers three pay tiers.
    //      AI Plus at $8/month, AI Pro at $20/month, AI Ultra at $100/month."
    {
      layout: 'label-title-body',
      label: 'Individual',
      title: 'Paid Plans',
      body: [
        'AI Plus: $8/month — broader access to Gemini features',
        'AI Pro: $20/month — full experience + long document processing',
        'AI Ultra: $100/month — built for developers and power users',
      ],
      bodyTimings: [123, 271, 661],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['credit-card', 'star', 'rocket-launch'],
      durationInFrames: 795,
    },

    // 20 — Workspace Plans (2:53 → 3:45)
    // VO: "For organizations already on Google Workspace, Gemini is bundled into
    //      the standard plans. Business Starter $7, Standard $14, Plus $22.
    //      What your team gets depends on what your IT admin has turned on."
    {
      layout: 'label-title-body',
      label: 'Organization',
      title: 'Workspace Plans',
      body: [
        'Business Starter: $7/user/month — Gemini in Gmail',
        'Business Standard: $14/month — full Gemini across all Workspace apps',
        'Business Plus: $22/month — adds enhanced security',
        'Admin note: what your team gets depends on IT admin settings',
      ],
      bodyTimings: [230, 415, 619, 758],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['building-office', 'briefcase', 'building-office-2', 'exclamation-triangle'],
      bodyCardAccents: [false, false, false, true],
      bodyCardCompact: true,
      durationInFrames: 950,
    },

    // 21 — Section break: Privacy (3:45 → 3:47)
    // VO: "Regarding data and privacy..."
    {
      layout: 'big-statement',
      text: 'Privacy & Data',
      animation: 'fade',
      durationInFrames: 60,
    },

    // 22 — Consumer privacy (3:47 → 3:53)
    // VO: "you can manage Gemini apps activity and choose whether your
    //      interactions help improve Google AI."
    {
      layout: 'label-title-body',
      label: 'Consumer',
      title: 'Privacy Controls',
      body: [
        'Manage Gemini Apps Activity and data usage choices',
        'Optional: help improve Google AI or keep usage private',
      ],
      bodyTimings: [0, 80],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['shield-check', 'adjustments-horizontal'],
      durationInFrames: 195,
    },

    // 23 — Enterprise privacy (3:53 → 4:00)
    // VO: "For Google Workspace customers, submissions aren't used to train models
    //      and remain within Workspace Enterprise Security and admin controls."
    {
      layout: 'label-title-body',
      label: 'Enterprise',
      title: 'Workspace Protection',
      body: [
        'Submissions not used for training, not reviewed by humans',
        'Covered by Workspace enterprise security and admin controls',
      ],
      bodyTimings: [53, 115],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['lock-closed', 'building-office-2'],
      durationInFrames: 200,
    },

    // 24 — Closing (4:00 → 4:09)
    // VO: "Gemini's real leverage is context proximity. It helps your team move
    //      faster inside the work, but you still own the judgment."
    {
      layout: 'centered-quote',
      text: "Gemini's real leverage is context proximity — your team moves faster, but you own the judgment.",
      durationInFrames: 270,
    },
  ],
};
