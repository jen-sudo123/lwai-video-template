import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
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
  clamp,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';
import { interpolate } from 'remotion';

loadSerif();
loadSans();

// AI for Email — custom concept composition (Lead with AI), built with the demo kit (src/kit).
// VO: audio/AiEmail.mp3 (Daan, ElevenLabs v4, take A with the 275-interruptions line cut), 199.9s of speech.
// Every cue is in SECONDS of the VO, from the Scribe word timestamps in src/data/AiEmail.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
//  #  scene                                  start   VO cue
//  1  Email eats the workday (inbox floods)   0.00   "Email remains one of the most time-consuming…"
//  2  117 emails a day (counter + grid)        4.56   "According to Microsoft's Work Trend Index…"
//  3  Email isn't just messaging (stamps)     12.98   "And for many of us, email isn't just messaging."
//  4  An unusually strong AI use case         23.90   "This is why email is such a powerful place…"
//  5  1 High volume (pile + load meter)       33.42   "First, it's high volume."
//  6  2 Highly repetitive (patterns repeat)   40.38   "Second, it's highly repetitive."
//  7  3 Cognitive work (5-step chain)         51.22   "And third, it's primarily cognitive work."
//  8  Where AI excels (messy email → action)  62.38   "Those are precisely the areas…"
//  9  The shift: what it's not (struck)       80.26   "So this is an important shift…"
// 10  A thinking assistant in your inbox      91.94   "It's about having a thinking assistant…"
// 11  Summarize, draft, adjust tone           98.66   "It can help you understand long or complex threads…"
// 12  Benefits compound (weeks strip)        114.70   "And those benefits compound…"
// 13  Two main ways                          121.46   "Now, you'll see AI for email show up in two main ways…"
// 14  Way 1: inside your inbox               127.82   "First, there's AI that lives directly inside your inbox…"
// 15  Way 2: a core AI platform              153.38   "Second, there's using a core AI platform…"
// 16  Higher-stakes emails                   170.22   "That's especially useful for higher-stakes emails…"
// 17  Takeaway                               185.74   "Across both approaches…"

export const AI_EMAIL_DURATION_S = 201.4;
export const AI_EMAIL_TITLE_FRAMES = 90;

const STARTS = [0, 4.56, 12.98, 23.9, 33.42, 40.38, 51.22, 62.38, 80.26, 91.94, 98.66, 114.7, 121.46, 127.82, 153.38, 170.22, 185.74];
const Scene = makeScene(STARTS, 0.5);

const AMBER = '#E0832F';
const PAPER = '#FBFBF8';

// ── Small building blocks ───────────────────────────────────────────────────

const Win: React.FC<{ title?: string; w: number | string; h: number | string; style?: React.CSSProperties; children: React.ReactNode; accent?: number }> = ({
  title,
  w,
  h,
  style,
  children,
  accent = 0,
}) => (
  <div
    className="kit-card kit-ui"
    style={{
      width: w,
      height: h,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 20,
      boxShadow: `0 30px 80px rgba(20,30,10,.08), 0 0 0 ${accent * 6}px rgba(102,198,28,${0.35 * accent})`,
      borderColor: accent > 0.5 ? LIME : LINE,
      ...style,
    }}
  >
    <div style={{ height: 50, flex: 'none', display: 'flex', alignItems: 'center', gap: 9, padding: '0 20px', borderBottom: `2px solid ${LINE}`, background: PAPER }}>
      {['#E5E5E0', '#E5E5E0', '#E5E5E0'].map((c, i) => (
        <div key={i} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
      ))}
      {title && <div style={{ marginLeft: 14, fontSize: 19, fontWeight: 600, color: MUTED }}>{title}</div>}
    </div>
    <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>{children}</div>
  </div>
);

const EmailRow: React.FC<{ from: string; subject: string; unread?: boolean; style?: React.CSSProperties; size?: number }> = ({ from, subject, unread, style, size = 1 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 16 * size, padding: `${14 * size}px ${22 * size}px`, borderBottom: `2px solid ${LINE}`, background: '#fff', ...style }}>
    <div style={{ width: 12 * size, height: 12 * size, borderRadius: 8, background: unread ? LIME : 'transparent', flex: 'none' }} />
    <div style={{ width: 40 * size, height: 40 * size, borderRadius: 40, background: '#EEF2E8', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 * size, fontWeight: 700, color: GREEN }}>
      {from[0]}
    </div>
    <div style={{ minWidth: 0 }}>
      <div style={{ fontSize: 21 * size, fontWeight: unread ? 700 : 500, color: INK, whiteSpace: 'nowrap' }}>{from}</div>
      <div style={{ fontSize: 19 * size, color: MUTED, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subject}</div>
    </div>
  </div>
);

const Meter: React.FC<{ value: number; label: string; w?: number; style?: React.CSSProperties }> = ({ value, label, w = 520, style }) => (
  <div className="kit-ui" style={{ width: w, ...style }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, fontWeight: 600, marginBottom: 14 }}>
      <span>{label}</span>
      <span style={{ color: value > 0.7 ? AMBER : GREEN }}>{value > 0.7 ? 'High' : value > 0.4 ? 'Medium' : 'Low'}</span>
    </div>
    <div style={{ height: 26, borderRadius: 13, background: '#EFEFEA', overflow: 'hidden' }}>
      <div style={{ width: `${Math.max(0.04, value) * 100}%`, height: '100%', borderRadius: 13, background: value > 0.7 ? AMBER : LIME }} />
    </div>
  </div>
);

