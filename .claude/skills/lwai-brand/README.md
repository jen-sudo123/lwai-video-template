---
name: lwai-brand
description: >
  Lead with AI (LWAI) brand system for creating branded editorial graphics, social assets,
  presentation visuals, and frontend theme files. Route each request into either
  editorial-graphic mode or ui-theme mode, and add research-enrichment when named people
  or companies are central to the content. Use this skill for LinkedIn cards, quote cards,
  slides, thumbnails, banners, ads, carousels, insight cards, branded graphics, LWAI theme
  setup, or any request that should look unmistakably Lead with AI.
---

# Lead with AI - Brand Visual System

This skill is the single LWAI brand system.

Use it for two kinds of work:
- branded editorial graphics
- frontend theme setup
Do not treat those as the same design problem.

Editorial graphics need composition, hierarchy, and protected overlap rules.
Frontend theme work needs tokens, type, and component styling.

## Quick Start

Before generating anything, route the task first.

| Task | Mode | Read |
|---|---|---|
| LinkedIn card, quote card, slide, banner, thumbnail, ad, carousel, branded graphic | `editorial-graphic` | This file -> `references/design-rules.md` -> `references/editorial-composition.md` -> `references/svg-output-workflow.md` -> `assets/` |
| Tailwind, shadcn, shadcn-svelte, SvelteKit, Next.js, frontend theme setup | `ui-theme` | This file -> `references/dev-tokens.md` |
| Remotion video, animated video, motion graphic, video composition | `remotion-video` | This file -> `rules/remotion.md` |
| Need the logo SVG | n/a | `assets/logo-wordmark.svg` or `assets/logo-icon.svg` |
| Need bundled brand fonts | n/a | `assets/fonts/` |
| Need a starter HTML template | n/a | `assets/templates/text-led-editorial-card.html` |
| Named person or company is central to the piece | `research-enrichment` | This file -> apply the research rules below |

## Task Routing

Always decide the mode before doing design work.

### `editorial-graphic`

Use this mode for:
- social cards
- testimonial cards
- quote cards
- company thought-leadership posts
- company announcement cards
- presentation slides
- video thumbnails
- banners
- ads
- carousels
- email headers
- any static branded composition
Default assumption:
- this is an editorial composition problem, not a UI problem
Do not import generic UI habits into this mode:
- no dashboard card thinking
- no app shell thinking
- no "component grid" composition
- no decorative UI chrome

### `remotion-video`

Use this mode for:
- animated video compositions
- motion graphics
- video slideshows
- animated quote cards
- animated thumbnails
- any Remotion-based output
Load `rules/remotion.md` for the full Remotion + LWAI brand implementation guide.

### `ui-theme`

Use this mode for:
- theme tokens
- Tailwind config
- shadcn or shadcn-svelte setup
- app typography
- frontend color system
- component styling rules
Default assumption:
- this is a token and system problem, not a poster-layout problem
Do not force editorial overlap rules into frontend code unless the user is building a real marketing surface that needs them.

### `research-enrichment`

Layer this behavior on top of either main mode when a named person, company, school, or institution is a main subject.

Examples:
- testimonial card with a named speaker
- feature card about a company
- announcement card for a school or organization
- profile-led graphic where a portrait matters
If the named entity is not central, skip enrichment and keep the design text-led.

## Workflow

### 1. Route the task

Pick `editorial-graphic`, `remotion-video`, or `ui-theme` first.

### 2. Load the right references

For `editorial-graphic`:
- read `references/design-rules.md`
- read `references/editorial-composition.md`
- read `references/svg-output-workflow.md`
- use `assets/logo-wordmark.svg` unless space is truly constrained
- use bundled fonts from `assets/fonts/` before any network font URL
- start from `assets/templates/text-led-editorial-card.html` when the asset is a text-led company post or announcement
For `remotion-video`:
- read `rules/remotion.md`
For `ui-theme`:
- read `references/dev-tokens.md`

### 3. Decide whether enrichment is needed

If a named person or organization is central, apply `research-enrichment`.

### 4. Build with the correct design logic

