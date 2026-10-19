import { VideoData } from '../scenes/types';

// Claude Design — Tutorial / demo video
// Audio: audio/claude-design.mp3 (289.79s) — extracted directly from the screen recording's own
//        embedded narration track (video/claude-design.mp4), NOT the separate "Claud Design for
//        PPTx.wav" take used in an earlier pass. Video and audio are the same original recording,
//        frame-locked from comp frame 0 — no sync work needed. Whisper transcript (tiny model,
//        segment-level): src/data/claude-design.transcript.txt / .srt
// Video: video/claude-design.mp4 (1024x576 screen recording), played continuously via `clipSrc` —
//        visible only during video-clip scenes, hidden (opacity 0, but still advancing) elsewhere.
//
// Note: this native narration take does NOT include the "separate credits / weekly design budget"
// section that exists in the standalone WAV — it goes straight from availability into the beta
// caveat into the closing line. Those two extra scenes have been dropped accordingly.
//
//  scene                                        | VO start | VO end | dur (f@30)
//  ---------------------------------------------|----------|--------|------------
//  1  title card                                 |   0.00   |   1.00 |    30
//  2  hook (a new horse in the race)              |   1.00   |  21.88 |   626
//  3  what it can create                          |  21.88   |  41.68 |   594
//  4  video — workspace tour                      |  41.68   |  62.96 |   639
//  5  video — prompt + attach reference            |  62.96   |  88.96 |   780
//  6  video — clarifying questions                 |  88.96   | 107.52 |   557
//  7  video — deck builds w/ speaker notes         | 107.52   | 123.88 |   490
//  8  video — verify the draft                      | 123.88   | 156.48 |   978
//  9  video — ways to refine                        | 156.48   | 177.52 |   632
// 10  video — tweaks: animate brand graphics        | 177.52   | 195.08 |   526
// 11  video — tweaks control panel                  | 195.08   | 203.28 |   246
// 12  video — export options                        | 203.28   | 238.68 |  1062
// 13  availability (plans & sidebar)                | 238.68   | 258.52 |   596
// 14  still in beta                                 | 258.52   | 275.96 |   523
// 15  closing                                       | 275.96   | 289.80 |   415
//                                                              total     8694

