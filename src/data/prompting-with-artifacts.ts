import { VideoData } from '../scenes/types';

// Prompting with Artifacts in Claude — uploads + handwritten-notes demo
// Audio: audio/prompting-with-artifacts.mp3 — Daan, ElevenLabs eleven_v4 (take 1), padded with 2.0s
//        of silence (audioStartFrame 60). Unpadded original: audio/voice-tests/claude-file-uploads-v4-take1.mp3
// Script: src/data/claude-file-uploads.v4.script.txt
// Transcript (ElevenLabs Scribe, word timestamps, UNPADDED): src/data/prompting-with-artifacts.transcript.json
// Screenshots: prompting-with-artifacts/images/01..10 (1920x992). imageWidth 1586 keeps the 820px box at the
//              screenshot's aspect, so imageZoom centerX/centerY map 1:1 to screenshot coordinates.
//
// Comp frame = 60 + round(VO_s * 30).
//
//  #  scene                               | VO start | comp start | dur
//  1  title card                          |    -     |      0     |  60
//  2  intro: text-only → multimodal       |   0.00   |     60     | 322
//  3  supported formats                   |  10.74   |    382     | 579
//  4  three ways to upload                |  30.02   |    961     | 653
//  5  PDFs vs other docs                  |  51.80   |   1614     | 377
//  6  demo: handwritten notes (04 zoom)   |  64.37   |   1991     | 372
//  7  01 Claude start                     |  76.77   |   2363     |  85
//  8  02 + menu                           |  79.60   |   2448     | 220
//  9  verify first (statement)            |  86.93   |   2668     | 224
// 10  03 photo + verification prompt      |  94.40   |   2892     | 410
// 11  why verify (cards)                  | 108.05   |   3302     | 314
// 12  04 transcript with source           | 118.53   |   3616     | 185
// 13  06 confirm + arrange prompt         | 124.70   |   3801     | 120
// 14  07 arranged by level                | 128.69   |   3921     | 216
// 15  08 expansion prompt                 | 135.90   |   4137     |  96
// 16  09 matrix artifact (top)            | 139.09   |   4233     | 120
// 17  10 matrix artifact (bottom)         | 143.10   |   4353     | 120
// 18  chat vs Project knowledge           | 147.10   |   4473     | 256
// 19  upload limits                       | 155.62   |   4729     | 696
// 20  PDF limits                          | 178.84   |   5425     | 523
// 21  limits change (statement)           | 196.28   |   5948     | 214
// 22  uploads vs Artifacts (close)        | 203.40   |   6162     | 438
//                                                       total   6600 (220.0s)

const IMG = 'prompting-with-artifacts/images/';
const SHOT = { objectFit: 'contain' as const, imageWidth: 1586 };

export const promptingWithArtifacts: VideoData = {
  audioSrc: 'audio/prompting-with-artifacts.mp3',
  audioStartFrame: 60,
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

    // 6 — VO: "Let's see it in action. Here, I have handwritten notes with indicators for an AI fluency
    //          matrix... Normally, I'd have to retype everything first."
    {
      layout: 'centered-image-caption',
      image: `${IMG}04-transcription-with-source.png`,
      ...SHOT,
      imageZoom: { centerX: 0.567, centerY: 0.2, scale: 2.4, startFrame: 0 },
      durationInFrames: 372,
    },

    // 7 — VO: "Instead, I open Claude on my computer,"
    {
      layout: 'centered-image-caption',
      image: `${IMG}01-claude-start.png`,
      ...SHOT,
      imageZoom: { centerX: 0.46, centerY: 0.55, scale: 1.5, startFrame: 0 },
      durationInFrames: 85,
    },

    // 8 — VO: "click the plus button, and upload a photo of the notes. I could also drag and drop the
    //          image, or paste it from my clipboard."
    {
      layout: 'centered-image-caption',
      image: `${IMG}02-add-files-menu.png`,
      ...SHOT,
      imageZoom: { centerX: 0.39, centerY: 0.62, scale: 1.8, startFrame: 0 },
      durationInFrames: 220,
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

    // 10 — VO: the verification prompt, read verbatim
    {
      layout: 'centered-image-caption',
      image: `${IMG}03-photo-and-verification-prompt.png`,
      ...SHOT,
      imageZoom: { centerX: 0.5, centerY: 0.5, scale: 1.7, startFrame: 0 },
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

    // 12 — VO: "In this case, Claude reads the handwriting quite well, and gives me a clean transcript,
    //           with no retyping."
    {
      layout: 'centered-image-caption',
      image: `${IMG}04-transcription-with-source.png`,
      ...SHOT,
      durationInFrames: 185,
    },

    // 13 — VO: "I compare it with the original image, and correct anything it misread."
    {
      layout: 'centered-image-caption',
      image: `${IMG}06-confirmation-and-arrange-prompt.png`,
      ...SHOT,
      imageZoom: { centerX: 0.5, centerY: 0.92, scale: 1.7, startFrame: 0 },
      durationInFrames: 120,
    },

    // 14 — VO: "Once the transcription is accurate, I can keep working with the content. For example, I
    //           might ask Claude to arrange it by level,"
    {
      layout: 'centered-image-caption',
      image: `${IMG}07-indicators-arranged-by-level.png`,
      ...SHOT,
      imageZoom: { centerX: 0.5, centerY: 0.35, scale: 1.4, startFrame: 0 },
      durationInFrames: 216,
    },

    // 15 — VO: "or to suggest three more indicators for each level."
    {
      layout: 'centered-image-caption',
      image: `${IMG}08-expansion-prompt.png`,
      ...SHOT,
      imageZoom: { centerX: 0.5, centerY: 0.92, scale: 1.7, startFrame: 0 },
      durationInFrames: 96,
    },

    // 16 — VO: "For more relevant, grounded output, I can upload additional files"
    {
      layout: 'centered-image-caption',
      image: `${IMG}09-expanded-matrix-artifact-top.png`,
      ...SHOT,
      imageZoom: { centerX: 0.64, centerY: 0.4, scale: 1.3, startFrame: 0 },
      durationInFrames: 120,
    },

    // 17 — VO: "and ask Claude to consider them together, in the same conversation."
    {
      layout: 'centered-image-caption',
      image: `${IMG}10-expanded-matrix-artifact-bottom.png`,
      ...SHOT,
      imageZoom: { centerX: 0.62, centerY: 0.4, scale: 1.3, startFrame: 0 },
      durationInFrames: 120,
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
