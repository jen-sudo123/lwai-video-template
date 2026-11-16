import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
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
  FileIcon,
  KIT_CSS,
  LIME,
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

// Lovable: from PRD to first build. Custom screenshot demo (Lead with AI), built with src/kit.
// Every cue is in SECONDS of the VO (audio/LovableDemo.mp3, Daan on ElevenLabs v4, 230.8s of speech),
// from the Scribe word timestamps in src/data/LovableDemo.transcript.json. A 90-frame title card opens
// the video; the VO and every scene start after it.
// Screenshots: public/LovableDemo/images/*.jpg, all 1920x958.
//
//  #  scene                               start   VO cue
//  0  Brief to app                        0.00    "Lovable is an AI application builder…"
//  1  Slides to interactive               8.24    "This is where vibe coding becomes practical."
//  2  Only the starting point             16.64   "But generating the app is only the starting point."
//  3  Matrix to self-assessment (02)      24.32   "In this demo, I'll turn our AI Fluency Matrix…"
//  4  Three steps                         31.16   "I'll do this in three steps."
//  5  Step 1: the PRD                     45.15   "Step one. I brainstorm the app…"
//  6  write-a-PRD doc (01)                57.20   "You can paste the instructions…"
//  7  Share idea + Matrix                 66.16   "I share my app idea and the AI Fluency Matrix…"
//  8  The brief (04)                      74.60   "For this version, the brief calls for…"
//  9  Levels vs dimensions                84.69   "There's an important distinction here."
//  10 Before scoring can work             95.68   "Before scoring can work…" + "Will Lovable flag the gaps?"
//  11 Step 2: PRD into Lovable (03)       113.63  "Step two. I paste the PRD into Lovable…"
//  12 Lovable flags the gaps (05)         130.96  "Lovable proposes a plan for review…"
//  13 Review plan + Approve (07)          142.96  "I review the plan, and start the build."
//  14 First version: welcome (11)         146.05  "The first version includes a welcome screen…"
//  15 Question flow (12)                  149.50  "progress indicators, answer review…"
//  16 Tangible, gaps visible              154.48  "Now the idea is tangible…"
//  17 Step 3: no email (11)               159.39  "Step three: test the experience…"
//  18 Back + change (12)                  165.20  "go back without losing answers…"
//  19 Skipped question (13)               168.72  "spot a skipped question…"
//  20 Start over (14)                     171.20  "restart with a clean attempt."
//  21 Mobile preview (15)                 173.60  "I also run through the flow in the mobile preview."
//  22 Scoring pending (17)                181.60  "The completion screen clearly explains…"
//  23 Test answer sets                    189.70  "Once the scoring rules are final…"
//  24 Frequent use is not enough          203.60  "Frequent use alone should never…"
//  25 Credits + pricing (06)              208.38  "A few practical notes…"
//  26 Publishing options (08)             212.60  "…and publishing options before you begin."
//  27 Before a scored pilot               215.45  "Before publishing a scored pilot…"
//  28 Closing                             223.50  "Vibe coding helps make an idea tangible…"

export const LOVABLE_DEMO_DURATION_S = 232.4;
export const LOVABLE_DEMO_TITLE_FRAMES = 90;

