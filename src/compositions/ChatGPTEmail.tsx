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
  GREEN,
  INK,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  MenuList,
  enter,
  makeScene,
  markStyle,
  prog,
} from '../kit';

loadSerif();
loadSans();

// ChatGPT for Email: From Drafting to Inbox Automation — custom screenshot demo (Lead with AI).
// Every cue is in SECONDS of the VO (audio/chatgpt-email.mp3, Daan on ElevenLabs v4, 245.28s of speech),
// taken from the Scribe word timestamps in src/data/chatgpt-email.transcript.json.
// Screenshots: chatgpt-email/images/*.jpg (1920x958). 06 and 10 have private details blurred.
//
//  #  scene                       start   VO cue
//  1  Three ways                  0.00    "Most people start using ChatGPT for email…"
//  2  Paste the email             17.90   "I'll start with the simplest option."
//  3  Prompt + output             32.40   "Then I ask ChatGPT to summarize…"
//  4  Check the draft             59.00   "Before I use the draft…"
//  5  Plugins > Gmail > Install   75.20   "I open Plugins in the left navigation…"
//  6  Google permissions          86.70   "Next, Google shows what OpenAI wants access to."
//  7  Installed > Try in chat     107.10  "Back in ChatGPT, the Gmail plugin is installed."
//  8  Inbox prompt                112.70  "…ask it to check today's emails…"
//  9  Inbox result                120.40  "ChatGPT pulls the messages…"
//  10 What else it can do         134.50  "I can also ask it to find…"
//  11 The key difference          150.90  "The key difference?"
//  12 Turn it into a routine      158.50  "Now let's turn this into a routine."
//  13 Task instructions + repeat  164.10  "In the instructions…"
//  14 Scheduled                   193.90  "ChatGPT confirms the task is scheduled…"
//  15 Practical notes             204.10  "A few practical notes."
//  16 Closing                     231.20  "Start with recent, tightly scoped searches…"

export const CHATGPT_EMAIL_DURATION_S = 246.6;
export const CHATGPT_EMAIL_TITLE_FRAMES = 90;

const STARTS = [0, 17.9, 32.4, 59.0, 75.2, 86.7, 107.1, 112.7, 120.4, 134.5, 150.9, 158.5, 164.1, 193.9, 204.1, 231.2];
const Scene = makeScene(STARTS, 0.5);
const IMG_W = 1920;
const IMG_H = 958;
const WIN = { imgW: IMG_W, imgH: IMG_H, title: 'chatgpt.com' };

// Browser previews can inject the screenshots (data URIs) via globalThis.CHATGPT_EMAIL_SHOTS.
const shot = (n: string): string =>
  (globalThis as { CHATGPT_EMAIL_SHOTS?: Record<string, string> }).CHATGPT_EMAIL_SHOTS?.[n] ??
  staticFile(`chatgpt-email/images/${n}.jpg`);

const NumBadge: React.FC<{ n: number; on?: boolean }> = ({ n, on }) => (
  <div style={{ width: 54, height: 54, borderRadius: '50%', background: on ? LIME : LIME_SOFT, color: on ? '#fff' : INK, display: 'grid', placeItems: 'center', fontFamily: 'Public Sans', fontWeight: 700, fontSize: 28 }}>
    {n}
  </div>
);

const ChatGPTEmailBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/chatgpt-email.mp3')} />}

      {/* 1 — Three ways */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>ChatGPT for Email</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          From drafting to <span className="kit-mark" style={markStyle(t, 12.96)}>inbox automation.</span>
        </div>
        <div style={{ display: 'flex', gap: 34, marginTop: 80 }}>
          {[
            ['Paste an email, draft a reply', 'No connection needed', 3.28],
            ['Connect Gmail', 'Work with your inbox', 10.08],
            ['Schedule a daily review', 'Every weekday, automatically', 12.96],
          ].map(([h, s, at], i) => {
            const on = t >= 15.72 + i * 0.25;
            return (
              <div
                key={h as string}
                className="kit-card kit-ui"
                style={{ flex: 1, padding: '30px 32px', borderColor: on ? LIME : LINE, transition: 'none', ...enter(t, at as number, { y: 30, easing: BACK }) }}
              >
                <NumBadge n={i + 1} on={on} />
                <div style={{ fontSize: 34, fontWeight: 600, marginTop: 22, lineHeight: 1.2 }}>{h as string}</div>
                <div style={{ fontSize: 24, color: MUTED, marginTop: 10 }}>{s as string}</div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 2 — Paste the email */}
      <Scene t={t} index={1} pad={false}>
        <AppWindow
          t={t}
          start={17.9}
          src={shot('01-drafting-prompt')}
          {...WIN}
          cam={[{ at: 22.8, x: 955, y: 390, s: 1.5 }]}
          rings={[
            { at: 24.08, until: 27.9, x: 610, y: 318, w: 414, h: 28 },
            { at: 28.08, until: 29.45, x: 778, y: 396, w: 326, h: 28 },
            { at: 29.52, until: 31.8, x: 893, y: 448, w: 292, h: 28 },
          ]}
          steps={[
            { at: 20.4, text: 'Paste the email into a new chat' },
            { at: 24.08, text: 'Agenda by Friday' },
            { at: 28.08, text: 'Will it be recorded?' },
            { at: 29.52, text: 'How long is access?' },
          ]}
        />
      </Scene>

      {/* 3 — Prompt + output */}
      <Scene t={t} index={2} pad={false}>
        <AppWindow
          t={t}
          start={32.4}
          src={shot('04-drafting-summary')}
          {...WIN}
          cam={[
            { at: 32.4, dur: 0.01, x: 1100, y: 140, s: 1.8 },
            { at: 47.56, dur: 1.2, x: 985, y: 420, s: 1.15 },
          ]}
          rings={[
            { at: 34.48, until: 37.0, x: 845, y: 74, w: 385, h: 24 },
            { at: 37.12, until: 39.7, x: 845, y: 100, w: 240, h: 24 },
            { at: 39.84, until: 46.6, x: 845, y: 126, w: 505, h: 50 },
            { at: 48.96, until: 50.45, x: 600, y: 228, w: 770, h: 84 },
            { at: 50.56, until: 52.7, x: 600, y: 340, w: 770, h: 184 },
            { at: 52.8, until: 54.9, x: 600, y: 546, w: 770, h: 330 },
            { at: 55.08, x: 630, y: 402, w: 700, h: 24, spot: true },
          ]}
          steps={[
            { at: 33.12, text: 'Add your instructions' },
            { at: 41.36, text: 'Direct, calm, specific. Under 120 words' },
            { at: 47.56, text: 'Summary, risks and a draft reply' },
            { at: 54.24, text: 'Flags what isn’t confirmed yet' },
          ]}
        />
      </Scene>

      {/* 4 — Check the draft */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          t={t}
          start={59.0}
          src={shot('05-draft-reply')}
          {...WIN}
          cam={[{ at: 59.4, x: 985, y: 470, s: 1.35 }]}
          rings={[
            { at: 60.96, until: 62.6, x: 602, y: 240, w: 768, h: 458 },
            { at: 62.72, until: 64.45, x: 618, y: 478, w: 700, h: 104 },
            { at: 64.56, until: 69.2, x: 618, y: 478, w: 412, h: 26, spot: true },
          ]}
          steps={[
            { at: 60.96, text: 'Check the facts and commitments' },
            { at: 64.56, text: 'Can you really hit Friday?' },
            { at: 66.88, text: 'Works only from the text you pasted' },
          ]}
        />
        <div
          className="kit-ui"
          style={{
            position: 'absolute',
            right: 120,
            top: 120,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            background: INK,
            color: '#fff',
            borderRadius: 999,
            padding: '14px 28px',
            fontSize: 28,
            fontWeight: 600,
            boxShadow: '0 16px 40px rgba(0,0,0,.2)',
            ...enter(t, 70.32, { y: 0, scale: 0.7, easing: BACK }),
          }}
        >
          <Check size={30} /> No inbox connection required
        </div>
      </Scene>

      {/* 5 — Plugins > Gmail > Install plugin */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={75.2}
          src={shot('02-gmail-install')}
          {...WIN}
          cam={[{ at: 78.3, x: 980, y: 140, s: 1.6 }]}
          cursor={[
            { at: 75.5, x: 600, y: 420 },
            { at: 75.5, x: 26, y: 234, click: true, dur: 0.6 },
            { at: 78.2, x: 760, y: 100 },
            { at: 79.0, x: 1277, y: 102, click: true },
          ]}
          rings={[
            { at: 76.04, until: 78.3, x: 18, y: 214, w: 18, h: 40 },
            { at: 76.3, until: 78.3, x: 66, y: 14, w: 58, h: 24 },
            { at: 78.4, until: 79.6, x: 618, y: 70, w: 320, h: 64 },
            { at: 79.76, x: 1213, y: 84, w: 128, h: 36, spot: true },
          ]}
          steps={[
            { at: 76.04, text: 'Plugins' },
            { at: 78.4, text: 'Gmail' },
            { at: 79.76, text: 'Install plugin' },
            { at: 81.44, text: 'Choose your Google account, then Continue' },
          ]}
        />
      </Scene>

      {/* 6 — Google permissions */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={86.7}
          src={shot('06-google-permissions')}
          {...WIN}
          title="accounts.google.com"
          cam={[{ at: 87.4, x: 960, y: 455, s: 1.35 }]}
          cursor={[
            { at: 90.8, x: 1040, y: 300 },
            { at: 99.6, x: 1182, y: 677, click: true },
            { at: 100.9, x: 1332, y: 640, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 90.96, until: 93.3, x: 704, y: 343, w: 512, h: 290 },
            { at: 93.52, until: 98.5, x: 704, y: 345, w: 512, h: 60, spot: true },
            { at: 100.48, until: 101.4, x: 1158, y: 664, w: 50, h: 26 },
          ]}
          steps={[
            { at: 87.52, text: 'Review what OpenAI can access' },
            { at: 93.52, text: 'Read, compose and send email' },
            { at: 100.48, text: 'Done, then Continue' },
            { at: 102.48, text: 'First time? Your screens may differ' },
          ]}
        />
      </Scene>

      {/* 7 — Installed > Try in chat */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t}
          start={107.1}
          src={shot('07-gmail-installed')}
          {...WIN}
          cam={[{ at: 107.3, x: 1020, y: 130, s: 1.6 }]}
          cursor={[
            { at: 109.4, x: 1100, y: 330 },
            { at: 110.8, x: 1283, y: 102, click: true },
          ]}
          rings={[
            { at: 108.72, until: 111.0, x: 805, y: 50, w: 310, h: 40, spot: true },
            { at: 111.6, x: 1228, y: 84, w: 113, h: 36 },
          ]}
          steps={[
            { at: 108.72, text: 'Gmail plugin installed' },
            { at: 111.6, text: 'Try in chat' },
          ]}
        />
      </Scene>

      {/* 8 — Inbox prompt */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={112.7}
          src={shot('08-inbox-prompt')}
          {...WIN}
          cam={[{ at: 112.7, dur: 0.01, x: 985, y: 470, s: 1.9 }]}
          cursor={[
            { at: 118.6, x: 1100, y: 560 },
            { at: 119.2, x: 1343, y: 530, click: true },
          ]}
          rings={[
            { at: 113.64, until: 115.05, x: 618, y: 420, w: 258, h: 24 },
            { at: 115.16, until: 117.9, x: 618, y: 446, w: 362, h: 24 },
            { at: 118.0, until: 119.9, x: 618, y: 472, w: 278, h: 24 },
          ]}
          steps={[
            { at: 113.08, text: 'Check today’s emails' },
            { at: 115.16, text: 'Newsletters vs everything else' },
            { at: 118.0, text: 'Summarize the newsletters' },
          ]}
        />
      </Scene>

      {/* 9 — Inbox result */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={120.4}
          src={shot('10-inbox-result')}
          {...WIN}
          cam={[
            { at: 121.0, x: 985, y: 330, s: 1.55 },
            { at: 130.24, x: 985, y: 430, s: 1.2 },
          ]}
          rings={[
            { at: 121.84, until: 125.95, x: 602, y: 301, w: 768, h: 80 },
            { at: 126.08, until: 128.7, x: 602, y: 301, w: 251, h: 80, spot: true },
            { at: 128.8, until: 131.0, x: 861, y: 301, w: 250, h: 80, spot: true },
          ]}
          steps={[
            { at: 121.12, text: 'ChatGPT reads your inbox' },
            { at: 126.08, text: '5 emails, 2 conversations' },
            { at: 128.8, text: 'No newsletters today' },
            { at: 130.24, text: 'Need more? Ask for the last 7 days' },
          ]}
        />
      </Scene>

      {/* 10 — What else it can do */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 134.6, { y: 14 })}>Connected Gmail</div>
        <div className="kit-h2" style={enter(t, 134.7, { dur: 0.8, y: 30 })}>
          Ask about your inbox. <span className="kit-mark" style={markStyle(t, 144.16)}>Or act on it.</span>
        </div>
        <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 56, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, ...enter(t, 135.6, { y: 0 }) }}>
          Ask
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16 }}>
          {[
            ['Find a conversation', 135.8],
            ['Summarize a long thread', 137.84],
            ['Prepare a reply', 139.76],
          ].map(([w, at]) => (
            <div key={w as string} className="kit-pill" style={enter(t, at as number, { y: 0, scale: 0.8, easing: BACK })}>
              {w as string}
            </div>
          ))}
        </div>
        <div className="kit-ui" style={{ fontSize: 24, color: MUTED, marginTop: 50, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, ...enter(t, 141.56, { y: 0 }) }}>
          Act <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>· depending on your account and permissions</span>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16, alignItems: 'center' }}>
          {[
            ['Send', 144.16],
            ['Label', 145.08],
            ['Archive', 145.6],
          ].map(([w, at]) => (
            <div key={w as string} className="kit-pill" style={{ borderColor: LIME, ...enter(t, at as number, { y: 0, scale: 0.8, easing: BACK }) }}>
              {w as string}
            </div>
          ))}
          <div
            className="kit-ui"
            style={{ marginLeft: 20, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 24px', borderRadius: 16, background: '#FFF7E6', border: '2px solid #F2D49B', fontSize: 26, fontWeight: 600, ...enter(t, 149.12, { x: -20, y: 0 }) }}
          >
            <span style={{ fontSize: 28 }}>✋</span> Some actions ask for your approval first
          </div>
        </div>
      </Scene>

      {/* 11 — The key difference */}
      <Scene t={t} index={10}>
        <div className="kit-label" style={enter(t, 151.0, { y: 14 })}>The key difference</div>
        <div className="kit-h2" style={enter(t, 151.2, { dur: 0.8, y: 30 })}>
          ChatGPT works from <span className="kit-mark" style={markStyle(t, 154.64)}>your actual inbox.</span>
        </div>
        <div style={{ display: 'flex', gap: 50, marginTop: 70, alignItems: 'stretch' }}>
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '34px 38px', background: '#FAFAF8', opacity: 0.85, ...enter(t, 156.24, { y: 24 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 600, color: MUTED }}>
              <Cross size={38} /> Text you paste in
            </div>
            <div style={{ fontSize: 26, color: MUTED, marginTop: 14 }}>One message at a time, copied by hand</div>
          </div>
          <div className="kit-card kit-ui" style={{ flex: 1, padding: '34px 38px', borderColor: LIME, ...enter(t, 154.64, { y: 24, easing: BACK }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 600 }}>
              <Check size={38} /> Your connected inbox
            </div>
            <div style={{ fontSize: 26, color: MUTED, marginTop: 14 }}>Search, summarize and reply across threads</div>
          </div>
        </div>
      </Scene>

      {/* 12 — Turn it into a routine */}
      <Scene t={t} index={11}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
          <div style={{ flex: 1 }}>
            <div className="kit-label" style={enter(t, 158.6, { y: 14 })}>Scheduled tasks</div>
            <div className="kit-h2" style={enter(t, 158.7, { dur: 0.8, y: 30 })}>
              Turn it into a <span className="kit-mark" style={markStyle(t, 159.92)}>routine.</span>
            </div>
          </div>
          <div style={{ position: 'relative', width: 520, ...enter(t, 160.9, { y: 24 }) }}>
            <MenuList items={['New chat', 'Scheduled', 'Plugins']} active={t >= 161.52 ? 1 : -1} style={{ width: 360 }} />
            <div
              className="kit-ui"
              style={{ position: 'absolute', left: 300, top: 150, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 26px', borderRadius: 999, background: INK, color: '#fff', fontSize: 26, fontWeight: 600, boxShadow: '0 16px 40px rgba(0,0,0,.2)', ...enter(t, 163.04, { y: 0, scale: 0.7, easing: BACK }) }}
            >
              + New task
            </div>
          </div>
        </div>
      </Scene>

      {/* 13 — Task instructions + repeat settings */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          t={t}
          start={164.1}
          src={shot('09-weekday-schedule')}
          {...WIN}
          cam={[
            { at: 164.1, dur: 0.01, x: 955, y: 285, s: 1.75 },
            { at: 185.6, dur: 1.0, x: 955, y: 470, s: 1.5 },
          ]}
          cursor={[
            { at: 191.0, x: 1100, y: 600 },
            { at: 191.8, x: 1246, y: 643, click: true },
          ]}
          rings={[
            { at: 166.88, until: 170.6, x: 655, y: 245, w: 590, h: 22 },
            { at: 170.72, until: 173.5, x: 655, y: 265, w: 160, h: 22 },
            { at: 173.6, until: 176.6, x: 815, y: 265, w: 285, h: 22 },
            { at: 176.72, until: 181.4, x: 655, y: 265, w: 590, h: 42 },
            { at: 184.4, until: 185.7, x: 655, y: 305, w: 95, h: 22, spot: true },
            { at: 186.48, until: 187.05, x: 657, y: 378, w: 598, h: 30 },
            { at: 187.12, until: 188.1, x: 1150, y: 428, w: 100, h: 24 },
            { at: 188.16, until: 190.5, x: 1070, y: 476, w: 180, h: 24 },
            { at: 190.56, until: 191.6, x: 1180, y: 524, w: 70, h: 24 },
            { at: 192.56, x: 1214, y: 625, w: 66, h: 36, spot: true },
          ]}
          steps={[
            { at: 164.72, text: 'Write the instructions' },
            { at: 173.6, text: 'Skip newsletters and promotions' },
            { at: 176.72, text: 'Sender, subject, reason to follow up' },
            { at: 184.4, text: 'Nothing urgent? “All clear.”' },
            { at: 186.48, text: 'Repeat on weekdays' },
            { at: 188.16, text: '7:00 AM in your time zone' },
            { at: 190.56, text: 'No end date' },
            { at: 192.56, text: 'Save the task' },
          ]}
        />
      </Scene>

      {/* 14 — Scheduled */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          t={t}
          start={193.9}
          src={shot('11-schedule-confirmed')}
          {...WIN}
          cam={[{ at: 194.1, x: 985, y: 340, s: 1.55 }]}
          cursor={[
            { at: 200.0, x: 1100, y: 520 },
            { at: 200.5, x: 1329, y: 423, click: true },
          ]}
          rings={[
            { at: 194.88, until: 197.7, x: 600, y: 340, w: 490, h: 24, spot: true },
            { at: 197.84, x: 602, y: 388, w: 768, h: 72 },
          ]}
          steps={[
            { at: 194.88, text: 'Your task is scheduled' },
            { at: 197.84, text: 'Weekdays at 7:00 AM' },
            { at: 201.24, text: 'Open, then Pause to stop it' },
          ]}
        />
      </Scene>

      {/* 15 — Practical notes */}
      <Scene t={t} index={14}>
        <div className="kit-label" style={enter(t, 204.2, { y: 14 })}>Practical notes</div>
        <div className="kit-h2" style={enter(t, 204.3, { dur: 0.8, y: 30 })}>
          Before you <span className="kit-mark" style={markStyle(t, 210.72)}>rely on it</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 50 }}>
          {[
            ['Plugins and tasks depend on your plan and workspace settings', 205.92],
            ['Review the Google access request before you connect', 210.72],
            ['Unread doesn’t always mean it needs your reply', 214.64],
            ['Check drafts: facts, recipients, commitments', 220.64],
            ['Follow your organization’s policies for work inboxes', 226.48],
          ].map(([w, at]) => (
            <div key={w as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 34, ...enter(t, at as number, { x: -24, y: 0 }) }}>
              <Check size={36} /> {w as string}
            </div>
          ))}
        </div>
      </Scene>

      {/* 16 — Closing */}
      <Scene t={t} index={15} padStyle={{ opacity: 1 - prog(t, 245.6, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 231.3, { y: 14 })}>ChatGPT for Email</div>
        <div className="kit-h2" style={enter(t, 231.4, { dur: 0.9, y: 34 })}>
          Start with recent, <span className="kit-mark" style={markStyle(t, 232.68)}>tightly scoped</span> searches.
        </div>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 60, color: MUTED, ...enter(t, 235.76, { y: 18 }) }}>
          The value isn’t writing emails faster.
        </p>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 14, ...enter(t, 239.04, { y: 18 }) }}>
          It’s <span className="kit-mark" style={markStyle(t, 239.76)}>less time sorting</span> your inbox,
        </p>
        <p className="kit-body" style={{ fontSize: 44, marginTop: 6, ...enter(t, 241.84, { y: 18 }) }}>
          and more time on the conversations that <span style={{ color: GREEN, fontWeight: 600 }}>need you.</span>
        </p>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ChatGPTEmail: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CHATGPT_EMAIL_TITLE_FRAMES}>
      <TitleCardGreen label="CHATGPT" title="ChatGPT for Email" />
    </Sequence>
    <Sequence from={CHATGPT_EMAIL_TITLE_FRAMES}>
      <ChatGPTEmailBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
