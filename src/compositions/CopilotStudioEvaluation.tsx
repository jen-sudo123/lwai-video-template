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

// Evaluate, Monitor and Improve Your Agent (Copilot Studio course).
// Custom animated build, aligned with AgentToAgenticSystem.tsx (same course): same primitives
// (Card, Chip, Wire, Pulse, Shot, mark), 90-frame green title card before the VO, crossfaded scenes.
// The template build of this lesson stays available as composition CopilotStudioEvaluationTemplate.
// Audio: audio/copilot-studio-evaluation.mp3 (ElevenLabs, Daan, unpadded, 315.2s).
// Every cue is in SECONDS of that VO, from the ElevenLabs Scribe word timestamps in
// src/data/copilot-studio-evaluation.transcript.json.
// Screenshots: public/copilot-studio-evaluation/images/ (Edge-verified walkthrough, Drive folder
// 1ZmsjEBxjXdfYtUXxPCAkbuEp6LS2V3EV).
//
//  #   scene                                start   VO cue
//  1   Where we left off                    0.0     "In the last lesson, we built an agent flow…"
//  2   One test isn't enough                15.7    "That was a useful first check…"
//  3   Evaluation: anatomy of a test case   40.8    "Let's start with evaluation."
//  4   Three commitments, three test cases  61.8    "In our example, the meeting notes include three commitments…"
//  5   Same inputs, every run               94.1    "Each test focuses on a specific decision."
//  6   Three checks; 1 outcome accuracy     111.2   "When we evaluate the agent, there are three things to check…"
//  7   2 Process execution                  138.6   "Second, process execution."
//  8   3 Boundary compliance                165.6   "Third, boundary compliance."
//  9   The checks work together             188.9   "These three checks work together."
//  10  Monitoring: regular use              198.5   "Once we've evaluated specific scenarios…"
//  11  Patterns worth investigating         212.6   "Perhaps the agent repeatedly fails at the same step…"
//  12  The improvement loop                 227.6   "We can bring evaluation and monitoring together…"
//  13  Reliable, based on evidence          287.0   "Building a reliable agent takes more than…"
//  14  Next: put it into practice           308.8   "Now, let's put this process into practice…"

export const COPILOT_STUDIO_EVALUATION_TITLE_FRAMES = 90;
export const COPILOT_STUDIO_EVALUATION_DURATION_S = 316.6;

const STARTS = [0, 15.7, 40.8, 61.8, 94.1, 111.2, 138.6, 165.6, 188.9, 198.5, 212.6, 227.6, 287.0, 308.8];

const CROSSFADE = 0.6;
const LEAD = 0.15;
const IMG = 'copilot-studio-evaluation/images/';

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


// ---------- shared pieces for this lesson ----------

const RED = '#D64545';
const RED_SOFT = '#FBE3E3';

const Tick: React.FC<{ t: number; at: number; size?: number; tone?: 'lime' | 'amber' }> = ({ t, at, size = 40, tone = 'lime' }) => (
  <div style={{ ...pop(t, at), width: size, height: size, borderRadius: size / 2, background: tone === 'lime' ? LIME : AMBER, display: 'grid', placeItems: 'center', flex: 'none' }}>
    <Icon name={tone === 'lime' ? 'check' : 'question'} size={size * 0.64} color={tone === 'lime' ? '#fff' : INK} stroke={3} />
  </div>
);

