import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Easing,
  interpolate,
  staticFile,
  useCurrentFrame,
} from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import {
  SparklesIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  BoltIcon,
  CheckIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  LockClosedIcon,
  EnvelopeIcon,
  CalendarIcon,
  TableCellsIcon,
  PencilIcon,
  ArrowDownIcon,
  FlagIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { BuildPlanCodoDiagram } from '../scenes/diagrams/BuildPlanCodoDiagram';
import { colors } from '../tokens';

loadSerif();
loadSans();

// Your Agent Needs More Than a Job Description — custom-animated version.
// VO: audio/agent-instructions.orig.mp3 (ElevenLabs TTS, 288.9s), played from frame 60 after a green
// title card ("Creating CODO Agent Instructions"). Every cue below is in SECONDS of the VO, from the ElevenLabs Scribe word timestamps in
// src/data/agent-instructions.transcript.json.
//
// Recurring visual ideas: the "weekly report" sticky note that grows into a proper brief; the Build
// Plan document that turns into C-O-D-O tiles; an iceberg for tacit knowledge (the plan above the
// waterline, your judgment below it); the Agent Instructions Builder chat; the CODO instructions doc.
//
//  #   scene                                   VO start
//  1   First agent / delegating                  0.0
//  2   "Prepare our weekly report."             11.4
//  3   The brief you'd actually write           18.8
//  4   One answer vs carrying work forward      27.3
//  5   More than a job description              42.8
//  6   You already have a Build Plan            46.9
//  7   Build Plan → CODO (BuildPlanCodoDiagram) 60.9
//  8   Iceberg: plan is high-level             102.5
//  9   Example: same task, worded differently  114.0
//  10  Iceberg: judgment you make automatically 126.6
//  11  Write it yourself, or use the prompt    137.0
//  12  Prompt + Build Plan → CODO              152.3
//  13  Not longer: uncover what's missing      161.45
//  14  The builder asks you questions          172.4
//  15  Invent vs explain                       185.9
//  16  Section: Uncovering tacit knowledge     192.9
//  17  "Identify possible duplicates"          198.6
//  18  Writing the duplicate rules             209.6
//  19  Iceberg: tacit → explicit, you confirm  225.5
//  20  The CODO instructions + review          237.3
//  21  Instructions ≠ access                   260.7
//  22  Your four steps                         272.2
//  23  Close                                   278.7

export const AGENT_INSTRUCTIONS_TITLE_FRAMES = 60;
export const AGENT_INSTRUCTIONS_DURATION_S = 290.0;

const FPS = 30;
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const OUT = Easing.out(Easing.cubic);
const IN_OUT = Easing.inOut(Easing.cubic);
const BACK = Easing.out(Easing.back(1.7));
// Reveals start slightly before the word so they're readable as it's spoken.
const LEAD = 0.15;

const INK = '#1B1F1A';
const MUTED = '#6B7266';
const LINE = '#E4E9DF';
const PAPER = '#FBFCF9';
const TINT = '#F1F8EA';
const HL = colors.lime200;
const LIME = colors.lime500;
const DEEP = colors.titleGreen;
const WATER = '#EAF3F2';
const WATER_DEEP = '#D6E8E6';
const SERIF = 'IBM Plex Serif';
const SANS = 'Public Sans';

// ── animation helpers (t = VO seconds) ─────────────────────────────────────
const prog = (t: number, at: number, dur = 0.6, easing = OUT) =>
  interpolate(t, [at - LEAD, at - LEAD + dur], [0, 1], { ...clamp, easing });

const rise = (t: number, at: number, y = 24, dur = 0.6): React.CSSProperties => {
  const p = prog(t, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * y}px)` };
};

const pop = (t: number, at: number, dur = 0.5): React.CSSProperties => {
  const p = prog(t, at, dur, BACK);
  const o = prog(t, at, 0.25);
  return { opacity: o, transform: `scale(${0.6 + 0.4 * p})` };
};

const dim = (t: number, at: number, to = 0.3) => 1 - (1 - to) * prog(t, at, 0.5);

// Multiply an entrance style's opacity by an extra factor (e.g. dimming).
const fade = (st: React.CSSProperties, k: number): React.CSSProperties => ({ ...st, opacity: ((st.opacity as number) ?? 1) * k });

// ── shared pieces ──────────────────────────────────────────────────────────
const Label: React.FC<{ children: React.ReactNode; color?: string; style?: React.CSSProperties }> = ({
  children,
  color = MUTED,
  style,
}) => (
  <div style={{ fontFamily: SANS, fontSize: 20, fontWeight: 600, letterSpacing: '0.13em', textTransform: 'uppercase', color, ...style }}>
    {children}
  </div>
);

// Highlighter stroke that sweeps under a phrase from `at`.
const Mark: React.FC<{ t: number; at: number; children: React.ReactNode; color?: string }> = ({ t, at, children, color = HL }) => (
  <span
    style={{
      backgroundImage: `linear-gradient(${color}, ${color})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '0 88%',
      backgroundSize: `${prog(t, at, 0.7, IN_OUT) * 100}% 42%`,
      padding: '0 4px',
      margin: '0 -4px',
    }}
  >
    {children}
  </span>
);

const Lime: React.FC<{ t: number; at: number; children: React.ReactNode }> = ({ t, at, children }) => {
  const p = prog(t, at, 0.4);
  return <span style={{ color: p > 0.5 ? LIME : INK, transition: 'none' }}>{children}</span>;
};

const IconChip: React.FC<{ Icon: React.FC<React.SVGProps<SVGSVGElement>>; size?: number; bg?: string; fg?: string }> = ({
  Icon,
  size = 48,
  bg = TINT,
  fg = DEEP,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      backgroundColor: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <Icon style={{ width: size * 0.56, height: size * 0.56, color: fg }} strokeWidth={1.6} />
  </div>
);

const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; paper?: boolean }> = ({ style, children, paper }) => (
  <div
    style={{
      position: 'absolute',
      boxSizing: 'border-box',
      backgroundColor: paper ? PAPER : colors.white,
      border: `2px solid ${paper ? colors.neutral200 : LINE}`,
      borderRadius: paper ? 8 : 22,
      boxShadow: '0 16px 44px rgba(30,40,20,0.08), 0 2px 6px rgba(30,40,20,0.05)',
      ...style,
    }}
  >
    {children}
  </div>
);

