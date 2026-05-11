import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

type TypewriterTextProps = {
  text: string;
  // Frames per character (default 2 = ~15 chars/sec at 30fps — readable pace)
  framesPerChar?: number;
  // Frames to wait before starting (default 0)
  delayFrames?: number;
  style?: React.CSSProperties;
};

// Character-by-character typewriter reveal.
// Each character appears in sequence with a blinking cursor at the end.
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  framesPerChar = 2,
  delayFrames = 0,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - delayFrames);
  const charsToShow = Math.min(
    text.length,
    Math.floor(elapsed / framesPerChar)
  );
  const visibleText = text.slice(0, charsToShow);
  const isTyping = charsToShow < text.length;

  // Cursor blinks at 1Hz after typing finishes, stays solid while typing
  const cursorOpacity = isTyping
    ? 1
    : Math.round(frame / 15) % 2 === 0
    ? 1
    : 0;

  return (
    <span style={{ ...style, position: 'relative' }}>
      {visibleText}
      <span
        style={{
          opacity: cursorOpacity,
          borderRight: '3px solid currentColor',
          marginLeft: 2,
        }}
      />
    </span>
  );
};
