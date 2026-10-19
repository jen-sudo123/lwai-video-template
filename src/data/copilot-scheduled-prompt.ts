import { VideoData } from '../scenes/types';

// Microsoft 365 Copilot — Scheduled Prompts tutorial.
// Audio: audio/copilot-scheduled-prompt.mp3 — narration extracted from dumping/Copilot Scheduled Prompt.mp4, NOT padded
//        (title card plays over VO opening; audioStartFrame/clipStartFrame = 0). comp_frame = round(t * 30).
// Video: video/copilot-scheduled-prompt.mp4 — screen recording with embedded narration, 1024x576, 175.39s.
// Screen is blank/white 0–40.5s (presenter intro). Demo footage 40.5–133.4s, clean video-clip (no overlay, per feedback_no_step_cards).
// Whisper transcript: src/data/copilot-scheduled-prompt.transcript.json
//
//  scene                              | start (s) | dur (frames)
//  1  title-card-green                |    0.00   |   90
//  2  label-title-body (what/why)     |    3.00   |  537
//  3  label-title-body (how it works) |   20.90   |  588
//  4  video-clip (demo)               |   40.50   | 2787
//  5  label-title-body (use cases)    |  133.40   |  348
//  6  label-title-body (availability) |  145.00   |  450
//  7  label-title-body (review)       |  160.00   |  180
//  8  big-statement (key shift)       |  166.00   |  327   (+45f tail)
//                                          total   5307

export const copilotScheduledPrompt: VideoData = {
  audioSrc: 'audio/copilot-scheduled-prompt.mp3',
  audioStartFrame: 0,
  clipSrc: 'video/copilot-scheduled-prompt.mp4',
  clipStartFrame: 0,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Scheduled Prompts',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 (starts 3.00s = f90) — "start automating" 9.4 (f192) / "daily briefings" 14.6 (f348) / "without building" 18.6 (f468)
    {
      layout: 'label-title-body',
      label: 'SCHEDULED PROMPTS',
      title: 'Automate repetitive work\nwith scheduled prompts',
      body: [
        'Let Copilot start repetitive work for you on a schedule',
        'Daily briefings, weekly summaries, meeting preparation',
        'No complex automation to build',
      ],
      bodyTimings: [190, 346, 466],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'clock', 'sparkles'],
      durationInFrames: 537,
    },

    // 3 (starts 20.90s = f627) — "scheduled time" 21.2 / "response ... review" 24.8 / "draw on ... work context" 30.5
    {
      layout: 'label-title-body',
      label: 'HOW IT WORKS',
      title: 'Copilot runs the prompt,\nyou review the result',
      body: [
        'At the scheduled time, Copilot runs your prompt automatically',
        'It generates a response for you to review',
        'It can draw on emails, meetings and chats, depending on your permissions',
      ],
      bodyTimings: [12, 112, 280],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['clock', 'eye', 'chat-bubble-left-right'],
      durationInFrames: 588,
    },

    // 4 — Demo (40.50 → 133.40), no overlay card.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-scheduled-prompt.mp4',
      videoStartTime: 40.5,
      logoPosition: 'bottom-left',
      durationInFrames: 2787,
    },

    // 5 (starts 133.40s = f4002) — "Scheduled Prompts for" 136.8 / "summary" 139.5 / "check-ins" 141.4 / "weekly leadership" 143.2
    {
      layout: 'label-title-body',
      label: 'WHAT TO SCHEDULE',
      title: 'Think about the tasks\nyou repeat every week',
      body: [
        'Daily meeting briefing',
        'Summary of important emails',
        'Regular project check-ins',
        'Weekly leadership update',
      ],
      bodyTimings: [98, 176, 233, 288],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['clock', 'chat-bubble-left-right', 'check', 'trending'],
      durationInFrames: 348,
    },

    // 6 (starts 145.00s = f4350) — "Just remember" 145.4 / "available in" 151.3 / "depending on your organization's" 157.7
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'Availability depends\non your setup',
      body: [
        'License: an eligible Microsoft 365 Copilot license',
        'Where: Copilot Chat, Teams and Outlook, on web and desktop',
        'Admin settings: what your organization turns on',
      ],
      bodyTimings: [14, 180, 372],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'chat-bubble-left-right', 'sliders'],
      durationInFrames: 450,
    },

    // 7 (starts 160.00s = f4800) — "review" 161.4 (f42)
    {
      layout: 'label-title-body',
      label: 'GOOD PRACTICE',
      title: 'Review before\nyou act',
      body: ['Check important AI-generated information before acting on it'],
      bodyTimings: [36],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye'],
      durationInFrames: 180,
    },

    // 8 (starts 166.00s = f4980) — "key shift" 166.1 … "automatically" 174.3
    {
      layout: 'big-statement',
      text: 'From asking AI for the same thing every time\nto AI doing recurring work for you.',
      highlight: 'AI doing recurring work for you.',
      fontSize: 64,
      animation: 'kinetic',
      durationInFrames: 327,
    },
  ],
};
