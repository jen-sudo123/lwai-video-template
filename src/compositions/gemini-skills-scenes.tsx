import React from 'react';
import {
  Arrow as KitArrow,
  BACK,
  Check,
  Composer,
  Cross,
  FileIcon,
  FolderIcon,
  GREEN,
  IN_OUT,
  LIME,
  LIME_SOFT,
  LINE,
  MUTED,
  MenuList,
  RED,
  enter,
  markStyle,
  prog,
  typed,
} from '../kit';

// Built (non-screenshot) scenes for GeminiSkills. Each one animates the idea the VO is describing.
// `t` is VO seconds, same clock as the composition.

type S = React.FC<{ t: number }>;

const Arrow: React.FC<React.ComponentProps<typeof KitArrow>> = (p) => (
  <div style={{ opacity: p.t >= p.at ? 1 : 0, flex: 'none' }}>
    <KitArrow {...p} />
  </div>
);

const Dots = () => (
  <div style={{ display: 'flex', gap: 7 }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ width: 11, height: 11, borderRadius: '50%', background: '#DADCD3' }} />
    ))}
  </div>
);

// Grey text-placeholder bars that draw in from the left.
const GrowLines: React.FC<{ t: number; at: number; widths: number[]; color?: string; gap?: number; step?: number }> = ({ t, at, widths, color = '#D9DBD3', gap = 13, step = 0.16 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {widths.map((w, i) => (
      <div key={i} style={{ height: 12, width: `${w * prog(t, at + i * step, 0.45, IN_OUT)}%`, borderRadius: 6, background: color }} />
    ))}
  </div>
);

const SkillChip: React.FC<{ name: string; on?: boolean; check?: boolean; size?: number; style?: React.CSSProperties }> = ({ name, on, check, size = 22, style }) => (
  <div
    className="kit-mono"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 18px',
      borderRadius: 999,
      fontSize: size,
      border: `2px solid ${on ? GREEN : LINE}`,
      background: on ? LIME_SOFT : '#fff',
      color: on ? '#1B2A12' : MUTED,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {check ? <Check size={size + 4} /> : <FolderIcon size={size + 4} />}
    {name}
  </div>
);

const INSTR = 'Use six sections. Keep it under 300 words. Flag any missing owners…';

// 1 — The same instructions typed into chat after chat, captured once, then reused everywhere.
export const WhatSkillsAre: S = ({ t }) => {
  const lift = prog(t, 8.32, 0.8, IN_OUT);
  const cardOut = prog(t, 10.64, 0.5, IN_OUT);
  const cardIn = prog(t, 8.9, 0.5, BACK);
  const dim = prog(t, 8.6, 0.5) * (1 - cardOut);
  return (
    <>
      <div className="kit-label" style={enter(t, 0.1, { y: 14 })}>Gemini Skills</div>
      <div className="kit-h1" style={{ fontSize: 88, ...enter(t, 0.3, { dur: 0.9, y: 34 }) }}>
        Save instructions for tasks you <span className="kit-mark" style={markStyle(t, 4.04)}>repeat.</span>
      </div>
      <div style={{ position: 'relative', marginTop: 54, height: 400 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 44, opacity: 1 - 0.6 * dim }}>
          {[5.04, 6.08, 7.04].map((at, i) => (
            <div key={at} className="kit-card" style={{ position: 'relative', height: 400, overflow: 'hidden', ...enter(t, 4.5 + i * 0.15, { y: 26 }) }}>
              <div className="kit-ui" style={{ height: 54, borderBottom: `2px solid ${LINE}`, display: 'flex', alignItems: 'center', gap: 14, padding: '0 22px', fontSize: 20, color: MUTED }}>
                <Dots /> Conversation {i + 1}
              </div>
              <div
                className="kit-ui"
                style={{ position: 'absolute', left: 84, right: 24, top: 78, background: '#F4F4EF', borderRadius: 18, padding: '16px 20px', fontSize: 23, lineHeight: 1.4, minHeight: 96, opacity: (t >= at ? 1 : 0) * (1 - lift), transform: `translateY(${-lift * 24}px) scale(${1 - lift * 0.08})` }}
              >
                {typed(t, at, INSTR, 1.5)}
              </div>
              <div style={{ position: 'absolute', right: 24, top: 78, ...enter(t, 11.2 + i * 0.3, { scale: 0.4, y: 0, easing: BACK }) }}>
                <SkillChip name="your-skill" on />
              </div>
              <div className="kit-ui" style={{ position: 'absolute', right: 24, top: 142, background: '#F4F4EF', borderRadius: 18, padding: '12px 18px', fontSize: 23, ...enter(t, 11.9 + i * 0.3, { y: 10 }) }}>
                This week’s update, please
              </div>
              <div style={{ position: 'absolute', left: 24, right: 90, top: 226 }}>
                <GrowLines t={t} at={12.5 + i * 0.2} widths={[90, 100, 72, 84]} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 'calc(50% - 290px)', top: 120, width: 580 }}>
          <div
            className="kit-card"
            style={{ padding: '34px 38px', display: 'flex', alignItems: 'center', gap: 26, borderColor: GREEN, background: LIME_SOFT, boxShadow: '0 24px 60px rgba(20,40,10,.16)', opacity: Math.min(1, cardIn) * (1 - cardOut), transform: `scale(${(0.6 + 0.4 * cardIn) * (1 - cardOut * 0.4)})` }}
          >
            <FolderIcon size={92} open />
            <div>
              <div className="kit-h3">Captured as a Skill</div>
              <div className="kit-ui" style={{ fontSize: 24, color: GREEN, marginTop: 6 }}>How you want the work done</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// 2 — You pick it with @, or Gemini scans your Skills and picks the relevant one.
export const TwoWays: S = ({ t }) => {
  const chips = ['meeting-prep', 'your-skill', 'writing-style'];
  const scan = t < 17.88 ? -1 : t < 18.64 ? Math.floor((t - 17.88) / 0.19) % 3 : 1;
  const settled = t >= 18.64;
  return (
    <>
      <div className="kit-label" style={enter(t, 14.6, { y: 14 })}>Using a Skill</div>
      <div className="kit-h2" style={enter(t, 14.7, { dur: 0.8, y: 30 })}>Two ways to use a Skill.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 52 }}>
        <div className="kit-card" style={{ padding: '32px 36px', height: 410, ...enter(t, 14.96, { y: 24 }) }}>
          <span className="kit-tag">1 · You select it</span>
          <div style={{ position: 'relative', marginTop: 28 }}>
            <Composer text={typed(t, 15.3, '@your-skill', 0.9)} caret w={640} />
            <MenuList items={['your-skill', 'another-skill']} active={t >= 16.2 ? 0 : -1} icon style={{ position: 'absolute', left: 30, top: 150, width: 340, ...enter(t, 15.5, { y: -10, dur: 0.4 }) }} />
          </div>
        </div>
        <div className="kit-card" style={{ padding: '32px 36px', height: 410, ...enter(t, 16.72, { y: 24 }) }}>
          <span className="kit-tag">2 · Gemini applies it</span>
          <div className="kit-ui" style={{ marginTop: 28, marginLeft: 120, padding: '16px 22px', background: '#F4F4EF', borderRadius: 18, fontSize: 26, ...enter(t, 17.0, { y: 14 }) }}>
            Draft this week’s update from my notes
          </div>
          <div className="kit-ui" style={{ fontSize: 16, letterSpacing: '.1em', fontWeight: 600, color: MUTED, marginTop: 30, ...enter(t, 17.6, { y: 0 }) }}>YOUR SKILLS</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 14, ...enter(t, 17.6, { y: 10 }) }}>
            {chips.map((c, i) => (
              <SkillChip key={c} name={c} on={scan === i} check={settled && i === 1} style={{ opacity: settled && i !== 1 ? 0.45 : 1, transform: `scale(${scan === i ? 1.06 : 1})` }} />
            ))}
          </div>
          <div className="kit-ui" style={{ marginTop: 26, fontSize: 28, ...enter(t, 19.12, { y: 10 }) }}>
            Relevant Skill applied <b className="kit-mark" style={markStyle(t, 19.2)}>automatically</b>
          </div>
        </div>
      </div>
      <p className="kit-body kit-muted" style={{ marginTop: 36, ...enter(t, 20.4, { y: 14 }) }}>Let’s create one and test how it works.</p>
    </>
  );
};

