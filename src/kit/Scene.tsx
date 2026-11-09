import React from 'react';
import { AbsoluteFill } from 'remotion';
import { IN_OUT, prog } from './motion';

// Part of the LWAI demo kit — see src/kit/README.md.
// A scene is mounted from `start` until the next scene has finished crossfading in over it.
// Build one per composition with makeScene(STARTS) so each scene only needs its index.
export const makeScene = (starts: number[], crossfade = 0.5) => {
  const Scene: React.FC<{
    t: number;
    index: number;
    children: React.ReactNode;
    pad?: boolean;
    padStyle?: React.CSSProperties;
  }> = ({ t, index, children, pad = true, padStyle }) => {
    const start = starts[index];
    const end = index + 1 < starts.length ? starts[index + 1] + crossfade : Infinity;
    if (t < start - 0.01 || t >= end) return null;
    const opacity = index === 0 ? 1 : prog(t, start, crossfade, IN_OUT);
    return (
      <AbsoluteFill style={{ backgroundColor: '#fff', opacity, zIndex: index + 1 }}>
        {pad ? (
          <div className="kit-pad" style={padStyle}>
            {children}
          </div>
        ) : (
          children
        )}
      </AbsoluteFill>
    );
  };
  return Scene;
};
