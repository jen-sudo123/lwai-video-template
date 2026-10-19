import { VideoData } from '../scenes/types';

// Researcher in Microsoft 365 Copilot — Tutorial / demo video
// Audio: audio/copilot-researcher.mp3 — narration extracted from dumping/Copilot Researcher.mp4, PRE-PADDED 3.00s
//        (Video.tsx trims audioStartFrame frames off the file). Whisper run on the unpadded audio;
//        comp_frame = 90 + round(t * 30). Transcript: copilot-researcher.transcript.json
// Video: video/copilot-researcher.mp4 — screen recording with embedded narration, 1024x576, 311.4s.
// Screen is live the whole way, but the first 43.5s shows an unrelated chat screen under the intro VO,
// so that stretch is graphics. Demo clip carries no overlay ([[feedback_no_step_cards]]).
// Image: images/copilot-researcher-models.png (Auto / GPT / Claude model picker)
//
//  scene                                          | start (s) | end (s) | dur (frames)
//  -----------------------------------------------|-----------|---------|-------------
//  1  title-card-green                            |   silent  |   3.00  |    90
//  2  label-title-body (what Researcher is)       |    0.00   |  20.20  |   606
//  3  label-title-body + image (models)           |   20.20   |  34.10  |   417
//  4  big-statement (real value)                  |   34.10   |  43.50  |   282
//  5  video-clip (demo, no overlay)               |   43.50   | 264.70  |  6636
//  6  label-title-body (access)                   |  264.70   | 278.50  |   414
//  7  label-title-body (usage limits)             |  278.50   | 294.00  |   465
//  8a label-title-body (data policies)            |  294.00   | 304.20  |   306
//  8b big-statement (accessible != appropriate)   |  304.20   | 312.40  |   246 (+30 tail)
//                                                         total          9462

export const copilotResearcher: VideoData = {
  audioSrc: 'audio/copilot-researcher.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/copilot-researcher.mp4',
  clipStartFrame: 90,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Researcher in Copilot',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 — "Researcher ... is a specialized agent" (0.00 / investigate 11.20 / analyze 14.34 / bring 15.94)
    {
      layout: 'label-title-body',
      label: 'WHAT IS RESEARCHER',
      title: 'A specialized agent for complex research',
      body: [
        'Investigate: a topic across multiple sources',
        'Analyze: the information it finds',
        'Report: findings brought together, structured, with citations',
      ],
      bodyTimings: [330, 424, 472],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['eye', 'sliders', 'document-text'],
      durationInFrames: 606,
    },

    // 3 — Models (GPT 23.50 / Claude 25.76 / Depending 27.78)
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Advanced reasoning models',
      body: [
        'GPT models from OpenAI',
        'Claude models from Anthropic',
        'Depending on your license and organization settings, you may be able to choose the model',
      ],
      bodyTimings: [93, 161, 221],
      image: 'images/copilot-researcher-models.png',
      durationInFrames: 417,
    },

    // 4 — The real value (34.32 / 37.56 / 39.40)
    {
      layout: 'big-statement',
      text: 'The real value is\nyour work environment\nplus external web research.',
      label: 'THE REAL VALUE',
      size: 'title',
      animation: 'fade',
      lineTimings: [6, 98, 152],
      durationInFrames: 282,
    },

    // 5 — Demo (43.50 → 264.70), no overlay card
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-researcher.mp4',
      videoStartTime: 43.5,
      logoPosition: 'bottom-left',
      durationInFrames: 6636,
    },

    // 6 — Access (eligible 268.82 / "If you don't see" 275.10)
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Who can use Researcher',
      body: [
        'Eligible licenses: Researcher comes with eligible Microsoft 365 Copilot licenses, subject to your organization\'s settings',
        'Cannot see it: check with your IT administrator',
      ],
      bodyTimings: [72, 306],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check', 'user'],
      durationInFrames: 414,
    },

    // 7 — Usage limits (usage 279.48 / worth 284.54 / rather 289.90)
    {
      layout: 'label-title-body',
      label: 'USAGE LIMITS',
      title: 'Save it for depth',
      body: [
        'Limits: vary by plan, change over time',
        'Use it for: tasks needing deeper investigation',
        'Skip it for: quick questions regular chat can handle',
      ],
      bodyTimings: [23, 175, 335],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['clock', 'check', 'x'],
      durationInFrames: 465,
    },

    // 8a — Data policies (294.12 / 296.34 / 299.74)
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'Mind your data',
      body: [
        'Access: giving Researcher your work data or connecting more apps',
        'Always: follow your organization\'s data access and security policies',
      ],
      bodyTimings: [64, 166],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['lock-closed', 'shield-check'],
      durationInFrames: 306,
    },

    // 8b — Closing (304.14 / doesn't 306.50 / appropriate 308.56)
    {
      layout: 'big-statement',
      text: 'Just because it\'s accessible,\nit doesn\'t automatically mean\nit\'s appropriate to use or share.',
      label: 'REMEMBER',
      size: 'title',
      animation: 'fade',
      lineTimings: [4, 69, 125],
      durationInFrames: 276,
    },
  ],
};
