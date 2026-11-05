import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { colors } from '../tokens';

loadSerif();
loadSans();

// Building an Agent Flow (Check Team Action Tracker): Copilot Studio demo built from the
// user's VO (audio/agent-flow-tracker.mp3, 532.3s, ElevenLabs) and 26 screenshots
// (agent-flow-tracker/images/*.png, 1920x999, from Drive folder 1Wv0kZxDFV6ULqmtW2DFqPzo6DQEcIYoR).
// Every cue is in SECONDS of the VO, from the word timestamps in
// src/data/agent-flow-tracker.transcript.json (pocketsphinx ASR aligned to agent-flow-tracker.script.txt;
// ElevenLabs Scribe was unreachable from the cloud session).
//
// Screenshot shots: the image sits in a 1760px card (k = 1760/1920) and a "camera" moves over it.
// Camera keyframes give zoom `s`, the focal point `f` in SOURCE pixels (1920x999) and where that point
// lands on screen `at` (default: frame centre). Boxes are lime highlight rectangles in source pixels.

export const AGENT_FLOW_TRACKER_DURATION_S = 534.5;
export const AGENT_FLOW_TRACKER_TITLE_FRAMES = 90;
export const AGENT_FLOW_TRACKER_VO_FROM = 75;

const IMG = (name: string) => `agent-flow-tracker/images/${name}.png`;
const SRC_W = 1920;
const SRC_H = 999;
const CARD_W = 1760;
const K = CARD_W / SRC_W;
const CROSSFADE = 0.5;
const LEAD = 0.15;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const OUT = Easing.out(Easing.cubic);
const IN_OUT = Easing.inOut(Easing.cubic);

const prog = (t: number, at: number, dur = 0.6, easing = OUT) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing });

const enter = (t: number, at: number, { dur = 0.6, y = 22 } = {}): React.CSSProperties => {
  const p = prog(t, at - LEAD, dur);
  return { opacity: p, transform: `translateY(${y * (1 - p)}px)` };
};

const markStyle = (t: number, at: number): React.CSSProperties => ({
  backgroundSize: `${prog(t, at, 0.8, IN_OUT) * 100}% 38%`,
});

// ── Camera ───────────────────────────────────────────────────────────────

type Cam = { t: number; s: number; f?: [number, number]; at?: [number, number]; dur?: number };
type Box = { t: number; end?: number; r: [number, number, number, number] };
type Chip = { t: number; end?: number; text: string };

const DEFAULT_F: [number, number] = [SRC_W / 2, SRC_H / 2];
const DEFAULT_AT: [number, number] = [960, 540];

const camAt = (cams: Cam[], t: number) => {
  let s = cams[0].s;
  let f = cams[0].f ?? DEFAULT_F;
  let at = cams[0].at ?? DEFAULT_AT;
  for (let i = 1; i < cams.length; i++) {
    const c = cams[i];
    const p = interpolate(t, [c.t, c.t + (c.dur ?? 1.1)], [0, 1], { ...clamp, easing: IN_OUT });
    if (p <= 0) break;
    const cf = c.f ?? DEFAULT_F;
    const ca = c.at ?? DEFAULT_AT;
    s = s + (c.s - s) * p;
    f = [f[0] + (cf[0] - f[0]) * p, f[1] + (cf[1] - f[1]) * p];
    at = [at[0] + (ca[0] - at[0]) * p, at[1] + (ca[1] - at[1]) * p];
  }
  return { s, f, at };
};

type Shot = {
  start: number;
  img: string;
  cams: Cam[];
  boxes?: Box[];
  chips?: Chip[];
  fade?: number;
  chipTop?: boolean;
};

