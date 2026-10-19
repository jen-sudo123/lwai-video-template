import { VideoData } from '../scenes/types';

// Copilot Skills (custom skill in PowerPoint) — Tutorial / demo video
// Audio: audio/copilot-skills.mp3 — narration extracted from dumping/Copilot Skills.mp4 ONLY, PRE-PADDED 3.00s
//        (Video.tsx trims audioStartFrame frames off the file). Whisper run on the unpadded audio;
//        comp_frame = 90 + round(t * 30). Transcript: copilot-skills.transcript.json
// Video: video/copilot-skills.mp4 — screen recording with embedded narration, 1024x576.
// Source recording is blank/white 0–85.5s and 207.5–235s (presenter narrating before/after screen-share) —
// those stretches are graphic scenes. Per [[feedback_no_step_cards]] the demo video-clip carries no overlay.
//
//  scene                                          | start (s) | end (s) | dur (frames)
//  -----------------------------------------------|-----------|---------|-------------
//  1  title-card-green                            |   silent  |   3.00  |    90
//  2  label-title-body (what a skill is)          |    0.00   |  15.10  |   453
//  3  label-title-body (SKILL.md anatomy)         |   15.10   |  33.00  |   537
//  4  label-title-body (effective instructions)   |   33.00   |  45.50  |   375
//  5  label-title-body (go further)               |   45.50   |  64.00  |   555
//  6a split-contrast (prompt vs skill)           |   64.00   |  79.50  |   465
//  6b label-title-body (where to find skills)    |   79.50   |  85.50  |   180
//  7  video-clip (demo, no overlay)               |   85.50   | 207.50  |  3660
//  8  label-title-body (across apps)              |  207.50   | 224.40  |   507
//  9  big-statement (availability)                |  224.40   | 236.00  |   348
//                                                         total          7170

export const copilotSkills: VideoData = {
  audioSrc: 'audio/copilot-skills.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/copilot-skills.mp4',
  clipStartFrame: 90,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Skills in Copilot',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 — "A skill is a reusable set of instructions..." (0.40 / 10.96)
    {
      layout: 'label-title-body',
      label: 'WHAT IS A SKILL',
      title: 'Instructions you write once',
      body: [
        'A reusable set of instructions for a specific type of task',
        'Package your guidance into a skill, then reuse it whenever you need it',
      ],
      bodyTimings: [8, 318],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'bolt'],
      durationInFrames: 453,
    },

    // 3 — SKILL.md anatomy (19.40 / 21.08 / 29.54)
    {
      layout: 'label-title-body',
      label: 'ANATOMY',
      title: 'Built around one file: SKILL.md',
      body: [
        'A custom skill is typically built around a file called SKILL.md',
        'It starts with the name and a description of what the skill does and where to use it',
        'Below that: the instructions Copilot should follow',
      ],
      bodyTimings: [90, 171, 425],
      image: 'images/skill-md.png',
      durationInFrames: 537,
    },

    // 4 — Effective instructions (37.06 / 38.98 / 41.36 / 43.38)
    {
      layout: 'label-title-body',
      label: 'THE INSTRUCTIONS',
      title: 'What effective instructions include',
      body: [
        'Role: who Copilot should act like',
        'Goal: the results you are trying to achieve',
        'Rules: what it should and should not do',
        'Output: what the finished result looks like',
      ],
      bodyTimings: [114, 171, 243, 303],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'star', 'sliders', 'check'],
      durationInFrames: 375,
    },

    // 5 — Go further (53.52 / 56.68 / 60.34)
    {
      layout: 'label-title-body',
      label: 'GO FURTHER',
      title: 'Add process for repeatable work',
      body: [
        'Steps Copilot should follow, and in which order',
        'Tools or resources it should use',
        'Checks to perform before returning results',
      ],
      bodyTimings: [232, 327, 437],
      diagram: 'skill-stack',
      diagramTimings: [232, 290, 327, 437],
      imageHeight: 640,
      durationInFrames: 555,
    },

    // 6a — Prompt vs skill (66.14 / 70.58 → 79.50)
    {
      layout: 'split-contrast',
      leftLabel: 'A GOOD PROMPT',
      leftTitle: 'Strong instructions for the work in front of you.',
      rightLabel: 'A SKILL',
      rightTitle: 'Reusable instructions, plus the process and resources for consistent results.',
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 189, value: 'right' },
        { from: 400, value: null },
      ],
      durationInFrames: 465,
    },

    // 6b — Where to find skills (79.70 / 84.02 → 85.50)
    {
      layout: 'label-title-body',
      label: 'WHERE TO FIND SKILLS',
      title: 'It depends on your Copilot experience',
      body: ['This lesson: a custom skill in PowerPoint'],
      bodyTimings: [127],
      durationInFrames: 180,
    },

    // 7 — Demo (85.50 → 207.50), no overlay card
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-skills.mp4',
      videoStartTime: 85.5,
      logoPosition: 'bottom-left',
      durationInFrames: 3660,
    },

    // 8 — Across apps (207.54 / 215.32)
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'Skills do not travel automatically',
      body: [
        'A skill in PowerPoint may not appear in Excel',
        'To reuse it across apps, add or copy it to the location each Copilot experience expects',
      ],
      bodyTimings: [20, 190],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['x', 'check'],
      durationInFrames: 507,
    },

    // 9 — Closing (225 / 228.64 / 231.36)
    {
      layout: 'big-statement',
      text: 'Availability varies by\nthe app, your license\nand organization settings.',
      label: 'THE CATCH',
      size: 'title',
      animation: 'fade',
      lineTimings: [10, 127, 205],
      durationInFrames: 348,
    },
  ],
};
