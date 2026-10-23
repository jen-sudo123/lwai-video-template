import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { Header, INK, LINE, MUTED, SOFT, WARN, Strike, appear, clamp, prog } from './kit';

// A short chat: the user's request, an agent reply that types out and gets struck through
// (the wrong behaviour), then the reply it should give instead.

export type ChatCorrectionProps = {
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  agentName?: string;
  question: { text: string; from: number };
  wrong: { text: string; from: number; to: number; strikeAt: number; tag?: string };
  right: { text: string; from: number; to: number; tag?: string };
  durationInFrames: number;
};

const typed = (text: string, frame: number, from: number, to: number) =>
  text.slice(0, Math.round(interpolate(frame, [from, to], [0, text.length], clamp)));

export const ChatCorrection: React.FC<ChatCorrectionProps> = ({ label, title, titleFrom = 0, titleHighlight, agentName = 'Agent', question, wrong, right }) => {
  const frame = useCurrentFrame();
  const struck = prog(frame, wrong.strikeAt, 10);
  const bubble = (from: number): React.CSSProperties => ({ ...appear(frame, from, 16, 12) });
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Header frame={frame} label={label} title={title} titleFrom={titleFrom} titleHighlight={titleHighlight} width={1700} />
      <div style={{ position: 'absolute', left: 360, right: 360, top: 300, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ alignSelf: 'flex-end', maxWidth: 820, backgroundColor: '#E8F6DA', borderRadius: '22px 22px 6px 22px', padding: '20px 28px', fontFamily: fonts.sans, fontSize: 30, color: INK, ...bubble(question.from) }}>
          {question.text}
        </div>
        <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 8, opacity: 1 - 0.45 * struck, ...bubble(wrong.from) }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 20, color: MUTED, fontWeight: 600 }}>{agentName}</div>
          <div style={{ position: 'relative', maxWidth: 820, backgroundColor: SOFT, border: `1.5px solid ${LINE}`, borderRadius: '6px 22px 22px 22px', padding: '20px 28px', fontFamily: fonts.sans, fontSize: 30, color: INK }}>
            <span style={{ position: 'relative' }}>
              {typed(wrong.text, frame, wrong.from, wrong.to)}
              <Strike frame={frame} at={wrong.strikeAt} />
            </span>
            {wrong.tag && (
              <div style={{ position: 'absolute', right: -14, top: -18, transform: `rotate(6deg) scale(${0.6 + 0.4 * struck})`, opacity: struck, backgroundColor: '#fff', border: `3px solid ${WARN}`, color: WARN,
                borderRadius: 10, padding: '4px 14px', fontFamily: fonts.sans, fontWeight: 800, fontSize: 22, letterSpacing: '0.08em' }}>{wrong.tag}</div>
            )}
          </div>
        </div>
        <div style={{ alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: 8, ...bubble(right.from) }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 20, color: MUTED, fontWeight: 600 }}>{agentName}</div>
          <div style={{ position: 'relative', maxWidth: 900, backgroundColor: '#fff', border: `3px solid ${colors.lime500}`, borderRadius: '6px 22px 22px 22px', padding: '20px 28px', fontFamily: fonts.sans, fontSize: 30, color: INK, boxShadow: '0 12px 30px rgba(20,30,15,0.08)' }}>
            {typed(right.text, frame, right.from, right.to)}
            {right.tag && (
              <div style={{ position: 'absolute', right: -14, top: -18, transform: 'rotate(-5deg)', opacity: prog(frame, right.to, 10), backgroundColor: colors.lime500, color: '#fff',
                borderRadius: 10, padding: '4px 14px', fontFamily: fonts.sans, fontWeight: 800, fontSize: 22, letterSpacing: '0.08em' }}>{right.tag}</div>
            )}
          </div>
        </div>
      </div>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
