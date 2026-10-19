import { VideoData } from '../scenes/types';

// ChatGPT Live Video & Screen Sharing — tutorial / demo video
// Main audio: audio/chatgpt-live-video-full.mp3 — the ORIGINAL recording's own audio track,
//   extracted from dumping/ChatGPT Live.mp4. This is real narration plus ChatGPT's actual
//   spoken responses during the demo (not a synthetic VO) — 194.37s.
// Demo footage: video/chatgpt-live.mp4 — same source, portrait mobile screen recording
//   (576x1248), inserted as a video-clip element only for the steps/demo scenes that need
//   to show what's on screen. Text-only scenes carry no video.
// Scene boundaries below come from a Whisper word-timestamp pass on the extracted audio.
// Audio is padded with 3s (90 frames) of silence at the start to make room for the title card,
// via audio/chatgpt-live-video-padded.mp3 — all timestamps below are relative to the original
// recording and are offset by +90 frames when placed in the scene list.
//
//  scene                                    | start (s) | dur (f)
//  ------------------------------------------|-----------|--------
//  0  title card                             |    —      |    90
//  1  hook                                   |   0.00    |   164
//  2  why it matters                         |   5.48    |   491
//  3  step 1 — open the app                  |  21.84    |   266
//  4  step 2 — tap voice icon                |  30.70    |   134
//  5  step 3 — tap plus icon                 |  35.18    |   117
//  6  step 4 — live video or share screen    |  39.08    |   410
//  7  demo intro                             |  52.76    |   192
//  8  start broadcast                        |  59.16    |   298
//  9  note — ChatGPT can see your screen     |  69.08    |   143
//  10 ask: describe the screen (+ ChatGPT's spoken reply)     |  73.86    |   760
//  11 ask: review the value prop (+ ChatGPT's spoken reply)   |  99.18    |   685
//  12 ask: turn into an improvement plan (+ ChatGPT's reply)  | 122.02    |   635
//  13 tip — switch to live video             | 143.20    |   211
//  14 after the session                      | 150.24    |   398
//  15 practical notes                        | 163.52    |   571
//  16 closing                                | 182.56    |   356

export const chatgptLiveVideo: VideoData = {
  audioSrc: 'audio/chatgpt-live-video-padded.mp3',
  avatarSrc: 'avatar-chatgpt-live-video.mp4',
  avatarStartFrame: 0,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'ChatGPT Screen Sharing & Live Video',
      label: 'SCREEN SHARING',
      durationInFrames: 90,
    },
    {
      layout: 'label-title-body',
      label: 'THE HOOK',
      title: 'Sometimes the fastest way to use AI\nis not to explain it, but to show it',
      body: [],
      durationInFrames: 164,
    },
    {
      layout: 'label-title-body',
      label: 'WHY IT MATTERS',
      title: 'Point ChatGPT at the work instead\nof writing a long prompt',
      body: [
        'A slide, dashboard, landing page, or workflow',
        'Ask it to observe, diagnose, and decide what to do next',
      ],
      bodyTimings: [200, 320],
      durationInFrames: 491,
    },
    {
      layout: 'label-title-body',
      label: 'STEP 1',
      title: 'Open the ChatGPT mobile app',
      body: ['Signed in, on a paid plan'],
      bodyTimings: [90],
      durationInFrames: 266,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 30.70,
      panelLayout: 'text-left',
      label: 'STEP 2',
      title: 'Tap the Voice icon',
      durationInFrames: 134,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 35.18,
      panelLayout: 'text-left',
      label: 'STEP 3',
      title: 'Tap the Plus icon',
      durationInFrames: 117,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 39.08,
      panelLayout: 'text-left',
      label: 'STEP 4',
      title: 'Choose Live video\nor Share screen',
      body: [
        'Live video — turns on your camera',
        'Share screen — shows ChatGPT your mobile screen',
      ],
      bodyTimings: [50, 220],
      durationInFrames: 410,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 52.76,
      panelLayout: 'text-left',
      label: 'THE DEMO',
      title: 'Reviewing the Lead with AI\nlanding page',
      durationInFrames: 192,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 59.16,
      panelLayout: 'text-left',
      label: 'GETTING STARTED',
      title: 'Start a voice chat, tap Plus,\nselect Share Screen, then\nStart Broadcast',
      durationInFrames: 298,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 69.08,
      panelLayout: 'text-left',
      label: 'NOTE',
      title: 'From here, ChatGPT can see\nyour mobile screen',
      durationInFrames: 143,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 73.86,
      panelLayout: 'text-left',
      label: 'FIRST, CHECK CONTEXT',
      title: '"Describe what you\nsee on the screen."',
      body: ['ChatGPT replies out loud, confirming it\'s looking at the right thing'],
      bodyTimings: [300],
      durationInFrames: 760,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 99.18,
      panelLayout: 'text-left',
      label: 'ASK FOR FEEDBACK',
      title: '"Can you review this\nlanding page and tell me\nif the value proposition\nis clear?"',
      body: ['ChatGPT responds out loud on messaging, structure, and clarity'],
      bodyTimings: [280],
      durationInFrames: 685,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-live.mp4',
      videoStartTime: 122.02,
      panelLayout: 'text-left',
      label: 'REFINE NATURALLY',
      title: '"Turn this into a practical\nimprovement plan, including\nmessaging, layout, and\ncalls to action."',
      body: ['ChatGPT talks through a step-by-step improvement plan'],
      bodyTimings: [280],
      durationInFrames: 635,
    },
    {
      layout: 'label-title-body',
      label: 'TIP',
      title: 'Need more context?\nSwitch to Live video',
      body: [],
      durationInFrames: 211,
    },
    {
      layout: 'label-title-body',
      label: 'AFTER THE SESSION',
      title: 'The conversation is saved\nin your chat',
      body: [
        'Reread ChatGPT\'s observations and feedback',
        'Turn it into notes, next steps, or a follow-up action plan',
      ],
      bodyTimings: [60, 200],
      durationInFrames: 398,
    },
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: 'A few things to keep in mind',
      body: [
        'Mobile app only: Live video and screen sharing require a paid plan',
        'Mind what you share: avoid confidential or sensitive information',
        'Always verify: check the output before acting on it',
      ],
      bodyTimings: [30, 220, 400],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['user', 'eye', 'check'],
      durationInFrames: 571,
    },
    {
      layout: 'centered-quote',
      text: 'Stop translating every visual situation into text. Show ChatGPT the context directly, then decide what to trust, refine, and act on.',
      animation: 'typewriter',
      durationInFrames: 356,
    },
  ],
};
