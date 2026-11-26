import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { ZoomAi, ZOOM_AI_DURATION_S, ZOOM_AI_TITLE_FRAMES } from '../../src/compositions/ZoomAi';

const FPS = 30;
const TOTAL = ZOOM_AI_TITLE_FRAMES + Math.ceil(ZOOM_AI_DURATION_S * FPS);
const OFFSET = ZOOM_AI_TITLE_FRAMES / FPS; // VO in the preview audio is pre-padded by the title card length
const CHAPTERS: [string, number][] = [
  ['Intro', 0],
  ['Before', OFFSET + 10.85],
  ['During', OFFSET + 92.15],
  ['After', OFFSET + 164.25],
  ['ZoomMate brief', OFFSET + 190.35],
  ['Own assistant', OFFSET + 236.6],
  ['Takeaway', OFFSET + 258.95],
];
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const total = TOTAL / FPS;

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const a = audio.current;
      if (a && player.current) {
        const f = Math.min(TOTAL - 1, Math.round(a.currentTime * FPS));
        player.current.seekTo(f);
        setTime(a.currentTime);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else { a.pause(); setPlaying(false); }
  };
  const seek = (s: number) => { if (audio.current) audio.current.currentTime = Math.max(0, Math.min(total, s)); };
  const chapter = [...CHAPTERS].reverse().find(([, s]) => time >= s - 0.01)?.[0];

  return (
    <div className="wrap">
      <div className="stage" onClick={toggle}>
        <Player
          ref={player}
          component={ZoomAi}
          inputProps={{ audioSrc: 'none' }}
          durationInFrames={TOTAL}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={FPS}
          style={{ width: '100%', aspectRatio: '16 / 9' }}
          acknowledgeRemotionLicense
        />
        {!playing && time < 0.05 && <div className="overlay"><span>▶ Play with voiceover</span></div>}
      </div>
      <div className="bar">
        <button id="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Pause' : 'Play'}</button>
        <input id="scrub" type="range" min={0} max={total} step={0.05} value={time} onChange={(e) => seek(Number(e.target.value))} aria-label="Seek" />
        <span className="time">{fmt(time)} / {fmt(total)}</span>
      </div>
      <div className="chapters">
        {CHAPTERS.map(([name, s]) => (
          <button key={name} className={chapter === name ? 'on' : ''} onClick={() => seek(s)}>{name} <em>{fmt(s)}</em></button>
        ))}
      </div>
      <audio ref={audio} src={(globalThis as any).ZOOM_AI_VO} preload="auto" onEnded={() => setPlaying(false)} />
    </div>
  );
};
createRoot(document.getElementById('root')!).render(<App />);