// Grey "scribble" lines standing in for body text.
const Lines: React.FC<{ widths: number[]; gap?: number; color?: string }> = ({ widths, gap = 10, color = '#E6EBE1' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {widths.map((w, i) => (
      <div key={i} style={{ height: 7, width: w, borderRadius: 4, backgroundColor: color }} />
    ))}
  </div>
);

const Title: React.FC<{ t: number; at: number; children: React.ReactNode; label?: string; top?: number; size?: number }> = ({
  t,
  at,
  children,
  label,
  top = 80,
  size = 60,
}) => (
  <div style={{ position: 'absolute', left: 80, right: 80, top, ...rise(t, at, 16) }}>
    {label && <Label style={{ marginBottom: 12 }}>{label}</Label>}
    <div style={{ fontFamily: SERIF, fontSize: size, lineHeight: 1.15, letterSpacing: '-0.02em', color: INK }}>{children}</div>
  </div>
);

// The agent: a lime token with a bolt.
const AgentToken: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 64, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: LIME,
      boxShadow: `0 0 0 ${size * 0.14}px rgba(102,198,28,0.18)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    <BoltIcon style={{ width: size * 0.5, height: size * 0.5, color: colors.white }} strokeWidth={2} />
  </div>
);

const Check: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 40, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: LIME,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}
  >
    <CheckIcon style={{ width: size * 0.6, height: size * 0.6, color: colors.white }} strokeWidth={3} />
  </div>
);

const Cross: React.FC<{ size?: number; style?: React.CSSProperties }> = ({ size = 40, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#E9ECE6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      ...style,
    }}
  >
    <XMarkIcon style={{ width: size * 0.6, height: size * 0.6, color: MUTED }} strokeWidth={3} />
  </div>
);

// Mini Build Plan document (used in several scenes).
const MiniPlan: React.FC<{ style?: React.CSSProperties; scale?: number; highlight?: number }> = ({ style, scale = 1, highlight }) => (
  <Card paper style={{ width: 300 * scale, height: 380 * scale, padding: 26 * scale, ...style }}>
    <div style={{ fontFamily: SANS, fontSize: 12 * scale, fontWeight: 600, letterSpacing: '0.14em', color: colors.neutral600 }}>MY AGENT</div>
    <div style={{ fontFamily: SERIF, fontSize: 28 * scale, color: INK, marginBottom: 18 * scale }}>Build Plan</div>
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 * scale, marginBottom: 16 * scale }}>
        <div
          style={{
            width: 22 * scale,
            height: 22 * scale,
            borderRadius: 11 * scale,
            border: `2px solid ${highlight === i ? LIME : '#D5DAD0'}`,
            fontFamily: SANS,
            fontSize: 11 * scale,
            fontWeight: 700,
            color: highlight === i ? DEEP : MUTED,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {i + 1}
        </div>
        <div style={{ height: 8 * scale, width: (150 - i * 12) * scale, borderRadius: 4, backgroundColor: highlight === i ? HL : '#E3E8DE' }} />
      </div>
    ))}
  </Card>
);

// Mini CODO instructions document.
const MiniCodo: React.FC<{ style?: React.CSSProperties; scale?: number }> = ({ style, scale = 1 }) => (
  <Card style={{ width: 300 * scale, height: 380 * scale, padding: 24 * scale, border: `3px solid ${LIME}`, ...style }}>
    <div style={{ fontFamily: SANS, fontSize: 12 * scale, fontWeight: 600, letterSpacing: '0.14em', color: DEEP }}>AGENT INSTRUCTIONS</div>
    {['C', 'O', 'D', 'O'].map((l, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 * scale, marginTop: 18 * scale }}>
        <div style={{ fontFamily: SERIF, fontSize: 40 * scale, color: LIME, width: 32 * scale, lineHeight: 1 }}>{l}</div>
        <Lines widths={[160 * scale, 110 * scale]} gap={7 * scale} />
      </div>
    ))}
  </Card>
);

// ── the iceberg ────────────────────────────────────────────────────────────
// Above the waterline: the Build Plan. Below: what you know but never wrote down.
const WATERLINE = 520;
const Iceberg: React.FC<{
  t: number;
  tipAt: number;
  waterAt: number;
  depthAt: number;
  cx?: number;
  depthLabel?: React.ReactNode;
  depthLabelAt?: number;
  children?: React.ReactNode;
}> = ({ t, tipAt, waterAt, depthAt, cx = 1260, depthLabel, depthLabelAt, children }) => {
  const water = prog(t, waterAt, 1.0, IN_OUT);
  const depth = prog(t, depthAt, 0.9);
  return (
    <>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {/* water */}
        <rect x={0} y={WATERLINE} width={1920 * water} height={1080 - WATERLINE} fill={WATER} />
        <line x1={0} y1={WATERLINE} x2={1920 * water} y2={WATERLINE} stroke="#B9D6D3" strokeWidth={3} />
        {/* underwater mass */}
        <path
          d={`M${cx - 120} ${WATERLINE} L${cx - 330} ${WATERLINE + 170} L${cx - 250} ${WATERLINE + 330} L${cx - 40} ${WATERLINE + 420} L${cx + 260} ${WATERLINE + 360} L${cx + 360} ${WATERLINE + 180} L${cx + 130} ${WATERLINE} Z`}
          fill={WATER_DEEP}
          stroke="#A9CBC7"
          strokeWidth={3}
          strokeLinejoin="round"
          opacity={depth}
        />
        {/* tip */}
        <path
          d={`M${cx - 130} ${WATERLINE} L${cx - 40} ${WATERLINE - 210} L${cx + 30} ${WATERLINE - 170} L${cx + 140} ${WATERLINE} Z`}
          fill={colors.white}
          stroke="#B9C9C4"
          strokeWidth={3}
          strokeLinejoin="round"
          opacity={prog(t, tipAt, 0.6)}
        />
      </svg>
      {/* plan on the tip */}
      <div style={{ position: 'absolute', left: cx - 70, top: WATERLINE - 150, ...pop(t, tipAt + 0.2) }}>
        <MiniPlan scale={0.36} />
      </div>
      {depthLabel && (
        <div
          style={{
            position: 'absolute',
            left: cx - 250,
            width: 500,
            top: WATERLINE + 220,
            textAlign: 'center',
            fontFamily: SERIF,
            fontSize: 32,
            lineHeight: 1.25,
            color: '#2E5A55',
            ...rise(t, depthLabelAt ?? depthAt, 14),
          }}
        >
          {depthLabel}
        </div>
      )}
      {children}
    </>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// Scenes. Each receives t = VO seconds.
// ═══════════════════════════════════════════════════════════════════════════

// 1 — "You've now created your first agent. But before we start filling in its instructions, reflect on
// this: prompting AI is a lot like delegating work to a capable colleague."
const S1: React.FC<{ t: number }> = ({ t }) => {
  const move = prog(t, 5.6, 0.9, IN_OUT);
  const cursorOn = Math.floor(t * 2) % 2 === 0;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: interpolate(move, [0, 1], [660, 120]),
          top: 290,
          transform: `scale(${interpolate(move, [0, 1], [1, 0.8])})`,
          transformOrigin: 'left center',
          opacity: dim(t, 6.9, 0.35),
        }}
      >
        <Card style={{ position: 'relative', width: 600, padding: 40, ...pop(t, 0.2) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            <AgentToken size={76} />
            <div>
              <div style={{ fontFamily: SERIF, fontSize: 38, color: INK }}>My first agent</div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 8,
                  padding: '5px 14px',
                  borderRadius: 20,
                  backgroundColor: TINT,
                  color: DEEP,
                  fontFamily: SANS,
                  fontWeight: 600,
                  fontSize: 18,
                  ...pop(t, 1.66),
                }}
              >
                <CheckIcon style={{ width: 18, height: 18 }} strokeWidth={3} /> Created
              </div>
            </div>
          </div>
          <div style={{ marginTop: 34, ...rise(t, 3.6, 12) }}>
            <Label>Instructions</Label>
            <div
              style={{
                marginTop: 12,
                height: 150,
                borderRadius: 14,
                border: `2px dashed #CFD8C8`,
                padding: '18px 22px',
                fontFamily: SANS,
                fontSize: 22,
                color: '#A7AFA1',
              }}
            >
              <span style={{ borderRight: `3px solid ${cursorOn ? INK : 'transparent'}`, paddingRight: 2 }}>&nbsp;</span>
            </div>
          </div>
        </Card>
      </div>

      {/* delegating analogy */}
      <div style={{ position: 'absolute', left: 760, top: 300, width: 1080 }}>
        <div style={{ fontFamily: SERIF, fontSize: 64, lineHeight: 1.2, letterSpacing: '-0.02em', color: INK, ...rise(t, 6.96, 20) }}>
          Prompting AI is a lot like <Mark t={t} at={8.86}>delegating work</Mark> to a capable colleague.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 56 }}>
          <div style={pop(t, 7.52)}>
            <IconChip Icon={SparklesIcon} size={92} />
          </div>
          <div style={{ height: 4, width: 140 * prog(t, 8.86, 0.8), backgroundColor: LIME, borderRadius: 2 }} />
          <div style={pop(t, 10.04)}>
            <IconChip Icon={UserIcon} size={92} />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 2 — "You wouldn't just tell someone to 'prepare our weekly report' and expect them to automatically
// know exactly how you want it done."
const Q_BUBBLES = [
  { text: 'Which numbers?', at: 15.94, x: 470, y: 250 },
  { text: 'For whom?', at: 16.6, x: 1240, y: 270 },
  { text: 'In what format?', at: 17.2, x: 1290, y: 700 },
  { text: 'By when?', at: 17.74, x: 520, y: 730 },
];
const S2: React.FC<{ t: number }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: 'absolute', left: 80, top: 80, ...rise(t, 11.62) }}>
      <Label>You wouldn't just say</Label>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 660,
        top: 380,
        width: 600,
        height: 300,
        backgroundColor: HL,
        borderRadius: 6,
        boxShadow: '0 22px 50px rgba(60,90,20,0.18)',
        transform: `rotate(-3deg) ${pop(t, 12.9).transform}`,
        opacity: pop(t, 12.9).opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontFamily: SERIF, fontSize: 54, lineHeight: 1.15, color: INK, textAlign: 'center' }}>
        "Prepare our weekly report."
      </div>
    </div>
    {Q_BUBBLES.map((b) => (
      <div
        key={b.text}
        style={{
          position: 'absolute',
          left: b.x,
          top: b.y,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '14px 24px',
          borderRadius: 40,
          backgroundColor: colors.white,
          border: `2px solid ${LINE}`,
          boxShadow: '0 10px 30px rgba(30,40,20,0.08)',
          fontFamily: SANS,
          fontSize: 28,
          color: INK,
          ...pop(t, b.at),
        }}
      >
        <QuestionMarkCircleIcon style={{ width: 32, height: 32, color: MUTED }} strokeWidth={1.8} />
        {b.text}
      </div>
    ))}
  </AbsoluteFill>
);

// 3 — "You'd explain the context, what you're trying to achieve, how you'd approach the work, what to
// watch out for, and what a great result looks like."
const BRIEF = [
  { label: 'Context', text: 'Leadership reads it Monday at 9', at: 19.58 },
  { label: 'Goal', text: 'Spot risks before they grow', at: 20.72 },
  { label: 'Approach', text: "Start from last week's numbers", at: 22.32 },
  { label: 'Watch out for', text: "Don't mix forecast and actuals", at: 23.92 },
  { label: 'Great looks like', text: 'One page, three clear calls', at: 25.46 },
];
const S3: React.FC<{ t: number }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: 'absolute', left: 80, top: 330, width: 560, ...rise(t, 18.9) }}>
      <Label>What you'd explain</Label>
      <div style={{ fontFamily: SERIF, fontSize: 66, lineHeight: 1.12, letterSpacing: '-0.02em', color: INK, marginTop: 14 }}>
        From a one-liner to a <Mark t={t} at={25.9}>real brief</Mark>
      </div>
    </div>
    <Card paper style={{ left: 760, top: 110, width: 1080, height: 800, padding: '44px 56px', ...rise(t, 18.9, 30) }}>
      {/* the sticky note, now the brief's heading */}
      <div
        style={{
          display: 'inline-block',
          backgroundColor: HL,
          padding: '10px 22px',
          transform: 'rotate(-1.5deg)',
          fontFamily: SERIF,
          fontSize: 34,
          color: INK,
          borderRadius: 4,
        }}
      >
        Prepare our weekly report
      </div>
      <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 22 }}>
        {BRIEF.map((r) => (
          <div key={r.label} style={{ display: 'flex', alignItems: 'baseline', gap: 26, paddingBottom: 18, borderBottom: `2px solid ${LINE}`, ...rise(t, r.at, 14) }}>
            <div style={{ width: 260, flexShrink: 0 }}>
              <Label color={DEEP}>{r.label}</Label>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 36, color: INK }}>{r.text}</div>
          </div>
        ))}
      </div>
    </Card>
  </AbsoluteFill>
);

