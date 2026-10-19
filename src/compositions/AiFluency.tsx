import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  Easing,
  interpolate,
  interpolateColors,
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

// AI Fluency — ported from the branded HTML/JS page (videos/ai-fluency-html/ai-fluency.html)
// and its HyperFrames build. Every cue is in SECONDS of the VO (audio/ai-fluency.wav, 203.468s),
// taken from the Whisper word timestamps in videos/ai-fluency-html/transcript/ai-fluency.json.
//
// A 90-frame (3s) green title card opens the video; the VO and every scene below start after it,
// so the second values here are relative to the end of the card (i.e. VO time).
//
//  #  scene                                 start   VO cue
//  1  The question                          0.0     "what does it actually mean…"
//  2  A few years ago                       10.9    "…relatively advanced"
//  3  Adoption ≠ impact (bars)              18.3    "a lot of AI adoption…"
//  4  Know → Do                             32.5    "literacy versus fluency"
//  5  Literacy / fluency columns            46.9    "what AI is, can and cannot do…"
//  6  US framework / EU AI Act              62.0    "Department of Labor… EU AI Act"
//  7  Real workplace capability             84.1    "…a real workplace capability"
//  8  How fluent am I today?                92.6    "…look like?"
//  9  The 5 levels of AI fluency (curve)    101.3   "Level zero is avoiding…"
//  10 What you can reliably do              181.6   "Fluency isn't about what you know…"
//  11 The goal / human in the lead          193.1   closing line

export const AI_FLUENCY_DURATION_S = 203.468;
export const AI_FLUENCY_TITLE_FRAMES = 90;

const STARTS = [0, 10.9, 18.3, 32.5, 46.9, 62.0, 84.1, 92.6, 101.3, 181.6, 193.1];
const CROSSFADE = 0.6;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const OUT = Easing.out(Easing.cubic);
const IN_OUT = Easing.inOut(Easing.quad);

// 0 → 1 progress of a tween starting at `at` seconds
const prog = (t: number, at: number, dur = 0.7, easing = OUT) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing });

type EnterOpts = { dur?: number; x?: number; y?: number; scale?: number; easing?: (n: number) => number };
const enter = (t: number, at: number, { dur = 0.7, x = 0, y = 24, scale = 1, easing = OUT }: EnterOpts = {}) => {
  const p = prog(t, at, dur, easing);
  return {
    opacity: p,
    transform: `translate(${x * (1 - p)}px, ${y * (1 - p)}px) scale(${scale + (1 - scale) * p})`,
  } as React.CSSProperties;
};

// Lime-200 marker sweep behind black text
const markStyle = (t: number, at: number): React.CSSProperties => ({
  backgroundSize: `${prog(t, at, 0.9, IN_OUT) * 100}% 38%`,
});

