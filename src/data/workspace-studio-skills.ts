import { VideoData } from '../scenes/types';

// Google Workspace Studio Skills — Tutorial video
// Audio: audio/workspace-studio-skills-padded.mp3 — scripted VO (Daan voice, ElevenLabs),
//   200.16s of real narration + 3.0s of prepended silence = 203.16s total. The raw VO
//   (workspace-studio-skills.mp3) starts speaking at 0.07s with no lead silence, but
//   Video.tsx's <Audio startFrom={audioStartFrame}> trims that many frames OFF THE FILE
//   itself (not just delaying playback) — so with audioStartFrame: 90 and the raw file,
//   the first 3s / ~12 words of narration got silently cut. Padding the file with 3.0s of
//   real silence up front (matching audioStartFrame) fixes this: the trim eats the padding,
//   not the speech. See work-context.wav for the same convention (2.04s of real silence at
//   its start backing its audioStartFrame: 60). All frame-accurate word timestamps below are
//   still relative to the RAW (unpadded) file/alignment.json — they're valid unchanged
//   because Video.tsx's trim-then-delay math lines them right back up.
//   Source script: src/data/workspace-studio-skills.script.txt (SSML, matches alignment.json).
// Video: video/workspace-studio-skills.mp4 — screen recording, 1024x576, 195.56s.
//   The recording's own narration was discarded in favor of the scripted VO above, so video
//   and audio do not share a single clock — each video-clip scene below sets an explicit
//   `videoStartTime` (in the SOURCE FILE's own seconds) chosen by inspecting stills, rather
//   than relying on a global `clipSrc` offset. Confirmed via stills at 6s/1s granularity:
//   video is blank/white from 0-70s, real screen content runs ~70s-150s, then holds on the
//   final frame until ~158s, then blank again to the end. All video-clip scenes below stay
//   inside the 70-150s window.
//
// Frame-accurate VO map (ElevenLabs word-level alignment, no silence offset — see
// public/audio/workspace-studio-skills.alignment.json):
//    0.07 →  12.43  "Google Workspace Studio Skills let you package reusable instructions…"
//   12.97 →  24.94  "Once you create a Skill, you can use it directly with Gemini… or a Flow."
//   26.31 →  28.71  "There are two main ways to trigger a Skill."
//   29.12 →  38.78  "First, directly in Gemini in Workspace… type '@'… select the Skill."
//   39.51 →  49.52  "Second, inside a Workspace Studio Flow… Ask Gemini step…"
//   52.16 →  64.11  "Skills are created and managed in… name, description, instructions."
//   65.28 →  73.10  "Let's build one. …creating a Skill called Larry…"
//   73.96 →  80.79  "First, I open Google Workspace Studio… select Skills… click Create."
//   81.33 →  90.94  "Here, I have two options… ask Gemini… or enter instructions myself."
//   91.58 → 102.57  "I'll use the second option… name the Skill Larry… add the instructions."
//  103.75 → 115.80  "Using my CODO prompt template… save the Skill and click Turn on."
//  116.09 → 123.08  "Now let's test it… open a Google Doc… click Ask Gemini."
//  123.94 → 128.20  "…add any supporting files I need from Google Drive."
//  128.84 → 132.62  "…type '@Larry' and select the Skill."
//  133.62 → 136.47  "I ask Gemini to apply Larry to my notes."
//  137.01 → 149.65  "Gemini now follows the instructions… I can simply reuse Larry."
//  150.29 → 156.83  "…I can use the same Skill inside a Workspace Studio Flow."
//  156.87 → 190.68  practical notes: Beta enrollment, turn on, one task, good starting points.
//  191.32 → 200.16  "The goal is simple… a good workflow to turn into a reusable Skill."
//
// Scene table (comp frame = 90 [title card] + VO-relative frame; durations rounded to next
// scene's VO start):
//  1  title-card-green                                  |    0 |   90
//  2  label-title-body (what is a skill)                 |   90 |  387
//  3  label-title-body (where you can use it)             |  477 |  400
//  4a label-title-body (two ways to trigger — in Gemini)    |  877 |  396
//  4b label-title-body (two ways to trigger — in a Flow)     | 1273 |  380
//  5  label-title-body (how you create one)                 | 1277 |  776
//  6  label-title-body (bridge: meet larry)                    | 2053 |  393
//  7  video-clip (open workspace studio, click skills+create)  | 2446 |  235
//  8  video-clip (two options: ask gemini vs enter manually)     | 2681 |  247
//  9  video-clip (name it larry)                                  | 2928 |  307
// 10  video-clip (add the codo instructions)                         | 3235 |  275
// 11  video-clip (save + turn on)                                     | 3510 |  361
// 12  video-clip (open the doc, click ask gemini)                       | 3871 |  131
// 13  video-clip (add supporting files from drive)                        | 4002 |  204
// 14  video-clip (type @larry, select the skill)                           | 4206 |  147
// 15  video-clip (apply larry)                                                | 4353 |  144
// 16  video-clip (gemini drafts the update)                                     | 4497 |  101
// 17  label-title-body (add it to a flow)                                         | 4598 |  399
// 18  checklist-slide (good to know)                                                | 4997 | 1034
// 19  big-statement (closing punchline)                                              | 6031 |  355
//                                                                                total     6386

