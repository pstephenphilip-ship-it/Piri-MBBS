/* =====================================================================
   Shell glue shared by landscape.html and vertical.html.

   Preview mode  : scales the fixed-size stage down to fit the window and
                   plays the timeline from requestAnimationFrame.
                   Space / click toggles play-pause, ← → scrub 1s,
                   and it loops.
   Render mode   : `?render=1` — no scaling, no autoplay, no chrome. The
                   stage sits at exactly its natural pixel size and the
                   renderer drives seek() itself.
   ===================================================================== */
(function () {
  'use strict';

  var qs = new URLSearchParams(location.search);
  var RENDER = qs.get('render') === '1';
  var variant = document.body.getAttribute('data-variant') === 'vert' ? 'vert' : 'land';

  var stage = document.getElementById('stage');
  var fit = document.getElementById('fit');

  PromoReel.mount(stage, variant);
  var DUR = PromoReel.duration;

  /* ------------------------------------------------- render-mode hooks */
  window.__reel = {
    duration: DUR,
    seek: function (t) { PromoReel.seek(t); },
    scenes: PromoReel.scenes()
  };

  function markReady() { document.documentElement.setAttribute('data-reel-ready', '1'); }

  /* Fonts and the logo must be in before the first frame is measured, or
     scene 2's scroll distance and scene 3's highlight widths come out wrong. */
  var waits = [];
  if (document.fonts) {
    /* Ask for the exact faces the reel draws with; `fonts.ready` alone can
       resolve before a face nothing has painted yet is fetched. */
    ['800 16px "JetBrains Mono"', '700 16px "JetBrains Mono"', '400 16px "JetBrains Mono"',
     '800 16px Inter', '700 16px Inter', '600 16px Inter', '400 16px Inter', '300 16px Inter']
      .forEach(function (f) { waits.push(document.fonts.load(f)); });
    waits.push(document.fonts.ready);
  }
  Array.prototype.forEach.call(document.images, function (img) {
    if (img.complete) return;
    waits.push(new Promise(function (res) {
      img.addEventListener('load', res, { once: true });
      img.addEventListener('error', res, { once: true });
    }));
  });

  Promise.all(waits).then(function () {
    /* Re-seek once metrics are final so any lazily measured value is right. */
    PromoReel.seek(0);
    markReady();
    if (!RENDER) start();
  });

  if (RENDER) {
    document.body.classList.add('rendering');
    return;
  }

  /* ------------------------------------------------------- preview fit */
  function resize() {
    var sw = stage.offsetWidth, sh = stage.offsetHeight;
    var k = Math.min(window.innerWidth / sw, window.innerHeight / sh);
    fit.style.transform = 'scale(' + k + ')';
    fit.style.width = sw + 'px';
    fit.style.height = sh + 'px';
    fit.style.marginLeft = (-sw / 2) + 'px';
    fit.style.marginTop = (-sh / 2) + 'px';
  }
  window.addEventListener('resize', resize);
  resize();

  /* ---------------------------------------------------------- playback */
  var t = 0, playing = false, last = 0;

  function frame(now) {
    if (playing) {
      if (last) t += (now - last) / 1000;
      last = now;
      if (t >= DUR) t = 0;          /* loop */
      PromoReel.seek(t);
    } else {
      last = now;
    }
    requestAnimationFrame(frame);
  }
  function start() { playing = true; last = 0; requestAnimationFrame(frame); }

  function toggle() { playing = !playing; last = 0; }
  function nudge(d) { playing = false; t = Math.max(0, Math.min(DUR, t + d)); PromoReel.seek(t); }

  document.addEventListener('click', toggle);
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    else if (e.code === 'ArrowRight') { e.preventDefault(); nudge(1); }
    else if (e.code === 'ArrowLeft')  { e.preventDefault(); nudge(-1); }
    else if (e.code === 'Home') { e.preventDefault(); playing = false; t = 0; PromoReel.seek(0); }
  });
})();
