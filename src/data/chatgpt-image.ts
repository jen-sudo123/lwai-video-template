import { VideoData } from '../scenes/types';

// ChatGPT Images 2.0 — Tutorial / demo video
// Audio: audio/chatgpt-image.mp3 — VO extracted from source MP4, 220.5s
// Video: video/chatgpt-image.mp4 — screen recording with embedded VO.
// Scenes aligned directly to whisper-extracted VO timestamps.
//
//  scene                                   | VO start   | VO end    | dur (frames @30fps)
//  ----------------------------------------|------------|-----------|--------------------
//  1  title-card-green                      |  0.00      |  3.00     |   90
//  2  label-title-body (hook)               |  0.00      | 16.76     |  413
//  3  label-title-body (3 key changes)      | 16.76      | 46.96     |  906
//  4  big-statement (use case intro)        | 46.96      | 58.16     |  336
//  5  video-clip (access & open)            | 58.16      | 77.00     |  565
//  6  video-clip (write the brief)          | 77.00      |107.92     |  928
//  7  video-clip (review the output)        |107.92      |134.36     |  793
//  8  video-clip (iterate with direction)   |134.36      |156.56     |  666
//  9  video-clip (download + sidebar)       |156.56      |174.52     |  539
// 10  label-title-body (availability)       |174.52      |220.50     | 1379
//                                                          total       6615

