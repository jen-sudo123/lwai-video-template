import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { AppWindow, Arrow, BACK, Check, Cross, FileIcon, GREEN, KIT_CSS, LIME, LIME_SOFT, LINE, MUTED, enter, makeScene, markStyle, prog } from '../kit';

loadSerif();
loadSans();

// Claude Slides — custom screenshot demo (Lead with AI), built with src/kit (sibling of ChatGPTSlides.tsx).
// Every cue is in SECONDS of the VO (audio/claude-slides.mp3, Daan on ElevenLabs v4, take A, 271.1s),
// from the Scribe word timestamps in src/data/claude-slides.transcript.json. A 90-frame green title card
// opens the video; the VO and every scene start after it. Screenshots are shown whole (no camera zoom)
// and captions carry no step numbers.
//
// Screenshots: claude-slides/images/02..23 (1920x958, except 19 = 1920x1080). Slide footers are painted out,
// the sidebar Recents list and the owner email in 13 are blurred; untouched originals are in images-orig/.
//
//  #  scene                                start   VO cue
//  1  Same report every week               0.00    "Every week, the same report."
//  2  Beside your chat (04)                12.42   "The deck sits right next to your chat."
//  3  The demo                             20.80   "Here's how it works."
//  4  Attach your materials (02)           32.54   "Attach your materials."
//  5  Review: building (03)                86.56   "Review the draft."
//  6  Review: Expand (04)                  91.00   "Use Expand for a closer look."
//  7  Review: overview (05)                93.96   "In our test, the deck kept…"
//  8  Review: owners and dates (06)        101.02  "Now check every owner, date…"
//  9  Review: $1,200 awaiting (07)         110.00  "kept the proposed $1,200 copy review…"
//  10 Review: missing details (08)         114.60  "It also flagged the details…"
//  11 Ask for a change (10)                118.44  "Ask for a change in the conversation."
//  12 Edit it yourself (11)                141.92  "Edit it yourself."
//  13 Comment to Claude (12)               162.06  "Send a comment to Claude."
//  14 Manual-mode approval (16)            173.74  "If you're in manual mode…"
//  15 Reply in the thread (17)             182.64  "Claude replies in the comment thread"
//  16 Check the slide (18)                 187.74  "In our test, we asked for bold…"
//  17 Check who has access (13)            198.26  "Check who has access."
//  18 Speaker notes (09)                   210.60  "Present and download."
//  19 Full-screen slideshow (19)           217.32  "Choose Present…"
//  20 Presenter view (20)                  220.46  "or Present with Speaker Notes…"
//  21 Download menu (21)                   228.66  "The Download menu offers…"
//  22 PowerPoint check                     238.18  "In our test, the PowerPoint kept…"
//  23 Export to Google Slides (14)         246.48  "And under Share, Export…"
//  24 Drive permission (15)                250.26  "after you give it permission…"
//  25 For your own report                  253.86  "So for your own recurring report…"
//  26 Closing                              266.36  "Last week's format…"

export const CLAUDE_SLIDES_DURATION_S = 272.4;
export const CLAUDE_SLIDES_TITLE_FRAMES = 90;

