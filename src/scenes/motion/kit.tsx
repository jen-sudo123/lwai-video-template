import React from 'react';
import { Easing, interpolate } from 'remotion';
import { colors, fonts, typography } from '../../tokens';

// Shared pieces for the motion scenes (autonomy-dial, permission-board, icon-contrast,
// flow-diagram, evidence-cards, chat-correction, kinetic-line): ink line-drawing style from the
// Autonomy Dial video, lime as the only accent, every reveal on a scene-local frame.

export const INK = '#151515';
export const MUTED = '#8A8F86';
export const SOFT = '#F3F6EF';
export const LINE = '#DCE3D5';
export const WARN = '#C2410C';

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
export const easeOut = Easing.out(Easing.cubic);
export const easeInOut = Easing.inOut(Easing.cubic);

export const prog = (frame: number, at: number, dur = 14, easing = easeOut) =>
  interpolate(frame, [at, at + dur], [0, 1], { ...clamp, easing });

export const appear = (frame: number, at: number, y = 18, dur = 14): React.CSSProperties => {
  const p = prog(frame, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * y}px)` };
};

export const pop = (frame: number, at: number): React.CSSProperties => {
  const p = prog(frame, at, 12, Easing.out(Easing.back(2.2)));
  return { opacity: Math.min(1, p * 1.5), transform: `scale(${0.6 + 0.4 * p})` };
};

// Top-left label + serif title (+ optional small note), shared by every motion scene.
export const Header: React.FC<{
  frame: number;
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  note?: string;
  noteFrom?: number;
  width?: number;
  center?: boolean;
}> = ({ frame, label, title, titleFrom = 0, titleHighlight, note, noteFrom = 0, width = 1200, center }) => {
  const parts = title && titleHighlight && title.includes(titleHighlight) ? title.split(titleHighlight) : null;
  return (
    <div style={{ position: 'absolute', left: center ? 0 : 80, right: center ? 0 : undefined, top: 70, width: center ? undefined : width, textAlign: center ? 'center' : 'left' }}>
      {label && <div style={{ ...typography.label, ...appear(frame, Math.max(0, titleFrom - 6), 10) }}>{label}</div>}
      {title && (
        <div style={{ ...typography.title, fontSize: 60, color: INK, marginTop: 14, whiteSpace: 'pre-line', ...appear(frame, titleFrom) }}>
          {parts ? <>{parts[0]}<span style={{ color: colors.lime500 }}>{titleHighlight}</span>{parts[1]}</> : title}
        </div>
      )}
      {note && <div style={{ fontFamily: fonts.sans, fontSize: 26, color: MUTED, marginTop: 14, ...appear(frame, noteFrom) }}>{note}</div>}
    </div>
  );
};

type IconName = 'check' | 'lock' | 'plug' | 'user' | 'clock' | 'x' | 'minus' | 'alert' | 'arrow';

export const Icon: React.FC<{ name: IconName; size?: number; color?: string; stroke?: number }> = ({ name, size = 28, color = INK, stroke = 2.4 }) => {
  const p = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'check' && <path d="M5 12.5l4.2 4.2L19 7" {...p} />}
      {name === 'x' && <path d="M6 6l12 12M18 6L6 18" {...p} />}
      {name === 'minus' && <path d="M6 12h12" {...p} />}
      {name === 'lock' && (<><rect x="5" y="10.5" width="14" height="10" rx="2" {...p} /><path d="M8 10.5V7.5a4 4 0 018 0v3" {...p} /></>)}
      {name === 'plug' && (<><path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 01-10 0V8zM12 16v5" {...p} /><path d="M4 20L20 4" {...p} /></>)}
      {name === 'user' && (<><circle cx="12" cy="8" r="3.6" {...p} /><path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" {...p} /></>)}
      {name === 'clock' && (<><circle cx="12" cy="12" r="8.5" {...p} /><path d="M12 7.5V12l3 2" {...p} /></>)}
      {name === 'alert' && (<><path d="M12 4l9 16H3L12 4z" {...p} /><path d="M12 10v4.5M12 17.3v.2" {...p} /></>)}
      {name === 'arrow' && <path d="M5 12h14M13 6l6 6-6 6" {...p} />}
    </svg>
  );
};

// A hand-drawn-feeling strike line that draws across its parent.
export const Strike: React.FC<{ frame: number; at: number; color?: string }> = ({ frame, at, color = WARN }) => {
  const p = prog(frame, at, 10);
  if (p <= 0) return null;
  return (
    <div style={{ position: 'absolute', left: -6, top: '52%', height: 4, width: `calc(${p * 100}% + 12px)`, backgroundColor: color, borderRadius: 2, transform: 'rotate(-1.5deg)' }} />
  );
};

// Lime marker swipe behind inline text.
export const Marker: React.FC<{ frame: number; at: number; children: React.ReactNode }> = ({ frame, at, children }) => {
  const p = prog(frame, at, 12, easeInOut);
  return (
    <span style={{ backgroundImage: `linear-gradient(${colors.lime200}, ${colors.lime200})`, backgroundRepeat: 'no-repeat', backgroundPosition: '0 88%', backgroundSize: `${p * 100}% 42%`, padding: '0 4px' }}>
      {children}
    </span>
  );
};
