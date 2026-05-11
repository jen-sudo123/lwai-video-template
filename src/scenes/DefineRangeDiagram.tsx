import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { LogoFooter } from '../Logo';

type Props = {
  modelAppearFrame?: number;
};

export const DefineRangeDiagram: React.FC<Props> = ({ modelAppearFrame = 80 }) => {
  const frame = useCurrentFrame();

  const outerOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const modelOpacity = interpolate(frame, [modelAppearFrame, modelAppearFrame + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        width="1700"
        viewBox="0 0 1648 928"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="1648" height="928" fill="white" />

        {/* Direction A/B cards + horizontal line — appear first */}
        <g opacity={outerOpacity}>
          {/* Direction A card */}
          <rect x="99" y="287" width="306" height="351" rx="20" fill="white" stroke="#1E242B" strokeWidth="5" />
          <text x="252" y="372" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#171C22">Direction A</text>
          <path d="M177 483 H312" stroke="#1E242B" strokeWidth="7" strokeLinecap="round" />
          <path d="M271 443 L312 483 L271 523" stroke="#1E242B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          {/* Direction B card */}
          <rect x="1252" y="287" width="296" height="351" rx="20" fill="white" stroke="#1E242B" strokeWidth="5" />
          <text x="1400" y="372" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="700" fill="#171C22">Direction B</text>
          <path d="M1358 533 L1448 443" stroke="#1E242B" strokeWidth="7" strokeLinecap="round" />
          <path d="M1397 443 H1448 V496" stroke="#1E242B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />

          {/* Green dotted horizontal line */}
          <line x1="405" y1="467" x2="1252" y2="467" stroke="#56D900" strokeWidth="4" strokeDasharray="1 14" strokeLinecap="round" />
        </g>

        {/* Entire center cluster — appears together later */}
        <g opacity={modelOpacity}>
          {/* Large dotted arc */}
          <path d="M571 467 C571 313 674 219 825 219 C976 219 1081 313 1081 467" stroke="#56D900" strokeWidth="4" strokeDasharray="1 14" strokeLinecap="round" />

          {/* New angle circle */}
          <circle cx="826" cy="252" r="75" fill="white" stroke="#56D900" strokeWidth="4" />
          <text x="826" y="242" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fill="#171C22">new</text>
          <text x="826" y="282" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fill="#171C22">angle</text>
          <line x1="826" y1="327" x2="826" y2="376" stroke="#56D900" strokeWidth="4" strokeDasharray="1 12" strokeLinecap="round" />

          {/* Fresh hook circle */}
          <circle cx="582" cy="609" r="76" fill="white" stroke="#56D900" strokeWidth="4" />
          <text x="582" y="601" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fill="#171C22">fresh</text>
          <text x="582" y="641" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fill="#171C22">hook</text>
          <line x1="660" y1="575" x2="741" y2="526" stroke="#56D900" strokeWidth="4" strokeDasharray="1 12" strokeLinecap="round" />

          {/* Surprising idea circle */}
          <circle cx="1065" cy="609" r="76" fill="white" stroke="#56D900" strokeWidth="4" />
          <text x="1065" y="601" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fill="#171C22">surprising</text>
          <text x="1065" y="641" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="30" fill="#171C22">idea</text>
          <line x1="988" y1="575" x2="909" y2="526" stroke="#56D900" strokeWidth="4" strokeDasharray="1 12" strokeLinecap="round" />

          {/* Model circle */}
          <circle cx="825" cy="467" r="91" fill="#5BE000" />
          <text x="825" y="486" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="700" fill="#17202A">Model</text>
        </g>
      </svg>

      <LogoFooter variant="dark" />
    </AbsoluteFill>
  );
};
