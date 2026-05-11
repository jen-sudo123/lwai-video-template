import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, Img, staticFile } from 'remotion';

type ZoomRegionImageProps = {
  src: string;
  style?: React.CSSProperties;
  // 0–1 normalized X centre of region to zoom to (0=left edge, 0.5=centre, 1=right edge)
  zoomCenterX?: number;
  // Target scale multiplier (default 1 = no zoom)
  zoomScale?: number;
  // Frame within the scene at which to begin zooming
  zoomStartFrame?: number;
  // Width of the container in px — used to compute the pan offset
  containerWidth?: number;
};

// Punchy pop-in + smooth zoom/pan to a horizontal region of the image.
// The outer div is a fixed clip region (overflow: hidden); the Img element
// inside carries the transform so it never bleeds outside the container.
export const ZoomRegionImage: React.FC<ZoomRegionImageProps> = ({
  src,
  style = {},
  zoomCenterX = 0.5,
  zoomScale = 1,
  zoomStartFrame = 0,
  containerWidth = 1020,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entry pop — same feel as PunchyImage
  const entrySpring = spring({
    frame,
    fps,
    config: { damping: 7, stiffness: 120, mass: 0.6 },
    from: 0,
    to: 1,
  });
  // 0→1 mapped to 0.6→1, capped at 1 so zoom takes over cleanly
  const entryScale = 0.6 + 0.4 * Math.min(1, entrySpring);

  // Zoom spring — kicks in at zoomStartFrame
  const zoomF = Math.max(0, frame - zoomStartFrame);
  const zoomProgress = spring({
    frame: zoomF,
    fps,
    config: { damping: 22, stiffness: 65, mass: 1.2 },
    from: 0,
    to: 1,
  });

  // The Img element fills 100% of the container, transform-origin at its centre.
  // To pan a column centre (weekCenterX) to the container centre at full zoom:
  //   tx = zoomScale × (containerCentre − weekCenterX)
  // We interpolate tx from 0→targetTx as zoomProgress goes 0→1.
  const containerCenter = containerWidth / 2;
  const weekCenterX = zoomCenterX * containerWidth;
  const targetTx = zoomScale * (containerCenter - weekCenterX);

  const currentScale = entryScale * (1 + (zoomScale - 1) * zoomProgress);
  const currentTx = targetTx * zoomProgress;

  // Opacity ramp: full opacity by frame 4 (matches PunchyImage)
  const opacity = Math.min(1, (frame + 1) / 4);

  return (
    // Fixed clip region — overflow:hidden keeps the zoomed image inside the panel
    <div
      style={{
        ...style,
        opacity,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Transform lives on the Img so it never escapes the clip boundary */}
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          display: 'block',
          transformOrigin: 'center center',
          transform: `translateX(${currentTx}px) scale(${currentScale})`,
        }}
      />
    </div>
  );
};
