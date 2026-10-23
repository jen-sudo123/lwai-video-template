import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { Header, INK, MUTED, appear, clamp, easeInOut, prog } from './kit';

// The five-position autonomy dial from the "Autonomy Is a Dial" video, as a reusable scene:
// the arc draws on, the needle moves between positions (0 = first, 4 = last; fractions allowed),
// and highlighted positions turn lime with a caption under the dial.

export type AutonomyDialProps = {
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  positions?: string[];
  drawFrom?: number;
  needle?: Array<{ frame: number; pos: number }>;
  highlights?: Array<{ from: number; to?: number; pos: number; caption: string }>;
  durationInFrames: number;
};

const DEFAULT_POSITIONS = ['Suggest', 'Prepare', 'Act with approval', 'Act within bounds', 'Run and escalate'];
const CX = 960;
const CY = 720;
const R = 330;
const NEEDLE_MOVE = 14;

const angleFor = (pos: number) => Math.PI - (pos / 4) * Math.PI; // 180° (left) → 0° (right)

export const AutonomyDialScene: React.FC<AutonomyDialProps> = ({
  label, title, titleFrom = 0, titleHighlight, positions = DEFAULT_POSITIONS, drawFrom = 0, needle = [], highlights = [],
}) => {
  const frame = useCurrentFrame();
  const draw = prog(frame, drawFrom, 30, easeInOut);
  const arcLen = Math.PI * R;

  let pos = needle.length ? needle[0].pos : 1;
  for (let i = 1; i < needle.length; i++) {
    const k = needle[i];
    const p = interpolate(frame, [k.frame, k.frame + NEEDLE_MOVE], [0, 1], { ...clamp, easing: easeInOut });
    pos += (k.pos - pos) * p;
  }
  const a = angleFor(pos);
  const needleOn = prog(frame, (needle[0]?.frame ?? drawFrom) , 12);

  const active = highlights.filter((h) => frame >= h.from && (h.to === undefined || frame < h.to)).pop();

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Header frame={frame} label={label} title={title} titleFrom={titleFrom} titleHighlight={titleHighlight} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <path d={`M${CX - R} ${CY} A${R} ${R} 0 0 1 ${CX + R} ${CY}`} fill="none" stroke={INK} strokeWidth={5}
          strokeDasharray={arcLen} strokeDashoffset={arcLen * (1 - draw)} strokeLinecap="round" />
        {positions.map((name, i) => {
          const ang = angleFor(i);
          const x = CX + Math.cos(ang) * R;
          const y = CY - Math.sin(ang) * R;
          const on = prog(frame, drawFrom + 8 + i * 5, 10);
          const lit = active?.pos === i;
          const lx = CX + Math.cos(ang) * (R + 70);
          const ly = CY - Math.sin(ang) * (R + 70);
          const anchor = i === 2 ? 'middle' : i < 2 ? 'end' : 'start';
          return (
            <g key={i} opacity={on}>
              <circle cx={x} cy={y} r={lit ? 26 : 20} fill={lit ? colors.lime500 : '#fff'} stroke={INK} strokeWidth={3} />
              <text x={lx} y={ly + (i === 2 ? -6 : 12)} textAnchor={anchor} fontFamily={fonts.serif} fontSize={lit ? 40 : 34}
                fill={lit ? colors.titleGreen : INK} fontWeight={lit ? 500 : 400}>{name}</text>
            </g>
          );
        })}
        <g opacity={needleOn}>
          <line x1={CX} y1={CY} x2={CX + Math.cos(a) * (R - 70)} y2={CY - Math.sin(a) * (R - 70)} stroke={INK} strokeWidth={9} strokeLinecap="round" />
          <circle cx={CX + Math.cos(a) * (R - 70)} cy={CY - Math.sin(a) * (R - 70)} r={9} fill={INK} />
          <circle cx={CX} cy={CY} r={48} fill={colors.lime500} stroke={INK} strokeWidth={3} />
        </g>
      </svg>
      {highlights.map((h, i) => {
        const vis = frame >= h.from && (h.to === undefined || frame < h.to) && active === h;
        if (!vis) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: 0, right: 0, top: CY + 70, textAlign: 'center', fontFamily: fonts.sans, fontSize: 38, color: INK, ...appear(frame, h.from, 12) }}>
            {h.caption}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 0, right: 0, top: CY + 150, textAlign: 'center', fontFamily: fonts.sans, fontSize: 22, letterSpacing: '0.12em', color: MUTED, opacity: draw }}>
        THE AUTONOMY DIAL
      </div>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
