import { VideoData } from '../scenes/types';

// Audio: audio/voiceover-v2.mp3 — spliced VO (2026-07-10). Replaces the original
// GPT-5.3/5.5 models section and JGBT pricing section with updated GPT-5.5 Instant /
// GPT-5.6 (Sol, Terra, Luna) / Sol Pro copy, and refreshed pricing (Sora line removed).
// Splice map: 0→2:14.30 original | 2:14.30→3:18.20 new (models, Daan voice) |
//   3:18.20→3:54.56 original (privacy) | 3:54.56→5:29.62 new (pricing, Daan voice) |
//   5:29.62→end original (closing).
//
// Scenes 1–16 (title card through Codex) are unchanged — that portion of the audio
// is byte-identical to the original recording, so its timing (already audited) stands.
// Everything from "The Models heading" onward is retimed against a fresh Whisper
// word-level transcript of voiceover-v2.mp3 (30 fps), scene boundaries are contiguous
// (each scene's duration runs to the start of the next, absorbing natural pauses).
//
//   scene                     | VO start     | frames      | dur
//   --------------------------|--------------|-------------|------
//   title card                | 00:00.000    |     0 →  38 |   38
//   opening hook               | 00:01.280    |    38 → 437 |  399
//   billion users chart       | 00:14.580    |   437 → 772 |  335
//   search & deep research    | 00:25.740    |   772 →1084 |  312
//   file uploads & analysis   | 00:36.120    |  1084 →1352 |  268
//   voice                     | 00:45.080    |  1352 →1586 |  234
//   images 2.0                | 00:52.860    |  1586 →1886 |  300
//   canvas                    | 01:02.880    |  1886 →2096 |  210
//   projects                  | 01:09.880    |  2096 →2263 |  167
//   custom gpts               | 01:15.440    |  2263 →2392 |  129
//   apps                      | 01:19.740    |  2392 →2645 |  253
//   skills                    | 01:27.500    |  2645 →2898 |  253
//   tasks                     | 01:36.600    |  2898 →3092 |  194
//   agent                     | 01:43.060    |  3092 →3310 |  218
//   memory                    | 01:50.320    |  3310 →3539 |  229
//   codex                     | 01:57.960    |  3539 →3731 |  192
//   — The Models heading —    | 02:04.37*    |  3731 →4047 |  316  ← "...Instant, Thinking and Pro."
//   gpt-5.5 instant           | 02:14.900    |  4047 →4373 |  326
//   gpt-5.6 family intro      | 02:25.760    |  4373 →4715 |  342
//   sol / terra / luna        | 02:37.160    |  4715 →5111 |  396
//   sol is main model (quote) | 02:50.360    |  5111 →5294 |  183
//   sol use cases             | 02:56.480    |  5294 →5605 |  311
//   sol pro intro             | 03:06.840    |  5605 →5797 |  192
//   sol pro usage (quote)     | 03:13.240    |  5797 →5996 |  199
//   privacy & data use        | 03:19.860    |  5996 →7037 | 1041  ← bullets at +69,+219,+438,+757
//   plans & pricing heading   | 03:54.560    |  7037 →7231 |  194
//   free                      | 04:01.020    |  7231 →7787 |  556  ← bullets at +0,+168,+435
//   go                        | 04:19.580    |  7787 →8267 |  480  ← bullets at +0,+123,+298
//   plus                      | 04:35.560    |  8267 →8761 |  494  ← bullets at +0,+206,+339
//   pro                       | 04:52.020    |  8761 →9238 |  477  ← bullets at +0,+247,+348
//   business & enterprise     | 05:07.920    |  9238 →9589 |  351  ← bullets at +0,+189,+294
//   business vs. enterprise   | 05:19.640    |  9589 →9908 |  319  ← bullets at +0,+234
//   closing quote             | 05:30.280    |  9908 →10111|  203
//   outro                     | 05:37.020    | 10111 →10228|  117

