import { VideoData } from '../scenes/types';

// ChatGPT in PowerPoint — Tutorial / demo video
// Audio: audio/chatgpt-in-powerpoint.mp3 (~267.76s)
// Video: video/chatgpt-in-powerpoint.mp4 (1920x1080 screen recording)
//
//  scene                                   | VO start | VO end | dur (f@30)
//  ----------------------------------------|----------|--------|------------
//  1  title card                            |  0.00    |  1.43  |   43
//  2  hook                                  |  1.43    | 23.63  |  666
//  3  capabilities                          | 23.63    | 53.33  |  891
//  4  setup / install                       | 53.33    | 85.67  |  970
//  5  open sidebar                          | 85.67    | 95.40  |  292
//  6  step 1 — paste prompt                 | 95.40    |124.97  |  887
//  7  step 2 — review storyline             |124.97    |142.37  |  522
//  8  step 3 — refine flow                  |142.37    |168.60  |  787
//  9  step 4 — tighten slide titles         |168.60    |192.33  |  712
// 10  step 5 — add slides                   |192.33    |206.53  |  426
// 11  verify outputs                        |206.53    |239.13  |  978
// 12  big-statement closing                 |239.13    |242.80  |  110
// 13  availability & notes                  |242.80    |267.83  |  751
//                                                    total      8035

export const chatGPTInPowerPoint: VideoData = {
  audioSrc: 'audio/chatgpt-in-powerpoint.mp3',
  clipSrc: 'video/chatgpt-in-powerpoint.mp4',
  avatarSrc: 'video/chatgpt-in-powerpoint-avatar.mp4',
  scenes: [
    // 1 — Title card (0:00 → 0:01.43)
    {
      layout: 'title-card-green',
      title: 'ChatGPT in PowerPoint',
      label: 'PRESENTATION ASSISTANTS',
      durationInFrames: 43,
    },

    // 2 — Hook (1.43 → 23.63)
    // VO: "With ChatGPT for PowerPoint, you can quickly turn what's on your mind
    //      into organized, editable slides. It's an add-in that sits directly
    //      in PowerPoint — currently in beta — and lets you create, edit, and
    //      polish presentations without leaving the deck."
    {
      layout: 'label-title-body',
      label: 'CHATGPT IN POWERPOINT',
      title: 'Turn ideas into organized,\neditable slides',
      body: [
        'An add-in that sits directly in PowerPoint',
        'Currently in beta',
        'Create, edit, and polish without leaving the deck',
      ],
      bodyTimings: [287, 437, 527],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 666,
    },

    // 3 — Capabilities (23.63 → 53.33)
    // VO: lists what it can do — drafts from prompt/reference, edit & polish,
    //      summarize, refine storyline, keeps slides editable.
    {
      layout: 'label-title-body',
      label: 'WHAT IT CAN DO',
      title: 'A working partner inside\nyour presentation',
      body: [
        'Draft new presentations from a prompt or reference material',
        'Edit and polish existing slides with natural language',
        'Summarize and explain the content of a deck',
        'Refine storyline, structure, and executive messaging',
      ],
      bodyTimings: [101, 281, 491, 611],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 891,
    },

    // 4 — Setup / install (53.33 → 85.67)
    // VO: "There are a few ways to use ChatGPT in PowerPoint. On the web or
    //      desktop app, open your presentation, go to Home > Add-ins and
    //      search for ChatGPT. In an organization, your admin may have already
    //      deployed it — otherwise, ask them to. You'll then see ChatGPT under
    //      the ribbon or behind the three-dot menu."
    {
      layout: 'label-title-body',
      label: 'SETUP',
      title: 'Install the ChatGPT add-in',
      body: [
        'Web or desktop: Home > Add-ins > search "ChatGPT"',
        'In an organization: admin deploys it for you',
        'Find it under the ribbon or the three-dot menu',
      ],
      bodyTimings: [380, 500, 680],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 970,
    },

    // 5 — Open sidebar (85.67 → 95.40)
    // VO: "Either way, once installed and opened, you click the ChatGPT logo
    //      and the sidebar will open."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 85.67,
      avatarPosition: 'bottom-left',
      durationInFrames: 292,
    },

    // 6 — Step 1: Paste prompt (95.40 → 124.97)
    // VO: "Step by step — paste in your prompt. Something like: 'create a
    //      presentation for my leadership team about preparing for a world
    //      where AI disrupts our industry, using the outline in my reference
    //      file.' Attach the reference so the first draft is grounded in your
    //      actual thinking, not just what ChatGPT generates on the spot."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 95.40,
      avatarPosition: 'bottom-left',
      durationInFrames: 887,
    },

    // 7 — Step 2: Review storyline (124.97 → 142.37)
    // VO: "Before polishing individual slides, review the storyline. Does the
    //      deck open with a business risk? Does it move from disruption to
    //      decisions? Does it end with clear leadership actions?"
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 124.97,
      durationInFrames: 522,
    },

    // 8 — Step 3: Refine flow (142.37 → 168.60)
    // VO: "If the flow is too broad, refine it directly in the sidebar — 'reorder
    //      this deck so it leads with X and then explains Y.' ChatGPT updates
    //      the structure inside PowerPoint while keeping everything editable.
    //      It feels like instructing someone who is managing the PowerPoint."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 142.37,
      durationInFrames: 787,
    },

    // 9 — Step 4: Tighten slide titles (168.60 → 192.33)
    // VO: "Once the structure is there, refine and edit the slides. 'Across all
    //      the slides, tighten the titles so they read like conclusions.' This
    //      is where it becomes more than chat — instead of copying text back
    //      and forth, you ask for edits directly on the deck."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 168.60,
      durationInFrames: 712,
    },

    // 10 — Step 5: Add slides (192.33 → 206.53)
    // VO: "You can also add slides: 'add one more slide with key risks and
    //      mitigation actions before the final recommendation slide.' ChatGPT
    //      does that contextual to the rest of the presentation."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 192.33,
      durationInFrames: 426,
    },

    // 11 — Verify outputs (206.53 → 239.13)
    // VO: "Always verify AI outputs. Review the slides it changed — numbers,
    //      claims, examples, recommendations. Also scan the formatting:
    //      because the add-in is still in beta, complex templates, custom
    //      fonts, or advanced formatting may not be preserved perfectly.
    //      Run through it before you send."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 206.53,
      durationInFrames: 978,
    },

    // 12 — Big statement closing (239.13 → 242.80)
    // VO: "So that is ChatGPT for PowerPoint. A couple of practical notes."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-powerpoint.mp4',
      videoStartTime: 239.13,
      durationInFrames: 110,
    },

    // 13 — Availability & notes (242.80 → 267.83)
    // VO: "ChatGPT for PowerPoint is available globally on most ChatGPT plans,
    //      but for enterprise users it may still be gated by admin settings.
    //      It's a beta tool — it can be incomplete or inconsistent, so don't
    //      rely on it too much. As with all things AI, review every outcome."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY & NOTES',
      title: 'ChatGPT for PowerPoint',
      body: [
        'Available globally on most ChatGPT plans',
        'Enterprise: may be gated by admin settings',
        'Beta tool: can be incomplete or inconsistent',
        'As with all AI — review every outcome',
      ],
      bodyTimings: [36, 186, 396, 606],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 751,
    },
  ],
};
