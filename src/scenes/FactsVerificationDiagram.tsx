import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';
import { colors, typography, layout } from '../tokens';
import { FadeText } from '../animations/FadeText';

type Props = {
  label?: string;
  title?: string;
  titleHighlight?: string;
  // Scene-relative frame the AI document fades in.
  documentAppearFrame?: number;
  // Scene-relative frames the magnifying glass ARRIVES at each of the four
  // checkable items (it slides between them, so each frame is both the end
  // of one leg and the start of the next).
  moneyCheckFrame?: number;
  dateCheckFrame?: number;
  percentCheckFrame?: number;
  companyCheckFrame?: number;
};

const GREY = '#444444';
const LIME = '#85E13A';

// Pill centers in the document's own (unscaled) coordinate space.
const STOPS = [
  { x: 162, y: 379 },
  { x: 152, y: 459 },
  { x: 152, y: 539 },
  { x: 195, y: 619 },
];

// One magnifying glass slides through the AI document, pausing on each
// checkable claim (a euro figure, a date, a percentage, a proper noun) and
// leaving a checkmark behind. Illustrates "check what's already checkable:
// proper nouns, dates, events, and numbers."
export const FactsVerificationDiagram: React.FC<Props> = ({
  label = 'LETTER 4 OF 5',
  title = 'F Is for Facts and Sources',
  titleHighlight = 'F',
  documentAppearFrame = 0,
  moneyCheckFrame = 40,
  dateCheckFrame = 100,
  percentCheckFrame = 160,
  companyCheckFrame = 220,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = (appearFrame: number, dur = 20) =>
    interpolate(frame - appearFrame, [0, dur], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

  const documentOpacity = fadeIn(documentAppearFrame);

  const arrivalFrames = [moneyCheckFrame, dateCheckFrame, percentCheckFrame, companyCheckFrame];

  // Magnifier slides from stop to stop, arriving at STOPS[i] at arrivalFrames[i].
  let magX = STOPS[0].x;
  let magY = STOPS[0].y;
  if (frame <= arrivalFrames[0]) {
    magX = STOPS[0].x;
    magY = STOPS[0].y;
  } else {
    for (let i = 1; i < STOPS.length; i++) {
      if (frame <= arrivalFrames[i]) {
        const t = interpolate(frame, [arrivalFrames[i - 1], arrivalFrames[i]], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        magX = STOPS[i - 1].x + (STOPS[i].x - STOPS[i - 1].x) * t;
        magY = STOPS[i - 1].y + (STOPS[i].y - STOPS[i - 1].y) * t;
        break;
      }
      if (i === STOPS.length - 1) {
        magX = STOPS[i].x;
        magY = STOPS[i].y;
      }
    }
  }
  const magnifierOpacity = fadeIn(arrivalFrames[0] - 20);

  const checkOpacity = (i: number) => fadeIn(arrivalFrames[i] + 15);

  const DIAGRAM_WIDTH = 1120;
  const DIAGRAM_HEIGHT = 640;

  // Scale + translate the whole document (drawn in its own 0-455/0-680-ish
  // coordinate space) up and center it in the 1400x800 viewBox.
  const SCALE = 1.35;
  const TX = 355.75;
  const TY = -150.25;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Label + title, top-left safe margin */}
      <div style={{ position: 'absolute', left: layout.safeMargin, top: layout.safeMargin }}>
        {label ? <div style={{ ...typography.label, marginBottom: 32 }}>{label}</div> : null}
        {title ? (
          <div style={{ ...typography.title, color: colors.black }}>
            <FadeText text={title} highlight={titleHighlight} />
          </div>
        ) : null}
      </div>

      {/* Diagram, centered below the title */}
      <div
        style={{
          position: 'absolute',
          left: (layout.width - DIAGRAM_WIDTH) / 2,
          top: 320,
          width: DIAGRAM_WIDTH,
          height: DIAGRAM_HEIGHT,
        }}
      >
        <svg width={DIAGRAM_WIDTH} height={DIAGRAM_HEIGHT} viewBox="0 0 1400 800" xmlns="http://www.w3.org/2000/svg">
          <g transform={`translate(${TX}, ${TY}) scale(${SCALE})`}>
            {/* ── AI document ── */}
            <g style={{ opacity: documentOpacity }}>
              <path
                d="M70 135 H390 L455 200 V665 Q455 680 440 680 H70 Q55 680 55 665 V150 Q55 135 70 135Z"
                fill="#FFFFFF"
                stroke={GREY}
                strokeWidth={4}
                strokeLinejoin="round"
              />
              <path d="M390 135 V185 Q390 200 405 200 H455" stroke={GREY} strokeWidth={4} strokeLinejoin="round" fill="none" />

              <rect x={95} y={175} width={66} height={66} rx={10} fill={LIME} />
              <text x={128} y={220} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={30} fontWeight={700}>AI</text>
              <text x={185} y={217} fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={34}>AI Output</text>

              <line x1={100} y1={285} x2={405} y2={285} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
              <line x1={100} y1={315} x2={330} y2={315} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

              <rect x={100} y={355} width={125} height={48} rx={8} fill={LIME} />
              <text x={162} y={388} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={27} fontWeight={700}>&#8364;4.2M</text>
              <line x1={250} y1={370} x2={385} y2={370} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
              <line x1={250} y1={392} x2={350} y2={392} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

              <rect x={100} y={435} width={105} height={48} rx={8} fill={LIME} />
              <text x={152} y={468} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={27} fontWeight={700}>2026</text>
              <line x1={230} y1={450} x2={385} y2={450} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
              <line x1={230} y1={472} x2={345} y2={472} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

              <rect x={100} y={515} width={105} height={48} rx={8} fill={LIME} />
              <text x={152} y={548} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={27} fontWeight={700}>47%</text>
              <line x1={230} y1={530} x2={390} y2={530} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
              <line x1={230} y1={552} x2={350} y2={552} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

              <rect x={100} y={595} width={190} height={48} rx={8} fill={LIME} />
              <text x={195} y={628} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={26} fontWeight={700}>Company X</text>
              <line x1={315} y1={610} x2={395} y2={610} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
              <line x1={315} y1={632} x2={370} y2={632} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

              {/* Checkmarks, one per verified row, appear as the magnifier passes each */}
              {STOPS.map((stop, i) => (
                <g key={i} style={{ opacity: checkOpacity(i) }}>
                  <circle cx={430} cy={stop.y} r={20} fill={LIME} />
                  <path
                    d={`M420 ${stop.y} L427 ${stop.y + 7} L440 ${stop.y - 8}`}
                    stroke="#FFFFFF"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </g>
              ))}
            </g>

            {/* ── Sliding magnifying glass ── */}
            <g style={{ opacity: magnifierOpacity, transform: `translate(${magX - STOPS[0].x}px, ${magY - STOPS[0].y}px)` }}>
              <circle cx={STOPS[0].x} cy={STOPS[0].y} r={70} fill="rgba(255,255,255,0.6)" stroke={GREY} strokeWidth={7} />
              <line
                x1={STOPS[0].x + 50}
                y1={STOPS[0].y + 50}
                x2={STOPS[0].x + 95}
                y2={STOPS[0].y + 95}
                stroke={GREY}
                strokeWidth={14}
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
