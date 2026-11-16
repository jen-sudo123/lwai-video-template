import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { LovableDemo, LOVABLE_DEMO_DURATION_S, LOVABLE_DEMO_TITLE_FRAMES } from './compositions/LovableDemo';

const FPS = 30;
const TITLE_S = LOVABLE_DEMO_TITLE_FRAMES / FPS;
const TOTAL_S = TITLE_S + LOVABLE_DEMO_DURATION_S;
const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

// One clock: during the title card a wall clock runs; after it, the <audio> element's currentTime drives the frame.
const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [T, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const clock = useRef({ T: 0, last: 0 });

  useEffect(() => {
    let raf = 0;
    const tick = (now: number) => {
      const c = clock.current;
      const a = audio.current!;
      if (playing) {
        if (c.T < TITLE_S) {
          c.T += (now - (c.last || now)) / 1000;
          if (c.T >= TITLE_S) { a.currentTime = c.T - TITLE_S; a.play().catch(() => {}); }
        } else {
          if (a.paused && !a.ended) a.play().catch(() => {});
          c.T = TITLE_S + a.currentTime;
          if (a.ended || c.T >= TOTAL_S) { setPlaying(false); }
        }
      }
      c.last = now;
      player.current?.seekTo(Math.min(Math.round(c.T * FPS), Math.ceil(TOTAL_S * FPS) - 1));
      setT(c.T);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const a = audio.current!;
    if (playing) { a.pause(); setPlaying(false); return; }
    if (clock.current.T >= TOTAL_S - 0.1) clock.current.T = 0;
    if (clock.current.T >= TITLE_S) { a.currentTime = clock.current.T - TITLE_S; a.play().catch(() => {}); }
    clock.current.last = 0;
    setPlaying(true);
  };
  const seek = (v: number) => {
    clock.current.T = v;
    const a = audio.current!;
    if (v >= TITLE_S) { a.currentTime = v - TITLE_S; if (playing) a.play().catch(() => {}); } else { a.pause(); a.currentTime = 0; }
  };

  return (
    <div className="wrap">
      <div className="stage">
        <Player ref={player} component={LovableDemo} inputProps={{ audioSrc: 'none' }}
          durationInFrames={Math.ceil(TOTAL_S * FPS)} fps={FPS} compositionWidth={1920} compositionHeight={1080}
          style={{ width: '100%', aspectRatio: '16 / 9' }} acknowledgeRemotionLicense />
      </div>
      <div className="bar">
        <button id="play" onClick={toggle}>{playing ? 'Pause' : 'Play'}</button>
        <input id="scrub" type="range" min={0} max={TOTAL_S} step={0.05} value={T} onChange={(e) => seek(parseFloat(e.target.value))} aria-label="Position" />
        <span className="time">{fmt(T)} / {fmt(TOTAL_S)}</span>
      </div>
      <audio ref={audio} src={(globalThis as any).LOVABLE_DEMO_AUDIO} preload="auto" />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
