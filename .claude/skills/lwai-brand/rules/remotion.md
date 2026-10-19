---
name: lwai-remotion
description: LWAI brand system implementation guide for Remotion video compositions
metadata:
  tags: remotion, lwai, brand, animation, video
---

# LWAI Brand — Remotion Implementation Guide

Use this file whenever building Remotion video compositions that must look unmistakably Lead with AI.
Read the parent `README.md` first for brand rules. This file covers only the Remotion-specific implementation.

## Font Setup

LWAI requires IBM Plex Serif (headings) and Public Sans (body/labels).
Load both from Google Fonts using `@remotion/google-fonts`.

```tsx
import { loadFont as loadIBMPlexSerif } from "@remotion/google-fonts/IBMPlexSerif";
import { loadFont as loadPublicSans } from "@remotion/google-fonts/PublicSans";

const { fontFamily: ibmPlexSerif } = loadIBMPlexSerif();
const { fontFamily: publicSans } = loadPublicSans();
```

Call both at module level (outside the component) so fonts are loaded before rendering starts.
Never rely on system fallbacks — if either font fails to render, the asset is off-brand.

## Brand Tokens

Define tokens as constants. Do not hardcode hex values inside components.

```tsx
// src/lwai/tokens.ts
export const LWAI = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",
    lime500: "#66C61C",
    lime200: "#D0F8AB",
    neutral600: "#888888",
    neutral200: "#EEEEEE",
  },
  // Safe margin in pixels — matches the 50px brand rule
  safeMargin: 50,
  // Logo clearspace = 1x logo icon height
  logoClearspace: 32,
  // Minimum logo icon height
  logoMinHeight: 32,
} as const;
```

## Layer Order (Z-Index)

Map the LWAI protected layer model to explicit z-index values:

```tsx
export const LAYERS = {
  background: 0,   // pure white base
  accent: 10,      // bars, quote marks, graphic punctuation
  subjectImage: 20, // portrait or org mark
  content: 30,     // headline, quote, subhead, attribution
  brand: 40,       // LWAI logo — always top-protected
} as const;
```

Always apply these when using `AbsoluteFill` children with `style={{ zIndex }}`.

## Composition Sizes

| Name | Width | Height | Use |
|---|---|---|---|
| `Square` | 1080 | 1080 | LinkedIn cards, social cards, ads |
| `Landscape` | 1920 | 1080 | Slides, banners, thumbnails |
| `Portrait` | 1080 | 1350 | Instagram/LinkedIn carousels |
| `Vertical` | 1080 | 1920 | Reels, Shorts, vertical ads |

Register in `src/Root.tsx`:

```tsx
import { Composition } from "remotion";
import { QuoteCard } from "./compositions/QuoteCard";
import { Slide } from "./compositions/Slide";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="LWAIQuoteCard"
        component={QuoteCard}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1080}
      />
      <Composition
        id="LWAISlide"
        component={Slide}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

## Base Layout Component

Wrap every composition in a base layout that enforces white background and safe margin:

```tsx
// src/lwai/LWAIFrame.tsx
import { AbsoluteFill } from "remotion";
import { LWAI, LAYERS } from "./tokens";

type LWAIFrameProps = {
  children: React.ReactNode;
  logo?: React.ReactNode; // pass <LWAILogo /> here
};

export const LWAIFrame = ({ children, logo }: LWAIFrameProps) => {
  return (
    <AbsoluteFill style={{ backgroundColor: LWAI.colors.white }}>
      {/* background layer - white is default, override here if needed */}
      <AbsoluteFill style={{ zIndex: LAYERS.background }} />

      {/* content layers passed by composition */}
      {children}

      {/* brand layer - always on top */}
      {logo && (
        <div
          style={{
            position: "absolute",
            bottom: LWAI.safeMargin,
            left: LWAI.safeMargin,
            zIndex: LAYERS.brand,
          }}
        >
          {logo}
        </div>
      )}
    </AbsoluteFill>
  );
};
```

## Logo Component

Place logo SVG in `public/logo-wordmark.svg` and reference via `staticFile()`:

```tsx
// src/lwai/LWAILogo.tsx
import { Img, staticFile } from "remotion";
import { LWAI } from "./tokens";

