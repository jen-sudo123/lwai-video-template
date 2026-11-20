import React from 'react';
import { AbsoluteFill, Audio, Easing, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import {
  BACK,
  Check,
  Cross,
  FileIcon,
  GREEN,
  INK,
  IN_OUT,
  KIT_CSS,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  RED,
  enter,
  makeScene,
  markStyle,
  prog,
  typed,
} from '../kit';

loadSerif();
loadSans();

// From AI fluency to an AI-native organization — custom concept composition (Lead with AI).
// VO: public/audio/AiNativeOrg.mp3 (Daan, ElevenLabs v4, Take A, 226.2s). Every cue is the second of the
// word it names, from the Scribe word timestamps in src/data/AiNativeOrg.transcript.json.
// A 90-frame green title card opens the video; the VO and every scene start after it.
//
// Recurring motif: a four-stage roadmap (Individual workflows → Team agents → Company-wide systems →
// Scale what works) opens each section and lights up the current stage.
//
//  #  scene                                start   VO cue
//  1  Imagine everyone is AI fluent        0.00    "Imagine everyone…"
//  2  Every team is faster                 4.30    "Marketing writes copy faster…"
//  3  The work between teams is slow       12.08   "And yet, campaign approvals…"
//  4  The gap                              19.10   "That gap is the difference…"
//  5  Redesign how work connects           25.15   "AI fluency makes individuals…"
//  6  Section 1: people who know the work  33.89   "So where do you begin?"
//  7  The employee who runs the workflow   36.80   "In our work with thousands…"
//  8  They know the work                   44.25   "Just like you did…"
//  9  Tacit knowledge (iceberg)            52.70   "That's tacit knowledge…"
//  10 Three things                         59.70   "So every successful AI transformation…"
//  11 Slower, but it matters               72.30   "Yes, it's slower…"
//  12 Bonus: details systems need          84.70   "There's a bonus, too…"
//  13 Section 2: team agents               92.67   "Once several people…"
//  14 Three tools → one shared agent       99.85   "Picture this…"
//  15 Handoffs no one owns                 117.75  "The goal is to redesign…"
//  16 Section 3: company-wide systems      129.47  "When you look across teams…"
//  17 Marketing agent                      139.05  "Imagine a marketing agent…"
//  18 Onboarding system                    150.30  "Or picture an onboarding system…"
//  19 Foundations                          158.45  "Systems like these need more…"
//  20 Rejected                             174.25  "Otherwise, you risk…"
//  21 Section 4: the progression           181.65  "So here's the progression…"
//  22 Measure the complete process         195.45  "As you scale…"
//  23 Two questions                        210.10  "The next time someone proposes…"
//  24 Closing                              220.35  "Because in the end…"

export const AI_NATIVE_ORG_DURATION_S = 227.4;
export const AI_NATIVE_ORG_TITLE_FRAMES = 90;

const STARTS = [
  0, 4.3, 12.08, 19.1, 25.15, 33.89, 36.8, 44.25, 52.7, 59.7, 72.3, 84.7, 92.67, 99.85, 117.75, 129.47, 139.05,
  150.3, 158.45, 174.25, 181.65, 195.45, 210.1, 220.35,
];
const Scene = makeScene(STARTS, 0.5);

// ── Shared pieces ───────────────────────────────────────────────────────────

const Person: React.FC<{ size?: number; color?: string; ring?: boolean }> = ({ size = 60, color = '#CFCFC8', ring }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ flex: 'none', overflow: 'visible' }}>
    {ring && <circle cx="20" cy="20" r="21" fill="none" stroke={LIME} strokeWidth="2.5" />}
    <circle cx="20" cy="20" r="19" fill={color === LIME ? LIME_SOFT : '#F4F4F0'} />
    <circle cx="20" cy="15" r="6.2" fill={color} />
    <path d="M8.5 32.5c1.6-6.2 6.2-9.3 11.5-9.3s9.9 3.1 11.5 9.3" fill={color} />
  </svg>
);

// A line that draws itself on from (x1,y1) to (x2,y2)
const DrawLine: React.FC<{ p: number; x1: number; y1: number; x2: number; y2: number; color?: string; w?: number; dashed?: boolean }> = ({
  p,
  x1,
  y1,
  x2,
  y2,
  color = GREEN,
  w = 4,
  dashed,
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x1 + (x2 - x1) * p}
    y2={y1 + (y2 - y1) * p}
    stroke={color}
    strokeWidth={w}
    strokeLinecap="round"
    strokeDasharray={dashed ? '10 10' : undefined}
    opacity={p > 0 ? 1 : 0}
  />
);

const pop = (t: number, at: number, dur = 0.55) => enter(t, at, { y: 0, scale: 0.6, easing: BACK, dur });
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;

// Scene labels in this video: a soft green chip in sentence case instead of the kit's grey uppercase eyebrow.
const LABEL_CSS = `
  .ano .kit-label { display: inline-flex; align-self: flex-start; width: fit-content; gap: 12px; padding: 10px 24px 10px 18px; border-radius: 999px;
    background: ${LIME_SOFT}; color: ${GREEN}; font-size: 26px; font-weight: 700; letter-spacing: 0; text-transform: none; margin: 0 0 28px; }
  .ano .kit-label::before { width: 12px; height: 12px; border-radius: 50%; background: ${GREEN}; }
`;

const STAGES = ['Individual workflows', 'Team agents', 'Company-wide systems', 'Scale what works'];

