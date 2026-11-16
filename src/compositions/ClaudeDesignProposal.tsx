import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { AppWindow, Arrow, BACK, Check, FileIcon, GREEN, INK, KIT_CSS, LIME_SOFT, LINE, MUTED, enter, makeScene, markStyle, prog } from '../kit';

loadSerif();
loadSans();

// Claude Design: interactive client proposal walkthrough (Lead with AI).
// Built with the demo kit (src/kit). Every cue is in SECONDS of the VO (audio/claude-design-proposal.mp3,
// Daan on ElevenLabs v4, 185.0s), from the Scribe word timestamps in src/data/claude-design-proposal.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
// Screenshots: claude-design-proposal/images/*.jpg, 1920x958. The email in 04 and 18 is blurred in the file.
//
//  #  scene                          start   VO cue
//  1  Brief to design                0.00    "Claude Design lets you turn a written brief…"
//  2  How it works                   8.10    "You can start with an idea…"
//  3  This walkthrough               21.60   "In this walkthrough…"
//  4  Artifacts > Design             44.00   "In Claude's sidebar, I open Artifacts…"
//  5  Chat + canvas                  48.96   "The chat sits on the left…"
//  6  Attach                         52.70   "I attach two files."
//  7  Files + prompt                 54.60   "The business proposal gives Claude…" / "Now I paste my prompt."
//  8  First result                   95.90   "Claude builds the proposal on the canvas."
//  9  Timeline                       102.90  "The timeline gives the client a way…"
//  10 Follow-up prompt + previews    109.30  "Next, I want the client to see…"
//  11 Explore the desk               124.70  "Clicking Explore the desk…"
//  12 Landing page                   127.20  "…opens the landing page."
//  13 Play > Proposal website        136.60  "Before sharing, I test the live page."
//  14 Check 1: tabs                  142.80  "Then I check three things."
//  15 Check 2: link                  148.30  "Explore the desk opens the landing page."
//  16 Check 3: price                 151.30  "And the price and scope match…"
//  17 Phone width                    154.80  "…readable at phone width."
//  18 Share                          157.90  "Then I open Share."
//  19 Closing                        171.60  "One last point…"

export const CLAUDE_DESIGN_PROPOSAL_DURATION_S = 186.5;
export const CLAUDE_DESIGN_PROPOSAL_TITLE_FRAMES = 90;

