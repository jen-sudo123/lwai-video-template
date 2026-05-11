import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

// Mock chat-UI panel that shows a "Thinking…" disclosure expanding to reveal
// reasoning trace, then the polished answer. Sits on the left; right column
// has callouts that pop in as the reasoning streams.

type Trace = { tool?: string; text: string };

type Props = {
  userPrompt?: string;
  traces?: Trace[];
  finalAnswer?: string;
  callouts?: string[];
  // Scene-local frame when the collapsed "Thought for Xs" row appears (default 36).
  thinkingAppearFrame?: number;
};

const PANEL_W = 980;
const FADE = 12;

export const ThinkingTraceUI: React.FC<Props> = ({
  userPrompt = 'Size the US enterprise market for our category.',
  traces = [
    { tool: 'web', text: 'Searching: "US enterprise SaaS market 2024 size"' },
    { tool: 'reason', text: 'Three reports — pick the most recent. Two disagree by 30%.' },
    { tool: 'reason', text: 'Apply category filter — only enterprise tier counts.' },
    { tool: 'compute', text: 'Estimate: $42B–$58B range, ~$48B midpoint.' },
  ],
  finalAnswer = '~$48B (range $42B–$58B, midpoint of three 2024 reports).',
  callouts = [
    'What sources did it pull?',
    'Where did the numbers diverge?',
    'What did it assume?',
  ],
  thinkingAppearFrame = 36,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Timeline — derived from thinkingAppearFrame
  const userBubbleAt = Math.max(0, thinkingAppearFrame - 24);
  const collapsedThinkingAt = thinkingAppearFrame;
  const expandAt = thinkingAppearFrame + 48;
  const traceStart = expandAt + 18;
  const traceStagger = 32;
  const lastTrace = traceStart + (traces.length - 1) * traceStagger;
  const answerAt = lastTrace + 36;
  const calloutStart = expandAt + 24;
  const calloutStagger = 50;

  // Disclosure expand animation
  const expandProgress = spring({
    frame: frame - expandAt,
    fps,
    config: { damping: 18, stiffness: 110, mass: 0.9 },
  });
  const traceMaxHeight = interpolate(expandProgress, [0, 1], [0, 460]);

  // Chevron rotation
  const chevronRot = interpolate(expandProgress, [0, 1], [0, 90]);

  const midX = 1920 / 2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.neutral200,
      }}
    >
      {/* Left column — label + title, vertically centred */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: midX - layout.safeMargin - 60,
          opacity: headerOpacity,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={typography.label}>Way 2</div>
        <div style={{ ...typography.title, fontSize: 56, lineHeight: 1.15 }}>
          Open the thinking section.
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 32, fontWeight: 400, color: colors.neutral600, lineHeight: 1.4 }}>
          Expand it. <span style={{ color: colors.lime500 }}>Then check it.</span>
        </div>
      </div>

      {/* Right column — chat panel, vertically centred */}
      <div
        style={{
          position: 'absolute',
          right: layout.safeMargin,
          top: '50%',
          transform: 'translateY(-50%)',
          width: PANEL_W,
        }}
      >
        {/* Chat panel */}
        <div
          style={{
            width: PANEL_W,
            backgroundColor: colors.white,
            borderRadius: 28,
            boxShadow: '0 30px 80px -40px rgba(0,0,0,0.25)',
            padding: 36,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Window dots */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 4 }}>
            <Dot color="#FF5F57" />
            <Dot color="#FEBC2E" />
            <Dot color="#28C840" />
            <div style={{ flex: 1 }} />
            <div style={{ ...typography.label, color: colors.neutral600, fontSize: 18 }}>
              chat.app
            </div>
          </div>

          {/* User message */}
          <Bubble appearFrame={userBubbleAt} align="right">
            <div style={{ fontFamily: fonts.sans, fontSize: 24, color: colors.black }}>
              {userPrompt}
            </div>
          </Bubble>

          {/* Thinking disclosure */}
          <div
            style={{
              opacity: interpolate(
                frame,
                [collapsedThinkingAt, collapsedThinkingAt + FADE],
                [0, 1],
                { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
              ),
              border: `2px solid ${colors.lime500}`,
              borderRadius: 18,
              backgroundColor: '#FAFFF1',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '18px 22px',
                borderBottom: expandProgress > 0.05 ? `1px solid ${colors.neutral200}` : 'none',
              }}
            >
              <ThinkingDots active={frame >= collapsedThinkingAt && frame < expandAt + 10} />
              <div
                style={{
                  fontFamily: fonts.sans,
                  fontSize: 22,
                  fontWeight: 600,
                  color: '#3F7A1F',
                }}
              >
                Thought for {Math.max(1, Math.round((traces.length * traceStagger) / 30))}s
              </div>
              <div style={{ flex: 1 }} />
              <div
                style={{
                  transform: `rotate(${chevronRot}deg)`,
                  color: colors.lime500,
                  fontSize: 22,
                }}
              >
                ▶
              </div>
            </div>

            <div
              style={{
                maxHeight: traceMaxHeight,
                overflow: 'hidden',
                transition: 'none',
              }}
            >
              <div
                style={{
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}
              >
                {traces.map((t, i) => (
                  <TraceLine
                    key={i}
                    trace={t}
                    appearFrame={traceStart + i * traceStagger}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Final answer bubble */}
          <Bubble appearFrame={answerAt} align="left">
            <div style={{ ...typography.label, color: colors.neutral600, fontSize: 18, marginBottom: 6 }}>
              Answer
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 24, color: colors.black, lineHeight: 1.4 }}>
              {finalAnswer}
            </div>
          </Bubble>
        </div>
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

const Dot: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ width: 14, height: 14, borderRadius: 999, backgroundColor: color }} />
);

