import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../../Logo';

type Row = { lines: [string] | [string, string] };

const ROWS: Row[] = [
  { lines: ['Find the latest correspondence', 'with the customer.'] },
  { lines: ['Identify outstanding commitments', 'and decisions.'] },
  { lines: ['Review the latest account', 'documents.'] },
  { lines: ['Look for risks or contradictions.'] },
  { lines: ['Turn everything into a one-page', 'briefing.'] },
];

const ROW_Y = [285, 520, 755, 990, 1225];
const DIVIDER_Y = [455, 690, 925, 1160];

type Props = {
  // Scene-local frame at which each of the 5 rows checks off. Defaults to a
  // simple stagger if omitted.
  itemTimings?: number[];
};

// Meeting-prep checklist. Title and dividers are present from frame 0; each
// row's checkbox fills lime and its text darkens the moment it's checked off,
// then stays checked (a real checklist doesn't un-check itself).
export const MeetingChecklistDiagram: React.FC<Props> = ({ itemTimings }) => {
  const frame = useCurrentFrame();
  const timings = itemTimings ?? ROWS.map((_, i) => i * 90);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
      <svg viewBox="0 0 1200 1400" width="100%" height="100%" style={{ objectFit: 'contain' }} role="img">
        <title>Meeting Preparation Checklist</title>

        <text
          x="80"
          y="150"
          fill="#444444"
          fontFamily="'IBM Plex Serif', Georgia, serif"
          fontSize="82"
          fontWeight={400}
        >
          Meeting Preparation
        </text>
        <rect x="80" y="195" width="1040" height="8" fill="#85E13A" />

        {DIVIDER_Y.map((y) => (
          <line key={y} x1="80" y1={y} x2="1120" y2={y} stroke="#444444" strokeWidth="2" opacity={0.22} />
        ))}

        {ROWS.map((row, i) => {
          const t = timings[i] ?? i * 90;
          const p = interpolate(frame, [t, t + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const boxFill = p > 0 ? '#85E13A' : '#FFFFFF';
          const textColor = p > 0 ? '#444444' : '#AAAAAA';

          return (
            <g key={i} transform={`translate(80 ${ROW_Y[i]})`}>
              <rect
                x="0"
                y="4"
                width="66"
                height="66"
                rx="4"
                fill={boxFill}
                stroke={p > 0 ? '#85E13A' : '#444444'}
                strokeWidth="5"
              />
              <path
                d="M17 37 L29 50 L52 23"
                fill="none"
                stroke="#444444"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={p}
              />
              {row.lines.length === 2 ? (
                <text x="115" y="32" fill={textColor} fontFamily="'Public Sans', Arial, sans-serif" fontSize="35" fontWeight={p > 0 ? 600 : 400}>
                  <tspan x="115" dy="0">{row.lines[0]}</tspan>
                  <tspan x="115" dy="48">{row.lines[1]}</tspan>
                </text>
              ) : (
                <text x="115" y="50" fill={textColor} fontFamily="'Public Sans', Arial, sans-serif" fontSize="35" fontWeight={p > 0 ? 600 : 400}>
                  {row.lines[0]}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
