import { VideoData } from '../scenes/types';

// Technique 3: Chain of Thought
// Audio: chain-of-thought.mp3 — VO ends at 207.50s, file is 210.21s.
// Scenes are aligned to whisper-extracted segment timestamps so each card
// holds for the duration of its corresponding VO sentence cluster.
//
//  scene                                | VO clip start  | end       | dur (frames @30fps)
//  -------------------------------------|----------------|-----------|--------------------
//  1  title card (silent intro)         |  0.00          |  2.58     |  78
//  2  cot-comparison (Google 2022)      |  2.58          | 20.32     | 532
//  3  student analogy (split-contrast)  | 20.32          | 31.28     | 328
//  4  reasoning-chain (built-in today)  | 31.28          | 48.00     | 502
//  5  polished answers stop us asking   | 48.00          | 65.08     | 512
//  6  the gap — judgment calls          | 65.08          | 88.36     | 698
//  7  CoT makes reasoning visible       | 88.36          | 102.14    | 413
//  8  Way 1: prompt explicitly          | 102.14         | 127.46    | 760
//  9  Way 2: thinking-trace-ui          | 127.46         | 142.44    | 449
//  10 tools by default / sources wrong  | 142.44         | 170.52    | 842
//  11 when to use — questions list      | 170.52         | 185.94    | 463
//  12 agree / disagree note             | 185.94         | 198.30    | 371
//  13 closing payoff                    | 198.30         | 210.20    | 357
//                                                          total       6305
//
// Section-break centered-quote cards from the earlier draft were dropped:
// the actual VO has no pauses long enough to hold them.

