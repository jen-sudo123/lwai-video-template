import { VideoData } from '../scenes/types';

// Prompting with Artifacts in ChatGPT - Tutorial / demo video
// Source: Prompting_artifact_with_chatGPT_2.mp4 (VEED export, 199.67s, narration embedded).
// Video: video/prompting-artifact-chatgpt.mp4 = source with the VEED watermark and burned-in logo removed:
//        python3 scripts/remove-veed-watermark.py <source>.mp4 <out>.mp4 --erase 44,996,252,52
//        Played continuously; composition frame N == source time N/30.
// Audio: audio/prompting-artifact-chatgpt.mp3, narration extracted from the source (raw, no padding).
//
// The source is blank (white) from 0:00-0:29 and 2:19.5-3:19.7; those stretches carry branded
// text + SVG scenes (scripts/make-prompting-artifact-svgs.py -> public/prompting-artifact-chatgpt/images/).
// Demo scenes are cut on visual changes and zoomed to the centre of the action.
// Reveal timings come from an offline (pocketsphinx) word-level pass; local frame = (word_t - scene_start) * 30.
//
//  scene                                          | src start | src end | frames
//  -----------------------------------------------|-----------|---------|-------
//  1  title card                                   |    0.00   |   3.00  |   90
//  2  intro: beyond text                          |    3.00   |  14.30  |  339
//  2b intro: what counts as an artifact           |   14.30   |  29.00  |  441
//  3  desktop: drag a file into ChatGPT            |   29.00   |  32.70  |  111
//  4  desktop: + menu (add photos & files)          |   32.70   |  41.37  |  260
//  5  phone: + menu, photo of handwritten notes     |   41.37   |  55.63  |  428
//  6  phone: camera, capture the notes              |   55.63   |  70.60  |  449
//  7  phone: type transcription prompt              |   70.60   |  90.17  |  587
//  8  phone: ChatGPT's verbatim transcription       |   90.17   | 105.63  |  464
//  9  phone: "Arrange this by level..." prompt      |  105.63   | 121.23  |  468
// 10  phone: AI Fluency Levels result               |  121.23   | 125.03  |  114
// 11  desktop: continue on desktop, Level 4 result  |  125.03   | 139.47  |  433
// 12  outro: upload limits by plan                |  139.47   | 168.60  |  874
// 13  outro: Business & Enterprise controls       |  168.60   | 175.00  |  192
// 14  outro: PDF visuals caveat                   |  175.00   | 199.67  |  740
//                                                                  total   5990

const CLIP = 'video/prompting-artifact-chatgpt.mp4';