// 3 — The Skill form assembles itself: name, description, instructions, then files clip on.
export const Components: S = ({ t }) => {
  const slot = (label: string, at: number, children: React.ReactNode, h: number) => (
    <div style={enter(t, at, { y: 22, dur: 0.5 })}>
      <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 600, color: GREEN, marginBottom: 8 }}>{label}</div>
      <div style={{ border: `2px solid ${LINE}`, borderRadius: 14, background: '#fff', minHeight: h, padding: '14px 20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
    </div>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: 70, alignItems: 'center' }}>
      <div>
        <div className="kit-label" style={enter(t, 23.5, { y: 14 })}>Skill components</div>
        <div className="kit-h2" style={enter(t, 23.6, { dur: 0.8, y: 30 })}>What’s in a Skill.</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
        <div className="kit-card" style={{ width: 700, flex: 'none', padding: '30px 34px', background: '#FBFBF8', display: 'flex', flexDirection: 'column', gap: 20, ...enter(t, 23.9, { x: 30, y: 0 }) }}>
          {slot('NAME', 24.5, <div className="kit-mono" style={{ fontSize: 26 }}>{typed(t, 24.7, 'your-skill', 0.5)}</div>, 62)}
          {slot('DESCRIPTION', 25.5, <div className="kit-ui" style={{ fontSize: 26 }}>{typed(t, 25.7, 'What it does and when to use it', 0.7)}</div>, 62)}
          {slot('INSTRUCTIONS', 26.4, <GrowLines t={t} at={26.6} widths={[96, 82, 90, 60]} />, 130)}
        </div>
        <div style={{ flex: 1 }}>
          <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 600, color: MUTED, ...enter(t, 28.8, { y: 10 }) }}>OPTIONAL · SUPPORTING FILES</div>
          {[
            ['Template', 30.4, -3],
            ['Reference material', 31.28, 2],
          ].map(([name, at, rot]) => (
            <div key={name as string} style={{ marginTop: 20, ...enter(t, at as number, { x: 70, y: 0, easing: BACK }) }}>
              <div className="kit-card kit-ui" style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, fontWeight: 600, transform: `rotate(${rot}deg)`, boxShadow: '0 10px 26px rgba(20,40,10,.10)' }}>
                <FileIcon size={40} accent /> {name as string}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 4 — A request arrives; name + description decide WHEN, instructions explain HOW.
export const WhatEachPartDoes: S = ({ t }) => {
  const matched = t >= 36.0;
  return (
    <>
      <div className="kit-label" style={enter(t, 33.4, { y: 14 })}>Skill components</div>
      <div className="kit-h2" style={enter(t, 33.5, { dur: 0.8, y: 30 })}>What each part does.</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 56 }}>
        <div style={{ width: 330, flex: 'none', ...enter(t, 33.6, { x: -30, y: 0 }) }}>
          <span className="kit-tag" style={{ background: '#F1F1EC' }}>Request</span>
          <div className="kit-ui" style={{ marginTop: 14, background: '#F4F4EF', borderRadius: 20, padding: '20px 24px', fontSize: 28, lineHeight: 1.35 }}>Prepare this week’s leadership update</div>
        </div>
        <Arrow t={t} at={34.5} w={100} />
        <div style={{ width: 480, flex: 'none', ...enter(t, 33.9, { y: 24 }) }}>
          <div className="kit-card" style={{ padding: '24px 28px', borderColor: matched ? GREEN : LINE }}>
            <span className="kit-tag">Name + Description</span>
            <div className="kit-mono" style={{ fontSize: 24, marginTop: 16 }}>your-skill</div>
            <div className="kit-ui" style={{ fontSize: 22, color: MUTED, marginTop: 6 }}>Use when preparing weekly updates</div>
            <div className="kit-ui" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, fontSize: 24, fontWeight: 600, background: LIME_SOFT, borderRadius: 12, padding: '10px 14px', ...enter(t, 36.0, { y: 0, scale: 0.7, easing: BACK }) }}>
              <Check size={30} /> Relevant
            </div>
          </div>
          <div className="kit-h3" style={{ marginTop: 20, textAlign: 'center', ...enter(t, 36.0, { y: 10 }) }}>
            Decides <span className="kit-mark" style={markStyle(t, 36.2)}>when</span>
          </div>
        </div>
        <Arrow t={t} at={37.9} w={100} />
        <div style={{ flex: 1, ...enter(t, 37.92, { y: 24 }) }}>
          <div className="kit-card" style={{ padding: '24px 28px' }}>
            <span className="kit-tag">Instructions</span>
            {[
              ['Read the notes', 39.44],
              ['Apply the rules', 40.24],
              ['Write the update', 40.96],
            ].map(([s, at]) => (
              <div key={s as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, marginTop: 14, opacity: 0.35 + 0.65 * prog(t, at as number, 0.3) }}>
                <div style={{ transform: `scale(${prog(t, at as number, 0.4, BACK)})` }}><Check size={30} /></div> {s as string}
              </div>
            ))}
          </div>
          <div className="kit-h3" style={{ marginTop: 20, textAlign: 'center', ...enter(t, 39.44, { y: 10 }) }}>
            Explains <span className="kit-mark" style={markStyle(t, 39.6)}>how</span>
          </div>
        </div>
      </div>
    </>
  );
};

