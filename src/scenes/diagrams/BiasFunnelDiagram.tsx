import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LightBulbIcon, EyeIcon, ChatBubbleLeftRightIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { LogoFooter } from '../../Logo';
import { fonts, colors } from '../../tokens';

type Props = {
  // Scene-local frame each of the four right-column cards fades in. Defaults
  // are the spoken onsets of "cultural assumptions", "by the language",
  // "the context", "how you frame", each 8 frames early so the card is
  // mostly faded in as the phrase starts. Order: [Training data, Language,
  // Available context, Prompt framing].
  cardTimings?: [number, number, number, number];
  // Scene-local frame the funnel ("AI model") and the "AI answer" output box
  // fade in together, before any of the input cards. Default 0.
  modelAppearFrame?: number;
};

// Greedily wraps `text` onto lines of at most `maxChars` characters, breaking
// only at word boundaries.
const wrapText = (text: string, maxChars: number): string[] => {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
};

const INK = '#23282D';

const fadeIn = (frame: number, start: number) =>
  interpolate(frame, [start, start + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const riseIn = (frame: number, start: number, distance = 16) =>
  interpolate(frame, [start, start + 20], [distance, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// Builds a closed polygon path with each corner rounded off by `radius`,
// by pulling back along each edge and joining corners with a quadratic curve.
const roundedPolygonPath = (points: Array<[number, number]>, radius: number) => {
  const n = points.length;
  const pointAt = (i: number) => points[((i % n) + n) % n];
  let d = '';
  for (let i = 0; i < n; i++) {
    const prev = pointAt(i - 1);
    const curr = pointAt(i);
    const next = pointAt(i + 1);
    const toPrev = { x: prev[0] - curr[0], y: prev[1] - curr[1] };
    const toNext = { x: next[0] - curr[0], y: next[1] - curr[1] };
    const lenPrev = Math.hypot(toPrev.x, toPrev.y);
    const lenNext = Math.hypot(toNext.x, toNext.y);
    const r = Math.min(radius, lenPrev / 2, lenNext / 2);
    const start = { x: curr[0] + (toPrev.x / lenPrev) * r, y: curr[1] + (toPrev.y / lenPrev) * r };
    const end = { x: curr[0] + (toNext.x / lenNext) * r, y: curr[1] + (toNext.y / lenNext) * r };
    d += i === 0 ? `M${start.x} ${start.y} ` : `L${start.x} ${start.y} `;
    d += `Q${curr[0]} ${curr[1]} ${end.x} ${end.y} `;
  }
  return `${d}Z`;
};

const INPUTS = [
  {
    title: 'Training data',
    body: 'Cultural assumptions, gaps, and uneven representation',
    Icon: LightBulbIcon,
  },
  { title: 'Language', body: 'Words and framing you use', Icon: ChatBubbleLeftRightIcon },
  { title: 'Available context', body: 'What it can actually see', Icon: EyeIcon },
  { title: 'Prompt framing', body: 'How you ask the question', Icon: AdjustmentsHorizontalIcon },
];

const CARD_W = 460;
const CARD_H = 176;
const CARD_GAP = 24;
const CARD_X = 1050;
const CARD_TOP = 110;
const CARD_PAD = 28;
const ICON_SIZE = 40;

const LEFT_CX = 420;
const FUNNEL_TOP_Y = 170;
const FUNNEL_TOP_HALF_W = 190;
const FUNNEL_NECK_Y = 430;
const FUNNEL_NECK_HALF_W = 70;
const FUNNEL_BOTTOM_Y = 520;
const ANSWER_TOP_Y = 610;
const ANSWER_H = 110;
const ANSWER_W = 420;

// A funnel labeled "AI model" on the left narrows down to a single "AI
// answer" output, while four input cards — each appearing on its own VO
// beat — sit on the right, illustrating that an AI answer is shaped by more
// than just the question asked.
export const BiasFunnelDiagram: React.FC<Props> = ({
  cardTimings = [130, 396, 464, 556],
  modelAppearFrame = 0,
}) => {
  const frame = useCurrentFrame();

  const funnelIn = fadeIn(frame, modelAppearFrame);
  const answerIn = fadeIn(frame, modelAppearFrame);
  const answerY = riseIn(frame, modelAppearFrame);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
      <svg viewBox="0 0 1600 1000" width="100%" height="100%" role="img">
        <title>What Shapes an AI Answer</title>

        {/* Right column — four input cards, each timed to its own VO beat.
            Matches the app's standard body-card style: rounded neutral
            border, icon chip, serif title, sans description. */}
        {INPUTS.map(({ title, body, Icon }, i) => {
          const y = CARD_TOP + i * (CARD_H + CARD_GAP);
          const iconX = CARD_X + CARD_PAD;
          const iconY = y + 24;
          const titleY = iconY + ICON_SIZE + 34;
          const descY = titleY + 32;
          const descLines = wrapText(body, 36);
          const in_ = fadeIn(frame, cardTimings[i]);
          const ty = riseIn(frame, cardTimings[i], 20);
          return (
            <g key={title} style={{ opacity: in_, transform: `translateY(${ty}px)` }}>
              <rect
                x={CARD_X}
                y={y}
                width={CARD_W}
                height={CARD_H}
                rx={20}
                fill="#FFFFFF"
                stroke={colors.neutral200}
                strokeWidth={2}
              />
              <rect x={iconX} y={iconY} width={ICON_SIZE} height={ICON_SIZE} rx={11} fill="#EDF5E8" />
              <svg x={iconX + 7} y={iconY + 7} width={26} height={26} viewBox="0 0 24 24" fill="none">
                <Icon style={{ color: colors.titleGreen }} strokeWidth={1.5} />
              </svg>
              <text x={CARD_X + CARD_PAD} y={titleY} fontFamily={fonts.serif} fontSize="30" fontWeight={400} fill={colors.black}>
                {title}
              </text>
              {descLines.map((line, li) => (
                <text
                  key={li}
                  x={CARD_X + CARD_PAD}
                  y={descY + li * 26}
                  fontFamily={fonts.sans}
                  fontSize="20"
                  fontWeight={400}
                  fill={colors.black}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}

        {/* Left column — funnel */}
        <g style={{ opacity: funnelIn }}>
          <path
            d={roundedPolygonPath(
              [
                [LEFT_CX - FUNNEL_TOP_HALF_W, FUNNEL_TOP_Y],
                [LEFT_CX + FUNNEL_TOP_HALF_W, FUNNEL_TOP_Y],
                [LEFT_CX + FUNNEL_NECK_HALF_W, FUNNEL_NECK_Y],
                [LEFT_CX + FUNNEL_NECK_HALF_W, FUNNEL_BOTTOM_Y],
                [LEFT_CX - FUNNEL_NECK_HALF_W, FUNNEL_BOTTOM_Y],
                [LEFT_CX - FUNNEL_NECK_HALF_W, FUNNEL_NECK_Y],
              ],
              22
            )}
            fill="#FFFFFF"
            stroke={INK}
            strokeWidth={4}
          />
          <text
            x={LEFT_CX}
            y={(FUNNEL_TOP_Y + FUNNEL_NECK_Y) / 2 + 8}
            textAnchor="middle"
            fontFamily={fonts.sans}
            fontSize="24"
            fontWeight={600}
            letterSpacing="0.08em"
            fill={INK}
          >
            AI MODEL
          </text>
        </g>

        {/* Output arrow + AI answer */}
        <g style={{ opacity: answerIn, transform: `translateY(${answerY}px)` }}>
          <line x1={LEFT_CX} y1={FUNNEL_BOTTOM_Y} x2={LEFT_CX} y2={FUNNEL_BOTTOM_Y + 60} stroke={INK} strokeWidth={4} />
          <path
            d={`M${LEFT_CX - 18} ${FUNNEL_BOTTOM_Y + 45} L${LEFT_CX} ${FUNNEL_BOTTOM_Y + 65} L${LEFT_CX + 18} ${FUNNEL_BOTTOM_Y + 45}`}
            fill="none"
            stroke={INK}
            strokeWidth={4}
          />
          <rect
            x={LEFT_CX - ANSWER_W / 2}
            y={ANSWER_TOP_Y}
            width={ANSWER_W}
            height={ANSWER_H}
            rx={20}
            fill="#FFFFFF"
            stroke={INK}
            strokeWidth={3}
          />
          <text
            x={LEFT_CX}
            y={ANSWER_TOP_Y + ANSWER_H / 2 + 15}
            textAnchor="middle"
            fontFamily={fonts.serif}
            fontSize="44"
            fontWeight={400}
            fill={INK}
          >
            AI answer
          </text>
        </g>
      </svg>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
