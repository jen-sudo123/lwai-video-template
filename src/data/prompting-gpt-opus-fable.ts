import { VideoData } from '../scenes/types';

// Audio: "prompting-gpt-opus-fable-v3.mp3" (Aug 10, 2026 re-record), 351.991s
// total, ~10560f at 30fps. This replaces v2 — the Opus section was rewritten
// from scratch (Opus 4.8 → Opus 5: extended thinking is now always-on, and
// the "effort setting" — low/medium/high/extra/max — replaces the old
// reasoning-toggle framing). GPT-5.6, Fable 5, and the outro are unchanged
// content, but every boundary below was still re-derived from this take's
// own word-level Whisper timestamps since it's a fresh recording.
//
// Speech starts at 2.78s, so the title card covers that lead-in exactly (83f)
// and all other scene frames = round(word-level timestamp × 30).
//
// Word-derived timestamps (seconds → frame):
//   2.78   →   83f    VO start — "Prompting frontier models just like you would do with older..."
//   12.44  →  373f    "Older models really needed you to hold their hand"
//   27.74  →  832f    "That's actually why the first O in our Kodu prompting framework..."
//   35.32  → 1060f    "So when you're prompting these top-tier models, you need to set..."
//   48.30  → 1449f    "That's the first rule that holds true across all the models..."
//   54.84  → 1645f    "Let's start with GPT 5.6" → GPT header
//   57.66  → 1730f    "besides defining the objective... letting 5.6 choose the route"
//   67.36  → 2021f    "First, keep the prompt lean" — Tip 1
//   81.98  → 2459f    "Second, do not overuse 'be concise'" — Tip 2
//  101.56  → 3047f    "Third, describe the behavior, not just the tone" — Tip 3
//  115.08  → 3452f    "And finally, set autonomy boundaries" — Tip 4
//  134.26  → 4028f    "Now moving to Opus 5" → Opus header
//  136.16  → 4085f    "Opus 5 thinks before it answers, by default..."
//  143.20  → 4296f    "...and what you control instead is the effort setting" — effort levels
//  154.70  → 4641f    "With that in mind, three things worth keeping in mind..."
//  161.42  → 4843f    "First, specify the output precisely" — Tip 1
//  179.38  → 5381f    "Second, remove unnecessary verification instructions" — Tip 2
//  202.70  → 6081f    "And finally, do not assume more effort means better outputs" — Tip 3
//  220.32  → 6610f    "And then the last one, Fable 5, also on Claude" → Fable header
//  226.44  → 6793f    "This is really the best model out there right now"
//  241.50  → 7245f    "So what Anthropic is recommending... know where to use it" — Habit 1
//  257.20  → 7716f    "you really want to specify the reason" — Habit 2
//  278.14  → 8344f    "And number two, state the boundaries" — Habit 3
//  304.64  → 9139f    "ask what it actually did and what it couldn't verify" — Habit 4
//  312.12  → 9364f    "So the bottom line on prompting frontier models is that Codo still stands"
//  316.14  → 9484f    "Defining a great character continues to mean aiming very high"
//  329.20  → 9876f    "But that objective... that's where all your leverage lives"
//  346.14  → 10384f   "So if you define the destination clearly..."
//  351.991 → 10560f   Audio end
//
//   scene                              | frames          | dur   | layout
//   -----------------------------------|-----------------|-------|--------------------
//   title card                         |    0 →    82   |    83 | title-card-green
//   hook, recipe for disaster          |   83 →   372   |   290 | big-statement
//   old vs. new, same step-by-step     |  373 →   831   |   459 | split-contrast
//   CODO, Objective matters more       |  832 →  1059   |   228 | big-statement
//   set the real objective (checklist) | 1060 →  1448   |   389 | checklist-slide
//   one rule, different playbooks      | 1449 →  1644   |   196 | big-statement
//   GPT-5.6 section header             | 1645 →  1729   |    85 | title-slide-transition
//   define objective, let it choose    | 1730 →  2020   |   291 | big-statement
//   GPT-5.6 tips (4, highlighted)      | 2021 →  4027   |  2007 | process-steps
//   Claude Opus 5 section header       | 4028 →  4084   |    57 | title-slide-transition
//   Opus 5 always reasons now          | 4085 →  4295   |   211 | big-statement
//   the effort setting (5 levels)      | 4296 →  4640   |   345 | checklist-slide
//   keep 3 things in mind              | 4641 →  4842   |   202 | big-statement
//   Opus 5 tips (3, highlighted)       | 4843 →  6609   |  1767 | process-steps
//   Fable 5 section header             | 6610 →  6792   |   183 | title-slide-transition
//   built for the hardest work         | 6793 →  7218   |   426 | big-statement
//   Fable habits (4, highlighted)      | 7219 →  9363   |  2145 | process-steps
//   bottom line, CODO still stands     | 9364 →  9483   |   120 | big-statement
//   CODO recap, Objective spotlit      | 9484 → 10383   |   900 | acronym-spotlight
//   closing, define the destination    |10384 → 10574   |   191 | big-statement

