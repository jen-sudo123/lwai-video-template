import React from 'react';
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { Logo } from '../Logo';
import { AnimatedText } from '../animations/AnimatedText';

type VideoClipProps = {
  videoSrc: string;
  videoStartTime: number;
  label?: string;
  title?: string;
  body?: string[];
  bodyTimings?: number[];
  overlayPosition?: 'bottom' | 'top' | 'right' | 'top-right' | 'center' | 'below';
  overlayHideFrom?: number;
  // Frame at which body items switch from inside the card box to open text on the video
  bodyOpenFrom?: number;
  bodyAnimation?: 'typewriter' | 'kinetic' | 'fade' | 'auto';
  openBodyAnimation?: 'typewriter' | 'kinetic' | 'fade' | 'auto';
  openBodyVariant?: 'default' | 'quote';
  openBodyHideFrom?: number;
  titleCentered?: boolean;
  logoPosition?: 'bottom-left' | 'bottom-right';
  // Split layout: white panel on left with text, video visible only on right half
  panelLayout?: 'text-left' | 'cards-left' | 'quote-cards-left';
  // Override the left position of the cards-left column (default 24).
  panelLeft?: number;
  // Small pan/zoom adjustment for the source video.
  clipTransform?: {
    scale?: number;
    translateX?: number;
    translateY?: number;
  };
  // Animated pan/zoom over the scene's duration. Each keyframe's scale/origin is held until the
  // next keyframe, easing over KF_TRANSITION frames. originX/originY are percentages (0-100) of
  // the frame, matching Video.tsx's clipZoomKeyframes convention for the VideoData-level clipSrc
  // background. A negative startFrame lets a scene start already zoomed in (carrying zoom from
  // the previous scene) without an easing ramp at frame 0.
  clipZoomKeyframes?: Array<{ startFrame: number; scale: number; originX: number; originY: number }>;
  skipVideo?: boolean;
  // Skip the card entrance animation — shows overlay at full opacity from frame 0
  skipCardAnimation?: boolean;
  // Delay the card entrance by this many frames (shifts the fade-in window)
  cardDelay?: number;
  // Plain white rectangle painted over the video for this scene's full duration —
  // used to cover baked-in text in source footage that's since gone stale.
  whiteoutBox?: { top: number; left: number; width: number; height: number };
};

