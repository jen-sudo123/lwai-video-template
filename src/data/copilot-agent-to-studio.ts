import { VideoData } from '../scenes/types';

// Microsoft 365 Copilot — From Copilot Agent to Copilot Studio (Larry leadership-update agent).
// Audio: audio/copilot-agent-to-studio.mp3 — narration extracted from
//        dumping/Demo_ From Copilot Agent to Copilot Studio.mp4, NOT padded
//        (title card plays over VO opening; audioStartFrame/clipStartFrame = 0). comp_frame = round(t * 30).
// Video: video/copilot-agent-to-studio.mp4 — screen recording with embedded narration, 1920x1080, 325.2s (re-cut 2026-10-17; replaces the earlier 922x576 cut).
// Screen shows footage the whole time; demo video-clips are clean (no overlay, per feedback_no_step_cards).
// Whisper transcript: src/data/copilot-agent-to-studio.transcript.json
//
//  scene                                  | start (s) | dur (frames)
//  1  title-card-green                    |    0.00   |   90
//  2  video-clip (the existing agent)     |    3.00   |  555
//  3  label-title-body (still operating)  |   21.50   |  363
//  4  big-statement (what changes?)       |   33.60   |  141
//  5  video-clip (copy to Copilot Studio) |   38.30   | 2331
//  6  label-title-body (same job, new cap)|  116.00   |  534
//  7  video-clip (knowledge/tools/flows/  |  133.80   | 5166
//                 specialist agents)      |           |
//  8  process-steps (the shift, horiz.)   |  306.00   |  368   (recording blank 306s–end)
//  9  big-statement (question)            |  318.27   |  252   (VO ends ~324.0s, +tail)
//                                              total   9800

export const copilotAgentToStudio: VideoData = {
  audioSrc: 'audio/copilot-agent-to-studio.mp3',
  audioStartFrame: 0,
  clipSrc: 'video/copilot-agent-to-studio.mp4',
  clipStartFrame: 0,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'From Copilot Agent\nto Copilot Studio',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 — The existing "Larry" agent (3.00 → 21.50), no overlay card.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agent-to-studio.mp4',
      videoStartTime: 3.0,
      logoPosition: 'bottom-left',
      durationInFrames: 555,
    },

    // 3 (starts 21.50s = f645) — "gathering" 25.00 / "start" 29.20 / "decide" 30.94
    {
      layout: 'label-title-body',
      label: 'A REUSABLE AGENT',
      title: "But you're still operating\nthe workflow",
      body: [
        'Gather: meeting notes, project updates and metrics',
        'Start: kick off the process yourself',
        'Decide: what happens with the results',
      ],
      bodyTimings: [105, 231, 283],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'bolt', 'check'],
      durationInFrames: 363,
    },

    // 4 (starts 33.60s = f1008) — "So what changes…" 33.82 → "studio?" 36.64
    {
      layout: 'big-statement',
      text: 'What changes when you move this\ninto Copilot Studio?',
      highlight: 'Copilot Studio?',
      fontSize: 72,
      animation: 'kinetic',
      durationInFrames: 141,
    },

    // 5 — Copy to Copilot Studio demo (38.30 → 116.00): menu path, what transfers,
    //     environment picker, create. No overlay card.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agent-to-studio.mp4',
      videoStartTime: 38.3,
      logoPosition: 'bottom-left',
      durationInFrames: 2331,
    },

    // 6 (starts 116.00s = f3480) — "core job" 119.50 / "adding capabilities" 130.54
    {
      layout: 'label-title-body',
      label: 'IN COPILOT STUDIO',
      title: 'Same core job,\nnew capabilities',
      body: [
        'Same job: instructions still cover what matters, what to avoid and how to structure the output',
        'New: add capabilities around that intelligence',
      ],
      bodyTimings: [105, 436],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check', 'rocket'],
      durationInFrames: 534,
    },

    // 7 — Knowledge (SharePoint), tools (Teams post), agent flows (human review),
    //     specialist agents, start of the shift recap (133.80 → 306.00). No overlay card.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agent-to-studio.mp4',
      videoStartTime: 133.8,
      logoPosition: 'bottom-left',
      durationInFrames: 5166,
    },

    // 8 (starts 306.00s = f9180) — recording goes blank white 306–314s.
    //   "get information" 309.74 / "use tools" 311.00 / "delegate" 312.40 (−8f for fade)
    {
      layout: 'process-steps',
      label: 'THE SHIFT',
      title: 'From one reusable assistant to a system that can…',
      steps: [
        { title: 'Get information', body: 'from approved sources' },
        { title: 'Use tools', body: 'act in other systems' },
        { title: 'Delegate', body: 'hand work to specialist agents' },
      ],
      stepTimings: [104, 142, 184],
      horizontal: true,
      durationInFrames: 368,
    },

    // 9 (starts 318.27s = f9548, user-set 05:18.08) — "which parts" 316.98 … "human involved?" 323.54
    {
      layout: 'big-statement',
      text: 'Which parts of this workflow\ncould the system carry forward?\nWhere do you still want a human involved?',
      highlight: 'Where do you still want a human involved?',
      fontSize: 64,
      // Per-line fade synced to VO (silencedetect pause ends): "Which parts" already
      // under way at scene start / "could" 319.10 → local 25 / "Where" 321.55 → local 98 (−8f lead).
      animation: 'fade',
      lineTimings: [0, 17, 90],
      durationInFrames: 252,
    },
  ],
};
