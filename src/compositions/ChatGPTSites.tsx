import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { loadFont as loadMono } from '@remotion/google-fonts/IBMPlexMono';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  AppWindow,
  Arrow,
  BACK,
  Check,
  Cross,
  FileIcon,
  INK,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
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
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// ChatGPT Sites: Turn a Spreadsheet into an Interactive Dashboard — custom screenshot demo (Lead with AI).
// Every cue is in SECONDS of the VO (audio/chatgpt-sites.mp3, Daan on ElevenLabs v4, 334.56s of speech),
// from the Scribe word timestamps in src/data/chatgpt-sites.transcript.json. A 90-frame green title card
// opens the video; the VO and every scene start after it.
//
// Screenshots (chatgpt-sites/images/04..09, 2880x1556) are from a real ChatGPT run that used shorter prompts
// and auto-deployed. Scenes keep the camera on what the VO names. 09 uses a copy with the owner's email removed.
//
//  #  scene                          start   VO cue
//  1  Describe it, get a site         0.00   "ChatGPT Sites lets you build…"
//  2  Spreadsheet in, dashboard out  18.90   "In this walkthrough…"
//  3  The data                       33.00   "I have a spreadsheet with six projects."
//  4  Work + attach + @Sites         50.60   "I open a new conversation…"
//  5  The prompt (04)                65.30   "Now I enter this prompt."
//  6  The guardrails (05 left)       80.60   "It also tells ChatGPT to use only my data…"
//  7  Why it works                   91.90   "Notice that I've specified the audience…"
//  8  Status counts (05)            110.10   "Once the preview is ready…"
//  9  Filter: Delayed (05)          121.60   "I select Delayed."
//  10 Project details (06)          124.60   "Process Improvement, owned by Daniel Kim…"
//  11 At Risk + compare (05)        141.10   "Next, I test At Risk."
//  12 Snapshot, not live            161.70   "One thing to remember…"
//  13 Follow-up prompt (07)         176.80   "Now let's make one improvement."
//  14 Needs Leadership Attention    199.95   "ChatGPT updates the Site."
//  15 Deploy privately (08)         220.30   "Once I'm happy with the result…"
//  16 Review access (09)            239.00   "Then I open the Site's Share button…"
//  17 Recap                         271.40   "We've now turned a spreadsheet…"
//  18 Practical notes               280.80   "A few practical notes."
//  19 Plans and availability        311.60   "ChatGPT Sites is available…"

export const CHATGPT_SITES_DURATION_S = 336.2;
export const CHATGPT_SITES_TITLE_FRAMES = 90;

const STARTS = [
  0, 18.9, 33.0, 50.6, 65.3, 80.6, 91.9, 110.1, 121.6, 124.6, 141.1, 161.7, 176.8, 199.95, 220.3, 239.0, 271.4, 280.8,
  311.6,
];
const Scene = makeScene(STARTS, 0.5);

const IMG_W = 2880;
const IMG_H = 1556;
const WIN = { imgW: IMG_W, imgH: IMG_H, width: 1480, top: 40, title: 'chatgpt.com' };
// Smaller window next to a text column
const WIN_SIDE = { imgW: IMG_W, imgH: IMG_H, width: 1060, left: 80, top: 210, title: 'chatgpt.com' };

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.CHATGPT_SITES_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { CHATGPT_SITES_SHOTS?: Record<string, string> }).CHATGPT_SITES_SHOTS?.[n] ??
  staticFile(`chatgpt-sites/images/${n}.png`);

const S04 = '04-chatgpt-initial-prompt';
const S05 = '05-chatgpt-first-result';
const S06 = '06-chatgpt-project-details';
const S07 = '07-chatgpt-adding-prompt';
const S08 = '08-chatgpt-adding-result';
const S09 = '09-chatgpt-sharing-settings-redacted';