For editorial graphics:
- make the main idea visually dominant
- in this environment, prefer HTML/CSS rendered in Chromium via Playwright for the final export
- never use CairoSVG for final branded assets that depend on local or embedded fonts
- use SVG only as an optional working master when it helps the layout process
- if the asset is a company post, keep at least one clear IBM Plex Serif display block
- keep long paragraph copy in Public Sans unless the piece is explicitly a quote card
- render a draft and inspect it before final export
- if the draft looks wrong, revise the asset instead of explaining the defect away
- export PNG as the final delivery format unless the brief asks for something else
- protect the logo area
- use layers intentionally
- allow overlap only when the overlap improves hierarchy
For UI theme work:
- stay systematic
- use the token file as the source of truth
- prefer bundled local font files when offline reliability matters

## Research And Enrichment

When a person or organization is central to the content, proactively look for supporting assets.

### Person-first enrichment

When a named person is a main subject:
- look for an official or high-confidence portrait or avatar
- start with image-first search when the name is likely discoverable there
- prefer official profile pages, official press pages, official LinkedIn pages, or institutional profile pages
- verify that the image actually belongs to the named person before using it
- if more than one image appears, choose the one that most clearly matches the named person and role
- if a high-confidence portrait is found and the layout has room for it, display it
- do not silently omit a strong portrait after sourcing it unless the composition is clearly stronger without it

### Organization-first enrichment

When a company, school, or institution is central:
- look for an official logo
- prefer SVG when available
- prefer official site assets, official press kits, or official LinkedIn company pages

### Source priority

Use this order:
1. Official website
2. Official press or media page
3. Official LinkedIn page
4. Other high-confidence source only if the asset is clearly the same and looks clean
Avoid random third-party logo sites as the first choice.

### Relevance checks

Before using a sourced asset, confirm:
- the person image matches the named person
- the logo matches the named organization
- the asset improves the composition instead of filling empty space
- the asset can be placed without violating the logo safe zone
- the asset does not cover or weaken the readability of the main quote or headline

### Fallback behavior

If no high-confidence portrait or logo is found:
- keep the design text-first
- do not guess
- do not force a weak asset into the piece
- do not create initials, silhouette, or monogram placeholders unless the user explicitly asks for one
Strong typography is better than weak enrichment.
If a strong portrait or logo is found, use it intentionally rather than dropping it without explanation.

## Brand Identity - Essentials

Lead with AI is editorial, authoritative, minimalist, and typographic.

Every asset should feel:
- confident
- clear
- restrained
- intelligent
When in doubt:
- less is more
- typography does most of the work
- accents support hierarchy, they do not replace it

### Core 6 Palette

Use these six colors for design assets.

| Name | Hex | Tailwind | Usage |
|---|---|---|---|
| Black | `#000000` | `text-black` / `bg-black` | Headings, body text, primary buttons |
| White | `#FFFFFF` | `text-white` / `bg-white` | Backgrounds |
| Lime 500 | `#66C61C` | `text-lime-500` / `bg-lime-500` | Accent only |
| Lime 200 | `#D0F8AB` | `text-lime-200` / `bg-lime-200` | Light accent only |
| Neutral 600 | `#888888` | `text-neutral-600` | Secondary text |
| Neutral 200 | `#EEEEEE` | `border-neutral-200` | Dividers and structure |

Rule:
- when in doubt, use only black + white + lime-500

### Typography

| Role | Font | Weight | Letter-spacing | Line-height |
|---|---|---|---|---|
| Headings | IBM Plex Serif | 400 | `-0.04em` | 1.1 |
| Body, UI, captions | Public Sans | 400 | normal | 1.5 |
| Labels, buttons, emphasis | Public Sans | 600 | normal | 1.5 |

No other fonts.
No other weights.

Typography map:
- company thought-leadership card: label in Public Sans 600, hero headline in IBM Plex Serif, paragraphs in Public Sans, optional closing kicker in IBM Plex Serif
- testimonial card: quote in IBM Plex Serif, attribution in Public Sans
- announcement card: label in Public Sans 600, main announcement line in IBM Plex Serif, supporting details in Public Sans

### Web Type Scale

This scale is for `ui-theme` work only.

| Level | Size | Tailwind class |
|---|---|---|
| H1 | 2.986rem | `text-5xl` |
| H2 | 2.488rem | `text-4xl` |
| H3 | 2.074rem | `text-3xl` |
| H4 | 1.728rem | `text-2xl` |
| H5 | 1.44rem | `text-xl` |
| H6 | 1.2rem | `text-lg` |
| Body | 1rem | `text-base` |
| Small | 0.833rem | `text-sm` |
| XSmall | 0.694rem | `text-xs` |

### Logo

Always prefer the full wordmark.

