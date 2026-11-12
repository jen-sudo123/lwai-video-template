import { VideoData } from '../scenes/types';

// AI for Email
// Audio: audio/AiEmail.mp3 (ElevenLabs v4, Daan, take A, 275-interruptions line cut) — 199.76s.
// Script: AiEmail.script.txt. Word timings: AiEmail.transcript.json (Scribe, post-cut).
// Scene boundaries = start of the first word of each beat; reveals anchored to the word each card names.
//
//  #  scene                                   | VO start | frame | dur
//  1  Hook: email is time-consuming           |   0.00   |    0  |  137
//  2  Stat: 117 emails a day                  |   4.56   |  137  |  252
//  3  Email is where work happens             |  12.98   |  389  |  328
//  4  Three characteristics                   |  23.90   |  717  |  286
//  5  Volume / repetitive / cognitive         |  33.42   | 1003  |  868
//  6  Where modern AI excels                  |  62.38   | 1871  |  537
//  7  What it's not                           |  80.26   | 2408  |  350
//  8  A thinking assistant in your inbox      |  91.94   | 2758  |  202
//  9  What it helps with                      |  98.66   | 2960  |  481
// 10  Benefits compound                       | 114.70   | 3441  |  203
// 11  Two ways                                | 121.46   | 3644  |  191
// 12  In your inbox vs core AI platform       | 127.82   | 3835  | 1272
// 13  Higher-stakes emails                    | 170.22   | 5107  |  465
// 14  Takeaway                                | 185.74   | 5572  |  470
//                                                          total  6042 (201.4s)

