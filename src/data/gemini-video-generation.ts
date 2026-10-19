import { VideoData } from '../scenes/types';

// Gemini Omni (video generation) — Tutorial / demo video
// Audio: audio/gemini-video-generation.mp3 — raw narration extracted from source recording, 223.93s, no silence pad.
// Video: video/gemini-video-generation.mp4 — screen recording with embedded narration (same recording as audio).
// Same pattern as chatgpt-tasks.ts / notebooklm-data-analysis.ts: presenter narrating live over their own
// screen recording — audio and video are already in perfect sync. audioStartFrame/clipStartFrame = 90
// because the source has zero lead silence (narration starts at t=0.00s).
//
//  scene                                          | start (s) | end (s)  | dur (frames @30fps)
//  ------------------------------------------------|-----------|----------|--------------------
//  1  title-card-green (silent intro)              |   0.00    |   3.00   |    90
//  2  label-title-body (hook — what Omni is)        |   3.00    |  27.96   |   749
//  3  video-clip (two ways to start, no overlay)     |  27.96    |  60.18   |   966
//  4a video-clip (write the prompt)                 |  60.18    |  92.58   |   972
//  4b video-clip (submit & generate)                |  92.58    | 109.36   |   504
//  5  video-clip (review before you share)          | 109.36    | 144.14   |  1043
//  6  video-clip (refine, don't restart)             | 144.14    | 169.52   |   762
//  7  video-clip (share or download)                  | 169.52    | 176.04   |   195
//  8  label-title-body (access & rollout)             | 176.04    | 211.42   |  1062
//  9  big-statement (closing punchline)               | 211.42    | 226.93   |   465
//                                                                  total       6808

