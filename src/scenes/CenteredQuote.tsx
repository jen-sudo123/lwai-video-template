import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';
import { FadeText } from '../animations/FadeText';

type CenteredQuoteProps = {
  text: string;
  attribution?: string;
  animation?: 'kinetic' | 'fade' | 'auto';
  highlight?: string;
  // Frame at which the highlighted span bounces/pops and switches to lime —
  // use to land the highlight on the moment the word is spoken. Omit to have
  // it lime from the moment the line itself appears.
  highlightFrame?: number;
  // Per-\n-separated-line delay (in frames) so multi-line quotes can land on separate VO beats
  // instead of appearing all at once. Omit for the default single-block reveal.
  lineTimings?: number[];
};

// The hero statement. Big centered serif text. Use for stats, key claims,
// pull-quotes — anything that should land hard and breathe.
export const CenteredQuote: React.FC<CenteredQuoteProps> = ({
  text,
  attribution,
  animation = 'auto',
  highlight,
  highlightFrame,
  lineTimings,
}) => {
  const lines = text.split('\n');
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
          {lineTimings ? (
            lines.map((line, i) => (
              <FadeText
                key={i}
                text={line}
                delayFrames={lineTimings[i] ?? 0}
                highlight={highlight}
                highlightFrame={highlightFrame}
              />
            ))
          ) : (
            <AnimatedText text={text} animation={animation} highlight={highlight} />
          )}
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
