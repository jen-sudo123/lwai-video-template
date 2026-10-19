import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors, fonts, layout } from './tokens';

export type WordCaption = {
  word: string;
  startFrame: number;
  endFrame: number;
};

type CaptionOverlayProps = {
  captions: WordCaption[];
};

const WORDS_PER_LINE = 6;
const BOTTOM_OFFSET = 72;
const FONT_SIZE = 34;
const LINE_HEIGHT = 1.4;
// Whisper base model word timestamps lag ~300-400ms; fire highlight 12 frames early to sync.
const TIMING_ADVANCE = 12;

// Group flat word list into lines of WORDS_PER_LINE words.
function groupIntoLines(captions: WordCaption[]): WordCaption[][] {
  const lines: WordCaption[][] = [];
  for (let i = 0; i < captions.length; i += WORDS_PER_LINE) {
    lines.push(captions.slice(i, i + WORDS_PER_LINE));
  }
  return lines;
}

export const CaptionOverlay: React.FC<CaptionOverlayProps> = ({ captions }) => {
  const frame = useCurrentFrame();

  // Find the word currently being spoken (advance frame by TIMING_ADVANCE to compensate for Whisper lag).
  const activeWordIndex = captions.findIndex(
    (w) => frame + TIMING_ADVANCE >= w.startFrame && frame + TIMING_ADVANCE < w.endFrame,
  );

  // Also find the most recently spoken word (for keeping a line visible between words).
  const lastSpokenIndex = captions.reduce<number>((acc, w, i) => {
    return frame >= w.startFrame ? i : acc;
  }, -1);

  const referenceIndex = activeWordIndex >= 0 ? activeWordIndex : lastSpokenIndex;

  if (referenceIndex < 0) return null;

  const lines = groupIntoLines(captions);

  // Which line is the reference word on?
  const lineIndex = Math.floor(referenceIndex / WORDS_PER_LINE);
  const currentLine = lines[lineIndex];
  if (!currentLine) return null;

  // Don't render after the last word ends.
  const lastWordInLine = currentLine[currentLine.length - 1];
  const firstWordInLine = currentLine[0];
  if (frame > lastWordInLine.endFrame + 15) return null;
  if (frame < firstWordInLine.startFrame) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: BOTTOM_OFFSET,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0 10px',
          lineHeight: LINE_HEIGHT,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          borderRadius: 10,
          padding: '10px 28px',
          width: 'fit-content',
          maxWidth: 1400,
        }}
      >
        {currentLine.map((w, localIdx) => {
          const globalIdx = lineIndex * WORDS_PER_LINE + localIdx;
          const isActive = globalIdx === activeWordIndex;
          const isPast = globalIdx < referenceIndex && activeWordIndex >= 0;

          const color = isActive
            ? colors.lime500
            : isPast
            ? 'rgba(255,255,255,0.45)'
            : 'rgba(255,255,255,0.9)';

          return (
            <span
              key={globalIdx}
              style={{
                fontFamily: fonts.sans,
                fontSize: FONT_SIZE,
                fontWeight: isActive ? 700 : 500,
                color,
                letterSpacing: '-0.01em',
              }}
            >
              {w.word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
