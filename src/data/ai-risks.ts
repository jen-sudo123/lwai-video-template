import { VideoData } from '../scenes/types';

// AI Risks — a concept/explainer video (audio-only drop, no screen recording)
// covering four risk areas: incorrect information (hallucination), bias,
// sensitive information, and agentic/security risk — closing on human
// judgment and accountability.
//
// Audio: audio/ai-risks.wav = dumping/AI Risks.wav (222.04s) with 2.00s of
// silence prepended (224.04s). Video.tsx trims audioStartFrame frames off the
// file, so the pad must equal audioStartFrame or the VO plays 2s early.
// All t values below are ORIGINAL (unpadded) file times, as in ai-risks.json.
// Reveal timings = spoken phrase onset (snapped to the real pause end when
// Whisper puts the word inside a pause) minus an 8-frame lead.
// audioStartFrame: 60 (2s title card lead-in)
//
// Frame-accurate VO map (Whisper word timestamps on the raw audio,
// comp_frame = 60 + round(t*30)). See src/data/ai-risks.transcript.txt /
// ai-risks.json for the full transcript.
//
// Scene layout:
//  #    Layout                         Comp start  Duration  Comp end
//  0    title-card-green                      0        60        60
//  1    label-title-body                     60       443       503   (AI is useful)
//  2    label-title-body                    503       434       937   (four risks intro)
//  3-4  label-title-body                    937       579      1516   (hallucination defined + examples, merged)
//  5    doubt-confidence-diagram           1516       262      1778   (wrong answers look convincing)
//  6a   label-title-body                  1778       255      2033   (modern AI capabilities)
//  6b   big-statement                     2033       136      2169   (capable ≠ trustworthy)
//  7    big-statement                     2169       129      2298   (judgment checkpoint)
//  8    big-statement                     2298        59      2357   (bias introduced)
//  9    bias-funnel-diagram                2357       639      2996   (where bias comes from)
//  10   big-statement                     2996       248      3244   (missing perspectives)
//  11   label-title-body                  3244       165      3409   (sensitive info risk)
//  12   process-steps                     3409       476      3885   (three checks before sharing)
//  13   big-statement                     3885       135      4020   (organizational record)
//  14   process-steps                     4020       405      4425   (future review)
//  15   centered-quote                    4425       221      4646   (key question)
//  16   label-title-body                  4646       215      4861   (AI starts taking actions)
//  17   label-title-body                  4861       183      5044   (malicious instructions)
//  18   process-steps                     5044       158      5202   (actions increase stakes)
//  19   bounded-autonomy-diagram          5202       340      5542   (bounded autonomy)
//  20a  centered-quote                    5542       111      5653   (using AI does not transfer responsibility)
//  20b  label-title-body                  5653       172      5825   (you can use AI to...)
//  20c  big-statement                     5825       113      5938   (you remain accountable)
//  21   split-contrast                    5938       358      6296   (highly capable vs. can still fail)
//  22   centered-quote                    6296       182      6478   (human judgment)
//  23   title-slide-transition            6478       243      6721   (transition to next lesson)
//                                                              ─────
//                                                        Total: 6721 frames (224.0s)

