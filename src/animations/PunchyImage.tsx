import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, staticFile, Img } from 'remotion';

type PunchyImageProps = {
  src: string;
  style?: React.CSSProperties;
};

// Punchy pop-in image animation.
// Springs from 0.6 → 1 with low damping so it overshoots and bounces back.
// Uses Remotion's <Img> so the frame waits for the image to load before rendering.
export const PunchyImage: React.FC<PunchyImageProps> = ({ src, style = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: {
      damping: 7,
      stiffness: 120,
      mass: 0.6,
    },
    from: 0.6,
    to: 1,
  });

  // Clamp so frame 0 starts at full opacity — pop is conveyed by the scale spring alone
  const opacity = Math.min(1, (frame + 1) / 4);

  return (
    <div
      style={{
        ...style,
        transform: `scale(${scale})`,
        opacity,
        borderRadius: 16,
        overflow: 'hidden',
        transformOrigin: 'center center',
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    </div>
  );
};