export const VideoClip: React.FC<VideoClipProps> = ({
  videoSrc,
  videoStartTime,
  label,
  title,
  body,
  bodyTimings,
  overlayPosition = 'bottom',
  overlayHideFrom,
  bodyOpenFrom,
  bodyAnimation = 'fade',
  openBodyAnimation = 'fade',
  openBodyVariant = 'default',
  openBodyHideFrom,
  titleCentered = false,
  logoPosition = 'bottom-right',
  panelLayout,
  panelLeft = 24,
  clipTransform,
  clipZoomKeyframes,
  skipVideo = false,
  skipCardAnimation = false,
  cardDelay = 0,
  whiteoutBox,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const trimBefore = Math.round(videoStartTime * fps);
  const hasText = !!(label || title || (body && body.length > 0));

  const textOpacity = skipCardAnimation ? 1 : interpolate(frame, [cardDelay + 8, cardDelay + 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const overlayFadeOut = overlayHideFrom == null
    ? 1
    : interpolate(frame, [overlayHideFrom - 8, overlayHideFrom], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
  const textSlide = skipCardAnimation ? 0 : interpolate(frame, [cardDelay + 8, cardDelay + 22], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isCenter = overlayPosition === 'center';
  const isBelow = overlayPosition === 'below';
  const isTop = overlayPosition === 'top' || overlayPosition === 'top-right';
  const isRight = overlayPosition === 'right' || overlayPosition === 'top-right';
  const KF_TRANSITION = 30;
  let zoomScale: number | undefined;
  let zoomOriginX: number | undefined;
  let zoomOriginY: number | undefined;
  if (clipZoomKeyframes && clipZoomKeyframes.length > 0) {
    const sorted = [...clipZoomKeyframes].sort((a, b) => a.startFrame - b.startFrame);
    let activeIndex = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].startFrame <= frame) activeIndex = i;
    }
    const active = sorted[activeIndex];
    const prev = activeIndex > 0 ? sorted[activeIndex - 1] : active;
    const t = interpolate(frame, [active.startFrame, active.startFrame + KF_TRANSITION], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    zoomScale = prev.scale + (active.scale - prev.scale) * t;
    zoomOriginX = prev.originX + (active.originX - prev.originX) * t;
    zoomOriginY = prev.originY + (active.originY - prev.originY) * t;
  }

  const videoTransform = zoomScale != null
    ? `scale(${zoomScale})`
    : clipTransform
      ? `translate(${clipTransform.translateX ?? 0}px, ${clipTransform.translateY ?? 0}px) scale(${clipTransform.scale ?? 1})`
      : undefined;
  const videoTransformOrigin = zoomOriginX != null
    ? `${zoomOriginX}% ${zoomOriginY}%`
    : 'center center';

  // 'below' layout: video area fills top 810px (75% of canvas), text panel fills bottom 270px
  // objectFit contain: full video visible at 1440×810 centered in 1920×810 (240px bars each side)
  const VIDEO_AREA_HEIGHT = 810;

  // Split body items: those inside the card box vs those rendered as open text
  const cardBody = bodyOpenFrom != null
    ? body?.filter((_, i) => (bodyTimings?.[i] ?? 0) < bodyOpenFrom)
    : body;
  const openBody = bodyOpenFrom != null
    ? body?.filter((_, i) => (bodyTimings?.[i] ?? 0) >= bodyOpenFrom)
    : undefined;
  const openBodyTimings = bodyOpenFrom != null
    ? bodyTimings?.filter((t) => t >= bodyOpenFrom)
    : undefined;
  const isQuoteCardsLeft = panelLayout === 'quote-cards-left';
  const quoteTitleFontSize = title && title.length > 180 ? 27 : title && title.length > 110 ? 33 : 42;

  return (
    <AbsoluteFill>
      {!skipVideo && !isBelow && (
        <OffthreadVideo
          src={staticFile(videoSrc)}
          trimBefore={trimBefore}
          muted
          style={panelLayout === 'text-left' ? {
            position: 'absolute',
            left: '46%',
            top: 0,
            width: '54%',
            height: '100%',
            objectFit: 'contain',
            backgroundColor: colors.white,
            transform: videoTransform,
            transformOrigin: videoTransformOrigin,
          } : {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: videoTransform,
            transformOrigin: videoTransformOrigin,
          }}
        />
      )}

      {/* Below layout: video in a contained area so full frame is visible */}
      {!skipVideo && isBelow && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: VIDEO_AREA_HEIGHT,
          backgroundColor: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          <OffthreadVideo
            src={staticFile(videoSrc)}
            trimBefore={trimBefore}
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transform: videoTransform,
              transformOrigin: videoTransformOrigin,
            }}
          />
        </div>
      )}

      {whiteoutBox && (
        <div
          style={{
            position: 'absolute',
            top: whiteoutBox.top,
            left: whiteoutBox.left,
            width: whiteoutBox.width,
            height: whiteoutBox.height,
            backgroundColor: colors.white,
          }}
        />
      )}

      {/* Center layout: open text on white background, no card box */}
      {hasText && isCenter && (
        <AbsoluteFill
          style={{
            opacity: textOpacity,
            backgroundColor: colors.white,
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: layout.safeMargin,
              right: layout.safeMargin,
              top: '50%',
              transform: `translateY(calc(-50% + ${textSlide}px))`,
            }}
          >
            {label && (
              <div
                style={{
                  ...typography.label,
                  color: colors.lime500,
                  fontSize: 22,
                  marginBottom: 16,
                }}
              >
                {label}
              </div>
            )}
            {title && (
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 44,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: colors.black,
                  maxWidth: 1760,
                  whiteSpace: 'nowrap',
                  marginBottom: body?.length ? 24 : 0,
                }}
              >
                {title}
              </div>
            )}
            {body?.map((line, i) => {
              const delay = bodyTimings?.[i] ?? 0;
              const itemOpacity = interpolate(
                frame,
                [delay, delay + 18],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              );
              return (
                <div
                  key={i}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 28,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    color: colors.neutral600,
                    opacity: itemOpacity,
                    marginBottom: 6,
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </AbsoluteFill>
      )}

      {/* Below layout: white panel under the video, text left-aligned */}
      {hasText && isBelow && (
        <div
          style={{
            position: 'absolute',
            top: VIDEO_AREA_HEIGHT,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.white,
            borderTop: `1px solid ${colors.neutral200}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: layout.safeMargin,
            paddingRight: layout.safeMargin,
            opacity: textOpacity,
            transform: `translateY(${textSlide}px)`,
          }}
        >
          {label && (
            <div style={{ ...typography.label, color: colors.lime500, fontSize: 18, marginBottom: 8 }}>
              {label}
            </div>
          )}
          {title && (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 40,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: colors.black,
                marginBottom: body?.length ? 10 : 0,
              }}
            >
              {title}
            </div>
          )}
          {body?.map((line, i) => {
            const delay = bodyTimings?.[i] ?? 0;
            const itemOpacity = interpolate(frame, [delay, delay + 18], [0, 1], {
              extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 26,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: colors.neutral600,
                  opacity: itemOpacity,
                  marginBottom: 4,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      )}

      {/* Card layout: boxed overlay in a corner */}
      {hasText && !isCenter && !isBelow && !panelLayout && !titleCentered && (
        <div
          style={{
            position: 'absolute',
            [isTop ? 'top' : 'bottom']: 24,
            [isRight ? 'right' : 'left']: 24,
            opacity: textOpacity * overlayFadeOut,
            transform: `translateY(${isTop ? -textSlide : textSlide}px)`,
            backgroundColor: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(12px)',
            borderRadius: 16,
            padding: '20px 32px',
            maxWidth: 720,
          }}
        >
          {label && (
            <div
              style={{
                ...typography.label,
                color: colors.lime500,
                fontSize: 18,
                marginBottom: 8,
              }}
            >
              {label}
            </div>
          )}
          {title && (
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 38,
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: colors.white,
                marginBottom: cardBody?.length ? 12 : 0,
                whiteSpace: 'pre-line',
              }}
            >
              {title}
            </div>
          )}
          {cardBody?.map((line, i) => {
            const delay = bodyTimings?.[i] ?? 0;
            const isTypewriter = bodyAnimation === 'typewriter';
            const itemOpacity = interpolate(
              frame,
              isTypewriter ? [delay, delay + 1] : [delay, delay + 18],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            return (
              <div
                key={i}
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 24,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: 'rgba(255,255,255,0.88)',
                  opacity: itemOpacity,
                  marginBottom: 4,
                  whiteSpace: 'pre-line',
                }}
              >
                <AnimatedText
                  text={line}
                  animation={bodyAnimation}
                  startFrame={delay}
                  style={{ whiteSpace: 'pre-line' }}
                />
              </div>
            );
          })}
        </div>
      )}

      {hasText && titleCentered && title && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            transform: `translateY(calc(-50% + ${textSlide}px))`,
            opacity: textOpacity * overlayFadeOut,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              maxWidth: 1520,
              padding: '0 120px',
              textAlign: 'center',
              color: colors.black,
              fontFamily: fonts.serif,
              fontSize: 66,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.08,
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </div>
        </div>
      )}

      {/* Open text layout: body items rendered directly on the video, no box */}
      {openBody && openBody.length > 0 && (
        <div
          style={{
            position: 'absolute',
            left: openBodyVariant === 'quote' ? 0 : layout.safeMargin,
            width: openBodyVariant === 'quote' ? '54%' : undefined,
            right: openBodyVariant === 'quote' ? undefined : layout.safeMargin,
            bottom: openBodyVariant === 'quote' ? 300 : 100,
            display: openBodyVariant === 'quote' ? 'flex' : 'block',
            justifyContent: openBodyVariant === 'quote' ? 'center' : undefined,
          }}
        >
          {openBody.map((line, i) => {
            const delay = openBodyTimings?.[i] ?? 0;
            const isTypewriter = openBodyAnimation === 'typewriter';
            const itemOpacity = isTypewriter
              ? interpolate(frame, [delay, delay + 1], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              : interpolate(frame, [delay, delay + 18], [0, 1], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
            const openBodyFadeOut = openBodyHideFrom == null
              ? 1
              : interpolate(frame, [openBodyHideFrom, openBodyHideFrom + 8], [1, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
            const itemSlide = isTypewriter
              ? interpolate(frame, [delay, delay + 1], [0, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                })
              : interpolate(frame, [delay, delay + 18], [20, 0], {
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                });
            return (
              <div
                key={i}
                style={{
                  fontFamily: openBodyVariant === 'quote' ? fonts.serif : fonts.sans,
                  fontSize: openBodyVariant === 'quote' ? 42 : 32,
                  fontWeight: openBodyVariant === 'quote' ? 400 : 500,
                  lineHeight: openBodyVariant === 'quote' ? 1.22 : 1.5,
                  color: openBodyVariant === 'quote' ? colors.black : colors.white,
                  opacity: itemOpacity * openBodyFadeOut,
                  transform: `translateY(${itemSlide}px)`,
                  marginBottom: 12,
                  textShadow: openBodyVariant === 'quote' ? 'none' : '0 2px 12px rgba(0,0,0,0.6)',
                  whiteSpace: 'pre-line',
                  maxWidth: openBodyVariant === 'quote' ? 760 : 960,
                  backgroundColor: openBodyVariant === 'quote' ? 'rgba(255,255,255,0.92)' : 'transparent',
                  backdropFilter: openBodyVariant === 'quote' ? 'blur(12px)' : undefined,
                  borderLeft: openBodyVariant === 'quote' ? `4px solid ${colors.lime500}` : undefined,
                  borderRadius: openBodyVariant === 'quote' ? 18 : undefined,
                  padding: openBodyVariant === 'quote' ? '20px 24px' : undefined,
                  boxShadow: openBodyVariant === 'quote' ? '0 16px 40px rgba(0,0,0,0.12)' : undefined,
                }}
              >
                <AnimatedText
                  text={openBodyVariant === 'quote' ? `"${line}"` : line}
                  animation={openBodyAnimation}
                  startFrame={delay}
                  style={{ whiteSpace: 'pre-line' }}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* Panel layout: white left column over the video, text inside.
          Background is always opaque (opacity 1) so it blocks the video from frame 0.
          Only the text content inside slides/fades in. */}
      {panelLayout === 'text-left' && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '46%',
            backgroundColor: colors.white,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              padding: `0 ${layout.safeMargin}px`,
              opacity: textOpacity * overlayFadeOut,
              transform: `translateX(${-textSlide}px)`,
            }}
          >
            {label && (
              <div style={{ ...typography.label, color: colors.lime500, fontSize: 20, marginBottom: 20 }}>
                {label}
              </div>
            )}
            {title && (
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: 44,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  color: colors.black,
                  marginBottom: body?.length ? 32 : 0,
                }}
              >
                {title}
              </div>
            )}
            {body?.map((line, i) => {
              const delay = bodyTimings?.[i] ?? 0;
              const itemOpacity = skipCardAnimation ? 1 : interpolate(
                frame,
                [delay, delay + 18],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              );
              const itemSlide = skipCardAnimation ? 0 : interpolate(
                frame,
                [delay, delay + 18],
                [16, 0],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              );
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemOpacity,
                    transform: `translateY(${itemSlide}px)`,
                    marginBottom: 16,
                    fontFamily: fonts.sans,
                    fontSize: 26,
                    fontWeight: 400,
                    lineHeight: 1.4,
                    color: colors.neutral600,
                  }}
                >
                  {line}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Cards-left layout: label + title card, then one card per body item, stacked on the left */}
      {(panelLayout === 'cards-left' || panelLayout === 'quote-cards-left') && (
        <div
          style={{
            position: 'absolute',
            left: panelLeft,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            maxWidth: 560,
          }}
        >
          {/* Header card */}
          <div
            style={{
              opacity: textOpacity * overlayFadeOut,
              transform: `translateX(${-textSlide}px)`,
              backgroundColor: isQuoteCardsLeft ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.78)',
              backdropFilter: 'blur(14px)',
              borderRadius: 14,
              padding: isQuoteCardsLeft ? '22px 28px' : '16px 24px',
              borderLeft: isQuoteCardsLeft ? `5px solid ${colors.lime500}` : undefined,
              boxShadow: isQuoteCardsLeft ? '0 14px 40px rgba(0,0,0,0.12)' : undefined,
            }}
          >
            {label && (
              <div style={{ ...typography.label, color: colors.lime500, fontSize: 18, marginBottom: 6 }}>
                {label}
              </div>
            )}
            {title && (
              <div
                style={{
                  fontFamily: fonts.serif,
                  fontSize: isQuoteCardsLeft ? quoteTitleFontSize : 36,
                  fontWeight: 400,
                  letterSpacing: '-0.03em',
                  lineHeight: isQuoteCardsLeft ? 1.18 : 1.2,
                  color: isQuoteCardsLeft ? colors.black : colors.white,
                }}
              >
                {isQuoteCardsLeft ? (
                  <AnimatedText text={`"${title}"`} animation="typewriter" />
                ) : (
                  title
                )}
              </div>
            )}
          </div>

          {/* One card per body item */}
          {body?.map((line, i) => {
            const delay = bodyTimings?.[i] ?? 0;
            const itemOpacity = interpolate(
              frame,
              [delay, delay + 18],
              [0, 1],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            const itemSlide = interpolate(
              frame,
              [delay, delay + 18],
              [20, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${-itemSlide}px)`,
                  backgroundColor: isQuoteCardsLeft ? 'rgba(255,255,255,0.82)' : 'rgba(0,0,0,0.72)',
                  backdropFilter: 'blur(14px)',
                  borderLeft: `4px solid ${colors.lime500}`,
                  borderRadius: 12,
                  padding: '14px 22px',
                  fontFamily: fonts.sans,
                  fontSize: 26,
                  fontWeight: 400,
                  lineHeight: 1.4,
                  color: isQuoteCardsLeft ? colors.black : 'rgba(255,255,255,0.92)',
                  boxShadow: isQuoteCardsLeft ? '0 10px 30px rgba(0,0,0,0.1)' : undefined,
                }}
              >
                {line}
              </div>
            );
          })}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 24,
          [logoPosition === 'bottom-left' ? 'left' : 'right']: 24,
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(12px)',
          borderRadius: 12,
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Logo variant="light" height={32} />
      </div>
    </AbsoluteFill>
  );
};
