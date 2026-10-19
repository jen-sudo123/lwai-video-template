---
name: lwai-video-storyboarding
description: Combined pre-production and storyboard skill for Lead with AI videos. Use when turning a script or transcript into an AIDA-driven scene plan, production storyboard, asset list, and Remotion-ready or Hyperframes-ready brief for this repository.
tags: [video, storyboard, pre-production, planning, remotion, aida, lwai]
context: project
version: 1.0.0
complexity: medium
---

# LWAI Video Storyboarding Skill

This skill combines two workflows:

1. Strategic video storyboarding for tech demos using the AIDA framework
2. Production storyboard generation using 2-4 second visual elements

It is designed for this repository:

- `videos/<Video Name>/00-source/` stores source script, voiceover, transcript, and avatar footage
- `videos/<Video Name>/01-brief/` stores the planning brief and storyboard
- `videos/<Video Name>/02-assets/` stores screenshots, stills, AI generations, and supporting media
- `videos/<Video Name>/03-project/` stores the Remotion scene data file
- `videos/<Video Name>/04-renders/` stores exported renders
- `lwai-video-template/` is the shared Remotion rendering engine
- `hyperframes-project/` is the shared Hyperframes HTML composition engine

## Purpose

Use this skill when you need to convert a script, transcript, or teaching outline into:

- a clear narrative structure
- a scene-by-scene plan
- a 2-4 second production storyboard
- an asset list for screenshots, stock, AI generation, or B-roll
- an implementation brief for either Remotion or Hyperframes

This skill fits Lead with AI style videos, especially:

- educational explainers
- product walkthroughs
- AI tool demos
- prompt technique videos
- short training modules

## Core Principle

Plan at two levels:

1. Macro level: AIDA narrative flow
2. Micro level: 2-4 second production elements

The AIDA layer controls persuasion and pacing across the full video.
The 2-4 second layer controls what the editor, designer, or motion builder actually has to make.

## Recommended Workflow

### Step 1: Gather Inputs

Start with as many of these as available:

- full script or transcript
- target platform
- target duration
- audience
- main CTA
- voiceover file
- screenshots or product references
- existing brand/layout constraints

Minimum required input:

- hook
- core teaching or demo body
- closing or CTA
- approximate duration

### Step 2: Define the Video Goal

State these explicitly before scene planning:

- Viewer: who the video is for
- Outcome: what they should understand, feel, or do
- Platform: LinkedIn, YouTube, internal training, course module, or short-form
- Format: explainer, demo, walkthrough, comparison, or technique lesson

Example:

- Viewer: managers learning AI prompting
- Outcome: understand when to use few-shot prompting
- Platform: course module and social cutdown
- Format: educational explainer

### Step 3: Map the AIDA Structure

Use AIDA first, even for instructional videos.

Default timing guidance:

| Phase | Share of runtime | Purpose |
|---|---:|---|
| Attention | 10-15% | Hook the viewer immediately |
| Interest | 30-40% | Set up the problem and introduce the concept |
| Desire | 30-40% | Prove value with examples, walkthroughs, and benefits |
| Action | 10-15% | Summarize takeaway and deliver CTA |

For a 90-second video:

- Attention: 0-13s
- Interest: 13-45s
- Desire: 45-76s
- Action: 76-90s

For LWAI educational videos, interpret AIDA like this:

- Attention: the sharp idea or pain point
- Interest: what the concept is and why it matters
- Desire: concrete examples and practical usage
- Action: what to do next, remember, or try

### Step 4: Break Each Phase Into Scenes

Each scene is a narrative block. A scene can contain multiple 2-4 second visual elements.

Each scene should define:

- scene ID
- AIDA phase
- scene goal
- narration range
- estimated time range
- recommended Remotion layout
- key visual treatment
- required assets

Use existing `lwai-video-template` layouts whenever possible. Common mappings:

