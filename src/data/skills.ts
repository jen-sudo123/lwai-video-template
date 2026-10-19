import { VideoData } from '../scenes/types';

// ChatGPT Skills: Custom GPTs vs Projects vs Skills
// Audio: audio/skills.mp3
// Total audio duration: 217.21s => 6516 frames @ 30fps
//
// Frame-accurate VO map (Whisper medium, no silence offset):
//    0.0 →   6.6  "If you continue to re-explain your work…"
//    6.6 →  17.1  "…outgrown basic chat…custom GPTs, projects, and skills."
//   17.1 →  26.8  "They seem similar…walk you through the differences."
//   26.8 →  36.1  "Starting with a custom GPT…configure once and use or share."
//   36.1 →  49.9  "Give it instructions…knowledge files…external tools…without setup."
//   49.9 →  63.1  "HR assistant…sales coach…client-facing tool…send to your whole team."
//   63.1 →  69.2  "The trade-off is memory. Every new conversation starts fresh."
//   69.2 →  86.2  "Then there are projects…organized work folder…reference earlier chats."
//   86.2 → 107.5  "Two memory modes…default mode…project-only memory."
//  107.5 → 137.3  "Skills…reusable workflows…steps, examples, formats…stack skills."
//  137.3 → 179.1  "When do you choose…GPT for shareable specialist…projects for evolving work."
//  179.1 → 203.2  "Skills are the newest way…proven task…combine…shareable within workspace."
//  203.2 → 216.1  "Overall, any of these three features…move beyond basic chats."

