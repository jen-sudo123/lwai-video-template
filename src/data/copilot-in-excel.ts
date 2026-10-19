import { VideoData } from '../scenes/types';

// Copilot for Excel — Tutorial / demo video
// Audio: audio/copilot-in-excel.mp3 — raw narration extracted directly from the source
//        screen recording (live narration, no separate polished VO). Same pattern as
//        notebooklm-data-analysis / chatgpt-tasks: audioSrc + clipSrc are the same
//        original recording, so they stay in perfect sync by construction.
// Video: video/copilot-in-excel.mp4 (1920x1080 screen recording, 410.03s), played
//        continuously and muted via `clipSrc` starting at clipStartFrame — audioSrc
//        carries the sound. Scene durations below are exact frame counts derived from
//        Whisper word-level timestamps on the raw narration, so video-clip scenes land
//        on the correct on-screen moment.
// Narration has ~1.4s natural lead silence (first word at 1.38s) and ends at 409.42s
// (video runs to 410.03s) — audioStartFrame/clipStartFrame set to 90 (after the 3s
// title card) rather than left at the default 0.
//
//  scene                                  | video time (s) | dur (f@30)
//  ----------------------------------------|----------------|------------
//  1  title card                            |     —          |     90
//  2  hook (built into Excel)                 |   0.00 -  25.70 |    771
//  3  how Copilot works (grounding)              |  25.70 -  93.70 |   2040
//  3b video — where to find it (icon corner)        |  93.70 - 107.50 |    414
//  4  video — step 1: open the data set             | 107.50 - 121.04 |    406
//  5  video — step 2: validate understanding           | 121.04 - 176.36 |   1660
//  6  video — step 3: ask for analysis ideas              | 176.36 - 212.56 |   1086
//  7  video — step 4: drill into a follow-up                | 212.56 - 251.07 |   1155
//  8  video — step 5: turn insight into a chart                | 251.07 - 278.68 |    828
//  9  video — good to know: choose your AI model                  | 278.68 - 303.62 |    749
// 10  video — good to know: set workbook rules                       | 303.62 - 339.22 |   1068
// 11  video — good to know: use built-in skills                         | 339.22 - 361.94 |    681
// 12  getting started & closing                                          | 361.94 - 410.03 |   1443
//                                                                                total    12391
//
// Recut note: scene 3 originally ran the full 25.70s -> 107.50s as one graphic
// overlay, but the source recording switches from blank to the live Excel screen
// at ~93.7s (well before the demo actually starts at 107.5s) — that live screen
// was getting hidden behind the graphic. Split into a shorter graphic (ending at
// the blank->live cut) plus a video-clip scene so the on-screen icon is visible
// while the narration describes where to find it.

export const copilotInExcel: VideoData = {
  audioSrc: 'audio/copilot-in-excel.mp3',
  clipSrc: 'video/copilot-in-excel.mp4',
  audioStartFrame: 90,
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card
    {
      layout: 'title-card-green',
      title: 'Copilot for Excel',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 — Hook (0.00 -> 25.70)
    // "Copilot for Excel is built directly into Excel, and Microsoft has recently extended
    //  it with Copilot agents, which let you turn repeated analysis work into a reusable
    //  assistant. Instead of manually inspecting rows, building pivots, and guessing where
    //  to look first, Copilot helps you move from raw data to meaningful insight much faster."
    {
      layout: 'label-title-body',
      label: 'COPILOT FOR EXCEL',
      title: 'Turn raw data into\nmeaningful insight, faster',
      body: [
        'Built directly into Excel',
        'Extended with Copilot agents for repeat analysis',
        'Skip the manual pivots — move straight to insight',
      ],
      bodyTimings: [60, 280, 500],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'rocket', 'trending'],
      durationInFrames: 771,
    },

    // 3 — How Copilot works (25.70 -> 107.50)
    // "Copilot does not replace Excel's calculation engine... It interprets your request,
    //  extracts a structured snapshot of context, proposes actions, and Excel executes and
    //  renders the results... like a data analyst handling Excel on your behalf. The Copilot
    //  icon can be found in the lower-right corner."
    {
      layout: 'label-title-body',
      label: 'HOW IT WORKS',
      title: 'An assistant that sits\non top of Excel',
      body: [
        "Excel's calculation engine still does the work",
        'Copilot interprets requests, proposes actions',
        'Excel executes and renders the results',
      ],
      bodyTimings: [80, 800, 1550],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['compare', 'pencil', 'check'],
      durationInFrames: 2040,
    },

    // 3b — Where to find it (93.70 -> 107.50)
    // "The Copilot icon can be found in the lower-right corner. And once the Copilot
    //  panel is open, everything we do will happen from there." Screen recording
    //  becomes visible here (empty workbook), so this is a video-clip, not a graphic.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 93.7,
      label: 'WHERE TO FIND IT',
      title: 'Bottom-Right Corner of the Workbook',
      durationInFrames: 414,
    },

    // 4 — Step 1: open the data set (107.50 -> 121.04)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 107.5,
      label: 'STEP 1',
      title: 'Open the Data Set',
      durationInFrames: 406,
    },

    // 5 — Step 2: validate Copilot's understanding (121.04 -> 176.36)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 121.04,
      label: 'STEP 2',
      title: "Validate Copilot's Understanding",
      durationInFrames: 1660,
    },

    // 6 — Step 3: ask Copilot for analysis ideas (176.36 -> 212.56)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 176.36,
      label: 'STEP 3',
      title: 'Ask Copilot for Analysis Ideas',
      durationInFrames: 1086,
    },

    // 7 — Step 4: drill into a follow-up question (212.56 -> 251.07)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 212.56,
      label: 'STEP 4',
      title: 'Drill Into a Follow-up Question',
      durationInFrames: 1155,
    },

    // 8 — Step 5: turn the insight into a chart (251.07 -> 278.68)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 251.07,
      label: 'STEP 5',
      title: 'Turn the Insight into a Chart',
      durationInFrames: 828,
    },

    // 9 — Good to know: choose your AI model (278.68 -> 303.62)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 278.68,
      label: 'GOOD TO KNOW',
      title: 'Choose Your AI Model',
      durationInFrames: 749,
    },

    // 10 — Good to know: set workbook rules (303.62 -> 339.22)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 303.62,
      label: 'GOOD TO KNOW',
      title: 'Set Workbook Rules',
      durationInFrames: 1068,
    },

    // 11 — Good to know: use built-in skills (339.22 -> 361.94)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-excel.mp4',
      videoStartTime: 339.22,
      label: 'GOOD TO KNOW',
      title: 'Use Built-in Skills',
      durationInFrames: 681,
    },

    // 12 — Getting started & closing (361.94 -> 410.03)
    // "To get started, you'll need a Microsoft 365 Copilot license... the COPILOT function
    //  is only available where admins have opted in... validate understanding, surface good
    //  questions, accelerate insight discovery... you remain in the driver's seat."
    {
      layout: 'label-title-body',
      label: 'GETTING STARTED',
      title: 'Copilot for Excel',
      body: [
        'Needs a Microsoft 365 Copilot license',
        'The COPILOT() function requires admin opt-in',
        'Validates data & accelerates insight discovery',
        'You stay in the driver’s seat',
      ],
      bodyTimings: [80, 500, 900, 1200],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'sliders', 'trending', 'check'],
      durationInFrames: 1443,
    },
  ],
};
