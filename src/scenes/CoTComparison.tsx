import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

// Iconic Google CoT-paper-style comparison: Standard prompting (wrong) vs CoT (right).
// Both cards reveal in stages with kinetic timing. Reasoning lines stream into the
// CoT card character-by-character, then the answer flips from "?" to a green check.

type Props = {
  question?: string;
  wrongAnswer?: string;
  reasoningSteps?: string[];
  rightAnswer?: string;
};

const FADE = 12;

const useTypewriter = (text: string, startFrame: number, charsPerFrame = 0.9) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - startFrame);
  const visible = Math.min(text.length, Math.floor(local * charsPerFrame));
  return text.slice(0, visible);
};

const CardShell: React.FC<{
  label: string;
  badge: 'standard' | 'cot';
  appearFrame: number;
  children: React.ReactNode;
}> = ({ label, badge, appearFrame, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - appearFrame;
  const enter = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 90, mass: 0.8 },
  });
  const opacity = interpolate(localFrame, [0, FADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ty = interpolate(enter, [0, 1], [40, 0]);
  const isStd = badge === 'standard';

  return (
    <div
      style={{
        flex: 1,
        opacity,
        transform: `translateY(${ty}px)`,
        backgroundColor: colors.white,
        border: `3px solid ${isStd ? colors.neutral200 : colors.lime500}`,
        borderRadius: 32,
        padding: '40px 44px 48px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        boxShadow: isStd ? 'none' : '0 30px 60px -30px rgba(102,198,28,0.35)',
        position: 'relative',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            backgroundColor: isStd ? colors.neutral600 : colors.lime500,
          }}
        />
        <div
          style={{
            ...typography.label,
            color: isStd ? colors.neutral600 : colors.lime500,
            fontSize: 24,
          }}
        >
          {label}
        </div>
      </div>
      {children}
    </div>
  );
};

const QuestionBlock: React.FC<{ question: string; appearFrame: number }> = ({
  question,
  appearFrame,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appearFrame, appearFrame + FADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        opacity,
        backgroundColor: colors.neutral200,
        borderRadius: 20,
        padding: '24px 28px',
        fontFamily: fonts.sans,
        fontSize: 30,
        lineHeight: 1.4,
        color: colors.black,
      }}
    >
      <span style={{ ...typography.label, color: colors.neutral600, marginRight: 12 }}>Q:</span>
      {question}
    </div>
  );
};

