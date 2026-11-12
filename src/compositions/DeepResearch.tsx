import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow as KitArrow,
  BACK,
  Check,
  Composer,
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
  clamp,
  enter,
  EnterOpts,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// Deep Research — custom concept composition (Lead with AI), built with the LWAI demo kit (src/kit).
// VO: audio/DeepResearch.mp3 (Daan, ElevenLabs v4, Take A, 195.44s of speech). Every cue is in SECONDS of
// the VO, from the Scribe word timestamps in src/data/deep-research.transcript.json. A 90-frame green title
// card opens the video; the VO and every scene start after it. Storyboard: videos/deep-research/01-brief/storyboard.md
//
//  #  scene                               start   VO cue
//  1  Answers in seconds                  0.00    "Most AI tools are designed to give you answers quickly."
//  2  Some questions need more            10.08   "That's useful for everyday work."
//  3  What a hard question needs          17.52   "You may need to explore different perspectives…"
//  4  Deep Research                       25.36   "That's where Deep Research comes in."
//  5  Delegate, don't just ask            29.28   "Think of Deep Research as delegating…"
//  6  How it works                        42.36   "It breaks your question into smaller research tasks…"
//  7  Example: regular chat               54.20   "For example, ask AI: should we expand…"
//  8  Deep Research goes further          62.88   "Deep Research goes further."
//  9  Not how much. How systematically.   74.32   "The key difference isn't how much…"
//  10 Three situations                    81.76   "Deep Research is especially useful in three situations."
//  11 01 Strategic decisions              85.84   "First, strategic decisions."
//  12 02 Synthesizing evidence            96.04   "Second, synthesizing complex evidence."
//  13 03 Unfamiliar topics                109.36  "Third, learning unfamiliar topics."
//  14 Not a substitute                    122.16  "Deep Research is powerful."
//  15 Where it can go wrong               127.08  "It can miss important evidence…"
//  16 A citation isn't proof              140.08  "Reports often include citations…"
//  17 Use it deliberately                 153.76  "Deep Research also takes longer…"
//  18 The real shift                      168.40  "The real shift is from asking AI for answers…"
//  19 Who does what                       174.88  "You define the question, the scope…"
//  20 Better-informed decisions           186.88  "That's how Deep Research becomes more…"

export const DEEP_RESEARCH_DURATION_S = 197.0;
export const DEEP_RESEARCH_TITLE_FRAMES = 90;

const STARTS = [
  0, 10.08, 17.52, 25.36, 29.28, 42.36, 54.2, 62.88, 74.32, 81.76, 85.84, 96.04, 109.36, 122.16, 127.08, 140.08,
  153.76, 168.4, 174.88, 186.88,
];
const Scene = makeScene(STARTS, 0.5);
// Reveals start slightly before the spoken word so the element is readable on the onset
const LEAD = 0.15;

type T = { t: number };
// Kit arrow, hidden until it starts drawing (a zero-length round-capped line otherwise shows as a dot)
const Arrow: React.FC<React.ComponentProps<typeof KitArrow>> = (p) => (
  <div style={{ opacity: p.t >= p.at ? 1 : 0, flex: 'none' }}><KitArrow {...p} /></div>
);
const E = (t: number, cue: number, opts?: EnterOpts) => enter(t, cue - LEAD, opts);
const M = (t: number, cue: number) => markStyle(t, cue - LEAD);

// ── Small local icons ────────────────────────────────────────────────────────
const Globe: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="9.5" fill="#fff" stroke={GREEN} strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4.2" ry="9.5" fill="none" stroke={GREEN} strokeWidth="1.3" />
    <path d="M2.8 9h18.4M2.8 15h18.4" stroke={GREEN} strokeWidth="1.3" />
  </svg>
);
const Chart: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="#fff" stroke="#B0B0A8" strokeWidth="1.5" />
    <rect x="6" y="12" width="3" height="6" rx="1" fill={LIME} />
    <rect x="10.5" y="8" width="3" height="10" rx="1" fill={GREEN} />
    <rect x="15" y="10" width="3" height="8" rx="1" fill={LIME} />
  </svg>
);
const Lock: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M7.5 10.5V8a4.5 4.5 0 019 0v2.5" fill="none" stroke={INK} strokeWidth="2" />
    <rect x="4.5" y="10.5" width="15" height="11" rx="2.5" fill={INK} />
    <circle cx="12" cy="16" r="1.8" fill="#fff" />
  </svg>
);
const Plug: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M8 3v4M12 3v4" stroke={INK} strokeWidth="2" strokeLinecap="round" />
    <path d="M6 7h8v4a4 4 0 01-8 0z" fill={INK} />
    <path d="M10 15v3" stroke={INK} strokeWidth="2" />
    <path d="M15.5 16.5l5 5M20.5 16.5l-5 5" stroke={RED} strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
const Flag: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M5 21V3.5" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 4h12l-2.5 4L17 12H5z" fill="#F59E0B" />
  </svg>
);
const Stopwatch: React.FC<{ fill: number; size?: number; color?: string }> = ({ fill, size = 120, color = LIME }) => {
  const r = 40;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ flex: 'none' }}>
      <rect x="44" y="2" width="12" height="8" rx="2" fill={INK} />
      <circle cx="50" cy="56" r={r} fill="#fff" stroke={LINE} strokeWidth="6" />
      <circle
        cx="50" cy="56" r={r} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round"
        strokeDasharray={`${c * fill} ${c}`} transform="rotate(-90 50 56)"
      />
      <line x1="50" y1="56" x2={50 + 28 * Math.sin(fill * 2 * Math.PI)} y2={56 - 28 * Math.cos(fill * 2 * Math.PI)} stroke={INK} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
};

// Report document mock: title bar + lines. `lines` are widths in %.
const Doc: React.FC<{ w: number; title?: string; lines?: number[]; style?: React.CSSProperties; children?: React.ReactNode }> = ({
  w, title, lines = [92, 80, 88, 60], style, children,
}) => (
  <div className="kit-card kit-ui" style={{ width: w, padding: '26px 28px', boxShadow: '0 12px 34px rgba(0,0,0,.06)', position: 'relative', ...style }}>
    {title && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 700, marginBottom: 18 }}>
        <FileIcon size={30} accent />
        {title}
      </div>
    )}
    {lines.map((l, i) => (
      <div key={i} style={{ height: 12, width: `${l}%`, borderRadius: 6, background: '#ECECE6', margin: '14px 0' }} />
    ))}
    {children}
  </div>
);

