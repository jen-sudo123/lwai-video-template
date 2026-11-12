import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { ClaudeGmail, CLAUDE_GMAIL_DURATION_S, CLAUDE_GMAIL_TITLE_FRAMES } from './compositions/ClaudeGmail';

const FPS = 30;
const TOTAL = CLAUDE_GMAIL_TITLE_FRAMES + Math.ceil(CLAUDE_GMAIL_DURATION_S * FPS);
const TITLE_S = CLAUDE_GMAIL_TITLE_FRAMES / FPS;

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0); // composition seconds
  const clock = useRef({ t: 0, last: 0 });

  // One clock: before the VO starts (title card) a timer advances; after that the <audio> element drives the frame.
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
          c.t = TITLE_S + a.currentTime;
          if (a.ended) setPlaying(false);
        }
      }
      c.last = now;
      const f = Math.min(TOTAL - 1, Math.round(c.t * FPS));
      player.current?.seekTo(f);
      setTime(c.t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    const a = audio.current!;
    if (playing) { a.pause(); setPlaying(false); return; }
    if (clock.current.t >= TOTAL / FPS - 0.1) clock.current.t = 0;
    if (clock.current.t >= TITLE_S) { a.currentTime = clock.current.t - TITLE_S; a.play().catch(() => {}); }
    setPlaying(true);
  };
  const seek = (s: number) => {
    const a = audio.current!;
    clock.current.t = s;
    if (s >= TITLE_S) { a.currentTime = s - TITLE_S; if (playing) a.play().catch(() => {}); }
    else a.pause();
  };

  return (
    <div className="wrap">
      <div className="stage">
        <Player
          ref={player}
          component={ClaudeGmail}
          inputProps={{ audioSrc: 'none' }}
          durationInFrames={TOTAL}
          fps={FPS}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{ width: '100%', aspectRatio: '16 / 9', display: 'block' }}
          clickToPlay={false}
        />
      </div>
      <div className="bar">
        <button id="play" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? 'Pause' : 'Play'}</button>
        <input id="scrub" type="range" min={0} max={TOTAL / FPS} step={0.05} value={time} onChange={(e) => seek(Number(e.target.value))} aria-label="Seek" />
        <span className="time">{fmt(time)} / {fmt(TOTAL / FPS)}</span>
      </div>
      <audio ref={audio} src={(window as unknown as { VO_SRC: string }).VO_SRC} preload="auto" />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