// 5 — A SKILL.md file can be uploaded; this demo fills in the built-in form instead.
export const ImportOrBuiltIn: S = ({ t }) => {
  const focus = t < 47.04 ? -1 : Math.min(2, Math.floor((t - 47.04) / 0.65));
  const file = ['---', 'name: your-skill', 'description: What it does…', '---', '# Instructions'];
  return (
    <>
      <div className="kit-label" style={enter(t, 42.5, { y: 14 })}>Building a Skill</div>
      <div className="kit-h2" style={enter(t, 42.6, { dur: 0.8, y: 30 })}>Import one, or build it in Gemini.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, marginTop: 50 }}>
        <div className="kit-card" style={{ padding: '30px 34px', height: 450, ...enter(t, 43.36, { y: 24 }), opacity: prog(t, 43.36, 0.6) * (1 - prog(t, 46.36, 0.6) * 0.55) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <FileIcon size={44} accent />
            <div className="kit-h3">SKILL.md</div>
            <span className="kit-tag" style={{ marginLeft: 'auto', ...enter(t, 43.92, { y: 0, scale: 0.6, easing: BACK }) }}>Upload</span>
          </div>
          <div className="kit-mono" style={{ fontSize: 24, lineHeight: 1.7, marginTop: 22, color: '#2B2B2B' }}>
            {file.map((l, i) => (
              <div key={i} style={{ color: l === '---' ? '#9A9A9A' : undefined, ...enter(t, 44.3 + i * 0.25, { x: -12, y: 0, dur: 0.4 }) }}>{l}</div>
            ))}
          </div>
        </div>
        <div className="kit-card" style={{ padding: '30px 34px', height: 450, borderColor: t >= 46.36 ? GREEN : LINE, ...enter(t, 46.36, { y: 24 }) }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="kit-h3">Built-in interface</div>
            <span className="kit-tag" style={{ marginLeft: 'auto', ...enter(t, 48.16, { y: 0, scale: 0.6, easing: BACK }) }}>This demo</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 22 }}>
            {[
              ['Name', 48],
              ['Description', 62],
              ['Instructions', 84],
            ].map(([label, h], i) => (
              <div key={label as string}>
                <div className="kit-ui" style={{ fontSize: 16, color: MUTED, fontWeight: 600, marginBottom: 6 }}>{label as string}</div>
                <div style={{ height: h as number, borderRadius: 12, border: `2px solid ${focus === i ? LIME : LINE}`, boxShadow: focus === i ? `0 0 0 5px ${LIME_SOFT}` : 'none', padding: '0 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <GrowLines t={t} at={47.04 + i * 0.65} widths={i === 2 ? [88, 70, 80] : i === 1 ? [92, 60] : [40]} gap={10} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// 9 — Scattered weekly notes go through the Skill and come out as a structured update.
export const WhatWeBuild: S = ({ t }) => {
  const scraps: [string, number, number, number][] = [
    ['pilot done, 24 users', 0, 10, -4],
    ['2 checks still unresolved', 280, 0, 3],
    ['Priya to look by 12 Nov', 30, 170, 2],
    ['extension: needs a decision', 300, 190, -3],
  ];
  const pull = prog(t, 79.5, 0.7, IN_OUT);
  const pulse = Math.sin(prog(t, 79.7, 0.7) * Math.PI);
  return (
    <>
      <div className="kit-label" style={enter(t, 75.6, { y: 14 })}>Our example</div>
      <div className="kit-h2" style={enter(t, 75.8, { dur: 0.8, y: 30 })}>
        A <span className="kit-mark" style={markStyle(t, 76.32)}>Leadership Update</span> Skill.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 50 }}>
        <div style={{ position: 'relative', width: 590, height: 340, flex: 'none' }}>
          <div className="kit-ui" style={{ position: 'absolute', left: 0, top: -34, fontSize: 17, letterSpacing: '.1em', fontWeight: 700, color: MUTED, ...enter(t, 78.4, { y: 0 }) }}>ROUGH WEEKLY NOTES</div>
          {scraps.map(([text, x, y, rot], i) => (
            <div key={text} style={{ position: 'absolute', left: x, top: y, ...enter(t, 78.4 + i * 0.22, { y: 30, scale: 0.8, easing: BACK }) }}>
              <div className="kit-ui" style={{ width: 270, minHeight: 120, boxSizing: 'border-box', padding: '18px 20px', background: '#FBF7DC', border: '2px solid #EDE6B8', borderRadius: 6, fontSize: 25, fontStyle: 'italic', lineHeight: 1.3, boxShadow: '0 8px 18px rgba(60,50,10,.10)', transform: `translate(${pull * (60 - x * 0.1)}px, ${pull * (90 - y) * 0.3}px) rotate(${rot * (1 - pull)}deg)`, opacity: 1 - pull * 0.45 }}>
                {text}
              </div>
            </div>
          ))}
        </div>
        <Arrow t={t} at={79.4} w={90} />
        <div style={{ flex: 'none', ...enter(t, 79.0, { y: 0, scale: 0.7, easing: BACK }) }}>
          <div className="kit-card" style={{ width: 300, padding: '26px 20px', textAlign: 'center', borderColor: GREEN, background: LIME_SOFT, transform: `scale(${1 + pulse * 0.08})` }}>
            <FolderIcon size={70} open />
            <div className="kit-mono" style={{ fontSize: 18, marginTop: 10 }}>write-leadership-updates</div>
          </div>
        </div>
        <Arrow t={t} at={79.9} w={90} />
        <div className="kit-card" style={{ flex: 1, padding: '26px 30px', borderColor: GREEN, ...enter(t, 80.0, { x: 30, y: 0 }) }}>
          <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 700, color: GREEN, marginBottom: 14 }}>CONCISE EXECUTIVE UPDATE</div>
          {['Executive Summary', 'Progress', 'Decisions Needed', 'Next Steps'].map((h, i) => (
            <div key={h} style={{ padding: '8px 0', ...enter(t, 80.2 + i * 0.35, { x: -12, y: 0, dur: 0.4 }) }}>
              <div className="kit-ui" style={{ fontSize: 23, fontWeight: 600, marginBottom: 8 }}>{h}</div>
              <GrowLines t={t} at={80.35 + i * 0.35} widths={[92 - i * 10]} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// 11 — The real description, with its two halves called out; then vague vs specific.
export const GoodDescription: S = ({ t }) => (
  <>
    <div className="kit-label" style={enter(t, 101.4, { y: 14 })}>The description</div>
    <div className="kit-h2" style={enter(t, 101.5, { dur: 0.8, y: 30 })}>One field, two jobs.</div>
    <div className="kit-card" style={{ marginTop: 44, padding: '34px 40px', background: '#FBFBF8', ...enter(t, 101.9, { y: 24 }) }}>
      <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 600, color: GREEN, marginBottom: 14 }}>DESCRIPTION</div>
      <div className="kit-ui" style={{ fontSize: 40, lineHeight: 1.5 }}>
        <span className="kit-mark" style={{ ...markStyle(t, 102.88), opacity: t >= 104.64 ? 0.55 : 1 }}>Creates concise, decision-ready leadership updates from rough project notes.</span>{' '}
        <span className="kit-mark" style={markStyle(t, 104.64)}>Use when preparing weekly status reports or executive updates.</span>
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
        <span className="kit-tag" style={{ fontSize: 20, ...enter(t, 102.88, { y: 0, scale: 0.6, easing: BACK }) }}>1 · What the Skill does</span>
        <span className="kit-tag" style={{ fontSize: 20, ...enter(t, 104.64, { y: 0, scale: 0.6, easing: BACK }) }}>2 · When to use it</span>
      </div>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginTop: 36 }}>
      <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, color: MUTED, ...enter(t, 106.0, { x: -20, y: 0 }) }}>
        <Cross size={36} />
        <span style={{ position: 'relative' }}>
          “Helps with updates.”
          <span style={{ position: 'absolute', left: 0, top: '55%', height: 4, background: RED, width: `${prog(t, 106.5, 0.5, IN_OUT) * 100}%` }} />
        </span>
      </div>
      <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, ...enter(t, 106.16, { x: -20, y: 0 }) }}>
        <Check size={36} /> <b className="kit-mark" style={markStyle(t, 106.3)}>Be specific.</b>
        <span className="kit-muted" style={enter(t, 107.36, { y: 0 })}>Gemini uses the name and description to assess relevance.</span>
      </div>
    </div>
  </>
);

