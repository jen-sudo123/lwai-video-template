import { VideoData } from '../scenes/types';

// Copilot Voice — tutorial / demo video
// Audio: audio/copilot-voice-intro.wav — 3s silent intro + 195.2s VO
// Video: video/copilot-voice.mp4 — 195.2s screen recording with embedded VO
//
//  scene                                      | comp start | comp end | dur (frames @30fps)
//  -------------------------------------------|------------|----------|--------------------
//  1  title card                              |      0     |     90   |   90
//  2  hook                                    |     90     |    273   |  183
//  3  what is Copilot Voice                   |    273     |   1118   |  845
//  4  where to find it                        |   1118     |   1432   |  314
//  5  demo — setup prompt                     |   1432     |   2468   | 1036
//  6  Copilot responds                        |   2468     |   3430   |  962
//  7  redirect + interrupt                    |   3430     |   4087   |  657
//  8  after the session                       |   4087     |   4451   |  364
//  9  accessibility notes                     |   4451     |   5865   | 1414

export const copilotVoice: VideoData = {
  audioSrc: 'audio/copilot-voice-intro.wav',
  clipSrc: 'video/copilot-voice.mp4',
  avatarSrc: 'video/avatar-copilot-voice.mp4',
  avatarStartFrame: 0,
  avatarHideRanges: [{ from: 2580, to: 4035 }],
  scenes: [
    {
      layout: 'title-card-green',
      title: 'Copilot Voice',
      label: 'MULTIMODAL AI',
      durationInFrames: 90,
    },
    {
      layout: 'label-title-body',
      label: 'THE HOOK',
      title: 'When typing slows down your thinking,\nvoice gives you a faster way in',
      body: [
        'Think out loud, refine in real time, and leave with structured output',
      ],
      bodyTimings: [40],
      durationInFrames: 183,
    },
    {
      layout: 'label-title-body',
      label: 'WHAT IT IS',
      title: 'Copilot Voice lets you think out loud\nand leave with a structured result',
      body: [
        'Speak through the rough version instead of drafting the perfect prompt',
        'Copilot listens, responds out loud, and leaves you with a text transcript',
        'Refine the output from the transcript after the conversation ends',
      ],
      bodyTimings: [70, 280, 520],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['bolt', 'compare', 'sparkles'],
      durationInFrames: 845,
    },
    {
      layout: 'centered-image-caption',
      image: 'images/copilot-voice/m365-copilot.png',
      caption: 'Look for the Soundwave icon across web, desktop, and mobile.\nYou find it on the right side of the prompt box.',
      objectFit: 'contain',
      imageWidth: 900,
      imageZoom: {
        centerX: 0.90,
        centerY: 0.72,
        scale: 2.5,
        startFrame: 160,
      },
      durationInFrames: 314,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-voice.mp4',
      videoStartTime: 44.72,
      label: 'THE DEMO',
      title: "Please imagine you are Adam Grant, the organizational psychologist and author.\n\nI'm dealing with a significant drop in productivity after a restructuring that merged several departments. I need a thinking partner to help me understand what may be hurting team cohesion and morale.\n\nStart by asking me clarifying questions. Don't jump to solutions yet.",
      panelLayout: 'quote-cards-left',
      panelLeft: 28,
      cardDelay: 357,
      durationInFrames: 1036,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-voice.mp4',
      videoStartTime: 79.26,
      label: 'COPILOT RESPONDS',
      title: 'Diagnostic questions help you\nopen up the problem',
      body: [
        'Push back on my assumption that this is mainly about morale.\nWhat else could explain the productivity drop?',
      ],
      overlayHideFrom: 650,
      bodyTimings: [702],
      overlayPosition: 'bottom',
      bodyOpenFrom: 702,
      openBodyAnimation: 'typewriter',
      openBodyVariant: 'quote',
      openBodyHideFrom: 962,
      durationInFrames: 962,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-voice.mp4',
      videoStartTime: 111.32,
      label: 'REDIRECT & INTERRUPT',
      title: 'Broaden the diagnosis and\ninterrupt when needed',
      overlayPosition: 'bottom',
      cardDelay: 32,
      durationInFrames: 657,
    },
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-voice.mp4',
      videoStartTime: 133.24,
      label: 'AFTER THE SESSION',
      title: 'The transcript is saved.\nTurn it into a deliverable later',
      overlayPosition: 'bottom',
      cardDelay: 32,
      durationInFrames: 364,
    },
    {
      layout: 'label-title-body',
      label: 'ACCESSIBILITY NOTES',
      title: 'What matters in day-to-day use',
      body: [
        'Consumer Copilot: voice use is not limited, but M365 subscribers get priority when capacity is tight',
        'Individual voice conversations may be time-limited and can disconnect automatically',
        'M365 Copilot: voice chat is subject to service capacity rather than a per-session minute cap',
        'Availability depends on license status, supported language, and admin controls',
      ],
      bodyTimings: [294, 702, 951, 1220],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['clock', 'eye', 'check', 'user'],
      durationInFrames: 1414,
    },
  ],
};
