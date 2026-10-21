import { VideoData } from '../scenes/types';

// Video 4 — Where Should the Human Stay in Control? (Team Action Follow-Up agent, Copilot Studio).
// Audio: audio/agent-boundaries.mp3 — Daan, eleven_v4, 312.6s, NOT padded (title card plays over the
//        VO opening; audioStartFrame = 0). comp_frame = round(t * 30).
// Images: agent-boundaries/images/01..14-*.jpg — screenshots only, no screen recording, no avatar.
// Transcript: src/data/agent-boundaries.transcript.json (ElevenLabs Scribe, word timestamps).
// Scene starts sit 0.25s before the scene's first word. Card reveals: no lead.
// FadeText reveals (split-contrast bodies, big-statement lines): 8-frame lead.
// Storyboard: videos/agent-boundaries/01-brief/storyboard.md
//
//  scene                                     | start (s) | dur (frames)
//  1  title-card-green                       |    0.00   |   90
//  2  label-title-body (yesterday recap)     |    3.00   |  150
//  3  big-statement (can do / should do)     |    8.00   |  189
//  4  big-statement (autonomy is a dial)     |   14.30   |  125
//  5  label-title-body (dial, 3 cards)       |   18.45   |  370
//  6  label-title-body + 01 build plan       |   30.80   |  404
//  7  label-title-body + 02 (the example)    |   44.25   |  252
//  8  label-title-body + 02 (tools panel)    |   52.65   |  241
//  9  label-title-body + 03 (tool details)   |   60.70   |  423
//  10 split-contrast (can / can't)           |   74.80   |  663
//  11 big-statement (key distinction)        |   96.90   |  300
//  12 checklist-slide (review your tools)    |  106.90   |  359
//  13 label-title-body (needs approval)      |  118.85   |  368
//  14 big-statement (leave it out)           |  131.15   |  218
//  15 big-statement (simplest, strongest)    |  138.40   |  144
//  16 label-title-body (confirmation)        |  143.20   |  296
//  17 split-contrast (confirm vs approval)   |  153.05   |  278
//  18 big-statement (proper process)         |  162.35   |  282
//  19 label-title-body (rule for now)        |  171.75   |  305
//  20 big-statement (right autonomy)         |  181.90   |  228
//  21 label-title-body (human judgment)      |  189.50   |  511
//  22 big-statement (don't invent, ask)      |  206.55   |  251
//  23 label-title-body + 04 (instructions)   |  214.90   |  617
//  24 process-steps (boundary test)          |  235.45   |  583
//  25 centered-image-caption 05              |  254.90   |   84
//  26 centered-image-caption 06 (test 1)     |  257.70   |  189
//  27 centered-image-caption 07              |  264.00   |   72
//  28 centered-image-caption 08              |  266.40   |   99
//  29 centered-image-caption 09              |  269.70   |   99
//  30 centered-image-caption 10              |  273.00   |  174
//  31 centered-image-caption 11 (test 2)     |  278.80   |  291
//  32 centered-image-caption 12              |  288.50   |  135
//  33 centered-image-caption 13              |  293.00   |  120
//  34 centered-image-caption 14              |  297.00   |   62
//  35 takeaway-stack (before you move on)    |  299.05   |  436   (VO ends 312.72s)
//                                                 total   9408

const img = (name: string) => `agent-boundaries/images/${name}.jpg`;