export const claudeDesign: VideoData = {
  audioSrc: 'audio/claude-design.mp3',
  clipSrc: 'video/claude-design.mp4',
  scenes: [
    // 1 — Title card (0 → 1.0)
    {
      layout: 'title-card-green',
      title: 'Claude Design',
      label: 'PRESENTATION ASSISTANTS',
      durationInFrames: 30,
    },

    // 2 — Hook (1.0 → 21.88)
    // VO: "There is a new horse in the race for the best AI PowerPoint tool, and maybe
    //      unexpectedly, it's Claude. So Claude Design is a new design creation workspace
    //      that can help you quickly move from an idea or a product concept or a raw
    //      visual direction to a polished design artifact."
    {
      layout: 'label-title-body',
      label: 'CLAUDE DESIGN',
      title: 'A new way to design\nwith Claude',
      body: [
        'The new horse in the AI presentation race',
        'A design creation workspace inside Claude',
        'Moves from a rough idea to a polished design artifact',
      ],
      bodyTimings: [0, 264, 406],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 626,
    },

    // 3 — What it can create (21.88 → 41.68)
    // VO: "What makes Claude Design different is that it's not limited to just generating
    //      images. You can use it for visuals, pitch decks and presentations... product
    //      wireframes, interactive prototypes, marketing collateral, landing pages, and
    //      entire websites, and even code-powered prototypes that include richer interactions."
    {
      layout: 'label-title-body',
      label: 'WHAT IT CAN CREATE',
      title: 'One workspace,\nmany kinds of design',
      body: [
        'Visuals, pitch decks, and presentations',
        'Product wireframes and interactive prototypes',
        'Marketing collateral and landing pages',
        'Entire websites and code-powered prototypes',
      ],
      bodyTimings: [138, 277, 349, 449],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 594,
    },

    // 4 — Workspace tour (41.68 → 62.96)
    // VO: "Again, for this demo, we'll use Claude Design to create a 10-slide presentation,
    //      I think it's one of the best use cases at this point. Claude Design is a separate
    //      workspace from the standard Claude chat, so you can access it either from the
    //      sidebar, or you can go on the website to claude.ai/design."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 41.67,
      durationInFrames: 639,
    },

    // 5 — Prompt + attach reference (62.96 → 88.96)
    // VO: "But now here, I am in Claude Design, and for this demo, I choose slides as the
    //      output format. So on the left, I have the chat and the project controls, and on
    //      the right, I have the canvas where the deck will appear. So I'm going to paste
    //      the prompt here and ask Claude Design to create a presentation for my leadership
    //      team about how we should prepare the company for a world where AI disrupts our
    //      industry significantly, using the outline in my reference file."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 62.97,
      durationInFrames: 780,
    },

    // 6 — Clarifying questions (88.96 → 107.52)
    // VO: "Now, before Claude starts building and designing, it will ask a few clarifying
    //      questions, and this is one of the most useful parts of the interface, because I
    //      can quickly click on the options rather than just replying in chat. Once I have
    //      answered all of these questions, I click on Continue, and now Claude will build..."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 88.97,
      durationInFrames: 557,
    },

    // 7 — Deck builds with speaker notes (107.52 → 123.88)
    // VO: "...the presentation on the canvas. I can see it working through the source, I can
    //      see it creating the deck, and even applying my own design system. And so in this
    //      example, it produced a 10-slide leadership briefing, even with speaker notes.
    //      Pretty incredible."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 107.53,
      durationInFrames: 490,
    },

    // 8 — Verify the draft (123.88 → 156.48)
    // VO: "Now, of course, I want to verify before I make any final changes, so I'm going to
    //      check the title, the slide sequence, the speaker notes, and also whether Claude
    //      used the right section of the reference file. I can also look in case anything
    //      was generated for any unsupported claims, maybe some made-up examples, or
    //      anything that we wouldn't stand for. I'm also reviewing the design itself —
    //      sometimes there are elements where things are a little bit too small to read,
    //      which I can then change here in Claude Design."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 123.87,
      durationInFrames: 978,
    },

    // 9 — Ways to refine (156.48 → 177.52)
    // VO: "So now, as the next step, I want to refine the presentation, right? So it's great
    //      that we have a first draft here, but I definitely want to make a couple of tweaks
    //      to make the presentation a bit more engaging. Now Claude gives me several ways to
    //      adjust the deck: I can use chat, I can use the tweaks panel, I can use
    //      annotations, or I can do direct text editing on the slides."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 156.47,
      durationInFrames: 632,
    },

    // 10 — Tweaks: animate brand graphics (177.52 → 195.08)
    // VO: "So let's click here on the tweaks button, and then type something like 'animate
    //      the brand graphics,' and Claude automatically sends this instruction to the chat.
    //      And then updates the deck, and I can see the graphics floating on the side.
    //      Pretty neat."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 177.53,
      durationInFrames: 526,
    },

    // 11 — Tweaks control panel (195.08 → 203.28)
    // VO: "The tweaks button then becomes a control panel where I can also turn the
    //      animation on or off, or even select different animation styles."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 195.07,
      durationInFrames: 246,
    },

    // 12 — Export options (203.28 → 238.68)
    // VO: "Once I feel like the presentation is fully ready, I can go to share, and then to
    //      export, and then depending on the project, I could see PDF, video, PowerPoint,
    //      project archive, standalone HTML, or other options to send it to other apps. For
    //      this workflow, obviously, I'm going to choose PowerPoint, because I need editable
    //      slides for my leadership meeting, and if I were sharing an interactive briefing,
    //      then I would choose the standalone HTML option. And then from here, the deck is
    //      ready to finalize in PowerPoint, and then move it into your leadership meeting,
    //      your workshop, your internal update, or your strategy review."
    {
      layout: 'video-clip',
      videoSrc: 'video/claude-design.mp4',
      videoStartTime: 203.27,
      durationInFrames: 1062,
    },

    // 13 — Availability (238.68 → 258.52)
    // VO: "Now, some practical notes. Claude Design is available for Claude Pro, Max, Team,
    //      and Enterprise subscribers. And in many accounts, you will see it directly in the
    //      left sidebar as Design, and if you don't see it there — especially in companies —
    //      then maybe your team or Enterprise admin has not enabled it yet."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Who can use\nClaude Design',
      body: [
        'Available for Pro, Max, Team, and Enterprise plans',
        'Usually visible in the left sidebar as Design',
        'Enterprise admins may need to enable it first',
      ],
      bodyTimings: [0, 233, 370],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 596,
    },

    // 14 — Still in beta (258.52 → 275.96)
    // VO: "The second is that Claude Design is still in beta, so I can use it as a
    //      high-speed drafting and prototyping workspace, but it's not really ready for
    //      final approvals, and that's why I would typically export to PowerPoint, or
    //      maybe HTML, and then make some edits."
    {
      layout: 'label-title-body',
      label: 'STILL IN BETA',
      title: 'Great for drafting,\nnot for final sign-off',
      body: [
        'A high-speed drafting and prototyping workspace',
        'Not yet ready for final approvals',
        'Export to PowerPoint or HTML, then make final edits',
      ],
      bodyTimings: [0, 180, 348],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 523,
    },

    // 15 — Closing (275.96 → 289.80)
    // VO: "So make sure that you verify everything and don't ship anything that you
    //      wouldn't stand for yourself. So that's Claude Design, a very helpful new way to
    //      create artifacts with AI."
    {
      layout: 'big-statement',
      text: 'Verify everything.\nDon\'t ship anything you wouldn\'t stand for.',
      highlight: 'Verify everything.',
      label: 'CLAUDE DESIGN',
      size: 'title',
      durationInFrames: 415,
    },
  ],
};
