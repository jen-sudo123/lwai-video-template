import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
  interpolate,
  Img,
  staticFile,
} from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';
import { PunchyImage } from '../animations/PunchyImage';
import { isPlaceholder } from './PlaceholderImage';

type StatHeroProps = {
  // The big number or stat, e.g. "3×" or "30–40%"
  stat: string;
  // Small uppercase descriptor, e.g. "MORE LIKELY TO REDESIGN WORKFLOWS"
  label?: string;
  // Small unit/subtitle rendered directly below the stat in body size
  unit?: string;
  // Explanatory sentence below the stat. Omit when the image(s) already say it.
  context?: string;
  // Delay in frames before context fades in (default 0)
  contextTiming?: number;
  // Optional image shown on the right when provided (path under /public/)
  image?: string;
  // Optional array of image paths — renders a stacked column on the right
  // (overrides `image`). Used for source citations, e.g. a definition card
  // plus a report cover.
  images?: string[];
  // Per-image reveal delay in frames (matches images[]). Defaults to 0.
  imageTimings?: number[];
  // Per-image zoom-in effect (matches images[] index) — zooms into a region
  // of that image after it appears. Omit an entry to leave that image static.
  imageZoom?: Array<{ centerX: number; centerY?: number; scale?: number; startFrame?: number } | undefined>;
  // When true, render the stat on the left and the context on the right
  // with a highlight panel — no image needed.
  split?: boolean;
  // When true, skips the giant stat number — use when the image(s) already
  // show the number (e.g. a source screenshot) and repeating it is redundant.
  hideStat?: boolean;
  // When true, the image(s) render on the left and the stat column on the
  // right, centered within its column (mirrors the default left/right).
  imageLeft?: boolean;
  // 'side-by-side' renders exactly two images as equal left/right panels
  // filling the frame — no stat number, label, or context. Use when the
  // images themselves carry the entire message (e.g. two source screenshots).
  imagesLayout?: 'stack' | 'side-by-side' | 'center';
  // Natural width/height ratio per image (matches images[] index) — used in
  // 'side-by-side' mode to size each panel so the image fills it without
  // huge letterbox bars. Defaults to 16/9 when omitted.
  imageAspect?: number[];
};

// Stat column width when an image is present (mirrors LabelTitleBody proportions)
const STAT_WIDTH_WITH_IMAGE = 660;
const IMAGE_LEFT = layout.safeMargin + STAT_WIDTH_WITH_IMAGE + layout.safeMargin; // 820
const IMAGE_WIDTH = layout.width - IMAGE_LEFT - layout.safeMargin;                // 1020
const IMAGE_HEIGHT = 580;
const STACK_GAP = 20;
const FADE_FRAMES = 18;