| Scene intent | Recommended layout |
|---|---|
| bold hook | `title-card-green`, `big-statement`, `centered-quote` |
| concept explanation | `label-title-body`, `large-label-body-split` |
| screenshot support | `text-image-split`, `centered-image-caption` |
| step-by-step teaching | `process-steps`, `checklist-slide` |
| comparison | `comparison`, `split-contrast`, `three-mode-columns` |
| prompt or conversation | `prompt-example`, `chat-thread`, `prompt-box-split` |
| summary or CTA | `centered-quote`, `takeaway-stack`, `big-statement` |

### Step 5: Break Scenes Into 2-4 Second Elements

This is the production layer.

Rules:

- No element shorter than 2 seconds unless there is a deliberate flash transition
- No element longer than 4 seconds unless it is a screen demo that needs breathing room
- Multiple cuts can happen inside one scene
- Every element must align with a specific narration beat, concept beat, or pause

Each element should specify:

- timestamp
- VO or audio line
- visual description
- shot type or framing
- source type
- text overlay
- transition
- technical notes

Source types:

- `screen` for product screenshots or captured UI
- `stock` for generic B-roll
- `ai` for generated visuals or motion clips
- `ugc` for native-feel human footage
- `motion` for built-in Remotion text or diagram scenes
- `shoot` for custom recorded footage

### Step 6: Build the Asset Plan

For every scene and element, list the asset requirement clearly.

Asset categories for this project:

- screenshots
- diagrams
- stock footage
- AI-generated stills
- AI-generated video clips
- avatar footage
- voiceover
- sound effects

When possible, place assets here:

- raw sources in `videos/<Video Name>/00-source/`
- selected production assets in `videos/<Video Name>/02-assets/`

### Step 7: Convert the Storyboard Into a Build Brief

The storyboard should then produce a clean implementation brief for the chosen engine.

If using Remotion, the target is typically `03-project/<video>.ts`.

If using Hyperframes, the target is typically:

- `hyperframes-project/index.html` for a root composition
- `hyperframes-project/compositions/*.html` for sub-compositions
- `hyperframes-project/assets/` for media assets

For each planned scene, define:

- implementation target
- text content
- image references
- timing in seconds
- duration in frames at 30 fps if using Remotion
- animation style if needed

Frame rule:

- `durationInFrames = round(seconds * 30)`

Animation guidance for the current Remotion template:

- use `kinetic` for short punchy copy
- use `fade` for longer explanatory text
- use static or timed reveals for screenshots and process scenes

Animation guidance for Hyperframes:

- every visible timed element must be a `clip`
- every timed element needs `data-start`, `data-duration`, and `data-track-index`
- use deterministic GSAP or CSS animation only
- if using GSAP, register paused timelines on `window.__timelines`
- use separate `<audio>` for the main audio track

## Output Format

Produce four deliverables in order.

### Deliverable 1: Video Brief

```md
## VIDEO BRIEF
**Title:** [Video title]
**Audience:** [Who it is for]
**Goal:** [What the viewer should learn or do]
**Platform:** [Platform]
**Target Length:** [Length]
**Style:** [Educational / polished / native / demo-led]
**CTA:** [Closing action]
```

### Deliverable 2: AIDA Scene Plan

```md
## AIDA SCENE PLAN

### Scene 1
- Phase: Attention
- Time: 0:00-0:08
- Goal: Stop the viewer with a strong pain point
- Narration: "..."
- Layout: big-statement
- Visual treatment: bold statement on brand background
- Assets needed: none

### Scene 2
- Phase: Interest
- Time: 0:08-0:24
- Goal: Define the concept clearly
- Narration: "..."
- Layout: label-title-body
- Visual treatment: concept framing with concise body copy
- Assets needed: none
```

### Deliverable 3: Production Storyboard

