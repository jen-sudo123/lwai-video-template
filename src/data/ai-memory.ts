import { VideoData } from '../scenes/types';

// AI Memory
// Audio: ai-memory.wav — 221.22s total. Scenes aligned to Whisper-extracted
// timestamps, cut at natural pauses so the visual never interrupts mid-sentence.
//
//  scene                                                        | VO start | end     | dur (frames @30fps)
//  --------------------------------------------------------------|----------|---------|--------------------
//  1  title card (silent intro)                                  |  0.00    |  7.46   |  224
//  2  HOOK — what memory can carry forward                       |  7.46    | 17.16   |  291
//  3  "That's the role of memory."                                | 17.16    | 19.14   |   59
//  4  Custom instructions vs. memory (intro contrast)              | 19.14    | 29.46   |  310
//  5  "So how does that actually work?"                            | 30.34    | 33.64   |   99
//  6  Myth vs. reality (retraining vs. context layer)               | 33.64    | 48.58   |  448
//  7  "A memory process can identify useful information."           | 49.28    | 56.12   |  205
//  8  For example — three things memory might notice (card layout)  | 56.12    | 73.78   |  530
//  9  The process, combined: transition line + 4-step diagram       | 73.78    | 87.94   |  425
//  11 It retrieves only what's relevant + evolving context (merged) | 87.94    | 103.94  |  480
//  13 "So why does that matter?"                                    | 103.94   | 105.90  |   59
//  14 "The biggest benefit is continuity."                          | 105.90   | 109.36  |  104
//  15 The continuity example (market expansion)                     | 109.36   | 123.94  |  437
//  16 "Memory understands what already happened."                   | 123.94   | 131.30  |  221
//  17 "The risk: a persistent assumption."                           | 131.30   | 137.88  |  197
//  18 Stale-memory example (cost reduction -> growth)                | 137.88   | 145.90  |  241
//  19 "Personalized to outdated context."                            | 145.90   | 154.82  |  268
//  20 More relevant vs. not more correct                             | 154.82   | 164.58  |  293
//  21 Three habits worth building                                    | 164.58   | 202.02  | 1123
//  22 Final contrast, combined (distinction / custom instructions vs.  | 202.02   | 221.22  |  622
//     memory / closing statement, folded into leftBody/rightBody)
//                                                                                total     6636

