import { VideoData } from '../scenes/types';

// Claude — Full Overview
// Audio: audio/claude.mp3 (252.68s, Daan voice — models section re-recorded with Fable/Opus/Sonnet/Haiku order)
// Clip:  video/claude-day1.mp4 — screen recording; videoStartTime = original VO timestamps (unchanged)
// Total frames: 7580 @ 30fps
//
// Frame-accurate VO map (Whisper small, spliced Daan audio):
//   0.00 →  21.72  About Claude / Anthropic background
//  21.72 →  38.84  Constitutional AI
//  38.84 →  40.92  "Here's some of the standout features."
//  40.92 →  48.82  Artifacts
//  48.82 →  60.46  Projects
//  60.46 →  66.16  Skills
//  66.16 →  70.72  Connectors
//  70.72 →  78.22  Search + Web Fetch
//  78.22 →  85.64  Research Mode
//  85.64 →  90.96  Voice Mode
//  90.96 → 104.72  Claude Code (incl. "standalone tools" intro)
// 104.72 → 112.24  Co-work
// 112.24 → 118.16  Claude Design
// 118.16 → 187.12  The models (Fable 5, Opus 5, Sonnet 5, Haiku 4.5)
// 187.12 → 236.04  Pricing
// 236.04 → 252.68  Privacy
//
// Scene layout:
//  #   Layout               Comp start  Duration  Comp end  Clip
//  1   title-card-green            0       60        60     —
//  2   label-title-body           60      591       651     —
//  3   label-title-body          651      514      1165     —
//  4   video-clip (Features)    1165       63      1228     @ 49s
//  5   video-clip (Artifacts)   1228      237      1465     @ 52s
//  6   video-clip (Projects)    1465      349      1814     @ 61s
//  7   video-clip (Skills)      1814      171      1985     @ 72s
//  8   video-clip (Connectors)  1985      137      2122     @ 78s
//  9   video-clip (Search)      2122      225      2347     @ 84s
// 10   video-clip (Research)    2347      222      2569     @ 93s
// 11   video-clip (Voice)       2569      160      2729     @ 101s
// 12   video-clip (Code)        2729      413      3142     @ 107s
// 13   video-clip (Cowork)      3142      225      3367     @ 122s
// 14   video-clip (Design)      3367      178      3545     @ 130s
// 15   label-title-body (Models) 3545    2069      5614     —
// 16   label-title-body (Pricing)5614    1467      7081     —
// 17   label-title-body (Privacy)7081     499      7580     —
//                                               ─────
//                                         Total: 7580 frames (252.67s)

