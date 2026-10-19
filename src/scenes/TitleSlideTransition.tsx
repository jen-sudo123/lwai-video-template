import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig, interpolate } from 'remotion';
import { colors, fonts, typography, layout } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';

type BodyRow = { label: string; prompt: string };

type TitleSlideTransitionProps = {
  text: string;
  label?: string;
  body?: string[];
  bodyTimings?: number[];
  bodyRows?: BodyRow[];
  bodyRowTimings?: number[];
  // When true, renders bodyRows as a row of bordered cards (label on top,
  // prompt below) instead of stacked label | prompt rows.
  bodyRowsAsCards?: boolean;
  // When true, the title stays centered on screen (fade + scale in) instead
  // of dragging from the right-column position to the top-left corner.
  centered?: boolean;
};

// Animates a title from the right-column center position (SplitContrast)
// to the top-left corner (LabelTitleBody) — "drag to corner" feel.
// Optional bodyRows renders a two-column grid (label | prompt) after the animation settles.
export const TitleSlideTransition: React.FC<TitleSlideTransitionProps> = ({
  text,
  label,
  body,
  bodyTimings,
  bodyRows,
  bodyRowTimings,
  bodyRowsAsCards = false,
  centered = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 22, stiffness: 130, mass: 0.75 },
    from: 0,
    to: 1,
  });

  const startX = layout.width / 2 + 72;
  const startY = layout.height / 2 - 160;
  const endX = layout.safeMargin;
  const endY = layout.safeMargin;

  const x = centered ? layout.width / 2 : interpolate(progress, [0, 1], [startX, endX]);
  const y = centered ? layout.height / 2 : interpolate(progress, [0, 1], [startY, endY]);

  const labelColor = interpolate(progress, [0, 0.6], [1, 0], { extrapolateRight: 'clamp' });
  const centeredScale = interpolate(progress, [0, 1], [0.92, 1]);
  const centeredOpacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          ...(centered
            ? {
                transform: `translate(-50%, -50%) scale(${centeredScale})`,
                opacity: centeredOpacity,
                textAlign: 'center' as const,
              }
            : {}),
        }}
      >
        {label && (
          <div
            style={{
              ...typography.label,
              color: centered ? colors.lime500 : `rgb(${Math.round(interpolate(labelColor, [0, 1], [136, 102]))}, ${Math.round(interpolate(labelColor, [0, 1], [136, 198]))}, ${Math.round(interpolate(labelColor, [0, 1], [136, 28]))})`,
              marginBottom: 20,
            }}
          >
            {label}
          </div>
        )}
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            color: colors.black,
          }}
        >
          {text}
        </div>
      </div>

      {/* Row of bordered cards: label on top, prompt below */}
      {bodyRows && bodyRows.length > 0 && bodyRowsAsCards && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: 420,
            display: 'flex',
            flexDirection: 'row',
            gap: 32,
          }}
        >
          {bodyRows.map((row, i) => {
            const delay = bodyRowTimings?.[i] ?? i * 60;
            const enter = spring({
              frame: frame - delay,
              fps,
              config: { damping: 14, stiffness: 100, mass: 0.7 },
            });
            const opacity = interpolate(enter, [0, 1], [0, 1]);
            const ty = interpolate(enter, [0, 1], [32, 0]);

            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  minWidth: 0,
                  borderRadius: 24,
                  border: `2px solid ${colors.neutral200}`,
                  boxShadow: '0 10px 32px rgba(0,0,0,0.06)',
                  backgroundColor: colors.white,
                  padding: '36px 32px',
                  opacity,
                  transform: `translateY(${ty}px)`,
                }}
              >
                <div style={{ ...typography.label, fontSize: 22, color: colors.lime500, marginBottom: 16 }}>
                  {row.label}
                </div>
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 40,
                    fontWeight: 400,
                    letterSpacing: '-0.02em',
                    color: colors.black,
                    lineHeight: 1.25,
                  }}
                >
                  {row.prompt}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Two-column rows: label | prompt */}
      {bodyRows && bodyRows.length > 0 && !bodyRowsAsCards && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: layout.safeMargin + 220,
            bottom: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {bodyRows.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                gap: 64,
              }}
            >
              <div
                style={{
                  ...typography.label,
                  fontSize: 28,
                  color: colors.lime500,
                  width: 340,
                  flexShrink: 0,
                  paddingTop: 8,
                }}
              >
                <FadeText text={row.label} delayFrames={bodyRowTimings?.[i] ?? 60} />
              </div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 52,
                  fontWeight: 400,
                  letterSpacing: '-0.02em',
                  color: colors.black,
                  lineHeight: 1.4,
                  flex: 1,
                }}
              >
                <FadeText text={row.prompt} delayFrames={bodyRowTimings?.[i] ?? 60} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fallback: simple single-column body */}
      {body && body.length > 0 && !bodyRows && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            top: layout.safeMargin + 160,
            width: layout.width - layout.safeMargin * 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
          }}
        >
          {body.map((line, i) => (
            <div key={i} style={{ ...typography.body, color: colors.neutral600, lineHeight: 1.6 }}>
              <FadeText text={line} delayFrames={bodyTimings?.[i] ?? 60} />
            </div>
          ))}
        </div>
      )}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
