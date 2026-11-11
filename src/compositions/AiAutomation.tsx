import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
  Check,
  Composer,
  EnterOpts,
  FileIcon,
  FolderIcon,
  GREEN,
  INK,
  IN_OUT,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// AI Automation — custom animated concept video (Lead with AI), built with the demo kit (src/kit).
// VO: audio/AiAutomation.mp3 (Daan, ElevenLabs v4, take A, 176.08s of speech). Every cue is in SECONDS of
// the VO, taken from the Scribe word timestamps in src/data/AiAutomation.transcript.words.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
//  #  scene                        start   VO cue
//  1  Reactive pattern             0.00    "If you're used to using AI the usual way…"
//  2  Reactive → proactive         15.12   "AI automation is the shift…"
//  3  How it plays out             23.76   "So, say something happens…"
//  4  Trigger, Decision, Action    35.52   "An easy way to understand it is…"
//  5  Trigger                      41.24   "A trigger is any event…"
//  6  Decision                     52.48   "Then AI helps with the decision part…"
//  7  Action                       65.60   "And then, finally, the workflow takes an action…"
//  8  No code                      76.21   "The good news is…"
//  9  Briefings                    86.15   "A couple of use cases… First, daily or weekly briefings."
//  10 Meeting follow-through       100.00  "Second, meeting follow-through."
//  11 Approval workflows           107.92  "And third, approval workflows."
//  12 Guardrails                   119.20  "Now, of course, we can't just let AI run…"
//  13 Low vs higher risk           134.00  "So, low-risk actions…"
//  14 Visibility                   149.44  "And you want some visibility, too."
//  15 Close                        160.36  "So, let's advance as AI leaders…"

export const AI_AUTOMATION_DURATION_S = 177.6;
export const AI_AUTOMATION_TITLE_FRAMES = 90;

const STARTS = [0, 15.12, 23.76, 35.52, 41.24, 52.48, 65.6, 76.21, 86.15, 100.0, 107.92, 119.2, 134.0, 149.44, 160.36];
const Scene = makeScene(STARTS, 0.5);
// Reveals start slightly before the word so the element is readable on its onset
const LEAD = 0.2;

// ── Small icons (24px grid, green line style) ──────────────────────────────
type IconName = 'mail' | 'form' | 'clock' | 'bolt' | 'chat' | 'task' | 'table' | 'person' | 'shield' | 'loop' | 'clip';
const Icon: React.FC<{ name: IconName; size?: number; color?: string }> = ({ name, size = 40, color = GREEN }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  const paths: Record<IconName, React.ReactNode> = {
    mail: (
      <>
        <rect x="3" y="5.5" width="18" height="13" rx="2" {...s} />
        <path d="M3.5 7l8.5 6.5L20.5 7" {...s} />
      </>
    ),
    form: (
      <>
        <rect x="4.5" y="3" width="15" height="18" rx="2" {...s} />
        <path d="M8 8h8M8 12h8M8 16h5" {...s} />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" {...s} />
        <path d="M12 7v5l3.5 2" {...s} />
      </>
    ),
    bolt: <path d="M13 2.5L5 13.5h6l-1 8 8-11h-6z" {...s} />,
    chat: <path d="M4 5.5h16v10H10l-4.5 3.5V15.5H4z" {...s} />,
    task: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" {...s} />
        <path d="M8 12.2l2.8 2.8L16.5 9" {...s} />
      </>
    ),
    table: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" {...s} />
        <path d="M3 9.5h18M3 14.8h18M9.5 4v16" {...s} />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="3.8" {...s} />
        <path d="M4.5 20.5c.8-4 3.8-6 7.5-6s6.7 2 7.5 6" {...s} />
      </>
    ),
    shield: (
      <>
        <path d="M12 2.8l7.5 3v6c0 4.6-3.2 8-7.5 9.4C7.7 19.8 4.5 16.4 4.5 11.8v-6z" {...s} />
        <path d="M8.6 12l2.4 2.4 4.4-4.6" {...s} />
      </>
    ),
    loop: (
      <>
        <path d="M19.5 12a7.5 7.5 0 01-13.2 4.9M4.5 12a7.5 7.5 0 0113.2-4.9" {...s} />
        <path d="M17.9 3.6v3.6h-3.6M6.1 20.4v-3.6h3.6" {...s} />
      </>
    ),
    clip: <path d="M16.5 7.5l-7.6 7.6a2.2 2.2 0 003.1 3.1l8-8a4.2 4.2 0 00-6-6l-8.3 8.3a6.2 6.2 0 008.8 8.8l6.3-6.3" {...s} />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
      {paths[name]}
    </svg>
  );
};

