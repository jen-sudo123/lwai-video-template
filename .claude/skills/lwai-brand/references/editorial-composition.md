# Lead with AI - Editorial Composition Reference

Use this file for static branded graphics.

It exists to prevent a common failure mode:
- brand-safe assets that still feel small, timid, or UI-shaped

## Core Goal

Make the composition feel intentional before it feels decorated.

The order of priority is:
1. message
2. hierarchy
3. spacing
4. sourced subject assets
5. accents

If an added element weakens the first three, remove it.

## Composition Patterns

Use one of these patterns.

### 1. Text-led editorial

Use when:
- the quote or headline is the main event
- no strong portrait or logo is available
- text alone can carry the piece

Build it like this:
- large quote or headline block
- restrained attribution
- minimal accent
- protected corner brand zone

This is the default pattern.

For company thought-leadership posts:
- use one short IBM Plex Serif headline as the hero
- keep the explanatory paragraphs in Public Sans
- if the post needs a closing question or kicker, IBM Plex Serif is allowed there too
- if the prompt is too long for one card, reduce on-card copy before shrinking the type into body-like proportions

### 2. Text + portrait

Use when:
- the named person is central
- a high-confidence portrait exists
- the portrait improves recognition or authority

Build it like this:
- quote remains dominant
- portrait supports the quote
- portrait may overlap accent shapes
- portrait must not crowd the logo safe zone

Do not let the portrait become poster-sized if the message is the actual hero.

For testimonial cards:
- a small circular portrait anchored beside the attribution is a strong default
- do not reserve portrait space if no verified image is available

### 3. Text + company mark

Use when:
- the institution matters more than the individual
- a clean official logo exists

Build it like this:
- quote or headline first
- company mark secondary
- mark should read as affiliation, not brand takeover

Keep the company mark visually subordinate to both the quote and the LWAI logo.

### 4. Text + portrait + company mark

Use when:
- both person and institution matter
- both assets are high confidence
- the composition still stays clean

Build it like this:
- quote first
- portrait second
- institution mark third
- LWAI logo protected at all times

If the piece starts feeling crowded, remove the lower-priority asset.

## How To Scale A Quote Card

For testimonial cards, use this sequence:

1. Set the quote in IBM Plex Serif.
2. Increase scale until it becomes the obvious visual mass.
3. Widen the text block until it spans most of the useful canvas.
4. Adjust line breaks manually for rhythm.
5. Add attribution after the quote feels resolved.
6. Add accents only if the piece still needs structure.
7. Keep the full quote at one font size unless the brief explicitly asks for internal emphasis.

Do not start with decoration.

If a background quote mark helps:
- use IBM Plex Serif
- scale it up aggressively
- keep it behind the quote in the `accent` layer
- let it support the composition without stealing attention

## How To Judge Line Breaks

Good line breaks:
- create a stable block shape
- avoid one-word stragglers when possible
- avoid turning the quote into a narrow column
- keep phrase groupings natural
- preserve one coherent quote texture instead of creating a second typographic tier inside the quote

Bad line breaks:
- feel accidental
- leave large dead zones
- make the quote read like paragraph copy
- over-fragment the sentence

## Company Post Pattern

Use this when the prompt is a company narrative, an internal lesson, or a thought-leadership post rather than a testimonial.

Build it like this:
- small label in Public Sans 600
- one hero title in IBM Plex Serif
- two to four short Public Sans paragraphs or bullet-like blocks
- optional closing IBM Plex Serif kicker
- quiet brand mark in a protected corner
- use the bundled HTML starter when speed or consistency matters more than reinventing the layout

Failure checks:
- if the hero title disappears and everything reads like body copy, shorten the copy and restore the hero
- if the whole card ends up in Public Sans, restart the typography
- if the body paragraphs turn into serif paragraphs, move them back to Public Sans

## Space And Occupancy Heuristics

For strong editorial cards:
- quote block usually occupies 65% to 85% of usable width
- attribution sits close enough to feel connected, far enough to feel secondary
- empty space should frame the message, not expose a weak layout
- on square testimonial cards, centered full-width quote blocks are a strong default when they produce better balance than a left column
- all content must stay inside the 50px safe area on every edge

Use whitespace to create authority.
Do not use whitespace as an excuse for under-scaling.

## Layering Heuristics

Think in z-layers:

`background`
- white foundation only

`accent`
- bars, marks, subtle shapes

`subject-image`
- portrait or institution mark

`content`
- quote and attribution

`brand`
- LWAI logo and clearspace

Rules:
- content can overlap subject-image only when readability improves or stays intact
- accent can sit behind almost anything except the brand zone
- the LWAI logo never shares space with any other element
- portrait, avatar, and company marks must never cover the quote

## Sourcing Heuristics

When sourcing supporting assets:
- start portrait lookup with image-first search when the subject is publicly visible there
- prefer official portrait, avatar, or press imagery
- verify the chosen image on an official or clearly high-confidence page before using it
- prefer official SVG logos
- if confidence is weak, omit the asset
- if a strong portrait is found for a speaker-led card, include it unless it clearly hurts the layout
- never fill a missing portrait slot with a fake placeholder unless the user asked for that treatment

A missing asset is acceptable.
A mismatched or weak asset is not.

## Editorial Self-Check

Before finalizing, ask:
- Does the quote or headline clearly dominate?
- Is the text block wide enough?
- Does the composition still work if accents are removed?
- Is every overlap intentional?
- Is the brand zone untouched?
- Does the result feel editorial rather than UI-shaped?
- Is the whole quote using one consistent brand type treatment?
- Is every edge inside the safe margin?
- If a strong portrait was found, was it either used intentionally or omitted for a real composition reason?

If not, revise the layout before polishing details.

## Scenario Checks

### Bryn Austin testimonial

Expect:
- dominant quote block
- wider text occupancy
- one consistent quote size in IBM Plex Serif
- centered full-width layout is acceptable if it fills the square canvas cleanly
- oversized IBM Plex Serif quote mark in the background is a strong option
- quiet attribution
- real portrait in a small circle if verified, otherwise text-only attribution
- clean brand zone
- no accidental app-card look

### Person-led feature without provided image

Expect:
- proactive portrait search
- display the portrait when a strong one is found and it fits the layout
- text-first fallback if confidence is low

### Institution-led announcement without provided logo

Expect:
- proactive official logo search
- SVG preference
- no random logo site as first choice

### Mixed person + institution card

Expect:
- quote hierarchy stays first
- portrait and organization mark stay secondary
- composition remains uncluttered

### UI-theme request

Expect:
- route to `ui-theme`
- do not apply editorial overlap rules unless the UI surface truly needs them

### Negative prompt: "do not use frontend design skill"

Expect:
- stay in editorial-graphic mode
- avoid UI habits
- keep the result composition-first

### Company post about a tool or workflow shift

Expect:
- a clear IBM Plex Serif step title or thesis line
- Public Sans for the explanatory body
- optional IBM Plex Serif closing question
- no all-sans composition

## Export Default

For static assets:
- keep the editable master as SVG
- default the final handoff to PNG when the user does not specify a format
- only use another format when the brief explicitly asks for it
