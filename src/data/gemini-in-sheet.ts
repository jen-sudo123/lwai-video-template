import { VideoData } from '../scenes/types';

// Gemini in Google Sheets — Tutorial / demo video
// Audio: audio/gemini-in-sheet.mp3 — original VO from source MP4, 180.12s
// Video: video/gemini-in-sheet.mp4 — screen recording with embedded VO.
// Title card overlays the first 3s of audio; subsequent video-clip scenes
// use videoStartTime = comp_frame_start / 30 to stay synced.
//
//  scene                                   | VO start | VO end | dur (frames @30fps)
//  ----------------------------------------|----------|--------|--------------------
//  1  title-card-green                     |   —      |  3.00  |  90
//  2  video-clip (what Gemini does)        |  3.00    |  9.16  | 185
//  3  video-clip (Place 1: Menu bar)       |  9.16    | 35.68  | 796
//  4  video-clip (Place 2: Side panel)     | 35.68    | 54.84  | 575
//  5  video-clip (Demo: job market sheet)  | 54.84    | 68.80  | 419
//  6  video-clip (Visual analysis)         | 68.80    | 81.64  | 385
//  7  video-clip (Follow-up questions)     | 81.64    |109.16  | 826
//  8  video-clip (Canvas in Sheets)        |109.16    |143.88  |1042
//  9  video-clip (Build the dashboard)     |143.88    |172.36  | 854
// 10  video-clip (Spreadsheets to life)    |172.36    |180.12  | 233
//                                                       total   5405

