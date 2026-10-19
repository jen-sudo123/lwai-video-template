import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';

type Props = {
  // Scene-relative frame at which the "Apply your judgment" figure starts fading in.
  judgmentAppearFrame?: number;
  // Scene-relative frame at which the camera starts zooming into the
  // "Apply your judgment" corner. The zoom ramps up then holds (freezes)
  // for the rest of the scene. Omit to disable the zoom entirely.
  zoomStartFrame?: number;
  zoomScale?: number;
};

// Automation-bias 2x2 diagram. Axes, labels, and the "Defer to AI" quadrant are
// present from frame 0; the "Apply your judgment" quadrant fades in gradually
// on top of the unchanged diagram. Optionally zooms into and holds on the
// "Apply your judgment" corner later in the scene.
export const AutomationBiasDiagram: React.FC<Props> = ({
  judgmentAppearFrame = 60,
  zoomStartFrame,
  zoomScale = 2,
}) => {
  const frame = useCurrentFrame();

  const baseOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const judgmentOpacity = interpolate(
    frame,
    [judgmentAppearFrame, judgmentAppearFrame + 40],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const judgmentTranslateY = interpolate(
    frame,
    [judgmentAppearFrame, judgmentAppearFrame + 40],
    [16, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Zoom toward the "Apply your judgment" content (roughly x:990-1330, y:195-340
  // in the 1600x900 viewBox), ramping over 30 frames then holding at zoomScale.
  const zoomProgress = zoomStartFrame === undefined
    ? 0
    : interpolate(frame, [zoomStartFrame, zoomStartFrame + 30], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const currentZoomScale = 1 + (zoomScale - 1) * zoomProgress;
  // Centered on the full "Apply your judgment" content block (figure, document,
  // and text), not just the figure, so the headline text stays in frame at 2x.
  const zoomCenterXPct = (1258 / 1600) * 100;
  const zoomCenterYPct = (298 / 900) * 100;

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      <svg
        width={1600}
        height={900}
        viewBox="0 0 1600 900"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          opacity: baseOpacity,
          transform: `scale(${currentZoomScale})`,
          transformOrigin: `${zoomCenterXPct}% ${zoomCenterYPct}%`,
        }}
      >
        <rect width={1600} height={900} fill="#FFFFFF" />

        {/* Title / Y axis label */}
        <text x={800} y={70} textAnchor="middle" fontFamily="'IBM Plex Serif', serif" fontSize={36} fill="#444444">
          LEVEL OF CRITICAL THINKING APPLIED
        </text>
        <text x={800} y={120} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={30} fontWeight={700} fill="#85E13A">
          HIGH
        </text>
        <text x={800} y={850} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={30} fontWeight={700} fill="#85E13A">
          LOW
        </text>

        {/* Axes */}
        <line x1={800} y1={155} x2={800} y2={810} stroke="#444444" strokeWidth={4} />
        <path d="M788 170 L800 155 L812 170" fill="none" stroke="#444444" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M788 795 L800 810 L812 795" fill="none" stroke="#444444" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />

        <line x1={270} y1={470} x2={1250} y2={470} stroke="#444444" strokeWidth={4} />
        <path d="M288 458 L270 470 L288 482" fill="none" stroke="#444444" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1232 458 L1250 470 L1232 482" fill="none" stroke="#444444" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />

        {/* X axis labels */}
        <text x={190} y={445} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={27} fontWeight={700} fill="#444444">
          CONFIDENCE
        </text>
        <text x={190} y={480} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={27} fontWeight={700} fill="#444444">
          IN AI
        </text>

        <text x={1410} y={445} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={27} fontWeight={700} fill="#444444">
          CONFIDENCE IN
        </text>
        <text x={1410} y={480} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={27} fontWeight={700} fill="#444444">
          YOUR OWN JUDGMENT
        </text>

        {/* Bottom left: Defer to AI */}
        <g stroke="#85E13A" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <circle cx={330} cy={620} r={19} />
          <line x1={342} y1={638} x2={370} y2={700} />
          <line x1={338} y1={642} x2={305} y2={625} />
          <line x1={305} y1={625} x2={320} y2={605} />
          <line x1={340} y1={642} x2={375} y2={620} />
          <line x1={375} y1={620} x2={360} y2={605} />
          <line x1={370} y1={700} x2={430} y2={710} />
          <line x1={430} y1={710} x2={460} y2={760} />
          <line x1={370} y1={700} x2={410} y2={720} />
          <line x1={410} y1={720} x2={435} y2={770} />
        </g>

        <path d="M315 650 L330 715 L390 715" fill="none" stroke="#444444" strokeWidth={4} strokeLinecap="round" />
        <line x1={350} y1={715} x2={350} y2={780} stroke="#444444" strokeWidth={4} />
        <line x1={330} y1={780} x2={370} y2={780} stroke="#444444" strokeWidth={4} />

        <line x1={430} y1={680} x2={560} y2={680} stroke="#444444" strokeWidth={4} />
        <line x1={445} y1={680} x2={445} y2={765} stroke="#444444" strokeWidth={4} />
        <line x1={545} y1={680} x2={545} y2={765} stroke="#444444" strokeWidth={4} />

        <path d="M465 625 L525 625 L515 670 L455 670 Z" fill="#FFFFFF" stroke="#444444" strokeWidth={4} strokeLinejoin="round" />
        <line x1={445} y1={672} x2={530} y2={672} stroke="#444444" strokeWidth={4} strokeLinecap="round" />
        <text x={490} y={655} textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontSize={28} fontWeight={700} fill="#85E13A">
          AI
        </text>

        <text x={575} y={650} fontFamily="'Public Sans', sans-serif" fontSize={28} fontWeight={700} fill="#444444">
          Defer to AI
        </text>
        <text x={575} y={690} fontFamily="'Public Sans', sans-serif" fontSize={22} fill="#444444">
          You defer.
        </text>
        <text x={575} y={725} fontFamily="'Public Sans', sans-serif" fontSize={22} fill="#444444">
          You accept.
        </text>
        <text x={575} y={760} fontFamily="'Public Sans', sans-serif" fontSize={22} fill="#444444">
          You risk.
        </text>

        {/* Top right: Apply your judgment — fades in gradually */}
        <g opacity={judgmentOpacity} transform={`translate(0, ${judgmentTranslateY})`}>
          <g stroke="#85E13A" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx={1020} cy={245} r={19} />
            <line x1={1020} y1={264} x2={1020} y2={335} />
            <line x1={1020} y1={280} x2={990} y2={310} />
            <line x1={990} y1={310} x2={1002} y2={326} />
            <line x1={1020} y1={280} x2={1045} y2={305} />
            <line x1={1045} y1={305} x2={1080} y2={290} />
            <line x1={1020} y1={335} x2={995} y2={395} />
            <line x1={995} y1={395} x2={1010} y2={395} />
            <line x1={1020} y1={335} x2={1045} y2={395} />
            <line x1={1045} y1={395} x2={1060} y2={393} />
          </g>

          <rect x={1080} y={195} width={85} height={120} rx={6} fill="#FFFFFF" stroke="#85E13A" strokeWidth={4} />
          <circle cx={1110} cy={225} r={12} fill="none" stroke="#85E13A" strokeWidth={3} />
          <path d="M1103 225 L1108 230 L1118 218" fill="none" stroke="#85E13A" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          <line x1={1132} y1={219} x2={1150} y2={219} stroke="#85E13A" strokeWidth={3} />
          <line x1={1132} y1={235} x2={1150} y2={235} stroke="#85E13A" strokeWidth={3} />
          <line x1={1095} y1={260} x2={1150} y2={260} stroke="#85E13A" strokeWidth={3} />
          <line x1={1095} y1={277} x2={1150} y2={277} stroke="#85E13A" strokeWidth={3} />
          <line x1={1095} y1={294} x2={1140} y2={294} stroke="#85E13A" strokeWidth={3} />

          <circle cx={1070} cy={275} r={18} fill="#FFFFFF" stroke="#444444" strokeWidth={4} />
          <line x1={1058} y1={289} x2={1047} y2={307} stroke="#444444" strokeWidth={5} strokeLinecap="round" />

          <text x={1205} y={265} fontFamily="'Public Sans', sans-serif" fontSize={28} fontWeight={700} fill="#444444">
            Apply your judgment
          </text>
          <text x={1205} y={305} fontFamily="'Public Sans', sans-serif" fontSize={22} fill="#444444">
            You evaluate.
          </text>
          <text x={1205} y={340} fontFamily="'Public Sans', sans-serif" fontSize={22} fill="#444444">
            You own the work.
          </text>
        </g>
      </svg>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
