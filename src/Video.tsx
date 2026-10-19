import React from 'react';
import { Series, Sequence, Audio, OffthreadVideo, staticFile, useCurrentFrame, interpolate } from 'remotion';
import { loadFont as loadSerif } from '@remotion/google-fonts/IBMPlexSerif';
import { loadFont as loadSans } from '@remotion/google-fonts/PublicSans';
import { VideoData } from './scenes/types';
import { SceneRenderer } from './scenes/SceneRenderer';
import { CaptionOverlay } from './CaptionOverlay';
loadSerif();
loadSans();

const AVATAR_SIZE = 150;
const AVATAR_MARGIN = 20;
const AVATAR_CENTER_SIZE = 600;
const CANVAS_W = 1920;
const CANVAS_H = 1080;
const ZOOM_TRANSITION = 20;
const KF_TRANSITION = 30;
const AVT_TRANSITION = 30;

type ZoomKF = { startFrame: number; scale: number; originX: number; originY: number };
type AvatarKF = { frame: number; position: 'corner' | 'center' | 'right-column'; size?: number };
type AvatarState = { left: number; top: number; size: number };

function resolveAvatarState(
  position: 'corner' | 'center' | 'right-column',
  cornerSide: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right',
  size?: number,
): AvatarState {
  if (position === 'center') {
    const s = size ?? AVATAR_CENTER_SIZE;
    return { left: (CANVAS_W - s) / 2, top: (CANVAS_H - s) / 2, size: s };
  }
  if (position === 'right-column') {
    const s = size ?? AVATAR_CENTER_SIZE;
    // Centre of the right 54 % column (matches panelLayout: 'text-left' split at 46 %)
    const colCenterX = CANVAS_W * 0.46 + (CANVAS_W * 0.54) / 2; // ≈ 1402
    return { left: colCenterX - s / 2, top: (CANVAS_H - s) / 2, size: s };
  }
  const s = size ?? AVATAR_SIZE;
  if (cornerSide === 'bottom-left') {
    return { left: AVATAR_MARGIN, top: CANVAS_H - AVATAR_MARGIN - s, size: s };
  }
  if (cornerSide === 'top-left') {
    return { left: AVATAR_MARGIN, top: AVATAR_MARGIN, size: s };
  }
  if (cornerSide === 'bottom-right') {
    return { left: CANVAS_W - AVATAR_MARGIN - s, top: CANVAS_H - AVATAR_MARGIN - s, size: s };
  }
  return { left: CANVAS_W - AVATAR_MARGIN - s, top: AVATAR_MARGIN, size: s };
}