const CSS = `
  .af-pad { width: 100%; height: 100%; padding: 80px 80px 160px; display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; }
  .af-label { font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin: 0 0 36px; }
  .af-h1, .af-h2, .af-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.04em; margin: 0; color: ${colors.black}; }
  .af-h1 { font-size: 96px; line-height: 1.1; max-width: 1560px; }
  .af-h2 { font-size: 72px; line-height: 1.15; max-width: 1500px; }
  .af-h3 { font-size: 44px; line-height: 1.15; }
  .af-body { font-family: 'Public Sans'; font-size: 36px; line-height: 1.5; margin: 0; max-width: 1300px; color: ${colors.black}; }
  .af-muted { color: ${colors.neutral600}; }
  .af-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .af-accent-bar { width: 96px; height: 8px; background: ${colors.lime500}; margin-bottom: 44px; transform-origin: left center; }

  .af-gap { width: 1500px; margin-top: 80px; }
  .af-bar-row { display: grid; grid-template-columns: 400px 1fr; gap: 40px; align-items: center; margin: 40px 0; }
  .af-bar-label { font-family: 'Public Sans'; font-size: 30px; font-weight: 600; }
  .af-bar-track { height: 40px; background: ${colors.neutral200}; overflow: hidden; }
  .af-bar { height: 100%; width: 100%; background: ${colors.black}; transform-origin: left center; }
  .af-bar.accent { background: ${colors.lime500}; }

  .af-know-do { display: flex; align-items: center; gap: 64px; margin-top: 80px; }
  .af-circle { width: 300px; height: 300px; border-radius: 50%; border: 2px solid ${colors.neutral200}; background: ${colors.white}; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .af-circle .main { font-family: 'IBM Plex Serif'; font-size: 64px; letter-spacing: -0.04em; }
  .af-circle .sub { font-family: 'Public Sans'; font-size: 24px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-top: 12px; }
  .af-circle.highlight { background: ${colors.black}; border-color: ${colors.black}; color: ${colors.white}; box-shadow: 0 0 0 10px ${colors.white}, 0 0 0 14px ${colors.lime500}; }
  .af-circle.highlight .sub { color: ${colors.lime200}; }
  .af-arrow { font-family: 'IBM Plex Serif'; font-size: 80px; color: ${colors.lime500}; }

  .af-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 96px; margin-top: 72px; }
  .af-col { border-top: 2px solid ${colors.neutral200}; padding-top: 40px; }
  .af-col.featured { border-top: 8px solid ${colors.lime500}; padding-top: 34px; }
  .af-kicker { font-family: 'Public Sans'; font-size: 22px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-bottom: 20px; }
  .af-col .af-h3 { margin-bottom: 28px; }
  .af-li { font-family: 'Public Sans'; font-size: 32px; line-height: 1.5; padding: 14px 0; border-bottom: 1px solid ${colors.neutral200}; display: flex; align-items: center; }
  .af-li::before { content: ""; flex: none; width: 12px; height: 12px; margin-right: 22px; background: ${colors.neutral600}; }
  .af-col.featured .af-li::before { background: ${colors.lime500}; }
  .af-copy { font-family: 'Public Sans'; font-size: 30px; line-height: 1.5; margin: 0; }
  .af-copy strong { font-weight: 600; }

  .af-levels .curve { fill: none; stroke: ${colors.lime500}; stroke-width: 4; stroke-linecap: round; }
  .af-levels .node { fill: ${colors.white}; stroke: ${colors.lime500}; stroke-width: 3; }
  .af-levels .node.final { fill: ${colors.black}; stroke: ${colors.black}; }
  .af-levels .num { font-family: 'IBM Plex Serif'; font-size: 40px; letter-spacing: -0.04em; fill: ${colors.black}; text-anchor: middle; dominant-baseline: central; }
  .af-levels .num.final { fill: ${colors.white}; }
  .af-levels .lvl-title { font-family: 'IBM Plex Serif'; font-size: 30px; letter-spacing: -0.04em; fill: ${colors.black}; }
  .af-levels .lvl-desc { font-family: 'Public Sans'; font-size: 21px; fill: ${colors.black}; }
  .af-levels .big-title { font-family: 'IBM Plex Serif'; letter-spacing: -0.04em; fill: ${colors.black}; }
  .af-levels .lvl-kicker { font-family: 'Public Sans'; font-weight: 600; font-size: 19px; letter-spacing: .12em; fill: ${colors.neutral600}; }

  .af-not-list { display: flex; gap: 72px; margin: 8px 0 72px; }
  .af-not-item { position: relative; font-family: 'IBM Plex Serif'; font-size: 52px; letter-spacing: -0.04em; line-height: 1.2; }
  .af-strike { position: absolute; left: -4px; right: -4px; top: 54%; height: 4px; background: ${colors.lime500}; transform-origin: left center; }
`;

// A scene is mounted from its start until the next scene has finished fading in over it.
const Scene: React.FC<{ t: number; index: number; children: React.ReactNode; padStyle?: React.CSSProperties }> = ({
  t,
  index,
  children,
  padStyle,
}) => {
  const start = STARTS[index];
  const end = index + 1 < STARTS.length ? STARTS[index + 1] + CROSSFADE : Infinity;
  if (t < start || t >= end) return null;
  const opacity = index === 0 ? 1 : prog(t, start, CROSSFADE, IN_OUT);
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, opacity, zIndex: index + 1 }}>
      <div className="af-pad" style={padStyle}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Scene 9 — the curve grows node-to-node as each level is named.
// `reach` = path-length fraction at each node (computed from the bezier path).
const LEVELS = [
  { at: 110.5, reach: 0.105, cx: 68, cy: 604, tx: 122, ty: 620, dy: 655, title: 'Level 0: Avoiding.', desc: 'AI is absent from how you work.' },
  { at: 116.6, reach: 0.304, cx: 198, cy: 428, tx: 251, ty: 444, dy: 480, title: 'Level 1: Chatting.', desc: 'AI helps with isolated tasks.' },
  { at: 133.5, reach: 0.515, cx: 371, cy: 277, tx: 422, ty: 294, dy: 328, title: 'Level 2: Collaborating.', desc: 'You create great work with AI.' },
  { at: 150.6, reach: 0.738, cx: 581, cy: 157, tx: 632, ty: 172, dy: 208, title: 'Level 3: Integrating.', desc: 'AI is built into how you work.' },
  { at: 164.9, reach: 1, cx: 885, cy: 63, tx: 934, ty: 76, dy: 113, title: 'Level 4: Transforming.', desc: 'AI carries work forward for you.' },
];
const LEVELS_RESTORE_AT = 180.2;

