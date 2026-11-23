import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  AppWindow,
  Arrow,
  BACK,
  Check,
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

// Copilot Personalization: saving the 3Cs profile as Custom Instructions in Microsoft 365 Copilot.
// Built with the LWAI demo kit (src/kit). Every cue is in SECONDS of the VO (audio/copilot-personalization.mp3,
// Daan on ElevenLabs v4, 291.2s), taken from the Scribe word timestamps in
// src/data/copilot-personalization.transcript.json. A 90-frame green title card opens the video;
// the VO and every scene start after it.
//
// Screenshots: copilot-personalization/images/01..12.jpg, 1920x999 (Edge on macOS, verified 23 Nov 2026).
//
//  #  scene                               start   VO cue
//  1  Set it once                         0.00    "Microsoft Copilot lets you set standing instructions…"
//  2  What you'll learn                   9.52    "In this lesson…"
//  3  Open Copilot Chat, gear             21.48   "First, where to find it."
//  4  Gear menu > Settings                32.40   "…icon, then select Settings."
//  5  Personalisation > Manage            35.12   "Select Personalisation…"
//  6  Three-dot menu route                42.56   "You can also open Settings…"
//  7  Labels vary                         46.72   "And depending on your version…"
//  8  What the editor is for              55.12   "This opens the space…"
//  9  One instruction field               61.12   "Now let's look at the demo."
//  10 The 3Cs fill in                     71.04   "…using the 3Cs…" (Context / Communication / Collaboration typed)
//  11 Save customisation                  125.60  "Once I'm happy with my 3Cs…"
//  12 Saved banner                        133.84  "And I'll look for the confirmation…"
//  13 A starting profile                  138.08  "And that's it."
//  14 New chat + test prompt              147.12  "Now let's put it into practice."
//  15 What to check                       168.08  "Now I pay attention to the answer."
//  16 What the test showed                183.60  "In this test…"
//  17 Still quite long                    192.36  "But the answer was still quite long…"
//  18 Other context                       198.96  "Keep in mind…"
//  19 Refine your profile                 209.68  "If you still find yourself…"
//  20 The goal                            216.56  "The goal: less time briefing Copilot…"
//  21 Persistent, not task-specific       221.84  "Before we wrap up…"
//  22 Concise and specific                238.00  "Keep them concise and specific."
//  23 Turning it off                      250.16  "Custom Instructions can be turned off."
//  24 Availability                        263.12  "Availability can depend on your organization."
//  25 Closing                             273.12  "And finally, treat your profile…"

export const COPILOT_PERSONALIZATION_DURATION_S = 292.4;
export const COPILOT_PERSONALIZATION_TITLE_FRAMES = 90;

const STARTS = [
  0, 9.52, 21.48, 32.4, 35.12, 42.56, 46.72, 55.12, 61.12, 71.04, 125.6, 133.84, 138.08, 147.12, 168.08, 183.6,
  192.36, 198.96, 209.68, 216.56, 221.84, 238.0, 250.16, 263.12, 273.12,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_W = 1920;
const IMG_H = 999;

// Browser previews can inject the screenshots (data URIs) via globalThis.COPILOT_PERSONALIZATION_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { COPILOT_PERSONALIZATION_SHOTS?: Record<string, string> }).COPILOT_PERSONALIZATION_SHOTS?.[n] ??
  staticFile(`copilot-personalization/images/${n}.jpg`);

// ── Pieces ──────────────────────────────────────────────────────────────────

const CONTEXT_TEXT =
  "I'm a senior leader responsible for strategy and operations. I regularly use Copilot to prepare for meetings, make decisions, and communicate with my leadership team.";
const COMM_TEXT =
  'Be concise and direct. Lead with the key takeaway, use plain business language, and use bullet points when they make information easier to scan.';
const COLLAB_TEXT =
  'Challenge my assumptions when appropriate. Ask questions when important information is missing, and flag uncertainty rather than guessing.';

const THREE_CS: { name: string; desc: string; at: number; from: number; to: number; text: string; typeAt: number; typeDur: number }[] = [
  { name: 'Context', desc: 'What Copilot should know about you', at: 72.48, from: 83.12, to: 98.44, text: CONTEXT_TEXT, typeAt: 87.8, typeDur: 10.2 },
  { name: 'Communication', desc: 'How you want it to respond', at: 73.04, from: 98.44, to: 112.4, text: COMM_TEXT, typeAt: 102.85, typeDur: 9.3 },
  { name: 'Collaboration', desc: 'How you want it to work with you', at: 74.16, from: 112.4, to: 999, text: COLLAB_TEXT, typeAt: 117.24, typeDur: 8.1 },
];

const Bubble: React.FC<{ t: number; at: number; label: string; strikeAt: number }> = ({ t, at, label, strikeAt }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, ...enter(t, at, { x: -30, y: 0 }) }}>
    <div className="kit-ui" style={{ fontSize: 20, color: MUTED, width: 90, fontWeight: 600, letterSpacing: '.08em' }}>{label}</div>
    <div
      className="kit-ui"
      style={{ position: 'relative', fontSize: 28, padding: '16px 24px', background: '#F2F2F2', borderRadius: 18, opacity: 1 - prog(t, strikeAt, 0.6) * 0.5 }}
    >
      Be concise. Lead with the takeaway…
      <span style={{ position: 'absolute', left: 16, top: '50%', height: 4, background: RED, width: `${prog(t, strikeAt, 0.6, IN_OUT) * 92}%` }} />
    </div>
  </div>
);

