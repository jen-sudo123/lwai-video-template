import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';

export type Takeaway = {
  kicker: string;
  text: string;
};

type TakeawayStackProps = {
  label: string;
  title: string;
  takeaways: Takeaway[];
  timings?: number[];
};

const FADE_FRAMES = 18;

export const TakeawayStack: React.FC<TakeawayStackProps> = ({
  label,
  title,
  takeaways,
  timings,
}) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: 82,
          width: 1560,
        }}
      >
        <div style={{ ...typography.label, marginBottom: 24 }}>{label}</div>
        <div style={{ ...typography.title, color: colors.black }}>
          <FadeText text={title} />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: 360,
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        {takeaways.map((takeaway, index) => {
          const timing = timings?.[index] ?? index * 36;
          const opacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const ty = interpolate(frame, [timing, timing + FADE_FRAMES], [20, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          return (
            <div
              key={`${takeaway.kicker}-${index}`}
              style={{
                opacity,
                transform: `translateY(${ty}px)`,
                display: 'grid',
                gridTemplateColumns: '260px 1fr',
                gap: 54,
                alignItems: 'baseline',
                borderTop: `2px solid ${index === 0 ? colors.lime500 : colors.neutral200}`,
                paddingTop: 28,
              }}
            >
              <div
                style={{
                  ...typography.label,
                  color: index === 0 ? colors.lime500 : colors.neutral600,
                }}
              >
                {takeaway.kicker}
              </div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 56,
                  lineHeight: 1.12,
                  letterSpacing: '-0.04em',
                  color: colors.black,
                }}
              >
                {takeaway.text}
              </div>
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
