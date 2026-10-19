import { VideoData } from '../scenes/types';

// ChatGPT in Excel — Tutorial / demo video
// Audio: audio/chatgpt-in-excel.mp3 — VO ends at ~268.32s, file is ~271.55s.
// Video: video/chatgpt-in-excel.mp4 — screen recording with embedded VO.
// Scenes aligned to whisper-extracted segment timestamps.
//
//  scene                                   | VO start   | VO end    | dur (frames @30fps)
//  ----------------------------------------|------------|-----------|--------------------
//  1  title card (silent intro)             |  0.00      |  3.00     |   90
//  2  label-title-body (hook)               |  3.00      | 28.40     |  762
//  3  video-clip (install overview)         | 28.40      | 47.32     |  568
//  4  video-clip (installation steps)       | 47.32      | 69.04     |  652
//  5  video-clip (sign in)                  | 69.04      | 81.92     |  386
//  6  video-clip (step 1 — confirm data)    | 81.92      |124.24     | 1270
//  7  video-clip (step 2 — surface Qs)      |124.24      |157.88     | 1009
//  8  video-clip (step 3 — analysis)        |157.88      |185.64     |  833
//  9  video-clip (step 4 — chart)           |185.64      |206.84     |  636
// 10  big-statement (closing)               |206.84      |225.92     |  572
// 11  label-title-body (availability)       |225.92      |271.55     | 1369
//                                                          total       8147

