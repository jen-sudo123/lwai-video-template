import React from 'react';
import { IN_OUT, enter, prog } from './motion';
import { GREEN, LIME, LIME_SOFT, RED } from './theme';

// Part of the LWAI demo kit — see src/kit/README.md.

export const Check: React.FC<{ size?: number; color?: string }> = ({ size = 34, color = LIME }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="12" fill={color} />
    <path d="M6.5 12.5l3.6 3.4 7.4-8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Cross: React.FC<{ size?: number }> = ({ size = 34 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <circle cx="12" cy="12" r="12" fill={RED} />
    <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);
export const FolderIcon: React.FC<{ size?: number; open?: boolean }> = ({ size = 34, open }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M2 6.5A2.5 2.5 0 014.5 4h4.2l2 2.2h8.8A2.5 2.5 0 0122 8.7v9.8a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 18.5z" fill={open ? LIME_SOFT : '#F1F1EC'} stroke={open ? GREEN : '#B9B9B0'} strokeWidth="1.3" />
  </svg>
);
export const FileIcon: React.FC<{ size?: number; accent?: boolean }> = ({ size = 30, accent }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    <path d="M5 2.8h9.2L19 7.6v13.6H5z" fill="#fff" stroke={accent ? GREEN : '#B0B0A8'} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M14 2.8v5h5" fill="none" stroke={accent ? GREEN : '#B0B0A8'} strokeWidth="1.5" strokeLinejoin="round" />
    {accent && <rect x="7.5" y="12" width="9" height="2" rx="1" fill={LIME} />}
  </svg>
);
export const Spark: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ flex: 'none' }}>
    {[0, 30, 60, 90, 120, 150].map((a) => (
      <rect key={a} x="11" y="1.5" width="2" height="21" rx="1" fill="#D97757" transform={`rotate(${a} 12 12)`} />
    ))}
  </svg>
);
export const Toggle: React.FC<{ on: number; w?: number }> = ({ on, w = 76 }) => {
  const h = w * 0.56;
  return (
    <div style={{ width: w, height: h, borderRadius: h, background: on > 0.5 ? '#2F80ED' : '#D6D6D6', position: 'relative', flex: 'none', transition: 'none' }}>
      <div
        style={{
          position: 'absolute',
          top: h * 0.1,
          left: h * 0.1 + on * (w - h),
          width: h * 0.8,
          height: h * 0.8,
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 6px rgba(0,0,0,.25)',
        }}
      />
    </div>
  );
};
export const Arrow: React.FC<{ t: number; at: number; w: number; label?: string; dashed?: boolean }> = ({ t, at, w, label, dashed }) => {
  const p = prog(t, at, 0.9, IN_OUT);
  return (
    <div style={{ position: 'relative', width: w, height: 60, flex: 'none' }}>
      <svg width={w} height={60} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
        <line x1={0} y1={30} x2={(w - 18) * p} y2={30} stroke={GREEN} strokeWidth={5} strokeDasharray={dashed ? '12 10' : undefined} strokeLinecap="round" />
        {p > 0.95 && <path d={`M${w - 22} 16 L${w - 2} 30 L${w - 22} 44`} fill="none" stroke={GREEN} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      {label && (
        <div className="kit-ui" style={{ position: 'absolute', top: -34, left: 0, width: w, textAlign: 'center', fontSize: 22, fontWeight: 600, color: GREEN, ...enter(t, at + 0.5, { y: 8 }) }}>
          {label}
        </div>
      )}
    </div>
  );
};
