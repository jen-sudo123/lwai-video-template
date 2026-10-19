import { VideoData } from '../scenes/types';

// Judging AI: how to evaluate AI output instead of trusting it on sight
// Audio: audio/judging-ai.mp3
// Total audio duration: 205.57s => 6167 frames @ 30fps
// (93 frames / 3.09s cut from 01:51.00–01:54.09: "The AI can solve graduate
// level problems" removed from the narration — the jagged-frontier diagram's
// card already shows it)
// audioStartFrame: 60 (2s title card lead-in)
//
// Frame-accurate VO map (Whisper word timestamps, comp_frame = 60 + round(t*30)):
//    0.00 →   2.00  [title card, silence]
//    1.06 →  16.06  "Picture this situation… hit enter."
//   16.06 →  27.62  "…confidently written… work appears done."
//   27.62 →  33.48  "But now… is any of this correct?"
//   34.50 →  54.56  "Not a technology problem… stronger under pressure."
//   54.56 →  67.76  "Glean study: 69% ship unreviewed work."
//   67.76 →  81.18  "Stanford: up to two hours of rework."
//   81.18 →  98.56  "The jagged frontier — the boundary definition."
//   98.56 → 122.10  "Graduate-level problems solved / tiny game scores zero."
//  122.10 → 134.66  "Two tasks that look equally hard."
//  134.66 → 147.70  "AI never tells you which side of the line."
//  147.70 → 153.76  "Automation bias: experts fall asleep at the wheel."
//  153.76 → 172.54  "Cognitive offloading: fluency as a proxy for accuracy."
//  172.54 → 199.24  "EU AI Act Article 14 / US DOL literacy framework."
//  199.24 → 202.58  "The question isn't whether, it's what you're checking for."
//  202.58 → 206.88  "That's about to become a superpower."
//
// Scene layout:
//  #  Layout               Comp start  Duration  Comp end
//  1  title-card-green            0       60        60
//  2  label-title-body           60      300       360   (scenario-thinking.svg)
//  3  video-clip                360      182       542   (hook-scenario.mp4, t=0)
//  4  video-clip                542      347       889   (hook-scenario.mp4, holds last frame from t=10s)
//  5  big-statement             889      206      1095
//  6  label-title-body         1095      678      1773   (fluency-pipeline diagram)
//  7  stat-hero                1773      320      2093
//  8  stat-hero                2093      402      2495
//  9  label-title-body         2495      522      3017
// 10  jagged-frontier-diagram  3017      613      3630   (line draws in at 01:47.06; 93f audio cut)
// 11  big-statement            3630      450      4080
// 12  big-statement            4080      318      4398
// 13  big-statement            4398      100      4498   (fall asleep at the wheel)
// 14  big-statement            4498      151      4649   (Automation Bias)
// 15  label-title-body         4649      494      5143
// 16  label-title-body         5143      741      5884
// 17  big-statement            5884      160      6044
// 18  big-statement            6044      243      6287
//                                               ─────
//                                         Total: 6287 frames (209.6s)

