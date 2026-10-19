import { VideoData } from '../scenes/types';

// Personalization (Part 2): Custom Instructions & the 3Cs — why custom
// instructions are the first layer worth setting up, and how to write them
// using the three Cs framework (context, communication, collaboration).
// Audio: audio/custom-instructions-3cs.wav (3.35s of leading silence trimmed
// from the source file so scene 1 opens right on the first word)
// Total audio duration: 246.17s => 7385 frames @ 30fps
// audioStartFrame: 60 (2s title card lead-in)
//
// Frame-accurate VO map (comp_frame = 60 + round(t*30)):
//    0  title-card-green        0     60     60    0.00 →   2.00  [title card]
//    1  big-statement          60    375    435    0.00 →  12.50  shape it directly, more valuable
//    2  label-title-body      435    285    720   12.50 →  22.00  set it once
//    3  label-title-body      720    450   1170   22.00 →  37.00  without them, re-explaining
//    4  centered-quote       1170    300   1470   37.00 →  47.00  out of prompts, into a persistent setting
//    5  centered-quote       1470    300   1770   47.00 →  57.00  prompts focus on what's unique
//    6  centered-quote       1770    270   2040   57.00 →  66.00  the three Cs framework
//    7  three-mode-columns  2040   1935   3975   66.00 → 130.50  context / communication / collaboration
//    8  label-title-body    3975   1284   5259  130.50 → 173.30  practical notes: format & scope
//    9  centered-quote      5259    171   5430  173.30 → 179.00  keep it relevant, evolve as you do
//   10  label-title-body    5430    900   6330  179.00 → 209.00  when to update each C
//   11  label-title-body    6330    675   7005  209.00 → 231.50  the signal: repetition
//   12  centered-quote      7005    390   7395  231.50 → 244.50  closing — more refined, more yours
//                                          ────
//                                   Total: 7395 frames (~246.5s, audio ends ~246.55s incl. lead-in;
//                                   last word "done." ends at 243.55s — was clipped when scene 12
//                                   was only 345 frames, now holds ~1s past it)

