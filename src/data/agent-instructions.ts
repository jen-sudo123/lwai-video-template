import { VideoData } from '../scenes/types';

// Your Agent Needs More Than a Job Description: turning the Agent Build Plan
// into CODO instructions (Character, Objective, Do's & Don'ts, Output), using
// the Agent Instructions Builder prompt to surface tacit knowledge.
// Audio: audio/agent-instructions.mp3 — ElevenLabs TTS (288.9s), pre-padded
// with 2.0s of silence for audioStartFrame 60. Unpadded original sits at
// audio/agent-instructions.orig.mp3; word timestamps (ElevenLabs Scribe, run
// on the unpadded original) in agent-instructions.transcript.json.
// Scene cuts sit in the pauses between sentences. Local frame =
// round((word_t - scene_start_s) * 30).
//
//  #  layout                      VO start → end (s)
//  0  title-card-green              [2s silent lead-in]
//  1  big-statement                 0.00 →   6.70
//  2  big-statement                 6.70 →  11.40
//  3  big-statement                11.40 →  18.80
//  4  label-title-body (cards)     18.80 →  27.30
//  5  big-statement                27.30 →  31.30
//  6  split-contrast               31.30 →  42.80
//  7  big-statement                42.80 →  46.90
//  8  big-statement                46.90 →  52.00
//  9  label-title-body (cards)     52.00 →  60.90
// 10  build-plan-codo-diagram      60.90 → 102.50
// 11  big-statement               102.50 → 107.90
// 12  centered-quote              107.90 → 114.00
// 13  label-title-body (cards)    114.00 → 120.20
// 14  split-contrast              120.20 → 126.60
// 15  big-statement               126.60 → 137.00
// 16  title-slide-transition      137.00 → 144.20
// 17  label-title-body (cards)    144.20 → 152.30
// 18  process-steps               152.30 → 161.45
// 19  split-contrast              161.45 → 172.40
// 20  checklist-slide             172.40 → 185.90
// 21  split-contrast              185.90 → 192.90
// 22  title-slide-transition      192.90 → 198.60
// 23  centered-quote              198.60 → 206.20
// 24  big-statement               206.20 → 209.60
// 25  label-title-body (cards)    209.60 → 219.80
// 26  big-statement               219.80 → 225.50
// 27  big-statement               225.50 → 231.30
// 28  split-contrast              231.30 → 237.30
// 29  title-slide-transition      237.30 → 242.40
// 30  label-title-body (cards)    242.40 → 248.60
// 31  big-statement               248.60 → 252.00
// 32  checklist-slide             252.00 → 260.70
// 33  split-contrast              260.70 → 272.20
// 34  process-steps               272.20 → 278.70
// 35  big-statement               278.70 → 290.00
//                         Total: 8760 frames (292.0s)

