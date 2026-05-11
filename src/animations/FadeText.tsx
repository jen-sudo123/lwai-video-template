import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

type FadeTextProps = {
  text: string;
  fadeFrames?: number;
  delayFrames?: number;
  style?: React.CSSProperties;
};

// Whole-block fade-in. Supports \n line breaks via whiteSpace: pre-line.
export const FadeText: React.FC<FadeTextProps> = ({
  text,
  fadeFrames = 18,
  delayFrames = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [delayFrames, delayFrames + fadeFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const translateY = interpolate(
    frame,
    [delayFrames, delayFrames + fadeFrames],
    [16, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div
      style={{
        ...style,
        opacity,
        display: 'block',
        transform: `translateY(${translateY}px)`,
        whiteSpace: 'pre-line',
      }}
    >
      {text}
    </div>
  );
};

export const recommendAnimation = (text: string): 'kinetic' | 'fade' =>
  text.length <= 60 ? 'kinetic' : 'fade';
