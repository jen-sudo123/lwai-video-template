import { VideoData } from '../scenes/types';

// Microsoft Copilot Studio — Give Your Agent Knowledge and Tools (Weekly Team Action Follow-Up Demo).
// Audio: audio/copilot-studio-knowledge-tools.mp3 — ElevenLabs v4, Daan, two takes joined with 0.8s silence
//        at 276.11s. NOT padded (audioStartFrame = 0), so comp_frame = round(t * 30).
// Images: copilot-studio-knowledge-tools/images/ — Copilot Studio screenshots from the Drive walkthrough folder
//         (07, 11, 15, 18, 19 absent: excluded, duplicate or text-only). No screenshot exists for the rename step
//         or the tracker test, so those beats use cards.
// Transcript: src/data/copilot-studio-knowledge-tools.transcript.json (Scribe, part 2 offset +276.914s).
//
// Each scene starts on the first word of its VO beat (comment = anchor word + time).

export const copilotStudioKnowledgeTools: VideoData = {
  audioSrc: 'audio/copilot-studio-knowledge-tools.mp3',
  audioStartFrame: 0,
  scenes: [
    // f0 — 'knowledge and tools it needs' 0.0s
    {
      layout: 'title-card-green',
      label: 'MICROSOFT COPILOT STUDIO',
      title: 'Give Your Agent Knowledge and Tools',
      durationInFrames: 108,
    },
    // f108 — 'Section 3' 3.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/01-build-plan-section-3.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.45, centerY: 0.4, scale: 1.4, startFrame: 20 },
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
    // f648 — 'In our example' 21.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/01-build-plan-section-3.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.5, centerY: 0.47, scale: 1.7, startFrame: -30 },
      durationInFrames: 330,
    },
    // f978 — 'demonstrate' 32.6s; zoom on tabs at 'This interface' 47.4s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/02-agent-overview-before.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.15, centerY: 0.13, scale: 1.6, startFrame: 445 },
      durationInFrames: 581,
    },
    // f1559 — 'open Knowledge' 52.0s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/03-knowledge-empty.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.3, centerY: 0.74, scale: 1.4, startFrame: 30 },
      durationInFrames: 97,
    },
    // f1656 — 'Under Featured' 55.2s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/04-add-knowledge-options.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.39, centerY: 0.68, scale: 1.5, startFrame: 10 },
      durationInFrames: 71,
    },
    // f1727 — 'The dialog tells us' 57.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/05-sharepoint-authenticated-source.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.2, centerY: 0.17, scale: 1.6, startFrame: 15 },
      durationInFrames: 361,
    },
    // f2088 — 'Browse items' 69.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/06-sharepoint-picker.png',
      objectFit: 'contain',
      imageWidth: 1500,
      durationInFrames: 84,
    },
    // f2172 — 'navigate' 72.4s; zoom at 'Weekly Meeting Notes' 77.1s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/12-approved-meeting-notes-selected.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.39, centerY: 0.63, scale: 1.5, startFrame: 142 },
      durationInFrames: 417,
    },
    // f2589 — 'name the source' 86.3s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/13-meeting-notes-source-metadata.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.55, centerY: 0.48, scale: 1.5, startFrame: 15 },
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
    // f3250 — 'Add to agent' 108.3s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/14-knowledge-source-added.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.1, centerY: 0.38, scale: 1.5, startFrame: 20 },
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
    // f4216 — 'look at tools' 140.5s; zoom at 'Tools and actions' 144.2s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/01-build-plan-section-3.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.5, centerY: 0.55, scale: 1.8, startFrame: 109 },
      durationInFrames: 481,
    },
    // f4697 — 'open the Tools tab' 156.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/08-existing-tools.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.1, centerY: 0.43, scale: 1.5, startFrame: 59 },
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
    // f5658 — 'open the read tool' 188.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/09-read-tool-credentials.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.2, centerY: 0.43, scale: 1.5, startFrame: 110 },
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
    // f7116 — 'check Inputs' 237.2s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/09-read-tool-credentials.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.25, centerY: 0.92, scale: 1.5, startFrame: 58 },
      durationInFrames: 420,
    },
    // f7536 — 'change List Name' 251.2s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/10-fixed-site-and-list-before-save.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.3, centerY: 0.62, scale: 1.5, startFrame: 30 },
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
    // f8307 — 'connect the configured resources' 276.9s; zoom at 'edit Instructions' 280.7s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/02-agent-overview-before.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.15, centerY: 0.85, scale: 1.5, startFrame: 113 },
      durationInFrames: 614,
    },
    // f8921 — 'First' 297.4s, paragraph 1
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/16-resource-instructions-entered.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.1, centerY: 0.72, scale: 1.5, startFrame: 20 },
      durationInFrames: 466,
    },
    // f9387 — 'Next, I'll tell it' 312.9s, paragraph 2
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/16-resource-instructions-entered.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.1, centerY: 0.82, scale: 1.5, startFrame: -30 },
      durationInFrames: 514,
    },
    // f9901 — 'Finally' 330.0s, paragraph 3
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/16-resource-instructions-entered.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.1, centerY: 0.93, scale: 1.5, startFrame: -30 },
      durationInFrames: 676,
    },
    // f10577 — 'exact configured names' 352.6s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/17-resource-instructions-saved.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.1, centerY: 0.75, scale: 1.3, startFrame: 20 },
      durationInFrames: 319,
    },
    // f10896 — 'time to test' 363.2s; zoom at 'shows Ready' 366.3s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/20-source-ready-and-test-prompt.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.55, centerY: 0.565, scale: 1.7, startFrame: 92 },
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
    // f11955 — 'test the knowledge source' 398.5s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/20-source-ready-and-test-prompt.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.81, centerY: 0.74, scale: 1.8, startFrame: 72 },
      durationInFrames: 536,
    },
    // f12491 — 'Unable to connect' 416.4s; zoom at 'On retry' 419.5s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/21-knowledge-retrieval-completed.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.15, centerY: 0.62, scale: 1.5, startFrame: 93 },
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
    // f13331 — 'Here you can see' 444.4s
    {
      layout: 'centered-image-caption',
      image: 'copilot-studio-knowledge-tools/images/21-knowledge-retrieval-completed.png',
      objectFit: 'contain',
      imageWidth: 1500,
      imageZoom: { centerX: 0.78, centerY: 0.65, scale: 1.5, startFrame: 30 },
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
