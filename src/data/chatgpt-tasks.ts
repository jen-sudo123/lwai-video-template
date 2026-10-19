import { VideoData } from '../scenes/types';

// ChatGPT Tasks — Tutorial / demo video
// Audio: audio/chatgpt-tasks.mp3 — raw narration extracted from source recording, 262.34s, no silence pad.
// Video: video/chatgpt-tasks.mp4 — screen recording with embedded narration (same recording as audio).
// Avatar: video/chatgpt-tasks-avatar.mp4 — HeyGen "Ava" presenter recording, 262.36s (matches full runtime, no loop needed).
// Scenes aligned to whisper-extracted segment timestamps.
//
//  scene                                        | start (s)  | end (s)   | dur (frames @30fps)
//  ---------------------------------------------|------------|-----------|--------------------
//  1  title-card-green (silent intro)            |   0.00     |   3.00    |    90
//  2  label-title-body (hook)                    |   3.00     |  43.53    |  1216
//  3  label-title-body (what is a task)           |  43.53     |  66.20    |   680
//  4  video-clip (two ways to create a task)      |  66.20     |  80.33    |   424
//  5  video-clip (typing the request)             |  80.33     | 103.47    |   694
//  6  video-clip (confirm & save)                 | 103.47     | 124.30    |   625
//  7  split-contrast (scheduled vs conditional)    | 124.30     | 134.50    |   306
//  8  label-title-body (watch for changes)         | 134.50     | 168.67    |  1025
//  9  video-clip (managing tasks)                  | 168.67     | 192.00    |   700
// 10  label-title-body (where it earns its keep)    | 192.00     | 209.13    |   514
// 11  big-statement (closing punchline)             | 209.13     | 226.43    |   519
// 12  label-title-body (plan limits)                 | 226.43     | 250.03    |   708
// 13  label-title-body (practical notes)              | 250.03     | 262.33    |   369
//                                                                  total       7870

