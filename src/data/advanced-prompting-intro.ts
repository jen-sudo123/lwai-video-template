import { VideoData } from '../scenes/types';

// Audio: "advanced-prompting-intro.mp3" — 203.24s total → ~6097 frames
// All scene boundaries derived from Whisper SRT timestamps (30 fps).
// Title card (45f) sits over the first 1.5s of audio; all scene
// start frames = (SRT timestamp × 30) + 45.
//
// SRT-derived audio frames (×30 fps):
//   SRT  1  0:00.000  →    0f     SRT 26  1:43.880  →  3116f
//   SRT  2  0:07.000  →  210f     SRT 27  1:48.880  →  3266f
//   SRT  3  0:10.160  →  305f     SRT 28  1:52.880  →  3386f
//   SRT  4  0:14.640  →  439f     SRT 29  1:58.480  →  3554f
//   SRT  5  0:15.640  →  469f     SRT 30  2:04.080  →  3722f
//   SRT  6  0:20.480  →  614f     SRT 31  2:05.600  →  3768f
//   SRT  7  0:23.280  →  698f     SRT 32  2:09.760  →  3893f
//   SRT  8  0:28.880  →  866f     SRT 33  2:15.960  →  4079f
//   SRT  9  0:34.880  → 1046f     SRT 34  2:19.280  →  4178f
//   SRT 10  0:37.680  → 1130f     SRT 35  2:24.640  →  4339f
//   SRT 11  0:43.240  → 1297f     SRT 36  2:29.280  →  4478f
//   SRT 12  0:47.720  → 1432f     SRT 37  2:30.800  →  4524f
//   SRT 13  0:50.120  → 1504f     SRT 38  2:36.840  →  4705f
//   SRT 14  0:55.200  → 1656f     SRT 39  2:42.120  →  4864f
//   SRT 15  0:58.560  → 1757f     SRT 40  2:46.080  →  4982f
//   SRT 16  1:02.560  → 1877f     SRT 41  2:49.240  →  5077f
//   SRT 17  1:07.080  → 2012f     SRT 42  2:56.040  →  5281f
//   SRT 18  1:11.800  → 2154f     SRT 43  3:01.000  →  5430f
//   SRT 19  1:16.560  → 2297f     SRT 44  3:04.920  →  5548f
//   SRT 20  1:21.000  → 2430f     SRT 45  3:08.600  →  5658f
//   SRT 21  1:24.360  → 2531f     SRT 46  3:12.520  →  5776f
//   SRT 22  1:28.240  → 2647f     SRT 47  3:17.360  →  5921f
//   SRT 23  1:30.080  → 2702f     SRT 48  3:20.720  →  6022f
//   SRT 24  1:35.200  → 2856f     SRT 49  3:22.720  →  6082f
//   SRT 25  1:39.720  → 2992f
//
//   scene                             | SRT(s)    | comp frames     | dur  | layout
//   ----------------------------------|-----------|-----------------|------|--------------------
//   title card                        | —         |     0 →    44   |   45 | title-card-green
//   hook — $335k                      | 1–2       |    45 →   349   |  305 | stat-hero
//   WSJ — hottest job                 | 3–4       |   350 →   513   |  164 | big-statement
//   obsolete — WSJ screenshot         | 5–6       |   514 →   742   |  229 | centered-image-caption
//   36% training gap                  | 7–8       |   743 →  1090   |  348 | split-contrast
//   pivot: let's talk                 | 9         |  1091 →  1174   |   84 | big-statement
//   GPT-3 origin story                | 10–14     |  1175 →  1801   |  627 | label-title-body
//   four techniques (all five)        | 15–25     |  1802 →  3160   | 1359 | methods-slide
//     └─ highlight 1 at +255f        | SRT 17    |  (within scene)  |      |
//     └─ highlight 2 at +540f        | SRT 19    |  (within scene)  |      |
//     └─ highlight 3 at +774f        | SRT 21    |  (within scene)  |      |
//     └─ highlight 4 at +1099f       | SRT 24    |  (within scene)  |      |
//   bridge — each technique targets   | 26–27     |  3161 →  3430   |  270 | big-statement
//   most advice gets this wrong       | 28–30     |  3431 →  3812   |  382 | big-statement
//   simple tasks                       | 31–33     |  3813 →  4222   |  410 | label-title-body
//   when to invest — conditions       | 34–36     |  4223 →  4568   |  346 | label-title-body
//   high-stakes examples + time-save   | 37–40     |  4569 →  5121   |  553 | comparison
//     └─ right (time-save) at +340f  | SRT 39    |  (within scene)  |      |
//   the core question                 | 41–42     |  5122 →  5474   |  353 | centered-quote
//   low vs high cost split            | 43–45     |  5475 →  5820   |  346 | split-contrast
//   closing — it depends on how       | 46–47     |  5821 →  6066   |  246 | big-statement
//   blank outro                       | 48–49     |  6067 →  6216   |  150 | blank

