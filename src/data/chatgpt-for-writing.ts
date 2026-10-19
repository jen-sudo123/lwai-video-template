import { VideoData } from '../scenes/types';

// ChatGPT for Writing — Tutorial video
// Audio:  audio/chatgpt-for-writing.mp3   186.05s
// Video:  video/chatgpt-for-writing.mp4   186.05s  (screen recording 1920×1080 30fps)
//
// BLANK sections → text layouts
// DEMO  sections → raw video, no overlay
//
//  #   layout              VO start   VO end    dur (f)  video
//  1   title-card-green      0.00      3.00        90    —
//  2   label-title-body      3.00     15.80       384    blank
//  3   label-title-body     15.80     38.40       678    blank
//  4   label-title-body     38.40     47.90       285    blank
//  5   video-clip (raw)     47.90     69.20       639    demo: typing prompt
//  6   video-clip (raw)     69.20     79.30       303    demo: draft appears + expand
//  7   video-clip (raw)     79.30     92.40       393    demo: select all + ask for changes
//  8   video-clip (raw)     92.40    104.20       354    demo: tracked changes + passage edit
//  9   video-clip (raw)    104.20    118.30       423    demo: big rewrite
// 10   video-clip (raw)    118.30    127.00       261    demo: wrap-up narration
// 11   video-clip (raw)    127.00    151.40       732    demo: Google Drive connect + Docs
// 12   label-title-body    151.40    167.80       492    blank: practical notes
// 13   label-title-body    167.80    186.05       548    blank: plan/model differences
//                                         total  5582

export const chatGPTForWriting: VideoData = {
  audioSrc: 'audio/chatgpt-for-writing.mp3',
  clipSrc: 'video/chatgpt-for-writing.mp4',
  scenes: [

    // 1 — Title card (0:00 → 0:03)
    {
      layout: 'title-card-green',
      label: 'AI WRITING ASSISTANTS',
      title: 'ChatGPT for Writing',
      durationInFrames: 90,
    },

    // 2 — Hook (0:03 → 0:15.8) — BLANK
    // "ChatGPT is a flexible writing workspace for longer structured writing tasks.
    //  Instead of drafting in one tool and editing in another, you can start with a
    //  prompt in chat, build a draft quickly, and then refine it step-by-step in the
    //  same flow."
    {
      layout: 'label-title-body',
      label: 'CHATGPT FOR WRITING',
      title: 'A flexible workspace for longer,\nstructured writing tasks',
      body: [
        'Start with a prompt, build a draft quickly',
        'Refine it step-by-step — all in the same flow',
      ],
      bodyTimings: [171, 273],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 384,
    },

    // 3 — Three ways writing begins (0:15.8 → 0:38.4) — BLANK
    // "There are a few ways writing typically begins. You might start with a blank prompt...
    //  paste in rough notes... upload a document..."
    {
      layout: 'label-title-body',
      label: 'HOW WRITING BEGINS',
      title: 'A few ways writing typically begins',
      body: [
        'Blank prompt: ask ChatGPT to draft something from scratch',
        'Rough notes: turn them into a memo, article, or brief',
        'Uploaded document: rewrite, summarize, or restructure for a new audience',
      ],
      bodyTimings: [90, 249, 429],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 678,
    },

    // 4 — Workflow summary (0:38.4 → 0:47.9) — BLANK
    // "However you start, the workflow is the same. Give ChatGPT a clear brief,
    //  review the first draft, and improve it through targeted revisions."
    {
      layout: 'label-title-body',
      label: 'THE WORKFLOW',
      title: 'However you start,\nthe workflow is the same',
      body: [
        'Give a clear brief  →  review the first draft  →  improve through targeted revisions',
      ],
      bodyTimings: [90],
      durationInFrames: 285,
    },

    // 5 — DEMO: typing the prompt (0:47.9 → 1:09.2)
    // "In this demo, I'm going to start by prompting ChatGPT. Create a one-pager..."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 47.9,
      durationInFrames: 639,
    },

    // 6 — DEMO: draft appears + expand (1:09.2 → 1:19.3)
    // "Once the draft appears, I don't need to start over... I can choose edit at the
    //  top left corner or expand the draft window to edit directly."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 69.2,
      durationInFrames: 303,
    },

    // 7 — DEMO: select all + ask for changes (1:19.3 → 1:32.4)
    // "After scanning through the whole document, I can ask ChatGPT to adjust...
    //  here I highlight all the text and ask, make this more concrete for a senior
    //  leadership audience."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 79.3,
      durationInFrames: 393,
    },

    // 8 — DEMO: tracked changes + passage edit (1:32.4 → 1:44.2)
    // "ChatGPT now edits the document to my request. I can also pick out a passage
    //  that needs adjustment and ask, shorten this by 30%..."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 92.4,
      durationInFrames: 354,
    },

    // 9 — DEMO: big rewrite (1:44.2 → 1:58.3)
    // "Finally, I can do one big rewrite like turn this into a one-page decision
    //  brief with options, risks, and a clear recommendation. Now the structure
    //  updates, but the core content stays anchored to what I already approved."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 104.2,
      durationInFrames: 423,
    },

    // 10 — DEMO: wrap-up (1:58.3 → 2:07.0)
    // "And that's how you can use ChatGPT to support with your writing. You're not
    //  asking for a full rewrite every time. You're improving a draft you already
    //  mostly like."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 118.3,
      durationInFrames: 261,
    },

    // 11 — DEMO: Google Drive + Docs integration (2:07.0 → 2:31.4)
    // "And if your work already lives in Google Workspace, you can use ChatGPT to work
    //  directly with your Google Docs. Once you connect Google Drive to ChatGPT, you can
    //  bring an existing Google Doc into your ChatGPT workflow and continue working on it
    //  from the conversation without the need to switch between tools or copy content."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-for-writing.mp4',
      videoStartTime: 127.0,
      durationInFrames: 732,
    },

    // 12 — Practical notes (2:31.4 → 2:47.8) — BLANK
    // "And now a few practical notes. This writing capability is available on all
    //  ChatGPT plans. You can draft, edit, and refine content directly in chat.
    //  And for longer projects on the web, use the focused writing view and save
    //  documents to your library."
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: 'Available on every ChatGPT plan',
      body: [
        'Draft, edit, and refine content directly in chat',
        'For longer projects, use the focused writing view and save documents to your library',
      ],
      bodyTimings: [198, 366],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 492,
    },

    // 13 — Plan / model differences (2:47.8 → 3:06.1) — BLANK
    // "The biggest difference between plans is the models you can access. On the free
    //  plan, you can use ChatGPT standard models, but access to more advanced models is
    //  limited. For more demanding writing tasks, access to these advanced models can
    //  often produce better results."
    {
      layout: 'label-title-body',
      label: 'WHAT CHANGES BY PLAN',
      title: 'The biggest difference is\nwhich models you can access',
      body: [
        'Free plan: standard ChatGPT models — advanced models limited',
        'Paid plans unlock advanced models for more demanding writing tasks',
      ],
      bodyTimings: [141, 426],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 548,
    },

  ],
};
