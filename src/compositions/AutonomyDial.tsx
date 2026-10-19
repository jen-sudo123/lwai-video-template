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
import { AUTONOMY_DIAL_SVGS } from './autonomy-dial-svgs';

loadSerif();
loadSans();

// Autonomy Is a Dial — built from the user's VO (audio/autonomy-dial.mp3, 179.22s) and four user-supplied
// SVG slides (dumping/autonomy-dial-svg/), re-laid out lighter by videos/autonomy-dial/build-svgs.py into
// autonomy-dial-svgs.ts. The slides' quotes and sum-up lines get their own template text scenes here.
// Every cue is in SECONDS of the VO, from the Whisper word timestamps in src/data/autonomy-dial.transcript.json.
// A 90-frame green title card precedes the VO.
//
//  #  scene                                   start   VO cue
//  1  SVG 1 Customer follow-up                0.0     "Imagine an agent that handles customer follow-up."
//  2  Autonomy isn't all at once              21.2    "That difference matters because…"
//  3  SVG 2 Five levels of authority (dial)   31.7    "Now we define authority as a dial with five positions."
//  4  Not maturity levels                     74.5    "These are not maturity levels…"
//  5  SVG 3 Judge the consequence             83.4    "Now one useful question to set that dial…"
//  6  Assist vs. execute                      104.8   "There always needs to be a boundary…"
//  7  Uncertainty                             118.9   "And there is another factor which is uncertainty."
//  8  SVG 4 One workflow, different settings  129.6   "And this means that the same workflow…"
//  9  Not an approval step everywhere         147.8   "That is often way better than…"
//  10 The better question                     160.4   "So when you design an agentic workflow…"
//  11 The real autonomy dial                  175.5   "And that is the real autonomy dial."

export const AUTONOMY_DIAL_DURATION_S = 181.0;
export const AUTONOMY_DIAL_TITLE_FRAMES = 90;

const STARTS = [0, 21.2, 31.7, 74.5, 83.4, 104.8, 118.9, 129.6, 147.8, 160.4, 175.5];
const CROSSFADE = 0.6;
// Reveals start slightly before the spoken word so the element is readable on the onset
const LEAD = 0.15;
const PIGMENT = 'autonomy-dial/pigment.png';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const OUT = Easing.out(Easing.cubic);
const IN_OUT = Easing.inOut(Easing.quad);

const prog = (t: number, at: number, dur = 0.7, easing = OUT) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing });

const enter = (t: number, at: number, { dur = 0.7, y = 24 } = {}): React.CSSProperties => {
  const p = prog(t, at - LEAD, dur);
  return { opacity: p, transform: `translateY(${y * (1 - p)}px)` };
};

const markStyle = (t: number, at: number): React.CSSProperties => ({
  backgroundSize: `${prog(t, at, 0.9, IN_OUT) * 100}% 38%`,
});

// Per-SVG reveal cues (VO seconds). A number fades the group in; [in, out] also fades it out again.
// Anything not listed (top label, header rule) is visible from the scene start.
type Cue = number | [number, number];
const CUES: Record<string, Cue>[] = [
  {
    title: 0.4, k1: 4.4, s1: 5.8, a1: 8.0, s2: 8.2, a2: 9.8, s3: 9.95,
    div: 12.8, k2: 12.8, s4: 14.7, s5: 17.4, no: 19.8,
  },
  {
    title: 31.9, sub: 32.7, arc: 33.1, knob: 34.3,
    p1: 37.3, p2: 43.8, p3: 51.0, p4: 58.1, p5: 65.6,
    d1: [37.3, 43.6], d2: [43.8, 50.7], d3: [51.0, 57.8], d4: [58.1, 65.3], d5: 65.6,
  },
  {
    title: 83.6, q: 86.2, br: 88.6, l1: 89.8, l2: 93.9, r1: 96.6, r2: 98.9, r3: 100.9, r4: 103.0,
  },
  {
    title: 129.9, sub: 131.0, box: 134.9, w1: 135.7, a1: 137.9, w2: 138.1, a2: 139.6, w3: 139.8, a3: 142.2, w4: 142.4, w5: 145.1,
  },
];

