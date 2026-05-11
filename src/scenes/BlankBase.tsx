import React from 'react';
import { AbsoluteFill } from 'remotion';
import { colors } from '../tokens';
import { LogoFooter } from '../Logo';

// Empty white frame with logo. Use for breathing room between sections,
// for transitions, or as a base before custom content is added.
export const BlankBase: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
