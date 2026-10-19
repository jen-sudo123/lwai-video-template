import { VideoData } from '../scenes/types';

// Claude Cowork — Scheduled Tasks tutorial
// Audio: audio/cowork-scheduled.wav — 268.46s VO
// Main video: video/cowork-scheduled-main.mp4 — 268s screen recording (1280x720, 30fps)
// Intro promo: video/cowork-scheduled-intro.mp4 — 25s Reddit promo (1920x1080, muted)
//
// VO segments (from whisper, used to set bodyTimings):
//   0–10   hook: "if you're using cowork, scheduled tasks are a great place to start"
//  10–16   "save you from recurring work"
//  16–29   "instead of rewriting, set it up once, choose when to run"
//  29–44   "today's demo: weekly executive brief, under 200 words"
//  44–52   "open Claude desktop, switch chat → cowork"
//  52–63   "click Scheduled in the left sidebar"
//  63–74   "new task → setup manually, or create-with-Claude"
//  74–85   "inside existing task: /schedule"
//  85–100  "manually, click new task, setup manually"
// 100–112  "name: weekly consulting brief; description"
// 112–123  "large prompt box = the instruction Claude reruns"
// 123–135  "schedule task = saved instruction + cadence"
// 135–143  "Claude saves prompt, runs per cadence"
// 143–158  "folder + model selector (stronger reasoning)"
// 158–168  "cadence weekly Monday 8am, save"
// 168–178  "manage: sidebar Scheduled → open task"
// 178–188  "detail page: active, description, instructions, cadence"
// 188–195  "three actions: edit, delete, run now"
// 195–202  "run now is helpful to review before next Monday"
// 202–208  "see what output looks like"
// 208–217  "under 200 words? bullet a real development?"
// 217–224  "analysis good? sources and citations to inspect"
// 224–232  "practical notes: available in cowork on Claude desktop"
// 232–241  "paid plans only; team/enterprise admin may gate"
// 241–248  "only runs when computer is awake & desktop is open"
// 248–260  "best for recurring cognitive work: briefs, check-ins"
// 260–267  "keep-awake setting linked in description"
//
// Scene plan (frames @30fps, total = 8040f = 268.00s, matches VO end):
//  #   layout                     | comp start | comp end | VO range  | dur
//  1   title-card-green           |    0       |    90    |  0– 3s    |   90
//  2   video-clip (intro promo)   |   90       |   840    |  3–28s    |  750
//  3   label-title-body (demo)    |  840       |  1320    | 28–44s    |  480
//  4   video-clip (open cowork)   | 1320       |  1890    | 44–63s    |  570
//  5   video-clip (new task)      | 1890       |  2550    | 63–85s    |  660
//  6   video-clip (name + desc)   | 2550       |  3360    | 85–112s   |  810
//  7   video-clip (write prompt)  | 3360       |  4050    |112–135s   |  690
//  8   video-clip (folder/model/cadence) | 4050| 5040     |135–168s   |  990
//  9   video-clip (manage)        | 5040       |  6060    |168–202s   | 1020
// 10   video-clip (run now)       | 6060       |  6720    |202–224s   |  660
// 11   label-title-body (notes)   | 6720       |  7800    |224–260s   | 1080
// 12   big-statement (close)      | 7800       |  8040    |260–268s   |  240