export const skills: VideoData = {
  audioSrc: 'audio/skills.mp3',
  avatarSrc: 'video/skills-avatar.mp4',
  scenes: [
    // ── 1. Title card ─────────────────────────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Custom GPTs, Projects & Skills',
      label: 'BEYOND BASIC CHAT',
      durationInFrames: 60,
    },

    // ── 2. Pain point hook (0.0s–17.1s) ───────────────────────────────────
    {
      layout: 'big-statement',
      text: "Still re-explaining your work?\nYou've outgrown basic chat.",
      highlight: 'outgrown basic chat.',
      fontSize: 72,
      animation: 'kinetic',
      wordJumps: [{ wordIndex: 5, frame: 120 }],
      durationInFrames: 308,
    },

    // ── 3. Three features overview (12.27s–26.8s) ────────────────────────
    {
      layout: 'three-mode-columns',
      label: 'THREE FEATURES',
      title: 'Same Goal, Different Strengths',
      columns: [
        {
          label: 'CUSTOM GPTs',
          title: 'Specialist',
          body: ['Configure once', 'Share with anyone', 'No memory across chats'],
        },
        {
          label: 'PROJECTS',
          title: 'Workspace',
          body: ['Organized folder', 'Cross-chat memory', 'Standing instructions'],
        },
        {
          label: 'SKILLS',
          title: 'Workflow',
          body: ['Reusable steps', 'Stackable in chat', 'Shareable in workspace'],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 41, value: 0 },
        { from: 83, value: 1 },
        { from: 112, value: 2 },
        { from: 180, value: null },
      ],
      durationInFrames: 442,
    },

    // ── 4. Custom GPTs hero (26.8s–28.4s) ─────────────────────────────────
    {
      layout: 'big-statement',
      label: 'FEATURE 1',
      text: 'Custom GPTs',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 60,
    },

    // ── 5. GPT builder UI (28.4s–49.9s) ──────────────────────────────────
    // VO: "Configure once… instructions, knowledge files, external tools…"
    {
      layout: 'label-title-body',
      label: 'CUSTOM GPTs',
      title: 'Configure Once, Use Forever',
      body: [
        'Instructions: prompt template',
        'Knowledge: upload files',
        'Tools: connect external services',
        'Zero setup for end users',
      ],
      bodyTimings: [0, 90, 180, 280],
      image: 'images/skills/gpt-configure.png',
      imageHeight: 620,
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 60, centerX: 0.25, centerY: 0.5, scale: 1.95 },
        { startFrame: 480, centerX: 0.25, centerY: 0.5, scale: 1.95 },
      ],
      durationInFrames: 630,
    },

    // ── 6. GPT use cases — gallery image (49.9s–63.1s) ──────────────────
    // VO: "HR assistant… sales coach… client-facing tool."
    {
      layout: 'label-title-body',
      label: 'USE CASES',
      title: 'Built for Sharing',
      body: [
        'HR Assistant trained on your handbook',
        'Sales Coach loaded with product data',
        'Client Tool you send to the team',
      ],
      bodyTimings: [0, 90, 200],
      image: 'images/skills/gpts-gallery.png',
      imageHeight: 620,
      imageLeft: true,
      durationInFrames: 321,
    },

    // ── 7. GPT trade-off: no memory (60.7s–69.2s) ──────────────────────
    {
      layout: 'split-contrast',
      leftLabel: 'STRENGTH',
      leftTitle: 'Instant specialist',
      leftBody: 'Anyone can open it and use it without setup',
      rightLabel: 'TRADE-OFF',
      rightTitle: 'No memory',
      rightBody: 'Every new conversation starts completely fresh',
      showDivider: true,
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 24, value: 'right' },
      ],
      durationInFrames: 204,
    },

    // ── 8. Projects hero (67.5s–71.0s) ───────────────────────────────────
    {
      layout: 'big-statement',
      label: 'FEATURE 2',
      text: 'Projects',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 117,
    },

    // ── 9. Projects settings UI (71.0s–86.2s) ───────────────────────────
    // VO: "Organized work folder… conversations, files, standing instructions…
    //      every chat references earlier ones."
    {
      layout: 'label-title-body',
      label: 'PROJECTS',
      title: 'Your Organized AI Workspace',
      body: [
        'Group related chats',
        'Standing instructions',
        'Files attached to the project',
        'Memory carries across chats',
      ],
      bodyTimings: [0, 80, 170, 270],
      image: 'images/skills/project-settings.png',
      imageHeight: 620,
      durationInFrames: 444,
    },

    // ── 10. Two memory modes (86.2s–107.5s) ─────────────────────────────
    // VO: "Two modes — default uses broader ChatGPT memory; project-only stays contained."
    {
      layout: 'label-title-body',
      label: 'TWO MEMORY MODES',
      title: 'Open or Contained',
      body: [
        'Default pulls from broader ChatGPT memory',
        'Project-only stays inside the project',
      ],
      bodyTimings: [84, 333],
      image: 'images/skills/project-memory.png',
      imageHeight: 620,
      imageLeft: true,
      durationInFrames: 640,
    },

    // ── 11. Skills hero (107.5s–109.5s) ──────────────────────────────────
    {
      layout: 'big-statement',
      label: 'FEATURE 3',
      text: 'Skills',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 60,
    },

    // ── 12. Skills demo — video clip (109.5s–137.3s) ────────────────────
    // VO: "Reusable workflows… steps, examples, formats, standards… stack skills."
    {
      layout: 'video-clip',
      videoSrc: 'video/skills-demo-2x.mp4',
      videoStartTime: 0,
      label: 'SKILLS IN ACTION',
      title: 'Reusable Workflows You Can Stack',
      overlayPosition: 'bottom',
      durationInFrames: 834,
    },

    // ── 13a. The comparison table (137.3s–145.1s) ────────────────────────
    // VO 137.3–140.1 "Now when do you choose which feature?"
    // VO 140.1–145.1 "I have a little table in the written version of this lesson."
    {
      layout: 'label-title-body',
      label: 'WHEN TO CHOOSE',
      title: 'A full breakdown in the written lesson',
      body: [
        'Memory, sharing, tools, availability — at a glance.',
      ],
      bodyTimings: [0],
      image: 'images/skills/compare-table.png',
      imageHeight: 920,
      durationInFrames: 234,
    },

    // ── 13b. When to use what — decision + sharing (145.1s–179.1s) ───────
    // VO 145.1–155.9 "build a GPT when you need a consistent shareable specialist"
    // VO 155.9–163.0 "most people now are using projects… memory contained"
    // VO 163.0–169.7 "GPTs are shareable, projects are too"
    // VO 169.7–179.1 "everyone's chats within that project… not always what you'd want"
    {
      layout: 'three-mode-columns',
      label: 'DECISION GUIDE',
      title: 'When to Use What',
      columns: [
        {
          label: 'BUILD A GPT',
          title: 'Shareable Specialist',
          body: [
            'Memory: fresh every chat',
            'Sharing: anyone can open and use it',
            'Best for: consistent assistant',
          ],
        },
        {
          label: 'USE A PROJECT',
          title: 'Evolving Work',
          body: [
            'Memory: stays in the project',
            'Sharing: collaborators see all chats',
            'Best for: weeks or months of context',
          ],
        },
        {
          label: 'CREATE A SKILL',
          title: 'Proven Process',
          body: [
            'Memory: workflow steps only',
            'Sharing: publish once across workspace',
            'Best for: repeatable tasks',
          ],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 0, value: 0 },
        { from: 324, value: 1 },
        { from: 562, value: [0, 1] },
        { from: 1031, value: 2 },
        { from: 1680, value: null },
      ],
      durationInFrames: 1742,
    },

    // ── 16. Closing statement (203.2s–216.1s) ───────────────────────────
    {
      layout: 'big-statement',
      text: 'Move beyond basic chat.\nBuild an assistant that remembers.',
      highlight: 'remembers.',
      fontSize: 68,
      animation: 'fade',
      lineTimings: [0, 45],
      durationInFrames: 420,
    },
  ],
};
