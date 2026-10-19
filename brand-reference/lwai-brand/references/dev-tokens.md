# Lead with AI — Developer Tokens Reference

Complete design token system for Lead with AI frontend projects.
Compatible with Tailwind CSS v3 (`tailwind.config.ts`) and v4 (CSS-first `app.css`).
Works with shadcn, shadcn-svelte, and any Tailwind-based component library.

## Google Fonts Import

Add to your HTML `<head>` or CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400&family=Public+Sans:wght@400;600&display=swap');
```

Or as HTML link tags:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400&family=Public+Sans:wght@400;600&display=swap" rel="stylesheet">
```

## Local Font Files

For offline-safe rendering, prefer the bundled local font files in `assets/fonts/`:
- `assets/fonts/IBMPlexSerif-Regular.ttf`
- `assets/fonts/PublicSans-Regular.ttf`
- `assets/fonts/PublicSans-SemiBold.ttf`

Example `@font-face` setup:

```css
@font-face {
  font-family: 'IBM Plex Serif';
  src: url('./assets/fonts/IBMPlexSerif-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: 'Public Sans';
  src: url('./assets/fonts/PublicSans-Regular.ttf') format('truetype');
  font-style: normal;
  font-weight: 400;
}

@font-face {
  font-family: 'Public Sans';
  src: url('./assets/fonts/PublicSans-SemiBold.ttf') format('truetype');
  font-style: normal;
  font-weight: 600;
}
```

Use Google Fonts only when a local font path is not practical.

## Color Palette — Full Ramps

### Neutral Scale

| Token | Hex | Tailwind |
|---|---|---|
| neutral-50 | `#F7F7F7` | `bg-neutral-50` |
| neutral-100 | `#F0F0F0` | `bg-neutral-100` |
| neutral-200 | `#EEEEEE` | `bg-neutral-200` |
| neutral-300 | `#E2E2E2` | `bg-neutral-300` |
| neutral-400 | `#CCCCCC` | `bg-neutral-400` |
| neutral-500 | `#AAAAAA` | `bg-neutral-500` |
| neutral-600 | `#888888` | `bg-neutral-600` |
| neutral-700 | `#666666` | `bg-neutral-700` |
| neutral-800 | `#444444` | `bg-neutral-800` |
| neutral-900 | `#222222` | `bg-neutral-900` |
| neutral-950 | `#111111` | `bg-neutral-950` |

### Lime Scale (Brand Accent)

| Token | Hex | Tailwind |
|---|---|---|
| lime-50 | `#F7FFE9` | `bg-lime-50` |
| lime-100 | `#E9FFCD` | `bg-lime-100` |
| lime-200 | `#D0F8AB` | `bg-lime-200` |
| lime-300 | `#B1F07A` | `bg-lime-300` |
| lime-400 | `#85E13A` | `bg-lime-400` |
| lime-500 | `#66C61C` | `bg-lime-500` |
| lime-600 | `#4EA112` | `bg-lime-600` |
| lime-700 | `#3B7C0C` | `bg-lime-700` |
| lime-800 | `#295708` | `bg-lime-800` |
| lime-900 | `#193704` | `bg-lime-900` |
| lime-950 | `#0F2202` | `bg-lime-950` |

### Core Solids

| Token | Hex |
|---|---|
| black | `#000000` |
| white | `#FFFFFF` |

### Functional

| Token | Hex | Usage |
|---|---|---|
| destructive (light) | `#DC2626` | Error states |
| destructive (dark) | `#EF4444` | Error states in dark mode |

## Type Scale — Minor Third (ratio 1.2)

Override Tailwind's default font sizes with these values:

| Tailwind Class | Size (rem) | Size (px) | Line-height | Usage |
|---|---|---|---|---|
| `text-5xl` | 2.986 | ~47.8 | 1.1 | H1 |
| `text-4xl` | 2.488 | ~39.8 | 1.1 | H2 |
| `text-3xl` | 2.074 | ~33.2 | 1.1 | H3 |
| `text-2xl` | 1.728 | ~27.6 | 1.1 | H4 |
| `text-xl` | 1.44 | ~23.0 | 1.1 | H5 |
| `text-lg` | 1.2 | ~19.2 | 1.1 | H6 |
| `text-base` | 1 | 16 | 1.5 | Body |
| `text-sm` | 0.833 | ~13.3 | 1.5 | Small |
| `text-xs` | 0.694 | ~11.1 | 1.5 | XSmall |

## Font Families

| Tailwind Class | Font Stack |
|---|---|
| `font-serif` | `'IBM Plex Serif', ui-serif, Georgia, 'Times New Roman', Times, serif` |
| `font-sans` | `'Public Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |

**Heading usage:** `font-serif font-normal tracking-[-0.04em] leading-[1.1]`
**Body usage:** `font-sans font-normal leading-[1.5]`
**Emphasis/labels:** `font-sans font-semibold leading-[1.5]`

## Button Specification

```
Primary:   bg-black text-white font-sans font-semibold rounded-full py-2 px-4
           hover:ring-4 hover:ring-black/10 hover:ring-offset-0

