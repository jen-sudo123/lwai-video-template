import { VideoData } from '../scenes/types';

// ChatGPT in Google Sheets — Tutorial / demo video
// Audio: audio/chatgpt-in-sheet.mp3 — original VO from source MP4, 238.9s
// Video: video/chatgpt-in-sheet.mp4 — screen recording with embedded VO.
// Scenes aligned directly to whisper-extracted VO timestamps (no offset).
//
//  scene                                   | VO start   | VO end    | dur (frames @30fps)
//  ----------------------------------------|------------|-----------|--------------------
//  1  label-title-body (hook)               |  0.00      | 28.72     |  862
//  2  split-contrast (add-on vs Gemini)     | 28.72      | 43.16     |  433
//  3  video-clip (install & sign in)        | 43.16      | 52.72     |  287
//  4  video-clip (step 1 — confirm data)    | 52.72      | 94.40     | 1250
//  5  video-clip (step 2 — surface Qs)      | 94.40      |124.56     |  905
//  6  video-clip (step 3 — analysis+cells)  |124.56      |150.76     |  786
//  7  video-clip (step 4 — chart)           |150.76      |170.12     |  581
//  8  label-title-body (closing context)    |170.12      |185.12     |  450
//  9  big-statement (punchline)             |185.12      |203.52     |  552
// 10  label-title-body (availability)       |203.52      |238.90     | 1061
//                                                          total       7167

