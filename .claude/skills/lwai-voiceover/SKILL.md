---
name: lwai-voiceover
description: Generate LWAI-style voiceover audio with ElevenLabs — scene breakdown, script prep, plain-text delivery, and the LWAI voice roster. Use when generating a voiceover/VO for a video, tutorial, or narration and the user wants the LWAI house style (expressive, HBR-tutorial tone, not monotone).
license: MIT
compatibility: Requires internet access and an ElevenLabs API key (ELEVENLABS_API_KEY). Works with any agent that can call the ElevenLabs REST API (curl) or SDK — Claude Code, Codex, etc.
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

To look up any other voice name from an ID:
```bash
curl -s "https://api.elevenlabs.io/v1/voices/<voice_id>" -H "xi-api-key: $ELEVENLABS_API_KEY"
```

## Workflow

### 1. Break the script into scenes

Split the raw script into paragraphs — one paragraph per video scene. Drop VO for pure title/section-header cards (visual only, no audio). Present a storyboard table (scene # / title / VO line) for approval before generating audio. Suggest edits for spoken readability: cut quoted-command examples that read awkwardly aloud, remove written-doc-style rhetorical questions, simplify fill-in-the-blank templates.

### 2. Write the script file as plain text + `<break>` tags only

**Do not use heavy SSML** (`<prosody>`, `<emphasis>`, pitch/rate tags) — testing showed this makes ElevenLabs sound *more* monotone, not less. Plain text lets the model's own prosody engine drive natural expression.

Use `<break>` tags only for:
- Silence between scenes — wrap the whole script in `<speak>...</speak>` and put `<break time="500ms"/>` (or `"50ms"` for a tighter gap) at the start of each paragraph.
- Extra pause at punctuation ElevenLabs tends to rush past — insert `<break time="150ms"/>`–`"400ms"` after commas/periods if pacing still feels too fast.

Example:
```xml
<speak>
<break time="500ms"/>Your first scene's line goes here.

<break time="500ms"/>Your second scene's line goes here.
</speak>
```

### 3. Generate audio

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/mY3gNkLi7iAw6IzipDpw?output_format=mp3_44100_128" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "<script text with <break> tags>",
    "model_id": "eleven_multilingual_v2",
    "voice_settings": {
      "stability": 0.10,
      "similarity_boost": 0.85,
      "style": 0.55,
      "use_speaker_boost": true,
      "speed": 0.95
    }
  }' \
  --output voiceover.mp3
```

Or with the `with-timestamps` endpoint to also get word-level alignment:
```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/mY3gNkLi7iAw6IzipDpw/with-timestamps?output_format=mp3_44100_128" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"text": "...", "model_id": "eleven_multilingual_v2", "voice_settings": {...}}' \
  | python3 -c "import sys,json,base64; d=json.load(sys.stdin); open('voiceover.mp3','wb').write(base64.b64decode(d['audio_base64']))"
```

### Voice settings for expressive, non-monotone delivery

| Setting | Value | Why |
|---|---|---|
| `stability` | `0.10` | Low = more natural variation. Higher flattens delivery. |
| `style` | `0.55` | Higher = more expressive/dramatic. |
| `similarity_boost` | `0.85` | Stay close to the target voice's timbre. |
| `speed` | `0.95` | Slightly unhurried, matches a natural presenter pace. |

Model: `eleven_multilingual_v2` for TTS (works well even for English-only).

### 4. Optional: clone a more expressive delivery onto Daan via Voice Changer

If Daan still sounds flatter than desired, generate the same script with a more naturally expressive voice (e.g. Lucan Rook `15CVCzDByBinCIoCblXo`), then convert that performance to Daan's timbre with the ElevenLabs Voice Changer (speech-to-speech). The voice-changer preserves the source's emotional delivery — a flat source produces a flat result regardless of target voice, so pick an expressive source.

```bash
curl -X POST "https://api.elevenlabs.io/v1/speech-to-speech/mY3gNkLi7iAw6IzipDpw?output_format=mp3_44100_128" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -F "audio=@source_lucan_rook.mp3" \
  -F "model_id=eleven_multilingual_sts_v2" \
  -F 'voice_settings={"stability":0.10,"similarity_boost":0.85,"style":0.55,"use_speaker_boost":true}' \
  --output daan_final.mp3
```

### 5. Get scene timing (after VO is finalized)

Run Whisper on the final audio to get word-level timestamps for aligning video scenes:
```bash
whisper voiceover.mp3 --model small --word_timestamps True
```

## File conventions (when working inside lwai-video-template)

- Scripts: `src/data/<composition-id>.script.txt`
- Final audio + alignment: `public/audio/<composition-id>.mp3` / `.alignment.json`
- A/B voice comparisons: `public/audio/voice-tests/` (never treat these as final assets)
