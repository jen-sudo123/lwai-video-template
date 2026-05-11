import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

type Props = {
  label?: string;
  title?: string;
  leftLabel?: string;
  leftPrompts?: string[];
  leftPromptTimings?: number[];
  rightLabel?: string;
  rightPrompts?: string[];
  rightPromptTimings?: number[];
  titleTiming?: number;
};

// A single prompt-box card that springs in at a given frame
const PromptBox: React.FC<{
  text: string;
  appearFrame: number;
  accent?: boolean; // lime border vs. white
}> = ({ text, appearFrame, accent = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 18, stiffness: 160, mass: 0.7 },
  });
  const scale = interpolate(pop, [0, 1], [0.88, 1]);
  const opacity = interpolate(frame - appearFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(pop, [0, 1], [24, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        backgroundColor: colors.white,
        borderRadius: 16,
        border: `2px solid ${accent ? colors.lime500 : 'rgba(0,0,0,0.10)'}`,
        padding: '22px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        boxShadow: accent
          ? `0 0 0 1px ${colors.lime500}22`
          : '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Prompt icon dot */}
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: accent ? colors.lime500 : colors.neutral600,
          flexShrink: 0,
          opacity: 0.7,
        }}
      />
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 30,
          fontWeight: 500,
          lineHeight: 1.4,
          color: colors.black,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </span>
    </div>
  );
};

// Hidden judgment-call box — same shape but dimmed, with a "?" icon
const JudgmentBox: React.FC<{
  text: string;
  appearFrame: number;
}> = ({ text, appearFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pop = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 18, stiffness: 160, mass: 0.7 },
  });
  const scale = interpolate(pop, [0, 1], [0.88, 1]);
  const opacity = interpolate(frame - appearFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(pop, [0, 1], [24, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        border: '2px dashed rgba(0,0,0,0.15)',
        padding: '22px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      {/* Hidden icon */}
      <span
        style={{
          fontFamily: fonts.serif,
          fontSize: 24,
          fontWeight: 700,
          color: colors.neutral600,
          flexShrink: 0,
          opacity: 0.5,
        }}
      >
        ?
      </span>
      <span
        style={{
          fontFamily: fonts.sans,
          fontSize: 30,
          fontWeight: 400,
          lineHeight: 1.4,
          color: colors.neutral600,
          letterSpacing: '-0.01em',
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const PromptBoxSplit: React.FC<Props> = ({
  label = 'THE GAP',
  title = 'The model makes judgment calls you never agreed on.',
  leftLabel = 'YOU ASK',
  leftPrompts = [],
  leftPromptTimings = [],
  rightLabel = 'THE MODEL DECIDES',
  rightPrompts = [],
  rightPromptTimings = [],
  titleTiming = 0,
}) => {
  const frame = useCurrentFrame();

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [titleTiming, titleTiming + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(frame, [titleTiming, titleTiming + 20], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const colLabelOpacity = interpolate(frame, [20, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const COLUMN_W = (layout.width - layout.safeMargin * 2 - 64) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* ── Header label only ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: 72,
          ...typography.label,
          color: colors.neutral600,
          opacity: labelOpacity,
        }}
      >
        {label}
      </div>

      {/* ── Two columns ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: 160,
          bottom: 100,
          display: 'flex',
          gap: 64,
        }}
      >
        {/* LEFT — what you ask */}
        <div style={{ width: COLUMN_W, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div
            style={{
              ...typography.label,
              color: colors.lime500,
              marginBottom: 28,
              opacity: colLabelOpacity,
            }}
          >
            {leftLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {leftPrompts.map((text, i) => (
              <PromptBox
                key={i}
                text={text}
                appearFrame={leftPromptTimings[i] ?? i * 30}
                accent
              />
            ))}
          </div>
        </div>

        {/* Vertical divider */}
        <div
          style={{
            width: 2,
            alignSelf: 'stretch',
            backgroundColor: colors.neutral200,
            opacity: colLabelOpacity,
          }}
        />

        {/* RIGHT — hidden judgment calls */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div
            style={{
              ...typography.label,
              color: colors.neutral600,
              marginBottom: 28,
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {rightPrompts.map((text, i) => (
              <JudgmentBox
                key={i}
                text={text}
                appearFrame={rightPromptTimings[i] ?? i * 30}
              />
            ))}
          </div>
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