export const personalizationPart2: VideoData = {
  audioSrc: 'audio/custom-instructions-3cs.wav',
  audioStartFrame: 60,
  scenes: [
    // ── 00:00.00  title card (pre-VO) ──────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Custom Instructions',
      label: 'THE FIRST LAYER: THE 3CS FRAMEWORK',
      durationInFrames: 60,
    },

    // ── 00:00.00 → 00:12.50  shape it directly ─────────────────────────
    // VO: "In our quest to personalize AI, we start with custom instructions.
    //      This is because you can shape them directly and they make every
    //      following conversation immediately more valuable."
    {
      layout: 'big-statement',
      text: 'Shape it directly.\nEvery conversation gets more valuable.',
      highlight: 'more valuable',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 375,
    },

    // ── 00:12.50 → 00:22.00  set it once ───────────────────────────────
    // VO: "Custom instructions are useful because they let you establish
    //      recurring contexts and expectations once rather than rebuilding
    //      them inside every single prompt."
    {
      layout: 'label-title-body',
      label: 'WHY IT WORKS',
      title: 'Set It Once',
      body: ['Recurring context & expectations', 'Not rebuilt in every prompt'],
      bodyTimings: [30, 120],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'document-text'],
      durationInFrames: 285,
    },

    // ── 00:25.40 → 00:40.62  without them ──────────────────────────────
    // VO: "Without them, even experienced AI users can spend part of each
    //      conversation re-explaining things like who the audience is, how
    //      much detail is useful, how decisions should be presented, or how
    //      critically AI should engage with their thinking."
    {
      layout: 'label-title-body',
      label: 'WITHOUT THEM',
      title: 'Re-explaining It, Every Time',
      body: ['Who the audience is', 'How detail should be presented', 'How critically AI should engage'],
      bodyTimings: [28, 275, 383],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'document-text', 'chat-bubble-left-right'],
      bodyCardCompact: true,
      durationInFrames: 450,
    },

    // ── 00:40.62 → 00:50.54  persistent setting ────────────────────────
    // VO: "Custom instructions move that recurring information out of the
    //      individual prompts and into a persistent setting that the AI
    //      reads before every conversation."
    {
      layout: 'centered-quote',
      text: 'Out of every prompt. Into a persistent setting.',
      durationInFrames: 300,
    },

    // ── 00:50.54 → 01:00.54  result ─────────────────────────────────────
    // VO: "And that means that your prompts can focus more on what is
    //      unique about each task while AI starts with a stronger
    //      understanding of how to work with you."
    {
      layout: 'centered-quote',
      text: "Prompts focus on what's unique. AI already knows how you work.",
      durationInFrames: 300,
    },

    // ── 01:00.54 → 01:09.68  the three Cs framework ────────────────────
    // VO: "There are three things worth telling AI, and we call them the
    //      three Cs framework: context, communication, and collaboration."
    {
      layout: 'centered-quote',
      text: 'The 3Cs Framework',
      durationInFrames: 270,
    },

    // ── 01:09.68 → 02:14.28  context / communication / collaboration ──
    // VO covers each C in turn: context is what AI should know about you
    // (role, responsibilities, expertise, who you talk to); communication
    // is how you want information presented (tone, length, structure,
    // detail, reasoning — don't ask for two things at once); collaboration
    // is how AI should approach the work (challenge you, flag risks,
    // name trade-offs, ask questions when unsure).
    {
      layout: 'three-mode-columns',
      label: 'THE 3CS',
      title: 'What To Tell AI',
      columns: [
        {
          label: 'WHAT AI KNOWS',
          title: 'Context',
          body: ['Role, responsibilities, expertise', 'Who you typically work with'],
        },
        {
          label: 'HOW IT’S PRESENTED',
          title: 'Communication',
          body: ['Tone, length, structure, detail', 'Never ask for two things at once'],
        },
        {
          label: 'HOW AI ENGAGES',
          title: 'Collaboration',
          body: ['Challenge you, flag risks, trade-offs', 'Ask when there isn’t enough info'],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 39, value: 0 },
        { from: 529, value: 1 },
        { from: 1382, value: 2 },
        { from: 1870, value: null },
      ],
      durationInFrames: 1935,
    },

    // ── 02:14.28 → 02:53.88  practical notes: format & scope ───────────
    // VO: "Once you've written all three, you wanna save them together as
    //      a single document somewhere you can easily open and update. An
    //      MD file especially will serve you well when you're working with
    //      multiple platforms and agents. Don't forget that everything you
    //      write into these custom instructions runs before every prompt
    //      moving forward. So you wanna avoid providing information that's
    //      either only applicable sometimes or otherwise would confuse the
    //      AI in context of your prompts."
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: 'Format & Scope',
      body: [
        'Your 3Cs: save them in one file you can open & update — prefer an MD file',
        "Your 3Cs run first: avoid information that's only sometimes true",
      ],
      bodyTimings: [54, 734],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['document-text', 'bolt'],
      durationInFrames: 1284,
    },

    // ── 02:55.09 → 03:02.84  keep it relevant ──────────────────────────
    // VO: "Now of course we also wanna keep these custom instructions
    //      relevant. These custom instructions should evolve as you do."
    {
      layout: 'centered-quote',
      text: 'These custom instructions should evolve as you do.',
      durationInFrames: 171,
    },

    // ── 03:02.84 → 03:32.72  when to update each C ─────────────────────
    // VO: "Your context, communication, and collaboration preferences
    //      today are likely to change within the next six months. So as
    //      your roles or responsibilities change, you wanna update your
    //      context. If you repeatedly find yourself asking for a different
    //      tone, format, or level of detail, you wanna adjust your
    //      communication preferences. And if AI is getting too
    //      argumentative or conversely too pleasing, you wanna refine your
    //      collaboration instructions."
    {
      layout: 'label-title-body',
      label: 'KEEP IT CURRENT',
      title: 'When To Update Each C',
      body: [
        'Role or responsibilities change → update context',
        'Keep asking for a different tone or detail → adjust communication',
        'Too argumentative or too pleasing → refine collaboration',
      ],
      bodyTimings: [250, 413, 676],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'chat-bubble-left-right', 'sliders'],
      bodyCardCompact: true,
      durationInFrames: 900,
    },

    // ── 03:32.72 → 03:55.18  the signal: repetition ────────────────────
    // VO: "A useful signal here is repetition. If you keep giving AI the
    //      same instruction across conversations, ask yourself whether you
    //      want AI to know or follow this most of the time. If it's a yes,
    //      consider adding it to your custom instructions. Of course, if
    //      it's specific to just one task, keep it in the prompt."
    {
      layout: 'label-title-body',
      label: 'THE SIGNAL',
      title: 'Repetition',
      body: ['Same instruction, every conversation → add it', 'One-off task → keep it in the prompt'],
      bodyTimings: [142, 567],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'document-text'],
      durationInFrames: 675,
    },

    // ── 03:55.18 → 04:06.90  closing ────────────────────────────────────
    // VO: "Now the more refined and the more up to date these custom
    //      instructions are, the more that AI truly moves from a general
    //      purpose tool to one based on you and the work you need to get
    //      done."
    {
      layout: 'centered-quote',
      text: 'The more refined, the more AI becomes yours.',
      durationInFrames: 390,
    },
  ],
};
