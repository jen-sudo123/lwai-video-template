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
  Composer,
  Cross,
  FileIcon,
  FolderIcon,
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
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// Vibe Coding — custom concept composition (Lead with AI).
// VO: audio/vibe-coding.mp3 (Daan, ElevenLabs v4, take B, 295.8s). Every cue is in VO seconds, taken from
// src/data/vibe-coding.transcript.json. A 90-frame green title card opens; the VO starts after it.
//
//  #  scene                                   start   VO cue
//  1  Zoom out: how code works                0.00    "If we zoom out a little…"
//  2  Language vs code                        7.92    "Like everyday language…"
//  3  Learned + reason/test/fix loop          17.92   "AI models have learned…"
//  4  Years of experience → one instruction   32.96   "Tasks that once required…"
//  5  Fast ≠ correct                          39.84   "But generating code quickly…"
//  6  Developer tools                         49.60   "AI coding capabilities first gained traction…"
//  7  Multi-file tasks                        62.56   "Today, they can also take on…"
//  8  Help me write → Build this for me       71.96   "But the more interesting shift…"
//  9  The term: vibe coding                   88.24   "In early 2025…"
//  10 How it works: chat, code fades          95.20   "He described a way of developing software…"
//  11 Describe → generate → refine loop       108.12  "The idea caught on…"
//  12 Idea → interactive thing                125.44  "This is where things get interesting…"
//  13 Three things you could build            139.04  "Maybe it's a dashboard…"
//  14 Start with the problem                  150.28  "You don't have to start by understanding…"
//  15 Prototype tools vs full apps            157.76  "Some tools help you create…"
//  16 Works in the demo ≠ ready               172.96  "Getting an application to work…"
//  17 Three stages                            191.20  "Think of it in three stages."
//  18 Oversight grows                         217.12  "AI can help throughout all three stages."
//  19 Developer → Director                    237.52  "And this brings us to the real mindset shift."
//  20 The director's moves                    248.96  "Your leverage comes from defining…"
//  21 Start small, then business              257.92  "You can start with something small…"
//  22 Lower barrier, same responsibility      272.24  "The goal is to make creating…"
//  23 Idea → test → learn → decide            285.80  "And for leaders, that's the opportunity…"

export const VIBE_CODING_DURATION_S = 297.6;
export const VIBE_CODING_TITLE_FRAMES = 90;

const STARTS = [
  0, 7.92, 17.92, 32.96, 39.84, 49.6, 62.56, 71.96, 88.24, 95.2, 108.12, 125.44, 139.04, 150.28, 157.76, 172.96,
  191.2, 217.12, 237.52, 248.96, 257.92, 272.24, 285.8,
];
const Scene = makeScene(STARTS, 0.5);

const AMBER = '#B7791F';
const AMBER_SOFT = '#FCEFD6';
const CODE_BG = '#1F2420';

// ── small pieces ────────────────────────────────────────────────────────────
const Chapter: React.FC<{ t: number; at: number; n: string; children: React.ReactNode }> = ({ t, at, n, children }) => (
  <div className="kit-label" style={enter(t, at, { y: 14 })}>
    <span style={{ color: GREEN }}>{n}</span>&nbsp;·&nbsp;{children}
  </div>
);

// A syntax-coloured line of fake code
type Tok = [string, string?];
const C = { kw: '#9BD46B', fn: '#F2C66D', str: '#E59A72', cm: '#7C857E', tx: '#E8ECE6', num: '#8FC7F0' };
const CodeLine: React.FC<{ toks: Tok[]; style?: React.CSSProperties; indent?: number }> = ({ toks, style, indent = 0 }) => (
  <div style={{ whiteSpace: 'pre', paddingLeft: indent * 28, ...style }}>
    {toks.map(([s, c], i) => (
      <span key={i} style={{ color: c ?? C.tx }}>
        {s}
      </span>
    ))}
  </div>
);

