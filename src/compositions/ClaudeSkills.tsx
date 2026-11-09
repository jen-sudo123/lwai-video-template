import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
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
  MenuList,
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

// Claude Skills — custom screenshot demo (Lead with AI).
// Built with the LWAI demo kit (src/kit), in the style of AdvancedModelsChatGPT: every cue is in SECONDS of the VO
// (audio/claude-skills.mp3, Daan on ElevenLabs v4, 315.35s of speech), taken from the Scribe word
// timestamps in src/data/claude-skills.transcript.json. A 90-frame green title card opens the video;
// the VO and every scene start after it.
//
// Screenshots (claude-skills/images/01..14, 1920x958) play inside an animated app window with a
// camera (pan/zoom), a cursor with click ripples, spotlight rings and a step caption.
//
//  #  scene                               start  VO cue
//  1  Teach Claude your way of working    0.00   "Claude Skills lets you teach Claude…"
//  2  Anatomy of a skill                  13.24  "A skill is more than a saved prompt…"
//  3  Two ways to use a skill             39.04  "There are two ways to use a skill."
//  4  Before you begin                    58.72  "Before you begin, make sure code execution…"
//  5  Customize > Skills > Add            71.68  "To create a skill, go to Customize…"
//  6  Three ways to create                77.16  "Here, you'll see options to upload…"
//  7  Record a skill                      84.16  "There's also another option…"
//  8  Meet Larry                          104.72 "Now, let's create a skill called Larry…"
//  9  Create with Claude prompt           110.47 "I'll choose Create with Claude."
//  10 The CODO template                   118.07 "I'll adapt that prompt using my CODO template…"
//  11 Five output sections                151.27 "For Output, I want five sections…"
//  12 Supporting files                    162.63 "I can also attach supporting files…"
//  13 Clarifying questions                174.71 "Once I send the request…"
//  14 Skill preview                       183.03 "After I answer, Claude generates the skill…"
//  15 Review + Save skill                 188.31 "I'll review those instructions carefully…"
//  16 Enabled                             193.75 "Then I'll confirm that Larry is enabled."
//  17 /larry test                         196.63 "Now, let's test it in a fresh chat."
//  18 Check the output                    205.39 "I'll check whether the update follows…"
//  19 Keep what the notes say             219.15 "For example, if the notes say Engineering…"
//  20 Refine + Update larry               231.91 "If something is wrong…"
//  21 Automatic invocation                238.47 "To test automatic invocation…"
//  22 Pick it yourself                    250.39 "If several skills have similar descriptions…"
//  23 Where skills work                   257.83 "A few practical details…"
//  24 Writing your own skill              281.43 "When creating skill files yourself…"
//  25 Closing                             307.83 "The goal is to capture a workflow…"

export const CLAUDE_SKILLS_DURATION_S = 316.95;
export const CLAUDE_SKILLS_TITLE_FRAMES = 90;

const STARTS = [
  0, 13.24, 39.04, 58.72, 71.68, 77.16, 84.16, 104.72, 110.47, 118.07, 151.27, 162.63, 174.71, 183.03, 188.31,
  193.75, 196.63, 205.39, 219.15, 231.91, 238.47, 250.39, 257.83, 281.43, 307.83,
];
const CROSSFADE = 0.5;

const Scene = makeScene(STARTS, CROSSFADE);
const IMG_W = 1920;
const IMG_H = 958;

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.CLAUDE_SKILLS_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { CLAUDE_SKILLS_SHOTS?: Record<string, string> }).CLAUDE_SKILLS_SHOTS?.[n] ??
  staticFile(`claude-skills/images/${n}.png`);

// Screenshots here are 1920x958, so every AppWindow passes imgH={958}.

