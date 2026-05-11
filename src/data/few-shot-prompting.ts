import { VideoData } from '../scenes/types';

// Technique 4: Few-Shot Prompting
// Audio: few-shot-prompting.mp3 — VO ends at 211.24s, file is 213.28s.
// Scenes aligned to whisper-extracted segment timestamps.
//
//  scene                                | VO clip start  | end       | dur (frames @30fps)
//  -------------------------------------|----------------|-----------|--------------------
//  1  title card (silent intro)         |  0.00          |  2.60     |  78
//  2  big-statement (hook)              |  1.04          | 12.84     | 307
//  3  big-statement (pattern insight)   | 12.84          | 27.87     | 451
//  4  label-title-body (definition)     | 27.88          | 45.54     | 530
//  5  big-statement (simple idea)       | 45.54          | 56.27     | 322
//  6  chat-thread (tone example)        | 56.26          | 90.37     | 1023
//  7  process-steps (leadership format) | 90.36          | 111.10    | 622
//  8  prompt-example (paste vs explain) | 111.08         | 128.80    | 531
//  9  checklist-slide (example quality) | 128.80         | 163.67    | 1046
//  10 big-statement (one strong)        | 162.64         | 169.67    | 180
//  11 checklist-slide (when to use)     | 169.64         | 192.73    | 692
//  12 big-statement (closing)           | 192.70         | 213.28    | 617
//                                                          total       6399

