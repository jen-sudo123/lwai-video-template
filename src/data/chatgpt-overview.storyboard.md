# ChatGPTOverview — storyboard

New combined overview (separate from `chatgpt-models-update` and `chatgpt-pricing-update`).
VO script: `chatgpt-overview.script.txt`.

## On-screen label rule

Product and feature names always appear on screen as proper names, so spoken words like
"Work" or "Sites" read as products, not ordinary words:

- Full product names in Title Case, never lowercased in body text.
- "Work" always written as **ChatGPT Work**, never bare "Work".
- "Sites" shown as its own named output card, alongside Documents, Spreadsheets, Presentations, Reports.
- Feature names are the scene `label` or `title` (e.g. label "Feature", title "Deep Research").
- Thinking settings and model names shown verbatim: Instant, Medium, High, Extra High, Pro; GPT-6 Sol, GPT-6 Astra.
- Plan names shown as names: Free, Go, Plus, Pro, Business, Enterprise.

## Scenes

| # | Scene | On-screen product labels | VO (summary) |
|---|---|---|---|
| 1 | Hook | ChatGPT | No longer just a chatbot, becoming the operating system for how leaders work |
| 2 | Section card | Key Features | "Let's start with the key features." |
| 3 | Search vs Deep Research | Search · Deep Research | Live web info vs structured, cited report |
| 4 | Voice | Voice · Advanced Voice | Speak naturally, plus live video and screen sharing in mobile apps |
| 5 | Image generation | Image Generation | Mock-ups, diagrams, posters, strong text rendering |
| 6 | Building blocks | Projects · Skills · Apps · Plugins | Organize, define, connect, bundle |
| 7 | ChatGPT Work | ChatGPT Work · outputs: Documents, Spreadsheets, Presentations, Reports, Sites | Researches, analyzes, delivers; you monitor, redirect, approve |
| 8 | Codex + desktop | Codex · Chat · ChatGPT Work · Codex | Dedicated coding workspace; unified on desktop |
| 9 | Section card | The Models | Depends on Chat, ChatGPT Work or Codex, and plan |
| 10 | Thinking settings | Instant · Medium · High · Extra High · Pro | Speed vs depth |
| 11 | GPT-6 mapping | GPT-6 Sol → Instant–Extra High · GPT-6 Astra → Pro, ChatGPT Work, Codex | Which model powers what |
| 12 | Privacy | Settings · Business · Enterprise · Edu | Training controls, org data default, 3 rules |
| 13 | Plans | Free · Go · Plus · Pro · Business · Enterprise | What each tier adds |
| 14 | Close | ChatGPT Pricing | Check the official pricing page |

## VO timing (take 1, audioStartFrame 0, 30 fps)

Full line-level timings in `chatgpt-overview.transcript.tsv`. Scene starts (frame = round(s × 30)):

| # | Scene | Start s | Start frame | Frames |
|---|---|---|---|---|
| 1 | Hook | 0.00 | 0 | 354 |
| 2 | Key Features card | 11.80 | 354 | 100 |
| 3 | Search vs Deep Research | 15.12 | 454 | 285 |
| 4 | Voice | 24.64 | 739 | 295 |
| 5 | Image Generation | 34.48 | 1034 | 255 |
| 6 | Projects · Skills · Apps · Plugins | 42.96 | 1289 | 780 |
| 7 | ChatGPT Work | 68.96 | 2069 | 624 |
| 8 | Codex + desktop | 89.76 | 2693 | 476 |
| 9 | The Models card + intro | 105.64 | 3169 | 400 |
| 10 | Thinking settings | 118.96 | 3569 | 617 |
| 11 | GPT-6 mapping | 139.52 | 4186 | 518 |
| 12 | Privacy | 156.80 | 4704 | 698 |
| 13 | Plans | 180.05 | 5402 | 1236 |
| 14 | Close | 221.28 | 6638 | 232 |

Total ≈ 6870 frames (229 s, VO ends 228.56 s + ~0.5 s tail).
Card anchors inside scenes: Skills 48.40, Apps 51.92, Plugins 60.08; Sites 81.84; GPT-6 Sol 141.60, Astra 147.36;
Go 193.60, Plus 199.52, Pro 206.72, Business 213.44.

## Open items

- Product facts confirmed by Jen (2026-11-04).
- Audio is on Drive (`public/audio/chatgpt-overview.mp3`) but not yet in this cloud session's `public/` (no rclone token here).
