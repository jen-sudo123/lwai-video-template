import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';

type Props = {
  // Scene-relative frame the two pilot figures + cockpit frame fade in. Default 0.
  pilotsAppearFrame?: number;
  // Scene-relative frame the "PILOT FLYING" label lights up (lime).
  flyingLabelFrame?: number;
  // Scene-relative frame the "PILOT MONITORING" label + figure light up (lime).
  monitoringLabelFrame?: number;
  // Scene-relative frames the three center process boxes reveal, in order.
  challengeAppearFrame?: number;
  responseAppearFrame?: number;
  crossCheckAppearFrame?: number;
  // Scene-relative frame the camera pushes in and holds on the pilot-monitoring
  // side (used when the VO calls out "this makes you the pilot monitoring").
  zoomStartFrame?: number;
  zoomScale?: number;
};

const GREY = '#444444';
const LIME = '#85E13A';

export const CockpitCrossCheckDiagram: React.FC<Props> = ({
  pilotsAppearFrame = 0,
  flyingLabelFrame = 30,
  monitoringLabelFrame = 60,
  challengeAppearFrame,
  responseAppearFrame,
  crossCheckAppearFrame,
  zoomStartFrame,
  zoomScale = 1.6,
}) => {
  const frame = useCurrentFrame();

  const baseOpacity = interpolate(frame - pilotsAppearFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const flyingLit = interpolate(frame - flyingLabelFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const monitoringLit = interpolate(frame - monitoringLabelFrame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const stepOpacity = (appearFrame?: number) =>
    appearFrame === undefined
      ? 0
      : interpolate(frame - appearFrame, [0, 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
  const stepY = (appearFrame?: number) =>
    appearFrame === undefined
      ? 12
      : interpolate(frame - appearFrame, [0, 20], [12, 0], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

  const challengeOpacity = stepOpacity(challengeAppearFrame);
  const responseOpacity = stepOpacity(responseAppearFrame);
  const crossCheckOpacity = stepOpacity(crossCheckAppearFrame);

  // Zoom toward the pilot-monitoring side (right figure + its display), ramping
  // over 30 frames then holding at zoomScale. Center chosen in the 0-1400x0-800
  // viewBox coordinate space, converted to percentages.
  const zoomProgress = zoomStartFrame === undefined
    ? 0
    : interpolate(frame - zoomStartFrame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const currentZoomScale = 1 + (zoomScale - 1) * zoomProgress;
  const zoomCenterXPct = (1140 / 1400) * 100;
  const zoomCenterYPct = (420 / 800) * 100;

  const flyingLabelColor = `rgb(${68 + (133 - 68) * flyingLit}, ${68 + (225 - 68) * flyingLit}, ${68 + (58 - 68) * flyingLit})`;
  const monitoringLabelColor = `rgb(${68 + (133 - 68) * monitoringLit}, ${68 + (225 - 68) * monitoringLit}, ${68 + (58 - 68) * monitoringLit})`;
  const monitoringFigureStroke = `rgb(${68 + (133 - 68) * monitoringLit}, ${68 + (225 - 68) * monitoringLit}, ${68 + (58 - 68) * monitoringLit})`;

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <svg
        width={1400}
        height={800}
        viewBox="0 0 1400 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: baseOpacity,
          transform: `scale(${currentZoomScale})`,
          transformOrigin: `${zoomCenterXPct}% ${zoomCenterYPct}%`,
        }}
      >
        <defs>
          <marker id="cc-arrow" markerWidth={7} markerHeight={7} refX={6} refY={3.5} orient="auto">
            <path d="M0 0 L7 3.5 L0 7" fill="none" stroke={LIME} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Cockpit frame */}
        <path
          d="M120 510 L160 320 Q175 270 230 255 L470 220"
          stroke={GREY}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M930 220 L1170 255 Q1225 270 1240 320 L1280 510"
          stroke={GREY}
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* ── PILOT FLYING ── */}
        <circle cx={330} cy={350} r={40} stroke={GREY} strokeWidth={7} fill="#FFFFFF" />
        <path d="M330 390 V500" stroke={GREY} strokeWidth={7} strokeLinecap="round" />
        <path d="M330 420 L285 475" stroke={GREY} strokeWidth={7} strokeLinecap="round" />
        <path d="M330 420 L390 470" stroke={GREY} strokeWidth={7} strokeLinecap="round" />
        <path d="M330 500 L290 565" stroke={GREY} strokeWidth={7} strokeLinecap="round" />
        <path d="M330 500 L375 565" stroke={GREY} strokeWidth={7} strokeLinecap="round" />

        <rect x={205} y={430} width={90} height={80} rx={6} stroke={GREY} strokeWidth={4} fill="none" />
        <line x1={220} y1={450} x2={270} y2={450} stroke={GREY} strokeWidth={4} strokeLinecap="round" />
        <line x1={220} y1={470} x2={260} y2={470} stroke={GREY} strokeWidth={4} strokeLinecap="round" />
        <line x1={220} y1={490} x2={270} y2={490} stroke={GREY} strokeWidth={4} strokeLinecap="round" />

        <circle cx={285} cy={475} r={10} fill={GREY} />
        <line x1={285} y1={475} x2={315} y2={475} stroke={GREY} strokeWidth={7} strokeLinecap="round" />

        <text x={330} y={650} textAnchor="middle" fill={flyingLabelColor} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={31}>
          PILOT FLYING
        </text>

        {/* ── PILOT MONITORING ── */}
        <circle cx={1070} cy={350} r={40} stroke={monitoringFigureStroke} strokeWidth={7} fill="#FFFFFF" />
        <path d="M1070 390 V500" stroke={monitoringFigureStroke} strokeWidth={7} strokeLinecap="round" />
        <path d="M1070 420 L1025 475" stroke={monitoringFigureStroke} strokeWidth={7} strokeLinecap="round" />
        <path d="M1070 420 L1130 470" stroke={monitoringFigureStroke} strokeWidth={7} strokeLinecap="round" />
        <path d="M1070 500 L1030 565" stroke={monitoringFigureStroke} strokeWidth={7} strokeLinecap="round" />
        <path d="M1070 500 L1115 565" stroke={monitoringFigureStroke} strokeWidth={7} strokeLinecap="round" />

        <rect x={1130} y={420} width={110} height={95} rx={6} stroke={GREY} strokeWidth={4} fill="none" />
        <path d="M1150 450 L1158 458 L1172 440" stroke={LIME} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1={1182} y1={450} x2={1218} y2={450} stroke={GREY} strokeWidth={4} strokeLinecap="round" />
        <path d="M1150 480 L1158 488 L1172 470" stroke={LIME} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1={1182} y1={480} x2={1218} y2={480} stroke={GREY} strokeWidth={4} strokeLinecap="round" />

        <text x={1070} y={650} textAnchor="middle" fill={monitoringLabelColor} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={31}>
          PILOT MONITORING
        </text>

        {/* ── CENTRAL PROCESS: Challenge → Response → Cross-check ── */}
        <g opacity={challengeOpacity} transform={`translate(0, ${stepY(challengeAppearFrame)})`}>
          <rect x={585} y={175} width={230} height={110} rx={12} stroke={GREY} strokeWidth={4} fill="#FFFFFF" />
          <path d="M700 198 L720 233 H680 Z" stroke={LIME} strokeWidth={5} strokeLinejoin="round" fill="none" />
          <line x1={700} y1={210} x2={700} y2={221} stroke={LIME} strokeWidth={4} strokeLinecap="round" />
          <circle cx={700} cy={228} r={2.5} fill={LIME} />
          <text x={700} y={265} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={25}>
            Challenge
          </text>
        </g>

        <path d="M700 300 V330" stroke={LIME} strokeWidth={5} strokeLinecap="round" markerEnd="url(#cc-arrow)" opacity={responseOpacity} />

        <g opacity={responseOpacity} transform={`translate(0, ${stepY(responseAppearFrame)})`}>
          <rect x={585} y={350} width={230} height={110} rx={12} stroke={GREY} strokeWidth={4} fill="#FFFFFF" />
          <circle cx={700} cy={385} r={18} stroke={LIME} strokeWidth={7} fill="none" />
          <circle cx={700} cy={385} r={5} fill={LIME} />
          <text x={700} y={435} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={25}>
            Response
          </text>
        </g>

        <path d="M700 475 V505" stroke={LIME} strokeWidth={5} strokeLinecap="round" markerEnd="url(#cc-arrow)" opacity={crossCheckOpacity} />

        <g opacity={crossCheckOpacity} transform={`translate(0, ${stepY(crossCheckAppearFrame)})`}>
          <rect x={585} y={525} width={230} height={110} rx={12} stroke={GREY} strokeWidth={4} fill="#FFFFFF" />
          <circle cx={700} cy={560} r={19} stroke={LIME} strokeWidth={5} fill="none" />
          <path d="M690 560 L698 568 L714 550" stroke={LIME} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x={700} y={610} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={25}>
            Cross-check
          </text>
        </g>
      </svg>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