const IconBox: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 72 }) => (
  <div style={{ width: size, height: size, borderRadius: 18, background: LIME_SOFT, display: 'grid', placeItems: 'center', flex: 'none' }}>
    {children}
  </div>
);

// Grey placeholder text lines that grow in
const Lines: React.FC<{ p: number; widths: number[]; h?: number; gap?: number }> = ({ p, widths, h = 14, gap = 14 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {widths.map((w, i) => (
      <div key={i} style={{ height: h, borderRadius: h, background: '#ECECE6', width: `${w * Math.min(1, Math.max(0, p * widths.length - i))}%` }} />
    ))}
  </div>
);

// The AI node used in the flow scenes
const AiNode: React.FC<{ size?: number; pulse?: number }> = ({ size = 150, pulse = 0 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: INK,
      color: '#fff',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'IBM Plex Serif',
      fontSize: size * 0.34,
      flex: 'none',
      boxShadow: `0 0 0 ${10 + 14 * pulse}px rgba(102,198,28,${0.35 * (1 - pulse)})`,
    }}
  >
    AI
  </div>
);

// Trigger → Decision → Action strip; `active` highlights one step (−1 = none)
const STEPS = ['Trigger', 'Decision', 'Action'];
const StepStrip: React.FC<{ active: number; small?: boolean; reveal?: number[]; t: number }> = ({ active, small, reveal, t }) => (
  <div className="kit-row" style={{ gap: small ? 18 : 26 }}>
    {STEPS.map((s, i) => {
      const on = i === active;
      const style = reveal ? enter(t, reveal[i] - LEAD, { y: 18, scale: 0.9 }) : {};
      return (
        <React.Fragment key={s}>
          {i > 0 && (
            <div style={{ fontFamily: 'Public Sans', fontSize: small ? 30 : 56, color: MUTED, ...(reveal ? enter(t, reveal[i] - LEAD - 0.1, { y: 0 }) : {}) }}>→</div>
          )}
          <div
            className="kit-pill"
            style={{
              fontSize: small ? 24 : 54,
              padding: small ? '10px 24px' : '30px 54px',
              borderColor: on ? GREEN : LINE,
              background: on ? LIME_SOFT : '#fff',
              color: active === -1 || on ? INK : MUTED,
              fontFamily: small ? 'Public Sans' : 'IBM Plex Serif',
              fontWeight: small ? 600 : 400,
              ...style,
            }}
          >
            {!small && <span style={{ fontFamily: 'Public Sans', fontSize: 26, fontWeight: 700, color: GREEN }}>{i + 1}</span>}
            {s}
          </div>
        </React.Fragment>
      );
    })}
  </div>
);

// Card with an icon and a label, used for triggers/actions/inputs
const ItemCard: React.FC<{ icon: React.ReactNode; text: string; style?: React.CSSProperties; done?: number; w?: number }> = ({ icon, text, style, done, w }) => (
  <div className="kit-card kit-row" style={{ gap: 24, padding: '22px 30px', width: w, boxShadow: '0 10px 30px rgba(0,0,0,.05)', ...style }}>
    <IconBox>{icon}</IconBox>
    <div className="kit-ui" style={{ fontSize: 36, fontWeight: 500, flex: 1 }}>{text}</div>
    {done !== undefined && <div style={{ opacity: done, transform: `scale(${0.6 + 0.4 * done})` }}><Check size={44} /></div>}
  </div>
);