export const aiMemory: VideoData = {
  audioSrc: 'audio/ai-memory.wav',
  scenes: [
    // 1 — Title (silent intro 00:00 -> 00:07.46)
    {
      layout: 'title-card-green',
      label: 'PERSONALIZATION',
      title: 'AI Memory',
      durationInFrames: 224,
    },

    // 2 — HOOK (00:07.46 -> 00:17.16)
    // VO: "It might remember a project you've been discussing, a decision you made
    //      previously, or a change in priorities that came up along the way."
    {
      layout: 'label-title-body',
      label: 'THE SCENARIO',
      title: 'AI can remember more than you’d expect.',
      body: [
        'A project you’ve been discussing.',
        'A decision you made previously.',
        'A change in priorities along the way.',
      ],
      bodyTimings: [0, 104, 193],
      durationInFrames: 291,
    },

    // 3 — (00:17.16 -> 00:19.14)
    // VO: "That's the role of memory."
    {
      layout: 'centered-quote',
      text: 'That’s the role of memory.',
      highlight: 'memory',
      durationInFrames: 59,
    },

    // 4 — (00:19.14 -> 00:29.46)
    // VO: "While custom instructions are the context you deliberately give AI
    //      upfront, memory helps AI build an evolving understanding from your
    //      interactions over time."
    {
      layout: 'split-contrast',
      leftLabel: 'CUSTOM INSTRUCTIONS',
      leftTitle: 'The context you deliberately give AI upfront.',
      rightLabel: 'MEMORY',
      rightTitle: 'An evolving understanding built from your interactions over time.',
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 173, value: null },
      ],
      durationInFrames: 310,
    },

    // 5 — (00:30.34 -> 00:33.64)
    // VO: "So how does that actually work?"
    {
      layout: 'centered-quote',
      text: 'So how does that actually work?',
      durationInFrames: 99,
    },

    // 6 — (00:33.64 -> 00:48.58)
    // VO: "A common misconception is that AI is retraining itself on you every time
    //      you have a conversation. That's not usually what's happening. Instead,
    //      the system maintains a separate layer of context based on your previous
    //      interactions."
    {
      layout: 'split-contrast',
      leftLabel: 'THE MYTH',
      leftTitle: 'AI is retraining itself on you every conversation.',
      rightLabel: 'THE REALITY',
      rightTitle: 'It maintains a separate layer of context from your previous interactions.',
      highlights: [
        { from: 0, value: 'left' },
        { from: 197, value: null },
      ],
      durationInFrames: 448,
    },

    // 7 — (00:49.28 -> 00:56.12)
    // VO: "As you work with AI, a memory process can identify information that may
    //      be useful again."
    {
      layout: 'centered-quote',
      text: 'A memory process can identify information that may be useful again.',
      durationInFrames: 205,
    },

    // 8 — (00:56.12 -> 01:13.78)
    // VO: "For example, it might notice that you're evaluating a new market, that
    //      your team has already ruled out one option, or that a decision depends
    //      on a particular stakeholder. It can then organize that information into
    //      memory and update it as new information appears."
    {
      layout: 'label-title-body',
      label: 'FOR EXAMPLE',
      title: 'It organizes what might matter again.',
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['trending', 'x', 'user'],
      body: [
        'New market: Evaluating a new market.',
        'Ruled out: Your team already ruled one option out.',
        'Stakeholder: A decision depends on someone specific.',
      ],
      bodyTimings: [76, 181, 219],
      durationInFrames: 530,
    },

    // 9 — combined (01:13.78 -> 01:27.94)
    // VO: "So you can think of the process like this. You interact. AI identifies
    //      useful context. Memory evolves. And relevant memory is brought into
    //      future conversations."
    // Label/title appear immediately (during the "think of the process" line);
    // steps then appear on their original schedule, shifted +96f to account for
    // that lead-in.
    {
      layout: 'process-steps',
      label: 'THE PROCESS',
      title: 'How memory evolves.',
      steps: [
        { title: 'Interact', body: 'You work with AI.' },
        { title: 'Identify', body: 'AI notes useful context.' },
        { title: 'Evolve', body: 'Memory updates over time.' },
        { title: 'Recall', body: 'Relevant memory returns in future chats.' },
      ],
      stepTimings: [96, 151, 240, 304],
      activeTimings: [96, 151, 240, 304],
      horizontal: true,
      durationInFrames: 425,
    },

    // 11 — (01:27.94 -> 01:38.62)
    // VO: "Importantly, AI doesn't need to bring everything it remembers into every
    //      conversation. It can retrieve the context that appears relevant to what
    //      you're asking now."
    // Combined with the former scene 12: "Over time, this creates an evolving
    // working context around you and your work." — added as a second body
    // bullet, timed to when that sentence starts (01:38.62, relative +166).
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'AI doesn’t bring back everything it remembers.',
      body: [
        'It retrieves only what’s relevant to what you’re asking now.',
        'Over time, that becomes an evolving working context around you and your work.',
      ],
      bodyTimings: [166, 320],
      durationInFrames: 480,
    },

    // 13 — (01:43.94 -> 01:45.90)
    // VO: "So why does that matter?"
    {
      layout: 'centered-quote',
      text: 'So why does that matter?',
      durationInFrames: 59,
    },

    // 14 — (01:45.90 -> 01:49.36)
    // VO: "The biggest benefit is continuity."
    {
      layout: 'big-statement',
      label: 'THE BENEFIT',
      text: 'The biggest benefit is continuity.',
      highlight: 'continuity',
      durationInFrames: 104,
    },

    // 15 — (01:49.36 -> 02:03.94)
    // VO: "Imagine you've been discussing a market expansion across several
    //      conversations. You've explored different options, ruled some out and
    //      discussed new constraints. Later, you might simply ask, what should we
    //      do next?"
    {
      layout: 'label-title-body',
      label: 'THE CONTINUITY EXAMPLE',
      title: 'A market expansion, across many conversations.',
      body: [
        'You’ve explored different options.',
        'You’ve ruled some out.',
        'You’ve discussed new constraints.',
        'Later: “What should we do next?”',
      ],
      bodyTimings: [177, 223, 254, 324],
      durationInFrames: 437,
    },

    // 16 — (02:03.94 -> 02:11.30)
    // VO: "Memory can help AI understand what has already happened instead of
    //      treating that question as a completely new problem."
    {
      layout: 'centered-quote',
      text: 'Memory helps AI understand what has already happened — not treat it as a new problem.',
      durationInFrames: 221,
    },

    // 17 — (02:11.30 -> 02:17.88)
    // VO: "But that continuity also creates a risk. Memory can become a persistent
    //      assumption."
    {
      layout: 'big-statement',
      label: 'THE RISK',
      text: 'Memory can become a persistent assumption.',
      highlight: 'persistent assumption',
      durationInFrames: 197,
    },

    // 18 — (02:17.88 -> 02:25.90)
    // VO: "Imagine AI remembers that cost reduction is your priority. Three months
    //      later, your strategy changes to growth."
    {
      layout: 'split-contrast',
      leftLabel: '3 MONTHS AGO',
      leftTitle: 'Cost reduction is the priority.',
      rightLabel: 'TODAY',
      rightTitle: 'The strategy has changed to growth.',
      highlights: [
        { from: 0, value: 'left' },
        { from: 128, value: null },
      ],
      durationInFrames: 241,
    },

    // 19 — (02:25.90 -> 02:34.82)
    // VO: "If the old memory continues to influence its answers, the response may
    //      still feel personalized, but it's personalized to outdated context."
    {
      layout: 'centered-quote',
      text: 'The response may still feel personalized — but it’s personalized to outdated context.',
      highlight: 'outdated context',
      durationInFrames: 268,
    },

    // 20 — (02:34.82 -> 02:44.58)
    // VO: "That's why an important principle is memory can make AI more relevant.
    //      It does not automatically make AI more correct."
    {
      layout: 'split-contrast',
      leftLabel: 'MORE RELEVANT',
      leftTitle: 'Memory can make AI more relevant.',
      rightLabel: 'NOT MORE CORRECT',
      rightTitle: 'It does not automatically make AI more correct.',
      dividerLabel: 'but',
      highlights: [
        { from: 0, value: 'left' },
        { from: 176, value: null },
      ],
      durationInFrames: 293,
    },

    // 21 — (02:44.58 -> 03:22.02)
    // VO: "So there are three habits worth building. First, pay attention to what
    //      AI is carrying forward. When it references previous decisions, projects
    //      or priorities, check whether they're still accurate. Second, correct it
    //      when things change. Treat memory as evolving context, not a permanent
    //      record. And third, know when you want a fresh start. For a one-off
    //      task, a sensitive question, or when you want an independent
    //      perspective, you may want to use a temporary or non-personalized
    //      conversation where the platform supports it."
    {
      layout: 'checklist-slide',
      label: 'THREE HABITS',
      title: 'Build these three habits.',
      items: [
        'Pay attention to what’s carried forward.',
        'Correct it when things change.',
        'Know when you want a fresh start.',
      ],
      itemTimings: [106, 414, 650],
      durationInFrames: 1123,
    },

    // 22 — combined final scene (03:22.02 -> end 03:41.22)
    // VO: "The distinction to remember is simple. Custom instructions are what you
    //      intentionally tell AI about how to work with you. Memory is what AI
    //      learns and carries forward from working with you over time. One gives
    //      AI a starting point, the other builds continuity as you work
    //      together."
    // The "distinction is simple" line is carried by the contrast reveal itself
    // (left/right appear immediately) rather than a separate lead-in quote.
    {
      layout: 'split-contrast',
      leftLabel: 'CUSTOM INSTRUCTIONS',
      leftTitle: 'What you intentionally tell AI.',
      leftBody: 'Gives AI a starting point.',
      rightLabel: 'MEMORY',
      rightTitle: 'What AI learns and carries forward over time.',
      rightBody: 'Builds continuity as you work together.',
      dividerLabel: 'vs',
      leftBodyDelay: 408,
      rightBodyDelay: 544,
      highlights: [
        { from: 0, value: 'left' },
        { from: 261, value: null },
      ],
      durationInFrames: 622,
    },
  ],
};