export const sampleVideo: VideoData = {
  audioSrc: 'audio/voiceover-v2.mp3',
  scenes: [

    // 00:00.000 → 02:05.01 — title card through start of "Models heading", real footage
    // from the original "Day 1 - ChatGPT Intro" course video (video-clip is always muted —
    // the global audioSrc above carries the narration for the whole composition).
    {
      layout: 'video-clip',
      videoSrc: 'video/day1-chatgpt-intro.mp4',
      videoStartTime: 0,
      durationInFrames: 3750,
    },

    // 02:05.01 → 02:14.90 — "Instant, Thinking and Pro" is spoken here, and the baked-in
    // footage goes on to show the stale "GPT-5.3 Instant / GPT-5.5 Thinking / GPT-5.5 Pro"
    // list plus a "GPT-5.3 Instant" title card right up to the cut — whited out for the
    // full stretch so no old model numbers show at any point.
    {
      layout: 'video-clip',
      videoSrc: 'video/day1-chatgpt-intro.mp4',
      videoStartTime: 125.000,
      durationInFrames: 297,
      whiteoutBox: { top: 150, left: 60, width: 640, height: 400 },
    },

    // 02:14.90 → 02:25.76 — gpt-5.5 instant
    // Second bullet fades in at +187f on "writing,"
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-5.5 Instant',
      body: ['Fast, everyday model', 'Writing, summarizing, brainstorming, image analysis, quick work'],
      bodyTimings: [0, 187],
      durationInFrames: 326,
    },

    // 02:25.76 → 02:37.16 — gpt-5.6 family intro
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'GPT-5.6',
      body: ['Previewed June 26, 2026', 'Rolling out to eligible ChatGPT plans'],
      durationInFrames: 342,
    },

    // 02:37.16 → 02:50.36 — sol, terra & luna
    // Zooms into each card as its name is spoken: Sol @+14f, Terra @+144f, Luna @+267f
    {
      layout: 'label-title-body',
      label: 'GPT-5.6 Family',
      title: 'Sol, Terra & Luna',
      body: [
        'Sol: flagship for complex reasoning',
        'Terra: balances capability, speed & cost',
        'Luna: fastest, most cost-efficient',
      ],
      image: 'images/sol-terra-luna-cards.jpg',
      imageZoomKeyframes: [
        { startFrame: 0, centerX: 0.5, centerY: 0.5, scale: 1 },
        { startFrame: 14, centerX: 0.17, centerY: 0.42, scale: 2.6 },
        { startFrame: 144, centerX: 0.5, centerY: 0.42, scale: 2.6 },
        { startFrame: 267, centerX: 0.83, centerY: 0.42, scale: 2.6 },
      ],
      durationInFrames: 396,
    },

    // 02:50.36 → 02:56.48 — sol is the default model
    {
      layout: 'centered-quote',
      text: 'GPT-5.6 Sol is the main model in standard ChatGPT conversations.',
      durationInFrames: 183,
    },

    // 02:56.48 → 03:06.84 — sol use cases
    {
      layout: 'label-title-body',
      label: 'GPT-5.6 Sol',
      title: 'Built for Demanding Work',
      body: ['Coding, research, science', 'Data analysis, computer use', 'Cybersecurity & design'],
      durationInFrames: 311,
    },

    // 03:06.84 → 03:13.24 — sol pro intro
    {
      layout: 'label-title-body',
      label: 'GPT-5.6 Sol Pro',
      title: 'Highest-Capability Option',
      body: ['Hardest questions, longer-running workflows'],
      durationInFrames: 192,
    },

    // 03:13.24 → 03:19.86 — sol pro usage
    {
      layout: 'centered-quote',
      text: 'Deeper reasoning. Stronger structure. Greater confidence.',
      durationInFrames: 199,
    },

    // 03:19.86 → 03:21.36 — the old video hasn't visually cut to "Privacy & Data Use" yet
    // here, it's still lingering on the stale "GPT-5.5 Pro" card — whited out.
    {
      layout: 'video-clip',
      videoSrc: 'video/day1-chatgpt-intro.mp4',
      videoStartTime: 183.540,
      durationInFrames: 45,
      whiteoutBox: { top: 150, left: 60, width: 1260, height: 320 },
    },

    // 03:21.36 → 03:54.56 — privacy & data use, real footage from the original video
    {
      layout: 'video-clip',
      videoSrc: 'video/day1-chatgpt-intro.mp4',
      videoStartTime: 185.040,
      durationInFrames: 996,
    },

    // 03:54.56 → 04:01.02 — plans & pricing heading
    {
      layout: 'label-title-body',
      label: 'CHATGPT',
      title: 'Plans & Pricing',
      body: ['Free, Go, Plus, Pro, Business & Enterprise'],
      durationInFrames: 194,
    },

    // 04:01.02 → 04:19.58 — free
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Free',
      body: [
        'Limited GPT-5.5 Instant access',
        'Web search, files, data analysis, image gen, GPTs',
        'Falls back to Instant Mini at limit',
      ],
      bodyTimings: [0, 168, 435],
      durationInFrames: 556,
    },

    // 04:19.58 → 04:35.56 — go
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Go ($8/mo)',
      body: [
        'More messages, uploads, image gen',
        'Data analysis, memory',
        'Larger context window than Free',
      ],
      bodyTimings: [0, 123, 298],
      durationInFrames: 480,
    },

    // 04:35.56 → 04:52.02 — plus
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Plus ($20/mo)',
      body: [
        'Higher limits, advanced reasoning, faster responses',
        'Voice, image gen, file analysis, Deep Research',
        'Agent mode, custom GPTs, expanded Codex',
      ],
      bodyTimings: [0, 206, 339],
      durationInFrames: 494,
    },

    // 04:52.02 → 05:07.92 — pro
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Pro',
      body: [
        '$100/mo: 5x Plus usage',
        '$200/mo: 20x Plus usage',
        'Most advanced models & tools',
      ],
      bodyTimings: [0, 247, 348],
      durationInFrames: 477,
    },

    // 05:07.92 → 05:19.64 — business & enterprise features
    {
      layout: 'label-title-body',
      label: 'Plans',
      title: 'Business & Enterprise',
      body: [
        'Shared workspaces, admin controls, governance',
        'Company knowledge, shared projects, agents, apps',
        'Organizational permissions',
      ],
      bodyTimings: [0, 189, 294],
      durationInFrames: 351,
    },

    // 05:19.64 → 05:30.28 — business vs. enterprise pricing
    {
      layout: 'label-title-body',
      label: 'Pricing',
      title: 'Business vs. Enterprise',
      body: [
        'Business: $25/user/mo ($20 annual, min. 2 users)',
        'Enterprise: custom pricing',
      ],
      bodyTimings: [0, 234],
      durationInFrames: 319,
    },

  ],
};
