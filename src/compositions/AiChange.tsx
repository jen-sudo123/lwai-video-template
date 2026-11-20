import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
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
  enter,
  makeScene,
  markStyle,
  prog,
} from '../kit';

loadSerif();
loadSans();

// How to Make AI Change Actually Happen (Video 3) — custom concept composition built with src/kit.
// VO: audio/ai-change.mp3 (Daan, ElevenLabs v4, take B, 216.27s). Every cue is in SECONDS of the VO,
// from the Scribe word timestamps in src/data/ai-change.transcript.json. A 90-frame green title card
// precedes the VO.
//
//  #  scene                              start   VO cue
//  1  The perception gap (80% vs 30%)    0.00    "Ask executives whether…"
//  2  The message doesn't land           16.16   "And if we can't even communicate change…"
//  3  Zapier: almost everyone, daily     21.84   "One company that has made real progress…"
//  4  Four things combined               28.72   "When we interviewed… Brandon Sammut…"
//  5  Results                            42.16   "The results speak for themselves."
//  6  What makes it stick? (roadmap)     51.04   "So what can we learn…"
//  7  Step 1: Start by listening         58.08   "First, start by listening."
//  8  The Four Forces                    72.88   "Our transformation partner, Phil Kirschner…"
//  9  How to listen, keep listening      93.76   "Use interviews, surveys…"
//  10 Step 2: Network of AI Champions    102.64  "Second, build a network of AI Champions…"
//  11 Citi + PwC Netherlands             116.64  "At Citi, more than four thousand…"
//  12 Appointing isn't enough            129.80  "But appointing Champions isn't enough."
//  13 Step 3: Let employees shape it     139.64  "Third, let employees shape the change."
//  14 Arizona State University           147.28  "At Arizona State University…"
//  15 Kaiser Permanente                  156.56  "At Kaiser Permanente, clinicians…"
//  16 Managers clear the path            163.52  "Managers are essential here."
//  17 Step 4: Measure both sides         173.68  "Finally, measure progress…"
//  18 The feedback loop                  193.52  "Use regular employee listening…"
//  19 No fixed finish line               199.92  "Because unlike a traditional software rollout…"
//  20 Closing: Together                  206.32  "The goal is to build an organization…"

export const AI_CHANGE_DURATION_S = 218.0;
export const AI_CHANGE_TITLE_FRAMES = 90;

const STARTS = [
  0, 16.16, 21.84, 28.72, 42.16, 51.04, 58.08, 72.88, 93.76, 102.64, 116.64, 129.8, 139.64, 147.28, 156.56, 163.52,
  173.68, 193.52, 199.92, 206.32,
];
const Scene = makeScene(STARTS, 0.5);

const ORANGE = RED;

// Browser previews can inject images (e.g. as data URIs) via globalThis.AI_CHANGE_IMAGES; renders use public/.
const img = (n: string): string =>
  (globalThis as { AI_CHANGE_IMAGES?: Record<string, string> }).AI_CHANGE_IMAGES?.[n] ?? staticFile(`ai-change/images/${n}.png`);
const PAPER = '#FBFBF8';
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// ── Small drawing helpers ───────────────────────────────────────────────────
const Person: React.FC<{ size?: number; color?: string; style?: React.CSSProperties }> = ({ size = 40, color = '#C9C9C2', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none', ...style }}>
    <circle cx="12" cy="7.5" r="4.2" fill={color} />
    <path d="M3.5 22c0-5 3.8-8.4 8.5-8.4s8.5 3.4 8.5 8.4z" fill={color} />
  </svg>
);

const StepBadge: React.FC<{ t: number; at: number; n: string }> = ({ t, at, n }) => (
  <div
    className="kit-ui"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: 26,
      ...enter(t, at, { y: 0, scale: 0.7, easing: BACK }),
    }}
  >
    <span
      style={{
        width: 74,
        height: 74,
        borderRadius: 20,
        background: LIME,
        color: '#fff',
        fontWeight: 800,
        fontSize: 34,
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.14em', color: MUTED }}>STEP {n} OF 4</span>
  </div>
);

// Horizontal arrow with a drawn-on shaft; dir 1 = right, -1 = left
const ForceArrow: React.FC<{ x1: number; x2: number; y: number; p: number; color: string; glow?: number }> = ({ x1, x2, y, p, color, glow = 0 }) => {
  const dir = x2 > x1 ? 1 : -1;
  const xe = lerp(x1, x2, p);
  const w = 16 + glow * 8;
  return (
    <g opacity={p > 0 ? 1 : 0}>
      <line x1={x1} y1={y} x2={xe - dir * 26} y2={y} stroke={color} strokeWidth={w} strokeLinecap="round" />
      {p > 0.15 && <path d={`M${xe - dir * 40} ${y - 30 - glow * 4} L${xe} ${y} L${xe - dir * 40} ${y + 30 + glow * 4} Z`} fill={color} />}
    </g>
  );
};

const Icon: React.FC<{ name: string; size?: number; color?: string }> = ({ name, size = 44, color = GREEN }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const paths: Record<string, React.ReactNode> = {
    flag: (
      <>
        <path d="M5 21V4" {...s} />
        <path d="M5 4h11l-2 4 2 4H5" {...s} />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6M10 3v6l-5 9a2 2 0 001.8 3h10.4A2 2 0 0019 18l-5-9V3" {...s} />
        <path d="M7.5 15h9" {...s} />
      </>
    ),
    star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" {...s} />,
    flow: (
      <>
        <rect x="3" y="4" width="6" height="5" rx="1.2" {...s} />
        <rect x="15" y="4" width="6" height="5" rx="1.2" {...s} />
        <rect x="9" y="15" width="6" height="5" rx="1.2" {...s} />
        <path d="M9 6.5h6M18 9v3.5h-6V15" {...s} />
      </>
    ),
    mic: (
      <>
        <rect x="9" y="3" width="6" height="11" rx="3" {...s} />
        <path d="M5.5 11a6.5 6.5 0 0013 0M12 17.5V21" {...s} />
      </>
    ),
    survey: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" {...s} />
        <path d="M8.5 8.5l1.2 1.2 2.3-2.4M14 8.5h2.5M8.5 14l1.2 1.2 2.3-2.4M14 14h2.5" {...s} />
      </>
    ),
    chat: (
      <>
        <path d="M4 5h12a2 2 0 012 2v6a2 2 0 01-2 2H9l-4 3.5V15H4a2 2 0 01-2-2V7a2 2 0 012-2z" {...s} />
        <path d="M20 9h.5A1.5 1.5 0 0122 10.5V16a1.5 1.5 0 01-1.5 1.5H20V20l-3-2.5h-4" {...s} />
      </>
    ),
    cap: (
      <>
        <path d="M2 9l10-5 10 5-10 5z" {...s} />
        <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" {...s} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" {...s} />
        <path d="M12 7v5l3.5 2" {...s} />
      </>
    ),
    team: (
      <>
        <circle cx="8" cy="8" r="3" {...s} />
        <circle cx="16.5" cy="9" r="2.5" {...s} />
        <path d="M2.5 20c0-3.5 2.5-6 5.5-6s5.5 2.5 5.5 6M14 14.3c.8-.3 1.6-.5 2.5-.5 2.7 0 5 2 5 5.2" {...s} />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" {...s} />
        <path d="M8.5 12l2.3 2.3 4.7-4.8" {...s} />
      </>
    ),
    path: (
      <>
        <path d="M4 20c4 0 4-6 8-6s4-6 8-6" {...s} />
        <circle cx="20" cy="8" r="2" {...s} />
        <circle cx="4" cy="20" r="2" {...s} />
      </>
    ),
    heart: <path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0112 7.5 4.3 4.3 0 0119.5 10c0 5.4-7.5 10-7.5 10z" {...s} />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
      {paths[name]}
    </svg>
  );
};

