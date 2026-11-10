import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { loadFont as loadMono } from '@remotion/google-fonts/IBMPlexMono';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  AppWindow,
  Arrow,
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
  enter,
  makeScene,
  markStyle,
  prog,
} from '../kit';

loadSerif();
loadSans();
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// ChatGPT Projects — custom screenshot demo (Lead with AI). Replaces the old screen-recording version.
// Built with the LWAI demo kit (src/kit). Every cue is in SECONDS of the VO (audio/chatgpt-projects.mp3,
// Daan on ElevenLabs v4, generated in two halves joined with 0.6s of silence at 191.09s), taken from the
// Scribe word timestamps in src/data/chatgpt-projects.transcript.json. A 90-frame green title card opens
// the video; the VO and every scene start after it.
//
// Screenshots (chatgpt-projects/images/01..14, 1920x958, verified 10 Nov 2026) play inside an animated
// app window with camera, cursor, spotlight rings and STEP captions.
//
//  #  scene                               start  VO cue
//  1  Explaining everything again         0.00   "If you've ever thought…"
//  2  One workspace                       18.00  "That's where ChatGPT Projects comes in."
//  3  Meet Larry                          33.50  "Let's build an example: Larry…"
//  4  Projects +                          39.90  "From the Home sidebar…"
//  5  Name, icon, colour  (01)            45.00  "I'll name this project…"
//  6  Memory options      (02)            56.80  "Next, I'll open the memory menu."
//  7  Create project      (03)            90.00  "Now I'll click Create project."
//  8  Project settings    (04)            93.90  "With Larry created…"
//  9  Instructions field  (05)            100.50 "The Instructions field…"
//  10 CODO                                109.60 "Character: act as Larry…"
//  11 Save                (05)            135.70 "I'll paste those instructions and click Save."
//  12 Memory selector     (13)            144.50 "Project settings also has a Memory selector…"
//  13 Add sources         (06)            151.20 "Next, I'll open the Sources tab…"
//  14 Strategy document                   165.90 "For this demo, I'll upload…"
//  15 Uploaded            (07)            183.20 "Once the upload finishes…"
//  16 The request         (08)            191.60 "Now I'll start a chat inside the project…"
//  17 This week's notes                   205.00 "The dashboard pilot is live…"
//  18 Reasoning level     (07)            237.20 "Before I send it…"
//  19 Send                (08)            247.60 "I'll send the request…"
//  20 Larry's update      (09)            250.90 "The update brings the notes together…"
//  21 Why it works + review               260.90 "That's the benefit of combining…"
//  22 Add to sources      (10)            273.70 "If a response is useful…"
//  23 Sources list        (11)            278.90 "Back in Sources…"
//  24 Two more controls                   294.30 "There are two more controls…"
//  25 Move to project     (14)            297.00 "First, moving an existing chat…"
//  26 Share               (12)            314.10 "Second, sharing a project."
//  27 Larry's workspace                   345.40 "Larry now has a dedicated workspace…"
//  28 Closing                             358.90 "Start with one recurring task."

export const CHATGPT_PROJECTS_DURATION_S = 369.5;
export const CHATGPT_PROJECTS_TITLE_FRAMES = 90;

const STARTS = [
  0, 18.0, 33.5, 39.9, 45.0, 56.8, 90.0, 93.9, 100.5, 109.6, 135.7, 144.5, 151.2, 165.9, 183.2, 191.6, 205.0,
  237.2, 247.6, 250.9, 260.9, 273.7, 278.9, 294.3, 297.0, 314.1, 345.4, 358.9,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;
const TITLE = 'chatgpt.com';

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.CHATGPT_PROJECTS_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { CHATGPT_PROJECTS_SHOTS?: Record<string, string> }).CHATGPT_PROJECTS_SHOTS?.[n] ??
  staticFile(`chatgpt-projects/images/${n}.png`);

const Win: React.FC<React.ComponentProps<typeof AppWindow>> = (p) => <AppWindow imgH={IMG_H} title={TITLE} {...p} />;

