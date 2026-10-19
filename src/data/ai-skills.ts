import { VideoData } from '../scenes/types';

// AI Skills
// Audio: ai-skills.mp3 — 246.87s total (7406 frames @30fps). 3s title card, audio padded +90f (audioStartFrame 90); VO times below are relative to VO start,
// scene cuts aligned to Whisper segment pauses.
//
//  scene                                           | VO start | dur
//  -------------------------------------------------|----------|-----
//  1  hook: what you re-explain every week          |  0.00    | 402
//  2  skill = reusable instructions                 | 13.40    | 338
//  3  SOP analogy                                   | 24.68    | 227
//  4  prompt vs skill                               | 32.22    | 226
//  5  auto-invoke + combine                         | 39.76    | 528
//  6  leadership update example (steps)             | 57.36    | 493
//  7  other examples                                | 73.80    | 228
//  8  save once                                     | 81.40    | 298
//  9  six questions                                 | 91.34    | 847
//  10 writing great skills                          | 119.58   | 104
//  11 clear purpose                                 | 123.04   | 325
//  12 write the steps in your head                  | 133.88   | 324
//  13 context, constraints, sequence                | 144.66   | 317
//  14 supporting files                              | 155.24   | 280
//  15 examples are powerful                         | 164.56   | 99
//  16 rules vs examples                             | 167.86   | 279
//  17 prompt vs skill inputs                        | 177.16   | 320
//  18 back to leadership update                     | 187.84   | 104
//  19 skill knows / you provide                     | 191.30   | 215
//  20 separation keeps it reusable                  | 198.45   | 163
//  21 checks                                        | 203.90   | 516
//  22 sharing                                       | 221.10   | 350
//  23 scrutiny before sharing                       | 232.76   | 423
//                                                      total   | 7406

