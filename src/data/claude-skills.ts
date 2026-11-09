import { VideoData } from '../scenes/types';

// Claude Skills — screenshot demo (Lead with AI).
// Audio: audio/claude-skills-padded.mp3 = 3.0s silence + claude-skills.mp3 (Daan, ElevenLabs v4,
//   recorded in two parts joined with a 0.6s gap). audioStartFrame 90 trims exactly the padding.
// Timings: src/data/claude-skills.transcript.json (Scribe word timestamps on the UNPADDED file).
//   Scene start (comp frame) = 90 + round(vo_s * 30). Local reveal frame = round((word_s - scene_s) * 30).
// Screenshots: claude-skills/images/01..14 (1920x958, from Drive folder 19Rt-ZAcxYim_oWEbVjoGxMfazjBVYxHC).
//
//  #  VO window (s)      scene
//  2     0.00 →   13.24  label-title-body (what a skill is)
//  3    13.24 →   39.04  label-title-body (anatomy)
//  4    39.04 →   58.72  label-title-body (two ways to use a skill)
//  5    58.72 →   71.68  checklist-slide (prereqs)
//  6    71.68 →   77.16  centered-image-caption (Customize > Skills > Add)
//  7    77.16 →   84.16  centered-image-caption (three create options)
//  8    84.16 →  104.72  label-title-body (record a skill)
//  9   104.72 →  110.47  label-title-body (bridge)
// 10   110.47 →  118.07  centered-image-caption (create with claude prompt)
// 11   118.07 →  154.11  label-title-body (CODO)
// 12   154.11 →  162.63  checklist-slide (five sections)
// 13   162.63 →  174.71  label-title-body (supporting files)
// 14   174.71 →  183.03  centered-image-caption (clarifying questions)
// 15   183.03 →  188.31  centered-image-caption (preview)
// 16   188.31 →  193.75  centered-image-caption (review + Save skill)
// 17   193.75 →  196.63  centered-image-caption (enabled)
// 18   196.63 →  205.39  centered-image-caption (/larry test)
// 19   205.39 →  219.15  centered-image-caption (check output + TBDs)
// 20   219.15 →  231.91  label-title-body (facts example)
// 21   231.91 →  238.47  centered-image-caption (refine + Update larry)
// 22   238.47 →  250.39  centered-image-caption (auto invocation check)
// 23   250.39 →  254.60  centered-image-caption (manual retest)
// 24   254.60 →  257.83  centered-image-caption (retest output)
// 25   257.83 →  281.43  checklist-slide (surfaces + sync)
// 26   281.43 →  307.83  checklist-slide (authoring tips)
// 27   307.83 →  316.95  big-statement (closing)

