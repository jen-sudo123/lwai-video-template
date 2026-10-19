import { VideoData } from '../scenes/types';

// ChatGPT Web Search — Tutorial / demo video
// Audio: audio/chatgpt-websearch.mp3 — raw narration extracted from source recording, 209.11s, no silence pad.
// Video: video/chatgpt-websearch.mp4 — screen recording with embedded narration (same recording as audio).
// Same pattern as chatgpt-deep-research.ts / chatgpt-tasks.ts: presenter narrating live over their own
// screen recording — audio and video are already in perfect sync. The source recording is blank/white
// (avatar bubble baked into the footage, no screen shown) from 0.00–76.00s (hook explaining what web
// search is and how it works) and again from 188.50–209.11s (closing practical notes) — those stretches
// are covered with label-title-body cards instead of clip, matching convention. Per [[feedback_no_step_cards]]
// the demo video-clip scenes carry no overlay card — clean, uninterrupted screen recording only.
//
//  scene                                                | start (s) | end (s)  | dur (frames @30fps)
//  -------------------------------------------------------|-----------|----------|--------------------
//  1  title-card-green (silent intro)                     |   0.00    |   3.00   |    90
//  2  label-title-body (hook — why web search matters)     |   0.00    |  29.72   |   892
//  3  label-title-body (hook — how it works)                |  29.72    |  47.66   |   538
//  4  label-title-body (hook — automatic or manual)          |  47.66    |  76.00   |   850
//  5  video-clip (turning on web search)                      |  76.00    | 100.68   |   740
//  6  video-clip (typing the prompt)                           | 100.68    | 120.28   |   588
//  7  video-clip (reviewing the cited results)                  | 120.28    | 143.72   |   704
//  8  video-clip (checking all sources)                          | 143.72    | 163.28   |   586
//  9  video-clip (refining with a follow-up)                      | 163.28    | 176.42   |   395
// 10  video-clip (sharing the result)                              | 176.42    | 187.52   |   333
// 11  label-title-body (practical notes — availability & plans)     | 187.52    | 209.11   |   647
//                                                                                total       6363