const Label: React.FC<T & { at?: number; children: React.ReactNode }> = ({ t, at = 0, children }) => (
  <div className="kit-label" style={E(t, at + 0.25, { y: 14 })}>{children}</div>
);

const Pill: React.FC<{ style?: React.CSSProperties; children: React.ReactNode; on?: boolean }> = ({ style, children, on }) => (
  <div className="kit-pill" style={{ ...(on ? { background: LIME_SOFT, borderColor: GREEN } : {}), ...style }}>{children}</div>
);

// ── 1 Answers in seconds ─────────────────────────────────────────────────────
const S1: React.FC<T> = ({ t }) => {
  const q = 'What are the big trends in our industry?';
  return (
    <>
      <Label t={t}>Everyday AI</Label>
      <div className="kit-h1" style={E(t, 0.3, { dur: 0.9, y: 34 })}>
        Answers in <span className="kit-mark" style={M(t, 5.52)}>seconds.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 80 }}>
        <div style={E(t, 1.2)}>
          <Composer text={typed(t, 3.84, q, 1.0)} caret={t < 5.2} w={760} />
        </div>
        <div style={{ ...E(t, 5.52, { scale: 0.8, y: 0, easing: BACK }) }}>
          <Pill style={{ fontSize: 26 }}>⏱ 1.5s</Pill>
        </div>
        <Arrow t={t} at={6.0} w={120} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {([
            ['Summary', 6.48],
            ['Recommendation', 7.28],
            ['List of ideas', 8.64],
          ] as const).map(([l, at]) => (
            <div key={l} style={E(t, at, { x: -30, y: 0, easing: BACK })}>
              <Pill>{l}</Pill>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ── 2 Some questions need more ───────────────────────────────────────────────
const S2: React.FC<T> = ({ t }) => {
  const dim = prog(t, 15.92 - LEAD, 0.8, IN_OUT);
  return (
    <>
      <Label t={t} at={10.08}>Everyday AI</Label>
      <div className="kit-h1" style={E(t, 15.92, { dur: 0.9, y: 30 })}>
        Some questions need <span className="kit-mark" style={M(t, 16.64)}>more.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 90, marginTop: 70 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, opacity: 1 - dim * 0.65, transform: `scale(${1 - dim * 0.12})`, transformOrigin: 'left center' }}>
          {['Summary', 'Recommendation', 'List of ideas'].map((l) => (
            <Pill key={l}>{l}</Pill>
          ))}
          <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, color: MUTED, marginTop: 8, ...E(t, 10.4) }}>
            <Check size={30} /> Great for everyday work
          </div>
        </div>
        <div className="kit-card kit-ui" style={{ width: 980, padding: '44px 50px', borderColor: INK, boxShadow: '0 22px 60px rgba(0,0,0,.10)', ...E(t, 13.2, { x: 60, y: 0, dur: 0.9 }) }}>
          <div className="kit-tag">Complex business question</div>
          <div className="kit-h3" style={{ fontSize: 46, marginTop: 22 }}>
            Should we restructure our go-to-market model for the next three years?
          </div>
          <div style={{ display: 'flex', gap: 14, marginTop: 28, flexWrap: 'wrap' }}>
            {['Many stakeholders', 'Conflicting data', 'High stakes'].map((x, i) => (
              <div key={x} className="kit-pill" style={{ fontSize: 22, padding: '10px 20px', ...E(t, 14.0 + i * 0.3, { y: 10 }) }}>{x}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// ── 3 What a hard question needs ─────────────────────────────────────────────
const S3: React.FC<T> = ({ t }) => {
  const tiles = [
    ['Perspectives', 'Look at it from different angles', 18.96],
    ['Evidence', 'Compare what the sources say', 20.4],
    ['Trade-offs', 'Understand what you give up', 21.76],
  ] as const;
  const merge = prog(t, 23.2 - LEAD, 0.9, IN_OUT);
  return (
    <>
      <Label t={t} at={17.52}>What a hard question needs</Label>
      <div style={{ display: 'flex', gap: 40, marginTop: 30 }}>
        {tiles.map(([h, b, at], i) => (
          <div key={h} className="kit-card kit-ui" style={{ width: 553, padding: '36px 40px', ...E(t, at, { y: 40, easing: BACK }), transform: `${E(t, at, { y: 40, easing: BACK }).transform} translateY(${merge * 10}px)` }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: GREEN, letterSpacing: '.1em' }}>0{i + 1}</div>
            <div className="kit-h3" style={{ fontSize: 50, marginTop: 10 }}>{h}</div>
            <div style={{ fontSize: 26, color: MUTED, marginTop: 12 }}>{b}</div>
          </div>
        ))}
      </div>
      <svg width={1740} height={110} style={{ overflow: 'visible', opacity: merge }}>
        {[276, 870, 1464].map((x) => (
          <path key={x} d={`M${x} 10 C ${x} 60, 870 50, 870 100`} fill="none" stroke={GREEN} strokeWidth={4} strokeDasharray="10 8" />
        ))}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="kit-card kit-ui" style={{ padding: '30px 60px', borderColor: GREEN, background: LIME_SOFT, display: 'flex', alignItems: 'center', gap: 22, ...E(t, 23.2, { y: 30, scale: 0.92 }) }}>
          <Check size={46} color={GREEN} />
          <div className="kit-h3" style={{ fontSize: 50 }}>A well-supported recommendation</div>
        </div>
      </div>
    </>
  );
};

// ── 4 Deep Research ──────────────────────────────────────────────────────────
const S4: React.FC<T> = ({ t }) => (
  <div style={{ textAlign: 'center' }}>
    <div className="kit-label" style={{ justifyContent: 'center', ...E(t, 25.5, { y: 14 }) }}>That's where this comes in</div>
    <div className="kit-h1" style={{ fontSize: 170, ...E(t, 25.9, { dur: 0.9, y: 40, scale: 0.94 }) }}>
      <span className="kit-mark" style={M(t, 26.6)}>Deep Research</span>
    </div>
  </div>
);

// ── 5 Delegate, don't just ask ───────────────────────────────────────────────
const S5: React.FC<T> = ({ t }) => {
  const dimAsk = prog(t, 37.6, 0.8, IN_OUT);
  const steps = ['Plan the investigation', 'Search across sources', 'Analyze the findings', 'Write the report'];
  return (
    <>
      <Label t={t} at={29.28}>What is Deep Research?</Label>
      <div className="kit-h2" style={E(t, 29.6, { dur: 0.9 })}>
        <span className="kit-mark" style={M(t, 30.8)}>Delegate</span> the research. Don't just ask.
      </div>
      <div style={{ display: 'flex', gap: 60, marginTop: 50, alignItems: 'flex-start' }}>
        {/* Ask */}
        <div className="kit-card kit-ui" style={{ width: 700, padding: '34px 38px', opacity: E(t, 33.92).opacity as number * (1 - dimAsk * 0.55), transform: E(t, 33.92, { x: -40, y: 0 }).transform }}>
          <div className="kit-tag" style={{ background: '#F1F1EC' }}>Ask a question</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 26 }}>
            <div style={{ background: '#F1F1EC', borderRadius: 22, padding: '16px 24px', fontSize: 27 }}>What's the outlook for our market?</div>
          </div>
          <div style={{ marginTop: 22, ...E(t, 36.44, { y: 12 }) }}>
            <div style={{ fontSize: 27, lineHeight: 1.5 }}>Here's a quick summary of the outlook…</div>
            <div style={{ fontSize: 22, color: MUTED, marginTop: 12 }}>Immediate response</div>
          </div>
        </div>
        {/* Delegate */}
        <div className="kit-card kit-ui" style={{ width: 1000, padding: '34px 40px', borderColor: GREEN, boxShadow: '0 22px 60px rgba(0,0,0,.08)', ...E(t, 30.8, { x: 40, y: 0, dur: 0.9 }) }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="kit-tag">Delegate an assignment</div>
            <div className="kit-tag" style={{ background: INK, color: '#fff', ...E(t, 40.4, { y: 0, scale: 0.8, easing: BACK }) }}>Multi-step investigation</div>
          </div>
          <div style={{ display: 'flex', gap: 30, marginTop: 26 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 28, fontWeight: 700, width: 330 }}>
              <FileIcon size={40} accent /> Research brief
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {steps.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28, ...E(t, 38.92 + i * 0.45, { x: 24, y: 0 }) }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: LIME_SOFT, border: `2px solid ${GREEN}`, display: 'grid', placeItems: 'center', fontSize: 20, fontWeight: 700, color: GREEN }}>{i + 1}</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ── 6 How it works ───────────────────────────────────────────────────────────
const S6: React.FC<T> = ({ t }) => {
  const W = 370;
  const colStyle: React.CSSProperties = { width: W, height: 470, padding: '28px 26px', display: 'flex', flexDirection: 'column' };
  const head = (n: number, h: string, at: number) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
      <div style={{ width: 44, height: 44, borderRadius: 22, background: prog(t, at - LEAD, 0.3) > 0.5 ? LIME : LINE, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 22, color: INK }}>{n}</div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{h}</div>
    </div>
  );
  return (
    <>
      <Label t={t} at={42.36}>How it works</Label>
      <div className="kit-h2" style={E(t, 42.5, { dur: 0.9 })}>
        From one question to a <span className="kit-mark" style={M(t, 50.0)}>structured report.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 50 }}>
        <div className="kit-card kit-ui" style={{ ...colStyle, ...E(t, 42.6, { y: 30 }) }}>
          {head(1, 'Break down', 42.6)}
          <div style={{ background: '#F1F1EC', borderRadius: 14, padding: '14px 18px', fontSize: 23 }}>Your question</div>
          {['Sub-question A', 'Sub-question B', 'Sub-question C'].map((s, i) => (
            <div key={s} style={{ marginLeft: 34, marginTop: 14, borderLeft: `3px solid ${LIME}`, padding: '8px 14px', fontSize: 22, ...E(t, 43.4 + i * 0.35, { x: 20, y: 0 }) }}>{s}</div>
          ))}
        </div>
        <Arrow t={t} at={45.1} w={60} />
        <div className="kit-card kit-ui" style={{ ...colStyle, ...E(t, 45.52, { y: 30 }) }}>
          {head(2, 'Search', 45.52)}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22, justifyItems: 'center', marginTop: 10 }}>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={E(t, 45.9 + i * 0.22, { y: 0, scale: 0.5, easing: BACK })}>
                {i % 3 === 0 ? <Globe size={70} /> : i % 3 === 1 ? <FileIcon size={70} /> : <Chart size={70} />}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, color: MUTED, marginTop: 'auto' }}>Multiple sources</div>
        </div>
        <Arrow t={t} at={47.4} w={60} />
        <div className="kit-card kit-ui" style={{ ...colStyle, ...E(t, 47.8, { y: 30 }) }}>
          {head(3, 'Analyze', 47.8)}
          {[86, 70, 92, 64, 80].map((w, i) => {
            const hl = prog(t, 48.2 + i * 0.3, 0.5);
            return (
              <div key={i} style={{ position: 'relative', height: 14, width: `${w}%`, borderRadius: 7, background: '#ECECE6', margin: '16px 0', overflow: 'hidden' }}>
                {i % 2 === 0 && <div style={{ position: 'absolute', inset: 0, width: `${hl * 100}%`, background: LIME }} />}
              </div>
            );
          })}
          <div style={{ fontSize: 22, color: MUTED, marginTop: 'auto' }}>Compare and connect</div>
        </div>
        <Arrow t={t} at={49.2} w={60} />
        <div className="kit-card kit-ui" style={{ ...colStyle, borderColor: GREEN, ...E(t, 49.52, { y: 30 }) }}>
          {head(4, 'Report', 49.52)}
          {['Summary', 'Findings', 'Recommendation'].map((h, i) => (
            <div key={h} style={{ marginBottom: 18, ...E(t, 50.3 + i * 0.4, { y: 10 }) }}>
              <div style={{ fontSize: 22, fontWeight: 700 }}>{h}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <div style={{ height: 11, width: '70%', borderRadius: 6, background: '#ECECE6' }} />
                <span style={{ fontSize: 17, fontWeight: 700, color: GREEN, background: LIME_SOFT, borderRadius: 6, padding: '1px 7px', ...E(t, 52.88 + i * 0.2, { y: 0, scale: 0.4, easing: BACK }) }}>[{i + 1}]</span>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 22, color: GREEN, fontWeight: 700, marginTop: 'auto', ...E(t, 52.88) }}>with citations</div>
        </div>
      </div>
    </>
  );
};