const Envelope: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = GREEN }) => (
  <svg width={size} height={size * 0.72} viewBox="0 0 40 29" style={{ flex: 'none' }}>
    <rect x="1.5" y="1.5" width="37" height="26" rx="4" fill="#fff" stroke={color} strokeWidth="2.4" />
    <path d="M3 4l17 12L37 4" fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" />
  </svg>
);

const SparkGlyph: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M12 2l2.2 6.6L21 11l-6.8 2.3L12 20l-2.2-6.7L3 11l6.8-2.4z" fill={LIME} />
  </svg>
);

const Glyph: React.FC<{ kind: 'eye' | 'bulb' | 'target' | 'chat' | 'pen' | 'doc' | 'globe' | 'search'; size?: number }> = ({ kind, size = 40 }) => {
  const s = { fill: 'none', stroke: GREEN, strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
      {kind === 'eye' && (
        <>
          <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" {...s} />
          <circle cx="12" cy="12" r="3" {...s} />
        </>
      )}
      {kind === 'bulb' && (
        <>
          <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.6 1.1 1.4 1.1 2.2h5c0-.8.4-1.6 1.1-2.2A6 6 0 0012 3z" {...s} />
        </>
      )}
      {kind === 'target' && (
        <>
          <circle cx="12" cy="12" r="9" {...s} />
          <circle cx="12" cy="12" r="5" {...s} />
          <circle cx="12" cy="12" r="1.3" fill={GREEN} />
        </>
      )}
      {kind === 'chat' && <path d="M4 5h16v10H9l-5 4z" {...s} />}
      {kind === 'pen' && <path d="M4 20l4-1 11-11-3-3L5 16zM14 6l3 3" {...s} />}
      {kind === 'doc' && <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" {...s} />}
      {kind === 'globe' && (
        <>
          <circle cx="12" cy="12" r="9" {...s} />
          <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" {...s} />
        </>
      )}
      {kind === 'search' && (
        <>
          <circle cx="10.5" cy="10.5" r="6.5" {...s} />
          <path d="M15.5 15.5L21 21" {...s} />
        </>
      )}
    </svg>
  );
};

// Horizontal line that draws on between at and at+dur.
const DrawLine: React.FC<{ t: number; at: number; w: number; dur?: number; color?: string; dashed?: boolean; head?: boolean }> = ({
  t,
  at,
  w,
  dur = 0.6,
  color = GREEN,
  dashed,
  head = true,
}) => {
  const p = prog(t, at, dur, IN_OUT);
  return (
    <svg width={w} height={40} style={{ flex: 'none', overflow: 'visible' }}>
      <line x1={4} y1={20} x2={4 + (w - 22) * p} y2={20} stroke={color} strokeWidth={4} strokeLinecap="round" strokeDasharray={dashed ? '10 9' : undefined} />
      {head && p > 0.95 && <path d={`M${w - 20} 9 L${w - 4} 20 L${w - 20} 31`} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
};

// Three-step tracker for the "three characteristics" run (scenes 5–7).
const Tracker: React.FC<{ active: number; t: number; at: number }> = ({ active, t, at }) => (
  <div className="kit-ui" style={{ display: 'flex', gap: 14, marginBottom: 34, ...enter(t, at, { y: -10 }) }}>
    {['High volume', 'Highly repetitive', 'Cognitive work'].map((l, i) => (
      <div
        key={l}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 18px 8px 10px',
          borderRadius: 999,
          fontSize: 20,
          fontWeight: 600,
          background: i === active ? LIME_SOFT : i < active ? '#F3F5EF' : '#fff',
          border: `2px solid ${i === active ? LIME : LINE}`,
          color: i <= active ? INK : '#A8A8A0',
        }}
      >
        <span style={{ width: 28, height: 28, borderRadius: 14, background: i <= active ? GREEN : '#E3E3DD', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{i + 1}</span>
        {i <= active ? l : ' '.repeat(l.length)}
      </div>
    ))}
  </div>
);

const INBOX = [
  ['Priya Shah', 'Q3 budget sign-off'],
  ['Marcus Lee', 'Re: Re: Launch timeline'],
  ['Finance Ops', 'Approval needed: vendor invoice'],
  ['Dana Wu', 'Quick question on the deck'],
  ['Project Atlas', 'Weekly status update'],
  ['Tom Becker', 'Following up on Tuesday'],
  ['People Team', 'Action required: review cycle'],
  ['Lena Ortiz', 'Can you clarify the scope?'],
  ['Sam Patel', 'Re: client feedback'],
  ['Legal', 'Contract redlines attached'],
  ['Ops Weekly', 'Status: on track'],
  ['Jordan Kim', 'Re: Re: Re: offsite dates'],
];

const THREAD = [
  ['Priya Shah', 'Launch is moving to 14 May. Can everyone confirm?'],
  ['Marcus Lee', 'Works for engineering if legal signs off.'],
  ['Legal', 'Still reviewing the vendor terms.'],
  ['Dana Wu', 'Marketing needs a date this week.'],
  ['Marcus Lee', 'Re: any update on legal?'],
  ['Priya Shah', 'I need a go/no-go from you by Thursday.'],
];

const TONES: Array<[string, number, string]> = [
  ['Direct', 110.98, 'Go ahead with 14 May. I’ll chase legal today.'],
  ['Diplomatic', 111.54, 'Thanks, Priya. 14 May works for me. I’ll follow up with legal so we’re not held up.'],
  ['Concise', 112.62, 'Approved for 14 May. Chasing legal.'],
  ['Detailed', 113.5, 'Approved for 14 May. I’ll follow up with legal today and confirm sign-off by Wednesday, so we keep Thursday’s deadline.'],
];

// ── Body ────────────────────────────────────────────────────────────────────
const AiEmailBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/AiEmail.mp3')} />}

      {/* 1 — Email eats the workday: the inbox floods while the claim lands */}
      <Scene t={t} index={0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
          <div style={{ flex: 1 }}>
            <div className="kit-label" style={enter(t, 0.05, { y: 14 })}>AI for email</div>
            <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 0.15, { dur: 0.9, y: 34 }) }}>
              Email is one of the most <span className="kit-mark" style={markStyle(t, 1.84)}>time-consuming</span> parts of modern work.
            </div>
          </div>
          <Win title={`Inbox  ·  ${Math.min(INBOX.length, Math.floor(prog(t, 0.3, 4.0, Easing.linear) * INBOX.length))} unread`} w={640} h={820} style={enter(t, 0.1, { x: 60, y: 0 })}>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', justifyContent: 'flex-end', height: '100%' }}>
              {INBOX.map(([f, s], i) => {
                const at = 0.4 + i * 0.33;
                const p = prog(t, at, 0.35);
                return p > 0 ? <EmailRow key={i} from={f} subject={s} unread style={{ opacity: p, marginTop: (1 - p) * -84 }} /> : null;
              }).reverse()}
            </div>
          </Win>
        </div>
      </Scene>

      {/* 2 — 117 emails a day */}
      <Scene t={t} index={1}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
          <div style={{ flex: 1 }}>
            <div className="kit-label" style={enter(t, 5.12, { y: 14 })}>Microsoft Work Trend Index 2025</div>
            <div className="kit-body" style={{ fontSize: 44, ...enter(t, 7.52, { y: 16 }) }}>The average knowledge worker receives</div>
            <div className="kit-ui" style={{ fontFamily: 'IBM Plex Serif', fontSize: 280, lineHeight: 1, letterSpacing: '-0.04em', color: GREEN, marginTop: 10, ...enter(t, 9.5, { y: 20, scale: 0.85, easing: BACK }) }}>
              {Math.round(117 * prog(t, 9.6, 1.7, Easing.out(Easing.quad)))}
            </div>
            <div className="kit-h2" style={{ fontSize: 64, ...enter(t, 11.0, { y: 16 }) }}>
              emails <span className="kit-mark" style={markStyle(t, 11.68)}>a day.</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, 50px)', gap: 10, ...enter(t, 5.0, { y: 0 }) }}>
            {Array.from({ length: 117 }).map((_, i) => {
              const p = prog(t, 9.6 + (i / 117) * 1.9, 0.25, BACK);
              return (
                <div key={i} style={{ opacity: 0.15 + p * 0.85, transform: `scale(${0.6 + p * 0.4})` }}>
                  <Envelope size={50} color={p > 0.5 ? GREEN : '#C9CCC2'} />
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* 3 — Email isn't just messaging: stamps land on one email */}
      <Scene t={t} index={2}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
          <div style={{ width: 640 }}>
            <div className="kit-label" style={enter(t, 13.0, { y: 14 })}>Where work happens</div>
            <div className="kit-h1" style={{ fontSize: 96, ...enter(t, 13.2, { dur: 0.9, y: 34 }) }}>
              Email isn’t <span className="kit-mark" style={markStyle(t, 14.54)}>just messaging.</span>
            </div>
          </div>
          <div style={{ position: 'relative', flex: 1, height: 760 }}>
            <Win title="Re: Q3 launch plan" w={760} h={600} style={{ position: 'absolute', left: 40, top: 80, ...enter(t, 13.4, { y: 40 }) }}>
              <div style={{ padding: 34 }}>
                <EmailRow from="Priya Shah" subject="to you, Marcus, Dana, Legal" style={{ padding: 0, border: 'none' }} />
                <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[0.95, 0.88, 0.92, 0.6, 0.85, 0.7].map((w, i) => (
                    <div key={i} style={{ height: 16, width: `${w * 100}%`, borderRadius: 8, background: '#EDEEE8' }} />
                  ))}
                </div>
              </div>
            </Win>
            {(
              [
                ['Decisions are made', 16.62, 380, 20, -4],
                ['Work is coordinated', 17.9, 470, 230, 3],
                ['Priorities are clarified', 19.42, 330, 410, -2],
                ['Accountability lives', 22.1, 430, 580, 4],
              ] as Array<[string, number, number, number, number]>
            ).map(([label, at, x, y, rot], i) => (
              <div
                key={label}
                className="kit-pill"
                style={{
                  position: 'absolute',
                  left: x,
                  top: y,
                  fontSize: 34,
                  padding: '18px 30px',
                  background: i === 3 ? LIME : '#fff',
                  borderColor: i === 3 ? LIME : GREEN,
                  boxShadow: '0 14px 40px rgba(20,30,10,.12)',
                  ...enter(t, at, { y: -60, scale: 1.4, dur: 0.45, easing: BACK }),
                  rotate: `${rot}deg`,
                }}
              >
                <Check size={34} color={i === 3 ? GREEN : LIME} /> {label}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 4 — An unusually strong AI use case */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 24.0, { y: 14 })}>Why email</div>
        <div className="kit-h1" style={{ maxWidth: 1500, ...enter(t, 24.2, { dur: 0.9, y: 34 }) }}>
          A powerful place to introduce AI.
        </div>
        <div className="kit-body" style={{ fontSize: 46, marginTop: 40, ...enter(t, 28.5, { y: 16 }) }}>
          Three characteristics make it an <span className="kit-mark" style={markStyle(t, 30.46)}>unusually strong AI use case.</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 70 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                border: `4px solid ${LIME}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'IBM Plex Serif',
                fontSize: 60,
                color: GREEN,
                ...enter(t, 28.7 + i * 0.22, { y: 0, scale: 0.4, easing: BACK, dur: 0.5 }),
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>
      </Scene>

      {/* 5 — 1 High volume: the pile grows, the load meter climbs */}
      <Scene t={t} index={4}>
        <Tracker active={0} t={t} at={33.5} />
        <div style={{ display: 'flex', gap: 90, alignItems: 'center' }}>
          <div style={{ width: 700 }}>
            <div className="kit-h1" style={enter(t, 34.2, { dur: 0.8, y: 30 })}>
              High <span className="kit-mark" style={markStyle(t, 34.7)}>volume.</span>
            </div>
            <p className="kit-body" style={{ fontSize: 40, marginTop: 30, ...enter(t, 35.8, { y: 16 }) }}>
              The sheer number of messages.
            </p>
            <Meter label="Cognitive load" value={interpolate(t, [37.6, 39.4], [0.08, 0.92], { ...clamp, easing: IN_OUT })} w={600} style={{ marginTop: 60, ...enter(t, 37.6, { y: 16 }) }} />
          </div>
          <div style={{ position: 'relative', flex: 1, height: 660 }}>
            {Array.from({ length: 14 }).map((_, i) => {
              const at = 35.9 + i * 0.16;
              const p = prog(t, at, 0.4, BACK);
              const [f, s] = INBOX[i % INBOX.length];
              return (
                <div
                  key={i}
                  className="kit-card kit-ui"
                  style={{
                    position: 'absolute',
                    left: 40 + ((i * 37) % 160),
                    top: 520 - i * 36 - (1 - p) * 140,
                    width: 640,
                    opacity: p,
                    rotate: `${((i * 53) % 9) - 4}deg`,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(20,30,10,.08)',
                  }}
                >
                  <EmailRow from={f} subject={s} unread style={{ border: 'none' }} />
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* 6 — 2 Highly repetitive: the same five patterns keep stacking up */}
      <Scene t={t} index={5}>
        <Tracker active={1} t={t} at={40.4} />
        <div style={{ display: 'flex', gap: 90, alignItems: 'center' }}>
          <div style={{ width: 640 }}>
            <div className="kit-h1" style={enter(t, 41.0, { dur: 0.8, y: 30 })}>
              Highly <span className="kit-mark" style={markStyle(t, 41.58)}>repetitive.</span>
            </div>
            <p className="kit-body" style={{ fontSize: 40, marginTop: 30, ...enter(t, 42.86, { y: 16 }) }}>
              The same patterns appear again and again.
            </p>
          </div>
          <div className="kit-ui" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {(
              [
                ['Requests', 46.1],
                ['Updates', 47.02],
                ['Clarifications', 47.58],
                ['Follow-ups', 48.94],
                ['Status checks', 49.74],
              ] as Array<[string, number]>
            ).map(([label, at]) => {
              const n = t < at ? 0 : Math.min(9, Math.floor((t - at) / 0.22) + 1);
              return (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 24, height: 76, ...enter(t, at, { x: -30, y: 0, dur: 0.4 }) }}>
                  <div style={{ width: 250, fontSize: 32, fontWeight: 600 }}>{label}</div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {Array.from({ length: n }).map((_, k) => (
                      <div key={k} style={{ ...enter(t, at + k * 0.22, { y: 0, scale: 0.3, dur: 0.3, easing: BACK }) }}>
                        <Envelope size={58} color={k === 0 ? GREEN : '#9DB78A'} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* 7 — 3 Cognitive work: read → interpret → decide → choose → write */}
      <Scene t={t} index={6}>
        <Tracker active={2} t={t} at={51.3} />
        <div className="kit-h1" style={enter(t, 51.6, { dur: 0.8, y: 30 })}>
          Primarily <span className="kit-mark" style={markStyle(t, 53.1)}>cognitive work.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 90 }}>
          {(
            [
              ['eye', 'Read', 54.54],
              ['bulb', 'Interpret intent', 55.5],
              ['target', 'Decide what matters', 56.74],
              ['chat', 'Choose a response', 58.22],
              ['pen', 'Write a clear message', 59.78],
            ] as Array<[React.ComponentProps<typeof Glyph>['kind'], string, number]>
          ).map(([g, label, at], i) => (
            <React.Fragment key={label}>
              {i > 0 && <DrawLine t={t} at={at - 0.3} w={56} />}
              <div
                className="kit-card kit-ui"
                style={{
                  width: 290,
                  height: 220,
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  borderColor: t >= at && t < (i < 4 ? [55.5, 56.74, 58.22, 59.78][i] : 62.4) ? LIME : LINE,
                  background: t >= at ? '#fff' : PAPER,
                  ...enter(t, at, { y: 30, dur: 0.5 }),
                }}
              >
                <div style={{ width: 66, height: 66, borderRadius: 16, background: LIME_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Glyph kind={g} size={40} />
                </div>
                <div style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.2 }}>{label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Scene>

      {/* 8 — Where AI excels: a messy email becomes intent, then action */}
      <Scene t={t} index={7}>
        <div className="kit-h2" style={{ marginBottom: 44, ...enter(t, 62.5, { dur: 0.8, y: 30 }) }}>
          Exactly where modern AI <span className="kit-mark" style={markStyle(t, 65.26)}>performs extremely well.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <Win title="Re: Re: vendor + timing (long, sorry)" w={760} h={560} style={enter(t, 63.0, { y: 30 })}>
            <div style={{ padding: '26px 32px', fontSize: 23, lineHeight: 1.55, color: '#3A3A36', position: 'relative' }}>
              Hi all, following on from yesterday (and Marcus’s note below) I think we’re mostly aligned but not 100%? Legal still hasn’t signed off the vendor terms, which may or may not matter for the 14th. Also
              budget might need to move if we go ahead now vs next quarter. Can someone confirm whether we’re OK to proceed if legal isn’t done by Thurs?? I need to tell the vendor something. Thanks!!
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: interpolate(t, [68.22, 70.8], [0, 430], clamp),
                  height: 54,
                  background: `linear-gradient(180deg, rgba(102,198,28,0) 0%, rgba(102,198,28,.28) 60%, rgba(102,198,28,0) 100%)`,
                  opacity: t > 68.2 && t < 71.0 ? 1 : 0,
                }}
              />
            </div>
          </Win>
          <DrawLine t={t} at={71.3} w={90} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, flex: 1 }}>
            <div className="kit-card kit-ui" style={{ padding: '26px 30px', borderColor: LIME, ...enter(t, 71.66, { x: -30, y: 0 }) }}>
              <div className="kit-tag" style={{ marginBottom: 14 }}>Intent</div>
              <div style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.3 }}>A go/no-go on the vendor before Thursday.</div>
              <div style={{ fontSize: 22, color: MUTED, marginTop: 10, ...enter(t, 73.0, { y: 8 }) }}>Open question: legal sign-off</div>
            </div>
            <div className="kit-card kit-ui" style={{ padding: '26px 30px', background: PAPER, ...enter(t, 75.58, { x: -30, y: 0 }) }}>
              <div className="kit-tag" style={{ marginBottom: 14, background: GREEN, color: '#fff' }}>Action</div>
              <div style={{ fontSize: 30, lineHeight: 1.35 }}>Reply: proceed, pending legal by Wednesday.</div>
              <div style={{ display: 'inline-flex', marginTop: 18, padding: '12px 26px', borderRadius: 999, background: GREEN, color: '#fff', fontSize: 22, fontWeight: 700, ...enter(t, 77.0, { y: 0, scale: 0.7, easing: BACK }) }}>
                Draft reply
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 9 — The shift: what AI for email is NOT */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={enter(t, 80.3, { y: 14 })}>An important shift</div>
        <div className="kit-h1" style={enter(t, 80.6, { dur: 0.8, y: 30 })}>
          It’s <span className="kit-mark" style={markStyle(t, 84.9)}>not</span> about…
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 80 }}>
          {(
            [
              ['Sending emails for you', 85.42],
              ['Replacing your judgment or relationships', 87.26],
              ['Automating your communication', 89.98],
            ] as Array<[string, number]>
          ).map(([label, at]) => {
            const strike = prog(t, at + 0.6, 0.45, IN_OUT);
            return (
              <div key={label} className="kit-card kit-ui" style={{ flex: 1, padding: '34px 34px', minHeight: 230, display: 'flex', flexDirection: 'column', gap: 24, ...enter(t, at, { y: 30, dur: 0.45 }) }}>
                <div style={{ opacity: strike, transform: `scale(${0.5 + strike * 0.5})`, transformOrigin: 'left' }}>
                  <Cross size={46} />
                </div>
                <div style={{ fontSize: 36, fontWeight: 600, lineHeight: 1.25, color: strike > 0.5 ? '#8C8C86' : INK }}>
                  <span
                    style={{
                      backgroundImage: `linear-gradient(${RED}, ${RED})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: '0 58%',
                      backgroundSize: `${strike * 100}% 4px`,
                      boxDecorationBreak: 'clone',
                      WebkitBoxDecorationBreak: 'clone',
                    }}
                  >
                    {label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 10 — A thinking assistant inside your inbox; the load meter drains */}
      <Scene t={t} index={9}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
          <div style={{ width: 640 }}>
            <div className="kit-label" style={enter(t, 92.0, { y: 14 })}>What it is</div>
            <div className="kit-h1" style={{ fontSize: 88, ...enter(t, 92.2, { dur: 0.8, y: 30 }) }}>
              A <span className="kit-mark" style={markStyle(t, 93.02)}>thinking assistant</span> inside your inbox.
            </div>
            <Meter
              label="Cognitive load"
              value={interpolate(t, [96.4, 98.0], [0.92, 0.3], { ...clamp, easing: IN_OUT })}
              w={600}
              style={{ marginTop: 70, ...enter(t, 95.4, { y: 16 }) }}
            />
          </div>
          <Win title="Inbox" w={1050} h={760} style={enter(t, 92.0, { x: 60, y: 0 })}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {INBOX.slice(0, 9).map(([f, s], i) => (
                  <EmailRow key={i} from={f} subject={s} unread={i < 5} />
                ))}
              </div>
              <div
                style={{
                  width: 420 * prog(t, 93.3, 0.8, IN_OUT),
                  borderLeft: `2px solid ${LINE}`,
                  background: PAPER,
                  overflow: 'hidden',
                  flex: 'none',
                }}
              >
                <div style={{ width: 420, padding: 28 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700 }}>
                    <SparkGlyph /> Assistant
                  </div>
                  {['Summarize this thread', 'What needs my reply?', 'Draft a response'].map((q, i) => (
                    <div key={q} style={{ marginTop: i === 0 ? 30 : 14, padding: '16px 18px', borderRadius: 14, border: `2px solid ${LINE}`, background: '#fff', fontSize: 21, ...enter(t, 94.3 + i * 0.3, { y: 10 }) }}>
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Win>
        </div>
      </Scene>

      {/* 11 — Summarize a thread, draft a reply, adjust the tone */}
      <Scene t={t} index={10}>
        <Win title="Re: Q3 launch plan  ·  6 messages" w={1760} h={830}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1, padding: '22px 30px', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
              {THREAD.map(([f, s], i) => {
                const dim = t > 99.42 ? 0.45 : 1;
                return (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '14px 18px', borderRadius: 14, border: `2px solid ${LINE}`, background: '#fff', opacity: i === 5 ? 1 : dim }}>
                    <div style={{ width: 40, height: 40, borderRadius: 20, background: '#EEF2E8', color: GREEN, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{f[0]}</div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 20, fontWeight: 700 }}>{f}</div>
                      <div style={{ fontSize: 21, color: '#44443F' }}>{s}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ width: 760, flex: 'none', borderLeft: `2px solid ${LINE}`, background: PAPER, padding: '24px 30px', display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700 }}>
                <SparkGlyph /> Assistant
              </div>
              <div className="kit-card" style={{ padding: '20px 24px', borderColor: t < 103.8 ? LIME : LINE, ...enter(t, 99.42, { y: 16 }) }}>
                <div className="kit-tag" style={{ marginBottom: 10 }}>Summary</div>
                {['Launch moves to 14 May.', 'Legal sign-off is still pending.', 'Priya needs your go/no-go by Thursday.'].map((b, i) => (
                  <div key={b} style={{ display: 'flex', gap: 12, fontSize: 23, lineHeight: 1.45, ...enter(t, 100.4 + i * 0.75, { x: -12, y: 0, dur: 0.4 }) }}>
                    <span style={{ color: GREEN, fontWeight: 700 }}>•</span>
                    {b}
                  </div>
                ))}
              </div>
              <div className="kit-card" style={{ padding: '20px 24px', borderColor: t >= 103.8 ? LIME : LINE, ...enter(t, 103.82, { y: 16 }) }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div className="kit-tag">Draft reply</div>
                  <div style={{ display: 'flex', gap: 8, ...enter(t, 108.38, { y: 8 }) }}>
                    {TONES.map(([name, at], i) => {
                      const next = TONES[i + 1]?.[1] ?? 999;
                      const on = t >= at && t < next;
                      return (
                        <div key={name} style={{ padding: '7px 14px', borderRadius: 999, fontSize: 17, fontWeight: 700, background: on ? GREEN : '#fff', color: on ? '#fff' : MUTED, border: `2px solid ${on ? GREEN : LINE}` }}>
                          {name}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div style={{ fontSize: 23, lineHeight: 1.5, minHeight: 140 }}>
                  {(() => {
                    let active = -1;
                    TONES.forEach(([, at], i) => {
                      if (t >= at) active = i;
                    });
                    if (active < 0) return typed(t, 104.3, 'Thanks, Priya. 14 May works. I’ll follow up with legal today.', 2.2);
                    const [, at, text] = TONES[active];
                    return typed(t, at, text, Math.min(0.5, text.length / 120));
                  })()}
                  <span style={{ display: 'inline-block', width: 3, height: 26, background: GREEN, marginLeft: 3, verticalAlign: 'middle', opacity: Math.floor(t * 2) % 2 ? 1 : 0.2 }} />
                </div>
              </div>
            </div>
          </div>
        </Win>
        <div style={{ position: 'absolute', left: 80, right: 80, bottom: 150, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }} />
      </Scene>

      {/* 12 — Benefits compound on recurring emails */}
      <Scene t={t} index={11}>
        <div className="kit-h2" style={enter(t, 114.8, { dur: 0.8, y: 30 })}>
          The benefits <span className="kit-mark" style={markStyle(t, 115.58)}>compound</span> on recurring emails.
        </div>
        <div className="kit-ui" style={{ display: 'flex', alignItems: 'flex-end', gap: 22, marginTop: 70, height: 470 }}>
          {Array.from({ length: 8 }).map((_, w) => {
            const sAt = 118.94 + w * 0.12;
            const aAt = 120.14 + w * 0.12;
            const bar = prog(t, 117.1 + w * 0.32, 0.6, OUT_Q);
            return (
              <div key={w} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                <div style={{ height: 30 + (w + 1) * 26 * bar, borderRadius: 10, background: LIME_SOFT, border: `2px solid ${LIME}`, opacity: bar }} />
                <div style={{ padding: '10px 12px', borderRadius: 12, border: `2px solid ${LINE}`, fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, ...enter(t, sAt, { y: 14, dur: 0.35 }) }}>
                  <Envelope size={24} /> Status update
                </div>
                <div style={{ padding: '10px 12px', borderRadius: 12, border: `2px solid ${LINE}`, fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8, ...enter(t, aAt, { y: 14, dur: 0.35 }) }}>
                  <Check size={22} /> Approval
                </div>
                <div style={{ textAlign: 'center', fontSize: 18, color: MUTED, fontWeight: 600 }}>Week {w + 1}</div>
              </div>
            );
          })}
        </div>
        <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, color: GREEN, fontWeight: 700, marginTop: 18, ...enter(t, 117.3, { y: 8 }) }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: LIME_SOFT, border: `2px solid ${LIME}` }} /> Time and attention you get back
        </div>
      </Scene>

      {/* 13 — Two main ways */}
      <Scene t={t} index={12}>
        <div className="kit-h1" style={enter(t, 121.5, { dur: 0.8, y: 30 })}>
          AI for email shows up in <span className="kit-mark" style={markStyle(t, 124.06)}>two main ways.</span>
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 80 }}>
          {(
            [
              ['1', 'Inside your inbox', 124.4],
              ['2', 'In a core AI platform', 124.75],
            ] as Array<[string, string, number]>
          ).map(([n, label, at]) => (
            <div key={n} className="kit-card kit-ui" style={{ flex: 1, padding: '34px 40px', display: 'flex', alignItems: 'center', gap: 28, ...enter(t, at, { y: 30, easing: BACK }) }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, background: LIME_SOFT, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'IBM Plex Serif', fontSize: 44, color: GREEN }}>{n}</div>
              <div style={{ fontSize: 44, fontFamily: 'IBM Plex Serif' }}>{label}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 14 — Way 1: AI inside your inbox */}
      <Scene t={t} index={13}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
          <div style={{ width: 600 }}>
            <div className="kit-label" style={enter(t, 127.9, { y: 14 })}>Way 1</div>
            <div className="kit-h1" style={{ fontSize: 88, ...enter(t, 128.1, { dur: 0.8, y: 30 }) }}>
              AI that lives <span className="kit-mark" style={markStyle(t, 129.66)}>inside your inbox.</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 50, alignItems: 'flex-start' }}>
              <div className="kit-pill" style={enter(t, 132.18, { x: -30, y: 0, easing: BACK })}>Gemini in Gmail</div>
              <div className="kit-pill" style={enter(t, 133.66, { x: -30, y: 0, easing: BACK })}>Copilot in Outlook</div>
              <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 6, ...enter(t, 135.62, { y: 8 }) }}>With the relevant subscription</div>
            </div>
          </div>
          <Win title="Inbox" w={1090} h={800} accent={prog(t, 139.86, 0.6) * (1 - prog(t, 141.6, 0.6))} style={enter(t, 128.0, { x: 60, y: 0 })}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                {INBOX.slice(0, 9).map(([f, s], i) => (
                  <EmailRow key={i} from={f} subject={s} unread={i < 4} style={{ background: i === 0 && t > 141.8 ? LIME_SOFT : '#fff' }} />
                ))}
              </div>
              <div style={{ width: 480, flex: 'none', borderLeft: `2px solid ${LINE}`, background: PAPER, padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700 }}>
                  <SparkGlyph /> Built-in AI
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
                  {(
                    [
                      ['Reads the entire thread', 142.26],
                      ['Understands context across messages', 143.9],
                      ['Summarizes what’s happening', 146.54],
                      ['Suggests replies', 148.25],
                      ['Helps you think through a response', 149.54],
                    ] as Array<[string, number]>
                  ).map(([l, at]) => (
                    <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 23, fontWeight: 600, ...enter(t, at, { x: -20, y: 0, dur: 0.4 }) }}>
                      <Check size={30} /> {l}
                    </div>
                  ))}
                </div>
                <div className="kit-tag" style={{ marginTop: 40, fontSize: 20, padding: '10px 20px', background: GREEN, color: '#fff', ...enter(t, 151.62, { y: 0, scale: 0.6, easing: BACK }) }}>
                  No switching tools
                </div>
              </div>
            </div>
          </Win>
        </div>
      </Scene>

      {/* 15 — Way 2: step out into a core AI platform */}
      <Scene t={t} index={14}>
        {(() => {
          const out = prog(t, 166.78, 1.0, IN_OUT);
          const fly = prog(t, 158.66, 1.0, IN_OUT);
          return (
            <>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 30, marginBottom: 40 }}>
                <div className="kit-label" style={{ margin: 0, ...enter(t, 153.4, { y: 14 }) }}>Way 2</div>
                <div className="kit-h2" style={enter(t, 153.6, { dur: 0.8, y: 30 })}>
                  A <span className="kit-mark" style={markStyle(t, 154.7)}>core AI platform</span>
                </div>
                <div className="kit-pill" style={{ fontSize: 26, padding: '10px 22px', ...enter(t, 156.26, { y: 0, scale: 0.6, easing: BACK }) }}>ChatGPT</div>
                <div className="kit-pill" style={{ fontSize: 26, padding: '10px 22px', ...enter(t, 157.38, { y: 0, scale: 0.6, easing: BACK }) }}>Claude</div>
              </div>
              <div style={{ position: 'relative', height: 640 }}>
                <Win
                  title="Inbox"
                  w={620}
                  h={600}
                  style={{ position: 'absolute', left: 0, top: 20, opacity: 1 - out * 0.55, transform: `scale(${1 - out * 0.12})`, transformOrigin: 'left center', ...{} }}
                >
                  {INBOX.slice(0, 7).map(([f, s], i) => (
                    <EmailRow key={i} from={f} subject={s} unread={i < 3} style={{ background: i === 0 ? LIME_SOFT : '#fff' }} />
                  ))}
                </Win>
                {/* connector line between the two windows */}
                <div style={{ position: 'absolute', left: 640, top: 290, display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 1 - out * 0.6 }}>
                  <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, color: GREEN, marginBottom: 2, ...enter(t, 160.6, { y: 8 }) }}>Connector</div>
                  <DrawLine t={t} at={160.3} w={150} dashed />
                </div>
                <Win
                  title="AI chat"
                  w={900}
                  h={620}
                  accent={out}
                  style={{ position: 'absolute', left: 820 - out * 380, top: 10 - out * 10, transform: `scale(${1 + out * 0.03})`, ...enter(t, 155.0, { x: 60, y: 0 }) }}
                >
                  <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 18, height: '100%', boxSizing: 'border-box' }}>
                    <div style={{ alignSelf: 'flex-end', maxWidth: 560, padding: '16px 20px', borderRadius: 16, background: '#F0F9E8', fontSize: 22, opacity: fly > 0.98 ? 1 : 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 18, color: GREEN, marginBottom: 6 }}>Pasted email · Priya Shah</div>
                      Q3 budget sign-off. Can you approve the revised numbers before Friday?
                    </div>
                    <div style={{ alignSelf: 'flex-start', maxWidth: 640, padding: '16px 20px', borderRadius: 16, border: `2px solid ${LINE}`, fontSize: 22, lineHeight: 1.45, ...enter(t, 162.62, { y: 12 }) }}>
                      Here’s what Priya is asking, what changed in the numbers, and three ways you could reply.
                    </div>
                    <div className="kit-tag" style={{ alignSelf: 'flex-start', ...enter(t, 163.6, { y: 0, scale: 0.6, easing: BACK }) }}>Similar capabilities</div>
                    <div style={{ marginTop: 'auto', padding: '16px 20px', borderRadius: 16, border: `2px solid ${out > 0.5 ? LIME : LINE}`, fontSize: 22, color: MUTED }}>
                      {out > 0.2 ? typed(t, 167.4, 'What are the risks if I approve this now?', 1.4) : 'Ask anything'}
                    </div>
                  </div>
                </Win>
                {/* the email card flying from the inbox into the chat */}
                {fly > 0 && fly < 1 && (
                  <div
                    className="kit-card"
                    style={{
                      position: 'absolute',
                      left: interpolate(fly, [0, 1], [0, 1180]),
                      top: interpolate(fly, [0, 0.5, 1], [70, 0, 70]),
                      width: 520,
                      boxShadow: '0 20px 50px rgba(20,30,10,.18)',
                      overflow: 'hidden',
                      transform: `scale(${1 - fly * 0.15})`,
                    }}
                  >
                    <EmailRow from="Priya Shah" subject="Q3 budget sign-off" unread style={{ border: 'none' }} />
                  </div>
                )}
                <div className="kit-ui" style={{ position: 'absolute', left: 0, bottom: -20, fontSize: 30, fontWeight: 600, ...enter(t, 166.78, { y: 12 }) }}>
                  Step out of the inbox to <span className="kit-mark" style={markStyle(t, 168.58)}>think more deliberately.</span>
                </div>
              </div>
            </>
          );
        })()}
      </Scene>

      {/* 16 — Higher-stakes emails: bring in more context */}
      <Scene t={t} index={15}>
        <div style={{ display: 'flex', gap: 70, alignItems: 'center' }}>
          <div style={{ width: 720 }}>
            <div className="kit-label" style={enter(t, 170.3, { y: 14 })}>When to step out</div>
            <div className="kit-h1" style={{ fontSize: 88, ...enter(t, 170.5, { dur: 0.8, y: 30 }) }}>
              <span className="kit-mark" style={markStyle(t, 171.9)}>Higher-stakes</span> emails.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 50 }}>
              {(
                [
                  ['Clarify a complex situation', 173.62],
                  ['Draft a sensitive response', 175.9],
                  ['Think through implications', 178.22],
                ] as Array<[string, number]>
              ).map(([l, at]) => (
                <div key={l} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 34, fontWeight: 600, ...enter(t, at, { x: -30, y: 0 }) }}>
                  <Check size={38} /> {l}
                </div>
              ))}
            </div>
          </div>
          <Win title="AI chat" w={960} h={720} style={enter(t, 170.4, { x: 60, y: 0 })}>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 18, height: '100%', boxSizing: 'border-box' }}>
              <div style={{ alignSelf: 'flex-end', maxWidth: 640, padding: '18px 22px', borderRadius: 16, background: '#F0F9E8', fontSize: 23, lineHeight: 1.45 }}>
                {typed(t, 173.62, 'A key client is unhappy about the delay. Help me reply without overpromising, and flag the risks before I send.', 5.0)}
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, color: MUTED, ...enter(t, 181.6, { y: 8 }) }}>Pull in more context</div>
                <div style={{ display: 'flex', gap: 14 }}>
                  {(
                    [
                      ['doc', 'Documents', 182.14],
                      ['globe', 'Web search', 183.42],
                      ['search', 'Deep research', 184.3],
                    ] as Array<[React.ComponentProps<typeof Glyph>['kind'], string, number]>
                  ).map(([g, l, at]) => (
                    <div key={l} className="kit-pill" style={{ fontSize: 24, padding: '12px 22px', borderColor: LIME, ...enter(t, at, { y: 30, scale: 0.7, easing: BACK, dur: 0.45 }) }}>
                      <Glyph kind={g} size={30} /> {l}
                    </div>
                  ))}
                </div>
                <div style={{ padding: '18px 22px', borderRadius: 16, border: `2px solid ${LINE}`, fontSize: 22, color: MUTED }}>Ask anything</div>
              </div>
            </div>
          </Win>
        </div>
      </Scene>

      {/* 17 — Takeaway */}
      <Scene t={t} index={16} padStyle={{ opacity: 1 - prog(t, 200.6, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 185.8, { y: 14 })}>Across both approaches</div>
        <div className="kit-h2" style={{ position: 'relative', display: 'inline-block', alignSelf: 'flex-start', color: t > 190.4 ? '#9A9A94' : INK, ...enter(t, 186.2, { dur: 0.8, y: 30 }) }}>
          Not just a writing assistant.
          <div style={{ position: 'absolute', left: 0, top: '54%', height: 5, width: `${prog(t, 190.3, 0.5, IN_OUT) * 100}%`, background: RED, borderRadius: 3 }} />
        </div>
        <div className="kit-h1" style={{ fontSize: 92, marginTop: 50, ...enter(t, 191.4, { dur: 0.8, y: 30 }) }}>
          <span className="kit-mark" style={markStyle(t, 191.82)}>Offload</span> repetitive cognitive work.
        </div>
        <div className="kit-h1" style={{ fontSize: 92, marginTop: 20, ...enter(t, 194.3, { dur: 0.8, y: 30 }) }}>
          Gain a <span className="kit-mark" style={markStyle(t, 194.86)}>thinking partner</span> in your inbox.
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

const OUT_Q = Easing.out(Easing.quad);

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const AiEmail: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={AI_EMAIL_TITLE_FRAMES}>
      <TitleCardGreen label="AI AT WORK" title="AI for Email" />
    </Sequence>
    <Sequence from={AI_EMAIL_TITLE_FRAMES}>
      <AiEmailBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