// 4 — "Well, with agents, that becomes even more important because we're not just asking AI to produce
// a single answer anymore. We're giving it responsibility for carrying work forward, potentially making
// decisions and taking actions along the way,"
const STOPS = [
  { label: 'Read notes', at: 37.3, kind: 'dot' },
  { label: 'Check tracker', at: 38.2, kind: 'dot' },
  { label: 'Decide', at: 40.0, kind: 'decide' },
  { label: 'Act', at: 41.3, kind: 'act' },
  { label: 'Hand back', at: 42.1, kind: 'dot' },
];
const S4: React.FC<{ t: number }> = ({ t }) => {
  const trackX0 = 820;
  const trackX1 = 1760;
  const stopX = (i: number) => trackX0 + (i * (trackX1 - trackX0)) / (STOPS.length - 1);
  const run = interpolate(t, [37.2, 42.4], [0, 1], { ...clamp, easing: IN_OUT });
  const leftDim = dim(t, 35.68, 0.3);
  return (
    <AbsoluteFill>
      <Title t={t} at={28.08} label="With agents">
        That becomes <Mark t={t} at={29.72}>even more important</Mark>.
      </Title>
      {/* one answer */}
      <div style={{ position: 'absolute', left: 80, top: 380, width: 560, opacity: leftDim }}>
        <div style={rise(t, 31.6)}>
          <Label>Before</Label>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 22 }}>
          <div style={{ alignSelf: 'flex-end', backgroundColor: TINT, padding: '18px 26px', borderRadius: '22px 22px 6px 22px', fontFamily: SANS, fontSize: 26, color: INK, ...rise(t, 32.4) }}>
            Summarize these notes
          </div>
          <div style={{ alignSelf: 'flex-start', backgroundColor: colors.white, border: `2px solid ${LINE}`, padding: '18px 26px', borderRadius: '22px 22px 22px 6px', ...rise(t, 33.6) }}>
            <Lines widths={[320, 260, 180]} />
          </div>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 40, color: INK, marginTop: 34, ...rise(t, 33.9) }}>A single answer</div>
      </div>
      {/* carrying work forward */}
      <div style={{ position: 'absolute', left: trackX0 - 20, top: 380, ...rise(t, 35.8) }}>
        <Label color={DEEP}>Now</Label>
      </div>
      <div style={{ position: 'absolute', left: trackX0 - 20, top: 422, fontFamily: SERIF, fontSize: 40, color: INK, ...rise(t, 37.46) }}>
        Carrying work forward
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {prog(t, 36.2) > 0 && <line x1={trackX0} y1={640} x2={trackX0 + (trackX1 - trackX0) * prog(t, 36.2, 1.2, IN_OUT)} y2={640} stroke="#DCE3D6" strokeWidth={6} strokeLinecap="round" />}
        {run > 0 && <line x1={trackX0} y1={640} x2={trackX0 + (trackX1 - trackX0) * run} y2={640} stroke={LIME} strokeWidth={6} strokeLinecap="round" />}
      </svg>
      {STOPS.map((s, i) => {
        const reached = run * (STOPS.length - 1) >= i - 0.05;
        const big = s.kind !== 'dot';
        return (
          <div key={s.label} style={{ position: 'absolute', left: stopX(i) - 60, top: 640 - (big ? 40 : 16), width: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', ...pop(t, big ? s.at : 36.6 + i * 0.15) }}>
            {s.kind === 'dot' && <div style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: reached ? LIME : colors.white, border: `4px solid ${reached ? LIME : '#CBD3C4'}`, boxSizing: 'border-box' }} />}
            {s.kind === 'decide' && (
              <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 56, height: 56, transform: 'rotate(45deg)', backgroundColor: reached ? LIME : colors.white, border: `4px solid ${LIME}`, borderRadius: 8, boxSizing: 'border-box' }} />
              </div>
            )}
            {s.kind === 'act' && (
              <div style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: reached ? LIME : colors.white, border: `4px solid ${LIME}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BoltIcon style={{ width: 40, height: 40, color: reached ? colors.white : DEEP }} strokeWidth={2} />
              </div>
            )}
            <div style={{ marginTop: 18, fontFamily: SANS, fontSize: 22, fontWeight: big ? 700 : 400, color: big ? DEEP : MUTED, whiteSpace: 'nowrap' }}>{s.label}</div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: trackX0 - 40 + (trackX1 - trackX0) * run, top: 560, opacity: prog(t, 37.0, 0.4) }}>
        <AgentToken size={80} />
      </div>
    </AbsoluteFill>
  );
};

// 5 — "and that's why we need to give it more than a simple job description."
const EXTRA = ['Context', 'Steps', 'Decision rules', 'Boundaries', 'Output'];
const S5: React.FC<{ t: number }> = ({ t }) => {
  const fan = prog(t, 44.54, 0.9, BACK);
  return (
    <AbsoluteFill>
      {EXTRA.map((e, i) => {
        const angle = (i - 2) * 9 * fan;
        const dx = (i - 2) * 190 * fan;
        return (
          <Card
            key={e}
            style={{
              left: 760 + dx,
              top: 260 - fan * 30,
              width: 400,
              height: 300,
              padding: 30,
              transform: `rotate(${angle}deg)`,
              transformOrigin: 'center 160%',
              opacity: prog(t, 44.54, 0.3),
              border: `2px solid ${LIME}`,
            }}
          >
            <Label color={DEEP}>{e}</Label>
            <div style={{ marginTop: 22 }}>
              <Lines widths={[300, 260, 280, 200]} />
            </div>
          </Card>
        );
      })}
      <Card style={{ left: 760, top: 300, width: 400, height: 300, padding: 34, ...pop(t, 42.96) }}>
        <Label>Job description</Label>
        <div style={{ fontFamily: SERIF, fontSize: 34, color: INK, marginTop: 18, lineHeight: 1.2 }}>Team follow-up assistant</div>
        <div style={{ marginTop: 22 }}>
          <Lines widths={[240, 160]} />
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 780, textAlign: 'center', fontFamily: SERIF, fontSize: 62, letterSpacing: '-0.02em', color: INK, ...rise(t, 44.3) }}>
        Give it <Mark t={t} at={44.54}>more than</Mark> a simple job description.
      </div>
    </AbsoluteFill>
  );
};

// 6 — "Fortunately, you've already done most of the hard thinking in your agent build plan. Now we'll turn
// that plan into detailed instructions using CODO, and we'll let AI help us uncover any important details
// we might have missed."
// Lays out exactly where scene 7 (the diagram) starts: plan document left, four empty slots right.
const PLAN_ROWS = ['The work and the result', 'Steps and who does them', 'What it needs', 'Where you stay in control', 'The first version'];
const S6: React.FC<{ t: number }> = ({ t }) => {
  const docIn = prog(t, 47.1, 0.9, BACK);
  const slots = prog(t, 55.2, 0.6);
  const ai = prog(t, 56.88, 0.6, BACK);
  const TILES_X = 812;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 80, top: 70, ...rise(t, 47.1, 14) }}>
        <Label>Fortunately</Label>
        <div style={{ fontFamily: SERIF, fontSize: 64, letterSpacing: '-0.04em', color: INK, marginTop: 10 }}>
          You've already done the <Mark t={t} at={49.4}>hard thinking</Mark>
        </div>
      </div>
      {/* the plan, same spot as in the diagram */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: 250,
          width: 560,
          height: 690,
          boxSizing: 'border-box',
          backgroundColor: PAPER,
          border: `2px solid ${colors.neutral200}`,
          borderRadius: 6,
          boxShadow: '0 18px 50px rgba(30,40,20,0.10), 0 2px 6px rgba(30,40,20,0.06)',
          transform: `translateY(${(1 - docIn) * 60}px) rotate(${(1 - docIn) * -4 - 0.6}deg)`,
          opacity: Math.min(1, docIn * 2),
          padding: '34px 40px',
        }}
      >
        <div style={{ position: 'absolute', right: -2, top: -2, width: 54, height: 54, background: `linear-gradient(225deg, ${colors.white} 50%, #E9EDE4 50%)` }} />
        <div style={{ fontFamily: SANS, fontSize: 16, fontWeight: 600, letterSpacing: '0.14em', color: colors.neutral600 }}>MY AGENT</div>
        <div style={{ fontFamily: SERIF, fontSize: 40, color: INK, marginTop: 4 }}>Build Plan</div>
      </div>
      {PLAN_ROWS.map((label, i) => (
        <div key={label} style={{ position: 'absolute', left: 120, top: 380 + i * 104, width: 480, opacity: prog(t, 47.6 + i * 0.12, 0.4) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, border: '2px solid #D5DAD0', boxSizing: 'border-box', color: colors.neutral600, fontFamily: SANS, fontWeight: 700, fontSize: 19, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {i + 1}
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 31, color: INK }}>{label}</div>
          </div>
          <div style={{ marginLeft: 58, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ height: 5, width: 300 - i * 18, borderRadius: 3, backgroundColor: '#E8ECE3' }} />
            <div style={{ height: 5, width: 200 + i * 14, borderRadius: 3, backgroundColor: '#E8ECE3' }} />
          </div>
        </div>
      ))}
      {/* turn it into CODO */}
      <div style={{ position: 'absolute', left: TILES_X, top: 250, opacity: slots }}>
        <Label color={DEEP}>Detailed instructions using CODO</Label>
      </div>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: TILES_X + i * 264,
            top: 380,
            width: 236,
            height: 270,
            boxSizing: 'border-box',
            borderRadius: 22,
            border: '3px dashed #CBD5C2',
            opacity: prog(t, 55.2 + i * 0.12, 0.4),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: SERIF,
            fontSize: 150,
            color: '#E3EADB',
          }}
        >
          {'CODO'[i]}
        </div>
      ))}
      {/* AI helps uncover missed details */}
      <div style={{ position: 'absolute', left: 1220, top: 720, display: 'flex', alignItems: 'center', gap: 18, opacity: ai, transform: `scale(${0.7 + 0.3 * ai})`, transformOrigin: 'left center' }}>
        <IconChip Icon={MagnifyingGlassIcon} size={70} bg={LIME} fg={colors.white} />
        <div style={{ fontFamily: SERIF, fontSize: 34, color: INK, lineHeight: 1.2 }}>
          AI helps uncover
          <br />
          what you <Mark t={t} at={60.0}>might have missed</Mark>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 7 — Build Plan → CODO (see BuildPlanCodoDiagram). Frames are local to 60.9s.
