import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';
import { FadeText } from '../animations/FadeText';

const JUMP_DURATION = 24;
const JUMP_HEIGHT = 52;

function getJumpOffset(frame: number, jumpFrame: number): number {
  const local = frame - jumpFrame;
  if (local < 0 || local > JUMP_DURATION) return 0;
  return -Math.sin((local / JUMP_DURATION) * Math.PI) * JUMP_HEIGHT;
}

type ChecklistSlideProps = {
  label: string;
  title: string;
  titleHighlight?: string;
  items: string[];
  itemTimings?: number[];
  // No longer used for styling — kept for API compatibility.
  accentIndex?: number;
  // When set, replaces the title with a large kinetic statement in the left column.
  statement?: string;
  statementWordJumps?: Array<{ wordIndex: number; frame: number }>;
};

const FADE_FRAMES = 18;
// Frames after the last item appears before all items settle to neutral.
const SETTLE_DELAY = 40;
const SETTLE_FRAMES = 24;

const HighlightFadeText: React.FC<{ text: string; highlight: string; frame: number }> = ({ text, highlight, frame }) => {
  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const ty = interpolate(frame, [0, 18], [16, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const idx = text.indexOf(highlight);
  if (idx < 0) return <div style={{ opacity, transform: `translateY(${ty}px)` }}>{text}</div>;
  return (
    <div style={{ opacity, transform: `translateY(${ty}px)` }}>
      {text.slice(0, idx)}
      <span style={{ color: colors.lime500 }}>{highlight}</span>
      {text.slice(idx + highlight.length)}
    </div>
  );
};

export const ChecklistSlide: React.FC<ChecklistSlideProps> = ({
  label,
  title,
  titleHighlight,
  items,
  itemTimings,
  statement,
  statementWordJumps = [],
}) => {
  const frame = useCurrentFrame();

  const timings = items.map((_, i) => itemTimings?.[i] ?? i * 18);
  const lastTiming = timings[timings.length - 1] ?? 0;
  const settleStart = lastTiming + FADE_FRAMES + SETTLE_DELAY;

  // 0 = all highlighted by active logic, 1 = all settled to neutral
  const settleProgress = interpolate(frame, [settleStart, settleStart + SETTLE_FRAMES], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Which item is currently "active" (most recently revealed, not yet replaced by next)
  const activeIndex = timings.reduce((acc, t, i) => (frame >= t ? i : acc), -1);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 640,
        }}
      >
        {statement ? (
          <div
            style={{
              fontFamily: fonts.serif,
              fontSize: 80,
              fontWeight: 400,
              letterSpacing: '-0.04em',
              lineHeight: 1.15,
              color: colors.black,
            }}
          >
            {(() => {
              const wordMatches: Array<{ word: string; start: number; end: number }> = [];
              const regex = /\S+/g;
              let m: RegExpExecArray | null;
              while ((m = regex.exec(statement)) !== null) {
                wordMatches.push({ word: m[0], start: m.index, end: m.index + m[0].length });
              }
              return wordMatches.map(({ word, start }, i) => {
                const hasNewlineBefore = i > 0 && statement.slice(wordMatches[i - 1].end, start).includes('\n');
                const wordFrame = i * 4;
                const opacity = interpolate(frame, [wordFrame, wordFrame + 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const revealTy = interpolate(frame, [wordFrame, wordFrame + 15], [18, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                const jumpTy = statementWordJumps
                  .filter((j) => j.wordIndex === i)
                  .reduce((sum, j) => sum + getJumpOffset(frame, j.frame), 0);
                return (
                  <React.Fragment key={i}>
                    {hasNewlineBefore && <br />}
                    <span style={{ display: 'inline-block', opacity, transform: `translateY(${revealTy + jumpTy}px)`, marginRight: '0.25em' }}>
                      {word}
                    </span>
                  </React.Fragment>
                );
              });
            })()}
          </div>
        ) : titleHighlight ? (
          <>
            <div style={{ ...typography.title, color: colors.black }}>
              <HighlightFadeText text={title.slice(0, title.indexOf(titleHighlight))} highlight="" frame={frame} />
            </div>
            <div style={{ ...typography.label, marginTop: 20, marginBottom: 20, color: colors.lime500 }}>{label}</div>
            <div style={{ ...typography.title, color: colors.lime500 }}>
              <HighlightFadeText text={titleHighlight} highlight={titleHighlight} frame={frame} />
            </div>
          </>
        ) : (
          <>
            <div style={{ ...typography.title, color: colors.black }}>
              <FadeText text={title} />
            </div>
            <div style={{ ...typography.label, marginTop: 28 }}>{label}</div>
          </>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          right: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 920,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        {items.map((item, index) => {
          const timing = timings[index];
          const opacity = interpolate(frame, [timing, timing + FADE_FRAMES], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const tx = interpolate(frame, [timing, timing + FADE_FRAMES], [24, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const isActive = index === activeIndex && settleProgress < 1;

          // Highlight progress: 1 when active, fades to 0 as settle progresses or next item appears
          const highlightProgress = isActive ? 1 - settleProgress : 0;

          const borderColor = highlightProgress > 0
            ? lerpColor(colors.neutral600, colors.lime500, highlightProgress)
            : colors.neutral600;
          const bgColor = highlightProgress > 0
            ? lerpColor(colors.white, colors.lime200, highlightProgress)
            : colors.white;
          const numColor = highlightProgress > 0
            ? lerpColor(colors.neutral600, colors.black, highlightProgress)
            : colors.neutral600;
          const textColor = highlightProgress > 0
            ? lerpColor(colors.neutral600, colors.black, highlightProgress)
            : colors.neutral600;

          return (
            <div
              key={item}
              style={{
                display: 'grid',
                gridTemplateColumns: '58px 1fr',
                gap: 24,
                alignItems: 'start',
                opacity,
                transform: `translateX(${tx}px)`,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  border: `3px solid ${borderColor}`,
                  backgroundColor: bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: numColor,
                  fontFamily: fonts.sans,
                  fontSize: 22,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  ...typography.body,
                  color: textColor,
                  lineHeight: 1.35,
                  paddingTop: 2,
                }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

// Linear interpolate between two hex colors by t (0–1).
function lerpColor(a: string, b: string, t: number): string {
  const pa = parseHex(a);
  const pb = parseHex(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function parseHex(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
