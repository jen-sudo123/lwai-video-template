import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors, fonts, typography } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { INK, MUTED, Marker, Strike, appear } from './kit';

// Words land one by one on their spoken word, with per-word emphasis:
// lime (accent colour), marker (lime highlighter swipe), strike (crossed out), muted (grey).

export type KineticWord = { text: string; at: number; style?: 'lime' | 'marker' | 'strike' | 'muted'; strikeAt?: number };

export type KineticLineProps = {
  label?: string;
  labelFrom?: number;
  lines: KineticWord[][];
  fontSize?: number;
  durationInFrames: number;
};

export const KineticLine: React.FC<KineticLineProps> = ({ label, labelFrom = 0, lines, fontSize = 84 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 1600, textAlign: 'center' }}>
        {label && <div style={{ ...typography.label, marginBottom: 36, ...appear(frame, labelFrom, 10) }}>{label}</div>}
        {lines.map((words, li) => (
          <div key={li} style={{ fontFamily: fonts.serif, fontSize, lineHeight: 1.25, letterSpacing: '-0.03em', color: INK }}>
            {words.map((w, wi) => (
              <span key={wi} style={{ display: 'inline-block', marginRight: '0.26em', position: 'relative', ...appear(frame, w.at, 22, 10),
                color: w.style === 'lime' ? colors.lime500 : w.style === 'muted' ? MUTED : INK }}>
                {w.style === 'marker' ? <Marker frame={frame} at={w.at + 4}>{w.text}</Marker> : w.text}
                {(w.style === 'strike' || w.strikeAt !== undefined) && <Strike frame={frame} at={w.strikeAt ?? w.at + 8} />}
              </span>
            ))}
          </div>
        ))}
      </div>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
