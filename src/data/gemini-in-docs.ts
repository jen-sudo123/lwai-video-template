import { VideoData } from '../scenes/types';

// Gemini in Google Docs — Tutorial / demo video
// Audio: audio/gemini-in-docs.mp3 — VO ends at ~229.84s, file is ~231.37s.
// Video: video/gemini-in-docs.mp4 — screen recording with embedded VO.
// Scenes aligned to whisper-extracted segment timestamps.
//
//  scene                                | VO start   | VO end    | dur (frames @30fps)
//  -------------------------------------|------------|-----------|--------------------
//  1  title card (silent intro)         |  0.00      |  3.00     |   90
//  2  video-clip (hook)                 |  3.00      | 14.88     |  356
//  3  video-clip (access Gemini)        | 14.88      | 30.48     |  468
//  4  video-clip (create from prompt)   | 30.48      | 49.42     |  568
//  5  video-clip (draft generated)      | 49.42      | 58.34     |  268
//  6  video-clip (refine text)          | 58.34      | 86.02     |  830
//  7  video-clip (match writing style)  | 86.02      | 95.16     |  274
//  8  video-clip (sources)              | 95.16      | 114.38    |  577
//  9  video-clip (web + gmail)          | 114.38     | 141.22    |  805
// 10  video-clip (pull into doc)        | 141.22     | 155.36    |  424
// 11  video-clip (source constraint)    | 155.36     | 167.66    |  369
// 12  video-clip (generate images)      | 167.66     | 183.78    |  484
// 13  video-clip (audio tools)          | 183.78     | 198.40    |  439
// 14  big-statement (closing)           | 198.40     | 210.54    |  364
// 15  label-title-body (pricing)        | 210.54     | 231.37    |  625
//                                                       total      6941

