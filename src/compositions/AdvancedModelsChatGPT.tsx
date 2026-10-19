import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { colors } from '../tokens';

loadSerif();
loadSans();

// Advanced Models in ChatGPT — ported from the branded HTML/JS page
// (dumping/advanced-models-chatgpt/advanced-models-chatgpt.html). Every cue is in SECONDS of the VO
// (audio/advanced-models-chatgpt.mp3, 359.33s), from the Whisper word timestamps in
// videos/advanced-models-chatgpt/transcript/advanced-models-chatgpt.json.
//
// A 90-frame (3s) green title card opens the video; the VO and every scene below start after it.
//
//  #  scene                              start   VO cue
//  1  Chat is a great default            0.0     "Most people, of course…"
//  2  Chat versus Work                   17.1    "But before we get into the advanced models"
//  3  Thinking in Chat                   50.9    "In regular chat…"
//  4  Other plans (Free/Go, Pro)         79.0    "If you use free or go…"
//  5  Chat model picker                  100.3   "Again, what appears in your model picker…"
//  6  Models in Work                     107.3   "But now let's talk about work"
//  7  Which model? (GPT-6 family)        144.0   "So which ones are we actually going to choose?"
//  8  Astra benchmark                    150.6   "Starting with GPT 6 Astra…"
//  9  When to choose Astra               179.9   "This means it's a very powerful model"
//  10 Business workflow benchmark        193.9   "In another benchmark…"
//  11 Sol                                222.4   "Then there is GPT 6 Sol"
//  12 Luna                               249.5   "And then finally, there is GPT 6 Luna"
//  13 Rule of thumb                      272.2   "So the rule of thumb here is simple"
//  14 Earlier GPT-5.6 family             284.3   "Now you may still see 5.6 Sol, Terra, and Luna"
//  15 Effort in Work                     296.6   "Now there's one more control…"
//  16 Edit while processing              327.6   "Now it's good to know…"
//  17 Bottom line                        336.5   "So the bottom line here…"
//  18 You still own the judgment         344.1   "Of course, no matter the model…"

export const ADVANCED_MODELS_DURATION_S = 359.4;
export const ADVANCED_MODELS_TITLE_FRAMES = 90;

const STARTS = [0, 17.1, 50.9, 79.0, 100.3, 107.3, 144.0, 150.6, 179.9, 193.9, 222.4, 249.5, 272.2, 284.3, 296.6, 327.6, 336.5, 344.1];
const CROSSFADE = 0.6;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const OUT = Easing.out(Easing.cubic);
const IN_OUT = Easing.inOut(Easing.quad);

const img = (name: string) => staticFile(`advanced-models-chatgpt/images/${name}`);

// 0 → 1 progress of a tween starting at `at` seconds
const prog = (t: number, at: number, dur = 0.7, easing = OUT) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing });

type EnterOpts = { dur?: number; x?: number; y?: number; scale?: number; easing?: (n: number) => number };
const enter = (t: number, at: number, { dur = 0.7, x = 0, y = 24, scale = 1, easing = OUT }: EnterOpts = {}) => {
  const p = prog(t, at, dur, easing);
  return {
    opacity: p,
    transform: `translate(${x * (1 - p)}px, ${y * (1 - p)}px) scale(${scale + (1 - scale) * p})`,
  } as React.CSSProperties;
};

// Lime-200 marker sweep behind black text
const markStyle = (t: number, at: number): React.CSSProperties => ({
  backgroundSize: `${prog(t, at, 0.9, IN_OUT) * 100}% 38%`,
});

// Scene 2 screenshot frame (work-home.png is 794x772)
const SHOT_W = 820;
const SHOT_FIT = SHOT_W / 794;
const SHOT_H = Math.round(772 * SHOT_FIT);
// Scene 8 chart (arc-agi-3-chart.png is 1080x608)
const CHART_W = 980;
const CHART_H = Math.round(608 * (CHART_W / 1080));

