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
  FileIcon,
  GREEN,
  INK,
  IN_OUT,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  RED,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// Gemini Notebook: research with evidence. Custom screenshot demo built with the LWAI demo kit (src/kit).
// Every cue is in SECONDS of the VO (audio/gemini-notebook-research.mp3, Daan on ElevenLabs v4, 278.5s),
// taken from the Scribe word timestamps in src/data/gemini-notebook-research.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
// Screenshots: gemini-notebook-research/images/02..14 are 1920x958; 01-home-crop is 1704x850
// (01 cropped to the page content so the browser tabs and bookmarks bar are not shown).
//
//  #  scene                                start   VO cue
//  1  Research with evidence               0.00    "Gemini Notebook is Google's AI-powered research tool…"
//  2  Source grounding                     6.24    "What makes it particularly useful is source grounding…"
//  3  New notebook (01)                    22.96   "First, I open Gemini Notebook and create a new notebook…"
//  4  Bring your own sources               28.16   "I could start by adding existing materials…"
//  5  A focused workspace                  42.72   "That gives me a focused workspace…"
//  6  Web + Deep Research + prompt (03)    53.52   "In the Sources panel, I select Web…"
//  7  Research running (04)                81.20   "I start the research."
//  8  Research complete (05)               92.32   "Once it's ready, I select View sources…"
//  9  Don't import everything              96.72   "Here's an important step…"
//  10 Check the sources (06)               100.56  "I can open the suggested sources…"
//  11 Report + 3 sources (07)              114.08  "For this demonstration, I'll keep the research report…"
//  12 The report is AI synthesis           119.60  "Keep in mind, the report is an AI-generated synthesis…"
//  13 Import (07)                          134.56  "Then I click Import."
//  14 Curated notebook (08)                136.40  "Now I have a selected collection…"
//  15 Ask a grounded question              147.64  "For example, I ask…"
//  16 Click a citation (09)                159.60  "When an answer includes a citation…"
//  17 Select / deselect sources (08)       168.88  "I can also select or deselect…"
//  18 Studio formats (08)                  177.32  "I can also turn the same research into different formats…"
//  19 Briefing (10)                        195.60  "For a briefing, I can specify…"
//  20 Slide deck options (11)              200.24  "For a slide deck, I can choose…"
//  21 Mind map options (12)                206.64  "For a Mind Map, I can specify…"
//  22 Generated mind map (13)              216.32  "Once it's generated, I review the output…"
//  23 Polished but wrong (14)              220.16  "Even a polished presentation can contain incorrect dates…"
//  24 Two reminders                        229.68  "Before we finish, two important reminders."
//  25 Keep sources current                 235.76  "Sources imported from Google Drive can sync…"
//  26 Outputs don't update                 246.72  "And updating a source does not update…"
//  27 Grounding is not accuracy            257.92  "Second, verify the evidence…"
//  28 Verification checklist               266.16  "So check the important citations…"

export const GEMINI_NOTEBOOK_RESEARCH_DURATION_S = 280.3;
export const GEMINI_NOTEBOOK_RESEARCH_TITLE_FRAMES = 90;

const STARTS = [
  0, 6.24, 22.96, 28.16, 42.72, 53.52, 81.2, 92.32, 96.72, 100.56, 114.08, 119.6, 134.56, 136.4, 147.64, 159.6,
  168.88, 177.32, 195.6, 200.24, 206.64, 216.32, 220.16, 229.68, 235.76, 246.72, 257.92, 266.16,
];
const Scene = makeScene(STARTS, 0.5);
const H = 958;
const URL = 'notebook.google.com';

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.GEMINI_NOTEBOOK_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { GEMINI_NOTEBOOK_SHOTS?: Record<string, string> }).GEMINI_NOTEBOOK_SHOTS?.[n] ??
  staticFile(`gemini-notebook-research/images/${n}.png`);

// ── Small concept pieces ────────────────────────────────────────────────────
const Chip: React.FC<{ t: number; at: number; children: React.ReactNode; on?: boolean }> = ({ t, at, children, on }) => (
  <div className="kit-pill" style={{ ...enter(t, at, { y: 16, scale: 0.85, easing: BACK, dur: 0.5 }), background: on ? LIME_SOFT : '#fff', borderColor: on ? LIME : LINE }}>
    {children}
  </div>
);