// Small doc/chat/instruction chips used by the concept scenes
const Chip: React.FC<{ kind: 'chat' | 'doc' | 'rule'; label: string; style?: React.CSSProperties }> = ({ kind, label, style }) => (
  <div className="kit-card kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px', fontSize: 26, fontWeight: 600, boxShadow: '0 10px 30px rgba(0,0,0,.06)', whiteSpace: 'nowrap', ...style }}>
    {kind === 'doc' ? (
      <FileIcon size={32} accent />
    ) : kind === 'chat' ? (
      <svg width="32" height="32" viewBox="0 0 24 24">
        <path d="M4 5.5A2.5 2.5 0 016.5 3h11A2.5 2.5 0 0120 5.5v8a2.5 2.5 0 01-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 014 13.5z" fill={LIME_SOFT} stroke={GREEN} strokeWidth="1.4" />
      </svg>
    ) : (
      <svg width="32" height="32" viewBox="0 0 24 24">
        <rect x="4" y="3" width="16" height="18" rx="2.5" fill="#fff" stroke={GREEN} strokeWidth="1.4" />
        {[8, 12, 16].map((y) => (
          <rect key={y} x="7.5" y={y - 0.8} width={y === 16 ? 6 : 9} height="1.6" rx=".8" fill={LIME} />
        ))}
      </svg>
    )}
    {label}
  </div>
);

