import { VideoData } from '../scenes/types';

// Microsoft 365 Copilot Agents — tutorial / demo video
// Main audio: audio/copilot-agents-original.mp3 — the ORIGINAL recording's own audio track,
//   extracted from dumping/Copilot Agents.mp4. This is real narration (not a synthetic VO),
//   245.5s, with ~2.1s of natural silence already at the start (used for the title card).
// Demo footage: video/copilot-agents.mp4 — same source, desktop screen recording (1024x576),
//   played continuously via clipSrc; individual video-clip scenes only set the trim offset.
// Hero image: images/copilot-agents/hero-robot.jpg — used in the concept scene before the
//   on-screen demo starts (screen is blank/white for the first ~28s of the recording).
// Scene boundaries below come from a Whisper word-timestamp pass on the extracted audio.
//
//  scene                     | start (s) | dur (f)
//  --------------------------|-----------|--------
//  0  title card             |    0.00   |    64
//  1  concept — what is it   |    2.12   |   479
//  2  concept — super prompt |   18.10   |   392
//  3  getting started        |   31.18   |   466
//  4  skip to configuration  |   46.70   |   249
//  5  name the agent         |   55.00   |   197
//  6  instructions field     |   61.58   |   348
//  7  four elements          |   73.18   |   441
//  8  the variable part      |   87.88   |   289
//  9  the goal               |   97.50   |   260
//  10 knowledge sources      |  106.18   |   464
//  11 avoid noise            |  121.64   |   273
//  12 review capabilities    |  130.74   |   486
//  13 starter prompts        |  146.94   |   756
//  14 preview & test         |  172.14   |   456
//  15 review checklist       |  187.32   |   240
//  16 create the agent       |  195.32   |   480
//  17 using your agent       |  211.32   |   457
//  18 availability (cards)   |  226.56   |   568
//  19 closing quote          |    —      |   180

