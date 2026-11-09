import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { LogoFooter } from '../../Logo';
import { colors, fonts, layout as canvas } from '../../tokens';

// One Skill card on the left, radiating to a team of six on an arc. At goodFrame a lime
// pulse travels down every line and each teammate gets a check ("scales a good process").
// At weakFrame the Skill gets a flaw tag and a red pulse turns every check into a cross
// ("repeats a weak one"): sharing multiplies whatever is inside the Skill.
type Props = {
  label?: string;
  title: string;
  teamFrame?: number;
  goodFrame?: number;
  weakFrame?: number;
  goodCaption?: string;
  weakCaption?: string;
  flawLabel?: string;
};

const CHARCOAL = '#2B2B2B';
const RED = '#E5484D';
const M = canvas.safeMargin;
const CARD = { x: 160, y: 420, w: 360, h: 330 };
const ORIGIN = { x: CARD.x + CARD.w, y: CARD.y + CARD.h / 2 };
const AV = 128; // avatar diameter
const ANGLES = [-58, -35, -12, 12, 35, 58];
const team = ANGLES.map((a) => {
  const r = (a * Math.PI) / 180;
  return { x: ORIGIN.x + 1160 * Math.cos(r), y: ORIGIN.y + 330 * Math.sin(r) };
});

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const mix = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [r1, g1, b1] = p(a);
  const [r2, g2, b2] = p(b);
  const c = (x: number, y: number) => Math.round(x + (y - x) * t).toString(16).padStart(2, '0');
  return `#${c(r1, r2)}${c(g1, g2)}${c(b1, b2)}`;
};

