import React from 'react';
import { Img } from 'remotion';
import { BACK, IN_OUT, OUT, enter, prog } from './motion';
import { INK, LIME, LINE, MUTED } from './theme';

// Part of the LWAI demo kit — see src/kit/README.md.
// A screenshot inside an animated browser window:
//   cam    — camera keyframes {at, x, y, s}: centre the view on image pixel (x, y) at zoom s (1 = whole image)
//   cursor — {at, x, y, click?}: the cursor glides to (x, y) over `dur` (0.8s) and clicks on arrival
//   rings  — {at, until?, x, y, w, h, spot?}: lime highlight box; spot dims everything else
//   steps  — {at, text}: "STEP n" caption under the window
//   ringStyle — 'box' (default): lime outline · 'line': a lime underline that runs left to right under the target
// All coordinates are in the screenshot's own pixels (imgW x imgH); all times are seconds on the same
// clock as `t` (composition VO seconds, or scene-local seconds when used from a data file).

export type AppWindowCam = { at: number; x: number; y: number; s: number; dur?: number };
export type AppWindowCur = { at: number; x: number; y: number; click?: boolean; dur?: number };
// lines (ringStyle 'line' only): text rows {x, y = row bottom, w}; the underline runs along them in reading order over `dur` s
export type AppWindowRing = { at: number; until?: number; x: number; y: number; w: number; h: number; spot?: boolean; lines?: { x: number; y: number; w: number }[]; dur?: number };
export type AppWindowStep = { at: number; text: string };

export const lerpKeys = <T extends { at: number; dur?: number }>(
  t: number,
  keys: T[],
  init: Record<string, number>,
  fields: string[],
  defDur: number,
) => {
  const s: Record<string, number> = { ...init };
  for (const k of keys) {
    const p = prog(t, k.at, k.dur ?? defDur, IN_OUT);
    if (p <= 0) break;
    for (const f of fields) s[f] = s[f] + (((k as unknown as Record<string, number>)[f]) - s[f]) * p;
  }
  return s;
};