const CodeCard: React.FC<{ children: React.ReactNode; title?: string; style?: React.CSSProperties; fontSize?: number }> = ({ children, title, style, fontSize = 24 }) => (
  <div style={{ background: CODE_BG, borderRadius: 22, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,.18)', ...style }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '14px 20px', background: '#2A302B' }}>
      {['#E06C5A', '#E6B450', '#7FBF5A'].map((c) => (
        <div key={c} style={{ width: 13, height: 13, borderRadius: 7, background: c }} />
      ))}
      {title && <div className="kit-mono" style={{ marginLeft: 14, fontSize: 17, color: '#A9B1AA' }}>{title}</div>}
    </div>
    <div className="kit-mono" style={{ padding: '22px 28px', fontSize, lineHeight: 1.6 }}>{children}</div>
  </div>
);

// Strike-through that draws across its parent
const Strike: React.FC<{ t: number; at: number; color?: string }> = ({ t, at, color = RED }) => (
  <span style={{ position: 'absolute', left: -6, top: '52%', height: 6, borderRadius: 3, background: color, width: `calc(${prog(t, at, 0.5, IN_OUT) * 100}% + 12px)` }} />
);

const Person: React.FC<{ size?: number; color?: string }> = ({ size = 40, color = '#B9B9B0' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="8" r="4.2" fill={color} />
    <path d="M3.5 22c.6-5 4-7.6 8.5-7.6s7.9 2.6 8.5 7.6z" fill={color} />
  </svg>
);

const Node: React.FC<{ on: number; label: string; sub?: string; w?: number; style?: React.CSSProperties }> = ({ on, label, sub, w = 300, style }) => (
  <div
    className="kit-card kit-ui"
    style={{
      width: w,
      padding: '22px 24px',
      textAlign: 'center',
      borderColor: on > 0.5 ? GREEN : LINE,
      background: on > 0.5 ? LIME_SOFT : '#fff',
      transform: `scale(${1 + 0.06 * Math.sin(Math.PI * Math.min(1, on))})`,
      ...style,
    }}
  >
    <div style={{ fontSize: 30, fontWeight: 700 }}>{label}</div>
    {sub && <div style={{ fontSize: 21, color: MUTED, marginTop: 6 }}>{sub}</div>}
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const VibeCodingBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/vibe-coding.mp3')} />}

      {/* 1 — Zoom out: it comes down to how code works */}
      <Scene t={t} index={0} pad={false}>
        {(() => {
          const z = interpolate(t, [0.3, 2.4], [3.2, 1], { ...clamp, easing: IN_OUT });
          const side = prog(t, 2.6, 0.9);
          return (
            <AbsoluteFill>
              <div style={{ position: 'absolute', left: 980, top: 190, width: 800, transformOrigin: '45% 30%', transform: `translateX(${(1 - side) * -420}px) scale(${z})` }}>
                <CodeCard title="app.js" fontSize={25}>
                  <CodeLine toks={[['// track the team’s projects', C.cm]]} />
                  <CodeLine toks={[['function ', C.kw], ['statusOf', C.fn], ['(project) {']]} />
                  <CodeLine indent={1} toks={[['if ', C.kw], ['(project.done) '], ['return ', C.kw], ["'Done'", C.str], [';']]} />
                  <CodeLine indent={1} toks={[['if ', C.kw], ['(project.late) '], ['return ', C.kw], ["'At risk'", C.str], [';']]} />
                  <CodeLine indent={1} toks={[['return ', C.kw], ["'On track'", C.str], [';']]} />
                  <CodeLine toks={[['}']]} />
                  <CodeLine toks={[['']]} />
                  <CodeLine toks={[['projects', C.tx], ['.', C.tx], ['map', C.fn], ['(statusOf);']]} />
                </CodeCard>
              </div>
              <div style={{ position: 'absolute', left: 80, top: 0, bottom: 150, width: 820, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Chapter t={t} at={2.4} n="01">Why AI is so good at code</Chapter>
                <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 2.7, { dur: 0.9, y: 30 }) }}>
                  It comes down to <span className="kit-mark" style={markStyle(t, 5.4)}>how code works.</span>
                </div>
              </div>
            </AbsoluteFill>
          );
        })()}
      </Scene>

      {/* 2 — Language vs code */}
      <Scene t={t} index={1}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'start' }}>
          <div style={enter(t, 8.0, { y: 24 })}>
            <div className="kit-tag" style={{ marginBottom: 26 }}>Everyday language</div>
            <div className="kit-card" style={{ padding: '40px 44px', height: 400, boxSizing: 'border-box' }}>
              {[
                ['Could you', 'send me', 'the report?'],
                ['Could you', 'book me', 'a meeting?'],
                ['Could you', 'remind me', 'on Friday?'],
              ].map((parts, i) => (
                <div key={i} className="kit-ui" style={{ fontSize: 38, lineHeight: 1.9, ...enter(t, 8.3 + i * 0.35, { x: -16, y: 0 }) }}>
                  <span style={{ background: t >= 10.0 ? LIME_SOFT : 'transparent', borderRadius: 8, padding: '0 6px' }}>{parts[0]}</span> {parts[1]}{' '}
                  <span style={{ color: MUTED }}>{parts[2]}</span>
                </div>
              ))}
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, fontWeight: 600, marginTop: 14, ...enter(t, 10.3, { y: 8 }) }}>Patterns repeat</div>
            </div>
          </div>
          <div style={enter(t, 11.4, { y: 24 })}>
            <div className="kit-tag" style={{ marginBottom: 26 }}>Code</div>
            <div style={{ position: 'relative' }}>
              <CodeCard fontSize={27} style={{ height: 400, boxSizing: 'border-box' }}>
                <CodeLine toks={[['for ', C.kw], ['(task ', C.tx], ['of ', C.kw], ['tasks) {']]} />
                <CodeLine indent={1} toks={[['if ', C.kw], ['(task.due < ', C.tx], ['today', C.fn], [') {']]} />
                <CodeLine indent={2} toks={[['remind', C.fn], ['(task.owner);']]} />
                <CodeLine indent={1} toks={[['}']]} />
                <CodeLine toks={[['}']]} />
              </CodeCard>
              {/* structure brackets */}
              <div style={{ position: 'absolute', left: -26, top: 78, width: 14, height: 250, borderLeft: `4px solid ${LIME}`, borderTop: `4px solid ${LIME}`, borderBottom: `4px solid ${LIME}`, opacity: prog(t, 12.3, 0.5) }} />
              <div style={{ position: 'absolute', right: 26, top: 74, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
                <div className="kit-pill" style={{ fontSize: 22, padding: '10px 18px', ...enter(t, 13.84, { x: 20, y: 0, easing: BACK }) }}>Strict rules</div>
              </div>
              <div style={{ display: 'flex', gap: 18, marginTop: 24 }}>
                <div className="kit-pill" style={{ fontSize: 24, background: INK, color: '#fff', borderColor: INK, ...enter(t, 15.6, { y: 12, easing: BACK }) }}>▶ Run</div>
                <div className="kit-pill" style={{ fontSize: 24, borderColor: GREEN, ...enter(t, 16.4, { y: 12, easing: BACK }) }}>
                  <Check size={26} /> Tests pass
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Learned from code; reason, run tests, find errors, improve */}
      <Scene t={t} index={2}>
        <div style={{ display: 'grid', gridTemplateColumns: '640px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 18.0, { dur: 0.8, y: 30 })}>
              Trained on <span className="kit-mark" style={markStyle(t, 19.6)}>enormous</span> amounts of code.
            </div>
            {/* a wall of tiny code tiles filling in */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: 6, marginTop: 44 }}>
              {Array.from({ length: 96 }).map((_, i) => {
                const at = 19.4 + ((i * 37) % 96) * 0.025;
                const w = 40 + ((i * 53) % 50);
                return (
                  <div key={i} style={{ height: 22, borderRadius: 4, background: i % 7 === 0 ? LIME_SOFT : '#EDEDE7', opacity: prog(t, at, 0.3), display: 'flex', alignItems: 'center', padding: '0 4px' }}>
                    <div style={{ height: 4, width: `${w}%`, borderRadius: 2, background: i % 7 === 0 ? GREEN : '#C9C9C0' }} />
                  </div>
                );
              })}
            </div>
            <p className="kit-body kit-muted" style={{ marginTop: 34, ...enter(t, 23.2, { y: 12 }) }}>
              And today’s models do more than <b style={{ color: INK }}>generate</b>.
            </p>
          </div>
          {/* the loop */}
          {(() => {
            const steps: [string, number, string][] = [
              ['Reason', 26.64, 'Plan the fix'],
              ['Run tests', 28.2, '3 passed · 1 failed'],
              ['Find errors', 29.36, 'Line 14: wrong date'],
              ['Improve', 30.68, 'All tests pass'],
            ];
            const pos = [
              [300, 0],
              [600, 230],
              [300, 460],
              [0, 230],
            ];
            const active = steps.reduce((a, s, i) => (t >= s[1] ? i : a), -1);
            return (
              <div style={{ position: 'relative', width: 900, height: 580, ...enter(t, 25.6, { y: 20 }) }}>
                <svg width={900} height={580} style={{ position: 'absolute', left: 0, top: 0 }}>
                  <circle cx={450} cy={290} r={210} fill="none" stroke={LINE} strokeWidth={5} strokeDasharray="14 12" />
                  {active >= 0 && (
                    <circle
                      cx={450}
                      cy={290}
                      r={210}
                      fill="none"
                      stroke={LIME}
                      strokeWidth={6}
                      strokeDasharray={`${2 * Math.PI * 210}`}
                      strokeDashoffset={2 * Math.PI * 210 * (1 - prog(t, 26.64, 4.6, Easing.linear))}
                      transform="rotate(-90 450 290)"
                      strokeLinecap="round"
                    />
                  )}
                </svg>
                {steps.map(([label, at, sub], i) => (
                  <div key={label} style={{ position: 'absolute', left: pos[i][0], top: pos[i][1], ...enter(t, at - 0.3, { y: 0, scale: 0.8, easing: BACK, dur: 0.5 }) }}>
                    <Node
                      on={active === i ? 1 : 0}
                      label={label}
                      sub={sub}
                      style={{
                        borderColor: i === 2 && active === 2 ? RED : undefined,
                        background: i === 2 && active === 2 ? '#FBE9E1' : undefined,
                      }}
                    />
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 4 — Years of experience → one instruction */}
      <Scene t={t} index={3}>
        <div className="kit-h2" style={{ ...enter(t, 33.1, { dur: 0.8, y: 30 }) }}>
          Started with a <span className="kit-mark" style={markStyle(t, 38.0)}>simple instruction.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 70, marginTop: 70 }}>
          <div style={{ ...enter(t, 33.9, { y: 20 }), opacity: 1 - prog(t, 37.0, 0.6) * 0.55 }}>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', gap: 8, width: 420 }}>
              {['Syntax', 'Frameworks', 'Databases', 'Debugging', 'Deployment', 'Security'].map((b, i) => (
                <div
                  key={b}
                  className="kit-ui"
                  style={{
                    height: 50,
                    borderRadius: 8,
                    background: ['#E7E3D6', '#DCE6D2', '#E9DCCF', '#D9E1E8', '#E6E0EC', '#E3E7D3'][i],
                    border: '2px solid rgba(0,0,0,.08)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    fontSize: 24,
                    fontWeight: 600,
                    marginLeft: (i % 2) * 22,
                    ...enter(t, 34.2 + i * 0.25, { y: -40, dur: 0.45, easing: BACK }),
                  }}
                >
                  {b}
                </div>
              ))}
            </div>
            <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 18, fontWeight: 600 }}>Years of programming experience</div>
          </div>
          <Arrow t={t} at={36.6} w={190} label="now" />
          <div style={enter(t, 37.0, { y: 24 })}>
            <Composer w={720} text={typed(t, 37.4, 'Build me a tracker for our team’s projects', 1.4)} caret={t < 39.5} />
          </div>
        </div>
      </Scene>

      {/* 5 — Fast ≠ correct */}
      <Scene t={t} index={4}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h1" style={{ fontSize: 96, ...enter(t, 40.0, { dur: 0.8, y: 30 }) }}>
              Fast isn’t the same as <span className="kit-mark" style={markStyle(t, 43.5)}>right.</span>
            </div>
            <p className="kit-body kit-muted" style={{ marginTop: 40, ...enter(t, 45.6, { y: 14 }) }}>
              An important distinction. We’ll come back to it.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            {/* speed lines */}
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'absolute', left: -140 + i * 10, top: 60 + i * 70, height: 5, borderRadius: 3, background: LIME, width: 120 * (1 - prog(t, 40.6 + i * 0.05, 0.6)), opacity: 1 - prog(t, 41.0, 0.4) }} />
            ))}
            <div style={enter(t, 40.4, { x: 160, y: 0, dur: 0.5 })}>
              <CodeCard title="generated in 4 seconds" fontSize={23}>
                {[
                  [['function ', C.kw], ['dueSoon', C.fn], ['(tasks) {']],
                  [['  const ', C.kw], ['limit = ', C.tx], ['7', C.num], [';']],
                  [['  return ', C.kw], ['tasks.', C.tx], ['filter', C.fn], ['(t =>']],
                  [['    t.due - ', C.tx], ['now', C.fn], ['() < limit);']],
                  [['}']],
                ].map((toks, i) => (
                  <div key={i} style={{ opacity: prog(t, 40.6 + i * 0.12, 0.2), position: 'relative' }}>
                    <CodeLine toks={toks as Tok[]} />
                    {i === 3 && t >= 43.4 && (
                      <div style={{ position: 'absolute', left: -10, right: -10, top: 2, bottom: 2, border: `3px solid ${AMBER}`, borderRadius: 8, opacity: prog(t, 43.4, 0.3) }} />
                    )}
                  </div>
                ))}
              </CodeCard>
            </div>
            <div style={{ display: 'flex', gap: 18, marginTop: 26 }}>
              <div className="kit-pill" style={{ background: AMBER_SOFT, borderColor: AMBER, ...enter(t, 43.52, { y: 12, easing: BACK }) }}>Correct?</div>
              <div className="kit-pill" style={{ background: AMBER_SOFT, borderColor: AMBER, ...enter(t, 44.4, { y: 12, easing: BACK }) }}>Reliable?</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 6 — Developer tools */}
      <Scene t={t} index={5}>
        <Chapter t={t} at={49.7} n="02">From “help me write code” to “build this for me”</Chapter>
        <div style={{ display: 'grid', gridTemplateColumns: '700px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 49.8, { dur: 0.8, y: 30 })}>
              It started with <span className="kit-mark" style={markStyle(t, 53.0)}>developers.</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 50 }}>
              {[
                ['GitHub Copilot', 55.6],
                ['Cursor', 57.16],
                ['Codex', 57.76],
              ].map(([n, at]) => (
                <div key={n as string} className="kit-pill" style={enter(t, at as number, { y: 14, easing: BACK })}>
                  {n as string}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 30, marginTop: 40 }}>
              {[
                ['Write', 59.28],
                ['Debug', 60.16],
                ['Improve', 60.92],
              ].map(([n, at]) => (
                <div key={n as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 32, fontWeight: 600, ...enter(t, at as number, { x: -14, y: 0 }) }}>
                  <Check size={32} /> {n as string}
                </div>
              ))}
            </div>
          </div>
          {/* editor with ghost-text autocomplete */}
          <div style={enter(t, 51.2, { y: 30 })}>
            <CodeCard title="report.py" fontSize={26}>
              <CodeLine toks={[['def ', C.kw], ['weekly_summary', C.fn], ['(rows):']]} />
              <CodeLine
                toks={[
                  ['    total = ', C.tx],
                  [typed(t, 52.4, 'sum(r.hours for r in rows)', 0.8), C.tx],
                ]}
              />
              <div style={{ whiteSpace: 'pre', opacity: t >= 54.0 ? 1 : 0 }}>
                <span style={{ color: t >= 58.6 ? C.tx : '#5E665F' }}>{'    late = [r for r in rows if r.late]'}</span>
              </div>
              <div style={{ whiteSpace: 'pre', opacity: t >= 54.0 ? 1 : 0 }}>
                <span style={{ color: t >= 58.6 ? C.tx : '#5E665F' }}>{'    return total, late'}</span>
              </div>
              {t >= 54.0 && t < 58.6 && (
                <div className="kit-ui" style={{ marginTop: 14, display: 'inline-flex', gap: 10, alignItems: 'center', background: '#2F3A31', borderRadius: 8, padding: '6px 14px', fontSize: 18, color: '#C9D9BE' }}>
                  <span className="kit-mono" style={{ border: '1px solid #6B7A6C', borderRadius: 5, padding: '0 8px' }}>Tab</span> to accept suggestion
                </div>
              )}
            </CodeCard>
          </div>
        </div>
      </Scene>

      {/* 7 — Multi-file tasks */}
      <Scene t={t} index={6}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 62.6, { y: 14 })}>Today</div>
            <div className="kit-h2" style={enter(t, 62.7, { dur: 0.8, y: 30 })}>
              Bigger jobs: <span className="kit-mark" style={markStyle(t, 64.4)}>complex tasks</span> end to end.
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '30px 34px', ...enter(t, 63.6, { y: 24 }) }}>
            <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 16 }}>TASK · ADD EXPORT TO CSV</div>
            {[
              ['src/export.ts', 66.56, '+48'],
              ['src/menu.tsx', 67.2, '+6'],
              ['src/api/reports.ts', 67.6, '+12 −3'],
              ['tests/export.test.ts', 67.92, '+31'],
            ].map(([f, at, d]) => (
              <div key={f as string} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, padding: '9px 0', borderBottom: `1px solid ${LINE}`, ...enter(t, at as number, { x: -16, y: 0, dur: 0.4 }) }}>
                <FileIcon size={28} accent />
                <span className="kit-mono" style={{ fontSize: 23 }}>{f as string}</span>
                <span className="kit-mono" style={{ marginLeft: 'auto', color: GREEN, fontSize: 21 }}>{d as string}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 14, marginTop: 24, alignItems: 'center' }}>
              <div className="kit-pill" style={{ fontSize: 22, padding: '10px 18px', ...enter(t, 68.8, { y: 10 }) }}>
                {t < 69.92 ? (
                  <>
                    <Cross size={24} /> 1 test failing
                  </>
                ) : (
                  <>
                    <Check size={24} /> 12 tests passing
                  </>
                )}
              </div>
              <div className="kit-ui" style={{ fontSize: 22, color: GREEN, fontWeight: 600, ...enter(t, 69.92, { x: -10, y: 0 }) }}>Error fixed</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 8 — The shift: Help me write → Build this for me */}
      <Scene t={t} index={7}>
        <div style={{ display: 'grid', gridTemplateColumns: '620px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 72.1, { dur: 0.8, y: 30 })}>
              No longer just for people <span className="kit-mark" style={markStyle(t, 77.4)}>who code.</span>
            </div>
            {/* a circle of people that opens up */}
            {(() => {
              const open = prog(t, 76.4, 1.2, IN_OUT);
              return (
                <div style={{ position: 'relative', height: 300, marginTop: 30 }}>
                  <div style={{ position: 'absolute', left: 230 - 80 - open * 150, top: 150 - 80 - open * 110, width: 160 + open * 300, height: 160 + open * 220, borderRadius: 999, border: `4px dashed ${open > 0.5 ? LIME : '#C9C9C0'}`, opacity: enter(t, 74.0).opacity }} />
                  {Array.from({ length: 11 }).map((_, i) => {
                    const inner = i < 3;
                    const a = (i / (inner ? 3 : 8)) * Math.PI * 2 + (inner ? 0.4 : 0);
                    const r = inner ? 42 : 120 + (i % 2) * 40;
                    const x = 230 + Math.cos(a) * r * (inner ? 1 : 1.25) - 22;
                    const y = 150 + Math.sin(a) * r * 0.85 - 22;
                    return (
                      <div key={i} style={{ position: 'absolute', left: x, top: y, opacity: inner ? enter(t, 74.4).opacity : prog(t, 76.8 + i * 0.07, 0.4) }}>
                        <Person size={44} color={inner ? GREEN : '#9CB98A'} />
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <div style={{ ...enter(t, 80.0, { y: 20 }), opacity: 1 - prog(t, 82.4, 0.6) * 0.5, transform: `scale(${1 - prog(t, 82.4, 0.6) * 0.08})`, transformOrigin: 'left center' }}>
              <div className="kit-ui" style={{ fontSize: 22, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 12 }}>BEFORE</div>
              <Composer w={760} text={typed(t, 80.24, 'Help me write this code', 1.0)} />
            </div>
            <div style={enter(t, 82.3, { y: 20 })}>
              <div className="kit-ui" style={{ fontSize: 22, letterSpacing: '.1em', fontWeight: 700, color: GREEN, marginBottom: 12 }}>NOW</div>
              <div style={{ transform: `scale(${1 + 0.06 * prog(t, 83.0, 0.5, BACK)})`, transformOrigin: 'left center' }}>
                <Composer w={760} text={typed(t, 82.48, 'Build this for me', 0.8)} />
              </div>
            </div>
            <div className="kit-h3" style={{ marginTop: 10, ...enter(t, 85.3, { y: 14, easing: BACK }) }}>
              Enter: <span className="kit-mark" style={{ ...markStyle(t, 85.44), fontStyle: 'italic' }}>vibe coding</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 9 — The term */}
      <Scene t={t} index={8}>
        <Chapter t={t} at={88.4} n="03">What is vibe coding?</Chapter>
        <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>
          <div className="kit-h1" style={{ fontSize: 180, fontStyle: 'italic', letterSpacing: '-0.04em', ...enter(t, 88.6, { dur: 1.0, y: 40 }) }}>
            {typed(t, 93.4, 'vibe coding', 0.7) || <span style={{ opacity: 0.12 }}>vibe coding</span>}
            {t >= 93.4 && t < 95.2 && <span style={{ display: 'inline-block', width: 8, height: 150, background: LIME, marginLeft: 8, verticalAlign: -20 }} />}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 50 }}>
          <div className="kit-pill" style={{ background: LIME_SOFT, borderColor: GREEN, ...enter(t, 88.84, { y: 12, easing: BACK }) }}>Early 2025</div>
          <div className="kit-ui" style={{ fontSize: 32, ...enter(t, 91.04, { x: -16, y: 0 }) }}>
            Popularized by AI researcher <b>Andrej Karpathy</b>
          </div>
        </div>
      </Scene>

      {/* 10 — How it works: chat on the left, code fades on the right */}
      <Scene t={t} index={9}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 70, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={{ fontSize: 60, ...enter(t, 95.3, { dur: 0.8, y: 30 }) }}>
              Focus on <span className="kit-mark" style={markStyle(t, 98.5)}>what you want</span> to create.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 44 }}>
              {[
                ['You', 'Make a page where my team can vote on ideas.', 97.84],
                ['AI', 'Done. Here’s a first version with voting.', 100.92],
                ['You', 'Nice. Sort by votes, and add a deadline.', 102.4],
                ['AI', 'Updated.', 103.6],
              ].map(([who, msg, at], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: who === 'You' ? 'flex-end' : 'flex-start', ...enter(t, at as number, { y: 14, dur: 0.5 }) }}>
                  <div
                    className="kit-ui"
                    style={{
                      maxWidth: 640,
                      fontSize: 26,
                      padding: '16px 22px',
                      borderRadius: 18,
                      background: who === 'You' ? '#F1F1EC' : LIME_SOFT,
                      border: `2px solid ${who === 'You' ? '#F1F1EC' : '#D5EBC4'}`,
                    }}
                  >
                    {msg as string}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', ...enter(t, 100.92, { y: 24 }) }}>
            {(() => {
              const blur = prog(t, 104.9, 1.2, IN_OUT);
              return (
                <>
                  <div style={{ filter: `blur(${blur * 7}px)`, opacity: 1 - blur * 0.55 }}>
                    <CodeCard title="vote.html" fontSize={22}>
                      {Array.from({ length: 11 }).map((_, i) => {
                        const toks: Tok[][] = [
                          [['<', C.tx], ['section ', C.kw], ['id', C.fn], ['=', C.tx], ['"ideas"', C.str], ['>', C.tx]],
                          [['  <', C.tx], ['ul ', C.kw], ['class', C.fn], ['=', C.tx], ['"list"', C.str], ['>', C.tx]],
                          [['const ', C.kw], ['sorted = ideas.', C.tx], ['sort', C.fn], ['(', C.tx]],
                          [['  (a, b) => b.votes - a.votes);', C.tx]],
                          [['function ', C.kw], ['vote', C.fn], ['(id) {', C.tx]],
                          [['  ideas[id].votes++;', C.tx]],
                          [['  render', C.fn], ['();', C.tx]],
                          [['}', C.tx]],
                          [['const ', C.kw], ['deadline = ', C.tx], ['"Fri"', C.str], [';', C.tx]],
                          [['if ', C.kw], ['(', C.tx], ['now', C.fn], ['() > deadline) lock();', C.tx]],
                          [['render', C.fn], ['();', C.tx]],
                        ];
                        return <CodeLine key={i} toks={toks[i]} style={{ opacity: prog(t, 101.0 + i * 0.12, 0.2) }} />;
                      })}
                    </CodeCard>
                  </div>
                  <div className="kit-pill" style={{ position: 'absolute', left: '50%', top: '50%', transform: `translate(-50%, -50%) scale(${0.8 + 0.2 * prog(t, 105.3, 0.5, BACK)})`, opacity: prog(t, 105.3, 0.4), fontSize: 26, boxShadow: '0 10px 30px rgba(0,0,0,.12)' }}>
                    Sometimes without even looking at the code
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </Scene>

      {/* 11 — Describe → generate → refine */}
      <Scene t={t} index={10}>
        <div className="kit-h2" style={enter(t, 108.2, { dur: 0.8, y: 30 })}>
          The shift: <span style={{ position: 'relative', color: t >= 111.84 ? MUTED : INK }}>know how to write software<Strike t={t} at={111.84} /></span>
        </div>
        <div className="kit-h2" style={{ marginTop: 8, ...enter(t, 115.0, { dur: 0.8, y: 20 }) }}>
          <span className="kit-mark" style={markStyle(t, 115.4)}>Describe what you want it to do.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 70 }}>
          <Node on={t >= 118.48 && t < 120.4 ? 1 : 0} label="Explain your idea" w={360} style={enter(t, 118.48, { y: 16, easing: BACK })} />
          <Arrow t={t} at={119.6} w={110} />
          <div style={{ position: 'relative', ...enter(t, 120.4, { y: 16, easing: BACK }) }}>
            <Node on={t >= 120.4 && t < 122.64 ? 1 : 0} label="AI generates" sub={t < 122.64 ? 'version 1' : `version ${1 + Math.min(3, Math.floor((t - 122.64) / 0.7) + 1)}`} w={360} />
          </div>
          <Arrow t={t} at={121.8} w={110} />
          <Node on={t >= 122.64 ? 1 : 0} label="Refine with feedback" w={400} style={enter(t, 122.64, { y: 16, easing: BACK })} />
        </div>
        {/* return loop */}
        <svg width={1200} height={90} style={{ marginTop: 10, overflow: 'visible' }}>
          <path
            d="M 1180 0 C 1180 70, 1100 80, 900 80 L 300 80 C 120 80, 180 40, 180 0"
            fill="none"
            stroke={GREEN}
            strokeWidth={5}
            strokeDasharray="12 10"
            strokeLinecap="round"
            opacity={prog(t, 123.2, 0.6)}
          />
          <path d="M 166 18 L 180 0 L 194 18" fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" opacity={prog(t, 123.6, 0.3)} />
        </svg>
      </Scene>

      {/* 12 — Non-technical leaders: idea → something you can interact with */}
      <Scene t={t} index={11}>
        <Chapter t={t} at={125.5} n="04">Where non-technical leaders come in</Chapter>
        <div style={{ display: 'grid', gridTemplateColumns: '640px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 125.6, { dur: 0.8, y: 30 })}>
              Describe an idea. Get something you can <span className="kit-mark" style={markStyle(t, 137.0)}>use.</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 44 }}>
              {[
                ['Gemini Canvas', 129.92],
                ['ChatGPT Sites', 131.2],
                ['Lovable', 132.8],
              ].map(([n, at]) => (
                <div key={n as string} className="kit-pill" style={enter(t, at as number, { y: 14, easing: BACK })}>
                  {n as string}
                </div>
              ))}
            </div>
          </div>
          {(() => {
            const morph = prog(t, 135.28, 0.9, IN_OUT);
            return (
              <div style={{ position: 'relative', height: 520 }}>
                <div style={{ position: 'absolute', left: 0, top: 160, opacity: 1 - morph, transform: `scale(${1 - morph * 0.2})`, ...enter(t, 133.9, { y: 20 }) }}>
                  <Composer w={820} text={typed(t, 134.0, 'A budget planner for our offsite', 1.0)} caret />
                </div>
                <div className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: 0, width: 820, height: 500, overflow: 'hidden', opacity: morph, transform: `scale(${0.85 + morph * 0.15})`, boxShadow: '0 24px 60px rgba(0,0,0,.12)' }}>
                  <div style={{ height: 44, background: '#F1F1EC', display: 'flex', alignItems: 'center', gap: 8, padding: '0 18px' }}>
                    {['#E06C5A', '#E6B450', '#7FBF5A'].map((c) => (
                      <div key={c} style={{ width: 12, height: 12, borderRadius: 6, background: c }} />
                    ))}
                  </div>
                  <div style={{ padding: '26px 34px' }}>
                    <div style={{ fontSize: 32, fontWeight: 700 }}>Offsite budget</div>
                    {(() => {
                      const people = Math.round(interpolate(t, [137.1, 138.2], [24, 40], { ...clamp, easing: IN_OUT }));
                      const sliderX = interpolate(t, [137.1, 138.2], [0.3, 0.62], { ...clamp, easing: IN_OUT });
                      return (
                        <>
                          <div style={{ fontSize: 22, color: MUTED, marginTop: 24 }}>Attendees: <b style={{ color: INK }}>{people}</b></div>
                          <div style={{ position: 'relative', height: 30, marginTop: 10 }}>
                            <div style={{ position: 'absolute', top: 12, left: 0, right: 0, height: 6, borderRadius: 3, background: LINE }} />
                            <div style={{ position: 'absolute', top: 12, left: 0, width: `${sliderX * 100}%`, height: 6, borderRadius: 3, background: LIME }} />
                            <div style={{ position: 'absolute', top: 2, left: `calc(${sliderX * 100}% - 13px)`, width: 26, height: 26, borderRadius: 13, background: '#fff', border: `3px solid ${GREEN}` }} />
                          </div>
                          <div style={{ display: 'flex', gap: 18, marginTop: 30 }}>
                            {[
                              ['Venue', 3200],
                              ['Travel', people * 180],
                              ['Food', people * 95],
                            ].map(([k, v]) => (
                              <div key={k as string} style={{ flex: 1, background: '#FBFBF8', border: `2px solid ${LINE}`, borderRadius: 14, padding: '16px 18px' }}>
                                <div style={{ fontSize: 18, color: MUTED }}>{k as string}</div>
                                <div style={{ fontSize: 30, fontWeight: 700 }}>${(v as number).toLocaleString('en-US')}</div>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: 22, fontSize: 24 }}>
                            Total <b>${(3200 + people * 275).toLocaleString('en-US')}</b>
                          </div>
                          {/* cursor dragging the slider */}
                          <svg width={30} height={30} viewBox="0 0 24 24" style={{ position: 'absolute', left: 34 + sliderX * 752 + 4, top: 44 + 26 + 80 + 14, opacity: prog(t, 136.6, 0.3) }}>
                            <path d="M4 2l15 9-7 1.5L9 20z" fill={INK} stroke="#fff" strokeWidth="1.5" />
                          </svg>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 13 — Three things you could build */}
      <Scene t={t} index={12}>
        <div className="kit-h2" style={enter(t, 139.1, { dur: 0.8, y: 30 })}>Maybe it’s…</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 50 }}>
          {/* dashboard */}
          <div className="kit-card kit-ui" style={{ padding: '28px 30px', height: 440, boxSizing: 'border-box', ...enter(t, 139.8, { y: 30, easing: BACK }) }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>Project dashboard</div>
            <div style={{ fontSize: 21, color: MUTED, marginTop: 4 }}>Tracks your team’s projects</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 220, marginTop: 34 }}>
              {[0.55, 0.8, 0.4, 0.95, 0.7].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h * 100 * prog(t, 140.3 + i * 0.1, 0.7)}%`, background: i === 3 ? LIME : '#D9E4CF', borderRadius: '8px 8px 0 0' }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 16, fontSize: 18, color: MUTED }}>
              <span>● On track 7</span>
              <span style={{ color: AMBER }}>● At risk 2</span>
            </div>
          </div>
          {/* scenario planner */}
          <div className="kit-card kit-ui" style={{ padding: '28px 30px', height: 440, boxSizing: 'border-box', ...enter(t, 142.88, { y: 30, easing: BACK }) }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>Scenario planner</div>
            <div style={{ fontSize: 21, color: MUTED, marginTop: 4 }}>Compare business decisions</div>
            {[
              ['A · Hire 2 now', 0.62, 143.7],
              ['B · Outsource', 0.48, 144.0],
              ['C · Wait a quarter', 0.3, 144.3],
            ].map(([n, v, at], i) => (
              <div key={i} style={{ marginTop: i === 0 ? 34 : 24 }}>
                <div style={{ fontSize: 22, fontWeight: 600 }}>{n as string}</div>
                <div style={{ height: 16, borderRadius: 8, background: '#F1F1EC', marginTop: 8 }}>
                  <div style={{ height: 16, borderRadius: 8, width: `${(v as number) * 100 * prog(t, at as number, 0.8)}%`, background: i === 0 && t >= 145.0 ? LIME : '#C7D7BA' }} />
                </div>
              </div>
            ))}
          </div>
          {/* simple app */}
          <div className="kit-card kit-ui" style={{ padding: '28px 30px', height: 440, boxSizing: 'border-box', ...enter(t, 147.24, { y: 30, easing: BACK }) }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>Simple app</div>
            <div style={{ fontSize: 21, color: MUTED, marginTop: 4 }}>Solves a recurring problem</div>
            {['Collect weekly updates', 'Remind who’s missing', 'Draft the summary'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 24, marginTop: i === 0 ? 40 : 22 }}>
                {t >= 148.0 + i * 0.4 ? <Check size={30} /> : <div style={{ width: 30, height: 30, borderRadius: 15, border: `2px solid ${LINE}` }} />}
                {s}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 14 — Start with the problem */}
      <Scene t={t} index={13}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div className="kit-ui" style={{ fontSize: 28, color: MUTED, fontWeight: 600, ...enter(t, 150.4, { y: 12 }) }}>You don’t have to start with…</div>
          <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
            {[
              ['Programming languages', 152.28],
              ['Software architecture', 153.64],
            ].map(([n, at]) => (
              <div key={n as string} className="kit-pill" style={{ position: 'relative', fontSize: 34, color: t >= 154.8 ? '#A8A8A8' : INK, ...enter(t, at as number, { y: 14 }) }}>
                {n as string}
                <Strike t={t} at={154.8} color="#B0B0A8" />
              </div>
            ))}
          </div>
          <div className="kit-h1" style={{ marginTop: 60, ...enter(t, 155.2, { dur: 0.9, y: 30 }) }}>
            Start with the <span className="kit-mark" style={markStyle(t, 156.0)}>problem</span> you want to solve.
          </div>
        </div>
      </Scene>

      {/* 15 — Prototype tools vs complete apps */}
      <Scene t={t} index={14}>
        <div className="kit-h2" style={enter(t, 157.9, { dur: 0.8, y: 30 })}>Different tools, different depths.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, marginTop: 56 }}>
          <div className="kit-card kit-ui" style={{ padding: '32px 36px', ...enter(t, 158.8, { y: 24 }) }}>
            <div className="kit-tag">Quick</div>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 18 }}>Interactive prototypes</div>
            <div style={{ fontSize: 26, color: MUTED, marginTop: 10 }}>See the idea, click around, share it.</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 30 }}>
              {[1, 2, 3].map((i) => (
                <div key={i} style={{ width: 110, height: 76, borderRadius: 10, border: `2px dashed #C9C9C0`, opacity: prog(t, 159.6 + i * 0.2, 0.4) }} />
              ))}
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '32px 36px', borderColor: t >= 162.24 ? GREEN : LINE, ...enter(t, 161.72, { y: 24 }) }}>
            <div className="kit-tag">Fuller</div>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 18 }}>Complete web apps</div>
            <div style={{ fontSize: 26, color: MUTED, marginTop: 10 }}>Built and published, with:</div>
            <div style={{ display: 'flex', gap: 16, marginTop: 26 }}>
              <div className="kit-pill" style={{ fontSize: 24, ...enter(t, 166.2, { y: 12, easing: BACK }) }}>
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <ellipse cx="12" cy="5.5" rx="8" ry="3" fill={LIME_SOFT} stroke={GREEN} strokeWidth="1.5" />
                  <path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" fill="none" stroke={GREEN} strokeWidth="1.5" />
                </svg>
                Database
              </div>
              <div className="kit-pill" style={{ fontSize: 24, ...enter(t, 167.28, { y: 12, easing: BACK }) }}>
                <svg width="26" height="26" viewBox="0 0 24 24">
                  <rect x="5" y="10" width="14" height="11" rx="2" fill={LIME_SOFT} stroke={GREEN} strokeWidth="1.5" />
                  <path d="M8 10V7a4 4 0 018 0v3" fill="none" stroke={GREEN} strokeWidth="1.5" />
                </svg>
                User login
              </div>
            </div>
          </div>
        </div>
        <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 44, fontSize: 30, fontWeight: 600, color: AMBER, ...enter(t, 169.1, { y: 12 }) }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: AMBER_SOFT, border: `2px solid ${AMBER}`, display: 'grid', placeItems: 'center', fontSize: 22 }}>!</div>
          But there’s an important distinction.
        </div>
      </Scene>

      {/* 16 — Works in the demo ≠ ready for real users */}
      <Scene t={t} index={15}>
        <Chapter t={t} at={173.0} n="05">From prototype to reliable product</Chapter>
        <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 70, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 173.1, { dur: 0.8, y: 30 })}>
              Working is not the same as <span className="kit-mark" style={markStyle(t, 176.4)}>reliable.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 44 }}>
              {[
                ['Idea', 180.4],
                ['Prototype', 181.52],
                ['Working app', 182.64],
              ].map(([n, at], i) => (
                <React.Fragment key={n as string}>
                  {i > 0 && <div style={{ width: 40, height: 4, background: LIME, opacity: prog(t, at as number, 0.3) }} />}
                  <div className="kit-pill" style={{ fontSize: 24, ...enter(t, at as number, { y: 10, easing: BACK, dur: 0.5 }) }}>{n as string}</div>
                </React.Fragment>
              ))}
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, fontWeight: 700, ...enter(t, 179.68, { x: -10, y: 0 }) }}>fast</div>
            </div>
          </div>
          {(() => {
            const users = prog(t, 189.28, 0.8);
            return (
              <div style={{ position: 'relative', height: 560 }}>
                <div
                  className="kit-card kit-ui"
                  style={{
                    position: 'absolute',
                    left: 40,
                    top: 40,
                    width: 640,
                    padding: '30px 34px',
                    boxShadow: '0 24px 60px rgba(0,0,0,.12)',
                    transform: `rotate(${users * -1.5}deg)`,
                    ...enter(t, 184.6, { y: 24 }),
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="kit-tag" style={{ background: t >= 186.88 ? LIME_SOFT : '#F1F1EC' }}>Demo</div>
                    <div style={{ fontSize: 30, fontWeight: 700 }}>Team ideas board</div>
                  </div>
                  {['Launch a newsletter', 'Quarterly offsite', 'New onboarding flow'].map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 25, padding: '16px 0', borderBottom: `1px solid ${LINE}` }}>
                      <div style={{ width: 54, textAlign: 'center', fontWeight: 700, color: GREEN }}>{12 - i * 3}</div>
                      {s}
                    </div>
                  ))}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: GREEN, fontWeight: 600, marginTop: 18, ...enter(t, 186.4, { y: 8 }) }}>
                    <Check size={26} /> Works in the demo
                  </div>
                </div>
                {/* real users arrive, things break */}
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ position: 'absolute', left: 40 + i * 76, top: 470, opacity: prog(t, 189.28 + i * 0.06, 0.3), transform: `translateY(${(1 - prog(t, 189.28 + i * 0.06, 0.4)) * 40}px)` }}>
                    <Person size={46} color="#9CB98A" />
                  </div>
                ))}
                {[
                  ['Two people voted at once', 470, 10, 189.9],
                  ['Page won’t load on mobile', 360, 330, 190.4],
                ].map(([msg, x, y, at]) => (
                  <div key={msg as string} className="kit-ui" style={{ position: 'absolute', left: x as number, top: y as number, display: 'flex', alignItems: 'center', gap: 10, background: '#FBE9E1', border: `2px solid ${RED}`, borderRadius: 14, padding: '10px 16px', fontSize: 21, fontWeight: 600, boxShadow: '0 10px 24px rgba(0,0,0,.12)', ...enter(t, at as number, { y: 0, scale: 0.7, easing: BACK, dur: 0.4 }) }}>
                    <Cross size={24} /> {msg as string}
                  </div>
                ))}
                {users > 0 && <div className="kit-ui" style={{ position: 'absolute', left: 40, top: 530, fontSize: 20, color: MUTED, opacity: users }}>Real users</div>}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 17 — Three stages */}
      <Scene t={t} index={16}>
        <div className="kit-h2" style={enter(t, 191.3, { dur: 0.8, y: 30 })}>
          Think in <span className="kit-mark" style={markStyle(t, 192.0)}>three stages.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 30, marginTop: 40 }}>
          {[
            { n: '1', title: 'Prototype', at: 193.36, h: 300, qs: [['Does the idea make sense?', 195.12], ['Can people see and experience it?', 196.88]] },
            { n: '2', title: 'Working application', at: 200.24, h: 380, qs: [['Does it do the tasks it was designed for?', 202.64]] },
            {
              n: '3',
              title: 'Reliable product',
              at: 206.32,
              h: 520,
              qs: [
                ['Works consistently', 209.36],
                ['Handles the unexpected', 210.72],
                ['Protects user information', 212.52],
                ['Maintainable over time', 214.56],
              ],
            },
          ].map((s, i) => (
            <div
              key={s.n}
              className="kit-card kit-ui"
              style={{
                flex: 1,
                height: s.h,
                padding: '26px 28px',
                boxSizing: 'border-box',
                background: i === 2 ? LIME_SOFT : '#fff',
                borderColor: i === 2 ? GREEN : LINE,
                transformOrigin: 'bottom',
                ...enter(t, s.at, { y: 60, dur: 0.6, easing: BACK }),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 23, background: i === 2 ? GREEN : INK, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 24, fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: 32, fontWeight: 700 }}>{s.title}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
                {s.qs.map(([q, at]) => (
                  <div key={q as string} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 25, lineHeight: 1.3, ...enter(t, at as number, { x: -12, y: 0, dur: 0.5 }) }}>
                    {i === 2 ? <Check size={28} /> : <span style={{ color: GREEN, fontWeight: 700 }}>?</span>}
                    {q as string}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 18 — Oversight grows as you move toward a real product */}
      <Scene t={t} index={17}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 217.2, { dur: 0.8, y: 30 })}>
              AI helps at <span className="kit-mark" style={markStyle(t, 218.4)}>every stage.</span>
            </div>
            <p className="kit-body" style={{ marginTop: 34, ...enter(t, 220.1, { y: 14 }) }}>
              Closer to a real product, more of the work is <b>checking</b>.
            </p>
            <div className="kit-card kit-ui" style={{ marginTop: 44, padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'center', borderColor: AMBER, background: AMBER_SOFT, ...enter(t, 228.24, { y: 20 }) }}>
              <svg width="54" height="54" viewBox="0 0 24 24" style={{ flex: 'none' }}>
                <path d="M12 2l8 3.5v6c0 5-3.4 9-8 10.5C7.4 20.5 4 16.5 4 11.5v-6z" fill="#fff" stroke={AMBER} strokeWidth="1.6" />
                <path d="M8.5 12l2.4 2.4 4.6-5" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" />
              </svg>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700 }}>You may still need technical expertise</div>
                <div style={{ fontSize: 23, color: '#6B5B3E', marginTop: 6 }}>
                  <span style={{ fontWeight: t >= 232.88 ? 700 : 400 }}>Sensitive data</span> · <span style={{ fontWeight: t >= 234.72 ? 700 : 400 }}>critical business processes</span>
                </div>
              </div>
            </div>
          </div>
          {/* stacked layers that grow */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="kit-ui" style={{ display: 'flex', justifyContent: 'space-between', fontSize: 20, fontWeight: 700, letterSpacing: '.1em', color: MUTED, ...enter(t, 218.4, { y: 8 }) }}>
              <span>PROTOTYPE</span>
              <span>WORKING APP</span>
              <span>PRODUCT</span>
            </div>
            <div style={{ height: 50, borderRadius: 12, background: LIME, display: 'flex', alignItems: 'center', paddingLeft: 20, width: `${prog(t, 218.0, 1.0, IN_OUT) * 100}%`, overflow: 'hidden' }}>
              <span className="kit-ui" style={{ fontSize: 24, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>AI assistance</span>
            </div>
            {[
              ['Testing', 222.24],
              ['Security', 223.32],
              ['Reliability', 223.84],
              ['Human oversight', 225.04],
            ].map(([n, at], i) => {
              const p = prog(t, at as number, 0.9, IN_OUT);
              return (
                <div key={n as string} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      height: 50 + i * 6,
                      width: `${p * (34 + i * 16)}%`,
                      borderRadius: 12,
                      background: i === 3 ? INK : ['#E7E3D6', '#DCE6D2', '#D9E1E8'][i],
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 18,
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  >
                    <span className="kit-ui" style={{ fontSize: 24, fontWeight: 700, whiteSpace: 'nowrap', color: i === 3 ? '#fff' : INK, opacity: prog(t, (at as number) + 0.3, 0.4) }}>{n as string}</span>
                  </div>
                </div>
              );
            })}
            <div className="kit-ui" style={{ textAlign: 'right', fontSize: 22, color: MUTED, marginTop: 6, ...enter(t, 226.6, { y: 8 }) }}>
              increasingly important →
            </div>
          </div>
        </div>
      </Scene>

      {/* 19 — Developer → Director */}
      <Scene t={t} index={18}>
        <Chapter t={t} at={237.6} n="06">The mindset shift</Chapter>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 780px', gap: 70, alignItems: 'center' }}>
          <div className="kit-h1" style={{ fontSize: 96, ...enter(t, 237.7, { dur: 0.9, y: 30 }) }}>
            From developer to <span className="kit-mark" style={markStyle(t, 247.12)}>director.</span>
          </div>
          {(() => {
            const flip = prog(t, 245.3, 1.0, IN_OUT);
            const showBack = flip > 0.5;
            return (
              <div style={{ perspective: 1600, ...enter(t, 242.4, { y: 30 }) }}>
                <div
                  className="kit-card kit-ui"
                  style={{
                    height: 460,
                    padding: '40px 44px',
                    boxSizing: 'border-box',
                    transform: `rotateY(${flip * 180}deg)`,
                    background: showBack ? LIME_SOFT : '#fff',
                    borderColor: showBack ? GREEN : LINE,
                    boxShadow: '0 24px 60px rgba(0,0,0,.10)',
                  }}
                >
                  <div style={{ transform: showBack ? 'scaleX(-1)' : 'none' }}>
                    {!showBack ? (
                      <>
                        <div className="kit-tag" style={{ background: '#F1F1EC' }}>Role</div>
                        <div style={{ fontSize: 56, fontWeight: 700, marginTop: 20, position: 'relative', display: 'inline-block' }}>
                          Developer
                          <Strike t={t} at={244.2} />
                        </div>
                        <div className="kit-mono" style={{ fontSize: 24, color: MUTED, marginTop: 30, lineHeight: 1.7 }}>
                          writes the code
                          <br />
                          knows the syntax
                          <br />
                          builds every piece
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="kit-tag">Your role</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 20 }}>
                          {/* clapperboard */}
                          <svg width="84" height="84" viewBox="0 0 24 24">
                            <rect x="2.5" y="9" width="19" height="12.5" rx="1.5" fill={INK} />
                            <g transform={`rotate(${-14 + 14 * prog(t, 247.12, 0.3)} 2.5 9)`}>
                              <rect x="2.5" y="4.6" width="19" height="4.4" rx="1" fill={INK} />
                              <path d="M6 4.6l-2 4.4M10.5 4.6l-2 4.4M15 4.6l-2 4.4M19.5 4.6l-2 4.4" stroke="#fff" strokeWidth="1.4" />
                            </g>
                          </svg>
                          <div style={{ fontSize: 64, fontWeight: 700 }}>Director</div>
                        </div>
                        <div style={{ fontSize: 28, marginTop: 30, lineHeight: 1.5, color: '#2F4A1F' }}>
                          Sets the vision. Guides the work.
                          <br />
                          Decides what’s good enough.
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 20 — The director's moves */}
      <Scene t={t} index={19}>
        <div className="kit-h2" style={enter(t, 249.0, { dur: 0.8, y: 30 })}>
          Your <span className="kit-mark" style={markStyle(t, 249.2)}>leverage</span> as director
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 30, marginTop: 64 }}>
          {[
            ['01', 'Define', 'what you want', 250.16],
            ['02', 'Explain', 'what good looks like', 252.04],
            ['03', 'Identify', 'the problems', 254.08],
            ['04', 'Guide', 'AI through iteration', 255.6],
          ].map(([n, verb, rest, at]) => (
            <div
              key={n as string}
              className="kit-card kit-ui"
              style={{ padding: '30px 30px 34px', height: 300, boxSizing: 'border-box', borderColor: t >= (at as number) && t < (at as number) + 2 ? GREEN : LINE, ...enter(t, at as number, { y: 40, easing: BACK }) }}
            >
              <div className="kit-mono" style={{ fontSize: 24, color: GREEN }}>{n as string}</div>
              <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 52, marginTop: 30, letterSpacing: '-0.02em' }}>{verb as string}</div>
              <div style={{ fontSize: 28, color: MUTED, marginTop: 8 }}>{rest as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 21 — Start small, then business */}
      <Scene t={t} index={20}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: 30, alignItems: 'center' }}>
          <div>
            <div className="kit-tag" style={enter(t, 258.0, { y: 8 })}>Start small</div>
            <div className="kit-h2" style={{ marginTop: 20, ...enter(t, 258.1, { dur: 0.8, y: 24 }) }}>At home</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 36 }}>
              {[
                ['🍲', 'Recipe maker', 259.92],
                ['🧹', 'Household chores app', 261.04],
                ['📚', 'Book recommender', 262.76],
              ].map(([e, n, at]) => (
                <div key={n as string} className="kit-card kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 26px', fontSize: 32, fontWeight: 600, ...enter(t, at as number, { x: -30, y: 0, easing: BACK }) }}>
                  <span style={{ fontSize: 40 }}>{e as string}</span> {n as string}
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Arrow t={t} at={264.0} w={150} label="same approach" />
          </div>
          <div>
            <div className="kit-tag" style={enter(t, 265.6, { y: 8 })}>Then</div>
            <div className="kit-h2" style={{ marginTop: 20, ...enter(t, 265.7, { dur: 0.8, y: 24 }) }}>At work</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 36 }}>
              {[
                ['📊', 'Decision dashboards', 267.44],
                ['🛠️', 'Internal tools', 268.8],
                ['🔀', 'Scenario planners', 269.92],
              ].map(([e, n, at]) => (
                <div key={n as string} className="kit-card kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '20px 26px', fontSize: 32, fontWeight: 600, borderColor: GREEN, background: LIME_SOFT, ...enter(t, at as number, { x: 30, y: 0, easing: BACK }) }}>
                  <span style={{ fontSize: 40 }}>{e as string}</span> {n as string}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 22 — Lower barrier, same responsibility */}
      <Scene t={t} index={21}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-h2" style={enter(t, 272.3, { dur: 0.8, y: 30 })}>
              Building software, <span className="kit-mark" style={markStyle(t, 275.6)}>open to more people.</span>
            </div>
            <div className="kit-body" style={{ marginTop: 40, fontSize: 36, ...enter(t, 280.6, { y: 16 }) }}>
              But the <b>responsibility</b> stays:
              <br />
              <span className="kit-mark" style={markStyle(t, 283.3)}>make sure it works reliably.</span>
            </div>
          </div>
          {(() => {
            const lower = prog(t, 278.32, 1.2, IN_OUT);
            return (
              <div style={{ position: 'relative', height: 520, ...enter(t, 277.6, { y: 20 }) }}>
                {/* ground */}
                <div style={{ position: 'absolute', left: 0, right: 0, top: 440, height: 4, background: LINE }} />
                {/* posts */}
                {[120, 420].map((x) => (
                  <div key={x} style={{ position: 'absolute', left: x, top: 120, width: 18, height: 320, borderRadius: 4, background: '#C9C9C0' }} />
                ))}
                {/* the barrier bar */}
                <div
                  style={{
                    position: 'absolute',
                    left: 90,
                    width: 360,
                    top: 140 + lower * 250,
                    height: 34,
                    borderRadius: 8,
                    background: `repeating-linear-gradient(135deg, ${AMBER} 0 26px, #fff 26px 52px)`,
                    border: `2px solid ${AMBER}`,
                  }}
                />
                <div className="kit-ui" style={{ position: 'absolute', left: 0, width: 540, top: 462, textAlign: 'center', fontSize: 24, fontWeight: 700, color: AMBER }}>
                  {lower > 0.5 ? 'A lower barrier to building' : 'The barrier to building'}
                </div>
                {/* people stepping over */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const p = prog(t, 279.3 + i * 0.25, 1.4, IN_OUT);
                  const x = 0 + p * (480 + (4 - i) * 55);
                  const hop = Math.sin(Math.PI * Math.min(1, Math.max(0, (x - 60) / 400))) * 70;
                  return (
                    <div key={i} style={{ position: 'absolute', left: x, top: 380 - hop, opacity: prog(t, 279.0 + i * 0.2, 0.3) }}>
                      <Person size={58} color={i === 0 ? GREEN : '#9CB98A'} />
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 23 — The opportunity: idea → test → learn → decide */}
      <Scene t={t} index={22} padStyle={{ opacity: 1 - prog(t, 296.6, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 285.9, { y: 14 })}>For leaders</div>
        <div className="kit-h1" style={enter(t, 286.0, { dur: 0.9, y: 34 })}>
          That’s <span className="kit-mark" style={markStyle(t, 287.28)}>the opportunity.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 80 }}>
          {[
            ['Idea', 290.0, false],
            ['Test it', 291.44, true],
            ['Learn from it', 292.32, true],
            ['Decide', 293.48, true],
          ].map(([n, at, arrow], i) => (
            <React.Fragment key={n as string}>
              {arrow && <Arrow t={t} at={(at as number) - 0.4} w={90} />}
              <div
                className="kit-pill"
                style={{
                  fontSize: 36,
                  padding: '22px 36px',
                  borderColor: i === 3 ? GREEN : LINE,
                  background: i === 3 ? LIME_SOFT : '#fff',
                  ...enter(t, at as number, { y: 16, easing: BACK }),
                }}
              >
                {n as string}
              </div>
            </React.Fragment>
          ))}
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 40, ...enter(t, 294.0, { y: 12 }) }}>
          …is it worth developing further?
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const VibeCoding: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={VIBE_CODING_TITLE_FRAMES}>
      <TitleCardGreen label="BUILDING WITH AI" title="Vibe Coding" />
    </Sequence>
    <Sequence from={VIBE_CODING_TITLE_FRAMES}>
      <VibeCodingBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
