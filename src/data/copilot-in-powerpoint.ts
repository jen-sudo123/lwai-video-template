import { VideoData } from '../scenes/types';

// Copilot in PowerPoint — Tutorial / demo video
// Audio: audio/copilot-in-powerpoint.mp3 (253.14s) — polished ElevenLabs VO generated from
//        src/data/copilot-in-powerpoint.script.txt (SSML, plain text + <break> tags).
// Video: video/copilot-in-powerpoint.mp4 (1024x576 screen recording), played continuously via
//        `clipSrc`. The raw recording has its own scratch narration reading nearly the same
//        script, so videoStartTime values below are the ORIGINAL recording's timestamps for the
//        matching narration line (found by transcribing both tracks with Whisper and aligning on
//        shared phrases) — not the VO's own timestamps. The two tracks stay in sync (within ~0.15s)
//        until ~213s VO / ~217s video, where the raw recording has an extra aside (Copilot session
//        drops) that was cut from the polished script, so video timestamps run ~15.6s ahead after
//        that point.
//
//  scene                                       | VO start | VO end | dur (f@30)
//  ---------------------------------------------|----------|--------|------------
//  1  title card                                 |  0.00    |  1.00  |    30
//  2  hook (built-in AI assistant)                 |  1.00    | 16.02  |   451
//  3  capabilities (Graph, drafting partner)         | 16.02    | 43.14  |   813
//  4  video — open the Copilot panel                    | 43.14    | 55.04  |   357
//  5  video — chat vs. allow editing                       | 55.04    | 77.60  |   677
//  6  video — paste the prompt                                | 77.60    | 92.02  |   433
//  7  video — attach the reference file                          | 92.02    |105.12  |   393
//  8  video — brand kit & send                                     |105.12    |126.92  |   654
//  9  video — follow-up questions                                    |126.92    |145.30  |   551
// 10  video — generating & reviewing the draft                        |145.30    |166.06  |   623
// 11  video — revise & refine slides                                     |166.06    |187.12  |   632
// 12  video — Skills feature                                                |187.12    |213.62  |   795
// 13  availability & pricing (closing)                                        |213.62    |253.14  |  1185
//                                                                                     total     7594

