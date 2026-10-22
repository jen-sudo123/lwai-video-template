import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../../Logo';
import { fonts, colors, typography, layout } from '../../tokens';

type Props = {
  // Scene-local frame each Build Plan section lights up as the VO walks
  // through it: [section 1, section 2, sections 3 & 4, section 5]. Before the
  // first one all five sections are equally visible; after allFrame they
  // all return to full strength.
  sectionFrames?: [number, number, number, number];
  // Scene-local frame each CODO card appears: [Character, Objective,
  // Do's & Don'ts, Output].
  codoFrames?: [number, number, number, number];
  allFrame?: number;
};

const SECTIONS = [
  { title: 'What work will your agent take on?', body: 'The workflow, what starts it and the result it produces' },
  { title: 'What are the main steps, and who does what?', body: 'Agent, person or automation for each step' },
  { title: 'What does your agent need?', body: 'Information, tools and access' },
  { title: 'Where should the human stay in control?', body: 'What it does alone, what needs approval, when to ask' },
  { title: "What's the smallest version you can build and test?", body: 'First version, test and what success means' },
];

const CODO = [
  { letter: 'C', word: 'Character', body: 'Who the agent is and the work it takes on' },
  { letter: 'O', word: 'Objective', body: 'The result it should achieve' },
  { letter: 'D', word: "Do's & Don'ts", body: 'Steps, information, boundaries and when to ask' },
  { letter: 'O', word: 'Output', body: 'What the first version delivers and what success looks like' },
];

// Which CODO cards each Build Plan section feeds.
const LINKS: Array<[number, number]> = [
  [0, 0],
  [0, 1],
  [1, 2],
  [2, 2],
  [3, 2],
  [4, 3],
];

// Which sections are active in each highlight phase (matches sectionFrames).
const PHASE_SECTIONS = [[0], [1], [2, 3], [4]];

const LEFT_X = layout.safeMargin;
const COL_W = 660;
const RIGHT_X = layout.width - layout.safeMargin - COL_W;
const TOP = 300;
const SEC_H = 112;
const SEC_GAP = 18;
const CODO_H = 140;
const CODO_GAP = 26;

const secY = (i: number) => TOP + i * (SEC_H + SEC_GAP);
const codoY = (i: number) => TOP + i * (CODO_H + CODO_GAP);
const LIME_TINT = '#EDF5E8';

