import { VideoData } from '../scenes/types';

// ChatGPT Projects - Tutorial / demo video
// Source: dumping/Day 5_ChatGPT projects (2).mp4, screen recording with embedded narration.
// Audio: audio/chatgpt-projects.mp3, narration extracted directly from the source recording (raw, no padding).
// Video: video/chatgpt-projects.mp4, full 276.97s recording, played continuously behind every scene.
// Avatar: video/chatgpt-projects-avatar.mp4, full-frame AI presenter loop, cropped to a circle.
// Scenes aligned to Whisper-extracted segment timestamps (composition frame N == raw audio/video time N/30).
//
//  scene                                        | VO start  | VO end   | dur (frames @30fps)
//  ---------------------------------------------|-----------|----------|--------------------
//  1  title card                                 |   0.00    |   3.00   |    90
//  2  label-title-body (what is a Project)       |   1.52    |  31.74   |   862
//  3  video-clip (create project, name Larry)    |  31.74    |  51.46   |   592
//  4  video-clip (project-only memory, create)   |  51.46    |  80.64   |   875
//  5  video-clip (model picker, thinking effort)  |  80.64    | 112.00   |   941
//  6  video-clip (instructions, CODO framework)   | 112.00    | 154.26   |  1268
//  7  video-clip (sources, file limits, Drive)    | 154.26    | 182.46   |   846
//  8  video-clip (scenario prompt, sidebar chats) | 182.46    | 210.30   |   835
//  9  video-clip (move to project, share, tools)  | 210.30    | 251.16   |  1226
// 10  label-title-body (availability, closing)    | 251.16    | 276.97   |   774
//                                                                 total    8309

export const chatGPTProjects: VideoData = {
  audioSrc: 'audio/chatgpt-projects.mp3',
  clipSrc: 'video/chatgpt-projects.mp4',
  avatarSrc: 'video/chatgpt-projects-avatar.mp4',
  scenes: [
    // 1 (0:00 -> 0:03)
    {
      layout: 'title-card-green',
      title: 'ChatGPT Projects',
      label: 'ORGANIZE YOUR WORK',
      durationInFrames: 90,
    },

    // 2 - What is a Project (0:01.52 -> 0:31.74, ~30.2s)
    // VO: "ChatGPT Projects is a persistent workspace that keeps your chats, files, and
    //      operating instructions together so that you can stay consistent across weeks of
    //      work without re-briefing every time... In projects, you can set project
    //      instructions, you can attach files to the project, and you can use project-only
    //      memory."
    {
      layout: 'label-title-body',
      label: 'CHATGPT PROJECTS',
      title: 'One workspace, not one more chat',
      body: [
        'Chats, files, and instructions kept together',
        'Stay consistent for weeks, no re-briefing',
        'Set instructions, attach files, use project memory',
      ],
      bodyTimings: [0, 300, 628],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 862,
    },

    // 3 - Create a project, name it Larry (0:31.74 -> 0:51.46, ~19.7s)
    // VO: "So let's create a project... scroll to projects... click on the plus icon...
    //      I'm going to build a persistent assistant that helps me write weekly leadership
    //      updates, and I'm going to name him Larry."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 31.73,
      durationInFrames: 592,
    },

    // 4 - Project-only memory, create project (0:51.46 -> 1:20.64, ~29.2s)
    // VO: "Now for memory, I'm going to select project-only memory... please note that you
    //      can only select your memory when you're creating the project, and that when you
    //      share your project, even after creation, the memory setting will always be
    //      project-only. Now I click on create project, and voila, the project is here."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 51.47,
      avatarPosition: 'bottom-left',
      durationInFrames: 875,
    },

    // 5 - Model picker, thinking effort (1:20.64 -> 1:52.00, ~31.4s)
    // VO: "I can click on the model picker... open configure, and now I can choose which
    //      model to use. I can also adjust the thinking effort for thinking or pro, which
    //      is very helpful when I need deeper reasoning."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 80.63,
      avatarPosition: 'bottom-left',
      durationInFrames: 941,
    },

    // 6 - Instructions / CODO framework (1:52.00 -> 2:34.26, ~42.3s)
    // VO: "To add my prompt template, I need to navigate to the three dots, then project
    //      settings, then instructions... this consists of the four consistent elements in
    //      line with CODO Super Prompting... and the fifth element, the variable element."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 112.00,
      avatarPosition: 'bottom-left',
      durationInFrames: 1268,
    },

    // 7 - Sources, file limits, Drive/Slack (2:34.26 -> 3:02.46, ~28.2s)
    // VO: "In the sources section, I can provide additional context... upload 10 files at a
    //      time, up to 512 megabytes each... I can also now connect it with my workspace,
    //      like Drive or Slack, although this option is only available for paid plans."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 154.27,
      avatarPosition: 'bottom-left',
      durationInFrames: 846,
    },

    // 8 - Scenario prompt, sidebar chats (3:02.46 -> 3:30.30, ~27.8s)
    // VO: "I can now try a scenario prompt, which is the variable part of the prompt
    //      template... and I can now access this chat anytime by clicking the Larry
    //      project in the left sidebar."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 182.47,
      avatarPosition: 'bottom-left',
      durationInFrames: 835,
    },

    // 9 - Move to project, share, available tools (3:30.30 -> 4:11.16, ~40.9s)
    // VO: "You can drag an existing chat into a project or choose move to project... by
    //      clicking on share, you can make the project a collective resource... you cannot
    //      make projects publicly shareable, so GPTs are still the way to go for that...
    //      you can use all of your typical ChatGPT tools in projects, like Web Search, Deep
    //      Research, Canvas, and more."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-projects.mp4',
      videoStartTime: 210.30,
      avatarPosition: 'bottom-left',
      durationInFrames: 1226,
    },

    // 10 - Availability / closing (4:11.16 -> 4:36.97, ~25.8s)
    // VO: "Projects and project sharing are now available to all free and paid subscription
    //      types globally... Live, Slack and Google Drive connections are only available on
    //      paid plans... for business, enterprise and EDU, projects will inherit the
    //      workspace admin controls and restrictions."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Free to use. Some limits apply.',
      body: [
        'Projects and sharing are free for everyone, globally',
        'Drive and Slack connections need a paid plan',
        'Business, Enterprise, EDU inherit workspace admin controls',
      ],
      bodyTimings: [34, 274, 444],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      avatarPosition: 'bottom-left',
      durationInFrames: 774,
    },
  ],
};