// Full-screen stat reveal. Giant lime-coloured number with a spring scale entrance.
// Use for key numbers: percentages, multipliers, time savings.
export const StatHero: React.FC<StatHeroProps> = React.memo(
  ({ stat, label, unit, context, contextTiming = 0, image, images, imageTimings, imageZoom, split, hideStat = false, imageLeft = false, imagesLayout = 'stack', imageAspect }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const scale = spring({
      frame,
      fps,
      config: { damping: 14, stiffness: 90, mass: 1.1 },
      from: 0.65,
      to: 1,
    });

    const headerOpacity = interpolate(frame, [0, 18], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    const hasImages = !!images && images.length > 0;
    const hasImage = !!image && !isPlaceholder(image) && !hasImages;
    const stackImgHeight = hasImages ? (IMAGE_HEIGHT - STACK_GAP * (images!.length - 1)) / images!.length : 0;

    const zoomTransform = (zoom: NonNullable<StatHeroProps['imageZoom']>[number]) => {
      if (!zoom) return 'none';
      const { centerX, centerY = 0.5, scale: targetScale = 2, startFrame = 0 } = zoom;
      const zoomProgress = spring({
        frame: Math.max(0, frame - startFrame),
        fps,
        config: { damping: 22, stiffness: 65, mass: 1.2 },
        from: 0,
        to: 1,
      });
      const currentScale = 1 + (targetScale - 1) * zoomProgress;
      const tx = currentScale * (0.5 - centerX) * 100;
      const ty2 = currentScale * (0.5 - centerY) * 100;
      return `translate(${tx}%, ${ty2}%) scale(${currentScale})`;
    };

    // Single image, centered and as large as possible — no stat/label/context.
    if (hasImages && imagesLayout === 'center' && images!.length === 1) {
      const src = images![0];
      const timing = imageTimings?.[0] ?? 0;
      const opacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const ty = interpolate(frame, [timing, timing + FADE_FRAMES], [14, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      const aspect = imageAspect?.[0] ?? 16 / 9;
      const maxWidth = layout.width - layout.safeMargin * 2;
      const maxHeight = 760;
      const panelWidth = Math.min(maxWidth, maxHeight * aspect);
      const panelHeight = panelWidth / aspect;
      return (
        <AbsoluteFill style={{ backgroundColor: colors.white }}>
          <div
            style={{
              position: 'absolute',
              left: '50%',
              width: panelWidth,
              height: panelHeight,
              top: '50%',
              transform: `translate(-50%, calc(-50% + ${ty}px))`,
              opacity,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Img
              src={staticFile(src)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
                transformOrigin: 'center center',
                transform: zoomTransform(imageZoom?.[0]),
              }}
            />
          </div>
          <LogoFooter variant="dark" />
        </AbsoluteFill>
      );
    }

    // Two images, side by side, filling the frame — no stat/label/context.
    if (hasImages && imagesLayout === 'side-by-side' && images!.length === 2) {
      const PANEL_GAP = 60;
      const PANEL_WIDTH = (layout.width - layout.safeMargin * 2 - PANEL_GAP) / 2;
      const MAX_PANEL_HEIGHT = 760;
      return (
        <AbsoluteFill style={{ backgroundColor: colors.white }}>
          {images!.map((src, i) => {
            const timing = imageTimings?.[i] ?? 0;
            const opacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const ty = interpolate(frame, [timing, timing + FADE_FRAMES], [14, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });
            const aspect = imageAspect?.[i] ?? 16 / 9;
            const panelHeight = Math.min(MAX_PANEL_HEIGHT, PANEL_WIDTH / aspect);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: layout.safeMargin + i * (PANEL_WIDTH + PANEL_GAP),
                  width: PANEL_WIDTH,
                  height: panelHeight,
                  top: '50%',
                  transform: `translateY(calc(-50% + ${ty}px))`,
                  opacity,
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <Img
                  src={staticFile(src)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    transformOrigin: 'center center',
                    transform: zoomTransform(imageZoom?.[i]),
                  }}
                />
              </div>
            );
          })}
          <LogoFooter variant="dark" />
        </AbsoluteFill>
      );
    }

    // With image(s): stat column + image column (mirrors LabelTitleBody); imageLeft swaps sides.
    if (hasImage || hasImages) {
      const statLeft = imageLeft ? IMAGE_LEFT : layout.safeMargin;
      const imgLeft = imageLeft ? layout.safeMargin : IMAGE_LEFT;
      return (
        <AbsoluteFill style={{ backgroundColor: colors.white }}>
          {/* Stat column — vertically centered */}
          <div
            style={{
              position: 'absolute',
              left: statLeft,
              width: STAT_WIDTH_WITH_IMAGE,
              top: '50%',
              transform: 'translateY(-50%)',
              textAlign: imageLeft ? 'center' : 'left',
            }}
          >
            {label && (
              <div style={{ ...typography.label, marginBottom: 28, opacity: headerOpacity }}>
                {label}
              </div>
            )}
            {!hideStat && (
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 140,
                  fontWeight: 400,
                  letterSpacing: '-0.05em',
                  lineHeight: 1,
                  color: colors.lime500,
                  display: 'block',
                  transform: `scale(${scale})`,
                  transformOrigin: imageLeft ? 'center center' : 'left center',
                  marginBottom: unit ? 16 : 40,
                }}
              >
                {stat}
              </div>
            )}
            {unit && (
              <div style={{ ...typography.body, color: colors.black, marginBottom: 32 }}>
                {unit}
              </div>
            )}
            {context && (
              <div style={{ ...typography.body, color: colors.neutral600 }}>
                <FadeText text={context} delayFrames={contextTiming} />
              </div>
            )}
          </div>

          {/* Image column */}
          {hasImage && (
            <div
              style={{
                position: 'absolute',
                left: imgLeft,
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <PunchyImage src={image!} style={{ width: '100%', height: '100%' }} />
            </div>
          )}

          {/* Stacked images column */}
          {hasImages && (
            <div
              style={{
                position: 'absolute',
                left: imgLeft,
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: STACK_GAP,
              }}
            >
              {images!.map((src, i) => {
                const timing = imageTimings?.[i] ?? 0;
                const opacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
                const ty = interpolate(frame, [timing, timing + FADE_FRAMES], [14, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });

                const zoom = imageZoom?.[i];
                let imgTransform = 'none';
                if (zoom) {
                  const { centerX, centerY = 0.5, scale: targetScale = 2, startFrame = 0 } = zoom;
                  const zoomProgress = spring({
                    frame: Math.max(0, frame - startFrame),
                    fps,
                    config: { damping: 22, stiffness: 65, mass: 1.2 },
                    from: 0,
                    to: 1,
                  });
                  const currentScale = 1 + (targetScale - 1) * zoomProgress;
                  const tx = currentScale * (0.5 - centerX) * 100;
                  const ty2 = currentScale * (0.5 - centerY) * 100;
                  imgTransform = `translate(${tx}%, ${ty2}%) scale(${currentScale})`;
                }

                const itemHeight = imageAspect?.[i]
                  ? Math.min(IMAGE_HEIGHT, IMAGE_WIDTH / imageAspect[i])
                  : stackImgHeight;

                return (
                  <div
                    key={i}
                    style={{
                      opacity,
                      transform: `translateY(${ty}px)`,
                      height: itemHeight,
                      borderRadius: 12,
                      overflow: 'hidden',
                    }}
                  >
                    <Img
                      src={staticFile(src)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        objectPosition: 'center',
                        display: 'block',
                        transformOrigin: 'center center',
                        transform: imgTransform,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}

          <LogoFooter variant="dark" />
        </AbsoluteFill>
      );
    }

    // Split layout: stat on the left, highlighted context panel on the right.
    if (split) {
      return (
        <AbsoluteFill style={{ backgroundColor: colors.white }}>
          {/* Stat column — left */}
          <div
            style={{
              position: 'absolute',
              left: layout.safeMargin,
              width: STAT_WIDTH_WITH_IMAGE,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          >
            <div style={{ ...typography.label, marginBottom: 28, opacity: headerOpacity }}>
              {label}
            </div>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 220,
                fontWeight: 400,
                letterSpacing: '-0.05em',
                lineHeight: 1,
                color: colors.lime500,
                display: 'block',
                transform: `scale(${scale})`,
                transformOrigin: 'left center',
                marginBottom: unit ? 24 : 0,
              }}
            >
              {stat}
            </div>
            {unit && (
              <div style={{ ...typography.body, color: colors.black }}>
                {unit}
              </div>
            )}
          </div>

          {/* Highlighted context — right */}
          <div
            style={{
              position: 'absolute',
              left: IMAGE_LEFT,
              width: IMAGE_WIDTH,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: colors.lime200,
              padding: '56px 56px',
              borderRadius: 12,
            }}
          >
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 56,
                fontWeight: 400,
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: colors.black,
              }}
            >
              <FadeText text={context ?? ''} delayFrames={contextTiming} />
            </div>
          </div>

          <LogoFooter variant="dark" />
        </AbsoluteFill>
      );
    }

    // No image: centered layout (original behaviour)
    return (
      <AbsoluteFill style={{ backgroundColor: colors.white }}>
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: '50%',
            transform: 'translateY(-50%)',
            textAlign: 'center',
          }}
        >
          {/* Eyebrow label */}
          <div style={{ ...typography.label, marginBottom: 28, opacity: headerOpacity }}>
            {label}
          </div>

          {/* Giant stat */}
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 180,
              fontWeight: 400,
              letterSpacing: '-0.05em',
              lineHeight: 1,
              color: colors.lime500,
              display: 'block',
              transform: `scale(${scale})`,
              marginBottom: unit ? 16 : 44,
            }}
          >
            {stat}
          </div>

          {/* Unit subtitle */}
          {unit && (
            <div
              style={{
                ...typography.body,
                color: colors.black,
                marginBottom: 36,
              }}
            >
              {unit}
            </div>
          )}

          {/* Context line */}
          {context && (
            <div
              style={{
                ...typography.body,
                color: colors.neutral600,
                maxWidth: 960,
                margin: '0 auto',
              }}
            >
              <FadeText text={context} delayFrames={contextTiming} />
            </div>
          )}
        </div>

        <LogoFooter variant="dark" />
      </AbsoluteFill>
    );
  }
);
