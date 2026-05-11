import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

type ModeColumn = {
  label: string;
  title: string;
  body: string[];
};

type Props = {
  label: string;
  title: string;
  columns: [ModeColumn, ModeColumn, ModeColumn];
  highlights?: Array<{ from: number; value: 0 | 1 | 2 | null }>;
};

const DIM = 0.16;
const CROSSFADE = 12;
const CARD_W = 520;
const CARD_H = 560;
const GAP = 40;
const BODY_FADE = 16;

function targetOpacity(index: 0 | 1 | 2, active: 0 | 1 | 2 | null) {
  return active === null || active === index ? 1 : DIM;
}

export const ThreeModeColumns: React.FC<Props> = ({
  label,
  title,
  columns,
  highlights = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sorted = [...highlights].sort((a, b) => a.from - b.from);
  const activeIdx = [...sorted].map((_, i) => i).reverse().find(i => frame >= sorted[i].from) ?? -1;
  const activeEntry = activeIdx >= 0 ? sorted[activeIdx] : null;
  const prevEntry = activeIdx > 0 ? sorted[activeIdx - 1] : null;
  const activeVal = activeEntry?.value ?? null;
  const prevVal = prevEntry?.value ?? null;
  const transitionStart = activeEntry?.from ?? 0;
  const progress = interpolate(frame, [transitionStart, transitionStart + CROSSFADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const totalWidth = CARD_W * 3 + GAP * 2;
  const left = (layout.width - totalWidth) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: 80,
          ...typography.label,
        }}
      >
        {label}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 132,
          textAlign: 'center',
          ...typography.title,
          color: colors.black,
        }}
      >
        {title}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 300,
          left,
          display: 'flex',
          gap: GAP,
        }}
      >
        {columns.map((column, index) => {
          const typedIndex = index as 0 | 1 | 2;
          const start = highlights.find((h) => h.value === typedIndex)?.from ?? index * 150;
          const enterProgress = spring({
            frame: frame - start,
            fps,
            config: { damping: 12, stiffness: 90, mass: 0.7 },
          });
          const translateY = interpolate(enterProgress, [0, 1], [48, 0]);
          const scale = interpolate(enterProgress, [0, 1], [0.92, 1]);
          const showOpacity = interpolate(enterProgress, [0, 1], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const emphasisOpacity =
            !activeEntry || !prevEntry
              ? targetOpacity(typedIndex, activeVal)
              : interpolate(progress, [0, 1], [targetOpacity(typedIndex, prevVal), targetOpacity(typedIndex, activeVal)]);

          return (
            <div
              key={column.title}
              style={{
                width: CARD_W,
                height: CARD_H,
                borderRadius: 28,
                backgroundColor: colors.white,
                border: `2px solid ${typedIndex === 2 ? colors.lime500 : colors.neutral200}`,
                boxShadow: typedIndex === 2 ? '0 18px 50px rgba(102,198,28,0.14)' : '0 10px 32px rgba(0,0,0,0.06)',
                padding: 36,
                opacity: showOpacity * emphasisOpacity,
                transform: `translateY(${translateY}px) scale(${scale})`,
              }}
            >
              <div
                style={{
                  ...typography.label,
                  color: typedIndex === 2 ? colors.lime500 : colors.neutral600,
                  marginBottom: 22,
                }}
              >
                {column.label}
              </div>
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 54,
                  lineHeight: 1.04,
                  letterSpacing: '-0.04em',
                  color: colors.black,
                  marginBottom: 26,
                }}
              >
                {column.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {column.body.map((line, bodyIndex) => {
                  const bodyStart = start + 35 + bodyIndex * 26;
                  const bodyOpacity = interpolate(frame, [bodyStart, bodyStart + BODY_FADE], [0, 1], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });
                  const bodyY = interpolate(frame, [bodyStart, bodyStart + BODY_FADE], [18, 0], {
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp',
                  });

                  return (
                    <div
                      key={line}
                      style={{
                        display: 'flex',
                        gap: 14,
                        opacity: bodyOpacity,
                        transform: `translateY(${bodyY}px)`,
                      }}
                    >
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          backgroundColor: typedIndex === 2 ? colors.lime500 : colors.black,
                          marginTop: 14,
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          ...typography.caption,
                          color: colors.black,
                          lineHeight: 1.38,
                        }}
                      >
                        {line}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
