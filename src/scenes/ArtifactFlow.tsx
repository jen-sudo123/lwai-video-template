import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';
import { ArtifactKind, ArtifactTile } from './artifacts/ArtifactGlyph';

// Two modes of the same picture:
//  'tax'    — work artifacts get flattened into a block of plain text by you
//             (the transcriber), then stamped "TRANSLATION TAX".
//  'direct' — artifacts connect straight into the AI, no transcription step.
type Props = {
  mode: 'tax' | 'direct';
  label?: string;
  // Title lines that crossfade over time: [{ from, text }]. First entry may be from 0.
  titles?: Array<{ from: number; text: string; highlight?: string }>;
  items: Array<{ kind: ArtifactKind; label: string }>;
  itemTimings?: number[];
  // tax: frame the tiles collapse into plain text
  convertFrame?: number;
  // tax: frame the TRANSLATION TAX stamp lands
  stampFrame?: number;
  stampText?: string;
  // direct: frame the AI box appears, and the "natively" badge
  aiFrame?: number;
  badgeFrame?: number;
  badgeText?: string;
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const TILE_W = 240;
const TILE_H = TILE_W * 0.82;
const GAP = 40;
const ROW_Y = 300;

const TEXT_BLOCK = { x: 510, y: 600, w: 900, h: 300 };
const AI_BOX = { x: 660, y: 660, w: 600, h: 200 };

const Title: React.FC<{ text: string; highlight?: string; opacity: number; y: number }> = ({ text, highlight, opacity, y }) => {
  let content: React.ReactNode = text;
  if (highlight && text.includes(highlight)) {
    const [a, b] = text.split(highlight);
    content = (
      <>
        {a}
        <span style={{ color: colors.lime500 }}>{highlight}</span>
        {b}
      </>
    );
  }
  return (
    <div
      style={{
        position: 'absolute',
        left: layout.safeMargin,
        right: layout.safeMargin,
        top: 130,
        textAlign: 'center',
        ...typography.title,
        fontSize: 64,
        color: colors.black,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {content}
    </div>
  );
};

export const ArtifactFlow: React.FC<Props> = ({
  mode,
  label,
  titles = [],
  items,
  itemTimings = [],
  convertFrame = 9999,
  stampFrame = 9999,
  stampText = 'TRANSLATION TAX',
  aiFrame = 0,
  badgeFrame = 9999,
  badgeText = 'Shared natively',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const n = items.length;
  const rowW = n * TILE_W + (n - 1) * GAP;
  const rowX = (layout.width - rowW) / 2;
  const tileX = (i: number) => rowX + i * (TILE_W + GAP);

  const labelOpacity = interpolate(frame, [0, 15], [0, 1], clamp);

  // Title crossfades
  const titleNodes = titles.map((t, i) => {
    const next = titles[i + 1];
    const fadeIn = interpolate(frame, [t.from, t.from + 15], [0, 1], clamp);
    const fadeOut = next ? interpolate(frame, [next.from - 8, next.from + 4], [1, 0], clamp) : 1;
    const y = interpolate(frame, [t.from, t.from + 18], [16, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
    return <Title key={i} text={t.text} highlight={t.highlight} opacity={fadeIn * fadeOut} y={y} />;
  });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {label && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: 80,
            textAlign: 'center',
            ...typography.label,
            opacity: labelOpacity,
          }}
        >
          {label}
        </div>
      )}
      {titleNodes}

      {/* Connector lines (direct mode) */}
      {mode === 'direct' && (
        <svg width={layout.width} height={layout.height} style={{ position: 'absolute', inset: 0 }}>
          {items.map((_, i) => {
            const t = (itemTimings[i] ?? 0) + 8;
            const draw = interpolate(frame, [Math.max(t, aiFrame + 8), Math.max(t, aiFrame + 8) + 16], [0, 1], clamp);
            const x1 = tileX(i) + TILE_W / 2;
            const y1 = ROW_Y + TILE_H + 8;
            const x2 = AI_BOX.x + AI_BOX.w / 2 + (i - (n - 1) / 2) * 70;
            const y2 = AI_BOX.y - 4;
            const len = Math.hypot(x2 - x1, y2 - y1);
            if (draw <= 0) return null;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={colors.lime500}
                strokeWidth={4}
                strokeLinecap="round"
                strokeDasharray={len}
                strokeDashoffset={len * (1 - draw)}
              />
            );
          })}
        </svg>
      )}

      {/* Tiles */}
      {items.map((it, i) => {
        const t = itemTimings[i] ?? 0;
        const pop = spring({ frame: frame - t, fps, config: { damping: 12, stiffness: 160, mass: 0.7 } });
        const appear = interpolate(frame - t, [0, 8], [0, 1], clamp);
        const scale = interpolate(pop, [0, 1], [0.6, 1]);
        const ghost = mode === 'tax' ? interpolate(frame, [convertFrame, convertFrame + 20], [1, 0.25], clamp) : 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: tileX(i),
              top: ROW_Y,
              opacity: appear * ghost,
              transform: `scale(${scale})`,
            }}
          >
            <ArtifactTile kind={it.kind} label={it.label} width={TILE_W} />
          </div>
        );
      })}

      {/* TAX mode: flying copies collapse into plain text */}
      {mode === 'tax' &&
        items.map((it, i) => {
          const start = convertFrame + i * 5;
          const p = interpolate(frame, [start, start + 26], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
          if (p <= 0 || p >= 1) return null;
          const x = interpolate(p, [0, 1], [tileX(i), TEXT_BLOCK.x + TEXT_BLOCK.w / 2 - TILE_W / 2]);
          const y = interpolate(p, [0, 1], [ROW_Y, TEXT_BLOCK.y + 40]);
          const s = interpolate(p, [0, 1], [1, 0.25]);
          const o = interpolate(p, [0, 0.7, 1], [1, 0.9, 0]);
          return (
            <div key={`fly-${i}`} style={{ position: 'absolute', left: x, top: y, opacity: o, transform: `scale(${s})` }}>
              <ArtifactTile kind={it.kind} label={it.label} width={TILE_W} />
            </div>
          );
        })}

      {mode === 'tax' && (
        <div
          style={{
            position: 'absolute',
            left: TEXT_BLOCK.x,
            top: TEXT_BLOCK.y,
            width: TEXT_BLOCK.w,
            height: TEXT_BLOCK.h,
            borderRadius: 20,
            border: '2px solid rgba(0,0,0,0.12)',
            background: '#FAFAFA',
            padding: '36px 48px',
            boxSizing: 'border-box',
            opacity: interpolate(frame, [convertFrame + 6, convertFrame + 20], [0, 1], clamp),
          }}
        >
          <div style={{ ...typography.label, fontSize: 20, marginBottom: 26 }}>Plain text, typed by you</div>
          {[0.92, 0.78, 0.86, 0.64, 0.8, 0.5].map((w, li) => {
            const lt = convertFrame + 20 + li * 7;
            const lw = interpolate(frame, [lt, lt + 14], [0, w], clamp);
            return (
              <div
                key={li}
                style={{ height: 14, width: `${lw * 100}%`, borderRadius: 7, background: '#D6D6D6', marginBottom: 20 }}
              />
            );
          })}
        </div>
      )}

      {mode === 'tax' && frame >= stampFrame && (() => {
        const sp = spring({ frame: frame - stampFrame, fps, config: { damping: 11, stiffness: 220, mass: 0.6 } });
        const sc = interpolate(sp, [0, 1], [1.8, 1]);
        const op = interpolate(frame - stampFrame, [0, 5], [0, 1], clamp);
        return (
          <div
            style={{
              position: 'absolute',
              left: TEXT_BLOCK.x + TEXT_BLOCK.w / 2,
              top: TEXT_BLOCK.y + TEXT_BLOCK.h / 2,
              transform: `translate(-50%, -50%) rotate(-7deg) scale(${sc})`,
              opacity: op,
              border: '8px solid #C8321E',
              color: '#C8321E',
              borderRadius: 14,
              padding: '14px 40px',
              fontFamily: fonts.sans,
              fontWeight: 800,
              fontSize: 72,
              letterSpacing: '0.08em',
              background: 'rgba(255,255,255,0.88)',
              whiteSpace: 'nowrap',
            }}
          >
            {stampText}
          </div>
        );
      })()}

      {/* DIRECT mode: AI box + badge */}
      {mode === 'direct' && (() => {
        const sp = spring({ frame: frame - aiFrame, fps, config: { damping: 18, stiffness: 120 } });
        const op = interpolate(frame - aiFrame, [0, 12], [0, 1], clamp);
        const badgeSp = spring({ frame: frame - badgeFrame, fps, config: { damping: 10, stiffness: 200, mass: 0.6 } });
        const badgeOp = interpolate(frame - badgeFrame, [0, 6], [0, 1], clamp);
        return (
          <>
            <div
              style={{
                position: 'absolute',
                left: AI_BOX.x,
                top: AI_BOX.y,
                width: AI_BOX.w,
                height: AI_BOX.h,
                borderRadius: 24,
                background: '#0D0D0D',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 28,
                opacity: op,
                transform: `scale(${interpolate(sp, [0, 1], [0.92, 1])})`,
              }}
            >
              <div style={{ fontFamily: fonts.serif, fontSize: 88, color: colors.lime500, letterSpacing: '-0.04em' }}>AI</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 32, color: colors.white, lineHeight: 1.3 }}>
                sees, hears and reads
                <br />
                the original
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                left: AI_BOX.x + AI_BOX.w - 40,
                top: AI_BOX.y - 30,
                opacity: badgeOp,
                transform: `scale(${interpolate(badgeSp, [0, 1], [0.4, 1])})`,
                background: colors.lime500,
                color: colors.white,
                fontFamily: fonts.sans,
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: 999,
                padding: '12px 26px',
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 24px rgba(102,198,28,0.35)',
              }}
            >
              ✓ {badgeText}
            </div>
          </>
        );
      })()}

      <LogoFooter />
    </AbsoluteFill>
  );
};
