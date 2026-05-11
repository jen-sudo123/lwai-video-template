import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

// Animated chain-of-reasoning diagram. Question on left -> a chain of reasoning
// nodes lights up sequentially through a model "brain" -> answer pops on the right.
// SVG path-draw + spring pop-ins + radial glow pulse on the active node.

type Props = {
  prompt?: string;
  steps?: string[];
  answer?: string;
  label?: string;
};

const NODE_R = 80;
const PROMPT_W = 200;
const PROMPT_H = 110;
const ANSWER_W = 240;
const ANSWER_H = 110;
const CANVAS_W = 1760;
const CANVAS_H = 720;
const MARGIN = 40;

export const ReasoningChain: React.FC<Props> = ({
  prompt = 'Recommend our next vendor.',
  steps = [
    'Define criteria',
    'Weight factors',
    'Compare evidence',
    'Check assumptions',
  ],
  answer = 'Vendor B',
  label = 'How modern models reason internally',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const promptAppear = 264;
  const firstNodeAppear = promptAppear + 28;
  const stagger = 24;

  // Even spacing: distribute gaps uniformly across all connectors
  const totalElements = PROMPT_W + steps.length * NODE_R * 2 + ANSWER_W;
  const totalConnectorSpace = CANVAS_W - 2 * MARGIN - totalElements;
  const gap = totalConnectorSpace / (steps.length + 1);
  const firstNodeCX = MARGIN + PROMPT_W + gap + NODE_R;
  const nodeXs = steps.map((_, i) => firstNodeCX + i * (NODE_R * 2 + gap));

  const nodeY = CANVAS_H / 2;

  const lastNodeAppear = firstNodeAppear + (steps.length - 1) * stagger;
  const answerAppear = lastNodeAppear + 28;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        padding: layout.safeMargin,
        display: 'flex',
        flexDirection: 'row',
        gap: 0,
        alignItems: 'center',
      }}
    >
      {/* Left column — title text */}
      <div
        style={{
          opacity: headerOpacity,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: 560,
          flexShrink: 0,
          paddingRight: 48,
        }}
      >
        <div style={typography.label}>{label ?? 'BUILT IN TODAY'}</div>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 88,
            fontWeight: 700,
            lineHeight: 1.0,
            color: colors.black,
            letterSpacing: '-2px',
            overflow: 'visible',
          }}
        >
          {(['Chain', 'of', 'Thought'] as const).map((word, i) => {
            const delay = i * 8;
            const bounce = spring({
              frame: frame - delay,
              fps,
              config: { damping: 7, stiffness: 220, mass: 0.5 },
            });
            const translateY = interpolate(bounce, [0, 1], [80, 0]);
            return (
              <span
                key={word}
                style={{
                  display: 'inline-block',
                  transform: `translateY(${translateY}px)`,
                  color: word === 'Thought' ? colors.lime500 : colors.black,
                  marginRight: word !== 'Thought' ? '0.22em' : 0,
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
        <div
          style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.4,
            color: colors.neutral600,
            marginTop: 8,
          }}
        >
          Leading models now reason internally before they respond.
        </div>
      </div>

      {/* Right column — chain diagram */}
      <div
        style={{
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <svg
          width="100%"
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          style={{ maxHeight: '100%' }}
        >
          {/* Soft brain halo behind the chain */}
          <defs>
            <radialGradient id="brainHalo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={colors.lime500} stopOpacity="0.18" />
              <stop offset="60%" stopColor={colors.lime500} stopOpacity="0.04" />
              <stop offset="100%" stopColor={colors.lime500} stopOpacity="0" />
            </radialGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Halo behind whole chain */}
          <ellipse
            cx={CANVAS_W / 2}
            cy={nodeY}
            rx={(CANVAS_W - 600) / 2}
            ry={180}
            fill="url(#brainHalo)"
            opacity={interpolate(frame, [firstNodeAppear, firstNodeAppear + 30], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })}
          />

          {/* Prompt block */}
          <PromptBlock
            x={MARGIN}
            y={nodeY}
            text={prompt}
            appearFrame={promptAppear}
          />

          {/* Connecting paths between nodes */}
          {steps.map((_, i) => {
            if (i === steps.length - 1) return null;
            const drawStart = firstNodeAppear + i * stagger + 8;
            return (
              <ConnectorPath
                key={i}
                from={[nodeXs[i] + NODE_R, nodeY]}
                to={[nodeXs[i + 1] - NODE_R, nodeY]}
                drawFrom={drawStart}
              />
            );
          })}

          {/* Path from prompt to first node */}
          <ConnectorPath
            from={[MARGIN + PROMPT_W, nodeY]}
            to={[nodeXs[0] - NODE_R, nodeY]}
            drawFrom={promptAppear + 8}
          />
          {/* Path from last node to answer */}
          <ConnectorPath
            from={[nodeXs[steps.length - 1] + NODE_R, nodeY]}
            to={[CANVAS_W - MARGIN - ANSWER_W, nodeY]}
            drawFrom={lastNodeAppear + 16}
          />

          {/* Reasoning nodes */}
          {steps.map((step, i) => (
            <ReasoningNode
              key={i}
              cx={nodeXs[i]}
              cy={nodeY}
              label={step}
              index={i}
              appearFrame={firstNodeAppear + i * stagger}
              fps={fps}
            />
          ))}

          {/* Answer block — x is the left edge */}
          <AnswerBlock
            x={CANVAS_W - MARGIN - ANSWER_W}
            y={nodeY}
            text={answer}
            appearFrame={answerAppear}
            fps={fps}
          />
        </svg>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

const PromptBlock: React.FC<{ x: number; y: number; text: string; appearFrame: number }> = ({
  x,
  y,
  text,
  appearFrame,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appearFrame, appearFrame + 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const W = 200;
  const H = 110;
  return (
    <g opacity={opacity}>
      <rect
        x={x}
        y={y - H / 2}
        width={W}
        height={H}
        rx="20"
        fill={colors.white}
        stroke={colors.black}
        strokeWidth="4"
      />
      <text
        x={x + W / 2}
        y={y + 8}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily={fonts.sans}
        fontSize="32"
        fontWeight="700"
        letterSpacing="3"
        fill={colors.neutral600}
      >
        PROMPT
      </text>
    </g>
  );
};

const AnswerBlock: React.FC<{
  x: number;
  y: number;
  text: string;
  appearFrame: number;
  fps: number;
}> = ({ x, y, text, appearFrame, fps }) => {
  const frame = useCurrentFrame();
  const pop = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 10, stiffness: 130, mass: 0.8 },
  });
  const opacity = interpolate(frame - appearFrame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const W = ANSWER_W;
  const H = ANSWER_H;
  const scale = interpolate(pop, [0, 1], [0.7, 1]);
  return (
    <g opacity={opacity} transform={`translate(${x} ${y - H / 2}) scale(${scale}) translate(${(W * (1 - scale)) / scale / 2} 0)`}>
      <rect
        x={0}
        y={0}
        width={W}
        height={H}
        rx="20"
        fill={colors.lime500}
      />
      <text
        x={W / 2}
        y={H / 2 + 9}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily={fonts.sans}
        fontSize="28"
        fontWeight="700"
        letterSpacing="3"
        fill={colors.white}
      >
        ANSWER
      </text>
    </g>
  );
};

const ConnectorPath: React.FC<{ from: [number, number]; to: [number, number]; drawFrom: number }> = ({
  from,
  to,
  drawFrom,
}) => {
  const frame = useCurrentFrame();
  const dx = to[0] - from[0];
  const length = Math.abs(dx);
  const draw = interpolate(frame, [drawFrom, drawFrom + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <path
      d={`M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`}
      stroke={colors.lime500}
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray={length}
      strokeDashoffset={length * (1 - draw)}
    />
  );
};

const ReasoningNode: React.FC<{
  cx: number;
  cy: number;
  label: string;
  index: number;
  appearFrame: number;
  fps: number;
}> = ({ cx, cy, label, index, appearFrame, fps }) => {
  const frame = useCurrentFrame();
  const pop = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.7 },
  });
  const opacity = interpolate(frame - appearFrame, [0, 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(pop, [0, 1], [0.4, 1]);

  // Pulse effect right after pop-in
  const pulseT = Math.max(0, frame - appearFrame - 12);
  const pulseR = NODE_R + interpolate(pulseT, [0, 30], [0, 30], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulseOpacity = interpolate(pulseT, [0, 30], [0.6, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <g opacity={opacity}>
      <circle cx={cx} cy={cy} r={pulseR} fill="none" stroke={colors.lime500} strokeWidth="3" opacity={pulseOpacity} />
      <g transform={`translate(${cx} ${cy}) scale(${scale})`}>
        <circle r={NODE_R} fill={colors.white} stroke={colors.lime500} strokeWidth="5" />
        <text
          x={0}
          y={-12}
          textAnchor="middle"
          fontFamily={fonts.sans}
          fontSize="15"
          fontWeight="700"
          letterSpacing="2"
          fill={colors.neutral600}
        >
          STEP {index + 1}
        </text>
        <text
          x={0}
          y={16}
          textAnchor="middle"
          fontFamily={fonts.sans}
          fontSize="15"
          fontWeight="600"
          fill={colors.black}
        >
          {label}
        </text>
      </g>
    </g>
  );
};