const Screenshot: React.FC<{ t: number; shot: Shot }> = ({ t, shot }) => {
  const { s, f, at } = camAt(shot.cams, t);
  // Screen position of source pixel p: at + s*K*(p - f)
  const left = at[0] - s * K * f[0];
  const top = at[1] - s * K * f[1];
  const scale = s * K;
  return (
    <AbsoluteFill style={{ backgroundColor: '#F2F2EF', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left,
          top,
          width: SRC_W,
          height: SRC_H,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          borderRadius: 18 / scale,
          overflow: 'hidden',
          boxShadow: `0 ${24 / scale}px ${70 / scale}px rgba(0,0,0,0.16), 0 0 0 ${1 / scale}px rgba(0,0,0,0.08)`,
          backgroundColor: colors.white,
        }}
      >
        <Img src={staticFile(shot.img)} style={{ width: SRC_W, height: SRC_H, display: 'block' }} />
        {(shot.boxes ?? []).map((b, i) => {
          const p = prog(t, b.t - LEAD, 0.45) * (b.end ? 1 - prog(t, b.end, 0.4) : 1);
          const [x, y, w, h] = b.r;
          const pad = 6 / scale;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x - pad,
                top: y - pad,
                width: w + 2 * pad,
                height: h + 2 * pad,
                border: `${4 / scale}px solid ${colors.lime500}`,
                borderRadius: 8 / scale,
                backgroundColor: 'rgba(102,198,28,0.10)',
                opacity: p,
                transform: `scale(${1.04 - 0.04 * p})`,
              }}
            />
          );
        })}
      </div>
      {(shot.chips ?? []).map((c, i) => {
        const p = prog(t, c.t - LEAD, 0.5) * (c.end ? 1 - prog(t, c.end, 0.4) : 1);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 80,
              ...(shot.chipTop ? { top: 70 } : { bottom: 70 }),
              padding: '18px 30px',
              borderRadius: 14,
              backgroundColor: '#111',
              color: colors.white,
              fontFamily: 'Public Sans',
              fontSize: 32,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
              opacity: p,
              transform: `translateY(${20 * (1 - p)}px)`,
            }}
          >
            <span style={{ width: 14, height: 14, borderRadius: 7, backgroundColor: colors.lime500 }} />
            {c.text}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── Shot list (VO seconds) ───────────────────────────────────────────────

const PLAN_TEST_BOX: Box['r'] = [606, 638, 660, 74];
const PLAN_ROW2_BOX: Box['r'] = [622, 326, 642, 48];

const SHOTS: Shot[] = [
  // Section 5 of the Build Plan: first version + test
  {
    start: 0,
    img: IMG('01-plan-test'),
    cams: [
      { t: 0, s: 1.0 },
      { t: 3.3, s: 1.55, f: [940, 560] },
      { t: 16.3, s: 1.75, f: [940, 690] },
    ],
    boxes: [{ t: 16.59, r: PLAN_TEST_BOX }],
  },
  // Section 2: main steps; step 2 is the tracker check
  {
    start: 42.42,
    img: IMG('02-plan-workflow'),
    cams: [
      { t: 42.42, s: 1.0 },
      { t: 43.0, s: 1.85, f: [940, 360] },
    ],
    boxes: [{ t: 47.27, r: PLAN_ROW2_BOX }],
  },
  // Copilot Studio > Workflows > New workflow menu > Agent flows
  {
    start: 80.1,
    img: IMG('03-create-menu'),
    cams: [
      { t: 80.1, s: 1.0 },
      { t: 82.9, s: 1.7, f: [1440, 330] },
    ],
    boxes: [{ t: 86.81, r: [1268, 388, 452, 70] }],
  },
  // Agent Flow designer, trigger
  {
    start: 88.33,
    img: IMG('03b-blank-route-trigger'),
    cams: [
      { t: 88.33, s: 1.0 },
      { t: 90.2, s: 1.85, f: [990, 300] },
    ],
    boxes: [{ t: 91.5, r: [692, 166, 598, 54] }],
    chips: [{ t: 91.5, end: 106.5, text: 'Trigger: When an agent calls the flow' }],
  },
  // SharePoint Get items
  {
    start: 108.77,
    img: IMG('04-rebuilt-get-items'),
    cams: [
      { t: 108.77, s: 1.0 },
      { t: 109.4, s: 1.7, f: [990, 560] },
      { t: 120.47, s: 1.15, f: [990, 400] },
    ],
    boxes: [
      { t: 111.8, end: 120.2, r: [700, 526, 584, 28] },
      { t: 114.3, end: 120.2, r: [700, 584, 584, 32] },
    ],
    chips: [{ t: 125.5, text: 'Flow name: Check Team Action Tracker' }],
  },
  // The SharePoint list
  {
    start: 131.28,
    img: IMG('04b-tracker-before-tests'),
    cams: [
      { t: 131.28, s: 1.0 },
      { t: 133.6, s: 1.6, f: [1000, 420] },
    ],
    boxes: [
      { t: 136.83, end: 145.6, r: [312, 396, 1000, 40] },
      { t: 139.22, end: 145.6, r: [312, 444, 1000, 40] },
      { t: 145.83, r: [312, 350, 760, 34] },
    ],
    chips: [{ t: 141.21, end: 145.6, text: "Chris's onboarding FAQs: not in the tracker" }],
  },
  // Select and Respond to the agent: zooms into the real cards, captions spell out the expressions
  {
    start: 159.31,
    img: IMG('05-rebuilt-select'),
    chipTop: true,
    // Zooms into the real Select card (no side panel): From field, then each Map row.
    // The card shows the values only as collapsed item() chips, so the caption chip spells
    // out each expression as the VO names it. Status's row is below the screenshot's edge.
    cams: [
      // f.y keeps the screenshot's bottom edge at the frame's bottom (the card sits at the
      // bottom of the screenshot): f.y = 999 - 540 / (s * K).
      { t: 159.31, s: 1.3, f: [990, 545] },
      { t: 160.0, s: 1.5, f: [990, 606] },
      { t: 176.6, s: 2.2, f: [1000, 731] },
      { t: 187.6, s: 1.9, f: [960, 689] },
      { t: 194.5, s: 2.3, f: [960, 743] },
      { t: 213.8, s: 1.8, f: [960, 672] },
    ],
    boxes: [
      { t: 177.29, end: 187.4, r: [716, 728, 566, 28] },
      { t: 188.31, end: 194.6, r: [700, 796, 516, 150] },
      { t: 194.86, end: 200.0, r: [700, 798, 516, 26] },
      { t: 200.24, end: 202.1, r: [700, 838, 516, 26] },
      { t: 202.3, end: 205.1, r: [700, 878, 516, 26] },
      { t: 205.29, end: 210.0, r: [700, 918, 516, 26] },
      { t: 224.63, end: 229.4, r: [700, 798, 516, 26] },
    ],
    chips: [
      { t: 164.51, end: 176.9, text: 'Field names as plain text, values as expressions (fx)' },
      { t: 177.29, end: 187.4, text: "From: body('Get_items')?['value']" },
      { t: 188.31, end: 194.6, text: 'Map five fields: ID, Title, Owner, DueDate, Status' },
      { t: 194.86, end: 200.0, text: "ID: item()['ID']" },
      { t: 200.24, end: 202.1, text: "Title: item()['Title']" },
      { t: 202.3, end: 205.1, text: "Owner: item()['field_1']" },
      { t: 205.29, end: 210.0, text: "DueDate: item()['Dateandtime']" },
      { t: 210.12, end: 214.0, text: "Status: item()['field_3']" },
      { t: 218.51, end: 224.3, text: 'These are this list\'s internal names. Check the names in your own list.' },
      { t: 224.63, end: 229.4, text: 'ID: an unambiguous reference to the tracker record' },
    ],
  },
  {
    start: 229.65,
    img: IMG('05b-rebuilt-outputs'),
    // Zooms into the real Respond to the agent card (no side panel). f.y keeps the
    // screenshot's bottom edge at the frame's bottom: f.y = 999 - 540 / (s * K).
    cams: [
      { t: 229.65, s: 1.3, f: [990, 545] },
      { t: 230.2, s: 1.6, f: [990, 631] },
      { t: 247.0, s: 2.3, f: [990, 743] },
    ],
    boxes: [
      { t: 230.69, end: 233.7, r: [700, 538, 580, 30] },
      { t: 233.92, end: 247.0, r: [736, 586, 510, 128] },
      { t: 247.42, end: 256.4, r: [736, 590, 510, 28] },
      { t: 256.62, end: 264.7, r: [736, 686, 510, 28] },
    ],
    chips: [
      { t: 233.92, end: 235.6, text: 'Two Text outputs' },
      { t: 235.78, end: 239.8, text: "Started from the Workflows page? Add this action yourself." },
      { t: 240.0, end: 247.0, text: "Created from an agent's Tools page? Configure the existing action." },
      { t: 247.42, end: 251.2, text: "TrackerRecords: string(body('Select'))" },
      { t: 251.34, end: 256.4, text: 'Converts the array into JSON text for the agent' },
      { t: 256.62, end: 264.7, text: "LookupStatus: if(greater(length(body('Select')),0),'Ready','NoRecords')" },
    ],
  },
  // Run output: Ready
  {
    start: 264.96,
    img: IMG('08-rebuilt-baseline-ready'),
    cams: [
      { t: 264.96, s: 1.5, f: [1300, 560] },
      { t: 265.4, s: 1.9, f: [1520, 520] },
    ],
    boxes: [{ t: 267.59, r: [1340, 598, 470, 28] }],
    chips: [{ t: 267.59, text: 'Records found: LookupStatus = Ready' }],
  },
  // Run output: empty list → NoRecords
  {
    start: 269.4,
    img: IMG('08c-empty-result-confirmed'),
    fade: 0.3,
    cams: [
      { t: 269.4, s: 1.9, f: [1520, 520] },
      { t: 280.66, s: 1.45, f: [1200, 600] },
    ],
    boxes: [{ t: 269.6, end: 280.4, r: [1340, 576, 470, 48] }],
    chips: [{ t: 269.6, text: 'Empty list: LookupStatus = NoRecords' }],
  },
  // Asynchronous response Off
  {
    start: 294.19,
    img: IMG('05c-rebuilt-synchronous-setting'),
    cams: [
      { t: 294.19, s: 1.6, f: [600, 420] },
      { t: 294.6, s: 1.9, f: [560, 380] },
    ],
    boxes: [{ t: 297.73, r: [112, 314, 250, 50] }],
    chips: [{ t: 297.73, text: 'Asynchronous response: Off' }],
  },
  // Flow checker
  {
    start: 305.62,
    img: IMG('05d-rebuilt-checker'),
    cams: [
      { t: 305.62, s: 1.6, f: [1500, 400] },
    ],
    boxes: [{ t: 306.4, r: [1302, 102, 180, 26] }],
  },
  // Published
  {
    start: 308.81,
    img: IMG('05e-rebuilt-published'),
    cams: [
      { t: 308.81, s: 1.5, f: [760, 430] },
    ],
    boxes: [{ t: 309.3, r: [74, 128, 900, 26] }],
  },
  // Agent > Tools
  {
    start: 310.67,
    img: IMG('06-tools-before-tests'),
    cams: [
      { t: 310.67, s: 1.0 },
      { t: 317.8, s: 1.15, f: [960, 280] },
    ],
    boxes: [{ t: 318.21, r: [88, 226, 1810, 32] }],
  },
  // Tool enabled; old Read Team Action Tracker off
  {
    start: 334.42,
    img: IMG('06b-normal-tools-restored'),
    cams: [{ t: 334.42, s: 1.15, f: [960, 280] }],
    boxes: [
      { t: 338.2, end: 342.3, r: [1724, 262, 96, 30] },
      { t: 342.63, r: [88, 308, 1810, 30] },
      { t: 345.61, r: [1724, 308, 96, 30] },
    ],
    chips: [
      { t: 338.2, end: 342.3, text: 'Check Team Action Tracker: On' },
      { t: 345.61, text: 'Read Team Action Tracker: Off' },
    ],
  },
  // Back to the Section 5 test
  {
    start: 392.13,
    img: IMG('01-plan-test'),
    cams: [
      { t: 392.13, s: 1.3, f: [940, 600] },
      { t: 393.0, s: 1.75, f: [940, 690] },
    ],
    boxes: [{ t: 393.6, r: PLAN_TEST_BOX }],
  },
  // Test your agent: the prompt
  {
    start: 398.81,
    img: IMG('07c-final-baseline-prompt'),
    cams: [
      { t: 398.81, s: 1.0 },
      { t: 399.6, s: 1.9, f: [1600, 820], at: [1060, 600] },
    ],
    boxes: [{ t: 402.74, r: [1316, 794, 532, 76] }],
  },
  // The tool call and its outputs
  {
    start: 418.24,
    img: IMG('07d-final-summary-taylor'),
    cams: [
      { t: 418.24, s: 1.0 },
      { t: 419.0, s: 1.7, f: [640, 450] },
    ],
    boxes: [
      { t: 423.13, r: [280, 180, 420, 30] },
      { t: 424.2, r: [300, 504, 740, 100] },
      { t: 425.0, r: [300, 664, 160, 46] },
    ],
  },
  // Recommendation 1: Taylor
  {
    start: 426.52,
    img: IMG('07d-final-summary-taylor'),
    cams: [
      { t: 426.52, s: 1.15, f: [1400, 560] },
      { t: 429.0, s: 1.9, f: [1520, 640] },
    ],
    boxes: [
      { t: 437.65, r: [1310, 536, 420, 24] },
      { t: 442.27, r: [1350, 616, 340, 42] },
      { t: 446.96, r: [1646, 536, 50, 24] },
    ],
  },
  // Recommendation 2: Chris
  {
    start: 449.83,
    img: IMG('07e-final-chris-review'),
    cams: [{ t: 449.83, s: 1.9, f: [1580, 600] }],
    boxes: [
      { t: 450.0, r: [1312, 514, 404, 22] },
      { t: 456.81, r: [1352, 535, 350, 20] },
    ],
    chips: [{ t: 462.24, text: 'Recommendation only. No new SharePoint item.' }],
  },
  // Recommendation 3: customer escalation
  {
    start: 466.81,
    img: IMG('08e-final-tool-output'),
    cams: [
      { t: 466.81, s: 1.9, f: [1540, 360] },
      { t: 475.6, s: 1.8, f: [1540, 560] },
    ],
    boxes: [
      { t: 467.0, r: [1310, 280, 520, 44] },
      { t: 473.84, r: [1350, 334, 330, 58] },
      { t: 476.4, r: [1305, 614, 560, 62] },
    ],
  },
  // Tracker unchanged after the tests
  {
    start: 480.0,
    img: IMG('08f-tracker-after-tests'),
    cams: [
      { t: 480.0, s: 1.0 },
      { t: 480.3, s: 1.6, f: [1000, 420] },
    ],
    boxes: [{ t: 480.6, r: [312, 396, 1000, 88] }],
    chips: [{ t: 480.6, text: 'Tracker unchanged: still two records' }],
  },
  // Recap: Step 2
  {
    start: 482.88,
    img: IMG('02-plan-workflow'),
    cams: [
      { t: 482.88, s: 1.3, f: [940, 300] },
      { t: 483.6, s: 1.85, f: [940, 360] },
    ],
    boxes: [{ t: 485.96, r: PLAN_ROW2_BOX }],
  },
  // Recap: the flow ran successfully
  {
    start: 490.89,
    img: IMG('08h-final-normal-execution'),
    cams: [
      { t: 490.89, s: 1.0 },
      { t: 491.4, s: 1.55, f: [1000, 380] },
    ],
  },
  // Learner handoff: Section 5 template
  {
    start: 496.98,
    img: IMG('09-learner-handoff'),
    cams: [
      { t: 496.98, s: 1.0 },
      { t: 498.4, s: 1.7, f: [940, 330] },
    ],
  },
];

// ── Text cards ───────────────────────────────────────────────────────────

const CSS = `
  .af-pad { position: absolute; left: 120px; right: 120px; top: 140px; bottom: 150px; display: flex; flex-direction: column; justify-content: center; }
  .af-kicker { font-family: 'Public Sans'; font-size: 24px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-bottom: 26px; }
  .af-h1, .af-h2, .af-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.03em; margin: 0; color: #111; }
  .af-h1 { font-size: 88px; line-height: 1.12; max-width: 1600px; }
  .af-h2 { font-size: 62px; line-height: 1.18; max-width: 1600px; }
  .af-h3 { font-size: 40px; line-height: 1.28; }
  .af-body { font-family: 'Public Sans'; font-size: 36px; line-height: 1.45; color: ${colors.neutral600}; max-width: 1500px; }
  .af-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .af-bar { width: 96px; height: 8px; background: ${colors.lime500}; margin-bottom: 40px; }
  .af-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; margin-top: 64px; }
  .af-step { border-top: 8px solid ${colors.lime500}; padding-top: 26px; }
  .af-step-n { font-family: 'Public Sans'; font-size: 26px; font-weight: 600; color: ${colors.neutral600}; margin-bottom: 10px; }
  .af-list { display: flex; flex-direction: column; gap: 30px; margin-top: 54px; }
  .af-item { display: flex; align-items: baseline; gap: 28px; font-family: 'Public Sans'; font-size: 38px; line-height: 1.35; color: #111; }
  .af-dot { width: 18px; height: 18px; border-radius: 50%; background: ${colors.lime500}; border: 3px solid #111; flex: none; transform: translateY(-5px); }
  .af-badge { display: inline-flex; align-items: center; gap: 18px; margin-top: 56px; padding: 20px 30px; border: 3px solid #111; border-radius: 14px; font-family: 'Public Sans'; font-size: 32px; font-weight: 600; color: #111; align-self: flex-start; }
  .af-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 64px; }
  .af-col { border-top: 8px solid ${colors.lime500}; padding-top: 28px; }
  .af-col.dark { border-top-color: #111; }
  .af-code { font-family: 'IBM Plex Mono', Menlo, Consolas, monospace; font-size: 25px; color: #111; background: #F3F5EF; border: 1px solid #E2E6DA; border-radius: 10px; padding: 12px 16px; margin-top: 10px; word-break: break-all; line-height: 1.35; }
  .af-panel { position: absolute; left: 1000px; top: 120px; width: 840px; bottom: 120px; background: #fff; border-radius: 22px; box-shadow: 0 24px 70px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06); padding: 46px 50px; display: flex; flex-direction: column; }
  .af-panel-title { font-family: 'IBM Plex Serif'; font-size: 44px; letter-spacing: -0.02em; color: #111; margin: 0 0 8px; }
  .af-panel-sub { font-family: 'Public Sans'; font-size: 24px; color: ${colors.neutral600}; margin-bottom: 26px; }
  .af-row { margin-top: 20px; }
  .af-row-label { font-family: 'Public Sans'; font-size: 26px; font-weight: 600; color: #111; }
  .af-row-note { font-family: 'Public Sans'; font-size: 24px; color: ${colors.neutral600}; margin-top: 8px; line-height: 1.35; }
  .af-map { display: grid; grid-template-columns: 150px 1fr; column-gap: 18px; row-gap: 12px; align-items: center; margin-top: 12px; }
  .af-map .af-code { margin-top: 0; padding: 8px 14px; font-size: 24px; }
  .af-note { margin-top: auto; padding: 18px 22px; border-left: 6px solid ${colors.lime500}; background: #F7FBF2; font-family: 'Public Sans'; font-size: 24px; line-height: 1.38; color: #111; }
`;

type CardDef = { start: number; render: (t: number) => React.ReactNode };

const CARDS: CardDef[] = [
  {
    start: 28.74,
    render: (t) => (
      <div className="af-pad">
        <div className="af-kicker" style={enter(t, 28.9, { y: 10 })}>Today's build</div>
        <div className="af-bar" style={enter(t, 28.9, { y: 0 })} />
        <div className="af-h1" style={enter(t, 29.0, { dur: 0.8, y: 30 })}>
          An Agent Flow that makes the tracker check{' '}
          <span className="af-mark" style={markStyle(t, 32.4)}>consistent and reliable</span>
        </div>
        <div className="af-body" style={{ marginTop: 48, ...enter(t, 34.68) }}>
          It retrieves existing commitments from SharePoint and returns what the agent needs to prepare its
          recommendations.
        </div>
      </div>
    ),
  },
  {
    start: 52.07,
    render: (t) => (
      <div className="af-pad">
        <div className="af-kicker" style={enter(t, 52.2, { y: 10 })}>Why an Agent Flow?</div>
        <div className="af-h2" style={enter(t, 52.3, { dur: 0.8, y: 30 })}>
          Step 2 follows a <span className="af-mark" style={markStyle(t, 55.6)}>repeatable process</span>
        </div>
        <div className="af-steps">
          {[
            { at: 57.65, n: '01', h: 'Retrieve SharePoint items' },
            { at: 59.47, n: '02', h: 'Check whether records were found' },
            { at: 61.41, n: '03', h: 'Organize the relevant information' },
            { at: 63.59, n: '04', h: 'Return it to the agent' },
          ].map((s) => (
            <div key={s.n} className="af-step" style={enter(t, s.at)}>
              <div className="af-step-n">{s.n}</div>
              <div className="af-h3">{s.h}</div>
            </div>
          ))}
        </div>
        <div className="af-body" style={{ marginTop: 50, ...enter(t, 65.43) }}>
          The agent then compares those records with the meeting notes and prepares recommendations for review.
        </div>
        <div className="af-badge" style={enter(t, 71.91)}>
          <span style={{ width: 16, height: 16, borderRadius: 8, background: colors.lime500 }} />
          Retrieval only: no create, update or delete, no messages sent
        </div>
      </div>
    ),
  },
  {
    start: 286.69,
    render: (t) => (
      <div className="af-pad">
        <div className="af-kicker" style={enter(t, 286.85, { y: 10 })}>A boundary to keep</div>
        <div className="af-bar" style={enter(t, 286.85, { y: 0 })} />
        <div className="af-h1" style={enter(t, 286.95, { dur: 0.8, y: 30 })}>
          A failed retrieval is <span className="af-mark" style={markStyle(t, 289.6)}>not an empty tracker.</span>
        </div>
        <div className="af-body" style={{ marginTop: 48, ...enter(t, 290.7) }}>
          It is never permission to classify an action as new.
        </div>
      </div>
    ),
  },
  {
    start: 350.03,
    render: (t) => (
      <div className="af-pad">
        <div className="af-kicker" style={enter(t, 350.2, { y: 10 })}>Agent instructions: first version</div>
        <div className="af-h2" style={enter(t, 350.3, { dur: 0.8, y: 30 })}>
          Align the instructions with <span className="af-mark" style={markStyle(t, 352.6)}>this version</span>
        </div>
        <div className="af-list">
          {[
            { at: 353.93, text: 'Use Check Team Action Tracker before classifying commitments' },
            { at: 359.41, text: 'Prepare recommendations only' },
            { at: 361.71, text: 'Do not change records or send messages' },
            {
              at: 364.9,
              text: 'If the tool is unavailable, say so. Never search meeting notes for tracker records',
            },
            { at: 375.38, text: 'Remove references to later-stage tools' },
          ].map((it, i) => (
            <div key={i} className="af-item" style={enter(t, it.at)}>
              <span className="af-dot" />
              {it.text}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    start: 380.7,
    render: (t) => (
      <div className="af-pad">
        <div className="af-kicker" style={enter(t, 380.85, { y: 10 })}>Ready to test</div>
        <div className="af-h2" style={enter(t, 380.95, { dur: 0.8, y: 30 })}>
          Everything the agent needs is <span className="af-mark" style={markStyle(t, 383.6)}>connected</span>
        </div>
        <div className="af-cols">
          <div className="af-col" style={enter(t, 382.78)}>
            <div className="af-step-n">KNOWLEDGE</div>
            <div className="af-h3">Approved Weekly Meeting Notes</div>
          </div>
          <div className="af-col dark" style={enter(t, 388.26)}>
            <div className="af-step-n">TOOL (AGENT FLOW)</div>
            <div className="af-h3">Check Team Action Tracker</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    start: 503.53,
    render: (t) => (
      <div className="af-pad">
        <div className="af-kicker" style={enter(t, 503.7, { y: 10 })}>Your turn</div>
        <div className="af-h2" style={enter(t, 503.8, { dur: 0.8, y: 30 })}>
          Turn one step into an <span className="af-mark" style={markStyle(t, 506.2)}>Agent Flow</span>
        </div>
        <div className="af-list">
          {[
            { at: 504.33, text: 'Pick a repeatable step from Section 2 of your Build Plan' },
            { at: 514.81, text: 'Build or design the Agent Flow and connect it to your agent' },
            { at: 520.56, text: "Explain in the agent's instructions when to use the flow" },
            { at: 524.05, text: 'Test it, inspect what it returns, and confirm the agent stays in bounds' },
          ].map((it, i) => (
            <div key={i} className="af-item" style={enter(t, it.at)}>
              <span className="af-dot" />
              {it.text}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ── Timeline ─────────────────────────────────────────────────────────────

type Item = { start: number; fade: number; node: (t: number) => React.ReactNode; logo?: boolean };

const ITEMS: Item[] = [
  ...SHOTS.map((s) => ({ start: s.start, fade: s.fade ?? CROSSFADE, node: (t: number) => <Screenshot t={t} shot={s} /> })),
  ...CARDS.map((c) => ({ start: c.start, fade: CROSSFADE, node: c.render, logo: true })),
].sort((a, b) => a.start - b.start);


const Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const endFade = prog(t, 533.0, 1.2, Easing.in(Easing.quad));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/agent-flow-tracker.mp3')} />
      {ITEMS.map((it, i) => {
        const next = ITEMS[i + 1];
        const end = next ? next.start + next.fade : Infinity;
        if (t < it.start || t >= end) return null;
        const opacity = i === 0 ? 1 : prog(t, it.start, it.fade, IN_OUT);
        return (
          <AbsoluteFill key={i} style={{ backgroundColor: colors.white, opacity, zIndex: i + 1 }}>
            {it.node(t)}
            {it.logo && <LogoFooter />}
          </AbsoluteFill>
        );
      })}
      <AbsoluteFill style={{ backgroundColor: colors.white, opacity: endFade, zIndex: 300 }} />
    </AbsoluteFill>
  );
};

export const AgentFlowTracker: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence from={AGENT_FLOW_TRACKER_VO_FROM}>
      <Body />
    </Sequence>
    <Sequence durationInFrames={AGENT_FLOW_TRACKER_TITLE_FRAMES} style={{ zIndex: 400 }}>
      <TitleCardGreen label="AGENT BUILD PLAN" title="Building an Agent Flow" />
    </Sequence>
  </AbsoluteFill>
);
