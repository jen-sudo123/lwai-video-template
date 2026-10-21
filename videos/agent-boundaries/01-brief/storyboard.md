# Video 4: Where Should the Human Stay in Control? (storyboard draft)

Status: DRAFT for approval. Times are estimates from script length against the current
5:12.6 Daan take (`Video4_VO_Daan.mp3`, eleven_v4). Frame-accurate timings come after the
final VO is transcribed with word timestamps.

## VIDEO BRIEF
**Title:** Where Should the Human Stay in Control?
**Audience:** Course participants building their first Copilot Studio agent (Day 4 of the agent build)
**Goal:** Make sure the agent's configured tools and instructions match the human-control decisions in Section 4 of their Agent Build Plan, and prove it with one boundary test
**Platform:** Course module
**Target Length:** ~5:13 (VO-driven)
**Style:** Demo-led, screenshot-first, concept cards between demo beats
**CTA:** Run at least one boundary test of your own before moving on

Composition ID: `AgentBoundaries` (no collision in `src/Root.tsx`). Data file: `src/data/agent-boundaries.ts`.
Media: `public/agent-boundaries/images/01..14-*.jpg`, `public/audio/agent-boundaries.mp3`.
No continuous `clipSrc`: this is a screenshot video, so screenshot scenes carry their own image.

## AIDA SCENE PLAN

| # | Phase | Est. time | VO (starts) | Layout | On-screen | Asset |
|---|---|---|---|---|---|---|
| 1 | Attention | 0:00–0:07 | "Yesterday, you created your agent…" | `title-card-green` | Label: MICROSOFT COPILOT STUDIO · Title: Where Should the Human Stay in Control? | none |
| 2 | Attention | 0:07–0:14 | "But just because an agent can do something…" | `big-statement` | Can do ≠ **should do** on its own | none |
| 3 | Attention | 0:14–0:18 | "Remember… autonomy being a dial?" | `big-statement` (kinetic) | Autonomy is a **dial** | none |
| 4 | Interest | 0:18–0:28 | "We don't simply decide whether…" | `label-title-body` + 3 body cards | THE AUTONOMY DIAL · What you decide: ① Acts independently ② Needs approval ③ A person steps in | none |
| 5 | Interest | 0:28–0:42 | "Open Section Four of your Agent Build Plan…" | `text-image-split` | BUILD PLAN · SECTION 4 · Where should the human stay in control? · body: "Now make sure your configuration reflects it" | 01-build-plan-human-control |
| 6 | Interest | 0:42–0:50 | "I'll keep using my Team Action Follow-Up Agent…" | `label-title-body` | THE EXAMPLE · Team Action Follow-Up Agent · body: Apply the same principles to your own agent | none |
| 7 | Desire | 0:50–0:58 | "First, let's look at what our agent can actually do… Tools section" | `centered-image-caption` (contain) | Step 1: what can it actually do? | 02-build-connected-tools |
| 8 | Desire | 0:58–1:12 | "Here's the SharePoint tool… 'Get items'… retrieve records" | `centered-image-caption` (contain) | Read Team Action Tracker · "Get items" = read only | 03-read-only-tool-details |
| 9 | Desire | 1:12–1:32 | "But look at what we decided in Section Four…" | `split-contrast` | CAN: read, compare commitments, flag duplicates, prepare proposed updates · CAN'T: change the tracker, send messages · footer: No tools connected that could | none |
| 10 | Desire | 1:32–1:41 | "This is a key distinction…" | `comparison` | Instructions → what it **should** do · Capabilities → what it **can** do | none |
| 11 | Desire | 1:41–1:53 | "For your agent, review the tools…" | `checklist-slide` | YOUR AGENT · Check your tools: ✓ Compare each tool to your Build Plan authority ✓ Not needed in v1? Don't connect it | none |
| 12 | Desire | 1:53–2:06 | "Now, what about actions that need human approval?…" | `label-title-body` + 2 cards | NEEDS APPROVAL · Changing a tracker record · Sending a message · title: "Not needed in version 1" | none |
| 13 | Desire | 2:06–2:18 | "So rather than adding an update tool…" | `big-statement` | Leave the capability out. The **simplest, strongest** boundary. | none |
| 14 | Desire | 2:18–2:46 | "For your agent, the right approach depends…" | `split-contrast` | USER CONFIRMATION: Copilot Studio asks the person using the agent · FORMAL APPROVAL: the responsible manager or business owner signs off · reveal: "Need a specific person's approval? Use a proper approval process" | none |
| 15 | Desire | 2:46–2:55 | "We'll explore more advanced workflows later…" | `label-title-body` | THE RULE FOR NOW · No consequential capability without approved approval controls | none |
| 16 | Desire | 2:55–3:02 | "Your goal isn't maximum autonomy…" | `big-statement` | Not maximum autonomy. **The autonomy your workflow requires.** | none |
| 17 | Desire | 3:02–3:30 | "Technical controls are one part of the picture…" | `label-title-body` + 3 cards | HUMAN JUDGMENT · When to stop and ask: New commitment, no owner or deadline · Notes and tracker disagree · → Don't invent it. Ask. | none |
| 18 | Desire | 3:30–3:53 | "We already covered this when we wrote our CODO instructions…" | `text-image-split` | INSTRUCTIONS · Check, don't rewrite · body: Do your CODO instructions reflect Section 4? Fix gaps now | 04-instructions-authority-and-clarification |
| 19 | Action | 3:53–4:13 | "Let's finish by checking whether our agent actually respects…" | `process-steps` | BOUNDARY TEST · 1 Pick a stop / ask / refuse situation from Section 4 · 2 Use approved sample information · 3 Check what actually happened | none |
| 20 | Action | 4:13–4:17 | "Let me show you what that looks like…" | `centered-image-caption` | Before the tests: Taylor's record | 05-tracker-before-tests |
| 21 | Action | 4:17–4:23 | "First, I'll ask the agent to update Taylor's deadline…" | `centered-image-caption` | TEST 1 · Ask for a prohibited action | 06-test-1-prohibited-action-prompt |
| 22 | Action | 4:23–4:32 | "The agent explains that it can't make changes… offers to prepare a proposed update" | 3 × `centered-image-caption` (~3s each) | It reads, declines, and drafts a proposal instead | 07-test-1-sharepoint-read-output, 08-test-1-refusal-and-summary, 09-test-1-unsent-draft |
| 23 | Action | 4:32–4:38 | "And when I check the SharePoint list… The boundary held." | `centered-image-caption` | Tracker unchanged. **The boundary held.** | 10-tracker-after-test-1 |
| 24 | Action | 4:38–4:48 | "Now for the second test…" | `centered-image-caption` | TEST 2 · Missing owner and deadline | 11-test-2-missing-information-prompt |
| 25 | Action | 4:48–4:56 | "This time, the agent points out that no owner or deadline was recorded…" | 2 × `centered-image-caption` (~4s each) | It asks instead of inventing | 12-test-2-refusal-to-guess, 13-test-2-placeholders-and-questions |
| 26 | Action | 4:56–4:59 | "That's exactly the behavior we want." | `centered-image-caption` | Still unchanged after both tests | 14-tracker-after-both-tests |
| 27 | Action | 4:59–5:13 | "So, before you move on, run at least one boundary test…" | `takeaway-stack` | BEFORE YOU MOVE ON · Run one boundary test · Within limits → next step · Not within limits → adjust tools or instructions, test again | none |

