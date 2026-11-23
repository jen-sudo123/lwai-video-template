import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { loadFont as loadMono } from '@remotion/google-fonts/IBMPlexMono';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
  BACK,
  Check,
  Cross,
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
  typed,
} from '../kit';

loadSerif();
loadSans();
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// The AI Model Landscape — custom concept composition (Lead with AI), built with src/kit.
// VO: audio/model-landscape.mp3 (Daan, eleven_v4, 247.5s). Every cue is the second of the word it
// names, from src/data/model-landscape.transcript.json (ElevenLabs Scribe). A 75-frame title card
// opens the video; the VO and all scenes start after it.
//
//  #  scene                                  start   VO cue
//  1  You already know the basics            0.00    "At this point, I'm assuming…"
//  2  Start with AI Fundamentals             20.88   "If not, start with our AI Fundamentals Training."
//  3  Today's route                          27.84   "Today is about understanding the AI model landscape."
//  4  Zoom out: the engine                   40.80   "So first, let's zoom out." / "engine behind an AI tool"
//  5  Model families                         53.45   "GPT and Claude are different families…"
//  6  New releases                           60.65   "there isn't just one version of each model"
//  7  Different strengths                    69.39   "Some are optimized for speed…"
//  8  The leaderboard moves                  84.29   "The landscape is constantly evolving."
//  9  Choose the right one                   93.08   "AI fluency isn't about mastering one specific model."
//  10 Chapter: common ground                 104.13  "Before we talk about differences…"
//  11 Patterns in data                       110.00  "trained on massive amounts of data"
//  12 Shared strengths + limitations         121.60  "similar baseline strengths" / "known limitations"
//  13 Same task, different results           146.96  "Even when models can perform the same task…"
//  14 The room: a second voice               157.20  "the only voice in the room" → "cognitive diversification"
//  15 Red-team a recommendation              180.88  "Imagine you're evaluating a strategic decision."
//  16 Faster vs more critically              196.32  "not … to go faster"
//  17 Agreement isn't accuracy               202.56  "agreement between models doesn't guarantee accuracy"
//  18 Dissenting views                       211.52  "Just like strong leaders seek out dissenting views…"
//  19 Your model mix                         219.46  "today's goal isn't to make you use multiple models…"
//  20 Closing                                239.18  "The goal isn't to use more AI."

export const MODEL_LANDSCAPE_DURATION_S = 249.0;
export const MODEL_LANDSCAPE_TITLE_FRAMES = 75;

const STARTS = [
  0, 20.88, 27.84, 40.8, 53.45, 60.65, 69.39, 84.29, 93.08, 104.13, 110.0, 121.6, 146.96, 157.2, 180.88, 196.32,
  202.56, 211.52, 219.46, 239.18,
];
const Scene = makeScene(STARTS, 0.5);

// ── Small building blocks ────────────────────────────────────────────────────
const SERIF = "'IBM Plex Serif', Georgia, serif";
const SANS = "'Public Sans', Arial, sans-serif";

const Label: React.FC<{ t: number; at: number; children: React.ReactNode }> = ({ t, at, children }) => (
  <div className="kit-label" style={enter(t, at, { y: 14 })}>{children}</div>
);

