import { VideoData } from '../scenes/types';

// What Is Generative AI?
// Video: video/what-is-generative-ai.mp4 (trimmed from dumping/History of AI (1).mp4,
//   cut at 339.3s to drop the trailing "quick quiz" reference — native narration + audio,
//   played continuously as the composition-level background clip, clipMuted: false)
// No separate VO track — narration is the source video's own audio track.
// Total: 10179 frames (~339.3s) @ 30fps
//
// Source narration transcript (from src/data/history-of-ai-audio whisper run) map:
//   0.00  →  30.16  Welcome / "most human technology ever invented" (blank footage)
//  30.16  →  88.32  ChatGPT demo — Bowen & Jordan birthday clip (footage visible)
//  88.32  → 136.72  Alan Turing / boom-bust cycles (blank footage → Turing image inserted)
// 136.72  → 170.64  Predictive AI intro + definition (logo b-roll)
// 170.64  → 192.88  Amazon / NPR example (blank footage → NPR image inserted)
// 192.88  → 273.04  Predictive AI limits → Generative AI definition (mixed b-roll)
// 273.04  → 294.08  ChatGPT launch, Nov 2022, 100M users in 2 months
// 294.08  → 339.30  Growth stats (1B+ msgs/day, 800M WAU) + wrap-up
//
// Scene layout:
//  #  Layout                       Start    Dur    End
//  1  title-card-green                0     60      60
//  2  video-clip (intro)             60    845     905
//  3  video-clip (demo)             905   1745    2650
//  4  centered-image (Turing)      2650   1452    4102
//  5  label-title-body (predictive) 4102  1017    5119
//  6  centered-image (NPR)         5119    667    5786
//  7a process-steps (pipeline)     5786    727    6513
//  7b split-contrast               6513    475    6988
//  7c label-title-body (cards)     6988    504    7492
//  7d centered-quote               7492    699    8191
//  8  video-clip (chatgpt)         8191    631    8822
//  9a video-clip (growth footage)  8822    598    9420
//  9b takeaway-stack (recap)       9420    759   10179

