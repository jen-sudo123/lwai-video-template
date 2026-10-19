import { VideoData } from '../scenes/types';
import { promptingFrontierModelsCaptions } from './prompting-frontier-models-captions';

// Audio: "Prompt with advanced models.wav" — 324.66s total → ~9740 frames at 30fps
// Title card (45f) sits over the first 1.5s of audio.
// All scene start frames = (VTT timestamp × 30) + 45.
//
// VTT-derived audio frames (×30 fps + 45):
//   0:00.000 →    45f   VO start — "As frontier models have become..."
//   0:30.600 →   963f   "What these models really need is a very strong output brief"
//   0:35.080 →  1097f   output brief definition
//   0:46.520 →  1441f   "a couple of tips"
//   0:51.040 →  1576f   "Let's first look at GPT 5.5" → GPT header
//   0:54.600 →  1683f   Tip 1 begins → GPT checklist scene start
//   1:27.960 →  2684f   Tip 2 begins (absolute rules)
//   2:07.320 →  3865f   Tip 3 begins (constraints)
//   2:27.000 →  4455f   Tip 4 begins (guard details)
//   2:46.000 →  5025f   Tone note begins (5th item)
//   3:22.480 →  6119f   "Let us take a look at Claude Opus 4.8" → Claude header
//   3:26.040 →  6226f   Claude Tip 1 begins → Claude checklist scene start
//   3:48.560 →  6902f   Claude Tip 2 begins (precise constraints)
//   4:06.600 →  7443f   Claude Tip 3 begins (tone)
//   4:24.480 →  7979f   Claude Tip 4 begins (deeper thinking)
//   4:44.200 →  8571f   Outro begins ("much smarter co-worker")
//   4:58.960 →  9014f   CODO tie-in begins
//   5:23.640 →  9754f   Audio end
//
//   scene                              | frames          | dur   | layout
//   -----------------------------------|-----------------|-------|--------------------
//   title card                         |    0 →    44   |    45 | title-card-green
//   intro — the shift                  |   45 →  1575   |  1531 | big-statement
//   GPT-5.5 section header             | 1576 →  1682   |   107 | title-slide-transition
//   GPT-5.5 tips (all 5, highlighted)  | 1683 →  6118   |  4436 | checklist-slide
//   Claude Opus 4.8 section header     | 6119 →  6225   |   107 | title-slide-transition
//   Claude tips (all 4, highlighted)   | 6226 →  8570   |  2345 | checklist-slide
//   outro — smarter co-worker          | 8571 →  9013   |   443 | big-statement
//   CODO tie-in — the Output           | 9014 →  9799   |   786 | checklist-slide

