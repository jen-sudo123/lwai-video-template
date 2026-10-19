import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../../Logo';

type Props = {
  // Scene-local frame each section reveals. Defaults line up with the VO:
  // "This doesn't mean fully autonomous..." (AI side) / "...work with bounded
  // autonomy" (human side + arrow) / "...approval is required" (Approval) /
  // "...judgment and accountability" (Judgment, Accountability).
  aiFrame?: number;
  humanFrame?: number;
  approvalFrame?: number;
  judgmentFrame?: number;
  accountabilityFrame?: number;
};

const INK = '#23282D';
const LIME = '#85E13A';
const LIME_LIGHT = '#DFF5CF';
const LIME_BG = '#F4FAEF';
const LIME_PILL = '#EAF8DD';

const fadeIn = (frame: number, start: number) =>
  interpolate(frame, [start, start + 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

export const BoundedAutonomyDiagram: React.FC<Props> = ({
  aiFrame = 24,
  humanFrame = 206,
  approvalFrame = 360,
  judgmentFrame = 500,
  accountabilityFrame = 712,
}) => {
  const frame = useCurrentFrame();

  const headerIn = fadeIn(frame, 0);
  const aiIn = fadeIn(frame, aiFrame);
  const humanIn = fadeIn(frame, humanFrame);
  const approvalIn = fadeIn(frame, approvalFrame);
  const judgmentIn = fadeIn(frame, judgmentFrame);
  const accountabilityIn = fadeIn(frame, accountabilityFrame);

  return (
    <AbsoluteFill style={{ backgroundColor: '#FFFFFF' }}>
      <svg viewBox="0 0 1600 1200" width="100%" height="100%" role="img">
        <title>Bounded Autonomy</title>

        {/* Title */}
        <g style={{ opacity: headerIn }}>
          <text x="800" y="150" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="84" fontWeight={700} fill={INK}>
            Bounded Autonomy
          </text>
          <text x="800" y="215" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="32" fontWeight={400} fill={INK}>
            AI acts within boundaries. Humans define the boundaries.
          </text>
        </g>

        {/* ================= AI SIDE ================= */}
        <g style={{ opacity: aiIn }}>
          <rect x="100" y="340" width="820" height="650" rx="34" fill={LIME_BG} stroke={LIME} strokeWidth="6" />

          <rect x="290" y="305" width="440" height="72" rx="36" fill={LIME_PILL} stroke={LIME} strokeWidth="4" />
          <text x="510" y="351" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="34" fontWeight={700} fill={INK}>
            Autonomy Boundary
          </text>

          {/* AI chip */}
          <rect x="445" y="425" width="130" height="130" rx="18" fill={LIME_LIGHT} stroke={INK} strokeWidth="6" />
          <line x1="470" y1="405" x2="470" y2="425" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="500" y1="405" x2="500" y2="425" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="530" y1="405" x2="530" y2="425" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="550" y1="405" x2="550" y2="425" stroke={INK} strokeWidth="6" strokeLinecap="round" />

          <line x1="470" y1="555" x2="470" y2="575" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="500" y1="555" x2="500" y2="575" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="530" y1="555" x2="530" y2="575" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="550" y1="555" x2="550" y2="575" stroke={INK} strokeWidth="6" strokeLinecap="round" />

          <line x1="425" y1="455" x2="445" y2="455" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="425" y1="485" x2="445" y2="485" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="425" y1="515" x2="445" y2="515" stroke={INK} strokeWidth="6" strokeLinecap="round" />

          <line x1="575" y1="455" x2="595" y2="455" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="575" y1="485" x2="595" y2="485" stroke={INK} strokeWidth="6" strokeLinecap="round" />
          <line x1="575" y1="515" x2="595" y2="515" stroke={INK} strokeWidth="6" strokeLinecap="round" />

          <text x="510" y="510" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="54" fontWeight={700} fill={INK}>
            AI
          </text>
          <text x="510" y="625" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="42" fontWeight={700} fill={INK}>
            AI
          </text>

          {/* Use tools */}
          <rect x="145" y="700" width="210" height="210" rx="24" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <path
            d="M225 760 C210 750 190 755 178 768 C166 781 164 800 172 813 L214 855 C222 863 235 863 243 855 L266 832 C274 824 274 811 266 803 L230 767 C229 765 227 762 225 760Z"
            fill={LIME}
            stroke={INK}
            strokeWidth="5"
          />
          <circle cx="196" cy="784" r="10" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <text x="250" y="875" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight={700} fill={INK}>
            Use tools
          </text>

          <path d="M375 805 H405" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <path d="M397 793 L411 805 L397 817" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Analyze */}
          <rect x="420" y="700" width="210" height="210" rx="24" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <rect x="475" y="790" width="24" height="48" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <rect x="510" y="765" width="24" height="73" rx="4" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
          <rect x="545" y="735" width="24" height="103" rx="4" fill={LIME} stroke={INK} strokeWidth="5" />
          <text x="525" y="875" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight={700} fill={INK}>
            Analyze
          </text>

          <path d="M650 805 H680" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <path d="M672 793 L686 805 L672 817" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Draft */}
          <rect x="695" y="700" width="180" height="210" rx="24" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <path d="M760 755 H810 L835 780 V835 H760 Z" fill="#FFFFFF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
          <path d="M810 755 V780 H835" stroke={INK} strokeWidth="5" strokeLinejoin="round" fill="none" />
          <line x1="780" y1="800" x2="815" y2="800" stroke={LIME} strokeWidth="6" strokeLinecap="round" />
          <line x1="780" y1="820" x2="810" y2="820" stroke={LIME} strokeWidth="6" strokeLinecap="round" />
          <text x="785" y="875" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight={700} fill={INK}>
            Draft
          </text>
        </g>

        {/* ================= HANDOFF ARROW + HUMAN SIDE ================= */}
        <g style={{ opacity: humanIn }}>
          <path d="M940 660 H995" stroke={INK} strokeWidth="10" strokeLinecap="round" />
          <path d="M985 640 L1010 660 L985 680" fill="none" stroke={LIME} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />

          <rect x="1035" y="340" width="465" height="650" rx="34" fill="#FFFFFF" stroke={INK} strokeWidth="5" />

          <circle cx="1268" cy="470" r="34" fill="#FFFFFF" stroke={INK} strokeWidth="6" />
          <path d="M1205 560 C1205 515 1230 495 1268 495 C1306 495 1331 515 1331 560" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />

          <line x1="1268" y1="405" x2="1268" y2="380" stroke={LIME} strokeWidth="7" strokeLinecap="round" />
          <line x1="1225" y1="420" x2="1205" y2="400" stroke={LIME} strokeWidth="7" strokeLinecap="round" />
          <line x1="1311" y1="420" x2="1331" y2="400" stroke={LIME} strokeWidth="7" strokeLinecap="round" />

          <text x="1268" y="620" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="42" fontWeight={700} fill={INK}>
            Human
          </text>
        </g>

        {/* Approval */}
        <g style={{ opacity: approvalIn }}>
          <rect x="1085" y="665" width="365" height="88" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <circle cx="1140" cy="709" r="30" fill={LIME} />
          <path d="M1127 709 L1137 720 L1156 698" fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="1205" y="721" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight={700} fill={INK}>
            Approval
          </text>
        </g>

        {/* Judgment */}
        <g style={{ opacity: judgmentIn }}>
          <rect x="1085" y="775" width="365" height="88" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <line x1="1140" y1="796" x2="1140" y2="842" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <line x1="1112" y1="806" x2="1168" y2="806" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <line x1="1122" y1="806" x2="1110" y2="830" stroke={INK} strokeWidth="4" />
          <line x1="1158" y1="806" x2="1170" y2="830" stroke={INK} strokeWidth="4" />
          <path d="M1095 830 H1125 C1123 843 1097 843 1095 830Z" fill={LIME} stroke={INK} strokeWidth="3" />
          <path d="M1155 830 H1185 C1183 843 1157 843 1155 830Z" fill={LIME} stroke={INK} strokeWidth="3" />
          <line x1="1120" y1="842" x2="1160" y2="842" stroke={INK} strokeWidth="5" strokeLinecap="round" />
          <text x="1205" y="831" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight={700} fill={INK}>
            Judgment
          </text>
        </g>

        {/* Accountability */}
        <g style={{ opacity: accountabilityIn }}>
          <rect x="1085" y="885" width="365" height="88" rx="18" fill="#FFFFFF" stroke={INK} strokeWidth="4" />
          <path
            d="M1115 909 L1140 898 L1165 909 V927 C1165 945 1154 958 1140 965 C1126 958 1115 945 1115 927Z"
            fill={LIME_LIGHT}
            stroke={INK}
            strokeWidth="5"
          />
          <path d="M1129 932 L1138 941 L1153 922" fill="none" stroke={LIME} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <text x="1205" y="941" fontFamily="Arial, Helvetica, sans-serif" fontSize="30" fontWeight={700} fill={INK}>
            Accountability
          </text>
        </g>
      </svg>
      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
