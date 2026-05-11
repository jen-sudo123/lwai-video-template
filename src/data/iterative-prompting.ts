import { VideoData } from '../scenes/types';

// Audio: "iterative-prompting.mp3" — 221.12s narrated content + ~2.6s tail → ~6680 frames
// All scene boundaries derived from Whisper small SRT timestamps (30 fps).
// Title card (45f) sits over the first 1.5s of audio; all scene
// start frames = (SRT timestamp × 30) + 45.
//
// SRT-derived audio frames (×30 fps):
//   SRT  1  0:00.000  →    0f     SRT 33  1:47.920  →  3238f
//   SRT  2  0:05.640  →  169f     SRT 34  1:54.160  →  3425f
//   SRT  3  0:10.200  →  306f     SRT 35  1:57.240  →  3517f
//   SRT  4  0:13.580  →  407f     SRT 36  2:00.840  →  3625f
//   SRT  5  0:16.040  →  481f     SRT 37  2:04.520  →  3736f
//   SRT  6  0:19.200  →  576f     SRT 38  2:06.000  →  3780f
//   SRT  7  0:22.320  →  670f     SRT 39  2:09.040  →  3871f
//   SRT  8  0:24.040  →  721f     SRT 40  2:12.280  →  3968f
//   SRT  9  0:27.040  →  811f     SRT 41  2:16.600  →  4098f
//   SRT 10  0:29.560  →  887f     SRT 42  2:19.280  →  4178f
//   SRT 11  0:32.640  →  979f     SRT 43  2:24.640  →  4339f
//   SRT 12  0:36.160  → 1085f     SRT 44  2:26.640  →  4399f
//   SRT 13  0:40.440  → 1213f     SRT 45  2:29.000  →  4470f
//   SRT 14  0:43.200  → 1296f     SRT 46  2:31.760  →  4553f
//   SRT 15  0:45.760  → 1373f     SRT 47  2:35.840  →  4675f
//   SRT 16  0:47.520  → 1426f     SRT 48  2:38.120  →  4744f
//   SRT 17  0:49.320  → 1480f     SRT 49  2:40.320  →  4810f
//   SRT 18  0:54.200  → 1626f     SRT 50  2:43.760  →  4913f
//   SRT 19  0:58.560  → 1757f     SRT 51  2:48.520  →  5056f
//   SRT 20  1:01.760  → 1853f     SRT 52  2:53.880  →  5216f
//   SRT 21  1:05.160  → 1955f     SRT 53  2:55.760  →  5273f
//   SRT 22  1:07.120  → 2014f     SRT 54  2:59.840  →  5395f
//   SRT 23  1:10.640  → 2119f     SRT 55  3:04.080  →  5522f
//   SRT 24  1:14.240  → 2227f     SRT 56  3:07.880  →  5636f
//   SRT 25  1:17.280  → 2318f     SRT 57  3:09.760  →  5693f
//   SRT 26  1:21.800  → 2454f     SRT 58  3:15.480  →  5864f
//   SRT 27  1:26.920  → 2608f     SRT 59  3:21.040  →  6031f
//   SRT 28  1:29.240  → 2677f     SRT 60  3:27.720  →  6232f
//   SRT 29  1:33.520  → 2806f     SRT 61  3:30.120  →  6304f
//   SRT 30  1:37.600  → 2928f     SRT 62  3:34.240  →  6427f
//   SRT 31  1:40.120  → 3004f     SRT 63  3:36.360  →  6491f
//   SRT 32  1:44.160  → 3125f     end     3:41.120  →  6634f
//
//   scene                             | SRT(s)    | comp frames     | dur  | layout
//   ----------------------------------|-----------|-----------------|------|--------------------
//   title card                        | —         |     0 →    44   |   45 | title-card-green
//   the two bad habits                | 1–2       |    45 →   350   |  306 | split-contrast
//   the time leak                     | 3–5       |   351 →   620   |  270 | big-statement
//   key insight — 3rd or 4th msg      | 6–10      |   621 →  1023   |  403 | stat-hero
//   how the thread works              | 11–17     |  1024 →  1670   |  647 | label-title-body
//   churn example (chat thread)       | 18–25     |  1671 →  2498   |  828 | chat-thread
//   payoff — 30 sec vs sharper        | 26–28     |  2499 →  2850   |  352 | split-contrast
//   analogy — debriefing              | 29–32     |  2851 →  3282   |  432 | split-contrast
//   specific feedback rules           | 33–36     |  3283 →  3780   |  498 | split-contrast
//   pro tip — edit the message        | 37–41     |  3781 →  4222   |  442 | label-title-body
//   context window drift              | 42–50     |  4223 →  5100   |  878 | label-title-body
//   the sign of drift                 | 51–52     |  5101 →  5317   |  217 | big-statement
//   the fix — start fresh             | 53–57     |  5318 →  5908   |  591 | label-title-body
//   bottom line — 70–80% right        | 58–60     |  5909 →  6348   |  440 | stat-hero
//   the action                        | 61–63     |  6349 →  6678   |  330 | big-statement
//   blank outro                       | —         |  6679 →  6829   |  150 | blank

