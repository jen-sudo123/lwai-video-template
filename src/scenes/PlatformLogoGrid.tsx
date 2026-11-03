import React from 'react';
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

export type Platform = {
  name: string;
  maker: string;
  // Logo path under /public/. Omit to show a neutral initial badge instead.
  logo?: string;
  // Optional line under the tile (reveals at the tile's timing).
  caption?: string;
};

type PlatformLogoGridProps = {
  label?: string;
  title: string;
  platforms: Platform[];
  // Scene-local frame each tile (or, with tilesVisible, each caption) reveals.
  timings?: number[];
  // When true, all tiles are visible from frame 0 and only captions reveal on timings.
  tilesVisible?: boolean;
  // When true, the tile whose timing most recently fired is outlined in lime, others dim slightly.
  spotlight?: boolean;
};

const FADE = 18;
const TILE_W = 380;
const GAP = 40;

const ease = (frame: number, at: number, from: number, to: number) =>
  interpolate(frame, [at, at + FADE], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const PlatformLogoGrid: React.FC<PlatformLogoGridProps> = ({
  label,
  title,
  platforms,
  timings,
  tilesVisible = false,
  spotlight = false,
}) => {
  const frame = useCurrentFrame();
  const at = (i: number) => timings?.[i] ?? i * 30;

  let active = -1;
  platforms.forEach((_, i) => {
    if (frame >= at(i)) active = i;
  });

  const gridWidth = platforms.length * TILE_W + (platforms.length - 1) * GAP;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div style={{ position: 'absolute', left: layout.safeMargin, top: 82, width: 1560 }}>
        {label && <div style={{ ...typography.label, marginBottom: 24 }}>{label}</div>}
        <div style={{ ...typography.title, color: colors.black, opacity: ease(frame, 0, 0, 1) }}>
          {title}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: 330,
          left: (layout.width - gridWidth) / 2,
          width: gridWidth,
          display: 'flex',
          gap: GAP,
          alignItems: 'flex-start',
        }}
      >
        {platforms.map((p, i) => {
          const tileOpacity = tilesVisible ? 1 : ease(frame, at(i), 0, 1);
          const tileY = tilesVisible ? 0 : ease(frame, at(i), 24, 0);
          const captionOpacity = ease(frame, at(i), 0, 1);
          const isActive = spotlight && i === active;
          const dim = spotlight && active >= 0 && !isActive ? 0.45 : 1;

          return (
            <div
              key={p.name}
              style={{
                width: TILE_W,
                opacity: tileOpacity * dim,
                transform: `translateY(${tileY}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: TILE_W,
                  height: 340,
                  borderRadius: 24,
                  border: `3px solid ${isActive ? colors.lime500 : colors.neutral200}`,
                  backgroundColor: colors.white,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 28,
                }}
              >
                {p.logo ? (
                  <Img
                    src={staticFile(p.logo)}
                    style={{ width: 130, height: 130, objectFit: 'contain' }}
                  />
                ) : (
                  <div
                    style={{
                      width: 130,
                      height: 130,
                      borderRadius: 65,
                      backgroundColor: colors.neutral200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: fonts.serif,
                      fontSize: 64,
                      color: colors.neutral600,
                    }}
                  >
                    {p.name[0]}
                  </div>
                )}
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: fonts.serif,
                      fontSize: 48,
                      letterSpacing: '-0.03em',
                      lineHeight: 1.1,
                      color: colors.black,
                    }}
                  >
                    {p.name}
                  </div>
                  <div style={{ ...typography.label, marginTop: 12 }}>{p.maker}</div>
                </div>
              </div>
              {p.caption && (
                <div
                  style={{
                    ...typography.caption,
                    color: colors.black,
                    textAlign: 'center',
                    marginTop: 28,
                    opacity: captionOpacity,
                  }}
                >
                  {p.caption}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
