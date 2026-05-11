import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

type Props = {
  label?: string;
  text?: string;
  highlight?: string;
  lineTimings?: number[];
};

// SVG diagram coordinate space
const D_W = 1760;
const D_H = 300;

const BOX_X = 500;
const BOX_W = 760;
const BOX_H = 220;
const BOX_Y = (D_H - BOX_H) / 2; // 40
const BOX_CY = BOX_Y + BOX_H / 2; // 150
const BOX_RIGHT = BOX_X + BOX_W; // 1260

const ANS_W = 160;
const ANS_H = 120;
const ANS_X = BOX_RIGHT + 140;
const ANS_Y = BOX_CY - ANS_H / 2;

// Three question marks, vertically distributed inside the box's y range
const Q_YS = [BOX_Y + 30, BOX_CY - 20, BOX_Y + BOX_H - 70];
const Q_START_X = 120;
const Q_END_X = BOX_X - 20;

// Animation timing (frames within the scene)
const BOX_APPEAR = 130;
const Q_APPEARS = [BOX_APPEAR + 8, BOX_APPEAR + 24, BOX_APPEAR + 40];
const Q_EXITS   = [BOX_APPEAR + 60, BOX_APPEAR + 76, BOX_APPEAR + 92];
const ARROW_R_START = BOX_APPEAR + 105;
const ARROW_R_LEN = ANS_X - BOX_RIGHT;
const ANSWER_APPEAR = ARROW_R_START + 22;