export const geminiInSheet: VideoData = {
  audioSrc: 'audio/gemini-in-sheet.mp3',
  clipSrc: 'video/gemini-in-sheet.mp4',
  avatarSrc: 'video/gemini-in-sheet-avatar.mp4',
  scenes: [
    // 1 — Title card (0:00 → 0:03)
    {
      layout: 'title-card-green',
      title: 'Gemini in Google Sheets',
      label: 'AI ASSISTANTS FOR DATA ANALYSIS',
      durationInFrames: 90,
    },

    // 2 — What Gemini does (0:03.00 → 0:09.16)
    // VO: "Gemini in Google Sheets helps you understand your data, surface key
    //      insights faster, and even build an interactive dashboard directly
    //      inside the spreadsheet."
    {
      layout: 'label-title-body',
      label: 'WHAT IT DOES',
      title: 'Understand. Surface. Build.',
      body: [
        'Understand your data',
        'Surface key insights faster',
        'Build interactive dashboards in the sheet',
      ],
      bodyTimings: [0, 60, 110],
      image: 'images/google-sheets-gemini.png',
      durationInFrames: 185,
    },

    // 3 — Place 1: Menu bar (0:09.16 → 0:35.68)
    // VO: "You can find Gemini in Google Sheets in two places. The first one
    //      is here in the menu bar, and this is also where you'll see the most
    //      common actions that you can trigger with just one click like
    //      analyzing your data and generating charts or a pivot table. There
    //      are also some quick text-related commands like summarizing text,
    //      categorizing entries, analyzing sentiment, or producing new text
    //      based on what's in a cell."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 9.16,
      label: 'PLACE 1 — MENU BAR',
      title: 'One-click actions from the menu',
      body: [
        'Analyze data, generate charts, build pivot tables',
        'Quick text commands: summarize, categorize, sentiment',
        'Trigger directly from the Gemini menu',
      ],
      bodyTimings: [165, 470, 0],
      overlayPosition: 'bottom',
      durationInFrames: 796,
    },

    // 4 — Place 2: Side panel (0:35.68 → 0:54.84)
    // VO: "Second way is the button in the top right corner next to your
    //      profile avatar. When you tap that, it opens the Gemini side panel.
    //      This works like an assistant sitting next to your spreadsheet so
    //      you can ask it any questions in plain language, and Gemini will
    //      work directly with the sheet in front of you."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 35.68,
      avatarPosition: 'top-left',
      label: 'PLACE 2 — SIDE PANEL',
      title: 'An assistant beside your sheet',
      body: [
        'Top-right button next to your profile avatar',
        'Opens the Gemini side panel',
        'Ask in plain language — Gemini works with the sheet in front of you',
      ],
      bodyTimings: [0, 250, 380],
      overlayPosition: 'bottom',
      durationInFrames: 575,
    },

    // 5 — Demo intro (0:54.84 → 1:08.80)
    // VO: "So to demo how Gemini works in Google Sheet, I have here a sheet
    //      with job market insights. I will link this file in the written
    //      version in case you want to follow along, and I will ask Gemini to
    //      analyze this data set for me."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 54.84,
      label: 'DEMO',
      title: 'Job market dataset',
      body: [
        'A sheet of job market insights to analyze',
        'Linked in the written version to follow along',
      ],
      bodyTimings: [0, 165],
      overlayPosition: 'bottom',
      durationInFrames: 419,
    },

    // 6 — Visual analysis (1:08.80 → 1:21.64)
    // VO: "So you'll now see that Gemini goes off, reads the sheet, and comes
    //      back with interactive visual charts and summaries. I can preview
    //      those, copy them into a doc, or insert a chart along with its data
    //      table straight into my sheet."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 68.80,
      label: 'GEMINI ANALYZES',
      title: 'Interactive charts and summaries',
      body: [
        'Reads the sheet and returns visual analysis',
        'Preview, copy to a doc, or insert chart + data table into the sheet',
      ],
      bodyTimings: [0, 195],
      overlayPosition: 'bottom',
      durationInFrames: 385,
    },

    // 7 — Follow-up questions (1:21.64 → 1:49.16)
    // VO: "So now I can ask which skills appear most frequently across
    //      high-paying positions. It's worth noting here that if you have
    //      multiple sheets, you must open the sheet whose data you'd like
    //      Gemini to work with. Gemini then processes the question and
    //      returns the insight in just a few seconds. And from here, you can
    //      continue the conversation so you can test hypotheses or explore
    //      implications of the insights for your role or specific
    //      situations."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 81.64,
      label: 'KEEP ASKING',
      title: 'Drill in with plain-language follow-ups',
      body: [
        '"Which skills appear most across high-paying positions?"',
        'Multiple sheets? Open the one you want Gemini to use',
        'Continue the conversation to test hypotheses',
      ],
      bodyTimings: [0, 178, 555],
      overlayPosition: 'bottom',
      durationInFrames: 826,
    },

    // 8 — Canvas in Sheets (1:49.16 → 2:23.88)
    // VO: "Another exciting feature is Canvas now available in Sheet that lets
    //      you turn spreadsheet data into a more interactive visual layout,
    //      like a dashboard gallery view or kanban board. In this case, I'm
    //      going to ask Gemini to build a dashboard from the job market data.
    //      You may access Canvas from the Gemini side panel under Tools,
    //      where you can choose Create Canvas. You may also see it from the
    //      menu bar where you click Insert and then choose Create a Canvas.
    //      Or you may see it in the bottom bar of the spreadsheet."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 109.16,
      durationInFrames: 1042,
    },

    // 9 — Build the dashboard (2:23.88 → 2:52.36)
    // VO: "Here, I click the Tools icon, choose Create Canvas and then enter
    //      the prompt. Create a dashboard to filter the job by skills
    //      required. Gemini shows me the suggested plan step by step for me
    //      to approve. And after having my approval, Gemini then creates a
    //      fully interactive dashboard where I can filter the jobs by
    //      required skills. If I choose a skill like Agile, the dashboard
    //      updates and only shows the relevant job cards."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 143.88,
      durationInFrames: 854,
    },

    // 10 — Closing (2:52.36 → 3:00.12)
    // VO: "Now Gemini in Sheets can bring your spreadsheet to life, letting
    //      you interact with the data and turn raw rows into a working
    //      dashboard."
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-in-sheet.mp4',
      videoStartTime: 172.36,
      durationInFrames: 233,
    },

    // 11 — Availability outro (3:00.62 → 3:12.88, ~12.26s)
    // 0.5s silence + ElevenLabs Daan VO:
    // "On availability: Gemini in Sheets is available on eligible Google
    //  Workspace and Google AI plans. For company accounts access depends on
    //  your Workspace edition and your admin settings."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Gemini in Sheets',
      body: [
        'Available on eligible Google Workspace and Google AI plans',
        'For company accounts: access depends on your Workspace edition and admin settings',
      ],
      bodyTimings: [15, 200],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      hideAvatar: true,
      durationInFrames: 381,
    },
  ],
};
