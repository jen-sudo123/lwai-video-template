import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors, fonts, typography } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { Header, INK, LINE, MUTED, SOFT, WARN, Icon, appear, clamp, easeOut, pop, prog } from './kit';

// Two side-by-side ideas, each with a small line illustration (signpost vs locked gate,
// confirm pop-up vs approval card, plugged-in tool vs empty slot). Optional cross-out of the
// left idea and a divider word between them.

export type ContrastVisual = 'signpost' | 'locked-gate' | 'confirm-dialog' | 'approval-card' | 'tool-plugged' | 'empty-slot';

type Side = { label: string; title: string; body?: string; visual: ContrastVisual; visualText?: string; from: number };

export type IconContrastProps = {
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  left: Side;
  right: Side;
  divider?: string;
  dividerFrom?: number;
  crossLeftAt?: number;
  durationInFrames: number;
};

const PANEL_W = 760;
const VIS_H = 380;

const Visual: React.FC<{ kind: ContrastVisual; text?: string; frame: number; at: number }> = ({ kind, text, frame, at }) => {
  const d = prog(frame, at, 24, easeOut);
  const ink = { fill: 'none', stroke: INK, strokeWidth: 4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  const dash = (len: number) => ({ strokeDasharray: len, strokeDashoffset: len * (1 - d) });
  const box: React.CSSProperties = { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' };

  if (kind === 'signpost') {
    return (
      <div style={box}>
        <svg width={520} height={VIS_H} viewBox="0 0 520 380">
          <path d="M260 120V360" {...ink} {...dash(240)} />
          <path d="M70 40H430L470 90L430 140H70Z" {...ink} fill="#fff" {...dash(900)} />
          <path d="M200 360H320" {...ink} {...dash(120)} />
        </svg>
        <div style={{ position: 'absolute', top: 54, width: 340, left: '50%', marginLeft: -180, textAlign: 'center', fontFamily: fonts.serif, fontSize: 28, color: INK, opacity: prog(frame, at + 16, 10) }}>
          {text}
        </div>
      </div>
    );
  }
  if (kind === 'locked-gate') {
    const lock = prog(frame, at + 18, 12, easeOut);
    return (
      <div style={box}>
        <svg width={520} height={VIS_H} viewBox="0 0 520 380">
          <path d="M60 350V60M460 350V60M30 350H490" {...ink} strokeWidth={6} {...dash(700)} />
          {[110, 160, 210, 310, 360, 410].map((x) => <path key={x} d={`M${x} 340V90`} {...ink} {...dash(250)} />)}
          <path d="M60 110H460M60 300H460" {...ink} {...dash(400)} />
          <path d="M260 340V90" {...ink} strokeWidth={6} {...dash(250)} />
          <g opacity={lock} transform={`translate(0 ${(1 - lock) * -20})`}>
            <rect x="225" y="190" width="70" height="58" rx="8" fill={colors.lime500} stroke={INK} strokeWidth={4} />
            <path d="M238 190v-16a22 22 0 0144 0v16" {...ink} />
          </g>
        </svg>
      </div>
    );
  }
  if (kind === 'confirm-dialog') {
    const click = frame >= at + 34 && frame < at + 40;
    return (
      <div style={box}>
        <div style={{ width: 520, borderRadius: 16, backgroundColor: '#fff', boxShadow: '0 18px 50px rgba(20,30,15,0.16)', border: `1.5px solid ${LINE}`, padding: 30, ...pop(frame, at) }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 26, fontWeight: 700, color: INK }}>Confirm action</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 24, color: '#444', marginTop: 12, lineHeight: 1.4 }}>{text}</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 14, marginTop: 28 }}>
            <div style={{ padding: '10px 22px', borderRadius: 8, border: `1.5px solid ${LINE}`, fontFamily: fonts.sans, fontSize: 22, color: INK }}>Cancel</div>
            <div style={{ position: 'relative', padding: '10px 22px', borderRadius: 8, backgroundColor: '#2B5FD9', fontFamily: fonts.sans, fontSize: 22, color: '#fff', transform: click ? 'scale(0.94)' : undefined }}>
              Confirm
              <svg width={34} height={40} viewBox="0 0 17 20" style={{ position: 'absolute', left: interpolate(frame, [at + 12, at + 32], [140, 40], { ...clamp, easing: easeOut }), top: interpolate(frame, [at + 12, at + 32], [70, 24], { ...clamp, easing: easeOut }), opacity: prog(frame, at + 10, 6) }}>
                <path d="M1 1 L1 15.5 L4.6 12.2 L7.2 18.2 L9.6 17.2 L7.1 11.3 L12 11.3 Z" fill="#111" stroke="#fff" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'approval-card') {
    const stamp = prog(frame, at + 30, 12, easeOut);
    return (
      <div style={box}>
        <div style={{ position: 'relative', width: 540, borderRadius: 16, backgroundColor: '#fff', boxShadow: '0 18px 50px rgba(20,30,15,0.16)', border: `1.5px solid ${LINE}`, padding: 30, ...pop(frame, at) }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 20, letterSpacing: '0.12em', fontWeight: 700, color: MUTED }}>APPROVAL REQUEST</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 26, color: INK, marginTop: 12, lineHeight: 1.4 }}>{text}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
            <div style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: SOFT, border: `2px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="user" size={28} /></div>
            <div style={{ fontFamily: fonts.sans, fontSize: 22, color: '#444' }}>Approver<br /><b style={{ color: INK }}>Manager or business owner</b></div>
          </div>
          <div style={{ position: 'absolute', right: -26, bottom: -22, transform: `rotate(-8deg) scale(${0.6 + 0.4 * stamp})`, opacity: stamp, border: `4px solid ${colors.lime500}`, color: colors.titleGreen,
            borderRadius: 10, padding: '6px 16px', fontFamily: fonts.sans, fontWeight: 800, fontSize: 26, letterSpacing: '0.08em', backgroundColor: 'rgba(255,255,255,0.9)' }}>APPROVED</div>
        </div>
      </div>
    );
  }
  // tool-plugged / empty-slot: an agent box with a tool socket
  const plugged = kind === 'tool-plugged';
  const wobble = plugged ? Math.sin(frame / 3) * 6 * prog(frame, at + 24, 10) : 0;
  return (
    <div style={box}>
      <svg width={560} height={VIS_H} viewBox="0 0 560 380">
        <rect x="40" y="110" width="220" height="160" rx="20" {...ink} fill={SOFT} {...dash(800)} />
        <text x="150" y="200" textAnchor="middle" fontFamily={fonts.sans} fontSize="30" fill={INK} opacity={d}>Agent</text>
        <rect x="260" y="160" width="40" height="60" {...ink} fill="#fff" {...dash(200)} />
        {plugged ? (
          <g opacity={prog(frame, at + 10, 12)}>
            <path d="M300 175H350M300 205H350" {...ink} />
            <rect x="350" y="140" width="170" height="100" rx="16" {...ink} fill="#fff" />
            <text x="435" y="198" textAnchor="middle" fontFamily={fonts.sans} fontSize="24" fill={INK}>Update tool</text>
            <g transform={`rotate(${wobble} 435 300)`}>
              <circle cx="435" cy="300" r="34" {...ink} fill={colors.lime200} />
              <path d="M435 300L435 274" {...ink} strokeWidth={5} />
            </g>
            <text x="435" y="362" textAnchor="middle" fontFamily={fonts.sans} fontSize="20" fill={MUTED}>control it afterward</text>
          </g>
        ) : (
          <g opacity={prog(frame, at + 10, 12)}>
            <rect x="350" y="140" width="170" height="100" rx="16" fill="none" stroke={MUTED} strokeWidth={3} strokeDasharray="10 10" />
            <text x="435" y="198" textAnchor="middle" fontFamily={fonts.sans} fontSize="24" fill={MUTED}>nothing here</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export const IconContrast: React.FC<IconContrastProps> = ({ label, title, titleFrom = 0, titleHighlight, left, right, divider, dividerFrom, crossLeftAt }) => {
  const frame = useCurrentFrame();
  const top = title ? 290 : 190;
  const cross = crossLeftAt === undefined ? 0 : prog(frame, crossLeftAt, 12);
  const side = (s: Side, x: number, isLeft: boolean) => (
    <div style={{ position: 'absolute', left: x, top, width: PANEL_W, ...appear(frame, s.from - 4, 16) }}>
      <div style={{ position: 'relative', height: VIS_H, opacity: isLeft ? 1 - 0.45 * cross : 1 }}>
        <Visual kind={s.visual} text={s.visualText} frame={frame} at={s.from} />
        {isLeft && cross > 0 && (
          <svg width={PANEL_W} height={VIS_H} style={{ position: 'absolute', inset: 0 }}>
            <path d={`M140 60L620 330`} stroke={WARN} strokeWidth={8} strokeLinecap="round" strokeDasharray={560} strokeDashoffset={560 * (1 - cross)} />
            <path d={`M620 60L140 330`} stroke={WARN} strokeWidth={8} strokeLinecap="round" strokeDasharray={560} strokeDashoffset={560 * (1 - prog(frame, crossLeftAt! + 6, 12))} />
          </svg>
        )}
      </div>
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <div style={{ ...typography.label, color: isLeft ? MUTED : colors.titleGreen }}>{s.label}</div>
        <div style={{ fontFamily: fonts.serif, fontSize: 44, color: INK, marginTop: 10, lineHeight: 1.2 }}>{s.title}</div>
        {s.body && <div style={{ fontFamily: fonts.sans, fontSize: 26, color: MUTED, marginTop: 10 }}>{s.body}</div>}
      </div>
    </div>
  );
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Header frame={frame} label={label} title={title} titleFrom={titleFrom} titleHighlight={titleHighlight} width={1700} />
      {side(left, 120, true)}
      {side(right, 1040, false)}
      {divider && (
        <div style={{ position: 'absolute', left: 900, width: 120, top: top + VIS_H / 2 - 40, textAlign: 'center', fontFamily: fonts.serif, fontSize: 64, color: colors.lime500,
          ...pop(frame, dividerFrom ?? right.from) }}>
          {divider}
        </div>
      )}
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
