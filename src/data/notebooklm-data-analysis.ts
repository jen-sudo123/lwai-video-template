import { VideoData } from '../scenes/types';

// NotebookLM Data Tables — Tutorial / demo video
// Audio: audio/notebooklm-data-analysis.mp3 — raw narration extracted from source recording, 201.88s, no silence pad.
// Video: video/notebooklm-data-analysis.mp4 — screen recording with embedded narration (same recording as audio).
// No avatar asset was provided for this video.
// Scenes aligned to whisper-extracted segment/word timestamps.
//
//  scene                                          | start (s)  | end (s)   | dur (frames @30fps)
//  ------------------------------------------------|------------|-----------|--------------------
//  1  title-card-green (silent intro)              |   0.00     |   3.00    |    90
//  2  label-title-body (the problem)                |   3.00     |  24.83    |   655
//  3  label-title-body (how it works)                |  24.83     |  42.77    |   538
//  4  label-title-body (any dataset)                 |  42.77     |  54.90    |   364
//  5  video-clip (upload as a source)                |  54.90     |  73.76    |   566
//  6  video-clip (summarize it first)                |  73.76     |  96.16    |   672
//  7  video-clip (turn suggestion into table request) |  96.16     | 118.48    |   670
//  8  video-clip (notebooklm builds the table)        | 118.48     | 136.10    |   529
//  9  video-clip (dig deeper via chat)                | 136.10     | 148.06    |   359
// 10  video-clip (export to sheets)                    | 148.06     | 161.68    |   409
// 11  video-clip (keep going in sheets)                 | 161.68     | 172.56    |   326
// 12  label-title-body (good to know)                    | 172.56     | 190.56    |   540
// 13  big-statement (closing punchline)                   | 190.56     | 206.56    |   480
//                                                                        total       6198