// Dial needle: angle (deg, clockwise from pointing right) per level cue; it starts on Suggest.
const NEEDLE: [number, number][] = [[37.3, 180], [43.8, 225], [51.0, 270], [58.1, 315], [65.6, 360]];
const needleAngle = (t: number) => {
  let a = NEEDLE[0][1];
  for (const [at, deg] of NEEDLE) a += (deg - a) * prog(t, at - 0.4, 0.8, IN_OUT);
  return a;
};

const SvgSlide: React.FC<{ t: number; index: number; start: number }> = ({ t, index, start }) => {
  const scope = `ad-s${index + 1}`;
  const css = Object.entries(CUES[index])
    .map(([key, cue]) => {
      const [at, out] = typeof cue === 'number' ? [cue, 1e6] : cue;
      const p = prog(t, Math.max(at - LEAD, start), 0.5) * (1 - prog(t, out - 0.3, 0.3, IN_OUT));
      return `.${scope} [data-r="${key}"]{opacity:${p.toFixed(4)};transform:translateY(${(14 * (1 - p)).toFixed(2)}px)}`;
    })
    .join('\n');
  const needle = `.${scope} [data-needle]{transform-origin:900px 690px;transform:rotate(${needleAngle(t).toFixed(2)}deg);opacity:${prog(t, 34.3, 0.5).toFixed(3)}}`;
  const html = AUTONOMY_DIAL_SVGS[index].replace('__PIGMENT__', staticFile(PIGMENT));
  // Slow push-in keeps the static slides alive without moving content off the safe area
  const zoom = 1 + 0.015 * prog(t, start, 40, Easing.inOut(Easing.sin));
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
      <style>{css + (index === 1 ? '\n' + needle : '')}</style>
      <div className={scope} style={{ width: 1920, height: 1080 }} dangerouslySetInnerHTML={{ __html: html }} />
    </AbsoluteFill>
  );
};

const CSS = `
  .ad-pad { position: absolute; left: 84px; right: 84px; top: 130px; bottom: 130px; display: flex; flex-direction: column; justify-content: center; }
  .ad-label { font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; position: absolute; left: 84px; top: 52px; }
  .ad-h1, .ad-h2, .ad-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.03em; margin: 0; color: #111; }
  .ad-h1 { font-size: 96px; line-height: 1.12; max-width: 1600px; }
  .ad-h2 { font-size: 66px; line-height: 1.18; max-width: 1560px; }
  .ad-h3 { font-size: 46px; line-height: 1.25; }
  .ad-body { font-family: 'Public Sans'; font-size: 38px; line-height: 1.45; margin: 0; max-width: 1400px; color: #111; }
  .ad-muted { color: ${colors.neutral600}; }
  .ad-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .ad-accent-bar { width: 96px; height: 8px; background: ${colors.lime500}; margin-bottom: 44px; }
  .ad-kicker { font-family: 'Public Sans'; font-size: 24px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-bottom: 24px; }
  .ad-strike-wrap { position: relative; display: inline-block; }
  .ad-strike { position: absolute; left: -4px; right: -4px; top: 56%; height: 4px; background: ${colors.lime500}; transform-origin: left center; }
  .ad-split { display: grid; grid-template-columns: 1fr 4px 1fr; gap: 72px; align-items: stretch; margin: 56px 0 64px; }
  .ad-boundary { background-image: linear-gradient(#111 60%, transparent 0); background-size: 4px 22px; transform-origin: top center; }
  .ad-col { border-top: 8px solid ${colors.lime500}; padding-top: 34px; }
  .ad-col.dark { border-top-color: #111; }
`;

const Scene: React.FC<{ t: number; index: number; children: React.ReactNode; contentStyle?: React.CSSProperties }> = ({
  t,
  index,
  children,
  contentStyle,
}) => {
  const start = STARTS[index];
  const end = index + 1 < STARTS.length ? STARTS[index + 1] + CROSSFADE : Infinity;
  if (t < start || t >= end) return null;
  const opacity = index === 0 ? 1 : prog(t, start, CROSSFADE, IN_OUT);
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, opacity, zIndex: index + 1 }}>
      <div style={{ position: 'absolute', inset: 0, ...contentStyle }}>{children}</div>
    </AbsoluteFill>
  );
};