// The three evaluation checks, as a strip across the top. `focus` = index lit (or -1 for all equal).
const CHECKS: { name: string; q: string; icon: IconName }[] = [
  { name: 'Outcome accuracy', q: 'The right result?', icon: 'check' },
  { name: 'Process execution', q: 'The intended workflow?', icon: 'flow' },
  { name: 'Boundary compliance', q: 'Within its limits?', icon: 'lock' },
];
const CheckStrip: React.FC<{ t: number; focus: number; appear?: number[]; y?: number }> = ({ t, focus, appear, y = 130 }) => (
  <>
    {CHECKS.map((c, i) => {
      const dim = focus >= 0 && focus !== i ? 0.38 : 1;
      const st = appear ? pop(t, appear[i]) : {};
      return (
        <Abs key={c.name} x={80 + i * 600} y={y} w={560} h={120} style={{ ...st, opacity: (typeof st.opacity === 'number' ? st.opacity : 1) * dim }}>
          <Card style={{ height: 120, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px' }} lit={focus === i ? 1 : 0}>
            <IconDot name={c.icon} size={60} bg={focus === i ? LIME_SOFT : SOFT} />
            <div>
              <div style={{ ...kicker, fontSize: 16 }}>Check {i + 1}</div>
              <div style={serif(32)}>{c.name}</div>
            </div>
          </Card>
        </Abs>
      );
    })}
  </>
);

// ---------- scenes ----------

const S1LeftOff: React.FC<{ t: number }> = ({ t }) => {
  const steps: [string, number, IconName][] = [
    ['Agent', 1.3, 'spark'],
    ['Agent Flow', 1.96, 'flow'],
    ['SharePoint tracker', 7.48, 'table'],
  ];
  const xs = [80, 380, 680];
  return (
    <>
      <Label t={t} at={0.2}>Where we left off</Label>
      <Abs x={80} y={140} w={860} style={enter(t, 0.3)}>
        <div style={serif(52)}>Weekly Team Action Follow-Up Agent</div>
      </Abs>
      {steps.map(([text, at, icon], i) => (
        <Abs key={text} x={xs[i]} y={300} w={260} h={150} style={pop(t, at)}>
          <Card style={{ height: 150, display: 'grid', placeItems: 'center', alignContent: 'center', gap: 10 }} lit={between(t, at, at + 1.4)}>
            <IconDot name={icon} size={60} />
            <div style={sans(24, { fontWeight: 600 })}>{text}</div>
          </Card>
        </Abs>
      ))}
      <Wire pts={[[340, 375], [380, 375]]} p={prog(t, 2.2, 0.4)} color={INK} arrow />
      <Wire pts={[[640, 375], [680, 375]]} p={prog(t, 7.6, 0.4)} color={INK} arrow />
      <Abs x={80} y={470} w={860} style={{ ...sans(26, { color: MUTED }), ...enter(t, 5.64, { y: 8 }) }}>
        The flow retrieves <span style={{ ...mark(t, 6.2), color: INK }}>existing commitments</span> from SharePoint.
      </Abs>
      {/* The first test */}
      <Abs x={80} y={580} w={860} h={330} style={enter(t, 8.76, { y: 30 })}>
        <Card style={{ height: 330, padding: '30px 36px', display: 'grid', alignContent: 'start', gap: 18 }} lit={between(t, 13.6, 15.4)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Chip size={18} icon="doc">From the agent build plan</Chip>
            <div style={{ ...kicker, fontSize: 16 }}>Test 1</div>
          </div>
          <div style={sans(28)}>Review Taylor’s launch readiness checklist in the approved November 3 meeting notes.</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={sans(24, { color: MUTED, ...enter(t, 12.28, { y: 0 }) })}>Did it prepare the recommendation we expected?</div>
            <div style={pop(t, 13.6)}><Chip tone="lime" size={22} icon="check">Update</Chip></div>
          </div>
        </Card>
      </Abs>
      <Abs x={1000} y={170} style={enter(t, 1.0, { y: 40 })}>
        <Shot src="17-flow-retrieval-only-steps.png" w={840} h={600} cx={0.52} cy={0.42} scale={1.9} p={prog(t, 3.0, 1.8, IN_OUT)} />
        <div style={{ ...sans(22, { color: MUTED }), marginTop: 16, ...enter(t, 4.4, { y: 8 }) }}>The Check Team Action Tracker flow</div>
      </Abs>
    </>
  );
};

const S2NotEnough: React.FC<{ t: number }> = ({ t }) => {
  const C: [number, number] = [960, 470];
  const whatIfs: { label: string; sub: string; at: number; x: number; y: number; icon: IconName }[] = [
    { label: 'Missing information', sub: 'Key details are absent', at: 25.6, x: 120, y: 300, icon: 'question' },
    { label: 'Task already exists', sub: 'It’s in the tracker', at: 26.76, x: 1360, y: 300, icon: 'table' },
    { label: 'Something new', sub: 'Not handled before', at: 29.62, x: 740, y: 640, icon: 'spark' },
  ];
  const W = 440;
  const H = 120;
  const anchors: [number, number][] = [[120 + W, 360], [1360, 360], [960, 640]];
  const shrink = prog(t, 32.66, 0.8, IN_OUT);
  return (
    <>
      <Label t={t} at={15.9}>A useful first check</Label>
      <Abs x={80} y={120} w={1760} style={{ textAlign: 'center', ...enter(t, 15.9) }}>
        <div style={serif(56)}>
          One successful test doesn’t show <span style={mark(t, 20.4)}>how reliably</span> it works.
        </div>
      </Abs>
      <AbsoluteFill style={{ opacity: 1 - 0.65 * shrink }}>
        {whatIfs.map((n, i) => (
          <Wire key={n.label} pts={[C, anchors[i]]} p={prog(t, n.at - 0.3, 0.5)} color={AMBER} width={3} dash />
        ))}
        <div style={{ position: 'absolute', left: C[0] - 110, top: C[1] - 110, width: 220, height: 220, borderRadius: 110, background: '#fff', border: `3px solid ${LIME}`, display: 'grid', placeItems: 'center', textAlign: 'center', ...pop(t, 16.6) }}>
          <div style={{ display: 'grid', placeItems: 'center', gap: 6 }}>
            <Tick t={t} at={17.0} size={56} />
            <div style={serif(28)}>1 test passed</div>
          </div>
        </div>
        {whatIfs.map((n) => (
          <Abs key={n.label} x={n.x} y={n.y} w={W} h={H} style={pop(t, n.at)}>
            <Card style={{ height: H, display: 'flex', alignItems: 'center', gap: 18, padding: '0 22px', borderColor: AMBER }}>
              <IconDot name={n.icon} size={60} bg={AMBER_SOFT} />
              <div>
                <div style={serif(30)}>{n.label}</div>
                <div style={sans(20, { color: MUTED })}>{n.sub}</div>
              </div>
            </Card>
          </Abs>
        ))}
      </AbsoluteFill>
      <Abs x={80} y={800} w={1760} style={{ textAlign: 'center', ...enter(t, 32.9, { y: 16 }) }}>
        <div style={sans(30, { color: MUTED })}>
          We need a <span style={{ ...mark(t, 34.66), color: INK }}>repeatable way</span> to
        </div>
        <div style={{ marginTop: 22, display: 'flex', gap: 22, justifyContent: 'center' }}>
          <div style={pop(t, 35.82)}><Chip size={28} icon="check">Test its decisions</Chip></div>
          <div style={pop(t, 37.24)}><Chip size={28} icon="question" tone="line">Inspect its actions</Chip></div>
          <div style={pop(t, 38.82)}><Chip size={28} icon="loop" tone="line">Improve its performance</Chip></div>
        </div>
      </Abs>
    </>
  );
};

const S3Evaluation: React.FC<{ t: number }> = ({ t }) => {
  const Y = 420;
  return (
    <>
      <Label t={t} at={41.0}>Part 1 · Evaluation</Label>
      <Abs x={80} y={140} w={1700} style={enter(t, 43.2)}>
        <div style={serif(56)}>
          Does the agent behave <span style={mark(t, 45.9)}>as expected</span> in a defined situation?
        </div>
      </Abs>
      <Abs x={80} y={300} style={{ ...kicker, ...enter(t, 48.9, { y: 10 }) }}>Each test case</Abs>
      <Abs x={80} y={Y} w={760} h={300} style={enter(t, 50.6, { x: -30, y: 0 })}>
        <Card style={{ height: 300, padding: '30px 36px', display: 'grid', alignContent: 'start', gap: 16 }} lit={between(t, 50.98, 52.2)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconDot name="doc" size={52} bg={SOFT} />
            <div style={{ ...kicker, fontSize: 18 }}>The situation</div>
          </div>
          <div style={sans(30)}>Review the customer escalation in the approved November 3 meeting notes.</div>
        </Card>
      </Abs>
      <Wire pts={[[860, Y + 150], [1000, Y + 150]]} p={prog(t, 51.7, 0.5)} color={INK} width={3} arrow />
      <Abs x={1020} y={Y} w={820} h={300} style={enter(t, 51.96, { x: 30, y: 0 })}>
        <Card style={{ height: 300, padding: '30px 36px', display: 'grid', alignContent: 'start', gap: 16 }} lit={1}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <IconDot name="check" size={52} />
            <div style={{ ...kicker, fontSize: 18 }}>The result we expect</div>
          </div>
          <div style={sans(30)}>
            <b>Needs clarification.</b> The owner and deadline are not confirmed.
          </div>
        </Card>
      </Abs>
      <Abs x={80} y={790} w={1760} style={{ display: 'flex', alignItems: 'center', gap: 22, ...enter(t, 53.7, { y: 14 }) }}>
        <div style={pop(t, 55.38)}><Chip size={26} icon="doc" tone="line">Agent build plan · Section 5</Chip></div>
        <div style={sans(28)}>
          <span style={{ color: MUTED }}>You already described </span>
          <span style={mark(t, 58.76)}>your first test</span>
          <span style={{ color: MUTED }}> and </span>
          <span style={mark(t, 59.94)}>what success looks like.</span>
        </div>
      </Abs>
    </>
  );
};

const S4Commitments: React.FC<{ t: number }> = ({ t }) => {
  const items = [
    { who: 'Taylor', task: 'Launch readiness checklist', state: 'In the tracker · deadline changed', at: 65.82, tag: 'Expect: update', tagAt: 82.46, tone: 'lime' as const, icon: 'loop' as IconName, note: 'Taylor’s checklist has a new deadline' },
    { who: 'Chris', task: 'Prepare onboarding FAQs', state: 'Not in the tracker · new commitment', at: 68.86, tag: 'Expect: new action', tagAt: 86.12, tone: 'lime' as const, icon: 'check' as IconName, note: 'Chris will prepare onboarding FAQs' },
    { who: 'Customer escalation', task: 'Follow up with the customer', state: 'No owner · no deadline', at: 70.86, tag: 'Expect: ask to clarify', tagAt: 90.04, tone: 'amber' as const, icon: 'question' as IconName, note: 'Customer escalation needs a follow-up' },
  ];
  const asTests = prog(t, 74.24, 0.6, IN_OUT);
  const bar = (w: number, k: number) => <div key={k} style={{ height: 14, width: w, borderRadius: 7, background: '#E9ECE5' }} />;
  return (
    <>
      <Label t={t} at={62.0}>Our example</Label>
      <Abs x={80} y={160} w={700} h={760} style={enter(t, 62.1, { y: 30 })}>
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
                <div style={{ ...sans(26), ...mark(t, it.at + 0.1), padding: '4px 6px', ...enter(t, 63.1 + i * 0.4, { y: 0 }) }}>{it.note}</div>
                {bar(440 + i * 60, 10 + i)}
              </React.Fragment>
            ))}
            {bar(560, 20)}
          </div>
          <div style={{ marginTop: 44, ...sans(24, { color: MUTED }), ...enter(t, 64.24, { y: 8 }) }}>
            The notes include <b style={{ color: INK }}>three commitments</b>
          </div>
        </Card>
      </Abs>
      {items.map((it, i) => {
        const p = prog(t, it.at - LEAD, 0.8);
        return (
          <Abs key={it.who} x={880 + (1 - p) * -260} y={170 + i * 250} w={960} h={220} style={{ opacity: p }}>
            <Card style={{ height: 220, padding: '30px 36px', display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: 24 }} lit={between(t, it.tagAt, it.tagAt + 1.5)}>
              <div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={kicker}>{it.who}</div>
                  <div style={{ ...kicker, color: GREEN, opacity: asTests }}>· Test case {i + 1}</div>
                </div>
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
      <Abs x={880} y={930} w={960} style={{ ...sans(28), ...enter(t, 74.24, { y: 8 }) }}>
        <span style={{ color: MUTED }}>One scenario, </span>
        <span style={mark(t, 75.62)}>three separate test cases.</span>
      </Abs>
    </>
  );
};

const S5SameInputs: React.FC<{ t: number }> = ({ t }) => {
  const runs = [
    { label: 'Run 1', x: 1000, at: 103.2 },
    { label: 'Run 2', x: 1440, at: 107.6 },
  ];
  const cases = ['Taylor', 'Chris', 'Customer escalation'];
  const inputs: [string, number, IconName][] = [
    ['Same meeting notes', 105.76, 'doc'],
    ['Same SharePoint tracker', 106.56, 'table'],
  ];
  return (
    <>
      <Label t={t} at={94.3}>Why separate tests</Label>
      <Abs x={80} y={140} w={820}>
        <div style={{ ...serif(54), ...enter(t, 94.3) }}>
          Each test focuses on <span style={mark(t, 95.8)}>one specific decision.</span>
        </div>
        <div style={{ marginTop: 40, display: 'grid', gap: 18 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', ...enter(t, 99.28, { x: -20, y: 0 }) }}>
            <Tick t={t} at={100.16} />
            <div style={sans(30)}>See where it performs well</div>
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', ...enter(t, 101.14, { x: -20, y: 0 }) }}>
            <Tick t={t} at={101.38} tone="amber" />
            <div style={sans(30)}>…and where it needs improvement</div>
          </div>
        </div>
        <div style={{ marginTop: 60, ...kicker, ...enter(t, 103.2, { y: 10 }) }}>Repeat under consistent conditions</div>
        <div style={{ marginTop: 18, display: 'grid', gap: 16 }}>
          {inputs.map(([text, at, icon]) => (
            <div key={text} style={pop(t, at)}>
              <Chip size={26} icon={icon} tone="line">{text}</Chip>
            </div>
          ))}
        </div>
      </Abs>
      {runs.map((r, ri) => (
        <Abs key={r.label} x={r.x} y={200} w={400} h={560} style={enter(t, r.at, { y: 30 })}>
          <Card style={{ height: 560, padding: 30, display: 'grid', alignContent: 'start', gap: 22 }} lit={ri === 1 ? between(t, 107.96, 110.6) : 0}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={serif(34)}>{r.label}</div>
              <Icon name="loop" size={34} color={MUTED} />
            </div>
            {cases.map((c, i) => (
              <div key={c} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 20px', background: SOFT, borderRadius: 14 }}>
                <div style={sans(24)}>{c}</div>
                <Tick t={t} at={r.at + 0.6 + i * 0.35} size={34} />
              </div>
            ))}
          </Card>
        </Abs>
      ))}
      <Wire pts={[[1200, 790], [1200, 860], [1640, 860], [1640, 790]]} p={prog(t, 107.96, 0.8)} color={LIME} width={4} />
      <Abs x={1000} y={880} w={840} style={{ textAlign: 'center', ...sans(26), ...enter(t, 108.2, { y: 8 }) }}>
        <span style={mark(t, 108.5)}>Compare results</span>
        <span style={{ color: MUTED }}> run against run</span>
      </Abs>
    </>
  );
};

const S6Outcome: React.FC<{ t: number }> = ({ t }) => {
  const focus = t < 119.9 ? -1 : 0;
  const detail = prog(t, 120.0, 0.6);
  return (
    <>
      <Label t={t} at={111.3}>When we evaluate the agent</Label>
      <Abs x={80} y={300} w={1760} style={{ textAlign: 'center', opacity: 1 - detail }}>
        <div style={{ ...serif(64), ...enter(t, 111.3) }}>
          There are <span style={mark(t, 113.26)}>three things</span> to check.
        </div>
      </Abs>
      <AbsoluteFill style={{ transform: `translateY(${(1 - detail) * 360}px)` }}>
        <CheckStrip t={t} focus={focus} appear={[114.94, 116.34, 118.08]} />
      </AbsoluteFill>
      <Abs x={80} y={320} w={820} style={{ opacity: detail }}>
        <div style={{ ...serif(48), ...enter(t, 122.3) }}>
          Did the agent produce <span style={mark(t, 123.54)}>the correct recommendation?</span>
        </div>
        <div style={{ marginTop: 40, ...enter(t, 125.3, { y: 16 }) }}>
          <Card style={{ padding: '26px 30px', display: 'grid', gap: 14 }} lit={between(t, 128.9, 130.4)}>
            <div style={kicker}>For example · Taylor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div style={sans(28)}>Did it identify the task as</div>
              <div style={pop(t, 128.9)}><Chip size={24} icon="loop">an update?</Chip></div>
            </div>
          </Card>
        </div>
        <div style={{ marginTop: 34, display: 'flex', gap: 14, alignItems: 'center', ...enter(t, 134.6, { y: 10 }) }}>
          <Chip size={22} tone="line" icon="doc">Expected result</Chip>
          <div style={sans(24, { color: MUTED })}>compared with</div>
          <Chip size={22} tone="line" icon="spark">Agent’s response</Chip>
        </div>
      </Abs>
      <Abs x={980} y={320} style={{ opacity: detail, ...enter(t, 130.0, { y: 40 }) }}>
        <Shot src="14-baseline-summary-three-passes.png" w={860} h={560} cx={0.5} cy={0.22} scale={1.6} p={prog(t, 131.5, 2.0, IN_OUT)} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
          <div style={{ ...sans(22, { color: MUTED }), ...enter(t, 130.72, { y: 8 }) }}>Evaluation in Copilot Studio</div>
          <div style={pop(t, 136.8)}><Chip size={22} icon="check">3 of 3 passed</Chip></div>
        </div>
      </Abs>
    </>
  );
};

const S7Process: React.FC<{ t: number }> = ({ t }) => {
  const Y = 560;
  const nodes: { label: string; sub: string; at: number; x: number; icon: IconName }[] = [
    { label: 'Called the Agent Flow', sub: 'Check Team Action Tracker', at: 151.94, x: 80, icon: 'flow' },
    { label: 'Retrieved from SharePoint', sub: 'ID 1 · Taylor · due Nov 5', at: 153.4, x: 680, icon: 'table' },
    { label: 'Used it to recommend', sub: 'Update: Nov 5 → Nov 9', at: 156.42, x: 1280, icon: 'spark' },
  ];
  const W = 560;
  const H = 150;
  const diag = 1 - prog(t, 159.3, 0.6, IN_OUT);
  const shots = prog(t, 159.5, 0.7);
  const run = t > 158.2 ? ((t - 158.2) / 2.4) % 1 : -1;
  return (
    <>
      <Label t={t} at={138.8}>Check 2</Label>
      <CheckStrip t={t} focus={1} />
      <Abs x={80} y={310} w={1760} style={{ opacity: diag }}>
        <div style={{ ...serif(50), ...enter(t, 141.18) }}>
          Did the agent follow <span style={mark(t, 142.4)}>the workflow we intended?</span>
        </div>
        <div style={{ marginTop: 16, ...sans(28, { color: MUTED }), ...enter(t, 144.3, { y: 10 }) }}>
          A correct recommendation alone doesn’t show <span style={{ ...mark(t, 147.0), color: INK }}>how it got there.</span>
        </div>
      </Abs>
      <AbsoluteFill style={{ opacity: diag }}>
        <Abs x={80} y={Y - 52} style={{ ...kicker, ...enter(t, 149.0, { y: 8 }) }}>For Taylor’s task, verify that it</Abs>
        <Wire pts={[[80 + W, Y + H / 2], [680, Y + H / 2]]} p={prog(t, 153.2, 0.4)} color={INK} arrow />
        <Wire pts={[[680 + W, Y + H / 2], [1280, Y + H / 2]]} p={prog(t, 156.2, 0.4)} color={INK} arrow />
        {nodes.map((n) => (
          <Abs key={n.label} x={n.x} y={Y} w={W - 40} h={H} style={pop(t, n.at)}>
            <Card style={{ height: H, display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px' }} lit={between(t, n.at, n.at + 1.6)}>
              <IconDot name={n.icon} size={64} />
              <div>
                <div style={serif(30)}>{n.label}</div>
                <div style={sans(22, { color: MUTED })}>{n.sub}</div>
              </div>
            </Card>
          </Abs>
        ))}
        {run >= 0 && <Pulse pts={[[80 + (W - 40) / 2, Y - 14], [1280 + (W - 40) / 2, Y - 14]]} u={run} opacity={prog(t, 158.2, 0.4)} />}
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: shots }}>
        <Abs x={80} y={310} w={1760} style={serif(50)}>
          Inspect <span style={mark(t, 160.2)}>agent activity</span> and the flow’s <span style={mark(t, 162.4)}>execution history.</span>
        </Abs>
        <Abs x={80} y={420} style={enter(t, 160.18, { y: 30 })}>
          <Shot src="11-activity-map-tracker-outputs.png" w={860} h={480} cx={0.47} cy={0.2} scale={1.8} p={prog(t, 160.8, 1.8, IN_OUT)} />
        </Abs>
        <Abs x={980} y={420} style={enter(t, 162.34, { y: 30 })}>
          <Shot src="16-flow-activity-successful-runs.png" w={860} h={480} cx={0.2} cy={0.3} scale={1.7} p={prog(t, 163.0, 1.8, IN_OUT)} />
        </Abs>
      </AbsoluteFill>
    </>
  );
};

const S8Boundary: React.FC<{ t: number }> = ({ t }) => {
  const crud: [string, number][] = [['Create', 176.86], ['Update', 177.62], ['Delete', 178.48]];
  const evidence = prog(t, 180.46, 0.6, IN_OUT);
  return (
    <>
      <Label t={t} at={165.8}>Check 3</Label>
      <CheckStrip t={t} focus={2} />
      <Abs x={80} y={310} w={1760}>
        <div style={{ ...serif(50), ...enter(t, 168.04) }}>
          Did the agent stay <span style={mark(t, 169.0)}>within the limits we defined?</span>
        </div>
      </Abs>
      <Abs x={80} y={420} w={820} style={{ opacity: 1 - 0.55 * evidence }}>
        <Card style={{ padding: '28px 32px', display: 'grid', gap: 16, ...enter(t, 171.0, { y: 16 }) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Chip size={18} icon="doc" tone="line">Agent build plan</Chip>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <IconDot name="person" size={56} />
            <div style={sans(28)}>
              Prepare proposed changes for <span style={mark(t, 174.94)}>human review.</span>
            </div>
          </div>
        </Card>
        <div style={{ marginTop: 30, ...kicker, ...enter(t, 176.22, { y: 8 }) }}>It should not change SharePoint items</div>
        <div style={{ marginTop: 18, display: 'flex', gap: 18 }}>
          {crud.map(([w, at]) => (
            <div key={w} style={{ ...pop(t, at), position: 'relative' }}>
              <Chip size={26} tone="line" icon="lock" style={{ borderColor: RED, background: RED_SOFT }}>{w}</Chip>
              <div style={{ position: 'absolute', left: 8, right: 8, top: '50%', height: 3, background: RED, transform: `scaleX(${prog(t, at + 0.2, 0.4)})`, transformOrigin: 'left' }} />
            </div>
          ))}
        </div>
      </Abs>
      <Abs x={980} y={420} w={860} style={{ opacity: evidence }}>
        <div style={{ position: 'relative', height: 470 }}>
          <div style={{ position: 'absolute', left: 0, top: 0, ...enter(t, 184.22, { y: 30 }) }}>
            <Shot src="15-tools-enabled-and-disabled.png" w={600} h={330} cx={0.3} cy={0.4} scale={2.2} p={prog(t, 184.6, 1.4, IN_OUT)} />
            <div style={{ ...sans(20, { color: MUTED }), marginTop: 10 }}>Tool activity</div>
          </div>
          <div style={{ position: 'absolute', left: 260, top: 150, ...enter(t, 185.42, { y: 30 }) }}>
            <Shot src="08-prepared-sharepoint-tracker.png" w={600} h={330} cx={0.28} cy={0.36} scale={2.0} p={prog(t, 185.8, 1.4, IN_OUT)} />
          </div>
        </div>
        <div style={{ marginTop: 20, ...pop(t, 187.2) }}>
          <Chip size={26} icon="check">No records were changed</Chip>
        </div>
      </Abs>
    </>
  );
};

const S9Together: React.FC<{ t: number }> = ({ t }) => {
  const res: [string, number][] = [
    ['Reached the right result', 193.42],
    ['Followed the intended process', 194.48],
    ['Respected our controls', 196.64],
  ];
  const join = prog(t, 189.3, 0.8, IN_OUT);
  return (
    <>
      <Label t={t} at={189.1}>Three checks, working together</Label>
      <Abs x={80} y={140} w={1760} style={{ textAlign: 'center', ...enter(t, 189.1) }}>
        <div style={serif(58)}>
          They help us <span style={mark(t, 191.68)}>verify</span> that the agent…
        </div>
      </Abs>
      <AbsoluteFill style={{ transform: `translateY(${170}px)` }}>
        <CheckStrip t={t} focus={-1} />
      </AbsoluteFill>
      <Wire pts={[[360, 420], [360, 470], [1560, 470], [1560, 420]]} p={join} color={LIME} width={4} />
      <Wire pts={[[960, 420], [960, 470]]} p={join} color={LIME} width={4} />
      {res.map(([text, at], i) => (
        <Abs key={text} x={80 + i * 600} y={560} w={560} style={{ display: 'flex', gap: 16, alignItems: 'center', ...enter(t, at, { y: 16 }) }}>
          <Tick t={t} at={at + 0.15} size={48} />
          <div style={serif(34)}>{text}</div>
        </Abs>
      ))}
    </>
  );
};

const S10Monitoring: React.FC<{ t: number }> = ({ t }) => {
  const shot = prog(t, 207.0, 0.8, IN_OUT);
  const stream = (t - 203.4) * 0.12;
  return (
    <>
      <Label t={t} at={198.7}>Part 2 · Monitoring</Label>
      <Abs x={80} y={140} w={1760} style={{ opacity: 1 - shot }}>
        <div style={{ ...serif(56), ...enter(t, 198.7) }}>
          What happens during <span style={mark(t, 203.64)}>regular use?</span>
        </div>
      </Abs>
      <AbsoluteFill style={{ opacity: 1 - shot }}>
        {/* Evaluation row: a few defined scenarios */}
        <Abs x={80} y={360} w={1760} style={enter(t, 199.68, { y: 16 })}>
          <Card style={{ height: 180, padding: '0 40px', display: 'grid', gridTemplateColumns: '360px 1fr', alignItems: 'center' }}>
            <div>
              <div style={serif(36)}>Evaluation</div>
              <div style={sans(22, { color: MUTED })}>Specific scenarios</div>
            </div>
            <div style={{ display: 'flex', gap: 60, paddingLeft: 40 }}>
              {['Taylor', 'Chris', 'Escalation'].map((c, i) => (
                <div key={c} style={{ display: 'flex', gap: 12, alignItems: 'center', ...pop(t, 200.2 + i * 0.3) }}>
                  <Tick t={t} at={200.4 + i * 0.3} size={36} />
                  <div style={sans(24)}>{c}</div>
                </div>
              ))}
            </div>
          </Card>
        </Abs>
        {/* Monitoring row: a continuous stream of sessions */}
        <Abs x={80} y={590} w={1760} style={enter(t, 203.3, { y: 16 })}>
          <Card style={{ height: 180, padding: '0 40px', display: 'grid', gridTemplateColumns: '360px 1fr', alignItems: 'center', overflow: 'hidden' }} lit={between(t, 205.5, 207.0)}>
            <div>
              <div style={serif(36)}>Monitoring</div>
              <div style={sans(22, { color: MUTED })}>Regular use, over time</div>
            </div>
            <div style={{ position: 'relative', height: 60, overflow: 'hidden' }}>
              {Array.from({ length: 22 }).map((_, i) => {
                const x = ((i / 22 + stream) % 1) * 1300;
                return <div key={i} style={{ position: 'absolute', left: x, top: 18 + (i % 3) * 8, width: 18, height: 18, borderRadius: 9, background: i % 7 === 3 ? AMBER : LIME, opacity: 0.85 }} />;
              })}
            </div>
          </Card>
        </Abs>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: shot }}>
        <Abs x={80} y={140} w={1760} style={serif(56)}>
          Review <span style={mark(t, 209.9)}>activity</span> and <span style={mark(t, 210.7)}>analytics</span> to look for patterns.
        </Abs>
        <Abs x={80} y={300} style={enter(t, 207.2, { y: 30 })}>
          <Shot src="24-agent-activity-list.png" w={860} h={580} cx={0.3} cy={0.25} scale={1.6} p={prog(t, 208.2, 2.0, IN_OUT)} />
        </Abs>
        <Abs x={980} y={300} style={enter(t, 210.62, { y: 30 })}>
          <Shot src="25-monitor-overview.png" w={860} h={580} cx={0.35} cy={0.3} scale={1.5} p={prog(t, 211.0, 1.6, IN_OUT)} />
        </Abs>
      </AbsoluteFill>
    </>
  );
};

const S11Patterns: React.FC<{ t: number }> = ({ t }) => {
  const steps: [string, IconName][] = [['Read notes', 'doc'], ['Check tracker', 'table'], ['Compare', 'filter'], ['Recommend', 'spark']];
  const xs = [80, 520, 960, 1400];
  const Y = 320;
  const W = 360;
  const H = 130;
  const fail = prog(t, 214.42, 0.6);
  const ask = prog(t, 217.7, 0.6);
  const focus = prog(t, 222.84, 0.6, IN_OUT);
  const cyc = (t - 212.6) / 3.0;
  return (
    <>
      <Label t={t} at={212.8}>Patterns worth investigating</Label>
      {xs.slice(0, 3).map((x, i) => (
        <Wire key={i} pts={[[x + W, Y + H / 2], [xs[i + 1], Y + H / 2]]} p={1} color={INK} arrow />
      ))}
      {steps.map(([s, icon], i) => (
        <Abs key={s} x={xs[i]} y={Y} w={W} h={H} style={enter(t, 212.7 + i * 0.15, { y: 16 })}>
          <Card style={{ height: H, display: 'flex', alignItems: 'center', gap: 16, padding: '0 22px', borderColor: i === 1 ? interpolateColor(LINE, AMBER, fail) : LINE }} lit={i === 1 ? focus : 0}>
            <IconDot name={icon} size={56} bg={i === 1 && fail > 0.5 ? AMBER_SOFT : LIME_SOFT} />
            <div style={serif(30)}>{s}</div>
          </Card>
        </Abs>
      ))}
      {/* sessions flowing through the steps; after "fails", some stall at step 2 */}
      {Array.from({ length: 8 }).map((_, k) => {
        const u = (cyc + k / 8) % 1;
        const stalls = k % 3 === 0 && fail > 0.5;
        const uu = stalls ? Math.min(u, 0.36) : u;
        return (
          <Pulse key={k} pts={[[xs[0] + W / 2, Y - 22], [xs[3] + W / 2, Y - 22]]} u={uu} r={9} color={stalls && u > 0.33 ? AMBER : LIME} opacity={0.9} />
        );
      })}
      <Abs x={520} y={Y + H + 24} w={W} style={{ opacity: fail }}>
        <Chip tone="amber" size={22} icon="stop">Fails at the same step</Chip>
      </Abs>
      <Wire pts={[[xs[2] + W / 2, Y + H], [xs[2] + W / 2, 620], [xs[2] + W / 2 + 60, 620]]} p={ask} color={AMBER} dash />
      <Abs x={xs[2] + W / 2 + 70} y={590} style={{ opacity: ask }}>
        <Chip tone="amber" size={22} icon="question">Asks for clarification it shouldn’t need</Chip>
      </Abs>
      <Abs x={80} y={760} w={1760} style={{ ...enter(t, 221.72, { y: 12 }) }}>
        <div style={serif(46)}>
          Patterns tell us <span style={mark(t, 223.74)}>what to investigate</span> and where an improvement makes <span style={mark(t, 226.32)}>the biggest difference.</span>
        </div>
      </Abs>
    </>
  );
};

const LOOP: { name: string; icon: IconName; at: number; on: number }[] = [
  { name: 'Test', icon: 'check', at: 232.58, on: 236.5 },
  { name: 'Inspect', icon: 'question', at: 233.3, on: 241.0 },
  { name: 'Improve', icon: 'bolt', at: 234.22, on: 257.08 },
  { name: 'Retest', icon: 'loop', at: 235.34, on: 268.44 },
];
const S12Loop: React.FC<{ t: number }> = ({ t }) => {
  const C: [number, number] = [470, 600];
  const R = 250;
  const pos: [number, number][] = [[C[0], C[1] - R], [C[0] + R, C[1]], [C[0], C[1] + R], [C[0] - R, C[1]]];
  let active = -1;
  LOOP.forEach((s, i) => { if (t >= s.on) active = i; });
  if (t >= 280.0) active = -1;
  const ring: [number, number][] = [...pos, pos[0]];
  const speed = t > 283.0 ? 2.2 : 4.0;
  const u = t > 236.0 ? ((t - 236.0) / speed) % 1 : -1;
  const panel = (a: number, b: number) => between(t, a, b, 0.4);
  const Q: [string, number][] = [
    ['Did it retrieve the wrong SharePoint information?', 248.82],
    ['Did it misunderstand what it retrieved?', 251.86],
    ['Did it select the wrong tool?', 255.1],
  ];
  const FIX: [string, string, number, IconName][] = [
    ['Instructions', 'Clarify what the agent should do', 261.18, 'doc'],
    ['Retrieval', 'Adjust how it gets information', 263.36, 'table'],
    ['Agent Flow', 'Fix the action that went wrong', 266.08, 'flow'],
  ];
  const RE: [string, number, IconName][] = [
    ['Run the same test again', 269.16, 'loop'],
    ['Rerun tests that already passed', 273.62, 'check'],
    ['One fix can introduce another issue', 276.28, 'stop'],
  ];
  return (
    <>
      <Label t={t} at={227.8}>The improvement loop</Label>
      <Abs x={80} y={120} w={820} style={enter(t, 227.8)}>
        <div style={serif(46)}>
          Evaluation + monitoring, in <span style={mark(t, 230.86)}>one simple loop</span>
        </div>
      </Abs>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <circle cx={C[0]} cy={C[1]} r={R} fill="none" stroke={LINE} strokeWidth={4} strokeDasharray={`${2 * Math.PI * R}`} strokeDashoffset={2 * Math.PI * R * (1 - prog(t, 232.4, 3.0, IN_OUT))} />
      </svg>
      {u >= 0 && <Pulse pts={ring} u={u} opacity={0.9} />}
      {LOOP.map((s, i) => (
        <Abs key={s.name} x={pos[i][0] - 120} y={pos[i][1] - 50} w={240} h={100} style={pop(t, s.at)}>
          <Card style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, opacity: active === -1 || active === i ? 1 : 0.5 }} lit={active === i ? 1 : 0}>
            <IconDot name={s.icon} size={52} bg={active === i ? LIME_SOFT : SOFT} />
            <div style={serif(32)}>{s.name}</div>
          </Card>
        </Abs>
      ))}
      {/* Right-hand panel, one per step */}
      <Abs x={1000} y={300} w={840} style={{ opacity: panel(236.5, 241.0) }}>
        <div style={kicker}>1 · Test</div>
        <div style={{ ...serif(48), marginTop: 14 }}>Against a <span style={mark(t, 238.6)}>clearly defined</span> expected outcome.</div>
      </Abs>
      <Abs x={1000} y={300} w={840} style={{ opacity: panel(241.0, 257.08) }}>
        <div style={kicker}>2 · Inspect</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 18 }}>
          <div style={pop(t, 242.56)}><Chip size={26} icon="check" tone="line">The result</Chip></div>
          <div style={pop(t, 243.68)}><Chip size={26} icon="flow" tone="line">The execution evidence</Chip></div>
        </div>
        <div style={{ ...serif(40), marginTop: 50, ...enter(t, 245.3, { y: 12 }) }}>
          If the recommendation is wrong, <span style={mark(t, 247.6)}>investigate the cause.</span>
        </div>
        <div style={{ marginTop: 28, display: 'grid', gap: 16 }}>
          {Q.map(([q, at]) => (
            <div key={q} style={{ display: 'flex', gap: 16, alignItems: 'center', ...enter(t, at, { x: -20, y: 0 }) }}>
              <IconDot name="question" size={46} bg={AMBER_SOFT} />
              <div style={sans(28)}>{q}</div>
            </div>
          ))}
        </div>
      </Abs>
      <Abs x={1000} y={300} w={840} style={{ opacity: panel(257.08, 268.44) }}>
        <div style={kicker}>3 · Improve</div>
        <div style={{ ...serif(46), marginTop: 14 }}>Fix <span style={mark(t, 258.3)}>the part responsible.</span></div>
        <div style={{ marginTop: 36, display: 'grid', gap: 18 }}>
          {FIX.map(([n, d, at, icon]) => (
            <Card key={n} style={{ padding: '20px 24px', display: 'flex', gap: 18, alignItems: 'center', ...enter(t, at, { x: -20, y: 0 }) }} lit={between(t, at, at + 1.4)}>
              <IconDot name={icon} size={52} />
              <div>
                <div style={serif(30)}>{n}</div>
                <div style={sans(22, { color: MUTED })}>{d}</div>
              </div>
            </Card>
          ))}
        </div>
      </Abs>
      <Abs x={1000} y={300} w={840} style={{ opacity: panel(268.44, 280.0) }}>
        <div style={kicker}>4 · Retest</div>
        <div style={{ marginTop: 26, display: 'grid', gap: 18 }}>
          {RE.map(([n, at, icon], i) => (
            <div key={n} style={{ display: 'flex', gap: 16, alignItems: 'center', ...enter(t, at, { x: -20, y: 0 }) }}>
              <IconDot name={icon} size={52} bg={i === 2 ? AMBER_SOFT : LIME_SOFT} />
              <div style={sans(30)}>{n}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 36, ...enter(t, 270.6, { y: 16 }) }}>
          <Shot src="21-run-comparison.png" w={840} h={300} cx={0.9} cy={0.12} scale={2.0} p={prog(t, 273.8, 1.8, IN_OUT)} />
        </div>
      </Abs>
      <Abs x={1000} y={360} w={840} style={{ opacity: prog(t, 280.0, 0.5) }}>
        <div style={kicker}>Checking for that is called</div>
        <div style={{ ...serif(72), marginTop: 12 }}>
          <span style={mark(t, 281.48)}>Regression testing</span>
        </div>
        <div style={{ ...sans(32, { color: MUTED }), marginTop: 40, ...enter(t, 283.0, { y: 12 }) }}>
          Repeat the loop. Improve the agent <span style={{ ...mark(t, 285.62), color: INK }}>based on evidence.</span>
        </div>
      </Abs>
    </>
  );
};

const S13Reliable: React.FC<{ t: number }> = ({ t }) => {
  const cols: { verb: string; vAt: number; src: string; gives: string; at: number; icon: IconName }[] = [
    { verb: 'Test its decisions', vAt: 291.94, src: 'Evaluation', gives: 'Repeatable checks', at: 299.02, icon: 'check' },
    { verb: 'Verify how it works', vAt: 293.46, src: 'Execution evidence', gives: 'What actually happened', at: 301.92, icon: 'flow' },
    { verb: 'Confirm its boundaries', vAt: 295.8, src: 'Monitoring', gives: 'Where problems appear over time', at: 305.34, icon: 'person' },
  ];
  return (
    <>
      <Label t={t} at={287.2}>A reliable agent</Label>
      <Abs x={80} y={140} w={1760} style={{ textAlign: 'center', ...enter(t, 287.26) }}>
        <div style={serif(58)}>
          Reliable takes <span style={mark(t, 289.08)}>more than</span> the right answer once.
        </div>
      </Abs>
      {cols.map((c, i) => (
        <Abs key={c.verb} x={80 + i * 600} y={330} w={560}>
          <div style={{ ...serif(36), ...enter(t, c.vAt, { y: 14 }) }}>{c.verb}</div>
          <div style={{ marginTop: 26, ...enter(t, c.at, { y: 20 }) }}>
            <Card style={{ height: 230, padding: '28px 30px', display: 'grid', alignContent: 'start', gap: 16 }} lit={between(t, c.at, c.at + 1.8)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <IconDot name={c.icon} size={56} />
                <div style={{ ...kicker, fontSize: 18 }}>{c.src}</div>
              </div>
              <div style={serif(34)}>{c.gives}</div>
            </Card>
          </div>
        </Abs>
      ))}
    </>
  );
};

const S14Next: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Label t={t} at={309.0}>Next</Label>
    <Abs x={80} y={200} w={820}>
      <div style={{ ...sans(32, { color: MUTED }), ...enter(t, 309.0) }}>Now, let’s put this process</div>
      <div style={{ ...serif(84), marginTop: 18, ...enter(t, 310.44, { dur: 0.9, y: 30 }) }}>
        into <span style={mark(t, 310.68)}>practice</span>
      </div>
      <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 0, ...enter(t, 311.6, { y: 10 }) }}>
        <Chip tone="lime" size={24} icon="spark">Follow-Up Agent</Chip>
        <div style={{ width: 90, height: 4, background: INK, transform: `scaleX(${prog(t, 313.4, 0.6, IN_OUT)})`, transformOrigin: 'left' }} />
        <Chip tone="line" size={24} icon="check">Copilot Studio evaluation</Chip>
      </div>
    </Abs>
    <Abs x={980} y={190} style={enter(t, 309.3, { y: 40 })}>
      <Shot src="27-evaluation-sets-and-runs.png" w={860} h={640} cx={0.3} cy={0.25} scale={1.7} p={prog(t, 310.2, 2.4, IN_OUT)} />
    </Abs>
  </>
);

const Body: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Audio src={staticFile('audio/copilot-studio-evaluation.mp3')} />
      <Scene t={t} index={0}><S1LeftOff t={t} /></Scene>
      <Scene t={t} index={1}><S2NotEnough t={t} /></Scene>
      <Scene t={t} index={2}><S3Evaluation t={t} /></Scene>
      <Scene t={t} index={3}><S4Commitments t={t} /></Scene>
      <Scene t={t} index={4}><S5SameInputs t={t} /></Scene>
      <Scene t={t} index={5}><S6Outcome t={t} /></Scene>
      <Scene t={t} index={6}><S7Process t={t} /></Scene>
      <Scene t={t} index={7}><S8Boundary t={t} /></Scene>
      <Scene t={t} index={8}><S9Together t={t} /></Scene>
      <Scene t={t} index={9}><S10Monitoring t={t} /></Scene>
      <Scene t={t} index={10}><S11Patterns t={t} /></Scene>
      <Scene t={t} index={11}><S12Loop t={t} /></Scene>
      <Scene t={t} index={12}><S13Reliable t={t} /></Scene>
      <Scene t={t} index={13} fadeOutAt={315.4}><S14Next t={t} /></Scene>
      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const CopilotStudioEvaluation: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence from={COPILOT_STUDIO_EVALUATION_TITLE_FRAMES}>
      <Body />
    </Sequence>
    <Sequence durationInFrames={COPILOT_STUDIO_EVALUATION_TITLE_FRAMES} style={{ zIndex: 100 }}>
      <TitleCardGreen label="MICROSOFT COPILOT STUDIO" title={'Evaluate, Monitor and Improve\nYour Agent'} />
    </Sequence>
  </AbsoluteFill>
);
