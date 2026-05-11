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
};

const FADE_FRAMES = 20;

export const PromptExample: React.FC<PromptExampleProps> = ({
  label,
  title,
  beforeLabel = 'Weak prompt',
  before,
  afterLabel = 'Stronger prompt',
  after,
  afterTiming = 110,
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
        <PromptPanel
          label={beforeLabel}
          text={before}
          borderColor={colors.neutral200}
          labelColor={colors.neutral600}
          textColor={colors.neutral600}
        />
        <div style={{ opacity: afterOpacity, transform: `translateX(${afterTx}px)` }}>
          <PromptPanel
            label={afterLabel}
            text={after}
            borderColor={colors.lime500}
            labelColor={colors.lime500}
            textColor={colors.black}
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
};

const PromptPanel: React.FC<PromptPanelProps> = ({
  label,
  text,
  borderColor,
  labelColor,
  textColor,
}) => {
  return (
    <div
      style={{
        minHeight: 420,
        borderTop: `5px solid ${borderColor}`,
        backgroundColor: colors.white,
        paddingTop: 34,
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
        }}
      >
        {text}
      </div>
    </div>
  );
};
