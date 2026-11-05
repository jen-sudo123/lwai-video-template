import { VideoData } from '../scenes/types';

// Prompting with Artifacts in Claude — uploads + handwritten-notes demo
// Audio: audio/prompting-with-artifacts.mp3 — Daan, ElevenLabs eleven_v4 (take 1), padded with 2.0s
//        of silence (audioStartFrame 60). Unpadded original: audio/voice-tests/claude-file-uploads-v4-take1.mp3
// Script: src/data/claude-file-uploads.v4.script.txt
// Transcript (ElevenLabs Scribe, word timestamps, UNPADDED): src/data/prompting-with-artifacts.transcript.json
// Demo: the 10 screenshots (prompting-with-artifacts/images/, 1920x992) are stitched into one continuous clip,
//       prompting-with-artifacts/video/demo.mp4 (1920x1080, white pad top/bottom, 10-frame crossfades), played via
//       clipSrc like a screen recording. Camera moves are clipZoomKeyframes (origin in %, 30-frame lerp). This follows
//       the house demo pattern (see claude-instructions.ts) instead of cutting between separate image scenes.
//       Rebuild the clip with the shot plan in the comment on each video-clip scene if timings change.
//
// Comp frame = 60 + round(VO_s * 30). Clip frame = comp frame - 1991.
//
//  #  scene                                   | VO start | comp start | dur
//  1  title card                              |    -     |      0     |  60
//  2  intro: text-only → multimodal           |   0.00   |     60     | 322
//  3  supported formats                       |  10.74   |    382     | 579
//  4  three ways to upload                    |  30.02   |    961     | 653
//  5  PDFs vs other docs                      |  51.80   |   1614     | 377
//  6  demo clip: note → 01 → 02               |  64.37   |   1991     | 677
//  7  verify first (statement)                |  86.93   |   2668     | 224
//  8  demo clip: 03 verification prompt       |  94.40   |   2892     | 410
//  9  why verify (cards)                      | 108.05   |   3302     | 314
// 10  demo clip: 04 → 05 → 06 → 07 → 08 → 09 → 10 | 118.53 | 3616   | 857
// 11  chat vs Project knowledge               | 147.10   |   4473     | 256
// 12  upload limits                           | 155.62   |   4729     | 696
// 13  PDF limits                              | 178.84   |   5425     | 523
// 14  limits change (statement)               | 196.28   |   5948     | 214
// 15  uploads vs Artifacts (close)            | 203.40   |   6162     | 438
//                                                           total   6600 (220.0s)

const DEMO = 'prompting-with-artifacts/video/demo.mp4';

