import { VideoData } from '../scenes/types';

// Claude Instructions — Tutorial / demo video
// Audio: audio/claude-instructions.mp3 — raw narration extracted from source recording, 197.23s, no silence pad.
// Video: video/claude-instructions.mp4 — screen recording with embedded narration (same recording as audio), 1024x576.
// No avatar asset was provided for this video.
// Scenes aligned to whisper-extracted segment/word timestamps.
// Source demo footage only runs from t≈17.60s to t≈153.76s of the narration (where to find Instructions →
// Claude's response to the Singapore question) — the first ~18s and last ~43s of the recording are
// blank/white (presenter narrating before/after screen-sharing), replaced with graphic scenes instead of
// blank video, same convention as gemini-personal-intelligence / chatgpt-custom-instructions.
// Per user preference: video-clip scenes carry NO label/title/body overlay card — the demo plays as clean,
// uninterrupted screen recording. Exception: scenes 4b/4d show a brief "Desktop/web" / "Mobile" card
// during the where-to-find-it navigation (per explicit user request), before returning to card-free for
// filling in the single Instructions field, saving, testing in a fresh chat, and reviewing Claude's response.
//
//  scene                                                | start (s) | end (s) | dur (frames @30fps)
//  ------------------------------------------------------|-----------|---------|--------------------
//  1  title-card-green (silent intro)                    |   0.00    |   3.00  |    90
//  2  label-title-body (hook)                             |   0.00    |   8.62  |   259
//  3  label-title-body (what you'll learn)                  |   8.62    |  17.60  |   269
//  4a video-clip (lead-in, no overlay)                       |  17.60    |  20.57  |    89
//  4b video-clip (Desktop/web card)                          |  20.57    |  28.00  |   223
//  4c video-clip (gap, no overlay)                           |  28.00    |  28.20  |     6
//  4d video-clip (Mobile card)                               |  28.20    |  36.67  |   254
//  4e video-clip (demo, no overlay)                          |  36.67    | 153.76  |  3513
//  5  label-title-body (a few things to keep in mind)          | 153.76    | 190.18  |  1092
//  6  big-statement (closing punchline)                          | 190.18    | 197.23  |   212
//                                                                            total       6007

export const claudeInstructions: VideoData = {
  audioSrc: 'audio/claude-instructions.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/claude-instructions.mp4',
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'Instructions for Claude',
      label: 'CLAUDE PERSONALIZATION',
      durationInFrames: 90,
    },

    // 2 — Hook (0.00 → 8.62)
    // VO: "Claude lets you set standing instructions for what it should know about you and how you
    //      want it to work with you, so you don't have to repeat the same preferences in every
    //      conversation."
    {
      layout: 'label-title-body',
      label: 'THE IDEA',
      title: 'Stop repeating yourself to Claude',
      body: [
        'Set standing instructions for what Claude should know about you',
        'No need to repeat the same preferences every conversation',
      ],
      bodyTimings: [0, 119],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'check'],
      durationInFrames: 259,
    },

    // 3 — What you'll learn (8.62 → 17.60)
    // VO: "In this lesson, I'll show you how to add your 3C's personalization profile to Claude,
    //      giving it a better starting point whenever you begin a new conversation. Let's start with
    //      where to find them."
    {
      layout: 'label-title-body',
      label: "WHAT YOU'LL LEARN",
      title: 'Add your 3 Cs personalization profile',
      body: ['A better starting point for every new conversation'],
      bodyTimings: [127],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles'],
      durationInFrames: 269,
    },

    // 4a — Demo lead-in (17.60 → 20.57), no overlay card
    // VO: "Let's start with where to find them."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-instructions.mp4',
      videoStartTime: 17.60,
      durationInFrames: 89,
    },

    // 4b — Desktop/web card (20.57 → 28.00)
    // VO: "On web or desktop, open Claude, select your profile icon in the bottom left corner, open
    //      settings and find instructions for Claude."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-instructions.mp4',
      videoStartTime: 20.57,
      title: 'Desktop/web',
      body: ['Profile icon (bottom left) → Settings → Instructions for Claude'],
      overlayPosition: 'top',
      durationInFrames: 223,
    },

    // 4c — Gap (28.00 → 28.20), no overlay card
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-instructions.mp4',
      videoStartTime: 28.00,
      durationInFrames: 6,
    },

    // 4d — Mobile card (28.20 → 36.67)
    // VO: "On mobile, open the menu in the top left corner, select your profile icon, choose profile,
    //      and find the instructions field."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-instructions.mp4',
      videoStartTime: 28.20,
      title: 'Mobile',
      body: ['Menu (top left) → Profile icon → Profile → Instructions'],
      panelLayout: 'text-left',
      durationInFrames: 254,
    },

    // 4e — Demo (36.67 → 153.76), no overlay card
    // VO covers: "For this demo, I'm using Claude in my web browser" → one single field, organized
    // with the 3 Cs → Context (role and how they use Claude) → Communication (takeaway first, concise,
    // plain language) → Collaboration (challenge assumptions, flag weak evidence, ask when unsure) →
    // save → test in a fresh chat with the Singapore expansion question → reading Claude's response and
    // checking whether it gets to the point, takes a strategy/ops lens, and challenges assumptions.
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-instructions.mp4',
      videoStartTime: 36.67,
      // Moderate zoom into the "Instructions for Claude" field while it's being filled in,
      // comp frames 1408→2832 (local 218→1642), with 30-frame ease in/out.
      clipZoomKeyframes: [
        { startFrame: 0, scale: 1, originX: 50, originY: 50 },
        { startFrame: 218, scale: 1.35, originX: 56.6, originY: 64.4 },
        { startFrame: 1642, scale: 1, originX: 50, originY: 50 },
      ],
      durationInFrames: 3513,
    },

    // 5 — A few things to keep in mind (153.76 → 190.18)
    // VO: "First, keep your instructions for Claude persistent rather than task specific. Your role,
    //      communication preferences and general working style belong here. Details that only matter
    //      for one task should stay in that task's prompt. Second, your instructions carry across
    //      devices where you're signed in, so you don't need to recreate them on each device. And
    //      finally, treat your instructions as something you can refine over time. Your first version
    //      doesn't need to be perfect."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A few things to keep in mind',
      body: [
        'Keep instructions persistent, not task-specific — one-off details stay in the prompt',
        "Instructions carry across devices you're signed into",
        "Refine over time — your first version doesn't need to be perfect",
      ],
      bodyTimings: [110, 606, 856],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'compare', 'trending'],
      durationInFrames: 1092,
    },

    // 6 — Closing punchline (190.18 → 197.23)
    // VO: "As you notice patterns in what works or find yourself repeatedly correcting Claude in the
    //      same way, update your instructions."
    {
      layout: 'big-statement',
      text: 'Notice a pattern in what works,\nor catch yourself correcting Claude\nthe same way twice?\nUpdate your instructions.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [15, 58, 100, 155],
      durationInFrames: 212,
    },
  ],
};
