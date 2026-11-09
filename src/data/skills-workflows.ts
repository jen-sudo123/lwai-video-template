import { VideoData } from '../scenes/types';

// Skills: Turn Your Best Prompts into Repeatable Workflows
// Script: src/data/skills-workflows.script.txt (ElevenLabs v4 prompt: skills-workflows.v4.txt)
// Audio:  audio/skills-workflows.mp3 — Daan, eleven_v4, take 2, PRE-PADDED with 2.000s silence
//         (audioStartFrame 60). Unpadded original: 224.48s.
// Transcript: src/data/skills-workflows.transcript.json (ElevenLabs Scribe, unpadded timings)
//
// Scene start (abs frame) = 60 + round(t × 30), t = word time in the unpadded transcript.
// Scene-local timings = round((word_t − scene_start_t) × 30).
//
//   #  t start  scene                              frames  layout
//   1      —    title card                            60   title-card-green
//   2    0.00   hook: re-explaining every week       352   checklist-slide (statement)
//   3   11.72   CODO prompt → Skill                  394   split-contrast
//   4   24.88   definition                           260   big-statement
//   5   33.52   an SOP for AI                        280   label-title-body (cards)
//   6   42.88   what a Skill can contain             257   skill-package-diagram
//   7   51.44   invoked automatically                271   chat-thread
//   8   60.48   combine Skills                       252   split-contrast (equal)
//   9   68.88   example header                       156   title-slide-transition
//  10   74.08   your instructions                    344   checklist-slide
//  11   85.52   with a Skill: set up once            434   process-steps (horizontal cards)
//  12  100.00   same approach, other tasks           202   checklist-slide
//  13  106.72   start with CODO                      273   big-statement (fade)
//  14  115.84   CODO + Trigger + Resources          1087   process-steps (two columns)
//  15  152.08   six questions → one Skill            142   skill-package-diagram (assemble)
//  16  156.80   principle 1: explicit                276   checklist-slide
//  17  166.00   principle 2: context vs inputs       367   checklist-slide
//  18  178.24   principle 3: examples                211   checklist-slide
//  19  185.28   principle 4: test                    284   checklist-slide
//  20  194.72   sharing: scale or repeat             290   shared-skill-diagram
//  21  204.40   not every task needs a Skill         226   big-statement (fade)
//  22  211.92   start with one workflow              189   process-steps (horizontal cards)
//  23  218.24   close (VO ends 224.64, hold → 227)   263   big-statement (fade)

