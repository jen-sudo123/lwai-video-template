#!/usr/bin/env node
// Build a scene-editor preview for any composition, ready to publish as a claude.ai Artifact.
//
//   npm run preview -- <CompositionId> [--scale=0.5] [--no-video]
//
// Writes out/preview/<CompositionId>/:
//   index.html     the scene editor page (from preview-artifact/index.html)
//   manifest.json  scenes, start/end times and editable on-screen text
//   preview.mp4    low-res render with the voiceover (skipped with --no-video)
//   stills/sNN.jpg one still per scene, taken just before the scene ends
//
// Publish the folder with the Artifact tool (index.html as the page, the rest as `files`).
// Reviewer edits land in the artifact's db under `edits/<scene-NN>`; see preview-artifact/README.md.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { selectComposition, renderMedia, renderStill } from '@remotion/renderer';

const args = process.argv.slice(2);
const compId = args.find((a) => !a.startsWith('--'));
if (!compId) {
  console.error('Usage: npm run preview -- <CompositionId> [--scale=0.5] [--no-video]');
  process.exit(1);
}
const scale = Number((args.find((a) => a.startsWith('--scale=')) || '--scale=0.5').split('=')[1]);
const withVideo = !args.includes('--no-video');

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const outDir = path.join(root, 'out', 'preview', compId);
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(path.join(outDir, 'stills'), { recursive: true });

// Cloud sessions: use the preinstalled Chromium and accept the sandbox proxy's certificate.
const cloudChrome = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE || (fs.existsSync(cloudChrome) ? cloudChrome : null);
const chromiumOptions = { ignoreCertificateErrors: Boolean(process.env.HTTPS_PROXY) };
const concurrency = Math.max(1, Math.min(os.cpus().length, 8));

console.log(`Bundling ${compId}...`);
const serveUrl = await bundle({ entryPoint: path.join(root, 'src', 'index.ts') });
const composition = await selectComposition({ serveUrl, id: compId, browserExecutable, chromiumOptions });
const { fps, width, height, durationInFrames } = composition;
const scenes = composition.props.scenes || [];

// On-screen text a reviewer can edit: plain string fields and string lists, never media paths or style options.
const TEXT_KEYS = ['label', 'title', 'subtitle', 'text', 'caption', 'attribution', 'highlight', 'titleHighlight',
  'labelSub', 'leftLabel', 'rightLabel', 'leftTitle', 'rightTitle', 'source'];
const isMedia = (s) => /\.(png|jpe?g|svg|gif|webp|mp4|mov|mp3|wav)$/i.test(s) || s.startsWith('placeholder:');
const editableFields = (scene) => {
  const fields = {};
  for (const [k, v] of Object.entries(scene)) {
    if (k === 'layout') continue;
    if (typeof v === 'string' && TEXT_KEYS.includes(k) && !isMedia(v)) fields[k] = v;
    else if (Array.isArray(v) && v.length && v.every((x) => typeof x === 'string') && !v.some(isMedia)
      && !/(Icons|images|Timings)$/.test(k)) fields[k] = v;
    // screen-demo step chips: edit their text as one line per step (timings stay in the data file).
    else if (k === 'steps' && Array.isArray(v) && v.every((x) => x && typeof x.text === 'string')) fields[k] = v.map((x) => x.text);
  }
  return fields;
};

let start = 0;
const manifestScenes = scenes.map((scene, i) => {
  const n = i + 1;
  const s = { n, layout: scene.layout, startFrame: start, endFrame: start + scene.durationInFrames,
    start: +(start / fps).toFixed(2), end: +((start + scene.durationInFrames) / fps).toFixed(2),
    fields: editableFields(scene), still: `stills/s${String(n).padStart(2, '0')}.jpg` };
  start += scene.durationInFrames;
  return s;
});

const git = (cmd) => { try { return execSync(cmd, { cwd: root }).toString().trim(); } catch { return null; } };
// The data file the scenes come from: Root.tsx's defaultProps variable for this composition, traced to its import.
const rootSrc = fs.readFileSync(path.join(root, 'src', 'Root.tsx'), 'utf8');
const propsVar = (rootSrc.match(new RegExp(`id="${compId}"[\\s\\S]*?defaultProps=\\{(\\w+)\\}`)) || [])[1];
const dataImport = propsVar && (rootSrc.match(new RegExp(`import \\{[^}]*\\b${propsVar}\\b[^}]*\\} from '(\\./data/[^']+)'`)) || [])[1];

const title = (scenes.find((s) => s.layout === 'title-card-green') || scenes.find((s) => s.title) || {}).title || compId;
const manifest = {
  compositionId: compId, title, fps, width, height,
  durationSec: +(durationInFrames / fps).toFixed(2),
  dataFile: dataImport ? `src/${dataImport.replace('./', '')}.ts` : null,
  gitBranch: git('git rev-parse --abbrev-ref HEAD'), gitCommit: git('git rev-parse --short HEAD'),
  generatedAt: new Date().toISOString(), hasVideo: withVideo, scenes: manifestScenes,
};
fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1));

const template = fs.readFileSync(path.join(root, 'preview-artifact', 'index.html'), 'utf8');
const pageTitle = `${title.replace(/ /g, ' ')} Preview`.replace(/[<>&]/g, '');
fs.writeFileSync(path.join(outDir, 'index.html'), template.replace('{{PAGE_TITLE}}', pageTitle));

for (const s of manifestScenes) {
  const frame = Math.max(s.startFrame, s.endFrame - 12);
  await renderStill({ serveUrl, composition, frame, output: path.join(outDir, s.still), imageFormat: 'jpeg',
    jpegQuality: 80, scale: 0.5, browserExecutable, chromiumOptions });
  process.stdout.write(`\rStills ${s.n}/${manifestScenes.length}`);
}
console.log('');

if (withVideo) {
  let lastPct = -1;
  await renderMedia({ serveUrl, composition, codec: 'h264', crf: 28, scale, concurrency, timeoutInMilliseconds: 120000,
    outputLocation: path.join(outDir, 'preview.mp4'), browserExecutable, chromiumOptions,
    onProgress: ({ progress }) => {
      const pct = Math.floor(progress * 10) * 10;
      if (pct !== lastPct) { lastPct = pct; console.log(`Video ${pct}%`); }
    } });
  console.log('');
  const mb = fs.statSync(path.join(outDir, 'preview.mp4')).size / 1e6;
  if (mb > 15) console.warn(`preview.mp4 is ${mb.toFixed(1)} MB; artifact files must be under 15 MB. Re-run with --scale=0.4.`);
}
console.log(`Preview ready: ${path.relative(root, outDir)}/`);
