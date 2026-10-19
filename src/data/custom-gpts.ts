import { VideoData } from '../scenes/types';

// Custom GPTs - Tutorial / demo video
// Source: dumping/Day5_ GPTs (1).mp4, screen recording with embedded narration.
// Audio: audio/custom-gpts.mp3, narration extracted from the source recording.
// Video: video/custom-gpts.mp4, full 287.9s recording, played continuously behind every scene.
// Scenes aligned to Whisper-extracted segment timestamps.
// Demo scenes (4-11) show the raw recording clean, with no text overlay card.
//
//  scene                                        | VO start  | VO end   | dur (frames @30fps)
//  ---------------------------------------------|-----------|----------|--------------------
//  1  title card                                 |   0.00    |   3.00   |    90
//  2  label-title-body (what is a custom GPT)    |   3.00    |  35.08   |   962
//  3  process-steps (three things overview)      |  35.08    |  83.44   |  1451
//  4  video-clip (meet Larry / navigate)         |  83.44    | 101.36   |   538
//  5  video-clip (create vs configure, name)     | 101.36    | 120.04   |   560
//  6  video-clip (instructions, CODO)            | 120.04    | 161.62   |  1247
//  7  video-clip (prompt starters + knowledge)   | 161.62    | 188.42   |   804
//  8  video-clip (capabilities toggle)           | 188.42    | 197.66   |   277
//  9  video-clip (test it)                       | 197.66    | 217.14   |   584
// 10  video-clip (publish + sharing)             | 217.14    | 237.74   |   618
// 11  video-clip (manage your GPTs)              | 237.74    | 265.06   |   820
// 12  label-title-body (availability, closing)   | 265.06    | 287.90   |   686
//                                                                 total    8637

export const customGPTs: VideoData = {
  audioSrc: 'audio/custom-gpts.mp3',
  clipSrc: 'video/custom-gpts.mp4',
  avatarSrc: 'video/custom-gpts-avatar.mp4',
  scenes: [
    // 1 (0:00 -> 0:03)
    {
      layout: 'title-card-green',
      title: 'Custom GPTs',
      label: 'BUILD YOUR OWN ASSISTANT',
      durationInFrames: 90,
    },

    // 2 - What is a custom GPT (0:03 -> 0:35.08, ~32.1s)
    // VO: "Custom GPTs are a type of mini-app on top of the regular ChatGPT that you set
    //      up once for a specific task with standing instructions and optional knowledge
    //      files... you shouldn't have to re-teach ChatGPT your format, your tone, your
    //      constraints, and your decision rules every single time. You should build the
    //      GPT once, and from then on, it's pre-briefed to generate outputs."
    {
      layout: 'label-title-body',
      label: 'CUSTOM GPTS',
      title: 'Build once. Use forever.',
      body: [
        'A mini-app on top of ChatGPT you set up once',
        'For recurring tasks: updates, proposals, reports',
        "Skip re-teaching your tone, format, and rules",
        "Build it once. It's pre-briefed forever",
      ],
      bodyTimings: [143, 310, 622, 780],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 962,
    },

    // 3 - Three things that make GPTs useful (0:35.08 -> 1:23.44, ~48.4s)
    // Fills the "blank" overview narration with a sequential reveal instead of idle
    // screen recording. VO: "First, it is a productized assistant... Second, you can
    // attach knowledge files... And third, you can control capabilities and
    // connections..."
    {
      layout: 'process-steps',
      label: 'WHY GPTS WORK',
      title: 'Three things make GPTs useful',
      steps: [
        {
          title: 'A Productized Assistant',
          body: 'Name it, add starters, and keep it one click away. Even @mention it like a teammate.',
        },
        {
          title: 'Custom Knowledge',
          body: 'Attach FAQs, catalogs, or style guides so it has the right context.',
        },
        {
          title: 'Controlled Capabilities',
          body: 'Browsing, image generation, and actions, all within your guardrails.',
        },
      ],
      stepTimings: [132, 709, 1026],
      activeTimings: [132, 709, 1026],
      durationInFrames: 1451,
    },

    // 4 - Meet Larry / navigate to the GPT builder (1:23.44 -> 1:41.36, ~17.9s)
    // VO: "let's build one together... an assistant that helps me write weekly
    //      leadership updates, and we're going to call him Larry... on the left
    //      sidebar... GPTs... and then on create."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 83.44,
      durationInFrames: 538,
    },

    // 5 - Create vs Configure, naming (1:41.36 -> 2:00.04, ~18.7s)
    // VO: "you start on the create flow... I usually switch to configure... give it a
    //      name, so I will set this to Larry, the leadership update writer."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 101.36,
      avatarPosition: 'bottom-left',
      durationInFrames: 560,
    },

    // 6 - Instructions / CODO framework (2:00.04 -> 2:41.62, ~41.6s)
    // VO: "The much more important part is the instruction... it consists of the four
    //      elements... the role of the assistant, the objective of the workflow, the
    //      do's and don'ts... and the fifth element, the variable element."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 120.04,
      avatarPosition: 'bottom-left',
      durationInFrames: 1247,
    },

    // 7 - Prompt starters + knowledge files (2:41.62 -> 3:08.42, ~26.8s)
    // VO: "you can add two to three prompt starters... you can upload any documents...
    //      you can upload only 20 files per custom GPT with some additional limits."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 161.62,
      avatarPosition: 'bottom-left',
      durationInFrames: 804,
    },

    // 8 - Capabilities toggle (3:08.42 -> 3:17.66, ~9.2s)
    // VO: "under capabilities, I want to switch off web browsing... this could depend
    //      on the kind of assistant you're building."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 188.42,
      avatarPosition: 'bottom-left',
      durationInFrames: 277,
    },

    // 9 - Test it (3:17.66 -> 3:37.14, ~19.5s)
    // VO: "you can run a quick test to validate the output... fine tune your assistant
    //      by adjusting the instructions or the knowledge until it performs the way
    //      you expect."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 197.66,
      avatarPosition: 'bottom-left',
      durationInFrames: 584,
    },

    // 10 - Publish + sharing (3:37.14 -> 3:57.74, ~20.6s)
    // VO: "click here on create to publish my GPT... only me, anyone with the link,
    //      specific workplace sharing, or... the public GPT's app store."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 217.14,
      avatarPosition: 'bottom-left',
      durationInFrames: 618,
    },

    // 11 - Manage your GPTs (3:57.74 -> 4:25.06, ~27.3s)
    // VO: "GPTs and then my GPTs where you will see all of the GPTs that you've
    //      created... open it, choose edit GPT... or... click on the pencil icon."
    {
      layout: 'video-clip',
      videoSrc: 'video/custom-gpts.mp4',
      videoStartTime: 237.74,
      avatarPosition: 'bottom-left',
      durationInFrames: 820,
    },

    // 12 - Availability / closing (4:25.06 -> 4:47.90, ~22.8s)
    // VO: "using GPTs is free, but creating GPTs is only available for paid users on
    //      the plus, business or enterprise plan... if you cancel your paid
    //      subscription, you will lose access... they are locked until you're back
    //      on a paid plan."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY',
      title: 'Free to use. Paid to build.',
      body: [
        'Using GPTs is free for everyone',
        'Creating GPTs needs Plus, Business, or Enterprise',
        "Cancel your plan: GPT builder locks (GPTs aren't deleted)",
      ],
      bodyTimings: [0, 194, 274],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      avatarPosition: 'bottom-left',
      durationInFrames: 686,
    },
  ],
};
