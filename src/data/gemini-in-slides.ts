import { VideoData } from '../scenes/types';

// Gemini in Google Slides — Tutorial / demo video
// Audio: audio/gemini-in-slides.mp3 — extracted from screen recording
// Video: video/gemini-in-slides.mp4 — 233.6s screen recording with embedded VO
// Scenes aligned to Whisper-extracted segment timestamps (tiny model).
//
//  scene                                | VO start   | VO end    | dur (frames @30fps)
//  -------------------------------------|------------|-----------|--------------------
//  1  title card (silent intro)         |  —         |  —        |   90
//  2  label-title-body (hook)           |  0.00      |  15.00    |  450
//  3  label-title-body (two ways)       | 15.00      |  36.00    |  630
//  4  video-clip (Slides: open+prompt)  | 36.00      |  59.00    |  690
//  5  video-clip (slide generated)      | 59.00      |  75.00    |  480
//  6  video-clip (style match+Drive)    | 75.00      |  89.00    |  420
//  7  label-title-body (Canvas bridge)  | 89.00      | 100.00    |  330
//  8  video-clip (Canvas prompt)        |100.00      | 123.00    |  690
//  9  video-clip (Canvas generating)    |123.00      | 139.00    |  480
// 10  video-clip (output + export)      |139.00      | 157.00    |  540
// 11  label-title-body (plans)          |157.00      | 199.00    | 1260
// 12  big-statement (closing)           |199.00      | 223.00    |  720
// 13  label-title-body (quick guide)    |223.00      | 231.00    |  240
//                                                       total      7020