// [sceneIndex, svgIndex]
const SVG_SCENES: [number, number][] = [
  [0, 0],
  [2, 1],
  [4, 2],
  [7, 3],
];

// Small dial for the closing scene: the needle sweeps across the five positions and settles mid-dial.
const MiniDial: React.FC<{ t: number; at: number }> = ({ t, at }) => {
  const deg = 180 + 135 * prog(t, at, 1.6, IN_OUT);
  const dots = [180, 225, 270, 315, 360].map((a) => {
    const r = (a * Math.PI) / 180;
    return [120 + 100 * Math.cos(r), 120 + 100 * Math.sin(r)];
  });
  return (
    <svg width="240" height="140" viewBox="0 0 240 140" style={{ marginBottom: 48, ...enter(t, at - 0.4, { y: 12 }) }}>
      <path d="M20 120A100 100 0 0 1 220 120" fill="none" stroke="#111" strokeWidth="4" />
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="10" fill={colors.lime500} stroke="#111" strokeWidth="3" />
      ))}
      <g style={{ transformOrigin: '120px 120px', transform: `rotate(${deg}deg)` }}>
        <path d="M120 120H192" stroke="#111" strokeWidth="6" strokeLinecap="round" />
      </g>
      <circle cx="120" cy="120" r="18" fill={colors.lime500} stroke="#111" strokeWidth="3" />
    </svg>
  );
};