export const chatGPTTasks: VideoData = {
  audioSrc: 'audio/chatgpt-tasks.mp3',
  clipSrc: 'video/chatgpt-tasks.mp4',
  avatarSrc: 'video/chatgpt-tasks-avatar.mp4',
  avatarStartFrame: 0,
  scenes: [
    // 1 — Title card (0:00 → 0:03.00)
    {
      layout: 'title-card-green',
      title: 'ChatGPT Tasks',
      label: 'AUTOMATION FOR LEADERS',
      durationInFrames: 90,
    },

    // 2 — Hook (0:03.00 → 0:43.53, ~40.5s)
    // VO: "Most people assume that automation means workflows, APIs, or even tools like Zapier,
    //      but in ChatGPT it's packaged very differently and very accessibly for you. So what
    //      OpenAI calls scheduled tasks, now branded ChatGPT Scheduled, is essentially like
    //      reminders plus recurring AI work but built directly into the chat interface, and with
    //      the most recent update even on mobile. So now even as a non-technical leader you can
    //      offload small recurring cognitive work without building those systems. Think reminders,
    //      check-ins, summaries, nudges, or lightweight research that runs on a schedule and shows
    //      up automatically."
    {
      layout: 'label-title-body',
      label: 'CHATGPT TASKS',
      title: 'Automation you don’t have to build',
      body: [
        'Built directly into the chat interface — even on mobile',
        'Offload recurring cognitive work without building systems',
        'Reminders, check-ins, summaries & nudges on schedule',
        'Lightweight research that shows up automatically',
      ],
      bodyTimings: [679, 768, 998, 1154],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['chat-bubble-left-right', 'bolt', 'clock', 'sparkles'],
      durationInFrames: 1216,
    },

    // 3 — What is a task (0:43.53 → 1:06.20, ~22.7s)
    // VO: "So what is a task precisely? A task in ChatGPT is a saved instruction, basically a
    //      prompt and a trigger. Then at the scheduled time that you have defined, ChatGPT reruns
    //      your instruction, generates fresh output and delivers it inside ChatGPT without any
    //      integrations, without any data connections, and without any maintenance."
    {
      layout: 'label-title-body',
      label: 'THE BASICS',
      title: 'What exactly is a task?',
      body: [
        'A saved instruction — a prompt plus a trigger',
        'Reruns automatically at the scheduled time',
        'Generates fresh output every time it runs',
        'No integrations, no data connections, no maintenance',
      ],
      bodyTimings: [110, 279, 456, 625],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['document-text', 'clock', 'sparkles', 'check'],
      durationInFrames: 680,
    },

    // 4 — Two ways to create a task (1:06.20 → 1:20.33, ~14.1s)
    // VO: "So let's take a look at how it works. So here we're going to create a task. So you can
    //      create a scheduled task either by asking ChatGPT naturally or by opening up the
    //      scheduled page in the sidebar and then creating one directly."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-tasks.mp4',
      videoStartTime: 66.20,
      durationInFrames: 424,
    },

    // 5a — Typing the request (1:20.33 → 1:35.48, ~15.1s)
    // VO: "But here I'm going to open up a regular chat and I'm just going to type every Monday
    //      at 8 a.m. review the past week's news about the consulting industry and give me a five
    //      bullet executive brief focused on implications for leaders and keep it under 200 words."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-tasks.mp4',
      videoStartTime: 80.33,
      durationInFrames: 454,
    },

    // 5b — Recognized as recurring (1:35.48 → 1:43.47, ~8.0s)
    // VO: "Then I'm going to hit enter and ChatGPT recognizes that this is a recurring request
    //      and turns it into a scheduled task."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-tasks.mp4',
      videoStartTime: 95.48,
      durationInFrames: 240,
    },

    // 6 — Confirm & save (1:43.47 → 2:04.30, ~20.8s)
    // VO: "I can then click the newly created task to review it and so here I can confirm the
    //      schedule in this case it's every Monday at 8 a.m. and I can also select run to test the
    //      task, review the output and make any adjustments before saving it. But once everything
    //      looks right, I can save the task and that's how you create a scheduled task."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-tasks.mp4',
      videoStartTime: 103.47,
      durationInFrames: 625,
    },

    // 7 — Scheduled vs. conditional (2:04.30 → 2:14.50, ~10.2s)
    // VO: "Now, not every task needs to run on a fixed schedule, right? Sometimes you can ask
    //      ChatGPT to watch for something and notify you only when something changes."
    {
      layout: 'split-contrast',
      leftLabel: 'SCHEDULED',
      leftTitle: 'Runs on a fixed schedule',
      leftBody: 'Every Monday at 8am, like clockwork.',
      rightLabel: 'CONDITIONAL',
      rightTitle: 'Watches for a condition',
      rightBody: 'Notifies you only when something changes.',
      dividerLabel: 'vs',
      highlights: [
        { from: 0, value: 'left' },
        { from: 150, value: 'right' },
      ],
      durationInFrames: 306,
    },

    // 8 — Watch for changes (2:14.50 → 2:48.67, ~34.2s)
    // VO: "So for example, you could say let me know when Microsoft announces a new co-pilot
    //      feature or notify me if a senior product manager role opens up at OpenAI or tell me
    //      when the price of this camera drops below 900 bucks. ChatGPT will then periodically
    //      check for updates in the background and only if the condition is met you will receive
    //      a ChatGPT notification and then the update will also appear in your ChatGPT
    //      conversations and if nothing changes you won't receive any unnecessary alerts."
    // Real demo footage here: typing "Let me know when Microsoft announces a new Copilot feature",
    // ChatGPT confirming with a "Monitoring · Copilot Feature Watch" pill.
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-tasks.mp4',
      videoStartTime: 134.50,
      durationInFrames: 1025,
    },

    // 9 — Managing tasks (2:48.67 → 3:12.00, ~23.3s)
    // VO: "Now, if I want to manage all of my ongoing tasks, I can open the scheduled page from
    //      the ChatGPT sidebar and from here I can see all of my active tasks, I can pause or
    //      delete tasks and I can edit the instruction, the timing or the frequency. And again,
    //      tasks are editable prompt so you can evolve them over time as your needs change and you
    //      get clearer on what that prompt should look like."
    {
      layout: 'video-clip',
      videoSrc: 'video/chatgpt-tasks.mp4',
      videoStartTime: 168.67,
      durationInFrames: 700,
    },

    // 10 — Where it earns its keep (3:12.00 → 3:29.13, ~17.1s)
    // VO: "So how can we use this strategically? So we can use ChatGPT tasks for things like
    //      weekly briefings on the topic like the example I just showed. We can think about
    //      reminders that include some thinking not just the dates or again some lightweight
    //      monitoring."
    {
      layout: 'label-title-body',
      label: 'USE IT STRATEGICALLY',
      title: 'Where this earns its keep',
      body: [
        'Weekly briefings on the topics that matter',
        'Reminders that include real thinking, not just dates',
        'Lightweight monitoring that runs in the background',
      ],
      bodyTimings: [33, 164, 333],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['document-text', 'lightbulb', 'eye'],
      durationInFrames: 514,
    },

    // 11 — Closing punchline (3:29.13 → 3:46.43, ~17.3s)
    // VO: "But the real win here is to start offloading your repetitive low friction work to AI
    //      so it runs without you remembering to ask. It's also a great practice for if you
    //      eventually want to build full-on agents. But at this point this is a great way to do
    //      automation for leaders who don't want to learn a whole other system."
    {
      layout: 'big-statement',
      text: 'The real win: offload repetitive,\nlow-friction work to AI — so it runs\nwithout you remembering to ask.',
      label: 'THE TAKEAWAY',
      size: 'title',
      animation: 'fade',
      lineTimings: [0, 60, 130],
      durationInFrames: 519,
    },

    // 12 — Plan limits (3:46.43 → 4:10.03, ~23.6s)
    // VO: "Now for some practical details the scheduled tasks are available on paid ChatGPT plans
    //      with the number of the active tasks depending on your subscription. So for the free
    //      plan it's up to three active tasks for plus it's up to five for business and edu it's
    //      up to 10 and for pro and enterprise it's up to 15 active tasks at a time."
    {
      layout: 'label-title-body',
      label: 'PRACTICAL DETAILS',
      title: 'Available on paid plans',
      body: [
        'Free — up to 3 active tasks',
        'Plus — up to 5 active tasks',
        'Business & Edu — up to 10 active tasks',
        'Pro & Enterprise — up to 15 active tasks',
      ],
      bodyTimings: [0, 175, 346, 542],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      durationInFrames: 708,
    },

    // 13 — Practical notes (4:10.03 → 4:22.33, ~12.3s)
    // VO: "And then you can create and manage the scheduled tasks on the website and on the mobile
    //      apps. On the desktop app you currently don't have it included in your interface. And
    //      then also good to know is that the scheduled tasks work with most ChatGPT models but
    //      they're not supported on pro models."
    {
      layout: 'label-title-body',
      label: 'ONE MORE THING',
      title: 'A few practical notes',
      body: [
        'Manage tasks on web & mobile — not yet on desktop',
        'Works with most models — not supported on Pro models',
      ],
      bodyTimings: [0, 199],
      bodyRight: true,
      bodyCards: true,
      durationInFrames: 369,
    },
  ],
};
