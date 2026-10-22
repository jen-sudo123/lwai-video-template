import React from 'react';
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import * as Outline from '@heroicons/react/24/outline';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

// "Name the capability in the instructions": an instructions document on the left where key
// lines are rewritten (old line struck through, new line fades in with the configured name
// highlighted), and a "configured" panel on the right holding the actual tool / knowledge
// source. A connector draws from each rewritten line to the resource it names. From
// `capabilityFrom` the panel is emphasised: the reference adds clarity, the capability comes
// from configuring the resource. All frames are scene-local.

export type InstructionLinkProps = {
  label: string;
  title: string;                        // one line per \n
  titleTimings?: number[];
  docLabel: string;                     // e.g. 'INSTRUCTIONS'
  docSection: string;                   // e.g. 'Inputs & Access'
  // Document rows in order. A row with `after` is a key line: `before` shows first, is struck
  // through at `changeFrom`, then `after` fades in; `highlight` (a substring of `after`) is the
  // configured name, and `resource` links the row to resources[resource] at `linkFrom`.
  lines: Array<{
    text?: string;
    before?: string;
    after?: string;
    highlight?: string;
    focusFrom?: number;
    changeFrom?: number;
    linkFrom?: number;
    resource?: number;
  }>;
  panelLabel: string;                   // e.g. 'CONFIGURED IN COPILOT STUDIO'
  resources: Array<{ kind: string; name: string; meta: string; icon?: string; from: number }>;
  notes?: Array<{ text: string; from: number; to?: number }>;
  capabilityFrom?: number;
  capabilityText?: string;              // badge on the panel from capabilityFrom
  clarityText?: string;                 // badge on the document from capabilityFrom
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const ease = Easing.out(Easing.cubic);
const INK = '#14180F';
const MUTED = '#5E6458';
const LINE = '#DDE3D6';

const DOC_X = 80, DOC_Y = 300, DOC_W = 1010, DOC_PAD = 40;
const HEAD_H = 92;                       // doc label + section heading
const KEY_H = 168, TEXT_H = 54;          // row heights: key line, plain context line
const PANEL_X = 1260, PANEL_W = 580, PANEL_Y = 300;
const CARD_H = 150, CARD_GAP = 26, PANEL_HEAD = 70;

const icon = (name: string | undefined, color: string, size = 30) => {
  const I = name ? (Outline as Record<string, React.FC<React.SVGProps<SVGSVGElement>>>)[name] : undefined;
  return I ? <I style={{ width: size, height: size, color, strokeWidth: 1.6 }} /> : null;
};

export const InstructionLink: React.FC<InstructionLinkProps> = ({
  label, title, titleTimings, docLabel, docSection, lines, panelLabel, resources, notes,
  capabilityFrom, capabilityText, clarityText,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cap = capabilityFrom === undefined ? 0 : interpolate(frame, [capabilityFrom, capabilityFrom + 16], [0, 1], { ...clamp, easing: ease });

  // Row geometry (absolute y of each row's top and centre).
  const rowTops: number[] = [];
  let y = DOC_Y + DOC_PAD + HEAD_H;
  lines.forEach((l) => { rowTops.push(y); y += l.after ? KEY_H : TEXT_H; });
  const docH = y - DOC_Y + DOC_PAD - 10;
  const rowCY = (i: number) => rowTops[i] + (lines[i].after ? KEY_H : TEXT_H) / 2;
  const cardTop = (i: number) => PANEL_Y + 34 + PANEL_HEAD + i * (CARD_H + CARD_GAP);
  const panelH = 34 + PANEL_HEAD + resources.length * (CARD_H + CARD_GAP) - CARD_GAP + 34;
  const docIn = interpolate(frame, [0, 18], [0, 1], { ...clamp, easing: ease });

  const renderAfter = (text: string, hl: string | undefined, on: number) => {
    if (!hl || !text.includes(hl)) return text;
    const [a, b] = text.split(hl);
    return (
      <>
        {a}
        <span style={{ backgroundColor: `rgba(208, 248, 171, ${on})`, color: on > 0.5 ? colors.titleGreen : INK,
          fontWeight: on > 0.5 ? 600 : 400, borderRadius: 8, padding: '1px 6px', margin: '0 -2px',
          boxShadow: on > 0.5 ? `inset 0 -3px 0 ${colors.lime500}` : 'none' }}>{hl}</span>
        {b}
      </>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Header */}
      <div style={{ position: 'absolute', left: 80, top: 96, right: 80 }}>
        <div style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 24, letterSpacing: '0.14em', color: colors.neutral600,
          opacity: interpolate(frame, [0, 12], [0, 1], clamp) }}>{label}</div>
        <div style={{ marginTop: 14, fontFamily: fonts.serif, fontSize: 60, lineHeight: 1.12, letterSpacing: '-0.04em', color: colors.black }}>
          {title.split('\n').map((l, i) => {
            const t0 = titleTimings?.[i] ?? 0;
            const o = interpolate(frame, [t0, t0 + 16], [0, 1], { ...clamp, easing: ease });
            return <div key={i} style={{ opacity: o, transform: `translateY(${(1 - o) * 12}px)` }}>{l}</div>;
          })}
        </div>
      </div>

      {/* Instructions document */}
      <div style={{ position: 'absolute', left: DOC_X, top: DOC_Y, width: DOC_W, height: docH, borderRadius: 22,
        backgroundColor: colors.white, border: `2px solid ${LINE}`, boxShadow: '0 18px 48px rgba(40, 60, 20, 0.08)',
        opacity: docIn * (1 - 0.25 * cap), transform: `translateY(${(1 - docIn) * 16}px)` }}>
        <div style={{ position: 'absolute', left: DOC_PAD, top: DOC_PAD, display: 'flex', alignItems: 'center', gap: 14 }}>
          {icon('DocumentTextIcon', MUTED, 28)}
          <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: '0.14em', color: colors.neutral600 }}>{docLabel}</span>
        </div>
        <div style={{ position: 'absolute', left: DOC_PAD, top: DOC_PAD + 40, fontFamily: fonts.sans, fontWeight: 600, fontSize: 28, color: INK }}>
          {docSection}
        </div>
      </div>
      {lines.map((l, i) => {
        const top = rowTops[i];
        const left = DOC_X + DOC_PAD;
        const width = DOC_W - DOC_PAD * 2;
        if (!l.after) {
          return (
            <div key={i} style={{ position: 'absolute', left, top, width, height: TEXT_H, display: 'flex', alignItems: 'center', gap: 16,
              fontFamily: fonts.sans, fontSize: 27, color: '#9AA093', opacity: docIn * (1 - 0.25 * cap) }}>
              <span style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#C5CBBE', flexShrink: 0 }} />{l.text}
            </div>
          );
        }
        const focus = l.focusFrom === undefined ? 0 : interpolate(frame, [l.focusFrom, l.focusFrom + 12], [0, 1], clamp);
        const ch = l.changeFrom ?? 1e9;
        const strike = interpolate(frame, [ch, ch + 14], [0, 1], { ...clamp, easing: ease });
        const beforeOut = interpolate(frame, [ch + 16, ch + 26], [1, 0], clamp);
        const afterIn = interpolate(frame, [ch + 18, ch + 34], [0, 1], { ...clamp, easing: ease });
        const hlOn = l.linkFrom === undefined ? 0 : interpolate(frame, [l.linkFrom, l.linkFrom + 10], [0, 1], clamp);
        return (
          <div key={i} style={{ position: 'absolute', left: left - 18, top: top + 6, width: width + 36, height: KEY_H - 12, borderRadius: 14,
            backgroundColor: `rgba(242, 245, 238, ${Math.max(focus, afterIn) * (1 - cap * 0.5)})`,
            border: `2px solid rgba(102, 198, 28, ${Math.max(focus, afterIn) * (1 - cap * 0.6)})`, opacity: docIn }}>
            <div style={{ position: 'absolute', left: 18, top: 0, bottom: 0, right: 18, display: 'flex', alignItems: 'center' }}>
              {/* before */}
              {beforeOut > 0 && l.before && (
                <div style={{ position: 'absolute', left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 16, opacity: beforeOut }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: INK, flexShrink: 0 }} />
                  <span style={{ position: 'relative', fontFamily: fonts.sans, fontSize: 29, color: INK, lineHeight: 1.4 }}>
                    {l.before}
                    <span style={{ position: 'absolute', left: 0, top: '52%', height: 3, borderRadius: 2,
                      width: `${strike * 100}%`, backgroundColor: '#C2410C' }} />
                  </span>
                </div>
              )}
              {/* after */}
              {afterIn > 0 && (
                <div style={{ position: 'absolute', left: 0, right: 0, display: 'flex', alignItems: 'flex-start', gap: 16,
                  opacity: afterIn, transform: `translateY(${(1 - afterIn) * 10}px)` }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: INK, flexShrink: 0, marginTop: 16 }} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 29, color: INK, lineHeight: 1.42 }}>{renderAfter(l.after, l.highlight, hlOn)}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
      {cap > 0 && clarityText && (
        <div style={{ position: 'absolute', left: DOC_X + 30, top: DOC_Y + docH - 26, padding: '10px 20px', borderRadius: 999,
          backgroundColor: colors.white, border: `2px solid ${LINE}`, fontFamily: fonts.sans, fontWeight: 600, fontSize: 22,
          letterSpacing: '0.08em', color: MUTED, opacity: cap }}>{clarityText}</div>
      )}

      {/* Connectors */}
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {lines.map((l, i) => {
          if (l.resource === undefined || l.linkFrom === undefined) return null;
          const x0 = DOC_X + DOC_W, y0 = rowCY(i), x3 = PANEL_X, y3 = cardTop(l.resource) + CARD_H / 2;
          const cx = (x0 + x3) / 2;
          const d = `M ${x0} ${y0} C ${cx} ${y0}, ${cx} ${y3}, ${x3} ${y3}`;
          const draw = interpolate(frame, [l.linkFrom, l.linkFrom + 22], [0, 1], { ...clamp, easing: ease });
          const len = 420;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={colors.lime500} strokeWidth={4} strokeLinecap="round"
                strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
              {draw > 0 && <circle cx={x0} cy={y0} r={8} fill={colors.lime500} opacity={draw} />}
              {draw >= 1 && <circle cx={x3} cy={y3} r={8} fill={colors.lime500} />}
            </g>
          );
        })}
      </svg>

      {/* Configured resources panel */}
      <div style={{ position: 'absolute', left: PANEL_X, top: PANEL_Y, width: PANEL_W, height: panelH, borderRadius: 24,
        backgroundColor: cap > 0.5 ? INK : '#F4F6F1', border: `2px solid ${cap > 0.5 ? INK : LINE}`,
        boxShadow: `0 24px 60px rgba(40, 60, 20, ${0.06 + 0.16 * cap})`, transform: `scale(${1 + 0.015 * cap})`,
        opacity: interpolate(frame, [resources[0]?.from ?? 0, (resources[0]?.from ?? 0) + 14], [0, 1], clamp) }}>
        <div style={{ position: 'absolute', left: 34, top: 34, fontFamily: fonts.sans, fontWeight: 600, fontSize: 20, letterSpacing: '0.14em',
          color: cap > 0.5 ? colors.lime500 : colors.neutral600 }}>{panelLabel}</div>
      </div>
      {resources.map((r, i) => {
        const p = spring({ frame: frame - r.from, fps, config: { damping: 16, stiffness: 140 } });
        const linked = lines.some((l) => l.resource === i && l.linkFrom !== undefined && frame >= l.linkFrom + 18);
        return (
          <div key={i} style={{ position: 'absolute', left: PANEL_X + 30, top: cardTop(i), width: PANEL_W - 60, height: CARD_H,
            borderRadius: 18, backgroundColor: colors.white, border: `2px solid ${linked ? colors.lime500 : LINE}`,
            display: 'flex', alignItems: 'center', gap: 22, padding: '0 26px',
            boxShadow: '0 10px 26px rgba(40, 60, 20, 0.08)', opacity: Math.min(1, p * 1.3), transform: `translateX(${(1 - p) * 30}px)` }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: linked ? colors.lime200 : '#F2F5EE' }}>
              {icon(r.icon, linked ? colors.titleGreen : MUTED, 34)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
              <span style={{ fontFamily: fonts.sans, fontWeight: 600, fontSize: 18, letterSpacing: '0.14em', color: colors.neutral600 }}>{r.kind}</span>
              <span style={{ fontFamily: fonts.serif, fontSize: 32, letterSpacing: '-0.02em', color: INK, lineHeight: 1.12 }}>{r.name}</span>
              <span style={{ fontFamily: fonts.sans, fontSize: 21, color: MUTED }}>{r.meta}</span>
            </div>
          </div>
        );
      })}
      {cap > 0 && capabilityText && (
        <div style={{ position: 'absolute', left: PANEL_X + 30, top: PANEL_Y + panelH - 26, padding: '10px 20px', borderRadius: 999,
          backgroundColor: colors.lime500, fontFamily: fonts.sans, fontWeight: 600, fontSize: 22, letterSpacing: '0.08em', color: INK,
          opacity: cap, transform: `translateY(${(1 - cap) * 8}px)` }}>{capabilityText}</div>
      )}

      {/* Notes: one at a time, under the document */}
      {notes?.map((n, i) => {
        const end = n.to ?? notes[i + 1]?.from ?? 1e9;
        const o = Math.min(interpolate(frame, [n.from, n.from + 12], [0, 1], clamp), interpolate(frame, [end - 8, end], [1, 0], clamp));
        if (o <= 0) return null;
        return (
          <div key={i} style={{ position: 'absolute', left: PANEL_X, right: 80, top: PANEL_Y + panelH + 50, display: 'flex', gap: 14,
            alignItems: 'flex-start', fontFamily: fonts.sans, fontSize: 27, color: INK, lineHeight: 1.35, opacity: o,
            transform: `translateY(${(1 - o) * 8}px)` }}>
            <span style={{ flexShrink: 0, marginTop: 2 }}>{icon('InformationCircleIcon', colors.titleGreen, 32)}</span>
            <span>{n.text}</span>
          </div>
        );
      })}

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
