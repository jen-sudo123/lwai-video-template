---
name: lwai-voiceover
description: Generate LWAI-style voiceover audio with ElevenLabs — scene breakdown, script prep, plain-text delivery, and the LWAI voice roster. Use when generating a voiceover/VO for a video, tutorial, or narration and the user wants the LWAI house style (expressive, HBR-tutorial tone, not monotone).
license: MIT
compatibility: Requires the ElevenLabs connector (mcp__ElevenLabs__creative_* tools). Model eleven_v4. No direct REST API use.
---

# LWAI Voiceover Generation

Generate voiceover audio for LWAI videos using ElevenLabs TTS, following the house style refined over multiple video productions.

## Default voice

**Daan** — voice_id: `mY3gNkLi7iAw6IzipDpw`

Use this unless the user names a different voice.

## Voice roster (fallback / alternates)

| Voice | ID | Style |
|---|---|---|
| Daan | `mY3gNkLi7iAw6IzipDpw` | Default — neutral base |
| Lucan Rook | `15CVCzDByBinCIoCblXo` | Energetic Male — good source for voice-changer into Daan |
| Tyler Kurk | `raMcNf2S8wCmuaBcyI6E` | Smooth, Pleasant and Clear |
| Joseff Novak | `3TStB8f3X3To0Uj5R7RK` | Calm and Professional |
| Nichalia Schwartz | `XfNU2rGpBa01ckF309OY` | Bright and Friendly |
| Eryn | `RaFzMbMIfqBcIurH6XF9` | Informative, Neutral and Measured |
| George | `JBFqnCBsd6RMkjVDRZzb` | Warm, Captivating Storyteller — HBR/tutorial tone |
| Daniel | `onwK4e9ZLuTAKqWW03F9` | Steady Broadcaster — HBR/tutorial tone |
| Bill | `pqHfZKP75CvOlQylNhV4` | Wise, Mature, Balanced — HBR/tutorial tone |
| Brian | `nPczCjzI2devNBz1zQrb` | Deep, Resonant and Comforting — HBR/tutorial tone |
| Matilda | `XrExE9yKIg1WjnnlVkGX` | Knowledgeable, Professional — HBR/tutorial tone |

To look up other voices, use `creative_list_voices` on the connector.

## Workflow

### 1. Break the script into scenes

Split the raw script into paragraphs — one paragraph per video scene. Drop VO for pure title/section-header cards (visual only, no audio). Present a storyboard table (scene # / title / VO line) for approval before generating audio. Suggest edits for spoken readability: cut quoted-command examples that read awkwardly aloud, remove written-doc-style rhetorical questions, simplify fill-in-the-blank templates.

> **Standard (Nov 2026):** generate through the ElevenLabs connector with model `eleven_v4`.
> Do NOT call the REST API (curl, `ELEVENLABS_API_KEY`, `<break>` tags, `speed`) — that path is retired.

### 2. Write the script file for eleven_v4

- Plain text, one paragraph per scene, each paragraph starting with `[pause]`.
- `<break>` tags are NOT supported on v4 (they'd be spoken or ignored). Pauses: `[short pause]`, `[pause]`, `[long pause]`, ellipses.
- No `speed` setting on v4: pace with punctuation (commas before clauses ElevenLabs rushes) and `[pause]`.
- Audio tags (`[warmly]`, `[curious]`) are allowed but use sparingly — a tag holds until the next one. Default: none.
- Emphasis: capitalise a key word sparingly. Pronunciation fixes: IPA between slashes (`/ʃɪˈvɔːn/`).

```
[pause] Your first scene's line goes here.

[pause] Your second scene's line goes here.
```

### 3. Generate audio (ElevenLabs connector)

1. `creative_create_flow` once per video (name it after the composition ID); reuse its `flow_id` for every take.
2. Sample first: the first 1–2 sections, for approval of the delivery.
   **v4 limit: 5,000 characters per call.** Longer scripts: split at a section break into parts < 5,000 chars,
   generate each part in the same flow, then join the chosen takes with ffmpeg (`-f concat -c copy`).
3. `creative_generate_speech` with `model_id: "eleven_v4"`, `voice_id: "mY3gNkLi7iAw6IzipDpw"` (Daan), `prompt` = script text.
   Leave `generations_count` at default (2 takes) and leave `voice_settings` out.
   Never re-call to retry — each call is charged. Use `estimate_only: true` to price the full script first.
4. Poll `creative_get_flow_run_status` (flow_id + session_ids) until `all_completed` / `has_failures`.
5. User picks a take; download it to `public/audio/<id>.mp3`, then push with `scripts/assets-push.sh`.

### 4. Changing the sound

On v4, change tone with audio tags, not settings. Only if the user asks for steadier/closer-to-voice:
`stability` (default 0.5; ~0.3 more varied, 0.7+ steadier) and `similarity` (~0.85). `use_speaker_boost` and `speed` don't exist on v4.

### 5. Get scene timing (after VO is finalized)

Transcribe the final audio (cloud: `speech-to-text` skill / `creative_transcribe_audio`; local: Whisper) to get word-level timestamps for aligning video scenes:
```bash
whisper voiceover.mp3 --model small --word_timestamps True
```

## File conventions (when working inside lwai-video-template)

- Scripts: `src/data/<composition-id>.script.txt`
- Final audio + alignment: `public/audio/<composition-id>.mp3` / `.alignment.json`
- A/B voice comparisons: `public/audio/voice-tests/` (never treat these as final assets)