const CSS = `
  .am-pad { width: 100%; height: 100%; padding: 80px 80px 170px; display: flex; flex-direction: column; justify-content: center; box-sizing: border-box; }
  .am-label { display: flex; align-items: center; gap: 18px; font-family: 'Public Sans'; font-weight: 600; font-size: 22px; letter-spacing: .12em; text-transform: uppercase; color: ${colors.neutral600}; margin: 0 0 28px; }
  .am-label::before { content: ""; width: 44px; height: 5px; background: ${colors.lime500}; }
  .am-h1, .am-h2, .am-h3 { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.04em; margin: 0; color: ${colors.black}; }
  .am-h1 { font-size: 96px; line-height: 1.1; max-width: 1600px; }
  .am-h2 { font-size: 72px; line-height: 1.12; max-width: 1640px; }
  .am-h3 { font-size: 44px; line-height: 1.15; }
  .am-body { font-family: 'Public Sans'; font-size: 36px; line-height: 1.5; margin: 32px 0 0; max-width: 1400px; color: ${colors.black}; }
  .am-body b { font-weight: 600; }
  .am-muted { color: ${colors.neutral600}; }
  .am-mark { background-image: linear-gradient(${colors.lime200}, ${colors.lime200}); background-repeat: no-repeat; background-position: 0 88%; background-size: 0% 38%; padding: 0 .06em; margin: 0 -.06em; }

  .am-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: stretch; margin-top: 48px; }
  .am-grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; margin-top: 56px; }
  .am-grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-top: 56px; }

  .am-card { background: ${colors.white}; border: 2px solid ${colors.neutral200}; border-radius: 20px; padding: 40px; box-sizing: border-box; }
  .am-card .am-h3 { margin: 0 0 16px; }
  .am-card p { font-family: 'Public Sans'; font-size: 28px; line-height: 1.5; margin: 0; color: ${colors.black}; }
  .am-card p + p { margin-top: 16px; }
  .am-card .note { font-size: 24px; color: ${colors.neutral600}; margin-top: 24px; }

  .am-tag { display: inline-flex; padding: 8px 18px; border-radius: 999px; background: ${colors.lime200}; color: ${colors.black}; font-family: 'Public Sans'; font-weight: 600; font-size: 18px; letter-spacing: .1em; margin-bottom: 22px; }

  .am-pillrow { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 40px; }
  .am-card .am-pillrow { margin-top: 28px; }
  .am-pill { padding: 14px 26px; border: 2px solid ${colors.neutral200}; border-radius: 999px; font-family: 'Public Sans'; font-size: 26px; font-weight: 600; }

  .am-shot { display: block; width: 100%; height: 360px; object-fit: contain; border-radius: 14px; border: 2px solid ${colors.neutral200}; background: #F5F5F5; }

  .am-stats { display: flex; align-items: flex-end; gap: 120px; margin-top: 44px; }
  .am-stat .num { font-family: 'IBM Plex Serif'; font-weight: 400; letter-spacing: -0.05em; line-height: 1; }
  .am-stat .rule { height: 8px; background: ${colors.lime500}; margin-top: 16px; transform-origin: left center; }
  .am-stat .cap { font-family: 'Public Sans'; font-weight: 600; font-size: 24px; letter-spacing: .1em; text-transform: uppercase; color: ${colors.neutral600}; margin-top: 20px; }

  .am-row { display: flex; align-items: center; gap: 56px; margin-top: 44px; }
  .am-li { font-family: 'Public Sans'; font-size: 28px; line-height: 1.45; padding: 18px 0; border-bottom: 2px solid ${colors.neutral200}; }
  .am-li b { font-weight: 600; }
  .am-split { display: grid; grid-template-columns: 1fr ${SHOT_W}px; gap: 72px; align-items: center; }
  .am-split.chart { grid-template-columns: 1fr ${CHART_W}px; gap: 64px; }
  .am-split .am-body { text-wrap: balance; }
  .am-stack { display: flex; flex-direction: column; gap: 24px; margin-top: 40px; }
  .am-card.compact { padding: 30px 36px; }
  .am-card.compact .am-h3 { font-size: 40px; margin-bottom: 10px; }
  .am-card.compact p { font-size: 26px; }
  .am-card.compact .am-tag { margin-bottom: 16px; }
  .am-card.compact .note { margin-top: 14px; }
  .am-frame { position: relative; overflow: hidden; border-radius: 20px; border: 2px solid ${colors.neutral200}; background: #FCFBFC; }
  .am-num { font-family: 'Public Sans'; font-weight: 600; font-size: 20px; letter-spacing: .1em; color: ${colors.neutral600}; margin-bottom: 18px; }
`;

