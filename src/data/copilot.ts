import { VideoData } from '../scenes/types';

// Microsoft Copilot — Day 1 intro video
// Audio: audio/copilot.mp3 — VO ends at 314.22s
// Transcript extracted with Whisper (small model, word timestamps).
//
//  scene                                | VO start   | VO end    | dur (frames @30fps)
//  -------------------------------------|------------|-----------|--------------------
//  1  title card (silent intro)         |  0.00      |  3.26     |   98
//  2  what is copilot                   |  3.26      | 20.64     |  522
//  3  three modes (big statement)       | 20.64      | 27.10     |  194
//  4  mode 1: copilot chat              | 27.10      | 43.14     |  481
//  5  mode 2: copilot in m365           | 43.14      | 61.00     |  536
//  6  mode 3: copilot in teams          | 61.00      | 77.94     |  508
//  7  features intro (big statement)    | 77.94      | 84.72     |  203
//  8  feature: m365 apps                | 84.72      | 95.42     |  321
//  9  feature: copilot search           | 95.42      |100.32     |  147
// 10  feature: researcher agent         |100.32      |105.54     |  157
// 11  feature: analyst agent            |105.54      |111.66     |  184
// 12  feature: designer + clipchamp     |111.66      |119.32     |  230
// 13  feature: copilot pages            |119.32      |128.40     |  272
// 14  feature: voice & vision           |128.40      |137.78     |  281
// 15  feature: tasks                    |137.78      |143.28     |  165
// 16  feature: agent builder            |143.28      |152.18     |  267
// 17  feature: copilot studio           |152.18      |155.80     |  109
// 18  models: gpt lineup                |155.80      |177.20     |  642
// 19  models: claude + auto-routing     |177.20      |213.70     | 1095
// 20  privacy & security                |213.70      |245.04     |  940
// 21  plans & pricing                   |245.04      |293.10     | 1442
// 22  license warning                   |293.10      |314.22     |  634
//                                                       total       9427

