import { VideoData } from '../scenes/types';

// Personalization (Part 1): why generic AI needs setup, and the three layers
// that make it work like it knows you — custom instructions, memory, work context.
// Audio: audio/personalization-part1.wav
// Total audio duration: 113.22s => 3397 frames @ 30fps
// audioStartFrame: 60 (2s title card lead-in)
//
// Frame-accurate VO map (comp_frame = 60 + round(t*30)):
//    0  title-card-green        0     60     60    0.00 →  2.00  [title card]
//    1  big-statement          60    210    270    0.00 →  7.24  incredibly capable, knows nothing about you
//    2  label-title-body      270    210    480    7.24 → 14.44  what it doesn't know yet
//    3  centered-quote        480    240    720   14.44 → 22.24  learns like a new colleague, over time
//    4  label-title-body      720    345   1065   22.24 → 33.62  re-explaining yourself, every time
//    5  centered-quote       1065    240   1305   33.62 → 41.74  personalization comes in + more context = more useful
//    6  three-mode-columns   1305   1860   3165   41.74 → 103.74 three layers (deep dive, highlights advance)
//    7  label-title-body     3165    300   3465  103.74 → 112.14 availability depends on tool/plan/admin
//                                          ────
//                                   Total: 3465 frames (~115.5s, audio ends ~115.2s)

export const personalizationPart1: VideoData = {
  audioSrc: 'audio/personalization-part1.wav',
  audioStartFrame: 60,
  scenes: [
    // ── 00:00.00  title card (pre-VO) ──────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Personalization',
      label: 'TEACHING AI WHO YOU ARE',
      durationInFrames: 60,
    },

    // ── 00:00.00 → 00:07.24  opening hook ──────────────────────────────
    // VO: "When you first start using an AI tool, it's incredibly capable,
    //      but it still knows very little about you."
    {
      layout: 'big-statement',
      text: "AI is incredibly capable.\nBut it knows nothing about you.",
      highlight: 'knows nothing',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 210,
    },

    // ── 00:07.24 → 00:14.44  what it doesn't know yet ──────────────────
    // VO: "It doesn't know your role, the kinds of decisions that you make,
    //      who you typically communicate with, or how you prefer to work."
    {
      layout: 'label-title-body',
      label: '',
      title: '',
      body: [],
      diagram: 'personalization-gap',
      diagramTimings: [10, 50, 90, 130],
      imageFullScreen: true,
      durationInFrames: 210,
    },

    // ── 00:14.44 → 00:22.24  learns over time ──────────────────────────
    // VO: "You can teach it some of this over time, kind of like how a new
    //      colleague picks up on how you operate through repeated interactions."
    {
      layout: 'centered-quote',
      text: 'Like a new colleague, it learns, but only over time.',
      highlight: 'it learns, but only over time.',
      durationInFrames: 240,
    },

    // ── 00:22.24 → 00:33.62  re-explaining yourself ────────────────────
    // VO: "But in the meantime, you may find yourself re-explaining the same
    //      context over and over, like your role, or your audience, or your
    //      preferred tone, or how AI should work with you."
    {
      layout: 'label-title-body',
      label: 'THE FRICTION',
      labelSize: 32,
      title: 'Re-explaining Yourself, Every Time',
      body: ['Your role & audience', 'Your preferred tone', 'How AI should work with you'],
      bodyTimings: [167, 245, 281],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'chat-bubble-left-right', 'adjustments-horizontal'],
      durationInFrames: 345,
    },

    // ── 00:33.62 → 00:41.74  personalization comes in + more context ───
    // VO: "And that's exactly where personalization comes in. So the more
    //      relevant context AI has, the more useful it becomes."
    {
      layout: 'centered-quote',
      text: "That's exactly where personalization comes in.\nMore relevant context. More useful AI.",
      lineTimings: [0, 109],
      durationInFrames: 240,
    },

    // ── 00:41.74 → 01:43.74  three layers (deep dive) ──────────────────
    // VO: "And there are three important layers of personalization, which are
    //      custom instructions, memory, and work context." ... through to
    //      "...into something that works for you."
    // Highlights advance as the VO moves from one layer to the next, then
    // relight all three together for the closing "together, these..." line.
    {
      layout: 'three-mode-columns',
      label: 'THREE LAYERS',
      title: 'Three Layers of Personalization',
      columns: [
        {
          label: 'SET ON PURPOSE',
          title: 'Custom Instructions',
          body: ['What you tell AI about yourself', 'Applied to every conversation'],
        },
        {
          label: 'PICKED UP OVER TIME',
          title: 'Memory',
          body: ['Kept between conversations', 'Explicit asks + context it notices'],
        },
        {
          label: 'LIVE DATA',
          title: 'Work Context',
          body: ['Native tools, connectors, plugins', 'Email, calendar, chat, CRM'],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 257, value: 0 },
        { from: 745, value: 1 },
        { from: 1228, value: 2 },
        { from: 1656, value: null },
      ],
      durationInFrames: 1860,
    },

    // ── 01:43.74 → 01:52.14  availability ───────────────────────────────
    // VO: "Now, which layers you have available depends on your tool, your
    //      plan, and your administrator. So it is worth checking your
    //      settings or asking for support."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Not Every Layer Is Guaranteed',
      body: ['Depends on your tool, plan, and administrator', 'Check your settings, or ask for support'],
      bodyTimings: [30, 120],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'chat-bubble-left-right'],
      durationInFrames: 300,
    },
  ],
};
