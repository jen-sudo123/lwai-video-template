import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
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
  Spark,
  enter,
  makeScene,
  markStyle,
  prog,
} from '../kit';

loadSerif();
loadSans();

// Claude Scheduled Tasks — custom screenshot demo (Lead with AI), built with src/kit.
// Every cue is in SECONDS of the VO (audio/claude-scheduled-tasks.mp3, Daan on ElevenLabs v4, 229.44s of
// speech), from the word timestamps in src/data/claude-scheduled-tasks.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
// Screenshots: claude-scheduled-tasks/images/NN-*.png, all 1920x958.
//
//  #  scene                                start   VO cue
//  0  Recurring work, no prompting          0.00   "Scheduled Tasks let Claude take care of…"
//  1  More than a reminder                  16.70  "And this goes beyond simple reminders."
//  2  This demo: Weekly Consulting Brief    25.90  "In this demo, I'll create…"
//  3  Two ways (menu)                       32.00  "There are two ways…"
//  4  Manual setup modal                    36.50  "…defining the instructions, permissions…"
//  5  Create with Claude + click path       41.30  "Or you can create it with Claude…"
//  6  Ask in a conversation                 52.20  "You can also ask for a scheduled task…"
//  7  The request, what / when / result     56.60  "Here's my request…"
//  8  Follow-up questions                   86.10  "Claude may ask a few follow-up questions…"
//  9  Review panel                          90.60  "Next, I'll review the name…"
//  10 Proposed 7:34                         102.60 "This review matters…"
//  11 Corrected to 8:00                     109.10 "If that happens, just ask…"
//  12 On-the-hour warning                   114.00 "Even then, tasks set on the hour…"
//  13 Click Schedule                        122.50 "Once everything looks right…"
//  14 Task created                          125.20 "Claude creates the recurring task…"
//  15 Task details                          129.85 "Now I'll open Weekly Consulting Brief…"
//  16 Paused                                144.10 "…pauses…"
//  17 Resumed                               144.95 "…and resumes it."
//  18 Options menu                          145.95 "The options menu also has…"
//  19 Run now                               150.05 "Before relying on it every Monday…"
//  20 Run started                           153.95 "Claude starts a separate run…"
//  21 Saved instructions                    155.70 "…using the saved instructions."
//  22 Check three things                    157.55 "When it finishes…"
//  23 A head start on Monday                172.30 "Now I have a recurring brief…"
//  24 Keep in mind                          177.90 "A few things to keep in mind."
//  25 Paid plans (support article)          180.00 "First, Scheduled Tasks are available…"
//  26 Cloud vs local                        191.00 "Second, cloud scheduled tasks…"
//  27 Permissions / Auto mode               205.40 "Third, a scheduled task uses…"
//  28 Closing                               219.20 "And finally…"

export const CLAUDE_SCHEDULED_TASKS_DURATION_S = 231.0;
export const CLAUDE_SCHEDULED_TASKS_TITLE_FRAMES = 90;

const STARTS = [
  0, 16.7, 25.9, 32.0, 36.5, 41.3, 52.2, 56.6, 86.1, 90.6, 102.6, 109.1, 114.0, 122.5, 125.2, 129.85, 144.1, 144.95,
  145.95, 150.05, 153.95, 155.7, 157.55, 172.3, 177.9, 180.0, 191.0, 205.4, 219.2,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;

// Browser previews can inject screenshots (data URIs) via globalThis.CST_SHOTS; renders use public/.
const shot = (n: string): string =>
  (globalThis as { CST_SHOTS?: Record<string, string> }).CST_SHOTS?.[n] ?? staticFile(`claude-scheduled-tasks/images/${n}.png`);

// ── Small pieces ───────────────────────────────────────────────────────────
const Chip: React.FC<{ t: number; at: number; children: React.ReactNode; hot?: number }> = ({ t, at, children, hot = 0 }) => (
  <div
    className="kit-ui"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '10px 20px',
      borderRadius: 999,
      fontSize: 25,
      fontWeight: 500,
      background: hot > 0.5 ? LIME_SOFT : '#fff',
      border: `2px solid ${hot > 0.5 ? LIME : LINE}`,
      ...enter(t, at, { y: 0, scale: 0.7, dur: 0.45, easing: BACK }),
    }}
  >
    {children}
  </div>
);

const ClockIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="10" fill={LIME_SOFT} stroke={GREEN} strokeWidth="1.6" />
    <path d="M12 6.5V12l3.6 2.2" stroke={GREEN} strokeWidth="1.8" fill="none" strokeLinecap="round" />
  </svg>
);
const CloudIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M7 18.5h10.5a4 4 0 00.6-7.95A5.5 5.5 0 007.6 9.1 4.7 4.7 0 007 18.5z" fill={LIME_SOFT} stroke={GREEN} strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const LaptopIcon: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <rect x="4" y="5" width="16" height="11" rx="1.5" fill="#F4F5F1" stroke="#8A8A82" strokeWidth="1.4" />
    <path d="M2 18.5h20" stroke="#8A8A82" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const Row: React.FC<{ t: number; at: number; children: React.ReactNode; icon?: React.ReactNode; size?: number }> = ({ t, at, children, icon, size = 32 }) => (
  <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: size, ...enter(t, at, { x: -24, y: 0 }) }}>
    {icon ?? <Check size={size} />}
    <span>{children}</span>
  </div>
);

// ── Body ───────────────────────────────────────────────────────────────────
const Body: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/claude-scheduled-tasks.mp3')} />}

      {/* 0 — Recurring work, without the prompting */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Claude Scheduled Tasks</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Recurring work, <span className="kit-mark" style={markStyle(t, 3.3)}>without the prompting.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44, marginTop: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {(
              [
                ['Research industry news', 8.0],
                ['Summarize team updates', 9.6],
                ['Prepare a report', 11.44],
              ] as const
            ).map(([label, at], i) => {
              const merge = prog(t, 13.0, 0.9, IN_OUT);
              return (
                <div key={label} style={enter(t, at, { x: -40, y: 0, easing: BACK })}>
                  <div className="kit-pill" style={{ transform: `translate(${merge * 90}px, ${merge * (1 - i) * 30}px) scale(${1 - merge * 0.2})`, opacity: 1 - merge * 0.7 }}>
                    <span style={{ color: MUTED, fontWeight: 500, fontSize: 22 }}>Every week</span> {label}
                  </div>
                </div>
              );
            })}
          </div>
          <Arrow t={t} at={12.9} w={170} />
          <div className="kit-card" style={{ padding: '30px 40px', display: 'flex', flexDirection: 'column', gap: 18, ...enter(t, 13.36, { x: 40, y: 0, easing: BACK }) }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 36, fontWeight: 600 }}>
              <Spark size={36} /> Set it up once
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, color: GREEN, fontWeight: 600, ...enter(t, 15.52, { y: 12 }) }}>
              <ClockIcon size={34} /> Claude runs it automatically
            </div>
          </div>
        </div>
      </Scene>

      {/* 1 — More than a reminder */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 16.8, { y: 14 })}>Beyond reminders</div>
        <div className="kit-h2" style={enter(t, 16.9, { y: 30 })}>
          Not just a reminder. <span className="kit-mark" style={markStyle(t, 19.2)}>Finished work.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 70, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ padding: '26px 34px', width: 520, position: 'relative', ...enter(t, 17.3, { y: 20 }) }}>
            <div style={{ fontSize: 20, letterSpacing: '.1em', color: MUTED, fontWeight: 600 }}>REMINDER · MON 8:00</div>
            <div style={{ fontSize: 30, marginTop: 10, opacity: 1 - 0.55 * prog(t, 18.08, 0.5) }}>“Prepare the weekly brief”</div>
            <div style={{ position: 'absolute', right: -18, top: -18, ...enter(t, 18.08, { y: 0, scale: 0.4, easing: BACK }) }}>
              <Cross size={44} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <Row t={t} at={19.76}>Researches information</Row>
            <Row t={t} at={21.6}>Works with your connected tools</Row>
            <Row t={t} at={23.2}>Delivers finished outputs</Row>
            <div style={{ marginTop: 6, ...enter(t, 24.88, { y: 0, scale: 0.6, easing: BACK }) }}>
              <span className="kit-tag">On a schedule</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 2 — This demo */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 26.0, { y: 14 })}>In this demo</div>
        <div className="kit-card" style={{ padding: '50px 60px', display: 'flex', alignItems: 'center', gap: 44, alignSelf: 'flex-start', ...enter(t, 26.3, { y: 30 }) }}>
          <ClockIcon size={120} />
          <div>
            <div className="kit-h2">
              <span className="kit-mark" style={markStyle(t, 27.6)}>Weekly Consulting Brief</span>
            </div>
            <div className="kit-ui" style={{ fontSize: 34, color: MUTED, marginTop: 18, ...enter(t, 29.6, { y: 12 }) }}>
              Every Monday · 8:00 AM · for leadership prep
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Two ways (menu) */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={32.0}
          src={shot('02-create-options')}
          cam={[{ at: 32.6, x: 1480, y: 150, s: 2.6, dur: 1.0 }]}
          rings={[
            { at: 33.4, until: 35.1, x: 1400, y: 128, w: 172, h: 56 },
            { at: 35.28, x: 1400, y: 157, w: 150, h: 26, spot: true },
          ]}
          steps={[{ at: 35.28, text: 'Set up manually' }]}
        />
      </Scene>

      {/* 4 — Manual setup modal */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={36.5}
          src={shot('03-manual-setup')}
          cam={[{ at: 36.5, x: 960, y: 430, s: 1.55, dur: 0.01 }]}
          rings={[
            { at: 37.12, until: 38.0, x: 666, y: 277, w: 588, h: 140 },
            { at: 38.08, until: 39.1, x: 680, y: 428, w: 75, h: 26 },
            { at: 39.16, until: 39.7, x: 1122, y: 428, w: 120, h: 26 },
            { at: 39.68, x: 680, y: 588, w: 380, h: 30 },
          ]}
          steps={[
            { at: 37.12, text: 'Instructions' },
            { at: 38.08, text: 'Permissions' },
            { at: 39.16, text: 'Model' },
            { at: 39.68, text: 'Schedule' },
          ]}
        />
      </Scene>

      {/* 5 — Create with Claude + click path */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={30}
          src={shot('02-create-options')}
          cam={[
            { at: 41.3, x: 1480, y: 150, s: 2.6, dur: 0.01 },
            { at: 45.4, x: 960, y: 479, s: 1, dur: 0.9 },
          ]}
          cursor={[
            { at: 45.9, x: 900, y: 520 },
            { at: 46.0, x: 100, y: 201, click: true, dur: 0.6 },
            { at: 48.25, x: 1505, y: 103, click: true, dur: 0.6 },
            { at: 49.95, x: 1460, y: 142, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 42.08, until: 45.3, x: 1400, y: 129, w: 172, h: 26, spot: true },
            { at: 46.6, until: 48.4, x: 12, y: 188, w: 256, h: 26 },
            { at: 48.88, until: 50.0, x: 1477, y: 89, w: 100, h: 26 },
            { at: 50.56, x: 1400, y: 129, w: 172, h: 26 },
          ]}
          steps={[
            { at: 42.08, text: 'Create with Claude' },
            { at: 46.56, text: 'Scheduled' },
            { at: 48.88, text: 'New task' },
            { at: 50.56, text: 'Create with Claude' },
          ]}
        />
      </Scene>

      {/* 6 — Ask in a conversation */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={52.2}
          src={shot('04-conversation-prompt')}
          cam={[{ at: 52.6, x: 1100, y: 300, s: 1.6, dur: 1.2 }]}
          rings={[{ at: 53.9, x: 848, y: 80, w: 622, h: 70 }]}
          steps={[{ at: 52.72, text: 'Or ask in any conversation' }]}
        />
      </Scene>

      {/* 7 — The request: what / when / result */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={56.6}
          left={80}
          top={150}
          width={1000}
          src={shot('04-conversation-prompt')}
          cam={[
            { at: 56.6, x: 1100, y: 300, s: 1.6, dur: 0.01 },
            { at: 56.8, x: 1100, y: 868, s: 2.5, dur: 1.0 },
          ]}
          rings={[{ at: 57.9, x: 718, y: 842, w: 770, h: 66 }]}
        />
        <div style={{ position: 'absolute', left: 1150, top: 150, width: 690, display: 'flex', flexDirection: 'column', gap: 30 }}>
          {(
            [
              ['When', 80.76, [['Every Monday, 8 AM', 58.24], ['UTC+7', 60.08]]],
              ['What', 79.52, [['Search the web', 61.84], ['Past 7 days', 63.2], ['Consulting industry news', 64.0]]],
              ['Result', 84.4, [['5-bullet executive brief', 66.88], ['~150 words', 68.96], ['Source, date, link', 70.72], ['Facts vs analysis', 73.81], ['Flag unconfirmed', 75.8]]],
            ] as const
          ).map(([label, hotAt, chips]) => {
            const hot = prog(t, hotAt, 0.4);
            return (
              <div key={label} style={enter(t, (chips[0][1] as number) - 0.2, { y: 12 })}>
                <div
                  className="kit-ui"
                  style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: hot > 0.5 ? GREEN : MUTED, marginBottom: 12 }}
                >
                  {label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {chips.map(([c, at]) => (
                    <Chip key={c} t={t} at={at as number} hot={c === 'UTC+7' ? prog(t, 83.2, 0.3) : hot}>
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="kit-ui" style={{ fontSize: 28, color: INK, marginTop: 6, ...enter(t, 79.0, { y: 14 }) }}>
            Say <b>what</b> to do, <b>when</b> to do it, and <span className="kit-mark" style={markStyle(t, 84.4)}>what good looks like.</span>
          </div>
        </div>
      </Scene>

      {/* 8 — Follow-up questions */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={50}
          src={shot('04-conversation-prompt')}
          cam={[{ at: 86.1, x: 1065, y: 340, s: 2.0, dur: 0.01 }]}
          rings={[{ at: 86.72, x: 732, y: 222, w: 666, h: 230, spot: true }]}
          steps={[{ at: 86.72, text: 'Claude may ask follow-up questions' }]}
        />
      </Scene>

      {/* 9 — Review panel */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={90.6}
          src={shot('06-corrected-schedule-review')}
          cam={[{ at: 90.8, x: 1100, y: 690, s: 1.9, dur: 1.0 }]}
          rings={[
            { at: 91.6, until: 92.1, x: 735, y: 582, w: 560, h: 22 },
            { at: 92.16, until: 93.1, x: 735, y: 732, w: 735, h: 82 },
            { at: 93.2, until: 94.0, x: 735, y: 612, w: 560, h: 52 },
            { at: 94.08, until: 95.1, x: 735, y: 678, w: 420, h: 22 },
            { at: 96.0, until: 98.2, x: 735, y: 582, w: 560, h: 22, spot: true },
            { at: 99.12, x: 735, y: 612, w: 560, h: 52, spot: true },
          ]}
          steps={[
            { at: 91.12, text: 'Review before you approve' },
            { at: 96.0, text: 'Weekly Consulting Brief' },
            { at: 99.12, text: 'Every Monday at 8:00 AM, UTC+7' },
          ]}
        />
      </Scene>

      {/* 10 — Proposed 7:34 */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={90}
          src={shot('05-proposed-time-mismatch')}
          cam={[{ at: 102.6, x: 1100, y: 690, s: 1.9, dur: 0.01 }]}
          rings={[{ at: 106.08, x: 740, y: 628, w: 200, h: 26, spot: true }]}
          steps={[{ at: 106.08, text: 'Claude proposed 7:34 AM' }]}
        />
      </Scene>

      {/* 11 — Corrected to 8:00 */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={100}
          src={shot('06-corrected-schedule-review')}
          cam={[{ at: 109.1, x: 1150, y: 280, s: 1.9, dur: 0.01 }]}
          rings={[
            { at: 110.48, until: 112.0, x: 848, y: 166, w: 622, h: 110 },
            { at: 112.16, x: 760, y: 350, w: 500, h: 62, spot: true },
          ]}
          steps={[
            { at: 110.48, text: 'Ask for exactly 8:00 AM' },
            { at: 112.16, text: 'Corrected before approving' },
          ]}
        />
      </Scene>

      {/* 12 — On-the-hour warning */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={114.0}
          src={shot('09-saved-instructions-and-timing')}
          cam={[{ at: 114.3, x: 960, y: 610, s: 2.0, dur: 1.0 }]}
          rings={[
            { at: 114.72, until: 115.7, x: 682, y: 580, w: 490, h: 30 },
            { at: 115.76, x: 682, y: 628, w: 560, h: 44, spot: true },
          ]}
          steps={[
            { at: 115.76, text: 'On the hour can start a few minutes late' },
            { at: 119.52, text: 'A start time, not a delivery time' },
          ]}
        />
      </Scene>

      {/* 13 — Click Schedule */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={110}
          src={shot('06-corrected-schedule-review')}
          cam={[{ at: 122.5, x: 1150, y: 740, s: 1.9, dur: 0.01 }]}
          cursor={[
            { at: 122.7, x: 1050, y: 700 },
            { at: 123.6, x: 1395, y: 842, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 124.32, x: 1350, y: 828, w: 122, h: 26 }]}
          steps={[{ at: 124.32, text: 'Schedule' }]}
        />
      </Scene>

      {/* 14 — Task created */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={110}
          src={shot('07-task-created')}
          cam={[{ at: 125.2, x: 960, y: 479, s: 1, dur: 0.01 }, { at: 126.0, x: 900, y: 260, s: 1.6, dur: 1.2 }]}
          rings={[{ at: 127.36, x: 612, y: 145, w: 472, h: 115, spot: true }]}
          steps={[{ at: 127.36, text: 'Added to the Scheduled page' }]}
        />
      </Scene>

      {/* 15 — Task details */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={129.85}
          src={shot('08-task-details-run-now')}
          cam={[
            { at: 132.6, x: 1100, y: 240, s: 1.5, dur: 1.0 },
            { at: 141.6, x: 1470, y: 100, s: 2.6, dur: 0.8 },
          ]}
          rings={[
            { at: 130.48, until: 132.8, x: 616, y: 66, w: 300, h: 40 },
            { at: 133.88, until: 135.3, x: 616, y: 114, w: 196, h: 24 },
            { at: 135.44, until: 136.5, x: 616, y: 200, w: 556, h: 84 },
            { at: 136.56, until: 139.3, x: 1212, y: 200, w: 370, h: 76 },
            { at: 139.36, until: 142.0, x: 1212, y: 305, w: 290, h: 56 },
            { at: 142.64, x: 1488, y: 70, w: 96, h: 26 },
          ]}
          steps={[
            { at: 133.88, text: 'Next run' },
            { at: 135.44, text: 'Run history' },
            { at: 136.56, text: 'Edit instructions' },
            { at: 139.36, text: 'Change the schedule' },
            { at: 142.64, text: 'Enable schedule' },
          ]}
        />
      </Scene>

      {/* 16 — Paused */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={130}
          src={shot('12-paused-state')}
          cam={[{ at: 144.1, x: 1470, y: 100, s: 2.6, dur: 0.01 }]}
          rings={[{ at: 144.1, x: 1482, y: 70, w: 102, h: 26 }]}
        />
      </Scene>

      {/* 17 — Resumed */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={130}
          src={shot('13-resumed-state')}
          cam={[{ at: 144.95, x: 1470, y: 100, s: 2.6, dur: 0.01 }]}
          rings={[{ at: 144.95, x: 1488, y: 70, w: 96, h: 26 }]}
        />
      </Scene>

      {/* 18 — Options menu */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={130}
          src={shot('14-management-menu')}
          cam={[{ at: 145.95, x: 900, y: 150, s: 2.0, dur: 0.01 }, { at: 146.2, x: 650, y: 140, s: 2.6, dur: 0.9 }]}
          rings={[
            { at: 147.68, until: 148.4, x: 520, y: 50, w: 114, h: 24 },
            { at: 148.48, until: 149.4, x: 520, y: 78, w: 114, h: 24 },
            { at: 149.48, x: 520, y: 113, w: 114, h: 26, spot: true },
          ]}
          steps={[{ at: 147.68, text: 'Rename, Edit, Delete' }]}
        />
      </Scene>

      {/* 19 — Run now */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={150.05}
          src={shot('08-task-details-run-now')}
          cam={[{ at: 150.6, x: 1250, y: 160, s: 2.0, dur: 1.0 }]}
          cursor={[
            { at: 151.2, x: 1150, y: 300 },
            { at: 152.3, x: 1425, y: 84, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 153.0, x: 1386, y: 70, w: 96, h: 26 }]}
          steps={[{ at: 152.16, text: 'Test it with Run now' }]}
        />
      </Scene>

      {/* 20 — Run started */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={140}
          src={shot('10-manual-run-started')}
          rings={[
            { at: 154.4, x: 1545, y: 880, w: 358, h: 60 },
            { at: 154.88, x: 616, y: 238, w: 196, h: 26 },
          ]}
          steps={[{ at: 154.4, text: 'A separate run starts' }]}
        />
      </Scene>

      {/* 21 — Saved instructions */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={140}
          src={shot('11-run-web-research')}
          cam={[{ at: 155.7, x: 1000, y: 260, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 156.24, x: 684, y: 104, w: 626, h: 254, spot: true }]}
          steps={[{ at: 156.24, text: 'Runs on the saved instructions' }]}
        />
      </Scene>

      {/* 22 — Check three things */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={157.55}
          left={80}
          top={150}
          width={1000}
          src={shot('17-completed-brief')}
          cam={[{ at: 157.55, x: 1075, y: 400, s: 2.1, dur: 0.01 }]}
          rings={[
            { at: 162.56, until: 164.6, x: 735, y: 186, w: 690, h: 420 },
            { at: 165.6, until: 168.3, x: 733, y: 183, w: 310, h: 24 },
            { at: 169.52, x: 928, y: 278, w: 84, h: 22, spot: true },
          ]}
        />
        <div style={{ position: 'absolute', left: 1150, top: 170, width: 690 }}>
          <div className="kit-label" style={enter(t, 157.8, { y: 14 })}>Check three things</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 10 }}>
            {(
              [
                ['Did it follow the format?', 161.76, [['5 bullets', true, 163.4], ['207 words, over the 200 limit', false, 164.0]]],
                ['Relevant and current?', 164.8, [['Dated 9 to 11 Nov', true, 167.3]]],
                ['Do the sources support the claims?', 168.56, [['Core facts hold up', true, 170.6], ['Some analysis goes further', false, 171.2]]],
              ] as const
            ).map(([q, at, results], i) => (
              <div key={q} style={enter(t, at, { x: 30, y: 0 })}>
                <div className="kit-ui" style={{ display: 'flex', gap: 16, alignItems: 'baseline', fontSize: 34, fontWeight: 600 }}>
                  <span style={{ color: LIME, fontFamily: 'IBM Plex Serif', fontSize: 40 }}>{i + 1}</span> {q}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 10, marginLeft: 40 }}>
                  {results.map(([r, ok, rAt]) => (
                    <div key={r} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 25, color: ok ? INK : RED, ...enter(t, rAt as number, { x: -14, y: 0, dur: 0.4 }) }}>
                      {ok ? <Check size={26} /> : <Cross size={26} />} {r}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 23 — A head start on Monday */}
      <Scene t={t} index={23}>
        <div className="kit-label" style={enter(t, 172.4, { y: 14 })}>Every week</div>
        <div className="kit-h2" style={enter(t, 172.5, { y: 30 })}>
          A <span className="kit-mark" style={markStyle(t, 174.76)}>head start</span> on Monday prep.
        </div>
        <div style={{ display: 'flex', gap: 30, marginTop: 70 }}>
          {['Mon 16 Nov', 'Mon 23 Nov', 'Mon 30 Nov', 'Mon 7 Dec'].map((d, i) => (
            <div key={d} className="kit-card kit-ui" style={{ padding: '26px 30px', width: 380, ...enter(t, 173.1 + i * 0.45, { y: 30, easing: BACK }) }}>
              <div style={{ fontSize: 20, letterSpacing: '.1em', fontWeight: 700, color: MUTED, textTransform: 'uppercase' }}>{d} · 8:00</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 600, marginTop: 14 }}>
                <Check size={30} /> Brief ready
              </div>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[0.92, 0.8, 0.88, 0.7, 0.84].map((w, j) => (
                  <div key={j} style={{ height: 9, width: `${w * 100}%`, borderRadius: 9, background: j === 0 ? LIME_SOFT : '#EEEFEA' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 24 — Keep in mind */}
      <Scene t={t} index={24}>
        <div className="kit-label" style={enter(t, 178.0, { y: 14 })}>Practical considerations</div>
        <div className="kit-h1" style={enter(t, 178.1, { dur: 0.8, y: 30 })}>
          A few things to <span className="kit-mark" style={markStyle(t, 178.72)}>keep in mind.</span>
        </div>
      </Scene>

      {/* 25 — Paid plans (support article) */}
      <Scene t={t} index={25} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={180.0}
          title="support.claude.com"
          src={shot('15-official-availability')}
          cam={[{ at: 180.2, x: 950, y: 520, s: 1.45, dur: 1.0 }]}
          rings={[
            { at: 182.44, until: 185.3, x: 546, y: 410, w: 806, h: 48, spot: true },
            { at: 185.44, until: 188.1, x: 546, y: 548, w: 816, h: 96, spot: true },
            { at: 188.24, x: 546, y: 478, w: 816, h: 50, spot: true },
          ]}
          steps={[
            { at: 182.64, text: 'Paid Claude plans' },
            { at: 185.84, text: 'Varies by rollout' },
            { at: 188.8, text: 'Org access: admin settings' },
          ]}
        />
      </Scene>

      {/* 26 — Cloud vs local */}
      <Scene t={t} index={26}>
        <div className="kit-label" style={enter(t, 191.16, { y: 14 })}>Where it runs</div>
        <div style={{ display: 'flex', gap: 40, marginTop: 10 }}>
          {(
            [
              [<CloudIcon key="c" size={84} />, 'Cloud tasks', 191.76, [['Run while your computer sleeps', 194.88], ['Run with the desktop app closed', 196.16]]],
              [<LaptopIcon key="l" size={84} />, 'Local files or apps', 198.16, [['Your computer stays awake', 202.72], ['Claude Desktop stays open', 203.52]]],
            ] as const
          ).map(([icon, title, at, rows]) => (
            <div key={title} className="kit-card" style={{ flex: 1, padding: '44px 48px', ...enter(t, at, { y: 30 }) }}>
              {icon}
              <div className="kit-h3" style={{ marginTop: 18, fontSize: 52 }}>{title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
                {rows.map(([r, rAt]) => (
                  <Row key={r} t={t} at={rAt} size={30}>
                    {r}
                  </Row>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 27 — Permissions / Auto mode */}
      <Scene t={t} index={27} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={205.4}
          src={shot('03-manual-setup')}
          cam={[{ at: 205.8, x: 960, y: 470, s: 2.0, dur: 1.0 }]}
          rings={[
            { at: 208.08, until: 213.7, x: 666, y: 418, w: 590, h: 42 },
            { at: 214.16, until: 215.0, x: 678, y: 426, w: 80, h: 28, spot: true },
            { at: 215.04, x: 666, y: 476, w: 590, h: 66, spot: true },
          ]}
          steps={[
            { at: 208.08, text: 'Its tools, connectors and permissions' },
            { at: 214.16, text: 'Auto: no pausing for approval' },
          ]}
        />
      </Scene>

      {/* 28 — Closing */}
      <Scene t={t} index={28} padStyle={{ opacity: 1 - prog(t, 230.0, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 219.3, { y: 14 })}>Claude Scheduled Tasks</div>
        <div className="kit-h1" style={enter(t, 219.4, { dur: 0.9, y: 34 })}>
          Schedule the work. <span className="kit-mark" style={markStyle(t, 222.72)}>Still check it.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 70 }}>
          {(
            [
              ['Test the task', 223.6],
              ['Inspect the sources', 224.96],
              ['Refine the instructions', 226.24],
            ] as const
          ).map(([p, at]) => (
            <div key={p} className="kit-pill" style={enter(t, at, { y: 0, scale: 0.7, easing: BACK })}>
              <Check size={30} /> {p}
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
export const ClaudeScheduledTasks: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CLAUDE_SCHEDULED_TASKS_TITLE_FRAMES}>
      <TitleCardGreen label="CLAUDE" title="Scheduled Tasks" />
    </Sequence>
    <Sequence from={CLAUDE_SCHEDULED_TASKS_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
