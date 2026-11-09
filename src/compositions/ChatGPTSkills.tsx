import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { loadFont as loadMono } from '@remotion/google-fonts/IBMPlexMono';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
  AppWindow,
  BACK,
  Check,
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
  Spark,
  Toggle,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// ChatGPT Skills — custom screenshot demo (Lead with AI), built with src/kit like ClaudeSkills.tsx.
// One clock: t = seconds of the VO (audio/chatgpt-skills.mp3, Daan on ElevenLabs v4, 353.1s), cues taken from
// the Scribe word timestamps in src/data/chatgpt-skills.transcript.json. A 90-frame green title card opens the video.
// Screenshots: chatgpt-skills/images/01..08 (1920x958, verified in ChatGPT web on 9 Nov 2026).
//
//  #  scene                               start   VO cue
//  1  Create and reuse workflows          0.00    "ChatGPT Skills let you create and reuse…"
//  2  More than a saved prompt            17.88   "A Skill is more than a saved prompt."
//  3  Repeatable work                     28.64   "Skills are especially useful for work…"
//  4  Anatomy: SKILL.md + extras          43.88   "At the center of every Skill…"
//  5  Installed skills                    66.00   "Once a Skill is installed…"
//  6  Two ways to trigger                 71.52   "There are two ways to trigger a Skill."
//  7  Manual: type @  (shot 06)           74.30   "You can call it manually."
//  8  Automatic                           79.68   "Or ChatGPT can trigger it automatically."
//  9  Add menu, three ways  (shot 01)     89.44   "There are three practical ways…"
//  10 Create with chat → Work (shot 08)   103.44  "This opens Work with the built-in skill-creator…"
//  11 Create with editor (shot 01)        108.08  "Second, use the editor."
//  12 Editor fields (shot 07)             111.90  "…enter the Skill's name, description…"
//  13 Upload (shot 01)                    117.64  "Third, upload a Skill…"
//  14 Record and Replay path              125.82  "If you're using the ChatGPT desktop app on a Mac…"
//  15 Demonstrate → drafted skill         141.20  "Then demonstrate the workflow on your Mac."
//  16 Meet Larry                          152.08  "For this demo…"
//  17 The goal                            161.11  "The goal is simple."
//  18 Ask skill-creator (shot 08)         170.31  "I'll start by asking ChatGPT…"
//  19 CODO                                176.80  "Next, I'll add my Koh-doh prompt template…"
//  20 Five output sections                210.24  "For Output, I want five sections…"
//  21 Examples                            221.89  "If needed, I can also add previous leadership updates…"
//  22 Review before installing (shot 02)  227.86  "ChatGPT uses all of this…"
//  23 Plain prompt test (shot 05)         234.96  "Now, let's test Larry…"
//  24 Evidence in Sources (shot 03)       262.04  "That's evidence the Skill was actually used…"
//  25 Check the output (shot 04)          266.56  "Then I'll check that the update follows…"
//  26 Refine + consistency                272.05  "If something isn't right…"
//  27 Share                               282.34  "And depending on workspace permissions…"
//  28 Availability + admins               289.03  "A few practical notes."
//  29 Codex + API                         304.08  "Skills are also supported in Codex…"
//  30 Data and training                   312.60  "For business plans…"
//  31 Three tips                          326.16  "Finally, three tips."
//  32 Closing                             344.24  "The goal is to capture a useful way of working…"

export const CHATGPT_SKILLS_DURATION_S = 354.6;
export const CHATGPT_SKILLS_TITLE_FRAMES = 90;