const curveReach = (t: number) => {
  let reach = 0;
  for (const lv of LEVELS) {
    const from = reach;
    reach = from + (lv.reach - from) * prog(t, lv.at - 0.9, 1.1, IN_OUT);
    if (t < lv.at - 0.9 + 1.1) break;
  }
  return reach;
};

const levelOpacity = (t: number, i: number) => {
  const appear = prog(t, LEVELS[i].at, 0.6);
  if (i === LEVELS.length - 1) return appear;
  // Dim once the next level is being described, restore after level 4
  const dim = 0.65 * prog(t, LEVELS[i + 1].at, 0.5, IN_OUT) - 0.65 * prog(t, LEVELS_RESTORE_AT, 0.6, IN_OUT);
  return appear * (1 - dim);
};

const AiFluencyBody: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/ai-fluency.wav')} />

      {/* 1 — The question */}
      <Scene t={t} index={0}>
        <div className="af-label" style={enter(t, 0.3, { dur: 0.6, y: 16 })}>AI Fluency</div>
        <div className="af-h1" style={enter(t, 0.55, { dur: 0.9, y: 34 })}>
          What does it actually mean to be <span className="af-mark" style={markStyle(t, 8.8)}>good at working with AI?</span>
        </div>
      </Scene>

      {/* 2 — A few years ago */}
      <Scene t={t} index={1}>
        <div className="af-label" style={enter(t, 11.1, { dur: 0.6, y: 16 })}>A few years ago</div>
        <div className="af-h1" style={{ maxWidth: 1420, ...enter(t, 11.3, { dur: 0.9, y: 34 }) }}>
          Knowing what generative AI was made you relatively <span className="af-mark" style={markStyle(t, 14.9)}>advanced.</span>
        </div>
        <p className="af-body af-muted" style={{ marginTop: 56, ...enter(t, 16.4, { dur: 0.6, y: 18 }) }}>That has changed fast.</p>
      </Scene>

      {/* 3 — Adoption vs impact */}
      <Scene t={t} index={2}>
        <div className="af-label" style={enter(t, 18.5, { dur: 0.6, y: 16 })}>The gap</div>
        <div className="af-h2" style={enter(t, 18.65, { dur: 0.8, y: 30 })}>
          AI adoption <span className="af-muted">≠</span> AI impact
        </div>
        <p className="af-body" style={{ marginTop: 32, ...enter(t, 19.0, { dur: 0.6, y: 18 }) }}>
          AI is widely available. But availability doesn’t mean people are using it well.
        </p>
        <div className="af-gap">
          <div className="af-bar-row" style={enter(t, 26.1, { dur: 0.6, x: -30, y: 0 })}>
            <div className="af-bar-label">AI adoption</div>
            <div className="af-bar-track">
              <div className="af-bar" style={{ transform: `scaleX(${0.92 * prog(t, 27.2, 1.6, Easing.out(Easing.exp))})` }} />
            </div>
          </div>
          <div className="af-bar-row" style={enter(t, 28.5, { dur: 0.6, x: -30, y: 0 })}>
            <div className="af-bar-label">Meaningful improvement</div>
            <div className="af-bar-track">
              <div className="af-bar accent" style={{ transform: `scaleX(${0.42 * prog(t, 30.5, 1.6, Easing.out(Easing.exp))})` }} />
            </div>
          </div>
        </div>
      </Scene>

      {/* 4 — Know -> Do */}
      <Scene t={t} index={3}>
        <div className="af-label" style={enter(t, 32.8, { dur: 0.6, y: 16 })}>The distinction</div>
        <div className="af-h2" style={enter(t, 34.2, { dur: 0.8, y: 30 })}>AI literacy versus AI fluency</div>
        <div className="af-know-do">
          <div className="af-circle" style={enter(t, 40.2, { y: 0, scale: 0.85, easing: Easing.out(Easing.back(1.4)) })}>
            <div className="main">Know</div>
            <div className="sub">AI literacy</div>
          </div>
          <div className="af-arrow" style={enter(t, 42.8, { dur: 0.5, x: -24, y: 0 })}>→</div>
          <div className="af-circle highlight" style={enter(t, 43.1, { dur: 0.8, y: 0, scale: 0.85, easing: Easing.out(Easing.back(1.6)) })}>
            <div className="main">Do</div>
            <div className="sub">AI fluency</div>
          </div>
        </div>
      </Scene>

      {/* 5 — Literacy vs fluency detail */}
      <Scene t={t} index={4}>
        <div className="af-label" style={enter(t, 47.1, { dur: 0.6, y: 16 })}>Two different things</div>
        <div className="af-h2" style={enter(t, 47.25, { dur: 0.8, y: 30 })}>Knowing about AI isn’t the same as working well with it.</div>
        <div className="af-columns">
          <div className="af-col" style={enter(t, 47.7, { y: 26 })}>
            <div className="af-kicker">AI literacy</div>
            <div className="af-h3">Knowing about AI</div>
            {['What AI is', 'What it can and cannot do', 'What risks to watch for'].map((text, i) => (
              <div key={text} className="af-li" style={enter(t, [49.3, 50.8, 52.6][i], { dur: 0.5, x: -20, y: 0 })}>{text}</div>
            ))}
          </div>
          <div className="af-col featured" style={enter(t, 54.9, { dur: 0.8, y: 26, easing: Easing.out(Easing.exp) })}>
            <div className="af-kicker">AI fluency</div>
            <div className="af-h3">Working effectively with AI</div>
            {['Applying AI to real work', 'Using judgment', 'Getting meaningful outcomes'].map((text, i) => (
              <div key={text} className="af-li" style={enter(t, [57.6, 58.7, 60.1][i], { dur: 0.5, x: -20, y: 0 })}>{text}</div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 6 — Why now */}
      <Scene t={t} index={5}>
        <div className="af-label" style={enter(t, 62.2, { dur: 0.6, y: 16 })}>Why this matters now</div>
        <div className="af-h2" style={enter(t, 62.5, { dur: 0.8, y: 30 })}>AI capability is becoming a workplace expectation.</div>
        <div className="af-columns">
          <div className="af-col" style={enter(t, 65.3, { y: 26 })}>
            <div className="af-kicker">United States</div>
            <div className="af-h3">AI Literacy Framework</div>
            <p className="af-copy">The U.S. Department of Labor has introduced an <strong>AI Literacy Framework</strong> to define capabilities increasingly needed at work.</p>
          </div>
          <div className="af-col" style={enter(t, 72.8, { y: 26, easing: Easing.out(Easing.exp) })}>
            <div className="af-kicker">European Union</div>
            <div className="af-h3">EU AI Act</div>
            <p className="af-copy">The <strong>EU AI Act</strong> expects organizations to ensure people working with AI have an appropriate level of AI literacy.</p>
          </div>
        </div>
      </Scene>

      {/* 7 — Statement */}
      <Scene t={t} index={6}>
        <div className="af-accent-bar" style={{ transform: `scaleX(${prog(t, 84.3, 0.7, Easing.out(Easing.exp))})` }} />
        <div className="af-label" style={enter(t, 84.5, { dur: 0.6, y: 16 })}>More than useful to know</div>
        <div className="af-h1" style={{ maxWidth: 1500, ...enter(t, 88.35, { dur: 0.9, y: 34 }) }}>
          Working well with AI is becoming <span className="af-mark" style={markStyle(t, 90.3)}>a real workplace capability.</span>
        </div>
      </Scene>

      {/* 8 — Reflection question */}
      <Scene t={t} index={7}>
        <div className="af-label" style={enter(t, 92.8, { dur: 0.6, y: 16 })}>The question</div>
        <div className="af-h1" style={enter(t, 96.7, { dur: 0.9, y: 34 })}>
          How fluent am I with AI <span className="af-mark" style={markStyle(t, 98.1)}>today?</span>
        </div>
        <p className="af-body af-muted" style={{ marginTop: 56, ...enter(t, 99.0, { dur: 0.6, y: 18 }) }}>
          And what would getting better actually look like?
        </p>
      </Scene>

      {/* 9 — The 5 levels of AI fluency */}
      <Scene t={t} index={8} padStyle={{ alignItems: 'center' }}>
        <svg className="af-levels" viewBox="0 0 1286 718" style={{ width: 1497, height: 836, overflow: 'visible', display: 'block' }}>
          <path
            className="curve"
            pathLength={1}
            strokeDasharray="1 2"
            strokeDashoffset={1 - curveReach(t)}
            opacity={t < LEVELS[0].at - 0.9 ? 0 : 1}
            d="M 10 704 C 48 635, 92 559, 164 461 C 225 379, 282 325, 345 286 C 422 229, 502 173, 554 154 C 660 111, 758 79, 854 67"
          />
          {/* Opaque discs keep the curve hidden behind nodes even while a level is dimmed */}
          <g fill={colors.white}>
            {LEVELS.map((lv) => <circle key={lv.cx} cx={lv.cx} cy={lv.cy} r={33} />)}
          </g>
          {LEVELS.map((lv, i) => {
            const final = i === LEVELS.length - 1 ? ' final' : '';
            const rise = 16 * (1 - prog(t, lv.at, 0.6));
            return (
              <g key={lv.title} opacity={levelOpacity(t, i)} transform={`translate(0 ${rise})`}>
                <circle className={`node${final}`} cx={lv.cx} cy={lv.cy} r={32} />
                <text className={`num${final}`} x={lv.cx} y={lv.cy + 2}>{i}</text>
                <text className="lvl-title" x={lv.tx} y={lv.ty}>{lv.title}</text>
                <text className="lvl-desc" x={lv.tx} y={lv.dy}>{lv.desc}</text>
              </g>
            );
          })}
          <g opacity={prog(t, 101.5, 0.8)} transform={`translate(0 ${24 * (1 - prog(t, 101.5, 0.8))})`}>
            <text className="lvl-kicker" x={710} y={462}>THE FRAMEWORK</text>
            <text className="big-title" x={706} y={542} fontSize={66}>The 5 Levels of</text>
            <rect
              x={700}
              y={613}
              width={532}
              height={33}
              fill={colors.lime200}
              style={{ transformBox: 'fill-box', transformOrigin: 'left center', transform: `scaleX(${prog(t, 103.0, 0.9, IN_OUT)})` }}
            />
            <text className="big-title" x={706} y={646} fontSize={108}>AI Fluency</text>
          </g>
        </svg>
      </Scene>

      {/* 10 — What fluency is about */}
      <Scene t={t} index={9}>
        <div className="af-label" style={enter(t, 181.8, { dur: 0.6, y: 16 })}>One important point</div>
        <div className="af-h2 af-muted" style={{ marginBottom: 40, ...enter(t, 184.0, { y: 24 }) }}>Fluency isn’t about</div>
        <div className="af-not-list">
          {['what you know', 'how often you use AI', 'how confident you feel'].map((text, i) => (
            <div
              key={text}
              className="af-not-item"
              style={{
                ...enter(t, [185.2, 186.4, 188.3][i], { dur: 0.5, y: 20 }),
                color: interpolateColors(prog(t, 189.9, 0.5, IN_OUT), [0, 1], [colors.black, colors.neutral600]),
              }}
            >
              {text}
              <span className="af-strike" style={{ transform: `scaleX(${prog(t, 189.6 + i * 0.15, 0.5, IN_OUT)})` }} />
            </div>
          ))}
        </div>
        <div className="af-h1" style={enter(t, 190.2, { dur: 0.9, y: 34, easing: Easing.out(Easing.exp) })}>
          It’s about what you can <span className="af-mark" style={markStyle(t, 191.2)}>reliably do.</span>
        </div>
      </Scene>

      {/* 11 — The goal (final scene: content fades out at the end) */}
      <Scene t={t} index={10} padStyle={{ opacity: 1 - prog(t, 202.6, 0.8, Easing.in(Easing.quad)) }}>
        <div className="af-label" style={enter(t, 193.3, { dur: 0.6, y: 16 })}>The goal</div>
        <div className="af-h2 af-muted" style={{ marginBottom: 48, ...enter(t, 193.5, { y: 24 }) }}>It isn’t for everyone to reach Level 4.</div>
        <div className="af-h1" style={enter(t, 196.5, { dur: 0.9, y: 34, easing: Easing.out(Easing.exp) })}>
          It’s to reach the level your work requires, while keeping <span className="af-mark" style={markStyle(t, 200.7)}>the human in the lead.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const AiFluency: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence durationInFrames={AI_FLUENCY_TITLE_FRAMES}>
      <TitleCardGreen label="WORKING WELL WITH AI" title="AI Fluency" />
    </Sequence>
    <Sequence from={AI_FLUENCY_TITLE_FRAMES}>
      <AiFluencyBody />
    </Sequence>
  </AbsoluteFill>
);
