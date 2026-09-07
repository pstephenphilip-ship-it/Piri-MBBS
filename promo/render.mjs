/* =====================================================================
   Render the promo reel to a video file.

     node promo/render.mjs                     both cuts, 30 fps, into promo/out
     node promo/render.mjs --only vertical     just the 1080x1920 cut
     node promo/render.mjs --fps 60            smoother, twice the frames
     node promo/render.mjs --out ~/Desktop     somewhere else
     node promo/render.mjs --format png        lossless frames, ~3x slower

   How it works: the reel is a pure function of time (see reel.js), so this
   walks the timeline one frame at a time, screenshots each position, and
   pipes the frames straight into ffmpeg. Nothing is captured in real time,
   so a slow machine produces exactly the same video as a fast one — there
   are no dropped or duplicated frames.

   The reel plays recorded footage of the real site, so run
   `node promo/capture.mjs` first. This starts its own static server,
   because the page fetches that footage over http.

   ffmpeg is looked up in this order: $FFMPEG, ffmpeg on PATH, the one that
   ships with the imageio-ffmpeg Python package, then Playwright's bundled
   copy. The first one that can encode H.264 wins and you get an .mp4;
   otherwise it falls back to VP8 in a .webm, which most social platforms
   will NOT accept for upload — the run prints a warning if that happens.
   ===================================================================== */
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('Playwright is not installed. From this directory run:\n');
  console.error('    npm install\n');
  console.error('(then `npx playwright install chromium` if you have no browser yet)');
  process.exit(1);
}
import { spawn, execFileSync } from 'node:child_process';
import { mkdirSync, existsSync, readdirSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));

/* ------------------------------------------------------------- options */
function opt(name, fallback) {
  const i = process.argv.indexOf('--' + name);
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}
const FPS = Number(opt('fps', 30));
const ONLY = opt('only', null);
const OUT = path.resolve(opt('out', path.join(HERE, 'out')));
/* JPEG frames capture ~3x faster than PNG and the difference does not survive
   the H.264 encode; --format png is there for archival masters. */
const FORMAT = opt('format', 'jpeg') === 'png' ? 'png' : 'jpeg';
const SHOT = FORMAT === 'png' ? { type: 'png' } : { type: 'jpeg', quality: 95 };

const CUTS = [
  { name: 'doctorise-promo-landscape', file: 'landscape.html', profile: 'desktop', w: 1920, h: 1080, label: '16:9 · YouTube, site hero, presentations' },
  { name: 'doctorise-promo-vertical',  file: 'vertical.html',  profile: 'phone',   w: 1080, h: 1920, label: '9:16 · TikTok, Reels, Shorts' }
].filter(c => !ONLY || c.file.startsWith(ONLY));

for (const c of CUTS) {
  if (!existsSync(path.join(HERE, 'shots', c.profile, 'manifest.json'))) {
    console.error(`No ${c.profile} footage. Record it first:\n\n    node promo/capture.mjs --profile ${c.profile}\n`);
    process.exit(1);
  }
}

if (!CUTS.length) { console.error(`--only "${ONLY}" matched nothing (try landscape or vertical)`); process.exit(1); }