const S7: React.FC<{ t: number }> = () => (
  <BuildPlanCodoDiagram skipEntry sectionFrames={[64, 389, 544, 925]} codoFrames={[321, 343, 843, 1130]} allFrame={1169} />
);

// 8 — "But here's where things get interesting. Your build plan is deliberately high level. It doesn't
// necessarily include all the knowledge and experience you use when you perform this work yourself."
const S8: React.FC<{ t: number }> = ({ t }) => (
  <AbsoluteFill>
    <Iceberg
      t={t}
      tipAt={103.0}
      waterAt={108.18}
      depthAt={109.3}
      depthLabel={
        <>
          The <Mark t={t} at={110.24} color="#BFE3DE">knowledge and experience</Mark> you use when you do the work yourself
        </>
      }
      depthLabelAt={110.0}
    />
    <div style={{ position: 'absolute', left: 80, top: 160, width: 640, ...rise(t, 102.72) }}>
      <Label>Here's where it gets interesting</Label>
      <div style={{ fontFamily: SERIF, fontSize: 60, lineHeight: 1.15, letterSpacing: '-0.02em', color: INK, marginTop: 14 }}>
        Your Build Plan is deliberately <Mark t={t} at={106.4}>high-level</Mark>.
      </div>
    </div>
    <div style={{ position: 'absolute', left: 1500, top: WATERLINE - 120, ...rise(t, 105.4) }}>
      <Label color={DEEP}>Written down</Label>
    </div>
    <div style={{ position: 'absolute', left: 1580, top: WATERLINE + 40, ...rise(t, 108.6) }}>
      <Label color="#2E5A55">Not written down</Label>
    </div>
  </AbsoluteFill>
);

// 9 — "For example, my team follow-up agent needs to compare meeting commitments with an existing action
// tracker. But how does it recognize when two commitments are actually the same task, even when they're
// worded differently?"
const S9: React.FC<{ t: number }> = ({ t }) => {
  const link = prog(t, 122.14, 0.8, IN_OUT);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 80, top: 80, display: 'flex', alignItems: 'center', gap: 22, ...rise(t, 114.3) }}>
        <AgentToken size={64} />
        <div>
          <Label>Example</Label>
          <div style={{ fontFamily: SERIF, fontSize: 48, color: INK, marginTop: 4 }}>Team Follow-Up Agent</div>
        </div>
      </div>
      {/* meeting notes */}
      <Card paper style={{ left: 80, top: 300, width: 760, height: 520, padding: 40, ...rise(t, 117.48, 30) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <IconChip Icon={DocumentTextIcon} />
          <div style={{ fontFamily: SERIF, fontSize: 34, color: INK }}>Meeting notes</div>
        </div>
        <div style={{ marginTop: 34 }}>
          <Lines widths={[560, 480]} />
        </div>
        <div style={{ marginTop: 30, padding: '16px 20px', borderRadius: 12, backgroundColor: prog(t, 122.14) > 0.5 ? TINT : 'transparent', border: `2px solid ${prog(t, 122.14) > 0.5 ? LIME : 'transparent'}` }}>
          <div style={{ fontFamily: SERIF, fontSize: 32, color: INK, lineHeight: 1.3 }}>
            "Taylor will <Mark t={t} at={125.44}>get the customer update out</Mark> by Friday."
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <Lines widths={[520, 420, 300]} />
        </div>
      </Card>
      {/* action tracker */}
      <Card style={{ left: 1080, top: 300, width: 760, height: 520, padding: 40, ...rise(t, 118.62, 30) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <IconChip Icon={TableCellsIcon} />
          <div style={{ fontFamily: SERIF, fontSize: 34, color: INK }}>Action tracker</div>
        </div>
        <div style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '1fr 140px 110px', rowGap: 0, fontFamily: SANS, fontSize: 24, color: INK }}>
          {['Task', 'Owner', 'Due'].map((h) => (
            <div key={h} style={{ padding: '10px 0', borderBottom: `2px solid ${LINE}`, color: MUTED, fontSize: 18, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {h}
            </div>
          ))}
          {[
            ['Q3 budget review', 'Chris', 'Thu'],
            ['Customer update email', 'Taylor', 'Fri'],
            ['Hiring plan draft', 'Sam', 'Mon'],
          ].map((row, r) =>
            row.map((c, k) => (
              <div
                key={`${r}-${k}`}
                style={{
                  padding: '16px 0',
                  borderBottom: `2px solid ${LINE}`,
                  backgroundColor: r === 1 && prog(t, 122.14) > 0.5 ? TINT : 'transparent',
                  fontWeight: r === 1 && k === 0 ? 600 : 400,
                }}
              >
                {r === 1 && k === 0 ? <Mark t={t} at={125.6}>{c}</Mark> : c}
              </div>
            ))
          )}
        </div>
      </Card>
      {/* same task? */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <path d="M840 560 C 960 560, 960 520, 1080 520" fill="none" stroke={LIME} strokeWidth={4} strokeDasharray="12 10" strokeDashoffset={0} opacity={link} />
      </svg>
      <div
        style={{
          position: 'absolute',
          left: 880,
          top: 470,
          width: 160,
          height: 160,
          borderRadius: 80,
          backgroundColor: LIME,
          color: colors.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: SERIF,
          fontSize: 30,
          textAlign: 'center',
          lineHeight: 1.1,
          boxShadow: '0 16px 40px rgba(102,198,28,0.35)',
          ...pop(t, 123.5),
        }}
      >
        Same
        <br />
        task?
      </div>
    </AbsoluteFill>
  );
};

// 10 — "That's the kind of judgment I might make automatically without ever thinking to explain it, and
// that's exactly the knowledge we want to capture before we give this work to an agent."
const S10: React.FC<{ t: number }> = ({ t }) => {
  const sink = prog(t, 127.3, 1.4, IN_OUT);
  const lasso = prog(t, 133.18, 1.0, IN_OUT);
  const cx = 1260;
  return (
    <AbsoluteFill>
      <Iceberg t={t} tipAt={126.0} waterAt={126.0} depthAt={126.0} />
      {/* the judgment drops below the waterline */}
      <div
        style={{
          position: 'absolute',
          left: cx - 150,
          top: interpolate(sink, [0, 1], [150, WATERLINE + 160]),
          width: 300,
          padding: '18px 22px',
          boxSizing: 'border-box',
          borderRadius: 18,
          backgroundColor: colors.white,
          border: `3px solid ${LIME}`,
          textAlign: 'center',
          fontFamily: SERIF,
          fontSize: 30,
          color: INK,
          boxShadow: '0 12px 30px rgba(30,40,20,0.10)',
          opacity: prog(t, 126.84, 0.4),
        }}
      >
        Same task?
        <div style={{ fontFamily: SANS, fontSize: 18, color: MUTED, marginTop: 6 }}>your judgment call</div>
      </div>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <ellipse
          cx={cx}
          cy={WATERLINE + 210}
          rx={230}
          ry={110}
          fill="none"
          stroke={LIME}
          strokeWidth={5}
          strokeDasharray={1100}
          strokeDashoffset={1100 * (1 - lasso)}
          transform={`rotate(-4 ${cx} ${WATERLINE + 210})`}
        />
      </svg>
      <div style={{ position: 'absolute', left: cx + 200, top: WATERLINE + 300, ...pop(t, 134.08) }}>
        <div style={{ padding: '10px 20px', borderRadius: 24, backgroundColor: LIME, color: colors.white, fontFamily: SANS, fontWeight: 700, fontSize: 22 }}>
          Capture this
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 160, width: 680, ...rise(t, 126.84) }}>
        <div style={{ fontFamily: SERIF, fontSize: 56, lineHeight: 1.18, letterSpacing: '-0.02em', color: INK }}>
          Judgment you make <Mark t={t} at={128.78}>automatically</Mark>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1.25, color: MUTED, marginTop: 26, ...rise(t, 131.98) }}>
          is exactly the knowledge to capture before you hand the work to an agent.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 11 — "Now, you could take your build plan and write all those CODO instructions yourself, but there's a
// much easier way. You can use AI to help you do it. We've prepared an agent instructions builder prompt
// that you'll find in the exercise below this video."
const S11: React.FC<{ t: number }> = ({ t }) => {
  const write = prog(t, 139.2, 2.6, Easing.linear);
  const away = prog(t, 142.4, 0.8, IN_OUT);
  const penX = 640 + (write * 4 % 1) * 420;
  const penY = 470 + Math.floor(Math.min(write * 4, 3.99)) * 56;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 80, top: 80, ...rise(t, 137.3) }}>
        <Label>Use AI to build your instructions</Label>
      </div>
      {/* writing it yourself */}
      <div style={{ opacity: 1 - away * 0.75, transform: `translateX(${-away * 380}px) scale(${1 - away * 0.25})`, transformOrigin: 'left center' }}>
        <Card paper style={{ left: 560, top: 300, width: 600, height: 560, padding: 50, ...rise(t, 137.5, 30) }}>
          <div style={{ fontFamily: SERIF, fontSize: 34, color: INK }}>Agent instructions</div>
          <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 49 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ height: 7, borderRadius: 4, backgroundColor: '#D6DDD0', width: 420 * Math.max(0, Math.min(1, write * 4 - i)) }} />
            ))}
          </div>
        </Card>
        <div style={{ position: 'absolute', left: penX, top: penY - 50, opacity: prog(t, 139.0, 0.3) * (1 - away) }}>
          <PencilIcon style={{ width: 56, height: 56, color: INK }} strokeWidth={1.6} />
        </div>
        <div style={{ position: 'absolute', left: 560, top: 890, fontFamily: SERIF, fontSize: 34, color: MUTED, ...rise(t, 139.3) }}>Write it all yourself…</div>
      </div>
      {/* the easier way */}
      <div style={{ position: 'absolute', left: 80, top: 140, fontFamily: SERIF, fontSize: 60, letterSpacing: '-0.02em', color: INK, ...rise(t, 142.5) }}>
        …or let <Mark t={t} at={145.04}>AI help you do it</Mark>.
      </div>
      <Card style={{ left: 900, top: 290, width: 860, height: 540, padding: 48, border: `3px solid ${LIME}`, ...rise(t, 146.7, 40) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <IconChip Icon={SparklesIcon} size={64} bg={LIME} fg={colors.white} />
          <div>
            <Label color={DEEP}>Prompt</Label>
            <div style={{ fontFamily: SERIF, fontSize: 46, color: INK, marginTop: 4 }}>Agent Instructions Builder</div>
          </div>
        </div>
        <div style={{ marginTop: 40, fontFamily: 'monospace', fontSize: 22, color: MUTED, lineHeight: 1.7 }}>
          You are helping me turn my Agent Build Plan
          <br />
          into detailed CODO instructions…
        </div>
        <div style={{ marginTop: 26 }}>
          <Lines widths={[620, 560, 400]} />
        </div>
      </Card>
      <div
        style={{
          position: 'absolute',
          left: 1100,
          top: 870,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '14px 26px',
          borderRadius: 40,
          backgroundColor: INK,
          color: colors.white,
          fontFamily: SANS,
          fontSize: 26,
          fontWeight: 600,
          ...pop(t, 150.3),
        }}
      >
        <ArrowDownIcon style={{ width: 28, height: 28, transform: `translateY(${Math.sin(t * 6) * 3}px)` }} strokeWidth={2.4} />
        In the exercise below this video
      </div>
    </AbsoluteFill>
  );
};

