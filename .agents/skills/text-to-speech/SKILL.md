---
name: text-to-speech
description: Convert text to speech using ElevenLabs voice AI. Use when generating audio from text, creating voiceovers, building voice apps, synthesizing speech in 70+ languages, or producing LWAI-style tutorial/editorial narration for videos.
license: MIT
compatibility: Requires internet access and an ElevenLabs API key (ELEVENLABS_API_KEY).
metadata: {"openclaw": {"requires": {"env": ["ELEVENLABS_API_KEY"]}, "primaryEnv": "ELEVENLABS_API_KEY"}}
---

# ElevenLabs Text-to-Speech

Generate natural speech from text - supports 70+ languages, multiple models for quality vs latency tradeoffs.

> **Setup:** See [Installation Guide](references/installation.md). For JavaScript, use `@elevenlabs/*` packages only.

## LWAI Voiceover Workflow

Use this workflow when the task is a narrated LWAI video, tutorial, or editorial explainer rather than generic TTS.

### Default LWAI voice

Use **Daan** (`8Ok6mJg2E8uDdbNLmQx8`) unless the user explicitly asks for another voice.

### LWAI voice roster

| Voice | ID | Style |
|---|---|---|
| Daan | `8Ok6mJg2E8uDdbNLmQx8` | Default - neutral base |
| Lucan Rook | `15CVCzDByBinCIoCblXo` | Energetic male - good source for voice changer into Daan |
| Tyler Kurk | `raMcNf2S8wCmuaBcyI6E` | Smooth, pleasant, clear |
| Joseff Novak | `3TStB8f3X3To0Uj5R7RK` | Calm, professional |
| Nichalia Schwartz | `XfNU2rGpBa01ckF309OY` | Bright, friendly |
| Eryn | `RaFzMbMIfqBcIurH6XF9` | Informative, neutral, measured |
| George | `JBFqnCBsd6RMkjVDRZzb` | Warm storyteller - strong HBR/tutorial tone |
| Daniel | `onwK4e9ZLuTAKqWW03F9` | Steady broadcaster - strong HBR/tutorial tone |
| Bill | `pqHfZKP75CvOlQylNhV4` | Wise, mature, balanced - strong HBR/tutorial tone |
| Brian | `nPczCjzI2devNBz1zQrb` | Deep, resonant, comforting - strong HBR/tutorial tone |
| Matilda | `XrExE9yKIg1WjnnlVkGX` | Knowledgeable, professional - strong HBR/tutorial tone |

To look up a voice by ID:

```bash
curl -s "https://api.elevenlabs.io/v1/voices/<voice_id>" -H "xi-api-key: $ELEVENLABS_API_KEY"
```

### Scene-first script prep

Before generating audio:

1. Break the raw script into scene-sized paragraphs, usually one paragraph per video scene.
2. Drop VO for pure title cards or section headers that should stay visual-only.
3. Present a storyboard table with scene number, scene title, and VO line for approval when the script is still in flux.
4. Edit for spoken delivery: remove awkward quoted commands, simplify doc-like phrasing, and tighten rhetorical filler.

### Use plain text plus `<break>` tags only

Do not reach for heavy SSML such as `<prosody>` or `<emphasis>` unless the user explicitly asks for it. For this workflow, those tags tend to flatten delivery.

Use `<break>` tags only for:

- scene spacing
- punctuation pauses ElevenLabs tends to rush

Example:

```xml
<speak>
<break time="500ms"/>Your first scene line goes here.

<break time="500ms"/>Your second scene line goes here.
</speak>
```

Use `500ms` between scenes by default, or tighten to `50ms` when scenes should feel continuous. Add `150ms` to `400ms` pauses after commas or periods only when the read still feels rushed.

### Recommended LWAI settings

These settings consistently produce the intended expressive, non-monotone house style:

