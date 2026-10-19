import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';
import { colors, layout } from '../tokens';

type Props = {
  // Scene-relative frame the "internal message → basic check" column fades in.
  leftAppearFrame?: number;
  // Scene-relative frame the "client/leadership → stronger verification" column fades in.
  rightAppearFrame?: number;
};

const GREY = '#444444';
const LIME = '#85E13A';

// Low stakes (a quick internal message, checked with just D + F) vs high
// stakes (a client or leadership deliverable, checked with the full DRAFT
// and a deeper verification pass). Illustrates calibrating how hard you
// verify to what's actually on the line.
export const StakesVerificationDiagram: React.FC<Props> = ({
  leftAppearFrame = 0,
  rightAppearFrame = 289,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = (appearFrame: number, dur = 20) =>
    interpolate(frame - appearFrame, [0, dur], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  const riseIn = (appearFrame: number, dur = 20) =>
    interpolate(frame - appearFrame, [0, dur], [14, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const leftOpacity = fadeIn(leftAppearFrame);
  const leftY = riseIn(leftAppearFrame);
  const rightOpacity = fadeIn(rightAppearFrame);
  const rightY = riseIn(rightAppearFrame);

  // Sized and pinned to the top (rather than vertically centered) so the
  // bottom row — "Basic check" / "Stronger verification" — clears the
  // LogoFooter in the bottom-left corner instead of overlapping it.
  const DIAGRAM_WIDTH = 1630;
  const DIAGRAM_HEIGHT = 931;
  const DIAGRAM_TOP = 20;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <svg
        width={DIAGRAM_WIDTH}
        height={DIAGRAM_HEIGHT}
        viewBox="0 0 1400 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', left: (layout.width - DIAGRAM_WIDTH) / 2, top: DIAGRAM_TOP }}
      >
        <defs>
          <marker id="stakes-arrow" markerWidth={8} markerHeight={8} refX={7} refY={4} orient="auto">
            <path d="M0 0 L8 4 L0 8" fill="none" stroke={LIME} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* ── LEFT: internal message, low stakes ── */}
        <g style={{ opacity: leftOpacity, transform: `translate(0, ${leftY}px)` }}>
          <circle cx={350} cy={95} r={30} fill={GREY} />
          <path d="M295 180 Q295 135 350 135 Q405 135 405 180 V195 H295Z" fill={GREY} />
          <text x={350} y={245} textAnchor="middle" fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={34}>
            Internal message
          </text>

          <path d="M350 270 V325" stroke={LIME} strokeWidth={5} strokeLinecap="round" markerEnd="url(#stakes-arrow)" />

          <path
            d="M235 345 H430 L485 400 V575 Q485 590 470 590 H235 Q220 590 220 575 V360 Q220 345 235 345Z"
            fill="#FFFFFF"
            stroke={GREY}
            strokeWidth={4}
            strokeLinejoin="round"
          />
          <path d="M430 345 V385 Q430 400 445 400 H485" stroke={GREY} strokeWidth={4} strokeLinejoin="round" fill="none" />

          <line x1={260} y1={405} x2={390} y2={405} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
          <line x1={260} y1={435} x2={365} y2={435} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

          <rect x={265} y={485} width={75} height={75} rx={10} fill={LIME} />
          <text x={302} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={44} fontWeight={700}>D</text>

          <rect x={360} y={485} width={75} height={75} rx={10} fill={LIME} />
          <text x={397} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={44} fontWeight={700}>F</text>

          <path d="M350 610 V655" stroke={LIME} strokeWidth={5} strokeLinecap="round" markerEnd="url(#stakes-arrow)" />

          <rect x={205} y={675} width={290} height={90} rx={16} fill="#FFFFFF" stroke={LIME} strokeWidth={4} />
          <circle cx={265} cy={720} r={26} fill={LIME} />
          <path d="M252 720 L262 730 L280 710" stroke="#FFFFFF" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x={310} y={730} fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={28}>Basic check</text>
        </g>

        {/* ── RIGHT: client / leadership, high stakes ── */}
        <g style={{ opacity: rightOpacity, transform: `translate(0, ${rightY}px)` }}>
          <circle cx={1020} cy={92} r={31} fill={GREY} />
          <circle cx={950} cy={115} r={22} fill={GREY} />
          <circle cx={1090} cy={115} r={22} fill={GREY} />
          <path d="M970 190 Q970 140 1020 140 Q1070 140 1070 190 V195 H970Z" fill={GREY} />
          <path d="M915 190 Q915 150 950 150 Q975 150 985 165 V195 H915Z" fill={GREY} />
          <path d="M1055 165 Q1065 150 1090 150 Q1125 150 1125 190 V195 H1055Z" fill={GREY} />
          <text x={1020} y={245} textAnchor="middle" fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={34}>
            Client / Leadership
          </text>

          <path d="M1020 270 V325" stroke={LIME} strokeWidth={5} strokeLinecap="round" markerEnd="url(#stakes-arrow)" />

          {/* Shifted +40 to center this document (and its DRAFT letters) under
              the "Client / Leadership" icon at x=1020, matching the arrows and
              the gate below, which were already centered there. */}
          <g transform="translate(40, 0)">
            <path
              d="M760 345 H1125 L1180 400 V575 Q1180 590 1165 590 H760 Q745 590 745 575 V360 Q745 345 760 345Z"
              fill="#FFFFFF"
              stroke={GREY}
              strokeWidth={4}
              strokeLinejoin="round"
            />
            <path d="M1125 345 V385 Q1125 400 1140 400 H1180" stroke={GREY} strokeWidth={4} strokeLinejoin="round" fill="none" />

            <line x1={790} y1={405} x2={1065} y2={405} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
            <line x1={790} y1={435} x2={965} y2={435} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

            <rect x={790} y={485} width={65} height={75} rx={10} fill={LIME} />
            <rect x={870} y={485} width={65} height={75} rx={10} fill={LIME} />
            <rect x={950} y={485} width={65} height={75} rx={10} fill={LIME} />
            <rect x={1030} y={485} width={65} height={75} rx={10} fill={LIME} />
            <rect x={1110} y={485} width={65} height={75} rx={10} fill={LIME} />

            <text x={822} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={42} fontWeight={700}>D</text>
            <text x={902} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={42} fontWeight={700}>R</text>
            <text x={982} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={42} fontWeight={700}>A</text>
            <text x={1062} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={42} fontWeight={700}>F</text>
            <text x={1142} y={537} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={42} fontWeight={700}>T</text>
          </g>

          <path d="M1020 610 V655" stroke={LIME} strokeWidth={5} strokeLinecap="round" markerEnd="url(#stakes-arrow)" />

          <rect x={735} y={670} width={570} height={105} rx={18} fill={LIME} />
          <path
            d="M805 700 L845 685 L885 700 V725 Q885 760 845 780 Q805 760 805 725Z"
            fill="#FFFFFF"
            stroke={GREY}
            strokeWidth={5}
            strokeLinejoin="round"
          />
          <path d="M825 730 L840 745 L865 715" stroke={GREY} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x={920} y={720} fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={30}>Stronger verification</text>
          <text x={920} y={755} fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={21}>Accuracy, evidence, risk, tone</text>
        </g>
      </svg>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
