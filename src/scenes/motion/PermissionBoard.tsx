import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { Header, INK, LINE, MUTED, SOFT, WARN, Icon, Strike, appear, pop, prog } from './kit';

// An access-control panel for what an agent may do. Each row has a state that can change on cue:
// allowed (lime check), blocked (lock), approval (needs a person), unplugged (no tool connected),
// removed (struck out, "not in version one"), later (clock).

export type PermissionState = 'allowed' | 'blocked' | 'approval' | 'unplugged' | 'removed' | 'later';

export type PermissionBoardProps = {
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  note?: string;
  noteFrom?: number;
  panelTitle?: string;
  rows: Array<{
    text: string;
    from: number;
    state: PermissionState;
    badge?: string;
    changes?: Array<{ frame: number; state: PermissionState; badge?: string }>;
  }>;
  durationInFrames: number;
};

const BADGE: Record<PermissionState, { icon: 'check' | 'lock' | 'user' | 'plug' | 'x' | 'clock'; text: string; fg: string; bg: string }> = {
  allowed: { icon: 'check', text: 'Allowed', fg: colors.titleGreen, bg: '#E8F6DA' },
  blocked: { icon: 'lock', text: 'Not allowed', fg: INK, bg: '#ECEEEA' },
  approval: { icon: 'user', text: 'Needs approval', fg: '#8A5A00', bg: '#FFF3D6' },
  unplugged: { icon: 'plug', text: 'No tool connected', fg: INK, bg: '#ECEEEA' },
  removed: { icon: 'x', text: 'Not in version one', fg: WARN, bg: '#FDECE3' },
  later: { icon: 'clock', text: 'Later in the course', fg: MUTED, bg: '#F1F2EF' },
};

export const PermissionBoard: React.FC<PermissionBoardProps> = ({ label, title, titleFrom = 0, titleHighlight, note, noteFrom, panelTitle, rows }) => {
  const frame = useCurrentFrame();
  const rowH = rows.length > 5 ? 92 : 108;
  const panelTop = 300;
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Header frame={frame} label={label} title={title} titleFrom={titleFrom} titleHighlight={titleHighlight} note={note} noteFrom={noteFrom} width={720} />
      <div style={{ position: 'absolute', left: 860, top: panelTop - 90, width: 980, ...appear(frame, Math.max(0, rows[0]?.from - 10), 12) }}>
        {panelTitle && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: fonts.sans, fontSize: 22, letterSpacing: '0.12em', color: MUTED, fontWeight: 600, marginBottom: 18 }}>
            <span style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: colors.lime500 }} />
            {panelTitle}
          </div>
        )}
        <div style={{ border: `2px solid ${LINE}`, borderRadius: 18, backgroundColor: SOFT, padding: '8px 28px' }}>
          {rows.map((r, i) => {
            let state = r.state;
            let badge = r.badge;
            let changedAt = r.from;
            (r.changes ?? []).forEach((c) => { if (frame >= c.frame) { state = c.state; badge = c.badge ?? undefined; changedAt = c.frame; } });
            const b = BADGE[state];
            const removed = state === 'removed';
            const dim = removed ? 0.55 : 1;
            return (
              <div key={i} style={{ height: rowH, display: 'flex', alignItems: 'center', gap: 22, borderTop: i ? `1.5px solid ${LINE}` : 'none', ...appear(frame, r.from, 14, 12) }}>
                <div style={{ width: 54, height: 54, borderRadius: 27, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: state === 'allowed' ? colors.lime500 : '#fff', border: `2.5px solid ${state === 'allowed' ? colors.lime500 : INK}`, ...pop(frame, changedAt) }}>
                  <Icon name={b.icon} size={28} color={state === 'allowed' ? '#fff' : INK} />
                </div>
                <div style={{ position: 'relative', flex: 1, fontFamily: fonts.sans, fontSize: 36, color: INK, opacity: dim }}>
                  <span style={{ position: 'relative' }}>
                    {r.text}
                    {removed && <Strike frame={frame} at={changedAt} />}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, backgroundColor: b.bg, color: b.fg,
                  fontFamily: fonts.sans, fontSize: 24, fontWeight: 600, whiteSpace: 'nowrap', opacity: prog(frame, changedAt + 4, 10) }}>
                  {badge ?? b.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
