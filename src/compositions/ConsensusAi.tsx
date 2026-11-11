import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
  AppWindow,
  BACK,
  Check,
  Cross,
  FileIcon,
  GREEN,
  INK,
  IN_OUT,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  RED,
  Toggle,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// Consensus AI — custom screenshot demo (Lead with AI), built with the LWAI demo kit (src/kit).
// One clock: t = VO seconds of audio/consensus.mp3 (Daan, ElevenLabs v4, take 1, 206.7s of speech).
// Every cue is the start of the word it names, from src/data/consensus.transcript.json (Scribe).
// A 90-frame green title card opens the video; the VO and all scenes start after it.
// Screenshots: consensus/images/*.png, 1920x958 (captured 11 Nov 2026, see 00-verification-notes.txt).
//
//  #  scene                               start   VO cue
//  1  Many sources                        0.00    "When you use AI to research a topic…"
//  2  What Consensus is                   13.76   "That's where Consensus comes in."
//  3  When it's useful                    27.28   "It's useful when you want to investigate…"
//  4  Research at the center              34.96   "General-purpose research tools…"
//  5  How it works                        43.60   "It searches the research literature…"
//  6  Preprints                           52.24   "Preprints haven't completed peer review…"
//  7  Trace the answer                    58.76   "The value isn't just finding an answer…"
//  8  Ask a question        [01]          65.28   "Let's see how this works."
//  9  Pro vs Deep           [02]          73.68   "I'll submit it using the default mode, Pro."
//  10 Results + References  [03]          92.36   "The response gives me an overview…"
//  11 Paper overview        [05]          103.00  "…in the References panel."
//  12 Evidence tab          [06]          105.20  "The Evidence tab shows…"
//  13 Study Snapshot        [07]          115.04  "Next, I select Snapshot…"
//  14 Access                              136.80  "Also, a citation doesn't always mean free access."
//  15 The goal                            145.04  "The goal isn't to collect citations."
//  16 Filters               [11]          153.44  "The Filter menu lets me narrow results…"
//  17 Save to My Library    [12]          164.24  "And I can save useful papers…"
//  18 Collection            [13]          167.20  "…in My Library"
//  19 Export                [14]          169.60  "…or export the references"
//  20 ChatGPT + Claude      [17, 16]      172.48  "Consensus can also connect with AI platforms…"
//  21 Combine sources                     182.32  "For example, I can combine recent business reports…"
//  22 When evidence matters               190.24  "Consensus is most useful when…"
//  23 Always verify                       199.72  "But its coverage isn't exhaustive…"

export const CONSENSUS_DURATION_S = 208.2;
export const CONSENSUS_TITLE_FRAMES = 90;

