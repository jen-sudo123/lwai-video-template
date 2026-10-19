import { VideoData } from '../scenes/types';

// Gemini Screen Sharing — tutorial / demo video
// Background video + audio: video/gemini-screen-sharing.mp4
// Start the background at frame 90 so the title card has 3s before the source clip begins.
// Timing based on videos/gemini-screen-sharing/transcript/gemini-screen-sharing.srt.
//
//  scene                                      | start (s) | dur (f)
//  -------------------------------------------|-----------|--------
//  0  title card                              |    —      |    90
//  1  hook                                    |   0.00    |   317
//  2  what makes it useful                    |  10.56    |   364
//  3  open Gemini Live                        |  22.68    |   342
//  4  choose screen sharing                   |  34.08    |   527
//  5  confirm context on the landing page     |  51.64    |   898
//  6  ask for the first takeaway              |  81.56    |   667
//  7  ask for executive-focused improvements  | 103.80    |   755
//  8  after the session                       | 128.96    |   504
//  9  practical notes                         | 145.76    |   665

export const geminiScreenSharing: VideoData = {
  avatarSrc: 'avatar-gemini-screen-sharing.mp4',
  avatarStartFrame: 90,
  // Hide the avatar while the narration is quoting Gemini's spoken answer, not the host:
  //  - 71.76s-81.56s: "I see the lead with AI website..." (describing the screen)
  //  - 95.00s-103.16s: "The main message is that this site offers..." (first-visit takeaway)
  //  - 113.80s-122.08s: "To immediately grab executive attention..." (improvement suggestion)
  avatarHideRanges: [
    { from: 2243, to: 2537 },
    { from: 2940, to: 3185 },
    { from: 3504, to: 3752 },
  ],
  clipSrc: 'video/gemini-screen-sharing.mp4',
  clipStartFrame: 90,
  clipMuted: false,
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Gemini Screen Sharing',
      label: 'GEMINI LIVE',
      durationInFrames: 90,
    },
    {
      layout: 'label-title-body',
      label: 'THE HOOK',
      title: 'Talk to Gemini Live,\nthen show it your screen',
      body: [
        'Use your voice instead of typing a prompt',
        'Keep the conversation natural inside the Gemini mobile app',
      ],
      bodyTimings: [90, 190],
      durationInFrames: 317,
    },
    {
      layout: 'label-title-body',
      label: 'WHY IT HELPS',
      title: 'Gemini Live can work with\nwhat you show it',
      body: [
        'Share your camera when the visual context is in front of you',
        'Share your mobile screen when the work is already on the device',
        'Move from describing the problem to showing the problem directly',
      ],
      bodyTimings: [45, 160, 270],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['eye', 'device-phone-mobile', 'sparkles'],
      durationInFrames: 364,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-screen-sharing.mp4',
      videoStartTime: 22.68,
      panelLayout: 'text-left',
      label: 'GETTING STARTED',
      title: 'Open Gemini,\nthen tap the sound-wave icon\nto start Gemini Live',
      body: ['From there, choose whether to share your camera or your screen'],
      bodyTimings: [160],
      durationInFrames: 342,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-screen-sharing.mp4',
      videoStartTime: 34.08,
      panelLayout: 'text-left',
      label: 'SCREEN SHARING',
      title: 'Choose Screen sharing,\ntap Start Broadcast,\nand watch for the red indicator',
      body: [
        'Gemini can now see what is happening on your phone screen while you talk',
      ],
      bodyTimings: [300],
      durationInFrames: 527,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-screen-sharing.mp4',
      videoStartTime: 51.64,
      panelLayout: 'text-left',
      label: 'CHECK CONTEXT FIRST',
      title: 'Open the page you want reviewed,\nthen ask: "What are you seeing?"',
      body: [
        'This confirms Gemini is looking at the right screen before you ask for advice',
        'In this demo, the page is the Lead with AI landing page in a mobile browser',
      ],
      bodyTimings: [290, 510],
      durationInFrames: 898,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-screen-sharing.mp4',
      videoStartTime: 81.56,
      panelLayout: 'text-left',
      label: 'ASK FOR THE TAKEAWAY',
      title: '"If you were visiting this page\nfor the first time,\nwhat message would you take away?"',
      body: [
        'Gemini summarizes the page as practical AI training for leaders with hands-on resources',
      ],
      bodyTimings: [310],
      durationInFrames: 667,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-screen-sharing.mp4',
      videoStartTime: 103.8,
      panelLayout: 'text-left',
      label: 'REFINE NATURALLY',
      title: '"What would you improve first\nto make this page\nmore compelling for executives?"',
      body: [
        'Use follow-up questions, clarifications, and interruptions the same way you would with a human reviewer',
        'The value is not a perfect prompt. It is shared visual context plus live iteration.',
      ],
      bodyTimings: [260, 520],
      durationInFrames: 755,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/gemini-screen-sharing.mp4',
      videoStartTime: 128.96,
      panelLayout: 'text-left',
      label: 'AFTER THE SESSION',
      title: 'Stop sharing.\nThe conversation stays saved',
      body: [
        'Tap the X to end screen sharing when you are finished',
        'Come back later in Gemini chat to review suggestions and continue the conversation',
      ],
      bodyTimings: [100, 230],
      durationInFrames: 504,
    },
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: 'What to keep in mind',
      body: [
        'Gemini Live runs on Android and iOS in the Gemini mobile app',
        'You can continue later in the Gemini web app, but the live voice experience is mobile-first',
        'When connected, Gemini can use Gmail, Drive, and Calendar for more personalized help',
      ],
      bodyTimings: [40, 250, 470],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['device-phone-mobile', 'arrow-path', 'briefcase'],
      durationInFrames: 665,
    },
  ],
};
