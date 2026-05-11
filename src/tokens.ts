// Brand tokens — single source of truth for LWAI video template
// Mirrors the lwai-brand skill: white background, IBM Plex Serif headings,
// Public Sans body, lime accent, 50px safe margin scaled to 1080p.

export const colors = {
  // Core 6 LWAI palette
  black: '#000000',
  white: '#FFFFFF',
  lime500: '#66C61C',
  lime200: '#D0F8AB',
  neutral600: '#888888',
  neutral200: '#EEEEEE',

  // Title-card-only (Image 1 style)
  titleGreen: '#3F7A1F',
  titleYellow: '#E8C547',
} as const;

export const fonts = {
  serif: 'IBM Plex Serif',
  sans: 'Public Sans',
} as const;

// Type scale for editorial slides (1920x1080 canvas)
// Larger than web scale because video is viewed from a distance
export const typography = {
  hero: {
    fontFamily: fonts.serif,
    fontSize: 96,
    fontWeight: 400,
    letterSpacing: '-0.04em',
    lineHeight: 1.1,
  },
  title: {
    fontFamily: fonts.serif,
    fontSize: 72,
    fontWeight: 400,
    letterSpacing: '-0.04em',
    lineHeight: 1.15,
  },
  subtitle: {
    fontFamily: fonts.serif,
    fontSize: 56,
    fontWeight: 400,
    letterSpacing: '-0.04em',
    lineHeight: 1.2,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 36,
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: 28,
    fontWeight: 400,
    lineHeight: 1.4,
  },
  label: {
    fontFamily: fonts.sans,
    fontSize: 22,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    color: colors.neutral600,
  },
  source: {
    fontFamily: fonts.sans,
    fontSize: 22,
    fontWeight: 400,
    color: colors.neutral600,
    fontStyle: 'italic' as const,
  },
} as const;

// Canvas + safe area
export const layout = {
  width: 1920,
  height: 1080,
  safeMargin: 80, // scaled from brand's 50px on a smaller canvas; comfortable for 1080p video
  fps: 30,
} as const;
