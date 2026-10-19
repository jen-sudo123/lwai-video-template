import { VideoData } from '../scenes/types';

// Gemini Live — tutorial / demo video
// Audio: audio/gemini-live-intro.mp3 — 3s silent intro + 188.01s VO
// Video: video/gemini-live.mp4 — 188.01s screen recording with embedded VO
// Timing based on GUIDE.md frame references, shifted by 90 frames for the intro card.
//
//  scene                                      | comp start | comp end | dur (frames @30fps)
//  -------------------------------------------|------------|----------|--------------------
//  1  title card                              |      0     |     90   |   90
//  2  hook                                    |     90     |    240   |  150
//  3  what is Gemini Live                     |    240     |    848   |  608
//  4  where to find it                        |    848     |   1204   |  356
//  5  demo — setup prompt                     |   1204     |   2086   |  882
//  6  Gemini responds                         |   2086     |   2995   |  909
//  7  redirect + camera / screen share        |   2995     |   3865   |  870
//  8  after the session                       |   3865     |   4517   |  652
//  9  operational notes                       |   4517     |   5718   | 1201

export const geminiLive: VideoData = {
  audioSrc: 'audio/gemini-live-intro.wav',
  avatarSrc: 'avatar-gemini-live.mp4',
  avatarStartFrame: 90,
  avatarHideRanges: [{ from: 2193, to: 2718 }, { from: 2997, to: 3368 }],
  clipSrc: 'video/gemini-live.mp4',
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Gemini Live',
      label: 'MULTIMODAL AI',
      durationInFrames: 90,
    },
    {
      layout: 'label-title-body',
      label: 'THE HOOK',
      title: 'Think through problems out loud\nwithout stopping to type',
      body: [
        'Speaking can be faster than typing when your thinking is still forming',
      ],
      bodyTimings: [40],
      durationInFrames: 150,
    },
    {
      layout: 'label-title-body',
      label: 'WHAT IT IS',
      title: 'Gemini Live is built for natural\nback-and-forth conversation',
      body: [
        'Start talking before the perfect prompt is fully formed',
        'Add context as it comes to you and redirect in real time',
        'Use it as a thinking partner instead of a typed prompt box',
      ],
      bodyTimings: [70, 240, 410],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'compare', 'sparkles'],
      durationInFrames: 608,
    },
    {
      layout: 'centered-image-caption',
      image: 'images/gemini-live/voice.jpeg',
      caption: 'Open the mobile Gemini app and tap the voice or Live icon in the prompt area.',
      objectFit: 'contain',
      imageWidth: 900,
      imageZoom: {
        centerX: 0.66,
        centerY: 0.89,
        scale: 2.45,
        startFrame: 230,
      },
      durationInFrames: 356,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-live.mp4',
      videoStartTime: 37.14,
      label: 'THE DEMO',
      title: "Please imagine you are Adam Grant, the organizational psychologist and author.\n\nI'm dealing with a significant drop in productivity after a restructuring that merged several departments. I need a thinking partner to help me understand what may be hurting team cohesion and morale.\n\nStart by asking me clarifying questions. Don't jump to solutions yet.",
      panelLayout: 'quote-cards-left',
      panelLeft: 28,
      cardDelay: 176,
      durationInFrames: 882,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-live.mp4',
      videoStartTime: 66.52,
      label: 'GEMINI RESPONDS',
      title: 'Diagnostic questions help you\nopen up the problem',
      body: [
        'Push back on my assumption that this is mainly about morale.\nWhat else could explain the productivity drop?',
      ],
      overlayHideFrom: 620,
      bodyTimings: [678],
      overlayPosition: 'bottom',
      bodyOpenFrom: 678,
      openBodyAnimation: 'typewriter',
      openBodyVariant: 'quote',
      openBodyHideFrom: 1278,
      durationInFrames: 1278,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-live.mp4',
      videoStartTime: 96.82,
      label: 'STAY IN CONTROL',
      title: 'Interrupt, redirect, then add\ncamera or screen context',
      overlayPosition: 'bottom',
      cardDelay: 32,
      durationInFrames: 518,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-live.mp4',
      videoStartTime: 125.84,
      label: 'AFTER THE SESSION',
      title: 'The conversation is saved.\nTurn it into a deliverable later',
      body: [
        'Return to the saved chat whenever you want to keep going',
        'Ask Gemini to turn the discussion into a reset plan, meeting agenda, or leadership brief',
      ],
      bodyTimings: [0, 60],
      panelLayout: 'cards-left',
      panelLeft: 200,
      durationInFrames: 308,
    },
    {
      layout: 'centered-quote',
      text: 'Talk through complex issues at your own pace, interrupt when needed, and keep refining the conversation without typing.',
      animation: 'typewriter',
      durationInFrames: 344,
    },
    {
      layout: 'label-title-body',
      label: 'OPERATIONAL NOTES',
      title: 'What matters in day-to-day use',
      body: [
        'Background use: on supported devices, conversations may continue from the lock screen',
        'Camera and screen sharing can stop automatically if Live is paused or the screen locks',
        'Activity setting: transcripts, audio, images, and screen shares may be saved',
        'Work or school accounts can have more limited connected app behavior',
      ],
      bodyTimings: [161, 499, 755, 1055],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['clock', 'eye', 'check', 'user'],
      durationInFrames: 1201,
    },
  ],
};