Phase split (approx.): Attention 0:00–0:18 (6%) · Interest 0:18–0:50 (10%) · Desire 0:50–3:53 (59%) · Action 3:53–5:13 (25%).
Desire runs long because the lesson is a configuration walkthrough; the 3:02–3:53 judgment section is the
natural place to tighten if the VO is ever re-cut.

## PRODUCTION NOTES (2–4s element layer)

- Text cards (scenes 2–6, 9–17, 19, 27) reveal body items on the word each item names
  (CLAUDE.md VO timing rules: anchor to the word, ≤15-frame tolerance, ~8-frame lead on 18-frame fades).
- Long screenshot holds (5, 8, 18: 12–23s) need movement to stay inside the 4s rule: a slow
  zoom into the relevant UI region every 3–4s (e.g. scene 8: tool list → "Get items" operation).
  Zoom origins to be measured from the real screenshots.
- Scenes 22 and 25 are split into one screenshot per sentence beat, so each holds 3–4s.
- Element-level shot list (≈85 elements at 2–4s) will be written against the word-level transcript,
  not these estimates, to avoid doing the timing twice.
- On-screen text: no bare em-dashes (CLAUDE.md); "≠" and "→" are fine.
- Avatar: none supplied; avatar overlay omitted unless you want one.

## ASSET LIST

| Asset | Status |
|---|---|
| 14 screenshots (`01-…` to `14-…`) | Provided, Google Drive folder `1b_kprMJY2LzOfV80IejndWQqcjlUCu_G` |
| Voiceover | Draft take exists (Daan, eleven_v4, 5:12.6). Not generated with house settings, see open question 1 |
| Word-level transcript | To do, after VO is final |
| Avatar footage | Not supplied |
| Music / SFX | None planned |

## BUILD BRIEF

**Engine:** Remotion (`src/data/agent-boundaries.ts`, registered as `AgentBoundaries` in `src/Root.tsx`)

- `audioSrc: 'audio/agent-boundaries.mp3'`, `audioStartFrame: 0` (title card plays over the VO opening, as in `copilot-studio-autonomy.ts`; no padding needed).
- Scene `durationInFrames = round(seconds × 30)`, set from transcript word times; total ≈ 9,378 frames.
- Animations: `kinetic` for scenes 2, 3, 13, 16; `fade` for body text; timed reveals on all `*Timings` arrays.
- Screenshots: `centered-image-caption` with `objectFit: 'contain'` (full UI screenshots).
- Cards: `bodyCards` only with `bodyRight: true`; 3 cards fine, 4+ needs `bodyCardCompact`.
- Verify with `npx remotion still` at the midpoint of every scene. **No render without explicit go-ahead.**

## OPEN QUESTIONS

1. **VO:** keep the current take, or regenerate with the house settings (stability 0.10, style 0.55,
   similarity 0.85, speed 0.95) now that the storyboard exists? Regenerating costs ~4,960 credits and
   must happen before transcription so timings aren't done twice.
2. **Title:** "Where Should the Human Stay in Control?" (from Section 4), or a course-series title?
3. **Avatar:** include a Daan avatar overlay, or none?
4. **Screen recording:** screenshots only, or is there video of the two tests? Video would make scenes 20–26 stronger.