const Body: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/chatgpt-projects.mp3')} />}

      {/* 1 — Explaining everything again */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>ChatGPT Projects</div>
        <div className="kit-h2" style={{ maxWidth: 1400, ...enter(t, 0.6, { dur: 0.9, y: 30 }) }}>
          “Why do I have to <span className="kit-mark" style={markStyle(t, 2.24)}>explain everything again?</span>”
        </div>
        <div style={{ position: 'relative', height: 420, marginTop: 50 }}>
          <div className="kit-pill" style={{ position: 'absolute', left: 0, top: 10, ...enter(t, 6.88, { y: 16 }) }}>
            <Check size={30} /> ChatGPT remembers relevant context
          </div>
          {(
            [
              ['chat', 'Weekly update chat', 13.68, 120, 170, -30, 60, -6],
              ['chat', 'Last week’s draft', 13.9, 560, 140, 20, -40, 5],
              ['doc', 'Strategy.pdf', 14.56, 980, 190, 60, 40, -4],
              ['doc', 'KPI notes.docx', 14.8, 1360, 130, 40, -30, 7],
              ['rule', 'How I like it written', 15.04, 330, 300, -60, 30, 4],
              ['rule', 'Formatting rules', 15.3, 1150, 310, 50, 50, -7],
            ] as const
          ).map(([kind, label, at, x, y, dx, dy, rot]) => {
            const sc = prog(t, 16.88, 1.0, IN_OUT);
            return (
              <div key={label} style={{ position: 'absolute', left: x + dx * sc, top: y + dy * sc, transform: `rotate(${rot * sc}deg)`, ...enter(t, at, { y: 20, scale: 0.8, easing: BACK, dur: 0.5 }), opacity: prog(t, at, 0.4) * (1 - 0.35 * sc) }}>
                <Chip kind={kind} label={label} />
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 2 — One workspace */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 18.1, { y: 14 })}>ChatGPT Projects</div>
        <div className="kit-h2" style={enter(t, 18.3, { dur: 0.8, y: 30 })}>
          Related work, in <span className="kit-mark" style={markStyle(t, 26.4)}>one workspace.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 70 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, width: 470 }}>
            <div style={enter(t, 22.4, { x: -30, y: 0 })}><Chip kind="chat" label="Conversations" /></div>
            <div style={enter(t, 23.56, { x: -30, y: 0 })}><Chip kind="doc" label="Reference materials" /></div>
            <div style={enter(t, 25.04, { x: -30, y: 0 })}><Chip kind="rule" label="Instructions" /></div>
          </div>
          <Arrow t={t} at={25.9} w={170} />
          <div className="kit-card" style={{ width: 560, padding: '34px 38px', display: 'flex', alignItems: 'center', gap: 26, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 26.4, { dur: 0.6, scale: 0.7, y: 0, easing: BACK }) }}>
            <FolderIcon size={92} open />
            <div>
              <div className="kit-h3">One Project</div>
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>Everything for the recurring work</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 64 }}>
          <div className="kit-pill" style={enter(t, 29.52, { y: 16 })}>Less time setting up</div>
          <div className="kit-pill" style={{ borderColor: GREEN, ...enter(t, 31.24, { y: 16 }) }}>More time moving the work forward</div>
        </div>
      </Scene>

      {/* 3 — Meet Larry */}
      <Scene t={t} index={2}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70 }}>
          <div style={{ width: 300, height: 300, borderRadius: '50%', background: LIME_SOFT, border: `6px solid ${LIME}`, display: 'grid', placeItems: 'center', flex: 'none', ...enter(t, 35.0, { scale: 0.5, y: 0, dur: 0.8, easing: BACK }) }}>
            <span className="kit-h1" style={{ fontSize: 170, color: GREEN }}>L</span>
          </div>
          <div>
            <div className="kit-label" style={enter(t, 33.7, { y: 14 })}>Let’s build one</div>
            <div className="kit-h1" style={{ fontSize: 150, ...enter(t, 34.1, { dur: 0.9, y: 34 }) }}>
              Meet <span className="kit-mark" style={markStyle(t, 35.2)}>Larry.</span>
            </div>
            <p className="kit-body" style={{ marginTop: 26, fontSize: 40, ...enter(t, 36.0, { y: 16 }) }}>
              An assistant for weekly leadership updates.
            </p>
          </div>
        </div>
      </Scene>

      {/* 4 — Home sidebar > Projects > + */}
      <Scene t={t} index={3}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 110 }}>
          <div style={{ width: 640, flex: 'none' }}>
            <div className="kit-label" style={enter(t, 40.0, { y: 14 })}>Step 1 · Create a project</div>
            <div className="kit-h2" style={enter(t, 40.2, { dur: 0.8, y: 30 })}>
              Projects, then <span className="kit-mark" style={markStyle(t, 43.36)}>+</span>
            </div>
            <p className="kit-body kit-muted" style={{ marginTop: 30, ...enter(t, 41.0, { y: 16 }) }}>In ChatGPT’s Home sidebar.</p>
          </div>
          <div className="kit-card kit-ui" style={{ width: 520, padding: '24px 18px', boxShadow: '0 20px 50px rgba(0,0,0,.08)', position: 'relative', ...enter(t, 40.3, { y: 30 }) }}>
            {['New chat', 'Search chats', 'Library'].map((l) => (
              <div key={l} style={{ padding: '10px 16px', fontSize: 24, color: '#444' }}>{l}</div>
            ))}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 14,
                padding: '12px 16px',
                borderRadius: 12,
                background: t >= 41.92 ? LIME_SOFT : 'transparent',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '.08em',
                color: MUTED,
              }}
            >
              PROJECTS
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 30,
                  color: INK,
                  border: `2px solid ${t >= 43.36 ? GREEN : LINE}`,
                  background: '#fff',
                  transform: `scale(${1 + 0.2 * Math.sin(Math.PI * prog(t, 43.9, 0.3))})`,
                }}
              >
                +
              </span>
            </div>
            {['Demo Writer', 'Lesson Writer', 'Script Checker'].map((l) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px', fontSize: 23, color: '#444' }}>
                <FolderIcon size={26} /> {l}
              </div>
            ))}
            {/* cursor */}
            {(() => {
              const p = prog(t, 42.6, 0.9, IN_OUT);
              const x = 380 + (440 - 380) * p;
              const y = 330 + (215 - 330) * p;
              return (
                <svg width="40" height="40" viewBox="0 0 24 24" style={{ position: 'absolute', left: x, top: y, opacity: prog(t, 41.6, 0.4), filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.3))' }}>
                  <path d="M3 2l15.5 9.2-6.6 1.4 3.8 7.3-2.9 1.5-3.8-7.3-4.9 4.6z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              );
            })()}
          </div>
        </div>
      </Scene>

      {/* 5 — Name, icon, colour (01) */}
      <Scene t={t} index={4} pad={false}>
        <Win
          t={t}
          start={45.0}
          src={shot('01-project-icon-color')}
          cam={[
            { at: 45.3, x: 900, y: 470, s: 1.9, dur: 1.0 },
            { at: 49.3, x: 890, y: 580, s: 2.1, dur: 1.0 },
          ]}
          cursor={[
            { at: 45.6, x: 1050, y: 700 },
            { at: 49.4, x: 741, y: 455, click: true, dur: 0.6 },
            { at: 53.1, x: 955, y: 549, click: true, dur: 0.6 },
            { at: 54.0, x: 751, y: 666, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 46.56, until: 49.6, x: 762, y: 438, w: 436, h: 34 },
            { at: 50.72, until: 53.4, x: 736, y: 534, w: 314, h: 30 },
            { at: 53.84, until: 54.6, x: 940, y: 534, w: 30, h: 30 },
            { at: 54.72, x: 736, y: 650, w: 30, h: 32, spot: true },
          ]}
          steps={[
            { at: 45.36, text: 'Name it: Larry, Leadership Updates' },
            { at: 49.92, text: 'Pick an icon and a colour' },
            { at: 53.84, text: 'Blue bar-chart icon' },
          ]}
        />
      </Scene>

      {/* 6 — Memory options (02) */}
      <Scene t={t} index={5} pad={false}>
        <Win
          t={t}
          start={56.8}
          src={shot('02-memory-options')}
          cam={[
            { at: 57.0, x: 880, y: 640, s: 1.9, dur: 1.0 },
            { at: 73.0, x: 880, y: 700, s: 2.2, dur: 1.0 },
          ]}
          cursor={[
            { at: 57.0, x: 1000, y: 470 },
            { at: 57.6, x: 800, y: 580, click: true, dur: 0.7 },
            { at: 73.4, x: 805, y: 699, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 61.76, until: 67.4, x: 726, y: 618, w: 310, h: 56, spot: true },
            { at: 67.6, until: 79.6, x: 726, y: 688, w: 310, h: 88, spot: true },
            { at: 80.72, x: 735, y: 724, w: 270, h: 46, spot: true },
          ]}
          steps={[
            { at: 57.72, text: 'Open the memory menu' },
            { at: 62.08, text: 'Default: shares memory with outside chats' },
            { at: 67.92, text: 'Project-only: memory stays in the project' },
            { at: 74.08, text: 'Larry uses Project-only memory' },
            { at: 79.68, text: 'Trade-off: no Work mode or file Space here' },
            { at: 86.88, text: 'You can still upload files to Sources' },
          ]}
        />
      </Scene>

      {/* 7 — Create project (03) */}
      <Scene t={t} index={6} pad={false}>
        <Win
          t={t}
          start={90.0}
          src={shot('03-create-larry-project')}
          cam={[
            { at: 90.0, x: 880, y: 700, s: 2.2, dur: 0.01 },
            { at: 90.1, x: 960, y: 520, s: 1.8, dur: 0.9 },
          ]}
          cursor={[
            { at: 90.1, x: 880, y: 730 },
            { at: 90.5, x: 1140, y: 580, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 90.3, until: 91.4, x: 726, y: 566, w: 160, h: 28 },
            { at: 91.2, x: 1080, y: 561, w: 120, h: 36, spot: true },
          ]}
          steps={[{ at: 90.72, text: 'Create project' }]}
        />
      </Scene>

      {/* 8 — Project settings (04) */}
      <Scene t={t} index={7} pad={false}>
        <Win
          t={t}
          start={93.9}
          src={shot('04-project-settings-menu')}
          cam={[{ at: 94.1, x: 1050, y: 160, s: 2.0, dur: 1.0 }]}
          cursor={[
            { at: 94.2, x: 900, y: 300 },
            { at: 95.6, x: 1279, y: 91, click: true, dur: 0.8 },
            { at: 98.4, x: 1222, y: 142, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 96.0, until: 98.6, x: 1262, y: 74, w: 34, h: 34 },
            { at: 98.96, x: 1140, y: 126, w: 148, h: 30, spot: true },
          ]}
          steps={[
            { at: 96.0, text: 'Three-dot menu beside the project name' },
            { at: 98.96, text: 'Project settings' },
          ]}
        />
      </Scene>

      {/* 9 — Instructions field (05) */}
      <Scene t={t} index={8} pad={false}>
        <Win
          t={t}
          start={100.5}
          src={shot('05-codo-instructions')}
          cam={[{ at: 100.7, x: 960, y: 380, s: 1.9, dur: 1.0 }]}
          rings={[{ at: 100.8, x: 720, y: 318, w: 480, h: 104, spot: true }]}
          steps={[
            { at: 100.8, text: 'Instructions: how Larry works in every chat' },
            { at: 107.84, text: 'Written with the CODO framework' },
          ]}
        />
      </Scene>

      {/* 10 — CODO */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 109.7, { y: 14 })}>Project instructions</div>
        <div className="kit-h2" style={enter(t, 109.8, { dur: 0.8, y: 30 })}>Brief Larry with CODO.</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 50 }}>
          {(
            [
              ['C', 'Character', 'Act as Larry, my Chief of Staff.', 109.76, 113.4],
              ['O', 'Objective', 'Turn rough weekly notes into decision-ready leadership updates.', 113.6, 119.1],
              ['D', 'Do’s and Don’ts', 'Highlight progress, risks, decisions and next steps. Don’t invent missing information; flag unknowns.', 119.28, 129.8],
              ['O', 'Output', 'A concise update with clear headings, no more than 200 words.', 130.0, 135.6],
            ] as const
          ).map(([l, w, text, at, off]) => {
            const on = t >= at && t < off;
            return (
              <div key={w} className="kit-card" style={{ display: 'flex', alignItems: 'center', gap: 30, padding: '20px 28px', borderColor: on ? GREEN : LINE, background: on ? LIME_SOFT : '#fff', ...enter(t, at, { x: -30, y: 0 }) }}>
                <div style={{ width: 72, height: 72, borderRadius: 18, background: on ? LIME : '#F1F2EC', color: on ? '#fff' : INK, display: 'grid', placeItems: 'center', fontFamily: 'IBM Plex Serif', fontSize: 44, flex: 'none' }}>{l}</div>
                <div className="kit-ui" style={{ width: 300, flex: 'none', fontSize: 30, fontWeight: 700 }}>{w}</div>
                <div className="kit-ui" style={{ fontSize: 28, lineHeight: 1.35, color: '#333' }}>{text}</div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 11 — Save (05) */}
      <Scene t={t} index={10} pad={false}>
        <Win
          t={t}
          start={135.7}
          src={shot('05-codo-instructions')}
          cam={[
            { at: 135.7, x: 960, y: 380, s: 1.9, dur: 0.01 },
            { at: 135.9, x: 1000, y: 560, s: 1.7, dur: 1.0 },
          ]}
          cursor={[
            { at: 135.9, x: 960, y: 430 },
            { at: 136.7, x: 1166, y: 762, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 135.9, until: 137.3, x: 720, y: 360, w: 480, h: 60 },
            { at: 137.76, x: 1134, y: 744, w: 66, h: 36, spot: true },
          ]}
          steps={[
            { at: 135.84, text: 'Paste the instructions' },
            { at: 137.76, text: 'Save' },
            { at: 138.88, text: 'Each week, just bring fresh notes' },
          ]}
        />
      </Scene>

      {/* 12 — Memory selector (13) */}
      <Scene t={t} index={11} pad={false}>
        <Win
          t={t}
          start={144.5}
          src={shot('13-existing-project-memory-control')}
          cam={[{ at: 144.7, x: 900, y: 600, s: 1.8, dur: 1.0 }]}
          rings={[
            { at: 146.24, until: 147.6, x: 720, y: 503, w: 480, h: 36 },
            { at: 147.84, x: 722, y: 546, w: 238, h: 200, spot: true },
          ]}
          steps={[{ at: 146.24, text: 'Review the Memory setting any time' }]}
        />
      </Scene>

      {/* 13 — Add sources (06) */}
      <Scene t={t} index={12} pad={false}>
        <Win
          t={t}
          start={151.2}
          src={shot('06-add-sources-options')}
          cam={[
            { at: 151.4, x: 900, y: 300, s: 1.5, dur: 0.9 },
            { at: 155.3, x: 960, y: 600, s: 1.8, dur: 1.0 },
          ]}
          cursor={[
            { at: 151.5, x: 1000, y: 470 },
            { at: 152.0, x: 785, y: 228, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 152.48, until: 155.0, x: 741, y: 208, w: 88, h: 36 },
            { at: 156.88, until: 157.8, x: 720, y: 605, w: 114, h: 76 },
            { at: 157.92, until: 158.9, x: 842, y: 605, w: 114, h: 76 },
            { at: 160.08, x: 964, y: 605, w: 236, h: 76 },
          ]}
          steps={[
            { at: 152.48, text: 'Sources tab, then Add sources' },
            { at: 156.88, text: 'Upload a file or paste text' },
            { at: 159.72, text: 'Or connect Google Drive or Slack' },
            { at: 162.24, text: 'Connections vary by account and workspace' },
          ]}
        />
      </Scene>

      {/* 14 — Strategy document */}
      <Scene t={t} index={13}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
          <div style={{ width: 620, flex: 'none' }}>
            <div className="kit-label" style={enter(t, 166.0, { y: 14 })}>Reference source</div>
            <div className="kit-h2" style={enter(t, 166.2, { dur: 0.8, y: 30 })}>
              A short <span className="kit-mark" style={markStyle(t, 168.32)}>strategy document.</span>
            </div>
            <p className="kit-body kit-muted" style={{ marginTop: 30, ...enter(t, 170.24, { y: 16 }) }}>Two pieces of context Larry can use.</p>
          </div>
          <div className="kit-card" style={{ flex: 1, padding: '34px 40px', background: '#FBFBF8', position: 'relative', ...enter(t, 167.12, { x: 30, y: 0 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <FileIcon size={44} accent />
              <div className="kit-ui" style={{ fontSize: 30, fontWeight: 700 }}>Larry-Demo-Strategy.txt</div>
              <span className="kit-tag" style={{ marginLeft: 'auto', ...enter(t, 168.32, { y: 0, scale: 0.6, easing: BACK }) }}>Fictional</span>
            </div>
            <div style={{ height: 2, background: LINE, margin: '24px 0' }} />
            {(
              [
                ['Launch date', 'Customer-health dashboard launches by 30 November 2026', 172.8, 175.44],
                ['Target', '95% data completeness across pilot accounts', 178.12, 179.2],
              ] as const
            ).map(([k, v, at, mark]) => (
              <div key={k} style={{ marginTop: 18, ...enter(t, at, { x: -20, y: 0 }) }}>
                <div className="kit-ui" style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED, textTransform: 'uppercase' }}>{k}</div>
                <div className="kit-ui" style={{ fontSize: 32, marginTop: 6 }}>
                  <span className="kit-mark" style={markStyle(t, mark)}>{v}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 15 — Uploaded (07) */}
      <Scene t={t} index={14} pad={false}>
        <Win
          t={t}
          start={183.2}
          src={shot('07-sources-uploaded-and-model-picker')}
          cam={[{ at: 183.4, x: 980, y: 330, s: 1.8, dur: 1.0 }]}
          rings={[{ at: 185.16, x: 677, y: 380, w: 620, h: 44, spot: true }]}
          steps={[
            { at: 183.8, text: 'Upload finishes' },
            { at: 185.16, text: 'The file appears in Sources' },
            { at: 187.92, text: 'Ready to use alongside weekly notes' },
          ]}
        />
      </Scene>

      {/* 16 — The request (08) */}
      <Scene t={t} index={15} pad={false}>
        <Win
          t={t}
          start={191.6}
          src={shot('08-weekly-input')}
          cam={[{ at: 191.8, x: 930, y: 250, s: 1.7, dur: 1.0 }]}
          rings={[
            { at: 194.49, until: 202.6, x: 680, y: 146, w: 500, h: 52, spot: true },
            { at: 203.53, x: 680, y: 226, w: 520, h: 154, spot: true },
          ]}
          steps={[
            { at: 192.65, text: 'New chat inside the project' },
            { at: 195.41, text: 'Ask for this week’s leadership update' },
            { at: 203.53, text: 'Paste the meeting notes' },
          ]}
        />
      </Scene>

      {/* 17 — This week's notes */}
      <Scene t={t} index={16}>
        <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
          <div className="kit-card kit-ui" style={{ width: 980, flex: 'none', padding: '30px 38px', background: '#FBFBF8', ...enter(t, 205.1, { y: 24 }) }}>
            <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 14 }}>THIS WEEK’S NOTES</div>
            {(
              [
                ['Dashboard pilot is live with 12 accounts', 205.21],
                ['Data completeness up from 82% to 91%', 208.49],
                ['Two data connectors are delayed', 212.73],
                ['Maya: recovery plan by Friday', 214.89],
                ['Decide: connector fixes vs. new export feature', 217.93],
                ['Data-quality review Thursday', 223.61],
                ['Launch-readiness check Friday', 226.29],
                ['Budget impact not assessed', 228.85],
              ] as const
            ).map(([l, at]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, padding: '7px 0', ...enter(t, at, { x: -20, y: 0, dur: 0.5 }) }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: LIME, flex: 'none' }} /> {l}
              </div>
            ))}
          </div>
          <div style={{ flex: 1 }}>
            <div className="kit-h3" style={enter(t, 231.69, { y: 20 })}>Not repeated:</div>
            {(
              [
                ['95% target', 233.21],
                ['30 Nov deadline', 234.17],
              ] as const
            ).map(([l, at]) => (
              <div key={l} className="kit-pill" style={{ marginTop: 20, display: 'flex', ...enter(t, at, { y: 14 }) }}>
                <Cross size={28} /> <span style={{ textDecoration: t >= 235.45 ? 'line-through' : 'none', color: t >= 235.45 ? MUTED : INK }}>{l}</span>
              </div>
            ))}
            <div className="kit-pill" style={{ marginTop: 28, display: 'flex', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 235.45, { y: 14, scale: 0.85, easing: BACK }) }}>
              <FileIcon size={30} accent /> Already in Sources
            </div>
          </div>
        </div>
      </Scene>

      {/* 18 — Reasoning level (07) */}
      <Scene t={t} index={17} pad={false}>
        <Win
          t={t}
          start={237.2}
          src={shot('07-sources-uploaded-and-model-picker')}
          cam={[{ at: 237.4, x: 1110, y: 200, s: 2.3, dur: 1.0 }]}
          rings={[
            { at: 239.17, until: 243.5, x: 1052, y: 140, w: 150, h: 36 },
            { at: 243.93, x: 956, y: 182, w: 250, h: 76, spot: true },
          ]}
          steps={[
            { at: 239.17, text: 'Adjust the reasoning level' },
            { at: 243.93, text: 'High opens a Thinking effort slider' },
          ]}
        />
      </Scene>

      {/* 19 — Send (08) */}
      <Scene t={t} index={18} pad={false}>
        <Win
          t={t}
          start={247.6}
          src={shot('08-weekly-input')}
          cam={[{ at: 247.6, x: 1100, y: 330, s: 1.9, dur: 0.6 }]}
          cursor={[
            { at: 247.6, x: 1050, y: 470 },
            { at: 247.7, x: 1271, y: 416, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 248.1, x: 1252, y: 397, w: 38, h: 38 }]}
          steps={[{ at: 247.93, text: 'Send' }]}
        />
      </Scene>

      {/* 20 — Larry's update (09) */}
      <Scene t={t} index={19} pad={false}>
        <Win
          t={t}
          start={250.9}
          src={shot('09-generated-leadership-update')}
          cam={[
            { at: 251.1, x: 960, y: 200, s: 1.6, dur: 1.0 },
            { at: 256.3, x: 900, y: 320, s: 1.7, dur: 1.0 },
          ]}
          rings={[
            { at: 253.05, until: 256.3, x: 788, y: 54, w: 128, h: 24 },
            { at: 254.97, until: 256.3, x: 1080, y: 54, w: 175, h: 24 },
            { at: 257.45, until: 259.1, x: 644, y: 244, w: 248, h: 24 },
            { at: 259.29, x: 644, y: 380, w: 96, h: 50, spot: true },
          ]}
          steps={[
            { at: 251.13, text: 'Notes + 95% target + 30 November deadline' },
            { at: 257.45, text: 'Flags the unknown budget impact' },
            { at: 259.29, text: 'And the missing action owners' },
          ]}
        />
      </Scene>

      {/* 21 — Why it works + review */}
      <Scene t={t} index={20}>
        <div className="kit-label" style={enter(t, 261.0, { y: 14 })}>Why it works</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <div style={enter(t, 262.57, { y: 20 })}><Chip kind="rule" label="Project instructions" /></div>
          <span className="kit-h3" style={enter(t, 263.6, { y: 0 })}>+</span>
          <div style={enter(t, 264.01, { y: 20 })}><Chip kind="doc" label="Reference sources" /></div>
          <span className="kit-h3" style={enter(t, 265.1, { y: 0 })}>+</span>
          <div style={enter(t, 265.53, { y: 20 })}><Chip kind="chat" label="Fresh input" /></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 80 }}>
          <div className="kit-h2" style={enter(t, 266.73, { dur: 0.8, y: 30 })}>
            You still <span className="kit-mark" style={markStyle(t, 267.21)}>review it.</span>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {(
              [
                ['Assumptions', 270.13],
                ['Dates', 271.25],
                ['Recommendations', 271.69],
              ] as const
            ).map(([l, at]) => (
              <div key={l} className="kit-pill" style={enter(t, at, { y: 14, scale: 0.85, easing: BACK, dur: 0.5 })}>
                <Check size={28} /> {l}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 22 — Add to project sources (10) */}
      <Scene t={t} index={21} pad={false}>
        <Win
          t={t}
          start={273.7}
          src={shot('10-response-added-to-sources')}
          cam={[{ at: 273.9, x: 800, y: 700, s: 2.2, dur: 1.0 }]}
          cursor={[
            { at: 274.0, x: 980, y: 820 },
            { at: 275.0, x: 742, y: 786, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 276.17, x: 727, y: 770, w: 28, h: 28, spot: true }]}
          steps={[{ at: 275.69, text: 'Add to project sources' }]}
        />
      </Scene>

      {/* 23 — Sources list (11) */}
      <Scene t={t} index={22} pad={false}>
        <Win
          t={t}
          start={278.9}
          src={shot('11-reference-and-saved-response')}
          cam={[
            { at: 279.1, x: 980, y: 320, s: 1.8, dur: 1.0 },
            { at: 288.4, x: 980, y: 200, s: 1.8, dur: 1.0 },
          ]}
          rings={[
            { at: 280.89, until: 288.3, x: 677, y: 380, w: 620, h: 110, spot: true },
            { at: 290.69, x: 665, y: 132, w: 632, h: 52, spot: true },
          ]}
          steps={[
            { at: 279.37, text: 'Back in Sources' },
            { at: 281.17, text: 'Strategy file and saved update, side by side' },
            { at: 288.41, text: 'Next week: new chat, fresh notes' },
          ]}
        />
      </Scene>

      {/* 24 — Two more controls */}
      <Scene t={t} index={23}>
        <div className="kit-label" style={enter(t, 294.4, { y: 14 })}>Organize and share</div>
        <div className="kit-h2" style={enter(t, 294.5, { dur: 0.8, y: 30 })}>Two more controls.</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 60 }}>
          <div className="kit-pill" style={enter(t, 295.2, { y: 16 })}><span className="kit-tag">1</span> Move a chat into a project</div>
          <div className="kit-pill" style={enter(t, 295.6, { y: 16 })}><span className="kit-tag">2</span> Share a project</div>
        </div>
      </Scene>

      {/* 25 — Move to project (14) */}
      <Scene t={t} index={24} pad={false}>
        <Win
          t={t}
          start={297.0}
          src={shot('14-move-to-project-menu')}
          cam={[
            { at: 297.2, x: 420, y: 520, s: 1.5, dur: 1.0 },
            { at: 305.6, x: 560, y: 560, s: 1.4, dur: 1.0 },
          ]}
          cursor={[
            { at: 297.5, x: 600, y: 750 },
            { at: 301.6, x: 337, y: 582, click: true, dur: 0.8 },
            { at: 304.1, x: 430, y: 504, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 298.09, until: 302.3, x: 62, y: 564, w: 296, h: 34 },
            { at: 302.57, until: 304.6, x: 330, y: 186, w: 210, h: 376 },
            { at: 304.89, until: 306.3, x: 340, y: 488, w: 192, h: 32 },
            { at: 306.41, x: 550, y: 380, w: 304, h: 566, spot: true },
          ]}
          steps={[
            { at: 300.65, text: 'Home sidebar: the chat’s three-dot menu' },
            { at: 304.45, text: 'Move to project, then choose a destination' },
            { at: 308.01, text: 'Use the sidebar menu, not the chat title menu' },
          ]}
        />
      </Scene>

      {/* 26 — Share (12) */}
      <Scene t={t} index={25} pad={false}>
        <Win
          t={t}
          start={314.1}
          src={shot('12-sharing-options')}
          cam={[
            { at: 314.3, x: 1100, y: 160, s: 2.0, dur: 1.0 },
            { at: 320.6, x: 960, y: 480, s: 1.8, dur: 1.2 },
          ]}
          cursor={[
            { at: 316.6, x: 1000, y: 250 },
            { at: 317.4, x: 1208, y: 90, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 318.49, until: 320.6, x: 1163, y: 72, w: 90, h: 36 },
            { at: 324.57, until: 326.3, x: 766, y: 516, w: 290, h: 30 },
            { at: 326.49, until: 330.8, x: 766, y: 552, w: 290, h: 30 },
            { at: 332.29, until: 338.5, x: 720, y: 474, w: 172, h: 28 },
            { at: 339.85, x: 718, y: 562, w: 360, h: 50, spot: true },
          ]}
          steps={[
            { at: 318.49, text: 'Share: review access, invite collaborators' },
            { at: 323.61, text: 'Only those invited, or anyone at Lead with AI' },
            { at: 329.29, text: 'Your options may differ' },
            { at: 332.29, text: 'Check access and contents before sharing' },
            { at: 339.85, text: 'Shared projects turn off personal memory and Drive sync' },
          ]}
        />
      </Scene>

      {/* 27 — Larry's workspace */}
      <Scene t={t} index={26}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
          <div className="kit-card" style={{ width: 620, flex: 'none', padding: '34px 38px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 345.53, { scale: 0.85, y: 0, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <FolderIcon size={70} open />
              <div className="kit-h3">Larry, Leadership Updates</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 28 }}>
              <div style={enter(t, 348.41, { x: -20, y: 0 })}><Chip kind="rule" label="Instructions" /></div>
              <div style={enter(t, 349.25, { x: -20, y: 0 })}><Chip kind="doc" label="Reference material" /></div>
              <div style={enter(t, 350.81, { x: -20, y: 0 })}><Chip kind="chat" label="Reusable weekly workflow" /></div>
            </div>
          </div>
          <div>
            <div className="kit-label" style={enter(t, 353.29, { y: 14 })}>The value of Projects</div>
            <div className="kit-h2" style={enter(t, 353.5, { dur: 0.8, y: 30 })}>
              Ongoing work stays <span className="kit-mark" style={markStyle(t, 356.81)}>organized</span> as it develops.
            </div>
          </div>
        </div>
      </Scene>

      {/* 28 — Closing */}
      <Scene t={t} index={27} padStyle={{ opacity: 1 - prog(t, 368.3, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 359.0, { y: 14 })}>Your turn</div>
        <div className="kit-h1" style={enter(t, 359.1, { dur: 0.9, y: 34 })}>
          Start with <span className="kit-mark" style={markStyle(t, 359.69)}>one recurring task.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 70 }}>
          {(
            [
              ['1', 'Give it clear guidance', 361.29],
              ['2', 'Add the reference material', 362.89],
              ['3', 'Return to it every week', 365.13],
            ] as const
          ).map(([n, l, at]) => (
            <div key={n} className="kit-pill" style={enter(t, at, { y: 18 })}>
              <span className="kit-tag">{n}</span> {l}
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

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ChatGPTProjects: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CHATGPT_PROJECTS_TITLE_FRAMES}>
      <TitleCardGreen label="CHATGPT" title="ChatGPT Projects" />
    </Sequence>
    <Sequence from={CHATGPT_PROJECTS_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
