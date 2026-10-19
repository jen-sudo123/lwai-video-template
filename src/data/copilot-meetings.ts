import { VideoData } from '../scenes/types';

// Microsoft 365 Copilot — Copilot in Teams meetings tutorial.
// Audio: audio/copilot-meetings.mp3 — narration extracted from dumping/Copilot for meetings.mp4, NOT padded
//        (title card plays over VO opening; audioStartFrame/clipStartFrame = 0). comp_frame = round(t * 30).
// Video: video/copilot-meetings.mp4 — screen recording with embedded narration, 1920x1080, 266.1s.
// Screen is blank/white 0–24.95s (presenter intro). Demo footage 25.0–222.4s, clean video-clip (no overlay, per feedback_no_step_cards).
// Whisper transcript: src/data/copilot-meetings.transcript.json
//
//  scene                              | start (s) | dur (frames)
//  1  title-card-green                |    0.00   |   90
//  2  label-title-body (what/why)     |    3.00   |  660
//  3a video-clip (demo)               |   25.00   |  364
//  3b video-clip (2 option cards)     |   37.13   |  473
//  3c video-clip (demo)               |   52.90   | 5085
//  4  label-title-body (good to know) |  222.40   |  603
//  5  label-title-body (good practice)|  242.50   |  450
//  6  big-statement (goal)            |  257.50   |  303   (+45f tail)
//                                          total   8028

export const copilotMeetings: VideoData = {
  audioSrc: 'audio/copilot-meetings.mp3',
  audioStartFrame: 0,
  clipSrc: 'video/copilot-meetings.mp4',
  clipStartFrame: 0,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Copilot in Meetings',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 (starts 3.00s = f90) — "During a meeting" 7.7 / "Afterward" 15.0 / "turn the discussion" ~19.0
    {
      layout: 'label-title-body',
      label: 'COPILOT IN MEETINGS',
      title: 'Value during the meeting\nand after it ends',
      body: [
        'During: follow the live discussion, catch up, get questions to ask',
        'Afterward: review decisions and identify action items',
        'Turn the discussion into something actionable',
      ],
      bodyTimings: [133, 352, 472],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['chat-bubble-left-right', 'eye', 'check'],
      durationInFrames: 660,
    },

    // 3a — Demo (25.00 → 37.13), no overlay card, no zoom.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-meetings.mp4',
      videoStartTime: 25.0,
      logoPosition: 'bottom-left',
      durationInFrames: 364,
    },

    // 3b — The two Allow Copilot options (37.13 → 52.90): "Only during the meeting" 38.1 / "During and after" 46.0
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-meetings.mp4',
      videoStartTime: 37.133,
      label: 'ALLOW COPILOT',
      title: 'Two main options',
      body: [
        'Only during the meeting: follows the live discussion, no transcript saved',
        'During and after the meeting: requires transcription',
      ],
      bodyTimings: [25, 258],
      panelLayout: 'cards-left',
      logoPosition: 'bottom-left',
      durationInFrames: 473,
    },

    // 3c — Demo continues (52.90 → 222.40), no overlay card.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-meetings.mp4',
      videoStartTime: 52.9,
      logoPosition: 'bottom-left',
      durationInFrames: 5085,
    },

    // 4 (starts 222.40s = f6672) — "Remember" 222.9 / "During a meeting" 229.7 / "After a meeting" 236.4
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'What Copilot can do\ndepends on your setup',
      body: [
        'License, permissions and organizational settings',
        'During a meeting: works with live speech, no transcript needed',
        'After a meeting: needs an accessible saved transcript',
      ],
      bodyTimings: [7, 211, 412],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'clock', 'sliders'],
      durationInFrames: 603,
    },

    // 5 (starts 242.50s = f7275) — "verify" 242.7 / "Follow your organization's policies" 250.4
    {
      layout: 'label-title-body',
      label: 'GOOD PRACTICE',
      title: 'Verify before\nyou act',
      body: [
        'Verify critical facts, decisions and commitments in AI-generated output',
        "Follow your organization's policies on transcription and sensitive content",
      ],
      bodyTimings: [6, 229],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'sliders'],
      durationInFrames: 450,
    },

    // 6 (starts 257.50s = f7725) — "The goal" 257.7 … "what happens next" 265.8
    {
      layout: 'big-statement',
      text: 'Let Copilot handle the admin work\nso you can focus on the conversation and the decisions.',
      highlight: 'focus on the conversation and the decisions.',
      fontSize: 64,
      animation: 'kinetic',
      durationInFrames: 303,
    },
  ],
};