/* -------------------------------------------------------------- ffmpeg */
function encoders(bin) {
  try { return execFileSync(bin, ['-hide_banner', '-encoders'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch { return null; }
}

function findFfmpeg() {
  const cands = [];
  if (process.env.FFMPEG) cands.push(process.env.FFMPEG);
  cands.push('ffmpeg');

  /* imageio-ffmpeg ships a full build with libx264 — pip install imageio-ffmpeg */
  for (const base of ['/usr/local/lib', '/usr/lib', path.join(process.env.HOME || '', '.local/lib')]) {
    for (const py of safeDirs(base)) {
      const dir = path.join(base, py, 'dist-packages/imageio_ffmpeg/binaries');
      const alt = path.join(base, py, 'site-packages/imageio_ffmpeg/binaries');
      for (const d of [dir, alt]) {
        for (const f of safeDirs(d)) if (f.startsWith('ffmpeg-')) cands.push(path.join(d, f));
      }
    }
  }

  /* Playwright's copy: VP8/WebM only, so it is the last resort. */
  const pw = process.env.PLAYWRIGHT_BROWSERS_PATH || '/opt/pw-browsers';
  for (const f of safeDirs(pw)) {
    if (f.startsWith('ffmpeg')) cands.push(path.join(pw, f, 'ffmpeg-linux'));
  }

  let fallback = null;
  for (const bin of cands) {
    const e = encoders(bin);
    if (!e) continue;
    if (e.includes('libx264')) return { bin, mp4: true };
    if (!fallback) fallback = { bin, mp4: false };
  }
  return fallback;
}
function safeDirs(p) { try { return readdirSync(p); } catch { return []; } }

const FF = findFfmpeg();
if (!FF) { console.error('No usable ffmpeg found. Install one, or set $FFMPEG to its path.'); process.exit(1); }
if (!FF.mp4) {
  console.warn('!  The ffmpeg found cannot encode H.264, so this will write .webm (VP8).');
  console.warn('!  TikTok and Instagram will not accept that file. For .mp4, install a');
  console.warn('!  full ffmpeg (e.g. `pip install imageio-ffmpeg`) and run this again.\n');
}

function args(out) {
  const common = ['-y', '-f', 'image2pipe', '-c:v', FORMAT === 'png' ? 'png' : 'mjpeg',
                  '-framerate', String(FPS), '-i', 'pipe:0'];
  return FF.mp4
    ? [...common,
       '-c:v', 'libx264', '-preset', 'slow', '-crf', '17',
       '-pix_fmt', 'yuv420p',          /* required for QuickTime and phone players */
       '-profile:v', 'high', '-level', '4.2',
       '-movflags', '+faststart',      /* metadata first, so it streams immediately */
       '-r', String(FPS), out]
    : [...common,
       '-c:v', 'libvpx', '-b:v', '8M', '-crf', '8', '-qmin', '0', '-qmax', '32',
       '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p',
       '-r', String(FPS), out];
}

/* ---------------------------------------------------------------- serve */
const ROOT = path.join(HERE, '..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try {
    const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    const st = await stat(file);
    const target = st.isDirectory() ? path.join(file, 'index.html') : file;
    res.writeHead(200, { 'content-type': TYPES[path.extname(target)] || 'application/octet-stream',
                         'cache-control': 'no-store' });
    res.end(await readFile(target));
  } catch { res.writeHead(404).end(); }
});
const PORT = await new Promise(res => server.listen(0, () => res(server.address().port)));

/* --------------------------------------------------------------- render */
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ args: ['--force-color-profile=srgb', '--disable-lcd-text'] });

for (const cut of CUTS) {
  const src = path.join(HERE, cut.file);
  if (!existsSync(src)) { console.error(`missing ${src}`); continue; }
  const url = `http://localhost:${PORT}/promo/${cut.file}?render=1`;
  const out = path.join(OUT, cut.name + (FF.mp4 ? '.mp4' : '.webm'));

  const page = await browser.newPage({
    viewport: { width: cut.w, height: cut.h },
    deviceScaleFactor: 1
  });
  page.on('pageerror', e => console.error('  page error:', e.message));

  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(
    () => document.documentElement.dataset.reelReady === '1' || document.documentElement.dataset.reelError === '1',
    { timeout: 60000 });
  if (await page.evaluate(() => document.documentElement.dataset.reelError === '1')) {
    throw new Error(`${cut.file} could not load its footage — run: node promo/capture.mjs --profile ${cut.profile}`);
  }

  const duration = await page.evaluate(() => window.__reel.duration);
  const frames = Math.round(duration * FPS);

  console.log(`\n${cut.name}  ${cut.w}x${cut.h}  ${cut.label}`);
  console.log(`  ${duration.toFixed(1)}s at ${FPS} fps = ${frames} frames (${FORMAT}) -> ${path.relative(process.cwd(), out)}`);

  const ff = spawn(FF.bin, args(out), { stdio: ['pipe', 'ignore', 'pipe'] });
  let ffErr = '';
  ff.stderr.on('data', d => { ffErr += d.toString(); if (ffErr.length > 8000) ffErr = ffErr.slice(-8000); });
  const done = new Promise((res, rej) => {
    ff.on('close', c => c === 0 ? res() : rej(new Error(`ffmpeg exited ${c}\n${ffErr}`)));
    ff.on('error', rej);
  });

  const started = Date.now();
  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.__reel.seek(t), i / FPS);
    const png = await page.screenshot(SHOT);
    /* Respect backpressure, or a slow encoder balloons memory. */
    if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r));

    if (i % 120 === 0 || i === frames - 1) {
      const pct = ((i + 1) / frames * 100).toFixed(0).padStart(3);
      const rate = (i + 1) / ((Date.now() - started) / 1000);
      const eta = Math.round((frames - i - 1) / rate);
      process.stdout.write(`\r  ${pct}%  ${(i + 1)}/${frames} frames  ${rate.toFixed(1)} fps  eta ${eta}s   `);
    }
  }
  ff.stdin.end();
  await done;
  await page.close();

  const size = statSync(out).size;
  console.log(`\r  done in ${Math.round((Date.now() - started) / 1000)}s  ${(size / 1e6).toFixed(1)} MB${' '.repeat(24)}`);
}

await browser.close();
server.close();
console.log(`\nWritten to ${OUT}`);