export const copilot: VideoData = {
  audioSrc: 'audio/copilot-combined.mp3',
  scenes: [
    // 1 — Title card (silent 0:00 → 0:03.26)
    {
      layout: 'title-card-green',
      title: 'Microsoft Copilot',
      label: 'SELECTING LLMs',
      durationInFrames: 98,
    },

    // 2 — What is Copilot (0:03.26 → 0:20.64, 17.38s)
    // VO: "Microsoft Co-Pilot is Microsoft's AI assistant that knows your work natively.
    //      It is connected to the Microsoft Graph, which is a network of organizational data,
    //      which includes your email, your calendar, your Teams conversations,
    //      even SharePoint documents and meeting recordings."
    {
      layout: 'label-title-body',
      label: 'MICROSOFT COPILOT',
      title: 'The AI assistant that knows your work',
      body: [
        'An AI assistant built natively into the Microsoft ecosystem',
        'Connected to the Microsoft Graph: your email, calendar, Teams conversations, SharePoint documents, and meeting recordings',
      ],
      bodyTimings: [0, 185],
      image: 'images/copilot/graph-diagram.jpg',
      imageHeight: 580,
      imageZoom: { centerX: 0.5, scale: 1.2, startFrame: 60 },
      durationInFrames: 522,
    },

    // 3 — Three modes intro (0:20.64 → 0:27.10, 6.46s)
    // VO: "The simplest way to understand Co-Pilot is that it operates in three primary modes."
    {
      layout: 'big-statement',
      text: 'Three\nprimary modes',
      animation: 'fade',
      durationInFrames: 194,
    },

    // 4 — Mode 1: Copilot Chat (0:27.10 → 0:43.14, 16.04s)
    // VO: "The first one is Co-Pilot Chat. So this is a conversational assistant,
    //      and it works very similar to ChatGPT, but it can also search the web and then filter
    //      by your company data. You can use it for research, for synthesis,
    //      or for quick thinking between tasks."
    {
      layout: 'label-title-body',
      label: 'MODE 1',
      title: 'Copilot Chat',
      body: [
        'Conversational assistant, works like ChatGPT',
        'Can search the web and filter by your company data',
        'Use for research, synthesis, or quick thinking between tasks',
      ],
      bodyTimings: [67, 215, 324],
      durationInFrames: 481,
    },

    // 5 — Mode 2: Copilot in Microsoft 365 (0:43.14 → 1:01.00, 17.86s)
    // Avatar and logo hidden — image is the full focus.
    // VO: "Then there is Co-Pilot inside of Microsoft 365 apps.
    //      So think about Word, Excel, PowerPoint, and Outlook.
    //      Here it can help you write content, analyze data, create presentations,
    //      and prepare work without leaving the tool that you're already in."
    {
      layout: 'label-title-body',
      label: 'MODE 2',
      title: 'Copilot in Microsoft 365',
      body: [
        'Directly inside Word, Excel, PowerPoint, and Outlook',
        'Write content, analyze data, create presentations',
        'All without leaving the tool you are already in',
      ],
      bodyTimings: [161, 291, 419],
      image: 'images/copilot/m365-apps.jpg',
      imageHeight: 480,
      // Zoom in to crop the baked-in "MICROSOFT COPILOT" label, avatar, and Lead with AI logo
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.50, scale: 1.45 },
      ],
      durationInFrames: 536,
    },

    // 6 — Mode 3: Copilot in Teams (1:01.00 → 1:17.94, 16.94s)
    // VO: "And then there's Co-Pilot in Teams. So for anyone in back-to-back meetings,
    //      this is often where you feel the benefit the most. You get automatic meeting summaries,
    //      follow-up drafts, and scheduling support without touching a single note,
    //      and that really feels like a real-life Jarvis."
    {
      layout: 'label-title-body',
      label: 'MODE 3',
      title: 'Copilot in Teams',
      body: [
        'Automatic meeting summaries after every call',
        'Follow-up drafts and scheduling support without touching a single note',
        'Like having a real-life JARVIS',
      ],
      bodyTimings: [238, 304, 444],
      image: 'images/copilot/teams-new.png',
      imageHeight: 480,
      durationInFrames: 508,
    },

    // 7 — Features intro (1:17.94 → 1:24.72, 6.78s)
    // VO: "Now, in terms of features, Co-Pilot does sometimes get a bad rep,
    //      but it really does pack a ton of features."
    {
      layout: 'big-statement',
      text: 'Copilot packs\na ton of features',
      animation: 'fade',
      durationInFrames: 203,
    },

    // 8 — Feature: M365 Apps (1:24.72 → 1:35.42, 10.70s)
    // VO: "So we already talked about how Co-Pilot is available directly in Word, Excel,
    //      PowerPoint, Outlook, and Teams, and it's getting better and better in those apps."
    {
      layout: 'label-title-body',
      label: 'KEY FEATURES',
      title: 'Available in Microsoft 365',
      body: ['Word, Excel, PowerPoint, Outlook, and Teams, getting better in all of them'],
      image: 'images/copilot/m365-apps-icons.jpg',
      imageHeight: 540,
      durationInFrames: 321,
    },

    // 9 — Feature: Copilot Search (1:35.42 → 1:40.32, 4.90s)
    // VO: "Then there's, as we said, Co-Pilot Search,"
    {
      layout: 'label-title-body',
      label: 'KEY FEATURES',
      title: 'Copilot Search',
      body: ['Live web search with an option to focus on your company data only'],
      image: 'images/copilot/search.jpg',
      imageHeight: 540,
      durationInFrames: 147,
    },

    // 10 — Feature: Researcher Agent (1:40.32 → 1:45.54, 5.22s)
    // VO: "but it also has a dedicated researcher agent which can browse hundreds of sources
    //      to give you a rich, cited report."
    {
      layout: 'label-title-body',
      label: 'KEY FEATURES',
      title: 'Researcher Agent',
      body: ['Browses hundreds of sources to give you a rich, cited report'],
      image: 'images/copilot/researcher.jpg',
      imageHeight: 540,
      durationInFrames: 157,
    },

    // 11 — Feature: Analyst Agent (1:45.54 → 1:51.66, 6.12s)
    // VO: "There's an analyst agent that processes and analyzes and visualizes very complex data."
    {
      layout: 'label-title-body',
      label: 'KEY FEATURES',
      title: 'Analyst Agent',
      body: ['Processes, analyzes, and visualizes complex data'],
      image: 'images/copilot/analyst.jpg',
      imageHeight: 540,
      durationInFrames: 184,
    },

    // 12 — Feature: Designer + Clipchamp (1:51.66 → 1:59.32, 7.66s)
    // VO: "There is a designer for high-quality visuals, and then with the other app called
    //      ClipChamp, you can even edit those into short videos."
    {
      layout: 'label-title-body',
      label: 'KEY FEATURES',
      title: 'Designer + Clipchamp',
      body: ['High-quality visuals with Designer, then edit them into short videos with Clipchamp'],
      image: 'images/copilot/designer-clipchamp.jpg',
      imageHeight: 540,
      durationInFrames: 230,
    },

    // 13 — Feature: Copilot Pages (1:59.32 → 2:08.40, 9.08s)
    // VO: "There's Co-Pilot Pages, which is a persistent, editable workspace that turns any
    //      Co-Pilot output into collaborative content,"
    {
      layout: 'label-title-body',
      label: 'MORE FEATURES',
      title: 'Copilot Pages',
      body: ['Persistent, editable workspace that turns any Copilot output into collaborative content'],
      image: 'images/copilot/pages.jpg',
      imageHeight: 540,
      durationInFrames: 272,
    },

    // 14 — Feature: Voice & Vision (2:08.40 → 2:17.78, 9.38s)
    // VO: "and there's Voice and Vision, so it can use Voice, and it can also see via
    //      screen-sharing or via your camera feed on certain devices."
    {
      layout: 'label-title-body',
      label: 'MORE FEATURES',
      title: 'Voice and Vision',
      body: ['Copilot can hear you and see via screen sharing or your camera feed on certain devices'],
      image: 'images/copilot/voice-vision.jpg',
      imageHeight: 540,
      durationInFrames: 281,
    },

    // 15 — Feature: Tasks (2:17.78 → 2:23.28, 5.50s)
    // VO: "There is Tasks, which means that it can run multi-step jobs in the background"
    {
      layout: 'label-title-body',
      label: 'MORE FEATURES',
      title: 'Tasks',
      body: ['Runs multi-step jobs in the background, no babysitting required'],
      image: 'images/copilot/tasks.jpg',
      imageHeight: 540,
      durationInFrames: 165,
    },

    // 16 — Feature: Agent Builder (2:23.28 → 2:32.18, 8.90s)
    // VO: "and a more complex agent builder where you can connect external systems and publish
    //      custom agents directly into your MS 365 environment,"
    {
      layout: 'label-title-body',
      label: 'MORE FEATURES',
      title: 'Agent Builder',
      body: ['Connect external systems and publish custom agents directly into your M365 environment'],
      image: 'images/copilot/agent-builder.jpg',
      imageHeight: 540,
      durationInFrames: 267,
    },

    // 17 — Feature: Copilot Studio (2:32.18 → 2:35.80, 3.62s)
    // VO: "and for admins, there's even a more advanced Co-Pilot Studio."
    {
      layout: 'label-title-body',
      label: 'MORE FEATURES',
      title: 'Copilot Studio',
      body: ['For admins: agent management, multi-agent orchestration, and advanced governance'],
      image: 'images/copilot/studio.jpg',
      imageHeight: 540,
      durationInFrames: 139,
    },

    // 18 — Feature: Copilot Cowork (2:36.25 → 2:52.58, 16.35s)
    // VO: "Finally, Microsoft has introduced Copilot Cowork, enabling Copilot to function as an
    //      agentic assistant: you describe the desired outcome, and it carries out tasks across
    //      Microsoft 365 while transparently showing its steps and requesting approval when necessary."
    {
      layout: 'label-title-body',
      label: 'NEW FEATURE',
      title: 'Copilot Cowork',
      body: [
        'Copilot acts as an agentic assistant — describe the outcome, it handles the execution',
        'Carries out tasks across Microsoft 365 apps autonomously',
        'Transparently shows its steps and requests approval when necessary',
      ],
      bodyTimings: [0, 270, 375],
      image: 'images/copilot/cowork.jpg',
      imageHeight: 480,
      durationInFrames: 491,
    },

    // ── Models section — new VO spliced in (dumping/Copilot-models.wav, 109.12s) ──
    // Audio: 2:53.05 → 3:50.21 of the original replaced with the new WAV starting at 2:53.05.
    // Transcript: src/data/copilot-models.transcript.json (t = seconds into the WAV).
    // Section starts at comp frame 5196 (t = 0.15); scene boundaries in t:
    //   19a picker 0.15 · 19b families 18.4 · 19c GPT 43.6 · 19d Claude 72.3 · 19e takeaway 93.5 → 283.06 (privacy)
    // Cues = word onset − 8 frames (FadeText lead).

    // 19a — Model picker (t 0.15 → 18.40)
    // VO: "Now, when you open up Microsoft Copilot, Auto is the default model, but Copilot also has
    //      a model picker that lets you switch between different underlying models. So in other words,
    //      using Copilot doesn't always mean working with the same AI model."
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Copilot has a model picker',
      body: [
        'Auto is the default model',
        'Switch between different underlying models',
        'Using Copilot does not always mean the same AI model',
      ],
      bodyTimings: [113, 265, 406], // Auto 4.18 · switch 9.26 · using 13.94
      image: 'images/copilot/model-picker.svg',
      imageHeight: 760,
      durationInFrames: 548,
    },

    // 19b — Two model families (t 18.40 → 43.60)
    // VO: "Now, some of these models come from OpenAI, which is the company behind ChatGPT, and others
    //      come from Anthropic, which is the company behind Claude... Then exactly which one you see
    //      really depends on your organization's license, settings, and also Microsoft's rollout schedule."
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Models from OpenAI and Anthropic',
      body: [
        'OpenAI, the company behind ChatGPT',
        'Anthropic, the company behind Claude',
        'What you see depends on your license, settings, and Microsoft rollout',
      ],
      bodyTimings: [39, 162, 485], // OpenAI 19.98 · Anthropic 24.08 · exactly 34.84
      image: 'images/copilot/model-picker.svg',
      imageHeight: 760,
      durationInFrames: 756,
    },

    // 19c — GPT models (t 43.60 → 72.30)
    // VO: "Most likely, what you'll see is GPT 5.6 Quick Response, which is available across Copilot Chat
    //      and Microsoft 365 apps... Copilot can show you more than one GPT generation at once...
    //      You could also see GPT 6, which is a newer OpenAI model... rollout... in September 2026"
    {
      layout: 'label-title-body',
      label: 'OPENAI MODELS',
      title: 'GPT in Copilot',
      body: [
        'GPT-5.6 Quick Response: across Copilot Chat, Word, Excel, and PowerPoint',
        'More than one GPT generation can appear at once',
        'GPT-6: the newer OpenAI model, rolling out from September 2026',
      ],
      bodyTimings: [45, 374, 563], // GPT 45.38 · more 56.34 · GPT 6 62.64
      image: 'images/copilot/models-gpt-picker.svg',
      // Move the highlight box to GPT 6.0 Sol on "You could also see GPT 6" (62.64)
      imageSwaps: [{ from: 567, src: 'images/copilot/models-gpt-picker-gpt6.svg' }],
      imageHeight: 760,
      durationInFrames: 861,
    },

    // 19d — Claude models (t 72.30 → 93.50)
    // VO: "...and then Claude Opus 5.5, which is a newer Anthropic model joining Copilot in that same rollout.
    //      Anthropic reports improvements in knowledge work and writing over the previous Opus version,
    //      and if your organization has enabled those Anthropic models, Opus 5.5 may become another option
    //      alongside OpenAI's models."
    {
      layout: 'label-title-body',
      label: 'ANTHROPIC MODELS',
      title: 'Claude in Copilot',
      body: [
        'Claude Opus 5.5 joins Copilot in the same rollout',
        'Improvements in knowledge work and writing over the previous Opus',
        'If your org enables Anthropic models, Opus sits alongside OpenAI',
      ],
      bodyTimings: [47, 233, 437], // Claude 74.12 · Anthropic 80.32 · enabled 87.14
      image: 'images/copilot/models-claude-picker.svg',
      // Move the highlight box from Sonnet to Opus on "Claude Opus 5.5" (Opus 74.38)
      imageSwaps: [{ from: 58, src: 'images/copilot/models-claude-picker-opus.svg' }],
      imageHeight: 760,
      durationInFrames: 636,
    },

    // 19e — Takeaway (t 93.50 → 110.00, ends where the original privacy scene resumed)
    // VO: "Now, you don't need to remember every model name or version number, because they will change.
    //      But the important shift here is that Copilot can bring together several leading models into
    //      the same work environment and that the model picker shows you which choices are available to you."
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Names change, the picker stays',
      body: [
        'No need to remember every model name or version',
        'Copilot brings several leading models into one work environment',
        'The model picker shows which choices are available to you',
      ],
      bodyTimings: [21, 204, 356], // remember 94.48 · bring 100.58 · picker 105.64
      image: 'images/copilot/model-picker.svg',
      imageHeight: 760,
      durationInFrames: 495,
    },

    // 20 — Privacy & security (3:33.70 → 4:05.04, 31.34s)
    // VO: "Now, Co-Pilot is very strong on data privacy and enterprise security.
    //      It respects all of the existing permissions...
    //      data is not used to train the model...
    //      why so many organizations choose Co-Pilot as the safe AI option."
    {
      layout: 'label-title-body',
      label: 'PRIVACY & SECURITY',
      title: 'Enterprise-grade data protection',
      body: [
        'Respects existing permissions: users only see content they are already authorized to access',
        'Customer data is not used to train the foundation models',
        'Tenant isolation applies, many orgs choose Copilot as their safe AI option',
      ],
      bodyTimings: [202, 460, 682],
      durationInFrames: 940,
    },

    // 21 — Plans & pricing (4:05.04 → 4:53.10, 48.06s)
    // VO: free, Personal $10/mo, Business $21 ($18 discounted), Enterprise $30/user/mo
    {
      layout: 'label-title-body',
      label: 'PLANS & PRICING',
      title: 'Choose the right tier',
      body: [
        'Free: Copilot Chat only, grounded in public web data',
        'Microsoft 365 Personal, $10/month: Copilot in Word, Excel, PowerPoint, Outlook',
        'Microsoft 365 Business (under 300 users), $21/user/mo, discounted to $18 on annual',
        'Microsoft 365 Enterprise, $30/user/mo with governance and compliance controls',
      ],
      bodyTimings: [97, 268, 609, 1126],
      bodyRight: true,
      durationInFrames: 1442,
    },

    // 22 — License warning (4:53.10 → 5:14.22, 21.12s)
    // VO: "even if your team is signed in with a work account, you only get the full Co-Pilot
    //      experience if your IT administrator has assigned you a Co-Pilot license.
    //      And without that, Co-Pilot has no app integration, no organizational context..."
    {
      layout: 'label-title-body',
      label: 'IMPORTANT',
      title: 'You need a Copilot license',
      body: [
        'Even with a work account, you only get full Copilot if IT has assigned you a license',
        'Without it: no app integration, no organizational context',
        'Without a license, it is equivalent to the free Copilot account',
      ],
      bodyTimings: [67, 387, 533],
      // +50f so the video runs to the end of the audio (385.27s) instead of stopping 1.3s after the last word
      durationInFrames: 684,
    },
  ],
};