// ── Data (from the demo spreadsheet, snapshot Oct 28, 2026) ───────────────────
type Status = 'On Track' | 'At Risk' | 'Delayed' | 'Complete';
const STATUS_COL: Record<Status, string> = { 'On Track': '#2F7D5B', 'At Risk': '#B7791F', Delayed: '#B83A2E', Complete: '#4F63B8' };
const ROWS: { name: string; owner: string; pct: number; status: Status; due: string; note?: string }[] = [
  { name: 'Website Refresh', owner: 'Alex Morgan', pct: 85, status: 'On Track', due: 'Nov 15, 2026' },
  { name: 'Employee Onboarding', owner: 'Sarah Lee', pct: 60, status: 'At Risk', due: 'Nov 20, 2026', note: 'HR handbook feedback is pending; schedule review…' },
  { name: 'Customer Feedback Survey', owner: 'James Patel', pct: 100, status: 'Complete', due: 'Oct 25, 2026' },
  { name: 'Internal Training', owner: 'Emma Wilson', pct: 45, status: 'On Track', due: 'Dec 10, 2026' },
  { name: 'Process Improvement', owner: 'Daniel Kim', pct: 30, status: 'Delayed', due: 'Nov 5, 2026', note: 'Approval for the new workflow is pending; escalate…' },
  { name: 'Annual Planning', owner: 'Olivia Brown', pct: 70, status: 'On Track', due: 'Nov 30, 2026' },
];

const StatusChip: React.FC<{ s: Status; size?: number }> = ({ s, size = 20 }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 8, background: `${STATUS_COL[s]}18`, color: STATUS_COL[s], fontWeight: 600, fontSize: size, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, borderRadius: '50%', background: STATUS_COL[s] }} />
    {s}
  </span>
);

// Highlight a whole column of the spreadsheet mock while the VO names it
const colOn = (t: number, a: number, b: number) => (t >= a && t < b ? LIME_SOFT : 'transparent');

// A side text column item: icon + text, reveals on its word
const SideItem: React.FC<{ t: number; at: number; icon?: 'check' | 'dot' | 'cross'; children: React.ReactNode; size?: number }> = ({ t, at, icon = 'dot', children, size = 28 }) => (
  <div className="kit-ui" style={{ display: 'flex', alignItems: 'flex-start', gap: 16, fontSize: size, lineHeight: 1.3, ...enter(t, at, { x: -24, y: 0 }) }}>
    <div style={{ width: 34, flex: 'none', display: 'grid', placeItems: 'center', marginTop: 2 }}>
      {icon === 'check' ? <Check size={30} /> : icon === 'cross' ? <Cross size={30} /> : <div style={{ width: 12, height: 12, borderRadius: '50%', background: LIME, marginTop: 10 }} />}
    </div>
    <div>{children}</div>
  </div>
);

