import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';
import { AnimationMode } from './types';

export type ProcessStep = { title: string; body: string };

type ProcessStepsProps = {
  label: string;
  title: string;
  steps: ProcessStep[];
  stepTimings?: number[];
  activeTimings?: number[];
  rightLabel?: string;
  rightSteps?: ProcessStep[];
  rightStepTimings?: number[];
  rightActiveTimings?: number[];
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
  animation?: AnimationMode;
  // When true (single-column mode only), steps lay out left-to-right in a row
  // instead of stacked vertically — a horizontal stepper/timeline.
  horizontal?: boolean;
  // When true (horizontal mode only), each step renders as a bordered rounded
  // card (white bg, soft shadow — matching the three-mode-columns card look)
  // instead of the thin top-line + numbered-square stepper.
  cardStyle?: boolean;
  // Override the horizontal-mode title font size (default 64).
  titleSize?: number;
};

const FADE_FRAMES = 20;
const COL_WIDTH = 680;
const DIM = 0.15; // dim factor for inactive column
const STEP_DIM = 0.2; // dim factor for inactive steps within a column
const CROSSFADE = 12;

function resolveActiveStep(timings: number[] | undefined, frame: number): number {
  if (!timings || timings.length === 0) return -1;
  let last = -1;
  for (let i = 0; i < timings.length; i++) {
    if (frame >= timings[i]) last = i;
  }
  return last;
}