| Variant | File | When to use |
|---|---|---|
| Wordmark | `assets/logo-wordmark.svg` | Default for all assets |
| Icon only | `assets/logo-icon.svg` | Favicon or severe space constraint only |

Placement rules:
- default position: bottom-left or bottom-right
- top-left or top-right are allowed when the composition clearly needs them
- if the logo sits on the left edge, left-align the wordmark to that edge
- if the logo sits on the right edge, right-align the wordmark to that edge
- never float the logo loosely inside the canvas
- minimum icon height: 32px
- clearspace: 1x the icon height on all sides
- nothing enters this clearspace
The logo icon gradient is fixed:
- `#85E13A` -> `#D0F8AB`
Do not alter it.

## Protected Layer Model

Editorial graphics must use this layer order:

1. `background`
2. `accent`
3. `subject-image`
4. `content`
5. `brand`
Interpret each layer like a z-layer:
- `background`: pure white base only
- `accent`: bars, quote marks, simple graphic punctuation
- `subject-image`: portrait or organization mark when used
- `content`: headline, quote, subhead, attribution
- `brand`: LWAI logo and its protected clearspace

Hard rules:
- `brand` is always top-protected
- nothing may overlap the LWAI logo
- nothing may invade the LWAI logo clearspace
- `content` may overlap `subject-image` only when readability stays strong
- `accent` may sit behind `content` or `subject-image`
- `subject-image` may not cover text that carries the main message
If overlap does not improve hierarchy, remove the overlap.

## Quote And Testimonial Card Rules

For quote cards, the quote is the hero.

Default behavior:
- make the quote visually dominant
- widen the text block until it owns the composition
- shape the line breaks intentionally
- keep the full quote in one consistent font family
- keep the full quote in one consistent font size unless the brief explicitly asks for emphasis inside the quote

Occupancy targets:
- the main quote block should usually span about 65% to 85% of the usable width
- the quote should visually own the canvas before metadata or accents are placed
- whitespace should feel chosen, not leftover

## Self-Critique Checklist

Before finalizing an editorial graphic, ask:
- Is the main text dominant enough?
- Is the hierarchy obvious at a glance?
- Are overlaps intentional and compliant with the layer rules?
- Is the LWAI logo protected and visually calm?
- If a portrait or logo was sourced, does it improve the piece?
- Does the result feel like an editorial asset instead of a web UI card?
- Is the full quote using one consistent brand font treatment?
- Is every edge respecting the 50px safe margin?
- If a high-confidence avatar was found, was it either used intentionally or rejected for a clear composition reason?
If the answer to any of those is no, revise before finalizing.

## Asset Templates

All assets use a solid white background.

Universal margin:
- 50px on all sides
- no text, image, divider, quote mark, or logo may cross this safe area
Default output:
- if the user does not specify a format, output PNG
- only use another format when the user explicitly asks for it or the task inherently requires it

| Format | Dimensions | Use cases |
|---|---|---|
| 16:9 | 1920 x 1080 | Slides, video frames, banners, email headers, thumbnails |
| 1:1 | 1080 x 1080 | LinkedIn cards, social cards, ads |
| 4:5 | 1080 x 1350 | Ads, LinkedIn and Instagram carousels |
| 9:16 | 1080 x 1920 | Reels, Shorts, vertical ads |

## Hard Don'ts

These are non-negotiable:

1. No gradient backgrounds.
2. No stretching, cropping, or rotating the LWAI logo.
3. No off-palette colors for editorial graphics.
4. No off-brand fonts.
5. No element inside the logo safe zone.
6. No decorative overlap that weakens hierarchy.
7. No busy UI-card composition for quote-led editorial pieces.
8. No weak third-party logo or portrait when a text-first fallback would be stronger.
9. No mixed font sizes inside one quote unless explicitly requested.
10. No quote set in a non-brand font.
11. No shipping an asset with browser or system fallback fonts standing in for IBM Plex Serif or Public Sans.
12. No asset clipped by violating the 50px safe margin.
13. No silent omission of a high-confidence avatar when the brief clearly centers the speaker.

## For Developers

Read `references/dev-tokens.md` for:
- full neutral and lime ramps
- shadcn and shadcn-svelte mappings
- Tailwind v4 CSS token setup
- Tailwind v3 config guidance
- Google Fonts import snippet
- semantic token usage
The dev tokens file remains the source of truth for frontend theme work.