```md
## PRODUCTION STORYBOARD: [Video Name]
Total Length: [Xs]
Elements: [#]

### ELEMENT 1 (0:00-0:03)
**Scene:** 1
**Phase:** Attention
**VO/Audio:** "[Exact words or sound]"
**Visual:** [What is on screen]
**Shot Type:** [Wide / Medium / Close / Screen / Motion]
**Source:** [screen / stock / ai / ugc / motion / shoot]
**Text Overlay:** "[On-screen text]"
**Transition to next:** [Cut / Fade / Dissolve / None]
**Technical Notes:** [Timing, motion, emphasis]

### ELEMENT 2 (0:03-0:06)
**Scene:** 1
**Phase:** Attention
**VO/Audio:** "[Exact words or sound]"
**Visual:** [Description]
**Shot Type:** [Type]
**Source:** [Source]
**If Stock:** Keywords: [search terms]
**If AI:** Prompt: "[full prompt]"
**If Screen:** Capture: [what screenshot or recording is needed]
**Text Overlay:** "[On-screen text]"
**Transition to next:** [Cut / Fade / Dissolve / None]
**Technical Notes:** [Notes]
```

### Deliverable 4: Build Brief

```md
## BUILD BRIEF

**Engine:** [Remotion / Hyperframes]

### Scene 1
- Composition section: hook
- Implementation: [Remotion layout or Hyperframes composition/section ID]
- Duration: 3.0s
- Frames: 90
- Copy: "Spent 5 minutes on instructions. Still didn't quite match."
- Animation: fade
- Assets: none

### Scene 2
- Composition section: explanation
- Implementation: [Remotion layout or Hyperframes composition/section ID]
- Duration: 6.0s
- Frames: 180
- Copy:
  - Label: PROMPTING TECHNIQUE
  - Title: Few-Shot Prompting
  - Body:
    - Give AI examples before asking for a new output.
    - Show the pattern instead of explaining every rule.
- Assets: none
```

If `Engine: Remotion`, specify:

- layout name
- scene props
- frame durations
- animation mode

If `Engine: Hyperframes`, specify:

- root composition or sub-composition
- clip IDs
- `data-start`
- `data-duration`
- `data-track-index`
- whether motion is GSAP, CSS, or static
- whether the scene is a standalone composition or part of `index.html`

## Project-Specific Rules For This Repository

### Folder Output Rules

For each video, store:

- script, transcript, and voiceover in `00-source/`
- planning doc and storyboard in `01-brief/`
- generated images, screenshots, and selected media in `02-assets/`
- Remotion scene data file in `03-project/`
- output renders in `04-renders/`

### Remotion Rules

Prefer existing LWAI layouts before inventing new ones.

Only propose a new layout when the message cannot be expressed cleanly with:

- `big-statement`
- `label-title-body`
- `text-image-split`
- `centered-image-caption`
- `process-steps`
- `checklist-slide`
- `prompt-example`
- `chat-thread`
- `comparison`
- `takeaway-stack`

### Hyperframes Rules

When targeting Hyperframes:

- plan each visual beat as one or more timed HTML clips
- assume `index.html` is the root composition unless there is a reason to split into `compositions/*.html`
- treat scene IDs and clip IDs as production artifacts, not optional labels
- plan layered timing explicitly because track order matters
- keep all animation deterministic
- assume the build must pass `npm run check`

Hyperframes-specific implementation fields that should appear in the build brief when relevant:

- composition file
- clip ID
- start time
- duration
- track index
- animation system: `gsap`, `css`, or static
- asset path from `hyperframes-project/assets/`

### Visual Style Rules

Match the current template conventions:

- clear hierarchy
- concise text
- white, green, black, and lime brand system
- IBM Plex Serif for headings
- Public Sans for body
- minimal clutter
- screen-first visuals when the lesson is tool-driven

### Editorial Rules

Avoid:

- generic logo stings
- slow intros
- filler stock footage
- dense paragraphs
- visuals that restate narration without adding clarity

Prefer:

- a sharp opening claim
- clear teaching beats
- one idea per scene
- concrete examples
- screenshots when showing a real tool
- motion graphics when explaining an abstract concept