// 13 — One process, run every week, rather than a single write-up.
export const RepeatableProcess: S = ({ t }) => (
  <>
    <div className="kit-label" style={enter(t, 121.3, { y: 14 })}>Writing instructions</div>
    <div className="kit-h2" style={enter(t, 121.4, { dur: 0.8, y: 30 })}>
      Describe a <span className="kit-mark" style={markStyle(t, 122.88)}>repeatable process.</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 36, marginTop: 50 }}>
      <div className="kit-card" style={{ width: 440, flex: 'none', padding: '26px 30px', borderColor: GREEN, background: LIME_SOFT, ...enter(t, 121.7, { y: 24 }) }}>
        <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 700, color: GREEN }}>THE INSTRUCTIONS</div>
        {['Read the notes', 'Apply the rules', 'Write the update'].map((s, i) => (
          <div key={s} className="kit-ui" style={{ fontSize: 28, marginTop: 12 }}>
            <b style={{ color: GREEN }}>{i + 1}.</b> {s}
          </div>
        ))}
      </div>
      <svg width="120" height="120" viewBox="0 0 24 24" style={{ flex: 'none', opacity: prog(t, 122.4, 0.4), transform: `rotate(${(t - 122.4) * 140}deg)` }}>
        <path d="M20 12a8 8 0 1 1-2.6-5.9" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.6 2.6v3.8h-3.8" fill="none" stroke={GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {['Week 1 update', 'Week 2 update', 'Week 3 update'].map((w, i) => (
          <div key={w} style={{ marginLeft: i * 46, ...enter(t, 122.88 + i * 0.4, { x: 40, y: 0, easing: BACK }) }}>
            <div className="kit-card kit-ui" style={{ width: 520, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 16, fontSize: 26, fontWeight: 600 }}>
              <Check size={32} /> {w}
              <div style={{ flex: 1 }}><GrowLines t={t} at={123.0 + i * 0.4} widths={[100]} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, color: MUTED, marginTop: 34, ...enter(t, 124.4, { y: 12 }) }}>
      <Cross size={36} /> Not one particular update
    </div>
  </>
);