export const coworkScheduledTasks: VideoData = {
  audioSrc: 'audio/cowork-scheduled.wav',
  avatarSrc: 'avatar-cowork-scheduled.mp4',
  scenes: [
    // 1 — Title card (0–3s) — VO 0–3s already underway in background
    {
      layout: 'title-card-green',
      title: 'Cowork Scheduled Tasks',
      label: 'INSIGHT ASSISTANTS',
      avatarPosition: 'top-right',
      durationInFrames: 90,
    },

    // 2 — Intro promo as video hook (VO 3–28s, scene 750f)
    // VO content during scene:
    //   3–10s (f0–210):  "scheduled tasks are a great place to start"
    //  10–16s (f210–390): "save you from recurring work"
    //  16–28s (f390–750): "instead of rewriting, set it up once"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-intro.mp4',
      videoStartTime: 0,
      label: 'WHAT IT DOES',
      title: 'Stop re-running the same prompt',
      body: [
        'Save Claude from recurring work',
        'Set it up once. Choose when it runs',
      ],
      bodyTimings: [210, 390],
      overlayPosition: 'bottom',
      avatarPosition: 'top-right',
      durationInFrames: 750,
    },

    // 3 — Today's demo (VO 28–44s, scene 480f)
    // VO: "demo: weekly executive brief, cowork reviews past week's consulting
    //      industry news, produce leadership brief under 200 words"
    // Beats inside scene:
    //   f0    (28s)  : "in this demo"
    //   f60   (30s)  : "weekly executive brief"
    //   f210  (35s)  : "past week's consulting industry news"
    //   f360  (40s)  : "under 200 words"
    {
      layout: 'label-title-body',
      label: 'TODAY\'S DEMO',
      title: 'Build a weekly\nexecutive brief',
      body: [
        'Reviews the past week\'s consulting industry news',
        'Produces a leadership brief under 200 words',
      ],
      bodyTimings: [60, 360],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      avatarPosition: 'top-right',
      durationInFrames: 480,
    },

    // 4 — Open cowork (VO 44–63s, scene 570f, recording starts at 44s)
    // Beats:
    //   f0   (44s) : "open Claude desktop"
    //   f90  (47s) : "switch from chat to cowork"
    //   f420 (58s) : "click Scheduled in the left sidebar"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 44,
      avatarPosition: 'bottom-left',
      durationInFrames: 570,
    },

    // 5 — Three ways to create a task (VO 63–85s, scene 660f, start 63s)
    // Beats:
    //   f0   (63s) : "cowork → new task → setup manually"
    //   f150 (68s) : "or create with Claude → describe in natural language"
    //   f330 (74s) : "inside existing task: /schedule"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 63,
      avatarPosition: 'bottom-left',
      durationInFrames: 660,
    },

    // 6 — Name + description (VO 85–112s, scene 810f, start 85s)
    // Beats:
    //   f0   (85s)  : "create manually"
    //   f90  (88s)  : "click new task → setup manually"
    //   f450 (100s) : "name: weekly consulting brief"
    //   f660 (107s) : "description: review weekly news, executive brief"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 85,
      avatarPosition: 'bottom-left',
      durationInFrames: 810,
    },

    // 7 — Write the prompt (VO 112–135s, scene 690f, start 112s)
    // Beats:
    //   f60  (114s) : "actual instruction Claude reruns"
    //   f330 (123s) : "saved instruction + cadence"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 112,
      avatarPosition: 'bottom-left',
      durationInFrames: 690,
    },

    // 8 — Folder, model, cadence (VO 135–168s, scene 990f, start 135s)
    // Beats:
    //   f240 (143s) : "folder setting: relevant project folder"
    //   f450 (150s) : "model selector: stronger reasoning"
    //   f690 (158s) : "cadence weekly Monday 8am, save"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 135,
      avatarPosition: 'bottom-left',
      durationInFrames: 990,
    },

    // 9 — Manage the task (VO 168–202s, scene 1020f, start 168s)
    // Beats:
    //   f0   (168s) : "sidebar → Scheduled → open task"
    //   f300 (178s) : "detail: active, description, instructions, cadence"
    //   f600 (188s) : "three actions: Edit · Delete · Run now"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 168,
      avatarPosition: 'bottom-left',
      durationInFrames: 1020,
    },

    // 10 — Run Now to review (VO 202–224s, scene 660f, start 202s)
    // Beats:
    //   f180 (208s) : "is it under 200 words?"
    //   f300 (212s) : "does each bullet name a real development?"
    //   f510 (219s) : "are sources and citations inspectable?"
    {
      layout: 'video-clip',
      videoSrc: 'video/cowork-scheduled-main.mp4',
      videoStartTime: 202,
      avatarPosition: 'bottom-left',
      durationInFrames: 660,
    },

    // 11 — Practical notes (VO 224–268s, scene 1320f)
    // Beats:
    //   f0    (224s) : "available in cowork on Claude desktop"
    //   f240  (232s) : "paid plans; team/enterprise admin may gate"
    //   f510  (241s) : "only runs when computer awake & desktop open"
    //   f720  (248s) : "best for recurring cognitive work"
    //   f1080 (260s) : "setting to keep your computer awake — link in description"
    {
      layout: 'label-title-body',
      label: 'PRACTICAL NOTES',
      title: 'Before you schedule',
      body: [
        'Available in Claude Cowork on Claude desktop',
        'Requires a paid plan; team/enterprise admin may gate access',
        'Only runs when your computer is awake and Claude desktop is open',
        'Best for recurring cognitive work: briefs, check-ins, ops updates',
        'Tip: enable "keep computer awake" (link in the description)',
      ],
      bodyTimings: [0, 240, 510, 720, 1080],
      bodyRight: true,
      bodyCards: true,
      bodyCardCompact: true,
      avatarPosition: 'top-right',
      durationInFrames: 1320,
    },
  ],
};