export const promptingFrontierModels: VideoData = {
  audioSrc: 'audio/Prompt with advanced models.wav',
  avatarSrc: 'avatar-prompting-frontier.mp4',
  scenes: [

    // — title card (0→44)
    {
      layout: 'title-card-green',
      title: 'Prompting the New Frontier Models',
      subtitle: 'GPT-5.5 & Claude Opus 4.8',
      durationInFrames: 45,
    },

    // 0:00→0:09 — The shift: frontier models are more sophisticated
    // VO: "As frontier models have become more sophisticated, they actually require
    //      more specific prompting techniques to unlock their full potential."
    // frames 45→313 (269f)
    {
      layout: 'big-statement',
      text: 'Frontier models have evolved.\nThey need more specific prompting.',
      highlight: 'more specific prompting',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 269,
    },

    // 0:09→0:18 — GPT-5.5 & Opus 4.8: stop over-explaining
    // VO: "So with models like GPT 5.5 and Claude Opus 4.8, you usually don't need
    //      to over-explain the process."
    // frames 314→600 (287f)
    {
      layout: 'big-statement',
      text: 'With GPT-5.5 and Claude Opus 4.8,\nstop over-explaining the process.',
      highlight: 'stop over-explaining',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 287,
    },

    // 0:18→0:30 — The problem: step-by-step makes answers mechanical
    // VO: "In fact, if you provide too much step-by-step instructions, it can make
    //      the answer feel a bit mechanical, or it can limit the model's ability
    //      to find a better path."
    // frames 601→962 (362f)
    {
      layout: 'big-statement',
      text: 'Too much step-by-step\nmakes answers feel mechanical.',
      highlight: 'mechanical',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 362,
    },

    // 0:30→0:51 — The answer: a strong Output Brief
    // VO: "What these models really need is a very strong output brief. So defining
    //      what good looks like by telling them the goal, the audience, the quality bar,
    //      the format, the length, the constraints, but also what to avoid."
    //      "So there's a couple of tips I want to give you to put that into practice."
    // frames 963→1575 (613f)
    // Items appear as each is mentioned in the VO (scene-relative frames).
    //   0:30.6 → 0f: scene opens on "output brief"
    //   0:35.1 → 135f: "goal"
    //   0:37.5 → 207f: "audience"
    //   0:39.0 → 252f: "quality bar"
    //   0:41.6 → 330f: "format"
    //   0:42.5 → 357f: "length"
    //   0:43.5 → 387f: "constraints"
    //   0:44.5 → 417f: "what to avoid"
    {
      layout: 'checklist-slide',
      label: 'THE OUTPUT BRIEF',
      title: 'Define "What Good Looks Like"',
      items: [
        'The goal',
        'The audience',
        'The quality bar',
        'The format',
        'The length',
        'The constraints',
        'What to avoid',
      ],
      itemTimings: [223, 252, 295, 332, 351, 367, 428],
      durationInFrames: 613,
    },

    // 0:51→0:54 — GPT-5.5 section header
    // VO: "Let's first look at GPT 5.5."
    {
      layout: 'title-slide-transition',
      text: 'GPT-5.5',
      label: '5 PROMPTING TIPS',
      durationInFrames: 107,
    },

    // 0:54→3:22 — GPT-5.5 all 5 tips in one process-steps scene.
    // All steps appear immediately (stepTimings all 0).
    // Left column (tips 1–3) stays active while tips 1–3 are discussed;
    // right column (tips 4–5) becomes active at tip 4.
    // activeTimings / rightActiveTimings control which step lights up within its column.
    //
    // Scene-relative frame timings (scene start = 1683):
    //   Tip 1 at 0:54.600 → relative   0  (left col, step 0)
    //   Tip 2 at 1:27.960 → relative 1001  (left col, step 1)
    //   Tip 3 at 2:07.320 → relative 2182  (left col, step 2)
    //   Tip 4 at 2:27.000 → relative 2772  (right col, step 0)
    //   Tone  at 2:46.000 → relative 3342  (right col, step 1)
    {
      layout: 'process-steps',
      label: 'GPT-5.5',
      title: '5 Prompting Tips',
      steps: [
        {
          title: 'Define the destination',
          body: 'Describe the outcome and let the model choose the path. Not step-by-step instructions.',
        },
        {
          title: 'Use decision rules',
          body: 'Reserve "always/never/must" for hard rules. Use conditionals for judgment calls.',
        },
        {
          title: 'Add constraints',
          body: 'Set limits: word count, scope, or "stop once you have enough evidence."',
        },
      ],
      stepTimings: [0, 0, 0],
      activeTimings: [0, 1001, 2182],
      rightLabel: 'GPT-5.5',
      rightSteps: [
        {
          title: 'Guard unsupported details',
          body: 'Specify which claims must come from sources and which parts may be creative.',
        },
        {
          title: 'Define personality & style',
          body: 'GPT-5.5 defaults to task-oriented. Add warmth and collaboration style for human-facing tasks.',
        },
      ],
      rightStepTimings: [0, 0],
      rightActiveTimings: [2772, 3342],
      highlights: [
        { from: 0,    value: 'left' },
        { from: 2760, value: 'right' },
      ],
      durationInFrames: 4241,
    },

    // 3:17→3:22 — GPT-5.5 suggested prompt structure (OpenAI template)
    // VO: "Open AI has this suggested prompt structure that you can copy. It's in the text below."
    // frames 5924→6118 (195f)
    {
      layout: 'label-title-body',
      label: 'GPT-5.5 SYSTEM PROMPT TEMPLATE',
      title: 'A structure you can copy.',
      body: [
        '#Role: 1-2 sentences defining the model\'s function, context, and job',
        '#Personality: tone, demeanor, and collaboration style',
        '#Goal: user-visible outcome',
        '#Success criteria: what must be true before the final answer',
        '#Constraints: policy, safety, business, evidence, and side-effect limits',
        '#Output: sections, length, and tone',
        '#Stop rules: when to retry, fallback, abstain, ask, or stop',
      ],
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 195,
    },

    // 3:22→3:26 — Claude Opus 4.8 section header
    // VO: "Let us take a look at Claude Opus 4.8."
    {
      layout: 'title-slide-transition',
      text: 'Claude Opus 4.8',
      label: '4 PROMPTING TIPS',
      durationInFrames: 107,
    },

    // 3:26→4:44 — Claude Opus 4.8 all 4 tips in one process-steps scene.
    // Single column — 4 steps fit vertically. All appear at frame 0.
    // activeTimings control which step lights up.
    //
    // Scene-relative frame timings (scene start = 6226):
    //   Tip 1 at 3:26.040 → relative   0
    //   Tip 2 at 3:48.560 → relative 676
    //   Tip 3 at 4:06.600 → relative 1217
    //   Tip 4 at 4:24.480 → relative 1753
    {
      layout: 'process-steps',
      label: 'CLAUDE OPUS 4.8',
      title: '4 Prompting Tips',
      steps: [
        {
          title: 'State the full scope',
          body: 'Claude follows instructions literally. Say "revise the full document," not just "improve the intro."',
        },
        {
          title: 'Name constraints precisely',
          body: '"Be concise" is too vague. Say "keep each section to two paragraphs."',
        },
        {
          title: 'Prompt for tone explicitly',
          body: 'Opus 4.8 defaults to direct and opinionated. Add "use a warm, collaborative tone" for human-facing tasks.',
        },
        {
          title: 'Signal deeper thinking',
          body: 'For strategy or analysis, add: "This task requires multi-step reasoning. Think carefully through the trade-offs."',
        },
      ],
      stepTimings: [0, 0, 0, 0],
      activeTimings: [0, 676, 1217, 1753],
      durationInFrames: 2345,
    },

    // 4:44→4:59 — Outro: smarter co-worker analogy
    // VO: "Doesn't it sound like you're working with just a much smarter co-worker?
    //      And yes, that means you have to direct it a little bit differently."
    {
      layout: 'big-statement',
      text: "This is a much smarter co-worker.\nDirect them differently.",
      highlight: 'smarter co-worker',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 357,
    },

    // 4:59→end — CODO tie-in: show the full CODO acronym, Output spotlit when mentioned.
    // VO: "Now what does this mean for your CODO prompts? The biggest change is in
    //      the final O, the output."
    //
    // spotlightTimings: Output is index 3 (the final O).
    //   "the output" at 5:02.520 → scene-relative frame 107
    {
      layout: 'acronym-spotlight',
      label: 'YOUR CODO PROMPTS',
      items: [
        { letter: 'C', word: 'Character' },
        { letter: 'O', word: 'Objective' },
        { letter: 'D', word: "Do & Don't" },
        { letter: 'O', word: 'Output', detail: 'Goal · Audience · Quality bar\nFormat · Length · Constraints · What to avoid' },
      ],
      // Output is index 3 (the final O). Spotlight fires at scene-relative frame 107.
      spotlight: { index: 3, from: 107 },
      durationInFrames: 786,
    },

  ],
};