Secondary: bg-transparent text-black font-sans font-semibold rounded-full py-2 px-4
           border border-black
           hover:ring-4 hover:ring-black/10 hover:ring-offset-0
```

## Border Radius

Use Tailwind defaults for all elements. Only exception: buttons use `rounded-full`.

---

## Tailwind v4 — SvelteKit `app.css`

Copy this file as your `src/app.css` for a SvelteKit + Tailwind v4 + shadcn-svelte project.

```css
@import 'tailwindcss';
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400&family=Public+Sans:wght@400;600&display=swap');

@custom-variant dark (&:is(.dark *));

:root {
  /* ---- Fonts ---- */
  --font-sans:
    'Public Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: 'IBM Plex Serif', ui-serif, Georgia, 'Times New Roman', Times, serif;

  /* ---- Neutral 50–950 ---- */
  --color-neutral-50: #f7f7f7;
  --color-neutral-100: #f0f0f0;
  --color-neutral-200: #eeeeee;
  --color-neutral-300: #e2e2e2;
  --color-neutral-400: #cccccc;
  --color-neutral-500: #aaaaaa;
  --color-neutral-600: #888888;
  --color-neutral-700: #666666;
  --color-neutral-800: #444444;
  --color-neutral-900: #222222;
  --color-neutral-950: #111111;

  /* ---- Lime 50–950 (brand accent) ---- */
  --color-lime-50: #f7ffe9;
  --color-lime-100: #e9ffcd;
  --color-lime-200: #d0f8ab;
  --color-lime-300: #b1f07a;
  --color-lime-400: #85e13a;
  --color-lime-500: #66c61c;
  --color-lime-600: #4ea112;
  --color-lime-700: #3b7c0c;
  --color-lime-800: #295708;
  --color-lime-900: #193704;
  --color-lime-950: #0f2202;

  /* ---- Core solids ---- */
  --color-black: #000000;
  --color-white: #ffffff;

  /* ---- shadcn semantic tokens (light) ---- */
  --radius: 0.625rem;
  --background: var(--color-white);
  --foreground: var(--color-neutral-900);
  --card: var(--color-white);
  --card-foreground: var(--color-neutral-900);
  --popover: var(--color-white);
  --popover-foreground: var(--color-neutral-900);
  --primary: var(--color-lime-500);
  --primary-foreground: var(--color-white);
  --secondary: var(--color-neutral-100);
  --secondary-foreground: var(--color-neutral-900);
  --muted: var(--color-neutral-100);
  --muted-foreground: var(--color-neutral-600);
  --accent: var(--color-lime-200);
  --accent-foreground: var(--color-neutral-900);
  --destructive: #dc2626;
  --border: var(--color-neutral-200);
  --input: var(--color-neutral-200);
  --ring: var(--color-lime-500);
  --chart-1: var(--color-lime-500);
  --chart-2: var(--color-lime-400);
  --chart-3: var(--color-lime-600);
  --chart-4: var(--color-lime-300);
  --chart-5: var(--color-lime-700);
  --sidebar: var(--color-white);
  --sidebar-foreground: var(--color-neutral-900);
  --sidebar-primary: var(--color-lime-500);
  --sidebar-primary-foreground: var(--color-white);
  --sidebar-accent: var(--color-neutral-100);
  --sidebar-accent-foreground: var(--color-neutral-900);
  --sidebar-border: var(--color-neutral-200);
  --sidebar-ring: var(--color-lime-500);
}

.dark {
  --background: var(--color-neutral-950);
  --foreground: var(--color-neutral-100);
  --card: var(--color-neutral-900);
  --card-foreground: var(--color-neutral-100);
  --popover: var(--color-neutral-900);
  --popover-foreground: var(--color-neutral-100);
  --primary: var(--color-lime-400);
  --primary-foreground: var(--color-neutral-950);
  --secondary: var(--color-neutral-800);
  --secondary-foreground: var(--color-neutral-100);
  --muted: var(--color-neutral-800);
  --muted-foreground: var(--color-neutral-400);
  --accent: var(--color-lime-600);
  --accent-foreground: var(--color-neutral-100);
  --destructive: #ef4444;
  --border: var(--color-neutral-800);
  --input: var(--color-neutral-800);
  --ring: var(--color-lime-400);
  --chart-1: var(--color-lime-400);
  --chart-2: var(--color-lime-300);
  --chart-3: var(--color-lime-500);
  --chart-4: var(--color-lime-600);
  --chart-5: var(--color-lime-700);
  --sidebar: var(--color-neutral-900);
  --sidebar-foreground: var(--color-neutral-100);
  --sidebar-primary: var(--color-lime-400);
  --sidebar-primary-foreground: var(--color-neutral-950);
  --sidebar-accent: var(--color-neutral-800);
  --sidebar-accent-foreground: var(--color-neutral-100);
  --sidebar-border: var(--color-neutral-800);
  --sidebar-ring: var(--color-lime-400);
}