// 23 — Automatic: Gemini's pick keeps hopping. Explicit: you name the Skill and get that one.
export const AutomaticVsExplicit: S = ({ t }) => {
  const names = ['weekly-leadership-update', 'write-leadership-updates', 'meeting-prep'];
  const hop = t < 194.0 ? -1 : Math.floor((t - 194.0) * 2.6) % 3;
  const row: React.CSSProperties = { display: 'grid', gridTemplateColumns: '210px 560px 150px 1fr', alignItems: 'center', columnGap: 24 };
  return (
    <>
      <div className="kit-label" style={enter(t, 192.1, { y: 14 })}>Choosing how to run it</div>
      <div className="kit-h2" style={enter(t, 192.2, { dur: 0.8, y: 30 })}>
        When the format matters, <span className="kit-mark" style={markStyle(t, 198.64)}>select the Skill.</span>
      </div>
      <div style={{ ...row, marginTop: 44, ...enter(t, 193.12, { y: 20 }) }}>
        <div>
          <div className="kit-h3">Automatic</div>
          <span className="kit-tag" style={{ marginTop: 12, background: '#FBE9E7', color: RED, fontSize: 15, ...enter(t, 195.6, { y: 0, scale: 0.6, easing: BACK }) }}>Less predictable</span>
        </div>
        <div className="kit-ui" style={{ background: '#F4F4EF', borderRadius: 20, padding: '20px 24px', fontSize: 27 }}>Prepare this week’s leadership update</div>
        <Arrow t={t} at={193.6} w={150} dashed />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          {names.map((n, i) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <SkillChip name={n} on={hop === i} size={20} />
              <span className="kit-h3" style={{ color: RED, opacity: hop === i ? 1 : 0 }}>?</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 2, background: LINE, margin: '26px 0' }} />
      <div style={{ ...row, ...enter(t, 196.92, { y: 20 }) }}>
        <div>
          <div className="kit-h3">Explicit</div>
          <span className="kit-tag" style={{ marginTop: 12, fontSize: 15, ...enter(t, 199.36, { y: 0, scale: 0.6, easing: BACK }) }}>You choose</span>
        </div>
        <Composer text={typed(t, 197.2, '@write-leadership-updates', 1.0)} caret w={560} />
        <Arrow t={t} at={198.64} w={150} />
        <div style={enter(t, 199.04, { y: 0, scale: 0.6, easing: BACK })}>
          <SkillChip name="write-leadership-updates" on check size={22} />
        </div>
      </div>
    </>
  );
};

