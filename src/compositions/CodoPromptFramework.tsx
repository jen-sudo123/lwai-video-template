import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
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
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// The CODO Prompt Framework — custom concept composition (Lead with AI), built with src/kit.
// VO: audio/codo-prompt-framework.mp3 (Daan, ElevenLabs v4, 182.9s). Every cue is in VO seconds, from the
// Scribe word timestamps in src/data/codo-prompt-framework.transcript.json. A 90-frame green title card
// opens the video; the VO and every scene start after it. A C·O·D·O tracker sits above each section.
//
//  #  scene                         start   VO cue
//  1  Right corner of knowledge     0.00    "Great prompts give AI the right context…"
//  2  The CODO framework            12.84   "To get the best results, we use the CODO…"
//  3  Character: the lens           22.56   "Let's start with Character."
//  4  Character examples            40.00   "So you might say: act as…"
//  5  Aiming too low                57.92   "And this is exactly where most people aim too low."
//  6  Same effort, different output 66.16   "But AI doesn't charge by the hour."
//  7  Objective: the why            84.56   "Next, the Objective."
//  8  Sets the direction            103.32  "The objective sets the direction."
//  9  Do's and Don'ts: guardrails   112.19  "Then come the Do's and Don'ts."
//  10 AI knows nothing about you    132.80  "This is what sharpens the output…"
//  11 Output: the deliverable       150.20  "And finally, the Output."
//  12 Include examples              168.12  "Even better, include examples."
//  13 Recap                         180.52  "Again, not unlike working with people."

export const CODO_DURATION_S = 186.0;
export const CODO_TITLE_FRAMES = 90;

const STARTS = [0, 12.84, 22.56, 40.0, 57.92, 66.16, 84.56, 103.32, 112.19, 132.8, 150.2, 168.12, 180.52];
const Scene = makeScene(STARTS, 0.5);

const SERIF = "'IBM Plex Serif'";
const SANS = "'Public Sans'";
const CODO = [
  { l: 'C', w: 'Character' },
  { l: 'O', w: 'Objective' },
  { l: 'D', w: "Do's and Don'ts" },
  { l: 'O', w: 'Output' },
];

// ── Shared pieces ───────────────────────────────────────────────────────────

// Deterministic pseudo-random for dot fields.
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const LetterTile: React.FC<{ letter: string; size: number; on?: number; style?: React.CSSProperties }> = ({ letter, size, on = 1, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.16,
      background: on > 0.5 ? LIME : '#fff',
      border: `${Math.max(2, size * 0.012)}px solid ${on > 0.5 ? LIME : LINE}`,
      display: 'grid',
      placeItems: 'center',
      fontFamily: SERIF,
      fontSize: size * 0.62,
      lineHeight: 1,
      color: on > 0.5 ? '#fff' : '#C9C9C2',
      flex: 'none',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {letter}
  </div>
);

// Section tracker: four small tiles, the active one lime, with the section name beside it.
const CodoRail: React.FC<{ t: number; at: number; active: number }> = ({ t, at, active }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 34, ...enter(t, at, { y: 12 }) }}>
    {CODO.map((c, i) => (
      <LetterTile key={i} letter={c.l} size={54} on={i === active ? 1 : 0} />
    ))}
    <div style={{ marginLeft: 16, fontFamily: SANS, fontWeight: 600, fontSize: 22, letterSpacing: '.12em', textTransform: 'uppercase', color: MUTED }}>
      {CODO[active].w}
    </div>
  </div>
);

const Chip: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; lime?: boolean }> = ({ children, style, lime }) => (
  <div className="kit-pill" style={{ background: lime ? LIME_SOFT : '#fff', borderColor: lime ? LIME : LINE, ...style }}>
    {children}
  </div>
);

// Grey text lines that stand in for document content.
const Lines: React.FC<{ n: number; w?: number[]; h?: number; gap?: number; color?: string }> = ({ n, w, h = 12, gap = 12, color = '#E7E7E2' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ height: h, borderRadius: h, background: color, width: `${w ? w[i % w.length] : i === n - 1 ? 62 : 100}%` }} />
    ))}
  </div>
);

