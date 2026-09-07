/* =====================================================================
   DoctoRise promo reel — timeline engine.

   The whole reel is one pure function of time. `PromoReel.seek(t)` writes
   every animated property for timeline position `t`; nothing depends on
   how the previous frame looked, on rAF deltas, or on CSS transitions.

   That is what lets render.mjs walk the timeline one frame at a time and
   screenshot each one: a 30 fps capture that takes four minutes of wall
   clock produces exactly the frames a real-time playback would show.

   Live preview (reel.html shells) drives the same seek() from rAF.
   ===================================================================== */
(function (root) {
  'use strict';

  var D = root.REEL_DATA;
  var OVERLAP = 0.5;          /* seconds of crossfade between scenes */

  /* ------------------------------------------------------------- maths */
  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
  function c01(v) { return clamp(v, 0, 1); }

  /* Raw 0..1 progress of a sub-beat starting at `start` lasting `dur`. */
  function p(u, start, dur) { return c01((u - start) / dur); }

  function easeOut(x)   { return 1 - Math.pow(1 - x, 3); }
  function easeInOut(x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function easeBack(x)  { var c = 1.70158 + 1; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }

  /* Eased sub-beat, the workhorse of every draw(). */
  function beat(u, start, dur)  { return easeOut(p(u, start, dur)); }
  function beatIO(u, start, dur){ return easeInOut(p(u, start, dur)); }

  function fmt(n) { return Math.round(n).toLocaleString('en-GB'); }

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

  /* Fade + rise, the default way anything enters. */
  function rise(node, prog, dy) {
    node.style.opacity = prog;
    node.style.transform = 'translateY(' + ((1 - prog) * (dy == null ? 26 : dy)) + 'px)';
  }
  /* Staggered variant for lists. */
  function riseEach(nodes, u, start, step, dur, dy) {
    for (var i = 0; i < nodes.length; i++) {
      rise(nodes[i], beat(u, start + i * step, dur), dy);
    }
  }

  /* Build a caption block (kicker + headline) used by most scenes. */
  function caption(key) {
    var c = D.COPY[key];
    var wrap = el('div', 'cap');
    var k = c.kicker ? el('div', 'kicker', c.kicker) : null;
    var h = el('h2', 'headline', c.line);
    if (k) wrap.appendChild(k);
    wrap.appendChild(h);
    wrap.__k = k; wrap.__h = h;
    return wrap;
  }
  function drawCaption(cap, u, start) {
    var s = start == null ? 0 : start;
    if (cap.__k) rise(cap.__k, beat(u, s, 0.7), 16);
    rise(cap.__h, beat(u, s + 0.12, 0.8), 24);
  }

  function panelShell(crumb) {
    var pn = el('div', 'panel');
    var head = el('div', 'panel-head');
    var dots = el('div', 'dots');
    add(dots, el('i'), el('i'), el('i'));
    add(head, dots, el('div', 'crumb', crumb));
    var body = el('div', 'panel-body');
    add(pn, head, body);
    pn.__body = body;
    return pn;
  }

  /* ================================================================
     SCENES
     Each: { id, dur, build(scene) -> refs, draw(refs, u) }
     `u` is seconds since the scene started.
     ================================================================ */
  var SCENES = [];

  /* --- 1. Hero: the numbers, counting up ------------------------- */
  SCENES.push({
    id: 'hero', dur: 7.0,
    build: function (scene) {
      var logo = el('img', 'hero-logo'); logo.src = D.BRAND.logo; logo.alt = '';
      var mark = el('div', 'wordmark', D.BRAND.name);
      var cap = caption('hero');
      cap.style.marginTop = '0.6em';

      var tiles = el('div', 'tiles');
      tiles.style.marginTop = '2.4em';
      var spec = [
        ['conditions', 'Conditions', '#00C2A8'],
        ['flashcards', 'Flashcards', '#A78BFA'],
        ['questions',  'Questions',  '#F0B429'],
        ['systems',    'Systems',    '#FF6B6B']
      ];
      var nodes = spec.map(function (s) {
        var t = el('div', 'tile');
        var n = el('div', 'n', '0'); n.style.color = s[2];
        add(t, n, el('div', 'l', s[1]));
        tiles.appendChild(t);
        return { tile: t, n: n, target: D.STATS[s[0]] };
      });

      add(scene, logo, mark, cap, tiles);
      return { logo: logo, mark: mark, cap: cap, tiles: nodes };
    },
    draw: function (r, u) {
      var lp = beat(u, 0, 0.9);
      r.logo.style.opacity = lp;
      r.logo.style.transform = 'scale(' + (0.8 + 0.2 * easeBack(p(u, 0, 0.9))) + ')';
      rise(r.mark, beat(u, 0.45, 0.8), 20);
      drawCaption(r.cap, u, 0.85);
      r.tiles.forEach(function (t, i) {
        var s = 1.5 + i * 0.14;
        rise(t.tile, beat(u, s, 0.7), 30);
        /* Count up over 2.2s, easing out so it decelerates onto the number. */
        t.n.textContent = fmt(t.target * easeOut(p(u, s + 0.1, 2.2)));
      });
    }
  });

  /* --- 2. Every system, scrolled ---------------------------------- */
  SCENES.push({
    id: 'systems', dur: 8.0,
    build: function (scene) {
      var cap = caption('systems');
      var wrap = el('div', 'syslist-wrap');
      wrap.style.marginTop = '2.4em';
      var list = el('div', 'syslist');
      D.SYSTEMS.forEach(function (s) {
        var row = el('div', 'sysrow');
        add(row, el('div', 'bar'), el('div', 'nm', s[0]), el('div', 'ct', s[1]));
        list.appendChild(row);
      });
      wrap.appendChild(list);
      add(scene, cap, wrap);
      return { cap: cap, wrap: wrap, list: list, span: null };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.wrap, beat(u, 0.9, 0.8), 30);
      /* Measured once; fonts are loaded before the first seek so it is stable. */
      if (r.span == null) r.span = Math.max(0, r.list.scrollHeight - r.wrap.clientHeight);
      /* Ease the scroll in and out so it never starts or stops abruptly. */
      r.list.style.transform = 'translateY(' + (-r.span * beatIO(u, 1.5, 5.6)) + 'px)';
    }
  });

  /* --- 3. Highlight + annotate ------------------------------------ */
  SCENES.push({
    id: 'annotate', dur: 7.5,
    build: function (scene) {
      var cap = caption('annotate');
      var pn = panelShell(D.NOTE.breadcrumb);
      pn.style.marginTop = '2.2em';
      pn.style.width = '100%';
      pn.style.maxWidth = '44em';

      var body = pn.__body;
      body.style.position = 'relative';
      body.appendChild(el('div', 'note-title', D.NOTE.title));

      var lines = D.NOTE.lines.map(function (ln) {
        var w = el('div');
        var span = el('span', 'note-line');
        var hl = el('span', 'hl' + (ln.hl ? ' hl-' + ln.hl : ''));
        add(span, hl, el('span', 'tx', ln.text));
        w.appendChild(span);
        body.appendChild(w);
        return { row: w, span: span, hl: ln.hl ? hl : null };
      });

      body.classList.add('has-palette');
      var sw = el('div', 'swatches');
      sw.appendChild(el('div', 'lb', 'Highlight'));
      var swi = ['#F0B429', '#34C759', '#3896FF', '#FF6394'].map(function (c) {
        var i = el('i'); i.style.background = c; sw.appendChild(i); return i;
      });
      body.appendChild(sw);

      var an = el('div', 'annot');
      var anTx = el('div');
      add(anTx, el('div', 'annot-lb', 'Your annotation'), el('div', null, D.NOTE.annotation));
      add(an, el('div', 'pin', '✎'), anTx);

      var row = el('div', 'annot-row');
      add(row, pn, an);
      add(scene, cap, row);
      return { cap: cap, pn: pn, lines: lines, sw: sw, swi: swi, an: an, w: [] };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.pn, beat(u, 0.7, 0.8), 30);
      r.an.parentNode.style.opacity = 1;
      riseEach(r.lines.map(function (l) { return l.row; }), u, 1.1, 0.07, 0.5, 12);

      /* The two highlight sweeps, drawn as a width that grows across the text. */
      var marks = [];
      r.lines.forEach(function (l, i) { if (l.hl) marks.push({ l: l, i: i }); });
      var times = [1.9, 3.3];
      marks.forEach(function (m, k) {
        if (r.w[k] == null) r.w[k] = m.l.span.offsetWidth + 7;
        m.l.hl.style.width = (r.w[k] * beatIO(u, times[k], 0.75)) + 'px';
      });

      /* The palette sits in the note's gutter and lights up the colour in use —
         parked there rather than beside the selection so it never covers text. */
      var ai = u < 3.15 ? 0 : 3;   /* yellow, then pink */
      r.swi.forEach(function (i, k) {
        var on = k === ai;
        i.style.transform = 'scale(' + (on ? 1.28 : 1) + ')';
        i.style.opacity = on ? 1 : 0.32;
        i.style.boxShadow = on ? '0 0 0 0.16em rgba(255,255,255,0.22)' : 'none';
      });
      var swIn = beat(u, 1.9, 0.4);
      r.sw.style.opacity = swIn;
      r.sw.style.transform = 'scale(' + (0.86 + 0.14 * swIn) + ')';

      /* Slides in from the side it lives on, so it reads as attached to the
         highlight rather than dropped on top of it. */
      var ap = beat(u, 4.4, 0.75);
      r.an.style.opacity = ap;
      r.an.style.transform = 'translateX(' + ((1 - ap) * 34) + 'px) scale(' + (0.96 + 0.04 * ap) + ')';
    }
  });

  /* --- 4. Your own notes ------------------------------------------ */
  /* Laid out field for field like the site's own composer: amber accent,
     the quoted selection, the note box, then Cancel / Save note. */
  SCENES.push({
    id: 'mynotes', dur: 6.5,
    build: function (scene) {
      var cap = caption('mynotes');
      var pn = panelShell(D.MYNOTE.breadcrumb);
      pn.style.marginTop = '2.2em';
      pn.style.width = '100%';
      pn.style.maxWidth = '40em';
      pn.__body.style.display = 'flex';
      pn.__body.style.justifyContent = 'center';

      var nc = el('div', 'nc');
      nc.appendChild(el('div', 'nc-accent'));

      var head = el('div', 'nc-head');
      add(head, el('div', 'nc-dot'), el('div', 'nc-label', D.MYNOTE.label), el('div', 'nc-x', '\u00d7'));
      nc.appendChild(head);

      nc.appendChild(el('div', 'nc-quote', '\u201c' + D.MYNOTE.quote + '\u201d'));

      var body = el('div', 'nc-body');
      var ta = el('div', 'nc-ta empty');
      var car = el('span', 'caret');
      body.appendChild(ta);
      nc.appendChild(body);
      nc.appendChild(el('div', 'nc-hint', D.MYNOTE.hint));

      var foot = el('div', 'nc-foot');
      var cancel = el('div', 'nc-cancel', D.MYNOTE.cancel);
      var save = el('div', 'nc-save', D.MYNOTE.save);
      add(foot, cancel, save);
      nc.appendChild(foot);

      pn.__body.appendChild(nc);
      add(scene, cap, pn);
      return { cap: cap, pn: pn, nc: nc, ta: ta, car: car, save: save };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.pn, beat(u, 0.7, 0.8), 30);

      var bp = p(u, 1.5, 2.6);
      var n = Math.round(D.MYNOTE.body.length * bp);
      if (n === 0) {
        r.ta.className = 'nc-ta empty';
        r.ta.textContent = D.MYNOTE.placeholder;
      } else {
        r.ta.className = 'nc-ta';
        r.ta.textContent = D.MYNOTE.body.slice(0, n);
        r.ta.appendChild(r.car);
      }
      /* Blink derived from u, never from a wall clock. */
      var typing = u > 1.4 && u < 4.6;
      r.car.style.opacity = typing ? (Math.floor(u * 2) % 2 ? 0.25 : 1) : 0;

      /* Save lights up once there is something to save. */
      var sp = beat(u, 4.5, 0.5);
      r.save.style.transform = 'scale(' + (1 + 0.06 * Math.sin(sp * Math.PI)) + ')';
      r.save.style.boxShadow = sp > 0.02
        ? '0 0 ' + (22 * sp) + 'px rgba(0,194,168,' + (0.5 * sp) + ')' : 'none';
    }
  });

  /* --- 5. Active recall ------------------------------------------- */
  SCENES.push({
    id: 'recall', dur: 8.5,
    build: function (scene) {
      var cap = caption('recall');
      var stack = el('div');
      stack.style.cssText = 'margin-top:2.2em;width:100%;max-width:34em;display:flex;flex-direction:column;align-items:center;perspective:1500px;';

      var fc = el('div', 'fc');
      var front = el('div', 'fc-face');
      add(front, el('div', 'fc-deck', D.FLASHCARD.deck), el('div', 'fc-q', D.FLASHCARD.front));
      var back = el('div', 'fc-face fc-back');
      add(back, el('div', 'fc-deck', 'Answer'), el('div', 'fc-a', D.FLASHCARD.back));
      add(fc, front, back);

      var rates = el('div', 'rates');
      rates.style.cssText = 'margin-top:1.3em;width:100%;';
      var btns = D.FLASHCARD.buttons.map(function (b) {
        var n = el('div', 'rate ' + b.cls);
        add(n, el('div', 'lb', b.label), el('div', 'sb', b.sub));
        rates.appendChild(n);
        return n;
      });

      var chip = el('div', 'due-chip', '↺&nbsp; ' + D.FLASHCARD.due);
      var chipWrap = el('div');
      chipWrap.style.cssText = 'margin-top:1.3em;';
      chipWrap.appendChild(chip);

      add(stack, fc, rates, chipWrap);
      add(scene, cap, stack);
      return { cap: cap, stack: stack, fc: fc, rates: rates, btns: btns, chip: chipWrap };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      var inP = beat(u, 0.7, 0.8);
      r.fc.parentNode.style.opacity = 1;
      r.fc.style.opacity = inP;

      /* Flip, with a small lift so it reads as a card turning in the hand. */
      var f = beatIO(u, 2.0, 0.75);
      var lift = Math.sin(f * Math.PI) * 22;
      r.fc.style.transform =
        'translateY(' + (-lift + (1 - inP) * 26) + 'px) rotateY(' + (180 * f) + 'deg)';

      riseEach(r.btns, u, 2.95, 0.06, 0.5, 16);
      r.rates.style.opacity = beat(u, 2.95, 0.5);

      /* "Good" gets pressed. */
      var press = beat(u, 4.15, 0.35) * (1 - beat(u, 5.4, 0.5) * 0.55);
      var g = r.btns[D.FLASHCARD.chosen];
      g.style.transform = 'translateY(0) scale(' + (1 + 0.07 * press) + ')';
      g.style.borderColor = 'rgba(0,194,168,' + (0.18 + 0.62 * press) + ')';
      g.style.background = 'rgba(0,194,168,' + (0.02 + 0.14 * press) + ')';
      g.style.boxShadow = press > 0.02 ? '0 0 ' + (26 * press) + 'px rgba(0,194,168,' + (0.4 * press) + ')' : 'none';

      rise(r.chip, beat(u, 4.95, 0.6), 16);
    }
  });

  /* --- 6. MCQs ---------------------------------------------------- */
  SCENES.push({
    id: 'mcq', dur: 9.0,
    build: function (scene) {
      var cap = caption('mcq');
      var pn = panelShell(D.MCQ.topic);
      pn.style.cssText = 'margin-top:2.2em;width:100%;max-width:44em;';
      pn.__body.appendChild(el('div', 'mcq-stem', D.MCQ.stem));
      var opts = D.MCQ.options.map(function (o, i) {
        var n = el('div', 'opt');
        add(n, el('div', 'ltr', 'ABCDE'[i]), el('div', null, o));
        pn.__body.appendChild(n);
        return n;
      });
      var exp = el('div', 'explain', D.MCQ.explanation);
      exp.style.marginTop = '1em';
      pn.__body.appendChild(exp);

      var foot = el('div', 'subline',
        '<b style="color:#E8EAF0">' + fmt(D.STATS.questions) + '</b> questions, attached to the topic they belong to.');
      foot.style.marginTop = '1.6em';

      add(scene, cap, pn, foot);
      return { cap: cap, pn: pn, opts: opts, exp: exp, foot: foot, eh: null };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.pn, beat(u, 0.7, 0.8), 30);
      riseEach(r.opts, u, 1.6, 0.09, 0.5, 14);

      /* The right answer resolves. Its transform has to keep the stagger
         offset it entered on, or it snaps into place ahead of the others
         and reads as being out of step with the list. */
      var pick = beat(u, 3.3, 0.45);
      var ri = D.MCQ.correct;
      var right = r.opts[ri];
      var dy = (1 - beat(u, 1.6 + ri * 0.09, 0.5)) * 14;
      right.classList.toggle('right', pick > 0.5);
      right.style.transform = 'translateY(' + dy + 'px) scale(' + (1 + 0.025 * Math.sin(pick * Math.PI)) + ')';
      r.opts.forEach(function (o, i) {
        if (i !== ri) o.style.opacity = beat(u, 1.6 + i * 0.09, 0.5) * (1 - 0.55 * pick);
      });

      /* Explanation unrolls to its measured height. */
      if (r.eh == null) r.eh = r.exp.scrollHeight;
      var ep = beatIO(u, 4.2, 0.7);
      r.exp.style.height = (r.eh * ep) + 'px';
      r.exp.style.opacity = ep;
      r.exp.style.paddingTop = (0.9 * ep) + 'em';
      r.exp.style.paddingBottom = (0.9 * ep) + 'em';
      r.exp.style.marginTop = (1 * ep) + 'em';

      rise(r.foot, beat(u, 5.6, 0.7), 16);
    }
  });

  /* --- 7. Anatomy / Histology / Pharmacology ---------------------- */
  SCENES.push({
    id: 'split', dur: 7.0,
    build: function (scene) {
      var cap = caption('split');
      var split = el('div', 'split');
      split.style.marginTop = '2.4em';
      var cols = D.SPLIT.map(function (s) {
        var c = el('div', 'col');
        c.style.borderTopColor = s.accent;
        var head = el('div', 'col-head');
        var n = el('div', 'n'); n.style.color = s.accent; n.textContent = '0';
        add(head, n, el('div', 'lb', s.label), el('div', 'sb', s.sub));
        var ul = el('ul');
        s.items.forEach(function (it) { ul.appendChild(el('li', null, it)); });
        add(c, head, ul);
        split.appendChild(c);
        return { col: c, n: n, target: s.count };
      });
      add(scene, cap, split);
      return { cap: cap, cols: cols };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      r.cols.forEach(function (c, i) {
        var s = 0.9 + i * 0.16;
        rise(c.col, beat(u, s, 0.75), 36);
        c.n.textContent = fmt(c.target * easeOut(p(u, s + 0.15, 1.7)));
      });
    }
  });

  /* --- 8. Signs & symptoms ---------------------------------------- */
  SCENES.push({
    id: 'signs', dur: 8.0,
    build: function (scene) {
      var cap = caption('signs');
      var stack = el('div');
      stack.style.cssText = 'margin-top:2.2em;width:100%;max-width:40em;display:flex;flex-direction:column;align-items:center;';

      var chip = el('div', 'symptom-chip', '⚡&nbsp; ' + D.SIGNS.symptom);
      var a1 = el('div', 'arrow', '↓');
      a1.style.margin = '0.7em 0';

      var list = el('div');
      list.style.width = '100%';
      var diffs = D.SIGNS.differentials.map(function (d) {
        var n = el('div', 'diff');
        add(n, el('div', null, d.name), el('div', 'tag ' + d.tone, d.tag));
        list.appendChild(n);
        return n;
      });

      var a2 = el('div', 'arrow', '↓');
      a2.style.margin = '0.5em 0 0.9em';
      var tests = el('div', 'tests');
      var tnodes = D.SIGNS.tests.map(function (t) {
        var n = el('div', 'test', t);
        tests.appendChild(n);
        return n;
      });

      var foot = el('div', 'subline',
        '<b style="color:#E8EAF0">' + D.STATS.presentations + '</b> presentations across <b style="color:#E8EAF0">' +
        D.STATS.presentationGroups + '</b> systems.');
      foot.style.marginTop = '1.6em';

      add(stack, chip, a1, list, a2, tests);
      add(scene, cap, stack, foot);
      return { cap: cap, chip: chip, a1: a1, diffs: diffs, a2: a2, tests: tnodes, foot: foot };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.chip, beat(u, 0.9, 0.65), 20);
      r.a1.style.opacity = beat(u, 1.5, 0.4) * 0.8;
      riseEach(r.diffs, u, 1.75, 0.13, 0.55, 16);
      r.a2.style.opacity = beat(u, 3.4, 0.4) * 0.8;
      riseEach(r.tests, u, 3.65, 0.09, 0.45, 12);
      rise(r.foot, beat(u, 4.9, 0.7), 16);
    }
  });

  /* --- 9. Investigations ------------------------------------------ */
  SCENES.push({
    id: 'invest', dur: 7.5,
    build: function (scene) {
      var cap = caption('invest');
      var pn = panelShell(D.INVESTIGATION.group);
      pn.style.cssText = 'margin-top:2.2em;width:100%;max-width:42em;';
      pn.__body.appendChild(el('div', 'note-title', D.INVESTIGATION.name));

      var tbl = el('table', 'labs');
      var rows = D.INVESTIGATION.rows.map(function (rw) {
        var tr = el('tr');
        var td0 = el('td', null, rw[0]);
        var td1 = el('td', rw[2] || null, rw[1]);
        var td2 = el('td', null, rw[3] || '');
        add(tr, td0, td1, td2);
        tbl.appendChild(tr);
        return tr;
      });
      pn.__body.appendChild(tbl);

      function block(lb, tx) {
        var b = el('div', 'io-block');
        add(b, el('div', 'io-lb', lb), el('div', 'io-tx', tx));
        pn.__body.appendChild(b);
        return b;
      }
      var when = block('When to order', D.INVESTIGATION.when);
      var how = block('How to interpret', D.INVESTIGATION.interpret);

      var foot = el('div', 'subline',
        '<b style="color:#E8EAF0">' + D.STATS.investigations + '</b> investigations across <b style="color:#E8EAF0">' +
        D.STATS.investigationGroups + '</b> categories.');
      foot.style.marginTop = '1.6em';

      add(scene, cap, pn, foot);
      return { cap: cap, pn: pn, rows: rows, when: when, how: how, foot: foot };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.pn, beat(u, 0.7, 0.8), 30);
      riseEach(r.rows, u, 1.7, 0.2, 0.5, 12);
      rise(r.when, beat(u, 2.9, 0.65), 16);
      rise(r.how, beat(u, 3.9, 0.65), 16);
      rise(r.foot, beat(u, 4.9, 0.7), 16);
    }
  });

  /* --- 10. Mock exams --------------------------------------------- */
  SCENES.push({
    id: 'mock', dur: 8.5,
    build: function (scene) {
      var cap = caption('mock');
      var pn = panelShell('Custom Mock Exam');
      pn.style.cssText = 'margin-top:2.2em;width:100%;max-width:42em;';

      var preset = el('div', 'mock-preset');
      var ptxt = el('div');
      add(ptxt, el('div', 't', D.MOCK.presetLabel), el('div', 's', D.MOCK.presetSpec));
      add(preset, ptxt, el('div', 'go', 'Start ›'));
      pn.__body.appendChild(preset);

      var cust = el('div');
      cust.appendChild(el('div', 'field-lb', D.MOCK.customLabel));
      var numrow = el('div', 'numrow');
      var numbox = el('div', 'numbox', String(D.MOCK.countFrom));
      var hint = el('div', 'numhint');
      add(numrow, numbox, hint);
      cust.appendChild(numrow);

      cust.appendChild(el('div', 'field-lb', 'Topics to include'));
      var ticks = D.MOCK.tree.map(function (t) {
        var n = el('div', 'tick');
        add(n, el('div', 'bx', '<span>✓</span>'), el('div', null, t[0]));
        cust.appendChild(n);
        return { node: n, on: t[1] };
      });
      pn.__body.appendChild(cust);

      var timerWrap = el('div');
      timerWrap.style.cssText = 'margin-top:1.4em;display:flex;justify-content:center;';
      timerWrap.appendChild(el('div', 'timer', '⏱ ' + D.MOCK.timer + ' · 1 minute per mark'));

      add(scene, cap, pn, timerWrap);
      return { cap: cap, pn: pn, preset: preset, cust: cust, numbox: numbox, hint: hint, ticks: ticks, timer: timerWrap };
    },
    draw: function (r, u) {
      drawCaption(r.cap, u, 0);
      rise(r.pn, beat(u, 0.7, 0.8), 30);
      rise(r.preset, beat(u, 1.6, 0.6), 18);
      rise(r.cust, beat(u, 2.6, 0.6), 18);

      /* Dial the question count down from the standard paper to a custom one. */
      var np = beatIO(u, 3.3, 1.1);
      var n = Math.round(D.MOCK.countFrom + (D.MOCK.countTo - D.MOCK.countFrom) * np);
      r.numbox.textContent = n;
      r.hint.textContent = 'questions · ' + n + ' minute timer';

      /* Then tick the systems you actually want. */
      r.ticks.forEach(function (t, i) {
        var on = t.on && p(u, 4.0 + i * 0.28, 0.25) > 0.5;
        t.node.classList.toggle('on', on);
        t.node.style.opacity = 0.45 + 0.55 * beat(u, 2.9 + i * 0.07, 0.4);
      });

      rise(r.timer, beat(u, 5.8, 0.7), 16);
    }
  });

  /* --- 11. Outro --------------------------------------------------- */
  SCENES.push({
    id: 'outro', dur: 5.5,
    build: function (scene) {
      var logo = el('img', 'hero-logo'); logo.src = D.BRAND.logo; logo.alt = '';
      var mark = el('div', 'wordmark', D.BRAND.name);
      mark.style.marginTop = '0.4em';
      var tag = el('div', 'outro-tag', D.BRAND.tagline);
      var url = D.SITE_URL ? el('div', 'outro-url', D.SITE_URL) : null;
      add(scene, logo, mark, tag);
      if (url) scene.appendChild(url);
      return { logo: logo, mark: mark, tag: tag, url: url };
    },
    draw: function (r, u) {
      var lp = beat(u, 0, 0.9);
      r.logo.style.opacity = lp;
      r.logo.style.transform = 'scale(' + (0.86 + 0.14 * easeBack(p(u, 0, 0.9))) + ')';
      rise(r.mark, beat(u, 0.4, 0.8), 20);
      rise(r.tag, beat(u, 0.85, 0.8), 16);
      if (r.url) rise(r.url, beat(u, 1.35, 0.8), 16);
    }
  });

  /* ================================================================
     Engine
     ================================================================ */
  var built = null;

  function mount(stage, variant) {
    stage.className = 'stage ' + (variant === 'vert' ? 'vert' : 'land');
    stage.innerHTML = '';

    var glowA = el('div', 'glow glow-a');
    var glowB = el('div', 'glow glow-b');
    add(stage, glowA, glowB, el('div', 'grid-bg'));

    var start = 0;
    var scenes = SCENES.map(function (S) {
      var node = el('section', 'scene');
      node.setAttribute('data-scene', S.id);
      stage.appendChild(node);
      var refs = S.build(node);
      var entry = { def: S, node: node, refs: refs, start: start };
      start += S.dur - OVERLAP;
      return entry;
    });
    var duration = start + OVERLAP;

    stage.appendChild(el('div', 'vignette'));

    var wm = el('div', 'watermark');
    var wimg = el('img'); wimg.src = D.BRAND.logo; wimg.alt = '';
    add(wm, wimg, el('span', null, D.BRAND.name));
    var pbar = el('div', 'pbar');
    add(stage, wm, pbar);

    built = { stage: stage, scenes: scenes, duration: duration, glowA: glowA, glowB: glowB, wm: wm, pbar: pbar };
    seek(0);
    return built;
  }

  function seek(t) {
    if (!built) return;
    var b = built;
    t = clamp(t, 0, b.duration);

    /* Background glows drift on a slow, non-repeating pair of sines. */
    var w = b.stage.clientWidth, h = b.stage.clientHeight;
    b.glowA.style.left = (w * (0.24 + 0.20 * Math.sin(t * 0.21)) - 350) + 'px';
    b.glowA.style.top  = (h * (0.32 + 0.16 * Math.cos(t * 0.17)) - 350) + 'px';
    b.glowB.style.left = (w * (0.74 + 0.18 * Math.cos(t * 0.15)) - 300) + 'px';
    b.glowB.style.top  = (h * (0.66 + 0.14 * Math.sin(t * 0.23)) - 300) + 'px';

    b.scenes.forEach(function (s, i) {
      var u = t - s.start;
      var dur = s.def.dur;
      var vis = u > -0.02 && u < dur + 0.02;
      /* Skip work for scenes that are nowhere near the playhead. */
      if (!vis) {
        if (s.node.style.opacity !== '0') { s.node.style.opacity = 0; s.node.style.visibility = 'hidden'; }
        return;
      }
      s.node.style.visibility = 'visible';
      s.node.style.zIndex = 10 + i;

      var fin  = easeInOut(c01(u / OVERLAP));
      var fout = 1 - easeInOut(c01((u - (dur - OVERLAP)) / OVERLAP));
      var op = fin * fout;
      s.node.style.opacity = op;
      /* A whisper of scale on the way in and out keeps cuts from feeling flat. */
      s.node.style.transform = 'scale(' + (0.985 + 0.015 * fin - 0.012 * (1 - fout)) + ')';

      s.def.draw(s.refs, u);
    });

    /* Watermark rides everything except the hero and the outro. */
    var last = b.scenes[b.scenes.length - 1];
    var wmP = easeInOut(c01((t - 6.6) / 0.8)) * (1 - easeInOut(c01((t - (last.start - 0.4)) / 0.6)));
    b.wm.style.opacity = wmP * 0.85;
    b.wm.style.transform = 'translateY(' + ((1 - wmP) * -14) + 'px)';

    b.pbar.style.width = (100 * t / b.duration) + '%';
  }

  root.PromoReel = {
    mount: mount,
    seek: seek,
    get duration() { return built ? built.duration : 0; },
    scenes: function () {
      return built ? built.scenes.map(function (s) {
        return { id: s.def.id, start: s.start, dur: s.def.dur };
      }) : [];
    }
  };
})(window);
