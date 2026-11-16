import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Player, PlayerRef } from '@remotion/player';
import { ClaudeDesignProposal, CLAUDE_DESIGN_PROPOSAL_DURATION_S, CLAUDE_DESIGN_PROPOSAL_TITLE_FRAMES } from './compositions/ClaudeDesignProposal';

declare const VO_SRC: string;
const FPS = 30;
const TOTAL = CLAUDE_DESIGN_PROPOSAL_TITLE_FRAMES + Math.ceil(CLAUDE_DESIGN_PROPOSAL_DURATION_S * FPS);

const App = () => {
  const player = useRef<PlayerRef>(null);
  const audio = useRef<HTMLAudioElement>(null);
  const [, force] = useState(0);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const a = audio.current;
      if (a && player.current) player.current.seekTo(Math.min(TOTAL - 1, Math.round(a.currentTime * FPS)));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="wrap">
      <div className="frame">
        <Player
          ref={player}
          component={ClaudeDesignProposal}
          inputProps={{ audioSrc: 'none' }}
          durationInFrames={TOTAL}
          compositionWidth={1920}
          compositionHeight={1080}
          fps={FPS}
          style={{ width: '100%', aspectRatio: '16 / 9' }}
          acknowledgeRemotionLicense
        />
      </div>
      <audio ref={audio} src={VO_SRC} controls preload="auto" onPlay={() => force((n) => n + 1)} />
    </div>
  );
};
createRoot(document.getElementById('root')!).render(<App />);
