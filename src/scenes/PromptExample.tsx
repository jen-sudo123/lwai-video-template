import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';

type PromptExampleProps = {
  label: string;
  title: string;
  beforeLabel?: string;
  before: string;
  afterLabel?: string;
  after: string;
  afterTiming?: number;
  beforeOutcome?: string;
  afterOutcome?: string;
  beforeTiming?: number;
  beforeOutcomeTiming?: number;
  afterOutcomeTiming?: number;
};

// Heroicons-inspired inline SVGs (outline style)
const ArrowTrendingDownIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.25 6L9 12.75l4.286-4.286a11.948 11.948 0 014.306 6.43l.776 2.898m0 0l3.182-5.511m-3.182 5.51l-5.511-3.181" />
  </svg>
);

const SparklesIcon: React.FC<{ color: string }> = ({ color }) => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.814a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
  </svg>
);

const FADE_FRAMES = 20;

export const PromptExample: React.FC<PromptExampleProps> = ({
  label,
  title,
  beforeLabel = 'Weak prompt',
  before,
  afterLabel = 'Stronger prompt',
  after,
  afterTiming = 110,
  beforeOutcome,
  afterOutcome,
  beforeTiming = 0,
  beforeOutcomeTiming = 0,
  afterOutcomeTiming,
}) => {
  const frame = useCurrentFrame();
  const afterOpacity = interpolate(frame, [afterTiming, afterTiming + FADE_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const afterTx = interpolate(frame, [afterTiming, afterTiming + FADE_FRAMES], [28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const beforeOpacity = interpolate(frame, [beforeTiming, beforeTiming + FADE_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const beforeTx = interpolate(frame, [beforeTiming, beforeTiming + FADE_FRAMES], [-28, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const resolvedAfterOutcomeTiming = afterOutcomeTiming ?? afterTiming;
  const beforeOutcomeOpacity = interpolate(frame, [beforeOutcomeTiming, beforeOutcomeTiming + FADE_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const afterOutcomeOpacity = interpolate(frame, [resolvedAfterOutcomeTiming, resolvedAfterOutcomeTiming + FADE_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: 80,
        }}
      >
        <div style={{ ...typography.label, marginBottom: 24 }}>{label}</div>
        <div style={{ ...typography.title, color: colors.black, maxWidth: 1380 }}>
          <FadeText text={title} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          bottom: 140,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 58,
        }}
      >
        <div style={{ opacity: beforeOpacity, transform: `translateX(${beforeTx}px)` }}>
          <PromptPanel
            label={beforeLabel}
            text={before}
            borderColor={colors.neutral200}
            labelColor={colors.neutral600}
            textColor={colors.neutral600}
            outcome={beforeOutcome}
            outcomeIcon={beforeOutcome ? <ArrowTrendingDownIcon color="#E53E3E" /> : undefined}
            outcomeColor="#E53E3E"
            outcomeOpacity={beforeOutcomeOpacity}
          />
        </div>
        <div style={{ opacity: afterOpacity, transform: `translateX(${afterTx}px)` }}>
          <PromptPanel
            label={afterLabel}
            text={after}
            borderColor={colors.lime500}
            labelColor={colors.lime500}
            textColor={colors.black}
            outcome={afterOutcome}
            outcomeIcon={afterOutcome ? <SparklesIcon color={colors.lime500} /> : undefined}
            outcomeColor={colors.lime500}
            outcomeOpacity={afterOutcomeOpacity}
          />
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

type PromptPanelProps = {
  label: string;
  text: string;
  borderColor: string;
  labelColor: string;
  textColor: string;
  outcome?: string;
  outcomeIcon?: React.ReactNode;
  outcomeColor?: string;
  outcomeOpacity?: number;
};

const PromptPanel: React.FC<PromptPanelProps> = ({
  label,
  text,
  borderColor,
  labelColor,
  textColor,
  outcome,
  outcomeIcon,
  outcomeColor,
  outcomeOpacity = 1,
}) => {
  return (
    <div
      style={{
        minHeight: 420,
        borderTop: `5px solid ${borderColor}`,
        backgroundColor: colors.white,
        paddingTop: 34,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          ...typography.label,
          color: labelColor,
          marginBottom: 30,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.serif,
          fontSize: 46,
          lineHeight: 1.25,
          letterSpacing: '-0.025em',
          color: textColor,
          whiteSpace: 'pre-line',
          border: `2px solid ${colors.neutral200}`,
          borderRadius: 12,
          padding: '28px 32px',
          backgroundColor: '#FAFAFA',
        }}
      >
        {text}
      </div>
      {outcome && (
        <div
          style={{
            marginTop: 36,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            opacity: outcomeOpacity,
            color: outcomeColor,
            fontFamily: fonts.serif,
            fontSize: 38,
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
          }}
        >
          {outcomeIcon}
          <span>{outcome}</span>
        </div>
      )}
    </div>
  );
};
