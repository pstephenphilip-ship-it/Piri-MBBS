# DoctoRise promo reel

A 77-second promotional video for the site, in two cuts:

| Cut | Size | For |
|---|---|---|
| `landscape.html` | 1920 × 1080 | YouTube, a site hero, presentations |
| `vertical.html` | 1080 × 1920 | TikTok, Instagram Reels, YouTube Shorts |

Both cuts run the same script and the same data — they are not crops of each
other. Each scene reflows: the split screen is three columns wide and three
rows tall, the note and its annotation sit side by side wide and stacked tall.

Every number is measured from the live app, and the sample note, question,
card, differentials and lab values are real content lifted from real
topics — not invented filler. `node promo/count.js` re-measures the counts
and flags drift.

The palette is the site's own: light grey ground, white cards, dark navy
ink, teal accents, and the mint the review modal uses. The note composer
in the "Add your own notes" scene is laid out field for field like the
real one, down to the amber accent and the quoted selection.

## Preview it

Open `promo/landscape.html` in a browser. It scales to fit the window and
loops.

- **click** or **space** — play / pause
- **← →** — scrub a second
- **home** — back to the start

## Render it to video

```sh
cd promo
npm install                 # playwright, once
node render.mjs             # both cuts, 30 fps, into promo/out/
```

Other options:

```sh
node render.mjs --only vertical      # just the 9:16 cut
node render.mjs --fps 60             # smoother, twice the frames
node render.mjs --format png         # lossless frames, about 3x slower
node render.mjs --out ~/Desktop      # write somewhere else
```

A render takes roughly 5 minutes per cut at 30 fps. Output is H.264 in an
`.mp4`, `yuv420p` with `faststart`, which is what TikTok, Instagram, YouTube
and Keynote all want.

**ffmpeg** is found automatically: `$FFMPEG`, then `ffmpeg` on your `PATH`,
then the binary inside the `imageio-ffmpeg` Python package, then Playwright's
bundled copy. The first one that can encode H.264 wins. Playwright's copy
*cannot* — it only does VP8 — so if that is all you have, you get a `.webm`
and a warning, and social platforms will reject the upload. Fix it with:

```sh
pip install imageio-ffmpeg      # or install ffmpeg properly
```

## Change what it says

Almost everything is in **`reel-data.js`**: the headline for each scene, the
counts, the sample note, flashcard, MCQ, differentials and lab values. Edit
there and re-render — you should not need to touch the engine.

Two things worth knowing:

- Note lines in the `NOTE.lines` array must each fit on one line in the
  landscape cut; a wrapped line drags its highlight sweep across two rows.
  Keep them at roughly the length of the ones already there.
- Quote real sentences from the site rather than paraphrasing — the point
  of the scene is that this is the actual content.
- `investigations` is quoted as 195, matching the app's own home tile.
  `count.js` measures it the same way deliberately: the reel should never
  contradict a figure the site puts on screen.

Scene order, durations and motion live in **`reel.js`**, in the `SCENES`
array. Each scene is `{ id, dur, build(), draw() }` — `build` makes the DOM
once, `draw` is handed the seconds elapsed within that scene and writes the
animated properties.

## Why it is built this way

The whole reel is a pure function of time: `PromoReel.seek(t)` writes every
animated property for timeline position `t`, and nothing depends on the
previous frame. There are no CSS transitions or keyframes anywhere.

That is what makes the render exact. `render.mjs` walks the timeline one
frame at a time and screenshots each position, so a capture that takes five
minutes of wall clock produces precisely the frames real-time playback would
show — no dropped frames, no timing drift, and the same bytes on any machine.
It is also why the fonts are vendored into `fonts/` rather than loaded from
Google: a font arriving mid-render would change the layout half way through.

## Files

```
reel-data.js    copy, counts and sample content   <- edit this
reel.js         timeline engine and the scenes
reel.css        styling for both aspect ratios
player.js       preview playback + the render hook
landscape.html  1920x1080 shell
vertical.html   1080x1920 shell
render.mjs      frames -> ffmpeg -> mp4
count.js        re-measure the counts from the app
fonts/          vendored Inter + JetBrains Mono
```
