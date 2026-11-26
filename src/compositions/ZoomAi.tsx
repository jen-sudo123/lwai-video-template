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
  IN_OUT,
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
// ElevenLabs v4, take 2 with 0.8s added before After, 270.37s), taken from the Scribe word timestamps in src/data/zoom-ai.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
// Screenshots: public/zoom-ai/images/NN.png (numbers match the Drive verification folder).
//   Web portal / ZoomMate shots are 1920x958. Desktop AI Companion panel: 24 is 800x1436, 28–31 are 400x718.
//
//  #  scene                                   start
//  1  Hook (Zoom logo)                         0
//  2  Before: two decisions                    10.69
//  3  Schedule a Meeting (18)                  20.52
//  4  Auto start Zoom AI (23)                  28.39
//  5  Who can ask (23 + options)               36.91
//  6  Who receives summary (23)                55.28
//  7  Summary template (23)                    63.94
//  8  Template list (02)                       68.05
//  9  Save (23)                                79.91
//  10 Policies                                 83.83
//  11 During: toolbar, open AI Companion (47)  90.6
//  12 Catch up: idle panel (24) -> recap (27)  101.6
//  13 Unanswered questions (28)                133.6
//  14 Action items + Sam flag (29)             138.35
//  15 Check the citation (30)                  147.9
//  16 After: Summaries (32)                    154.49
//  17 Two errors (33)                          157.84
//  18 Open in Docs (35)                        171.37
//  19 Corrections (38)                         174.35
//  20 Share (34)                               177.05
//  21 ZoomMate attach (07)                     181.43
//  22 Pick the meeting (40)                    188.66
//  23 The brief prompt                         192.59
//  24 Brief drafted (44)                       211.83
//  25 Sam unconfirmed (45)                     215.33
//  26 No transcript (44)                       217.86
//  27 Tagged evidence (46)                     220.55
//  28 Your own assistant                       229.32
//  29 Takeaway                                 251.87
//  30 Close                                    260.52

export const ZOOM_AI_DURATION_S = 272.0;
export const ZOOM_AI_TITLE_FRAMES = 90;

