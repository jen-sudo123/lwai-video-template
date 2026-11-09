import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';
import { PlaceholderImage, isPlaceholder, getPlaceholderLabel } from './PlaceholderImage';

type CenteredImageCaptionProps = {
  // Real image: 'images/screenshot.png'
  // Placeholder: 'placeholder:Description of what goes here'
  image: string;
  caption?: string;
  animation?: 'typewriter' | 'kinetic' | 'fade' | 'auto';
  // 'cover' (default) fills the box; 'contain' shows the full image without cropping.
  objectFit?: 'cover' | 'contain';
  imageWidth?: number;
  imageZoom?: {
    centerX: number;
    centerY?: number;
    scale?: number;
    startFrame?: number;
  };
  imageZoomKeyframes?: Array<{ startFrame: number; centerX?: number; centerY?: number; scale?: number }>;
};

// Big centered image with optional caption underneath.
// Best for tool screenshots and product UI demos.
export const CenteredImageCaption: React.FC<CenteredImageCaptionProps> = ({
  image,
  caption,
  animation = 'typewriter',
  objectFit = 'cover',
  imageWidth = 1200,
  imageZoom,
  imageZoomKeyframes,
}) => {
  const frame = useCurrentFrame();
  const imageHeight = caption ? 700 : 820;

  const imageOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imageTranslateY = interpolate(frame, [0, 20], [16, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const zoomStartFrame = imageZoom?.startFrame ?? 0;
  const zoomScale = imageZoom?.scale ?? 1;
  const zoomCenterX = imageZoom?.centerX ?? 0.5;
  const zoomCenterY = imageZoom?.centerY ?? 0.5;
  const zoomProgress = interpolate(frame, [zoomStartFrame, zoomStartFrame + 28], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  let currentScale = 1 + (zoomScale - 1) * zoomProgress;
  let originX = zoomCenterX;
  let originY = zoomCenterY;
  if (imageZoomKeyframes && imageZoomKeyframes.length > 0) {
    // Walk keyframes, easing from the previous state into each one.
    let s = 1, x = 0.5, y = 0.5;
    for (const k of imageZoomKeyframes) {
      const t = interpolate(frame, [k.startFrame, k.startFrame + 28], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.inOut(Easing.cubic),
      });
      if (t <= 0) break;
      s = s + ((k.scale ?? 1) - s) * t;
      x = x + ((k.centerX ?? x) - x) * t;
      y = y + ((k.centerY ?? y) - y) * t;
    }
    currentScale = s;
    originX = x;
    originY = y;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: caption ? 100 : 130,
          transform: `translateX(-50%) translateY(${imageTranslateY}px)`,
          width: imageWidth,
          height: imageHeight,
          overflow: 'hidden',
          borderRadius: 8,
          opacity: imageOpacity,
        }}
      >
        {isPlaceholder(image) ? (
          <PlaceholderImage label={getPlaceholderLabel(image)} />
        ) : (
          <Img
            src={staticFile(image)}
            style={{
              width: '100%',
              height: '100%',
              objectFit,
              transform: `scale(${currentScale})`,
              transformOrigin: `${originX * 100}% ${originY * 100}%`,
            }}
          />
        )}
      </div>

      {caption && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            bottom: 160,
            textAlign: 'center',
            ...typography.body,
            fontFamily: typography.subtitle.fontFamily,
            fontSize: 36,
            color: colors.black,
            whiteSpace: 'pre-line',
          }}
        >
          <AnimatedText text={caption} animation={animation} />
        </div>
      )}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