type LWAILogoProps = {
  height?: number;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
};

export const LWAILogo = ({ height = 32, position = "bottom-left" }: LWAILogoProps) => {
  const positionStyle: React.CSSProperties =
    position === "bottom-left"
      ? { bottom: LWAI.safeMargin, left: LWAI.safeMargin }
      : position === "bottom-right"
      ? { bottom: LWAI.safeMargin, right: LWAI.safeMargin }
      : position === "top-left"
      ? { top: LWAI.safeMargin, left: LWAI.safeMargin }
      : { top: LWAI.safeMargin, right: LWAI.safeMargin };

  return (
    <div
      style={{
        position: "absolute",
        ...positionStyle,
        zIndex: LAYERS.brand,
        padding: LWAI.logoClearspace, // enforce clearspace
      }}
    >
      <Img
        src={staticFile("logo-wordmark.svg")}
        style={{ height, width: "auto" }}
      />
    </div>
  );
};
```

## Typography Components

```tsx
// src/lwai/Typography.tsx
import { loadFont as loadIBMPlexSerif } from "@remotion/google-fonts/IBMPlexSerif";
import { loadFont as loadPublicSans } from "@remotion/google-fonts/PublicSans";
import { LWAI } from "./tokens";

const { fontFamily: ibmPlexSerif } = loadIBMPlexSerif();
const { fontFamily: publicSans } = loadPublicSans();

// IBM Plex Serif — headings, quotes, display
export const Heading = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      fontFamily: ibmPlexSerif,
      fontWeight: 400,
      letterSpacing: "-0.04em",
      lineHeight: 1.1,
      color: LWAI.colors.black,
      ...style,
    }}
  >
    {children}
  </div>
);

// Public Sans — body, captions
export const Body = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      fontFamily: publicSans,
      fontWeight: 400,
      lineHeight: 1.5,
      color: LWAI.colors.black,
      ...style,
    }}
  >
    {children}
  </div>
);

// Public Sans semibold — labels, emphasis
export const Label = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      fontFamily: publicSans,
      fontWeight: 600,
      lineHeight: 1.5,
      color: LWAI.colors.black,
      ...style,
    }}
  >
    {children}
  </div>
);
```

## Quote Card Composition (1080x1080)

```tsx
// src/compositions/QuoteCard.tsx
import { AbsoluteFill, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont as loadIBMPlexSerif } from "@remotion/google-fonts/IBMPlexSerif";
import { loadFont as loadPublicSans } from "@remotion/google-fonts/PublicSans";
import { LWAI, LAYERS } from "../lwai/tokens";
import { LWAIFrame } from "../lwai/LWAIFrame";
import { LWAILogo } from "../lwai/LWAILogo";

const { fontFamily: ibmPlexSerif } = loadIBMPlexSerif();
const { fontFamily: publicSans } = loadPublicSans();

type QuoteCardProps = {
  quote: string;
  attribution: string;
  role?: string;
};

export const QuoteCard = ({ quote, attribution, role }: QuoteCardProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Quote fades and slides up
  const quoteOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const quoteY = interpolate(frame, [0, 20], [24, 0], { extrapolateRight: "clamp" });

  // Attribution follows 10 frames later
  const attrOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp" });

  const safe = LWAI.safeMargin;

  return (
    <LWAIFrame logo={<LWAILogo height={32} position="bottom-left" />}>
      {/* Accent — lime bar top-left */}
      <div
        style={{
          position: "absolute",
          top: safe,
          left: safe,
          width: 4,
          height: 40,
          backgroundColor: LWAI.colors.lime500,
          zIndex: LAYERS.accent,
        }}
      />

      {/* Quote block — content layer */}
      <AbsoluteFill
        style={{
          zIndex: LAYERS.content,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: safe + 16,
        }}
      >
        <div
          style={{
            fontFamily: ibmPlexSerif,
            fontWeight: 400,
            fontSize: 52,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            color: LWAI.colors.black,
            maxWidth: "80%",
            opacity: quoteOpacity,
            transform: `translateY(${quoteY}px)`,
          }}
        >
          {quote}
        </div>

        <div
          style={{
            marginTop: 32,
            opacity: attrOpacity,
          }}
        >
          <div
            style={{
              fontFamily: publicSans,
              fontWeight: 600,
              fontSize: 18,
              color: LWAI.colors.black,
            }}
          >
            {attribution}
          </div>
          {role && (
            <div
              style={{
                fontFamily: publicSans,
                fontWeight: 400,
                fontSize: 16,
                color: LWAI.colors.neutral600,
                marginTop: 4,
              }}
            >
              {role}
            </div>
          )}
        </div>
      </AbsoluteFill>
    </LWAIFrame>
  );
};
```

## Slide Composition (1920x1080)

```tsx
// src/compositions/Slide.tsx
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { loadFont as loadIBMPlexSerif } from "@remotion/google-fonts/IBMPlexSerif";
import { loadFont as loadPublicSans } from "@remotion/google-fonts/PublicSans";
import { LWAI, LAYERS } from "../lwai/tokens";
import { LWAIFrame } from "../lwai/LWAIFrame";
import { LWAILogo } from "../lwai/LWAILogo";