// A cropped strip of the answer area of a response screenshot (for the "long answer" scroll)
const AnswerSlice: React.FC<{ src: string; w: number }> = ({ src, w }) => {
  const sx = 680;
  const sw = 820;
  const sy = 40;
  const sh = 850;
  const k = w / sw;
  return (
    <div style={{ width: w, height: sh * k, overflow: 'hidden', position: 'relative', flex: 'none' }}>
      <Img src={src} style={{ position: 'absolute', width: IMG_W * k, height: IMG_H * k, left: -sx * k, top: -sy * k }} />
    </div>
  );
};

// ── Body ────────────────────────────────────────────────────────────────────
const CopilotPersonalizationBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/copilot-personalization.mp3')} />}

      {/* 1 — Set it once */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Microsoft 365 Copilot</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Set your preferences <span className="kit-mark" style={markStyle(t, 2.0)}>once.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Bubble t={t} at={5.76} label="CHAT 1" strikeAt={8.0} />
            <Bubble t={t} at={6.3} label="CHAT 2" strikeAt={8.2} />
            <Bubble t={t} at={6.8} label="CHAT 3" strikeAt={8.4} />
          </div>
          <Arrow t={t} at={8.2} w={150} />
          <div
            className="kit-card"
            style={{ width: 470, padding: '30px 34px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 8.7, { dur: 0.6, scale: 0.7, y: 0, easing: BACK }) }}
          >
            <div className="kit-h3">Standing instructions</div>
            <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>Applied to every new conversation</div>
          </div>
        </div>
      </Scene>

      {/* 2 — What you'll learn */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 9.7, { y: 14 })}>In this lesson</div>
        <div className="kit-h2" style={{ maxWidth: 1500, ...enter(t, 9.9, { dur: 0.8, y: 30 }) }}>
          Save your <span className="kit-mark" style={markStyle(t, 12.0)}>3Cs Personalization Profile</span> into Microsoft 365 Copilot.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {['Context', 'Communication', 'Collaboration'].map((c, i) => (
              <div key={c} style={enter(t, 12.0 + i * 0.3, { x: -30, y: 0, easing: BACK })}>
                <div className="kit-pill">
                  <span style={{ width: 34, height: 34, borderRadius: 10, background: LIME, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 20 }}>C</span>
                  {c}
                </div>
              </div>
            ))}
          </div>
          <Arrow t={t} at={14.56} w={170} />
          <div className="kit-card" style={{ width: 560, padding: '30px 34px', ...enter(t, 15.36, { dur: 0.6, scale: 0.8, y: 0, easing: BACK }) }}>
            <div className="kit-ui" style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.1em', color: MUTED }}>MICROSOFT 365 COPILOT</div>
            <div className="kit-h3" style={{ marginTop: 8 }}>Custom instructions</div>
            <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 14, ...enter(t, 17.56, { y: 10 }) }}>
              A better starting point for every new conversation
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Open Copilot Chat, find the gear */}
      <Scene t={t} index={2} pad={false}>
        <AppWindow
          t={t}
          start={21.48}
          src={shot('01-copilot-chat')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 26.4, x: 600, y: 300, s: 1.6 },
            { at: 30.36, x: 330, y: 800, s: 2.0 },
          ]}
          cursor={[
            { at: 29.6, x: 700, y: 700 },
            { at: 31.6, x: 217, y: 969, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 26.6, until: 28.1, x: 75, y: 42, w: 540, h: 28 },
            { at: 28.16, until: 30.3, x: 8, y: 949, w: 180, h: 40 },
            { at: 32.0, x: 197, y: 949, w: 40, h: 40, spot: true },
          ]}
          steps={[
            { at: 23.44, text: 'Open Microsoft 365 Copilot Chat in your browser' },
            { at: 28.16, text: 'Sign in with your work or school account' },
            { at: 32.0, text: 'Select the gear icon' },
          ]}
        />
      </Scene>

      {/* 4 — Gear menu > Settings */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          t={t}
          start={32.4}
          src={shot('12-sidebar-settings-route')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[{ at: 32.4, x: 330, y: 830, s: 2.0, dur: 0.01 }]}
          cursor={[
            { at: 32.4, x: 236, y: 966 },
            { at: 33.3, x: 267, y: 810, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 34.0, x: 185, y: 793, w: 230, h: 34, spot: true }]}
          steps={[
            { at: 32.4, text: 'Select the gear icon' },
            { at: 34.0, text: 'Then select Settings' },
          ]}
        />
      </Scene>

      {/* 5 — Personalisation > Customise Copilot > Manage */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={35.12}
          src={shot('03-personalisation')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 35.12, x: 960, y: 500, s: 1.2, dur: 0.01 },
            { at: 38.4, x: 1070, y: 400, s: 1.75, dur: 1.0 },
          ]}
          cursor={[
            { at: 35.2, x: 900, y: 650 },
            { at: 35.7, x: 640, y: 337, click: true, dur: 0.7 },
            { at: 40.7, x: 1238, y: 359, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 36.4, until: 38.6, x: 578, y: 316, w: 190, h: 42 },
            { at: 39.2, until: 41.4, x: 800, y: 331, w: 380, h: 56 },
            { at: 41.52, x: 1200, y: 340, w: 76, h: 38, spot: true },
          ]}
          steps={[
            { at: 35.6, text: 'Personalisation' },
            { at: 39.2, text: 'Find Customise Copilot' },
            { at: 41.52, text: 'Select Manage' },
          ]}
        />
      </Scene>

      {/* 6 — The three-dot menu route */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={42.56}
          src={shot('02-settings-menu')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[{ at: 44.6, x: 1640, y: 180, s: 2.0, dur: 0.9 }]}
          cursor={[
            { at: 42.8, x: 1400, y: 420 },
            { at: 43.6, x: 1891, y: 26, click: true, dur: 0.7 },
            { at: 45.0, x: 1723, y: 125, dur: 0.6 },
          ]}
          rings={[
            { at: 44.32, until: 45.4, x: 1873, y: 8, w: 36, h: 36 },
            { at: 45.44, x: 1655, y: 108, w: 160, h: 34, spot: true },
          ]}
          steps={[
            { at: 42.8, text: 'Or use the three-dot menu, top right' },
            { at: 45.44, text: 'Settings' },
          ]}
        />
      </Scene>

      {/* 7 — Labels vary by version */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 46.9, { y: 14 })}>Depending on your version</div>
        <div className="kit-h2" style={enter(t, 47.1, { dur: 0.8, y: 30 })}>
          Same place, <span className="kit-mark" style={markStyle(t, 48.4)}>different labels.</span>
        </div>
        <div className="kit-ui" style={{ marginTop: 64, display: 'grid', gridTemplateColumns: '520px 120px 560px', rowGap: 22, alignItems: 'center' }}>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.1em', color: MUTED, ...enter(t, 47.6, { y: 0 }) }}>IN THIS DEMO</div>
          <div />
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.1em', color: MUTED, ...enter(t, 49.9, { y: 0 }) }}>YOU MAY SEE</div>
          {[
            ['Personalisation', 'Personalization', 50.24],
            ['Customise Copilot', 'Custom instructions', 51.52],
            ['Manage', 'Edit instructions', 53.04],
          ].map(([a, b, at]) => (
            <React.Fragment key={a as string}>
              <div className="kit-card" style={{ padding: '18px 26px', fontSize: 30, fontWeight: 600, ...enter(t, 47.8, { y: 10 }) }}>{a as string}</div>
              <div style={{ textAlign: 'center', fontSize: 36, color: GREEN, ...enter(t, at as number, { x: -10, y: 0 }) }}>→</div>
              <div className="kit-card" style={{ padding: '18px 26px', fontSize: 30, fontWeight: 600, borderColor: GREEN, background: LIME_SOFT, ...enter(t, at as number, { x: -20, y: 0, easing: BACK }) }}>
                {b as string}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Scene>

      {/* 8 — What the editor is for */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={55.12}
          src={shot('11-profile-persistence')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 55.12, x: 960, y: 500, s: 1.0, dur: 0.01 },
            { at: 55.4, x: 1070, y: 320, s: 1.9, dur: 1.0 },
          ]}
          rings={[{ at: 56.72, x: 825, y: 283, w: 520, h: 50, spot: true }]}
          steps={[
            { at: 55.4, text: 'Customise Copilot' },
            { at: 57.6, text: 'What Copilot should know, and how it should respond' },
          ]}
        />
      </Scene>

      {/* 9 — One instruction field */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={61.12}
          src={shot('04-3cs-instruction-editor')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[{ at: 65.04, x: 1072, y: 470, s: 1.9, dur: 1.0 }]}
          cursor={[
            { at: 63.0, x: 900, y: 700 },
            { at: 67.4, x: 1000, y: 470, dur: 0.8 },
          ]}
          rings={[{ at: 66.48, x: 802, y: 399, w: 540, h: 106, spot: true }]}
          steps={[
            { at: 62.72, text: 'Customise Copilot is open' },
            { at: 66.48, text: 'One main instruction field' },
            { at: 68.8, text: 'Paste in your prepared profile' },
          ]}
        />
      </Scene>

      {/* 10 — The 3Cs fill in */}
      <Scene t={t} index={9}>
        <div style={{ display: 'flex', gap: 60, alignItems: 'center' }}>
          <div style={{ width: 560, flex: 'none' }}>
            <div className="kit-label" style={enter(t, 71.2, { y: 14 })}>Your 3Cs profile</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 10 }}>
              {THREE_CS.map((c) => {
                const active = t >= c.from && t < c.to;
                return (
                  <div
                    key={c.name}
                    className="kit-card"
                    style={{
                      padding: '22px 26px',
                      display: 'flex',
                      gap: 20,
                      alignItems: 'center',
                      borderColor: active ? GREEN : LINE,
                      background: active ? LIME_SOFT : '#fff',
                      ...enter(t, c.at, { x: -30, y: 0, easing: BACK }),
                    }}
                  >
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: LIME, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 28, fontWeight: 700, fontFamily: 'Public Sans', flex: 'none' }}>
                      C
                    </div>
                    <div>
                      <div className="kit-h3" style={{ fontSize: 36 }}>{c.name}</div>
                      <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 2 }}>{c.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Editor mock */}
          <div className="kit-card kit-ui" style={{ width: 1120, flex: 'none', padding: '30px 36px', boxShadow: '0 18px 50px rgba(0,0,0,.08)', position: 'relative', ...enter(t, 71.6, { y: 30 }) }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>Customise Copilot</div>
            <div style={{ fontSize: 20, color: MUTED, marginTop: 4 }}>Add your own custom instructions</div>
            <div style={{ border: `2px solid ${LINE}`, borderRadius: 14, marginTop: 20, padding: '18px 22px', height: 560, boxSizing: 'border-box', fontSize: 25, lineHeight: 1.45 }}>
              {THREE_CS.map((c) => {
                const shown = t >= c.from - 0.2;
                if (!shown) return null;
                const txt = typed(t, c.typeAt, c.text, c.typeDur);
                const typing = t >= c.typeAt && t < c.typeAt + c.typeDur + 0.3;
                return (
                  <div key={c.name} style={{ marginBottom: 16, ...enter(t, c.from - 0.2, { y: 8, dur: 0.4 }) }}>
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    <div>
                      {txt}
                      {typing && <span style={{ display: 'inline-block', width: 2, height: 26, background: INK, marginLeft: 2, verticalAlign: -4 }} />}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20 }}>
              <div style={{ padding: '12px 22px', borderRadius: 999, background: INK, color: '#fff', fontSize: 22, fontWeight: 600 }}>Save customisation</div>
            </div>
            {/* Review-first note */}
            <div
              className="kit-card"
              style={{
                position: 'absolute',
                left: 60,
                right: 60,
                top: 230,
                padding: '26px 30px',
                borderColor: GREEN,
                background: '#fff',
                boxShadow: '0 18px 50px rgba(0,0,0,.12)',
                display: 'flex',
                gap: 20,
                alignItems: 'center',
                ...enter(t, 75.44, { y: 16, scale: 0.96 }),
                opacity: prog(t, 75.44, 0.5) * (1 - prog(t, 82.0, 0.4)),
              }}
            >
              <Check size={40} color={GREEN} />
              <div>
                <div style={{ fontSize: 30, fontWeight: 600 }}>Already have instructions saved?</div>
                <div style={{ fontSize: 24, color: MUTED, marginTop: 4 }}>
                  Review them first, and <span className="kit-mark" style={markStyle(t, 79.2)}>keep anything you still want Copilot to use.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 11 — Save customisation */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          t={t}
          start={125.6}
          src={shot('04-3cs-instruction-editor')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 125.6, x: 1072, y: 470, s: 1.9, dur: 0.01 },
            { at: 126.4, x: 1150, y: 690, s: 1.9, dur: 1.0 },
          ]}
          cursor={[
            { at: 125.8, x: 1000, y: 470 },
            { at: 127.6, x: 1268, y: 779, click: true, dur: 0.8 },
          ]}
          rings={[{ at: 128.4, x: 1195, y: 759, w: 146, h: 40, spot: true }]}
          steps={[
            { at: 126.64, text: 'Happy with your 3Cs?' },
            { at: 128.4, text: 'Select Save customisation' },
            { at: 132.32, text: 'Some versions: Save instructions' },
          ]}
        />
      </Scene>

      {/* 12 — Saved banner */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          t={t}
          start={133.84}
          src={shot('05-profile-saved')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 133.84, x: 1150, y: 690, s: 1.9, dur: 0.01 },
            { at: 134.2, x: 1072, y: 300, s: 2.0, dur: 1.0 },
          ]}
          rings={[{ at: 135.6, x: 803, y: 227, w: 538, h: 48, spot: true }]}
          steps={[
            { at: 134.56, text: 'Look for the confirmation' },
            { at: 135.73, text: 'Custom instructions have been saved.' },
          ]}
        />
      </Scene>

      {/* 13 — A starting profile */}
      <Scene t={t} index={12}>
        <div className="kit-label" style={enter(t, 138.2, { y: 14 })}>And that's it</div>
        <div className="kit-h2" style={{ maxWidth: 1500, ...enter(t, 138.4, { dur: 0.8, y: 30 }) }}>
          Copilot now has a <span className="kit-mark" style={markStyle(t, 140.36)}>starting profile.</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 70 }}>
          {['New conversation', 'New conversation', 'New conversation'].map((c, i) => (
            <div key={i} className="kit-card kit-ui" style={{ width: 480, padding: '26px 28px', ...enter(t, 143.2 + i * 0.45, { y: 30, easing: BACK }) }}>
              <div style={{ fontSize: 26, fontWeight: 600 }}>{c}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 16, ...enter(t, 144.6 + i * 0.4, { y: 0, scale: 0.7, easing: BACK }) }}>
                <span className="kit-tag">3Cs profile</span>
                <span style={{ fontSize: 20, color: MUTED }}>No re-briefing</span>
              </div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 14 — New chat + test prompt */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          t={t}
          start={147.12}
          src={shot('06-new-chat-test-prompt')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 148.4, x: 520, y: 300, s: 1.6, dur: 1.0 },
            { at: 156.36, x: 1088, y: 520, s: 1.7, dur: 1.0 },
          ]}
          cursor={[
            { at: 148.6, x: 700, y: 500 },
            { at: 149.0, x: 77, y: 114, click: true, dur: 0.7 },
            { at: 165.8, x: 1440, y: 560, click: true, dur: 1.0 },
          ]}
          rings={[
            { at: 149.7, until: 155.9, x: 10, y: 97, w: 232, h: 34 },
            { at: 158.32, x: 702, y: 457, w: 772, h: 138, spot: true },
          ]}
          steps={[
            { at: 149.04, text: 'Open a new chat' },
            { at: 152.6, text: 'Check whether the response reflects your profile' },
            { at: 158.32, text: 'The test prompt' },
          ]}
        />
      </Scene>

      {/* 15 — What to check */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          t={t}
          start={168.08}
          src={shot('07-singapore-response')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          left={80}
          top={150}
          width={1060}
          cam={[{ at: 169.0, x: 1080, y: 420, s: 1.6, dur: 1.4 }]}
        />
        <div style={{ position: 'absolute', left: 1200, top: 190, width: 640 }}>
          <div className="kit-label" style={enter(t, 168.3, { y: 14 })}>Pay attention to the answer</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 14 }}>
            {[
              ['Understands my role and audience', 171.76],
              ['Uses my preferred tone', 174.16],
              ['Structure that works for me', 175.92],
              ['Challenges assumptions, flags what to validate', 179.68],
            ].map(([label, at]) => (
              <div key={label as string} className="kit-card kit-ui" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 27, fontWeight: 600, ...enter(t, at as number, { x: 30, y: 0, easing: BACK }) }}>
                <div style={{ flex: 'none', width: 44, height: 44, borderRadius: 12, border: `2px solid ${LINE}`, display: 'grid', placeItems: 'center' }}>
                  <span style={{ opacity: prog(t, (at as number) + 0.5, 0.3) }}>
                    <Check size={30} color={GREEN} />
                  </span>
                </div>
                {label as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 16 — What the test showed */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          t={t}
          start={183.6}
          src={shot('07-singapore-response')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 183.6, x: 1080, y: 420, s: 1.6, dur: 0.01 },
            { at: 184.6, x: 1080, y: 340, s: 1.8, dur: 1.0 },
            { at: 187.2, x: 1080, y: 560, s: 1.35, dur: 0.9 },
            { at: 189.1, x: 1080, y: 340, s: 1.8, dur: 0.9 },
          ]}
          rings={[
            { at: 185.64, until: 187.2, x: 685, y: 295, w: 790, h: 68, spot: true },
            { at: 187.36, until: 189.2, x: 693, y: 384, w: 320, h: 40 },
            { at: 188.04, until: 189.2, x: 685, y: 426, w: 800, h: 420 },
            { at: 189.6, x: 860, y: 311, w: 620, h: 64, spot: true },
          ]}
          steps={[
            { at: 185.64, text: 'An early recommendation' },
            { at: 187.36, text: 'Headings and bullet points' },
            { at: 189.32, text: 'Pushes back on committing resources now' },
          ]}
        />
      </Scene>

      {/* 17 — Still quite long */}
      <Scene t={t} index={16}>
        <div style={{ display: 'flex', gap: 70, alignItems: 'center' }}>
          <div className="kit-card" style={{ width: 760, height: 780, overflow: 'hidden', position: 'relative', flex: 'none', boxShadow: '0 18px 50px rgba(0,0,0,.08)', ...enter(t, 192.4, { y: 20 }) }}>
            <div style={{ transform: `translateY(${-prog(t, 192.7, 4.6, IN_OUT) * 2100}px)`, padding: '10px 0' }}>
              {['07-singapore-response', '08-validation-checklist', '09-response-conclusion', '10-response-final-section'].map((n) => (
                <AnswerSlice key={n} src={shot(n)} w={756} />
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div className="kit-label" style={enter(t, 192.5, { y: 14 })}>But</div>
            <div className="kit-h2" style={enter(t, 192.7, { dur: 0.8, y: 30 })}>
              Still <span className="kit-mark" style={markStyle(t, 193.6)}>quite long.</span>
            </div>
            <div className="kit-card kit-ui" style={{ marginTop: 50, padding: '26px 30px', ...enter(t, 195.76, { y: 20 }) }}>
              <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.1em', color: MUTED }}>COMMUNICATION</div>
              <div style={{ fontSize: 30, marginTop: 10 }}>“Be concise and direct.”</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18, ...enter(t, 197.68, { y: 0, scale: 0.7, easing: BACK }) }}>
                <span className="kit-tag">Make it more specific</span>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 18 — Other context */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={198.96}
          src={shot('10-response-final-section')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 199.2, x: 700, y: 260, s: 1.6, dur: 1.0 },
            { at: 202.6, x: 1085, y: 640, s: 1.7, dur: 1.0 },
          ]}
          rings={[
            { at: 200.64, until: 202.6, x: 264, y: 8, w: 80, h: 36 },
            { at: 203.36, x: 699, y: 583, w: 772, h: 88, spot: true },
          ]}
          steps={[
            { at: 199.84, text: 'Copilot also draws on other context' },
            { at: 203.36, text: 'Including your work sources' },
            { at: 205.04, text: "One answer can't show what came from your profile" },
          ]}
        />
      </Scene>

      {/* 19 — Refine your profile */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t}
          start={209.68}
          src={shot('11-profile-persistence')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[{ at: 212.8, x: 1072, y: 430, s: 1.8, dur: 1.0 }]}
          cursor={[
            { at: 212.0, x: 900, y: 700 },
            { at: 214.2, x: 1150, y: 470, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 214.88, x: 802, y: 399, w: 540, h: 106, spot: true }]}
          steps={[
            { at: 210.0, text: 'Making the same corrections?' },
            { at: 213.44, text: 'Back to Customise Copilot' },
            { at: 214.88, text: 'Refine your profile' },
          ]}
        />
      </Scene>

      {/* 20 — The goal */}
      <Scene t={t} index={19}>
        <div className="kit-label" style={enter(t, 216.7, { y: 14 })}>The goal</div>
        <div className="kit-h1" style={enter(t, 217.4, { dur: 0.8, y: 30 })}>Less time briefing Copilot.</div>
        <div className="kit-h1" style={{ marginTop: 10, ...enter(t, 219.4, { dur: 0.8, y: 30 }) }}>
          More time on <span className="kit-mark" style={markStyle(t, 220.4)}>useful work.</span>
        </div>
      </Scene>

      {/* 21 — Persistent, not task-specific */}
      <Scene t={t} index={20}>
        <div className="kit-label" style={enter(t, 222.0, { y: 14 })}>Practical notes</div>
        <div className="kit-h2" style={enter(t, 224.8, { dur: 0.8, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 225.92)}>Persistent</span>, not task-specific.
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 64, alignItems: 'stretch' }}>
          <div className="kit-card kit-ui" style={{ width: 860, padding: '28px 32px', borderColor: GREEN, ...enter(t, 228.8, { y: 24 }) }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.1em', color: GREEN }}>CUSTOM INSTRUCTIONS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 18 }}>
              {[
                ['Role', 229.04],
                ['Audience', 229.8],
                ['Communication preferences', 230.76],
                ['Working style', 232.16],
              ].map(([l, at]) => (
                <span key={l as string} className="kit-pill" style={{ fontSize: 26, padding: '12px 22px', background: LIME_SOFT, borderColor: GREEN, ...enter(t, at as number, { y: 0, scale: 0.7, easing: BACK }) }}>
                  {l as string}
                </span>
              ))}
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ width: 620, padding: '28px 32px', ...enter(t, 234.08, { y: 24 }) }}>
            <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: '.1em', color: MUTED }}>YOUR PROMPT</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 18 }}>
              <span className="kit-pill" style={{ fontSize: 26, padding: '12px 22px', ...enter(t, 235.68, { y: 0, scale: 0.7, easing: BACK }) }}>
                Details for one task
              </span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 22 — Concise and specific */}
      <Scene t={t} index={21}>
        <div className="kit-label" style={enter(t, 238.1, { y: 14 })}>Practical notes</div>
        <div className="kit-h2" style={enter(t, 238.2, { dur: 0.8, y: 30 })}>
          Keep it <span className="kit-mark" style={markStyle(t, 238.56)}>concise and specific.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 60, maxWidth: 1200 }}>
          {[
            ['No published character limit found', 241.52],
            ['Focus on useful standing preferences', 245.2],
            ['Follow any limit your version shows you', 247.76],
          ].map(([l, at]) => (
            <div key={l as string} className="kit-card kit-ui" style={{ padding: '22px 28px', fontSize: 32, display: 'flex', alignItems: 'center', gap: 20, ...enter(t, at as number, { x: -30, y: 0 }) }}>
              <span style={{ width: 14, height: 14, borderRadius: 7, background: LIME, flex: 'none' }} />
              {l as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 23 — Turning it off */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          t={t}
          start={250.16}
          src={shot('03-personalisation')}
          imgW={IMG_W}
          imgH={IMG_H}
          title="copilot.cloud.microsoft"
          cam={[
            { at: 252.8, x: 900, y: 420, s: 1.4, dur: 1.0 },
            { at: 254.72, x: 1180, y: 380, s: 2.2, dur: 1.0 },
          ]}
          cursor={[
            { at: 252.9, x: 800, y: 650 },
            { at: 254.6, x: 1318, y: 366, dur: 0.8 },
          ]}
          rings={[
            { at: 253.36, until: 254.7, x: 578, y: 316, w: 190, h: 42 },
            { at: 255.24, x: 1284, y: 343, w: 52, h: 32, spot: true },
          ]}
          steps={[
            { at: 250.4, text: 'Custom Instructions can be turned off' },
            { at: 255.24, text: 'The toggle beside Customise Copilot' },
            { at: 257.68, text: 'Off: not applied, but your text is kept' },
          ]}
        />
      </Scene>

      {/* 24 — Availability */}
      <Scene t={t} index={23}>
        <div className="kit-label" style={enter(t, 263.2, { y: 14 })}>Availability</div>
        <div className="kit-h2" style={enter(t, 263.4, { dur: 0.8, y: 30 })}>
          Depends on your <span className="kit-mark" style={markStyle(t, 264.8)}>organization.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 70 }}>
          <div className="kit-card kit-ui" style={{ width: 640, padding: '28px 32px', display: 'flex', alignItems: 'center', gap: 24, ...enter(t, 266.24, { y: 24 }) }}>
            <Toggle on={1 - prog(t, 269.08, 0.4, IN_OUT)} />
            <div style={{ fontSize: 28, fontWeight: 600 }}>Personalization unavailable or switched off?</div>
          </div>
          <Arrow t={t} at={269.8} w={140} />
          <div className="kit-card kit-ui" style={{ width: 600, padding: '28px 32px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 270.08, { dur: 0.6, scale: 0.8, y: 0, easing: BACK }) }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>Check with your Microsoft 365 administrator</div>
          </div>
        </div>
      </Scene>

      {/* 25 — Closing */}
      <Scene t={t} index={24} padStyle={{ opacity: 1 - prog(t, 291.2, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 273.3, { y: 14 })}>And finally</div>
        <div className="kit-h2" style={{ maxWidth: 1500, ...enter(t, 273.5, { dur: 0.8, y: 30 }) }}>
          Treat your profile as something to <span className="kit-mark" style={markStyle(t, 275.84)}>refine.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 64 }}>
          <div className="kit-card kit-ui" style={{ padding: '24px 30px', fontSize: 30, ...enter(t, 278.0, { y: 20 }) }}>Same correction, again and again?</div>
          <Arrow t={t} at={281.0} w={120} />
          <div className="kit-card kit-ui" style={{ padding: '24px 30px', fontSize: 30, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 281.6, { dur: 0.6, scale: 0.8, y: 0, easing: BACK }) }}>
            It may belong in your profile.
          </div>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 60, ...enter(t, 285.36, { y: 14 }) }}>
          Instructions guide responses. They don't guarantee every answer follows every preference.
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const CopilotPersonalization: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={COPILOT_PERSONALIZATION_TITLE_FRAMES}>
      <TitleCardGreen label="MICROSOFT 365 COPILOT" title="Your 3Cs Profile in Copilot" />
    </Sequence>
    <Sequence from={COPILOT_PERSONALIZATION_TITLE_FRAMES}>
      <CopilotPersonalizationBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
