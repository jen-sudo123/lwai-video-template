import { VideoData } from '../scenes/types';

// Copilot in Word — Tutorial / demo video
// Audio: audio/copilot-in-word.mp3 (250.03s) — extracted directly from the screen recording's own
//        embedded narration track (video/copilot-in-word.mp4). Video and audio are the same
//        original recording, frame-locked from comp frame 0 — no sync work needed.
// Video: video/copilot-in-word.mp4 (1024x576 screen recording), played continuously via `clipSrc` —
//        visible only during video-clip scenes, hidden (opacity 0, but still advancing) elsewhere.
// Whisper transcript (small model, segment-level) used for scene-cut timing.
//
//  scene                                          | VO start  | VO end   | dur (f@30)
//  -----------------------------------------------|-----------|----------|------------
//  1  title card                                   |   0.00    |   2.00   |    60
//  2  hook (lives inside Word)                       |   2.02    |  33.87   |   956
//  3  the basic workflow                              |  33.87    |  54.43   |   617
//  4  video — two ways to start                       |  54.43    |  81.47   |   811
//  5  video — ground Copilot in your material           |  81.47    | 105.20   |   712
//  6  video — paste the prompt & generate                | 105.20    | 142.40   |  1116
//  7  video — verify the assumptions                       | 142.40    | 157.93   |   466
//  8  video — refine the writing                             | 157.93    | 184.87   |   808
//  9  video — models & agents (+ closing line)                | 184.87    | 215.73   |   926
// 10  why your experience may vary                              | 215.73    | 250.03   |  1029
//                                                                             total    7501

