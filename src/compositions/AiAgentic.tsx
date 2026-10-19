import React from 'react';
import {
  AbsoluteFill,
  Audio,
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
import { AGENTIC_SVGS } from './ai-agentic-svgs';

loadSerif();
loadSans();

// What Makes AI Agentic — built from the user's VO (audio/ai-agentic.mp3, 199.68s) and seven
// user-supplied 1600×900 SVG slides (public/ai-agentic/images/, layered into ai-agentic-svgs.ts by
// videos/ai-agentic/build-svgs.py). Each SVG's <g data-r="key"> groups fade in on a VO cue.
// Every cue is in SECONDS of the VO, from the Whisper word timestamps in
// src/data/ai-agentic.transcript.json. A 90-frame green title card precedes the VO.
//
//  #  scene                                start   VO cue
//  1  SVG 1 Capable AI, with context       0.0     "Think about the way most of us use AI…"
//  2  SVG 2 You drive the work forward     17.6    "But you usually still drive the work…"
//  3  SVG 3 Delegate a bounded outcome     28.0    "Agents change that relationship."
//  4  SVG 4+5 Meeting follow-up (merged)   38.2    "So imagine you have finished a meeting…" → 8 agent steps
//  6  Every step in between                65.8    "you don't have to operate every step…"
//  7  Carrying work forward                71.2    "that idea of carrying work forward…"
//  8  Assistants vs agentic systems        79.4    "the distinction used in our curriculum…"
//  9  So how does that happen?             87.4    "So how does that actually happen?"
//  9b The agent loop (title)              90.2    "A useful mental model is the agent loop."
//  10 SVG 6 The agent loop                 93.6    "The agent starts with context."
//  11 Not unlimited freedom                147.3   "bounded delegation… unlimited freedom"
//  12 SVG 7 Bounded delegation             154.5   "An agent might only be allowed to read…"
//  12b Bounded delegation (title)         171.0   "…think about agentic AI as bounded delegation"
//  13 The goal                             184.0   "the goal with agents is never maximum autonomy"

export const AI_AGENTIC_DURATION_S = 199.68;
export const AI_AGENTIC_TITLE_FRAMES = 90;

const STARTS = [0, 17.6, 28.0, 38.2, 65.8, 71.2, 79.4, 87.4, 90.2, 93.6, 147.3, 154.5, 171.0, 184.0];
const CROSSFADE = 0.6;
// Reveals start slightly before the spoken word so the element is readable on the onset
const LEAD = 0.15;

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

// Per-SVG reveal cues (VO seconds). 'h' = header and footer chrome, visible from the scene start.
const CUES: Record<string, number>[] = [
  { h: 0, ai: 3.2, aiout: 4.6, o1: 5.1, o2: 6.0, o3: 6.9, o4: 8.6, ins: 13.2, files: 15.3, skills: 16.6, tag: 18.0 },
  { h: 0, you: 19.5, n1: 21.6, n2: 22.7, n3: 24.0, n4: 25.5, loop: 26.7, tag: 27.1 },
  { h: 0, you: 31.6, box: 33.7, plan: 34.4, act: 35.0, check: 35.6, cycle: 36.0, result: 36.6, tag: 37.2 },
  {
    h: 0, as: 43.9, a1: 45.3, a2: 46.9, atext: 47.6, ag: 49.2,
    s1: 51.6, s2: 53.2, s3: 54.9, s4: 57.3, s5: 58.6, s6: 59.9, s7: 61.2, s8: 62.9, gtext: 64.2, tag: 48.2,
  },
  {
    h: 0, ctx: 94.0, ctx1: 97.7, ctx2: 100.3, d: 102.4, a: 105.3, o: 115.1,
    br: 131.4, cont: 132.5, adj: 133.8, stop: 134.8, again: 136.6, tag: 138.6,
  },
  { h: 0, c1: 154.9, div1: 159.5, c2: 159.6, c2i: 160.6, c2t: 161.7, div2: 165.3, c3: 165.5, c3t1: 166.3, c3t2: 168.4 },
];

const SvgSlide: React.FC<{ t: number; index: number; start: number }> = ({ t, index, start }) => {
  const scope = `ag-svg-${index}`;
  const css = Object.entries(CUES[index])
    .map(([key, at]) => {
      const p = key === 'h' ? 1 : prog(t, Math.max(at - LEAD, start), 0.5);
      return `.${scope} [data-r="${key}"]{opacity:${p.toFixed(4)};transform:translateY(${(14 * (1 - p)).toFixed(2)}px)}`;
    })
    .join('\n');
  // Slow push-in keeps the static slides alive without moving content off the safe area
  const zoom = 1 + 0.015 * prog(t, start, 30, Easing.inOut(Easing.sin));
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
      <style>{css}</style>
      <div className={scope} style={{ width: 1920, height: 1080 }} dangerouslySetInnerHTML={{ __html: AGENTIC_SVGS[index] }} />
    </AbsoluteFill>
  );
};

