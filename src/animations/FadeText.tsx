import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

type FadeTextProps = {
  text: string;
  fadeFrames?: number;
  delayFrames?: number;
  style?: React.CSSProperties;
  highlight?: string;
  highlightColor?: string;
  // Frame at which the highlighted span pops/bounces and switches color —
  // use this to land the highlight on the moment the word is spoken,
  // independent of delayFrames (when the whole line fades in).
  highlightFrame?: number;
};

// Whole-block fade-in. Supports \n line breaks via whiteSpace: pre-line.
export const FadeText: React.FC<FadeTextProps> = ({
  text,
  fadeFrames = 18,
  delayFrames = 0,
  style = {},
  highlight,
  highlightColor = '#66C61C',
  highlightFrame,
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

  const bounceFrame = highlightFrame ?? delayFrames;
  const bounceT = frame - bounceFrame;
  const highlightScale = interpolate(
    bounceT,
    [0, 8, 16],
    [1, 1.32, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const isHighlightActive = bounceT >= 0;

  const highlightStart = highlight ? text.indexOf(highlight) : -1;
  const content =
    highlightStart >= 0
      ? (
        <>
          {text.slice(0, highlightStart)}
          <span
            style={{
              display: 'inline-block',
              color: isHighlightActive ? highlightColor : 'inherit',
              transform: `scale(${highlightScale})`,
              transformOrigin: 'center bottom',
            }}
          >
            {highlight}
          </span>
          {text.slice(highlightStart + highlight!.length)}
        </>
      )
      : text;

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
      {content}
    </div>
  );
};

export const recommendAnimation = (text: string): 'kinetic' | 'fade' =>
  text.length <= 60 ? 'kinetic' : 'fade';