export const chainOfThought: VideoData = {
  audioSrc: 'audio/chain-of-thought.mp3',
  scenes: [
    // 1 — Title (silent intro 00:00 → 00:02.58)
    {
      layout: 'title-card-green',
      title: 'Chain of Thought',
      durationInFrames: 78,
    },

    // 2 — Google 2022 finding (00:02.58 → 00:20.32, ~17.7s)
    // VO: "In 2022, a Google research team showed something very counterintuitive.
    //      When you prompt a language model to work through a problem step by step
    //      rather than jumping straight to a conclusion, performance improves
    //      significantly, especially on more complex tasks."
    {
      layout: 'cot-comparison',
      question: "Roger has 5 tennis balls. He buys 2 cans with 3 balls each. How many does he have now?",
      wrongAnswer: '27',
      reasoningSteps: [
        'Roger started with 5 balls.',
        '2 cans × 3 balls = 6 new balls.',
        '5 + 6 = 11.',
      ],
      rightAnswer: '11',
      durationInFrames: 532,
    },

    // 3 — Student analogy (00:20.32 → 00:31.28, ~11s)
    // VO: "Think of it kind of like a student who works through a math problem
    //      rather than just guessing at the answer. The active reasoning through
    //      it is what produces the better results."
    {
      layout: 'split-contrast',
      leftLabel: 'GUESSING',
      leftTitle: 'Jump straight to the answer.',
      leftBodies: ['Quick. Confident. Often wrong.'],
      leftBodyTimings: [0],
      rightLabel: 'REASONING',
      rightTitle: 'Work through it.',
      rightBodies: [
        'The act of reasoning is what produces the better result.',
      ],
      rightBodyTimings: [184],
      showDivider: false,
      highlights: [
        { from: 0, value: 'left' },
        { from: 184, value: 'right' },
      ],
      durationInFrames: 328,
    },

    // 4 — Built into modern models (00:31.28 → 00:48.00, ~16.7s)
    // VO: "The results of this technique, which is called Chain of Thought, are
    //      so powerful that all of the leading AI models now have built this in.
    //      They reason internally before they respond, working through options and
    //      checking logic before giving you an answer."
    {
      layout: 'reasoning-chain',
      label: 'Prompting Technique',
      prompt: 'Recommend our next vendor.',
      steps: [
        'Define criteria',
        'Weight factors',
        'Compare evidence',
        'Check assumptions',
      ],
      answer: 'Vendor B',
      durationInFrames: 502,
    },

    // 5 — Sounds solved, but creates a new problem (00:48.00 → 01:05.08, ~17.1s)
    // VO: "So that sounds like the problem is solved, but the truth is that it
    //      creates a new one. When answers arrive very polished and confident, we
    //      often stop asking how the model got there. And for high-stakes work,
    //      that's exactly the wrong habit to develop."
    {
      layout: 'problem-blackbox',
      label: 'BUT IT CREATES A NEW PROBLEM',
      text: 'stop us asking how.',
      highlight: 'stop us asking how',
      lineTimings: [301],
      durationInFrames: 512,
    },

    // 6 — Hidden judgment calls (01:05.08 → 01:28.36, ~23.3s)
    // VO: "When you ask AI to evaluate a strategic proposal, to assess a vendor or
    //      recommend a course of action, the model could make judgment calls that
    //      you never agreed on — like which criteria matter, how to weigh competing
    //      factors, which sources to trust. It will reach a conclusion, but it
    //      won't flag the assumptions that it made along the way."
    {
      layout: 'prompt-box-split',
      label: 'THE GAP',
      title: 'The model makes judgment calls you never agreed on.',
      titleTiming: 247,
      leftLabel: 'YOU ASK',
      leftPrompts: [
        'Evaluate this strategic proposal.',
        'Assess our next vendor.',
        'Recommend a course of action.',
      ],
      leftPromptTimings: [60, 150, 200],
      rightLabel: 'THE MODEL DECIDES',
      rightPrompts: [
        'Which criteria matter.',
        'How to weigh competing factors.',
        'Which sources to trust.',
      ],
      rightPromptTimings: [330, 390, 454],
      durationInFrames: 698,
    },

    // 7 — CoT closes the gap (01:28.36 → 01:42.14, ~13.8s)
    // VO: "And this is the gap that using Chain of Thought as a prompting
    //      technique still closes — not by making the model smarter, but by making
    //      its reasoning visible enough that you can actually evaluate it. Now
    //      there are two ways to use this."
    {
      layout: 'big-statement',
      label: 'What Chain of Thought does',
      labelSub: 'AS A TECHNIQUE',
      text: 'Not smarter.\nJust visible enough to evaluate.',
      highlight: 'visible enough',
      fontSize: 60,
      animation: 'kinetic',
      splitLabelRight: true,
      textDelay: 158,
      wordJumps: [
        { wordIndex: 3, frame: 245 },
        { wordIndex: 4, frame: 270 },
      ],
      lineTimings: [0, 75],
      durationInFrames: 413,
    },

    // 8 — Way 1: prompt for reasoning explicitly (01:42.14 → 02:07.46, ~25.3s)
    // VO: "The first one is to prompt for reasoning explicitly on anything that
    //      is high stakes. So before asking for a recommendation or a decision,
    //      ask the model to show its work step by step. Ask what assumptions it's
    //      going to make, what criteria it's using to judge quality, and what
    //      would need to be true for its conclusion to still hold. And then
    //      evaluate the logic before you act on its outputs."
    {
      layout: 'split-contrast',
      leftLabel: 'WAY 1',
      leftTitle: 'Prompt for reasoning explicitly.',
      leftBodies: [
        '"Show your work, step by step."',
        '"What assumptions are you making? What criteria are you using to judge quality?"',
        '"What would need to be true for your conclusion to hold?"',
      ],
      leftBodyTimings: [265, 376, 519],
      leftBodyHighlightIndices: [0, 2],
      rightLabel: '',
      rightTitle: '',
      showDivider: false,
      durationInFrames: 760,
    },

    // 9 — Way 2: open the thinking trace (02:07.46 → 02:22.44, ~15s)
    // VO: "And the second is worth building as a habit even when you didn't prompt
    //      for it, which is expand the thinking section and check it. In ChatGPT,
    //      Claude, Gemini, you can open the model's reasoning trace and see the
    //      steps it took to get to its answer."
    {
      layout: 'thinking-trace-ui',
      userPrompt: 'Size the US enterprise market for our category.',
      traces: [
        { tool: 'web', text: 'Searching: "US enterprise SaaS market 2024 size"' },
        { tool: 'reason', text: 'Three reports. Two disagree by 30% — pick the most recent.' },
        { tool: 'reason', text: 'Filter to enterprise tier only — strip mid-market spend.' },
        { tool: 'compute', text: 'Estimate: $42B–$58B range, ~$48B midpoint.' },
      ],
      finalAnswer: '~$48B (range $42B–$58B, midpoint of three 2024 reports).',
      callouts: [],
      thinkingAppearFrame: 115,
      durationInFrames: 449,
    },

    // 10 — Tools by default / sources can be wrong (02:22.44 → 02:50.52, ~28.1s)
    // VO: "And this matters especially now that models use tools by default. A
    //      model could be answering a market sizing question or a competitive
    //      analysis by pulling sources from the web without you asking. And those
    //      sources could be outdated, they could be misread, they could be simply
    //      wrong, or the AI could have filled in some gaps as we discussed in the
    //      lesson on hallucinations. The thinking trace shows you what it used —
    //      and whether that logic holds."
    {
      layout: 'label-title-body',
      label: 'WHY IT MATTERS NOW',
      title: 'Models pull sources from the web without asking you.',
      body: [
        'Outdated.',
        'Misread.',
        'Simply wrong.',
        'Or filled in from a hallucination.',
      ],
      bodyTimings: [416, 454, 482, 552],
      bodyRight: true,
      bodyXList: true,
      durationInFrames: 842,
    },

    // 11 — When to use / what to ask (02:50.52 → 03:05.94, ~15.4s)
    // VO: "So when should you use Chain of Thought? Whenever you're using AI as a
    //      thinking partner, open the reasoning and ask what assumptions did it
    //      make? What did it treat as a given? Did it pull any external data —
    //      and are those actually relevant here?"
    {
      layout: 'checklist-slide',
      label: 'Open the reasoning.',
      title: 'Using AI as a thinking partner? Ask',
      titleHighlight: 'Ask',
      items: [
        'What assumptions did it make?',
        'What did it treat as a given?',
        'Did it pull external data, and is it relevant here?',
      ],
      itemTimings: [238, 286, 358],
      accentIndex: 2,
      durationInFrames: 463,
    },

    // 12 — Agree with conclusion, correct the path (03:05.94 → 03:18.30, ~12.4s)
    // VO: "You might agree with the conclusion and still want to correct the path
    //      that it took to get there, or you might find that the recommendation is
    //      built on assumptions that don't apply to your situation at all."
    {
      layout: 'split-contrast',
      leftLabel: 'YOU MIGHT…',
      leftTitle: 'Agree with the conclusion.',
      leftBodies: ['Still want to correct the path it took to get there.'],
      leftBodyTimings: [88],
      rightLabel: 'OR YOU MIGHT…',
      rightTitle: 'Find the recommendation is built on assumptions that don\'t apply.',
      rightBodies: [],
      rightBodyTimings: [],
      showDivider: false,
      highlights: [
        { from: 0, value: 'left' },
        { from: 180, value: 'right' },
      ],
      durationInFrames: 371,
    },

    // 13 — Closing payoff (03:18.30 → 03:30.20, ~11.9s)
    // VO: "Chain of Thought doesn't make AI right, but it does make it checkable.
    //      And for any work that's consequential, checkable is exactly what you
    //      need."
    {
      layout: 'big-statement',
      text: "CoT doesn't make AI right.\nIt makes it checkable.",
      highlight: 'checkable',
      fontSize: 80,
      animation: 'fade',
      lineTimings: [0, 90],
      durationInFrames: 357,
    },
  ],
};
