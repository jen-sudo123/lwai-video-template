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
import { CHOOSING_WORK_SVGS } from './choosing-work-svgs';

loadSerif();
loadSans();

// Choosing Work Worth Delegating — built from the user's VO (audio/choosing-work.mp3, 207.23s) and four
// user-supplied 1600×1000 SVG slides (public/choosing-work/images/, layered into choosing-work-svgs.ts by
// videos/choosing-work/build-svgs.py). Each SVG's <g data-r="key"> groups fade in on a VO cue.
// Every cue is in SECONDS of the VO, from the Whisper word timestamps in
// src/data/choosing-work.transcript.json. A 90-frame green title card precedes the VO and holds
// over its opening until frame 163.
//
//  #  scene                                start   VO cue
//  1  The better question                  0.0     "Most AI use cases start with a very simple question…"
//  2  A very poor use case                15.6    "A technically possible agent can still be a very poor use case."
//  2b Matter enough / contained enough    20.8    "Your first agentic workflow should matter enough…" (split out, user request)
//  3  SVG 1 Start with a workflow          31.2    "One common mistake that we see…"
//  4  SVG 2 After a customer meeting       53.7    "So now instead of manage my customer accounts…"
//  5  GED-RT starting point                74.4    "Now even with agents, GED-RT is the most useful starting point…"
//  6  SVG 3 GED-RT (checks still hidden)   90.1    "This means looking for work that again is general…"
//  7  Three additional checks             104.37  GED-RT slide held to Studio 01:47.11 (user request)
//  8  SVG 3 The Agentic Fit Check (full)   147.0   "Together that gives you the agentic fit check."
//  9  SVG 4 Smallest workflow worth proving 160.0  "Now one thing we want to do is choosing the smallest…"
//  10 Your first agentic use case         187.03  "So when you're choosing your first agentic use case…" (Studio 03:10.01, user request)

export const CHOOSING_WORK_DURATION_S = 207.232;
export const CHOOSING_WORK_TITLE_FRAMES = 90;

const STARTS = [0, 15.6, 20.8, 31.2, 53.7, 74.4, 90.1, 104.37, 147.0, 160.0, 187.03];
const CROSSFADE = 0.6;
// Reveals start slightly before the spoken word so the element is readable on the onset
const LEAD = 0.15;
const PIGMENT = 'choosing-work/pigment.jpg';

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

// Per-scene reveal cues (VO seconds). Anything not listed (title, header rule) is visible from the scene start;
// a key cued before its scene starts is visible on entry.
const CUES: Record<string, number>[] = [
  {
    role: 31.7, cloud: 34.7, q1: 35.7, q2: 37.9, broad: 40.9, arr: 43.9, wf: 43.9, box: 46.3, cont: 47.4,
    c1: 48.7, ar1: 50.2, c2: 50.5, ar2: 51.4, c3: 51.8,
  },
  {
    box: 55.1, bl1: 58.8, n1: 60.8, a1: 61.6, n2: 62.0, a2: 63.3, n3: 63.6, a3: 65.2, n4: 65.7, a4: 66.9,
    dia: 67.3, n5: 67.3, dn: 68.0, person: 68.5, sub: 70.2, bl2: 71.0,
  },
  // SVG 3, first pass (centred GED-RT-only variant); the checks get their own scene and return on the recap
  { top: 90.5, g: 92.6, e: 93.9, d: 94.9, r: 95.9, t: 97.0, sub: 999 },
  // SVG 3, recap: everything on entry except the header summary line
  { sub: 147.1 },
  {
    bw: 165.8, graph: 166.1, mcr: 171.1, tm: 174.3, arr: 179.7, sm: 179.7, spec: 180.1, box: 180.6,
    doc1: 183.6, ar1: 184.1, chk: 184.4, ar2: 184.9, doc2: 185.3, loop: 185.8,
    // the closing lines get their own scene (10)
    pass: 999, tag: 999,
  },
];

