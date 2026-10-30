import { VideoData } from '../scenes/types';

// Microsoft Copilot Studio — Give Your Agent Knowledge and Tools (Weekly Team Action Follow-Up Demo).
// Audio: audio/copilot-studio-knowledge-tools.mp3 — ElevenLabs v4, Daan, two takes joined with 0.8s silence
//        at 276.11s. NOT padded (audioStartFrame = 0), so comp_frame = round(t * 30).
// Clip: video/copilot-studio-knowledge-tools.mp4 — built from the Copilot Studio screenshots in
//       copilot-studio-knowledge-tools/images/ by scripts/build-screenshot-clip.py, 1:1 with composition frames
//       (clipStartFrame 0, videoStartTime = scene start). Each demo beat gets a top explanation card and
//       clipZoomKeyframes, as in copilot-studio-autonomy. Screenshot number is in [brackets] after each comment.
//       07, 11, 15, 18, 19 absent (excluded, duplicate or text-only); no screenshot exists for the rename step
//       or the tracker test, so those beats use cards.
// Transcript: src/data/copilot-studio-knowledge-tools.transcript.json (Scribe, part 2 offset +276.914s).
//
// Each scene starts on the first word of its VO beat (comment = anchor word + time).

const CLIP = 'video/copilot-studio-knowledge-tools.mp4';

