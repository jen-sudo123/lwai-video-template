import React from 'react';
import { FileIcon } from './icons';
import { GREEN, INK, LIME_SOFT, LINE, MUTED } from './theme';

// Part of the LWAI demo kit — see src/kit/README.md.
// Generic chat-app UI pieces for concept scenes (prompt box, dropdown menu).

export const Composer: React.FC<{ text: string; caret?: boolean; plusOn?: number; w?: number; children?: React.ReactNode }> = ({ text, caret, plusOn = 0, w = 470, children }) => (
  <div className="kit-card kit-ui" style={{ width: w, padding: '20px 22px 16px', borderRadius: 20, boxShadow: '0 10px 30px rgba(0,0,0,.06)', position: 'relative' }}>
    <div style={{ fontSize: 26, minHeight: 36, color: text ? INK : '#A8A8A8' }}>
      {text || 'How can I help you today?'}
      {caret && <span style={{ display: 'inline-block', width: 2, height: 28, background: INK, marginLeft: 2, verticalAlign: -4 }} />}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, border: `2px solid ${plusOn > 0.5 ? GREEN : LINE}`, background: plusOn > 0.5 ? LIME_SOFT : '#fff', display: 'grid', placeItems: 'center', fontSize: 28, color: MUTED, lineHeight: 1 }}>+</div>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: '#D97757', display: 'grid', placeItems: 'center', color: '#fff', fontSize: 22 }}>↑</div>
    </div>
    {children}
  </div>
);
export const MenuList: React.FC<{ items: string[]; active?: number; style?: React.CSSProperties; icon?: boolean }> = ({ items, active = -1, style, icon }) => (
  <div className="kit-card kit-ui" style={{ padding: 8, borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,.12)', ...style }}>
    {items.map((it, i) => (
      <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderRadius: 10, fontSize: 23, background: i === active ? LIME_SOFT : 'transparent', fontWeight: i === active ? 600 : 400 }}>
        {icon && <FileIcon size={22} accent={i === active} />}
        {it}
      </div>
    ))}
  </div>
);