export const workspaceStudioSkills: VideoData = {
  audioSrc: 'audio/workspace-studio-skills-padded.mp3',
  audioStartFrame: 90,
  scenes: [
    // ── 1. Title card ─────────────────────────────────────────────────────
    {
      layout: 'title-card-green',
      title: 'Google Workspace Studio Skills',
      label: 'GEMINI IN WORKSPACE STUDIO',
      durationInFrames: 90,
    },

    // ── 2. What is a Skill? (0.07s–12.97s) ───────────────────────────────
    {
      layout: 'label-title-body',
      label: 'REUSABLE INSTRUCTIONS',
      title: 'Package Your Expertise Into a Skill',
      body: ['Apply the same way of working again and again — without rebuilding the prompt every time.'],
      image: 'images/workspace-studio-skills/reusable-instructions.png',
      durationInFrames: 387,
    },

    // ── 3. Where you can use it (12.97s–26.31s) ──────────────────────────
    {
      layout: 'label-title-body',
      label: 'WORKS ACROSS WORKSPACE',
      title: 'Docs, Sheets, Slides — or a Flow',
      body: ['Use a Skill directly with Gemini in supported Workspace apps, or add it to an automated Studio Flow.'],
      image: 'images/workspace-studio-skills/google-workspace-illustration.svg',
      imageLeft: true,
      durationInFrames: 400,
    },

    // ── 4a. Two ways to trigger — in Gemini (26.31s–39.51s) ──────────────
    {
      layout: 'label-title-body',
      label: 'IN GEMINI',
      title: 'Ask Gemini in Workspace',
      body: ['Open the Ask Gemini panel, type "@", and select your Skill.'],
      durationInFrames: 396,
    },

    // ── 4b. Two ways to trigger — in a Flow (39.51s–52.16s) ───────────────
    {
      layout: 'label-title-body',
      label: 'IN A FLOW',
      title: 'Inside a Studio Flow',
      body: ['Add the Skill to an Ask Gemini step so it runs automatically.'],
      image: 'images/workspace-studio-skills/trigger-in-flow.png',
      imageZoom: { centerX: 0.85, scale: 2.4, startFrame: 60 },
      durationInFrames: 380,
    },

    // ── 5. How you create one (52.16s–65.28s) ────────────────────────────
    {
      layout: 'label-title-body',
      label: 'CREATING A SKILL',
      title: 'Built and Managed in Workspace Studio',
      body: [
        'For each Skill, define a name, a description of what it does and when to use it, and the instructions Gemini should follow.',
      ],
      image: 'images/workspace-studio-skills/skills-list.png',
      durationInFrames: 393,
    },

    // ── 6. Bridge: meet Larry (65.28s–73.10s) ────────────────────────────
    {
      layout: 'label-title-body',
      label: "LET'S BUILD ONE",
      title: 'Meet Larry',
      body: ['A Skill that turns rough leadership notes into a polished weekly update.'],
      durationInFrames: 235,
    },

    // ── 7. Open Workspace Studio, Skills → Create (73.10s–81.33s) ────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 70,
      durationInFrames: 247,
    },

    // ── 8. Two options: ask Gemini vs enter manually (81.33s–91.58s) ─────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 78,
      durationInFrames: 307,
    },

    // ── 9. Name it Larry (91.58s–100.75s) ────────────────────────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 88,
      durationInFrames: 275,
    },

    // ── 10. Add the CODO instructions (100.75s–112.77s) ──────────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 98,
      durationInFrames: 361,
    },

    // ── 11. Save + Turn on, test it (112.77s–117.12s) ────────────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 107,
      durationInFrames: 131,
    },

    // ── 12. Open the doc, click Ask Gemini (117.12s–123.94s) ─────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 112,
      durationInFrames: 204,
    },

    // ── 13. Add supporting files from Drive (123.94s–128.84s) ────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 119,
      durationInFrames: 147,
    },

    // ── 14. Type @Larry, select the Skill (128.84s–133.62s) ──────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 125,
      durationInFrames: 144,
    },

    // ── 15. Apply Larry (133.62s–137.01s) ────────────────────────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 131,
      durationInFrames: 101,
    },

    // ── 16. Gemini drafts the update (137.01s–150.29s) ───────────────────
    {
      layout: 'video-clip',
      videoSrc: 'video/workspace-studio-skills.mp4',
      videoStartTime: 137,
      durationInFrames: 399,
    },

    // ── 17. Add it to a Flow (150.29s–156.87s) ───────────────────────────
    {
      layout: 'label-title-body',
      label: 'AUTOMATE IT FURTHER',
      title: 'Add It to a Flow',
      body: ['Use the same Skill inside a Workspace Studio Flow to run it automatically.'],
      image: 'images/workspace-studio-skills/trigger-in-flow.png',
      durationInFrames: 197,
    },

    // ── 18. Good to know (156.87s–191.32s) ────────────────────────────────
    {
      layout: 'checklist-slide',
      label: 'GOOD TO KNOW',
      title: 'Before You Start',
      items: [
        'Skills are in Gemini Beta, so your org must be enrolled and an admin has to turn Skills on.',
        'A Skill also needs to be turned on before you can invoke it.',
        'Keep each Skill focused on one repeatable task.',
        'Start with something you already do often, like leadership updates, meeting recaps, status reports.',
      ],
      itemTimings: [84, 451, 616, 757],
      durationInFrames: 1034,
    },

    // ── 19. Closing punchline (191.32s–200.16s) ───────────────────────────
    {
      layout: 'big-statement',
      label: 'THE TAKEAWAY',
      text: 'If you keep giving Gemini\nthe same instructions for the same work,\nturn it into a reusable Skill.',
      highlight: 'reusable Skill.',
      fontSize: 64,
      durationInFrames: 355,
    },
  ],
};
