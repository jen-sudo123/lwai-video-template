import React from 'react';
import { interpolate } from 'remotion';

type Props = {
  frame: number;
  // Scene-local frame at which the human figure dims out. Omit to never dim.
  humanDimFrame?: number;
};

export const AiHumanDecisionDiagram: React.FC<Props> = ({ frame, humanDimFrame }) => {
  const humanOpacity = humanDimFrame != null
    ? interpolate(frame, [humanDimFrame, humanDimFrame + 20], [1, 0.18], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 1;

  return (
    <svg viewBox="0 0 1600 900" width="100%" height="100%" role="img">
      <title>AI output to human to decision</title>

      {/* AI OUTPUT CARD */}
      <g id="ai-output">
        <rect x="100" y="325" width="390" height="220" rx="18" fill="#FFFFFF" stroke="#444444" strokeWidth="6" />
        <g id="robot">
          <line x1="205" y1="405" x2="205" y2="370" stroke="#444444" strokeWidth="6" strokeLinecap="round" />
          <circle cx="205" cy="365" r="10" fill="#85E13A" stroke="#444444" strokeWidth="4" />
          <rect x="150" y="410" width="110" height="78" rx="28" fill="#FFFFFF" stroke="#444444" strokeWidth="6" />
          <circle cx="185" cy="448" r="13" fill="#444444" />
          <circle cx="225" cy="448" r="13" fill="#444444" />
          <line x1="145" y1="430" x2="145" y2="467" stroke="#444444" strokeWidth="6" strokeLinecap="round" />
          <line x1="265" y1="430" x2="265" y2="467" stroke="#444444" strokeWidth="6" strokeLinecap="round" />
        </g>
        <g id="ai-text-lines" stroke="#444444" strokeWidth="6" strokeLinecap="round">
          <line x1="305" y1="395" x2="445" y2="395" />
          <line x1="305" y1="430" x2="445" y2="430" />
          <line x1="305" y1="465" x2="420" y2="465" />
        </g>
        <line x1="305" y1="505" x2="375" y2="505" stroke="#85E13A" strokeWidth="7" strokeLinecap="round" />
        <text x="295" y="605" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="38" fontWeight="700">
          AI OUTPUT
        </text>
      </g>

      {/* ARROW AI TO HUMAN */}
      <g id="arrow-ai-human" stroke="#85E13A" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="520" y1="435" x2="645" y2="435" />
        <path d="M615 405 L645 435 L615 465" />
      </g>

      {/* HUMAN — dims out at humanDimFrame */}
      <g id="human" style={{ opacity: humanOpacity }}>
        <circle cx="785" cy="435" r="120" fill="#FFFFFF" stroke="#85E13A" strokeWidth="6" />
        <ellipse cx="785" cy="405" rx="43" ry="52" fill="#FFFFFF" stroke="#444444" strokeWidth="6" />
        <path
          d="M745 398 Q748 350 785 345 Q825 348 827 395 Q810 375 790 375 Q770 380 755 395 Z"
          fill="#444444"
        />
        <line x1="770" y1="455" x2="770" y2="480" stroke="#444444" strokeWidth="6" strokeLinecap="round" />
        <line x1="800" y1="455" x2="800" y2="480" stroke="#444444" strokeWidth="6" strokeLinecap="round" />
        <path
          d="M705 535 Q720 485 770 478 L785 495 L800 478 Q850 485 865 535"
          fill="none"
          stroke="#444444"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M755 482 L785 515 L815 482" fill="none" stroke="#444444" strokeWidth="6" strokeLinejoin="round" />
        <text x="785" y="605" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="38" fontWeight="700">
          HUMAN
        </text>
      </g>

      {/* ARROW HUMAN TO DECISION */}
      <g id="arrow-human-decision" stroke="#85E13A" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <line x1="925" y1="435" x2="1050" y2="435" />
        <path d="M1020 405 L1050 435 L1020 465" />
      </g>

      {/* DECISION CARD */}
      <g id="decision">
        <rect x="1085" y="325" width="390" height="220" rx="18" fill="#FFFFFF" stroke="#444444" strokeWidth="6" />
        <circle cx="1190" cy="430" r="56" fill="#FFFFFF" stroke="#85E13A" strokeWidth="6" />
        <path d="M1155 432 L1180 457 L1225 400" fill="none" stroke="#85E13A" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <g id="decision-text-lines" stroke="#444444" strokeWidth="6" strokeLinecap="round">
          <line x1="1280" y1="395" x2="1410" y2="395" />
          <line x1="1280" y1="435" x2="1440" y2="435" />
          <line x1="1280" y1="475" x2="1375" y2="475" />
        </g>
        <text x="1280" y="605" textAnchor="middle" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="38" fontWeight="700">
          DECISION
        </text>
      </g>
    </svg>
  );
};
