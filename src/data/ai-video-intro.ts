import { VideoData } from '../scenes/types';

// AI Video Generation — Intro / overview video
// Audio: audio/ai-video-intro.mp3 — VO ends at ~220.7s, file is ~222.1s.
// Scenes aligned to whisper-extracted segment timestamps.
//
//  scene                                        | VO start  | VO end   | dur (frames @30fps)
//  ---------------------------------------------|-----------|----------|--------------------
//  1   title-card-green  title                  |   0.00    |   3.00   |   90
//  2   label-title-body  the old way            |   3.00    |  16.90   |  417
//  3a  big-statement     AI changes constraint  |  16.90    |  19.60   |   81
//  3b  label-title-body  generate/transform     |  19.60    |  33.40   |  414
//  4a  label-title-body  why models work        |  33.40    |  48.80   |  462
//  4b1 big-statement     most demanding medium  |  48.80    |  52.20   |  102
//  4b2 split-contrast    images vs video        |  52.20    |  65.80   |  408
//  5   label-title-body  compute demands        |  65.80    |  82.50   |  501
//  6   video-clip        three workflows        |  82.50    |  93.20   |  321
//  7a1 video-clip        text to video          |  93.20    | 103.10   |  297
//  7a2 video-clip        presentation use case  | 103.10    | 108.70   |  168
//  7b  video-clip        no more stock          | 108.70    | 117.80   |  273
//  7c  video-clip        gemini omni            | 117.80    | 124.70   |  207
//  8a1 video-clip        image to video         | 124.70    | 134.70   |  300
//  8a2 video-clip        animate your images    | 134.70    | 141.40   |  201
//  8b  video-clip        pika effects           | 141.40    | 152.80   |  342
//  9   video-clip        avatars                | 152.80    | 192.60   | 1194
//  10a video-clip        the ROI                | 192.60    | 202.60   |  300
//  10b video-clip        ROI continued          | 202.60    | 211.40   |  264
//  11  video-clip        you own the outcome    | 211.40    | 220.70   |  279
//                                                                total    6621
//
//  Video assets (all relative to /public/):
//    video/ai-video-intro/gemini-omni/protein-folding.mp4   (10s)
//    video/ai-video-intro/gemini-omni/hand-infinite-orbs.mp4 (9.2s)
//    video/ai-video-intro/gemini-omni/astronaut-2a.mp4      (9.9s)
//    video/ai-video-intro/gemini-omni/sailor.mp4            (9.9s)
//    video/ai-video-intro/gemini-omni/museum.mp4            (10s)
//    video/ai-video-intro/gemini-omni/violin-invisible.mp4  (10s)
//    video/ai-video-intro/gemini-omni/marble-audio.mp4      (9.8s)
//    video/ai-video-intro/gemini-omni/keynote-montage.mp4   (10s)
//    video/ai-video-intro/gemini-omni/mirror-chrome.mp4     (9s)
//    video/ai-video-intro/google-omni.mp4                   (52s)
//    video/ai-video-intro/pika-effect.mp4
//    video/ai-video-intro/heygen-ava.mp4                    (36.4s)

