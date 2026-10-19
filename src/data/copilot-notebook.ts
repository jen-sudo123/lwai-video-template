import { VideoData } from '../scenes/types';

// Copilot Notebooks — Tutorial video
// Audio: audio/copilot-notebook.wav  (0–301.92s VO)
// Video: videos/copilot-notebook.mp4 (screen recording, 1920×1080, 30fps, 301.92s)
//
// Per direction: only blank frames get layout/overlays. The middle section
// (31s–~222s) is a continuous UI demo and plays clean with NO overlay text.
//
//  scene                                | VO start | VO end  | dur (frames)
//  -------------------------------------|----------|---------|-------------
//  1  title-card-green                   |  0.00    |   3.00  |    90
//  2  label-title-body (hook)            |  3.00    |  31.00  |   840
//  3  video-clip (clean demo, no text)   | 31.00    | 221.80  |  5724
//  4  label-title-body (plans & access)  |221.80    | 240.88  |   572
//  5  label-title-body (don't see it?)   |240.88    | 253.52  |   380
//  6  label-title-body (good to know)    |253.52    | 287.23  |  1011
//  7  label-title-body (wrap-up)         |287.23    | 301.92  |   441
//                                                     total      9058

export const copilotNotebook: VideoData = {
  audioSrc: 'audio/copilot-notebook.mp3',
  avatarSrc: 'videos/copilot-notebook-avatar.mp4',
  scenes: [
    // 1 — Title card (0.00–3.00s)
    {
      layout: 'title-card-green',
      label: 'MICROSOFT 365 COPILOT',
      title: 'Copilot Notebooks',
      durationInFrames: 90,
    },

    // 2 — Hook (3.00–31.00s)
    // VO: "Did you know that there is a version of co-pilot that already knows your files,
    //      your context and your format before you even type in your prompt? It's a feature
    //      called co-pilot notebooks, very similar to Google notebook... Notebooks allows you
    //      to, instead of having a fresh conversation every time, build one workspace, then
    //      drop in all of your reference files, set instructions, so that every chat after
    //      that is already grounded."
    {
      layout: 'label-title-body',
      label: 'COPILOT NOTEBOOKS',
      title: 'A Copilot that already knows\nyour files, context, and format',
      body: [
        'Build one workspace per recurring job, instead of starting a fresh chat every time',
        'Drop in reference files and set instructions, so every chat is grounded from the start',
      ],
      bodyTimings: [540, 690],
      image: 'images/copilot-notebook-overview.png',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 90, centerX: 0.28, centerY: 0.3, scale: 1.7 },
        { startFrame: 240, centerX: 0.75, centerY: 0.3, scale: 1.7 },
        { startFrame: 430, centerX: 0.75, centerY: 0.72, scale: 1.7 },
        { startFrame: 600, centerX: 0.28, centerY: 0.72, scale: 1.7 },
        { startFrame: 760, centerX: 0.5, centerY: 0.5, scale: 1 },
      ],
      durationInFrames: 840,
    },

    // 3 — Continuous UI demo (31.00–221.80s)
    // VO: how to find Notebooks → create one → add references → custom instructions
    //     → send the variable inputs → review the draft → audio overview + mind map.
    // No overlay text — the screen recording carries the lesson.
    {
      layout: 'video-clip',
      videoSrc: 'videos/copilot-notebook.mp4',
      videoStartTime: 31,
      title: '',
      durationInFrames: 5724,
    },

    // 4 — Plans & access (221.80–240.88s)
    // VO: "Some practical points in terms of plans and access for the version that I've shown.
    //      You need a Microsoft 365 co-pilot license for work or school, and you also need
    //      SharePoint or OneDrive enabled for your accounts. Personal, family, and premium
    //      subscribers can access co-pilot notebooks, but that version is mainly for your
    //      own personal Microsoft account and personal files."
    {
      layout: 'label-title-body',
      label: 'PLANS & ACCESS',
      title: 'Which version of Copilot Notebooks\ncan you use?',
      body: [
        'Work / school: Microsoft 365 Copilot license + SharePoint or OneDrive enabled',
        'Personal, Family, Premium: a separate version, for personal Microsoft accounts and files',
      ],
      bodyTimings: [0, 295],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 572,
    },

    // 5 — Don't see Notebooks? (240.88–253.52s)
    // VO: "And if you think you have all those licenses, but you don't see notebooks in your
    //      co-pilot app, it may be because either a license is missing, or IT hasn't enabled
    //      this feature, so you may want to talk to them."
    {
      layout: 'label-title-body',
      label: 'TROUBLESHOOTING',
      title: 'Don\'t see Notebooks?\nCheck with your IT team',
      body: [
        'Either a license is missing, or IT hasn\'t enabled the feature yet for your account',
      ],
      bodyTimings: [120],
      durationInFrames: 380,
    },

    // 6 — Good to know: limits + save-as-file (253.52–287.23s)
    // VO: "There's one important limit to know. While you can add more than 100 references
    //      to a notebook, Microsoft says that only the first 100 are used for grounding, so
    //      don't overload it too much. Additionally, co-pilot notebooks don't remember the
    //      conversations. So what they keep using is the material you should put inside the
    //      notebook plus the instructions. If you want something that carries over, make
    //      sure that it lives in the notebook as a file and not as a chat."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A few things worth remembering',
      body: [
        'Only the first 100 references are used for grounding, so don\'t overload the notebook',
        'Notebooks don\'t remember past chats. Only the files and instructions persist',
        'If you want something to carry over, save it as a file in the notebook, not as a chat',
      ],
      bodyTimings: [90, 420, 769],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 1011,
    },

    // 7 — Wrap-up (287.23–301.92s)
    // VO: "So if you want something that carries over, make sure that it lives in the notebook
    //      as a file and not as a chat, because those it will forget. So that's co-pilot
    //      notebooks — very helpful for when the work is repeating and source files stay
    //      mostly the same. You can use it for things like weekly updates, recurring reports,
    //      or standing briefings."
    {
      layout: 'label-title-body',
      label: 'WHEN TO USE',
      title: 'Best for repeating work\nwith stable source files',
      body: [
        'Weekly leadership updates',
        'Recurring reports',
        'Standing briefings',
      ],
      bodyTimings: [260, 338, 402],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 441,
    },
  ],
};