export const ProblemBlackBox: React.FC<Props> = ({
  label = 'BUT IT CREATES A NEW PROBLEM',
  text  = 'Polished, confident answers\nstop us asking how.',
  highlight = 'stop us asking how',
  lineTimings = [0, 90],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Text ──────────────────────────────────────────────────────────────────
  const labelOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const lines = text.split('\n');

  // ── Box ───────────────────────────────────────────────────────────────────
  const boxOpacity = interpolate(frame - BOX_APPEAR, [0, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const boxScale = interpolate(
    spring({ frame: frame - BOX_APPEAR, fps, config: { damping: 22, stiffness: 90 } }),
    [0, 1], [0.94, 1],
  );

  // ── Right arrow ───────────────────────────────────────────────────────────
  const arrowDraw = interpolate(frame, [ARROW_R_START, ARROW_R_START + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // ── Answer pop ────────────────────────────────────────────────────────────
  const answerPop = spring({ frame: frame - ANSWER_APPEAR, fps, config: { damping: 8, stiffness: 200, mass: 0.6 } });
  const answerScale = interpolate(answerPop, [0, 1], [0.2, 1]);
  const answerOpacity = interpolate(frame - ANSWER_APPEAR, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>

      {/* ── Label (top) ───────────────────────────────────────────────── */}
      {label && (
        <div
          style={{
            position: 'absolute',
            left: layout.safeMargin,
            right: layout.safeMargin,
            top: 80,
            textAlign: 'center',
            ...typography.label,
            fontSize: 36,
            color: colors.neutral600,
            opacity: labelOpacity,
          }}
        >
          {label}
        </div>
      )}

      {/* ── Diagram (center) ──────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: 260,
          height: D_H,
        }}
      >
        <svg width="100%" viewBox={`0 0 ${D_W} ${D_H}`} overflow="visible">

          {/* Dashed connector lines (Q marks → box left edge) */}
          {Q_YS.map((qy, i) => {
            const lineOpacity = interpolate(frame - Q_APPEARS[i], [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            return (
              <line
                key={i}
                x1={Q_START_X + 50}
                y1={qy + 36}
                x2={BOX_X}
                y2={qy + 36}
                stroke="rgba(0,0,0,0.15)"
                strokeWidth="2"
                strokeDasharray="10 7"
                opacity={lineOpacity}
              />
            );
          })}

          {/* Question marks floating toward box */}
          {Q_YS.map((qy, i) => {
            const localFrame = frame - Q_APPEARS[i];
            const totalDur = Q_EXITS[i] - Q_APPEARS[i];
            const qOpacity = interpolate(
              frame,
              [Q_APPEARS[i], Q_APPEARS[i] + 10, Q_EXITS[i], Q_EXITS[i] + 14],
              [0, 1, 1, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            const qX = interpolate(frame, [Q_APPEARS[i], Q_EXITS[i] + 14], [Q_START_X, Q_END_X], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            // Subtle vertical bob
            const bob = Math.sin((localFrame / 18) * Math.PI) * 4;
            return (
              <text
                key={i}
                x={qX}
                y={qy + 68 + bob}
                textAnchor="middle"
                fontFamily={fonts.serif}
                fontSize="72"
                fontWeight="700"
                fill="rgba(0,0,0,0.55)"
                opacity={qOpacity}
              >
                ?
              </text>
            );
          })}

          {/* Black box */}
          <g
            opacity={boxOpacity}
            transform={`translate(${BOX_X + BOX_W / 2} ${BOX_CY}) scale(${boxScale}) translate(${-BOX_W / 2} ${-BOX_H / 2})`}
          >
            <rect
              x={0} y={0}
              width={BOX_W} height={BOX_H}
              rx="20"
              fill="#0D0D0D"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {/* Hidden-process dots */}
            {[-80, -40, 0, 40, 80].map((dx) => (
              <circle
                key={dx}
                cx={BOX_W / 2 + dx}
                cy={BOX_H / 2}
                r="6"
                fill="rgba(255,255,255,0.55)"
              />
            ))}
            {/* Ghost "???" inside box */}
            <text
              x={BOX_W / 2}
              y={BOX_H / 2 + 32}
              textAnchor="middle"
              fontFamily={fonts.serif}
              fontSize="100"
              fill="rgba(255,255,255,0.18)"
            >
              ???
            </text>
            {/* Box label */}
            <text
              x={BOX_W / 2}
              y={38}
              textAnchor="middle"
              fontFamily={fonts.sans}
              fontSize="16"
              fontWeight="700"
              letterSpacing="4"
              fill="rgba(255,255,255,0.7)"
            >
              MODEL
            </text>
          </g>

          {/* Right connector (box → answer) */}
          <line
            x1={BOX_RIGHT}
            y1={BOX_CY}
            x2={ANS_X}
            y2={BOX_CY}
            stroke={colors.lime500}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={ARROW_R_LEN}
            strokeDashoffset={ARROW_R_LEN * (1 - arrowDraw)}
          />
          {/* Arrowhead */}
          <polygon
            points={`${ANS_X},${BOX_CY - 8} ${ANS_X + 14},${BOX_CY} ${ANS_X},${BOX_CY + 8}`}
            fill={colors.lime500}
            opacity={arrowDraw}
          />

          {/* Answer block — ✓ and ANSWER label combined in one box */}
          <g
            opacity={answerOpacity}
            transform={`translate(${ANS_X + 14 + ANS_W * (1 - answerScale) / 2} ${ANS_Y + ANS_H * (1 - answerScale) / 2}) scale(${answerScale})`}
          >
            <rect
              x={0} y={0}
              width={ANS_W} height={ANS_H}
              rx="18"
              fill={colors.lime500}
            />
            <text
              x={ANS_W / 2}
              y={52}
              textAnchor="middle"
              fontFamily={fonts.serif}
              fontSize="46"
              fontWeight="700"
              fill={colors.white}
            >
              ✓
            </text>
            <text
              x={ANS_W / 2}
              y={ANS_H - 14}
              textAnchor="middle"
              fontFamily={fonts.sans}
              fontSize="14"
              fontWeight="700"
              letterSpacing="3"
              fill="rgba(255,255,255,0.85)"
            >
              ANSWER
            </text>
          </g>

        </svg>
      </div>

      {/* ── Text below diagram ────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          right: layout.safeMargin,
          top: 620,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 96,
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 1.15,
            maxWidth: 1400,
            margin: '0 auto',
          }}
        >
          {lines.map((line, i) => {
            const delay = lineTimings[i] ?? 0;
            const op = interpolate(frame, [delay, delay + 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const ty = interpolate(frame, [delay, delay + 22], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const hlIdx = highlight ? line.indexOf(highlight) : -1;
            const lineContent = hlIdx >= 0 && highlight ? (
              <>
                {line.slice(0, hlIdx)}
                <span style={{ color: colors.lime500 }}>{highlight}</span>
                {line.slice(hlIdx + highlight.length)}
              </>
            ) : line;
            return (
              <div key={i} style={{ opacity: op, transform: `translateY(${ty}px)` }}>
                {lineContent}
              </div>
            );
          })}
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