export const copilotInPowerPoint: VideoData = {
  audioSrc: 'audio/copilot-in-powerpoint.mp3',
  clipSrc: 'video/copilot-in-powerpoint.mp4',
  scenes: [
    // 1 — Title card (0 → 1.00)
    {
      layout: 'title-card-green',
      title: 'Copilot in PowerPoint',
      label: 'MICROSOFT 365 COPILOT',
      durationInFrames: 30,
    },

    // 2 — Hook (1.00 → 16.02)
    // VO: "Copilot in PowerPoint is Microsoft's built-in AI assistant for creating and improving
    //      presentations. Because it lives directly inside PowerPoint, it can turn a rough idea,
    //      a prompt, or an existing document into a structured first draft, helping you move past
    //      the blank slide much faster."
    {
      layout: 'label-title-body',
      label: 'COPILOT IN POWERPOINT',
      title: 'Turn a rough idea into\na structured first draft',
      body: [
        'Lives directly inside PowerPoint',
        'Turns a prompt or document into a structured draft',
        'Helps you move past the blank slide much faster',
      ],
      bodyTimings: [161, 239, 431],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'sparkles', 'rocket'],
      durationInFrames: 451,
    },

    // 3 — Capabilities (16.02 → 43.14)
    // VO: "Under the hood, Copilot can connect to Microsoft Graph... documents stored in OneDrive
    //      or SharePoint. Think of Copilot as a drafting partner. It can help with the initial
    //      structure, content, and layout, so you can focus on strengthening the narrative and
    //      making sure the presentation supports your objective. Now, let's look at how this works
    //      in PowerPoint for the web."
    {
      layout: 'label-title-body',
      label: 'WHAT IT CAN DO',
      title: 'A drafting partner built\ninto your presentation',
      body: [
        'Connects to Microsoft Graph — your files & org info',
        'Works as a drafting partner: structure, content, layout',
        'Helps refine narrative to support your objective',
      ],
      bodyTimings: [65, 369, 653],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['compare', 'pencil', 'trending'],
      durationInFrames: 813,
    },

    // 4 — Open the Copilot panel (43.14 → 55.04)
    // VO: "Copilot is integrated directly into the PowerPoint workspace. In this version, I can
    //      find the Copilot button in the bottom-right corner of the canvas. I click the icon,
    //      and the Copilot panel opens."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 43.18,
      durationInFrames: 357,
    },

    // 5 — Chat vs. Allow editing (55.04 → 77.60)
    // VO: "Here, I have two main ways to work with Copilot. The first is Chat, which works as a
    //      question-and-answer assistant... The second is Allow editing, which gives Copilot
    //      permission to make changes directly to the slides on the canvas. For this example,
    //      I select Allow editing. In the prompt box, I give Copilot a clear instruction."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 55.06,
      durationInFrames: 677,
    },

    // 6 — Paste the prompt (77.60 → 92.02)
    // VO: "'Create a presentation for my leadership team about how we should prepare the company
    //      for a world where AI significantly disrupts our industry. Use the outline in my
    //      reference file.'"
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 77.56,
      durationInFrames: 433,
    },

    // 7 — Attach the reference file (92.02 → 105.12)
    // VO: "I can do this by selecting Add work content or Upload files. If the reference document
    //      is already stored in SharePoint or OneDrive, I may also be able to type a forward slash
    //      in the prompt box and select it directly."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 92.06,
      durationInFrames: 393,
    },

    // 8 — Brand kit & send (105.12 → 126.92)
    // VO: "Another useful feature is that if your organization has set up a brand kit or branded
    //      PowerPoint template in Microsoft 365, Copilot can use it when creating the deck. This
    //      helps keep the logo, fonts, colors, and overall visual identity consistent, so you do
    //      not have to format every slide manually. Once everything is ready, I hit Send."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 105.04,
      durationInFrames: 654,
    },

    // 9 — Follow-up questions (126.92 → 145.30)
    // VO: "Now, before creating the complete deck, Copilot may ask a few follow-up questions, such
    //      as how many slides I want, who the audience is, what tone the presentation should use,
    //      or whether it should include information from external sources. These questions help
    //      Copilot better understand the outcome I am looking for."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 126.94,
      durationInFrames: 551,
    },

    // 10 — Generating & reviewing the draft (145.30 → 166.06)
    // VO: "Once I have answered the questions, Copilot begins generating the presentation directly
    //      on the canvas, and here is the result. Pretty neat, right? But this is still a first
    //      draft. Before using the presentation, I need to check that the information is correct,
    //      that the narrative is logical, and that the slides reflect the message I want to
    //      communicate."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 145.30,
      durationInFrames: 623,
    },

    // 11 — Revise & refine slides (166.06 → 187.12)
    // VO: "If I am not happy with something, I can continue working with Copilot. For example,
    //      I can select the opening slide and ask: 'Make this opening more compelling for a
    //      leadership audience.' Copilot can then revise the slide directly. I can also ask Copilot
    //      to improve the visuals, shorten the text, reorganize the content, or reformat individual
    //      slides."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 166.18,
      durationInFrames: 632,
    },

    // 12 — Skills feature (187.12 → 213.62)
    // VO: "Another feature recently added to Copilot is Skills. By clicking the Plus icon in the
    //      prompt box, I can select All Skills. These Skills are built-in actions that Copilot can
    //      use to help improve the presentation more efficiently, such as Prepare for Questions,
    //      Review This Presentation, or Visualize This Slide. They give me quick ways to evaluate
    //      and refine the deck, so I do not have to write every prompt from scratch."
    {
      layout: 'video-clip',
      videoSrc: 'video/copilot-in-powerpoint.mp4',
      videoStartTime: 187.26,
      durationInFrames: 795,
    },

    // 13 — Availability & pricing, closing (213.62 → 253.14)
    // VO: "And now, in terms of availability, Copilot's interface and capabilities can vary
    //      depending on whether you're using PowerPoint on the web or desktop, your Microsoft 365
    //      plan, your organization's settings, and which features have reached your account.
    //      Copilot in PowerPoint is directly integrated into Microsoft 365 Personal and Family
    //      plans, while power users can opt for the Microsoft 365 Premium plan for higher usage
    //      limits. For business and enterprise users, Copilot is available through Microsoft 365
    //      Business Standard, Business Premium, and Enterprise tiers, as an add-on costing between
    //      $18 and $30 per user per month."
    {
      layout: 'label-title-body',
      label: 'AVAILABILITY & PRICING',
      title: 'Copilot in PowerPoint',
      body: [
        'Interface & capabilities vary by plan and org settings',
        'Personal & Family: built into Microsoft 365',
        'Business & Enterprise: available as an add-on',
        '$18–$30 per user per month for business tiers',
      ],
      bodyTimings: [105, 576, 953, 1103],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      bodyCardIcons: ['sliders', 'user', 'star', 'bolt'],
      durationInFrames: 1185,
    },
  ],
};
