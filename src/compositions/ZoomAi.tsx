import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
  AppWindow,
  BACK,
  Check,
  Cross,
  GREEN,
  INK,
  KIT_CSS,
  LIME_SOFT,
  LINE,
  MUTED,
  MenuList,
  RED,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// Zoom AI: Before, During, and After the Meeting — custom screenshot demo (Lead with AI).
// Built with the LWAI demo kit (src/kit). Every cue is in SECONDS of the VO (audio/zoom-ai.mp3, Daan on
// ElevenLabs v4, 275.96s), taken from the Scribe word timestamps in src/data/zoom-ai.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
// Screenshots: public/zoom-ai/images/NN.png (numbers match the Drive verification folder).
//   Web portal / ZoomMate shots are 1920x958. Desktop AI Companion panel: 24 is 800x1436, 28–31 are 400x718.
//
//  #  scene                         start   VO cue
//  1  Hook (Zoom logo)              0.00    "Zoom is already part of your day."
//  2  Before: two decisions         10.85   "I'm scheduling a launch readiness review…"
//  3  Schedule a Meeting (18)       20.95   "I sign in at zoom.us…"
//  4  Auto start Zoom AI (23)       28.95   "…scroll down to Zoom AI."
//  5  Who can ask (23 + options)    37.95   "First, who can ask questions…"
//  6  Who receives summary (23)     57.20   "Second, who receives the summary."
//  7  Summary template (23)         66.10   "Finally, the summary template."
//  8  Template list (02)            70.45   "…templates for different kinds of meetings…"
//  9  Save (23)                     82.55   "Then I save the meeting…"
//  10 Policies                      86.15   "These choices decide what AI can use…"
//  11 During: AI Companion (24)     92.15   "I join from the Zoom Workplace desktop app…"
//  12 The discussion                103.35  "We discuss the launch."
//  13 Unanswered questions (28)     123.45  "Partway through, I ask…"
//  14 Action items (29)             133.55  "Then I ask: What are the action items…"
//  15 Citation (30)                 148.85  "I opened the citation…"
//  16 Corrected (31)                153.85  "It corrected itself."
//  17 Check the evidence            155.45  "That's the habit worth building."
//  18 After: Summaries (32)         164.25  "After the meeting, I open Summaries…"
//  19 Two errors (33)               167.60  "The summary is well structured, but…"
//  20 Open in Docs (35)             180.45  "I select Open in Docs…"
//  21 Corrections (38)              183.55  "…mark Sam's deadline as not confirmed…"
//  22 Share (34)                    186.25  "…and then share it with the team."
//  23 ZoomMate attach (07)          190.35  "Now I want more than a recap."
//  24 Pick the meeting (40)         197.30  "I check the date…"
//  25 The brief prompt              201.15  "Then I ask: Create a one-page…"
//  26 Brief drafted (44)            219.75  "ZoomMate drafts the brief…"
//  27 Sam unconfirmed (45)          222.85  "It keeps Sam's deadline unconfirmed…"
//  28 No transcript (44)            225.30  "…notes that it had no transcript…"
//  29 Tagged evidence (46)          227.95  "Each point is tagged back to the summary…"
//  30 Your own assistant            236.60  "If you already use ChatGPT or Claude…"
//  31 Takeaway                      258.95  "So, set it up before the meeting…"
//  32 Close                         266.60  "A summary on its own doesn't move…"

export const ZOOM_AI_DURATION_S = 278.0;
export const ZOOM_AI_TITLE_FRAMES = 90;

const STARTS = [
  0, 10.85, 20.95, 28.95, 37.95, 57.2, 66.1, 70.45, 82.55, 86.15, 92.15, 103.35, 123.45, 133.55, 148.85, 153.85, 155.45,
  164.25, 167.6, 180.45, 183.55, 186.25, 190.35, 197.3, 201.15, 219.75, 222.85, 225.3, 227.95, 236.6, 258.95, 266.6,
];
const Scene = makeScene(STARTS, 0.5);

const WEB_H = 958;
const ZOOM_BLUE = '#0B5CFF';

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.ZOOM_AI_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { ZOOM_AI_SHOTS?: Record<string, string> }).ZOOM_AI_SHOTS?.[n] ?? staticFile(`zoom-ai/images/${n}.png`);

const ZoomLogo: React.FC<{ size: number; style?: React.CSSProperties }> = ({ size, style }) => (
  <Img src={shot('zoom-logo')} style={{ width: size, height: size, borderRadius: size * 0.28, display: 'block', ...style }} />
);