export const geminiInSlides: VideoData = {
  audioSrc: 'video/gemini-in-slides.mp4',
  clipSrc: 'video/gemini-in-slides.mp4',
  avatarSrc: 'video/gemini-in-slides-avatar.mp4',
  scenes: [
    // 1 — Title card
    {
      layout: 'title-card-green',
      title: 'Gemini in Google Slides',
      label: 'Google Workspace',
      durationInFrames: 90,
    },

    // 2 — Hook (0:00 → 0:15, ~15s)
    // VO: "Most leaders are still building a presentation the way that they
    //      did in 2010. Grab a blank slide, write a headline, write some
    //      content. Gemini changes that completely. And there's two ways to
    //      tap Google's AI for slides."
    {
      layout: 'label-title-body',
      label: 'STILL BUILDING DECKS LIKE 2010?',
      title: 'Most leaders build a presentation the same way they did in 2010',
      body: [
        'Blank slide: Start with an empty canvas every single time',
        'Write a headline: Manually draft each title from scratch',
        'Write content: Fill in body text slide by slide',
      ],
      bodyTimings: [60, 150, 240],
      bodyRight: true,
      bodyCards: true,
      bodyCardBouncy: true,
      bodyCardCompact: true,
      bodyCardIcons: ['pencil', 'pencil', 'pencil'],
      durationInFrames: 450,
    },

    // 3 — Two ways overview (0:15 → 0:36, ~21s)
    // VO: "The first one is inside Google Slides itself, which is where Gemini
    //      works as a side panel that can generate one slide at a time, and
    //      automatically match your existing deck's style and colors. And then
    //      inside the Gemini web app where you can prompt it, and it will
    //      generate an entire deck for you using the Canvas feature."
    {
      layout: 'label-title-body',
      label: 'TWO APPROACHES',
      title: 'Side panel in Slides, or Canvas in the web app',
      body: [
        'Gemini side panel: one slide at a time, matches your deck style',
        'Gemini Canvas: full deck from a single prompt',
      ],
      bodyTimings: [0, 420],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'bolt'],
      durationInFrames: 630,
    },

    // 4 — Gemini in Slides: open + prompt (0:36 → 0:59, ~23s)
    // VO: "So let's start with Gemini in Slides. So inside Google Slides I
    //      can open up Gemini as a side panel, and then just provide a prompt
    //      to generate a slide. So here I'm asking for a slide about AI
    //      transformation pitfalls, and I give it some information about what
    //      should be on that slide. Then here I hit send, and now Gemini
    //      creates the slide, and then the slide is fully editable."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 36,
      durationInFrames: 690,
    },

    // 5 — Slide generated + editable (0:59 → 1:15, ~16s)
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 59,
      durationInFrames: 480,
    },

    // 6 — Style match + Drive references (1:15 → 1:30, trimmed to make room for title card)
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 75,
      durationInFrames: 385,
    },

    // 6b — "Gemini Canvas" section title (1:30.25 → 1:33.20, 85 frames)
    {
      layout: 'big-statement',
      text: 'Gemini Canvas',
      fontSize: 80,
      animation: 'fade',
      durationInFrames: 85,
    },

    // 7 — Gemini Canvas bridge (1:29 → 1:40, ~11s)
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 89,
      durationInFrames: 330,
    },

    // 8 — Canvas prompt (1:40 → 2:03, ~23s)
    // VO: "Here I can give Gemini a brief as a prompt... I have to give a
    //      presentation to my leadership team on how we prepare our company
    //      for a world where AI disrupts significantly, make the case for
    //      adopting the AI fluency matrix... create 10 fully formatted slides
    //      for me. Now, including the phrase 'create fully formatted slides'
    //      is important because otherwise it may only create the content
    //      instead of the presentation."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 103,
      durationInFrames: 690,
    },

    // 9 — Canvas generating (2:03 → 2:19, ~16s)
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 131,
      durationInFrames: 480,
    },

    // 10 — Canvas output + export (2:19 → 2:38, trimmed to hit Plans & Access at 02:38.16)
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-slides.mp4',
      videoStartTime: 148,
      durationInFrames: 446,
    },

    // 11 — Plans & Access (2:37 → 3:19, ~42s)
    // VO: "Now, a couple of practical notes, your access to Gemini for
    //      presentations will vary by plan and admin settings, but it should
    //      be available if you have Google AI Pro or Ultra or Google Workspace
    //      Business Standard and above. Canvas specifically is available only
    //      on the Gemini web app. In Google Slides you get that side panel
    //      instead... In terms of sharing on workspace accounts that may be
    //      restricted to your own domain, you would have to export it to
    //      Google Slides before you can share anything externally. And if you
    //      don't see any of these features on your business accounts, then you
    //      may need to talk to your IT admin."
    {
      layout: 'label-title-body',
      label: 'PLANS & ACCESS',
      title: 'Who can use Gemini for presentations',
      body: [
        'Personal: Google AI Pro or Ultra plan',
        'Business: Google Workspace Business Standard and above',
        'Canvas: Gemini web app only — Slides gives you the side panel',
        'Restricted Workspace accounts: export before sharing externally',
      ],
      bodyTimings: [0, 210, 450, 810],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'briefcase', 'building-office'],
      durationInFrames: 1260,
    },

    // 12 — Closing big-statement (3:19 → 3:43, ~24s)
    // VO: "But generally, these are really helpful tools to create slides in
    //      the modern way, so the next time that you're staring at a blank
    //      slide deck and you need something in the next 30 minutes, then
    //      this is what you open. Right, it won't replace a designer or a
    //      writer for a keynote, but for that weekly update or an internal
    //      page or strategy recap that you need by end of day, it gets you
    //      from the blank page to a working deck very fast."
    {
      layout: 'big-statement',
      text: "Blank deck, 30 minutes on the clock.\nThis is what you open.\nNot for the keynote. For every other deck\nyou need by end of day.",
      highlight: 'for every other deck\nyou need by end of day',
      fontSize: 52,
      animation: 'fade',
      lineTimings: [0, 300, 480, 480],
      durationInFrames: 720,
    },

    // 13 — Quick guide recap (3:43 → 3:51, ~8s)
    // VO: "For quick updates or single slide edits, that's where you want to
    //      use the Gemini side panel, otherwise use Canvas for the full
    //      slides."
    {
      layout: 'label-title-body',
      label: 'QUICK GUIDE',
      title: 'The right tool for the job',
      body: [
        'Single slides or edits → Gemini side panel in Google Slides',
        'Full deck from scratch → Gemini Canvas in the web app',
      ],
      bodyTimings: [0, 120],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'bolt'],
      durationInFrames: 240,
    },
  ],
};