@theme inline {
  /* fonts */
  --font-sans: var(--font-sans);
  --font-serif: var(--font-serif);

  /* type scale — Minor Third 1.2 */
  --text-xs: 0.694rem;
  --text-xs--line-height: 1.5;
  --text-sm: 0.833rem;
  --text-sm--line-height: 1.5;
  --text-base: 1rem;
  --text-base--line-height: 1.5;
  --text-lg: 1.2rem;
  --text-lg--line-height: 1.1;
  --text-xl: 1.44rem;
  --text-xl--line-height: 1.1;
  --text-2xl: 1.728rem;
  --text-2xl--line-height: 1.1;
  --text-3xl: 2.074rem;
  --text-3xl--line-height: 1.1;
  --text-4xl: 2.488rem;
  --text-4xl--line-height: 1.1;
  --text-5xl: 2.986rem;
  --text-5xl--line-height: 1.1;

  /* radii — Tailwind defaults, override only base */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);

  /* semantic colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* neutral ramp */
  --color-neutral-50: var(--color-neutral-50);
  --color-neutral-100: var(--color-neutral-100);
  --color-neutral-200: var(--color-neutral-200);
  --color-neutral-300: var(--color-neutral-300);
  --color-neutral-400: var(--color-neutral-400);
  --color-neutral-500: var(--color-neutral-500);
  --color-neutral-600: var(--color-neutral-600);
  --color-neutral-700: var(--color-neutral-700);
  --color-neutral-800: var(--color-neutral-800);
  --color-neutral-900: var(--color-neutral-900);
  --color-neutral-950: var(--color-neutral-950);

  /* lime ramp */
  --color-lime-50: var(--color-lime-50);
  --color-lime-100: var(--color-lime-100);
  --color-lime-200: var(--color-lime-200);
  --color-lime-300: var(--color-lime-300);
  --color-lime-400: var(--color-lime-400);
  --color-lime-500: var(--color-lime-500);
  --color-lime-600: var(--color-lime-600);
  --color-lime-700: var(--color-lime-700);
  --color-lime-800: var(--color-lime-800);
  --color-lime-900: var(--color-lime-900);
  --color-lime-950: var(--color-lime-950);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground font-sans;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif font-normal tracking-[-0.04em] leading-[1.1];
  }
  h1 { @apply text-5xl; }
  h2 { @apply text-4xl; }
  h3 { @apply text-3xl; }
  h4 { @apply text-2xl; }
  h5 { @apply text-xl; }
  h6 { @apply text-lg; }
}
```

---

## Tailwind v3 — `tailwind.config.ts`

For Next.js, Astro, or other Tailwind v3 projects:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Public Sans',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'sans-serif',
      ],
      serif: [
        'IBM Plex Serif',
        'ui-serif',
        'Georgia',
        'Times New Roman',
        'Times',
        'serif',
      ],
    },
    fontSize: {
      xs: ['0.694rem', { lineHeight: '1.5' }],
      sm: ['0.833rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.5' }],
      lg: ['1.2rem', { lineHeight: '1.1' }],
      xl: ['1.44rem', { lineHeight: '1.1' }],
      '2xl': ['1.728rem', { lineHeight: '1.1' }],
      '3xl': ['2.074rem', { lineHeight: '1.1' }],
      '4xl': ['2.488rem', { lineHeight: '1.1' }],
      '5xl': ['2.986rem', { lineHeight: '1.1' }],
    },
    extend: {
      colors: {
        neutral: {
          50: '#f7f7f7',
          100: '#f0f0f0',
          200: '#eeeeee',
          300: '#e2e2e2',
          400: '#cccccc',
          500: '#aaaaaa',
          600: '#888888',
          700: '#666666',
          800: '#444444',
          900: '#222222',
          950: '#111111',
        },
        lime: {
          50: '#f7ffe9',
          100: '#e9ffcd',
          200: '#d0f8ab',
          300: '#b1f07a',
          400: '#85e13a',
          500: '#66c61c',
          600: '#4ea112',
          700: '#3b7c0c',
          800: '#295708',
          900: '#193704',
          950: '#0f2202',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      letterSpacing: {
        'heading': '-0.04em',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

**Note for shadcn v3 projects:** You will also need a CSS file that defines the `--border`, `--primary`, etc. CSS variables. Copy the `:root` and `.dark` blocks from the Tailwind v4 `app.css` above into your global CSS file, but convert the raw hex values to HSL format as shadcn v3 expects.

---

## Icons — Lucide

Install via npm for your framework:

```bash
# SvelteKit
npm install lucide-svelte

# React / Next.js
npm install lucide-react

# Vue
npm install lucide-vue-next
```

Or load via CDN for quick prototypes:

```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>
```

Usage rules:
- Stroke weight: Lucide default (2px) — do not modify
- Color: `text-black` (default) or `text-lime-500` (accent)
- No filled variants — stroke only
