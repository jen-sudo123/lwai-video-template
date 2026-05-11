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
  rightLabel?: string;
  rightSteps?: ProcessStep[];
  rightStepTimings?: number[];
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
  animation?: AnimationMode;
};

const FADE_FRAMES = 20;
const COL_WIDTH = 680;
const DIM = 0.15; // dim factor for inactive column
const CROSSFADE = 12;

function StepList({
  steps,
  stepTimings,
  animation,
  frame,
  fps,
}: {
  steps: ProcessStep[];
  stepTimings?: number[];
  animation: AnimationMode;
  frame: number;
  fps: number;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      {steps.map((step, index) => {
        const timing = stepTimings?.[index] ?? index * 28;
        const localFrame = frame - timing;
        const opacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });
        const ty =
          animation === 'kinetic'
            ? spring({ frame: localFrame, fps, config: { damping: 10, stiffness: 80, mass: 0.6 }, from: 60, to: 0 })
            : interpolate(frame, [timing, timing + FADE_FRAMES], [26, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

        return (
          <div
            key={`${step.title}-${index}`}
            style={{ opacity, transform: `translateY(${ty}px)`, position: 'relative' }}
          >
            <div style={{ height: 3, backgroundColor: colors.lime500, marginBottom: 20 }} />
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 48,
                lineHeight: 1.08,
                letterSpacing: '-0.04em',
                color: colors.black,
                marginBottom: 12,
              }}
            >
              <AnimatedText text={step.title} animation={animation} startFrame={timing} />
            </div>
            <div style={{ ...typography.caption, color: colors.neutral600, lineHeight: 1.45 }}>
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
  rightLabel,
  rightSteps,
  rightStepTimings,
  highlights = [],
  animation = 'fade',
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
    return (
      <AbsoluteFill style={{ backgroundColor: colors.white }}>
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 960,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ ...typography.label, marginBottom: 48 }}>{label}</div>
          <StepList steps={steps} stepTimings={stepTimings} animation={animation} frame={frame} fps={fps} />
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
        <StepList steps={steps} stepTimings={stepTimings} animation={animation} frame={frame} fps={fps} />
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
          animation={animation}
          frame={frame}
          fps={fps}
        />
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