const PersonIcon: React.FC<{ size: number; color?: string }> = ({ size, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="8" r="4.2" fill={color} />
    <path d="M3.5 21.5c.6-4.6 4-7.4 8.5-7.4s7.9 2.8 8.5 7.4z" fill={color} />
  </svg>
);

// ── Body ────────────────────────────────────────────────────────────────────
const CodoBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/codo-prompt-framework.mp3')} />}

      {/* 1 — Great prompts point AI at the right corner of its knowledge */}
      <Scene t={t} index={0}>
        <S1 t={t} />
      </Scene>

      {/* 2 — The CODO framework */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 12.9, { y: 14 })}>The framework</div>
        <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 13.1, { y: 30 }) }}>
          The <span className="kit-mark" style={markStyle(t, 14.88)}>CODO</span> Prompt Framework
        </div>
        <div style={{ display: 'flex', gap: 44, marginTop: 80 }}>
          {CODO.map((c, i) => {
            const at = [17.04, 18.08, 19.36, 21.04][i];
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 26, ...enter(t, at - 0.15, { y: 60, easing: BACK }) }}>
                <LetterTile letter={c.l} size={260} on={t >= at ? 1 : 0} />
                <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 36, color: INK }}>{c.w}</div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 3 — Character: the lens */}
      <Scene t={t} index={2}>
        <S3 t={t} />
      </Scene>

      {/* 4 — Character examples */}
      <Scene t={t} index={3}>
        <S4 t={t} />
      </Scene>

      {/* 5 — Most people aim too low */}
      <Scene t={t} index={4}>
        <S5 t={t} />
      </Scene>

      {/* 6 — Same effort, worlds-apart output */}
      <Scene t={t} index={5}>
        <S6 t={t} />
      </Scene>

      {/* 7 — Objective: the why */}
      <Scene t={t} index={6}>
        <S7 t={t} />
      </Scene>

      {/* 8 — The objective sets the direction */}
      <Scene t={t} index={7}>
        <S8 t={t} />
      </Scene>

      {/* 9 — Do's and Don'ts: guardrails */}
      <Scene t={t} index={8}>
        <S9 t={t} />
      </Scene>

      {/* 10 — AI knows nothing about you */}
      <Scene t={t} index={9}>
        <S10 t={t} />
      </Scene>

      {/* 11 — Output */}
      <Scene t={t} index={10}>
        <S11 t={t} />
      </Scene>

      {/* 12 — Include examples */}
      <Scene t={t} index={11}>
        <S12 t={t} />
      </Scene>

      {/* 13 — Recap */}
      <Scene t={t} index={12}>
        <div className="kit-label" style={enter(t, 180.6, { y: 14 })}>The CODO Prompt Framework</div>
        <div className="kit-h2" style={enter(t, 180.7, { y: 24 })}>
          Brief AI <span className="kit-mark" style={markStyle(t, 181.36)}>like you'd brief a person.</span>
        </div>
        <div style={{ display: 'flex', gap: 28, marginTop: 70 }}>
          {CODO.map((c, i) => (
            <div key={i} className="kit-card" style={{ flex: 1, padding: '30px 30px 34px', display: 'flex', flexDirection: 'column', gap: 22, ...enter(t, 181.2 + i * 0.3, { y: 40, easing: BACK }) }}>
              <LetterTile letter={c.l} size={110} />
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 32 }}>{c.w}</div>
              <div style={{ fontFamily: SANS, fontSize: 24, color: MUTED, lineHeight: 1.4 }}>
                {['Who AI should become', 'Your goal, and why', 'Your expert guardrails', 'The exact deliverable'][i]}
              </div>
            </div>
          ))}
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 1 ─────────────────────────────────────────────────────────────────
const S1: React.FC<{ t: number }> = ({ t }) => {
  const W = 820;
  const H = 520;
  const lp = prog(t, 5.9, 1.3, IN_OUT);
  const lx = interpolate(lp, [0, 1], [W * 0.38, W * 0.78]);
  const ly = interpolate(lp, [0, 1], [H * 0.58, H * 0.26]);
  const R = 105;
  const lensOn = prog(t, 5.3, 0.5);
  const lit = prog(t, 6.9, 0.6);
  const dots = Array.from({ length: 260 }).map((_, i) => ({ x: 20 + rand(i) * (W - 40), y: 20 + rand(i + 999) * (H - 40), d: rand(i + 77) }));
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
      <div style={{ width: 860 }}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Prompting</div>
        <div className="kit-h2" style={enter(t, 0.3, { y: 30 })}>
          Great prompts give AI
          <br />
          <span className="kit-mark" style={markStyle(t, 2.0)}>the right context</span>
        </div>
        <div className="kit-h2" style={{ marginTop: 6, ...enter(t, 2.9, { y: 30 }) }}>
          and <span className="kit-mark" style={markStyle(t, 3.44)}>the right expectations.</span>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 44, ...enter(t, 5.0, { y: 16 }) }}>
          So it draws from the right corner of what it knows.
        </p>
      </div>
      <div style={{ position: 'relative', width: W, ...enter(t, 0.6, { y: 0, scale: 0.96 }) }}>
        <div className="kit-card" style={{ width: W, height: H, position: 'relative', overflow: 'hidden', background: '#FBFBF8' }}>
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
            {dots.map((p, i) => {
              const inLens = Math.hypot(p.x - lx, p.y - ly) < R;
              const on = inLens ? lit : 0;
              return <circle key={i} cx={p.x} cy={p.y} r={3 + p.d * 2.5 + on * 3} fill={on > 0.3 ? LIME : '#CFCFC6'} opacity={inLens ? 1 : 1 - lensOn * 0.45} />;
            })}
            <circle cx={lx} cy={ly} r={R} fill="none" stroke={GREEN} strokeWidth={5} opacity={lensOn} />
            <line x1={lx + R * 0.72} y1={ly + R * 0.72} x2={lx + R * 1.25} y2={ly + R * 1.25} stroke={GREEN} strokeWidth={12} strokeLinecap="round" opacity={lensOn} />
          </svg>
          <div className="kit-ui" style={{ position: 'absolute', left: 26, top: 22, fontSize: 22, fontWeight: 600, color: MUTED, letterSpacing: '.1em', textTransform: 'uppercase' }}>
            What AI knows
          </div>
        </div>
        <div
          className="kit-card kit-ui"
          style={{ position: 'absolute', right: -20, bottom: -54, padding: '20px 28px', display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600, boxShadow: '0 16px 40px rgba(0,0,0,.10)', ...enter(t, 9.52, { y: 30, easing: BACK }) }}
        >
          {t >= 10.8 ? <Check size={38} /> : <div style={{ width: 38, height: 38, borderRadius: '50%', border: `3px solid ${LINE}` }} />}
          An output that fits your needs
        </div>
      </div>
    </div>
  );
};

