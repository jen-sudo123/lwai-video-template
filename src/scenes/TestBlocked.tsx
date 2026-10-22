import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import * as Outline from '@heroicons/react/24/outline';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

// "A blocked test is information": three columns read left to right. A test card runs and
// turns Blocked with its error message; the likely causes tick in (and "the agent itself" is
// ruled out); the exact error is copied into a record card, which then routes to the people
// who can fix it. All frames are scene-local.

export type TestBlockedProps = {
  label: string;
  title: string;                         // one line per \n
  titleTimings?: number[];
  test: { label: string; prompt: string; error: string; blockedFrom: number };
  causesLabel: string;
  causes: Array<{ text: string; icon?: string; from: number }>;
  notCause?: { text: string; from: number };
  record: { label: string; from: number; caption?: string };
  routesLabel: string;
  routes: Array<{ text: string; icon?: string; from: number }>;
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.out(Easing.cubic);
const INK = '#14180F';
const MUTED = '#5E6458';
const LINE = '#DDE3D6';
const RED = '#B42318';
const RED_SOFT = '#FDECEA';

const TOP = 330, COL_H = 560;
const C1 = { x: 80, w: 520 }, C2 = { x: 690, w: 500 }, C3 = { x: 1280, w: 560 };

const icon = (name: string | undefined, color: string, size = 30) => {
  const I = name ? (Outline as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[name] : undefined;
  return I ? <I style={{ width: size, height: size, color, strokeWidth: 1.6 }} /> : null;
};

const Eyebrow: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color }) => (
  <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: '0.14em', color: color ?? colors.neutral600 }}>{children}</div>
);