// ── Body ────────────────────────────────────────────────────────────────────
const ClaudeSkillsBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/claude-skills.mp3')} />}

      {/* 1 — Teach Claude your way of working */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Claude Skills</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Teach Claude <span className="kit-mark" style={markStyle(t, 2.0)}>your way of working.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 90 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              ['Expertise', 4.76],
              ['Procedures', 5.64],
              ['Best practices', 6.64],
            ].map(([label, at], i) => {
              const merge = prog(t, 8.1, 0.9, IN_OUT);
              return (
                <div key={label as string} style={{ ...enter(t, at as number, { x: -40, y: 0, easing: BACK }) }}>
                  <div className="kit-pill" style={{ transform: `translate(${merge * 120}px, ${merge * (1 - i) * 40}px) scale(${1 - merge * 0.25})`, opacity: 1 - merge * 0.75 }}>
                    {label as string}
                  </div>
                </div>
              );
            })}
          </div>
          <Arrow t={t} at={7.4} w={200} />
          <div
            className="kit-card"
            style={{
              width: 520,
              padding: '34px 38px',
              display: 'flex',
              alignItems: 'center',
              gap: 26,
              borderColor: GREEN,
              background: LIME_SOFT,
              ...enter(t, 8.12, { dur: 0.6, scale: 0.7, y: 0, easing: BACK }),
            }}
          >
            <FolderIcon size={92} open />
            <div>
              <div className="kit-h3">Reusable skill</div>
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>Ready whenever you need it</div>
            </div>
          </div>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 70, ...enter(t, 11.0, { y: 14 }) }}>
          No more explaining the same workflow every time.
        </p>
      </Scene>

      {/* 2 — Anatomy of a skill */}
      <Scene t={t} index={1}>
        <div style={{ display: 'flex', gap: 70, alignItems: 'center' }}>
          <div style={{ width: 560, flex: 'none' }}>
            <div className="kit-label" style={enter(t, 13.4, { y: 14 })}>What is a skill</div>
            <div className="kit-h2" style={enter(t, 13.6, { dur: 0.8, y: 30 })}>
              More than a <span style={{ position: 'relative' }}>saved prompt.<span style={{ position: 'absolute', left: 0, top: '55%', height: 6, background: RED, width: `${prog(t, 15.2, 0.6, IN_OUT) * 100}%` }} /></span>
            </div>
            <p className="kit-body" style={{ marginTop: 36, ...enter(t, 16.24, { y: 16 }) }}>
              A <span className="kit-mark" style={markStyle(t, 16.6)}>structured folder</span> of instructions, plus optional resources.
            </p>
          </div>
          {/* file tree */}
          <div className="kit-card kit-ui" style={{ width: 430, flex: 'none', padding: '26px 26px', ...enter(t, 16.4, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 600 }}>
              <FolderIcon size={34} open /> your-skill/
            </div>
            <div style={{ marginLeft: 24, borderLeft: `2px solid ${LINE}`, paddingLeft: 18, marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 24,
                  padding: '8px 10px',
                  borderRadius: 10,
                  background: t >= 23.9 ? LIME_SOFT : 'transparent',
                  fontWeight: 600,
                  ...enter(t, 21.36, { x: -16, y: 0 }),
                }}
              >
                <FileIcon size={28} accent /> SKILL.md <span className="kit-tag" style={{ marginLeft: 'auto', fontSize: 14, ...enter(t, 23.92, { y: 0, scale: 0.6, easing: BACK }) }}>Required</span>
              </div>
              <div style={{ fontSize: 16, letterSpacing: '.1em', color: MUTED, fontWeight: 600, margin: '10px 0 0 10px', ...enter(t, 31.84, { y: 0 }) }}>OPTIONAL</div>
              {[
                ['examples/', 32.8, true],
                ['templates/', 34.08, true],
                ['style-guide.md', 34.72, false],
                ['reference/', 35.8, true],
                ['data.csv', 36.92, false],
                ['scripts/', 37.84, true],
              ].map(([name, at, dir]) => (
                <div key={name as string} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, padding: '3px 10px', color: '#333', ...enter(t, at as number, { x: -16, y: 0, dur: 0.5 }) }}>
                  {dir ? <FolderIcon size={24} /> : <FileIcon size={24} />} {name as string}
                </div>
              ))}
            </div>
          </div>
          {/* SKILL.md contents */}
          <div className="kit-card" style={{ flex: 1, padding: '30px 34px', background: '#FBFBF8', ...enter(t, 23.92, { x: 30, y: 0 }) }}>
            <div className="kit-ui" style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 18 }}>SKILL.md</div>
            <div className="kit-mono" style={{ fontSize: 23, lineHeight: 1.65, color: '#2B2B2B' }}>
              <div style={{ color: '#9A9A9A' }}>---</div>
              <div style={{ ...enter(t, 26.0, { y: 0, x: -10, dur: 0.5 }), background: t >= 26.96 && t < 27.68 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
                <span style={{ color: GREEN }}>name:</span> your-skill
              </div>
              <div style={{ ...enter(t, 27.68, { y: 0, x: -10, dur: 0.5 }), background: t >= 27.68 && t < 29.6 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
                <span style={{ color: GREEN }}>description:</span> What it does and when to use it
              </div>
              <div style={{ color: '#9A9A9A' }}>---</div>
              <div style={{ marginTop: 14, ...enter(t, 29.76, { y: 0, x: -10, dur: 0.5 }) }}>
                <div style={{ fontWeight: 700 }}># Instructions</div>
                {['1. Read the notes and find the decisions', '2. Draft in the agreed format', '3. Flag anything missing'].map((l, i) => (
                  <div key={l} style={{ ...enter(t, 30.3 + i * 0.35, { y: 0, x: -10, dur: 0.4 }) }}>{l}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Two ways to use a skill */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 39.2, { y: 14 })}>Using a skill</div>
        <div className="kit-h2" style={enter(t, 39.3, { dur: 0.8, y: 30 })}>Two ways to use a skill.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 44, marginTop: 64 }}>
          {/* Manual header spans 2 */}
          <div style={{ gridColumn: '1 / span 2', display: 'flex', alignItems: 'center', gap: 16, ...enter(t, 41.28, { y: 10 }) }}>
            <span className="kit-tag">1 · Manual</span>
            <div style={{ flex: 1, height: 2, background: LINE }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, ...enter(t, 52.0, { y: 10 }) }}>
            <span className="kit-tag">2 · Automatic</span>
            <div style={{ flex: 1, height: 2, background: LINE }} />
          </div>

          {/* Type / */}
          <div style={{ ...enter(t, 41.6, { y: 24 }) }}>
            <div className="kit-h3" style={{ marginBottom: 22 }}>Type /</div>
            <div style={{ position: 'relative' }}>
              <Composer text={typed(t, 42.6, '/your-skill', 1.2)} caret />
              <MenuList
                items={['your-skill', 'daily-brief', 'meeting-recap']}
                active={t >= 43.6 ? 0 : -1}
                icon
                style={{ position: 'absolute', left: 30, top: 150, width: 330, ...enter(t, 42.8, { y: -10, dur: 0.4 }) }}
              />
            </div>
          </div>

          {/* Plus button */}
          <div style={{ ...enter(t, 45.9, { y: 24 }) }}>
            <div className="kit-h3" style={{ marginBottom: 22 }}>Plus button</div>
            <div style={{ position: 'relative' }}>
              <Composer text="" plusOn={prog(t, 46.72, 0.2)} />
              <MenuList
                items={['Upload a file', 'Skills  ›', 'Connectors  ›']}
                active={t >= 49.12 ? 1 : -1}
                style={{ position: 'absolute', left: 10, top: 150, width: 250, ...enter(t, 47.2, { y: -10, dur: 0.4 }) }}
              />
              <MenuList
                items={['your-skill', 'daily-brief']}
                active={t >= 50.32 ? 0 : -1}
                icon
                style={{ position: 'absolute', left: 250, top: 196, width: 240, ...enter(t, 49.4, { x: -10, y: 0, dur: 0.4 }) }}
              />
            </div>
          </div>

          {/* Automatic */}
          <div style={{ ...enter(t, 52.3, { y: 24 }) }}>
            <div className="kit-h3" style={{ marginBottom: 22 }}>Automatic</div>
            <div className="kit-card kit-ui" style={{ padding: '18px 22px', background: '#F4F4EF', borderColor: '#F4F4EF', fontSize: 25, marginLeft: 60, ...enter(t, 53.0, { y: 14 }) }}>
              Draft this week’s update from my notes
            </div>
            <div className="kit-card kit-ui" style={{ marginTop: 22, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, fontSize: 23, ...enter(t, 55.6, { y: 14, easing: BACK }) }}>
              <Check size={30} />
              <span>
                <span style={{ color: MUTED }}>Loaded skill</span> <b>your-skill</b>
              </span>
            </div>
            <p className="kit-ui" style={{ fontSize: 23, color: MUTED, marginTop: 22, ...enter(t, 56.6, { y: 10 }) }}>
              Matched from the skill’s <span className="kit-mark" style={markStyle(t, 57.0)}>description</span>.
            </p>
          </div>
        </div>
      </Scene>

      {/* 4 — Before you begin */}
      <Scene t={t} index={3}>
        <div style={{ display: 'grid', gridTemplateColumns: '640px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 58.9, { y: 14 })}>Before you begin</div>
            <div className="kit-h2" style={enter(t, 59.0, { dur: 0.8, y: 30 })}>Check two settings.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div className="kit-card kit-ui" style={{ padding: '30px 34px', ...enter(t, 59.6, { y: 24 }) }}>
              <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>SETTINGS · CAPABILITIES</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 18 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 32, fontWeight: 600 }}>Code execution and file creation</div>
                  <div style={{ fontSize: 24, color: MUTED, marginTop: 8, ...enter(t, 63.6, { y: 8 }) }}>
                    In some layouts: <span className="kit-mark" style={{ ...markStyle(t, 65.76), color: INK, fontWeight: 600 }}>Create and edit files</span>
                  </div>
                </div>
                <Toggle on={prog(t, 61.4, 0.35, IN_OUT)} w={92} />
              </div>
            </div>
            <div className="kit-card kit-ui" style={{ padding: '26px 34px', display: 'flex', alignItems: 'center', gap: 22, ...enter(t, 67.92, { y: 24 }) }}>
              <svg width="54" height="54" viewBox="0 0 24 24" style={{ flex: 'none' }}>
                <rect x="4" y="3" width="11" height="18" rx="1.5" fill="#F1F1EC" stroke="#9A9A92" strokeWidth="1.3" />
                <rect x="15" y="9" width="5" height="12" rx="1" fill="#F1F1EC" stroke="#9A9A92" strokeWidth="1.3" />
                {[6.5, 10, 13.5].map((y) => (
                  <g key={y}>
                    <rect x="6.5" y={y} width="2" height="2" fill="#9A9A92" />
                    <rect x="10.5" y={y} width="2" height="2" fill="#9A9A92" />
                  </g>
                ))}
              </svg>
              <div style={{ fontSize: 30 }}>
                Your <b>organization</b> may also control access to Skills.
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 5 — Customize > Skills > Add */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={71.68}
          src={shot('01-customize-skills')}
          cursor={[
            { at: 71.9, x: 700, y: 520 },
            { at: 72.5, x: 80, y: 268, click: true, dur: 0.7 },
            { at: 73.6, x: 645, y: 100, click: true, dur: 0.6 },
            { at: 74.9, x: 1532, y: 100, click: true, dur: 0.8 },
          ]}
          cam={[{ at: 75.0, x: 1350, y: 260, s: 1.7, dur: 0.9 }]}
          rings={[
            { at: 73.1, until: 74.1, x: 10, y: 256, w: 252, h: 26 },
            { at: 74.2, until: 75.2, x: 615, y: 88, w: 62, h: 26 },
            { at: 75.7, x: 1496, y: 88, w: 76, h: 26 },
          ]}
          steps={[
            { at: 72.6, text: 'Customize' },
            { at: 74.24, text: 'Skills' },
            { at: 75.72, text: '+ Add' },
          ]}
        />
      </Scene>

      {/* 6 — Three ways to create */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={77.16}
          src={shot('02-add-skill-options')}
          cam={[{ at: 77.16, x: 1350, y: 260, s: 1.7, dur: 0.01 }, { at: 77.5, x: 1470, y: 180, s: 2.6, dur: 1.0 }]}
          rings={[
            { at: 78.48, until: 79.5, x: 1392, y: 132, w: 184, h: 22 },
            { at: 79.6, until: 82.5, x: 1392, y: 160, w: 184, h: 22 },
            { at: 82.64, x: 1392, y: 188, w: 184, h: 22, spot: true },
          ]}
          steps={[
            { at: 78.48, text: 'Upload a skill' },
            { at: 79.6, text: 'Create one directly' },
            { at: 82.64, text: 'Create with Claude' },
          ]}
        />
      </Scene>

      {/* 7 — Record a skill */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 84.3, { y: 14 })}>Record a skill</div>
        <div className="kit-h2" style={enter(t, 84.4, { dur: 0.8, y: 30 })}>
          Easier to <span className="kit-mark" style={markStyle(t, 87.3)}>show</span> than describe?
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 46, marginTop: 64 }}>
          {/* recording screen: a real Claude screen being recorded */}
          <div className="kit-card" style={{ width: 640, height: 380, position: 'relative', overflow: 'hidden', background: '#FBFBF8', ...enter(t, 89.2, { y: 24 }) }}>
            <Img
              src={shot('01-customize-skills')}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 640 * 1.25,
                height: (640 * 1.25 * IMG_H) / IMG_W,
                transformOrigin: '0 0',
                transform: `translate(${-prog(t, 90, 12, IN_OUT) * 140}px, ${-prog(t, 90, 12, IN_OUT) * 20}px)`,
              }}
            />
            {(() => {
              const path = [
                [120, 90],
                [450, 120],
                [160, 260],
                [470, 240],
                [140, 110],
              ];
              const seg = ((t - 89.5) / 2.0) % path.length;
              const i = Math.max(0, Math.floor(seg));
              const f = Math.max(0, seg - i);
              const a = path[i % path.length];
              const b = path[(i + 1) % path.length];
              const e = IN_OUT(Math.min(1, f * 1.4));
              return (
                <svg width="34" height="34" viewBox="0 0 24 24" style={{ position: 'absolute', left: a[0] + (b[0] - a[0]) * e, top: a[1] + (b[1] - a[1]) * e }}>
                  <path d="M3 2l15.5 9.2-6.6 1.4 3.8 7.3-2.9 1.5-3.8-7.3-4.9 4.6z" fill="#111" stroke="#fff" strokeWidth="1.4" />
                </svg>
              );
            })()}
            <div className="kit-ui" style={{ position: 'absolute', right: 18, top: 16, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `2px solid ${LINE}`, borderRadius: 999, padding: '6px 14px', fontSize: 18, fontWeight: 700, ...enter(t, 89.44, { y: 0, scale: 0.6, easing: BACK }) }}>
              <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#E5484D', opacity: 0.55 + 0.45 * Math.abs(Math.sin(t * 3)) }} /> REC
            </div>
            <div className="kit-ui" style={{ position: 'absolute', left: 18, bottom: 16, background: INK, color: '#fff', borderRadius: 999, padding: '6px 16px', fontSize: 18, fontWeight: 600, ...enter(t, 90.8, { y: 10 }) }}>
              Cowork · Claude desktop app
            </div>
          </div>
          <div style={{ ...enter(t, 93.4, { y: 0 }) }}>
            <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginBottom: 10, textAlign: 'center' }}>Do it and explain why</div>
            <Arrow t={t} at={97.6} w={170} />
          </div>
          <div className="kit-card kit-ui" style={{ width: 520, padding: '30px 34px', borderColor: GREEN, ...enter(t, 99.56, { scale: 0.85, y: 0, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Spark size={34} />
              <div style={{ fontSize: 30, fontWeight: 600 }}>Proposed skill</div>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 12, borderRadius: 6, background: '#ECECE6', marginTop: 20, width: `${90 - i * 18}%` }} />
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
              <span className="kit-tag" style={enter(t, 102.16, { y: 0, scale: 0.6, easing: BACK })}>Review</span>
              <span className="kit-tag" style={enter(t, 102.5, { y: 0, scale: 0.6, easing: BACK })}>Refine</span>
              <span className="kit-tag" style={{ background: INK, color: '#fff', ...enter(t, 103.4, { y: 0, scale: 0.6, easing: BACK }) }}>Save</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 8 — Meet Larry */}
      <Scene t={t} index={7}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: LIME_SOFT,
              border: `6px solid ${LIME}`,
              display: 'grid',
              placeItems: 'center',
              flex: 'none',
              ...enter(t, 105.2, { scale: 0.5, y: 0, dur: 0.8, easing: BACK }),
            }}
          >
            <span className="kit-h1" style={{ fontSize: 170, color: GREEN }}>L</span>
          </div>
          <div>
            <div className="kit-label" style={enter(t, 104.9, { y: 14 })}>Let’s build one</div>
            <div className="kit-h1" style={{ fontSize: 150, ...enter(t, 105.6, { dur: 0.9, y: 34 }) }}>
              Meet <span className="kit-mark" style={markStyle(t, 106.64)}>Larry.</span>
            </div>
            <p className="kit-body" style={{ marginTop: 26, fontSize: 40, ...enter(t, 108.16, { y: 16 }) }}>
              He writes your weekly leadership updates.
            </p>
          </div>
        </div>
      </Scene>

      {/* 9 — Create with Claude prompt */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={110.47}
          src={shot('03-create-with-claude-prompt')}
          cursor={[
            { at: 111.0, x: 1500, y: 700 },
            { at: 112.0, x: 1180, y: 470 },
          ]}
          cam={[{ at: 112.3, x: 1100, y: 480, s: 2.0, dur: 1.2 }]}
          rings={[{ at: 115.03, x: 778, y: 446, w: 650, h: 50, spot: true }]}
          steps={[
            { at: 111.27, text: 'Create with Claude' },
            { at: 115.03, text: 'A suggested prompt is ready to edit' },
          ]}
        />
      </Scene>

      {/* 10 — CODO template */}
      <Scene t={t} index={9}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <div className="kit-label" style={enter(t, 118.2, { y: 14 })}>Brief Larry</div>
            <div className="kit-h2" style={enter(t, 118.3, { dur: 0.8, y: 30 })}>The CODO template.</div>
          </div>
        </div>
        {(() => {
          const L = [
            { l: 'C', w: 'Character', at: 121.11, on: 125.27 },
            { l: 'O', w: 'Objective', at: 121.99, on: 130.79 },
            { l: 'D', w: 'Do’s and Don’ts', at: 123.03, on: 139.27 },
            { l: 'O', w: 'Output', at: 124.23, on: 151.27 },
          ];
          const active = [...L].reverse().findIndex((x) => t >= x.on);
          const ai = active === -1 ? -1 : L.length - 1 - active;
          return (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 26, marginTop: 50 }}>
                {L.map((x, i) => {
                  const on = i === ai;
                  return (
                    <div
                      key={i}
                      className="kit-card"
                      style={{
                        padding: '22px 28px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 22,
                        background: on ? LIME_SOFT : '#fff',
                        borderColor: on ? GREEN : LINE,
                        ...enter(t, x.at, { y: 30, dur: 0.6, easing: BACK }),
                      }}
                    >
                      <span className="kit-h1" style={{ fontSize: 96, lineHeight: 1, color: on ? GREEN : INK }}>{x.l}</span>
                      <span className="kit-ui" style={{ fontSize: 28, fontWeight: 600 }}>{x.w}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ position: 'relative', height: 330, marginTop: 40 }}>
                {/* Character */}
                {ai === 0 && (
                  <div style={{ position: 'absolute', inset: 0, ...enter(t, 125.27, { y: 20 }) }}>
                    <div className="kit-h3" style={{ fontSize: 50 }}>
                      A leadership update writer, communicating with the{' '}
                      <span className="kit-mark" style={markStyle(t, 129.51)}>executive team</span>.
                    </div>
                  </div>
                )}
                {ai === 1 && (
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 30, ...enter(t, 130.79, { y: 20 }) }}>
                    <div className="kit-card" style={{ width: 300, height: 330, padding: 26, position: 'relative', boxShadow: '0 16px 40px rgba(0,0,0,.08)', ...enter(t, 133.99, { y: 20, easing: BACK }) }}>
                      <div className="kit-ui" style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.1em', color: MUTED }}>1 PAGE</div>
                      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} style={{ height: 11, borderRadius: 6, background: i % 3 === 0 ? '#D9D9D2' : '#ECECE6', marginTop: 22, width: `${92 - (i % 3) * 14}%` }} />
                      ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22 }}>
                      <div className="kit-h3" style={{ fontSize: 50, ...enter(t, 132.6, { y: 14 }) }}>A concise, one-page weekly update</div>
                      <div className="kit-body kit-muted" style={enter(t, 135.0, { y: 14 })}>
                        that helps leaders stay informed and make <span className="kit-mark" style={{ ...markStyle(t, 137.59), color: INK }}>strategic decisions</span>.
                      </div>
                    </div>
                  </div>
                )}
                {ai === 2 && (
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, ...enter(t, 139.27, { y: 20 }) }}>
                    <div>
                      <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.1em', color: GREEN, marginBottom: 18 }}>HIGHLIGHT</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                        {[
                          ['Major developments', 141.83],
                          ['Decisions', 143.4],
                          ['Approvals', 144.0],
                          ['Deadlines', 144.83],
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
                          ['Explain trade-offs', 146.71, false],
                          ['Use plain language', 147.91, false],
                          ['Never invent information', 149.27, true],
                        ].map(([w, at, bad]) => (
                          <span key={w as string} className="kit-pill" style={{ fontSize: 28, borderColor: bad ? RED : LINE, ...enter(t, at as number, { y: 14, easing: BACK }) }}>
                            {bad ? <Cross size={28} /> : <Check size={28} />} {w as string}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {ai === 3 && (
                  <div style={{ position: 'absolute', inset: 0, ...enter(t, 151.27, { y: 20 }) }}>
                    <div className="kit-h3" style={{ fontSize: 50 }}>Five fixed sections…</div>
                  </div>
                )}
              </div>
            </>
          );
        })()}
      </Scene>

      {/* 11 — Five output sections */}
      <Scene t={t} index={10}>
        <div style={{ display: 'grid', gridTemplateColumns: '620px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 151.4, { y: 14 })}>Output</div>
            <div className="kit-h2" style={enter(t, 151.5, { dur: 0.8, y: 30 })}>
              Five sections, <span className="kit-mark" style={markStyle(t, 152.8)}>every week.</span>
            </div>
          </div>
          <div className="kit-card" style={{ padding: '40px 50px', boxShadow: '0 30px 70px rgba(0,0,0,.08)', ...enter(t, 151.8, { y: 40 }) }}>
            <div className="kit-h3" style={{ fontSize: 36, marginBottom: 14 }}>Weekly Leadership Update</div>
            {[
              ['Executive Summary', 154.11],
              ['Key Developments', 155.35],
              ['Decisions and Action Items', 156.63],
              ['Trade-Offs or Conflicts', 158.55],
              ['Closing or Next Steps', 160.55],
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

      {/* 12 — Supporting files */}
      <Scene t={t} index={11}>
        <div className="kit-label" style={enter(t, 162.8, { y: 14 })}>Optional context</div>
        <div className="kit-h2" style={enter(t, 162.9, { dur: 0.8, y: 30 })}>Attach supporting files.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 70 }}>
          <div style={{ display: 'flex', gap: 30 }}>
            {[
              ['Previous update', 'DOCX', 165.27],
              ['Roadmap', 'PDF', 166.55],
              ['KPI references', 'XLSX', 167.51],
            ].map(([name, ext, at], i) => {
              const fly = prog(t, 170.0 + i * 0.15, 0.9, IN_OUT);
              return (
                <div
                  key={name as string}
                  className="kit-card kit-ui"
                  style={{
                    width: 250,
                    height: 300,
                    padding: 26,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    ...enter(t, at as number, { y: -60, dur: 0.6, easing: BACK }),
                    transform: `${enter(t, at as number, { y: -60, dur: 0.6, easing: BACK }).transform} translate(${fly * (520 - i * 280)}px, 0) scale(${1 - fly * 0.55})`,
                    opacity: prog(t, at as number, 0.4) * (1 - fly),
                  }}
                >
                  <FileIcon size={64} accent={i === 0} />
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 600 }}>{name as string}</div>
                    <div style={{ fontSize: 18, letterSpacing: '.1em', color: MUTED, fontWeight: 700, marginTop: 6 }}>{ext as string}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '30px 34px', borderColor: prog(t, 170.8, 0.3) > 0.5 ? GREEN : LINE, ...enter(t, 168.8, { x: 40, y: 0 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, fontWeight: 600 }}>
              <Spark size={30} /> Larry’s context
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              {['Previous update', 'Roadmap', 'KPI references'].map((n, i) => (
                <span key={n} className="kit-tag" style={{ textTransform: 'none', letterSpacing: 0, fontSize: 20, ...enter(t, 170.9 + i * 0.15, { y: 0, scale: 0.6, easing: BACK }) }}>
                  {n}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 26, color: MUTED, margin: '22px 0 0', ...enter(t, 171.6, { y: 10 }) }}>
              Examples and context, <span className="kit-mark" style={{ ...markStyle(t, 172.71), color: INK }}>without repeating yourself</span>.
            </p>
          </div>
        </div>
      </Scene>

      {/* 13 — Clarifying questions */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={174.71}
          src={shot('04-clarifying-questions')}
          cam={[{ at: 175.4, x: 1100, y: 690, s: 1.7, dur: 1.2 }]}
          rings={[{ at: 177.07, x: 716, y: 572, w: 764, h: 290, spot: true }]}
          steps={[{ at: 177.07, text: 'Claude asks clarifying questions' }]}
        />
      </Scene>

      {/* 14 — Skill preview */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={183.03}
          src={shot('05-generated-skill-preview')}
          cam={[{ at: 184.75, x: 1500, y: 330, s: 1.6, dur: 1.2 }]}
          rings={[{ at: 186.39, x: 1160, y: 240, w: 560, h: 46 }]}
          steps={[{ at: 184.75, text: 'Claude generates SKILL.md and opens a preview' }]}
        />
      </Scene>

      {/* 15 — Review + Save skill */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={188.31}
          src={shot('06-skill-output-instructions')}
          cam={[
            { at: 188.31, x: 1500, y: 330, s: 1.6, dur: 0.01 },
            { at: 189.0, x: 1500, y: 420, s: 1.6, dur: 1.6 },
            { at: 191.2, x: 1650, y: 160, s: 2.1, dur: 1.0 },
          ]}
          cursor={[
            { at: 189.4, x: 1400, y: 500 },
            { at: 191.6, x: 1808, y: 22, click: true, dur: 0.9 },
          ]}
          rings={[{ at: 192.55, x: 1770, y: 10, w: 80, h: 22 }]}
          steps={[
            { at: 188.6, text: 'Review the instructions' },
            { at: 192.55, text: 'Save skill' },
          ]}
        />
      </Scene>

      {/* 16 — Enabled */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={193.75}
          src={shot('07-saved-and-enabled')}
          cam={[{ at: 193.75, x: 960, y: 260, s: 1.55, dur: 0.01 }]}
          rings={[{ at: 195.4, x: 1400, y: 186, w: 48, h: 28, spot: true }]}
          steps={[{ at: 195.79, text: 'Larry is saved and enabled' }]}
        />
      </Scene>

      {/* 17 — /larry test */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={196.63}
          src={shot('08-slash-larry-invocation')}
          cam={[{ at: 197.4, x: 1000, y: 470, s: 2.0, dur: 1.2 }]}
          cursor={[
            { at: 199.0, x: 1200, y: 640 },
            { at: 199.9, x: 900, y: 420, dur: 0.7 },
          ]}
          rings={[
            { at: 199.91, until: 203.3, x: 700, y: 404, w: 250, h: 30 },
            { at: 203.51, x: 776, y: 440, w: 650, h: 86 },
          ]}
          steps={[
            { at: 196.9, text: 'Fresh chat' },
            { at: 199.91, text: 'Type /larry and select the skill' },
            { at: 203.51, text: 'Add a sample set of weekly notes' },
          ]}
        />
      </Scene>

      {/* 18 — Check the output */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={205.39}
          src={shot('11-test-output-and-open-items')}
          left={70}
          top={150}
          width={1060}
          cam={[
            { at: 205.39, x: 1100, y: 300, s: 1.35, dur: 0.01 },
            { at: 211.6, x: 1070, y: 140, s: 1.7, dur: 1.0 },
            { at: 215.8, x: 1070, y: 560, s: 1.7, dur: 1.0 },
          ]}
          rings={[
            { at: 212.95, until: 215.8, x: 740, y: 40, w: 680, h: 190 },
            { at: 216.6, x: 755, y: 584, w: 700, h: 30 },
          ]}
        />
        <div style={{ position: 'absolute', left: 1200, top: 150, width: 640 }}>
          <div className="kit-label" style={enter(t, 205.6, { y: 14 })}>Check the output</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 10 }}>
            {[
              ['Follows the five sections', 207.31],
              ['Stays concise', 208.39],
              ['Preserves the facts', 209.67],
              ['Right decisions, owners and deadlines', 212.07],
              ['Marks missing information as TBD', 216.23],
            ].map(([w, at]) => (
              <div key={w as string} className="kit-card kit-ui" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, ...enter(t, at as number, { x: 30, y: 0, easing: BACK }) }}>
                <Check size={34} /> {w as string}
              </div>
            ))}
          </div>
          <p className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 26, ...enter(t, 217.87, { y: 10 }) }}>
            <span className="kit-mark" style={{ ...markStyle(t, 218.2), color: INK }}>Rather than guessing.</span>
          </p>
        </div>
      </Scene>

      {/* 19 — Keep what the notes say */}
      <Scene t={t} index={18}>
        <div className="kit-label" style={enter(t, 219.3, { y: 14 })}>Check the facts</div>
        <div className="kit-card kit-ui" style={{ padding: '30px 38px', background: '#FBF7E8', borderColor: '#EFE4BC', maxWidth: 1400, ...enter(t, 219.6, { y: 24 }) }}>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.1em', color: '#8A7A3A' }}>YOUR NOTES</div>
          <div className="kit-h3" style={{ fontSize: 44, marginTop: 10 }}>
            Engineering <span className="kit-mark" style={markStyle(t, 221.11)}>recommends</span> a later launch date to finish testing.
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, marginTop: 44 }}>
          <div className="kit-card kit-ui" style={{ padding: '30px 34px', borderColor: GREEN, ...enter(t, 225.43, { y: 30, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 20, fontWeight: 700, letterSpacing: '.1em', color: GREEN }}>
              <Check size={34} /> THE UPDATE KEEPS
            </div>
            <div style={{ fontSize: 32, marginTop: 16, lineHeight: 1.4 }}>“Engineering recommends 23 November to allow time for testing.”</div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '30px 34px', borderColor: RED, ...enter(t, 228.0, { y: 30, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 20, fontWeight: 700, letterSpacing: '.1em', color: RED }}>
              <Cross size={34} /> NEVER BECOMES
            </div>
            <div style={{ fontSize: 32, marginTop: 16, lineHeight: 1.4, position: 'relative' }}>
              <span style={{ position: 'relative' }}>
                “Testing is complete.”
                <span style={{ position: 'absolute', left: 0, top: '52%', height: 4, background: RED, width: `${prog(t, 229.2, 0.5) * 100}%` }} />
              </span>{' '}
              <span style={{ position: 'relative', ...enter(t, 230.15, { y: 0 }) }}>
                “Guaranteed to finish.”
                <span style={{ position: 'absolute', left: 0, top: '52%', height: 4, background: RED, width: `${prog(t, 230.7, 0.5) * 100}%` }} />
              </span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 20 — Refine + Update larry */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={231.91}
          src={shot('12-refine-skill-instructions')}
          cam={[
            { at: 232.4, x: 760, y: 200, s: 1.75, dur: 1.0 },
            { at: 235.4, x: 1660, y: 180, s: 2.0, dur: 1.0 },
          ]}
          cursor={[
            { at: 235.6, x: 1500, y: 300 },
            { at: 236.4, x: 1796, y: 22, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 234.07, until: 235.5, x: 430, y: 76, w: 644, h: 190 },
            { at: 237.1, x: 1752, y: 10, w: 90, h: 24 },
          ]}
          steps={[
            { at: 234.07, text: 'Ask Claude to refine the instructions' },
            { at: 236.9, text: 'Update larry, then test again' },
          ]}
        />
      </Scene>

      {/* 21 — Automatic invocation */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={238.47}
          src={shot('10-automatic-larry-loading')}
          cam={[
            { at: 239.3, x: 1160, y: 190, s: 1.75, dur: 1.2 },
            { at: 246.6, x: 1100, y: 420, s: 2.1, dur: 1.0 },
          ]}
          rings={[
            { at: 242.95, until: 246.6, x: 844, y: 84, w: 624, h: 196 },
            { at: 247.6, x: 734, y: 404, w: 400, h: 30, spot: true },
          ]}
          steps={[
            { at: 241.03, text: 'Fresh chat, no /larry' },
            { at: 247.11, text: 'Activity confirms: Loaded skill larry' },
          ]}
        />
      </Scene>

      {/* 22 — Pick it yourself */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={250.39}
          src={shot('13-manual-invocation-retest')}
          left={70}
          top={150}
          width={1060}
          cam={[{ at: 250.39, x: 900, y: 200, s: 1.9, dur: 0.01 }]}
          rings={[{ at: 255.0, x: 858, y: 92, w: 62, h: 24 }]}
        />
        <div style={{ position: 'absolute', left: 1200, top: 170, width: 640 }}>
          <div className="kit-label" style={enter(t, 250.6, { y: 14 })}>Testing tip</div>
          <div className="kit-h3" style={{ fontSize: 46, ...enter(t, 250.8, { y: 20 }) }}>Similar descriptions can compete.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
            {[
              ['leadership-update', 251.75],
              ['larry', 252.2],
            ].map(([n, at], i) => {
              const win = i === 1 && t >= 253.03;
              return (
                <div key={n as string} className="kit-card kit-ui" style={{ padding: '18px 22px', borderColor: win ? GREEN : LINE, background: win ? LIME_SOFT : '#fff', opacity: i === 0 && t >= 253.03 ? 0.45 : 1, ...enter(t, at as number, { x: 30, y: 0 }) }}>
                  <div style={{ fontSize: 26, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <FileIcon size={26} accent={win} /> {n as string}
                  </div>
                  <div style={{ fontSize: 22, color: MUTED, marginTop: 6 }}>Writes weekly leadership updates…</div>
                </div>
              );
            })}
          </div>
          <p className="kit-ui" style={{ fontSize: 28, marginTop: 30, ...enter(t, 253.03, { y: 10 }) }}>
            Select <b className="kit-mono">/larry</b> to be <span className="kit-mark" style={markStyle(t, 254.87)}>sure you test the right one</span>.
          </p>
        </div>
      </Scene>

      {/* 23 — Where skills work */}
      <Scene t={t} index={22}>
        <div className="kit-label" style={enter(t, 258.0, { y: 14 })}>Good to know</div>
        <div className="kit-h2" style={enter(t, 258.1, { dur: 0.8, y: 30 })}>Where skills work.</div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 80, gap: 0 }}>
          {(() => {
            const box = (name: string, at: number, extra?: React.ReactNode, dashed?: boolean) => (
              <div className="kit-card kit-ui" style={{ width: 400, height: 220, padding: '30px 34px', borderStyle: dashed ? 'dashed' : 'solid', borderColor: dashed ? '#B9B9B0' : LINE, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...enter(t, at, { y: 30, easing: BACK }) }}>
                <div className="kit-h3">{name}</div>
                {extra}
              </div>
            );
            return (
              <>
                {box(
                  'Claude.ai',
                  262.23,
                  <span className="kit-tag" style={enter(t, 269.51, { y: 0, scale: 0.6, easing: BACK })}>Enabled skills</span>,
                )}
                <div style={{ width: 260, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Arrow t={t} at={269.6} w={220} label="Sync" />
                  <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 6, textAlign: 'center', ...enter(t, 274.63, { y: 8 }) }}>Same Claude account</div>
                  <span className="kit-tag" style={{ marginTop: 12, background: INK, color: '#fff', ...enter(t, 277.59, { y: 0, scale: 0.5, easing: BACK }) }}>One-way</span>
                </div>
                {box('Claude Code', 263.59, <span className="kit-ui" style={{ fontSize: 22, color: MUTED, ...enter(t, 272.0, { y: 8 }) }}>Supported version</span>)}
                <div style={{ width: 90 }} />
                {box(
                  'API',
                  264.87,
                  <span className="kit-ui" style={{ fontSize: 24, fontWeight: 600, ...enter(t, 278.55, { y: 8 }) }}>Managed separately</span>,
                  t >= 278.55,
                )}
              </>
            );
          })()}
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 50, ...enter(t, 266.15, { y: 12 }) }}>
          Setup and available tools differ by surface.
        </p>
      </Scene>

      {/* 24 — Writing your own skill */}
      <Scene t={t} index={23}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 760px', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 281.6, { y: 14 })}>Best practices</div>
            <div className="kit-h2" style={enter(t, 281.7, { dur: 0.8, y: 30 })}>Writing your own skill.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44 }}>
              {[
                ['Name the file exactly SKILL.md', 285.03],
                ['Lowercase names, hyphens between words', 288.39],
                ['A description that says what and when', 292.71],
                ['Focused instructions; long material in separate files', 299.03],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, ...enter(t, at as number, { x: -24, y: 0 }) }}>
                  <Check size={34} /> {w as string}
                </div>
              ))}
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '30px 34px', background: '#FBFBF8', ...enter(t, 282.4, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 600 }}>
              <FolderIcon size={36} open />
              <span className="kit-mono" style={{ fontSize: 26 }}>
                {t < 288.39 ? 'my skill/' : typed(t, 288.39, 'weekly-leadership-update/', 2.4)}
              </span>
            </div>
            <div style={{ marginLeft: 22, borderLeft: `2px solid ${LINE}`, paddingLeft: 20, marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 600, padding: '6px 10px', borderRadius: 10, background: t >= 285.03 && t < 288.3 ? LIME_SOFT : 'transparent' }}>
                <FileIcon size={30} accent /> <span className="kit-mono">SKILL.md</span>
              </div>
              <div className="kit-mono" style={{ fontSize: 21, lineHeight: 1.6, color: '#333', padding: '8px 14px', background: '#fff', border: `2px solid ${LINE}`, borderRadius: 12 }}>
                <div style={{ color: '#9A9A9A' }}>---</div>
                <div>
                  <span style={{ color: GREEN }}>name:</span> {t < 288.39 ? 'my skill' : typed(t, 288.39, 'weekly-leadership-update', 2.4)}
                </div>
                <div style={{ background: t >= 294.67 && t < 299.0 ? LIME_SOFT : 'transparent', borderRadius: 6 }}>
                  <span style={{ color: GREEN }}>description:</span>{' '}
                  <span style={{ fontWeight: t >= 296.31 && t < 297.67 ? 700 : 400 }}>Drafts weekly leadership updates.</span>{' '}
                  <span style={{ fontWeight: t >= 297.67 && t < 299.0 ? 700 : 400 }}>Use when asked for a weekly update.</span>
                </div>
                <div style={{ color: '#9A9A9A' }}>---</div>
                <div style={{ opacity: 0.7 }}># Instructions…</div>
              </div>
              <div style={{ ...enter(t, 302.39, { x: -20, y: 0 }) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24 }}>
                  <FolderIcon size={28} /> <span className="kit-mono">references/</span>
                  <span className="kit-tag" style={{ marginLeft: 'auto', fontSize: 14, ...enter(t, 306.87, { y: 0, scale: 0.6, easing: BACK }) }}>Loaded when needed</span>
                </div>
                <div style={{ marginLeft: 40, marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {['style-guide.md', 'kpi-definitions.md', 'past-updates.md'].map((f, i) => (
                    <div key={f} className="kit-mono" style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, color: '#444', ...enter(t, 303.2 + i * 0.3, { x: -14, y: 0, dur: 0.4 }) }}>
                      <FileIcon size={22} /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 25 — Closing */}
      <Scene t={t} index={24} padStyle={{ opacity: 1 - prog(t, 316.1, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 308.0, { y: 14 })}>Claude Skills</div>
        <div className="kit-h1" style={enter(t, 308.2, { dur: 0.9, y: 34 })}>
          <span className="kit-mark" style={markStyle(t, 308.83)}>Capture a workflow</span> once.
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 50, ...enter(t, 311.35, { y: 18 }) }}>
          Claude applies it consistently.
        </p>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 10, ...enter(t, 312.99, { y: 18 }) }}>
          You <span className="kit-mark" style={markStyle(t, 314.15)}>keep reviewing the results.</span>
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const ClaudeSkills: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CLAUDE_SKILLS_TITLE_FRAMES}>
      <TitleCardGreen label="CLAUDE" title="Claude Skills" />
    </Sequence>
    <Sequence from={CLAUDE_SKILLS_TITLE_FRAMES}>
      <ClaudeSkillsBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
