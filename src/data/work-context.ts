import { VideoData } from '../scenes/types';

// Personalization (Part 3): Work Context — the third layer, completing the
// series after custom-instructions (personalization-part2) and memory
// (ai-memory). Explains connections/connectors, reusable workflows (Skills,
// Plugins, Gems, Agents), and the access/workflow/control framework for
// staying in control of what AI can reach and do.
// Audio: audio/work-context.wav — 230.09s total, recorded directly (not
// TTS — a stale ElevenLabs draft with a slightly longer script sits at
// public/audio/work-context.mp3 / .alignment.json from an earlier attempt
// and is unused here). Scenes aligned to Whisper-extracted timestamps, cut
// at natural pauses.
// audioStartFrame: 60 (2s title card lead-in)
//
// Frame-accurate VO map (comp_frame = 60 + round(t*30)):
//    0  title-card-green            0     60     60    0.00 →   2.00  [title card]
//    1  split-contrast (CI/Memory) 60    351    411    0.00 →  13.70  recap: two layers so far
//       — actually preceded by a short quote beat, see scenes below
//    ...full breakdown lives inline in the comments beside each scene.
//                                          ────
//                                   Total: 6963 frames (~232.1s)

export const workContext: VideoData = {
  audioSrc: 'audio/work-context.wav',
  audioStartFrame: 60,
  scenes: [
    // 0 — Title card (silent, 00:00 → 00:02.00)
    {
      layout: 'title-card-green',
      title: 'Work Context',
      label: 'THE THIRD LAYER OF PERSONALIZATION',
      durationInFrames: 60,
    },

    // 1 — (00:00.00 → 00:04.02)
    // VO: "So far, we've looked at two layers of personalization."
    {
      layout: 'centered-quote',
      text: "So far, we've looked at two layers of personalization.",
      durationInFrames: 121,
    },

    // 2 — (00:04.02 → 00:15.72)
    // VO: "Custom Instructions are what you deliberately tell AI about yourself
    //      and how you want it to work with you. Memory is what AI learns and
    //      carries forward from your interactions over time."
    // Work Context isn't named until later (scene 5), but shown here as a
    // third, dimmed card — foreshadowing the layer this video is about.
    {
      layout: 'three-mode-columns',
      label: 'PERSONALIZATION',
      title: '3 Layers of Personalization',
      columns: [
        {
          label: 'SET ON PURPOSE',
          title: 'Custom Instructions',
          body: ['What you deliberately tell AI about yourself', 'How you want it to work with you'],
        },
        {
          label: 'PICKED UP OVER TIME',
          title: 'Memory',
          body: ['What AI learns and carries forward', 'From your interactions over time'],
        },
        {
          label: 'COMING UP',
          title: 'Work Context',
          body: ['The third layer'],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 0, value: 0 },
        { from: 181, value: 1 },
      ],
      durationInFrames: 351,
    },

    // 3 — (00:15.72 → 00:20.16)
    // VO: "But most of your actual work doesn't live inside your AI
    //      conversations."
    {
      layout: 'big-statement',
      text: "Most of your actual work doesn't live inside your AI conversations.",
      highlight: 'actual work',
      durationInFrames: 133,
    },

    // 4 — (00:20.16 → 00:26.48)
    // VO: "It lives in your email, calendar, documents, messages, project
    //      tools, CRM, and other workplace systems."
    {
      layout: 'label-title-body',
      label: 'IT LIVES ELSEWHERE',
      title: 'Where Your Work Actually Is',
      body: ['Email & calendar', 'Documents & messages', 'Project tools, CRM & other systems'],
      bodyTimings: [23, 51, 87],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['chat-bubble-left-right', 'pencil', 'sliders'],
      durationInFrames: 189,
    },

    // 5 — (00:26.48 → 00:31.86)
    // VO: "This brings us to the third layer of personalization: Work Context."
    // Same three cards as scene 2, but now Work Context lights up.
    {
      layout: 'three-mode-columns',
      label: 'PERSONALIZATION',
      title: '3 Layers of Personalization',
      columns: [
        {
          label: 'SET ON PURPOSE',
          title: 'Custom Instructions',
          body: ['What you deliberately tell AI about yourself', 'How you want it to work with you'],
        },
        {
          label: 'PICKED UP OVER TIME',
          title: 'Memory',
          body: ['What AI learns and carries forward', 'From your interactions over time'],
        },
        {
          label: 'THE THIRD LAYER',
          title: 'Work Context',
          body: ['Bringing AI closer to where work happens'],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 0, value: 2 },
      ],
      durationInFrames: 162,
    },

    // 6 — (00:31.86 → 00:41.82)
    // VO: "Work Context extends AI beyond what you tell it, or what it learns
    //      about you, by bringing AI closer to the systems where your work
    //      actually happens."
    {
      layout: 'label-title-body',
      label: 'WORK CONTEXT',
      title: 'Bringing AI Closer To Where Work Happens',
      body: [
        'Beyond what you tell it, or what it learns about you',
        'Closer to the systems where your work actually happens',
      ],
      bodyTimings: [0, 147],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'compare'],
      durationInFrames: 299,
    },

    // 7 — (00:41.82 → 00:46.14)
    // VO: "Imagine you ask AI: 'Prepare me for my meeting with Acme tomorrow.'"
    {
      layout: 'centered-quote',
      text: '"Prepare me for my meeting with Acme tomorrow."',
      durationInFrames: 129,
    },

    // 8 — (00:46.14 → 00:49.30)
    // VO: "Without access to your work systems, you're still the middleman."
    {
      layout: 'big-statement',
      label: 'WITHOUT ACCESS',
      text: "You're still the middleman.",
      highlight: 'middleman',
      durationInFrames: 95,
    },

    // 9 — (00:49.30 → 00:57.42)
    // VO: "You check your calendar, search your inbox, find the latest
    //      documents, and bring all of that information into AI before it can
    //      start helping."
    {
      layout: 'label-title-body',
      label: 'STILL THE MIDDLEMAN',
      title: 'You Do The Legwork First',
      body: ['Check the calendar', 'Search the inbox', 'Find the latest documents', 'Bring it all to AI yourself'],
      bodyTimings: [4, 31, 58, 113],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['clock', 'eye', 'pencil', 'user'],
      bodyCardCompact: true,
      durationInFrames: 244,
    },

    // 10 — (00:57.42 → 01:04.28)
    // VO: "Connections change this. Depending on the platform, you might hear
    //      them called Connectors, Connected Apps, or simply connections."
    {
      layout: 'label-title-body',
      label: 'A NEW CAPABILITY',
      title: 'Connections Change This',
      body: ['Also called Connectors', 'Connected Apps', 'or simply Connections'],
      bodyTimings: [101, 126, 164],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'sparkles', 'compare'],
      bodyCardCompact: true,
      durationInFrames: 205,
    },

    // 11 — (01:04.28 → 01:13.60)
    // VO: "They create an authorized link between AI and another system, such
    //      as your email, calendar, cloud storage, workplace messages, or
    //      CRM."
    {
      layout: 'label-title-body',
      label: 'WHAT A CONNECTION IS',
      title: 'An Authorized Link To Another System',
      body: ['Email & calendar', 'Cloud storage', 'Workplace messages, or CRM'],
      bodyTimings: [123, 161, 193],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check', 'sliders', 'chat-bubble-left-right'],
      durationInFrames: 280,
    },

    // 12 — (01:13.60 → 01:21.76)
    // VO: "So now, you could ask: 'Prepare me for my meeting with Acme
    //      tomorrow. Find the relevant emails and documents, and summarize
    //      what I need to know.'"
    {
      layout: 'prompt-example',
      label: 'WITH WORK CONTEXT',
      title: 'The Same Ask — Now Something AI Can Act On',
      beforeLabel: 'WITHOUT ACCESS',
      before: '"Prepare me for my meeting with Acme tomorrow."',
      afterLabel: 'WITH ACCESS',
      after: '"...find the relevant emails and documents, and summarize what I need to know."',
      afterTiming: 111,
      durationInFrames: 245,
    },

    // 13 — (01:21.76 → 01:29.24)
    // VO: "Instead of bringing the context to AI yourself, AI can retrieve
    //      relevant information from the systems you've authorized it to
    //      access."
    {
      layout: 'centered-quote',
      text: 'AI retrieves relevant information from the systems you’ve authorized it to access.',
      highlight: 'retrieves relevant information',
      durationInFrames: 224,
    },

    // 14 — (01:29.24 → 01:38.04)
    // VO: "And some connections go further. They can allow AI to take
    //      actions, such as creating an event, updating a file, or
    //      interacting with another application."
    {
      layout: 'label-title-body',
      label: 'SOME CONNECTIONS GO FURTHER',
      title: 'They Can Take Action, Too',
      body: ['Creating an event', 'Updating a file', 'Interacting with another app'],
      bodyTimings: [118, 150, 188],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'pencil', 'sliders'],
      bodyCardCompact: true,
      durationInFrames: 264,
    },

    // 15 — (01:38.04 → 01:40.88)
    // VO: "But access alone isn't enough."
    {
      layout: 'big-statement',
      text: "Access alone isn't enough.",
      highlight: "isn't enough",
      durationInFrames: 85,
    },

    // 16 — (01:40.88 → 01:51.42)
    // VO: "Imagine AI can access thousands of documents in your Drive. It
    //      still needs to know which information matters, what steps to
    //      follow, and what a useful result looks like."
    {
      layout: 'label-title-body',
      label: 'ACCESS ISN’T UNDERSTANDING',
      title: 'It Still Needs To Know...',
      body: ['Which information matters', 'What steps to follow', 'What a useful result looks like'],
      bodyTimings: [147, 195, 239],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'sliders', 'check'],
      durationInFrames: 317,
    },

    // 17 — (01:51.42 → 01:54.62)
    // VO: "That's where reusable instructions and workflows come in."
    {
      layout: 'centered-quote',
      text: "That's where reusable instructions and workflows come in.",
      highlight: 'reusable instructions and workflows',
      durationInFrames: 96,
    },

    // 18+19 — (01:54.62 → 02:16.08)
    // VO: "Imagine preparing for customer meetings is something you do every
    //      week. Each time, you follow roughly the same process. Find the
    //      latest customer correspondence. Identify outstanding commitments
    //      and decisions. Review the latest account documents. Flag
    //      important risks. Then create a one-page briefing with the key
    //      points and questions to ask."
    // Combined into one scene: a static meeting-prep checklist illustration
    // whose 5 rows check off one by one as each step is named.
    {
      layout: 'meeting-checklist-diagram',
      itemTimings: [229, 305, 398, 464, 512],
      durationInFrames: 643,
    },

    // 20 — (02:16.08 → 02:25.58)
    // VO: "Instead of explaining that process every time, you can turn those
    //      steps into a reusable set of instructions that tells AI how to
    //      perform that workflow."
    {
      layout: 'big-statement',
      text: 'Turn the steps into reusable instructions.',
      highlight: 'reusable instructions',
      durationInFrames: 285,
    },

    // 21 — (02:25.58 → 02:27.80)
    // VO: "Different platforms package this differently."
    {
      layout: 'centered-quote',
      text: 'Different platforms package this differently.',
      durationInFrames: 67,
    },

    // 22 — (02:27.80 → 02:35.44)
    // VO: "You might use Skills and Plugins in ChatGPT, Skills in Claude,
    //      Gems in Gemini, or Agents in Microsoft Copilot."
    {
      layout: 'title-slide-transition',
      text: 'Same Idea, Different Names',
      label: 'ACROSS PLATFORMS',
      bodyRows: [
        { label: 'ChatGPT', prompt: 'Skills & Plugins' },
        { label: 'Claude', prompt: 'Skills, Connectors, Plugins' },
        { label: 'Gemini', prompt: 'Gems, Skills in Google Workflow' },
        { label: 'Microsoft Copilot', prompt: 'Agents, Skills' },
      ],
      bodyRowTimings: [18, 83, 121, 163],
      bodyRowsAsCards: true,
      durationInFrames: 229,
    },

    // 23 — (02:35.44 → 02:37.42)
    // VO: "But the principle is similar:"
    {
      layout: 'centered-quote',
      text: 'But the principle is similar.',
      durationInFrames: 60,
    },

    // 24 — (02:37.42 → 02:43.12)
    // VO: "give AI reusable instructions for how to perform the work with the
    //      context available to it."
    {
      layout: 'big-statement',
      text: 'Give AI reusable instructions for how to perform the work.',
      highlight: 'reusable instructions',
      durationInFrames: 171,
    },

    // 25 — (02:43.12 → 02:49.02)
    // VO: "Now, when you return to that recurring task, you don't need to
    //      rebuild the workflow from scratch."
    {
      layout: 'centered-quote',
      text: "You don't need to rebuild the workflow from scratch.",
      durationInFrames: 177,
    },

    // 26+27 — (02:49.02 → 03:02.04)
    // VO: "AI has access to your work context and a reusable workflow for
    //      working with it. Together, these extend AI from something you
    //      constantly have to brief into something that can work much closer
    //      to where your work actually happens."
    // One continuous scene: the diagram cascades in and holds, silently
    // carrying both VO lines — no on-screen caption.
    {
      layout: 'access-workflow-diagram',
      arrowFrame: 30,
      durationInFrames: 390,
    },

    // 28 — (03:02.04 → 03:08.64)
    // VO: "But as you give AI more access to your work, you also need to
    //      think about permissions and control."
    {
      layout: 'big-statement',
      label: 'STAY IN CONTROL',
      text: 'More access means you need to think about permissions and control.',
      highlight: 'permissions and control',
      durationInFrames: 198,
    },

    // 29 — (03:08.64 → 03:12.94)
    // VO: "A connection doesn't necessarily give AI unrestricted access."
    {
      layout: 'centered-quote',
      text: "A connection doesn't necessarily give AI unrestricted access.",
      durationInFrames: 129,
    },

    // 30 — (03:12.94 → 03:19.98)
    // VO: "What it can reach depends on your permissions, what you've
    //      authorized, the platform, and your organization's policies."
    {
      layout: 'label-title-body',
      label: 'WHAT IT CAN REACH DEPENDS ON',
      title: 'Your Permissions, Not Just The Connection',
      body: ['Your permissions', 'What you’ve authorized', 'The platform & your org’s policies'],
      bodyTimings: [65, 103, 127],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'check', 'user'],
      bodyCardCompact: true,
      durationInFrames: 211,
    },

    // 31 — (03:19.98 → 03:24.20)
    // VO: "So when you bring Work Context into AI, remember three
    //      questions."
    {
      layout: 'centered-quote',
      text: 'When you bring Work Context into AI, remember three questions.',
      durationInFrames: 127,
    },

    // 32 — (03:24.20 → 03:40.96)
    // VO: "First, access. What information and systems does AI actually need
    //      access to? Second, workflow. What recurring work do I want AI to
    //      perform with that context? And third, control. What should AI be
    //      allowed to do, and where should I stay in the loop?"
    {
      layout: 'three-mode-columns',
      label: 'THREE QUESTIONS',
      title: 'Access, Workflow, Control',
      columns: [
        {
          label: 'FIRST',
          title: 'Access',
          body: ['What information & systems does AI need access to?'],
        },
        {
          label: 'SECOND',
          title: 'Workflow',
          body: ['What recurring work do I want AI to perform?'],
        },
        {
          label: 'THIRD',
          title: 'Control',
          body: ['What should AI do — and where do I stay in the loop?'],
        },
      ],
      highlights: [
        { from: 0, value: null },
        { from: 0, value: 0 },
        { from: 164, value: 1 },
        { from: 311, value: 2 },
        { from: 460, value: null },
      ],
      durationInFrames: 503,
    },

    // 33 — (03:40.96 → end 03:50.09)
    // VO: "And the goal isn't to give AI access to everything. It's to give
    //      it the right context, the right workflow, and the right level of
    //      control for the work you want it to do."
    {
      layout: 'big-statement',
      text: "The goal isn't access to everything.\nIt's the right context, workflow, and control.",
      highlight: 'the right context, workflow, and control',
      durationInFrames: 274,
    },
  ],
};