| Setting | Value | Why |
|---|---|---|
| `model_id` | `eleven_multilingual_v2` | Best long-form TTS behavior for this workflow |
| `stability` | `0.10` | Lower adds natural variation |
| `similarity_boost` | `0.85` | Keeps the target timbre recognizable |
| `style` | `0.55` | Adds expression without overdramatizing |
| `speed` | `0.95` | Slightly unhurried presenter pace |
| `use_speaker_boost` | `true` | Improves clarity |

Example request:

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/8Ok6mJg2E8uDdbNLmQx8?output_format=mp3_44100_128" \
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

For word-level timing, prefer the `with-timestamps` endpoint and decode `audio_base64` into the final asset.

### If Daan sounds too flat

Generate the same script with a more expressive source voice such as **Lucan Rook**, then run that result through the voice-changer skill targeting Daan. The source performance carries the emotion; the target voice mainly changes timbre.

### File conventions for `lwai-video-template`

- Scripts: `src/data/<composition-id>.script.txt`
- Final audio: `public/audio/<composition-id>.mp3`
- Alignment: `public/audio/<composition-id>.alignment.json`
- A/B experiments: `public/audio/voice-tests/`

## Quick Start

### Python

```python
from elevenlabs import ElevenLabs

client = ElevenLabs()

audio = client.text_to_speech.convert(
    text="Hello, welcome to ElevenLabs!",
    voice_id="JBFqnCBsd6RMkjVDRZzb",  # George
    model_id="eleven_multilingual_v2"
)

with open("output.mp3", "wb") as f:
    for chunk in audio:
        f.write(chunk)
```

### JavaScript

```javascript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { createWriteStream } from "fs";

const client = new ElevenLabsClient();
const audio = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
  text: "Hello, welcome to ElevenLabs!",
  modelId: "eleven_multilingual_v2",
});
audio.pipe(createWriteStream("output.mp3"));
```

### cURL

```bash
curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" -H "Content-Type: application/json" \
  -d '{"text": "Hello!", "model_id": "eleven_multilingual_v2"}' --output output.mp3
```

## Models

| Model ID | Languages | Latency | Best For |
|----------|-----------|---------|----------|
| `eleven_v3` | 70+ | Standard | Highest quality, emotional range |
| `eleven_multilingual_v2` | 29 | Standard | High quality, long-form content |
| `eleven_flash_v2_5` | 32 | ~75ms | Ultra-low latency, real-time |
| `eleven_flash_v2` | English | ~75ms | English-only, fastest |
| `eleven_turbo_v2_5` | 32 | ~250-300ms | Balanced quality/speed |
| `eleven_turbo_v2` | English | ~250-300ms | English-only, balanced |

## Voice IDs

Use pre-made voices or create custom voices in the dashboard.

**Popular voices:**
- `JBFqnCBsd6RMkjVDRZzb` - George (male, narrative)
- `EXAVITQu4vr4xnSDxMaL` - Sarah (female, soft)
- `onwK4e9ZLuTAKqWW03F9` - Daniel (male, authoritative)
- `XB0fDUnXU5powFXDhCwa` - Charlotte (female, conversational)

```python
voices = client.voices.get_all()
for voice in voices.voices:
    print(f"{voice.voice_id}: {voice.name}")
```

## Voice Settings

Fine-tune how the voice sounds:

- **Stability**: How consistent the voice stays. Lower values = more emotional range and variation, but can sound unstable. Higher = steady, predictable delivery.
- **Similarity boost**: How closely to match the original voice sample. Higher values sound more like the original but may amplify audio artifacts.
- **Style**: Exaggerates the voice's unique style characteristics (only works with v2+ models).
- **Speaker boost**: Post-processing that enhances clarity and voice similarity.

```python
from elevenlabs import VoiceSettings

audio = client.text_to_speech.convert(
    text="Customize my voice settings.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    voice_settings=VoiceSettings(
        stability=0.5,
        similarity_boost=0.75,
        style=0.5,
        speed=1.0,             # 0.25 to 4.0 (default 1.0)
        use_speaker_boost=True
    )
)
```

