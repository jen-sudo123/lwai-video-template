import React from 'react';
import { colors, fonts } from '../../tokens';

// Simple line-drawn glyphs for "work artifacts" (charts, slides, screenshots...).
// Drawn in a 120×90 viewBox so they sit nicely inside a landscape tile.
export type ArtifactKind =
  | 'chart'
  | 'slide'
  | 'dashboard'
  | 'notes'
  | 'file'
  | 'screenshot'
  | 'photo'
  | 'audio'
  | 'video'
  | 'inputs';

const INK = '#2B2B2B';
const SOFT = '#BDBDBD';
const LIME = colors.lime500;

export const ArtifactGlyph: React.FC<{ kind: ArtifactKind; width?: number }> = ({ kind, width = 120 }) => {
  const sw = 3;
  const common = { fill: 'none', stroke: INK, strokeWidth: sw, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  let body: React.ReactNode = null;

  switch (kind) {
    case 'chart':
      body = (
        <>
          <path d="M14 78 H106" {...common} />
          <path d="M14 78 V12" {...common} />
          <rect x="26" y="50" width="14" height="28" fill={SOFT} />
          <rect x="48" y="36" width="14" height="42" fill={SOFT} />
          <rect x="70" y="24" width="14" height="54" fill={LIME} />
          <rect x="92" y="42" width="10" height="36" fill={SOFT} />
        </>
      );
      break;
    case 'slide':
      body = (
        <>
          <rect x="8" y="10" width="104" height="70" rx="4" {...common} />
          <rect x="18" y="20" width="56" height="8" fill={INK} />
          <path d="M20 40 H70 M20 52 H64 M20 64 H58" stroke={SOFT} strokeWidth={5} strokeLinecap="round" />
          <circle cx="92" cy="54" r="12" fill={LIME} />
        </>
      );
      break;
    case 'dashboard':
      body = (
        <>
          <rect x="8" y="8" width="104" height="74" rx="4" {...common} />
          <rect x="16" y="16" width="26" height="16" fill={SOFT} />
          <rect x="47" y="16" width="26" height="16" fill={SOFT} />
          <rect x="78" y="16" width="26" height="16" fill={LIME} />
          <path d="M16 70 L36 56 L52 62 L72 44 L88 50 L104 38" {...common} stroke={INK} />
        </>
      );
      break;
    case 'notes':
      body = (
        <>
          <rect x="24" y="6" width="72" height="80" rx="4" {...common} />
          <path d="M34 24 H86 M34 38 H86 M34 52 H80 M34 66 H70" stroke={SOFT} strokeWidth={4} strokeLinecap="round" />
          <path d="M24 6 V86" stroke={LIME} strokeWidth={6} />
        </>
      );
      break;
    case 'file':
      body = (
        <>
          <path d="M30 6 H72 L92 26 V86 H30 Z" {...common} />
          <path d="M72 6 V26 H92" {...common} />
          <path d="M40 46 H82 M40 58 H82 M40 70 H70" stroke={SOFT} strokeWidth={4} strokeLinecap="round" />
        </>
      );
      break;
    case 'screenshot':
      body = (
        <>
          <rect x="6" y="10" width="108" height="72" rx="5" {...common} />
          <path d="M6 24 H114" {...common} />
          <circle cx="15" cy="17" r="2.5" fill={INK} />
          <circle cx="23" cy="17" r="2.5" fill={INK} />
          <circle cx="31" cy="17" r="2.5" fill={INK} />
          <rect x="16" y="34" width="40" height="38" fill={SOFT} />
          <path d="M64 38 H104 M64 50 H98 M64 62 H90" stroke={LIME} strokeWidth={5} strokeLinecap="round" />
        </>
      );
      break;
    case 'photo':
      body = (
        <>
          <rect x="8" y="10" width="104" height="72" rx="5" {...common} />
          <circle cx="86" cy="30" r="9" fill={LIME} />
          <path d="M14 76 L44 42 L64 62 L76 50 L106 76 Z" fill={SOFT} />
        </>
      );
      break;
    case 'audio':
      body = (
        <>
          {[10, 22, 34, 46, 58, 70, 82, 94, 106].map((x, i) => {
            const h = [16, 34, 52, 28, 64, 40, 56, 24, 14][i];
            return <path key={x} d={`M${x} ${45 - h / 2} V${45 + h / 2}`} stroke={i === 4 ? LIME : INK} strokeWidth={6} strokeLinecap="round" />;
          })}
        </>
      );
      break;
    case 'video':
      body = (
        <>
          <rect x="8" y="10" width="104" height="72" rx="5" {...common} />
          <circle cx="60" cy="46" r="20" fill={LIME} />
          <path d="M54 36 L70 46 L54 56 Z" fill={colors.white} />
        </>
      );
      break;
    case 'inputs':
      body = (
        <>
          <circle cx="60" cy="45" r="32" {...common} strokeDasharray="6 7" />
          <path d="M60 30 V60 M45 45 H75" stroke={LIME} strokeWidth={6} strokeLinecap="round" />
        </>
      );
      break;
  }

  return (
    <svg width={width} height={(width * 90) / 120} viewBox="0 0 120 90" style={{ overflow: 'visible' }}>
      {body}
    </svg>
  );
};

// A tile: rounded card with a glyph and a small caps caption.
export const ArtifactTile: React.FC<{ kind: ArtifactKind; label: string; width?: number }> = ({ kind, label, width = 240 }) => (
  <div
    style={{
      width,
      height: width * 0.82,
      borderRadius: 20,
      border: '2px solid rgba(0,0,0,0.12)',
      background: colors.white,
      boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
    }}
  >
    <ArtifactGlyph kind={kind} width={width * 0.5} />
    <div
      style={{
        fontFamily: fonts.sans,
        fontSize: 22,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: colors.neutral600,
      }}
    >
      {label}
    </div>
  </div>
);