export const agentInstructions: VideoData = {
  audioSrc: 'audio/agent-instructions.mp3',
  audioStartFrame: 60,
  scenes: [
    // 0 — Title card (silent)
    {
      layout: 'title-card-green',
      title: 'Your Agent Needs More Than a Job Description',
      label: 'AGENT INSTRUCTIONS',
      durationInFrames: 60,
    },

    // 1 — VO: "You've now created your first agent. But before we start
    //     filling in its instructions, reflect on this:"
    {
      layout: 'big-statement',
      label: 'YOUR FIRST AGENT',
      text: 'Before filling in its instructions, reflect on this.',
      highlight: 'reflect on this.',
      durationInFrames: 201,
    },

    // 2 — VO: "prompting AI is a lot like delegating work to a capable colleague."
    {
      layout: 'big-statement',
      text: 'Prompting AI is a lot like delegating work to a capable colleague.',
      highlight: 'delegating work',
      durationInFrames: 141,
    },

    // 3 — VO: "You wouldn't just tell someone to 'prepare our weekly report' and
    //     expect them to automatically know exactly how you want it done."
    {
      layout: 'big-statement',
      label: "YOU WOULDN'T JUST SAY",
      text: '"Prepare our weekly report."',
      highlight: 'weekly report',
      durationInFrames: 222,
    },

    // 4 — VO: "You'd explain the context, what you're trying to achieve, how
    //     you'd approach the work, what to watch out for, and what a great
    //     result looks like."
    {
      layout: 'label-title-body',
      label: 'GOOD DELEGATION',
      title: "What You'd Explain",
      body: [
        'The context',
        "What you're trying to achieve",
        "How you'd approach the work",
        'What to watch out for',
        'What a great result looks like',
      ],
      bodyTimings: [23, 58, 106, 154, 200],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['eye', 'star', 'compare', 'x', 'check'],
      durationInFrames: 255,
    },

    // 5 — VO: "Well, with agents, that becomes even more important"
    {
      layout: 'big-statement',
      label: 'WITH AGENTS',
      text: 'That becomes even more important.',
      highlight: 'even more important.',
      durationInFrames: 120,
    },

    // 6 — VO: "because we're not just asking AI to produce a single answer
    //     anymore. We're giving it responsibility for carrying work forward,
    //     potentially making decisions and taking actions along the way,"
    {
      layout: 'split-contrast',
      leftLabel: 'NOT JUST',
      leftTitle: 'Producing a single answer',
      rightLabel: 'WITH AGENTS',
      rightTitle: 'Carrying work forward',
      rightBodies: ['Potentially making decisions', 'Taking actions along the way'],
      rightBodyTimings: [251, 287],
      highlights: [
        { from: 0, value: 'left' },
        { from: 131, value: 'right' },
      ],
      durationInFrames: 345,
    },

    // 7 — VO: "and that's why we need to give it more than a simple job description."
    {
      layout: 'big-statement',
      text: 'Give it more than a simple job description.',
      highlight: 'more than',
      durationInFrames: 123,
    },

    // 8 — VO: "Fortunately, you've already done most of the hard thinking in
    //     your agent build plan."
    {
      layout: 'big-statement',
      label: 'FORTUNATELY',
      text: "You've already done the hard thinking in your Agent Build Plan.",
      highlight: 'Agent Build Plan.',
      durationInFrames: 153,
    },

    // 9 — VO: "Now we'll turn that plan into detailed instructions using CODO,
    //     and we'll let AI help us uncover any important details we might
    //     have missed."
    {
      layout: 'label-title-body',
      label: 'WHAT COMES NEXT',
      title: 'From Plan To Instructions',
      body: ['Turn your plan into detailed CODO instructions', 'Let AI uncover details you might have missed'],
      bodyTimings: [98, 146],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'sparkles'],
      durationInFrames: 267,
    },

    // 10 — VO: "Let's quickly connect the two. In section one ... character and
    //      objective. In section two ... And in sections three and four ...
    //      dos and don'ts. Finally, section five ... the output. So we already
    //      have most of the ingredients."
    // ON SCREEN (brief): five Build Plan sections left, CODO's four
    // components appearing one by one on the right.
    {
      layout: 'build-plan-codo-diagram',
      // "section one" 63.02, "section two" 73.86, "sections three" 79.04, "section five" 91.74
      sectionFrames: [64, 389, 544, 925],
      // "character" 71.88, "objective" 72.60, "dos" 89.28, "output" 98.82 (~8f lead)
      codoFrames: [321, 343, 843, 1130],
      // "So we already have most of the ingredients" 99.88
      allFrame: 1169,
      durationInFrames: 1248,
    },

    // 11 — VO: "But here's where things get interesting. Your build plan is
    //      deliberately high level."
    {
      layout: 'big-statement',
      label: "HERE'S WHERE IT GETS INTERESTING",
      text: 'Your Build Plan is deliberately high-level.',
      highlight: 'high-level.',
      durationInFrames: 162,
    },

    // 12 — VO: "It doesn't necessarily include all the knowledge and experience
    //      you use when you perform this work yourself."
    {
      layout: 'centered-quote',
      text: "It doesn't include all the knowledge and experience you use when you do this work yourself.",
      highlight: 'knowledge and experience',
      durationInFrames: 183,
    },

    // 13 — VO: "For example, my team follow-up agent needs to compare meeting
    //      commitments with an existing action tracker."
    {
      layout: 'label-title-body',
      label: 'EXAMPLE',
      title: 'Team Follow-Up Agent',
      body: ['Meeting commitments', 'Compared with an existing action tracker'],
      bodyTimings: [104, 139],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['chat-bubble-left-right', 'compare'],
      durationInFrames: 186,
    },

    // 14 — VO: "But how does it recognize when two commitments are actually the
    //      same task, even when they're worded differently?"
    // Illustrative wording: the same task phrased two ways.
    {
      layout: 'split-contrast',
      leftLabel: 'IN THE MEETING',
      leftTitle: '"Taylor will get the customer update out by Friday"',
      rightLabel: 'IN THE TRACKER',
      rightTitle: '"Customer update email (Taylor)"',
      dividerLabel: '≈',
      equal: true,
      rightLightUpFrame: 58,
      durationInFrames: 192,
    },

    // 15 — VO: "That's the kind of judgment I might make automatically without
    //      ever thinking to explain it, and that's exactly the knowledge we
    //      want to capture before we give this work to an agent."
    {
      layout: 'big-statement',
      animation: 'fade',
      text: 'Judgment you make automatically\nis exactly the knowledge to capture.',
      highlight: 'knowledge to capture.',
      lineTimings: [0, 161],
      durationInFrames: 312,
    },

    // 16 — Section: Use AI to Build Your Instructions
    // VO: "Now, you could take your build plan and write all those CODO
    //      instructions yourself, but there's a much easier way."
    {
      layout: 'title-slide-transition',
      label: 'THERE’S AN EASIER WAY',
      text: 'Use AI to Build Your Instructions',
      centered: true,
      durationInFrames: 216,
    },

    // 17 — VO: "You can use AI to help you do it. We've prepared an agent
    //      instructions builder prompt that you'll find in the exercise below
    //      this video."
    {
      layout: 'label-title-body',
      label: 'USE AI TO HELP YOU',
      title: 'Agent Instructions Builder',
      body: ['A ready-made prompt', 'In the exercise below this video'],
      bodyTimings: [98, 183],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sparkles', 'pencil'],
      durationInFrames: 243,
    },

    // 18 — VO: "Simply give AI our prompt, along with your completed agent
    //      build plan, and let it help you turn that plan into detailed CODO
    //      instructions."
    {
      layout: 'process-steps',
      label: 'HOW IT WORKS',
      title: 'From Plan to CODO',
      horizontal: true,
      cardStyle: true,
      steps: [
        { title: 'Our prompt', body: 'The Agent Instructions Builder' },
        { title: 'Your Build Plan', body: 'Completed, all five sections' },
        { title: 'CODO instructions', body: 'Detailed, built with AI' },
      ],
      stepTimings: [45, 83, 218],
      durationInFrames: 275,
    },

    // 19 — VO: "And it's important to note that we're not simply asking AI to
    //      make our build plan longer. We're asking it to help us uncover the
    //      knowledge and experience that we might have forgotten to include."
    {
      layout: 'split-contrast',
      leftLabel: 'NOT',
      leftTitle: 'Make the Build Plan longer',
      rightLabel: 'BUT',
      rightTitle: 'Uncover what you forgot to include',
      highlights: [
        { from: 0, value: 'left' },
        { from: 160, value: 'right' },
      ],
      durationInFrames: 328,
    },

    // 20 — VO: "So before writing the final instructions, the AI will ask you
    //      a few questions about how you approach the work, make decisions,
    //      handle exceptions, and recognize a good result, and that's where
    //      the real value comes in."
    {
      layout: 'checklist-slide',
      label: 'AI WILL ASK',
      title: 'A Few Questions',
      titleHighlight: 'Questions',
      items: [
        'How you approach the work',
        'How you make decisions',
        'How you handle exceptions',
        'How you recognize a good result',
      ],
      itemTimings: [154, 200, 234, 277],
      durationInFrames: 405,
    },

    // 21 — VO: "Because AI shouldn't invent how your workflow operates, it
    //      should help you explain how you want it to operate."
    {
      layout: 'split-contrast',
      leftLabel: "AI SHOULDN'T",
      leftTitle: 'Invent how your workflow operates',
      rightLabel: 'AI SHOULD',
      rightTitle: 'Help you explain how you want it to operate',
      highlights: [
        { from: 0, value: 'left' },
        { from: 110, value: 'right' },
      ],
      durationInFrames: 210,
    },

    // 22 — Section: Uncovering Your Tacit Knowledge
    // VO: "Let's look at what that might mean for our example agent. Take our
    //      team follow-up agent as an example."
    {
      layout: 'title-slide-transition',
      label: 'EXAMPLE: TEAM FOLLOW-UP AGENT',
      text: 'Uncovering Your Tacit Knowledge',
      centered: true,
      durationInFrames: 171,
    },

    // 23 — VO: "The build plan says the agent should identify possible
    //      duplicates when comparing meeting commitments with an existing
    //      action tracker."
    {
      layout: 'centered-quote',
      text: '"Identify possible duplicates when comparing meeting commitments with the existing action tracker."',
      attribution: 'The Build Plan',
      highlight: 'possible duplicates',
      durationInFrames: 228,
    },

    // 24 — VO: "But what exactly makes two commitments duplicates?"
    {
      layout: 'big-statement',
      text: 'What exactly makes two commitments duplicates?',
      highlight: 'duplicates?',
      durationInFrames: 102,
    },

    // 25 — VO: "Perhaps you compare the substance of the task and its owner
    //      rather than looking for identical wording, and if the deadline
    //      changes, you'd consider that an update, not a new task."
    {
      layout: 'label-title-body',
      label: 'YOUR UNWRITTEN RULES',
      title: 'What Makes a Duplicate',
      body: ['Same task and owner: Not identical wording', 'Deadline changed: An update, not a new task'],
      bodyTimings: [21, 178],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['compare', 'clock'],
      durationInFrames: 306,
    },

    // 26 — VO: "That's something you might do almost automatically, but your
    //      agent needs that judgment explained."
    {
      layout: 'big-statement',
      animation: 'fade',
      text: 'You do it automatically.\nYour agent needs it explained.',
      highlight: 'explained.',
      lineTimings: [0, 85],
      durationInFrames: 171,
    },

    // 27 — VO: "This is the real value of the exercise: making your tacit
    //      knowledge explicit."
    {
      layout: 'big-statement',
      label: 'THE REAL VALUE',
      text: 'Make your tacit knowledge explicit.',
      highlight: 'explicit.',
      durationInFrames: 174,
    },

    // 28 — VO: "AI can help you uncover those rules, but you need to confirm
    //      they're actually how you want the work done."
    {
      layout: 'split-contrast',
      leftLabel: 'AI',
      leftTitle: 'Helps uncover the rules',
      rightLabel: 'YOU',
      rightTitle: 'Confirm how you want the work done',
      highlights: [
        { from: 0, value: 'left' },
        { from: 78, value: 'right' },
      ],
      durationInFrames: 180,
    },

    // 29 — Section: Review Your CODO Instructions
    // VO: "Once you've answered the questions, AI can generate your complete
    //      CODO instructions."
    {
      layout: 'title-slide-transition',
      label: 'AI GENERATES THE FULL SET',
      text: 'Review Your CODO Instructions',
      centered: true,
      durationInFrames: 153,
    },

    // 30 — VO: "You'll have a clear character, an objective, detailed dos and
    //      don'ts, and a defined output."
    {
      layout: 'label-title-body',
      label: 'WHAT YOU GET',
      title: 'Complete CODO Instructions',
      body: ['A clear Character', 'An Objective', "Detailed Do's and Don'ts", 'A defined Output'],
      bodyTimings: [23, 58, 92, 151],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'star', 'sliders', 'check'],
      durationInFrames: 186,
    },

    // 31 — VO: "But before using them, review everything carefully."
    {
      layout: 'big-statement',
      label: 'BEFORE YOU USE THEM',
      text: 'Review everything carefully.',
      highlight: 'carefully.',
      durationInFrames: 102,
    },

    // 32 — VO: "Has AI introduced assumptions you haven't confirmed? Are
    //      important decision rules missing? Are the human responsibilities
    //      and boundaries clear?"
    {
      layout: 'checklist-slide',
      label: 'REVIEW',
      title: 'Check For Gaps',
      titleHighlight: 'Gaps',
      items: [
        "Assumptions you haven't confirmed?",
        'Important decision rules missing?',
        'Human responsibilities and boundaries clear?',
      ],
      itemTimings: [8, 106, 176],
      durationInFrames: 261,
    },

    // 33 — VO: "Remember, these instructions tell your agent how to work. They
    //      don't automatically give it access to systems or configure
    //      technical permissions. You need to set up those capabilities
    //      separately."
    {
      layout: 'split-contrast',
      leftLabel: 'INSTRUCTIONS DO',
      leftTitle: 'Tell your agent how to work',
      rightLabel: "INSTRUCTIONS DON'T",
      rightTitle: 'Give access or set permissions',
      rightBodies: ['Set up those capabilities separately'],
      rightBodyTimings: [271],
      highlights: [
        { from: 0, value: 'left' },
        { from: 123, value: 'right' },
      ],
      durationInFrames: 345,
    },

    // 34 — VO: "So take your completed build plan, use our provided prompt,
    //      answer the questions, and refine the result."
    {
      layout: 'process-steps',
      label: 'YOUR NEXT STEP',
      title: 'Build Your Agent Instructions',
      horizontal: true,
      cardStyle: true,
      steps: [
        { title: 'Take your Build Plan', body: 'Completed' },
        { title: 'Use our prompt', body: 'In the exercise below' },
        { title: 'Answer the questions', body: 'Share how you work' },
        { title: 'Refine the result', body: 'Review and adjust' },
      ],
      stepTimings: [19, 73, 120, 154],
      durationInFrames: 195,
    },

    // 35 — VO: "You'll now have something much more useful than a simple job
    //      description, a clear set of instructions based on your own
    //      experience for how your agent should carry the work forward."
    {
      layout: 'big-statement',
      animation: 'fade',
      text: 'More than a job description.\nClear instructions, based on your own experience.',
      highlight: 'your own experience.',
      lineTimings: [0, 124],
      durationInFrames: 339,
    },
  ],
};