export const iterativePrompting: VideoData = {
  audioSrc: 'audio/iterative-prompting.mp3',
  scenes: [

    // — title card
    {
      layout: 'title-card-green',
      title: 'Iterative Prompting & Feedback',
      durationInFrames: 45,
    },

    // SRT 1–2 (0:00–0:10.20) — the two bad habits (split-contrast)
    // VO: "Most leaders who get a bad AI response do one of two things.
    //      They either fix it themselves or they give up and start over."
    // Scene start = SRT 1 (0s). SRT 2 = 5.64s → scene frame 169.
    // leftBodyDelay: 0 (SRT 1)
    // rightBodyDelay: SRT 2 − 18 = 169 − 18 = 151f
    // highlights: left lit at 0; right at SRT 2 − 12 = 169 − 12 = 157f
    {
      layout: 'split-contrast',
      leftLabel: 'BAD HABIT #1',
      leftTitle: 'Fix it yourself.',
      leftBody: 'Manually rewrite the response. Fast — but you miss what the AI could have caught with one more message.',
      rightLabel: 'BAD HABIT #2',
      rightTitle: 'Give up and start over.',
      rightBody: 'Throw the whole conversation away. Wastes everything the model already knows about your situation.',
      dividerLabel: 'or',
      showDivider: true,
      leftBodyDelay: 0,
      rightBodyDelay: 151,
      highlights: [
        { from: 0, value: 'left' },
        { from: 157, value: 'right' },
      ],
      durationInFrames: 306,
    },

    // SRT 3–5 (0:10.20–0:19.20) — the time leak (big-statement)
    // VO: "That habit is where the time leak really starts,
    //      not any limitation of the AI itself,
    //      and it's where we get truly frustrated with AI."
    {
      layout: 'big-statement',
      text: 'That habit is where the time leak really starts.',
      highlight: 'time leak',
      size: 'title',
      animation: 'fade',
      durationInFrames: 270,
    },

    // SRT 6–10 (0:19.20–0:32.64) — key insight: best outputs in 3rd or 4th message (stat-hero)
    // VO: "The top AI leaders have learned that the best AI outputs are rarely
    //      the first message in a conversation, but they're in the third or fourth."
    {
      layout: 'stat-hero',
      stat: '3rd–4th',
      label: 'WHERE THE BEST OUTPUTS LIVE',
      unit: 'message in the conversation',
      context: 'The best AI outputs are rarely the first message.',
      contextTiming: 0,
      durationInFrames: 403,
    },

    // SRT 11–17 (0:32.64–0:54.20) — how the thread accumulates (label-title-body)
    // VO: "Every time you send a follow-up in a chat thread, the model reads the
    //      entire thread again — your original prompt, its response, your new message —
    //      and they all become inputs to the next output, infinitely."
    // body[0] at SRT 12 − 18f: (36.16 − 32.64) × 30 − 18 = 105 − 18 = 87f
    // body[1] at SRT 14 − 18f: (43.2  − 32.64) × 30 − 18 = 317 − 18 = 299f
    // body[2] at SRT 17 − 18f: (49.32 − 32.64) × 30 − 18 = 500 − 18 = 482f
    {
      layout: 'label-title-body',
      label: 'WHY IT WORKS',
      title: 'The Model Reads Everything',
      body: [
        'Every follow-up sends the entire thread to the model again.',
        'Your original prompt · its response · your new message.',
        'All become inputs to the next output — infinitely.',
      ],
      bodyTimings: [87, 299, 482],
      durationInFrames: 647,
    },

    // SRT 18–25 (0:54.20–1:21.80) — churn example, full chat thread (chat-thread)
    // VO: "Let's say you've asked for five ideas to reduce churn... not satisfied.
    //      Instead of starting over, just send one message like,
    //      hey, I liked 1 and 3, but 2/4/5 missed the mark — they need budget I don't have.
    //      Can you give me 3 more within those constraints?"
    // Scene start = SRT 18 (54.2s). All scene offsets relative to 54.2s.
    // msg[0] at from: 0  (SRT 18, scene frame 0)
    // msg[1] at from: 90 (~3s in, during SRT 18-19 setup)
    // msg[2] at from: 375 (SRT 22 = 67.12s → (67.12−54.2)×30 = 387 − 12 = 375)
    // msg[3] at from: 680 (SRT 25 = 77.28s → (77.28−54.2)×30 = 692 − 12 = 680)
    {
      layout: 'chat-thread',
      label: 'ITERATIVE FEEDBACK IN ACTION',
      messages: [
        {
          role: 'user',
          text: 'Give me 5 ideas to reduce customer churn.',
        },
        {
          role: 'assistant',
          quality: 'weak',
          text: '1. Hire more support staff\n2. Build a dedicated retention team\n3. Expand onboarding resources\n4. Offer loyalty discounts\n5. Send re-engagement emails',
        },
        {
          role: 'user',
          text: 'I liked 1 and 3, but 2, 4, and 5 missed the mark — they need headcount or budget I don\'t have.\n\nCan you give me 3 more within those constraints?',
        },
        {
          role: 'assistant',
          quality: 'strong',
          text: '1. Improve in-app onboarding with contextual tooltips\n2. Set up automated check-ins at key drop-off points\n3. Create a self-serve help centre with video walkthroughs',
        },
      ],
      highlights: [
        { from: 0,   value: 1 },
        { from: 90,  value: 2 },
        { from: 375, value: 3 },
        { from: 680, value: 4 },
      ],
      durationInFrames: 828,
    },

    // SRT 26–28 (1:21.80–1:33.52) — payoff: 30 seconds vs sharper outcomes (split-contrast)
    // VO: "Writing that follow-up cost you at most 30 seconds, but it results in
    //      sharper outcomes because your constraints are now part of the conversation."
    // Scene start = SRT 26 (81.8s). SRT 27 = 86.92s → scene frame 154.
    // rightBodyDelay: 154 − 18 = 136f. highlights right at 154 − 12 = 142f.
    {
      layout: 'split-contrast',
      leftLabel: 'THE INVESTMENT',
      leftTitle: '30 seconds.',
      leftBody: 'The cost of writing one focused follow-up message.',
      rightLabel: 'THE PAYOFF',
      rightTitle: 'Sharper outcomes.',
      rightBody: 'Your constraints become part of the conversation\'s history — and every future response is better for it.',
      showDivider: false,
      leftBodyDelay: 0,
      rightBodyDelay: 136,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 142, value: 'right' },
      ],
      durationInFrames: 352,
    },

    // SRT 29–32 (1:33.52–1:47.92) — debriefing analogy (split-contrast)
    // VO: "It's very similar to debriefing someone who presented work to you.
    //      Instead of only saying 'try again', you tell them where improvements
    //      can be made — and that results in a much better outcome."
    // Scene start = SRT 29 (93.52s). SRT 31 = 100.12s → scene frame 198.
    // rightBodyDelay: 198 − 18 = 180f. highlights right at 198 − 12 = 186f.
    {
      layout: 'split-contrast',
      leftLabel: 'WHAT DOESN\'T WORK',
      leftTitle: '"Try again."',
      leftBody: 'Vague frustration gives the AI nothing to work with.',
      rightLabel: 'WHAT DOES',
      rightTitle: 'Tell them where to improve.',
      rightBody: 'Specific direction — what worked, what missed, and why — produces a much better outcome next time.',
      showDivider: false,
      leftBodyDelay: 0,
      rightBodyDelay: 180,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 186, value: 'right' },
      ],
      durationInFrames: 432,
    },

    // SRT 33–36 (1:47.92–2:04.52) — specific feedback (split-contrast)
    // VO: "Make sure your feedback is as specific as possible.
    //      Instead of 'give me something different', define what worked,
    //      what didn't, and why in as much detail as possible."
    // Scene start = SRT 33 (107.92s). SRT 34 = 114.16s → scene frame 187.
    // rightBodyDelay: 187 − 18 = 169f. highlights right at 187 − 12 = 175f.
    {
      layout: 'split-contrast',
      leftLabel: 'WEAK FEEDBACK',
      leftTitle: '"Give me something different."',
      leftBody: 'The AI has no idea what to change.',
      rightLabel: 'STRONG FEEDBACK',
      rightTitle: 'Define what worked — and what didn\'t.',
      rightBody: 'Tell it why, in as much detail as possible. That\'s what gets a sharp output next time.',
      showDivider: false,
      leftTitleSize: 46,
      leftBodyDelay: 0,
      rightBodyDelay: 169,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 175, value: 'right' },
      ],
      durationInFrames: 498,
    },

    // SRT 37–41 (2:04.52–2:19.28) — pro tip: edit the original message (label-title-body)
    // VO: "A small pro tip — if you realize you asked the wrong question entirely,
    //      all platforms let you edit the original message in the thread,
    //      or even in subsequent messages."
    // body[0] at SRT 38 − 18f: (126.0  − 124.52) × 30 − 18 = 44 − 18 = 26f
    // body[1] at SRT 40 − 18f: (132.28 − 124.52) × 30 − 18 = 233 − 18 = 215f
    // images: staggered from SRT 40 onwards (215, 245, 275)
    {
      layout: 'label-title-body',
      label: 'PRO TIP',
      title: 'You Can Edit',
      body: [
        'If you realize you asked the wrong question entirely,',
        'all platforms let you edit the original message in the thread.',
      ],
      bodyTimings: [26, 215],
      images: [
        'images/features/ChatGPT.png',
        'images/features/Gemini.png',
        'images/features/Claude.png',
      ],
      imageTimings: [215, 248, 281],
      durationInFrames: 442,
    },

    // SRT 42–50 (2:19.28–2:48.52) — context window drift (label-title-body)
    // VO: "As conversations grow long, the quality can start to drift.
    //      The model has a finite context window — as the thread accumulates,
    //      older instructions and context can disappear or lose weight."
    // body[0] at SRT 43 − 18f: (144.64 − 139.28) × 30 − 18 = 161 − 18 = 143f
    // body[1] at SRT 46 − 18f: (151.76 − 139.28) × 30 − 18 = 374 − 18 = 356f
    // body[2] at SRT 50 − 18f: (163.76 − 139.28) × 30 − 18 = 734 − 18 = 716f
    {
      layout: 'label-title-body',
      label: 'WATCH OUT FOR',
      title: 'Context Window Drift',
      body: [
        'Long threads lose quality as they grow.',
        'The model has a finite context window.',
        'Older instructions can disappear or lose weight.',
      ],
      bodyTimings: [143, 356, 716],
      image: 'images/features/context-window-drift.png',
      imageHeight: 820,
      durationInFrames: 878,
    },

    // SRT 51–57 (2:48.52–3:15.20) — sign of drift + fix, combined as split-contrast (808f)
    // VO left  (SRT 51–52): "When the output starts feeling like the model has forgotten
    //      your original direction — that's usually what's happening."
    // VO right (SRT 53–57): "Start a fresh conversation … ask the AI to summarize,
    //      copy original files, prompt that into a new chat."
    // Scene start = SRT 51 (168.52s). SRT 53 = 175.76s.
    // Right column at SRT 53: (175.76 − 168.52) × 30 = 217f
    // rightBodyDelay: 217 − 18 = 199f  |  highlights right: 217 − 12 = 205f
    {
      layout: 'split-contrast',
      leftLabel: 'THE SYMPTOM',
      leftTitle: 'Output starts to drift.',
      leftBody: 'The model has forgotten your original direction — the thread has grown too long.',
      rightLabel: 'THE FIX',
      rightTitle: 'Start a Fresh Conversation',
      rightBody: 'Ask the AI to summarize · copy original files · open a new chat with a clean context window.',
      showDivider: false,
      leftBodyDelay: 0,
      rightBodyDelay: 199,
      highlights: [
        { from: 0,   value: 'left' },
        { from: 205, value: 'right' },
      ],
      durationInFrames: 808,
    },

    // SRT 58–60 (3:15.48–3:30.12) — bottom line: 70–80% right (stat-hero)
    // VO: "The next time you get back an AI output that feels 70% or 80% right,
    //      that's exactly the moment."
    {
      layout: 'stat-hero',
      stat: '70–80%',
      label: 'WHEN TO SEND FEEDBACK',
      context: 'The next time an output feels 70–80% right — that\'s exactly the moment. Don\'t rewrite it.',
      contextTiming: 0,
      durationInFrames: 440,
    },

    // SRT 61–63 (3:30.12–3:41.12) — the action (big-statement)
    // VO: "Don't rewrite the answer or start all over again.
    //      Just say exactly what's off and send one more message."
    {
      layout: 'big-statement',
      text: "Don't rewrite.\nJust say exactly what's off.",
      highlight: "exactly what's off",
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 330,
    },

    // blank outro
    {
      layout: 'blank',
      durationInFrames: 150,
    },

  ],
};
