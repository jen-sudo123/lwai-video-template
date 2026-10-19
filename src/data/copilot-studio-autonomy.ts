import { VideoData } from '../scenes/types';

// Microsoft Copilot Studio — What Autonomy Looks Like in Copilot Studio (Larry leadership-update agent).
// Audio: audio/copilot-studio-autonomy.mp3 — narration extracted from
//        dumping/Demo_ What Autonomy Looks like in Copilot Studio.mp4, NOT padded
//        (title card plays over VO opening; audioStartFrame/clipStartFrame = 0). comp_frame = round(t * 30).
// Video: video/copilot-studio-autonomy.mp4 — screen recording with embedded narration, 1024x576 (16:9), 226.5s.
//        Recording is blank white at 0–3s, 104–147s and 181s–end; graphic scenes cover those stretches.
// Demo video-clips are split into beats, each with a top-left explanation card (user request, overrides feedback_no_step_cards).
// Whisper transcript: src/data/copilot-studio-autonomy.transcript.json
//
//  scene                                    | start (s) | dur (frames)
//  1  title-card-green                      |    0.00   |   90
//  2  video-clip ×5 (Teams tool, ask end  |    3.00   | 3042   (beats 3.0/15.0/30.2/48.7/81.8)
//                 user, SharePoint)         |           |
//  3  label-title-body (same agent)         |  104.40   |  540
//  4  big-statement (dial in practice)      |  122.40   |  132
//  5  label-title-body (approval not enough)|  126.80   |  618
//  6  video-clip ×2 (agent flow, review)  |  147.40   |  972   (beats 147.4/165.8)
//  7  label-title-body (the autonomy dial)  |  179.80   |  750
//  8  label-title-body (design your own)    |  204.80   |  486
//  9  big-statement (closing)               |  221.00   |  180   (VO ends ~224.8s, video ends 226.5s)
//                                                total   6810

export const copilotStudioAutonomy: VideoData = {
  audioSrc: 'audio/copilot-studio-autonomy.mp3',
  audioStartFrame: 0,
  clipSrc: 'video/copilot-studio-autonomy.mp4',
  clipStartFrame: 0,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'What Autonomy Looks Like in Copilot\u00A0Studio',
      label: 'MICROSOFT COPILOT STUDIO',
      durationInFrames: 90,
    },

    // 2a — demo beats on continuous footage, top-left explanation card per beat (3.00 → 15.00)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 3.0,
      label: 'THE SETUP',
      title: 'An agent with a tool that\ncan post Teams messages',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 360,
    },
    // 2b — "first, I can allow the agent to decide" (15.00 → 30.20)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 15.0,
      label: 'GENERATIVE ORCHESTRATION',
      title: 'Copilot decides when\nthe tool is relevant',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 456,
    },
    // 2c — can it act without me? setting + confirmation prompt (30.20 → 48.70)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 30.2,
      label: 'A SEPARATE DECISION',
      title: 'Ask the end user\nbefore running',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 555,
    },
    // 2d — "moves this action to act with approval" (48.70 → 81.80)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 48.7,
      label: 'ACT WITH APPROVAL',
      title: 'It prepares the action, then\npauses for your OK',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 993,
    },
    // 2e — SharePoint retrieval comparison (81.80 → 104.40)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 81.8,
      label: 'NO APPROVAL NEEDED',
      title: 'Reading SharePoint runs\nwithout asking each time',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 678,
    },

    // 3 (starts 104.40s = f3132) — "Teams" 106.66 / "same agent" 118.54
    {
      layout: 'label-title-body',
      label: 'SAME AGENT',
      title: 'Different authority levels\nfor different actions',
      body: [
        'Read from SharePoint: nothing changes, so it runs without asking',
        'Post to Teams: a visible change on your behalf, so it needs approval',
      ],
      bodyTimings: [10, 60],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'check'],
      durationInFrames: 540,
    },

    // 4 (starts 122.40s = f3672) — "autonomy dial" 123.50 → "practice" 124.74
    {
      layout: 'big-statement',
      text: 'That is the autonomy dial\nin practice',
      highlight: 'autonomy dial',
      fontSize: 80,
      animation: 'kinetic',
      durationInFrames: 132,
    },

    // 5 (starts 126.80s = f3804) — "approval" 127.60 / "shouldn't" 138.80 / "example" 141.78
    {
      layout: 'label-title-body',
      label: 'A DIFFERENT PROBLEM',
      title: "When approval\nisn't enough",
      body: [
        'Approval: the agent knows what to do, you authorize it',
        "Judgment: the agent shouldn't make the decision by itself",
        'Example: one source says the launch may slip, another shows the original date',
      ],
      bodyTimings: [16, 352, 441],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check', 'user', 'compare'],
      bodyCardCompact: true,
      durationInFrames: 618,
    },

    // 6a — agent flow "Review Leadership Update Exception" (147.40 → 165.80)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 147.4,
      label: 'HAND BACK TO A PERSON',
      title: 'An agent flow pauses and\nasks a person for guidance',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 552,
    },
    // 6b — "different from simply asking me to approve" (165.80 → 179.80)
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-studio-autonomy.mp4',
      videoStartTime: 165.8,
      label: 'BEYOND APPROVAL',
      title: 'Outside its authority, it\nhands the judgment back',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      durationInFrames: 420,
    },

    // 7 (starts 179.80s = f5394) — "routine" 182.28 / "consequential" 185.54 / "ambiguity" 190.08
    {
      layout: 'label-title-body',
      label: 'THE AUTONOMY DIAL',
      title: 'Put checkpoints where\nthe consequences change',
      body: [
        'Routine work: let the system continue',
        'Consequential action: require confirmation',
        'Ambiguity or exception: hand the decision back to a person',
      ],
      bodyTimings: [66, 164, 300],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'check', 'user'],
      bodyCardCompact: true,
      durationInFrames: 750,
    },

    // 8 (starts 204.80s = f6144) — "What can it do" 214.10 / "require approval" 216.30 / "stop and ask" 218.36
    {
      layout: 'label-title-body',
      label: 'DESIGN YOUR OWN WORKFLOW',
      title: 'Look at the\nindividual actions',
      body: [
        'By itself: what can it do on its own?',
        'With approval: what should require sign-off?',
        'Stop and ask: what should go back to a person?',
      ],
      bodyTimings: [271, 337, 399],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'check', 'chat-bubble-left-right'],
      bodyCardCompact: true,
      durationInFrames: 486,
    },

    // 9 (starts 221.00s = f6630) — "autonomy dial" 222.68 → "Studio" 224.46
    {
      layout: 'big-statement',
      text: "That's how you turn the autonomy dial\nin Copilot Studio",
      highlight: 'autonomy dial',
      fontSize: 72,
      animation: 'kinetic',
      durationInFrames: 180,
    },
  ],
};
