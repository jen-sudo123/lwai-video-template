# Lead with AI - Design Rules Reference

Read this file for branded editorial graphics:
- LinkedIn cards
- quote cards
- testimonial cards
- slides
- banners
- thumbnails
- ads
- carousels

For frontend theme work, use `references/dev-tokens.md` instead.

## Philosophy

Lead with AI should feel editorial, authoritative, and typographic.

The brand signal comes from:
- confident serif type
- strong hierarchy
- generous but intentional whitespace
- restrained accent use

This should feel closer to a premium publication layout than a startup UI mockup.

## Background

The only approved background is solid white:
- `#FFFFFF`

Do not use:
- gradients
- textures
- patterns
- photos as background
- off-white fills

## Text Color Hierarchy

Use text colors in this order of weight:

1. Black `#000000` for all primary text
2. Neutral 600 `#888888` for supporting text
3. Lime 500 `#66C61C` for accents only

Rules:
- never use lime for headings
- never use lime for body text
- treat lime as punctuation, not a paragraph

## Typography On Assets

### Headings and quote text

- Font: IBM Plex Serif
- Weight: 400
- Letter-spacing: `-0.04em`
- Line-height: about `1.1`
- Color: black
- Sentence case always

### Body, metadata, and attribution

- Font: Public Sans
- Weight: 400 or 600
- Line-height: about `1.5`
- Color: black or neutral-600

## Typography Maps

Use one of these maps instead of improvising font assignment.

### Company thought-leadership card

- label or eyebrow: Public Sans 600
- main headline or step title: IBM Plex Serif 400
- supporting paragraphs: Public Sans 400
- optional closing kicker or question: IBM Plex Serif 400
- metadata or footer details: Public Sans

### Testimonial or quote card

- quote: IBM Plex Serif 400
- attribution name: Public Sans 600
- attribution role and institution: Public Sans 400

### Announcement card

- label or eyebrow: Public Sans 600
- announcement line: IBM Plex Serif 400
- supporting copy: Public Sans 400

### Design material type scale

Use this scale for exported non-web assets:
- LinkedIn cards
- testimonial cards
- slides
- thumbnails
- banners
- any other design material that will be viewed as an image

This is the authoritative scale for design materials.
Do not convert from Tailwind classes.
Do not start from the web Minor Third scale.
Use px values directly.

These defaults are tuned for legibility when social assets are viewed at about `400px` rendered width on mobile.

| Role | `1920 x 1080` | `1080 x 1080` | `1080 x 1350` | `1080 x 1920` |
|---|---:|---:|---:|---:|
| Headline or hero quote | 72px | 56px | 54px | 64px |
| Subhead | 32px | 28px | 28px | 30px |
| Body | 22px | 20px | 20px | 22px |
| Caption | 16px | 16px | 16px | 16px |
| Attribution | 18px | 18px | 18px | 18px |

Role definitions:
- `headline or hero quote`: the main visual mass
- `subhead`: the strongest supporting line under the headline
- `body`: supporting paragraph copy only
- `caption`: eyebrow, labels, date, footer metadata, or helper text
- `attribution`: the speaker name and role line on testimonial cards

If the asset is quote-led:
- start at the exact headline size for the format
- if the quote still feels timid, increase only the quote before changing any other role
- stop once the quote clearly dominates the composition

Hero quote bump sizes:
- `1920 x 1080`: 80px
- `1080 x 1080`: 60px
- `1080 x 1350`: 58px
- `1080 x 1920`: 72px

## Outcome-Based Type Rules

When a card is driven by a quote or testimonial:
- treat the quote like headline content, not body copy
- widen the quote block until it carries the composition
- shape line breaks manually for rhythm
- prefer a strong block over a narrow paragraph
- keep the quote in one font family and one size by default
- use IBM Plex Serif for the entire quote
- if a centered quote block fills the square canvas better, center the full quote block instead of forcing a left-aligned narrow column

Failure checks:
- if the quote feels small, scale it up
- if the quote occupies too little horizontal space, widen it
- if empty space collects on the right or top without purpose, rebalance
- if the attribution competes with the quote, reduce it
- if the attribution disappears entirely, strengthen it slightly
- if the quote uses multiple font sizes without explicit instruction, normalize it
- if the quote is not in IBM Plex Serif, correct it

For company posts and announcement cards:
- if the main title is not in IBM Plex Serif, restart the typography
- if all major text blocks are set in Public Sans, restart the typography
- if long paragraph copy is set in IBM Plex Serif, move it back to Public Sans

## Logo Placement

The LWAI wordmark belongs in a corner, not drifting inside the canvas.

Default corner choices:
- bottom-left
- bottom-right

Allowed when the composition needs it:
- top-left
- top-right