// ── Scene 3 ─────────────────────────────────────────────────────────────────
const S3: React.FC<{ t: number }> = ({ t }) => {
  const chips: [string, number, number, number][] = [
    ['Body of knowledge', 34.08, -330, -150],
    ['Tone', 35.76, 260, -170],
    ['Decision-making', 37.08, -340, 170],
    ['Point of view', 38.24, 260, 160],
  ];
  const lensP = prog(t, 28.32, 0.8, BACK);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
      <div style={{ width: 760 }}>
        <CodoRail t={t} at={22.6} active={0} />
        <div className="kit-h2" style={enter(t, 22.9, { y: 30 })}>
          Tell AI <span className="kit-mark" style={markStyle(t, 26.0)}>who it should become.</span>
        </div>
        <p className="kit-body" style={{ marginTop: 40, ...enter(t, 28.32, { y: 16 }) }}>
          The character is the lens for everything that follows.
        </p>
      </div>
      <div style={{ position: 'relative', width: 960, height: 700 }}>
        <svg width={960} height={700} style={{ position: 'absolute', inset: 0 }}>
          {chips.map(([, at, dx, dy], i) => {
            const p = prog(t, at - 0.2, 0.6);
            return <line key={i} x1={480} y1={350} x2={480 + dx * p * 0.85} y2={350 + dy * p * 0.85} stroke={LIME} strokeWidth={4} strokeDasharray="10 10" />;
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            left: 480 - 150,
            top: 350 - 150,
            width: 300,
            height: 300,
            borderRadius: '50%',
            border: `10px solid ${GREEN}`,
            background: `radial-gradient(circle at 35% 30%, #fff, ${LIME_SOFT})`,
            display: 'grid',
            placeItems: 'center',
            boxSizing: 'border-box',
            transform: `scale(${lensP})`,
            opacity: Math.min(1, lensP * 2),
            boxShadow: '0 20px 50px rgba(63,122,31,.18)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <PersonIcon size={110} />
            <div style={{ fontFamily: SANS, fontWeight: 700, fontSize: 24, letterSpacing: '.1em', color: GREEN }}>CHARACTER</div>
          </div>
        </div>
        {chips.map(([label, at, dx, dy]) => (
          <div key={label} style={{ position: 'absolute', left: 480 + dx, top: 350 + dy, transform: 'translate(-50%, -50%)' }}>
            <div style={enter(t, at, { y: 0, scale: 0.6, easing: BACK })}>
              <Chip lime>{label}</Chip>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Scene 4 ─────────────────────────────────────────────────────────────────
const S4: React.FC<{ t: number }> = ({ t }) => {
  const prompts: [string, string, number, number][] = [
    ['Act as', " the world's leading ghostwriter for Fortune 500 CEOs.", 41.36, 3.2],
    ['Be', ' a world-class keynote speaker, advising me on how to tell my story.', 46.96, 3.6],
    ['Emulate', ' a top-tier business coach, guiding me through a strategic pivot.', 52.72, 3.6],
  ];
  return (
    <>
      <CodoRail t={t} at={40.05} active={0} />
      <div className="kit-h2" style={enter(t, 40.16, { y: 24 })}>So you might say:</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 50 }}>
        {prompts.map(([verb, rest, at, dur], i) => {
          const full = verb + rest;
          const shown = typed(t, at, full, dur);
          const active = t >= at && (i === 2 || t < prompts[i + 1][2]);
          const dim = t >= at && !active ? 0.45 : 1;
          return (
            <div
              key={i}
              className="kit-card kit-ui"
              style={{
                padding: '30px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 26,
                borderColor: active ? LIME : LINE,
                boxShadow: active ? '0 14px 36px rgba(102,198,28,.16)' : 'none',
                opacity: dim * prog(t, at - 0.4, 0.4),
                transform: `translateY(${(1 - prog(t, at - 0.4, 0.5)) * 30}px)`,
              }}
            >
              <div style={{ width: 54, height: 54, borderRadius: 14, background: LIME_SOFT, display: 'grid', placeItems: 'center', flex: 'none' }}>
                <PersonIcon size={34} />
              </div>
              <div style={{ fontSize: 38, lineHeight: 1.3 }}>
                <span style={{ fontWeight: 700, color: GREEN }}>{shown.slice(0, verb.length)}</span>
                {shown.slice(verb.length)}
                {active && shown.length < full.length && <span style={{ display: 'inline-block', width: 3, height: 36, background: INK, marginLeft: 3, verticalAlign: -5 }} />}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// ── Scene 5 ─────────────────────────────────────────────────────────────────
const S5: React.FC<{ t: number }> = ({ t }) => {
  const rungs: [string, number | null][] = [
    ["World's leading expert", null],
    ['Top-tier advisor', null],
    ['Senior consultant', null],
    ['Research assistant', 64.64],
    ['Junior analyst', 63.2],
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 120 }}>
      <div style={{ width: 820 }}>
        <CodoRail t={t} at={57.95} active={0} />
        <div className="kit-h1" style={{ fontSize: 96, ...enter(t, 58.1, { y: 30 }) }}>
          Most people <span className="kit-mark" style={markStyle(t, 60.24)}>aim too low.</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: 720 }}>
        {rungs.map(([label, at], i) => {
          const hit = at !== null && t >= at;
          return (
            <div
              key={label}
              className="kit-card kit-ui"
              style={{
                padding: '24px 30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 32,
                fontWeight: 600,
                color: hit ? INK : at === null ? '#B5B5AE' : INK,
                borderColor: hit ? RED : LINE,
                background: hit ? '#FFF4EE' : '#fff',
                marginLeft: (4 - i) * 26,
                ...enter(t, 58.6 + (4 - i) * 0.15, { x: 40, y: 0 }),
              }}
            >
              {label}
              {hit && <span className="kit-tag" style={{ background: '#FBE3D6', color: RED }}>Where most aim</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── Scene 6 ─────────────────────────────────────────────────────────────────
const S6: React.FC<{ t: number }> = ({ t }) => {
  const cols: [string, string, number, number, boolean][] = [
    ['$150,000 advisor', 'per engagement', 70.52, 1, true],
    ['$20 intern', 'per hour', 73.36, 0.2, false],
  ];
  const effort = prog(t, 75.52, 1.0, IN_OUT);
  const out = prog(t, 78.48, 1.4, IN_OUT);
  const bar = (label: string, frac: number, color: string, note?: string) => (
    <div style={{ marginTop: 26 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 600, color: MUTED, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>
        <span>{label}</span>
        <span style={{ color: GREEN }}>{note}</span>
      </div>
      <div style={{ height: 30, borderRadius: 30, background: '#F1F1EC', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${frac * 100}%`, borderRadius: 30, background: color }} />
      </div>
    </div>
  );
  return (
    <>
      <CodoRail t={t} at={66.2} active={0} />
      <div className="kit-h2" style={enter(t, 66.3, { y: 24 })}>
        AI doesn't <span className="kit-mark" style={markStyle(t, 67.44)}>charge by the hour.</span>
      </div>
      <div style={{ display: 'flex', gap: 40, marginTop: 50 }}>
        {cols.map(([name, unit, at, outFrac, top]) => (
          <div key={name} className="kit-card kit-ui" style={{ flex: 1, padding: '32px 38px 38px', borderColor: top && t >= 78.48 ? LIME : LINE, ...enter(t, at, { y: 40, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <div style={{ fontFamily: SERIF, fontSize: 52, letterSpacing: '-0.02em' }}>{name}</div>
              <div style={{ fontSize: 24, color: MUTED }}>{unit}</div>
            </div>
            {bar('AI effort', effort * 0.5, '#BDBDB5', t >= 77.36 ? 'Same' : '')}
            {bar('Output', out * outFrac, top ? LIME : '#D6D6CE', top && t >= 79.52 ? 'Worlds apart' : '')}
          </div>
        ))}
      </div>
      <div className="kit-h2" style={{ marginTop: 50, ...enter(t, 81.2, { y: 24 }) }}>
        So <span className="kit-mark" style={markStyle(t, 81.5)}>aim high.</span>{' '}
        <span style={{ opacity: prog(t, 82.56, 0.4) }}>Always.</span>
      </div>
    </>
  );
};

// ── Scene 7 ─────────────────────────────────────────────────────────────────
const S7: React.FC<{ t: number }> = ({ t }) => {
  const ex: [string, string, number, number][] = [
    ['A talk', 'Persuade our board to increase investment', 93.68, 95.04],
    ['A post', 'Shift how our customers see this product', 98.76, 100.2],
  ];
  return (
    <>
      <CodoRail t={t} at={84.6} active={1} />
      <div className="kit-h2" style={enter(t, 84.8, { y: 24 })}>
        Clarify your actual goal, and <span className="kit-mark" style={markStyle(t, 91.04)}>why you need it.</span>
      </div>
      <div style={{ display: 'flex', gap: 40, marginTop: 60 }}>
        {ex.map(([what, why, at, whyAt]) => (
          <div key={what} className="kit-card kit-ui" style={{ flex: 1, overflow: 'hidden', ...enter(t, at, { y: 40, easing: BACK }) }}>
            <div style={{ padding: '28px 36px', display: 'flex', alignItems: 'center', gap: 22 }}>
              <span className="kit-tag" style={{ background: '#F1F1EC', color: MUTED }}>Deliverable</span>
              <span style={{ fontSize: 36, fontWeight: 600 }}>{what}</span>
            </div>
            <div style={{ padding: '30px 36px 36px', background: LIME_SOFT, borderTop: `2px solid ${LIME}`, opacity: prog(t, whyAt - 0.2, 0.5), transform: `translateY(${(1 - prog(t, whyAt - 0.2, 0.6)) * 30}px)` }}>
              <span className="kit-tag" style={{ background: LIME, color: '#fff' }}>Why</span>
              <div style={{ fontFamily: SERIF, fontSize: 44, lineHeight: 1.2, marginTop: 18, letterSpacing: '-0.02em' }}>{why}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 18, marginTop: 40, ...enter(t, 89.96, { y: 14 }) }}>
        <Chip style={{ color: MUTED, textDecoration: t >= 91.04 ? 'line-through' : 'none' }}>Not just the deliverable</Chip>
        <div style={enter(t, 91.04, { y: 0, x: -20 })}>
          <Chip lime>The reason behind it</Chip>
        </div>
      </div>
    </>
  );
};

// ── Scene 8 ─────────────────────────────────────────────────────────────────
const Target: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ flex: 'none' }}>
    <circle cx="50" cy="50" r="48" fill="#fff" stroke={LINE} strokeWidth="2" />
    <circle cx="50" cy="50" r="34" fill={LIME_SOFT} />
    <circle cx="50" cy="50" r="20" fill="#fff" stroke={LIME} strokeWidth="3" />
    <circle cx="50" cy="50" r="8" fill={GREEN} />
  </svg>
);
const S8: React.FC<{ t: number }> = ({ t }) => {
  const LANE_W = 1500;
  const TX = LANE_W - 120;
  const hit = prog(t, 104.56, 1.0, IN_OUT);
  const misses: [number, number, number][] = [
    [106.56, -95, 0.62],
    [107.3, 110, 0.74],
    [108.3, -40, 0.55],
  ];
  const lane = (label: string, good: boolean, at: number, children: React.ReactNode) => (
    <div className="kit-card" style={{ position: 'relative', height: 250, width: LANE_W, background: good ? '#fff' : '#FBFBF8', ...enter(t, at, { y: 30 }) }}>
      <div className="kit-ui" style={{ position: 'absolute', left: 34, top: 24, fontSize: 22, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: good ? GREEN : MUTED }}>{label}</div>
      <div style={{ position: 'absolute', left: TX - 80, top: 125 - 80 }}>
        <Target size={160} />
      </div>
      {children}
    </div>
  );
  const dart = (x: number, y: number, rot: number, color: string, key?: React.Key) => (
    <svg key={key} width={120} height={40} style={{ position: 'absolute', left: x - 110, top: y - 20, transform: `rotate(${rot}deg)`, transformOrigin: '110px 20px', overflow: 'visible' }}>
      <line x1={0} y1={20} x2={104} y2={20} stroke={color} strokeWidth={6} strokeLinecap="round" />
      <path d="M92 8 L112 20 L92 32" fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 20 L-14 8 M0 20 L-14 32" stroke={color} strokeWidth={5} strokeLinecap="round" />
    </svg>
  );
  return (
    <>
      <CodoRail t={t} at={103.35} active={1} />
      <div className="kit-h2" style={enter(t, 103.4, { y: 24 })}>
        The objective <span className="kit-mark" style={markStyle(t, 104.56)}>sets the direction.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 44 }}>
        {lane('With an objective', true, 103.6, hit > 0 && dart(interpolate(hit, [0, 1], [140, TX]), 125, 0, GREEN))}
        {lane('Format only', false, 105.76,
          misses.map(([at, dy, frac], i) => {
            const p = prog(t, at, 0.8, IN_OUT);
            if (p <= 0) return null;
            const x = interpolate(p, [0, 1], [140, 140 + (TX - 140) * frac]);
            const y = 125 + dy * p;
            return dart(x, y, Math.atan2(dy, (TX - 140) * frac) * 57.3, '#B8B8B0', i);
          }),
        )}
      </div>
      <p className="kit-body kit-muted" style={{ marginTop: 30, ...enter(t, 108.48, { y: 12 }) }}>
        Without it, the model can't align with <span className="kit-mark" style={{ color: INK, ...markStyle(t, 110.08) }}>your deeper intention.</span>
      </p>
    </>
  );
};

// ── Scene 9 ─────────────────────────────────────────────────────────────────
const S9: React.FC<{ t: number }> = ({ t }) => {
  const rules: [boolean, string, number][] = [
    [false, 'Jargon or buzzwords', 123.52],
    [true, 'Solutions under $5,000', 126.0],
    [false, 'Comparing us to competitors', 129.68],
  ];
  // Guardrails close in with every rule.
  const spread = interpolate(t, [123.52, 124.3, 126.0, 126.8, 129.68, 130.5], [250, 175, 175, 110, 110, 46], clamp);
  const railsOn = prog(t, 115.28, 0.8);
  const OX = 40;
  const OY = 300;
  const EX = 760;
  const rays = Array.from({ length: 19 }).map((_, i) => -250 + (i * 500) / 18);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
      <div style={{ width: 860 }}>
        <CodoRail t={t} at={112.25} active={2} />
        <div className="kit-h2" style={enter(t, 112.4, { y: 24 })}>
          Add your <span className="kit-mark" style={markStyle(t, 115.28)}>expert guardrails.</span>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 34 }}>
          {[['What works', 118.88], ["What doesn't", 119.84], ['What to avoid', 121.32]].map(([l, at]) => (
            <div key={l as string} style={enter(t, at as number, { y: 12, easing: BACK })}>
              <Chip style={{ fontSize: 24, padding: '10px 20px' }}>{l as string}</Chip>
            </div>
          ))}
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 34, padding: '14px 30px', ...enter(t, 122.3, { y: 20 }) }}>
          {rules.map(([ok, text, at], i) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '20px 0', borderTop: i ? `2px solid ${LINE}` : 'none', ...enter(t, at, { x: -30, y: 0 }) }}>
              {ok ? <Check size={40} /> : <Cross size={40} />}
              <span style={{ fontSize: 34, fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="kit-card" style={{ position: 'relative', width: 820, height: 600, background: '#FBFBF8', ...enter(t, 112.6, { y: 0, scale: 0.96 }) }}>
        <svg width={820} height={600} style={{ position: 'absolute', inset: 0 }}>
          {rays.map((dy, i) => {
            const inside = Math.abs(dy) <= spread + 1;
            return <line key={i} x1={OX} y1={OY} x2={EX} y2={OY + dy} stroke={inside ? (spread < 60 ? LIME : '#A9A99F') : '#E2E2DB'} strokeWidth={inside ? 4 : 3} strokeLinecap="round" />;
          })}
          {[-1, 1].map((s) => (
            <line key={s} x1={OX + 20} y1={OY + s * 22} x2={EX + 20} y2={OY + s * (spread + 22)} stroke={GREEN} strokeWidth={10} strokeLinecap="round" opacity={railsOn} />
          ))}
          <circle cx={OX} cy={OY} r={16} fill={GREEN} />
        </svg>
        <div className="kit-ui" style={{ position: 'absolute', left: 30, top: 24, fontSize: 22, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED }}>
          Possible outputs
        </div>
        <div className="kit-ui" style={{ position: 'absolute', right: 30, bottom: 24, fontSize: 24, fontWeight: 600, color: GREEN, opacity: prog(t, 130.6, 0.5) }}>
          Usable in your world
        </div>
      </div>
    </div>
  );
};

// ── Scene 10 ────────────────────────────────────────────────────────────────
const S10: React.FC<{ t: number }> = ({ t }) => {
  const youItems: [string, number][] = [
    ['You', 142.32],
    ['Your business', 144.0],
    ['Years of experience', 145.84],
  ];
  const dots = Array.from({ length: 140 }).map((_, i) => {
    const a = rand(i) * Math.PI * 2;
    const r = Math.sqrt(rand(i + 500)) * 230;
    return { x: 260 + Math.cos(a) * r, y: 260 + Math.sin(a) * r };
  });
  const flow = prog(t, 148.3, 1.0, IN_OUT);
  return (
    <>
      <CodoRail t={t} at={132.85} active={2} />
      <div className="kit-h2" style={enter(t, 133.0, { y: 24 })}>
        AI knows a lot. But it knows <span className="kit-mark" style={markStyle(t, 141.52)}>nothing about you.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 60, marginTop: 40 }}>
        <div style={{ position: 'relative', width: 520, height: 520, ...enter(t, 139.3, { y: 0, scale: 0.9 }) }}>
          <svg width={520} height={520} style={{ position: 'absolute', inset: 0 }}>
            <circle cx={260} cy={260} r={252} fill="#FBFBF8" stroke={LINE} strokeWidth={3} />
            {dots.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r={4} fill="#CFCFC6" />
            ))}
          </svg>
          <div className="kit-ui" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <div style={{ background: '#fff', padding: '12px 24px', borderRadius: 999, border: `2px solid ${LINE}`, fontSize: 28, fontWeight: 600 }}>What AI knows</div>
          </div>
        </div>
        <div style={{ width: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 22, color: RED, letterSpacing: '.1em', textTransform: 'uppercase', opacity: prog(t, 141.16, 0.4) * (1 - flow) }}>No overlap</div>
          <div style={{ transform: 'scaleX(-1)', opacity: flow }}>
            <Arrow t={t} at={148.3} w={260} />
          </div>
          <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 24, color: GREEN, opacity: prog(t, 148.8, 0.5) }}>Your Do's and Don'ts</div>
        </div>
        <div className="kit-card kit-ui" style={{ width: 640, padding: '30px 36px', borderColor: LIME, ...enter(t, 142.0, { y: 30 }) }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: GREEN, marginBottom: 12 }}>Only you know</div>
          {youItems.map(([label, at], i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '18px 0', borderTop: i ? `2px solid ${LINE}` : 'none', ...enter(t, at, { x: 30, y: 0 }) }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: LIME_SOFT, display: 'grid', placeItems: 'center' }}>
                <PersonIcon size={30} />
              </div>
              <span style={{ fontSize: 36, fontWeight: 600 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ── Scene 11 ────────────────────────────────────────────────────────────────
const S11: React.FC<{ t: number }> = ({ t }) => {
  const paraOn = prog(t, 156.96, 0.6);
  const card = (at: number, active: boolean, children: React.ReactNode, title: string) => (
    <div className="kit-card kit-ui" style={{ flex: 1, height: 560, padding: '28px 30px', display: 'flex', flexDirection: 'column', borderColor: active ? LIME : LINE, boxShadow: active ? '0 14px 36px rgba(102,198,28,.14)' : 'none', ...enter(t, at, { y: 40, easing: BACK }) }}>
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: active ? GREEN : MUTED, marginBottom: 22 }}>{title}</div>
      {children}
    </div>
  );
  const tag = (label: string, at: number) => (
    <span className="kit-tag" style={{ ...enter(t, at, { y: 8, easing: BACK }), display: 'inline-flex' }}>{label}</span>
  );
  return (
    <>
      <CodoRail t={t} at={150.25} active={3} />
      <div className="kit-h2" style={enter(t, 150.4, { y: 24 })}>
        Be clear about <span className="kit-mark" style={markStyle(t, 153.48)}>the deliverable itself.</span>
      </div>
      <div style={{ display: 'flex', gap: 30, marginTop: 44 }}>
        {card(155.4, t >= 155.4 && t < 161.44, (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 22, minHeight: 84 }}>
              {tag('1 page', 155.6)}
              {tag('5 paragraphs', 156.96)}
              {tag('Mid-length sentences', 158.32)}
              {tag('Academic tone', 160.04)}
            </div>
            <div style={{ flex: 1, border: `2px solid ${LINE}`, borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ opacity: i === 0 ? 1 : paraOn }}>
                  <Lines n={2} h={10} gap={8} w={[100, 70 + (i * 7) % 25]} />
                </div>
              ))}
            </div>
          </>
        ), 'One-page memo')}
        {card(161.44, t >= 161.44 && t < 164.48, (
          <div style={{ flex: 1, border: `2px solid ${LINE}`, borderRadius: 12, padding: 26, display: 'flex', flexDirection: 'column', gap: 26 }}>
            <div style={{ fontFamily: SERIF, fontSize: 40, lineHeight: 1.2 }}>Explain it simply.</div>
            <Lines n={3} h={22} gap={18} w={[90, 100, 55]} color="#DCEFC9" />
            <div style={{ marginTop: 'auto' }}>{tag('For a five-year-old', 163.04)}</div>
          </div>
        ), 'Simple explainer')}
        {card(164.48, t >= 164.48, (
          <div style={{ display: 'flex', gap: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: '#4A154B', flex: 'none' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 26, fontWeight: 700 }}>
                You <span style={{ fontWeight: 400, color: MUTED, fontSize: 20 }}>9:41 AM</span>
              </div>
              <div style={{ fontSize: 26, lineHeight: 1.45, marginTop: 8 }}>Hey team! Quick one: please send your Q3 numbers by Friday.</div>
              <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
                {tag('Casual', 165.52)}
                {tag('Directive', 166.4)}
              </div>
            </div>
          </div>
        ), 'Slack post')}
      </div>
    </>
  );
};

// ── Scene 12 ────────────────────────────────────────────────────────────────
const S12: React.FC<{ t: number }> = ({ t }) => {
  const files: [string, number][] = [
    ['Past reports', 171.12],
    ['Documents', 172.28],
    ['Emails', 173.08],
    ['Templates', 173.76],
  ];
  const good = prog(t, 177.04, 0.6, BACK);
  return (
    <>
      <CodoRail t={t} at={168.15} active={3} />
      <div className="kit-h2" style={enter(t, 168.2, { y: 24 })}>
        Even better: <span className="kit-mark" style={markStyle(t, 169.44)}>include examples.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 56 }}>
        <div style={enter(t, 168.6, { y: 30 })}>
          <Composer text="Write our Q3 update for the leadership team." w={760}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 18 }}>
              {files.map(([label, at]) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', border: `2px solid ${LIME}`, background: LIME_SOFT, borderRadius: 12, fontSize: 24, fontWeight: 600, ...enter(t, at, { y: -60, scale: 0.7, easing: BACK }) }}>
                  <FileIcon size={26} accent />
                  {label}
                </div>
              ))}
            </div>
          </Composer>
        </div>
        <div style={{ opacity: t >= 175.6 ? 1 : 0 }}>
          <Arrow t={t} at={175.6} w={170} />
        </div>
        <div className="kit-card kit-ui" style={{ position: 'relative', width: 640, padding: '30px 34px', ...enter(t, 175.92, { x: 40, y: 0 }) }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: GREEN, marginBottom: 20 }}>What good looks like</div>
          <div style={{ fontFamily: SERIF, fontSize: 38, marginBottom: 18 }}>Q3 update</div>
          <Lines n={6} h={11} gap={12} w={[100, 92, 97, 70, 100, 58]} />
          <div style={{ position: 'absolute', right: -24, top: -24, transform: `scale(${good})` }}>
            <Check size={72} />
          </div>
        </div>
      </div>
      <p className="kit-body" style={{ marginTop: 50, fontSize: 40, ...enter(t, 178.5, { y: 16 }) }}>
        Show AI what good looks like, and it <span className="kit-mark" style={markStyle(t, 179.12)}>gets there much faster.</span>
      </p>
    </>
  );
};

// ── Composition ─────────────────────────────────────────────────────────────
export const CodoPromptFramework: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CODO_TITLE_FRAMES}>
      <TitleCardGreen label="PROMPTING" title="The CODO Prompt Framework" />
    </Sequence>
    <Sequence from={CODO_TITLE_FRAMES}>
      <CodoBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
