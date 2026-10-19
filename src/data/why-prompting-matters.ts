import { VideoData } from '../scenes/types';

// Why Prompting Matters
// Audio: why-prompting-matters.wav — 182.77s total (5483 frames @ 30fps).
// VO ends at 03:00.72 (5422f) leaving ~2s of trailing silence.
//
// Scene boundaries align with Whisper SRT segment edges from
// `.whisper-out/why-prompting-matters.srt`. Each scene comment lists the SRT
// segments it covers and the timestamp range.
//
//  #   scene                                | SRT     | start s | end s   | frames | cum
//  ----|--------------------------------------|---------|---------|---------|--------|------
//  1   title-card (silent hold)             | —       |  0.00   |  1.00   |   30   |   30
//  2   stat-hero (10× hook)                 | 1–4     |  1.00   | 10.07   |  272   |  302
//  3   label-title-body (25 yrs of Google)  | 5–9     | 10.07   | 24.57   |  435   |  737
//  4   prompt-example (Weather NYC)         | 10–12   | 24.57   | 33.47   |  267   | 1004
//  5   big-statement (machine + habit)      | 13–14   | 33.47   | 40.40   |  208   | 1212
//  6   big-statement HERO (need context)    | 15      | 40.40   | 43.87   |  104   | 1316
//  7   checklist (4 things human input)     | 16–19   | 43.87   | 53.10   |  277   | 1593
//  8   prompt-example (Q2 marketing)        | 20–23   | 53.10   | 64.87   |  353   | 1946
//  9   big-statement (mere average)         | 24–25   | 64.87   | 72.07   |  216   | 2162
//  10  problem-blackbox (statistical centre)| 26–34   | 72.07   | 95.20   |  694   | 2856
//  11  big-statement (re-prompting)         | 35      | 95.20   | 99.53   |  130   | 2986
//  12  title-slide-transition (good news)   | 36–37   | 99.53   | 105.27  |  172   | 3158
//  13  label-title-body (best person)       | 38–41   | 105.27  | 115.00  |  292   | 3450
//  14  process-steps (brief your colleague) | 42–46   | 115.00  | 129.97  |  449   | 3899
//  15  big-statement (exactly what AI needs)| 47      | 129.97  | 133.27  |   99   | 3998
//  16  split-contrast (Google vs colleague) | 48–50   | 133.27  | 142.73  |  284   | 4282
//  17  big-statement (you delegate already) | 51–53   | 142.73  | 149.67  |  208   | 4490
//  18  split-contrast (both ends spectrum)  | 54–57   | 149.67  | 163.10  |  403   | 4893
//  19  big-statement (garbage in/out)       | 58–60   | 163.10  | 170.73  |  229   | 5122
//  20  takeaway-stack (closing)             | 61–64   | 170.73  | 182.77  |  361   | 5483