export const promptingArtifactChatGPT: VideoData = {
  audioSrc: 'audio/prompting-artifact-chatgpt.mp3',
  clipSrc: CLIP,
  scenes: [
    // 1 (0:00 -> 0:03)
    {
      layout: 'title-card-green',
      title: 'Prompting with Artifacts in ChatGPT',
      label: 'CHATGPT DEMO',
      durationInFrames: 90,
    },

    // 2 (0:03.0 -> 0:14.3)
    // VO: "ChatGPT began as a text-only assistant, but with multimodal models like 5.3 and 5.4,
    //      it can work with far more than just text."
    {
      layout: 'label-title-body',
      label: 'BEYOND TEXT',
      title: 'ChatGPT reads more than words',
      body: [
        'Started as a text-only assistant',
        'Newer multimodal models',
        'Work with far more than text',
      ],
      bodyTimings: [0, 104, 212], // "text-only" 3.1s, "models" 6.7s, "far more" 10.3s (~8f lead)
      image: 'prompting-artifact-chatgpt/images/beyond-text-1.svg',
      imageSwaps: [{ from: 111, src: 'prompting-artifact-chatgpt/images/beyond-text-2.svg' }],
      durationInFrames: 339,
    },

    // 2b (0:14.3 -> 0:29.0)
    // VO: "We'll call these artifacts, a catch-all for photos, screenshots, documents and more.
    //      Uploading artifacts to ChatGPT is straightforward, and the process is largely the same
    //      across platforms. On the web browser or desktop app, you can..."
    {
      layout: 'label-title-body',
      label: 'WHAT IS AN ARTIFACT?',
      title: 'Anything you hand to ChatGPT',
      body: [
        'A catch-all for photos, screenshots, documents and more',
        'Uploading is straightforward',
        'Same steps on web, desktop and mobile',
      ],
      bodyTimings: [43, 238, 307], // "catch-all" 16.0s, "straightforward" 22.5s, "same" 24.8s
      image: 'prompting-artifact-chatgpt/images/artifacts-0.svg',
      imageSwaps: [
        { from: 81, src: 'prompting-artifact-chatgpt/images/artifacts-1.svg' },  // "photos" 17.0s
        { from: 102, src: 'prompting-artifact-chatgpt/images/artifacts-2.svg' }, // "screenshots" 17.7s
        { from: 129, src: 'prompting-artifact-chatgpt/images/artifacts-3.svg' }, // "documents" 18.6s
      ],
      durationInFrames: 441,
    },

    // 3 (0:29.00 -> 0:32.70) desktop: "Add anything" drop zone
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 29.0,
      clipZoom: { scale: 1.6, originX: 28, originY: 50 },
      durationInFrames: 111,
    },

    // 4 (0:32.70 -> 0:41.37) desktop: + menu, Add photos & files
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 32.7,
      clipZoom: { scale: 1.6, originX: 88, originY: 50 },
      durationInFrames: 260,
    },

    // 5 (0:41.37 -> 0:55.63) phone: + menu, handwritten notes
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 41.37,
      durationInFrames: 428,
    },

    // 6 (0:55.63 -> 1:10.60) phone: camera, capture the notes
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 55.63,
      durationInFrames: 449,
    },

    // 7 (1:10.60 -> 1:30.17) phone: type the transcription prompt
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 70.6,
      clipZoom: { scale: 1.3, originX: 50, originY: 70 },
      durationInFrames: 587,
    },

    // 8 (1:30.17 -> 1:45.63) phone: verbatim transcription
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 90.17,
      clipZoom: { scale: 1.4, originX: 50, originY: 0 },
      durationInFrames: 464,
    },

    // 9 (1:45.63 -> 2:01.23) phone: "Arrange this by level then suggest three indicators"
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 105.63,
      clipZoom: { scale: 1.3, originX: 50, originY: 70 },
      durationInFrames: 468,
    },

    // 10 (2:01.23 -> 2:05.03) phone: AI Fluency Levels result
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 121.23,
      clipZoom: { scale: 1.4, originX: 50, originY: 0 },
      durationInFrames: 114,
    },

    // 11 (2:05.03 -> 2:19.47) desktop: same chat on desktop, Level 4 + maturity model
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 125.03,
      clipZoomKeyframes: [
        { startFrame: -30, scale: 1.25, originX: 100, originY: 50 },
        { startFrame: 122, scale: 1.35, originX: 85, originY: 55 },
      ],
      durationInFrames: 433,
    },

    // 12 (2:19.47 -> 2:48.60)
    // VO: "Every plan follows the same basic file caps, up to 512 megabytes per file and 20 megabytes
    //      per image. But Free is much more restrictive... Plus is going to be the best choice for
    //      regular users... and Pro is for heavy users..."
    {
      layout: 'label-title-body',
      label: 'UPLOAD LIMITS',
      title: 'Same file caps, different allowances',
      body: [
        'Every plan: 512 MB per file, 20 MB per image',
        'Free: the tightest daily upload limit',
        'Plus: more uploads, the best fit for regular users',
        'Pro: the highest limits, for heavy users',
      ],
      bodyTimings: [178, 310, 544, 763], // "512" 145.4s, "Free" 149.8s, "Plus" 157.6s, "Pro" 164.9s
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 874,
    },

    // 13 (2:48.60 -> 2:55.00)
    // VO: "Business and Enterprise also add admin, privacy and workspace controls, which can be helpful."
    {
      layout: 'big-statement',
      label: 'BUSINESS AND ENTERPRISE',
      text: 'Teams get admin, privacy and workspace controls',
      highlight: 'admin, privacy and workspace controls',
      size: 'title',
      animation: 'fade',
      durationInFrames: 192,
    },

    // 14 (2:55.00 -> 3:19.67)
    // VO: "One very important note: only ChatGPT Enterprise supports visual retrieval for PDFs. This
    //      means that normally when you upload PDFs, it may only read the text and not the images
    //      within them, like screenshots, diagrams, charts... upload those separately."
    {
      layout: 'label-title-body',
      label: 'ONE IMPORTANT NOTE',
      title: 'Visuals inside PDFs can get missed',
      body: [
        'Only Enterprise reads images inside PDFs',
        'Other plans may read only the text',
        'Screenshots, diagrams and charts get skipped',
        'Upload key visuals as separate images',
      ],
      bodyTimings: [46, 340, 439, 634], // "only" 176.8s, "may only read" 186.6s, "screenshots" 189.9s, "separately" 196.4s
      image: 'prompting-artifact-chatgpt/images/pdf-1.svg',
      imageSwaps: [
        { from: 348, src: 'prompting-artifact-chatgpt/images/pdf-2.svg' },
        { from: 642, src: 'prompting-artifact-chatgpt/images/pdf-3.svg' },
      ],
      durationInFrames: 740,
    },
  ],
};
