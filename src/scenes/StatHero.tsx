import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';
import { PunchyImage } from '../animations/PunchyImage';
import { isPlaceholder } from './PlaceholderImage';

type StatHeroProps = {
  // The big number or stat, e.g. "3×" or "30–40%"
  stat: string;
  // Small uppercase descriptor, e.g. "MORE LIKELY TO REDESIGN WORKFLOWS"
  label: string;
  // Small unit/subtitle rendered directly below the stat in body size
  unit?: string;
  // Explanatory sentence below the stat
  context: string;
  // Delay in frames before context fades in (default 0)
  contextTiming?: number;
  // Optional image shown on the right when provided (path under /public/)
  image?: string;
};

// Stat column width when an image is present (mirrors LabelTitleBody proportions)
const STAT_WIDTH_WITH_IMAGE = 660;
const IMAGE_LEFT = layout.safeMargin + STAT_WIDTH_WITH_IMAGE + layout.safeMargin; // 820
const IMAGE_WIDTH = layout.width - IMAGE_LEFT - layout.safeMargin;                // 1020
const IMAGE_HEIGHT = 580;

// Full-screen stat reveal. Giant lime-coloured number with a spring scale entrance.
// Use for key numbers: percentages, multipliers, time savings.
export const StatHero: React.FC<StatHeroProps> = React.memo(
  ({ stat, label, unit, context, contextTiming = 0, image }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
      frame,
      fps,
      config: { damping: 14, stiffness: 90, mass: 1.1 },
      from: 0.65,
      to: 1,
    });

    const headerOpacity = interpolate(frame, [0, 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const hasImage = !!image && !isPlaceholder(image);

    // With image: left-aligned stat column + right image (mirrors LabelTitleBody)
    if (hasImage) {
      return (
        <AbsoluteFill style={{ backgroundColor: colors.white }}>
          {/* Stat column — vertically centered */}
          <div
            style={{
              position: 'absolute',
              left: layout.safeMargin,
              width: STAT_WIDTH_WITH_IMAGE,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <div style={{ ...typography.label, marginBottom: 28, opacity: headerOpacity }}>
              {label}
            </div>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 140,
                fontWeight: 400,
                letterSpacing: '-0.05em',
                lineHeight: 1,
                color: colors.lime500,
                display: 'block',
                transform: `scale(${scale})`,
                transformOrigin: 'left center',
                marginBottom: unit ? 16 : 40,
              }}
            >
              {stat}
            </div>
            {unit && (
              <div style={{ ...typography.body, color: colors.black, marginBottom: 32 }}>
                {unit}
              </div>
            )}
            <div style={{ ...typography.body, color: colors.neutral600 }}>
              <FadeText text={context} delayFrames={contextTiming} />
            </div>
          </div>

          {/* Image column */}
          <div
            style={{
              position: 'absolute',
              left: IMAGE_LEFT,
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <PunchyImage src={image!} style={{ width: '100%', height: '100%' }} />
          </div>

          <LogoFooter variant="dark" />
        </AbsoluteFill>
      );
    }

    // No image: centered layout (original behaviour)
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
          {/* Eyebrow label */}
          <div style={{ ...typography.label, marginBottom: 28, opacity: headerOpacity }}>
            {label}
          </div>

          {/* Giant stat */}
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 180,
              fontWeight: 400,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              color: colors.lime500,
              display: 'block',
              transform: `scale(${scale})`,
              marginBottom: unit ? 16 : 44,
            }}
          >
            {stat}
          </div>

          {/* Unit subtitle */}
          {unit && (
            <div
              style={{
                ...typography.body,
                color: colors.black,
                marginBottom: 36,
              }}
            >
              {unit}
            </div>
          )}

          {/* Context line */}
          <div
            style={{
              ...typography.body,
              color: colors.neutral600,
              maxWidth: 960,
              margin: '0 auto',
            }}
          >
            <FadeText text={context} delayFrames={contextTiming} />
          </div>
        </div>

        <LogoFooter variant="dark" />
      </AbsoluteFill>
    );
  }
);
