import React from 'react';
import { AbsoluteFill, Easing, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors, fonts } from '../tokens';
import { LogoFooter } from '../Logo';

// Screenshot tutorial scene that behaves like a screen recording: a virtual camera pans and
// zooms over full-frame screenshots, with spotlight, cursor + click, typed input, revealed
// replies, drawn marks and a before/after compare. All rects and points are in the
// screenshot's own pixel space; all frames are scene-local.

type Rect = [number, number, number, number]; // x, y, w, h in image px

export type ScreenDemoShot = {
  from: number;
  image?: string;
  imageSize: [number, number];
  // How this shot replaces the previous one: 'slide' for a change of app/place,
  // 'fade' for a new state of the same screen, 'cut' for a hard cut.
  transition?: 'slide' | 'fade' | 'cut';
  camera?: Array<{ frame: number; x: number; y: number; zoom: number }>;
  spotlights?: Array<{ rect: Rect; from: number; to?: number }>;
  // 'box' outlines a large region (paragraph, table) without dimming; `to` fades a mark out.
  marks?: Array<{ type: 'underline' | 'circle' | 'box'; rect: Rect; from: number; to?: number }>;
  cursor?: Array<{ frame: number; x: number; y: number; click?: boolean }>;
  // Single line by default; set lineHeight to wrap across lines inside rect.
  typing?: { rect: Rect; text: string; from: number; to: number; fontSize: number; textX: number; lineHeight?: number };
  reveal?: { rect: Rect; from: number; duration: number };
  compare?: {
    before: string;
    after: string;
    beforeLabel: string;
    afterLabel: string;
    highlight: Rect;
    highlightFrom: number;
    stamp: string;
    stampFrom: number;
    statement: string;
    statementHighlight: string;
    statementFrom: number;
    // Region of the screenshot to show in each panel (defaults to the whole image).
    crop?: Rect;
  };
};

export type ScreenDemoProps = {
  label: string;
  // label overrides the scene label from that step on (e.g. TEST 1 → TEST 2).
  steps: Array<{ from: number; text: string; label?: string }>;
  shots: ScreenDemoShot[];
  durationInFrames: number;
};

const W = 1920;
const H = 1080;
const STAGE_TOP = 130;
const STAGE_H = 880;
const STAGE_W = 1760;
const T = 15; // transition frames
const CAM_MOVE = 26;
const ease = Easing.inOut(Easing.cubic);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const fitScale = ([iw, ih]: [number, number]) => Math.min(STAGE_W / iw, STAGE_H / ih);

// Camera state at frame f: hold each keyframe, move to the next over CAM_MOVE frames.
const cameraAt = (shot: ScreenDemoShot, f: number) => {
  const [iw, ih] = shot.imageSize;
  const kfs = shot.camera?.length ? shot.camera : [{ frame: shot.from, x: iw / 2, y: ih / 2, zoom: 1 }];
  let cur = { x: kfs[0].x, y: kfs[0].y, zoom: kfs[0].zoom };
  for (let i = 1; i < kfs.length; i++) {
    const k = kfs[i];
    const p = interpolate(f, [k.frame, k.frame + CAM_MOVE], [0, 1], { ...clamp, easing: ease });
    cur = { x: cur.x + (k.x - cur.x) * p, y: cur.y + (k.y - cur.y) * p, zoom: cur.zoom + (k.zoom - cur.zoom) * p };
  }
  const s = fitScale(shot.imageSize) * cur.zoom;
  const anchorY = STAGE_TOP + STAGE_H / 2;
  // Keep the image covering the canvas once it is larger than it; otherwise centre it.
  const clampAxis = (c: number, size: number, anchor: number, view: number) => {
    if (size * s <= view) return size / 2;
    const min = anchor / s;
    const max = size - (view - anchor) / s;
    return Math.min(Math.max(c, min), max);
  };
  const cx = clampAxis(cur.x, iw, W / 2, W);
  const cy = clampAxis(cur.y, ih, anchorY, H);
  return { s, tx: W / 2 - cx * s, ty: anchorY - cy * s };
};

const Spotlight: React.FC<{ rect: Rect; f: number; from: number; to?: number; s: number }> = ({ rect, f, from, to, s }) => {
  const on = interpolate(f, [from, from + 10], [0, 1], clamp);
  const off = to === undefined ? 1 : interpolate(f, [to, to + 10], [1, 0], clamp);
  const o = on * off;
  if (o <= 0) return null;
  const pad = 8;
  return (
    <div
      style={{
        position: 'absolute',
        left: rect[0] - pad,
        top: rect[1] - pad,
        width: rect[2] + pad * 2,
        height: rect[3] + pad * 2,
        borderRadius: 10,
        border: `${3 / s}px solid ${colors.lime500}`,
        boxShadow: `0 0 0 9999px rgba(18, 26, 14, ${0.5 * o})`,
        opacity: o,
      }}
    />
  );
};

