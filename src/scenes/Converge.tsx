import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import * as Outline from '@heroicons/react/24/outline';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

// "Many inputs, one process": source chips stack up on the left as the VO lists them, each
// drawing a curve toward a target card on the right. The target stays dim until
// `convergeFrom`, when every curve turns lime, pulses travel into the card and its steps
// light up. All frames are scene-local.

export type ConvergeProps = {
  label: string;
  title: string;                       // one line per \n
  titleTimings?: number[];             // per-line fade-in frames
  titleHighlight?: string;             // substring rendered in lime once convergeFrom is reached
  sources: Array<{ text: string; tag?: string; icon?: string; dashed?: boolean; from: number }>;
  target: { label: string; steps: Array<{ text: string; icon?: string }> };
  convergeFrom: number;
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.out(Easing.cubic);
const INK = '#14180F';
const MUTED = '#5E6458';
const LINE = '#DDE3D6';

const CHIP_X = 80, CHIP_W = 640, CHIP_H = 92, CHIP_GAP = 18, CHIPS_CENTER = 620;
const TARGET_X = 1200, TARGET_W = 640, TARGET_CY = 620;

const icon = (name: string | undefined, color: string, size = 30) => {
  const I = name ? (Outline as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[name] : undefined;
  return I ? <I style={{ width: size, height: size, color, strokeWidth: 1.6 }} /> : null;
};

// Cubic bezier point for the pulse travelling along a curve.
const bez = (t: number, p0: number, p1: number, p2: number, p3: number) =>
  (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3;

export const Converge: React.FC<ConvergeProps> = ({ label, title, titleTimings, titleHighlight, sources, target, convergeFrom }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines = title.split('\n');
  const n = sources.length;
  const top = CHIPS_CENTER - (n * CHIP_H + (n - 1) * CHIP_GAP) / 2;
  const chipCY = (i: number) => top + i * (CHIP_H + CHIP_GAP) + CHIP_H / 2;
  const lit = interpolate(frame, [convergeFrom, convergeFrom + 14], [0, 1], { ...clamp, easing: ease });
  const targetIn = interpolate(frame, [4, 22], [0, 1], { ...clamp, easing: ease });

  const renderLine = (text: string) => {
    if (!titleHighlight || !text.includes(titleHighlight)) return text;
    const [a, b] = text.split(titleHighlight);
    const c = `rgb(${Math.round(0 + 102 * lit)}, ${Math.round(0 + 198 * lit)}, ${Math.round(0 + 28 * lit)})`;
    return <>{a}<span style={{ color: c }}>{titleHighlight}</span>{b}</>;
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Header */}
      <div style={{ position: 'absolute', left: 80, top: 96, right: 80 }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 24, letterSpacing: '0.14em', color: colors.neutral600,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp) }}>{label}</div>
        <div style={{ marginTop: 14, fontFamily: fonts.serif, fontSize: 64, lineHeight: 1.12, letterSpacing: '-0.04em', color: colors.black }}>
          {lines.map((l, i) => {
            const t0 = titleTimings?.[i] ?? 0;
            const o = interpolate(frame, [t0, t0 + 16], [0, 1], { ...clamp, easing: ease });
            return <div key={i} style={{ opacity: o, transform: `translateY(${(1 - o) * 12}px)` }}>{renderLine(l)}</div>;
          })}
        </div>
      </div>

      {/* Curves */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {sources.map((s, i) => {
          const x0 = CHIP_X + CHIP_W, y0 = chipCY(i), x3 = TARGET_X, y3 = TARGET_CY;
          const cx = (x0 + x3) / 2;
          const d = `M ${x0} ${y0} C ${cx} ${y0}, ${cx} ${y3}, ${x3} ${y3}`;
          const draw = interpolate(frame, [s.from + 6, s.from + 30], [0, 1], { ...clamp, easing: ease });
          const len = 700;
          const stroke = lit > 0 ? `rgb(${Math.round(221 - 119 * lit)}, ${Math.round(227 - 29 * lit)}, ${Math.round(214 - 186 * lit)})` : LINE;
          const pt = interpolate(frame, [convergeFrom + i * 3, convergeFrom + i * 3 + 26], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={stroke} strokeWidth={3 + lit} strokeLinecap="round"
                strokeDasharray={s.dashed ? '10 10' : `${len}`} strokeDashoffset={s.dashed ? 0 : len * (1 - draw)}
                opacity={s.dashed ? draw : 1} />
              {pt > 0 && pt < 1 && (
                <circle cx={bez(pt, x0, cx, cx, x3)} cy={bez(pt, y0, y0, y3, y3)} r={9} fill={colors.lime500}
                  style={{ filter: 'drop-shadow(0 0 8px rgba(102,198,28,0.8))' }} />
              )}
            </g>
          );
        })}
      </svg>

      {/* Source chips */}
      {sources.map((s, i) => {
        const p = spring({ frame: frame - s.from, fps, config: { damping: 16, stiffness: 140 } });
        return (
          <div key={i} style={{ position: 'absolute', left: CHIP_X, top: chipCY(i) - CHIP_H / 2, width: CHIP_W, height: CHIP_H,
            display: 'flex', alignItems: 'center', gap: 20, padding: '0 26px', borderRadius: 18, backgroundColor: colors.white,
            border: `2px ${s.dashed ? 'dashed' : 'solid'} ${s.tag ? colors.lime500 : LINE}`,
            boxShadow: s.dashed ? 'none' : '0 10px 26px rgba(40, 60, 20, 0.08)',
            opacity: Math.min(1, p * 1.3), transform: `translateX(${(1 - p) * -40}px)` }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center',
              justifyContent: 'center', backgroundColor: s.tag ? colors.lime200 : '#F2F5EE' }}>
              {icon(s.icon, s.tag ? colors.titleGreen : MUTED)}
            </div>
            <span style={{ fontFamily: fonts.sans, fontSize: 31, color: INK, lineHeight: 1.2, flex: 1 }}>{s.text}</span>
            {s.tag && (
              <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 18, letterSpacing: '0.12em', color: colors.titleGreen,
                backgroundColor: colors.lime200, borderRadius: 999, padding: '6px 12px', whiteSpace: 'nowrap' }}>{s.tag}</span>
            )}
          </div>
        );
      })}

      {/* Target card */}
      {(() => {
        const rowH = 104, headH = 96;
        const h = headH + target.steps.length * rowH + 30;
        return (
          <div style={{ position: 'absolute', left: TARGET_X, top: TARGET_CY - h / 2, width: TARGET_W, height: h, borderRadius: 24,
            backgroundColor: lit > 0 ? INK : '#F4F6F1', border: `2px solid ${lit > 0 ? INK : LINE}`,
            boxShadow: `0 24px 60px rgba(40, 60, 20, ${0.08 + 0.14 * lit})`, padding: '30px 40px',
            opacity: targetIn * (0.55 + 0.45 * lit), transform: `scale(${0.98 + 0.02 * lit})` }}>
            <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 22, letterSpacing: '0.14em', height: headH - 30,
              color: lit > 0.5 ? colors.lime500 : colors.neutral600 }}>{target.label}</div>
            {target.steps.map((st, i) => {
              const on = interpolate(frame, [convergeFrom + 10 + i * 6, convergeFrom + 24 + i * 6], [0, 1], clamp);
              const fg = on > 0.5 ? colors.white : MUTED;
              return (
                <div key={i} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 20, height: rowH }}>
                  {i < target.steps.length - 1 && (
                    // connector from this step's icon down to the next one
                    <div style={{ position: 'absolute', left: 29, top: (rowH + 60) / 2, width: 2, height: rowH - 60,
                      backgroundColor: on > 0.5 ? colors.lime500 : LINE }} />
                  )}
                  <div style={{ width: 60, height: 60, borderRadius: 16, flexShrink: 0, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', backgroundColor: on > 0.5 ? colors.lime500 : '#E6EBE0' }}>
                    {icon(st.icon, on > 0.5 ? INK : MUTED, 32)}
                  </div>
                  <span style={{ fontFamily: fonts.serif, fontSize: 38, letterSpacing: '-0.03em', color: fg, lineHeight: 1.15 }}>{st.text}</span>
                </div>
              );
            })}
          </div>
        );
      })()}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