const STARTS = [
  0, 10.69, 20.52, 28.39, 36.91, 55.28, 63.94, 68.05, 79.91, 83.83, 90.6, 101.6, 133.6, 138.35, 147.9, 154.49, 157.84, 171.37, 174.35, 177.05, 181.43, 188.66, 192.59, 211.83, 215.33, 217.86, 220.55, 229.32, 251.87, 260.52,
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
            ['Capture what was discussed', 3.44],
            ["Flag what's unresolved", 5.24],
            ['Turn it into a decision', 8.16],
          ].map(([w, at], i) => (
            <div key={w as string} className="kit-card kit-ui" style={{ flex: 1, padding: '28px 30px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 30, fontWeight: 600, borderColor: i === 2 && t >= 8.16 ? GREEN : LINE, background: i === 2 && t >= 8.16 ? LIME_SOFT : '#fff', ...enter(t, at as number, { y: 24, easing: BACK }) }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: ZOOM_BLUE, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 700, flex: 'none' }}>{i + 1}</span>
              {w as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 — Before: two decisions */}
      <Scene t={t} index={1}>
        <Section t={t} at={10.84} text="Before the meeting" />
        <div className="kit-h2" style={enter(t, 10.94, { dur: 0.8, y: 30 })}>
          Launch readiness review: <span style={{ color: MUTED }}>new customer portal</span>
        </div>
        <p className="kit-body" style={{ marginTop: 40, ...enter(t, 16.08, { y: 16 }) }}>Before it starts, I decide two things.</p>
        <div style={{ display: 'flex', gap: 36, marginTop: 44 }}>
          {[
            ['What AI can capture', 17.6, 'Questions, summary, template'],
            ['Who sees the results', 19.2, 'Who can ask, who gets the summary'],
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
          start={20.52}
          src={shot('18')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us"
          cam={[
            { at: 20.53, x: 1100, y: 300, s: 1.35, dur: 0.01 },
            { at: 22.58, x: 1300, y: 160, s: 1.35, dur: 1.0 },
            { at: 24.98, x: 760, y: 360, s: 1.6, dur: 1.1 },
          ]}
          cursor={[
            { at: 21.4, x: 1100, y: 420 },
            { at: 22.83, x: 1528, y: 72, click: true },
            { at: 25.08, x: 760, y: 302 },
            { at: 25.94, x: 640, y: 402 },
          ]}
          rings={[
            { at: 25.44, until: 26.24, x: 502, y: 286, w: 490, h: 31 },
            { at: 26.24, x: 502, y: 385, w: 529, h: 32 },
          ]}
          steps={[
            { at: 23.6, text: 'Schedule a Meeting' },
            { at: 25.44, text: 'Add a title, date and time' },
          ]}
        />
      </Scene>

      {/* 4 — Automatically start Zoom AI (23) */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          t={t}
          start={28.39}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[
            { at: 28.4, x: 760, y: 700, s: 1.3, dur: 0.01 },
            { at: 28.54, x: 740, y: 300, s: 1.75, dur: 1.2 },
          ]}
          cursor={[
            { at: 29.04, x: 760, y: 460 },
            { at: 29.74, x: 511, y: 201, click: true },
          ]}
          rings={[
            { at: 30.32, until: 35.26, x: 502, y: 190, w: 236, h: 22 },
            { at: 35.44, x: 546, y: 278, w: 418, h: 31 },
            { at: 35.68, x: 546, y: 378, w: 418, h: 31 },
          ]}
          steps={[
            { at: 29.92, text: 'Automatically start Zoom AI' },
            { at: 35.44, text: 'Two settings to check' },
          ]}
        />
      </Scene>

      {/* 5 — Who can ask questions (23 + options) */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={36.91}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          width={1040}
          left={80}
          top={130}
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 36.92, x: 740, y: 290, s: 2.0, dur: 0.01 }]}
          cursor={[{ at: 38.32, x: 900, y: 330 }, { at: 39.96, x: 860, y: 294 }]}
          rings={[{ at: 37.6, x: 546, y: 278, w: 418, h: 31, spot: true }]}
        />
        <div style={{ position: 'absolute', left: 1180, top: 170, width: 660 }}>
          <div className="kit-label" style={enter(t, 37.28, { y: 14 })}>Who can ask questions?</div>
          <MenuList
            items={[
              'All participants only from when they join',
              'All participants and invitees',
              'Participants and invitees in our organization',
              'Only meeting host',
            ]}
            active={t >= 52.8 ? 2 : t >= 48.8 ? 1 : t >= 40.0 ? 0 : -1}
            style={{ ...enter(t, 38.24, { y: 20 }) }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30 }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, ...enter(t, 40, { x: -20, y: 0 }) }}>
              <span className="kit-tag">Default</span> Only from when they join
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: RED, ...enter(t, 44.72, { x: -20, y: 0 }) }}>
              <Cross size={30} /> Late arrivals can't catch up
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, ...enter(t, 48.8, { x: -20, y: 0 }) }}>
              <Check size={30} /> Invitees can catch up on what they missed
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, color: MUTED, ...enter(t, 51.95, { x: -20, y: 0 }) }}>
              <Check size={30} color={GREEN} /> Sensitive topic? Keep it in your organization
            </div>
          </div>
        </div>
      </Scene>

      {/* 6 — Who receives the summary (23) */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={55.28}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 55.29, x: 740, y: 290, s: 1.75, dur: 0.01 }, { at: 55.66, x: 760, y: 380, s: 2.1, dur: 1.0 }]}
          cursor={[{ at: 56.76, x: 900, y: 440 }, { at: 58.2, x: 640, y: 394 }]}
          rings={[{ at: 56.24, x: 546, y: 378, w: 418, h: 31, spot: true }]}
          steps={[
            { at: 56.24, text: 'Who receives the summary' },
            { at: 58.64, text: 'Only meeting host: check it before you share' },
          ]}
        />
      </Scene>

      {/* 7 — Summary template (23) */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t}
          start={63.94}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 63.95, x: 760, y: 380, s: 2.1, dur: 0.01 }, { at: 64.08, x: 700, y: 480, s: 2.0, dur: 1.0 }]}
          cursor={[{ at: 64.6, x: 700, y: 540 }, { at: 66.4, x: 650, y: 484 }]}
          rings={[{ at: 64.96, x: 502, y: 467, w: 320, h: 32, spot: true }]}
          steps={[
            { at: 64.96, text: 'Meeting summary template' },
            { at: 67, text: 'Default: General template' },
          ]}
        />
      </Scene>

      {/* 8 — Template list (02) */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={68.05}
          src={shot('02')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 68.06, x: 680, y: 400, s: 1.65, dur: 0.01 }]}
          cursor={[{ at: 68.6, x: 760, y: 560 }, { at: 74.42, x: 640, y: 392, click: true }]}
          rings={[
            { at: 70.88, until: 72, x: 515, y: 238, w: 300, h: 38 },
            { at: 72, until: 72.72, x: 515, y: 284, w: 300, h: 38 },
            { at: 72.72, until: 75.12, x: 515, y: 330, w: 300, h: 38 },
            { at: 75.28, x: 515, y: 376, w: 300, h: 38, spot: true },
          ]}
          steps={[
            { at: 68.68, text: 'Templates for different kinds of meetings' },
            { at: 75.28, text: 'Project update: progress and next steps' },
          ]}
        />
      </Scene>

      {/* 9 — Save (23) */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={79.91}
          src={shot('23')}
          imgH={WEB_H}
          stepTag="BEFORE"
          title="zoom.us · Schedule Meeting"
          cam={[{ at: 79.92, x: 640, y: 700, s: 1.6, dur: 0.01 }, { at: 80.06, x: 520, y: 820, s: 1.9, dur: 0.8 }]}
          cursor={[{ at: 80.06, x: 600, y: 760 }, { at: 80.36, x: 362, y: 918, click: true }]}
          rings={[{ at: 80.76, x: 332, y: 903, w: 60, h: 30, spot: true }]}
          steps={[
            { at: 80.48, text: 'Save the meeting' },
            { at: 81.52, text: 'Send the invite from your calendar' },
          ]}
        />
      </Scene>

      {/* 10 — Policies */}
      <Scene t={t} index={9}>
        <Section t={t} at={83.66} text="Before the meeting" />
        <div className="kit-h2" style={enter(t, 83.76, { dur: 0.8, y: 30 })}>
          These choices decide what AI <span className="kit-mark" style={markStyle(t, 85.68)}>can use</span>
          <br />
          and <span className="kit-mark" style={markStyle(t, 86.56)}>who sees it.</span>
        </div>
        <div className="kit-pill" style={{ marginTop: 60, alignSelf: 'flex-start', borderColor: GREEN, ...enter(t, 87.6, { y: 16, easing: BACK }) }}>
          <Check size={34} /> Follow your organization's policies
        </div>
      </Scene>

      {/* 11 — During: open AI Companion from the meeting toolbar (47) */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          t={t}
          start={90.6}
          src={shot('47-meeting-toolbar')}
          imgW={1634}
          imgH={911}
          width={1440}
          top={44}
          title="Zoom Workplace"
          stepTag="DURING"
          cam={[{ at: 95.6, x: 975, y: 790, s: 2.0, dur: 1.1 }]}
          cursor={[{ at: 94.6, x: 700, y: 500 }, { at: 96.4, x: 975, y: 872, click: true }]}
          rings={[{ at: 97.2, x: 928, y: 852, w: 94, h: 54, spot: true }]}
          steps={[
            { at: 90.72, text: 'Stay focused on the discussion' },
            { at: 97.2, text: 'Open AI Companion from the menu bar' },
            { at: 99.76, text: 'In the Zoom Workplace desktop app' },
          ]}
        />
      </Scene>

      {/* 12 — Catch up: idle panel (24) → "What have I missed so far?" answer (27) */}
      <Scene t={t} index={11} pad={false}>
        <LeftCol>
          <Section t={t} at={101.8} text="During the meeting" />
          <div className="kit-h2" style={enter(t, 101.92, { dur: 0.7, y: 24 })}>
            Joined late? <span style={{ ...enter(t, 103.92, { y: 0, dur: 0.5 }) }}>Stepped out?</span>
          </div>
          <p className="kit-body kit-muted" style={{ marginTop: 22, ...enter(t, 105.52, { y: 14 }) }}>No need to interrupt or wait for a recap.</p>
          <PromptCard t={t} at={111.28} dur={1.2} text="What have I missed so far?" style={{ marginTop: 34 }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 30 }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 27, ...enter(t, 127.68, { x: -20, y: 0 }) }}>
              <Check size={30} /> Each point links back to where it was said
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 27, ...enter(t, 130.24, { x: -20, y: 0 }) }}>
              <span className="kit-tag">Before</span> Invitees can ask about the whole meeting
            </div>
          </div>
        </LeftCol>
        <div style={{ position: 'absolute', inset: 0, opacity: 1 - prog(t, 112.0, 0.5, IN_OUT) }}>
          {t < 112.6 && <Panel t={t} start={101.6} n="24" big />}
        </div>
        {t >= 111.9 && (
          <div style={{ position: 'absolute', inset: 0, opacity: prog(t, 112.0, 0.5, IN_OUT) }}>
            <Panel
              t={t}
              start={111.9}
              n="27"
              rings={[
                { at: 115.68, until: 117.36, x: 40, y: 170, w: 300, h: 42 },
                { at: 117.36, until: 119.04, x: 40, y: 212, w: 300, h: 42 },
                { at: 119.04, until: 120.64, x: 40, y: 254, w: 300, h: 42 },
                { at: 120.64, until: 122.32, x: 40, y: 297, w: 300, h: 22 },
                { at: 122.32, until: 124.8, x: 78, y: 340, w: 220, h: 42 },
                { at: 124.8, until: 127.4, x: 78, y: 382, w: 220, h: 42 },
                { at: 127.68, x: 168, y: 195, w: 14, h: 16 },
                { at: 127.8, x: 189, y: 238, w: 14, h: 16 },
                { at: 127.92, x: 147, y: 280, w: 14, h: 16 },
                { at: 128.04, x: 289, y: 301, w: 14, h: 16 },
                { at: 128.16, x: 151, y: 363, w: 14, h: 16 },
                { at: 128.28, x: 189, y: 405, w: 14, h: 16 },
              ]}
            />
          </div>
        )}
      </Scene>

      {/* 13 — Unanswered questions (28) */}
      <Scene t={t} index={12} pad={false}>
        <LeftCol>
          <Section t={t} at={133.72} text="For example, I can also ask" />
          <PromptCard t={t} at={135.84} dur={1.6} text="What important questions remain unanswered?" />
        </LeftCol>
        <Panel
          t={t}
          start={133.6}
          n="28"
          rings={[
            { at: 136.9, until: 137.4, x: 40, y: 196, w: 300, h: 44 },
            { at: 137.4, until: 137.9, x: 40, y: 258, w: 300, h: 44 },
            { at: 137.9, until: 138.4, x: 40, y: 320, w: 300, h: 44 },
            { at: 138.4, x: 40, y: 384, w: 300, h: 26 },
          ]}
        />
      </Scene>

      {/* 14 — Action items (29) */}
      <Scene t={t} index={13} pad={false}>
        <LeftCol>
          <Section t={t} at={138.45} text="Or" />
          <PromptCard t={t} at={139.0} dur={1.6} text="What are the action items, and who owns each one?" />
          <div className="kit-h3" style={{ marginTop: 40, ...enter(t, 142.24, { y: 14 }) }}>AI can still get things wrong.</div>
          <div className="kit-card kit-ui" style={{ marginTop: 22, alignSelf: 'flex-start', padding: '14px 24px', display: 'inline-flex', alignItems: 'center', gap: 14, fontSize: 28, borderColor: RED, ...enter(t, 145.76, { y: 16, easing: BACK }) }}>
            <Cross size={32} /> Sam: <b>"tomorrow"</b>
          </div>
        </LeftCol>
        <Panel t={t} start={138.35} n="29" rings={[{ at: 145.76, x: 42, y: 355, w: 292, h: 44, spot: true }]} />
      </Scene>

      {/* 15 — Check the citation (30) */}
      <Scene t={t} index={14} pad={false}>
        <LeftCol>
          <div className="kit-label" style={enter(t, 148.0, { y: 14 })}>Before it's confirmed</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            {[
              ['Owner?', 149.28],
              ['Deadline?', 150.16],
              ['Decision?', 150.56],
            ].map(([w, at]) => (
              <span key={w as string} className="kit-pill" style={{ fontSize: 26, ...enter(t, at as number, { y: 12, easing: BACK }) }}>
                {w as string}
              </span>
            ))}
          </div>
          <div className="kit-h1" style={{ marginTop: 44, fontSize: 92, ...enter(t, 152.1, { dur: 0.7, y: 24 }) }}>
            <span className="kit-mark" style={markStyle(t, 152.4)}>Check the citation.</span>
          </div>
        </LeftCol>
        <Panel
          t={t}
          start={147.9}
          n="30"
          rings={[
            { at: 148.6, until: 152.2, x: 6, y: 130, w: 318, h: 214 },
            { at: 152.32, x: 6, y: 300, w: 318, h: 24, spot: true },
          ]}
        />
      </Scene>

      {/* 18 — After: Summaries (32) */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          t={t}
          start={154.49}
          src={shot('32')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="zoom.us · Summaries"
          cam={[{ at: 154.5, x: 700, y: 420, s: 1.45, dur: 0.01 }]}
          cursor={[{ at: 155.16, x: 300, y: 600 }, { at: 155.88, x: 76, y: 286, click: true }, { at: 157.14, x: 438, y: 442 }]}
          rings={[{ at: 156.94, x: 336, y: 428, w: 1310, h: 28 }]}
          steps={[
            { at: 154.75, text: 'After the meeting: Summaries' },
            { at: 156.88, text: 'Open the new summary' },
          ]}
        />
      </Scene>

      {/* 19 — Two errors (33) */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          t={t}
          start={157.84}
          src={shot('33')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="zoom.us · Meeting summary"
          cam={[
            { at: 157.85, x: 800, y: 600, s: 1.3, dur: 0.01 },
            { at: 161.12, x: 720, y: 560, s: 1.9, dur: 1.0 },
            { at: 165.32, x: 620, y: 780, s: 1.9, dur: 0.9 },
          ]}
          rings={[
            { at: 162.56, until: 165.22, x: 614, y: 536, w: 110, h: 24, spot: true },
            { at: 165.92, x: 604, y: 815, w: 70, h: 26, spot: true },
          ]}
          steps={[
            { at: 162.56, text: '"customer portion", not "customer portal"' },
            { at: 165.92, text: "Sam's invented deadline" },
            { at: 168.08, text: 'Only you received it, so fix it first' },
          ]}
        />
      </Scene>

      {/* 20 — Open in Docs (35) */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={171.37}
          src={shot('35')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Docs"
          cam={[{ at: 171.38, x: 760, y: 420, s: 1.35, dur: 0.01 }, { at: 173, x: 740, y: 360, s: 1.8, dur: 0.9 }]}
          rings={[{ at: 173.2, x: 717, y: 327, w: 126, h: 22, spot: true }]}
          steps={[
            { at: 172, text: 'Open in Docs' },
            { at: 173.2, text: 'Correct the wording' },
          ]}
        />
      </Scene>

      {/* 21 — Corrections (38) */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t}
          start={174.35}
          src={shot('38')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Docs"
          cam={[{ at: 174.36, x: 760, y: 300, s: 1.5, dur: 0.01 }]}
          cursor={[{ at: 174.8, x: 900, y: 600 }, { at: 175.76, x: 862, y: 905, click: true }]}
          rings={[
            { at: 174.84, x: 424, y: 118, w: 662, h: 78, spot: true },
            { at: 175.6, x: 398, y: 452, w: 720, h: 40 },
          ]}
          steps={[{ at: 174.84, text: "Mark Sam's deadline as not confirmed" }]}
        />
      </Scene>

      {/* 22 — Share (34) */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          t={t}
          start={177.05}
          src={shot('34')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="zoom.us · Meeting summary"
          cam={[{ at: 177.06, x: 960, y: 470, s: 1.5, dur: 0.01 }]}
          cursor={[{ at: 177.2, x: 1100, y: 700 }, { at: 177.96, x: 840, y: 616 }]}
          rings={[{ at: 177.6, x: 736, y: 302, w: 448, h: 352, spot: true }]}
          steps={[
            { at: 177.6, text: 'Share it with the team' },
            { at: 179.04, text: 'The version people should rely on' },
          ]}
        />
      </Scene>

      {/* 23 — ZoomMate attach (07) */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          t={t}
          start={181.43}
          src={shot('07')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="ai.zoom.us"
          cam={[{ at: 181.44, x: 1100, y: 420, s: 1.3, dur: 0.01 }, { at: 186.68, x: 920, y: 420, s: 1.8, dur: 0.9 }]}
          cursor={[{ at: 185.78, x: 1100, y: 600 }, { at: 186.58, x: 789, y: 345, click: true }, { at: 187.66, x: 880, y: 425 }]}
          rings={[{ at: 187.68, x: 794, y: 411, w: 226, h: 28, spot: true }]}
          steps={[
            { at: 184.16, text: 'ZoomMate at ai.zoom.us' },
            { at: 187.68, text: 'Attach meetings & files' },
          ]}
        />
      </Scene>

      {/* 24 — Pick the meeting (40) */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          t={t}
          start={188.66}
          src={shot('40')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="ai.zoom.us"
          cam={[{ at: 188.67, x: 960, y: 420, s: 1.55, dur: 0.01 }]}
          cursor={[{ at: 189.04, x: 1000, y: 520 }, { at: 191.24, x: 1345, y: 725, click: true }]}
          rings={[
            { at: 189.52, x: 788, y: 364, w: 120, h: 22, spot: true },
            { at: 191.04, until: 192.34, x: 788, y: 420, w: 125, h: 22 },
          ]}
          steps={[
            { at: 189.52, text: 'Check the date and time' },
            { at: 191.04, text: 'Same title, different meeting' },
          ]}
        />
      </Scene>

      {/* 25 — The brief prompt */}
      <Scene t={t} index={22}>
        <div style={{ display: 'grid', gridTemplateColumns: '560px 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 192.82, { y: 14 })}>ZoomMate prompt</div>
            <div className="kit-h2" style={enter(t, 192.92, { dur: 0.8, y: 30 })}>More than a recap.</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 40 }}>
              {[
                ['Current status', 198.48],
                ['Critical risks', 199.6],
                ['Confirmed decisions', 200.96],
                ['Outstanding commitments', 202.28],
                ['A recommendation', 204],
              ].map(([w, at]) => (
                <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                  <Check size={30} /> {w as string}
                </div>
              ))}
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '34px 40px', borderRadius: 22, background: '#F5F8FF', borderColor: '#C9D8FF', fontSize: 31, lineHeight: 1.5, ...enter(t, 193.32, { y: 24 }) }}>
            <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '.12em', color: ZOOM_BLUE, marginBottom: 12 }}>I ASK</div>
            Create a <b>one-page launch readiness brief</b> for senior leadership. Include current status, critical risks, confirmed decisions, outstanding commitments, and a recommendation.{' '}
            <span className="kit-mark" style={markStyle(t, 205.36)}>Separate agreed decisions from your recommendations,</span> and{' '}
            <span className="kit-mark" style={markStyle(t, 208.72)}>flag missing information rather than inventing it.</span>
          </div>
        </div>
      </Scene>

      {/* 26 — Brief drafted (44) */}
      <Scene t={t} index={23} pad={false}>
        <AppWindow
          t={t}
          start={211.83}
          src={shot('44')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 211.84, x: 960, y: 400, s: 1.3, dur: 0.01 }, { at: 213.04, x: 960, y: 330, s: 1.5, dur: 1.2 }]}
          rings={[{ at: 214.08, x: 590, y: 120, w: 640, h: 104 }]}
          steps={[{ at: 212.8, text: 'Drafted from the corrected summary' }]}
        />
      </Scene>

      {/* 27 — Sam unconfirmed (45) */}
      <Scene t={t} index={24} pad={false}>
        <AppWindow
          t={t}
          start={215.33}
          src={shot('45')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 215.34, x: 960, y: 290, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 216, x: 590, y: 254, w: 737, h: 72, spot: true }]}
          steps={[{ at: 216, text: "Sam's deadline stays unconfirmed" }]}
        />
      </Scene>

      {/* 28 — No transcript (44) */}
      <Scene t={t} index={25} pad={false}>
        <AppWindow
          t={t}
          start={217.86}
          src={shot('44')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 217.87, x: 960, y: 360, s: 1.7, dur: 0.01 }]}
          rings={[{ at: 217.92, x: 590, y: 282, w: 740, h: 138, spot: true }]}
          steps={[{ at: 218.72, text: 'No transcript to work from' }]}
        />
      </Scene>

      {/* 29 — Tagged evidence (46) */}
      <Scene t={t} index={26} pad={false}>
        <AppWindow
          t={t}
          start={220.55}
          src={shot('46')}
          imgH={WEB_H}
          stepTag="AFTER"
          title="Zoom Canvas"
          cam={[{ at: 220.56, x: 960, y: 240, s: 1.55, dur: 0.01 }]}
          cursor={[{ at: 225.04, x: 1000, y: 500 }, { at: 226.32, x: 760, y: 330 }]}
          rings={[
            { at: 221.44, until: 225.48, x: 1288, y: 140, w: 40, h: 22 },
            { at: 221.66, until: 225.48, x: 1196, y: 176, w: 40, h: 22 },
            { at: 221.86, until: 225.48, x: 752, y: 236, w: 40, h: 22 },
            { at: 222.06, until: 225.48, x: 898, y: 376, w: 40, h: 22 },
          ]}
          steps={[
            { at: 221.44, text: '[MS] = tagged back to the meeting summary' },
            { at: 225.68, text: 'Refine it in Canvas before you share' },
          ]}
        />
      </Scene>

      {/* 30 — Your own assistant */}
      <Scene t={t} index={27}>
        <div className="kit-label" style={enter(t, 229.95, { y: 14 })}>A practical note</div>
        <div className="kit-h2" style={enter(t, 230.1, { dur: 0.8, y: 30 })}>Use Zoom with your own AI assistant.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 70 }}>
          <div className="kit-card" style={{ width: 400, padding: '30px 34px', display: 'flex', alignItems: 'center', gap: 24, ...enter(t, 233.16, { y: 24, easing: BACK }) }}>
            <ZoomLogo size={84} />
            <div>
              <div className="kit-h3">Zoom</div>
              <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 4, ...enter(t, 237.2, { y: 6 }) }}>Your meeting information</div>
            </div>
          </div>
          <Arrow t={t} at={233.58} w={200} label="Connect" />
          <div className="kit-card" style={{ width: 620, padding: '30px 34px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 230.8, { y: 24, easing: BACK }) }}>
            <div className="kit-h3">Your AI assistant</div>
            <div style={{ display: 'flex', gap: 14, marginTop: 16 }}>
              <span className="kit-pill" style={{ fontSize: 24, padding: '10px 22px', ...enter(t, 230.96, { y: 8, scale: 0.7, easing: BACK }) }}>ChatGPT</span>
              <span className="kit-pill" style={{ fontSize: 24, padding: '10px 22px', ...enter(t, 232.08, { y: 8, scale: 0.7, easing: BACK }) }}>Claude</span>
            </div>
            <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 18, ...enter(t, 239.44, { y: 8 }) }}>
              Alongside the rest of your business context
            </div>
          </div>
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 56, padding: '22px 28px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 28, alignSelf: 'flex-start', ...enter(t, 242.16, { y: 16 }) }}>
          <span className="kit-tag">Business / Enterprise</span>
          Availability depends on your organization's setup.
          <span style={{ color: MUTED, ...enter(t, 248.64, { y: 0 }) }}>Can't find it? Ask IT or your admin.</span>
        </div>
      </Scene>

      {/* 31 — Takeaway */}
      <Scene t={t} index={28}>
        <div className="kit-label" style={enter(t, 252.02, { y: 14 })}>The takeaway</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 20 }}>
          {[
            ['Before', 'Set it up', 'Decide what AI captures and who sees it', 253.6],
            ['During', 'Let it keep track', 'You run the discussion', 255.2],
            ['After', 'Fix the summary first', 'Before anyone else sees it', 257.92],
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
      <Scene t={t} index={29} padStyle={{ opacity: 1 - prog(t, 271, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-h2" style={{ color: MUTED, ...enter(t, 260.88, { dur: 0.8, y: 24 }) }}>
          A summary on its own doesn't move the launch forward.
        </div>
        <div className="kit-h1" style={{ marginTop: 50, ...enter(t, 264.24, { dur: 0.9, y: 30 }) }}>
          Get to a <span className="kit-mark" style={markStyle(t, 265.68)}>decision faster.</span>
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 40, ...enter(t, 267.24, { y: 18 }) }}>
          And <span className="kit-mark" style={markStyle(t, 268.28)}>check what AI tells you</span> along the way.
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