export const notebookLMDataAnalysis: VideoData = {
  audioSrc: 'audio/notebooklm-data-analysis.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/notebooklm-data-analysis.mp4',
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'NotebookLM for Data Analysis',
      label: 'DATA ANALYSIS ASSISTANTS',
      durationInFrames: 90,
    },

    // 2 — The problem (0:00 → 0:21.84 of narration, ~21.8s)
    // VO: "If you're already using notebook.lm to deep dive into a topic, your raw data set doesn't
    //      need a separate trip to a spreadsheet before it's useful. Because while most people still
    //      treat data as its own errands, which means that research happens in docs and numbers get
    //      a separate stop in a spreadsheet, you can now do the connecting."
    {
      layout: 'label-title-body',
      label: 'THE PROBLEM',
      title: 'Research and data live in two different tools',
      body: [
        'Research happens in docs and chat',
        'Numbers get their own separate stop in a spreadsheet',
        'Now NotebookLM can do the connecting',
      ],
      bodyTimings: [404, 465, 532],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'sliders', 'compare'],
      durationInFrames: 655,
    },

    // 3 — How it works (0:21.84 → 0:39.76 of narration, ~17.9s)
    // VO: "Because data tables in notebook.lm closes that gap, it can read your data set with the
    //      same engine that's already used to synthesizing everything else in your notebook. So data
    //      tables is one of notebook.lm studio outputs sitting alongside things like audio overview
    //      and reports."
    {
      layout: 'label-title-body',
      label: 'HOW IT WORKS',
      title: 'One more Studio output, powered by the same engine',
      body: [
        'Reads your dataset with the engine that already synthesizes your notebook',
        'Sits alongside Audio Overview and Reports in Studio',
      ],
      bodyTimings: [83, 392],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'star'],
      durationInFrames: 538,
    },

    // 4 — Any dataset (0:39.76 → 0:51.90 of narration, ~12.1s)
    // VO: "And it works just as well on a data set as on meeting transcripts. notebook.lm will read
    //      whatever you give it, then organize it into rows and columns, and then hand the results
    //      to Google Sheets. So let's take a look at a practical example."
    {
      layout: 'label-title-body',
      label: 'ANY DATASET',
      title: 'From meeting transcripts to messy spreadsheets',
      body: [
        'Organizes whatever you give it into rows and columns',
        'Hands the results straight to Google Sheets',
      ],
      bodyTimings: [18, 236],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'bolt'],
      durationInFrames: 364,
    },

    // 5 — Upload as a source (0:51.90 → 1:10.76, ~18.9s)
    // VO: "So in this case here, I'm working with a raw job market export. So we have hundreds of
    //      rows of role titles, compensation ranges, required experience, skills and locations. And
    //      I can now upload this file as a source in notebook.lm using the CSV format."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 51.90,
      label: 'STEP 1',
      title: 'Upload your raw dataset as a source',
      durationInFrames: 566,
    },

    // 6 — Summarize it first (1:10.76 → 1:33.16, ~22.4s)
    // VO: "And before I ask for anything structured, I can run one summarizing question in the chat
    //      and just say, summarize what this data set contains and list what each column represents
    //      with a couple of sample values. And that's how I can spot any issues in how it's
    //      interpreting this data. So if a column is mislabeled or a value looks off, then I can see
    //      it before it gets into a table that I'm going to do other work."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 70.76,
      label: 'STEP 2',
      title: 'Ask NotebookLM to summarize it first',
      durationInFrames: 672,
    },

    // 7 — Turn a suggestion into a table request (1:33.16 → 1:55.48, ~22.3s)
    // VO: "But once the summary checks out, I can open up the studio panel, select data table here,
    //      and then turn one of notebook.lm's own suggested questions for this data set into a table
    //      request. In this case, it's build a table of the highest paying roles that offer fully
    //      remote work, including the compensation range and the required experience for each."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 93.16,
      label: 'STEP 3',
      title: 'Turn a suggested question into a table request',
      durationInFrames: 670,
    },

    // 8 — NotebookLM builds the table (1:55.48 → 2:13.10, ~17.6s)
    // VO: "And now notebook.lm returns a table, narrows to just the roles above that pay threshold.
    //      So the role, the company, the compensation range and the required experience. And a table
    //      with defined columns is something that I can definitely sort and act on."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 115.48,
      label: 'STEP 4',
      title: 'NotebookLM builds the table',
      durationInFrames: 529,
    },

    // 9 — Dig deeper via chat (2:13.10 → 2:25.06, ~12.0s)
    // VO: "But I can also use the chat to learn more about the data by asking things like summarize
    //      the salary ranges for data science roles by city, what are the common skills required for
    //      these roles or compare remote versus in-person salary ranges for the engineering manager."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 133.10,
      label: 'STEP 5',
      title: 'Dig deeper with follow-up questions',
      durationInFrames: 359,
    },

    // 10 — Export to Sheets (2:25.06 → 2:38.68, ~13.6s)
    // VO: "And if I want to dig deeper into the data, I can open up the three dot menu on the table
    //      and then select export to sheets. And now the table populates the first tab of a new
    //      spreadsheet with all of the source citations in a second tab."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 145.06,
      label: 'STEP 6',
      title: 'Export straight to Google Sheets',
      durationInFrames: 409,
    },

    // 11 — Keep going in Sheets (2:38.68 → 2:49.56, ~10.9s)
    // VO: "And then from here, you can continue to use Gemini or chat in sheets to further analyze
    //      the data, create charts and anything else that you would like to do."
    {
      layout: 'video-clip',
      videoSrc: 'video/notebooklm-data-analysis.mp4',
      videoStartTime: 158.68,
      label: 'STEP 7',
      title: 'Keep analyzing with Gemini in Sheets',
      durationInFrames: 326,
    },

    // 12 — Good to know (2:49.56 → 3:07.56, ~18.0s)
    // VO: "Now a couple of logistical notes. Data tables is on every notebook.lm plan, including the
    //      free one, with no separate toggle to turn it on. And building and exporting data tables
    //      is now only available for the web. It's not yet available for the mobile app."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A couple of logistical notes',
      body: [
        'Data Tables is on every plan, including the free one',
        'Web only for now, not yet available on the mobile app',
      ],
      bodyTimings: [99, 325],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check', 'x'],
      durationInFrames: 540,
    },

    // 13 — Closing punchline (3:07.56 → 3:23.56, ~16.0s)
    // VO: "But in summary, a data set that's in your research doesn't need its own separate platform
    //      anymore. You can just describe the table that you need and then let the same notebook
    //      that's already synthesizing everything else build the first draft of your table."
    {
      layout: 'big-statement',
      text: 'A dataset in your research\ndoesn’t need its own platform anymore.\nJust describe the table you need,\nand let NotebookLM build the first draft.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [13, 98, 203, 256],
      durationInFrames: 480,
    },
  ],
};
