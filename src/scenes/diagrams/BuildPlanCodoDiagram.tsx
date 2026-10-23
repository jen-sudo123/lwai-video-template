import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from 'remotion';
import { LogoFooter } from '../../Logo';
import { fonts, colors, typography, layout } from '../../tokens';

type Props = {
  // Scene-local frame each Build Plan section gets highlighted as the VO walks
  // through it: [section 1, section 2, sections 3 & 4, section 5].
  sectionFrames?: [number, number, number, number];
  // Scene-local frame each CODO tile lands: [Character, Objective,
  // Do's & Don'ts, Output]. Its ingredients fly over ~26 frames earlier.
  codoFrames?: [number, number, number, number];
  // Everything lights up together ("we already have most of the ingredients").
  allFrame?: number;
  // Start with the document and empty slots already on screen (when the
  // previous scene set them up).
  skipEntry?: boolean;
};

const SECTIONS = ['The work and the result', 'Steps and who does them', 'What it needs', 'Where you stay in control', 'The first version'];

const TILES = [
  { letter: 'C', word: 'Character', from: [0] },
  { letter: 'O', word: 'Objective', from: [0] },
  { letter: 'D', word: "Do's & Don'ts", from: [1, 2, 3] },
  { letter: 'O', word: 'Output', from: [4] },
];

// Sections highlighted in each phase (matches sectionFrames).
const PHASES = [[0], [1], [2, 3], [4]];

const INK = '#1B1F1A';
const PAPER = '#FBFCF9';
const HIGHLIGHT = '#D0F8AB';

// Build Plan document (left).
const DOC_X = layout.safeMargin;
const DOC_Y = 250;
const DOC_W = 560;
const ROW_Y0 = DOC_Y + 130;
const ROW_H = 104;

// CODO slots (right).
const TILE_W = 236;
const TILE_H = 270;
const TILE_GAP = 28;
const TILES_X = layout.width - layout.safeMargin - (4 * TILE_W + 3 * TILE_GAP);
const TILE_Y = 380;