export const geminiInDocs: VideoData = {
  audioSrc: 'audio/gemini-in-docs.mp3',
  clipSrc: 'video/gemini-in-docs.mp4',
  avatarSrc: 'avatar-gemini-in-docs.mp4',
  avatarHideRanges: [{ from: 5550, to: 5947 }], // 03:05.00 → 03:18.23
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'Gemini in Google Docs',
      label: 'Writing Assistants',
      durationInFrames: 90,
    },

    // 2 — Hook (0:03.00 → 0:14.88, ~11.9s)
    // VO: "...you will love how Google has integrated Gemini directly into
    //      Google Docs, allowing you to create, edit, refine, and even
    //      listen to your content all within the document editor."
    {
      layout: 'label-title-body',
      label: 'GEMINI IN GOOGLE DOCS',
      title: 'Create, edit, refine, and listen: all in the document editor',
      body: [
        'Gemini is built directly into Google Docs',
      ],
      bodyTimings: [120],
      image: 'images/gemini-in-docs/hero.jpg',
      imageHeight: 650,
      durationInFrames: 356,
    },

    // 3 — Accessing Gemini features (0:14.88 → 0:30.48, ~15.6s)
    // VO: "So here is a blank Google Doc. You can see the Gemini features
    //      at the bottom as a prompt bar with preset options, and you can
    //      also open up Gemini in a sidebar on the right."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 14.88,
      label: 'GETTING STARTED',
      title: 'Prompt bar and Gemini sidebar',
      body: [
        'Bottom prompt bar with preset options',
        'Gemini sidebar on the right for extended conversations',
      ],
      bodyTimings: [60, 240],
      overlayPosition: 'top',
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 60,  scale: 1.6, originX: 50, originY: 85 }, // zoom bottom prompt bar
        { startFrame: 180, scale: 1.0, originX: 50, originY: 50 }, // zoom out
        { startFrame: 240, scale: 1.6, originX: 98, originY: 15 }, // zoom right sidebar (top-right)
      ],
      durationInFrames: 468,
    },

    // 4 — Create a document from a prompt (0:30.48 → 0:49.42, ~19s)
    // VO: "...create a one-pager for my leadership team...reference existing
    //      files by typing @ and selecting a document from Drive...match the
    //      structure, style, or formatting of an existing document."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 30.48,
      label: 'CREATE',
      title: 'Generate a document from a prompt',
      body: [
        'Reference files from Drive with @mentions',
        'Match structure, style, or formatting of existing docs',
      ],
      bodyTimings: [220, 370],
      clipZoomKeyframes: [
        { startFrame: 0,  scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 50, scale: 1.5, originX: 85, originY: 72 }, // zoom Gemini sidebar suggestions
      ],
      durationInFrames: 568,
    },

    // 5 — Draft generated directly (0:49.42 → 0:58.34, ~8.9s)
    // VO: "And now Gemini generates a draft directly in this doc, and then
    //      from there, I can review, edit, and decide what to keep."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 49.42,
      label: 'REVIEW',
      title: 'Draft appears directly in your document',
      clipZoomKeyframes: [
        { startFrame: -30, scale: 1.5, originX: 85, originY: 72 }, // carry over zoom from scene 4
        { startFrame: 79,  scale: 1.0, originX: 50, originY: 50 }, // zoom out at 00:52.04
      ],
      durationInFrames: 268,
    },

    // 6 — Refine existing text (0:58.34 → 1:26.02, ~27.7s)
    // VO: "Gemini can also refine existing texts...highlight a paragraph
    //      and choose refine with options like rephrase, shorten, elaborate,
    //      and adjust tone...type a custom instruction...accept or reject it,
    //      just like collaborating with a colleague in real time."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 58.34,
      label: 'REFINE',
      title: 'Edit and refine existing text',
      body: [
        'Rephrase, shorten, elaborate, or adjust tone',
        'Type custom instructions like "make this more executive"',
        'Accept or reject, like collaborating with a colleague',
      ],
      bodyTimings: [100, 350, 580],
      overlayPosition: 'top-right',
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 148, scale: 1.3, originX: 42, originY: 58 }, // zoom document content
      ],
      durationInFrames: 830,
    },

    // 7 — Match writing style (1:26.02 → 1:35.16, ~9.1s)
    // VO: "I can even use match writing style to unify it throughout the
    //      document, which is super helpful."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 86.02,
      label: 'CONSISTENCY',
      title: 'Match writing style across the entire document',
      overlayPosition: 'top',
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 165, scale: 1.5, originX: 57, originY: 63 }, // zoom inline refine popup
        { startFrame: 240, scale: 1.0, originX: 50, originY: 50 }, // zoom out
      ],
      durationInFrames: 274,
    },

    // 8 — Sources beyond the document (1:35.16 → 1:54.38, ~19.2s)
    // VO: "Gemini in docs can work with sources beyond the current document...
    //      pull in things from Drive, Gmail, Chat, Calendar, and even web search...
    //      turn on web search and ask for frameworks related to AI fluency."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 95.16,
      label: 'RESEARCH',
      title: 'Pull sources from across your workspace',
      body: [
        'Drive, Gmail, Chat, Calendar, and web search',
        'Turn on web search and ask questions directly',
      ],
      bodyTimings: [100, 370],
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 184, scale: 1.5, originX: 88, originY: 60 }, // zoom Gemini sidebar sources
        { startFrame: 440, scale: 1.0, originX: 50, originY: 50 }, // gradual zoom out (ends ~frame 500)
      ],
      durationInFrames: 577,
    },

    // 9 — Web search + Gmail scan (1:54.38 → 2:21.22, ~26.8s)
    // VO: "I then get some references that I can review...search Gmail for
    //      discussions about our AI fluency matrix...Gemini will scan any
    //      permitted emails and cite them so I can verify the source...compare
    //      our matrix to external frameworks and highlight gaps."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 114.38,
      label: 'IN ACTION',
      title: 'Search the web and scan Gmail',
      body: [
        'Find references and review them in context',
        'Search Gmail for discussions and summarize themes',
        'Citations let you verify every source',
      ],
      bodyTimings: [30, 220, 470],
      durationInFrames: 805,
    },

    // 10 — Pull analysis into the document (2:21.22 → 2:35.36, ~14.1s)
    // VO: "And once I find the analysis helpful, then I can ask Gemini to
    //      pull it directly into the document...update the lead with AI
    //      fluency mapping recommendation to address these gaps."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 141.22,
      label: 'INTEGRATE',
      title: 'Pull analysis directly into the document',
      durationInFrames: 424,
    },

    // 11 — Source constraint tip (2:35.36 → 2:47.66, ~12.3s)
    // VO: "Now, one important note here, if a specific source is selected,
    //      Gemini only searches within that constraint and you need to
    //      deselect it before asking Gemini to look elsewhere."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 155.36,
      label: 'TIP',
      title: 'Deselect a source before switching to another',
      body: [
        'Gemini only searches within the selected source constraint',
      ],
      bodyTimings: [80],
      overlayPosition: 'top',
      durationInFrames: 369,
    },

    // 12 — Generate images (2:47.66 → 3:03.78, ~16.1s)
    // VO: "...you can generate images directly in Google Docs. If you click
    //      on insert and then image and then generate an image, you can
    //      prompt it just like a normal image generator."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 167.66,
      label: 'IMAGES',
      title: 'Generate images directly in Docs',
      body: [
        'Insert > Image > Generate an image',
        'Prompt it like a normal image generator',
      ],
      bodyTimings: [120, 300],
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 265, scale: 1.6, originX: 10, originY: 12 }, // zoom doc outline — far left + top
        { startFrame: 340, scale: 1.0, originX: 50, originY: 50 }, // zoom out
        { startFrame: 410, scale: 1.8, originX: 100, originY: 65 }, // zoom image gallery — far right
      ],
      durationInFrames: 484,
    },

    // 13 — Audio tools (3:03.78 → 3:18.40, ~14.6s)
    // VO: "And under tools and audio, you can listen to the document,
    //      generate an audio summary or even insert an audio button
    //      to the document."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-docs.mp4',
      videoStartTime: 183.78,
      label: 'AUDIO',
      title: 'Listen, summarize, and embed audio',
      body: [
        'Listen to the full document read aloud',
        'Generate an audio summary',
        'Insert an audio button for readers',
      ],
      bodyTimings: [50, 170, 280],
      overlayPosition: 'top-right',
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.0, originX: 50, originY: 50 }, // full view
        { startFrame: 85,  scale: 1.6, originX: 28, originY: 35 }, // zoom Tools menu dropdown
        { startFrame: 244, scale: 1.0, originX: 50, originY: 50 }, // zoom out
      ],
      durationInFrames: 439,
    },

    // 14 — Closing statement (3:18.40 → 3:30.54, ~12.1s)
    // VO: "And with all of these features built in, Gemini makes document
    //      creation, editing and research faster and more interactive
    //      without ever leaving the workspace that you're already in."
    {
      layout: 'big-statement',
      text: "Faster creation, editing, and research\nwithout leaving your workspace.",
      highlight: 'without leaving your workspace',
      fontSize: 62,
      animation: 'fade',
      lineTimings: [0, 258],
      durationInFrames: 364,
    },

    // 15 — Pricing / access (3:30.54 → 3:51.37, ~20.8s)
    // VO: "For personal users, key Gemini in Docs features are available on
    //      the Google AI Pro and Ultra Plans. And for business users, full
    //      feature access requires business standard, business plus,
    //      enterprise standard or enterprise plus, while business starter
    //      has more limited access."
    {
      layout: 'label-title-body',
      label: 'PLANS & ACCESS',
      title: 'How to get Gemini in Docs',
      body: [
        'Personal: Google AI Pro or Ultra plan',
        'Business: Standard, Plus, Enterprise Standard, or Enterprise Plus',
        'Business Starter: More limited Gemini access',
      ],
      bodyTimings: [40, 230, 480],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'briefcase', 'building-office'],
      durationInFrames: 625,
    },
  ],
};
