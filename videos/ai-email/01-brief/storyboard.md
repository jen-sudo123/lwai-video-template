# AI for Email: storyboard

## Video brief
- **Title:** AI for Email
- **Audience:** Lead with AI course learners (managers and knowledge workers)
- **Goal:** Understand why email suits AI, what AI in email is (and isn't), and the two ways to use it
- **Platform:** Course module
- **Length:** 3:24 (3s title card + 201.4s body = 6132 frames @ 30fps)
- **Style:** Animated concept demo (LWAI demo kit): every scene acts out its idea
- **CTA:** Treat AI as a thinking partner in your inbox, not just a writing assistant
- **Engine:** Remotion custom composition `src/compositions/AiEmail.tsx`, ID `AiEmail`. The earlier slide version stays as `AiEmailSlides` (`src/data/ai-email.ts`).
- **Audio:** `public/audio/AiEmail.mp3` (Daan, ElevenLabs v4). Timings: `src/data/AiEmail.transcript.json`

## AIDA scene plan (animated build)

Times are VO seconds (add 3s for video time). Cues are the word each animation fires on.

| # | Phase | VO start | Scene | Animation and cues |
|---|---|---|---|---|
| 0 | | title | Title card | Green card "AI for Email" (90 frames) |
| 1 | Attention | 0.00 | Email eats the workday | Inbox floods with 12 unread emails; "time-consuming" marked 1.84 |
| 2 | Attention | 4.56 | 117 emails a day | Source 5.12; counter 0→117 and 117-envelope grid fill from 9.60 |
| 3 | Interest | 12.98 | Email isn't just messaging | Stamps land on an email: decisions 16.62, coordinated 17.90, priorities 19.42, accountability 22.10 |
| 4 | Interest | 23.90 | A strong AI use case | Three numbered circles pop at "three" 28.70 |
| 5 | Interest | 33.42 | 1 High volume | Email pile grows 35.9; cognitive-load meter climbs 37.6–39.4 |
| 6 | Interest | 40.38 | 2 Highly repetitive | Envelope rows multiply: requests 46.10, updates 47.02, clarifications 47.58, follow-ups 48.94, status checks 49.74 |
| 7 | Interest | 51.22 | 3 Cognitive work | Chain lights up: read 54.54, interpret 55.50, decide 56.74, choose 58.22, write 59.78 |
| 8 | Interest | 62.38 | Messy email to action | Scan line on "read" 68.22; intent card 71.66; action card 75.58 |
| 9 | Desire | 80.26 | What it's not | Cards struck through: sending 85.42, replacing 87.26, automating 89.98 |
| 10 | Desire | 91.94 | A thinking assistant | Assistant panel slides into inbox 93.3; load meter drains 96.4 |
| 11 | Desire | 98.66 | Summarize, draft, tone | Thread summary 99.42; draft types 103.82; tone switches 110.98 / 111.54 / 112.62 / 113.50 |
| 12 | Desire | 114.70 | Benefits compound | 8-week strip: status updates 118.94, approvals 120.14, rising "time back" bars |
| 13 | Desire | 121.46 | Two main ways | Two cards at "two main ways" 124.06 |
| 14 | Desire | 127.82 | Way 1: inside your inbox | Gemini in Gmail 132.18, Copilot in Outlook 133.66; window glows "flow of work" 139.86; capabilities 142.26–149.54; "No switching tools" 151.62 |
| 15 | Desire | 153.38 | Way 2: core AI platform | ChatGPT 156.26, Claude 157.38; email flies into chat 158.66; connector 160.30; "Similar capabilities" 163.6; chat comes forward 166.78 |
| 16 | Desire | 170.22 | Higher-stakes emails | Use cases 173.62 / 175.90 / 178.22; documents 182.14, web search 183.42, deep research 184.30 |
| 17 | Action | 185.74 | Takeaway | "Not just a writing assistant" struck 190.3; offload 191.82; thinking partner 194.86 |

## Assets
- Voiceover: done. All visuals are built in code; no screenshots or stock.
- Example people, emails and replies in the mocks are illustrative.
- Optional upgrade: real screenshots of Gemini in Gmail / Copilot in Outlook for scenes 14–15.
