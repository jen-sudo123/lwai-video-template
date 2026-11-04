import { VideoData } from '../scenes/types';

// Claude Overview (replaces the older `Claude` video, src/data/claude.ts)
// Audio: audio/claude-overview.mp3 (187.7s, Daan, ElevenLabs eleven_v4, take 1). Starts at frame 0.
// Clip:  video/claude-day1.mp4 (reused from the `Claude` video) for Features / Artifacts / Plugins / Search / Code.
// Images: claude-overview/images/ (Drive folder 1p_bmFuQ7q_j8i7PIltg8Vi-y7FiqfqnR) for Projects / Voice / Models.
// Timings: src/data/claude-overview.transcript.json (ElevenLabs Scribe word timestamps on the unpadded file).
// Local frame = round((word_t − scene_start_s) × 30).
//
//  #   Layout                       Start   Dur    End   VO anchor (s)
//  1   title-card-green                 0    60     60
//  2   label-title-body (About)        60   518    578   "Claude can help" 8.80
//  3   label-title-body (Const. AI)   578   384    962   19.28
//  4   video-clip (Features)          962    66   1028   32.08
//  5   video-clip (Artifacts)        1028   316   1344   34.27
//  6   label-title-body (Projects)   1344   348   1692   44.79
//  7   video-clip (Plugins)          1692   139   1831   56.40
//  8   video-clip (Search)           1831   223   2054   61.04
//  9   label-title-body (Voice)      2054   161   2215   68.48
// 10   video-clip (Claude Code)      2215   388   2603   73.84
// 11   label-title-body (Models)     2603   123   2726   86.77
// 12   Fable                         2726   344   3070   90.88
// 13   Opus                          3070   338   3408   102.32
// 14   Sonnet                        3408   295   3703   113.60
// 15   Haiku                         3703   231   3934   123.44
// 16   Effort                        3934   367   4301   131.12
// 17   Plans                         4301   481   4782   143.36
// 18   Pricing page                  4782   251   5033   159.40
// 19   Privacy                       5033   622   5655   167.76 → end 187.84
//                                       Total: 5655 frames (188.5s)

const IMG = 'claude-overview/images';
const CLIP = 'video/claude-day1.mp4';