export const skillsWorkflows: VideoData = {
  audioSrc: 'audio/skills-workflows.mp3',
  audioStartFrame: 60,
  scenes: [
    // 1 — title card (VO starts at frame 60)
    {
      layout: 'title-card-green',
      title: 'Skills',
      subtitle: 'Turn your best prompts into repeatable workflows',
      durationInFrames: 60,
    },

    // 2 — 0.00 "Think about a task you have to re-explain to AI every single week. You describe the
    //     audience (5.16), walk through the steps (6.40), specify the format (7.84), and remind AI
    //     what to avoid (9.48)."
    {
      layout: 'checklist-slide',
      label: 'EVERY SINGLE WEEK',
      title: 'Re-explaining the same task',
      statement: 'Re-explaining the same task to AI, every week?',
      statementWordJumps: [{ wordIndex: 6, frame: 92 }],
      items: ['Describe the audience', 'Walk through the steps', 'Specify the format', 'Remind AI what to avoid'],
      itemTimings: [155, 192, 235, 284],
      durationInFrames: 352,
    },

    // 3 — 11.72 "You've already learned to use CODO (13.04)… a Skill (18.56) takes this further, by
    //     packaging the entire process into a reusable workflow."
    {
      layout: 'split-contrast',
      leftLabel: 'CODO PROMPT',
      leftTitle: 'Structures your instructions',
      rightLabel: 'SKILL',
      rightTitle: 'Packages the whole process',
      rightBody: 'into a reusable workflow',
      rightLightUpFrame: 205,
      durationInFrames: 394,
    },

    // 4 — 24.88 "A Skill is a set of reusable instructions (26.24) that teaches AI (28.32) how to
    //     perform a specific task, or follow an established process."
    {
      layout: 'big-statement',
      label: 'WHAT IS A SKILL?',
      text: 'Reusable instructions that teach AI\na specific task or process.',
      highlight: 'Reusable instructions',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 260,
    },

    // 5 — 33.52 "Think of it like a standard operating procedure for AI. It captures the steps (38.00),
    //     expectations (38.64), and rules (39.76) you'd normally explain to a new colleague."
    {
      layout: 'label-title-body',
      label: 'THINK OF IT AS',
      title: 'A standard operating procedure for AI',
      body: [
        'Steps: The process, in the right order',
        'Expectations: What a good result looks like',
        'Rules: What to always do, and never do',
      ],
      bodyTimings: [134, 154, 187],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 280,
    },

    // 6 — 42.88 "A Skill can contain more than written instructions (44.68). It can also include
    //     supporting files (47.08), templates (48.56), reference materials (49.24), and scripts (50.60)."
    {
      layout: 'skill-package-diagram',
      label: 'MORE THAN INSTRUCTIONS',
      title: 'What a Skill can contain',
      centerSub: 'Written instructions',
      chips: ['Supporting files', 'Templates', 'Reference materials', 'Scripts'],
      chipTimings: [126, 170, 191, 232],
      durationInFrames: 257,
    },

    // 7 — 51.44 "Some Skills can even be invoked automatically (52.72), when AI recognizes (54.64) a
    //     relevant task. So you don't always have to remember which Skill to use."
    {
      layout: 'chat-thread',
      label: 'INVOKED AUTOMATICALLY',
      messages: [
        { role: 'user', text: "Turn these notes into this week's leadership update." },
        {
          role: 'assistant',
          text: 'Using your Weekly Leadership Update Skill. Here is the draft, in your usual format: developments, decisions needed, next steps.',
          quality: 'strong',
        },
      ],
      highlights: [
        { from: 0, value: 1 },
        { from: 96, value: 2 },
      ],
      durationInFrames: 271,
    },

    // 8 — 60.48 "You can also combine multiple Skills. For example, one might define your workflow
    //     (64.52), while another (66.16) applies your preferred writing style."
    {
      layout: 'split-contrast',
      leftLabel: 'SKILL ONE',
      leftTitle: 'Your workflow',
      rightLabel: 'SKILL TWO',
      rightTitle: 'Your writing style',
      dividerLabel: '+',
      equal: true,
      rightLightUpFrame: 170,
      durationInFrames: 252,
    },

    // 9 — 68.88 "Let's take a familiar example. Imagine you prepare a weekly leadership update."
    {
      layout: 'title-slide-transition',
      label: 'EXAMPLE',
      text: 'The weekly leadership update',
      centered: true,
      durationInFrames: 156,
    },

    // 10 — 74.08 "Your instructions might tell AI to act as a Chief of Staff (76.56), review scattered
    //      notes (77.88), identify important developments (79.60), highlight decisions needed (81.44),
    //      and produce a concise update (83.36)."
    {
      layout: 'checklist-slide',
      label: 'YOUR INSTRUCTIONS',
      title: 'What you tell AI each week',
      items: [
        'Act as a Chief of Staff',
        'Review scattered notes',
        'Identify important developments',
        'Highlight decisions needed',
        'Produce a concise update',
      ],
      itemTimings: [74, 114, 166, 221, 278],
      durationInFrames: 344,
    },

    // 11 — 85.52 "With a Skill, you can save those instructions (86.84), include your reporting
    //      template (88.36), and add checks (90.28)… Then, each week (94.00), you provide the latest
    //      information, and AI follows the established process."
    {
      layout: 'process-steps',
      label: 'WITH A SKILL',
      title: 'Set it up once. Reuse it every week.',
      steps: [
        { title: 'Save the instructions', body: 'Role, steps and rules, stored once.' },
        { title: 'Include your template', body: 'Your reporting format, built in.' },
        { title: 'Add checks', body: 'The result meets your expectations.' },
        { title: 'Each week', body: 'Add the latest information. AI follows the process.' },
      ],
      stepTimings: [40, 85, 143, 254],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 434,
    },

    // 12 — 100.00 "The same approach works for recurring reports (101.28), meeting follow-ups (102.64),
    //      or reviewing documents against a checklist (103.92)."
    {
      layout: 'checklist-slide',
      label: 'THE SAME APPROACH',
      title: 'Works for any recurring task',
      items: ['Recurring reports', 'Meeting follow-ups', 'Reviewing documents against a checklist'],
      itemTimings: [38, 79, 118],
      durationInFrames: 202,
    },

    // 13 — 106.72 "So, how do you create effective instructions for a Skill? You don't need to start
    //      from scratch (110.60). Begin (112.72) with the four familiar parts of CODO (114.88)."
    {
      layout: 'big-statement',
      label: 'BUILDING A SKILL',
      text: 'How do you build a Skill?\nNo need to start from scratch.\nStart with CODO.',
      highlight: 'Start with CODO.',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 116, 180],
      durationInFrames: 273,
    },

    // 14 — 115.84 Character (0) · Objective (120.72) · Do and Don't (124.08) · Output (131.28)
    //      "Then, add two considerations (134.72)…" Trigger (139.20) · Resources (145.36)
    {
      layout: 'process-steps',
      label: 'CODO',
      title: 'The core instructions',
      steps: [
        { title: 'Character', body: 'What role or expertise should AI bring to the task?' },
        { title: 'Objective', body: 'What should the Skill accomplish?' },
        { title: "Do and Don't", body: 'Which steps to follow? What to check, avoid, or confirm?' },
        { title: 'Output', body: 'What should the final result look like?' },
      ],
      stepTimings: [0, 146, 247, 463],
      rightLabel: '+ MAKE IT REUSABLE',
      rightSteps: [
        { title: 'Trigger', body: 'When should AI use this Skill? What request activates it?' },
        { title: 'Resources', body: 'Which documents, templates, and examples should it use?' },
      ],
      rightStepTimings: [701, 886],
      highlights: [
        { from: 0, value: 'left' },
        { from: 566, value: 'right' },
      ],
      durationInFrames: 1087,
    },

    // 15 — 152.08 "Together, these six questions (153.12) give you the foundation (154.40) for a useful Skill."
    {
      layout: 'skill-package-diagram',
      label: 'TOGETHER',
      title: 'Six questions. One useful Skill.',
      titleHighlight: 'One useful Skill.',
      chips: ['Character', 'Objective', "Do and Don't", 'Output', 'Trigger', 'Resources'],
      chipKickers: ['C', 'O', 'D', 'O', '+', '+'],
      chipTimings: [0, 4, 8, 12, 16, 20],
      accentFrom: 4,
      assembleFrame: 70,
      assembledSub: 'Ready to reuse',
      durationInFrames: 142,
    },

    // 16–19 — the four principles share one layout (checklist-slide): label "PRINCIPLE N OF 4",
    //          principle as the title, supporting points revealed on the word that names them.

    // 16 — 156.80 "As you develop it, keep a few principles in mind. First (159.92), make the important
    //      steps (161.28) explicit, as if you're briefing (163.60) a capable new colleague."
    {
      layout: 'checklist-slide',
      label: 'PRINCIPLE 1 OF 4',
      title: 'Make the important steps explicit',
      items: ['Spell out every step that matters', 'Brief it like a capable new colleague'],
      itemTimings: [134, 204],
      durationInFrames: 276,
    },

    // 17 — 166.00 "Second, separate reusable context from variable inputs. For your leadership update,
    //      the structure and process (172.24) belong in the Skill. This week's notes (175.20) belong
    //      in your new request."
    {
      layout: 'checklist-slide',
      label: 'PRINCIPLE 2 OF 4',
      title: 'Separate reusable context from variable inputs',
      items: ['In the Skill: structure and process', "In your request: this week's notes"],
      itemTimings: [187, 276],
      durationInFrames: 367,
    },

    // 18 — 178.24 "Third, include examples of what good output (180.56) looks like, especially (182.16)
    //      when tone or format matters."
    {
      layout: 'checklist-slide',
      label: 'PRINCIPLE 3 OF 4',
      title: 'Include examples of good output',
      items: ['Show what good looks like', 'Especially when tone or format matters'],
      itemTimings: [70, 118],
      durationInFrames: 211,
    },

    // 19 — 185.28 "Finally, test the Skill with realistic inputs. Check whether it follows instructions
    //      (189.44), flags missing information (190.80), and produces consistent results (192.48)."
    {
      layout: 'checklist-slide',
      label: 'PRINCIPLE 4 OF 4',
      title: 'Test with realistic inputs',
      items: ['Follows instructions', 'Flags missing information', 'Produces consistent results'],
      itemTimings: [125, 166, 216],
      durationInFrames: 284,
    },

    // 20 — 194.72 "This is especially important before sharing (196.72) Skills with your team. A reusable
    //      Skill can scale (200.00) a good process, but it can also repeat (202.72) a weak one (203.44)."
    //      Custom: Skill card fans out to a team; good pulse = checks, then a flaw spreads as crosses.
    {
      layout: 'shared-skill-diagram',
      label: 'BEFORE YOU SHARE',
      title: 'Whatever is in the Skill reaches your whole team',
      teamFrame: 60,
      goodFrame: 158,
      weakFrame: 240,
      goodCaption: 'Scales a good process',
      weakCaption: 'Or repeats a weak one',
      flawLabel: 'Unclear step',
      durationInFrames: 290,
    },

    // 21 — 204.40 "Not every task needs a Skill. But when a process repeats (206.64), and consistency
    //      matters, it's worth making it reusable (209.84)."
    {
      layout: 'big-statement',
      text: 'Not every task needs a Skill.\nRepeats, and consistency matters?\nMake it reusable.',
      highlight: 'Make it reusable.',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 67, 163],
      durationInFrames: 226,
    },

    // 22 — 211.92 "Start with one workflow (212.80) you know well. Capture the process (214.48), test it
    //      (215.84), and improve it over time (216.68)."
    {
      layout: 'process-steps',
      label: 'START WITH ONE WORKFLOW YOU KNOW WELL',
      title: 'Capture. Test. Improve.',
      steps: [
        { title: 'Capture', body: 'Write down the process.' },
        { title: 'Test', body: 'Run it on realistic inputs.' },
        { title: 'Improve', body: 'Refine it over time.' },
      ],
      stepTimings: [77, 118, 143],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 189,
    },

    // 23 — 218.24 "The goal is to spend less time explaining (219.04) the work to AI, and more time
    //      (222.16) getting value from the results." VO ends 224.64; hold to 227.0.
    {
      layout: 'big-statement',
      text: 'Less time explaining.\nMore time getting value.',
      highlight: 'More time getting value.',
      size: 'title',
      animation: 'fade',
      lineTimings: [24, 118],
      durationInFrames: 263,
    },
  ],
};
