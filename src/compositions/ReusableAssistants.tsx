import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
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
  Toggle,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// From CODO Prompts to Reusable Assistants — custom concept composition (Lead with AI).
// Built with the LWAI demo kit (src/kit). Every cue is in SECONDS of the VO
// (audio/reusable-assistants.mp3, Daan on ElevenLabs v4, 214.16s), taken from the Scribe word
// timestamps in src/data/reusable-assistants.transcript.json. A 90-frame green title card opens the
// video; the VO and every scene start after it. Scenes cut in during the [pause] before their first word.
//
//  #  scene                               start   VO cue
//  1  Where you are now                   0.00    "By now, you know how to spot…"
//  2  Still working linearly              11.40   "But if you're rebuilding the same prompt…"
//  3  Assistants are your SOPs            25.90   "If prompting is delegation…"
//  4  CODO Prompt → Prompt Template       37.90   "The first step is to convert your CODO Prompt…"
//  5  Standing vs variable                49.90   "Standing instructions define…"
//  6  Example: Board of Advisors          65.80   "Take our Personal Board of Advisors…"
//  7  The template version                82.05   "In the Prompt Template, I keep…"
//  8  Copy-paste works, but…              101.90  "Now, you can already reuse…"
//  9  Save it as an assistant             115.45  "Many AI platforms let you create…"
//  10 Define once, reuse                  128.70  "The setup may differ…"
//  11 1. Keep it focused                  148.05  "Before you start building…"
//  12 2. Test before you build            167.55  "Second, test before you build."
//  13 3. Stay vigilant                    186.05  "And finally, stay vigilant."
//  14 You own the results                 207.25  "Reusable assistants can reduce…"

export const REUSABLE_ASSISTANTS_DURATION_S = 215.6;
export const REUSABLE_ASSISTANTS_TITLE_FRAMES = 90;

const STARTS = [0, 11.4, 25.9, 37.9, 49.9, 65.8, 82.05, 101.9, 115.45, 128.7, 148.05, 167.55, 186.05, 207.25];
const Scene = makeScene(STARTS, 0.5);

// ── Small pieces ────────────────────────────────────────────────────────────
const Person: React.FC<{ size?: number; color?: string }> = ({ size = 56, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="12" fill={LIME_SOFT} />
    <circle cx="12" cy="9.2" r="3.6" fill={color} />
    <path d="M5.4 19.2c1.2-3.4 3.8-5 6.6-5s5.4 1.6 6.6 5" fill={color} />
  </svg>
);

const Lock: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <rect x="4.5" y="10.5" width="15" height="11" rx="2.4" fill={GREEN} />
    <path d="M8 10.5V7.6a4 4 0 018 0v2.9" fill="none" stroke={GREEN} strokeWidth="2.2" />
  </svg>
);

const Warn: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M12 2.5L23 21.5H1z" fill={RED} strokeLinejoin="round" />
    <rect x="11" y="9" width="2" height="7" rx="1" fill="#fff" />
    <circle cx="12" cy="18.3" r="1.2" fill="#fff" />
  </svg>
);

const Strike: React.FC<{ t: number; at: number; children: React.ReactNode }> = ({ t, at, children }) => (
  <span style={{ position: 'relative' }}>
    {children}
    <span style={{ position: 'absolute', left: -4, top: '52%', height: 6, borderRadius: 3, background: RED, width: `calc(${prog(t, at, 0.6, IN_OUT) * 100}% + 8px)` }} />
  </span>
);

// A document line: lime bar for standing instructions, dashed slot for variable input.
const DocLine: React.FC<{ kind?: 'plain' | 'standing' | 'variable'; children: React.ReactNode; style?: React.CSSProperties }> = ({ kind = 'plain', children, style }) => (
  <div
    className="kit-ui"
    style={{
      fontSize: 27,
      lineHeight: 1.35,
      padding: '12px 18px',
      borderRadius: 12,
      borderLeft: kind === 'standing' ? `6px solid ${LIME}` : '6px solid transparent',
      background: kind === 'standing' ? '#F6FAF1' : kind === 'variable' ? '#fff' : 'transparent',
      border: kind === 'variable' ? `2px dashed ${GREEN}` : undefined,
      ...style,
    }}
  >
    {children}
  </div>
);

const DocHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 20, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 16, textTransform: 'uppercase' }}>
    <FileIcon size={28} accent /> {children}
  </div>
);

// Stepper for the "three things to remember" scenes.
const Stepper: React.FC<{ t: number; active: number; at: number }> = ({ t, active, at }) => (
  <div style={{ display: 'flex', gap: 18, marginBottom: 46, ...enter(t, at, { y: -10 }) }}>
    {['Keep it focused', 'Test before you build', 'Stay vigilant'].map((s, i) => (
      <div
        key={s}
        className="kit-pill"
        style={{
          fontSize: 24,
          padding: '10px 22px',
          background: i === active ? LIME_SOFT : '#fff',
          borderColor: i === active ? GREEN : LINE,
          color: i <= active ? INK : '#A8A8A8',
        }}
      >
        <span style={{ fontWeight: 700, color: i === active ? GREEN : 'inherit' }}>{i + 1}</span> {s}
      </div>
    ))}
  </div>
);

const DECISIONS = ['Should we enter a new market?', 'Which AI pilot comes first?', 'How do we restructure the team?'];

// ── Body ────────────────────────────────────────────────────────────────────
const ReusableAssistantsBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/reusable-assistants.mp3')} />}

      {/* 1 — Where you are now */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>So far</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          You can spot which tasks <span className="kit-mark" style={markStyle(t, 2.8)}>deserve AI support.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 90 }}>
          {[
            ['Qualify', 5.08],
            ['Break into atomic steps', 6.16],
            ['Route each step', 8.16],
          ].map(([label, at], i) => (
            <React.Fragment key={label as string}>
              {i > 0 && <Arrow t={t} at={(at as number) - 0.5} w={110} />}
              <div className="kit-pill" style={{ fontSize: 34, padding: '20px 34px', ...enter(t, at as number, { x: -30, y: 0, easing: BACK }) }}>
                <Check size={34} /> {label as string}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Scene>

      {/* 2 — Still working linearly */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 11.6, { y: 14 })}>The problem</div>
        <div className="kit-h2" style={enter(t, 11.8, { dur: 0.8, y: 30 })}>
          Every new chat starts <span className="kit-mark" style={markStyle(t, 12.68)}>from zero.</span>
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 70 }}>
          {[12.68, 15.04, 15.84].map((at, i) => (
            <div key={i} style={{ ...enter(t, at, { y: 30 }) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span className="kit-tag">New chat {i + 1}</span>
                {t >= 19.32 && (
                  <span className="kit-ui" style={{ fontSize: 22, fontWeight: 600, color: RED, ...enter(t, 19.32 + i * 0.25, { y: 0, scale: 0.6, easing: BACK }) }}>
                    ↻ rebuilt again
                  </span>
                )}
              </div>
              <Composer w={540} text={typed(t, at + 0.2, 'You are… my role is… the context is… I need…', 2.2)} caret={t < at + 2.4} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 60 }}>
          <span className="kit-h3" style={enter(t, 17.28, { y: 14 })}>
            Still working <span className="kit-mark" style={markStyle(t, 18.0)}>linearly.</span>
          </span>
          <span className="kit-pill" style={{ marginLeft: 'auto', background: LIME_SOFT, borderColor: GREEN, ...enter(t, 22.64, { scale: 0.7, y: 0, easing: BACK }) }}>
            The fix: reusable assistants
          </span>
        </div>
      </Scene>

      {/* 3 — Assistants are your SOPs */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 26.1, { y: 14 })}>Reusable assistants</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', alignItems: 'center', gap: 30, marginTop: 10 }}>
          <div className="kit-card" style={{ padding: '40px 44px', ...enter(t, 26.56, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 24, color: MUTED, fontWeight: 600 }}>If prompting is</div>
            <div className="kit-h2" style={{ marginTop: 8 }}>Delegation</div>
          </div>
          <div className="kit-h2" style={{ textAlign: 'center', color: GREEN, ...enter(t, 28.32, { y: 0, scale: 0.6, easing: BACK }) }}>→</div>
          <div className="kit-card" style={{ padding: '40px 44px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 28.64, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 24, color: GREEN, fontWeight: 600 }}>Reusable assistants are your</div>
            <div className="kit-h2" style={{ marginTop: 8, ...enter(t, 30.4, { y: 10 }) }}>Standard operating procedures</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34, marginTop: 80 }}>
          <div className="kit-pill" style={enter(t, 33.32, { x: -30, y: 0 })}>
            <FileIcon size={30} accent /> Your best prompt
          </div>
          <Arrow t={t} at={33.9} w={160} />
          <div style={{ display: 'flex', gap: 14, ...enter(t, 34.44, { y: 0, x: -20 }) }}>
            {[0, 1, 2].map((i) => (
              <div key={i} className="kit-pill" style={{ fontSize: 26, ...enter(t, 34.6 + i * 0.35, { y: 0, scale: 0.7, easing: BACK }) }}>
                ↻ Run {i + 1}
              </div>
            ))}
          </div>
          <span className="kit-ui" style={{ fontSize: 28, color: MUTED, ...enter(t, 36.0, { y: 10 }) }}>Repeatable workflow</span>
        </div>
      </Scene>

      {/* 4 — CODO Prompt → Prompt Template */}
      <Scene t={t} index={3}>
        {(() => {
          const split = prog(t, 46.08, 0.9, IN_OUT);
          const isTemplate = t >= 41.68;
          return (
            <div style={{ display: 'grid', gridTemplateColumns: '640px 1fr', gap: 90, alignItems: 'center' }}>
              <div>
                <div className="kit-label" style={enter(t, 38.1, { y: 14 })}>Step 1</div>
                <div className="kit-h2" style={enter(t, 38.3, { dur: 0.8, y: 30 })}>
                  Turn your prompt into a <span className="kit-mark" style={markStyle(t, 42.32)}>template.</span>
                </div>
                <p className="kit-body" style={{ marginTop: 40, ...enter(t, 44.0, { y: 14 }) }}>
                  The key difference: it <b>separates</b> what stays the same from what changes.
                </p>
              </div>
              <div style={{ ...enter(t, 39.44, { y: 30 }) }}>
                <div className="kit-ui" style={{ fontSize: 20, letterSpacing: '.1em', fontWeight: 700, color: isTemplate ? GREEN : MUTED, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FileIcon size={28} accent={isTemplate} />
                  <span style={{ opacity: isTemplate ? prog(t, 41.68, 0.5) : 1 }}>{isTemplate ? 'ASSISTANT PROMPT TEMPLATE' : 'CODO PROMPT'}</span>
                </div>
                <div className="kit-card" style={{ padding: '22px 22px', borderBottomLeftRadius: 22 * split, borderBottomRightRadius: 22 * split, borderBottomWidth: split > 0.02 ? 2 : 0, borderColor: split > 0.5 ? GREEN : LINE, background: split > 0.5 ? '#F6FAF1' : '#fff' }}>
                  {split > 0.3 && (
                    <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 700, color: GREEN, marginBottom: 10, ...enter(t, 46.72, { y: 0 }) }}>
                      <Lock size={24} /> Standing instructions
                    </div>
                  )}
                  {['Role: who the assistant is', 'Purpose: what it helps with', 'How it should work', 'What the output looks like'].map((l) => (
                    <DocLine key={l} kind={split > 0.5 ? 'standing' : 'plain'} style={{ marginBottom: 6 }}>{l}</DocLine>
                  ))}
                </div>
                <div style={{ height: 50 * split }} />
                <div className="kit-card" style={{ padding: '22px 22px', borderTopLeftRadius: 22 * split, borderTopRightRadius: 22 * split, borderTopWidth: split > 0.02 ? 2 : 0, borderColor: split > 0.5 ? GREEN : LINE, marginLeft: split * 40, width: `calc(100% - ${split * 40}px)` }}>
                  {split > 0.3 && (
                    <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, color: GREEN, marginBottom: 10, ...enter(t, 48.16, { y: 0 }) }}>
                      ✎ Variable inputs
                    </div>
                  )}
                  <DocLine kind={split > 0.5 ? 'variable' : 'plain'}>This time: the situation, question or document</DocLine>
                </div>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 5 — Standing vs variable */}
      <Scene t={t} index={4}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
          <div className="kit-card" style={{ padding: '44px 48px', borderColor: GREEN, background: '#F6FAF1', ...enter(t, 50.4, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <Lock size={40} />
              <div className="kit-h3">Standing instructions</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 36 }}>
              {[
                ['Role', 52.72],
                ['Purpose', 53.6],
                ['How it should work', 54.4],
                ['What the output looks like', 55.84],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                  <Check size={32} /> {w as string}
                </div>
              ))}
            </div>
            <span className="kit-tag" style={{ marginTop: 36, ...enter(t, 57.92, { y: 0, scale: 0.6, easing: BACK }) }}>Stays consistent</span>
          </div>
          <div className="kit-card" style={{ padding: '44px 48px', borderStyle: 'dashed', borderColor: '#B9B9B0', ...enter(t, 59.6, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 40, color: GREEN }}>✎</span>
              <div className="kit-h3">Variable inputs</div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 36 }}>
              {[
                ['Situations', 61.44],
                ['Questions', 62.8],
                ['Documents', 63.36],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-pill" style={{ ...enter(t, at as number, { y: 0, scale: 0.7, easing: BACK }) }}>
                  {w as string}
                </div>
              ))}
            </div>
            <span className="kit-tag" style={{ marginTop: 36, background: INK, color: '#fff', ...enter(t, 64.48, { y: 0, scale: 0.6, easing: BACK }) }}>New each time</span>
          </div>
        </div>
      </Scene>

      {/* 6 — Example: Personal Board of Advisors (regular CODO Prompt) */}
      <Scene t={t} index={5}>
        <div style={{ display: 'grid', gridTemplateColumns: '600px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 66.0, { y: 14 })}>Example</div>
            <div className="kit-h2" style={enter(t, 66.2, { dur: 0.8, y: 30 })}>
              <span className="kit-mark" style={markStyle(t, 67.0)}>Personal Board</span> of Advisors
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 50 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={enter(t, 79.28 + i * 0.18, { y: 0, scale: 0.5, easing: BACK })}>
                  <Person size={78} />
                </div>
              ))}
            </div>
            <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 16, ...enter(t, 79.6, { y: 8 }) }}>Your virtual board</div>
          </div>
          <div className="kit-card" style={{ padding: '30px 30px', ...enter(t, 69.44, { y: 30 }) }}>
            <DocHeader>Regular CODO Prompt</DocHeader>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <DocLine style={enter(t, 71.88, { x: -16, y: 0 })}>{typed(t, 71.88, "I'm a CEO in the AI transformation space.", 1.6)}</DocLine>
              <DocLine style={enter(t, 76.08, { x: -16, y: 0 })}>{typed(t, 76.08, "Here's the business challenge I'm facing right now…", 1.8)}</DocLine>
              <DocLine style={enter(t, 78.4, { x: -16, y: 0 })}>{typed(t, 78.4, 'Act as my board of advisors and help me think it through.', 2.0)}</DocLine>
            </div>
          </div>
        </div>
      </Scene>

      {/* 7 — The template version */}
      <Scene t={t} index={6}>
        {(() => {
          // the decision slot fills at "specific business decision", then swaps at "every time" and "new situation"
          const di = t < 93.44 ? 0 : t < 98.16 ? 1 : 2;
          const swapAt = [91.56, 93.44, 98.16][di];
          return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 820px', gap: 80, alignItems: 'center' }}>
              <div>
                <div className="kit-label" style={enter(t, 82.25, { y: 14 })}>As a Prompt Template</div>
                <div className="kit-h2" style={enter(t, 82.4, { dur: 0.8, y: 30 })}>
                  Same instructions. <span className="kit-mark" style={markStyle(t, 98.56)}>New situation.</span>
                </div>
                <p className="kit-body" style={{ marginTop: 44, ...enter(t, 95.12, { y: 14 }) }}>
                  <Strike t={t} at={96.08}>Rebuild the whole prompt</Strike>
                </p>
                <p className="kit-body" style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14, ...enter(t, 97.76, { y: 14 }) }}>
                  <Check size={34} /> Just bring the new decision
                </p>
              </div>
              <div className="kit-card" style={{ padding: '30px 30px', ...enter(t, 82.8, { y: 30 }) }}>
                <DocHeader>Board of Advisors template</DocHeader>
                <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 700, color: GREEN, margin: '4px 0 10px', ...enter(t, 84.4, { y: 0 }) }}>
                  <Lock size={22} /> Standing instructions
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <DocLine kind="standing" style={enter(t, 86.0, { x: -16, y: 0 })}><b>Who I am:</b> CEO in the AI transformation space</DocLine>
                  <DocLine kind="standing" style={enter(t, 86.96, { x: -16, y: 0 })}><b>Your job:</b> help me think through business decisions</DocLine>
                  <DocLine kind="standing" style={enter(t, 88.72, { x: -16, y: 0 })}>
                    <b>How:</b> <span className="kit-mark" style={markStyle(t, 89.6)}>challenge my thinking</span> and push back
                  </DocLine>
                </div>
                <div className="kit-ui" style={{ fontSize: 21, fontWeight: 700, color: GREEN, margin: '22px 0 10px', ...enter(t, 91.3, { y: 0 }) }}>✎ This time</div>
                <DocLine kind="variable" style={enter(t, 91.56, { y: 0, scale: 0.9, easing: BACK })}>
                  <span key={di} style={{ display: 'inline-block', ...enter(t, swapAt, { y: 16, dur: 0.5 }) }}>
                    <b>Decision:</b> {DECISIONS[di]}
                  </span>
                </DocLine>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 8 — Copy-paste works, but… */}
      <Scene t={t} index={7}>
        {(() => {
          const shift = prog(t, 109.36, 0.8, IN_OUT);
          const drop = prog(t, 110.92, 0.9, BACK);
          return (
            <>
              <div className="kit-label" style={enter(t, 102.1, { y: 14 })}>From template to assistant</div>
              <div style={{ position: 'relative', height: 120 }}>
                <div className="kit-h2" style={{ position: 'absolute', ...enter(t, 102.3, { dur: 0.8, y: 30 }), opacity: Math.min(prog(t, 102.3, 0.8), 1 - shift) }}>
                  Copy and paste? <span style={{ color: GREEN }}>That works.</span>
                </div>
                <div className="kit-h2" style={{ position: 'absolute', opacity: shift, transform: `translateY(${(1 - shift) * 20}px)` }}>
                  The real shift: <span className="kit-mark" style={markStyle(t, 111.0)}>save the instructions.</span>
                </div>
              </div>
              <div style={{ position: 'relative', height: 400, marginTop: 50 }}>
                <div
                  className="kit-card"
                  style={{ position: 'absolute', left: 640, top: 0, width: 620, height: 400, borderStyle: 'dashed', borderColor: GREEN, background: '#F6FAF1', opacity: shift, display: 'flex', alignItems: 'flex-end', padding: 26 }}
                >
                  <span className="kit-tag" style={{ fontSize: 20, ...enter(t, 113.84, { y: 0, scale: 0.6, easing: BACK }) }}>Saved for repeated use</span>
                </div>
                <div className="kit-card" style={{ position: 'absolute', left: 0, top: 70, width: 440, padding: '24px 24px', ...enter(t, 103.6, { y: 24 }), transform: `translate(${drop * 730}px, ${-drop * 20}px)` }}>
                  <DocHeader>Prompt Template</DocHeader>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ height: 18, borderRadius: 9, background: i < 2 ? LIME_SOFT : LINE, width: `${[92, 78, 60][i]}%`, marginTop: 12 }} />
                  ))}
                </div>
                <div style={{ position: 'absolute', left: 490, top: 100, opacity: 1 - shift }}>
                  <Arrow t={t} at={105.2} w={150} label="Copy, paste" />
                </div>
                <div style={{ position: 'absolute', left: 700, top: 40, opacity: 1 - shift }}>
                  <div style={enter(t, 105.6, { y: 24 })}>
                  <span className="kit-tag">New chat</span>
                  <div style={{ height: 14 }} />
                  <Composer w={500} text={t >= 105.84 ? 'Prompt Template pasted…' : ''} />
                  <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, marginTop: 16, ...enter(t, 107.84, { y: 8 }) }}>
                    <Check size={28} /> Works every time you paste it
                  </div>
                </div>
                </div>
              </div>
            </>
          );
        })()}
      </Scene>

      {/* 9 — Save it as a reusable assistant */}
      <Scene t={t} index={8}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 820px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 115.65, { y: 14 })}>Reusable assistants</div>
            <div className="kit-h2" style={enter(t, 115.8, { dur: 0.8, y: 30 })}>
              Many AI platforms let you <span className="kit-mark" style={markStyle(t, 117.68)}>build one.</span>
            </div>
            <span className="kit-tag" style={{ marginTop: 44, ...enter(t, 122.44, { y: 0, scale: 0.6, easing: BACK }) }}>Options vary by tool</span>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '30px 34px', boxShadow: '0 16px 40px rgba(0,0,0,.08)', ...enter(t, 116.6, { y: 30 }) }}>
            <div style={{ fontSize: 20, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>NEW ASSISTANT</div>
            <div style={{ fontSize: 34, fontWeight: 600, marginTop: 8 }}>Your assistant</div>
            <div style={{ marginTop: 22, ...enter(t, 120.2, { y: 10 }) }}>
              <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Instructions</div>
              <div style={{ border: `2px solid ${t >= 120.56 && t < 123.6 ? GREEN : LINE}`, borderRadius: 12, padding: '14px 16px', fontSize: 23, color: '#333', minHeight: 70, background: '#F6FAF1' }}>
                {typed(t, 120.56, 'Your standing instructions: role, purpose, how to work, output.', 1.6)}
              </div>
            </div>
            {[
              ['Knowledge', '+ Add files', 123.92],
              ['Reference materials', '+ Upload', 125.4],
              ['Access to other tools', '', 126.72],
            ].map(([label, action, at]) => (
              <div key={label as string} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `2px solid ${LINE}`, padding: '16px 2px', marginTop: 14, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                <span style={{ fontSize: 26, fontWeight: 600 }}>{label as string}</span>
                {action ? (
                  <span style={{ fontSize: 22, color: GREEN, fontWeight: 600, border: `2px solid ${LINE}`, borderRadius: 10, padding: '6px 14px' }}>{action as string}</span>
                ) : (
                  <Toggle on={prog(t, 127.3, 0.3)} w={70} />
                )}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 10 — Define once, reuse */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 128.9, { y: 14 })}>The principle</div>
        <div className="kit-h2" style={enter(t, 129.1, { dur: 0.8, y: 30 })}>
          Define how AI should work <span className="kit-mark" style={markStyle(t, 134.56)}>once.</span> Reuse it everywhere.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '320px 200px 600px 1fr', alignItems: 'center', gap: 20, marginTop: 70 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              ['New question', 141.84],
              ['New task', 142.84],
              ['New situation', 143.28],
            ].map(([w, at]) => {
              const into = prog(t, (at as number) + 0.6, 0.8, IN_OUT);
              return (
                <div key={w as string} className="kit-pill" style={{ ...enter(t, at as number, { x: -40, y: 0 }), transform: `translateX(${into * 30}px)` }}>
                  {w as string}
                </div>
              );
            })}
          </div>
          <Arrow t={t} at={141.4} w={200} />
          <div className="kit-card" style={{ padding: '34px 38px', borderColor: GREEN, background: LIME_SOFT, display: 'flex', alignItems: 'center', gap: 22, ...enter(t, 132.96, { scale: 0.7, y: 0, easing: BACK }) }}>
            <Person size={84} />
            <div>
              <div className="kit-h3">Your assistant</div>
              <div className="kit-ui" style={{ fontSize: 23, color: GREEN, marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap', ...enter(t, 145.2, { y: 6 }) }}>
                <Lock size={20} /> Already set up for this work
              </div>
            </div>
          </div>
          <div className="kit-body kit-muted" style={{ paddingLeft: 30, ...enter(t, 139.28, { y: 10 }) }}>
            <Strike t={t} at={140.32}>Start from scratch</Strike>
          </div>
        </div>
      </Scene>

      {/* 11 — Keep it focused */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={enter(t, 148.25, { y: 14 })}>Before you build</div>
        <div className="kit-h2" style={enter(t, 148.4, { dur: 0.8, y: 24 })}>
          Three things to <span className="kit-mark" style={markStyle(t, 151.2)}>remember.</span>
        </div>
        <div style={{ marginTop: 40 }}>
          <Stepper t={t} active={0} at={152.52} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, ...enter(t, 154.64, { y: 20 }) }}>
          <div className="kit-card" style={{ padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 20, borderColor: GREEN }}>
            <Person size={70} />
            <div>
              <div className="kit-h3" style={{ fontSize: 34 }}>Personal Board of Advisors</div>
              <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 4, ...enter(t, 156.32, { y: 6 }) }}>One clear purpose</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, ...enter(t, 159.68, { x: -20, y: 0 }) }}>
              <Check size={34} /> Decision-making
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, color: MUTED, ...enter(t, 162.08, { x: -20, y: 0 }) }}>
              <Cross size={34} /> Writing emails
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, color: MUTED, ...enter(t, 163.12, { x: -20, y: 0 }) }}>
              <Cross size={34} /> Summarizing meetings
            </div>
          </div>
          <span className="kit-tag" style={{ marginLeft: 'auto', ...enter(t, 165.12, { y: 0, scale: 0.6, easing: BACK }) }}>Separate workflows, separate assistants</span>
        </div>
      </Scene>

      {/* 12 — Test before you build */}
      <Scene t={t} index={11}>
        <Stepper t={t} active={1} at={167.75} />
        <div className="kit-h2" style={enter(t, 168.08, { dur: 0.8, y: 24 })}>
          <span className="kit-mark" style={markStyle(t, 168.96)}>Test</span> the template before you build.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 70 }}>
          <div className="kit-pill" style={enter(t, 174.4, { x: -20, y: 0 })}>
            <FileIcon size={30} accent /> Prompt Template
          </div>
          <Arrow t={t} at={176.8} w={90} />
          {[177.28, 177.6, 177.92, 178.08, 178.72].map((at, i) => {
            const refined = i === 2 && t >= 184.0;
            return (
              <div
                key={i}
                className="kit-card kit-ui"
                style={{
                  width: 150,
                  padding: '18px 16px',
                  textAlign: 'center',
                  borderStyle: i >= 3 ? 'dashed' : 'solid',
                  borderColor: refined ? GREEN : LINE,
                  ...enter(t, at, { y: 20, scale: 0.8, easing: BACK }),
                }}
              >
                <div style={{ fontSize: 20, color: MUTED, fontWeight: 600 }}>Situation {i + 1}</div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12, minHeight: 34 }}>
                  {t >= 181.6 + i * 0.15 && (refined || i !== 2 || t < 183.0) && <span style={enter(t, 181.6 + i * 0.15, { y: 0, scale: 0.5, easing: BACK })}><Check size={34} /></span>}
                </div>
                {i === 2 && t >= 184.0 && (
                  <div style={{ fontSize: 18, color: GREEN, fontWeight: 700, marginTop: 4, ...enter(t, 184.0, { y: 6 }) }}>✎ refined</div>
                )}
              </div>
            );
          })}
          <Arrow t={t} at={185.2} w={90} dashed />
          <div className="kit-pill" style={{ borderColor: GREEN, background: LIME_SOFT, ...enter(t, 185.6, { y: 0, scale: 0.7, easing: BACK }) }}>Build</div>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 50, ...enter(t, 181.2, { y: 12 }) }}>
          Look for consistent, useful results.
        </p>
      </Scene>

      {/* 13 — Stay vigilant */}
      <Scene t={t} index={12}>
        <Stepper t={t} active={2} at={186.25} />
        <div className="kit-h2" style={enter(t, 186.6, { dur: 0.8, y: 24 })}>
          Stay <span className="kit-mark" style={markStyle(t, 188.08)}>vigilant.</span> It's still AI.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 60 }}>
          <div className="kit-card" style={{ padding: '34px 40px', ...enter(t, 191.6, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 22 }}>IT CAN</div>
            {[
              ['Miss context', 192.24],
              ['Make inaccurate claims', 193.36],
              ['Produce inconsistent results', 195.12],
            ].map(([w, at]) => (
              <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, marginTop: 14, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                <Warn size={32} /> {w as string}
              </div>
            ))}
          </div>
          <div className="kit-card" style={{ padding: '34px 40px', borderColor: GREEN, ...enter(t, 197.44, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, letterSpacing: '.1em', fontWeight: 700, color: GREEN, marginBottom: 22 }}>
              <Strike t={t} at={199.88}>AUTONOMOUS</Strike> <span style={{ ...enter(t, 200.96, { y: 0 }), display: 'inline-block' }}>&nbsp;YOU STILL</span>
            </div>
            {[
              ['Start the task', 202.88],
              ['Provide the input', 204.12],
              ['Review the output', 205.88],
            ].map(([w, at]) => (
              <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, marginTop: 14, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                <Person size={36} /> {w as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 14 — You own the results */}
      <Scene t={t} index={13} padStyle={{ opacity: 1 - prog(t, 214.7, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 207.45, { y: 14 })}>Reusable assistants</div>
        <div className="kit-h1" style={enter(t, 207.6, { dur: 0.9, y: 34 })}>
          Less <span className="kit-mark" style={markStyle(t, 209.68)}>repeated setup.</span>
        </div>
        <p className="kit-body" style={{ fontSize: 50, marginTop: 50, ...enter(t, 211.28, { y: 18 }) }}>
          You're still <span className="kit-mark" style={markStyle(t, 212.48)}>responsible for the results.</span>
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ReusableAssistants: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={REUSABLE_ASSISTANTS_TITLE_FRAMES}>
      <TitleCardGreen label="PROMPTING" title="From CODO Prompts to Reusable Assistants" />
    </Sequence>
    <Sequence from={REUSABLE_ASSISTANTS_TITLE_FRAMES}>
      <ReusableAssistantsBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
