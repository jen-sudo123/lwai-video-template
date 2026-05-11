import React from 'react';
import { Series, Audio, OffthreadVideo, staticFile, useCurrentFrame } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { VideoData } from './scenes/types';
import { SceneRenderer } from './scenes/SceneRenderer';
// Load brand fonts (IBM Plex Serif + Public Sans). Remotion's google-fonts
// helper handles the font loading so text doesn't flash unstyled.
loadSerif();
loadSans();

const AVATAR_SIZE = 150;
const AVATAR_MARGIN = 20;

// Renders a list of scenes one after another. Optional voiceover plays underneath.
export const Video: React.FC<VideoData> = ({ scenes, audioSrc, avatarSrc, keywordJumps }) => {
  const frame = useCurrentFrame();

  // Determine whether the current scene hides the avatar.
  let cum = 0;
  let avatarHidden = false;
  for (const scene of scenes) {
    if (frame >= cum && frame < cum + scene.durationInFrames) {
      avatarHidden = !!(scene as any).hideAvatar;
      break;
    }
    cum += scene.durationInFrames;
  }

  return (
    <>
      {audioSrc && <Audio src={staticFile(audioSrc)} />}
      <Series>
        {scenes.map((scene, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={scene.durationInFrames}
          >
            <SceneRenderer scene={scene} />
          </Series.Sequence>
        ))}
      </Series>
      {avatarSrc && (
        <div
          style={{
            position: 'absolute',
            top: AVATAR_MARGIN,
            right: AVATAR_MARGIN,
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: '50%',
            overflow: 'hidden',
            opacity: avatarHidden ? 0 : 1,
          }}
        >
          <OffthreadVideo
            src={staticFile(avatarSrc)}
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
    </>
  );
};

// Helper: total video length in frames, used by Composition's durationInFrames.
export const calculateTotalFrames = (scenes: VideoData['scenes']): number =>
  scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);
