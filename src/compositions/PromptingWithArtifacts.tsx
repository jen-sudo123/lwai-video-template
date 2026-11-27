import React from 'react';
import { AbsoluteFill, Audio, Easing, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { LogoFooter } from '../Logo';
import { TitleCardGreen } from '../scenes/TitleCardGreen';
import { BACK, Check, GREEN, INK, IN_OUT, KIT_CSS, LIME, LIME_SOFT, LINE, MUTED, Toggle, enter, makeScene, markStyle, prog } from '../kit';

loadSerif();
loadSans();

// Prompting with Artifacts in Copilot — demo video (Lead with AI), built with the LWAI demo kit (src/kit).
// VO: the narration recorded with the screen demo (audio/prompting-with-artifacts.mp3, extracted from the
// uploaded Artifacts_Copilot.mp4, unpadded). Every cue is the second of the word it names, from
// src/data/prompting-with-artifacts.transcript.json (Parakeet TDT word timestamps).
// Video: video/copilot-uploads/copilot-uploads.mp4, the same recording with the VEED watermark painted out.
// The recording is blank 0–44.5s and 173–205s, so those stretches are animated concept scenes; the demo
// (44.5–172.7s) plays clean, in sync with the VO.
//
//  #  scene                              start   VO cue
//  1  From text to far more than text    0.00    "When generative AI first came about…"
//  2  Artifacts                          14.28   "And one of those modalities is artifacts…"
//  3  Same on every platform             22.20   "Uploading artifacts into Copilot is straightforward…"
//  4  The example: a handwritten note    34.23   "So here I have a handwritten note…"
//  5  Demo (screen recording)            44.50   "So I open Copilot on my phone…"
//  6  Common formats                     172.70  "Here are a few important things to know…"
//  7  Images, alone or inside documents  183.80  "Image understanding works with…"
//  8  Limits and security settings       192.60  "Limits vary by account and plan…"
//  9  Check before you share             198.90  "Before you share anything sensitive…"

export const PWA_TITLE_FRAMES = 90;
export const PWA_DURATION_S = 206.0;

const STARTS = [0, 14.28, 22.2, 34.23, 44.5, 172.7, 183.8, 192.6, 198.9];
const DEMO_START = 44.5;
const Scene = makeScene(STARTS, 0.5);

const NOTE = 'prompting-with-artifacts/images/note.png';
const CLIP = 'video/copilot-uploads/copilot-uploads.mp4';

// ── Small mocks ─────────────────────────────────────────────────────────────

// Grey text lines, like a document at a glance
const Lines: React.FC<{ n: number; w?: number; gap?: number; h?: number; reveal?: number }> = ({ n, w = 100, gap = 14, h = 10, reveal = 1 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap }}>
    {Array.from({ length: n }).map((_, i) => (
      <div key={i} style={{ height: h, borderRadius: h, background: '#E6E8E2', width: `${(i % 3 === 2 ? 0.62 : 0.94) * w * Math.min(1, Math.max(0, reveal * n - i))}%` }} />
    ))}
  </div>
);

// File chip: coloured type badge + name
const TYPE_COLORS: Record<string, string> = { JPG: '#2E7D9A', PNG: '#2E7D9A', PDF: '#C2410C', DOCX: '#2B579A', XLSX: '#217346', PPTX: '#C43E1C', IMG: '#2E7D9A' };
const FileChip: React.FC<{ type: string; name: string; style?: React.CSSProperties; big?: boolean }> = ({ type, name, style, big }) => (
  <div className="kit-card kit-ui" style={{ display: 'flex', alignItems: 'center', gap: big ? 18 : 12, padding: big ? '16px 24px 16px 16px' : '8px 14px 8px 8px', borderRadius: big ? 18 : 12, boxShadow: '0 8px 24px rgba(0,0,0,.08)', whiteSpace: 'nowrap', ...style }}>
    <div style={{ width: big ? 64 : 34, height: big ? 64 : 34, borderRadius: big ? 12 : 8, background: TYPE_COLORS[type] ?? MUTED, color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: big ? 17 : 10, letterSpacing: '.04em' }}>{type}</div>
    <div style={{ fontSize: big ? 28 : 18, fontWeight: 600, color: INK }}>{name}</div>
  </div>
);

