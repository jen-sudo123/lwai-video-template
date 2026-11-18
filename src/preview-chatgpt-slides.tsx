// Browser preview entry (esbuild) for the ChatGPTSlides composition. Not used by Remotion renders.
import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { ChatGPTSlides, CHATGPT_SLIDES_DURATION_S, CHATGPT_SLIDES_TITLE_FRAMES } from './compositions/ChatGPTSlides';

declare const SHOTS: Record<string, string>;
(globalThis as { CHATGPT_SLIDES_SHOTS?: Record<string, string> }).CHATGPT_SLIDES_SHOTS = SHOTS;
const FPS = 30;
const TOTAL = CHATGPT_SLIDES_TITLE_FRAMES + Math.ceil(CHATGPT_SLIDES_DURATION_S * FPS);
const Comp: React.FC = () => <ChatGPTSlides audioSrc="none" />;

// The VO plays in a plain <audio>; the player is seeked to it every animation frame so picture and VO can't drift.
// Audio time a maps to frame TITLE + a*30; during the 3s title card the audio is held at 0.
const App: React.FC = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const clock = useRef({ t0: 0, introStart: -1 });
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const a = audio.current, p = player.current;
      if (a && p) {
        const c = clock.current;
        if (c.introStart >= 0) {
          const el = (performance.now() - c.introStart) / 1000;
          if (el * FPS >= CHATGPT_SLIDES_TITLE_FRAMES) { c.introStart = -1; a.currentTime = 0; a.play(); }
          else p.seekTo(Math.floor(el * FPS));
        } else {
          p.seekTo(Math.min(TOTAL - 1, CHATGPT_SLIDES_TITLE_FRAMES + Math.round(a.currentTime * FPS)));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const playFromStart = () => { const a = audio.current!; a.pause(); a.currentTime = 0; clock.current.introStart = performance.now(); };
  return (
    <div className="wrap">
      <div className="stage">
        <Player ref={player} component={Comp} durationInFrames={TOTAL} fps={FPS} compositionWidth={1920} compositionHeight={1080}
          style={{ width: '100%', aspectRatio: '16 / 9' }} />
      </div>
      <div className="controls">
        <button type="button" id="play-start" onClick={playFromStart}>Play from start</button>
        <audio id="vo" ref={audio} controls preload="auto" src={(globalThis as any).VO_SRC} onPlay={() => { clock.current.introStart = -1; }} />
      </div>
      <p className="hint">Use the audio bar to pause or scrub; the picture follows the voiceover. On the audio bar, steps 1 to 6 start at 0:50, 1:45, 2:18, 2:48, 3:19 and 3:42.</p>
    </div>
  );
};
createRoot(document.getElementById('root')!).render(<App />);
