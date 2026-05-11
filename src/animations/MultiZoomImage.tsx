import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Img, staticFile } from 'remotion';

export type ZoomKeyframe = {
  // Frame within the scene at which this zoom state begins
  startFrame: number;
  // 0–1 normalised X centre (0=left, 0.5=centre, 1=right). Default 0.5.
  centerX?: number;
  // 0–1 normalised Y centre (0=top, 0.5=centre, 1=bottom). Default 0.5.
  centerY?: number;
  // Scale multiplier. Default 1.
  scale?: number;
};

type MultiZoomImageProps = {
  src: string;
  style?: React.CSSProperties;
  // Ordered list of zoom states. The first keyframe should have startFrame=0
  // and defines the initial (unzoomed) position.
  keyframes: ZoomKeyframe[];
  // Container dimensions in px — used to compute the pan offsets.
  containerWidth?: number;
  containerHeight?: number;
  // Skip the entry pop-in animation — use for scenes that continue from a previous scene.
  noEntryAnimation?: boolean;
};

// Pop-in + multi-keyframe zoom/pan image.
// Each keyframe springs smoothly into the next when its startFrame is reached.
export const MultiZoomImage: React.FC<MultiZoomImageProps> = ({
  src,
  style = {},
  keyframes,
  containerWidth = 1020,
  containerHeight = 580,
  noEntryAnimation = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry pop: scale from 0.6→1 over the first ~20 frames.
  const entryScale = noEntryAnimation ? 1 : spring({
    frame,
    fps,
    config: { damping: 7, stiffness: 120, mass: 0.6 },
    from: 0.6,
    to: 1,
  });

  // Find which keyframe segment we're in.
  // prevKF holds the resolved target of the last segment (what we spring FROM).
  // currKF is the keyframe we're currently springing TO.
  let prevKF: ZoomKeyframe = keyframes[0];
  let currKF: ZoomKeyframe = keyframes[0];
  for (const kf of keyframes) {
    if (frame >= kf.startFrame) {
      prevKF = currKF;
      currKF = kf;
    }
  }

  const prevScale = prevKF.scale ?? 1;
  const prevCX = prevKF.centerX ?? 0.5;
  const prevCY = prevKF.centerY ?? 0.5;
  const currScale = currKF.scale ?? 1;
  const currCX = currKF.centerX ?? 0.5;
  const currCY = currKF.centerY ?? 0.5;

  // Spring from prev to curr values starting at currKF.startFrame.
  const segFrame = Math.max(0, frame - currKF.startFrame);
  const t = spring({
    frame: segFrame,
    fps,
    config: { damping: 22, stiffness: 65, mass: 1.2 },
    from: 0,
    to: 1,
  });

  const scale = prevScale + (currScale - prevScale) * t;
  const cx = prevCX + (currCX - prevCX) * t;
  const cy = prevCY + (currCY - prevCY) * t;

  // Pan so the (cx, cy) point in the container lands at the container centre.
  // Formula: tx = scale × containerWidth  × (0.5 − cx)
  //          ty = scale × containerHeight × (0.5 − cy)
  const tx = scale * containerWidth * (0.5 - cx);
  const ty = scale * containerHeight * (0.5 - cy);

  // Combine entry pop with the running zoom scale.
  const combinedScale = frame < 20 ? entryScale * scale : scale;

  const opacity = noEntryAnimation ? 1 : Math.min(1, (frame + 1) / 4);

  return (
    <div
      style={{
        ...style,
        opacity,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          transformOrigin: 'center center',
          transform: `translate(${tx}px, ${ty}px) scale(${combinedScale})`,
        }}
      />
    </div>
  );
};