export const chatGPTImage: VideoData = {
  audioSrc: 'audio/chatgpt-image.mp3',
  clipSrc: 'video/chatgpt-image.mp4',
  avatarSrc: 'video/chatgpt-image-avatar.mp4',
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT Images 2.0',
      label: 'CREATIVE ASSISTANTS',
      durationInFrames: 90,
    },

    // 2 — Hook (0:00 → 0:16.76, ~16.8s)
    // VO: "That framework visual that uses it in your designer's queue for three days
    //      can now be done before your next meeting. The new ChatGPT images is the
    //      version that makes AI image generation actually practical for executive work."
    {
      layout: 'label-title-body',
      label: 'CHATGPT IMAGES 2.0',
      title: 'AI image generation that\'s\nactually practical for work',
      body: [
        'That framework visual stuck in a 3-day designer queue?',
        'Done before your next meeting.',
      ],
      bodyTimings: [0, 109],
      image: 'images/chatgpt-image/hero.webp',
      imageHeight: 600,
      durationInFrames: 413,
    },

    // 3 — Three key changes (0:16.76 → 0:46.96, ~30.2s)
    // VO: "First: text inside images now renders cleanly — makes or breaks infographics.
    //      Number two: instruction following is more precise — hierarchy, grouping, flows.
    //      Finally: iterative editing now works — refine without rebuilding from scratch."
    {
      layout: 'label-title-body',
      label: 'WHAT CHANGED',
      title: 'Three improvements that make it\nwork for executive-grade output',
      body: [
        'Text renders cleanly: makes or breaks any real infographic',
        'Instruction following is precise: specify hierarchy, grouping, and visual flows',
        'Iterative editing works: refine the draft without rebuilding from scratch',
      ],
      bodyTimings: [85, 353, 676],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 906,
    },

    // 4 — Use case context (0:46.96 → 0:58.16, ~11.2s)
    // VO: "Let me show you a typical use case — turning a complex idea into a single
    //      page visual that you can reuse across decks, keynotes, and strategy documents."
    {
      layout: 'big-statement',
      label: 'THE USE CASE',
      text: 'Turn a complex idea into\na single-page visual.',
      highlight: 'single-page visual.',
      animation: 'fade',
      lineTimings: [0, 90],
      durationInFrames: 336,
    },

    // 5 — Access & open (0:58.16 → 1:17.00, ~18.8s)
    // VO: "Open ChatGPT in the browser, desktop app, or mobile. Type /create image,
    //      select the Images button, or just prompt that you want to create a visual —
    //      it will pick up on that."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-image.mp4',
      videoStartTime: 58.16,
      label: 'GETTING STARTED',
      title: 'Open ChatGPT and start an image',
      body: [
        'Web, desktop app, or mobile — works on all three',
        'Type /create image, click Images, or just describe what you want',
      ],
      bodyTimings: [0, 168],
      overlayPosition: 'bottom',
      durationInFrames: 565,
    },

    // 6 — Write the brief (1:17.00 → 1:47.92, ~30.9s)
    // VO: "Prompting it to create a single-page infographic about the co-pilot economy.
    //      The brief specifies style, structure, hierarchy, constraints, and an explicit
    //      instruction not to invent content — prevents confident-looking fabrications.
    //      You can also upload an image as a style reference for even more control."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-image.mp4',
      videoStartTime: 77.00,
      label: 'STEP 1',
      title: 'Write a brief, not just a prompt',
      body: [
        'Specify style, structure, hierarchy, and constraints in one go',
        '"Do not invent content" — prevents confident-looking fabrications',
        'Upload a style reference image for even more visual control',
      ],
      bodyTimings: [181, 357, 725],
      overlayPosition: 'bottom',
      durationInFrames: 928,
    },

    // 7 — Review the output (1:47.92 → 2:14.36, ~26.4s)
    // VO: "Before touching it, scan for: misspelled labels; whether the visual hierarchy
    //      matches how you'd explain it verbally; whether concepts are missing or overstated;
    //      and whether someone unfamiliar with the topic would still follow the flow."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-image.mp4',
      videoStartTime: 107.92,
      label: 'STEP 2',
      title: 'Review it like a designer\'s first draft',
      body: [
        'Check for misspelled labels',
        'Does the visual hierarchy match how you\'d explain it verbally?',
        'Any concepts missing, overstated, or unclear to a new viewer?',
        'Would someone unfamiliar with the topic still follow the flow?',
      ],
      bodyTimings: [158, 221, 392, 486],
      panelLayout: 'cards-left',
      durationInFrames: 793,
    },

    // 8 — Iterate with direction (2:14.36 → 2:36.56, ~22.2s)
    // VO: "Type into the same thread: 'Simplify layout, increase white space, make
    //      section headers more prominent, reduce visual density in the bottom section.'
    //      By directing rather than reprompting, ChatGPT adjusts the existing composition
    //      rather than regenerating from scratch."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-image.mp4',
      videoStartTime: 134.36,
      durationInFrames: 666,
    },

    // 9 — Download + sidebar (2:36.56 → 2:54.52, ~18.0s)
    // VO: "Once it passes my four-point check, download. ChatGPT also saves all
    //      generated images under Images in the sidebar — return to any of them
    //      later without searching through your chat history."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-image.mp4',
      videoStartTime: 156.56,
      avatarPosition: 'bottom-left',
      durationInFrames: 539,
    },

    // 10 — Availability & notes (2:54.52 → 3:18.16, ~23.3s)
    // VO: "Images 2.0 is now available to all ChatGPT users including free tier,
    //      but generation limits vary by plan. Plus and Pro additionally get higher
    //      output quality and priority access during peak demand. Best on web;
    //      mobile and desktop support it but may not carry all features."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY & NOTES',
      title: 'ChatGPT Images 2.0',
      body: [
        'Available to all ChatGPT users — including the free tier',
        'Generation limits vary by plan; Plus and Pro get higher quality + priority access',
        'Best on web; mobile and desktop apps may not carry all features',
      ],
      bodyTimings: [30, 182, 533],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 700,
    },

    // 11 — Use it for (image marquee closer, 3:18.16 → end, ~22.6s)
    {
      layout: 'image-marquee',
      label: 'USE IT FOR',
      title: 'Keynotes · Decks · Strategy Reviews · LinkedIn Visuals · Marketing Assets',
      images: [
        'images/chatgpt-image/hero.webp',
        'images/chatgpt-image/images-2-academic-poster.webp',
        'images/chatgpt-image/images-2-cantor.webp',
        'images/chatgpt-image/images-2-design-trends.webp',
        'images/chatgpt-image/images-2-lecture-hall.webp',
        'images/chatgpt-image/images-2-wolf-magazine.webp',
        'images/chatgpt-image/visual-polyglot.webp',
        'images/chatgpt-image/motion-breakdown.webp',
      ],
      durationInFrames: 679,
    },
  ],
};
