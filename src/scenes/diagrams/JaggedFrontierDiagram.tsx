import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../../tokens';
import { LogoFooter } from '../../Logo';

type Props = {
  // Scene-local frame at which the jagged line begins drawing itself.
  lineStartFrame?: number;
  // How many frames the draw-on animation takes.
  lineDrawFrames?: number;
  // Scene-local frame at which the graduate-level-problem card appears.
  // Defaults to right when the line finishes drawing.
  graduateCardFrame?: number;
  // Scene-local frame at which the tiny-unfamiliar-game card appears.
  // Defaults to shortly after the graduate card.
  gameCardFrame?: number;
};

const FRONTIER_PATH = `
  M 0 560
  L 32 525 L 70 560 L 105 535 L 138 585 L 170 495 L 202 545 L 236 470 L 270 540
  L 302 505 L 335 570 L 370 630 L 405 610 L 445 535 L 485 585 L 510 715 L 548 535
  L 575 470 L 600 505 L 625 460 L 650 350 L 680 545 L 705 515 L 735 530 L 760 470
  L 790 600 L 825 625 L 860 510 L 895 615 L 930 450 L 970 505 L 1005 345 L 1040 460
  L 1085 495 L 1110 575 L 1145 555 L 1175 445 L 1195 510 L 1220 490 L 1245 560
  L 1285 540 L 1325 635 L 1360 520 L 1398 570 L 1438 530 L 1470 455 L 1505 500
  L 1540 500 L 1600 455
`;

function useCardReveal(frame: number, startFrame: number) {
  const opacity = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [startFrame, startFrame + 18], [0.85, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return { opacity, scale };
}

export const JaggedFrontierDiagram: React.FC<Props> = ({
  lineStartFrame = 0,
  lineDrawFrames = 100,
  graduateCardFrame,
  gameCardFrame,
}) => {
  const frame = useCurrentFrame();

  const introOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const drawProgress = interpolate(frame, [lineStartFrame, lineStartFrame + lineDrawFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineEndFrame = lineStartFrame + lineDrawFrames;
  const graduate = useCardReveal(frame, graduateCardFrame ?? lineEndFrame);
  const game = useCardReveal(frame, gameCardFrame ?? (lineEndFrame + 20));

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <svg viewBox="0 0 1600 900" width="100%" height="100%" role="img">
        <title>Jagged frontier with task cards</title>

        <g style={{ opacity: introOpacity }}>
          {/* Good zone label */}
          <g id="good-zone-label">
            <circle cx="120" cy="255" r="54" fill="#FFFFFF" stroke="#85E13A" strokeWidth="6" />
            <path
              d="M95 275 L95 240 H110 L120 218 Q126 205 135 213 Q140 219 136 232 L134 240 H158 Q168 240 165 252 L160 275 Q158 284 148 284 H118 Q108 284 102 278 Z"
              fill="none"
              stroke="#444444"
              strokeWidth="6"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <rect x="82" y="245" width="14" height="34" rx="2" fill="none" stroke="#444444" strokeWidth="6" />
            <text x="205" y="245" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fontWeight="700">
              AI IS GOOD
            </text>
            <text x="205" y="290" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fontWeight="700">
              AT THIS
            </text>
          </g>

          {/* Struggle zone label */}
          <g id="struggle-zone-label">
            <circle cx="120" cy="655" r="54" fill="#FFFFFF" stroke="#85E13A" strokeWidth="6" />
            <g transform="translate(0 1310) scale(1 -1)">
              <path
                d="M95 675 L95 640 H110 L120 618 Q126 605 135 613 Q140 619 136 632 L134 640 H158 Q168 640 165 652 L160 675 Q158 684 148 684 H118 Q108 684 102 678 Z"
                fill="none"
                stroke="#444444"
                strokeWidth="6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <rect x="82" y="645" width="14" height="34" rx="2" fill="none" stroke="#444444" strokeWidth="6" />
            </g>
            <text x="205" y="645" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fontWeight="700">
              AI STRUGGLES
            </text>
            <text x="205" y="690" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="40" fontWeight="700">
              HERE
            </text>
          </g>
        </g>

        {/* Jagged frontier line — draws itself along its own path */}
        <path
          d={FRONTIER_PATH}
          fill="none"
          stroke="#85E13A"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawProgress}
        />

        {/* Graduate-level problem card — appears once the line reaches its peak */}
        <g style={{ opacity: graduate.opacity, transform: `scale(${graduate.scale})`, transformOrigin: '650px 350px' }}>
          <line x1="650" y1="350" x2="650" y2="270" stroke="#85E13A" strokeWidth="5" />
          <circle cx="650" cy="350" r="14" fill="#FFFFFF" stroke="#85E13A" strokeWidth="5" />

          <rect x="480" y="125" width="430" height="145" rx="14" fill="#FFFFFF" stroke="#444444" strokeWidth="3" />
          <rect x="500" y="145" width="88" height="88" rx="12" fill="#85E13A" />
          <g fill="none" stroke="#444444" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M515 185 L544 170 L573 185 L544 200 Z" />
            <path d="M526 191 V210 Q544 221 562 210 V191" />
            <line x1="573" y1="185" x2="573" y2="210" />
          </g>
          <text x="615" y="170" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="700">
            GRADUATE-LEVEL
          </text>
          <text x="615" y="205" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="700">
            PROBLEM
          </text>
          <text x="615" y="240" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="18">
            Complex reasoning,
          </text>
          <circle cx="855" cy="197" r="26" fill="#85E13A" />
          <path d="M842 198 L852 208 L869 186" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Tiny unfamiliar game card — appears shortly after */}
        <g style={{ opacity: game.opacity, transform: `scale(${game.scale})`, transformOrigin: '1285px 635px' }}>
          <line x1="1285" y1="635" x2="1285" y2="700" stroke="#444444" strokeWidth="5" />
          <circle cx="1285" cy="635" r="14" fill="#FFFFFF" stroke="#444444" strokeWidth="5" />

          <rect x="1065" y="690" width="430" height="145" rx="14" fill="#FFFFFF" stroke="#444444" strokeWidth="3" />
          <rect x="1085" y="710" width="88" height="88" rx="12" fill="#E5484D" />
          <g fill="#FFFFFF">
            <rect x="1105" y="738" width="10" height="10" />
            <rect x="1125" y="738" width="10" height="10" />
            <rect x="1115" y="728" width="10" height="10" />
            <rect x="1095" y="748" width="50" height="12" />
            <rect x="1105" y="760" width="10" height="10" />
            <rect x="1125" y="760" width="10" height="10" />
          </g>
          <text x="1200" y="735" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="700">
            TINY UNFAMILIAR
          </text>
          <text x="1200" y="770" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="28" fontWeight="700">
            GAME
          </text>
          <text x="1200" y="805" fill="#444444" fontFamily="Arial, Helvetica, sans-serif" fontSize="18">
            Specific rules, no prior knowledge
          </text>
          <circle cx="1450" cy="762" r="26" fill="#444444" />
          <g stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round">
            <line x1="1440" y1="752" x2="1460" y2="772" />
            <line x1="1460" y1="752" x2="1440" y2="772" />
          </g>
        </g>
      </svg>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