export const SharedSkillDiagram: React.FC<Props> = ({
  label,
  title,
  teamFrame = 40,
  goodFrame = 150,
  weakFrame = 230,
  goodCaption = 'Scales a good process',
  weakCaption = 'Or repeats a weak one',
  flawLabel = 'Unclear step',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headIn = interpolate(frame, [0, 18], [0, 1], clamp);
  const cardIn = spring({ frame: frame - 4, fps, config: { damping: 14, stiffness: 120 } });
  const flawIn = spring({ frame: frame - weakFrame, fps, config: { damping: 10, stiffness: 160 } });
  const shake = frame >= weakFrame && frame < weakFrame + 14 ? Math.sin((frame - weakFrame) * 2.4) * 6 * (1 - (frame - weakFrame) / 14) : 0;
  const barColor = mix(colors.lime500, RED, interpolate(frame, [weakFrame, weakFrame + 8], [0, 1], clamp));

  const goodCapIn = interpolate(frame, [goodFrame, goodFrame + 15], [0, 1], clamp);
  const weakCapIn = interpolate(frame, [weakFrame, weakFrame + 15], [0, 1], clamp);

  const PULSE = 14;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Heading */}
      <div style={{ position: 'absolute', left: M, top: M + 10, right: M, opacity: headIn }}>
        {label ? (
          <div style={{ fontFamily: fonts.sans, fontSize: 24, fontWeight: 600, letterSpacing: '0.12em', color: colors.neutral600, textTransform: 'uppercase', marginBottom: 18 }}>
            {label}
          </div>
        ) : null}
        <div style={{ fontFamily: fonts.serif, fontSize: 64, letterSpacing: '-0.03em', lineHeight: 1.12, color: CHARCOAL, maxWidth: 1100 }}>
          {title}
        </div>
      </div>

      {/* Lines + travelling pulses */}
      <svg width={canvas.width} height={canvas.height} style={{ position: 'absolute', inset: 0 }}>
        {team.map((p, i) => {
          const t0 = teamFrame + i * 4;
          const draw = interpolate(frame, [t0, t0 + 16], [0, 1], clamp);
          const dx = p.x - ORIGIN.x;
          const dy = p.y - ORIGIN.y;
          const len = Math.hypot(dx, dy);
          const ex = p.x - (dx / len) * (AV / 2 + 6);
          const ey = p.y - (dy / len) * (AV / 2 + 6);
          const g0 = goodFrame + 6 + i * 5;
          const w0 = weakFrame + 4 + i * 4;
          const gT = interpolate(frame, [g0, g0 + PULSE], [0, 1], clamp);
          const wT = interpolate(frame, [w0, w0 + PULSE], [0, 1], clamp);
          const seg = (t: number, color: string) =>
            t > 0 ? (
              <line x1={ORIGIN.x} y1={ORIGIN.y} x2={ORIGIN.x + (ex - ORIGIN.x) * t} y2={ORIGIN.y + (ey - ORIGIN.y) * t} stroke={color} strokeWidth={4} strokeLinecap="round" />
            ) : null;
          const pulse = (t: number, color: string) =>
            t > 0 && t < 1 ? (
              <circle cx={ORIGIN.x + (ex - ORIGIN.x) * t} cy={ORIGIN.y + (ey - ORIGIN.y) * t} r={11} fill={color} />
            ) : null;
          return (
            <g key={i}>
              <line x1={ORIGIN.x} y1={ORIGIN.y} x2={ORIGIN.x + (ex - ORIGIN.x) * draw} y2={ORIGIN.y + (ey - ORIGIN.y) * draw} stroke={colors.neutral200} strokeWidth={4} strokeLinecap="round" />
              {seg(gT, colors.lime500)}
              {seg(wT, RED)}
              {pulse(gT, colors.lime500)}
              {pulse(wT, RED)}
            </g>
          );
        })}
      </svg>

      {/* Skill card */}
      <div
        style={{
          position: 'absolute',
          left: CARD.x,
          top: CARD.y,
          width: CARD.w,
          height: CARD.h,
          borderRadius: 24,
          background: colors.white,
          border: `3px solid ${CHARCOAL}`,
          boxShadow: '0 24px 60px rgba(0,0,0,0.10)',
          overflow: 'hidden',
          transform: `translateX(${shake}px) scale(${0.6 + 0.4 * cardIn})`,
          opacity: cardIn,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ height: 22, background: barColor }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <svg width="110" height="110" viewBox="0 0 120 120">
            <rect x="22" y="22" width="66" height="84" rx="6" fill={colors.white} stroke={CHARCOAL} strokeWidth="4" />
            <rect x="34" y="12" width="66" height="84" rx="6" fill={colors.white} stroke={CHARCOAL} strokeWidth="4" />
            <rect x="46" y="32" width="40" height="7" fill={barColor} />
            <rect x="46" y="50" width="40" height="5" fill={CHARCOAL} />
            <rect x="46" y="64" width="30" height="5" fill={frame >= weakFrame ? RED : CHARCOAL} />
            <rect x="46" y="78" width="36" height="5" fill={CHARCOAL} />
          </svg>
          <div style={{ fontFamily: fonts.serif, fontSize: 60, letterSpacing: '-0.03em', color: CHARCOAL, lineHeight: 1 }}>Skill</div>
        </div>
      </div>

      {/* Flaw tag */}
      <div
        style={{
          position: 'absolute',
          left: CARD.x + CARD.w - 150,
          top: CARD.y - 26,
          padding: '10px 18px',
          borderRadius: 999,
          background: RED,
          color: colors.white,
          fontFamily: fonts.sans,
          fontSize: 24,
          fontWeight: 600,
          opacity: Math.min(flawIn, 1),
          transform: `scale(${flawIn}) rotate(-4deg)`,
          whiteSpace: 'nowrap',
        }}
      >
        {flawLabel}
      </div>

      {/* Team */}
      {team.map((p, i) => {
        const t0 = teamFrame + i * 4;
        const s = spring({ frame: frame - t0, fps, config: { damping: 12, stiffness: 150 } });
        const goodAt = goodFrame + 6 + i * 5 + PULSE;
        const weakAt = weakFrame + 4 + i * 4 + PULSE;
        const isWeak = frame >= weakAt;
        const badgeS = isWeak
          ? spring({ frame: frame - weakAt, fps, config: { damping: 10, stiffness: 180 } })
          : spring({ frame: frame - goodAt, fps, config: { damping: 10, stiffness: 180 } });
        const showBadge = frame >= goodAt;
        const ring = isWeak ? RED : showBadge ? colors.lime500 : colors.neutral200;
        return (
          <div key={i} style={{ position: 'absolute', left: p.x - AV / 2, top: p.y - AV / 2, width: AV, height: AV, transform: `scale(${s})` }}>
            <div style={{ width: AV, height: AV, borderRadius: '50%', background: colors.white, border: `4px solid ${ring}`, boxSizing: 'border-box', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
              <svg width={AV - 8} height={AV - 8} viewBox="0 0 120 120">
                <circle cx="60" cy="46" r="20" fill={CHARCOAL} />
                <path d="M22 116 C22 86 40 74 60 74 C80 74 98 86 98 116 Z" fill={CHARCOAL} />
              </svg>
            </div>
            {showBadge ? (
              <div
                style={{
                  position: 'absolute',
                  right: -8,
                  bottom: -4,
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: isWeak ? RED : colors.lime500,
                  border: `4px solid ${colors.white}`,
                  transform: `scale(${badgeS})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="26" height="26" viewBox="0 0 26 26">
                  {isWeak ? (
                    <path d="M6 6 L20 20 M20 6 L6 20" stroke={colors.white} strokeWidth="4.5" strokeLinecap="round" />
                  ) : (
                    <path d="M5 14 L11 20 L21 7" fill="none" stroke={colors.white} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                  )}
                </svg>
              </div>
            ) : null}
          </div>
        );
      })}

      {/* Outcome captions */}
      <div style={{ position: 'absolute', left: CARD.x, top: CARD.y + CARD.h + 40, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { text: goodCaption, color: colors.lime500, cross: false, o: goodCapIn * (frame >= weakFrame ? 0.45 : 1) },
          { text: weakCaption, color: RED, cross: true, o: weakCapIn },
        ].map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: c.o, transform: `translateY(${(1 - Math.min(c.o * 2, 1)) * 10}px)` }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 26 26">
                {c.cross ? (
                  <path d="M6 6 L20 20 M20 6 L6 20" stroke={colors.white} strokeWidth="4.5" strokeLinecap="round" />
                ) : (
                  <path d="M5 14 L11 20 L21 7" fill="none" stroke={colors.white} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                )}
              </svg>
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 34, fontWeight: 500, color: CHARCOAL, whiteSpace: 'nowrap' }}>{c.text}</div>
          </div>
        ))}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