const STARTS = [
  0, 17.88, 28.64, 43.88, 66.0, 71.52, 74.3, 79.68, 89.44, 103.44, 108.08, 111.9, 117.64, 125.82, 141.2, 152.08, 161.11,
  170.31, 176.8, 210.24, 221.89, 227.86, 234.96, 262.04, 266.56, 272.05, 282.34, 289.03, 304.08, 312.6, 326.16, 344.24,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;
const WIN = 'chatgpt.com';
const BLUE = '#1F6FEB';

// Browser previews can inject the screenshots (data URIs) via globalThis.CHATGPT_SKILLS_SHOTS; renders use public/.
const shot = (n: string): string =>
  (globalThis as { CHATGPT_SKILLS_SHOTS?: Record<string, string> }).CHATGPT_SKILLS_SHOTS?.[n] ??
  staticFile(`chatgpt-skills/images/${n}.jpg`);

// ChatGPT-style prompt box for concept scenes.
const ChatBox: React.FC<{ text: string; caret?: boolean; w?: number; style?: React.CSSProperties }> = ({ text, caret, w = 760, style }) => (
  <div className="kit-card kit-ui" style={{ width: w, padding: '18px 20px 18px 26px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 18, boxShadow: '0 10px 30px rgba(0,0,0,.06)', ...style }}>
    <span style={{ fontSize: 30, color: MUTED, lineHeight: 1 }}>+</span>
    <span style={{ flex: 1, fontSize: 26, color: text ? INK : '#A8A8A8', whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {text || 'Ask ChatGPT'}
      {caret && <span style={{ display: 'inline-block', width: 2, height: 28, background: INK, marginLeft: 2, verticalAlign: -4 }} />}
    </span>
    <span style={{ width: 42, height: 42, borderRadius: '50%', background: BLUE, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22 }}>↑</span>
  </div>
);

const SectionHead: React.FC<{ t: number; at: number; label: string; children: React.ReactNode }> = ({ t, at, label, children }) => (
  <>
    <div className="kit-label" style={enter(t, at, { y: 14 })}>{label}</div>
    <div className="kit-h2" style={enter(t, at + 0.1, { dur: 0.8, y: 30 })}>{children}</div>
  </>
);

const Person: React.FC<{ letter: string; size?: number; style?: React.CSSProperties }> = ({ letter, size = 96, style }) => (
  <div className="kit-ui" style={{ width: size, height: size, borderRadius: '50%', background: LIME_SOFT, border: `3px solid ${LIME}`, display: 'grid', placeItems: 'center', fontSize: size * 0.4, fontWeight: 700, color: GREEN, ...style }}>
    {letter}
  </div>
);

const MiniDoc: React.FC<{ title: string; lines?: number; style?: React.CSSProperties; good?: boolean }> = ({ title, lines = 5, style, good }) => (
  <div className="kit-card kit-ui" style={{ padding: '20px 22px', borderColor: good ? GREEN : LINE, ...style }}>
    <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{title}</div>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} style={{ height: 9, borderRadius: 5, background: i % 3 === 0 ? '#D9D9D2' : '#ECECE6', marginTop: 12, width: `${92 - (i % 3) * 16}%` }} />
    ))}
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const Body: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/chatgpt-skills.mp3')} />}

      {/* 1 — Create and reuse your own workflows */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>ChatGPT Skills</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Create and <span className="kit-mark" style={markStyle(t, 2.48)}>reuse</span> your own workflows.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 90 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              ['Instructions', 10.48],
              ['Examples', 11.4],
              ['Optional code', 12.64],
            ].map(([label, at], i) => {
              const merge = prog(t, 13.52, 0.9, IN_OUT);
              return (
                <div key={label as string} style={enter(t, at as number, { x: -40, y: 0, easing: BACK })}>
                  <div className="kit-pill" style={{ transform: `translate(${merge * 120}px, ${merge * (1 - i) * 40}px) scale(${1 - merge * 0.25})`, opacity: 1 - merge * 0.75 }}>
                    {label as string}
                  </div>
                </div>
              );
            })}
          </div>
          <Arrow t={t} at={13.1} w={200} />
          <div className="kit-card" style={{ width: 560, padding: '34px 38px', display: 'flex', alignItems: 'center', gap: 26, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 13.52, { dur: 0.6, scale: 0.7, y: 0, easing: BACK }) }}>
            <FolderIcon size={92} open />
            <div>
              <div className="kit-h3">A Skill</div>
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>
                Applied <span style={{ fontWeight: 700 }}>whenever it’s relevant</span>
              </div>
            </div>
          </div>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 70, ...enter(t, 6.16, { y: 14 }) }}>
          Teach ChatGPT a specific way of working.
        </p>
      </Scene>

      {/* 2 — More than a saved prompt */}
      <Scene t={t} index={1}>
        <SectionHead t={t} at={18.0} label="What is a Skill">
          More than a{' '}
          <span style={{ position: 'relative' }}>
            saved prompt.
            <span style={{ position: 'absolute', left: 0, top: '55%', height: 6, background: RED, width: `${prog(t, 19.9, 0.6, IN_OUT) * 100}%` }} />
          </span>
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ width: 470, padding: '30px 34px', borderColor: GREEN, ...enter(t, 20.84, { y: 24, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 600 }}>
              <Spark size={34} /> A reusable process
            </div>
            {['1. Read the notes', '2. Apply the format', '3. Flag what’s missing'].map((l, i) => (
              <div key={l} className="kit-mono" style={{ fontSize: 22, marginTop: 14, color: '#333', ...enter(t, 21.4 + i * 0.3, { x: -10, y: 0, dur: 0.4 }) }}>{l}</div>
            ))}
          </div>
          <Arrow t={t} at={23.76} w={150} />
          <div style={{ display: 'flex', gap: 22 }}>
            {['Week 1', 'Week 2', 'Week 3'].map((w, i) => (
              <MiniDoc key={w} title={w} good={t >= 25.12} style={{ width: 230, ...enter(t, 24.16 + i * 0.3, { y: 30, easing: BACK }) }} />
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 30, marginTop: 50 }}>
          <span className="kit-pill" style={enter(t, 25.12, { y: 14, easing: BACK })}>
            <Check size={30} /> Consistent
          </span>
          <span className="kit-pill" style={enter(t, 26.48, { y: 14, easing: BACK })}>
            <Check size={30} /> Less setup each time
          </span>
        </div>
      </Scene>

      {/* 3 — Repeatable work */}
      <Scene t={t} index={2}>
        <SectionHead t={t} at={28.8} label="Where Skills help">
          Work that follows a <span className="kit-mark" style={markStyle(t, 31.44)}>pattern.</span>
        </SectionHead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, marginTop: 70 }}>
          {[
            ['Weekly updates', 32.4],
            ['Meeting summaries', 33.6],
            ['Decision memos', 34.8],
            ['Status reports', 35.84],
          ].map(([w, at]) => (
            <div key={w as string} className="kit-card kit-ui" style={{ padding: '28px 28px', display: 'flex', flexDirection: 'column', gap: 18, ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <FileIcon size={50} accent />
              <div style={{ fontSize: 30, fontWeight: 600 }}>{w as string}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 70 }}>
          <div className="kit-ui" style={{ fontSize: 32, color: MUTED, position: 'relative', ...enter(t, 37.2, { y: 12 }) }}>
            Explaining the same requirements every time
            <span style={{ position: 'absolute', left: 0, top: '55%', height: 4, background: RED, width: `${prog(t, 40.4, 0.6, IN_OUT) * 100}%` }} />
          </div>
          <Arrow t={t} at={40.6} w={120} />
          <span className="kit-pill" style={{ borderColor: GREEN, background: LIME_SOFT, ...enter(t, 41.68, { y: 0, scale: 0.7, easing: BACK }) }}>
            <Spark size={30} /> A workflow to reuse
          </span>
        </div>
      </Scene>

      {/* 4 — Anatomy */}
      <Scene t={t} index={3}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
          <div style={{ width: 520, flex: 'none' }}>
            <div className="kit-label" style={enter(t, 44.0, { y: 14 })}>Inside a Skill</div>
            <div className="kit-h2" style={enter(t, 44.1, { dur: 0.8, y: 30 })}>
              It starts with <span className="kit-mark" style={markStyle(t, 46.9)}>SKILL.md</span>
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ width: 420, flex: 'none', padding: '26px 26px', ...enter(t, 45.9, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 600 }}>
              <FolderIcon size={34} open /> your-skill/
            </div>
            <div style={{ marginLeft: 24, borderLeft: `2px solid ${LINE}`, paddingLeft: 18, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 24, padding: '8px 10px', borderRadius: 10, background: t >= 46.72 ? LIME_SOFT : 'transparent', fontWeight: 600, ...enter(t, 46.72, { x: -16, y: 0 }) }}>
                <FileIcon size={28} accent /> SKILL.md
              </div>
              <div style={{ fontSize: 16, letterSpacing: '.1em', color: MUTED, fontWeight: 600, margin: '10px 0 0 10px', ...enter(t, 55.44, { y: 0 }) }}>OPTIONAL</div>
              {[
                ['examples/', 56.4, true],
                ['references/', 59.36, true],
                ['templates/', 60.32, true],
                ['scripts/', 61.36, true],
              ].map(([name, at, dir]) => (
                <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, padding: '3px 10px', color: '#333', ...enter(t, at as number, { x: -16, y: 0, dur: 0.5 }) }}>
                  {dir ? <FolderIcon size={24} /> : <FileIcon size={24} />} {name as string}
                </div>
              ))}
            </div>
          </div>
          <div className="kit-card" style={{ flex: 1, padding: '30px 34px', background: '#FBFBF8', ...enter(t, 48.4, { x: 30, y: 0 }) }}>
            <div className="kit-ui" style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 18 }}>SKILL.md</div>
            <div className="kit-mono" style={{ fontSize: 22, lineHeight: 1.65, color: '#2B2B2B' }}>
              <div style={{ color: '#9A9A9A' }}>---</div>
              <div style={{ ...enter(t, 49.12, { y: 0, x: -10, dur: 0.5 }), background: t >= 49.12 && t < 50.2 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
                <span style={{ color: GREEN }}>name:</span> your-skill
              </div>
              <div style={{ ...enter(t, 50.24, { y: 0, x: -10, dur: 0.5 }), background: t >= 50.24 && t < 51.7 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
                <span style={{ color: GREEN }}>description:</span> what it does, when to use it
              </div>
              <div style={{ color: '#9A9A9A' }}>---</div>
              <div style={{ marginTop: 14, ...enter(t, 51.76, { y: 0, x: -10, dur: 0.5 }) }}>
                <div style={{ fontWeight: 700 }}># Instructions</div>
                {['1. Identify the key themes', '2. Write in the agreed format', '3. Never invent facts'].map((l, i) => (
                  <div key={l} style={enter(t, 52.2 + i * 0.35, { y: 0, x: -10, dur: 0.4 })}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 5 — Installed skills (shot 01, Installed list) */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={66.0}
          title={WIN}
          imgH={IMG_H}
          src={shot('01-skills-create-menu')}
          cam={[{ at: 66.4, x: 980, y: 250, s: 1.55, dur: 1.2 }]}
          rings={[{ at: 67.6, x: 998, y: 228, w: 412, h: 56, spot: true }]}
          steps={[
            { at: 66.72, text: 'Installed Skills' },
            { at: 68.88, text: 'Used whenever relevant to the task' },
          ]}
        />
      </Scene>

      {/* 6 — Two ways to trigger */}
      <Scene t={t} index={5}>
        <SectionHead t={t} at={71.6} label="Using a Skill">
          Two ways to <span className="kit-mark" style={markStyle(t, 72.64)}>trigger</span> a Skill.
        </SectionHead>
        <div style={{ display: 'flex', gap: 40, marginTop: 80 }}>
          <div className="kit-card kit-ui" style={{ width: 600, padding: '30px 34px', ...enter(t, 72.2, { y: 24, easing: BACK }) }}>
            <span className="kit-tag">1 · Manual</span>
            <div className="kit-h3" style={{ marginTop: 18 }}>Type @ and pick it</div>
          </div>
          <div className="kit-card kit-ui" style={{ width: 600, padding: '30px 34px', ...enter(t, 72.6, { y: 24, easing: BACK }) }}>
            <span className="kit-tag">2 · Automatic</span>
            <div className="kit-h3" style={{ marginTop: 18 }}>ChatGPT matches it</div>
          </div>
        </div>
      </Scene>

      {/* 7 — Manual: type @ (shot 06) */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t}
          start={74.3}
          title={WIN}
          imgH={IMG_H}
          src={shot('06-manual-skill-mention-menu')}
          cam={[{ at: 74.6, x: 985, y: 760, s: 1.75, dur: 1.2 }]}
          cursor={[
            { at: 76.2, x: 1200, y: 840 },
            { at: 77.0, x: 760, y: 608, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 76.4, until: 77.3, x: 640, y: 890, w: 230, h: 36 },
            { at: 77.6, x: 610, y: 590, w: 752, h: 36, spot: true },
          ]}
          steps={[
            { at: 74.96, text: 'Manual' },
            { at: 76.4, text: 'Type @' },
            { at: 77.36, text: 'Select the Skill from the menu' },
          ]}
        />
      </Scene>

      {/* 8 — Automatic */}
      <Scene t={t} index={7}>
        <SectionHead t={t} at={79.8} label="2 · Automatic">
          No name needed.
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 70 }}>
          <ChatBox text={typed(t, 83.0, 'Turn these notes into this week’s update', 1.4)} caret={t < 85.0} w={720} style={enter(t, 82.72, { y: 20 })} />
          <Arrow t={t} at={84.3} w={130} label="matches" />
          <div className="kit-card kit-ui" style={{ width: 520, padding: '26px 30px', borderColor: t >= 85.28 ? GREEN : LINE, background: t >= 85.28 ? LIME_SOFT : '#fff', ...enter(t, 84.24, { x: 30, y: 0, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 600 }}>
              <FileIcon size={30} accent /> leadership-update-writer
            </div>
            <div style={{ fontSize: 21, color: MUTED, marginTop: 8 }}>Turns notes into polished leadership updates.</div>
          </div>
        </div>
        <p className="kit-ui" style={{ fontSize: 30, marginTop: 60, ...enter(t, 86.0, { y: 12 }) }}>
          <Check size={30} /> ChatGPT applies its instructions <span className="kit-mark" style={markStyle(t, 87.36)}>without you naming it</span>.
        </p>
      </Scene>

      {/* 9 — Add menu: three ways (shot 01) */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={89.44}
          title={WIN}
          imgH={IMG_H}
          src={shot('01-skills-create-menu')}
          cam={[
            { at: 89.6, x: 1290, y: 150, s: 2.2, dur: 1.0 },
            { at: 98.2, x: 960, y: 300, s: 1.0, dur: 0.8 },
            { at: 101.2, x: 1290, y: 150, s: 2.2, dur: 0.9 },
          ]}
          cursor={[
            { at: 97.6, x: 700, y: 600 },
            { at: 98.4, x: 26, y: 182, click: true, dur: 0.7 },
            { at: 99.5, x: 600, y: 120, dur: 0.6 },
            { at: 100.2, x: 1376, y: 46, click: true, dur: 0.6 },
            { at: 101.6, x: 1265, y: 97, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 90.6, until: 92.8, x: 1172, y: 80, w: 236, h: 108 },
            { at: 92.9, until: 97.9, x: 1172, y: 80, w: 236, h: 34, spot: true },
            { at: 98.9, until: 99.6, x: 8, y: 164, w: 38, h: 38 },
            { at: 99.6, until: 100.6, x: 540, y: 28, w: 80, h: 38 },
            { at: 100.7, until: 101.9, x: 1340, y: 28, w: 74, h: 38 },
            { at: 102.0, x: 1172, y: 80, w: 236, h: 34, spot: true },
          ]}
          steps={[
            { at: 89.88, text: 'Three ways to create a Skill' },
            { at: 92.88, text: '1 · Create in conversation' },
            { at: 98.48, text: 'Plugins' },
            { at: 99.52, text: 'Plugins › Skills' },
            { at: 100.64, text: 'Plugins › Skills › Add' },
            { at: 102.0, text: 'Create with chat' },
          ]}
        />
      </Scene>

      {/* 10 — Work + skill-creator (shot 08) */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          t={t}
          start={103.44}
          title={WIN}
          imgH={IMG_H}
          src={shot('08-create-with-chat-skill-creator')}
          cam={[{ at: 103.6, x: 985, y: 300, s: 1.6, dur: 1.0 }]}
          rings={[
            { at: 104.24, until: 105.2, x: 978, y: 8, w: 122, h: 38 },
            { at: 105.28, x: 650, y: 416, w: 116, h: 30, spot: true },
          ]}
          steps={[
            { at: 104.24, text: 'Opens Work' },
            { at: 105.28, text: 'skill-creator is ready to guide you' },
          ]}
        />
      </Scene>

      {/* 11 — Create with editor in the menu (shot 01) */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          t={t}
          start={108.08}
          title={WIN}
          imgH={IMG_H}
          src={shot('01-skills-create-menu')}
          cam={[{ at: 108.08, x: 1290, y: 150, s: 2.2, dur: 0.01 }]}
          cursor={[
            { at: 108.6, x: 1300, y: 260 },
            { at: 110.3, x: 1270, y: 133, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 110.64, x: 1172, y: 116, w: 236, h: 34, spot: true }]}
          steps={[
            { at: 108.08, text: '2 · Use the editor' },
            { at: 110.64, text: 'Create with editor' },
          ]}
        />
      </Scene>

      {/* 12 — Editor fields (shot 07) */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          t={t}
          start={111.9}
          title={WIN}
          imgH={IMG_H}
          src={shot('07-create-with-editor')}
          cam={[
            { at: 112.0, x: 700, y: 200, s: 1.7, dur: 0.8 },
            { at: 115.4, x: 1600, y: 120, s: 2.0, dur: 0.8 },
          ]}
          cursor={[
            { at: 112.1, x: 900, y: 122 },
            { at: 113.2, x: 900, y: 168, dur: 0.5 },
            { at: 114.4, x: 520, y: 271, dur: 0.5 },
            { at: 115.4, x: 1868, y: 30, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 112.48, until: 113.4, x: 340, y: 100, w: 1560, h: 42 },
            { at: 113.44, until: 114.7, x: 340, y: 146, w: 1560, h: 62 },
            { at: 114.72, until: 115.6, x: 340, y: 252, w: 600, h: 40 },
            { at: 116.16, x: 1828, y: 10, w: 82, h: 40, spot: true },
          ]}
          steps={[
            { at: 112.48, text: 'Name' },
            { at: 113.44, text: 'Description' },
            { at: 114.72, text: 'Instructions' },
            { at: 116.16, text: 'Create' },
          ]}
        />
      </Scene>

      {/* 13 — Upload (shot 01) */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          t={t}
          start={117.64}
          title={WIN}
          imgH={IMG_H}
          src={shot('01-skills-create-menu')}
          cam={[{ at: 117.64, x: 1290, y: 150, s: 2.2, dur: 0.01 }]}
          cursor={[
            { at: 117.9, x: 1300, y: 260 },
            { at: 118.0, x: 1300, y: 169, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 118.36, x: 1172, y: 152, w: 236, h: 34, spot: true }]}
          steps={[
            { at: 117.64, text: '3 · Upload a Skill you already have' },
            { at: 121.76, text: 'Menu labels can vary by product and workspace' },
          ]}
        />
      </Scene>

      {/* 14 — Record and Replay path */}
      <Scene t={t} index={13}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span className="kit-tag" style={enter(t, 126.48, { y: 0, scale: 0.6, easing: BACK })}>ChatGPT desktop app · Mac</span>
        </div>
        <div className="kit-h2" style={{ marginTop: 20, ...enter(t, 126.0, { dur: 0.8, y: 30 }) }}>
          One more option: <span className="kit-mark" style={markStyle(t, 130.8)}>Record and Replay.</span>
        </div>
        <div className="kit-card kit-ui" style={{ display: 'inline-flex', alignItems: 'center', gap: 24, padding: '20px 30px', marginTop: 60, ...enter(t, 132.8, { y: 20 }) }}>
          <span style={{ fontSize: 30, fontWeight: 600 }}>Computer Use</span>
          <Toggle on={prog(t, 133.96, 0.35, IN_OUT)} w={88} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 50 }}>
          {[
            ['Work or Codex', 134.96],
            ['Plugins', 136.64],
            ['+ menu', 138.16],
            ['Record a skill', 139.76],
          ].map(([w, at], i) => (
            <React.Fragment key={w as string}>
              {i > 0 && <span className="kit-ui" style={{ fontSize: 34, color: MUTED, ...enter(t, at as number, { y: 0 }) }}>›</span>}
              <span className="kit-pill" style={{ borderColor: i === 3 ? GREEN : LINE, background: i === 3 && t >= 139.76 ? LIME_SOFT : '#fff', ...enter(t, at as number, { y: 14, easing: BACK }) }}>
                {i === 3 && <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#E5484D' }} />}
                {w as string}
              </span>
            </React.Fragment>
          ))}
        </div>
      </Scene>

      {/* 15 — Demonstrate → drafted Skill */}
      <Scene t={t} index={14}>
        <SectionHead t={t} at={141.3} label="Record and Replay">
          Show it once. <span className="kit-mark" style={markStyle(t, 147.92)}>Get a Skill.</span>
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 46, marginTop: 64 }}>
          <div className="kit-card" style={{ width: 620, height: 340, position: 'relative', overflow: 'hidden', background: '#FBFBF8', ...enter(t, 141.6, { y: 24 }) }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ position: 'absolute', left: 40, top: 60 + i * 62, height: 40, width: 380 - i * 50, borderRadius: 10, background: '#ECECE6', opacity: prog(t, 142.2 + i * 0.6, 0.4) }} />
            ))}
            {(() => {
              const path = [
                [120, 80],
                [420, 140],
                [180, 260],
                [460, 220],
              ];
              const seg = Math.max(0, (t - 142.0) / 1.2) % path.length;
              const i = Math.floor(seg);
              const e = IN_OUT(Math.min(1, (seg - i) * 1.4));
              const a = path[i];
              const b = path[(i + 1) % path.length];
              return (
                <svg width="34" height="34" viewBox="0 0 24 24" style={{ position: 'absolute', left: a[0] + (b[0] - a[0]) * e, top: a[1] + (b[1] - a[1]) * e }}>
                  <path d="M3 2l15.5 9.2-6.6 1.4 3.8 7.3-2.9 1.5-3.8-7.3-4.9 4.6z" fill="#111" stroke="#fff" strokeWidth="1.4" />
                </svg>
              );
            })()}
            <div className="kit-ui" style={{ position: 'absolute', right: 18, top: 16, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `2px solid ${LINE}`, borderRadius: 999, padding: '6px 14px', fontSize: 18, fontWeight: 700, ...enter(t, 141.6, { y: 0, scale: 0.6, easing: BACK }) }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#E5484D', opacity: t < 144.76 ? 0.55 + 0.45 * Math.abs(Math.sin(t * 3)) : 0.25 }} /> {t < 144.76 ? 'REC' : 'DONE'}
            </div>
            <div className="kit-ui" style={{ position: 'absolute', left: 18, bottom: 16, background: INK, color: '#fff', borderRadius: 999, padding: '6px 16px', fontSize: 18, fontWeight: 600 }}>Your workflow on your Mac</div>
          </div>
          <Arrow t={t} at={146.32} w={160} />
          <div className="kit-card kit-ui" style={{ width: 500, padding: '30px 34px', borderColor: GREEN, ...enter(t, 147.92, { scale: 0.85, y: 0, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Spark size={34} />
              <div style={{ fontSize: 30, fontWeight: 600 }}>Draft Skill</div>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 12, borderRadius: 6, background: '#ECECE6', marginTop: 20, width: `${90 - i * 18}%` }} />
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <span className="kit-tag" style={enter(t, 150.0, { y: 0, scale: 0.6, easing: BACK })}>Review</span>
              <span className="kit-tag" style={enter(t, 150.76, { y: 0, scale: 0.6, easing: BACK })}>Refine</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 16 — Meet Larry */}
      <Scene t={t} index={15}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
          <div style={{ width: 300, height: 300, borderRadius: '50%', background: LIME_SOFT, border: `6px solid ${LIME}`, display: 'grid', placeItems: 'center', flex: 'none', ...enter(t, 157.4, { scale: 0.5, y: 0, dur: 0.8, easing: BACK }) }}>
            <span className="kit-h1" style={{ fontSize: 170, color: GREEN }}>L</span>
          </div>
          <div>
            <div className="kit-label" style={enter(t, 152.3, { y: 14 })}>Demo · create in conversation</div>
            <div className="kit-h1" style={{ fontSize: 150, ...enter(t, 156.88, { dur: 0.9, y: 34 }) }}>
              Meet <span className="kit-mark" style={markStyle(t, 158.4)}>Larry.</span>
            </div>
            <p className="kit-body" style={{ marginTop: 26, fontSize: 40, ...enter(t, 159.04, { y: 16 }) }}>
              The Leadership Update Writer.
            </p>
          </div>
        </div>
      </Scene>

      {/* 17 — The goal */}
      <Scene t={t} index={16}>
        <SectionHead t={t} at={161.2} label="The goal">
          Rough notes in. <span className="kit-mark" style={markStyle(t, 167.6)}>The same format out.</span>
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 64 }}>
          <div className="kit-card kit-ui" style={{ width: 560, padding: '26px 30px', background: '#FBF7E8', borderColor: '#EFE4BC', transform: 'rotate(-1.5deg)', ...enter(t, 165.2, { y: 24 }) }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.1em', color: '#8A7A3A' }}>ROUGH NOTES · WEEK 45</div>
            {['pilot done, 10/12 onboarded', '2 defects left, Maya by 12 Nov', 'sales wants 16 Nov launch??', 'support training, owner?'].map((l, i) => (
              <div key={l} className="kit-mono" style={{ fontSize: 22, marginTop: 12, color: '#4A4320', ...enter(t, 165.4 + i * 0.2, { x: -10, y: 0, dur: 0.4 }) }}>- {l}</div>
            ))}
          </div>
          <Arrow t={t} at={166.3} w={170} label="Larry" />
          <div className="kit-card kit-ui" style={{ width: 560, padding: '26px 30px', borderColor: GREEN, ...enter(t, 166.96, { x: 30, y: 0, easing: BACK }) }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>Weekly Leadership Update</div>
            {['Executive Summary', 'Key Developments', 'Decisions & Action Items', 'Trade-Offs or Conflicts', 'Closing / Next Steps'].map((h, i) => (
              <div key={h} style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12, fontSize: 20, ...enter(t, 168.3 + i * 0.12, { y: 0, x: -8, dur: 0.3 }) }}>
                <span style={{ color: GREEN, fontWeight: 700 }}>{i + 1}.</span> {h}
              </div>
            ))}
          </div>
        </div>
        <p className="kit-ui kit-muted" style={{ fontSize: 28, marginTop: 40, ...enter(t, 163.04, { y: 10 }) }}>Every week.</p>
      </Scene>

      {/* 18 — Ask skill-creator (shot 08) */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={170.31}
          title={WIN}
          imgH={IMG_H}
          src={shot('08-create-with-chat-skill-creator')}
          cam={[{ at: 170.5, x: 985, y: 445, s: 1.9, dur: 1.0 }]}
          rings={[{ at: 171.4, x: 602, y: 403, w: 768, h: 126, spot: true }]}
          steps={[
            { at: 170.88, text: 'Ask ChatGPT to create the Skill' },
            { at: 174.16, text: 'Larry, Leadership Update Writer' },
          ]}
        />
      </Scene>

      {/* 19 — CODO */}
      <Scene t={t} index={18}>
        <SectionHead t={t} at={176.9} label="Brief Larry">
          The CODO template.
        </SectionHead>
        {(() => {
          const L = [
            { l: 'C', w: 'Character', at: 179.6, on: 183.81 },
            { l: 'O', w: 'Objective', at: 180.4, on: 189.5 },
            { l: 'D', w: 'Do’s and Don’ts', at: 181.36, on: 198.38 },
            { l: 'O', w: 'Output', at: 182.56, on: 210.24 },
          ];
          const active = [...L].reverse().findIndex((x) => t >= x.on);
          const ai = active === -1 ? -1 : L.length - 1 - active;
          return (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, marginTop: 50 }}>
                {L.map((x, i) => {
                  const on = i === ai;
                  return (
                    <div key={i} className="kit-card" style={{ padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 22, background: on ? LIME_SOFT : '#fff', borderColor: on ? GREEN : LINE, ...enter(t, x.at, { y: 30, dur: 0.6, easing: BACK }) }}>
                      <span className="kit-h1" style={{ fontSize: 96, lineHeight: 1, color: on ? GREEN : INK }}>{x.l}</span>
                      <span className="kit-ui" style={{ fontSize: 28, fontWeight: 600 }}>{x.w}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ position: 'relative', height: 330, marginTop: 40 }}>
                {ai === 0 && (
                  <div style={{ position: 'absolute', inset: 0, ...enter(t, 183.81, { y: 20 }) }}>
                    <div className="kit-h3" style={{ fontSize: 50 }}>
                      A leadership update writer, communicating with the{' '}
                      <span className="kit-mark" style={markStyle(t, 188.08)}>executive team</span>.
                    </div>
                  </div>
                )}
                {ai === 1 && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 30, ...enter(t, 189.5, { y: 20 }) }}>
                    <div className="kit-card" style={{ width: 280, height: 320, padding: 26, boxShadow: '0 16px 40px rgba(0,0,0,.08)', ...enter(t, 192.72, { y: 20, easing: BACK }) }}>
                      <div className="kit-ui" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.1em', color: MUTED }}>1 PAGE</div>
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} style={{ height: 11, borderRadius: 6, background: i % 3 === 0 ? '#D9D9D2' : '#ECECE6', marginTop: 22, width: `${92 - (i % 3) * 14}%` }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
                      <div className="kit-h3" style={{ fontSize: 50, ...enter(t, 191.44, { y: 14 }) }}>A concise, one-page weekly update</div>
                      <div className="kit-body kit-muted" style={enter(t, 194.24, { y: 14 })}>
                        that helps leaders stay informed and make{' '}
                        <span className="kit-mark" style={{ ...markStyle(t, 196.4), color: INK }}>strategic decisions</span>.
                      </div>
                    </div>
                  </div>
                )}
                {ai === 2 && (
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, ...enter(t, 198.38, { y: 20 }) }}>
                    <div>
                      <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.1em', color: GREEN, marginBottom: 18 }}>HIGHLIGHT</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {[
                          ['Major developments', 200.96],
                          ['Decisions', 202.28],
                          ['Approvals', 203.12],
                          ['Deadlines', 204.04],
                        ].map(([w, at]) => (
                          <span key={w as string} className="kit-pill" style={{ fontSize: 28, ...enter(t, at as number, { y: 14, easing: BACK }) }}>
                            <Check size={28} /> {w as string}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.1em', color: GREEN, marginBottom: 18 }}>AND ALWAYS</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {[
                          ['Explain trade-offs', 205.56, false],
                          ['Use plain language', 206.8, false],
                          ['Never invent information', 208.24, true],
                        ].map(([w, at, bad]) => (
                          <span key={w as string} className="kit-pill" style={{ fontSize: 28, borderColor: bad ? RED : LINE, ...enter(t, at as number, { y: 14, easing: BACK }) }}>
                            {bad ? <Cross size={28} /> : <Check size={28} />} {w as string}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })()}
      </Scene>

      {/* 20 — Five output sections */}
      <Scene t={t} index={19}>
        <div style={{ display: 'grid', gridTemplateColumns: '620px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 210.4, { y: 14 })}>Output</div>
            <div className="kit-h2" style={enter(t, 210.5, { dur: 0.8, y: 30 })}>
              <span className="kit-mark" style={markStyle(t, 211.6)}>Five sections,</span> every week.
            </div>
          </div>
          <div className="kit-card" style={{ padding: '40px 50px', boxShadow: '0 30px 70px rgba(0,0,0,.08)', ...enter(t, 210.8, { y: 40 }) }}>
            <div className="kit-h3" style={{ fontSize: 36, marginBottom: 14 }}>Weekly Leadership Update</div>
            {[
              ['Executive Summary', 213.2],
              ['Key Developments', 214.4],
              ['Decisions and Action Items', 215.68],
              ['Trade-Offs or Conflicts', 217.68],
              ['Closing or Next Steps', 219.68],
            ].map(([h, at], i) => (
              <div key={h as string} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderTop: `2px solid ${LINE}`, ...enter(t, at as number, { x: -30, y: 0 }) }}>
                <span className="kit-ui" style={{ width: 44, height: 44, borderRadius: 12, background: LIME_SOFT, color: GREEN, fontWeight: 700, fontSize: 22, display: 'grid', placeItems: 'center' }}>{i + 1}</span>
                <span className="kit-ui" style={{ fontSize: 30, fontWeight: 600, width: 440 }}>{h as string}</span>
                <span style={{ flex: 1, height: 11, borderRadius: 6, background: '#ECECE6' }} />
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 21 — Examples */}
      <Scene t={t} index={20}>
        <SectionHead t={t} at={222.0} label="Optional">
          Add <span className="kit-mark" style={markStyle(t, 226.32)}>examples.</span>
        </SectionHead>
        <div style={{ display: 'flex', gap: 34, marginTop: 70 }}>
          {[
            ['Previous update · Week 44', 223.36],
            ['Previous update · Week 43', 223.92],
            ['Reporting template', 225.12],
          ].map(([name, at], i) => (
            <div key={name as string} className="kit-card kit-ui" style={{ width: 380, padding: '26px 28px', ...enter(t, at as number, { y: -50, dur: 0.6, easing: BACK }) }}>
              <FileIcon size={56} accent={i < 2} />
              <div style={{ fontSize: 26, fontWeight: 600, marginTop: 18 }}>{name as string}</div>
              <div style={{ fontSize: 16, letterSpacing: '.1em', color: MUTED, fontWeight: 700, marginTop: 6 }}>{i < 2 ? 'EXAMPLE' : 'TEMPLATE'}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 22 — Review before installing (shot 02) */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          t={t}
          start={227.86}
          title={WIN}
          imgH={IMG_H}
          src={shot('02-installed-larry-instructions')}
          cam={[
            { at: 228.2, x: 1090, y: 320, s: 1.6, dur: 1.0 },
            { at: 231.3, x: 1090, y: 560, s: 1.6, dur: 1.2 },
          ]}
          rings={[
            { at: 229.0, until: 231.2, x: 756, y: 226, w: 664, h: 194 },
            { at: 232.08, x: 750, y: 436, w: 670, h: 210, spot: true },
          ]}
          steps={[
            { at: 229.76, text: 'ChatGPT generates the Skill’s instructions' },
            { at: 232.08, text: 'Review and refine before installing' },
          ]}
        />
      </Scene>

      {/* 23 — Plain prompt test (shot 05) */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          t={t}
          start={234.96}
          title={WIN}
          imgH={IMG_H}
          src={shot('05-plain-prompt-with-skill-attribution')}
          cam={[
            { at: 235.2, x: 880, y: 260, s: 1.7, dur: 1.0 },
            { at: 243.4, x: 880, y: 120, s: 2.2, dur: 0.9 },
            { at: 256.3, x: 1600, y: 170, s: 2.2, dur: 1.0 },
          ]}
          rings={[
            { at: 237.6, until: 240.2, x: 612, y: 140, w: 538, h: 300 },
            { at: 240.4, until: 247.4, x: 618, y: 92, w: 400, h: 32 },
            { at: 257.04, until: 258.4, x: 1484, y: 70, w: 410, h: 34 },
            { at: 258.56, x: 1484, y: 126, w: 410, h: 90, spot: true },
          ]}
          steps={[
            { at: 236.88, text: 'A sample set of weekly notes' },
            { at: 240.4, text: '“Turn these notes into this week’s leadership update.”' },
            { at: 243.76, text: 'No Larry. No Skill selected.' },
            { at: 248.08, text: 'Does ChatGPT recognize the match?' },
            { at: 256.72, text: 'Open Sources' },
            { at: 258.56, text: 'Skills · leadership-update-writer' },
          ]}
        />
      </Scene>

      {/* 24 — Evidence (shot 03) */}
      <Scene t={t} index={23} pad={false}>
        <AppWindow
          t={t}
          start={262.04}
          title={WIN}
          imgH={IMG_H}
          src={shot('03-automatic-invocation-sources')}

          rings={[
            { at: 262.32, until: 264.6, x: 1484, y: 126, w: 410, h: 90, spot: true },
            { at: 265.04, x: 396, y: 112, w: 270, h: 38 },
            { at: 265.2, x: 396, y: 440, w: 250, h: 38 },
            { at: 265.36, x: 396, y: 552, w: 220, h: 38 },
          ]}
          steps={[
            { at: 262.32, text: 'Evidence the Skill was used' },
            { at: 264.64, text: 'Not just familiar headings' },
          ]}
        />
      </Scene>

      {/* 25 — Check the output (shot 04) */}
      <Scene t={t} index={24} pad={false}>
        <AppWindow
          t={t}
          start={266.56}
          title={WIN}
          imgH={IMG_H}
          src={shot('04-update-format-and-skill')}
          left={70}
          top={220}
          width={1060}
          cam={[
            { at: 266.56, x: 770, y: 560, s: 1.6, dur: 0.01 },
            { at: 268.2, x: 770, y: 720, s: 1.6, dur: 3.5 },
          ]}
          rings={[{ at: 269.2, x: 396, y: 640, w: 290, h: 34 }]}
        />
        <div style={{ position: 'absolute', left: 1200, top: 300, width: 640 }}>
          <div className="kit-label" style={enter(t, 266.8, { y: 14 })}>Review the result</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, marginTop: 10 }}>
            {[
              ['Structure', 269.2],
              ['Tone', 270.0],
              ['Level of detail', 270.64],
            ].map(([w, at]) => (
              <div key={w as string} className="kit-card kit-ui" style={{ padding: '22px 26px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 32, ...enter(t, at as number, { x: 30, y: 0, easing: BACK }) }}>
                <Check size={36} /> {w as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 26 — Refine + consistency */}
      <Scene t={t} index={25}>
        <SectionHead t={t} at={272.2} label="Iterate">
          Refine, then <span className="kit-mark" style={markStyle(t, 276.32)}>test again.</span>
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 60 }}>
          <div className="kit-card kit-mono" style={{ width: 560, padding: '24px 28px', fontSize: 21, lineHeight: 1.7, background: '#FBFBF8', ...enter(t, 273.6, { y: 24 }) }}>
            <div style={{ background: t >= 275.36 && t < 277.4 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
              <span style={{ color: GREEN }}>description:</span> {t >= 275.36 ? 'weekly leadership updates from notes…' : 'leadership updates…'}
            </div>
            <div style={{ background: t >= 274.16 && t < 275.36 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
              # Instructions <span style={{ color: GREEN }}>{t >= 274.4 ? '(edited)' : ''}</span>
            </div>
          </div>
          <Arrow t={t} at={277.6} w={110} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {['Notes set A', 'Notes set B', 'Notes set C'].map((n, i) => (
              <div key={n} className="kit-card kit-ui" style={{ padding: '10px 18px', fontSize: 22, background: '#FBF7E8', borderColor: '#EFE4BC', ...enter(t, 278.4 + i * 0.25, { x: -20, y: 0 }) }}>{n}</div>
            ))}
          </div>
          <Arrow t={t} at={279.6} w={110} />
          <div style={{ display: 'flex', gap: 14 }}>
            {[0, 1, 2].map((i) => (
              <MiniDoc key={i} title="Update" lines={4} good={t >= 280.96} style={{ width: 150, padding: '14px 16px', ...enter(t, 280.0 + i * 0.2, { y: 20, easing: BACK }) }} />
            ))}
          </div>
        </div>
        <p className="kit-ui" style={{ fontSize: 30, marginTop: 50, ...enter(t, 280.96, { y: 10 }) }}>
          <Check size={30} /> Consistent every time.
        </p>
      </Scene>

      {/* 27 — Share */}
      <Scene t={t} index={26}>
        <SectionHead t={t} at={282.5} label="Share">
          One Skill, <span className="kit-mark" style={markStyle(t, 285.68)}>the whole team.</span>
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 80 }}>
          <div className="kit-card kit-ui" style={{ padding: '28px 32px', borderColor: GREEN, background: LIME_SOFT, display: 'flex', alignItems: 'center', gap: 18, ...enter(t, 283.0, { y: 0, scale: 0.8, easing: BACK }) }}>
            <FolderIcon size={60} open />
            <span style={{ fontSize: 30, fontWeight: 600 }}>leadership-update-writer</span>
          </div>
          <Arrow t={t} at={284.8} w={160} label="Share" />
          <div style={{ display: 'flex', gap: 26 }}>
            {['A', 'J', 'M', 'O'].map((l, i) => (
              <Person key={l} letter={l} style={enter(t, 285.68 + i * 0.2, { y: 20, scale: 0.6, easing: BACK })} />
            ))}
          </div>
        </div>
        <p className="kit-ui kit-muted" style={{ fontSize: 28, marginTop: 50, ...enter(t, 283.12, { y: 10 }) }}>
          Depending on workspace permissions.
        </p>
      </Scene>

      {/* 28 — Availability + admins */}
      <Scene t={t} index={27}>
        <SectionHead t={t} at={289.1} label="Practical notes">
          Availability <span className="kit-mark" style={markStyle(t, 292.0)}>depends on</span>…
        </SectionHead>
        <div style={{ display: 'flex', gap: 24, marginTop: 50 }}>
          {[
            ['Your plan', 292.72],
            ['Workspace permissions', 293.6],
            ['Product', 294.8],
          ].map(([w, at]) => (
            <span key={w as string} className="kit-pill" style={enter(t, at as number, { y: 14, easing: BACK })}>{w as string}</span>
          ))}
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 60, padding: '30px 34px', ...enter(t, 295.84, { y: 24 }) }}>
          <div style={{ fontSize: 30 }}>
            In managed workspaces, <b>administrators</b> may control who can…
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
            {[
              ['Create', 299.44],
              ['Upload', 300.24],
              ['Use', 301.04],
              ['Share', 301.88],
              ['Install', 302.4],
            ].map(([w, at]) => (
              <span key={w as string} className="kit-tag" style={{ fontSize: 22, padding: '10px 22px', ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>{w as string}</span>
            ))}
          </div>
        </div>
      </Scene>

      {/* 29 — Codex + API */}
      <Scene t={t} index={28}>
        <SectionHead t={t} at={304.2} label="Beyond ChatGPT">
          Skills work in more places.
        </SectionHead>
        <div style={{ display: 'flex', gap: 40, marginTop: 70 }}>
          {[
            ['ChatGPT', 304.6],
            ['Codex', 305.84],
            ['OpenAI API', 306.72],
          ].map(([w, at]) => (
            <div key={w as string} className="kit-card kit-ui" style={{ width: 400, height: 200, padding: '30px 34px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <div className="kit-h3">{w as string}</div>
              <span className="kit-ui" style={{ fontSize: 22, color: MUTED, ...enter(t, 309.0, { y: 8 }) }}>Install and sync differ</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 30 — Data and training */}
      <Scene t={t} index={29}>
        <SectionHead t={t} at={312.7} label="Business plans">
          Your data <span className="kit-mark" style={markStyle(t, 321.12)}>isn’t used for training</span> by default.
        </SectionHead>
        <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 70 }}>
          {[
            ['ChatGPT Business', 316.64],
            ['ChatGPT Enterprise', 318.24],
            ['API', 320.24],
          ].map(([w, at]) => (
            <span key={w as string} className="kit-pill" style={enter(t, at as number, { y: 14, easing: BACK })}>
              <Check size={30} /> {w as string}
            </span>
          ))}
        </div>
        <p className="kit-ui kit-muted" style={{ fontSize: 30, marginTop: 50, ...enter(t, 323.2, { y: 10 }) }}>
          Unless your organization opts in.
        </p>
      </Scene>

      {/* 31 — Three tips */}
      <Scene t={t} index={30}>
        <SectionHead t={t} at={326.3} label="Three tips">
          Make your Skills work.
        </SectionHead>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 56 }}>
          {[
            ['Use Skills for repeatable workflows', 'that benefit from consistency', 328.24],
            ['Write a clear description', 'of when to use the Skill', 333.12],
            ['Add examples and resources', 'so it follows the workflow reliably', 339.04],
          ].map(([h, s, at], i) => (
            <div key={h as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 26, ...enter(t, at as number, { x: -30, y: 0 }) }}>
              <span style={{ width: 64, height: 64, borderRadius: 16, background: LIME_SOFT, color: GREEN, fontWeight: 700, fontSize: 32, display: 'grid', placeItems: 'center', flex: 'none' }}>{i + 1}</span>
              <span style={{ fontSize: 38, fontWeight: 600 }}>{h as string}</span>
              <span style={{ fontSize: 30, color: MUTED }}>{s as string}</span>
            </div>
          ))}
        </div>
      </Scene>

      {/* 32 — Closing */}
      <Scene t={t} index={31} padStyle={{ opacity: 1 - prog(t, 353.6, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 344.4, { y: 14 })}>ChatGPT Skills</div>
        <div className="kit-h1" style={enter(t, 344.6, { dur: 0.9, y: 34 })}>
          <span className="kit-mark" style={markStyle(t, 345.24)}>Capture a way of working</span> once.
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 50, ...enter(t, 348.16, { y: 18 }) }}>
          ChatGPT applies it again and again.
        </p>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 10, ...enter(t, 350.08, { y: 18 }) }}>
          No more <span className="kit-mark" style={markStyle(t, 351.68)}>explaining from scratch.</span>
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ChatGPTSkills: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CHATGPT_SKILLS_TITLE_FRAMES}>
      <TitleCardGreen label="CHATGPT" title="ChatGPT Skills" />
    </Sequence>
    <Sequence from={CHATGPT_SKILLS_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
