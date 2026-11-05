import React from 'react';
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from 'remotion';
import { colors, fonts, layout, typography } from '../tokens';
import { LogoFooter } from '../Logo';

// Left: a drawn mock of a real work artifact (dashboard screenshot, slide deck /
// memo, whiteboard photo) that "uploads" in. Right: label + title, then the
// short prompt(s) you'd type alongside it, typed out on cue.
type Variant = 'dashboard' | 'deck' | 'whiteboard';

type Props = {
  variant: Variant;
  label: string;
  title: string;
  fileName: string;
  artifactTiming?: number;
  prompts: string[];
  promptTimings?: number[];
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const MOCK_W = 880;
const MOCK_H = 600;
const INK = '#2B2B2B';
const SOFT = '#D9D9D9';
const RED = '#C8321E';

const DashboardMock: React.FC<{ t: number }> = ({ t }) => {
  // t = frames since artifact appeared (for a little line-draw)
  const draw = interpolate(t, [10, 50], [0, 1], clamp);
  const pts = [
    [60, 470], [140, 440], [220, 452], [300, 410], [380, 420], [460, 380], [540, 395], [620, 500], [700, 520], [800, 490],
  ];
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]} ${p[1]}`).join(' ');
  return (
    <svg width={MOCK_W} height={MOCK_H} viewBox={`0 0 ${MOCK_W} ${MOCK_H}`}>
      <rect x="0" y="0" width={MOCK_W} height={MOCK_H} rx="18" fill="#FFFFFF" />
      <rect x="0" y="0" width={MOCK_W} height="56" rx="18" fill="#F2F2F2" />
      <rect x="0" y="38" width={MOCK_W} height="18" fill="#F2F2F2" />
      {[24, 46, 68].map((x) => <circle key={x} cx={x} cy="28" r="7" fill="#CFCFCF" />)}
      <text x="110" y="37" fontFamily={fonts.sans} fontSize="22" fill="#777">Q3 Revenue Dashboard</text>
      {/* KPI tiles */}
      {[
        { x: 40, label: 'REVENUE', val: '$4.2M', delta: '+6%', good: true },
        { x: 315, label: 'NEW LOGOS', val: '38', delta: '+12%', good: true },
        { x: 590, label: 'NET RETENTION', val: '91%', delta: '-9 pts', good: false },
      ].map((k) => (
        <g key={k.x}>
          <rect x={k.x} y="84" width="250" height="140" rx="12" fill="#FAFAFA" stroke={k.good ? '#E6E6E6' : RED} strokeWidth={k.good ? 2 : 3} />
          <text x={k.x + 22} y="122" fontFamily={fonts.sans} fontSize="18" fontWeight="600" letterSpacing="2" fill="#888">{k.label}</text>
          <text x={k.x + 22} y="180" fontFamily={fonts.serif} fontSize="48" fill={INK}>{k.val}</text>
          <text x={k.x + 22} y="210" fontFamily={fonts.sans} fontSize="20" fontWeight="700" fill={k.good ? colors.lime500 : RED}>{k.delta}</text>
        </g>
      ))}
      {/* Chart */}
      <rect x="40" y="252" width="800" height="310" rx="12" fill="#FAFAFA" stroke="#E6E6E6" strokeWidth="2" />
      {[330, 400, 470, 540].map((y) => <line key={y} x1="60" x2="820" y1={y} y2={y} stroke="#EEE" strokeWidth="2" />)}
      <path d={d} fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - draw} />
      <circle cx="700" cy="520" r={12 * draw} fill={RED} opacity={0.9} />
      <text x="60" y="290" fontFamily={fonts.sans} fontSize="18" fontWeight="600" letterSpacing="2" fill="#888">WEEKLY BOOKINGS</text>
    </svg>
  );
};

const DeckMock: React.FC = () => (
  <svg width={MOCK_W} height={MOCK_H} viewBox={`0 0 ${MOCK_W} ${MOCK_H}`}>
    {/* memo behind */}
    <g transform="translate(560 40) rotate(6)">
      <rect x="0" y="0" width="300" height="420" rx="10" fill="#FFFFFF" stroke="#DDD" strokeWidth="2" />
      <text x="28" y="54" fontFamily={fonts.serif} fontSize="28" fill={INK}>Memo</text>
      {[90, 120, 150, 180, 220, 250, 280, 310, 350].map((y, i) => (
        <rect key={y} x="28" y={y} width={[230, 200, 240, 160, 230, 210, 180, 240, 120][i]} height="10" rx="5" fill={SOFT} />
      ))}
    </g>
    {/* slide */}
    <g transform="translate(20 110)">
      <rect x="0" y="0" width="640" height="400" rx="14" fill="#FFFFFF" stroke="#DDD" strokeWidth="2" />
      <rect x="0" y="0" width="640" height="14" rx="7" fill={colors.lime500} />
      <text x="40" y="78" fontFamily={fonts.serif} fontSize="38" fill={INK}>Series B: Growth Plan</text>
      {[130, 180, 230].map((y, i) => (
        <g key={y}>
          <circle cx="52" cy={y} r="7" fill={INK} />
          <rect x="74" y={y - 7} width={[300, 260, 330][i]} height="14" rx="7" fill={SOFT} />
        </g>
      ))}
      {/* mini chart on slide */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={430 + i * 44} y={330 - (40 + i * 34)} width="30" height={40 + i * 34} fill={i === 3 ? colors.lime500 : '#CFCFCF'} />
      ))}
      <line x1="420" x2="610" y1="330" y2="330" stroke={INK} strokeWidth="3" />
      <text x="40" y="360" fontFamily={fonts.sans} fontSize="18" fill="#999">3x ARR in 24 months*</text>
    </g>
    {/* page dots for "deck" */}
    {[0, 1, 2, 3, 4].map((i) => (
      <rect key={i} x={20 + i * 132} y="540" width="120" height="44" rx="6" fill={i === 0 ? '#FFFFFF' : '#F4F4F4'} stroke={i === 0 ? colors.lime500 : '#E2E2E2'} strokeWidth={i === 0 ? 3 : 2} />
    ))}
  </svg>
);

const Sticky: React.FC<{ x: number; y: number; r: number; fill: string; text: string }> = ({ x, y, r, fill, text }) => (
  <g transform={`translate(${x} ${y}) rotate(${r})`}>
    <rect x="0" y="0" width="170" height="130" fill={fill} />
    <text x="16" y="56" fontFamily={fonts.serif} fontStyle="italic" fontSize="28" fill={INK}>
      {text.split('\n').map((l, i) => (
        <tspan key={i} x="16" dy={i ? 34 : 0}>{l}</tspan>
      ))}
    </text>
  </g>
);

const WhiteboardMock: React.FC = () => (
  <svg width={MOCK_W} height={MOCK_H} viewBox={`0 0 ${MOCK_W} ${MOCK_H}`}>
    {/* photo frame feel: slight grey vignette */}
    <rect x="0" y="0" width={MOCK_W} height={MOCK_H} rx="18" fill="#E9E7E2" />
    <rect x="34" y="30" width={MOCK_W - 68} height={MOCK_H - 70} rx="6" fill="#FBFBF8" stroke="#B9B9B9" strokeWidth="10" />
    <rect x="300" y={MOCK_H - 44} width="280" height="12" rx="4" fill="#B9B9B9" />
    <text x="80" y="104" fontFamily={fonts.serif} fontStyle="italic" fontSize="40" fill="#2F5DA8">2027 bets??</text>
    <path d="M78 116 C 160 128, 240 110, 300 120" stroke="#2F5DA8" strokeWidth="4" fill="none" />
    <Sticky x={90} y={170} r={-4} fill="#FFE58A" text={'enter\nDACH?'} />
    <Sticky x={310} y={150} r={3} fill="#D0F8AB" text={'pricing\ntiers'} />
    <Sticky x={530} y={180} r={-2} fill="#FFC9D6" text={'churn in\nSMB!!'} />
    <Sticky x={200} y={360} r={5} fill="#BFE3FF" text={'partner\nchannel'} />
    <Sticky x={460} y={370} r={-6} fill="#FFE58A" text={'hire\nCS lead'} />
    <path d="M265 240 C 290 250, 300 250, 312 236" stroke={INK} strokeWidth="4" fill="none" />
    <path d="M610 320 C 600 350, 580 360, 560 372" stroke={RED} strokeWidth="4" fill="none" />
    <ellipse cx="615" cy="245" rx="120" ry="90" stroke={RED} strokeWidth="4" fill="none" />
    <path d="M640 520 C 680 500, 720 500, 760 470" stroke={INK} strokeWidth="4" fill="none" />
    <path d="M760 470 l-22 2 M760 470 l-8 20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <text x="700" y="440" fontFamily={fonts.serif} fontStyle="italic" fontSize="30" fill={INK}>v1?</text>
  </svg>
);

const Paperclip: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={colors.neutral600} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.5l-8.6 8.6a5 5 0 01-7.1-7.1l9.2-9.2a3.3 3.3 0 014.7 4.7l-9.2 9.2a1.7 1.7 0 01-2.4-2.4l8.5-8.5" />
  </svg>
);

export const ArtifactPrompt: React.FC<Props> = ({
  variant,
  label,
  title,
  fileName,
  artifactTiming = 20,
  prompts,
  promptTimings = [],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOpacity = interpolate(frame, [0, 15], [0, 1], clamp);
  const headY = interpolate(frame, [0, 18], [16, 0], { ...clamp, easing: Easing.out(Easing.cubic) });

  const aT = frame - artifactTiming;
  const aSp = spring({ frame: aT, fps, config: { damping: 14, stiffness: 140, mass: 0.8 } });
  const aOp = interpolate(aT, [0, 10], [0, 1], clamp);
  const aY = interpolate(aSp, [0, 1], [60, 0]);
  const aRot = interpolate(aSp, [0, 1], [-3, variant === 'whiteboard' ? -1.5 : 0]);

  const mock = variant === 'dashboard' ? <DashboardMock t={aT} /> : variant === 'deck' ? <DeckMock /> : <WhiteboardMock />;

  const chipOp = interpolate(aT, [8, 20], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white }}>
      {/* Artifact (left) */}
      <div
        style={{
          position: 'absolute',
          left: layout.safeMargin,
          top: 200,
          width: MOCK_W,
          height: MOCK_H,
          borderRadius: 18,
          boxShadow: '0 24px 60px rgba(0,0,0,0.14)',
          border: '2px solid rgba(0,0,0,0.08)',
          overflow: 'hidden',
          opacity: aOp,
          transform: `translateY(${aY}px) rotate(${aRot}deg)`,
          background: colors.white,
        }}
      >
        {mock}
      </div>

      {/* Right column */}
      <div style={{ position: 'absolute', left: 1040, right: layout.safeMargin, top: 200 }}>
        <div style={{ ...typography.label, opacity: headOpacity }}>{label}</div>
        <div
          style={{
            ...typography.title,
            fontSize: 60,
            marginTop: 20,
            color: colors.black,
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
          }}
        >
          {title}
        </div>

        {/* attachment chip */}
        <div
          style={{
            marginTop: 48,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 22px',
            borderRadius: 14,
            border: '2px solid rgba(0,0,0,0.12)',
            fontFamily: fonts.sans,
            fontSize: 24,
            color: '#444',
            opacity: chipOp,
          }}
        >
          <Paperclip />
          {fileName}
        </div>

        {prompts.map((p, i) => {
          const t = promptTimings[i] ?? 60 + i * 40;
          const local = frame - t;
          const op = interpolate(local, [0, 8], [0, 1], clamp);
          const sp = spring({ frame: local, fps, config: { damping: 16, stiffness: 160 } });
          const chars = Math.floor(interpolate(local, [0, Math.max(10, p.length * 0.9)], [0, p.length], clamp));
          return (
            <div
              key={i}
              style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'flex-end',
                opacity: op,
                transform: `translateY(${interpolate(sp, [0, 1], [20, 0])}px)`,
              }}
            >
              <div
                style={{
                  background: '#F0F9E8',
                  borderRadius: '28px 28px 8px 28px',
                  padding: '26px 34px',
                  fontFamily: fonts.sans,
                  fontSize: 38,
                  lineHeight: 1.35,
                  color: colors.black,
                  maxWidth: 760,
                  position: 'relative',
                }}
              >
                {/* invisible full text reserves the final size so the bubble doesn't jump */}
                <span style={{ visibility: 'hidden' }}>{p}</span>
                <span style={{ position: 'absolute', left: 34, top: 26, right: 34 }}>{p.slice(0, chars)}</span>
              </div>
            </div>
          );
        })}
      </div>

      <LogoFooter />
    </AbsoluteFill>
  );
};