const Mark: React.FC<{ type: 'underline' | 'circle' | 'box'; rect: Rect; f: number; from: number; to?: number; s: number }> = ({ type, rect, f, from, to, s }) => {
  const p = interpolate(f, [from, from + 16], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const o = to === undefined ? 1 : interpolate(f, [to, to + 10], [1, 0], clamp);
  if (p <= 0 || o <= 0) return null;
  const [x, y, w, h] = rect;
  const stroke = 4 / s;
  if (type === 'underline') {
    const len = w;
    return (
      <svg style={{ position: 'absolute', left: x, top: y + h + 2, overflow: 'visible', opacity: o }} width={w} height={10}>
        <path d={`M0 4 Q ${w / 2} ${8} ${w} 3`} fill="none" stroke={colors.lime500} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={len * 1.1} strokeDashoffset={len * 1.1 * (1 - p)} />
      </svg>
    );
  }
  if (type === 'box') {
    const pad = 12;
    const bw = w + pad * 2;
    const bh = h + pad * 2;
    const per = 2 * (bw + bh);
    return (
      <svg style={{ position: 'absolute', left: x - pad, top: y - pad, overflow: 'visible', opacity: o }} width={bw} height={bh}>
        <rect x={0} y={0} width={bw} height={bh} rx={14 / s} fill="none" stroke={colors.lime500} strokeWidth={stroke}
          strokeDasharray={per} strokeDashoffset={per * (1 - p)} />
      </svg>
    );
  }
  const rx = w / 2 + 14;
  const ry = h / 2 + 12;
  const c = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  return (
    <svg style={{ position: 'absolute', left: x - 14, top: y - 12, overflow: 'visible', opacity: o }} width={w + 28} height={h + 24}>
      <ellipse cx={rx} cy={ry} rx={rx} ry={ry} fill="none" stroke={colors.lime500} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c * (1 - p)} transform={`rotate(-4 ${rx} ${ry})`} />
    </svg>
  );
};

const Cursor: React.FC<{ shot: ScreenDemoShot; f: number; cam: ReturnType<typeof cameraAt> }> = ({ shot, f, cam }) => {
  const kfs = shot.cursor;
  if (!kfs?.length || f < kfs[0].frame - 6) return null;
  let x = kfs[0].x;
  let y = kfs[0].y;
  for (let i = 1; i < kfs.length; i++) {
    const k = kfs[i];
    const move = Math.min(22, k.frame - kfs[i - 1].frame);
    const p = interpolate(f, [k.frame - move, k.frame], [0, 1], { ...clamp, easing: ease });
    x += (k.x - x) * p;
    y += (k.y - y) * p;
  }
  const sx = cam.tx + x * cam.s;
  const sy = cam.ty + y * cam.s;
  const appear = interpolate(f, [kfs[0].frame - 6, kfs[0].frame], [0, 1], clamp);
  const clicks = kfs.filter((k) => k.click);
  return (
    <>
      {clicks.map((k, i) => {
        const p = interpolate(f, [k.frame, k.frame + 18], [0, 1], clamp);
        if (p <= 0 || p >= 1) return null;
        return (
          <div key={i} style={{
            position: 'absolute', left: cam.tx + k.x * cam.s - 30 * p, top: cam.ty + k.y * cam.s - 30 * p,
            width: 60 * p, height: 60 * p, borderRadius: '50%', border: `3px solid ${colors.lime500}`, opacity: 1 - p,
          }} />
        );
      })}
      <svg style={{ position: 'absolute', left: sx - 4, top: sy - 2, opacity: appear,
        transform: `scale(${clicks.some((k) => f >= k.frame && f < k.frame + 5) ? 0.88 : 1})`, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.35))' }}
        width={34} height={40} viewBox="0 0 17 20">
        <path d="M1 1 L1 15.5 L4.6 12.2 L7.2 18.2 L9.6 17.2 L7.1 11.3 L12 11.3 Z" fill="#111" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    </>
  );
};