// A scene is mounted from its start until the next scene has finished fading in over it.
const Scene: React.FC<{ t: number; index: number; children: React.ReactNode; padStyle?: React.CSSProperties }> = ({
  t,
  index,
  children,
  padStyle,
}) => {
  const start = STARTS[index];
  const end = index + 1 < STARTS.length ? STARTS[index + 1] + CROSSFADE : Infinity;
  if (t < start || t >= end) return null;
  const opacity = index === 0 ? 1 : prog(t, start, CROSSFADE, IN_OUT);
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, opacity, zIndex: index + 1 }}>
      <div className="am-pad" style={padStyle}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

// Pill that fades in at `at` and can switch to the black "on" state at `onAt` (until `offAt`)
const Pill: React.FC<{ t: number; at: number; onAt?: number; offAt?: number; children: React.ReactNode }> = ({
  t,
  at,
  onAt,
  offAt,
  children,
}) => {
  const on = onAt === undefined ? 0 : prog(t, onAt, 0.4, IN_OUT) * (offAt === undefined ? 1 : 1 - prog(t, offAt, 0.4, IN_OUT));
  const bg = Math.round(255 * (1 - on));
  const fg = Math.round(255 * on);
  return (
    <span
      className="am-pill"
      style={{
        ...enter(t, at, { dur: 0.5, y: 14 }),
        background: `rgb(${bg},${bg},${bg})`,
        color: `rgb(${fg},${fg},${fg})`,
        borderColor: on > 0.5 ? colors.black : colors.neutral200,
      }}
    >
      {children}
    </span>
  );
};

const Stat: React.FC<{ t: number; at: number; value: string; caption: string; size: number; muted?: boolean }> = ({
  t,
  at,
  value,
  caption,
  size,
  muted,
}) => (
  <div className="am-stat" style={enter(t, at, { dur: 0.8, y: 30, easing: Easing.out(Easing.exp) })}>
    <div className="num" style={{ fontSize: size, color: muted ? colors.neutral600 : colors.black }}>{value}</div>
    <div
      className="rule"
      style={{ background: muted ? colors.neutral200 : colors.lime500, transform: `scaleX(${prog(t, at + 0.4, 0.8, IN_OUT)})` }}
    />
    <div className="cap">{caption}</div>
  </div>
);

// Scene 2 screenshot (work-home.png, 794x772) in a frame of the same aspect.
// Zooms about ORIGIN so the Chat/Work toggle lands mid-frame, then a lime ring moves Chat → Work,
// zooms back out and rings the model selector. Ring boxes are in frame px at zoom 1 (image px × SHOT_FIT).
const SHOT_ZOOM = 2.6;
const TOGGLE = { x: 408 * SHOT_FIT, y: 23 * SHOT_FIT };
const ZOOM_TARGET = { x: SHOT_W / 2, y: SHOT_H / 2 };
const ORIGIN = {
  x: (SHOT_ZOOM * TOGGLE.x - ZOOM_TARGET.x) / (SHOT_ZOOM - 1),
  y: (SHOT_ZOOM * TOGGLE.y - ZOOM_TARGET.y) / (SHOT_ZOOM - 1),
};
const box = (x0: number, y0: number, x1: number, y1: number) => ({
  x: x0 * SHOT_FIT, y: y0 * SHOT_FIT, w: (x1 - x0) * SHOT_FIT, h: (y1 - y0) * SHOT_FIT,
});
const CHAT_BOX = box(298, 5, 402, 41);
const WORK_BOX = box(400, 5, 519, 41);
const PICKER_BOX = box(562, 484, 698, 512);