export const copilotAgents: VideoData = {
  audioSrc: 'audio/copilot-agents-original.mp3',
  clipSrc: 'video/copilot-agents.mp4',
  avatarSrc: 'video/avatar-copilot-agents.mp4',
  avatarStartFrame: 0,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Microsoft 365 Copilot Agents',
      label: 'COPILOT AGENTS',
      durationInFrames: 64,
    },
    {
      layout: 'label-title-body',
      label: 'WHAT IS AN AGENT?',
      title: 'Copilot Agents are reusable\nmini-assistants you configure\nfor a specific workflow',
      body: [
        'Give it a role, standing instructions,\napproved knowledge sources, and capabilities',
      ],
      bodyTimings: [170],
      durationInFrames: 479,
    },
    {
      layout: 'label-title-body',
      label: 'THE CONCEPT',
      title: 'Turning a super prompt\ninto a reusable assistant',
      body: [
        'Create agents from Copilot,\nOneDrive, or SharePoint',
      ],
      bodyTimings: [110],
      image: 'images/copilot-agents/hero-robot.jpg',
      durationInFrames: 392,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 31.18,
      overlayPosition: 'top',
      label: 'GETTING STARTED',
      title: 'Open the Microsoft 365 Copilot\napp and click New agent',
      body: ['Describe the agent in the prompt box,\nor skip directly to configuration'],
      bodyTimings: [271],
      durationInFrames: 466,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 46.70,
      overlayPosition: 'top',
      label: 'SKIP TO CONFIGURATION',
      title: 'Skip straight to configuration',
      body: ['Building an assistant that writes\nweekly leadership updates'],
      bodyTimings: [103],
      durationInFrames: 249,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 55.00,
      overlayPosition: 'top',
      label: 'NAME THE AGENT',
      title: 'Name it, and add\na short description',
      body: ['"Larry" — Helps me write weekly\nleadership updates'],
      bodyTimings: [49],
      durationInFrames: 197,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 61.58,
      overlayPosition: 'top',
      label: 'THE INSTRUCTIONS FIELD',
      title: 'The most important part:\nthe Instructions field',
      body: ['Paste your tested prompt template,\npersonalized to your workflow'],
      bodyTimings: [201],
      durationInFrames: 348,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 73.18,
      overlayPosition: 'top',
      label: 'FOUR CONSISTENT ELEMENTS',
      title: 'Aligned with CO-DO SuperPrompting',
      body: ["Role · Objective · Do's and Don'ts · Output format"],
      bodyTimings: [0],
      durationInFrames: 441,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 87.88,
      overlayPosition: 'top',
      label: 'THE VARIABLE PART',
      title: 'The fifth element is\nthe variable part',
      body: ["What you provide each time: this week's\nnotes, priorities, metrics, or context"],
      bodyTimings: [74],
      durationInFrames: 289,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 97.50,
      overlayPosition: 'top',
      label: 'THE GOAL',
      title: "The goal isn't a long\nprompt every time",
      body: ['Write it once, test it, improve it,\nand make it reusable'],
      bodyTimings: [113],
      durationInFrames: 260,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 106.18,
      overlayPosition: 'top',
      label: 'KNOWLEDGE SOURCES',
      title: 'Choose your knowledge sources',
      body: [
        'SharePoint, OneDrive, websites, Teams,\nand approved connectors',
        'Rule: only add sources that\nimprove the workflow',
      ],
      bodyTimings: [0, 345],
      durationInFrames: 464,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 121.64,
      overlayPosition: 'top',
      label: 'AVOID NOISE',
      title: 'Too much context creates\nnoise and contradictions',
      body: ["For this assistant, I'll keep it\nprompt-based first"],
      bodyTimings: [152],
      durationInFrames: 273,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 130.74,
      overlayPosition: 'top',
      label: 'REVIEW CAPABILITIES',
      title: "Review the agent's capabilities",
      body: [
        'Document creation, charts, code, or images',
        "I'll enable document creation for\neasy Word export",
      ],
      bodyTimings: [86, 284],
      durationInFrames: 486,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 146.94,
      overlayPosition: 'top',
      label: 'STARTER PROMPTS',
      title: 'Add starter prompts to help\npeople understand the agent',
      body: [
        '"Draft this week\'s leadership update\nfrom my notes"',
        '"Turn these project updates into an\nexecutive-ready summary"',
        '"Rewrite this update to make it\nclearer and more concise"',
      ],
      bodyTimings: [191, 348, 473],
      durationInFrames: 756,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 172.14,
      overlayPosition: 'top',
      label: 'PREVIEW & TEST',
      title: 'Choose Preview to\ntest the agent',
      body: [
        "Paste the variable part of your workflow:\nthis week's inputs and notes",
        'The agent generates a draft,\nready to review',
      ],
      bodyTimings: [116, 322],
      durationInFrames: 456,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 187.32,
      overlayPosition: 'top',
      label: 'REVIEW CHECKLIST',
      title: "Review before you finalize",
      body: [
        'Is it clear?',
        'Is it executive-ready?',
        'Does it follow the structure I asked for?',
        'Does it avoid overly tactical details?',
      ],
      bodyTimings: [0, 29, 80, 149],
      durationInFrames: 240,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 195.32,
      overlayPosition: 'top',
      avatarPosition: 'bottom-left',
      label: 'CREATE THE AGENT',
      title: "Click Create when you're\nsatisfied with the result",
      body: ['Starts private by default —\nsharing options depend on admin policy'],
      bodyTimings: [224],
      durationInFrames: 480,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-agents.mp4',
      videoStartTime: 211.32,
      overlayPosition: 'top',
      label: 'USING YOUR AGENT',
      title: 'Your agent appears in\nthe left-side panel',
      body: ['In some experiences, @-mention it\ndirectly in a new chat'],
      bodyTimings: [111],
      durationInFrames: 457,
    },
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'A few things to keep in mind',
      body: [
        "Availability depends on your Microsoft 365\nlicense, admin settings, and organization",
        'For advanced automation and integrations,\nuse Copilot Studio (business/enterprise plans)',
      ],
      bodyTimings: [77, 302],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['building-office', 'bolt'],
      durationInFrames: 568,
    },
    {
      layout: 'centered-quote',
      text: 'One tested prompt, turned into a reusable Copilot Agent for the whole team.',
      animation: 'typewriter',
      durationInFrames: 180,
    },
  ],
};