export const copilotStudioKnowledgeTools: VideoData = {
  audioSrc: 'audio/copilot-studio-knowledge-tools.mp3',
  audioStartFrame: 0,
  clipSrc: CLIP,
  clipStartFrame: 0,
  scenes: [
    // f0 — 'knowledge and tools it needs' 0.0s
    {
      layout: 'title-card-green',
      label: 'MICROSOFT COPILOT STUDIO',
      title: 'Give Your Agent Knowledge and Tools',
      durationInFrames: 108,
    },
    // f108 — 'Section 3' 3.6s [01]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 3.6,
      label: 'YOUR AGENT BUILD PLAN',
      title: 'Section 3: What does\nyour agent need?',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 20, scale: 1.5, originX: 45, originY: 40 }],
      durationInFrames: 134,
    },
    // f242 — 'instructions' 8.1s / 'Knowledge' 12.6s / 'Tools' 16.1s
    {
      layout: 'label-title-body',
      label: 'WHAT YOUR AGENT NEEDS',
      title: 'Three building\nblocks',
      body: ['Instructions: how the agent should work', 'Knowledge: information it can use', 'Tools: specific operations, like retrieving records'],
      bodyTimings: [0, 137, 240],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['pencil', 'lightbulb', 'bolt'],
      durationInFrames: 406,
    },
    // f648 — 'In our example' 21.6s [01]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 21.6,
      label: 'IN OUR EXAMPLE',
      title: 'Approved meeting notes\nand an action tracker',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: -30, scale: 1.5, originX: 45, originY: 40 }, { startFrame: 0, scale: 1.9, originX: 40, originY: 47 }],
      durationInFrames: 330,
    },
    // f978 — 'demonstrate' 32.6s; zoom on tabs at 'This interface' 47.4s [02]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 32.6,
      label: 'THE DEMO AGENT',
      title: 'Weekly Team Action\nFollow-Up Demo',
      overlayPosition: 'top-right',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 445, scale: 1.7, originX: 40, originY: 13 }],
      durationInFrames: 581,
    },
    // f1559 — 'open Knowledge' 52.0s [03]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 51.967,
      label: 'KNOWLEDGE TAB',
      title: 'Open Knowledge, then\nAdd knowledge',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 15, scale: 1.5, originX: 32, originY: 72 }],
      durationInFrames: 97,
    },
    // f1656 — 'Under Featured' 55.2s [04]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 55.2,
      label: 'ADD KNOWLEDGE',
      title: 'Under Featured,\nchoose SharePoint',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 10, scale: 1.6, originX: 40, originY: 70 }],
      durationInFrames: 71,
    },
    // f1727 — 'The dialog tells us' 57.6s [05]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 57.567,
      label: 'ACCESS',
      title: 'Only authenticated\nend users can use it',
      overlayPosition: 'top-right',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 15, scale: 1.6, originX: 30, originY: 18 }],
      durationInFrames: 361,
    },
    // f2088 — 'Browse items' 69.6s [06]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 69.6,
      label: 'BROWSE ITEMS',
      title: 'Open the SharePoint\nfile picker',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 10, scale: 1.15, originX: 50, originY: 55 }],
      durationInFrames: 84,
    },
    // f2172 — 'navigate' 72.4s; zoom at 'Weekly Meeting Notes' 77.1s [12]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 72.4,
      label: 'PICK THE DOCUMENT',
      title: 'Weekly Meeting Notes,\nNovember 3',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 0, scale: 1.2, originX: 50, originY: 55 }, { startFrame: 142, scale: 1.7, originX: 45, originY: 63 }],
      durationInFrames: 417,
    },
    // f2589 — 'name the source' 86.3s [13]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 86.3,
      label: 'NAME THE SOURCE',
      title: 'Approved Weekly\nMeeting Notes',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 10, scale: 1.7, originX: 55, originY: 48 }],
      durationInFrames: 152,
    },
    // f2741 — 'The description explains' 91.4s / 'It also tells' 102.8s
    {
      layout: 'label-title-body',
      label: 'THE SOURCE DESCRIPTION',
      title: 'Tell the agent how\nto use the source',
      body: ['Look for: explicit commitments, owners, deadlines and follow-up actions', 'Refer to: the relevant meeting and source when presenting findings'],
      bodyTimings: [0, 343],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'check'],
      durationInFrames: 509,
    },
    // f3250 — 'Add to agent' 108.3s [14]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 108.333,
      label: 'SOURCE CONNECTED',
      title: 'Now listed under\nKnowledge',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 15, scale: 1.6, originX: 15, originY: 38 }],
      durationInFrames: 309,
    },
    // f3559 — 'Adding the source and seeing Ready' 118.6s
    {
      layout: 'big-statement',
      text: 'Ready is a setup check.\nTesting proves retrieval.',
      highlight: 'Testing proves retrieval.',
      fontSize: 80,
      animation: 'kinetic',
      durationInFrames: 225,
    },
    // f3784 — 'For your own workflow' 126.1s / 'policy' 133.1s
    {
      layout: 'label-title-body',
      label: 'YOUR BUILD PLAN',
      title: 'Connect the source\nyour workflow needs',
      body: ['A policy document', 'Project files', 'Reference materials', 'Or another approved source'],
      bodyTimings: [206, 253, 288, 321],
      bodyRight: true,
      durationInFrames: 432,
    },
    // f4216 — 'look at tools' 140.5s; zoom at 'Tools and actions' 144.2s [01]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 140.533,
      label: 'BACK TO YOUR PLAN',
      title: 'Tools and actions:\nwhat must it do?',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 0, scale: 1.3, originX: 45, originY: 40 }, { startFrame: 109, scale: 1.9, originX: 45, originY: 54 }],
      durationInFrames: 481,
    },
    // f4697 — 'open the Tools tab' 156.6s [08]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 156.567,
      label: 'TOOLS TAB',
      title: 'Get items is\nalready connected',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 59, scale: 1.6, originX: 10, originY: 43 }],
      durationInFrames: 479,
    },
    // f5176 — 'Get items reads' 172.5s / 'separate flow' 180.1s
    {
      layout: 'label-title-body',
      label: 'READ VS. WRITE',
      title: 'One tool reads,\none flow writes',
      body: ['Get items: reads records from a SharePoint list', 'Create Approved Follow-Up Action: creates a tracker item, not run in this demo'],
      bodyTimings: [0, 228],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'bolt'],
      durationInFrames: 482,
    },
    // f5658 — 'open the read tool' 188.6s [09]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 188.6,
      label: 'READ TOOL SETTINGS',
      title: 'End user credentials,\nno approval prompt',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 110, scale: 1.5, originX: 25, originY: 42 }],
      durationInFrames: 551,
    },
    // f6209 — 'consider the operation and its effect' 207.0s
    {
      layout: 'big-statement',
      text: 'Match confirmation\nto the effect',
      highlight: 'the effect',
      fontSize: 80,
      animation: 'kinetic',
      durationInFrames: 165,
    },
    // f6374 — 'name it' 216.1s / 'retrieves' 220.9s / 'before comparing' 228.6s / 'only reads' 235.3s
    {
      layout: 'label-title-body',
      label: 'TOOL DETAILS',
      title: 'Read Team\nAction Tracker',
      body: ['Retrieves: tasks, owners, due dates and statuses', 'Use it: before comparing commitments with existing actions', 'Read-only: the tool only reads records'],
      bodyTimings: [252, 483, 684],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['eye', 'compare', 'check'],
      durationInFrames: 742,
    },
    // f7116 — 'check Inputs' 237.2s [09]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 237.2,
      label: 'INPUTS',
      title: 'Site Address is fixed\nto the approved site',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: -30, scale: 1.5, originX: 25, originY: 42 }, { startFrame: 0, scale: 1.6, originX: 30, originY: 90 }],
      durationInFrames: 420,
    },
    // f7536 — 'change List Name' 251.2s [10]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 251.2,
      label: 'FIX THE LIST',
      title: 'List Name: Custom value,\nTeam Action Tracker',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 0, scale: 1.6, originX: 30, originY: 62 }, { startFrame: 228, scale: 1.5, originX: 60, originY: 25 }],
      durationInFrames: 303,
    },
    // f7839 — 'For your own tool' 261.3s / 'retrieval returns' 267.8s
    {
      layout: 'label-title-body',
      label: 'YOUR OWN TOOL',
      title: 'Check your\ntool inputs',
      body: ['Fixed or variable: which inputs depend on the request?', 'Complete: does retrieval return everything the task needs?'],
      bodyTimings: [0, 196],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['sliders', 'check'],
      durationInFrames: 468,
    },
    // f8307 — 'connect the configured resources' 276.9s; zoom at 'edit Instructions' 280.7s [02]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 276.9,
      label: 'INSTRUCTIONS',
      title: 'The Instructions field\nstarts empty',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 113, scale: 1.6, originX: 15, originY: 85 }],
      durationInFrames: 614,
    },
    // f8921 — 'First' 297.4s, paragraph 1 [16]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 297.367,
      label: 'INSTRUCTION 1 OF 3',
      title: 'Cite commitments, ask\nwhen details are missing',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 20, scale: 1.5, originX: 10, originY: 72 }],
      durationInFrames: 466,
    },
    // f9387 — 'Next, I'll tell it' 312.9s, paragraph 2 [16]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 312.9,
      label: 'INSTRUCTION 2 OF 3',
      title: 'Read the tracker\nbefore comparing',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: -30, scale: 1.5, originX: 10, originY: 72 }, { startFrame: 0, scale: 1.5, originX: 10, originY: 82 }],
      durationInFrames: 514,
    },
    // f9901 — 'Finally' 330.0s, paragraph 3 [16]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 330.033,
      label: 'INSTRUCTION 3 OF 3',
      title: 'Propose for review, act\nonly after approval',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: -30, scale: 1.5, originX: 10, originY: 82 }, { startFrame: 0, scale: 1.5, originX: 10, originY: 100 }],
      durationInFrames: 676,
    },
    // f10577 — 'exact configured names' 352.6s [17]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 352.567,
      label: 'SAVE',
      title: 'Use the exact names\nof your resources',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 20, scale: 1.3, originX: 10, originY: 75 }],
      durationInFrames: 319,
    },
    // f10896 — 'time to test' 363.2s; zoom at 'shows Ready' 366.3s [20]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 363.2,
      label: 'READY TO TEST',
      title: 'Knowledge shows Ready,\nthe tool is listed',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 92, scale: 1.6, originX: 55, originY: 57 }, { startFrame: 215, scale: 1.5, originX: 20, originY: 95 }, { startFrame: 337, scale: 1.0, originX: 50, originY: 50 }],
      durationInFrames: 457,
    },
    // f11353 — 'First, I'll ask' 378.4s / 'execution details' 388.0s / 'Checking its output' 394.4s
    {
      layout: 'label-title-body',
      label: 'TEST 1: THE TOOL',
      title: 'Read Team Action\nTracker completed',
      body: ['Asked: show task, owner, due date and status, change nothing', 'Result: execution details show the tool completed', 'Still to do: check its output against the live list'],
      bodyTimings: [0, 286, 480],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['chat-bubble-left-right', 'check', 'eye'],
      durationInFrames: 602,
    },
    // f11955 — 'test the knowledge source' 398.5s [20]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 398.5,
      label: 'TEST 2: KNOWLEDGE',
      title: 'Summarize the November 3\ncommitments, with sources',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 72, scale: 1.8, originX: 80, originY: 74 }],
      durationInFrames: 536,
    },
    // f12491 — 'Unable to connect' 416.4s; zoom at 'On retry' 419.5s [21]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 416.367,
      label: 'TEST 2: KNOWLEDGE',
      title: 'On retry, Search\nsources completed',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 93, scale: 1.5, originX: 15, originY: 62 }],
      durationInFrames: 307,
    },
    // f12798 — 'cited answer' 426.6s / 'Taylor's' 428.4s / 'Chris's' 432.5s / 'customer escalation' 436.1s
    {
      layout: 'label-title-body',
      label: 'TEST 2: THE KNOWLEDGE',
      title: 'Three commitments,\nall match the notes',
      body: ['Taylor: launch readiness checklist, November 9', 'Chris: onboarding FAQs, November 10', 'Customer escalation: no owner or deadline yet'],
      bodyTimings: [55, 176, 285],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['user', 'user', 'x'],
      durationInFrames: 533,
    },
    // f13331 — 'Here you can see' 444.4s [21]
    {
      layout: 'video-clip',
      videoSrc: CLIP,
      videoStartTime: 444.367,
      label: 'THE CITED ANSWER',
      title: 'Three commitments,\nno write tool used',
      overlayPosition: 'top',
      logoPosition: 'bottom-left',
      clipZoomKeyframes: [{ startFrame: 30, scale: 1.6, originX: 80, originY: 62 }],
      durationInFrames: 328,
    },
    // f13659 — 'For your own agent' 455.3s / 'Know' 462.9s / 'inspect' 465.2s / 'compare' 468.0s / 'If a test fails' 470.5s
    {
      layout: 'label-title-body',
      label: 'TEST YOUR OWN AGENT',
      title: 'Small, specific,\nsafe requests',
      body: ['Know: what the correct result should be', 'Inspect: the available execution information', 'Compare: the response with the original source', 'If it fails: record the error, then check connection, status, access'],
      bodyTimings: [228, 298, 381, 456],
      bodyRight: true,
      bodyCards: true,
      bodyCardIcons: ['lightbulb', 'eye', 'compare', 'x'],
      bodyCardCompact: true,
      durationInFrames: 661,
    },
    // f14320 — 'Your goal is to verify' 477.3s
    {
      layout: 'big-statement',
      text: 'Verify what works.\nName what still needs attention.',
      highlight: 'Name what still needs attention.',
      fontSize: 80,
      animation: 'kinetic',
      durationInFrames: 273,
    },
    // f14593 — 'Once those checks' 486.4s; VO ends 491.6s
    {
      layout: 'big-statement',
      text: 'Next: review your\nhuman-control boundaries',
      highlight: 'human-control boundaries',
      fontSize: 80,
      animation: 'kinetic',
      durationInFrames: 197,
    },
  ],
};
