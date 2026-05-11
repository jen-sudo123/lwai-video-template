import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';

const DIM = 0.18;
const CROSSFADE_FRAMES = 12;

type SplitContrastProps = {
  leftLabel: string;
  leftTitle?: string;
  leftBody?: string;
  leftBodies?: string[];
  leftBodyTimings?: number[];
  rightLabel?: string;
  rightTitle?: string;
  rightBody?: string;
  dividerLabel?: string;
  showDivider?: boolean;
  labelsOnly?: boolean;
  leftBodyDelay?: number;
  rightBodyDelay?: number;
  rightBodies?: string[];
  rightBodyTimings?: number[];
  leftTitleSize?: number;
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
  // When true, both columns use identical neutral styling — no lime accent, no dimming.
  equal?: boolean;
  // Zero-based indices of leftBodies items to render in lime instead of leftTextColor.
  leftBodyHighlightIndices?: number[];
  // When true, both sides render as cards (border + padding + shadow) and the "vs." divider is hidden.
  asCards?: boolean;
};

// Two-column contrast: muted left side vs. lime-accented right side.
// Both column headers appear immediately (left first, right 15f later).
// Body text on each side fades in at its configured delay — use this to
// sync the reveal to the voiceover.
export const SplitContrast: React.FC<SplitContrastProps> = React.memo(
  ({
    leftLabel,
    leftTitle,
    leftBody,
    leftBodies,
    leftBodyTimings,
    rightLabel = '',
    rightTitle,
    rightBody,
    dividerLabel = 'vs.',
    showDivider = true,
    labelsOnly = false,
    leftBodyDelay = 0,
    rightBodyDelay = 30,
    rightBodies,
    rightBodyTimings,
    leftTitleSize = 60,
    highlights = [],
    equal = false,
    leftBodyHighlightIndices = [],
    asCards = false,
  }) => {
    const frame = useCurrentFrame();

    // Compute per-side opacity from the highlights schedule (same pattern as MethodsSlide).
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

    function sideOpacity(side: 'left' | 'right'): number {
      const toOp = (h: 'left' | 'right' | null) =>
        h === null || h === side ? 1 : DIM;
      if (transitionStart === 0 || prevEntry === null) return toOp(activeHighlight);
      return interpolate(crossfadeProgress, [0, 1], [toOp(prevHighlight), toOp(activeHighlight)]);
    }

    // Left text color: grey (#888) when unlit, black (#000) when highlighted
    const toLit = (h: 'left' | 'right' | null) => (h === 'left' ? 1 : 0);
    const litFactor =
      transitionStart === 0 || prevEntry === null
        ? toLit(activeHighlight)
        : interpolate(crossfadeProgress, [0, 1], [toLit(prevHighlight), toLit(activeHighlight)]);
    const leftChannel = Math.round(interpolate(litFactor, [0, 1], [136, 0]));
    const leftTextColor = `rgb(${leftChannel}, ${leftChannel}, ${leftChannel})`;

    // Left column slides in from the left
    const leftOpacity = interpolate(frame, [0, 22], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const leftTx = interpolate(frame, [0, 25], [-32, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    // Right column slides in from the right, 15f later
    const rightOpacity = interpolate(frame, [15, 37], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const rightTx = interpolate(frame, [15, 40], [32, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    // Divider fades between the two
    const dividerOpacity = interpolate(frame, [8, 22], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const colWidth = layout.width / 2 - layout.safeMargin - 72;
    const centerX = layout.width / 2;

    return (
      <AbsoluteFill style={{ backgroundColor: colors.white }}>

        {labelsOnly ? (
          <>
            {/* Left label — large, centred in left half */}
            <div
              style={{
                position: 'absolute',
                left: layout.safeMargin,
                width: colWidth,
                top: '50%',
                transform: `translateY(-50%) translateX(${leftTx}px)`,
                opacity: leftOpacity * sideOpacity('left'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 96,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  color: leftTextColor,
                  textAlign: 'center' as const,
                }}
              >
                {leftLabel}
              </div>
            </div>

            {/* Vertical divider */}
            {showDivider && (
              <div
                style={{
                  position: 'absolute',
                  left: centerX - 1,
                  top: 100,
                  bottom: 100,
                  width: 2,
                  backgroundColor: colors.neutral200,
                  opacity: dividerOpacity,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: colors.white,
                    padding: '10px 18px',
                    ...typography.label,
                    color: colors.neutral600,
                  }}
                >
                  {dividerLabel}
                </div>
              </div>
            )}

            {/* Right label — large, centred in right half */}
            <div
              style={{
                position: 'absolute',
                left: centerX + 72,
                width: colWidth,
                top: '50%',
                transform: `translateY(-50%) translateX(${rightTx}px)`,
                opacity: rightOpacity * sideOpacity('right'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 96,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                  color: colors.lime500,
                  textAlign: 'center' as const,
                }}
              >
                {rightLabel}
              </div>
            </div>
          </>
        ) : (
          <>
        {equal ? (
          // Equal mode — both columns identical styling, no lime, no dimming
          <>
            {[
              { label: leftLabel, title: leftTitle, body: leftBody, delay: leftBodyDelay, tx: leftTx, op: leftOpacity, titleSize: leftTitleSize },
              { label: rightLabel, title: rightTitle, body: rightBody, delay: rightBodyDelay, tx: rightTx, op: rightOpacity, titleSize: 60 },
            ].map((col, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: i === 0 ? layout.safeMargin : centerX + 72,
                  width: colWidth,
                  top: '50%',
                  transform: `translateY(-50%) translateX(${col.tx}px)`,
                  opacity: col.op,
                }}
              >
                <div style={{ ...typography.label, color: colors.neutral600, marginBottom: 20 }}>
                  {col.label}
                </div>
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: col.titleSize,
                    fontWeight: 400,
                    letterSpacing: '-0.04em',
                    lineHeight: 1.15,
                    color: colors.black,
                    marginBottom: 36,
                  }}
                >
                  {col.title}
                </div>
                <div style={{ ...typography.body, color: colors.neutral600, lineHeight: 1.6 }}>
                  {col.body && <FadeText text={col.body} delayFrames={col.delay} />}
                </div>
              </div>
            ))}

            {/* Divider between equal columns */}
            {showDivider && (
              <div
                style={{
                  position: 'absolute',
                  left: centerX - 1,
                  top: 100,
                  bottom: 100,
                  width: 2,
                  backgroundColor: colors.neutral200,
                  opacity: dividerOpacity,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: colors.white,
                    padding: '10px 18px',
                    ...typography.label,
                    color: colors.neutral600,
                  }}
                >
                  {dividerLabel}
                </div>
              </div>
            )}
          </>
        ) : (
          <>
        {/* Left column — muted (the "old" concept) */}
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            width: colWidth,
            top: '50%',
            transform: `translateY(-50%) translateX(${leftTx}px)`,
            opacity: leftOpacity * sideOpacity('left'),
            ...(asCards ? {
              border: `2px solid ${colors.neutral200}`,
              borderRadius: 28,
              padding: 56,
              boxShadow: '0 10px 32px rgba(0,0,0,0.06)',
              backgroundColor: colors.white,
            } : {}),
          }}
        >
          <div style={{ ...typography.label, color: leftTextColor, marginBottom: 20 }}>
            {leftLabel}
          </div>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: leftTitleSize,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: leftTextColor,
              marginBottom: 36,
            }}
          >
            {leftTitle}
          </div>
          <div style={{ ...typography.body, color: leftTextColor, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {leftBodies
              ? leftBodies.map((line, i) => (
                  <span key={i} style={leftBodyHighlightIndices.includes(i) ? { color: colors.lime500 } : undefined}>
                    <FadeText text={line} delayFrames={leftBodyTimings?.[i] ?? leftBodyDelay} />
                  </span>
                ))
              : leftBody && <FadeText text={leftBody} delayFrames={leftBodyDelay} />}
          </div>
        </div>

        {/* Vertical divider — hidden when showDivider is false or asCards is true */}
        {showDivider && !asCards && (
          <div
            style={{
              position: 'absolute',
              left: centerX - 1,
              top: 100,
              bottom: 100,
              width: 2,
              backgroundColor: colors.neutral200,
              opacity: dividerOpacity,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: colors.white,
                padding: '10px 18px',
                ...typography.label,
                color: colors.neutral600,
              }}
            >
              {dividerLabel}
            </div>
          </div>
        )}

        {/* Right column — bold with lime accent (the "goal" concept) */}
        <div
          style={{
            position: 'absolute',
            left: centerX + 72,
            width: colWidth,
            top: '50%',
            transform: `translateY(-50%) translateX(${rightTx}px)`,
            opacity: rightOpacity * sideOpacity('right'),
            ...(asCards ? {
              border: `2px solid ${colors.neutral200}`,
              borderRadius: 28,
              padding: 56,
              boxShadow: '0 10px 32px rgba(0,0,0,0.06)',
              backgroundColor: colors.white,
            } : {}),
          }}
        >
          <div style={{ ...typography.label, color: colors.lime500, marginBottom: 20 }}>
            {rightLabel}
          </div>
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 60,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: colors.black,
              marginBottom: 36,
            }}
          >
            {rightTitle}
          </div>
          <div style={{ ...typography.body, color: colors.black, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 20 }}>
            {rightBodies
              ? rightBodies.map((line, i) => (
                  <FadeText key={i} text={line} delayFrames={rightBodyTimings?.[i] ?? rightBodyDelay} />
                ))
              : rightBody && <FadeText text={rightBody} delayFrames={rightBodyDelay} />}
          </div>
          {/* Lime accent bar */}
          <div
            style={{
              width: 56,
              height: 4,
              backgroundColor: colors.lime500,
              marginTop: 36,
            }}
          />
        </div>
          </>
        )}
          </>
        )}

        <LogoFooter variant="dark" />
      </AbsoluteFill>
    );
  }
);
