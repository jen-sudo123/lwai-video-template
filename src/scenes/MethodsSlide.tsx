import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

// Slide design adapted from lead_with_ai_prompting_slide.jsx.
// Original canvas: 1280×720. Scaled ×1.5 to fill the 1920×1080 Remotion canvas.
//
// The slide is ONE continuous scene. It fades in once on entry.
// `highlights` encodes a schedule of highlight changes as frame offsets:
//   { from: 0,   value: null } → all four cards equal
//   { from: 270, value: 1 }   → card 1 lit, others dimmed (12-frame crossfade)
// This avoids re-animating the whole scene every time a technique is mentioned.

export type MethodsSlideProps = {
  highlights?: Array<{ from: number; value: 1 | 2 | 3 | 4 | null }>;
};

const LIME = colors.lime500;
const INK = '#444444';
const DIM = 0.18;
const CROSSFADE_FRAMES = 12;

const methods = [
  {
    n: '01',
    title: 'Iterative Prompting',
    body: 'Treat the first output as a starting point.\nUse specific feedback to close the gap.',
    icon: '↻',
  },
  {
    n: '02',
    title: 'Asking for Options',
    body: 'Request a range of responses so your\njudgment has something concrete to react to.',
    icon: '⋯',
  },
  {
    n: '03',
    title: 'Chain of Thought',
    body: 'Ask the model to reason step by step\nbefore it answers, so assumptions surface early.',
    icon: '→',
  },
  {
    n: '04',
    title: 'Few-Shot Examples',
    body: 'Show the model what good looks like\nin your context instead of only describing it.',
    icon: '▣',
  },
];

function targetOpacity(cardNum: 1 | 2 | 3 | 4, highlight: 1 | 2 | 3 | 4 | null): number {
  return highlight === null || highlight === cardNum ? 1 : DIM;
}

export const MethodsSlide: React.FC<MethodsSlideProps> = ({ highlights = [] }) => {
  const frame = useCurrentFrame();

  // Slide fades in once on first entry — never resets mid-scene.
  const slideOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Sort entries so we can scan forward.
  const sorted = [...highlights].sort((a, b) => a.from - b.from);

  // Active entry: last one whose `from` ≤ current frame.
  const activeIdx = [...sorted].map((h, i) => i).reverse().find(i => frame >= sorted[i].from) ?? -1;
  const activeEntry = activeIdx >= 0 ? sorted[activeIdx] : null;
  const prevEntry = activeIdx > 0 ? sorted[activeIdx - 1] : null;

  const activeHighlight = activeEntry?.value ?? null;
  const prevHighlight = prevEntry?.value ?? null;
  const transitionStart = activeEntry?.from ?? 0;

  // Cross-fade progress (0→1) over CROSSFADE_FRAMES frames from the transition point.
  const crossfadeProgress = interpolate(
    frame,
    [transitionStart, transitionStart + CROSSFADE_FRAMES],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  function cardOpacity(num: 1 | 2 | 3 | 4): number {
    // On the very first state (no previous transition), just return the target.
    if (transitionStart === 0 || prevEntry === null) {
      return targetOpacity(num, activeHighlight);
    }
    const from = targetOpacity(num, prevHighlight);
    const to = targetOpacity(num, activeHighlight);
    return interpolate(crossfadeProgress, [0, 1], [from, to]);
  }

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, opacity: slideOpacity }}>

      {/* Decorative: vertical lime bar on the left */}
      <div style={{
        position: 'absolute',
        left: 84,
        top: 72,
        height: 894,
        width: 3,
        background: LIME,
      }} />

      {/* Decorative: lime ring, top-right */}
      <div style={{
        position: 'absolute',
        right: 120,
        top: 96,
        width: 168,
        height: 168,
        borderRadius: '50%',
        border: `3px solid ${LIME}`,
      }} />

      {/* Decorative: lime filled circle, top-right (smaller, offset) */}
      <div style={{
        position: 'absolute',
        right: 168,
        top: 144,
        width: 72,
        height: 72,
        borderRadius: '50%',
        background: LIME,
      }} />

      {/* Decorative: lime bar, bottom-right */}
      <div style={{
        position: 'absolute',
        right: 120,
        bottom: 120,
        width: 240,
        height: 12,
        background: LIME,
      }} />

      {/* Header */}
      <div style={{
        position: 'absolute',
        left: 168,
        top: 84,
        width: 1140,
      }}>
        <p style={{
          fontFamily: fonts.sans,
          fontSize: 23,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: INK,
          margin: 0,
          marginBottom: 30,
        }}>
          Better results for complex, high-stakes work
        </p>
        <h1 style={{
          fontFamily: fonts.serif,
          fontSize: 93,
          lineHeight: 0.98,
          fontWeight: 400,
          color: INK,
          margin: 0,
        }}>
          Four prompting moves that improve judgment
        </h1>
      </div>

      {/* 2×2 technique grid */}
      <div style={{
        position: 'absolute',
        left: 168,
        top: 465,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 96,
        rowGap: 54,
        width: 1455,
      }}>
        {methods.map((item, index) => {
          const num = (index + 1) as 1 | 2 | 3 | 4;
          const opacity = cardOpacity(num);

          return (
            <div
              key={item.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '111px 1fr',
                gap: 30,
                alignItems: 'flex-start',
                opacity,
              }}
            >
              {/* Icon box */}
              <div style={{ position: 'relative', width: 111, height: 111 }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  border: `3px solid ${INK}`,
                }} />
                {/* Number badge */}
                <div style={{
                  position: 'absolute',
                  right: -12,
                  bottom: -12,
                  width: 48,
                  height: 48,
                  background: LIME,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.sans,
                  fontSize: 23,
                  fontWeight: 600,
                  color: INK,
                }}>
                  {item.n}
                </div>
                {/* Icon glyph */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: fonts.sans,
                  fontSize: 42,
                  color: INK,
                }}>
                  {item.icon}
                </div>
              </div>

              {/* Title + body */}
              <div>
                <h2 style={{
                  fontFamily: fonts.serif,
                  fontSize: 42,
                  lineHeight: 1.1,
                  fontWeight: 400,
                  color: INK,
                  margin: 0,
                  marginBottom: 12,
                }}>
                  {item.title}
                </h2>
                <p style={{
                  fontFamily: fonts.sans,
                  fontSize: 27,
                  lineHeight: 1.42,
                  color: INK,
                  maxWidth: 540,
                  margin: 0,
                  whiteSpace: 'pre-line',
                }}>
                  {item.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