const STARTS = [
  0, 12.42, 20.8, 32.54, 86.56, 91.0, 93.96, 101.02, 110.0, 114.6, 118.44, 141.92, 162.06, 173.74, 182.64, 187.74,
  198.26, 210.6, 217.32, 220.46, 228.66, 238.18, 246.48, 250.26, 253.86, 266.36,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;
const TITLE = 'claude.ai';
const TAG = ''; // no step badges

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.CLAUDE_SLIDES_SHOTS.
const shot = (n: string): string =>
  (globalThis as { CLAUDE_SLIDES_SHOTS?: Record<string, string> }).CLAUDE_SLIDES_SHOTS?.[n] ??
  staticFile(`claude-slides/images/${n}.png`);

const S02 = '02-attached-files-and-prompt';
const S03 = '03-slide-editor-generating';
const S04 = '04-four-slide-draft-beside-chat';
const S05 = '05-overview-before-edit';
const S06 = '06-progress-owners-and-missing-data';
const S07 = '07-risks-and-pending-approvals';
const S08 = '08-priorities-deadlines-dependencies';
const S09 = '09-speaker-notes-visible';
const S10 = '10-conversation-scope-edit-result';
const S11 = '11-direct-text-edit-properties';
const S12 = '12-selected-table-comment-send-to-claude';
const S13 = '13-share-dialog-private';
const S14 = '14-share-export-google-slides';
const S15 = '15-google-drive-permission-request';
const S16 = '16-comment-edit-manual-approval';
const S17 = '17-comment-edit-completed';
const S18 = '18-status-column-formatting-result';
const S19 = '19-native-full-screen-presentation';
const S20 = '20-presenter-notes-clock-current-next';
const S21 = '21-download-menu-all-formats';

const Row: React.FC<{ t: number; at: number; children: React.ReactNode; bad?: boolean }> = ({ t, at, children, bad }) => (
  <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 38, ...enter(t, at, { x: -30, y: 0, easing: BACK }) }}>
    {bad ? <Cross size={44} /> : <Check size={44} />}
    <div>{children}</div>
  </div>
);