export const AppWindow: React.FC<{
  t: number;
  start: number;
  src: string;
  cam?: AppWindowCam[];
  cursor?: AppWindowCur[];
  rings?: AppWindowRing[];
  steps?: AppWindowStep[];
  left?: number;
  top?: number;
  width?: number;
  title?: string;
  imgW?: number;
  imgH?: number;
  ringStyle?: 'box' | 'line';
}> = ({ t, start, src, cam = [], cursor = [], rings = [], steps = [], left, top = 54, width = 1560, title = 'claude.ai', imgW = 1920, imgH = 1080, ringStyle = 'box' }) => {
  const IMG_W = imgW;
  const IMG_H = imgH;
  const k = width / IMG_W;
  const vw = width;
  const vh = Math.round(IMG_H * k);
  const x0 = left ?? (1920 - width) / 2;
  const c = lerpKeys(t, cam, { x: IMG_W / 2, y: IMG_H / 2, s: 1 }, ['x', 'y', 's'], 1.0);
  const S = k * c.s;
  let tx = vw / 2 - c.x * S;
  let ty = vh / 2 - c.y * S;
  tx = Math.min(0, Math.max(vw - IMG_W * S, tx));
  ty = Math.min(0, Math.max(vh - IMG_H * S, ty));
  const winIn = prog(t, start, 0.7, OUT);

  // cursor
  const cur = cursor.length ? lerpKeys(t, cursor, { x: cursor[0].x, y: cursor[0].y }, ['x', 'y'], 0.8) : null;
  const curOpacity = cursor.length ? prog(t, cursor[0].at - 0.4, 0.3) : 0;
  const lastClick = cursor.filter((p) => p.click && t >= p.at + (p.dur ?? 0.8)).pop();
  const clickT = lastClick ? t - (lastClick.at + (lastClick.dur ?? 0.8)) : 99;
  const press = clickT < 0.25 ? 1 - 0.18 * Math.sin((clickT / 0.25) * Math.PI) : 1;

  const step = [...steps].reverse().find((s) => t >= s.at);
  const stepIdx = step ? steps.indexOf(step) : -1;

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x0,
          top,
          width: vw,
          borderRadius: 18,
          overflow: 'hidden',
          background: '#fff',
          boxShadow: '0 30px 80px rgba(20,40,10,.18), 0 0 0 2px #E6E8E1',
          opacity: winIn,
          transform: `translateY(${(1 - winIn) * 30}px) scale(${0.97 + 0.03 * winIn})`,
        }}
      >
        <div style={{ height: 40, background: '#F4F5F1', borderBottom: '1px solid #E3E5DE', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 9 }}>
          {['#E46B5F', '#E8BC4A', '#62BF55'].map((col) => (
            <div key={col} style={{ width: 13, height: 13, borderRadius: '50%', background: col }} />
          ))}
          <div style={{ fontFamily: 'Public Sans', marginLeft: 24, padding: '4px 18px', background: '#fff', border: '1px solid #E3E5DE', borderRadius: 8, fontSize: 16, color: MUTED }}>
            {title}
          </div>
        </div>
        <div style={{ position: 'relative', width: vw, height: vh, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: IMG_W, height: IMG_H, transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${S})` }}>
            <Img src={src} style={{ width: IMG_W, height: IMG_H, display: 'block' }} />
            {rings.map((r, i) => {
              const a = prog(t, r.at, 0.45, BACK) * (r.until ? 1 - prog(t, r.until, 0.4) : 1);
              if (a <= 0) return null;
              if (ringStyle === 'line') {
                const out = r.until ? 1 - prog(t, r.until, 0.3) : 1;
                const run = prog(t, r.at, 0.55, IN_OUT);
                const bar = (k: string | number, x: number, y: number, w: number) => (
                  <div key={k} style={{ position: 'absolute', left: x, top: y, width: w, height: Math.max(4 / S, 2.5), borderRadius: 4 / S, background: LIME, opacity: out, boxShadow: `0 0 ${6 / S}px rgba(102,198,28,.45)` }} />
                );
                if (r.lines?.length) {
                  const total = r.lines.reduce((n, l) => n + l.w, 0);
                  let left = prog(t, r.at, r.dur ?? 0.5 * r.lines.length, (n) => n) * total;
                  return (
                    <React.Fragment key={i}>
                      {r.spot && (
                        <div style={{ position: 'absolute', left: r.x - 6 / S, top: r.y - 6 / S, width: r.w + 12 / S, height: r.h + 12 / S, borderRadius: 10 / S, boxShadow: `0 0 0 4000px rgba(16,24,10,${0.42 * Math.min(1, a) * out})` }} />
                      )}
                      {r.lines.map((l, j) => {
                        const w = Math.max(0, Math.min(l.w, left));
                        left -= l.w;
                        return w > 0 ? bar(j, l.x, l.y + 2 / S, w) : null;
                      })}
                    </React.Fragment>
                  );
                }
                return (
                  <React.Fragment key={i}>
                    {r.spot && (
                      <div style={{ position: 'absolute', left: r.x - 6 / S, top: r.y - 6 / S, width: r.w + 12 / S, height: r.h + 12 / S, borderRadius: 10 / S, boxShadow: `0 0 0 4000px rgba(16,24,10,${0.42 * Math.min(1, a) * out})` }} />
                    )}
                    <div style={{ position: 'absolute', left: r.x, top: r.y + r.h + 3 / S, width: r.w * run, height: Math.max(5 / S, 2.5), borderRadius: 4 / S, background: LIME, opacity: out, boxShadow: `0 0 ${6 / S}px rgba(102,198,28,.45)` }} />
                  </React.Fragment>
                );
              }
              const pad = 8 / S;
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: r.x - pad,
                    top: r.y - pad,
                    width: r.w + pad * 2,
                    height: r.h + pad * 2,
                    borderRadius: 12 / S,
                    border: `${4 / S}px solid ${LIME}`,
                    boxShadow: r.spot ? `0 0 0 ${4000}px rgba(16,24,10,${0.42 * a})` : `0 0 0 ${8 / S}px rgba(102,198,28,${0.25 * a})`,
                    opacity: Math.min(1, a),
                    transform: `scale(${0.92 + 0.08 * Math.min(1, a)})`,
                  }}
                />
              );
            })}
            {cur && (
              <div style={{ position: 'absolute', left: cur.x, top: cur.y, opacity: curOpacity, transform: `scale(${1 / S})`, transformOrigin: '0 0' }}>
                {clickT < 0.6 && (
                  <div
                    style={{
                      position: 'absolute',
                      left: -36 * (0.3 + clickT * 1.6),
                      top: -36 * (0.3 + clickT * 1.6),
                      width: 72 * (0.3 + clickT * 1.6),
                      height: 72 * (0.3 + clickT * 1.6),
                      borderRadius: '50%',
                      border: `4px solid ${LIME}`,
                      opacity: 1 - clickT / 0.6,
                    }}
                  />
                )}
                <svg width="40" height="40" viewBox="0 0 24 24" style={{ transform: `scale(${press})`, transformOrigin: '2px 2px', filter: 'drop-shadow(0 3px 4px rgba(0,0,0,.3))' }}>
                  <path d="M3 2l15.5 9.2-6.6 1.4 3.8 7.3-2.9 1.5-3.8-7.3-4.9 4.6z" fill="#111" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
      {steps.length > 0 && step && (
        <div
          key={stepIdx}
          style={{
            position: 'absolute',
            left: x0,
            width: vw,
            top: top + 40 + vh + 26,
            display: 'flex',
            justifyContent: 'center',
            ...enter(t, step.at, { dur: 0.45, y: 12 }),
          }}
        >
          <div style={{ fontFamily: 'Public Sans', color: INK, display: 'flex', alignItems: 'center', gap: 16, padding: '12px 26px 12px 14px', borderRadius: 999, background: '#fff', border: `2px solid ${LINE}`, fontSize: 28, fontWeight: 500 }}>
            <span style={{ background: LIME, color: '#fff', borderRadius: 999, padding: '4px 14px', fontSize: 18, fontWeight: 700, letterSpacing: '.1em' }}>
              STEP {stepIdx + 1}
            </span>
            {step.text}
          </div>
        </div>
      )}
    </>
  );
};