export const judgingAi: VideoData = {
  audioSrc: 'audio/judging-ai.mp3',
  audioStartFrame: 60,
  // hook-scenario.mp4 plays as one continuous background across scenes 3 and 4
  // (video-clip layout scenes). It's 10s (300f) but those two scenes span
  // 529f — it holds on its last frame ("DONE" checkmark) for the remainder.
  clipSrc: 'video/judging-ai/hook-scenario.mp4',
  clipStartFrame: 360,
  scenes: [
    // ── 00:00.00 → 00:02.00  title card (pre-VO silence) ──────────────
    {
      layout: 'title-card-green',
      title: 'Judging AI',
      label: 'EVALUATING AI OUTPUT',
      durationInFrames: 60,
    },

    // ── 00:01.06 → 00:11.06  the scenario ────────────────────────────────
    // VO: "Picture this situation. You're sitting at your desk, the clock
    //      is running down on something important…"
    {
      layout: 'label-title-body',
      label: 'THE SCENARIO',
      title: 'You Need An Answer, Fast',
      body: ['Something important. The clock is running down.'],
      bodyTimings: [155],
      image: 'images/judging-ai/scenario-thinking.svg',
      durationInFrames: 300,
    },

    // ── 00:11.06 → 00:16.06  type it in, hit enter ───────────────────────
    // VO: "…and you need a complicated question answered very fast. So of
    //      course you're going to turn to your AI assistant and you're
    //      going to type in a long layered prompt and hit enter."
    {
      layout: 'video-clip',
      videoSrc: 'video/judging-ai/hook-scenario.mp4',
      videoStartTime: 0,
      label: 'THE SCENARIO',
      title: 'Type It In, Hit Enter',
      body: ['A long, layered prompt — sent in seconds'],
      bodyTimings: [110],
      durationInFrames: 182,
    },

    // ── 00:16.06 → 00:27.62  the polished output ────────────────────────
    // VO: "And within seconds you get a confidently written, beautifully
    //      formatted and authoritative sounding deliverable. And you feel
    //      that wave of relief because the work appears to be done."
    // Video runs out ~10s in (its full length) and holds on the "DONE"
    // checkmark frame for the remainder — pairs naturally with this text.
    {
      layout: 'video-clip',
      videoSrc: 'video/judging-ai/hook-scenario.mp4',
      videoStartTime: 10.0,
      label: 'THE OUTPUT',
      title: 'It Looks Done',
      body: [
        'Confidently written',
        'Beautifully formatted',
        'Authoritative sounding',
      ],
      bodyTimings: [47, 78, 119],
      durationInFrames: 347,
    },

    // ── 00:27.62 → 00:34.50  the doubt ───────────────────────────────────
    // VO: "But now here is the question that should stop us. How do we
    //      actually know that any of this is correct?"
    {
      layout: 'big-statement',
      text: 'But how do you know\nany of this is correct?',
      highlight: 'correct?',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 206,
    },

    // ── 00:34.50 → 00:57.09  human behavior problem ─────────────────────
    // VO: "Catching errors in that polished text isn't a technology
    //      problem as much as it is a human behavior problem. We are
    //      actually built to accept fluent, confident information at
    //      face value and that tendency actually gets stronger under
    //      pressure. And with increased AI usage that's a widespread and
    //      costly issue."
    {
      layout: 'label-title-body',
      label: 'NOT A TECH PROBLEM',
      title: 'Catching Errors Is a Human Behavior Problem',
      body: [
        "We're built to accept fluent, confident information at face value",
        'That tendency gets stronger under pressure',
      ],
      bodyTimings: [193, 472],
      diagram: 'fluency-pipeline',
      diagramTimings: [0, 150, 320, 472],
      durationInFrames: 678,
    },

    // ── 00:57.09 → 01:07.76  the 69% stat ────────────────────────────────
    // VO: "A Glean study found that 69% of AI users admit to shipping
    //      work that they haven't reviewed and couldn't defend if they
    //      were challenged on it."
    {
      layout: 'stat-hero',
      stat: '69%',
      imagesLayout: 'side-by-side',
      images: [
        'images/judging-ai/glean-report-cover.png',
        'images/judging-ai/botshitting-definition.png',
      ],
      imageAspect: [2.398, 3.511],
      imageTimings: [0, 70],
      imageZoom: [
        undefined,
        { centerX: 0.265, centerY: 0.825, scale: 2.3, startFrame: 160 },
      ],
      durationInFrames: 320,
    },

    // ── 01:07.76 → 01:21.18  the two-hours stat ──────────────────────────
    // VO: "Stanford research shows that the rework of someone making sense
    //      of AI generated content can cost up to two hours for every
    //      piece of work."
    {
      layout: 'stat-hero',
      stat: '2 hours',
      hideStat: true,
      imagesLayout: 'center',
      images: ['images/judging-ai/stanford-workslop-costs.png'],
      imageAspect: [3.264],
      imageZoom: [
        { centerX: 0.35, centerY: 0.44, scale: 2.5, startFrame: 160 },
      ],
      durationInFrames: 402,
    },

    // ── 01:21.18 → 01:38.56  the jagged frontier ────────────────────────
    // VO: "It starts with a misconception about what AI is actually good
    //      at. Researchers at Harvard and BCG call this the jagged
    //      frontier. The frontier is the boundary between the work that
    //      AI is genuinely good at and the work that it fails at. If that
    //      boundary were a straight line this would be very easy for us."
    {
      layout: 'label-title-body',
      label: "HARVARD & BCG'S TERM FOR IT",
      title: 'The Jagged Frontier',
      body: [
        'The boundary between what AI is good at, and what it fails at',
        'If that boundary were a straight line, this would be easy',
      ],
      bodyTimings: [135, 467],
      durationInFrames: 522,
    },

    // ── 01:38.56 → 02:02.10  graduate problems vs a simple game ─────────
    // VO: "But that boundary isn't straight, it's jagged as they say. [cut:
    //      "The AI can solve graduate level problems" removed — the card
    //      already shows it] ...but then scores near zero when asked to
    //      learn a tiny unfamiliar game that humans intuitively figure out."
    // Audio cut 01:51.00→01:54.09 (93 frames) removed from this scene.
    {
      // Line draws itself starting at comp 01:47.06 (local frame 255).
      layout: 'jagged-frontier-diagram',
      lineStartFrame: 255,
      lineDrawFrames: 100,
      durationInFrames: 613,
    },

    // ── 02:02.10 → 02:14.66  equally hard, wildly different ─────────────
    // VO: "So from where you are sitting those two tasks look equally
    //      hard. So when you watch it handle the difficult one flawlessly
    //      you're going to assume it's smart enough to handle the simple
    //      one too, because a human expert would."
    {
      layout: 'big-statement',
      text: 'Two tasks. Equally hard to you.\nWildly different for the machine.',
      highlight: 'Wildly different',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 450,
    },

    // ── 02:14.66 → 02:27.70  never tells you which side ─────────────────
    // VO: "And to make things worse these AI tools never tell you which
    //      side of the boundary a task is on."
    {
      layout: 'big-statement',
      text: 'And it never tells you\nwhich side of the line you\'re on.',
      highlight: "which side of the line",
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 318,
    },

    // ── 02:27.70 → 02:33.76  automation bias ─────────────────────────────
    // VO: "Even highly trained experts become complacent and fall asleep
    //      at the wheel when the machine projects certainty, which is a
    //      phenomenon called automation bias."
    {
      layout: 'big-statement',
      text: 'Certainty makes experts\nfall asleep at the wheel.',
      highlight: 'fall asleep at the wheel.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 100,
    },

    // "Automation bias" as the main statement, revealed once the line above lands.
    {
      layout: 'big-statement',
      text: 'Automation Bias',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 151,
    },

    // ── 02:33.76 → 02:52.54  cognitive offloading ────────────────────────
    // VO: "The underlying mechanism is cognitive offloading. Your brain is
    //      energy efficient, which is a polite way of saying lazy, and so
    //      when a system delivers an answer fluently the brain treats
    //      that fluency as a proxy for accuracy and then skips the
    //      checking."
    {
      layout: 'label-title-body',
      label: 'COGNITIVE OFFLOADING',
      title: "Fluency Isn't Accuracy",
      body: [
        "Your brain is energy-efficient — a polite way of saying lazy",
        'It treats a fluent answer as a proxy for a correct one',
        'And skips the checking altogether',
      ],
      bodyTimings: [100, 339, 417],
      // Human figure dims out at 02:49.03 (local frame 329).
      diagram: 'ai-human-decision',
      diagramTimings: [329],
      durationInFrames: 494,
    },

    // ── 02:52.54 → 03:19.24  regulators respond ──────────────────────────
    // VO: "This has dire consequences, so regulators are already making
    //      work of it. The EU AI Act's article 14 directly names
    //      automation bias as a huge issue and requires that a person can
    //      interpret an output and decide to override it. And in the
    //      United States the Department of Labor's AI literacy framework
    //      lists evaluating AI outputs as a foundational area."
    {
      layout: 'label-title-body',
      label: 'REGULATORS ARE RESPONDING',
      title: 'Automation Bias Is Now Regulated',
      body: [
        'EU AI Act Article 14: a person must be able to interpret and override an output',
        'US Dept. of Labor: evaluating AI outputs is a foundational literacy skill',
      ],
      bodyTimings: [174, 513],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'eye'],
      durationInFrames: 741,
    },

    // ── 03:19.24 → 03:22.58  reframe the question ────────────────────────
    // VO: "So the question isn't whether we should be checking AI's work
    //      but what we're actually checking for."
    {
      layout: 'big-statement',
      text: "It's not whether you check AI's work.\nIt's what you're checking for.",
      highlight: "what you're checking for.",
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 160,
    },

    // ── 03:22.58 → 03:26.88  the superpower close ────────────────────────
    // VO: "Something that we predict will become a superpower in creating
    //      great work with AI."
    {
      layout: 'big-statement',
      text: "That's about to become\na superpower.",
      highlight: 'superpower.',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 243,
    },
  ],
};
