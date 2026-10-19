import React from 'react';
import { Easing, interpolate } from 'remotion';

type Props = {
  frame: number;
  // Scene-local frames at which each row flies in: [skills, knowledge, tools, checks]
  timings?: number[];
};

const DEFAULT_TIMINGS = [0, 60, 120, 180];
const FLY_FRAMES = 22;
const CARD_STAGGER = 5;
const DARK = '#444444';
const LIME = '#85E13A';
const LIME2 = '#66C61C';
const W = 472;

const fly = (frame: number, delay: number) => {
  const t = interpolate(frame, [delay, delay + FLY_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  return { opacity: t, tx: (1 - t) * 180 };
};

const Card: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  frame: number;
  delay: number;
  children: React.ReactNode;
}> = ({ x, y, w, h, frame, delay, children }) => {
  const f = fly(frame, delay);
  return (
    <g style={{ opacity: f.opacity, transform: `translateX(${f.tx}px)` }}>
      <rect x={x} y={y} width={w} height={h} fill="#FFFFFF" stroke={DARK} strokeWidth={2} />
      {children}
    </g>
  );
};

const Header: React.FC<{ y: number; label: string; frame: number; delay: number }> = ({
  y,
  label,
  frame,
  delay,
}) => {
  const f = fly(frame, delay);
  return (
    <g style={{ opacity: f.opacity, transform: `translateX(${f.tx}px)` }}>
      <text
        x={0}
        y={y + 28}
        fontFamily='"IBM Plex Serif", Georgia, serif'
        fontSize={32}
        fill={DARK}
      >
        {label}
      </text>
      <rect x={0} y={y + 40} width={W} height={5} fill={LIME} />
    </g>
  );
};

export const SkillStackDiagram: React.FC<Props> = ({ frame, timings = DEFAULT_TIMINGS }) => {
  const [tSkills, tKnow, tTools, tChecks] = timings.length >= 4 ? timings : DEFAULT_TIMINGS;
  const colX = [0, 162, 324];
  const CH = 60;

  const gridRow = (
    rowY: number,
    start: number,
    delay: number,
    accentIdx: number | null,
    twoLines: boolean,
  ) =>
    colX.map((x, i) => (
      <Card key={i} x={x} y={rowY} w={148} h={CH} frame={frame} delay={delay + start + i * CARD_STAGGER}>
        <rect x={x + 18} y={rowY + 14} width={32} height={10} fill={accentIdx === i ? LIME2 : LIME} />
        <line x1={x + 18} y1={rowY + 38} x2={x + 90} y2={rowY + 38} stroke={DARK} strokeWidth={3} />
        {twoLines && (
          <line x1={x + 18} y1={rowY + 49} x2={x + 70} y2={rowY + 49} stroke={DARK} strokeWidth={2} />
        )}
      </Card>
    ));

  // Section origins
  const yS = 0;
  const yK = 208;
  const yT = 416;
  const yC = 554;

  const toolW = 108;
  const toolX = [0, 121, 242, 364];

  return (
    <svg viewBox="0 0 500 690" width="100%" height="100%" role="img">
      <title>Skills, Knowledge, Tools and Checks</title>
      <g transform="translate(14 8)">
        {/* Skills */}
        <Header y={yS} label="Skills" frame={frame} delay={tSkills} />
        {gridRow(yS + 62, 0, tSkills + 6, 3, true)}
        {gridRow(yS + 62 + CH + 10, 0, tSkills + 21, 3, false)}

        {/* Knowledge */}
        <Header y={yK} label="Knowledge" frame={frame} delay={tKnow} />
        {gridRow(yK + 62, 0, tKnow + 6, null, false)}
        {gridRow(yK + 62 + CH + 10, 0, tKnow + 21, 3, false)}

        {/* Tools */}
        <Header y={yT} label="Tools" frame={frame} delay={tTools} />
        {toolX.map((x, i) => (
          <Card key={i} x={x} y={yT + 62} w={toolW} h={CH} frame={frame} delay={tTools + 6 + i * CARD_STAGGER}>
            {i === 0 && <circle cx={x + 26} cy={yT + 82} r={9} fill={LIME} />}
            {i === 1 && <rect x={x + 18} y={yT + 73} width={22} height={18} fill={LIME} />}
            {i === 2 && <path d={`M${x + 18} ${yT + 82} L${x + 28} ${yT + 70} L${x + 38} ${yT + 82} L${x + 28} ${yT + 94} Z`} fill={LIME2} />}
            {i === 3 && (
              <>
                <circle cx={x + 28} cy={yT + 82} r={10} fill="none" stroke={DARK} strokeWidth={3} />
                <circle cx={x + 28} cy={yT + 82} r={4} fill={LIME} />
              </>
            )}
            <line x1={x + 18} y1={yT + 108} x2={x + 78} y2={yT + 108} stroke={DARK} strokeWidth={3} />
          </Card>
        ))}

        {/* Checks */}
        <Header y={yC} label="Checks" frame={frame} delay={tChecks} />
        {colX.map((x, i) => (
          <Card key={i} x={x} y={yC + 62} w={148} h={CH} frame={frame} delay={tChecks + 6 + i * CARD_STAGGER}>
            <path
              d={`M${x + 18} ${yC + 88} L${x + 28} ${yC + 98} L${x + 46} ${yC + 76}`}
              fill="none"
              stroke={LIME}
              strokeWidth={6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line x1={x + 60} y1={yC + 88} x2={x + 126} y2={yC + 88} stroke={DARK} strokeWidth={3} />
          </Card>
        ))}
      </g>
    </svg>
  );
};