const STARTS = [
  0, 13.76, 27.28, 34.96, 43.6, 52.24, 58.76, 65.28, 73.68, 92.36, 103.0, 105.2, 115.04, 136.8, 145.04, 153.44, 164.24,
  167.2, 169.6, 172.48, 182.32, 190.24, 199.72,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;
const SITE = 'consensus.app';

// Browser previews can inject the screenshots (as data URIs) via globalThis.CONSENSUS_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { CONSENSUS_SHOTS?: Record<string, string> }).CONSENSUS_SHOTS?.[n] ??
  staticFile(`consensus/images/${n}.png`);

// ── small icons ────────────────────────────────────────────────────────────
const Ico: React.FC<{ d: string; size?: number; color?: string }> = ({ d, size = 44, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" style={{ flex: 'none' }}>
    <path d={d} />
  </svg>
);
const I = {
  globe: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3',
  news: 'M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 12h7M7 15h4',
  chart: 'M4 20h16M7 17v-5M12 17V7M17 17v-8',
  book: 'M4 5.5C6.5 4 9.5 4 12 5.5V20c-2.5-1.5-5.5-1.5-8 0zM20 5.5C17.5 4 14.5 4 12 5.5V20c2.5-1.5 5.5-1.5 8 0z',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13M15.5 15.5L20 20',
  question: 'M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.6v.4M12 17h.01',
  scale: 'M12 4v16M7 20h10M5 7h14M5 7l-3 6h6zM19 7l-3 6h6z',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18',
  chat: 'M4 5h16v11H9l-5 4z',
};

const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <span className="kit-ui" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 12px', borderRadius: 8, background: LIME_SOFT, color: GREEN, fontWeight: 700, fontSize: 20, ...style }}>
    {children}
  </span>
);

// ── Body ────────────────────────────────────────────────────────────────────
const ConsensusBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/consensus.mp3')} />}

      {/* 1 — Many sources */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Research with AI</div>
        <div className="kit-h2" style={enter(t, 0.3, { dur: 0.9, y: 30 })}>
          AI research draws on <span className="kit-mark" style={markStyle(t, 3.44)}>many sources.</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 80 }}>
          {(
            [
              ['Websites', I.globe, 4.0],
              ['News articles', I.news, 4.92],
              ['Reports', I.chart, 6.08],
              ['Academic papers', I.book, 6.96],
            ] as const
          ).map(([label, icon, at], i) => {
            const focus = prog(t, 8.4, 0.8, IN_OUT);
            const isPaper = i === 3;
            return (
              <div key={label} style={{ flex: 1, ...enter(t, at, { y: 30, easing: BACK }) }}>
                <div
                  className="kit-card"
                  style={{
                    padding: '40px 34px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 22,
                    opacity: isPaper ? 1 : 1 - focus * 0.65,
                    borderColor: isPaper && focus > 0.5 ? LIME : LINE,
                    background: isPaper && focus > 0.5 ? LIME_SOFT : '#fff',
                    transform: `scale(${isPaper ? 1 + focus * 0.06 : 1 - focus * 0.04})`,
                  }}
                >
                  <Ico d={icon} size={60} />
                  <div className="kit-h3" style={{ fontSize: 36 }}>{label}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="kit-body" style={{ fontSize: 40, marginTop: 70, ...enter(t, 9.6, { y: 16 }) }}>
          Sometimes you want to know what the <span className="kit-mark" style={markStyle(t, 10.96)}>scientific research</span> says.
        </p>
      </Scene>

      {/* 2 — What Consensus is */}
      <Scene t={t} index={1}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 700px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 13.9, { y: 14 })}>Meet Consensus</div>
            <div className="kit-h1" style={enter(t, 14.24, { dur: 0.9, y: 34 })}>Consensus</div>
            <p className="kit-body" style={{ fontSize: 42, marginTop: 26, ...enter(t, 16.96, { y: 16 }) }}>
              An AI-powered <span className="kit-mark" style={markStyle(t, 17.84)}>academic research</span> platform.
            </p>
            <div style={{ display: 'flex', gap: 18, marginTop: 56 }}>
              {(
                [
                  ['Find', 20.64],
                  ['Compare', 21.32],
                  ['Understand', 22.0],
                ] as const
              ).map(([w, at]) => (
                <div key={w} className="kit-pill" style={enter(t, at, { y: 20, easing: BACK })}>
                  {w}
                </div>
              ))}
            </div>
          </div>
          {/* answer linked to papers */}
          <div style={{ position: 'relative', height: 560 }}>
            <div className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: 190, width: 290, padding: '26px 26px', borderColor: LIME, background: LIME_SOFT, ...enter(t, 24.4, { x: -30, y: 0, easing: BACK }) }}>
              <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: GREEN }}>ANSWER</div>
              <div style={{ fontSize: 26, marginTop: 10, lineHeight: 1.35 }}>
                Remote work modestly improves productivity <Chip style={{ fontSize: 16 }}>1</Chip> <Chip style={{ fontSize: 16 }}>2</Chip>
              </div>
            </div>
            <svg width={700} height={560} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
              {[70, 280, 490].map((y, i) => {
                const p = prog(t, 25.12 + i * 0.2, 0.7, IN_OUT);
                return <path key={y} d={`M290 280 C 360 280, 360 ${y}, 420 ${y}`} fill="none" stroke={GREEN} strokeWidth={4} strokeDasharray="400" strokeDashoffset={400 * (1 - p)} />;
              })}
            </svg>
            {[0, 1, 2].map((i) => (
              <div key={i} className="kit-card kit-ui" style={{ position: 'absolute', left: 420, top: 30 + i * 210, width: 280, padding: '20px 22px', display: 'flex', gap: 14, alignItems: 'center', ...enter(t, 25.5 + i * 0.25, { x: 24, y: 0 }) }}>
                <FileIcon size={40} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>Paper {i + 1}</div>
                  <div style={{ fontSize: 18, color: MUTED }}>Peer-reviewed study</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 3 — When it's useful */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 27.4, { y: 14 })}>When to use it</div>
        <div className="kit-h2" style={enter(t, 27.5, { dur: 0.8, y: 30 })}>Useful when you want to…</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.25fr', gap: 34, marginTop: 70 }}>
          <div className="kit-card" style={{ padding: '40px 36px', ...enter(t, 28.48, { y: 30, easing: BACK }) }}>
            <Ico d={I.search} size={64} />
            <div className="kit-h3" style={{ marginTop: 26 }}>Investigate a claim</div>
          </div>
          <div className="kit-card" style={{ padding: '40px 36px', ...enter(t, 30.12, { y: 30, easing: BACK }) }}>
            <Ico d={I.question} size={64} />
            <div className="kit-h3" style={{ marginTop: 26 }}>Challenge an assumption</div>
          </div>
          <div className="kit-card" style={{ padding: '40px 36px', ...enter(t, 31.6, { y: 30, easing: BACK }) }}>
            <Ico d={I.scale} size={64} />
            <div className="kit-h3" style={{ marginTop: 26 }}>See where the evidence…</div>
            <div className="kit-ui" style={{ display: 'flex', gap: 30, marginTop: 22, fontSize: 30, fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, ...enter(t, 32.56, { y: 0, scale: 0.7, easing: BACK }) }}>
                <Check size={36} /> agrees
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, ...enter(t, 33.84, { y: 0, scale: 0.7, easing: BACK }) }}>
                <Cross size={36} /> conflicts
              </span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 4 — Research at the center */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 35.1, { y: 14 })}>What makes it different</div>
        <div className="kit-h2" style={enter(t, 35.2, { dur: 0.8, y: 30 })}>
          Scholarly research at the <span className="kit-mark" style={markStyle(t, 41.84)}>center.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, marginTop: 64 }}>
          <div className="kit-card" style={{ padding: '36px 40px', opacity: 1 - prog(t, 39.0, 0.6) * 0.45, ...enter(t, 35.6, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 20, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>GENERAL-PURPOSE TOOLS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 28 }}>
              {(
                [
                  ['Websites', I.globe, 36.0],
                  ['News', I.news, 36.2],
                  ['Reports', I.chart, 36.4],
                  ['Academic papers', I.book, 37.2],
                ] as const
              ).map(([w, ic, at]) => (
                <div key={w} className="kit-pill" style={{ fontSize: 24, padding: '10px 20px', ...enter(t, at, { y: 14 }) }}>
                  <Ico d={ic} size={28} color={MUTED} /> {w}
                </div>
              ))}
            </div>
          </div>
          <div className="kit-card" style={{ padding: '36px 40px', borderColor: LIME, ...enter(t, 39.76, { y: 24, easing: BACK }) }}>
            <div className="kit-ui" style={{ fontSize: 20, letterSpacing: '.1em', fontWeight: 700, color: GREEN }}>CONSENSUS</div>
            <div style={{ position: 'relative', height: 120, marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="kit-pill" style={{ background: LIME_SOFT, borderColor: LIME, fontSize: 30, ...enter(t, 40.64, { y: 0, scale: 0.7, easing: BACK }) }}>
                <Ico d={I.book} size={36} /> Scholarly research
              </div>
            </div>
            <div className="kit-ui" style={{ fontSize: 24, color: MUTED, textAlign: 'center', ...enter(t, 42.08, { y: 10 }) }}>
              The workflow is built around the papers.
            </div>
          </div>
        </div>
      </Scene>

      {/* 5 — How it works */}
      <Scene t={t} index={4}>
        <div className="kit-label" style={enter(t, 43.7, { y: 14 })}>How it works</div>
        <div className="kit-h2" style={enter(t, 43.8, { dur: 0.8, y: 30 })}>From the literature to a cited answer.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 90 }}>
          <div className="kit-card" style={{ flex: 1, padding: '34px 34px', ...enter(t, 44.52, { y: 24, easing: BACK }) }}>
            <Ico d={I.book} size={56} />
            <div className="kit-h3" style={{ marginTop: 18 }}>Research literature</div>
            <div style={{ marginTop: 16, ...enter(t, 46.0, { y: 0, scale: 0.7, easing: BACK }) }}>
              <span className="kit-tag">Incl. preprints</span>
            </div>
          </div>
          <Arrow t={t} at={47.2} w={110} />
          <div className="kit-card" style={{ flex: 1, padding: '34px 34px', ...enter(t, 47.52, { y: 24, easing: BACK }) }}>
            <Ico d={I.spark} size={56} />
            <div className="kit-h3" style={{ marginTop: 18 }}>AI synthesizes the findings</div>
          </div>
          <Arrow t={t} at={49.9} w={110} />
          <div className="kit-card" style={{ flex: 1, padding: '34px 34px', borderColor: LIME, background: LIME_SOFT, ...enter(t, 50.44, { y: 24, easing: BACK }) }}>
            <Ico d={I.chat} size={56} />
            <div className="kit-h3" style={{ marginTop: 18 }}>Answers with citations</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {[1, 2, 3].map((n, i) => (
                <Chip key={n} style={enter(t, 51.04 + i * 0.12, { y: 0, scale: 0.6, easing: BACK })}>
                  {n}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 6 — Preprints */}
      <Scene t={t} index={5}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 720px', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 52.4, { y: 14 })}>Preprints</div>
            <div className="kit-h2" style={enter(t, 52.5, { dur: 0.8, y: 30 })}>
              Not yet <span className="kit-mark" style={markStyle(t, 53.68)}>peer reviewed.</span>
            </div>
            <p className="kit-body kit-muted" style={{ marginTop: 34, ...enter(t, 54.96, { y: 14 }) }}>
              Want to leave them out? Use the filter.
            </p>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '34px 38px', ...enter(t, 55.6, { y: 30 }) }}>
            <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>FILTER</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 22 }}>
              <div style={{ flex: 1, fontSize: 34, fontWeight: 600 }}>
                <span className="kit-mark" style={markStyle(t, 57.36)}>Exclude Preprints</span>
              </div>
              <Toggle on={prog(t, 57.0, 0.35, IN_OUT)} w={96} />
            </div>
            <div style={{ height: 2, background: LINE, margin: '24px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: 0.45 }}>
              <div style={{ flex: 1, fontSize: 30, fontWeight: 500 }}>Open access</div>
              <Toggle on={0} w={96} />
            </div>
          </div>
        </div>
      </Scene>

      {/* 7 — Trace the answer */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 58.9, { y: 14 })}>The value</div>
        <div className="kit-h2" style={enter(t, 59.0, { dur: 0.8, y: 30 })}>
          Trace the answer <span className="kit-mark" style={markStyle(t, 63.28)}>back to the research.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 90 }}>
          <div className="kit-card kit-ui" style={{ width: 720, padding: '30px 34px', fontSize: 30, lineHeight: 1.45, ...enter(t, 60.0, { y: 24 }) }}>
            Remote work modestly improves employee productivity{' '}
            <Chip style={{ fontSize: 20, outline: t >= 62.44 ? `3px solid ${LIME}` : 'none' }}>Gibbs 2022</Chip>
          </div>
          <Arrow t={t} at={62.44} w={200} />
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '28px 30px', display: 'flex', gap: 22, alignItems: 'center', borderColor: LIME, ...enter(t, 63.28, { x: 30, y: 0, easing: BACK }) }}>
            <FileIcon size={64} accent />
            <div>
              <div style={{ fontSize: 26, fontWeight: 700, lineHeight: 1.3 }}>Work from Home and Productivity</div>
              <div style={{ fontSize: 20, color: MUTED, marginTop: 6 }}>Journal of Political Economy Microeconomics · 2022</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 8 — Ask a question [01] */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={65.28}
          title={SITE}
          imgH={IMG_H}
          src={shot('01-research-question')}
          cam={[{ at: 69.9, x: 1057, y: 380, s: 1.7, dur: 1.0 }]}
          rings={[{ at: 70.48, x: 676, y: 327, w: 762, h: 108 }]}
          steps={[
            { at: 67.28, text: 'Open consensus.app' },
            { at: 70.48, text: 'Ask a research question' },
          ]}
        />
      </Scene>

      {/* 9 — Pro vs Deep [02] */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={73.68}
          title={SITE}
          imgH={IMG_H}
          src={shot('02-deep-toggle')}
          cam={[{ at: 73.68, x: 1057, y: 380, s: 1.7, dur: 0.01 }]}
          rings={[
            { at: 75.4, until: 80.4, x: 1396, y: 393, w: 36, h: 36 },
            { at: 83.3, until: 90.6, x: 818, y: 394, w: 110, h: 34, spot: true },
            { at: 91.7, x: 1396, y: 393, w: 36, h: 36 },
          ]}
          steps={[
            { at: 74.8, text: 'Default mode: Pro' },
            { at: 83.3, text: 'Optional: switch on Deep' },
            { at: 91.6, text: 'Stay with Pro and submit' },
          ]}
        />
        <div className="kit-ui" style={{ position: 'absolute', right: 230, top: 150, display: 'flex', flexDirection: 'column', gap: 14, zIndex: 5 }}>
          <div className="kit-card" style={{ padding: '18px 24px', width: 430, boxShadow: '0 16px 40px rgba(0,0,0,.12)', opacity: t < 82.6 ? 1 : 0.55, ...enter(t, 76.72, { x: 30, y: 0 }) }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Pro</div>
            <div style={{ fontSize: 21, color: MUTED, marginTop: 4 }}>Searches the literature, writes a cited synthesis</div>
          </div>
          <div className="kit-card" style={{ padding: '18px 24px', width: 430, borderColor: LIME, boxShadow: '0 16px 40px rgba(0,0,0,.12)', ...enter(t, 85.76, { x: 30, y: 0 }) }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Deep</div>
            <div style={{ fontSize: 21, color: MUTED, marginTop: 4 }}>Multiple searches, a more detailed review</div>
          </div>
        </div>
      </Scene>

      {/* 10 — Results + References [03] */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          t={t}
          start={92.36}
          title={SITE}
          imgH={IMG_H}
          src={shot('03-pro-results-consensus-meter')}
          cam={[
            { at: 93.4, x: 737, y: 330, s: 1.5, dur: 1.0 },
            { at: 95.2, x: 737, y: 600, s: 1.5, dur: 0.9 },
            { at: 97.5, x: 1590, y: 470, s: 1.2, dur: 1.0 },
          ]}
          rings={[
            { at: 93.68, until: 95.0, x: 350, y: 278, w: 760, h: 60 },
            { at: 95.36, until: 97.3, x: 488, y: 708, w: 430, h: 50 },
            { at: 97.76, until: 101.4, x: 1272, y: 70, w: 626, h: 830, spot: true },
            { at: 101.76, x: 1278, y: 138, w: 600, h: 230 },
          ]}
          steps={[
            { at: 93.68, text: 'Overview of the findings' },
            { at: 95.36, text: 'Citations in the answer' },
            { at: 97.76, text: 'References panel' },
            { at: 101.76, text: 'Open a paper' },
          ]}
        />
      </Scene>

      {/* 11 — Paper overview [05] */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          t={t}
          start={103.0}
          title={SITE}
          imgH={IMG_H}
          src={shot('05-paper-overview')}
          cam={[{ at: 103.0, x: 1590, y: 330, s: 1.6, dur: 0.01 }]}
          steps={[{ at: 103.28, text: 'Paper details' }]}
        />
      </Scene>

      {/* 12 — Evidence tab [06] */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          t={t}
          start={105.2}
          title={SITE}
          imgH={IMG_H}
          src={shot('06-supporting-evidence')}
          cam={[{ at: 105.2, x: 1590, y: 330, s: 1.6, dur: 0.01 }]}
          rings={[
            { at: 105.3, until: 105.9, x: 1566, y: 66, w: 88, h: 30 },
            { at: 106.0, until: 107.4, x: 1300, y: 150, w: 596, h: 430 },
            { at: 107.6, until: 110.3, x: 1312, y: 160, w: 116, h: 26 },
            { at: 111.04, x: 1300, y: 150, w: 596, h: 60, spot: true },
          ]}
          steps={[
            { at: 105.3, text: 'Evidence tab' },
            { at: 106.0, text: 'Supporting passages' },
            { at: 107.6, text: 'From the abstract or full text' },
            { at: 111.04, text: 'Does the paper support the claim?' },
          ]}
        />
      </Scene>

      {/* 13 — Study Snapshot [07] */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          t={t}
          start={115.04}
          title={SITE}
          imgH={IMG_H}
          left={740}
          top={210}
          width={1100}
          src={shot('07-study-snapshot-missing-fields')}
          cam={[
            { at: 115.04, x: 1590, y: 300, s: 1.8, dur: 0.01 },
            { at: 131.4, x: 1590, y: 300, s: 1.8, dur: 0.01 },
          ]}
          rings={[
            { at: 116.3, until: 117.4, x: 1372, y: 66, w: 66, h: 30 },
            { at: 120.24, until: 131.2, x: 1272, y: 108, w: 626, h: 290 },
            { at: 132.48, x: 1280, y: 406, w: 178, h: 24, spot: true },
          ]}
          steps={[
            { at: 116.24, text: 'Snapshot' },
            { at: 118.48, text: 'Generate Snapshot, if prompted' },
            { at: 132.48, text: '4 of 7 attributes extracted' },
          ]}
        />
        <div style={{ position: 'absolute', left: 80, top: 200, width: 600 }}>
          <div className="kit-label" style={enter(t, 120.24, { y: 14 })}>Study Snapshot</div>
          <div className="kit-ui" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(
              [
                ['Population', 123.6, true],
                ['Sample size', 124.64, false],
                ['Duration', 125.68, false],
                ['Methods', 126.84, true],
                ['Outcomes', 127.52, true],
                ['Findings', 128.32, true],
                ['Location', 128.9, false],
              ] as const
            ).map(([w, at, ok]) => {
              const judged = t >= (ok ? 129.36 : 130.32);
              return (
                <div
                  key={w}
                  className="kit-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    padding: '12px 22px',
                    fontSize: 28,
                    fontWeight: 600,
                    color: judged && !ok ? MUTED : INK,
                    background: judged && ok ? LIME_SOFT : '#fff',
                    borderColor: judged && ok ? LIME_SOFT : LINE,
                    ...enter(t, at, { x: -24, y: 0 }),
                  }}
                >
                  <span style={{ flex: 1, textDecoration: judged && !ok ? 'line-through' : 'none' }}>{w}</span>
                  {judged ? ok ? <Check size={30} /> : <Cross size={30} /> : <span style={{ width: 30 }} />}
                </div>
              );
            })}
          </div>
          <p className="kit-body" style={{ fontSize: 26, marginTop: 24, ...enter(t, 134.64, { y: 12 }) }}>
            Check the <span className="kit-mark" style={markStyle(t, 134.96)}>original paper</span> for the rest.
          </p>
        </div>
      </Scene>

      {/* 14 — Access */}
      <Scene t={t} index={13}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 660px', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 136.9, { y: 14 })}>Access</div>
            <div className="kit-h2" style={enter(t, 137.0, { dur: 0.8, y: 30 })}>
              A citation isn't always <span className="kit-mark" style={markStyle(t, 139.44)}>free access.</span>
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '34px 36px', ...enter(t, 138.0, { y: 30 }) }}>
            <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
              <FileIcon size={60} />
              <div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>Journal article</div>
                <div style={{ fontSize: 20, color: MUTED, marginTop: 4 }}>Cited in your answer</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 28, padding: '16px 20px', borderRadius: 14, background: '#FFF4EC', color: RED, fontSize: 26, fontWeight: 600, ...enter(t, 140.8, { y: 0, scale: 0.8, easing: BACK }) }}>
              <Ico d={I.lock} size={34} color={RED} /> Subscription required
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 22 }}>
              <span className="kit-pill" style={{ fontSize: 24, padding: '10px 20px', ...enter(t, 142.4, { y: 12 }) }}>Personal</span>
              <span className="kit-pill" style={{ fontSize: 24, padding: '10px 20px', ...enter(t, 143.12, { y: 12 }) }}>Institutional</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 15 — The goal */}
      <Scene t={t} index={14}>
        <div className="kit-label" style={enter(t, 145.2, { y: 14 })}>The goal</div>
        <div className="kit-h2" style={enter(t, 145.3, { dur: 0.8, y: 30 })}>
          Not to{' '}
          <span style={{ position: 'relative' }}>
            collect citations.
            <span style={{ position: 'absolute', left: 0, top: '55%', height: 6, background: RED, width: `${prog(t, 146.6, 0.6, IN_OUT) * 100}%` }} />
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ padding: '36px 40px', ...enter(t, 148.84, { y: 30, easing: BACK }) }}>
            <div className="kit-h3">How much confidence to place in the findings</div>
            <div style={{ height: 16, borderRadius: 8, background: '#EEE', marginTop: 30, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${prog(t, 149.3, 1.4, IN_OUT) * 62}%`, background: LIME, borderRadius: 8 }} />
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '36px 40px', ...enter(t, 151.28, { y: 30, easing: BACK }) }}>
            <div className="kit-h3">Whether they apply to your situation</div>
            <div style={{ marginTop: 22, ...enter(t, 152.4, { y: 0, scale: 0.6, easing: BACK }) }}>
              <Check size={48} />
            </div>
          </div>
        </div>
      </Scene>

      {/* 16 — Filters [11] */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          t={t}
          start={153.44}
          title={SITE}
          imgH={IMG_H}
          src={shot('11-search-filters-preprints')}
          cam={[{ at: 153.9, x: 1705, y: 330, s: 1.9, dur: 1.0 }]}
          rings={[
            { at: 154.2, until: 155.8, x: 1505, y: 18, w: 410, h: 28 },
            { at: 156.0, until: 157.3, x: 1505, y: 118, w: 410, h: 72 },
            { at: 157.36, until: 158.5, x: 1505, y: 525, w: 410, h: 62 },
            { at: 158.56, x: 1505, y: 470, w: 410, h: 28, spot: true },
          ]}
          steps={[
            { at: 154.0, text: 'Filter' },
            { at: 156.0, text: 'Publication year' },
            { at: 157.36, text: 'Study design' },
            { at: 158.56, text: 'Open access' },
          ]}
        />
      </Scene>

      {/* 17 — Save to My Library [12] */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          t={t}
          start={164.24}
          title={SITE}
          imgH={IMG_H}
          src={shot('12-save-paper-to-library')}
          cam={[{ at: 164.3, x: 1620, y: 390, s: 1.7, dur: 0.9 }]}
          rings={[{ at: 165.6, x: 1458, y: 372, w: 340, h: 120 }]}
          steps={[
            { at: 165.12, text: 'Save the paper' },
            { at: 166.4, text: 'Into My Library' },
          ]}
        />
      </Scene>

      {/* 18 — Collection [13] */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={167.2}
          title={SITE}
          imgH={IMG_H}
          src={shot('13-saved-collection')}
          rings={[
            { at: 167.4, until: 169.4, x: 10, y: 250, w: 192, h: 24 },
            { at: 167.9, x: 212, y: 222, w: 1690, h: 36 },
          ]}
          steps={[{ at: 167.4, text: 'Your collection' }]}
        />
      </Scene>

      {/* 19 — Export [14] */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t}
          start={169.6}
          title={SITE}
          imgH={IMG_H}
          src={shot('14-reference-export-options')}
          cam={[
            { at: 169.6, x: 960, y: 479, s: 1, dur: 0.01 },
            { at: 169.9, x: 1055, y: 670, s: 1.7, dur: 1.0 },
          ]}
          rings={[{ at: 170.48, x: 880, y: 558, w: 348, h: 212, spot: true }]}
          steps={[{ at: 170.48, text: 'Export the references' }]}
        />
      </Scene>

      {/* 20 — ChatGPT + Claude [17, 16] */}
      <Scene t={t} index={19} pad={false}>
        <div style={{ position: 'absolute', left: 80, top: 80 }}>
          <div className="kit-label" style={enter(t, 172.6, { y: 14 })}>Across AI platforms</div>
          <div className="kit-h2" style={{ fontSize: 64, ...enter(t, 172.7, { dur: 0.8, y: 30 }) }}>
            Bring <span className="kit-mark" style={markStyle(t, 179.28)}>cited research</span> into your AI chat.
          </div>
        </div>
        <AppWindow
          t={t}
          start={175.4}
          title="chatgpt.com"
          imgH={IMG_H}
          left={80}
          top={330}
          width={860}
          src={shot('17-chatgpt-consensus-plugin')}
          cam={[{ at: 175.4, x: 980, y: 230, s: 1.9, dur: 0.01 }]}
          rings={[{ at: 176.8, x: 1214, y: 84, w: 126, h: 36 }]}
        />
        <AppWindow
          t={t}
          start={176.6}
          title="claude.ai"
          imgH={IMG_H}
          left={980}
          top={330}
          width={860}
          src={shot('16-claude-consensus-connector')}
          cam={[{ at: 176.6, x: 900, y: 230, s: 1.9, dur: 0.01 }]}
          rings={[{ at: 177.68, x: 1190, y: 139, w: 74, h: 28 }]}
        />
        <div className="kit-ui" style={{ position: 'absolute', left: 80, width: 860, top: 830, display: 'flex', justifyContent: 'center', ...enter(t, 175.8, { y: 12 }) }}>
          <span className="kit-pill" style={{ fontSize: 26 }}>Plugin in ChatGPT</span>
        </div>
        <div className="kit-ui" style={{ position: 'absolute', left: 980, width: 860, top: 830, display: 'flex', justifyContent: 'center', gap: 14, ...enter(t, 176.9, { y: 12 }) }}>
          <span className="kit-pill" style={{ fontSize: 26 }}>Connector in Claude</span>
          <span className="kit-tag" style={{ alignSelf: 'center', ...enter(t, 177.68, { y: 0, scale: 0.6, easing: BACK }) }}>Where available</span>
        </div>
      </Scene>

      {/* 21 — Combine sources */}
      <Scene t={t} index={20}>
        <div className="kit-label" style={enter(t, 182.4, { y: 14 })}>For example</div>
        <div className="kit-h2" style={enter(t, 182.5, { dur: 0.8, y: 30 })}>
          Combine <span className="kit-mark" style={markStyle(t, 183.44)}>reports and research.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: 520 }}>
            <div className="kit-card kit-ui" style={{ padding: '24px 28px', display: 'flex', gap: 18, alignItems: 'center', ...enter(t, 184.4, { x: -30, y: 0, easing: BACK }) }}>
              <Ico d={I.chart} size={48} />
              <div style={{ fontSize: 28, fontWeight: 600 }}>Recent business reports</div>
            </div>
            <div className="kit-card kit-ui" style={{ padding: '24px 28px', display: 'flex', gap: 18, alignItems: 'center', borderColor: LIME, ...enter(t, 185.44, { x: -30, y: 0, easing: BACK }) }}>
              <Ico d={I.book} size={48} />
              <div>
                <div style={{ fontSize: 28, fontWeight: 600 }}>Academic studies</div>
                <div style={{ fontSize: 20, color: GREEN, fontWeight: 600 }}>via Consensus</div>
              </div>
            </div>
          </div>
          <Arrow t={t} at={186.4} w={160} />
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '30px 34px', background: '#FBFBF8', ...enter(t, 186.64, { y: 24 }) }}>
            <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>YOUR AI CONVERSATION</div>
            <div style={{ marginTop: 18, marginLeft: 60, padding: '18px 22px', borderRadius: 18, background: '#F0F0EA', fontSize: 28 }}>
              {typed(t, 187.0, 'How are organizations adapting to AI?', 1.6)}
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
              {['Report', 'Study', 'Study'].map((c, i) => (
                <Chip key={i} style={enter(t, 188.8 + i * 0.15, { y: 0, scale: 0.6, easing: BACK })}>
                  {c}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 22 — When evidence matters */}
      <Scene t={t} index={21}>
        <div className="kit-label" style={enter(t, 190.4, { y: 14 })}>Consensus</div>
        <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 190.5, { dur: 0.9, y: 34 }) }}>
          For when <span className="kit-mark" style={markStyle(t, 192.24)}>evidence quality</span> matters.
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 70 }}>
          {(
            [
              ['Discover studies', 195.36],
              ['Compare findings', 196.76],
              ['Inspect sources', 198.24],
            ] as const
          ).map(([w, at]) => (
            <div key={w} className="kit-pill" style={enter(t, at, { y: 20, easing: BACK })}>
              <Check size={30} /> {w}
            </div>
          ))}
        </div>
      </Scene>

      {/* 23 — Always verify */}
      <Scene t={t} index={22} padStyle={{ opacity: 1 - prog(t, 207.2, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 199.8, { y: 14 })}>Keep in mind</div>
        <div style={{ display: 'flex', gap: 30 }}>
          <div className="kit-card kit-ui" style={{ padding: '26px 32px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 32, fontWeight: 600, ...enter(t, 200.16, { y: 24, easing: BACK }) }}>
            <Cross size={36} /> Coverage isn't exhaustive
          </div>
          <div className="kit-card kit-ui" style={{ padding: '26px 32px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 32, fontWeight: 600, ...enter(t, 202.24, { y: 24, easing: BACK }) }}>
            <Cross size={36} /> AI can misread research
          </div>
        </div>
        <div className="kit-h1" style={{ marginTop: 80, ...enter(t, 204.56, { dur: 0.8, y: 30 }) }}>
          Always <span className="kit-mark" style={markStyle(t, 205.28)}>verify the results.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ConsensusAi: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CONSENSUS_TITLE_FRAMES}>
      <TitleCardGreen label="AI TOOLS" title="Consensus AI" />
    </Sequence>
    <Sequence from={CONSENSUS_TITLE_FRAMES}>
      <ConsensusBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
