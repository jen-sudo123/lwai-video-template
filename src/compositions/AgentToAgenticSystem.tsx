import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
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

// From an Agent to an Agentic System with Agent Flows (Copilot Studio course).
// Custom animated build; the template scenes were the reference, not the building blocks.
// Audio: audio/agent-to-agentic-system.mp3 (ElevenLabs eleven_v4, Daan, unpadded, 340.7s).
// Every cue is in SECONDS of that VO, from the ElevenLabs Scribe word timestamps in
// src/data/agent-to-agentic-system.transcript.json. A 90-frame green title card precedes the VO.
// Autonomy dial positions reuse the course's five levels (see AutonomyDial.tsx).
//
//  #   scene                               start   VO cue
//  1   Our first agent                     0.0     "We've built our first agent in Copilot Studio."
//  2   A larger picture: agentic system    19.7    "But an agent is only one part of a larger picture."
//  3   Judgment vs. same process           39.7    "And not every step needs AI reasoning."
//  4   Building an Agent Flow              50.8    "An Agent Flow is a predefined sequence of actions…"
//  5   Agent vs. Flow: who controls        79.6    "The key difference is how the work is controlled."
//  6   Three commitments                   107.0   "Let's return to our Weekly Team Action Follow-Up Agent."
//  7   The flow fetches, the agent decides 140.4   "But to make those decisions…"
//  8   The autonomy dial                   172.8   "So where do people fit into this system?"
//  9   The system, assembled               240.5   "Let's look at how these components form an agentic system."
//  10  When to use a flow                  296.2   "But not every action needs an Agent Flow."
//  11  The goal                            315.0   "The goal isn't to make every step intelligent."
//  12  Next: Check Team Action Tracker     324.4   "Next, we'll build an Agent Flow called…"

export const AGENT_TO_AGENTIC_TITLE_FRAMES = 90;
export const AGENT_TO_AGENTIC_DURATION_S = 342.2;

const STARTS = [0, 19.7, 39.7, 50.8, 79.6, 107.0, 140.4, 172.8, 240.5, 296.2, 315.0, 324.4];
const CROSSFADE = 0.6;
const LEAD = 0.15;
const IMG = 'agent-to-agentic-system/images/';

const INK = '#111111';
const MUTED = colors.neutral600;
const LINE = '#E3E6DF';
const SOFT = '#F5F7F2';
const LIME = colors.lime500;
const LIME_SOFT = colors.lime200;
const GREEN = colors.titleGreen;
const AMBER = colors.titleYellow;
const AMBER_SOFT = '#FBF1CC';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const OUT = Easing.out(Easing.cubic);
const IN_OUT = Easing.inOut(Easing.quad);
const BACK = Easing.out(Easing.back(1.6));

const prog = (t: number, at: number, dur = 0.7, easing = OUT) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing });
const between = (t: number, a: number, b: number, fade = 0.4) => prog(t, a, fade, IN_OUT) * (1 - prog(t, b, fade, IN_OUT));

const enter = (t: number, at: number, { dur = 0.7, y = 24, x = 0 } = {}): React.CSSProperties => {
  const p = prog(t, at - LEAD, dur);
  return { opacity: p, transform: `translate(${x * (1 - p)}px, ${y * (1 - p)}px)` };
};
const pop = (t: number, at: number): React.CSSProperties => {
  const p = prog(t, at - LEAD, 0.55, BACK);
  return { opacity: Math.min(1, p * 1.6), transform: `scale(${0.6 + 0.4 * p})` };
};
const mark = (t: number, at: number): React.CSSProperties => ({
  backgroundImage: `linear-gradient(${LIME_SOFT}, ${LIME_SOFT})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: '0 88%',
  backgroundSize: `${prog(t, at, 0.9, IN_OUT) * 100}% 38%`,
  padding: '0 .06em',
  margin: '0 -.06em',
});

// ---------- primitives ----------

const serif = (size: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'IBM Plex Serif',
  fontWeight: 400,
  fontSize: size,
  letterSpacing: '-0.03em',
  lineHeight: 1.15,
  color: INK,
  margin: 0,
  ...extra,
});
const sans = (size: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
  fontFamily: 'Public Sans',
  fontSize: size,
  lineHeight: 1.4,
  color: INK,
  margin: 0,
  ...extra,
});
const kicker: React.CSSProperties = {
  fontFamily: 'Public Sans',
  fontWeight: 600,
  fontSize: 20,
  letterSpacing: '.12em',
  textTransform: 'uppercase',
  color: MUTED,
};

const Abs: React.FC<{ x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  style,
  children,
}) => <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, ...style }}>{children}</div>;

const Label: React.FC<{ t: number; at: number; children: React.ReactNode }> = ({ t, at, children }) => (
  <Abs x={80} y={60} style={{ ...kicker, ...enter(t, at, { y: 12 }) }}>
    {children}
  </Abs>
);

type IconName =
  | 'spark' | 'doc' | 'table' | 'bolt' | 'flow' | 'person' | 'check' | 'loop' | 'lock' | 'question' | 'plug' | 'filter' | 'reply' | 'stop' | 'branch';
const ICONS: Record<IconName, string> = {
  spark: 'M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z',
  doc: 'M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6',
  table: 'M4 5h16v14H4z M4 10h16 M4 14.5h16 M10 5v14',
  bolt: 'M13 3L5 13.5h6L10 21l8-10.5h-6z',
  flow: 'M4 6h5v4H4z M15 14h5v4h-5z M9 8h3.5v8H15',
  person: 'M12 12a4 4 0 100-8 4 4 0 000 8z M4.5 21c.8-4 3.8-6 7.5-6s6.7 2 7.5 6',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  loop: 'M4 12a8 8 0 0113.7-5.6L20 9 M20 4v5h-5 M20 12a8 8 0 01-13.7 5.6L4 15 M4 20v-5h5',
  lock: 'M6 11h12v10H6z M8.5 11V8a3.5 3.5 0 017 0v3',
  question: 'M9 9a3 3 0 115 2.2c-1.2.8-2 1.4-2 2.8 M12 18v.5',
  plug: 'M9 3v5 M15 3v5 M7 8h10v3a5 5 0 01-10 0z M12 16v5',
  filter: 'M4 5h16l-6 7.5V19l-4 2v-8.5z',
  reply: 'M10 7L4 12l6 5 M4 12h10a6 6 0 016 6',
  stop: 'M8 3h8l5 5v8l-5 5H8l-5-5V8z M12 8v5 M12 16v.5',
  branch: 'M6 4v16 M6 12c6 0 6-6 12-6 M6 12c6 0 6 6 12 6',
};
const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number }> = ({
  name,
  size = 36,
  color = INK,
  stroke = 1.8,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <path d={ICONS[name]} />
  </svg>
);

const IconDot: React.FC<{ name: IconName; size?: number; bg?: string; color?: string }> = ({ name, size = 64, bg = LIME_SOFT, color = INK }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: bg, display: 'grid', placeItems: 'center', flex: 'none' }}>
    <Icon name={name} size={size * 0.56} color={color} />
  </div>
);

const Chip: React.FC<{ children: React.ReactNode; tone?: 'lime' | 'amber' | 'ink' | 'line'; size?: number; style?: React.CSSProperties; icon?: IconName }> = ({
  children,
  tone = 'lime',
  size = 24,
  style,
  icon,
}) => {
  const bg = { lime: LIME_SOFT, amber: AMBER_SOFT, ink: INK, line: '#fff' }[tone];
  const fg = tone === 'ink' ? '#fff' : INK;
  const bd = { lime: LIME, amber: AMBER, ink: INK, line: LINE }[tone];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: `${size * 0.42}px ${size * 0.8}px`,
        borderRadius: 999,
        background: bg,
        border: `2px solid ${bd}`,
        fontFamily: 'Public Sans',
        fontWeight: 600,
        fontSize: size,
        color: fg,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {icon && <Icon name={icon} size={size * 1.1} color={fg} stroke={2.2} />}
      {children}
    </div>
  );
};

// Line drawn by progress p (0..1) between points, as an SVG overlay in canvas coordinates.
const Wire: React.FC<{ pts: [number, number][]; p: number; color?: string; width?: number; dash?: boolean; arrow?: boolean }> = ({
  pts,
  p,
  color = '#B9BFB2',
  width = 3,
  dash = false,
  arrow = false,
}) => {
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join(' ');
  let len = 0;
  for (let i = 1; i < pts.length; i++) len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  const [ax, ay] = pts[pts.length - 1];
  const [bx, by] = pts[pts.length - 2];
  const ang = (Math.atan2(ay - by, ax - bx) * 180) / Math.PI;
  return (
    <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dash ? '10 12' : `${len} ${len}`}
        strokeDashoffset={dash ? 0 : len * (1 - p)}
        opacity={dash ? p : 1}
      />
      {arrow && p > 0.98 && (
        <path d="M-14 -9L0 0L-14 9" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" transform={`translate(${ax} ${ay}) rotate(${ang})`} />
      )}
    </svg>
  );
};

// A dot travelling along a polyline; u in 0..1.
const pointOn = (pts: [number, number][], u: number): [number, number] => {
  const segs: number[] = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    segs.push(l);
    total += l;
  }
  let d = Math.max(0, Math.min(1, u)) * total;
  for (let i = 0; i < segs.length; i++) {
    if (d <= segs[i]) {
      const k = segs[i] ? d / segs[i] : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
    }
    d -= segs[i];
  }
  return pts[pts.length - 1];
};
const Pulse: React.FC<{ pts: [number, number][]; u: number; opacity?: number; r?: number; color?: string }> = ({ pts, u, opacity = 1, r = 11, color = LIME }) => {
  const [x, y] = pointOn(pts, u);
  return (
    <div
      style={{
        position: 'absolute',
        left: x - r,
        top: y - r,
        width: r * 2,
        height: r * 2,
        borderRadius: r,
        background: color,
        boxShadow: `0 0 0 ${r * 0.7}px ${LIME_SOFT}`,
        opacity,
      }}
    />
  );
};

// Screenshot in a light window frame, zooming towards (cx, cy) as p goes 0..1.
const Shot: React.FC<{ src: string; w: number; h: number; cx: number; cy: number; scale: number; p: number; aspect?: number }> = ({
  src,
  w,
  h,
  cx,
  cy,
  scale,
  p,
  aspect = 999 / 1920,
}) => {
  const s = 1 + (scale - 1) * p;
  const ih = w * aspect;
  return (
    <div style={{ width: w, height: h, borderRadius: 16, overflow: 'hidden', border: `2px solid ${LINE}`, background: '#fff', boxShadow: '0 30px 60px -30px rgba(20,40,10,.25)', position: 'relative' }}>
      <div style={{ height: 34, background: SOFT, borderBottom: `2px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: 6, background: '#D5DACF' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', top: 36, left: 0, width: w, height: h - 36, overflow: 'hidden' }}>
        <Img
          src={staticFile(IMG + src)}
          style={{
            width: w,
            height: ih,
            transformOrigin: `${cx * 100}% ${cy * 100}%`,
            transform: `scale(${s})`,
            marginTop: Math.max(0, (h - 36 - ih) / 2) * (1 - p),
          }}
        />
      </div>
    </div>
  );
};

