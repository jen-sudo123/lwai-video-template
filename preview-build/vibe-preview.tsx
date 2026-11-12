import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { VibeCoding, VIBE_CODING_DURATION_S, VIBE_CODING_TITLE_FRAMES } from '../src/compositions/VibeCoding';

const FPS = 30;
const TOTAL = VIBE_CODING_TITLE_FRAMES + Math.ceil(VIBE_CODING_DURATION_S * FPS);
const TITLE_S = VIBE_CODING_TITLE_FRAMES / FPS;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const App = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0); // seconds on the video timeline
  const posRef = useRef(0);
  const clock = useRef<{ t0: number; p0: number } | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const a = audio.current!;
      let p = posRef.current;
      if (playing) {
        if (p < TITLE_S) {
          p = clock.current!.p0 + (performance.now() - clock.current!.t0) / 1000;
          if (p >= TITLE_S) { a.currentTime = p - TITLE_S; a.play().catch(() => {}); }
        } else {
          p = TITLE_S + a.currentTime;
          if (a.ended) setPlaying(false);
        }
      }
      p = Math.min(p, TOTAL / FPS);
      posRef.current = p;
      setPos(p);
      player.current?.seekTo(Math.min(TOTAL - 1, Math.round(p * FPS)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (p: number) => {
    posRef.current = p;
    const a = audio.current!;
    if (p >= TITLE_S) { a.currentTime = p - TITLE_S; if (playing) a.play().catch(() => {}); }
    else { a.pause(); clock.current = { t0: performance.now(), p0: p }; }
  };
  const toggle = () => {
    const a = audio.current!;
    if (playing) { a.pause(); setPlaying(false); return; }
    if (posRef.current >= TOTAL / FPS - 0.1) posRef.current = 0;
    clock.current = { t0: performance.now(), p0: posRef.current };
    if (posRef.current >= TITLE_S) { a.currentTime = posRef.current - TITLE_S; a.play().catch(() => {}); }
    setPlaying(true);
  };

  return (
    <div className="wrap">
      <div className="stage">
        <Player ref={player} component={VibeCoding} inputProps={{ audioSrc: 'none' }} durationInFrames={TOTAL} fps={FPS}
          compositionWidth={1920} compositionHeight={1080} style={{ width: '100%', aspectRatio: '16 / 9' }} />
      </div>
      <div className="bar">
        <button id="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Pause' : 'Play'}</button>
        <input id="scrub" type="range" min={0} max={TOTAL / FPS} step={0.1} value={pos} onChange={(e) => seek(Number(e.target.value))} aria-label="Position" />
        <span className="time">{fmt(pos)} / {fmt(TOTAL / FPS)}</span>
      </div>
      <audio ref={audio} src={(window as any).VO_SRC} preload="auto" />
    </div>
  );
};
createRoot(document.getElementById('root')!).render(<App />);
