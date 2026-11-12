import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  AppWindow,
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
  Spark,
  Toggle,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// Claude Gmail Integration — custom screenshot demo (Lead with AI), built with src/kit.
// VO: audio/ClaudeGmail.mp3 (Daan, ElevenLabs v4, take B, 239.7s). Every cue is a VO second taken from the
// Scribe word timestamps in src/data/ClaudeGmail.transcript.json. A 90-frame green title card opens the
// video; the VO and every scene start after it.
// Screenshots: claude-gmail/images/*.jpg, 1920x958 (14 is a redacted copy: client deal details blurred).
//
//  #  scene                           start   VO cue
//  0  Email is threads                0.00    "Work email is rarely one isolated message."
//  1  What Claude can do              8.50    "With Claude's Gmail integration…"
//  2  Customize > Connectors   (02)   24.40   "First, let's connect Gmail."
//  3  Gmail > Connect          (03)   31.80   "…and choose Connect."
//  4  Google account           (05)   33.60   "I select my Google account"
//  5  Review access            (06)   35.30   "review the permissions"
//  6  Connected                (07)   37.90   "On a Team or Enterprise plan…"
//  7  + > Connectors > Gmail   (09)   43.60   "Then, in the prompt box…"
//  8  Used automatically              51.70   "Now Claude uses Gmail whenever…"
//  9  Task 1 intro                    58.40   "Let's start with a common task"
// 10  Prompt 1                        63.45   "I ask Claude to find Jen's email…"
// 11  Ask for both             (11)   83.60   "Notice I ask explicitly…"
// 12  Summary + risks          (11)   92.70   "Claude searches Gmail and returns…"
// 13  Draft + source link      (12)   98.20   "a draft reply, and a link…"
// 14  Original in Gmail        (13)   102.90  "opens the original message in Gmail."
// 15  Review the draft         (12)   105.30  "Before I use the reply…"
// 16  Ready to send?                  118.40  "When I'm happy…"
// 17  Manual vs Auto           (08)   128.30  "In Manual mode…"
// 18  Check your mode          (10)   136.85  "So check your mode…"
// 19  Task 2 intro                    139.90  "Now let's move beyond one email."
// 20  Prompt 2                        147.70  "I ask it to check today's emails…"
// 21  Structured summary       (14)   161.05  "Claude returns a structured summary…"
// 22  Summarize vs organize           172.05  "Claude can also apply labels…"
// 23  Where + what                    185.55  "A few practical notes."
// 24  Attachments + big inboxes       199.95  "It can see attachment names…"
// 25  Privacy                         207.80  "On privacy…"
// 26  Takeaway                        225.95  "The key takeaway…"

export const CLAUDE_GMAIL_DURATION_S = 241.0;
export const CLAUDE_GMAIL_TITLE_FRAMES = 90;

const STARTS = [
  0, 8.5, 24.4, 31.8, 33.6, 35.3, 37.9, 43.6, 51.7, 58.4, 63.45, 83.6, 92.7, 98.2, 102.9, 105.3, 118.4, 128.3,
  136.85, 139.9, 147.7, 161.05, 172.05, 185.55, 199.95, 207.8, 225.95,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_W = 1920;
const IMG_H = 958;

// Browser previews can inject screenshots (data URIs) via globalThis.CLAUDE_GMAIL_SHOTS; renders use public/.
const shot = (n: string): string =>
  (globalThis as { CLAUDE_GMAIL_SHOTS?: Record<string, string> }).CLAUDE_GMAIL_SHOTS?.[n] ??
  staticFile(`claude-gmail/images/${n}.jpg`);

// ── Small pieces ────────────────────────────────────────────────────────────
const Mail: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = GREEN }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" fill="#fff" stroke={color} strokeWidth="1.6" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);
const Lock: React.FC<{ size?: number }> = ({ size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <rect x="4.5" y="10.5" width="15" height="11" rx="2.5" fill={INK} />
    <path d="M8 10.5V7.5a4 4 0 018 0v3" fill="none" stroke={INK} strokeWidth="2.2" />
  </svg>
);
const LinkOut: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// A prompt box whose phrases get a lime marker on the VO word that names them.
type Seg = { s: string; at?: number };
const PromptCard: React.FC<{ t: number; at: number; segs: Seg[]; w?: number; size?: number }> = ({ t, at, segs, w = 1500, size = 40 }) => (
  <div
    className="kit-card kit-ui"
    style={{ width: w, padding: '40px 46px 28px', borderRadius: 28, boxShadow: '0 24px 60px rgba(20,40,10,.10)', ...enter(t, at, { y: 30, dur: 0.6 }) }}
  >
    <div style={{ fontSize: size, lineHeight: 1.5, color: INK }}>
      {segs.map((g, i) =>
        g.at === undefined ? (
          <span key={i}>{g.s}</span>
        ) : (
          <span key={i} className="kit-mark" style={markStyle(t, g.at)}>
            {g.s}
          </span>
        ),
      )}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 26 }}>
      <div style={{ width: 46, height: 46, borderRadius: 12, border: `2px solid ${LINE}`, display: 'grid', placeItems: 'center', fontSize: 32, color: MUTED, lineHeight: 1 }}>+</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <span style={{ fontSize: 22, color: MUTED }}>Manual</span>
        <div style={{ width: 46, height: 46, borderRadius: 12, background: '#D97757', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 26 }}>↑</div>
      </div>
    </div>
  </div>
);