export const aiEmail: VideoData = {
  audioSrc: 'audio/AiEmail.mp3',
  scenes: [
    // 1 — "Email remains one of the most time-consuming parts of modern work."
    {
      layout: 'big-statement',
      label: 'AI FOR EMAIL',
      text: 'Email is one of the most time-consuming parts of modern work.',
      highlight: 'time-consuming',
      animation: 'kinetic',
      durationInFrames: 137,
    },

    // 2 — "According to Microsoft's Work Trend Index, the average knowledge worker now receives 117 emails a day."
    {
      layout: 'stat-hero',
      label: 'MICROSOFT WORK TREND INDEX 2025',
      stat: '117',
      unit: 'emails a day',
      context: 'Received by the average knowledge worker.',
      contextTiming: 89,
      durationInFrames: 252,
    },

    // 3 — "And for many of us, email isn't just messaging. It's where decisions are made, work is
    //      coordinated, priorities are clarified, and often where accountability lives."
    {
      layout: 'checklist-slide',
      label: 'WHERE WORK HAPPENS',
      title: 'Email isn’t just messaging.',
      items: [
        'Decisions are made',
        'Work is coordinated',
        'Priorities are clarified',
        'Accountability lives',
      ],
      itemTimings: [110, 148, 194, 274],
      accentIndex: 3,
      durationInFrames: 328,
    },

    // 4 — "This is why email is such a powerful place to introduce AI. It has three characteristics
    //      that make it an unusually strong AI use case."
    {
      layout: 'big-statement',
      label: 'WHY EMAIL',
      text: 'Three reasons email is an unusually strong AI use case.',
      highlight: 'strong AI use case',
      animation: 'kinetic',
      durationInFrames: 286,
    },

    // 5 — "First, it's high volume... Second, it's highly repetitive... And third, it's primarily
    //      cognitive work. Reading, interpreting intent, deciding what matters, choosing a response,
    //      and translating it into a clear message."
    {
      layout: 'three-mode-columns',
      label: 'THREE CHARACTERISTICS',
      title: 'What makes email ideal for AI',
      columns: [
        { label: '01', title: 'High volume', body: ['The sheer number of messages', 'Constant cognitive load'] },
        { label: '02', title: 'Highly repetitive', body: ['Requests, updates, clarifications', 'Follow-ups and status checks'] },
        { label: '03', title: 'Cognitive work', body: ['Read, interpret, decide', 'Turn it into a clear message'] },
      ],
      highlights: [
        { from: 0, value: 0 },
        { from: 208, value: 1 },
        { from: 543, value: 2 },
      ],
      durationInFrames: 868,
    },

    // 6 — "Those are precisely the areas where modern AI performs extremely well. AI can read and
    //      synthesize large amounts of text quickly. It can extract intent from messy or incomplete
    //      inputs, and help you move from information to action faster..."
    {
      layout: 'label-title-body',
      label: 'WHY AI FITS',
      title: 'Exactly where modern AI excels.',
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'lightbulb', 'bolt'],
      body: [
        'Read and synthesize: Large amounts of text, quickly.',
        'Extract intent: Even from messy or incomplete inputs.',
        'Move to action: From information to action, faster.',
      ],
      bodyTimings: [176, 279, 396],
      durationInFrames: 537,
    },

    // 7 — "So this is an important shift in how to think about AI for email. It's not about sending
    //      emails for you, replacing your judgment or relationships, or automating your communication."
    {
      layout: 'label-title-body',
      label: 'THE SHIFT',
      title: 'What AI for email is not about.',
      bodyRight: true,
      bodyXList: true,
      body: [
        'Sending emails for you',
        'Replacing your judgment or relationships',
        'Automating your communication',
      ],
      bodyTimings: [155, 210, 291],
      durationInFrames: 350,
    },

    // 8 — "It's about having a thinking assistant inside your inbox that significantly reduces your cognitive load."
    {
      layout: 'big-statement',
      label: 'WHAT IT IS',
      text: 'A thinking assistant inside your inbox.',
      highlight: 'thinking assistant',
      animation: 'kinetic',
      durationInFrames: 202,
    },

    // 9 — "It can help you understand long or complex threads... Draft a clear first response...
    //      And adjust the tone to the context: direct, diplomatic, concise, or detailed."
    {
      layout: 'label-title-body',
      label: 'HOW IT HELPS',
      title: 'Less cognitive load, faster replies.',
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'pencil', 'sliders'],
      body: [
        'Understand threads: Long or complex, without rereading everything.',
        'Draft a first response: Instead of starting from a blank page.',
        'Adjust the tone: Direct, diplomatic, concise or detailed.',
      ],
      bodyTimings: [23, 155, 291],
      durationInFrames: 481,
    },

    // 10 — "And those benefits compound when you use it for recurring email types, like status updates or approvals."
    {
      layout: 'label-title-body',
      label: 'COMPOUNDING VALUE',
      title: 'The benefits compound on recurring emails.',
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['clock', 'check'],
      body: ['Status updates: The same update, week after week.', 'Approvals: A recurring request, handled faster.'],
      bodyTimings: [127, 163],
      durationInFrames: 203,
    },

    // 11 — "Now, you'll see AI for email show up in two main ways, and it's helpful to understand the difference."
    {
      layout: 'big-statement',
      label: 'TWO APPROACHES',
      text: 'AI for email shows up in two main ways.',
      highlight: 'two main ways',
      animation: 'kinetic',
      durationInFrames: 191,
    },

    // 12 — "First, there's AI that lives directly inside your inbox... Second, there's using a core AI
    //       platform like ChatGPT or Claude... stepping out of the inbox to think more deliberately."
    {
      layout: 'split-contrast',
      leftLabel: 'INSIDE YOUR INBOX',
      leftTitle: 'Gemini in Gmail, Copilot in Outlook',
      leftBodies: [
        'Fits the flow of work',
        'Reads whole threads and context',
        'Summarizes and suggests replies',
        'No switching tools',
      ],
      leftBodyTimings: [361, 433, 561, 714],
      rightLabel: 'CORE AI PLATFORM',
      rightTitle: 'ChatGPT or Claude',
      rightBodies: [
        'Paste emails or connect your inbox',
        'Similar capabilities',
        'Step out to think more deliberately',
      ],
      rightBodyTimings: [925, 1044, 1168],
      dividerLabel: 'or',
      highlights: [
        { from: 0, value: 'left' },
        { from: 766, value: 'right' },
      ],
      durationInFrames: 1272,
    },

    // 13 — "That's especially useful for higher-stakes emails: clarifying a complex situation, drafting a
    //       sensitive response, or thinking through implications... pull in documents, or run a web search or deep research."
    {
      layout: 'checklist-slide',
      label: 'WHEN TO STEP OUT',
      title: 'Higher-stakes emails.',
      items: [
        'Clarifying a complex situation',
        'Drafting a sensitive response',
        'Thinking through implications',
        'Pulling in documents or research',
      ],
      itemTimings: [102, 170, 240, 348],
      durationInFrames: 465,
    },

    // 14 — "Across both approaches, the value of AI in email isn't just as a writing assistant. It's about
    //       offloading repetitive cognitive work, and having a thinking partner in your inbox. And that's
    //       the capability we're learning to apply here."
    {
      layout: 'takeaway-stack',
      label: 'THE TAKEAWAY',
      title: 'More than a writing assistant',
      takeaways: [
        { kicker: 'Offload', text: 'Repetitive cognitive work.' },
        { kicker: 'Think', text: 'With a partner inside your inbox.' },
      ],
      timings: [183, 274],
      durationInFrames: 470,
    },
  ],
};