const Step: React.FC<{ t: number; at: number; n: number; title: string; sub: string; w?: number }> = ({ t, at, n, title, sub, w = 330 }) => (
  <div className="kit-card kit-ui" style={{ width: w, minHeight: 236, padding: '30px 30px 32px', ...enter(t, at, { y: 30, easing: BACK }) }}>
    <div style={{ width: 52, height: 52, borderRadius: 999, background: LIME, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 700 }}>{n}</div>
    <div style={{ fontSize: 36, fontWeight: 600, marginTop: 22 }}>{title}</div>
    <div style={{ fontSize: 24, color: MUTED, marginTop: 10, lineHeight: 1.4 }}>{sub}</div>
  </div>
);

const Row: React.FC<{ t: number; at: number; children: React.ReactNode; ok?: boolean; size?: number }> = ({ t, at, children, ok = true, size = 34 }) => (
  <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: size, ...enter(t, at, { x: -30, y: 0 }) }}>
    {ok ? <Check size={size + 6} /> : <Cross size={size + 6} />}
    <span>{children}</span>
  </div>
);

const DocCard: React.FC<{ label: string; tag?: string; tagColor?: string; dashed?: boolean; style?: React.CSSProperties }> = ({ label, tag, tagColor, dashed, style }) => (
  <div className="kit-card kit-ui" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 14, fontSize: 26, borderStyle: dashed ? 'dashed' : 'solid', ...style }}>
    <FileIcon size={34} accent={!dashed} />
    <span style={{ fontWeight: 600 }}>{label}</span>
    {tag && (
      <span className="kit-tag" style={{ marginLeft: 'auto', fontSize: 14, background: tagColor ?? LIME_SOFT }}>
        {tag}
      </span>
    )}
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
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/gemini-notebook-research.mp3')} />}

      {/* 1 — Research with evidence */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Gemini Notebook</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          AI-powered research,
          <br />
          built on <span className="kit-mark" style={markStyle(t, 5.12)}>evidence.</span>
        </div>
      </Scene>

      {/* 2 — Source grounding */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 6.4, { y: 14 })}>What makes it useful</div>
        <div className="kit-h2" style={enter(t, 6.5, { dur: 0.8, y: 30 })}>
          <span className="kit-mark" style={markStyle(t, 8.32)}>Source grounding</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 70 }}>
          <Step t={t} at={9.92} n={1} title="Discover" sub="Find relevant information" />
          <Arrow t={t} at={11.3} w={70} />
          <Step t={t} at={11.68} n={2} title="Choose" sub="Pick the sources to use" />
          <Arrow t={t} at={13.5} w={70} />
          <Step t={t} at={13.92} n={3} title="Ask" sub="Questions on that material" />
          <Arrow t={t} at={16.4} w={70} />
          <Step t={t} at={16.84} n={4} title="Check" sub="Citations for key claims" />
        </div>
      </Scene>

      {/* 3 — New notebook */}
      <Scene t={t} index={2} pad={false}>
        <AppWindow
          t={t}
          start={22.96}
          src={shot('01-home-crop')}
          imgW={1704}
          imgH={850}
          title={URL}
          cursor={[
            { at: 23.2, x: 900, y: 500 },
            { at: 24.8, x: 1618, y: 116, click: true, dur: 0.6 },
          ]}
          cam={[{ at: 24.4, x: 1400, y: 160, s: 1.8, dur: 1.0 }]}
          rings={[{ at: 25.5, x: 1553, y: 101, w: 130, h: 30, spot: true }]}
          steps={[
            { at: 23.84, text: 'Open Gemini Notebook' },
            { at: 25.36, text: 'New notebook' },
          ]}
        />
      </Scene>

      {/* 4 — Bring your own sources */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 28.3, { y: 14 })}>Option: start with your own material</div>
        <div className="kit-h2" style={enter(t, 28.4, { dur: 0.8, y: 30 })}>Add existing sources</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 60, maxWidth: 1500 }}>
          <Chip t={t} at={30.96}>Google Docs</Chip>
          <Chip t={t} at={32.0}>PDFs</Chip>
          <Chip t={t} at={32.88}>Slides</Chip>
          <Chip t={t} at={33.76}>Word documents</Chip>
          <Chip t={t} at={35.0}>Images</Chip>
          <Chip t={t} at={35.6}>Google Sheets</Chip>
          <Chip t={t} at={37.68}>Web pages</Chip>
          <Chip t={t} at={38.72}>Public YouTube videos with captions</Chip>
          <Chip t={t} at={41.04}>Other supported sources</Chip>
        </div>
      </Scene>

      {/* 5 — A focused workspace */}
      <Scene t={t} index={4}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 640px', gap: 100, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 42.9, { y: 14 })}>One notebook, one topic</div>
            <div className="kit-h2" style={enter(t, 43.0, { dur: 0.8, y: 30 })}>
              A <span className="kit-mark" style={markStyle(t, 43.52)}>focused workspace</span>
            </div>
            <p className="kit-body" style={{ fontSize: 40, marginTop: 50, ...enter(t, 46.64, { y: 16 }) }}>
              For this demo: <b>start with no sources</b>
            </p>
            <p className="kit-body" style={{ fontSize: 40, marginTop: 14, ...enter(t, 49.84, { y: 16 }) }}>
              and let Gemini Notebook <span className="kit-mark" style={markStyle(t, 50.96)}>find them.</span>
            </p>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '34px 36px', ...enter(t, 43.4, { y: 30 }) }}>
            <div style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>NOTEBOOK</div>
            <div style={{ fontSize: 32, fontWeight: 600, marginTop: 12, lineHeight: 1.25 }}>European AI training &amp; consulting</div>
            <div style={{ marginTop: 26, height: 2, background: LINE }} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24 }}>
              <span style={{ fontSize: 26, color: MUTED }}>Sources</span>
              <span className="kit-tag" style={{ background: t >= 48.72 ? LIME_SOFT : '#F1F1EC' }}>0 sources</span>
            </div>
            <div style={{ marginTop: 22, border: `2px dashed ${LINE}`, borderRadius: 16, height: 150, display: 'grid', placeItems: 'center', color: MUTED, fontSize: 24 }}>
              <span style={enter(t, 50.0, { y: 10 })}>Web research will fill this</span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 6 — Web + Deep Research + prompt */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={53.52}
          src={shot('03-deep-research-prompt')}
          title={URL}
          cam={[
            { at: 53.6, x: 260, y: 360, s: 2.2, dur: 1.0 },
            { at: 60.2, x: 260, y: 330, s: 2.5, dur: 1.0 },
            { at: 79.6, x: 300, y: 380, s: 2.2, dur: 0.9 },
          ]}
          cursor={[
            { at: 54.6, x: 200, y: 600 },
            { at: 54.9, x: 80, y: 418, click: true, dur: 0.6 },
            { at: 57.6, x: 222, y: 418, click: true, dur: 0.6 },
            { at: 80.4, x: 450, y: 418, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 53.84, until: 55.3, x: 14, y: 64, w: 470, h: 390 },
            { at: 55.52, until: 57.9, x: 30, y: 402, w: 100, h: 33 },
            { at: 58.08, until: 60.3, x: 136, y: 402, w: 172, h: 33 },
            { at: 60.4, until: 80.2, x: 26, y: 268, w: 440, h: 124, spot: true },
          ]}
          steps={[
            { at: 53.84, text: 'Sources panel' },
            { at: 55.52, text: 'Web' },
            { at: 58.08, text: 'Fast Research → Deep Research' },
            { at: 60.4, text: 'Enter the prompt' },
            { at: 81.2, text: 'Start the research' },
          ]}
        />
      </Scene>

      {/* 7 — Research running */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={81.2}
          src={shot('04-research-in-progress')}
          title={URL}
          cam={[
            { at: 81.2, x: 300, y: 380, s: 2.2, dur: 0.01 },
            { at: 83.2, x: 250, y: 440, s: 2.4, dur: 1.2 },
          ]}
          rings={[{ at: 83.36, x: 22, y: 466, w: 455, h: 62, spot: true }]}
          steps={[
            { at: 81.48, text: 'Deep Research starts' },
            { at: 84.24, text: 'Investigating across multiple websites' },
            { at: 90.56, text: 'This can take a few minutes' },
          ]}
        />
      </Scene>

      {/* 8 — Research complete */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={92.32}
          src={shot('05-deep-research-complete')}
          title={URL}
          cam={[
            { at: 92.32, x: 250, y: 440, s: 2.4, dur: 0.01 },
            { at: 92.5, x: 250, y: 580, s: 2.2, dur: 0.8 },
          ]}
          cursor={[
            { at: 92.6, x: 300, y: 760 },
            { at: 93.1, x: 120, y: 617, click: true, dur: 0.8 },
          ]}
          rings={[{ at: 92.6, x: 36, y: 540, w: 426, h: 96, spot: true }]}
          steps={[
            { at: 92.48, text: 'Report + sources ready' },
            { at: 93.92, text: 'View sources' },
          ]}
        />
      </Scene>

      {/* 9 — Don't import everything */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={enter(t, 96.8, { y: 14 })}>An important step</div>
        <div className="kit-h1" style={enter(t, 97.0, { dur: 0.9, y: 34 })}>
          You don’t have to
          <br />
          <span className="kit-mark" style={markStyle(t, 99.12)}>import everything.</span>
        </div>
      </Scene>

      {/* 10 — Check the sources */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={100.56}
          src={shot('06-source-review-report')}
          title={URL}
          cam={[
            { at: 100.6, x: 370, y: 600, s: 1.9, dur: 1.0 },
            { at: 107.6, x: 370, y: 700, s: 2.3, dur: 1.0 },
          ]}
          cursor={[
            { at: 100.8, x: 500, y: 400 },
            { at: 101.0, x: 628, y: 645, dur: 0.6 },
            { at: 104.4, x: 659, y: 657, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 101.32, until: 107.4, x: 54, y: 515, w: 315, h: 36 },
            { at: 103.2, until: 107.4, x: 56, y: 632, w: 620, h: 170, spot: true },
            { at: 107.84, x: 56, y: 632, w: 620, h: 170, spot: true },
          ]}
          steps={[
            { at: 100.96, text: 'Open the suggested sources' },
            { at: 103.2, text: 'Check dates and credibility' },
            { at: 105.52, text: 'Select the relevant ones' },
            { at: 107.84, text: '“Last 30 days” can still return older material' },
          ]}
        />
      </Scene>

      {/* 11 — Report + 3 sources */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={114.08}
          src={shot('07-report-and-three-sources-selected')}
          title={URL}
          cam={[
            { at: 114.1, x: 370, y: 300, s: 1.8, dur: 1.0 },
            { at: 116.6, x: 370, y: 800, s: 1.8, dur: 0.9 },
          ]}
          rings={[
            { at: 115.84, until: 117.0, x: 54, y: 206, w: 640, h: 42 },
            { at: 117.12, x: 262, y: 888, w: 202, h: 26, spot: true },
          ]}
          steps={[
            { at: 115.84, text: 'Keep the research report' },
            { at: 117.12, text: '+ 3 supporting sources' },
          ]}
        />
      </Scene>

      {/* 12 — The report is AI synthesis */}
      <Scene t={t} index={11}>
        <div style={{ display: 'grid', gridTemplateColumns: '760px 1fr', gap: 90, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 119.7, { y: 14 })}>Keep in mind</div>
            <div className="kit-h2" style={enter(t, 119.8, { dur: 0.8, y: 30 })}>
              The report is an <span className="kit-mark" style={markStyle(t, 121.36)}>AI-generated synthesis.</span>
            </div>
            <div style={{ marginTop: 56, ...enter(t, 132.0, { y: 20 }) }}>
              <Row t={t} at={132.0} size={36}>
                Check the report’s <span className="kit-mark" style={markStyle(t, 133.0)}>citations too.</span>
              </Row>
            </div>
          </div>
          <div style={{ position: 'relative', height: 560 }}>
            {['Source not imported', 'Source not imported'].map((l, i) => (
              <div key={i} style={{ position: 'absolute', left: 0, top: 20 + i * 110, width: 400, opacity: 0.85, ...enter(t, 128.96 + i * 0.3, { x: -20, y: 0 }) }}>
                <DocCard label={l} dashed style={{ color: MUTED }} />
              </div>
            ))}
            <div style={{ position: 'absolute', left: 260, top: 250, width: 500, ...enter(t, 120.72, { y: 24, easing: BACK }) }}>
              <DocCard label="Research report" tag="AI synthesis" tagColor="#FDE7DA" style={{ fontSize: 30, padding: '24px 26px' }} />
            </div>
            <svg width="700" height="560" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
              {[0, 1].map((i) => {
                const p = prog(t, 129.4 + i * 0.3, 0.7, IN_OUT);
                return <path key={i} d={`M 200 ${82 + i * 110} Q 320 ${190 + i * 40} 420 250`} stroke={MUTED} strokeWidth="3" strokeDasharray="8 8" fill="none" opacity={p} />;
              })}
              <path d="M 510 345 L 510 420" stroke={GREEN} strokeWidth="4" fill="none" opacity={prog(t, 125.12, 0.5)} />
            </svg>
            <div style={{ position: 'absolute', left: 300, top: 430, width: 420, ...enter(t, 126.24, { y: 20 }) }}>
              <div className="kit-card kit-ui" style={{ padding: '20px 24px', fontSize: 26, background: '#FBFBF8' }}>
                <div style={{ fontSize: 16, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>LATER ANSWERS</div>
                <div style={{ marginTop: 8 }}>can still draw on its broader findings</div>
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 13 — Import */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={134.56}
          src={shot('07-report-and-three-sources-selected')}
          title={URL}
          cam={[{ at: 134.56, x: 450, y: 820, s: 2.2, dur: 0.6 }]}
          cursor={[
            { at: 134.6, x: 450, y: 760 },
            { at: 134.64, x: 660, y: 900, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 135.44, x: 613, y: 881, w: 94, h: 40, spot: true }]}
          steps={[{ at: 135.04, text: 'Import' }]}
        />
      </Scene>

      {/* 14 — Curated notebook */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={136.4}
          src={shot('08-curated-notebook-and-studio')}
          title={URL}
          cam={[
            { at: 136.4, x: 300, y: 440, s: 2.0, dur: 0.9 },
            { at: 142.6, x: 960, y: 820, s: 1.9, dur: 1.1 },
          ]}
          rings={[
            { at: 137.12, until: 142.5, x: 26, y: 400, w: 440, h: 136, spot: true },
            { at: 143.36, x: 636, y: 855, w: 626, h: 60, spot: true },
          ]}
          steps={[
            { at: 137.12, text: 'A selected collection: 4 sources' },
            { at: 143.36, text: 'Ask questions grounded in them' },
          ]}
        />
      </Scene>

      {/* 15 — Ask a grounded question */}
      <Scene t={t} index={14}>
        <div className="kit-label" style={enter(t, 147.8, { y: 14 })}>For example</div>
        <div className="kit-card kit-ui" style={{ marginTop: 10, padding: '36px 40px', borderRadius: 28, boxShadow: '0 16px 40px rgba(0,0,0,.07)', maxWidth: 1400, ...enter(t, 148.0, { y: 24 }) }}>
          <div style={{ fontSize: 40, lineHeight: 1.4, minHeight: 230 }}>
            {typed(t, 149.44, 'What are the two most important developments for European AI training and consulting leaders?', 5.2)}
            <br />
            <span style={{ fontWeight: t >= 155.04 ? 400 : 400 }}>{typed(t, 155.04, 'Cite the supporting evidence', 1.4)}</span>
            {typed(t, 156.5, ', and separate source facts from your recommendations.', 2.8)}
            {t < 159.4 && <span style={{ display: 'inline-block', width: 3, height: 40, background: INK, marginLeft: 3, verticalAlign: -6 }} />}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <span style={{ fontSize: 22, color: MUTED }}>4 sources</span>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: t >= 159.2 ? '#1A73E8' : '#E3E5DE', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 26 }}>↑</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 36 }}>
          <span className="kit-tag" style={enter(t, 155.56, { y: 0, scale: 0.6, easing: BACK })}>Cite the evidence</span>
          <span className="kit-tag" style={enter(t, 157.28, { y: 0, scale: 0.6, easing: BACK })}>Facts vs recommendations</span>
        </div>
      </Scene>

      {/* 16 — Click a citation */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={159.6}
          src={shot('09-answer-citation-evidence')}
          title={URL}
          cam={[
            { at: 159.6, x: 900, y: 500, s: 1.5, dur: 0.01 },
            { at: 162.4, x: 1000, y: 380, s: 1.8, dur: 1.0 },
          ]}
          cursor={[
            { at: 159.8, x: 760, y: 700 },
            { at: 161.48, x: 984, y: 546, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 160.88, until: 162.8, x: 972, y: 535, w: 24, h: 22 },
            { at: 163.44, until: 165.6, x: 960, y: 116, w: 388, h: 398, spot: true },
            { at: 166.4, x: 980, y: 288, w: 330, h: 168, spot: true },
          ]}
          steps={[
            { at: 160.88, text: 'Click a citation' },
            { at: 163.44, text: 'Inspect the supporting passage' },
            { at: 166.4, text: 'Does the source actually support the claim?' },
          ]}
        />
      </Scene>

      {/* 17 — Select / deselect sources */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={168.88}
          src={shot('08-curated-notebook-and-studio')}
          title={URL}
          cam={[{ at: 168.9, x: 260, y: 450, s: 2.3, dur: 1.0 }]}
          cursor={[
            { at: 169.2, x: 300, y: 600 },
            { at: 169.6, x: 453, y: 451, click: true, dur: 0.7 },
            { at: 171.0, x: 453, y: 487, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 171.12, x: 438, y: 400, w: 30, h: 136, spot: true }]}
          steps={[
            { at: 169.52, text: 'Select or deselect sources' },
            { at: 172.64, text: 'Control what each question uses' },
          ]}
        />
      </Scene>

      {/* 18 — Studio formats */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={177.32}
          src={shot('08-curated-notebook-and-studio')}
          title={URL}
          cam={[{ at: 177.4, x: 1650, y: 320, s: 2.0, dur: 1.2 }]}
          cursor={[
            { at: 182.0, x: 1640, y: 560 },
            { at: 183.6, x: 1497, y: 317, dur: 0.7 },
            { at: 187.7, x: 1736, y: 205, dur: 0.7 },
            { at: 190.8, x: 1735, y: 261, dur: 0.7 },
          ]}
          rings={[
            { at: 182.64, until: 184.2, x: 1416, y: 66, w: 468, h: 394 },
            { at: 184.32, until: 188.3, x: 1422, y: 294, w: 220, h: 46, spot: true },
            { at: 188.48, until: 191.4, x: 1654, y: 182, w: 220, h: 46, spot: true },
            { at: 191.6, x: 1654, y: 238, w: 220, h: 46, spot: true },
          ]}
          steps={[
            { at: 178.0, text: 'Same research, different formats' },
            { at: 182.64, text: 'Studio panel' },
            { at: 184.32, text: 'Reports: a leadership briefing' },
            { at: 188.48, text: 'Slide Deck: present the insights' },
            { at: 191.6, text: 'Mind Map: see the themes connect' },
          ]}
        />
      </Scene>

      {/* 19 — Briefing */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={195.6}
          src={shot('10-leadership-briefing')}
          title={URL}
          cam={[{ at: 195.6, x: 1000, y: 400, s: 1.5, dur: 1.0 }]}
          rings={[
            { at: 196.0, until: 199.9, x: 496, y: 262, w: 640, h: 180, spot: true },
            { at: 199.4, x: 1196, y: 250, w: 700, h: 600 },
          ]}
          steps={[{ at: 196.0, text: 'Briefing: audience, length, focus' }]}
        />
      </Scene>

      {/* 20 — Slide deck options */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={200.24}
          src={shot('11-slide-deck-customization')}
          title={URL}
          cam={[{ at: 200.3, x: 960, y: 440, s: 1.45, dur: 1.0 }]}
          rings={[
            { at: 202.16, until: 202.9, x: 541, y: 262, w: 838, h: 122 },
            { at: 202.96, until: 203.6, x: 541, y: 436, w: 212, h: 56 },
            { at: 203.68, until: 204.5, x: 828, y: 436, w: 166, h: 42 },
            { at: 204.56, x: 541, y: 545, w: 838, h: 103, spot: true },
          ]}
          steps={[
            { at: 202.16, text: 'Format' },
            { at: 202.96, text: 'Language' },
            { at: 203.68, text: 'Length' },
            { at: 204.56, text: 'Describe what it should cover' },
          ]}
        />
      </Scene>

      {/* 21 — Mind map options */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={206.64}
          src={shot('12-mind-map-customization')}
          title={URL}
          cam={[{ at: 206.7, x: 960, y: 480, s: 1.45, dur: 1.0 }]}
          rings={[{ at: 208.8, x: 548, y: 476, w: 824, h: 127, spot: true }]}
          steps={[
            { at: 208.0, text: 'Mind Map: the topics or themes to explore' },
            { at: 211.6, text: 'Exact controls vary by account' },
          ]}
        />
      </Scene>

      {/* 22 — Generated mind map */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={216.32}
          src={shot('13-generated-mind-map')}
          title={URL}
          cam={[{ at: 216.4, x: 960, y: 495, s: 1.3, dur: 1.4 }]}
          steps={[{ at: 217.76, text: 'Review the output before using it' }]}
        />
      </Scene>

      {/* 23 — Polished but wrong */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          imgH={H}
          t={t}
          start={220.16}
          src={shot('14-generated-slide-deck')}
          title={URL}
          cam={[
            { at: 220.2, x: 850, y: 500, s: 1.2, dur: 1.0 },
            { at: 222.3, x: 900, y: 300, s: 1.6, dur: 1.0 },
            { at: 224.4, x: 850, y: 500, s: 1.2, dur: 1.0 },
          ]}
          rings={[
            { at: 223.2, until: 224.5, x: 1322, y: 200, w: 76, h: 18, spot: true },
            { at: 224.16, x: 290, y: 776, w: 76, h: 16 },
            { at: 224.16, x: 1322, y: 200, w: 76, h: 18 },
          ]}
          steps={[
            { at: 220.6, text: 'Even a polished deck…' },
            { at: 223.2, text: 'Wrong date: Q3 2024 for November 2026 research' },
            { at: 225.6, text: 'Check claims and recommendations too' },
          ]}
        />
      </Scene>

      {/* 24 — Two reminders */}
      <Scene t={t} index={23}>
        <div className="kit-label" style={enter(t, 229.8, { y: 14 })}>Before we finish</div>
        <div className="kit-h2" style={enter(t, 229.9, { dur: 0.8, y: 30 })}>Two reminders</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 64 }}>
          {[
            ['1', 'Keep your sources current', 232.96],
            ['2', 'Verify the evidence', 231.5],
          ].map(([n, label, at], i) => (
            <div
              key={n as string}
              className="kit-card kit-ui"
              style={{
                width: 560,
                padding: '34px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                borderColor: i === 0 && t >= 232.96 ? LIME : LINE,
                background: i === 0 && t >= 232.96 ? '#F7FCF2' : '#fff',
                ...enter(t, i === 0 ? 231.2 : 231.5, { y: 24, easing: BACK }),
                opacity: Math.min(enter(t, i === 0 ? 231.2 : 231.5).opacity as number, i === 1 && t >= 232.96 ? 0.45 : 1),
              }}
            >
              <div style={{ width: 60, height: 60, borderRadius: 999, background: LIME, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 30, fontWeight: 700, flex: 'none' }}>{n as string}</div>
              <div style={{ fontSize: 36, fontWeight: 600 }}>
                {i === 0 ? <span className="kit-mark" style={markStyle(t, at as number)}>{label as string}</span> : (label as string)}
              </div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 25 — Keep sources current */}
      <Scene t={t} index={24}>
        <div className="kit-label" style={enter(t, 235.8, { y: 14 })}>1 · Keep your sources current</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 30 }}>
          <div className="kit-card kit-ui" style={{ padding: '36px 40px', ...enter(t, 235.9, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <svg width="56" height="56" viewBox="0 0 24 24">
                <path d="M8 3h8l6 10-4 7H6l-4-7z" fill="#F1F1EC" stroke={GREEN} strokeWidth="1.3" />
              </svg>
              <div style={{ fontSize: 36, fontWeight: 600 }}>Google Drive sources</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 30, fontSize: 30, ...enter(t, 238.08, { y: 12 }) }}>
              <svg width="44" height="44" viewBox="0 0 24 24" style={{ transform: `rotate(${prog(t, 238.08, 2.4, IN_OUT) * 360}deg)` }}>
                <path d="M20 12a8 8 0 01-14 5.3M4 12a8 8 0 0114-5.3" stroke={GREEN} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                <path d="M18 2.5v4.2h-4.2M6 21.5v-4.2h4.2" stroke={GREEN} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>
                Can <span className="kit-mark" style={markStyle(t, 238.4)}>sync automatically</span>
              </span>
            </div>
          </div>
          <div className="kit-card kit-ui" style={{ padding: '36px 40px', ...enter(t, 241.52, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <FileIcon size={56} />
              <div style={{ fontSize: 36, fontWeight: 600 }}>Uploaded files</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 30, fontSize: 30, ...enter(t, 244.32, { y: 12 }) }}>
              <span className="kit-tag" style={{ fontSize: 16, background: '#FDE7DA' }}>Manual</span>
              <span>
                Replace or <span className="kit-mark" style={markStyle(t, 245.36)}>re-import</span>
              </span>
            </div>
          </div>
        </div>
      </Scene>

      {/* 26 — Outputs don't update */}
      <Scene t={t} index={25}>
        <div className="kit-label" style={enter(t, 246.8, { y: 14 })}>1 · Keep your sources current</div>
        <div className="kit-h2" style={enter(t, 246.9, { dur: 0.8, y: 30 })}>
          Outputs <span className="kit-mark" style={markStyle(t, 248.56)}>don’t update</span> themselves.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 60 }}>
          <div style={{ width: 380, ...enter(t, 247.6, { y: 20 }) }}>
            <DocCard label="Source" tag={t >= 247.8 ? 'Updated' : 'v1'} style={{ borderColor: t >= 247.8 ? LIME : LINE }} />
          </div>
          <div style={{ fontSize: 50, color: RED, fontWeight: 700, ...enter(t, 248.56, { y: 0, scale: 0.4, easing: BACK }) }}>≠</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 460 }}>
            {[
              ['Report', 249.68],
              ['Slide deck', 250.4],
              ['Mind map', 251.36],
            ].map(([l, at]) => {
              const regen = t >= 254.4;
              return (
                <div key={l as string} style={enter(t, at as number, { x: 20, y: 0 })}>
                  <DocCard label={l as string} tag={regen ? 'Regenerated' : 'Old evidence'} tagColor={regen ? LIME_SOFT : '#F1F1EC'} style={{ borderColor: regen ? LIME : LINE }} />
                </div>
              );
            })}
          </div>
          <div className="kit-pill" style={{ borderColor: LIME, background: LIME_SOFT, ...enter(t, 253.6, { y: 0, scale: 0.6, easing: BACK }) }}>
            <svg width="30" height="30" viewBox="0 0 24 24" style={{ transform: `rotate(${prog(t, 253.8, 1.2, IN_OUT) * 360}deg)` }}>
              <path d="M20 12a8 8 0 11-2.3-5.6M20 4v4.5h-4.5" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Regenerate
          </div>
        </div>
      </Scene>

      {/* 27 — Grounding is not accuracy */}
      <Scene t={t} index={26}>
        <div className="kit-label" style={enter(t, 258.0, { y: 14 })}>2 · Verify the evidence</div>
        <div className="kit-h2" style={enter(t, 258.8, { dur: 0.8, y: 30 })}>Source grounding…</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 60 }}>
          <Row t={t} at={261.44} size={44}>
            makes claims <span className="kit-mark" style={markStyle(t, 262.24)}>easier to trace</span>
          </Row>
          <Row t={t} at={263.64} size={44} ok={false}>
            but doesn’t <b>guarantee accuracy</b>
          </Row>
        </div>
      </Scene>

      {/* 28 — Verification checklist */}
      <Scene t={t} index={27} padStyle={{ opacity: 1 - prog(t, 279.3, 0.9, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 266.2, { y: 14 })}>2 · Verify the evidence</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 640px', gap: 80, alignItems: 'center', marginTop: 10 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 34 }}>
            <Row t={t} at={266.56} size={38}>Check important citations</Row>
            <Row t={t} at={268.48} size={38}>Confirm publication dates</Row>
            <Row t={t} at={270.48} size={38}>Consider what might be missing</Row>
            <Row t={t} at={273.28} size={38}>
              Keep <span className="kit-mark" style={markStyle(t, 273.68)}>a clear line</span>
            </Row>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, ...enter(t, 274.4, { y: 24 }) }}>
            <div className="kit-card kit-ui" style={{ padding: '30px 28px', borderRadius: '22px 0 0 22px', borderRight: 'none', background: '#F7FCF2', borderColor: LIME, ...enter(t, 274.8, { x: -20, y: 0 }) }}>
              <div style={{ fontSize: 16, letterSpacing: '.1em', fontWeight: 700, color: GREEN }}>SOURCES</div>
              <div style={{ fontSize: 30, fontWeight: 600, marginTop: 10 }}>establish</div>
            </div>
            <div className="kit-card kit-ui" style={{ padding: '30px 28px', borderRadius: '0 22px 22px 0', borderLeft: `3px solid ${INK}`, ...enter(t, 276.64, { x: 20, y: 0 }) }}>
              <div style={{ fontSize: 16, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>AI</div>
              <div style={{ fontSize: 30, fontWeight: 600, marginTop: 10 }}>recommends</div>
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
export const GeminiNotebookResearch: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={GEMINI_NOTEBOOK_RESEARCH_TITLE_FRAMES}>
      <TitleCardGreen label="GEMINI" title="Research with Gemini Notebook" />
    </Sequence>
    <Sequence from={GEMINI_NOTEBOOK_RESEARCH_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