export const Video: React.FC<VideoData> = ({ scenes, audioSrc, audioStartFrame, audioInserts, avatarSrc, avatarStartFrame, clipSrc, clipStartFrame, clipMuted, keywordJumps, avatarKeyframes, avatarHideRanges, avatarCutFrame, avatarResumeFrame, captions }) => {
  const frame = useCurrentFrame();

  let cum = 0;
  let avatarHidden = false;
  let avatarPosition: 'top-right' | 'bottom-left' | 'top-left' | 'bottom-right' = 'top-right';
  let clipVisible = false;
  let localFrame = 0;
  let clipZoom: { scale: number; originX: number; originY: number } | undefined;
  let clipZoomKeyframes: ZoomKF[] | undefined;
  let prevZoom: typeof clipZoom;

  for (let i = 0; i < scenes.length; i++) {
    const scene = scenes[i];
    if (frame >= cum && frame < cum + scene.durationInFrames) {
      avatarHidden = !!(scene as any).hideAvatar;
      avatarPosition = (scene as any).avatarPosition ?? 'top-right';
      clipVisible = scene.layout === 'video-clip';
      localFrame = frame - cum;
      if (scene.layout === 'video-clip') {
        clipZoom = (scene as any).clipZoom;
        clipZoomKeyframes = (scene as any).clipZoomKeyframes;
      }
      if (i > 0 && scenes[i - 1].layout === 'video-clip') {
        prevZoom = (scenes[i - 1] as any).clipZoom;
      }
      break;
    }
    cum += scene.durationInFrames;
  }

  // Clip zoom interpolation
  let currentScale: number;
  let currentOX: number;
  let currentOY: number;

  if (clipZoomKeyframes && clipZoomKeyframes.length > 0) {
    let activeIdx = 0;
    for (let i = 1; i < clipZoomKeyframes.length; i++) {
      if (clipZoomKeyframes[i].startFrame <= localFrame) activeIdx = i;
    }
    const active = clipZoomKeyframes[activeIdx];
    const prev: ZoomKF = activeIdx > 0
      ? clipZoomKeyframes[activeIdx - 1]
      : { startFrame: 0, scale: 1, originX: 50, originY: 50 };
    const t = interpolate(localFrame, [active.startFrame, active.startFrame + KF_TRANSITION], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    currentScale = prev.scale + (active.scale - prev.scale) * t;
    currentOX = prev.originX + (active.originX - prev.originX) * t;
    currentOY = prev.originY + (active.originY - prev.originY) * t;
  } else {
    const targetScale = clipZoom?.scale ?? 1;
    const targetOX = clipZoom?.originX ?? 50;
    const targetOY = clipZoom?.originY ?? 50;
    const zoomProgress = interpolate(localFrame, [0, ZOOM_TRANSITION], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    const fromScale = prevZoom?.scale ?? 1;
    const fromOX = prevZoom?.originX ?? 50;
    const fromOY = prevZoom?.originY ?? 50;
    currentScale = fromScale + (targetScale - fromScale) * zoomProgress;
    currentOX = fromOX + (targetOX - fromOX) * zoomProgress;
    currentOY = fromOY + (targetOY - fromOY) * zoomProgress;
  }

  // Avatar position/size animation
  let avatarLeft: number;
  let avatarTop: number;
  let avatarSize: number;

  if (avatarKeyframes && avatarKeyframes.length > 0) {
    const allKFs: AvatarKF[] = [{ frame: 0, position: 'corner' }, ...avatarKeyframes];

    let fromIdx = 0;
    for (let i = 0; i < allKFs.length; i++) {
      if (allKFs[i].frame <= frame) fromIdx = i;
    }

    const prevKF = fromIdx > 0 ? allKFs[fromIdx - 1] : allKFs[0];
    const currKF = allKFs[fromIdx];

    const fromState = resolveAvatarState(prevKF.position, avatarPosition, prevKF.size);
    const toState = resolveAvatarState(currKF.position, avatarPosition, currKF.size);

    const t = interpolate(frame, [currKF.frame, currKF.frame + AVT_TRANSITION], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    avatarLeft = fromState.left + (toState.left - fromState.left) * t;
    avatarTop = fromState.top + (toState.top - fromState.top) * t;
    avatarSize = fromState.size + (toState.size - fromState.size) * t;
  } else {
    const state = resolveAvatarState('corner', avatarPosition);
    avatarLeft = state.left;
    avatarTop = state.top;
    avatarSize = state.size;
  }

  return (
    <>
      {audioSrc ? (() => {
        const inserts = [...(audioInserts ?? [])].sort((a, b) => a.cutFrame - b.cutFrame);
        let filePos = audioStartFrame ?? 0;
        let compCursor = audioStartFrame ?? 0;
        const mainSegments: Array<{ from: number; durationInFrames?: number; startFrom: number }> = [];
        for (const ins of inserts) {
          mainSegments.push({ from: compCursor, durationInFrames: ins.cutFrame - compCursor, startFrom: filePos });
          filePos += (ins.cutFrame - compCursor) + (ins.skipFrames ?? 0);
          compCursor = ins.resumeFrame;
        }
        mainSegments.push({ from: compCursor, startFrom: filePos });

        return (
          <>
            {mainSegments.map((seg, i) => (
              <Sequence key={i} from={seg.from} durationInFrames={seg.durationInFrames}>
                <Audio src={staticFile(audioSrc)} startFrom={seg.startFrom} />
              </Sequence>
            ))}
            {inserts.map((ins, i) => (
              <Sequence key={i} from={ins.from ?? ins.cutFrame}>
                <Audio src={staticFile(ins.src)} />
              </Sequence>
            ))}
          </>
        );
      })() : null}

      {clipSrc ? (
        <Sequence from={clipStartFrame ?? 0}>
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              opacity: clipVisible ? 1 : 0,
            }}
          >
            <OffthreadVideo
              src={staticFile(clipSrc)}
              muted={clipMuted ?? true}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${currentScale})`,
                transformOrigin: `${currentOX}% ${currentOY}%`,
              }}
            />
          </div>
        </Sequence>
      ) : null}

      <Series>
        {scenes.map((scene, i) => (
          <Series.Sequence
            key={i}
            durationInFrames={scene.durationInFrames}
          >
            <SceneRenderer scene={scene} hasClipLayer={!!clipSrc} />
          </Series.Sequence>
        ))}
      </Series>

      {captions && captions.length > 0 && (
        <CaptionOverlay captions={captions} />
      )}

      {avatarSrc && avatarCutFrame != null && avatarResumeFrame != null ? (
        <>
          {/* Segment 1: start → avatarCutFrame */}
          <Sequence from={avatarStartFrame ?? 0} durationInFrames={avatarCutFrame - (avatarStartFrame ?? 0)}>
            <div
              style={{
                position: 'absolute',
                left: avatarLeft,
                top: avatarTop,
                width: avatarSize,
                height: avatarSize,
                borderRadius: '50%',
                overflow: 'hidden',
                opacity: (avatarHidden || avatarHideRanges?.some(r => frame >= r.from && frame <= r.to)) ? 0 : 1,
              }}
            >
              <OffthreadVideo
                src={staticFile(avatarSrc)}
                muted
                style={{
                  width: '120%',
                  height: '120%',
                  marginTop: '-14%',
                  marginLeft: '-10%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Sequence>
          {/* Segment 2: avatarResumeFrame → end, resuming video from avatarCutFrame */}
          <Sequence from={avatarResumeFrame}>
            <div
              style={{
                position: 'absolute',
                left: avatarLeft,
                top: avatarTop,
                width: avatarSize,
                height: avatarSize,
                borderRadius: '50%',
                overflow: 'hidden',
                opacity: (avatarHidden || avatarHideRanges?.some(r => frame >= r.from && frame <= r.to)) ? 0 : 1,
              }}
            >
              <OffthreadVideo
                src={staticFile(avatarSrc)}
                muted
                startFrom={avatarCutFrame - (avatarStartFrame ?? 0)}
                style={{
                  width: '120%',
                  height: '120%',
                  marginTop: '-14%',
                  marginLeft: '-10%',
                  objectFit: 'cover',
                }}
              />
            </div>
          </Sequence>
        </>
      ) : avatarSrc ? (
        <Sequence from={avatarStartFrame ?? 0}>
          <div
            style={{
              position: 'absolute',
              left: avatarLeft,
              top: avatarTop,
              width: avatarSize,
              height: avatarSize,
              borderRadius: '50%',
              overflow: 'hidden',
              opacity: (avatarHidden || avatarHideRanges?.some(r => frame >= r.from && frame <= r.to)) ? 0 : 1,
            }}
          >
            <OffthreadVideo
              src={staticFile(avatarSrc)}
              muted
              style={{
                width: '120%',
                height: '120%',
                marginTop: '-14%',
                marginLeft: '-10%',
                objectFit: 'cover',
              }}
            />
          </div>
        </Sequence>
      ) : null}
    </>
  );
};

export const calculateTotalFrames = (scenes: VideoData['scenes']): number =>
  scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);