const { fontFamily: ibmPlexSerif } = loadIBMPlexSerif();
const { fontFamily: publicSans } = loadPublicSans();

type SlideProps = {
  label?: string;
  headline: string;
  body?: string;
};

export const Slide = ({ label, headline, body }: SlideProps) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: "clamp" });

  const safe = LWAI.safeMargin;

  return (
    <LWAIFrame logo={<LWAILogo height={32} position="bottom-right" />}>
      {/* Bottom lime accent bar */}
      <div
        style={{
          position: "absolute",
          bottom: safe + 60,
          left: safe,
          right: safe,
          height: 2,
          backgroundColor: LWAI.colors.neutral200,
          zIndex: LAYERS.accent,
        }}
      />

      <AbsoluteFill
        style={{
          zIndex: LAYERS.content,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: safe + 40,
          opacity,
          transform: `translateY(${y}px)`,
        }}
      >
        {label && (
          <div
            style={{
              fontFamily: publicSans,
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: LWAI.colors.lime500,
              marginBottom: 24,
            }}
          >
            {label}
          </div>
        )}
        <div
          style={{
            fontFamily: ibmPlexSerif,
            fontWeight: 400,
            fontSize: 80,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: LWAI.colors.black,
            maxWidth: "70%",
          }}
        >
          {headline}
        </div>
        {body && (
          <div
            style={{
              fontFamily: publicSans,
              fontWeight: 400,
              fontSize: 24,
              lineHeight: 1.5,
              color: LWAI.colors.neutral600,
              maxWidth: "55%",
              marginTop: 32,
            }}
          >
            {body}
          </div>
        )}
      </AbsoluteFill>
    </LWAIFrame>
  );
};
```

## Animation Conventions

LWAI motion should feel editorial — deliberate, not decorative.

- **Entrance**: fade-up (opacity 0→1 + translateY 20→0px), 15–20 frames
- **Stagger**: each text block enters 10 frames after the previous
- **Duration**: default 150 frames at 30fps = 5 seconds for a card
- **No bounce**: avoid spring animations with high stiffness/overshoot for text
- **No decorative motion**: elements should enter once and hold — no looping pulse or float
- **Accent color motion**: a lime bar can grow in width (scaleX 0→1) over 10 frames — acceptable

```tsx
// Staggered entrance pattern
const block1Opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
const block2Opacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });
const block3Opacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp" });
```

## Checklist Before Rendering

- [ ] IBM Plex Serif is loaded and rendering (no system fallback)
- [ ] Public Sans is loaded and rendering
- [ ] Background is pure white — no gradient
- [ ] All content stays within the 50px safe margin
- [ ] LWAI logo is present and uncovered
- [ ] Logo clearspace is intact (nothing within 1x icon height)
- [ ] Colors are from the Core 6 palette only
- [ ] Accent elements support hierarchy — they do not decorate for decoration's sake
- [ ] Quote text uses IBM Plex Serif at a dominant size
- [ ] Attribution and labels use Public Sans
- [ ] Layer z-index follows: background < accent < subjectImage < content < brand

## Installing Required Packages

```bash
npm install @remotion/google-fonts
```

If using logo from `public/`, no extra packages needed — `staticFile()` is built into Remotion.
