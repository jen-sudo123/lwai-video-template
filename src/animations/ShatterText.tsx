import React from 'react';
import { interpolate } from 'remotion';
import { fonts } from '../tokens';

type ShatterTextProps = {
  text: string;
  fontSize: number;
  color?: string;
  // Current (scene-relative) frame — pass useCurrentFrame() from the caller.
  frame: number;
  // Frame at which the first character starts flying apart.
  breakFrame: number;
  // Extra per-character delay so the shatter cascades left-to-right instead of firing at once.
  staggerFrames?: number;
  // How long a single character's flight-and-fade takes, in frames.
  durationFrames?: number;
};

// Deterministic pseudo-random in [-1, 1] from an integer seed. Must not use
// Math.random() — Remotion renders frames across separate worker processes
// and needs identical output for the same frame every time.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 - 1;
}

// Breaks text into individual characters that fly apart with rotation and a
// gravity fall, like shattering glass. Each character starts its own flight
// `staggerFrames` after the previous one, so the break cascades across the word.
export const ShatterText: React.FC<ShatterTextProps> = ({
  text,
  fontSize,
  color = '#000000',
  frame,
  breakFrame,
  staggerFrames = 1.2,
  durationFrames = 46,
}) => {
  const chars = text.split('');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {chars.map((ch, i) => {
        const charBreakFrame = breakFrame + i * staggerFrames;
        const progress = interpolate(
          frame,
          [charBreakFrame, charBreakFrame + durationFrames],
          [0, 1],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
        );

        // Golden-angle spiral gives an even, non-repeating spread of directions;
        // per-character jitter keeps it from looking mechanical.
        const angle = ((i * 137.5) % 360) * (Math.PI / 180);
        const spread = 90 + Math.abs(pseudoRandom(i * 3.1)) * 150;
        const tx = Math.cos(angle) * spread * progress;
        const flyY = Math.sin(angle) * spread * 0.6 * progress;
        const gravity = 220 * progress * progress;
        const ty = flyY + gravity;
        const rotate = pseudoRandom(i * 7.7) * 220 * progress;
        const scale = interpolate(progress, [0, 0.15, 1], [1, 1.08, 0.8]);
        const opacity = interpolate(progress, [0, 0.55, 1], [1, 1, 0]);

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontFamily: fonts.serif,
              fontSize,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color,
              whiteSpace: ch === ' ' ? 'pre' : 'normal',
              transform: `translate(${tx}px, ${ty}px) rotate(${rotate}deg) scale(${scale})`,
              opacity,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};
