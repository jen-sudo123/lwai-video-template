import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { loadFont as loadMono } from '@remotion/google-fonts/IBMPlexMono';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  Arrow,
  AppWindow,
  BACK,
  Check,
  Composer,
  Cross,
  FileIcon,
  FolderIcon,
  GREEN,
  IN_OUT,
  KIT_CSS,
  LIME_SOFT,
  LINE,
  MUTED,
  MenuList,
  RED,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';
import {
  WhatSkillsAre,
  TwoWays,
  Components,
  WhatEachPartDoes,
  ImportOrBuiltIn,
  WhatWeBuild,
  GoodDescription,
  RepeatableProcess,
  AutomaticVsExplicit,
  StartWithRepeats,
  CaptureAndCheck,
} from './gemini-skills-scenes';

loadSerif();
loadSans();
loadMono('normal', { weights: ['400', '500'], subsets: ['latin'] });

// Creating a Skill in Google Gemini — custom screenshot demo (Lead with AI), built with the LWAI demo kit.
// Every cue is in SECONDS of the VO (audio/gemini-skills.mp3, Daan on ElevenLabs v4, 224.72s), taken from
// the word timestamps in src/data/gemini-skills.transcript.json. A 90-frame green title card opens the video.
//
// Screenshots (gemini-skills/images/01..16) are 2880x1556; all coordinates below are in a 2000x1081 space
// (the same image scaled), which is what AppWindow is told via imgW/imgH.
//
//  #  scene                         start   VO cue
//  1  What Skills are               0.00    "In Gemini, Skills let you save instructions…"
//  2  Two ways to use a Skill       14.56   "You can select a Skill yourself…"
//  3  What's in a Skill             23.44   "A Skill includes a name, a description…"
//  4  What each part does           33.40   "The name and description help Gemini decide…"
//  5  Import vs built-in            42.48   "Gemini also supports importing…"
//  6  Sidebar > Customize           50.08   "I'll open Gemini in my browser…"
//  7  Skills tab + page             55.20   "…then the Skills tab."
//  8  Create menu                   66.05   "The Create menu offers three options…"
//  9  What we're building           75.60   "We'll build a Leadership Update Skill…"
//  10 Name + Description            82.72   "For the name, I'll enter…"
//  11 A good description            101.34  "The description explains both…"
//  12 Instructions + CODO           111.76  "Next are the instructions…"
//  13 Repeatable process            121.27  "The instructions should describe…"
//  14 Rules                         127.19  "I'll include rules to preserve…"
//  15 Add files                     142.88  "If needed, Add files lets me include…"
//  16 Save skill                    148.00  "Once the instructions are ready…"
//  17 Installed                     151.75  "Our Skill now appears under Installed."
//  18 @ and select                  155.28  "Let's start a new conversation…"
//  19 Paste the notes               163.04  "Then I'll paste fictional project notes…"
//  20 Check format + figures        167.60  "I'll check the format, figures…"
//  21 Decisions, next steps, gaps   169.60  "…decisions, and next steps. These notes include…"
//  22 No notes                      182.78  "I'll also try a fresh conversation…"
//  23 Automatic vs explicit         192.08  "Gemini can also apply Skills automatically…"
//  24 Refine                        200.84  "To refine a Skill, return to Skills…"
//  25 Closing                       209.32  "That's how you create and test a Skill…"
//  26 Closing line                  219.16  "The value comes from capturing…"

export const GEMINI_SKILLS_DURATION_S = 226.0;
export const GEMINI_SKILLS_TITLE_FRAMES = 90;

const STARTS = [
  0, 14.56, 23.44, 33.4, 42.48, 50.08, 55.2, 66.05, 75.6, 82.72, 101.34, 111.76, 121.27, 127.19, 142.88, 148.0,
  151.75, 155.28, 163.04, 167.6, 169.6, 182.78, 192.08, 200.84, 209.32, 219.16,
];
const Scene = makeScene(STARTS, 0.5);

// Browser previews can inject the screenshots (as data URIs) via globalThis.GEMINI_SKILLS_SHOTS;
// renders always use the files in public/.
const shot = (n: string): string =>
  (globalThis as { GEMINI_SKILLS_SHOTS?: Record<string, string> }).GEMINI_SKILLS_SHOTS?.[n] ??
  staticFile(`gemini-skills/images/${n}.png`);

const WIN = { imgW: 2000, imgH: 1081, width: 1440, title: 'gemini.google.com' } as const;

