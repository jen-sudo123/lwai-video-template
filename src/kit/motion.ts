import React from 'react';
import { Easing, interpolate } from 'remotion';

// Part of the LWAI demo kit — see src/kit/README.md.
// All cues are in SECONDS (t = frame / fps), like the VO word timestamps.

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const OUT = Easing.out(Easing.cubic);
export const IN_OUT = Easing.inOut(Easing.cubic);
export const BACK = Easing.out(Easing.back(1.6));


export const prog = (t: number, at: number, dur = 0.7, easing = OUT) =>
  interpolate(t, [at, at + dur], [0, 1], { ...clamp, easing });

export type EnterOpts = { dur?: number; x?: number; y?: number; scale?: number; easing?: (n: number) => number };
export const enter = (t: number, at: number, { dur = 0.7, x = 0, y = 24, scale = 1, easing = OUT }: EnterOpts = {}) => {
  const p = prog(t, at, dur, easing);
  return {
    opacity: p,
    transform: `translate(${x * (1 - p)}px, ${y * (1 - p)}px) scale(${scale + (1 - scale) * p})`,
  } as React.CSSProperties;
};

export const markStyle = (t: number, at: number): React.CSSProperties => ({
  backgroundSize: `${prog(t, at, 0.9, IN_OUT) * 100}% 38%`,
});

// Characters of `text` revealed between `at` and `at + dur`
export const typed = (t: number, at: number, text: string, dur = 0.9) =>
  text.slice(0, Math.round(prog(t, at, dur, Easing.linear) * text.length));