export const promptingGptOpusFable: VideoData = {
  audioSrc: 'prompt-frontier-model/audio/prompting-gpt-opus-fable-v3.mp3',
  scenes: [

    // — title card (0→82) — covers the 2.78s lead-in silence
    {
      layout: 'title-card-green',
      title: 'Prompting the New Frontier Models',
      durationInFrames: 83,
    },

    // 2.78s→12.44s — Hook: prompting frontier models like older ones is a recipe for disaster
    {
      layout: 'big-statement',
      text: 'Prompting frontier models\nlike older ones is a recipe for disaster.',
      highlight: 'recipe for disaster',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 290,
    },

    // 12.44s→27.74s — Same technique, applied to both old and new models.
    // Older models needed hand-holding; over-specifying frontier models
    // the same way narrows their path. Screen splits in half, one column
    // per side, to make the point visually before explaining why it fails.
    // Scene starts at absolute frame 373:
    //   right column dims immediately, lights up at rel 213 (~7.1s in)
    //   right title shatters at rel 360 (~12s in)
    {
      layout: 'split-contrast',
      leftLabel: 'GPT-4o · GPT-5.3 · Haiku 4.5 · Sonnet 4.5',
      leftTitle: 'Step-by-Step Instructions',
      rightLabel: 'Opus 5 · GPT-5.6 · Fable',
      rightTitle: 'Step-by-Step Instructions',
      equal: true,
      rightLightUpFrame: 213,
      rightTitleBreak: true,
      rightTitleBreakFrame: 360,
      durationInFrames: 459,
    },

    // 27.74s→35.32s — CODO: the Objective matters more than ever
    {
      layout: 'big-statement',
      text: "That's why the O in CODO,\nthe Objective, matters more than ever.",
      highlight: 'Objective',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 228,
    },

    // 35.32s→48.30s — Set the real objective: destination, end goal, reason
    // Scene-relative frame timings (scene start = 1060):
    //   "the actual destination" at 41.88s → relative 196
    //   "the end goal" at 43.00s          → relative 230
    //   "the reason" at 43.74s            → relative 252
    {
      layout: 'checklist-slide',
      label: 'THE OBJECTIVE',
      title: 'Set the Real Objective',
      items: ['The destination', 'The end goal', 'The reason'],
      itemTimings: [196, 230, 252],
      durationInFrames: 389,
    },

    // 48.30s→54.84s — One rule holds true, but each model gets its own tips
    {
      layout: 'big-statement',
      text: 'One rule holds for all of them.\nBut each has its own playbook.',
      highlight: 'its own playbook',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 196,
    },

    // 54.84s→57.66s — GPT-5.6 section header
    {
      layout: 'title-slide-transition',
      text: 'GPT-5.6',
      label: '4 PROMPTING TIPS',
      centered: true,
      durationInFrames: 85,
    },

    // 57.66s→67.36s — Define the objective, let 5.6 choose the route
    {
      layout: 'big-statement',
      text: 'Define the objective.\nLet 5.6 choose the route.',
      highlight: 'choose the route',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 291,
    },

    // 67.36s→134.26s — GPT-5.6's 4 tips
    // Scene-relative frame timings (scene start = 2021):
    //   Tip 1 at 67.36s  ("keep the prompt lean")             → relative     0
    //   Tip 2 at 81.98s  ("don't overuse be concise")          → relative   438
    //   Tip 3 at 101.56s ("describe the behavior, not tone")   → relative  1026
    //   Tip 4 at 115.08s ("set autonomy boundaries")           → relative  1431
    {
      layout: 'process-steps',
      label: 'GPT-5.6',
      title: '4 Prompting Tips',
      steps: [
        {
          title: 'Keep the prompt lean',
          body: 'GPT-5.6 can infer more from less. Remove repeated instructions, unnecessary examples, and step-by-step guidance that doesn\'t change the outcome.',
        },
        {
          title: "Don't overuse \"be concise\"",
          body: 'GPT-5.6 is already brief by default. Specify the depth you need instead, like "explain each risk in two sentences."',
        },
      ],
      stepTimings: [0, 0],
      activeTimings: [0, 438],
      rightLabel: 'GPT-5.6',
      rightSteps: [
        {
          title: 'Describe the behavior, not just the tone',
          body: 'Instead of "be professional," say "write for senior leaders, use direct language, and lead with the recommendation."',
        },
        {
          title: 'Set autonomy boundaries',
          body: 'Tell GPT-5.6 what it can do independently and when it must stop. E.g., "you may rewrite the document, but ask before changing facts."',
        },
      ],
      rightStepTimings: [0, 0],
      rightActiveTimings: [1026, 1431],
      highlights: [
        { from: 0,    value: 'left' },
        { from: 1026, value: 'right' },
      ],
      durationInFrames: 2007,
    },

    // 134.26s→136.16s — Claude Opus 5 section header
    {
      layout: 'title-slide-transition',
      text: 'Claude Opus 5',
      label: '3 PROMPTING TIPS',
      centered: true,
      durationInFrames: 57,
    },

    // 136.16s→143.20s — Opus 5 always reasons now; you control the effort, not the toggle
    {
      layout: 'big-statement',
      text: 'Opus 5 always reasons now.\nYou just set how much.',
      highlight: 'how much',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 211,
    },

    // 143.20s→154.70s — The effort setting: five levels, High is the default
    // Scene-relative frame timings (scene start = 4296):
    //   "low" at 149.74s    → relative 196
    //   "medium" at 150.06s → relative 206
    //   "high" at 150.46s   → relative 218
    //   "extra" at 150.86s  → relative 230
    //   "max" at 151.22s    → relative 241
    {
      layout: 'checklist-slide',
      label: 'THE EFFORT SETTING',
      title: 'Choose Your Effort Level',
      items: ['Low', 'Medium', 'High (default)', 'Extra', 'Max'],
      itemTimings: [196, 206, 218, 230, 241],
      durationInFrames: 345,
    },

    // 154.70s→161.42s — Keep 3 things in mind, according to Anthropic
    {
      layout: 'big-statement',
      text: 'Keep three things in mind,\naccording to Anthropic.',
      highlight: 'three things',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 202,
    },

    // 161.42s→220.32s — Opus 5's 3 tips
    // Scene-relative frame timings (scene start = 4843):
    //   Tip 1 at 161.42s ("specify the output precisely")            → relative     0
    //   Tip 2 at 179.38s ("remove unnecessary verification")          → relative   538
    //   Tip 3 at 202.70s ("do not assume more effort means better")   → relative  1238
    {
      layout: 'process-steps',
      label: 'CLAUDE OPUS 5',
      title: '3 Prompting Tips',
      steps: [
        {
          title: 'Specify the output precisely',
          body: 'Opus 5 tends to give longer answers. Lowering the effort setting won\'t shorten them. Define the length, detail, and format you need.',
        },
        {
          title: 'Remove unnecessary verification asks',
          body: 'Opus 5 already checks its own work. "Verify every step" and "include a final review" just make it slower and more repetitive.',
        },
        {
          title: "Don't assume more effort means better",
          body: 'Extra or Max help with genuinely hard work, but lower settings can be sharper. Start at High, escalate only when needed.',
        },
      ],
      stepTimings: [0, 0, 0],
      activeTimings: [0, 538, 1238],
      durationInFrames: 1767,
    },

    // 220.32s→226.44s — Fable 5 section header
    {
      layout: 'title-slide-transition',
      text: 'Fable 5',
      label: 'THE BEST MODEL YET',
      centered: true,
      durationInFrames: 183,
    },

    // 226.44s→241.50s — Built for work too big, too long, too ambiguous
    {
      layout: 'big-statement',
      text: 'Built for work too big, too long,\nor too ambiguous, until now.',
      highlight: 'until now',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 426,
    },

    // 241.50s→312.12s — Fable's 4 habits
    // Scene-relative frame timings (scene start = 7245):
    //   Habit 1 at 241.50s ("know where to use it")            → relative     0
    //   Habit 2 at 257.20s ("specify the reason")               → relative   471
    //   Habit 3 at 278.14s ("state the boundaries")             → relative  1099
    //   Habit 4 at 304.64s ("ask what it couldn't verify")      → relative  1894
    {
      layout: 'process-steps',
      label: 'FABLE 5',
      title: 'How to Prompt It',
      steps: [
        {
          title: 'Know where to use it',
          body: "Don't waste it on quick questions. Give it your hardest, messiest, most open-ended work.",
        },
        {
          title: 'Specify the reason',
          body: 'State the real objective in CODO. Fable rewards context more than any model before it.',
        },
      ],
      stepTimings: [0, 0],
      activeTimings: [0, 471],
      rightLabel: 'FABLE 5',
      rightSteps: [
        {
          title: 'State the boundaries',
          body: 'Fable runs longer and acts more independently. Be clear on what to change, what to leave alone, and where to stop.',
        },
        {
          title: "Ask what it couldn't verify",
          body: "Fable can work for a long time. Ask what it actually did, not a tidy summary that glosses over gaps.",
        },
      ],
      rightStepTimings: [0, 0],
      rightActiveTimings: [1099, 1894],
      highlights: [
        { from: 0,    value: 'left' },
        { from: 1099, value: 'right' },
      ],
      durationInFrames: 2145,
    },

    // 312.12s→316.14s — Bottom line: CODO still stands
    {
      layout: 'big-statement',
      text: 'The bottom line?\nCODO still stands.',
      highlight: 'CODO still stands',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 120,
    },

    // 316.14s→346.14s — CODO recap: Objective is where the leverage lives now
    // spotlightTimings: Objective is index 1 (the first O).
    //   "But that objective... that's where all your leverage lives" at 329.20s → scene-relative frame 392
    {
      layout: 'acronym-spotlight',
      label: 'YOUR CODO PROMPTS',
      items: [
        { letter: 'C', word: 'Character' },
        { letter: 'O', word: 'Objective', detail: 'The destination · The end goal · The reason' },
        { letter: 'D', word: "Do & Don't" },
        { letter: 'O', word: 'Output' },
      ],
      spotlight: { index: 1, from: 392 },
      durationInFrames: 900,
    },

    // 346.14s→end — Closing: define the destination clearly
    {
      layout: 'big-statement',
      text: 'Define the destination clearly.\nThese models will get you there.',
      highlight: 'Define the destination clearly',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 191,
    },

  ],
};
