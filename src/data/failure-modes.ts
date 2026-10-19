import { VideoData } from '../scenes/types';

// Failure Modes
// Audio: failure-modes.m4a — 172.73s total (edited: retakes removed, silence gaps
// trimmed, plus a 3.21s stutter cut at 01:34.07-01:37.28 around "homogenization").
// Scenes are aligned to whisper-extracted timestamps from the final edited audio,
// cutting at natural pauses so the visual never interrupts mid-sentence.
//
//  scene                                        | VO start | end     | dur (frames @30fps)
//  ---------------------------------------------|----------|---------|--------------------
//  1  title card (silent intro)                 |  0.00    |  0.84   |  25
//  2  Carnegie study, centered                   |  0.84    |  4.00   |   95
//  3  Automation-bias diagram (zoom+freeze)      |  4.00    | 27.07   |  692
//  4  "Trust but verify" + Reagan origin         | 27.07    | 41.96   |  447
//  5  How to work with AI (trust/verify split)   | 41.96    | 50.30   |  250
//  6  The question                               | 50.30    | 55.26   |  149
//  7  Section heading — "Five Failure Modes"     | 55.26    | 60.61   |  160
//  8  All five failure modes, horizontal steps   | 60.61    | 153.18  | 2779
//  9  Takeaway — only 1 of 5 is a knowledge gap  |153.18    | 167.21  |  419
//  10 The DRAFT Check (D-R-A-F-T, all lit)        |167.21    | 172.73  |  168
//                                                            total     5184

