import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { colors, fonts } from '../../tokens';
import { LogoFooter } from '../../Logo';
import { Header, INK, MUTED, SOFT, WARN, Icon, easeOut, pop, prog } from './kit';

// Nodes and arrows that draw on in sync with the VO. Node kinds: step, done (lime check),
// decision (diamond-ish pill), good (lime fill), bad (struck out). Edges: straight arrows between
// node edges, an optional label, 'crossed' (red X on the line) and 'loop' (curved return path).

export type FlowNode = {
  id: string;
  text: string;
  sub?: string;
  x: number; // centre, canvas px
  y: number;
  w?: number;
  kind?: 'step' | 'done' | 'decision' | 'good' | 'bad';
  from: number;
  crossAt?: number;
};

export type FlowEdge = { from: string; to: string; at: number; label?: string; kind?: 'normal' | 'loop' | 'crossed' };

export type FlowDiagramProps = {
  label?: string;
  title?: string;
  titleFrom?: number;
  titleHighlight?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  durationInFrames: number;
};

const NODE_H = 132;

const edgePoint = (n: FlowNode, tx: number, ty: number) => {
  const w = (n.w ?? 360) / 2 + 10;
  const h = NODE_H / 2 + 10;
  const dx = tx - n.x;
  const dy = ty - n.y;
  const s = Math.min(Math.abs(dx) > 0 ? w / Math.abs(dx) : Infinity, Math.abs(dy) > 0 ? h / Math.abs(dy) : Infinity);
  return { x: n.x + dx * s, y: n.y + dy * s };
};

export const FlowDiagram: React.FC<FlowDiagramProps> = ({ label, title, titleFrom = 0, titleHighlight, nodes, edges }) => {
  const frame = useCurrentFrame();
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <Header frame={frame} label={label} title={title} titleFrom={titleFrom} titleHighlight={titleHighlight} width={1700} />
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <marker id="flow-arrow" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto" markerUnits="userSpaceOnUse">
            <path d="M2 2L12 7 2 12" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          const p = prog(frame, e.at, 16, easeOut);
          if (p <= 0) return null;
          if (e.kind === 'loop') {
            const y = Math.max(a.y, b.y) + NODE_H / 2 + 90;
            const d = `M${a.x} ${a.y + NODE_H / 2 + 6} C ${a.x} ${y}, ${b.x} ${y}, ${b.x} ${b.y + NODE_H / 2 + 8}`;
            return (
              <g key={i}>
                <path d={d} fill="none" stroke={INK} strokeWidth={3.5} strokeDasharray="1400" strokeDashoffset={1400 * (1 - p)} markerEnd={p > 0.95 ? 'url(#flow-arrow)' : undefined} />
                {e.label && <text x={(a.x + b.x) / 2} y={y - 10} textAnchor="middle" fontFamily={fonts.sans} fontSize={26} fill={MUTED} opacity={p}>{e.label}</text>}
              </g>
            );
          }
          const s = edgePoint(a, b.x, b.y);
          const t = edgePoint(b, a.x, a.y);
          const x2 = s.x + (t.x - s.x) * p;
          const y2 = s.y + (t.y - s.y) * p;
          const mx = (s.x + t.x) / 2;
          const my = (s.y + t.y) / 2;
          const cross = e.kind === 'crossed' ? prog(frame, e.at + 14, 10) : 0;
          return (
            <g key={i}>
              <line x1={s.x} y1={s.y} x2={x2} y2={y2} stroke={e.kind === 'crossed' ? MUTED : INK} strokeWidth={3.5} strokeDasharray={e.kind === 'crossed' ? '10 10' : undefined}
                markerEnd={p > 0.95 ? 'url(#flow-arrow)' : undefined} />
              {e.label && (
                <text x={mx + (Math.abs(t.y - s.y) > Math.abs(t.x - s.x) ? 18 : 0)} y={my - 14} textAnchor={Math.abs(t.y - s.y) > Math.abs(t.x - s.x) ? 'start' : 'middle'}
                  fontFamily={fonts.sans} fontSize={26} fontWeight={600} fill={colors.titleGreen} opacity={p}>{e.label}</text>
              )}
              {cross > 0 && (
                <g stroke={WARN} strokeWidth={6} strokeLinecap="round" opacity={cross}>
                  <path d={`M${mx - 18} ${my - 18}L${mx + 18} ${my + 18}M${mx + 18} ${my - 18}L${mx - 18} ${my + 18}`} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      {nodes.map((n) => {
        const w = n.w ?? 360;
        const kind = n.kind ?? 'step';
        const good = kind === 'good';
        const done = kind === 'done';
        const decision = kind === 'decision';
        const bad = kind === 'bad';
        const cross = n.crossAt === undefined ? 0 : prog(frame, n.crossAt, 10);
        return (
          <div key={n.id} style={{
            position: 'absolute', left: n.x - w / 2, top: n.y - NODE_H / 2, width: w, height: NODE_H, borderRadius: decision ? 66 : 18,
            border: `${good || decision ? 3 : 2.5}px ${bad ? 'dashed' : 'solid'} ${bad ? MUTED : good ? colors.lime500 : INK}`,
            backgroundColor: good ? colors.lime200 : decision ? SOFT : '#fff', boxShadow: bad ? 'none' : '0 10px 26px rgba(20,30,15,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '0 22px', boxSizing: 'border-box',
            ...pop(frame, n.from), opacity: (pop(frame, n.from).opacity as number) * (bad ? 0.85 : 1),
          }}>
            {done && (
              <div style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.lime500, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={26} color="#fff" stroke={3} />
              </div>
            )}
            <div style={{ textAlign: done ? 'left' : 'center', position: 'relative' }}>
              <div style={{ position: 'relative', display: 'inline-block', fontFamily: fonts.serif, fontSize: 32, lineHeight: 1.15, color: bad ? MUTED : INK }}>
                {n.text}
                {cross > 0 && <div style={{ position: 'absolute', left: -6, top: '52%', height: 4, width: `calc(${cross * 100}% + 12px)`, backgroundColor: WARN, borderRadius: 2 }} />}
              </div>
              {n.sub && <div style={{ fontFamily: fonts.sans, fontSize: 22, color: MUTED, marginTop: 6 }}>{n.sub}</div>}
            </div>
          </div>
        );
      })}
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};

