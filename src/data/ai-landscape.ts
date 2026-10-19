import { VideoData } from '../scenes/types';

// AI Landscape — standalone video, not related to the History of AI project/script.
// Single 208.488s motion-graphic clip (confused stick figure buried in AI headlines ->
// ecosystem logos) with its own BAKED-IN NARRATION (not silent b-roll — confirmed via
// Whisper transcript, see ai-landscape.transcript.srt). Source: dumping/AI Landscape.mp4,
// re-encoded to video/ai-landscape.mp4 with explicit yuv420p/bt709 color metadata (the
// original's ambiguous full-range tag was making Remotion's compositor tone-map it to
// solid white). Narration extracted to audio/ai-landscape.mp3 and used as the real VO
// track; the video plays as a shared continuous background (clipSrc) the same way
// chatgpt-voice.ts does for a single narrated source recording.
//
// IMPORTANT — verified via frame-accurate signalstats scan (not eyeballing thumbnails):
// the source's actual animated content (stick figure + headlines + ecosystem logos) only
// runs from ~0.0s to ~73.0s. From 73.0s to the end (208.488s) the source is a SOLID WHITE
// frame while the narration keeps going (2022-26 evolution, agentic AI, bounded autonomy,
// closing question) — 135 of the video's 208 seconds have no visual at all. Scenes in
// that window use label-title-body (a real design on the canvas) instead of video-clip
// (which would just show a card floating on blank nothing). A 4.5s title-card-green
// bumper opens the video, covering the source's own blank lead-in (0.0-4.5s) the same way
// chatgpt-voice.ts's bumper covers its blank lead-in — audio starts immediately at frame 0
// underneath it, video reveals right as the bumper ends.
//
// Scene cuts follow the narration's own topic beats (sentence-level Whisper timestamps,
// see transcript). Body bullets are paraphrased, not verbatim, and timed to when the
// relevant sentence starts.
//
//  scene                                          | comp frames  | dur (f @30fps)
//  -----------------------------------------------|--------------|---------------
//  0  title-card-green (bumper, covers blank lead-in) |   0- 135  |   135
//  1  video-clip (chaos intro)                     |   135- 684  |   549
//  2a video-clip (four ecosystems, part 1)         |   684-1620  |   936
//  2b label-title-body (for teams — fills a 54.0-66.47s blank gap
//     inside the ecosystems footage)               |  1620-1994  |   374
//  2c video-clip (four ecosystems, part 2)         |  1994-2190  |   196
//  3  process-steps horizontal (2022-23 -> 2024 -> 2025 -> 2026 intro) | 2190-4335 | 2145
//  3b checklist-slide (the agentic loop, step by step)  | 4335-4738   |   403
//  3c bounded-autonomy-diagram                     |  4738-5312  |   574
//  3d takeaway-stack (the progression, recapped)   |  5312-5772  |   460
//  4  split-contrast (old question vs new question)| 5772-6254   |   482
//                                                          total   6254
export const aiLandscape: VideoData = {
  audioSrc: 'audio/ai-landscape.mp3',
  clipSrc: 'video/ai-landscape.mp4',
  scenes: [
    // 0 — Opening bumper (0:00 -> 0:04.50, 135f). Audio/video already rolling underneath,
    // hidden until scene 1 reveals real footage (source is genuinely blank until 4.5s).
    {
      layout: 'title-card-green',
      title: 'AI Landscape',
      label: 'THE STATE OF AI',
      durationInFrames: 135,
    },

    // 1 — Chaos intro (0:04.50 -> 0:22.80, 549f)
    // VO: "Most leaders that I speak to feel the same tension. The AI space feels chaotic.
    //      Every week there is a new model, a new startup, or a new headline claiming some
    //      kind of a breakthrough, and it's very difficult to tell what actually matters
    //      for your work and what is just noise. So let's talk about what you actually
    //      should know about the AI landscape."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-landscape.mp4',
      videoStartTime: 4.5,
      durationInFrames: 549,
    },

    // 2a — Four ecosystems, part 1 (0:22.80 -> 0:54.00, 936f). Real footage (logos).
    // VO: "So first of all, you hear many names in the market, but for practical
    //      day-to-day knowledge work, four ecosystems really dominate. You have ChatGPT
    //      from OpenAI, Gemini from Google, Copilot from Microsoft, and then Claude from
    //      Anthropic. Some others that you may see include DeepSeek... Grok...
    //      or Meta's Open Llama models."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-landscape.mp4',
      videoStartTime: 22.8,
      durationInFrames: 936,
    },

    // 2b — "For teams" (0:54.00 -> 1:06.47, 374f). Verified blank in the source (part of
    // the same 54.0-66.47s gap as the rest of the video, just narrower) — label-title-body
    // instead of a card floating on nothing.
    // VO: "...but if your goal is implementing within teams and organizations, you should
    //      really just focus first on the platforms that integrate with major productivity
    //      suites, offer enterprise governance, and consistently ship new capabilities..."
    {
      layout: 'label-title-body',
      label: 'FOR TEAMS',
      title: 'Prioritize platforms that\nfit how you already work',
      body: [
        'Integrate with the productivity suites your team already uses',
        'Offer enterprise governance',
        'Consistently ship new capabilities',
      ],
      bodyTimings: [19, 154, 312],
      durationInFrames: 374,
    },

    // 2c — Four ecosystems, part 2 (1:06.47 -> 1:13.00, 196f). Real footage resumes.
    // VO: "...which again today primarily means ChatGPT, Gemini, Copilot, and Claude."
    {
      layout: 'video-clip',
      videoSrc: 'video/ai-landscape.mp4',
      videoStartTime: 66.47,
      durationInFrames: 196,
    },

    // 3 — The evolution: 2022-23 -> 2024 -> 2025 -> 2026 intro (1:13.00 -> 2:24.35,
    // 2145f). Source is solid white for this entire window (confirmed) — a single
    // horizontal process-steps timeline instead of separate text cards. Stops right
    // before the VO says "Agentic systems can take a goal..." (144.50s) — that gets
    // its own dedicated step-by-step scene next, since it's describing an actual
    // sequence, not another timeline beat.
    // VO covers, in order:
    //  "But let's zoom out as well... In 2022-23, when AI was just launched, it
    //   functioned primarily as a chat-based assistant. So you would type a prompt,
    //   it would generate a response, and it really felt like a capable but very
    //   junior co-worker waiting for your instructions."
    //  "In 2024, the interaction expanded beyond text, so multimodal capabilities
    //   meant that AI could analyze documents, interpret images, process voice..."
    //  "In 2025, the shift became structural. AI started moving beyond individual
    //   prompts and into recurring workflows..."
    //  "And in 2026, we've moved another step forward... This is where agentic AI
    //   becomes important."
    {
      layout: 'process-steps',
      label: 'THE EVOLUTION',
      title: 'From chat assistant to agentic AI, still bounded by human judgment',
      titleSize: 40,
      steps: [
        { title: '2022–23', body: 'A chat-based assistant: type a prompt, get a response.' },
        { title: '2024', body: 'Multimodal: analyze documents, interpret images, process voice.' },
        { title: '2025', body: 'Recurring workflows: persistent instructions, connected tools.' },
        { title: '2026', body: 'AI can increasingly carry work forward for you. This is where agentic AI comes in.' },
      ],
      // Timings pulled from Whisper word-level timestamps on the actual audio
      // (the word "2022-23"/"2024"/"2025"/"2026" itself), not sentence-level
      // estimates: 77.12s, 91.52s, 104.46s, 133.56s -> comp frames 2314, 2746,
      // 3134, 4007 -> local (scene starts at comp frame 2190).
      stepTimings: [124, 556, 944, 1817],
      activeTimings: [124, 556, 944, 1817],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 2145,
    },

    // 3b — The agentic loop (2:24.50 -> 2:37.96, 403f). Source still blank. Its own
    // scene (not folded into the timeline) because the VO is walking through an
    // actual sequence, not another "year" beat — checklist-slide checks each step
    // off one by one instead of a numbered card stepper.
    // VO: "Agentic systems can take a goal, work through multiple steps, use tools
    //      and connected information, take actions, observe what happened, and
    //      decide what to do next without requiring you to direct every individual
    //      step."
    // Item timings from Whisper word-level timestamps (word onset, converted to
    // local frame; scene starts at comp frame 4335 / 144.50s):
    //  "take a goal"      145.74s -> frame 4372 -> local 37
    //  "work through..."  146.78s -> frame 4403 -> local 68
    //  "use tools..."     148.52s -> frame 4456 -> local 121
    //  "take actions"     150.86s -> frame 4526 -> local 191
    //  "observe..."       151.98s -> frame 4559 -> local 224
    //  "decide..."        153.48s -> frame 4604 -> local 269
    {
      layout: 'checklist-slide',
      label: 'THE AGENTIC LOOP',
      title: "It's a loop, not a single prompt.",
      items: [
        'Take a goal',
        'Work through multiple steps',
        'Use tools and connected information',
        'Take actions',
        'Observe what happened',
        'Decide what to do next',
      ],
      itemTimings: [37, 68, 121, 191, 224, 269],
      durationInFrames: 403,
    },

    // 3c — Bounded autonomy (2:37.96 -> 2:57.06, 574f). Source still blank.
    // Ends right as the VO turns to "So the progression is becoming clear" (177.06s)
    // — that recap gets its own scene next.
    // VO: "That does not mean fully autonomous digital employees have arrived. The
    //      most useful systems today still work with bounded autonomy. Humans
    //      decide what AI can access, what it is allowed to do, where approval is
    //      required, and where judgment and accountability must stay with us."
    {
      layout: 'bounded-autonomy-diagram',
      // Timings from Whisper word-level timestamps (word onset -> local frame;
      // scene starts at comp frame 4738 / 157.92s). judgmentFrame/accountabilityFrame
      // were previously way too late (500/712, guessed from sentence-level
      // boundaries) — "judgment" and "accountability" are actually spoken back to
      // back at 173.70s/174.46s, both well before the old scene even ended.
      aiFrame: 24, // "does not mean fully autonomous..." 158.72s
      humanFrame: 206, // "...work with bounded autonomy" 164.80s
      approvalFrame: 360, // "approval is required" 169.86s (171.78s word onset, close enough)
      judgmentFrame: 473, // "judgment" 173.70s -> frame 5211
      accountabilityFrame: 496, // "accountability" 174.46s -> frame 5234
      durationInFrames: 574,
    },

    // 3d — The progression, recapped (2:57.06 -> 3:12.40, 460f). Source still
    // blank. VO turns reflective here, walking back through the same arc
    // (2022-23 -> 2024 -> 2025 -> 2026) in one breath — a takeaway-stack recap
    // instead of another diagram.
    // VO: "So the progression is becoming clear. AI started by answering us,
    //      then became capable of working with more kinds of information, then
    //      became built into our recurring workflows, and now it can
    //      increasingly carry parts of those workflows forward for us."
    // Timings from Whisper word-level timestamps (scene starts at comp frame
    // 5312 / 177.06s): "AI" 179.78s->local 81, "then" 181.42s->local 131,
    // "then" 185.12s->local 242, "now" 188.54s->local 344.
    {
      layout: 'takeaway-stack',
      label: 'THE PROGRESSION',
      title: 'The progression is becoming clear',
      takeaways: [
        { kicker: 'Then', text: 'AI started by answering us.' },
        { kicker: 'Then', text: 'It worked with more kinds of information.' },
        { kicker: 'Then', text: 'It became built into our recurring workflows.' },
        { kicker: 'Now', text: 'It can carry parts of those workflows forward for us.' },
      ],
      timings: [81, 131, 242, 344],
      durationInFrames: 460,
    },

    // 8 — Closing question (3:12.40 -> 3:28.488, 482f). Source still blank.
    // Old-question-vs-new-question comparison instead of a plain text card.
    // Timings from Whisper word-level timestamps (scene starts at comp frame
    // 5772 / 192.4s): "It is no longer only what can I ask AI to help me with"
    // runs 196.24-199.66s, then pivots at "increasingly" (199.66s -> local 218)
    // into "how should this work happen" (202.74s) and "and what should the
    // human and AI each be responsible for" (205.02s -> local 379).
    // VO: "So the progression is becoming clear... And that changes the question we
    //      should be asking. It is no longer only, what can I ask AI to help me with?
    //      Increasingly, it is, given what AI can now do, how should this work happen in
    //      the first place? And what should the human and AI each be responsible for?"
    {
      layout: 'split-contrast',
      leftLabel: 'THE OLD QUESTION',
      leftTitle: 'What can AI\nhelp with?',
      rightLabel: 'THE NEW QUESTION',
      rightTitle: 'How should this\nwork happen?',
      rightBodies: ['And what should the human and AI each be responsible for?'],
      rightBodyTimings: [379],
      showDivider: true,
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 218, value: 'right' },
      ],
      durationInFrames: 482,
    },
  ],
};