// Prompt box with a + button, optional attachment and text
const Prompt: React.FC<{ w: number; text?: string; textOn?: number; attach?: React.ReactNode; plusPulse?: number; small?: boolean }> = ({ w, text, textOn = 1, attach, plusPulse = 0, small }) => {
  const fs = small ? 17 : 24;
  return (
    <div className="kit-card kit-ui" style={{ width: w, padding: small ? '12px 14px 10px' : '18px 22px 14px', borderRadius: small ? 14 : 20, boxShadow: '0 10px 30px rgba(0,0,0,.06)', display: 'flex', flexDirection: 'column', gap: small ? 8 : 12 }}>
      {attach}
      <div style={{ fontSize: fs, minHeight: fs * 1.35, color: text ? INK : '#A8A8A8', opacity: text ? textOn : 1 }}>{text || 'Message Copilot'}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ position: 'relative', width: small ? 26 : 36, height: small ? 26 : 36 }}>
          {plusPulse > 0 && plusPulse < 1 && (
            <div style={{ position: 'absolute', inset: -14 * plusPulse, borderRadius: '50%', border: `3px solid ${LIME}`, opacity: 1 - plusPulse }} />
          )}
          <div style={{ width: '100%', height: '100%', borderRadius: '50%', border: `2px solid ${plusPulse > 0 ? GREEN : LINE}`, background: plusPulse > 0 ? LIME_SOFT : '#fff', display: 'grid', placeItems: 'center', fontSize: small ? 20 : 26, color: plusPulse > 0 ? GREEN : MUTED, lineHeight: 1 }}>+</div>
        </div>
        <div style={{ width: small ? 26 : 36, height: small ? 26 : 36, borderRadius: '50%', background: INK, display: 'grid', placeItems: 'center', color: '#fff', fontSize: small ? 14 : 19 }}>↑</div>
      </div>
    </div>
  );
};

// A device frame (phone or desktop window)
const Device: React.FC<{ kind: 'phone' | 'desktop'; w: number; h: number; label: string; tag?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ kind, w, h, label, tag, style, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, ...style }}>
    <div style={{ width: w, height: h, borderRadius: kind === 'phone' ? 40 : 18, border: kind === 'phone' ? `10px solid ${INK}` : `2px solid ${LINE}`, background: '#FBFAF7', boxShadow: '0 18px 40px rgba(0,0,0,.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      {kind === 'desktop' && (
        <div style={{ height: 36, flex: 'none', background: '#F1F1EC', display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderBottom: `1px solid ${LINE}` }}>
          {['#E5E5E0', '#E5E5E0', '#E5E5E0'].map((c, i) => <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />)}
          {tag && <span className="kit-tag" style={{ marginLeft: 'auto', fontSize: 13, padding: '3px 12px' }}>{tag}</span>}
        </div>
      )}
      <div style={{ flex: 1, padding: kind === 'phone' ? 14 : 24, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 14 }}>{children}</div>
    </div>
    <div className="kit-ui" style={{ fontSize: 24, fontWeight: 600, color: MUTED }}>{label}</div>
  </div>
);

// Copilot reply: typing dots, then lines
const Reply: React.FC<{ t: number; at: number; w: number; small?: boolean }> = ({ t, at, w, small }) => {
  const p = prog(t, at + 0.6, 1.2, Easing.linear);
  return (
    <div style={{ alignSelf: 'flex-start', width: w, ...enter(t, at, { y: 10, dur: 0.4 }) }}>
      {p <= 0 ? (
        <div style={{ display: 'flex', gap: 6, padding: '6px 2px' }}>
          {[0, 1, 2].map((i) => <div key={i} style={{ width: small ? 8 : 10, height: small ? 8 : 10, borderRadius: '50%', background: GREEN, opacity: 0.35 + 0.65 * Math.abs(Math.sin((t - at) * 6 - i)) }} />)}
        </div>
      ) : (
        <Lines n={3} h={small ? 7 : 9} gap={small ? 8 : 10} reveal={p} />
      )}
    </div>
  );
};

// Document page with optional embedded image slots
const Page: React.FC<{ w: number; h: number; tag?: string; children?: React.ReactNode; style?: React.CSSProperties }> = ({ w, h, tag, children, style }) => (
  <div className="kit-card" style={{ width: w, height: h, padding: 34, borderRadius: 16, boxShadow: '0 18px 40px rgba(0,0,0,.08)', position: 'relative', display: 'flex', flexDirection: 'column', gap: 22, ...style }}>
    {tag && <div style={{ position: 'absolute', top: 18, right: 18, background: TYPE_COLORS[tag] ?? MUTED, color: '#fff', fontFamily: 'Public Sans', fontWeight: 700, fontSize: 16, padding: '4px 10px', borderRadius: 8 }}>{tag}</div>}
    {children}
  </div>
);