export const claudeOverview: VideoData = {
  audioSrc: 'audio/claude-overview.mp3',
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Claude',
      label: 'SELECTING LLMs',
      durationInFrames: 60,
    },

    // VO: "Claude is an AI assistant built by Anthropic… capable, reliable, and safe.
    //      Claude can help you write, edit, code…"
    {
      layout: 'label-title-body',
      label: 'ABOUT CLAUDE',
      title: 'Built by Anthropic',
      body: [
        'Focused on AI systems that are capable, reliable, and safe',
        'Write, edit, code, and make sense of complex information',
      ],
      bodyTimings: [118, 230], // "capable" 5.92, "write" 9.68
      durationInFrames: 518,
    },

    // VO: "Anthropic puts a strong emphasis on AI safety… Constitutional AI…"
    {
      layout: 'label-title-body',
      label: 'CONSTITUTIONAL AI',
      title: '"Constitutional" AI',
      body: [
        'A strong emphasis on AI safety',
        'Trains Claude to respond responsibly',
        'Extra care with sensitive or high-stakes requests',
      ],
      bodyTimings: [0, 191, 282], // "trains" 25.64, "extra" 28.68
      durationInFrames: 384,
    },

    // VO: "Let's look at the key features."
    {
      layout: 'video-clip',
      label: 'KEY FEATURES',
      title: 'Features',
      overlayPosition: 'center',
      videoSrc: CLIP,
      videoStartTime: 49,
      durationInFrames: 66,
    },

    // VO: "Artifacts let you create standalone documents, slides, code…"
    {
      layout: 'video-clip',
      label: 'ARTIFACTS',
      title: 'Create from Chat',
      body: ['Documents, slides, code, and interactive mini-apps. Iterate and share right from the chat.'],
      bodyTimings: [0],
      videoSrc: CLIP,
      videoStartTime: 51,
      durationInFrames: 316,
    },

    // VO: "Projects give you persistent workspaces. Your instructions, files, and context carry over…"
    {
      layout: 'label-title-body',
      label: 'PROJECTS',
      title: 'Persistent Workspaces',
      body: [
        'Instructions, files, and context carry over from one chat to the next',
        'No need to re-brief Claude every time',
      ],
      bodyTimings: [71, 263], // "Your" 47.16, "so you don't" 52.44
      image: `${IMG}/06_Projects_instructions_2026_05.png`,
      imageSwaps: [{ from: 103, src: `${IMG}/05_Projects_files_2026_05.png` }], // "files" 48.24
      durationInFrames: 348,
    },

    // VO: "Plugins package Skills and Connectors into reusable workflows."
    {
      layout: 'video-clip',
      label: 'PLUGINS',
      title: 'Reusable Workflows',
      body: ['Skills and Connectors, packaged together'],
      bodyTimings: [31], // "Skills" 57.44
      videoSrc: CLIP,
      videoStartTime: 72,
      durationInFrames: 139,
    },

    // VO: "Web Search and Research find current information online…"
    {
      layout: 'video-clip',
      label: 'SEARCH + RESEARCH',
      title: 'Live Web Access',
      body: ['Current information online. Deeper questions across multiple sources.'],
      bodyTimings: [0],
      videoSrc: CLIP,
      videoStartTime: 84,
      durationInFrames: 223,
    },

    // VO: "And Voice mode supports full spoken conversations, as well as hands-free dictation."
    {
      layout: 'label-title-body',
      label: 'VOICE MODE',
      title: 'Speak to Claude',
      body: ['Full spoken conversations', 'Hands-free dictation'],
      bodyTimings: [43, 113], // "full" 69.92, "hands-free" 72.24
      images: [`${IMG}/09_Voice_controls.png`, `${IMG}/10_Voice_settings.png`],
      imageTimings: [0, 60],
      durationInFrames: 161,
    },

    // VO: "For more technical work, there's Claude Code. It's an agentic coding assistant…"
    {
      layout: 'video-clip',
      label: 'CLAUDE CODE',
      title: 'Agentic Coding Assistant',
      body: ['Runs in your terminal. Reads your repo, edits files, runs commands, handles version control.'],
      bodyTimings: [93], // "agentic" 76.92
      videoSrc: CLIP,
      videoStartTime: 109.5,
      durationInFrames: 388,
    },

    // VO: "Claude comes in four model families, each with a different job."
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Four Model Families',
      body: ['Each with a different job'],
      bodyTimings: [69], // "each" 89.04
      image: `${IMG}/model_wordmarks_stack.png`, // the four wordmarks stacked (generated from 14/18/19/20)
      imageHeight: 560,
      durationInFrames: 123,
    },

    // VO: "Fable is Anthropic's most advanced…"
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Fable 5.1',
      body: [
        'Most advanced. The hardest reasoning, research, and coding work.',
        'Long-running workflows that keep going for hours, or even days',
      ],
      bodyTimings: [101, 201], // "hardest" 94.24, "long-running" 97.56
      image: `${IMG}/18_Fable_wordmark.png`,
      imageHeight: 200,
      durationInFrames: 344,
    },

    // VO: "Opus comes close to Fable-level intelligence at a lower cost…"
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Opus 5.5',
      body: [
        'Close to Fable-level intelligence at a lower cost',
        'Complex analysis, coding, and multi-step work where quality matters',
      ],
      bodyTimings: [19, 134], // "comes" 102.96, "strong" 106.80
      image: `${IMG}/14_Opus_wordmark.png`,
      imageHeight: 200,
      durationInFrames: 338,
    },

    // VO: "Sonnet is the everyday workhorse…"
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Sonnet 5.5',
      body: [
        'The everyday workhorse',
        'Best balance of speed and quality for writing, analysis, and documents',
      ],
      bodyTimings: [24, 92], // "everyday" 114.40, "best" 116.68
      image: `${IMG}/19_Sonnet_wordmark.png`,
      imageHeight: 200,
      durationInFrames: 295,
    },

    // VO: "And Haiku is the fastest and most economical…"
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Haiku 5.5',
      body: ['Fastest and most economical', 'Quick requests, simple tasks, and high-volume work'],
      bodyTimings: [26, 115], // "fastest" 124.56, "quick" 127.28
      image: `${IMG}/20_Haiku_wordmark.png`,
      imageHeight: 200,
      durationInFrames: 231,
    },

    // VO: "You can switch models when you start a new chat, and set the Effort level…"
    {
      layout: 'label-title-body',
      label: 'EFFORT',
      title: 'Pick a Model, Set the Effort',
      body: [
        'Switch models when you start a new chat',
        'Set Effort anywhere from Low to Max',
        'Higher effort: better results on complex tasks, but more time and tokens',
      ],
      bodyTimings: [10, 91, 180], // "switch" 131.44, "Effort" 134.16, "Higher" 137.12
      durationInFrames: 367,
    },

    // VO: "Claude offers several plans. There's a Free tier… Pro and Max… Team and Enterprise…"
    {
      layout: 'label-title-body',
      label: 'PRICING',
      title: 'Plans for Every Scale',
      body: [
        'Free: everyday use',
        'Pro and Max: more power and higher limits for individuals',
        'Team and Enterprise: shared administration, security, and controls',
      ],
      bodyTimings: [44, 106, 245], // "Free" 145.76, "Pro" 147.84, "Team" 152.48
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'bolt', 'building-office'],
      bodyCardCompact: true,
      durationInFrames: 481,
    },

    // VO: "Plans and features change often… claude.com/pricing."
    {
      layout: 'label-title-body',
      label: 'COMPARE PLANS',
      title: 'claude.com/pricing',
      body: ['Plans and features change often. Check here for the latest details.'],
      bodyTimings: [0],
      durationInFrames: 251,
    },

    // VO: "Finally, a word on privacy. On personal plans… On organizational plans…"
    {
      layout: 'label-title-body',
      label: 'PRIVACY',
      title: 'Your Data, Your Control',
      body: [
        'Personal plans: review privacy and data-sharing preferences in Settings',
        'Organizational plans: extra admin controls. Business data not used for training by default.',
      ],
      bodyTimings: [65, 247], // "On personal" 169.92, "On organizational" 176.00
      durationInFrames: 622,
    },
  ],
};
