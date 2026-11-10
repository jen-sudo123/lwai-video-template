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
  FileIcon,
  GREEN,
  IN_OUT,
  INK,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// Building Microsoft 365 Copilot Agents — custom screenshot demo (Lead with AI).
// Built with the LWAI demo kit (src/kit), same approach as ClaudeSkills.tsx: every cue is in SECONDS of the VO
// (audio/copilot-agents.mp3, Daan on ElevenLabs v4, 336.04s), taken from the word timestamps in
// src/data/copilot-agents.transcript.json. A 90-frame green title card opens the video; the VO and
// every scene start after it.
//
// Screenshots (copilot-agents/images, 1920x999) play inside an animated app window. Some steps only
// exist as a before/after pair, so scripts/copilot-agents-derive-shots.py builds the in-between
// states (05b, 05c, 06b, 07a, 07b) and consecutive scenes crossfade over the same camera position.
//
//  #  scene                          start   VO cue
//  1  Reusable mini-assistants       0.00    "Microsoft 365 Copilot Agents are reusable mini-assistants…"
//  2  Prompt into assistant          17.20   "Think of it as turning a strong prompt…"
//  3  Meet Larry                     21.70   "For this demo, I'll use the Microsoft 365 Copilot app…"
//  4  Agents > New agent             30.20   "In the left sidebar, I open Agents…"
//  5  Describe or Skip               35.00   "Here, I can describe the agent…"
//  6  Name, description, Instructions 44.90  "I name the agent Larry…"
//  7  The CODO prompt                56.20   "I'll paste in my CODO prompt."
//  8  Suggest improvements, Skills   72.60   "There's also a Suggest improvements option…"
//  9  Skills menu                    83.50   "The menu offers two options…"
//  10 Knowledge: work content        95.30   "Next comes Knowledge."
//  11 Work sources off, Web search   120.60  "…so I'll turn these sources off."
//  12 Web search off, Attachments    131.90  "…turn Web search off as well."
//  13 Knowledge settings             140.80  "There's also a separate Knowledge settings area."
//  14 Image creation off             163.80  "…and turn image creation off."
//  15 Suggested prompts              169.10  "Next is Suggested prompts."
//  16 Prompt title                   180.90  "Draft weekly update."
//  17 Prompt message                 184.00  "Draft this week's leadership update from my notes."
//  18 Preview                        191.10  "Before creating Larry, I open Preview…"
//  19 The test notes                 196.20  "I'll use fictional project notes…"
//  20 Check three things             222.10  "Once Larry responds, I check three things."
//  21 Needs work                     239.20  "If the response needs work…"
//  22 Refined instructions           243.60  "For example, I can specify…"
//  23 Create                         254.20  "Now I click Create."
//  24 Created, private               256.10  "Microsoft confirms that Larry was created…"
//  25 Larry's chat                   271.10  "Here's Larry, with the suggested prompt…"
//  26 Normal chat response           280.70  "I'll also check the response in normal chat…"
//  27 Agents menu > Larry            284.60  "Once Larry is created, I can return to it…"
//  28 Agent Store                    295.20  "…which opens the Agent Store…"
//  29 @Larry                         299.60  "Third, in a supported Copilot Chat experience…"
//  30 Larry in the conversation      307.40  "…and bring it into the conversation."
//  31 Options may vary               309.50  "The exact options may vary…"
//  32 Closing                        323.50  "For a repeatable task like a weekly leadership update…"

export const COPILOT_AGENTS_DURATION_S = 336.7;
export const COPILOT_AGENTS_TITLE_FRAMES = 90;

const STARTS = [
  0, 17.2, 21.7, 30.2, 35.0, 44.9, 56.2, 72.6, 83.5, 95.3, 120.6, 131.9, 140.8, 163.8, 169.1, 180.9, 184.0,
  191.1, 196.2, 222.1, 239.2, 243.6, 254.2, 256.1, 271.1, 280.7, 284.6, 295.2, 299.6, 307.4, 309.5, 323.5,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 999;

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.COPILOT_AGENTS_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { COPILOT_AGENTS_SHOTS?: Record<string, string> }).COPILOT_AGENTS_SHOTS?.[n] ??
  staticFile(`copilot-agents/images/${n}.png`);

// Progress rail on the left of every screenshot scene: where we are in the build (or which way back to Larry).
type RailItem = [label: string, at: number];
const BUILD_RAIL: RailItem[] = [
  ['New agent', 30.2],
  ['Name and description', 44.9],
  ['Instructions', 51.4],
  ['Skills', 77.5],
  ['Knowledge', 95.3],
  ['Suggested prompts', 169.1],
  ['Preview and test', 191.1],
  ['Create', 254.2],
  ['Use Larry', 269.7],
];
const RETURN_RAIL: RailItem[] = [
  ['Agents menu', 288.6],
  ['Agent Store', 292.5],
  ['@Larry in chat', 299.6],
];
const RAILS = {
  build: { title: 'Building Larry', items: BUILD_RAIL, from: 30.4 },
  back: { title: 'Back to Larry', items: RETURN_RAIL, from: 284.9 },
};

