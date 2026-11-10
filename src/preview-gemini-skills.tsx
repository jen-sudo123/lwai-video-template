import React from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { GeminiSkills, GEMINI_SKILLS_DURATION_S, GEMINI_SKILLS_TITLE_FRAMES } from './compositions/GeminiSkills';

const total = GEMINI_SKILLS_TITLE_FRAMES + Math.ceil(GEMINI_SKILLS_DURATION_S * 30);
const App = () => {
  const ref = React.useRef<PlayerRef>(null);
  React.useEffect(() => {
    const audio = document.getElementById('vo') as HTMLAudioElement;
    let raf = 0;
    let last = -1;
    const tick = () => {
      const started = audio.currentTime > 0 || !audio.paused;
      const f = started ? Math.min(total - 1, GEMINI_SKILLS_TITLE_FRAMES + Math.round(audio.currentTime * 30)) : 0;
      if (f !== last) {
        ref.current?.seekTo(f);
        last = f;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    (window as unknown as { seekPreview: (s: number) => void }).seekPreview = (s) => {
      audio.currentTime = s;
    };
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <Player
      ref={ref}
      component={GeminiSkills}
      inputProps={{ audioSrc: 'none' }}
      durationInFrames={total}
      compositionWidth={1920}
      compositionHeight={1080}
      fps={30}
      style={{ width: '100%' }}
      acknowledgeRemotionLicense
    />
  );
};
createRoot(document.getElementById('player')!).render(<App />);
