// Preview bundle for the Deep Research composition: a Remotion Player driven by a plain <audio> element
// (the player is seeked to audio.currentTime every animation frame, so picture and VO can't drift).
// Build: see preview/deep-research/build.sh
import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { DeepResearch, DEEP_RESEARCH_DURATION_S, DEEP_RESEARCH_TITLE_FRAMES } from '../../src/compositions/DeepResearch';

const FPS = 30;
const DURATION = DEEP_RESEARCH_TITLE_FRAMES + Math.ceil(DEEP_RESEARCH_DURATION_S * FPS);

const App: React.FC = () => {
  const ref = useRef<PlayerRef>(null);
  useEffect(() => {
    const audio = document.getElementById('vo') as HTMLAudioElement;
    let raf = 0;
    const tick = () => {
      const f = Math.min(DURATION - 1, Math.round(audio.currentTime * FPS));
      if (ref.current && ref.current.getCurrentFrame() !== f) ref.current.seekTo(f);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <Player
      ref={ref}
      component={DeepResearch}
      inputProps={{ audioSrc: 'none' }}
      durationInFrames={DURATION}
      fps={FPS}
      compositionWidth={1920}
      compositionHeight={1080}
      style={{ width: '100%', aspectRatio: '16 / 9' }}
      controls={false}
    />
  );
};

createRoot(document.getElementById('player')!).render(<App />);
