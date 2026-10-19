import { VideoData } from '../scenes/types';

// Copilot Work IQ & Connectors — Tutorial / demo video
// Audio: audio/copilot-work-iq.mp3 — narration extracted from dumping/work IQ.mp4, PRE-PADDED with 3.00s
//        of silence (Video.tsx trims audioStartFrame frames off the file), 177.85s padded / 174.84s raw.
// Video: video/copilot-work-iq.mp4 — screen recording with embedded narration (same recording), 1024x576.
// Whisper run on the unpadded audio; comp_frame = 90 + round(t * 30).
// Source recording is blank/white from 0.00–31.93s and 147.77–174.84s (presenter narrating before/after
// screen-sharing) — those stretches are graphic scenes. Per [[feedback_no_step_cards]] the demo
// video-clip scene carries no overlay card.
//
//  scene                                             | start (s) | end (s) | dur (frames @30fps)
//  --------------------------------------------------|-----------|---------|--------------------
//  1  title-card-green (silent intro)                |   0.00    |   3.00  |    90
//  2  label-title-body (hook — Work IQ)              |   0.00    |  17.20  |   516
//  3  label-title-body (connectors + access)         |  17.20    |  31.93  |   442
//  4  video-clip (demo, no overlay)                  |  31.93    | 147.77  |  3475
//  5  label-title-body (practical notes)             | 147.77    | 169.00  |   637
//  6  big-statement (closing)                        | 169.00    | 174.84+ |   190
//                                                                  total       5350

export const copilotWorkIq: VideoData = {
  audioSrc: 'audio/copilot-work-iq.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/copilot-work-iq.mp4',
  clipStartFrame: 90,
  scenes: [
    // 1 — Title card
    {
      layout: 'title-card-green',
      title: 'Work IQ and Connectors',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 — Hook (0.00 → 17.20)
    // VO: "When you're using Microsoft 365 Copilot, a lot of your work context may already exist. With
    //      Work IQ, Copilot can use information you already have permission to access across services
    //      like Outlook, Teams, SharePoint, OneDrive, and other 365 apps."
    {
      layout: 'label-title-body',
      label: 'WORK IQ',
      title: 'Your work context is already there',
      body: [
        'Much of your work context already lives in Microsoft 365',
        'Work IQ: Copilot uses information you already have permission to access',
        'Across Outlook, Teams, SharePoint, OneDrive and other 365 apps',
      ],
      bodyTimings: [75, 174, 332],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'eye', 'sparkles'],
      durationInFrames: 516,
    },

    // 3 — Connectors + what Copilot can access (17.20 → 31.93)
    // VO: "Copilot connectors can then extend that context to additional business systems. In Microsoft
    //      365 Copilot, what Copilot can access depends on your license, your permissions, but also your
    //      organization's admin settings."
    {
      layout: 'label-title-body',
      label: 'CONNECTORS',
      title: 'Extend context beyond 365',
      body: [
        'Copilot connectors: bring in context from additional business systems',
        'Access depends on: your license, your permissions and your admin settings',
      ],
      bodyTimings: [0, 224],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['bolt', 'sliders'],
      durationInFrames: 442,
    },

    // 4 — Demo (31.93 → 147.77), no overlay card
    // VO covers: open a Copilot chat → make sure Work IQ is on → + button → choose data sources (can differ
    // by chat) → Settings → Sources for external sources → Settings → Personalization → Work profile →
    // demo: prep for a meeting with Acme tomorrow (meeting details, emails, Teams conversations, docs) →
    // review the citations → connecting external sources (Salesforce, Jira, ServiceNow) via Settings →
    // Sources; what appears depends on what your org has enabled.
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-work-iq.mp4',
      videoStartTime: 31.93,
      durationInFrames: 3475,
    },

    // 5 — Practical notes (147.77 → 169.00)
    // VO: "Now, a couple of practical notes to wrap up this section. First of all, Work IQ does not give
    //      you any new permissions, so you only have access to what you already have access to on your
    //      account. The available data and connectors, again, they vary by license, permissions, and by
    //      admin settings. Your administrator also may need to enable external connectors,"
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'A few practical notes',
      body: [
        'Work IQ grants no new permissions, only what your account can already access',
        'Available data and connectors vary by license, permissions and admin settings',
        'Your administrator may need to enable external connectors',
      ],
      bodyTimings: [106, 348, 519],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'sliders', 'user'],
      durationInFrames: 637,
    },

    // 6 — Closing (169.00 → end)
    // VO: "and again, you always want to review the sources that Copilot uses for important work."
    {
      layout: 'big-statement',
      text: 'Always review the sources\nCopilot uses for important work.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [10, 45],
      durationInFrames: 190,
    },
  ],
};