export const chatGPTInExcel: VideoData = {
  audioSrc: 'audio/chatgpt-in-excel.mp3',
  clipSrc: 'video/chatgpt-in-excel.mp4',
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT in Excel',
      label: 'DATA ANALYSIS ASSISTANTS',
      durationInFrames: 90,
    },

    // 2 — Hook (0:03 → 0:28.40, ~25.4s)
    // VO: "The ChatGPT add-on for Excel doesn't pull any data out of your
    //      spreadsheet, but it reasons across it and delivers answers in plain
    //      language. It can explain a financial model, surface which questions a
    //      dataset can actually answer, fix broken formulas in plain English, and
    //      even generate charts. In other words, while Excel remains your system
    //      of record, ChatGPT handles all of the interpretation without any
    //      toggling between apps."
    {
      layout: 'label-title-body',
      label: 'CHATGPT IN EXCEL',
      title: 'Reason across your spreadsheet\nwithout leaving Excel',
      body: [
        'Explain financial models in plain language',
        'Surface which questions your data can answer',
        'Fix broken formulas and generate charts',
        'Supports Skills & Apps on eligible plans',
      ],
      bodyTimings: [199, 273, 349, 762],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 1119,
    },

    // 3 — Not pre-installed (0:40.32 → 0:47.32, ~7s)
    // VO: "Since this is a plugin, it's not already installed in your Excel like
    //      Copilot is, and you have to do this yourself."
    {
      layout: 'split-contrast',
      leftLabel: 'COPILOT',
      leftTitle: 'Built into Excel',
      leftBody: 'Pre-installed, no setup needed.',
      rightLabel: 'CHATGPT ADD-IN',
      rightTitle: 'A plugin you install yourself',
      rightBody: 'Not pre-installed like Copilot. You set it up from Microsoft Marketplace.',
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 90, value: 'right' },
      ],
      durationInFrames: 210,
    },

    // 4 — Individual install (0:47.32 → 0:57.04, ~9.7s)
    // VO: "As an individual, you can install the plugin from Microsoft Marketplace,
    //      or open Excel, go to Home > Add-ins, search for ChatGPT and edit."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-excel.mp4',
      videoStartTime: 47.32,
      label: 'SETUP',
      title: 'Install from Microsoft Marketplace',
      body: [
        'Individual: Home > Add-ins > search "ChatGPT"',
      ],
      bodyTimings: [0],
      overlayPosition: 'top',
      clipZoomKeyframes: [
        { startFrame: 0,   scale: 1.6, originX: 42, originY: 60 }, // start zoomed into ChatGPT listing
        { startFrame: 143, scale: 1.0, originX: 50, originY: 50 }, // zoom out at 00:52.08
      ],
      durationInFrames: 292,
    },

    // 5 — Company install (0:57.04 → 1:09.04, ~12s)
    // VO: "On company accounts, your IT will need to deploy the add-in from the
    //      Microsoft Marketplace and assign it to you. But once it's installed,
    //      you will see ChatGPT in the ribbon."
    {
      layout: 'label-title-body',
      label: 'COMPANY ACCOUNTS',
      title: 'IT deploys and assigns the add-in',
      body: [
        'IT deploys from Microsoft Marketplace',
        'Admin assigns it to your account',
        'Once assigned: ChatGPT appears in the ribbon',
      ],
      bodyTimings: [5, 144, 208],
      bodyCards: true,
      durationInFrames: 360,
    },

    // 5 — Sign in (1:09.04 → 1:21.92, ~12.9s)
    // VO: "The first time you use it, click Continue with ChatGPT and sign in.
    //      Open the pane, sign in with the OpenAI account associated with your
    //      eligible plan, and you're good to go."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-excel.mp4',
      videoStartTime: 69.04,
      label: 'SIGN IN',
      title: 'Sign in with your OpenAI account',
      body: [
        'Click "Continue with ChatGPT" > sign in',
        'Use the account linked to your eligible plan',
      ],
      bodyTimings: [0, 146],
      durationInFrames: 386,
    },

    // 6 — Step 1: Confirm data structure (1:21.92 → 2:04.24, ~42.3s)
    // VO: "Now to use ChatGPT in Excel...let's open up this JobMarket dataset.
    //      Before I ask for any analysis, I want to confirm that ChatGPT knows
    //      what it's looking at. Use a prompt like 'list every column and explain
    //      what each one appears to represent. Also list five random samples of
    //      the data for each column.' This lets you check ChatGPT's model of the
    //      sheet before you let it analyze anything."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-excel.mp4',
      videoStartTime: 81.92,
      label: 'STEP 1',
      title: 'Confirm ChatGPT understands your data',
      body: [
        '"List every column and explain what each represents"',
        '"List 5 random samples of data for each column"',
        'Fix misunderstandings before running analysis',
      ],
      bodyTimings: [487, 614, 937],
      overlayPosition: 'bottom',
      durationInFrames: 1270,
    },

    // 7 — Step 2: Surface questions (2:04.24 → 2:37.88, ~33.6s)
    // VO: "I move to the second prompt: 'What are the five most interesting
    //      questions that this dataset is sufficient to answer?' This is one of
    //      the fastest ways to go from raw data to useful analysis. Rather than
    //      guessing what to ask, I let ChatGPT surface questions this sheet can
    //      actually support."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-excel.mp4',
      videoStartTime: 124.24,
      label: 'STEP 2',
      title: 'Let ChatGPT surface the right questions',
      body: [
        '"What are the 5 most interesting questions this dataset can answer?"',
        'Goes from raw data to useful analysis instantly',
        'Pick the question that matters most to you',
      ],
      bodyTimings: [128, 284, 710],
      durationInFrames: 1009,
    },

    // 8 — Step 3: Analysis with cell references (2:37.88 → 3:05.64, ~27.8s)
    // VO: "For this or any question, ChatGPT can reason across the relevant
    //      columns and explain the result in plain language. It links its answer
    //      to the exact cells it used and then asks permission before making any
    //      changes. This is exactly what makes this usable in real spreadsheet
    //      work rather than a parallel chat window."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-excel.mp4',
      videoStartTime: 157.88,
      label: 'STEP 3',
      title: 'Get answers linked to exact cells',
      body: [
        'Reasons across relevant columns in plain language',
        'Links answers to the exact cells it used',
        'Asks permission before making any changes',
      ],
      bodyTimings: [0, 211, 358],
      overlayPosition: 'top-right',
      durationInFrames: 833,
    },

    // 9 — Step 4: Generate chart (3:05.64 → 3:26.84, ~21.2s)
    // VO: "And once I have the insight, I also want to create a visual
    //      representation — 'create a chart showing the top skills associated
    //      with high-paying roles.' The output lands directly in the workbook
    //      and not in a separate tool, which means I can adjust labels,
    //      formatting and placement right there before sharing."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-excel.mp4',
      videoStartTime: 185.64,
      label: 'STEP 4',
      title: 'Generate charts directly in the workbook',
      body: [
        '"Create a chart showing top skills for high-paying roles"',
        'Chart lands in the workbook, not a separate tool',
        'Adjust labels, formatting, and placement in place',
      ],
      bodyTimings: [145, 335, 489],
      durationInFrames: 636,
    },

    // 10a — Closing context (3:26.84 → 3:39.28, ~12.4s)
    // VO: "So the next time you're staring at a workbook you didn't build...
    //      budget model from finance, dataset from ops, inherited tracker...
    //      just open up the ChatGPT plugin."
    {
      layout: 'label-title-body',
      label: 'THE BOTTOM LINE',
      title: 'Staring at a workbook\nyou didn\'t build?',
      body: [
        'Budget model from finance, dataset from ops, an inherited tracker',
        'Just open the ChatGPT plugin',
      ],
      bodyTimings: [97, 266],
      durationInFrames: 373,
    },

    // 10b — Punchline (3:39.28 → 3:45.92, ~6.6s)
    // VO: "Not to replace your judgment but to orient quickly so that your
    //      judgment actually lands on the right question."
    {
      layout: 'big-statement',
      label: 'THE BOTTOM LINE',
      text: 'Not to replace your judgment.\nTo orient quickly.',
      highlight: 'To orient quickly.',
      animation: 'fade',
      lineTimings: [0, 60],
      durationInFrames: 199,
    },

    // 11 — Availability & notes (3:45.92 → 4:31.55, ~45.6s)
    // VO: "ChatGPT for Excel is available on Plus, Pro, Business, Enterprise and
    //      EDU accounts. VBA macros are not fully supported yet and complex edge
    //      case formulas may still need manual refinement. Tools and apps are
    //      available on eligible plans but subject to admin settings. Spreadsheet
    //      chats are separate from your main ChatGPT history and do not include memory."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY & NOTES',
      title: 'ChatGPT for Excel',
      body: [
        'Plans: Plus, Pro, Business, Enterprise, or EDU',
        'VBA and macros: not fully supported; complex formulas may need manual refinement',
        'Skills and Apps: available on eligible plans, subject to admin settings',
        'Spreadsheet chats: separate from ChatGPT history, no memory during beta',
      ],
      bodyTimings: [316, 566, 846, 1058],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 1369,
    },
  ],
};
