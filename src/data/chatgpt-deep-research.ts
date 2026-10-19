import { VideoData } from '../scenes/types';

// ChatGPT Deep Research — Tutorial / demo video
// Audio: audio/chatgpt-deep-research.mp3 — raw narration extracted from source recording, 248.49s, no silence pad.
// Video: video/chatgpt-deep-research.mp4 — screen recording with embedded narration (same recording as audio).
// Same pattern as chatgpt-tasks.ts / gemini-video-generation.ts: presenter narrating live over their own
// screen recording — audio and video are already in perfect sync. audioStartFrame/clipStartFrame = 90
// because the source has zero lead silence (narration starts at t=0.00s). The source recording itself
// is blank/white from 0.00-~44s (hook explained over no screen) and again from ~218-248s (closing/practical
// notes explained over no screen) — those stretches are covered with label-title-body cards instead of clip.
//
//  scene                                                | start (s) | end (s)  | dur (frames @30fps)
//  -------------------------------------------------------|-----------|----------|--------------------
//  1  title-card-green (silent intro)                     |   0.00    |   3.00   |    90
//  2  label-title-body (hook — why deep research)          |   0.00    |  39.30   |  1179
//  3  video-clip (opening the tool)                        |  39.30    |  56.84   |   526
//  4  video-clip (how to write the prompt)                  |  56.84    |  71.14   |   429
//  5  video-clip (typing the example prompt)                 |  71.14    |  94.20   |   692
//  6  video-clip (adding context & connecting apps)           |  94.20    | 116.94   |   682
//  7  video-clip (confirming the research plan)               | 116.94    | 135.30   |   551
//  8  video-clip (interrupting to redirect)                   | 135.30    | 155.70   |   612
//  9  video-clip (reviewing activity & reasoning)              | 155.70    | 174.24   |   556
// 10  video-clip (sources & citations)                          | 174.24    | 193.44   |   576
// 11  video-clip (reading & exporting the report)                | 193.44    | 217.82   |   731
// 12  label-title-body (practical notes — limits & access)        | 217.82    | 248.49   |   921
//                                                                              total       7545

