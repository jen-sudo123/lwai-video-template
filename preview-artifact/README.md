# Scene-editor preview (standard for every preview request)

When someone asks to **preview** a video, build and publish this page instead of sending a bare MP4.
It shows the low-res render with the voiceover, a clickable scene timeline, and one card per scene
with the on-screen text as editable fields plus a note box. Reviewers save edits; Claude reads them
back and applies them to the composition's data file.

## Build

```bash
npm run preview -- <CompositionId>            # stills + manifest + preview.mp4 (scale 0.5)
npm run preview -- <CompositionId> --scale=0.4 # if preview.mp4 comes out over 15 MB
npm run preview -- <CompositionId> --no-video  # stills only (fast text review)
```

Output: `out/preview/<CompositionId>/` → `index.html`, `manifest.json`, `preview.mp4`, `stills/sNN.jpg`.
A preview is a review render, not the final render: it doesn't need the "render" go-ahead, and it is not pushed to Drive.

## Publish (Claude, with the Artifact tool)

- First time for a composition: publish `out/preview/<CompId>/index.html` with
  `files` = `manifest.json`, `preview.mp4` and every `stills/sNN.jpg` (same relative paths),
  `capabilities: { db: {}, user: {} }`, `icon: "video"`.
- Record the artifact URL in the data file's header comment (`// Preview artifact: https://claude.ai/...`).
- Re-preview after changes: rebuild, then publish again to the **same URL** so saved edits and notes stay attached.

## Reading edits back

Reviewers save edits silently: nothing notifies the session. **Read the `edits` collection at the start of every
follow-up turn on the video and always before a final render**, and apply anything still `open`.

Edits live in the artifact's db, collection `edits` (read with the ArtifactData tool, `list` on `edits`):

| doc id | fields |
|---|---|
| `scene-NN` | `scene`, `start`, `layout`, `changes` (only edited fields: string or string[]), `base` (original values), `note`, `status` (`open` / `applied`), `updatedAt`, `renderedFrom` (git commit) |
| `general` | `note`, `status`, `updatedAt` |

Apply `changes` to scene NN's fields in the data file (keep timings in sync: a new or removed body line needs its
`bodyTimings` entry), handle `note`s, rebuild the preview, republish, then set each handled doc to
`status: "applied"` with `appliedAt` (ISO time). Never delete reviewers' docs.
