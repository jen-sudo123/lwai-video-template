import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';
import { colors, typography, layout } from '../tokens';
import { FadeText } from '../animations/FadeText';

type Props = {
  label?: string;
  title?: string;
  titleHighlight?: string;
  // Scene-relative frame the human figure + speech bubble fade in.
  humanAppearFrame?: number;
  // Scene-relative frame the AI figure + speech bubble fade in.
  aiAppearFrame?: number;
  // Scene-relative frames the lime "emphasis" tick marks pop in for each side.
  humanEmphasisFrame?: number;
  aiEmphasisFrame?: number;
  // At these scene-relative frames, the placeholder lines in each bubble
  // crossfade into an actual quote.
  humanQuote?: string;
  humanQuoteFrame?: number;
  aiQuote?: string;
  aiQuoteFrame?: number;
};

const GREY = '#444444';
const LIME = '#85E13A';

// A human and an AI mid-conversation, each with a speech bubble and their own
// lime "emphasis" marks — a human pushing back, and an agreeable AI replying.
// Illustrates "these models are trained to be agreeable."
export const AlternativesConversationDiagram: React.FC<Props> = ({
  label = 'LETTER 3 OF 5',
  title = 'A Is for Alternatives',
  titleHighlight = 'A',
  humanAppearFrame = 0,
  aiAppearFrame = 90,
  humanEmphasisFrame = 200,
  aiEmphasisFrame = 220,
  humanQuote,
  humanQuoteFrame,
  aiQuote,
  aiQuoteFrame,
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

  const humanOpacity = fadeIn(humanAppearFrame);
  const humanY = riseIn(humanAppearFrame);
  const aiOpacity = fadeIn(aiAppearFrame);
  const aiY = riseIn(aiAppearFrame);
  const humanEmphasisOpacity = fadeIn(humanEmphasisFrame);
  const aiEmphasisOpacity = fadeIn(aiEmphasisFrame);

  // Placeholder lines crossfade into an actual quote once each is spoken.
  const humanLinesOpacity = humanQuoteFrame === undefined ? 1 : 1 - fadeIn(humanQuoteFrame, 15);
  const humanQuoteOpacity = humanQuoteFrame === undefined ? 0 : fadeIn(humanQuoteFrame, 15);
  const aiLinesOpacity = aiQuoteFrame === undefined ? 1 : 1 - fadeIn(aiQuoteFrame, 15);
  const aiQuoteOpacity = aiQuoteFrame === undefined ? 0 : fadeIn(aiQuoteFrame, 15);

  const DIAGRAM_WIDTH = 1120;
  const DIAGRAM_HEIGHT = 640;

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
          {/* ── Human side ── */}
          <g style={{ opacity: humanOpacity, transform: `translate(0, ${humanY}px)` }}>
            <path
              d="M285 150 H610 Q640 150 640 180 V310 Q640 340 610 340 H430 L380 385 V340 H285 Q255 340 255 310 V180 Q255 150 285 150Z"
              fill="#FFFFFF"
              stroke={GREY}
              strokeWidth={7}
              strokeLinejoin="round"
            />
            <g style={{ opacity: humanLinesOpacity }}>
              <line x1={315} y1={205} x2={575} y2={205} stroke={GREY} strokeWidth={13} strokeLinecap="round" />
              <line x1={315} y1={250} x2={545} y2={250} stroke={GREY} strokeWidth={13} strokeLinecap="round" />
            </g>
            {humanQuote ? (
              <text
                x={447}
                y={258}
                textAnchor="middle"
                fill={GREY}
                fontFamily="'IBM Plex Serif', Georgia, serif"
                fontSize={44}
                style={{ opacity: humanQuoteOpacity }}
              >
                {humanQuote}
              </text>
            ) : null}

            <circle cx={300} cy={470} r={72} fill={GREY} />
            <path
              d="M225 575 Q225 550 250 550 H350 Q375 550 390 568 L455 635 L535 575 Q550 563 565 575 Q578 590 560 605 L475 680 Q450 700 425 678 L365 625 V760 H220 V610 Q220 590 225 575Z"
              fill={GREY}
            />

            <g style={{ opacity: humanEmphasisOpacity }}>
              <line x1={185} y1={400} x2={160} y2={370} stroke={LIME} strokeWidth={14} strokeLinecap="round" />
              <line x1={210} y1={380} x2={200} y2={340} stroke={LIME} strokeWidth={14} strokeLinecap="round" />
              <line x1={175} y1={425} x2={135} y2={438} stroke={LIME} strokeWidth={14} strokeLinecap="round" />
            </g>
          </g>

          {/* ── AI side ── */}
          <g style={{ opacity: aiOpacity, transform: `translate(0, ${aiY}px)` }}>
            <path
              d="M760 150 H1085 Q1115 150 1115 180 V310 Q1115 340 1085 340 H995 V385 L945 340 H760 Q730 340 730 310 V180 Q730 150 760 150Z"
              fill="#FFFFFF"
              stroke={LIME}
              strokeWidth={7}
              strokeLinejoin="round"
            />
            <g style={{ opacity: aiLinesOpacity }}>
              <line x1={790} y1={205} x2={1050} y2={205} stroke={GREY} strokeWidth={13} strokeLinecap="round" />
              <line x1={790} y1={250} x2={1020} y2={250} stroke={GREY} strokeWidth={13} strokeLinecap="round" />
              <line x1={790} y1={295} x2={940} y2={295} stroke={GREY} strokeWidth={13} strokeLinecap="round" />
            </g>
            {aiQuote ? (
              <text
                x={922}
                y={258}
                textAnchor="middle"
                fill={GREY}
                fontFamily="'IBM Plex Serif', Georgia, serif"
                fontSize={44}
                style={{ opacity: aiQuoteOpacity }}
              >
                {aiQuote}
              </text>
            ) : null}

            <line x1={1100} y1={395} x2={1100} y2={430} stroke={GREY} strokeWidth={10} strokeLinecap="round" />
            <circle cx={1100} cy={375} r={24} fill="#FFFFFF" stroke={GREY} strokeWidth={10} />

            <rect x={965} y={430} width={270} height={160} rx={50} fill="#FFFFFF" stroke={GREY} strokeWidth={10} />
            <circle cx={1035} cy={505} r={18} fill={GREY} />
            <circle cx={1165} cy={505} r={18} fill={GREY} />
            <path d="M1070 545 Q1100 575 1130 545" stroke={GREY} strokeWidth={10} strokeLinecap="round" fill="none" />

            <rect x={980} y={605} width={240} height={165} rx={34} fill="#FFFFFF" stroke={GREY} strokeWidth={10} />
            <rect x={1040} y={640} width={120} height={95} rx={14} fill={LIME} />
            <text x={1100} y={710} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={52} fontWeight={700}>AI</text>

            <path d="M980 645 L930 710 L895 655" stroke={GREY} strokeWidth={12} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx={895} cy={655} r={16} fill="#FFFFFF" stroke={GREY} strokeWidth={8} />
            <path d="M895 639 L860 620" stroke={GREY} strokeWidth={12} strokeLinecap="round" />

            <path d="M1220 645 L1265 705" stroke={GREY} strokeWidth={12} strokeLinecap="round" />
            <circle cx={1268} cy={705} r={16} fill="#FFFFFF" stroke={GREY} strokeWidth={8} />
            <line x1={1268} y1={721} x2={1280} y2={770} stroke={GREY} strokeWidth={10} strokeLinecap="round" />

            <g style={{ opacity: aiEmphasisOpacity }}>
              <line x1={1225} y1={425} x2={1245} y2={390} stroke={LIME} strokeWidth={14} strokeLinecap="round" />
              <line x1={1265} y1={440} x2={1300} y2={425} stroke={LIME} strokeWidth={14} strokeLinecap="round" />
            </g>
          </g>
        </svg>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