export const chatGPTWebSearch: VideoData = {
  audioSrc: 'audio/chatgpt-websearch.mp3',
  clipSrc: 'video/chatgpt-websearch.mp4',
  audioStartFrame: 90,
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT Web Search',
      label: 'LIVE, CITED ANSWERS',
      durationInFrames: 90,
    },

    // 2 — Hook: why web search matters (0:00 → 0:29.72, ~29.7s)
    // VO: "ChatGPT web search is a live search capability that's embedded directly into your ChatGPT.
    //      And so instead of guessing whether an answer is up to date, you can actually force ChatGPT to
    //      ground its response in live web results and site sources that you can inspect before you're
    //      acting on it. So this matters a lot when recency effects decisions like maybe competitors,
    //      regulation, pricing, hiring markets, or anything tied to a specific location or time window."
    {
      layout: 'label-title-body',
      label: 'GROUNDED IN THE WEB',
      title: 'Why web search matters',
      body: [
        'A live search capability built directly into ChatGPT',
        'Grounds its answer in live web results and inspectable sources',
        'Matters most when recency changes the decision, competitors, regulation, pricing',
      ],
      bodyTimings: [19, 330, 554],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'eye', 'clock'],
      durationInFrames: 892,
    },

    // 3 — Hook: how it works (0:29.72 → 0:47.66, ~17.9s)
    // VO: "So with web search, ChatGPT will interpret your question, translate it into a couple of
    //      different search queries, then do those searches and retrieve the web results, extract the
    //      relevant facts, and then synthesize it into a response with, again, the citations that you can
    //      inspect."
    {
      layout: 'label-title-body',
      label: 'HOW IT WORKS',
      title: 'Query, search, cite',
      body: [
        'Interprets your question into a few targeted search queries',
        'Retrieves the results and extracts the relevant facts',
        'Synthesizes it all into a response with citations you can inspect',
      ],
      bodyTimings: [69, 261, 376],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'bolt', 'check'],
      durationInFrames: 538,
    },

    // 4 — Hook: automatic or manual (0:47.66 → 1:16.00, ~28.3s)
    // VO: "So how do we use ChatGPT web search? Well, first of all, it's important to know that ChatGPT
    //      will trigger web search automatically when it detects a time-sensitive question. In other
    //      cases, you need to explicitly turn it on before you run the prompt, and the inverse is true as
    //      well, and this is important. If you want the answer to be based on ChatGPT's general and rich
    //      training data, toggle web search off."
    {
      layout: 'label-title-body',
      label: 'AUTOMATIC OR MANUAL',
      title: 'Turning it on',
      body: [
        'Triggers automatically for time-sensitive questions',
        'Otherwise, switch it on explicitly before you run the prompt',
        "Turn it off to lean on ChatGPT's own training knowledge instead",
      ],
      bodyTimings: [165, 319, 573],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['clock', 'bolt', 'x'],
      durationInFrames: 850,
    },

    // 5 — Turning on web search (1:16.00 → 1:40.68, ~24.7s)
    // VO: "So I'm going to show you, and here I'm going to be preparing for a leadership conversation
    //      and I just want to short executive brief on what's changed in our industry recently. So
    //      first, I'm going to make sure that web search is turned on by typing slash search or by
    //      clicking on the plus icon next to the prompt box or even clicking the globe icon near the
    //      prompt box in certain interfaces, and then I can just run my prompt."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-websearch.mp4',
      videoStartTime: 76.00,
      durationInFrames: 740,
    },

    // 6 — Typing the prompt (1:40.68 → 2:00.28, ~19.6s)
    // VO: "So in this case, I'm going to say, give me a concise executive brief on the most important
    //      developments affecting the AI training and consulting industry in Europe over the last 30
    //      days, focus on implications for senior leaders and prioritize primary or reputable sources
    //      and make sure you include the citations for every material claim. Then I just let it run."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-websearch.mp4',
      videoStartTime: 100.68,
      durationInFrames: 588,
    },

    // 7 — Reviewing the cited results (2:00.28 → 2:23.72, ~23.4s)
    // VO: "And now that you see the results, you can see that the response is very structured and
    //      critically again, it's cited so that I can verify those insights. To do that, I can open up
    //      even just one source and check for things like who published this, is this primary evidence,
    //      is this commentary from a third party and do I trust them, is there maybe a second source
    //      saying something similar."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-websearch.mp4',
      videoStartTime: 120.28,
      durationInFrames: 704,
    },

    // 8 — Checking all sources (2:23.72 → 2:43.28, ~19.6s)
    // VO: "And if I want to do a bit more in-depth checking, I can also go to all sources by clicking on
    //      sources here at the bottom of the search and then scrolling through all of the sources used,
    //      even if they weren't included in the final results."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-websearch.mp4',
      videoStartTime: 143.72,
      durationInFrames: 586,
    },

    // 9 — Refining with a follow-up (2:43.28 → 2:56.42, ~13.1s)
    // VO: "And if I want to refine the results or push for better sources, I don't even have to start
    //      over. I can just simply prompt something like, tell me the three opportunities and three
    //      recommended actions for our leadership team. And then it's answering based on all of this
    //      context it has in the chat."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-websearch.mp4',
      videoStartTime: 163.28,
      durationInFrames: 395,
    },

    // 10 — Sharing the result (2:56.42 → 3:07.52, ~11.1s)
    // VO: "And then finally, this is now ready to go. So I can either copy this into a document here or
    //      I can share the link directly so that people also have access to all of the underlying
    //      sources."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-websearch.mp4',
      videoStartTime: 176.42,
      durationInFrames: 333,
    },

    // 11 — Practical notes (3:07.52 → 3:29.11, ~21.6s incl. trailing silence)
    // VO: "Now on some practical notes, ChatGPT web search is available on the website, the mobile apps,
    //      and the macOS desktop app. And it's included in the free go plus business edu and enterprise
    //      plans. It's sometimes even available to logged out free users, although search usage is
    //      always still subject to any plan limits."
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: "Where it's available",
      body: [
        'Available on the ChatGPT website, mobile apps, and macOS desktop app',
        'Included in Free, Go, Plus, Business, Edu, and Enterprise plans',
        'Sometimes on for logged-out users too, always subject to plan limits',
      ],
      bodyTimings: [96, 228, 379],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['star', 'check', 'user'],
      durationInFrames: 647,
    },
  ],
};
