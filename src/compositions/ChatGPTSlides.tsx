import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { AppWindow, BACK, Check, FileIcon, GREEN, KIT_CSS, LIME, LIME_SOFT, LINE, MUTED, enter, makeScene, markStyle, prog } from '../kit';

loadSerif();
loadSans();

// ChatGPT Slides — custom screenshot demo (Lead with AI), built with src/kit (reference: ClaudeSkills.tsx).
// Every cue is in SECONDS of the VO (audio/chatgpt-slides.mp3, Daan on ElevenLabs v4, take B, 265.7s),
// from the Scribe word timestamps in src/data/chatgpt-slides.transcript.json. A 90-frame green title card
// opens the video; the VO and every scene start after it.
//
// Screenshots: chatgpt-slides/images/01..15 (1920x958, except 14 = 1920x1080). The "FICTIONAL DEMO MATERIAL"
// slide footers are painted out and the owner email in 12 is blurred; untouched originals are in images-orig/.
//
//  #  scene                                start   VO cue
//  1  Notes into a presentation            0.00    "ChatGPT can now turn your notes…"
//  2  The Slides editor (04)               5.02    "It's called ChatGPT Slides…"
//  3  What you can do                      16.64   "Here's what you can do with it"
//  4  The demo: Northstar weekly report    36.56   "Let's see it in action…"
//  5  Step 1: select Work (01)             49.58   "Step one: attach your reference files"
//  6  Step 1: files + prompt (02)          56.64   "then attach all three files"
//  7  Step 2: generating (03)              104.76  "Step two: review the draft"
//  8  Step 2: beside the chat (04)         107.36  "ChatGPT builds the slides…"
//  9  Step 2: full view (05)               114.64  "In our test, the draft followed the brief"
//  10 Step 2: tables (06)                  121.32  "and editable text and tables"
//  11 Step 2: missing details (08)         126.38  "and it flagged details…"
//  12 Check every slide                    128.94  "But before you use the report…"
//  13 Step 3: follow-up prompt (09)        138.20  "Step three: ask for a change…"
//  14 Step 4: select + Comment (10)        168.38  "Step four: send an instruction…"
//  15 Step 4: Send to ChatGPT (11)         180.32  "Type your instruction…"
//  16 Step 4: reply in thread (13)         189.00  "ChatGPT replies right in the comment thread"
//  17 Step 5: Open / Share (09)            198.78  "Step five: open the saved deck…"
//  18 Step 5: Share dialog (12)            213.50  "copy the link…"
//  19 Step 6: Present (09)                 221.78  "Step six: present or export"
//  20 Step 6: slideshow (14)               225.90  "present with or without your notes"
//  21 Step 6: Download menu (15)           228.60  "and the download menu offers…"
//  22 Both exports complete                233.86  "In our test, both the PowerPoint and PDF…"
//  23 Reuse it for your own report         241.72  "So for your own recurring report…"
//  24 Closing                              260.82  "Last week's format, this week's facts…"

export const CHATGPT_SLIDES_DURATION_S = 267.2;
export const CHATGPT_SLIDES_TITLE_FRAMES = 90;

const STARTS = [
  0, 5.02, 16.64, 36.56, 49.58, 56.64, 104.76, 107.36, 114.64, 121.32, 126.38, 128.94, 138.2, 168.38, 180.32, 189.0,
  198.78, 213.5, 221.78, 225.9, 228.6, 233.86, 241.72, 260.82,
];
const Scene = makeScene(STARTS, 0.5);
const IMG_H = 958;
const TITLE = 'chatgpt.com';

// Browser previews can inject the screenshots (e.g. as data URIs) via globalThis.CHATGPT_SLIDES_SHOTS.
const shot = (n: string): string =>
  (globalThis as { CHATGPT_SLIDES_SHOTS?: Record<string, string> }).CHATGPT_SLIDES_SHOTS?.[n] ??
  staticFile(`chatgpt-slides/images/${n}.png`);

