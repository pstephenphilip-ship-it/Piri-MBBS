/* =====================================================================
   DoctoRise promo reel — timeline engine.

   Each scene shows real footage of the site (recorded by capture.mjs into
   promo/shots/<profile>/<clip>/) inside a browser window or a phone, with
   the script set around it.

   Timing is a pure function of the timeline position. `seekAsync(t)`
   decodes the exact footage frame for `t`, draws it, and writes every
   animated property — nothing depends on the previous frame or on how
   fast the caller is walking the timeline. That is what lets render.mjs
   capture at whatever speed the machine manages and still produce the
   frames real-time playback would show.

   Frames are decoded on demand and kept in a small LRU rather than
   preloaded: a whole clip of decoded bitmaps runs to over a gigabyte.
   ===================================================================== */
(function (root) {
  'use strict';

  var D = root.REEL_DATA;
  var OVERLAP = 0.45;        /* seconds of crossfade between scenes */
  var CACHE_MAX = 48;        /* decoded footage frames held at once  */

  /* ------------------------------------------------------------- maths */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function c01(v) { return clamp(v, 0, 1); }
  function p(u, s, d) { return c01((u - s) / d); }
  function easeOut(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function beat(u, s, d) { return easeOut(p(u, s, d)); }
  function easeBack(x) { var c = 2.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }

  /* ---------------------------------------------------------------- dom */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) parent.appendChild(arguments[i]);
    return parent;
  }
  function rise(node, prog, dy) {
    node.style.opacity = prog;
    node.style.transform = 'translateY(' + ((1 - prog) * (dy == null ? 22 : dy)) + 'px)';
  }

  /* ============================================================ footage */
  /* An LRU of decoded frames, keyed "clip/index". */
  var cache = new Map();
  function cacheGet(key) {
    var v = cache.get(key);
    if (v) { cache.delete(key); cache.set(key, v); }   /* refresh recency */
    return v;
  }
  function cachePut(key, img) {
    cache.set(key, img);
    while (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value);
  }

  var built = null;

  function framePath(clip, i) {
    return 'shots/' + built.profile + '/' + clip + '/' + String(i).padStart(5, '0') + '.jpg';
  }

  function loadFrame(clip, i) {
    var key = clip + '/' + i;
    var hit = cacheGet(key);
    if (hit) return Promise.resolve(hit);
    return new Promise(function (res) {
      var img = new Image();
      img.onload = function () {
        var done = img.decode ? img.decode().catch(function () {}) : Promise.resolve();
        done.then(function () { cachePut(key, img); res(img); });
      };
      /* A missing frame should freeze on the last good one, not blow up. */
      img.onerror = function () { res(null); };
      img.src = framePath(clip, i);
    });
  }

  /* ============================================================== build */
  function sceneNode(def, mf) {
    var node = el('section', 'scene');
    node.setAttribute('data-scene', def.id);

    var cap = el('div', 'cap');
    var k = def.kicker ? el('div', 'kicker', def.kicker) : null;
    var h = el('h2', 'headline', def.line);
    var s = def.sub ? el('div', 'subline', def.sub) : null;
    if (k) cap.appendChild(k);
    cap.appendChild(h);
    if (s) cap.appendChild(s);

    var refs = { node: node, cap: cap, k: k, h: h, s: s, def: def };

    /* The module scenes carry a strip naming all three, current one lit. */
    if (def.module != null) {
      var strip = el('div', 'mods');
      refs.mods = D.MODULES.map(function (m, i) {
        var n = el('div', 'mod' + (i === def.module ? ' on' : ''));
        add(n, el('span', 'n', m.n.toLocaleString('en-GB')), el('span', null, m.label));
        strip.appendChild(n);
        return n;
      });
      refs.strip = strip;
    }

    if (def.clip) {
      var info = mf.clips[def.clip];
      var cv = el('canvas', built.variant === 'vert' ? 'phone-shot' : 'win-shot');
      cv.width = mf.w; cv.height = mf.h;
      refs.canvas = cv;
      refs.ctx = cv.getContext('2d', { alpha: false });
      refs.frames = info ? info.frames : 0;

      if (built.variant === 'vert') {
        var ph = el('div', 'phone');
        var scr = el('div', 'phone-screen');
        scr.appendChild(cv);
        ph.appendChild(scr);
        refs.shell = ph;
      } else {
        var win = el('div', 'win');
        var bar = el('div', 'win-bar');
        var dots = el('div', 'win-dots');
        add(dots, el('i'), el('i'), el('i'));
        add(bar, dots, el('div', 'win-url', D.SITE_URL || 'doctorise.co.uk'));
        add(win, bar, cv);
        refs.shell = win;
      }
    } else {
      /* Title card: logo, wordmark, tagline, address. */
      var logo = el('img', 'hero-logo'); logo.src = D.BRAND.logo; logo.alt = '';
      var mark = el('div', 'wordmark', D.BRAND.name);
      mark.style.marginTop = '0.35em';
      var tag = el('div', 'outro-tag', D.BRAND.tagline);
      refs.card = [logo, mark, tag];
      if (D.SITE_URL) refs.card.push(el('div', 'outro-url', D.SITE_URL));
    }

    if (refs.card) refs.card.forEach(function (n) { node.appendChild(n); });
    else {
      node.appendChild(cap);
      if (refs.strip) { refs.strip.style.marginTop = '1.3em'; node.appendChild(refs.strip); }
      refs.shell.style.marginTop = refs.strip ? '0.2em' : '1.6em';
      node.appendChild(refs.shell);
    }
    return refs;
  }

  function drawScene(r, u, dur) {
    if (r.card) {
      var lp = beat(u, 0, 0.85);
      r.card[0].style.opacity = lp;
      r.card[0].style.transform = 'scale(' + (0.88 + 0.12 * easeBack(p(u, 0, 0.85))) + ')';
      rise(r.card[1], beat(u, 0.35, 0.75), 18);
      rise(r.card[2], beat(u, 0.7, 0.75), 14);
      if (r.card[3]) rise(r.card[3], beat(u, 1.1, 0.75), 14);
      return;
    }
    if (r.k) rise(r.k, beat(u, 0, 0.6), 14);
    rise(r.h, beat(u, 0.1, 0.7), 20);
    if (r.s) rise(r.s, beat(u, 0.3, 0.7), 16);
    if (r.strip) {
      rise(r.strip, beat(u, 0.34, 0.65), 16);
      r.mods.forEach(function (n, i) { rise(n, beat(u, 0.4 + i * 0.07, 0.5), 12); });
    }
    /* The window lifts in, then holds — it is the subject, so it stays still. */
    var wp = beat(u, 0.22, 0.85);
    r.shell.style.opacity = wp;
    r.shell.style.transform = 'translateY(' + ((1 - wp) * 34) + 'px) scale(' + (0.985 + 0.015 * wp) + ')';
  }


  /* Size every footage shell so the whole window (or phone) fits between the
     caption and the bottom of the frame. Done once, after the scenes are in
     the DOM and the fonts have settled, so it is stable for every frame. */
  function fitShells() {
    var stage = built.stage;
    var stageH = stage.clientHeight, stageW = stage.clientWidth;
    var ar = built.mf.h / built.mf.w;
    built.scenes.forEach(function (s) {
      if (!s.shell || !s.canvas) return;
      var cs = getComputedStyle(s.node);
      var padV = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      var padH = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
      var above = s.cap.offsetHeight + (s.strip ? s.strip.offsetHeight + parseFloat(getComputedStyle(s.strip).marginTop) : 0);
      var gap = parseFloat(getComputedStyle(s.shell).marginTop) || 0;
      var availH = stageH - padV - above - gap;
      var availW = stageW - padH;
      /* Chrome is the title bar / phone bezel — constant, so measure it once. */
      var chromeH = s.shell.offsetHeight - s.canvas.offsetHeight;
      var chromeW = s.shell.offsetWidth - s.canvas.offsetWidth;
      var w = Math.min(availW, (availH - chromeH - 4) / ar + chromeW);
      s.shell.style.width = Math.max(120, Math.floor(w)) + 'px';
    });
  }

  /* ============================================================== mount */
  function mount(stage, variant, profile) {
    built = { stage: stage, variant: variant, profile: profile };
    stage.className = 'stage ' + (variant === 'vert' ? 'vert' : 'land');
    stage.innerHTML = '';

    return fetch('shots/' + profile + '/manifest.json')
      .then(function (r) {
        if (!r.ok) throw new Error('no manifest');
        return r.json();
      })
      .catch(function () {
        throw new Error('Footage missing. Run:  node promo/capture.mjs --profile ' + profile);
      })
      .then(function (mf) {
        built.mf = mf;
        built.fps = mf.fps || 30;

        var glowA = el('div', 'glow glow-a');
        var glowB = el('div', 'glow glow-b');
        add(stage, glowA, glowB, el('div', 'grid-bg'));

        var start = 0;
        built.scenes = D.SCENES.map(function (def) {
          var refs = sceneNode(def, mf);
          stage.appendChild(refs.node);
          var info = def.clip ? mf.clips[def.clip] : null;
          var dur = def.clip
            ? (info ? info.frames / built.fps : 3) + (def.hold || 0)
            : (def.dur || 4.5);
          refs.start = start;
          refs.dur = dur;
          start += dur - OVERLAP;
          return refs;
        });
        built.duration = start + OVERLAP;

        fitShells();

        var wm = el('div', 'watermark');
        var wimg = el('img'); wimg.src = D.BRAND.logo; wimg.alt = '';
        add(wm, wimg, el('span', null, D.BRAND.name));
        var pbar = el('div', 'pbar');
        add(stage, wm, pbar);
        built.glowA = glowA; built.glowB = glowB; built.wm = wm; built.pbar = pbar;

        return seekAsync(0);
      });
  }

  /* ============================================================== seek */
  function layout(t) {
    var b = built;
    t = clamp(t, 0, b.duration);

    var w = b.stage.clientWidth, h = b.stage.clientHeight;
    b.glowA.style.left = (w * (0.22 + 0.18 * Math.sin(t * 0.19)) - 380) + 'px';
    b.glowA.style.top = (h * (0.26 + 0.14 * Math.cos(t * 0.16)) - 380) + 'px';
    b.glowB.style.left = (w * (0.78 + 0.16 * Math.cos(t * 0.14)) - 330) + 'px';
    b.glowB.style.top = (h * (0.72 + 0.12 * Math.sin(t * 0.21)) - 330) + 'px';

    var active = null;
    b.scenes.forEach(function (s, i) {
      var u = t - s.start;
      if (u < -0.02 || u > s.dur + 0.02) {
        if (s.node.style.visibility !== 'hidden') { s.node.style.opacity = 0; s.node.style.visibility = 'hidden'; }
        return;
      }
      s.node.style.visibility = 'visible';
      s.node.style.zIndex = 10 + i;
      var fin = easeInOut(c01(u / OVERLAP));
      var fout = 1 - easeInOut(c01((u - (s.dur - OVERLAP)) / OVERLAP));
      s.node.style.opacity = fin * fout;
      drawScene(s, u, s.dur);
      if (!active || fin * fout > active.w) active = { s: s, u: u, w: fin * fout };
    });

    var last = b.scenes[b.scenes.length - 1];
    var wmP = easeInOut(c01((t - 5.4) / 0.7)) * (1 - easeInOut(c01((t - (last.start - 0.3)) / 0.5)));
    b.wm.style.opacity = wmP * 0.9;
    b.wm.style.transform = 'translateY(' + ((1 - wmP) * -12) + 'px)';
    b.pbar.style.width = (100 * t / b.duration) + '%';

    return t;
  }

  /* Which footage frame each visible scene needs at time t. */
  function wanted(t) {
    var out = [];
    built.scenes.forEach(function (s) {
      if (!s.frames) return;
      var u = t - s.start;
      if (u < -0.02 || u > s.dur + 0.02) return;
      out.push({ s: s, i: clamp(Math.round(u * built.fps), 0, s.frames - 1) });
    });
    return out;
  }

  function paint(job, img) {
    if (!img) return;
    job.s.ctx.drawImage(img, 0, 0, job.s.canvas.width, job.s.canvas.height);
  }

  /* Async because a footage frame may still need decoding. The renderer
     awaits this; live preview fires it and lets it land when it lands. */
  function seekAsync(t) {
    if (!built || !built.scenes) return Promise.resolve();
    t = layout(t);
    var jobs = wanted(t);
    return Promise.all(jobs.map(function (j) {
      return loadFrame(j.s.def.clip, j.i).then(function (img) { paint(j, img); });
    }));
  }

  /* Synchronous variant for scrubbing: draws whatever is already decoded. */
  function seek(t) {
    if (!built || !built.scenes) return;
    t = layout(t);
    wanted(t).forEach(function (j) {
      var img = cacheGet(j.s.def.clip + '/' + j.i);
      if (img) paint(j, img);
      else loadFrame(j.s.def.clip, j.i).then(function (im) { paint(j, im); });
    });
  }

  root.PromoReel = {
    mount: mount,
    /* Re-run the fit once webfonts are active — caption heights change. */
    relayout: function () { if (built && built.scenes) fitShells(); },
    seek: seek,
    seekAsync: seekAsync,
    get duration() { return built ? built.duration : 0; },
    scenes: function () {
      return built && built.scenes ? built.scenes.map(function (s) {
        return { id: s.def.id, start: s.start, dur: s.dur, clip: s.def.clip || null };
      }) : [];
    }
  };
})(window);
