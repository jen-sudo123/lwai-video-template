import React from 'react';
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

type Props = {
  title: string;
  leftImage: string;
  leftLabel: string;
  rightImage: string;
  rightLabel: string;
  leftInnerZoomFrame: number;
  rightAppearFrame: number;
  leftFocusFrame: number;
};

const CARD_W = 760;
const CARD_H = 520;
const GAP = 80;
const START_X = (layout.width - (CARD_W * 2 + GAP)) / 2;
const TOP_Y = 280;

export const ModelPickerLocations: React.FC<Props> = ({
  title,
  leftImage,
  leftLabel,
  rightImage,
  rightLabel,
  leftInnerZoomFrame,
  rightAppearFrame,
  leftFocusFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rightOpacity = interpolate(frame, [rightAppearFrame, rightAppearFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightTranslate = interpolate(frame, [rightAppearFrame, rightAppearFrame + 22], [32, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const focusProgress = spring({
    frame: Math.max(0, frame - leftFocusFrame),
    fps,
    config: { damping: 18, stiffness: 85, mass: 0.9 },
  });

  const innerZoomProgress = spring({
    frame: Math.max(0, frame - leftInnerZoomFrame),
    fps,
    config: { damping: 20, stiffness: 80, mass: 1 },
  });

  const leftX = START_X + interpolate(focusProgress, [0, 1], [0, 300]);
  const leftY = TOP_Y + interpolate(focusProgress, [0, 1], [0, -40]);
  const leftW = interpolate(focusProgress, [0, 1], [CARD_W, 980]);
  const leftH = interpolate(focusProgress, [0, 1], [CARD_H, 670]);
  const leftScale = 1 + innerZoomProgress * 1.15 + focusProgress * 0.55;
  const leftTx = innerZoomProgress * -310 + focusProgress * -240;
  const leftTy = innerZoomProgress * 18 + focusProgress * 22;
  const leftLabelOpacity = interpolate(focusProgress, [0, 1], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rightDim = interpolate(focusProgress, [0, 1], [1, 0.12], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 100,
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
          left: leftX,
          top: leftY,
          width: leftW,
          height: leftH,
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 8,
            border: `1px solid ${colors.neutral200}`,
            backgroundColor: colors.white,
          }}
        >
          <Img
            src={staticFile(leftImage)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              transformOrigin: 'center center',
              transform: `translate(${leftTx}px, ${leftTy}px) scale(${leftScale})`,
            }}
          />
        </div>
        <div
          style={{
            ...typography.caption,
            fontFamily: fonts.serif,
            fontSize: 32,
            color: colors.black,
            textAlign: 'center',
            marginTop: 32,
            opacity: leftLabelOpacity,
          }}
        >
          {leftLabel}
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: START_X + CARD_W + GAP,
          top: TOP_Y,
          width: CARD_W,
          height: CARD_H,
          transform: `translateY(${rightTranslate}px)`,
          opacity: rightOpacity * rightDim,
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            borderRadius: 8,
            border: `1px solid ${colors.neutral200}`,
            backgroundColor: colors.white,
          }}
        >
          <Img
            src={staticFile(rightImage)}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div
          style={{
            ...typography.caption,
            fontFamily: fonts.serif,
            fontSize: 32,
            color: colors.black,
            textAlign: 'center',
            marginTop: 32,
          }}
        >
          {rightLabel}
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
