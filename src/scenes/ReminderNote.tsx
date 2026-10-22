import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

// "Quick reminder" recap: title on the left, a reminder note on the right whose items tick
// off one by one on the VO words that name them, then a dark "next" bar slides in under the
// note and an optional serif kicker lands under the title. All frames are scene-local.

export type ReminderNoteProps = {
  label: string;
  title: string;
  noteTitle: string;
  noteMeta?: string;
  items: Array<{ text: string; from: number }>;
  next?: { label: string; text: string; from: number };
  kicker?: { text: string; from: number };
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.out(Easing.cubic);
const INK = '#14180F';
const MUTED = '#5E6458';
const LINE = '#E3E8DC';

const BellIcon: React.FC<{ ring: number }> = ({ ring }) => (
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${ring}deg)`, transformOrigin: '50% 10%' }}>
    <path d="M6 9a6 6 0 1 1 12 0c0 4.2 1.6 6 2.4 6.8.3.3.1.7-.3.7H3.9c-.4 0-.6-.4-.3-.7C4.4 15 6 13.2 6 9Z"
      stroke={colors.titleGreen} strokeWidth="1.7" strokeLinejoin="round" />
    <path d="M9.8 19a2.3 2.3 0 0 0 4.4 0" stroke={colors.titleGreen} strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

const CheckBox: React.FC<{ p: number }> = ({ p }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" style={{ flexShrink: 0 }}>
    <rect x="2" y="2" width="40" height="40" rx="10"
      fill={p > 0 ? colors.lime500 : colors.white} stroke={p > 0 ? colors.lime500 : LINE} strokeWidth="3"
      style={{ transition: 'none' }} />
    <path d="M12 23 l7 7 l14 -15" fill="none" stroke={colors.white} strokeWidth="4.5" strokeLinecap="round"
      strokeLinejoin="round" strokeDasharray="34" strokeDashoffset={34 * (1 - p)} />
  </svg>
);

export const ReminderNote: React.FC<ReminderNoteProps> = ({ label, title, noteTitle, noteMeta, items, next, kicker }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: ease });
  const noteIn = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 120 } });
  const ring = frame < 40 ? Math.sin(frame / 2.2) * 14 * Math.max(0, 1 - frame / 40) : 0;
  const nextIn = next ? spring({ frame: frame - next.from, fps, config: { damping: 18, stiffness: 110 } }) : 0;
  const kickerIn = kicker ? interpolate(frame, [kicker.from, kicker.from + 16], [0, 1], { ...clamp, easing: ease }) : 0;
  const underline = kicker ? interpolate(frame, [kicker.from + 8, kicker.from + 28], [0, 1], { ...clamp, easing: ease }) : 0;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Left column: label, title, kicker */}
      <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, width: 700, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 28, opacity: titleIn, transform: `translateY(${(1 - titleIn) * 14}px)` }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 24, letterSpacing: '0.14em', color: colors.neutral600 }}>
          {label}
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 76, lineHeight: 1.1, letterSpacing: '-0.04em', color: colors.black,
          whiteSpace: 'pre-line' }}>
          {title}
        </div>
        {kicker && (
          <div style={{ marginTop: 18, opacity: kickerIn, transform: `translateY(${(1 - kickerIn) * 10}px)` }}>
            <span style={{ fontFamily: fonts.serif, fontSize: 44, lineHeight: 1.25, letterSpacing: '-0.03em', color: colors.black,
              backgroundImage: `linear-gradient(${colors.lime200}, ${colors.lime200})`, backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 88%', backgroundSize: `${underline * 100}% 34%` }}>
              {kicker.text}
            </span>
          </div>
        )}
      </div>

      {/* Right column: the reminder note and the next bar */}
      <div style={{ position: 'absolute', left: 900, right: 80, top: 0, bottom: 0, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', gap: 28 }}>
        <div style={{ position: 'relative', backgroundColor: colors.white, borderRadius: 24, border: `2px solid ${LINE}`,
          boxShadow: '0 24px 60px rgba(40, 60, 20, 0.12)', padding: '40px 48px 44px',
          opacity: Math.min(1, noteIn * 1.4), transform: `translateY(${(1 - noteIn) * 40}px) scale(${0.96 + noteIn * 0.04})` }}>
          {/* pin */}
          <div style={{ position: 'absolute', top: -14, left: '50%', marginLeft: -14, width: 28, height: 28, borderRadius: '50%',
            backgroundColor: colors.lime500, boxShadow: '0 4px 10px rgba(60, 110, 20, 0.35)', border: `4px solid ${colors.white}` }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, paddingBottom: 26, borderBottom: `2px dashed ${LINE}` }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, backgroundColor: colors.lime200, display: 'flex',
              alignItems: 'center', justifyContent: 'center' }}>
              <BellIcon ring={ring} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: fonts.serif, fontSize: 40, letterSpacing: '-0.03em', color: INK, lineHeight: 1.15 }}>{noteTitle}</span>
              {noteMeta && <span style={{ fontFamily: fonts.sans, fontSize: 24, color: MUTED, marginTop: 4 }}>{noteMeta}</span>}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26, marginTop: 30 }}>
            {items.map((it, i) => {
              const p = interpolate(frame, [it.from, it.from + 12], [0, 1], { ...clamp, easing: ease });
              const textOn = interpolate(frame, [it.from - 4, it.from + 8], [0.35, 1], clamp);
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                  <CheckBox p={p} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 34, lineHeight: 1.3, color: INK, opacity: textOn }}>{it.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {next && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, backgroundColor: INK, borderRadius: 20, padding: '26px 34px',
            opacity: nextIn, transform: `translateY(${(1 - nextIn) * 30}px)` }}>
            <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 22, letterSpacing: '0.14em', color: colors.lime500,
              whiteSpace: 'nowrap' }}>{next.label}</span>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M5 12h13M13 6l6 6-6 6" stroke={colors.white} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: fonts.sans, fontSize: 32, lineHeight: 1.3, color: colors.white }}>{next.text}</span>
          </div>
        )}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