const SvgSlide: React.FC<{ t: number; index: number; cues: Record<string, number>; start: number }> = ({ t, index, cues, start }) => {
  const scope = `cw-s${index + 1}`;
  const css = Object.entries(cues)
    .map(([key, at]) => {
      const p = prog(t, Math.max(at - LEAD, start), 0.5);
      return `.${scope} [data-r="${key}"]{opacity:${p.toFixed(4)};transform:translateY(${(14 * (1 - p)).toFixed(2)}px)}`;
    })
    .join('\n');
  const html = CHOOSING_WORK_SVGS[index].replace('__PIGMENT__', staticFile(PIGMENT));
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
  .cw-pad { position: absolute; left: 84px; right: 84px; top: 130px; bottom: 130px; display: flex; flex-direction: column; justify-content: center; }
  .cw-label { font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; position: absolute; left: 84px; top: 52px; }
  .cw-h1, .cw-h2, .cw-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.03em; margin: 0; color: #111; }
  .cw-h1 { font-size: 96px; line-height: 1.12; max-width: 1600px; }
  .cw-h2 { font-size: 66px; line-height: 1.18; max-width: 1560px; }
  .cw-h3 { font-size: 46px; line-height: 1.2; }
  .cw-body { font-family: 'Public Sans'; font-size: 36px; line-height: 1.5; margin: 0; max-width: 1300px; color: #111; }
  .cw-muted { color: ${colors.neutral600}; }
  .cw-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }
  .cw-accent-bar { width: 96px; height: 8px; background: ${colors.lime500}; margin-bottom: 44px; }
  .cw-kicker { font-family: 'Public Sans'; font-size: 22px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin-bottom: 20px; }
  .cw-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 96px; margin-top: 72px; }
  .cw-checks { display: grid; grid-template-columns: repeat(3, 1fr); gap: 64px; margin-top: 72px; }
  .cw-check-body { font-family: 'Public Sans'; font-size: 30px; line-height: 1.45; margin: 0; color: ${colors.neutral600}; }
  .cw-chips { display: flex; flex-wrap: wrap; gap: 20px 56px; margin-top: 40px; padding-bottom: 48px; border-bottom: 2px solid ${colors.neutral200}; }
  .cw-chip { display: flex; align-items: center; gap: 20px; font-family: 'IBM Plex Serif'; font-size: 46px; letter-spacing: -0.02em; color: #111; }
  .cw-chip .dot { flex: none; width: 22px; height: 22px; border-radius: 50%; background: ${colors.lime500}; border: 3px solid #111; }
  .cw-closing { font-family: 'Public Sans'; font-size: 38px; line-height: 1.4; margin-top: 48px; color: #111; }
  .cw-strike-wrap { position: relative; display: inline-block; }
  .cw-strike { position: absolute; left: -4px; right: -4px; top: 56%; height: 4px; background: ${colors.lime500}; transform-origin: left center; }
  .cw-col { border-top: 8px solid ${colors.lime500}; padding-top: 34px; }
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

const SVG_SCENES: [sceneIndex: number, svgIndex: number, cueIndex: number][] = [
  [3, 0, 0],
  [4, 1, 1],
  [6, 4, 2], // slide 3 GED-RT-only variant (centred row)
  [8, 2, 3],
];

const CHECKS = [
  { n: '01', q: 'Is the work bounded?', at: 110.3, body: 'What the agent is responsible for, where that responsibility ends, and when a person needs to step in.', bodyAt: 113.3 },
  { n: '02', q: 'Is it testable?', at: 122.5, body: 'Whether the agent completed the work correctly, including the important steps and decisions.', bodyAt: 125.0 },
  { n: '03', q: 'Is it technically feasible?', at: 133.0, body: 'Access to the information, tools and actions the workflow requires.', bodyAt: 136.5 },
];

const ChoosingWorkBody: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const fadeOut = 1 - prog(t, 206.2, 0.9, Easing.in(Easing.quad));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/choosing-work.mp3')} />
      {/* Loads the slides' lime texture up front so the SVG pattern never renders without it */}
      <Img src={staticFile(PIGMENT)} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} />

      {/* 1 — The better question */}
      <Scene t={t} index={0}>
        <div className="cw-label" style={enter(t, 0.6, { y: 12 })}>CHOOSING WORK WORTH DELEGATING</div>
        <div className="cw-pad">
          <div className="cw-h2 cw-muted" style={{ marginBottom: 64, ...enter(t, 4.4) }}>
            “What can AI help me do?”
          </div>
          <div className="cw-kicker" style={enter(t, 6.9, { y: 12 })}>With agents, a more important question</div>
          <div className="cw-h2" style={enter(t, 10.3, { dur: 0.9, y: 30 })}>
            What work is <span className="cw-mark" style={markStyle(t, 11.1)}>worth handing over</span> for AI to carry
            forward across multiple steps?
          </div>
        </div>
      </Scene>

      {/* 2 — A very poor use case */}
      <Scene t={t} index={1}>
        <div className="cw-label" style={enter(t, 16.0, { y: 12 })}>CHOOSING WORK WORTH DELEGATING</div>
        <div className="cw-pad">
          <div className="cw-accent-bar" style={enter(t, 16.0, { y: 0 })} />
          <div className="cw-h1" style={enter(t, 16.1, { dur: 0.9, y: 34 })}>
            A technically possible agent <span className="cw-mark" style={markStyle(t, 17.8)}>can still be a very poor use case.</span>
          </div>
        </div>
      </Scene>

      {/* 2b — Matter enough, contained enough */}
      <Scene t={t} index={2}>
        <div className="cw-label" style={enter(t, 21.1, { y: 12 })}>YOUR FIRST AGENTIC WORKFLOW</div>
        <div className="cw-pad">
          <div className="cw-h2" style={enter(t, 21.1, { dur: 0.9, y: 30 })}>
            Your first agentic workflow should <span className="cw-mark" style={markStyle(t, 22.7)}>matter enough</span>, but be{' '}
            <span className="cw-mark" style={markStyle(t, 26.1)}>contained enough</span>.
          </div>
          <div className="cw-columns">
            <div className="cw-col" style={enter(t, 23.0)}>
              <div className="cw-kicker">Matter enough</div>
              <div className="cw-h3">to justify the effort</div>
            </div>
            <div className="cw-col" style={enter(t, 26.2)}>
              <div className="cw-kicker">Contained enough</div>
              <div className="cw-h3">to understand, test and supervise</div>
            </div>
          </div>
        </div>
      </Scene>

      {SVG_SCENES.map(([sceneIndex, svgIndex, cueIndex]) => (
        <Scene key={sceneIndex} t={t} index={sceneIndex}>
          <SvgSlide t={t} index={svgIndex} cues={CUES[cueIndex]} start={STARTS[sceneIndex]} />
        </Scene>
      ))}

      {/* 5 — GED-RT is still the starting point */}
      <Scene t={t} index={5}>
        <div className="cw-label" style={enter(t, 74.8, { y: 12 })}>EVEN WITH AGENTS</div>
        <div className="cw-pad">
          <div className="cw-accent-bar" style={enter(t, 75.6, { y: 0 })} />
          <div className="cw-h2" style={{ marginBottom: 48, ...enter(t, 76.3, { dur: 0.9, y: 30 }) }}>
            GED-RT is the <span className="cw-mark" style={markStyle(t, 77.8)}>most useful starting point</span> for finding
            work worth giving to AI.
          </div>
          <p className="cw-body" style={enter(t, 83.2)}>
            Shift more of your time and attention toward your{' '}
            <span className="cw-mark" style={markStyle(t, 85.9)}>North Star</span>: the work where you create the most impact.
          </p>
        </div>
      </Scene>

      {/* 7 — Three additional checks */}
      <Scene t={t} index={7}>
        <div className="cw-label" style={enter(t, 104.6, { y: 12 })}>THE AGENTIC FIT CHECK</div>
        <div className="cw-pad">
          <div className="cw-kicker" style={enter(t, 105.0, { y: 12 })}>Agentic delegation adds another design challenge</div>
          <div className="cw-h2" style={enter(t, 107.3, { dur: 0.9, y: 30 })}>
            <span className="cw-mark" style={markStyle(t, 107.7)}>Three additional checks</span> matter.
          </div>
          <div className="cw-checks">
            {CHECKS.map((c) => (
              <div key={c.n} className="cw-col" style={enter(t, c.at)}>
                <div className="cw-kicker">Check {c.n}</div>
                <div className="cw-h3" style={{ marginBottom: 24 }}>{c.q}</div>
                <p className="cw-check-body" style={enter(t, c.bodyAt, { y: 12 })}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 9 — Smallest workflow worth proving */}
      <Scene t={t} index={9}>
        <SvgSlide t={t} index={3} cues={CUES[4]} start={STARTS[9]} />
      </Scene>

      {/* 10 — Your first agentic use case (final scene: content fades out at the end) */}
      <Scene t={t} index={10} contentStyle={{ opacity: fadeOut }}>
        <div className="cw-label" style={enter(t, 187.4, { y: 12 })}>YOUR FIRST AGENTIC USE CASE</div>
        <div className="cw-pad">
          <div className="cw-h3 cw-muted" style={{ marginBottom: 56, ...enter(t, 190.1) }}>
            Don’t look for the{' '}
            <span className="cw-strike-wrap">
              biggest process
              <span className="cw-strike" style={{ transform: `scaleX(${prog(t, 191.6, 0.5, IN_OUT)})` }} />
            </span>{' '}
            you could automate.
          </div>
          <div className="cw-h2" style={enter(t, 193.7, { dur: 0.9, y: 30 })}>
            Look for the <span className="cw-mark" style={markStyle(t, 194.3)}>smallest meaningful workflow</span> that
          </div>
          <div className="cw-chips">
            {[
              ['passes GED-RT', 196.5],
              ['is bounded', 198.6],
              ['testable', 199.4],
              ['and feasible.', 200.4],
            ].map(([text, at]) => (
              <div key={text as string} className="cw-chip" style={enter(t, at as number, { y: 16 })}>
                <span className="dot" />
                {text}
              </div>
            ))}
          </div>
          <div className="cw-closing" style={enter(t, 201.7)}>
            That is the kind of work <span className="cw-mark" style={markStyle(t, 203.3)}>worth delegating</span> to an agent.
          </div>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// The title card holds until Studio 00:05.13 (user request), on top of the first ~2.4s of VO.
// The VO still starts at CHOOSING_WORK_TITLE_FRAMES, so every cue above is unchanged.
const TITLE_CARD_END_FRAME = 163;

export const ChoosingWork: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence from={CHOOSING_WORK_TITLE_FRAMES}>
      <ChoosingWorkBody />
    </Sequence>
    {/* zIndex lifts the card above the body scenes, which stack with z-index 1–50 */}
    <Sequence durationInFrames={TITLE_CARD_END_FRAME} style={{ zIndex: 100 }}>
      <TitleCardGreen label="UNDERSTANDING AGENTS" title="Choosing Work Worth Delegating" />
    </Sequence>
  </AbsoluteFill>
);
