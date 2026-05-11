import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';

type CenteredQuoteProps = {
  text: string;
  attribution?: string;
  animation?: 'kinetic' | 'fade' | 'auto';
};

// The hero statement. Big centered serif text. Use for stats, key claims,
// pull-quotes — anything that should land hard and breathe.
export const CenteredQuote: React.FC<CenteredQuoteProps> = ({
  text,
  attribution,
  animation = 'auto',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            ...typography.subtitle,
            color: colors.black,
            maxWidth: 1500,
            margin: '0 auto',
          }}
        >
          <AnimatedText text={text} animation={animation} />
        </div>

        {attribution && (
          <div
            style={{
              ...typography.caption,
              color: colors.neutral600,
              marginTop: 40,
            }}
          >
            <AnimatedText text={`— ${attribution}`} animation="fade" />
          </div>
        )}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