// Section eyebrow: BEFORE / DURING / AFTER
const Section: React.FC<{ t: number; at: number; text: string }> = ({ t, at, text }) => (
  <div className="kit-label" style={enter(t, at, { y: 14 })}>
    {text}
  </div>
);

// Desktop AI Companion panel (narrow window) on the right, text column on the left.
const PANEL_W = 470;
const PANEL_LEFT = 1920 - 80 - PANEL_W - 60;
const Panel: React.FC<{
  t: number;
  start: number;
  n: string;
  big?: boolean;
  rings?: React.ComponentProps<typeof AppWindow>['rings'];
  cam?: React.ComponentProps<typeof AppWindow>['cam'];
}> = ({ t, start, n, big, rings, cam }) => (
  <AppWindow
    t={t}
    start={start}
    src={shot(n)}
    imgW={big ? 800 : 400}
    imgH={big ? 1436 : 718}
    width={PANEL_W}
    left={PANEL_LEFT}
    top={70}
    title="Zoom Workplace"
    rings={rings}
    cam={cam}
  />
);
const LeftCol: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: 'absolute', left: 80, top: 0, bottom: 150, width: PANEL_LEFT - 80 - 90, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
);
const PromptCard: React.FC<{ t: number; at: number; text: string; dur: number; style?: React.CSSProperties }> = ({ t, at, text, dur, style }) => (
  <div className="kit-card kit-ui" style={{ padding: '26px 30px', borderRadius: 20, background: '#F5F8FF', borderColor: '#C9D8FF', fontSize: 32, lineHeight: 1.4, ...enter(t, at - 0.3, { y: 16 }), ...style }}>
    <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.12em', color: ZOOM_BLUE, marginBottom: 10 }}>I ASK</div>
    {typed(t, at, text, dur)}
    {t < at + dur && t >= at && <span style={{ display: 'inline-block', width: 2, height: 30, background: INK, marginLeft: 2, verticalAlign: -5 }} />}
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const ZoomAiBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/zoom-ai.mp3')} />}

      {/* 1 — Hook */}
      <Scene t={t} index={0}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 }}>
          <div style={enter(t, 0.0, { scale: 0.6, y: 0, easing: BACK, dur: 0.8 })}>
            <ZoomLogo size={210} style={{ boxShadow: '0 24px 60px rgba(11,92,255,.25)' }} />
          </div>
          <div>
            <div className="kit-label" style={{ ...enter(t, 0.4, { y: 14 }), marginBottom: 18 }}>Zoom AI</div>
            <div className="kit-h1" style={enter(t, 0.5, { dur: 0.9, y: 30 })}>
              Already part of <span className="kit-mark" style={markStyle(t, 1.7)}>your day.</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 28, marginTop: 90 }}>
          {[
            ['Capture what was discussed', 3.52],
            ["Flag what's unresolved", 5.24],
            ['Turn it into a decision', 8.4],
          ].map(([w, at], i) => (
            <div key={w as string} className="kit-card kit-ui" style={{ flex: 1, padding: '28px 30px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 600, borderColor: i === 2 && t >= 8.4 ? GREEN : LINE, background: i === 2 && t >= 8.4 ? LIME_SOFT : '#fff', ...enter(t, at as number, { y: 24, easing: BACK }) }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: ZOOM_BLUE, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 700, flex: 'none' }}>{i + 1}</span>
              {w as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 — Before: two decisions */}
      <Scene t={t} index={1}>
        <Section t={t} at={11.0} text="Before the meeting" />
        <div className="kit-h2" style={enter(t, 11.1, { dur: 0.8, y: 30 })}>
          Launch readiness review: <span style={{ color: MUTED }}>new customer portal</span>
        </div>
        <p className="kit-body" style={{ marginTop: 40, ...enter(t, 16.24, { y: 16 }) }}>Before it starts, I decide two things.</p>
        <div style={{ display: 'flex', gap: 36, marginTop: 44 }}>
          {[
            ['What AI can capture', 17.68, 'Questions, summary, template'],
            ['Who sees the results', 19.28, 'Who can ask, who gets the summary'],
          ].map(([h, at, sub]) => (
            <div key={h as string} className="kit-card" style={{ flex: 1, padding: '34px 40px', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <div className="kit-h3">{h as string}</div>
              <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 10 }}>{sub as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 3 — Schedule a Meeting (18) */}
      <Scene t={t} index={2} pad={false}>
        <AppWindow
          t={t}
          start={20.95}
          src={shot('18')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us"
          cam={[
            { at: 20.96, x: 1100, y: 300, s: 1.35, dur: 0.01 },
            { at: 22.9, x: 1300, y: 160, s: 1.35, dur: 1.0 },
            { at: 25.3, x: 760, y: 360, s: 1.6, dur: 1.1 },
          ]}
          cursor={[
            { at: 21.6, x: 1100, y: 420 },
            { at: 23.15, x: 1528, y: 72, click: true },
            { at: 25.4, x: 760, y: 302 },
            { at: 26.5, x: 640, y: 402 },
          ]}
          rings={[
            { at: 26.0, until: 26.8, x: 502, y: 286, w: 490, h: 31 },
            { at: 26.8, x: 502, y: 385, w: 529, h: 32 },
          ]}
          steps={[
            { at: 23.92, text: 'Schedule a Meeting' },
            { at: 26.0, text: 'Add a title, date and time' },
          ]}
        />
      </Scene>

      {/* 4 — Automatically start Zoom AI (23) */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          t={t}
          start={28.95}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[
            { at: 28.96, x: 760, y: 700, s: 1.3, dur: 0.01 },
            { at: 29.1, x: 740, y: 300, s: 1.75, dur: 1.2 },
          ]}
          cursor={[
            { at: 29.6, x: 760, y: 460 },
            { at: 30.3, x: 511, y: 201, click: true },
          ]}
          rings={[
            { at: 31.12, until: 36.3, x: 502, y: 190, w: 236, h: 22 },
            { at: 36.48, x: 546, y: 278, w: 418, h: 31 },
            { at: 36.72, x: 546, y: 378, w: 418, h: 31 },
          ]}
          steps={[
            { at: 30.72, text: 'Automatically start Zoom AI' },
            { at: 36.48, text: 'Two settings to check' },
          ]}
        />
      </Scene>

      {/* 5 — Who can ask questions (23 + options) */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={37.95}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          width={1040}
          left={80}
          top={130}
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 37.96, x: 740, y: 290, s: 2.0, dur: 0.01 }]}
          cursor={[{ at: 39.6, x: 900, y: 330 }, { at: 41.0, x: 860, y: 294 }]}
          rings={[{ at: 38.72, x: 546, y: 278, w: 418, h: 31, spot: true }]}
        />
        <div style={{ position: 'absolute', left: 1180, top: 170, width: 660 }}>
          <div className="kit-label" style={enter(t, 38.4, { y: 14 })}>Who can ask questions?</div>
          <MenuList
            items={[
              'All participants only from when they join',
              'All participants and invitees',
              'Participants and invitees in our organization',
              'Only meeting host',
            ]}
            active={t >= 54.4 ? 2 : t >= 50.32 ? 1 : t >= 41.56 ? 0 : -1}
            style={{ ...enter(t, 39.52, { y: 20 }) }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, ...enter(t, 41.56, { x: -20, y: 0 }) }}>
              <span className="kit-tag">Default</span> Only from when they join
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: RED, ...enter(t, 46.12, { x: -20, y: 0 }) }}>
              <Cross size={30} /> Late arrivals can't catch up
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, ...enter(t, 50.32, { x: -20, y: 0 }) }}>
              <Check size={30} /> Invitees can catch up on what they missed
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: MUTED, ...enter(t, 53.7, { x: -20, y: 0 }) }}>
              <Check size={30} color={GREEN} /> Sensitive topic? Keep it in your organization
            </div>
          </div>
        </div>
      </Scene>

      {/* 6 — Who receives the summary (23) */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={57.2}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 57.21, x: 740, y: 290, s: 1.75, dur: 0.01 }, { at: 57.5, x: 760, y: 380, s: 2.1, dur: 1.0 }]}
          cursor={[{ at: 58.6, x: 900, y: 440 }, { at: 60.2, x: 640, y: 394 }]}
          rings={[{ at: 58.08, x: 546, y: 378, w: 418, h: 31, spot: true }]}
          steps={[
            { at: 58.08, text: 'Who receives the summary' },
            { at: 60.56, text: 'Only meeting host: check it before you share' },
          ]}
        />
      </Scene>

      {/* 7 — Summary template (23) */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t}
          start={66.1}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 66.11, x: 760, y: 380, s: 2.1, dur: 0.01 }, { at: 66.4, x: 700, y: 480, s: 2.0, dur: 1.0 }]}
          cursor={[{ at: 67.0, x: 700, y: 540 }, { at: 68.8, x: 650, y: 484 }]}
          rings={[{ at: 67.28, x: 502, y: 467, w: 320, h: 32, spot: true }]}
          steps={[
            { at: 67.28, text: 'Meeting summary template' },
            { at: 69.4, text: 'Default: General template' },
          ]}
        />
      </Scene>

      {/* 8 — Template list (02) */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={70.45}
          src={shot('02')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 70.46, x: 680, y: 400, s: 1.65, dur: 0.01 }]}
          cursor={[{ at: 71.0, x: 760, y: 560 }, { at: 76.9, x: 640, y: 392, click: true }]}
          rings={[
            { at: 73.28, until: 77.6, x: 515, y: 238, w: 300, h: 38 },
            { at: 74.24, until: 77.6, x: 515, y: 284, w: 300, h: 38 },
            { at: 75.12, until: 77.6, x: 515, y: 330, w: 300, h: 38 },
            { at: 77.76, x: 515, y: 376, w: 300, h: 38, spot: true },
          ]}
          steps={[
            { at: 71.08, text: 'Templates for different kinds of meetings' },
            { at: 77.76, text: 'Project update: progress and next steps' },
          ]}
        />
      </Scene>

      {/* 9 — Save (23) */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={82.55}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 82.56, x: 640, y: 700, s: 1.6, dur: 0.01 }, { at: 82.7, x: 520, y: 820, s: 1.9, dur: 0.8 }]}
          cursor={[{ at: 82.7, x: 600, y: 760 }, { at: 83.0, x: 362, y: 918, click: true }]}
          rings={[{ at: 83.4, x: 332, y: 903, w: 60, h: 30, spot: true }]}
          steps={[
            { at: 83.12, text: 'Save the meeting' },
            { at: 84.08, text: 'Send the invite from your calendar' },
          ]}
        />
      </Scene>

      {/* 10 — Policies */}
      <Scene t={t} index={9}>
        <Section t={t} at={86.3} text="Before the meeting" />
        <div className="kit-h2" style={enter(t, 86.4, { dur: 0.8, y: 30 })}>
          These choices decide what AI <span className="kit-mark" style={markStyle(t, 88.32)}>can use</span>
          <br />
          and <span className="kit-mark" style={markStyle(t, 89.12)}>who sees it.</span>
        </div>
        <div className="kit-pill" style={{ marginTop: 60, alignSelf: 'flex-start', borderColor: GREEN, ...enter(t, 90.24, { y: 16, easing: BACK }) }}>
          <Check size={34} /> Follow your organization's policies
        </div>
      </Scene>

      {/* 11 — During: AI Companion (24) */}
      <Scene t={t} index={10} pad={false}>
        <LeftCol>
          <Section t={t} at={92.3} text="During the meeting" />
          <div className="kit-h2" style={enter(t, 92.4, { dur: 0.8, y: 30 })}>Join from the desktop app.</div>
          <p className="kit-body" style={{ marginTop: 34, ...enter(t, 94.24, { y: 16 }) }}>
            Zoom Workplace calls the panel <span className="kit-mark" style={markStyle(t, 97.28)}>AI Companion.</span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 40 }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, ...enter(t, 99.12, { x: -24, y: 0 }) }}>
              <Check size={34} /> Confirm it's running
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, ...enter(t, 100.48, { x: -24, y: 0 }) }}>
              <Check size={34} /> Tell participants AI is in use
            </div>
          </div>
        </LeftCol>
        <Panel
          t={t}
          start={92.15}
          n="24"
          big
          rings={[
            { at: 97.28, until: 99.0, x: 280, y: 66, w: 180, h: 44 },
            { at: 99.84, x: 254, y: 160, w: 246, h: 46 },
          ]}
        />
      </Scene>

      {/* 12 — The discussion */}
      <Scene t={t} index={11}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 820px', gap: 80, alignItems: 'center' }}>
          <div>
            <Section t={t} at={103.5} text="During the meeting" />
            <div className="kit-h2" style={enter(t, 103.6, { dur: 0.8, y: 30 })}>We discuss the launch.</div>
            <p className="kit-body" style={{ marginTop: 40, ...enter(t, 119.36, { y: 16 }) }}>
              Instead of taking notes, I <span className="kit-mark" style={markStyle(t, 121.28)}>run the discussion.</span>
            </p>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '30px 36px', ...enter(t, 104.0, { y: 30 }) }}>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '.12em', color: MUTED, marginBottom: 18 }}>LAUNCH READINESS REVIEW</div>
            {[
              ['Engineering', 'Two critical defects', 105.28, RED],
              ['Marketing', 'Needs a launch date', 108.08, '#B45309'],
              ['Support', "Training isn't finished", 109.84, '#B45309'],
              ['Approval', 'Launch not approved', 111.84, RED],
              ['Alex', 'Report on the defects · tomorrow', 113.92, GREEN],
              ['Sam', 'Confirm when training will be complete', 116.32, GREEN],
            ].map(([who, what, at, col]) => (
              <div key={who as string} style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '14px 0', borderTop: `2px solid ${LINE}`, fontSize: 28, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                <span style={{ width: 14, height: 14, borderRadius: '50%', background: col as string, flex: 'none' }} />
                <span style={{ width: 190, fontWeight: 700, flex: 'none' }}>{who as string}</span>
                <span>{what as string}</span>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 13 — Unanswered questions (28) */}
      <Scene t={t} index={12} pad={false}>
        <LeftCol>
          <Section t={t} at={123.6} text="During the meeting" />
          <PromptCard t={t} at={125.28} dur={2.0} text="What important questions remain unanswered?" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 40 }}>
            {[
              ['Launch date', 129.2],
              ['Defects', 130.24],
              ['Training', 131.2],
              ['Approval criteria', 132.12],
            ].map(([w, at]) => (
              <span key={w as string} className="kit-pill" style={{ fontSize: 26, ...enter(t, at as number, { y: 12, easing: BACK }) }}>
                {w as string}
              </span>
            ))}
          </div>
        </LeftCol>
        <Panel
          t={t}
          start={123.45}
          n="28"
          rings={[
            { at: 129.2, until: 133.2, x: 40, y: 196, w: 300, h: 44 },
            { at: 130.24, until: 133.2, x: 40, y: 258, w: 300, h: 44 },
            { at: 131.2, until: 133.2, x: 40, y: 320, w: 300, h: 44 },
            { at: 132.12, until: 133.2, x: 40, y: 384, w: 300, h: 26 },
          ]}
        />
      </Scene>

      {/* 14 — Action items (29) */}
      <Scene t={t} index={13} pad={false}>
        <LeftCol>
          <PromptCard t={t} at={134.72} dur={7.4} text="What are the action items, who owns each one, and what deadlines were explicitly stated? Do not invent missing deadlines." style={{ fontSize: 29 }} />
          <div className="kit-card kit-ui" style={{ marginTop: 34, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, borderColor: RED, ...enter(t, 145.2, { y: 16, easing: BACK }) }}>
            <Cross size={36} />
            <div>
              Sam: <b>"tomorrow"</b>
              <div style={{ fontSize: 22, color: RED, marginTop: 4, ...enter(t, 147.6, { y: 6 }) }}>Nobody set that deadline.</div>
            </div>
          </div>
        </LeftCol>
        <Panel
          t={t}
          start={133.55}
          n="29"
          rings={[
            { at: 136.0, until: 144.0, x: 14, y: 132, w: 350, h: 78 },
            { at: 145.52, x: 42, y: 355, w: 292, h: 36, spot: true },
          ]}
        />
      </Scene>

      {/* 15 — Citation (30) */}
      <Scene t={t} index={14} pad={false}>
        <LeftCol>
          <div className="kit-h2" style={enter(t, 149.0, { dur: 0.8, y: 30 })}>Open the citation.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 }}>
            <div className="kit-ui" style={{ fontSize: 30, ...enter(t, 151.6, { x: -20, y: 0 }) }}>
              <span className="kit-tag" style={{ marginRight: 14 }}>Said</span> what the transcript shows
            </div>
            <div className="kit-ui" style={{ fontSize: 30, ...enter(t, 152.6, { x: -20, y: 0 }) }}>
              <span className="kit-tag" style={{ marginRight: 14, background: '#FDE7D8' }}>Inferred</span> what AI assumed
            </div>
          </div>
        </LeftCol>
        <Panel
          t={t}
          start={148.85}
          n="30"
          rings={[
            { at: 149.84, until: 151.0, x: 6, y: 130, w: 318, h: 214 },
            { at: 151.04, x: 6, y: 300, w: 318, h: 24, spot: true },
          ]}
        />
      </Scene>

      {/* 16 — Corrected (31) */}
      <Scene t={t} index={15} pad={false}>
        <LeftCol>
          <div className="kit-h2" style={enter(t, 154.0, { dur: 0.8, y: 30 })}>
            It <span className="kit-mark" style={markStyle(t, 154.3)}>corrected itself.</span>
          </div>
        </LeftCol>
        <Panel t={t} start={153.85} n="31" rings={[{ at: 154.16, x: 20, y: 218, w: 312, h: 192, spot: true }]} />
      </Scene>

      {/* 17 — Check the evidence */}
      <Scene t={t} index={16}>
        <div className="kit-label" style={enter(t, 155.6, { y: 14 })}>The habit worth building</div>
        <div className="kit-h1" style={enter(t, 155.7, { dur: 0.9, y: 34 })}>
          Before it's confirmed, <span className="kit-mark" style={markStyle(t, 162.88)}>check the evidence.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 70 }}>
          {[
            ['Owner', 159.84],
            ['Deadline', 160.48],
            ['Decision', 161.12],
          ].map(([w, at]) => (
            <span key={w as string} className="kit-pill" style={enter(t, at as number, { y: 14, easing: BACK })}>
              AI-generated {(w as string).toLowerCase()}?
            </span>
          ))}
        </div>
      </Scene>

      {/* 18 — After: Summaries (32) */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={164.25}
          src={shot('32')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="zoom.us · Summaries"
          cam={[{ at: 164.26, x: 700, y: 420, s: 1.45, dur: 0.01 }]}
          cursor={[{ at: 165.0, x: 300, y: 600 }, { at: 165.8, x: 76, y: 286, click: true }, { at: 166.9, x: 438, y: 442 }]}
          rings={[{ at: 166.7, x: 336, y: 428, w: 1310, h: 28 }]}
          steps={[
            { at: 164.32, text: 'After the meeting: Summaries' },
            { at: 166.64, text: 'Open the new summary' },
          ]}
        />
      </Scene>

      {/* 19 — Two errors (33) */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t}
          start={167.6}
          src={shot('33')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="zoom.us · Meeting summary"
          cam={[
            { at: 167.61, x: 800, y: 600, s: 1.3, dur: 0.01 },
            { at: 170.8, x: 720, y: 560, s: 1.9, dur: 1.0 },
            { at: 175.0, x: 620, y: 780, s: 1.9, dur: 0.9 },
          ]}
          rings={[
            { at: 172.16, until: 174.9, x: 614, y: 536, w: 110, h: 24, spot: true },
            { at: 175.44, x: 604, y: 815, w: 70, h: 26, spot: true },
          ]}
          steps={[
            { at: 172.16, text: '"customer portion", not "customer portal"' },
            { at: 175.44, text: "Sam's invented deadline" },
            { at: 177.36, text: 'Only you received it, so fix it first' },
          ]}
        />
      </Scene>

      {/* 20 — Open in Docs (35) */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          t={t}
          start={180.45}
          src={shot('35')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Docs"
          cam={[{ at: 180.46, x: 760, y: 420, s: 1.35, dur: 0.01 }, { at: 182.2, x: 740, y: 360, s: 1.8, dur: 0.9 }]}
          rings={[{ at: 182.4, x: 717, y: 327, w: 126, h: 22, spot: true }]}
          steps={[
            { at: 181.2, text: 'Open in Docs' },
            { at: 182.4, text: 'Correct the wording' },
          ]}
        />
      </Scene>

      {/* 21 — Corrections (38) */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          t={t}
          start={183.55}
          src={shot('38')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Docs"
          cam={[{ at: 183.56, x: 760, y: 300, s: 1.5, dur: 0.01 }]}
          cursor={[{ at: 184.0, x: 900, y: 600 }, { at: 185.0, x: 862, y: 905, click: true }]}
          rings={[
            { at: 184.04, x: 424, y: 118, w: 662, h: 78, spot: true },
            { at: 184.6, x: 398, y: 452, w: 720, h: 40 },
          ]}
          steps={[{ at: 184.04, text: "Mark Sam's deadline as not confirmed" }]}
        />
      </Scene>

      {/* 22 — Share (34) */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          t={t}
          start={186.25}
          src={shot('34')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="zoom.us · Meeting summary"
          cam={[{ at: 186.26, x: 960, y: 470, s: 1.5, dur: 0.01 }]}
          cursor={[{ at: 186.4, x: 1100, y: 700 }, { at: 187.0, x: 840, y: 616 }]}
          rings={[{ at: 186.64, x: 736, y: 302, w: 448, h: 352, spot: true }]}
          steps={[
            { at: 186.64, text: 'Share it with the team' },
            { at: 188.08, text: 'The version people should rely on' },
          ]}
        />
      </Scene>

      {/* 23 — ZoomMate attach (07) */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          t={t}
          start={190.35}
          src={shot('07')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="ai.zoom.us"
          cam={[{ at: 190.36, x: 1100, y: 420, s: 1.3, dur: 0.01 }, { at: 195.4, x: 920, y: 420, s: 1.8, dur: 0.9 }]}
          cursor={[{ at: 194.5, x: 1100, y: 600 }, { at: 195.3, x: 789, y: 345, click: true }, { at: 196.3, x: 880, y: 425 }]}
          rings={[{ at: 196.32, x: 794, y: 411, w: 226, h: 28, spot: true }]}
          steps={[
            { at: 192.96, text: 'ZoomMate at ai.zoom.us' },
            { at: 196.32, text: 'Attach meetings & files' },
          ]}
        />
      </Scene>

      {/* 24 — Pick the meeting (40) */}
      <Scene t={t} index={23} pad={false}>
        <AppWindow
          t={t}
          start={197.3}
          src={shot('40')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="ai.zoom.us"
          cam={[{ at: 197.31, x: 960, y: 420, s: 1.55, dur: 0.01 }]}
          cursor={[{ at: 197.6, x: 1000, y: 520 }, { at: 199.8, x: 1345, y: 725, click: true }]}
          rings={[
            { at: 198.0, x: 788, y: 364, w: 120, h: 22, spot: true },
            { at: 199.6, until: 200.9, x: 788, y: 420, w: 125, h: 22 },
          ]}
          steps={[
            { at: 198.0, text: 'Check the date and time' },
            { at: 199.6, text: 'Same title, different meeting' },
          ]}
        />
      </Scene>

      {/* 25 — The brief prompt */}
      <Scene t={t} index={24}>
        <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 201.3, { y: 14 })}>ZoomMate prompt</div>
            <div className="kit-h2" style={enter(t, 201.4, { dur: 0.8, y: 30 })}>More than a recap.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 40 }}>
              {[
                ['Current status', 206.72],
                ['Critical risks', 208.04],
                ['Confirmed decisions', 209.2],
                ['Outstanding commitments', 210.4],
                ['A recommendation', 212.2],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                  <Check size={30} /> {w as string}
                </div>
              ))}
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '34px 40px', borderRadius: 22, background: '#F5F8FF', borderColor: '#C9D8FF', fontSize: 31, lineHeight: 1.5, ...enter(t, 201.8, { y: 24 }) }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.12em', color: ZOOM_BLUE, marginBottom: 12 }}>I ASK</div>
            Create a <b>one-page launch readiness brief</b> for senior leadership. Include current status, critical risks, confirmed decisions, outstanding commitments, and a recommendation.{' '}
            <span className="kit-mark" style={markStyle(t, 213.36)}>Separate agreed decisions from your recommendations,</span> and{' '}
            <span className="kit-mark" style={markStyle(t, 216.64)}>flag missing information rather than inventing it.</span>
          </div>
        </div>
      </Scene>

      {/* 26 — Brief drafted (44) */}
      <Scene t={t} index={25} pad={false}>
        <AppWindow
          t={t}
          start={219.75}
          src={shot('44')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 219.76, x: 960, y: 400, s: 1.3, dur: 0.01 }, { at: 220.8, x: 960, y: 330, s: 1.5, dur: 1.2 }]}
          rings={[{ at: 221.76, x: 590, y: 120, w: 640, h: 104 }]}
          steps={[{ at: 220.56, text: 'Drafted from the corrected summary' }]}
        />
      </Scene>

      {/* 27 — Sam unconfirmed (45) */}
      <Scene t={t} index={26} pad={false}>
        <AppWindow
          t={t}
          start={222.85}
          src={shot('45')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 222.86, x: 960, y: 290, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 223.44, x: 590, y: 254, w: 737, h: 72, spot: true }]}
          steps={[{ at: 223.44, text: "Sam's deadline stays unconfirmed" }]}
        />
      </Scene>

      {/* 28 — No transcript (44) */}
      <Scene t={t} index={27} pad={false}>
        <AppWindow
          t={t}
          start={225.3}
          src={shot('44')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 225.31, x: 960, y: 360, s: 1.7, dur: 0.01 }]}
          rings={[{ at: 225.44, x: 590, y: 282, w: 740, h: 138, spot: true }]}
          steps={[{ at: 226.24, text: 'No transcript to work from' }]}
        />
      </Scene>

      {/* 29 — Tagged evidence (46) */}
      <Scene t={t} index={28} pad={false}>
        <AppWindow
          t={t}
          start={227.95}
          src={shot('46')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 227.96, x: 960, y: 240, s: 1.55, dur: 0.01 }]}
          cursor={[{ at: 232.4, x: 1000, y: 500 }, { at: 233.6, x: 760, y: 330 }]}
          rings={[
            { at: 228.88, until: 232.8, x: 1288, y: 140, w: 40, h: 22 },
            { at: 229.1, until: 232.8, x: 1196, y: 176, w: 40, h: 22 },
            { at: 229.3, until: 232.8, x: 752, y: 236, w: 40, h: 22 },
            { at: 229.5, until: 232.8, x: 898, y: 376, w: 40, h: 22 },
          ]}
          steps={[
            { at: 228.88, text: '[MS] = tagged back to the meeting summary' },
            { at: 232.96, text: 'Refine it in Canvas before you share' },
          ]}
        />
      </Scene>

      {/* 30 — Your own assistant */}
      <Scene t={t} index={29}>
        <div className="kit-label" style={enter(t, 236.8, { y: 14 })}>A practical note</div>
        <div className="kit-h2" style={enter(t, 236.9, { dur: 0.8, y: 30 })}>Use Zoom with your own AI assistant.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 70 }}>
          <div className="kit-card" style={{ width: 400, padding: '30px 34px', display: 'flex', alignItems: 'center', gap: 24, ...enter(t, 239.76, { y: 24, easing: BACK }) }}>
            <ZoomLogo size={84} />
            <div>
              <div className="kit-h3">Zoom</div>
              <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 4, ...enter(t, 243.68, { y: 6 }) }}>Your meeting information</div>
            </div>
          </div>
          <Arrow t={t} at={240.3} w={200} label="Connect" />
          <div className="kit-card" style={{ width: 620, padding: '30px 34px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 237.6, { y: 24, easing: BACK }) }}>
            <div className="kit-h3">Your AI assistant</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              <span className="kit-pill" style={{ fontSize: 24, padding: '10px 22px', ...enter(t, 237.76, { y: 8, scale: 0.7, easing: BACK }) }}>ChatGPT</span>
              <span className="kit-pill" style={{ fontSize: 24, padding: '10px 22px', ...enter(t, 238.8, { y: 8, scale: 0.7, easing: BACK }) }}>Claude</span>
            </div>
            <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 18, ...enter(t, 245.92, { y: 8 }) }}>
              Alongside the rest of your business context
            </div>
          </div>
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 56, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, alignSelf: 'flex-start', ...enter(t, 248.48, { y: 16 }) }}>
          <span className="kit-tag">Business / Enterprise</span>
          Availability depends on your organization's setup.
          <span style={{ color: MUTED, ...enter(t, 254.96, { y: 0 }) }}>Can't find it? Ask IT or your admin.</span>
        </div>
      </Scene>

      {/* 31 — Takeaway */}
      <Scene t={t} index={30}>
        <div className="kit-label" style={enter(t, 259.1, { y: 14 })}>The takeaway</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 20 }}>
          {[
            ['Before', 'Set it up', 'Decide what AI captures and who sees it', 259.68],
            ['During', 'Let it keep track', 'You run the discussion', 261.28],
            ['After', 'Fix the summary first', 'Before anyone else sees it', 264.0],
          ].map(([k, h, sub, at]) => (
            <div key={k as string} className="kit-card" style={{ flex: 1, padding: '36px 38px', minHeight: 320, ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <span className="kit-tag">{k as string}</span>
              <div className="kit-h3" style={{ marginTop: 24, fontSize: 46 }}>{h as string}</div>
              <div className="kit-ui" style={{ fontSize: 26, color: MUTED, marginTop: 14 }}>{sub as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 32 — Close */}
      <Scene t={t} index={31} padStyle={{ opacity: 1 - prog(t, 276.6, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-h2" style={{ color: MUTED, ...enter(t, 266.8, { dur: 0.8, y: 24 }) }}>
          A summary on its own doesn't move the launch forward.
        </div>
        <div className="kit-h1" style={{ marginTop: 50, ...enter(t, 270.0, { dur: 0.9, y: 30 }) }}>
          Get to a <span className="kit-mark" style={markStyle(t, 271.44)}>decision faster.</span>
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 40, ...enter(t, 272.96, { y: 18 }) }}>
          And <span className="kit-mark" style={markStyle(t, 273.96)}>check what AI tells you</span> along the way.
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const ZoomAi: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={ZOOM_AI_TITLE_FRAMES}>
      <TitleCardGreen title="Zoom AI" />
    </Sequence>
    <Sequence from={ZOOM_AI_TITLE_FRAMES}>
      <ZoomAiBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