export const aiRisks: VideoData = {
  audioSrc: 'audio/ai-risks.wav',
  audioStartFrame: 60,
  scenes: [
    // ── 00:00.00 → 00:02.00  title card (pre-VO silence) ──────────────────
    {
      layout: 'title-card-green',
      title: 'AI Risks',
      label: 'WHERE AI CAN GO WRONG',
      durationInFrames: 60,
    },

    // ── 00:01.74 → 00:14.76  AI is useful ──────────────────────────────────
    // VO: "We have spent a lot of time talking about how helpful AI can be,
    //      and rightly so, AI can help you work faster, improve output
    //      quality and take on work that used to take much longer."
    {
      layout: 'label-title-body',
      label: 'WHY AI HELPS',
      title: 'AI Can Make You Faster',
      body: [
        'Faster work: Get more done in less time',
        'Better output: Higher quality drafts and analysis',
        'More capacity: Take on work that used to take longer',
      ],
      bodyTimings: [252, 295, 347],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'sparkles', 'rocket'],
      durationInFrames: 443,
    },

    // ── 00:14.76 → 00:29.24  but there are risks ──────────────────────────
    // VO: "But becoming fluent with AI also means understanding where it can
    //      go wrong. AI can give you incorrect information, it can reflect
    //      bias, it can expose sensitive data or create new security and
    //      governance risks."
    {
      layout: 'label-title-body',
      label: 'BECOMING AI FLUENT',
      title: 'Understanding Where It Can Go Wrong',
      body: [
        "Incorrect information: Confident answers that are still wrong",
        'Bias: Reflects gaps in what it learned from',
        "Sensitive data: Information that shouldn't have been shared",
        'Security & governance: New risks as AI touches more systems',
      ],
      bodyTimings: [186, 234, 274, 327],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['x', 'user', 'eye', 'sliders'],
      durationInFrames: 434,
    },

    // ── 00:29.24 → 00:48.52  hallucination introduced + examples (merged
    //                          into one scene) ─────────────────────────────
    // VO: "One of the best known risks is hallucination. This is when AI
    //      generates information that sounds plausible but is inaccurate or
    //      entirely invented. It might give you a wrong number, invent a
    //      source, misattribute a quote or confidently describe something
    //      that never happened."
    {
      layout: 'label-title-body',
      label: 'RISK 1 OF 4',
      title: 'Hallucination',
      titleNote: 'Information that sounds plausible, but is inaccurate or invented',
      titleNoteDelay: 113,
      body: [
        "Wrong number: A stat that doesn't hold up",
        "Invented source: A citation or report that doesn't exist",
        'False quote: Words attributed to the wrong person',
        'Made-up event: A meeting or decision that never happened',
      ],
      bodyTimings: [330, 380, 425, 455],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['x', 'x', 'x', 'x'],
      durationInFrames: 579,
    },

    // ── 00:48.52 → 00:57.28  wrong answers look convincing ────────────────
    // VO: "And the danger is that wrong answers don't always look wrong. AI
    //      can present an incorrect answer with the same confidence and
    //      polish as a correct one."
    {
      layout: 'doubt-confidence-diagram',
      label: 'THE DANGER',
      title: "Wrong Answers Don't Look Wrong",
      titleHighlight: 'Wrong',
      cardAppearFrame: 0,
      confidentAppearFrame: 0,
      notEqualAppearFrame: 168,
      durationInFrames: 262,
    },

    // ── 00:57.28 → 01:05.78  modern AI capabilities ───────────────────────
    // VO: "Modern AI systems can search the web, work with documents, use
    //      tools and reason through complex questions."
    {
      layout: 'label-title-body',
      label: 'MORE CAPABLE THAN EVER',
      title: 'What Modern AI Can Do',
      body: ['Search the web', 'Work with documents', 'Use tools', 'Reason through complex questions'],
      bodyTimings: [64, 104, 143, 163],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'pencil', 'sliders', 'lightbulb'],
      durationInFrames: 255,
    },

    // ── 01:05.78 → 01:10.30  capable ≠ trustworthy ────────────────────────
    // VO: "But that still doesn't mean that every answer is automatically
    //      trustworthy."
    {
      layout: 'big-statement',
      text: 'More capable ≠\nautomatically trustworthy.',
      highlight: 'trustworthy.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 136,
    },

    // ── 01:10.30 → 01:14.60  human judgment checkpoint ────────────────────
    // VO: "A polished answer is still something you need to judge."
    {
      layout: 'big-statement',
      text: 'A polished answer is still\nsomething you need to judge.',
      highlight: 'need to judge.',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 129,
    },

    // ── 01:14.60 → 01:16.58  bias introduced ───────────────────────────────
    // VO: "AI can also reflect bias."
    {
      layout: 'big-statement',
      label: 'RISK 2 OF 4',
      text: 'AI Can Also Reflect Bias.',
      highlight: 'Bias.',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 59,
    },

    // ── 01:16.58 → 01:37.86  where bias comes from ────────────────────────
    // VO: "Models learn from huge amounts of human-created information
    //      containing cultural assumptions, dominant viewpoints, gaps and
    //      uneven representation. The answer that you get may be influenced
    //      by the language that you use, the context that's available, how
    //      the model was trained and how you frame your question."
    {
      layout: 'bias-funnel-diagram',
      durationInFrames: 639,
    },

    // ── 01:37.86 → 01:46.12  missing perspectives ─────────────────────────
    // VO: "So don't only ask, did AI give me an answer, but also ask, what
    //      perspective might be missing?"
    {
      layout: 'big-statement',
      text: 'Ask: what perspective\nmight be missing?',
      highlight: 'might be missing?',
      size: 'hero',
      animation: 'kinetic',
      durationInFrames: 248,
    },

    // ── 01:46.12 → 01:51.62  sensitive information risk ───────────────────
    // VO: "Another major risk is the information that you put into AI
    //      systems."
    {
      layout: 'label-title-body',
      label: 'RISK 3 OF 4',
      title: 'Sensitive Information',
      body: ['What you put into an AI system can carry real risk'],
      bodyTimings: [0],
      durationInFrames: 165,
    },

    // ── 01:51.62 → 02:07.50  three checks before sharing ──────────────────
    // VO: "Before sharing any sensitive information, you want to know
    //      whether the tool was approved, what information you are allowed
    //      to provide and what your organization's policies require. And
    //      there is another consideration that is easy to overlook."
    {
      layout: 'process-steps',
      label: 'BEFORE YOU SHARE',
      title: 'Three Checks Before Sharing',
      steps: [
        { title: 'Approved tool?', body: 'Is this tool cleared for this kind of data?' },
        { title: 'Allowed data?', body: "What are you actually allowed to provide?" },
        { title: 'Org policy?', body: 'What does your organization require?' },
      ],
      stepTimings: [98, 163, 257],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 476,
    },

    // ── 02:07.50 → 02:12.00  organizational record ─────────────────────────
    // VO: "What you enter into AI may become part of your organization's
    //      record."
    {
      layout: 'big-statement',
      text: "What you enter into AI may\nbecome part of your organization's record.",
      highlight: "organization's record.",
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 135,
    },

    // ── 02:12.00 → 02:25.50  future review ─────────────────────────────────
    // VO: "Depending on the tool and the settings, prompts and responses may
    //      be retained and could potentially be reviewed later in an
    //      internal investigation, regulatory inquiry or a legal dispute."
    {
      layout: 'process-steps',
      label: 'LATER, IT MAY BE REVIEWED',
      title: 'Prompts and Responses Can Resurface',
      steps: [
        { title: 'Internal review', body: 'A manager or compliance check' },
        { title: 'Regulatory inquiry', body: 'A regulator asking questions' },
        { title: 'Legal dispute', body: 'Evidence in a legal proceeding' },
      ],
      stepTimings: [208, 279, 308],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 405,
    },

    // ── 02:25.50 → 02:32.86  key question before prompting ────────────────
    // VO: "So ask, would I be comfortable with this becoming part of the
    //      organizational record before using AI?"
    {
      layout: 'centered-quote',
      text: 'Would I be comfortable with this\nbecoming part of the organizational record?',
      durationInFrames: 221,
    },

    // ── 02:32.86 → 02:40.02  AI starts taking actions ─────────────────────
    // VO: "Now as AI starts interacting with websites, files, software and
    //      other systems, the risks increase."
    {
      layout: 'label-title-body',
      label: 'THE RISKS INCREASE',
      title: 'AI Starts Taking Actions',
      body: ['Websites', 'Files', 'Software', 'Business systems'],
      bodyTimings: [48, 70, 88, 97],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['eye', 'pencil', 'sliders', 'trending'],
      durationInFrames: 215,
    },

    // ── 02:40.02 → 02:46.12  malicious instructions ───────────────────────
    // VO: "AI may encounter malicious or misleading instructions in the
    //      information that it processes."
    // This — not the previous scene's expanding access — is the actual
    // fourth risk (the "security & governance" card from the four-risks
    // intro): untrusted instructions hidden in what AI reads.
    {
      layout: 'label-title-body',
      label: 'RISK 4 OF 4',
      title: 'Untrusted Instructions',
      body: ['Hidden instructions inside a webpage or document AI reads'],
      bodyTimings: [5],
      durationInFrames: 183,
    },

    // ── 02:46.12 → 02:51.40  actions increase the stakes ──────────────────
    // VO: "This matters even more when AI can take actions, not just
    //      generate text."
    {
      layout: 'process-steps',
      label: 'THE STAKES GO UP',
      title: 'From Text to Action',
      steps: [
        { title: 'Generate text', body: 'A draft or an answer' },
        { title: 'Access systems', body: 'Read files, browse, or use tools' },
        { title: 'Take action', body: 'Make a change on your behalf' },
      ],
      stepTimings: [0, 50, 100],
      horizontal: true,
      cardStyle: true,
      durationInFrames: 158,
    },

    // ── 02:51.40 → 03:02.74  bounded autonomy ──────────────────────────────
    // VO: "It's why organizations increasingly control what AI can access,
    //      what it can do and where human approval is required. And one
    //      principle matters above all."
    {
      layout: 'bounded-autonomy-diagram',
      aiFrame: 0,
      humanFrame: 122,
      approvalFrame: 153,
      durationInFrames: 340,
    },

    // ── 03:02.74 → 03:06.44  using AI does not transfer responsibility ─────
    // VO: "Using AI does not transfer responsibility to the AI."
    {
      layout: 'centered-quote',
      text: 'Using AI does not transfer\nresponsibility to the AI.',
      durationInFrames: 111,
    },

    // ── 03:06.44 → 03:12.19  you can use AI to... ───────────────────────────
    // VO: "If you use AI to create work, make recommendations or influence
    //      decisions..."
    {
      layout: 'label-title-body',
      label: 'CREATE · RECOMMEND · INFLUENCE',
      title: 'You Can Use AI To…',
      body: ['Create work', 'Make recommendations', 'Influence decisions'],
      bodyTimings: [52, 89, 119],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'chat-bubble-left-right', 'compare'],
      durationInFrames: 172,
    },

    // ── 03:12.19 → 03:15.92  you remain accountable ─────────────────────────
    // VO: "...you still remain accountable for the results."
    // Starts 25 frames (0.83s) before "remain" is actually spoken (was
    // starting exactly on it), so the kinetic word-by-word reveal (10-frame
    // fade per word, staggered 4 frames apart) has time to fully land each
    // word before the VO says it, instead of still mid-fade when it does.
    {
      layout: 'big-statement',
      text: 'You remain accountable\nfor the results.',
      highlight: 'accountable',
      size: 'title',
      animation: 'kinetic',
      durationInFrames: 113,
    },

    // ── 03:15.92 → 03:27.76  highly capable vs. can still fail ─────────────
    // VO: "The bottom line is that AI fluency is not just about how to get
    //      more out of AI. It's also knowing that AI can be extremely
    //      capable while still being wrong, biased or risky."
    {
      layout: 'split-contrast',
      leftLabel: 'HIGHLY CAPABLE',
      leftTitle: 'Extremely capable.',
      rightLabel: 'CAN STILL FAIL',
      rightTitle: 'Wrong, biased, or risky.',
      highlights: [
        { from: 0, value: 'left' },
        { from: 232, value: 'right' },
        { from: 300, value: null },
      ],
      durationInFrames: 358,
    },

    // ── 03:27.76 → 03:33.92  human judgment ─────────────────────────────────
    // VO: "And regardless of how capable the technology becomes, human
    //      judgment remains essential."
    {
      layout: 'centered-quote',
      text: 'Human judgment remains essential,\nno matter how capable the technology gets.',
      highlight: 'remains essential',
      highlightFrame: 119,
      durationInFrames: 182,
    },

    // ── 03:33.92 → end (04:02.04)  transition to next lesson ──────────────
    // VO: "Later we'll look more closely at how AI fails and how to check
    //      important AI generated work before you rely on it."
    {
      layout: 'title-slide-transition',
      label: 'NEXT LESSON',
      text: 'How AI Fails,\nand How to Check It',
      centered: true,
      durationInFrames: 243,
    },
  ],
};