const FileCard: React.FC<{ t: number; at: number; name: string; role: string; roleAt: number; accent?: boolean; width?: number }> = ({ t, at, name, role, roleAt, accent, width = 500 }) => (
  <div className="kit-card kit-ui" style={{ width, padding: '30px 32px', borderColor: accent ? GREEN : LINE, background: accent ? LIME_SOFT : '#fff', ...enter(t, at, { y: 40, easing: BACK }) }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
      <FileIcon size={46} accent={accent} />
      {name}
    </div>
    <div style={{ marginTop: 18, fontSize: 26, color: accent ? GREEN : MUTED, ...enter(t, roleAt, { y: 10 }) }}>{role}</div>
  </div>
);

const ClaudeSlidesBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/claude-slides.mp3')} />}

      {/* 1 — Same report every week */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Claude Slides</div>
        <div className="kit-h1" style={enter(t, 0.2, { dur: 0.9, y: 34 })}>
          Every week, <span className="kit-mark" style={markStyle(t, 1.24)}>the same report.</span>
        </div>
        <p className="kit-body kit-muted" style={{ fontSize: 40, marginTop: 24, ...enter(t, 2.52, { y: 14 }) }}>Same layout, new numbers.</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 34, marginTop: 70 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="kit-pill" style={enter(t, 7.0, { x: -30, y: 0, easing: BACK })}>
              <FileIcon size={32} /> Last week’s deck
            </div>
            <div className="kit-pill" style={enter(t, 8.18, { x: -30, y: 0, easing: BACK })}>
              <FileIcon size={32} /> This week’s notes
            </div>
          </div>
          <Arrow t={t} at={9.4} w={180} />
          <div className="kit-card kit-ui" style={{ padding: '30px 36px', borderColor: GREEN, background: LIME_SOFT, display: 'flex', alignItems: 'center', gap: 20, ...enter(t, 10.18, { scale: 0.7, y: 0, easing: BACK }) }}>
            <FileIcon size={60} accent />
            <div>
              <div className="kit-h3">Editable presentation</div>
              <div style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>Built by Claude</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 2 — Beside your chat */}
      <Scene t={t} index={1} pad={false}>
        <AppWindow
          t={t}
          start={12.42}
          src={shot(S04)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 12.88, until: 14.6, x: 1096, y: 46, w: 820, h: 908 },
            { at: 15.06, until: 15.8, x: 1142, y: 292, w: 732, h: 414 },
                        { at: 17.96, x: 1756, y: 62, w: 26, h: 26 },
          ]}
          steps={[
            { at: 12.88, text: 'Right next to your chat' },
            { at: 15.06, text: 'Review and change it' },
            { at: 17.0, text: 'Add speaker notes' },
            { at: 17.96, text: 'Present' },
          ]}
        />
      </Scene>

      {/* 3 — The demo */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 20.9, { y: 14 })}>The demo</div>
        <div className="kit-h2" style={enter(t, 21.0, { dur: 0.8, y: 30 })}>
          A <span className="kit-mark" style={markStyle(t, 22.84)}>made-up project.</span>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 20, ...enter(t, 24.22, { y: 14 }) }}>
          Website refresh for Northstar Consulting
        </p>
        <div style={{ display: 'flex', gap: 34, marginTop: 60 }}>
          <FileCard t={t} at={27.5} roleAt={28.36} name="Nov 2-6 Weekly Report" role="Earlier report" />
          <FileCard t={t} at={27.88} roleAt={28.6} name="Nov 9-13 Weekly Report" role="Earlier report" />
          <FileCard t={t} at={29.6} roleAt={30.66} name="Nov 14-20 Project Notes" role="New this week" accent />
        </div>
      </Scene>

      {/* 4 — Attach your materials */}
      <Scene t={t} index={3} pad={false}>
        <AppWindow
          t={t}
          start={32.54}
          src={shot(S02)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          cursor={[
            { at: 34.6, x: 1100, y: 640 },
            { at: 35.4, x: 795, y: 805, click: true, dur: 0.8 },
            { at: 84.6, x: 1250, y: 805 },
            { at: 85.2, x: 1406, y: 805, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 36.46, until: 40.2, x: 784, y: 790, w: 24, h: 28 },
            { at: 40.34, until: 42.4, x: 782, y: 365, w: 380, h: 124 },
            { at: 42.54, until: 48.9, x: 910, y: 365, w: 252, h: 124 },
            { at: 49.14, until: 54.3, x: 782, y: 365, w: 124, h: 124 },
            { at: 54.5, until: 62.1, x: 786, y: 554, w: 616, h: 84 },
            { at: 64.24, until: 73.1, x: 786, y: 660, w: 616, h: 42 },
            { at: 73.36, until: 84.4, x: 786, y: 722, w: 616, h: 62 },
          ]}
          steps={[
            { at: 32.54, text: 'Attach your materials' },
            { at: 36.46, text: 'Upload or add files' },
            { at: 40.34, text: 'Attach all three files' },
            { at: 42.54, text: 'Earlier reports: history and design' },
            { at: 49.14, text: 'Project notes: this week’s facts' },
            { at: 54.5, text: 'Give each file its role' },
            { at: 64.24, text: 'Four slides, one per topic' },
            { at: 73.36, text: 'Separate done from planned' },
            { at: 83.6, text: 'Speaker notes for each slide' },
          ]}
        />
      </Scene>

      {/* 5 — Review: building */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={86.56}
          src={shot(S03)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[{ at: 88.18, x: 1094, y: 46, w: 822, h: 908 }]}
          steps={[
            { at: 86.56, text: 'Review the draft' },
            { at: 88.18, text: 'Built beside the conversation' },
          ]}
        />
      </Scene>

      {/* 6 — Review: Expand */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={91.0}
          src={shot(S04)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          cursor={[{ at: 91.0, x: 1600, y: 300 }, { at: 91.3, x: 1866, y: 22, click: true, dur: 0.6 }]}
          rings={[{ at: 91.82, x: 1852, y: 8, w: 28, h: 28 }]}
          steps={[{ at: 91.82, text: 'Expand' }]}
        />
      </Scene>

      {/* 7 — Review: overview */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          t={t}
          start={93.96}
          src={shot(S05)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 95.28, until: 98.2, x: 596, y: 180, w: 560, h: 76 },
            { at: 98.52, x: 1196, y: 300, w: 600, h: 316, spot: true },
          ]}
          steps={[
            { at: 95.28, text: 'Reference colors, type and footer kept' },
            { at: 98.52, text: 'A new layout on the overview' },
          ]}
        />
      </Scene>

      {/* 8 — Review: owners and dates */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={101.02}
          src={shot(S06)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 102.1, until: 102.7, x: 756, y: 306, w: 132, h: 256 },
            { at: 102.76, until: 106.0, x: 598, y: 302, w: 1196, h: 282, spot: true },
            { at: 106.56, x: 598, y: 302, w: 1196, h: 282 },
          ]}
          steps={[
            { at: 101.32, text: 'Check owners, dates, amounts, approvals' },
            { at: 106.56, text: 'Completed work kept apart from plans' },
          ]}
        />
      </Scene>

      {/* 9 — Review: $1,200 awaiting approval */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={110.0}
          src={shot(S07)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[{ at: 110.44, x: 598, y: 512, w: 1196, h: 70, spot: true }]}
          steps={[{ at: 110.44, text: '$1,200 review: awaiting approval' }]}
        />
      </Scene>

      {/* 10 — Review: missing details */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          t={t}
          start={114.6}
          src={shot(S08)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[{ at: 115.26, x: 598, y: 610, w: 1196, h: 48, spot: true }]}
          steps={[{ at: 115.26, text: 'Missing details flagged' }]}
        />
      </Scene>

      {/* 11 — Ask for a change in the conversation */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          t={t}
          start={118.44}
          src={shot(S10)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 121.44, until: 127.3, x: 652, y: 324, w: 460, h: 72 },
            { at: 127.5, until: 137.1, x: 652, y: 324, w: 460, h: 72, spot: true },
            { at: 137.7, x: 652, y: 324, w: 460, h: 72 },
          ]}
          steps={[
            { at: 118.44, text: 'Ask for a change in the conversation' },
            { at: 125.62, text: 'Split into two lines' },
            { at: 128.8, text: 'Label bold and dark blue' },
            { at: 130.4, text: 'Page names in black below' },
            { at: 133.2, text: 'Same position, nothing else changed' },
            { at: 137.7, text: 'Updated in place' },
          ]}
        />
      </Scene>

      {/* 12 — Edit it yourself */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          t={t}
          start={141.92}
          src={shot(S11)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          cursor={[
            { at: 145.2, x: 1000, y: 500 },
            { at: 145.6, x: 820, y: 228, click: true, dur: 0.6 },
            { at: 151.2, x: 1660, y: 210, dur: 0.7 },
          ]}
          rings={[
            { at: 146.36, until: 151.5, x: 538, y: 200, w: 980, h: 50 },
            { at: 151.92, until: 159.0, x: 1594, y: 230, w: 288, h: 160 },
            { at: 159.42, x: 538, y: 200, w: 980, h: 50 },
          ]}
          steps={[
            { at: 142.3, text: 'Edit it yourself' },
            { at: 146.18, text: 'Double-click to edit text' },
            { at: 151.92, text: 'Properties: font, weight, size, color' },
            { at: 159.42, text: 'Edits save automatically' },
          ]}
        />
      </Scene>

      {/* 13 — Send a comment to Claude */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          t={t}
          start={162.06}
          src={shot(S12)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          cursor={[
            { at: 164.8, x: 1100, y: 800 },
            { at: 165.4, x: 1066, y: 926, click: true, dur: 0.7 },
            { at: 166.8, x: 1200, y: 492, click: true, dur: 0.7 },
            { at: 171.8, x: 1500, y: 640 },
            { at: 172.0, x: 1513, y: 656, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 166.1, until: 167.3, x: 1050, y: 910, w: 32, h: 32 },
            { at: 167.6, until: 168.5, x: 1146, y: 470, w: 88, h: 40 },
            { at: 168.64, until: 170.6, x: 1238, y: 498, w: 296, h: 128 },
            { at: 170.72, until: 172.4, x: 1248, y: 642, w: 142, h: 28, spot: true },
            { at: 172.58, x: 1500, y: 642, w: 28, h: 28 },
          ]}
          steps={[
            { at: 162.24, text: 'Send a comment to Claude' },
            { at: 166.04, text: 'Turn on Comment' },
            { at: 167.38, text: 'Click the element' },
            { at: 168.64, text: 'Type your instruction' },
            { at: 170.72, text: 'Keep Send to Claude checked' },
            { at: 172.58, text: 'Submit' },
          ]}
        />
      </Scene>

      {/* 14 — Manual-mode approval */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          t={t}
          start={173.74}
          src={shot(S16)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          cursor={[{ at: 180.2, x: 600, y: 760 }, { at: 180.6, x: 742, y: 838, click: true, dur: 0.7 }]}
          rings={[
            { at: 175.62, until: 178.5, x: 316, y: 360, w: 150, h: 28 },
            { at: 178.72, until: 180.8, x: 302, y: 540, w: 500, h: 322 },
            { at: 181.0, x: 696, y: 824, w: 92, h: 30, spot: true },
          ]}
          steps={[
            { at: 174.2, text: 'Manual mode: Claude may pause' },
            { at: 178.72, text: 'Review the proposed change' },
            { at: 181.0, text: 'Allow once' },
          ]}
        />
      </Scene>

      {/* 15 — Reply in the thread */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          t={t}
          start={182.64}
          src={shot(S17)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[{ at: 182.98, x: 1270, y: 636, w: 272, h: 148, spot: true }]}
          steps={[
            { at: 182.98, text: 'Claude replies in the thread' },
            { at: 185.46, text: 'Always check the slide itself' },
          ]}
        />
      </Scene>

      {/* 16 — Check the slide */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          t={t}
          start={187.74}
          src={shot(S18)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[{ at: 189.42, x: 1452, y: 426, w: 282, h: 156, spot: true }]}
          steps={[
            { at: 188.8, text: 'Asked for bold, dark blue' },
            { at: 192.32, text: 'Blue, but not bold' },
            { at: 194.8, text: 'The reply said both were done' },
          ]}
        />
      </Scene>

      {/* 17 — Check who has access */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          t={t}
          start={198.26}
          src={shot(S13)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 200.8, until: 202.8, x: 1470, y: 50, w: 446, h: 410 },
            { at: 202.96, until: 205.6, x: 1504, y: 310, w: 122, h: 36, spot: true },
            { at: 206.74, until: 207.7, x: 1494, y: 150, w: 388, h: 32 },
            { at: 207.86, x: 1504, y: 310, w: 122, h: 36 },
          ]}
          steps={[
            { at: 198.26, text: 'Check who has access' },
            { at: 202.96, text: 'A new deck starts as Only you' },
            { at: 206.74, text: 'Add people' },
            { at: 207.86, text: 'Or change general access' },
          ]}
        />
      </Scene>

      {/* 18 — Speaker notes */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={210.6}
          src={shot(S09)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          cursor={[{ at: 212.0, x: 700, y: 300 }, { at: 212.3, x: 420, y: 76, click: true, dur: 0.7 }]}
          rings={[
            { at: 213.0, until: 214.0, x: 394, y: 60, w: 70, h: 30 },
            { at: 214.1, x: 528, y: 802, w: 800, h: 160, spot: true },
          ]}
          steps={[
            { at: 210.6, text: 'Present and download' },
            { at: 213.0, text: 'View' },
            { at: 214.1, text: 'Speaker notes under each slide' },
          ]}
        />
      </Scene>

      {/* 19 — Full-screen slideshow */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow t={t} start={217.32} src={shot(S19)} imgH={1080} width={1380} title={TITLE} stepTag={TAG} steps={[{ at: 217.7, text: 'Present: full-screen slideshow' }]} />
      </Scene>

      {/* 20 — Presenter view */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          t={t}
          start={220.46}
          src={shot(S20)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 224.04, until: 224.7, x: 1104, y: 70, w: 800, h: 540 },
            { at: 224.84, until: 225.6, x: 90, y: 14, w: 150, h: 36 },
            { at: 225.76, x: 4, y: 676, w: 1090, h: 278 },
          ]}
          steps={[
            { at: 220.86, text: 'Present with speaker notes' },
            { at: 224.04, text: 'Your notes' },
            { at: 224.84, text: 'A timer' },
            { at: 225.76, text: 'Previous, current and next slides' },
          ]}
        />
      </Scene>

      {/* 21 — Download menu */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          t={t}
          start={228.66}
          src={shot(S21)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 229.0, until: 230.1, x: 1500, y: 96, w: 248, h: 186 },
            { at: 230.2, until: 231.1, x: 1502, y: 100, w: 244, h: 26 },
            { at: 231.26, until: 232.2, x: 1502, y: 128, w: 244, h: 26 },
            { at: 232.34, until: 234.1, x: 1502, y: 156, w: 244, h: 26 },
            { at: 234.28, x: 1502, y: 194, w: 244, h: 52 },
          ]}
          steps={[
            { at: 228.8, text: 'Download menu' },
            { at: 230.2, text: 'PDF' },
            { at: 231.26, text: 'Web page' },
            { at: 232.34, text: 'Current slide as an image' },
            { at: 234.28, text: 'PowerPoint: current or basic fonts' },
          ]}
        />
      </Scene>

      {/* 22 — PowerPoint check */}
      <Scene t={t} index={21}>
        <div className="kit-label" style={enter(t, 238.3, { y: 14 })}>In our test</div>
        <div className="kit-h2" style={{ marginBottom: 60, ...enter(t, 238.4, { dur: 0.8, y: 30 }) }}>
          The PowerPoint <span className="kit-mark" style={markStyle(t, 239.76)}>stayed editable.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Row t={t} at={240.26}>Editable text</Row>
          <Row t={t} at={241.68}>Tables kept as real tables</Row>
          <Row t={t} at={243.82}>Speaker notes on all four slides</Row>
        </div>
      </Scene>

      {/* 23 — Export to Google Slides */}
      <Scene t={t} index={22} pad={false}>
        <AppWindow
          t={t}
          start={246.48}
          src={shot(S14)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[
            { at: 247.74, until: 249.0, x: 1686, y: 104, w: 196, h: 36 },
            { at: 249.18, x: 1500, y: 700, w: 380, h: 44, spot: true },
          ]}
          steps={[
            { at: 247.0, text: 'Share, then Export' },
            { at: 249.18, text: 'Google Slides' },
          ]}
        />
      </Scene>

      {/* 24 — Drive permission */}
      <Scene t={t} index={23} pad={false}>
        <AppWindow
          t={t}
          start={250.26}
          src={shot(S15)}
          imgH={IMG_H}
          title={TITLE}
          stepTag={TAG}
          rings={[{ at: 250.88, x: 1170, y: 380, w: 404, h: 330, spot: true }]}
          steps={[{ at: 250.88, text: 'Give permission to use Google Drive' }]}
        />
      </Scene>

      {/* 25 — For your own report */}
      <Scene t={t} index={24}>
        <div className="kit-label" style={enter(t, 254.0, { y: 14 })}>Your own recurring report</div>
        <div style={{ display: 'flex', gap: 30, marginTop: 10 }}>
          {[
            { at: 256.64, n: 1, h: 'Clear roles', b: 'Tell Claude what each source is for' },
            { at: 259.12, n: 2, h: 'Review the facts', b: 'Owners, dates, amounts, approvals' },
            { at: 261.42, n: 3, h: 'Check every edit', b: 'Whether you made it, or Claude did' },
          ].map((c) => (
            <div key={c.n} className="kit-card kit-ui" style={{ width: 540, padding: '36px 34px', ...enter(t, c.at, { y: 40, easing: BACK }) }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: LIME, color: '#fff', fontWeight: 700, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.n}</div>
              <div className="kit-h3" style={{ marginTop: 24 }}>{c.h}</div>
              <div style={{ marginTop: 14, fontSize: 28, lineHeight: 1.35, color: MUTED }}>{c.b}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 26 — Closing */}
      <Scene t={t} index={25} padStyle={{ opacity: 1 - prog(t, 271.5, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 266.4, { y: 14 })}>Claude Slides</div>
        <div className="kit-h1" style={enter(t, 266.36, { dur: 0.7, y: 30 })}>Last week’s format.</div>
        <div className="kit-h1" style={enter(t, 267.88, { dur: 0.7, y: 30 })}>This week’s facts.</div>
        <div className="kit-h1" style={enter(t, 269.26, { dur: 0.7, y: 30 })}>
          You stay <span className="kit-mark" style={markStyle(t, 270.06)}>the final check.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ClaudeSlides: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CLAUDE_SLIDES_TITLE_FRAMES}>
      <TitleCardGreen label="CLAUDE" title="Claude Slides" />
    </Sequence>
    <Sequence from={CLAUDE_SLIDES_TITLE_FRAMES}>
      <ClaudeSlidesBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
