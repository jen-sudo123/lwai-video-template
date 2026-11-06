import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { Logo } from '../Logo';

// A screen-recording feel built from still screenshots.
// - shots: which screenshot is on screen from which scene-local frame.
// - events: cursor targets in 1920x1080 image px. The cursor glides to each target,
//   `click: true` adds a press + ripple. A shot that starts within a few frames after a
//   click opens with a short zoom-from-the-click-point crossfade (like the UI responding);
//   other shot changes crossfade.
// - zoomKeyframes: same semantics as video-clip clipZoomKeyframes (origin in percent,
//   30-frame lerp, startFrame -30 = already zoomed at scene start).

export type WalkthroughShot = { src: string; from: number };
export type WalkthroughEvent = { frame: number; x: number; y: number; click?: boolean };
export type WalkthroughZoomKF = { startFrame: number; scale: number; originX: number; originY: number };

const MOVE_FRAMES = 18; // cursor glide duration
const ARRIVE_BEFORE = 4; // cursor settles this many frames before the click
const CLICK_TO_SHOT = 12; // a shot starting within this many frames after a click "responds" to it
const XFADE = 9;
const KF_TRANSITION = 30;

const ease = Easing.bezier(0.45, 0, 0.2, 1);

const Cursor: React.FC<{ press: number }> = ({ press }) => (
  <svg width={30} height={40} viewBox="0 0 30 40" style={{ transform: `scale(${1 - 0.14 * press})`, transformOrigin: '3px 3px', filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.35))' }}>
    <path d="M3 3 L3 31 L10.5 24.5 L15.5 36 L20 34 L15 22.8 L25 22.8 Z" fill="#fff" stroke="#111" strokeWidth={2} strokeLinejoin="round" />
  </svg>
);

export const ScreenshotWalkthrough: React.FC<{
  shots: WalkthroughShot[];
  events?: WalkthroughEvent[];
  cursorStart?: { x: number; y: number };
  zoomKeyframes?: WalkthroughZoomKF[];
  logoPosition?: 'bottom-left' | 'bottom-right';
}> = ({ shots, events = [], cursorStart, zoomKeyframes, logoPosition = 'bottom-left' }) => {
  const frame = useCurrentFrame();

  // ---- zoom (camera) ----
  let scale = 1, ox = 50, oy = 50;
  if (zoomKeyframes && zoomKeyframes.length) {
    let a = 0;
    for (let i = 1; i < zoomKeyframes.length; i++) if (zoomKeyframes[i].startFrame <= frame) a = i;
    const cur = zoomKeyframes[a];
    const prev = a > 0 ? zoomKeyframes[a - 1] : { startFrame: 0, scale: 1, originX: 50, originY: 50 };
    const t = interpolate(frame, [cur.startFrame, cur.startFrame + KF_TRANSITION], [0, 1], {
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
    });
    scale = prev.scale + (cur.scale - prev.scale) * t;
    ox = prev.originX + (cur.originX - prev.originX) * t;
    oy = prev.originY + (cur.originY - prev.originY) * t;
  }

  // ---- cursor position ----
  const start = cursorStart ?? (events[0] ? { x: events[0].x + 160, y: events[0].y + 140 } : { x: 1100, y: 760 });
  let cx = start.x, cy = start.y;
  let px = start.x, py = start.y;
  for (const ev of events) {
    const arrive = ev.frame - ARRIVE_BEFORE;
    const depart = arrive - MOVE_FRAMES;
    if (frame >= arrive) { cx = ev.x; cy = ev.y; px = ev.x; py = ev.y; continue; }
    if (frame > depart) {
      const t = ease((frame - depart) / MOVE_FRAMES);
      cx = px + (ev.x - px) * t;
      cy = py + (ev.y - py) * t;
    } else { cx = px; cy = py; }
    break;
  }

  // ---- click press + ripple ----
  let press = 0;
  const ripples: Array<{ x: number; y: number; p: number }> = [];
  for (const ev of events) {
    if (!ev.click) continue;
    const d = frame - ev.frame;
    if (d >= -2 && d <= 5) press = Math.max(press, interpolate(d, [-2, 0, 5], [0, 1, 0]));
    if (d >= 0 && d <= 16) ripples.push({ x: ev.x, y: ev.y, p: d / 16 });
  }
  const cursorOpacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  // ---- shots ----
  const layers = shots.map((s, i) => {
    const next = shots[i + 1];
    if (frame < s.from) return null;
    if (next && frame >= next.from + XFADE) return null;
    const click = [...events].reverse().find((e) => e.click && e.frame <= s.from && s.from - e.frame <= CLICK_TO_SHOT);
    const t = i === 0 ? 1 : interpolate(frame, [s.from, s.from + XFADE], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease });
    const pop = click && i > 0 ? 1.035 - 0.035 * t : 1;
    return (
      <Img
        key={i}
        src={staticFile(s.src)}
        style={{
          position: 'absolute', left: 0, top: 0, width: 1920, height: 1080,
          opacity: t,
          transform: `scale(${pop})`,
          transformOrigin: click ? `${click.x}px ${click.y}px` : '50% 50%',
        }}
      />
    );
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transform: `scale(${scale})`, transformOrigin: `${ox}% ${oy}%` }}>
        {layers}
        {ripples.map((r, i) => (
          <div key={i} style={{
            position: 'absolute', left: r.x, top: r.y, width: 0, height: 0,
          }}>
            <div style={{
              position: 'absolute',
              width: 16 + 56 * r.p, height: 16 + 56 * r.p,
              left: -(8 + 28 * r.p), top: -(8 + 28 * r.p),
              borderRadius: '50%',
              border: `${3 / scale}px solid rgba(102,198,28,${0.9 * (1 - r.p)})`,
              backgroundColor: `rgba(102,198,28,${0.18 * (1 - r.p)})`,
            }} />
          </div>
        ))}
        <div style={{ position: 'absolute', left: cx - 3, top: cy - 3, opacity: cursorOpacity, transform: `scale(${1 / scale})`, transformOrigin: '3px 3px' }}>
          <Cursor press={press} />
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 24, [logoPosition === 'bottom-left' ? 'left' : 'right']: 24,
        backgroundColor: 'rgba(0, 0, 0, 0.72)', borderRadius: 12, padding: '10px 18px', display: 'flex', alignItems: 'center',
      }}>
        <Logo variant="light" height={32} />
      </div>
    </AbsoluteFill>
  );
};
