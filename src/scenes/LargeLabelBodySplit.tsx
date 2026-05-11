import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';

type LargeLabelBodySplitProps = {
  // The big text shown on the left (e.g. "GPT-5.5")
  bigLabel: string;
  // Optional subtitle under the big label
  subtitle?: string;
  // Body lines shown on the right
  body: string[];
  bodyTimings?: number[];
};

const LEFT_WIDTH = 620;
const GAP = 100;
const RIGHT_LEFT = layout.safeMargin + LEFT_WIDTH + GAP;
const RIGHT_WIDTH = layout.width - RIGHT_LEFT - layout.safeMargin;

export const LargeLabelBodySplit: React.FC<LargeLabelBodySplitProps> = ({
  bigLabel,
  subtitle,
  body,
  bodyTimings,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 1.1 },
    from: 0.7,
    to: 1,
  });

  const subtitleOpacity = interpolate(frame, [8, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Left: big label */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          width: LEFT_WIDTH,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 148,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: colors.lime500,
            transform: `scale(${scale})`,
            transformOrigin: 'left center',
            marginBottom: subtitle ? 32 : 0,
          }}
        >
          {bigLabel}
        </div>
        {subtitle && (
          <div
            style={{
              ...typography.body,
              color: colors.neutral600,
              opacity: subtitleOpacity,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>

      {/* Vertical divider */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin + LEFT_WIDTH + GAP / 2,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 2,
          height: 360,
          backgroundColor: colors.neutral200,
        }}
      />

      {/* Right: body lines */}
      <div
        style={{
          position: 'absolute',
          left: RIGHT_LEFT,
          width: RIGHT_WIDTH,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <div style={{ ...typography.body, color: colors.black }}>
          {body.map((line, i) => (
            <div key={i} style={{ marginBottom: 40 }}>
              <FadeText text={line} delayFrames={bodyTimings?.[i] ?? 0} />
            </div>
          ))}
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