// 12 — "Simply give AI our prompt, along with your completed agent build plan, and let it help you turn
// that plan into detailed CODO instructions."
const S12: React.FC<{ t: number }> = ({ t }) => {
  const spin = (t - 152) * 40;
  const pulse = 1 + Math.sin(t * 5) * 0.03 * prog(t, 157.2);
  return (
    <AbsoluteFill>
      <Title t={t} at={152.54} label="How it works">
        Plan + prompt, <Mark t={t} at={159.82}>CODO</Mark> instructions out
      </Title>
      {/* prompt card */}
      <Card style={{ left: 100, top: 400, width: 300, height: 380, padding: 28, border: `3px solid ${LIME}`, ...rise(t, 153.8, 40) }}>
        <IconChip Icon={SparklesIcon} size={56} bg={LIME} fg={colors.white} />
        <div style={{ fontFamily: SERIF, fontSize: 30, color: INK, marginTop: 20, lineHeight: 1.2 }}>Agent Instructions Builder</div>
        <div style={{ marginTop: 22 }}>
          <Lines widths={[220, 190, 230, 150]} />
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 430, top: 540, fontFamily: SERIF, fontSize: 90, color: MUTED, ...pop(t, 154.5) }}>+</div>
      <MiniPlan style={{ left: 530, top: 400, ...rise(t, 155.06, 40) }} />
      {/* arrow into AI */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <line x1={860} y1={590} x2={860 + 140 * prog(t, 157.18, 0.6)} y2={590} stroke={LIME} strokeWidth={6} strokeLinecap="round" />
        <line x1={1260} y1={590} x2={1260 + 140 * prog(t, 159.3, 0.5)} y2={590} stroke={LIME} strokeWidth={6} strokeLinecap="round" />
      </svg>
      <div style={{ position: 'absolute', left: 1030, top: 460, width: 200, height: 260, ...pop(t, 157.18) }}>
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            background: `conic-gradient(from ${spin}deg, ${LIME}, ${HL}, ${LIME})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${pulse})`,
          }}
        >
          <div style={{ width: 160, height: 160, borderRadius: 80, backgroundColor: colors.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <SparklesIcon style={{ width: 80, height: 80, color: DEEP }} strokeWidth={1.4} />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <Label color={DEEP}>AI</Label>
        </div>
      </div>
      <MiniCodo style={{ left: 1440, top: 400, ...pop(t, 159.82) }} />
    </AbsoluteFill>
  );
};

// 13 — "And it's important to note that we're not simply asking AI to make our build plan longer. We're
// asking it to help us uncover the knowledge and experience that we might have forgotten to include."
const S13: React.FC<{ t: number }> = ({ t }) => {
  const stretch = prog(t, 164.6, 1.4, IN_OUT) * 0.75;
  const leftDim = dim(t, 166.78, 0.3);
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 80, top: 80, display: 'flex', alignItems: 'center', gap: 16, ...fade(rise(t, 161.7), leftDim) }}>
        <Cross size={44} />
        <div style={{ fontFamily: SERIF, fontSize: 48, color: INK }}>
          Not a <Mark t={t} at={165.84}>longer</Mark> Build Plan
        </div>
      </div>
      <div style={{ opacity: leftDim }}>
        <Card paper style={{ left: 240, top: 200, width: 300, height: 380 + stretch * 420, padding: 26, overflow: 'hidden', ...rise(t, 162.0, 30) }}>
          <div style={{ fontFamily: SERIF, fontSize: 28, color: INK, marginBottom: 20 }}>Build Plan</div>
          <Lines widths={Array.from({ length: 6 + Math.round(stretch * 18) }, (_, i) => 200 + ((i * 53) % 50))} gap={14} />
        </Card>
      </div>
      {/* uncover */}
      <div style={{ position: 'absolute', left: 820, top: 80, display: 'flex', alignItems: 'center', gap: 16, ...rise(t, 166.78) }}>
        <Check size={44} />
        <div style={{ fontFamily: SERIF, fontSize: 48, color: INK }}>
          Uncover what you <Mark t={t} at={170.84}>forgot to include</Mark>
        </div>
      </div>
      <div style={{ opacity: prog(t, 166.78, 0.6) }}>
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
          <rect x={820} y={WATERLINE} width={1020} height={1080 - WATERLINE} fill={WATER} />
          <line x1={820} y1={WATERLINE} x2={1840} y2={WATERLINE} stroke="#B9D6D3" strokeWidth={3} />
          <path d={`M1210 ${WATERLINE} L1300 ${WATERLINE - 180} L1360 ${WATERLINE - 140} L1450 ${WATERLINE} Z`} fill={colors.white} stroke="#B9C9C4" strokeWidth={3} strokeLinejoin="round" />
          <path
            d={`M1200 ${WATERLINE} L1010 ${WATERLINE + 150} L1080 ${WATERLINE + 300} L1300 ${WATERLINE + 380} L1580 ${WATERLINE + 320} L1680 ${WATERLINE + 160} L1460 ${WATERLINE} Z`}
            fill={WATER_DEEP}
            stroke="#A9CBC7"
            strokeWidth={3}
            strokeLinejoin="round"
          />
        </svg>
        {/* the AI's light sweeping the hidden part */}
        <div
          style={{
            position: 'absolute',
            left: interpolate(t, [168.1, 172.0], [1000, 1480], clamp),
            top: WATERLINE + 120,
            width: 220,
            height: 220,
            borderRadius: 110,
            background: `radial-gradient(circle, rgba(208,248,171,0.95) 0%, rgba(208,248,171,0.0) 70%)`,
            opacity: prog(t, 168.1, 0.5),
          }}
        />
        {[
          { text: 'how you decide', x: 1070, y: WATERLINE + 140, at: 168.6 },
          { text: 'exceptions', x: 1380, y: WATERLINE + 110, at: 169.4 },
          { text: 'what good looks like', x: 1200, y: WATERLINE + 240, at: 170.2 },
        ].map((c) => (
          <div key={c.text} style={{ position: 'absolute', left: c.x, top: c.y, padding: '8px 16px', borderRadius: 20, backgroundColor: colors.white, border: `2px solid ${LIME}`, fontFamily: SANS, fontSize: 22, color: INK, ...pop(t, c.at) }}>
            {c.text}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// 14 — "So before writing the final instructions, the AI will ask you a few questions about how you
// approach the work, make decisions, handle exceptions, and recognize a good result, and that's where the
// real value comes in."
const QUESTIONS = [
  { text: 'How do you approach this work today?', at: 177.52 },
  { text: 'How do you make the key decisions?', at: 179.08 },
  { text: 'How do you handle exceptions?', at: 180.2 },
  { text: 'How do you recognize a good result?', at: 181.62 },
];
const S14: React.FC<{ t: number }> = ({ t }) => {
  // the thread scrolls up a little as questions arrive
  const scroll = interpolate(t, [177.3, 182.0], [0, 120], { ...clamp, easing: IN_OUT });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 80, top: 300, width: 560, ...rise(t, 172.6) }}>
        <Label>Before writing anything</Label>
        <div style={{ fontFamily: SERIF, fontSize: 64, lineHeight: 1.12, letterSpacing: '-0.02em', color: INK, marginTop: 14 }}>
          The AI asks <Mark t={t} at={176.42}>you</Mark> a few questions
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 38, color: DEEP, marginTop: 40, ...rise(t, 184.4) }}>That's where the real value is.</div>
      </div>
      <Card style={{ left: 760, top: 90, width: 1080, height: 860, overflow: 'hidden', padding: 0, ...rise(t, 172.4, 30) }}>
        <div style={{ position: 'relative', zIndex: 2, backgroundColor: colors.white, display: 'flex', alignItems: 'center', gap: 14, padding: '22px 32px', borderBottom: `2px solid ${LINE}` }}>
          <IconChip Icon={SparklesIcon} size={44} bg={LIME} fg={colors.white} />
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: INK }}>Agent Instructions Builder</div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 18, transform: `translateY(${-scroll}px)` }}>
          <div style={{ alignSelf: 'flex-end', maxWidth: 640, backgroundColor: TINT, padding: '18px 24px', borderRadius: '22px 22px 6px 22px', fontFamily: SANS, fontSize: 24, color: INK, ...rise(t, 172.8, 12) }}>
            Here's my completed Build Plan.
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12, padding: '10px 14px', borderRadius: 10, backgroundColor: colors.white, border: `2px solid ${LINE}`, fontSize: 20 }}>
              <DocumentTextIcon style={{ width: 24, height: 24, color: DEEP }} strokeWidth={1.8} /> My Agent Build Plan
            </div>
          </div>
          <div style={{ alignSelf: 'flex-start', maxWidth: 760, backgroundColor: colors.white, border: `2px solid ${LINE}`, padding: '18px 24px', borderRadius: '22px 22px 22px 6px', fontFamily: SANS, fontSize: 24, color: INK, ...rise(t, 175.14, 12) }}>
            Before I write your instructions, a few questions:
          </div>
          {QUESTIONS.map((q, i) => (
            <div
              key={q.text}
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                backgroundColor: colors.white,
                border: `2px solid ${LIME}`,
                padding: '16px 24px',
                borderRadius: '22px 22px 22px 6px',
                fontFamily: SERIF,
                fontSize: 32,
                color: INK,
                ...rise(t, q.at, 14),
              }}
            >
              <span style={{ fontFamily: SANS, fontWeight: 700, fontSize: 20, color: DEEP }}>{i + 1}</span>
              {q.text}
            </div>
          ))}
        </div>
      </Card>
    </AbsoluteFill>
  );
};

