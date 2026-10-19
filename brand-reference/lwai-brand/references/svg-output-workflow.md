# Render Output Workflow

Use this file for static editorial graphics.

## Default Production Path

For quote cards, testimonial cards, banners, thumbnails, and similar one-frame assets:
- default to HTML/CSS rendered in Chromium via Playwright
- use the bundled local fonts from `assets/fonts/`
- use `assets/templates/text-led-editorial-card.html` when the asset is a text-led company post or announcement
- use `assets/templates/testimonial-linkedin-card.html` when the asset is a square testimonial or quote-led LinkedIn card
- export PNG as the final handoff unless the brief asks for SVG specifically

This environment is browser-first for final rendering.
Font fidelity outranks SVG preference.

## Renderer Rules

- never use CairoSVG for final branded exports
- CairoSVG silently falls back when `@font-face` fonts are not fully supported
- if local or embedded brand fonts matter, use Chromium
- if you keep an SVG master, still render the final PNG through Chromium

## Typography Setup

Use only these font-family names inside the SVG:
- `IBM Plex Serif`
- `Public Sans`

Bundled local font files live in `assets/fonts/`:
- `assets/fonts/IBMPlexSerif-Regular.ttf`
- `assets/fonts/PublicSans-Regular.ttf`
- `assets/fonts/PublicSans-SemiBold.ttf`

Prefer those bundled local files before any Google Fonts URL.
When reliability matters, embed the font data into the SVG with `@font-face` so the final render does not depend on network access.

When a browser-rendered export needs Google Fonts:
- treat Google Fonts as a fallback, not the primary path
- prefer local `@font-face` with bundled files first
- do not assume a non-browser SVG renderer will fetch web fonts correctly

If the environment cannot render the fonts reliably:
- do not ship the broken output
- switch to Chromium
- if needed, rebuild the composition in browser-rendered HTML/CSS rather than accepting fallback fonts

## Working Rules

- use the final canvas size from the start
- keep the logo as the shipped SVG asset, not a traced recreation
- keep text editable while iterating
- prefer local `@font-face` declarations that point to bundled font files or embedded font data
- if you use an SVG master, keep clear layer naming: `background`, `accent`, `subject-image`, `content`, `brand`

## Export Rules

- render at least one draft and inspect it before calling the asset finished
- final default export is PNG
- verify the exported PNG still uses the intended IBM Plex Serif and Public Sans rendering
- if the quote looks like a generic sans or the metadata loses Public Sans, the export is invalid
- if a company post renders every major block in Public Sans, the export is invalid even if the font files loaded correctly
- if the export came from CairoSVG, do not trust it for final branded typography
- verify the logo edge alignment survived the export
- verify no content drifted into the brand clearspace

## Failure Checks

Before finishing, check:
- Does the PNG match the SVG composition?
- Did the fonts render correctly?
- Do the quote and quote-mark still read as IBM Plex Serif rather than a fallback face?
- Does the attribution still read as Public Sans rather than a fallback face?
- If this is a company post, is the main hero line in IBM Plex Serif and the explanatory body in Public Sans?
- Did you actually inspect a rendered draft rather than only reading the source?
- Did the final PNG come from Chromium rather than CairoSVG?
- Is the quote still the main visual mass?
- Is the logo flush to the chosen left or right edge?
- If no verified portrait was found, did the layout stay clean without a placeholder?
