import React from 'react';
import {
  AbsoluteFill,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

type ImageMarqueeProps = {
  label?: string;
  title?: string;
  subtitle?: string;
  /** Image paths under /public/ — shown in two scrolling rows */
  images: string[];
};

const IMG_H = 240;
const IMG_W = 400;
const GAP = 14;
const ITEM_W = IMG_W + GAP;

export const ImageMarquee: React.FC<ImageMarqueeProps> = ({
  label,
  title,
  subtitle,
  images,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slideUp = interpolate(frame, [0, 24], [22, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Fade out near the end
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames - 4],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  // Repeat images 3× to ensure rows fill the canvas with no gaps during scroll
  const strip = [...images, ...images, ...images];

  // Row 1: scroll left fast
  const x1 = -frame * 3.2;
  // Row 2: scroll right (start offset so different images visible)
  const x2 = frame * 2.4 - ITEM_W * images.length * 2;
  // Row 3: scroll left medium speed
  const x3 = -frame * 2.8 - ITEM_W * images.length;

  return (
    <AbsoluteFill
      style={{ backgroundColor: colors.white, overflow: 'hidden' }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: 72,
          opacity: fadeIn * fadeOut,
          transform: `translateY(${slideUp}px)`,
        }}
      >
        {label && (
          <div
            style={{
              ...typography.label,
              color: colors.lime500,
              fontSize: 22,
              marginBottom: 16,
            }}
          >
            {label}
          </div>
        )}
        {title && (
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 44,
              fontWeight: 400,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: colors.black,
              whiteSpace: 'nowrap',
              marginBottom: subtitle ? 14 : 0,
            }}
          >
            {title}
          </div>
        )}
        {subtitle && (
          <div
            style={{
              fontFamily: fonts.sans,
              fontSize: 30,
              fontWeight: 400,
              lineHeight: 1.5,
              color: colors.neutral600,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Image row 1 — scrolls left fast */}
      <div style={{ position: 'absolute', top: 240, left: 0, right: 0, height: IMG_H, overflow: 'hidden', opacity: fadeOut }}>
        <div style={{ display: 'flex', gap: GAP, transform: `translateX(${x1}px)`, willChange: 'transform' }}>
          {strip.map((src, i) => (
            <Img key={i} src={staticFile(src)} style={{ height: IMG_H, width: IMG_W, objectFit: 'cover', borderRadius: 16, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* Image row 2 — scrolls right */}
      <div style={{ position: 'absolute', top: 494, left: 0, right: 0, height: IMG_H, overflow: 'hidden', opacity: fadeOut }}>
        <div style={{ display: 'flex', gap: GAP, transform: `translateX(${x2}px)`, willChange: 'transform' }}>
          {strip.map((src, i) => (
            <Img key={i} src={staticFile(src)} style={{ height: IMG_H, width: IMG_W, objectFit: 'cover', borderRadius: 16, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      {/* Image row 3 — scrolls left medium */}
      <div style={{ position: 'absolute', top: 748, left: 0, right: 0, height: IMG_H, overflow: 'hidden', opacity: fadeOut }}>
        <div style={{ display: 'flex', gap: GAP, transform: `translateX(${x3}px)`, willChange: 'transform' }}>
          {strip.map((src, i) => (
            <Img key={i} src={staticFile(src)} style={{ height: IMG_H, width: IMG_W, objectFit: 'cover', borderRadius: 16, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