export const failureModes: VideoData = {
  audioSrc: 'audio/failure-modes.m4a',
  scenes: [
    // 1 — Title (silent intro 00:00 → 00:00.84)
    {
      layout: 'title-card-green',
      title: 'AI Failure Modes',
      durationInFrames: 25,
    },

    // 2a — Carnegie/Microsoft study, centered (00:00.84 → 00:04.00)
    // VO: "A study by Microsoft and Carnegie Mellon found that the more confidence
    //      someone has in generative AI, the less critical thinking they apply to
    //      its outputs."
    {
      layout: 'centered-image-caption',
      image: 'images/failure-modes/carnegie-research.png',
      objectFit: 'contain',
      durationInFrames: 95,
    },

    // 2b — Automation-bias diagram (00:04.00 → 00:27.07)
    // Axes + "Defer to AI" quadrant are on screen from the start; "Apply your
    // judgment" fades in on top at judgmentAppearFrame — nothing swaps or redraws.
    // At 00:21.03 the camera zooms into the "Apply your judgment" corner and
    // holds (freezes) there for the rest of the scene, through 00:27.07.
    // VO: "But conversely, the more confidence someone has in their own judgment,
    //      the more critical thinking they apply. So the protection against
    //      automation bias is first of all trusting your own expertise enough."
    {
      layout: 'automation-bias-diagram',
      judgmentAppearFrame: 180,
      zoomStartFrame: 511,
      zoomScale: 2,
      durationInFrames: 692,
    },

    // 4 — "Trust but verify" + its origin, combined (00:27.07 → 00:41.96)
    // VO: "But that judgment needs something specific to look for. And that brings
    //      us to a phrase that you may have heard a hundred times in the context of
    //      AI. Trust but verify. This is actually a Russian proverb that Ronald
    //      Reagan made famous during the nuclear arms talks of the 1980s."
    {
      layout: 'centered-quote',
      text: '"Trust but verify."',
      attribution: 'A Russian proverb Ronald Reagan made famous during the nuclear arms talks of the 1980s.',
      durationInFrames: 447,
    },

    // 5 — How to work with AI (00:41.96 → 00:50.30)
    // VO: "It's the right way to work with AI as you keep the speed, trust, but
    //      also the ownership of the work, verify."
    {
      layout: 'split-contrast',
      leftLabel: 'TRUST',
      leftTitle: 'Keep the speed.',
      rightLabel: 'VERIFY',
      rightTitle: 'Keep the ownership of the work.',
      dividerLabel: 'and',
      // TRUST lights up first (VERIFY dimmed), then VERIFY lights up too —
      // ending on both fully lit, held through the rest of the scene.
      highlights: [
        { from: 0, value: 'left' },
        { from: 120, value: null },
      ],
      durationInFrames: 250,
    },

    // 6 — The question (00:50.30 → 00:55.26)
    // VO: "But it does obviously leave us with a question, because what are we
    //      actually verifying?"
    {
      layout: 'centered-quote',
      text: 'What are we actually verifying?',
      durationInFrames: 149,
    },

    // 7 — Section heading (00:55.26 → 01:00.61)
    // VO: "For this, it's good to know that there are five common failure modes
    //      in modern AI."
    {
      layout: 'centered-quote',
      text: 'Five Failure Modes',
      durationInFrames: 160,
    },

    // 7 — All five failure modes, combined (01:00.61 → 02:36.39)
    // One card per failure mode. Each card pops in exactly when it's first named
    // in the VO — "lit up when mentioned."
    // VO: "There's fabrication and fabrication is invention, like a court case
    //      that never happened or a paper that doesn't exist or a made up
    //      statistic. This is what most of us mean when we say hallucination,
    //      although that misses another form of fabrication called misgrounding.
    //      Misgrounding is when the model invents the meaning instead of the
    //      source. So while the citation is real, the claim that's attached to it
    //      is not. The third failure mode is homogenization. This is the model
    //      reverting to the average. AI models are built to produce the most
    //      probable text, so they strip out whatever was specific or unusual
    //      about your situation, and that results in broad statements rather
    //      than, for example, a tailored strategy. Then there's sycophancy. This
    //      is the model agreeing with you rather than assessing you. So an AI is
    //      trained to be helpful and agreeable. And so even saying something
    //      like, are you sure on an AI output can trigger sycophancy? Because the
    //      model thinks there must be an issue, and it will abandon its original
    //      answer. And finally, there's multi-turn drift. This is when the model
    //      is getting stuck on its own early assumptions. So once a long
    //      conversation starts from a wrong reading of what you wanted, your
    //      corrections get merged with that original error rather than replacing
    //      it, and the chat quality actually degrades instead of improves."
    {
      layout: 'process-steps',
      label: 'FAILURE MODES 1–5',
      title: 'What to watch for in AI output.',
      steps: [
        { title: 'Fabrication', body: 'Invention that never existed.' },
        { title: 'Misgrounding', body: 'Invents the meaning, not the source.' },
        { title: 'Homogenization', body: 'Reverting to the average.' },
        { title: 'Sycophancy', body: 'Agreeing with you instead of assessing you.' },
        { title: 'Multi-turn drift', body: 'Stuck on its own early assumptions.' },
      ],
      // A 3.21s stutter around "homogenization" (01:34.07-01:37.28) was cut from
      // the audio — timings after that point shifted back 96 frames accordingly.
      stepTimings: [0, 556, 1000, 1605, 2228],
      activeTimings: [0, 556, 1000, 1605, 2228],
      horizontal: true,
      durationInFrames: 2779,
    },

    // 10 — Takeaway (02:36.39 → 02:46.92)
    // VO: "So as you can see of these five AI challenges, only the first one is a
    //      knowledge problem, while the other four follow from what these systems
    //      are and how they are trained, which is why better models will not be
    //      the immediate solution."
    {
      layout: 'process-steps',
      label: 'THE TAKEAWAY',
      title: 'Only one of five is a knowledge problem.',
      steps: [
        { title: 'Fabrication', body: 'Invention that never existed.' },
        { title: 'Misgrounding', body: 'Invents the meaning, not the source.' },
        { title: 'Homogenization', body: 'Reverting to the average.' },
        { title: 'Sycophancy', body: 'Agreeing with you instead of assessing you.' },
        { title: 'Multi-turn drift', body: 'Stuck on its own early assumptions.' },
      ],
      // No activeTimings — every step stays fully lit, none dimmed.
      // Extended to end at 02:47.21 so the DRAFT scene below takes over right
      // as the VO says "So next we'll build a habit..."
      horizontal: true,
      durationInFrames: 419,
    },

    // 11 — The DRAFT Check (02:47.21 → end)
    // VO: "So next we'll build a habit that you can run in under a minute that
    //      saves you from all of this."
    // Visual only — the acronym breakdown, all five lit at once (no audio change).
    {
      layout: 'process-steps',
      label: 'THE HABIT',
      title: 'The DRAFT Check',
      steps: [
        { title: 'Doubt', body: 'Doubt the confidence.' },
        { title: 'Reason', body: 'Reason.' },
        { title: 'Ask', body: 'Ask for alternatives.' },
        { title: 'Facts', body: 'Check facts and sources.' },
        { title: 'Take', body: 'Take ownership.' },
      ],
      // No activeTimings — every letter stays fully lit, none dimmed.
      horizontal: true,
      durationInFrames: 168,
    },
  ],
};