export const chatGPTDeepResearch: VideoData = {
  audioSrc: 'audio/chatgpt-deep-research.mp3',
  clipSrc: 'video/chatgpt-deep-research.mp4',
  audioStartFrame: 90,
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT Deep Research',
      label: 'AI-POWERED RESEARCH',
      durationInFrames: 90,
    },

    // 2 — Hook (0:00 → 0:39.30, ~39.3s)
    // VO: "ChatGPT is great for thinking, drafting, and working with the context you provide. It's fast
    //      and interactive, but it's not really optimized to run a long multi-step research process. And
    //      while web search is good for pulling recent information from the web or short summaries with
    //      links and citations, deep research is where you go for real depth. Deep research is an agent
    //      that runs a multi-step research workflow, reads and synthesizes across all of its sources, and
    //      then returns a documented deliverable with citations as source links that you can audit. So
    //      here's how we can use it."
    {
      layout: 'label-title-body',
      label: 'BEYOND CHAT',
      title: 'Why deep research?',
      body: [
        'Fast, interactive chat, not built for long, multi-step research',
        'Web search covers quick, cited summaries',
        'Deep research runs the full agentic workflow, reading every source',
        'Returns a documented, citation-backed deliverable you can audit',
      ],
      bodyTimings: [0, 391, 678, 879],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'eye', 'sparkles', 'check'],
      durationInFrames: 1179,
    },

    // 3 — Opening the tool (0:39.30 → 0:56.84, ~17.5s)
    // VO: "So first of all, in this new chat, you can type either slash deep research or click the plus
    //      button next to the message box, and then choose deep research from the tools menu. On the
    //      desktop app, you may also see the telescope icon. Step two is to provide the prompt."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 39.30,
      durationInFrames: 526,
    },

    // 4 — How to write the prompt (0:56.84 → 1:11.14, ~14.3s)
    // VO: "So while the character is implied here, the O-D-O still have to be inputted. So you want to
    //      specify the objective, the decision you're looking to make, the do's and don'ts of how to run
    //      the process, and then also the output formats." (whisper mis-heard this as "CODU"/"ODNO" —
    //      it's the C.O.D.O prompt framework: Character, Objective, Do's & Don'ts, Output.)
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 56.84,
      label: 'PROMPT FRAMEWORK',
      title: 'C.O.D.O',
      body: [
        'Character, already implied by the chat',
        'Objective, the decision you want it to make',
        "Do's & don'ts, how the process should run",
        'Output, the format you expect back',
      ],
      bodyTimings: [0, 222, 291, 360],
      overlayPosition: 'top-right',
      durationInFrames: 429,
    },

    // 5 — Typing the example prompt (1:11.14 → 1:34.20, ~23.1s)
    // VO: "So for example, I'm going to type here, create a meeting ready report for my board of
    //      directors on 2026 expansion opportunities in the US. Only source from reputable sources like
    //      the World Economic Forum and BCG, and include an executive summary, key findings, risks,
    //      recommendations, and a comparison table. And of course, provide citations for every material
    //      claim."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 71.14,
      durationInFrames: 692,
    },

    // 6 — Adding context & connecting apps (1:34.20 → 1:56.94, ~22.7s)
    // VO: "So now we can add our context. By default, deep research will use the open web and any files
    //      that you upload. But you can also connect apps and draw from those private sources when it's
    //      relevant and, of course, permitted. So here I'm going to click on apps. And then given this
    //      particular research requirement, I'm going to toggle on Google Drive in case we have relevant
    //      documents uploaded there."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 94.20,
      durationInFrames: 682,
    },

    // 7 — Confirming the research plan (1:56.94 → 2:15.30, ~18.4s)
    // VO: "Okay, and then we can confirm the research plan. So in the new deep research mode, you will be
    //      presented with an action plan, and then you have about 60 seconds to edit this plan before the
    //      research starts. To edit, you just click on edit, and then you just write in human language
    //      the desired edits as a follow up prompt. So now you're going to start it."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 116.94,
      durationInFrames: 551,
    },

    // 8 — Interrupting to redirect (2:15.30 → 2:35.70, ~20.4s)
    // VO: "But while it's working, you can actually interrupt at any time to give it new instructions.
    //      And this is especially useful if you realize you forgot something, or you see the agent going
    //      down a path that you don't want it to, or if you want to narrow the scope or different report
    //      structure without starting over completely. And this is where working with agents really
    //      becomes a very engaged process."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 135.30,
      durationInFrames: 612,
    },

    // 9 — Reviewing activity & reasoning (2:35.70 → 2:54.24, ~18.5s)
    // VO: "Now after some time, I get the in-depth report or deliverable. So here I can click on activity
    //      and I can see the entire reasoning and research path, which gives me some great insights into
    //      the process. I can also see which searches deep research did, where it got stuck and maybe any
    //      challenges that it faced."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 155.70,
      durationInFrames: 556,
    },

    // 10 — Sources & citations (2:54.24 → 3:13.44, ~19.2s)
    // VO: "On this step, I can also find all of the sources that it used, and I can click on each link to
    //      see the content in detail, even if deep research didn't include it in the final deliverable.
    //      And then as mentioned, deep research outputs all of these citations and source links. So you
    //      can use this to spot check claims and any referenced data."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 174.24,
      durationInFrames: 576,
    },

    // 11 — Reading & exporting the report (3:13.44 → 3:37.82, ~24.4s)
    // VO: "So now that you have your deliverable, you can also read it here in full screen. And they've
    //      added this table of content on the left-hand side for navigating the report. You can also
    //      download it for reuse or share it in multiple formats, including Markdown, Word, and PDF. And
    //      you can continue the conversation with the very rich context that this chat now has by asking
    //      follow-up questions or brainstorming further."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-deep-research.mp4',
      videoStartTime: 193.44,
      durationInFrames: 731,
    },

    // 12 — Practical notes (3:37.82 → 4:08.49, ~30.7s incl. trailing silence)
    // VO: "Now, a couple of practical notes, deep research is available on all plans. On free, you have
    //      five queries per month. On Plus Business Enterprise and EDU, you have 25, and on Pro, you have
    //      250. There's unfortunately no way to see how far you are towards this limit, so just be mindful
    //      of that. And the limits reset every 30 days from the date of your first use. And if you don't
    //      see deep research, it could be that your admin has not activated this for a particular role or
    //      the user group that you're a part of."
    {
      layout: 'label-title-body',
      label: 'BEFORE YOU START',
      title: 'A few practical notes',
      body: [
        'Available on every plan, with different monthly limits',
        'Free: 5/mo · Plus, Business, Enterprise & EDU: 25/mo · Pro: 250/mo',
        'No usage meter, limits reset 30 days from your first use',
        'Not seeing it? Ask your admin to enable it for your role',
      ],
      bodyTimings: [0, 155, 396, 674],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'user', 'clock', 'sliders'],
      durationInFrames: 921,
    },
  ],
};
