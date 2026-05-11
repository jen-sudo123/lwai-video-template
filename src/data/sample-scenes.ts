import { VideoData } from '../scenes/types';

// All scene boundaries derived from Whisper word-level timestamps (30 fps).
// Split points use the exact frame where the keyword is first spoken.
//
//   scene                     | VO start     | frames     | dur
//   --------------------------|--------------|------------|------
//   title card                | 00:00.000    |    0 →  38 |   38
//   opening hook              | 00:01.280    |   38 → 437 |  399
//   billion users chart       | 00:14.580    |  437 → 772 |  335
//   search & deep research    | 00:25.740    |  772 →1084 |  312
//   file uploads & analysis   | 00:36.120    | 1084 →1352 |  268
//   voice                     | 00:45.080    | 1352 →1586 |  234
//   images 2.0                | 00:52.860    | 1586 →1886 |  300
//   canvas                    | 01:02.880    | 1886 →2096 |  210  ← "Canvas" word
//   projects                  | 01:09.880    | 2096 →2263 |  167  ← "Projects" word
//   custom gpts               | 01:15.440    | 2263 →2392 |  129  ← "JGBTs" word
//   apps                      | 01:19.740    | 2392 →2645 |  253  ← "Apps" word
//   skills                    | 01:27.500    | 2645 →2898 |  253  ← "skills" word
//   tasks                     | 01:36.600    | 2898 →3092 |  194  ← "Tasks" word
//   agent                     | 01:43.060    | 3092 →3310 |  218  ← Agent segment
//   memory                    | 01:50.320    | 3310 →3539 |  229  ← "Memory," word
//   codex                     | 01:57.960    | 3539 →3731 |  192  ← "Codex" word
//   — The Models heading —    | 02:04.380    | 3731 →4015 |  284  ← "Now those are the features..."
//   gpt-5.3 instant (fast)    | 02:13.820    | 4015 →4223 |  208  ← "JGBT 5.3 Instant is..."
//   gpt-5.3 instant (writing) | 02:20.780    | 4223 →4343 |  120  ← "for writing," word
//   gpt-5.5 thinking (main)   | 02:24.760    | 4343 →4634 |  291  ← "JGBT 5.5 Thinking is..."
//   gpt-5.5 thinking (coding) | 02:34.460    | 4634 →5063 |  429  ← "OpenAI calls it... strengths..."
//   gpt-5.5 pro (research)    | 02:48.760    | 5063 →5306 |  243  ← "JGBT 5.5 Pro which is..."
//   gpt-5.5 pro (reasoning)   | 02:56.860    | 5306 →5536 |  230  ← "you can really use this..."
//   privacy & data use        | 03:04.520    | 5536 →6595 | 1059  ← heading stays; bullets at +0, +451, +754
//   plans & pricing           | 03:39.840    | 6595 →8601 | 2006  ← heading stays; plans at +185,+518,+789,+1281,+1488
//   closing quote             | 04:46.700    | 8601 →8794 |  193
//   outro                     | 04:53.140    | 8794 →8914 |  120