// A model "tile": rounded square with a monogram, used for GPT / Claude / generic models.
const ModelTile: React.FC<{ name: string; size?: number; lit?: number; sub?: string; style?: React.CSSProperties }> = ({
  name,
  size = 150,
  lit = 0,
  sub,
  style,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, ...style }}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.24,
        background: lit > 0.5 ? INK : '#fff',
        border: `3px solid ${lit > 0.5 ? INK : LINE}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: SERIF,
        fontSize: size * 0.3 * Math.min(1, 4 / name.length),
        color: lit > 0.5 ? '#fff' : INK,
        boxShadow: lit > 0.5 ? `0 0 0 ${8 * lit}px ${LIME_SOFT}` : 'none',
      }}
    >
      {name}
    </div>
    {sub && <div className="kit-ui" style={{ fontSize: 24, fontWeight: 600, color: MUTED, letterSpacing: '.04em' }}>{sub}</div>}
  </div>
);

const Strike: React.FC<{ t: number; at: number; children: React.ReactNode; color?: string }> = ({ t, at, children, color = RED }) => {
  const p = prog(t, at, 0.5, IN_OUT);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ opacity: 1 - p * 0.55 }}>{children}</span>
      <span style={{ position: 'absolute', left: 0, top: '54%', height: 6, width: `${p * 100}%`, background: color, borderRadius: 3 }} />
    </span>
  );
};

const Bolt: React.FC<{ size?: number; color?: string }> = ({ size = 56, color = INK }) => (
  <svg width={size} height={size} viewBox="0 0 24 24"><path d="M13.5 2L4 13.5h6.5L9.5 22 20 9.5h-6.5z" fill={color} /></svg>
);
const Person: React.FC<{ size?: number; color?: string }> = ({ size = 56, color = INK }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <circle cx="12" cy="7.5" r="4.2" fill={color} />
    <path d="M3.5 21.5c.8-4.6 4.2-7.2 8.5-7.2s7.7 2.6 8.5 7.2z" fill={color} />
  </svg>
);

// ── Scene bodies ─────────────────────────────────────────────────────────────

// 1 — You already know the basics (0 → 20.88)
const Basics: React.FC<{ t: number }> = ({ t }) => {
  const tokens = ['The', ' model', ' predicts', ' the', ' next', ' token', ' …'];
  const tokP = prog(t, 15.04, 1.6, Easing.linear);
  const shown = Math.floor(tokP * tokens.length + 0.0001);
  return (
    <>
      <Label t={t} at={0.1}>Before we start</Label>
      <div className="kit-h2" style={enter(t, 0.3, { dur: 0.9, y: 30 })}>
        You already know <span className="kit-mark" style={markStyle(t, 3.2)}>the basics.</span>
      </div>
      <div style={{ display: 'flex', gap: 22, marginTop: 40 }}>
        {[
          ['How they work', 6.56],
          ["What they're good at", 7.68],
          ['Where they fail', 9.04],
        ].map(([s, at]) => (
          <div key={s as string} className="kit-pill" style={enter(t, at as number, { y: 0, scale: 0.7, easing: BACK })}>
            <Check size={30} /> {s}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 34, marginTop: 56 }}>
        {/* hallucination */}
        <div className="kit-card" style={{ padding: 34, height: 300, ...enter(t, 11.6, { y: 40 }) }}>
          <div className="kit-tag" style={{ background: '#FDE8DF', color: RED }}>Hallucinations</div>
          <p className="kit-body" style={{ fontSize: 30, marginTop: 30 }}>
            “The report was published in{' '}
            <span style={{ textDecoration: `underline wavy ${RED}`, textDecorationThickness: 3, textUnderlineOffset: 8, textDecorationColor: prog(t, 12.6, 0.4) > 0.5 ? RED : 'transparent' }}>
              2017
            </span>
            .”
          </p>
          <div className="kit-ui" style={{ fontSize: 22, color: RED, marginTop: 18, ...enter(t, 13.0, { y: 8 }) }}>Fluent. Confident. Wrong.</div>
        </div>
        {/* token by token */}
        <div className="kit-card" style={{ padding: 34, height: 300, ...enter(t, 13.6, { y: 40 }) }}>
          <div className="kit-tag">Token by token</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 30 }}>
            {tokens.slice(0, shown).map((tk, i) => (
              <span key={i} className="kit-mono" style={{ fontSize: 26, padding: '6px 12px', borderRadius: 10, background: i === shown - 1 ? LIME_SOFT : '#F3F3F0', border: `1.5px solid ${LINE}` }}>
                {tk.trim()}
              </span>
            ))}
          </div>
        </div>
        {/* human judgment */}
        <div className="kit-card" style={{ padding: 34, height: 300, borderColor: prog(t, 18.4, 0.5) > 0.5 ? LIME : LINE, ...enter(t, 16.7, { y: 40 }) }}>
          <div className="kit-tag">Stays human</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 30 }}>
            <Person size={78} />
            <div className="kit-body" style={{ fontSize: 32, lineHeight: 1.3 }}>
              <div style={enter(t, 16.88, { x: -16, y: 0 })}>Judgment</div>
              <div style={enter(t, 17.52, { x: -16, y: 0 })}>Accountability</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// 2 — Start with AI Fundamentals (20.88 → 27.84)
const Fundamentals: React.FC<{ t: number }> = ({ t }) => {
  const fill = prog(t, 23.6, 2.6, IN_OUT);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
      <div style={{ flex: 1 }}>
        <Label t={t} at={20.95}>New to this?</Label>
        <div className="kit-h2" style={enter(t, 21.1, { dur: 0.9, y: 30 })}>
          Start with <span className="kit-mark" style={markStyle(t, 22.4)}>AI Fundamentals.</span>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 34, ...enter(t, 24.4, { y: 16 }) }}>
          The context you'll need for the rest of this lesson.
        </p>
      </div>
      <div className="kit-card" style={{ width: 640, padding: 40, boxShadow: '0 24px 60px rgba(0,0,0,.08)', ...enter(t, 22.2, { x: 60, y: 0, dur: 0.8 }) }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="kit-tag">Course</div>
          <div className="kit-ui" style={{ fontSize: 20, color: MUTED }}>Lead with AI</div>
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 46, marginTop: 28, lineHeight: 1.1 }}>AI Fundamentals Training</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
          {['How LLMs work', 'Strengths and failure modes', 'Judgment stays human'].map((s, i) => (
            <div key={s} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26 }}>
              {fill > (i + 1) / 3.2 ? <Check size={28} /> : <div style={{ width: 28, height: 28, borderRadius: 14, border: `2.5px solid ${LINE}` }} />}
              {s}
            </div>
          ))}
        </div>
        <div style={{ height: 12, borderRadius: 6, background: '#EEE', marginTop: 34, overflow: 'hidden' }}>
          <div style={{ width: `${fill * 100}%`, height: '100%', background: LIME }} />
        </div>
      </div>
    </div>
  );
};

// 3 — Today's route (27.84 → 40.80)
const Route: React.FC<{ t: number }> = ({ t }) => {
  const stops: Array<[string, string, number]> = [
    ['Where models are', 'similar', 32.48],
    ['Where they', 'differ', 34.24],
    ['How to choose', 'intentionally', 36.96],
  ];
  const draw = prog(t, 31.6, 5.6, Easing.linear);
  return (
    <>
      <Label t={t} at={27.95}>Today</Label>
      <div className="kit-h1" style={enter(t, 28.1, { dur: 0.9, y: 34 })}>
        The AI <span className="kit-mark" style={markStyle(t, 29.8)}>model landscape</span>
      </div>
      <div style={{ position: 'relative', height: 300, marginTop: 70 }}>
        <svg width={1760} height={120} style={{ position: 'absolute', left: 0, top: 30 }}>
          <path d="M 40 60 C 300 0, 520 120, 820 60 S 1340 0, 1640 60" fill="none" stroke={LINE} strokeWidth={5} strokeDasharray="4 14" strokeLinecap="round" />
          <path d="M 40 60 C 300 0, 520 120, 820 60 S 1340 0, 1640 60" fill="none" stroke={LIME} strokeWidth={6} strokeLinecap="round" pathLength={1} strokeDasharray={`${draw} 1`} />
        </svg>
        {stops.map(([a, b, at], i) => {
          const x = [40, 820, 1640][i];
          return (
            <div key={b} style={{ position: 'absolute', left: x - 22, top: 68, ...enter(t, at - 0.3, { y: 0, scale: 0.4, easing: BACK }) }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: '#fff', border: `6px solid ${GREEN}` }} />
              <div style={{ position: 'absolute', top: 70, left: i === 0 ? 0 : i === 2 ? undefined : -170, right: i === 2 ? 0 : undefined, width: 400, textAlign: i === 0 ? 'left' : i === 2 ? 'right' : 'center' }}>
                <div className="kit-ui" style={{ fontSize: 28, color: MUTED }}>{a}</div>
                <div style={{ fontFamily: SERIF, fontSize: 46 }}>{b}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// 4 — Zoom out: the model is the engine (40.80 → 53.45)
const Engine: React.FC<{ t: number }> = ({ t }) => {
  const zoom = interpolate(prog(t, 42.0, 1.6, IN_OUT), [0, 1], [2.3, 1]);
  const pulse = 0.5 + 0.5 * Math.sin(t * 5);
  const flowIn = prog(t, 46.64, 1.0, IN_OUT);
  const flowOut = prog(t, 48.24, 1.0, IN_OUT);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div className="kit-pad" style={{ justifyContent: 'flex-start', paddingTop: 110 }}>
        <Label t={t} at={42.2}>Zoom out</Label>
        <div className="kit-h2" style={enter(t, 43.8, { dur: 0.8, y: 24 })}>
          An AI model is the <span className="kit-mark" style={markStyle(t, 51.08)}>engine</span> behind an AI tool.
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 380, height: 520, transform: `scale(${zoom})`, transformOrigin: '50% 22%' }}>
        {/* the AI tool (what users see) */}
        <div className="kit-card" style={{ position: 'absolute', left: 560, top: 0, width: 800, height: 150, display: 'flex', alignItems: 'center', gap: 20, padding: '0 34px', boxShadow: '0 18px 50px rgba(0,0,0,.07)' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => <div key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />)}
          </div>
          <div className="kit-ui" style={{ flex: 1, fontSize: 28, border: `2px solid ${LINE}`, borderRadius: 16, padding: '16px 22px', color: MUTED }}>
            {typed(t, 40.9, 'Summarize this report for my team', 1.0)}
          </div>
          <div className="kit-tag">AI tool</div>
        </div>
        {/* engine */}
        <div style={{ position: 'absolute', left: 760, top: 260, width: 400, height: 200, borderRadius: 34, background: INK, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${10 + pulse * 10}px ${LIME_SOFT}`, ...enter(t, 43.84, { y: 30, dur: 0.8 }) }}>
          <div style={{ fontFamily: SANS, fontSize: 20, letterSpacing: '.18em', color: LIME, fontWeight: 700 }}>AI MODEL</div>
          <div style={{ fontFamily: SERIF, fontSize: 44, marginTop: 8 }}>the engine</div>
        </div>
        <div style={{ position: 'absolute', left: 958, top: 150, width: 5, height: 110 * flowIn, background: GREEN }} />
        {/* instructions / responses */}
        <div style={{ position: 'absolute', left: 200, top: 330, width: 400, ...enter(t, 46.64, { x: -30, y: 0 }) }}>
          <div className="kit-ui" style={{ fontSize: 22, color: MUTED, fontWeight: 600, letterSpacing: '.08em' }}>PROCESSES</div>
          <div style={{ fontFamily: SERIF, fontSize: 40 }}>your instructions</div>
          <div style={{ height: 5, width: 160 * flowIn, background: GREEN, marginTop: 18, marginLeft: 220 }} />
        </div>
        <div style={{ position: 'absolute', left: 1260, top: 330, width: 460, ...enter(t, 48.24, { x: 30, y: 0 }) }}>
          <div style={{ height: 5, width: 160 * flowOut, background: GREEN, marginBottom: 18, marginLeft: -100 }} />
          <div className="kit-ui" style={{ fontSize: 22, color: MUTED, fontWeight: 600, letterSpacing: '.08em' }}>GENERATES</div>
          <div style={{ fontFamily: SERIF, fontSize: 40 }}>responses</div>
        </div>
      </div>
    </div>
  );
};