export const CoTComparison: React.FC<Props> = ({
  question = 'Roger has 5 tennis balls. He buys 2 cans of 3 balls each. How many does he have now?',
  wrongAnswer = '11',
  reasoningSteps = [
    'Roger started with 5 balls.',
    '2 cans × 3 balls = 6 new balls.',
    '5 + 6 = 11.',
  ],
  rightAnswer = '11',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Standard card timeline
  const stdCardFrame = 12;
  const stdQuestionFrame = 28;
  const stdAnswerFrame = 60;
  const stdMarkFrame = 90;

  // CoT card timeline
  const cotCardFrame = 100;
  const cotQuestionFrame = 116;
  const reasoningStartFrame = 148;
  const reasoningStagger = 50;
  const cotAnswerFrame = reasoningStartFrame + reasoningSteps.length * reasoningStagger + 16;
  const cotMarkFrame = cotAnswerFrame + 28;

  const winnerHighlight = interpolate(
    frame,
    [cotMarkFrame, cotMarkFrame + 24],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.white,
        padding: layout.safeMargin,
        display: 'flex',
        flexDirection: 'column',
        gap: 36,
      }}
    >
      <div style={{ opacity: headerOpacity, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={typography.label}>Chain of Thought · Google Research, 2022</div>
        <div
          style={{
            ...typography.title,
            fontSize: 64,
          }}
        >
          One change. Same model. <span style={{ color: colors.lime500 }}>Better answer.</span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', gap: 36 }}>
        {/* STANDARD */}
        <CardShell label="Standard prompting" badge="standard" appearFrame={stdCardFrame}>
          <QuestionBlock question={question} appearFrame={stdQuestionFrame} />

          <div style={{ flex: 1 }} />

          <div
            style={{
              opacity: interpolate(frame, [stdAnswerFrame, stdAnswerFrame + FADE], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '20px 28px',
              backgroundColor: '#FFF1F1',
              borderRadius: 20,
              border: '2px solid #F8C8C8',
            }}
          >
            <div style={{ ...typography.label, color: '#B33A3A', fontSize: 22 }}>Answer</div>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 56,
                fontWeight: 600,
                color: '#B33A3A',
                lineHeight: 1,
              }}
            >
              {wrongAnswer}
            </div>
            <div style={{ flex: 1 }} />
            <CrossMark
              progress={spring({
                frame: frame - stdMarkFrame,
                fps,
                config: { damping: 12, stiffness: 120 },
              })}
            />
          </div>

          <div
            style={{
              ...typography.caption,
              color: colors.neutral600,
              fontStyle: 'italic',
              opacity: interpolate(
                frame,
                [stdMarkFrame + 20, stdMarkFrame + 40],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              ),
            }}
          >
            Jumps straight to a conclusion.
          </div>
        </CardShell>

        {/* COT */}
        <CardShell label="Chain of Thought" badge="cot" appearFrame={cotCardFrame}>
          <QuestionBlock question={question} appearFrame={cotQuestionFrame} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {reasoningSteps.map((step, i) => (
              <ReasoningLine
                key={i}
                index={i}
                text={step}
                startFrame={reasoningStartFrame + i * reasoningStagger}
              />
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <div
            style={{
              opacity: interpolate(frame, [cotAnswerFrame, cotAnswerFrame + FADE], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              }),
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              padding: '20px 28px',
              backgroundColor: colors.lime200,
              borderRadius: 20,
              border: `2px solid ${colors.lime500}`,
              transform: `scale(${interpolate(winnerHighlight, [0, 1], [1, 1.02])})`,
            }}
          >
            <div style={{ ...typography.label, color: '#3F7A1F', fontSize: 22 }}>Answer</div>
            <div
              style={{
                fontFamily: fonts.serif,
                fontSize: 56,
                fontWeight: 600,
                color: '#1F4D0E',
                lineHeight: 1,
              }}
            >
              {rightAnswer}
            </div>
            <div style={{ flex: 1 }} />
            <CheckMark
              progress={spring({
                frame: frame - cotMarkFrame,
                fps,
                config: { damping: 12, stiffness: 120 },
              })}
            />
          </div>

          <div
            style={{
              ...typography.caption,
              color: '#3F7A1F',
              fontStyle: 'italic',
              opacity: interpolate(
                frame,
                [cotMarkFrame + 20, cotMarkFrame + 40],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              ),
            }}
          >
            Reasons through, then answers.
          </div>
        </CardShell>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

const ReasoningLine: React.FC<{ index: number; text: string; startFrame: number }> = ({
  index,
  text,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const visible = useTypewriter(text, startFrame, 1.1);
  const slide = interpolate(frame, [startFrame, startFrame + 14], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [startFrame, startFrame + 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        opacity,
        transform: `translateX(${slide}px)`,
      }}
    >
      <div
        style={{
          minWidth: 32,
          height: 32,
          borderRadius: 999,
          backgroundColor: colors.lime500,
          color: colors.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: fonts.sans,
          fontWeight: 700,
          fontSize: 18,
          marginTop: 4,
        }}
      >
        {index + 1}
      </div>
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 28,
          lineHeight: 1.45,
          color: colors.black,
        }}
      >
        {visible}
        {visible.length < text.length && <span style={{ color: colors.lime500 }}>▍</span>}
      </div>
    </div>
  );
};

const CheckMark: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="28" fill={colors.lime500} opacity={progress} />
    <path
      d="M16 31 L26 41 L44 21"
      stroke={colors.white}
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      strokeDasharray="50"
      strokeDashoffset={50 - progress * 50}
    />
  </svg>
);

const CrossMark: React.FC<{ progress: number }> = ({ progress }) => (
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="28" fill="#D44A4A" opacity={progress} />
    <path
      d="M19 19 L41 41"
      stroke={colors.white}
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="32"
      strokeDashoffset={32 - progress * 32}
    />
    <path
      d="M41 19 L19 41"
      stroke={colors.white}
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="32"
      strokeDashoffset={32 - Math.max(0, (progress - 0.4) / 0.6) * 32}
    />
  </svg>
);