const Switch: React.FC<{ on: number }> = ({ on }) => (
  <div style={{ width: 72, height: 40, borderRadius: 40, background: on > 0.5 ? LIME : '#D6D6D6', position: 'relative', flex: 'none' }}>
    <div style={{ position: 'absolute', top: 4, left: 4 + on * 32, width: 32, height: 32, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,.25)' }} />
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const AiAutomationBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // Reveal on the word: every cue below is the VO second of the word it names
  const e = (at: number, o?: EnterOpts) => enter(t, at - LEAD, o);
  const mk = (at: number) => markStyle(t, at);
  const fadeOut = 1 - prog(t, 176.4, 1.0, Easing.in(Easing.quad));

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/AiAutomation.mp3')} />}

      {/* 1 — The reactive pattern */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={e(0.2, { y: 14 })}>The usual way</div>
        <div className="kit-h2" style={e(0.4, { dur: 0.9, y: 30 })}>
          You already know the <span className="kit-mark" style={mk(4.08)}>reactive pattern.</span>
        </div>
        <div className="kit-row" style={{ gap: 50, marginTop: 80, alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, ...e(5.52) }}>
            <span className="kit-tag" style={{ alignSelf: 'flex-start' }}>You ask</span>
            <Composer w={680} text={typed(t, 5.6, 'Summarize this week’s pipeline changes', 1.3)} caret={t < 7.2} />
          </div>
          <div style={{ marginTop: 90 }}>
            <Arrow t={t} at={6.5} w={120} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, ...e(7.0) }}>
            <span className="kit-tag" style={{ alignSelf: 'flex-start' }}>It answers</span>
            <div className="kit-card" style={{ width: 620, padding: '30px 34px', boxShadow: '0 10px 30px rgba(0,0,0,.06)' }}>
              <Lines p={prog(t, 7.1, 1.4)} widths={[92, 80, 86, 55]} />
            </div>
          </div>
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 70, ...e(8.52) }}>
          Helpful, but it depends on you <span className="kit-mark" style={mk(10.0)}>remembering to ask.</span>
        </p>
      </Scene>

      {/* 2 — Reactive → proactive */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={e(15.3, { y: 14 })}>AI automation</div>
        <div className="kit-row" style={{ gap: 40 }}>
          <div className="kit-pill" style={{ fontSize: 56, padding: '30px 56px', fontFamily: 'IBM Plex Serif', fontWeight: 400, color: MUTED, ...e(17.2) }}>
            Reactive AI
          </div>
          <Arrow t={t} at={18.0} w={180} />
          <div
            className="kit-pill"
            style={{ fontSize: 56, padding: '30px 56px', fontFamily: 'IBM Plex Serif', fontWeight: 400, borderColor: GREEN, background: LIME_SOFT, ...e(18.64, { scale: 0.9 }) }}
          >
            Proactive AI
          </div>
        </div>
        <div className="kit-h1" style={{ marginTop: 100, ...e(20.4, { dur: 0.9, y: 30 }) }}>
          Work that runs <span className="kit-mark" style={mk(21.2)}>in the background.</span>
        </div>
      </Scene>

      {/* 3 — How it plays out */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={e(23.9, { y: 14 })}>How it plays out</div>
        <div className="kit-row" style={{ gap: 36, marginTop: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <ItemCard w={500} icon={<Icon name="bolt" />} text="Something happens" style={e(24.64)} />
            <ItemCard w={500} icon={<Icon name="clock" />} text="A time hits your calendar" style={e(26.0)} />
          </div>
          <Arrow t={t} at={27.5} w={110} />
          <div className="kit-card" style={{ width: 470, padding: '34px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26, ...e(28.32) }}>
            <AiNode size={110} pulse={prog(t, 28.4, 1.2)} />
            <div className="kit-ui" style={{ fontSize: 30, fontWeight: 600 }}>Kicks off a small workflow</div>
            <div className="kit-row" style={{ gap: 12, width: '100%' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ flex: 1, height: 14, borderRadius: 14, background: '#ECECE6', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: LIME, width: `${100 * prog(t, 29.0 + i * 0.45, 0.45)}%` }} />
                </div>
              ))}
            </div>
          </div>
          <Arrow t={t} at={29.8} w={110} />
          <div className="kit-card" style={{ width: 400, padding: '34px 36px', display: 'flex', flexDirection: 'column', gap: 22, ...e(30.2) }}>
            <div className="kit-row" style={{ gap: 16, justifyContent: 'space-between' }}>
              <FileIcon size={56} accent />
              <div style={{ opacity: prog(t, 31.2, 0.4), transform: `scale(${0.6 + 0.4 * prog(t, 31.2, 0.4)})` }}>
                <Check size={48} />
              </div>
            </div>
            <div className="kit-ui" style={{ fontSize: 30, fontWeight: 600 }}>Delivers the output itself</div>
            <Lines p={prog(t, 30.4, 1.0)} widths={[90, 70, 80]} h={12} gap={12} />
          </div>
        </div>
        <div className="kit-h3" style={{ marginTop: 80, fontSize: 52, ...e(32.32) }}>
          And it’s <span className="kit-mark" style={mk(32.68)}>simpler than most people assume.</span>
        </div>
      </Scene>

      {/* 4 — Trigger, Decision, Action */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={e(35.6, { y: 14 })}>An easy way to understand it</div>
        <div className="kit-row" style={{ gap: 30, marginTop: 40 }}>
          {(
            [
              ['Trigger', 'Something starts it', 37.8, <Icon key="b" name="bolt" size={56} />],
              ['Decision', 'AI works it out', 38.4, <AiNode key="a" size={56} />],
              ['Action', 'Something gets done', 39.36, <Icon key="t" name="task" size={56} />],
            ] as const
          ).map(([title, sub, at, icon], i) => (
            <React.Fragment key={title}>
              {i > 0 && <Arrow t={t} at={at - 0.5} w={70} />}
              <div className="kit-card" style={{ width: 470, padding: '40px 44px', display: 'flex', flexDirection: 'column', gap: 22, boxShadow: '0 12px 36px rgba(0,0,0,.06)', ...e(at, { scale: 0.92 }) }}>
                <div className="kit-row" style={{ justifyContent: 'space-between' }}>
                  <IconBox size={88}>{icon}</IconBox>
                  <span className="kit-ui" style={{ fontSize: 30, fontWeight: 700, color: GREEN }}>{i + 1}</span>
                </div>
                <div className="kit-h2" style={{ fontSize: 68 }}>{title}</div>
                <div className="kit-body kit-muted" style={{ fontSize: 30 }}>{sub}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Scene>

      {/* 5 — Trigger */}
      <Scene t={t} index={4}>
        <div style={e(41.3, { y: 12 })}>
          <StepStrip t={t} active={0} small />
        </div>
        <div className="kit-h2" style={{ marginTop: 50, ...e(41.36, { dur: 0.9, y: 30 }) }}>
          A trigger is <span className="kit-mark" style={mk(42.2)}>any event that starts the workflow.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 70 }}>
          <ItemCard icon={<Icon name="mail" />} text="An email arrives" style={e(45.28)} />
          <ItemCard icon={<Icon name="form" />} text="A form is submitted" style={e(46.56)} />
          <ItemCard icon={<FolderIcon size={44} open />} text="A folder is updated" style={e(48.08)} />
          <ItemCard icon={<Icon name="clock" />} text="A certain time" style={e(50.4)} />
        </div>
      </Scene>

      {/* 6 — Decision */}
      <Scene t={t} index={5}>
        <div style={e(52.5, { y: 12 })}>
          <StepStrip t={t} active={1} small />
        </div>
        <div className="kit-h2" style={{ marginTop: 50, fontSize: 64, ...e(52.6, { dur: 0.9, y: 30 }) }}>
          AI does what you’d otherwise <span className="kit-mark" style={mk(57.2)}>prompt it to do manually.</span>
        </div>
        <div className="kit-row" style={{ gap: 50, marginTop: 60 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22, width: 1080 }}>
            <ItemCard icon={<Icon name="mail" />} text="Emails" style={e(60.56)} />
            <ItemCard icon={<FileIcon size={40} accent />} text="Meeting notes" style={e(61.52)} />
            <ItemCard icon={<Icon name="form" />} text="Long documents" style={e(62.72)} />
            <ItemCard icon={<span className="kit-ui" style={{ fontSize: 40, color: GREEN, fontWeight: 700 }}>…</span>} text="Anything else" style={e(63.76)} />
          </div>
          <Arrow t={t} at={59.6} w={130} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, ...e(52.88, { scale: 0.8 }) }}>
            <AiNode size={170} pulse={(t * 0.8) % 1} />
            <div className="kit-ui" style={{ fontSize: 28, fontWeight: 600, color: MUTED }}>Makes sense of it</div>
          </div>
        </div>
      </Scene>

      {/* 7 — Action */}
      <Scene t={t} index={6}>
        <div style={e(65.7, { y: 12 })}>
          <StepStrip t={t} active={2} small />
        </div>
        <div className="kit-h2" style={{ marginTop: 50, ...e(65.8, { dur: 0.9, y: 30 }) }}>
          Finally, the workflow <span className="kit-mark" style={mk(67.8)}>takes an action.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 70 }}>
          {(
            [
              ['chat', 'Send a message', 69.84],
              ['task', 'Create a task', 71.08],
              ['table', 'Update a tracker', 72.36],
              ['doc', 'Generate a proposal', 73.76],
            ] as const
          ).map(([ic, txt, at]) => (
            <ItemCard
              key={txt}
              icon={ic === 'doc' ? <FileIcon size={40} accent /> : <Icon name={ic} />}
              text={txt}
              style={e(at)}
              done={prog(t, at + 0.6, 0.35)}
            />
          ))}
        </div>
      </Scene>

      {/* 8 — No coding */}
      <Scene t={t} index={7}>
        <div className="kit-label" style={e(76.3, { y: 14 })}>The good news</div>
        <div className="kit-h2" style={e(76.4, { dur: 0.9, y: 30 })}>
          You can do all of this <span className="kit-mark" style={mk(78.48)}>without coding.</span>
        </div>
        <div className="kit-row" style={{ gap: 40, marginTop: 80, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, ...e(81.32) }}>
            <span className="kit-tag" style={{ alignSelf: 'flex-start' }}>Plain language</span>
            <Composer
              w={960}
              text={typed(t, 82.2, 'Every Monday morning, summarize competitor news and send it to my team.', 1.9)}
              caret={t < 84.3}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, ...e(83.92) }}>
            <span className="kit-tag" style={{ alignSelf: 'flex-start' }}>Light configuration</span>
            <div className="kit-card kit-ui" style={{ width: 620, padding: '14px 30px', boxShadow: '0 10px 30px rgba(0,0,0,.06)' }}>
              {[
                ['Runs every Monday, 8:00', 84.3],
                ['Sends to team channel', 84.8],
              ].map(([label, at], i) => (
                <div key={label as string} className="kit-row" style={{ justifyContent: 'space-between', padding: '16px 0', borderTop: i ? `2px solid ${LINE}` : 'none', fontSize: 28 }}>
                  {label}
                  <Switch on={prog(t, at as number, 0.3, IN_OUT)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 9 — Use case: briefings */}
      <Scene t={t} index={8}>
        <div className="kit-label" style={e(86.24, { y: 14 })}>Use case 1</div>
        <div className="kit-h2" style={e(88.76, { dur: 0.9, y: 30 })}>
          <span className="kit-mark" style={mk(89.36)}>Daily or weekly</span> briefings
        </div>
        <div className="kit-row" style={{ gap: 60, marginTop: 60, alignItems: 'flex-start' }}>
          <div className="kit-card" style={{ width: 1080, padding: '34px 42px', boxShadow: '0 12px 36px rgba(0,0,0,.06)', ...e(91.68) }}>
            <div className="kit-row" style={{ gap: 18, marginBottom: 26 }}>
              <FileIcon size={44} accent />
              <div className="kit-ui" style={{ fontSize: 32, fontWeight: 700 }}>Your weekly digest</div>
            </div>
            {[
              ['Competitor developments', 92.72],
              ['Account intelligence', 94.12],
              ['Internal project updates', 95.44],
            ].map(([h, at], i) => (
              <div key={h as string} style={{ padding: '18px 0', borderTop: `2px solid ${LINE}`, ...e(at as number, { y: 14 }) }}>
                <div className="kit-ui" style={{ fontSize: 28, fontWeight: 600, marginBottom: 14 }}>{h}</div>
                <Lines p={prog(t, (at as number) + 0.1, 0.9)} widths={[88, 64]} h={12} gap={10} />
              </div>
            ))}
          </div>
          <div style={{ width: 560, paddingTop: 40, ...e(97.12) }}>
            <div className="kit-h3" style={{ fontSize: 48 }}>
              Without <span className="kit-mark" style={mk(97.5)}>chasing them down</span> yourself.
            </div>
          </div>
        </div>
      </Scene>

      {/* 10 — Use case: meeting follow-through */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={e(100.0, { y: 14 })}>Use case 2</div>
        <div className="kit-h2" style={e(100.4, { dur: 0.9, y: 30 })}>
          Meeting <span className="kit-mark" style={mk(101.28)}>follow-through</span>
        </div>
        <div className="kit-row" style={{ gap: 40, marginTop: 70, alignItems: 'center' }}>
          <div className="kit-card" style={{ width: 440, padding: '32px 36px', ...e(102.88) }}>
            <div className="kit-row" style={{ gap: 16, marginBottom: 24 }}>
              <FileIcon size={44} accent />
              <div className="kit-ui" style={{ fontSize: 30, fontWeight: 700 }}>Meeting notes</div>
            </div>
            <Lines p={prog(t, 102.9, 0.8)} widths={[90, 74, 84, 60, 80, 50]} h={12} gap={14} />
          </div>
          <Arrow t={t} at={103.3} w={110} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <div className="kit-card kit-ui" style={{ width: 640, padding: '24px 32px', ...e(103.76) }}>
              <div style={{ fontSize: 26, fontWeight: 700, color: MUTED, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 10 }}>Action items</div>
              {['Send revised pricing', 'Book follow-up review', 'Update the project plan'].map((it, i) => (
                <div key={it} className="kit-row" style={{ gap: 16, padding: '8px 0', fontSize: 28 }}>
                  <div style={{ opacity: prog(t, 104.0 + i * 0.3, 0.3) }}>
                    <Check size={32} />
                  </div>
                  {it}
                </div>
              ))}
            </div>
            <div className="kit-row" style={{ gap: 18 }}>
              {['Leadership', 'Team', 'Client'].map((s, i) => (
                <div key={s} className="kit-card kit-row kit-ui" style={{ gap: 12, padding: '16px 22px', fontSize: 26, fontWeight: 600, ...e(105.2 + i * 0.3) }}>
                  <Icon name="person" size={30} />
                  {s} briefing
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 11 — Use case: approval workflows */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={e(107.92, { y: 14 })}>Use case 3</div>
        <div className="kit-h2" style={e(108.4, { dur: 0.9, y: 30 })}>
          Approval <span className="kit-mark" style={mk(109.36)}>workflows</span>
        </div>
        <div className="kit-row" style={{ gap: 40, marginTop: 70 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <ItemCard w={560} icon={<span className="kit-ui" style={{ fontSize: 36, fontWeight: 700, color: GREEN }}>%</span>} text="Discount" style={e(111.12)} />
            <ItemCard w={560} icon={<span className="kit-ui" style={{ fontSize: 36, fontWeight: 700, color: GREEN }}>$</span>} text="Budget request" style={e(112.08)} />
            <ItemCard w={560} icon={<Icon name="form" />} text="Policy exception" style={e(113.28)} />
          </div>
          <Arrow t={t} at={114.5} w={150} />
          <div className="kit-card" style={{ width: 600, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 24, borderColor: GREEN, ...e(115.36) }}>
            <div className="kit-row" style={{ gap: 22 }}>
              <IconBox size={88}>
                <Icon name="person" size={52} />
              </IconBox>
              <div className="kit-ui" style={{ fontSize: 38, fontWeight: 600 }}>The right approver</div>
            </div>
            <div className="kit-row kit-ui" style={{ gap: 14, fontSize: 28, color: GREEN, fontWeight: 600, ...e(117.04, { y: 10 }) }}>
              <Icon name="clip" size={34} />
              With the context they need
            </div>
          </div>
        </div>
      </Scene>

      {/* 12 — Guardrails */}
      <Scene t={t} index={11}>
        <div className="kit-label" style={e(119.3, { y: 14 })}>Guardrails</div>
        <div className="kit-h2" style={e(119.4, { dur: 0.9, y: 30 })}>
          AI shouldn’t run <span className="kit-mark" style={mk(121.68)}>without oversight.</span>
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 50, maxWidth: 1500, ...e(125.68) }}>
          You decide what AI can do <span className="kit-mark" style={mk(127.88)}>on its own</span>, and where it needs a{' '}
          <span className="kit-mark" style={mk(129.68)}>human check.</span>
        </p>
        <div
          className="kit-pill"
          style={{ marginTop: 80, alignSelf: 'flex-start', fontSize: 52, padding: '28px 50px', gap: 22, borderColor: GREEN, background: LIME_SOFT, fontFamily: 'IBM Plex Serif', fontWeight: 400, ...e(131.84, { scale: 0.9 }) }}
        >
          <Icon name="loop" size={56} />
          Human-in-the-loop
        </div>
      </Scene>

      {/* 13 — Low vs higher risk */}
      <Scene t={t} index={12}>
        <div className="kit-label" style={e(134.0, { y: 14 })}>Match the check to the risk</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 10 }}>
          {(
            [
              {
                tag: 'Low risk',
                at: 134.56,
                items: [
                  ['Summarizing', 136.0],
                  ['Drafting', 137.2],
                  ['Routing', 138.12],
                ],
                endAt: 138.64,
              },
              {
                tag: 'Higher risk',
                at: 140.56,
                items: [
                  ['Sending external messages', 142.4],
                  ['Changing customer terms', 144.16],
                  ['Approving spending', 145.36],
                ],
                endAt: 147.68,
              },
            ] as const
          ).map((lane, li) => (
            <div key={lane.tag} className="kit-card" style={{ padding: '34px 38px', display: 'flex', flexDirection: 'column', gap: 18, ...e(lane.at) }}>
              <span className="kit-tag" style={{ alignSelf: 'flex-start', fontSize: 22, background: li ? '#FBE3D6' : LIME_SOFT }}>{lane.tag}</span>
              {lane.items.map(([txt, at]) => (
                <div key={txt} className="kit-ui" style={{ fontSize: 36, padding: '8px 0', borderBottom: `2px solid ${LINE}`, ...e(at, { y: 12 }) }}>
                  {txt}
                </div>
              ))}
              {li === 0 ? (
                <div className="kit-row kit-ui" style={{ gap: 16, marginTop: 14, fontSize: 34, fontWeight: 600, ...e(lane.endAt) }}>
                  <Check size={44} />
                  Runs end to end
                </div>
              ) : (
                <div className="kit-row kit-ui" style={{ gap: 16, marginTop: 14, fontSize: 34, fontWeight: 600, ...e(lane.endAt) }}>
                  <IconBox size={50}>
                    <Icon name="person" size={32} />
                  </IconBox>
                  Approval step
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
                    <span className="kit-pill" style={{ fontSize: 22, padding: '8px 20px', background: LIME, borderColor: LIME, color: '#fff' }}>Approve</span>
                    <span className="kit-pill" style={{ fontSize: 22, padding: '8px 20px' }}>Reject</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Scene>

      {/* 14 — Visibility */}
      <Scene t={t} index={13}>
        <div className="kit-label" style={e(149.5, { y: 14 })}>Visibility</div>
        <div className="kit-h2" style={e(151.68, { dur: 0.9, y: 30 })}>
          Keep a <span className="kit-mark" style={mk(152.24)}>simple log.</span>
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 50, padding: '10px 36px', boxShadow: '0 12px 36px rgba(0,0,0,.06)', ...e(151.84) }}>
          {(() => {
            const cols: [string, number][] = [
              ['What ran', 152.84],
              ['What AI decided', 153.68],
              ['What it changed', 155.08],
            ];
            const rows = [
              ['Weekly digest', 'Flagged 3 competitor moves', 'Posted to team channel'],
              ['Meeting follow-up', 'Found 5 action items', 'Created 5 tasks'],
              ['Discount request', 'Routed to sales lead', 'Waiting for approval'],
            ];
            const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1.3fr 1.2fr', gap: 30 };
            return (
              <>
                <div style={{ ...grid, padding: '20px 0', borderBottom: `2px solid ${LINE}` }}>
                  {cols.map(([c, at]) => (
                    <div key={c} style={{ fontSize: 24, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: GREEN, ...e(at, { y: 10 }) }}>
                      {c}
                    </div>
                  ))}
                </div>
                {rows.map((r, ri) => (
                  <div key={r[0]} style={{ ...grid, padding: '22px 0', borderBottom: ri < 2 ? `2px solid ${LINE}` : 'none' }}>
                    {r.map((cell, ci) => (
                      <div key={cell} style={{ fontSize: 30, ...e(cols[ci][1] + 0.15 + ri * 0.2, { y: 10 }) }}>
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </>
            );
          })()}
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 50, ...e(157.6) }}>
          So you can <span className="kit-mark" style={mk(157.92)}>audit and improve it over time.</span>
        </p>
      </Scene>

      {/* 15 — Close */}
      <Scene t={t} index={14} padStyle={{ opacity: fadeOut }}>
        <div className="kit-label" style={e(160.5, { y: 14 })}>Advance as an AI leader</div>
        <div className="kit-row" style={{ gap: 40 }}>
          <div className="kit-card" style={{ width: 700, padding: '34px 40px', opacity: 1 - 0.55 * prog(t, 166.6, 0.8), ...e(163.68) }}>
            <div className="kit-h3" style={{ fontSize: 48, marginBottom: 12 }}>Reactive AI</div>
            <div className="kit-body kit-muted" style={{ fontSize: 30 }}>Only answers questions</div>
          </div>
          <Arrow t={t} at={166.6} w={150} />
          <div className="kit-card" style={{ width: 760, padding: '34px 40px', borderColor: GREEN, background: '#FAFDF6', ...e(167.0, { scale: 0.92 }) }}>
            <div className="kit-h3" style={{ fontSize: 48, marginBottom: 12 }}>Proactive AI</div>
            <div className="kit-body" style={{ fontSize: 30 }}>
              Runs in the background, <span className="kit-mark" style={mk(170.08)}>on rules you define</span>
            </div>
          </div>
        </div>
        <div className="kit-h1" style={{ marginTop: 90, fontSize: 88, ...e(172.0, { dur: 0.9, y: 30 }) }}>
          This is where the <span className="kit-mark" style={mk(172.8)}>real ROI on AI</span> starts.
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (a browser preview plays it outside the player).
export const AiAutomation: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence from={AI_AUTOMATION_TITLE_FRAMES}>
      <AiAutomationBody audioSrc={audioSrc} />
    </Sequence>
    {/* zIndex lifts the card above the body scenes, which stack with z-index 1–60 */}
    <Sequence durationInFrames={AI_AUTOMATION_TITLE_FRAMES} style={{ zIndex: 100 }}>
      <TitleCardGreen title="Getting Started with AI Automation" />
    </Sequence>
  </AbsoluteFill>
);