const WorkToggleShot: React.FC<{ t: number }> = ({ t }) => {
  const zoom = prog(t, 25.2, 1.3, IN_OUT) - prog(t, 44.6, 1.3, IN_OUT);
  const scale = 1 + (SHOT_ZOOM - 1) * zoom;
  const move = prog(t, 31.1, 0.6, IN_OUT);
  const ring = {
    x: CHAT_BOX.x + (WORK_BOX.x - CHAT_BOX.x) * move,
    y: CHAT_BOX.y,
    w: CHAT_BOX.w + (WORK_BOX.w - CHAT_BOX.w) * move,
    h: CHAT_BOX.h,
  };
  const ringOpacity = prog(t, 27.6, 0.4) - prog(t, 44.3, 0.4);
  const pickerOpacity = prog(t, 48.2, 0.5);
  const ringStyle = (b: typeof ring, opacity: number): React.CSSProperties => ({
    position: 'absolute', left: b.x - 3, top: b.y - 3, width: b.w + 6, height: b.h + 6,
    borderRadius: 999, border: `${3 / scale}px solid ${colors.lime500}`, boxSizing: 'border-box', opacity,
  });
  return (
    <div className="am-frame" style={{ width: SHOT_W, height: SHOT_H, ...enter(t, 18.4, { y: 30 }) }}>
      <div style={{ position: 'absolute', inset: 0, transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px`, transform: `scale(${scale})` }}>
        <Img src={img('work-home.png')} style={{ width: SHOT_W, height: SHOT_H, display: 'block' }} />
        <div style={ringStyle(ring, ringOpacity)} />
        <div style={ringStyle(PICKER_BOX, pickerOpacity)} />
      </div>
    </div>
  );
};

const AdvancedModelsBody: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <style>{CSS}</style>
      <Audio src={staticFile('audio/advanced-models-chatgpt.mp3')} />

      {/* 1 — Chat is a great default */}
      <Scene t={t} index={0}>
        <div className="am-label" style={enter(t, 0.2, { dur: 0.6, y: 16 })}>Advanced Models in ChatGPT</div>
        <div className="am-h1" style={enter(t, 0.4, { dur: 0.9, y: 34 })}>Chat is a great default.</div>
        <div className="am-pillrow">
          <Pill t={t} at={5.5} onAt={5.5}>Everyday questions</Pill>
          <Pill t={t} at={8.5}>Compare options</Pill>
          <Pill t={t} at={10.1}>Conflicting information</Pill>
          <Pill t={t} at={12.4}>Consequential work</Pill>
        </div>
        <p className="am-body" style={{ marginTop: 56, ...enter(t, 13.9, { dur: 0.6, y: 18 }) }}>
          But higher-stakes work benefits from knowing <b>which mode, model, and thinking level</b> you are using.
        </p>
      </Scene>

      {/* 2 — Chat versus Work: screenshot zooms into the Chat/Work toggle */}
      <Scene t={t} index={1}>
        <div className="am-split">
          <div>
            <div className="am-label" style={enter(t, 17.3, { dur: 0.6, y: 16 })}>01 · Choose the mode</div>
            <div className="am-h2" style={enter(t, 22.5, { dur: 0.8, y: 30 })}>Chat versus Work</div>
            <div className="am-stack">
              <div className="am-card compact" style={enter(t, 27.5, { y: 26 })}>
                <span className="am-tag">CHAT</span>
                <div className="am-h3">Conversation first</div>
                <p>Questions, drafts, brainstorming, analysis, and quick iteration.</p>
              </div>
              <div className="am-card compact" style={enter(t, 30.9, { y: 26 })}>
                <span className="am-tag">WORK</span>
                <div className="am-h3">Longer tasks</div>
                <p>Research across files and tools, multi-step execution, and finished deliverables.</p>
                <p className="note" style={enter(t, 32.8, { dur: 0.5, y: 10 })}>Introduced by OpenAI in July 2026</p>
              </div>
            </div>
            <p className="am-body" style={{ marginTop: 40, fontSize: 32, ...enter(t, 45.9, { dur: 0.6, y: 18 }) }}>
              Chat and Work give you <span className="am-mark" style={markStyle(t, 48.5)}>different model choices.</span>
            </p>
          </div>
          <WorkToggleShot t={t} />
        </div>
      </Scene>

      {/* 3 — Thinking in Chat */}
      <Scene t={t} index={2}>
        <div className="am-label" style={enter(t, 51.1, { dur: 0.6, y: 16 })}>02 · Thinking levels in Chat</div>
        <div className="am-h2" style={enter(t, 52.2, { dur: 0.8, y: 30 })}>Same model. More or less reasoning.</div>
        <div className="am-grid2">
          <div className="am-card" style={enter(t, 53.4, { y: 26 })}>
            <div className="am-h3">Thinking effort</div>
            <Img className="am-shot" src={img('thinking_effort_chat.svg')} />
          </div>
          <div className="am-card" style={enter(t, 54.4, { y: 26 })}>
            <div className="am-h3">What it controls</div>
            <p style={enter(t, 72.2, { dur: 0.6, y: 12 })}>
              Move toward higher effort when the task needs more planning, analysis, or checking.
            </p>
            <div className="am-pillrow">
              <Pill t={t} at={59.3} onAt={68.8} offAt={72.6}>Instant</Pill>
              <Pill t={t} at={60.2} onAt={60.2} offAt={68.8}>Medium</Pill>
              <Pill t={t} at={60.8} onAt={72.8}>High</Pill>
              <Pill t={t} at={61.5} onAt={73.5}>Extra High</Pill>
            </div>
            <p className="note" style={enter(t, 65.4, { dur: 0.5, y: 10 })}>All four use the same model: GPT-5.6 Sol.</p>
          </div>
        </div>
      </Scene>

      {/* 4 — Other plans */}
      <Scene t={t} index={3}>
        <div className="am-label" style={enter(t, 79.2, { dur: 0.6, y: 16 })}>Depends on your plan</div>
        <div className="am-h2" style={enter(t, 79.4, { dur: 0.8, y: 30 })}>Your plan changes what Chat offers.</div>
        <div className="am-grid2">
          <div className="am-card" style={enter(t, 79.9, { y: 26 })}>
            <span className="am-tag">FREE OR GO</span>
            <div className="am-h3">GPT-5.6 Luna</div>
            <p>A more efficient model for everyday chat.</p>
            <p className="note" style={enter(t, 87.0, { dur: 0.5, y: 10 })}>
              A Think option gives Luna more room to reason on harder questions.
            </p>
          </div>
          <div className="am-card" style={enter(t, 92.1, { y: 26 })}>
            <span className="am-tag">PRO</span>
            <div className="am-h3">GPT-6 Pro</div>
            <p>Powered by Astra, on some eligible accounts.</p>
          </div>
        </div>
      </Scene>

      {/* 5 — Chat model picker */}
      <Scene t={t} index={4}>
        <div className="am-label" style={enter(t, 100.5, { dur: 0.6, y: 16 })}>Chat model picker</div>
        <div className="am-h2" style={enter(t, 100.6, { dur: 0.8, y: 30 })}>Chat shows fewer model choices.</div>
        <div className="am-grid2">
          <div className="am-card" style={enter(t, 100.9, { y: 26 })}>
            <div className="am-h3">Chat UI</div>
            <Img className="am-shot" src={img('chat_model_picker.svg')} />
          </div>
          <div className="am-card" style={enter(t, 101.3, { y: 26 })}>
            <div className="am-h3">What it illustrates</div>
            <p>In Chat, you generally see a smaller set of models than in Work.</p>
            <p className="am-muted" style={enter(t, 102.6, { dur: 0.5, y: 10 })}>
              What appears can vary by plan and workspace settings.
            </p>
          </div>
        </div>
      </Scene>

      {/* 6 — Models in Work */}
      <Scene t={t} index={5}>
        <div className="am-label" style={enter(t, 107.6, { dur: 0.6, y: 16 })}>03 · Models in Work</div>
        <div className="am-h2" style={enter(t, 108.2, { dur: 0.8, y: 30 })}>Work gives you a broader model picker.</div>
        <div className="am-grid2">
          <div className="am-card" style={enter(t, 113.4, { y: 26 })}>
            <Img className="am-shot" style={{ height: 560 }} src={img('work_model_picker.svg')} />
          </div>
          <div className="am-card" style={enter(t, 120.9, { y: 26 })}>
            <span className="am-tag">BROADER CHOICE</span>
            <div className="am-h3">What Work adds</div>
            <p>Work can show Default plus specific models from the GPT‑6 and GPT‑5.6 families.</p>
            <div className="am-pillrow">
              <Pill t={t} at={122.3}>Default</Pill>
              <Pill t={t} at={125.6}>GPT-6 Astra</Pill>
              <Pill t={t} at={125.9} onAt={134.9}>GPT-6 Sol</Pill>
              <Pill t={t} at={126.2} onAt={135.5}>GPT-6 Luna</Pill>
            </div>
            <p className="note" style={enter(t, 136.2, { dur: 0.5, y: 10 })}>
              GPT-6 Sol and Luna can only be selected in Work.
            </p>
          </div>
        </div>
      </Scene>

      {/* 7 — Which model? */}
      <Scene t={t} index={6}>
        <div className="am-label" style={enter(t, 144.2, { dur: 0.6, y: 16 })}>04 · The GPT-6 family</div>
        <div className="am-h1" style={enter(t, 144.3, { dur: 0.9, y: 34 })}>
          So which model should you <span className="am-mark" style={markStyle(t, 145.4)}>choose?</span>
        </div>
        <p className="am-body am-muted" style={{ marginTop: 48, ...enter(t, 146.2, { dur: 0.6, y: 18 }) }}>
          We’ll focus mostly on GPT-6, the latest family of models.
        </p>
      </Scene>

      {/* 8 — Astra benchmark: text left, ARC-AGI-3 chart right */}
      <Scene t={t} index={7}>
        <div className="am-split chart">
          <div>
            <div className="am-label" style={enter(t, 150.8, { dur: 0.6, y: 16 })}>GPT-6 Astra</div>
            <div className="am-h2" style={enter(t, 152.4, { dur: 0.8, y: 30 })}>For the hardest work</div>
            <p className="am-body am-muted" style={{ fontSize: 30, marginTop: 20, ...enter(t, 155.1, { dur: 0.6, y: 14 }) }}>
              Launched September 2026 as OpenAI’s strongest model.
            </p>
            <p className="am-body" style={{ fontSize: 30, marginTop: 40, ...enter(t, 160.1, { dur: 0.6, y: 14 }) }}>
              <b>ARC-AGI-3</b> puts AI agents into unfamiliar interactive games and measures how efficiently they learn.
            </p>
            <p className="am-body" style={{ fontSize: 30, marginTop: 28, ...enter(t, 169.8, { dur: 0.6, y: 14 }) }}>
              Astra scored <span className="am-mark" style={markStyle(t, 170.2)}>99.9%</span> in a particular test setup.
            </p>
            <p className="am-body am-muted" style={{ fontSize: 30, marginTop: 16, ...enter(t, 174.5, { dur: 0.6, y: 14 }) }}>
              OpenAI estimated 48% for the average human tester.
            </p>
          </div>
          <div className="am-frame" style={{ width: CHART_W, height: CHART_H, background: colors.white, ...enter(t, 159.9, { dur: 0.8, y: 30 }) }}>
            <Img src={img('arc-agi-3-chart.png')} style={{ width: CHART_W, height: CHART_H, display: 'block' }} />
          </div>
        </div>
      </Scene>

      {/* 9 — When to choose Astra */}
      <Scene t={t} index={8}>
        <div className="am-label" style={enter(t, 180.1, { dur: 0.6, y: 16 })}>When to choose Astra</div>
        <div className="am-h2" style={enter(t, 182.3, { dur: 0.8, y: 30 })}>When the job has…</div>
        <div className="am-grid3">
          {[
            { at: 184.3, n: '01', title: 'Many moving parts' },
            { at: 186.2, n: '02', title: 'Conflicting information' },
            { at: 187.6, n: '03', title: 'Significant consequences' },
          ].map((c) => (
            <div key={c.n} className="am-card" style={enter(t, c.at, { y: 26 })}>
              <div className="am-num">{c.n}</div>
              <div className="am-h3" style={{ margin: 0 }}>{c.title}</div>
            </div>
          ))}
        </div>
        <p className="am-body" style={{ marginTop: 56, ...enter(t, 190.0, { dur: 0.6, y: 18 }) }}>
          And still <span className="am-mark" style={markStyle(t, 190.9)}>review its work</span>, no matter how powerful it is.
        </p>
      </Scene>

      {/* 10 — Business workflow benchmark */}
      <Scene t={t} index={9}>
        <div className="am-label" style={enter(t, 194.1, { dur: 0.6, y: 16 })}>A second benchmark</div>
        <div className="am-h2" style={enter(t, 195.4, { dur: 0.8, y: 30 })}>Simulated business workflows</div>
        <p className="am-body am-muted" style={{ marginTop: 20, ...enter(t, 197.7, { dur: 0.6, y: 14 }) }}>
          Finance, HR, sales, and support.
        </p>
        <div className="am-row">
          <Stat t={t} at={204.6} value="~42%" caption="of tasks" size={200} />
          <p className="am-body" style={{ margin: 0, maxWidth: 820, ...enter(t, 205.4, { dur: 0.6, x: -20, y: 0 }) }}>
            Every requested objective completed without breaking a rule.{' '}
            <span className="am-mark" style={markStyle(t, 206.4)}>Not 100%.</span>
          </p>
        </div>
        <div className="am-h3" style={{ marginTop: 48, ...enter(t, 210.3, { dur: 0.7, y: 20 }) }}>
          A person still needs to check the finished result.
        </div>
        <p className="am-body am-muted" style={{ fontSize: 26, marginTop: 24, ...enter(t, 213.8, { dur: 0.5, y: 10 }) }}>
          Astra also uses your Work allowance faster, depending on plan, task size, and reasoning setting.
        </p>
      </Scene>

      {/* 11 — Sol */}
      <Scene t={t} index={10}>
        <div className="am-label" style={enter(t, 222.6, { dur: 0.6, y: 16 })}>GPT-6 Sol</div>
        <div className="am-h2" style={enter(t, 224.6, { dur: 0.8, y: 30 })}>Substantial everyday work</div>
        <div className="am-grid3">
          {[
            { at: 228.7, title: 'Research', desc: 'Investigate a question across sources.' },
            { at: 230.4, title: 'Analyze', desc: 'Weigh options and documents.' },
            { at: 232.8, title: 'Deliver', desc: 'Create a polished output through connected steps.' },
          ].map((c) => (
            <div key={c.title} className="am-card" style={enter(t, c.at, { y: 26 })}>
              <div className="am-h3">{c.title}</div>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="am-body" style={{ marginTop: 56, ...enter(t, 240.6, { dur: 0.6, y: 18 }) }}>
          Strong capability with room to iterate, and <span className="am-mark" style={markStyle(t, 245.4)}>fewer tokens than Astra.</span>
        </p>
      </Scene>

      {/* 12 — Luna */}
      <Scene t={t} index={11}>
        <div className="am-label" style={enter(t, 250.8, { dur: 0.6, y: 16 })}>GPT-6 Luna</div>
        <div className="am-h2" style={enter(t, 252.5, { dur: 0.8, y: 30 })}>Focused, efficient work</div>
        <div className="am-grid3">
          {[
            { at: 257.6, title: 'Extract', desc: 'Pull information from files.' },
            { at: 259.6, title: 'Organize', desc: 'Sort items into categories.' },
            { at: 261.6, title: 'Edit', desc: 'Run short, defined changes.' },
          ].map((c) => (
            <div key={c.title} className="am-card" style={enter(t, c.at, { y: 26 })}>
              <div className="am-h3">{c.title}</div>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
        <p className="am-body" style={{ marginTop: 56, ...enter(t, 264.2, { dur: 0.6, y: 18 }) }}>
          Still check its output before using it for <span className="am-mark" style={markStyle(t, 266.5)}>anything consequential.</span>
        </p>
      </Scene>

      {/* 13 — Rule of thumb */}
      <Scene t={t} index={12}>
        <div className="am-label" style={enter(t, 272.4, { dur: 0.6, y: 16 })}>Rule of thumb</div>
        <div className="am-h2" style={enter(t, 272.6, { dur: 0.8, y: 30 })}>Match the model to the work.</div>
        <div className="am-grid4">
          {[
            { at: 274.6, tag: 'DEFAULT', title: 'Unsure' },
            { at: 276.8, tag: 'SOL', title: 'Substantial' },
            { at: 278.8, tag: 'ASTRA', title: 'Hardest' },
            { at: 280.8, tag: 'LUNA', title: 'Focused' },
          ].map((c) => (
            <div key={c.tag} className="am-card" style={enter(t, c.at, { y: 26 })}>
              <span className="am-tag">{c.tag}</span>
              <div className="am-h3" style={{ margin: 0 }}>{c.title}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 14 — Earlier GPT-5.6 family */}
      <Scene t={t} index={13}>
        <div className="am-label" style={enter(t, 284.5, { dur: 0.6, y: 16 })}>Earlier model family</div>
        <div className="am-h2" style={enter(t, 284.7, { dur: 0.8, y: 30 })}>You may still see GPT-5.6 models.</div>
        <div className="am-pillrow">
          <Pill t={t} at={286.2}>GPT-5.6 Sol</Pill>
          <Pill t={t} at={286.8}>GPT-5.6 Terra</Pill>
          <Pill t={t} at={287.2}>GPT-5.6 Luna</Pill>
        </div>
        <p className="am-body" style={{ marginTop: 56, ...enter(t, 291.4, { dur: 0.6, y: 18 }) }}>
          The GPT-6 family is a lot better. These will be <span className="am-mark" style={markStyle(t, 294.3)}>phased out over time.</span>
        </p>
      </Scene>

      {/* 15 — Effort in Work */}
      <Scene t={t} index={14}>
        <div className="am-label" style={enter(t, 296.8, { dur: 0.6, y: 16 })}>05 · Effort in Work</div>
        <div className="am-h2" style={enter(t, 298.9, { dur: 0.8, y: 30 })}>Then choose how deeply it should think.</div>
        <div className="am-grid2">
          <div className="am-card" style={enter(t, 303.6, { y: 26 })}>
            <div className="am-h3">Select effort</div>
            <Img className="am-shot" src={img('work_effort_control.svg')} />
          </div>
          <div className="am-card" style={enter(t, 304.4, { y: 26 })}>
            <div className="am-h3">Match effort to the task</div>
            <div className="am-li" style={enter(t, 309.3, { dur: 0.5, x: -20, y: 0 })}>
              <b>Higher</b> when the task needs more planning, analysis, or checking.
            </div>
            <div className="am-li" style={enter(t, 314.0, { dur: 0.5, x: -20, y: 0 })}>
              <b>Lower</b> for straightforward tasks where speed matters more.
            </div>
            <p className="note" style={enter(t, 319.0, { dur: 0.5, y: 10 })}>
              More effort takes longer, uses more allowance, and doesn’t always guarantee a better answer.
            </p>
          </div>
        </div>
      </Scene>

      {/* 16 — Edit while processing */}
      <Scene t={t} index={15}>
        <div className="am-label" style={enter(t, 327.8, { dur: 0.6, y: 16 })}>Good to know</div>
        <div className="am-h1" style={enter(t, 329.1, { dur: 0.9, y: 34 })}>
          Missed an instruction? <span className="am-mark" style={markStyle(t, 332.0)}>Just edit.</span>
        </div>
        <p className="am-body am-muted" style={{ marginTop: 48, ...enter(t, 331.2, { dur: 0.6, y: 18 }) }}>
          You can edit your prompt while Work is still processing.
        </p>
      </Scene>

      {/* 17 — Bottom line */}
      <Scene t={t} index={16}>
        <div className="am-label" style={enter(t, 336.7, { dur: 0.6, y: 16 })}>The bottom line</div>
        <div className="am-h1" style={enter(t, 337.8, { dur: 0.9, y: 34 })}>
          Choosing the model and thinking level changes{' '}
          <span className="am-mark" style={markStyle(t, 341.4)}>what you can ask AI to attempt.</span>
        </div>
      </Scene>

      {/* 18 — Closing (final scene: content fades out at the end) */}
      <Scene t={t} index={17} padStyle={{ opacity: 1 - prog(t, 358.4, 0.8, Easing.in(Easing.quad)) }}>
        <div className="am-label" style={enter(t, 344.3, { dur: 0.6, y: 16 })}>Advanced Models in ChatGPT</div>
        <div className="am-h1" style={enter(t, 345.4, { dur: 0.9, y: 34 })}>
          You still <span className="am-mark" style={markStyle(t, 346.8)}>own the judgment.</span>
        </div>
        <p className="am-body" style={{ marginTop: 48, ...enter(t, 349.6, { dur: 0.6, y: 18 }) }}>
          Choose the level of help the task deserves.
        </p>
        <p className="am-body" style={{ marginTop: 8, ...enter(t, 352.4, { dur: 0.6, y: 18 }) }}>
          Give it the context it needs.
        </p>
        <p className="am-body" style={{ marginTop: 8, ...enter(t, 353.8, { dur: 0.6, y: 18 }) }}>
          Check the result before you use it.
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

export const AdvancedModelsChatGPT: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: colors.white }}>
    <Sequence durationInFrames={ADVANCED_MODELS_TITLE_FRAMES}>
      <TitleCardGreen label="CHOOSING THE RIGHT MODEL" title="Advanced Models in ChatGPT" />
    </Sequence>
    <Sequence from={ADVANCED_MODELS_TITLE_FRAMES}>
      <AdvancedModelsBody />
    </Sequence>
  </AbsoluteFill>
);
