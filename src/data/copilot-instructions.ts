import { VideoData } from '../scenes/types';

// Copilot Instructions — Tutorial / demo video
// Audio: audio/copilot-instructions.mp3 — raw narration extracted from source recording, 212.10s, no silence pad.
// Video: video/copilot-instructions.mp4 — screen recording with embedded narration (same recording as audio), 1024x576.
// No avatar asset was provided for this video.
// Scenes aligned to whisper-extracted segment/word timestamps.
// Unlike the Gemini/ChatGPT/Claude versions, Microsoft doesn't offer a way to edit custom instructions
// from the mobile app, so this video is web/desktop only (no mobile-navigation cutaway).
// Source demo footage only runs from t≈25.74s to t≈164.74s of the narration (open M365 Copilot chat →
// end of the Singapore-question response) — the first ~26s and last ~47s of the recording are blank/white
// (presenter narrating before/after screen-sharing), replaced with graphic scenes instead of blank video,
// same convention as gemini-personal-intelligence / chatgpt-custom-instructions / claude-instructions.
// Per user preference: video-clip scenes carry NO label/title/body overlay card — the demo plays as clean,
// uninterrupted screen recording.
// Only two "good to know" points precede the closing here (not three) — Copilot's narration structures
// "finally, treat your profile as something to refine..." as the natural closing punchline rather than a
// third bullet, so that line became the big-statement scene instead.
//
//  scene                                                | start (s) | end (s) | dur (frames @30fps)
//  ------------------------------------------------------|-----------|---------|--------------------
//  1  title-card-green (silent intro)                    |   0.00    |   3.00  |    90
//  2  label-title-body (hook)                             |   0.00    |   9.82  |   295
//  3  label-title-body (what you'll learn)                  |   9.82    |  25.74  |   477
//  4  video-clip (demo, no overlay)                          |  25.74    | 164.74  |  4170
//  5  label-title-body (a couple of practical notes)           | 164.74    | 201.26  |  1096
//  6  big-statement (closing punchline)                          | 201.26    | 212.10  |   325
//                                                                            total       6363

export const copilotInstructions: VideoData = {
  audioSrc: 'audio/copilot-instructions.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/copilot-instructions.mp4',
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'Custom Instructions in Copilot',
      label: 'COPILOT PERSONALIZATION',
      durationInFrames: 90,
    },

    // 2 — Hook (0.00 → 9.82)
    // VO: "Microsoft Copilot lets you set standing instructions for how you wanted to work with you,
    //      rather than repeating the same preferences in every conversation."
    {
      layout: 'label-title-body',
      label: 'THE IDEA',
      title: 'Stop repeating yourself to Copilot',
      body: [
        'Set standing instructions for how you want Copilot to work with you',
        'No need to repeat the same preferences every conversation',
      ],
      bodyTimings: [0, 151],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'check'],
      durationInFrames: 295,
    },

    // 3 — What you'll learn (9.82 → 25.74)
    // VO: "In this lesson, let's look at how to save your 3C's personalization profile into Microsoft
    //      365 Copilot so it has a better starting point whenever you begin a new conversation. On web
    //      and desktop, here's where to find it."
    {
      layout: 'label-title-body',
      label: "WHAT YOU'LL LEARN",
      title: 'Add your 3 Cs personalization profile',
      body: ['A better starting point for every new conversation'],
      bodyTimings: [229],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles'],
      durationInFrames: 477,
    },

    // 4 — Demo (25.74 → 164.74), no overlay card
    // VO covers: finding custom instructions (Settings → Personalization; mobile editing isn't
    // supported, set it up on web/desktop instead) → one main field, pasting in the prepared 3 Cs
    // profile → Context (role and how they use Copilot) → Communication (concise, key takeaway first,
    // plain language, bullets) → Collaboration (challenge assumptions, ask when info is missing, flag
    // uncertainty) → save instructions → test in a fresh chat with the Singapore expansion question →
    // reading Copilot's response for role/tone/structure fit.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-instructions.mp4',
      videoStartTime: 25.74,
      durationInFrames: 4170,
    },

    // 5 — A couple of practical notes (164.74 → 201.26)
    // VO: "First, keep your instructions persistent, not task specific. Your role, audience,
    //      communication preferences, and working style belong here. Details that only matter for one
    //      task should stay in the prompt. Microsoft doesn't currently publish a character limit for
    //      personal custom instructions, so focus on useful standing preferences rather than trying to
    //      fill the space. Second, custom instructions can be turned off. Go back to personalization
    //      and use the toggle on the custom instructions tile if you don't want Copilot to apply them."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A couple of practical notes',
      body: [
        'Keep instructions persistent, not task-specific — no published character limit',
        'Custom instructions can be turned off anytime from the Personalization toggle',
      ],
      bodyTimings: [95, 796],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'compare'],
      durationInFrames: 1096,
    },

    // 6 — Closing punchline (201.26 → 212.10)
    // VO: "And finally, treat your profile as something to refine. When you notice yourself repeatedly
    //      correcting Copilot in the same way, ask whether that preference belongs in your custom
    //      instructions."
    {
      layout: 'big-statement',
      text: 'Treat your profile as something to refine.\nCatch yourself correcting Copilot\nthe same way twice?\nAsk if it belongs in your instructions.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [15, 100, 195, 225],
      durationInFrames: 325,
    },
  ],
};