function StepList({
  steps,
  stepTimings,
  activeTimings,
  animation,
  frame,
  fps,
  horizontal = false,
  cardStyle = false,
}: {
  steps: ProcessStep[];
  stepTimings?: number[];
  activeTimings?: number[];
  animation: AnimationMode;
  frame: number;
  fps: number;
  horizontal?: boolean;
  cardStyle?: boolean;
}) {
  const activeIndex = resolveActiveStep(activeTimings, frame);
  const hasActiveTimings = !!activeTimings?.length;

  return (
    <div
      style={
        horizontal
          ? { display: 'flex', flexDirection: 'row', gap: cardStyle ? 24 : 56, width: '100%', alignItems: cardStyle ? 'stretch' : undefined }
          : { display: 'flex', flexDirection: 'column', gap: 48 }
      }
    >
      {steps.map((step, index) => {
        const timing = stepTimings?.[index] ?? 0;
        const localFrame = frame - timing;
        const revealOpacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const tOffset = horizontal
          ? { axis: 'X' as const, from: -20 }
          : { axis: 'Y' as const, from: 26 };
        const tVal =
          animation === 'kinetic'
            ? spring({ frame: localFrame, fps, config: { damping: 10, stiffness: 80, mass: 0.6 }, from: tOffset.from, to: 0 })
            : interpolate(frame, [timing, timing + FADE_FRAMES], [tOffset.from, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

        const isActive = !hasActiveTimings || index === activeIndex;
        const stepOpacity = revealOpacity * (hasActiveTimings && !isActive ? STEP_DIM : 1);
        const lineColor = isActive ? colors.lime500 : colors.neutral200;
        const titleColor = isActive ? colors.black : colors.neutral600;
        const bodyColor = isActive ? colors.neutral600 : colors.neutral200;

        if (cardStyle) {
          return (
            <div
              key={`${step.title}-${index}`}
              style={{
                opacity: stepOpacity,
                transform: `translate${tOffset.axis}(${tVal}px)`,
                flex: 1,
                minWidth: 0,
                borderRadius: 24,
                backgroundColor: colors.white,
                border: `2px solid ${isActive ? colors.lime500 : colors.neutral200}`,
                boxShadow: '0 10px 32px rgba(0,0,0,0.06)',
                padding: 32,
              }}
            >
              <div
                lang="en"
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 38,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: titleColor,
                  marginBottom: 16,
                  hyphens: 'auto' as const,
                  WebkitHyphens: 'auto' as const,
                  overflowWrap: 'break-word' as const,
                }}
              >
                <AnimatedText text={step.title} animation={animation} startFrame={timing} />
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: isActive ? colors.lime500 : colors.neutral200,
                    marginTop: 11,
                    flexShrink: 0,
                  }}
                />
                <div style={{ ...typography.caption, fontSize: 24, color: bodyColor, lineHeight: 1.4 }}>
                  {step.body}
                </div>
              </div>
            </div>
          );
        }

        return (
          <div
            key={`${step.title}-${index}`}
            style={{
              opacity: stepOpacity,
              transform: `translate${tOffset.axis}(${tVal}px)`,
              position: 'relative',
              ...(horizontal ? { flex: 1, minWidth: 0 } : {}),
            }}
          >
            <div style={{ height: 3, backgroundColor: lineColor, marginBottom: 24, transition: 'background-color 0.2s' }} />
            {horizontal && (
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: `2px solid ${isActive ? colors.lime500 : colors.neutral200}`,
                  backgroundColor: isActive ? colors.lime200 : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.sans,
                  fontSize: 20,
                  fontWeight: 700,
                  color: titleColor,
                  marginBottom: 24,
                }}
              >
                {index + 1}
              </div>
            )}
            <div
              lang="en"
              style={{
                fontFamily: fonts.serif,
                fontSize: horizontal ? 40 : 48,
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                color: titleColor,
                marginBottom: 16,
                ...(horizontal
                  ? {
                      hyphens: 'auto' as const,
                      WebkitHyphens: 'auto' as const,
                      overflowWrap: 'break-word' as const,
                    }
                  : {}),
              }}
            >
              <AnimatedText text={step.title} animation={animation} startFrame={timing} />
            </div>
            <div style={{ ...typography.caption, fontSize: horizontal ? 24 : typography.caption.fontSize, color: bodyColor, lineHeight: 1.45 }}>
              {step.body}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({
  label,
  title,
  steps,
  stepTimings,
  activeTimings,
  rightLabel,
  rightSteps,
  rightStepTimings,
  rightActiveTimings,
  highlights = [],
  animation = 'fade',
  horizontal = false,
  cardStyle = false,
  titleSize = 64,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hasRight = !!rightSteps?.length;

  // Resolve which side is active from highlights schedule
  const sorted = [...highlights].sort((a, b) => a.from - b.from);
  const activeIdx = [...sorted].map((_, i) => i).reverse().find(i => frame >= sorted[i].from) ?? -1;
  const activeEntry = activeIdx >= 0 ? sorted[activeIdx] : null;
  const prevEntry = activeIdx > 0 ? sorted[activeIdx - 1] : null;
  const activeVal = activeEntry?.value ?? null;
  const prevVal = prevEntry?.value ?? null;
  const transitionStart = activeEntry?.from ?? 0;

  const progress = interpolate(frame, [transitionStart, transitionStart + CROSSFADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  function sideOpacity(side: 'left' | 'right'): number {
    const toOp = (v: 'left' | 'right' | null) => (v === null || v === side ? 1 : DIM);
    if (!activeEntry || !prevEntry) return toOp(activeVal);
    return interpolate(progress, [0, 1], [toOp(prevVal), toOp(activeVal)]);
  }

  // Right column slide-in: starts 15f before first right step timing
  const rightSlideStart = (rightStepTimings?.[0] ?? 15) - 15;
  const rightColOpacity = interpolate(frame, [rightSlideStart, rightSlideStart + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightColTx = interpolate(frame, [rightSlideStart, rightSlideStart + 25], [32, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Divider fade
  const divOpacity = interpolate(frame, [8, 24], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  if (!hasRight) {
    const containerWidth = horizontal ? layout.width - layout.safeMargin * 2 : 960;
    return (
      <AbsoluteFill style={{ backgroundColor: colors.white }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: containerWidth,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ ...typography.label, marginBottom: horizontal ? 20 : 48, ...(horizontal ? { textAlign: 'center' as const } : {}) }}>{label}</div>
          {horizontal && title && (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: titleSize,
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                color: colors.black,
                textAlign: 'center',
                marginBottom: 64,
              }}
            >
              {title}
            </div>
          )}
          <StepList steps={steps} stepTimings={stepTimings} activeTimings={activeTimings} animation={animation} frame={frame} fps={fps} horizontal={horizontal} cardStyle={cardStyle} />
        </div>
        <LogoFooter variant="dark" />
      </AbsoluteFill>
    );
  }

  const centerX = layout.width / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Left column */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          width: COL_WIDTH,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: sideOpacity('left'),
        }}
      >
        <div style={{ ...typography.label, color: colors.neutral600, marginBottom: 48 }}>{label}</div>
        <StepList steps={steps} stepTimings={stepTimings} activeTimings={activeTimings} animation={animation} frame={frame} fps={fps} />
      </div>

      {/* Vertical divider */}
      <div
        style={{
          position: 'absolute',
          left: centerX - 1,
          top: 100,
          bottom: 100,
          width: 2,
          backgroundColor: colors.neutral200,
          opacity: divOpacity,
        }}
      />

      {/* Right column */}
      <div
        style={{
          position: 'absolute',
          left: centerX + 72,
          width: COL_WIDTH,
          top: '50%',
          transform: `translateY(-50%) translateX(${rightColTx}px)`,
          opacity: rightColOpacity * sideOpacity('right'),
        }}
      >
        <div style={{ ...typography.label, color: colors.lime500, marginBottom: 48 }}>{rightLabel}</div>
        <StepList
          steps={rightSteps!}
          stepTimings={rightStepTimings}
          activeTimings={rightActiveTimings}
          animation={animation}
          frame={frame}
          fps={fps}
        />
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
