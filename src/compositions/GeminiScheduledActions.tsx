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
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// Gemini Scheduled Actions — custom screenshot demo (Lead with AI), built with src/kit.
// One clock: t = VO seconds (audio/gemini-scheduled-actions.mp3, Daan on ElevenLabs v4, 279.36s of speech).
// Cues come from the Scribe word timestamps in src/data/gemini-scheduled-actions.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
// Screenshots: gemini-scheduled-actions/shots/*.jpg (1920x958, sidebar history + account blurred;
// 14 is 1906x433). Originals in gemini-scheduled-actions/images/.
//
// Scene 22 of the VO reads a second prompt ending "Keep the entire response under 200 words", which the
// real test (screenshot 05) did not include. Agreed fix: keep the audio, and keep the prompt bubble out of
// frame (camera stays on the composer, then the reply).
//
//  #  scene                         start   VO cue
//  0  Repetitive work               0.00    "Much of AI's value…"
//  1  In Gemini chats               13.60   "In this video, we'll focus on…"
//  2  Instruction + schedule        23.56   "A Scheduled Action combines…"
//  3  Setup                         32.24   "For a simple research briefing…"
//  4  Divider: create               42.40   "Let's create a weekly briefing."
//  5  Shot 02 prompt                44.85   "I open Gemini and start a regular chat."
//  6  Shot 03 confirmation          70.45   "Gemini confirms the schedule…"
//  7  Shot 04 details               76.92   "I check that it repeats weekly…"
//  8  Keep in mind                  95.52   "One thing to keep in mind."
//  9  Shot 07 Scheduled page        111.92  "To find the schedule…"
//  10 Unread + notification         124.80  "When a scheduled response is ready…"
//  11 Read + follow up              134.72  "I open the conversation…"
//  12 Divider: change               144.68  "Now, let's change the briefing."
//  13 Shot 05 change request        146.61  "I return to the original chat…"
//  14 Shot 08 verify                162.53  "Once it confirms, I open Scheduled…"
//  15 Word-limit drift              176.08  "That check matters."
//  16 Shot 06 stale card            187.57  "And if the card in the chat…"
//  17 Shot 08 inspect               193.28  "On the Scheduled page, I click…"
//  18 Shot 09 menu + pause          201.01  "The three-dot menu…"
//  19 Shot 10 paused                207.01  "It moves into the Paused section."
//  20 Shot 11 resume                212.16  "To start it again…"
//  21 Shot 12 active                215.00  "…returns to Active."
//  22 Shot 14 left paused           216.45  "For this demo, I'll leave it paused."
//  23 Use cases                     218.72  "So where are Scheduled Actions useful?"
//  24 Availability                  244.15  "A quick note on availability."
//  25 Start simple                  264.80  "Start with one simple recurring task."
//  26 Closing                       273.65  "The goal is simple…"

export const GEMINI_SCHEDULED_DURATION_S = 281.2;
export const GEMINI_SCHEDULED_TITLE_FRAMES = 90;

const STARTS = [
  0, 13.6, 23.56, 32.24, 42.4, 44.85, 70.45, 76.92, 95.52, 111.92, 124.8, 134.72, 144.68, 146.61, 162.53, 176.08,
  187.57, 193.28, 201.01, 207.01, 212.16, 215.0, 216.45, 218.72, 244.15, 264.8, 273.65,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;
const URL = 'gemini.google.com';

// Browser previews can inject the screenshots as data URIs via globalThis.GSA_SHOTS; renders use public/.
const shot = (n: string): string =>
  (globalThis as { GSA_SHOTS?: Record<string, string> }).GSA_SHOTS?.[n] ?? staticFile(`gemini-scheduled-actions/shots/${n}.jpg`);

// ── Small mocks ─────────────────────────────────────────────────────────────
const GeminiStar: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <defs>
      <linearGradient id="gsa-star" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#4C8DF6" />
        <stop offset="1" stopColor="#9B72CB" />
      </linearGradient>
    </defs>
    <path d="M12 1c.6 5.6 4.4 10.4 11 11-6.6.6-10.4 5.4-11 11-.6-5.6-4.4-10.4-11-11 6.6-.6 10.4-5.4 11-11z" fill="url(#gsa-star)" />
  </svg>
);

const ClockIcon: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = INK }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="9.5" fill="none" stroke={color} strokeWidth="1.8" />
    <path d="M12 6.8V12l3.4 2.2" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const Bars: React.FC<{ t: number; at: number; n: number; gap?: number; widths?: number[] }> = ({ t, at, n, gap = 0.18, widths }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 9, height: 9, borderRadius: 9, background: LIME, opacity: prog(t, at + i * gap, 0.3) }} />
        <div style={{ height: 14, borderRadius: 7, background: '#E9EBE4', width: `${(widths?.[i] ?? 80) * prog(t, at + i * gap, 0.5, IN_OUT)}%` }} />
      </div>
    ))}
  </div>
);