const ShotLayer: React.FC<{ shot: ScreenDemoShot; offset: number; incoming: boolean; outgoingAt?: number; outgoingSlide?: boolean }> = ({
  shot, offset, incoming, outgoingAt, outgoingSlide,
}) => {
  const f = useCurrentFrame() + offset;
  const cam = cameraAt(shot, f);
  const tr = shot.transition ?? 'fade';
  const inP = incoming && tr !== 'cut' ? interpolate(f, [shot.from, shot.from + T], [0, 1], { ...clamp, easing: ease }) : 1;
  const outP = outgoingAt !== undefined && outgoingSlide ? interpolate(f, [outgoingAt, outgoingAt + T], [0, 1], { ...clamp, easing: ease }) : 0;
  const x = (incoming && tr === 'slide' ? (1 - inP) * 100 : 0) - outP * 100;
  const opacity = incoming && tr === 'fade' ? inP : 1;
  const [iw, ih] = shot.imageSize;

  if (shot.compare) {
    return (
      <AbsoluteFill style={{ transform: `translateX(${x}%)`, opacity, backgroundColor: '#EEF2EA' }}>
        <Compare c={shot.compare} f={f} imageSize={shot.imageSize} start={shot.from} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ transform: `translateX(${x}%)`, opacity, backgroundColor: '#EEF2EA', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', left: 0, top: 0, width: iw, height: ih, transformOrigin: '0 0',
        transform: `translate(${cam.tx}px, ${cam.ty}px) scale(${cam.s})`,
      }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: 14, overflow: 'hidden', boxShadow: '0 18px 50px rgba(30,45,20,0.18)', backgroundColor: '#fff' }}>
          <Img src={staticFile(shot.image!)} style={{ width: iw, height: ih, display: 'block' }} />
          {shot.reveal && (() => {
            const [rx, ry, rw, rh] = shot.reveal.rect;
            const p = interpolate(f, [shot.reveal.from, shot.reveal.from + shot.reveal.duration], [0, 1], clamp);
            return <div style={{ position: 'absolute', left: rx, top: ry + rh * p, width: rw, height: rh * (1 - p), backgroundColor: '#fff' }} />;
          })()}
          {shot.typing && (() => {
            const t = shot.typing;
            const n = Math.round(interpolate(f, [t.from, t.to], [0, t.text.length], clamp));
            const caretOn = Math.floor(f / 8) % 2 === 0 || (f >= t.from && f < t.to);
            return (
              <div style={{ position: 'absolute', left: t.rect[0], top: t.rect[1], width: t.rect[2], height: t.rect[3], backgroundColor: '#fff' }}>
                <div style={t.lineHeight ? {
                  position: 'absolute', left: t.textX - t.rect[0], top: 0, width: t.rect[2] - (t.textX - t.rect[0]),
                  fontFamily: `'Segoe UI', ${fonts.sans}, sans-serif`, fontSize: t.fontSize, lineHeight: `${t.lineHeight}px`, color: '#242424', whiteSpace: 'pre-wrap',
                } : {
                  position: 'absolute', left: t.textX - t.rect[0], top: 0, height: t.rect[3], display: 'flex', alignItems: 'center',
                  fontFamily: `'Segoe UI', ${fonts.sans}, sans-serif`, fontSize: t.fontSize, color: '#242424', whiteSpace: 'pre' }}>
                  {t.text.slice(0, n)}
                  <span style={{ display: 'inline-block', verticalAlign: 'middle', width: 1.5, height: t.fontSize * 1.2, backgroundColor: '#242424', marginLeft: 1, opacity: caretOn ? 1 : 0 }} />
                </div>
              </div>
            );
          })()}
        </div>
        {shot.spotlights?.map((sp, i) => <Spotlight key={i} rect={sp.rect} f={f} from={sp.from} to={sp.to} s={cam.s} />)}
        {shot.marks?.map((m, i) => <Mark key={i} type={m.type} rect={m.rect} f={f} from={m.from} to={m.to} s={cam.s} />)}
      </div>
      <Cursor shot={shot} f={f} cam={cam} />
    </AbsoluteFill>
  );
};