const S01 = '01-work-start';
const S02 = '02-source-files-and-prompt';
const S03 = '03-generation-in-progress';
const S04 = '04-four-slide-draft-beside-chat';
const S05 = '05-overview-full-view-before-edit';
const S06 = '06-progress-and-owners';
const S08 = '08-priorities-and-missing-details';
const S09 = '09-direct-work-edit-result';
const S10 = '10-selection-toolbar-no-request-edits';
const S11 = '11-selected-comment-send-to-chatgpt';
const S12 = '12-share-dialog';
const S13 = '13-selected-edit-completed-in-space';
const S14 = '14-native-slideshow';
const S15 = '15-export-menu';

// A numbered row that pops in on its cue word.
const Row: React.FC<{ t: number; at: number; n?: number; children: React.ReactNode; done?: boolean }> = ({ t, at, n, children, done }) => (
  <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 38, ...enter(t, at, { x: -30, y: 0, easing: BACK }) }}>
    {done ? (
      <Check size={44} />
    ) : (
      <div style={{ width: 52, height: 52, borderRadius: 999, background: LIME_SOFT, color: GREEN, fontWeight: 700, fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{n}</div>
    )}
    <div>{children}</div>
  </div>
);

const FileCard: React.FC<{ t: number; at: number; name: string; role: string; roleAt: number; accent?: boolean }> = ({ t, at, name, role, roleAt, accent }) => (
  <div className="kit-card kit-ui" style={{ width: 500, padding: '30px 32px', borderColor: accent ? GREEN : LINE, background: accent ? LIME_SOFT : '#fff', ...enter(t, at, { y: 40, easing: BACK }) }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
      <FileIcon size={46} accent={accent} />
      {name}
    </div>
    <div style={{ marginTop: 18, fontSize: 26, color: accent ? GREEN : MUTED, ...enter(t, roleAt, { y: 10 }) }}>{role}</div>
  </div>
);

const ChatGPTSlidesBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/chatgpt-slides.mp3')} />}

      {/* 1 — Notes into a presentation */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>ChatGPT Slides</div>
        <div className="kit-h1" style={enter(t, 0.3, { dur: 0.9, y: 34 })}>
          Your notes and files,
          <br />
          <span className="kit-mark" style={markStyle(t, 3.8)}>into a presentation.</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 70 }}>
          {[
            ['Notes', 1.88],
            ['Reference files', 2.9],
          ].map(([l, at]) => (
            <div key={l as string} className="kit-pill" style={enter(t, at as number, { y: 20, easing: BACK })}>
              <FileIcon size={32} /> {l}
            </div>
          ))}
        </div>
      </Scene>

      {/* 2 — The Slides editor */}
      <Scene t={t} index={1} pad={false}>
        <AppWindow
          t={t}
          start={5.02}
          src={shot(S04)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="SLIDES"
          rings={[
            { at: 8.2, until: 10.8, x: 900, y: 226, w: 995, h: 558 },
            { at: 11.32, until: 12.1, x: 1112, y: 12, w: 136, h: 28 },
            { at: 12.18, until: 13.3, x: 1603, y: 12, w: 82, h: 28 },
            { at: 14.68, x: 728, y: 12, w: 218, h: 28 },
          ]}
          steps={[
            { at: 8.2, text: 'A dedicated editor' },
            { at: 11.32, text: 'Comment' },
            { at: 12.18, text: 'Present' },
            { at: 14.68, text: 'Saved in ChatGPT Space' },
          ]}
        />
      </Scene>

      {/* 3 — What you can do */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 16.8, { y: 14 })}>What you can do</div>
        <div className="kit-h2" style={{ marginBottom: 54, ...enter(t, 16.9, { dur: 0.8, y: 30 }) }}>
          One deck, <span className="kit-mark" style={markStyle(t, 17.5)}>start to finish.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <Row t={t} at={18.3} n={1}>Create a deck from your files</Row>
          <Row t={t} at={20.52} n={2}>Refine it in the same conversation</Row>
          <Row t={t} at={24.4} n={3}>Comment on an element, send it to ChatGPT</Row>
          <Row t={t} at={29.02} n={4}>Share it from Space</Row>
          <Row t={t} at={30.8} n={5}>Present, or export to PowerPoint, PDF, Google Slides</Row>
        </div>
      </Scene>

      {/* 4 — The demo */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 36.7, { y: 14 })}>The demo</div>
        <div className="kit-h2" style={enter(t, 36.8, { dur: 0.8, y: 30 })}>
          A <span className="kit-mark" style={markStyle(t, 37.82)}>recurring weekly report.</span>
        </div>
        <p className="kit-body kit-muted" style={{ marginTop: 20, ...enter(t, 40.66, { y: 14 }) }}>
          Website refresh for Northstar Consulting
        </p>
        <div style={{ display: 'flex', gap: 34, marginTop: 60 }}>
          <FileCard t={t} at={45.16} roleAt={45.6} name="Nov 2-6 Weekly Report" role="Previous report" />
          <FileCard t={t} at={45.68} roleAt={46.1} name="Nov 9-13 Weekly Report" role="Previous report" />
          <FileCard t={t} at={46.96} roleAt={47.72} name="Nov 14-20 Project Notes" role="New this week" accent />
        </div>
      </Scene>

      {/* 5 — Step 1: select Work */}
      <Scene t={t} index={4} pad={false}>
        <AppWindow
          t={t}
          start={49.58}
          src={shot(S01)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 1"
          cursor={[{ at: 52.6, x: 980, y: 600 }, { at: 54.9, x: 1040, y: 28, click: true, dur: 0.9 }]}
          rings={[{ at: 55.78, x: 980, y: 10, w: 118, h: 32 }]}
          steps={[
            { at: 50.52, text: 'Attach your reference files' },
            { at: 55.2, text: 'Select Work' },
          ]}
        />
      </Scene>

      {/* 6 — Step 1: three files + the prompt */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          t={t}
          start={56.64}
          src={shot(S02)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 1"
          rings={[
            { at: 59.24, until: 61.9, x: 615, y: 246, w: 120, h: 120 },
            { at: 62.12, until: 66.3, x: 745, y: 246, w: 120, h: 120 },
            { at: 66.56, until: 71.4, x: 875, y: 246, w: 120, h: 120 },
            { at: 72.48, until: 79.9, x: 612, y: 446, w: 732, h: 96 },
            { at: 83.06, until: 91.7, x: 612, y: 548, w: 732, h: 46 },
            { at: 92.48, until: 102.6, x: 612, y: 600, w: 732, h: 26 },
          ]}
          cursor={[{ at: 101.6, x: 1180, y: 640 }, { at: 102.4, x: 1343, y: 660, click: true, dur: 0.9 }]}
          steps={[
            { at: 56.64, text: 'Attach all three files' },
            { at: 59.24, text: 'Nov 2-6: historical context' },
            { at: 62.12, text: 'Nov 9-13: the format to keep' },
            { at: 66.56, text: 'Project notes: this week’s facts' },
            { at: 72.48, text: 'Give each file a clear role' },
            { at: 83.06, text: 'Four slides, one per topic' },
            { at: 92.48, text: 'Separate done from planned' },
            { at: 97.62, text: 'Only your facts, flag what’s missing' },
          ]}
        />
      </Scene>

      {/* 7 — Step 2: generating */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow t={t} start={104.76} src={shot(S03)} imgH={IMG_H} title={TITLE} stepTag="STEP 2" steps={[{ at: 105.76, text: 'Review the draft' }]} />
      </Scene>

      {/* 8 — Step 2: beside the conversation, then full view */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          t={t}
          start={107.36}
          src={shot(S04)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 2"
          cursor={[{ at: 111.4, x: 1500, y: 300 }, { at: 112.4, x: 1860, y: 28, click: true, dur: 0.9 }]}
          rings={[
            { at: 108.22, until: 111.5, x: 718, y: 226, w: 1177, h: 558 },
            { at: 112.42, x: 1844, y: 12, w: 34, h: 28 },
          ]}
          steps={[
            { at: 108.22, text: 'Built beside the conversation' },
            { at: 112.42, text: 'Full view' },
          ]}
        />
      </Scene>

      {/* 9 — Step 2: full view, four slides in the reference style */}
      <Scene t={t} index={8} pad={false}>
        <AppWindow
          t={t}
          start={114.64}
          src={shot(S05)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 2"
          rings={[
            { at: 117.38, until: 118.5, x: 62, y: 318, w: 160, h: 330 },
            { at: 118.56, x: 400, y: 136, w: 630, h: 116 },
          ]}
          steps={[
            { at: 114.94, text: 'The draft followed the brief' },
            { at: 117.38, text: 'Four slides' },
            { at: 118.56, text: 'Blue, white and black reference style' },
          ]}
        />
      </Scene>

      {/* 10 — Step 2: editable tables, completed work kept apart */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          t={t}
          start={121.32}
          src={shot(S06)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 2"
          rings={[
            { at: 121.68, until: 123.5, x: 405, y: 344, w: 1293, h: 258, spot: true },
            { at: 124.02, x: 400, y: 296, w: 292, h: 36 },
          ]}
          steps={[
            { at: 121.68, text: 'Editable text and tables' },
            { at: 124.02, text: 'Completed work kept apart from plans' },
          ]}
        />
      </Scene>

      {/* 11 — Step 2: missing details flagged */}
      <Scene t={t} index={10} pad={false}>
        <AppWindow
          t={t}
          start={126.38}
          src={shot(S08)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 2"
          rings={[{ at: 126.58, x: 400, y: 685, w: 815, h: 80, spot: true }]}
          steps={[{ at: 126.58, text: 'Missing details flagged' }]}
        />
      </Scene>

      {/* 12 — Check every slide */}
      <Scene t={t} index={11}>
        <div className="kit-label" style={enter(t, 129.1, { y: 14 })}>Before you use it</div>
        <div className="kit-h2" style={{ marginBottom: 60, ...enter(t, 129.2, { dur: 0.8, y: 30 }) }}>
          <span className="kit-mark" style={markStyle(t, 130.78)}>Check every slide</span>
          <br />
          against the latest notes.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px 80px', width: 1200 }}>
          <Row t={t} at={133.62} done>Owners</Row>
          <Row t={t} at={134.28} done>Deadlines</Row>
          <Row t={t} at={135.02} done>Completed work</Row>
          <Row t={t} at={136.26} done>Pending approvals</Row>
        </div>
      </Scene>

      {/* 13 — Step 3: ask for a change in the conversation */}
      <Scene t={t} index={12} pad={false}>
        <AppWindow
          t={t}
          start={138.2}
          src={shot(S09)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 3"
          rings={[
            { at: 147.14, until: 160.5, x: 262, y: 460, w: 416, h: 280 },
            { at: 161.86, x: 948, y: 428, w: 424, h: 50, spot: true },
          ]}
          steps={[
            { at: 139.28, text: 'Ask for a change in the conversation' },
            { at: 149.38, text: 'Split into two lines' },
            { at: 151.22, text: 'Label bold and dark blue' },
            { at: 153.0, text: 'Page names stay black' },
            { at: 155.82, text: 'Edit the existing deck' },
            { at: 161.86, text: 'Updated in place' },
            { at: 164.58, text: 'Text box taller, same position' },
          ]}
        />
      </Scene>

      {/* 14 — Step 4: select the element, click Comment */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          t={t}
          start={168.38}
          src={shot(S10)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 4"
          cursor={[
            { at: 173.6, x: 1250, y: 640 },
            { at: 174.54, x: 1010, y: 448, click: true, dur: 0.8 },
            { at: 177.4, x: 1550, y: 398, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 175.34, until: 177.8, x: 950, y: 428, w: 895, h: 50 },
            { at: 178.14, x: 1506, y: 386, w: 84, h: 24 },
          ]}
          steps={[
            { at: 169.5, text: 'Send an instruction from an element' },
            { at: 174.54, text: 'Select the element' },
            { at: 178.14, text: 'Comment' },
          ]}
        />
      </Scene>

      {/* 15 — Step 4: Send to ChatGPT */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          t={t}
          start={180.32}
          src={shot(S11)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 4"
          cursor={[
            { at: 181.6, x: 1600, y: 680 },
            { at: 182.0, x: 1528, y: 710, click: true, dur: 0.7 },
            { at: 186.8, x: 1814, y: 709, click: true, dur: 0.6 },
          ]}
          rings={[
            { at: 180.6, until: 182.5, x: 1516, y: 500, w: 318, h: 186 },
            { at: 182.68, until: 185.3, x: 1514, y: 698, w: 136, h: 24, spot: true },
            { at: 185.52, until: 187.3, x: 1516, y: 502, w: 80, h: 20 },
            { at: 187.4, x: 1800, y: 695, w: 30, h: 30 },
          ]}
          steps={[
            { at: 180.32, text: 'Type your instruction' },
            { at: 182.68, text: 'Turn on Send to ChatGPT' },
            { at: 185.52, text: 'Adds @ChatGPT' },
            { at: 187.38, text: 'Submit with the arrow' },
          ]}
        />
      </Scene>

      {/* 16 — Step 4: reply in the comment thread */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          t={t}
          start={189.0}
          src={shot(S13)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 4"
          rings={[
            { at: 190.4, until: 194.6, x: 565, y: 612, w: 280, h: 100, spot: true },
            { at: 195.36, x: 495, y: 346, w: 1146, h: 64 },
          ]}
          steps={[
            { at: 189.4, text: 'ChatGPT replies in the thread' },
            { at: 193.14, text: 'and confirms the change' },
            { at: 195.36, text: 'Point at exactly what you mean' },
          ]}
        />
      </Scene>

      {/* 17 — Step 5: Open on the output card, Share */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          t={t}
          start={198.78}
          src={shot(S09)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 5"
          cursor={[
            { at: 205.0, x: 450, y: 320 },
            { at: 205.4, x: 638, y: 205, click: true, dur: 0.8 },
            { at: 212.1, x: 1800, y: 28, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 202.58, until: 205.2, x: 728, y: 12, w: 218, h: 28 },
            { at: 206.16, until: 210.6, x: 608, y: 185, w: 62, h: 36 },
            { at: 212.94, x: 1770, y: 12, w: 66, h: 28 },
          ]}
          steps={[
            { at: 199.96, text: 'Open the saved deck' },
            { at: 202.58, text: 'Saved in ChatGPT Space' },
            { at: 206.16, text: 'Open brings the editor back' },
            { at: 212.94, text: 'Share' },
          ]}
        />
      </Scene>

      {/* 18 — Step 5: Share dialog */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          t={t}
          start={213.5}
          src={shot(S12)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 5"
          cursor={[{ at: 213.4, x: 900, y: 700 }, { at: 213.6, x: 790, y: 634, click: true, dur: 0.6 }]}
          rings={[
            { at: 214.2, until: 216.0, x: 724, y: 615, w: 116, h: 36 },
            { at: 218.1, until: 219.6, x: 726, y: 535, w: 462, h: 40 },
            { at: 219.76, x: 728, y: 359, w: 464, h: 36 },
          ]}
          steps={[
            { at: 213.66, text: 'Copy link, open in a new tab' },
            { at: 218.1, text: 'Who owns the deck' },
            { at: 219.76, text: 'Add people or teams' },
          ]}
        />
      </Scene>

      {/* 19 — Step 6: Present menu */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          t={t}
          start={221.78}
          src={shot(S09)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 6"
          cursor={[{ at: 223.2, x: 1500, y: 200 }, { at: 224.0, x: 1648, y: 28, click: true, dur: 0.8 }]}
          rings={[{ at: 224.8, x: 1603, y: 12, w: 82, h: 28 }]}
          steps={[
            { at: 222.84, text: 'Present or export' },
            { at: 224.8, text: 'Present' },
          ]}
        />
      </Scene>

      {/* 20 — Step 6: slideshow */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow t={t} start={225.9} src={shot(S14)} imgH={1080} width={1380} title={TITLE} stepTag="STEP 6" steps={[{ at: 226.12, text: 'With or without your notes' }]} />
      </Scene>

      {/* 21 — Step 6: Download menu */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          t={t}
          start={228.6}
          src={shot(S15)}
          imgH={IMG_H}
          title={TITLE}
          stepTag="STEP 6"
          rings={[
            { at: 230.2, until: 231.0, x: 1544, y: 92, w: 200, h: 26 },
            { at: 231.08, until: 232.1, x: 1544, y: 128, w: 100, h: 26 },
            { at: 232.18, x: 1544, y: 208, w: 140, h: 28 },
          ]}
          steps={[
            { at: 228.88, text: 'Download menu' },
            { at: 230.2, text: 'PowerPoint (PPTX)' },
            { at: 231.08, text: 'PDF' },
            { at: 232.18, text: 'Open in Google Slides' },
          ]}
        />
      </Scene>

      {/* 22 — Both exports complete */}
      <Scene t={t} index={21}>
        <div className="kit-label" style={enter(t, 234.0, { y: 14 })}>In our test</div>
        <div className="kit-h2" style={{ marginBottom: 60, ...enter(t, 234.1, { dur: 0.8, y: 30 }) }}>
          Both exports, <span className="kit-mark" style={markStyle(t, 236.94)}>all four slides.</span>
        </div>
        <div style={{ display: 'flex', gap: 40 }}>
          {[
            ['Nov 14-20 Weekly Report.pptx', 235.12, true],
            ['Nov 14-20 Weekly Report.pdf', 236.04, false],
          ].map(([name, at, pptx]) => (
            <div key={name as string} className="kit-card kit-ui" style={{ width: 640, padding: '32px 34px', ...enter(t, at as number, { y: 40, easing: BACK }) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
                <FileIcon size={46} accent /> {name as string}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 24, fontSize: 28, ...enter(t, 237.22, { y: 10 }) }}>
                <Check size={34} /> 4 slides
              </div>
              {pptx && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 14, fontSize: 28, ...enter(t, 239.54, { y: 10 }) }}>
                  <Check size={34} /> Editable text and tables
                </div>
              )}
            </div>
          ))}
        </div>
      </Scene>

      {/* 23 — Reuse it */}
      <Scene t={t} index={22}>
        <div className="kit-label" style={enter(t, 241.9, { y: 14 })}>Your own recurring report</div>
        <div style={{ display: 'flex', gap: 30, alignItems: 'stretch', marginTop: 10 }}>
          {[
            { at: 244.38, n: 1, h: 'Two sources', b: [['Last report: the format', 244.92], ['New file: the latest facts', 247.76]] },
            { at: 250.08, n: 2, h: 'Clear roles', b: [['Tell ChatGPT what each file is for', 250.72]] },
            { at: 252.52, n: 3, h: 'Review', b: [['Check the draft against the notes', 253.2]] },
            { at: 255.4, n: 4, h: 'Refine', b: [['In the conversation', 256.66], ['Or a comment to ChatGPT', 257.94]] },
          ].map((c) => (
            <div key={c.n} className="kit-card kit-ui" style={{ width: 400, padding: '34px 30px', ...enter(t, c.at, { y: 40, easing: BACK }) }}>
              <div style={{ width: 56, height: 56, borderRadius: 999, background: LIME, color: '#fff', fontWeight: 700, fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{c.n}</div>
              <div className="kit-h3" style={{ marginTop: 24 }}>{c.h}</div>
              {c.b.map(([txt, at]) => (
                <div key={txt as string} style={{ marginTop: 16, fontSize: 26, lineHeight: 1.35, color: MUTED, ...enter(t, at as number, { y: 10 }) }}>
                  {txt as string}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Scene>

      {/* 24 — Closing */}
      <Scene t={t} index={23} padStyle={{ opacity: 1 - prog(t, 266.3, 0.8, Easing.in(Easing.quad)) }}>
        <div className="kit-label" style={enter(t, 260.9, { y: 14 })}>ChatGPT Slides</div>
        <div className="kit-h1" style={enter(t, 260.82, { dur: 0.7, y: 30 })}>Last week’s format.</div>
        <div className="kit-h1" style={enter(t, 262.36, { dur: 0.7, y: 30 })}>This week’s facts.</div>
        <div className="kit-h1" style={enter(t, 263.8, { dur: 0.7, y: 30 })}>
          A finished deck <span className="kit-mark" style={markStyle(t, 264.4)}>in minutes.</span>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const ChatGPTSlides: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={CHATGPT_SLIDES_TITLE_FRAMES}>
      <TitleCardGreen label="CHATGPT" title="ChatGPT Slides" />
    </Sequence>
    <Sequence from={CHATGPT_SLIDES_TITLE_FRAMES}>
      <ChatGPTSlidesBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
