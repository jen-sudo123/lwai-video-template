import { VideoData } from '../scenes/types';

// Prompting with an Artifact in ChatGPT - Tutorial / demo video
// Source: Prompting_artifact_with_chatGPT_2.mp4 (VEED export, 199.67s, narration embedded).
// Video: video/prompting-artifact-chatgpt.mp4 = source with the VEED watermark and burned-in logo removed:
//        python3 scripts/remove-veed-watermark.py <source>.mp4 <out>.mp4 --erase 44,996,252,52 Played continuously; composition frame N == source time N/30.
// Audio: audio/prompting-artifact-chatgpt.mp3, narration extracted from the source (raw, no padding).
//
// The source is blank (white) from 0:00-0:29 and 2:19.5-3:19.7; those stretches are placeholders
// for screenshots the user will supply. Demo scenes are cut on visual changes and zoomed to the
// centre of the action (crops the corners where the watermark and burned-in logo sat).
//
//  scene                                          | src start | src end | frames
//  -----------------------------------------------|-----------|---------|-------
//  1  title card                                   |    0.00   |   3.00  |   90
//  2  intro screenshot (placeholder)               |    3.00   |  29.00  |  780
//  3  desktop: drag a file into ChatGPT            |   29.00   |  32.70  |  111
//  4  desktop: + menu (add photos & files)          |   32.70   |  41.37  |  260
//  5  phone: + menu, photo of handwritten notes     |   41.37   |  55.63  |  428
//  6  phone: camera, capture the notes              |   55.63   |  70.60  |  449
//  7  phone: type transcription prompt              |   70.60   |  90.17  |  587
//  8  phone: ChatGPT's verbatim transcription       |   90.17   | 105.63  |  464
//  9  phone: "Arrange this by level..." prompt      |  105.63   | 121.23  |  468
// 10  phone: AI Fluency Levels result               |  121.23   | 125.03  |  114
// 11  desktop: continue on desktop, Level 4 result  |  125.03   | 139.47  |  433
// 12  outro screenshot 1 (placeholder)             |  139.47   | 169.47  |  900
// 13  outro screenshot 2 (placeholder)             |  169.47   | 199.67  |  906
//                                                                  total   5990

const CLIP = 'video/prompting-artifact-chatgpt.mp4';

export const promptingArtifactChatGPT: VideoData = {
  audioSrc: 'audio/prompting-artifact-chatgpt.mp3',
  clipSrc: CLIP,
  scenes: [
    // 1 (0:00 -> 0:03)
    {
      layout: 'title-card-green',
      title: 'Prompting with an Artifact',
      label: 'CHATGPT DEMO',
      durationInFrames: 90,
    },

    // 2 (0:03 -> 0:29) intro narration, source is blank here
    {
      layout: 'centered-image-caption',
      image: 'placeholder:Intro screenshot (0:03-0:29)',
      objectFit: 'contain',
      durationInFrames: 780,
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
        { startFrame: -30, scale: 1.2, originX: 50, originY: 50 },
        { startFrame: 122, scale: 1.35, originX: 65, originY: 55 },
      ],
      durationInFrames: 433,
    },

    // 12 (2:19.47 -> 2:49.47) outro narration, source is blank here
    {
      layout: 'centered-image-caption',
      image: 'placeholder:Outro screenshot 1 (2:19-2:49)',
      objectFit: 'contain',
      durationInFrames: 900,
    },

    // 13 (2:49.47 -> 3:19.67)
    {
      layout: 'centered-image-caption',
      image: 'placeholder:Outro screenshot 2 (2:49-3:19)',
      objectFit: 'contain',
      durationInFrames: 906,
    },
  ],
};