export const agentBoundaries: VideoData = {
  audioSrc: 'audio/agent-boundaries.mp3',
  audioStartFrame: 0,
  scenes: [
    // 1 (0.00s) — "Yesterday, you created your agent"
    {
      layout: 'title-card-green',
      title: 'Where Should the Human Stay in Control?',
      label: 'MICROSOFT COPILOT STUDIO',
      durationInFrames: 90,
    },

    // 2 (3.00s) — "CODO" 3.44 / "connected" 5.28
    {
      layout: 'label-title-body',
      label: 'YESTERDAY',
      title: 'You built\nyour agent',
      body: [
        'Instructions: detailed CODO instructions',
        'Connections: the information and tools it needs',
      ],
      bodyTimings: [13, 68],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'compare'],
      durationInFrames: 150,
    },

    // 3 (8.00s) — "can do something" 9.68 / "independently" 12.96
    {
      layout: 'big-statement',
      text: 'Can do is not\nshould do on its own',
      highlight: 'should do',
      animation: 'kinetic',
      durationInFrames: 189,
    },

    // 4 (14.30s) — "autonomy being a dial" 16.68–18.16
    {
      layout: 'big-statement',
      text: 'Autonomy is a dial',
      highlight: 'dial',
      animation: 'kinetic',
      durationInFrames: 125,
    },

    // 5 (18.45s) — "independently" 25.20 / "requires approval" 26.64 / "a person" 28.72
    {
      layout: 'label-title-body',
      label: 'THE AUTONOMY DIAL',
      title: 'You decide,\naction by action',
      body: [
        'Independent: what it can do on its own',
        'Approval: what needs a human OK first',
        'Step in: when a person takes over',
      ],
      bodyTimings: [202, 246, 308],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'check', 'user'],
      durationInFrames: 370,
    },

    // 6 (30.80s) — "Open Section Four" 31.04 / "already made" 37.44 / "reflected" 41.60
    {
      layout: 'label-title-body',
      label: 'BUILD PLAN, SECTION 4',
      title: 'Where should\nthe human stay\nin control?',
      body: [
        'You already made these decisions',
        'Now make sure your configuration reflects them',
      ],
      bodyTimings: [199, 324],
      image: img('01-build-plan-human-control'),
      imageHeight: 512,
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 30, centerX: 0.47, centerY: 0.33, scale: 2.2 },
      ],
      durationInFrames: 404,
    },

    // 7 (44.25s) — "Team Action Follow-Up Agent" 45.44 / "apply these principles" 49.76
    {
      layout: 'label-title-body',
      label: 'THE EXAMPLE',
      title: 'Team Action\nFollow-Up Agent',
      body: ['Same principles, applied to your own agent'],
      bodyTimings: [165],
      image: img('02-build-connected-tools'),
      imageHeight: 512,
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 30, centerX: 0.3, centerY: 0.2, scale: 2 },
      ],
      durationInFrames: 252,
    },

    // 8 (52.65s) — "what our agent can actually do" 54.08 / "open the Tools" 58.72 / "Tools" 59.28
    {
      layout: 'label-title-body',
      label: 'STEP 1',
      title: 'What can it\nactually do?',
      body: ['Tools: one connected SharePoint tool'],
      bodyTimings: [199],
      image: img('02-build-connected-tools'),
      imageHeight: 512,
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 182, centerX: 0.89, centerY: 0.37, scale: 2.5 },
      ],
      durationInFrames: 241,
    },

    // 9 (60.70s) — "Read Team Action Tracker" 64.32 / "Get items" 69.12 / "retrieve records" 72.32
    {
      layout: 'label-title-body',
      label: 'THE TOOL',
      title: 'Read Team\nAction Tracker',
      body: [
        'Operation: "Get items"',
        'It retrieves records. Nothing more.',
      ],
      bodyTimings: [253, 349],
      image: img('03-read-only-tool-details'),
      imageHeight: 512,
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 109, centerX: 0.4, centerY: 0.17, scale: 2 },
        { startFrame: 253, centerX: 0.45, centerY: 0.25, scale: 1.7 },
      ],
      durationInFrames: 423,
    },

    // 10 (74.80s) — "read information" 79.84 / "compare" 81.24 / "identify" 82.80 / "prepare" 84.80
    //    / "It isn't allowed" 87.12 / "change" 88.32 / "send" 89.84 / "haven't connected" 93.60
    {
      layout: 'split-contrast',
      leftLabel: 'IT CAN',
      leftTitle: 'Read and prepare',
      leftBodies: [
        'Read information',
        'Compare commitments',
        'Identify possible duplicates',
        'Prepare proposed updates',
      ],
      leftBodyTimings: [143, 185, 232, 292],
      rightLabel: "IT CAN'T",
      rightTitle: 'Change or send',
      rightBodies: [
        'Change the tracker',
        'Send messages',
        'No tool connected that could',
      ],
      rightBodyTimings: [398, 443, 556],
      highlights: [
        { from: 0, value: 'left' },
        { from: 362, value: 'right' },
      ],
      durationInFrames: 663,
    },

    // 11 (96.90s) — "Instructions describe" 99.36 / "Configured capabilities" 102.80
    {
      layout: 'big-statement',
      label: 'A KEY DISTINCTION',
      text: 'Instructions: what it should do\nCapabilities: what it can do',
      highlight: 'what it can do',
      animation: 'fade',
      lineTimings: [66, 169],
      fontSize: 72,
      durationInFrames: 300,
    },

    // 12 (106.90s) — "review the tools" 108.36 / "first version doesn't need" 113.76
    {
      layout: 'checklist-slide',
      label: 'YOUR AGENT',
      title: 'Check your tools',
      items: [
        'Compare each connected tool with the authority in your Build Plan',
        "Not needed in version one? Don't connect it",
      ],
      itemTimings: [44, 206],
      accentIndex: 1,
      durationInFrames: 359,
    },

    // 13 (118.85s) — "human approval" 121.04 / "changing a tracker record" 123.52
    //    / "sending a message" 125.12 / "our first version doesn't need" 127.92
    {
      layout: 'label-title-body',
      label: 'NEEDS APPROVAL',
      title: 'What about\nhuman approval?',
      body: [
        'Change: updating a tracker record',
        'Message: sending a message to the team',
        "Version one: doesn't need either action",
      ],
      bodyTimings: [140, 188, 272],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'chat-bubble-left-right', 'check'],
      durationInFrames: 368,
    },

    // 14 (131.15s) — "rather than adding an update tool" 131.76 / "left those capabilities out" 136.44
    {
      layout: 'big-statement',
      text: "Don't add it and control it.\nLeave it out.",
      highlight: 'Leave it out.',
      animation: 'fade',
      lineTimings: [10, 151],
      durationInFrames: 218,
    },

    // 15 (138.40s) — "simplest, and strongest, boundary" 139.28–141.36
    {
      layout: 'big-statement',
      text: 'The simplest, strongest boundary',
      highlight: 'strongest',
      animation: 'kinetic',
      durationInFrames: 144,
    },

    // 16 (143.20s) — "right approach depends" 144.56 / "require confirmation" 150.40
    {
      layout: 'label-title-body',
      label: 'YOUR AGENT',
      title: 'The right approach\ndepends on your design',
      body: ['Confirmation: Copilot Studio can ask before a tool runs'],
      bodyTimings: [216],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check'],
      durationInFrames: 296,
    },

    // 17 (153.05s) — "asking the person using the agent" 153.52 / "formal approval" 158.88
    {
      layout: 'split-contrast',
      leftLabel: 'USER CONFIRMATION',
      leftTitle: 'The user clicks OK',
      leftBody: 'The person using the agent confirms',
      leftBodyDelay: 6,
      rightLabel: 'FORMAL APPROVAL',
      rightTitle: 'An owner signs off',
      rightBody: 'The responsible manager or business owner',
      rightBodyDelay: 175,
      dividerLabel: 'is not',
      highlights: [
        { from: 0, value: 'left' },
        { from: 167, value: 'right' },
      ],
      durationInFrames: 278,
    },

    // 18 (162.35s) — "specific person's approval" 164.16 / "proper approval process" 166.84
    //    / "Not just an instruction" 169.64
    {
      layout: 'big-statement',
      text: "Need a specific person's approval?\nUse a proper approval process.\nNot an instruction to ask.",
      highlight: 'proper approval process.',
      animation: 'fade',
      lineTimings: [46, 127, 211],
      fontSize: 64,
      durationInFrames: 282,
    },

    // 19 (171.75s) — "advanced workflows later" 172.28 / "For now" 174.88 / "don't add" 175.76
    {
      layout: 'label-title-body',
      label: 'THE RULE FOR NOW',
      title: 'No consequential\ncapability without\napproved controls',
      body: [
        'Later: more advanced approval workflows',
        'Now: add it only if approval controls are available and approved',
      ],
      bodyTimings: [16, 103],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['clock', 'check'],
      durationInFrames: 305,
    },

    // 20 (181.90s) — "isn't maximum autonomy" 182.16 / "giving your agent exactly" 185.04
    {
      layout: 'big-statement',
      text: 'Not maximum autonomy.\nThe autonomy your workflow requires.',
      highlight: 'your workflow requires.',
      animation: 'fade',
      lineTimings: [0, 79],
      fontSize: 72,
      durationInFrames: 228,
    },

    // 21 (189.50s) — "The other part" 192.56 / "new commitment ... no owner or deadline" 199.84
    //    / "notes and the tracker might disagree" 203.60
    {
      layout: 'label-title-body',
      label: 'HUMAN JUDGMENT',
      title: 'Teach it when\nto stop and ask',
      titleNote: 'Technical controls are only one part of the picture',
      titleNoteDelay: 0,
      body: [
        'Missing details: a new commitment with no owner or deadline',
        'Conflicting sources: the notes and the tracker disagree',
      ],
      bodyTimings: [310, 423],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'compare'],
      durationInFrames: 511,
    },

    // 22 (206.55s) — "make up the missing information" 209.60 / "ask for clarification" 213.44
    {
      layout: 'big-statement',
      text: "Don't invent it.\nAsk.",
      highlight: 'Ask.',
      animation: 'fade',
      lineTimings: [83, 199],
      durationInFrames: 251,
    },

    // 23 (214.90s) — "back to Instructions" 219.68 / "checking that" 226.68 / "boundaries" 229.92
    //    / "anything important is missing" 231.92
    {
      layout: 'label-title-body',
      label: 'INSTRUCTIONS',
      title: "Check them,\ndon't rewrite them",
      body: [
        'Do your CODO instructions reflect Section 4?',
        'Something missing? Fix it now.',
      ],
      bodyTimings: [353, 511],
      image: img('04-instructions-authority-and-clarification'),
      imageHeight: 512,
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 143, centerX: 0.3, centerY: 0.55, scale: 1.7 },
        { startFrame: 451, centerX: 0.3, centerY: 0.7, scale: 2.2 },
      ],
      durationInFrames: 617,
    },

    // 24 (235.45s) — "go back to Section Four" 240.56 / "Choose one situation" 244.12 / "safe test" 250.96
    {
      layout: 'process-steps',
      label: 'BOUNDARY TEST',
      title: 'Does your agent\nrespect its limits?',
      steps: [
        { title: 'Start from Section 4', body: 'Go back to your Build Plan' },
        { title: 'Choose one situation', body: 'Where it should stop, ask for clarification, or refuse' },
        { title: 'Create a safe test', body: 'Use approved sample information' },
      ],
      stepTimings: [153, 260, 465],
      durationInFrames: 583,
    },

    // 25 (254.90s) — "Let me show you" 255.12
    {
      layout: 'centered-image-caption',
      image: img('05-tracker-before-tests'),
      caption: "Before the tests: Taylor's task is due 11/5",
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.35, centerY: 0.4, scale: 1.8, startFrame: 20 },
      durationInFrames: 84,
    },

    // 26 (257.70s) — "update Taylor's deadline" 259.72 / "send a message" 262.48
    {
      layout: 'centered-image-caption',
      image: img('06-test-1-prohibited-action-prompt'),
      caption: 'Test 1: ask for an action it isn’t allowed to take',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.53, centerY: 0.84, scale: 2, startFrame: 61 },
      durationInFrames: 189,
    },

    // 27 (264.00s) — "The agent explains" 264.24
    {
      layout: 'centered-image-caption',
      image: img('07-test-1-sharepoint-read-output'),
      caption: 'It reads the tracker',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.5, centerY: 0.5, scale: 1.4, startFrame: 10 },
      durationInFrames: 72,
    },

    // 28 (266.40s) — "can't make changes" 265.68–268.08
    {
      layout: 'centered-image-caption',
      image: img('08-test-1-refusal-and-summary'),
      caption: 'It can’t change the tracker or send messages',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.53, centerY: 0.36, scale: 1.9, startFrame: 10 },
      durationInFrames: 99,
    },

    // 29 (269.70s) — "offers to prepare a proposed update" 270.08–272.32
    {
      layout: 'centered-image-caption',
      image: img('09-test-1-unsent-draft'),
      caption: 'Instead, it drafts a proposed update for review',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.52, centerY: 0.62, scale: 1.8, startFrame: 10 },
      durationInFrames: 99,
    },

    // 30 (273.00s) — "Taylor's record hasn't changed" 275.20 / "The boundary held" 277.40
    {
      layout: 'centered-image-caption',
      image: img('10-tracker-after-test-1'),
      caption: 'Taylor’s record hasn’t changed. The boundary held.',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.38, centerY: 0.39, scale: 1.8, startFrame: 66 },
      durationInFrames: 174,
    },

    // 31 (278.80s) — "customer escalation" 281.80 / "pick an owner and a deadline" 286.08
    {
      layout: 'centered-image-caption',
      image: img('11-test-2-missing-information-prompt'),
      caption: 'Test 2: ask it to fill in missing details',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.5, centerY: 0.81, scale: 2, startFrame: 90 },
      durationInFrames: 291,
    },

    // 32 (288.50s) — "no owner or deadline was recorded" 290.80–293.15
    {
      layout: 'centered-image-caption',
      image: img('12-test-2-refusal-to-guess'),
      caption: 'It won’t invent an owner or a deadline',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.5, centerY: 0.49, scale: 1.9, startFrame: 10 },
      durationInFrames: 135,
    },

    // 33 (293.00s) — "asks me to confirm them" 293.28 / "instead of inventing" 294.99
    {
      layout: 'centered-image-caption',
      image: img('13-test-2-placeholders-and-questions'),
      caption: 'It uses placeholders and asks you to confirm',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.5, centerY: 0.5, scale: 1.5, startFrame: 10 },
      durationInFrames: 120,
    },

    // 34 (297.00s) — "That's exactly the behavior we want" 297.16
    {
      layout: 'centered-image-caption',
      image: img('14-tracker-after-both-tests'),
      caption: 'Still unchanged after both tests',
      objectFit: 'contain',
      imageWidth: 1400,
      animation: 'fade',
      imageZoom: { centerX: 0.38, centerY: 0.39, scale: 1.8, startFrame: 5 },
      durationInFrames: 62,
    },

    // 35 (299.05s) — "run at least one boundary test" 301.04 / "stays within its limits" 303.76
    //    / "If it doesn't" 307.60; VO ends 312.72
    {
      layout: 'takeaway-stack',
      label: 'BEFORE YOU MOVE ON',
      title: 'Run one boundary test',
      takeaways: [
        { kicker: 'YOUR TURN', text: 'Test at least one boundary of your own' },
        { kicker: 'WITHIN LIMITS', text: 'You’re ready for the next step' },
        { kicker: 'NOT WITHIN LIMITS', text: 'Adjust its tools or instructions, then test again' },
      ],
      timings: [60, 141, 257],
      durationInFrames: 436,
    },
  ],
};
