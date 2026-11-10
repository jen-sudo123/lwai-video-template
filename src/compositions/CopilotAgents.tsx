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
  FileIcon,
  GREEN,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  MUTED,
  Spark,
  enter,
  makeScene,
  markStyle,
  prog,
} from '../kit';

loadSerif();
loadSans();

// Building Microsoft 365 Copilot Agents — custom screenshot demo (Lead with AI).
// Built with the LWAI demo kit (src/kit), same approach as ClaudeSkills.tsx: every cue is in SECONDS of the VO
// (audio/copilot-agents.mp3, Daan on ElevenLabs v4, 336.04s), taken from the word timestamps in
// src/data/copilot-agents.transcript.json. A 90-frame green title card opens the video; the VO and
// every scene start after it.
//
// Screenshots (copilot-agents/images, 1920x999) play inside an animated app window. Some steps only
// exist as a before/after pair, so scripts/copilot-agents-derive-shots.py builds the in-between
// states (05b, 05c, 06b, 07a, 07b) and consecutive scenes crossfade over the same camera position.
//
//  #  scene                          start   VO cue
//  1  Reusable mini-assistants       0.00    "Microsoft 365 Copilot Agents are reusable mini-assistants…"
//  2  Prompt into assistant          17.20   "Think of it as turning a strong prompt…"
//  3  Meet Larry                     21.70   "For this demo, I'll use the Microsoft 365 Copilot app…"
//  4  Agents > New agent             30.20   "In the left sidebar, I open Agents…"
//  5  Describe or Skip               35.00   "Here, I can describe the agent…"
//  6  Name, description, Instructions 44.90  "I name the agent Larry…"
//  7  The CODO prompt                56.20   "I'll paste in my CODO prompt."
//  8  Suggest improvements, Skills   72.60   "There's also a Suggest improvements option…"
//  9  Skills menu                    83.50   "The menu offers two options…"
//  10 Knowledge: work content        95.30   "Next comes Knowledge."
//  11 Work sources off, Web search   120.60  "…so I'll turn these sources off."
//  12 Web search off, Attachments    131.90  "…turn Web search off as well."
//  13 Knowledge settings             140.80  "There's also a separate Knowledge settings area."
//  14 Image creation off             163.80  "…and turn image creation off."
//  15 Suggested prompts              169.10  "Next is Suggested prompts."
//  16 Prompt title                   180.90  "Draft weekly update."
//  17 Prompt message                 184.00  "Draft this week's leadership update from my notes."
//  18 Preview                        191.10  "Before creating Larry, I open Preview…"
//  19 The test notes                 196.20  "I'll use fictional project notes…"
//  20 Check three things             222.10  "Once Larry responds, I check three things."
//  21 Needs work                     239.20  "If the response needs work…"
//  22 Refined instructions           243.60  "For example, I can specify…"
//  23 Create                         254.20  "Now I click Create."
//  24 Created, private               256.10  "Microsoft confirms that Larry was created…"
//  25 Larry's chat                   271.10  "Here's Larry, with the suggested prompt…"
//  26 Normal chat response           280.70  "I'll also check the response in normal chat…"
//  27 Agents menu > Larry            284.60  "Once Larry is created, I can return to it…"
//  28 Agent Store                    295.20  "…which opens the Agent Store…"
//  29 @Larry                         299.60  "Third, in a supported Copilot Chat experience…"
//  30 Larry in the conversation      307.40  "…and bring it into the conversation."
//  31 Options may vary               309.50  "The exact options may vary…"
//  32 Closing                        323.50  "For a repeatable task like a weekly leadership update…"

export const COPILOT_AGENTS_DURATION_S = 336.7;
export const COPILOT_AGENTS_TITLE_FRAMES = 90;

const STARTS = [
  0, 17.2, 21.7, 30.2, 35.0, 44.9, 56.2, 72.6, 83.5, 95.3, 120.6, 131.9, 140.8, 163.8, 169.1, 180.9, 184.0,
  191.1, 196.2, 222.1, 239.2, 243.6, 254.2, 256.1, 271.1, 280.7, 284.6, 295.2, 299.6, 307.4, 309.5, 323.5,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 999;

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.COPILOT_AGENTS_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { COPILOT_AGENTS_SHOTS?: Record<string, string> }).COPILOT_AGENTS_SHOTS?.[n] ??
  staticFile(`copilot-agents/images/${n}.png`);

