import { VideoData } from '../scenes/types';

// ChatGPT Voice — Demo / tutorial video
// REMADE 2026-08-12: full swap to a new source recording (dumping/ChatGPT Voice.mp4),
// a polished promo-style capture with its own baked-in narration (extracted to
// audio/chatgpt-voice.mp3). No presenter avatar in this cut — the source has none.
// clipStartFrame/audioStartFrame are both 0 (no offset needed): every scene's
// duration is taken directly from the source's own real timeline, so composition
// frame == video-local frame throughout except for the 45-frame title bumper,
// which just visually covers the first 1.5s while audio/video already play underneath.
//
// IMPORTANT — verified via per-frame pixel scan (not just eyeballing thumbnails):
// the source video is a solid WHITE/blank frame from 0.0s to ~36.0s, and again from
// ~209.8s to the end (269.16s). Scenes that fall entirely in those windows use
// label-title-body (no point showing a "video" that's just a blank canvas); only
// scenes 36.0s-96.0s and 96.6s-209.8s (where real screen content exists) use
// video-clip. Don't move these boundaries without re-checking the source footage.
//
// Video/Audio: video/chatgpt-voice.mp4, audio/chatgpt-voice.mp3 — both 269.16s.
//
//  scene                                        | video-local start | end     | dur (frames @30fps)
//  ---------------------------------------------|--------------------|---------|--------------------
//  1  title-card-green (bumper, video hidden)    |  0.00              |  1.50   |   45
//  2  label-title-body (hook — video is blank)   |  1.50              | 17.86   |  491
//  3  label-title-body (where to find — blank)   | 17.86              | 36.00   |  544
//  4  video-clip (switch voices + options + settings) | 36.00         | 64.92   |  868
//  5  video-clip (GPT Live + multimodal)         | 64.92              | 96.00   |  932
//  6  video-clip (demo — the ask)                | 96.00              |126.12   |  904
//  7  video-clip (ChatGPT responds)               |126.12             |153.24   |  814
//  8  video-clip (push back / stay in control)    |153.24             |196.34   | 1293
//  9  label-title-body (after exit — saved chat)  |196.34             |221.06   |  742
//  10 label-title-body (operational notes)        |221.06             |269.16   | 1443
//                                                                        total    8076

