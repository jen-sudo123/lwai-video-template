import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import {
  CopilotPersonalization,
  COPILOT_PERSONALIZATION_DURATION_S,
  COPILOT_PERSONALIZATION_TITLE_FRAMES,
} from './compositions/CopilotPersonalization';

const TOTAL = COPILOT_PERSONALIZATION_TITLE_FRAMES + Math.ceil(COPILOT_PERSONALIZATION_DURATION_S * 30);

const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const audio = document.getElementById('vo') as HTMLAudioElement;
  const [label, setLabel] = useState('');
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = audio.currentTime;
      // Before the VO starts, hold the title card; afterwards follow the audio clock exactly.
      const f = t <= 0.001 && audio.paused ? 45 : COPILOT_PERSONALIZATION_TITLE_FRAMES + Math.round(t * 30);
      player.current?.seekTo(Math.min(TOTAL - 1, f));
      const m = Math.floor(t / 60);
      setLabel(`${m}:${String(Math.floor(t % 60)).padStart(2, '0')}  ·  frame ${f}`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [audio]);
  return (
    <>
      <Player
        ref={player}
        component={CopilotPersonalization}
        inputProps={{ audioSrc: 'none' }}
        durationInFrames={TOTAL}
        fps={30}
        compositionWidth={1920}
        compositionHeight={1080}
        style={{ width: '100%', aspectRatio: '16 / 9' }}
      />
      <div className="clock">{label}</div>
    </>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
