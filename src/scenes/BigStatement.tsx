import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Img,
  staticFile,
} from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

type WordJump = {
  // Zero-based index into the word list (split on whitespace, ignoring \n).
  wordIndex: number;
  // Frame within the scene when the jump fires.
  frame: number;
};

type BigStatementProps = {
  text: string;
  highlight?: string;
  label?: string;
  size?: 'hero' | 'title';
  fontSize?: number;
  animation?: 'kinetic' | 'fade';
  lineTimings?: number[];
  wordJumps?: WordJump[];
  image?: string;
  imageDelay?: number;
  // Dark background mode — black canvas, white text, lime highlight.
  inverted?: boolean;
  // Left-column layout — text anchors to the left like ReasoningChain instead of centred.
  leftAlign?: boolean;
  // Split layout — label anchors top-left, text block anchors to the right column.
  splitLabelRight?: boolean;
  // In splitLabelRight mode: small subtitle below the large left-column label.
  labelSub?: string;
  // Frame offset before the kinetic word reveal begins (default 0).
  textDelay?: number;
};

// Full-screen editorial statement. Bigger and bolder than CenteredQuote.
// Optional lime highlight on a key word or phrase. Word-by-word reveal for kinetic.
const JUMP_DURATION = 24;
const JUMP_HEIGHT = 52;

function getJumpOffset(frame: number, jumpFrame: number): number {
  const local = frame - jumpFrame;
  if (local < 0 || local > JUMP_DURATION) return 0;
  return -Math.sin((local / JUMP_DURATION) * Math.PI) * JUMP_HEIGHT;
}

