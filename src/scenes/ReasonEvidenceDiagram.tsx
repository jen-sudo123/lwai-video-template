import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';
import { colors, typography, layout } from '../tokens';
import { FadeText } from '../animations/FadeText';

type Props = {
  label?: string;
  title?: string;
  titleHighlight?: string;
  // Scene-relative frames each stage of the chain reveals, in order.
  outputAppearFrame?: number;
  assumptionsAppearFrame?: number;
  evidenceAppearFrame?: number;
  conclusionAppearFrame?: number;
  humanAppearFrame?: number;
  // The magnifier finds a weak link between an assumption and its evidence.
  weakConnectionAppearFrame?: number;
  // Scene-relative frame the camera pushes in and holds on the "weak
  // connection" callout. Omit to disable the zoom.
  zoomStartFrame?: number;
  zoomScale?: number;
};

const GREY = '#444444';
const LIME = '#85E13A';
const RED = '#DC2626';

// AI Output → Assumptions → Evidence → Conclusion pipeline, with a human
// figure using a magnifying glass to find where the evidence doesn't
// actually support an assumption. Illustrates "make the AI show its work."
export const ReasonEvidenceDiagram: React.FC<Props> = ({
  label = 'LETTER 2 OF 5',
  title = 'R Is for Reason',
  titleHighlight = 'R',
  outputAppearFrame = 0,
  assumptionsAppearFrame = 140,
  evidenceAppearFrame = 220,
  conclusionAppearFrame = 300,
  humanAppearFrame = 380,
  weakConnectionAppearFrame = 460,
  zoomStartFrame,
  zoomScale = 1.9,
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

  const outputOpacity = fadeIn(outputAppearFrame);
  const assumptionsOpacity = fadeIn(assumptionsAppearFrame);
  const evidenceOpacity = fadeIn(evidenceAppearFrame);
  const conclusionOpacity = fadeIn(conclusionAppearFrame);
  const humanOpacity = fadeIn(humanAppearFrame);
  const weakOpacity = fadeIn(weakConnectionAppearFrame);
  const weakY = riseIn(weakConnectionAppearFrame);

  const DIAGRAM_WIDTH = 1120;
  const DIAGRAM_HEIGHT = 640;

  const zoomProgress = zoomStartFrame === undefined
    ? 0
    : interpolate(frame - zoomStartFrame, [0, 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const currentZoomScale = 1 + (zoomScale - 1) * zoomProgress;
  // "Weak connection" callout sits around x:760-1120, y:650-750 in the 1400x800 viewBox.
  const zoomCenterXPct = (940 / 1400) * 100;
  const zoomCenterYPct = (700 / 800) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Label + title, top-left safe margin — fades out once the zoom pushes in
          (the zoomed diagram grows past its original bounds and would overlap it). */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: layout.safeMargin,
          opacity: zoomStartFrame === undefined
            ? 1
            : interpolate(frame - zoomStartFrame, [0, 20], [1, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
        }}
      >
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
        <svg
          width={DIAGRAM_WIDTH}
          height={DIAGRAM_HEIGHT}
          viewBox="0 0 1400 800"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `scale(${currentZoomScale})`,
            transformOrigin: `${zoomCenterXPct}% ${zoomCenterYPct}%`,
          }}
        >
          {/* ── AI Output card ── */}
          <g style={{ opacity: outputOpacity }}>
            <rect x={70} y={230} width={330} height={360} rx={16} fill="#FFFFFF" stroke={GREY} strokeWidth={4} />
            <rect x={95} y={260} width={66} height={66} rx={10} fill={LIME} />
            <text x={128} y={305} textAnchor="middle" fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={30} fontWeight={700}>AI</text>
            <text x={185} y={305} fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={34}>AI Output</text>

            <line x1={100} y1={355} x2={345} y2={355} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
            <line x1={100} y1={385} x2={305} y2={385} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
            <line x1={100} y1={415} x2={325} y2={415} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
            <line x1={100} y1={445} x2={245} y2={445} stroke={GREY} strokeWidth={6} strokeLinecap="round" />

            <line x1={105} y1={535} x2={350} y2={535} stroke={GREY} strokeWidth={2} />
            <rect x={115} y={495} width={42} height={40} fill={LIME} />
            <rect x={180} y={470} width={42} height={65} fill={LIME} />
            <rect x={245} y={445} width={42} height={90} fill={LIME} />
            <rect x={310} y={415} width={42} height={120} fill={LIME} />

            <path d="M400 260 L455 215" stroke={GREY} strokeWidth={3} strokeDasharray="8 8" />
            <path d="M400 560 L455 610" stroke={GREY} strokeWidth={3} strokeDasharray="8 8" />
          </g>

          {/* ── Assumptions ── */}
          <g style={{ opacity: assumptionsOpacity }}>
            <rect x={455} y={180} width={260} height={440} rx={14} fill="#FFFFFF" stroke={GREY} strokeWidth={4} />
            <text x={585} y={235} textAnchor="middle" fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={32}>Assumptions</text>

            <rect x={485} y={280} width={200} height={70} rx={10} fill="#FFFFFF" stroke={GREY} strokeWidth={2} />
            <circle cx={515} cy={315} r={12} fill={LIME} />
            <line x1={545} y1={305} x2={650} y2={305} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <line x1={545} y1={325} x2={625} y2={325} stroke={GREY} strokeWidth={5} strokeLinecap="round" />

            <rect x={485} y={370} width={200} height={70} rx={10} fill="#FFFFFF" stroke={GREY} strokeWidth={2} />
            <circle cx={515} cy={405} r={12} fill={LIME} />
            <line x1={545} y1={395} x2={650} y2={395} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <line x1={545} y1={415} x2={625} y2={415} stroke={GREY} strokeWidth={5} strokeLinecap="round" />

            <rect x={485} y={460} width={200} height={70} rx={10} fill="#FFFFFF" stroke={GREY} strokeWidth={2} />
            <circle cx={515} cy={495} r={12} fill={LIME} />
            <line x1={545} y1={485} x2={650} y2={485} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <line x1={545} y1={505} x2={625} y2={505} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
          </g>

          {/* ── Evidence ── */}
          <g style={{ opacity: evidenceOpacity }}>
            <rect x={690} y={150} width={260} height={470} rx={14} fill="#FFFFFF" stroke={GREY} strokeWidth={4} />
            <text x={820} y={220} textAnchor="middle" fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={32}>Evidence</text>

            <rect x={720} y={270} width={200} height={70} rx={10} fill="#FFFFFF" stroke={GREY} strokeWidth={2} />
            <rect x={740} y={287} width={28} height={34} rx={3} stroke={GREY} strokeWidth={3} fill="none" />
            <line x1={780} y1={295} x2={890} y2={295} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <line x1={780} y1={315} x2={855} y2={315} stroke={GREY} strokeWidth={5} strokeLinecap="round" />

            <rect x={720} y={360} width={200} height={70} rx={10} fill="#FFFFFF" stroke={GREY} strokeWidth={2} />
            <rect x={740} y={377} width={28} height={34} rx={3} stroke={GREY} strokeWidth={3} fill="none" />
            <line x1={780} y1={385} x2={890} y2={385} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <line x1={780} y1={405} x2={855} y2={405} stroke={GREY} strokeWidth={5} strokeLinecap="round" />

            {/* weak evidence row */}
            <rect x={720} y={450} width={200} height={70} rx={10} fill="#FFFFFF" stroke={LIME} strokeWidth={3} />
            <rect x={740} y={467} width={28} height={34} rx={3} stroke={GREY} strokeWidth={3} fill="none" />
            <line x1={780} y1={475} x2={890} y2={475} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
            <line x1={780} y1={495} x2={855} y2={495} stroke={GREY} strokeWidth={5} strokeLinecap="round" />
          </g>

          {/* ── Conclusion ── */}
          <g style={{ opacity: conclusionOpacity }}>
            <rect x={925} y={120} width={300} height={420} rx={14} fill="#FFFFFF" stroke={GREY} strokeWidth={4} />
            <text x={1075} y={195} textAnchor="middle" fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={32}>Conclusion</text>

            <line x1={980} y1={330} x2={1145} y2={330} stroke={GREY} strokeWidth={2} />
            <rect x={995} y={290} width={22} height={40} fill={LIME} />
            <rect x={1030} y={265} width={22} height={65} fill={LIME} />
            <rect x={1065} y={235} width={22} height={95} fill={LIME} />

            <line x1={975} y1={385} x2={1155} y2={385} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
            <line x1={975} y1={415} x2={1120} y2={415} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
            <line x1={975} y1={445} x2={1080} y2={445} stroke={GREY} strokeWidth={6} strokeLinecap="round" />
          </g>

          {/* ── Human, inspecting with a magnifying glass ── */}
          <g style={{ opacity: humanOpacity }}>
            <circle cx={1270} cy={430} r={38} fill="#FFFFFF" stroke={GREY} strokeWidth={7} />
            <line x1={1270} y1={468} x2={1270} y2={590} stroke={GREY} strokeWidth={7} strokeLinecap="round" />
            <line x1={1270} y1={500} x2={1200} y2={545} stroke={GREY} strokeWidth={7} strokeLinecap="round" />
            <line x1={1270} y1={500} x2={1315} y2={555} stroke={GREY} strokeWidth={7} strokeLinecap="round" />
            <line x1={1270} y1={590} x2={1235} y2={675} stroke={GREY} strokeWidth={7} strokeLinecap="round" />
            <line x1={1270} y1={590} x2={1310} y2={675} stroke={GREY} strokeWidth={7} strokeLinecap="round" />

            <circle cx={930} cy={485} r={85} fill="none" stroke={LIME} strokeWidth={10} />
            <line x1={992} y1={547} x2={1080} y2={635} stroke={LIME} strokeWidth={16} strokeLinecap="round" />
            <line x1={1200} y1={545} x2={1080} y2={635} stroke={GREY} strokeWidth={7} strokeLinecap="round" />
          </g>

          {/* ── Weak connection callout ── */}
          <g style={{ opacity: weakOpacity, transform: `translate(0, ${weakY}px)` }}>
            {/* Warning triangle sits fully inside the flagged evidence row (720-920, 450-520). */}
            <path d="M908 456 L918 478 H896 Z" stroke={RED} strokeWidth={5} strokeLinejoin="round" fill="none" />
            <line x1={908} y1={463} x2={908} y2={470} stroke={RED} strokeWidth={4} strokeLinecap="round" />
            <circle cx={908} cy={474} r={2} fill={RED} />

            <line x1={930} y1={570} x2={900} y2={645} stroke={LIME} strokeWidth={3} strokeDasharray="8 8" />

            <rect x={740} y={635} width={440} height={135} rx={14} fill="#FFFFFF" stroke={LIME} strokeWidth={3} />
            <text x={770} y={678} fill={GREY} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize={28}>Weak connection</text>
            <text fill={GREY} fontFamily="'Public Sans', Arial, sans-serif" fontSize={20}>
              <tspan x={770} y={710}>Evidence does not clearly support</tspan>
              <tspan x={770} y={736}>this assumption.</tspan>
            </text>
          </g>
        </svg>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