const AutonomyDialBody: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fadeOut = 1 - prog(t, 180.0, 0.9, Easing.in(Easing.quad));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/autonomy-dial.mp3')} />
      {/* Loads the slides' lime texture up front so the SVG pattern never renders without it */}
      <Img src={staticFile(PIGMENT)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />

      {SVG_SCENES.map(([sceneIndex, svgIndex]) => (
        <Scene key={sceneIndex} t={t} index={sceneIndex}>
          <SvgSlide t={t} index={svgIndex} start={STARTS[sceneIndex]} />
        </Scene>
      ))}

      {/* 2 — Autonomy isn't given all at once */}
      <Scene t={t} index={1}>
        <div className="ad-label" style={enter(t, 21.5, { y: 12 })}>THAT DIFFERENCE MATTERS</div>
        <div className="ad-pad">
          <div className="ad-h3 ad-muted" style={{ marginBottom: 56, ...enter(t, 23.1) }}>
            You don’t give an agent autonomy all at once.
          </div>
          <div className="ad-accent-bar" style={enter(t, 26.4, { y: 0 })} />
          <div className="ad-h1" style={enter(t, 26.6, { dur: 0.9, y: 30 })}>
            You decide how much authority it has <span className="ad-mark" style={markStyle(t, 29.2)}>for each part of the work.</span>
          </div>
        </div>
      </Scene>

      {/* 4 — Not maturity levels */}
      <Scene t={t} index={3}>
        <div className="ad-label" style={enter(t, 74.8, { y: 12 })}>FIVE LEVELS OF AUTHORITY</div>
        <div className="ad-pad">
          <div className="ad-h2" style={{ marginBottom: 72, ...enter(t, 74.8, { dur: 0.9, y: 30 }) }}>
            These are <span className="ad-mark" style={markStyle(t, 75.5)}>not maturity levels</span> that every agent
            should climb.
          </div>
          <div className="ad-accent-bar" style={enter(t, 79.2, { y: 0 })} />
          <div className="ad-h3" style={enter(t, 79.4)}>
            The right setting depends on <span className="ad-mark" style={markStyle(t, 81.4)}>the action being taken.</span>
          </div>
        </div>
      </Scene>

      {/* 6 — Assist vs. execute */}
      <Scene t={t} index={5}>
        <div className="ad-label" style={enter(t, 105.1, { y: 12 })}>JUDGE THE CONSEQUENCE</div>
        <div className="ad-pad">
          <div className="ad-kicker" style={enter(t, 105.6, { y: 12 })}>There needs to be a boundary between</div>
          <div className="ad-split">
            <div className="ad-col" style={enter(t, 108.0)}>
              <div className="ad-h2">agents that assist</div>
            </div>
            <div className="ad-boundary" style={{ transform: `scaleY(${prog(t, 106.6, 0.8, IN_OUT)})` }} />
            <div className="ad-col dark" style={enter(t, 109.2)}>
              <div className="ad-h2">agents that execute changes in real systems</div>
            </div>
          </div>
          <p className="ad-body" style={enter(t, 113.1)}>
            Once AI can create side effects, <span className="ad-mark" style={markStyle(t, 115.7)}>human control</span>{' '}
            becomes more important.
          </p>
        </div>
      </Scene>

      {/* 7 — Uncertainty */}
      <Scene t={t} index={6}>
        <div className="ad-label" style={enter(t, 119.2, { y: 12 })}>ANOTHER FACTOR</div>
        <div className="ad-pad">
          <div className="ad-h1" style={{ marginBottom: 56, ...enter(t, 120.9, { dur: 0.9, y: 30 }) }}>
            Uncertainty.
          </div>
          <div className="ad-accent-bar" style={enter(t, 122.5, { y: 0 })} />
          <div className="ad-h2" style={enter(t, 122.7)}>
            When the situation is ambiguous, the agent should know that{' '}
            <span className="ad-mark" style={markStyle(t, 126.2)}>asking is part of doing the job well.</span>
          </div>
        </div>
      </Scene>

      {/* 9 — Not an approval step everywhere */}
      <Scene t={t} index={8}>
        <div className="ad-label" style={enter(t, 148.1, { y: 12 })}>ONE WORKFLOW, DIFFERENT SETTINGS</div>
        <div className="ad-pad">
          <div className="ad-h2" style={{ marginBottom: 72, ...enter(t, 148.2, { dur: 0.9, y: 30 }) }}>
            Often better than putting an approval step everywhere.
          </div>
          <div className="ad-accent-bar" style={enter(t, 152.4, { y: 0 })} />
          <p className="ad-body" style={enter(t, 152.6)}>
            Too many routine approvals create friction and can make it so that people pay less attention to{' '}
            <span className="ad-mark" style={markStyle(t, 158.6)}>the decisions that actually matter.</span>
          </p>
        </div>
      </Scene>

      {/* 10 — The better question */}
      <Scene t={t} index={9}>
        <div className="ad-label" style={enter(t, 160.7, { y: 12 })}>WHEN YOU DESIGN AN AGENTIC WORKFLOW</div>
        <div className="ad-pad">
          <div className="ad-kicker" style={enter(t, 163.5, { y: 12 })}>Don’t ask</div>
          <div className="ad-h3 ad-muted" style={{ marginBottom: 72, ...enter(t, 164.4) }}>
            <span className="ad-strike-wrap">
              “How autonomous should this agent be?”
              <span className="ad-strike" style={{ transform: `scaleX(${prog(t, 166.6, 0.6, IN_OUT)})` }} />
            </span>
          </div>
          <div className="ad-kicker" style={enter(t, 167.4, { y: 12 })}>Ask</div>
          <div className="ad-h2" style={enter(t, 168.1, { dur: 0.9, y: 30 })}>
            “For each action, what is the{' '}
            <span className="ad-mark" style={markStyle(t, 170.0)}>lowest level of human control</span> that still keeps
            the consequences acceptable?”
          </div>
        </div>
      </Scene>

      {/* 11 — The real autonomy dial (final scene: content fades out at the end) */}
      <Scene t={t} index={10} contentStyle={{ opacity: fadeOut }}>
        <div className="ad-pad" style={{ alignItems: 'center', textAlign: 'center' }}>
          <MiniDial t={t} at={175.9} />
          <div className="ad-h1" style={enter(t, 175.8, { dur: 0.9, y: 30 })}>
            That is the <span className="ad-mark" style={markStyle(t, 176.6)}>real autonomy dial.</span>
          </div>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const AutonomyDial: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence from={AUTONOMY_DIAL_TITLE_FRAMES}>
      <AutonomyDialBody />
    </Sequence>
    {/* zIndex lifts the card above the body scenes, which stack with z-index 1–50 */}
    <Sequence durationInFrames={AUTONOMY_DIAL_TITLE_FRAMES} style={{ zIndex: 100 }}>
      <TitleCardGreen label="UNDERSTANDING AGENTS" title="Autonomy Is a Dial" />
    </Sequence>
  </AbsoluteFill>
);