export const chatGPTInSheet: VideoData = {
  audioSrc: 'audio/chatgpt-in-sheet.mp3',
  clipSrc: 'video/chatgpt-in-sheet.mp4',
  avatarSrc: 'avatar-chatgpt-sheet.mp4',
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT in Google Sheets',
      label: 'DATA ANALYSIS ASSISTANTS',
      durationInFrames: 90,
    },

    // 2 — Hook (0:00.00 → 0:28.72, ~28.7s)
    // VO: "The ChatGPT add-on for Google Sheets doesn't pull data out of your
    //      spreadsheet but reasons across it and then delivers answers in plain
    //      language. It can explain a financial model, surface which questions
    //      the dataset can actually answer, fix broken formulas in plain English
    //      and even generate charts. In other words, while Google Sheets remains
    //      the system of record, ChatGPT handles all of the interpretation
    //      without any toggling between apps."
    {
      layout: 'label-title-body',
      label: 'CHATGPT IN GOOGLE SHEETS',
      title: 'Reason across your spreadsheet\nwithout leaving Google Sheets',
      body: [
        'Explain financial models in plain language',
        'Surface which questions your data can answer',
        'Fix broken formulas and generate charts',
        'No toggling between apps',
      ],
      bodyTimings: [194, 277, 363, 646],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 772,
    },

    // 2 — Not native vs Gemini (0:28.72 → 0:43.16, ~14.4s)
    // VO: "Now since this is an external add-on, it's not natively available
    //      like Gemini for Sheets is and you need to install the add-on from
    //      the Google Workspace Marketplace. In companies, you may need to ask
    //      your IT to install or approve it for you."
    {
      layout: 'split-contrast',
      leftLabel: 'GEMINI FOR SHEETS',
      leftTitle: 'Built into Google Sheets',
      leftBody: 'Pre-installed by Google, no setup needed.',
      rightLabel: 'CHATGPT ADD-ON',
      rightTitle: 'A plugin you install yourself',
      rightBody: 'Not pre-installed. Install from the Google Workspace Marketplace, or ask your IT admin.',
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 90, value: 'right' },
      ],
      durationInFrames: 433,
    },

    // 3 — Install & sign in (0:43.16 → 0:52.72, ~9.6s)
    // VO: "But once it's installed, you can open up any Google Sheets, go to
    //      extensions, ChatGPT and then open and then sign in with your
    //      ChatGPT account."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-sheet.mp4',
      videoStartTime: 43.16,
      label: 'SETUP',
      title: 'Extensions > ChatGPT > Open > Sign in',
      body: [
        'Sign in with your OpenAI account',
        'Use the account linked to your eligible plan',
      ],
      bodyTimings: [0, 145],
      overlayPosition: 'top',
      durationInFrames: 287,
    },

    // 4 — Step 1: Confirm data structure (0:52.72 → 1:34.40, ~41.7s)
    // VO: "To use it as an example, let's open up this job market dataset...
    //      Before I ask for any analysis, I want to confirm that ChatGPT
    //      understands what it's looking at. So I'm going to give it a prompt
    //      like list every column and explain what each appears to represent
    //      and also list five random samples of the data for each column.
    //      This step helps me check ChatGPT's model of the sheet before I let
    //      it analyze anything. And if the headers or the sample values look
    //      wrong, I can fix that now rather than after I've built an analysis
    //      on some bad assumptions."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-sheet.mp4',
      videoStartTime: 52.72,
      label: 'STEP 1',
      title: 'Confirm ChatGPT understands your data',
      body: [
        '"List every column and explain what each appears to represent"',
        '"List 5 random samples of the data for each column"',
        'Fix misunderstandings before running analysis',
      ],
      bodyTimings: [613, 793, 976],
      overlayPosition: 'bottom',
      durationInFrames: 1250,
    },

    // 5 — Step 2: Surface the right questions (1:34.40 → 2:04.56, ~30.2s)
    // VO: "But once the structure looks right, I'm going to move to a second
    //      prompt. What are the five most interesting questions that this
    //      dataset is sufficient to answer? This is actually one of the fastest
    //      ways to go from raw data to useful analysis. Rather than guessing
    //      what to ask, I let ChatGPT scan the available fields and surface
    //      questions that the sheet can generally support."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-sheet.mp4',
      videoStartTime: 94.40,
      label: 'STEP 2',
      title: 'Let ChatGPT surface the right questions',
      body: [
        '"What are the 5 most interesting questions this dataset can answer?"',
        'Goes from raw data to useful analysis instantly',
        'Pick the question that matters most to you',
      ],
      bodyTimings: [115, 311, 720],
      durationInFrames: 905,
    },

    // 6 — Step 3: Analysis linked to cells (2:04.56 → 2:30.76, ~26.2s)
    // VO: "ChatGPT reasons across the relevant columns and explains the results
    //      in plain language. It also links its answer to the exact cells it
    //      used and will ask permission before making any changes. This is
    //      exactly what makes it usable in real spreadsheet work rather than
    //      just a parallel chat window. I can now scan the reference cells and
    //      check the assumptions before I share any findings."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-sheet.mp4',
      videoStartTime: 124.56,
      label: 'STEP 3',
      title: 'Get answers linked to exact cells',
      body: [
        'Reasons across relevant columns in plain language',
        'Links answers to the exact cells it used',
        'Asks permission before making any changes',
      ],
      bodyTimings: [0, 186, 358],
      overlayPosition: 'top-right',
      hideAvatar: true,
      durationInFrames: 786,
    },

    // 7 — Step 4: Generate chart (2:30.76 → 2:50.12, ~19.4s)
    // VO: "And once I have this insight, I can also create a visual
    //      representation with a prompt like, create a chart showing the top
    //      skills associated with high paying roles. The output lands directly
    //      in the sheet, not in a separate tool, which means that I can adjust
    //      labels formatting and placement right there."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-in-sheet.mp4',
      videoStartTime: 150.76,
      label: 'STEP 4',
      title: 'Generate charts directly in the sheet',
      body: [
        '"Create a chart showing top skills for high-paying roles"',
        'Chart lands in the sheet, not a separate tool',
        'Adjust labels, formatting, and placement in place',
      ],
      bodyTimings: [143, 312, 458],
      durationInFrames: 581,
    },

    // 8 — Closing context (2:50.12 → 3:05.12, ~15s)
    // VO: "So the next time that you are staring at a workbook that you didn't
    //      build and you need a view fast, like a budget model from finance or
    //      a dataset from ops or a tracker that you inherited, just open up
    //      the ChatGPT plugin as well as for all your other spreadsheet work."
    {
      layout: 'label-title-body',
      label: 'THE BOTTOM LINE',
      title: 'Staring at a spreadsheet\nyou didn\'t build?',
      body: [
        'Budget model from finance, dataset from ops, an inherited tracker',
        'Just open the ChatGPT plugin',
      ],
      bodyTimings: [95, 281],
      durationInFrames: 450,
    },

    // 9 — Punchline (3:05.12 → 3:23.52, ~18.4s)
    // VO: "This is really not here to replace your judgment, but to quickly
    //      get oriented so that your judgment actually lands on the right
    //      question. And then you can keep using it as an assistant like you
    //      would use regular ChatGPT, including building or fixing formulas,
    //      but again, without all of that tab toggling."
    {
      layout: 'big-statement',
      label: 'THE BOTTOM LINE',
      text: 'Not to replace your judgment.\nTo orient quickly.',
      highlight: 'To orient quickly.',
      animation: 'fade',
      lineTimings: [0, 134],
      durationInFrames: 552,
    },

    // 10 — Availability & notes (3:23.52 → 3:58.90, ~35.4s)
    // VO: "ChatGPT for Sheets is available on ChatGPT Plus, Pro, Business,
    //      Enterprise, and EDU. It's currently in beta and some responses may
    //      take longer, and complex edge cases sometimes still need some manual
    //      refinements in formulas. It runs in a web browser, the functionality
    //      in Google Sheets desktop or the mobile app may vary, and spreadsheet
    //      chats are separate from your main ChatGPT history, and they do not
    //      include memory, skills, or connectors during the beta."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY & NOTES',
      title: 'ChatGPT for Google Sheets',
      body: [
        'Plans: Plus, Pro, Business, Enterprise, or EDU',
        'Currently in beta: some responses slower; complex formulas may need manual refinement',
        'Web browser only: desktop and mobile app functionality may vary',
        'Spreadsheet chats: separate from ChatGPT history, no memory/skills/connectors in beta',
      ],
      bodyTimings: [156, 266, 569, 734],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 1061,
    },
  ],
};
