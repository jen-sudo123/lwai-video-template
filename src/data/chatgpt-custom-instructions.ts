import { VideoData } from '../scenes/types';

// ChatGPT Custom Instructions — Tutorial / demo video
// Audio: audio/chatgpt-custom-instructions.mp3 — raw narration extracted from source recording, 211.20s, no silence pad.
// Video: video/chatgpt-custom-instructions.mp4 — screen recording with embedded narration (same recording as audio), 1920x1080.
// No avatar asset was provided for this video.
// Scenes aligned to whisper-extracted segment/word timestamps.
// Source demo footage only runs from t≈23.40s to t≈164.72s of the narration (open Personalization →
// review the saved profile in Sources) — the first ~23s and last ~46s of the recording are blank/white
// (presenter narrating before/after screen-sharing), replaced with graphic scenes instead of blank video,
// same convention as gemini-personal-intelligence.
// Per user preference (see gemini-personal-intelligence edits): video-clip scenes carry NO label/title/body
// overlay card — the demo plays as clean, uninterrupted screen recording.
//
//  scene                                                | start (s) | end (s) | dur (frames @30fps)
//  ------------------------------------------------------|-----------|---------|--------------------
//  1  title-card-green (silent intro)                    |   0.00    |   3.00  |    90
//  2  label-title-body (hook)                             |   0.00    |   9.72  |   292
//  3  label-title-body (what you'll learn)                  |   9.72    |  23.40  |   410
//  4a video-clip (lead-in, no overlay)                       |  23.40    |  30.10  |   201
//  4b video-clip (Mobile card)                               |  30.10    |  40.33  |   307
//  4c video-clip (demo, no overlay)                          |  40.33    | 164.72  |  3732
//  5  label-title-body (a few things to keep in mind)          | 164.72    | 199.88  |  1054
//  6  big-statement (closing punchline)                          | 199.88    | 211.20  |   340
//                                                                            total       6426

export const chatGPTCustomInstructions: VideoData = {
  audioSrc: 'audio/chatgpt-custom-instructions.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/chatgpt-custom-instructions.mp4',
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'Custom Instructions in ChatGPT',
      label: 'CHATGPT PERSONALIZATION',
      durationInFrames: 90,
    },

    // 2 — Hook (0.00 → 9.72)
    // VO: "ChatGPT lets you set standing instructions for how you want it to work with you, so you
    //      don't have to repeat the same preferences in every conversation."
    {
      layout: 'label-title-body',
      label: 'THE IDEA',
      title: 'Stop repeating yourself to ChatGPT',
      body: [
        'Set standing instructions for how you want ChatGPT to work with you',
        'No need to repeat the same preferences every conversation',
      ],
      bodyTimings: [0, 155],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'check'],
      durationInFrames: 292,
    },

    // 3 — What you'll learn (9.72 → 23.40)
    // VO: "In this lesson, I will show you how to add your 3C's personalization profile to ChatGPT,
    //      giving it a better starting point whenever you begin a new conversation. Let's start with
    //      where to find these settings."
    {
      layout: 'label-title-body',
      label: "WHAT YOU'LL LEARN",
      title: 'Add your 3 Cs personalization profile',
      body: ['A better starting point for every new conversation'],
      bodyTimings: [175],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles'],
      durationInFrames: 410,
    },

    // 4a — Demo lead-in (23.40 → 30.10), no overlay card
    // VO: "On web or desktop, open ChatGPT, select your profile in the bottom left corner and choose
    //      personalization."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-custom-instructions.mp4',
      videoStartTime: 23.40,
      durationInFrames: 201,
    },

    // 4b — Mobile card (30.10 → 40.33)
    // VO: "On mobile, open the ChatGPT app, go to settings and select personalization. You'll find
    //      similar personalization options across both." — mobile screen visually persists a bit
    // past the "both" line (showing the already-saved instructions synced to mobile) before cutting
    // to desktop, so the card window runs a little past the VO segment to match.
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-custom-instructions.mp4',
      videoStartTime: 30.10,
      title: 'Mobile',
      body: ['Settings → Personalization'],
      panelLayout: 'text-left',
      durationInFrames: 307,
    },

    // 4c — Demo (40.33 → 164.72), no overlay card
    // VO covers: "For this demo, I'm using ChatGPT in my web browser" → Custom Instructions vs More
    // About You → entering Context under "More about you" → Communication + Collaboration under
    // "Custom instructions" → save → test in a fresh chat with "Review my profile, what stands out to
    // you?" → reading the response and checking the Sources/Memory panel to confirm the 3 Cs are
    // shaping it.
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-custom-instructions.mp4',
      videoStartTime: 40.33,
      durationInFrames: 3732,
    },

    // 5 — A few things to keep in mind (164.72 → 199.88)
    // VO: "First, keep your custom instructions persistent rather than task specific. Your role,
    //      communication preferences, and general working style belong here. Details that only matter
    //      for one task should stay in that task's prompt. Second, put the right information in the
    //      right place. Use more about you for information ChatGPT should consistently know about you.
    //      Use custom instructions for how you want ChatGPT to respond and work with you. And finally,
    //      treat your profile as something you can refine over time."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A few things to keep in mind',
      body: [
        'Keep instructions persistent, not task-specific — one-off details stay in the prompt',
        'Right info, right place: "More about you" vs. "Custom instructions"',
        'Treat your profile as something you refine over time',
      ],
      bodyTimings: [0, 483, 932],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'compare', 'trending'],
      durationInFrames: 1054,
    },

    // 6 — Closing punchline (199.88 → 211.20)
    // VO: "The goal isn't to create the perfect profile on day one, it's to give ChatGPT a useful head
    //      start, then improve that profile as you learn what helps you work better together."
    {
      layout: 'big-statement',
      text: "The goal isn't a perfect profile\non day one.\nGive ChatGPT a useful head start,\nthen improve it as you learn.",
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [15, 60, 130, 195],
      durationInFrames: 340,
    },
  ],
};
