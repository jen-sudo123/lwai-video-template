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
import { SMALLEST_AGENT_SVGS } from './smallest-agent-svgs';

loadSerif();
loadSans();

// Turning a Workflow Into an Agent — built from the user's VO (audio/smallest-agent.mp3, 187.72s) and four
// user-supplied SVG slides (dumping/all-svg-image-codes copy.txt), re-laid out lighter by
// videos/smallest-agent/build-svgs.py into smallest-agent-svgs.ts. Quotes and sum-up lines get their own
// template text scenes here. Every cue is in SECONDS of the VO, from the Whisper word timestamps in
// src/data/smallest-agent.transcript.json.
// The VO is spliced: dumping/Audio replacement.mp3 (0–26.436s) replaced the original opening (Studio 00:02.07–
// 00:46.25), then the original VO from 43.80s follows (original cue − 17.364). Originals kept as
// smallest-agent.orig.mp3 / smallest-agent.orig.transcript.json. The VO (and body) starts at Studio 00:02.07
// (frame 67), under the last moments of the 90-frame green title card.
//
//  #  scene                                   start   VO cue
//  1  SVG 6 Larry recap                       0.0     "We've already seen how Larry…"
//  2  Which capabilities?                     9.4     "But how do we decide which capabilities…"
//  3  SVG 7 Agent / automation / people       13.7    "…and how the work should be divided…"
//  4  A clear sequence of work                18.45   "That's what we need to establish before building…"
//  5  SVG 1 O.V.E.R.                          26.34   "To turn a workflow into a real agent…"
//  6  Only half the challenge                 44.84   "But designing the workflow is only half…"
//  7  SVG 2 Agent build blueprint             52.84   "Our agent-built blueprint…"
//  8  SVG 3 Orchestration                     110.54  "This is where orchestration comes in."
//  9  Complete, not complex                   127.64  "These five decisions give us a complete design…"
//  10 SVG 4 Larry's blueprint                 133.24  "Let's think back to Larry…"
//  11 SVG 5 Multi-step workflow               165.74  "Larry can now carry a meaningful multi-step workflow…"
//  12 The same blueprint                      172.54  "The same blueprint works for any suitable workflow."
//  13 Real value                              181.74  "That's how we build agents that deliver real value…"

export const SMALLEST_AGENT_DURATION_S = 189.4;
export const SMALLEST_AGENT_TITLE_FRAMES = 90;
// Studio 00:02.07 — where the VO starts, per the user's cut point
export const SMALLEST_AGENT_VO_FROM = 67;

const STARTS = [0, 9.4, 13.7, 18.45, 26.34, 44.84, 52.84, 110.54, 127.64, 133.24, 165.74, 172.54, 181.74];
const CROSSFADE = 0.6;
// Reveals start slightly before the spoken word so the element is readable on the onset
const LEAD = 0.15;
const PIGMENT = 'smallest-agent/pigment.png';

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
  // O.V.E.R.
  { title: 26.64, sub: 27.04, o: 33.64, v: 35.7, e: 38.54, r: 41.32, r1: 42.38, r2: 43.4, r3: 44.12 },
  // Blueprint: heading on "First, the job", question on the question, answer + tick on the answer
  {
    title: 53.24, sub: 57.28, cb: 57.64,
    r1: 59.4, q1: 61.18, h1: [59.4, 69.64], d1: [66.44, 69.64], ck1: 66.44,
    r2: 69.8, q2: 71.64, h2: [69.8, 79.84], d2: [74, 79.84], ck2: 74,
    r3: 79.96, q3: 81.82, h3: [79.96, 92.34], d3: [83.72, 92.34], ck3: 83.72,
    r4: 92.46, q4: 94.58, h4: [92.46, 104.04], d4: [98.24, 104.04], ck4: 98.24,
    r5: 104.18, q5: 106.26, h5: 104.18, d5: 106.26, ck5: 108.94,
  },
  // Orchestration
  {
    title: 111.44, n1: 114.06, a1: 115.24, n2: 115.84, a2: 116.94, n3: 117.2, loop: 118.88,
    prog: 121.04, kb: 123.2, p1: 124.24, p2: 125.24, p3: 126.06,
  },
  // Larry
  { title: 135.54, larry: 136.24, l1: 138.12, l2: 141.6, l3: 145.64, l4: 153.1, l5: 158.82 },
  // Pipeline
  { title: 166.04, box: 166.84, s1: 167.32, a1: 167.74, s2: 167.9, a2: 168.64, s3: 168.94, a3: 169.54, s4: 169.84, sub: 170.24 },
  // Larry recap (replacement intro)
  { title: 0.9, larry: 1.14, box: 3.7, c1: 3.94, c2: 5.44, c3: 6.5 },
  // Agent / automation / people (replacement intro)
  { title: 13.84, c1: 16.04, c2: 16.76, c3: 17.64, flow: 18.0 },
];

