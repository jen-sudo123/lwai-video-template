import { VideoData } from '../scenes/types';

// Copilot Notebooks (build "Larry", a weekly leadership-update notebook) — Tutorial / demo video
// NOTE: separate from the older 'CopilotNotebook' video (src/data/copilot-notebook.ts) — this is a NEW recording/narration.
// Audio: audio/copilot-notebook-v2-tail.mp3 — narration extracted from dumping/Copilot Notebook.mp4, NOT padded
//        (title card plays over VO opening; audioStartFrame/clipStartFrame = 0). comp_frame = round(t * 30).
// Video: video/copilot-notebook-v2.mp4 — screen recording with embedded narration, 1024x576, 247.16s.
// Source recording is blank/white 0–31.5s and 224–247s (presenter narrating) — those stretches are graphic scenes.
// Screen visible 31.5–224.0s. Per [[feedback_no_step_cards]] the demo video-clip carries no overlay.
// Overview image reused from the old video: images/copilot-notebook-overview.png (4-panel diagram).
//
//  scene                                   | start (s) | end (s) | dur (frames)
//  ----------------------------------------|-----------|---------|-------------
//  1  title-card-green (over VO opening)   |    0.00   |   3.00  |    90
//  2  label-title-body (what notebooks are)|    3.00   |  20.96  |   539
//  3  label-title-body (persistent + demo) |   20.96   |  31.50  |   316
//  4  video-clip (demo, no overlay)        |   31.50   | 224.00  |  5775
//  5  label-title-body (Copilot -> OneNote)|  224.00   | 234.64  |   319
//  6  label-title-body (options vary)      |  234.64   | 247.16  |   376
//                                                 total          7460 (last scene +45f tail)

export const copilotNotebookLarry: VideoData = {
  audioSrc: 'audio/copilot-notebook-v2.mp3',
  audioStartFrame: 0,
  clipSrc: 'video/copilot-notebook-v2.mp4',
  clipStartFrame: 0,
  scenes: [
    // 1 — opening card plays OVER the first 3s of narration (no silent pad)
    {
      layout: 'title-card-green',
      title: 'Copilot Notebooks',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 (starts 3.00s) — "references and instructions you choose" (3.1-7.9) / "instead of a fresh conversation"
    // (7.9-11.4) / "add the information" (11.5) / "define how I want it to respond" (~17) / "reuse that context" (~19.5)
    {
      layout: 'label-title-body',
      label: 'COPILOT NOTEBOOKS',
      title: 'A focused workspace\nfor references and instructions',
      body: [
        'Add the information Copilot should work from, instead of starting a fresh chat every time',
        'Define how it should respond, then reuse that context across conversations',
      ],
      bodyTimings: [330, 425],
      image: 'images/copilot-notebook-overview.png',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 30, centerX: 0.28, centerY: 0.3, scale: 1.7 },
        { startFrame: 325, centerX: 0.75, centerY: 0.3, scale: 1.7 },
        { startFrame: 420, centerX: 0.75, centerY: 0.72, scale: 1.7 },
        { startFrame: 495, centerX: 0.28, centerY: 0.72, scale: 1.7 },
      ],
      durationInFrames: 539,
    },

    // 3 (starts 20.96s) — "persistent workspace around a specific project or recurring workflow" (20.96-26.96)
    // / "weekly leadership updates" (27.04-32.0)
    {
      layout: 'label-title-body',
      label: 'THE DEMO',
      title: 'A persistent workspace for\na recurring workflow',
      body: [
        'One notebook per project or repeating job',
        'This demo: preparing weekly leadership updates',
      ],
      bodyTimings: [30, 180],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'clock'],
      durationInFrames: 316,
    },

    // 4 — Demo (31.50 → 224.00), no overlay card
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-notebook-v2.mp4',
      videoStartTime: 31.5,
      logoPosition: 'bottom-left',
      durationInFrames: 5775,
    },

    // 5 (starts 224.00s) — "Copilot app = quick place to create and start, OneNote = go deeper" (~211-234.6)
    {
      layout: 'label-title-body',
      label: 'GO DEEPER',
      title: 'Start in Copilot,\ncontinue in OneNote',
      body: [
        'The Copilot app is a quick place to create and start the notebook',
        'OneNote adds audio overviews, mind maps and study guides, depending on availability',
      ],
      bodyTimings: [20, 140],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'lightbulb'],
      durationInFrames: 319,
    },

    // 6 (starts 234.64s) — word-level: "license" 236.66 (f61), "permissions" 238.52 (f116), "admin settings" 239.46 (f145)
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'The exact options you see may vary',
      body: [
        'License and account: what your Microsoft 365 plan includes',
        'Permissions: what you are allowed to do',
        'Admin settings: what your organization turns on',
      ],
      bodyTimings: [55, 108, 138],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'check', 'sliders'],
      durationInFrames: 421, // +45f silent tail so the last word isn't cut off
    },
  ],
};
