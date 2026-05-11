import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';
import { PlaceholderImage, isPlaceholder, getPlaceholderLabel } from './PlaceholderImage';

type TextImageSplitProps = {
  text: string;
  // Real image: 'images/laptop.jpg'
  // Placeholder: 'placeholder:Description of what goes here'
  image: string;
  animation?: 'typewriter' | 'kinetic' | 'fade' | 'auto';
};

// Concept + supporting visual. Text reads left, image fades in on the right.
export const TextImageSplit: React.FC<TextImageSplitProps> = ({
  text,
  image,
  animation = 'typewriter',
}) => {
  const frame = useCurrentFrame();

  // Image fades in over 20 frames (~0.67s) with a slight upward drift
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
      {/* Text — left half */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          width: layout.width / 2 - layout.safeMargin - 40,
        }}
      >
        <div style={{ ...typography.title, color: colors.black }}>
          <AnimatedText text={text} animation={animation} />
        </div>
      </div>

      {/* Image — right half, fades in */}
      <div
        style={{
          position: 'absolute',
          right: layout.safeMargin,
          top: layout.safeMargin,
          width: layout.width / 2 - layout.safeMargin - 40,
          height: layout.height - layout.safeMargin * 2 - 60,
          overflow: 'hidden',
          borderRadius: 8,
          opacity: imageOpacity,
          transform: `translateY(${imageTranslateY}px)`,
        }}
      >
        {isPlaceholder(image) ? (
          <PlaceholderImage label={getPlaceholderLabel(image)} />
        ) : (
          <Img
            src={staticFile(image)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        )}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
