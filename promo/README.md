# DoctoRise promo reel

A promotional video for the site, in two cuts:

| Cut | Size | Shows | For |
|---|---|---|---|
| `landscape.html` | 1920 × 1080 | the desktop site in a browser window | YouTube, a site hero, presentations |
| `vertical.html` | 1080 × 1920 | the mobile site in a phone | TikTok, Instagram Reels, Shorts |

**Everything on screen is the real site.** The reel does not recreate the
UI — `capture.mjs` drives the actual app with real mouse input (a real drag
to select text, which raises the app's own highlight bar; real clicks on
real buttons) and records it. The two cuts use separate recordings at
desktop and phone widths, so the vertical cut shows the genuine mobile
layout rather than a cropped desktop one.

Every figure quoted is measured from the app, not written by hand.
`node promo/count.js` re-measures and flags drift.

## Make the video

```sh
cd promo
npm install                 # playwright, once
node capture.mjs            # record the site  (~8 min, both profiles)
node render.mjs             # encode both cuts (~5 min each)
```

Output lands in `promo/out/` as H.264 `.mp4`, `yuv420p` with `faststart` —
what TikTok, Instagram, YouTube and Keynote all want.

Useful flags:

```sh
node capture.mjs --profile phone      # re-record one profile
node capture.mjs --only annotate      # re-record one clip
node render.mjs  --only vertical      # encode one cut
node render.mjs  --fps 60             # smoother, twice the frames
node render.mjs  --format png         # lossless frames, ~3x slower
```

`node serve.mjs` then opens `http://localhost:8899/promo/landscape.html`
to preview in a browser — click or space to play/pause, arrows to scrub,
home to rewind. It must be served over http, not opened from the
filesystem, because the page fetches its footage manifest.

**ffmpeg** is found automatically: `$FFMPEG`, then `ffmpeg` on your `PATH`,
then the binary inside the `imageio-ffmpeg` Python package, then
Playwright's bundled copy. The first that can encode H.264 wins.
Playwright's *cannot* — VP8 only — so if that is all you have you get a
`.webm` and a warning, and social platforms will reject it. Fix with
`pip install imageio-ffmpeg`, or install ffmpeg properly.

## Change what it says

The script is `reel-data.js` — one entry per scene, each naming the clip it
sits over:

```js
{ id: 'recall', clip: 'recall',
  line: 'Want to practise active recall?',
  sub: '<b>21,389</b> flashcards, graded the way you already revise.' }
```

Edit and re-render; no need to re-capture unless you want different
footage. `SITE_URL` sets both the address in the browser chrome and the
outro card.

To change what the footage *shows*, edit the matching clip in
`capture.mjs`, then re-record just that one with `--only <id>`.

## Why it is built this way

The reel is a pure function of time: `seekAsync(t)` decodes the exact
footage frame for position `t` and writes every animated property, with no
CSS transitions anywhere and no dependence on the previous frame.

So `render.mjs` walks the timeline one frame at a time and screenshots each
position — a five-minute capture yields precisely the frames real-time
playback would show, on any machine, with no dropped frames or timing
drift. `capture.mjs` disables the app's own transitions for the same
reason, and the fonts are vendored into `fonts/` rather than fetched from
Google so a late-arriving face cannot reflow the layout mid-render.

Footage frames are decoded on demand into a small LRU rather than
preloaded — a full clip of decoded bitmaps runs past a gigabyte.

## Files

```
reel-data.js    the script and the counts     <- edit this
capture.mjs     drives the real site, records frames
reel.js         timeline engine
reel.css        styling for both aspect ratios
player.js       preview playback + the render hook
landscape.html  1920x1080 shell  (desktop footage)
vertical.html   1080x1920 shell  (phone footage)
render.mjs      frames -> ffmpeg -> mp4
serve.mjs       static server for previewing
count.js        re-measure the counts from the app
fonts/          vendored Inter + JetBrains Mono
shots/          recorded footage — generated, not committed
out/            rendered video — generated, not committed
```

## Note on the recording

`capture.mjs` sets `window.__member = true` before recording so the footage
shows the product rather than the upgrade prompts. That only affects the
throwaway browser it drives; it changes nothing about the site.
