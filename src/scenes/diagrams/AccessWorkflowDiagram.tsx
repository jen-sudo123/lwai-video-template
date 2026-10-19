import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../../Logo';

type Props = {
  // Scene-local frame the first connector (context → AI) draws in. Default 40.
  // The AI icon, second connector, and workflow icon cascade in shortly after.
  arrowFrame?: number;
};

const CHARCOAL = '#444444';
const LIME = '#85E13A';

const fadeIn = (frame: number, start: number) =>
  interpolate(frame, [start, start + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

// AI on the left; your work context and a reusable workflow stacked on the
// right, both branching off AI — sized to fill the frame now that there's no
// caption competing for vertical space.
export const AccessWorkflowDiagram: React.FC<Props> = ({ arrowFrame = 40 }) => {
  const frame = useCurrentFrame();

  const headingIn = fadeIn(frame, 0);
  const contextIn = fadeIn(frame, 10);
  const connector1In = fadeIn(frame, arrowFrame);
  const aiIn = fadeIn(frame, arrowFrame + 15);
  const connector2In = fadeIn(frame, arrowFrame + 35);
  const workflowIn = fadeIn(frame, arrowFrame + 50);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
      <svg viewBox="0 0 1200 675" width="100%" height="100%" role="img">
        <title>AI Work Context and Reusable Workflow</title>

        <g style={{ opacity: headingIn }}>
          <text x="80" y="105" fill={CHARCOAL} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="50" fontWeight={400}>
            AI works with your context
          </text>
          <rect x="80" y="135" width="1040" height="7" fill={LIME} />
        </g>

        {/* AI — left side, vertically centered */}
        <g style={{ opacity: aiIn }} transform="translate(80 263)">
          <rect x="0" y="0" width="210" height="145" rx="8" fill={LIME} />
          <text x="105" y="83" textAnchor="middle" dominantBaseline="middle" fill={CHARCOAL} fontFamily="'IBM Plex Serif', Georgia, serif" fontSize="48">
            AI
          </text>
        </g>

        {/* Branching connector: AI -> a vertical bus -> each right-side icon */}
        <g style={{ opacity: connector1In }} fill="none" stroke={CHARCOAL} strokeWidth="4">
          <line x1="290" y1="335" x2="530" y2="335" />
          <line x1="530" y1="218" x2="530" y2="450" />
          <line x1="530" y1="218" x2="600" y2="218" />
          <path d="M585 205 L602 218 L585 231" strokeLinecap="square" strokeLinejoin="miter" />
        </g>
        <g style={{ opacity: connector2In }} fill="none" stroke={CHARCOAL} strokeWidth="4">
          <line x1="530" y1="450" x2="600" y2="450" />
          <path d="M585 437 L602 450 L585 463" strokeLinecap="square" strokeLinejoin="miter" />
        </g>

        {/* WORK CONTEXT — document stack, top right */}
        <g style={{ opacity: contextIn }} transform="translate(600 160) scale(0.8)">
          <rect x="0" y="22" width="105" height="130" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="4" />
          <rect x="15" y="7" width="105" height="130" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="4" />
          <rect x="30" y="-8" width="105" height="130" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="4" />
          <rect x="52" y="20" width="55" height="6" fill={LIME} />
          <rect x="52" y="43" width="55" height="5" fill={CHARCOAL} />
          <rect x="52" y="64" width="42" height="5" fill={CHARCOAL} />
          <rect x="52" y="85" width="50" height="5" fill={CHARCOAL} />
          <text x="0" y="205" fill={CHARCOAL} fontFamily="'Public Sans', Arial, sans-serif" fontSize="27" fontWeight={600}>
            YOUR WORK
          </text>
          <text x="0" y="240" fill={CHARCOAL} fontFamily="'Public Sans', Arial, sans-serif" fontSize="23">
            context
          </text>
        </g>

        {/* REUSABLE WORKFLOW — four connected nodes, bottom right */}
        <g style={{ opacity: workflowIn }} transform="translate(600 380) scale(0.8)">
          <rect x="0" y="0" width="62" height="62" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="4" />
          <rect x="118" y="0" width="62" height="62" fill={LIME} stroke={CHARCOAL} strokeWidth="4" />
          <rect x="118" y="112" width="62" height="62" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="4" />
          <rect x="0" y="112" width="62" height="62" fill="#FFFFFF" stroke={CHARCOAL} strokeWidth="4" />

          <line x1="62" y1="31" x2="118" y2="31" stroke={CHARCOAL} strokeWidth="4" />
          <path d="M107 22 L119 31 L107 40" fill="none" stroke={CHARCOAL} strokeWidth="4" />

          <line x1="149" y1="62" x2="149" y2="112" stroke={CHARCOAL} strokeWidth="4" />
          <path d="M140 101 L149 113 L158 101" fill="none" stroke={CHARCOAL} strokeWidth="4" />

          <line x1="118" y1="143" x2="62" y2="143" stroke={CHARCOAL} strokeWidth="4" />
          <path d="M73 134 L61 143 L73 152" fill="none" stroke={CHARCOAL} strokeWidth="4" />

          <line x1="31" y1="112" x2="31" y2="62" stroke={CHARCOAL} strokeWidth="4" />
          <path d="M22 73 L31 61 L40 73" fill="none" stroke={CHARCOAL} strokeWidth="4" />

          <text x="90" y="225" textAnchor="middle" fill={CHARCOAL} fontFamily="'Public Sans', Arial, sans-serif" fontSize="27" fontWeight={600}>
            REUSABLE
          </text>
          <text x="90" y="260" textAnchor="middle" fill={CHARCOAL} fontFamily="'Public Sans', Arial, sans-serif" fontSize="23">
            workflow
          </text>
        </g>
      </svg>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
