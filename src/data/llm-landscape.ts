import { VideoData } from '../scenes/types';

// LLM Landscape — four major platforms, what they share, and cognitive diversification.
// VO: ElevenLabs eleven_v4, Daan, take 1 (generation qHma4F0sWWuX0TiTSgOv), 196.08s spoken.
// Script: llm-landscape.script.txt (v4 prompt: llm-landscape.v4.script.txt).
// Storyboard + VO anchors: llm-landscape.storyboard.md. Timings from ElevenLabs Scribe word
// timestamps on take 1. Audio starts at frame 0 (no audioStartFrame). No avatar.
//
//  #  layout               | comp frames  | dur
//  1  title-card-green     |    0-  165   | 165
//  2  label-title-body     |  165-  606   | 441
//  3  big-statement        |  606-  861   | 255
//  4  label-title-body     |  861- 1186   | 325
//  5  big-statement        | 1186- 1596   | 410
//  6  platform-logo-grid   | 1596- 1902   | 306
//  7  platform-logo-grid   | 1902- 2526   | 624
//  8  centered-quote       | 2526- 2806   | 280
//  9  label-title-body     | 2806- 3366   | 560
// 10  checklist-slide      | 3366- 3999   | 633
// 11  label-title-body     | 3999- 4266   | 267
// 12  big-statement        | 4266- 4563   | 297
// 13  checklist-slide      | 4563- 4935   | 372
// 14  split-contrast       | 4935- 5157   | 222
// 15  centered-quote       | 5157- 5397   | 240
// 16  takeaway-stack       | 5397- 5928   | 531
//                                  total   5928 (197.6s)

const LOGO = 'llm-landscape/images';