export const BigStatement: React.FC<BigStatementProps> = React.memo(
  ({ text, highlight, label, labelSub, size = 'hero', fontSize: fontSizeOverride, animation = 'kinetic', lineTimings, wordJumps = [], image, imageDelay = 60, inverted = false, leftAlign = false, splitLabelRight = false, textDelay = 0 }) => {
    const frame = useCurrentFrame();
    const fontSize = fontSizeOverride ?? (size === 'hero' ? 96 : 72);
    const staggerFrames = 4;
    const wordFadeFrames = 10;

    const labelOpacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    // Determine highlight character range once
    const highlightStart = highlight ? text.indexOf(highlight) : -1;
    const highlightEnd = highlightStart >= 0 ? highlightStart + highlight!.length : -1;

    const renderKinetic = () => {
      // Use regex to find words with exact character positions (preserves \n info)
      const wordMatches: Array<{ word: string; start: number; end: number }> = [];
      const regex = /\S+/g;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(text)) !== null) {
        wordMatches.push({ word: m[0], start: m.index, end: m.index + m[0].length });
      }

      return (
        <>
          {wordMatches.map(({ word, start, end }, i) => {
            const isHighlighted =
              highlightStart >= 0 &&
              start < highlightEnd &&
              end > highlightStart;

            // Insert a line break if there's a \n between the previous word and this one
            const hasNewlineBefore =
              i > 0 && text.slice(wordMatches[i - 1].end, start).includes('\n');

            const wordFrame = textDelay + i * staggerFrames;
            const opacity = interpolate(
              frame,
              [wordFrame, wordFrame + wordFadeFrames],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );
            const revealTy = interpolate(
              frame,
              [wordFrame, wordFrame + wordFadeFrames + 5],
              [18, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
            );

            // Sum all jump offsets for this word index
            const jumpTy = wordJumps
              .filter((j) => j.wordIndex === i)
              .reduce((sum, j) => sum + getJumpOffset(frame, j.frame), 0);

            const ty = revealTy + jumpTy;

            return (
              <React.Fragment key={i}>
                {hasNewlineBefore && <br />}
                <span
                  style={{
                    display: 'inline-block',
                    opacity,
                    transform: `translateY(${ty}px)`,
                    color: isHighlighted ? colors.lime500 : 'inherit',
                    marginRight: '0.25em',
                  }}
                >
                  {word}
                </span>
              </React.Fragment>
            );
          })}
        </>
      );
    };

    const renderFade = () => {
      // Per-line fade when lineTimings is provided — split on \n and animate each independently.
      if (lineTimings && lineTimings.length > 0) {
        const lines = text.split('\n');
        return (
          <>
            {lines.map((line, lineIdx) => {
              const delay = lineTimings[lineIdx] ?? 0;
              const lineOpacity = interpolate(frame, [delay, delay + 22], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });
              const lineTy = interpolate(frame, [delay, delay + 22], [20, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              });

              // Apply highlight within this specific line
              const lineHighlightStart = highlight ? line.indexOf(highlight) : -1;
              let lineContent: React.ReactNode = line;
              if (lineHighlightStart >= 0 && highlight) {
                lineContent = (
                  <>
                    {line.slice(0, lineHighlightStart)}
                    <span style={{ color: colors.lime500 }}>{highlight}</span>
                    {line.slice(lineHighlightStart + highlight.length)}
                  </>
                );
              }

              return (
                <div
                  key={lineIdx}
                  style={{ opacity: lineOpacity, transform: `translateY(${lineTy}px)` }}
                >
                  {lineContent}
                </div>
              );
            })}
          </>
        );
      }

      // Default: whole block fades in together.
      const opacity = interpolate(frame, [0, 22], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const ty = interpolate(frame, [0, 22], [20, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });

      let content: React.ReactNode = text;
      if (highlightStart >= 0 && highlight) {
        content = (
          <>
            {text.slice(0, highlightStart)}
            <span style={{ color: colors.lime500 }}>{highlight}</span>
            {text.slice(highlightEnd)}
          </>
        );
      }
      return (
        <div style={{ opacity, transform: `translateY(${ty}px)`, whiteSpace: 'pre-line' }}>{content}</div>
      );
    };

    const imageOpacity = image
      ? interpolate(frame, [imageDelay, imageDelay + 20], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

    const bgColor = inverted ? colors.black : colors.white;
    const textColor = inverted ? colors.white : colors.black;
    const labelColor = inverted ? 'rgba(255,255,255,0.5)' : colors.neutral600;

    if (splitLabelRight) {
      const midX = layout.width / 2;
      return (
        <AbsoluteFill style={{ backgroundColor: bgColor }}>
          {/* Left column — large serif title + optional subtitle, vertically centred */}
          <div
            style={{
              position: 'absolute',
              left: layout.safeMargin,
              top: '50%',
              transform: 'translateY(-50%)',
              maxWidth: midX - layout.safeMargin - 40,
            }}
          >
            {labelSub && (
              <div
                style={{
                  ...typography.label,
                  fontSize: 22,
                  color: labelColor,
                  marginBottom: 24,
                  opacity: labelOpacity,
                }}
              >
                {labelSub}
              </div>
            )}
            {label && (
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 72,
                  fontWeight: 400,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.15,
                  color: textColor,
                  opacity: labelOpacity,
                }}
              >
                {label}
              </div>
            )}
          </div>
          {/* Text block — right half, vertically centred */}
          <div
            style={{
              position: 'absolute',
              left: midX,
              right: layout.safeMargin,
              top: '50%',
              transform: 'translateY(-50%)',
              textAlign: 'left',
            }}
          >
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: '-0.04em',
                lineHeight: 1.15,
                color: textColor,
              }}
            >
              {animation === 'kinetic' ? renderKinetic() : renderFade()}
            </div>
          </div>
          <LogoFooter variant={inverted ? 'light' : 'dark'} />
        </AbsoluteFill>
      );
    }

    return (
      <AbsoluteFill style={{ backgroundColor: bgColor }}>
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: leftAlign ? undefined : layout.safeMargin,
            top: leftAlign ? '50%' : (image ? '28%' : '50%'),
            transform: 'translateY(-50%)',
            textAlign: leftAlign ? 'left' : 'center',
            maxWidth: leftAlign ? 1100 : undefined,
          }}
        >
          {label && (
            <div style={{ ...typography.label, color: labelColor, marginBottom: 40, opacity: labelOpacity }}>
              {label}
            </div>
          )}
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: textColor,
              maxWidth: leftAlign ? undefined : 1500,
              margin: leftAlign ? 0 : '0 auto',
            }}
          >
            {animation === 'kinetic' ? renderKinetic() : renderFade()}
          </div>
        </div>

        {image && (
          <div
            style={{
              position: 'absolute',
              left: layout.safeMargin,
              right: layout.safeMargin,
              bottom: 60,
              height: 740,
              opacity: imageOpacity,
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              <Img
                src={staticFile(image)}
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </div>
        )}

        <LogoFooter variant={inverted ? 'light' : 'dark'} />
      </AbsoluteFill>
    );
  }
);