export const claude: VideoData = {
  audioSrc: 'audio/claude.mp3',
  scenes: [
    // ── 00:00.00  title card ──────────────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Claude',
      label: 'SELECTING LLMs',
      durationInFrames: 60,
    },

    // ── 00:00.00 → 00:26.20  About Claude / Anthropic background ─────
    // VO: "Claude is built by Anthropic… widely praised for writing
    //      and editing… one of the strongest coding models…"
    {
      layout: 'label-title-body',
      label: 'ABOUT CLAUDE',
      title: 'Built by Anthropic',
      body: [
        'Founded in 2021 by former OpenAI researchers. Left over differences on AI safety and responsible development.',
        'Widely praised for writing and editing. One of the strongest coding models, most popular among developers.',
      ],
      bodyTimings: [0, 352],
      durationInFrames: 591,
    },

    // ── 00:26.20 → 00:49.04  Constitutional AI ────────────────────────
    // VO: "Anthropic's approach is called constitutional AI… steadier
    //      tone, more predictable behavior, extra caution when stakes are high."
    {
      layout: 'label-title-body',
      label: 'CONSTITUTIONAL AI',
      title: '"Constitutional" AI',
      body: [
        'Trained to critique and revise its own outputs against a written set of principles',
        'Not optimizing through ad hoc human feedback. A principled alternative.',
        'In practice: steadier tone, more predictable behavior, extra caution when stakes are high',
      ],
      bodyTimings: [76, 200, 319],
      durationInFrames: 514,
    },

    // ── 00:49.04 → 00:52.48  Features transition ─────────────────────
    // VO: "Here's some of the standout features."
    {
      layout: 'video-clip',
      label: 'STANDOUT FEATURES',
      title: 'Features',
      overlayPosition: 'center',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 49,
      durationInFrames: 63,
    },

    // ── 00:52.48 → 01:01.12  Artifacts ────────────────────────────────
    // VO: "Artifacts let you create standalone documents, code, and
    //      interactive mini-apps you can iterate on and share directly from the chat."
    {
      layout: 'video-clip',
      label: 'ARTIFACTS',
      title: 'Create from Chat',
      body: ['Standalone docs, code, and interactive mini-apps. Iterate and share directly from chat.'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 52,
      durationInFrames: 237,
    },

    // ── 01:01.12 → 01:12.20  Projects ─────────────────────────────────
    // VO: "Projects give you persistent workspaces where your
    //      instructions, files, and context carry over from one
    //      conversation to the next."
    // Clip: projects.mp4 (88–101s) — instructions + files panel
    {
      layout: 'video-clip',
      label: 'PROJECTS',
      title: 'Persistent Workspaces',
      body: ['Instructions, files, and context carry over from one conversation to the next'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 61,
      durationInFrames: 349,
    },

    // ── 01:12.20 → 01:18.16  Skills ───────────────────────────────────
    // VO: "Skills are modular capability packs built to be reusable
    //      across workflows and teams."
    // Clip: skills.mp4 (100–108s) — Skills chat with uploaded DOCX
    {
      layout: 'video-clip',
      label: 'SKILLS',
      title: 'Modular Capability Packs',
      body: ['Reusable capability packs built for workflows and teams'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 72,
      durationInFrames: 171,
    },

    // ── 01:18.16 → 01:24.20  Connectors ──────────────────────────────
    // VO: "Connectors link Claude to your existing tools and data
    //      with permissioned access."
    // Clip: connectors.mp4 (106–114s) — Connectors MCP dropdown
    {
      layout: 'video-clip',
      label: 'CONNECTORS',
      title: 'Powered by MCP',
      body: ['Link Claude to your existing tools and data with permissioned access'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 78,
      durationInFrames: 137,
    },

    // ── 01:24.20 → 01:32.96  Web Search + Web Fetch ──────────────────
    // VO: "Search and web fetch give you up-to-date answers with
    //      citations plus the ability to pull and analyze full web pages."
    // Clip: search.mp4 (113–124s) — TypeScript search query with results
    {
      layout: 'video-clip',
      label: 'SEARCH + WEB FETCH',
      title: 'Live Web Access',
      body: ['Up-to-date answers with citations. Pulls and analyzes full web pages.'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 84,
      durationInFrames: 225,
    },

    // ── 01:32.96 → 01:40.96  Research Mode ───────────────────────────
    // VO: "Research mode runs agentic multi-step investigations across
    //      hundreds of sources to produce structured cited reports."
    // Clip: research.mp4 (138–148s) — Bay Area offsite planning research
    {
      layout: 'video-clip',
      label: 'RESEARCH MODE',
      title: 'Deep Multi-Step Investigations',
      body: ['Agentic investigations across hundreds of sources. Structured, cited reports.'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 93,
      durationInFrames: 222,
    },

    // ── 01:40.96 → 01:47.08  Voice Mode ──────────────────────────────
    // VO: "On mobile, voice mode supports full-spoken conversations
    //      and hands-free dictation."
    // Clip: voice.mp4 (148–156s) — "Coffee and Claude time?" voice UI
    {
      layout: 'video-clip',
      label: 'VOICE MODE',
      title: 'Speak to Claude',
      body: ['Full spoken conversations and hands-free dictation on mobile'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 101,
      durationInFrames: 160,
    },

    // ── 01:47.08 → 02:02.84  Claude Code ─────────────────────────────
    // VO: "There are also standalone tools that extend Claude further.
    //      Claude Code is an agentic coding assistant that runs in your
    //      terminal, reads your repository, edits files, runs commands,
    //      and handles version control end-to-end."
    // Clip: claude-code.mp4 (203–220s) — Claude Code website
    {
      layout: 'video-clip',
      label: 'CLAUDE CODE',
      title: 'Agentic Coding Assistant',
      body: ['Runs in your terminal. Reads your repo, edits files, handles version control end-to-end.'],
      bodyTimings: [112],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 107,
      durationInFrames: 413,
    },

    // ── 02:02.84 → 02:10.44  Co-work ─────────────────────────────────
    // VO: "Co-work is a non-technical agent mode for delegating work
    //      in a controlled workspace with safety guardrails built in."
    // Clip: cowork.mp4 (212–222s) — Co-work task delegation UI
    {
      layout: 'video-clip',
      label: 'CO-WORK',
      title: 'Delegate Work Safely',
      body: ['Non-technical agent mode. Controlled workspace with safety guardrails built in.'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 122,
      durationInFrames: 225,
    },

    // ── 02:10.44 → 02:16.60  Claude Design ───────────────────────────
    // VO: "Claude Design gives you a visual workspace for designs,
    //      prototypes, slides, and one-pagers."
    // Clip: design.mp4 (178–187s) — prototype review with annotations
    {
      layout: 'video-clip',
      label: 'CLAUDE DESIGN',
      title: 'Visual Workspace',
      body: ['Designs, prototypes, slides, and one-pagers. All in one place.'],
      bodyTimings: [0],
      overlayPosition: 'below',
      videoSrc: 'video/claude-day1.mp4',
      videoStartTime: 130,
      durationInFrames: 178,
    },

    // ── 02:16.20 → 03:01.20  The models ──────────────────────────────
    {
      layout: 'label-title-body',
      label: 'THE MODELS',
      title: 'Four Options',
      titleNote: 'Switch models in a new chat. Adjust Effort from low to max — higher effort gives better results.',
      titleNoteDelay: 1826,
      body: [
        'Fable 5.1: most advanced. Hardest reasoning, research, and long-running agentic workflows.',
        'Opus 5: high capability. Complex analysis, coding, and multi-step tasks where quality matters.',
        'Sonnet 5: everyday workhorse. Best speed-to-quality balance for most professional work.',
        'Haiku 4.5: fastest option. Lightweight or high-volume tasks where response time matters most.',
      ],
      bodyTimings: [164, 665, 1208, 1631],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sparkles', 'star', 'bolt', 'cpu-chip'],
      durationInFrames: 2069,
    },

    // ── 03:01.76 → 03:52.60  Pricing ──────────────────────────────────
    {
      layout: 'label-title-body',
      label: 'PRICING',
      title: 'Plans for Every Scale',
      body: [
        'Free: web search, memory, file creation, connectors. Tight usage limits.',
        'Pro: $20/mo ($17 annual). Higher usage, projects, research mode, Claude Code, Co-work.',
        'Max: $100/mo (5x) or $200/mo (20x usage). Priority access and early features.',
        'Team: $25/seat/mo ($20 annual) + Premium at $125/seat. Admin controls, SSO, enterprise search.',
        'Enterprise: custom pricing. Stronger governance, compliance, and data retention controls.',
      ],
      bodyTimings: [0, 187, 414, 819, 1254],
      pricingGrid: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'bolt', 'arrow-trending-up', 'building-office', 'building-office-2'],
      durationInFrames: 1467,
    },

    // ── 03:52.06 → 04:09.98  Privacy ─────────────────────────────────
    {
      layout: 'label-title-body',
      label: 'PRIVACY',
      title: 'Your Data, Your Control',
      body: [
        'Personal plans: data sharing adjustable in settings. Incognito chats not used for training.',
        'Business and Enterprise: data not used to train models by default. Zero data retention available.',
      ],
      bodyTimings: [0, 293],
      durationInFrames: 499,
    },
  ],
};
