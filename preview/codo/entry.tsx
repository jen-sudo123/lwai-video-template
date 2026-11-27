import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { CodoPromptFramework, CODO_DURATION_S, CODO_TITLE_FRAMES } from '../../src/compositions/CodoPromptFramework';

const FPS = 30;
const TITLE_S = CODO_TITLE_FRAMES / FPS;
const TOTAL_FRAMES = CODO_TITLE_FRAMES + Math.ceil(CODO_DURATION_S * FPS);
const TOTAL_S = TOTAL_FRAMES / FPS;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const clock = useRef({ t: 0, last: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const a = audio.current!;
      const c = clock.current;
      if (playing) {
        if (c.t < TITLE_S) {
          c.t += c.last ? (now - c.last) / 1000 : 0;
          if (c.t >= TITLE_S) { a.currentTime = c.t - TITLE_S; a.play().catch(() => {}); }
        } else {
          if (a.paused && !a.ended) a.play().catch(() => {});
          c.t = TITLE_S + a.currentTime;
          if (a.ended) c.t = Math.min(TOTAL_S, c.t + (c.last ? (now - c.last) / 1000 : 0));
        }
        if (c.t >= TOTAL_S - 0.02) { c.t = TOTAL_S - 1 / FPS; setPlaying(false); }
      }
      c.last = now;
      player.current?.seekTo(Math.min(TOTAL_FRAMES - 1, Math.round(c.t * FPS)));
      setT(c.t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const a = audio.current!;
    if (playing) { a.pause(); setPlaying(false); return; }
    if (clock.current.t >= TOTAL_S - 0.1) clock.current.t = 0;
    clock.current.last = 0;
    if (clock.current.t >= TITLE_S) { a.currentTime = clock.current.t - TITLE_S; a.play().catch(() => {}); }
    setPlaying(true);
  };
  const seek = (v: number) => {
    clock.current.t = v;
    const a = audio.current!;
    if (v >= TITLE_S) a.currentTime = v - TITLE_S; else { a.pause(); a.currentTime = 0; }
    if (playing && v >= TITLE_S) a.play().catch(() => {});
  };

  return (
    <div className="wrap">
      <div className="stage">
        <Player ref={player} component={CodoPromptFramework} inputProps={{ audioSrc: 'none' }} durationInFrames={TOTAL_FRAMES} fps={FPS}
          compositionWidth={1920} compositionHeight={1080} style={{ width: '100%', aspectRatio: '16 / 9' }} controls={false} clickToPlay={false} />
      </div>
      <div className="bar">
        <button id="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Pause' : 'Play'}</button>
        <input id="scrub" type="range" min={0} max={TOTAL_S} step={0.01} value={t} onChange={(e) => seek(Number(e.target.value))} aria-label="Seek" />
        <span className="time">{fmt(t)} / {fmt(TOTAL_S)}</span>
      </div>
      <audio ref={audio} src={(window as any).CODO_AUDIO} preload="auto" />
    </div>
  );
};
createRoot(document.getElementById('root')!).render(<App />);