// 25 — A working week where the same instructions and the same fixes keep coming back.
export const StartWithRepeats: S = ({ t }) => (
  <>
    <div className="kit-label" style={enter(t, 209.4, { y: 14 })}>Gemini Skills</div>
    <div className="kit-h1" style={{ fontSize: 88, ...enter(t, 209.6, { dur: 0.9, y: 34 }) }}>
      Start with work you <span className="kit-mark" style={markStyle(t, 213.36)}>repeat.</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 22, marginTop: 54 }}>
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
        <div key={d} className="kit-card" style={{ padding: '18px 20px', height: 250, ...enter(t, 212.48 + i * 0.14, { y: 26 }) }}>
          <div className="kit-ui" style={{ fontSize: 18, letterSpacing: '.1em', fontWeight: 700, color: MUTED, marginBottom: 16 }}>{d.toUpperCase()}</div>
          <GrowLines t={t} at={212.7 + i * 0.14} widths={[90, 64]} />
          <div style={{ marginTop: 20, ...enter(t, 215.76 + i * 0.13, { y: 0, scale: 0.6, easing: BACK }) }}>
            <div className="kit-ui" style={{ display: 'inline-block', fontSize: 19, fontWeight: 600, padding: '7px 13px', borderRadius: 999, background: LIME_SOFT, border: `2px solid ${GREEN}` }}>Same instructions</div>
          </div>
          <div style={{ marginTop: 12, ...enter(t, 217.68 + i * 0.13, { y: 0, scale: 0.6, easing: BACK }) }}>
            <div className="kit-ui" style={{ display: 'inline-block', fontSize: 19, fontWeight: 600, padding: '7px 13px', borderRadius: 999, background: '#FBE9E7', border: `2px solid ${RED}`, color: RED }}>Same mistake</div>
          </div>
        </div>
      ))}
    </div>
  </>
);