const STARTS = [
  0, 8.24, 16.64, 24.32, 31.16, 45.15, 57.2, 66.16, 74.6, 84.69, 95.68, 113.63, 130.96, 142.96, 146.05, 149.5,
  154.48, 159.39, 165.2, 168.72, 171.2, 173.6, 181.6, 189.7, 203.6, 208.38, 212.6, 215.45, 223.5,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;

// Browser previews can inject the screenshots (as data URIs) via globalThis.LOVABLE_DEMO_SHOTS.
const shot = (n: string): string =>
  (globalThis as { LOVABLE_DEMO_SHOTS?: Record<string, string> }).LOVABLE_DEMO_SHOTS?.[n] ??
  staticFile(`LovableDemo/images/${n}.jpg`);

// The build prompt pasted into Lovable with the PRD (typed on screen in scene 11).
const BUILD_PROMPT =
  'Build this assessment from the PRD. Include a welcome screen, a multiple-choice question flow, progress indicators, and immediate results. Follow the agreed scoring rules. Flag missing rules rather than inventing them.';

const AMBER = '#B45309';
const AMBER_SOFT = '#FEF3C7';

const Pill: React.FC<{ style?: React.CSSProperties; children: React.ReactNode }> = ({ style, children }) => (
  <div className="kit-pill" style={style}>
    {children}
  </div>
);

// Numbered row used by the checklist-style scenes.
const Row: React.FC<{ t: number; at: number; n: number; text: string; tag?: React.ReactNode }> = ({ t, at, n, text, tag }) => (
  <div className="kit-card" style={{ display: 'flex', alignItems: 'center', gap: 28, padding: '22px 34px', ...enter(t, at, { x: -40, y: 0 }) }}>
    <div className="kit-ui" style={{ fontSize: 26, fontWeight: 700, color: LIME, width: 40 }}>{String(n).padStart(2, '0')}</div>
    <div className="kit-ui" style={{ fontSize: 36, flex: 1 }}>{text}</div>
    {tag}
  </div>
);

const OpenTag: React.FC<{ t: number; at: number }> = ({ t, at }) => (
  <div
    className="kit-tag"
    style={{ background: AMBER_SOFT, color: AMBER, opacity: prog(t, at, 0.4), transform: `scale(${0.6 + 0.4 * prog(t, at, 0.5, BACK)})` }}
  >
    Open
  </div>
);

const StepHeader: React.FC<{ t: number; at: number; n: string; title: string }> = ({ t, at, n, title }) => (
  <>
    <div className="kit-label" style={enter(t, at, { y: 14 })}>Step {n}</div>
    <div className="kit-h2" style={enter(t, at + 0.2, { dur: 0.9, y: 30 })}>{title}</div>
  </>
);

// ── Body ────────────────────────────────────────────────────────────────────
const LovableDemoBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/LovableDemo.mp3')} />}

      {/* 0 — Brief to app */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Lovable</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          A written brief, <span className="kit-mark" style={markStyle(t, 4.4)}>a working app.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 80 }}>
          <div className="kit-card" style={{ width: 300, padding: 30, ...enter(t, 3.2, { x: -40, y: 0 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <FileIcon size={40} accent />
              <div className="kit-ui" style={{ fontSize: 30, fontWeight: 600 }}>Brief</div>
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ height: 12, borderRadius: 6, background: LINE, marginTop: 18, width: `${90 - i * 15}%` }} />
            ))}
          </div>
          <Arrow t={t} at={4.0} w={170} />
          <div className="kit-card" style={{ width: 420, padding: 0, overflow: 'hidden', ...enter(t, 4.5, { scale: 0.9, y: 0, easing: BACK }) }}>
            <div style={{ height: 40, background: '#F3F4F1', display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 16 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ width: 12, height: 12, borderRadius: 6, background: '#D5D8D0' }} />
              ))}
            </div>
            <div style={{ padding: 28 }}>
              <div className="kit-ui" style={{ fontSize: 28, fontWeight: 700 }}>Web app</div>
              <div style={{ marginTop: 18, height: 44, width: 180, borderRadius: 10, background: LIME }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginLeft: 30 }}>
            {[
              ['Test', 5.2],
              ['Refine', 5.92],
              ['Share', 6.72],
            ].map(([label, at]) => (
              <Pill key={label as string} style={enter(t, at as number, { x: 30, y: 0, easing: BACK })}>
                <Check size={28} /> {label as string}
              </Pill>
            ))}
          </div>
        </div>
      </Scene>

      {/* 1 — Slides to interactive */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 8.3, { y: 14 })}>Vibe coding</div>
        <div className="kit-h1" style={enter(t, 8.5, { dur: 0.9, y: 34 })}>
          Where vibe coding <span className="kit-mark" style={markStyle(t, 9.84)}>gets practical.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 80 }}>
          <div className="kit-card" style={{ width: 460, height: 260, padding: 34, position: 'relative', ...enter(t, 12.3, { x: -40, y: 0 }) }}>
            <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>SLIDE 4 OF 22</div>
            <div className="kit-ui" style={{ fontSize: 34, fontWeight: 700, marginTop: 14 }}>The framework</div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 12, borderRadius: 6, background: LINE, marginTop: 18, width: `${85 - i * 20}%` }} />
            ))}
            <div style={{ position: 'absolute', right: 24, top: 24, opacity: prog(t, 13.3, 0.4), transform: `scale(${prog(t, 13.3, 0.5, BACK)})` }}>
              <Cross size={46} />
            </div>
          </div>
          <Arrow t={t} at={13.8} w={170} />
          <div className="kit-card" style={{ width: 520, height: 260, padding: 34, borderColor: LIME, ...enter(t, 14.6, { scale: 0.9, y: 0, easing: BACK }) }}>
            <div className="kit-ui" style={{ fontSize: 34, fontWeight: 700 }}>Something interactive</div>
            {['Option A', 'Option B'].map((o, i) => {
              const on = i === 0 && t > 15.6;
              return (
                <div key={o} style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22 }}>
                  <div style={{ width: 30, height: 30, borderRadius: 15, border: `3px solid ${on ? LIME : LINE}`, background: on ? LIME : '#fff' }} />
                  <div className="kit-ui" style={{ fontSize: 28 }}>{o}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Scene>

      {/* 2 — Only the starting point */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 16.7, { y: 14 })}>But</div>
        <div className="kit-h1" style={enter(t, 16.9, { dur: 0.9, y: 34 })}>
          Generating the app is only <span className="kit-mark" style={markStyle(t, 18.48)}>the starting point.</span>
        </div>
        <div className="kit-body kit-muted" style={{ marginTop: 70, ...enter(t, 19.68, { y: 18 }) }}>You still need</div>
        <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
          <Pill style={enter(t, 20.4, { y: 20, easing: BACK })}><Check size={28} /> Clear requirements</Pill>
          <Pill style={enter(t, 21.76, { y: 20, easing: BACK })}><Check size={28} /> Checks that it works as intended</Pill>
        </div>
      </Scene>

      {/* 3 — Matrix to self-assessment */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={24.32}
          stepBadge={''}
          title="leadwithai.co"
          src={shot('02-matrix-framework')}
          cam={[{ at: 25.9, x: 950, y: 340, s: 1.55, dur: 1.0 }]}
          rings={[{ at: 26.4, x: 585, y: 270, w: 740, h: 160, spot: true }]}
          steps={[
            { at: 26.32, text: 'The AI Fluency Matrix' },
            { at: 28.16, text: 'becomes a short self-assessment' },
          ]}
        />
      </Scene>

      {/* 4 — Three steps */}
      <Scene t={t} index={4}>
        <div className="kit-label" style={enter(t, 31.2, { y: 14 })}>The demo</div>
        <div className="kit-h2" style={enter(t, 31.4, { dur: 0.9, y: 30 })}>Three steps</div>
        <div style={{ display: 'flex', gap: 34, marginTop: 70 }}>
          {[
            ['1', 'Clarify the idea', 'Create a PRD', 33.48],
            ['2', 'Build', 'A first version with Lovable', 37.28],
            ['3', 'Test', 'See what still needs work', 40.44],
          ].map(([n, h, b, at]) => (
            <div key={n as string} className="kit-card" style={{ flex: 1, padding: 40, ...enter(t, at as number, { y: 40, easing: BACK }) }}>
              <div className="kit-ui" style={{ fontSize: 64, fontWeight: 700, color: LIME }}>{n as string}</div>
              <div className="kit-h3" style={{ marginTop: 14 }}>{h as string}</div>
              <div className="kit-body kit-muted" style={{ fontSize: 30, marginTop: 10 }}>{b as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 5 — Step 1: the PRD */}
      <Scene t={t} index={5}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
          <div style={{ flex: 1 }}>
            <StepHeader t={t} at={45.2} n="1" title="Clarify the idea" />
            <p className="kit-body" style={{ marginTop: 40, ...enter(t, 49.28, { y: 18 }) }}>
              Brainstorm with your preferred AI to write a{' '}
              <span className="kit-mark" style={markStyle(t, 49.4)}>Product Requirements Document.</span>
            </p>
          </div>
          <div className="kit-card" style={{ width: 640, padding: 44, ...enter(t, 49.6, { x: 40, y: 0 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <FileIcon size={42} accent />
              <div className="kit-ui" style={{ fontSize: 34, fontWeight: 700 }}>PRD</div>
            </div>
            {[
              ['What to build', 53.44],
              ['Who it’s for', 54.4],
              ['How it should work', 55.44],
            ].map(([label, at]) => (
              <div key={label as string} style={{ marginTop: 30, ...enter(t, at as number, { x: -20, y: 0 }) }}>
                <div className="kit-ui" style={{ fontSize: 30, fontWeight: 600 }}>{label as string}</div>
                <div style={{ height: 10, borderRadius: 5, background: LINE, marginTop: 12, width: `${prog(t, at as number, 0.9) * 100}%` }} />
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 6 — write-a-PRD instructions */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={57.2}
          stepBadge={'STEP 1'}
          title="docs.google.com"
          src={shot('01-prd-skill-source')}
          cam={[
            { at: 59.3, x: 950, y: 425, s: 1.6, dur: 1.0 },
            { at: 62.9, x: 260, y: 170, s: 2.6, dur: 1.0 },
          ]}
          rings={[
            { at: 59.6, until: 62.9, x: 660, y: 318, w: 575, h: 212, spot: true },
            { at: 63.36, x: 12, y: 112, w: 175, h: 46, spot: true },
          ]}
          steps={[
            { at: 59.52, text: 'Paste the write-a-PRD instructions into your AI chat' },
            { at: 63.36, text: 'or use the skill file' },
          ]}
        />
      </Scene>

      {/* 7 — Share idea + Matrix, work through questions */}
      <Scene t={t} index={7}>
        <div className="kit-label" style={enter(t, 66.2, { y: 14 })}>Step 1 · Clarify</div>
        <div className="kit-h2" style={enter(t, 66.4, { dur: 0.9, y: 30 })}>Share the idea, then answer questions</div>
        <div style={{ display: 'flex', gap: 60, marginTop: 70, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Pill style={enter(t, 67.12, { x: -30, y: 0, easing: BACK })}><FileIcon size={28} /> App idea</Pill>
            <Pill style={enter(t, 68.4, { x: -30, y: 0, easing: BACK })}><FileIcon size={28} accent /> AI Fluency Matrix</Pill>
          </div>
          <Arrow t={t} at={69.6} w={140} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              ['How should the assessment work?', 71.4],
              ['How is it scored?', 72.16],
              ['What do results show?', 73.36],
            ].map(([q, at]) => (
              <div key={q as string} className="kit-card" style={{ padding: '18px 30px', borderRadius: 18, ...enter(t, at as number, { y: 20 }) }}>
                <div className="kit-ui" style={{ fontSize: 30 }}>{q as string}</div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 8 — The brief */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={74.6}
          stepBadge={'STEP 1'}
          title="lovable.dev"
          src={shot('04-prd-open-decisions')}
          cam={[{ at: 75.4, x: 1590, y: 300, s: 1.8, dur: 1.0 }]}
          rings={[{ at: 76.4, x: 1315, y: 215, w: 560, h: 120, spot: true }]}
          steps={[
            { at: 76.56, text: '12 behavior-based questions' },
            { at: 78.84, text: 'Immediate results, no email' },
            { at: 81.76, text: 'Three personalized next steps' },
          ]}
        />
      </Scene>

      {/* 9 — Levels vs dimensions */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 84.8, { y: 14 })}>An important distinction</div>
        <div style={{ display: 'flex', gap: 50, marginTop: 30 }}>
          <div className="kit-card" style={{ flex: 1, padding: 44, ...enter(t, 87.16, { y: 30 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>THE MATRIX</div>
            <div className="kit-h3" style={{ marginTop: 10 }}>
              Defines the <span className="kit-mark" style={markStyle(t, 88.08)}>fluency levels</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 30 }}>
              {['Avoiding', 'Chatting', 'Collaborating', 'Integrating', 'Transforming'].map((l, i) => (
                <div key={l} className="kit-ui" style={{ fontSize: 26, display: 'flex', gap: 16, ...enter(t, 88.2 + i * 0.15, { x: -20, y: 0 }) }}>
                  <span style={{ color: LIME, fontWeight: 700, width: 30 }}>{i}</span> {l}
                </div>
              ))}
            </div>
          </div>
          <div className="kit-card" style={{ flex: 1, padding: 44, borderStyle: 'dashed', ...enter(t, 89.52, { y: 30 }) }}>
            <div className="kit-ui" style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>THIS ASSESSMENT</div>
            <div className="kit-h3" style={{ marginTop: 10 }}>
              Adds four <span className="kit-mark" style={markStyle(t, 91.92)}>diagnostic scores</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 30 }}>
              {['Awareness', 'Usage', 'Judgment', 'Leadership'].map((d, i) => (
                <div key={d} className="kit-pill" style={{ fontSize: 26, justifyContent: 'center', ...enter(t, 90.0 + i * 0.2, { scale: 0.8, y: 0, easing: BACK }) }}>{d}</div>
              ))}
            </div>
            <div className="kit-body kit-muted" style={{ fontSize: 24, marginTop: 24, ...enter(t, 93.16, { y: 10 }) }}>Designed just for this assessment</div>
          </div>
        </div>
      </Scene>

      {/* 10 — Before scoring can work + open decisions */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={enter(t, 95.7, { y: 14 })}>Before scoring can work</div>
        <div className="kit-h2" style={{ position: 'relative', height: 90 }}>
          <div style={{ position: 'absolute', ...enter(t, 95.9, { dur: 0.9, y: 30 }), opacity: prog(t, 95.9, 0.7) * (1 - prog(t, 110.5, 0.4)) }}>We need four decisions</div>
          <div style={{ position: 'absolute', ...enter(t, 110.76, { dur: 0.7, y: 30 }) }}>
            Will Lovable <span className="kit-mark" style={markStyle(t, 111.6)}>flag the gaps?</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 50 }}>
          <Row t={t} at={97.68} n={1} text="Final questions" />
          <Row t={t} at={98.96} n={2} text="Answer rubrics" tag={<OpenTag t={t} at={107.6} />} />
          <Row t={t} at={100.08} n={3} text="Exact requirements for each level" tag={<OpenTag t={t} at={107.85} />} />
          <Row t={t} at={102.4} n={4} text="Rules for choosing recommendations" tag={<OpenTag t={t} at={108.1} />} />
        </div>
      </Scene>

      {/* 11 — Step 2: PRD into Lovable */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={113.63}
          stepBadge={'STEP 2'}
          title="lovable.dev"
          src={shot('03-lovable-prd-prompt')}
          cursor={[
            { at: 114.0, x: 1300, y: 700 },
            { at: 115.0, x: 870, y: 383, dur: 0.8 },
            { at: 117.4, x: 900, y: 438, click: true, dur: 0.7 },
            { at: 118.6, x: 1180, y: 560, dur: 0.8 },
            { at: 128.6, x: 1383, y: 474, click: true, dur: 0.8 },
          ]}
          cam={[
            { at: 115.2, x: 1077, y: 420, s: 1.7, dur: 1.0 },
            { at: 117.6, x: 1077, y: 445, s: 2.1, dur: 0.8 },
            { at: 129.8, x: 1077, y: 420, s: 1.0, dur: 0.9 },
          ]}
          overlay={
            t >= 117.84 && (
              <div style={{ position: 'absolute', left: 752, top: 416, width: 650, height: 42, background: '#fff', fontFamily: 'Public Sans', fontSize: 12, lineHeight: '16px', color: '#1c1c1c' }}>
                {typed(t, 118.0, BUILD_PROMPT, 10.0)}
                <span style={{ display: 'inline-block', width: 1, height: 13, marginLeft: 1, verticalAlign: 'text-bottom', background: '#1c1c1c', opacity: Math.floor(t * 2) % 2 ? 0 : 1 }} />
              </div>
            )
          }
          rings={[
            { at: 115.36, until: 117.6, x: 755, y: 360, w: 200, h: 50 },
            { at: 117.9, until: 128.8, x: 745, y: 412, w: 664, h: 48 },
          ]}
          steps={[
            { at: 114.6, text: 'Build the first version' },
            { at: 115.36, text: 'Paste the PRD' },
            { at: 117.84, text: 'Add a short build instruction' },
            { at: 125.6, text: 'Flag missing rules, don’t invent them' },
          ]}
        />
      </Scene>

      {/* 12 — Lovable flags the gaps */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={130.96}
          stepBadge={'STEP 2'}
          title="lovable.dev"
          src={shot('05-lovable-flags-missing-scoring')}
          cam={[{ at: 133.6, x: 1090, y: 400, s: 1.75, dur: 1.0 }]}
          rings={[{ at: 134.32, x: 712, y: 378, w: 750, h: 56, spot: true }]}
          steps={[
            { at: 131.52, text: 'Lovable proposes a plan' },
            { at: 134.32, text: 'It catches the missing scoring rules' },
            { at: 138.4, text: 'Scores held back until the rules exist' },
          ]}
        />
      </Scene>

      {/* 13 — Review the plan + Approve */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={142.96}
          stepBadge={'STEP 2'}
          title="lovable.dev"
          src={shot('07-lovable-build-plan')}
          cursor={[
            { at: 143.1, x: 1300, y: 640 },
            { at: 143.9, x: 1864, y: 24, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 143.04, until: 144.4, x: 980, y: 372, w: 690, h: 270 }]}
          steps={[
            { at: 143.04, text: 'Review the plan' },
            { at: 144.32, text: 'Approve and build' },
          ]}
        />
      </Scene>

      {/* 14 — First version: welcome */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={146.05}
          stepBadge={'STEP 2'}
          title="lovable.dev"
          src={shot('11-assessment-welcome')}
          cam={[{ at: 146.5, x: 1330, y: 400, s: 1.35, dur: 1.0 }]}
          rings={[{ at: 148.32, x: 1570, y: 392, w: 310, h: 34 }]}
          steps={[
            { at: 146.2, text: 'The first version' },
            { at: 147.28, text: 'Welcome screen' },
            { at: 148.32, text: '12 questions' },
          ]}
        />
      </Scene>

      {/* 15 — Question flow */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={149.5}
          stepBadge={'STEP 2'}
          title="lovable.dev"
          src={shot('12-question-flow-judgment-gap')}
          cam={[{ at: 149.5, x: 1330, y: 700, s: 1.45, dur: 0.01 }, { at: 152.0, x: 1330, y: 480, s: 1.0, dur: 1.0 }]}
          rings={[{ at: 149.64, until: 151.8, x: 880, y: 882, w: 360, h: 30 }]}
          steps={[
            { at: 149.64, text: 'Progress indicators' },
            { at: 150.88, text: 'Answer review · Restart' },
            { at: 153.41, text: 'Completion screen' },
          ]}
        />
      </Scene>

      {/* 16 — Tangible, gaps visible */}
      <Scene t={t} index={16}>
        <div className="kit-h1" style={enter(t, 154.5, { dur: 0.9, y: 34 })}>
          The idea is <span className="kit-mark" style={markStyle(t, 155.52)}>tangible.</span>
        </div>
        <div className="kit-h2 kit-muted" style={{ marginTop: 30, color: MUTED, ...enter(t, 156.48, { dur: 0.8, y: 24 }) }}>
          And the <span style={{ color: AMBER }}>open requirements</span> are visible.
        </div>
      </Scene>

      {/* 17 — Step 3: start without email */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={159.39}
          stepBadge={'STEP 3'}
          title="lovable.dev"
          src={shot('11-assessment-welcome')}
          cursor={[{ at: 162.6, x: 1300, y: 760 }, { at: 163.4, x: 880, y: 533, click: true, dur: 0.7 }]}
          cam={[{ at: 162.4, x: 1050, y: 500, s: 1.7, dur: 1.0 }]}
          rings={[{ at: 163.76, x: 990, y: 516, w: 200, h: 34 }]}
          steps={[
            { at: 159.6, text: 'Test the experience' },
            { at: 163.76, text: 'Start without an email' },
          ]}
        />
      </Scene>

      {/* 18 — Back + change a response */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={165.2}
          stepBadge={'STEP 3'}
          title="lovable.dev"
          src={shot('12-question-flow-judgment-gap')}
          cursor={[
            { at: 165.3, x: 1300, y: 700 },
            { at: 165.4, x: 930, y: 850, click: true, dur: 0.6 },
            { at: 167.3, x: 912, y: 318, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 165.6, until: 167.3, x: 895, y: 833, w: 90, h: 36 },
            { at: 167.6, x: 885, y: 292, w: 880, h: 60 },
          ]}
          steps={[
            { at: 165.28, text: 'Go back without losing answers' },
            { at: 167.44, text: 'Change a response' },
          ]}
        />
      </Scene>

      {/* 19 — Skipped question */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={168.72}
          stepBadge={'STEP 3'}
          title="lovable.dev"
          src={shot('13-review-missing-answer')}
          cam={[{ at: 168.72, x: 1100, y: 250, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 169.2, x: 925, y: 50, w: 125, h: 28, spot: true }]}
          steps={[{ at: 169.2, text: 'Spot a skipped question before submitting' }]}
        />
      </Scene>

      {/* 20 — Start over */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={171.2}
          stepBadge={'STEP 3'}
          title="lovable.dev"
          src={shot('14-results-scoring-unavailable')}
          cursor={[{ at: 171.25, x: 1400, y: 650 }, { at: 171.4, x: 1705, y: 828, click: true, dur: 0.6 }]}
          rings={[{ at: 171.5, x: 1640, y: 808, w: 130, h: 42 }]}
          steps={[{ at: 171.36, text: 'Restart with a clean attempt' }]}
        />
      </Scene>

      {/* 21 — Mobile preview */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={173.6}
          stepBadge={'STEP 3'}
          title="lovable.dev"
          src={shot('15-mobile-results-preview')}
          cursor={[{ at: 173.7, x: 1400, y: 300 }, { at: 174.6, x: 1170, y: 24, click: true, dur: 0.7 }]}
          cam={[{ at: 176.6, x: 1330, y: 480, s: 1.15, dur: 1.0 }]}
          rings={[
            { at: 175.36, until: 176.8, x: 1150, y: 8, w: 40, h: 34 },
            { at: 177.36, x: 1132, y: 68, w: 400, h: 856, spot: true },
          ]}
          steps={[
            { at: 175.36, text: 'Mobile preview' },
            { at: 177.36, text: 'Checks the narrow layout' },
            { at: 178.8, text: 'Real-device check: in the pilot' },
          ]}
        />
      </Scene>

      {/* 22 — Scoring pending, nothing invented */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={181.6}
          stepBadge={'STEP 3'}
          title="lovable.dev"
          src={shot('17-mobile-completion')}
          cam={[{ at: 182.0, x: 1330, y: 520, s: 1.9, dur: 1.0 }]}
          rings={[
            { at: 184.08, until: 186.2, x: 1145, y: 410, w: 200, h: 82 },
            { at: 186.32, x: 1145, y: 605, w: 345, h: 50, spot: true },
          ]}
          steps={[
            { at: 184.08, text: 'Scoring pending review' },
            { at: 186.6, text: 'No invented level or advice' },
          ]}
        />
      </Scene>

      {/* 23 — Test exact answer sets */}
      <Scene t={t} index={23}>
        <div className="kit-label" style={enter(t, 189.8, { y: 14 })}>Once the scoring rules are final</div>
        <div className="kit-h2" style={enter(t, 190.0, { dur: 0.9, y: 30 })}>
          Test <span className="kit-mark" style={markStyle(t, 192.16)}>exact answer sets</span> against expected results
        </div>
        <div style={{ display: 'flex', gap: 30, marginTop: 70 }}>
          {[
            ['Doesn’t use AI', 195.52, false],
            ['Collaborates effectively', 197.44, false],
            ['Uses AI often, skips verification', 199.8, true],
          ].map(([label, at, warn]) => (
            <div key={label as string} className="kit-card" style={{ flex: 1, padding: 36, ...(warn && t > 202.24 ? { borderColor: RED } : {}), ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <div className="kit-ui" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '.12em', color: MUTED }}>ANSWER SET</div>
              <div className="kit-h3" style={{ marginTop: 12 }}>{label as string}</div>
              <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                → expected result
              </div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 24 — Frequent use is not enough */}
      <Scene t={t} index={24}>
        <div className="kit-h1" style={enter(t, 203.66, { dur: 0.9, y: 34 })}>
          Frequent use alone never makes up for missing{' '}
          <span className="kit-mark" style={markStyle(t, 206.48)}>safety or judgment.</span>
        </div>
      </Scene>

      {/* 25 — Credits + pricing */}
      <Scene t={t} index={25} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={208.38}
          stepBadge={'NOTES'}
          title="lovable.dev/pricing"
          src={shot('06-lovable-current-pricing')}
          cam={[{ at: 210.6, x: 740, y: 500, s: 1.45, dur: 1.0 }]}
          rings={[{ at: 211.2, x: 345, y: 505, w: 795, h: 40 }]}
          steps={[
            { at: 208.5, text: 'Before you begin' },
            { at: 210.96, text: 'Check current credits and pricing' },
          ]}
        />
      </Scene>

      {/* 26 — Publishing options */}
      <Scene t={t} index={26} pad={false}>
        <AppWindow
          imgH={IMG_H}
          t={t}
          start={212.6}
          stepBadge={'NOTES'}
          title="lovable.dev"
          src={shot('08-publishing-options-not-published')}
          cam={[{ at: 212.6, x: 1600, y: 280, s: 1.5, dur: 0.01 }]}
          rings={[{ at: 212.9, x: 1480, y: 50, w: 400, h: 440, spot: true }]}
          steps={[{ at: 212.72, text: 'and publishing options' }]}
        />
      </Scene>

      {/* 27 — Before a scored pilot */}
      <Scene t={t} index={27}>
        <div className="kit-label" style={enter(t, 215.5, { y: 14 })}>Before publishing a scored pilot</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 30 }}>
          {[
            ['Finalize the rules', 217.56],
            ['Verify the expected results', 218.72],
            ['Test with representative professionals', 220.8],
          ].map(([label, at], i) => (
            <Row key={label as string} t={t} at={at as number} n={i + 1} text={label as string} tag={<div style={{ opacity: prog(t, (at as number) + 0.5, 0.4) }}><Check size={36} /></div>} />
          ))}
        </div>
      </Scene>

      {/* 28 — Closing */}
      <Scene t={t} index={28} padStyle={{ opacity: 1 - prog(t, 231.6, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 223.5, { y: 14 })}>Lovable</div>
        <div className="kit-h1" style={enter(t, 223.6, { dur: 0.9, y: 34 })}>
          Vibe coding makes an idea <span className="kit-mark" style={markStyle(t, 225.28)}>tangible.</span>
        </div>
        <p className="kit-body" style={{ fontSize: 48, marginTop: 50, ...enter(t, 226.88, { y: 18 }) }}>
          Requirements and testing make it{' '}
          <span className="kit-mark" style={markStyle(t, 229.76)}>dependable.</span>
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const LovableDemo: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={LOVABLE_DEMO_TITLE_FRAMES}>
      <TitleCardGreen label="LOVABLE" title="Vibe Code with Lovable" />
    </Sequence>
    <Sequence from={LOVABLE_DEMO_TITLE_FRAMES}>
      <LovableDemoBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