const ramp = (frame: number, start: number, len = 15) =>
  interpolate(frame, [start, start + len], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// Agent Build Plan (five sections, left) mapped onto CODO (four components,
// right). Sections light up one by one as the VO walks through them; each
// CODO card appears on its own word and a connector shows which sections
// feed it.
export const BuildPlanCodoDiagram: React.FC<Props> = ({
  sectionFrames = [64, 389, 545, 925],
  codoFrames = [322, 343, 844, 1130],
  allFrame = 1169,
}) => {
  const frame = useCurrentFrame();

  // Strength (0..1) of each section's highlight at this frame.
  const phaseIndex = sectionFrames.reduce((acc, f, i) => (frame >= f ? i : acc), -1);
  const sectionLit = (s: number) => {
    if (frame >= allFrame) return 1;
    if (phaseIndex < 0) return 1;
    const inPhase = PHASE_SECTIONS[phaseIndex].includes(s);
    const start = sectionFrames[phaseIndex];
    const t = ramp(frame, start, 12);
    // Was it lit in the previous phase?
    const wasLit = phaseIndex === 0 ? true : PHASE_SECTIONS[phaseIndex - 1].includes(s);
    const from = wasLit ? 1 : 0.35;
    const to = inPhase ? 1 : 0.35;
    return from + (to - from) * t;
  };
  const sectionAccent = (s: number) => {
    if (phaseIndex < 0 || frame >= allFrame) return 0;
    return PHASE_SECTIONS[phaseIndex].includes(s) ? ramp(frame, sectionFrames[phaseIndex], 12) : 0;
  };

  const headerIn = ramp(frame, 0, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Title */}
      <div style={{ position: 'absolute', left: LEFT_X, top: 70, opacity: headerIn }}>
        <div style={{ ...typography.label }}>Connecting the two</div>
        <div style={{ ...typography.title, fontSize: 64, color: colors.black, marginTop: 10 }}>
          From Build Plan to <span style={{ color: colors.lime500 }}>CODO</span>
        </div>
      </div>

      {/* Column headers */}
      <div style={{ position: 'absolute', left: LEFT_X, top: TOP - 46, ...typography.label, opacity: headerIn }}>
        Agent Build Plan
      </div>
      <div
        style={{
          position: 'absolute',
          left: RIGHT_X,
          top: TOP - 46,
          ...typography.label,
          opacity: ramp(frame, codoFrames[0] - 10, 15),
        }}
      >
        CODO instructions
      </div>

      {/* Connectors */}
      <svg width={layout.width} height={layout.height} style={{ position: 'absolute', inset: 0 }}>
        {LINKS.map(([s, c], i) => {
          const appear = ramp(frame, codoFrames[c], 20);
          if (appear <= 0) return null;
          const x1 = LEFT_X + COL_W + 8;
          const y1 = secY(s) + SEC_H / 2;
          const x2 = RIGHT_X - 8;
          const y2 = codoY(c) + CODO_H / 2;
          const mx = (x1 + x2) / 2;
          const d = `M${x1} ${y1} C${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
          const accent = sectionAccent(s);
          const length = 700;
          return (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={accent > 0.5 ? colors.lime500 : '#CFCFCF'}
              strokeWidth={accent > 0.5 ? 4 : 3}
              strokeDasharray={length}
              strokeDashoffset={length * (1 - appear)}
              opacity={0.35 + 0.65 * Math.max(accent, frame >= allFrame ? 1 : 0.4)}
            />
          );
        })}
      </svg>

      {/* Build Plan sections */}
      {SECTIONS.map((sec, i) => {
        const in_ = ramp(frame, 6 + i * 6, 18);
        const lit = sectionLit(i);
        const accent = sectionAccent(i);
        return (
          <div
            key={sec.title}
            style={{
              position: 'absolute',
              left: LEFT_X,
              top: secY(i),
              width: COL_W,
              height: SEC_H,
              boxSizing: 'border-box',
              borderRadius: 18,
              border: `2px solid ${accent > 0.5 ? colors.lime500 : colors.neutral200}`,
              backgroundColor: accent > 0.5 ? '#FAFDF7' : colors.white,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '0 28px',
              opacity: in_ * lit,
              transform: `translateY(${(1 - in_) * 14}px)`,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                flexShrink: 0,
                borderRadius: 12,
                backgroundColor: accent > 0.5 ? colors.lime500 : LIME_TINT,
                color: accent > 0.5 ? colors.white : colors.titleGreen,
                fontFamily: fonts.sans,
                fontWeight: 700,
                fontSize: 26,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 25, color: colors.black, lineHeight: 1.2 }}>
                {sec.title}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 20, color: '#555555', marginTop: 4 }}>{sec.body}</div>
            </div>
          </div>
        );
      })}

      {/* CODO cards */}
      {CODO.map((c, i) => {
        const in_ = ramp(frame, codoFrames[i], 18);
        const linkedActive = LINKS.some(([s, ci]) => ci === i && sectionAccent(s) > 0.5);
        return (
          <div
            key={c.word}
            style={{
              position: 'absolute',
              left: RIGHT_X,
              top: codoY(i),
              width: COL_W,
              height: CODO_H,
              boxSizing: 'border-box',
              borderRadius: 20,
              border: `2px solid ${linkedActive ? colors.lime500 : colors.neutral200}`,
              backgroundColor: colors.white,
              boxShadow: '0 6px 24px rgba(0,0,0,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: 28,
              padding: '0 32px',
              opacity: in_,
              transform: `translateX(${(1 - in_) * 30}px) scale(${0.96 + 0.04 * in_})`,
            }}
          >
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 88,
                lineHeight: 1,
                color: colors.lime500,
                width: 70,
                textAlign: 'center',
                flexShrink: 0,
              }}
            >
              {c.letter}
            </div>
            <div>
              <div style={{ fontFamily: fonts.serif, fontSize: 36, color: colors.black, lineHeight: 1.15 }}>
                {c.word}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, color: '#555555', marginTop: 6 }}>{c.body}</div>
            </div>
          </div>
        );
      })}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