const Bubble: React.FC<{
  appearFrame: number;
  align: 'left' | 'right';
  children: React.ReactNode;
}> = ({ appearFrame, align, children }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appearFrame, appearFrame + FADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ty = interpolate(frame, [appearFrame, appearFrame + FADE], [12, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        opacity,
        transform: `translateY(${ty}px)`,
        alignSelf: align === 'right' ? 'flex-end' : 'flex-start',
        maxWidth: '88%',
        padding: '18px 22px',
        borderRadius: 18,
        backgroundColor: align === 'right' ? colors.neutral200 : colors.white,
        border: align === 'left' ? `1px solid ${colors.neutral200}` : 'none',
      }}
    >
      {children}
    </div>
  );
};

const ThinkingDots: React.FC<{ active: boolean }> = ({ active }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', height: 22 }}>
      {[0, 1, 2].map((i) => {
        const phase = (frame - i * 4) % 30;
        const scale = active
          ? interpolate(phase, [0, 7, 14, 30], [0.5, 1.2, 0.5, 0.5], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          : 1;
        return (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              backgroundColor: colors.lime500,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </div>
  );
};

const TraceLine: React.FC<{ trace: Trace; appearFrame: number }> = ({ trace, appearFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [appearFrame, appearFrame + FADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const slide = interpolate(frame, [appearFrame, appearFrame + 16], [10, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        opacity,
        transform: `translateX(${slide}px)`,
      }}
    >
      {trace.tool && <ToolPill tool={trace.tool} />}
      <div
        style={{
          fontFamily: fonts.sans,
          fontSize: 20,
          color: colors.black,
          lineHeight: 1.5,
          flex: 1,
        }}
      >
        {trace.text}
      </div>
    </div>
  );
};

const ToolPill: React.FC<{ tool: string }> = ({ tool }) => {
  const palette: Record<string, { bg: string; fg: string; icon: string }> = {
    web: { bg: '#E8F1FF', fg: '#2A66C9', icon: '🌐' },
    reason: { bg: colors.lime200, fg: '#3F7A1F', icon: '🧠' },
    compute: { bg: '#FFF3D9', fg: '#9A7300', icon: '⚙' },
  };
  const p = palette[tool] || { bg: colors.neutral200, fg: colors.neutral600, icon: '·' };
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 12px',
        backgroundColor: p.bg,
        color: p.fg,
        borderRadius: 999,
        fontFamily: fonts.sans,
        fontSize: 16,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        marginTop: 2,
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: 14 }}>{p.icon}</span>
      {tool}
    </div>
  );
};

const Callout: React.FC<{ text: string; appearFrame: number; fps: number }> = ({
  text,
  appearFrame,
  fps,
}) => {
  const frame = useCurrentFrame();
  const pop = spring({
    frame: frame - appearFrame,
    fps,
    config: { damping: 12, stiffness: 110, mass: 0.8 },
  });
  const opacity = interpolate(frame - appearFrame, [0, FADE], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(pop, [0, 1], [0.85, 1]);
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        transformOrigin: 'left center',
        backgroundColor: colors.white,
        borderLeft: `5px solid ${colors.lime500}`,
        padding: '20px 26px',
        borderRadius: 12,
        boxShadow: '0 12px 30px -20px rgba(0,0,0,0.15)',
        fontFamily: fonts.serif,
        fontSize: 32,
        lineHeight: 1.25,
        color: colors.black,
      }}
    >
      {text}
    </div>
  );
};