// ── Body ────────────────────────────────────────────────────────────────────
const AiChangeBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/ai-change.mp3')} />}

      {/* 1 — The perception gap */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>The communication gap</div>
        <div className="kit-h2" style={{ maxWidth: 1500, ...enter(t, 0.3, { dur: 0.9, y: 30 }) }}>
          Do people feel <span className="kit-mark" style={markStyle(t, 2.68)}>well informed</span> about the AI strategy?
        </div>
        {(() => {
          const TRACK = 1060;
          const rows = [
            { who: 'Executives', sub: 'say yes', at: 0.52, fill: 0.8, fillAt: 5.52, color: INK },
            { who: 'Employees', sub: 'agree', at: 8.32, fill: 0.3, fillAt: 10.16, color: LIME },
          ];
          const gap = prog(t, 11.1, 0.7, IN_OUT);
          return (
            <div style={{ position: 'relative', marginTop: 70 }}>
              {rows.map((r, i) => {
                const p = prog(t, r.fillAt, 1.0, IN_OUT);
                return (
                  <div key={r.who} style={{ display: 'flex', alignItems: 'center', gap: 40, height: 130, ...enter(t, r.at, { x: -30, y: 0 }) }}>
                    <div style={{ width: 330 }}>
                      <div className="kit-h3" style={{ fontSize: 46 }}>{r.who}</div>
                      <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 4 }}>{r.sub}</div>
                    </div>
                    <div style={{ width: TRACK, height: 64, borderRadius: 32, background: '#F1F1EC', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: TRACK * r.fill * p, borderRadius: 32, background: r.color }} />
                    </div>
                    <div className="kit-h1" style={{ fontSize: 110, width: 260, textAlign: 'right', color: i === 1 ? GREEN : INK }}>
                      {Math.round(r.fill * 100 * p)}%
                    </div>
                  </div>
                );
              })}
              {/* gap bracket between 30% and 80% */}
              <div
                style={{
                  position: 'absolute',
                  left: 370 + TRACK * 0.3,
                  width: TRACK * 0.5 * gap,
                  top: 92,
                  height: 76,
                  borderTop: `4px dashed ${ORANGE}`,
                  borderBottom: `4px dashed ${ORANGE}`,
                  opacity: gap,
                }}
              />
              <div
                className="kit-ui"
                style={{
                  position: 'absolute',
                  left: 370 + TRACK * 0.55 - 140,
                  width: 280,
                  top: 108,
                  textAlign: 'center',
                  fontSize: 30,
                  fontWeight: 800,
                  color: ORANGE,
                  background: '#fff',
                  ...enter(t, 11.5, { y: 0, scale: 0.6, easing: BACK }),
                }}
              >
                50-point gap
              </div>
            </div>
          );
        })()}
        <div className="kit-ui" style={{ marginTop: 40, fontSize: 24, color: MUTED, ...enter(t, 13.2, { y: 10 }) }}>
          Source: Columbia Business School and BCG
        </div>
      </Scene>

      {/* 2 — The message doesn't land */}
      <Scene t={t} index={1}>
        <div className="kit-h2" style={{ ...enter(t, 16.3, { dur: 0.8, y: 30 }) }}>
          If we can’t <span className="kit-mark" style={markStyle(t, 17.04)}>communicate</span> change,
        </div>
        <div className="kit-h2" style={{ color: MUTED, ...enter(t, 19.2, { dur: 0.8, y: 30 }) }}>
          how can we <span className="kit-mark" style={{ ...markStyle(t, 20.24), color: INK }}>make it happen?</span>
        </div>
        {(() => {
          const W = 1760;
          const L = 260;
          const R = 1440;
          const send = prog(t, 16.9, 1.6, IN_OUT);
          const broken = prog(t, 18.24, 0.4);
          const msgX = lerp(L + 110, (L + R) / 2 + 40, send);
          const fall = prog(t, 18.5, 0.9, Easing.in(Easing.quad));
          return (
            <div style={{ position: 'relative', width: W, height: 380, marginTop: 70 }}>
              <svg width={W} height={380} style={{ position: 'absolute', inset: 0 }}>
                <line x1={L + 110} y1={150} x2={(L + R) / 2 - 30 * broken} y2={150} stroke={LINE} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 18" />
                <line x1={(L + R) / 2 + 30 * broken} y1={150} x2={R - 130} y2={150} stroke={LINE} strokeWidth={8} strokeLinecap="round" strokeDasharray="2 18" />
              </svg>
              {/* leadership node */}
              <div style={{ position: 'absolute', left: L - 110, top: 40, width: 220, textAlign: 'center', ...enter(t, 16.4, { y: 20 }) }}>
                <div style={{ width: 220, height: 220, borderRadius: '50%', background: INK, display: 'grid', placeItems: 'center' }}>
                  <Person size={110} color="#fff" />
                </div>
                <div className="kit-ui" style={{ fontSize: 28, fontWeight: 700, marginTop: 18 }}>Leadership</div>
              </div>
              {/* employees cluster */}
              <div style={{ position: 'absolute', left: R - 130, top: 40, width: 300, textAlign: 'center', ...enter(t, 16.6, { y: 20 }) }}>
                <div style={{ height: 220, display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center', gap: 6 }}>
                  {Array.from({ length: 9 }).map((_, i) => (
                    <Person key={i} size={78} color={t > 19.2 ? '#D6D6CF' : '#C9C9C2'} />
                  ))}
                </div>
                <div className="kit-ui" style={{ fontSize: 28, fontWeight: 700, marginTop: 18 }}>Employees</div>
              </div>
              {/* the message envelope */}
              <div
                style={{
                  position: 'absolute',
                  left: msgX - 44,
                  top: 116 + fall * 180,
                  opacity: prog(t, 16.9, 0.2) * (1 - fall),
                  transform: `rotate(${fall * 40}deg)`,
                }}
              >
                <svg width="88" height="68" viewBox="0 0 88 68">
                  <rect x="3" y="3" width="82" height="62" rx="10" fill={LIME_SOFT} stroke={GREEN} strokeWidth="4" />
                  <path d="M6 8l38 28L82 8" fill="none" stroke={GREEN} strokeWidth="4" strokeLinejoin="round" />
                </svg>
              </div>
              {/* break marker */}
              <div style={{ position: 'absolute', left: (L + R) / 2 - 30, top: 120, ...enter(t, 18.4, { y: 0, scale: 0.4, easing: BACK }) }}>
                <svg width="60" height="60" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill={ORANGE} />
                  <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 3 — Zapier: almost everyone uses AI daily */}
      <Scene t={t} index={2}>
        <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 22.0, { y: 14 })}>One company, real progress</div>
            <div className="kit-h1" style={{ fontSize: 150, ...enter(t, 24.24, { dur: 0.8, y: 40, easing: BACK }) }}>Zapier</div>
            <p className="kit-body" style={{ fontSize: 44, marginTop: 30, ...enter(t, 25.2, { y: 16 }) }}>
              Almost everyone uses AI <span className="kit-mark" style={markStyle(t, 27.44)}>every day.</span>
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 12, ...enter(t, 22.4, { y: 20 }) }}>
            {Array.from({ length: 100 }).map((_, i) => {
              const row = Math.floor(i / 10);
              const col = i % 10;
              const holdout = [37, 72, 95].includes(i);
              const on = !holdout && prog(t, 25.3 + (row + col) * 0.07, 0.25) > 0.5;
              return <Person key={i} size={70} color={on ? LIME : '#E2E2DC'} />;
            })}
          </div>
        </div>
      </Scene>

      {/* 4 — Four things combined */}
      <Scene t={t} index={3}>
        <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 80, alignItems: 'center' }}>
          <div className="kit-card" style={{ padding: '44px 40px', background: PAPER, ...enter(t, 28.9, { y: 30 }) }}>
            <div className="kit-ui" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.14em', color: MUTED }}>OUR INTERVIEW</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 26 }}>
              <Img
                src={img('brandon-sammut')}
                style={{ width: 150, height: 150, borderRadius: '50%', border: `5px solid ${LIME}`, objectFit: 'cover', flex: 'none', ...enter(t, 29.4, { scale: 0.7, y: 0, easing: BACK }) }}
              />
              <div style={enter(t, 30.72, { x: -20, y: 0 })}>
                <div className="kit-h3" style={{ fontSize: 44 }}>Brandon Sammut</div>
                <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 6, lineHeight: 1.35 }}>Former Chief People Officer, Zapier</div>
              </div>
            </div>
            <div className="kit-ui" style={{ fontSize: 30, marginTop: 40, lineHeight: 1.4, ...enter(t, 32.08, { y: 12 }) }}>
              How Zapier combined <span className="kit-mark" style={markStyle(t, 33.92)}>four things</span>:
            </div>
          </div>
          {(() => {
            const items = [
              { w: 'Leadership commitment', icon: 'flag', at: 35.28 },
              { w: 'Hands-on experimentation', icon: 'flask', at: 36.8 },
              { w: 'Internal champions', icon: 'star', at: 38.8 },
              { w: 'Redesigned workflows', icon: 'flow', at: 40.24 },
            ];
            const lock = prog(t, 41.1, 0.6, IN_OUT);
            return (
              <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: lerp(28, 0, lock) }}>
                {items.map((x, i) => (
                  <div
                    key={x.w}
                    className="kit-card kit-ui"
                    style={{
                      height: 250,
                      padding: '32px 32px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      borderColor: lock > 0.5 ? GREEN : LINE,
                      background: lock > 0.5 ? LIME_SOFT : '#fff',
                      borderRadius: lock > 0.5 ? [`22px 0 0 0`, `0 22px 0 0`, `0 0 0 22px`, `0 0 22px 0`][i] : 22,
                      ...enter(t, x.at, { scale: 0.7, y: 0, dur: 0.6, easing: BACK }),
                    }}
                  >
                    <Icon name={x.icon} size={60} />
                    <div style={{ fontSize: 34, fontWeight: 600, lineHeight: 1.2 }}>{x.w}</div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 5 — Results */}
      <Scene t={t} index={4}>
        <div className="kit-label" style={enter(t, 42.3, { y: 14 })}>Zapier support team</div>
        <div className="kit-h2" style={enter(t, 42.3, { dur: 0.8, y: 30 })}>The results speak for themselves.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 40, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ padding: '40px 44px', ...enter(t, 44.48, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Icon name="clock" size={48} color={INK} />
              <div style={{ fontSize: 32, fontWeight: 600 }}>Average ticket handling time</div>
            </div>
            {(() => {
              const p = prog(t, 46.9, 1.0, IN_OUT);
              return (
                <div style={{ marginTop: 40 }}>
                  {[
                    ['Before', 1, '#D6D6CF'],
                    ['After', lerp(1, 0.5, p), LIME],
                  ].map(([lbl, w, c]) => (
                    <div key={lbl as string} style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 18 }}>
                      <span style={{ width: 100, fontSize: 24, color: MUTED, fontWeight: 600 }}>{lbl as string}</span>
                      <div style={{ height: 50, borderRadius: 12, width: 640 * (w as number), background: c as string }} />
                    </div>
                  ))}
                  <div className="kit-h2" style={{ fontSize: 64, marginTop: 28, color: GREEN, ...enter(t, 47.44, { y: 0, scale: 0.7, easing: BACK }) }}>
                    Cut in half
                  </div>
                </div>
              );
            })()}
          </div>
          <div className="kit-card kit-ui" style={{ padding: '40px 44px', ...enter(t, 48.08, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <Icon name="heart" size={48} color={INK} />
              <div style={{ fontSize: 32, fontWeight: 600 }}>Customer satisfaction</div>
            </div>
            <svg width="100%" height="150" viewBox="0 0 520 150" style={{ marginTop: 40 }}>
              <line x1="0" y1="75" x2="520" y2="75" stroke={LINE} strokeWidth="3" strokeDasharray="8 10" />
              <path
                d="M0 72 C60 66 100 80 160 74 S260 66 320 76 S420 70 520 72"
                fill="none"
                stroke={GREEN}
                strokeWidth="7"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray="1 1"
                strokeDashoffset={1 - prog(t, 48.4, 1.2, IN_OUT)}
              />
            </svg>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 30, ...enter(t, 49.36, { y: 0, scale: 0.7, easing: BACK }) }}>
              <Check size={44} />
              <span className="kit-h2" style={{ fontSize: 56 }}>Maintained</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 6 — What makes it stick? */}
      <Scene t={t} index={5}>
        <div className="kit-label" style={enter(t, 51.2, { y: 14 })}>Lessons from Zapier</div>
        <div className="kit-h1" style={{ fontSize: 96, maxWidth: 1500, ...enter(t, 51.3, { dur: 0.9, y: 34 }) }}>
          What makes AI transformation <span className="kit-mark" style={markStyle(t, 55.76)}>stick?</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 90 }}>
          {['Start by listening', 'Build a Champions network', 'Let employees shape it', 'Measure and adapt'].map((w, i) => (
            <div key={w} className="kit-card kit-ui" style={{ padding: '30px 30px', height: 210, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...enter(t, 56.3 + i * 0.32, { y: 40, easing: BACK }) }}>
              <span style={{ width: 60, height: 60, borderRadius: 16, background: LIME_SOFT, color: GREEN, fontWeight: 800, fontSize: 30, display: 'grid', placeItems: 'center' }}>{i + 1}</span>
              <span style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2 }}>{w}</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 7 — Step 1: Start by listening */}
      <Scene t={t} index={6}>
        <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <StepBadge t={t} at={58.2} n="1" />
            <div className="kit-h1" style={enter(t, 58.4, { dur: 0.9, y: 34 })}>
              Start by <span className="kit-mark" style={markStyle(t, 59.6)}>listening.</span>
            </div>
            <p className="kit-body" style={{ marginTop: 40, fontSize: 38, ...enter(t, 60.64, { y: 16 }) }}>
              Understand where people are <span className="kit-mark" style={markStyle(t, 62.72)}>before</span> deciding what they need.
            </p>
            {/* listening waveform */}
            <svg width="560" height="90" viewBox="0 0 560 90" style={{ marginTop: 50, ...enter(t, 61.0, { y: 0 }) }}>
              {Array.from({ length: 40 }).map((_, i) => {
                const h = 10 + Math.abs(Math.sin(i * 0.9 + t * 4)) * 60 * (0.4 + 0.6 * Math.abs(Math.sin(i * 0.37)));
                return <rect key={i} x={i * 14} y={45 - h / 2} width="8" height={h} rx="4" fill={i % 5 === 0 ? GREEN : LIME} opacity={0.85} />;
              })}
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              ['Usage', 'How are they using AI today?', 65.12],
              ['Skills', 'What skills do they have?', 67.2],
              ['Frustrations', 'Which workflows frustrate them?', 68.92],
              ['Worries', 'What worries them?', 71.12],
            ].map(([tag, q, at], i) => (
              <div
                key={tag as string}
                className="kit-card kit-ui"
                style={{
                  padding: '26px 32px',
                  marginLeft: i % 2 ? 70 : 0,
                  borderRadius: i % 2 ? '22px 22px 6px 22px' : '22px 22px 22px 6px',
                  background: i === 3 ? '#FFF6EF' : '#fff',
                  borderColor: i === 3 ? '#F3D3BE' : LINE,
                  ...enter(t, at as number, { x: i % 2 ? 40 : -40, y: 0, easing: BACK }),
                }}
              >
                <span className="kit-tag" style={{ fontSize: 15, background: i === 3 ? '#F9DCC8' : LIME_SOFT }}>{tag as string}</span>
                <div style={{ fontSize: 36, fontWeight: 600, marginTop: 12 }}>{q as string}</div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 8 — The Four Forces */}
      <Scene t={t} index={7}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="kit-label" style={enter(t, 73.0, { y: 14 })}>A framework from Phil Kirschner</div>
            <div className="kit-h2" style={enter(t, 76.7, { dur: 0.8, y: 30 })}>
              The <span className="kit-mark" style={markStyle(t, 77.28)}>Four Forces</span>
            </div>
          </div>
          <div className="kit-ui" style={{ fontSize: 26, color: MUTED, textAlign: 'right', maxWidth: 640, ...enter(t, 88.32, { y: 10 }) }}>
            Listening shows what moves people <b style={{ color: GREEN }}>forward</b>, and what <b style={{ color: ORANGE }}>holds them back</b>.
          </div>
        </div>
        {(() => {
          const W = 1760;
          const H = 600;
          const pPush = prog(t, 80.48, 0.8, IN_OUT);
          const pPull = prog(t, 82.32, 0.8, IN_OUT);
          const pAnx = prog(t, 84.64, 0.8, IN_OUT);
          const pHab = prog(t, 85.68, 0.8, IN_OUT);
          const fwd = prog(t, 91.0, 0.5) * (1 - prog(t, 92.2, 0.4));
          const back = prog(t, 92.3, 0.5);
          const puckX = W / 2 + 150 * pPush + 150 * pPull - 120 * pAnx - 120 * pHab + Math.sin(t * 9) * 6 * pHab;
          const lbl = (txt: string, sub: string, x: number, y: number, at: number, color: string, align: 'left' | 'right') => (
            <div className="kit-ui" style={{ position: 'absolute', left: align === 'left' ? x : undefined, right: align === 'right' ? W - x : undefined, top: y, textAlign: align, ...enter(t, at, { y: 10 }) }}>
              <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: '.14em', color }}>{sub}</div>
              <div style={{ fontSize: 34, fontWeight: 600, marginTop: 4 }}>{txt}</div>
            </div>
          );
          return (
            <div style={{ position: 'relative', width: W, height: H, marginTop: 30 }}>
              <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
                {/* track */}
                <line x1={60} y1={300} x2={W - 60} y2={300} stroke={LINE} strokeWidth={6} strokeLinecap="round" opacity={prog(t, 73.2, 0.6)} />
                <ForceArrow x1={170} x2={640} y={190} p={pPush} color={GREEN} glow={fwd} />
                <ForceArrow x1={1120} x2={1590} y={190} p={pPull} color={GREEN} glow={fwd} />
                <ForceArrow x1={1590} x2={1120} y={420} p={pAnx} color={ORANGE} glow={back} />
                <ForceArrow x1={640} x2={170} y={420} p={pHab} color={ORANGE} glow={back} />
              </svg>
              <div className="kit-ui" style={{ position: 'absolute', left: 60, top: 316, fontSize: 20, fontWeight: 700, letterSpacing: '.12em', color: MUTED, ...enter(t, 73.4, { y: 0 }) }}>TODAY</div>
              <div className="kit-ui" style={{ position: 'absolute', right: 60, top: 316, fontSize: 20, fontWeight: 700, letterSpacing: '.12em', color: MUTED, ...enter(t, 73.4, { y: 0 }) }}>BETTER FUTURE</div>
              {lbl('Frustration with today’s work', 'PUSH', 170, 70, 80.48, GREEN, 'left')}
              {lbl('Excitement about a better future', 'PULL', 1590, 70, 82.32, GREEN, 'right')}
              {lbl('Anxiety about the new', 'ANXIETY', 1590, 460, 84.64, ORANGE, 'right')}
              {lbl('Established habits', 'HABIT', 170, 460, 85.68, ORANGE, 'left')}
              {/* the change puck */}
              <div
                style={{
                  position: 'absolute',
                  left: puckX - 95,
                  top: 205,
                  width: 190,
                  height: 190,
                  borderRadius: '50%',
                  background: INK,
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 18px 40px rgba(0,0,0,.18)',
                  ...enter(t, 78.48, { scale: 0.5, y: 0, easing: BACK }),
                }}
              >
                <span className="kit-ui" style={{ color: '#fff', fontSize: 30, fontWeight: 700 }}>Change</span>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 9 — How to listen, keep listening */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={enter(t, 93.9, { y: 14 })}>How to listen</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {[
            ['mic', 'Interviews', 94.0],
            ['survey', 'Surveys', 94.96],
            ['chat', 'Conversations about real work', 95.76],
          ].map(([icon, w, at]) => (
            <div key={w as string} className="kit-card kit-ui" style={{ padding: '36px 36px', height: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...enter(t, at as number, { y: 40, easing: BACK }) }}>
              <Icon name={icon as string} size={70} />
              <div style={{ fontSize: 38, fontWeight: 600, lineHeight: 1.15 }}>{w as string}</div>
            </div>
          ))}
        </div>
        {(() => {
          const W = 1760;
          const run = prog(t, 98.6, 3.6, Easing.linear);
          const pulses = [0.12, 0.34, 0.56, 0.78, 0.96];
          return (
            <div style={{ position: 'relative', height: 220, marginTop: 70, ...enter(t, 98.28, { y: 20 }) }}>
              <div className="kit-h3" style={{ fontSize: 46 }}>
                <span className="kit-mark" style={markStyle(t, 98.48)}>Keep listening</span> as the transformation progresses.
              </div>
              <svg width={W} height={110} style={{ position: 'absolute', left: 0, top: 100, overflow: 'visible' }}>
                <line x1={0} y1={55} x2={W} y2={55} stroke={LINE} strokeWidth={6} strokeLinecap="round" />
                <line x1={0} y1={55} x2={W * run} y2={55} stroke={LIME} strokeWidth={6} strokeLinecap="round" />
                {pulses.map((px) => {
                  const hit = run >= px;
                  const ripple = hit ? ((t - (98.6 + px * 3.6)) % 1.6) / 1.6 : 0;
                  return (
                    <g key={px}>
                      {hit && <circle cx={W * px} cy={55} r={18 + ripple * 34} fill="none" stroke={LIME} strokeWidth={3} opacity={1 - ripple} />}
                      <circle cx={W * px} cy={55} r={16} fill={hit ? GREEN : '#fff'} stroke={hit ? GREEN : LINE} strokeWidth={4} />
                    </g>
                  );
                })}
              </svg>
            </div>
          );
        })()}
      </Scene>

      {/* 10 — Step 2: Network of AI Champions */}
      <Scene t={t} index={9}>
        <div style={{ display: 'grid', gridTemplateColumns: '640px 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <StepBadge t={t} at={102.75} n="2" />
            <div className="kit-h2" style={enter(t, 102.9, { dur: 0.8, y: 30 })}>
              Build a network of <span className="kit-mark" style={markStyle(t, 104.8)}>AI Champions.</span>
            </div>
            <p className="kit-body" style={{ marginTop: 30, fontSize: 32, ...enter(t, 108.16, { y: 14 }) }}>
              Employees with <b>proven AI skills</b> who:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
              {[
                ['Help colleagues learn', 112.48],
                ['Redesign workflows', 113.24],
                ['Spot new opportunities', 114.8],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 600, ...enter(t, at as number, { x: -24, y: 0 }) }}>
                  <Check size={36} /> {w as string}
                </div>
              ))}
            </div>
          </div>
          {(() => {
            const W = 1000;
            const H = 660;
            const champs = [
              [210, 190],
              [520, 120],
              [820, 230],
              [330, 470],
              [720, 500],
            ];
            const angles = [0, 72, 144, 216, 288];
            const prog1 = prog(t, 106.2, 0.8, IN_OUT);
            const teach = t >= 112.48 ? ((t - 112.48) % 1.4) / 1.4 : -1;
            return (
              <div style={{ position: 'relative', width: W, height: H }}>
                {/* structured program frame */}
                <div
                  className="kit-ui"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: `4px dashed ${GREEN}`,
                    borderRadius: 34,
                    opacity: prog1,
                    transform: `scale(${lerp(1.06, 1, prog1)})`,
                  }}
                >
                  <span className="kit-tag" style={{ position: 'absolute', left: 30, top: -18, background: GREEN, color: '#fff' }}>Champions program</span>
                </div>
                <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
                  {/* champion-to-champion links */}
                  {[
                    [0, 1],
                    [1, 2],
                    [0, 3],
                    [3, 4],
                    [2, 4],
                    [1, 3],
                  ].map(([a, b], i) => {
                    const p = prog(t, 104.0 + i * 0.15, 0.6, IN_OUT);
                    const [x1, y1] = champs[a];
                    const [x2, y2] = champs[b];
                    return <line key={i} x1={x1} y1={y1} x2={lerp(x1, x2, p)} y2={lerp(y1, y2, p)} stroke={LIME} strokeWidth={5} opacity={0.7} />;
                  })}
                  {champs.map(([cx, cy], ci) =>
                    angles.map((a, k) => {
                      const r = 105;
                      const ang = ((a + ci * 23) * Math.PI) / 180;
                      const x = cx + Math.cos(ang) * r;
                      const y = cy + Math.sin(ang) * r;
                      const p = prog(t, 103.68 + ci * 0.12 + k * 0.05, 0.4);
                      return (
                        <g key={`${ci}-${k}`} opacity={p}>
                          <line x1={cx} y1={cy} x2={x} y2={y} stroke="#DADAD3" strokeWidth={3} />
                          {teach >= 0 && <circle cx={lerp(cx, x, teach)} cy={lerp(cy, y, teach)} r={6} fill={GREEN} />}
                          <circle cx={x} cy={y} r={20} fill={t > 113.5 && (k + ci) % 2 === 0 ? LIME_SOFT : '#EDEDE7'} stroke="#C9C9C2" strokeWidth={2} />
                        </g>
                      );
                    }),
                  )}
                </svg>
                {champs.map(([cx, cy], ci) => (
                  <div
                    key={ci}
                    style={{
                      position: 'absolute',
                      left: cx - 44,
                      top: cy - 44,
                      width: 88,
                      height: 88,
                      borderRadius: '50%',
                      background: prog(t, 104.8 + ci * 0.12, 0.3) > 0.5 ? LIME : '#C9C9C2',
                      border: '5px solid #fff',
                      boxShadow: '0 8px 20px rgba(0,0,0,.12)',
                      display: 'grid',
                      placeItems: 'center',
                      ...enter(t, 103.5 + ci * 0.1, { scale: 0.4, y: 0, easing: BACK }),
                    }}
                  >
                    <Icon name="star" size={44} color="#fff" />
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 11 — Citi + PwC Netherlands */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={enter(t, 116.8, { y: 14 })}>Champions at scale</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 10 }}>
          <div className="kit-card kit-ui" style={{ padding: '44px 48px', height: 600, display: 'flex', flexDirection: 'column', ...enter(t, 116.88, { y: 30 }) }}>
            <div className="kit-h3" style={{ fontSize: 56 }}>Citi</div>
            <div className="kit-h1" style={{ fontSize: 170, color: GREEN, marginTop: 30, letterSpacing: '-0.05em' }}>
              {Math.round(4000 * prog(t, 117.7, 1.1, IN_OUT)).toLocaleString('en-US')}+
            </div>
            <div style={{ fontSize: 40, fontWeight: 600, ...enter(t, 119.28, { y: 12 }) }}>AI Accelerators</div>
            <div style={{ fontSize: 28, color: MUTED, marginTop: 'auto', ...enter(t, 120.04, { y: 12 }) }}>supporting adoption across the organization</div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '44px 48px', height: 600, display: 'flex', flexDirection: 'column', ...enter(t, 122.88, { y: 30 }) }}>
            <div className="kit-h3" style={{ fontSize: 56 }}>PwC Netherlands</div>
            {(() => {
              const scan = prog(t, 127.5, 1.8, IN_OUT);
              const lensX = lerp(40, 600, scan);
              const lensY = 90 + Math.sin(scan * Math.PI * 2) * 50;
              return (
                <div style={{ position: 'relative', height: 250, marginTop: 30, ...enter(t, 125.6, { y: 12 }) }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: 8 }}>
                    {Array.from({ length: 64 }).map((_, i) => {
                      const champ = [5, 18, 27, 40, 45, 58].includes(i);
                      const x = (i % 16) * 46 + 18;
                      const found = champ && scan * 720 > x;
                      return <Person key={i} size={38} color={found ? LIME : '#DADAD3'} />;
                    })}
                  </div>
                  <svg width="110" height="110" viewBox="0 0 24 24" style={{ position: 'absolute', left: lensX - 40, top: lensY - 40, opacity: prog(t, 127.6, 0.3) * (1 - prog(t, 129.4, 0.3)) }}>
                    <circle cx="10" cy="10" r="6.5" fill="rgba(208,248,171,.35)" stroke={INK} strokeWidth="1.8" />
                    <path d="M15 15l5.5 5.5" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </div>
              );
            })()}
            <div style={{ fontSize: 34, fontWeight: 600, ...enter(t, 125.92, { y: 12 }) }}>A network reaching thousands</div>
            <div style={{ fontSize: 28, color: MUTED, marginTop: 'auto', ...enter(t, 127.68, { y: 12 }) }}>
              Champions found through <span className="kit-mark" style={{ ...markStyle(t, 127.9), color: INK }}>people analytics</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 12 — Appointing isn't enough */}
      <Scene t={t} index={11}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 820px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 129.9, { dur: 0.8, y: 30 })}>
              Appointing Champions <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>isn’t enough.<span style={{ position: 'absolute', left: 0, bottom: -6, height: 6, background: ORANGE, width: `${prog(t, 131.12, 0.6, IN_OUT) * 100}%` }} /></span>
            </div>
            {(() => {
              const fill = prog(t, 132.92, 0.6) / 3 + prog(t, 134.08, 0.6) / 3 + prog(t, 135.36, 0.6) / 3;
              const C = 2 * Math.PI * 130;
              return (
                <div style={{ position: 'relative', width: 320, height: 320, marginTop: 50, ...enter(t, 130.2, { scale: 0.7, y: 0, easing: BACK }) }}>
                  <svg width="320" height="320" style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}>
                    <circle cx="160" cy="160" r="130" fill="none" stroke="#EDEDE7" strokeWidth="22" />
                    <circle cx="160" cy="160" r="130" fill="none" stroke={LIME} strokeWidth="22" strokeLinecap="round" strokeDasharray={`${C * fill} ${C}`} />
                  </svg>
                  <div style={{ position: 'absolute', inset: 50, borderRadius: '50%', background: fill > 0.99 ? LIME_SOFT : PAPER, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                    <div>
                      <Icon name="star" size={70} color={fill > 0.99 ? GREEN : '#B9B9B0'} />
                      <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: fill > 0.99 ? GREEN : MUTED, marginTop: 6 }}>CHAMPION</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
          <div>
            <div className="kit-label" style={enter(t, 132.32, { y: 14 })}>Give them</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                ['cap', 'Advanced training', '', 132.92],
                ['clock', 'Dedicated time', '', 134.08],
                ['team', 'Real responsibility', 'for supporting their teams', 135.36],
              ].map(([icon, w, sub, at]) => (
                <div key={w as string} className="kit-card kit-ui" style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 26, ...enter(t, at as number, { x: 40, y: 0, easing: BACK }) }}>
                  <div style={{ width: 84, height: 84, borderRadius: 22, background: LIME_SOFT, display: 'grid', placeItems: 'center', flex: 'none' }}>
                    <Icon name={icon as string} size={50} />
                  </div>
                  <div>
                    <div style={{ fontSize: 38, fontWeight: 600 }}>{w as string}</div>
                    {sub && <div style={{ fontSize: 26, color: MUTED, marginTop: 4, ...enter(t, 136.8, { y: 8 }) }}>{sub as string}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 13 — Step 3: Let employees shape the change */}
      <Scene t={t} index={12}>
        <div style={{ display: 'grid', gridTemplateColumns: '700px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <StepBadge t={t} at={139.75} n="3" />
            <div className="kit-h1" style={{ fontSize: 96, ...enter(t, 139.9, { dur: 0.9, y: 34 }) }}>
              Let employees <span className="kit-mark" style={markStyle(t, 141.36)}>shape the change.</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 44 }}>
              <span className="kit-pill" style={{ background: t >= 143.96 && t < 144.4 ? LIME_SOFT : '#fff', ...enter(t, 143.96, { y: 12, easing: BACK }) }}>Build</span>
              <span className="kit-pill" style={{ background: t >= 144.4 ? LIME_SOFT : '#fff', ...enter(t, 144.4, { y: 12, easing: BACK }) }}>Test</span>
            </div>
          </div>
          {(() => {
            // a shared workflow canvas being co-built by several people
            const cursors = [
              { c: GREEN, n: 'Analyst', path: [[120, 120], [430, 180], [300, 380]] },
              { c: '#2F80ED', n: 'Nurse', path: [[620, 90], [560, 330], [700, 420]] },
              { c: '#B05CE0', n: 'Advisor', path: [[200, 470], [520, 470], [420, 250]] },
            ];
            const blocks = [
              { x: 90, y: 70, w: 260, at: 142.9 },
              { x: 430, y: 70, w: 300, at: 143.5 },
              { x: 260, y: 230, w: 300, at: 144.0 },
              { x: 90, y: 390, w: 260, at: 144.5 },
              { x: 430, y: 390, w: 300, at: 145.0 },
            ];
            return (
              <div className="kit-card" style={{ position: 'relative', height: 600, background: PAPER, overflow: 'hidden', ...enter(t, 140.5, { y: 30 }) }}>
                <div className="kit-ui" style={{ position: 'absolute', left: 30, top: 24, fontSize: 18, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>NEW WORKFLOW · DRAFT</div>
                {blocks.map((b, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      left: b.x,
                      top: b.y + 50,
                      width: b.w,
                      height: 90,
                      borderRadius: 16,
                      background: '#fff',
                      border: `3px solid ${t > 145.4 ? GREEN : LINE}`,
                      padding: '18px 22px',
                      boxSizing: 'border-box',
                      ...enter(t, b.at, { scale: 0.6, y: 0, easing: BACK }),
                    }}
                  >
                    <div style={{ height: 12, borderRadius: 6, background: '#D9D9D2', width: '70%' }} />
                    <div style={{ height: 10, borderRadius: 6, background: '#ECECE6', width: '45%', marginTop: 14 }} />
                    {t > 145.4 && (
                      <div style={{ position: 'absolute', right: -14, top: -14, ...enter(t, 145.4 + i * 0.15, { scale: 0.4, y: 0, easing: BACK }) }}>
                        <Check size={34} />
                      </div>
                    )}
                  </div>
                ))}
                {cursors.map((cu, i) => {
                  const seg = Math.max(0, (t - 141.0 - i * 0.3) / 2.0);
                  const k = Math.min(cu.path.length - 2, Math.floor(seg));
                  const f = IN_OUT(Math.min(1, seg - k));
                  const a = cu.path[k];
                  const b = cu.path[k + 1];
                  return (
                    <div key={cu.n} style={{ position: 'absolute', left: lerp(a[0], b[0], f), top: lerp(a[1], b[1], f) + 50, opacity: prog(t, 141.0 + i * 0.3, 0.3) }}>
                      <svg width="34" height="34" viewBox="0 0 24 24">
                        <path d="M3 2l15.5 9.2-6.6 1.4 3.8 7.3-2.9 1.5-3.8-7.3-4.9 4.6z" fill={cu.c} stroke="#fff" strokeWidth="1.4" />
                      </svg>
                      <span className="kit-ui" style={{ position: 'absolute', left: 26, top: 26, background: cu.c, color: '#fff', fontSize: 17, fontWeight: 700, padding: '3px 10px', borderRadius: 8 }}>{cu.n}</span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 14 — Arizona State University */}
      <Scene t={t} index={13}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 70, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 147.4, { y: 14 })}>Arizona State University</div>
            <div className="kit-h2" style={{ fontSize: 64, ...enter(t, 149.36, { dur: 0.8, y: 30 }) }}>
              Faculty and staff proposed <span className="kit-mark" style={markStyle(t, 150.76)}>their own</span> AI applications.
            </div>
            {/* idea wall */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 10, marginTop: 50 }}>
              {Array.from({ length: 48 }).map((_, i) => {
                const at = 150.3 + ((i * 37) % 48) * 0.045;
                const live = t >= 153.84 + ((i * 13) % 48) * 0.022;
                return (
                  <div
                    key={i}
                    style={{
                      height: 52,
                      borderRadius: 8,
                      background: live ? LIME : ['#FFF3B8', '#FFE1CC', '#DCEBFF', '#EADCF8'][i % 4],
                      transform: `rotate(${((i * 7) % 9) - 4}deg)`,
                      ...enter(t, at, { scale: 0.3, y: 0, dur: 0.35, easing: BACK }),
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '44px 48px', ...enter(t, 152.6, { y: 30 }) }}>
            <div style={{ fontSize: 26, color: MUTED, fontWeight: 600 }}>Around</div>
            <div className="kit-h1" style={{ fontSize: 200, color: GREEN, lineHeight: 1 }}>{Math.round(200 * prog(t, 152.9, 1.4, IN_OUT))}</div>
            <div style={{ fontSize: 40, fontWeight: 600, ...enter(t, 153.84, { y: 10 }) }}>projects went live</div>
            <div style={{ marginTop: 40, ...enter(t, 154.96, { y: 10 }) }}>
              <div style={{ display: 'flex', gap: 6 }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 26, borderRadius: 6, background: prog(t, 155.0 + i * 0.12, 0.2) > 0.5 ? LIME : '#EDEDE7' }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 22, color: MUTED, fontWeight: 600 }}>
                <span>Month 1</span>
                <span>within 8 months</span>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 15 — Kaiser Permanente */}
      <Scene t={t} index={14}>
        <div className="kit-label" style={enter(t, 156.7, { y: 14 })}>Kaiser Permanente</div>
        <div className="kit-h2" style={enter(t, 158.0, { dur: 0.8, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 158.56)}>Clinicians tested</span> AI documentation tools first.
        </div>
        {(() => {
          const stages = [
            { n: 'AI documentation tool', sub: 'Ready to try', icon: 'survey', at: 159.6 },
            { n: 'Clinicians test it', sub: 'Real work, real feedback', icon: 'team', at: 158.6 },
            { n: 'Wider rollout', sub: 'After testing', icon: 'flag', at: 161.68 },
          ];
          const tok = prog(t, 159.0, 1.2, IN_OUT) * 0.5 + prog(t, 161.5, 1.0, IN_OUT) * 0.5;
          return (
            <div style={{ position: 'relative', marginTop: 80 }}>
              <svg width="1760" height="40" style={{ position: 'absolute', left: 0, top: 130 }}>
                <line x1="290" y1="20" x2="1470" y2="20" stroke={LINE} strokeWidth="6" strokeDasharray="4 14" strokeLinecap="round" />
                <circle cx={lerp(290, 1470, tok)} cy="20" r="16" fill={GREEN} opacity={prog(t, 159.0, 0.3)} />
              </svg>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 80 }}>
                {stages.map((s, i) => {
                  const active = (i === 1 && t >= 159.6 && t < 161.68) || (i === 2 && t >= 162.3);
                  return (
                    <div
                      key={s.n}
                      className="kit-card kit-ui"
                      style={{
                        position: 'relative',
                        padding: '34px 34px',
                        height: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderColor: active ? GREEN : LINE,
                        background: active ? LIME_SOFT : '#fff',
                        ...enter(t, i === 0 ? 156.9 : s.at, { y: 30, easing: BACK }),
                      }}
                    >
                      <Icon name={s.icon} size={64} />
                      <div>
                        <div style={{ fontSize: 36, fontWeight: 600 }}>{s.n}</div>
                        <div style={{ fontSize: 24, color: MUTED, marginTop: 6 }}>{s.sub}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 16 — Managers clear the path */}
      <Scene t={t} index={15}>
        <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 70, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 163.6, { y: 14 })}>The role of managers</div>
            <div className="kit-h2" style={enter(t, 163.7, { dur: 0.8, y: 30 })}>
              Managers are <span className="kit-mark" style={markStyle(t, 164.6)}>essential.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 50 }}>
              {[
                ['clock', 'Make time for experimentation', 166.2],
                ['path', 'Remove obstacles', 168.32],
                ['shield', 'Address concerns about how roles will evolve', 169.68],
              ].map(([icon, w, at]) => (
                <div key={w as string} className="kit-card kit-ui" style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 22, ...enter(t, at as number, { x: -30, y: 0, easing: BACK }) }}>
                  <Icon name={icon as string} size={48} />
                  <span style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2 }}>{w as string}</span>
                </div>
              ))}
            </div>
          </div>
          {(() => {
            const W = 920;
            const clear = [prog(t, 168.6, 0.6, Easing.in(Easing.quad)), prog(t, 168.9, 0.6, Easing.in(Easing.quad)), prog(t, 169.2, 0.6, Easing.in(Easing.quad))];
            const walk = prog(t, 170.2, 2.2, IN_OUT);
            const obs = [250, 450, 650];
            return (
              <div style={{ position: 'relative', width: W, height: 520, ...enter(t, 164.0, { y: 30 }) }}>
                <svg width={W} height={520} style={{ position: 'absolute', inset: 0 }}>
                  <path d="M60 400 C 260 400, 300 260, 460 260 S 700 120, 860 120" fill="none" stroke="#EDEDE7" strokeWidth="56" strokeLinecap="round" />
                  <path d="M60 400 C 260 400, 300 260, 460 260 S 700 120, 860 120" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="18 18" />
                </svg>
                {/* obstacles */}
                {obs.map((x, i) => {
                  const y = [330, 250, 168][i];
                  return (
                    <div
                      key={x}
                      style={{
                        position: 'absolute',
                        left: x - 40,
                        top: y - 40 + clear[i] * 320,
                        width: 80,
                        height: 80,
                        borderRadius: 14,
                        background: ORANGE,
                        opacity: 1 - clear[i],
                        transform: `rotate(${12 + clear[i] * 90}deg)`,
                        display: 'grid',
                        placeItems: 'center',
                        ...(t < 165 ? enter(t, 164.4 + i * 0.15, { scale: 0.4, y: 0, easing: BACK }) : {}),
                      }}
                    >
                      <span style={{ color: '#fff', fontSize: 44, fontWeight: 800, fontFamily: 'Public Sans' }}>!</span>
                    </div>
                  );
                })}
                {/* team marker walking the path */}
                {(() => {
                  // sample along an approximation of the bezier
                  const pts: [number, number][] = [
                    [60, 400],
                    [200, 392],
                    [330, 310],
                    [460, 260],
                    [600, 205],
                    [740, 140],
                    [860, 120],
                  ];
                  const s = walk * (pts.length - 1);
                  const k = Math.min(pts.length - 2, Math.floor(s));
                  const f = s - k;
                  const x = lerp(pts[k][0], pts[k + 1][0], f);
                  const y = lerp(pts[k][1], pts[k + 1][1], f);
                  return (
                    <div style={{ position: 'absolute', left: x - 36, top: y - 36, width: 72, height: 72, borderRadius: '50%', background: INK, display: 'grid', placeItems: 'center', ...enter(t, 164.6, { scale: 0.4, y: 0, easing: BACK }) }}>
                      <Icon name="team" size={44} color="#fff" />
                    </div>
                  );
                })()}
                <div className="kit-ui" style={{ position: 'absolute', right: 0, top: 30, textAlign: 'right', fontSize: 24, fontWeight: 700, color: GREEN, ...enter(t, 164.4, { y: 10 }) }}>NEW WAYS OF WORKING</div>
                <div className="kit-ui" style={{ position: 'absolute', left: 20, top: 450, fontSize: 24, fontWeight: 700, color: MUTED, ...enter(t, 164.4, { y: 10 }) }}>YOUR TEAM</div>
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 17 — Step 4: Measure both sides */}
      <Scene t={t} index={16}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 50 }}>
          <div>
            <StepBadge t={t} at={173.8} n="4" />
            <div className="kit-h2" style={enter(t, 174.0, { dur: 0.8, y: 30 })}>
              Measure progress. <span className="kit-mark" style={markStyle(t, 176.24)}>Keep adapting.</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, marginTop: 44 }}>
          {[
            {
              head: 'People',
              at: 178.08,
              rows: [
                { w: 'Capabilities improving', at: 181.52, kind: 'up' },
                { w: 'Concerns addressed', at: 183.16, kind: 'down' },
                { w: 'Redesigned workflows adopted', at: 185.44, kind: 'bar' },
              ],
            },
            {
              head: 'Business',
              at: 179.6,
              rows: [
                { w: 'Better quality', at: 190.0, kind: 'up' },
                { w: 'Faster service', at: 190.76, kind: 'up' },
                { w: 'Measurable value', at: 192.0, kind: 'bar' },
              ],
            },
          ].map((panel) => (
            <div key={panel.head} className="kit-card kit-ui" style={{ padding: '30px 36px', ...enter(t, panel.at, { y: 30 }) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, fontWeight: 800, letterSpacing: '.14em', color: GREEN }}>
                <Icon name={panel.head === 'People' ? 'team' : 'flow'} size={36} /> {panel.head.toUpperCase()}
              </div>
              {panel.rows.map((r) => {
                const p = prog(t, r.at, 1.0, IN_OUT);
                return (
                  <div key={r.w} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 0', borderTop: `2px solid ${LINE}`, marginTop: 16, ...enter(t, r.at - 0.1, { x: -20, y: 0 }) }}>
                    <span style={{ fontSize: 30, fontWeight: 600, flex: 1 }}>{r.w}</span>
                    <svg width="220" height="60" viewBox="0 0 220 60">
                      {r.kind === 'bar' ? (
                        <>
                          <rect x="0" y="22" width="220" height="18" rx="9" fill="#EDEDE7" />
                          <rect x="0" y="22" width={220 * 0.78 * p} height="18" rx="9" fill={LIME} />
                        </>
                      ) : (
                        <path
                          d={r.kind === 'up' ? 'M4 52 L50 44 L90 46 L130 30 L170 24 L214 8' : 'M4 10 L50 16 L90 14 L130 32 L170 38 L214 52'}
                          fill="none"
                          stroke={r.kind === 'up' ? GREEN : LIME}
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength={1}
                          strokeDasharray="1 1"
                          strokeDashoffset={1 - p}
                        />
                      )}
                    </svg>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Scene>

      {/* 18 — The feedback loop */}
      <Scene t={t} index={17}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 700px', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 193.6, { y: 14 })}>Keep adapting</div>
            <div className="kit-h2" style={enter(t, 193.7, { dur: 0.8, y: 30 })}>
              Let feedback show you <span className="kit-mark" style={markStyle(t, 198.56)}>what needs to change.</span>
            </div>
          </div>
          {(() => {
            const R = 250;
            const spin = (t - 193.5) * 30;
            const nodes = [
              { w: 'Employee listening', icon: 'mic', ang: -90, at: 193.92 },
              { w: 'Champion feedback', icon: 'star', ang: 30, at: 195.84 },
              { w: 'Adapt', icon: 'flow', ang: 150, at: 199.04 },
            ];
            return (
              <div style={{ position: 'relative', width: 700, height: 700 }}>
                <svg width="700" height="700" style={{ position: 'absolute', inset: 0 }}>
                  <circle cx="350" cy="350" r={R} fill="none" stroke={LIME} strokeWidth="8" strokeDasharray="30 22" transform={`rotate(${spin} 350 350)`} opacity={prog(t, 193.8, 0.6)} />
                </svg>
                {nodes.map((n) => {
                  const a = (n.ang * Math.PI) / 180;
                  return (
                    <div
                      key={n.w}
                      className="kit-card kit-ui"
                      style={{
                        position: 'absolute',
                        left: 350 + Math.cos(a) * R - 140,
                        top: 350 + Math.sin(a) * R - 70,
                        width: 280,
                        height: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        boxShadow: '0 12px 30px rgba(0,0,0,.08)',
                        ...enter(t, n.at, { scale: 0.5, y: 0, easing: BACK }),
                      }}
                    >
                      <Icon name={n.icon} size={44} />
                      <span style={{ fontSize: 26, fontWeight: 700, textAlign: 'center' }}>{n.w}</span>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 19 — No fixed finish line */}
      <Scene t={t} index={18}>
        <div className="kit-h2" style={{ ...enter(t, 200.0, { dur: 0.8, y: 30 }) }}>
          AI transformation has <span className="kit-mark" style={markStyle(t, 204.56)}>no fixed finish line.</span>
        </div>
        {(() => {
          const W = 1760;
          const sw = prog(t, 201.4, 1.4, IN_OUT);
          const loopT = Math.max(0, t - 203.3);
          return (
            <div style={{ position: 'relative', height: 520, marginTop: 50 }}>
              {/* software rollout lane */}
              <div style={{ position: 'absolute', left: 0, top: 0, width: W, ...enter(t, 200.4, { y: 20 }) }}>
                <div className="kit-ui" style={{ fontSize: 24, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>TRADITIONAL SOFTWARE ROLLOUT</div>
                <svg width={W} height={120} style={{ marginTop: 10 }}>
                  <line x1="20" y1="70" x2={W - 140} y2="70" stroke="#EDEDE7" strokeWidth="14" strokeLinecap="round" />
                  <line x1="20" y1="70" x2={lerp(20, W - 140, sw)} y2="70" stroke="#B9B9B0" strokeWidth="14" strokeLinecap="round" />
                  <g transform={`translate(${W - 120} 8)`}>
                    <line x1="0" y1="0" x2="0" y2="104" stroke={INK} strokeWidth="5" />
                    {[0, 1, 2].map((r) =>
                      [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={c * 18} y={r * 16} width="18" height="16" fill={(r + c) % 2 ? '#fff' : INK} stroke={INK} strokeWidth="1" />),
                    )}
                  </g>
                </svg>
                <div className="kit-ui" style={{ fontSize: 26, color: MUTED, textAlign: 'right', marginRight: 40, ...enter(t, 202.6, { y: 8 }) }}>Launch, then done.</div>
              </div>
              {/* AI transformation lane: a continuous loop */}
              <div style={{ position: 'absolute', left: 0, top: 250, width: W, ...enter(t, 203.28, { y: 20 }) }}>
                <div className="kit-ui" style={{ fontSize: 24, fontWeight: 800, letterSpacing: '.12em', color: GREEN }}>AI TRANSFORMATION</div>
                <svg width={W} height={220} style={{ marginTop: 10, overflow: 'visible' }}>
                  {(() => {
                    // a track that keeps looping forward, off the right edge
                    const d =
                      'M20 150 ' +
                      Array.from({ length: 6 })
                        .map((_, i) => {
                          const x = 20 + i * 330;
                          return `C ${x + 160} 150, ${x + 230} 20, ${x + 165} 20 S ${x + 170} 150, ${x + 330} 150`;
                        })
                        .join(' ');
                    return (
                      <>
                        <path d={d} fill="none" stroke={LIME_SOFT} strokeWidth="14" strokeLinecap="round" />
                        <path d={d} fill="none" stroke={LIME} strokeWidth="14" strokeLinecap="round" pathLength={1} strokeDasharray={`0.08 0.92`} strokeDashoffset={-((loopT * 0.12) % 1)} />
                      </>
                    );
                  })()}
                </svg>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 20 — Closing */}
      <Scene t={t} index={19} padStyle={{ opacity: 1 - prog(t, 217.1, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 206.4, { y: 14 })}>The goal</div>
        <div className="kit-h2" style={{ fontSize: 64, maxWidth: 1500, ...enter(t, 206.5, { dur: 0.8, y: 30 }) }}>
          An organization where people have
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
          {[
            ['The confidence', 209.44],
            ['The capabilities', 210.48],
            ['The support', 211.76],
          ].map(([w, at]) => (
            <span key={w as string} className="kit-pill" style={{ fontSize: 44, padding: '22px 40px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, at as number, { y: 30, scale: 0.8, easing: BACK }) }}>
              {w as string}
            </span>
          ))}
        </div>
        <div className="kit-h2" style={{ fontSize: 64, marginTop: 40, color: MUTED, ...enter(t, 212.64, { y: 20 }) }}>
          to keep improving how they work with AI.
        </div>
        <div className="kit-h1" style={{ fontSize: 150, marginTop: 30, ...enter(t, 215.5, { dur: 0.8, y: 40, easing: BACK }) }}>
          <span className="kit-mark" style={markStyle(t, 215.9)}>Together.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const AiChange: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={AI_CHANGE_TITLE_FRAMES}>
      <TitleCardGreen label="AI TRANSFORMATION" title="How to Make AI Change Actually Happen" />
    </Sequence>
    <Sequence from={AI_CHANGE_TITLE_FRAMES}>
      <AiChangeBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