const rowCenter = (i: number) => ({ x: DOC_X + DOC_W - 40, y: ROW_Y0 + i * ROW_H + 30 });
const slotX = (i: number) => TILES_X + i * (TILE_W + TILE_GAP);

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// The Agent Build Plan as a document on the left; as the VO names each
// section a highlighter sweeps across it and its "ingredients" fly to the
// right, where a C, O, D, O tile drops into an empty slot. The four tiles
// spell CODO: the instructions are built from the plan.
export const BuildPlanCodoDiagram: React.FC<Props> = ({
  sectionFrames = [64, 389, 544, 925],
  codoFrames = [321, 343, 843, 1130],
  allFrame = 1169,
  skipEntry = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const docIn = skipEntry ? 1 : spring({ frame, fps, config: { damping: 18, mass: 0.8 } });
  const slotsIn = skipEntry ? 1 : interpolate(frame, [20, 45], [0, 1], clamp);
  const finale = interpolate(frame, [allFrame, allFrame + 20], [0, 1], clamp);

  // Highlighter sweep progress for a section (0..1), kept once swept.
  const sweep = (s: number) => {
    const phase = PHASES.findIndex((p) => p.includes(s));
    const start = sectionFrames[phase] + (PHASES[phase].indexOf(s) * 10);
    return interpolate(frame, [start, start + 18], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  };
  // Is this section the one being talked about right now?
  const phaseNow = sectionFrames.reduce((acc, f, i) => (frame >= f ? i : acc), -1);
  const isCurrent = (s: number) => frame < allFrame && phaseNow >= 0 && PHASES[phaseNow].includes(s);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Faint blueprint grid behind the building area */}
      <svg width={layout.width} height={layout.height} style={{ position: 'absolute', inset: 0, opacity: 0.55 * slotsIn }}>
        <defs>
          <pattern id="bp-grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#E7EEE0" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect x={TILES_X - 60} y={TILE_Y - 120} width={layout.width - layout.safeMargin - TILES_X + 120} height={TILE_H + 300} fill="url(#bp-grid)" />
      </svg>

      {/* Title */}
      <div style={{ position: 'absolute', left: layout.safeMargin, top: 70, opacity: docIn }}>
        <div style={{ ...typography.label }}>Connecting the two</div>
        <div style={{ ...typography.title, fontSize: 64, color: colors.black, marginTop: 10 }}>
          From Build Plan to <span style={{ color: colors.lime500 }}>CODO</span>
        </div>
      </div>

      {/* Build Plan document */}
      <div
        style={{
          position: 'absolute',
          left: DOC_X,
          top: DOC_Y,
          width: DOC_W,
          height: 690,
          boxSizing: 'border-box',
          backgroundColor: PAPER,
          border: `2px solid ${colors.neutral200}`,
          borderRadius: 6,
          boxShadow: '0 18px 50px rgba(30,40,20,0.10), 0 2px 6px rgba(30,40,20,0.06)',
          transform: `translateY(${(1 - docIn) * 40}px) rotate(${(1 - docIn) * -3 - 0.6}deg)`,
          opacity: docIn,
          padding: '34px 40px',
        }}
      >
        {/* folded corner */}
        <div style={{ position: 'absolute', right: -2, top: -2, width: 54, height: 54, background: `linear-gradient(225deg, ${colors.white} 50%, #E9EDE4 50%)` }} />
        <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 600, letterSpacing: '0.14em', color: colors.neutral600 }}>
          MY AGENT
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 40, color: INK, marginTop: 4 }}>Build Plan</div>
      </div>

      {SECTIONS.map((label, i) => {
        const rowIn = skipEntry ? 1 : interpolate(frame, [12 + i * 6, 30 + i * 6], [0, 1], clamp);
        const sw = sweep(i);
        const current = isCurrent(i);
        const top = ROW_Y0 + i * ROW_H;
        return (
          <div
            key={label}
            style={{
              position: 'absolute',
              left: DOC_X + 40,
              top,
              width: DOC_W - 80,
              opacity: rowIn * docIn,
              transform: `translateY(${(1 - docIn) * 40}px)`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  border: `2px solid ${sw > 0.5 ? colors.lime500 : '#D5DAD0'}`,
                  backgroundColor: current ? colors.lime500 : 'transparent',
                  color: current ? colors.white : sw > 0.5 ? colors.titleGreen : colors.neutral600,
                  fontFamily: fonts.sans,
                  fontWeight: 700,
                  fontSize: 19,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </div>
              <div style={{ position: 'relative' }}>
                {/* highlighter stroke */}
                <div
                  style={{
                    position: 'absolute',
                    left: -8,
                    right: -8,
                    top: 6,
                    bottom: 2,
                    backgroundColor: HIGHLIGHT,
                    opacity: current ? 1 : 0.55,
                    transformOrigin: 'left center',
                    transform: `scaleX(${sw}) skewX(-8deg)`,
                    borderRadius: 4,
                  }}
                />
                <div style={{ position: 'relative', fontFamily: fonts.serif, fontSize: 31, color: INK }}>{label}</div>
              </div>
            </div>
            {/* scribbled "notes" lines */}
            <div style={{ marginLeft: 58, marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ height: 5, width: 300 - i * 18, borderRadius: 3, backgroundColor: '#E8ECE3' }} />
              <div style={{ height: 5, width: 200 + i * 14, borderRadius: 3, backgroundColor: '#E8ECE3' }} />
            </div>
          </div>
        );
      })}

      {/* CODO slots and tiles */}
      {TILES.map((t, i) => {
        const x = slotX(i);
        const land = codoFrames[i];
        const drop = spring({ frame: frame - (land - 6), fps, config: { damping: 11, mass: 0.7, stiffness: 140 } });
        const dropped = frame >= land - 6;
        const tileY = TILE_Y - (1 - drop) * 260;
        const impact = interpolate(frame, [land, land + 4, land + 16], [0, 1, 0], clamp);
        const wordIn = interpolate(frame, [land + 4, land + 18], [0, 1], clamp);
        const glow = Math.max(finale, interpolate(frame, [land, land + 6, land + 40], [0, 1, 0.25], clamp));
        return (
          <React.Fragment key={t.word}>
            {/* empty slot */}
            <div
              style={{
                position: 'absolute',
                left: x,
                top: TILE_Y,
                width: TILE_W,
                height: TILE_H,
                boxSizing: 'border-box',
                borderRadius: 22,
                border: '3px dashed #CBD5C2',
                opacity: slotsIn * (1 - drop),
              }}
            />
            {/* landing dust */}
            <div
              style={{
                position: 'absolute',
                left: x - 20,
                top: TILE_Y + TILE_H - 6,
                width: TILE_W + 40,
                height: 14,
                borderRadius: 7,
                backgroundColor: colors.lime500,
                opacity: impact * 0.35,
                transform: `scaleX(${0.6 + impact * 0.5})`,
                filter: 'blur(6px)',
              }}
            />
            {/* tile */}
            {dropped && (
              <div
                style={{
                  position: 'absolute',
                  left: x,
                  top: tileY,
                  width: TILE_W,
                  height: TILE_H,
                  boxSizing: 'border-box',
                  borderRadius: 22,
                  backgroundColor: colors.white,
                  border: `3px solid ${colors.lime500}`,
                  boxShadow: `0 ${14 + glow * 10}px ${34 + glow * 20}px rgba(102,198,28,${0.12 + glow * 0.22})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: Math.min(1, drop * 3),
                }}
              >
                <div style={{ fontFamily: fonts.serif, fontSize: 200, lineHeight: 1, color: colors.lime500, marginTop: -14 }}>
                  {t.letter}
                </div>
              </div>
            )}
            {/* word + source */}
            <div
              style={{
                position: 'absolute',
                left: x - 10,
                width: TILE_W + 20,
                top: TILE_Y + TILE_H + 26,
                textAlign: 'center',
                opacity: wordIn,
                transform: `translateY(${(1 - wordIn) * 10}px)`,
              }}
            >
              <div style={{ fontFamily: fonts.serif, fontSize: 34, color: INK, whiteSpace: 'nowrap' }}>{t.word}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 18, color: colors.neutral600, marginTop: 6, letterSpacing: '0.04em' }}>
                {t.from.length > 1 ? `from sections ${t.from[0] + 1}–${t.from[t.from.length - 1] + 1}` : `from section ${t.from[0] + 1}`}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      {/* Ingredients flying from the plan into each slot */}
      <svg width={layout.width} height={layout.height} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {TILES.flatMap((t, i) =>
          t.from.map((s, k) => {
            const start = codoFrames[i] - 30 + k * 4;
            const p = interpolate(frame, [start, start + 24], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
            if (p <= 0 || p >= 1) return null;
            const a = rowCenter(s);
            const b = { x: slotX(i) + TILE_W / 2, y: TILE_Y - 40 };
            const c = { x: (a.x + b.x) / 2, y: Math.min(a.y, b.y) - 160 };
            const x = (1 - p) ** 2 * a.x + 2 * (1 - p) * p * c.x + p ** 2 * b.x;
            const y = (1 - p) ** 2 * a.y + 2 * (1 - p) * p * c.y + p ** 2 * b.y;
            // short trail behind the token
            const trail = [0.06, 0.12, 0.18].map((d, j) => {
              const q = Math.max(0, p - d);
              return (
                <circle
                  key={j}
                  cx={(1 - q) ** 2 * a.x + 2 * (1 - q) * q * c.x + q ** 2 * b.x}
                  cy={(1 - q) ** 2 * a.y + 2 * (1 - q) * q * c.y + q ** 2 * b.y}
                  r={9 - j * 2.5}
                  fill={colors.lime500}
                  opacity={0.35 - j * 0.1}
                />
              );
            });
            return (
              <g key={`${i}-${s}`}>
                {trail}
                <circle cx={x} cy={y} r={16} fill={colors.lime500} />
                <text x={x} y={y + 6} textAnchor="middle" fontFamily={fonts.sans} fontWeight={700} fontSize={16} fill={colors.white}>
                  {s + 1}
                </text>
              </g>
            );
          })
        )}
      </svg>

      {/* Finale caption */}
      <div
        style={{
          position: 'absolute',
          left: TILES_X,
          width: 4 * TILE_W + 3 * TILE_GAP,
          top: TILE_Y + TILE_H + 140,
          textAlign: 'center',
          fontFamily: fonts.serif,
          fontSize: 38,
          color: INK,
          opacity: finale,
          transform: `translateY(${(1 - finale) * 12}px)`,
        }}
      >
        Most of the <span style={{ color: colors.lime500 }}>ingredients</span> are already there.
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
