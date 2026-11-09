// Browser preview entry (esbuild bundle → Artifact). Not used by Remotion renders.
import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { ChatGPTSkills, CHATGPT_SKILLS_DURATION_S, CHATGPT_SKILLS_TITLE_FRAMES } from './compositions/ChatGPTSkills';

const FPS = 30;
const TOTAL = CHATGPT_SKILLS_TITLE_FRAMES + Math.ceil(CHATGPT_SKILLS_DURATION_S * FPS);

const App: React.FC = () => {
  const ref = useRef<PlayerRef>(null);
  useEffect(() => {
    // The <audio> (VO pre-padded with the 3s title card) is the clock: the player follows it every animation frame.
    const audio = document.getElementById('vo') as HTMLAudioElement;
    let raf = 0;
    const tick = () => {
      const f = Math.min(TOTAL - 1, Math.round(audio.currentTime * FPS));
      if (ref.current && ref.current.getCurrentFrame() !== f) ref.current.seekTo(f);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <Player
      ref={ref}
      component={ChatGPTSkills}
      inputProps={{ audioSrc: 'none' }}
      durationInFrames={TOTAL}
      fps={FPS}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: '100%', aspectRatio: '16 / 9' }}
      acknowledgeRemotionLicense
    />
  );
};

createRoot(document.getElementById('player')!).render(<App />);