// 5 — Model families (53.45 → 60.65)
const Families: React.FC<{ t: number }> = ({ t }) => (
  <>
    <Label t={t} at={53.6}>For example</Label>
    <div className="kit-h2" style={enter(t, 53.7, { dur: 0.8, y: 24 })}>
      Different <span className="kit-mark" style={markStyle(t, 56.56)}>families</span> of AI models.
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', gap: 260, marginTop: 80 }}>
      {[
        ['GPT', 54.4, 'OpenAI'],
        ['Claude', 55.36, 'Anthropic'],
      ].map(([n, at, co]) => (
        <div key={n as string} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, ...enter(t, (at as number) - 0.15, { y: 40, scale: 0.8, easing: BACK }) }}>
          <ModelTile name={n as string} size={220} lit={1} />
          <div className="kit-ui" style={{ fontSize: 30, color: MUTED, ...enter(t, 59.2, { y: 10 }) }}>by {co}</div>
        </div>
      ))}
    </div>
  </>
);

// 6 — New releases (60.65 → 69.39)
const Releases: React.FC<{ t: number }> = ({ t }) => {
  const rows: Array<[string, number]> = [
    ['GPT', 0],
    ['Claude', 1],
  ];
  const dots = [63.8, 64.4, 65.0, 65.5, 66.0];
  return (
    <>
      <Label t={t} at={60.75}>Not one version</Label>
      <div className="kit-h2" style={enter(t, 60.85, { dur: 0.8, y: 24 })}>
        Developers <span className="kit-mark" style={markStyle(t, 64.16)}>release new models</span> regularly.
      </div>
      <div style={{ position: 'relative', marginTop: 70, height: 330 }}>
        {rows.map(([n, r]) => (
          <div key={n} style={{ position: 'absolute', left: 0, right: 0, top: r * 150, display: 'flex', alignItems: 'center', gap: 40 }}>
            <div style={{ width: 160, fontFamily: SERIF, fontSize: 44 }}>{n}</div>
            <div style={{ position: 'relative', flex: 1, height: 80 }}>
              <div style={{ position: 'absolute', left: 0, top: 38, height: 4, width: `${prog(t, 61.6, 4.6, Easing.linear) * 100}%`, background: LINE }} />
              {dots.map((at, i) => (
                <div key={i} style={{ position: 'absolute', left: `${4 + i * 22 + r * 6}%`, top: 14, ...enter(t, at + r * 0.25, { y: 0, scale: 0.3, easing: BACK }) }}>
                  <div className="kit-pill" style={{ padding: '10px 20px', fontSize: 24, background: i === dots.length - 1 ? LIME_SOFT : '#fff' }}>
                    v{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 22 }}>
        {[
          ['Capabilities', 66.88],
          ['Strengths', 67.52],
          ['Performance', 68.56],
        ].map(([s, at]) => (
          <div key={s as string} className="kit-tag" style={{ fontSize: 22, padding: '10px 22px', ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>
            {s}
          </div>
        ))}
      </div>
    </>
  );
};

// 7 — Different strengths (69.39 → 84.29)
const Strengths: React.FC<{ t: number }> = ({ t }) => {
  const tiles: Array<{ k: string; h: string; at: number; art: React.ReactNode }> = [
    { k: 'Speed', h: 'Everyday tasks', at: 71.52, art: <Bolt size={70} color={GREEN} /> },
    {
      k: 'Reasoning',
      h: 'Complex problems, coding',
      at: 75.32,
      art: (
        <svg width={150} height={70} viewBox="0 0 150 70">
          {[[15, 50], [55, 20], [95, 45], [135, 15]].map(([x, y], i, a) => (
            <g key={i}>
              {i > 0 && <line x1={a[i - 1][0]} y1={a[i - 1][1]} x2={x} y2={y} stroke={GREEN} strokeWidth={4} strokeDasharray="120" strokeDashoffset={120 * (1 - prog(t, 75.6 + i * 0.25, 0.4))} />}
              <circle cx={x} cy={y} r={10} fill={prog(t, 75.4 + i * 0.25, 0.3) > 0.5 ? GREEN : LINE} />
            </g>
          ))}
        </svg>
      ),
    },
    {
      k: 'Long context',
      h: 'Large amounts of information',
      at: 77.84,
      art: (
        <div style={{ position: 'relative', width: 120, height: 76 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ position: 'absolute', left: i * 12, top: 16 - i * 4 + 20 * (1 - prog(t, 78.0 + i * 0.12, 0.4)), width: 64, height: 60, background: '#fff', border: `2.5px solid ${GREEN}`, borderRadius: 6, opacity: prog(t, 78.0 + i * 0.12, 0.4) }} />
          ))}
        </div>
      ),
    },
    {
      k: 'Multimodal',
      h: 'Images, audio, video',
      at: 82.32,
      art: (
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {[82.32, 83.28, 83.84].map((at, i) => (
            <div key={i} style={{ ...enter(t, at, { y: 0, scale: 0.4, easing: BACK }) }}>
              {i === 0 && (
                <svg width={52} height={52} viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="3" fill="none" stroke={GREEN} strokeWidth="2" /><path d="M5 17l5-5 4 4 2-2 3 3" fill="none" stroke={GREEN} strokeWidth="2" /><circle cx="16" cy="9" r="1.8" fill={GREEN} /></svg>
              )}
              {i === 1 && (
                <svg width={52} height={52} viewBox="0 0 24 24">{[4, 8, 12, 16, 20].map((x, j) => <rect key={x} x={x - 1} y={12 - [3, 7, 9, 6, 2][j]} width="2.4" height={[3, 7, 9, 6, 2][j] * 2} rx="1.2" fill={GREEN} />)}</svg>
              )}
              {i === 2 && (
                <svg width={52} height={52} viewBox="0 0 24 24"><rect x="2" y="5" width="15" height="14" rx="3" fill="none" stroke={GREEN} strokeWidth="2" /><path d="M17 10l5-3v10l-5-3z" fill={GREEN} /></svg>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];
  return (
    <>
      <Label t={t} at={69.5}>Different strengths</Label>
      <div className="kit-h2" style={enter(t, 69.6, { dur: 0.8, y: 24 })}>
        Each model is <span className="kit-mark" style={markStyle(t, 71.0)}>built for something.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 60 }}>
        {tiles.map((x) => {
          const on = prog(t, x.at, 0.5);
          return (
            <div key={x.k} className="kit-card" style={{ height: 340, padding: 34, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderColor: on > 0.5 ? LIME : LINE, ...enter(t, x.at - 0.2, { y: 50, dur: 0.6 }) }}>
              <div style={{ height: 80, display: 'flex', alignItems: 'center' }}>{x.art}</div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: 44 }}>{x.k}</div>
                <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 8 }}>{x.h}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// 8 — The leaderboard moves (84.29 → 93.08)
const Leaderboard: React.FC<{ t: number }> = ({ t }) => {
  const swap = prog(t, 91.2, 1.2, IN_OUT);
  const rows = [
    { n: 'Model A', a: 0.92, b: 0.78 },
    { n: 'Model B', a: 0.74, b: 0.96 },
    { n: 'Model C', a: 0.6, b: 0.66 },
  ];
  const grow = prog(t, 86.0, 1.4, IN_OUT);
  // rank position: A starts top, B overtakes
  const pos = (i: number) => (i === 0 ? swap : i === 1 ? 1 - swap : 2);
  return (
    <>
      <Label t={t} at={84.4}>Constantly evolving</Label>
      <div className="kit-h2" style={enter(t, 84.5, { dur: 0.8, y: 24 })}>
        Strongest today. <span className="kit-mark" style={markStyle(t, 91.4)}>Overtaken tomorrow.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 50, ...enter(t, 87.6, { y: 10 }) }}>
        <div className="kit-tag">One task</div>
        <div className="kit-ui" style={{ fontSize: 26, color: MUTED }}>{t < 91.2 ? 'Today' : 'Tomorrow'}</div>
      </div>
      <div style={{ position: 'relative', height: 360, marginTop: 30 }}>
        {rows.map((r, i) => {
          const v = (r.a + (r.b - r.a) * swap) * grow;
          const top = pos(i) * 116;
          const leader = pos(i) < 0.5;
          return (
            <div key={r.n} style={{ position: 'absolute', left: 0, right: 0, top, display: 'flex', alignItems: 'center', gap: 30 }}>
              <div style={{ width: 70, fontFamily: SERIF, fontSize: 44, color: leader ? GREEN : MUTED }}>{Math.round(pos(i)) + 1}</div>
              <div style={{ width: 220, fontFamily: SANS, fontWeight: 600, fontSize: 32 }}>{r.n}</div>
              <div style={{ flex: 1, height: 64, background: '#F3F3F0', borderRadius: 14, overflow: 'hidden' }}>
                <div style={{ width: `${v * 100}%`, height: '100%', background: leader ? LIME : '#CFCFC8', borderRadius: 14 }} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

// 9 — Choose the right one for the task (93.08 → 104.13)
const ChooseRight: React.FC<{ t: number }> = ({ t }) => {
  const models = ['Fast model', 'Reasoning model', 'Multimodal model'];
  const link = prog(t, 102.4, 0.8, IN_OUT);
  return (
    <>
      <Label t={t} at={93.2}>AI fluency</Label>
      <div className="kit-h2" style={enter(t, 93.3, { dur: 0.8, y: 24 })}>
        <Strike t={t} at={96.2}>Mastering one model.</Strike>
      </div>
      <div className="kit-h2" style={{ marginTop: 10, ...enter(t, 98.4, { dur: 0.8, y: 24 }) }}>
        <span className="kit-mark" style={markStyle(t, 102.3)}>Choosing the right one.</span>
      </div>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 0, marginTop: 64, height: 300 }}>
        <div className="kit-card" style={{ width: 420, padding: 30, ...enter(t, 101.0, { x: -40, y: 0 }) }}>
          <div className="kit-tag">The task</div>
          <div style={{ fontFamily: SERIF, fontSize: 36, marginTop: 16 }}>Analyze a 90-page contract</div>
        </div>
        <svg width={400} height={300} style={{ flex: 'none' }}>
          {[50, 150, 250].map((y, i) => (
            <path key={y} d={`M 0 150 C 200 150, 200 ${y}, 400 ${y}`} fill="none" stroke={i === 1 ? GREEN : LINE} strokeWidth={i === 1 ? 6 : 3} strokeDasharray={i === 1 ? undefined : '6 10'} pathLength={1} style={{ strokeDasharray: i === 1 ? `${link} 1` : undefined, opacity: i === 1 ? 1 : prog(t, 100.2, 0.6) }} />
          ))}
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          {models.map((m, i) => (
            <div key={m} className="kit-pill" style={{ width: 420, justifyContent: 'space-between', borderColor: i === 1 && link > 0.9 ? LIME : LINE, background: i === 1 && link > 0.9 ? LIME_SOFT : '#fff', ...enter(t, 99.9 + i * 0.25, { x: 30, y: 0 }) }}>
              {m} {i === 1 && link > 0.9 && <Check size={30} />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// 10 — Chapter: common ground (104.13 → 110.0)
const Chapter: React.FC<{ t: number }> = ({ t }) => {
  const a = prog(t, 104.2, 0.9, IN_OUT);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${a * 38}%`, background: LIME_SOFT }} />
      <div className="kit-pad">
        <Label t={t} at={104.6}>Before the differences</Label>
        <div className="kit-h1" style={enter(t, 104.9, { dur: 0.9, y: 34 })}>
          What they have <span className="kit-mark" style={markStyle(t, 108.8)}>in common.</span>
        </div>
      </div>
    </div>
  );
};

// 11 — Patterns in data (110 → 121.6)
const Patterns: React.FC<{ t: number }> = ({ t }) => {
  const cols = 34;
  const rowsN = 9;
  const pattern = (c: number, r: number) => Math.abs(Math.sin(c * 0.45) * 4 + 4 - r) < 0.9;
  const pat = prog(t, 115.76, 1.2, IN_OUT);
  const chips: Array<[string, number]> = [
    ['Language', 116.16],
    ['Code', 117.16],
    ['Images', 118.96],
    ['Audio', 119.88],
    ['Video', 120.4],
  ];
  return (
    <>
      <Label t={t} at={110.1}>How they work</Label>
      <div className="kit-h2" style={enter(t, 110.2, { dur: 0.8, y: 24 })}>
        Massive data in. <span className="kit-mark" style={markStyle(t, 115.76)}>Patterns</span> out.
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16, marginTop: 56, width: 1760 }}>
        {Array.from({ length: cols * rowsN }).map((_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          const appear = prog(t, 111.6 + ((c * 7 + r * 13) % 40) * 0.025, 0.4);
          const on = pattern(c, r) ? pat : 0;
          return (
            <div key={i} style={{ width: 18, height: 18, borderRadius: 9, justifySelf: 'center', background: on > 0.5 ? GREEN : '#D9D9D2', opacity: appear * (on > 0.5 ? 1 : 1 - pat * 0.5), transform: `scale(${1 + on * 0.35})` }} />
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 50 }}>
        {chips.map(([s, at]) => (
          <div key={s} className="kit-pill" style={enter(t, at, { y: 0, scale: 0.6, easing: BACK })}>{s}</div>
        ))}
      </div>
    </>
  );
};

// 12 — Shared strengths + limitations (121.6 → 146.96)
const Shared: React.FC<{ t: number }> = ({ t }) => {
  const rows: Array<{ s: string; at: number; good: boolean }> = [
    { s: 'Thinking, drafting, analysis', at: 126.0, good: true },
    { s: 'Files and long documents', at: 131.44, good: true },
    { s: 'Summarize, synthesize, ideate', at: 134.08, good: true },
    { s: 'Missing context', at: 141.68, good: false },
    { s: 'Confident-sounding errors', at: 143.04, good: false },
    { s: 'Over-generalization', at: 144.96, good: false },
  ];
  const models = ['Model A', 'Model B', 'Model C'];
  return (
    <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
      <div style={{ width: 560 }}>
        <Label t={t} at={121.7}>Shared by most</Label>
        <div className="kit-h2" style={enter(t, 121.8, { dur: 0.8, y: 24 })}>
          Same <span className="kit-mark" style={markStyle(t, 124.96)}>strengths.</span>
        </div>
        <div className="kit-h2" style={{ marginTop: 8, ...enter(t, 139.6, { dur: 0.8, y: 24 }) }}>
          Same <span className="kit-mark" style={{ ...markStyle(t, 140.4), backgroundImage: `linear-gradient(#FBD9CB, #FBD9CB)` }}>limits.</span>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 130px 130px 130px', alignItems: 'center', rowGap: 0 }}>
          <div />
          {models.map((m, i) => (
            <div key={m} className="kit-ui" style={{ textAlign: 'center', fontWeight: 700, fontSize: 22, color: MUTED, paddingBottom: 16, ...enter(t, 122.4 + i * 0.2, { y: 10 }) }}>{m}</div>
          ))}
          {rows.map((r, ri) => (
            <React.Fragment key={r.s}>
              <div className="kit-ui" style={{ fontSize: 28, padding: '20px 0', borderTop: `2px solid ${ri === 3 ? INK : LINE}`, ...enter(t, r.at - 0.2, { x: -20, y: 0 }) }}>{r.s}</div>
              {models.map((m, i) => (
                <div key={m} style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', borderTop: `2px solid ${ri === 3 ? INK : LINE}` }}>
                  <div style={enter(t, r.at + 0.12 * i, { y: 0, scale: 0.3, dur: 0.45, easing: BACK })}>{r.good ? <Check size={36} /> : <Cross size={36} />}</div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

// 13 — Same task, different results (146.96 → 157.2)
const SameTask: React.FC<{ t: number }> = ({ t }) => {
  const split = prog(t, 153.2, 0.9, IN_OUT);
  const useful = prog(t, 155.6, 1.2, IN_OUT);
  return (
    <>
      <Label t={t} at={147.1}>The important distinction</Label>
      <div className="kit-h2" style={enter(t, 147.2, { dur: 0.8, y: 24 })}>
        Same task. <span className="kit-mark" style={markStyle(t, 156.0)}>Different results.</span>
      </div>
      <div style={{ position: 'relative', height: 520, marginTop: 40 }}>
        <div className="kit-card" style={{ position: 'absolute', left: 660, top: 0, width: 440, padding: '22px 28px', ...enter(t, 150.8, { y: 20 }) }}>
          <div className="kit-tag">Same prompt</div>
          <div className="kit-ui" style={{ fontSize: 28, marginTop: 10 }}>“Draft our Q3 update”</div>
        </div>
        {[0, 1].map((side) => (
          <div key={side} className="kit-card" style={{ position: 'absolute', top: 200, left: 660 + (side === 0 ? -1 : 1) * 460 * split, width: 440, height: 290, padding: 28, opacity: split }}>
            <div className="kit-ui" style={{ fontWeight: 700, fontSize: 22, color: MUTED }}>{side === 0 ? 'Model A' : 'Model B'}</div>
            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {side === 0
                ? [0.9, 0.7, 0.8, 0.5].map((w, i) => <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center' }}><div style={{ width: 10, height: 10, borderRadius: 5, background: INK }} /><div style={{ height: 14, width: `${w * 100}%`, background: '#E8E8E2', borderRadius: 7 }} /></div>)
                : [1, 1, 0.95, 1, 0.6].map((w, i) => <div key={i} style={{ height: 14, width: `${w * 100}%`, background: '#E8E8E2', borderRadius: 7 }} />)}
            </div>
            <div style={{ position: 'absolute', left: 28, right: 28, bottom: 26 }}>
              <div className="kit-ui" style={{ fontSize: 18, color: MUTED, fontWeight: 600, letterSpacing: '.08em', marginBottom: 8 }}>USEFUL FOR YOU</div>
              <div style={{ height: 12, background: '#F0F0EC', borderRadius: 6 }}>
                <div style={{ height: '100%', width: `${useful * (side === 0 ? 85 : 45)}%`, background: side === 0 ? LIME : '#CFCFC8', borderRadius: 6 }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

// 14 — The room: one voice, then a second (157.2 → 180.88)
const Room: React.FC<{ t: number }> = ({ t }) => {
  const second = prog(t, 168.56, 0.7, BACK);
  const bubbles: Array<[string, number]> = [
    ['Challenge the assumptions', 169.84],
    ['Reframe the problem', 171.12],
    ['Expose blind spots', 172.6],
    ['Does it hold up?', 174.32],
  ];
  const cx = 1270;
  const cy = 470;
  const seats = [-150, -90, -30, 30, 90, 150].map((a) => (a * Math.PI) / 180);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div className="kit-pad" style={{ width: 760, justifyContent: 'center' }}>
        <Label t={t} at={157.4}>An important insight</Label>
        <div className="kit-h2" style={{ fontSize: 64, ...enter(t, 159.7, { dur: 0.8, y: 24 }) }}>
          {t < 166.0 ? (
            <>Don't make one model <span className="kit-mark" style={markStyle(t, 163.68)}>the only voice</span> in the room.</>
          ) : (
            <>Bring in a <span className="kit-mark" style={markStyle(t, 168.56)}>second model.</span></>
          )}
        </div>
        <div style={{ marginTop: 50, ...enter(t, 178.6, { y: 20 }) }}>
          <div className="kit-tag" style={{ fontSize: 22, padding: '12px 24px' }}>Cognitive diversification</div>
        </div>
      </div>
      {/* table */}
      <div style={{ position: 'absolute', left: cx - 240, top: cy - 150, width: 480, height: 300, borderRadius: 150, background: '#F4F4EF', border: `3px solid ${LINE}`, ...enter(t, 157.6, { y: 0, scale: 0.9 }) }} />
      {seats.map((a, i) => {
        const x = cx + Math.cos(a) * 330;
        const y = cy + Math.sin(a) * 230 + (i < 3 ? 0 : 0);
        return (
          <div key={i} style={{ position: 'absolute', left: x - 38, top: y - 38, ...enter(t, 157.8 + i * 0.08, { y: 0, scale: 0.5 }) }}>
            <div style={{ width: 76, height: 76, borderRadius: 38, background: '#fff', border: `3px solid ${LINE}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Person size={42} color="#BDBDB5" />
            </div>
          </div>
        );
      })}
      {/* model one: speaks */}
      <div style={{ position: 'absolute', left: cx - 360 - 70, top: cy - 70, ...enter(t, 159.76, { y: 0, scale: 0.5, easing: BACK }) }}>
        <ModelTile name="AI" size={140} lit={1} />
      </div>
      <div className="kit-card" style={{ position: 'absolute', left: cx - 330, top: cy - 300, padding: '16px 24px', borderRadius: '22px 22px 22px 4px', opacity: prog(t, 160.4, 0.4) * (1 - prog(t, 168.4, 0.4)) }}>
        <div className="kit-ui" style={{ fontSize: 26 }}>Here's my recommendation…</div>
      </div>
      {/* model two */}
      <div style={{ position: 'absolute', left: cx + 360 - 70, top: cy - 70, opacity: Math.min(1, second), transform: `scale(${0.4 + 0.6 * second})` }}>
        <ModelTile name="AI 2" size={140} lit={1} />
      </div>
      <div style={{ position: 'absolute', left: cx + 110, top: 640, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
        {bubbles.map(([s, at]) => (
          <div key={s} className="kit-card" style={{ padding: '12px 22px', borderRadius: '4px 20px 20px 20px', borderColor: LIME, ...enter(t, at, { x: 30, y: 0, dur: 0.5 }) }}>
            <div className="kit-ui" style={{ fontSize: 24, fontWeight: 600 }}>{s}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 15 — Red-team a recommendation (180.88 → 196.32)
const RedTeam: React.FC<{ t: number }> = ({ t }) => {
  const notes: Array<[string, number, number]> = [
    ['Weakness: cost estimate is thin', 191.28, 0],
    ['Assumption: demand keeps growing?', 192.8, 1],
    ['Alternative: phase the rollout', 194.8, 2],
  ];
  return (
    <>
      <Label t={t} at={181.0}>Imagine</Label>
      <div className="kit-h2" style={enter(t, 181.1, { dur: 0.8, y: 24 })}>
        A <span className="kit-mark" style={markStyle(t, 182.4)}>strategic decision.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 50 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, ...enter(t, 184.4, { y: 20 }) }}>
          <ModelTile name="A" size={110} lit={1} />
          <div className="kit-ui" style={{ fontSize: 22, color: MUTED, fontWeight: 600 }}>Drafts</div>
        </div>
        <div className="kit-card" style={{ width: 760, height: 430, padding: 40, position: 'relative', ...enter(t, 185.2, { y: 30 }) }}>
          <div className="kit-tag">Recommendation</div>
          <div style={{ fontFamily: SERIF, fontSize: 38, marginTop: 18, minHeight: 100 }}>
            {typed(t, 185.6, 'Expand into the Nordic market in Q2.', 1.4)}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
            {[0.95, 0.8, 0.9, 0.6].map((w, i) => (
              <div key={i} style={{ height: 14, width: `${w * prog(t, 186.6 + i * 0.2, 0.5) * 100}%`, background: '#E8E8E2', borderRadius: 7, position: 'relative' }}>
                {i < 3 && <div style={{ position: 'absolute', left: 0, top: -6, height: 26, width: `${w * prog(t, notes[i][1], 0.6) * 100}%`, borderBottom: `4px solid ${RED}` }} />}
              </div>
            ))}
          </div>
        </div>
        <Arrow t={t} at={188.6} w={80} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...enter(t, 189.08, { x: 20, y: 0 }) }}>
            <ModelTile name="B" size={110} lit={1} />
            <div className="kit-ui" style={{ fontSize: 22, color: MUTED, fontWeight: 600 }}>Challenges</div>
          </div>
          {notes.map(([s, at]) => (
            <div key={s} className="kit-ui" style={{ fontSize: 24, fontWeight: 600, color: RED, background: '#FDF0EA', borderRadius: 12, padding: '10px 16px', ...enter(t, at, { x: 24, y: 0, dur: 0.5 }) }}>
              {s}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// 16 — Faster vs more critically (196.32 → 202.56)
const Critically: React.FC<{ t: number }> = ({ t }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
    <Label t={t} at={196.4}>The point</Label>
    <div className="kit-h1" style={{ color: MUTED, ...enter(t, 196.5, { dur: 0.7, y: 30 }) }}>
      <Strike t={t} at={199.2}>To go faster.</Strike>
    </div>
    <div className="kit-h1" style={enter(t, 199.9, { dur: 0.7, y: 30 })}>
      To think <span className="kit-mark" style={markStyle(t, 201.28)}>more critically.</span>
    </div>
  </div>
);

// 17 — Agreement isn't accuracy (202.56 → 211.52)
const Verify: React.FC<{ t: number }> = ({ t }) => {
  const stamp = prog(t, 209.0, 0.5, BACK);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
      <div style={{ flex: 1 }}>
        <Label t={t} at={202.7}>Remember</Label>
        <div className="kit-h2" style={enter(t, 202.8, { dur: 0.8, y: 24 })}>
          Agreement <span style={{ color: RED }}>≠</span> accuracy.
        </div>
        <p className="kit-body" style={{ fontSize: 40, marginTop: 30, ...enter(t, 207.12, { y: 18 }) }}>
          <span className="kit-mark" style={markStyle(t, 208.96)}>Verify</span> important claims against reliable sources.
        </p>
      </div>
      <div style={{ position: 'relative', width: 640, height: 480 }}>
        <div style={{ position: 'absolute', left: 40, top: 40, ...enter(t, 203.6, { y: 20 }) }}><ModelTile name="A" size={120} lit={1} /></div>
        <div style={{ position: 'absolute', left: 260, top: 40, ...enter(t, 203.9, { y: 20 }) }}><ModelTile name="B" size={120} lit={1} /></div>
        <div className="kit-pill" style={{ position: 'absolute', left: 70, top: 200, ...enter(t, 204.4, { y: 0, scale: 0.6, easing: BACK }) }}>
          <Check size={30} /> We agree
        </div>
        <div className="kit-card" style={{ position: 'absolute', left: 60, top: 300, width: 520, padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 18, ...enter(t, 209.2, { y: 20 }) }}>
          <svg width={40} height={40} viewBox="0 0 24 24"><path d="M5 2.8h9.2L19 7.6v13.6H5z" fill="#fff" stroke={GREEN} strokeWidth="1.6" /><path d="M8 12h8M8 15.5h8M8 19h5" stroke={GREEN} strokeWidth="1.6" /></svg>
          <div className="kit-ui" style={{ fontSize: 26 }}>Reliable source</div>
        </div>
        <div style={{ position: 'absolute', left: 430, top: 150, transform: `rotate(-12deg) scale(${0.5 + stamp * 0.5})`, opacity: Math.min(1, stamp), border: `5px solid ${GREEN}`, color: GREEN, borderRadius: 12, padding: '8px 20px', fontFamily: SANS, fontWeight: 800, fontSize: 32, letterSpacing: '.12em' }}>
          VERIFIED
        </div>
      </div>
    </div>
  );
};

// 18 — Dissenting views (211.52 → 219.46)
const Dissent: React.FC<{ t: number }> = ({ t }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 46 }}>
    <div style={{ fontFamily: SERIF, fontSize: 200, lineHeight: 0.6, color: LIME, height: 80, ...enter(t, 211.6, { y: 0 }) }}>“</div>
    <div className="kit-h2" style={enter(t, 211.7, { dur: 0.8, y: 24 })}>
      Strong leaders seek out <span className="kit-mark" style={markStyle(t, 213.36)}>dissenting views.</span>
    </div>
    <div className="kit-h2" style={enter(t, 214.6, { dur: 0.8, y: 24 })}>
      Strong AI users <span className="kit-mark" style={markStyle(t, 216.4)}>build that challenge</span> into their workflow.
    </div>
  </div>
);

// 19 — Your model mix (219.46 → 239.18)
const Mix: React.FC<{ t: number }> = ({ t }) => {
  const orbit = (i: number) => {
    const a = ((t - 235) * 0.25 + i * Math.PI) % (Math.PI * 2);
    return { x: Math.cos(a) * 270, y: Math.sin(a) * 120 };
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
      <div style={{ width: 860 }}>
        <Label t={t} at={219.6}>Bottom line</Label>
        <div className="kit-h2" style={{ fontSize: 60, color: MUTED, ...enter(t, 220.0, { dur: 0.7, y: 20 }) }}>
          <Strike t={t} at={223.0}>Multiple models for every task.</Strike>
        </div>
        <div className="kit-h2" style={{ fontSize: 60, marginTop: 30, ...enter(t, 224.4, { dur: 0.7, y: 20 }) }}>
          Fluent in the landscape. <span className="kit-mark" style={markStyle(t, 227.6)}>Intentional</span> about which model, and when.
        </div>
      </div>
      <div style={{ position: 'relative', flex: 1, height: 600 }}>
        <div style={{ position: 'absolute', left: '50%', top: '50%', width: 620, height: 300, marginLeft: -310, marginTop: -150, borderRadius: '50%', border: `2px dashed ${LINE}`, opacity: prog(t, 234.8, 0.6) }} />
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', ...enter(t, 232.12, { y: 0, scale: 0.5, easing: BACK }) }}>
          <ModelTile name="Daily" size={180} lit={1} sub="Everyday work" />
        </div>
        {[
          ['Second view', 236.52],
          ['Special skill', 237.6],
        ].map(([s, at], i) => {
          const o = orbit(i);
          return (
            <div key={s as string} style={{ position: 'absolute', left: `calc(50% + ${o.x}px)`, top: `calc(50% + ${o.y}px)`, transform: 'translate(-50%, -50%)', ...enter(t, at as number, { y: 0, scale: 0.4, easing: BACK }) }}>
              <div className="kit-pill" style={{ fontSize: 24 }}>{s}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 20 — Closing (239.18 → end)
const Closing: React.FC<{ t: number }> = ({ t }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
    <div className="kit-h1" style={{ color: MUTED, ...enter(t, 239.3, { dur: 0.7, y: 30 }) }}>
      <Strike t={t} at={241.0}>More AI.</Strike>
    </div>
    <div className="kit-h1" style={enter(t, 242.0, { dur: 0.8, y: 30 })}>
      AI, used <span className="kit-mark" style={markStyle(t, 243.44)}>more thoughtfully.</span>
    </div>
    <div style={{ display: 'flex', gap: 22, marginTop: 30 }}>
      {[
        ['Awareness', 244.64],
        ['Judgment', 245.44],
        ['Better results', 246.4],
      ].map(([s, at]) => (
        <div key={s as string} className="kit-pill" style={enter(t, at as number, { y: 0, scale: 0.6, easing: BACK })}>
          <Check size={28} /> {s}
        </div>
      ))}
    </div>
  </div>
);

// ── Body ─────────────────────────────────────────────────────────────────────
const ModelLandscapeBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/model-landscape.mp3')} />}
      <Scene t={t} index={0}><Basics t={t} /></Scene>
      <Scene t={t} index={1}><Fundamentals t={t} /></Scene>
      <Scene t={t} index={2}><Route t={t} /></Scene>
      <Scene t={t} index={3} pad={false}><Engine t={t} /></Scene>
      <Scene t={t} index={4}><Families t={t} /></Scene>
      <Scene t={t} index={5}><Releases t={t} /></Scene>
      <Scene t={t} index={6}><Strengths t={t} /></Scene>
      <Scene t={t} index={7}><Leaderboard t={t} /></Scene>
      <Scene t={t} index={8}><ChooseRight t={t} /></Scene>
      <Scene t={t} index={9} pad={false}><Chapter t={t} /></Scene>
      <Scene t={t} index={10}><Patterns t={t} /></Scene>
      <Scene t={t} index={11}><Shared t={t} /></Scene>
      <Scene t={t} index={12}><SameTask t={t} /></Scene>
      <Scene t={t} index={13} pad={false}><Room t={t} /></Scene>
      <Scene t={t} index={14}><RedTeam t={t} /></Scene>
      <Scene t={t} index={15}><Critically t={t} /></Scene>
      <Scene t={t} index={16}><Verify t={t} /></Scene>
      <Scene t={t} index={17}><Dissent t={t} /></Scene>
      <Scene t={t} index={18}><Mix t={t} /></Scene>
      <Scene t={t} index={19} padStyle={{ opacity: 1 - prog(t, 248.2, 0.8, Easing.in(Easing.quad)) }}><Closing t={t} /></Scene>
      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const ModelLandscape: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={MODEL_LANDSCAPE_TITLE_FRAMES}>
      <TitleCardGreen label="LEAD WITH AI" title="The AI Model Landscape" />
    </Sequence>
    <Sequence from={MODEL_LANDSCAPE_TITLE_FRAMES}>
      <ModelLandscapeBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