// ── Body ────────────────────────────────────────────────────────────────────
const ChatGPTSitesBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/chatgpt-sites.mp3')} />}

      {/* 1 — Describe it, get a site */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>ChatGPT Sites</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Describe it. <span className="kit-mark" style={markStyle(t, 4.9)}>Get a working site.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 90 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {[
              ['An idea', 7.52, <Spark size={30} key="s" />],
              ['A document', 10.24, <FileIcon size={28} key="d" />],
              ['A spreadsheet', 10.96, <FileIcon size={28} accent key="x" />],
            ].map(([label, at, icon]) => (
              <div key={label as string} className="kit-pill" style={{ fontSize: 28, ...enter(t, at as number, { x: -40, y: 0, easing: BACK }) }}>
                {icon as React.ReactNode} {label as string}
              </div>
            ))}
          </div>
          <Arrow t={t} at={11.8} w={150} />
          {[
            ['Preview', 12.68],
            ['Refine in chat', 14.24],
            ['Deploy', 16.28],
          ].map(([label, at], i) => (
            <React.Fragment key={label as string}>
              {i > 0 && <div style={{ fontSize: 40, color: MUTED, ...enter(t, at as number, { y: 0 }) }}>→</div>}
              <div className="kit-card kit-ui" style={{ padding: '26px 36px', fontSize: 34, fontWeight: 600, borderColor: i === 2 ? LIME : LINE, ...enter(t, at as number, { y: 30, easing: BACK }) }}>
                {label as string}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Scene>

      {/* 2 — Spreadsheet in, dashboard out */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 19.1, { y: 14 })}>This walkthrough</div>
        <div className="kit-h2" style={enter(t, 19.3, { dur: 0.9, y: 30 })}>
          A team spreadsheet becomes a <span className="kit-mark" style={markStyle(t, 23.0)}>dashboard for a manager.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 70 }}>
          {/* mini sheet */}
          <div className="kit-card" style={{ width: 430, padding: 18, ...enter(t, 21.0, { y: 30 }) }}>
            {Array.from({ length: 7 }).map((_, r) => (
              <div key={r} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                {[150, 90, 60, 80].map((w, c) => (
                  <div key={c} style={{ width: w, height: 22, borderRadius: 4, background: r === 0 ? '#CFE6BE' : '#F0F1EC' }} />
                ))}
              </div>
            ))}
          </div>
          <Arrow t={t} at={22.4} w={150} />
          {/* mini dashboard */}
          <div className="kit-card kit-ui" style={{ width: 760, padding: 26, ...enter(t, 23.36, { y: 30, easing: BACK }) }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              {(['On Track', 'At Risk', 'Delayed', 'Complete'] as Status[]).map((s) => (
                <div key={s} style={{ flex: 1, height: 64, borderRadius: 12, border: `2px solid ${LINE}`, padding: '8px 12px', fontSize: 16, color: STATUS_COL[s], fontWeight: 600 }}>{s}</div>
              ))}
            </div>
            {[85, 60, 30].map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 10 }}>
                <div style={{ width: 200, height: 16, borderRadius: 4, background: '#EEE' }} />
                <div style={{ flex: 1, height: 10, borderRadius: 5, background: '#EEE' }}>
                  <div style={{ width: `${p}%`, height: '100%', borderRadius: 5, background: STATUS_COL[(['On Track', 'At Risk', 'Delayed'] as Status[])[i]] }} />
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
              {[
                ['Status filters', 25.68],
                ['Clickable project details', 27.0],
                ['Needs leadership attention', 30.96],
              ].map(([l, at]) => (
                <span key={l as string} className="kit-tag" style={{ fontSize: 16, ...enter(t, at as number, { y: 0, scale: 0.6, easing: BACK }) }}>{l as string}</span>
              ))}
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — The data */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 33.2, { y: 14 })}>Step 1 · Start with your data</div>
        <div className="kit-h2" style={{ fontSize: 60, ...enter(t, 33.4, { y: 24 }) }}>
          Six projects, <span className="kit-mark" style={markStyle(t, 46.56)}>one snapshot.</span>
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 40, overflow: 'hidden', ...enter(t, 34.0, { y: 30 }) }}>
          <div style={{ display: 'flex', background: '#1F3B2C', color: '#fff', fontSize: 19, fontWeight: 700, letterSpacing: '.04em' }}>
            {[
              ['Project', 340, 36.72, 37.9],
              ['Owner', 200, 38.2, 39.0],
              ['Progress', 140, 39.04, 39.7],
              ['Status', 180, 39.76, 41.7],
              ['Deadline', 180, 41.8, 42.9],
              ['Blocker / Next Step', 0, 42.96, 45.6],
            ].map(([h, w, a, b]) => (
              <div key={h as string} style={{ width: (w as number) || undefined, flex: w ? 'none' : 1, padding: '14px 18px', boxShadow: t >= (a as number) && t < (b as number) ? `inset 0 -6px 0 ${LIME}` : 'none' }}>
                {h as string}
              </div>
            ))}
          </div>
          {ROWS.map((r, i) => (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', fontSize: 21, borderTop: `1px solid ${LINE}`, ...enter(t, 34.6 + i * 0.18, { x: -20, y: 0, dur: 0.5 }) }}>
              <div style={{ width: 340, padding: '13px 18px', fontWeight: 600, background: colOn(t, 36.72, 37.9) }}>{r.name}</div>
              <div style={{ width: 200, padding: '13px 18px', background: colOn(t, 38.2, 39.0) }}>{r.owner}</div>
              <div style={{ width: 140, padding: '13px 18px', background: colOn(t, 39.04, 39.7) }}>{r.pct}%</div>
              <div style={{ width: 180, padding: '13px 18px', background: colOn(t, 39.76, 41.7) }}>
                <StatusChip s={r.status} size={17} />
              </div>
              <div style={{ width: 180, padding: '13px 18px', background: colOn(t, 41.8, 42.9) }}>{r.due}</div>
              <div style={{ flex: 1, padding: '13px 18px', minWidth: 0, background: colOn(t, 42.96, 45.6) }}>
                {r.note ? (
                  <div style={{ fontSize: 17, color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.note}</div>
                ) : (
                  <div style={{ height: 12, width: `${55 + ((i * 17) % 35)}%`, borderRadius: 6, background: '#ECEDE8' }} />
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 26 }}>
          <span className="kit-tag" style={enter(t, 40.1, { y: 0, scale: 0.6, easing: BACK })}>Statuses assigned by hand</span>
          <span className="kit-tag" style={enter(t, 46.56, { y: 0, scale: 0.6, easing: BACK })}>Snapshot · October 28, 2026</span>
        </div>
      </Scene>

      {/* 4 — Work + attach + @Sites (04) */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={50.6}
          src={shot(S04)}
          cursor={[
            { at: 51.0, x: 1900, y: 600 },
            { at: 53.5, x: 1596, y: 52, click: true, dur: 0.7 },
            { at: 54.9, x: 775, y: 1087, click: true, dur: 0.6 },
            { at: 56.4, x: 1300, y: 1250, dur: 0.8 },
          ]}
          cam={[
            { at: 56.2, x: 1150, y: 700, s: 1.55, dur: 1.0 },
            { at: 59.5, x: 1000, y: 690, s: 2.1, dur: 1.0 },
          ]}
          rings={[
            { at: 54.3, until: 55.2, x: 1479, y: 17, w: 235, h: 69 },
            { at: 56.6, until: 59.4, x: 749, y: 361, w: 318, h: 242 },
            { at: 61.4, x: 760, y: 665, w: 113, h: 36, spot: true },
          ]}
          steps={[
            { at: 54.12, text: 'Select Work' },
            { at: 55.44, text: 'Attach the Excel file' },
            { at: 59.56, text: 'Type @Sites, then pick Sites' },
          ]}
        />
      </Scene>

      {/* 5 — The prompt (04) */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={65.3}
          src={shot(S04)}
          cam={[
            { at: 65.3, x: 1460, y: 820, s: 1.75, dur: 0.01 },
            { at: 72.9, x: 1460, y: 900, s: 1.75, dur: 1.2 },
          ]}
          rings={[
            { at: 69.36, until: 73.7, x: 760, y: 662, w: 1430, h: 92 },
            { at: 73.96, until: 77.7, x: 760, y: 815, w: 1377, h: 50 },
            { at: 77.88, until: 80.6, x: 760, y: 918, w: 1400, h: 100 },
          ]}
          steps={[
            { at: 66.48, text: 'Audience: a department manager' },
            { at: 73.96, text: 'What to show' },
            { at: 77.88, text: 'What it should do' },
          ]}
        />
      </Scene>

      {/* 6 — The guardrails (05, prompt column) */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={80.6}
          src={shot(S05)}
          cam={[
            { at: 80.6, x: 700, y: 640, s: 1.9, dur: 0.01 },
            { at: 89.2, x: 2300, y: 450, s: 1.9, dur: 1.2 },
          ]}
          rings={[
            { at: 82.64, until: 88.9, x: 466, y: 655, w: 645, h: 200, spot: true },
            { at: 89.52, x: 2405, y: 425, w: 395, h: 50 },
          ]}
          steps={[
            { at: 82.64, text: 'Use only my data · "Not provided"' },
            { at: 89.52, text: 'Snapshot date shown' },
          ]}
        />
      </Scene>

      {/* 7 — Why it works */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 92.1, { y: 14 })}>Step 2 · Why this prompt works</div>
        <div className="kit-h2" style={enter(t, 92.3, { dur: 0.9, y: 30 })}>
          Say who it's for, what to show, <span className="kit-mark" style={markStyle(t, 96.4)}>what it should do.</span>
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 56 }}>
          {[
            ['Audience', 'Department manager', 93.6],
            ['Information', 'Progress, deadlines, statuses', 94.48],
            ['Interactive features', 'Filters, clickable details', 96.4],
          ].map(([h, s, at]) => (
            <div key={h as string} className="kit-card kit-ui" style={{ flex: 1, padding: '26px 30px', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <div style={{ fontSize: 32, fontWeight: 700 }}>{h as string}</div>
              <div style={{ fontSize: 24, color: MUTED, marginTop: 8 }}>{s as string}</div>
            </div>
          ))}
        </div>
        <div className="kit-card kit-ui" style={{ marginTop: 26, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 26, borderColor: t >= 100.2 ? LIME : LINE, ...enter(t, 98.4, { y: 30 }) }}>
          <Toggle on={prog(t, 100.24, 0.4)} />
          <div>
            <div style={{ fontSize: 32, fontWeight: 700 }}>Wait before deploying</div>
            <div style={{ fontSize: 24, color: MUTED, marginTop: 6, ...enter(t, 101.84, { y: 10 }) }}>Without it, ChatGPT may deploy privately as part of building the Site.</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14, ...enter(t, 106.72, { x: 20, y: 0 }) }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: INK, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 30, transform: `scale(${1 - 0.15 * Math.sin(Math.PI * prog(t, 107.0, 0.3))})` }}>↑</div>
            <div style={{ fontSize: 24, color: MUTED, ...enter(t, 107.84, { y: 0 }) }}>Generating{'.'.repeat(1 + (Math.floor(t * 3) % 3))}</div>
          </div>
        </div>
      </Scene>

      {/* 8 — Status counts (05) */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={110.1}
          src={shot(S05)}
          cam={[{ at: 110.1, x: 2040, y: 720, s: 1.6, dur: 0.01 }]}
          rings={[
            { at: 112.72, until: 114.4, x: 1263, y: 592, w: 348, h: 207, spot: true },
            { at: 116.16, until: 117.4, x: 1640, y: 592, w: 265, h: 207 },
            { at: 117.52, until: 118.7, x: 1937, y: 592, w: 265, h: 207 },
            { at: 118.8, until: 119.9, x: 2232, y: 592, w: 265, h: 207 },
            { at: 120.0, x: 2529, y: 592, w: 266, h: 207 },
          ]}
          steps={[
            { at: 111.96, text: 'All six projects' },
            { at: 114.68, text: '3 On Track · 1 At Risk · 1 Delayed · 1 Complete' },
          ]}
        />
      </Scene>

      {/* 9 — Filter: Delayed (05) */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={121.6}
          src={shot(S05)}
          cam={[
            { at: 121.6, x: 2040, y: 720, s: 1.6, dur: 0.01 },
            { at: 121.7, x: 1950, y: 1150, s: 1.8, dur: 0.9 },
          ]}
          cursor={[
            { at: 121.7, x: 2300, y: 1250 },
            { at: 121.95, x: 1993, y: 1077, click: true, dur: 0.6 },
          ]}
          rings={[{ at: 122.56, x: 1930, y: 1050, w: 130, h: 55 }]}
          steps={[{ at: 122.56, text: 'Filter: Delayed' }]}
        />
      </Scene>

      {/* 10 — Project details (06) */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={124.6}
          src={shot(S06)}
          cam={[
            { at: 124.6, x: 2030, y: 820, s: 1.7, dur: 0.01 },
            { at: 133.2, x: 2030, y: 1060, s: 2.0, dur: 1.0 },
          ]}
          rings={[
            { at: 124.88, until: 126.3, x: 1534, y: 488, w: 463, h: 58 },
            { at: 126.8, until: 127.9, x: 1534, y: 720, w: 190, h: 90 },
            { at: 128.08, until: 129.6, x: 1534, y: 864, w: 284, h: 72 },
            { at: 129.92, until: 131.6, x: 2052, y: 720, w: 190, h: 90 },
            { at: 135.28, x: 1534, y: 985, w: 991, h: 173, spot: true },
          ]}
          steps={[
            { at: 124.88, text: 'Process Improvement · Delayed' },
            { at: 131.76, text: 'Open the project' },
            { at: 135.28, text: 'Original Blocker / Next Step note' },
          ]}
        />
      </Scene>

      {/* 11 — At Risk + compare (05) */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={141.1}
          src={shot(S05)}
          cam={[
            { at: 141.1, x: 1950, y: 1150, s: 1.8, dur: 0.01 },
            { at: 147.9, x: 2030, y: 1260, s: 1.45, dur: 1.0 },
          ]}
          cursor={[
            { at: 141.3, x: 2200, y: 1250 },
            { at: 141.72, x: 1814, y: 1077, click: true, dur: 0.6 },
            { at: 146.7, x: 1418, y: 1077, click: true, dur: 0.6 },
            { at: 148.4, x: 2700, y: 1500, dur: 0.8 },
          ]}
          rings={[
            { at: 144.32, until: 146.3, x: 1264, y: 1385, w: 1530, h: 144, spot: true },
            { at: 148.96, until: 150.4, x: 1778, y: 1262, w: 296, h: 270 },
            { at: 150.52, until: 151.1, x: 1300, y: 1262, w: 300, h: 270 },
            { at: 151.16, until: 152.3, x: 2440, y: 1262, w: 175, h: 270 },
            { at: 154.32, x: 2180, y: 1262, w: 175, h: 270, spot: true },
          ]}
          steps={[
            { at: 142.32, text: 'Filter: At Risk' },
            { at: 147.28, text: 'Back to All projects' },
            { at: 148.4, text: 'Compare with the spreadsheet' },
            { at: 154.32, text: 'Statuses come from the spreadsheet' },
          ]}
        />
      </Scene>

      {/* 12 — Snapshot, not live */}
      <Scene t={t} index={11}>
        <div className="kit-label" style={enter(t, 161.9, { y: 14 })}>One thing to remember</div>
        <div className="kit-h2" style={enter(t, 162.1, { dur: 0.9, y: 30 })}>
          An upload is a <span className="kit-mark" style={markStyle(t, 165.36)}>snapshot,</span> not a live feed.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 64 }}>
          {[
            ['Spreadsheet', 163.6, prog(t, 167.88, 0.5) > 0.5],
            ['Site', 168.96, false],
          ].map(([label, at, changed], i) => (
            <React.Fragment key={label as string}>
              {i === 1 && (
                <div style={{ position: 'relative', ...enter(t, 166.3, { y: 0 }) }}>
                  <Arrow t={t} at={166.3} w={200} dashed={t >= 169.44} />
                  <div style={{ position: 'absolute', left: 80, top: -60, ...enter(t, 169.44, { y: 0, scale: 0.5, easing: BACK }) }}>
                    <Cross size={44} />
                  </div>
                </div>
              )}
              <div className="kit-card kit-ui" style={{ width: 560, padding: '26px 30px', ...enter(t, at as number, { y: 30 }) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 28, fontWeight: 700 }}>
                  <FileIcon size={30} accent={i === 0} /> {label as string}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20, fontSize: 24 }}>
                  <span style={{ width: 260 }}>Employee Onboarding</span>
                  <span style={{ padding: '4px 12px', borderRadius: 8, fontWeight: 700, background: changed ? LIME_SOFT : '#F2F2EE', transition: 'none' }}>{changed ? '75%' : '60%'}</span>
                </div>
                <div style={{ fontSize: 20, color: MUTED, marginTop: 16 }}>{i === 0 ? (changed ? 'Edited later' : 'Uploaded Oct 28') : 'Snapshot · Oct 28, 2026'}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="kit-ui" style={{ marginTop: 44, fontSize: 30, display: 'flex', alignItems: 'center', gap: 16, ...enter(t, 171.36, { y: 16 }) }}>
          <Spark size={30} /> For live reporting: a <b>supported data connection</b> or an <b>update process</b>.
        </div>
      </Scene>

      {/* 13 — Follow-up prompt (07) */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={176.8}
          src={shot(S07)}
          cam={[
            { at: 176.8, x: 1000, y: 1150, s: 1.3, dur: 0.01 },
            { at: 179.3, x: 640, y: 1260, s: 2.1, dur: 1.2 },
          ]}
          cursor={[
            { at: 196.4, x: 900, y: 1400 },
            { at: 198.2, x: 1081, y: 1456, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 179.84, until: 182.4, x: 150, y: 1150, w: 990, h: 360 },
            { at: 183.76, until: 188.9, x: 175, y: 1188, w: 900, h: 115 },
            { at: 189.12, until: 193.6, x: 175, y: 1245, w: 900, h: 90 },
            { at: 193.84, x: 175, y: 1298, w: 900, h: 90 },
          ]}
          steps={[
            { at: 179.84, text: 'Same conversation' },
            { at: 183.2, text: '"Needs Leadership Attention"' },
            { at: 193.84, text: 'Keep existing data unchanged' },
          ]}
        />
      </Scene>

      {/* 14 — Needs Leadership Attention (08) */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={199.95}
          src={shot(S08)}
          cam={[
            { at: 199.95, x: 2030, y: 1080, s: 1.65, dur: 0.01 },
            { at: 213.2, x: 2030, y: 1350, s: 1.55, dur: 1.0 },
          ]}
          rings={[
            { at: 202.56, until: 205.4, x: 1263, y: 858, w: 610, h: 50 },
            { at: 205.68, until: 208.3, x: 1263, y: 989, w: 750, h: 353, spot: true },
            { at: 208.44, until: 210.6, x: 2043, y: 989, w: 752, h: 353, spot: true },
            { at: 211.36, until: 212.9, x: 1290, y: 1205, w: 700, h: 105 },
            { at: 211.36, until: 212.9, x: 2070, y: 1205, w: 700, h: 105 },
            { at: 215.24, x: 1290, y: 1445, w: 300, h: 100 },
          ]}
          steps={[
            { at: 202.56, text: 'New section added' },
            { at: 204.4, text: 'Exactly two projects' },
            { at: 211.36, text: 'Notes match the spreadsheet' },
            { at: 213.6, text: 'All six still in the overview' },
          ]}
        />
      </Scene>

      {/* 15 — Deploy privately (08, result card) */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          {...WIN_SIDE}
          t={t}
          start={220.3}
          src={shot(S08)}
          cam={[{ at: 220.3, x: 640, y: 1020, s: 2.3, dur: 0.01 }]}
          cursor={[
            { at: 230.4, x: 500, y: 1250 },
            { at: 231.3, x: 835, y: 1021, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 225.12, until: 230.6, x: 300, y: 1028, w: 280, h: 40, spot: true },
            { at: 230.72, x: 144, y: 943, w: 991, h: 159 },
          ]}
          steps={[
            { at: 225.12, text: 'Only visible to you' },
            { at: 232.0, text: 'Open the live link' },
          ]}
        />
        <div style={{ position: 'absolute', left: 1220, right: 80, top: 190, display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div className="kit-label" style={{ margin: 0, ...enter(t, 220.5, { y: 14 }) }}>Step 5 · Deploy</div>
          <div className="kit-card kit-ui" style={{ padding: '20px 24px', fontSize: 25, lineHeight: 1.4, background: '#F7F8F4', ...enter(t, 221.6, { y: 20 }) }}>
            {typed(t, 222.3, 'Deploy the current version privately. Keep access restricted to me.', 2.4)}
          </div>
          <SideItem t={t} at={228.88}>ChatGPT confirms and gives the live URL</SideItem>
          <SideItem t={t} at={233.04}>Sign in if prompted</SideItem>
          <SideItem t={t} at={236.16}>Email verification may be required</SideItem>
        </div>
      </Scene>

      {/* 16 — Review access (09, email removed) */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          {...WIN_SIDE}
          t={t}
          start={239.0}
          src={shot(S09)}
          cam={[
            { at: 239.0, x: 1440, y: 778, s: 1, dur: 0.01 },
            { at: 241.9, x: 1440, y: 780, s: 1.7, dur: 1.0 },
          ]}
          cursor={[
            { at: 239.3, x: 2300, y: 400 },
            { at: 240.0, x: 2621, y: 52, click: true, dur: 0.64 },
            { at: 241.6, x: 2000, y: 1300, dur: 0.8 },
          ]}
          rings={[
            { at: 240.64, until: 241.7, x: 2534, y: 20, w: 173, h: 64 },
            { at: 253.36, until: 255.2, x: 976, y: 662, w: 363, h: 60, spot: true },
            { at: 255.28, until: 257.6, x: 976, y: 835, w: 928, h: 72, spot: true },
            { at: 260.6, until: 264.4, x: 976, y: 480, w: 928, h: 74, spot: true },
          ]}
          steps={[
            { at: 240.64, text: 'Share' },
            { at: 253.36, text: 'Only those invited' },
            { at: 255.84, text: 'Owner only' },
            { at: 260.6, text: 'Add the right audience' },
          ]}
        />
        <div style={{ position: 'absolute', left: 1220, right: 80, top: 190, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div className="kit-label" style={{ margin: 0, ...enter(t, 239.2, { y: 14 }) }}>Step 5 · Review access</div>
          <SideItem t={t} at={242.96} size={26}>Deploying doesn't make the Site public</SideItem>
          <SideItem t={t} at={245.76} size={26}>New Sites are private by default</SideItem>
          <SideItem t={t} at={248.08} size={26}><span className="kit-muted">Workspace admins may also have access</span></SideItem>
          <SideItem t={t} at={253.36} icon="check" size={26}>Link access: Only those invited</SideItem>
          <SideItem t={t} at={255.84} icon="check" size={26}>Only the owner is listed</SideItem>
          <SideItem t={t} at={260.8} size={26}>Share with the right audience, within your permissions</SideItem>
          <SideItem t={t} at={267.84} icon="check" size={26}>Confirm a colleague can open it with their own account</SideItem>
        </div>
      </Scene>

      {/* 17 — Recap */}
      <Scene t={t} index={16}>
        <div className="kit-label" style={enter(t, 271.6, { y: 14 })}>Recap</div>
        <div className="kit-h2" style={enter(t, 271.8, { dur: 0.9, y: 30 })}>
          From spreadsheet to <span className="kit-mark" style={markStyle(t, 274.24)}>interactive dashboard.</span>
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 70 }}>
          {[
            ['Built', 'From one prompt', 273.6],
            ['Tested', 'Filters, details, figures', 275.32],
            ['Refined', 'With a follow-up prompt', 276.16],
            ['Deployed', 'With controlled access', 278.44],
          ].map(([h, s, at]) => (
            <div key={h as string} className="kit-card kit-ui" style={{ flex: 1, padding: '28px 30px', ...enter(t, at as number, { y: 30, easing: BACK }) }}>
              <Check size={40} />
              <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14 }}>{h as string}</div>
              <div style={{ fontSize: 24, color: MUTED, marginTop: 6 }}>{s as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 18 — Practical notes */}
      <Scene t={t} index={17}>
        <div className="kit-label" style={enter(t, 281.0, { y: 14 })}>Practical notes</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px 26px', marginTop: 10 }}>
          {[
            ['Start small', 'A clear audience and a few features', 283.36],
            ['Build iteratively', 'Test before adding more', 289.76],
            ['Control deployment', 'Ask ChatGPT to wait', 293.36],
            ['Verify the data', 'Check against the source', 295.92],
            ['Remember the snapshot', 'An upload is not a live connection', 298.48],
            ['Review access', 'Check sharing before inviting others', 303.44],
            ['Assign an owner', 'Someone maintains and refreshes it', 306.72],
          ].map(([h, s, at]) => {
            const on = t >= (at as number) && t < (at as number) + 3.6;
            return (
              <div key={h as string} className="kit-card kit-ui" style={{ padding: '20px 26px', display: 'flex', alignItems: 'center', gap: 20, borderColor: on ? LIME : LINE, background: on ? '#FAFDF6' : '#fff', ...enter(t, at as number, { y: 24 }) }}>
                <Check size={34} />
                <div>
                  <div style={{ fontSize: 30, fontWeight: 700 }}>{h as string}</div>
                  <div style={{ fontSize: 22, color: MUTED, marginTop: 2 }}>{s as string}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 19 — Plans and availability */}
      <Scene t={t} index={18} padStyle={{ opacity: 1 - prog(t, 335.3, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 311.8, { y: 14 })}>Plans and availability</div>
        <div className="kit-h2" style={enter(t, 312.0, { dur: 0.9, y: 30 })}>
          Who can use <span className="kit-mark" style={markStyle(t, 313.28)}>ChatGPT Sites</span>
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 50, flexWrap: 'wrap' }}>
          {[
            ['Plus', 314.64, true],
            ['Pro', 315.28, true],
            ['Business', 316.72, true],
            ['Enterprise', 317.36, true],
            ['Free', 319.28, false],
            ['Go', 319.84, false],
          ].map(([p, at, ok]) => (
            <div key={p as string} className="kit-pill" style={{ fontSize: 28, color: ok ? INK : MUTED, borderColor: ok ? LIME : LINE, ...enter(t, at as number, { y: 0, scale: 0.7, easing: BACK }) }}>
              {ok ? <Check size={28} /> : <Cross size={28} />} {p as string}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 50 }}>
          <SideItem t={t} at={321.92} size={30}>Building or editing Sites counts toward <b>Codex usage</b></SideItem>
          <SideItem t={t} at={325.76} size={30}>Hosting currently included with Plus and Pro; Enterprise hosting charges currently waived</SideItem>
          <SideItem t={t} at={331.84} size={30}><span className="kit-muted">Usage and storage limits still apply</span></SideItem>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player and drives the frame from it).
export const ChatGPTSites: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CHATGPT_SITES_TITLE_FRAMES}>
      <TitleCardGreen label="CHATGPT" title="ChatGPT Sites" subtitle="Turn a spreadsheet into an interactive dashboard" />
    </Sequence>
    <Sequence from={CHATGPT_SITES_TITLE_FRAMES}>
      <ChatGPTSitesBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);