export const fewShotPrompting: VideoData = {
  audioSrc: 'audio/few-shot-prompting.mp3',
  avatarSrc: 'avatar.mp4',
  scenes: [
    // 1 — Title (silent intro 00:00 → 00:02.60)
    {
      layout: 'title-card-green',
      title: 'Few-Shot Prompting',
      durationInFrames: 78,
    },

    // 2 — Hook: the problem (00:01.04 → 00:12.84, ~11.8s)
    // VO: "If you ever spent 5 minutes writing a prompt that explains exactly how you
    //      want something formatted only to get back something that almost, but doesn't
    //      quite match, this technique solves that."
    {
      layout: 'big-statement',
      text: "Spent 5 minutes on instructions.\nStill didn't quite match.",
      highlight: "Still didn't quite match",
      fontSize: 68,
      animation: 'fade',
      lineTimings: [0, 116],
      durationInFrames: 307,
    },

    // 3 — Pattern recognition insight (00:12.84 → 00:27.87, ~15s)
    // VO: "AI is exceptionally good at pattern recognition. When you show it what good
    //      looks like, it infers the rules that you otherwise would spend time articulating.
    //      Because examples are often much clearer than detailed instructions."
    {
      layout: 'big-statement',
      label: 'AI IS EXCEPTIONALLY GOOD AT',
      text: "Pattern recognition.\nExamples are often clearer than instructions.",
      highlight: "clearer than instructions",
      fontSize: 58,
      animation: 'fade',
      lineTimings: [0, 276],
      durationInFrames: 451,
    },

    // 4 — Definition + CODO framing (00:27.88 → 00:45.54, ~17.7s)
    // VO: "Few-shot prompting is the technique of giving AI examples before asking it to
    //      produce a new output. It's what the final O for outcome in CODO stands for and
    //      at this level it's one of the highest-leveraged things you can do to raise the
    //      quality of everything you produce with AI."
    {
      layout: 'label-title-body',
      label: 'PROMPTING TECHNIQUE',
      title: 'Few-Shot Prompting',
      body: [
        'Give AI examples before asking it to produce a new output.',
        'The O in CODO — one of the highest-leverage techniques you have.',
      ],
      bodyTimings: [0, 191],
      durationInFrames: 530,
    },

    // 5 — The simple idea (00:45.54 → 00:56.27, ~10.7s)
    // VO: "So what does few-shot prompting look like in practice? Well the practical idea
    //      is simple. AI can learn from examples inside the prompt."
    {
      layout: 'big-statement',
      label: 'IN PRACTICE',
      text: "The practical idea is simple.\nAI learns from examples inside the prompt.",
      highlight: "learns from examples",
      fontSize: 62,
      animation: 'fade',
      lineTimings: [0, 113],
      durationInFrames: 322,
    },

    // 6 — Tone-matching chat example (00:56.26 → 01:30.37, ~34.1s)
    // VO: "So here we have two people talking to each other. Now humans would immediately
    //      identify that one is extremely excited and the other is a little more subdued.
    //      So then you say okay based on this example now write up a new one and the
    //      situation this time is the monthly town hall that's coming up. And so as you
    //      can see AI copied it perfectly. So instead of spending five minutes explaining
    //      every stylistic rule you give the AI a good example and let it infer the pattern."
    //
    //  highlights.value = count of visible messages
    //  frame 0   → show 2 example messages (two people talking)
    //  frame 373 → show user request (68.70s → local (68.70-56.27)*30 = 373)
    //  frame 632 → show AI output   (77.32s → local (77.32-56.27)*30 = 632)
    {
      layout: 'chat-thread',
      label: 'GIVE AN EXAMPLE',
      messages: [
        {
          role: 'user',
          tags: ['EXAMPLE — EXCITED TONE'],
          text: '"FIVE years in the making. I literally cannot believe we did it. I am beyond thrilled!!"',
        },
        {
          role: 'assistant',
          text: '"Good progress on the Henderson account. Terms are agreed. Paperwork to follow."',
          quality: 'standard',
        },
        {
          role: 'user',
          text: 'Now write one for the monthly town hall coming up.',
        },
        {
          role: 'assistant',
          text: '"Town hall next week. Strong quarter to share. Full update to follow."',
          quality: 'strong',
        },
      ],
      highlights: [
        { from: 0, value: 2 },
        { from: 373, value: 3 },
        { from: 632, value: 4 },
      ],
      durationInFrames: 1023,
    },

    // 7 — The leadership recommendation format (01:30.36 → 01:51.10, ~20.7s)
    // VO: "So more practically let's say you regularly write structured recommendations for
    //      your leadership team and you've developed a format that works. Maybe it's one
    //      sentence situation, a single clear recommendation and then two or three sentences
    //      of the rationale. And you want AI to produce outputs in that exact format without
    //      you having to describe it each time."
    //
    //  step 1 at (97.62-90.37)*30 = 218
    //  step 2 at (100.24-90.37)*30 = 296  (approx midpoint of "a single clear recommendation")
    //  step 3 at (102.76-90.37)*30 = 372
    {
      layout: 'process-steps',
      label: 'A FORMAT THAT WORKS',
      title: 'Your leadership recommendation.',
      steps: [
        { title: 'Situation', body: 'One sentence.' },
        { title: 'Recommendation', body: 'Single and clear.' },
        { title: 'Rationale', body: 'Two or three sentences.' },
      ],
      stepTimings: [218, 296, 372],
      durationInFrames: 622,
    },

    // 8 — Paste vs explain (01:51.08 → 02:08.80, ~17.7s)
    // VO: "So again instead of explaining the structure you just paste in a couple of
    //      examples that demonstrate it. The model will now read the pattern across all
    //      three and apply it to your new situation. And what comes back matches your
    //      format from the first line because you showed it three times and let the
    //      pattern speak for itself."
    //
    //  afterTiming at (116.18-111.10)*30 = 152
    {
      layout: 'prompt-example',
      label: 'INSTEAD OF EXPLAINING IT',
      title: 'Paste in examples. Let the pattern speak.',
      beforeLabel: 'THE SLOW WAY',
      before: 'Write a structured recommendation. Use one sentence for the situation, then give a single clear recommendation, followed by two or three sentences of rationale...',
      afterLabel: 'FEW-SHOT WAY',
      after: "Here are three leadership recommendations I've written before. Use this exact format for the following new situation.",
      afterTiming: 152,
      durationInFrames: 531,
    },

    // 9 — Example quality is everything (02:08.80 → 02:43.67, ~34.9s)
    // VO: "Now one thing worth noting here is that the example quality is everything.
    //      If the output misses the fix is almost always in the examples. Does it solve
    //      the right kind of problem or just a somewhat similar one? Does it reflect the
    //      quality standards that you actually want? And does it demonstrate the format
    //      clearly or could it introduce some ambiguity about the structure?"
    //
    //  item 1 at (140.02-128.80)*30 = 337
    //  item 2 at (150.48-128.80)*30 = 650
    //  item 3 at (156.22-128.80)*30 = 823
    {
      layout: 'checklist-slide',
      label: 'If the output misses...',
      title: 'The fix is almost always in the examples.',
      titleHighlight: 'in the examples',
      items: [
        'Does it solve the right kind of problem — not just a similar one?',
        'Does it reflect the quality standard you actually want?',
        'Does it demonstrate the format clearly, without ambiguity?',
      ],
      itemTimings: [337, 650, 823],
      durationInFrames: 1046,
    },

    // 10 — One strong beats three mediocre (02:43.67 → 02:49.67, ~6s)
    // VO: "And also one strong example always beats three mediocre ones because AI is
    //      very literal."
    {
      layout: 'big-statement',
      text: "One strong example\nbeats three mediocre ones.",
      highlight: "One strong example",
      fontSize: 72,
      animation: 'fade',
      lineTimings: [0, 55],
      durationInFrames: 180,
    },

    // 11 — When to reach for few-shot (02:49.67 → 03:12.73, ~23.1s)
    // VO: "That said, I recommend you reach for few-shot prompting whenever you already
    //      have an example of the output that you want. So this could be a strong email
    //      that you've written before or a memo format that your leadership team responds
    //      to well or a recommendation structure that has worked in past reviews.
    //      A tone and a style that reflects how you actually communicate."
    //
    //  item 1 at (176.96-169.67)*30 = 219
    //  item 2 at (182.04-169.67)*30 = 371
    //  item 3 at (185.00-169.67)*30 = 460  (approx "recommendation structure")
    //  item 4 at (188.48-169.67)*30 = 564
    {
      layout: 'checklist-slide',
      label: 'Reach for few-shot prompting when you have',
      title: 'An example of the output you want.',
      titleHighlight: 'An example',
      items: [
        "A strong email you've already written.",
        'A memo format your leadership team responds to.',
        'A recommendation structure that has worked before.',
        'A tone and style that reflects how you communicate.',
      ],
      itemTimings: [219, 371, 460, 564],
      durationInFrames: 692,
    },

    // 12 — Closing payoff (03:12.73 → 03:33.28, ~20.6s)
    // VO: "In that case, don't spend time describing it. Just paste it into your prompt,
    //      add one or two more examples if you have them, and just let the pattern do the
    //      work. That way, the output you otherwise would have spent 20 minutes editing
    //      into shape arrives ready to use from the first response."
    //
    //  line 1 at frame 0   (192.70s)
    //  line 2 at frame 74  (195.20s → local (195.20-192.73)*30 = 74)
    //  line 3 at frame 315 (203.24s → local (203.24-192.73)*30 = 315)
    {
      layout: 'big-statement',
      text: "Don't describe it. Paste it in.\nLet the pattern do the work.\nThe output arrives ready to use.",
      highlight: "arrives ready to use",
      fontSize: 56,
      animation: 'fade',
      lineTimings: [0, 74, 315],
      durationInFrames: 617,
    },
  ],
};