export const chatGPTVoice: VideoData = {
  audioSrc: 'audio/chatgpt-voice.mp3',
  clipSrc: 'video/chatgpt-voice.mp4',
  scenes: [
    // 1 — Title bumper (0:00 → 0:01.50). Audio/video already rolling underneath,
    // hidden until scene 4 reveals real footage (see header note above).
    {
      layout: 'title-card-green',
      title: 'ChatGPT Voice',
      label: 'MULTIMODAL AI',
      durationInFrames: 45,
    },

    // 2 — Hook (0:01.50 → 0:17.86, ~16.4s). Source video is blank here — label-title-body.
    // VO: "...voice can be the better starting point. ChatGPT Voice is the voice layer
    //      inside ChatGPT itself. Instead of stopping to type and engineer the perfect
    //      prompt, you can talk through a problem live and get to clear thinking while
    //      you are still in motion."
    {
      layout: 'label-title-body',
      label: 'CHATGPT VOICE',
      title: 'A faster way to think out loud',
      body: [
        'Voice can be the better starting point when a problem is too nuanced to type cleanly',
        'ChatGPT Voice is the voice layer built into ChatGPT itself',
        'Talk through a problem live and get to clear thinking while you\'re still in motion',
      ],
      bodyTimings: [0, 128, 239],
      durationInFrames: 491,
    },

    // 3 — Where to find voice (0:17.86 → 0:36.00, ~18.1s). Still blank — label-title-body.
    // VO: "So where to find voice in ChatGPT? On mobile, tap the voice icon in the prompt
    //      box. On desktop web, click the voice icon on the right side of the prompt box.
    //      Depending on your rollout, mobile may show voice directly inside the main chat
    //      or in the separate blue orb screen."
    {
      layout: 'label-title-body',
      label: 'WHERE TO FIND VOICE',
      title: 'Voice lives right in\nthe prompt box',
      body: [
        'On mobile, tap the voice icon in the prompt box',
        'On desktop, click the voice icon on the right side of the prompt box',
        'Depending on rollout, mobile may show voice in the main chat or a separate blue orb screen',
      ],
      bodyTimings: [0, 187, 328],
      durationInFrames: 544,
    },

    // 4 — Switch voices + voice options + settings (0:36.00 → 1:04.92, ~28.9s).
    // Real screen content begins here (verified frame scan) — video-clip.
    // VO: "You can switch voices from settings or from the customization menu inside
    //      voice mode itself. ChatGPT gives you nine voice options each with a different
    //      tone and feel. So you can choose one that sounds more calm, energetic, warm or
    //      direct, depending on how you want the interaction to feel. In settings, you
    //      can also select the voice model and adjust the level of intelligence, allowing
    //      you to balance speed, depth and reasoning quality depending on your use case."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-voice.mp4',
      videoStartTime: 36.0,
      label: 'VOICE SETTINGS',
      title: 'Choose the voice,\nand the model behind it',
      body: [
        'Switch voices anytime from Settings or the customization menu inside voice mode',
        '9 voice options, each with its own tone: calm, energetic, warm, or direct',
        'Pick a voice model and adjust the intelligence level',
        'Balance speed, depth, and reasoning quality for your use case',
      ],
      bodyTimings: [0, 181, 566, 704],
      panelLayout: 'cards-left',
      panelLeft: 200,
      durationInFrames: 868,
    },

    // 5 — GPT Live + multimodal (1:04.92 → 1:36.00, ~31.1s)
    // VO: "The newest experience is powered by GPT Live, OpenAI's real-time voice model
    //      designed for natural fluid conversation. GPT Live can listen and respond at
    //      the same time so you can interrupt, clarify, pause to think or redirect it
    //      without waiting for a full answer. You can also combine voice with text and
    //      images in the same chat. For example, you can share an image and discuss it
    //      by voice or switch between speaking and typing without starting a new
    //      conversation."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-voice.mp4',
      videoStartTime: 64.92,
      durationInFrames: 932,
    },

    // 6 — Demo: the ask (1:36.00 → 2:06.12, ~30.1s)
    // VO: "In this demo, I'm using ChatGPT Voice to think through a leadership problem
    //      out loud. I ask ChatGPT, please imagine you are Adam Grant, the organizational
    //      psychologist and author. I'm dealing with a significant drop in productivity
    //      after a restructuring that merged several departments. I need a thinking
    //      partner to help me understand what may be hurting team cohesion and morale.
    //      Start by asking me clarifying questions, don't jump to solutions yet."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-voice.mp4',
      videoStartTime: 96.0,
      label: 'THE DEMO',
      title: 'Using Voice to think through\na leadership problem',
      body: [
        'Please imagine you are Adam Grant, the organizational psychologist and author.',
        'I\'m dealing with a drop in productivity after a restructuring that merged several departments. I need a thinking partner to understand what\'s hurting morale.',
        'Start by asking me clarifying questions. Don\'t jump to solutions yet.',
      ],
      bodyTimings: [179, 394, 758],
      overlayPosition: 'bottom',
      durationInFrames: 904,
    },

    // 7 — ChatGPT responds (2:06.12 → 2:33.24, ~27.1s)
    // VO: "Then ChatGPT responds with a few questions that help me to think deeper. I'm
    //      happy to be your thinking partner. To start, could you walk me through what
    //      changed in the restructuring, what departments merged, what the intended goals
    //      were and what the team dynamics looked like before? That's helpful to know.
    //      When you say they're waiting for direction, whose direction do they seem to be
    //      waiting for? We can go back and forth on the matter of morale or I can redirect
    //      the conversation."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-voice.mp4',
      videoStartTime: 126.12,
      label: 'CHATGPT RESPONDS',
      title: 'Questions that help you\nthink deeper',
      durationInFrames: 814,
    },

    // 8 — Push back / stay in control (2:33.24 → 3:16.34, ~43.1s)
    // VO: "Push back on my assumption that this is mainly about morale. What else could
    //      explain the productivity drop? ChatGPT gives me alternative explanations
    //      like, that's a fair pushback, let's look at the work itself. Has the nature of
    //      tasks changed? Are people unclear on priorities or are there new processes or
    //      tools that might be causing friction? If ChatGPT starts moving too quickly
    //      into advice, I can interrupt and say, pause there. Stay with diagnosis for one
    //      more minute. Ask me two sharper questions."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-voice.mp4',
      videoStartTime: 153.24,
      label: 'STAYING IN CONTROL',
      title: 'Redirect or push back\nat any point in the conversation',
      body: [
        'Push back on my assumption that this is mainly about morale. What else could explain the productivity drop?',
        '"Pause there. Stay with diagnosis for one more minute. Ask me two sharper questions."',
      ],
      bodyTimings: [0, 688],
      overlayPosition: 'bottom',
      durationInFrames: 1293,
    },

    // 9 — After exit: saved chat (3:16.34 → 3:41.06, ~24.7s). Source footage fades to a
    // blank screen partway through this scene, so label-title-body (not video-clip) —
    // matches project convention for availability/wrap-up beats with no UI to show.
    // VO: "After exiting voice mode, the conversation is saved in the chat. I can return
    //      later and ask ChatGPT to turn the discussion into a reset plan, meeting agenda
    //      or short leadership brief. With ChatGPT voice, I can talk through a complex
    //      issue at my own pace, redirect when needed and keep the saved chat as the
    //      starting point for the final work."
    {
      layout: 'label-title-body',
      label: 'AFTER THE CONVERSATION',
      title: 'The chat is saved.\nTurn it into a real deliverable',
      body: [
        'Exit voice mode and the conversation is saved in the chat',
        'Ask ChatGPT to turn it into a reset plan, meeting agenda, or leadership brief',
      ],
      bodyTimings: [0, 124],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 742,
    },

    // 10 — Operational notes (3:41.06 → 4:29.16, ~48.1s)
    // VO: "And here are a few operational notes. Voice is available across ChatGPT
    //      plans, but usage limits differ. Free users get limited access to GPT Live One
    //      Mini. Paid plans get higher allowances with limits depending on the plan,
    //      voice model and intelligence level selected. On mobile enabling background
    //      conversations in settings lets voice continue while you use other apps or
    //      lock your phone. A live conversation can last up to two hours and will also
    //      end if you exit, force close the app or reach your usage limit. Video and
    //      screen sharing are not currently available with the new live model. Eligible
    //      subscribers can use these features through advanced voice on iOS and Android
    //      where separate usage limits apply."
    {
      layout: 'label-title-body',
      label: 'OPERATIONAL NOTES',
      title: 'ChatGPT Voice',
      body: [
        'Free users get limited access on GPT Live mini. Paid plans get higher allowances based on plan, voice model, and intelligence level.',
        'Enable background conversations in Settings to keep voice going while using other apps or with your phone locked.',
        'A conversation can run up to 2 hours. It ends if you exit, force close the app, or hit your usage limit.',
        'Video and screen sharing aren\'t available in the new live model yet. Eligible subscribers can use advanced voice on iOS and Android instead.',
      ],
      bodyTimings: [89, 598, 827, 1082],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 1443,
    },
  ],
};