const Chip: React.FC<{ t: number; at: number; children: React.ReactNode; style?: React.CSSProperties; on?: boolean }> = ({ t, at, children, style, on }) => (
  <div style={enter(t, at, { y: 0, scale: 0.7, dur: 0.5, easing: BACK })}>
    <div className="kit-pill" style={{ ...(on ? { background: LIME_SOFT, borderColor: GREEN } : {}), ...style }}>
      {children}
    </div>
  </div>
);

// Generic email row for concept scenes
const MailRow: React.FC<{ from: string; subj: string; date?: string; style?: React.CSSProperties; children?: React.ReactNode }> = ({ from, subj, date, style, children }) => (
  <div className="kit-card kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 24px', borderRadius: 16, boxShadow: '0 8px 24px rgba(0,0,0,.06)', ...style }}>
    <Mail size={34} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 20, color: MUTED }}>{from}</div>
      <div style={{ fontSize: 26, fontWeight: 600, whiteSpace: 'nowrap' }}>{subj}</div>
    </div>
    {children}
    {date && <div style={{ fontSize: 20, color: MUTED, flex: 'none' }}>{date}</div>}
  </div>
);

const Item: React.FC<{ t: number; at: number; children: React.ReactNode; size?: number }> = ({ t, at, children, size = 34 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 18, ...enter(t, at, { x: -24, y: 0, dur: 0.5 }) }}>
    <div style={enter(t, at + 0.15, { y: 0, scale: 0.4, dur: 0.45, easing: BACK })}>
      <Check size={size} />
    </div>
    <span className="kit-ui" style={{ fontSize: size * 0.9 }}>{children}</span>
  </div>
);

