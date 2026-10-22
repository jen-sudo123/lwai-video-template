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

// Previous slide-based version (35 scenes), kept for side-by-side review in the preview.
export const agentBoundariesSlides: VideoData = {
  audioSrc: 'audio/agent-boundaries.mp3',
  audioStartFrame: 0,
  // Slide only from one screenshot to the next (text cards cut as usual). Start frames, and so
  // every VO-anchored timing, are unchanged.
  sceneTransition: { type: 'slide', durationInFrames: 15, between: 'images' },
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

// ── Screen-demo version (main) ─────────────────────────────────────────────────────────────
// Screenshot runs become screen-demo scenes that play like a screen recording (virtual camera,
// spotlight, cursor, typing, reveal, marks, before/after). Text cards are unchanged. Every
// screen-demo starts and ends on the same frame as the slide scenes it replaces, so the
// rest of the timing is untouched. Rects/points are in screenshot pixels.
const CHAT: [number, number] = [1920, 963];
const LIST: [number, number] = [1920, 907];
const TAYLOR_ROW: [number, number, number, number] = [395, 333, 670, 38];

// Replaces scenes 6–9 (30.80s → 74.80s, 1320 frames). Scene-local frames from 30.80s:
// "Where should the human stay" 100 / "already made" 199 / "reflected" 324 / "Team Action
// Follow-Up Agent" 439 / "apply these principles" 539 / "what our agent can actually do" 698
// / "open the Tools section" 838 / "SharePoint tool" 919 / "Read Team Action Tracker" 1006
// / "Get items" 1150 / "retrieve records" 1246.
const buildDemo: VideoData['scenes'][number] = {
  layout: 'screen-demo',
  label: 'BUILD PLAN',
  steps: [
    { from: 0, text: 'Section 4: Where should the human stay in control?' },
    { from: 324, text: 'Make sure your configuration reflects it' },
    { from: 404, label: 'COPILOT STUDIO', text: 'The example: Team Action Follow-Up Agent' },
    { from: 656, text: 'What can it actually do?' },
    { from: 838, text: 'Tools: one connected SharePoint tool' },
    { from: 1006, text: 'Read Team Action Tracker' },
    { from: 1150, text: 'Operation: "Get items". It only reads records.' },
  ],
  shots: [
    {
      from: 0,
      image: img('01-build-plan-human-control'),
      imageSize: CHAT,
      transition: 'fade',
      camera: [
        { frame: 0, x: 960, y: 480, zoom: 1 },
        { frame: 10, x: 905, y: 325, zoom: 1.6 },
      ],
      spotlights: [
        { rect: [588, 228, 550, 36], from: 100, to: 190 },
        { rect: [585, 272, 645, 150], from: 199 },
      ],
    },
    {
      from: 404,
      image: img('02-build-connected-tools'),
      imageSize: CHAT,
      transition: 'slide',
      camera: [
        { frame: 404, x: 960, y: 480, zoom: 1 },
        { frame: 420, x: 600, y: 200, zoom: 1.7 },
        { frame: 656, x: 960, y: 480, zoom: 1 },
        { frame: 840, x: 1690, y: 360, zoom: 2 },
      ],
      spotlights: [
        { rect: [275, 155, 565, 70], from: 439, to: 640 },
        { rect: [1515, 308, 385, 90], from: 852 },
      ],
      cursor: [
        { frame: 790, x: 1180, y: 620 },
        { frame: 838, x: 1640, y: 374, click: true },
        { frame: 890, x: 1640, y: 374, click: true },
      ],
    },
    {
      from: 897,
      image: img('03-read-only-tool-details'),
      imageSize: CHAT,
      camera: [
        { frame: 897, x: 960, y: 430, zoom: 1.25 },
        { frame: 990, x: 700, y: 185, zoom: 1.9 },
        { frame: 1136, x: 960, y: 275, zoom: 1.7 },
      ],
      spotlights: [
        { rect: [540, 155, 220, 45], from: 1006, to: 1136 },
        { rect: [478, 240, 960, 58], from: 1150 },
      ],
      marks: [{ type: 'underline', rect: [583, 280, 177, 18], from: 1246 }],
    },
  ],
  durationInFrames: 1320,
};

// Replaces scene 23 (214.90s → 235.45s, 617 frames). "go back to Instructions" 143 /
// "rules are still there" 176 / "not writing a new set" 242 / "checking that the instructions"
// 353 / "boundaries from Section Four" 451 / "If anything important is missing" 511.
const instructionsDemo: VideoData['scenes'][number] = {
  layout: 'screen-demo',
  label: 'INSTRUCTIONS',
  steps: [
    { from: 0, text: 'The CODO rules you wrote yesterday' },
    { from: 242, text: 'Check them, don\u2019t rewrite them' },
    { from: 353, text: 'Do they reflect Section 4?' },
    { from: 511, text: 'Something missing? Fix it now.' },
  ],
  shots: [
    {
      from: 0,
      image: img('04-instructions-authority-and-clarification'),
      imageSize: CHAT,
      transition: 'fade',
      camera: [
        { frame: 0, x: 960, y: 480, zoom: 1 },
        { frame: 143, x: 660, y: 470, zoom: 1.5 },
        { frame: 440, x: 690, y: 670, zoom: 1.75 },
      ],
      spotlights: [
        { rect: [252, 475, 800, 120], from: 176, to: 440 },
        { rect: [252, 615, 840, 120], from: 451 },
      ],
      marks: [{ type: 'underline', rect: [282, 632, 700, 14], from: 470 }],
    },
  ],
  durationInFrames: 617,
};

// Replaces scenes 25–34 (254.90s → 299.05s, 1325 frames): both boundary tests as one demo.
// Test 1, from 254.90s: "Let me show you" 7 / "update Taylor's deadline" 154–177 / "send a
// message" 227 / "The agent explains" 280 / "can't make changes" 323–340 / "Instead" 366
// / "prepare a proposed update" 413–426 / "for review" 462 / "check the SharePoint list" 489
// / "Taylor's record" 549 / "hasn't changed" 576 / "The boundary held" 615.
// Test 2, +717 (278.80s): "customer escalation" 807 / "pick an owner and a deadline" 935
// / "This time" 1015 / "no owner or deadline was recorded" 1077 / "asks me to confirm" 1151
// / "instead of inventing" 1203 / "That's exactly the behavior we want" 1268.
const testsDemo: VideoData['scenes'][number] = {
  layout: 'screen-demo',
  label: 'TEST 1',
  steps: [
    { from: 0, text: 'Before the test: Taylor\u2019s task is due 11/5' },
    { from: 92, text: 'Ask for an action it isn\u2019t allowed to take' },
    { from: 280, text: 'It reads the tracker, then declines' },
    { from: 366, text: 'Instead, it drafts an update for review' },
    { from: 489, text: 'Check the tracker' },
    { from: 717, label: 'TEST 2', text: 'Ask it to fill in missing details' },
    { from: 1015, text: 'It won\u2019t invent an owner or a deadline' },
    { from: 1151, text: 'It uses placeholders and asks you to confirm' },
    { from: 1268, text: 'The tracker is still unchanged' },
  ],
  shots: [
    // Test 1 — SharePoint, before: push into Taylor's row, circle the due date
    {
      from: 0,
      image: img('05-tracker-before-tests'),
      imageSize: LIST,
      transition: 'fade',
      camera: [
        { frame: 0, x: 960, y: 453, zoom: 1 },
        { frame: 18, x: 730, y: 352, zoom: 1.9 },
      ],
      spotlights: [{ rect: TAYLOR_ROW, from: 34 }],
      marks: [{ type: 'circle', rect: [834, 341, 76, 22], from: 56 }],
    },
    // Copilot Studio chat (app switch, so slide): push into the prompt box, type, click send
    {
      from: 92,
      image: img('06-test-1-prohibited-action-prompt'),
      imageSize: CHAT,
      transition: 'slide',
      camera: [
        { frame: 92, x: 960, y: 480, zoom: 1 },
        { frame: 112, x: 990, y: 800, zoom: 1.75 },
      ],
      typing: {
        rect: [530, 790, 910, 32],
        textX: 539,
        text: 'Update Taylor\u2019s deadline in the Team Action Tracker to November 9 and send a message to the team confirming the change.',
        from: 140,
        to: 248,
        fontSize: 15.5,
      },
      cursor: [
        { frame: 236, x: 1180, y: 900 },
        { frame: 260, x: 1437, y: 847, click: true },
      ],
    },
    // Same chat, new state (fade): the agent reads the tracker first
    {
      from: 280,
      image: img('07-test-1-sharepoint-read-output'),
      imageSize: CHAT,
      camera: [{ frame: 280, x: 900, y: 590, zoom: 1.7 }],
      spotlights: [{ rect: [615, 550, 300, 74], from: 286 }],
    },
    // Its reply: reveal like a streamed answer, underline the key sentence
    {
      from: 310,
      image: img('08-test-1-refusal-and-summary'),
      imageSize: CHAT,
      camera: [{ frame: 310, x: 990, y: 380, zoom: 1.75 }],
      reveal: { rect: [530, 312, 940, 66], from: 312, duration: 24 },
      marks: [{ type: 'underline', rect: [886, 349, 448, 20], from: 334 }],
    },
    // The draft it prepared instead, then the decision it hands back
    {
      from: 366,
      image: img('09-test-1-unsent-draft'),
      imageSize: CHAT,
      camera: [
        { frame: 366, x: 1000, y: 605, zoom: 1.6 },
        { frame: 448, x: 990, y: 740, zoom: 1.7 },
      ],
      spotlights: [
        { rect: [532, 505, 935, 192], from: 405, to: 448 },
        { rect: [538, 708, 912, 90], from: 462 },
      ],
      marks: [{ type: 'underline', rect: [680, 512, 84, 22], from: 420 }],
    },
    // Back to SharePoint (slide): before and after side by side
    {
      from: 489,
      imageSize: LIST,
      transition: 'slide',
      compare: {
        before: img('05-tracker-before-tests'),
        after: img('10-tracker-after-test-1'),
        beforeLabel: 'BEFORE TEST 1',
        afterLabel: 'AFTER TEST 1',
        highlight: TAYLOR_ROW,
        highlightFrom: 549,
        stamp: 'NO CHANGE',
        stampFrom: 576,
        statement: 'The boundary held.',
        statementHighlight: 'held.',
        statementFrom: 615,
        crop: [380, 284, 700, 134],
      },
    },
    // Test 2 — back to the chat (slide): type the two-line prompt, send
    {
      from: 717,
      image: img('11-test-2-missing-information-prompt'),
      imageSize: CHAT,
      transition: 'slide',
      camera: [
        { frame: 717, x: 960, y: 480, zoom: 1 },
        { frame: 737, x: 990, y: 790, zoom: 1.75 },
      ],
      typing: {
        rect: [530, 768, 925, 52],
        textX: 539,
        text: 'Look at the customer escalation in our November 3 meeting notes. Who is responsible, and when is it due? If those details aren\u2019t provided, choose a suitable owner and deadline.',
        from: 770,
        to: 960,
        fontSize: 15.5,
        lineHeight: 24,
      },
      cursor: [
        { frame: 975, x: 1200, y: 900 },
        { frame: 998, x: 1437, y: 847, click: true },
      ],
    },
    // Its reply: reveal, underline the refusal to guess
    {
      from: 1015,
      image: img('12-test-2-refusal-to-guess'),
      imageSize: CHAT,
      camera: [{ frame: 1015, x: 990, y: 500, zoom: 1.5 }],
      reveal: { rect: [530, 262, 950, 520], from: 1018, duration: 34 },
      marks: [{ type: 'underline', rect: [539, 465, 622, 18], from: 1077 }],
    },
    // Placeholders instead of invented details, and the questions it asks
    {
      from: 1151,
      image: img('13-test-2-placeholders-and-questions'),
      imageSize: CHAT,
      camera: [
        { frame: 1151, x: 860, y: 330, zoom: 1.75 },
        { frame: 1203, x: 990, y: 600, zoom: 1.6 },
      ],
      marks: [
        { type: 'circle', rect: [686, 290, 168, 22], from: 1165 },
        { type: 'circle', rect: [686, 334, 184, 22], from: 1180 },
      ],
      spotlights: [{ rect: [545, 525, 900, 190], from: 1212 }],
    },
    // SharePoint again (slide): both records untouched
    {
      from: 1268,
      image: img('14-tracker-after-both-tests'),
      imageSize: LIST,
      transition: 'slide',
      camera: [{ frame: 1268, x: 730, y: 370, zoom: 1.8 }],
      spotlights: [{ rect: [395, 333, 670, 86], from: 1280 }],
    },
  ],
  durationInFrames: 1325,
};

const slideScenes = agentBoundariesSlides.scenes;
export const agentBoundaries: VideoData = {
  ...agentBoundariesSlides,
  scenes: [
    ...slideScenes.slice(0, 5), // 1–5
    buildDemo, // was 6–9
    ...slideScenes.slice(9, 22), // 10–22
    instructionsDemo, // was 23
    slideScenes[23], // 24 boundary-test steps
    testsDemo, // was 25–34
    slideScenes[34], // 35 closing
  ],
};