const GeminiSkillsBody: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/gemini-skills.mp3')} />}

      {/* 1 — What Skills are */}
      <Scene t={t} index={0}>
        <WhatSkillsAre t={t} />
      </Scene>

      {/* 2 — Two ways to use a Skill */}
      <Scene t={t} index={1}>
        <TwoWays t={t} />
      </Scene>

      {/* 3 — What's in a Skill */}
      <Scene t={t} index={2}>
        <Components t={t} />
      </Scene>

      {/* 4 — What each part does */}
      <Scene t={t} index={3}>
        <WhatEachPartDoes t={t} />
      </Scene>

      {/* 5 — Import vs built-in */}
      <Scene t={t} index={4}>
        <ImportOrBuiltIn t={t} />
      </Scene>

      {/* 6 — Sidebar > Customize */}
      <Scene t={t} index={5} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={50.08}
          src={shot('01-gemini-sidebar')}
          cam={[{ at: 52.4, x: 420, y: 260, s: 1.7 }]}
          cursor={[
            { at: 50.5, x: 1100, y: 620 },
            { at: 53.3, x: 110, y: 284, click: true, dur: 0.8 },
          ]}
          rings={[{ at: 54.08, x: 14, y: 263, w: 374, h: 42 }]}
          steps={[
            { at: 50.3, text: 'Open Gemini' },
            { at: 54.08, text: 'Customize' },
          ]}
        />
      </Scene>

      {/* 7 — Skills tab + page */}
      <Scene t={t} index={6} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={55.2}
          src={shot('02-skills-page')}
          cam={[
            { at: 55.2, x: 900, y: 200, s: 1.6, dur: 0.01 },
            { at: 57.2, x: 420, y: 280, s: 1.7 },
            { at: 60.8, x: 1190, y: 520, s: 1.3 },
          ]}
          rings={[
            { at: 55.6, until: 57.2, x: 1010, y: 24, w: 90, h: 46 },
            { at: 59.44, until: 60.9, x: 14, y: 307, w: 374, h: 42 },
            { at: 62.12, until: 63.8, x: 712, y: 300, w: 470, h: 150 },
            { at: 64.0, x: 712, y: 490, w: 960, h: 395 },
          ]}
          steps={[
            { at: 55.6, text: 'Skills tab' },
            { at: 58.72, text: 'Not visible? Check under More' },
            { at: 62.12, text: 'Installed Skills' },
            { at: 63.92, text: 'Example Skills' },
          ]}
        />
      </Scene>

      {/* 8 — Create menu */}
      <Scene t={t} index={7} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={66.05}
          src={shot('03-create-menu')}
          cam={[{ at: 66.5, x: 1480, y: 290, s: 2.2 }]}
          cursor={[
            { at: 66.2, x: 1250, y: 420 },
            { at: 66.3, x: 1585, y: 200, click: true, dur: 0.6 },
            { at: 73.0, x: 1545, y: 318, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 68.88, until: 70.1, x: 1426, y: 243, w: 222, h: 42 },
            { at: 70.24, until: 71.7, x: 1426, y: 293, w: 222, h: 42 },
            { at: 71.84, until: 73.2, x: 1426, y: 343, w: 222, h: 42 },
            { at: 73.7, x: 1426, y: 293, w: 222, h: 42 },
          ]}
          steps={[
            { at: 66.28, text: 'Create' },
            { at: 68.88, text: 'Create with Gemini' },
            { at: 70.24, text: 'Create manually' },
            { at: 71.84, text: 'Upload' },
            { at: 73.6, text: 'Select Create manually' },
          ]}
        />
      </Scene>

      {/* 9 — What we're building */}
      <Scene t={t} index={8}>
        <WhatWeBuild t={t} />
      </Scene>

      {/* 10 — Name + Description */}
      <Scene t={t} index={9} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={82.72}
          src={shot('04-leadership-skill-form')}
          cam={[
            { at: 82.9, x: 1190, y: 190, s: 1.6 },
            { at: 89.8, x: 1190, y: 290, s: 1.6 },
          ]}
          rings={[
            { at: 84.48, until: 89.7, x: 740, y: 102, w: 905, h: 68 },
            { at: 91.6, x: 740, y: 235, w: 905, h: 96 },
          ]}
          steps={[
            { at: 82.96, text: 'Name' },
            { at: 84.48, text: 'write-leadership-updates' },
            { at: 86.32, text: 'Lowercase, with hyphens' },
            { at: 90.24, text: 'Description' },
            { at: 96.72, text: 'Say when to use it' },
          ]}
        />
      </Scene>

      {/* 11 — A good description */}
      <Scene t={t} index={10}>
        <GoodDescription t={t} />
      </Scene>

      {/* 12 — Instructions + CODO */}
      <Scene t={t} index={11} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={111.76}
          src={shot('04-leadership-skill-form')}
          cam={[
            { at: 111.76, x: 1190, y: 290, s: 1.6, dur: 0.01 },
            { at: 112.2, x: 1190, y: 660, s: 1.35 },
            { at: 119.5, x: 1190, y: 760, s: 1.35, dur: 0.8 },
          ]}
          rings={[
            { at: 112.4, until: 115.0, x: 740, y: 360, w: 140, h: 28 },
            { at: 116.72, until: 117.5, x: 748, y: 414, w: 890, h: 58 },
            { at: 117.6, until: 118.6, x: 748, y: 498, w: 890, h: 58 },
            { at: 118.72, until: 119.8, x: 748, y: 581, w: 890, h: 336 },
            { at: 119.92, x: 748, y: 942, w: 890, h: 138 },
          ]}
          steps={[
            { at: 112.4, text: 'Instructions' },
            { at: 115.07, text: 'Apply the CODO framework' },
            { at: 116.72, text: 'Character' },
            { at: 117.6, text: 'Objective' },
            { at: 118.72, text: 'Do and Don’t' },
            { at: 119.92, text: 'Output' },
          ]}
        />
      </Scene>

      {/* 13 — Repeatable process */}
      <Scene t={t} index={12}>
        <RepeatableProcess t={t} />
      </Scene>

      {/* 14 — Rules */}
      <Scene t={t} index={13} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={127.19}
          src={shot('04-leadership-skill-form')}
          cam={[{ at: 127.19, x: 1190, y: 750, s: 1.55, dur: 0.01 }]}
          rings={[
            { at: 128.56, until: 130.2, x: 748, y: 637, w: 890, h: 58 },
            { at: 130.32, until: 132.6, x: 748, y: 748, w: 890, h: 58 },
            { at: 132.8, until: 135.2, x: 748, y: 804, w: 890, h: 86 },
            { at: 136.64, x: 748, y: 720, w: 890, h: 30 },
          ]}
          steps={[
            { at: 127.56, text: 'Add rules' },
            { at: 128.56, text: 'Preserve the supplied facts' },
            { at: 130.32, text: 'Flag missing owners and deadlines' },
            { at: 132.8, text: 'Ask for notes when none are provided' },
            { at: 136.64, text: 'No unsupported status labels or urgency' },
          ]}
        />
      </Scene>

      {/* 15 — Add files */}
      <Scene t={t} index={14} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={142.88}
          src={shot('16-add-files-options')}
          cam={[{ at: 145.0, x: 1000, y: 520, s: 1.35 }]}
          rings={[
            { at: 143.84, until: 145.3, x: 1414, y: 13, w: 110, h: 46 },
            { at: 145.6, x: 678, y: 320, w: 644, h: 336 },
          ]}
          steps={[
            { at: 143.84, text: 'Add files' },
            { at: 145.72, text: 'A reporting template or style guide' },
          ]}
        />
      </Scene>

      {/* 16 — Save skill */}
      <Scene t={t} index={15} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={148.0}
          src={shot('15-saved-skill-edit-view')}
          cam={[{ at: 149.0, x: 1250, y: 300, s: 1.3 }]}
          cursor={[
            { at: 148.4, x: 1200, y: 480 },
            { at: 149.6, x: 1580, y: 40, click: true, dur: 0.8 },
          ]}
          rings={[{ at: 150.48, x: 1534, y: 13, w: 88, h: 46 }]}
          steps={[
            { at: 148.2, text: 'Instructions ready' },
            { at: 150.48, text: 'Save skill' },
          ]}
        />
      </Scene>

      {/* 17 — Installed */}
      <Scene t={t} index={16} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={151.75}
          src={shot('05-skill-created')}
          cam={[{ at: 152.1, x: 1150, y: 400, s: 1.5 }]}
          rings={[{ at: 152.72, x: 712, y: 362, w: 462, h: 88, spot: true }]}
          steps={[{ at: 152.72, text: 'Now under Installed' }]}
        />
      </Scene>

      {/* 18 — @ and select */}
      <Scene t={t} index={17} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={155.28}
          src={shot('06-at-skill-menu')}
          cam={[{ at: 157.5, x: 1200, y: 680, s: 1.5 }]}
          cursor={[
            { at: 158.0, x: 1100, y: 545 },
            { at: 160.3, x: 905, y: 724, click: true, dur: 0.8 },
          ]}
          rings={[
            { at: 159.36, until: 160.9, x: 812, y: 520, w: 40, h: 40 },
            { at: 161.12, x: 768, y: 700, w: 868, h: 42 },
          ]}
          steps={[
            { at: 155.6, text: 'New conversation' },
            { at: 159.36, text: 'Type @' },
            { at: 161.12, text: 'Select write-leadership-updates' },
          ]}
        />
      </Scene>

      {/* 19 — Paste the notes */}
      <Scene t={t} index={18} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={163.04}
          src={shot('07-manual-invocation-prompt')}
          cam={[{ at: 163.04, x: 1200, y: 660, s: 1.5, dur: 0.01 }]}
          cursor={[
            { at: 165.0, x: 1300, y: 860 },
            { at: 166.2, x: 1613, y: 795, click: true, dur: 0.7 },
          ]}
          rings={[{ at: 163.68, until: 166.6, x: 765, y: 515, w: 800, h: 240 }]}
          steps={[
            { at: 163.68, text: 'Paste fictional project notes' },
            { at: 165.52, text: 'Ask Gemini to prepare the update' },
          ]}
        />
      </Scene>

      {/* 20 — Check format + figures */}
      <Scene t={t} index={19} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={167.6}
          src={shot('08-manual-result')}
          cam={[{ at: 167.6, x: 1190, y: 560, s: 1.3, dur: 0.01 }]}
          rings={[
            { at: 168.24, until: 169.1, x: 700, y: 366, w: 240, h: 90 },
            { at: 169.24, x: 700, y: 662, w: 530, h: 140 },
          ]}
          steps={[
            { at: 168.24, text: 'Check the format' },
            { at: 169.24, text: 'Check the figures' },
          ]}
        />
      </Scene>

      {/* 21 — Decisions, next steps, missing owner */}
      <Scene t={t} index={20} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={169.6}
          src={shot('09-manual-missing-information')}
          cam={[
            { at: 169.6, x: 1190, y: 540, s: 1.3, dur: 0.01 },
            { at: 177.4, x: 1190, y: 740, s: 1.5 },
          ]}
          rings={[
            { at: 169.72, until: 170.5, x: 700, y: 412, w: 800, h: 90 },
            { at: 170.64, until: 172.2, x: 700, y: 523, w: 900, h: 175 },
            { at: 173.2, until: 177.2, x: 760, y: 322, w: 895, h: 68 },
            { at: 179.6, x: 760, y: 661, w: 740, h: 36 },
            { at: 180.88, x: 700, y: 828, w: 970, h: 36 },
          ]}
          steps={[
            { at: 169.72, text: 'Check the decisions' },
            { at: 170.64, text: 'Check the next steps' },
            { at: 173.2, text: 'An action with no owner or deadline' },
            { at: 179.6, text: 'Marked “not provided”' },
            { at: 180.88, text: 'Gemini asks for clarification' },
          ]}
        />
      </Scene>

      {/* 22 — No notes */}
      <Scene t={t} index={21} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={182.78}
          src={shot('13-no-notes-asks-for-input')}
          cam={[{ at: 183.2, x: 1200, y: 260, s: 1.5 }]}
          rings={[
            { at: 185.4, until: 187.3, x: 1008, y: 104, w: 668, h: 78 },
            { at: 187.52, x: 700, y: 262, w: 1000, h: 72 },
          ]}
          steps={[
            { at: 183.68, text: 'A fresh conversation' },
            { at: 185.4, text: 'No notes supplied' },
            { at: 187.52, text: 'Gemini asks before drafting' },
          ]}
        />
      </Scene>

      {/* 23 — Automatic vs explicit */}
      <Scene t={t} index={22}>
        <AutomaticVsExplicit t={t} />
      </Scene>

      {/* 24 — Refine */}
      <Scene t={t} index={23} pad={false}>
        <AppWindow
          {...WIN}
          t={t}
          start={200.84}
          src={shot('14-skill-management-menu')}
          cam={[{ at: 202.3, x: 1050, y: 520, s: 1.5 }]}
          cursor={[
            { at: 202.0, x: 1300, y: 300 },
            { at: 202.9, x: 1137, y: 408, click: true, dur: 0.7 },
            { at: 204.7, x: 1060, y: 570, click: true, dur: 0.7 },
          ]}
          rings={[
            { at: 203.6, until: 205.2, x: 1112, y: 382, w: 48, h: 48 },
            { at: 205.44, x: 945, y: 545, w: 205, h: 42 },
          ]}
          steps={[
            { at: 202.16, text: 'Return to Skills' },
            { at: 203.52, text: 'Open its options' },
            { at: 205.44, text: 'Edit manually' },
            { at: 207.28, text: 'Save and test again' },
          ]}
        />
      </Scene>

      {/* 25 — Closing */}
      <Scene t={t} index={24}>
        <StartWithRepeats t={t} />
      </Scene>

      {/* 26 — Closing line */}
      <Scene t={t} index={25} padStyle={{ opacity: 1 - prog(t, 225.2, 0.7, Easing.in(Easing.quad)) }}>
        <CaptureAndCheck t={t} />
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const GeminiSkills: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={GEMINI_SKILLS_TITLE_FRAMES}>
      <TitleCardGreen label="GEMINI" title="Creating a Skill in Gemini" />
    </Sequence>
    <Sequence from={GEMINI_SKILLS_TITLE_FRAMES}>
      <GeminiSkillsBody audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