export const whatIsGenerativeAi: VideoData = {
  clipSrc: 'video/what-is-generative-ai.mp4',
  clipStartFrame: 0,
  clipMuted: false,
  scenes: [
    // ── 0.00 → 2.00  title card ─────────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'What Is Generative AI?',
      label: 'AI FUNDAMENTALS',
      durationInFrames: 60,
    },

    // ── 2.00 → 30.16  intro — blank footage, "most human technology" ─
    // Narration: "AI may sound technical, or even intimidating. But it
    //  actually is the most human technology ever invented."
    {
      layout: 'centered-quote',
      text: 'One of the most human\ntechnologies ever created.',
      lineTimings: [0, 0],
      highlight: 'most human',
      highlightFrame: 415,
      durationInFrames: 845,
    },

    // ── 30.16 → 88.32  ChatGPT demo footage — clean, no overlay ──────
    {
      layout: 'video-clip',
      videoSrc: 'video/what-is-generative-ai.mp4',
      videoStartTime: 30.16,
      durationInFrames: 1745,
    },

    // ── 88.32 → 136.72  Alan Turing — image cutaway ───────────────────
    // Narration: "...when Alan Turing started to think about this idea
    //  of could we eventually have a computer that could act and think
    //  like a human..."
    {
      layout: 'centered-image-caption',
      image: 'images/what-is-generative-ai/alan-turing.png',
      caption: '1950s: Alan Turing asks, can a machine truly think?',
      objectFit: 'contain',
      imageZoom: { centerX: 0.5, centerY: 0.4, scale: 1.12 },
      durationInFrames: 1452,
    },

    // ── 136.72 → 170.64  Predictive AI — footage is blank here, full slide ──
    {
      layout: 'label-title-body',
      label: 'PREDICTIVE AI',
      title: 'The Wave Before ChatGPT',
      body: ['The biggest wave of AI before ChatGPT.', 'Learns from historical data, predicts what happens next.'],
      bodyTimings: [30, 763],
      durationInFrames: 1017,
    },

    // ── 170.64 → 192.88  Amazon / NPR — image cutaway ─────────────────
    // Narration: "...a headline from an NPR article where they said, by
    //  the time someone clicks buy on Amazon, the team has probably
    //  expected it..."
    {
      layout: 'centered-image-caption',
      image: 'images/what-is-generative-ai/npr-amazon.png',
      caption: "NPR: Amazon predicts your order before you click “Buy.”",
      objectFit: 'contain',
      imageZoom: { centerX: 0.5, scale: 1.08 },
      durationInFrames: 667,
    },

    // ── 192.88 → 217.12  Predictive AI pipeline — footage blank, process steps ──
    // Narration: "...very complicated and very expensive... you needed to
    //  collect a ton of data... clean and prepare and label the data...
    //  choose a model, train the model... then finally get some predictions."
    {
      layout: 'process-steps',
      label: 'BUILDING PREDICTIVE AI',
      title: 'Powerful, But Expensive To Run',
      horizontal: true,
      steps: [
        { title: 'Collect', body: 'Gather years of historical data.' },
        { title: 'Clean & Label', body: 'Prepare it so a model can learn from it.' },
        { title: 'Train', body: 'Choose a model and train it.' },
        { title: 'Predict', body: 'Finally, get a prediction.' },
      ],
      stepTimings: [206, 367, 576, 655],
      durationInFrames: 727,
    },

    // ── 217.12 → 232.96  Predictive AI limits vs. Generative AI ──────
    // Narration: "...definitely nowhere near the AI we know today, where
    //  we can ask questions, get answers immediately... it doesn't even
    //  need supervision. And that is the generative AI."
    {
      layout: 'split-contrast',
      leftLabel: 'PREDICTIVE AI',
      leftTitle: 'Needs Training',
      leftBody: 'Set it up, train it, then wait for results.',
      rightLabel: 'GENERATIVE AI',
      rightTitle: 'Ask And Get An Answer',
      rightBody: 'No training. No supervision. Just ask.',
      dividerLabel: 'vs.',
      durationInFrames: 475,
    },

    // ── 232.96 → 249.76  Generative AI creates — footage blank, cards ──
    // Narration: "...doesn't just recognize patterns and predict into the
    //  future. It can create new content — text, images, codes from
    //  scratch — based on the data it's been trained on."
    {
      layout: 'label-title-body',
      label: 'GENERATIVE AI',
      title: 'Creates New Content From Scratch',
      body: ['Text', 'Images', 'Code'],
      bodyTimings: [241, 277, 313],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 504,
    },

    // ── 249.76 → 273.04  Closer to Turing's idea — footage blank, quote ──
    // Narration: "...closer to the original idea of Turing... we didn't
    //  have to tell it exactly how to learn. We just gave it all of this
    //  data. It learned a ton. Now you can interact with it as if you're
    //  speaking to a human."
    {
      layout: 'centered-quote',
      text: 'Closer to Turing’s original idea.\nWe didn’t have to tell it how to learn.\nWe just gave it the data, and it learned.',
      lineTimings: [30, 408, 487],
      durationInFrames: 699,
    },

    // ── 273.04 → 294.08  The ChatGPT moment — clean footage, no card ────
    {
      layout: 'video-clip',
      videoSrc: 'video/what-is-generative-ai.mp4',
      videoStartTime: 273.04,
      durationInFrames: 631,
    },

    // ── 294.08 → 314.00  Growth stats — clean footage, no card ──────────
    {
      layout: 'video-clip',
      videoSrc: 'video/what-is-generative-ai.mp4',
      videoStartTime: 294.08,
      durationInFrames: 598,
    },

    // ── 314.00 → 339.30  Wrap-up — footage blank, closing recap ──────
    // Narration: "...one of the most visited websites in the world. It
    //  truly has become something a lot of us have embraced. So that's a
    //  quick history of AI: from Alan Turing in the 1950s... to predictive
    //  AI... to generative AI that can create completely new content."
    {
      layout: 'takeaway-stack',
      label: 'THE SHORT VERSION',
      title: 'A Quick History of AI',
      takeaways: [
        { kicker: '1950s', text: 'Alan Turing asks if machines can think.' },
        { kicker: '2010s', text: 'Predictive AI learns from the past.' },
        { kicker: 'Today', text: 'Generative AI creates something new.' },
      ],
      timings: [40, 260, 460],
      durationInFrames: 759,
    },
  ],
};
