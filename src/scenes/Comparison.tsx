import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';

const DIM = 0.18;
const CROSSFADE_FRAMES = 12;

type ComparisonProps = {
  title: string;
  leftImage: string;
  leftLabel: string;
  rightImage: string;
  rightLabel: string;
  animation?: 'kinetic' | 'fade' | 'auto';
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
  objectFit?: 'cover' | 'contain';
  // Hide the text labels beneath each image.
  showLabels?: boolean;
  // Override image height in px (default 480).
  imageHeight?: number;
};

// "How AI can help"-style comparison. Title up top, two images with labels below.
// Use for X vs Y, before/after, thinking vs making, etc.
export const Comparison: React.FC<ComparisonProps> = ({
  title,
  leftImage,
  leftLabel,
  rightImage,
  rightLabel,
  animation = 'auto',
  highlights = [],
  objectFit = 'cover',
  showLabels = true,
  imageHeight = 480,
}) => {
  const frame = useCurrentFrame();

  const sorted = [...highlights].sort((a, b) => a.from - b.from);
  const activeIdx = [...sorted].map((_, i) => i).reverse().find(i => frame >= sorted[i].from) ?? -1;
  const activeEntry = activeIdx >= 0 ? sorted[activeIdx] : null;
  const prevEntry = activeIdx > 0 ? sorted[activeIdx - 1] : null;
  const activeHighlight = activeEntry?.value ?? null;
  const prevHighlight = prevEntry?.value ?? null;
  const transitionStart = activeEntry?.from ?? 0;

  const crossfadeProgress = interpolate(
    frame,
    [transitionStart, transitionStart + CROSSFADE_FRAMES],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  function colOpacity(side: 'left' | 'right'): number {
    const toOp = (h: 'left' | 'right' | null) =>
      h === null || h === side ? 1 : DIM;
    if (transitionStart === 0 || prevEntry === null) return toOp(activeHighlight);
    return interpolate(crossfadeProgress, [0, 1], [toOp(prevHighlight), toOp(activeHighlight)]);
  }

  const hasTitle = title.length > 0;
  const colWidth = !hasTitle && !showLabels ? 860 : 760;
  const colHeight = imageHeight;
  const gap = 80;
  const totalWidth = colWidth * 2 + gap;
  const startX = (layout.width - totalWidth) / 2;
  // Vertically centre images when there is no title and no labels.
  const imagesTop = !hasTitle && !showLabels
    ? Math.round((layout.height - colHeight) / 2)
    : 280;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Title — only rendered when non-empty */}
      {hasTitle && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            textAlign: 'center',
            ...typography.title,
            color: colors.black,
          }}
        >
          <AnimatedText text={title} animation={animation} />
        </div>
      )}

      {/* Two columns */}
      <div
        style={{
          position: 'absolute',
          top: imagesTop,
          left: startX,
          display: 'flex',
          gap: gap,
        }}
      >
        {[
          { image: leftImage, label: leftLabel, side: 'left' as const },
          { image: rightImage, label: rightLabel, side: 'right' as const },
        ].map((col, i) => (
          <div key={i} style={{ width: colWidth, opacity: colOpacity(col.side) }}>
            <div
              style={{
                width: colWidth,
                height: colHeight,
                overflow: 'hidden',
                borderRadius: 8,
                border: `1px solid ${colors.neutral200}`,
              }}
            >
              <Img
                src={staticFile(col.image)}
                style={{ width: '100%', height: '100%', objectFit }}
              />
            </div>
            {showLabels && (
              <div
                style={{
                  ...typography.caption,
                  fontFamily: typography.subtitle.fontFamily,
                  fontSize: 32,
                  color: colors.black,
                  textAlign: 'center',
                  marginTop: 32,
                }}
              >
                {col.label}
              </div>
            )}
          </div>
        ))}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