type WinProps = Omit<React.ComponentProps<typeof AppWindow>, 'src' | 'start' | 'imgH' | 'title'> & {
  n: string;
  start?: number;
};
// `start` defaults to "long ago": a window that follows another window just crossfades in place.
const Win: React.FC<WinProps> = ({ n, start = -10, width = 1480, ...rest }) => (
  <AppWindow imgH={IMG_H} numbered={false} title="m365.cloud.microsoft" src={shot(n)} start={start} width={width} {...rest} />
);
// Camera key that is already settled when the scene mounts (continues the previous shot's framing).
const hold = (sceneStart: number, x: number, y: number, s: number) => ({ at: sceneStart - 1, x, y, s, dur: 0.01 });

const LarryIcon: React.FC<{ size?: number }> = ({ size = 96 }) => (
  <div style={{ width: size, height: size, borderRadius: size * 0.24, background: GREEN, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
    <span style={{ fontFamily: 'IBM Plex Serif', fontSize: size * 0.56, color: '#fff', lineHeight: 1 }}>L</span>
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const CopilotAgentsBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/copilot-agents.mp3')} />}

      {/* 1 — Reusable mini-assistants */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Microsoft 365 Copilot Agents</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Reusable <span className="kit-mark" style={markStyle(t, 2.8)}>mini-assistants.</span>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 28, ...enter(t, 4.9, { y: 14 }) }}>
          Configured for one specific workflow, so you stop explaining the same task in every new chat.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 80 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {[
              ['A clear role', 13.0],
              ['Standing instructions', 13.7],
              ['Selected knowledge sources', 15.2],
            ].map(([label, at]) => (
              <div key={label as string} style={enter(t, at as number, { x: -40, y: 0, easing: BACK })}>
                <div className="kit-pill">{label as string}</div>
              </div>
            ))}
          </div>
          <div style={{ opacity: prog(t, 15.6, 0.15) }}><Arrow t={t} at={15.6} w={200} /></div>
          <div
            className="kit-card"
            style={{ width: 520, padding: '34px 38px', display: 'flex', alignItems: 'center', gap: 26, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 16.0, { dur: 0.6, scale: 0.7, y: 0, easing: BACK }) }}
          >
            <Spark size={72} />
            <div>
              <div className="kit-h3">Your agent</div>
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>Ready for the next chat</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 2 — Prompt into assistant */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 17.3, { y: 14 })}>Think of it as</div>
        <div className="kit-h2" style={enter(t, 17.4, { dur: 0.8, y: 30 })}>
          A strong prompt, <span className="kit-mark" style={markStyle(t, 19.8)}>made reusable.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 44, marginTop: 80 }}>
          <div className="kit-card kit-ui" style={{ width: 520, padding: '30px 34px', display: 'flex', alignItems: 'center', gap: 22, ...enter(t, 18.3, { x: -30, y: 0 }) }}>
            <FileIcon size={64} />
            <div>
              <div className="kit-h3">Strong prompt</div>
              <div style={{ fontSize: 24, color: MUTED, marginTop: 6 }}>Pasted into every chat</div>
            </div>
          </div>
          <div style={{ opacity: prog(t, 19.3, 0.15) }}><Arrow t={t} at={19.3} w={200} /></div>
          <div className="kit-card kit-ui" style={{ width: 560, padding: '30px 34px', display: 'flex', alignItems: 'center', gap: 22, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 19.8, { scale: 0.75, y: 0, easing: BACK }) }}>
            <Spark size={64} />
            <div>
              <div className="kit-h3">Reusable assistant</div>
              <div style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>Set up once, used every week</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Meet Larry */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 21.8, { y: 14 })}>This demo</div>
        <div className="kit-h1" style={enter(t, 22.0, { dur: 0.9, y: 34 })}>
          Building <span className="kit-mark" style={markStyle(t, 26.0)}>Larry.</span>
        </div>
        <div className="kit-card kit-ui" style={{ width: 980, marginTop: 70, padding: '36px 40px', display: 'flex', alignItems: 'center', gap: 32, ...enter(t, 25.8, { y: 30, easing: BACK }) }}>
          <LarryIcon />
          <div>
            <div className="kit-h3">Larry</div>
            <div style={{ fontSize: 30, color: MUTED, marginTop: 8, ...enter(t, 27.3, { y: 10 }) }}>Helps me write weekly leadership updates.</div>
          </div>
        </div>
        <div style={{ marginTop: 40, ...enter(t, 23.3, { y: 12 }) }}>
          <span className="kit-tag">Built in the Microsoft 365 Copilot app</span>
        </div>
      </Scene>

      {/* 4 — Agents > New agent */}
      <Scene t={t} index={3} pad={false}>
        <Win
          t={t}
          n="01-agents-new-agent"
          start={30.2}
          cam={[{ at: 30.9, x: 260, y: 300, s: 2.2 }]}
          cursor={[
            { at: 30.6, x: 620, y: 470 },
            { at: 31.4, x: 75, y: 214, click: true, dur: 0.7 },
            { at: 33.2, x: 318, y: 371, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 32.1, until: 33.5, x: 14, y: 199, w: 226, h: 29 },
            { at: 33.8, x: 252, y: 356, w: 228, h: 28 },
          ]}
          steps={[
            { at: 32.0, text: 'Agents' },
            { at: 33.7, text: 'New agent' },
          ]}
        />
      </Scene>

      {/* 5 — Describe or Skip */}
      <Scene t={t} index={4} pad={false}>
        <Win
          t={t}
          n="02-builder-describe-or-skip"
          cam={[{ at: 35.2, x: 1100, y: 400, s: 1.55 }]}
          cursor={[
            { at: 42.6, x: 1050, y: 560 },
            { at: 43.2, x: 1458, y: 319, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 35.6, until: 37.8, x: 712, y: 403, w: 768, h: 58 },
            { at: 38.2, x: 1417, y: 303, w: 82, h: 32 },
          ]}
          steps={[
            { at: 35.6, text: 'Describe the agent' },
            { at: 38.2, text: 'Or choose Skip' },
          ]}
        />
      </Scene>

      {/* 6 — Name, description, Instructions */}
      <Scene t={t} index={5} pad={false}>
        <Win
          t={t}
          n="03-larry-instructions"
          cam={[
            { at: 45.0, x: 1200, y: 170, s: 2.3 },
            { at: 51.4, x: 1315, y: 400, s: 1.9 },
          ]}
          rings={[
            { at: 45.9, until: 48.2, x: 998, y: 116, w: 76, h: 38 },
            { at: 48.4, until: 51.2, x: 998, y: 165, w: 266, h: 22 },
            { at: 52.4, until: 53.8, x: 941, y: 252, w: 108, h: 24 },
            { at: 54.0, x: 943, y: 288, w: 745, h: 262 },
          ]}
          steps={[
            { at: 45.9, text: 'Name: Larry' },
            { at: 47.4, text: 'A short description' },
            { at: 52.4, text: 'Instructions' },
          ]}
        />
      </Scene>

      {/* 7 — The CODO prompt */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 56.3, { y: 14 })}>Instructions</div>
        <div className="kit-h2" style={enter(t, 56.4, { dur: 0.8, y: 30 })}>
          My <span className="kit-mark" style={markStyle(t, 57.0)}>CODO</span> prompt.
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 56 }}>
          {[
            ['C', 'Character', 59.4],
            ['O', 'Objective', 60.2],
            ['D', "Do's and Don'ts", 61.2],
            ['O', 'Output', 62.4],
          ].map(([letter, word, at], i) => (
            <div key={i} className="kit-card kit-ui" style={{ width: 300, padding: '26px 30px', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 84, lineHeight: 1, color: GREEN }}>{letter as string}</div>
              <div style={{ fontSize: 30, fontWeight: 600, marginTop: 14 }}>{word as string}</div>
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: 16, ...enter(t, 64.4, { x: -20, y: 0 }) }}>
            <span className="kit-tag">Stays consistent</span>
          </div>
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 44, padding: '26px 30px', borderStyle: 'dashed', borderColor: '#B9B9B0', display: 'flex', alignItems: 'center', gap: 22, ...enter(t, 65.8, { y: 24 }) }}>
          <div style={{ fontSize: 30, fontWeight: 600, width: 400, flex: 'none' }}>What changes each week</div>
          {[
            ['Notes', 69.1],
            ['Metrics', 70.0],
            ['Priorities', 70.7],
            ['Blockers', 71.6],
          ].map(([label, at]) => (
            <div key={label as string} className="kit-pill" style={{ fontSize: 26, padding: '12px 24px', ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>
              {label as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 8 — Suggest improvements, then Skills */}
      <Scene t={t} index={7} pad={false}>
        <Win
          t={t}
          n="03-larry-instructions"
          start={72.6}
          cam={[
            hold(72.6, 1315, 400, 1.9),
            { at: 72.9, x: 1440, y: 290, s: 2.4 },
            { at: 77.4, x: 1315, y: 690, s: 1.9 },
          ]}
          rings={[
            { at: 73.4, until: 77.2, x: 1343, y: 253, w: 188, h: 30 },
            { at: 78.2, until: 79.6, x: 941, y: 636, w: 60, h: 24 },
            { at: 79.8, x: 943, y: 671, w: 745, h: 78 },
          ]}
          steps={[
            { at: 73.4, text: 'Suggest improvements' },
            { at: 78.2, text: 'Skills' },
          ]}
        />
      </Scene>

      {/* 9 — Skills menu */}
      <Scene t={t} index={8} pad={false}>
        <Win
          t={t}
          n="04-skills-create-or-upload"
          cam={[hold(83.5, 1315, 690, 1.9), { at: 83.7, x: 1500, y: 690, s: 2.4 }]}
          cursor={[
            { at: 83.3, x: 1480, y: 780 },
            { at: 83.6, x: 1677, y: 653, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 85.8, until: 87.2, x: 1530, y: 679, w: 148, h: 26 },
            { at: 87.4, until: 89.6, x: 1530, y: 711, w: 148, h: 26 },
          ]}
          steps={[
            { at: 85.8, text: 'Create with chat' },
            { at: 87.4, text: 'Upload a skill package' },
            { at: 93.4, text: 'Skip for Larry' },
          ]}
        />
      </Scene>

      {/* 10 — Knowledge: work content */}
      <Scene t={t} index={9} pad={false}>
        <Win
          t={t}
          n="05-knowledge-default-sources"
          cam={[hold(95.3, 1315, 360, 1.45), { at: 102.6, x: 1315, y: 390, s: 1.9 }]}
          cursor={[
            { at: 119.4, x: 1480, y: 420 },
            { at: 120.0, x: 1660, y: 318, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 96.1, until: 100.2, x: 941, y: 95, w: 104, h: 24 },
            { at: 101.3, until: 104.4, x: 941, y: 258, w: 118, h: 20 },
            { at: 104.7, until: 105.7, x: 940, y: 302, w: 748, h: 32 },
            { at: 105.9, until: 106.4, x: 940, y: 356, w: 748, h: 32 },
            { at: 106.6, until: 107.2, x: 940, y: 410, w: 748, h: 32 },
            { at: 107.4, until: 111.6, x: 940, y: 464, w: 748, h: 32 },
            { at: 117.8, until: 120.5, x: 940, y: 300, w: 748, h: 198 },
          ]}
          steps={[
            { at: 96.1, text: 'Knowledge' },
            { at: 101.3, text: 'Work content' },
            { at: 113.2, text: 'Select sources useful for the task' },
            { at: 120.1, text: 'Turn these sources off' },
          ]}
        />
      </Scene>

      {/* 11 — Work sources off; Web search */}
      <Scene t={t} index={10} pad={false}>
        <Win
          t={t}
          n="05b-work-sources-off"
          cam={[hold(120.6, 1315, 390, 1.9), { at: 122.0, x: 1315, y: 480, s: 1.9 }]}
          cursor={[
            { at: 130.3, x: 1480, y: 640 },
            { at: 131.1, x: 1660, y: 555, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 123.0, until: 130.6, x: 940, y: 538, w: 748, h: 34 }]}
          steps={[
            { at: 120.6, text: 'Work sources off' },
            { at: 123.0, text: 'Web search' },
            { at: 131.1, text: 'Turn Web search off' },
          ]}
        />
      </Scene>

      {/* 12 — Web search off; Attachments; gear */}
      <Scene t={t} index={11} pad={false}>
        <Win
          t={t}
          n="05c-all-sources-off"
          cam={[hold(131.9, 1315, 480, 1.9), { at: 139.3, x: 1315, y: 300, s: 1.6, dur: 0.8 }]}
          cursor={[
            { at: 139.6, x: 1540, y: 380 },
            { at: 139.9, x: 1672, y: 112, click: true, dur: 0.8 },
          ]}
          rings={[{ at: 134.2, until: 139.2, x: 940, y: 613, w: 748, h: 34 }]}
          steps={[
            { at: 131.9, text: 'Web search off' },
            { at: 134.2, text: 'Attachments' },
            { at: 138.7, text: 'No files for this demo' },
          ]}
        />
      </Scene>

      {/* 13 — Knowledge settings */}
      <Scene t={t} index={12} pad={false}>
        <Win
          t={t}
          n="06-knowledge-settings"
          cam={[hold(140.8, 1315, 300, 1.6), { at: 141.1, x: 960, y: 430, s: 1.9 }]}
          cursor={[
            { at: 162.3, x: 1130, y: 580 },
            { at: 163.0, x: 1296, y: 499, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 142.1, until: 143.6, x: 585, y: 226, w: 180, h: 28 },
            { at: 145.3, until: 146.2, x: 586, y: 313, w: 748, h: 60 },
            { at: 146.4, until: 148.7, x: 586, y: 391, w: 748, h: 60 },
            { at: 148.9, until: 150.1, x: 586, y: 469, w: 748, h: 60 },
            { at: 150.3, until: 158.7, x: 586, y: 547, w: 748, h: 60, spot: true },
            { at: 160.4, until: 162.2, x: 1272, y: 409, w: 48, h: 24 },
          ]}
          steps={[
            { at: 142.1, text: 'Knowledge settings' },
            { at: 145.3, text: 'People data' },
            { at: 146.4, text: 'Create documents, charts, and code' },
            { at: 148.9, text: 'Create images' },
            { at: 150.3, text: 'Discourage model knowledge' },
            { at: 160.2, text: 'Keep document creation on' },
            { at: 162.5, text: 'Turn image creation off' },
          ]}
        />
      </Scene>

      {/* 14 — Image creation off */}
      <Scene t={t} index={13} pad={false}>
        <Win
          t={t}
          n="06b-knowledge-settings-images-off"
          cam={[hold(163.8, 960, 430, 1.9)]}
          steps={[
            { at: 163.8, text: 'Image creation off' },
            { at: 165.2, text: 'Focused on the leadership update workflow' },
          ]}
        />
      </Scene>

      {/* 15 — Suggested prompts */}
      <Scene t={t} index={14} pad={false}>
        <Win
          t={t}
          n="05c-all-sources-off"
          cam={[hold(169.1, 1315, 600, 1.45), { at: 169.4, x: 1315, y: 840, s: 1.9 }]}
          rings={[
            { at: 170.0, until: 176.2, x: 941, y: 739, w: 164, h: 24 },
            { at: 177.6, until: 179.3, x: 941, y: 772, w: 32, h: 18 },
            { at: 178.1, until: 179.3, x: 1131, y: 772, w: 60, h: 18 },
            { at: 179.5, x: 943, y: 798, w: 184, h: 32 },
          ]}
          steps={[
            { at: 170.0, text: 'Suggested prompts' },
            { at: 177.1, text: 'A title and a message' },
            { at: 179.5, text: 'Title' },
          ]}
        />
      </Scene>

      {/* 16 — Prompt title */}
      <Scene t={t} index={15} pad={false}>
        <Win
          t={t}
          n="07a-prompt-title"
          cam={[hold(180.9, 1315, 840, 1.9)]}
          rings={[
            { at: 179.9, until: 182.9, x: 943, y: 798, w: 184, h: 32 },
            { at: 183.1, x: 1136, y: 798, w: 476, h: 32 },
          ]}
          steps={[
            { at: 180.9, text: 'Title: Draft weekly update' },
            { at: 183.1, text: 'Message' },
          ]}
        />
      </Scene>

      {/* 17 — Prompt message */}
      <Scene t={t} index={16} pad={false}>
        <Win
          t={t}
          n="07b-prompt-message"
          cam={[hold(184.0, 1315, 840, 1.9)]}
          rings={[
            { at: 183.0, until: 187.0, x: 1136, y: 798, w: 476, h: 32 },
            { at: 187.6, x: 943, y: 798, w: 669, h: 32 },
          ]}
          steps={[
            { at: 184.0, text: 'Message: Draft this week’s leadership update from my notes.' },
            { at: 189.4, text: 'A clear starting point' },
          ]}
        />
      </Scene>

      {/* 18 — Preview */}
      <Scene t={t} index={17} pad={false}>
        <Win
          t={t}
          n="08-preview-ready"
          cam={[hold(191.1, 1300, 330, 1.45), { at: 193.9, x: 1300, y: 520, s: 1.5 }]}
          cursor={[
            { at: 191.9, x: 1120, y: 300 },
            { at: 192.4, x: 1368, y: 33, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 193.0, until: 194.2, x: 1332, y: 19, w: 72, h: 28 },
            { at: 194.7, x: 797, y: 558, w: 342, h: 100 },
          ]}
          steps={[
            { at: 193.0, text: 'Preview' },
            { at: 194.5, text: 'Test with a realistic example' },
          ]}
        />
      </Scene>

      {/* 19 — The test notes */}
      <Scene t={t} index={18} pad={false}>
        <Win
          t={t}
          n="13-preview-retest-summary-and-facts"
          cam={[hold(196.2, 1300, 520, 1.5), { at: 196.4, x: 1450, y: 310, s: 2.0 }]}
          rings={[
            { at: 197.2, until: 203.4, x: 1058, y: 173, w: 790, h: 280 },
            { at: 204.7, until: 210.2, x: 1070, y: 263, w: 764, h: 40 },
            { at: 210.4, until: 212.7, x: 1070, y: 311, w: 712, h: 21 },
            { at: 213.1, until: 221.6, x: 1070, y: 339, w: 764, h: 60 },
          ]}
          steps={[
            { at: 196.7, text: 'Fictional project notes' },
            { at: 204.7, text: 'Progress and open defects' },
            { at: 210.5, text: 'A pending approval' },
            { at: 213.1, text: 'A trade-off to decide' },
          ]}
        />
      </Scene>

      {/* 20 — Check three things */}
      <Scene t={t} index={19} pad={false}>
        <Win
          t={t}
          n="13-preview-retest-summary-and-facts"
          left={80}
          top={170}
          width={1000}
          cam={[hold(222.1, 1320, 690, 1.75)]}
          rings={[
            { at: 226.7, until: 232.4, x: 806, y: 492, w: 220, h: 26 },
            { at: 226.9, until: 232.4, x: 806, y: 587, w: 210, h: 26 },
            { at: 227.1, until: 232.4, x: 806, y: 722, w: 275, h: 26 },
            { at: 227.3, until: 232.4, x: 806, y: 857, w: 250, h: 26 },
          ]}
        />
        <div style={{ position: 'absolute', left: 1150, top: 190, width: 690 }}>
          <div className="kit-label" style={enter(t, 222.3, { y: 14 })}>Once Larry responds</div>
          <div className="kit-h2" style={{ fontSize: 60, ...enter(t, 222.5, { dur: 0.8, y: 26 }) }}>I check three things.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 50 }}>
            {[
              ['It follows the five-section structure', 225.2],
              ['Concise and useful for a leadership audience', 228.6],
              ['Accurate facts, owners, deadlines, and trade-offs', 232.8],
            ].map(([text, at]) => (
              <div key={text as string} className="kit-ui" style={{ display: 'flex', alignItems: 'flex-start', gap: 18, fontSize: 32, lineHeight: 1.3, ...enter(t, at as number, { x: -24, y: 0 }) }}>
                <div style={{ flex: 'none', marginTop: 3 }}><Check size={36} /></div>
                {text as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 21 — Needs work */}
      <Scene t={t} index={20} pad={false}>
        <Win
          t={t}
          n="10-preview-decisions-tradeoffs-next-steps"
          start={239.2}
          cam={[hold(239.2, 1300, 600, 1.35), { at: 239.5, x: 1250, y: 730, s: 1.8 }]}
          rings={[{ at: 240.2, x: 806, y: 743, w: 138, h: 24 }]}
          steps={[{ at: 240.1, text: 'An extra section: refine and test again' }]}
        />
      </Scene>

      {/* 22 — Refined instructions */}
      <Scene t={t} index={21} pad={false}>
        <Win
          t={t}
          n="11-instructions-refined-after-test"
          cam={[hold(243.6, 1315, 420, 1.9)]}
          rings={[{ at: 245.5, x: 953, y: 488, w: 716, h: 60 }]}
          steps={[
            { at: 243.9, text: 'Refine the instructions' },
            { at: 246.6, text: 'Return one update' },
            { at: 248.0, text: 'Only the five requested sections' },
            { at: 250.6, text: 'Missing owners or dates: “not specified”' },
          ]}
        />
      </Scene>

      {/* 23 — Create */}
      <Scene t={t} index={22} pad={false}>
        <Win
          t={t}
          n="13-preview-retest-summary-and-facts"
          cam={[hold(254.2, 1500, 260, 1.6)]}
          cursor={[
            { at: 254.3, x: 1520, y: 300 },
            { at: 254.5, x: 1793, y: 33, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 255.0, x: 1764, y: 18, w: 59, h: 30 }]}
          steps={[{ at: 254.9, text: 'Create' }]}
        />
      </Scene>

      {/* 24 — Created, private */}
      <Scene t={t} index={23} pad={false}>
        <Win
          t={t}
          n="14-created-successfully-private"
          cam={[hold(256.1, 1500, 260, 1.6), { at: 256.3, x: 960, y: 500, s: 2.0 }]}
          cursor={[
            { at: 268.7, x: 1010, y: 650 },
            { at: 269.3, x: 1187, y: 538, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 258.2, until: 259.6, x: 685, y: 448, w: 330, h: 26 },
            { at: 260.0, until: 262.5, x: 685, y: 486, w: 346, h: 20 },
            { at: 262.9, until: 268.5, x: 1032, y: 522, w: 94, h: 30 },
            { at: 269.8, x: 1140, y: 522, w: 94, h: 30 },
          ]}
          steps={[
            { at: 258.2, text: 'Created successfully' },
            { at: 260.0, text: 'Private: available only to me' },
            { at: 262.9, text: 'Sharing depends on your organization' },
            { at: 267.0, text: 'Keep Larry private' },
            { at: 269.7, text: 'Start chat' },
          ]}
        />
      </Scene>

      {/* 25 — Larry's chat */}
      <Scene t={t} index={24} pad={false}>
        <Win
          t={t}
          n="15-larry-created-chat"
          cam={[hold(271.1, 1090, 520, 1.25), { at: 271.3, x: 1090, y: 560, s: 1.7 }]}
          rings={[
            { at: 272.2, until: 274.6, x: 981, y: 610, w: 215, h: 125 },
            { at: 275.6, x: 706, y: 494, w: 765, h: 57 },
          ]}
          steps={[
            { at: 272.2, text: 'The suggested prompt, ready to use' },
            { at: 275.6, text: 'Add this week’s notes' },
            { at: 278.0, text: 'No need to paste the instructions again' },
          ]}
        />
      </Scene>

      {/* 26 — Normal chat response */}
      <Scene t={t} index={25} pad={false}>
        <Win
          t={t}
          n="16-normal-chat-summary-and-facts"
          cam={[hold(280.7, 1085, 480, 1.4), { at: 281.0, x: 1085, y: 620, s: 1.55, dur: 3.2 }]}
          steps={[{ at: 281.2, text: 'Check the response in normal chat' }]}
        />
      </Scene>

      {/* 27 — Agents menu > Larry, then More agents */}
      <Scene t={t} index={26} pad={false}>
        <Win
          t={t}
          n="18-larry-in-agents-menu"
          cam={[
            { at: 284.9, x: 760, y: 420, s: 1.2, dur: 3.2 },
            { at: 288.3, x: 260, y: 300, s: 2.2 },
          ]}
          cursor={[
            { at: 288.9, x: 420, y: 130 },
            { at: 289.1, x: 75, y: 214, click: true, dur: 0.6 },
            { at: 291.0, x: 300, y: 220, click: true, dur: 0.6 },
            { at: 293.6, x: 322, y: 403, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 289.7, until: 291.2, x: 14, y: 199, w: 226, h: 29 },
            { at: 291.6, until: 293.6, x: 249, y: 204, w: 220, h: 29 },
            { at: 294.2, x: 252, y: 389, w: 228, h: 27 },
          ]}
          steps={[
            { at: 289.6, text: 'Agents' },
            { at: 291.6, text: 'Larry' },
            { at: 294.0, text: 'More agents' },
          ]}
        />
      </Scene>

      {/* 28 — Agent Store */}
      <Scene t={t} index={27} pad={false}>
        <Win
          t={t}
          n="19-more-agents-store-my-agents"
          cam={[hold(295.2, 1080, 400, 1.3), { at: 295.4, x: 1080, y: 330, s: 1.6, dur: 0.8 }]}
          rings={[
            { at: 295.7, until: 297.0, x: 595, y: 79, w: 174, h: 34 },
            { at: 297.2, x: 849, y: 367, w: 90, h: 35 },
            { at: 298.1, x: 595, y: 290, w: 115, h: 26 },
          ]}
          steps={[
            { at: 295.7, text: 'Agent Store' },
            { at: 297.2, text: 'Larry, under My agents' },
          ]}
        />
      </Scene>

      {/* 29 — @Larry */}
      <Scene t={t} index={28} pad={false}>
        <Win
          t={t}
          n="20-larry-mention-picker"
          cam={[hold(299.6, 1090, 560, 1.3), { at: 300.2, x: 1090, y: 620, s: 1.7 }]}
          cursor={[
            { at: 306.2, x: 1010, y: 770 },
            { at: 306.5, x: 900, y: 667, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 303.5, until: 304.6, x: 760, y: 516, w: 54, h: 24 },
            { at: 304.8, x: 748, y: 646, w: 683, h: 40 },
            { at: 305.4, until: 307.0, x: 801, y: 593, w: 117, h: 30 },
          ]}
          steps={[
            { at: 303.2, text: 'Type @Larry' },
            { at: 304.7, text: 'Select it under Agents & Skills' },
          ]}
        />
      </Scene>

      {/* 30 — Larry in the conversation */}
      <Scene t={t} index={29} pad={false}>
        <Win
          t={t}
          n="21-larry-selected-by-mention"
          cam={[hold(307.4, 1090, 620, 1.7)]}
          rings={[{ at: 307.7, x: 763, y: 531, w: 96, h: 33 }]}
          steps={[{ at: 307.4, text: 'Larry joins the conversation' }]}
        />
      </Scene>

      {/* 31 — Options may vary; Copilot Studio */}
      <Scene t={t} index={30}>
        <div className="kit-label" style={enter(t, 309.6, { y: 14 })}>Good to know</div>
        <div className="kit-h2" style={enter(t, 309.7, { dur: 0.8, y: 30 })}>The exact options may vary.</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginTop: 50 }}>
          {[
            ['Microsoft 365 experience', 311.4],
            ['License', 314.0],
            ['Permissions', 314.8],
            ['Administrator settings', 315.5],
          ].map(([label, at]) => (
            <div key={label as string} className="kit-pill" style={enter(t, at as number, { y: 0, scale: 0.6, easing: BACK })}>
              {label as string}
            </div>
          ))}
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 60, padding: '32px 38px', display: 'flex', alignItems: 'center', gap: 30, borderColor: GREEN, background: LIME_SOFT, ...enter(t, 317.2, { y: 30 }) }}>
          <div style={{ flex: 'none', width: 520 }}>
            <div style={{ fontSize: 24, color: GREEN, fontWeight: 600 }}>Need something more advanced?</div>
            <div className="kit-h3" style={{ marginTop: 6 }}>
              Explore <span className="kit-mark" style={{ ...markStyle(t, 321.7), backgroundImage: `linear-gradient(${LIME}, ${LIME})` }}>Copilot Studio</span>
            </div>
          </div>
          {[
            ['Automation', 318.2],
            ['Actions', 319.1],
            ['Integrations', 320.0],
          ].map(([label, at]) => (
            <div key={label as string} className="kit-pill" style={{ fontSize: 26, padding: '12px 24px', ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>
              {label as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 32 — Closing */}
      <Scene t={t} index={31} padStyle={{ opacity: 1 - prog(t, 335.9, 0.7, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 323.6, { y: 14 })}>Agent Builder</div>
        <div className="kit-h1" style={enter(t, 323.8, { dur: 0.9, y: 34 })}>
          A practical <span className="kit-mark" style={markStyle(t, 328.0)}>starting point.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 80 }}>
          <div className="kit-card kit-ui" style={{ padding: '28px 34px', ...enter(t, 330.0, { y: 24, easing: BACK }) }}>
            <div style={{ fontSize: 22, color: MUTED, fontWeight: 600, letterSpacing: '.1em' }}>1</div>
            <div className="kit-h3" style={{ marginTop: 4 }}>Define it once</div>
          </div>
          <div style={{ opacity: prog(t, 332.2, 0.15) }}><Arrow t={t} at={332.2} w={110} /></div>
          <div className="kit-card kit-ui" style={{ padding: '28px 34px', ...enter(t, 332.5, { y: 24, easing: BACK }) }}>
            <div style={{ fontSize: 22, color: MUTED, fontWeight: 600, letterSpacing: '.1em' }}>2</div>
            <div className="kit-h3" style={{ marginTop: 4 }}>Test it</div>
          </div>
          <div style={{ opacity: prog(t, 333.3, 0.15) }}><Arrow t={t} at={333.3} w={110} /></div>
          <div className="kit-card kit-ui" style={{ padding: '28px 34px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 333.6, { y: 24, easing: BACK }) }}>
            <div style={{ fontSize: 22, color: GREEN, fontWeight: 600, letterSpacing: '.1em' }}>3</div>
            <div className="kit-h3" style={{ marginTop: 4 }}>Reuse it each week</div>
          </div>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 44, ...enter(t, 334.4, { y: 12 }) }}>With fresh inputs every time.</p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const CopilotAgents: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={COPILOT_AGENTS_TITLE_FRAMES}>
      <TitleCardGreen label="COPILOT" title="Building Copilot Agents" />
    </Sequence>
    <Sequence from={COPILOT_AGENTS_TITLE_FRAMES}>
      <CopilotAgentsBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
