import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { LogoFooter } from '../../Logo';
import { colors, fonts, layout as canvas } from '../../tokens';

// A central "Skill" package card with labelled chips that snap in from both
// sides, each wired to the card by a connector. Optionally, at assembleFrame
// every chip glides into the card ("packaged") and the card pops with a check.
type Props = {
  label?: string;
  title: string;
  titleHighlight?: string;
  centerTitle?: string;
  centerSub?: string;
  chips: string[];
  // Optional short badge per chip (e.g. 'C', 'O', '+'). Matches chips[].
  chipKickers?: string[];
  // Scene-local frame each chip appears. Matches chips[]; defaults stagger.
  chipTimings?: number[];
  // Chips with index >= accentFrom get a lime-filled badge instead of outline.
  accentFrom?: number;
  assembleFrame?: number;
  assembledSub?: string;
};

const CHARCOAL = '#2B2B2B';
const CARD_W = 400;
const CARD_H = 400;
const CARD_X = (canvas.width - CARD_W) / 2;
const CARD_Y = 400;
const CHIP_W = 540;
const CHIP_H = 112;
const M = canvas.safeMargin;

export const SkillPackageDiagram: React.FC<Props> = ({
  label,
  title,
  titleHighlight,
  centerTitle = 'Skill',
  centerSub,
  chips,
  chipKickers,
  chipTimings,
  accentFrom,
  assembleFrame,
  assembledSub,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const cardIn = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 120 } });

  const asm = assembleFrame != null
    ? spring({ frame: frame - assembleFrame, fps, config: { damping: 18, stiffness: 90 } })
    : 0;
  const pop = assembleFrame != null
    ? interpolate(frame - assembleFrame, [10, 20, 34], [1, 1.07, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;
  const assembled = assembleFrame != null && frame >= assembleFrame + 14;

  const leftCount = Math.ceil(chips.length / 2);
  const rightCount = chips.length - leftCount;
  const rowsY = (n: number) => {
    if (n <= 1) return [CARD_Y + CARD_H / 2];
    const top = CARD_Y + 50;
    const bottom = CARD_Y + CARD_H - 50;
    return Array.from({ length: n }, (_, i) => top + ((bottom - top) * i) / (n - 1));
  };
  const leftYs = rowsY(leftCount);
  const rightYs = rowsY(rightCount);

  const renderTitle = () => {
    if (!titleHighlight || !title.includes(titleHighlight)) return title;
    const [a, b] = title.split(titleHighlight);
    return (
      <>
        {a}
        <span style={{ color: colors.lime500 }}>{titleHighlight}</span>
        {b}
      </>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Heading */}
      <div style={{ position: 'absolute', left: M, top: M + 10, right: M, opacity: headIn }}>
        {label ? (
          <div style={{ fontFamily: fonts.sans, fontSize: 24, fontWeight: 600, letterSpacing: '0.12em', color: colors.neutral600, textTransform: 'uppercase', marginBottom: 18 }}>
            {label}
          </div>
        ) : null}
        <div style={{ fontFamily: fonts.serif, fontSize: 68, letterSpacing: '-0.03em', lineHeight: 1.12, color: CHARCOAL, maxWidth: 1500 }}>
          {renderTitle()}
        </div>
      </div>

      {/* Connectors */}
      <svg width={canvas.width} height={canvas.height} style={{ position: 'absolute', inset: 0 }}>
        {chips.map((_, i) => {
          const isLeft = i < leftCount;
          const y = isLeft ? leftYs[i] : rightYs[i - leftCount];
          const t0 = chipTimings?.[i] ?? 20 + i * 12;
          const draw = interpolate(frame, [t0 + 6, t0 + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          const x1 = isLeft ? M + CHIP_W : CARD_X + CARD_W;
          const x2 = isLeft ? CARD_X : canvas.width - M - CHIP_W;
          const from = isLeft ? x1 : x2;
          const to = isLeft ? x1 + (x2 - x1) * draw : x2 - (x2 - x1) * draw;
          return (
            <g key={i} opacity={(1 - asm) * (draw > 0 ? 1 : 0)}>
              <line x1={from} y1={y} x2={to} y2={y} stroke={colors.lime500} strokeWidth={4} strokeDasharray="10 8" />
              <circle cx={isLeft ? x2 : x1} cy={y} r={7} fill={colors.lime500} opacity={draw >= 1 ? 1 : 0} />
            </g>
          );
        })}
      </svg>

      {/* Center card */}
      <div
        style={{
          position: 'absolute',
          left: CARD_X,
          top: CARD_Y,
          width: CARD_W,
          height: CARD_H,
          borderRadius: 24,
          background: colors.white,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: '0 24px 60px rgba(0,0,0,0.10)',
          overflow: 'hidden',
          transform: `scale(${(0.6 + 0.4 * cardIn) * pop})`,
          opacity: cardIn,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: 22, background: colors.lime500 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
          {/* Icon: stacked pages, or a check once assembled */}
          <svg width="120" height="120" viewBox="0 0 120 120">
            {assembled ? (
              <>
                <circle cx="60" cy="60" r="54" fill={colors.lime500} />
                <path d="M34 62 L52 80 L88 42" fill="none" stroke={colors.white} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <>
                <rect x="22" y="22" width="66" height="84" rx="6" fill={colors.white} stroke={CHARCOAL} strokeWidth="4" />
                <rect x="34" y="12" width="66" height="84" rx="6" fill={colors.white} stroke={CHARCOAL} strokeWidth="4" />
                <rect x="46" y="32" width="40" height="7" fill={colors.lime500} />
                <rect x="46" y="50" width="40" height="5" fill={CHARCOAL} />
                <rect x="46" y="64" width="30" height="5" fill={CHARCOAL} />
                <rect x="46" y="78" width="36" height="5" fill={CHARCOAL} />
              </>
            )}
          </svg>
          <div style={{ fontFamily: fonts.serif, fontSize: 64, letterSpacing: '-0.03em', color: CHARCOAL, lineHeight: 1 }}>
            {centerTitle}
          </div>
          {(assembled ? assembledSub ?? centerSub : centerSub) ? (
            <div style={{ fontFamily: fonts.sans, fontSize: 26, color: colors.neutral600, textAlign: 'center', padding: '0 30px', lineHeight: 1.3 }}>
              {assembled ? assembledSub ?? centerSub : centerSub}
            </div>
          ) : null}
        </div>
      </div>

      {/* Chips */}
      {chips.map((text, i) => {
        const isLeft = i < leftCount;
        const y = isLeft ? leftYs[i] : rightYs[i - leftCount];
        const t0 = chipTimings?.[i] ?? 20 + i * 12;
        const s = spring({ frame: frame - t0, fps, config: { damping: 13, stiffness: 140 } });
        const left = isLeft ? M : canvas.width - M - CHIP_W;
        const chipCX = left + CHIP_W / 2;
        const dxIn = (isLeft ? -80 : 80) * (1 - s);
        const dxAsm = (canvas.width / 2 - chipCX) * asm;
        const dyAsm = (CARD_Y + CARD_H / 2 - y) * asm;
        const scale = 1 - 0.7 * asm;
        const opacity = Math.min(s, 1) * interpolate(asm, [0.6, 0.95], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const kicker = chipKickers?.[i];
        const accent = accentFrom != null && i >= accentFrom;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left,
              top: y - CHIP_H / 2,
              width: CHIP_W,
              height: CHIP_H,
              borderRadius: 18,
              background: colors.white,
              border: `2px solid ${colors.neutral200}`,
              boxShadow: '0 10px 30px rgba(0,0,0,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              padding: '0 28px',
              boxSizing: 'border-box',
              opacity,
              transform: `translate(${dxIn + dxAsm}px, ${dyAsm}px) scale(${scale})`,
            }}
          >
            {kicker ? (
              <div
                style={{
                  width: 62,
                  height: 62,
                  flexShrink: 0,
                  borderRadius: 12,
                  background: accent ? colors.lime500 : colors.white,
                  border: `3px solid ${accent ? colors.lime500 : CHARCOAL}`,
                  color: accent ? colors.white : CHARCOAL,
                  fontFamily: fonts.serif,
                  fontSize: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kicker}
              </div>
            ) : (
              <div style={{ width: 14, height: 14, borderRadius: 7, background: colors.lime500, flexShrink: 0 }} />
            )}
            <div style={{ fontFamily: fonts.sans, fontSize: 36, fontWeight: 500, color: CHARCOAL, lineHeight: 1.15 }}>{text}</div>
          </div>
        );
      })}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