const Chip: React.FC<{ t: number; at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ t, at, children, style }) => (
  <div className="kit-pill" style={{ fontSize: 24, padding: '10px 20px', fontWeight: 500, ...enter(t, at, { y: 0, scale: 0.8, dur: 0.45, easing: BACK }), ...style }}>
    {children}
  </div>
);

const Divider: React.FC<{ t: number; at: number; label: string; title: React.ReactNode }> = ({ t, at, label, title }) => (
  <>
    <div className="kit-label" style={enter(t, at + 0.05, { y: 14 })}>{label}</div>
    <div className="kit-h1" style={enter(t, at + 0.15, { dur: 0.8, y: 30 })}>{title}</div>
  </>
);

// A floating confirmation/explainer pill laid over a screenshot scene
const Callout: React.FC<{ t: number; at: number; until?: number; children: React.ReactNode; top?: number; right?: number }> = ({ t, at, until, children, top = 120, right = 230 }) => {
  const out = until ? 1 - prog(t, until, 0.3) : 1;
  const st = enter(t, at, { y: -14, dur: 0.45 });
  return (
    <div style={{ position: 'absolute', top, right, zIndex: 5, ...st, opacity: (st.opacity as number) * out }}>
      <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 26px', background: '#fff', borderRadius: 999, border: `2px solid ${LIME}`, boxShadow: '0 14px 40px rgba(20,40,10,.18)', fontSize: 28, fontWeight: 600 }}>
        {children}
      </div>
    </div>
  );
};

