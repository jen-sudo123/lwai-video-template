import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { LogoFooter } from '../Logo';
import { AppWindow, AppWindowCam, AppWindowCur, AppWindowRing, AppWindowStep } from '../kit';

type AppWindowSceneProps = {
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  windowTitle?: string;
  camera?: AppWindowCam[];
  cursor?: AppWindowCur[];
  rings?: AppWindowRing[];
  steps?: AppWindowStep[];
};

// Screenshot in an animated browser window (demo-kit style): camera pan/zoom, cursor with clicks,
// spotlight rings and a STEP caption. Every `at` is in SECONDS from the start of this scene;
// x/y/w/h are pixels of the screenshot itself (imageWidth x imageHeight, default 1920x1080).
export const AppWindowScene: React.FC<AppWindowSceneProps> = ({
  image,
  imageWidth = 1920,
  imageHeight = 1080,
  windowTitle = 'claude.ai',
  camera,
  cursor,
  rings,
  steps,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: '#fff' }}>
      <AppWindow
        t={frame / fps}
        start={0}
        src={staticFile(image)}
        imgW={imageWidth}
        imgH={imageHeight}
        title={windowTitle}
        cam={camera}
        cursor={cursor}
        rings={rings}
        steps={steps}
      />
      <LogoFooter />
    </AbsoluteFill>
  );
};
