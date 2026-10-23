import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { Header, INK, LINE, MUTED, SOFT, WARN, appear, pop, prog } from './kit';

// Source snippets (meeting notes, tracker rows) as cards whose fields can flag as missing or
// conflicting on cue, with optional markers between cards (e.g. "≠").

export type EvidenceCardsProps = {
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  note?: string;
  noteFrom?: number;
  cards: Array<{
    from: number;
    source: string;
    heading: string;
    fields: Array<{ name: string; value: string; flag?: 'missing' | 'conflict'; flagAt?: number }>;
  }>;
  between?: Array<{ after: number; text: string; from: number }>;
  durationInFrames: number;
};

const CARD_W = 520;
const GAP = 80;

export const EvidenceCards: React.FC<EvidenceCardsProps> = ({ label, title, titleFrom = 0, titleHighlight, note, noteFrom, cards, between = [] }) => {
  const frame = useCurrentFrame();
  const total = cards.length * CARD_W + (cards.length - 1) * GAP;
  const x0 = (1920 - total) / 2;
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Header frame={frame} label={label} title={title} titleFrom={titleFrom} titleHighlight={titleHighlight} note={note} noteFrom={noteFrom} width={1700} />
      {cards.map((c, i) => (
        <div key={i} style={{ position: 'absolute', left: x0 + i * (CARD_W + GAP), top: 400, width: CARD_W, borderRadius: 18, border: `2px solid ${LINE}`, backgroundColor: '#fff',
          boxShadow: '0 16px 40px rgba(20,30,15,0.10)', overflow: 'hidden', ...appear(frame, c.from, 22, 16) }}>
          <div style={{ backgroundColor: SOFT, padding: '18px 26px', borderBottom: `2px solid ${LINE}`, fontFamily: fonts.sans, fontSize: 20, letterSpacing: '0.12em', fontWeight: 700, color: MUTED }}>
            {c.source}
          </div>
          <div style={{ padding: '22px 26px 10px' }}>
            <div style={{ fontFamily: fonts.serif, fontSize: 32, color: INK, lineHeight: 1.25 }}>{c.heading}</div>
            {c.fields.map((f, j) => {
              const on = f.flag && f.flagAt !== undefined ? prog(frame, f.flagAt, 10) : 0;
              const missing = f.flag === 'missing';
              const pulse = on > 0 ? 1 + 0.05 * Math.sin((frame - (f.flagAt ?? 0)) / 3) * Math.max(0, 1 - (frame - (f.flagAt ?? 0)) / 30) : 1;
              return (
                <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderTop: j ? `1.5px solid ${LINE}` : 'none', marginTop: j ? 0 : 14 }}>
                  <div style={{ width: 120, fontFamily: fonts.sans, fontSize: 24, color: MUTED }}>{f.name}</div>
                  <div style={{ flex: 1, fontFamily: fonts.sans, fontSize: 28, color: INK, padding: '6px 12px', borderRadius: 8, transform: `scale(${pulse})`, transformOrigin: 'left center',
                    backgroundColor: on ? (missing ? `rgba(194,65,12,${0.12 * on})` : `rgba(102,198,28,${0.25 * on})`) : 'transparent',
                    outline: on ? `2.5px ${missing ? 'dashed' : 'solid'} ${missing ? WARN : colors.lime500}` : 'none' }}>
                    {f.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      {between.map((b, i) => (
        <div key={i} style={{ position: 'absolute', left: x0 + (b.after + 1) * CARD_W + b.after * GAP, width: GAP, top: 520, textAlign: 'center', fontFamily: fonts.serif, fontSize: 72, color: WARN, ...pop(frame, b.from) }}>
          {b.text}
        </div>
      ))}
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