// ── 7 Example: regular chat ──────────────────────────────────────────────────
const Q_MARKET = 'Should we expand into a new market?';
const S7: React.FC<T> = ({ t }) => (
  <>
    <Label t={t} at={54.3}>Example</Label>
    <div style={E(t, 54.6)}>
      <Composer text={typed(t, 56.3, Q_MARKET, 1.3)} caret={t < 58.0} w={1100} />
    </div>
    <div className="kit-card kit-ui" style={{ width: 1100, marginTop: 40, padding: '32px 38px', ...E(t, 58.72, { y: 30 }) }}>
      <div className="kit-tag" style={{ background: '#F1F1EC' }}>Regular chat</div>
      <div style={{ fontSize: 30, marginTop: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={E(t, 61.04, { x: 20, y: 0 })}>• <b>Opportunities:</b> new customers, growing demand</div>
        <div style={E(t, 61.84, { x: 20, y: 0 })}>• <b>Risks:</b> competition, cost of entry</div>
      </div>
      <div style={{ fontSize: 22, color: MUTED, marginTop: 20, ...E(t, 62.2) }}>A quick list</div>
    </div>
  </>
);

// ── 8 Deep Research goes further ─────────────────────────────────────────────
const S8: React.FC<T> = ({ t }) => {
  const branches = [
    ['Market conditions', 65.92],
    ['Competitors', 67.04],
    ['Regulation', 68.12],
    ['Potential barriers', 69.92],
  ] as const;
  // Container-relative geometry
  const nodeR = 440; // right edge of question node
  const bx = 580; // branch cards x
  const bw = 440;
  const by = (i: number) => 20 + i * 130; // branch top
  const bh = 96;
  const rx = 1180; // report x
  const conv = prog(t, 71.68 - LEAD, 1.0, IN_OUT);
  return (
    <>
      <Label t={t} at={62.88}>Example</Label>
      <div className="kit-h2" style={E(t, 63.0, { dur: 0.9 })}>
        Deep Research goes <span className="kit-mark" style={M(t, 64.16)}>further.</span>
      </div>
      <div style={{ position: 'relative', width: 1760, height: 540, marginTop: 50 }}>
        <svg width={1760} height={540} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {branches.map(([, at], i) => {
            const p = prog(t, at - LEAD, 0.6, IN_OUT);
            const y = by(i) + bh / 2;
            return (
              <g key={i}>
                <path d={`M${nodeR} 270 C ${nodeR + 80} 270, ${bx - 80} ${y}, ${bx} ${y}`} fill="none" stroke={GREEN} strokeWidth={4} pathLength={1} strokeDasharray={`${p} 1`} />
                <path d={`M${bx + bw} ${y} C ${bx + bw + 80} ${y}, ${rx - 80} 270, ${rx} 270`} fill="none" stroke={LIME} strokeWidth={4} pathLength={1} strokeDasharray={`${conv} 1`} />
              </g>
            );
          })}
        </svg>
        <div className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: 190, width: nodeR, height: 160, padding: '26px 30px', boxSizing: 'border-box', borderColor: INK, ...E(t, 63.2, { y: 0, x: -30 }) }}>
          <div className="kit-tag">Deep Research</div>
          <div style={{ fontSize: 28, fontWeight: 600, marginTop: 14 }}>{Q_MARKET}</div>
        </div>
        {branches.map(([l, at], i) => (
          <div key={l} className="kit-card kit-ui" style={{ position: 'absolute', left: bx, top: by(i), width: bw, height: bh, display: 'flex', alignItems: 'center', gap: 16, padding: '0 26px', fontSize: 30, fontWeight: 600, ...E(t, at + 0.2, { x: -20, y: 0, easing: BACK }) }}>
            <Globe size={36} /> {l}
          </div>
        ))}
        <div style={{ position: 'absolute', left: rx, top: 90, ...E(t, 71.68 + 0.5, { x: 30, y: 0, dur: 0.9 }) }}>
          <Doc w={560} title="Market entry analysis" lines={[92, 78, 88, 70, 84, 60]} style={{ borderColor: GREEN }}>
            <div className="kit-tag" style={{ marginTop: 6 }}>More complete analysis</div>
          </Doc>
        </div>
      </div>
    </>
  );
};