const Card: React.FC<{ style?: React.CSSProperties; children: React.ReactNode; lit?: number }> = ({ style, children, lit = 0 }) => (
  <div
    style={{
      background: '#fff',
      border: `2px solid ${lit > 0 ? interpolateColor(LINE, LIME, lit) : LINE}`,
      borderRadius: 20,
      boxShadow: '0 24px 48px -32px rgba(20,40,10,.28)',
      ...style,
    }}
  >
    {children}
  </div>
);

// Minimal hex colour lerp (Remotion's interpolateColors would also do; kept local for clarity).
function interpolateColor(a: string, b: string, k: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * Math.max(0, Math.min(1, k)))).join(',')})`;
}

const Scene: React.FC<{ t: number; index: number; children: React.ReactNode; fadeOutAt?: number }> = ({ t, index, children, fadeOutAt }) => {
  const start = STARTS[index];
  const end = index + 1 < STARTS.length ? STARTS[index + 1] + CROSSFADE : Infinity;
  if (t < start || t >= end) return null;
  const opacity = (index === 0 ? 1 : prog(t, start, CROSSFADE, IN_OUT)) * (fadeOutAt ? 1 - prog(t, fadeOutAt, 1, IN_OUT) : 1);
  return <AbsoluteFill style={{ backgroundColor: '#fff', opacity, zIndex: index + 1 }}>{children}</AbsoluteFill>;
};

// ---------- scenes ----------

const S1FirstAgent: React.FC<{ t: number }> = ({ t }) => {
  const caps: [string, number][] = [
    ['Reads meeting notes', 5.68],
    ['Checks existing commitments in SharePoint', 7.0],
    ['Identifies new or updated actions', 9.28],
    ['Prepares recommendations for human review', 12.08],
  ];
  const parts: [string, number, IconName][] = [
    ['Instructions', 15.6, 'doc'],
    ['Knowledge', 17.0, 'table'],
    ['Tools', 17.8, 'plug'],
    ['Boundaries', 18.64, 'lock'],
  ];
  return (
    <>
      <Label t={t} at={0.2}>Our first agent · Copilot Studio</Label>
      <Abs x={80} y={170} w={820}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', ...enter(t, 0.3) }}>
          <IconDot name="spark" size={84} />
          <div style={serif(52)}>Weekly Team Action Follow-Up Agent</div>
        </div>
        <div style={{ marginTop: 48, display: 'grid', gap: 22 }}>
          {caps.map(([text, at]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 18, ...enter(t, at, { x: -24, y: 0 }) }}>
              <div style={{ ...pop(t, at + 0.1), width: 40, height: 40, borderRadius: 20, background: LIME, display: 'grid', placeItems: 'center', flex: 'none' }}>
                <Icon name="check" size={26} color="#fff" stroke={3} />
              </div>
              <div style={sans(34)}>{text}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 64, ...kicker, ...enter(t, 15.3, { y: 10 }) }}>What we gave it</div>
        <div style={{ marginTop: 18, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {parts.map(([text, at, icon]) => (
            <div key={text} style={pop(t, at)}>
              <Chip icon={icon} size={26}>{text}</Chip>
            </div>
          ))}
        </div>
      </Abs>
      <Abs x={980} y={190} style={enter(t, 1.6, { y: 40 })}>
        <Shot src="06b-normal-tools-restored.png" w={860} h={560} cx={0.06} cy={0.22} scale={1.9} p={prog(t, 3.2, 1.4, IN_OUT)} />
        <div style={{ ...sans(22, { color: MUTED }), marginTop: 16, ...enter(t, 4.4, { y: 8 }) }}>The agent’s tools in Copilot Studio</div>
      </Abs>
    </>
  );
};

const S2System: React.FC<{ t: number }> = ({ t }) => {
  const C: [number, number] = [960, 610];
  const nodes: { label: string; sub: string; at: number; x: number; y: number; icon: IconName }[] = [
    { label: 'Data', sub: 'What the work depends on', at: 25.52, x: 300, y: 380, icon: 'table' },
    { label: 'Tools', sub: 'Act in other systems', at: 26.52, x: 1260, y: 380, icon: 'plug' },
    { label: 'Repeatable processes', sub: 'Same steps, every time', at: 26.96, x: 300, y: 740, icon: 'loop' },
    { label: 'Human oversight', sub: 'Review and approval', at: 28.64, x: 1260, y: 740, icon: 'person' },
  ];
  const W = 360;
  const H = 120;
  const anchor = (n: (typeof nodes)[number]): [number, number] => [n.x < 960 ? n.x + W : n.x, n.y + H / 2];
  const zoom = 1.7 - 0.7 * prog(t, 20.0, 2.2, IN_OUT);
  const ring: [number, number][] = [C, anchor(nodes[0]), C, anchor(nodes[1]), C, anchor(nodes[3]), C, anchor(nodes[2]), C];
  const flowU = ((t - 36.4) / 5) % 1;
  const isReasoning = prog(t, 24.0, 0.5, IN_OUT);
  return (
    <>
      <Label t={t} at={19.9}>From agent to agentic system</Label>
      <Abs x={80} y={120} w={1760} style={{ textAlign: 'center', ...enter(t, 20.0) }}>
        <div style={serif(60)}>
          An agent is only one part of <span style={mark(t, 21.4)}>a larger picture.</span>
        </div>
      </Abs>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: `${C[0]}px ${C[1]}px` }}>
        {nodes.map((n) => (
          <Wire key={n.label} pts={[C, anchor(n)]} p={prog(t, n.at - 0.3, 0.6)} color={LIME} width={4} />
        ))}
        {t > 36.2 && <Pulse pts={ring} u={flowU} opacity={prog(t, 36.2, 0.4)} />}
        <div
          style={{
            position: 'absolute',
            left: C[0] - 130,
            top: C[1] - 130,
            width: 260,
            height: 260,
            borderRadius: 130,
            background: interpolateColor('#FFFFFF', '#EFF9E4', isReasoning),
            border: `3px solid ${LIME}`,
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'grid', placeItems: 'center', gap: 6 }}>
            <Icon name="spark" size={54} color={GREEN} />
            <div style={{ position: 'relative', height: 80, width: 220 }}>
              <div style={{ ...serif(34), position: 'absolute', inset: 0, opacity: 1 - isReasoning }}>Our agent</div>
              <div style={{ ...serif(34), position: 'absolute', inset: 0, opacity: isReasoning }}>AI reasoning</div>
            </div>
          </div>
        </div>
        {nodes.map((n) => (
          <Abs key={n.label} x={n.x} y={n.y} w={W} h={H} style={pop(t, n.at)}>
            <Card style={{ height: H, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px' }} lit={between(t, n.at, n.at + 1.6)}>
              <IconDot name={n.icon} size={64} />
              <div>
                <div style={serif(30)}>{n.label}</div>
                <div style={sans(20, { color: MUTED })}>{n.sub}</div>
              </div>
            </Card>
          </Abs>
        ))}
      </AbsoluteFill>
      <Abs x={80} y={930} w={1760} style={{ textAlign: 'center' }}>
        <div style={{ ...sans(30), ...enter(t, 32.8, { y: 12 }) }}>
          <span style={{ color: MUTED }}>Instead of answering one request at a time, it </span>
          <span style={mark(t, 36.4)}>coordinates multiple steps</span>
          <span style={{ color: MUTED }}> to </span>
          <span style={mark(t, 38.24)}>carry work forward.</span>
        </div>
      </Abs>
    </>
  );
};

const S3JudgmentProcess: React.FC<{ t: number }> = ({ t }) => {
  const dim = 1 - prog(t, 48.4, 0.5, IN_OUT);
  // Judgment: a path that re-decides which branch to take.
  const origin: [number, number] = [180, 640];
  const fork: [number, number] = [420, 640];
  const ends: [number, number][] = [
    [780, 470],
    [780, 640],
    [780, 810],
  ];
  const choice = Math.floor(((t - 43) / 1.4) % 3 + 3) % 3;
  const local = ((t - 43) / 1.4) % 1;
  // Process: identical items moving at a steady pace.
  const belt: [number, number][] = [
    [1060, 640],
    [1780, 640],
  ];
  return (
    <>
      <Label t={t} at={40.0}>Not every step needs AI reasoning</Label>
      <div style={{ opacity: dim }}>
        <Abs x={80} y={200} w={820} style={enter(t, 42.76)}>
          <div style={kicker}>Judgment</div>
          <div style={{ ...serif(56), marginTop: 14 }}>Some parts of work require judgment</div>
        </Abs>
        <div style={{ opacity: prog(t, 43.0, 0.6) }}>
          <Wire pts={[origin, fork]} p={1} color={INK} width={4} />
          {ends.map((e, i) => (
            <Wire key={i} pts={[fork, [fork[0] + 120, e[1]], e]} p={1} color={i === choice ? LIME : '#D3D8CC'} width={i === choice ? 6 : 4} />
          ))}
          {ends.map((e, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: e[0],
                top: e[1] - 30,
                width: 60,
                height: 60,
                borderRadius: 30,
                border: `3px solid ${i === choice ? LIME : '#D3D8CC'}`,
                background: i === choice ? LIME_SOFT : '#fff',
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <Icon name="question" size={30} color={i === choice ? INK : MUTED} />
            </div>
          ))}
          <Pulse pts={[origin, fork, [fork[0] + 120, ends[choice][1]], ends[choice]]} u={local} />
        </div>
        <div style={{ position: 'absolute', left: 960, top: 190, bottom: 160, width: 2, background: LINE, transform: `scaleY(${prog(t, 42.0, 0.8, IN_OUT)})`, transformOrigin: 'top' }} />
        <Abs x={1040} y={200} w={800} style={enter(t, 45.16)}>
          <div style={kicker}>Process</div>
          <div style={{ ...serif(56), marginTop: 14 }}>Others follow exactly the same process every time</div>
        </Abs>
        <div style={{ opacity: prog(t, 45.4, 0.6) }}>
          <Wire pts={belt} p={1} color={INK} width={4} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ position: 'absolute', left: 1080 + i * 180, top: 590, width: 120, height: 100, borderRadius: 14, border: `3px solid ${INK}`, background: '#fff', display: 'grid', placeItems: 'center' }}>
              <div style={sans(22, { fontWeight: 600 })}>Step {i + 1}</div>
            </div>
          ))}
          {[0, 1, 2].map((k) => (
            <Pulse key={k} pts={[[1060, 730], [1780, 730]]} u={(((t - 45.4) / 3 + k / 3) % 1 + 1) % 1} r={9} />
          ))}
        </div>
      </div>
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center', opacity: prog(t, 48.6, 0.6) }}>
        <div style={{ textAlign: 'center', ...enter(t, 48.72, { y: 30, dur: 0.9 }) }}>
          <div style={serif(110)}>
            That’s where <span style={{ color: GREEN }}>Agent Flows</span> come in.
          </div>
          <div style={{ width: 160, height: 10, background: LIME, margin: '40px auto 0', transform: `scaleX(${prog(t, 49.4, 0.7, IN_OUT)})` }} />
        </div>
      </AbsoluteFill>
    </>
  );
};

const FlowNode: React.FC<{ t: number; at: number; x: number; y: number; w: number; h: number; kind: string; text: React.ReactNode; icon: IconName; lit?: number; tone?: string }> = ({
  t,
  at,
  x,
  y,
  w,
  h,
  kind,
  text,
  icon,
  lit = 0,
  tone = LIME_SOFT,
}) => (
  <Abs x={x} y={y} w={w} h={h} style={pop(t, at)}>
    <Card style={{ height: h, padding: '22px 24px', display: 'grid', alignContent: 'start', gap: 14 }} lit={lit}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <IconDot name={icon} size={52} bg={tone} />
        <div style={{ ...kicker, fontSize: 18 }}>{kind}</div>
      </div>
      <div style={serif(30, { lineHeight: 1.2 })}>{text}</div>
    </Card>
  </Abs>
);

const S4FlowBuild: React.FC<{ t: number }> = ({ t }) => {
  const Y = 420;
  const W = 360;
  const H = 210;
  const xs = [80, 520, 960, 1400];
  const mid = Y + H / 2;
  const run = t > 77.2 ? (((t - 77.2) / 3.2) % 1) : -1;
  const step = run < 0 ? -1 : Math.floor(run * 4);
  const lit = (i: number) => (step === i ? 1 : 0);
  const diamond: [number, number] = [1140, 820];
  return (
    <>
      <Label t={t} at={51.0}>What is an Agent Flow?</Label>
      <Abs x={80} y={140} w={1700} style={enter(t, 51.12)}>
        <div style={serif(56)}>
          A <span style={mark(t, 52.4)}>predefined sequence of actions</span> that automates part of a workflow.
        </div>
      </Abs>
      <Wire pts={[[xs[0] + W, mid], [xs[1], mid]]} p={prog(t, 66.0, 0.6)} color={INK} width={3} arrow />
      <Wire pts={[[xs[1] + W, mid], [xs[2], mid]]} p={prog(t, 69.6, 0.5)} color={INK} width={3} arrow />
      <Wire pts={[[xs[2] + W, mid], [xs[3], mid]]} p={prog(t, 71.3, 0.5)} color={INK} width={3} arrow />
      <FlowNode t={t} at={56.4} x={xs[0]} y={Y} w={W} h={H} kind="Trigger" icon="bolt" lit={lit(0)} tone={AMBER_SOFT}
        text={<>When an agent <span style={mark(t, 60.6)}>calls the flow</span></>} />
      <FlowNode t={t} at={68.24} x={xs[1]} y={Y} w={W} h={H} kind="Action" icon="table" lit={lit(1)} text="Retrieve records from SharePoint" />
      <FlowNode t={t} at={70.32} x={xs[2]} y={Y} w={W} h={H} kind="Action" icon="filter" lit={lit(2)} text="Organize the information" />
      <FlowNode t={t} at={71.92} x={xs[3]} y={Y} w={W} h={H} kind="Action" icon="reply" lit={lit(3)} text="Return results to the agent" />
      <Abs x={80} y={Y + H + 28} w={W} style={{ ...sans(24, { color: MUTED }), ...enter(t, 56.9, { y: 8 }) }}>
        Something tells the flow when to run
      </Abs>
      {/* Conditions: a branch off the sequence */}
      <Wire pts={[[xs[2] + W / 2, Y + H], [xs[2] + W / 2, diamond[1]], [diamond[0] - 60, diamond[1]]]} p={prog(t, 74.4, 0.6)} color={INK} width={3} dash />
      <div style={{ position: 'absolute', left: diamond[0] - 60, top: diamond[1] - 60, width: 120, height: 120, ...pop(t, 75.64) }}>
        <div style={{ width: 120, height: 120, transform: 'rotate(45deg) scale(.72)', border: `3px solid ${INK}`, background: AMBER_SOFT, borderRadius: 14 }} />
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', ...serif(30, { fontWeight: 500 }) }}>If</div>
      </div>
      <Wire pts={[[diamond[0] + 60, diamond[1]], [diamond[0] + 160, diamond[1] - 50], [1300, diamond[1] - 50]]} p={prog(t, 76.2, 0.5)} color={LIME} width={4} arrow />
      <Wire pts={[[diamond[0] + 60, diamond[1]], [diamond[0] + 160, diamond[1] + 50], [1300, diamond[1] + 50]]} p={prog(t, 76.5, 0.5)} color="#C9CFC2" width={4} arrow />
      <Abs x={1320} y={diamond[1] - 76} w={520} style={enter(t, 75.9, { x: -16, y: 0 })}>
        <div style={sans(28, { fontWeight: 600 })}>Conditions</div>
        <div style={sans(24, { color: MUTED })}>follow different paths, based on rules we’ve defined</div>
      </Abs>
      {run >= 0 && (
        <Pulse
          pts={[[xs[0] + W / 2, Y - 18], [xs[3] + W / 2, Y - 18]]}
          u={run}
          opacity={prog(t, 77.2, 0.4)}
        />
      )}
    </>
  );
};

const S5AgentVsFlow: React.FC<{ t: number }> = ({ t }) => {
  const merge = prog(t, 100.3, 0.8, IN_OUT);
  const inputs: [string, number][] = [
    ['Instructions', 85.64],
    ['The user’s request', 87.08],
    ['Information available', 88.64],
  ];
  const pick = Math.floor(((t - 89.2) / 1.2) % 3 + 3) % 3;
  const railStep = Math.floor(((t - 91.5) / 0.8) % 4 + 4) % 4;
  return (
    <>
      <Label t={t} at={79.92}>The key difference: how the work is controlled</Label>
      <div style={{ opacity: 1 - merge }}>
        {/* AI agent */}
        <Abs x={80} y={170} w={840} h={720} style={enter(t, 82.96, { y: 30 })}>
          <Card style={{ height: 720, padding: 44 }}>
            <div style={kicker}>AI agent</div>
            <div style={{ ...serif(50), marginTop: 12 }}>Decides what to do next</div>
            <div style={{ position: 'relative', marginTop: 40, height: 420 }}>
              {inputs.map(([s, at], i) => (
                <div key={s} style={{ position: 'absolute', left: 0, top: 40 + i * 120, ...enter(t, at, { x: -20, y: 0 }) }}>
                  <Chip tone="line" size={24}>{s}</Chip>
                </div>
              ))}
              <div style={{ position: 'absolute', left: 380, top: 150, width: 120, height: 120, borderRadius: 60, background: LIME_SOFT, border: `3px solid ${LIME}`, display: 'grid', placeItems: 'center', ...pop(t, 84.0) }}>
                <Icon name="spark" size={56} color={GREEN} />
              </div>
              <svg width={760} height={420} style={{ position: 'absolute', inset: 0, opacity: prog(t, 89.0, 0.5) }}>
                {[90, 210, 330].map((y, i) => (
                  <path key={i} d={`M500 210 C 580 210, 580 ${y}, 650 ${y}`} fill="none" stroke={i === pick ? LIME : '#D3D8CC'} strokeWidth={i === pick ? 6 : 4} />
                ))}
                {[90, 210, 330].map((y, i) => (
                  <circle key={i} cx={672} cy={y} r={20} fill={i === pick ? LIME : '#fff'} stroke={i === pick ? LIME : '#D3D8CC'} strokeWidth={4} />
                ))}
              </svg>
            </div>
          </Card>
        </Abs>
        {/* Agent flow */}
        <Abs x={1000} y={170} w={840} h={720} style={enter(t, 90.69, { y: 30 })}>
          <Card style={{ height: 720, padding: 44 }}>
            <div style={kicker}>Agent Flow</div>
            <div style={{ ...serif(50), marginTop: 12 }}>Follows a process designed in advance</div>
            <div style={{ position: 'relative', marginTop: 60, height: 300 }}>
              <div style={{ position: 'absolute', left: 40, right: 40, top: 70, height: 4, background: INK }} />
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 20 + i * 190,
                    top: 20,
                    width: 140,
                    height: 104,
                    borderRadius: 14,
                    border: `3px solid ${railStep === i && t > 91.5 ? LIME : INK}`,
                    background: railStep === i && t > 91.5 ? LIME_SOFT : '#fff',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {i === 2 ? (
                    <div style={{ display: 'grid', placeItems: 'center', ...pop(t, 94.48) }}>
                      <Icon name="spark" size={40} color={GREEN} />
                    </div>
                  ) : (
                    <div style={sans(22, { fontWeight: 600 })}>{i + 1}</div>
                  )}
                </div>
              ))}
              <div style={{ position: 'absolute', left: 340, top: 140, ...enter(t, 94.6, { y: 10 }) }}>
                <Chip size={22} icon="spark">AI-powered action</Chip>
              </div>
              <div style={{ position: 'absolute', left: 20, top: 230, display: 'flex', gap: 14, alignItems: 'center', ...enter(t, 98.96, { y: 10 }) }}>
                <Icon name="lock" size={36} />
                <div style={sans(26)}>Sequence and rules set ahead of time</div>
              </div>
            </div>
          </Card>
        </Abs>
      </div>
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center', opacity: merge }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <div style={{ textAlign: 'right', ...enter(t, 101.96, { x: 60, y: 0, dur: 0.9 }) }}>
            <div style={serif(110, { color: GREEN })}>Flexibility</div>
            <div style={sans(30, { color: MUTED })}>of AI reasoning</div>
          </div>
          <div style={{ ...serif(110, { color: MUTED }), ...pop(t, 103.4) }}>+</div>
          <div style={enter(t, 104.24, { x: -60, y: 0, dur: 0.9 })}>
            <div style={serif(110)}>Consistency</div>
            <div style={sans(30, { color: MUTED })}>of a repeatable process</div>
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};

const S6Commitments: React.FC<{ t: number }> = ({ t }) => {
  const items = [
    { who: 'Taylor', task: 'Launch readiness checklist', state: 'In the tracker · deadline changed', at: 114.72, tag: 'Propose an update', tagAt: 131.6, tone: 'lime' as const, icon: 'loop' as IconName, note: 'Taylor’s checklist has a new deadline' },
    { who: 'Chris', task: 'Prepare onboarding FAQs', state: 'Not in the tracker · new commitment', at: 120.32, tag: 'Suggest a new action', tagAt: 134.4, tone: 'lime' as const, icon: 'check' as IconName, note: 'Chris will prepare onboarding FAQs' },
    { who: 'Customer escalation', task: 'Follow up with the customer', state: 'No owner · no deadline', at: 123.84, tag: 'Ask for clarification', tagAt: 136.0, tone: 'amber' as const, icon: 'question' as IconName, note: 'Customer escalation needs a follow-up' },
  ];
  const bar = (w: number, k: number) => <div key={k} style={{ height: 14, width: w, borderRadius: 7, background: '#E9ECE5' }} />;
  return (
    <>
      <Label t={t} at={107.25}>Back to our agent</Label>
      {/* Meeting notes */}
      <Abs x={80} y={160} w={700} h={760} style={enter(t, 107.4, { y: 30 })}>
        <Card style={{ height: 760, padding: 44 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Icon name="doc" size={40} />
              <div style={serif(34)}>Weekly team meeting</div>
            </div>
            <Chip size={18}>Approved notes</Chip>
          </div>
          <div style={{ marginTop: 40, display: 'grid', gap: 18 }}>
            {bar(520, 1)}
            {bar(600, 2)}
            {items.map((it, i) => (
              <React.Fragment key={it.who}>
                <div style={{ ...sans(26), ...mark(t, it.at + 0.1), padding: '4px 6px', ...enter(t, 109.0 + i * 0.4, { y: 0 }) }}>{it.note}</div>
                {bar(440 + i * 60, 10 + i)}
              </React.Fragment>
            ))}
            {bar(560, 20)}
          </div>
          <div style={{ marginTop: 44, ...sans(24, { color: MUTED }), ...enter(t, 111.0, { y: 8 }) }}>
            The agent finds <b style={{ color: INK }}>three commitments</b>
          </div>
        </Card>
      </Abs>
      {items.map((it, i) => {
        const p = prog(t, it.at - LEAD, 0.8);
        return (
          <Abs key={it.who} x={880 + (1 - p) * -260} y={170 + i * 250} w={960} h={220} style={{ opacity: p }}>
            <Card style={{ height: 220, padding: '30px 36px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24 }} lit={between(t, it.tagAt, it.tagAt + 1.5)}>
              <div>
                <div style={kicker}>{it.who}</div>
                <div style={{ ...serif(38), marginTop: 8 }}>{it.task}</div>
                <div style={{ ...sans(24, { color: MUTED }), marginTop: 10 }}>{it.state}</div>
              </div>
              <div style={pop(t, it.tagAt)}>
                <Chip tone={it.tone} size={24} icon={it.icon}>{it.tag}</Chip>
              </div>
            </Card>
          </Abs>
        );
      })}
      <Abs x={880} y={930} w={960} style={{ ...sans(28), opacity: between(t, 127.9, 137.9) }}>
        <span style={{ color: MUTED }}>For each one, the agent decides </span>what to recommend.
      </Abs>
      <Abs x={880} y={930} w={960} style={{ ...sans(28), opacity: prog(t, 138.0, 0.5) }}>
        That’s where <span style={mark(t, 138.6)}>AI reasoning is valuable.</span>
      </Abs>
    </>
  );
};

const S7FlowFetch: React.FC<{ t: number }> = ({ t }) => {
  const agent: [number, number] = [330, 560];
  const flowL: [number, number] = [700, 560];
  const flowR: [number, number] = [1180, 560];
  const trackL: [number, number] = [1300, 560];
  const rows = [
    ['Launch readiness checklist', 'Taylor', '11/5/2026'],
    ['Monthly supplier report', 'Jordan', '11/12/2026'],
  ];
  const showFlow = prog(t, 153.19 - LEAD, 0.7);
  const head = (a: number, b: number) => ({ opacity: between(t, a, b, 0.4) });
  return (
    <>
      <Label t={t} at={140.7}>Reliable information</Label>
      <Abs x={80} y={140} w={1760} style={head(140.6, 146.4)}>
        <div style={{ ...serif(52), ...enter(t, 140.72) }}>
          The agent needs <span style={mark(t, 142.96)}>reliable information</span> about what’s already in the tracker.
        </div>
      </Abs>
      <Abs x={80} y={140} w={1760} style={head(146.5, 153.0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ transform: `rotate(${(t - 146.5) * 90}deg)` }}>
            <Icon name="loop" size={58} color={GREEN} stroke={2.2} />
          </div>
          <div style={serif(52)}>
            Retrieving records is a <span style={mark(t, 147.6)}>repeatable task.</span>
          </div>
        </div>
        <div style={{ ...sans(28, { color: MUTED }), marginTop: 12, ...enter(t, 150.64, { y: 8 }) }}>The agent shouldn’t have to work out the process every time.</div>
      </Abs>
      <Abs x={80} y={140} w={1760} style={head(153.1, 1e6)}>
        <div style={serif(52)}>
          So we define that process in an <span style={{ color: GREEN }}>Agent Flow</span>.
        </div>
      </Abs>

      {/* Agent */}
      <Abs x={80} y={400} w={500} h={320} style={enter(t, 140.9, { y: 30 })}>
        <Card style={{ height: 320, padding: 32, display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 16, textAlign: 'center' }} lit={between(t, 162.2, 166.5)}>
          <IconDot name="spark" size={84} />
          <div style={serif(34)}>Follow-Up Agent</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', ...enter(t, 163.36, { y: 8 }) }}>
            <Icon name="doc" size={30} color={MUTED} />
            <div style={sans(22, { color: MUTED })}>compares with the meeting notes</div>
          </div>
        </Card>
      </Abs>
      {/* Tracker */}
      <Abs x={1300} y={340} w={540} h={440} style={enter(t, 141.4, { y: 30 })}>
        <Card style={{ height: 440, padding: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon name="table" size={36} />
            <div style={serif(30)}>Team Action Tracker</div>
          </div>
          <div style={{ ...sans(18, { color: MUTED }), marginTop: 4 }}>SharePoint list</div>
          <div style={{ marginTop: 26, display: 'grid', gap: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr 1.1fr', ...sans(18, { color: MUTED, fontWeight: 600 }), paddingBottom: 10, borderBottom: `2px solid ${LINE}` }}>
              <div>Task</div>
              <div>Owner</div>
              <div>Due</div>
            </div>
            {rows.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.9fr 1fr 1.1fr', ...sans(20), padding: '16px 0', borderBottom: `2px solid ${LINE}`, background: between(t, 156.4 + i * 0.6, 158.5 + i * 0.6) > 0.5 ? '#F2FAEA' : 'transparent' }}>
                <div>{r[0]}</div>
                <div>{r[1]}</div>
                <div>{r[2]}</div>
              </div>
            ))}
          </div>
        </Card>
      </Abs>
      {/* The flow between them */}
      <div style={{ opacity: showFlow }}>
        <Wire pts={[[580, 560], flowL]} p={prog(t, 153.4, 0.5)} color={INK} width={3} />
        <Wire pts={[flowR, trackL]} p={prog(t, 153.6, 0.5)} color={INK} width={3} />
        <Abs x={700} y={470} w={480} h={180} style={pop(t, 153.19)}>
          <Card style={{ height: 180, padding: '22px 26px', background: '#FBFDF8' }} lit={0.5}>
            <div style={{ ...kicker, fontSize: 17 }}>Agent Flow</div>
            <div style={{ ...serif(30), marginTop: 6 }}>Check Team Action Tracker</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              {(['Get items', 'Select', 'Respond'] as const).map((s, i) => (
                <div key={s} style={{ ...sans(17, { fontWeight: 600 }), padding: '6px 12px', borderRadius: 8, background: '#fff', border: `2px solid ${LINE}`, ...pop(t, 154.0 + i * 0.3) }}>{s}</div>
              ))}
            </div>
          </Card>
        </Abs>
        {/* records travelling tracker -> flow -> agent */}
        {[0, 1, 2, 3].map((k) => {
          const u = prog(t, 156.52 + k * 0.7, 2.2, IN_OUT);
          if (u <= 0 || u >= 1) return null;
          const [x, y] = pointOn([trackL, flowR, flowL, [580, 560]], u);
          return <div key={k} style={{ position: 'absolute', left: x - 26, top: y - 12, width: 52, height: 24, borderRadius: 6, background: LIME, opacity: 0.9 }} />;
        })}
      </div>
      {/* Consistent format */}
      <Abs x={80} y={740} w={500} style={enter(t, 160.64, { y: 12 })}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['ID', 'Title', 'Owner', 'DueDate', 'Status'].map((f) => (
            <div key={f} style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 18, padding: '5px 10px', borderRadius: 6, background: SOFT, border: `2px solid ${LINE}` }}>{f}</div>
          ))}
        </div>
        <div style={{ ...sans(20, { color: MUTED }), marginTop: 10 }}>Same fields, same format, every time</div>
      </Abs>
      {/* Who does what */}
      <Abs x={700} y={700} w={480} style={{ textAlign: 'center', ...enter(t, 167.52, { y: 12 }) }}>
        <div style={kicker}>The flow</div>
        <div style={serif(32)}>defines <span style={mark(t, 168.4)}>how</span> records are retrieved</div>
      </Abs>
      <Abs x={80} y={870} w={500} style={{ textAlign: 'center', ...enter(t, 170.4, { y: 12 }) }}>
        <div style={kicker}>The agent</div>
        <div style={serif(32)}>decides <span style={mark(t, 171.1)}>what they mean</span></div>
      </Abs>
    </>
  );
};

const LEVELS = ['Suggest', 'Prepare', 'Act with approval', 'Act within bounds', 'Run and escalate'];
const S8Dial: React.FC<{ t: number }> = ({ t }) => {
  const cx = 460;
  const cy = 720;
  const R = 290;
  // Needle settles per action: within bounds (retrieve) -> prepare (recommend) -> act with approval (write).
  const STOPS: [number, number][] = [
    [176.9, 270],
    [186.9, 315],
    [193.1, 225],
    [210.3, 270],
  ];
  let ang = 180;
  for (const [at, deg] of STOPS) ang += (deg - ang) * prog(t, at, 0.9, IN_OUT);
  const shake = t > 224.3 && t < 226.0 ? Math.sin((t - 224.3) * 40) * 4 * (1 - prog(t, 224.3, 1.7)) : 0;
  const statement = prog(t, 231.5, 0.7, IN_OUT);
  const actions = [
    { at: 178.9, title: 'Retrieve tracker records', sub: 'Read-only flow: never creates, updates, or deletes', chip: 'Act within bounds', chipAt: 186.94, extra: 'No confirmation needed', extraAt: 190.18, tone: 'lime' as const },
    { at: 193.1, title: 'Prepare recommendations', sub: 'A person reviews them before any change', chip: 'Prepare', chipAt: 194.0, extra: '', extraAt: 0, tone: 'lime' as const },
    { at: 201.3, title: 'Add Chris’s commitment to SharePoint', sub: 'Changes information in a real system', chip: 'Act with approval', chipAt: 210.3, extra: 'Confirm before it runs · or an approval step', extraAt: 213.0, tone: 'lime' as const },
    { at: 222.2, title: 'Create the customer escalation action', sub: 'Owner and deadline are missing', chip: 'Stop and ask', chipAt: 224.34, extra: '', extraAt: 0, tone: 'amber' as const },
  ];
  const labelPos = (i: number) => {
    const a = ((180 + i * 45) * Math.PI) / 180;
    return [cx + (R + 64) * Math.cos(a), cy + (R + 64) * Math.sin(a)];
  };
  return (
    <>
      <Label t={t} at={173.0}>Where human control fits</Label>
      <div style={{ opacity: 1 - statement }}>
        <Abs x={80} y={130} w={820} style={{ opacity: between(t, 172.9, 176.0) }}>
          <div style={serif(52)}>So where do people fit into this system?</div>
        </Abs>
        <Abs x={80} y={130} w={820} style={enter(t, 176.06)}>
          <div style={{ opacity: prog(t, 176.0, 0.4) }}>
            <div style={serif(52)}>
              Our <span style={mark(t, 176.86)}>autonomy dial</span>
            </div>
            <div style={{ ...sans(24, { color: MUTED }), marginTop: 8 }}>The right authority for each action</div>
          </div>
        </Abs>
        {/* Dial */}
        <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0, opacity: prog(t, 176.2, 0.7) }}>
          <path d={`M${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`} fill="none" stroke={LINE} strokeWidth={34} strokeLinecap="round" />
          <path
            d={`M${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
            fill="none"
            stroke={LIME}
            strokeWidth={34}
            strokeLinecap="round"
            strokeDasharray={`${Math.PI * R} ${Math.PI * R}`}
            strokeDashoffset={Math.PI * R * (1 - (ang - 180) / 180)}
            opacity={0.85}
          />
          {LEVELS.map((_, i) => {
            const a = ((180 + i * 45) * Math.PI) / 180;
            const on = Math.abs(ang - (180 + i * 45)) < 8;
            return <circle key={i} cx={cx + R * Math.cos(a)} cy={cy + R * Math.sin(a)} r={on ? 20 : 13} fill={on ? INK : '#fff'} stroke={INK} strokeWidth={4} />;
          })}
          <g transform={`rotate(${ang + shake} ${cx} ${cy})`}>
            <path d={`M${cx} ${cy} L${cx + R - 70} ${cy}`} stroke={INK} strokeWidth={10} strokeLinecap="round" />
          </g>
          <circle cx={cx} cy={cy} r={34} fill={LIME} stroke={INK} strokeWidth={5} />
        </svg>
        {LEVELS.map((l, i) => {
          const [x, y] = labelPos(i);
          const on = Math.abs(ang - (180 + i * 45)) < 8;
          const alignLeft = i > 2;
          return (
            <div
              key={l}
              style={{
                position: 'absolute',
                left: i === 2 ? x - 150 : alignLeft ? x - 30 : x - 270,
                top: y - 20,
                width: 300,
                textAlign: i === 2 ? 'center' : alignLeft ? 'left' : 'right',
                ...sans(24, { fontWeight: on ? 700 : 500, color: on ? INK : MUTED }),
                opacity: prog(t, 176.6 + i * 0.15, 0.5),
              }}
            >
              {l}
            </div>
          );
        })}
        {/* Actions */}
        {actions.map((a, i) => (
          <Abs key={a.title} x={1080} y={180 + i * 186} w={760} h={168} style={enter(t, a.at, { x: 30, y: 0 })}>
            <Card style={{ height: 168, padding: '22px 28px', display: 'grid', alignContent: 'center', gap: 8, background: a.tone === 'amber' && t > a.chipAt ? '#FFFCF1' : '#fff' }} lit={a.tone === 'lime' ? between(t, a.chipAt, a.chipAt + 1.6) : 0}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                <div style={serif(30)}>{a.title}</div>
                <div style={pop(t, a.chipAt)}>
                  <Chip tone={a.tone} size={20} icon={a.tone === 'amber' ? 'stop' : undefined}>{a.chip}</Chip>
                </div>
              </div>
              <div style={sans(22, { color: MUTED })}>{a.sub}</div>
              {a.extra && (
                <div style={{ ...sans(20, { fontWeight: 600, color: GREEN }), ...enter(t, a.extraAt, { y: 6 }) }}>{a.extra}</div>
              )}
            </Card>
          </Abs>
        ))}
      </div>
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center', opacity: statement }}>
        <div style={{ textAlign: 'center', maxWidth: 1500 }}>
          <div style={{ ...serif(64, { color: MUTED }), ...enter(t, 231.74) }}>The goal isn’t maximum autonomy.</div>
          <div style={{ ...serif(84), marginTop: 36, ...enter(t, 234.14, { dur: 0.9 }) }}>
            It’s the <span style={mark(t, 235.42)}>right authority</span> for each action, with{' '}
            <span style={mark(t, 237.82)}>people involved</span> where their judgment is needed.
          </div>
        </div>
      </AbsoluteFill>
    </>
  );
};

