import { VideoData } from '../scenes/types';

// ChatGPT Plugins — Tutorial / demo video (RE-CUT 2026-10-07: new 254.3s recording about the Plugin Creator, "Larry")
// Audio: audio/chatgpt-plugins.mp3 — narration from dumping/ChatGPT Plugins.mp4, PRE-PADDED with 3.00s silence
//        (Video.tsx trims audioStartFrame frames off the file). Whisper on unpadded audio; comp_frame = 90 + round(t*30).
// Video: video/chatgpt-plugins.mp4 — screen recording, 1024x576. Blank/white 0–75.3s and 199.1–254.3s → graphic scenes.
// Demo clip carries no overlay card (feedback_no_step_cards).
//
//  scene                              | start (s) | end (s) | frames
//  -----------------------------------|-----------|---------|-------
//  1  title card                      |  silent   |         |   90
//  2  hook: add-ons / package         |   0.0     |  12.4   |  372
//  3  inside the package              |  12.4     |  33.0   |  618
//  4  type @ to use                   |  33.0     |  43.6   |  318
//  5a Larry intro image               |  43.6     |  54.9   |  339
//  5b what Larry is made of           |  54.9     |  75.3   |  612
//  6  demo video-clip                 |  75.3     | 199.1   | 3714
//  7  skill / app / plugin            | 199.1     | 213.4   |  429
//  8  skill or plugin?                | 213.4     | 230.2   |  504
//  9  availability                    | 230.2     | 254.34  |  724
//                                              total = 90 + 7630 = 7720

export const chatGPTPlugins: VideoData = {
  audioSrc: 'audio/chatgpt-plugins-v2.mp3',
  audioStartFrame: 90,
  clipSrc: 'video/chatgpt-plugins.mp4',
  clipStartFrame: 90,
  scenes: [
    { layout: 'title-card-green', title: 'Plugins in ChatGPT', label: 'CHATGPT PLUGINS', durationInFrames: 90 },

    // 2 — "Plugins are add-ons that you create to give ChatGPT reusable instructions, tools, or both… think of a plugin as a package"
    {
      layout: 'label-title-body',
      label: 'PLUGINS',
      title: 'Add-ons you create\nfor ChatGPT',
      body: ['Reusable instructions, tools, or both', 'Think of a plugin as a package'],
      bodyTimings: [140, 265],
      image: 'images/chatgpt-plugins/plugins-icon.png',
      imageHeight: 420,
      durationInFrames: 372,
    },

    // 3 — skills + app connections (skills 14.28s, app connections 20.62s, "one or more… or both" 26.7s)
    {
      layout: 'label-title-body',
      label: 'INSIDE THE PACKAGE',
      title: 'What a plugin can contain',
      body: [
        'Skills: the steps, rules and output formats ChatGPT follows',
        'App connections: retrieve information or take actions in other apps',
        'One or more skills, app connections, or both',
      ],
      bodyTimings: [50, 240, 425],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'bolt', 'sparkles'],
      durationInFrames: 618,
    },

    // 4 — "select a plugin by typing the add symbol in any conversation instead of pasting the same instructions"
    {
      layout: 'label-title-body',
      label: 'USING A PLUGIN',
      title: 'Type @ in any conversation',
      body: ['Select an installed plugin with the @ symbol', 'No more pasting the same detailed instructions'],
      bodyTimings: [90, 175],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['chat-bubble-left-right', 'check'],
      durationInFrames: 318,
    },

    // 5a — "in this demo, I'm going to build Larry, a leadership update creator"
    {
      layout: 'centered-image-caption',
      image: 'images/chatgpt-plugins/larry-plugin.png',
      imageWidth: 1300,
      caption: 'Demo: Larry, a leadership update creator',
      objectFit: 'contain',
      durationInFrames: 339,
    },

    // 5b — skill 55.8s, app connections 61.5s, "Larry knows both what to do, but also where to get the information" 66.7s
    {
      layout: 'label-title-body',
      label: 'LARRY',
      title: 'Inside Larry',
      body: [
        'Skill: how the weekly update should be written',
        'App connections: Google Drive and Slack for the source information',
        'Larry knows what to do, and where to get the information',
      ],
      bodyTimings: [25, 195, 350],
      image: 'images/chatgpt-plugins/larry-plugin.png',
      imageHeight: 460,
      durationInFrames: 612,
    },

    // 6 — Demo (75.3 → 199.1), no overlay card
    // VO: plugins page → Create plugin → plugin creator conversation → give Larry's instructions → add Drive + Slack
    // conversationally → link to plugin page → check skill, install → new chat, "@Larry" draft this week's update →
    // verify against notes, four sections, no invented details → return to creator to update and retest.
    // Split in 3 so a note shows only while the VO explains adding apps conversationally (115.5–141.8s).
    { layout: 'video-clip', videoSrc: 'video/chatgpt-plugins.mp4', videoStartTime: 75.3, durationInFrames: 1206 },
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-plugins.mp4',
      videoStartTime: 115.5,
      label: 'NOTE',
      title: 'Set up apps conversationally',
      body: ['No menu on the plugin page: tell the plugin creator which apps to include'],
      bodyTimings: [30],
      overlayPosition: 'bottom',
      durationInFrames: 789,
    },
    { layout: 'video-clip', videoSrc: 'video/chatgpt-plugins.mp4', videoStartTime: 141.8, durationInFrames: 1719 },

    // 7 — "the skill tells Larry how to do the job. The app connection gives access… the plugin packages all those pieces"
    {
      layout: 'label-title-body',
      label: 'THE DISTINCTION',
      title: 'Skill + app connection\n= plugin',
      body: [
        'Skill: tells Larry how to do the job',
        'App connection: gives access to the information or tools needed',
        'Plugin: packages all those pieces together',
      ],
      bodyTimings: [80, 150, 330],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'bolt', 'sparkles'],
      durationInFrames: 429,
    },

    // 8 — skill vs plugin (213.5s, 219.4s, 225.4s)
    {
      layout: 'label-title-body',
      label: 'SKILL OR PLUGIN?',
      title: 'Which one do you need?',
      body: [
        'A reusable instruction for one task? A skill may be enough',
        'Packaging skills with apps or other capabilities? Use a plugin',
        'Or distribute the whole workflow as one installable experience',
      ],
      bodyTimings: [10, 175, 355],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['lightbulb', 'compare', 'rocket'],
      durationInFrames: 504,
    },

    // 9 — availability (230.5s, 235.2s, 243.6s, 249.5s)
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Before you start',
      body: [
        'The plugin creator is available on any ChatGPT plan',
        'Plugin capabilities depend on your plan, workspace, role and region',
        'Your workspace admin controls creation, sharing and publishing',
        "Don't see Create Plugin? Check with your admin",
      ],
      bodyTimings: [10, 140, 395, 575],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['check', 'sliders', 'eye', 'user'],
      durationInFrames: 724,
    },
  ],
};
