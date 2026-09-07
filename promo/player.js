/* =====================================================================
   Shell glue shared by landscape.html and vertical.html.

   Preview mode  : scales the fixed-size stage to fit the window and plays
                   the timeline from requestAnimationFrame.
                   Space / click toggles play-pause, arrows scrub, home
                   rewinds, and it loops.
   Render mode   : `?render=1` — no scaling, no autoplay, no chrome. The
                   stage sits at its natural pixel size and render.mjs
                   drives the timeline itself.

   Both must be served over http (the reel fetches its footage manifest),
   not opened from the filesystem. `node promo/serve.mjs` does that.
   ===================================================================== */
(function () {
  'use strict';

  var qs = new URLSearchParams(location.search);
  var RENDER = qs.get('render') === '1';
  var variant = document.body.getAttribute('data-variant') === 'vert' ? 'vert' : 'land';
  var profile = document.body.getAttribute('data-profile') || 'desktop';

  var stage = document.getElementById('stage');
  var fit = document.getElementById('fit');

  function fail(msg) {
    stage.innerHTML = '<div style="position:absolute;inset:0;display:flex;align-items:center;' +
      'justify-content:center;text-align:center;padding:3em;font:600 20px/1.6 system-ui;color:#1C2030;">' +
      '<div><div style="font-size:34px;margin-bottom:12px;">No footage yet</div>' +
      '<div style="font-weight:400;color:#6B7280;">' + msg + '</div></div></div>';
    document.documentElement.setAttribute('data-reel-error', '1');
  }

  PromoReel.mount(stage, variant, profile).then(function () {
    var DUR = PromoReel.duration;
    window.__reel = {
      duration: DUR,
      seek: function (t) { return PromoReel.seekAsync(t); },
      scenes: PromoReel.scenes()
    };

    /* The logo and fonts must be in before the first frame is measured. */
    var waits = [];
    if (document.fonts) {
      ['800 16px "JetBrains Mono"', '700 16px "JetBrains Mono"',
       '800 16px Inter', '700 16px Inter', '400 16px Inter']
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

    return Promise.all(waits)
      .then(function () {
        /* Captions measure differently once the webfonts are live, so size
           the footage windows again before the first frame. */
        PromoReel.relayout();
        return PromoReel.seekAsync(0);
      })
      .then(function () {
        document.documentElement.setAttribute('data-reel-ready', '1');
        if (!RENDER) start(DUR);
      });
  }).catch(function (e) {
    fail(e && e.message ? e.message : String(e));
  });

  if (RENDER) { document.body.classList.add('rendering'); return; }

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

  function start(DUR) {
    playing = true; last = 0;
    requestAnimationFrame(function frame(now) {
      if (playing) {
        if (last) t += (now - last) / 1000;
        last = now;
        if (t >= DUR) t = 0;
        PromoReel.seek(t);
      } else { last = now; }
      requestAnimationFrame(frame);
    });

    function toggle() { playing = !playing; last = 0; }
    function nudge(d) { playing = false; t = Math.max(0, Math.min(DUR, t + d)); PromoReel.seek(t); }
    document.addEventListener('click', toggle);
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Space') { e.preventDefault(); toggle(); }
      else if (e.code === 'ArrowRight') { e.preventDefault(); nudge(1); }
      else if (e.code === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
      else if (e.code === 'Home') { e.preventDefault(); playing = false; t = 0; PromoReel.seek(0); }
    });
  }
})();