const CSS = `
  .ag-pad { position: absolute; left: 84px; right: 84px; top: 130px; bottom: 130px; display: flex; flex-direction: column; justify-content: center; }
  .ag-label { font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; position: absolute; left: 84px; top: 52px; }
  .ag-h1, .ag-h2, .ag-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.03em; margin: 0; color: #111; }
  .ag-h1 { font-size: 96px; line-height: 1.12; max-width: 1600px; }
  .ag-h2 { font-size: 66px; line-height: 1.15; max-width: 1600px; }
  .ag-h3 { font-size: 46px; line-height: 1.2; }
  .ag-body { font-family: 'Public Sans'; font-size: 36px; line-height: 1.5; margin: 0; max-width: 1300px; color: #111; }
  .ag-muted { color: ${colors.neutral600}; }
  .ag-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .ag-accent-bar { width: 96px; height: 8px; background: ${colors.lime500}; margin-bottom: 44px; }
  .ag-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 96px; margin-top: 64px; }
  .ag-col { border-top: 2px solid ${colors.neutral200}; padding-top: 40px; }
  .ag-col.featured { border-top: 8px solid ${colors.lime500}; padding-top: 34px; }
  .ag-kicker { font-family: 'Public Sans'; font-size: 22px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-bottom: 20px; }
  .ag-col .ag-h3 { margin-bottom: 24px; }
  .ag-li { font-family: 'Public Sans'; font-size: 32px; line-height: 1.5; padding: 14px 0; border-bottom: 1px solid ${colors.neutral200}; display: flex; align-items: center; }
  .ag-li::before { content: ""; flex: none; width: 12px; height: 12px; margin-right: 22px; background: ${colors.neutral600}; }
  .ag-col.featured .ag-li::before { background: ${colors.lime500}; }
  .ag-where { display: flex; align-items: center; gap: 28px; font-family: 'IBM Plex Serif'; font-size: 54px; letter-spacing: -0.03em; line-height: 1.2; padding: 22px 0; border-bottom: 2px solid ${colors.neutral200}; }
  .ag-where .dot { flex: none; width: 22px; height: 22px; border-radius: 50%; background: ${colors.lime500}; border: 3px solid #111; }
  .ag-strike-wrap { position: relative; display: inline-block; }
  .ag-strike { position: absolute; left: -4px; right: -4px; top: 56%; height: 4px; background: ${colors.lime500}; transform-origin: left center; }
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

const SVG_SCENES: [sceneIndex: number, svgIndex: number][] = [
  [0, 0],
  [1, 1],
  [2, 2],
  [3, 3],
  [9, 4],
  [11, 5],
];

const AiAgenticBody: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/ai-agentic.mp3')} />

      {SVG_SCENES.map(([sceneIndex, svgIndex]) => (
        <Scene key={sceneIndex} t={t} index={sceneIndex}>
          <SvgSlide t={t} index={svgIndex} start={STARTS[sceneIndex]} />
        </Scene>
      ))}

      {/* 6 — Every step in between */}
      <Scene t={t} index={4}>
        <div className="ag-label" style={enter(t, 66.1, { y: 12 })}>WITH AN AGENT</div>
        <div className="ag-pad">
          <div className="ag-h1" style={enter(t, 67.3, { dur: 0.9, y: 34 })}>
            You don’t have to operate <span className="ag-mark" style={markStyle(t, 68.4)}>every step</span> in between.
          </div>
        </div>
      </Scene>

      {/* 7 — Carrying work forward */}
      <Scene t={t} index={5}>
        <div className="ag-label" style={enter(t, 71.5, { y: 12 })}>WHAT MAKES AI AGENTIC</div>
        <div className="ag-pad">
          <div className="ag-accent-bar" style={enter(t, 72.4, { y: 0 })} />
          <div className="ag-h1" style={{ marginBottom: 40, ...enter(t, 73.0, { dur: 0.9, y: 34 }) }}>
            <span className="ag-mark" style={markStyle(t, 73.6)}>Carrying work forward</span>
          </div>
          <p className="ag-body" style={enter(t, 74.7)}>
            The most useful way to understand what makes an AI agentic.
          </p>
        </div>
      </Scene>

      {/* 8 — Reusable assistants vs agentic systems */}
      <Scene t={t} index={6}>
        <div className="ag-label" style={enter(t, 79.7, { y: 12 })}>IN OUR CURRICULUM</div>
        <div className="ag-pad">
          <div className="ag-h2" style={enter(t, 80.6)}>Two different ways AI can work for you</div>
          <div className="ag-columns">
            <div className="ag-col" style={enter(t, 82.9)}>
              <div className="ag-kicker">Assistant</div>
              <div className="ag-h3">Reusable assistants</div>
              <div className="ag-li">Help you do the work</div>
              <div className="ag-li">You drive each step</div>
            </div>
            <div className="ag-col featured" style={enter(t, 84.7)}>
              <div className="ag-kicker">Agent</div>
              <div className="ag-h3">Agentic systems with bounded autonomy</div>
              <div className="ag-li">Carry bounded work forward</div>
              <div className="ag-li">Within limits you set</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 9 — So how does that happen? */}
      <Scene t={t} index={7}>
        <div className="ag-pad">
          <div className="ag-h1" style={enter(t, 87.6, { dur: 0.8, y: 30 })}>
            So how does that <span className="ag-mark" style={markStyle(t, 88.6)}>actually happen?</span>
          </div>
        </div>
      </Scene>

      {/* 9b — The agent loop (title beat before the diagram) */}
      <Scene t={t} index={8}>
        <div className="ag-label" style={enter(t, 90.6, { y: 12 })}>A USEFUL MENTAL MODEL</div>
        <div className="ag-pad">
          <div className="ag-accent-bar" style={enter(t, 91.0, { y: 0 })} />
          <div className="ag-h1" style={enter(t, 92.2, { dur: 0.8, y: 30 })}>
            The <span className="ag-mark" style={markStyle(t, 92.6)}>agent loop</span>
          </div>
        </div>
      </Scene>

      {/* 11 — Bounded delegation (title) + not unlimited freedom */}
      <Scene t={t} index={10}>
        <div className="ag-pad">
          <div className="ag-accent-bar" style={enter(t, 148.4, { y: 0 })} />
          <div className="ag-h1" style={{ marginBottom: 48, ...enter(t, 148.7, { dur: 0.8, y: 30 }) }}>
            <span className="ag-mark" style={markStyle(t, 149.0)}>Bounded delegation</span>
          </div>
          <div className="ag-h2 ag-muted" style={enter(t, 150.9, { dur: 0.8, y: 24 })}>
            None of this means giving AI unlimited freedom.
          </div>
        </div>
      </Scene>

      {/* 13 — The goal (final scene: content fades out at the end) */}
      {/* 12b — Bounded delegation: defined responsibility, chosen boundaries */}
      <Scene t={t} index={12}>
        <div className="ag-pad">
          <div className="ag-accent-bar" style={enter(t, 171.2, { y: 0 })} />
          <div className="ag-h1" style={{ marginBottom: 56, ...enter(t, 171.4, { dur: 0.8, y: 30 }) }}>
            <span className="ag-mark" style={markStyle(t, 174.1)}>Bounded delegation</span>
          </div>
          {[
            ['Defined responsibility.', 177.8],
            ['Chosen boundaries.', 181.4],
          ].map(([text, at]) => (
            <div key={text as string} className="ag-h2 ag-muted" style={{ marginBottom: 12, ...enter(t, at as number, { dur: 0.8, y: 24 }) }}>
              {text}
            </div>
          ))}
        </div>
      </Scene>

      <Scene t={t} index={13} contentStyle={{ opacity: 1 - prog(t, 198.6, 0.9, Easing.in(Easing.quad)) }}>
        <div className="ag-label" style={enter(t, 184.4, { y: 12 })}>THE GOAL</div>
        <div className="ag-pad">
          <div className="ag-h2 ag-muted" style={{ marginBottom: 56, ...enter(t, 185.0) }}>
            The goal is never{' '}
            <span className="ag-strike-wrap">
              maximum autonomy.
              <span className="ag-strike" style={{ transform: `scaleX(${prog(t, 187.2, 0.5, IN_OUT)})` }} />
            </span>
          </div>
          <div className="ag-h3" style={{ marginBottom: 16, ...enter(t, 189.6) }}>Decide where</div>
          {[
            ['AI can carry the work forward', 190.5],
            ['human judgment still matters', 192.6],
            ['the system should stop and ask', 195.4],
          ].map(([text, at]) => (
            <div key={text as string} className="ag-where" style={enter(t, at as number, { y: 20 })}>
              <span className="dot" />
              {text}
            </div>
          ))}
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const AiAgentic: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence durationInFrames={AI_AGENTIC_TITLE_FRAMES}>
      <TitleCardGreen label="UNDERSTANDING AGENTS" title="What Makes AI Agentic" />
    </Sequence>
    <Sequence from={AI_AGENTIC_TITLE_FRAMES}>
      <AiAgenticBody />
    </Sequence>
  </AbsoluteFill>
);