// 26 — Capture the process as a Skill, then check the output follows it.
export const CaptureAndCheck: S = ({ t }) => {
  const stamp = prog(t, 223.1, 0.45, BACK);
  return (
    <>
      <div className="kit-label" style={enter(t, 219.2, { y: 14 })}>Gemini Skills</div>
      <div className="kit-h1" style={{ fontSize: 88, ...enter(t, 219.3, { dur: 0.9, y: 34 }) }}>
        <span className="kit-mark" style={markStyle(t, 220.4)}>Capture</span> a useful process.
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, marginTop: 54 }}>
        <div className="kit-card" style={{ width: 400, flex: 'none', padding: '24px 28px', ...enter(t, 219.9, { y: 24 }) }}>
          <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>YOUR PROCESS</div>
          <div style={{ marginTop: 16 }}><GrowLines t={t} at={220.0} widths={[92, 70, 84]} /></div>
        </div>
        <Arrow t={t} at={220.5} w={110} />
        <div style={{ flex: 'none', ...enter(t, 220.88, { y: 0, scale: 0.7, easing: BACK }) }}>
          <div className="kit-card" style={{ width: 300, padding: '26px 20px', textAlign: 'center', borderColor: GREEN, background: LIME_SOFT }}>
            <FolderIcon size={70} open />
            <div className="kit-h3" style={{ marginTop: 8 }}>Skill</div>
          </div>
        </div>
        <Arrow t={t} at={221.4} w={110} />
        <div className="kit-card" style={{ position: 'relative', flex: 1, padding: '24px 28px', borderColor: stamp > 0 ? GREEN : LINE, ...enter(t, 221.8, { x: 30, y: 0 }) }}>
          <div className="kit-ui" style={{ fontSize: 17, letterSpacing: '.1em', fontWeight: 700, color: MUTED }}>GEMINI’S OUTPUT</div>
          <div style={{ marginTop: 16 }}><GrowLines t={t} at={221.9} widths={[88, 96, 60]} /></div>
          <div style={{ position: 'absolute', right: 24, top: 18, opacity: Math.min(1, stamp), transform: `scale(${0.4 + 0.6 * stamp}) rotate(${-8 * stamp}deg)` }}>
            <Check size={84} />
          </div>
        </div>
      </div>
      <p className="kit-body" style={{ fontSize: 40, marginTop: 44, ...enter(t, 222.52, { y: 18 }) }}>
        Then <span className="kit-mark" style={markStyle(t, 222.8)}>check that Gemini follows it.</span>
      </p>
    </>
  );
};