export const TestBlocked: React.FC<TestBlockedProps> = ({
  label, title, titleTimings, test, causesLabel, causes, notCause, record, routesLabel, routes,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (from: number) => spring({ frame: frame - from, fps, config: { damping: 16, stiffness: 140 } });
  const fade = (from: number, d = 14) => interpolate(frame, [from, from + d], [0, 1], { ...clamp, easing: ease });

  const blocked = fade(test.blockedFrom, 10);
  const col2In = fade(causes[0]?.from ?? 0);
  const col3In = fade(record.from);
  // Error text "copies" into the record card.
  const typed = Math.floor(interpolate(frame, [record.from + 8, record.from + 38], [0, test.error.length], clamp));

  const arrow = (x: number, on: number) => (
    <div style={{ position: 'absolute', left: x, top: TOP + COL_H / 2 - 22, opacity: on, transform: `translateX(${(1 - on) * -10}px)` }}>
      {icon('ChevronRightIcon', colors.lime500, 44)}
    </div>
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Header */}
      <div style={{ position: 'absolute', left: 80, top: 96, right: 80 }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 24, letterSpacing: '0.14em', color: colors.neutral600,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp) }}>{label}</div>
        <div style={{ marginTop: 14, fontFamily: fonts.serif, fontSize: 60, lineHeight: 1.12, letterSpacing: '-0.04em', color: colors.black }}>
          {title.split('\n').map((l, i) => {
            const t0 = titleTimings?.[i] ?? 0;
            const o = fade(t0, 16);
            return <div key={i} style={{ opacity: o, transform: `translateY(${(1 - o) * 12}px)` }}>{l}</div>;
          })}
        </div>
      </div>

      {/* Column 1: the test */}
      <div style={{ position: 'absolute', left: C1.x, top: TOP, width: C1.w, height: COL_H, borderRadius: 22, padding: 34,
        backgroundColor: colors.white, border: `2px solid ${blocked > 0.5 ? RED : LINE}`, boxShadow: '0 18px 48px rgba(40, 60, 20, 0.08)',
        opacity: fade(0, 18), display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Eyebrow>{test.label}</Eyebrow>
          <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: '0.08em', borderRadius: 999,
            padding: '6px 14px', color: blocked > 0.5 ? RED : MUTED, backgroundColor: blocked > 0.5 ? RED_SOFT : '#F2F5EE',
            display: 'flex', alignItems: 'center', gap: 8 }}>
            {blocked > 0.5 ? icon('NoSymbolIcon', RED, 22) : icon('ArrowPathIcon', MUTED, 22)}
            {blocked > 0.5 ? 'BLOCKED' : 'RUNNING'}
          </span>
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 32, lineHeight: 1.25, letterSpacing: '-0.02em', color: INK }}>{test.prompt}</div>
        <div style={{ marginTop: 'auto', borderRadius: 14, padding: '20px 22px', backgroundColor: RED_SOFT, border: `2px solid rgba(180, 35, 24, 0.25)`,
          opacity: blocked, transform: `translateY(${(1 - blocked) * 10}px)`, display: 'flex', gap: 14 }}>
          <span style={{ flexShrink: 0 }}>{icon('ExclamationTriangleIcon', RED, 30)}</span>
          <span style={{ fontFamily: 'monospace', fontSize: 23, lineHeight: 1.4, color: RED }}>{test.error}</span>
        </div>
      </div>
      {arrow(C1.x + C1.w + 22, col2In)}

      {/* Column 2: likely causes */}
      <div style={{ position: 'absolute', left: C2.x, top: TOP, width: C2.w, height: COL_H, opacity: col2In, display: 'flex',
        flexDirection: 'column', gap: 16, paddingTop: 8 }}>
        <Eyebrow>{causesLabel}</Eyebrow>
        {causes.map((c, i) => {
          const p = pop(c.from);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, height: 92, padding: '0 24px', borderRadius: 18,
              backgroundColor: colors.white, border: `2px solid ${colors.lime500}`, boxShadow: '0 10px 26px rgba(40, 60, 20, 0.08)',
              opacity: Math.min(1, p * 1.3), transform: `translateX(${(1 - p) * -30}px)` }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lime200 }}>
                {icon(c.icon, colors.titleGreen, 30)}
              </div>
              <span style={{ fontFamily: fonts.serif, fontSize: 36, letterSpacing: '-0.02em', color: INK }}>{c.text}</span>
            </div>
          );
        })}
        {notCause && (() => {
          const p = pop(notCause.from);
          const strike = fade(notCause.from + 6, 12);
          return (
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, height: 92, padding: '0 24px', borderRadius: 18,
              border: `2px dashed ${LINE}`, opacity: Math.min(1, p * 1.3) * 0.85, transform: `translateX(${(1 - p) * -30}px)` }}>
              <div style={{ width: 54, height: 54, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F5EE' }}>
                {icon('XMarkIcon', MUTED, 30)}
              </div>
              <span style={{ position: 'relative', fontFamily: fonts.serif, fontSize: 34, letterSpacing: '-0.02em', color: MUTED }}>
                {notCause.text}
                <span style={{ position: 'absolute', left: 0, top: '54%', height: 3, width: `${strike * 100}%`, backgroundColor: MUTED }} />
              </span>
            </div>
          );
        })()}
      </div>
      {arrow(C2.x + C2.w + 30, col3In)}

      {/* Column 3: record the exact error, then route it */}
      <div style={{ position: 'absolute', left: C3.x, top: TOP, width: C3.w, height: COL_H, opacity: col3In, display: 'flex',
        flexDirection: 'column', gap: 16, paddingTop: 8, transform: `translateY(${(1 - col3In) * 12}px)` }}>
        <Eyebrow color={colors.titleGreen}>{record.label}</Eyebrow>
        <div style={{ borderRadius: 18, padding: '22px 24px', backgroundColor: INK, boxShadow: '0 24px 60px rgba(40, 60, 20, 0.18)',
          display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {icon('ClipboardDocumentCheckIcon', colors.lime500, 28)}
            <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 18, letterSpacing: '0.12em', color: colors.lime500 }}>{record.caption ?? 'EXACT ERROR'}</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 23, lineHeight: 1.4, color: colors.white, minHeight: 64 }}>
            {test.error.slice(0, typed)}
            {typed < test.error.length && frame >= record.from + 8 && <span style={{ color: colors.lime500 }}>▍</span>}
          </div>
        </div>
        <div style={{ marginTop: 8, opacity: fade(routes[0]?.from ?? 0) }}><Eyebrow>{routesLabel}</Eyebrow></div>
        {routes.map((r, i) => {
          const p = pop(r.from);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18, height: 86, padding: '0 24px', borderRadius: 18,
              backgroundColor: colors.white, border: `2px solid ${LINE}`, boxShadow: '0 10px 26px rgba(40, 60, 20, 0.08)',
              opacity: Math.min(1, p * 1.3), transform: `translateY(${(1 - p) * 16}px)` }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F5EE' }}>
                {icon(r.icon, INK, 28)}
              </div>
              <span style={{ fontFamily: fonts.sans, fontSize: 29, color: INK }}>{r.text}</span>
            </div>
          );
        })}
      </div>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