export const aiSkills: VideoData = {
  audioSrc: 'audio/ai-skills.mp3',
  // Audio is pre-padded with 3s silence; Video.tsx trims audioStartFrame frames off the file.
  audioStartFrame: 90,
  scenes: [
    // 0 — title card (silent, 0:00 -> 0:03)
    {
      layout: 'title-card-green',
      label: 'AI SKILLS',
      title: 'Skills',
      durationInFrames: 90,
    },

    // 1 — 0:00 -> 0:13.40
    {
      layout: 'label-title-body',
      label: 'WHY SKILLS',
      title: 'Some tasks you re-explain to AI every week.',
      body: [
        'Describe the audience.',
        'Walk through the steps.',
        'Specify the format.',
        'Remind AI what to avoid.',
      ],
      bodyTimings: [175, 235, 275, 328],
      durationInFrames: 402,
    },

    // 2 — 0:13.40 -> 0:24.68
    {
      layout: 'centered-image-caption',
      image: 'images/ai-skills/fragments-to-skill.svg',
      animation: 'fade',
      objectFit: 'contain',
      imageWidth: 1700,
      durationInFrames: 338,
    },

    // 3 — 0:24.68 -> 0:32.22
    {
      layout: 'centered-quote',
      text: 'It’s like an SOP you’d hand to a new colleague.',
      highlight: 'SOP',
      durationInFrames: 227,
    },

    // 4 — 0:32.22 -> 0:39.76
    {
      layout: 'split-contrast',
      leftLabel: 'A NORMAL PROMPT',
      leftTitle: 'Helps with one interaction.',
      rightLabel: 'A SKILL',
      rightTitle: 'Captures a repeatable way of doing work.',
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 108, value: null },
      ],
      durationInFrames: 226,
    },

    // 5 — 0:39.76 -> 0:57.36
    {
      layout: 'label-title-body',
      label: 'WHAT SKILLS CAN DO',
      title: 'Skills can run on their own and work together.',
      body: [
        'Invoked automatically when AI recognizes they’re relevant.',
        'Combine several: one for the workflow, another for the writing style.',
      ],
      bodyTimings: [30, 255],
      durationInFrames: 528,
    },

    // 6 — 0:57.36 -> 1:13.80
    {
      layout: 'process-steps',
      label: 'EXAMPLE',
      title: 'A weekly leadership update skill.',
      steps: [
        { title: 'Read', body: 'Your scattered notes.' },
        { title: 'Identify', body: 'The week’s most important news.' },
        { title: 'Mention', body: 'The team members involved.' },
        { title: 'Draft', body: 'A short update for leaders.' },
      ],
      stepTimings: [156, 271, 343, 405],
      activeTimings: [156, 271, 343, 405],
      horizontal: true,
      durationInFrames: 493,
    },

    // 7 — 1:13.80 -> 1:21.40
    {
      layout: 'label-title-body',
      label: 'OTHER EXAMPLES',
      title: 'Plenty of work fits a skill.',
      body: [
        'Recurring reports.',
        'Meeting follow-ups.',
        'Documents reviewed against a checklist.',
      ],
      bodyTimings: [30, 82, 128],
      durationInFrames: 228,
    },

    // 8 — 1:21.40 -> 1:31.34
    {
      layout: 'big-statement',
      label: 'THE PAYOFF',
      text: 'Save the process once. Stop re-explaining it every time.',
      highlight: 'once',
      durationInFrames: 298,
    },

    // 9 — 1:31.34 -> 1:59.58
    {
      layout: 'checklist-slide',
      label: 'SIX QUESTIONS',
      title: 'Answer these to draft a skill.',
      items: [
        'What’s its purpose?',
        'When should it be used?',
        'What context should it use?',
        'What steps should it follow?',
        'What should it check or avoid?',
        'What format should it follow?',
      ],
      itemTimings: [136, 214, 269, 446, 564, 685],
      durationInFrames: 847,
    },

    // 10 — 1:59.58 -> 2:03.04
    {
      layout: 'big-statement',
      label: 'WRITING GREAT SKILLS',
      text: 'Four tips for writing great skills.',
      highlight: 'Four tips',
      durationInFrames: 104,
    },

    // 11 — 2:03.04 -> 2:13.88
    {
      layout: 'label-title-body',
      label: 'TIP 1 OF 4',
      title: 'Give the skill a clear, specific purpose.',
      body: ['That also makes it easier for AI to recognize when to use it automatically.'],
      bodyTimings: [152],
      durationInFrames: 325,
    },

    // 12-14 — 2:13.88 -> 2:44.56
    {
      layout: 'label-title-body',
      label: 'TIP 1 OF 4 · PURPOSE',
      title: 'Write it like you’d brief a new colleague.',
      body: [
        'Pick a task you repeat often.',
        'Write out the explicit steps.',
        'Provide the context AI otherwise lacks.',
        'Specify any constraints.',
        'Use sequential steps when order matters.',
        'Add supporting files, templates, even scripts.',
      ],
      bodyTimings: [8, 68, 320, 438, 510, 665],
      durationInFrames: 921,
    },

    // 15+16 — 2:44.56 -> 2:57.16
    {
      layout: 'label-title-body',
      label: 'TIP 2 OF 4',
      title: 'Examples are disproportionately powerful.',
      body: [
        'Not another page of abstract rules.',
        'One or a few strong examples of acceptable output.',
      ],
      bodyTimings: [103, 213],
      durationInFrames: 378,
    },

    // 17 — 2:57.16 -> 3:07.84
    {
      layout: 'label-title-body',
      label: 'TIP 3 OF 4',
      title: 'Keep the skill reusable.',
      body: [
        'The variable input stays with you.',
        'Put only the reusable context in the skill.',
        'Leave the variable inputs in the one-off prompt.',
      ],
      bodyTimings: [10, 110, 198],
      durationInFrames: 320,
    },

    // 18-20 — 3:07.84 -> 3:23.90
    {
      layout: 'split-contrast',
      leftLabel: 'THE SKILL KNOWS',
      leftTitle: 'The preferred structure and tone.',
      rightLabel: 'YOU PROVIDE',
      rightTitle: 'This week’s messages and notes.',
      rightBody: 'That separation keeps the skill reusable, not overfitted.',
      rightBodyDelay: 322,
      dividerLabel: '+',
      highlights: [
        { from: 100, value: 'left' },
        { from: 185, value: null },
      ],
      durationInFrames: 482,
    },

    // 21 — 3:23.90 -> 3:41.10
    {
      layout: 'label-title-body',
      label: 'TIP 4 OF 4',
      title: 'Include checks at the end.',
      body: [
        'Verify required actions are present.',
        'Flag any missing inputs.',
        'Verify factual claims against sources.',
        'Ask before consequential assumptions.',
      ],
      bodyTimings: [88, 228, 283, 391],
      durationInFrames: 516,
    },

    // 22 — 3:41.10 -> 3:52.76
    {
      layout: 'label-title-body',
      label: 'SHARING SKILLS',
      title: 'Skills can be shared.',
      body: [
        'Standardize work.',
        'Embed and enforce SOPs.',
        'Integrate AI without others reinventing the wheel.',
      ],
      bodyTimings: [105, 177, 237],
      durationInFrames: 350,
    },

    // 23 — 3:52.76 -> 4:06.87
    {
      layout: 'label-title-body',
      label: 'BEFORE YOU SHARE',
      title: 'Shared skills deserve higher scrutiny.',
      body: [
        'Check the output for accuracy.',
        'Look for missing information.',
        'Make sure it follows all instructions.',
      ],
      bodyTimings: [205, 258, 302],
      durationInFrames: 423,
    },
  ],
};
