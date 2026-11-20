import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
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
import {
  Arrow,
  BACK,
  Check,
  GREEN,
  INK,
  IN_OUT,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  RED,
  clamp,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// How to Build an AI Strategy That Actually Works — custom concept composition (Lead with AI).
// Built with the LWAI demo kit (src/kit). Every cue is in SECONDS of the VO (audio/ai-strategy.mp3,
// Daan on ElevenLabs v4, take 2, 227.6s), taken from the Scribe word timestamps in
// src/data/ai-strategy.transcript.json. A 90-frame green title card opens the video; the VO and every
// scene start after it.
//
// Running device: the four strategy questions. Chapter scenes show a tracker of all four, and the close
// ticks them off one by one.
//
//  #  scene                               start   VO cue
//  1  Experimenting vs results            0.00    "Almost every organization is experimenting…"
//  2  Using AI ≠ transforming             9.20    "Using AI, and transforming a business…"
//  3  Strategy: the future of the business 14.80  "For successful AI transformation…"
//  4  What companies are deciding         26.60   "Companies are deciding…"
//  5  Walmart: agentic shopping           34.70   "Walmart is a good example…"
//  6  Opportunities and threats radar     54.40   "For your organization, the starting questions…"
//  7  North star: your ambition           63.30   "And ultimately, what kind of organization…"
//  8  Chapter: Where will we focus?       69.80   "[pause] Once you've defined your ambition…"
//  9  Four places to look                 77.30   "Will you develop new products…"
//  10 Infosys: AI-first vs AI-augmented   85.90   "Infosys, for example…"
//  11 Lloyds: five focus areas            96.50   "Lloyds Banking Group has identified…"
//  12 Concentrate resources               108.70  "A good strategy makes clear…"
//  13 Chapter: What will it take?         117.80  "[pause] Now we get to the decisions…"
//  14 The five enablers                   121.60  "How will your operating model change?" … "invest?"
//  15 Publicis: €300 million              157.30  "Publicis announced…"
//  16 Owners + resources hold it up       166.00  "Your investment may differ…"
//  17 Chapter: How will we know? + roadmap 173.50 "[pause] Your strategy needs a roadmap…"
//  18 Measure business value              181.70  "Define how you'll measure…"
//  19 Scale, change, stop                 189.20  "Review the evidence regularly…"
//  20 Evolve with AI                      195.30  "And because AI keeps evolving…"
//  21 The four questions                  201.50  "So, before you call your AI strategy complete…"
//  22 The foundation                      217.60  "Those answers give you the foundation…"

export const AI_STRATEGY_DURATION_S = 229.5;
export const AI_STRATEGY_TITLE_FRAMES = 90;

const STARTS = [
  0, 9.2, 14.8, 26.6, 34.7, 54.4, 63.3, 69.8, 77.3, 85.9, 96.5, 108.7, 117.8, 121.6, 157.3, 166.0, 173.5, 181.7,
  189.2, 195.3, 201.5, 217.6,
];
const Scene = makeScene(STARTS, 0.5);

const AMBER = '#B7791F';
const GREY = '#D9D9D4';
const PAPER = '#FBFBF8';

// ── Icons (24px stroke set) ────────────────────────────────────────────────
const ICONS: Record<string, React.ReactNode> = {
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2 20v-1a5 5 0 015-5h4a5 5 0 015 5v1" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M18 13a4 4 0 014 4v1" />
    </>
  ),
  bot: (
    <>
      <rect x="4" y="8" width="16" height="12" rx="3" />
      <path d="M12 4v4" />
      <circle cx="12" cy="3" r="1" />
      <path d="M9 14h.01M15 14h.01" strokeWidth={3} />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h3l2.7 12.4a2 2 0 002 1.6h8.6a2 2 0 002-1.6L22 7H6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </>
  ),
  store: (
    <>
      <path d="M3 9l1.5-5h15L21 9" />
      <path d="M4 9v11h16V9" />
      <path d="M3 9h18" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 018 0v4" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  scale: (
    <>
      <path d="M12 3v18M7 21h10M5 7h14" />
      <path d="M5 7l-3 7a3 3 0 006 0zM19 7l-3 7a3 3 0 006 0z" />
    </>
  ),
  box: (
    <>
      <path d="M21 8l-9-5-9 5v8l9 5 9-5z" />
      <path d="M3 8l9 5 9-5M12 13v8" />
    </>
  ),
  heart: <path d="M12 21s-8-5-8-11a4.5 4.5 0 018-2.8A4.5 4.5 0 0120 10c0 6-8 11-8 11z" />,
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
    </>
  ),
  layers: (
    <>
      <path d="M12 2l10 5-10 5L2 7z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
    </>
  ),
  flag: <path d="M5 21V4M5 4h12l-2 4 2 4H5" />,
  star: <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" />,
  up: (
    <>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  down: (
    <>
      <path d="M3 7l6 6 4-4 8 8" />
      <path d="M15 17h6v-6" />
    </>
  ),
  cycle: (
    <>
      <path d="M21 12a9 9 0 11-3-6.7L21 8" />
      <path d="M21 3v5h-5" />
    </>
  ),
  chat: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  headset: (
    <>
      <path d="M3 14v-2a9 9 0 0118 0v2" />
      <rect x="2" y="14" width="4" height="6" rx="1.5" />
      <rect x="18" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  code: <path d="M8 6l-6 6 6 6M16 6l6 6-6 6" />,
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  euro: <path d="M18 6.5A7 7 0 106.8 15.5M18 17.5a7 7 0 01-11.2-2M4 10h10M4 14h9" />,
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  pause: <path d="M9 6v12M15 6v12" />,
  wrench: <path d="M14.7 6.3a4 4 0 005 5L21 13l-8 8-3-3 1.3-1.3a4 4 0 01-5-5L3 8l5-5 3 3a4 4 0 013.7.3z" />,
  map: (
    <>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
};

const Ico: React.FC<{ n: string; size?: number; color?: string; sw?: number; style?: React.CSSProperties }> = ({
  n,
  size = 40,
  color = INK,
  sw = 1.8,
  style,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={sw}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flex: 'none', ...style }}
  >
    {ICONS[n]}
  </svg>
);

// Round icon badge
const Badge: React.FC<{ n: string; size?: number; on?: number; color?: string }> = ({ n, size = 84, on = 1, color }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: interpolateColors(on, [0, 1], ['#F1F1EC', LIME_SOFT]),
      border: `2px solid ${interpolateColors(on, [0, 1], [LINE, LIME])}`,
    }}
  >
    <Ico n={n} size={size * 0.5} color={color ?? interpolateColors(on, [0, 1], [MUTED, GREEN])} />
  </div>
);

// 1 while t in [a, b), easing in/out over 0.35s
const live = (t: number, a: number, b = Infinity) =>
  Math.min(prog(t, a, 0.35, IN_OUT), Number.isFinite(b) ? 1 - prog(t, b, 0.35, IN_OUT) : 1);

const lerp = (p: number, a: number, b: number) => a + (b - a) * p;

// ── The four questions tracker (chapter device) ──────────────────────────────
const QUESTIONS = ['Where are we going?', 'Where will we focus?', 'What will it take?', "How will we know it's working?"];

