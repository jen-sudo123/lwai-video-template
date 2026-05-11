import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';
import { PlaceholderImage, isPlaceholder, getPlaceholderLabel } from './PlaceholderImage';

type CenteredChartProps = {
  // Real image: 'images/chart.png'
  // Placeholder: 'placeholder:Description of chart'
  image: string;
  source?: string;
};

// Data slide. Centered chart image fades in with optional italic source caption.
export const CenteredChart: React.FC<CenteredChartProps> = ({
  image,
  source,
}) => {
  const frame = useCurrentFrame();

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageTranslateY = interpolate(frame, [0, 20], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 100,
          transform: `translateX(-50%) translateY(${imageTranslateY}px)`,
          width: 1300,
          height: 720,
          overflow: 'hidden',
          borderRadius: 8,
          backgroundColor: colors.neutral200,
          opacity: imageOpacity,
        }}
      >
        {isPlaceholder(image) ? (
          <PlaceholderImage label={getPlaceholderLabel(image)} />
        ) : (
          <Img
            src={staticFile(image)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        )}
      </div>

      {source && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            bottom: 160,
            textAlign: 'center',
            ...typography.source,
          }}
        >
          <FadeText text={`Source: ${source}`} delayFrames={10} />
        </div>
      )}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
