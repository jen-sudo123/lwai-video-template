import { VideoData } from '../scenes/types';

// Copilot Agents (build "Larry", a weekly leadership-update agent) — Tutorial / demo video
// NOTE: separate from the July 'CopilotAgents' video (src/data/copilot-agents.ts) — this is a NEW recording/narration.
// Audio: audio/copilot-agents-larry-vo.mp3 — narration extracted from dumping/Copilot Agents.mp4, NOT padded (no title card;
//        audioStartFrame/clipStartFrame = 0). comp_frame = round(t * 30). Transcript: copilot-agents-larry.transcript.json
// Video: video/copilot-agents-larry.mp4 — screen recording with embedded narration, 1024x576.
// Source recording is blank/white 0–24.5s (presenter narrating the concept) — those stretches are graphic scenes.
// Screen visible 24.5–239.5s. Per [[feedback_no_step_cards]] the demo video-clip carries no overlay.
//
//  scene                                  | start (s) | end (s) | dur (frames)
//  ---------------------------------------|-----------|---------|-------------
//  1  title-card-green (over VO opening)  |    0.00   |   3.00  |    90
//  2  label-title-body (what an agent is) |    3.00   |  11.20  |   246
//  3  label-title-body (what you set up)  |   11.20   |  19.20  |   240
//  4  big-statement (prompt -> assistant) |   19.20   |  24.50  |   159
//  5  video-clip (demo, no overlay)       |   24.50   | 233.00  |  6255
//  6  label-title-body (options vary)     |  233.00   | 240.40  |   222
//  7  big-statement (Copilot Studio)      |  240.40   | 248.00  |   228
//                                                total          7440

export const copilotAgentsLarry: VideoData = {
  audioSrc: 'audio/copilot-agents-larry-vo.mp3',
  audioStartFrame: 0,
  clipSrc: 'video/copilot-agents-larry.mp4',
  clipStartFrame: 0,
  scenes: [
    // 1 — opening card plays OVER the first 3s of narration (no silent pad)
    {
      layout: 'title-card-green',
      title: 'Agents in Copilot',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 (starts 3.00s) — "configure for a specific workflow" (4.88) / "explaining the same task" (7.74-7.90)
    {
      layout: 'label-title-body',
      label: 'WHAT IS AN AGENT',
      title: 'A reusable mini assistant',
      body: [
        'Configured once for a specific workflow',
        'No more explaining the same task every time you start a new chat',
      ],
      bodyTimings: [56, 142],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'clock'],
      durationInFrames: 246,
    },

    // 3 — clear role (12.66) / standing (13.72) / selected knowledge (15.14-15.48) / work content (18.02)
    {
      layout: 'label-title-body',
      label: 'WHAT YOU CONFIGURE',
      title: 'Give the agent four things',
      body: [
        'Role: a clear job to do',
        'Instructions: standing guidance it always follows',
        'Knowledge: selected sources it can draw on',
        'Work content: access to relevant files and messages',
      ],
      bodyTimings: [44, 76, 122, 204],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'sliders', 'lightbulb', 'eye'],
      durationInFrames: 240,
    },

    // 4 — "Think of it as turning a strong prompt into a reusable assistant." (19.38 / 21.52)
    {
      layout: 'big-statement',
      text: 'A strong prompt,\nturned into a\nreusable assistant.',
      label: 'THE IDEA',
      size: 'title',
      animation: 'fade',
      lineTimings: [40, 70, 88],
      durationInFrames: 159,
    },

    // 5 — Demo (24.50 → 233.00), no overlay card
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents-larry.mp4',
      videoStartTime: 24.5,
      logoPosition: 'bottom-left',
      durationInFrames: 6255,
    },

    // 6 — Options vary (233.06 / license ~236.0 / permissions 238.18 / admin ~239.1)
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'The exact options you see may vary',
      body: [
        'License: what your Microsoft 365 plan includes',
        'Permissions: what you are allowed to do',
        'Admin settings: what your organization turns on',
      ],
      bodyTimings: [90, 155, 186],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'check', 'sliders'],
      durationInFrames: 222,
    },

    // 7 — Closing (240.54 / 242.98 / 244.86)
    {
      layout: 'big-statement',
      text: 'Need advanced automation,\nactions or integrations?\nThat is Copilot Studio.',
      label: 'WHAT IS NEXT',
      size: 'title',
      animation: 'fade',
      lineTimings: [9, 77, 150],
      durationInFrames: 228,
    },
  ],
};
