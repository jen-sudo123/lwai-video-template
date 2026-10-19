import { VideoData } from '../scenes/types';

// The DRAFT Check
// Audio: audio/draft-check.mp3 — edited: a 3-take flub around "the final letter
// is T for take ownership" (orig 02:54.54-03:07.16) cut down to the clean final
// take. Edited duration: 252.39s.
// audioStartFrame: 60 (2s title card lead-in)
//
// Frame-accurate VO map (Whisper word timestamps on the edited audio,
// comp_frame = 60 + round(t*30)):
//    0.00 →   2.00  [title card, silence]
//    2.06 →  22.42  "Pilot flying / pilot monitoring / challenge-response / cross-check."
//   23.34 →  30.78  "A one-minute framework called the DRAFT Check."
//   31.82 →  42.36  "D: doubt the confidence. Fluent doesn't mean correct."
//   43.18 →  51.64  "It can fail a basic puzzle and still sound certain."
//   52.68 →  58.48  "That's why you don't accept it outright."
//   59.58 →  73.18  "R: reason. Show its work, its assumptions, weakest links."
//   73.90 →  88.38  "Pushes it into lower-probability territory. Ask what it left out."
//   89.26 →  94.34  "An answer can be accurate and still miss the one thing that mattered."
//   95.56 → 104.14  "A: alternatives. Models are trained to be agreeable."
//  104.92 → 120.28  "Are you sure — leading a witness desperate for approval."
//  121.18 → 130.36  "Replace with a command: adopt the persona of your toughest critic."
//  131.32 → 142.32  "Forces out counterarguments; drags it off the statistical average."
//  143.62 → 151.50  "F: facts and sources. Check what's checkable."
//  152.18 → 171.60  "Don't just click — search inside, confirm the meaning wasn't muddied."
//  174.52 → 179.76  "T: take ownership — the most consequential one."
//  180.38 → 194.62  "Before your name goes on it: right audience, right stakes."
//  195.56 → 220.30  "Low stakes vs. high stakes — calibrate how hard you verify."
//  222.10 → 230.54  "Doubt, reason, ask, facts, take ownership."
//  231.38 → 238.32  "Companies like Clay already demand it."
//  238.86 → 250.02  "Challenged AI's failure modes in 60 seconds — work you can stand behind."
//
// Scene layout:
//  #   Layout                        Comp start  Duration  Comp end
//  1   title-card-green                     0        60        60
//  2   cockpit-cross-check-diagram         60       673       733
//  3   big-statement                      733       282      1015
//  4   label-title-body                  1015       340      1355
//  5   label-title-body                  1355       254      1609
//  6   big-statement                     1609       205      1814
//  7a  label-title-body                  1814       441      2255
//  7b  label-title-body                  2255       456      2711
//  7c  big-statement                     2711       179      2890
//  8a  label-title-body                  2890       294      3184
//  8b  big-statement                     3184       484      3668
//  8c  split-contrast                    3668       303      3971
//  8d  label-title-body                  3971       359      4330
//  9a  label-title-body                  4330       275      4605
//  9b  label-title-body                  4605       603      5208
// 10a  big-statement                     5208       245      5453
// 10b  label-title-body                  5453       446      5899
// 10c  split-contrast                    5899       770      6669
// 11   process-steps                     6669       307      6976
// 12   label-title-body                  6976       234      7210
// 13a  big-statement                     7210       162      7372
// 13b  big-statement                     7372       260      7632
//                                                            ─────
//                                                     Total: 7632 frames (254.4s)

