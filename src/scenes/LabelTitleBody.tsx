import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, Img, staticFile } from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { BoltIcon, SparklesIcon, StarIcon, RocketLaunchIcon, LightBulbIcon, ArrowTrendingUpIcon, ClockIcon, UserCircleIcon, ArrowsRightLeftIcon, EyeIcon, CheckCircleIcon, XCircleIcon, AdjustmentsHorizontalIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';
import { FadeText } from '../animations/FadeText';
import { PunchyImage } from '../animations/PunchyImage';
import { ZoomRegionImage } from '../animations/ZoomRegionImage';
import { MultiZoomImage } from '../animations/MultiZoomImage';
import { isPlaceholder } from './PlaceholderImage';

const HERO_ICONS: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  bolt: BoltIcon,
  sparkles: SparklesIcon,
  star: StarIcon,
  rocket: RocketLaunchIcon,
  lightbulb: LightBulbIcon,
  trending: ArrowTrendingUpIcon,
  clock: ClockIcon,
  user: UserCircleIcon,
  compare: ArrowsRightLeftIcon,
  eye: EyeIcon,
  check: CheckCircleIcon,
  x: XCircleIcon,
  sliders: AdjustmentsHorizontalIcon,
  pencil: PencilSquareIcon,
};

const XListItem: React.FC<{ text: string; delayFrames: number }> = ({ text, delayFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delayFrames, delayFrames + 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ty = interpolate(frame, [delayFrames, delayFrames + 18], [16, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <div style={{ opacity, transform: `translateY(${ty}px)`, display: 'flex', alignItems: 'flex-start', gap: 20 }}>
      <XCircleIcon style={{ width: 40, height: 40, color: '#E53E3E', flexShrink: 0, marginTop: 4 }} />
      <div style={{ fontFamily: fonts.sans, fontSize: 34, fontWeight: 400, lineHeight: 1.45, color: colors.black }}>
        {text}
      </div>
    </div>
  );
};

const BodyCard: React.FC<{ title: string; description: string; delayFrames: number; icon?: string }> = ({
  title, description, delayFrames, icon,
}) => {
  const Icon = icon ? HERO_ICONS[icon] : undefined;
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [delayFrames, delayFrames + 18], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const ty = interpolate(frame, [delayFrames, delayFrames + 18], [20, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <div style={{
      opacity,
      transform: `translateY(${ty}px)`,
      border: `2px solid ${colors.neutral200}`,
      borderRadius: 20,
      padding: '48px 56px',
    }}>
      {Icon && (
        <div style={{
          width: 56,
          height: 56,
          backgroundColor: '#EDF5E8',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 28,
        }}>
          <Icon style={{ width: 30, height: 30, color: colors.titleGreen, strokeWidth: 1.5 }} />
        </div>
      )}
      <div style={{
        fontFamily: fonts.serif,
        fontSize: 48,
        fontWeight: 400,
        color: colors.black,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        marginBottom: 16,
      }}>
        {title}
      </div>
      {description && (
        <div style={{ ...typography.body, color: colors.black }}>
          {description}
        </div>
      )}
    </div>
  );
};

const STACK_IMG_HEIGHT = 230;
const STACK_LABEL_HEIGHT = 38; // 8px gap + ~30px label text
const STACK_GAP = 20;
const FADE_FRAMES = 18;

type LabelTitleBodyProps = {
  label: string;
  title: string;
  body: string[];
  bodyTimings?: number[];
  image?: string;
  imageZoom?: {
    centerX: number;
    scale?: number;
    startFrame?: number;
  };
  imageZoomKeyframes?: Array<{
    startFrame: number;
    centerX?: number;
    centerY?: number;
    scale?: number;
  }>;
  imageZoomNoEntry?: boolean;
  hideLogo?: boolean;
  // When provided, renders a stacked column of images on the right (overrides `image`).
  images?: string[];
  // Per-image reveal delay in frames. Defaults to 0 for each unspecified entry.
  imageTimings?: number[];
  // Override the single-image container height (default 580).
  imageHeight?: number;
  // When true, the image fills the entire canvas behind the text column.
  imageFullScreen?: boolean;
  // When true, label+title sit in the left column and body items appear as a list on the right.
  bodyRight?: boolean;
  bodyCards?: boolean;
  bodyCardIcons?: string[];
  // bodyRight only: render each body item with a red ✕ icon prefix.
  bodyXList?: boolean;
  // When true, image appears on the left and text column on the right.
  imageLeft?: boolean;
  animation?: 'kinetic' | 'fade' | 'auto';
  // bodyRight only: crossfade opacity between left title and right cards.
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
};

// Column constants when an image is present.
// Text column: 80px → 740px (660px wide)
// Gap:         740px → 820px (80px)
// Image:       820px → 1840px (1020px wide, full safe-margin on right)
//
// IMAGE_HEIGHT is sized so a 16:9 image (all current assets) fills the container
// without white bars: 1020 / 1.778 ≈ 574px → round up to 580px.
// Daan's square photo will be 580×580 centred inside the 1020×580 box.
const TEXT_WIDTH_WITH_IMAGE = 660;
const IMAGE_LEFT = layout.safeMargin + TEXT_WIDTH_WITH_IMAGE + layout.safeMargin; // 820
const IMAGE_WIDTH = layout.width - IMAGE_LEFT - layout.safeMargin;                // 1020
const IMAGE_HEIGHT = 580;

// imageLeft layout constants
const IMAGE_LEFT_WIDTH = 900;
const IMAGE_LEFT_TEXT_LEFT = layout.safeMargin + IMAGE_LEFT_WIDTH + 60; // 1040
const IMAGE_LEFT_TEXT_WIDTH = layout.width - IMAGE_LEFT_TEXT_LEFT - layout.safeMargin; // ~800

const DIM = 0.3;
const CROSSFADE = 15;

function computeSideOpacities(
  frame: number,
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>
): { left: number; right: number } {
  if (!highlights || highlights.length === 0) return { left: 1, right: 1 };
  let prev: typeof highlights[0] | null = null;
  let curr = highlights[0];
  for (const h of highlights) {
    if (frame >= h.from) { prev = curr; curr = h; }
  }
  const t = interpolate(frame, [curr.from, curr.from + CROSSFADE], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const prevL = prev?.value === 'right' ? DIM : 1;
  const prevR = prev?.value === 'left' ? DIM : 1;
  const currL = curr.value === 'right' ? DIM : 1;
  const currR = curr.value === 'left' ? DIM : 1;
  return {
    left: prevL + (currL - prevL) * t,
    right: prevR + (currR - prevR) * t,
  };
}

export const LabelTitleBody: React.FC<LabelTitleBodyProps> = ({
  label,
  title,
  body,
  bodyTimings,
  image,
  imageZoom,
  imageZoomKeyframes,
  imageZoomNoEntry,
  hideLogo,
  images,
  imageTimings,
  imageHeight = IMAGE_HEIGHT,
  imageFullScreen = false,
  bodyRight = false,
  bodyCards = false,
  bodyCardIcons,
  bodyXList = false,
  imageLeft = false,
  animation = 'fade',
  highlights,
}) => {
  const frame = useCurrentFrame();
  const sideOpacity = computeSideOpacities(frame, highlights);
  const hasImages = images && images.length > 0;
  const hasImage = !!image && !isPlaceholder(image) && !hasImages;
  const hasPlaceholder = !!image && isPlaceholder(image) && !hasImages;

  const stackTotalHeight = hasImages
    ? images!.length * (STACK_IMG_HEIGHT + STACK_LABEL_HEIGHT) + (images!.length - 1) * STACK_GAP
    : 0;

  // When imageFullScreen, image shrinks to right column when body text appears
  const TRANSITION_DUR = 20;
  const fullScreenTransitionStart = (imageFullScreen && body.length > 0)
    ? (bodyTimings?.[0] ?? 0)
    : null;
  const fullScreenProgress = fullScreenTransitionStart !== null
    ? interpolate(frame, [fullScreenTransitionStart, fullScreenTransitionStart + TRANSITION_DUR], [0, 1], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      })
    : (imageFullScreen ? 0 : 1);

  // Animated image geometry: full canvas → right column
  const imgLeft   = interpolate(fullScreenProgress, [0, 1], [0, IMAGE_LEFT]);
  const imgTop    = interpolate(fullScreenProgress, [0, 1], [0, (layout.height - imageHeight) / 2]);
  const imgWidth  = interpolate(fullScreenProgress, [0, 1], [layout.width, IMAGE_WIDTH]);
  const imgHeight = interpolate(fullScreenProgress, [0, 1], [layout.height, imageHeight]);
  const textColOpacity = imageFullScreen
    ? interpolate(frame,
        [fullScreenTransitionStart ?? 0, (fullScreenTransitionStart ?? 0) + TRANSITION_DUR],
        [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;

  const textWidth = (image || hasImages) ? TEXT_WIDTH_WITH_IMAGE : layout.width - layout.safeMargin * 2;

  // bodyRight layout constants: two equal columns with a centre gap
  const HALF_COL = (layout.width - layout.safeMargin * 2 - 80) / 2; // ~840px each
  const RIGHT_COL_LEFT = layout.safeMargin + HALF_COL + 80;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>

      {/* bodyRight: label + title left-col, body list right-col */}
      {bodyRight && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 80,
          }}
        >
          <div style={{ width: HALF_COL, flexShrink: 0, opacity: sideOpacity.left }}>
            {label ? <div style={{ ...typography.label, marginBottom: 32 }}>{label}</div> : null}
            <div style={{ ...typography.title, color: colors.black }}>
              <AnimatedText text={title} animation={animation} />
            </div>
          </div>
          <div style={{ width: HALF_COL, flexShrink: 0, opacity: sideOpacity.right }}>
            {bodyXList ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {body.map((line, i) => (
                  <XListItem key={i} text={line} delayFrames={bodyTimings?.[i] ?? 0} />
                ))}
              </div>
            ) : bodyCards ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                {body.map((line, i) => {
                  const colonIdx = line.indexOf(': ');
                  const cardTitle = colonIdx >= 0 ? line.slice(0, colonIdx) : line;
                  const cardDesc = colonIdx >= 0 ? line.slice(colonIdx + 2) : '';
                  const delay = bodyTimings?.[i] ?? 0;
                  return (
                    <BodyCard
                      key={i}
                      title={cardTitle}
                      description={cardDesc}
                      delayFrames={delay}
                      icon={bodyCardIcons?.[i]}
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ ...typography.body, color: colors.black }}>
                {body.map((line, i) => (
                  <div key={i} style={{ marginBottom: 32 }}>
                    <FadeText text={line} delayFrames={bodyTimings?.[i] ?? 0} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Standard single-column text layout */}
      {!bodyRight && !imageLeft && (
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          width: textWidth,
          top: '50%',
          transform: 'translateY(-50%)',
          opacity: textColOpacity,
        }}
      >
        {/* Eyebrow label */}
        <div style={{ ...typography.label, marginBottom: 32 }}>{label}</div>

        {/* Serif title */}
        <div style={{ ...typography.title, color: colors.black, marginBottom: 48 }}>
          <AnimatedText text={title} animation={animation} />
        </div>

        {/* Body paragraphs */}
        <div style={{ ...typography.body, color: colors.black }}>
          {body.map((line, i) => (
            <div key={i} style={{ marginBottom: 24 }}>
              <FadeText text={line} delayFrames={bodyTimings?.[i] ?? 0} />
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Real image — animated full-screen→column when imageFullScreen, or static column */}
      {hasImage && imageFullScreen && (
        <div style={{
          position: 'absolute',
          left: imgLeft,
          top: imgTop,
          width: imgWidth,
          height: imgHeight,
        }}>
          <PunchyImage src={image!} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
      )}
      {hasImage && !imageFullScreen && !imageLeft && (
        <div
          style={{
            position: 'absolute',
            left: IMAGE_LEFT,
            width: IMAGE_WIDTH,
            height: imageHeight,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          {imageZoomKeyframes ? (
            <MultiZoomImage
              src={image!}
              style={{ width: '100%', height: '100%' }}
              keyframes={imageZoomKeyframes}
              containerWidth={IMAGE_WIDTH}
              containerHeight={imageHeight}
              noEntryAnimation={imageZoomNoEntry}
            />
          ) : imageZoom ? (
            <ZoomRegionImage
              src={image!}
              style={{ width: '100%', height: '100%' }}
              zoomCenterX={imageZoom.centerX}
              zoomScale={imageZoom.scale ?? 2}
              zoomStartFrame={imageZoom.startFrame ?? 30}
              containerWidth={IMAGE_WIDTH}
            />
          ) : (
            <PunchyImage src={image!} style={{ width: '100%', height: '100%' }} />
          )}
        </div>
      )}

      {/* Stacked images column */}
      {hasImages && (
        <div
          style={{
            position: 'absolute',
            left: IMAGE_LEFT,
            width: IMAGE_WIDTH,
            top: '50%',
            transform: `translateY(-${stackTotalHeight / 2}px)`,
            display: 'flex',
            flexDirection: 'column',
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
            const platformName = src.split('/').pop()?.replace(/\.[^.]+$/, '') ?? '';
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${ty}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    height: STACK_IMG_HEIGHT,
                    borderRadius: 12,
                    overflow: 'hidden',
                    boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                    backgroundColor: colors.neutral200,
                  }}
                >
                  <Img
                    src={staticFile(src)}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  />
                </div>
                <div style={{ ...typography.label, color: colors.neutral600 }}>
                  {platformName}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Placeholder (shown only in dev when no real asset exists yet) */}
      {hasPlaceholder && (
        <div
          style={{
            position: 'absolute',
            left: IMAGE_LEFT,
            width: IMAGE_WIDTH,
            height: imageHeight,
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: colors.neutral200,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{ ...typography.caption, color: colors.neutral600, textAlign: 'center', padding: 40 }}>
            {image!.replace('placeholder:', '')}
          </div>
        </div>
      )}

      {/* imageLeft layout: large image on left, text+cards on right */}
      {imageLeft && image && !isPlaceholder(image) && (
        <>
          <div style={{
            position: 'absolute',
            left: layout.safeMargin,
            width: IMAGE_LEFT_WIDTH,
            top: '50%',
            transform: 'translateY(-50%)',
            height: 750,
          }}>
            <PunchyImage src={image} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div style={{
            position: 'absolute',
            left: IMAGE_LEFT_TEXT_LEFT,
            width: IMAGE_LEFT_TEXT_WIDTH,
            top: '50%',
            transform: 'translateY(-50%)',
          }}>
            {label ? <div style={{ ...typography.label, marginBottom: 24 }}>{label}</div> : null}
            {title ? (
              <div style={{ ...typography.title, color: colors.black, marginBottom: 40 }}>
                <AnimatedText text={title} animation={animation} />
              </div>
            ) : null}
            {bodyCards ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {body.map((line, i) => {
                  const colonIdx = line.indexOf(': ');
                  const cardTitle = colonIdx >= 0 ? line.slice(0, colonIdx) : line;
                  const cardDesc = colonIdx >= 0 ? line.slice(colonIdx + 2) : '';
                  const delay = bodyTimings?.[i] ?? 0;
                  return (
                    <BodyCard
                      key={i}
                      title={cardTitle}
                      description={cardDesc}
                      delayFrames={delay}
                      icon={bodyCardIcons?.[i]}
                    />
                  );
                })}
              </div>
            ) : (
              <div style={{ ...typography.body, color: colors.black }}>
                {body.map((line, i) => (
                  <div key={i} style={{ marginBottom: 24 }}>
                    <FadeText text={line} delayFrames={bodyTimings?.[i] ?? 0} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {!imageFullScreen && !hideLogo && <LogoFooter variant="dark" />}
    </AbsoluteFill>
  );
};