export const promptingWithArtifacts: VideoData = {
  audioSrc: 'audio/prompting-with-artifacts.mp3',
  audioStartFrame: 60,
  clipSrc: DEMO,
  clipStartFrame: 1991,
  scenes: [
    // 1 — Title
    {
      layout: 'title-card-green',
      title: 'Prompting with Artifacts in Claude',
      label: 'CLAUDE',
      durationInFrames: 60,
    },

    // 2 — VO: "When Claude first launched as a rival to ChatGPT, it could only process text. But with
    //          newer multimodal [6.52] models, Claude now works with far more formats."
    {
      layout: 'label-title-body',
      label: 'MULTIMODAL CLAUDE',
      title: 'Claude now works with\nfar more formats',
      body: [
        'Then: launched as a text-only rival to ChatGPT',
        'Now: multimodal models read files and images',
      ],
      bodyTimings: [0, 196],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 322,
    },

    // 3 — VO: "You can upload documents and images directly into Claude, including PDFs [14.60], Word
    //          documents, CSVs, and text files, plus common image formats like JPEG [20.64], PNG, GIF,
    //          and WebP. Claude can also work with Excel [25.64] files, when code execution and file
    //          creation are turned on."
    {
      layout: 'label-title-body',
      label: 'WHAT YOU CAN UPLOAD',
      title: 'Documents, images,\nand spreadsheets',
      body: [
        'Documents: PDF, DOCX, CSV, and TXT',
        'Images: JPEG, PNG, GIF, and WebP',
        'Excel: needs code execution and file creation on',
      ],
      bodyTimings: [116, 297, 447],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 579,
    },

    // 4 — VO: "Uploading files into Claude is simple... On mobile [35.04], you can take a photo directly.
    //          On the web, or in the desktop app, you have three options. Drag [41.84] and drop files
    //          into the chat. Click [44.24] the plus button... Or copy [48.44] and paste an image..."
    {
      layout: 'label-title-body',
      label: 'UPLOADING FILES',
      title: 'Getting files\ninto Claude',
      body: [
        'Mobile: take a photo directly',
        'Drag and drop: files straight into the chat',
        'Plus button: add files or photos',
        'Copy and paste: images into the chat',
      ],
      bodyTimings: [151, 355, 427, 553],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 653,
    },

    // 5 — VO: "One thing to remember. Claude [53.36] can analyze the visual elements in supported PDFs.
    //          But [57.39] for other documents, like Word files, it generally extracts the text..."
    {
      layout: 'label-title-body',
      label: 'GOOD TO KNOW',
      title: 'PDFs vs other\ndocuments',
      body: [
        'PDFs: Claude reads text and visuals',
        'Word and others: text only, embedded images skipped',
      ],
      bodyTimings: [47, 168],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 377,
    },

    // 6–8 — Continuous demo clip, part 1 (comp 1991 → 2668). No overlay.
    // VO: "Let's see it in action. Here, I have handwritten notes..." [note zoom]
    //     "Instead, I open Claude on my computer," [372: 01 start page]
    //     "click the plus button, and upload a photo..." [457: 02 + menu]
    {
      layout: 'video-clip',
      videoSrc: DEMO,
      videoStartTime: 0,
      clipZoomKeyframes: [
        { startFrame: -30, scale: 2.4, originX: 56.7, originY: 22.6 },
        { startFrame: 372, scale: 1.5, originX: 46, originY: 54.5 },
        { startFrame: 457, scale: 1.8, originX: 39, originY: 63.3 },
      ],
      durationInFrames: 677,
    },

    // 9 — VO: "Before asking Claude for new ideas, it's important to check [89.92] how it read the image.
    //          So I start with a prompt like this."
    {
      layout: 'big-statement',
      label: 'VERIFY FIRST',
      text: 'Check how Claude\nread the image',
      highlight: 'Check',
      size: 'title',
      durationInFrames: 224,
    },

    // 10 — Demo clip, part 2 (comp 2892 → 3302): 03 verification prompt, read verbatim.
    {
      layout: 'video-clip',
      videoSrc: DEMO,
      videoStartTime: 0,
      clipZoomKeyframes: [
        { startFrame: -30, scale: 1.4, originX: 50, originY: 50.4 },
        { startFrame: 20, scale: 1.8, originX: 50, originY: 52 },
      ],
      durationInFrames: 410,
    },

    // 11 — VO: "This step catches transcription mistakes before you build on them. Especially with messy
    //           [112.72] handwriting, blurry [113.92] images, or anything that includes names [116.32]..."
    {
      layout: 'label-title-body',
      label: 'WHY VERIFY',
      title: 'Catch mistakes\nbefore you build',
      body: [
        'Messy handwriting',
        'Blurry images',
        'Names, numbers, and dates',
      ],
      bodyTimings: [140, 176, 248],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 314,
    },

    // 12–17 — Demo clip, part 3 (comp 3616 → 4473). No overlay.
    //   0 04 transcript with source   "Claude reads the handwriting quite well..."
    //  92 05 legibility notes          "...a clean transcript, with no retyping."
    // 185 06 confirm + arrange prompt  "I compare it with the original image..."
    // 305 07 arranged by level         "Once the transcription is accurate... arrange it by level,"
    // 521 08 expansion prompt          "or to suggest three more indicators for each level."
    // 617 09 matrix artifact (top)     "For more relevant, grounded output..."
    // 737 10 matrix artifact (bottom)  "...consider them together, in the same conversation."
    {
      layout: 'video-clip',
      videoSrc: DEMO,
      videoStartTime: 0,
      clipZoomKeyframes: [
        { startFrame: -30, scale: 1.25, originX: 55, originY: 30 },
        { startFrame: 92, scale: 1.3, originX: 50, originY: 45 },
        { startFrame: 185, scale: 1.8, originX: 50, originY: 88.3 },
        { startFrame: 305, scale: 1.4, originX: 50, originY: 41 },
        { startFrame: 521, scale: 1.8, originX: 50, originY: 88.3 },
        { startFrame: 617, scale: 1.3, originX: 64, originY: 40 },
        { startFrame: 737, scale: 1.3, originX: 62, originY: 40 },
      ],
      durationInFrames: 857,
    },

    // 18 — VO: "You can attach files to a single chat [148.56], or add them to a Project's [150.48]
    //           knowledge, so you can reuse them across many conversations."
    {
      layout: 'label-title-body',
      label: 'WHERE FILES LIVE',
      title: 'One chat, or\nmany conversations',
      body: [
        'Single chat: files for that conversation',
        'Project knowledge: reuse across conversations',
      ],
      bodyTimings: [44, 101],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 256,
    },

    // 19 — VO: "...each file can be up to five [161.16] hundred megabytes, with up to twenty [163.04]
    //           files per chat. Files in a Project's knowledge have a separate limit of thirty [168.00]
    //           megabytes each. Images can be up to eight [171.20] thousand by eight thousand pixels..."
    {
      layout: 'label-title-body',
      label: 'UPLOAD LIMITS',
      title: 'Practical limits\nto keep in mind',
      body: [
        '500 MB: per file in a standard chat',
        '20 files: per chat',
        '30 MB: per file in Project knowledge',
        '8000 × 8000: maximum image size in pixels',
      ],
      bodyTimings: [166, 223, 371, 467],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 696,
    },

    // 20 — VO: "For PDFs, Claude can analyze both text [181.36] and visuals... in files of up to one
    //           hundred pages. From [187.36] there up to a thousand pages, it reads the text only.
    //           And anything [191.60] over a thousand pages isn't supported in a standard chat."
    {
      layout: 'label-title-body',
      label: 'PDF LIMITS',
      title: 'How Claude\nreads PDFs',
      body: [
        'Up to 100 pages: text and visuals',
        '101 to 1,000 pages: text only',
        'Over 1,000 pages: not supported in chat',
      ],
      bodyTimings: [76, 256, 383],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 523,
    },

    // 21 — VO: "These limits can change, so check Claude's latest documentation..."
    {
      layout: 'big-statement',
      label: 'LIMITS CHANGE',
      text: "Check Claude's latest\ndocumentation",
      highlight: 'latest',
      size: 'title',
      durationInFrames: 214,
    },

    // 22 — VO: "Finally, don't confuse uploads [204.96] with Claude Artifacts. Artifacts [207.68] is the
    //           side-by-side workspace for documents, code, and apps. It's a separate feature, but
    //           [214.12] the two work really well together."
    {
      layout: 'label-title-body',
      label: 'UPLOADS VS ARTIFACTS',
      title: 'Two features,\nbetter together',
      body: [
        'Uploads: files you give Claude to work with',
        'Artifacts: side-by-side workspace for docs, code, and apps',
        'Together: upload the input, build the output',
      ],
      bodyTimings: [47, 128, 322],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 438,
    },
  ],
};
