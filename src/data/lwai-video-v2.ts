import { VideoData } from '../scenes/types';

// LwaiVideo v2 - ChatGPT overview script rewrite (2026-07-30)
// Audio: audio/lwai-video-v2.mp3 - raw VO (Daan_converted_from_LucanRook), 284.21s, no silence pad.
// Whisper word-level timestamps extracted to /tmp/lwaivideo_v2_whisper.json (ElevenLabs Scribe v2).
//
// Title card (90 frames = 3.0s) overlaps VO 0.00-3.00s (VO already speaking the hook opening).
// Every scene after it is timed directly against absolute VO timestamps: comp frame = cumulative
// sum of each scene's (nextVOStart - thisVOStart) * 30, per the pattern documented in
// [[feedback_timing_workflow]] / project_chatgpt_in_sheet.
//
//  scene                                | VO start  | dur (frames @30fps)
//  --------------------------------------|-----------|--------------------
//  1  title-card-green                   |   0.00    |    90
//  2  label-title-body (hook)            |   3.00*   |   297
//  3  label-title-body (billion users)   |  12.90    |   236
//  4  big-statement (key features)       |  20.78    |    71
//  5  label-title-body (search+DR)       |  23.16    |   265
//  6  label-title-body (voice)           |  32.00    |   574
//  7  label-title-body (image gen)       |  51.12    |   274
//  8  label-title-body (projects+GPTs)   |  60.27    |   329
//  9  label-title-body (apps+skills)     |  71.24    |   967
// 10  label-title-body (chatgpt work)    | 103.48    |   661
// 11  label-title-body (codex)           | 125.52    |   256
// 12  label-title-body (unified desktop) | 134.04    |   310
// 13  big-statement (so what powers)     | 144.40    |    92
// 14  label-title-body (levels, zoom)    | 147.48    |   477
// 15  label-title-body (gpt-5.5 instant) | 163.36    |   325
// 16  label-title-body (5.6 family)      | 174.18    |   546
// 17  centered-quote (sol primary)       | 192.38    |   242
// 18  label-title-body (privacy)         | 200.46    |   497
// 19  centered-quote (caution)           | 217.04    |   298
// 20  big-statement (let's look at plans)| 226.98    |    80
// 21  label-title-body (individual plans, zoom: Free/Go/Plus/Pro) | 229.66 | 1139
// 22  label-title-body (biz & enterprise, zoom) | 267.64 |   557 (runs to audio end, 284.21s)
//                                                       total  8583
// *title card visually holds until frame 90 while VO's first 3s already play the hook opening.