export const advancedPromptingIntro: VideoData = {
  audioSrc: 'audio/advanced-prompting-intro.mp3',
  scenes: [

    // — title card (0→44)
    {
      layout: 'title-card-green',
      title: 'Advanced Prompt Engineering',
      subtitle: 'A Lead with AI Lesson',
      durationInFrames: 45,
    },

    // SRT 1+2 (0:00–0:10.16) — hook: the Anthropic job listing and salary
    // VO: "In 2023, Anthropic posted a job listing for a prompt engineer
    //      with a salary of up to $335,000."
    {
      layout: 'stat-hero',
      stat: '$335,000',
      label: 'PROMPT ENGINEER — ANTHROPIC, 2023',
      context: '"In 2023, Anthropic posted a job listing for a Prompt Engineer."',
      contextTiming: 0,
      durationInFrames: 305,
    },

    // SRT 3+4 (0:10.16–0:15.64) — WSJ "hottest AI job"
    // VO: "The Wall Street Journal called prompt engineering the hottest AI job
    //      that no one had ever heard of."
    {
      layout: 'big-statement',
      text: '"The hottest AI job no one had ever heard of."',
      label: 'WALL STREET JOURNAL',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 164,
    },

    // SRT 5+6 (0:15.64–0:23.28) — the role becomes obsolete (WSJ screenshot)
    // VO: "But just two years later, that very same newspaper declared the role
    //      essentially obsolete as it became an expectation for everyone."
    {
      layout: 'centered-image-caption',
      image: 'images/features/Screenshot at May 06 11-51-08.png',
      caption: 'Wall Street Journal · April 25, 2025',
      animation: 'fade',
      objectFit: 'contain',
      durationInFrames: 229,
    },

    // SRT 7+8 (0:23.28–0:34.88) — 36% training gap
    // VO: "The challenge is that according to BCG Research, only 36% of employees
    //      feel adequately trained to use AI, and one of the biggest gaps in that
    //      training is how to brief AI well."
    // Left (36%) lit first; right (Briefing AI Well) lit at SRT 8 offset 168f.
    // Lead times subtracted: highlight crossfade 12f → from 156; FadeText 18f → rightBodyDelay 150.
    {
      layout: 'split-contrast',
      leftLabel: 'BCG RESEARCH',
      leftTitle: '36%',
      leftBody: 'of employees feel adequately\ntrained to use AI',
      rightLabel: 'THE BIGGEST GAP',
      rightTitle: 'Briefing AI Well',
      rightBody: 'How to write an effective prompt\nfor complex, high-stakes work.',
      showDivider: false,
      leftTitleSize: 160,
      leftBodyDelay: 0,
      rightBodyDelay: 150,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 156, value: 'right' },
      ],
      durationInFrames: 348,
    },

    // SRT 9 (0:34.88–0:37.68) — pivot to the lesson
    // VO: "So let's talk about prompt engineering."
    {
      layout: 'big-statement',
      text: "Let's talk about Prompt Engineering.",
      highlight: 'Prompt Engineering',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 84,
    },

    // SRT 10–14 (0:37.68–0:58.56) — GPT-3 origin + why prompting still matters
    // VO: "Prompt engineering came about in 2020 with GPT-3.
    //      How you phrase the input makes an enormous difference to the output.
    //      And while models have evolved, knowing how to prompt still holds a lot of power."
    // SRT 11 offset 167f − 18f fade = 149; SRT 13 offset 374f − 18f = 356.
    {
      layout: 'label-title-body',
      label: 'THE ORIGIN',
      title: 'GPT-3, 2020',
      body: [
        'How you phrase the input makes an enormous difference to the output.',
        'Knowing how to prompt still holds a lot of power.',
      ],
      bodyTimings: [149, 356],
      image: 'images/features/GPT3.png',
      durationInFrames: 627,
    },

    // SRT 15–25 (0:58.56–1:43.88) — four techniques slide (1359f)
    // The slide fades in once. Highlights crossfade at each technique boundary.
    //
    //   from    0 → all equal       (0:58.56 — "four advanced techniques…")
    //   from  243 → highlight 1     (SRT 17 offset 255 − 12f crossfade)
    //   from  528 → highlight 2     (SRT 19 offset 540 − 12f)
    //   from  762 → highlight 3     (SRT 21 offset 774 − 12f)
    //   from 1087 → highlight 4     (SRT 24 offset 1099 − 12f)
    {
      layout: 'methods-slide',
      highlights: [
        { from: 0,    value: null },
        { from: 243,  value: 1 },
        { from: 528,  value: 2 },
        { from: 762,  value: 3 },
        { from: 1087, value: 4 },
      ],
      durationInFrames: 1359,
    },

    // SRT 26+27 (1:43.88–1:52.88) — bridge: each technique addresses a failure mode
    // VO: "Each technique addresses a different common way that AI can fail us,
    //      and each is therefore worth trying on a real piece of work even this week."
    {
      layout: 'big-statement',
      text: 'Each technique targets\na different way AI can fail.',
      highlight: 'fail',
      size: 'title',
      animation: 'fade',
      durationInFrames: 270,
    },

    // SRT 28–30 (1:52.88–2:05.60) — most advice gets this wrong
    // VO: "Now it's also important to know when to invest in this —
    //      because this is where most advice on prompting goes wrong,
    //      treating every situation the same."
    // line[0] at 0 (narrator is building to it from scene start).
    // line[1] "treating every situation the same": SRT 30 offset 336 − 22f BigStatement fade = 314.
    {
      layout: 'big-statement',
      text: 'where most advice on prompting goes wrong —\ntreating every situation the same.',
      highlight: 'the same',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 314],
      durationInFrames: 382,
    },

    // SRT 31–33 (2:05.60–2:19.28) — simple tasks
    // VO: "The newer models require less hand-holding. For clear self-contained tasks,
    //      a conversational prompt without much structure is usually all you need."
    // SRT 32 offset 125 − 18f FadeText = 107; SRT 33 offset 311 − 18f = 293.
    {
      layout: 'label-title-body',
      label: 'SIMPLE TASKS',
      title: 'Clear & self-contained',
      body: [
        'A conversational prompt is all you need.',
        'The model handles the rest.',
      ],
      bodyTimings: [107, 293],
      durationInFrames: 410,
    },

    // SRT 34–36 (2:19.28–2:30.80) — when advanced techniques earn their time
    // VO: "These advanced techniques still earn their time when the task is complex,
    //      when output must meet a specific standard, or the cost of a wrong
    //      assumption is too high."
    // body reveals staggered:
    //   body[0] at 0 (appears with scene start)
    //   body[1]: SRT 35 offset 161 − 18f FadeText = 143
    //   body[2]: SRT 36 offset 300 − 18f = 282
    {
      layout: 'label-title-body',
      label: 'WHEN TO INVEST',
      title: 'Advanced Prompting Earns Its Time',
      body: [
        'The task is complex.',
        'The output must meet a specific standard.',
        'The cost of a wrong assumption is too high.',
      ],
      bodyTimings: [0, 143, 282],
      durationInFrames: 346,
    },

    // SRT 37–40 (2:30.80–2:49.24) — high-stakes examples + time-save payoff
    // VO: "Think writing a strategic memo, a board briefing, or diagnosing a problem
    //      you can't fully articulate yet. These are the situations where spending
    //      maybe two more minutes in the prompt can really save you hours in revision."
    // Left lit first; right lights up at SRT 39 offset 340 − 12f crossfade = 328.
    {
      layout: 'comparison',
      title: '',
      leftImage: 'images/features/High-stake-example.png',
      leftLabel: '',
      rightImage: 'images/features/time-save.png',
      rightLabel: '',
      animation: 'fade',
      objectFit: 'contain',
      showLabels: false,
      imageHeight: 700,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 328, value: 'right' },
      ],
      durationInFrames: 553,
    },

    // SRT 41+42 (2:49.24–3:01.00) — the core question (cinematic pause)
    // VO: "And so the question to carry into every prompt is what is the cost of this
    //      output being wrong or generic or built on a false assumption?"
    {
      layout: 'centered-quote',
      text: 'What is the cost if this output is wrong, generic, or built on a false assumption?',
      animation: 'fade',
      durationInFrames: 353,
    },

    // SRT 43–45 (3:01.00–3:12.52) — low vs high cost
    // VO: "If the cost is low — keep it simple.
    //      If the cost is high — invest in the brief."
    // SRT 44 offset 118f. Lead times: highlight crossfade 12f → from 106; FadeText 18f → rightBodyDelay 100.
    {
      layout: 'split-contrast',
      leftLabel: 'LOW COST',
      leftTitle: 'Keep it simple',
      leftBody: '"What\'s the weather today?"\nA short conversational prompt is fine.',
      rightLabel: 'HIGH COST',
      rightTitle: 'Invest in the brief',
      rightBody: 'Prompt AI diligently.\nStructure  ·  Examples  ·  Chain of thought.',
      dividerLabel: 'vs.',
      leftBodyDelay: 0,
      rightBodyDelay: 100,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 106, value: 'right' },
      ],
      durationInFrames: 346,
    },

    // SRT 46+47 (3:12.52–3:20.72) — closing statement
    // VO: "The newer models especially have all those capabilities baked in —
    //      but whether you apply them really depends on how you prompt."
    {
      layout: 'big-statement',
      text: 'The capability is there.\nWhether you use it depends on how you prompt.',
      highlight: 'how you prompt',
      fontSize: 54,
      animation: 'kinetic',
      durationInFrames: 246,
    },

    // SRT 48+49 (3:20.72–end) — blank outro (covers "Yeah that's better. Okay." outtake)
    {
      layout: 'blank',
      durationInFrames: 150,
    },

  ],
};