## Language Enforcement

Force specific language for pronunciation:

```python
audio = client.text_to_speech.convert(
    text="Bonjour, comment allez-vous?",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_multilingual_v2",
    language_code="fr"  # ISO 639-1 code
)
```

## Text Normalization

Controls how numbers, dates, and abbreviations are converted to spoken words. For example, "01/15/2026" becomes "January fifteenth, twenty twenty-six":

- `"auto"` (default): Model decides based on context
- `"on"`: Always normalize (use when you want natural speech)
- `"off"`: Speak literally (use when you want "zero one slash one five...")

```python
audio = client.text_to_speech.convert(
    text="Call 1-800-555-0123 on 01/15/2026",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    apply_text_normalization="on"
)
```

## Request Stitching

When generating long audio in multiple requests, the audio can have pops, unnatural pauses, or tone shifts at the boundaries. Request stitching solves this by letting each request know what comes before/after it:

```python
# First request
audio1 = client.text_to_speech.convert(
    text="This is the first part.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    next_text="And this continues the story."
)

# Second request using previous context
audio2 = client.text_to_speech.convert(
    text="And this continues the story.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    previous_text="This is the first part."
)
```

## Output Formats

| Format | Description |
|--------|-------------|
| `mp3_44100_128` | MP3 44.1kHz 128kbps (default) - compressed, good for web/apps |
| `mp3_44100_192` | MP3 44.1kHz 192kbps (Creator+) - higher quality compressed |
| `mp3_44100_64` | MP3 44.1kHz 64kbps - lower quality, smaller files |
| `mp3_22050_32` | MP3 22.05kHz 32kbps - smallest MP3 files |
| `pcm_16000` | Raw PCM 16kHz - use for real-time processing |
| `pcm_22050` | Raw PCM 22.05kHz |
| `pcm_24000` | Raw PCM 24kHz - good balance for streaming |
| `pcm_44100` | Raw PCM 44.1kHz (Pro+) - CD quality |
| `pcm_48000` | Raw PCM 48kHz (Pro+) - highest quality |
| `ulaw_8000` | μ-law 8kHz - standard for phone systems (Twilio, telephony) |
| `alaw_8000` | A-law 8kHz - telephony (alternative to μ-law) |
| `opus_48000_64` | Opus 48kHz 64kbps - efficient streaming codec |
| `wav_44100` | WAV 44.1kHz - uncompressed with headers |

## Streaming

For real-time applications, use the `stream` method (returns audio chunks as they're generated):

```python
audio_stream = client.text_to_speech.stream(
    text="This text will be streamed as audio.",
    voice_id="JBFqnCBsd6RMkjVDRZzb",
    model_id="eleven_flash_v2_5"  # Ultra-low latency
)

for chunk in audio_stream:
    play_audio(chunk)
```

See [references/streaming.md](references/streaming.md) for WebSocket streaming.

## Error Handling

```python
try:
    audio = client.text_to_speech.convert(
        text="Generate speech",
        voice_id="invalid-voice-id"
    )
except Exception as e:
    print(f"API error: {e}")
```

Common errors:
- **401**: Invalid API key
- **422**: Invalid parameters (check voice_id, model_id)
- **429**: Rate limit exceeded

## Tracking Costs

Monitor character usage via response headers (`x-character-count`, `request-id`):

```python
response = client.text_to_speech.convert.with_raw_response(
    text="Hello!", voice_id="JBFqnCBsd6RMkjVDRZzb", model_id="eleven_multilingual_v2"
)
audio = response.parse()
print(f"Characters used: {response.headers.get('x-character-count')}")
```

## References

- [Installation Guide](references/installation.md)
- [Streaming Audio](references/streaming.md)
- [Voice Settings](references/voice-settings.md)