const Rail: React.FC<{ t: number; kind: keyof typeof RAILS }> = ({ t, kind }) => {
  const { title, items, from } = RAILS[kind];
  const ROW = 58;
  const active = items.reduce((acc, [, at], i) => (t >= at ? i : acc), -1);
  // the lime line grows to the active dot
  const fill = items.reduce((acc, [, at], i) => acc + (i === 0 ? 0 : prog(t, at, 0.6, IN_OUT)), 0);
  return (
    <div className="kit-ui" style={{ position: 'absolute', left: 80, top: 150, width: 330, ...enter(t, from, { x: -24, y: 0 }) }}>
      <div className="kit-label" style={{ fontSize: 18, margin: '0 0 30px' }}>{title}</div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: 14, width: 4, height: ROW * (items.length - 1), background: LINE, borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: 12, top: 14, width: 4, height: ROW * fill, background: LIME, borderRadius: 2 }} />
        {items.map(([label, at], i) => {
          const on = prog(t, at, 0.45, BACK);
          const isActive = i === active;
          const done = i < active;
          return (
            <div key={label} style={{ height: ROW, display: 'flex', alignItems: 'flex-start', gap: 18 }}>
              <div
                style={{
                  position: 'relative', width: 28, height: 28, borderRadius: 14, flex: 'none', boxSizing: 'border-box',
                  background: done ? LIME : '#fff', border: `4px solid ${on > 0 ? LIME : LINE}`,
                  transform: `scale(${isActive ? 0.9 + 0.25 * Math.min(1, on) : 1})`,
                  boxShadow: isActive ? '0 0 0 7px rgba(102,198,28,.22)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                {done && (
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2.5 7.4l3 3 6-6.6" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                )}
              </div>
              <div style={{ fontSize: 23, lineHeight: '28px', fontWeight: isActive ? 700 : 500, color: isActive ? INK : done ? '#4B5245' : '#A3A89C' }}>{label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Screenshot window geometry: the rail takes the left 360px, the window the rest.
const WIN_LEFT = 440;
const WIN_TOP = 90;
const WIN_W = 1400;

type WinProps = Omit<React.ComponentProps<typeof AppWindow>, 'src' | 'start' | 'imgH' | 'title'> & {
  n: string;
  start?: number;
  rail?: keyof typeof RAILS;
};
// `start` defaults to "long ago": a window that follows another window just crossfades in place.
const Win: React.FC<WinProps> = ({ n, start = -10, rail = 'build', ...rest }) => (
  <>
    <Rail t={rest.t} kind={rail} />
    <AppWindow imgH={IMG_H} numbered={false} title="m365.cloud.microsoft" src={shot(n)} start={start} left={WIN_LEFT} top={WIN_TOP} width={WIN_W} {...rest} />
  </>
);
// Camera key that is already settled when the scene mounts (continues the previous shot's framing).
const hold = (sceneStart: number, x: number, y: number, s: number) => ({ at: sceneStart - 1, x, y, s, dur: 0.01 });

const LarryIcon: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
    <span style={{ fontFamily: 'IBM Plex Serif', fontSize: size * 0.56, color: '#fff', lineHeight: 1 }}>L</span>
  </div>
);

// Neutral agent mark (a four-point sparkle on a green tile). Not the kit's Spark, which is Claude's logo.
const AgentGlyph: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.26, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
    <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
      <path d="M12 1.5c.9 5.6 3 7.700 8.600 8.600-5.600.9-7.700 3-8.600 8.600-.9-5.600-3-7.700-8.600-8.600 5.600-.9 7.700-3 8.600-8.600z" fill="#fff" transform="translate(0 1.900)" />
    </svg>
  </div>
);

// A placeholder text line that draws itself in.
const Bar: React.FC<{ t: number; at: number; w: number | string; h?: number; color?: string; dur?: number }> = ({ t, at, w, h = 12, color = '#D9DDD1', dur = 0.5 }) => (
  <div style={{ width: w, height: h }}>
    <div style={{ width: `${prog(t, at, dur, IN_OUT) * 100}%`, height: '100%', borderRadius: h / 2, background: color }} />
  </div>
);

const Lock: React.FC<{ closed: number; size?: number }> = ({ closed, size = 40 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} style={{ overflow: 'visible' }}>
    <path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke={GREEN} strokeWidth="2.2" strokeLinecap="round" style={{ transformOrigin: '17px 11px', transform: `rotate(${(1 - closed) * 38}deg)` }} />
    <rect x="5" y="11" width="14" height="10" rx="2.5" fill={GREEN} />
  </svg>
);

const Switch: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ width: 76, height: 42, borderRadius: 21, background: on > 0.5 ? LIME : '#D5D8CE', position: 'relative' }}>
    <div style={{ position: 'absolute', top: 5, left: 5 + on * 34, width: 32, height: 32, borderRadius: 16, background: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,.2)' }} />
  </div>
);

// Floating explainer card on top of a screenshot.
const Float: React.FC<{ t: number; at: number; until?: number; style: React.CSSProperties; children: React.ReactNode }> = ({ t, at, until, style, children }) => {
  const out = until === undefined ? 1 : 1 - prog(t, until, 0.4);
  if (t < at || out <= 0) return null;
  const e = enter(t, at, { y: 18, dur: 0.5 });
  return (
    <div className="kit-card kit-ui" style={{ position: 'absolute', zIndex: 5, boxShadow: '0 18px 50px rgba(20,40,10,.18)', ...style, ...e, opacity: (e.opacity as number) * out }}>
      {children}
    </div>
  );
};

// ── Body ────────────────────────────────────────────────────────────────────
const CopilotAgentsBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/copilot-agents.mp3')} />}

      {/* 1 — Reusable mini-assistants: the same task typed into chat after chat, then built once as an agent */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Microsoft 365 Copilot Agents</div>
        <div className="kit-h2" style={{ fontSize: 84, ...enter(t, 0.3, { dur: 0.9, y: 34 }) }}>
          Reusable <span className="kit-mark" style={markStyle(t, 2.8)}>mini-assistants.</span>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 18, ...enter(t, 4.9, { y: 14 }) }}>Configured for one specific workflow.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 56, height: 400 }}>
          {/* the old way: three chats, the same explanation typed three times */}
          {(() => {
            const fade = prog(t, 11.5, 0.8, IN_OUT);
            const count = [7.9, 8.8, 9.7].filter((a) => t >= a).length;
            return (
              <div style={{ position: 'relative', width: 700, height: 400, flex: 'none', opacity: 1 - fade * 0.62, transform: `scale(${1 - fade * 0.06})`, transformOrigin: '0 50%' }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} className="kit-card kit-ui" style={{ position: 'absolute', left: i * 46, top: i * 96, width: 600, padding: '16px 22px', boxShadow: '0 10px 30px rgba(20,40,10,.08)', ...enter(t, 7.6 + i * 0.9, { y: 26, dur: 0.5 }) }}>
                    <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED }}>New chat</div>
                    <div style={{ fontSize: 24, marginTop: 8, minHeight: 34 }}>
                      {typed(t, 7.9 + i * 0.9, 'Act as my update writer. Each week I need…', 0.85)}
                      <span style={{ opacity: t < 10.8 && Math.floor(t * 2.5) % 2 === 0 ? 1 : 0, color: LIME }}>|</span>
                    </div>
                  </div>
                ))}
                <div style={{ position: 'absolute', left: 0, bottom: 0, ...enter(t, 8.0, { y: 0, scale: 0.6, easing: BACK }) }}>
                  <span className="kit-tag" style={{ background: '#F1F1EC' }}>Same task, explained {count || 1}×</span>
                </div>
              </div>
            );
          })()}
          <div style={{ opacity: prog(t, 11.6, 0.15) }}><Arrow t={t} at={11.6} w={130} /></div>
          {/* the agent: three slots that fill in */}
          <div className="kit-card kit-ui" style={{ width: 760, padding: '26px 30px', borderColor: GREEN, boxShadow: '0 18px 50px rgba(20,40,10,.12)', ...enter(t, 11.9, { scale: 0.8, y: 0, easing: BACK, dur: 0.6 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <AgentGlyph size={44} />
              <div className="kit-h3" style={{ fontSize: 36 }}>Your agent</div>
              <span className="kit-tag" style={{ marginLeft: 'auto', ...enter(t, 16.0, { y: 0, scale: 0.5, easing: BACK }) }}>Reusable</span>
            </div>
            {[
              { label: 'A clear role', at: 13.0, body: <Bar t={t} at={13.2} w={220} color={GREEN} /> },
              {
                label: 'Standing instructions', at: 13.7,
                body: (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {[240, 200, 150].map((w, i) => <Bar key={i} t={t} at={13.9 + i * 0.18} w={w} h={9} color={GREEN} />)}
                  </div>
                ),
              },
              {
                label: 'Selected knowledge sources', at: 15.2,
                body: (
                  <div style={{ display: 'flex', gap: 10 }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={enter(t, 15.4 + i * 0.16, { y: 0, scale: 0.4, easing: BACK, dur: 0.4 })}><FileIcon size={34} accent /></div>
                    ))}
                  </div>
                ),
              },
            ].map(({ label, at, body }) => {
              const on = prog(t, at, 0.5, IN_OUT);
              return (
                <div key={label} style={{ position: 'relative', marginTop: 14, height: 76, borderRadius: 14, border: `2px ${on > 0 ? 'solid' : 'dashed'} ${on > 0 ? GREEN : '#C9CDC0'}`, overflow: 'hidden', display: 'flex', alignItems: 'center', padding: '0 22px', gap: 20 }}>
                  <div style={{ position: 'absolute', inset: 0, width: `${on * 100}%`, background: LIME_SOFT }} />
                  <div style={{ position: 'relative', fontSize: 26, fontWeight: 600, width: 370, color: on > 0 ? INK : '#A3A89C' }}>{label}</div>
                  <div style={{ position: 'relative' }}>{body}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* 2 — Prompt into assistant: one card that morphs from a prompt document into an agent */}
      <Scene t={t} index={1}>
        {(() => {
          const m = prog(t, 19.3, 1.0, IN_OUT);
          return (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center' }}>
              <div>
                <div className="kit-label" style={enter(t, 17.3, { y: 14 })}>Think of it as</div>
                <div className="kit-h2" style={enter(t, 17.4, { dur: 0.8, y: 30 })}>
                  A strong prompt, <span className="kit-mark" style={markStyle(t, 19.8)}>made reusable.</span>
                </div>
              </div>
              <div style={{ position: 'relative', height: 460, ...enter(t, 17.9, { y: 30 }) }}>
                <div className="kit-card" style={{ position: 'absolute', inset: 0, borderRadius: 22 + m * 26, borderColor: m > 0.5 ? GREEN : LINE, overflow: 'hidden', boxShadow: '0 18px 50px rgba(20,40,10,.12)', transform: `scale(${1 - 0.05 * Math.sin(m * Math.PI)})` }}>
                  <div style={{ position: 'absolute', inset: 0, background: LIME_SOFT, opacity: m }} />
                  {/* prompt document */}
                  <div className="kit-ui" style={{ position: 'absolute', inset: 0, padding: '34px 40px', opacity: 1 - m, transform: `translateY(${-m * 30}px)` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 600 }}><FileIcon size={38} /> Strong prompt</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 34 }}>
                      {['92%', '78%', '86%', '60%', '82%', '44%'].map((w, i) => <Bar key={i} t={t} at={18.2 + i * 0.1} w={w} h={16} />)}
                    </div>
                  </div>
                  {/* agent */}
                  <div className="kit-ui" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, opacity: m, transform: `translateY(${(1 - m) * 30}px)` }}>
                    <div style={{ position: 'relative', width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="150" height="150" viewBox="0 0 150 150" style={{ position: 'absolute', transform: `rotate(${t * 70}deg)` }}>
                        <circle cx="75" cy="75" r="66" fill="none" stroke={GREEN} strokeWidth="5" strokeLinecap="round" strokeDasharray="150 57" />
                      </svg>
                      <AgentGlyph size={84} />
                    </div>
                    <div className="kit-h3">Reusable assistant</div>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {['Week 1', 'Week 2', 'Week 3'].map((w, i) => (
                        <span key={w} className="kit-pill" style={{ fontSize: 22, padding: '8px 18px', ...enter(t, 20.3 + i * 0.3, { y: 0, scale: 0.5, easing: BACK, dur: 0.4 }) }}>{w}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 3 — Meet Larry: the agent card types its own description, and the update it writes takes shape */}
      <Scene t={t} index={2}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 800px', gap: 70, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 21.8, { y: 14 })}>This demo</div>
            <div className="kit-h1" style={enter(t, 22.0, { dur: 0.9, y: 34 })}>
              Meet <span className="kit-mark" style={markStyle(t, 26.0)}>Larry.</span>
            </div>
            <div style={{ marginTop: 36, ...enter(t, 23.3, { y: 12 }) }}>
              <span className="kit-tag">Built in the Microsoft 365 Copilot app</span>
            </div>
          </div>
          <div style={{ position: 'relative', height: 560 }}>
            <div className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: 0, width: 640, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 26, zIndex: 2, boxShadow: '0 18px 50px rgba(20,40,10,.14)', ...enter(t, 25.9, { scale: 0.7, y: 0, easing: BACK, dur: 0.6 }) }}>
              <LarryIcon size={104} />
              <div>
                <div className="kit-h3" style={{ fontSize: 46 }}>Larry</div>
                <div style={{ fontSize: 25, color: MUTED, marginTop: 6, minHeight: 34 }}>{typed(t, 27.3, 'Helps me write weekly leadership updates.', 1.9)}</div>
              </div>
            </div>
            <div className="kit-card kit-ui" style={{ position: 'absolute', right: 0, top: 150, width: 560, padding: '30px 34px', background: '#FBFBF8', ...enter(t, 28.0, { x: 40, y: 20, dur: 0.6 }) }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED, paddingTop: 30 }}>Weekly leadership update</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 26 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: LIME_SOFT, color: GREEN, fontSize: 18, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', ...enter(t, 28.3 + i * 0.22, { y: 0, scale: 0.4, easing: BACK, dur: 0.35 }) }}>{i + 1}</div>
                    <Bar t={t} at={28.4 + i * 0.22} w={[380, 330, 400, 300, 250][i]} h={14} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 4 — Agents > New agent */}
      <Scene t={t} index={3} pad={false}>
        <Win
          t={t}
          n="01-agents-new-agent"
          start={30.2}
          cam={[{ at: 30.9, x: 260, y: 300, s: 2.2 }]}
          cursor={[
            { at: 30.6, x: 620, y: 470 },
            { at: 31.4, x: 75, y: 214, click: true, dur: 0.7 },
            { at: 33.2, x: 318, y: 371, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 32.1, until: 33.5, x: 14, y: 199, w: 226, h: 29 },
            { at: 33.8, x: 252, y: 356, w: 228, h: 28 },
          ]}
          steps={[
            { at: 32.0, text: 'Agents' },
            { at: 33.7, text: 'New agent' },
          ]}
        />
      </Scene>

      {/* 5 — Describe or Skip */}
      <Scene t={t} index={4} pad={false}>
        <Win
          t={t}
          n="02-builder-describe-or-skip"
          cam={[{ at: 35.2, x: 1100, y: 400, s: 1.55 }]}
          cursor={[
            { at: 42.6, x: 1050, y: 560 },
            { at: 43.2, x: 1458, y: 319, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 35.6, until: 37.8, x: 712, y: 403, w: 768, h: 58 },
            { at: 38.2, x: 1417, y: 303, w: 82, h: 32 },
          ]}
          steps={[
            { at: 35.6, text: 'Describe the agent' },
            { at: 38.2, text: 'Or choose Skip' },
          ]}
        />
      </Scene>

      {/* 6 — Name, description, Instructions */}
      <Scene t={t} index={5} pad={false}>
        <Win
          t={t}
          n="03-larry-instructions"
          cam={[
            { at: 45.0, x: 1200, y: 170, s: 2.3 },
            { at: 51.4, x: 1315, y: 400, s: 1.9 },
          ]}
          rings={[
            { at: 45.9, until: 48.2, x: 998, y: 116, w: 76, h: 38 },
            { at: 48.4, until: 51.2, x: 998, y: 165, w: 266, h: 22 },
            { at: 52.4, until: 53.8, x: 941, y: 252, w: 108, h: 24 },
            { at: 54.0, x: 943, y: 288, w: 745, h: 262 },
          ]}
          steps={[
            { at: 45.9, text: 'Name: Larry' },
            { at: 47.4, text: 'A short description' },
            { at: 52.4, text: 'Instructions' },
          ]}
        />
      </Scene>

      {/* 7 — The CODO prompt: the instructions document fills in and locks; the weekly input beside it keeps changing */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 56.3, { y: 14 })}>Instructions</div>
        <div className="kit-h2" style={enter(t, 56.4, { dur: 0.8, y: 30 })}>
          My <span className="kit-mark" style={markStyle(t, 57.0)}>CODO</span> prompt.
        </div>
        <div style={{ display: 'flex', alignItems: 'stretch', gap: 30, marginTop: 44 }}>
          <div className="kit-card kit-ui" style={{ width: 900, padding: '26px 32px', borderColor: t >= 64.4 ? GREEN : LINE, ...enter(t, 56.9, { y: 26 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: 44 }}>
              <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED }}>Standing instructions</div>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12, ...enter(t, 63.4, { y: 0, x: 16 }) }}>
                <span className="kit-tag" style={enter(t, 64.5, { y: 0, scale: 0.5, easing: BACK })}>Stays consistent</span>
                <Lock closed={prog(t, 64.2, 0.4, IN_OUT)} />
              </div>
            </div>
            {[
              ['C', 'Character', 59.4, 300],
              ['O', 'Objective', 60.2, 360],
              ['D', 'Do’s and Don’ts', 61.2, 330],
              ['O', 'Output', 62.4, 270],
            ].map(([letter, word, at, w], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 16 }}>
                <div style={{ width: 66, height: 66, borderRadius: 16, background: GREEN, color: '#fff', fontFamily: 'IBM Plex Serif', fontSize: 44, lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', ...enter(t, at as number, { y: 0, scale: 0.3, easing: BACK, dur: 0.45 }) }}>{letter as string}</div>
                <div style={{ fontSize: 30, fontWeight: 600, width: 250, flex: 'none', ...enter(t, (at as number) + 0.08, { x: -14, y: 0, dur: 0.4 }) }}>{word as string}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <Bar t={t} at={(at as number) + 0.25} w={w as number} />
                  <Bar t={t} at={(at as number) + 0.4} w={(w as number) * 0.7} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'IBM Plex Serif', fontSize: 64, color: MUTED, ...enter(t, 65.8, { y: 0, scale: 0.4, easing: BACK }) }}>+</div>
          {(() => {
            const week = 46 + (t < 66.5 ? 0 : Math.min(3, Math.floor((t - 66.5) / 1.5) + 0));
            const flip = t < 66.5 ? 1 : prog((t - 66.5) % 1.5, 0, 0.35);
            return (
              <div className="kit-card kit-ui" style={{ flex: 1, padding: '26px 30px', borderStyle: 'dashed', borderColor: '#B9B9B0', ...enter(t, 65.8, { x: 50, y: 0, dur: 0.6 }) }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 44 }}>
                  <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED }}>What changes</div>
                  <div style={{ marginLeft: 'auto', overflow: 'hidden', height: 40 }}>
                    <div className="kit-pill" style={{ fontSize: 22, padding: '6px 16px', background: INK, color: '#fff', borderColor: INK, transform: `translateY(${(1 - flip) * 30}px)`, opacity: flip }}>Week {week}</div>
                  </div>
                </div>
                <div className="kit-h3" style={{ marginTop: 18, fontSize: 36 }}>The input I provide</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 26 }}>
                  {[
                    ['Notes', 69.1],
                    ['Metrics', 70.0],
                    ['Priorities', 70.7],
                    ['Blockers', 71.6],
                  ].map(([label, at]) => (
                    <div key={label as string} className="kit-pill" style={{ fontSize: 28, ...enter(t, at as number, { y: -30, scale: 0.7, easing: BACK, dur: 0.5 }) }}>{label as string}</div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 8 — Suggest improvements, then Skills */}
      <Scene t={t} index={7} pad={false}>
        <Win
          t={t}
          n="03-larry-instructions"
          start={72.6}
          cam={[
            hold(72.6, 1315, 400, 1.9),
            { at: 72.9, x: 1440, y: 290, s: 2.4 },
            { at: 77.4, x: 1315, y: 690, s: 1.9 },
          ]}
          rings={[
            { at: 73.4, until: 77.2, x: 1343, y: 253, w: 188, h: 30 },
            { at: 78.2, until: 79.6, x: 941, y: 636, w: 60, h: 24 },
            { at: 79.8, x: 943, y: 671, w: 745, h: 78 },
          ]}
          steps={[
            { at: 73.4, text: 'Suggest improvements' },
            { at: 78.2, text: 'Skills' },
          ]}
        />
      </Scene>

      {/* 9 — Skills menu */}
      <Scene t={t} index={8} pad={false}>
        <Win
          t={t}
          n="04-skills-create-or-upload"
          cam={[hold(83.5, 1315, 690, 1.9), { at: 83.7, x: 1500, y: 690, s: 2.4 }]}
          cursor={[
            { at: 83.3, x: 1480, y: 780 },
            { at: 83.6, x: 1677, y: 653, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 85.8, until: 87.2, x: 1530, y: 679, w: 148, h: 26 },
            { at: 87.4, until: 89.6, x: 1530, y: 711, w: 148, h: 26 },
          ]}
          steps={[
            { at: 85.8, text: 'Create with chat' },
            { at: 87.4, text: 'Upload a skill package' },
            { at: 93.4, text: 'Skip for Larry' },
          ]}
        />
      </Scene>

      {/* 10 — Knowledge: work content */}
      <Scene t={t} index={9} pad={false}>
        <Win
          t={t}
          n="05-knowledge-default-sources"
          cam={[hold(95.3, 1315, 360, 1.45), { at: 102.6, x: 1315, y: 390, s: 1.9 }]}
          cursor={[
            { at: 119.4, x: 1480, y: 420 },
            { at: 120.0, x: 1660, y: 318, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 96.1, until: 100.2, x: 941, y: 95, w: 104, h: 24 },
            { at: 101.3, until: 104.4, x: 941, y: 258, w: 118, h: 20 },
            { at: 104.7, until: 105.7, x: 940, y: 302, w: 748, h: 32 },
            { at: 105.9, until: 106.4, x: 940, y: 356, w: 748, h: 32 },
            { at: 106.6, until: 107.2, x: 940, y: 410, w: 748, h: 32 },
            { at: 107.4, until: 111.6, x: 940, y: 464, w: 748, h: 32 },
            { at: 117.8, until: 120.5, x: 940, y: 300, w: 748, h: 198 },
          ]}
          steps={[
            { at: 96.1, text: 'Knowledge' },
            { at: 101.3, text: 'Work content' },
            { at: 113.2, text: 'Select sources useful for the task' },
            { at: 120.1, text: 'Turn these sources off' },
          ]}
        />
      </Scene>

      {/* 11 — Work sources off; Web search */}
      <Scene t={t} index={10} pad={false}>
        <Win
          t={t}
          n="05b-work-sources-off"
          cam={[hold(120.6, 1315, 390, 1.9), { at: 122.0, x: 1315, y: 480, s: 1.9 }]}
          cursor={[
            { at: 130.3, x: 1480, y: 640 },
            { at: 131.1, x: 1660, y: 555, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 123.0, until: 130.6, x: 940, y: 538, w: 748, h: 34 }]}
          steps={[
            { at: 120.6, text: 'Work sources off' },
            { at: 123.0, text: 'Web search' },
            { at: 131.1, text: 'Turn Web search off' },
          ]}
        />
      </Scene>

      {/* 12 — Web search off; Attachments; gear */}
      <Scene t={t} index={11} pad={false}>
        <Win
          t={t}
          n="05c-all-sources-off"
          cam={[hold(131.9, 1315, 480, 1.9), { at: 139.3, x: 1315, y: 300, s: 1.6, dur: 0.8 }]}
          cursor={[
            { at: 139.6, x: 1540, y: 380 },
            { at: 139.9, x: 1672, y: 112, click: true, dur: 0.8 },
          ]}
          rings={[{ at: 134.2, until: 139.2, x: 940, y: 613, w: 748, h: 34 }]}
          steps={[
            { at: 131.9, text: 'Web search off' },
            { at: 134.2, text: 'Attachments' },
            { at: 138.7, text: 'No files for this demo' },
          ]}
        />
      </Scene>

      {/* 13 — Knowledge settings */}
      <Scene t={t} index={12} pad={false}>
        <Win
          t={t}
          n="06-knowledge-settings"
          cam={[hold(140.8, 1315, 300, 1.6), { at: 141.1, x: 960, y: 505, s: 1.75 }]}
          cursor={[
            { at: 162.3, x: 1130, y: 580 },
            { at: 163.0, x: 1296, y: 499, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 142.1, until: 143.6, x: 585, y: 226, w: 180, h: 28 },
            { at: 145.3, until: 146.2, x: 586, y: 313, w: 748, h: 60 },
            { at: 146.4, until: 148.7, x: 586, y: 391, w: 748, h: 60 },
            { at: 148.9, until: 150.1, x: 586, y: 469, w: 748, h: 60 },
            { at: 150.3, until: 158.7, x: 586, y: 547, w: 748, h: 60, spot: true },
            { at: 160.4, until: 162.2, x: 1272, y: 409, w: 48, h: 24 },
          ]}
          steps={[
            { at: 142.1, text: 'Knowledge settings' },
            { at: 145.3, text: 'People data' },
            { at: 146.4, text: 'Create documents, charts, and code' },
            { at: 148.9, text: 'Create images' },
            { at: 150.3, text: 'Discourage model knowledge' },
            { at: 160.2, text: 'Keep document creation on' },
            { at: 162.5, text: 'Turn image creation off' },
          ]}
        />
        <Float t={t} at={152.3} until={158.9} style={{ left: 670, top: 640, width: 940, padding: '20px 28px' }}>
          {[
            ['Selected sources', 0.35 + 0.55 * prog(t, 155.1, 1.2, IN_OUT), GREEN],
            ['General AI knowledge', 0.75 - 0.5 * prog(t, 156.9, 1.2, IN_OUT), '#B9BDB0'],
          ].map(([label, w, color]) => (
            <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 20, height: 46 }}>
              <div style={{ width: 290, fontSize: 24, fontWeight: 600 }}>{label as string}</div>
              <div style={{ flex: 1, height: 18, borderRadius: 9, background: '#EEF0E8' }}>
                <div style={{ width: `${(w as number) * 100}%`, height: '100%', borderRadius: 9, background: color as string }} />
              </div>
            </div>
          ))}
          <div style={{ fontSize: 20, color: MUTED, marginTop: 4 }}>The agent leans on what you selected before its general knowledge.</div>
        </Float>
      </Scene>

      {/* 14 — Image creation off */}
      <Scene t={t} index={13} pad={false}>
        <Win
          t={t}
          n="06b-knowledge-settings-images-off"
          cam={[hold(163.8, 960, 505, 1.75)]}
          steps={[
            { at: 163.8, text: 'Image creation off' },
            { at: 165.2, text: 'Focused on the leadership update workflow' },
          ]}
        />
      </Scene>

      {/* 15 — Suggested prompts */}
      <Scene t={t} index={14} pad={false}>
        <Win
          t={t}
          n="05c-all-sources-off"
          cam={[hold(169.1, 1315, 600, 1.45), { at: 169.4, x: 1315, y: 840, s: 1.9 }]}
          rings={[
            { at: 170.0, until: 176.2, x: 941, y: 739, w: 164, h: 24 },
            { at: 177.6, until: 179.3, x: 941, y: 772, w: 32, h: 18 },
            { at: 178.1, until: 179.3, x: 1131, y: 772, w: 60, h: 18 },
            { at: 179.5, x: 943, y: 798, w: 184, h: 32 },
          ]}
          steps={[
            { at: 170.0, text: 'Suggested prompts' },
            { at: 177.1, text: 'A title and a message' },
            { at: 179.5, text: 'Title' },
          ]}
        />
      </Scene>

      {/* 16 — Prompt title */}
      <Scene t={t} index={15} pad={false}>
        <Win
          t={t}
          n="07a-prompt-title"
          cam={[hold(180.9, 1315, 840, 1.9)]}
          rings={[
            { at: 179.9, until: 182.9, x: 943, y: 798, w: 184, h: 32 },
            { at: 183.1, x: 1136, y: 798, w: 476, h: 32 },
          ]}
          steps={[
            { at: 180.9, text: 'Title: Draft weekly update' },
            { at: 183.1, text: 'Message' },
          ]}
        />
      </Scene>

      {/* 17 — Prompt message */}
      <Scene t={t} index={16} pad={false}>
        <Win
          t={t}
          n="07b-prompt-message"
          cam={[hold(184.0, 1315, 840, 1.9)]}
          rings={[
            { at: 183.0, until: 187.0, x: 1136, y: 798, w: 476, h: 32 },
            { at: 187.6, x: 943, y: 798, w: 669, h: 32 },
          ]}
          steps={[
            { at: 184.0, text: 'Message: Draft this week’s leadership update from my notes.' },
            { at: 189.4, text: 'A clear starting point' },
          ]}
        />
      </Scene>

      {/* 18 — Preview */}
      <Scene t={t} index={17} pad={false}>
        <Win
          t={t}
          n="08-preview-ready"
          cam={[hold(191.1, 1300, 330, 1.45), { at: 193.9, x: 1300, y: 520, s: 1.5 }]}
          cursor={[
            { at: 191.9, x: 1120, y: 300 },
            { at: 192.4, x: 1368, y: 33, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 193.0, until: 194.2, x: 1332, y: 19, w: 72, h: 28 },
            { at: 194.7, x: 797, y: 558, w: 342, h: 100 },
          ]}
          steps={[
            { at: 193.0, text: 'Preview' },
            { at: 194.5, text: 'Test with a realistic example' },
          ]}
        />
      </Scene>

      {/* 19 — The test notes */}
      <Scene t={t} index={18} pad={false}>
        <Win
          t={t}
          n="13-preview-retest-summary-and-facts"
          cam={[hold(196.2, 1300, 520, 1.5), { at: 196.4, x: 1450, y: 310, s: 2.0 }]}
          rings={[
            { at: 197.2, until: 203.4, x: 1058, y: 173, w: 790, h: 280 },
            { at: 204.7, until: 210.2, x: 1070, y: 263, w: 764, h: 40 },
            { at: 210.4, until: 212.7, x: 1070, y: 311, w: 712, h: 21 },
            { at: 213.1, until: 221.6, x: 1070, y: 339, w: 764, h: 60 },
          ]}
          steps={[
            { at: 196.7, text: 'Fictional project notes' },
            { at: 204.7, text: 'Progress and open defects' },
            { at: 210.5, text: 'A pending approval' },
            { at: 213.1, text: 'A trade-off to decide' },
          ]}
        />
        <Float t={t} at={204.6} until={212.5} style={{ left: 470, top: 722, width: 1340, padding: '20px 26px', display: 'flex', gap: 14, alignItems: 'center' }}>
          {[
            ['Onboarding complete', 205.2],
            ['18 of 20 tests passing', 206.2],
            ['2 reporting defects open', 208.5],
            ['1 approval pending', 210.5],
          ].map(([label, at], i) => (
            <div key={label as string} className="kit-pill" style={{ fontSize: 24, padding: '10px 20px', background: i === 0 ? LIME_SOFT : '#fff', ...enter(t, at as number, { y: 0, scale: 0.5, easing: BACK, dur: 0.45 }) }}>
              {i === 0 && <Check size={26} />}
              {label as string}
            </div>
          ))}
        </Float>
        <Float t={t} at={213.0} until={221.7} style={{ left: 470, top: 722, width: 1340, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED, whiteSpace: 'nowrap' }}>Trade-off</div>
          <div className="kit-pill" style={{ fontSize: 22, padding: '10px 18px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 214.2, { x: -20, y: 0 }) }}>Engineer on the reporting fixes</div>
          <div style={{ opacity: prog(t, 216.6, 0.15) }}><Arrow t={t} at={216.6} w={44} /></div>
          <div className="kit-pill" style={{ fontSize: 22, padding: '10px 18px', ...enter(t, 217.2, { y: 0, scale: 0.6, easing: BACK }) }}>Pilot timeline protected</div>
          <div className="kit-pill" style={{ fontSize: 22, padding: '10px 18px', borderColor: '#E0B49A', background: '#FBEFE8', ...enter(t, 219.2, { y: 0, scale: 0.6, easing: BACK }) }}>Dashboard refresh: 2 days later</div>
        </Float>
      </Scene>

      {/* 20 — Check three things: a scorecard over Larry's response */}
      <Scene t={t} index={19} pad={false}>
        <Win
          t={t}
          n="13-preview-retest-summary-and-facts"
          cam={[hold(222.1, 1450, 310, 2.0), { at: 222.2, x: 1250, y: 690, s: 1.5 }]}
          rings={[
            { at: 226.7, until: 228.4, x: 806, y: 492, w: 220, h: 26 },
            { at: 226.9, until: 228.4, x: 806, y: 587, w: 210, h: 26 },
            { at: 227.1, until: 228.4, x: 806, y: 722, w: 275, h: 26 },
            { at: 227.3, until: 228.4, x: 806, y: 857, w: 250, h: 26 },
            { at: 235.1, x: 896, y: 645, w: 170, h: 20 },
            { at: 236.0, x: 843, y: 759, w: 124, h: 82 },
          ]}
          steps={[{ at: 222.6, text: 'Larry responds' }]}
        />
        <Float t={t} at={223.4} style={{ left: 1270, top: 190, width: 530, padding: '28px 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: MUTED }}>I check three things</div>
            <div style={{ marginLeft: 'auto', fontSize: 22, fontWeight: 700, color: GREEN, fontVariantNumeric: 'tabular-nums' }}>
              {[226.0, 229.4, 233.6].filter((a) => t >= a).length} / 3
            </div>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: '#EEF0E8', marginTop: 14 }}>
            <div style={{ height: '100%', borderRadius: 4, background: LIME, width: `${((prog(t, 226.0, 0.5, IN_OUT) + prog(t, 229.4, 0.5, IN_OUT) + prog(t, 233.6, 0.5, IN_OUT)) / 3) * 100}%` }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 26 }}>
            {[
              ['The five-section structure', 225.2],
              ['Concise and useful for a leadership audience', 228.6],
              ['Accurate facts, owners, deadlines, and trade-offs', 232.8],
            ].map(([text, at]) => (
              <div key={text as string} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontSize: 27, lineHeight: 1.3, ...enter(t, at as number, { x: 24, y: 0 }) }}>
                <div style={{ flex: 'none', width: 34, height: 34, borderRadius: 17, border: `3px solid ${LINE}`, boxSizing: 'border-box', position: 'relative', marginTop: 1 }}>
                  <div style={{ position: 'absolute', inset: -3, ...enter(t, (at as number) + 0.8, { y: 0, scale: 0.3, easing: BACK, dur: 0.4 }) }}><Check size={34} /></div>
                </div>
                {text as string}
              </div>
            ))}
          </div>
        </Float>
      </Scene>

      {/* 21 — Needs work */}
      <Scene t={t} index={20} pad={false}>
        <Win
          t={t}
          n="10-preview-decisions-tradeoffs-next-steps"
          start={239.2}
          cam={[hold(239.2, 1300, 600, 1.35), { at: 239.5, x: 1250, y: 730, s: 1.8 }]}
          rings={[{ at: 240.2, x: 806, y: 743, w: 138, h: 24 }]}
          steps={[{ at: 240.1, text: 'An extra section: refine and test again' }]}
        />
      </Scene>

      {/* 22 — Refined instructions */}
      <Scene t={t} index={21} pad={false}>
        <Win
          t={t}
          n="11-instructions-refined-after-test"
          cam={[hold(243.6, 1315, 420, 1.9)]}
          rings={[{ at: 245.5, x: 953, y: 488, w: 716, h: 60 }]}
          steps={[
            { at: 243.9, text: 'Refine the instructions' },
            { at: 246.6, text: 'Return one update' },
            { at: 248.0, text: 'Only the five requested sections' },
            { at: 250.6, text: 'Missing owners or dates: “not specified”' },
          ]}
        />
      </Scene>

      {/* 23 — Create */}
      <Scene t={t} index={22} pad={false}>
        <Win
          t={t}
          n="13-preview-retest-summary-and-facts"
          cam={[hold(254.2, 1500, 260, 1.6)]}
          cursor={[
            { at: 254.3, x: 1520, y: 300 },
            { at: 254.5, x: 1793, y: 33, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 255.0, x: 1764, y: 18, w: 59, h: 30 }]}
          steps={[{ at: 254.9, text: 'Create' }]}
        />
      </Scene>

      {/* 24 — Created, private */}
      <Scene t={t} index={23} pad={false}>
        <Win
          t={t}
          n="14-created-successfully-private"
          cam={[hold(256.1, 1500, 260, 1.6), { at: 256.3, x: 960, y: 500, s: 2.0 }]}
          cursor={[
            { at: 268.7, x: 1010, y: 650 },
            { at: 269.3, x: 1187, y: 538, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 258.2, until: 259.6, x: 685, y: 448, w: 330, h: 26 },
            { at: 260.0, until: 262.5, x: 685, y: 486, w: 346, h: 20 },
            { at: 262.9, until: 268.5, x: 1032, y: 522, w: 94, h: 30 },
            { at: 269.8, x: 1140, y: 522, w: 94, h: 30 },
          ]}
          steps={[
            { at: 258.2, text: 'Created successfully' },
            { at: 260.0, text: 'Private: available only to me' },
            { at: 262.9, text: 'Sharing depends on your organization' },
            { at: 267.0, text: 'Keep Larry private' },
            { at: 269.7, text: 'Start chat' },
          ]}
        />
      </Scene>

      {/* 25 — Larry's chat */}
      <Scene t={t} index={24} pad={false}>
        <Win
          t={t}
          n="15-larry-created-chat"
          cam={[hold(271.1, 1090, 520, 1.25), { at: 271.3, x: 1090, y: 560, s: 1.7 }]}
          rings={[
            { at: 272.2, until: 274.6, x: 981, y: 610, w: 215, h: 125 },
            { at: 275.6, x: 706, y: 494, w: 765, h: 57 },
          ]}
          steps={[
            { at: 272.2, text: 'The suggested prompt, ready to use' },
            { at: 275.6, text: 'Add this week’s notes' },
            { at: 278.0, text: 'No need to paste the instructions again' },
          ]}
        />
      </Scene>

      {/* 26 — Normal chat response */}
      <Scene t={t} index={25} pad={false}>
        <Win
          t={t}
          n="16-normal-chat-summary-and-facts"
          cam={[hold(280.7, 1085, 480, 1.4), { at: 281.0, x: 1085, y: 620, s: 1.55, dur: 3.2 }]}
          steps={[{ at: 281.2, text: 'Check the response in normal chat' }]}
        />
      </Scene>

      {/* 27 — Agents menu > Larry, then More agents */}
      <Scene t={t} index={26} pad={false}>
        <Win
          t={t}
          n="18-larry-in-agents-menu"
          rail="back"
          cam={[
            { at: 284.9, x: 760, y: 420, s: 1.2, dur: 3.2 },
            { at: 288.3, x: 260, y: 300, s: 2.2 },
          ]}
          cursor={[
            { at: 288.9, x: 420, y: 130 },
            { at: 289.1, x: 75, y: 214, click: true, dur: 0.6 },
            { at: 291.0, x: 300, y: 220, click: true, dur: 0.6 },
            { at: 293.6, x: 322, y: 403, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 289.7, until: 291.2, x: 14, y: 199, w: 226, h: 29 },
            { at: 291.6, until: 293.6, x: 249, y: 204, w: 220, h: 29 },
            { at: 294.2, x: 252, y: 389, w: 228, h: 27 },
          ]}
          steps={[
            { at: 289.6, text: 'Agents' },
            { at: 291.6, text: 'Larry' },
            { at: 294.0, text: 'More agents' },
          ]}
        />
      </Scene>

      {/* 28 — Agent Store */}
      <Scene t={t} index={27} pad={false}>
        <Win
          t={t}
          n="19-more-agents-store-my-agents"
          rail="back"
          cam={[hold(295.2, 1080, 400, 1.3), { at: 295.4, x: 1080, y: 330, s: 1.6, dur: 0.8 }]}
          rings={[
            { at: 295.7, until: 297.0, x: 595, y: 79, w: 174, h: 34 },
            { at: 297.2, x: 849, y: 367, w: 90, h: 35 },
            { at: 298.1, x: 595, y: 290, w: 115, h: 26 },
          ]}
          steps={[
            { at: 295.7, text: 'Agent Store' },
            { at: 297.2, text: 'Larry, under My agents' },
          ]}
        />
      </Scene>

      {/* 29 — @Larry */}
      <Scene t={t} index={28} pad={false}>
        <Win
          t={t}
          n="20-larry-mention-picker"
          rail="back"
          cam={[hold(299.6, 1090, 560, 1.3), { at: 300.2, x: 1090, y: 620, s: 1.7 }]}
          cursor={[
            { at: 306.2, x: 1010, y: 770 },
            { at: 306.5, x: 900, y: 667, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 303.5, until: 304.6, x: 760, y: 516, w: 54, h: 24 },
            { at: 304.8, x: 748, y: 646, w: 683, h: 40 },
            { at: 305.4, until: 307.0, x: 801, y: 593, w: 117, h: 30 },
          ]}
          steps={[
            { at: 303.2, text: 'Type @Larry' },
            { at: 304.7, text: 'Select it under Agents & Skills' },
          ]}
        />
      </Scene>

      {/* 30 — Larry in the conversation */}
      <Scene t={t} index={29} pad={false}>
        <Win
          t={t}
          n="21-larry-selected-by-mention"
          rail="back"
          cam={[hold(307.4, 1090, 620, 1.7)]}
          rings={[{ at: 307.7, x: 763, y: 531, w: 96, h: 33 }]}
          steps={[{ at: 307.4, text: 'Larry joins the conversation' }]}
        />
      </Scene>

      {/* 31 — Options may vary (four switches), then Copilot Studio as the bigger workshop next door */}
      <Scene t={t} index={30}>
        <div style={{ display: 'grid', gridTemplateColumns: '820px 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 309.6, { y: 14 })}>Good to know</div>
            <div className="kit-h2" style={enter(t, 309.7, { dur: 0.8, y: 30 })}>The exact options may vary.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 44 }}>
              {[
                ['Microsoft 365 experience', 311.4],
                ['License', 314.0],
                ['Permissions', 314.8],
                ['Administrator settings', 315.5],
              ].map(([label, at], i) => (
                <div key={label as string} className="kit-card kit-ui" style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', fontSize: 30, fontWeight: 600, ...enter(t, 310.3 + i * 0.12, { x: -30, y: 0, dur: 0.5 }) }}>
                  {label as string}
                  <div style={{ marginLeft: 'auto' }}><Switch on={prog(t, at as number, 0.35, IN_OUT)} /></div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative', height: 560, ...enter(t, 317.0, { y: 0, dur: 0.5 }) }}>
            <svg width="760" height="560" viewBox="0 0 760 560" style={{ position: 'absolute', left: 0, top: 0 }}>
              {[
                [318.2, 'M330 280 L560 90'],
                [319.1, 'M330 280 L600 280'],
                [320.0, 'M330 280 L560 470'],
              ].map(([at, d]) => (
                <path key={d as string} d={d as string} stroke={GREEN} strokeWidth="4" strokeLinecap="round" fill="none" pathLength={1} strokeDasharray="1" strokeDashoffset={1 - prog(t, (at as number) - 0.25, 0.5, IN_OUT)} />
              ))}
            </svg>
            <div className="kit-ui" style={{ position: 'absolute', left: 0, top: 0, fontSize: 24, fontWeight: 600, color: GREEN, ...enter(t, 317.2, { y: 10 }) }}>For more advanced work</div>
            <div className="kit-card kit-ui" style={{ position: 'absolute', left: 90, top: 200, width: 320, height: 160, borderColor: GREEN, background: LIME_SOFT, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 18px 50px rgba(20,40,10,.14)', ...enter(t, 317.4, { scale: 0.6, y: 0, easing: BACK, dur: 0.6 }) }}>
              <AgentGlyph size={44} />
              <div className="kit-h3" style={{ fontSize: 36 }}>
                Copilot Studio
              </div>
            </div>
            {[
              ['Automation', 318.2, 510, 56],
              ['Actions', 319.1, 590, 246],
              ['Integrations', 320.0, 510, 436],
            ].map(([label, at, x, y]) => (
              <div key={label as string} className="kit-pill" style={{ position: 'absolute', left: x as number, top: y as number, fontSize: 28, ...enter(t, at as number, { y: 0, scale: 0.4, easing: BACK, dur: 0.5 }) }}>{label as string}</div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 32 — Closing: define once, test, then a new week drops in and an update comes out, again and again */}
      <Scene t={t} index={31} padStyle={{ opacity: 1 - prog(t, 335.95, 0.7, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 323.6, { y: 14 })}>Agent Builder</div>
        <div className="kit-h1" style={enter(t, 323.8, { dur: 0.9, y: 34 })}>
          A practical <span className="kit-mark" style={markStyle(t, 328.0)}>starting point.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 16, ...enter(t, 330.0, { y: 24, easing: BACK }) }}>
            <Lock closed={prog(t, 331.5, 0.4, IN_OUT)} size={44} />
            <div className="kit-h3" style={{ fontSize: 36 }}>Define it once</div>
          </div>
          <div style={{ opacity: prog(t, 332.2, 0.15) }}><Arrow t={t} at={332.2} w={70} /></div>
          <div className="kit-card kit-ui" style={{ padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 16, ...enter(t, 332.5, { y: 24, easing: BACK }) }}>
            <div style={enter(t, 332.9, { y: 0, scale: 0.3, easing: BACK, dur: 0.4 })}><Check size={44} /></div>
            <div className="kit-h3" style={{ fontSize: 36 }}>Test it</div>
          </div>
          <div style={{ opacity: prog(t, 333.3, 0.15) }}><Arrow t={t} at={333.3} w={70} /></div>
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '20px 26px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 333.6, { y: 24, easing: BACK }) }}>
            <div className="kit-h3" style={{ fontSize: 36 }}>Reuse it each week</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
              {[0, 1, 2, 3].map((i) => {
                const at = 334.2 + i * 0.4;
                return (
                  <div key={i} style={{ flex: 1, background: '#fff', borderRadius: 14, padding: '12px 14px', border: `2px solid ${GREEN}`, ...enter(t, at, { y: -34, dur: 0.45, easing: BACK }) }}>
                    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: GREEN }}>Week {i + 1}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                      <Bar t={t} at={at + 0.25} w="100%" h={8} dur={0.35} />
                      <Bar t={t} at={at + 0.33} w="70%" h={8} dur={0.35} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 40, ...enter(t, 334.4, { y: 12 }) }}>Fresh inputs in, a leadership update out.</p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const CopilotAgents: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={COPILOT_AGENTS_TITLE_FRAMES}>
      <TitleCardGreen label="COPILOT" title="Building Copilot Agents" />
    </Sequence>
    <Sequence from={COPILOT_AGENTS_TITLE_FRAMES}>
      <CopilotAgentsBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
