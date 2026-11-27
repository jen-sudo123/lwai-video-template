import { VideoData } from '../scenes/types';

// Uploading files (artifacts) to Copilot: tutorial / demo video
// Audio: audio/copilot-uploads.mp3, the narration extracted from the uploaded Artifacts_Copilot.mp4, PRE-PADDED 3.00s
//        (Video.tsx trims audioStartFrame frames off the file). Transcribed on the unpadded audio (Parakeet TDT,
//        word timestamps): copilot-uploads.transcript.json. comp_frame = 90 + round(t * 30).
// Video: video/copilot-uploads.mp4, the same recording with the VEED corner watermark painted out, 1920x1080.
// The recording is blank/white 0–44.5s (intro narration) and 173–205s (closing "things to know" VO),
// so those stretches are graphic scenes. The demo video-clip carries no overlay.
//
//  scene                                          | start (s) | end (s) | dur (frames)
//  -----------------------------------------------|-----------|---------|-------------
//  1  title-card-green                            |   silent  |   3.00  |    90
//  2  label-title-body (multimodal / artifacts)   |    0.00   |  22.20  |   666
//  3  label-title-body (the process)              |   22.20   |  34.23  |   361
//  4  label-title-body (the example)              |   34.23   |  44.50  |   308
//  5  video-clip (demo, no overlay)               |   44.50   | 172.70  |  3846
//  6  label-title-body (what Copilot can read)    |  172.70   | 192.60  |   597
//  7  label-title-body (before you upload)        |  192.60   | 206.00  |   402
//                                                         total          6270

export const copilotUploads: VideoData = {
  audioSrc: 'audio/copilot-uploads.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/copilot-uploads/copilot-uploads.mp4',
  clipStartFrame: 90,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Uploading Files to Copilot',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 90,
    },

    // 2 — "it only processed text" (4.00) / "multimodal" (6.32) / "artifacts" (16.04)
    {
      layout: 'label-title-body',
      label: 'MULTIMODAL AI',
      title: 'Copilot works with more than text',
      body: [
        'Then: early generative AI only processed text',
        'Now: multimodal models work with far more',
        'Artifacts: photos, screenshots, documents and more',
      ],
      bodyTimings: [120, 190, 481],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['pencil', 'sparkles', 'eye'],
      durationInFrames: 666,
    },

    // 3 — "upload an artifact" (30.16) / "how Copilot works with it" (32.00)
    {
      layout: 'label-title-body',
      label: 'THE PROCESS',
      title: 'Largely the same on every platform',
      body: [
        'Upload: add an artifact to Copilot',
        'Work: see what Copilot does with it',
      ],
      bodyTimings: [239, 294],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['rocket', 'chat-bubble-left-right'],
      durationInFrames: 361,
    },

    // 4 — "indicators" (36.31) / "generate" (41.52)
    {
      layout: 'label-title-body',
      label: 'THE EXAMPLE',
      title: 'A handwritten brainstorming note',
      body: [
        'The note: indicators for an AI fluency matrix',
        'The goal: more indicator ideas from Copilot',
      ],
      bodyTimings: [62, 219],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'lightbulb'],
      durationInFrames: 308,
    },

    // 5 — Demo (44.50 → 172.70), no overlay card
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-uploads/copilot-uploads.mp4',
      videoStartTime: 44.5,
      logoPosition: 'bottom-left',
      durationInFrames: 3846,
    },

    // 6 — "formats" (179.74) / "Image understanding" (183.99)
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'What Copilot can read',
      body: [
        'Formats: photos, PDFs and Microsoft Office files',
        'Images: on their own or inside documents, like scanned PDF pages',
      ],
      bodyTimings: [211, 339],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['check', 'eye'],
      durationInFrames: 597,
    },

    // 7 — "Limits" (192.79) / "security" (197.83) / "sensitive" (200.39)
    {
      layout: 'label-title-body',
      label: 'BEFORE YOU UPLOAD',
      title: 'Check the rules first',
      body: [
        'Limits: vary by account and plan',
        "Security: your organization's settings apply",
        "Sensitive data: check you're allowed to share it",
      ],
      bodyTimings: [6, 157, 233],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'check', 'x'],
      durationInFrames: 402,
    },
  ],
};