export const whyPromptingMatters: VideoData = {
  audioSrc: 'audio/why-prompting-matters.wav',
  avatarSrc: 'avatar-why-prompting.mp4',
  scenes: [
    // 1 — Title card (silent hold, 1s)
    {
      layout: 'title-card-green',
      title: 'Why Prompting Matters',
      label: 'AI LEADER · ADVANCED',
      durationInFrames: 30,
    },

    // 2 — Hook stat (SRT 1–4, 1.00–10.07s)
    // VO: "There is one habit that separates leaders / who get 10 times better
    //      AI outputs / from those who keep fixing it. / They delegate instead
    //      of search."
    //   SRT 4 ("delegate instead of search") starts at 7.68s → scene frame 200.
    {
      layout: 'stat-hero',
      stat: '10×',
      label: 'ONE HABIT · BETTER AI OUTPUTS',
      unit: 'over leaders who keep fixing it',
      context: "Top performers delegate.\nThey don't search.",
      contextTiming: 200,
      split: true,
      durationInFrames: 272,
    },

    // 3 — 25 years of Google trained you backwards (SRT 5–9, 10.07–24.57s)
    // VO: "The problem is, most of us have spent 25 years being trained to do
    //      the exact opposite. Just think about how you learned to use Google.
    //      You figured out that writing a full sentence got you worse results
    //      than stripping it down to the keywords."
    //   SRT 6  (12.96) → scene frame  87  (exact opposite)
    //   SRT 7  (15.48) → scene frame 162  (think about Google)
    //   SRT 8  (18.38) → scene frame 249  (full sentence)
    //   SRT 9  (20.30) → scene frame 307  (strip to keywords)
    {
      layout: 'prompt-example',
      label: 'THE PROBLEM',
      title: '25 years of Google\ntrained you the opposite.',
      beforeLabel: 'A FULL SENTENCE',
      before: 'I need to find research on AI advancement since 2023 till now',
      afterLabel: 'STRIPPED TO KEYWORDS',
      after: 'AI Advancement',
      beforeOutcome: 'Worse results',
      afterOutcome: 'Better answer',
      beforeTiming: 239,
      afterTiming: 249,
      durationInFrames: 435,
    },

    // 4 — Weather NYC sparse input (SRT 10–12, 24.57–33.47s)
    // VO: "And that's why you search for 'Weather NYC today' / because you've
    //      been conditioned to know / that the machine rewards sparse,
    //      structured input."
    //   SRT 11 (27.42) → scene frame  86  (conditioned to know)
    //   SRT 12 (29.12) → scene frame 137  (sparse, structured input)
    {
      layout: 'prompt-example',
      label: 'WHAT GOOGLE TAUGHT YOU',
      title: 'Strip it down. The machine rewards it.',
      beforeLabel: 'WHAT YOU MEAN',
      before: 'What is the weather like in New York City today?',
      afterLabel: 'WHAT YOU TYPE',
      after: 'Weather NYC today',
      afterTiming: 86,
      durationInFrames: 267,
    },

    // 5 — Talk like a machine, working against you (SRT 13–14, 33.47–40.40s)
    // VO: "It basically taught you to talk like a machine. / And that is the
    //      exact habit that's now working against you."
    //   SRT 14 (36.94) → scene frame 104
    {
      layout: 'big-statement',
      text: 'You learned to talk like a machine.\nNow that habit works against you.',
      highlight: 'talk like a machine',
      fontSize: 68,
      animation: 'fade',
      lineTimings: [0, 104],
      durationInFrames: 208,
    },

    // 6 — Hero punch (SRT 15, 40.40–43.87s)
    // VO: "because LLMs don't need keywords, they need context."
    //   Pivot word "context" is the centre of the line — reveal second line
    //   shortly after the start of the segment.
    {
      layout: 'big-statement',
      text: 'LLMs don’t need keywords.\nThey need context.',
      highlight: 'context',
      fontSize: 100,
      animation: 'fade',
      lineTimings: [0, 35],
      durationInFrames: 104,
    },

    // 7 — Checklist: 4 things to include (SRT 16–19, 43.87–53.10s)
    // VO: "And the more human your input is / the more you explain the
    //      situation, the goal, / the constraints, and the audience, / the
    //      better the output will be."
    //   SRT 17 (46.16) → scene frame  69  (situation + goal block)
    //   SRT 18 (48.86) → scene frame 150  (constraints + audience block)
    //   SRT 19 (50.80) → scene frame 208  (the better the output)
    {
      layout: 'checklist-slide',
      label: 'THE MORE HUMAN YOUR INPUT',
      title: 'the better the output.',
      titleHighlight: 'the better',
      items: [
        'Situation — what’s going on.',
        'Goal — what good looks like.',
        'Constraints — what to work within.',
        'Audience — who it’s for.',
      ],
      itemTimings: [69, 100, 150, 180],
      durationInFrames: 277,
    },

    // 8 — Vague Q2 marketing plan (SRT 20–23, 53.10–64.87s)
    // VO: "And that is exactly why prompts like, / 'write me a Q2 marketing
    //      plan,' / do get a response in seconds, / but one that is completely
    //      useless to you."
    //   SRT 21 (55.74) → scene frame  79  ('write me a Q2 marketing plan')
    //   SRT 22 (59.02) → scene frame 178  (response in seconds)
    //   SRT 23 (61.22) → scene frame 244  (completely useless)
    {
      layout: 'prompt-example',
      label: 'ASK SOMETHING VAGUE',
      title: 'Lack of context. Useless output.',
      beforeLabel: 'YOU TYPE',
      before: 'Write me a Q2 marketing plan.',
      afterLabel: 'YOU GET',
      after: 'A generic plan. In seconds.\nCompletely useless to you.',
      afterTiming: 178,
      durationInFrames: 353,
    },

    // 9 — Mere average (SRT 24–25, 64.87–72.07s)
    // VO: "A vague prompt doesn't confuse AI, / but it does point it at the
    //      mere average of all training data."
    //   SRT 25 (67.58) → scene frame 81  (mere average)
    {
      layout: 'big-statement',
      label: 'A VAGUE PROMPT DOESN’T CONFUSE AI',
      text: 'It points AI at the mere average\nof all training data.',
      highlight: 'the mere average',
      fontSize: 64,
      animation: 'fade',
      lineTimings: [0, 81],
      durationInFrames: 216,
    },

    // 10 — Statistical centre (SRT 26–34, 72.07–95.20s)
    // VO: "Because these models are trained / to predict the most likely next
    //      word, sentence, or idea. / When the input lacks context, / the
    //      outputs are drawn from the statistical center / of everything that
    //      has ever been written on that subject. / So ask for a marketing
    //      plan / and you'll get the marketing plan / that satisfies the
    //      widest possible range / of people asking that question."
    //
    //   problem-blackbox renders an animated box with question marks → arrow →
    //   answer cell. Its own internal timing (BOX_APPEAR=130, ANSWER_APPEAR~252)
    //   plays out across the first ~9s of this 23s scene, which matches the VO
    //   beat where the speaker is describing the process.
    //   SRT 27 (73.70) → scene frame  49  (predict next word)
    //   SRT 29 (80.56) → scene frame 255  (statistical centre)
    {
      layout: 'problem-blackbox',
      label: 'PREDICT THE NEXT WORD',
      text: 'No context in.\nNo power out.',
      highlight: 'No power out.',
      lineTimings: [0, 255],
      flyingTexts: ['Write a Q2 marketing plan'],
      answerColor: '#F6C544',
      answerLabel: 'Vague answer',
      answerIcon: '',
      answerWidth: 220,
      durationInFrames: 694,
    },

    // 11 — Re-prompting punch (SRT 35, 95.20–99.53s)
    // VO: "And as a result, you have to keep re-prompting and correcting."
    {
      layout: 'big-statement',
      text: 'So you keep re-prompting.',
      highlight: 're-prompting',
      fontSize: 96,
      animation: 'fade',
      durationInFrames: 130,
    },

    // 12 — Combined: Good news + best-person needs a brief (SRT 36–46, 99.53–129.97s)
    // VO: "The good news is, you already know how to do this, right? / Think
    //      about how you work in the real world. / Even the best person on your
    //      team / wouldn't know what to do with 'write a marketing plan' /
    //      unless they ask clarifying questions / the result will be very generic.
    //      / And to avoid that, you would brief your colleague, right? / You
    //      would tell them not only what to create, / but who it's for, your
    //      past learnings, budget considerations, / how you would approach the
    //      task, / and maybe even a few examples of previous successful plans."
    //   Scene starts at 99.53s (frame 2986). Brief sub-segment starts at 115.00s
    //   (scene-relative frame 464). Brief items mapped:
    //     SRT 43 (117.46) → 538  (Who)
    //     SRT 44 (119.62) → 594  (Learnings)
    //                      → 664 (Budget)
    //     SRT 45 (124.52) → 750  (Approach)
    //     SRT 46 (126.12) → 798  (Examples)
    {
      layout: 'checklist-slide',
      label: 'GOOD NEWS · YOU ALREADY KNOW HOW',
      title: 'Even your best person\nneeds a brief.',
      items: [
        'Who: who the work is for.',
        'Learnings: what’s worked before.',
        'Constraints: what to work within.',
        'Approach: how you’d tackle it.',
        'Examples: plans you trust.',
      ],
      itemTimings: [538, 594, 664, 750, 798],
      durationInFrames: 913,
    },

    // 15 — Exactly what AI needs (SRT 47, 129.97–133.27s)
    // VO: "And that is exactly what the AI needs, too."
    {
      layout: 'big-statement',
      text: 'Exactly what AI needs, too.',
      highlight: 'Exactly what AI needs',
      fontSize: 90,
      animation: 'fade',
      durationInFrames: 99,
    },

    // 16 — Google vs colleague (SRT 48–50, 133.27–142.73s)
    // VO: "So instead of treating AI like a better Google, / think of AI as a
    //      colleague and delegate to it / as you would that human coworker."
    //   SRT 49 (136.18) → scene frame  88   (colleague + delegate)
    //   SRT 50 (139.60) → scene frame 190   (human coworker)
    {
      layout: 'split-contrast',
      leftLabel: 'TREAT AI LIKE GOOGLE',
      leftTitle: 'Search.',
      leftBody: 'Sparse keywords. Hope for the best. Then fix what comes back.',
      rightLabel: 'TREAT AI LIKE A COLLEAGUE',
      rightTitle: 'Delegate.',
      rightBody: 'Brief it like the coworker you’d trust with the task.',
      dividerLabel: 'or',
      showDivider: true,
      leftBodyDelay: 0,
      rightBodyDelay: 88,
      highlights: [
        { from: 0, value: 'left' },
        { from: 95, value: 'right' },
      ],
      durationInFrames: 284,
    },

    // 17 — You already delegate (SRT 51–53, 142.73–149.67s)
    // VO: "And that's also the good news, right? / You already know how to
    //      delegate to people. / It's why you're in the role that you're in."
    //   SRT 52 (144.60) → scene frame  56  (already know how)
    //   SRT 53 (147.06) → scene frame 130  (why you're in the role)
    {
      layout: 'big-statement',
      text: 'You already know\nhow to delegate to people.',
      highlight: 'already know',
      fontSize: 74,
      animation: 'fade',
      lineTimings: [0, 56],
      durationInFrames: 208,
    },

    // 18 — Both ends of the spectrum (SRT 54–57, 149.67–163.10s)
    // VO: "You've experienced both ends of the spectrum. / When you give clear
    //      direction and get great results, / but also when you assume someone
    //      will just know what you mean, / only to get back something that's
    //      completely off base."
    //   SRT 55 (152.60) → scene frame  88   (clear direction)
    //   SRT 56 (156.00) → scene frame 190   (assume they'll just know)
    //   SRT 57 (159.58) → scene frame 297   (completely off base)
    {
      layout: 'split-contrast',
      leftLabel: 'YOU ASSUME THEY KNOW',
      leftTitle: 'Completely off-base.',
      leftBody: 'Vague brief → guesses that miss the mark.',
      rightLabel: 'CLEAR DIRECTION',
      rightTitle: 'Great results.',
      rightBody: 'You tell them what good looks like — they deliver it.',
      dividerLabel: 'vs',
      showDivider: true,
      leftBodyDelay: 297,
      rightBodyDelay: 88,
      highlights: [
        { from: 0, value: 'right' },
        { from: 190, value: 'left' },
        { from: 320, value: null },
      ],
      durationInFrames: 403,
    },

    // 19 — Garbage in, garbage out (SRT 58–60, 163.10–170.73s)
    // VO: "In other words, you have seen it time and time again. / Garbage in
    //      is garbage out, / and AI again works exactly the same way."
    //   SRT 59 (166.22) → scene frame  94  (garbage in, garbage out)
    //   SRT 60 (168.36) → scene frame 158  (AI works the same way)
    {
      layout: 'big-statement',
      label: 'YOU HAVE SEEN IT TIME AND AGAIN',
      text: 'Garbage in. Garbage out.\nAI works the same way.',
      highlight: 'Garbage in. Garbage out.',
      fontSize: 72,
      animation: 'fade',
      lineTimings: [94, 158],
      durationInFrames: 229,
    },

    // 20 — Closing: top 1% skill (SRT 61–64, 170.73–180.72s)
    // VO: "So the top 1% AI leader skill here / isn't learning how to prompt
    //      per se, / but to unlearn Google / and delegate the way you already
    //      know how."
    //   SRT 62 (173.80) → scene frame  92   (isn't learning to prompt)
    //   SRT 63 (176.48) → scene frame 172   (unlearn Google)
    //   SRT 64 (177.92) → scene frame 215   (delegate the way you know)
    //   Trailing ~60f silence after VO ends at 180.72s (= scene frame 300).
    {
      layout: 'takeaway-stack',
      label: 'THE TOP 1% AI LEADER SKILL',
      takeaways: [
        { kicker: '', text: 'Unlearn Google.' },
        { kicker: '', text: 'Delegate the way you already know how.' },
      ],
      timings: [150, 215],
      centered: true,
      durationInFrames: 361,
    },
  ],
};