export const llmLandscape: VideoData = {
  audioSrc: 'audio/llm-landscape.mp3',
  scenes: [
    // 1 — 0:00.0. VO: "At this point, I'm assuming you already have a basic understanding of large language models."
    {
      layout: 'title-card-green',
      label: 'AI PLATFORMS',
      title: 'The LLM Landscape',
      durationInFrames: 165,
    },

    // 2 — 0:05.5. VO: "You roughly know how they work..." (5.56) / "You've heard about hallucinations..." (10.04)
    //     / "and why judgment and accountability..." (15.52)
    {
      layout: 'label-title-body',
      label: 'BEFORE WE START',
      title: 'What you already know',
      body: [
        'How LLMs work: What they do well, and where they fail',
        'Hallucinations: And how models predict language token by token',
        'Human judgment: Accountability always stays with people',
      ],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'eye', 'user'],
      bodyCardCompact: true,
      bodyTimings: [2, 136, 301],
      durationInFrames: 441,
    },

    // 3 — 0:20.2. VO: "If not, start with our AI Fundamentals Training (21.68), linked below this video..."
    {
      layout: 'big-statement',
      label: 'NEED A REFRESHER?',
      text: 'Start with\nAI Fundamentals Training',
      highlight: 'AI Fundamentals Training',
      animation: 'fade',
      lineTimings: [0, 36],
      durationInFrames: 255,
    },

    // 4 — 0:28.7. VO: "Today is about understanding the landscape of the major platforms. Where they're similar (33.04),
    //     where they meaningfully differ (34.16), and how AI-fluent leaders actually use them (35.84)."
    {
      layout: 'label-title-body',
      label: 'TODAY',
      title: 'Understanding the landscape',
      body: ['Where they are similar', 'Where they meaningfully differ', 'How AI-fluent leaders use them'],
      bodyTimings: [130, 164, 214],
      durationInFrames: 325,
    },

    // 5 — 0:39.55. Section: The Landscape. VO: "So first, let's zoom out. Many (41.76) high-quality language models
    //     exist today... there are four (49.96) platforms most leaders will encounter."
    {
      layout: 'big-statement',
      label: 'THE LANDSCAPE',
      text: 'Many models.\nFour major platforms.',
      highlight: 'Four major platforms.',
      animation: 'fade',
      lineTimings: [58, 304],
      durationInFrames: 410,
    },

    // 6 — 0:53.2. VO: "ChatGPT (53.28), built by OpenAI. Gemini (56.24), from Google. Copilot (58.24), from Microsoft.
    //     And Claude (60.56), built by Anthropic."
    {
      layout: 'platform-logo-grid',
      title: 'The four platforms',
      platforms: [
        { name: 'ChatGPT', maker: 'OpenAI', logo: `${LOGO}/chatgpt.svg` },
        { name: 'Gemini', maker: 'Google' },
        { name: 'Copilot', maker: 'Microsoft', logo: `${LOGO}/copilot.svg` },
        { name: 'Claude', maker: 'Anthropic', logo: `${LOGO}/claude.svg` },
      ],
      timings: [2, 91, 151, 221],
      durationInFrames: 306,
    },

    // 7 — 1:03.4. VO: "ChatGPT has the largest user base (63.55)... Gemini also reaches a massive audience (69.52)...
    //     Copilot has similar reach (76.32)... And Claude is quickly gaining traction (79.96)..."
    {
      layout: 'platform-logo-grid',
      label: 'REACH',
      title: 'Different paths to scale',
      platforms: [
        { name: 'ChatGPT', maker: 'OpenAI', logo: `${LOGO}/chatgpt.svg`, caption: 'Largest user base' },
        { name: 'Gemini', maker: 'Google', caption: 'Built into Search, Workspace, Android' },
        { name: 'Copilot', maker: 'Microsoft', logo: `${LOGO}/copilot.svg`, caption: "Reach through Microsoft's products" },
        { name: 'Claude', maker: 'Anthropic', logo: `${LOGO}/claude.svg`, caption: 'The expert alternative' },
      ],
      timings: [4, 184, 388, 497],
      tilesVisible: true,
      spotlight: true,
      durationInFrames: 624,
    },

    // 8 — 1:24.2. VO: "Copilot also brings some of the strongest models into one place, including OpenAI's latest
    //     GPT models and certain Claude models."
    {
      layout: 'centered-quote',
      text: "Copilot brings OpenAI's latest GPT models and Claude models into one place.",
      highlight: 'into one place',
      animation: 'fade',
      durationInFrames: 280,
    },

    // 9 — 1:33.55. Section: What They Have in Common. VO: "...All four are built on frontier-class language models.
    //     They're trained (101.88)... recognizing patterns (105.36)... increasingly images (108.48)..."
    {
      layout: 'label-title-body',
      label: 'WHAT THEY HAVE IN COMMON',
      title: 'Built on frontier-class models',
      body: [
        'Trained on massive amounts of data',
        'Strong at patterns in language and code',
        'Increasingly images, audio and video',
      ],
      bodyTimings: [250, 354, 448],
      durationInFrames: 560,
    },

    // 10 — 1:52.2. VO: "So across all four, you'll see the same baseline strengths. Conversational (116.36)...
    //      The ability (120.64)... Strong summarization (124.0)... And multimodal (128.8)..."
    {
      layout: 'checklist-slide',
      label: 'WHAT THEY HAVE IN COMMON',
      title: 'Shared strengths',
      items: [
        'Thinking, drafting and analysis in conversation',
        'Working with files and long documents',
        'Summarize, synthesize, restructure, ideate',
        'Multimodal: voice and visuals',
      ],
      itemTimings: [125, 253, 354, 498],
      durationInFrames: 633,
    },

    // 11 — 2:13.3. VO: "You'll also see the same known limitations. Missing context (136.32). Confident-sounding
    //      errors (137.84). And over-generalization (139.68)."
    {
      layout: 'label-title-body',
      label: 'WHAT THEY HAVE IN COMMON',
      title: 'Shared limitations',
      body: ['Missing context', 'Confident-sounding errors', 'Over-generalization'],
      bodyRight: true,
      bodyXList: true,
      bodyTimings: [91, 136, 191],
      durationInFrames: 267,
    },

    // 12 — 2:22.2. Section: The AI-Fluent Pattern. VO: "Here's an important insight. Highly AI-fluent leaders...
    //      rarely rely on a single model as the only voice in the room."
    {
      layout: 'big-statement',
      label: 'THE AI-FLUENT PATTERN',
      text: 'Not the only voice\nin the room.',
      highlight: 'only voice',
      animation: 'fade',
      lineTimings: [0, 150],
      durationInFrames: 297,
    },

    // 13 — 2:32.1. VO: "They deliberately use a second model to fact-check (154.48), challenge (155.92), reframe (157.28),
    //      expose blind spots (158.76), and test (160.64) whether an answer holds up..."
    {
      layout: 'checklist-slide',
      label: 'THE AI-FLUENT PATTERN',
      title: 'Use a second model',
      items: [
        'Fact-check outputs',
        'Challenge assumptions',
        'Reframe the problem',
        'Expose blind spots',
        'Stress-test the answer',
      ],
      itemTimings: [71, 115, 155, 200, 256],
      durationInFrames: 372,
    },

    // 14 — 2:44.5. VO: "This is cognitive diversification. They're not using a second AI to go faster (167.12).
    //      They're using it to be more critical (169.92)."
    {
      layout: 'split-contrast',
      leftLabel: 'COGNITIVE DIVERSIFICATION IS NOT',
      leftTitle: 'Going faster',
      rightLabel: 'IT IS',
      rightTitle: 'Being more critical',
      rightLightUpFrame: 155,
      durationInFrames: 222,
    },

    // 15 — 2:51.9. VO: "Just like strong leaders seek out dissenting views, strong AI users (175.28) build that
    //      challenge directly into their workflow."
    {
      layout: 'centered-quote',
      text: 'Strong leaders seek dissenting views.\nStrong AI users build that challenge into their workflow.',
      highlight: 'build that challenge into their workflow',
      animation: 'fade',
      lineTimings: [0, 93],
      durationInFrames: 240,
    },

    // 16 — 2:59.9. Section: Bottom Line. VO: "...help you become fluent (184.96) in the landscape, so you can
    //      choose your tools (186.96) intentionally... and designing your system (193.84) to think better."
    {
      layout: 'takeaway-stack',
      label: 'BOTTOM LINE',
      title: "Today's goal",
      takeaways: [
        { kicker: 'Fluency', text: 'Know the landscape' },
        { kicker: 'Choice', text: 'Choose your tools intentionally' },
        { kicker: 'System', text: 'Design your system to think better' },
      ],
      timings: [152, 212, 418],
      durationInFrames: 531,
    },
  ],
};