// Lime scan bar sweeping down over a box
const Scan: React.FC<{ t: number; at: number; dur?: number }> = ({ t, at, dur = 1.4 }) => {
  const p = prog(t, at, dur, IN_OUT);
  if (p <= 0 || p >= 1) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', borderRadius: 'inherit' }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: `${p * 100}%`, background: 'linear-gradient(180deg, rgba(102,198,28,0) 70%, rgba(102,198,28,.22))' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: `${p * 100}%`, height: 4, background: LIME, boxShadow: `0 0 18px ${LIME}` }} />
    </div>
  );
};

const Heading: React.FC<{ t: number; label: string; labelAt: number; at: number; children: React.ReactNode; size?: 'h1' | 'h2' }> = ({ t, label, labelAt, at, children, size = 'h2' }) => (
  <>
    <div className="kit-label" style={enter(t, labelAt, { y: 14 })}>{label}</div>
    <div className={`kit-${size}`} style={{ ...enter(t, at, { dur: 0.9, y: 30 }), textWrap: 'balance' } as React.CSSProperties}>{children}</div>
  </>
);

// ── Body ────────────────────────────────────────────────────────────────────
const Body: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <style>{KIT_CSS}</style>
      {audioSrc !== 'none' && <Audio src={audioSrc ?? staticFile('audio/prompting-with-artifacts.mp3')} />}

      {/* 1 — From text only to far more than text */}
      <Scene t={t} index={0}>
        <Heading t={t} label="Multimodal AI" labelAt={0.4} at={0.8}>
          Copilot now works with <span className="kit-mark" style={markStyle(t, 11.84)}>far more than text.</span>
        </Heading>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 60, marginTop: 90, zoom: 1.28 } as React.CSSProperties}>
          {/* THEN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, opacity: 1 - 0.55 * prog(t, 6.32, 0.8), ...enter(t, 2.64, { y: 30 }) }}>
            <span className="kit-tag" style={{ alignSelf: 'flex-start', background: '#EEEEEA' }}>At first</span>
            <Prompt w={560} text="Summarise this paragraph for me..." textOn={prog(t, 4.0, 0.8)} />
            <div className="kit-ui" style={{ fontSize: 24, color: MUTED, ...enter(t, 4.32, { y: 8 }) }}>Text in, text out</div>
          </div>
          {/* NOW */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, ...enter(t, 6.32, { x: 40, y: 0, easing: BACK }) }}>
            <span className="kit-tag" style={{ alignSelf: 'flex-start' }}>Multimodal</span>
            <Prompt
              w={640}
              text="What does this show?"
              textOn={prog(t, 11.36, 0.6)}
              attach={
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    ['IMG', 'photo.jpg', 11.6],
                    ['PDF', 'report.pdf', 11.84],
                    ['XLSX', 'data.xlsx', 12.24],
                  ].map(([ty, nm, at]) => (
                    <FileChip key={nm as string} type={ty as string} name={nm as string} style={enter(t, at as number, { y: -30, scale: 0.7, easing: BACK, dur: 0.5 })} />
                  ))}
                </div>
              }
            />
            <div className="kit-ui" style={{ fontSize: 24, color: GREEN, fontWeight: 600, ...enter(t, 12.88, { y: 8 }) }}>Text, images, files and more</div>
          </div>
        </div>
      </Scene>

      {/* 2 — Artifacts */}
      <Scene t={t} index={1}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 80 }}>
          <div style={{ flex: '0 0 640px' }}>
            <Heading t={t} label="One of those modalities" labelAt={14.5} at={14.99} size="h1">
              <span className="kit-mark" style={markStyle(t, 16.04)}>Artifacts</span>
            </Heading>
            <p className="kit-body kit-muted" style={{ marginTop: 34, fontSize: 38, ...enter(t, 17.32, { y: 14 }) }}>A catch-all term for what you share with Copilot.</p>
          </div>
          <div style={{ position: 'relative', flex: 1, height: 640 }}>
            {/* Photo */}
            <div style={{ position: 'absolute', left: 20, top: 10, transform: 'rotate(-6deg)', ...enter(t, 18.59, { y: -80, easing: BACK, dur: 0.6 }) }}>
              <div className="kit-card" style={{ padding: '14px 14px 46px', borderRadius: 6, boxShadow: '0 16px 36px rgba(0,0,0,.12)' }}>
                <Img src={staticFile(NOTE)} style={{ width: 300, height: 300, objectFit: 'cover', display: 'block' }} />
                <div className="kit-ui" style={{ fontSize: 22, fontWeight: 600, marginTop: 12, textAlign: 'center' }}>Photos</div>
              </div>
            </div>
            {/* Screenshot */}
            <div style={{ position: 'absolute', left: 420, top: 40, transform: 'rotate(4deg)', ...enter(t, 19.32, { y: -80, easing: BACK, dur: 0.6 }) }}>
              <div className="kit-card" style={{ width: 400, borderRadius: 14, overflow: 'hidden', boxShadow: '0 16px 36px rgba(0,0,0,.12)' }}>
                <div style={{ height: 30, background: '#F1F1EC', display: 'flex', gap: 7, alignItems: 'center', padding: '0 12px' }}>
                  {[0, 1, 2].map((i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: '#DADAD4' }} />)}
                </div>
                <div style={{ padding: 22, display: 'flex', gap: 16 }}>
                  <div style={{ width: 90, height: 120, borderRadius: 8, background: LIME_SOFT }} />
                  <div style={{ flex: 1 }}><Lines n={5} /></div>
                </div>
                <div className="kit-ui" style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', paddingBottom: 14 }}>Screenshots</div>
              </div>
            </div>
            {/* Document */}
            <div style={{ position: 'absolute', left: 250, top: 300, transform: 'rotate(-2deg)', ...enter(t, 20.11, { y: -80, easing: BACK, dur: 0.6 }) }}>
              <Page w={360} h={300} tag="PDF">
                <div style={{ width: 160, height: 18, borderRadius: 9, background: '#D5D8CF' }} />
                <Lines n={6} />
                <div className="kit-ui" style={{ fontSize: 22, fontWeight: 600, textAlign: 'center', marginTop: 'auto' }}>Documents</div>
              </Page>
            </div>
            {/* And more */}
            <div style={{ position: 'absolute', left: 680, top: 450, ...enter(t, 21.39, { scale: 0.5, y: 0, easing: BACK, dur: 0.5 }) }}>
              <div className="kit-pill" style={{ borderColor: LIME, background: LIME_SOFT }}>+ and more</div>
            </div>
          </div>
        </div>
      </Scene>

      {/* 3 — Same on every platform */}
      <Scene t={t} index={2}>
        <Heading t={t} label="Uploading artifacts" labelAt={22.4} at={22.75}>
          Largely the same <span className="kit-mark" style={markStyle(t, 27.23)}>on every platform.</span>
        </Heading>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 56, marginTop: 50 }}>
          {[
            { kind: 'phone' as const, w: 260, h: 480, label: 'Phone', at: 25.48 },
            { kind: 'desktop' as const, w: 600, h: 400, label: 'Desktop', at: 25.9 },
            { kind: 'desktop' as const, w: 600, h: 400, label: 'Work account', tag: 'Work', at: 26.36 },
          ].map((d, i) => {
            const small = d.kind === 'phone';
            const fileIn = prog(t, 30.16 + i * 0.12, 0.5, BACK);
            return (
              <Device key={d.label} kind={d.kind} w={d.w} h={d.h} label={d.label} tag={d.tag} style={enter(t, d.at, { y: 40, easing: BACK })}>
                <Reply t={t} at={32.0 + i * 0.1} w={small ? 200 : 420} small={small} />
                <Prompt
                  w={d.w - (small ? 48 : 52)}
                  small
                  plusPulse={t > 29.7 ? prog(t, 29.7, 0.6, Easing.linear) || 0.001 : 0}
                  attach={
                    fileIn > 0 ? (
                      <div style={{ opacity: Math.min(1, fileIn * 2), transform: `translateY(${(1 - fileIn) * -40}px)` }}>
                        <FileChip type="IMG" name={small ? 'note.jpg' : 'note.jpg'} />
                      </div>
                    ) : undefined
                  }
                />
              </Device>
            );
          })}
        </div>
      </Scene>

      {/* 4 — The example: a handwritten note */}
      <Scene t={t} index={3}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 90 }}>
          <div style={{ flex: '0 0 720px' }}>
            <Heading t={t} label="The example" labelAt={34.3} at={34.72}>
              A <span className="kit-mark" style={markStyle(t, 35.27)}>handwritten note</span>
            </Heading>
            <p className="kit-body" style={{ marginTop: 34, fontSize: 36, ...enter(t, 36.31, { y: 14 }) }}>Indicators for an AI fluency matrix, four levels.</p>
            <p className="kit-body" style={{ marginTop: 22, fontSize: 36, color: GREEN, fontWeight: 600, ...enter(t, 41.52, { y: 14 }) }}>Goal: more indicator ideas from Copilot.</p>
          </div>
          <div style={{ position: 'relative', width: 760, height: 720 }}>
            <div style={{ position: 'absolute', left: 30, top: 10, transform: `rotate(${-3 + 2 * prog(t, 35.27, 1.2)}deg)`, ...enter(t, 35.0, { y: 60, dur: 0.9 }) }}>
              <div className="kit-card" style={{ padding: 16, borderRadius: 8, boxShadow: '0 22px 50px rgba(0,0,0,.14)', position: 'relative' }}>
                <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
                  <Img src={staticFile(NOTE)} style={{ width: 482, height: 573, display: 'block' }} />
                  <Scan t={t} at={36.31} dur={2.0} />
                </div>
              </div>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ position: 'absolute', left: 470 + (i % 2) * 40, top: 120 + i * 150, ...enter(t, 41.84 + i * 0.3, { x: -40, y: 0, scale: 0.7, easing: BACK, dur: 0.55 }) }}>
                <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 26px', borderRadius: 16, border: `2px dashed ${GREEN}`, background: '#F7FCF2', fontSize: 26, fontWeight: 600, color: GREEN, whiteSpace: 'nowrap', boxShadow: '0 10px 26px rgba(0,0,0,.06)' }}>
                  <span style={{ fontSize: 30, lineHeight: 1 }}>+</span> New indicator idea
                </div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 5 — Demo: the screen recording, in sync with the VO */}
      <Scene t={t} index={4} pad={false}>
        <Sequence from={Math.round(DEMO_START * fps)} layout="none">
          <OffthreadVideo src={staticFile(CLIP)} startFrom={Math.round(DEMO_START * fps)} muted style={{ width: '100%', height: '100%' }} />
        </Sequence>
      </Scene>

      {/* 6 — Common formats */}
      <Scene t={t} index={5}>
        <Heading t={t} label="Good to know" labelAt={172.9} at={173.34}>
          Copilot supports <span className="kit-mark" style={markStyle(t, 178.22)}>common formats.</span>
        </Heading>
        <div style={{ position: 'relative', marginTop: 60, height: 470, borderRadius: 30, border: `4px dashed ${prog(t, 177.9, 0.4) > 0.5 ? LIME : '#CFCFC8'}`, background: prog(t, 177.9, 0.4) > 0.5 ? '#F7FCF2' : '#FAFAF8', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 46, ...enter(t, 174.78, { y: 30 }) }}>
          <div className="kit-ui" style={{ fontSize: 28, color: MUTED, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 34 }}>⤓</span> Drop your files here
          </div>
          <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
            {[
              { title: 'Photos', at: 180.7, files: [['JPG', 'photo.jpg']] },
              { title: 'PDFs', at: 181.26, files: [['PDF', 'scan.pdf']] },
              { title: 'Microsoft Office', at: 181.98, files: [['DOCX', 'brief.docx'], ['XLSX', 'budget.xlsx'], ['PPTX', 'deck.pptx']] },
            ].map((g) => (
              <div key={g.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
                <div style={{ display: 'flex', gap: 14 }}>
                  {g.files.map(([ty, nm], j) => (
                    <FileChip key={nm} type={ty} name={nm} big style={enter(t, g.at + j * 0.18, { y: -160, easing: BACK, dur: 0.6 })} />
                  ))}
                </div>
                <div className="kit-ui" style={{ fontSize: 26, fontWeight: 600, color: INK, ...enter(t, g.at + 0.3, { y: 8 }) }}>{g.title}</div>
              </div>
            ))}
          </div>
        </div>
      </Scene>

      {/* 7 — Images, on their own or inside documents */}
      <Scene t={t} index={6}>
        <Heading t={t} label="Image understanding" labelAt={184.0} at={184.47}>
          Images on their own, <span className="kit-mark" style={markStyle(t, 186.71)}>or inside documents.</span>
        </Heading>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 90, marginTop: 54 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, ...enter(t, 185.43, { y: 40, easing: BACK }) }}>
            <div className="kit-card" style={{ padding: 14, borderRadius: 10, boxShadow: '0 18px 40px rgba(0,0,0,.1)' }}>
              <div style={{ position: 'relative', borderRadius: 4, overflow: 'hidden' }}>
                <Img src={staticFile(NOTE)} style={{ width: 360, height: 428, objectFit: 'cover', display: 'block' }} />
                <Scan t={t} at={185.6} dur={1.3} />
              </div>
            </div>
            <div className="kit-ui" style={{ fontSize: 26, fontWeight: 600 }}>A standalone image</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, ...enter(t, 186.71, { y: 40, easing: BACK }) }}>
            <Page w={760} h={470} tag="PDF">
              <Lines n={2} />
              <div style={{ display: 'flex', gap: 26, flex: 1, minHeight: 0 }}>
                <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10, ...enter(t, 188.39, { scale: 0.85, y: 0, easing: BACK }) }}>
                  <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 10, border: `2px solid ${LINE}`, overflow: 'hidden', background: '#F6F6F2' }}>
                    <div style={{ height: 22, background: '#ECECE6' }} />
                    <div style={{ padding: 14, display: 'flex', gap: 10 }}>
                      <div style={{ width: 60, height: 80, borderRadius: 6, background: LIME_SOFT }} />
                      <div style={{ flex: 1 }}><Lines n={4} h={8} gap={9} /></div>
                    </div>
                    <Scan t={t} at={188.7} dur={1.1} />
                  </div>
                  <div className="kit-ui" style={{ fontSize: 22, fontWeight: 600, textAlign: 'center' }}>Screenshot</div>
                </div>
                <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10, ...enter(t, 189.43, { scale: 0.85, y: 0, easing: BACK }) }}>
                  <div style={{ position: 'relative', flex: 1, minHeight: 0, borderRadius: 10, overflow: 'hidden', border: `2px solid ${LINE}` }}>
                    <Img src={staticFile(NOTE)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 40%', filter: 'grayscale(1) contrast(1.1)', display: 'block' }} />
                    <Scan t={t} at={189.8} dur={1.1} />
                  </div>
                  <div className="kit-ui" style={{ fontSize: 22, fontWeight: 600, textAlign: 'center' }}>Scanned page</div>
                </div>
              </div>
            </Page>
            <div className="kit-ui" style={{ fontSize: 26, fontWeight: 600 }}>Images inside a document</div>
          </div>
        </div>
      </Scene>

      {/* 8 — Limits and security settings */}
      <Scene t={t} index={7}>
        <Heading t={t} label="Limits" labelAt={192.79} at={192.9}>
          Limits vary by <span className="kit-mark" style={markStyle(t, 193.83)}>account and plan.</span>
        </Heading>
        <div style={{ display: 'flex', gap: 60, marginTop: 60, alignItems: 'stretch' }}>
          <div className="kit-card" style={{ flex: 1, padding: '40px 46px', display: 'flex', flexDirection: 'column', gap: 34, ...enter(t, 193.35, { y: 30 }) }}>
            {[
              { name: 'Account A', fill: 0.35, at: 193.83 },
              { name: 'Account B', fill: 0.62, at: 194.0 },
              { name: 'Account C', fill: 0.9, at: 194.15 },
            ].map((r) => (
              <div key={r.name} className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
                <div style={{ width: 190, fontSize: 30, fontWeight: 600 }}>{r.name}</div>
                <div style={{ flex: 1, height: 22, borderRadius: 11, background: '#EFEFEA', overflow: 'hidden' }}>
                  <div style={{ width: `${r.fill * prog(t, r.at, 0.9, IN_OUT) * 100}%`, height: '100%', borderRadius: 11, background: LIME }} />
                </div>
              </div>
            ))}
            <div className="kit-ui" style={{ fontSize: 22, color: MUTED, ...enter(t, 194.6, { y: 8 }) }}>Upload limits differ from one account and plan to the next</div>
          </div>
          <div className="kit-card" style={{ flex: '0 0 640px', padding: '36px 44px', display: 'flex', flexDirection: 'column', gap: 26, borderColor: prog(t, 197.83, 0.4) > 0.5 ? GREEN : LINE, ...enter(t, 194.95, { x: 40, y: 0, easing: BACK }) }}>
            <div className="kit-ui" style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
              <svg width="40" height="40" viewBox="0 0 24 24"><path d="M12 2.5l8 3v6c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10v-6z" fill={LIME_SOFT} stroke={GREEN} strokeWidth="1.6" strokeLinejoin="round" /></svg>
              Your organization
            </div>
            {[
              ['File uploads', 197.83],
              ['Image uploads', 198.05],
            ].map(([lab, at]) => (
              <div key={lab as string} className="kit-ui" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
                {lab as string}
                <Toggle on={prog(t, at as number, 0.35, IN_OUT)} w={72} />
              </div>
            ))}
            <div className="kit-ui" style={{ fontSize: 22, color: MUTED }}>Security settings decide what you can upload</div>
          </div>
        </div>
      </Scene>

      {/* 9 — Check before you share */}
      <Scene t={t} index={8} padStyle={{ opacity: 1 - prog(t, 205.3, 0.7, Easing.in(Easing.quad)) }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 100 }}>
          <div style={{ flex: '0 0 700px' }}>
            <Heading t={t} label="Before you share" labelAt={199.11} at={199.4} size="h1">
              Sensitive? <span className="kit-mark" style={markStyle(t, 203.03)}>Check first.</span>
            </Heading>
            <p className="kit-body kit-muted" style={{ marginTop: 34, fontSize: 36, ...enter(t, 202.79, { y: 14 }) }}>Make sure you are allowed to upload it to Copilot.</p>
          </div>
          <div style={{ position: 'relative', width: 820, height: 640 }}>
            <div style={{ position: 'absolute', left: 140, top: 0, ...enter(t, 199.75, { y: 40, easing: BACK }) }}>
              <Page w={440} h={500} tag="DOCX">
                <div style={{ width: 200, height: 20, borderRadius: 10, background: '#D5D8CF' }} />
                <Lines n={9} />
              </Page>
              {/* stamp */}
              <div
                className="kit-ui"
                style={{
                  position: 'absolute', left: 60, top: 190, padding: '12px 26px', border: '5px solid #C2410C', color: '#C2410C', borderRadius: 10,
                  fontSize: 40, fontWeight: 800, letterSpacing: '.08em', background: 'rgba(255,255,255,.85)',
                  opacity: prog(t, 201.03, 0.25), transform: `rotate(-10deg) scale(${1.8 - 0.8 * prog(t, 201.03, 0.3, BACK)})`,
                }}
              >
                CONFIDENTIAL
              </div>
            </div>
            <div className="kit-card kit-ui" style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex', alignItems: 'center', gap: 20, padding: '24px 32px', borderRadius: 20, boxShadow: '0 18px 40px rgba(0,0,0,.12)', borderColor: prog(t, 203.75, 0.3) > 0.5 ? LIME : LINE, ...enter(t, 202.79, { y: 30, easing: BACK }) }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', border: `3px solid ${LINE}`, display: 'grid', placeItems: 'center', position: 'relative' }}>
                {prog(t, 203.75, 0.3) > 0 && <div style={{ position: 'absolute', inset: -4, transform: `scale(${prog(t, 203.75, 0.4, BACK)})` }}><Check size={42} /></div>}
              </div>
              <div style={{ fontSize: 32, fontWeight: 600 }}>Am I allowed to upload this?</div>
            </div>
          </div>
        </div>
      </Scene>

      <div style={{ position: 'absolute', inset: 0, zIndex: 60, pointerEvents: 'none' }}>
        <LogoFooter />
      </div>
    </AbsoluteFill>
  );
};

// audioSrc: optional override. 'none' drops the VO (the browser preview plays it outside the player).
export const PromptingWithArtifacts: React.FC<{ audioSrc?: string }> = ({ audioSrc }) => (
  <AbsoluteFill style={{ backgroundColor: '#fff' }}>
    <Sequence durationInFrames={PWA_TITLE_FRAMES}>
      <TitleCardGreen label="MICROSOFT 365 COPILOT" title="Prompting with Artifacts in Copilot" />
    </Sequence>
    <Sequence from={PWA_TITLE_FRAMES}>
      <Body audioSrc={audioSrc} />
    </Sequence>
  </AbsoluteFill>
);