export const draftCheck: VideoData = {
  audioSrc: 'audio/draft-check.mp3',
  audioStartFrame: 60,
  scenes: [
    // ── 00:00.00 → 00:02.00  title card (pre-VO silence) ──────────────────
    {
      layout: 'title-card-green',
      title: 'The D.R.A.F.T. Check',
      label: 'A ONE-MINUTE FRAMEWORK',
      durationInFrames: 60,
    },

    // ── 00:02.06 → 00:22.42  pilot flying / pilot monitoring ──────────────
    // VO: "Every modern cockpit has a pilot flying and a pilot monitoring,
    //      working in a strict challenge and response protocol. That
    //      cross-checking exists to catch human error and complacency, and
    //      is exactly what we also need alongside our AI co-pilots. This
    //      makes you the pilot monitoring, and it keeps you in control of
    //      the workflow."
    {
      layout: 'cockpit-cross-check-diagram',
      pilotsAppearFrame: 0,
      flyingLabelFrame: 123,
      monitoringLabelFrame: 161,
      challengeAppearFrame: 219,
      responseAppearFrame: 243,
      crossCheckAppearFrame: 302,
      zoomStartFrame: 550,
      zoomScale: 1.5,
      durationInFrames: 673,
    },

    // ── 00:23.34 → 00:30.78  the DRAFT Check, named ────────────────────────
    // VO: "For this, we have a one-minute framework called the DRAFT Check,
    //      where each letter neutralizes one of the five common challenges
    //      with AI."
    {
      layout: 'big-statement',
      text: 'A one-minute framework.\nThe D.R.A.F.T. Check.',
      highlight: 'D.R.A.F.T. Check.',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 282,
    },

    // ── 00:31.82 → 00:42.36  D is for Doubt ────────────────────────────────
    // VO: "The D in draft stands for doubt the confidence. So when a
    //      perfectly formatted and confident-sounding answer appears, you
    //      remember that fluent does not mean correct."
    {
      layout: 'doubt-confidence-diagram',
      label: 'LETTER 1 OF 5',
      title: 'D Is for Doubt',
      titleHighlight: 'D',
      cardAppearFrame: 0,
      confidentAppearFrame: 20,
      // "...fluent does not mean correct" lands here.
      notEqualAppearFrame: 268,
      durationInFrames: 340,
    },

    // ── 00:43.18 → 00:51.64  fail a basic puzzle ───────────────────────────
    // VO: "The machine that just produced this very elegant-looking output
    //      may also fail to solve a basic puzzle, and will sound certain
    //      either way."
    {
      layout: 'label-title-body',
      label: 'STILL SOUNDS CERTAIN',
      title: 'It Can Fail a Basic Puzzle',
      body: ['And still sound certain, either way'],
      bodyTimings: [169],
      durationInFrames: 254,
    },

    // ── 00:52.68 → 00:58.48  sets you apart ────────────────────────────────
    // VO: "This is exactly why you don't accept the results outright and
    //      what sets you apart from a normal AI user."
    {
      layout: 'big-statement',
      text: "That's what sets you apart\nfrom a normal AI user.",
      highlight: 'sets you apart',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 205,
    },

    // ── 00:59.58 → 01:13.18  R is for Reason ───────────────────────────────
    // VO: "The R is for reasoning. Make the AI show its work, and make it
    //      show you what it left out. Expand or ask it to walk you through
    //      the assumptions behind its outputs and the weakest links in its
    //      logic."
    // Combined "R Is for Reason" beat (00:59.58 → 01:34.34): AI output feeds
    // assumptions and evidence, both roll up to a conclusion — then a human
    // steps in with a magnifying glass and finds a weak link between an
    // assumption and its evidence. Camera pushes in and holds on that
    // callout for the closing "still miss the one thing that mattered" line.
    {
      layout: 'reason-evidence-diagram',
      label: 'LETTER 2 OF 5',
      title: 'R Is for Reason',
      titleHighlight: 'R',
      outputAppearFrame: 0,
      // "...walk you through the assumptions..."
      assumptionsAppearFrame: 336,
      // "...and the weakest links in its logic."
      evidenceAppearFrame: 396,
      // "That question pushes the model into lower-probability territory..."
      conclusionAppearFrame: 472,
      // "Then ask it what it left out..."
      humanAppearFrame: 710,
      // "...what someone with deep expertise would expect to see but isn't here."
      weakConnectionAppearFrame: 785,
      // "This is because an answer can be completely accurate and still..."
      zoomStartFrame: 924,
      zoomScale: 1.9,
      durationInFrames: 1076,
    },

    // ── 01:35.56 → 02:00.28  A is for Alternatives ──────────────────────────
    // VO: "The A is for alternatives. So these models again are trained on
    //      human feedback that rewards helpful and agreeable answers. So
    //      again, are you sure as our typical pushback can result in the
    //      model caving, apologizing, and inventing a new answer that's
    //      matching the bias that you just gave it. You are basically
    //      leading a witness that's mathematically desperate for your
    //      approval."
    // Stretched to cover the "leading a witness" beat too (previously its own
    // big-statement scene) — the conversation diagram holds through it instead.
    {
      layout: 'alternatives-conversation-diagram',
      label: 'LETTER 3 OF 5',
      title: 'A Is for Alternatives',
      titleHighlight: 'A',
      humanAppearFrame: 0,
      aiAppearFrame: 90,
      // "...are you sure..." — human pushes back.
      humanEmphasisFrame: 343,
      // "...caving, apologizing..." — AI reacts.
      aiEmphasisFrame: 476,
      // 01:46.26 — the human bubble's lines resolve into the actual question.
      humanQuote: 'Are you sure?',
      humanQuoteFrame: 358,
      // 01:51.29 — the AI bubble's lines resolve into its caving reply.
      aiQuote: "You're right!",
      aiQuoteFrame: 509,
      durationInFrames: 778,
    },

    // ── 02:01.18 → 02:10.36  replace the question with a command ──────────
    // VO: "So replace that question with a command. Adopt the persona of
    //      our most aggressive competitor, and still defend the argument or
    //      this plan."
    {
      layout: 'split-contrast',
      leftLabel: 'WEAK PROMPT',
      leftTitle: '"Are you sure?"',
      rightLabel: 'STRONG PROMPT',
      rightTitle: 'Adopt the persona of your toughest critic, and still defend this.',
      highlights: [
        { from: 0, value: 'left' },
        { from: 108, value: null },
      ],
      durationInFrames: 303,
    },

    // ── 02:11.32 → 02:22.32  it forces out counterarguments ───────────────
    // VO: "This forces out the counterarguments that it was suppressing to
    //      please you, and it drags the model off of the statistical
    //      average of human thought, which is where generic output comes
    //      from."
    {
      layout: 'label-title-body',
      label: 'WHY IT WORKS',
      title: 'It Forces Out the Counterarguments',
      body: [
        'The ones it was suppressing to please you',
        'That drags it off the statistical average, where generic output comes from',
      ],
      bodyTimings: [29, 224],
      durationInFrames: 359,
    },

    // ── 02:23.62 → 02:31.50  F is for Facts and Sources ────────────────────
    // VO: "The F is for facts and sources. So of course check what's
    //      already checkable, right, like the proper nouns, dates, events,
    //      and numbers."
    {
      layout: 'facts-verification-diagram',
      label: 'LETTER 4 OF 5',
      title: 'F Is for Facts and Sources',
      titleHighlight: 'F',
      documentAppearFrame: 0,
      moneyCheckFrame: 40,
      dateCheckFrame: 100,
      percentCheckFrame: 160,
      companyCheckFrame: 220,
      durationInFrames: 275,
    },

    // ── 02:32.18 → 02:51.60  beyond the link ───────────────────────────────
    // VO: "But if it gives you a citation, don't just click the link to see
    //      whether the page loads, but actually search inside for the
    //      specific claim, and confirm that the model didn't muddy or alter
    //      the meaning of the author. This helps you verify the actual
    //      insight or finding and not whether the source exists."
    {
      layout: 'label-title-body',
      label: 'BEYOND THE LINK',
      title: "Don't Just Click, Search Inside",
      body: [
        "Confirm the model didn't muddy the author's meaning",
        'Verify the actual insight, not just that the source exists',
      ],
      bodyTimings: [20, 455],
      // Stretched to hold through 02:57.19 (was 02:51.60).
      durationInFrames: 771,
    },

    // ── 02:57.19 → 02:58.71  T is for Take Ownership ───────────────────────
    // Scene 12 was stretched to hold through "...the T for take ownership" —
    // this scene now picks up right at "and this may be the most
    // consequential one," so line 2 carries the emphasis.
    // VO (tail end): "...and this may be the most consequential one."
    {
      layout: 'big-statement',
      label: 'LETTER 5 OF 5',
      text: 'T Is for Take Ownership.\nThe most consequential one.',
      highlight: 'T',
      size: 'title',
      animation: 'kinetic',
      lineTimings: [0, 35],
      durationInFrames: 95,
    },

    // ── 03:00.38 → 03:15.56  before your name goes on it ───────────────────
    // VO: "Before your name goes on this deliverable, the question is not
    //      only whether the content is true, but about whether it's the
    //      right thing to send to this audience and at these stakes, and
    //      you want to verify in proportion to the stakes."
    {
      layout: 'label-title-body',
      label: 'BEFORE YOUR NAME GOES ON IT',
      title: 'Is This Right For This Audience?',
      body: [
        'Not just whether the content is true',
        "Whether it's the right thing to send, at these stakes",
      ],
      bodyTimings: [85, 170],
      durationInFrames: 456,
    },

    // ── 03:15.56 → 03:42.10  calibrate to the stakes ───────────────────────
    // VO: "So on a low stakes piece of work, like a quick internal message,
    //      doubting the confidence and a fast fact check may be the only
    //      checks that you need. But on something that's going to a client
    //      or a leadership team, you will likely want to run all five and
    //      where F becomes a real deep verification step instead of just a
    //      quick scan, and knowing which situation you're in is crucial to
    //      running these draft checks diligently."
    {
      layout: 'stakes-verification-diagram',
      leftAppearFrame: 0,
      // "But on something that's going to a client or a leadership team..."
      rightAppearFrame: 261,
      durationInFrames: 796,
    },

    // ── 03:42.10 → 03:50.38  the DRAFT check, recapped ─────────────────────
    // VO: "So, doubt the confidence, reason, ask for alternatives, check
    //      facts and sources and always take ownership."
    {
      layout: 'process-steps',
      label: 'THE HABIT, RECAPPED',
      title: 'The D.R.A.F.T. Check',
      steps: [
        { title: 'Doubt', body: 'Doubt the confidence.' },
        { title: 'Reason', body: 'Make it show its work.' },
        { title: 'Ask', body: 'Ask for alternatives.' },
        { title: 'Facts', body: 'Check facts and sources.' },
        { title: 'Take', body: 'Take ownership.' },
      ],
      stepTimings: [22, 89, 119, 173, 222],
      // No activeTimings — every letter stays fully lit once revealed, none dimmed.
      horizontal: true,
      durationInFrames: 278,
    },

    // ── 03:51.38 → 03:58.86  already standard practice ────────────────────
    // VO: "Companies like Clay already demand that you must stand behind
    //      every idea and every sentence in the work that you produce."
    {
      layout: 'label-title-body',
      label: 'ALREADY STANDARD PRACTICE',
      title: 'Stand Behind Everything You Produce',
      body: ['Companies like Clay already demand it'],
      bodyTimings: [0],
      durationInFrames: 225,
    },

    // ── 03:58.86 → 04:04.46  60 seconds ────────────────────────────────────
    // VO: "And with the draft check, you've challenged AI's common failure
    //      modes in just 60 seconds,"
    {
      layout: 'process-steps',
      label: 'IN JUST 60 SECONDS',
      title: 'The D.R.A.F.T. Process',
      steps: [
        { title: 'Doubt', body: 'Doubt the confidence.' },
        { title: 'Reason', body: 'Make it show its work.' },
        { title: 'Ask', body: 'Ask for alternatives.' },
        { title: 'Facts', body: 'Check facts and sources.' },
        { title: 'Take', body: 'Take ownership.' },
      ],
      // No stepTimings — every letter lit immediately, all five at once.
      horizontal: true,
      durationInFrames: 159,
    },

    // ── 04:04.46 → end (audio ends 04:12.39)  work you can stand behind ────
    // VO: "and you've moved from accepting the first output to producing
    //      real work that you can stand behind."
    {
      layout: 'big-statement',
      text: 'From the first output\nto work you can stand behind.',
      highlight: 'stand behind.',
      size: 'hero',
      animation: 'kinetic',
      lineTimings: [0, 157],
      durationInFrames: 247,
    },
  ],
};