export const sampleVideo: VideoData = {
  audioSrc: 'audio/voiceover.mp3',
  scenes: [

    // 00:00.000 → 00:01.280 — opening title card
    {
      layout: 'title-card-green',
      title: 'ChatGPT',
      durationInFrames: 38,
    },

    // 00:01.280 → 00:14.580 — opening hook
    {
      layout: 'centered-quote',
      text: 'No longer just a chatbot — an operating system for how leaders write, research, and get work done.',
      durationInFrames: 399,
    },

    // 00:14.580 → 00:25.740 — billion users stat
    {
      layout: 'centered-chart',
      image: 'placeholder:Bar chart showing ChatGPT weekly active users growth from ~100M (Nov 2023) to ~900M (Dec 2025)',
      source: 'OpenAI, "Scaling AI for Everyone," February 2026',
      durationInFrames: 335,
    },

    // 00:25.740 → 00:36.120 — search + deep research
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Search & Deep Research',
      body: ['Search pulls live web answers — Deep Research synthesises many sources into a structured cited report'],
      durationInFrames: 312,
    },

    // 00:36.120 → 00:45.080 — file uploads
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'File Uploads & Analysis',
      body: ['Drop in PDFs, spreadsheets, images or charts — ChatGPT analyses them for you'],
      durationInFrames: 268,
    },

    // 00:45.080 → 00:52.860 — voice
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Voice',
      body: ['Talk naturally to ChatGPT — paid plans add real-time video and screen sharing on mobile'],
      durationInFrames: 234,
    },

    // 00:52.860 → 01:02.880 — images 2.0
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Images 2.0',
      body: ['Generates mock-ups, diagrams and posters — better text layout and instruction following'],
      durationInFrames: 300,
    },

    // 01:02.880 → 01:09.880 — canvas  [word "Canvas" at 01:02.880]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Canvas',
      body: ['Dedicated workspace for writing and coding — not just a chat thread'],
      durationInFrames: 210,
    },

    // 01:09.880 → 01:15.440 — projects  [word "Projects" at 01:09.880]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Projects',
      body: ['Organise chats, files and instructions around ongoing work'],
      durationInFrames: 167,
    },

    // 01:15.440 → 01:19.740 — custom GPTs  [word "JGBTs" at 01:15.440]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Custom GPTs',
      body: ['Build reusable, task-specific assistants'],
      durationInFrames: 129,
    },

    // 01:19.740 → 01:27.500 — apps  [word "Apps" at 01:19.740]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Apps',
      body: ['Connect external tools — Drive, GitHub, HubSpot, Asana — answer from your private work context'],
      durationInFrames: 253,
    },

    // 01:27.500 → 01:36.600 — skills  [word "skills" at 01:27.500]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Skills',
      body: ['Package repeatable workflows with instructions, examples and code for consistent execution'],
      durationInFrames: 253,
    },

    // 01:36.600 → 01:43.060 — tasks  [word "Tasks" at 01:36.600]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Tasks',
      body: ['Scheduled reminders, recurring briefings, future follow-ups'],
      durationInFrames: 194,
    },

    // 01:43.060 → 01:50.320 — agent  [Agent segment at 01:43.060]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Agent',
      body: ['Browses the web, navigates pages, fills forms, edits spreadsheets'],
      durationInFrames: 218,
    },

    // 01:50.320 → 01:57.960 — memory  [word "Memory," at 01:50.320]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Memory',
      body: ['Custom instructions and tone — learns your preferences and adapts over time'],
      durationInFrames: 229,
    },

    // 01:57.960 → 02:04.380 — codex  [word "Codex" at 01:57.960]
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Codex',
      body: ["OpenAI's coding agent — writes, reviews, debugs and ships code"],
      durationInFrames: 192,
    },

    // 02:04.380 → 02:13.820 — models overview
    // VO: "best understood in three layers — Instant, Thinking and Pro"
    // Each name fades in on the exact word: Instant @219f, Thinking @243f, Pro @270f
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'The Models',
      body: ['GPT-5.3 Instant', 'GPT-5.5 Thinking', 'GPT-5.5 Pro'],
      bodyTimings: [219, 243, 270],
      durationInFrames: 284,
    },

    // 02:13.820 → 02:24.760 — gpt-5.3 instant
    // Title stays on screen; second bullet fades in at +208f when VO says "for writing..."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-5.3 Instant',
      body: ['Fast, everyday model', 'Writing, summarising, brainstorming, quick questions'],
      bodyTimings: [0, 208],
      durationInFrames: 328,
    },

    // 02:24.760 → 02:48.760 — gpt-5.5 thinking
    // Title stays on screen; second bullet fades in at +291f when VO says "strengths are in coding..."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-5.5 Thinking',
      body: ['Main model for serious professional work', 'Coding, online research, data analysis, document creation, tool use'],
      bodyTimings: [0, 291],
      durationInFrames: 720,
    },

    // 02:48.760 → 03:04.520 — gpt-5.5 pro
    // Title stays on screen; second bullet fades in at +243f when VO says "deeper reasoning..."
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-5.5 Pro',
      body: ['Research-grade — hardest questions, highest accuracy', 'Deeper reasoning, stronger structure, more confidence in the answer'],
      bodyTimings: [0, 243],
      durationInFrames: 473,
    },

    // 03:04.520 → 03:39.840 — privacy & data use
    // Heading stays on screen; each bullet fades in on its spoken word:
    //   +0f   "for personal plans..."                     → Personal plans
    //   +224f "But for business, enterprise and education" → B&E training
    //   +451f "Then on May 1..."                          → Advanced Account Security
    //   +754f "Of course, regardless of any plan..."      → What to share
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Privacy & Data Use',
      body: [
        'Personal plans — training and data sharing settings adjustable in Settings',
        'Business, Enterprise & Education: not used for training by default',
        'Passkeys, security keys, strict recovery checks — rolled out May 2025',
        "Don't share what you wouldn't give a third-party vendor — verify outputs that matter",
      ],
      bodyTimings: [0, 224, 451, 754],
      durationInFrames: 1059,
    },

    // 03:39.840 → 04:46.700 — plans & pricing
    // Heading stays on screen; each plan fades in on its spoken word:
    //   +185f  "free" word (226.000s)     → Free
    //   +518f  "Go" word (237.100s)       → Go
    //   +789f  "20 bucks" (246.140s)      → Plus
    //   +1281f "Pro" word (262.520s)      → Pro
    //   +1488f "business" word (269.420s) → Business & Enterprise
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Plans & Pricing',
      body: [
        'Free — 10 messages on GPT-5.3 every 5 hours, falls back to 5.3 mini',
        'Go — $8/month — slightly higher limits, larger context window',
        'Plus — $20/month — Thinking limits, voice, image gen, file uploads, Codex',
        'Pro — $100–200/month — 5–20× Plus limits, access to GPT-5.5 Pro',
        'Business & Enterprise — admin controls, agents — ~$25/user/month',
      ],
      bodyTimings: [185, 518, 789, 1281, 1488],
      durationInFrames: 2006,
    },

    // 04:46.700 → 04:53.140 — closing
    {
      layout: 'centered-quote',
      text: 'More senior work covered than any single tool before it.',
      durationInFrames: 193,
    },

    // outro
    {
      layout: 'blank',
      durationInFrames: 120,
    },

  ],
};