## Timing Guidance

### By Platform

| Platform | Recommended Length | Notes |
|---|---:|---|
| LinkedIn | 30-90s | Value visible in first 10-15s |
| YouTube Shorts | 30-60s | Vertical, fast hook |
| Course module | 60-240s | Can breathe more, but still keep scene density high |
| Internal training | 60-180s | Prioritize clarity over novelty |

### By Voiceover Density

| Speed | WPM | Use |
|---|---:|---|
| Slow | 100 | emphasis, hooks |
| Normal | 130 | standard explanation |
| Fast | 160 | energetic list or recap |

If using an existing voiceover, derive scenes from timestamps first, then refine the storyboard.

## AI Generation Guidance

Use AI generation only when it adds something a screenshot cannot.

Best use cases:

- metaphorical hooks
- impossible conceptual visuals
- polished product beauty shots
- abstract AI process visuals

Prompt guidance:

- specify framing
- specify movement
- specify style
- specify output mood
- mention native or polished look explicitly
- mention aspect ratio when needed

Example prompt:

`Vertical cinematic UI-inspired animation of floating AI prompt cards assembling into a structured workflow, clean white and lime palette, subtle depth, smooth camera drift, editorial motion design, crisp typography-safe composition`

## Decision Tree

Use this order when planning visuals:

1. Can the idea be taught with an existing Remotion layout or a reusable Hyperframes composition pattern?
2. If not, would a real screenshot or screen recording explain it better?
3. If not, would a simple stock clip support the point?
4. If not, generate an AI visual or AI motion clip.
5. Only propose custom shooting when the concept depends on a human moment or bespoke footage.

## Best-Fit Use Cases In This Repo

This combined skill is especially appropriate for:

- converting `00-source/script.md` into `01-brief/storyboard.md`
- converting transcripts into structured scene plans
- planning a new `03-project/*.ts` Remotion scene file
- planning a new `hyperframes-project/index.html` or `hyperframes-project/compositions/*.html` sequence
- identifying missing screenshots or motion assets before production
- tightening older videos that already have voiceover but weak scene structure

## Suggested Working Sequence

For a new video in this repository:

1. Read `00-source/script.md` or transcript
2. Write `01-brief/video-brief.md`
3. Write `01-brief/storyboard.md`
4. Collect or generate assets into `02-assets/`
5. Choose engine: `Remotion` or `Hyperframes`
6. If Remotion, convert approved scenes into `03-project/<video>.ts`
7. If Hyperframes, map approved scenes into `hyperframes-project/index.html` or `compositions/*.html`
8. Preview in the chosen engine
9. Render final output into `04-renders/` or `hyperframes-project/renders/`

## Short Example

```md
## VIDEO BRIEF
**Title:** Few-Shot Prompting
**Audience:** Managers learning AI prompting
**Goal:** Explain when examples outperform detailed instructions
**Platform:** Course module
**Target Length:** 3:30
**Style:** Educational, polished, example-led
**CTA:** Use few-shot prompting whenever you already have a strong example

## AIDA SCENE PLAN
### Scene 1
- Phase: Attention
- Time: 0:00-0:13
- Goal: Show the pain of over-explaining prompts
- Layout: big-statement

### Scene 2
- Phase: Interest
- Time: 0:13-0:46
- Goal: Define few-shot prompting
- Layout: label-title-body

### Scene 3
- Phase: Desire
- Time: 0:46-2:50
- Goal: Prove it with examples and formats
- Layouts: chat-thread, process-steps, prompt-example, checklist-slide

### Scene 4
- Phase: Action
- Time: 2:50-3:33
- Goal: Tell the viewer when to use it
- Layout: checklist-slide, big-statement
```

## Final Rule

The output should always be specific enough that:

- a producer can gather assets
- a designer can understand the intended visual language
- an editor can assemble timing
- a Remotion or Hyperframes builder can implement the video without guessing
