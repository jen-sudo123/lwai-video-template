import React from 'react';
import { interpolate } from 'remotion';

type Props = {
  frame: number;
  // Scene-local frame at which each row starts drawing in: [role, audience, style, workflow]
  timings?: number[];
};

const DEFAULT_TIMINGS = [10, 50, 90, 130];

const STROKE = '#444444';
const GREEN = '#85E13A';

type Row = {
  label: string;
  textX: number;
  textY: number;
  lineY: number;
  line1X1: number;
  line1X2: number;
  line2X1: number;
  line2X2: number;
};

const ROWS: Row[] = [
  { label: 'ROLE', textX: 150, textY: 590, lineY: 578, line1X1: 300, line1X2: 555, line2X1: 660, line2X2: 950 },
  { label: 'AUDIENCE', textX: 150, textY: 670, lineY: 658, line1X1: 365, line1X2: 555, line2X1: 660, line2X2: 950 },
  { label: 'STYLE', textX: 150, textY: 750, lineY: 738, line1X1: 300, line1X2: 555, line2X1: 660, line2X2: 950 },
  { label: 'WORKFLOW', textX: 150, textY: 830, lineY: 818, line1X1: 390, line1X2: 555, line2X1: 660, line2X2: 950 },
];

const QUESTION_X = 590;
const CONNECTOR_X = 950;
const CONNECTOR_TOP = 578;
const CONNECTOR_BOTTOM = 818;
const CONNECTOR_CENTER = (CONNECTOR_TOP + CONNECTOR_BOTTOM) / 2; // 698

const ROW_DRAW = 15; // frames to draw each line segment
const QUESTION_POP = 6; // frames for the "?" to pop in after line1 lands

// Draws a straight line that grows from x1 toward x2 as `t` goes 0 → 1.
const DrawnLine: React.FC<{
  x1: number; y1: number; x2: number; y2: number; t: number; strokeWidth?: number; color?: string;
}> = ({ x1, y1, x2, y2, t, strokeWidth = 4, color = STROKE }) => {
  const length = Math.hypot(x2 - x1, y2 - y1);
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={length}
      strokeDashoffset={length * (1 - t)}
    />
  );
};

export const PersonalizationGapDiagram: React.FC<Props> = ({ frame, timings = DEFAULT_TIMINGS }) => {
  const lastRowStart = timings[timings.length - 1] ?? 130;
  const rowsDoneAt = lastRowStart + ROW_DRAW + QUESTION_POP + ROW_DRAW;

  const connectorT = interpolate(frame, [rowsDoneAt, rowsDoneAt + 20], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const arrowStart = rowsDoneAt + 20;
  const arrowT = interpolate(frame, [arrowStart, arrowStart + 15], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const arrowHeadOpacity = interpolate(frame, [arrowStart + 10, arrowStart + 15], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return (
    <svg viewBox="0 0 1600 900" width="100%" height="100%" role="img">
      <title>AI doesn't know you yet — role, audience, style, workflow feed into the AI</title>

      {/* Heading */}
      <text x="140" y="125" fontFamily="IBM Plex Serif, Georgia, serif" fontSize="82" fontWeight="400" fill={STROKE}>
        AI doesn&rsquo;t know you yet
      </text>

      {/* Human figure */}
      <circle cx="350" cy="305" r="28" fill={STROKE} />
      <rect x="322" y="342" width="56" height="118" rx="22" fill={STROKE} />

      {/* Rows: label + line → "?" → line → connector */}
      {ROWS.map((row, i) => {
        const start = timings[i] ?? DEFAULT_TIMINGS[i];
        const labelOpacity = interpolate(frame, [start, start + ROW_DRAW], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const line1T = interpolate(frame, [start, start + ROW_DRAW], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const questionStart = start + ROW_DRAW;
        const questionProgress = interpolate(frame, [questionStart, questionStart + QUESTION_POP], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        const line2Start = questionStart + QUESTION_POP;
        const line2T = interpolate(frame, [line2Start, line2Start + ROW_DRAW], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        return (
          <g key={row.label}>
            <text
              x={row.textX} y={row.textY}
              fontFamily="Public Sans, Arial, sans-serif" fontSize="34" fontWeight="600" letterSpacing="0.5"
              fill={STROKE} opacity={labelOpacity}
            >
              {row.label}
            </text>
            <DrawnLine x1={row.line1X1} y1={row.lineY} x2={row.line1X2} y2={row.lineY} t={line1T} />
            <text
              x={QUESTION_X} y={row.lineY + 20}
              fontFamily="Public Sans, Arial, sans-serif" fontSize="58" fontWeight="700" fill={GREEN}
              opacity={questionProgress}
              transform={`translate(${QUESTION_X}, ${row.lineY + 20}) scale(${0.6 + 0.4 * questionProgress}) translate(${-QUESTION_X}, ${-(row.lineY + 20)})`}
            >
              ?
            </text>
            <DrawnLine x1={row.line2X1} y1={row.lineY} x2={row.line2X2} y2={row.lineY} t={line2T} />
          </g>
        );
      })}

      {/* Connector bracket */}
      <DrawnLine x1={CONNECTOR_X} y1={CONNECTOR_TOP} x2={CONNECTOR_X} y2={CONNECTOR_BOTTOM} t={connectorT} />

      {/* Arrow toward AI — aligned with the connector's vertical center */}
      <DrawnLine x1={CONNECTOR_X} y1={CONNECTOR_CENTER} x2={1090} y2={CONNECTOR_CENTER} t={arrowT} />
      <path
        d={`M1070 ${CONNECTOR_CENTER - 20} L1090 ${CONNECTOR_CENTER} L1070 ${CONNECTOR_CENTER + 20}`}
        stroke={STROKE} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" fill="none"
        opacity={arrowHeadOpacity}
      />

      {/* AI — vertically centered on the arrow */}
      <g transform={`translate(0, ${CONNECTOR_CENTER - 465})`}>
        <rect x="1190" y="355" width="220" height="220" rx="28" fill="#FFFFFF" stroke={STROKE} strokeWidth="8" />
        <line x1="1230" y1="355" x2="1230" y2="325" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1275" y1="355" x2="1275" y2="325" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1320" y1="355" x2="1320" y2="325" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1365" y1="355" x2="1365" y2="325" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1230" y1="575" x2="1230" y2="605" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1275" y1="575" x2="1275" y2="605" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1320" y1="575" x2="1320" y2="605" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1365" y1="575" x2="1365" y2="605" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1190" y1="395" x2="1160" y2="395" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1190" y1="440" x2="1160" y2="440" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1190" y1="485" x2="1160" y2="485" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1190" y1="530" x2="1160" y2="530" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1410" y1="395" x2="1440" y2="395" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1410" y1="440" x2="1440" y2="440" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1410" y1="485" x2="1440" y2="485" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <line x1="1410" y1="530" x2="1440" y2="530" stroke={STROKE} strokeWidth="4" strokeLinecap="round" />
        <text x="1254" y="490" fontFamily="Public Sans, Arial, sans-serif" fontSize="66" fontWeight="700" fill={STROKE}>
          AI
        </text>
      </g>
    </svg>
  );
};