export const claudeSkills: VideoData = {
  audioSrc: 'audio/claude-skills-padded.mp3',
  audioStartFrame: 90,
  scenes: [
    {
      layout: 'title-card-green',
      label: 'CLAUDE',
      title: 'Claude Skills',
      durationInFrames: 90,
    },
    // ── 2. what a skill is (0.00s–13.24s)
    {
      layout: 'label-title-body',
      label: 'CLAUDE SKILLS',
      title: 'Teach Claude Your Way of Working',
      body: [
        'Package your expertise, procedures and best practices into a reusable skill.',
      ],
      durationInFrames: 397,
    },
    // ── 3. anatomy (13.24s–39.04s)
    {
      layout: 'label-title-body',
      label: 'WHAT IS A SKILL',
      title: 'More Than a Saved Prompt',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        'Structured folder: Instructions plus optional supporting resources',
        'SKILL.md: The required instruction file',
        'Name and description: What it does and when to use it',
        'Resources: Examples, templates, style guides, data files or scripts',
      ],
      bodyTimings: [74, 320, 412, 587],
      durationInFrames: 774,
    },
    // ── 4. two ways to use a skill (39.04s–58.72s)
    {
      layout: 'label-title-body',
      label: 'USING A SKILL',
      title: 'Two Ways to Use a Skill',
      bodyRight: true,
      bodyCards: true,
      body: [
        'Type /: Choose the skill by name',
        'Plus button: Open Skills from the prompt box menu',
        'Automatic: Claude loads a relevant skill based on its description',
      ],
      bodyTimings: [132, 230, 389],
      durationInFrames: 591,
    },
    // ── 5. prereqs (58.72s–71.68s)
    {
      layout: 'checklist-slide',
      label: 'BEFORE YOU BEGIN',
      title: 'Check Your Settings',
      items: [
        'Turn on code execution and file creation (in some layouts: Create and edit files)',
        'Your organization may control access to Skills',
      ],
      itemTimings: [52, 281],
      durationInFrames: 388,
    },
    // ── 6. Customize > Skills > Add (71.68s–77.16s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/01-customize-skills.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 28,
          centerX: 0.04,
          centerY: 0.28,
          scale: 2.2,
        },
        {
          startFrame: 106,
          centerX: 0.8,
          centerY: 0.1,
          scale: 2.2,
        },
      ],
      durationInFrames: 165,
    },
    // ── 7. three create options (77.16s–84.16s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/02-add-skill-options.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 13,
          centerX: 0.77,
          centerY: 0.18,
          scale: 2.8,
        },
      ],
      durationInFrames: 210,
    },
    // ── 8. record a skill (84.16s–104.72s)
    {
      layout: 'label-title-body',
      label: 'RECORD A SKILL',
      title: 'Or Show Claude How You Work',
      body: [
        'In Cowork in the Claude desktop app, record yourself doing the task and explain why.',
        'Claude proposes a skill you can review and refine before saving.',
      ],
      bodyTimings: [265, 462],
      durationInFrames: 617,
    },
    // ── 9. bridge (104.72s–110.47s)
    {
      layout: 'label-title-body',
      label: 'LET\'S BUILD ONE',
      title: 'Meet Larry',
      body: ['A skill that writes weekly leadership updates.'],
      durationInFrames: 172,
    },
    // ── 10. create with claude prompt (110.47s–118.07s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/03-create-with-claude-prompt.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 118,
          centerX: 0.57,
          centerY: 0.5,
          scale: 2.0,
        },
      ],
      durationInFrames: 228,
    },
    // ── 11. CODO (118.07s–154.11s)
    {
      layout: 'label-title-body',
      label: 'BRIEF LARRY',
      title: 'The CODO Template',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      body: [
        'Character: A leadership update writer for the executive team',
        'Objective: A concise one-page weekly update that supports strategic decisions',
        'Do\'s and Don\'ts: Highlight decisions and deadlines, explain trade-offs, never invent',
        'Output: Five fixed sections',
      ],
      bodyTimings: [216, 382, 636, 996],
      durationInFrames: 1081,
    },
    // ── 12. five sections (154.11s–162.63s)
    {
      layout: 'checklist-slide',
      label: 'OUTPUT',
      title: 'Five Sections',
      items: [
        'Executive Summary',
        'Key Developments',
        'Decisions and Action Items',
        'Trade-Offs or Conflicts',
        'Closing or Next Steps',
      ],
      itemTimings: [0, 37, 76, 133, 193],
      durationInFrames: 256,
    },
    // ── 13. supporting files (162.63s–174.71s)
    {
      layout: 'label-title-body',
      label: 'OPTIONAL CONTEXT',
      title: 'Attach Supporting Files',
      bodyRight: true,
      bodyCards: true,
      body: [
        'Previous update: An example of the format',
        'Roadmap: Context on priorities',
        'KPI references: The numbers that matter',
      ],
      bodyTimings: [79, 118, 146],
      durationInFrames: 362,
    },
    // ── 14. clarifying questions (174.71s–183.03s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/04-clarifying-questions.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 57,
          centerX: 0.57,
          centerY: 0.75,
          scale: 1.8,
        },
      ],
      durationInFrames: 250,
    },
    // ── 15. preview (183.03s–188.31s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/05-generated-skill-preview.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 77,
          centerX: 0.79,
          centerY: 0.35,
          scale: 1.5,
        },
      ],
      durationInFrames: 158,
    },
    // ── 16. review + Save skill (188.31s–193.75s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/06-skill-output-instructions.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 9,
          centerX: 0.79,
          centerY: 0.3,
          scale: 1.5,
        },
        {
          startFrame: 99,
          centerX: 0.94,
          centerY: 0.02,
          scale: 2.5,
        },
      ],
      durationInFrames: 163,
    },
    // ── 17. enabled (193.75s–196.63s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/07-saved-and-enabled.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 17,
          centerX: 0.49,
          centerY: 0.3,
          scale: 1.6,
        },
      ],
      durationInFrames: 87,
    },
    // ── 18. /larry test (196.63s–205.39s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/08-slash-larry-invocation.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 83,
          centerX: 0.53,
          centerY: 0.49,
          scale: 2.0,
        },
      ],
      durationInFrames: 263,
    },
    // ── 19. check output + TBDs (205.39s–219.15s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/11-test-output-and-open-items.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 48,
          centerX: 0.55,
          centerY: 0.12,
          scale: 1.7,
        },
        {
          startFrame: 306,
          centerX: 0.55,
          centerY: 0.63,
          scale: 1.8,
        },
      ],
      durationInFrames: 412,
    },
    // ── 20. facts example (219.15s–231.91s)
    {
      layout: 'label-title-body',
      label: 'CHECK THE FACTS',
      title: 'Keep What the Notes Actually Say',
      bodyRight: true,
      bodyCards: true,
      body: [
        'Keep: Engineering recommends a later date to finish testing',
        'Avoid: Testing is complete or guaranteed',
      ],
      bodyTimings: [59, 282],
      durationInFrames: 383,
    },
    // ── 21. refine + Update larry (231.91s–238.47s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/12-refine-skill-instructions.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 45,
          centerX: 0.4,
          centerY: 0.18,
          scale: 1.8,
        },
        {
          startFrame: 123,
          centerX: 0.94,
          centerY: 0.02,
          scale: 2.5,
        },
      ],
      durationInFrames: 197,
    },
    // ── 22. auto invocation check (238.47s–250.39s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/10-automatic-larry-loading.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 28,
          centerX: 0.6,
          centerY: 0.1,
          scale: 1.6,
        },
        {
          startFrame: 238,
          centerX: 0.5,
          centerY: 0.42,
          scale: 2.2,
        },
      ],
      durationInFrames: 358,
    },
    // ── 23. manual retest (250.39s–254.60s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/13-manual-invocation-retest.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 18,
          centerX: 0.45,
          centerY: 0.2,
          scale: 1.8,
        },
      ],
      durationInFrames: 126,
    },
    // ── 24. retest output (254.60s–257.83s)
    {
      layout: 'centered-image-caption',
      image: 'claude-skills/images/14-retest-output-review.png',
      objectFit: 'contain',
      imageWidth: 1640,
      imageZoomKeyframes: [
        {
          startFrame: 6,
          centerX: 0.57,
          centerY: 0.4,
          scale: 1.6,
        },
      ],
      durationInFrames: 97,
    },
    // ── 25. surfaces + sync (257.83s–281.43s)
    {
      layout: 'checklist-slide',
      label: 'GOOD TO KNOW',
      title: 'Where Skills Work',
      items: [
        'Use skills in Claude.ai, Claude Code and the API',
        'Enabled skills sync one way, from Claude.ai to Claude Code',
        'API skills are managed separately',
      ],
      itemTimings: [132, 350, 622],
      durationInFrames: 708,
    },
    // ── 26. authoring tips (281.43s–307.83s)
    {
      layout: 'checklist-slide',
      label: 'BEST PRACTICES',
      title: 'Writing Your Own Skill',
      items: [
        'Name the file exactly SKILL.md',
        'Use lowercase, hyphenated skill and folder names',
        'Write a clear description: what it does and when to use it',
        'Keep instructions focused; put long references in separate files',
      ],
      itemTimings: [137, 209, 338, 593],
      durationInFrames: 792,
    },
    // ── 27. closing (307.83s–316.95s)
    {
      layout: 'big-statement',
      label: 'THE TAKEAWAY',
      text: 'Capture the workflow once.\nKeep reviewing the results.',
      highlight: 'Keep reviewing the results.',
      fontSize: 72,
      durationInFrames: 274,
    },
  ],
};
