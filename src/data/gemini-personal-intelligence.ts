import { VideoData } from '../scenes/types';

// Gemini Personal Intelligence — Tutorial / demo video
// Audio: audio/gemini-personal-intelligence.mp3 — raw narration extracted from source recording, 214.34s, no silence pad.
// Video: video/gemini-personal-intelligence.mp4 — screen recording with embedded narration (same recording as audio).
// No avatar asset was provided for this video.
// Scenes aligned to whisper-extracted segment/word timestamps.
// Source demo footage only runs from t≈24.4s to t≈177.8s of the narration (Where should we start? →
// back to the empty chat) — the first ~24s and last ~36s of the recording are blank/white
// (presenter narrating before/after screen-sharing), replaced with graphic scenes instead of blank video,
// same convention as notebooklm-data-analysis.
//
//  scene                                                | start (s) | end (s) | dur (frames @30fps)
//  ------------------------------------------------------|-----------|---------|--------------------
//  1  title-card-green (silent intro)                    |   0.00    |   3.00  |    90
//  2  label-title-body (hook)                             |   0.00    |  11.10  |   333
//  3  label-title-body (before you start)                  |  11.10    |  24.40  |   399
//  4  video-clip (STEP 1 — find it in settings)             |  24.40    |  45.16  |   623
//  5  video-clip (STEP 2 — organize with the three Cs)       |  45.16    |  59.92  |   443
//  6  video-clip (STEP 3 — write context/comm/collab)         |  59.92    |  95.90  |  1079
//  7  video-clip (STEP 4 — saved, starting profile)             |  95.90    | 116.82  |   628
//  8  video-clip (STEP 5 — test in a fresh conversation)         | 116.82    | 130.24  |   402
//  9  video-clip (STEP 6 — signs it's working)                    | 130.24    | 154.92  |   741
// 10  video-clip (STEP 7 — refine and test again)                   | 154.92    | 177.80  |   686
// 11  label-title-body (a few things to keep in mind)                 | 177.80    | 207.04  |   877
// 12  big-statement (closing punchline)                                 | 207.04    | 214.34  |   219
//                                                                                  total       6520

