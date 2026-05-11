import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from './tokens';

type KeywordJump = {
  frame: number;
  word: string;
};

type KeywordJumpOverlayProps = {
  jumps?: KeywordJump[];
};

const PRE_ROLL_FRAMES = 6;
const JUMP_FRAMES = 24;
const TAIL_FRAMES = 14;

export const KeywordJumpOverlay: React.FC<KeywordJumpOverlayProps> = ({ jumps = [] }) => {
  const frame = useCurrentFrame();
  const activeJump = [...jumps]
    .reverse()
    .find((jump) => frame >= jump.frame - PRE_ROLL_FRAMES && frame <= jump.frame + JUMP_FRAMES + TAIL_FRAMES);

  if (!activeJump) {
    return null;
  }

  const localFrame = frame - activeJump.frame;
  const jumpProgress = interpolate(localFrame, [0, JUMP_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const jumpY = -Math.sin(jumpProgress * Math.PI) * 62;
  const scale = 1 + Math.sin(jumpProgress * Math.PI) * 0.2;
  const opacity = interpolate(
    localFrame,
    [-PRE_ROLL_FRAMES, 0, JUMP_FRAMES, JUMP_FRAMES + TAIL_FRAMES],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          right: 92,
          top: 76,
          opacity,
          transform: `translateY(${jumpY}px) scale(${scale})`,
          transformOrigin: 'center',
          backgroundColor: colors.lime200,
          border: `4px solid ${colors.lime500}`,
          color: colors.black,
          fontFamily: fonts.serif,
          fontSize: 76,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          padding: '18px 30px 22px',
          boxShadow: '0 18px 40px rgba(102, 198, 28, 0.20)',
        }}
      >
        {activeJump.word}
      </div>
    </AbsoluteFill>
  );
};