// ── 9 Not how much. How systematically. ─────────────────────────────────────
const S9: React.FC<T> = ({ t }) => {
  const strike = prog(t, 76.9, 0.6, IN_OUT);
  const steps = ['Plan', 'Search', 'Analyze', 'Report'];
  return (
    <>
      <Label t={t} at={74.32}>The key difference</Label>
      <div className="kit-h1" style={{ fontSize: 92 }}>
        <span style={{ ...E(t, 75.28), display: 'inline-block', color: MUTED }}>Not how much.</span>{' '}
        <span style={{ ...E(t, 77.52), display: 'inline-block' }}>
          How <span className="kit-mark" style={M(t, 78.0)}>systematically.</span>
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 120, marginTop: 80 }}>
        <div style={{ position: 'relative', width: 420, height: 300, ...E(t, 75.28) }}>
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const p = prog(t, 75.4 + i * 0.15, 0.4);
            return (
              <div key={i} style={{ position: 'absolute', left: 60 + i * 24, top: 40 + i * 18, opacity: p }}>
                <Doc w={230} lines={[80, 60, 70]} style={{ padding: '18px 20px' }} />
              </div>
            );
          })}
          <svg width={460} height={320} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
            <line x1={30} y1={290} x2={30 + 400 * strike} y2={290 - 260 * strike} stroke={RED} strokeWidth={8} strokeLinecap="round" />
          </svg>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {steps.map((s, i) => {
            const on = prog(t, 78.0 + i * 0.35 - LEAD, 0.4);
            return (
              <React.Fragment key={s}>
                <div className="kit-pill" style={{ background: on > 0.5 ? LIME_SOFT : '#fff', borderColor: on > 0.5 ? GREEN : LINE, opacity: 0.35 + on * 0.65, fontSize: 30 }}>
                  <span style={{ color: GREEN }}>{i + 1}</span> {s}
                </div>
                {i < 3 && <div style={{ width: 30, height: 4, background: on > 0.5 ? GREEN : LINE }} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

// ── 10–13 Three situations ───────────────────────────────────────────────────
const SITUATIONS = ['Strategic decisions', 'Synthesizing complex evidence', 'Learning unfamiliar topics'];
const SITUATION_SUB = ['Markets, competitors, business models', 'Many studies, one clear picture', 'A structured understanding, fast'];

const S10: React.FC<T> = ({ t }) => (
  <>
    <Label t={t} at={81.76}>When to use it</Label>
    <div className="kit-h1" style={E(t, 82.0, { dur: 0.9 })}>
      <span className="kit-mark" style={M(t, 84.2)}>Three</span> situations.
    </div>
    <div style={{ display: 'flex', gap: 40, marginTop: 70 }}>
      {SITUATIONS.map((s, i) => (
        <div key={s} className="kit-card kit-ui" style={{ width: 553, height: 280, padding: '36px 40px', ...E(t, 84.2 + i * 0.3, { y: 40, easing: BACK }) }}>
          <div className="kit-h2" style={{ color: GREEN, fontSize: 64 }}>0{i + 1}</div>
          <div className="kit-h3" style={{ marginTop: 14 }}>{s}</div>
          <div style={{ fontSize: 24, color: MUTED, marginTop: 10 }}>{SITUATION_SUB[i]}</div>
        </div>
      ))}
    </div>
  </>
);

// Left rail shared by scenes 11–13: the three situations, current one highlighted.
const Rail: React.FC<{ active: number }> = ({ active }) => (
  <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 18, flex: 'none' }}>
    {SITUATIONS.map((s, i) => (
      <div key={s} className="kit-card kit-ui" style={{ padding: '20px 24px', borderColor: i === active ? GREEN : LINE, background: i === active ? LIME_SOFT : '#fff', opacity: i === active ? 1 : 0.45 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: GREEN }}>0{i + 1}</div>
        <div style={{ fontSize: 26, fontWeight: 600, marginTop: 4 }}>{s}</div>
      </div>
    ))}
  </div>
);

const Situation: React.FC<T & { index: number; at: number; children: React.ReactNode }> = ({ t, index, at, children }) => (
  <div style={{ display: 'flex', gap: 80, alignItems: 'flex-start' }}>
    <div style={E(t, at, { x: -30, y: 0 })}>
      <Rail active={index} />
    </div>
    <div style={{ flex: 1 }}>
      <div className="kit-label" style={E(t, at + 0.1, { y: 12 })}>Situation 0{index + 1}</div>
      <div className="kit-h2" style={E(t, at + 0.2, { dur: 0.9 })}>{SITUATIONS[index]}.</div>
      <div style={{ marginTop: 50 }}>{children}</div>
    </div>
  </div>
);

const S11: React.FC<T> = ({ t }) => {
  const tilt = interpolate(t, [92.88 - LEAD, 93.8, 94.4, 95.4], [0, -8, 6, -3], clamp);
  const opts = [
    ['Markets', 89.12],
    ['Competitors', 89.96],
    ['Business models', 90.8],
  ] as const;
  return (
    <Situation t={t} index={0} at={85.84}>
      <div style={{ display: 'flex', gap: 28 }}>
        {opts.map(([l, at]) => (
          <div key={l} style={E(t, at, { y: 24, easing: BACK })}>
            <Pill style={{ fontSize: 32 }}>{l}</Pill>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 60, marginTop: 60, ...E(t, 92.6) }}>
        <svg width={560} height={260} viewBox="0 0 560 260" style={{ overflow: 'visible' }}>
          <path d="M280 60 L280 240 M200 240 L360 240" stroke={INK} strokeWidth={6} strokeLinecap="round" />
          <circle cx={280} cy={60} r={10} fill={INK} />
          <g transform={`rotate(${tilt} 280 60)`}>
            <line x1={60} y1={60} x2={500} y2={60} stroke={INK} strokeWidth={6} strokeLinecap="round" />
            <g transform={`rotate(${-tilt} 60 60)`}>
              <path d="M60 60 L20 140 M60 60 L100 140" stroke={MUTED} strokeWidth={2} />
              <path d="M10 140 Q60 175 110 140 Z" fill={LIME_SOFT} stroke={GREEN} strokeWidth={3} />
            </g>
            <g transform={`rotate(${-tilt} 500 60)`}>
              <path d="M500 60 L460 140 M500 60 L540 140" stroke={MUTED} strokeWidth={2} />
              <path d="M450 140 Q500 175 550 140 Z" fill="#FDE7DD" stroke={RED} strokeWidth={3} />
            </g>
          </g>
          <text x={60} y={210} textAnchor="middle" fontFamily="Public Sans" fontWeight={700} fontSize={26} fill={GREEN}>Opportunities</text>
          <text x={500} y={210} textAnchor="middle" fontFamily="Public Sans" fontWeight={700} fontSize={26} fill={RED}>Risks</text>
        </svg>
        <div style={E(t, 94.64, { x: 20, y: 0 })}>
          <div className="kit-tag">Trade-offs</div>
          <div className="kit-body" style={{ marginTop: 14, maxWidth: 520 }}>Evaluate the options side by side before you commit.</div>
        </div>
      </div>
    </Situation>
  );
};

const S12: React.FC<T> = ({ t }) => {
  const studies = ['A', 'B', 'C', 'D', 'E'];
  const agree = [true, true, false, true, false];
  const sort = prog(t, 107.04 - LEAD, 0.8, IN_OUT);
  const split = prog(t, 108.4 - LEAD, 0.8, IN_OUT);
  return (
    <Situation t={t} index={1} at={96.04}>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={E(t, 100.72, { y: 16 })}><Pill>Productivity</Pill></div>
        <div style={E(t, 101.84, { y: 16 })}><Pill>AI adoption</Pill></div>
      </div>
      <div style={{ position: 'relative', height: 360, marginTop: 40 }}>
        {studies.map((s, i) => {
          // Start in a row; agreeing studies move left as a group, the others drop right.
          const agreeIdx = agree.slice(0, i).filter(Boolean).length;
          const diffIdx = agree.slice(0, i).filter((x) => !x).length;
          const x0 = i * 250;
          const x1 = agree[i] ? agreeIdx * 210 : 760 + diffIdx * 210;
          const x = x0 + (x1 - x0) * sort;
          const y = (agree[i] ? 0 : 0) + (agree[i] ? 0 : 40 * split);
          const mark = agree[i] ? prog(t, 107.04, 0.4) : prog(t, 108.4, 0.4);
          return (
            <div key={s} style={{ position: 'absolute', left: x, top: y, ...E(t, 103.68 + i * 0.25, { y: 30, easing: BACK }) }}>
              <Doc w={190} title={`Study ${s}`} lines={[86, 64, 76]} style={{ padding: '18px 20px', borderColor: mark > 0.5 ? (agree[i] ? GREEN : RED) : LINE }} />
              <div style={{ position: 'absolute', right: -12, top: -12, opacity: mark, transform: `scale(${0.5 + mark * 0.5})` }}>
                {agree[i] ? <Check size={40} /> : <Cross size={40} />}
              </div>
            </div>
          );
        })}
        <div className="kit-ui" style={{ position: 'absolute', left: 0, top: 250, fontSize: 28, fontWeight: 700, color: GREEN, ...E(t, 107.3) }}>Where the evidence agrees</div>
        <div className="kit-ui" style={{ position: 'absolute', left: 760, top: 290, fontSize: 28, fontWeight: 700, color: RED, ...E(t, 108.7) }}>Where it differs</div>
      </div>
    </Situation>
  );
};

const S13: React.FC<T> = ({ t }) => {
  const frags = [
    ['Emerging technologies', 112.64, [0, 40], [0, 0], true],
    ['What it is', 113.0, [520, 0], [40, 70], false],
    ['Who is involved', 113.4, [860, 90], [40, 130], false],
    ['New regulations', 114.08, [140, 200], [0, 200], true],
    ['What changes for us', 114.5, [700, 230], [40, 270], false],
    ['Key deadlines', 114.9, [380, 120], [40, 330], false],
  ] as const;
  const snap = prog(t, 116.88 - LEAD, 1.0, IN_OUT);
  return (
    <Situation t={t} index={2} at={109.36}>
      <div style={{ position: 'relative', height: 440 }}>
        <div className="kit-card" style={{ position: 'absolute', left: -30, top: -26, width: 640, height: 430, opacity: snap, borderColor: GREEN }} />
        {frags.map(([l, at, a, b, head]) => {
          const x = a[0] + (b[0] - a[0]) * snap;
          const y = a[1] + (b[1] - a[1]) * snap;
          return (
            <div key={l} className="kit-ui" style={{ position: 'absolute', left: x, top: y, ...E(t, at, { y: 0, scale: 0.7, easing: BACK }) }}>
              <div style={{
                padding: head ? '10px 18px' : '8px 16px',
                borderRadius: 12,
                fontSize: head ? 30 : 26,
                fontWeight: head ? 700 : 400,
                background: snap > 0.6 ? 'transparent' : '#F1F1EC',
                transform: `rotate(${(1 - snap) * (head ? -3 : 3)}deg)`,
                whiteSpace: 'nowrap',
              }}>
                {!head && snap > 0.6 ? '• ' : ''}{l}
              </div>
            </div>
          );
        })}
        <div className="kit-ui" style={{ position: 'absolute', left: 680, top: 160, display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 700, ...E(t, 119.6, { x: -20, y: 0 }) }}>
          <Check size={44} /> Ready to make decisions
        </div>
        <div className="kit-tag" style={{ position: 'absolute', left: 680, top: 90, ...E(t, 117.2) }}>Structured understanding</div>
      </div>
    </Situation>
  );
};

// ── 14 Not a substitute ──────────────────────────────────────────────────────
const S14: React.FC<T> = ({ t }) => (
  <>
    <Label t={t} at={122.16}>What to keep in mind</Label>
    <div className="kit-h3 kit-muted" style={{ color: MUTED, ...E(t, 122.3) }}>Deep Research is powerful.</div>
    <div className="kit-h1" style={{ marginTop: 30, ...E(t, 124.4, { dur: 0.9, y: 34 }) }}>
      But it isn't a substitute for <span className="kit-mark" style={M(t, 125.96)}>your judgment.</span>
    </div>
  </>
);

// ── 15 Where it can go wrong ─────────────────────────────────────────────────
const S15: React.FC<T> = ({ t }) => {
  const flags = [
    ['Missed evidence', 127.44, 74],
    ['Misread sources', 129.04, 148],
    ['Unsupported conclusions', 130.88, 222],
  ] as const;
  const fade = prog(t, 134.48, 0.6, IN_OUT);
  return (
    <>
      <Label t={t} at={127.08}>What to keep in mind</Label>
      <div className="kit-h2" style={E(t, 127.3, { dur: 0.9 })}>It can get things <span className="kit-mark" style={M(t, 131.4)}>wrong.</span></div>
      <div style={{ display: 'flex', gap: 100, marginTop: 50, alignItems: 'flex-start' }}>
        <div style={{ position: 'relative', ...E(t, 127.3, { y: 30 }) }}>
          <Doc w={520} title="Research report" lines={[90, 76, 88, 70, 84]} />
          {flags.map(([l, at, y]) => (
            <div key={l} className="kit-ui" style={{ position: 'absolute', left: 420, top: y + 44, display: 'flex', alignItems: 'center', gap: 10, background: '#FEF3C7', border: '2px solid #F59E0B', borderRadius: 12, padding: '8px 16px', fontSize: 24, fontWeight: 600, whiteSpace: 'nowrap', ...E(t, at, { x: -20, y: 0, easing: BACK }) }}>
              <Flag /> {l}
            </div>
          ))}
        </div>
        <div style={{ marginLeft: 260, ...E(t, 133.52) }}>
          <div className="kit-tag" style={{ background: '#F1F1EC' }}>Out of reach</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 200px)', gap: 24, marginTop: 24 }}>
            {[0, 1, 2, 3].map((i) => {
              const hidden = i >= 2;
              return (
                <div key={i} className="kit-card" style={{ height: 130, display: 'grid', placeItems: 'center', position: 'relative', opacity: hidden ? 1 - fade * 0.55 : 1 }}>
                  {i === 0 ? <Globe size={64} /> : i === 1 ? <Chart size={64} /> : <FileIcon size={64} />}
                  {i === 2 && (
                    <div className="kit-ui" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,.85)', borderRadius: 20, fontSize: 22, fontWeight: 700, ...E(t, 136.4, { y: 0, scale: 0.7, easing: BACK }) }}>
                      <Lock /> Paywalls
                    </div>
                  )}
                  {i === 3 && (
                    <div className="kit-ui" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'rgba(255,255,255,.85)', borderRadius: 20, fontSize: 22, fontWeight: 700, textAlign: 'center', ...E(t, 137.36, { y: 0, scale: 0.7, easing: BACK }) }}>
                      <Plug /> Unconnected systems
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

// ── 16 A citation isn't proof ────────────────────────────────────────────────
const S16: React.FC<T> = ({ t }) => {
  const items = [
    ['Check the key sources', 146.44],
    ['Challenge the assumptions', 147.92],
    ['Validate the conclusions', 149.52],
  ] as const;
  const chip = prog(t, 141.4 - LEAD, 0.4);
  return (
    <>
      <Label t={t} at={140.08}>What to keep in mind</Label>
      <div className="kit-h2" style={E(t, 142.8, { dur: 0.9 })}>A citation <span className="kit-mark" style={M(t, 143.6)}>isn't proof.</span></div>
      <div style={{ display: 'flex', gap: 80, marginTop: 50, alignItems: 'flex-start' }}>
        <div className="kit-card kit-ui" style={{ width: 760, padding: '34px 38px', ...E(t, 140.3, { y: 30 }) }}>
          <div className="kit-tag" style={{ background: '#F1F1EC' }}>From the report</div>
          <div style={{ fontSize: 34, lineHeight: 1.5, marginTop: 22 }}>
            The new segment is growing quickly.{' '}
            <span style={{ fontSize: 24, fontWeight: 700, color: GREEN, background: chip > 0.5 ? LIME : LIME_SOFT, borderRadius: 8, padding: '2px 10px', verticalAlign: 'super' }}>[4]</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 26, fontSize: 26, fontWeight: 600, color: RED, ...E(t, 143.52, { x: -20, y: 0 }) }}>
            <Cross size={34} /> Cited doesn't mean correct
          </div>
        </div>
        <div className="kit-card kit-ui" style={{ width: 760, padding: '34px 38px', borderColor: GREEN, ...E(t, 145.44, { x: 30, y: 0 }) }}>
          <div className="kit-tag">Your job</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 24 }}>
            {items.map(([l, at]) => {
              const on = prog(t, at - LEAD, 0.4);
              return (
                <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 32 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, border: `3px solid ${on > 0.5 ? LIME : LINE}`, display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <div style={{ transform: `scale(${on})` }}><Check size={40} /></div>
                  </div>
                  <span style={{ opacity: 0.4 + on * 0.6 }}>{l}</span>
                </div>
              );
            })}
          </div>
          <div className="kit-tag" style={{ marginTop: 28, background: INK, color: '#fff', ...E(t, 152.0, { y: 0, scale: 0.8, easing: BACK }) }}>Especially for high-stakes decisions</div>
        </div>
      </div>
    </>
  );
};

// ── 17 Use it deliberately ───────────────────────────────────────────────────
const S17: React.FC<T> = ({ t }) => {
  const dot = prog(t, 165.0, 1.2, IN_OUT);
  const G = 420; // grid size
  return (
    <>
      <Label t={t} at={153.76}>What to keep in mind</Label>
      <div className="kit-h2" style={E(t, 161.92, { dur: 0.9 })}>Use it <span className="kit-mark" style={M(t, 162.4)}>deliberately.</span></div>
      <div style={{ display: 'flex', gap: 120, marginTop: 40, alignItems: 'center' }}>
        <div style={{ width: 760 }}>
          <div style={{ display: 'flex', gap: 30 }}>
            {([
              ['Regular chat', 'Seconds', 0.08, MUTED],
              ['Deep Research', 'Minutes', 0.85, LIME],
            ] as const).map(([h, v, f, c], i) => (
              <div key={h} className="kit-card kit-ui" style={{ flex: 1, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 22, ...E(t, 154.4 + i * 0.9, { y: 24 }) }}>
                <Stopwatch fill={prog(t, 155.28, 2.5) * f} size={96} color={c} />
                <div>
                  <div style={{ fontSize: 22, color: MUTED }}>{h}</div>
                  <div style={{ fontSize: 36, fontWeight: 700 }}>{v}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 36, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={E(t, 157.28, { y: 16 })}><Pill>Availability</Pill></div>
            <div style={E(t, 158.24, { y: 16 })}><Pill>Usage limits</Pill></div>
            <div className="kit-ui" style={{ fontSize: 28, color: MUTED, ...E(t, 159.68, { x: -16, y: 0 }) }}>vary by platform and plan</div>
          </div>
        </div>
        <div style={{ position: 'relative', width: G + 80, height: G + 70, ...E(t, 163.0) }}>
          <div style={{ position: 'absolute', left: 60, top: 0, width: G, height: G, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 8 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="kit-ui" style={{ borderRadius: 14, background: i === 1 ? (dot > 0.8 ? LIME_SOFT : '#F6F6F2') : '#F6F6F2', border: `2px solid ${i === 1 && dot > 0.8 ? GREEN : 'transparent'}`, display: 'grid', placeItems: 'end center', paddingBottom: 22, boxSizing: 'border-box', fontSize: 22, fontWeight: 600, color: i === 1 ? GREEN : MUTED, textAlign: 'center' }}>
                {i === 1 ? (dot > 0.8 ? 'Deep Research' : '') : i === 2 ? 'Regular chat' : ''}
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 60 + G * (0.25 + 0.5 * dot) - 16, top: G * (0.7 - 0.5 * dot) - 16, width: 32, height: 32, borderRadius: 16, background: INK, opacity: prog(t, 164.6, 0.3) }} />
          <div className="kit-ui" style={{ position: 'absolute', left: 60, top: G + 16, width: G, textAlign: 'center', fontSize: 24, fontWeight: 700, ...E(t, 163.28, { y: 10 }) }}>Complexity →</div>
          <div className="kit-ui" style={{ position: 'absolute', left: -150, top: G / 2 - 16, width: 300, textAlign: 'center', fontSize: 24, fontWeight: 700, transform: 'rotate(-90deg)', ...{ opacity: E(t, 164.4).opacity } }}>Importance →</div>
        </div>
      </div>
    </>
  );
};

// ── 18 The real shift ────────────────────────────────────────────────────────
const S18: React.FC<T> = ({ t }) => (
  <>
    <Label t={t} at={168.4}>The real shift</Label>
    <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 40 }}>
      <div className="kit-card kit-ui" style={{ width: 700, padding: '50px 50px', opacity: (E(t, 169.76).opacity as number) * (1 - prog(t, 172.0, 0.8) * 0.45), transform: E(t, 169.76, { x: -30, y: 0 }).transform }}>
        <div style={{ fontSize: 24, color: MUTED, fontWeight: 600 }}>FROM</div>
        <div className="kit-h2" style={{ fontSize: 64, marginTop: 10 }}>Asking AI for answers</div>
      </div>
      <Arrow t={t} at={171.6} w={180} />
      <div className="kit-card kit-ui" style={{ width: 780, padding: '50px 50px', borderColor: GREEN, background: LIME_SOFT, ...E(t, 172.0, { x: 30, y: 0, dur: 0.9 }) }}>
        <div style={{ fontSize: 24, color: GREEN, fontWeight: 700 }}>TO</div>
        <div className="kit-h2" style={{ fontSize: 64, marginTop: 10 }}>Delegating a structured investigation</div>
      </div>
    </div>
  </>
);

// ── 19 Who does what ─────────────────────────────────────────────────────────
const S19: React.FC<T> = ({ t }) => {
  const bar = prog(t, 180.0, 1.8, IN_OUT);
  const col = (h: string, tag: string, at: number, children: React.ReactNode, lime?: boolean) => (
    <div className="kit-card kit-ui" style={{ width: 500, height: 470, padding: '34px 36px', borderColor: lime ? GREEN : LINE, ...E(t, at, { y: 30 }) }}>
      <div className="kit-tag" style={lime ? {} : { background: '#F1F1EC' }}>{tag}</div>
      <div className="kit-h3" style={{ fontSize: 46, marginTop: 16 }}>{h}</div>
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
    </div>
  );
  const item = (l: string, at: number, mark?: boolean) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, ...E(t, at, { x: 20, y: 0 }) }}>
      <Check size={32} /> {mark ? <span className="kit-mark" style={M(t, at + 0.4)}>{l}</span> : l}
    </div>
  );
  return (
    <>
      <Label t={t} at={174.88}>Who does what</Label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
        {col('You define', 'You', 175.0, (
          <>
            {item('The question', 175.76)}
            {item('The scope', 176.48)}
            {item('What good evidence looks like', 177.92)}
          </>
        ), true)}
        <Arrow t={t} at={179.0} w={110} />
        {col('AI researches', 'AI', 179.52, (
          <>
            <div style={{ fontSize: 28, color: MUTED }}>Much of the research work</div>
            <div style={{ height: 18, borderRadius: 9, background: LINE, overflow: 'hidden', marginTop: 10 }}>
              <div style={{ height: '100%', width: `${bar * 100}%`, background: LIME }} />
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
              <Globe size={52} /> <FileIcon size={52} /> <Chart size={52} />
            </div>
          </>
        ))}
        <Arrow t={t} at={182.0} w={110} />
        {col('You decide', 'You', 182.4, (
          <>
            {item('Interpret the findings', 183.6)}
            {item('Make the decision', 185.68, true)}
          </>
        ), true)}
      </div>
    </>
  );
};

// ── 20 Better-informed decisions ─────────────────────────────────────────────
const S20: React.FC<T> = ({ t }) => (
  <>
    <Label t={t} at={186.88}>Deep Research</Label>
    <div className="kit-h3" style={{ color: MUTED, ...E(t, 189.2) }}>More than an information tool.</div>
    <div className="kit-h1" style={{ marginTop: 30, ...E(t, 191.3, { dur: 1.0, y: 34 }) }}>
      A practical capability for <span className="kit-mark" style={M(t, 193.24)}>better-informed</span> leadership decisions.
    </div>
  </>
);

// ── Body ────────────────────────────────────────────────────────────────────
const SCENES: React.FC<T>[] = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12, S13, S14, S15, S16, S17, S18, S19, S20];

const DeepResearchBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/DeepResearch.mp3')} />}
      {SCENES.map((S, i) => (
        <Scene key={i} t={t} index={i} padStyle={i === 3 ? { alignItems: 'center' } : undefined}>
          <S t={t} />
        </Scene>
      ))}
      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const DeepResearch: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={DEEP_RESEARCH_TITLE_FRAMES}>
      <TitleCardGreen label="RESEARCH WITH AI" title="Deep Research" />
    </Sequence>
    <Sequence from={DEEP_RESEARCH_TITLE_FRAMES}>
      <DeepResearchBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
