import React from 'react';
import { AbsoluteFill, Audio, Easing, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
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
  GREEN,
  INK,
  IN_OUT,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
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

// Claude Motion — custom screenshot demo (Lead with AI), built with src/kit.
// Every cue is in SECONDS of the VO (audio/claude-motion.mp3, Daan on ElevenLabs v4, take 1 with the
// event-details paragraph cut out, 224.0s), from the Scribe word timestamps in
// src/data/claude-motion.transcript.json. A 90-frame green title card opens the video; the VO starts after it.
// Screenshots: claude-motion/images/01..13 (1920x958). The finished Motion export plays in the review scene.
//
//  #  scene                         start   VO cue
//  1  Prompt in, animation out      0.00    "Claude Motion is a new way…"
//  2  Refine, then export MP4       14.96   "You can refine the result…"
//  3  Code, not filmed scenes       21.60   "Unlike realistic AI video generators…"
//  4  Where it fits                 30.48   "That makes it ideal for…"
//  5  The demo                      40.64   "In this demo, I'll turn…"
//  6  Artifacts > Motion            47.90   "To get started, click Artifacts…"
//  7  The workspace                 54.14   "This opens a workspace…"
//  8  Upload + prompt               59.98   "I upload the event graphic…"
//  9  The brief                     64.54   "My prompt sets the length…"
//  10 Guardrails                    85.50   "I also tell Claude to use…"
//  11 First version                 99.74   "Claude generates the first version…"
//  12 Refine: with Paul Smart       105.66  "Now I refine it…"
//  13 Labels above the lines        124.30  "During review, I notice…"
//  14 Review the video              132.70  "Next, I play the video…"
//  15 Export button                 151.26  "To export, click Export…"
//  16 Export settings               154.62  "…and choose M-P-4 video."
//  17 Save file                     164.06  "Keep the page open…"
//  18 MP4 ready                     171.34  "The M-P-4 is now ready…"
//  19 Prompt tips                   175.58  "A few practical tips…"
//  20 Check before you publish      190.78  "Always check names, dates…"
//  21 Usage                         201.10  "Keep in mind that longer…"
//  22 Availability                  209.58  "Claude Motion is currently in beta…"

export const CLAUDE_MOTION_DURATION_S = 225.6;
export const CLAUDE_MOTION_TITLE_FRAMES = 90;

const STARTS = [
  0, 14.96, 21.6, 30.48, 40.64, 47.9, 54.14, 59.98, 64.54, 85.5, 99.74, 105.66, 124.3, 132.7, 151.26, 154.62, 164.06,
  171.34, 175.58, 190.78, 201.1, 209.58,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;

// Browser previews can inject screenshots/video as data URIs via globalThis.CLAUDE_MOTION_SHOTS.
const media = (key: string, path: string): string =>
  (globalThis as { CLAUDE_MOTION_SHOTS?: Record<string, string> }).CLAUDE_MOTION_SHOTS?.[key] ?? staticFile(path);
const shot = (n: string) => media(n, `claude-motion/images/${n}.png`);
const PROMO = () => media('promo', 'claude-motion/video/beyond-ai-tools-paul-smart.mp4');

// ── small pieces ─────────────────────────────────────────────────────────────
const Pill: React.FC<{ t: number; at: number; children: React.ReactNode; on?: number; style?: React.CSSProperties }> = ({ t, at, children, on, style }) => {
  const lit = on !== undefined && t >= on;
  return (
    <div style={enter(t, at, { y: 18, easing: BACK })}>
      <div className="kit-pill" style={{ ...(lit ? { borderColor: GREEN, background: LIME_SOFT } : {}), ...style }}>
        {children}
      </div>
    </div>
  );
};

const CheckRow: React.FC<{ t: number; at: number; text: string; bad?: boolean; size?: number }> = ({ t, at, text, bad, size = 36 }) => (
  <div className="kit-row kit-ui" style={{ gap: 18, fontSize: size, ...enter(t, at, { x: -24, y: 0 }) }}>
    <div style={{ transform: `scale(${prog(t, at + 0.1, 0.5, BACK)})` }}>{bad ? <Cross size={size} /> : <Check size={size} />}</div>
    <span style={bad ? { color: MUTED, textDecoration: t > at + 0.4 ? 'line-through' : 'none' } : undefined}>{text}</span>
  </div>
);

const SectionHead: React.FC<{ t: number; at: number; children: React.ReactNode }> = ({ t, at, children }) => (
  <div className="kit-ui" style={{ width: 250, flex: 'none', fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED, ...enter(t, at, { x: -20, y: 0 }) }}>{children}</div>
);

// A tiny "Motion" frame whose elements animate in (text, graphic, chart, image).
const MiniAnimation: React.FC<{ t: number; at: [number, number, number, number] }> = ({ t, at }) => {
  const [aText, aGfx, aChart, aImg] = at;
  return (
    <div className="kit-card" style={{ width: 760, height: 428, position: 'relative', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,.08)' }}>
      <div style={{ position: 'absolute', left: 48, top: 54, fontFamily: 'IBM Plex Serif', fontSize: 52, letterSpacing: '-0.03em', color: INK, ...enter(t, aText, { y: 20 }) }}>
        Q3 in <span style={{ color: GREEN }}>15 seconds</span>
      </div>
      <div style={{ position: 'absolute', left: 48, top: 140, ...enter(t, aText + 0.3, { y: 12 }) }}>
        <div style={{ width: 120, height: 5, background: LIME, transform: `scaleX(${prog(t, aText + 0.3, 0.8)})`, transformOrigin: 'left' }} />
      </div>
      {/* graphic: floating rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 70 + i * 70,
            top: 210 + (i % 2) * 40,
            width: 84,
            height: 84,
            borderRadius: '50%',
            border: `5px solid ${i === 1 ? LIME : LIME_SOFT}`,
            transform: `scale(${prog(t, aGfx + i * 0.12, 0.6, BACK)}) translateY(${Math.sin((t + i) * 1.6) * 6}px)`,
          }}
        />
      ))}
      {/* chart */}
      <div style={{ position: 'absolute', right: 230, bottom: 56, display: 'flex', alignItems: 'flex-end', gap: 14 }}>
        {[90, 140, 120, 200].map((h, i) => (
          <div key={i} style={{ width: 30, height: h * prog(t, aChart + i * 0.1, 0.7), background: i === 3 ? LIME : '#CFE8BC', borderRadius: 6 }} />
        ))}
      </div>
      {/* image */}
      <div
        style={{
          position: 'absolute',
          right: 46,
          top: 160,
          width: 150,
          height: 210,
          borderRadius: 14,
          background: 'linear-gradient(160deg, #E9F5DF, #BFE0A6)',
          display: 'grid',
          placeItems: 'center',
          ...enter(t, aImg, { x: 30, y: 0 }),
        }}
      >
        <svg width={80} height={80} viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth={1.6}>
          <rect x={3} y={4} width={18} height={16} rx={2} />
          <circle cx={9} cy={10} r={2} />
          <path d="M3 18l5-5 4 4 3-3 6 6" />
        </svg>
      </div>
    </div>
  );
};

// ── Body ────────────────────────────────────────────────────────────────────
const ClaudeMotionBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/claude-motion.mp3')} />}

      {/* 1 — Prompt in, animation out */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Claude Motion</div>
        <div className="kit-h2" style={enter(t, 0.3, { dur: 0.9, y: 30 })}>
          Short animations, <span className="kit-mark" style={markStyle(t, 4.2)}>no video editor.</span>
        </div>
        <div className="kit-row" style={{ gap: 40, marginTop: 70 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Pill t={t} at={7.28}>A prompt</Pill>
            <Pill t={t} at={8.04}>An image</Pill>
            <Pill t={t} at={9.04}>Existing content</Pill>
          </div>
          <Arrow t={t} at={10.44} w={170} />
          <div style={enter(t, 10.72, { scale: 0.94, y: 0 })}>
            <MiniAnimation t={t} at={[11.76, 12.72, 13.28, 13.92]} />
          </div>
        </div>
      </Scene>

      {/* 2 — Refine, then export */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 15.0, { y: 14 })}>Refine, then export</div>
        <div className="kit-row" style={{ gap: 36, marginTop: 30 }}>
          <div className="kit-card" style={{ width: 520, padding: 36, ...enter(t, 16.48, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>CONVERSATION</div>
            <div className="kit-ui" style={{ marginTop: 22, padding: '16px 20px', background: '#F3F3F0', borderRadius: 16, fontSize: 28, lineHeight: 1.35 }}>
              {typed(t, 16.9, 'Make the title appear sooner.', 1.1)}
            </div>
          </div>
          <div className="kit-h3" style={{ color: MUTED, ...enter(t, 17.44, { y: 10 }) }}>or</div>
          <div className="kit-card" style={{ width: 520, padding: 36, ...enter(t, 17.92, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>EDITOR</div>
            <div style={{ marginTop: 26, display: 'flex', gap: 10 }}>
              {['The title', 'The guest', 'When', 'End card'].map((s, i) => (
                <div key={s} className="kit-ui" style={{ flex: 1, height: 70, borderRadius: 10, border: `2px solid ${i === 0 && t > 18.3 ? GREEN : LINE}`, background: i === 0 && t > 18.3 ? LIME_SOFT : '#fff', fontSize: 17, padding: 10, boxSizing: 'border-box' }}>
                  {s}
                </div>
              ))}
            </div>
          </div>
          <Arrow t={t} at={18.9} w={110} />
          <div style={enter(t, 20.08, { scale: 0.6, y: 0, easing: BACK })}>
            <div className="kit-ui" style={{ width: 180, height: 220, borderRadius: 20, background: INK, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 40, fontWeight: 700 }}>
              MP4
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Code, not filmed scenes */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 21.7, { y: 14 })}>How it works</div>
        <div className="kit-h2" style={enter(t, 21.8, { dur: 0.8, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 27.76)}>Code</span> animates designed elements.
        </div>
        <div className="kit-row" style={{ gap: 60, marginTop: 60, alignItems: 'stretch' }}>
          <div className="kit-card" style={{ width: 760, padding: 40, opacity: 1 - 0.45 * prog(t, 26.3, 0.6), ...enter(t, 22.0, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>REALISTIC AI VIDEO GENERATORS</div>
            <div className="kit-row" style={{ gap: 24, marginTop: 34 }}>
              <svg width={96} height={96} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={1.4}>
                <rect x={2} y={6} width={14} height={12} rx={2} />
                <path d="M16 10l6-3v10l-6-3z" />
              </svg>
              <div className="kit-body" style={{ fontSize: 36 }}>Generate filmed scenes</div>
            </div>
            <div style={{ marginTop: 30 }}>
              <CheckRow t={t} at={24.88} text="Not what Motion does" bad size={32} />
            </div>
          </div>
          <div className="kit-card" style={{ width: 860, padding: 40, borderColor: t > 27.2 ? GREEN : LINE, ...enter(t, 27.2, { y: 24 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: GREEN }}>CLAUDE MOTION</div>
            <div className="kit-mono" style={{ marginTop: 26, fontSize: 24, lineHeight: 1.6, color: INK, background: '#F6F7F3', borderRadius: 14, padding: '18px 22px' }}>
              <div>{typed(t, 27.76, '<Headline fadeIn={0.2}>', 0.6)}</div>
              <div style={{ paddingLeft: 28 }}>{typed(t, 28.3, 'Beyond AI Tools', 0.5)}</div>
              <div>{typed(t, 28.8, '</Headline>', 0.4)}</div>
            </div>
            <div style={{ marginTop: 22, fontFamily: 'IBM Plex Serif', fontSize: 50, letterSpacing: '-0.03em', ...enter(t, 29.44, { y: 16 }) }}>Beyond AI Tools</div>
          </div>
        </div>
      </Scene>

      {/* 4 — Where it fits */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 30.6, { y: 14 })}>Where it fits</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 20 }}>
          {[
            ['Branded social posts', 31.84, '#E9F5DF'],
            ['Event announcements', 33.52, '#EEF3FB'],
            ['Presentation openers', 34.88, '#FBF1EA'],
            ['Animated explainers', 36.24, '#F3EEFA'],
          ].map(([label, at, bg]) => (
            <div key={label as string} className="kit-card" style={{ height: 330, padding: 30, background: bg as string, border: 'none', display: 'flex', alignItems: 'flex-end', ...enter(t, at as number, { y: 40, easing: BACK }) }}>
              <div className="kit-h3" style={{ fontSize: 42 }}>{label as string}</div>
            </div>
          ))}
        </div>
        <div className="kit-h3" style={{ marginTop: 60, ...enter(t, 37.68, { y: 16 }) }}>
          Where the <span className="kit-mark" style={markStyle(t, 37.92)}>exact wording and timing</span> matter.
        </div>
      </Scene>

      {/* 5 — The demo */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={40.64}
          src={shot('03-event-source-paul-smart')}
          cam={[{ at: 41.6, x: 950, y: 320, s: 1.75, dur: 1.4 }]}
          steps={[
            { at: 41.76, text: 'The Lead with AI PRO event graphic' },
            { at: 44.4, text: 'Goal: a 15-second promo for LinkedIn' },
          ]}
        />
      </Scene>

      {/* 6 — Artifacts > Motion */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={47.9}
          src={shot('01-artifacts-motion')}
          cursor={[
            { at: 48.0, x: 700, y: 600 },
            { at: 48.6, x: 74, y: 201, click: true, dur: 0.7 },
            { at: 50.8, x: 1442, y: 215, click: true, dur: 0.8 },
          ]}
          cam={[{ at: 51.0, x: 1150, y: 230, s: 1.8, dur: 1.0 }]}
          rings={[
            { at: 49.26, until: 50.9, x: 10, y: 186, w: 258, h: 30 },
            { at: 51.58, x: 1380, y: 170, w: 124, h: 114, spot: true },
          ]}
          steps={[
            { at: 49.26, text: 'Artifacts' },
            { at: 51.58, text: 'Make something new › Motion' },
          ]}
        />
      </Scene>

      {/* 7 — The workspace */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={54.14}
          src={shot('02-motion-workspace')}
          cam={[{ at: 55.6, x: 560, y: 640, s: 1.5, dur: 1.2 }]}
          cursor={[{ at: 54.4, x: 1100, y: 600 }, { at: 56.9, x: 322, y: 937, click: true, dur: 0.8 }]}
          rings={[
            { at: 55.1, until: 57.4, x: 302, y: 872, w: 498, h: 48 },
            { at: 57.5, x: 306, y: 922, w: 32, h: 30, spot: true },
          ]}
          steps={[
            { at: 55.1, text: 'Describe the animation' },
            { at: 57.5, text: 'Attach the existing artwork' },
          ]}
        />
      </Scene>

      {/* 8 — Upload + prompt */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={59.98}
          src={shot('04-prompt-and-attached-artwork')}
          cam={[
            { at: 59.98, x: 560, y: 640, s: 1.5, dur: 0.01 },
            { at: 60.3, x: 520, y: 680, s: 1.9, dur: 1.0 },
          ]}
          rings={[
            { at: 60.54, until: 62.2, x: 312, y: 468, w: 126, h: 126 },
            { at: 62.38, x: 308, y: 608, w: 456, h: 300, spot: true },
          ]}
          steps={[
            { at: 60.54, text: 'Upload the event graphic' },
            { at: 62.38, text: 'Give a specific creative direction' },
          ]}
        />
      </Scene>

      {/* 9 — The brief */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={enter(t, 64.6, { y: 14 })}>The prompt</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 46, marginTop: 10 }}>
          <div className="kit-row">
            <SectionHead t={t} at={65.34}>LENGTH</SectionHead>
            <Pill t={t} at={66.34} on={66.34}>15 seconds</Pill>
          </div>
          <div className="kit-row" style={{ alignItems: 'flex-start' }}>
            <SectionHead t={t} at={67.78}>STYLE</SectionHead>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, width: 1300 }}>
              <Pill t={t} at={68.78}>Quiet and editorial</Pill>
              <Pill t={t} at={70.54}>White background</Pill>
              <Pill t={t} at={71.66}>
                <span style={{ fontFamily: 'IBM Plex Serif', fontWeight: 400 }}>Large serif headlines</span>
              </Pill>
              <Pill t={t} at={73.26}>
                <span>
                  {['Fade', 'in', 'line', 'by', 'line'].map((w, i) => (
                    <span key={i} style={{ opacity: 0.25 + 0.75 * prog(t, 73.4 + i * 0.22, 0.4) }}>{w} </span>
                  ))}
                </span>
              </Pill>
              <Pill t={t} at={75.18} on={75.6}>
                <span style={{ width: 22, height: 22, borderRadius: '50%', background: LIME }} />
                Brand green only
              </Pill>
            </div>
          </div>
          <div className="kit-row" style={{ alignItems: 'flex-start' }}>
            <SectionHead t={t} at={77.94}>STRUCTURE</SectionHead>
            <div className="kit-row" style={{ gap: 40 }}>
              <div className="kit-card" style={{ width: 520, height: 170, padding: '26px 30px', position: 'relative', ...enter(t, 79.02, { y: 20 }) }}>
                {['10:00 AM GMT', '11:00 AM CET'].map((lbl, i) => (
                  <div key={lbl} style={{ position: 'absolute', left: 30, right: 30, top: 58 + i * 64 }}>
                    <div style={{ height: 4, background: LIME, transform: `scaleX(${prog(t, 79.42 + i * 0.4, 0.8)})`, transformOrigin: 'left' }} />
                    <div style={{ position: 'absolute', left: 70, top: -11, width: 22, height: 22, borderRadius: '50%', border: `4px solid ${LIME}`, background: '#fff', boxSizing: 'border-box', transform: `scale(${prog(t, 80.22 + i * 0.25, 0.5, BACK)})` }} />
                    <div style={{ position: 'absolute', left: 110, top: -44, fontFamily: 'IBM Plex Serif', fontSize: 26, ...enter(t, 80.46 + i * 0.3, { y: 8 }) }}>{lbl}</div>
                  </div>
                ))}
              </div>
              <div className="kit-card" style={{ width: 360, height: 170, display: 'grid', placeItems: 'center', ...enter(t, 81.66, { y: 20 }) }}>
                <div style={{ textAlign: 'center' }}>
                  <div className="kit-ui" style={{ fontSize: 28, fontWeight: 700 }}>Logo end card</div>
                  <div className="kit-ui" style={{ marginTop: 12, ...enter(t, 83.34, { y: 8 }) }}>
                    <span className="kit-tag">held 3s+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 10 — Guardrails */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 85.6, { y: 14 })}>Guardrails</div>
        <div className="kit-row" style={{ gap: 80, alignItems: 'flex-start', marginTop: 10 }}>
          <div style={{ width: 760 }}>
            <div className="kit-h3" style={enter(t, 85.8, { y: 16 })}>
              Use <span className="kit-mark" style={markStyle(t, 91.1)}>exactly as written</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 34 }}>
              <CheckRow t={t} at={87.66} text="Speaker photo" />
              <CheckRow t={t} at={88.54} text="Logos" />
              <CheckRow t={t} at={89.42} text="Title" />
              <CheckRow t={t} at={90.02} text="Date and times" />
            </div>
          </div>
          <div style={{ width: 760 }}>
            <div className="kit-h3" style={enter(t, 92.46, { y: 16 })}>
              Don't <span className="kit-mark" style={markStyle(t, 93.02)}>invent</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 34 }}>
              <CheckRow t={t} at={93.74} text="Extra details" bad />
              <CheckRow t={t} at={94.62} text="Links" bad />
              <CheckRow t={t} at={95.1} text="Calls to action" bad />
            </div>
          </div>
        </div>
        <div className="kit-row" style={{ gap: 22, marginTop: 56, ...enter(t, 96.9, { y: 16 }) }}>
          <svg width={52} height={52} viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9h4l5-4v14l-5-4H4z" />
            <path d="M17 9l4 6M21 9l-4 6" style={{ opacity: prog(t, 98.3, 0.3) }} />
          </svg>
          <div className="kit-h3">
            Reads clearly with the <span className="kit-mark" style={markStyle(t, 98.3)}>sound off</span>
          </div>
        </div>
      </Scene>

      {/* 11 — First version */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={99.74}
          src={shot('07-first-version-end-card')}
          cam={[
            { at: 100.4, x: 1370, y: 450, s: 1.45, dur: 1.2 },
            { at: 103.7, x: 960, y: 479, s: 1, dur: 1.0 },
          ]}
          rings={[
            { at: 101.82, until: 103.6, x: 836, y: 140, w: 1072, h: 604 },
            { at: 103.9, x: 300, y: 44, w: 504, h: 880, spot: true },
          ]}
          steps={[
            { at: 101.82, text: 'The first version plays in the preview' },
            { at: 103.9, text: 'Right beside the conversation' },
          ]}
        />
      </Scene>

      {/* 12 — Refine: with Paul Smart */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={105.66}
          src={shot('08-refinement-prompt')}
          cam={[
            { at: 106.2, x: 640, y: 680, s: 1.7, dur: 1.2 },
            { at: 112.6, x: 1050, y: 440, s: 1.35, dur: 1.2 },
            { at: 116.3, x: 560, y: 830, s: 2.0, dur: 1.2 },
          ]}
          rings={[
            { at: 107.74, until: 111.5, x: 304, y: 770, w: 498, h: 142 },
            { at: 111.66, until: 113.2, x: 512, y: 780, w: 136, h: 24 },
            { at: 113.5, until: 116.0, x: 1252, y: 432, w: 240, h: 44, spot: true },
            { at: 116.78, x: 312, y: 822, w: 440, h: 86, spot: true },
          ]}
          steps={[
            { at: 107.74, text: 'Credit the guest speaker at the start' },
            { at: 111.66, text: 'Add “with Paul Smart” to the opening title' },
            { at: 116.78, text: 'Restate what must stay the same' },
          ]}
        />
      </Scene>

      {/* 13 — Labels above the lines */}
      <Scene t={t} index={12}>
        <div className="kit-label" style={enter(t, 124.4, { y: 14 })}>Spotted in review</div>
        <div className="kit-h2" style={enter(t, 124.5, { dur: 0.8, y: 30 })}>
          Move the labels <span className="kit-mark" style={markStyle(t, 131.22)}>above the lines.</span>
        </div>
        <div className="kit-card" style={{ marginTop: 60, width: 1200, height: 330, position: 'relative', ...enter(t, 125.0, { y: 24 }) }}>
          {['10:00 AM GMT', '11:00 AM CET'].map((lbl, i) => {
            const lift = prog(t, 130.34, 0.9, IN_OUT);
            const crossing = 1 - lift;
            return (
              <div key={lbl} style={{ position: 'absolute', left: 60, right: 60, top: 120 + i * 130 }}>
                <div style={{ height: 6, background: LIME, borderRadius: 3 }} />
                <div style={{ position: 'absolute', left: 180, top: -15, width: 36, height: 36, borderRadius: '50%', border: `6px solid ${LIME}`, background: '#fff', boxSizing: 'border-box' }} />
                <div style={{ position: 'absolute', left: 250, top: -34 - lift * 46, fontFamily: 'IBM Plex Serif', fontSize: 58, letterSpacing: '-0.02em', lineHeight: 1 }}>{lbl}</div>
                {/* "problem" highlight where the line cuts through the text */}
                <div style={{ position: 'absolute', left: 236, top: -36, width: 470, height: 76, borderRadius: 12, border: `4px solid ${'#C2410C'}`, opacity: crossing * prog(t, 126.86, 0.4) }} />
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 14 — Review the video */}
      <Scene t={t} index={13}>
        <div className="kit-row" style={{ gap: 70, alignItems: 'center' }}>
          <div style={{ width: 1000, flex: 'none', ...enter(t, 132.9, { y: 24 }) }}>
            <div className="kit-card" style={{ overflow: 'hidden', width: 1000, height: 563, boxShadow: '0 20px 50px rgba(0,0,0,.10)' }}>
              <Sequence from={Math.round(133.42 * fps)} layout="none">
                <OffthreadVideo src={PROMO()} muted style={{ width: 1000, height: 563, display: 'block' }} />
              </Sequence>
            </div>
            <div className="kit-ui" style={{ marginTop: 18, fontSize: 24, color: MUTED }}>The finished 15-second promo, start to finish</div>
          </div>
          <div>
            <div className="kit-label" style={enter(t, 133.0, { y: 14 })}>Review</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <CheckRow t={t} at={136.34} text="Pacing" size={32} />
              <CheckRow t={t} at={137.18} text="Speaker's name" size={32} />
              <CheckRow t={t} at={138.46} text="Title" size={32} />
              <CheckRow t={t} at={139.34} text="Date" size={32} />
              <CheckRow t={t} at={140.06} text="Time zones" size={32} />
              <CheckRow t={t} at={141.42} text="Easy to read" size={32} />
              <CheckRow t={t} at={144.46} text="Paul Smart at the opening" size={32} />
              <CheckRow t={t} at={147.34} text="End card on for 3s+" size={32} />
            </div>
          </div>
        </div>
      </Scene>

      {/* 15 — Export button */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={151.26}
          src={shot('10-time-zone-scene')}
          cam={[{ at: 151.4, x: 1500, y: 820, s: 2.2, dur: 1.0 }]}
          cursor={[{ at: 151.3, x: 1300, y: 650 }, { at: 152.0, x: 1620, y: 858, click: true, dur: 0.7 }]}
          rings={[{ at: 152.7, x: 1604, y: 842, w: 34, h: 34, spot: true }]}
          steps={[{ at: 152.7, text: 'Export, in the playback controls' }]}
        />
      </Scene>

      {/* 16 — Export settings */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={154.62}
          src={shot('12-export-menu')}
          cam={[{ at: 154.7, x: 1372, y: 500, s: 2.0, dur: 1.0 }]}
          cursor={[
            { at: 154.8, x: 1300, y: 300 },
            { at: 155.0, x: 1460, y: 400, click: true, dur: 0.5 },
            { at: 158.1, x: 1523, y: 444, click: true, dur: 0.5 },
            { at: 159.3, x: 1458, y: 488, click: true, dur: 0.5 },
            { at: 160.8, x: 1398, y: 532, click: true, dur: 0.5 },
            { at: 162.2, x: 1524, y: 650, click: true, dur: 0.5 },
          ]}
          rings={[
            { at: 155.26, until: 158.4, x: 1414, y: 386, w: 94, h: 28 },
            { at: 158.62, until: 159.7, x: 1494, y: 431, w: 60, h: 26 },
            { at: 159.82, until: 161.2, x: 1428, y: 475, w: 62, h: 26 },
            { at: 161.34, until: 162.5, x: 1371, y: 519, w: 56, h: 26 },
            { at: 162.7, x: 1493, y: 636, w: 64, h: 28, spot: true },
          ]}
          steps={[
            { at: 155.26, text: 'MP4 video' },
            { at: 158.62, text: '1080p · 30 fps · High quality' },
            { at: 162.7, text: 'Export' },
          ]}
        />
      </Scene>

      {/* 17 — Save file */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={164.06}
          src={shot('13-mp4-ready-to-save')}
          cam={[{ at: 164.06, x: 1372, y: 500, s: 2.0, dur: 0.01 }, { at: 164.4, x: 1372, y: 500, s: 1.6, dur: 1.2 }]}
          cursor={[{ at: 164.3, x: 1520, y: 650 }, { at: 169.1, x: 1527, y: 565, click: true, dur: 0.7 }]}
          rings={[
            { at: 168.22, until: 169.6, x: 1170, y: 454, w: 286, h: 32 },
            { at: 169.78, x: 1482, y: 546, w: 90, h: 38, spot: true },
          ]}
          steps={[
            { at: 164.3, text: 'Keep the page open and in front while it renders' },
            { at: 169.78, text: 'Save file' },
          ]}
        />
      </Scene>

      {/* 18 — MP4 ready */}
      <Scene t={t} index={17}>
        <div className="kit-label" style={enter(t, 171.4, { y: 14 })}>Ready to share</div>
        <div className="kit-row" style={{ gap: 30, marginTop: 20, ...enter(t, 171.5, { y: 24, easing: BACK }) }}>
          <div className="kit-card kit-row kit-ui" style={{ gap: 26, padding: '34px 40px', boxShadow: '0 20px 50px rgba(0,0,0,.08)' }}>
            <div style={{ width: 90, height: 110, borderRadius: 14, background: INK, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 26 }}>MP4</div>
            <div>
              <div style={{ fontSize: 38, fontWeight: 600 }}>beyond-ai-tools-paul-smart.mp4</div>
              <div style={{ fontSize: 26, color: MUTED, marginTop: 8 }}>1080p · 30 fps · 15 seconds</div>
            </div>
            <div style={{ marginLeft: 20, transform: `scale(${prog(t, 172.4, 0.5, BACK)})` }}>
              <Check size={60} />
            </div>
          </div>
        </div>
        <div className="kit-h3" style={{ marginTop: 50, ...enter(t, 173.26, { y: 16 }) }}>
          One <span className="kit-mark" style={markStyle(t, 173.26)}>final review</span> before it goes out.
        </div>
      </Scene>

      {/* 19 — Prompt tips */}
      <Scene t={t} index={18}>
        <div className="kit-label" style={enter(t, 175.6, { y: 14 })}>Practical tips</div>
        <div className="kit-row" style={{ gap: 60, alignItems: 'flex-start' }}>
          <div className="kit-card" style={{ width: 800, padding: 44, ...enter(t, 177.34, { y: 24 }) }}>
            <div className="kit-h3">
              In your <span className="kit-mark" style={markStyle(t, 177.66)}>first prompt</span>, specify:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 30 }}>
              <CheckRow t={t} at={179.42} text="The audience" size={32} />
              <CheckRow t={t} at={180.46} text="The duration" size={32} />
              <CheckRow t={t} at={181.26} text="The style" size={32} />
              <CheckRow t={t} at={182.14} text="Content that must appear" size={32} />
            </div>
          </div>
          <div className="kit-card" style={{ width: 800, padding: 44, ...enter(t, 183.82, { y: 24 }) }}>
            <div className="kit-h3">
              Then make <span className="kit-mark" style={markStyle(t, 184.54)}>small, targeted</span> refinements
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 34 }}>
              <Pill t={t} at={186.7}>Adjust timing</Pill>
              <Pill t={t} at={188.1}>Add a name</Pill>
              <Pill t={t} at={189.18}>Fix text placement</Pill>
            </div>
          </div>
        </div>
      </Scene>

      {/* 20 — Check before you publish */}
      <Scene t={t} index={19}>
        <div className="kit-label" style={enter(t, 190.8, { y: 14 })}>Before you publish</div>
        <div className="kit-h2" style={enter(t, 190.9, { dur: 0.8, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 191.26)}>Always check</span> the details.
        </div>
        <div className="kit-row" style={{ gap: 16, marginTop: 50, flexWrap: 'wrap' }}>
          <Pill t={t} at={191.58} on={191.9}>Names</Pill>
          <Pill t={t} at={192.54} on={192.8}>Dates</Pill>
          <Pill t={t} at={193.02} on={193.3}>Logos</Pill>
          <Pill t={t} at={193.98} on={194.2}>Timing</Pill>
          <Pill t={t} at={194.62} on={194.9}>Readability</Pill>
        </div>
        <div className="kit-row" style={{ gap: 40, marginTop: 60, ...enter(t, 196.78, { y: 20 }) }}>
          {[false, true].map((sharp) => (
            <div key={String(sharp)} className="kit-card" style={{ width: 380, height: 170, display: 'grid', placeItems: 'center', borderColor: sharp ? GREEN : LINE, opacity: sharp ? 0.3 + 0.7 * prog(t, 197.66, 0.6) : 1 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 44, filter: sharp ? 'none' : 'blur(3.5px)' }}>Your logo</div>
                <div className="kit-ui" style={{ marginTop: 8, fontSize: 20, color: sharp ? GREEN : MUTED, fontWeight: 600 }}>{sharp ? 'High resolution' : 'Low resolution'}</div>
              </div>
            </div>
          ))}
          <div className="kit-body" style={{ width: 520, ...enter(t, 199.26, { y: 12 }) }}>
            Stays <span className="kit-mark" style={markStyle(t, 199.66)}>sharp</span> on the end card.
          </div>
        </div>
      </Scene>

      {/* 21 — Usage */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={201.1}
          src={shot('06-official-export-and-usage')}
          title="support.claude.com"
          cam={[{ at: 201.4, x: 960, y: 240, s: 1.8, dur: 1.2 }]}
          rings={[
            { at: 202.0, until: 205.6, x: 540, y: 250, w: 790, h: 28 },
            { at: 205.7, x: 540, y: 186, w: 840, h: 92, spot: true },
          ]}
          steps={[
            { at: 202.0, text: 'Longer or more complex animations use more capacity' },
            { at: 205.9, text: "Motion counts against your plan's usage limits" },
          ]}
        />
      </Scene>

      {/* 22 — Availability */}
      <Scene t={t} index={21} padStyle={{ opacity: 1 - prog(t, 224.6, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 209.7, { y: 14 })}>Availability</div>
        <div className="kit-h2" style={enter(t, 209.8, { dur: 0.8, y: 30 })}>
          In <span className="kit-mark" style={markStyle(t, 211.18)}>beta</span> on Team and Enterprise.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr 1fr', gap: 30, marginTop: 56 }}>
          <div className="kit-card" style={{ padding: 36, height: 300, ...enter(t, 211.82, { y: 30 }) }}>
            <div className="kit-h3">Team</div>
            <div className="kit-row kit-ui" style={{ gap: 18, marginTop: 40, fontSize: 30, ...enter(t, 213.78, { y: 12 }) }}>
              <Toggle on={1} /> On by default
            </div>
          </div>
          <div className="kit-card" style={{ padding: 36, height: 300, ...enter(t, 212.38, { y: 30 }) }}>
            <div className="kit-h3">Enterprise</div>
            <div className="kit-row kit-ui" style={{ gap: 18, marginTop: 40, fontSize: 30, ...enter(t, 216.14, { y: 12 }) }}>
              <Toggle on={prog(t, 217.9, 0.5, IN_OUT)} /> An owner turns it on
            </div>
            <div className="kit-ui" style={{ marginTop: 26, fontSize: 26, color: MUTED, ...enter(t, 219.14, { y: 10 }) }}>
              Organization settings › <span style={{ color: INK, fontWeight: 600 }}>Artifacts</span>
            </div>
          </div>
          <div className="kit-card" style={{ padding: 36, height: 300, background: '#FAFAF8', ...enter(t, 221.38, { y: 30 }) }}>
            <div className="kit-h3" style={{ color: MUTED }}>Individual plans</div>
            <div className="kit-row kit-ui" style={{ gap: 16, marginTop: 40, fontSize: 30, color: MUTED }}>
              <Cross size={32} /> Not yet available
            </div>
          </div>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const ClaudeMotion: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CLAUDE_MOTION_TITLE_FRAMES}>
      <TitleCardGreen label="CLAUDE" title="Claude Motion" />
    </Sequence>
    <Sequence from={CLAUDE_MOTION_TITLE_FRAMES}>
      <ClaudeMotionBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