const Compare: React.FC<{ c: NonNullable<ScreenDemoShot['compare']>; f: number; imageSize: [number, number]; start: number }> = ({ c, f, imageSize, start }) => {
  const { fps } = useVideoConfig();
  const [cx, cy, cw, ch] = c.crop ?? [0, 0, imageSize[0], imageSize[1]];
  const PW = 860;
  const s = PW / cw;
  const PH = ch * s;
  const top = 400;
  const panels = [
    { src: c.before, label: c.beforeLabel, left: 80, delay: 0 },
    { src: c.after, label: c.afterLabel, left: 980, delay: 8 },
  ];
  const hl = interpolate(f, [c.highlightFrom, c.highlightFrom + 10], [0, 1], clamp);
  const stamp = spring({ frame: f - c.stampFrom, fps, config: { damping: 11, stiffness: 160 } });
  const st = interpolate(f, [c.statementFrom - 8, c.statementFrom + 10], [0, 1], clamp);
  const [hx, hy, hw, hh] = c.highlight;
  const parts = c.statement.split(c.statementHighlight);
  return (
    <>
      {panels.map((p, i) => {
        const a = interpolate(f, [start + p.delay, start + p.delay + 14], [0, 1], clamp);
        return (
          <div key={i} style={{ position: 'absolute', left: p.left, top, width: PW, opacity: a, transform: `translateY(${(1 - a) * 16}px)` }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 22, letterSpacing: '0.12em', fontWeight: 600, color: i === 1 ? colors.titleGreen : colors.neutral600, marginBottom: 14 }}>
              {p.label}
            </div>
            <div style={{ position: 'relative', width: PW, height: PH, borderRadius: 12, overflow: 'hidden', boxShadow: '0 14px 40px rgba(30,45,20,0.16)' }}>
              <Img src={staticFile(p.src)} style={{ position: 'absolute', left: -cx * s, top: -cy * s, width: imageSize[0] * s, height: imageSize[1] * s, maxWidth: 'none' }} />
              <div style={{ position: 'absolute', left: (hx - cx) * s - 6, top: (hy - cy) * s - 6, width: hw * s + 12, height: hh * s + 12, borderRadius: 8,
                border: `3px solid ${colors.lime500}`, boxShadow: `0 0 0 9999px rgba(18,26,14,${0.45 * hl})`, opacity: hl }} />
            </div>
          </div>
        );
      })}
      {f >= c.stampFrom && (
        <div style={{ position: 'absolute', left: 980 + PW - 290, top: top + 40 + PH - 40, transform: `rotate(-7deg) scale(${0.6 + 0.4 * stamp})`, opacity: Math.min(1, stamp * 1.4),
          border: `5px solid ${colors.lime500}`, color: colors.titleGreen, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 12,
          padding: '10px 26px', fontFamily: fonts.sans, fontWeight: 800, fontSize: 40, letterSpacing: '0.08em' }}>
          {c.stamp}
        </div>
      )}
      <div style={{ position: 'absolute', left: 0, right: 0, top: top + 40 + PH + 70, textAlign: 'center', opacity: st, transform: `translateY(${(1 - st) * 14}px)`,
        fontFamily: fonts.serif, fontSize: 64, color: colors.black }}>
        {parts[0]}<span style={{ color: colors.lime500 }}>{c.statementHighlight}</span>{parts[1]}
      </div>
    </>
  );
};

const StepChip: React.FC<{ label: string; steps: ScreenDemoProps['steps'] }> = ({ label, steps }) => {
  const f = useCurrentFrame();
  let idx = 0;
  steps.forEach((s, i) => { if (f >= s.from) idx = i; });
  const since = f - steps[idx].from;
  let currentLabel = label;
  steps.forEach((s, i) => { if (i <= idx && s.label) currentLabel = s.label; });
  const o = interpolate(since, [0, 10], [0, 1], clamp);
  return (
    <div style={{ position: 'absolute', left: 80, top: 40, display: 'flex', alignItems: 'center', gap: 16, padding: '12px 22px 12px 14px',
      backgroundColor: '#fff', borderRadius: 999, boxShadow: '0 6px 20px rgba(30,45,20,0.12)', fontFamily: fonts.sans }}>
      <span style={{ backgroundColor: colors.lime500, color: '#fff', fontWeight: 700, fontSize: 20, letterSpacing: '0.1em', padding: '6px 14px', borderRadius: 999 }}>{currentLabel}</span>
      <span style={{ fontSize: 26, color: '#1b2316', opacity: o, transform: `translateY(${(1 - o) * 6}px)` }}>{steps[idx].text}</span>
    </div>
  );
};

export const ScreenDemo: React.FC<ScreenDemoProps> = ({ label, steps, shots, durationInFrames }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#EEF2EA' }}>
      {shots.map((shot, i) => {
        const next = shots[i + 1];
        const nextTr = next?.transition ?? 'fade';
        const end = next ? next.from + (nextTr === 'cut' ? 0 : T) : durationInFrames;
        return (
          <Sequence key={i} from={shot.from} durationInFrames={end - shot.from} layout="none">
            <ShotLayer shot={shot} offset={shot.from} incoming={i > 0 || shot.transition !== undefined}
              outgoingAt={next?.from} outgoingSlide={nextTr === 'slide'} />
          </Sequence>
        );
      })}
      <StepChip label={label} steps={steps} />
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