// 15 — "Because AI shouldn't invent how your workflow operates, it should help you explain how you want it
// to operate."
const S15: React.FC<{ t: number }> = ({ t }) => {
  const swap = prog(t, 189.58, 0.6);
  return (
    <AbsoluteFill>
      <Card style={{ left: 120, top: 250, width: 780, height: 520, padding: 56, ...fade(rise(t, 186.04, 30), 1 - swap * 0.65) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Cross size={52} />
          <Label>AI shouldn't</Label>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 56, lineHeight: 1.15, color: INK, marginTop: 30, textDecoration: swap > 0.5 ? 'line-through' : 'none', textDecorationColor: MUTED }}>
          Invent how your workflow operates
        </div>
        <div style={{ position: 'absolute', right: 50, bottom: 50, ...pop(t, 187.16) }}>
          <QuestionMarkCircleIcon style={{ width: 90, height: 90, color: '#CDD5C7' }} strokeWidth={1.2} />
        </div>
      </Card>
      <Card style={{ left: 1020, top: 250, width: 780, height: 520, padding: 56, border: `3px solid ${LIME}`, ...rise(t, 189.58, 30) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Check size={52} />
          <Label color={DEEP}>It should</Label>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 56, lineHeight: 1.15, color: INK, marginTop: 30 }}>
          Help you <Mark t={t} at={190.3}>explain</Mark> how you want it to operate
        </div>
        <div style={{ position: 'absolute', right: 50, bottom: 50, ...pop(t, 190.94) }}>
          <ChatBubbleLeftRightIcon style={{ width: 90, height: 90, color: LIME }} strokeWidth={1.2} />
        </div>
      </Card>
    </AbsoluteFill>
  );
};

// 16 — Section: "Let's look at what that might mean for our example agent. Take our team follow-up agent
// as an example."
const S16: React.FC<{ t: number }> = ({ t }) => (
  <AbsoluteFill style={{ backgroundColor: colors.titleGreen }}>
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
      <rect x={0} y={640} width={1920 * prog(t, 193.2, 1.0, IN_OUT)} height={440} fill="rgba(255,255,255,0.08)" />
      <path d="M1400 640 L1480 470 L1540 510 L1620 640 Z" fill="rgba(255,255,255,0.9)" opacity={prog(t, 193.6, 0.6)} />
      <path d="M1390 640 L1220 790 L1290 950 L1500 1020 L1750 950 L1830 790 L1630 640 Z" fill="rgba(255,255,255,0.18)" opacity={prog(t, 194.2, 0.8)} />
    </svg>
    <div style={{ position: 'absolute', left: 120, top: 300, width: 1100 }}>
      <div style={{ ...rise(t, 196.0) }}>
        <Label color={HL}>Example: Team Follow-Up Agent</Label>
      </div>
      <div style={{ fontFamily: SERIF, fontSize: 96, lineHeight: 1.08, letterSpacing: '-0.03em', color: colors.white, marginTop: 20, ...rise(t, 193.1, 20) }}>
        Uncovering your tacit knowledge
      </div>
    </div>
    <LogoFooter variant="light" />
  </AbsoluteFill>
);

// 17 — "The build plan says the agent should identify possible duplicates when comparing meeting
// commitments with an existing action tracker. But what exactly makes two commitments duplicates?"
const S17: React.FC<{ t: number }> = ({ t }) => {
  const shift = prog(t, 206.2, 0.8, IN_OUT);
  return (
    <AbsoluteFill>
      <div style={{ transform: `translateY(${-shift * 150}px)`, opacity: 1 - shift * 0.4 }}>
        <div style={{ position: 'absolute', left: 260, top: 230, ...rise(t, 198.84) }}>
          <Label>The Build Plan says</Label>
        </div>
        <Card paper style={{ left: 260, top: 290, width: 1400, padding: '44px 56px', ...rise(t, 198.84, 24) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, border: `2px solid ${LIME}`, boxSizing: 'border-box', color: DEEP, fontFamily: SANS, fontWeight: 700, fontSize: 19, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
            <Label>The agent can do independently</Label>
          </div>
          <div style={{ fontFamily: SERIF, fontSize: 44, lineHeight: 1.35, color: INK }}>
            Read information, compare commitments, <Mark t={t} at={201.42}>identify possible duplicates</Mark>, and prepare follow-ups.
          </div>
        </Card>
      </div>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 640, textAlign: 'center', ...rise(t, 206.5, 30) }}>
        <div style={{ fontFamily: SERIF, fontSize: 72, letterSpacing: '-0.02em', color: INK }}>
          What exactly makes two commitments <Lime t={t} at={208.74}>duplicates</Lime>?
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 18 — "Perhaps you compare the substance of the task and its owner rather than looking for identical
// wording, and if the deadline changes, you'd consider that an update, not a new task. That's something you
// might do almost automatically, but your agent needs that judgment explained."
const RULES = [
  { text: 'Same substance of the task', at: 210.3 },
  { text: 'Same owner', at: 212.18 },
  { text: 'Wording can differ', at: 213.48 },
  { text: 'New deadline = update, not a new task', at: 215.54 },
];
const S18: React.FC<{ t: number }> = ({ t }) => {
  const due = prog(t, 216.16, 0.5);
  const toD = prog(t, 222.64, 1.0, IN_OUT);
  return (
    <AbsoluteFill>
      <Title t={t} at={209.78} label="Your unwritten rules" top={70} size={54}>
        When is it the same commitment?
      </Title>
      {/* the two commitments */}
      <Card paper style={{ left: 80, top: 260, width: 760, padding: '28px 34px', ...fade(rise(t, 209.9, 20), 1 - toD * 0.5) }}>
        <Label>Meeting notes</Label>
        <div style={{ fontFamily: SERIF, fontSize: 32, color: INK, marginTop: 10, lineHeight: 1.3 }}>
          "<Mark t={t} at={210.92}>Taylor</Mark> will <Mark t={t} at={210.7}>get the customer update out</Mark> by <Mark t={t} at={215.9}>Monday</Mark>."
        </div>
      </Card>
      <Card style={{ left: 80, top: 470, width: 760, padding: '28px 34px', ...fade(rise(t, 210.2, 20), 1 - toD * 0.5) }}>
        <Label>Action tracker</Label>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 10, fontFamily: SANS, fontSize: 28, color: INK }}>
          <span>
            <Mark t={t} at={211.2}>Customer update email</Mark>
          </span>
          <span>
            <Mark t={t} at={212.44}>Taylor</Mark>
          </span>
          <span style={{ position: 'relative', width: 80, display: 'inline-block' }}>
            <span style={{ opacity: 1 - due, position: 'absolute', left: 0 }}>Fri</span>
            <span style={{ opacity: due, position: 'absolute', left: 0, color: DEEP, fontWeight: 700 }}>Mon</span>
            &nbsp;
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            right: 30,
            top: -24,
            padding: '8px 18px',
            borderRadius: 20,
            backgroundColor: LIME,
            color: colors.white,
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: '0.1em',
            ...pop(t, 217.82),
          }}
        >
          UPDATE
        </div>
        <div style={{ position: 'absolute', right: 180, top: -24, padding: '8px 18px', borderRadius: 20, backgroundColor: '#E9ECE6', color: MUTED, fontFamily: SANS, fontWeight: 700, fontSize: 20, letterSpacing: '0.1em', textDecoration: 'line-through', ...pop(t, 218.6) }}>
          NEW TASK
        </div>
      </Card>
      {/* rules list, which then becomes a Do's & Don'ts card */}
      <Card
        style={{
          left: 960,
          top: 250,
          width: 880,
          height: 600,
          padding: '40px 44px',
          border: `3px solid ${toD > 0.5 ? LIME : LINE}`,
          ...rise(t, 210.0, 20),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, height: 70 }}>
          <div style={{ fontFamily: SERIF, fontSize: 80, color: LIME, lineHeight: 1, width: 60 * toD, overflow: 'hidden', opacity: toD }}>D</div>
          <Label color={DEEP}>{toD > 0.5 ? "Do's & Don'ts" : 'Duplicate rules'}</Label>
        </div>
        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {RULES.map((r, i) => (
            <div key={r.text} style={{ display: 'flex', alignItems: 'center', gap: 20, ...rise(t, r.at, 14) }}>
              {i === 2 ? <Cross size={42} /> : <Check size={42} />}
              <div style={{ fontFamily: SERIF, fontSize: 36, color: INK }}>{i === 2 ? 'Not identical wording' : r.text}</div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 80, right: 80, top: 880, fontFamily: SERIF, fontSize: 40, color: INK, ...rise(t, 219.98) }}>
        You do it automatically. Your agent needs it <Mark t={t} at={224.0}>explained</Mark>.
      </div>
    </AbsoluteFill>
  );
};

// 19 — "This is the real value of the exercise: making your tacit knowledge explicit. AI can help you
// uncover those rules, but you need to confirm they're actually how you want the work done."
const CHIPS = [
  { text: 'Same task + owner', confirm: 234.54 },
  { text: 'Wording can differ', confirm: 235.38 },
  { text: 'New deadline = update', confirm: 236.06 },
];
const S19: React.FC<{ t: number }> = ({ t }) => {
  const lift = prog(t, 228.66, 1.6, IN_OUT);
  const cx = 1260;
  return (
    <AbsoluteFill>
      <Iceberg t={t} tipAt={225.0} waterAt={225.0} depthAt={225.0} />
      {CHIPS.map((c, i) => {
        const y0 = WATERLINE + 150 + i * 80;
        const y1 = 150 + i * 90;
        return (
          <div
            key={c.text}
            style={{
              position: 'absolute',
              left: cx - 170 + (i - 1) * 40,
              top: interpolate(lift, [0, 1], [y0, y1]),
              width: 340,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 20px',
              boxSizing: 'border-box',
              borderRadius: 16,
              backgroundColor: colors.white,
              border: `3px solid ${lift > 0.9 ? LIME : '#A9CBC7'}`,
              fontFamily: SANS,
              fontSize: 24,
              color: INK,
              boxShadow: '0 10px 26px rgba(30,40,20,0.10)',
              opacity: prog(t, 225.8 + i * 0.2, 0.4),
            }}
          >
            <span style={{ flex: 1 }}>{c.text}</span>
            <div style={pop(t, c.confirm)}>
              <Check size={34} />
            </div>
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: cx + 230, top: 240, ...pop(t, 233.9) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <UserIcon style={{ width: 40, height: 40, color: DEEP }} strokeWidth={1.8} />
          <Label color={DEEP}>You confirm</Label>
        </div>
      </div>
      <div style={{ position: 'absolute', left: cx - 420, top: 240, ...pop(t, 231.58) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <SparklesIcon style={{ width: 40, height: 40, color: DEEP }} strokeWidth={1.8} />
          <Label color={DEEP}>AI uncovers</Label>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 160, width: 520, ...rise(t, 225.9) }}>
        <Label>The real value</Label>
        <div style={{ fontFamily: SERIF, fontSize: 60, lineHeight: 1.15, letterSpacing: '-0.02em', color: INK, marginTop: 14 }}>
          Make your tacit knowledge <Mark t={t} at={230.3}>explicit</Mark>.
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 20 — "Once you've answered the questions, AI can generate your complete CODO instructions. You'll have a
// clear character, an objective, detailed dos and don'ts, and a defined output. But before using them,
// review everything carefully. Has AI introduced assumptions you haven't confirmed? Are important decision
// rules missing? Are the human responsibilities and boundaries clear?"
const DOC_SECTIONS = [
  { l: 'C', word: 'Character', at: 243.16, lines: [420, 360] },
  { l: 'O', word: 'Objective', at: 244.32, lines: [440, 300] },
  { l: 'D', word: "Do's & Don'ts", at: 245.48, lines: [460, 420, 380, 300] },
  { l: 'O', word: 'Output', at: 247.42, lines: [400, 340] },
];
const FLAGS = [
  { text: "Assumptions you haven't confirmed?", at: 252.28, y: 330 },
  { text: 'Decision rules missing?', at: 255.52, y: 530 },
  { text: 'Human responsibilities and boundaries clear?', at: 257.86, y: 730 },
];
const S20: React.FC<{ t: number }> = ({ t }) => {
  const review = prog(t, 248.88, 0.8, IN_OUT);
  const lensY = interpolate(t, [249.4, 251.4], [260, 760], { ...clamp, easing: IN_OUT });
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 80, top: 80, width: 640, ...fade(rise(t, 237.56), 1 - review) }}>
        <Label>Once you've answered</Label>
        <div style={{ fontFamily: SERIF, fontSize: 60, lineHeight: 1.12, letterSpacing: '-0.02em', color: INK, marginTop: 14 }}>
          AI generates your complete <Lime t={t} at={240.92}>CODO</Lime> instructions
        </div>
      </div>
      <div style={{ position: 'absolute', left: 80, top: 80, width: 640, opacity: review }}>
        <Label>Before you use them</Label>
        <div style={{ fontFamily: SERIF, fontSize: 60, lineHeight: 1.12, letterSpacing: '-0.02em', color: INK, marginTop: 14 }}>
          Review everything <Mark t={t} at={250.84}>carefully</Mark>.
        </div>
      </div>
      <Card
        style={{
          left: interpolate(review, [0, 1], [820, 80]),
          top: interpolate(review, [0, 1], [90, 330]),
          width: 760,
          height: interpolate(review, [0, 1], [880, 620]),
          padding: '36px 44px',
          border: `3px solid ${LIME}`,
          ...rise(t, 238.3, 30),
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: SERIF, fontSize: 36, color: INK }}>Team Follow-Up Agent</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 14px', borderRadius: 16, backgroundColor: TINT, color: DEEP, fontFamily: SANS, fontWeight: 600, fontSize: 18, ...pop(t, 239.18) }}>
            <SparklesIcon style={{ width: 20, height: 20 }} strokeWidth={2} /> Drafted with AI
          </div>
        </div>
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: interpolate(review, [0, 1], [26, 14]) }}>
          {DOC_SECTIONS.map((s) => (
            <div key={s.word} style={{ display: 'flex', gap: 22, ...rise(t, s.at, 14) }}>
              <div style={{ fontFamily: SERIF, fontSize: 64, color: LIME, width: 50, lineHeight: 1 }}>{s.l}</div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 30, color: INK, marginBottom: 10 }}>{s.word}</div>
                <Lines widths={s.lines} gap={9} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* magnifier pass */}
      <div style={{ position: 'absolute', left: 560, top: lensY, opacity: prog(t, 249.2, 0.3) * (1 - prog(t, 251.8, 0.4)) }}>
        <MagnifyingGlassIcon style={{ width: 130, height: 130, color: INK }} strokeWidth={1.4} />
      </div>
      {/* review flags */}
      {FLAGS.map((f) => (
        <div key={f.text} style={{ position: 'absolute', left: 960, top: f.y, width: 880, display: 'flex', alignItems: 'center', gap: 22, ...rise(t, f.at, 20) }}>
          <svg width={120} height={4} style={{ flexShrink: 0 }}>
            <line x1={0} y1={2} x2={120} y2={2} stroke={LIME} strokeWidth={4} strokeDasharray="8 8" />
          </svg>
          <IconChip Icon={FlagIcon} size={60} bg={LIME} fg={colors.white} />
          <div style={{ fontFamily: SERIF, fontSize: 38, lineHeight: 1.2, color: INK }}>{f.text}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// 21 — "Remember, these instructions tell your agent how to work. They don't automatically give it access
// to systems or configure technical permissions. You need to set up those capabilities separately."
const SYSTEMS = [
  { Icon: TableCellsIcon, name: 'Action tracker' },
  { Icon: EnvelopeIcon, name: 'Email' },
  { Icon: CalendarIcon, name: 'Calendar' },
];
const TOGGLES = ['Read meeting notes', 'Read the action tracker', 'Ask before changing records'];
const S21: React.FC<{ t: number }> = ({ t }) => {
  const settings = prog(t, 269.74, 0.7, IN_OUT);
  return (
    <AbsoluteFill>
      <Title t={t} at={261.0} label="Remember">
        Instructions tell your agent <Mark t={t} at={263.64}>how to work</Mark>.
      </Title>
      <MiniCodo style={{ left: 120, top: 360, ...rise(t, 261.7, 30) }} />
      {/* no access */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: prog(t, 264.8, 0.5) }}>
        {SYSTEMS.map((_, i) => (
          <path key={i} d={`M430 ${550} C 560 ${550}, 560 ${400 + i * 170}, 660 ${400 + i * 170}`} fill="none" stroke="#C9D1C2" strokeWidth={4} strokeDasharray="10 12" />
        ))}
      </svg>
      {SYSTEMS.map((s, i) => (
        <div key={s.name} style={{ position: 'absolute', left: 680, top: 360 + i * 170, display: 'flex', alignItems: 'center', gap: 18, ...fade(rise(t, 265.96 + i * 0.25, 14), 1 - settings * 0.5) }}>
          <IconChip Icon={s.Icon} size={80} bg="#EEF1EB" fg={MUTED} />
          <div>
            <div style={{ fontFamily: SERIF, fontSize: 32, color: INK }}>{s.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontFamily: SANS, fontSize: 20, color: MUTED, ...pop(t, 267.62 + i * 0.2) }}>
              <LockClosedIcon style={{ width: 22, height: 22 }} strokeWidth={2} /> No access yet
            </div>
          </div>
        </div>
      ))}
      {/* set up separately */}
      <Card style={{ left: 1200, top: 330, width: 640, height: 520, padding: 40, ...rise(t, 269.74, 30) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <IconChip Icon={ClipboardDocumentListIcon} size={56} />
          <div>
            <Label color={DEEP}>Set up separately</Label>
            <div style={{ fontFamily: SERIF, fontSize: 34, color: INK, marginTop: 4 }}>Access & permissions</div>
          </div>
        </div>
        <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {TOGGLES.map((tg, i) => {
            const on = prog(t, 270.5 + i * 0.4, 0.3);
            return (
              <div key={tg} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: SANS, fontSize: 26, color: INK }}>
                {tg}
                <div style={{ width: 72, height: 40, borderRadius: 20, backgroundColor: on > 0.5 ? LIME : '#DCE2D6', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 4, left: 4 + on * 32, width: 32, height: 32, borderRadius: 16, backgroundColor: colors.white }} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </AbsoluteFill>
  );
};

// 22 — "So take your completed build plan, use our provided prompt, answer the questions, and refine the
// result."
const STEPS = [
  { title: 'Take your Build Plan', Icon: DocumentTextIcon, at: 272.84 },
  { title: 'Use our prompt', Icon: SparklesIcon, at: 274.62 },
  { title: 'Answer the questions', Icon: ChatBubbleLeftRightIcon, at: 276.2 },
  { title: 'Refine the result', Icon: PencilIcon, at: 277.32 },
];
const S22: React.FC<{ t: number }> = ({ t }) => {
  const x0 = 270;
  const step = 460;
  const run = interpolate(t, [272.84, 277.9], [0, 3], { ...clamp, easing: IN_OUT });
  return (
    <AbsoluteFill>
      <Title t={t} at={272.4} label="Your next step">
        Build your agent instructions
      </Title>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <line x1={x0} y1={520} x2={x0 + 3 * step} y2={520} stroke="#DCE3D6" strokeWidth={6} strokeLinecap="round" />
        <line x1={x0} y1={520} x2={x0 + run * step} y2={520} stroke={LIME} strokeWidth={6} strokeLinecap="round" />
      </svg>
      {STEPS.map((s, i) => (
        <div key={s.title} style={{ position: 'absolute', left: x0 + i * step - 150, top: 440, width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', ...pop(t, s.at) }}>
          <div style={{ width: 160, height: 160, borderRadius: 80, backgroundColor: colors.white, border: `4px solid ${LIME}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 14px 34px rgba(102,198,28,0.18)' }}>
            <s.Icon style={{ width: 70, height: 70, color: DEEP }} strokeWidth={1.4} />
          </div>
          <Label color={DEEP} style={{ marginTop: 26 }}>Step {i + 1}</Label>
          <div style={{ fontFamily: SERIF, fontSize: 34, color: INK, marginTop: 8, textAlign: 'center' }}>{s.title}</div>
        </div>
      ))}
    </AbsoluteFill>
  );
};

// 23 — "You'll now have something much more useful than a simple job description, a clear set of
// instructions based on your own experience for how your agent should carry the work forward."
const S23: React.FC<{ t: number }> = ({ t }) => {
  const go = interpolate(t, [287.4, 289.6], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill>
      <Card style={{ left: 120, top: 380, width: 360, height: 260, padding: 30, ...fade(pop(t, 279.0), dim(t, 282.6, 0.35)) }}>
        <Label>Job description</Label>
        <div style={{ fontFamily: SERIF, fontSize: 28, color: INK, marginTop: 14 }}>Team follow-up assistant</div>
        <div style={{ marginTop: 18 }}>
          <Lines widths={[220, 140]} />
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 520, top: 470, fontFamily: SERIF, fontSize: 70, color: '#C8D0C1', ...pop(t, 281.0) }}>→</div>
      <Card style={{ left: 660, top: 170, width: 640, height: 760, padding: '36px 44px', border: `3px solid ${LIME}`, ...rise(t, 282.84, 30) }}>
        <Label color={DEEP}>Agent instructions</Label>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 26 }}>
          {DOC_SECTIONS.map((s) => (
            <div key={s.word} style={{ display: 'flex', gap: 20 }}>
              <div style={{ fontFamily: SERIF, fontSize: 58, color: LIME, width: 46, lineHeight: 1 }}>{s.l}</div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 28, color: INK, marginBottom: 10 }}>{s.word}</div>
                <Lines widths={s.lines.map((w) => w * 0.85)} gap={8} />
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div style={{ position: 'absolute', left: 1380, top: 300, width: 460 }}>
        <div style={{ fontFamily: SERIF, fontSize: 52, lineHeight: 1.15, letterSpacing: '-0.02em', color: INK, ...rise(t, 283.4) }}>
          Built on <Mark t={t} at={285.16}>your own experience</Mark>.
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 36, color: MUTED, marginTop: 30, lineHeight: 1.25, ...rise(t, 286.26) }}>
          So your agent can carry the work forward.
        </div>
      </div>
      <div style={{ position: 'absolute', left: interpolate(go, [0, 1], [1380, 2000]), top: 700, opacity: prog(t, 286.5, 0.4) }}>
        <AgentToken size={84} />
      </div>
    </AbsoluteFill>
  );
};

// ── timeline ───────────────────────────────────────────────────────────────
type SceneDef = { start: number; end: number; C: React.FC<{ t: number }>; hideLogo?: boolean; noFade?: boolean };
const SCENES: SceneDef[] = [
  { start: 0, end: 11.4, C: S1 },
  { start: 11.4, end: 18.8, C: S2 },
  { start: 18.8, end: 27.3, C: S3 },
  { start: 27.3, end: 42.8, C: S4 },
  { start: 42.8, end: 46.9, C: S5 },
  { start: 46.9, end: 60.9, C: S6 },
  { start: 60.9, end: 102.5, C: S7, hideLogo: true, noFade: true },
  { start: 102.5, end: 114.0, C: S8 },
  { start: 114.0, end: 126.6, C: S9 },
  { start: 126.6, end: 137.0, C: S10 },
  { start: 137.0, end: 152.3, C: S11 },
  { start: 152.3, end: 161.45, C: S12 },
  { start: 161.45, end: 172.4, C: S13 },
  { start: 172.4, end: 185.9, C: S14 },
  { start: 185.9, end: 192.9, C: S15 },
  { start: 192.9, end: 198.6, C: S16, hideLogo: true },
  { start: 198.6, end: 209.6, C: S17 },
  { start: 209.6, end: 225.5, C: S18 },
  { start: 225.5, end: 237.3, C: S19 },
  { start: 237.3, end: 260.7, C: S20 },
  { start: 260.7, end: 272.2, C: S21 },
  { start: 272.2, end: 278.7, C: S22 },
  { start: 278.7, end: AGENT_INSTRUCTIONS_DURATION_S, C: S23 },
];
const FADE = 0.3;

export const AgentInstructions: React.FC = () => {
  const frame = useCurrentFrame();
  const t = (frame - AGENT_INSTRUCTIONS_TITLE_FRAMES) / FPS;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <Sequence durationInFrames={AGENT_INSTRUCTIONS_TITLE_FRAMES + 12}>
        <TitleCardGreen title="Creating CODO Agent Instructions" />
      </Sequence>
      <Sequence from={AGENT_INSTRUCTIONS_TITLE_FRAMES}>
        <Audio src={staticFile('audio/agent-instructions.orig.mp3')} />
      </Sequence>

      {SCENES.map((s, i) => {
        if (t < s.start - FADE || t > s.end + FADE) return null;
        const fadeIn = i === 0 ? interpolate(t, [0, 0.4], [0, 1], clamp) : interpolate(t, [s.start - FADE, s.start + FADE], [0, 1], clamp);
        const next = SCENES[i + 1];
        const fadeOut = next && !next.noFade ? interpolate(t, [s.end - FADE, s.end + FADE], [1, 0], clamp) : t < s.end ? 1 : 0;
        const opacity = s.noFade ? (t >= s.start ? fadeOut : 0) : Math.min(fadeIn, fadeOut);
        if (opacity <= 0) return null;
        // the diagram is frame-driven; give it its own clock
        const body =
          s.C === S7 ? (
            <Sequence from={AGENT_INSTRUCTIONS_TITLE_FRAMES + Math.round(s.start * FPS)} layout="none">
              <S7 t={t} />
            </Sequence>
          ) : (
            <s.C t={t} />
          );
        return (
          <AbsoluteFill key={i} style={{ opacity, backgroundColor: s.noFade ? colors.white : undefined }}>
            {body}
          </AbsoluteFill>
        );
      })}

      {t >= 0 && !SCENES.find((s) => t >= s.start && t < s.end && s.hideLogo) && <LogoFooter variant="dark" />}
    </AbsoluteFill>
  );
};