export const copilotInWord: VideoData = {
  audioSrc: 'audio/copilot-in-word.mp3',
  clipSrc: 'video/copilot-in-word.mp4',
  scenes: [
    // 1 — Title card (0 → 2.00)
    {
      layout: 'title-card-green',
      title: 'Copilot in Word',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 60,
    },

    // 2 — Hook (2.02 → 33.87)
    // VO: "Copilot in Word is not a separate writing app. You experience it directly inside Word.
    //      Most of the time, you'll use it in two ways. First, to draft or add content into the
    //      document. And second, to chat with the document, so you can summarize, question,
    //      refine, or improve what is already on the page. It is not always perfectly intuitive,
    //      because the interface can vary depending on your license, your organization's
    //      settings, and which features have reached your account. But when it works, it can
    //      work very well."
    {
      layout: 'label-title-body',
      label: 'COPILOT IN WORD',
      title: 'Not a separate app —\nit lives inside Word',
      body: [
        'Draft new content, or chat with the document itself',
        'Summarize, question, refine, or improve what\'s already there',
        'Availability varies by your license, org settings & rollout',
        'When it works, it works very well',
      ],
      bodyTimings: [1, 203, 601, 887],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['pencil', 'compare', 'sliders', 'check'],
      durationInFrames: 956,
    },

    // 3 — The basic workflow (33.87 → 54.43)
    // VO: "The basic workflow is simple. I give Copilot an instruction. I can optionally attach
    //      context, such as files, emails, meetings. Copilot can now reference up to 20 items and
    //      then retrieves that content based on my existing Microsoft 365 permissions, then
    //      generates text directly into Word."
    {
      layout: 'label-title-body',
      label: 'THE BASIC WORKFLOW',
      title: 'Instruction in,\ncontent out',
      body: [
        'Give Copilot an instruction',
        'Optionally attach files, emails, or meetings as context',
        'References up to 20 items via your M365 permissions',
        'Generates text directly into Word',
      ],
      bodyTimings: [83, 143, 289, 458],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['pencil', 'sparkles', 'user', 'check'],
      durationInFrames: 617,
    },

    // 4 — Two ways to start (54.43 → 81.47)
    // VO: "So how do I start? There are two common ways. The first way is to open Word, either
    //      in the desktop app or in the browser. From there, I can use the prompt box at the top
    //      of the document, or click the Copilot icon in the document or side panel. The second
    //      way is to start from the Microsoft 365 Copilot app. I can go to Create from the app
    //      launcher, create a Word document from there, and then continue working in Word."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-word.mp4',
      videoStartTime: 54.43,
      title: 'How to start with Copilot in Word',
      titleCentered: true,
      logoPosition: 'bottom-left',
      cardDelay: 9,
      overlayHideFrom: 107,
      clipTransform: {
        scale: 1.05,
        translateX: -22,
      },
      durationInFrames: 811,
    },

    // 5 — Ground Copilot in your material (81.47 → 105.20)
    // VO: "For this demo, I'll start inside a blank Word document. I'll use the Copilot prompt
    //      box at the top of the page. Before writing the prompt, I want to ground Copilot in my
    //      working material. So I click the plus icon here, or I can type slash, to choose the
    //      documents I want Copilot to reference. In this case, I'm adding a World Economic
    //      Forum report I recently came across."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-word.mp4',
      videoStartTime: 81.47,
      durationInFrames: 712,
    },

    // 6 — Paste the prompt & generate (105.20 → 142.40)
    // VO: "Now I paste my prompt: Create a one-page brief for my leadership team that highlights
    //      the intelligence from this report and explains how it applies to us as an AI
    //      transformation partner delivering organization-wide AI enablement. The purpose is to
    //      decide how we should position ourselves given the report's insights. Stick to the
    //      facts, and make it sound like me. Use the attached reference as the source of
    //      structure and terminology. Then I click Generate. Copilot opens in the right pane and
    //      starts working through the request. When it finishes, the brief is dropped directly
    //      into my Word document. I review the output, and if it is useful, I click Done."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-word.mp4',
      videoStartTime: 105.20,
      durationInFrames: 1116,
    },

    // 7 — Verify the assumptions (142.40 → 157.93)
    // VO: "Now I do a verification pass inside the same Copilot panel. I ask: Highlight any
    //      assumptions you made because the source did not contain enough information. This is
    //      a simple trick, but it is useful. It gives me an audit-trail mindset without leaving
    //      Word."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-word.mp4',
      videoStartTime: 142.40,
      durationInFrames: 466,
    },

    // 8 — Refine the writing (157.93 → 184.87)
    // VO: "Next, I refine the writing. I select one section and choose Edit with Copilot. Here,
    //      I can describe the edit I want, or choose from pre-made options like Auto Rewrite,
    //      Structure and Refine, or Make It Shorter. For example, I type: Strengthen the opening
    //      and make it more decisive. Copilot edits the selected section directly in the
    //      document. I can keep the change, or undo it and return to the original version."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-word.mp4',
      videoStartTime: 157.93,
      durationInFrames: 808,
    },

    // 9 — Models & agents, plus closing line (184.87 → 215.73)
    // VO: "One useful update is that the Copilot panel in Word now feels closer to the broader
    //      Microsoft 365 Copilot app. I can choose different models for more complex analytical
    //      tasks by clicking the three dots at the top of the panel. I can also call agents, such
    //      as Researcher, Analyst, Designer, or an agent I have created for a specific workflow.
    //      One note is that when I use agents inside Word, they are in chat mode only and may not
    //      edit directly within the document. And that is Copilot in Word."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-word.mp4',
      videoStartTime: 184.87,
      durationInFrames: 926,
    },

    // 10 — Why your experience may vary (215.73 → 250.03)
    // VO: "If you do not see the same options, it is usually because of your Microsoft 365
    //      subscription, your Copilot license, your organization's admin settings, or the feature
    //      rollout. The full Copilot experience grounded in your work data generally requires a
    //      Microsoft 365 Copilot license. Free Copilot Chat and Microsoft 365 Copilot inside Word
    //      are not the same experience, especially when it comes to in-app drafting and editing
    //      grounded in your Microsoft 365 data."
    {
      layout: 'label-title-body',
      label: 'WHY YOUR EXPERIENCE MAY VARY',
      title: 'Copilot in Word depends\non your license',
      body: [
        'Depends on your M365 subscription, Copilot license, admin settings & rollout',
        'The full grounded experience needs a Microsoft 365 Copilot license',
        'Free Copilot Chat ≠ M365 Copilot in Word for in-app drafting & editing',
      ],
      bodyTimings: [40, 399, 645],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'check', 'x'],
      durationInFrames: 1029,
    },
  ],
};
