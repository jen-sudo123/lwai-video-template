import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';

type TitleCardGreenProps = {
  title: string;
  subtitle?: string;
  label?: string;
};

// The bold, distinctive opening scene from the VEED template.
// Green background + yellow circle + left-aligned white serif title.
// Title renders immediately with no animation.
export const TitleCardGreen: React.FC<TitleCardGreenProps> = ({
  title,
  subtitle,
  label = 'ADVANCED: PROMPT ENGINEERING',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.titleGreen }}>
      {/* Title block, left-aligned, vertically centered */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: layout.width - layout.safeMargin * 2,
        }}
      >
        <div
          style={{
            ...typography.hero,
            color: colors.white,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              ...typography.subtitle,
              color: colors.white,
              opacity: 0.85,
              marginTop: 24,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Top-left category label */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: layout.safeMargin,
          ...typography.label,
          color: colors.white,
          opacity: 0.85,
        }}
      >
        {label}
      </div>

      <LogoFooter variant="light" />
    </AbsoluteFill>
  );
};