// ── Body ────────────────────────────────────────────────────────────────────
const Body: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/gemini-scheduled-actions.mp3')} />}

      {/* 0 — Repetitive work */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Gemini Scheduled Actions</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Let AI handle the <span className="kit-mark" style={markStyle(t, 2.84)}>repetitive work.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 80 }}>
          <div style={{ position: 'relative', width: 560, height: 250 }}>
            {['Monday', 'Monday', 'Monday'].map((d, i) => {
              const fade = prog(t, 5.6, 0.6);
              return (
                <div
                  key={i}
                  className="kit-card kit-ui"
                  style={{
                    position: 'absolute',
                    left: i * 22,
                    top: i * 62,
                    width: 500,
                    padding: '16px 22px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    fontSize: 24,
                    boxShadow: '0 8px 24px rgba(0,0,0,.06)',
                    ...enter(t, [3.96, 4.4, 4.88][i], { y: -20, dur: 0.4 }),
                    filter: `grayscale(${fade})`,
                  }}
                >
                  <span className="kit-tag" style={{ fontSize: 14 }}>{d}</span>
                  <span style={{ color: MUTED }}>Same prompt, typed again</span>
                </div>
              );
            })}
            <div style={{ position: 'absolute', left: -10, top: 118, height: 6, borderRadius: 3, background: RED, width: `${prog(t, 5.36, 0.5, IN_OUT) * 580}px`, transform: 'rotate(-8deg)' }} />
          </div>
          <Arrow t={t} at={7.4} w={150} />
          <div className="kit-card" style={{ width: 600, padding: '30px 34px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 7.68, { scale: 0.8, y: 0, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <GeminiStar size={40} />
              <div className="kit-h3">Scheduled in Gemini</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
              {[
                ['Recurring AI work', 8.16],
                ['Directly in the app', 9.52],
                ['No complex workflow to build', 11.04],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 27, ...enter(t, at as number, { x: -18, y: 0 }) }}>
                  <Check size={30} /> {w as string}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 1 — In Gemini chats */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 13.7, { y: 14 })}>In this video</div>
        <div className="kit-h2" style={enter(t, 13.9, { dur: 0.8, y: 30 })}>
          Scheduled Actions in <span className="kit-mark" style={markStyle(t, 16.64)}>Gemini chats</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 70 }}>
          {[
            ['Weekly', 'Research summaries', 18.56],
            ['Daily', 'Briefings', 20.28],
            ['Regular', 'Learning prompts', 21.52],
          ].map(([tag, title, at]) => (
            <div key={title as string} className="kit-card" style={{ flex: 1, padding: '34px 34px 38px', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <ClockIcon size={44} color={GREEN} />
                <span className="kit-tag">{tag as string}</span>
              </div>
              <div className="kit-h3" style={{ marginTop: 30 }}>{title as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 — Instruction + schedule */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 23.66, { y: 14 })}>What it is</div>
        <div className="kit-h2" style={enter(t, 23.8, { dur: 0.8, y: 30 })}>
          An <span className="kit-mark" style={markStyle(t, 25.56)}>instruction</span> plus a <span className="kit-mark" style={markStyle(t, 26.32)}>schedule</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ width: 430, padding: '26px 30px', ...enter(t, 25.56, { y: 26 }) }}>
            <div className="kit-tag">Instruction</div>
            <div style={{ fontSize: 26, marginTop: 18, lineHeight: 1.4 }}>Review the week's consulting news. Five bullets, under 200 words.</div>
          </div>
          <div className="kit-h2" style={{ color: MUTED, ...enter(t, 26.0, { y: 0, scale: 0.6 }) }}>+</div>
          <div className="kit-card kit-ui" style={{ width: 360, padding: '26px 30px', ...enter(t, 26.32, { y: 26 }) }}>
            <div className="kit-tag">Schedule</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, marginTop: 18, fontWeight: 600 }}>
              <ClockIcon size={32} /> Monday, 8:00 AM
            </div>
            <div style={{ fontSize: 22, color: MUTED, marginTop: 8 }}>Repeats weekly</div>
          </div>
          <Arrow t={t} at={27.36} w={110} />
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '26px 30px', borderColor: GREEN, ...enter(t, 27.5, { y: 26 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 600 }}>
              <GeminiStar size={30} /> Ready in the app
            </div>
            <div style={{ marginTop: 20 }}>
              <Bars t={t} at={27.9} n={4} gap={0.45} widths={[92, 80, 86, 60]} />
            </div>
            <div className="kit-tag" style={{ marginTop: 20, ...enter(t, 30.6, { y: 0, scale: 0.7, easing: BACK }) }}>Automatic</div>
          </div>
        </div>
      </Scene>

      {/* 3 — Setup */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 32.34, { y: 14 })}>Setup</div>
        <div style={{ display: 'flex', gap: 40 }}>
          <div className="kit-card" style={{ flex: 1, padding: '40px 44px', ...enter(t, 32.48, { y: 30 }) }}>
            <div className="kit-h3">Simple research briefing</div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, marginTop: 40, fontWeight: 600, ...enter(t, 34.24, { scale: 0.7, y: 0, easing: BACK }) }}>
              <Check size={46} /> No setup needed
            </div>
          </div>
          <div className="kit-card" style={{ flex: 1.15, padding: '40px 44px', ...enter(t, 35.6, { y: 30 }) }}>
            <div className="kit-h3">Needs your apps?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
              {[
                ['Gmail', 37.52],
                ['Google Calendar', 38.56],
                ['Another app', 39.52],
              ].map(([app, at], i) => (
                <div key={app as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 30, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                  {app as string}
                  <Toggle on={prog(t, 40.44 + i * 0.2, 0.3, IN_OUT)} w={80} />
                </div>
              ))}
            </div>
            <div className="kit-tag" style={{ marginTop: 30, ...enter(t, 40.44, { y: 0, scale: 0.7, easing: BACK }) }}>Connect it first</div>
          </div>
        </div>
      </Scene>

      {/* 4 — Divider: create */}
      <Scene t={t} index={4}>
        <Divider t={t} at={42.4} label="Creating a Scheduled Action" title={<>Let's create a <span className="kit-mark" style={markStyle(t, 43.12)}>weekly briefing.</span></>} />
      </Scene>

      {/* 5 — Shot 02: new chat + prompt */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={44.85}
          imgH={IMG_H}
          ringStyle="line"
          title={URL}
          src={shot('02-demo-prompt')}
          cursor={[
            { at: 44.9, x: 700, y: 640 },
            { at: 45.2, x: 70, y: 76, click: true, dur: 0.7 },
            { at: 65.6, x: 1401, y: 565, click: true, dur: 0.7 },
          ]}
          cam={[{ at: 47.6, x: 1100, y: 500, s: 1.9, dur: 1.0 }]}
          rings={[
            { at: 45.4, until: 47.4, x: 10, y: 62, w: 268, h: 30 },
            { at: 49.28, until: 50.9, x: 796, y: 463, w: 170, h: 24, lines: [{x:798,y:484,w:167}], dur: 1.4 },
            { at: 50.92, until: 58.8, x: 966, y: 463, w: 405, h: 72, lines: [{x:968,y:484,w:367},{x:798,y:508,w:564},{x:798,y:532,w:60}], dur: 7.6 },
            { at: 58.88, until: 60.8, x: 858, y: 512, w: 190, h: 24, lines: [{x:860,y:532,w:186}], dur: 1.4 },
            { at: 63.28, until: 64.3, x: 966, y: 463, w: 405, h: 72, lines: [{x:968,y:484,w:367},{x:798,y:508,w:564},{x:798,y:532,w:60}], dur: 0.9 },
            { at: 64.4, until: 66.0, x: 796, y: 463, w: 170, h: 24, spot: true, lines: [{x:798,y:484,w:167}], dur: 0.6 },
          ]}
          steps={[
            { at: 45.2, text: 'Start a regular chat' },
            { at: 48.16, text: 'Say what you want, and when' },
            { at: 66.24, text: 'Submit' },
          ]}
        />
        <Callout t={t} at={49.3} until={50.8}>When: every Monday, 8 AM</Callout>
        <Callout t={t} at={51.0} until={58.7}>What: a five-bullet executive brief</Callout>
        <Callout t={t} at={58.9} until={60.7}>Limit: under 200 words</Callout>
        <Callout t={t} at={67.6}>
          <ClockIcon size={28} color={GREEN} /> Can take a few minutes
        </Callout>
      </Scene>

      {/* 6 — Shot 03: confirmation + card */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t}
          start={70.45}
          imgH={IMG_H}
          ringStyle="line"
          title={URL}
          src={shot('03-schedule-created')}
          cam={[{ at: 70.6, x: 1050, y: 330, s: 1.7, dur: 0.9 }]}
          cursor={[
            { at: 73.0, x: 1250, y: 560 },
            { at: 74.0, x: 905, y: 397, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 70.88, until: 72.6, x: 748, y: 262, w: 592, h: 24, lines: [{x:750,y:285,w:586}], dur: 1.5 },
            { at: 72.72, x: 752, y: 372, w: 358, h: 50 },
          ]}
          steps={[
            { at: 70.88, text: 'Gemini confirms the schedule' },
            { at: 74.24, text: 'Open the schedule card' },
          ]}
        />
      </Scene>

      {/* 7 — Shot 04: schedule details */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={76.12}
          imgH={IMG_H}
          ringStyle="line"
          title={URL}
          src={shot('04-monday-schedule-details')}
          cam={[
            { at: 76.92, x: 1050, y: 330, s: 1.7, dur: 0.01 },
            { at: 77.0, x: 1700, y: 470, s: 1.9, dur: 1.0 },
            { at: 81.2, x: 1710, y: 300, s: 2.1, dur: 0.9 },
            { at: 87.9, x: 1000, y: 430, s: 1.35, dur: 1.1 },
          ]}
          rings={[
            { at: 77.6, until: 81.2, x: 1530, y: 424, w: 345, h: 38 },
            { at: 78.96, until: 81.2, x: 1530, y: 477, w: 345, h: 38 },
            { at: 79.76, until: 81.2, x: 1530, y: 530, w: 345, h: 38 },
            { at: 82.0, until: 84.3, x: 1530, y: 208, w: 360, h: 152, lines: [{x:1546,y:245,w:262},{x:1546,y:269,w:296},{x:1546,y:293,w:241},{x:1546,y:317,w:309},{x:1546,y:341,w:44}], dur: 2.2 },
            { at: 84.48, until: 87.8, x: 1758, y: 250, w: 88, h: 20, lines: [{x:1770,y:269,w:72}], dur: 0.5 },
            { at: 86.16, until: 87.8, x: 1780, y: 298, w: 78, h: 44, lines: [{x:1782,y:317,w:73},{x:1546,y:341,w:44}], dur: 0.9 },
            { at: 88.4, x: 536, y: 372, w: 358, h: 50, spot: true },
          ]}
          steps={[
            { at: 77.6, text: 'Check the frequency' },
            { at: 81.36, text: 'Check the saved instructions' },
            { at: 88.4, text: 'Created straight from the chat' },
          ]}
        />
        <Callout t={t} at={90.96} until={93.0}>No separate confirmation step</Callout>
        <Callout t={t} at={93.12}>
          <Check size={30} /> Briefing scheduled
        </Callout>
      </Scene>

      {/* 8 — Keep in mind */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={enter(t, 95.62, { y: 14 })}>Keep in mind</div>
        <div className="kit-h2" style={enter(t, 95.8, { dur: 0.8, y: 30 })}>
          Prepared <span className="kit-mark" style={markStyle(t, 99.2)}>ahead of delivery</span>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 50, flexWrap: 'wrap' }}>
          <Chip t={t} at={101.12}>May miss last-minute news</Chip>
          <Chip t={t} at={103.12}>Timing can vary</Chip>
          <Chip t={t} at={104.48}>Usage limits can prevent a run</Chip>
        </div>
        <div style={{ display: 'flex', gap: 30, marginTop: 60 }}>
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '28px 34px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 32, fontWeight: 600, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 107.92, { y: 20 }) }}>
            <Check size={40} /> Regular briefings
          </div>
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '28px 34px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 32, fontWeight: 600, ...enter(t, 109.6, { y: 20 }) }}>
            <Cross size={40} /> Urgent, real-time alerts
          </div>
        </div>
      </Scene>

      {/* 9 — Shot 07: Scheduled page */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          t={t}
          start={111.92}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('07-active-list')}
          cursor={[
            { at: 112.0, x: 900, y: 560 },
            { at: 112.9, x: 82, y: 172, click: true, dur: 0.8 },
          ]}
          cam={[
            { at: 112.2, x: 520, y: 300, s: 1.6, dur: 0.9 },
            { at: 116.6, x: 960, y: 479, s: 1, dur: 0.9 },
            { at: 120.9, x: 1100, y: 330, s: 1.7, dur: 1.0 },
          ]}
          rings={[
            { at: 113.68, until: 116.6, x: 10, y: 157, w: 268, h: 32 },
            { at: 121.84, until: 123.3, x: 744, y: 298, w: 707, h: 86 },
            { at: 123.44, x: 772, y: 344, w: 158, h: 22 },
          ]}
          steps={[
            { at: 113.68, text: 'Open Scheduled in the sidebar' },
            { at: 121.84, text: 'Your schedules and their status' },
          ]}
        />
        <Callout t={t} at={117.36} until={120.7} top={140} right={700}>
          <span className="kit-mono" style={{ fontSize: 30 }}>gemini.google.com/scheduled</span>
        </Callout>
      </Scene>

      {/* 10 — Unread + notification */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={enter(t, 124.9, { y: 14 })}>When it's ready</div>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div className="kit-h3" style={{ marginBottom: 24, ...enter(t, 128.88, { y: 14 }) }}>Web app</div>
            <div className="kit-card kit-ui" style={{ padding: '18px 14px', ...enter(t, 125.2, { y: 26 }) }}>
              {['Project planning notes', 'Weekly consulting executive brief', 'Quarterly review draft'].map((c, i) => {
                const unread = i === 1 ? prog(t, 128.0, 0.4) : 0;
                return (
                  <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px', borderRadius: 12, fontSize: 27, fontWeight: unread > 0.5 ? 700 : 400, background: unread > 0.5 ? '#F3F6EF' : 'transparent' }}>
                    <div style={{ width: 14, height: 14, borderRadius: 14, background: LIME, opacity: unread, transform: `scale(${0.5 + unread * 0.5})` }} />
                    {c}
                  </div>
                );
              })}
            </div>
            <div className="kit-tag" style={{ marginTop: 22, ...enter(t, 128.0, { y: 0, scale: 0.7, easing: BACK }) }}>Marked unread</div>
          </div>
          <div style={{ width: 420, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="kit-h3" style={{ marginBottom: 24, ...enter(t, 130.2, { y: 14 }) }}>Mobile</div>
            <div style={{ width: 300, height: 520, borderRadius: 46, border: `10px solid ${INK}`, background: '#F4F5F1', position: 'relative', overflow: 'hidden', ...enter(t, 129.9, { y: 30 }) }}>
              <div style={{ position: 'absolute', top: 12, left: '50%', width: 90, height: 22, marginLeft: -45, borderRadius: 20, background: INK }} />
              <div
                className="kit-ui"
                style={{
                  position: 'absolute',
                  left: 12,
                  right: 12,
                  top: 50,
                  background: '#fff',
                  borderRadius: 18,
                  padding: '14px 16px',
                  boxShadow: '0 8px 22px rgba(0,0,0,.14)',
                  ...enter(t, 131.6, { y: -60, dur: 0.6, easing: BACK }),
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: MUTED, fontWeight: 600 }}>
                  <GeminiStar size={18} /> Gemini
                </div>
                <div style={{ fontSize: 19, marginTop: 6, lineHeight: 1.3 }}>Your weekly consulting executive brief is ready</div>
              </div>
            </div>
            <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 18, ...enter(t, 132.56, { y: 10 }) }}>Depends on notification settings</div>
          </div>
        </div>
      </Scene>

      {/* 11 — Read + follow up, every Monday */}
      <Scene t={t} index={11}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <div className="kit-label" style={enter(t, 134.82, { y: 14 })}>Read and follow up</div>
            <div className="kit-card kit-ui" style={{ padding: '28px 32px', ...enter(t, 135.0, { y: 26 }) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 26, fontWeight: 700 }}>
                <GeminiStar size={30} /> Weekly consulting executive brief
              </div>
              <div style={{ marginTop: 24 }}>
                <Bars t={t} at={136.5} n={5} gap={0.22} widths={[90, 78, 86, 70, 82]} />
              </div>
            </div>
            <div className="kit-card kit-ui" style={{ marginTop: 22, padding: '20px 24px', borderRadius: 999, fontSize: 25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...enter(t, 137.44, { y: 16 }) }}>
              <span style={{ color: t < 137.6 ? '#A8A8A8' : INK }}>{t < 137.6 ? 'Ask Gemini' : typed(t, 137.6, 'Which of these matters most for our clients?', 1.4)}</span>
              <span style={{ width: 40, height: 40, borderRadius: 40, background: '#4C8DF6', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22 }}>↑</span>
            </div>
          </div>
          <div style={{ width: 640 }}>
            <div className="kit-h3" style={enter(t, 139.6, { y: 16 })}>
              The useful part: <span className="kit-mark" style={markStyle(t, 141.2)}>nothing to remember.</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 34 }}>
              {['Mon', 'Mon', 'Mon', 'Mon'].map((d, i) => (
                <div key={i} className="kit-card kit-ui" style={{ flex: 1, padding: '18px 0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, fontSize: 24, fontWeight: 600, ...enter(t, 140.0 + i * 0.15, { y: 20 }) }}>
                  {d}
                  <div style={enter(t, 141.76 + i * 0.4, { y: 0, scale: 0.4, easing: BACK, dur: 0.4 })}>
                    <Check size={40} />
                  </div>
                </div>
              ))}
            </div>
            <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 24, ...enter(t, 142.64, { y: 10 }) }}>Same prompt, delivered every Monday</div>
          </div>
        </div>
      </Scene>

      {/* 12 — Divider: change */}
      <Scene t={t} index={12}>
        <Divider t={t} at={144.68} label="Changing a schedule" title={<>Now, let's <span className="kit-mark" style={markStyle(t, 145.44)}>change the briefing.</span></>} />
      </Scene>

      {/* 13 — Shot 05: change request (prompt bubble kept out of frame) */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          t={t}
          start={146.61}
          imgH={IMG_H}
          ringStyle="line"
          title={URL}
          src={shot('05-conversational-update')}
          cam={[
            { at: 146.61, x: 1050, y: 860, s: 2.4, dur: 0.01 },
            { at: 158.2, x: 1100, y: 400, s: 2.2, dur: 1.1 },
          ]}
          cursor={[
            { at: 146.8, x: 1300, y: 760 },
            { at: 147.6, x: 900, y: 876, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 159.2, until: 160.5, x: 748, y: 258, w: 465, h: 26, lines: [{x:750,y:282,w:461}], dur: 1.2 },
            { at: 160.64, x: 752, y: 368, w: 358, h: 50 },
          ]}
          steps={[
            { at: 148.4, text: 'Ask for the change in the same chat' },
            { at: 158.4, text: 'Gemini updates the existing schedule' },
          ]}
        />
        <Callout t={t} at={149.2} until={157.9}>Friday, 4 PM + emerging AI trends</Callout>
      </Scene>

      {/* 14 — Shot 08: verify on the Scheduled page */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          t={t}
          start={162.53}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('08-friday-persisted-details')}
          cursor={[
            { at: 162.7, x: 900, y: 620 },
            { at: 163.4, x: 82, y: 172, click: true, dur: 0.7 },
            { at: 164.9, x: 700, y: 340, click: true, dur: 0.7 },
          ]}
          cam={[
            { at: 166.6, x: 1700, y: 480, s: 1.9, dur: 1.0 },
            { at: 170.7, x: 1710, y: 300, s: 2.1, dur: 0.9 },
          ]}
          rings={[
            { at: 164.16, until: 165.3, x: 10, y: 157, w: 268, h: 32 },
            { at: 165.4, until: 166.7, x: 530, y: 298, w: 705, h: 86 },
            { at: 169.04, until: 170.7, x: 1530, y: 500, w: 345, h: 38 },
            { at: 169.76, until: 170.7, x: 1530, y: 553, w: 345, h: 38 },
            { at: 172.32, until: 174.2, x: 1543, y: 322, w: 325, h: 44, lines: [{x:1546,y:341,w:301},{x:1546,y:365,w:52}], dur: 1.3 },
            { at: 174.32, x: 1603, y: 346, w: 118, h: 22, lines: [{x:1606,y:365,w:108}], dur: 0.8 },
          ]}
          steps={[
            { at: 164.16, text: 'Reopen it from Scheduled' },
            { at: 166.88, text: 'Verify the new timing' },
            { at: 170.96, text: 'Verify the instructions and word limit' },
          ]}
        />
      </Scene>

      {/* 15 — Word-limit drift */}
      <Scene t={t} index={15}>
        <div className="kit-label" style={enter(t, 176.18, { y: 14 })}>During testing</div>
        <div className="kit-h2" style={enter(t, 176.3, { dur: 0.8, y: 30 })}>That check matters.</div>
        <div className="kit-card kit-ui" style={{ marginTop: 50, padding: '30px 36px', background: '#FBFBF8', ...enter(t, 177.68, { y: 26 }) }}>
          <div style={{ fontSize: 20, color: MUTED, fontWeight: 600, letterSpacing: '.1em' }}>SAVED PLAN</div>
          <div style={{ fontSize: 32, lineHeight: 1.45, marginTop: 12 }}>
            …followed by a dedicated section highlighting emerging AI trends, under{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              200
              <span style={{ position: 'absolute', left: -4, right: -4, top: '52%', height: 5, background: RED, transform: `scaleX(${prog(t, 179.2, 0.4, IN_OUT)})`, transformOrigin: 'left' }} />
            </span>{' '}
            <span style={{ color: RED, fontWeight: 700, display: 'inline-block', ...enter(t, 179.76, { y: -10, scale: 0.6, easing: BACK, dur: 0.5 }) }}>250</span> words.
          </div>
          <div className="kit-tag" style={{ marginTop: 18, background: '#FDE7DC', color: RED, ...enter(t, 182.6, { y: 0, scale: 0.7, easing: BACK }) }}>Not requested</div>
        </div>
        <p className="kit-body" style={{ marginTop: 44, fontSize: 40, ...enter(t, 184.04, { y: 16 }) }}>
          Always review the saved instructions <span className="kit-mark" style={markStyle(t, 186.32)}>after an edit.</span>
        </p>
      </Scene>

      {/* 16 — Shot 06: stale chat card */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          t={t}
          start={187.57}
          imgH={IMG_H}
          ringStyle="line"
          title={URL}
          src={shot('06-update-readback')}
          cam={[
            { at: 187.6, x: 1250, y: 450, s: 1.45, dur: 0.9 },
            { at: 190.6, x: 960, y: 479, s: 1, dur: 0.8 },
          ]}
          cursor={[
            { at: 190.7, x: 1000, y: 620 },
            { at: 191.3, x: 82, y: 172, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 187.92, until: 190.5, x: 536, y: 368, w: 358, h: 50 },
            { at: 189.6, until: 191.3, x: 1530, y: 477, w: 345, h: 91, spot: true },
            { at: 191.9, x: 10, y: 157, w: 268, h: 32 },
          ]}
          steps={[
            { at: 189.6, text: 'Card still shows the old details?' },
            { at: 190.72, text: 'Reopen it from Scheduled' },
          ]}
        />
      </Scene>

      {/* 17 — Shot 08: inspect name, plan, timing */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={193.28}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('08-friday-persisted-details')}
          cursor={[
            { at: 193.4, x: 900, y: 620 },
            { at: 194.0, x: 700, y: 340, click: true, dur: 0.7 },
          ]}
          cam={[{ at: 195.0, x: 1700, y: 400, s: 1.5, dur: 1.0 }]}
          rings={[
            { at: 194.7, until: 195.8, x: 530, y: 298, w: 705, h: 86 },
            { at: 196.08, until: 197.1, x: 1530, y: 98, w: 360, h: 52 },
            { at: 197.24, until: 199.5, x: 1530, y: 208, w: 360, h: 176, lines: [{x:1546,y:245,w:262},{x:1546,y:269,w:296},{x:1546,y:293,w:241},{x:1546,y:317,w:316},{x:1546,y:341,w:301},{x:1546,y:365,w:168}], dur: 2.0 },
            { at: 198.4, until: 199.5, x: 1526, y: 176, w: 34, h: 18 },
            { at: 200.0, x: 1530, y: 442, w: 360, h: 216 },
          ]}
          steps={[
            { at: 194.76, text: 'Click a schedule' },
            { at: 198.4, text: 'Instructions are labelled Plan' },
            { at: 200.0, text: 'Timing' },
          ]}
        />
      </Scene>

      {/* 18 — Shot 09: three-dot menu, pause */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t}
          start={200.21}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('09-management-menu')}
          cam={[
            { at: 201.01, x: 1700, y: 400, s: 1.5, dur: 0.01 },
            { at: 201.2, x: 1790, y: 170, s: 2.6, dur: 0.9 },
          ]}
          cursor={[
            { at: 201.1, x: 1700, y: 300 },
            { at: 201.3, x: 1821, y: 63, click: true, dur: 0.6 },
            { at: 204.9, x: 1812, y: 117, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 202.4, until: 203.8, x: 1765, y: 104, w: 105, h: 26 },
            { at: 203.92, until: 205.1, x: 1765, y: 176, w: 105, h: 26 },
            { at: 205.28, x: 1765, y: 104, w: 105, h: 26, spot: true },
          ]}
          steps={[
            { at: 201.4, text: 'Three-dot menu: pause, resume, delete' },
            { at: 205.28, text: 'Pause' },
          ]}
        />
      </Scene>

      {/* 19 — Shot 10: paused */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          t={t}
          start={206.21}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('10-paused-status')}
          cam={[{ at: 207.0, x: 880, y: 330, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 207.84, x: 530, y: 262, w: 706, h: 104 }]}
          steps={[
            { at: 207.84, text: 'Moved to Paused' },
            { at: 209.28, text: "Won't run until you resume it" },
          ]}
        />
      </Scene>

      {/* 20 — Shot 11: resume */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          t={t}
          start={211.36}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('11-resume-menu')}
          cam={[{ at: 212.16, x: 1790, y: 170, s: 2.6, dur: 0.01 }]}
          cursor={[
            { at: 212.3, x: 1700, y: 250 },
            { at: 212.9, x: 1815, y: 117, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 213.2, x: 1765, y: 104, w: 110, h: 26, spot: true }]}
          steps={[{ at: 212.4, text: 'Resume' }]}
        />
      </Scene>

      {/* 21 — Shot 12: active again */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          t={t}
          start={214.2}
          imgH={IMG_H}
          ringStyle="line"
          title={`${URL}/scheduled`}
          src={shot('12-resumed-status')}
          cam={[{ at: 215.0, x: 880, y: 330, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 215.52, x: 530, y: 262, w: 706, h: 124 }]}
          steps={[{ at: 215.52, text: 'Back to Active' }]}
        />
      </Scene>

      {/* 22 — Shot 14: left paused */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          t={t}
          start={216.45}
          imgW={1906}
          imgH={433}
          ringStyle="line"
          top={250}
          title={URL}
          src={shot('14-chat-card-paused')}
          cam={[{ at: 216.45, x: 860, y: 330, s: 2.0, dur: 0.01 }]}
          rings={[{ at: 217.76, x: 1023, y: 377, w: 62, h: 26 }]}
          steps={[{ at: 217.76, text: 'Left paused for this demo' }]}
        />
      </Scene>

      {/* 23 — Use cases */}
      <Scene t={t} index={23}>
        <div className="kit-label" style={enter(t, 218.82, { y: 14 })}>Good starting points</div>
        <div className="kit-h2" style={enter(t, 219.0, { dur: 0.8, y: 30 })}>
          Where Scheduled Actions are <span className="kit-mark" style={markStyle(t, 220.56)}>useful</span>
        </div>
        <div style={{ display: 'flex', gap: 30, marginTop: 50 }}>
          {[
            { title: 'Weekly research', at: 223.76, chips: [['Your industry', 225.92], ['Competitors', 226.8], ['Emerging trends', 227.92]] },
            { title: 'Daily preparation', at: 229.36, chips: [['Calendar summary', 231.04], ['Email summary', 231.6]], tag: ['Apps connected', 232.72] },
            { title: 'Regular learning', at: 234.32, chips: [['Weekly insights', 236.08], ['Practice questions', 237.4], ['Exercises', 238.36]] },
          ].map((c) => (
            <div key={c.title} className="kit-card" style={{ flex: 1, padding: '30px 30px 34px', ...enter(t, c.at, { y: 30, easing: BACK }) }}>
              <div className="kit-h3">{c.title}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}>
                {c.chips.map(([w, at]) => (
                  <Chip key={w as string} t={t} at={at as number} style={{ fontSize: 22, padding: '8px 18px' }}>
                    {w as string}
                  </Chip>
                ))}
              </div>
              {c.tag && <div className="kit-tag" style={{ marginTop: 18, ...enter(t, c.tag[1] as number, { y: 0, scale: 0.7, easing: BACK }) }}>{c.tag[0] as string}</div>}
            </div>
          ))}
        </div>
        <p className="kit-body" style={{ marginTop: 44, fontSize: 36, ...enter(t, 239.68, { y: 16 }) }}>
          Choose work that <span className="kit-mark" style={markStyle(t, 240.4)}>repeats regularly</span> and needs a <span className="kit-mark" style={markStyle(t, 242.64)}>consistent format.</span>
        </p>
      </Scene>

      {/* 24 — Availability */}
      <Scene t={t} index={24}>
        <div className="kit-label" style={enter(t, 244.25, { y: 14 })}>Plans and availability</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
          <div className="kit-card" style={{ padding: '30px 34px', ...enter(t, 249.04, { y: 26 }) }}>
            <div className="kit-h3">Personal Google accounts</div>
            <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 12, ...enter(t, 250.8, { y: 10 }) }}>Rolling out gradually, including free accounts</div>
          </div>
          <div className="kit-card" style={{ padding: '30px 34px', ...enter(t, 252.8, { y: 26 }) }}>
            <div className="kit-h3">Google Workspace</div>
            <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 12 }}>Supported on qualifying plans</div>
          </div>
          <div className="kit-card" style={{ padding: '30px 34px', ...enter(t, 255.76, { y: 26 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="kit-h3">Keep Activity</div>
              <Toggle on={prog(t, 257.2, 0.3, IN_OUT)} w={84} />
            </div>
            <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 12, ...enter(t, 258.64, { y: 10 }) }}>Must be on. Availability can depend on your account.</div>
          </div>
          <div className="kit-card" style={{ padding: '30px 34px', display: 'flex', alignItems: 'center', gap: 26, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 260.96, { y: 26 }) }}>
            <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 96, lineHeight: 1, color: GREEN, ...enter(t, 262.4, { y: 0, scale: 0.5, easing: BACK }) }}>10</div>
            <div>
              <div className="kit-h3">active schedules</div>
              <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 6, ...enter(t, 263.72, { y: 10 }) }}>Current limit for chats</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 25 — Start simple */}
      <Scene t={t} index={25}>
        <div className="kit-label" style={enter(t, 264.9, { y: 14 })}>Get started</div>
        <div className="kit-h2" style={enter(t, 265.0, { dur: 0.8, y: 30 })}>
          Start with <span className="kit-mark" style={markStyle(t, 265.76)}>one simple recurring task.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 56 }}>
          {[
            ['Describe the result you want', 267.72],
            ['Say when it should arrive', 269.28],
            ['Check the saved schedule and instructions', 271.08],
          ].map(([w, at], i) => (
            <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 38, ...enter(t, at as number, { x: -30, y: 0 }) }}>
              <span style={{ width: 58, height: 58, borderRadius: 58, background: LIME, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 28, flex: 'none' }}>{i + 1}</span>
              {w as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 26 — Closing */}
      <Scene t={t} index={26} padStyle={{ opacity: 1 - prog(t, 280.3, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 273.75, { y: 14 })}>Gemini Scheduled Actions</div>
        <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 273.95, { dur: 0.9, y: 34 }) }}>
          Stop repeatedly asking AI to do work <span className="kit-mark" style={markStyle(t, 277.8)}>you've already defined.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const GeminiScheduledActions: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={GEMINI_SCHEDULED_TITLE_FRAMES}>
      <TitleCardGreen label="GEMINI" title="Scheduled Actions" />
    </Sequence>
    <Sequence from={GEMINI_SCHEDULED_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