export const geminiVideoGeneration: VideoData = {
  audioSrc: 'audio/gemini-video-generation.mp3',
  clipSrc: 'video/gemini-video-generation.mp4',
  audioStartFrame: 90,
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'Generate Video with Gemini Omni',
      label: 'AI VIDEO GENERATION',
      durationInFrames: 90,
    },

    // 2 — Hook (0:03.00 → 0:27.96, ~25s)
    // VO: "Gemini Omni is Google's video generation capability directly inside Gemini. It connects
    //      to the broader Google workspace where your work already lives. So instead of exporting
    //      context into a separate video tool, I can now use the same assistant service to
    //      generate, refine, and even prepare short video updates from text or from images or from
    //      anything else."
    {
      layout: 'label-title-body',
      label: 'GEMINI OMNI',
      title: 'Video generation, built into Gemini',
      body: [
        'No separate video tool, it lives inside Gemini',
        'Connects to the Google Workspace context you already have',
        'Generate, refine, and prepare video updates',
        'From text, images, or anything else you already have',
      ],
      bodyTimings: [0, 200, 319, 557],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sparkles', 'compare', 'bolt', 'pencil'],
      durationInFrames: 749,
    },

    // 3 — Two ways to start (0:27.96 → 1:00.18, ~32.2s)
    // VO: "So you can find Gemini Omni video generation in two main places. First of all, in
    //      Gemini, in the left sidebar, I can click on videos... And secondly, you can also do it
    //      from a normal chat. So you can click on the plus icon inside the prompt bar... upload
    //      files, add from drive, create image, create video, and canvas."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-video-generation.mp4',
      videoStartTime: 24.96,
      durationInFrames: 966,
    },

    // 4a — Write the prompt (1:00.18 → 1:32.58, ~32.4s)
    // VO: "So let's take a look with one specific scenario... I set the format to horizontal
    //      because this is going to a team channel... And then I can just paste a prompt. So I can
    //      say something like, create a short video of a male executive standing in their office,
    //      speaking calmly and directly to the camera, and then with this particular message."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-video-generation.mp4',
      videoStartTime: 57.18,
      label: 'WRITE THE PROMPT',
      title: 'Describe the video you want',
      durationInFrames: 972,
    },

    // 4b — Submit & generate (1:32.58 → 1:49.36, ~16.8s)
    // VO: "Then I can click on submit. And then the render will definitely take longer than a text
    //      response because it's generating motion, voice, scene consistency, and even audio. But
    //      after a bit of waiting here, I have my video."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-video-generation.mp4',
      videoStartTime: 89.58,
      label: 'GENERATE',
      title: 'Gemini renders it',
      durationInFrames: 504,
    },

    // 5 — Review before you share (1:49.36 → 2:24.14, ~34.8s)
    // VO: "Before I share anything, I definitely want to watch the full video once more... Do the
    //      spoken lines actually match my script? Does the visual look credible? And also does the
    //      tone feel right for my message? ... content that you've created or edited with Google AI
    //      includes transparency signals like the synth ID, watermarking, and content credentials.
    //      So I can actually treat provenance as part of the workflow."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-video-generation.mp4',
      videoStartTime: 106.36,
      label: 'BEFORE YOU SHARE',
      title: 'Review, then verify provenance',
      body: [
        'Check the spoken lines match your script',
        'Confirm the visual and tone feel right',
        'SynthID watermark + content credentials added automatically',
      ],
      bodyTimings: [139, 297, 626],
      durationInFrames: 1043,
    },

    // 6 — Refine, don't restart (2:24.14 → 2:49.52, ~25.4s)
    // VO: "I can now also do further edits. So I can say something like, yeah, regenerate this with
    //      a medium close-up, stable camera framing, natural office lighting, and no scene changes,
    //      and then keep the script unchanged. So this is really important because here instead of
    //      restarting the prompt, you're just refining within that same conversation because each
    //      instruction builds on the prior version."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-video-generation.mp4',
      videoStartTime: 141.14,
      label: "REFINE, DON'T RESTART",
      title: 'Each instruction builds on the last',
      body: [
        'Regenerate with new framing, lighting, or format',
        'Script stays locked, only the direction changes',
        'Builds on the prior version, no restart needed',
      ],
      bodyTimings: [85, 326, 404],
      durationInFrames: 762,
    },

    // 7 — Share or download (2:49.52 → 2:56.04, ~6.5s)
    // VO: "And once the video is totally right, I can click on share or I can click on download."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-video-generation.mp4',
      videoStartTime: 166.52,
      label: "WHEN IT'S RIGHT",
      title: 'Share or download',
      durationInFrames: 195,
    },

    // 8 — Access & rollout (2:56.04 → 3:31.42, ~35.4s)
    // VO: "Now a couple of logistical notes here. First, for personal Google accounts, Gemini Omni
    //      video generation requires a Google AI subscription. For work accounts, your access
    //      additionally depends on your Google workspace edition and on admin controls. So
    //      workspace users may access video generation through the Gemini app, through Google vids,
    //      or through Google Flow. But higher volume access may require AI expanded access or
    //      another qualifying workspace configuration."
    {
      layout: 'label-title-body',
      label: 'BEFORE YOU ROLL THIS OUT',
      title: 'Access depends on your plan',
      body: [
        'Personal accounts need a Google AI subscription',
        'Work accounts depend on your Workspace edition + admin controls',
        'Available via the Gemini app, Google Vids, or Google Flow',
        'Heavy use may require AI expanded access',
      ],
      bodyTimings: [95, 307, 578, 815],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'sliders', 'compare', 'trending'],
      durationInFrames: 1062,
    },

    // 9 — Closing punchline (3:31.42 → 3:46.93, ~15.5s)
    // VO: "So that's Gemini Omni. When you have a message, an idea, product, process, or
    //      explanation that needs more than just text, or maybe even deserves more than just text,
    //      with Omni you can now generate a video version without moving the work into a separate
    //      video production system."
    {
      layout: 'big-statement',
      text: 'When your message deserves more\nthan text, Omni turns it into video,\nwithout a separate production tool.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 60, 130],
      durationInFrames: 465,
    },
  ],
};