export const geminiPersonalIntelligence: VideoData = {
  audioSrc: 'audio/gemini-personal-intelligence.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/gemini-personal-intelligence.mp4',
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'Personal Intelligence in Gemini',
      label: 'GEMINI PERSONALIZATION',
      durationInFrames: 90,
    },

    // 2 — Hook (0.00 → 11.10)
    // VO: "Gemini lets you set standing instructions for what it should know about you and how you
    //      want it to respond, so you don't have to repeat the same preferences in every conversation."
    {
      layout: 'label-title-body',
      label: 'THE IDEA',
      title: 'Stop repeating yourself to Gemini',
      body: [
        'Set standing instructions for what Gemini should know about you',
        'And how you want it to respond',
        "No need to repeat the same preferences every conversation",
      ],
      bodyTimings: [0, 140, 190],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'chat-bubble-left-right', 'check'],
      durationInFrames: 333,
    },

    // 3 — Before you start (11.10 → 24.40)
    // VO: "One important note before we start. Instructions for Gemini currently apply to personal
    //      Google accounts. If you're signed in with a work, school or supervised account, you won't
    //      see this option. Let's start with where to find them."
    {
      layout: 'label-title-body',
      label: 'BEFORE YOU START',
      title: 'Personal Google accounts only',
      body: [
        "Work, school, or supervised accounts won't see this option",
      ],
      bodyTimings: [61],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['x'],
      durationInFrames: 399,
    },

    // 4 — STEP 1: Find it in Settings (24.40 → 45.16)
    // VO: "On web, sign in to Gemini with your personal Google account, then go to settings and help
    //      select personal intelligence and open instructions for Gemini. Depending on your app
    //      version or location, you may see this personalization area called personal intelligence
    //      or personal context. I'll open personal intelligence and go to instructions for Gemini."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 24.40,
      durationInFrames: 623,
    },

    // 5 — STEP 2: Organize with the three Cs (45.16 → 59.92)
    // VO: "Gemini gives me one main field for my instructions, so I'm going to organize everything
    //      using the three Cs. Context, Communication and Collaboration. I'll select the instruction
    //      field and enter my complete profile."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 45.16,
      durationInFrames: 443,
    },

    // 6 — STEP 3: Write Context / Communication / Collaboration (59.92 → 95.90)
    // VO: "For context, I lead strategy and operations and regularly use Gemini to prepare for
    //      meetings, evaluate business decisions, and communicate recommendations to senior
    //      stakeholders. For communication, lead with the main takeaway, keep responses concise, use
    //      straightforward business language, and use bullets when they make information easier to
    //      scan. And finally, for collaboration. Challenge my assumptions when appropriate. Surface
    //      important risks and trade-offs, flag uncertainty rather than guessing, and ask questions
    //      when missing information could materially change your recommendation."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 59.92,
      durationInFrames: 1079,
    },

    // 7 — STEP 4: Saved, starting profile (95.90 → 116.82)
    // VO: "Once I select submit, my instructions are saved. And that's it. Gemini now has a starting
    //      profile for who I am, how I wanted to communicate, and how I wanted to collaborate with
    //      me, without me having to repeat those instructions in every conversation. If I ever want
    //      to temporarily stop using these instructions, I can turn them off using the toggle in the
    //      upper right corner."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 95.90,
      durationInFrames: 628,
    },

    // 8 — STEP 5: Test in a fresh conversation (116.82 → 130.24)
    // VO: "Now let's test it in a fresh conversation. I'll ask Gemini. I'm considering expanding into
    //      Singapore next year. Do you think this is a market worth exploring, and what would you
    //      want me to validate before committing resources?"
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 116.82,
      durationInFrames: 402,
    },

    // 9 — STEP 6: Signs it's working (130.24 → 154.92)
    // VO: "Now I'm not just looking at the content of Gemini's answer, I'm also looking for signs
    //      that my personalization is shaping the response. Does Gemini approach the question from
    //      the perspective of a senior leader? Does it get to the key takeaway quickly? Does it
    //      surface risks and trade-offs instead of simply agreeing with me? And is the answer
    //      structured in a way that's easy for me to use? Those are all signals that my instructions
    //      are having an effect."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 130.24,
      durationInFrames: 741,
    },

    // 10 — STEP 7: Refine and test again (154.92 → 177.80)
    // VO: "If something feels off, I can go back and refine them. For example, if Gemini consistently
    //      gives me more detail than I need, I could make my communication instruction more specific.
    //      Keep responses under 200 words unless I ask for more detail and use no more than five
    //      bullets. Instead of repeating that preference in every conversation, I can update my
    //      standing instructions and test again."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-personal-intelligence.mp4',
      videoStartTime: 154.92,
      durationInFrames: 686,
    },

    // 11 — A few things to keep in mind (177.80 → 207.04)
    // VO: "Now a few things to keep in mind. First, your instructions follow your Google account
    //      across supported devices, so you don't need to recreate them on each device. Second, your
    //      account-wide instructions for Gemini don't automatically apply inside gems, Gemini
    //      Reusable Assistant, so add any relevant guidance directly to the gem when needed. And
    //      finally, don't use instructions as a way to make Gemini forget previously stored
    //      information. For that, use Gemini's activity and data controls."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A few things to keep in mind',
      body: [
        'Instructions follow your Google account across devices',
        "Don't automatically apply inside Gems — add guidance there too",
        "Not for forgetting stored data — use Activity & data controls",
      ],
      bodyTimings: [73, 306, 625],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['compare', 'x', 'sliders'],
      durationInFrames: 877,
    },

    // 12 — Closing punchline (207.04 → 214.34)
    // VO: "As you notice patterns in what works, or find yourself repeatedly correcting Gemini in the
    //      same way, update your instructions."
    {
      layout: 'big-statement',
      text: 'Notice a pattern in what works,\nor catch yourself correcting Gemini\nthe same way twice?\nUpdate your instructions.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [18, 60, 110, 149],
      durationInFrames: 219,
    },
  ],
};