// The four-stage roadmap. `current` lights up; earlier stages show a check.
const Roadmap: React.FC<{ t: number; at: number; current: number; compact?: boolean }> = ({ t, at, current, compact }) => {
  const lit = prog(t, at + 0.6, 0.6, IN_OUT);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
      {STAGES.map((s, i) => {
        const isCur = i === current;
        const done = i < current;
        return (
          <React.Fragment key={s}>
            {i > 0 && (
              <div style={{ width: compact ? 40 : 56, height: 4, background: i <= current ? GREEN : LINE, opacity: 0.9, ...enter(t, at + i * 0.08, { y: 0 }) }} />
            )}
            <div
              className="kit-ui"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: compact ? '12px 20px' : '18px 26px',
                borderRadius: 999,
                border: `2px solid ${isCur ? GREEN : LINE}`,
                background: isCur ? `rgba(102,198,28,${0.22 * lit})` : '#fff',
                fontSize: compact ? 22 : 26,
                fontWeight: 600,
                color: isCur || done ? INK : MUTED,
                whiteSpace: 'nowrap',
                transform: `scale(${isCur ? 1 + 0.06 * lit : 1})`,
                ...enter(t, at + i * 0.08, { y: 16 }),
              }}
            >
              {done ? (
                <Check size={compact ? 26 : 30} />
              ) : (
                <span
                  style={{
                    width: compact ? 26 : 30,
                    height: compact ? 26 : 30,
                    borderRadius: '50%',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: compact ? 15 : 17,
                    background: isCur ? GREEN : '#EFEFEA',
                    color: isCur ? '#fff' : MUTED,
                  }}
                >
                  {i + 1}
                </span>
              )}
              {s}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Section opener: roadmap on top, big section headline, then the first VO line.
const SectionOpen: React.FC<{ t: number; at: number; stage: number; title: React.ReactNode; children?: React.ReactNode }> = ({
  t,
  at,
  stage,
  title,
  children,
}) => (
  <>
    <div style={enter(t, at + 0.05, { y: 10 })}>
      <Roadmap t={t} at={at} current={stage} compact />
    </div>
    <div className="kit-label" style={{ marginTop: 70, ...enter(t, at + 0.3, { y: 12 }) }}>
      Step {stage + 1}
    </div>
    <div className="kit-h1" style={{ maxWidth: 1500, ...enter(t, at + 0.4, { dur: 0.9, y: 30 }) }}>
      {title}
    </div>
    {children}
  </>
);

// ── Body ────────────────────────────────────────────────────────────────────
const Body: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill className="ano" style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      <style>{LABEL_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/AiNativeOrg.mp3')} />}

      {/* 1 — Imagine everyone is AI fluent: the whole org lights up */}
      <Scene t={t} index={0}>
        <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Imagine</div>
        <div className="kit-h1" style={enter(t, 0.25, { dur: 0.9, y: 30 })}>
          Everyone in your organization is <span className="kit-mark" style={markStyle(t, 2.72)}>AI fluent.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(18, 1fr)', gap: 22, marginTop: 80, width: 1500 }}>
          {Array.from({ length: 54 }).map((_, i) => {
            const col = i % 18;
            const row = Math.floor(i / 18);
            const on = prog(t, 2.6 + col * 0.06 + row * 0.12 + ((i * 7) % 5) * 0.03, 0.35);
            return (
              <div key={i} style={{ ...enter(t, 0.6 + i * 0.012, { y: 10, dur: 0.4 }) }}>
                <Person size={62} color={on > 0.5 ? LIME : '#CFCFC8'} />
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 2 — Every team is faster */}
      <Scene t={t} index={1}>
        <div className="kit-label" style={enter(t, 4.4, { y: 14 })}>Individual fluency</div>
        <div className="kit-h2" style={enter(t, 4.5, { dur: 0.8, y: 26 })}>Every team gets faster.</div>
        <div style={{ display: 'flex', gap: 40, marginTop: 70 }}>
          {[
            { team: 'Marketing', task: 'Writes copy', result: 'Faster', at: 4.4, hit: 5.4 },
            { team: 'Sales', task: 'Drafts proposals', result: 'In minutes', at: 6.52, hit: 8.24 },
            { team: 'HR', task: 'Summarizes interviews', result: 'In seconds', at: 9.12, hit: 11.04 },
          ].map((c) => {
            const shrink = prog(t, c.at + 0.4, (c.hit - c.at) * 0.9, IN_OUT);
            return (
              <div key={c.team} className="kit-card kit-ui" style={{ width: 533, padding: '34px 38px', ...enter(t, c.at, { y: 30 }) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <Person size={54} color={LIME} />
                  <div style={{ fontSize: 34, fontWeight: 700 }}>{c.team}</div>
                </div>
                <div style={{ fontSize: 28, color: MUTED, marginTop: 22 }}>{c.task}</div>
                <div style={{ marginTop: 26, height: 18, borderRadius: 9, background: '#F1F1EC', overflow: 'hidden' }}>
                  <div style={{ width: `${lerp(100, 12, shrink)}%`, height: '100%', borderRadius: 9, background: shrink > 0.98 ? LIME : '#CFCFC8' }} />
                </div>
                <div style={{ fontSize: 22, color: MUTED, marginTop: 10 }}>time spent</div>
                <div className="kit-h3" style={{ fontSize: 46, marginTop: 18, ...pop(t, c.hit) }}>{c.result}</div>
              </div>
            );
          })}
        </div>
      </Scene>

      {/* 3 — And yet: approvals take a week, information gets lost between departments */}
      <Scene t={t} index={2}>
        <div className="kit-label" style={enter(t, 12.1, { y: 14 })}>And yet</div>
        <div className="kit-h2" style={enter(t, 12.2, { dur: 0.8, y: 26 })}>
          The work <span className="kit-mark" style={markStyle(t, 17.6)}>between</span> teams is still slow.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50, marginTop: 70 }}>
          {/* Approval clock */}
          <div className="kit-card kit-ui" style={{ padding: '36px 40px', ...enter(t, 13.04, { y: 30 }) }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>Campaign approval</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 34 }}>
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => {
                const on = prog(t, 13.4 + i * 0.2, 0.25);
                return (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div style={{ height: 70, borderRadius: 12, background: on > 0.5 ? (i === 6 ? RED : '#F3D9CB') : '#F1F1EC' }} />
                    <div style={{ fontSize: 20, color: MUTED, marginTop: 8 }}>{d}</div>
                  </div>
                );
              })}
            </div>
            <div className="kit-h3" style={{ marginTop: 26, color: RED, ...pop(t, 14.64) }}>Still takes a week</div>
          </div>
          {/* Lost information */}
          <div className="kit-card kit-ui" style={{ padding: '36px 40px', position: 'relative', ...enter(t, 15.56, { y: 30 }) }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>Customer information</div>
            <div style={{ position: 'relative', height: 140, marginTop: 34 }}>
              {[
                ['Sales', 0],
                ['Delivery', 520],
              ].map(([n, x]) => (
                <div key={n as string} className="kit-pill" style={{ position: 'absolute', left: x as number, top: 34, fontSize: 26, padding: '14px 24px' }}>
                  {n as string}
                </div>
              ))}
              <svg width={680} height={140} style={{ position: 'absolute', left: 0, top: 0 }}>
                <DrawLine p={prog(t, 16.0, 0.6)} x1={150} y1={68} x2={510} y2={68} color={LINE} w={4} dashed />
              </svg>
              {(() => {
                const move = prog(t, 16.4, 1.0, IN_OUT);
                const lost = prog(t, 17.12, 0.6);
                return (
                  <>
                    <div style={{ position: 'absolute', left: lerp(150, 300, move), top: 30 - lost * 30, opacity: 1 - lost, transform: `rotate(${lost * -25}deg)` }}>
                      <FileIcon size={64} accent />
                    </div>
                    <div className="kit-h3" style={{ position: 'absolute', left: 312, top: 30, color: RED, fontSize: 64, ...pop(t, 17.3) }}>?</div>
                  </>
                );
              })()}
            </div>
            <div className="kit-h3" style={{ marginTop: 16, color: RED, ...pop(t, 18.12) }}>Lost between departments</div>
          </div>
        </div>
      </Scene>

      {/* 4 — The gap */}
      <Scene t={t} index={3}>
        <div className="kit-label" style={enter(t, 19.2, { y: 14 })}>The gap</div>
        <div style={{ display: 'flex', alignItems: 'stretch', marginTop: 20 }}>
          {(() => {
            const gap = prog(t, 19.36, 1.0, IN_OUT);
            return (
              <>
                <div className="kit-card kit-ui" style={{ width: 640, padding: '44px 46px', ...enter(t, 21.0, { x: -40, y: 0 }) }}>
                  <div className="kit-tag">Basic</div>
                  <div className="kit-h2" style={{ marginTop: 24 }}>AI fluency</div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <Person key={i} size={70} color={LIME} />
                    ))}
                  </div>
                  <div style={{ fontSize: 30, color: MUTED, marginTop: 28 }}>Individuals get faster</div>
                </div>
                <div style={{ width: lerp(60, 400, gap), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={lerp(60, 400, gap)} height={60}>
                    <DrawLine p={gap} x1={20} y1={30} x2={lerp(60, 400, gap) - 20} y2={30} color={MUTED} w={3} dashed />
                  </svg>
                  <div className="kit-ui" style={{ fontSize: 30, fontWeight: 700, color: GREEN, marginTop: 6, opacity: gap }}>the gap</div>
                </div>
                <div className="kit-card kit-ui" style={{ width: 640, padding: '44px 46px', borderColor: GREEN, background: '#FAFDF6', ...enter(t, 22.96, { x: 40, y: 0 }) }}>
                  <div className="kit-tag" style={{ background: LIME, color: '#fff' }}>Goal</div>
                  <div className="kit-h2" style={{ marginTop: 24 }}>AI-native organization</div>
                  <svg width={540} height={90} style={{ marginTop: 26 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <DrawLine p={prog(t, 23.5 + i * 0.15, 0.4)} x1={(i - 1) * 140 + 70} y1={45} x2={i * 140 + 35} y2={45} w={4} />}
                        <circle cx={i * 140 + 35} cy={45} r={34} fill={LIME_SOFT} stroke={GREEN} strokeWidth={3} />
                      </React.Fragment>
                    ))}
                  </svg>
                  <div style={{ fontSize: 30, color: MUTED, marginTop: 14 }}>Work connects across teams</div>
                </div>
              </>
            );
          })()}
        </div>
      </Scene>

      {/* 5 — Fluency makes individuals capable; transformation redesigns the connections */}
      <Scene t={t} index={4}>
        {(() => {
          const nodes = [
            { x: 180, y: 120 },
            { x: 560, y: 300 },
            { x: 900, y: 90 },
            { x: 1240, y: 290 },
            { x: 1580, y: 130 },
          ];
          const edges = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [1, 3],
            [0, 2],
            [2, 4],
          ];
          const second = prog(t, 28.6, 0.6);
          return (
            <>
              <div style={{ position: 'relative', height: 200 }}>
                <div className="kit-h2" style={{ position: 'absolute', top: 0, opacity: 1 - second, ...{ transform: `translateY(${-20 * second}px)` } }}>
                  Fluency makes <span className="kit-mark" style={markStyle(t, 26.6)}>individuals</span> more capable.
                </div>
                <div className="kit-h2" style={{ position: 'absolute', top: 0, opacity: second, transform: `translateY(${20 * (1 - second)}px)` }}>
                  Transformation redesigns <span className="kit-mark" style={markStyle(t, 31.6)}>how work connects.</span>
                </div>
              </div>
              <div style={{ position: 'relative', height: 440, marginTop: 30 }}>
                <svg width={1760} height={440} style={{ position: 'absolute', left: 0, top: 0 }}>
                  {edges.map(([a, b], i) => (
                    <DrawLine
                      key={i}
                      p={prog(t, 32.3 + i * 0.12, 0.6, IN_OUT)}
                      x1={nodes[a].x}
                      y1={nodes[a].y}
                      x2={nodes[b].x}
                      y2={nodes[b].y}
                      w={5}
                    />
                  ))}
                </svg>
                {nodes.map((n, i) => {
                  const glow = prog(t, 26.6 + i * 0.12, 0.5);
                  return (
                    <div key={i} style={{ position: 'absolute', left: n.x - 50, top: n.y - 50, ...enter(t, 25.3 + i * 0.1, { y: 0, scale: 0.7 }) }}>
                      <div style={{ borderRadius: '50%', boxShadow: `0 0 0 ${glow * 14}px rgba(102,198,28,0.18)` }}>
                        <Person size={100} color={glow > 0.5 ? LIME : '#CFCFC8'} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
      </Scene>

      {/* 6 — Section 1 */}
      <Scene t={t} index={5}>
        <SectionOpen t={t} at={33.95} stage={0} title={<>Start with the people <span className="kit-mark" style={markStyle(t, 35.2)}>who know the work.</span></>}>
          <p className="kit-body kit-muted" style={{ fontSize: 40, marginTop: 40, ...enter(t, 34.96, { y: 14 }) }}>
            So where do you begin?
          </p>
        </SectionOpen>
      </Scene>

      {/* 7 — The employee who runs the workflow */}
      <Scene t={t} index={6}>
        <div className="kit-label" style={enter(t, 37.76, { y: 14 })}>Lesson from thousands of leaders</div>
        <div className="kit-h2" style={enter(t, 41.28, { dur: 0.8, y: 26 })}>
          Start with the <span className="kit-mark" style={markStyle(t, 41.92)}>employee who runs the workflow.</span>
        </div>
        <div style={{ position: 'relative', height: 360, marginTop: 70 }}>
          <svg width={1760} height={360} style={{ position: 'absolute', left: 0, top: 0 }}>
            <DrawLine p={prog(t, 37.0, 1.6, IN_OUT)} x1={60} y1={250} x2={1700} y2={250} color={LINE} w={6} />
          </svg>
          {['Request', 'Gather', 'Draft', 'Review', 'Approve', 'Deliver'].map((s, i) => {
            const active = prog(t, 43.28 + i * 0.12, 0.3);
            return (
              <div
                key={s}
                className="kit-pill"
                style={{ position: 'absolute', left: 40 + i * 290, top: 216, fontSize: 26, borderColor: active > 0.5 ? GREEN : LINE, background: active > 0.5 ? '#FAFDF6' : '#fff', ...enter(t, 37.3 + i * 0.18, { y: 16 }) }}
              >
                {s}
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 790, top: 0, textAlign: 'center', ...pop(t, 41.92, 0.7) }}>
            <Person size={150} color={LIME} ring />
          </div>
          <svg width={1760} height={360} style={{ position: 'absolute', left: 0, top: 0 }}>
            <DrawLine p={prog(t, 42.5, 0.4)} x1={865} y1={152} x2={865} y2={212} w={4} dashed />
          </svg>
        </div>
      </Scene>

      {/* 8 — They know the work */}
      <Scene t={t} index={7}>
        <div style={{ display: 'grid', gridTemplateColumns: '520px 1fr', gap: 60, alignItems: 'center' }}>
          <div style={{ textAlign: 'center', ...enter(t, 44.3, { y: 20 }) }}>
            <Person size={340} color={LIME} />
            <div className="kit-h3" style={{ marginTop: 26 }}>They know the work.</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {[
              ['The exceptions', 46.8],
              ['Which information goes missing', 48.64],
              ['What good looks like', 51.36],
            ].map(([txt, at], i) => (
              <div
                key={txt as string}
                className="kit-card kit-ui"
                style={{ padding: '30px 40px', borderRadius: 40, borderBottomLeftRadius: 8, fontSize: 42, fontFamily: 'IBM Plex Serif', marginLeft: i * 50, ...enter(t, (at as number) - 0.15, { x: -40, y: 0, easing: BACK }) }}
              >
                {txt as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 9 — Tacit knowledge: the iceberg */}
      <Scene t={t} index={8}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 820px', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 52.8, { y: 14 })}>What they carry</div>
            <div className="kit-h1" style={enter(t, 53.0, { dur: 0.9, y: 30 })}>
              <span className="kit-mark" style={markStyle(t, 53.4)}>Tacit</span> knowledge.
            </div>
            <p className="kit-body" style={{ fontSize: 40, marginTop: 40, maxWidth: 760, ...enter(t, 54.7, { y: 16 }) }}>
              The expertise we use every day, <span className="kit-muted" style={enter(t, 56.8, { y: 0 })}>without realizing how hard it is to explain.</span>
            </p>
          </div>
          {(() => {
            const sink = prog(t, 53.3, 1.4, IN_OUT);
            const W = 820;
            const H = 700;
            const water = lerp(470, 220, sink);
            return (
              <div style={{ position: 'relative', width: W, height: H, ...enter(t, 52.9, { y: 30 }) }}>
                <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
                  <defs>
                    <clipPath id="ice-above">
                      <rect x={0} y={0} width={W} height={water} />
                    </clipPath>
                    <clipPath id="ice-below">
                      <rect x={0} y={water} width={W} height={H} />
                    </clipPath>
                  </defs>
                  <rect x={0} y={water} width={W} height={H - water} fill="#EAF3FA" rx={24} />
                  <path
                    id="berg"
                    d="M410 40 L500 150 L560 205 L640 330 L720 470 L690 600 L540 680 L300 690 L150 610 L100 470 L190 330 L280 210 L330 150 Z"
                    fill="#fff"
                    stroke="#9CB8CC"
                    strokeWidth={4}
                    clipPath="url(#ice-above)"
                    transform={`translate(0 ${lerp(250, 0, sink)})`}
                  />
                  <path
                    d="M410 40 L500 150 L560 205 L640 330 L720 470 L690 600 L540 680 L300 690 L150 610 L100 470 L190 330 L280 210 L330 150 Z"
                    fill="#CFE3F1"
                    stroke="#7FA3BD"
                    strokeWidth={4}
                    clipPath="url(#ice-below)"
                    transform={`translate(0 ${lerp(250, 0, sink)})`}
                  />
                  <line x1={0} y1={water} x2={W} y2={water} stroke="#7FA3BD" strokeWidth={3} strokeDasharray="14 10" />
                </svg>
                <div className="kit-ui" style={{ position: 'absolute', left: 20, top: Math.max(10, water - 56), fontSize: 22, fontWeight: 600, color: MUTED, opacity: sink }}>
                  What gets written down
                </div>
                {['Judgment calls', 'Shortcuts', 'Exceptions', 'Who to ask'].map((s, i) => (
                  <div
                    key={s}
                    className="kit-pill"
                    style={{ position: 'absolute', left: [190, 430, 170, 420][i], top: [330, 380, 470, 520][i], fontSize: 24, padding: '10px 20px', background: '#fff', ...pop(t, 55.0 + i * 0.35) }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </Scene>

      {/* 10 — Three things: map, explain, co-create */}
      <Scene t={t} index={9}>
        <div className="kit-label" style={enter(t, 59.8, { y: 14 })}>Every successful AI transformation</div>
        <div className="kit-h2" style={enter(t, 62.2, { dur: 0.8, y: 26 })}>
          Help each employee do <span className="kit-mark" style={markStyle(t, 64.32)}>three things.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, marginTop: 64 }}>
          {/* Map */}
          <div className="kit-card kit-ui" style={{ padding: '34px 36px', height: 420, ...enter(t, 65.5, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="kit-tag">1</span>
              <span style={{ fontSize: 36, fontWeight: 700 }}>Map their work</span>
            </div>
            <svg width={480} height={260} style={{ marginTop: 30 }}>
              {[
                [20, 30],
                [180, 30],
                [340, 30],
                [180, 170],
              ].map(([x, y], i) => (
                <rect key={i} x={x} y={y} width={120} height={64} rx={12} fill={i === 3 ? LIME_SOFT : '#F4F4F0'} stroke={i === 3 ? GREEN : '#BDBDB4'} strokeWidth={3} opacity={prog(t, 65.8 + i * 0.25, 0.3)} />
              ))}
              <DrawLine p={prog(t, 66.0, 0.3)} x1={140} y1={62} x2={180} y2={62} />
              <DrawLine p={prog(t, 66.25, 0.3)} x1={300} y1={62} x2={340} y2={62} />
              <DrawLine p={prog(t, 66.5, 0.3)} x1={240} y1={94} x2={240} y2={170} dashed />
            </svg>
          </div>
          {/* Explain */}
          <div className="kit-card kit-ui" style={{ padding: '34px 36px', height: 420, ...enter(t, 66.85, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="kit-tag">2</span>
              <span style={{ fontSize: 36, fontWeight: 700 }}>Explain their judgment</span>
            </div>
            <div style={{ marginTop: 40, padding: '26px 30px', background: '#F7F7F3', borderRadius: 28, borderBottomLeftRadius: 6, fontSize: 30, lineHeight: 1.4, minHeight: 170 }}>
              {typed(t, 67.4, '“If the client is new, I always check the contract first, because…”', 2.6)}
            </div>
          </div>
          {/* Co-create + test */}
          <div className="kit-card kit-ui" style={{ padding: '34px 36px', height: 420, ...enter(t, 68.8, { y: 30 }) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span className="kit-tag">3</span>
              <span style={{ fontSize: 36, fontWeight: 700 }}>Co-create and test</span>
            </div>
            <div style={{ marginTop: 40, border: `2px solid ${LINE}`, borderRadius: 18, padding: '24px 26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 600 }}>
                <span style={{ width: 44, height: 44, borderRadius: 12, background: LIME_SOFT, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 26 }}>✦</span>
                {prog(t, 70.4, 0.2) < 0.5 ? 'Assistant' : 'Agent'}
              </div>
              <div style={{ marginTop: 26, height: 64, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, fontSize: 28, fontWeight: 700, background: t >= 71.9 ? LIME : INK, color: '#fff' }}>
                {t >= 71.9 ? (
                  <>
                    <span style={{ fontSize: 30 }}>✓</span> <span>Test passed</span>
                  </>
                ) : (
                  'Run test'
                )}
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 11 — Slower, but it matters */}
      <Scene t={t} index={10}>
        <div className="kit-h2" style={enter(t, 72.4, { dur: 0.8, y: 26 })}>
          Yes, it's <span style={{ color: MUTED }}>slower.</span> <span style={enter(t, 73.84, { y: 0 })}>But it <span className="kit-mark" style={markStyle(t, 74.35)}>matters.</span></span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 80 }}>
          {[
            { lbl: 'Built without employees', at: 75.16, res: 'Misses the reality of the job', resAt: 77.68, ok: false },
            { lbl: 'Built with employees', at: 79.76, res: 'Works better', resAt: 82.16, ok: true },
          ].map((r) => (
            <div key={r.lbl} style={{ display: 'flex', alignItems: 'center', gap: 30, ...enter(t, r.at, { x: -40, y: 0 }) }}>
              <div className="kit-card kit-ui" style={{ width: 680, padding: '30px 36px', fontSize: 36, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 18 }}>
                <div style={{ display: 'flex' }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ marginLeft: i ? -14 : 0, opacity: r.ok ? 1 : 0.35 }}>
                      <Person size={52} color={r.ok ? LIME : '#BDBDB4'} />
                    </div>
                  ))}
                </div>
                {r.lbl}
              </div>
              <svg width={120} height={20}>
                <DrawLine p={prog(t, r.at + 0.6, 0.6)} x1={4} y1={10} x2={116} y2={10} color={r.ok ? GREEN : RED} />
              </svg>
              <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 38, fontWeight: 600, color: r.ok ? INK : RED, ...pop(t, r.resAt) }}>
                {r.ok ? <Check size={46} /> : <Cross size={46} />}
                {r.res}
              </div>
              {r.ok && (
                <span className="kit-tag" style={{ fontSize: 24, padding: '10px 22px', ...pop(t, 83.92) }}>
                  …and they own it
                </span>
              )}
            </div>
          ))}
        </div>
      </Scene>

      {/* 12 — Bonus: individual workflows surface what bigger systems need */}
      <Scene t={t} index={11}>
        <div className="kit-label" style={enter(t, 84.8, { y: 14 })}>A bonus</div>
        <div className="kit-h2" style={enter(t, 86.2, { dur: 0.8, y: 26 })}>
          Individual workflows surface <span className="kit-mark" style={markStyle(t, 91.6)}>what bigger systems need.</span>
        </div>
        <div style={{ position: 'relative', height: 470, marginTop: 50 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: i * 150, width: 520, height: 120, padding: '0 26px', display: 'flex', alignItems: 'center', gap: 18, ...enter(t, 86.4 + i * 0.25, { x: -40, y: 0 }) }}>
              <Person size={64} color={LIME} />
              <div style={{ display: 'flex', gap: 10 }}>
                {[0, 1, 2, 3].map((k) => (
                  <div key={k} style={{ width: 70, height: 30, borderRadius: 8, background: '#F1F1EC', border: `2px solid ${LINE}` }} />
                ))}
              </div>
            </div>
          ))}
          {/* Chips flowing into the system */}
          {['Knowledge', 'Process details', 'Edge cases', 'Data sources', 'Quality bar', 'Handoffs'].map((c, i) => {
            const start = 89.24 + i * 0.32;
            const f = prog(t, start, 1.3, IN_OUT);
            const row = i % 3;
            const x = lerp(560, 1150 + (i % 2) * 210, f);
            const y = lerp(row * 150 + 40, 140 + Math.floor(i / 2) * 80, f);
            return (
              <div key={c} className="kit-pill" style={{ position: 'absolute', left: x, top: y, fontSize: 22, padding: '8px 18px', opacity: prog(t, start, 0.2), zIndex: 2 }}>
                {c}
              </div>
            );
          })}
          <div className="kit-card kit-ui" style={{ position: 'absolute', left: 1110, top: 40, width: 650, height: 400, borderColor: GREEN, background: '#FAFDF6', borderStyle: 'dashed', ...enter(t, 90.9, { y: 20 }) }}>
            <div style={{ padding: '24px 30px', fontSize: 30, fontWeight: 700, color: GREEN }}>Your larger systems, later</div>
          </div>
        </div>
      </Scene>

      {/* 13 — Section 2 */}
      <Scene t={t} index={12}>
        <SectionOpen t={t} at={92.75} stage={1} title={<>Connect workflows into <span className="kit-mark" style={markStyle(t, 94.2)}>team agents.</span></>}>
          <div style={{ position: 'relative', height: 220, marginTop: 40 }}>
            <svg width={1760} height={220} style={{ position: 'absolute', inset: 0 }}>
              {[0, 1, 2].map((i) => (
                <React.Fragment key={i}>
                  <DrawLine p={prog(t, 94.4 + i * 0.25, 1.0)} x1={0} y1={30 + i * 80} x2={700} y2={30 + i * 80} color="#CFCFC8" w={6} />
                  <DrawLine p={prog(t, 98.3 + i * 0.1, 0.8, IN_OUT)} x1={700} y1={30 + i * 80} x2={980} y2={110} w={6} />
                </React.Fragment>
              ))}
              <circle cx={1000} cy={110} r={prog(t, 98.9, 0.5, BACK) * 30} fill={LIME} />
            </svg>
            <div className="kit-body" style={{ position: 'absolute', left: 1060, top: 82, fontSize: 36, ...enter(t, 98.8, { x: -20, y: 0 }) }}>
              Find where they <b>connect</b>.
            </div>
          </div>
        </SectionOpen>
      </Scene>

      {/* 14 — Three separate tools → one shared agent */}
      <Scene t={t} index={13}>
        <div className="kit-label" style={enter(t, 99.95, { y: 14 })}>Picture this</div>
        {(() => {
          const instead = prog(t, 109.68, 0.6);
          return (
            <div className="kit-h2" style={{ position: 'relative', height: 90, ...enter(t, 100.0, { y: 20 }) }}>
              <span style={{ position: 'absolute', opacity: 1 - instead }}>
                Today: <span className="kit-mark" style={markStyle(t, 108.0)}>three separate tools.</span>
              </span>
              <span style={{ position: 'absolute', opacity: instead }}>
                Instead: <span className="kit-mark" style={markStyle(t, 111.4)}>one shared agent.</span>
              </span>
            </div>
          );
        })()}
        <div style={{ position: 'relative', height: 560, marginTop: 40 }}>
          {[
            { team: 'Sales', task: 'Prepares the proposal', at: 101.12, x: 0 },
            { team: 'Finance', task: 'Checks the pricing', at: 103.12, x: 620 },
            { team: 'Delivery', task: 'Plans the work', at: 105.08, x: 1240 },
          ].map((c, i) => {
            const glow = c.team === 'Finance' && t >= 114.72;
            return (
              <div key={c.team} className="kit-card kit-ui" style={{ position: 'absolute', left: c.x, top: 0, width: 520, padding: '28px 32px', borderColor: glow ? GREEN : LINE, ...enter(t, c.at, { y: 30 }) }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Person size={56} color={LIME} />
                  <div style={{ fontSize: 34, fontWeight: 700 }}>{c.team}</div>
                </div>
                <div style={{ fontSize: 28, color: MUTED, marginTop: 16 }}>{c.task}</div>
                <div className="kit-mono" style={{ marginTop: 20, fontSize: 20, padding: '8px 14px', borderRadius: 10, background: '#F4F4F0', display: 'inline-block', opacity: 1 - prog(t, 110.0, 0.6) * 0.6, ...enter(t, 107.92 + i * 0.2, { y: 8 }) }}>
                  Tool {String.fromCharCode(65 + i)}
                </div>
                {glow && (
                  <div className="kit-tag" style={{ position: 'absolute', right: 24, top: -18, ...pop(t, 114.72) }}>
                    Approval requested
                  </div>
                )}
              </div>
            );
          })}
          {/* Broken handoffs between separate tools */}
          {[520, 1140].map((x, i) => (
            <div key={x} style={{ position: 'absolute', left: x + 20, top: 90, width: 60, textAlign: 'center', opacity: prog(t, 108.5 + i * 0.2, 0.3) * (1 - prog(t, 110.2, 0.5)) }}>
              <Cross size={46} />
            </div>
          ))}
          {/* Shared agent bar */}
          {(() => {
            const bar = prog(t, 111.36, 0.8, IN_OUT);
            const packet = prog(t, 113.12, 1.6, IN_OUT);
            const move = prog(t, 116.64, 1.0, IN_OUT);
            return (
              <>
                <svg width={1760} height={560} style={{ position: 'absolute', inset: 0 }}>
                  {[260, 880, 1500].map((x, i) => (
                    <DrawLine key={x} p={prog(t, 111.8 + i * 0.12, 0.4)} x1={x} y1={240} x2={x} y2={350} w={4} dashed />
                  ))}
                </svg>
                <div
                  className="kit-ui"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 350,
                    width: 1760 * bar,
                    height: 120,
                    borderRadius: 26,
                    background: INK,
                    color: '#fff',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    padding: bar > 0.2 ? '0 40px' : 0,
                    boxSizing: 'border-box',
                    gap: 20,
                    fontSize: 34,
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ width: 50, height: 50, borderRadius: 14, background: LIME, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>✦</span>
                  Shared team agent
                  <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, fontSize: 24, fontWeight: 600, opacity: prog(t, 116.64, 0.4) }}>
                    Process moving
                    <span style={{ width: 240, height: 14, borderRadius: 7, background: '#444', overflow: 'hidden' }}>
                      <span style={{ display: 'block', width: `${move * 100}%`, height: '100%', background: LIME }} />
                    </span>
                  </span>
                </div>
                {/* Information packet travelling between teams */}
                {packet > 0 && packet < 1 && (
                  <div style={{ position: 'absolute', left: lerp(240, 1480, packet), top: 380, width: 40, height: 52, opacity: Math.min(1, packet * 6, (1 - packet) * 6), zIndex: 3 }}>
                    <FileIcon size={52} accent />
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </Scene>

      {/* 15 — Redesign the whole workflow, especially the handoffs */}
      <Scene t={t} index={14}>
        <div className="kit-h2" style={enter(t, 117.85, { dur: 0.8, y: 26 })}>
          Redesign the <span className="kit-mark" style={markStyle(t, 119.6)}>whole workflow.</span>
        </div>
        <p className="kit-body kit-muted" style={{ fontSize: 38, marginTop: 20, ...enter(t, 120.56, { y: 12 }) }}>
          Especially the handoffs no one person owns.
        </p>
        <div style={{ position: 'relative', height: 420, marginTop: 60 }}>
          {['Sales', 'Finance', 'Delivery'].map((n, i) => (
            <div key={n} className="kit-card kit-ui" style={{ position: 'absolute', left: i * 640, top: 40, width: 480, height: 130, display: 'flex', alignItems: 'center', gap: 18, padding: '0 30px', fontSize: 36, fontWeight: 700, ...enter(t, 118.0 + i * 0.15, { y: 20 }) }}>
              <Person size={64} color={LIME} /> {n}
            </div>
          ))}
          {[480, 1120].map((x, i) => {
            const pulse = prog(t, 121.36 + i * 0.15, 0.5, BACK);
            const beat = 1 + 0.06 * Math.sin((t - 121.36) * 5) * (t > 121.9 ? 1 : 0);
            return (
              <React.Fragment key={x}>
                <div style={{ position: 'absolute', left: x + 20, top: 55, width: 120, height: 100, borderRadius: 50, border: `4px dashed ${GREEN}`, background: 'rgba(102,198,28,0.12)', transform: `scale(${pulse * beat})` }} />
                <div className="kit-tag" style={{ position: 'absolute', left: x - 20, top: 190, fontSize: 18, ...pop(t, 122.24 + i * 0.2) }}>
                  No one owns this
                </div>
                <div style={{ position: 'absolute', left: x + 20, top: 250, width: 120, display: 'flex', justifyContent: 'center', ...pop(t, 124.16 + i * 0.25) }}>
                  <Person size={84} color={LIME} ring />
                </div>
              </React.Fragment>
            );
          })}
          <div className="kit-ui" style={{ position: 'absolute', left: 0, top: 360, width: 1760, textAlign: 'center', fontSize: 32, fontWeight: 600, ...enter(t, 125.44, { y: 12 }) }}>
            The people who revealed the handoffs <span className="kit-mark" style={markStyle(t, 126.68)}>help design and test</span> the fix.
          </div>
        </div>
      </Scene>

      {/* 16 — Section 3 */}
      <Scene t={t} index={15}>
        <SectionOpen t={t} at={129.5} stage={2} title={<>Discover <span className="kit-mark" style={markStyle(t, 130.6)}>company-wide</span> systems.</>}>
          <p className="kit-body" style={{ fontSize: 40, marginTop: 40, ...enter(t, 131.84, { y: 14 }) }}>
            Opportunities no single employee could build alone.
          </p>
          <p className="kit-body kit-muted" style={{ fontSize: 34, marginTop: 14, ...enter(t, 135.64, { y: 14 }) }}>
            Some go well beyond fixing today's handoffs.
          </p>
        </SectionOpen>
      </Scene>

      {/* 17 — Marketing agent grounded in what worked */}
      <Scene t={t} index={16}>
        <div className="kit-label" style={enter(t, 139.15, { y: 14 })}>Example</div>
        <div className="kit-h2" style={enter(t, 139.3, { dur: 0.8, y: 26 })}>
          A marketing agent, <span className="kit-mark" style={markStyle(t, 148.08)}>grounded in what worked.</span>
        </div>
        <div style={{ position: 'relative', height: 520, marginTop: 50 }}>
          {[
            ['Past campaigns', 143.32],
            ['Their results', 144.4],
            ['Brand guidelines', 145.52],
          ].map(([s, at], i) => (
            <div key={s as string} className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: 30 + i * 160, width: 440, height: 120, display: 'flex', alignItems: 'center', gap: 18, padding: '0 28px', fontSize: 32, fontWeight: 600, ...enter(t, (at as number) - 0.1, { x: -40, y: 0 }) }}>
              <FileIcon size={44} accent={i === 2} /> {s as string}
            </div>
          ))}
          <svg width={1760} height={520} style={{ position: 'absolute', inset: 0 }}>
            {[143.32, 144.4, 145.52].map((at, i) => (
              <DrawLine key={i} p={prog(t, at + 0.2, 0.6, IN_OUT)} x1={440} y1={90 + i * 160} x2={640} y2={250} w={4} />
            ))}
            <DrawLine p={prog(t, 146.8, 0.5, IN_OUT)} x1={1060} y1={250} x2={1180} y2={250} w={4} />
          </svg>
          {/* Agent */}
          <div className="kit-card kit-ui" style={{ position: 'absolute', left: 640, top: 140, width: 420, height: 220, background: INK, borderColor: INK, color: '#fff', padding: '30px 34px', ...pop(t, 139.64, 0.7) }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 34, fontWeight: 700 }}>
              <span style={{ width: 54, height: 54, borderRadius: 14, background: LIME, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>✦</span>
              Marketing agent
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 34, fontSize: 24, color: '#DADADA', ...enter(t, 140.72, { y: 8 }) }}>
              <svg width={26} height={30} viewBox="0 0 26 30">
                <rect x={2} y={12} width={22} height={16} rx={4} fill={LIME} />
                <path d="M7 12V8a6 6 0 0112 0v4" fill="none" stroke={LIME} strokeWidth={3} />
              </svg>
              Secure access
            </div>
          </div>
          {/* Draft */}
          <div className="kit-card kit-ui" style={{ position: 'absolute', left: 1180, top: 60, width: 580, height: 380, padding: '30px 34px', ...enter(t, 146.96, { x: 30, y: 0 }) }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.1em', color: MUTED, textTransform: 'uppercase' }}>New copy · draft</div>
            <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 36, marginTop: 20, lineHeight: 1.25 }}>{typed(t, 147.2, 'Launch faster with less guesswork.', 1.4)}</div>
            {[0.92, 0.8, 0.86, 0.6].map((w, i) => (
              <div key={i} style={{ height: 14, borderRadius: 7, background: '#EDEDE7', width: `${w * 100 * prog(t, 148.2 + i * 0.25, 0.4)}%`, marginTop: 18 }} />
            ))}
            <div className="kit-tag" style={{ marginTop: 26, ...pop(t, 148.96) }}>Based on top campaigns</div>
          </div>
        </div>
      </Scene>

      {/* 18 — Onboarding system: never asked twice */}
      <Scene t={t} index={17}>
        <div className="kit-label" style={enter(t, 150.4, { y: 14 })}>Example</div>
        <div className="kit-h2" style={enter(t, 150.6, { dur: 0.8, y: 26 })}>
          One onboarding system. <span className="kit-mark" style={markStyle(t, 156.64)}>Never asked twice.</span>
        </div>
        <div style={{ position: 'relative', height: 500, marginTop: 50 }}>
          {[
            ['Sales commitments', 152.77, 40],
            ['Delivery plans', 153.68, 280],
          ].map(([s, at, y]) => (
            <div key={s as string} className="kit-card kit-ui" style={{ position: 'absolute', left: 0, top: y as number, width: 460, height: 130, display: 'flex', alignItems: 'center', gap: 18, padding: '0 30px', fontSize: 32, fontWeight: 600, ...enter(t, (at as number) - 0.1, { x: -40, y: 0 }) }}>
              <Person size={56} color={LIME} /> {s as string}
            </div>
          ))}
          <svg width={1760} height={500} style={{ position: 'absolute', inset: 0 }}>
            <DrawLine p={prog(t, 153.0, 0.6, IN_OUT)} x1={460} y1={105} x2={620} y2={225} w={4} />
            <DrawLine p={prog(t, 153.9, 0.6, IN_OUT)} x1={460} y1={345} x2={620} y2={225} w={4} />
            <DrawLine p={prog(t, 154.8, 0.5, IN_OUT)} x1={1040} y1={225} x2={1160} y2={225} w={4} />
          </svg>
          <div className="kit-card kit-ui" style={{ position: 'absolute', left: 620, top: 130, width: 420, height: 190, background: INK, borderColor: INK, color: '#fff', padding: '30px 34px', fontSize: 34, fontWeight: 700, ...pop(t, 151.12, 0.7) }}>
            <span style={{ width: 54, height: 54, borderRadius: 14, background: LIME, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, marginBottom: 20 }}>✦</span>
            <div>Onboarding system</div>
          </div>
          {/* Customer side */}
          <div className="kit-card kit-ui" style={{ position: 'absolute', left: 1160, top: 30, width: 600, padding: '30px 34px', ...enter(t, 154.96, { x: 30, y: 0 }) }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.1em', color: MUTED, textTransform: 'uppercase' }}>Customer</div>
            {[
              ['Company details', 155.3, true],
              ['Project scope', 155.6, true],
            ].map(([f, at]) => (
              <div key={f as string} style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 22, fontSize: 30, ...enter(t, at as number, { y: 10 }) }}>
                <Check size={36} /> {f as string}
                <span style={{ marginLeft: 'auto', fontSize: 22, color: GREEN, fontWeight: 600 }}>asked once</span>
              </div>
            ))}
            <div style={{ position: 'relative', marginTop: 30, padding: '18px 22px', borderRadius: 14, border: `2px dashed ${RED}`, fontSize: 26, color: RED, ...enter(t, 156.08, { y: 10 }) }}>
              <span style={{ textDecoration: t >= 157.6 ? 'line-through' : 'none' }}>“Can you send your company details again?”</span>
              <div style={{ position: 'absolute', right: -16, top: -16, ...pop(t, 157.6) }}>
                <Cross size={40} />
              </div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 19 — Foundations leadership must provide; employees still design and test */}
      <Scene t={t} index={18}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 900px', gap: 60, alignItems: 'center' }}>
          <div>
            <div className="kit-label" style={enter(t, 158.55, { y: 14 })}>What it takes</div>
            <div className="kit-h2" style={enter(t, 158.6, { dur: 0.8, y: 26 })}>
              Systems like these<br /><span className="kit-mark" style={markStyle(t, 159.6)}>need more.</span>
            </div>
            <p className="kit-body" style={{ fontSize: 36, marginTop: 40, ...enter(t, 167.04, { y: 14 }) }}>
              <b>Leadership and technical teams</b> provide the foundation.
            </p>
            <p className="kit-body" style={{ fontSize: 36, marginTop: 24, ...enter(t, 170.88, { y: 14 }) }}>
              <span className="kit-mark" style={markStyle(t, 172.36)}>Employees still help design and test.</span>
            </p>
          </div>
          <div style={{ position: 'relative', height: 720 }}>
            {/* People standing on top */}
            <div style={{ position: 'absolute', left: 0, top: 30, width: 900, display: 'flex', justifyContent: 'center', gap: 24 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={pop(t, 170.88 + i * 0.12)}>
                  <Person size={84} color={LIME} />
                </div>
              ))}
            </div>
            {[
              ['Investment', 166.12],
              ['Clear ownership', 164.4],
              ['Governance', 163.4],
              ['Technical integration', 161.92],
              ['Shared data', 160.72],
            ].map(([b, at], i) => (
              <div
                key={b as string}
                className="kit-ui"
                style={{
                  position: 'absolute',
                  left: 40 + (4 - i) * 0,
                  top: 150 + i * 100,
                  width: 820,
                  height: 84,
                  borderRadius: 16,
                  background: i === 4 ? INK : '#fff',
                  color: i === 4 ? '#fff' : INK,
                  border: `3px solid ${i === 4 ? INK : GREEN}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 32,
                  fontWeight: 700,
                  ...enter(t, (at as number) - 0.1, { y: -120, dur: 0.6, easing: BACK }),
                }}
              >
                {b as string}
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 20 — Impressive technology that doesn't fit gets rejected */}
      <Scene t={t} index={19}>
        <div className="kit-label" style={enter(t, 174.35, { y: 14 })}>Otherwise</div>
        <div className="kit-h2" style={enter(t, 174.5, { dur: 0.8, y: 26 })}>
          Impressive technology that <span className="kit-mark" style={markStyle(t, 177.6)}>doesn't fit</span> how people work.
        </div>
        {(() => {
          const slide = prog(t, 177.2, 0.9, IN_OUT);
          const bounce = prog(t, 178.15, 0.6, BACK);
          const x = lerp(0, 380, slide) - bounce * 120;
          const shake = t > 178.05 && t < 178.6 ? Math.sin((t - 178.05) * 60) * 8 : 0;
          return (
            <div style={{ position: 'relative', height: 480, marginTop: 50 }}>
              {/* Slot: how people actually work (round notch) */}
              <div style={{ position: 'absolute', left: 1180, top: 60, ...enter(t, 176.6, { y: 20 }) }}>
                <svg width={560} height={300}>
                  <path d="M20 20 H200 A80 80 0 0 0 360 20 H540 V280 H20 Z" fill="#F7F7F3" stroke="#BDBDB4" strokeWidth={4} strokeDasharray="14 10" />
                </svg>
                <div className="kit-ui" style={{ textAlign: 'center', fontSize: 28, fontWeight: 600, color: MUTED, marginTop: 14 }}>How people actually work</div>
              </div>
              {/* Tech block (square tab) */}
              <div style={{ position: 'absolute', left: 300 + x + shake, top: 40, ...enter(t, 175.92, { y: 30, scale: 0.9 }) }}>
                <svg width={560} height={300}>
                  <defs>
                    <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#2B2B2B" />
                      <stop offset="1" stopColor="#111" />
                    </linearGradient>
                  </defs>
                  <path d="M20 40 H200 V0 H360 V40 H540 V280 H20 Z" fill="url(#shine)" />
                </svg>
                <div className="kit-ui" style={{ position: 'absolute', left: 0, top: 130, width: 560, textAlign: 'center', color: '#fff', fontSize: 34, fontWeight: 700 }}>
                  ✦ Impressive technology
                </div>
              </div>
              {/* Stamp */}
              <div
                className="kit-ui"
                style={{
                  position: 'absolute',
                  left: 720,
                  top: 250,
                  padding: '12px 36px',
                  border: `8px solid ${RED}`,
                  borderRadius: 18,
                  color: RED,
                  fontSize: 76,
                  fontWeight: 800,
                  letterSpacing: '.08em',
                  background: 'rgba(255,255,255,0.88)',
                  opacity: prog(t, 181.0, 0.2),
                  transform: `rotate(-12deg) scale(${lerp(2.2, 1, prog(t, 181.0, 0.35, Easing.out(Easing.quad)))})`,
                  zIndex: 5,
                }}
              >
                REJECTED
              </div>
            </div>
          );
        })()}
      </Scene>

      {/* 21 — Section 4: the progression as a staircase */}
      <Scene t={t} index={20}>
        <div style={enter(t, 181.75, { y: 10 })}>
          <Roadmap t={t} at={181.7} current={3} compact />
        </div>
        <div className="kit-h2" style={{ marginTop: 50, ...enter(t, 182.9, { dur: 0.8, y: 26 }) }}>
          Here's the <span className="kit-mark" style={markStyle(t, 183.6)}>progression.</span>
        </div>
        <div style={{ position: 'relative', height: 470, marginTop: 30 }}>
          {[
            ['First', 'Transform individual workflows', 184.64],
            ['Then', 'Connect them into team agents', 187.92],
            ['Finally', 'Build organization-wide systems', 190.8],
          ].map(([k, s, at], i) => (
            <div
              key={s as string}
              className="kit-ui"
              style={{
                position: 'absolute',
                left: i * 580,
                top: 300 - i * 130,
                width: 560,
                height: 170 + i * 130,
                borderRadius: '22px 22px 0 0',
                background: i === 2 ? GREEN : i === 1 ? LIME : LIME_SOFT,
                color: i === 0 ? INK : '#fff',
                padding: '24px 30px',
                boxSizing: 'border-box',
                transformOrigin: 'bottom',
                ...enter(t, at as number, { y: 60, dur: 0.6, easing: BACK }),
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', opacity: 0.8 }}>{k as string}</div>
              <div style={{ fontFamily: 'IBM Plex Serif', fontSize: 38, lineHeight: 1.15, marginTop: 10 }}>{s as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 22 — Measure the complete process */}
      <Scene t={t} index={21}>
        <div className="kit-label" style={enter(t, 195.55, { y: 14 })}>As you scale</div>
        <div className="kit-h2" style={enter(t, 196.5, { dur: 0.8, y: 26 })}>
          Measure the <span className="kit-mark" style={markStyle(t, 197.12)}>complete process.</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 50, marginTop: 56, alignItems: 'stretch' }}>
          <div className="kit-card kit-ui" style={{ padding: '30px 34px', position: 'relative', opacity: 1 - prog(t, 200.4, 0.5) * 0.55, ...enter(t, 198.64, { x: -30, y: 0 }) }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '.1em', color: MUTED, textTransform: 'uppercase' }}>Not just</div>
            <div className="kit-h3" style={{ fontSize: 50, marginTop: 16 }}>Minutes saved</div>
            <div style={{ fontSize: 28, color: MUTED, marginTop: 10 }}>by one person</div>
            <svg width={360} height={140} style={{ position: 'absolute', left: 30, top: 70 }}>
              <DrawLine p={prog(t, 200.24, 0.4)} x1={0} y1={120} x2={350} y2={10} color={RED} w={6} />
            </svg>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {[
              ['Quality', 201.52, 0.82],
              ['Cycle time', 202.32, 0.7],
              ['Customer experience', 203.4, 0.88],
              ['Net value', 204.8, 0.76],
            ].map(([m, at, v]) => (
              <div key={m as string} className="kit-card kit-ui" style={{ padding: '26px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', ...enter(t, (at as number) - 0.1, { y: 30 }) }}>
                <div style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.2 }}>{m as string}</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120, marginTop: 20 }}>
                  {[0.45, 0.6, 0.72, 1].map((h, i) => (
                    <div key={i} style={{ flex: 1, borderRadius: 6, background: i === 3 ? LIME : '#E6E6E0', height: `${h * (v as number) * 100 * prog(t, (at as number) + i * 0.08, 0.5)}%` }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 40, fontSize: 34, fontWeight: 600, ...enter(t, 205.92, { y: 14 }) }}>
          <div style={{ display: 'flex' }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ marginLeft: i ? -12 : 0 }}>
                <Person size={56} color={LIME} />
              </div>
            ))}
          </div>
          Keep the people doing the work <span className="kit-mark" style={markStyle(t, 207.6)}>involved.</span>
        </div>
      </Scene>

      {/* 23 — Two questions */}
      <Scene t={t} index={22}>
        <p className="kit-body kit-muted" style={{ fontSize: 40, fontFamily: 'IBM Plex Serif', fontStyle: 'italic', margin: '0 0 18px', ...enter(t, 210.2, { y: 14 }) }}>
          Next time someone proposes an AI tool for a single team…
        </p>
        <div className="kit-h2" style={enter(t, 213.9, { dur: 0.8, y: 26 })}>
          Ask <span className="kit-mark" style={markStyle(t, 214.24)}>two questions.</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 64 }}>
          {[
            ['1', 'Where does this work hand off?', 215.6],
            ['2', 'Who should be in the room to redesign it?', 217.92],
          ].map(([n, q, at]) => (
            <div key={n as string} className="kit-card" style={{ display: 'flex', alignItems: 'center', gap: 40, padding: '36px 46px', ...enter(t, (at as number) - 0.1, { x: -50, y: 0 }) }}>
              <div style={{ width: 96, height: 96, borderRadius: '50%', background: LIME, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'IBM Plex Serif', fontSize: 56, flex: 'none' }}>
                {n as string}
              </div>
              <div className="kit-h2" style={{ fontSize: 60 }}>{q as string}</div>
            </div>
          ))}
        </div>
      </Scene>

      {/* 24 — Closing: the organization, connected */}
      <Scene t={t} index={23} padStyle={{ opacity: 1 - prog(t, 226.5, 0.8, Easing.in(Easing.quad)) }}>
        {(() => {
          const pts = Array.from({ length: 18 }).map((_, i) => ({ x: 60 + (i % 9) * 205, y: i < 9 ? 30 : 170 }));
          return (
            <div style={{ position: 'relative', height: 240, marginBottom: 50 }}>
              <svg width={1760} height={240} style={{ position: 'absolute', inset: 0 }}>
                {pts.map((p, i) => {
                  const n = i % 9 < 8 ? pts[i + 1] : null;
                  const d = i < 9 ? pts[i + 9] : null;
                  return (
                    <React.Fragment key={i}>
                      {n && <DrawLine p={prog(t, 223.6 + (i % 9) * 0.08, 0.5)} x1={p.x + 34} y1={p.y + 34} x2={n.x + 34} y2={n.y + 34} w={4} />}
                      {d && <DrawLine p={prog(t, 224.2 + i * 0.06, 0.5)} x1={p.x + 34} y1={p.y + 34} x2={d.x + 34} y2={d.y + 34} w={4} />}
                    </React.Fragment>
                  );
                })}
              </svg>
              {pts.map((p, i) => (
                <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, ...enter(t, 220.5 + i * 0.04, { y: 10, dur: 0.4 }) }}>
                  <Person size={68} color={LIME} />
                </div>
              ))}
            </div>
          );
        })()}
        <div className="kit-h1" style={{ fontSize: 80, ...enter(t, 220.6, { dur: 0.9, y: 30 }) }}>
          Your <span className="kit-mark" style={markStyle(t, 221.84)}>people's knowledge</span> should shape
        </div>
        <div className="kit-h1" style={{ fontSize: 80, ...enter(t, 223.4, { dur: 0.8, y: 20 }) }}>the systems that transform your organization.</div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const AiNativeOrg: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={AI_NATIVE_ORG_TITLE_FRAMES}>
      <TitleCardGreen label="AI TRANSFORMATION" title="Becoming an AI-native organization" />
    </Sequence>
    <Sequence from={AI_NATIVE_ORG_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
