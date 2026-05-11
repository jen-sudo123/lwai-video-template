import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { colors, typography, layout, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

const FADE_FRAMES = 15;

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
  tags?: string[];
  quality?: 'weak' | 'standard' | 'strong';
};

type ChatThreadProps = {
  label?: string;
  messages: ChatMessage[];
  // value = number of messages visible at that frame offset
  highlights?: Array<{ from: number; value: number }>;
};

function qualityBorderColor(quality?: 'weak' | 'standard' | 'strong'): string {
  if (quality === 'weak') return '#D1D5DB';
  if (quality === 'strong') return colors.lime500;
  return colors.neutral200;
}

// A cinematic chat UI with bottom-anchored messages and per-message fade-in.
// Messages reveal progressively via the highlights schedule.
// User bubbles: light-green, right-aligned. AI bubbles: white with quality left-border.
export const ChatThread: React.FC<ChatThreadProps> = ({ label, messages, highlights = [] }) => {
  const frame = useCurrentFrame();

  const sorted = [...highlights].sort((a, b) => a.from - b.from);

  // How many messages are visible right now
  const activeIdx = sorted.map((_, i) => i).reverse().find(i => frame >= sorted[i].from) ?? -1;
  const visibleCount = activeIdx >= 0 ? sorted[activeIdx].value : 0;

  // The frame at which message i becomes visible
  function revealFrame(msgIndex: number): number {
    const entry = sorted.find(h => h.value > msgIndex);
    return entry ? entry.from : 0;
  }

  const visibleMessages = messages.slice(0, visibleCount);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Scene label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            top: layout.safeMargin,
            left: layout.safeMargin,
            right: layout.safeMargin,
            ...typography.label,
            color: colors.neutral600,
          }}
        >
          {label}
        </div>
      )}

      {/* Messages — centred column, anchored to the bottom */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin + 160,
          right: layout.safeMargin + 160,
          top: label ? layout.safeMargin + 64 : layout.safeMargin,
          bottom: layout.safeMargin + 56,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          gap: 20,
          overflow: 'hidden',
        }}
      >
        {visibleMessages.map((msg, i) => {
          const isLast = i === visibleMessages.length - 1;
          const rf = revealFrame(i);

          const opacity = isLast
            ? interpolate(frame, [rf, rf + FADE_FRAMES], [0, 1], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 1;

          const translateY = isLast
            ? interpolate(frame, [rf, rf + FADE_FRAMES], [18, 0], {
                extrapolateLeft: 'clamp',
                extrapolateRight: 'clamp',
              })
            : 0;

          if (msg.role === 'user') {
            return (
              <div
                key={i}
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                {/* Constraint tags */}
                {msg.tags && msg.tags.length > 0 && (
                  <div
                    style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 10,
                      flexWrap: 'wrap',
                      justifyContent: 'flex-end',
                    }}
                  >
                    {msg.tags.map((tag, ti) => (
                      <div
                        key={ti}
                        style={{
                          backgroundColor: colors.lime500,
                          color: colors.black,
                          fontFamily: fonts.sans,
                          fontSize: 18,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          padding: '4px 14px',
                          borderRadius: 100,
                        }}
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
                {/* User bubble */}
                <div
                  style={{
                    backgroundColor: '#F0F9E8',
                    borderRadius: '12px 12px 4px 12px',
                    padding: '18px 26px',
                    maxWidth: '62%',
                    fontFamily: fonts.sans,
                    fontSize: 28,
                    lineHeight: 1.55,
                    color: colors.black,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            );
          }

          // assistant
          const borderColor = qualityBorderColor(msg.quality);
          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `translateY(${translateY}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  backgroundColor: colors.white,
                  border: `1px solid ${colors.neutral200}`,
                  borderLeft: `4px solid ${borderColor}`,
                  borderRadius: '4px 12px 12px 12px',
                  padding: '18px 26px',
                  maxWidth: '62%',
                  fontFamily: fonts.sans,
                  fontSize: 28,
                  lineHeight: 1.55,
                  color: msg.quality === 'weak' ? colors.neutral600 : colors.black,
                  whiteSpace: 'pre-line',
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