export const aiVideoIntro: VideoData = {
  audioSrc: 'audio/ai-video-intro.mp3',
  avatarSrc: 'video/ai-video-intro/ai-ava-intro.mp4',
  // frame 4598 = scene 9 start (02:32.8) → right-column 600px; frame 5079 = 02:49.29 → corner
  avatarKeyframes: [
    { frame: 4598, position: 'right-column', size: 600 },
    { frame: 5079, position: 'corner' },
  ],
  scenes: [
    // 1 — Title card (0:00 → 0:03)
    {
      layout: 'title-card-green',
      title: 'AI Video Generation',
      durationInFrames: 90,
    },

    // 2a — The Old Way: video only (0:03 → 0:09.15, 6.15s = 185 frames)
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/intro-short.mp4',
      videoStartTime: 0,
      durationInFrames: 185,
    },

    // 2b — The Old Way: text overlay on intro-short (0:09.15 → 0:12.3, 3.15s = 95 frames)
    // intro-short.mp4 is 9.3s — from 6.15 there's ~3.15s of clip left before it runs out
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/intro-short.mp4',
      videoStartTime: 6.15,
      label: 'THE CHALLENGE',
      title: 'Video has always been expensive and slow',
      body: [
        'Scripting, filming, and editing across multiple people',
        'Multiple tools and handoffs just to produce one clip',
      ],
      bodyTimings: [0, 60],
      overlayPosition: 'bottom',
      durationInFrames: 95,
    },

    // 2c — The Old Way: continued on marble-audio clip (0:12.3 → 0:16.9, 4.6s = 137 frames)
    // marble-audio.mp4 (9.8s) — card pre-revealed, no entrance animation, both bullets instantly visible
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/marble-audio.mp4',
      videoStartTime: 0,
      label: 'THE CHALLENGE',
      title: 'Video has always been expensive and slow',
      body: [
        'Scripting, filming, and editing across multiple people',
        'Multiple tools and handoffs just to produce one clip',
      ],
      bodyTimings: [0, 0],
      overlayPosition: 'bottom',
      skipCardAnimation: true,
      durationInFrames: 137,
    },

    // 3a — AI changes that constraint (0:16.9 → 0:19.6, 2.7s = 81 frames)
    // VO: "AI changes that constraint."
    {
      layout: 'big-statement',
      label: 'THE SHIFT',
      text: 'AI changes\nthat constraint.',
      highlight: 'constraint.',
      animation: 'kinetic',
      lineTimings: [0, 15],
      durationInFrames: 81,
    },

    // 3b — Generate / Transform / Publish (0:19.6 → 0:33.4, 13.8s = 414 frames)
    // VO: "With AI for video you now have the capability to generate or transform short
    //      video clips from instructions and reference material so that you can prototype,
    //      iterate and publish without a full production pipeline."
    {
      layout: 'label-title-body',
      label: 'THE SHIFT',
      title: 'AI for Video',
      body: [
        'Capability: generate or transform clips from text instructions and reference material',
        'Workflow: prototype, iterate, and publish. No full production pipeline needed.',
      ],
      bodyTimings: [0, 254],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 414,
    },

    // 4a — Why models work part 1 (0:33.4 → 0:43.1, 9.67s = 290 frames)
    // garden-world.mp4 (9.67s) — exact fit
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/garden-world.mp4',
      videoStartTime: 0,
      label: 'WHY IT WORKS',
      title: 'Trained on vast patterns\nof imagery and motion',
      body: [
        'Produces plausible sequences, not just single frames',
        'Coherent progression over time: identity, timing, continuity',
      ],
      bodyTimings: [0, 150],
      panelLayout: 'text-left',
      durationInFrames: 290,
    },

    // 4a cont — Why models work part 2 (0:43.1 → 0:48.8, 5.73s = 172 frames)
    // fish.mp4 — card pre-revealed, no entrance animation
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/fish.mp4',
      videoStartTime: 0,
      label: 'WHY IT WORKS',
      title: 'Trained on vast patterns\nof imagery and motion',
      body: [
        'Produces plausible sequences, not just single frames',
        'Coherent progression over time: identity, timing, continuity',
      ],
      bodyTimings: [0, 0],
      panelLayout: 'text-left',
      skipCardAnimation: true,
      durationInFrames: 172,
    },

    // 4b1 — Most demanding medium (0:48.8 → 0:52.2, 3.4s = 102 frames)
    // VO: "That said, video is the most demanding medium."
    {
      layout: 'big-statement',
      label: 'THE COMPLEXITY',
      text: 'Video is the most\ndemanding medium.',
      highlight: 'demanding medium.',
      animation: 'fade',
      lineTimings: [0, 20],
      durationInFrames: 102,
    },

    // 4b2 — Images vs Video (0:52.2 → 1:05.8, 13.6s = 408 frames)
    // museum.mp4 (10s) — plain video, no overlay; ~3.6s freeze at end is acceptable
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/museum.mp4',
      videoStartTime: 0,
      durationInFrames: 408,
    },

    // 5 — Compute demands (1:05.8 → 1:22.5, 16.7s = 501 frames)
    // VO: "As a result video models are very powerful but also very compute intensive.
    //      Lower tiers often limit the duration, resolution and number of generations."
    {
      layout: 'label-title-body',
      label: 'COMPUTE DEMANDS',
      title: 'Powerful, but compute-intensive',
      body: [
        'Lower tiers limit: duration, resolution, and generation count',
        'Higher tiers unlock more output, quality, and priority access',
      ],
      bodyTimings: [162, 342],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 501,
    },

    // 6 — Three key workflows (1:22.5 → 1:33.2, 10.7s = 321 frames)
    // protein-folding clip: 10s — ~0.7s freeze at end, negligible
    // VO: "...three key workflows that are helpful for you to understand."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/protein-folding.mp4',
      videoStartTime: 0,
      label: 'THREE WORKFLOWS',
      title: 'Three key AI video capabilities',
      body: ['Text to Video', 'Image to Video', 'Avatars'],
      bodyTimings: [171, 231, 291],
      overlayPosition: 'center',
      cardDelay: 171,
      durationInFrames: 321,
    },

    // 7a1 — Text to Video: concept (1:33.2 → 1:43.1, 9.9s = 297 frames)
    // google-omni.mp4 (52s) — full-screen, text overlay top-right
    // VO: "The first one is text to video — you can go from a single text prompt to a full video."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/google-omni.mp4',
      videoStartTime: 0,
      label: 'WORKFLOW 1',
      title: 'Text to Video',
      body: [
        'One text prompt → a full video clip',
        'Custom B-roll, openers, explainers — on demand',
      ],
      bodyTimings: [0, 90],
      overlayPosition: 'top-right',
      durationInFrames: 297,
    },

    // 7a2 — Text to Video: presentation use case (1:43.1 → 1:48.7, 5.6s = 168 frames)
    // google-omni.mp4 continues from 9.9s (where 7a1 ends)
    // VO: "...if you're preparing a big presentation you want a strong opening video,
    //      you can simply prompt it into existence."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/google-omni.mp4',
      videoStartTime: 9.9,
      body: [
        'Need a strong opening for a presentation?',
        'Prompt it into existence.',
      ],
      bodyTimings: [0, 45],
      overlayPosition: 'top-right',
      skipCardAnimation: true,
      durationInFrames: 168,
    },

    // 7b — No more stock search (1:48.7 → 1:57.8, 9.1s = 273 frames)
    // sailor clip: 9.9s — scene uses 9.1s, fits
    // VO: "Visually you might have searched Google or some stock video library for the
    //      right shot, but now you can generate a custom clip directly."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/sailor.mp4',
      videoStartTime: 0,
      body: [
        'No more searching stock libraries for the right shot',
        'Generate a custom clip directly from your description',
      ],
      bodyTimings: [0, 120],
      overlayPosition: 'bottom',
      durationInFrames: 273,
    },

    // 7c — Gemini Omni callout (1:57.8 → 2:04.7, 6.9s = 207 frames)
    // VO: "Tools like Gemini Omni, the latest Google's advanced multimodal video
    //      generation and editing model are great at this."
    {
      layout: 'centered-image-caption',
      image: 'images/gemini-omni-social.png',
      caption: 'Gemini Omni — Google\'s advanced multimodal video generation and editing model',
      durationInFrames: 207,
    },

    // 8a1 — Image to Video: concept (2:04.7 → 2:14.7, 10s = 300 frames)
    // skate.mp4 — full-screen, text overlay top-left
    // VO: "You can also turn a still image into a short film clip."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/skate.mp4',
      videoStartTime: 0,
      label: 'WORKFLOW 2',
      title: 'Image to Video',
      body: [
        'Animate a still image — turn a static shot into motion',
      ],
      overlayPosition: 'top',
      durationInFrames: 167,
    },

    // 8a1b — whale follow-up (8s = 240 frames)
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/whale.mp4',
      videoStartTime: 0,
      durationInFrames: 240,
    },

    // 8a2 — Animate your images (2:14.7 → 2:21.4, 6.7s = 201 frames)
    // marble-audio clip: 9.8s — scene uses 6.7s, fits
    // VO: "If you created AI images, you can animate them — turning a static product
    //      shot into motion or creating a simple scene with movement."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/marble-audio.mp4',
      videoStartTime: 0,
      body: [
        'Works with AI-generated images or your own photos',
        'Turn a static product shot into a scene with movement',
      ],
      bodyTimings: [0, 60],
      overlayPosition: 'bottom',
      durationInFrames: 201,
    },

    // 8b-img1 — Pika still 1 (62 frames, ~2.1s)
    {
      layout: 'centered-image-caption',
      image: 'images/pika-still-1.png',
      durationInFrames: 62,
    },

    // 8b-img2 — Pika still 2 (61 frames, ~2s)
    {
      layout: 'centered-image-caption',
      image: 'images/pika-still-2.png',
      durationInFrames: 61,
    },

    // 8b — Pika Effects video starts at 02:29.08 (342 frames)
    // VO: "Here's an example of taking two existing photos and turning them into a
    //      video with Pika effects."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/pika-effect.mp4',
      videoStartTime: 0,
      label: 'TOOL EXAMPLE',
      title: 'Pika Effects',
      body: ['Two existing photos → one video clip'],
      overlayPosition: 'bottom',
      durationInFrames: 126,
    },

    // 9 — Avatars (2:32.8 → 2:49.29, ~16.5s = 506 frames)
    // No background video — AI Ava avatar floats in right column via avatarKeyframes
    {
      layout: 'label-title-body',
      label: 'WORKFLOW 3',
      title: 'Avatars',
      body: [
        'Film yourself once — create an AI model of yourself',
        'Prompt the avatar to say new content in any language',
      ],
      bodyTimings: [0, 270],
      durationInFrames: 506,
    },

    // 9b — CEO of Synthesia quote (02:50.13 → 03:12.6, 22.47s = 674 frames)
    // VO: "The CEO of Synthesia said his intent was to completely replace PowerPoints
    //      with video as a new style of communication using this technology."
    {
      layout: 'centered-quote',
      text: 'Replace PowerPoints with video as a new style of communication.',
      attribution: '— CEO, Synthesia',
      durationInFrames: 674,
    },

    // 10a — The ROI (3:12.6 → 3:22.6, 10s = 300 frames)
    // keynote-montage clip: 10s — exact fit
    // VO: "The ROI is very straightforward. Faster creative cycles, lower production friction."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/keynote-montage.mp4',
      videoStartTime: 0,
      label: 'THE ROI',
      body: ['Faster cycles', 'Lower friction', 'More reach'],
      bodyTimings: [0, 90, 180],
      panelLayout: 'cards-left',
      durationInFrames: 300,
    },

    // 10b — ROI: use video, not slides (3:22.6 → 3:31.4, 8.8s = 264 frames)
    // hand-infinite-orbs clip: 9.2s — scene uses 8.8s, fits
    // VO: "...the ability to use videos where maybe previously you would have defaulted
    //      to text or presentations."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-video-intro/gemini-omni/hand-infinite-orbs.mp4',
      videoStartTime: 0,
      body: [
        'Use video where you\'d previously default to text or slides',
      ],
      overlayPosition: 'bottom',
      durationInFrames: 107,
    },

    // 11 — You own the outcome (03:26.17 → end, extended to cover full audio ~222.1s = 478 frames)
    // VO: "AI improves the execution, but you own the outcome."
    {
      layout: 'big-statement',
      label: 'RESPONSIBILITY',
      text: 'AI improves the execution.\nYou own the outcome.',
      highlight: 'outcome.',
      animation: 'fade',
      lineTimings: [0, 20],
      durationInFrames: 478,
    },
  ],
};