Anchor rule:
- if the logo is placed on the left edge, align the wordmark flush left
- if the logo is placed on the right edge, align the wordmark flush right
- top or bottom placement does not change the edge alignment rule
- never center the wordmark inside a corner zone

### Sizing

- On `1920 x 1080`: icon height about 40px to 48px
- On `1080 x 1080`: icon height about 32px to 40px
- On `1080 x 1350`: icon height about 32px to 40px
- On `1080 x 1920`: icon height about 36px to 44px

### Clearspace

Maintain clearspace equal to 1x the icon height on all sides.

Nothing may enter this area:
- no text
- no image
- no accent
- no edge crop

This is a hard protection rule, not a suggestion.

### Color on white

Use the logo as shipped:
- icon gradient: `#85E13A -> #D0F8AB`
- wordmark text: `#444444`

Never redraw the wordmark by hand.

## Protected Layer Model

Build editorial graphics with this fixed layer order:

1. `background`
2. `accent`
3. `subject-image`
4. `content`
5. `brand`

### Layer definitions

`background`
- pure white only

`accent`
- thin bars
- quote marks
- restrained graphic punctuation
- simple underlines

`subject-image`
- portrait
- avatar
- company mark
- institution mark

`content`
- quote
- headline
- subhead
- attribution
- metadata

`brand`
- LWAI logo
- LWAI clearspace

### Allowed overlap pairs

Allowed when hierarchy improves:
- `accent` behind `content`
- `accent` behind `subject-image`
- `content` partially over `subject-image` if readability stays strong

### Forbidden overlap pairs

Never allow:
- anything over `brand`
- anything inside the logo clearspace
- `subject-image` over the main message
- decorative accent that competes with the quote or logo
- portrait, avatar, or logo over the quote text

If overlap does not make the composition stronger, remove it.

## Quote Card Occupancy Targets

For testimonial and quote cards:
- main quote block should usually span 65% to 85% of usable width
- quote should visually own the piece before metadata is placed
- whitespace should feel intentional, not leftover
- for square testimonial cards, a centered quote block is an approved default when it better fills the safe area
- all quote content must remain inside the 50px safe margin

This is the default editorial posture.

Do not preserve extra empty space just because the first layout technically fits.

## Structural Elements

### Quote marks

If the composition benefits from a quote-mark accent:
- use IBM Plex Serif for the mark
- make it oversized
- keep it in the `accent` layer behind the main text
- use lime-200 or another very light treatment so it stays secondary

This should read like editorial punctuation, not a second headline.

### Dividers

- 1px solid `#EEEEEE`
- use for separation, not decoration

### Card borders

- 1px solid `#EEEEEE`
- use only when the composition genuinely needs a container

### Underlines

- black only
- one focal underline is fine
- avoid stacking multiple underlines

### Lime accent

- use one focal accent at most
- keep it small
- never let it become the main event

## Icons As Illustration

Lucide remains the illustration system when an icon is needed.

Rules:
- use one icon only
- use black or lime-500
- keep stroke weight at the default
- place it where it supports the content, not where it fights the logo

If a portrait or company mark is present, a Lucide icon is often unnecessary.

## Portrait And Avatar Rules

When a real person is central and a strong portrait is found:
- use the real portrait
- a small circular crop beside the attribution is an approved pattern
- keep it clearly secondary to the quote

When no verified portrait is found:
- remove the portrait slot
- keep the attribution text-only
- do not invent initials, monograms, silhouettes, or placeholder avatars

## Buttons On Assets

Only use buttons when the asset truly needs a CTA, such as an ad.

Rules:
- pill shape
- black fill
- white text
- Public Sans 600
- short label only

Do not add UI-style buttons to quote cards unless the brief explicitly needs one.

## Composition Principles

1. One big idea per asset.
2. Lead with typography.
3. Left-align by default.
4. Use no more than three text sizes on one asset.
5. Let whitespace create hierarchy.
6. Protect the brand zone.
7. Add overlap only on purpose.
8. If it starts to feel like a UI card, simplify.
9. Respect the full 50px safe area on every edge.
10. Default static exports to PNG unless the brief says otherwise.

## Hard Don'ts

1. No gradient backgrounds.
2. No logo stretching, distortion, rotation, or crop.
3. No off-palette colors.
4. No fonts outside IBM Plex Serif and Public Sans.
5. No element inside the LWAI logo safe zone.
6. No decorative overlap without hierarchy benefit.
7. No busy layout with extra cards, controls, or chrome.
8. No weak sourced portrait or logo when text-first would be stronger.
9. No mixed quote sizing by accident.
10. No portrait or logo covering headline text.
11. No clipped content caused by violating the safe margin.
