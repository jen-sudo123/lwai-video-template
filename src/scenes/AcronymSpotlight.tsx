import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

export type AcronymItem = { letter: string; word: string; detail?: string };

type AcronymSpotlightProps = {
  label: string;
  items: AcronymItem[];
  // Which item index to spotlight and when (scene-relative frame).
  spotlight?: { index: number; from: number };
  durationInFrames: number;
};

const TRANSITION = 18; // frames to crossfade between states

export const AcronymSpotlight: React.FC<AcronymSpotlightProps> = ({
  label,
  items,
  spotlight,
}) => {
  const frame = useCurrentFrame();

  const anyActive = !!spotlight && frame >= spotlight.from;
  const spotlitIndex = anyActive ? spotlight!.index : -1;
  const spotlitStart = spotlight?.from ?? 0;

  // 0 → 1 progress of the current spotlight transition
  const progress = anyActive
    ? interpolate(frame, [spotlitStart, spotlitStart + TRANSITION], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      })
    : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        {/* Label */}
        <div style={{ ...typography.label, color: colors.neutral600 }}>{label}</div>

        {/* Acronym row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {items.map((item, index) => {
            const isSpotlit = anyActive && index === spotlitIndex;
            const isDimmed = anyActive && index !== spotlitIndex;

            const itemProgress = isSpotlit ? progress : isDimmed ? progress : 0;

            const scale = isSpotlit
              ? interpolate(itemProgress, [0, 1], [1, 1.18])
              : isDimmed
              ? interpolate(itemProgress, [0, 1], [1, 0.88])
              : 1;

            const letterColor = isSpotlit
              ? lerpColor(colors.black, colors.lime500, itemProgress)
              : isDimmed
              ? lerpColor(colors.black, colors.neutral200, itemProgress)
              : colors.black;

            const wordColor = isSpotlit
              ? lerpColor(colors.neutral600, colors.black, itemProgress)
              : isDimmed
              ? lerpColor(colors.neutral600, colors.neutral200, itemProgress)
              : colors.neutral600;

            const ty = isSpotlit
              ? interpolate(itemProgress, [0, 1], [0, -12])
              : 0;

            return (
              <div
                key={`${item.letter}-${index}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: 1,
                  transform: `scale(${scale}) translateY(${ty}px)`,
                  transformOrigin: 'top left',
                }}
              >
                {/* Green top line */}
                <div
                  style={{
                    height: 3,
                    width: '85%',
                    backgroundColor: isSpotlit
                      ? lerpColor(colors.neutral200, colors.lime500, itemProgress)
                      : colors.neutral200,
                    marginBottom: 24,
                  }}
                />

                {/* Big letter */}
                <div
                  style={{
                    fontFamily: fonts.serif,
                    fontSize: 120,
                    lineHeight: 1,
                    letterSpacing: '-0.04em',
                    color: letterColor,
                    marginBottom: 16,
                  }}
                >
                  {item.letter}
                </div>

                {/* Full word */}
                <div
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 22,
                    fontWeight: isSpotlit ? 600 : 400,
                    color: wordColor,
                    lineHeight: 1.3,
                    marginBottom: item.detail && isSpotlit ? 16 : 0,
                  }}
                >
                  {item.word}
                </div>

                {/* Detail — only visible when spotlit */}
                {item.detail && isSpotlit && (
                  <div
                    style={{
                      fontFamily: fonts.sans,
                      fontSize: 18,
                      fontWeight: 400,
                      color: colors.neutral600,
                      lineHeight: 1.5,
                      opacity: itemProgress,
                      maxWidth: 340,
                    }}
                  >
                    {item.detail}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

function lerpColor(a: string, b: string, t: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
