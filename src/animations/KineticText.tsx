import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

type KineticTextProps = {
  text: string;
  // Frames between each word appearing (default 4 = ~130ms at 30fps)
  staggerFrames?: number;
  // Frames over which each word fades in (default 8)
  wordFadeFrames?: number;
  style?: React.CSSProperties;
  // Offset the animation start (default 0 = animate from scene start)
  startFrame?: number;
};

// Word-by-word reveal. Each word fades + lifts into place, staggered.
// Best for short punchy text — quotes, statements, single-sentence callouts.
export const KineticText: React.FC<KineticTextProps> = ({
  text,
  staggerFrames = 4,
  wordFadeFrames = 8,
  style = {},
  startFrame = 0,
}) => {
  const rawFrame = useCurrentFrame();
  const frame = rawFrame - startFrame;
  const { fps } = useVideoConfig();
  const words = text.split(' ');

  return (
    <span style={style}>
      {words.map((word, i) => {
        const wordStart = i * staggerFrames;
        const opacity = interpolate(
          frame,
          [wordStart, wordStart + wordFadeFrames],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );
        const translateY = spring({
          frame: frame - wordStart,
          fps,
          config: { damping: 200, stiffness: 100 },
          from: 12,
          to: 0,
        });

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${translateY}px)`,
              marginRight: '0.25em',
            }}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};
