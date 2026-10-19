import React from 'react';
import { interpolate } from 'remotion';

type Props = {
  frame: number;
  // Frame offsets (relative to the scene) at which each step reveals:
  // [fluent answer, confidence, accept, verify (skipped)]
  timings?: number[];
};

const DEFAULT_TIMINGS = [0, 150, 320, 472];
const POP_FRAMES = 24;

// Reveal a group with a fade + slight upward settle, matching the rest of
// this project's card/icon entrance style.
function useReveal(frame: number, delay: number) {
  const opacity = interpolate(frame, [delay, delay + POP_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ty = interpolate(frame, [delay, delay + POP_FRAMES], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [delay, delay + POP_FRAMES], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { opacity, ty, scale };
}

export const FluencyPipelineDiagram: React.FC<Props> = ({ frame, timings = DEFAULT_TIMINGS }) => {
  const [t0, t1, t2, t3] = timings.length === 4 ? timings : DEFAULT_TIMINGS;

  const fluentAnswer = useReveal(frame, t0);
  const arrow1 = useReveal(frame, t1);
  const confidence = useReveal(frame, t1);
  const arrow2 = useReveal(frame, t2);
  const accept = useReveal(frame, t2);
  const bypass = useReveal(frame, t3);
  const verify = useReveal(frame, t3);

  const group = (r: ReturnType<typeof useReveal>, cx: number, cy: number) => ({
    opacity: r.opacity,
    transform: `translate(${cx}px, ${(cy + r.ty)}px) scale(${r.scale}) translate(${-cx}px, ${-cy}px)`,
  });

  return (
    <svg viewBox="0 0 1600 900" width="100%" height="100%" role="img">
      <title>Fluent answer to confidence to accept, skipping verification</title>

      {/* Fluent Answer */}
      <g style={group(fluentAnswer, 300, 270)}>
        <circle cx="300" cy="270" r="155" fill="#FFFFFF" stroke="#444444" strokeWidth="8" />
        <path
          d="M215 210 Q215 190 235 190 H355 Q375 190 375 210 V300 Q375 320 355 320 H270 L235 355 V320 Q215 320 215 300 Z"
          fill="none"
          stroke="#444444"
          strokeWidth="8"
          strokeLinejoin="round"
        />
        <g stroke="#85E13A" strokeWidth="9" strokeLinecap="round">
          <line x1="255" y1="235" x2="335" y2="235" />
          <line x1="255" y1="265" x2="335" y2="265" />
          <line x1="255" y1="295" x2="315" y2="295" />
        </g>
        <text x="300" y="475" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="38" fontWeight="700">
          FLUENT ANSWER
        </text>
      </g>

      {/* Arrow 1 */}
      <g style={{ opacity: arrow1.opacity }} stroke="#444444" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="470" y1="270" x2="605" y2="270" />
        <path d="M575 240 L605 270 L575 300" />
      </g>

      {/* Confidence */}
      <g style={group(confidence, 800, 270)}>
        <circle cx="800" cy="270" r="155" fill="#FFFFFF" stroke="#444444" strokeWidth="8" />
        <path d="M695 290 A110 110 0 0 1 905 290" fill="none" stroke="#85E13A" strokeWidth="16" strokeLinecap="round" />
        <line x1="800" y1="290" x2="860" y2="225" stroke="#444444" strokeWidth="10" strokeLinecap="round" />
        <circle cx="800" cy="290" r="15" fill="#FFFFFF" stroke="#444444" strokeWidth="8" />
        <text x="800" y="475" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="38" fontWeight="700">
          CONFIDENCE
        </text>
      </g>

      {/* Arrow 2 */}
      <g style={{ opacity: arrow2.opacity }} stroke="#444444" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="970" y1="270" x2="1105" y2="270" />
        <path d="M1075 240 L1105 270 L1075 300" />
      </g>

      {/* Accept */}
      <g style={group(accept, 1300, 270)}>
        <circle cx="1300" cy="270" r="155" fill="#FFFFFF" stroke="#444444" strokeWidth="8" />
        <rect x="1240" y="215" width="120" height="120" rx="6" fill="none" stroke="#444444" strokeWidth="8" />
        <path d="M1265 275 L1300 310 L1365 235" fill="none" stroke="#85E13A" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
        <text x="1300" y="475" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="38" fontWeight="700">
          ACCEPT
        </text>
      </g>

      {/* Skipped bypass route */}
      <g
        style={{ opacity: bypass.opacity * 0.65 }}
        fill="none"
        stroke="#444444"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="16 18"
      >
        <path d="M300 520 V650 Q300 690 340 690 H620" />
        <path d="M980 690 H1260 Q1300 690 1300 650 V520" />
      </g>

      {/* Verify (skipped) */}
      <g style={group(verify, 800, 690)}>
        <circle cx="800" cy="690" r="125" fill="#FFFFFF" stroke="#444444" strokeWidth="8" />
        <path d="M745 620 H815 L850 655 V735 H745 Z" fill="none" stroke="#444444" strokeWidth="7" strokeLinejoin="round" />
        <path d="M815 620 V655 H850" fill="none" stroke="#444444" strokeWidth="7" strokeLinejoin="round" />
        <g stroke="#444444" strokeWidth="6" strokeLinecap="round">
          <line x1="770" y1="670" x2="815" y2="670" />
          <line x1="770" y1="695" x2="820" y2="695" />
          <line x1="770" y1="720" x2="805" y2="720" />
        </g>
        <circle cx="830" cy="720" r="32" fill="#FFFFFF" stroke="#444444" strokeWidth="7" />
        <line x1="853" y1="743" x2="882" y2="772" stroke="#444444" strokeWidth="8" strokeLinecap="round" />
        <line x1="715" y1="605" x2="885" y2="775" stroke="#85E13A" strokeWidth="12" strokeLinecap="round" />
        <text x="800" y="850" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="36" fontWeight="700">
          VERIFY
        </text>
        <text x="800" y="890" textAnchor="middle" fill="#85E13A" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight="700">
          SKIPPED
        </text>
      </g>
    </svg>
  );
};