const Eyebrow: React.FC<{ t: number; at: number; children: React.ReactNode }> = ({ t, at, children }) => (
  <div className="kit-label" style={enter(t, at, { y: 14 })}>{children}</div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const ClaudeGmailBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/ClaudeGmail.mp3')} />}

      {/* 0 — Email is threads, not messages */}
      <Scene t={t} index={0}>
        <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 0.1, { dur: 0.9, y: 30 }) }}>
          Work email is rarely <span className="kit-mark" style={markStyle(t, 1.5)}>one message.</span>
        </div>
        <div style={{ position: 'relative', height: 470, marginTop: 50 }}>
          {/* timeline */}
          <div style={{ position: 'absolute', left: 0, right: 0, top: 236, height: 4, background: LINE, transformOrigin: '0 50%', transform: `scaleX(${prog(t, 3.6, 1.2, IN_OUT)})` }} />
          {[
            { x: 0, y: 40, from: 'Client', subj: 'Kickoff questions', date: 'Mar 3', at: 3.96 },
            { x: 420, y: 290, from: 'You', subj: 'Re: Kickoff questions', date: 'Mar 4', at: 4.3 },
            { x: 760, y: 20, from: 'Client', subj: 'Following up', date: 'Mar 18', at: 4.6 },
            { x: 1120, y: 300, from: 'Colleague', subj: 'Fwd: Budget context', date: 'Apr 2', at: 5.44 },
          ].map((m, i) => {
            const drift = prog(t, 6.16, 1.2, IN_OUT);
            const dx = (i - 1.5) * 26 * drift;
            const dy = (i % 2 ? 1 : -1) * 22 * drift;
            const rot = (i % 2 ? 1.6 : -1.6) * drift;
            return (
              <div key={i} style={{ position: 'absolute', left: m.x, top: m.y, width: 520, ...enter(t, m.at, { y: 20, scale: 0.9, easing: BACK, dur: 0.55 }) }}>
                <div style={{ transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)` }}>
                  <MailRow from={m.from} subj={m.subj} date={m.date} />
                </div>
              </div>
            );
          })}
          <div className="kit-ui" style={{ position: 'absolute', left: 0, top: 420, display: 'flex', gap: 28, fontSize: 28, color: MUTED }}>
            <span style={enter(t, 3.96, { y: 10 })}>Threads</span>
            <span style={enter(t, 4.48, { y: 10 })}>· Follow-ups</span>
            <span style={enter(t, 5.44, { y: 10 })}>· Context scattered across weeks</span>
          </div>
        </div>
      </Scene>

      {/* 1 — What Claude can do with Gmail */}
      <Scene t={t} index={1}>
        <Eyebrow t={t} at={8.6}>Claude + Gmail</Eyebrow>
        <div className="kit-h2" style={enter(t, 8.8, { dur: 0.8, y: 28 })}>
          Work with your inbox <span className="kit-mark" style={markStyle(t, 16.7)}>without switching apps.</span>
        </div>
        <div style={{ display: 'flex', gap: 60, marginTop: 70, alignItems: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: 880 }}>
            {[
              ['Search the history', 10.8],
              ['Summarize conversations', 12.08],
              ['Draft replies', 13.84],
              ['Organize your inbox', 15.2],
            ].map(([s, at]) => (
              <Chip key={s as string} t={t} at={at as number} style={{ width: '100%', justifyContent: 'flex-start', fontSize: 32, padding: '22px 30px' }}>
                <Check size={30} /> {s as string}
              </Chip>
            ))}
          </div>
          <div style={{ flex: 1, ...enter(t, 18.7, { x: 40, y: 0 }) }}>
            <div className="kit-card kit-ui" style={{ padding: '30px 34px', borderColor: GREEN }}>
              <div style={{ fontSize: 22, color: MUTED, letterSpacing: '.1em', fontWeight: 600 }}>SOURCE</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10, fontSize: 32, color: '#1F5FBF', textDecoration: 'underline', fontWeight: 600 }}>
                Original email <LinkOut size={28} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, fontSize: 28, ...enter(t, 22.0, { y: 10 }) }}>
                <Check size={30} /> Verify before you act
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 2 — Customize > Connectors */}
      <Scene t={t} index={2} pad={false}>
        <AppWindow
          t={t} start={24.4} src={shot('02-customize-connectors')} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 24.6, x: 700, y: 300, s: 1.35 }, { at: 30.3, x: 1150, y: 560, s: 1.6 }]}
          cursor={[{ at: 25.0, x: 500, y: 600 }, { at: 27.1, x: 90, y: 270, click: true }, { at: 28.5, x: 745, y: 104, click: true }, { at: 30.4, x: 1300, y: 560 }]}
          rings={[{ at: 28.0, until: 29.6, x: 12, y: 256, w: 252, h: 28 }, { at: 29.4, until: 30.6, x: 676, y: 89, w: 96, h: 26 }, { at: 31.0, x: 1103, y: 522, w: 470, h: 84, spot: true }]}
          steps={[{ at: 27.9, text: 'Customize' }, { at: 29.3, text: 'Connectors' }, { at: 31.0, text: 'Find Gmail' }]}
        />
      </Scene>

      {/* 3 — Gmail > Connect to Claude */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          t={t} start={31.8} src={shot('03-gmail-tools-and-connect')} imgW={IMG_W} imgH={IMG_H} stepOffset={3}
          cam={[{ at: 31.8, x: 1040, y: 230, s: 1.5, dur: 0.01 }]}
          cursor={[{ at: 31.8, x: 1100, y: 300 }, { at: 31.9, x: 1380, y: 158, click: true, dur: 0.5 }]}
          rings={[{ at: 32.1, x: 1287, y: 133, w: 165, h: 40, spot: true }]}
          steps={[{ at: 32.0, text: 'Connect to Claude' }]}
        />
      </Scene>

      {/* 4 — Choose the Google account */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t} start={33.6} src={shot('05-google-sign-in')} imgW={IMG_W} imgH={IMG_H} title="accounts.google.com" stepOffset={4}
          cam={[{ at: 33.6, x: 960, y: 450, s: 1.3, dur: 0.01 }, { at: 33.9, x: 700, y: 470, s: 1.7 }]}
          rings={[{ at: 34.3, x: 476, y: 512, w: 190, h: 32, spot: true }]}
          steps={[{ at: 34.3, text: 'Select your Google account' }]}
        />
      </Scene>

      {/* 5 — Review access, then Continue */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t} start={35.3} src={shot('06-google-access-review')} imgW={IMG_W} imgH={IMG_H} title="accounts.google.com" stepOffset={5}
          cam={[{ at: 35.3, x: 1200, y: 320, s: 1.75, dur: 0.01 }, { at: 36.6, x: 1210, y: 560, s: 1.5, dur: 0.8 }]}
          cursor={[{ at: 35.6, x: 1250, y: 470 }, { at: 36.4, x: 1330, y: 712, click: true }]}
          rings={[{ at: 35.75, until: 36.9, x: 984, y: 300, w: 400, h: 48, spot: true }, { at: 37.2, x: 1220, y: 690, w: 224, h: 40 }]}
          steps={[{ at: 35.7, text: 'Review the requested access' }, { at: 36.7, text: 'Continue to authorize' }]}
        />
      </Scene>

      {/* 6 — Connected (+ Team / Enterprise note) */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t} start={37.9} src={shot('07-gmail-connected')} imgW={IMG_W} imgH={IMG_H} stepOffset={7}
          cam={[{ at: 37.9, x: 1040, y: 230, s: 1.5, dur: 0.01 }]}
          rings={[{ at: 38.1, x: 1287, y: 140, w: 115, h: 27, spot: true }]}
          steps={[{ at: 38.1, text: 'Connected' }]}
        />
        <div style={{ position: 'absolute', right: 120, top: 520, width: 640, zIndex: 5, ...enter(t, 38.72, { x: 40, y: 0, dur: 0.6 }) }}>
          <div className="kit-card kit-ui" style={{ padding: '28px 32px', boxShadow: '0 24px 60px rgba(20,40,10,.18)', borderColor: GREEN }}>
            <div className="kit-tag">Team + Enterprise plans</div>
            <div style={{ fontSize: 32, marginTop: 16, lineHeight: 1.35 }}>
              Your organization may need to <span className="kit-mark" style={markStyle(t, 41.9)}>enable the connector</span> first.
            </div>
          </div>
        </div>
      </Scene>

      {/* 7 — + > Connectors > Gmail on */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t} start={43.6} src={shot('09-gmail-toggle-enabled')} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 43.6, x: 1000, y: 520, s: 1.25, dur: 0.01 }, { at: 47.6, x: 1010, y: 520, s: 1.75, dur: 1.2 }]}
          cursor={[{ at: 44.0, x: 1100, y: 760 }, { at: 45.9, x: 800, y: 522, click: true }, { at: 47.2, x: 870, y: 625, click: true }, { at: 48.9, x: 1225, y: 536 }]}
          rings={[{ at: 45.2, until: 47.4, x: 780, y: 502, w: 30, h: 30 }, { at: 47.92, until: 49.6, x: 788, y: 606, w: 216, h: 28 }, { at: 49.68, x: 1022, y: 518, w: 232, h: 26, spot: true }]}
          steps={[{ at: 45.0, text: 'Prompt box: +' }, { at: 47.92, text: 'Connectors' }, { at: 49.68, text: 'Gmail toggled on' }]}
        />
      </Scene>

      {/* 8 — Claude uses it when relevant */}
      <Scene t={t} index={8}>
        <Eyebrow t={t} at={51.8}>No need to name the connector</Eyebrow>
        <div className="kit-h2" style={enter(t, 52.0, { dur: 0.8, y: 28 })}>
          Claude uses Gmail <span className="kit-mark" style={markStyle(t, 54.4)}>when your request needs it.</span>
        </div>
        <div style={{ marginTop: 70, display: 'flex', flexDirection: 'column', gap: 26, width: 1100 }}>
          <div className="kit-card kit-ui" style={{ alignSelf: 'flex-end', background: '#F4F4F0', borderColor: '#F4F4F0', padding: '22px 30px', fontSize: 32, ...enter(t, 52.4, { y: 20 }) }}>
            {typed(t, 52.6, 'What did Chris ask about the AI Fluency Matrix?', 1.1)}
          </div>
          <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, color: MUTED, ...enter(t, 53.3, { x: -20, y: 0 }) }}>
            <Spark size={34} /> Used Gmail ›
          </div>
          <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, ...enter(t, 56.3, { y: 12 }) }}>
            <Cross size={30} /> <span style={{ textDecoration: 'line-through', color: MUTED }}>"Use the Gmail connector to…"</span>
          </div>
        </div>
      </Scene>

      {/* 9 — Task 1 */}
      <Scene t={t} index={9}>
        <Eyebrow t={t} at={58.5}>Task 1 · Summarize and draft</Eyebrow>
        <div className="kit-h1" style={enter(t, 58.7, { dur: 0.9, y: 34 })}>
          Reply to an email that <span className="kit-mark" style={markStyle(t, 61.6)}>needs some thought.</span>
        </div>
      </Scene>

      {/* 10 — The prompt */}
      <Scene t={t} index={10}>
        <Eyebrow t={t} at={63.5}>The prompt</Eyebrow>
        <PromptCard
          t={t} at={63.6} size={38}
          segs={[
            { s: 'Find ' },
            { s: "Jen's email about the AI Fluency Matrix", at: 64.8 },
            { s: '. Include the ' },
            { s: 'sender, subject, date', at: 67.9 },
            { s: ', and a ' },
            { s: 'clickable Gmail source link', at: 70.4 },
            { s: '. ' },
            { s: 'Summarize what they’re asking for in one sentence', at: 72.08 },
            { s: ' and ' },
            { s: 'flag any risks or unclear points', at: 74.4 },
            { s: '. Then ' },
            { s: 'draft a reply', at: 75.92 },
            { s: ' in a ' },
            { s: 'direct, calm, specific tone, under 120 words', at: 76.5 },
            { s: '. ' },
            { s: 'Don’t invent details or commitments', at: 81.12 },
            { s: '. Show the draft here for review; ' },
            { s: 'don’t send it', at: 82.64 },
            { s: ' or save a draft in Gmail.' },
          ]}
        />
      </Scene>

      {/* 11 — Ask for both */}
      <Scene t={t} index={11} pad={false}>
        <div style={{ position: 'absolute', left: 80, top: 0, bottom: 150, width: 640, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow t={t} at={84.4}>Be explicit</Eyebrow>
          <div className="kit-h2" style={{ fontSize: 64, ...enter(t, 84.5, { dur: 0.8, y: 26 }) }}>Ask for both.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 44 }}>
            <Item t={t} at={86.64}>A draft reply</Item>
            <Item t={t} at={87.68}>A source link</Item>
          </div>
          <p className="kit-body kit-muted" style={{ fontSize: 30, marginTop: 44, ...enter(t, 88.72, { y: 12 }) }}>
            A summary-only prompt didn’t reliably return either:
          </p>
          <div style={{ display: 'flex', gap: 18, marginTop: 20 }}>
            <Chip t={t} at={90.4}><Cross size={28} /> No draft</Chip>
            <Chip t={t} at={90.8}><Cross size={28} /> No link</Chip>
          </div>
        </div>
        <AppWindow
          t={t} start={88.72} src={shot('11-original-response-no-draft')} numbered={false} imgW={IMG_W} imgH={IMG_H} left={780} top={150} width={1060}
          cam={[{ at: 88.72, x: 1070, y: 400, s: 1.75, dur: 0.01 }]}
          steps={[{ at: 89.68, text: 'Summary-only prompt' }]}
        />
      </Scene>

      {/* 12 — Summary + risks */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          t={t} start={92.7} src={shot('11-original-response-no-draft')} numbered={false} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 92.7, x: 1070, y: 420, s: 1.6, dur: 0.01 }]}
          rings={[{ at: 93.6, until: 94.8, x: 732, y: 208, w: 100, h: 20 }, { at: 94.88, until: 96.3, x: 760, y: 425, w: 655, h: 42 }, { at: 96.4, x: 732, y: 488, w: 560, h: 80, spot: true }]}
          steps={[{ at: 93.6, text: 'Claude searches Gmail' }, { at: 94.88, text: 'One-sentence summary' }, { at: 96.4, text: 'Risks and unclear points' }]}
        />
      </Scene>

      {/* 13 — Draft reply + source link */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          t={t} start={98.2} src={shot('12-corrected-prompt-draft-source')} numbered={false} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 98.2, x: 1075, y: 520, s: 1.3, dur: 0.01 }, { at: 99.6, x: 1000, y: 330, s: 1.7 }]}
          cursor={[{ at: 100.4, x: 1150, y: 420 }, { at: 101.3, x: 905, y: 252, click: true }]}
          rings={[{ at: 98.4, until: 99.7, x: 736, y: 362, w: 690, h: 400 }, { at: 99.92, x: 733, y: 236, w: 282, h: 26, spot: true }]}
          steps={[{ at: 98.4, text: 'Draft reply' }, { at: 99.92, text: 'Source link' }]}
        />
      </Scene>

      {/* 14 — Opens the original in Gmail */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          t={t} start={102.9} src={shot('13-gmail-original-source')} numbered={false} imgW={IMG_W} imgH={IMG_H} title="mail.google.com"
          cam={[{ at: 102.9, x: 900, y: 300, s: 1.35, dur: 0.01 }, { at: 103.4, x: 760, y: 200, s: 1.7 }]}
          rings={[{ at: 103.5, x: 350, y: 116, w: 660, h: 82, spot: true }]}
          steps={[{ at: 103.5, text: 'The original message in Gmail' }]}
        />
      </Scene>

      {/* 15 — Review before you use it */}
      <Scene t={t} index={15} pad={false}>
        <div style={{ position: 'absolute', left: 80, top: 0, bottom: 150, width: 600, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Eyebrow t={t} at={105.4}>Before you use it</Eyebrow>
          <div className="kit-h2" style={{ fontSize: 60, ...enter(t, 105.5, { dur: 0.8, y: 26 }) }}>Review the draft.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 40 }}>
            <Item t={t} at={107.16} size={32}>Original message</Item>
            <Item t={t} at={110.0} size={32}>Facts</Item>
            <Item t={t} at={110.8} size={32}>Commitments</Item>
            <Item t={t} at={111.88} size={32}>Placeholders</Item>
            <Item t={t} at={112.64} size={32}>Signature</Item>
          </div>
          <div className="kit-ui" style={{ marginTop: 34, fontSize: 26, color: GREEN, display: 'flex', alignItems: 'center', gap: 12, ...enter(t, 114.64, { y: 12 }) }}>
            <Spark size={28} /> Knows your writing style? It adapts the draft.
          </div>
        </div>
        <AppWindow
          t={t} start={105.3} src={shot('12-corrected-prompt-draft-source')} imgW={IMG_W} imgH={IMG_H} left={740} top={150} width={1100}
          cam={[{ at: 105.3, x: 1075, y: 520, s: 1.5, dur: 0.01 }, { at: 109.6, x: 1075, y: 520, s: 1.75 }, { at: 111.4, x: 1000, y: 690, s: 2.1 }]}
          rings={[
            { at: 110.0, until: 110.7, x: 756, y: 515, w: 655, h: 40 },
            { at: 110.8, until: 111.7, x: 756, y: 535, w: 655, h: 20 },
            { at: 111.88, until: 112.5, x: 1022, y: 684, w: 162, h: 24 },
            { at: 112.64, x: 756, y: 718, w: 70, h: 44, spot: true },
          ]}
        />
      </Scene>

      {/* 16 — Ready to send? */}
      <Scene t={t} index={16}>
        <Eyebrow t={t} at={118.5}>Sending</Eyebrow>
        <div className="kit-h2" style={enter(t, 118.6, { dur: 0.8, y: 28 })}>
          Does Claude <span className="kit-mark" style={markStyle(t, 122.1)}>pause for approval?</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 70 }}>
          <div style={enter(t, 120.4, { scale: 0.7, y: 0, easing: BACK })}>
            <div className="kit-ui" style={{ background: INK, color: '#fff', borderRadius: 18, padding: '26px 46px', fontSize: 38, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 16 }}>
              <Mail size={40} color="#fff" /> Send
            </div>
          </div>
          <div className="kit-ui" style={{ fontSize: 34, color: MUTED, ...enter(t, 123.28, { y: 0, x: -20 }) }}>depends on</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Chip t={t} at={123.92} on>Conversation mode</Chip>
            <Chip t={t} at={125.24} on>Tool permissions</Chip>
            <Chip t={t} at={126.64} on>Organization settings</Chip>
          </div>
        </div>
      </Scene>

      {/* 17 — Manual vs Auto, straight from the permissions page */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t} start={128.3} src={shot('08-gmail-permissions')} numbered={false} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 128.3, x: 1060, y: 372, s: 1.9, dur: 0.01 }]}
          rings={[{ at: 128.56, until: 132.9, x: 961, y: 352, w: 96, h: 21, spot: true }, { at: 133.2, x: 1058, y: 352, w: 452, h: 21 }, { at: 134.0, x: 612, y: 373, w: 468, h: 21 }]}
          steps={[{ at: 129.68, text: 'Manual: send, reply and forward need approval' }, { at: 133.2, text: 'Auto: may act after an automated risk check' }]}
        />
      </Scene>

      {/* 18 — Check your mode */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t} start={136.85} src={shot('10-original-prompt')} numbered={false} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 136.85, x: 1200, y: 520, s: 1.6, dur: 0.01 }, { at: 137.0, x: 1330, y: 560, s: 2.4, dur: 0.8 }]}
          rings={[{ at: 137.44, x: 1360, y: 555, w: 56, h: 22, spot: true }]}
          steps={[{ at: 137.04, text: 'Check your mode before you send' }]}
        />
      </Scene>

      {/* 19 — Task 2: beyond one email */}
      <Scene t={t} index={19}>
        <Eyebrow t={t} at={140.0}>Task 2 · Process your inbox</Eyebrow>
        <div className="kit-h1" style={{ fontSize: 92, ...enter(t, 140.1, { dur: 0.9, y: 30 }) }}>
          Move <span className="kit-mark" style={markStyle(t, 140.6)}>beyond one email.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 50, marginTop: 60 }}>
          <div style={{ position: 'relative', width: 620, height: 380 }}>
            {['Team update', 'Invoice question', 'Weekly newsletter', 'Meeting notes', 'Product digest'].map((s, i) => {
              const gather = prog(t, 145.76, 0.9, IN_OUT);
              return (
                <div key={s} style={{ position: 'absolute', left: 0, top: i * 76, width: 560, ...enter(t, 142.72 + i * 0.25, { x: -30, y: 0, dur: 0.45 }) }}>
                  <div style={{ transform: `translate(${gather * 120}px, ${gather * (152 - i * 76)}px) scale(${1 - gather * 0.3})`, opacity: 1 - gather }}>
                    <MailRow from="Inbox" subj={s} style={{ padding: '10px 20px' }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ ...enter(t, 145.9, { x: -20, y: 0 }) }}>
            <svg width="90" height="40"><path d="M0 20h80M66 6l16 14-16 14" stroke={GREEN} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="kit-card kit-ui" style={{ width: 520, padding: '30px 34px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 146.4, { scale: 0.7, y: 0, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Spark size={36} /><span className="kit-h3" style={{ fontSize: 36 }}>Today’s inbox</span></div>
            <div style={{ fontSize: 26, color: GREEN, marginTop: 10 }}>One structured summary</div>
          </div>
        </div>
      </Scene>

      {/* 20 — The inbox prompt */}
      <Scene t={t} index={20}>
        <Eyebrow t={t} at={147.8}>The prompt</Eyebrow>
        <PromptCard
          t={t} at={147.85} size={40}
          segs={[
            { s: 'Use Gmail to check ' },
            { s: 'today’s emails in my Inbox', at: 148.72 },
            { s: ', ' },
            { s: 'using my timezone', at: 150.0 },
            { s: '. Group them into ' },
            { s: 'newsletters and everything else', at: 151.44 },
            { s: '. ' },
            { s: 'Summarize the newsletters in bullets', at: 153.36 },
            { s: ', include ' },
            { s: 'clickable source links', at: 154.8 },
            { s: ', and state ' },
            { s: 'how many messages you reviewed', at: 156.4 },
            { s: '. ' },
            { s: 'Don’t change labels or mark messages read', at: 158.32 },
            { s: '.' },
          ]}
        />
      </Scene>

      {/* 21 — Structured summary; check scope and count */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          t={t} start={161.05} src={shot('14-todays-mail-grouping-redacted')} numbered={false} imgW={IMG_W} imgH={IMG_H}
          cam={[{ at: 161.05, x: 1070, y: 420, s: 1.35, dur: 0.01 }, { at: 166.6, x: 1070, y: 250, s: 1.75 }]}
          rings={[
            { at: 162.28, until: 166.4, x: 732, y: 330, w: 200, h: 96 },
            { at: 167.6, until: 168.5, x: 732, y: 184, w: 680, h: 124, spot: true },
            { at: 168.64, x: 762, y: 286, w: 620, h: 22, spot: true },
          ]}
          steps={[{ at: 162.28, text: 'A structured summary' }, { at: 167.6, text: 'Check the search scope' }, { at: 168.64, text: 'and the message count' }]}
        />
      </Scene>

      {/* 22 — Summarizing vs organizing */}
      <Scene t={t} index={22}>
        <div className="kit-h2" style={enter(t, 172.15, { dur: 0.8, y: 28 })}>
          Summarizing reads. <span className="kit-mark" style={markStyle(t, 179.04)}>Organizing changes.</span>
        </div>
        <div style={{ display: 'flex', gap: 40, marginTop: 56 }}>
          {/* Summarize column */}
          <div className="kit-card" style={{ flex: 1, padding: '30px 34px', ...enter(t, 176.48, { y: 24 }) }}>
            <div className="kit-tag">Summarize</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              {['Weekly newsletter', 'Team update', 'Invoice question'].map((s) => <MailRow key={s} from="Inbox" subj={s} style={{ padding: '10px 18px' }} />)}
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, fontSize: 28, ...enter(t, 177.7, { y: 10 }) }}>
              <Check size={30} /> Inbox unchanged
            </div>
          </div>
          {/* Organize column */}
          <div className="kit-card" style={{ flex: 1, padding: '30px 34px', borderColor: prog(t, 179.04, 0.3) > 0.5 ? RED : LINE, ...enter(t, 173.12, { y: 24 }) }}>
            <div className="kit-tag">Organize</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 20 }}>
              {[
                ['Weekly newsletter', 'Newsletters', 173.44],
                ['Team update', 'Work', 173.9],
                ['Invoice question', 'Finance', 174.56],
              ].map(([s, lab, at]) => (
                <MailRow key={s as string} from="Inbox" subj={s as string} style={{ padding: '10px 18px' }}>
                  <span className="kit-tag" style={{ fontSize: 15, ...enter(t, at as number, { y: -16, scale: 0.6, easing: BACK, dur: 0.45 }) }}>{lab as string}</span>
                </MailRow>
              ))}
            </div>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, fontSize: 28, color: RED, ...enter(t, 179.04, { y: 10 }) }}>
              ⚠ Changes your inbox: review first
            </div>
          </div>
        </div>
        <div className="kit-ui" style={{ display: 'flex', gap: 30, marginTop: 30, fontSize: 28 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, ...enter(t, 180.84, { y: 10 }) }}><Check size={28} /> Review the proposed actions</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10, ...enter(t, 182.4, { y: 10 }) }}><Check size={28} /> Confirm the right messages</span>
        </div>
      </Scene>

      {/* 23 — Where it works + what it can do */}
      <Scene t={t} index={23}>
        <Eyebrow t={t} at={185.65}>Practical notes</Eyebrow>
        <div className="kit-ui" style={{ fontSize: 26, color: MUTED, letterSpacing: '.1em', fontWeight: 600, marginTop: 10, ...enter(t, 187.6, { y: 10 }) }}>WORKS ON</div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          <Chip t={t} at={189.36}>Claude web</Chip>
          <Chip t={t} at={190.0}>Desktop</Chip>
          <Chip t={t} at={191.44}>Supported mobile apps</Chip>
        </div>
        <div className="kit-ui" style={{ fontSize: 26, color: MUTED, letterSpacing: '.1em', fontWeight: 600, marginTop: 60, ...enter(t, 192.64, { y: 10 }) }}>CLAUDE CAN</div>
        <div style={{ display: 'flex', gap: 18, marginTop: 16, flexWrap: 'wrap' }}>
          {[
            ['Search', 193.28],
            ['Read', 194.12],
            ['Draft', 194.84],
            ['Send', 195.56],
            ['Forward', 196.24],
            ['Label', 196.96],
          ].map(([s, at]) => (
            <Chip key={s as string} t={t} at={at as number} on>{s as string}</Chip>
          ))}
        </div>
        <div className="kit-ui" style={{ marginTop: 50, fontSize: 32, display: 'flex', alignItems: 'center', gap: 14, ...enter(t, 197.64, { y: 12 }) }}>
          <Lock size={32} /> Within <span className="kit-mark" style={markStyle(t, 198.24)}>your existing Gmail permissions</span>
        </div>
      </Scene>

      {/* 24 — Attachments + large inboxes */}
      <Scene t={t} index={24}>
        <div style={{ display: 'flex', gap: 60 }}>
          <div style={{ flex: 1 }}>
            <Eyebrow t={t} at={200.05}>Attachments</Eyebrow>
            <div className="kit-card kit-ui" style={{ padding: '26px 30px', ...enter(t, 200.84, { y: 20 }) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <FileIcon size={52} accent />
                <div>
                  <div style={{ fontSize: 32, fontWeight: 600 }}>proposal.pdf</div>
                  <div style={{ fontSize: 22, color: GREEN, display: 'flex', alignItems: 'center', gap: 8 }}><Check size={22} /> Name visible</div>
                </div>
              </div>
              <div style={{ position: 'relative', marginTop: 22, height: 150, borderRadius: 12, overflow: 'hidden', background: '#F4F4F0' }}>
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} style={{ position: 'absolute', left: 22, top: 22 + i * 30, width: 380 - i * 50, height: 12, borderRadius: 6, background: '#C9C9C2', filter: `blur(${prog(t, 202.32, 0.5) * 5}px)` }} />
                ))}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 26, fontWeight: 600, ...enter(t, 202.4, { scale: 0.7, y: 0, easing: BACK }) }}>
                  <Lock size={30} /> Contents not read
                </div>
              </div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Eyebrow t={t} at={203.84}>Large inboxes</Eyebrow>
            <div className="kit-card kit-ui" style={{ padding: '30px 30px', ...enter(t, 203.9, { y: 20 }) }}>
              {['Search', 'Retrieve more', 'Retrieve more', 'Summarize'].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 0', fontSize: 28, ...enter(t, 204.3 + i * 0.55, { x: -20, y: 0, dur: 0.4 }) }}>
                  <div style={{ width: 34, height: 34, borderRadius: '50%', background: i === 1 || i === 2 ? LIME_SOFT : LIME, border: `2px solid ${GREEN}`, display: 'grid', placeItems: 'center', fontSize: 18, fontWeight: 700, color: GREEN }}>{i + 1}</div>
                  {s}
                  {(i === 1 || i === 2) && <span className="kit-tag" style={{ fontSize: 14, marginLeft: 'auto' }}>Extra step</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 25 — Privacy */}
      <Scene t={t} index={25}>
        <Eyebrow t={t} at={207.9}>Privacy</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 10 }}>
          {[
            { at: 209.2, title: 'Not used for training', body: 'Gmail data retrieved through the connector isn’t used to train Claude’s models.', mark: 211.36 },
            { at: 213.76, title: 'Stored with the chat', body: 'It lives with the conversation. Deleting the chat removes it.', mark: 215.68 },
            { at: 217.68, title: 'Copied content can differ', body: 'What you copy out manually may be treated differently, depending on your settings.', mark: 220.16 },
            { at: 222.32, title: 'Follow your org’s policies', body: 'Your organization’s data-handling rules still apply.', mark: 224.4 },
          ].map((c) => (
            <div key={c.title} className="kit-card kit-ui" style={{ padding: '30px 34px', ...enter(t, c.at, { y: 24, dur: 0.6 }) }}>
              <div className="kit-h3" style={{ fontSize: 38 }}>
                <span className="kit-mark" style={markStyle(t, c.mark)}>{c.title}</span>
              </div>
              <div style={{ fontSize: 26, color: MUTED, marginTop: 12, lineHeight: 1.4 }}>{c.body}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 26 — Takeaway */}
      <Scene t={t} index={26} padStyle={{ opacity: 1 - prog(t, 239.9, 0.9, Easing.in(Easing.quad)) }}>
        <Eyebrow t={t} at={226.05}>Key takeaway</Eyebrow>
        <div className="kit-h2" style={enter(t, 226.2, { dur: 0.8, y: 28 })}>
          Find context. Prepare responses. Manage email.
        </div>
        <div className="kit-ui" style={{ fontSize: 34, color: MUTED, marginTop: 20, ...enter(t, 233.1, { y: 12 }) }}>Right from a conversation.</div>
        <div style={{ display: 'flex', gap: 22, marginTop: 70 }}>
          <Chip t={t} at={234.88} on>Clear prompts</Chip>
          <Chip t={t} at={236.08} on>Source checks</Chip>
          <Chip t={t} at={236.88} on>Deliberate permissions</Chip>
        </div>
        <div className="kit-h3" style={{ fontSize: 52, marginTop: 60, ...enter(t, 238.3, { y: 16 }) }}>
          <span className="kit-mark" style={markStyle(t, 238.6)}>You stay in control.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ClaudeGmail: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CLAUDE_GMAIL_TITLE_FRAMES}>
      <TitleCardGreen label="CLAUDE" title="Claude Gmail Integration" subtitle="Work directly with your inbox" />
    </Sequence>
    <Sequence from={CLAUDE_GMAIL_TITLE_FRAMES}>
      <ClaudeGmailBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