const STARTS = [
  0, 8.1, 21.6, 44.0, 48.96, 52.7, 54.6, 95.9, 102.9, 109.3, 124.7, 127.2, 136.6, 142.8, 148.3, 151.3, 154.8, 157.9,
  171.6,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;

// Browser previews can inject the screenshots (as data URIs) via globalThis.CDP_SHOTS; renders use public/.
const shot = (n: string): string =>
  (globalThis as { CDP_SHOTS?: Record<string, string> }).CDP_SHOTS?.[n] ??
  staticFile(`claude-design-proposal/images/${n}.jpg`);

// Small illustrations for the four output types in scene 1.
const Mini: React.FC<{ kind: number }> = ({ kind }) => {
  const bar = (w: number, h = 10, c = LINE): React.CSSProperties => ({ width: w, height: h, borderRadius: 4, background: c });
  const box: React.CSSProperties = { width: 200, height: 120, border: `2px solid ${LINE}`, borderRadius: 10, padding: 14, display: 'flex', flexDirection: 'column', gap: 8, background: '#FBFBF8' };
  if (kind === 0)
    return (
      <div style={box}>
        <div style={bar(120, 16, GREEN)} />
        <div style={{ display: 'flex', gap: 8, flex: 1 }}>
          <div style={{ flex: 1, borderRadius: 6, background: LIME_SOFT }} />
          <div style={{ flex: 1, borderRadius: 6, background: '#E8E4D8' }} />
        </div>
      </div>
    );
  if (kind === 1)
    return (
      <div style={box}>
        <div style={bar(160, 8)} />
        <div style={bar(110, 16, INK)} />
        <div style={bar(140, 8)} />
        <div style={{ ...bar(70, 18, GREEN), marginTop: 'auto' }} />
      </div>
    );
  if (kind === 2)
    return (
      <div style={{ ...box, flexDirection: 'row', alignItems: 'flex-end' }}>
        <div style={{ width: 54, height: 92, border: `2px solid ${INK}`, borderRadius: 10, padding: 5, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <div style={{ flex: 1, borderRadius: 4, background: '#E8E4D8' }} />
          <div style={bar(34, 6)} />
        </div>
        <div style={{ flex: 1, height: 70, marginLeft: 12, borderRadius: 6, background: LIME_SOFT }} />
      </div>
    );
  return (
    <div style={box}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ ...bar(46, 18, GREEN) }} />
        <div style={{ ...bar(46, 18) }} />
        <div style={{ ...bar(46, 18) }} />
      </div>
      <div style={{ flex: 1, borderRadius: 6, background: '#E8E4D8' }} />
    </div>
  );
};

const StepCard: React.FC<{ t: number; at: number; n: number; title: string; children?: React.ReactNode }> = ({ t, at, n, title, children }) => (
  <div className="kit-card" style={{ width: 330, minHeight: 300, padding: 30, display: 'flex', flexDirection: 'column', gap: 18, ...enter(t, at, { y: 30, easing: BACK }) }}>
    <div style={{ width: 52, height: 52, borderRadius: 26, background: GREEN, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700 }}>{n}</div>
    <div className="kit-h3" style={{ fontSize: 36 }}>{title}</div>
    {children}
  </div>
);

const CheckRow: React.FC<{ t: number; at: number; children: React.ReactNode; size?: number }> = ({ t, at, children, size = 40 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: size, ...enter(t, at, { x: -30, y: 0 }) }}>
    <div style={enter(t, at + 0.15, { y: 0, scale: 0.4, easing: BACK })}>
      <Check size={size + 6} />
    </div>
    <span>{children}</span>
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
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/claude-design-proposal.mp3')} />}

      {/* 1 — Brief to design */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Claude Design</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          From a written brief to a <span className="kit-mark" style={markStyle(t, 2.3)}>finished design.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 80 }}>
          <div className="kit-card" style={{ width: 260, height: 300, padding: 28, display: 'flex', flexDirection: 'column', gap: 14, ...enter(t, 1.5, { y: 24 }) }}>
            <FileIcon size={52} accent />
            <div className="kit-h3" style={{ fontSize: 32 }}>Brief</div>
            {[180, 150, 190, 120].map((w, i) => (
              <div key={i} style={{ width: w, height: 10, borderRadius: 5, background: LINE }} />
            ))}
          </div>
          <Arrow t={t} at={2.6} w={150} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 470px)', gap: 26 }}>
            {[
              ['One-page visuals', 3.28],
              ['Landing pages', 4.08],
              ['Product mockups', 5.28],
              ['Interactive prototypes', 6.4],
            ].map(([label, at], i) => (
              <div key={label as string} className="kit-card" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 20, ...enter(t, at as number, { y: 20, scale: 0.92, easing: BACK }) }}>
                <Mini kind={i} />
                <div style={{ fontSize: 30, fontWeight: 600 }}>{label as string}</div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 2 — How it works */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 8.2, { y: 14 })}>How it works</div>
        <div className="kit-h2" style={enter(t, 8.3, { dur: 0.8, y: 30 })}>
          Start, review, <span className="kit-mark" style={markStyle(t, 16.4)}>refine in conversation</span>, share.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 70 }}>
          <StepCard t={t} at={8.68} n={1} title="Start">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <span className="kit-pill" style={{ fontSize: 22, ...enter(t, 9.12, { y: 0, scale: 0.6, easing: BACK }) }}>An idea</span>
              <span className="kit-pill" style={{ fontSize: 22, ...enter(t, 11.76, { y: 0, scale: 0.6, easing: BACK }) }}>A proposal</span>
              <span className="kit-pill" style={{ fontSize: 22, ...enter(t, 12.68, { y: 0, scale: 0.6, easing: BACK }) }}>A pitch deck</span>
            </div>
          </StepCard>
          <Arrow t={t} at={13.8} w={60} />
          <StepCard t={t} at={14.36} n={2} title="Review">
            <div className="kit-body" style={{ fontSize: 24, color: MUTED }}>The result appears on the canvas.</div>
          </StepCard>
          <Arrow t={t} at={15.7} w={60} />
          <StepCard t={t} at={16.16} n={3} title="Refine">
            <div className="kit-body" style={{ fontSize: 24, color: MUTED }}>Ask for changes in the chat.</div>
          </StepCard>
          <Arrow t={t} at={18.1} w={60} />
          <StepCard t={t} at={18.56} n={4} title="Share">
            <span className="kit-tag" style={{ alignSelf: 'flex-start', fontSize: 20, ...enter(t, 19.2, { y: 0, scale: 0.6, easing: BACK }) }}>Share by link</span>
          </StepCard>
        </div>
      </Scene>

      {/* 3 — This walkthrough */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 21.8, { y: 14 })}>This walkthrough</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 26, ...enter(t, 26.3, { dur: 0.8, y: 30 }) }}>
          <div className="kit-h1">Oakfield Furniture</div>
          <span className="kit-tag" style={{ fontSize: 22, ...enter(t, 27.76, { y: 0, scale: 0.6, easing: BACK }) }}>Fictional client</span>
        </div>
        <div className="kit-body" style={{ fontSize: 34, color: MUTED, marginTop: 10, ...enter(t, 23.44, { y: 16 }) }}>
          A client proposal, turned into an <span className="kit-mark" style={markStyle(t, 25.2)}>interactive website.</span>
        </div>
        <div style={{ display: 'flex', gap: 60, marginTop: 64 }}>
          <div className="kit-card" style={{ width: 820, padding: 40, display: 'flex', flexDirection: 'column', gap: 24, ...enter(t, 29.0, { y: 24 }) }}>
            <div className="kit-label" style={{ marginBottom: 0 }}>The offer</div>
            <div style={{ display: 'flex', gap: 60 }}>
              <div style={enter(t, 29.44, { y: 16, easing: BACK })}>
                <div style={{ fontSize: 22, color: MUTED, letterSpacing: 1 }}>INVESTMENT</div>
                <div className="kit-h1" style={{ fontSize: 84, color: GREEN }}>$24,000</div>
              </div>
              <div style={enter(t, 30.96, { y: 16, easing: BACK })}>
                <div style={{ fontSize: 22, color: MUTED, letterSpacing: 1 }}>DURATION</div>
                <div className="kit-h1" style={{ fontSize: 84, color: GREEN, whiteSpace: 'nowrap' }}>90 days</div>
              </div>
            </div>
            <div style={{ fontSize: 30, ...enter(t, 32.56, { y: 12 }) }}>
              Campaign for the <b>Linden Compact Desk</b>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, justifyContent: 'center' }}>
            <div style={{ fontSize: 26, color: MUTED, ...enter(t, 34.6, { y: 10 }) }}>The website will have</div>
            <CheckRow t={t} at={35.68} size={36}>A clickable campaign timeline</CheckRow>
            <CheckRow t={t} at={37.16} size={36}>Ad and landing page previews</CheckRow>
            <CheckRow t={t} at={41.04} size={36}>The look of an earlier pitch deck</CheckRow>
          </div>
        </div>
      </Scene>

      {/* 4 — Artifacts > Design */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={44.0}
          src={shot('01-artifacts-design-and-slides')}
          cursor={[
            { at: 44.2, x: 900, y: 520 },
            { at: 45.4, x: 74, y: 201, click: true, dur: 0.8 },
            { at: 47.0, x: 1058, y: 222, click: true, dur: 0.8 },
          ]}
          cam={[{ at: 47.3, x: 1060, y: 260, s: 1.6, dur: 0.9 }]}
          rings={[
            { at: 46.16, until: 47.3, x: 10, y: 186, w: 258, h: 30 },
            { at: 47.84, x: 999, y: 172, w: 120, h: 112, spot: true },
          ]}
          steps={[
            { at: 46.16, text: 'Artifacts' },
            { at: 47.84, text: 'Design' },
          ]}
        />
      </Scene>

      {/* 5 — Chat + canvas */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={48.96}
          src={shot('02-design-chat-and-canvas')}
          rings={[
            { at: 49.2, until: 50.6, x: 282, y: 46, w: 540, h: 910, spot: true },
            { at: 50.72, x: 826, y: 46, w: 1092, h: 910, spot: true },
          ]}
          steps={[
            { at: 49.2, text: 'Chat on the left' },
            { at: 50.72, text: 'Design canvas on the right' },
          ]}
        />
      </Scene>

      {/* 6 — Attach */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={52.7}
          src={shot('03-attach-reference-files')}
          cursor={[
            { at: 52.7, x: 560, y: 760 },
            { at: 52.8, x: 322, y: 938, click: true, dur: 0.5 },
          ]}
          cam={[{ at: 53.1, x: 470, y: 790, s: 1.9, dur: 0.8 }]}
          rings={[{ at: 53.76, x: 318, y: 701, w: 222, h: 30, spot: true }]}
          steps={[{ at: 53.76, text: 'Upload or add files' }]}
        />
      </Scene>

      {/* 7 — Files + prompt */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={54.6}
          src={shot('05-two-references-and-prompt')}
          cam={[
            { at: 54.6, x: 460, y: 600, s: 2.1, dur: 0.01 },
            { at: 64.32, x: 520, y: 640, s: 1.5, dur: 1.0 },
            { at: 70.16, x: 540, y: 780, s: 2.0, dur: 1.0 },
          ]}
          cursor={[
            { at: 70.3, x: 700, y: 640 },
            { at: 93.9, x: 779, y: 896, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 54.96, until: 60.4, x: 315, y: 513, w: 120, h: 120, spot: true },
            { at: 60.64, until: 64.2, x: 443, y: 513, w: 120, h: 120, spot: true },
            { at: 72.96, until: 78.9, x: 310, y: 656, w: 444, h: 56 },
            { at: 79.2, until: 83.8, x: 310, y: 718, w: 444, h: 42 },
            { at: 84.48, until: 90.1, x: 310, y: 762, w: 444, h: 84 },
            { at: 91.44, until: 94.2, x: 310, y: 845, w: 444, h: 62 },
          ]}
          steps={[
            { at: 54.96, text: 'The proposal: scope, price, deliverables, timeline' },
            { at: 60.64, text: 'The pitch deck: colors, fonts, visual style' },
            { at: 64.32, text: 'Content + a visual reference' },
            { at: 70.16, text: 'Paste the prompt' },
            { at: 72.96, text: 'A single-page interactive proposal website' },
            { at: 79.2, text: 'One offer: goal, what’s included, next step' },
            { at: 84.48, text: 'Plan, Launch and Review tabs + timeline' },
            { at: 91.44, text: 'Clean, mobile-friendly, shareable by link' },
          ]}
        />
      </Scene>

      {/* 8 — First result */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={95.9}
          src={shot('06-first-generated-proposal')}
          cam={[
            { at: 98.6, x: 1116, y: 330, s: 2.4, dur: 1.0 },
            { at: 100.7, x: 320, y: 780, s: 1.7, dur: 1.0 },
          ]}
          rings={[
            { at: 96.4, until: 98.6, x: 995, y: 154, w: 242, h: 698, spot: true },
            { at: 101.12, x: 20, y: 724, w: 512, h: 150 },
          ]}
          steps={[
            { at: 96.4, text: 'The proposal, built on the canvas' },
            { at: 98.88, text: 'Compare the look with the pitch deck' },
            { at: 101.12, text: 'Check the content against the proposal' },
          ]}
        />
      </Scene>

      {/* 9 — Timeline */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={102.9}
          src={shot('10-plan-chart-and-deliverables')}
          cursor={[
            { at: 102.9, x: 1250, y: 700 },
            { at: 103.4, x: 733, y: 316, click: true, dur: 0.7 },
            { at: 105.0, x: 880, y: 480, click: true, dur: 0.7 },
          ]}
          cam={[{ at: 105.9, x: 1237, y: 620, s: 1.4, dur: 1.0 }]}
          rings={[
            { at: 103.2, until: 105.0, x: 675, y: 291, w: 356, h: 52 },
            { at: 105.84, x: 675, y: 602, w: 1124, h: 324, spot: true },
          ]}
          steps={[
            { at: 103.2, text: 'Planned campaign timeline' },
            { at: 105.84, text: 'What happens in each phase' },
          ]}
        />
      </Scene>

      {/* 10 — Follow-up prompt + previews */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={109.3}
          src={shot('11-social-ad-preview')}
          cam={[
            { at: 109.3, x: 330, y: 230, s: 2.0, dur: 0.01 },
            { at: 119.0, x: 1237, y: 560, s: 1.25, dur: 1.0 },
          ]}
          rings={[
            { at: 109.6, until: 118.9, x: 100, y: 68, w: 447, h: 257 },
            { at: 119.84, until: 120.9, x: 675, y: 383, w: 420, h: 56 },
            { at: 121.08, until: 121.9, x: 675, y: 495, w: 136, h: 52 },
            { at: 122.0, until: 123.9, x: 815, y: 495, w: 164, h: 52 },
            { at: 124.12, x: 1105, y: 839, w: 300, h: 30, spot: true },
          ]}
          steps={[
            { at: 109.6, text: 'A follow-up prompt' },
            { at: 114.72, text: 'Keep the site, branding and offer' },
            { at: 119.84, text: 'Add campaign previews' },
            { at: 121.08, text: 'Social ad' },
            { at: 122.0, text: 'Landing page' },
            { at: 124.12, text: 'Each with its own headline' },
          ]}
        />
      </Scene>

      {/* 11 — Explore the desk */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={124.7}
          src={shot('13-social-ad-headline-and-cta')}
          cam={[
            { at: 124.7, x: 1300, y: 760, s: 1.8, dur: 0.01 },
            { at: 126.3, x: 1100, y: 560, s: 1.2, dur: 0.8 },
          ]}
          cursor={[
            { at: 124.8, x: 1560, y: 700 },
            { at: 126.4, x: 897, y: 433, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 125.36, until: 126.5, x: 1105, y: 790, w: 590, h: 32, spot: true }]}
          steps={[{ at: 125.36, text: '“Explore the desk”' }]}
        />
      </Scene>

      {/* 12 — Landing page */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={127.2}
          src={shot('12-landing-page-tab')}
          cam={[
            { at: 127.2, x: 1100, y: 560, s: 1.2, dur: 0.01 },
            { at: 127.5, x: 1200, y: 720, s: 1.4, dur: 1.0 },
          ]}
          rings={[
            { at: 127.84, until: 132.9, x: 726, y: 648, w: 470, h: 124, spot: true },
            { at: 133.2, x: 1235, y: 610, w: 507, h: 332 },
          ]}
          steps={[
            { at: 127.84, text: 'The landing page opens' },
            { at: 130.16, text: 'From ad to landing page' },
            { at: 133.2, text: 'Feedback on the creative direction' },
          ]}
        />
      </Scene>

      {/* 13 — Play > Proposal website */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={136.6}
          src={shot('06-first-generated-proposal')}
          cam={[{ at: 137.4, x: 1130, y: 300, s: 2.0, dur: 1.0 }]}
          cursor={[
            { at: 136.8, x: 1500, y: 620 },
            { at: 139.3, x: 1212, y: 140, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 140.0, until: 141.1, x: 1188, y: 130, w: 50, h: 20 },
            { at: 141.2, x: 993, y: 130, w: 108, h: 20, spot: true },
          ]}
          steps={[
            { at: 137.84, text: 'Test the live page' },
            { at: 140.0, text: 'Play' },
            { at: 141.2, text: 'Proposal website' },
          ]}
        />
      </Scene>

      {/* 14 — Check 1: tabs */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={142.8}
          src={shot('08-launch-tab-and-deliverables')}
          cursor={[
            { at: 142.9, x: 1250, y: 700 },
            { at: 144.4, x: 853, y: 316, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 145.12, until: 146.0, x: 675, y: 291, w: 356, h: 52 },
            { at: 146.0, x: 675, y: 602, w: 1124, h: 274, spot: true },
          ]}
          steps={[
            { at: 142.88, text: 'Check three things' },
            { at: 145.12, text: 'Check: tabs and timeline show the right deliverables' },
          ]}
        />
      </Scene>

      {/* 15 — Check 2: link */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={148.3}
          src={shot('14-landing-headline-placeholder')}
          cam={[{ at: 148.3, x: 1100, y: 640, s: 1.3, dur: 0.8 }]}
          rings={[{ at: 148.6, x: 726, y: 648, w: 470, h: 124, spot: true }]}
          steps={[{ at: 148.48, text: 'Check: “Explore the desk” opens the landing page' }]}
        />
      </Scene>

      {/* 16 — Check 3: price */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={151.3}
          src={shot('12-investment-and-payment')}
          cam={[{ at: 151.3, x: 1240, y: 400, s: 1.4, dur: 0.8 }]}
          rings={[
            { at: 151.92, until: 152.9, x: 1213, y: 538, w: 590, h: 44, spot: true },
            { at: 152.9, x: 1213, y: 226, w: 590, h: 360, spot: true },
          ]}
          steps={[{ at: 151.92, text: 'Check: price and scope match the proposal' }]}
        />
      </Scene>

      {/* 17 — Phone width */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={154.8}
          src={shot('17-phone-width-offer')}
          cam={[{ at: 154.9, x: 1500, y: 520, s: 1.35, dur: 0.9 }]}
          rings={[{ at: 155.12, x: 1524, y: 86, w: 384, h: 870, spot: true }]}
          steps={[{ at: 155.12, text: 'Readable at phone width' }]}
        />
      </Scene>

      {/* 18 — Share */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={157.9}
          src={shot('18-final-website-private-sharing')}
          cursor={[
            { at: 158.0, x: 1400, y: 520 },
            { at: 158.4, x: 1762, y: 22, click: true, dur: 0.6 },
          ]}
          cam={[{ at: 159.6, x: 1600, y: 260, s: 1.9, dur: 1.0 }]}
          rings={[
            { at: 161.92, until: 163.1, x: 1497, y: 312, w: 132, h: 36, spot: true },
            { at: 163.2, until: 165.0, x: 1732, y: 392, w: 154, h: 32, spot: true },
            { at: 167.2, x: 1495, y: 153, w: 391, h: 32, spot: true },
          ]}
          steps={[
            { at: 159.04, text: 'Share' },
            { at: 161.92, text: 'General access: Only you' },
            { at: 163.2, text: 'Copy private link: just for you' },
            { at: 167.2, text: 'To share with a client, give them access here' },
          ]}
        />
      </Scene>

      {/* 19 — Closing */}
      <Scene t={t} index={18} padStyle={{ opacity: 1 - prog(t, 185.5, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 171.8, { y: 14 })}>Before it goes to a client</div>
        <div className="kit-h1" style={enter(t, 172.0, { dur: 0.9, y: 34 })}>
          The previews are <span className="kit-mark" style={markStyle(t, 174.56)}>illustrative mockups.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 80 }}>
          <CheckRow t={t} at={176.4}>Check any new copy Claude adds</CheckRow>
          <CheckRow t={t} at={178.72}>Keep placeholders clearly labeled</CheckRow>
          <CheckRow t={t} at={181.28}>Confirm the final content</CheckRow>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ClaudeDesignProposal: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CLAUDE_DESIGN_PROPOSAL_TITLE_FRAMES}>
      <TitleCardGreen label="CLAUDE" title="Claude Design" />
    </Sequence>
    <Sequence from={CLAUDE_DESIGN_PROPOSAL_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
