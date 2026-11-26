# Zoom AI: Before, During, and After the Meeting — storyboard

- Composition: `ZoomAi` (custom, `src/compositions/ZoomAi.tsx`, built with `src/kit`; `ClaudeSkills.tsx` style)
- VO: Daan, script `src/data/zoom-ai.script.txt` (~760 spoken words, est. 5:00–5:20)
- Screenshots: Drive `Zoom AI — Script Verification — 2026-11-26` → `public/zoom-ai/images/`
  - Web portal / ZoomMate: 1920×958. In-meeting panel: 24–25 at 800×1436, 26–31 at 400×718 (show as a side panel, not full-screen).
- Times are estimates; final cues come from the VO transcript.

| # | Section | VO (abridged) | Visual | Screenshot / action | Est. |
|---|---|---|---|---|---|
| 1 | Hook | "Zoom is already part of your day… Let's see how it works." | Title card + three-beat strip: Before / During / After | Motion | 0:00–0:13 |
| 2 | Before | "I'm scheduling a launch readiness review… decide what AI can capture and who sees the results." | Concept: meeting card with two dials, "What AI captures" / "Who sees it" | Motion | 0:13–0:23 |
| 3 | Before | "I sign in at zoom.us… scroll down to Zoom AI." | AppWindow, scroll from top of scheduler to Zoom AI block (skip the "My Meeting" title field) | 23 (scroll), STEP 1 | 0:23–0:33 |
| 4 | Before | "I tick Automatically start Zoom AI…" | Zoom + click on the checkbox | 01 / 23 crop, STEP 2 | 0:33–0:41 |
| 5 | Before | "First, who can ask questions… only from when they joined… change this to All participants and invitees… sensitive, limit it to your organization." | Spotlight the dropdown showing the default; side callout lists the 3 options (latecomer / invitees / org only) | 01 crop + motion callout, STEP 3 | 0:41–1:02 |
| 6 | Before | "Second, who receives the summary. Only meeting host…" | Spotlight "Only meeting host" | 01 crop, STEP 4 | 1:02–1:12 |
| 7 | Before | "Finally, the summary template… Project update is a good fit… save the meeting and send the invite from my calendar." | Template dropdown open, spotlight Project update; then zoom to Save button | 02 → 23 (Save), STEP 5 | 1:12–1:32 |
| 8 | Before | "These choices decide what AI can use… follow your organization's policies." | Short policy card | Motion | 1:32–1:38 |
| 9 | During | "I join from the Zoom Workplace desktop app… AI Companion… tell participants AI is in use." | Desktop panel, spotlight "Stop AI Companion" (proves it's running) | 24 | 1:38–1:50 |
| 10 | During | "We discuss the launch. Engineering… Marketing… Support… not approved… Alex… Sam…" | Concept: meeting notes card fills in line by line, each synced to its word | Motion | 1:50–2:08 |
| 11 | During | "…I ask: What important questions remain unanswered? AI flags…" | Prompt types in; answer appears; highlight the 4 bullets as named | 28 | 2:08–2:22 |
| 12 | During | "What are the action items… Do not invent missing deadlines." | Prompt + answer; red flag on "Sam… tomorrow" | 29 | 2:22–2:34 |
| 13 | During | "Even with that instruction… opened the citation… corrected itself." | Citation popup (transcript snippet) → corrected answer | 30 → 31 | 2:34–2:48 |
| 14 | During | "That's the habit worth building… check the evidence." | Statement card | Motion | 2:48–2:56 |
| 15 | After | "I open Summaries in the web portal… two errors: 'customer portion'… Sam's invented deadline." | Summaries list, click latest; then summary with both errors circled | 32 → 33 | 2:56–3:14 |
| 16 | After | "Because only I received it… Open in Docs, correct… share it with the team." | Canvas editor → corrections reviewed → saved → Share dialog | 35 → 38 → 39 → 34 | 3:14–3:34 |
| 17 | After | "In ZoomMate, at ai.zoom.us, I attach the meeting. I check the date…" | ZoomMate home, Attach menu, picker with date spotlit | 07 → 40 | 3:34–3:48 |
| 18 | After | "Create a one-page launch readiness brief…" | Prompt types into ZoomMate input (overlay on 06) | 06 + typed prompt | 3:48–4:04 |
| 19 | After | "ZoomMate drafts the brief… keeps Sam's deadline unconfirmed… no transcript… tagged back to the summary… opens in Canvas, where I can refine it." | Brief overview (spotlight "no transcript" note) → owners table (Sam "Deadline not confirmed") → risks & recommendation label | 44 → 45 → 46 | 4:04–4:26 |
| 20 | Note | "If you already use ChatGPT or Claude, you can connect Zoom… check with your IT or admin team." | Concept: Zoom meetings feeding into a generic AI assistant alongside docs/email icons; small "Depends on your admin" tag | Motion (no screenshot) | 4:26–4:46 |
| 21 | Takeaway | "Set it up before… keep track… fix the summary…" | Three columns reveal on each word | Motion | 4:46–5:00 |
| 22 | Close | "A summary on its own doesn't move the launch forward…" | Closing statement | Motion | 5:00–5:08 |

## VO changes made vs. the original script
1. Scope: "For this meeting, I choose All participants and invitees" → "You can change this to All participants and invitees" (screenshots only show the default).
2. Template: "I pick Project update" → "Project update is a good fit" (the actual summary used General template).
3. Invite: "Then I save and send the invite" → "Then I save the meeting and send the invite from my calendar" (no calendar connected; Zoom warns invites won't send).
4. Sources: "I check its sources and refine the brief in Canvas" → "Each point is tagged back to the summary, so I can check the evidence. The brief opens in Canvas, where I can refine it before I share it."
5. Minor: "I add the title" → "I add a title"; "Then I set two things" → "Then there are two settings to check."

## Not used
03–05, 09, 10, 12–14, 15–22 (fictional-notes test, recording/Canvas admin settings), 25–27, 36–37, 41–43.

## Open items
- Scene 20 has no real screenshot (concept animation only).
- Host name "Daan van Rossum" visible in 33, 40; red "Cloud Recording disabled" banner in 32–33. Plan: zoom/crop past them.