const SvgSlide: React.FC<{ t: number; index: number; start: number }> = ({ t, index, start }) => {
  const scope = `sa-s${index + 1}`;
  const css = Object.entries(CUES[index])
    .map(([key, cue]) => {
      const [at, out] = typeof cue === 'number' ? [cue, 1e6] : cue;
      const p = prog(t, Math.max(at - LEAD, start), 0.5) * (1 - prog(t, out - 0.3, 0.3, IN_OUT));
      return `.${scope} [data-r="${key}"]{opacity:${p.toFixed(4)};transform:translateY(${(14 * (1 - p)).toFixed(2)}px)}`;
    })
    .join('\n');
  const html = SMALLEST_AGENT_SVGS[index].replace('__PIGMENT__', staticFile(PIGMENT));
  // Slow push-in keeps the static slides alive without moving content off the safe area
  const zoom = 1 + 0.015 * prog(t, start, 40, Easing.inOut(Easing.sin));
  return (
    <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
      <style>{css}</style>
      <div className={scope} style={{ width: 1920, height: 1080 }} dangerouslySetInnerHTML={{ __html: html }} />
    </AbsoluteFill>
  );
};

const CSS = `
  .sa-pad { position: absolute; left: 84px; right: 84px; top: 130px; bottom: 130px; display: flex; flex-direction: column; justify-content: center; }
  .sa-label { font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; position: absolute; left: 84px; top: 52px; }
  .sa-h1, .sa-h2, .sa-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.03em; margin: 0; color: #111; }
  .sa-h1 { font-size: 96px; line-height: 1.12; max-width: 1600px; }
  .sa-h2 { font-size: 66px; line-height: 1.18; max-width: 1560px; }
  .sa-h3 { font-size: 46px; line-height: 1.25; }
  .sa-body { font-family: 'Public Sans'; font-size: 38px; line-height: 1.45; margin: 0; max-width: 1400px; color: #111; }
  .sa-muted { color: ${colors.neutral600}; }
  .sa-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .sa-accent-bar { width: 96px; height: 8px; background: ${colors.lime500}; margin-bottom: 44px; }
  .sa-kicker { font-family: 'Public Sans'; font-size: 24px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-bottom: 24px; }
  .sa-cols { display: grid; gap: 56px; margin-top: 64px; }
  .sa-col { border-top: 8px solid ${colors.lime500}; padding-top: 30px; }
  .sa-col.dark { border-top-color: #111; }
  .sa-col-body { font-family: 'Public Sans'; font-size: 30px; line-height: 1.4; color: ${colors.neutral600}; margin-top: 14px; }
  .sa-q { display: flex; align-items: baseline; gap: 28px; margin-bottom: 26px; }
  .sa-q-dot { width: 18px; height: 18px; border-radius: 50%; background: ${colors.lime500}; border: 3px solid #111; flex: none; transform: translateY(-6px); }
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
  [0, 5],
  [2, 6],
  [4, 0],
  [6, 1],
  [7, 2],
  [9, 3],
  [10, 4],
];

const Columns: React.FC<{ t: number; items: { at: number; head: React.ReactNode; body?: string; dark?: boolean }[] }> = ({
  t,
  items,
}) => (
  <div className="sa-cols" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
    {items.map((it, i) => (
      <div key={i} className={`sa-col${it.dark ? ' dark' : ''}`} style={enter(t, it.at)}>
        <div className="sa-h3">{it.head}</div>
        {it.body && <div className="sa-col-body">{it.body}</div>}
      </div>
    ))}
  </div>
);

const SmallestAgentBody: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fadeOut = 1 - prog(t, 188.24, 0.9, Easing.in(Easing.quad));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/smallest-agent.mp3')} />
      {/* Loads the slides' lime texture up front so the SVG pattern never renders without it */}
      <Img src={staticFile(PIGMENT)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />

      {SVG_SCENES.map(([sceneIndex, svgIndex]) => (
        <Scene key={sceneIndex} t={t} index={sceneIndex}>
          <SvgSlide t={t} index={svgIndex} start={STARTS[sceneIndex]} />
        </Scene>
      ))}

      {/* 2 — Which capabilities? */}
      <Scene t={t} index={1}>
        <div className="sa-label" style={enter(t, 9.6, { y: 12 })}>BUT FIRST</div>
        <div className="sa-pad">
          <div className="sa-h1" style={enter(t, 9.6, { dur: 0.9, y: 30 })}>
            How do we decide which capabilities an agent <span className="sa-mark" style={markStyle(t, 12.36)}>actually needs?</span>
          </div>
        </div>
      </Scene>

      {/* 4 — A clear sequence of work */}
      <Scene t={t} index={3}>
        <div className="sa-label" style={enter(t, 18.7, { y: 12 })}>BEFORE BUILDING</div>
        <div className="sa-pad">
          <div className="sa-h3 sa-muted" style={{ marginBottom: 56, ...enter(t, 18.7) }}>
            What we need to establish before building:
          </div>
          <div className="sa-accent-bar" style={enter(t, 21.4, { y: 0 })} />
          <div className="sa-h1" style={{ marginBottom: 40, ...enter(t, 21.5, { dur: 0.9, y: 30 }) }}>
            A clear <span className="sa-mark" style={markStyle(t, 22.0)}>sequence of work</span>
          </div>
          <div className="sa-h2" style={enter(t, 23.04)}>
            with the <span className="sa-mark" style={markStyle(t, 23.6)}>right responsibilities</span> assigned to each part.
          </div>
        </div>
      </Scene>

      {/* 6 — Only half the challenge */}
      <Scene t={t} index={5}>
        <div className="sa-label" style={enter(t, 45.14, { y: 12 })}>FROM DESIGN TO SYSTEM</div>
        <div className="sa-pad">
          <div className="sa-h3 sa-muted" style={{ marginBottom: 56, ...enter(t, 45.14) }}>
            Designing the workflow is only half the challenge.
          </div>
          <div className="sa-accent-bar" style={enter(t, 48.14, { y: 0 })} />
          <div className="sa-h1" style={enter(t, 48.24, { dur: 0.9, y: 30 })}>
            Turn that design into a system that can{' '}
            <span className="sa-mark" style={markStyle(t, 51.14)}>carry the work forward.</span>
          </div>
        </div>
      </Scene>

      {/* 9 — Complete, not complex */}
      <Scene t={t} index={8}>
        <div className="sa-label" style={enter(t, 127.94, { y: 12 })}>THE AGENT BUILD BLUEPRINT</div>
        <div className="sa-pad">
          <div className="sa-accent-bar" style={enter(t, 127.94, { y: 0 })} />
          <div className="sa-h1" style={{ marginBottom: 48, ...enter(t, 128.04, { dur: 0.9, y: 30 }) }}>
            Five decisions. <span className="sa-mark" style={markStyle(t, 129.44)}>A complete design.</span>
          </div>
          <div className="sa-h3 sa-muted" style={enter(t, 130.44)}>
            Without requiring unnecessary complexity.
          </div>
        </div>
      </Scene>

      {/* 12 — The same blueprint */}
      <Scene t={t} index={11}>
        <div className="sa-label" style={enter(t, 172.84, { y: 12 })}>FOR ANY SUITABLE WORKFLOW</div>
        <div className="sa-pad">
          <div className="sa-h2" style={enter(t, 172.74, { dur: 0.9, y: 30 })}>
            The same blueprint works for <span className="sa-mark" style={markStyle(t, 174.04)}>any suitable workflow.</span>
          </div>
          <Columns
            t={t}
            items={[
              { at: 175.79, head: 'Start with a clear job' },
              { at: 177.39, head: 'Give the agent what it needs' },
              { at: 179.14, head: 'Retain human control where it matters', dark: true },
            ]}
          />
        </div>
      </Scene>

      {/* 13 — Real value (final scene: content fades out at the end) */}
      <Scene t={t} index={12} contentStyle={{ opacity: fadeOut }}>
        <div className="sa-pad">
          <div className="sa-accent-bar" style={enter(t, 181.94, { y: 0 })} />
          <div className="sa-h1" style={{ marginBottom: 48, ...enter(t, 182.04, { dur: 0.9, y: 30 }) }}>
            Agents that deliver <span className="sa-mark" style={markStyle(t, 183.64)}>real value</span>
          </div>
          <div className="sa-h3 sa-muted" style={enter(t, 184.64)}>
            without taking on more complexity than necessary.
          </div>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const SmallestAgent: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence from={SMALLEST_AGENT_VO_FROM}>
      <SmallestAgentBody />
    </Sequence>
    {/* zIndex lifts the card above the body scenes, which stack with z-index 1–50 */}
    <Sequence durationInFrames={SMALLEST_AGENT_TITLE_FRAMES} style={{ zIndex: 100 }}>
      <TitleCardGreen label="UNDERSTANDING AGENTS" title="Turning a Workflow Into an Agent" />
    </Sequence>
  </AbsoluteFill>
);
