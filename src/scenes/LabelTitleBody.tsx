import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, Img, staticFile } from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { BoltIcon, SparklesIcon, StarIcon, RocketLaunchIcon, LightBulbIcon, ArrowTrendingUpIcon, ClockIcon, UserCircleIcon, ArrowsRightLeftIcon, EyeIcon, CheckCircleIcon, XCircleIcon, AdjustmentsHorizontalIcon, PencilSquareIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { LogoFooter } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';
import { FadeText } from '../animations/FadeText';
import { PunchyImage } from '../animations/PunchyImage';
import { ZoomRegionImage } from '../animations/ZoomRegionImage';
import { MultiZoomImage } from '../animations/MultiZoomImage';
import { isPlaceholder } from './PlaceholderImage';
import { FluencyPipelineDiagram } from './diagrams/FluencyPipelineDiagram';
import { AiHumanDecisionDiagram } from './diagrams/AiHumanDecisionDiagram';
import { PersonalizationGapDiagram } from './diagrams/PersonalizationGapDiagram';
import { SkillStackDiagram } from './diagrams/SkillStackDiagram';

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
  'adjustments-horizontal': AdjustmentsHorizontalIcon,
  pencil: PencilSquareIcon,
  'chat-bubble-left-right': ChatBubbleLeftRightIcon,
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

const BodyCard: React.FC<{ title: string; description: string; delayFrames: number; icon?: string; compact?: boolean; bouncy?: boolean; accent?: boolean }> = ({
  title, description, delayFrames, icon, compact = false, bouncy = false, accent = false,
}) => {
  const Icon = icon ? HERO_ICONS[icon] : undefined;
  const frame = useCurrentFrame();

  const springProgress = bouncy
    ? spring({ frame: frame - delayFrames, fps: 30, config: { damping: 8, stiffness: 120, mass: 0.6 } })
    : 0;

  const opacity = bouncy
    ? interpolate(frame, [delayFrames, delayFrames + 6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : interpolate(frame, [delayFrames, delayFrames + 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const ty = bouncy
    ? interpolate(springProgress, [0, 1], [60, 0])
    : interpolate(frame, [delayFrames, delayFrames + 18], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const scale = bouncy ? interpolate(springProgress, [0, 1], [0.85, 1]) : 1;
  return (
    <div style={{
      opacity,
      transform: `translateY(${ty}px) scale(${scale})`,
      transformOrigin: 'left center',
      border: accent ? `2px solid ${colors.lime500}` : `2px solid ${colors.neutral200}`,
      backgroundColor: accent ? 'rgba(102, 198, 28, 0.06)' : 'transparent',
      borderRadius: 20,
      padding: compact ? '20px 28px' : '48px 56px',
    }}>
      {Icon && (
        <div style={{
          width: compact ? 40 : 56,
          height: compact ? 40 : 56,
          backgroundColor: accent ? 'rgba(102, 198, 28, 0.15)' : '#EDF5E8',
          borderRadius: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: compact ? 16 : 28,
        }}>
          <Icon style={{ width: compact ? 22 : 30, height: compact ? 22 : 30, color: colors.titleGreen, strokeWidth: 1.5 }} />
        </div>
      )}
      <div style={{
        fontFamily: fonts.serif,
        fontSize: compact ? 34 : 48,
        fontWeight: 400,
        color: colors.black,
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
        marginBottom: compact ? 8 : 16,
      }}>
        {title}
      </div>
      {description && (
        <div style={{ ...typography.body, fontSize: compact ? 26 : typography.body.fontSize, color: colors.black }}>
          {description}
        </div>
      )}
    </div>
  );
};

const STACK_IMG_HEIGHT = 380;
const STACK_LABEL_HEIGHT = 0; // label removed
const STACK_GAP = 20;
const FADE_FRAMES = 18;

type LabelTitleBodyProps = {
  label: string;
  title: string;
  // Substring of `title` to render in lime (e.g. the initial letter of "D Is for Doubt").
  titleHighlight?: string;
  body: string[];
  bodyTimings?: number[];
  image?: string;
  // Renders a built-in animated diagram in the image column instead of a static image.
  // Steps reveal one-by-one; timings are frame offsets within the scene (defaults built in).
  diagram?: 'fluency-pipeline' | 'ai-human-decision' | 'personalization-gap' | 'skill-stack';
  diagramTimings?: number[];
  // Overrides the eyebrow label's font size (defaults to typography.label's 22px).
  labelSize?: number;
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
  // Crossfade the single image to another src at a scene-local frame.
  imageSwaps?: Array<{ from: number; src: string }>;
  hideLogo?: boolean;
  // When provided, renders a stacked column of images on the right (overrides `image`).
  images?: string[];
  // Per-image reveal delay in frames. Defaults to 0 for each unspecified entry.
  imageTimings?: number[];
  // Override the single-image container height (default 580).
  imageHeight?: number;
  // When true, the image fills the entire canvas behind the text column.
  imageFullScreen?: boolean;
  // Pricing grid: label+title top-right, first 4 body cards in a 2×2 grid, 5th card centered below.
  pricingGrid?: boolean;
  // When true, label+title sit in the left column and body items appear as a list on the right.
  bodyRight?: boolean;
  bodyCards?: boolean;
  bodyCardIcons?: string[];
  // When true (with bodyCards), renders cards in compact mode (smaller text + padding).
  bodyCardCompact?: boolean;
  // When true (with bodyCards), cards fly in with a spring/bounce animation.
  bodyCardBouncy?: boolean;
  // Per-card accent highlight (lime border + tint). Index matches body array.
  bodyCardAccents?: boolean[];
  // bodyRight only: render each body item with a red ✕ icon prefix.
  bodyXList?: boolean;
  // When true, image appears on the left and text column on the right.
  imageLeft?: boolean;
  animation?: 'kinetic' | 'fade' | 'auto';
  // bodyRight only: crossfade opacity between left title and right cards.
  highlights?: Array<{ from: number; value: 'left' | 'right' | null }>;
  // bodyRight only: small note rendered below the title in the left column.
  titleNote?: string;
  titleNoteDelay?: number;
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
  labelSize,
  title,
  titleHighlight,
  body,
  bodyTimings,
  image,
  diagram,
  diagramTimings,
  imageZoom,
  imageZoomKeyframes,
  imageZoomNoEntry,
  imageSwaps,
  hideLogo,
  images,
  imageTimings,
  imageHeight = IMAGE_HEIGHT,
  imageFullScreen = false,
  pricingGrid = false,
  bodyRight = false,
  bodyCards = false,
  bodyCardIcons,
  bodyCardCompact = false,
  bodyCardBouncy = false,
  bodyCardAccents,
  bodyXList = false,
  imageLeft = false,
  animation = 'fade',
  highlights,
  titleNote,
  titleNoteDelay = 0,
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

  const textWidth = (image || hasImages || diagram) ? TEXT_WIDTH_WITH_IMAGE : layout.width - layout.safeMargin * 2;

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
            {label ? <div style={{ ...typography.label, fontSize: labelSize ?? typography.label.fontSize, marginBottom: 32 }}>{label}</div> : null}
            <div style={{ ...typography.title, color: colors.black }}>
              <AnimatedText text={title} animation={animation} highlight={titleHighlight} />
            </div>
            {titleNote && (
              <div style={{ marginTop: 32, fontFamily: fonts.sans, fontSize: 28, lineHeight: 1.5, color: colors.neutral600, fontWeight: 400 }}>
                <FadeText text={titleNote} delayFrames={titleNoteDelay} />
              </div>
            )}
          </div>
          <div style={{ width: HALF_COL, flexShrink: 0, opacity: sideOpacity.right }}>
            {bodyXList ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                {body.map((line, i) => (
                  <XListItem key={i} text={line} delayFrames={bodyTimings?.[i] ?? 0} />
                ))}
              </div>
            ) : bodyCards ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: bodyCardCompact ? 16 : 32 }}>
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
                      compact={bodyCardCompact}
                      bouncy={bodyCardBouncy}
                      accent={bodyCardAccents?.[i]}
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
      {!bodyRight && !imageLeft && !pricingGrid && (
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
          <AnimatedText text={title} animation={animation} highlight={titleHighlight} />
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
            <>
              <PunchyImage src={image!} style={{ width: '100%', height: '100%' }} />
              {imageSwaps?.map(({ from, src }) => (
                <Img
                  key={`${src}-${from}`}
                  src={staticFile(src)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: 16,
                    opacity: interpolate(frame, [from, from + 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                  }}
                />
              ))}
            </>
          )}
        </div>
      )}

      {/* Built-in animated diagram (replaces a static image) */}
      {diagram === 'fluency-pipeline' && !imageFullScreen && !imageLeft && (
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
          <FluencyPipelineDiagram frame={frame} timings={diagramTimings} />
        </div>
      )}
      {diagram === 'skill-stack' && !imageFullScreen && !imageLeft && (
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
          <SkillStackDiagram frame={frame} timings={diagramTimings} />
        </div>
      )}
      {diagram === 'ai-human-decision' && !imageFullScreen && !imageLeft && (
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
          <AiHumanDecisionDiagram frame={frame} humanDimFrame={diagramTimings?.[0]} />
        </div>
      )}
      {diagram === 'personalization-gap' && imageFullScreen && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <PersonalizationGapDiagram frame={frame} timings={diagramTimings} />
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
                <Img
                  src={staticFile(src)}
                  style={{
                    width: '100%',
                    height: STACK_IMG_HEIGHT,
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    borderRadius: 12,
                  }}
                />
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
              <div style={{ display: 'flex', flexDirection: 'column', gap: bodyCardCompact ? 20 : 28 }}>
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
                      compact={bodyCardCompact}
                      bouncy={bodyCardBouncy}
                      accent={bodyCardAccents?.[i]}
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

      {/* Pricing grid: label+title top-right, 2×2 card grid, 5th card centered below */}
      {pricingGrid && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {/* Label + title: top left */}
          <div style={{
            position: 'absolute',
            left: layout.safeMargin,
            top: layout.safeMargin,
            width: HALF_COL,
            opacity: sideOpacity.left,
          }}>
            {label && <div style={{ ...typography.label, marginBottom: 16 }}>{label}</div>}
            <div style={{
              fontFamily: fonts.serif,
              fontSize: 56,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: colors.black,
            }}>
              <AnimatedText text={title} animation={animation} />
            </div>
          </div>

          {/* 2×2 grid of first 4 cards */}
          <div style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: 290,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 24,
          }}>
            {(body ?? []).slice(0, 4).map((line, i) => {
              const colonIdx = line.indexOf(': ');
              const cardTitle = colonIdx >= 0 ? line.slice(0, colonIdx) : line;
              const cardDesc = colonIdx >= 0 ? line.slice(colonIdx + 2) : '';
              return (
                <BodyCard
                  key={i}
                  title={cardTitle}
                  description={cardDesc}
                  delayFrames={bodyTimings?.[i] ?? 0}
                  icon={bodyCardIcons?.[i]}
                  compact={bodyCardCompact}
                  bouncy={bodyCardBouncy}
                  accent={bodyCardAccents?.[i]}
                />
              );
            })}
          </div>

          {/* 5th card: centered below the grid */}
          {(body ?? []).length >= 5 && (() => {
            const line = (body ?? [])[4];
            const colonIdx = line.indexOf(': ');
            const cardTitle = colonIdx >= 0 ? line.slice(0, colonIdx) : line;
            const cardDesc = colonIdx >= 0 ? line.slice(colonIdx + 2) : '';
            return (
              <div style={{
                position: 'absolute',
                left: layout.safeMargin + HALF_COL / 2 + 12,
                right: layout.safeMargin + HALF_COL / 2 + 12,
                bottom: layout.safeMargin + 48,
              }}>
                <BodyCard
                  title={cardTitle}
                  description={cardDesc}
                  delayFrames={bodyTimings?.[4] ?? 0}
                  icon={bodyCardIcons?.[4]}
                  compact={bodyCardCompact}
                  bouncy={bodyCardBouncy}
                  accent={bodyCardAccents?.[4]}
                />
              </div>
            );
          })()}
        </div>
      )}

      {!imageFullScreen && !hideLogo && <LogoFooter variant="dark" />}
    </AbsoluteFill>
  );
};