const S9Assembled: React.FC<{ t: number }> = ({ t }) => {
  const frame: [number, number, number, number] = [160, 240, 1600, 680];
  const ring: [number, number][] = [
    [frame[0], frame[1]],
    [frame[0] + frame[2], frame[1]],
    [frame[0] + frame[2], frame[1] + frame[3]],
    [frame[0], frame[1] + frame[3]],
    [frame[0], frame[1]],
  ];
  const over = prog(t, 284.8, 0.6, IN_OUT);
  const agentLines: [string, number][] = [
    ['Interprets the meeting notes', 247.66],
    ['Decides when it needs tracker data', 249.3],
    ['Prepares recommendations', 252.1],
  ];
  const tag = (text: string, at: number, x: number, y: number) => (
    <Abs x={x} y={y} style={{ ...pop(t, at), zIndex: 5 }}>
      <Chip tone="ink" size={22}>{text}</Chip>
    </Abs>
  );
  return (
    <>
      <Label t={t} at={240.8}>Bringing it all together</Label>
      <Abs x={80} y={120} w={1760} style={{ opacity: 1 - over }}>
        <div style={{ ...serif(48), ...enter(t, 240.78) }}>How these components form an agentic system</div>
      </Abs>
      <Abs x={80} y={120} w={1760} style={{ opacity: over }}>
        <div style={serif(48)}>
          Our OVER framework, <span style={mark(t, 294.26)}>put into practice</span>
        </div>
      </Abs>
      {/* Human oversight boundary */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <rect x={frame[0]} y={frame[1]} width={frame[2]} height={frame[3]} rx={36} fill={interpolateColor('#FFFFFF', '#F7FBF2', prog(t, 269.5, 0.8))} stroke={LIME} strokeWidth={4} strokeDasharray="14 12" opacity={prog(t, 269.4, 0.8)} />
      </svg>
      <Abs x={frame[0] + 40} y={frame[1] - 22} style={pop(t, 269.5)}>
        <Chip size={22} icon="person">Human oversight</Chip>
      </Abs>
      {t > 277.8 && <Pulse pts={ring} u={((t - 277.8) / 6) % 1} opacity={prog(t, 277.8, 0.4) * (1 - over * 0.6)} />}
      <div style={{ position: 'absolute', left: frame[0] + 40, top: frame[1] + frame[3] - 80, display: 'flex', gap: 16 }}>
        {([['Acts on its own', 272.3], ['Requires approval', 273.26], ['Stops and asks', 275.58]] as [string, number][]).map(([s, at]) => (
          <div key={s} style={pop(t, at)}>
            <Chip tone="line" size={20}>{s}</Chip>
          </div>
        ))}
      </div>
      {/* Wires */}
      <Wire pts={[[620, 470], [720, 470]]} p={prog(t, 254.3, 0.5)} color={INK} width={3} />
      <Wire pts={[[1200, 470], [1300, 470]]} p={prog(t, 259.9, 0.5)} color={INK} width={3} />
      <Wire pts={[[960, 660], [960, 700]]} p={prog(t, 264.9, 0.4)} color={INK} width={3} />
      {/* Agent */}
      <Abs x={720} y={300} w={480} h={360} style={pop(t, 244.3)}>
        <Card style={{ height: 360, padding: 30 }} lit={between(t, 244.3, 246.5)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <IconDot name="spark" size={60} />
            <div>
              <div style={serif(34)}>Agent</div>
              <div style={sans(20, { color: MUTED })}>Reasoning and orchestration</div>
            </div>
          </div>
          <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
            {agentLines.map(([s, at]) => (
              <div key={s} style={{ display: 'flex', gap: 12, alignItems: 'center', ...enter(t, at, { x: -12, y: 0 }) }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, background: LIME, flex: 'none' }} />
                <div style={sans(22)}>{s}</div>
              </div>
            ))}
          </div>
        </Card>
      </Abs>
      {/* Knowledge */}
      <Abs x={240} y={380} w={380} h={180} style={pop(t, 254.2)}>
        <Card style={{ height: 180, padding: 26 }} lit={between(t, 254.2, 256.4)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconDot name="doc" size={52} />
            <div style={serif(30)}>Knowledge</div>
          </div>
          <div style={{ ...sans(22, { color: MUTED }), marginTop: 14, ...enter(t, 257.98, { y: 6 }) }}>Approved weekly meeting notes</div>
        </Card>
      </Abs>
      {/* Tools */}
      <Abs x={1300} y={380} w={380} h={180} style={pop(t, 259.8)}>
        <Card style={{ height: 180, padding: 26 }} lit={between(t, 259.8, 262)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconDot name="plug" size={52} />
            <div style={serif(30)}>Tools and connectors</div>
          </div>
          <div style={{ ...sans(22, { color: MUTED }), marginTop: 14, ...enter(t, 263.42, { y: 6 }) }}>Interact with SharePoint</div>
        </Card>
      </Abs>
      {/* Agent Flows */}
      <Abs x={720} y={700} w={480} h={140} style={pop(t, 264.86)}>
        <Card style={{ height: 140, padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 18 }} lit={between(t, 264.86, 267)}>
          <IconDot name="flow" size={56} bg={AMBER_SOFT} />
          <div>
            <div style={serif(30)}>Agent Flows</div>
            <div style={{ ...sans(20, { color: MUTED }), ...enter(t, 267.74, { y: 6 }) }}>Predictable steps, one repeatable process</div>
          </div>
        </Card>
      </Abs>
      {/* OVER mapping */}
      {tag('Needs judgment', 287.3, 1010, 280)}
      {tag('Fixed rules', 288.94, 1050, 690)}
      {tag('People involved', 290.74, 1460, 220)}
    </>
  );
};

const S10WhenFlow: React.FC<{ t: number }> = ({ t }) => {
  const rows = [
    { at: 299.42, cond: 'A single tool call does the job', out: 'A tool call may be enough', tone: 'line' as const, icon: 'plug' as IconName },
    { at: 302.94, cond: 'Several steps should run consistently and return a predictable result', out: 'Use an Agent Flow', tone: 'lime' as const, icon: 'flow' as IconName },
    { at: 309.36, cond: 'The decision involves uncertainty', out: 'AI reasoning or human input', tone: 'amber' as const, icon: 'question' as IconName },
  ];
  const src: [number, number] = [520, 560];
  return (
    <>
      <Label t={t} at={296.5}>Choosing the right tool</Label>
      <Abs x={80} y={140} w={1760} style={enter(t, 296.54)}>
        <div style={serif(56)}>
          Not every action needs an <span style={{ color: GREEN }}>Agent Flow</span>.
        </div>
      </Abs>
      <Abs x={80} y={470} w={440} h={180} style={pop(t, 297.2)}>
        <Card style={{ height: 180, padding: 30, display: 'grid', alignContent: 'center' }}>
          <div style={kicker}>For each step, ask</div>
          <div style={{ ...serif(34), marginTop: 8 }}>What does this step need?</div>
        </Card>
      </Abs>
      {rows.map((r, i) => {
        const y = 300 + i * 260;
        return (
          <React.Fragment key={r.out}>
            <Wire pts={[src, [600, src[1]], [600, y + 70], [660, y + 70]]} p={prog(t, r.at - 0.4, 0.6)} color={r.tone === 'lime' ? LIME : '#C9CFC2'} width={r.tone === 'lime' ? 5 : 4} />
            <Abs x={660} y={y} w={680} h={140} style={enter(t, r.at, { x: -20, y: 0 })}>
              <Card style={{ height: 140, padding: '0 30px', display: 'grid', alignContent: 'center' }} lit={r.tone === 'lime' ? between(t, r.at, r.at + 2) : 0}>
                <div style={sans(28)}>{r.cond}</div>
              </Card>
            </Abs>
            <Wire pts={[[1340, y + 70], [1400, y + 70]]} p={prog(t, r.at + 0.5, 0.3)} color={INK} width={3} arrow />
            <Abs x={1410} y={y + 40} style={pop(t, r.at + 0.8)}>
              <Chip tone={r.tone} size={24} icon={r.icon}>{r.out}</Chip>
            </Abs>
          </React.Fragment>
        );
      })}
    </>
  );
};

const S11Goal: React.FC<{ t: number }> = ({ t }) => {
  const parts: [string, number, string][] = [
    ['AI reasoning', 318.3, LIME_SOFT],
    ['Reliable execution', 320.38, AMBER_SOFT],
    ['The right human control', 322.22, '#fff'],
  ];
  return (
    <AbsoluteFill style={{ display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center', display: 'grid', justifyItems: 'center', gap: 70 }}>
        <div style={{ ...serif(56, { color: MUTED }), ...enter(t, 315.34) }}>
          The goal isn’t to{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            make every step intelligent
            <span style={{ position: 'absolute', left: -6, right: -6, top: '54%', height: 5, background: INK, transform: `scaleX(${prog(t, 316.9, 0.6, IN_OUT)})`, transformOrigin: 'left' }} />
          </span>
          .
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {parts.map(([s, at, bg], i) => (
            <React.Fragment key={s}>
              {i > 0 && <div style={{ ...serif(72, { color: MUTED }), ...pop(t, at - 0.2) }}>+</div>}
              <div style={{ ...pop(t, at), padding: '28px 40px', borderRadius: 24, background: bg, border: `3px solid ${i === 2 ? INK : i === 0 ? LIME : AMBER}` }}>
                <div style={serif(56)}>{s}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const S12Next: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Label t={t} at={324.7}>Next</Label>
    <Abs x={80} y={200} w={820}>
      <div style={{ ...sans(32, { color: MUTED }), ...enter(t, 324.7) }}>Next, we’ll build an Agent Flow called</div>
      <div style={{ ...serif(84), marginTop: 18, ...enter(t, 327.1, { dur: 0.9, y: 30 }) }}>Check Team Action Tracker</div>
      <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 0, ...enter(t, 329.06, { y: 10 }) }}>
        <Chip tone="lime" size={24} icon="flow">Agent Flow</Chip>
        <div style={{ width: 90, height: 4, background: INK, transform: `scaleX(${prog(t, 329.4, 0.6, IN_OUT)})`, transformOrigin: 'left' }} />
        <Chip tone="line" size={24} icon="spark">Follow-Up Agent</Chip>
      </div>
      <div style={{ marginTop: 56, display: 'flex', gap: 18, alignItems: 'center', ...enter(t, 332.7, { y: 10 }) }}>
        <IconDot name="person" size={64} />
        <div style={sans(32)}>
          Every proposed change stays <span style={mark(t, 339.0)}>subject to human review.</span>
        </div>
      </div>
    </Abs>
    <Abs x={980} y={190} style={enter(t, 325.0, { y: 40 })}>
      <Shot src="05e-rebuilt-published.png" w={860} h={640} cx={0.5} cy={0.42} scale={1.8} p={prog(t, 326.0, 2.0, IN_OUT)} />
    </Abs>
  </>
);

const Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Audio src={staticFile('audio/agent-to-agentic-system.mp3')} />
      <Scene t={t} index={0}><S1FirstAgent t={t} /></Scene>
      <Scene t={t} index={1}><S2System t={t} /></Scene>
      <Scene t={t} index={2}><S3JudgmentProcess t={t} /></Scene>
      <Scene t={t} index={3}><S4FlowBuild t={t} /></Scene>
      <Scene t={t} index={4}><S5AgentVsFlow t={t} /></Scene>
      <Scene t={t} index={5}><S6Commitments t={t} /></Scene>
      <Scene t={t} index={6}><S7FlowFetch t={t} /></Scene>
      <Scene t={t} index={7}><S8Dial t={t} /></Scene>
      <Scene t={t} index={8}><S9Assembled t={t} /></Scene>
      <Scene t={t} index={9}><S10WhenFlow t={t} /></Scene>
      <Scene t={t} index={10}><S11Goal t={t} /></Scene>
      <Scene t={t} index={11} fadeOutAt={341.0}><S12Next t={t} /></Scene>
      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const AgentToAgenticSystem: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence from={AGENT_TO_AGENTIC_TITLE_FRAMES}>
      <Body />
    </Sequence>
    <Sequence durationInFrames={AGENT_TO_AGENTIC_TITLE_FRAMES} style={{ zIndex: 100 }}>
      <TitleCardGreen label="MICROSOFT COPILOT STUDIO" title={'From an Agent to an Agentic System\nwith Agent Flows'} />
    </Sequence>
  </AbsoluteFill>
);