const Tracker: React.FC<{ t: number; at: number; active: number }> = ({ t, at, active }) => (
  <div style={{ display: 'flex', gap: 18, marginBottom: 70 }}>
    {QUESTIONS.map((q, i) => {
      const done = i < active;
      const isActive = i === active;
      return (
        <div
          key={q}
          className="kit-ui"
          style={{
            flex: 1,
            padding: '20px 24px',
            borderRadius: 18,
            border: `2px solid ${isActive ? LIME : LINE}`,
            background: isActive ? LIME_SOFT : done ? '#fff' : PAPER,
            opacity: i > active ? 0.55 : 1,
            ...enter(t, at + i * 0.12, { y: 18, dur: 0.5 }),
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 20, fontWeight: 700, letterSpacing: '.12em', color: isActive ? GREEN : MUTED }}>
            {done ? <Check size={24} /> : null}0{i + 1}
          </div>
          <div style={{ fontSize: 26, fontWeight: 600, marginTop: 8, color: i > active ? MUTED : INK }}>{q}</div>
        </div>
      );
    })}
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const AiStrategyBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/ai-strategy.mp3')} />}

      {/* 1 — Experimenting vs results: 80 organisations light up, then only a few keep their glow */}
      <Scene t={t} index={0}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 860 }}>
            <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>AI strategy</div>
            <div className="kit-h2" style={enter(t, 0.3, { dur: 0.9, y: 30 })}>
              Almost everyone is <span className="kit-mark" style={markStyle(t, 2.28)}>experimenting.</span>
            </div>
            <div className="kit-h2" style={{ marginTop: 34, ...enter(t, 4.0, { dur: 0.9, y: 30 }) }}>
              Few report <span className="kit-mark" style={markStyle(t, 7.28)}>significant business results.</span>
            </div>
            <div className="kit-ui" style={{ display: 'flex', gap: 40, marginTop: 70, fontSize: 26, color: MUTED }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...enter(t, 2.6, { y: 10 }) }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: GREY }} /> Experimenting
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, ...enter(t, 7.4, { y: 10 }) }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: LIME, boxShadow: `0 0 0 6px ${LIME_SOFT}` }} /> Significant results
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 46px)', gap: 22 }}>
            {Array.from({ length: 80 }).map((_, i) => {
              const col = i % 10;
              const row = Math.floor(i / 10);
              const wave = (col + row) * 0.045;
              const on = prog(t, 1.9 + wave, 0.4);
              const winner = [12, 27, 38, 54, 61, 75].includes(i);
              const fade = winner ? 0 : prog(t, 5.5 + wave * 0.8, 0.5, IN_OUT);
              const glow = winner ? prog(t, 7.28, 0.7, BACK) : 0;
              const c = interpolateColors(on, [0, 1], ['#F3F3EF', LIME]);
              return (
                <div
                  key={i}
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    background: interpolateColors(fade, [0, 1], [c, GREY]),
                    transform: `scale(${0.6 + on * 0.4 + glow * 0.2})`,
                    boxShadow: glow > 0 ? `0 0 0 ${glow * 9}px ${LIME_SOFT}` : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>
      </Scene>

      {/* 2 — Using AI ≠ transforming a business with AI */}
      <Scene t={t} index={1}>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 40 }}>
          <div className="kit-card" style={{ flex: 1, padding: 50, ...enter(t, 9.32, { x: -40, y: 0 }) }}>
            <div className="kit-label">Using AI</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 10 }}>
              {['Drafting emails', 'Summaries', 'Quick answers', 'Meeting notes'].map((w, i) => (
                <div key={w} className="kit-pill" style={{ fontSize: 26, padding: '12px 22px', ...enter(t, 9.6 + i * 0.22, { y: 12, scale: 0.8, easing: BACK }) }}>
                  {w}
                </div>
              ))}
            </div>
            <div className="kit-ui" style={{ marginTop: 50, fontSize: 28, color: MUTED, ...enter(t, 10.3, { y: 10 }) }}>Individual tasks, a bit faster.</div>
          </div>
          <div
            style={{
              width: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'IBM Plex Serif',
              fontSize: 150,
              color: GREEN,
              ...enter(t, 12.8, { y: 0, scale: 0.3, easing: BACK }),
            }}
          >
            ≠
          </div>
          <div className="kit-card" style={{ flex: 1.25, padding: 50, borderColor: LIME, background: PAPER, ...enter(t, 10.76, { x: 40, y: 0 }) }}>
            <div className="kit-label">Transforming a business with AI</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 26, height: 200, marginTop: 20 }}>
              {[
                ['Products', 0.55],
                ['Customers', 0.75],
                ['Operations', 0.65],
                ['Business model', 1],
              ].map(([w, h], i) => {
                const p = prog(t, 11.1 + i * 0.25, 0.8, BACK);
                return (
                  <div key={w as string} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: '100%', height: 150 * (h as number) * p, background: LIME, borderRadius: 10 }} />
                    <div className="kit-ui" style={{ fontSize: 22, fontWeight: 600, opacity: p }}>{w as string}</div>
                  </div>
                );
              })}
            </div>
            <div className="kit-ui" style={{ marginTop: 30, fontSize: 28, color: MUTED, ...enter(t, 12.0, { y: 10 }) }}>The whole business, changed.</div>
          </div>
        </div>
        <div className="kit-h2" style={{ textAlign: 'center', marginTop: 70, ...enter(t, 13.2, { y: 20 }) }}>
          Two <span className="kit-mark" style={markStyle(t, 13.68)}>very different</span> things.
        </div>
      </Scene>

      {/* 3 — Strategy is crucial; not just tools and policies, but the future of the business */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 15.0, { y: 14 })}>AI transformation</div>
        <div className="kit-h1" style={enter(t, 15.1, { dur: 0.9, y: 30 })}>
          Strategy is <span className="kit-mark" style={markStyle(t, 18.36)}>crucial.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 90 }}>
          <div className="kit-ui" style={{ fontSize: 30, color: MUTED, ...enter(t, 20.56, { y: 10 }) }}>Not just</div>
          {[
            ['wrench', 'Tools', 21.56],
            ['shield', 'Policies', 21.96],
          ].map(([ic, w, at]) => {
            const shrink = prog(t, 23.4, 0.8, IN_OUT);
            return (
              <div key={w as string} style={enter(t, at as number, { y: 14, scale: 0.8, easing: BACK })}>
                <div className="kit-pill" style={{ opacity: 1 - shrink * 0.5, transform: `scale(${1 - shrink * 0.12})` }}>
                  <Ico n={ic as string} size={32} color={MUTED} /> {w as string}
                </div>
              </div>
            );
          })}
          <Arrow t={t} at={23.4} w={150} />
          <div
            className="kit-card"
            style={{ padding: '30px 44px', borderColor: LIME, background: LIME_SOFT, display: 'flex', alignItems: 'center', gap: 24, ...enter(t, 24.3, { x: 30, y: 0, scale: 0.9, easing: BACK }) }}
          >
            <Ico n="flag" size={54} color={GREEN} sw={2} />
            <div className="kit-h3" style={{ fontSize: 50 }}>The future of the business</div>
          </div>
        </div>
      </Scene>

      {/* 4 — What companies are deciding */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 26.7, { y: 14 })}>Companies are deciding</div>
        <div className="kit-h2" style={enter(t, 26.8, { dur: 0.9, y: 30 })}>
          How will AI <span className="kit-mark" style={markStyle(t, 28.72)}>change</span> our business?
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 80 }}>
          {[
            ['flag', 'Our competitive position', 29.48, 'chess'],
            ['box', 'The products and services we offer', 31.08, 'grid'],
            ['up', 'How we create value', 33.44, 'line'],
          ].map(([ic, w, at, kind], i) => {
            const p = prog(t, at as number, 1.2);
            return (
              <div key={w as string} className="kit-card" style={{ flex: 1, padding: 40, height: 400, display: 'flex', flexDirection: 'column', ...enter(t, at as number, { y: 40, easing: BACK }) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                  <Badge n={ic as string} size={76} />
                  <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>0{i + 1}</div>
                </div>
                <div className="kit-h3" style={{ marginTop: 28 }}>{w as string}</div>
                <div style={{ marginTop: 'auto', height: 110, display: 'flex', alignItems: 'flex-end', gap: 12 }}>
                  {kind === 'chess' &&
                    [0.5, 0.7, 0.45, 0.6].map((h, j) => (
                      <div key={j} style={{ flex: 1, borderRadius: 8, height: 110 * (j === 1 ? lerp(p, h, 1) : h), background: j === 1 ? LIME : GREY }} />
                    ))}
                  {kind === 'grid' &&
                    Array.from({ length: 6 }).map((_, j) => (
                      <div key={j} style={{ flex: 1, height: 70, borderRadius: 12, border: `2px solid ${j < Math.round(p * 6) ? LIME : LINE}`, background: j < Math.round(p * 6) ? LIME_SOFT : '#fff' }} />
                    ))}
                  {kind === 'line' && (
                    <svg width="100%" height="110" viewBox="0 0 300 110" preserveAspectRatio="none">
                      <path d="M0 100 C 80 95, 120 70, 170 55 S 260 15, 300 8" fill="none" stroke={LIME} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 5 — Walmart: from search-and-cart to agent-to-agent shopping */}
      <Scene t={t} index={4}>
        <div className="kit-label" style={enter(t, 34.8, { y: 14 })}>Example: Walmart</div>
        <div style={{ position: 'relative', height: 100 }}>
          <div className="kit-h2" style={{ position: 'absolute', ...enter(t, 36.56, { y: 24 }), opacity: Math.min(prog(t, 36.56), 1 - prog(t, 41.0, 0.4)) }}>
            AI agents change how people <span className="kit-mark" style={markStyle(t, 38.8)}>discover and buy.</span>
          </div>
          <div className="kit-h2" style={{ position: 'absolute', ...enter(t, 41.28, { y: 24 }) }}>
            Walmart is <span className="kit-mark" style={markStyle(t, 41.6)}>rethinking</span> the shopping experience.
          </div>
        </div>
        <div style={{ position: 'relative', height: 420, marginTop: 60 }}>
          {(() => {
            const re = prog(t, 41.4, 1.0, IN_OUT); // re-route to agents
            const node = (x: number, ic: string, label: string, sub: string, op: number, on = 1, key?: string) => (
              <div key={key ?? label} style={{ position: 'absolute', left: x, top: 60, width: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, opacity: op }}>
                <Badge n={ic} size={130} on={on} />
                <div className="kit-ui" style={{ fontSize: 28, fontWeight: 700, textAlign: 'center' }}>{label}</div>
                <div className="kit-ui" style={{ fontSize: 22, color: MUTED, textAlign: 'center', marginTop: -8 }}>{sub}</div>
              </div>
            );
            const line = (x1: number, x2: number, p: number, dashed = false, key = '') => (
              <svg key={key} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width={1760} height={260}>
                <line x1={x1} y1={125} x2={x1 + (x2 - x1) * p} y2={125} stroke={dashed ? LIME : LINE} strokeWidth={dashed ? 6 : 4} strokeDasharray={dashed ? '14 12' : undefined} strokeDashoffset={dashed ? -t * 40 : 0} strokeLinecap="round" />
              </svg>
            );
            return (
              <>
                {line(180, 1580, prog(t, 37.0, 3.4) * (1 - re))}
                {line(470, 1290, prog(t, 47.8, 0.8), true, 'agents')}
                {node(0, 'user', 'Customer', 'Has a need', prog(t, 36.8, 0.5))}
                {node(520, 'search', 'Discover', 'Search, browse', prog(t, 38.8, 0.5) * (1 - re), 1, 'disc')}
                {node(1000, 'cart', 'Buy', 'Add to cart', prog(t, 39.36, 0.5) * (1 - re), 1, 'buy')}
                {node(1520, 'store', 'Walmart', 'The retailer', prog(t, 40.56, 0.5))}
                {node(330, 'bot', "Customer's own agent", 'Personal shopping agent', prog(t, 47.36, 0.6), 1, 'pa')}
                {node(1190, 'sparkle', 'Walmart assistant', 'AI-powered', prog(t, 44.4, 0.6), 1, 'wa')}
                {/* messages travelling between agents */}
                {t > 48.3 &&
                  [0, 1, 2].map((k) => {
                    const ph = ((t - 48.3) * 0.55 + k / 3) % 1;
                    const dir = k % 2 === 0;
                    const x = dir ? lerp(ph, 560, 1240) : lerp(ph, 1240, 560);
                    return <div key={k} style={{ position: 'absolute', left: x, top: 111, width: 28, height: 28, borderRadius: 8, background: dir ? GREEN : LIME, opacity: Math.sin(ph * Math.PI) }} />;
                  })}
              </>
            );
          })()}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10, ...enter(t, 50.04, { y: 16 }) }}>
          <div className="kit-pill" style={{ fontSize: 32, padding: '18px 34px' }}>
            <Ico n="target" size={34} color={GREEN} /> A strategic decision about <span className="kit-mark" style={markStyle(t, 52.8)}>how to compete</span>
          </div>
        </div>
      </Scene>

      {/* 6 — Starting questions: radar picks up opportunities and threats */}
      <Scene t={t} index={5}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 900 }}>
            <div className="kit-label" style={enter(t, 54.5, { y: 14 })}>Where are we going?</div>
            <div className="kit-h2" style={enter(t, 54.6, { dur: 0.9, y: 30 })}>
              Start with your <span className="kit-mark" style={markStyle(t, 55.92)}>industry.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 60 }}>
              {[
                ['How is AI changing your industry?', 57.84],
                ['What new opportunities and threats are emerging?', 60.4],
              ].map(([q, at]) => (
                <div key={q as string} className="kit-card kit-ui" style={{ padding: '26px 32px', fontSize: 34, fontWeight: 600, display: 'flex', gap: 20, alignItems: 'center', ...enter(t, at as number, { x: -30, y: 0 }) }}>
                  <div style={{ width: 10, alignSelf: 'stretch', borderRadius: 5, background: LIME }} />
                  {q as string}
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', width: 600, height: 600, ...enter(t, 55.0, { y: 0, scale: 0.85 }) }}>
            <svg width={600} height={600} viewBox="0 0 600 600" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor={LIME} stopOpacity="0" />
                  <stop offset="1" stopColor={LIME} stopOpacity="0.45" />
                </linearGradient>
              </defs>
              {[290, 210, 130, 50].map((r) => (
                <circle key={r} cx={300} cy={300} r={r} fill="none" stroke={LINE} strokeWidth={2} />
              ))}
              <path d="M300 10V590M10 300H590" stroke={LINE} strokeWidth={2} />
              <g transform={`rotate(${(t - 55) * 80} 300 300)`}>
                <path d="M300 300 L590 300 A290 290 0 0 0 505 95 Z" fill="url(#sweep)" />
                <line x1={300} y1={300} x2={590} y2={300} stroke={GREEN} strokeWidth={3} />
              </g>
            </svg>
            {[
              [400, 150, 'op', 60.88],
              [180, 210, 'op', 61.1],
              [430, 400, 'op', 61.3],
              [150, 420, 'th', 61.84],
              [330, 500, 'th', 62.1],
            ].map(([x, y, kind, at], i) => {
              const p = prog(t, at as number, 0.6, BACK);
              const pulse = 1 + 0.25 * Math.max(0, Math.sin((t - (at as number)) * 4));
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: (x as number) - 18,
                    top: (y as number) - 18,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: kind === 'op' ? LIME : RED,
                    transform: `scale(${p * pulse})`,
                    boxShadow: `0 0 0 10px ${kind === 'op' ? 'rgba(102,198,28,.18)' : 'rgba(194,65,12,.15)'}`,
                  }}
                />
              );
            })}
            <div className="kit-ui" style={{ position: 'absolute', left: 0, bottom: -70, width: 600, display: 'flex', justifyContent: 'center', gap: 40, fontSize: 24, fontWeight: 600 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, ...enter(t, 60.88, { y: 8 }) }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: LIME }} /> Opportunities
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, ...enter(t, 61.84, { y: 8 }) }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%', background: RED }} /> Threats
              </span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 7 — North star: what kind of organization, what outcomes */}
      <Scene t={t} index={6}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 880 }}>
            <div className="kit-label" style={enter(t, 63.4, { y: 14 })}>Your ambition</div>
            <div className="kit-h2" style={enter(t, 63.52, { dur: 0.9, y: 30 })}>
              What kind of organization do you want to <span className="kit-mark" style={markStyle(t, 66.64)}>become?</span>
            </div>
            <div className="kit-h3" style={{ marginTop: 50, color: MUTED, ...enter(t, 67.36, { y: 20 }) }}>
              And what <span className="kit-mark" style={{ ...markStyle(t, 67.88), color: INK }}>business outcomes</span> are you pursuing?
            </div>
          </div>
          <div style={{ position: 'relative', width: 760, height: 620 }}>
            <svg width={760} height={620} viewBox="0 0 760 620" style={{ position: 'absolute', overflow: 'visible' }}>
              <path
                d="M60 560 C 220 560, 260 420, 380 380 S 560 300, 640 110"
                fill="none"
                stroke={LIME}
                strokeWidth={8}
                strokeLinecap="round"
                strokeDasharray="2 22"
                opacity={0.9}
                pathLength={1}
              />
              <path
                d="M60 560 C 220 560, 260 420, 380 380 S 560 300, 640 110"
                fill="none"
                stroke="#fff"
                strokeWidth={14}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={-prog(t, 64.0, 2.6, IN_OUT)}
              />
            </svg>
            <div className="kit-ui" style={{ position: 'absolute', left: 0, top: 580, fontSize: 26, fontWeight: 700, color: MUTED, ...enter(t, 63.8, { y: 10 }) }}>Today</div>
            <div style={{ position: 'absolute', left: 30, top: 532, width: 60, height: 60, borderRadius: '50%', background: GREY, ...enter(t, 63.6, { y: 0, scale: 0.5 }) }} />
            {[
              [250, 470, 'Customers', 67.88],
              [420, 330, 'Growth', 68.2],
              [520, 230, 'Efficiency', 68.5],
            ].map(([x, y, w, at]) => (
              <div key={w as string} className="kit-tag" style={{ position: 'absolute', left: x as number, top: y as number, fontSize: 20, ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>
                {w as string}
              </div>
            ))}
            <div style={{ position: 'absolute', left: 580, top: 50, ...enter(t, 66.4, { y: 0, scale: 0.3, easing: BACK }) }}>
              <div style={{ transform: `rotate(${Math.sin(t * 2) * 6}deg)` }}>
                <svg width={120} height={120} viewBox="0 0 24 24">
                  <path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21l1.5-7L2 9.3l7-.8z" fill={LIME} stroke={GREEN} strokeWidth={1} strokeLinejoin="round" />
                </svg>
              </div>
              <div className="kit-ui" style={{ fontSize: 26, fontWeight: 700, color: GREEN, textAlign: 'center', marginTop: 4 }}>Ambition</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 8 — Chapter: Where will we focus? */}
      <Scene t={t} index={7}>
        <Tracker t={t} at={69.9} active={1} />
        <div className="kit-h1" style={enter(t, 70.3, { dur: 0.9, y: 30 })}>Where will we focus?</div>
        <div className="kit-h3" style={{ marginTop: 40, color: MUTED, ...enter(t, 74.4, { y: 20 }) }}>
          Where can AI create <span className="kit-mark" style={{ ...markStyle(t, 75.8), color: INK }}>the greatest advantage?</span>
        </div>
      </Scene>

      {/* 9 — Four places to look */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={enter(t, 77.4, { y: 14 })}>Where AI could create advantage</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 10 }}>
          {[
            ['box', 'New products and services', 'Develop', 77.6],
            ['heart', 'Customer experiences', 'Transform', 80.19],
            ['gear', 'Operational efficiency', 'Improve', 82.08],
            ['layers', 'Your business model', 'Change', 84.48],
          ].map(([ic, w, verb, at], i, arr) => {
            const next = i + 1 < arr.length ? (arr[i + 1][3] as number) : Infinity;
            const on = live(t, at as number, next);
            return (
              <div
                key={w as string}
                className="kit-card"
                style={{
                  height: 290,
                  padding: '0 50px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 40,
                  borderColor: interpolateColors(on, [0, 1], [LINE, LIME]),
                  background: interpolateColors(on, [0, 1], ['#fff', PAPER]),
                  ...enter(t, at as number, { y: 30, scale: 0.94, easing: BACK }),
                }}
              >
                <Badge n={ic as string} size={130} on={Math.max(on, 0.25)} />
                <div>
                  <div className="kit-ui" style={{ fontSize: 24, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: GREEN }}>{verb as string}</div>
                  <div className="kit-h3" style={{ fontSize: 50, marginTop: 8 }}>{w as string}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 10 — Infosys: AI-first vs AI-augmented */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 86.0, { y: 14 })}>Example: Infosys</div>
        <div className="kit-h2" style={enter(t, 86.1, { dur: 0.9, y: 30 })}>
          Two kinds of <span className="kit-mark" style={markStyle(t, 87.72)}>AI services</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 70 }}>
          {[
            ['AI-first services', 88.8, 'up', 'Create new growth', 91.64, 'growth'],
            ['AI-augmented services', 92.4, 'sparkle', 'Improve existing offerings', 94.4, 'improve'],
          ].map(([name, at, ic, out, at2, kind]) => {
            const p = prog(t, at2 as number, 1.2);
            return (
              <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
                <div className="kit-card kit-h3" style={{ width: 560, padding: '36px 40px', fontSize: 46, borderColor: LIME, ...enter(t, at as number, { x: -40, y: 0 }) }}>
                  {name as string}
                </div>
                <Arrow t={t} at={(at as number) + 0.6} w={160} />
                <div className="kit-card" style={{ flex: 1, padding: '28px 40px', display: 'flex', alignItems: 'center', gap: 30, background: PAPER, ...enter(t, at2 as number, { x: 30, y: 0 }) }}>
                  <Badge n={ic as string} size={90} />
                  <div className="kit-h3" style={{ flex: 1 }}>{out as string}</div>
                  <div style={{ width: 220, height: 100, display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                    {kind === 'growth'
                      ? [0.2, 0.35, 0.55, 0.8, 1].map((h, j) => (
                          <div key={j} style={{ flex: 1, height: 100 * h * prog(t, (at2 as number) + j * 0.12, 0.5, BACK), background: LIME, borderRadius: 6 }} />
                        ))
                      : [0.6, 0.6, 0.6, 0.6, 0.6].map((h, j) => (
                          <div key={j} style={{ flex: 1, height: 100 * lerp(p, h, h + 0.3), background: j === 2 || p > 0.5 ? LIME : GREY, borderRadius: 6 }} />
                        ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 11 — Lloyds: five AI focus areas */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={enter(t, 96.6, { y: 14 })}>Example: Lloyds Banking Group</div>
        <div className="kit-h2" style={enter(t, 96.7, { dur: 0.9, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 98.76)}>Five</span> AI focus areas
        </div>
        <div style={{ position: 'relative', marginTop: 80 }}>
          <div style={{ position: 'absolute', left: 60, right: 60, top: 60, height: 6, borderRadius: 3, background: LINE }} />
          <div style={{ position: 'absolute', left: 60, top: 60, height: 6, borderRadius: 3, background: LIME, width: `${prog(t, 100.64, 7.5, Easing.linear) * 92}%` }} />
          <div style={{ display: 'flex', gap: 24, position: 'relative' }}>
            {[
              ['chat', 'Customer interactions', 100.64],
              ['headset', 'Frontline and relationship manager support', 102.37],
              ['gear', 'Operations', 105.52],
              ['sparkle', 'Employee assistants', 106.24],
              ['code', 'Engineering', 108.08],
            ].map(([ic, w, at], i) => (
              <div key={w as string} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', ...enter(t, at as number, { y: 40, easing: BACK }) }}>
                <div style={{ background: '#fff', padding: '0 10px' }}>
                  <Badge n={ic as string} size={126} on={1} />
                </div>
                <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, color: GREEN, letterSpacing: '.12em', marginTop: 24 }}>0{i + 1}</div>
                <div className="kit-h3" style={{ fontSize: 36, textAlign: 'center', marginTop: 10 }}>{w as string}</div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 12 — Concentrate resources; say what you won't prioritize */}
      <Scene t={t} index={11}>
        <div className="kit-h2" style={enter(t, 108.8, { dur: 0.9, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 110.96)}>Concentrate</span> your resources.
        </div>
        <div className="kit-h3" style={{ marginTop: 20, color: MUTED, ...enter(t, 112.72, { y: 16 }) }}>
          And be clear about what you <span className="kit-mark" style={{ ...markStyle(t, 114.88), color: INK }}>won't prioritize.</span>
        </div>
        <div style={{ position: 'relative', width: 1760, height: 470, marginTop: 40 }}>
          {(() => {
            const COLS = ['Customer service', 'Marketing', 'Operations', 'Product', 'HR', 'Finance'];
            const FOCUS = [0, 2];
            const colX = (c: number) => c * (250 + 52);
            const m = prog(t, 110.96, 1.6, IN_OUT);
            const no = prog(t, 114.88, 0.6);
            const BASE = 400;
            return (
              <>
                {COLS.map((c, i) => {
                  const focus = FOCUS.includes(i);
                  return (
                    <div key={c} style={{ position: 'absolute', left: colX(i), top: BASE + 18, width: 250, textAlign: 'center' }}>
                      <div style={{ height: 4, background: focus ? interpolateColors(m, [0, 1], [LINE, LIME]) : LINE, borderRadius: 2, marginBottom: 12 }} />
                      <div className="kit-ui" style={{ fontSize: 24, fontWeight: 600, color: focus ? INK : interpolateColors(no, [0, 1], [INK, '#B5B5B0']) }}>{c}</div>
                      {!focus && (
                        <div style={{ position: 'absolute', left: 0, right: 0, top: -120, display: 'flex', justifyContent: 'center', ...enter(t, 114.88 + i * 0.08, { y: 10, scale: 0.6, easing: BACK }) }}>
                          <span className="kit-tag" style={{ background: '#F1F1EC', color: MUTED }}>Not now</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                {Array.from({ length: 24 }).map((_, i) => {
                  const c0 = i % 6;
                  const r0 = Math.floor(i / 6);
                  const c1 = FOCUS[i % 2];
                  const r1 = Math.floor(i / 2);
                  const mi = prog(t, 110.96 + (i % 12) * 0.05, 1.3, IN_OUT);
                  const x = lerp(mi, colX(c0), colX(c1)) + 40;
                  const y = BASE - 30 * (lerp(mi, r0, r1) + 1);
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: x,
                        top: y,
                        width: 170,
                        height: 24,
                        borderRadius: 6,
                        background: interpolateColors(mi, [0, 1], ['#C9C9C2', LIME]),
                        ...enter(t, 109.0 + i * 0.03, { y: -20, dur: 0.4 }),
                      }}
                    />
                  );
                })}
              </>
            );
          })()}
        </div>
      </Scene>

      {/* 13 — Chapter: What will it take? */}
      <Scene t={t} index={12}>
        <Tracker t={t} at={117.9} active={2} />
        <div className="kit-h1" style={enter(t, 118.2, { dur: 0.9, y: 30 })}>What will it take?</div>
        <div className="kit-h3" style={{ marginTop: 40, color: MUTED, ...enter(t, 118.76, { y: 20 }) }}>
          The decisions that make your ambition <span className="kit-mark" style={{ ...markStyle(t, 120.6), color: INK }}>achievable.</span>
        </div>
      </Scene>

      {/* 14 — The five enablers: rail on the left, live panel on the right */}
      <Scene t={t} index={13} pad={false}>
        {(() => {
          const RAIL: [string, string, number, number][] = [
            ['layers', 'Operating model', 121.76, 129.92],
            ['database', 'Technology and data', 129.92, 137.04],
            ['users', 'People', 137.04, 146.08],
            ['shield', 'Governance', 146.08, 152.72],
            ['target', 'Ownership and investment', 152.72, Infinity],
          ];
          const panel = (i: number) => live(t, RAIL[i][2] + 0.05, RAIL[i][3]);
          const P: React.CSSProperties = { position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' };
          return (
            <div style={{ position: 'absolute', left: 80, right: 80, top: 80, bottom: 150, display: 'flex', gap: 60 }}>
              <div style={{ width: 520, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 18 }}>
                <div className="kit-label" style={enter(t, 121.7, { y: 14 })}>What will it take?</div>
                {RAIL.map(([ic, w, a, b]) => {
                  const on = live(t, a, b);
                  const done = t >= b;
                  return (
                    <div
                      key={w}
                      className="kit-ui"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 20,
                        padding: '18px 24px',
                        borderRadius: 18,
                        border: `2px solid ${interpolateColors(on, [0, 1], [LINE, LIME])}`,
                        background: interpolateColors(on, [0, 1], ['#fff', LIME_SOFT]),
                        fontSize: 30,
                        fontWeight: 600,
                        color: t < a ? '#B5B5B0' : INK,
                        ...enter(t, 121.8 + RAIL.findIndex((r) => r[1] === w) * 0.1, { x: -30, y: 0, dur: 0.5 }),
                      }}
                    >
                      <Ico n={ic} size={38} color={t < a ? '#B5B5B0' : GREEN} />
                      <span style={{ flex: 1 }}>{w}</span>
                      {done && <Check size={30} />}
                    </div>
                  );
                })}
              </div>
              <div className="kit-card" style={{ flex: 1, position: 'relative', background: PAPER, padding: 60, ...enter(t, 121.9, { x: 40, y: 0 }) }}>
                <div style={{ position: 'absolute', inset: 60 }}>
                  {/* a — operating model */}
                  <div style={{ ...P, opacity: panel(0) }}>
                    <div className="kit-h2" style={{ fontSize: 60 }}>How will your operating model <span className="kit-mark" style={markStyle(t, 123.48)}>change?</span></div>
                    <div style={{ display: 'flex', gap: 24, marginTop: 60 }}>
                      {[
                        ['bot', 'AI takes on work', 125.0],
                        ['cpu', 'AI supports decisions', 126.2],
                        ['user', 'People stay responsible', 128.48],
                      ].map(([ic, w, at]) => (
                        <div key={w as string} className="kit-card" style={{ flex: 1, padding: 30, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, ...enter(t, at as number, { y: 30, easing: BACK }) }}>
                          <Badge n={ic as string} size={100} />
                          <div className="kit-ui" style={{ fontSize: 28, fontWeight: 600, textAlign: 'center' }}>{w as string}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 34, height: 14, borderRadius: 7, background: `linear-gradient(90deg, ${LIME}, ${LIME_SOFT} 55%, ${GREEN})`, opacity: prog(t, 128.6, 0.6) }} />
                    <div className="kit-ui" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: MUTED, fontWeight: 600, marginTop: 10, opacity: prog(t, 128.6, 0.6) }}>
                      <span>AI</span>
                      <span>People</span>
                    </div>
                  </div>
                  {/* b — technology and data; build / buy / partner */}
                  <div style={{ ...P, opacity: panel(1) }}>
                    <div style={{ display: 'flex', gap: 24 }}>
                      {[
                        ['cpu', 'Technology', 130.36],
                        ['database', 'Data', 131.04],
                      ].map(([ic, w, at]) => (
                        <div key={w as string} className="kit-pill" style={{ fontSize: 34, ...enter(t, at as number, { y: 16, scale: 0.8, easing: BACK }) }}>
                          <Ico n={ic as string} size={38} color={GREEN} /> {w as string}
                        </div>
                      ))}
                    </div>
                    <div className="kit-h2" style={{ fontSize: 60, marginTop: 50, ...enter(t, 132.24, { y: 20 }) }}>
                      Which <span className="kit-mark" style={markStyle(t, 132.76)}>capabilities</span> do you need?
                    </div>
                    {(() => {
                      const opts = [
                        ['Build', 133.56],
                        ['Buy', 134.64],
                        ['Partner', 135.56],
                      ] as const;
                      const idx = t < 134.64 ? 0 : t < 135.56 ? 1 : 2;
                      const slide = idx === 0 ? 0 : idx === 1 ? prog(t, 134.64, 0.4, IN_OUT) : 1 + prog(t, 135.56, 0.4, IN_OUT);
                      return (
                        <div style={{ position: 'relative', display: 'flex', marginTop: 50, padding: 10, borderRadius: 999, background: '#fff', border: `2px solid ${LINE}`, ...enter(t, 133.4, { y: 16 }) }}>
                          <div style={{ position: 'absolute', top: 10, bottom: 10, left: `calc(10px + ${slide} * (100% - 20px) / 3)`, width: 'calc((100% - 20px) / 3)', borderRadius: 999, background: LIME }} />
                          {opts.map(([w]) => (
                            <div key={w} className="kit-ui" style={{ flex: 1, position: 'relative', textAlign: 'center', padding: '22px 0', fontSize: 36, fontWeight: 700, color: opts[idx][0] === w ? '#fff' : INK }}>
                              {w}
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                  {/* c — people */}
                  <div style={{ ...P, opacity: panel(2) }}>
                    <div className="kit-h2" style={{ fontSize: 60 }}>Your <span className="kit-mark" style={markStyle(t, 138.24)}>people</span></div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 50 }}>
                      <div className="kit-card" style={{ padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 30, ...enter(t, 139.04, { x: -20, y: 0 }) }}>
                        <div className="kit-ui" style={{ width: 360, fontSize: 30, fontWeight: 600 }}>Skills to develop</div>
                        <div style={{ flex: 1, height: 18, borderRadius: 9, background: LINE }}>
                          <div style={{ height: 18, borderRadius: 9, background: LIME, width: `${lerp(prog(t, 139.4, 1.4, IN_OUT), 20, 85)}%` }} />
                        </div>
                      </div>
                      <div className="kit-card" style={{ padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 30, ...enter(t, 141.12, { x: -20, y: 0 }) }}>
                        <div className="kit-ui" style={{ width: 360, fontSize: 30, fontWeight: 600 }}>Roles that evolve</div>
                        <div className="kit-pill" style={{ fontSize: 28 }}>
                          <Ico n="user" size={30} color={GREEN} /> Analyst{t > 141.5 ? typed(t, 141.5, ' + AI', 0.6) : ''}
                        </div>
                      </div>
                      <div className="kit-card" style={{ padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 30, ...enter(t, 143.04, { x: -20, y: 0 }) }}>
                        <div className="kit-ui" style={{ width: 360, fontSize: 30, fontWeight: 600 }}>Employees shape the change</div>
                        <div style={{ display: 'flex', gap: 14 }}>
                          {[0, 1, 2, 3, 4].map((k) => (
                            <div key={k} style={enter(t, 143.5 + k * 0.18, { y: 14, scale: 0.5, easing: BACK })}>
                              <Badge n="user" size={58} on={k < 4 ? 1 : 0.4} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* d — governance */}
                  <div style={{ ...P, opacity: panel(3) }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
                      <div style={{ position: 'relative', width: 300, height: 340, ...enter(t, 146.3, { y: 0, scale: 0.6, easing: BACK }) }}>
                        <svg width={300} height={340} viewBox="0 0 24 27">
                          <path d="M12 1l10 3.8v7.5c0 6.3-4.4 10.6-10 12.2C6.4 22.9 2 18.6 2 12.3V4.8z" fill={LIME_SOFT} stroke={GREEN} strokeWidth={0.8} />
                          <path d="M7.5 13l3.2 3 6-7" fill="none" stroke={GREEN} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - prog(t, 151.9, 0.6)} />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div className="kit-h2" style={{ fontSize: 60 }}>
                          <span className="kit-mark" style={markStyle(t, 146.92)}>Governance</span>
                        </div>
                        <div className="kit-ui" style={{ fontSize: 28, color: MUTED, marginTop: 10, ...enter(t, 147.97, { y: 10 }) }}>Your rules for</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 24 }}>
                          {[
                            ['lock', 'Security', 148.88],
                            ['scale', 'Responsible AI', 150.0],
                            ['eye', 'Human oversight', 151.44],
                          ].map(([ic, w, at]) => (
                            <div key={w as string} className="kit-pill" style={{ alignSelf: 'flex-start', fontSize: 34, ...enter(t, at as number, { x: -24, y: 0 }) }}>
                              <Ico n={ic as string} size={38} color={GREEN} /> {w as string}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* e — ownership and investment */}
                  <div style={{ ...P, opacity: panel(4) }}>
                    <div className="kit-card" style={{ padding: '34px 40px', ...enter(t, 153.76, { y: 20 }) }}>
                      <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED, textTransform: 'uppercase' }}>Who owns the results?</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 18 }}>
                        <Badge n="user" size={76} />
                        <div className="kit-h3">{typed(t, 154.3, 'Accountable owner', 0.9)}</div>
                        <div style={{ marginLeft: 'auto', ...enter(t, 155.2, { y: 0, scale: 0.5, easing: BACK }) }}>
                          <Check size={48} />
                        </div>
                      </div>
                    </div>
                    <div className="kit-card" style={{ padding: '34px 40px', marginTop: 30, ...enter(t, 155.6, { y: 20 }) }}>
                      <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED, textTransform: 'uppercase' }}>What are you prepared to invest?</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 18 }}>
                        <Badge n="euro" size={76} />
                        <div style={{ flex: 1, height: 22, borderRadius: 11, background: LINE }}>
                          <div style={{ height: 22, borderRadius: 11, background: LIME, width: `${prog(t, 155.9, 1.1, IN_OUT) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 15 — Publicis: €300 million over three years, people and technology */}
      <Scene t={t} index={14}>
        <div className="kit-label" style={enter(t, 157.4, { y: 14 })}>Example: Publicis</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 30, ...enter(t, 158.0, { y: 30 }) }}>
          <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 230, letterSpacing: '-0.05em', lineHeight: 1, color: INK }}>
            €{Math.round(interpolate(t, [158.8, 160.2], [0, 300], { ...clamp, easing: Easing.out(Easing.quad) }))}
          </div>
          <div className="kit-h2" style={{ color: GREEN }}>million</div>
        </div>
        <div className="kit-h3" style={{ marginTop: 10, ...enter(t, 160.16, { y: 16 }) }}>
          <span className="kit-mark" style={markStyle(t, 161.24)}>AI investment plan</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60, marginTop: 70 }}>
          <div style={{ flex: 1, ...enter(t, 162.0, { y: 16 }) }}>
            <div style={{ display: 'flex', gap: 10 }}>
              {[0, 1, 2].map((k) => (
                <div key={k} style={{ flex: 1 }}>
                  <div style={{ height: 22, borderRadius: 11, background: LINE }}>
                    <div style={{ height: 22, borderRadius: 11, background: LIME, width: `${prog(t, 162.32 + k * 0.35, 0.4, Easing.linear) * 100}%` }} />
                  </div>
                  <div className="kit-ui" style={{ fontSize: 24, fontWeight: 600, color: MUTED, marginTop: 12 }}>Year {k + 1}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              ['users', 'People', 164.08],
              ['cpu', 'Technology', 164.88],
            ].map(([ic, w, at]) => (
              <div key={w as string} className="kit-pill" style={{ fontSize: 34, ...enter(t, at as number, { y: 16, scale: 0.7, easing: BACK }) }}>
                <Ico n={ic as string} size={38} color={GREEN} /> {w as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 16 — Accountable owners + committed resources hold the strategy up */}
      <Scene t={t} index={15}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 760 }}>
            <div className="kit-h3" style={{ color: MUTED, ...enter(t, 166.1, { y: 16 }) }}>Your investment may differ.</div>
            <div className="kit-h2" style={{ marginTop: 20, ...enter(t, 167.76, { dur: 0.9, y: 30 }) }}>
              The <span className="kit-mark" style={markStyle(t, 168.04)}>principle</span> is the same.
            </div>
          </div>
          <div style={{ position: 'relative', width: 860, height: 620 }}>
            {(() => {
              const beam = prog(t, 169.68, 0.7, BACK);
              const settle = prog(t, 172.4, 0.6, IN_OUT);
              return (
                <>
                  <div
                    className="kit-card"
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: 860,
                      top: lerp(settle, 20, 60),
                      height: 110,
                      background: INK,
                      borderColor: INK,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: beam,
                      transform: `scale(${0.8 + 0.2 * beam}) rotate(${(1 - settle) * -2}deg)`,
                    }}
                  >
                    <div className="kit-h3" style={{ color: '#fff' }}>Your AI strategy</div>
                  </div>
                  {[
                    ['user', 'Accountable owners', 170.84, 80],
                    ['euro', 'Committed resources', 172.08, 500],
                  ].map(([ic, w, at, x]) => {
                    const p = prog(t, at as number, 0.9, BACK);
                    const h = 450 * p;
                    return (
                      <div key={w as string} style={{ position: 'absolute', left: x as number, bottom: 0, width: 280, height: h, background: LIME_SOFT, border: `3px solid ${LIME}`, borderRadius: '18px 18px 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, overflow: 'hidden' }}>
                        <Ico n={ic as string} size={70} color={GREEN} />
                        <div className="kit-ui" style={{ fontSize: 30, fontWeight: 700, textAlign: 'center', padding: '0 20px' }}>{w as string}</div>
                      </div>
                    );
                  })}
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: -8, height: 8, background: INK, borderRadius: 4, opacity: prog(t, 170.5, 0.4) }} />
                </>
              );
            })()}
          </div>
        </div>
      </Scene>

      {/* 17 — Chapter: How will we know it's working? + roadmap */}
      <Scene t={t} index={16}>
        <Tracker t={t} at={173.6} active={3} />
        <div className="kit-h2" style={enter(t, 173.9, { dur: 0.9, y: 30 })}>
          How will we know it's working? Start with a <span className="kit-mark" style={markStyle(t, 176.48)}>roadmap.</span>
        </div>
        <div style={{ position: 'relative', height: 260, marginTop: 70 }}>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 46, height: 8, borderRadius: 4, background: LINE }} />
          <div style={{ position: 'absolute', left: 0, top: 46, height: 8, borderRadius: 4, background: LIME, width: `${prog(t, 177.4, 3.6, Easing.linear) * 100}%` }} />
          {[
            ['Next 90 days', 'Quick wins and pilots', 178.32, 0],
            ['Next year', 'Scale what works', 179.68, 0.42],
            ['Beyond', 'Transform the business', 180.76, 0.84],
          ].map(([w, sub, at, x]) => (
            <div key={w as string} style={{ position: 'absolute', left: `${(x as number) * 100}%`, top: 0, width: 300, ...enter(t, at as number, { y: 20, easing: BACK }) }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', background: '#fff', border: `6px solid ${LIME}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Ico n="flag" size={44} color={GREEN} />
              </div>
              <div className="kit-h3" style={{ marginTop: 20 }}>{w as string}</div>
              <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 6 }}>{sub as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 18 — Measure business value */}
      <Scene t={t} index={17}>
        <div className="kit-h2" style={enter(t, 181.84, { dur: 0.9, y: 30 })}>
          Measure <span className="kit-mark" style={markStyle(t, 183.12)}>business value.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 70 }}>
          {[
            ['up', 'Revenue', 184.48, 'M0 80 C 60 75, 100 60, 150 45 S 230 10, 280 6'],
            ['down', 'Costs', 185.44, 'M0 10 C 60 14, 100 30, 150 48 S 230 76, 280 82'],
            ['star', 'Quality', 186.08, 'M0 60 C 60 58, 100 40, 150 38 S 230 22, 280 18'],
            ['heart', 'Customer experience', 187.0, 'M0 70 C 60 72, 100 50, 150 44 S 230 30, 280 14'],
            ['users', 'Adoption', 188.24, 'M0 86 C 60 84, 100 70, 150 50 S 230 14, 280 4'],
          ].map(([ic, w, at, d]) => {
            const p = prog(t, (at as number) + 0.2, 1.0, IN_OUT);
            return (
              <div key={w as string} className="kit-card" style={{ flex: 1, padding: 30, height: 360, display: 'flex', flexDirection: 'column', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
                <Badge n={ic as string} size={76} />
                <div className="kit-h3" style={{ fontSize: 34, marginTop: 20 }}>{w as string}</div>
                <svg width="100%" height="100" viewBox="0 0 280 90" preserveAspectRatio="none" style={{ marginTop: 'auto', overflow: 'visible' }}>
                  <path d={d as string} fill="none" stroke={LIME} strokeWidth={5} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
                </svg>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 19 — Review the evidence: scale, change, stop */}
      <Scene t={t} index={18}>
        <div className="kit-h2" style={enter(t, 189.36, { dur: 0.9, y: 30 })}>
          Review the <span className="kit-mark" style={markStyle(t, 189.92)}>evidence.</span> Then decide.
        </div>
        <div style={{ position: 'relative', height: 520, marginTop: 50 }}>
          {[
            ['Scale', 'up', GREEN, 192.24],
            ['Change', 'cycle', AMBER, 193.28],
            ['Stop', 'pause', RED, 194.56],
          ].map(([w, ic, c, at], i) => (
            <div key={w as string} style={{ position: 'absolute', left: 700 + i * 360, top: 0, width: 330, height: 500, borderRadius: 22, border: `2px dashed ${LINE}`, background: PAPER, ...enter(t, 191.36 + i * 0.12, { y: 20 }) }}>
              <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'center', marginTop: 30, fontSize: 34, fontWeight: 700, color: c as string }}>
                <Ico n={ic as string} size={40} color={c as string} sw={2.4} /> {w as string}
              </div>
            </div>
          ))}
          {[
            ['Pilot A', [0.9, 0.8, 0.95], 192.24, 0],
            ['Pilot B', [0.5, 0.7, 0.4], 193.28, 1],
            ['Pilot C', [0.2, 0.3, 0.15], 194.56, 2],
          ].map(([w, bars, at, i]) => {
            const m = prog(t, (at as number) - 0.3, 0.9, IN_OUT);
            const x = lerp(m, 0, 700 + (i as number) * 360 + 25);
            const y = lerp(m, (i as number) * 165, 150);
            return (
              <div key={w as string} className="kit-card" style={{ position: 'absolute', left: x, top: y, width: 280, height: 140, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 20, ...enter(t, 189.9 + (i as number) * 0.2, { x: -30, y: 0 }) }}>
                <div className="kit-ui" style={{ fontSize: 28, fontWeight: 700, flex: 1 }}>{w as string}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80 }}>
                  {(bars as number[]).map((h, k) => (
                    <div key={k} style={{ width: 22, height: 80 * h * prog(t, 190.4 + k * 0.1, 0.5), borderRadius: 4, background: h > 0.6 ? LIME : h > 0.35 ? '#E3C27A' : '#E7A88C' }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 20 — AI keeps evolving, so the strategy does too */}
      <Scene t={t} index={19}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 860 }}>
            <div className="kit-h2" style={enter(t, 195.44, { dur: 0.9, y: 30 })}>
              AI keeps evolving.
            </div>
            <div className="kit-h2" style={{ marginTop: 20, ...enter(t, 197.68, { dur: 0.9, y: 30 }) }}>
              Your strategy <span className="kit-mark" style={markStyle(t, 199.04)}>evolves with it.</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: 620, height: 620 }}>
            <svg width={620} height={620} viewBox="0 0 620 620" style={{ position: 'absolute' }}>
              <g transform={`rotate(${(t - 195.3) * 40} 310 310)`}>
                <circle cx={310} cy={310} r={250} fill="none" stroke={LIME} strokeWidth={10} strokeDasharray="300 92" strokeLinecap="round" />
                {[0, 1, 2, 3].map((k) => (
                  <path key={k} d="M0 -14 L18 0 L0 14" transform={`rotate(${k * 90 + 64} 310 310) translate(560 310) rotate(90)`} fill="none" stroke={GREEN} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
                ))}
              </g>
            </svg>
            <div style={{ position: 'absolute', inset: 150, borderRadius: '50%', background: LIME_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', ...enter(t, 197.9, { y: 0, scale: 0.6, easing: BACK }) }}>
              <div className="kit-h3" style={{ fontSize: 44 }}>Your AI<br />strategy</div>
            </div>
            {[
              ['New models', 0, 30, 196.4],
              ['New capabilities', 360, 120, 196.8],
              ['New risks', 20, 520, 197.2],
            ].map(([w, x, y, at]) => (
              <div key={w as string} className="kit-pill" style={{ position: 'absolute', left: x as number, top: y as number, fontSize: 26, padding: '12px 22px', ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>
                <Ico n="sparkle" size={26} color={GREEN} /> {w as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 21 — Four questions, ticked off */}
      <Scene t={t} index={20}>
        <div className="kit-label" style={enter(t, 201.7, { y: 14 })}>Before you call it complete</div>
        <div className="kit-h2" style={enter(t, 201.8, { dur: 0.9, y: 30 })}>
          Can your <span className="kit-mark" style={markStyle(t, 205.68)}>leadership team</span> answer these?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 60 }}>
          {QUESTIONS.map((q, i) => {
            const at = [208.8, 211.17, 213.28, 215.2][i];
            const on = prog(t, at, 0.5);
            return (
              <div
                key={q}
                className="kit-card"
                style={{
                  padding: '34px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 30,
                  borderColor: interpolateColors(on, [0, 1], [LINE, LIME]),
                  background: interpolateColors(on, [0, 1], ['#fff', PAPER]),
                  ...enter(t, 207.12 + i * 0.12, { y: 20 }),
                }}
              >
                <div className="kit-ui" style={{ fontSize: 26, fontWeight: 700, color: GREEN, letterSpacing: '.1em' }}>0{i + 1}</div>
                <div className="kit-h3" style={{ flex: 1, fontSize: 44 }}>{q}</div>
                <div style={{ transform: `scale(${prog(t, at + 0.3, 0.5, BACK)})` }}>
                  <Check size={56} />
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 22 — The foundation: real decisions stand on these answers */}
      <Scene t={t} index={21} padStyle={{ opacity: 1 - prog(t, 228.7, 0.8, Easing.in(Easing.quad)) }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ width: 780 }}>
            <div className="kit-label" style={enter(t, 217.7, { y: 14 })}>Lead with AI</div>
            <div className="kit-h2" style={enter(t, 217.8, { dur: 0.9, y: 30 })}>
              The <span className="kit-mark" style={markStyle(t, 218.88)}>foundation</span> of an AI strategy
            </div>
            <div className="kit-h3" style={{ marginTop: 34, color: MUTED, ...enter(t, 221.28, { y: 16 }) }}>
              One that guides <span className="kit-mark" style={{ ...markStyle(t, 222.16), color: INK }}>real decisions.</span>
            </div>
          </div>
          <div style={{ width: 880, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Future of your business', 226.44, 'star'],
              ['People', 225.4, 'users'],
              ['Technology', 224.52, 'cpu'],
              ['Investment', 223.6, 'euro'],
            ].map(([w, at, ic], i) => (
              <div
                key={w as string}
                className="kit-card"
                style={{
                  marginLeft: i * 20,
                  marginRight: i * 20,
                  padding: '22px 34px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  background: i === 0 ? LIME_SOFT : '#fff',
                  borderColor: i === 0 ? LIME : LINE,
                  ...enter(t, at as number, { y: -60, dur: 0.6, easing: BACK }),
                }}
              >
                <Ico n={ic as string} size={42} color={GREEN} />
                <div className="kit-h3" style={{ fontSize: 40 }}>{w as string}</div>
              </div>
            ))}
            <div
              style={{
                marginTop: 6,
                padding: '30px 34px',
                borderRadius: 22,
                background: INK,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                ...enter(t, 218.88, { y: 30, easing: BACK }),
              }}
            >
              <Ico n="map" size={44} color={LIME} />
              <div className="kit-h3" style={{ color: '#fff', fontSize: 40 }}>Your four answers</div>
            </div>
          </div>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const AiStrategy: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={AI_STRATEGY_TITLE_FRAMES}>
      <TitleCardGreen label="AI STRATEGY" title={"How to Build an AI Strategy\nThat Actually Works"} />
    </Sequence>
    <Sequence from={AI_STRATEGY_TITLE_FRAMES}>
      <AiStrategyBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