export const lwaiVideoV2: VideoData = {
  audioSrc: 'audio/lwai-video-v2.mp3',
  audioInserts: [
    // Pause main VO at the end of scene 17 (frame 6012) to play the GPT-6 Astra
    // news-update clip, then resume main VO with no drift (nothing skipped).
    { cutFrame: 6012, resumeFrame: 6507, src: 'audio/gpt6-astra.mp3' },
    // Scene 22 (Individual Plans): replace the Free/Go/Plus portion of the
    // original VO (frames 7382 -> 8206, i.e. up to 0:04:33.16 in this timeline)
    // with the updated chatgpt-pricing-free-go.mp3 clip (20.14s = 605 frames).
    // skipFrames discards that original narration outright rather than pausing
    // it — main VO resumes at frame 7987 already past that passage, picking
    // back up on the untouched "Pro" narration tail.
    {
      cutFrame: 7382,
      resumeFrame: 7987,
      src: 'audio/chatgpt-pricing-free-go.mp3',
      skipFrames: 8206 - 7382, // 824: discard the original Free/Go/Plus narration entirely
    },
  ],
  scenes: [
    // 1 - Title card (0:00 -> 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT',
      label: 'SELECTING LLMS',
      durationInFrames: 90,
    },

    // 2 - Hook (VO 0.00 -> 12.90, scene visible from 3.00)
    // VO: "ChatGPT is no longer just the AI chatbot everyone has heard of. It is
    //      becoming the operating system for how leaders write, research, analyse,
    //      automate, and get work done."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'More Than a Chatbot',
      body: [
        'No longer just an AI chatbot',
        'The operating system for how leaders write, research, analyse, automate, and get work done',
      ],
      bodyTimings: [0, 51],
      durationInFrames: 297,
    },

    // 3 - Billion users (12.90 -> 20.78)
    // VO: "With around a billion weekly users, OpenAI's flagship assistant combines
    //      powerful models with a growing set of capabilities."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: '~1 Billion Weekly Users',
      body: ['Powerful models', 'A growing set of capabilities'],
      bodyTimings: [0, 90],
      durationInFrames: 236,
    },

    // 4 - Transition (20.78 -> 23.16)
    // VO: "Let's start with the key features."
    {
      layout: 'big-statement',
      text: "Let's start with\nthe key features.",
      size: 'title',
      animation: 'fade',
      durationInFrames: 71,
    },

    // 5 - Search & Deep Research (23.16 -> 32.00)
    // VO: "Search retrieves live information from the web, while Deep Research
    //      synthesises many sources into a structured, cited report."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Search & Deep Research',
      body: [
        'Search retrieves live information from the web',
        'Deep Research synthesises many sources into a structured, cited report',
      ],
      bodyTimings: [0, 86],
      images: ['images/lwai-video-v2/search.webp', 'images/lwai-video-v2/deep-research-menu.webp'],
      imageTimings: [0, 86],
      durationInFrames: 265,
    },

    // 6 - Voice (32.00 -> 51.12)
    // VO: "Voice lets you speak naturally with ChatGPT. Powered by the new GPT Live
    //      voice model, it can listen and respond in real time, use Search and
    //      Memory, and work with text and images. Paid plans also add live video
    //      and screen sharing on mobile."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Voice',
      body: [
        'Speak naturally, powered by the new GPT-Live voice model',
        'Listens and responds in real time, uses Search and Memory, works with text and images',
        'Paid plans add live video and screen sharing on mobile',
      ],
      bodyTimings: [0, 108, 429],
      images: ['images/lwai-video-v2/gpt-live-hero.png', 'images/lwai-video-v2/voice-howto.png'],
      imageTimings: [0, 429],
      durationInFrames: 574,
    },

    // 7 - Image generation (51.12 -> 60.27)
    // VO: "Image generation creates mock-ups, diagrams, posters, and other visual
    //      assets with strong text rendering and instruction following."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Image Generation',
      body: [
        'Mock-ups, diagrams, posters, and other visual assets',
        'Strong text rendering and instruction following',
      ],
      bodyTimings: [0, 130],
      images: ['images/lwai-video-v2/imagegen-poster.webp', 'images/lwai-video-v2/imagegen-precision.webp'],
      imageTimings: [0, 130],
      durationInFrames: 274,
    },

    // 8 - Projects & Custom GPTs (60.27 -> 71.24)
    // VO: "Projects organize chats, files, and instructions around ongoing work,
    //      while custom GPTs let you build reusable assistants for specific tasks."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Projects & Custom GPTs',
      body: [
        'Projects organise chats, files and instructions around ongoing work',
        'Custom GPTs let you build reusable assistants for specific tasks',
      ],
      bodyTimings: [0, 150],
      images: ['images/lwai-video-v2/projects.png', 'images/lwai-video-v2/custom-gpts.png'],
      imageTimings: [0, 150],
      durationInFrames: 329,
    },

    // 9 - Apps & Skills (71.24 -> 103.48)
    // VO: "ChatGPT also supports reusable capabilities through apps and skills.
    //      Apps connect services such as Google Drive, Microsoft 365, Slack, and
    //      GitHub, allowing ChatGPT to work with your existing business
    //      information, subject to your permissions. Skills package instructions,
    //      resources, examples, and code into reusable workflows that ChatGPT can
    //      apply when relevant. Their availability depends on your plan and
    //      workspace settings."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Apps & Skills',
      body: [
        'Apps connect Google Drive, Microsoft 365, Slack and GitHub, subject to your permissions',
        'Skills package instructions, resources and code into reusable workflows',
        'Availability depends on your plan and workspace settings',
      ],
      bodyTimings: [0, 557, 690],
      images: ['images/lwai-video-v2/apps-hero.png', 'images/lwai-video-v2/skills.png'],
      imageTimings: [0, 557],
      durationInFrames: 967,
    },

    // 10 - ChatGPT Work (103.48 -> 125.52)
    // VO: "For larger tasks, ChatGPT Work can research, analyze information, work
    //      across connected apps and files, and produce finished documents,
    //      spreadsheets, presentations, reports, and sites. You can monitor its
    //      progress, answer questions, redirect it, and approve important actions
    //      along the way."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'ChatGPT Work',
      body: [
        'Research, analyse and work across connected apps and files',
        'Produces finished documents, spreadsheets, presentations, reports and Sites',
        'Monitor, redirect and approve important actions along the way',
      ],
      bodyTimings: [0, 180, 380],
      image: 'images/lwai-video-v2/desktop-work.webp',
      durationInFrames: 661,
    },

    // 11 - Codex (125.52 -> 134.04)
    // VO: "For software development, Codex provides a dedicated workspace for
    //      writing, reviewing, debugging, and shipping code."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Codex',
      body: ['A dedicated workspace for writing, reviewing, debugging and shipping code'],
      image: 'images/lwai-video-v2/desktop-code.webp',
      durationInFrames: 256,
    },

    // 12 - Unified desktop app (134.04 -> 144.40)
    // VO: "On desktop, ChatGPT brings Chat, Work, and Codex into a more unified
    //      experience while keeping Codex as its own workspace."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'One Unified Desktop App',
      body: [
        'Chat, Work and Codex brought together',
        'Codex stays its own dedicated workspace',
      ],
      bodyTimings: [0, 90],
      image: 'images/lwai-video-v2/desktop-chat.webp',
      durationInFrames: 310,
    },

    // 13 - Transition to models (144.40 -> 147.48)
    // VO: "So what powers all these capabilities?"
    {
      layout: 'big-statement',
      text: 'So what powers\nall these capabilities?',
      size: 'title',
      animation: 'fade',
      durationInFrames: 92,
    },

    // 14 - Speed & reasoning levels (147.48 -> 163.36)
    // VO: "ChatGPT is designed around different levels of speed and reasoning,
    //      including instant, medium, high, extra high, and pro. The exact
    //      options depend on your plan, workspace settings, and rollout status."
    // Zooms down the model picker as each level is named: Instant @+158f,
    // Medium @+184f, High @+209f, Extra High @+236f, Pro @+273f.
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Speed & Reasoning Levels',
      body: [
        'Instant, Medium, High, Extra High and Pro',
        'Depends on your plan, workspace settings and rollout status',
      ],
      bodyTimings: [0, 307],
      image: 'images/lwai-video-v2/model-picker-levels.png',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 158, centerX: 0.4, centerY: 0.31, scale: 2.0 },
        { startFrame: 184, centerX: 0.4, centerY: 0.39, scale: 2.0 },
        { startFrame: 209, centerX: 0.4, centerY: 0.48, scale: 2.0 },
        { startFrame: 236, centerX: 0.4, centerY: 0.57, scale: 2.0 },
        { startFrame: 273, centerX: 0.4, centerY: 0.65, scale: 2.0 },
      ],
      durationInFrames: 477,
    },

    // 15 - GPT-5.5 Instant (163.36 -> 174.18)
    // VO: "GPT 5.5 Instant is the fast everyday model for writing, brainstorming,
    //      summarizing, image analysis, and most routine work."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-5.5 Instant',
      body: ['Fast, everyday model', 'Writing, brainstorming, summarising, image analysis, routine work'],
      bodyTimings: [0, 100],
      image: 'images/gpt-5-5-instant.jpg',
      durationInFrames: 325,
    },

    // 16 - GPT-5.6 family: Sol, Terra, Luna (174.18 -> 192.38)
    // VO: "For more demanding tasks, ChatGPT uses the GPT 5.6 family. This
    //      includes Sol, OpenAI's flagship reasoning model, together with Terra,
    //      which balances speed and capability, and Luna, the fastest and most
    //      efficient option."
    // Zooms into each card as its name is spoken: Sol @+206f, Terra @+323f, Luna @+429f
    {
      layout: 'label-title-body',
      label: 'GPT-5.6 Family',
      title: 'Sol, Terra & Luna',
      body: [
        'Sol: flagship reasoning model',
        'Terra: balances speed and capability',
        'Luna: fastest, most efficient option',
      ],
      image: 'images/sol-terra-luna-cards.jpg',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 206, centerX: 0.17, centerY: 0.42, scale: 2.6 },
        { startFrame: 323, centerX: 0.5, centerY: 0.42, scale: 2.6 },
        { startFrame: 429, centerX: 0.83, centerY: 0.42, scale: 2.6 },
      ],
      durationInFrames: 546,
    },

    // 17 - Sol is the primary model (192.38 -> 200.46)
    {
      layout: 'centered-quote',
      text: "In standard ChatGPT conversations, GPT-5.6 Sol is the primary model you'll use.",
      durationInFrames: 242,
    },

    // 17b - GPT-6 Astra news update (composition frame 6012 -> 6507)
    // Separate insert clip: audio/gpt6-astra.mp3 (16.48s, no silence pad), main VO is
    // paused via audioCutFrame/audioResumeFrame in lwaiVideoV2 below and resumes exactly
    // where it left off. Not counted in the original VO timing table above.
    // VO: "OpenAI also launched GPT-6 Astra, its next-generation successor to GPT-5.6,
    //      with major gains in coding, computer use, and professional work. It's now
    //      rolling out in ChatGPT Work and Codex."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-6 Astra',
      body: [
        'Next-generation successor to GPT-5.6',
        'Major gains in coding, computer use, and professional work',
        'Rolling out in ChatGPT Work and Codex',
      ],
      bodyTimings: [0, 239, 379],
      image: 'images/gpt6-astra-terminal-bench-chart.svg',
      durationInFrames: 495,
    },

    // 18 - Privacy & data use (200.46 -> 217.04)
    // VO: "And for privacy, on personal plans, you can manage training and
    //      data-sharing preferences in settings. For Business, Enterprise, and
    //      Education, OpenAI states that organizational data is not used to
    //      train its models by default."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Privacy & Data Use',
      body: [
        'Personal plans: manage training and data-sharing preferences in Settings',
        'Business, Enterprise & Education: org data not used to train models by default',
      ],
      bodyTimings: [0, 212],
      durationInFrames: 497,
    },

    // 19 - Caution (217.04 -> 226.98)
    {
      layout: 'centered-quote',
      text: 'Avoid sharing sensitive information, connect only the apps you trust, and always verify important outputs.',
      durationInFrames: 298,
    },

    // 20 - Transition to plans (226.98 -> 229.66)
    {
      layout: 'big-statement',
      text: "Let's look at\nthe plans.",
      size: 'title',
      animation: 'fade',
      durationInFrames: 80,
    },

    // 21 - Individual plans: Free, Go, Plus, Pro (229.66 -> 246.07 in scene-local
    // time, then a replaced Free/Go/Plus passage, then the original Pro tail)
    // Frames 0->605 (0->20.14s): updated audio/chatgpt-pricing-free-go.mp3 clip.
    // VO: "Free includes GPT 5.6 Luna with limited usage, plus search, file
    //      uploads, data analysis, image generation, and GPTs. Go expands those
    //      limits, while Plus adds higher model limits, advanced reasoning,
    //      voice, deep research, custom GPTs, Codex, work mode, and many of
    //      ChatGPT's newest capabilities."
    // Frames 605->920: original VO tail resumes (skipped forward past the
    // replaced passage — see audioInserts above), picking up on:
    // VO: "Pro is designed for heavy users, offering substantially higher usage
    //      limits and full access to OpenAI's most advanced models and tools."
    // Pans across the updated pricing table as each plan is named: Free @+20f
    // (entry), Go @+272f, Plus @+317f, Pro @+605f (tail start).
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Individual Plans',
      body: ['Free', 'Go', 'Plus', 'Pro'],
      bodyTimings: [0, 272, 317, 605],
      image: 'images/lwai-video-v2/pricing-individual-v2.png',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 20, centerX: 0.15, centerY: 0.42, scale: 1.9 },
        { startFrame: 272, centerX: 0.37, centerY: 0.42, scale: 1.9 },
        { startFrame: 317, centerX: 0.6, centerY: 0.42, scale: 1.9 },
        { startFrame: 605, centerX: 0.82, centerY: 0.42, scale: 1.9 },
      ],
      durationInFrames: 920,
    },

    // 22 - Business & Enterprise (267.64 -> end, 284.21)
    // VO: "Business and Enterprise add shared workspaces, administration,
    //      stronger security and governance, company knowledge, shared projects,
    //      apps, and organizational permissions, making them the best fit for
    //      teams using ChatGPT at scale."
    // Pans from Business to Enterprise column partway through: Enterprise @+260f.
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Business & Enterprise',
      body: ['Business', 'Enterprise'],
      bodyTimings: [0, 260],
      image: 'images/lwai-video-v2/pricing-business-enterprise.png',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 20, centerX: 0.259, centerY: 0.52, scale: 1.6 },
        { startFrame: 260, centerX: 0.764, centerY: 0.52, scale: 1.6 },
      ],
      durationInFrames: 557,
    },
  ],
};
