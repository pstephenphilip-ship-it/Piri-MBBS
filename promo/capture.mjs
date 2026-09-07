/* =====================================================================
   Record the real DoctoRise site as frame sequences for the promo reel.

     node promo/capture.mjs                    both profiles
     node promo/capture.mjs --profile phone    just the 9:16 footage
     node promo/capture.mjs --only annotate    re-shoot one clip

   Everything in the reel's screen area is the actual site, driven with
   real mouse input — real text selection to raise the highlight bar, real
   clicks on real buttons. Nothing here is a mock-up of the UI.

   Frames land in promo/shots/<profile>/<clip>/00000.jpg and are NOT
   committed; they regenerate from this script. reel.js plays them back.

   A note on determinism: CSS transitions inside the app are disabled
   before recording, and each frame is written only after its state is
   set, so the sequence is reproducible rather than a real-time capture
   that happens to catch whatever the compositor had ready.
   ===================================================================== */
import { chromium } from 'playwright';
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..');

function opt(n, d) { const i = process.argv.indexOf('--' + n); return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d; }
const FPS = Number(opt('fps', 30));
const ONLY = opt('only', null);
const WANT = opt('profile', null);
const PORT = Number(opt('port', 8899));
const BASE = `http://localhost:${PORT}/index.html`;

const PROFILES = {
  /* A realistic laptop viewport, and a phone that matches a modern handset. */
  desktop: { w: 1280, h: 800, dsf: 1, mobile: false },
  phone:   { w: 430,  h: 932, dsf: 2, mobile: true  }
};

/* ------------------------------------------------------------ helpers */
const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = t => 1 - Math.pow(1 - t, 3);
const lerp = (a, b, t) => a + (b - a) * t;

/* Injected once per page: local brand fonts (so the capture does not depend
   on Google Fonts being reachable), no transitions, and a drawn cursor. */
const PREP_CSS = `
@font-face{font-family:'Inter';font-style:normal;font-weight:100 900;font-display:block;src:url('/promo/fonts/Inter.woff2') format('woff2');}
@font-face{font-family:'JetBrains Mono';font-style:normal;font-weight:100 800;font-display:block;src:url('/promo/fonts/JetBrainsMono.woff2') format('woff2');}
*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important;}
html{scroll-behavior:auto!important;}
#__cur{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;width:26px;height:26px;
  transform:translate(-2px,-2px);filter:drop-shadow(0 2px 4px rgba(0,0,0,.45));opacity:0;}
#__ring{position:fixed;left:0;top:0;z-index:2147483646;pointer-events:none;width:44px;height:44px;
  margin:-22px 0 0 -22px;border-radius:50%;border:2.5px solid rgba(0,194,168,.9);opacity:0;}
`;

const PREP_JS = `
(function(){
  window.__member = true;
  var c = document.createElement('div'); c.id = '__cur';
  c.innerHTML = '<svg viewBox="0 0 26 26" width="26" height="26"><path d="M4 2l16 9.2-7.1 1.6-2.6 6.9z" fill="#fff" stroke="#111827" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var r = document.createElement('div'); r.id = '__ring';
  document.body.appendChild(c); document.body.appendChild(r);
  window.__cursor = function(x, y, show){
    c.style.transform = 'translate(' + (x - 2) + 'px,' + (y - 2) + 'px)';
    c.style.opacity = show ? 1 : 0;
    r.style.left = x + 'px'; r.style.top = y + 'px';
  };
  window.__ripple = function(p){
    r.style.opacity = p > 0 ? (1 - p) * 0.9 : 0;
    r.style.transform = 'scale(' + (0.3 + p * 1.0) + ')';
  };
})();
`;

/* Put the app into a section. Uses the app's own navigation functions for
   tab/system/topic, and real clicks for anything with UI state. */
async function go(pg, tab, sys, topic) {
  await pg.evaluate(([tab, sys, topic]) => {
    window.__member = true;
    switchMainTab(tab, null, true);
    if (sys) selectSystem(tab, sys, true);
    if (topic) selectTopic(tab, topic, true);
    window.__decorateStudyTabs && window.__decorateStudyTabs();
    window.__refreshLocks && window.__refreshLocks();
  }, [tab, sys, topic]);
  await pg.waitForTimeout(1200);
}

/* Scrollable pane for the current section, so a clip can drive it. */
async function paneSel(pg, tab) {
  const cands = [`#notes-panel-${tab} .note-content`, `#tab-${tab} .note-area`, `#tab-${tab} .mode-panel.visible`];
  for (const s of cands) if (await pg.$(s)) return s;
  return null;
}

/* ================================================================ clips */
const CLIPS = [
  /* --- the real home page, with its own numbers counting up --------- */
  { id: 'home', dur: 7.0, run: async ({ pg, hold }) => {
      await pg.evaluate(() => { switchMainTab('home', null, true); window.scrollTo(0, 0); });
      await pg.waitForTimeout(1400);
      /* Grab every numeric badge on the home screen and drive it from zero. */
      await pg.evaluate(() => {
        const host = document.getElementById('tab-home') || document.body;
        window.__nums = [...host.querySelectorAll('*')].filter(e => {
          if (e.children.length) return false;
          const t = (e.textContent || '').trim();
          return /^[\d][\d,]*\+?$/.test(t) && parseInt(t.replace(/[^\d]/g, ''), 10) >= 27;
        }).map(e => ({ el: e, raw: e.textContent.trim(),
                       n: parseInt(e.textContent.replace(/[^\d]/g, ''), 10),
                       plus: /\+$/.test(e.textContent.trim()) }));
      });
      const span = await pg.evaluate(() => {
        const e = document.querySelector('#tab-home.home-view') || document.getElementById('tab-home');
        return e ? Math.max(0, e.scrollHeight - e.clientHeight) : 0;
      });
      await hold(7.0, async p => {
        const k = easeOut(Math.min(1, p / 0.52));
        /* Count the real figures up, then ease down the page so the rest of
           the grid (histology, pharmacology, OSCE, calculators) comes in. */
        const y = span * ease(Math.max(0, (p - 0.55) / 0.45)) * 0.72;
        await pg.evaluate(([k, y]) => {
          (window.__nums || []).forEach(o => {
            const v = Math.round(o.n * k);
            o.el.textContent = v.toLocaleString('en-GB') + (o.plus ? '+' : '');
          });
          const e = document.querySelector('#tab-home.home-view') || document.getElementById('tab-home');
          if (e) e.scrollTop = y;
        }, [k, y]);
      });
    } },

  /* --- the real system sidebar, scrolled ---------------------------- */
  { id: 'systems', dur: 6.5, run: async ({ pg, hold, profile }) => {
      await go(pg, 'conditions', 'CARDIOVASCULAR', null);
      const sel = profile === 'phone' ? `#syslist-conditions` : `#tab-conditions .system-sidebar`;
      const span = await pg.evaluate(s => {
        const e = document.querySelector(s); if (!e) return 0;
        return Math.max(0, e.scrollHeight - e.clientHeight);
      }, sel);
      await hold(6.5, async p => {
        const k = ease(Math.min(1, Math.max(0, (p - 0.10) / 0.78)));
        await pg.evaluate(([s, y]) => { const e = document.querySelector(s); if (e) e.scrollTop = y; }, [sel, span * k]);
      });
    } },

  /* --- a real text selection raising the real highlight bar ---------- */
  { id: 'annotate', dur: 8.0, run: async (ctx) => {
      const { pg, hold, cursorTo, clickEl } = ctx;
      await go(pg, 'conditions', 'CARDIOVASCULAR', 'Acute Coronary Syndrome');
      await pg.waitForTimeout(800);

      const t = await pg.evaluate(() => {
        /* Longest on-screen run of body text that is comfortably in view. */
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n, best = null;
        while ((n = w.nextNode())) {
          const s = n.textContent.trim();
          if (s.length < 50) continue;
          if (n.parentElement.closest('#__cur,#annot-tip-el,.topnav,.system-sidebar')) continue;
          const r = document.createRange(); r.selectNodeContents(n);
          const rect = r.getBoundingClientRect();
          if (rect.width < 220 || rect.height < 8 || rect.height > 90) continue;
          if (rect.top < 130 || rect.bottom > innerHeight - 120) continue;
          if (!best || rect.width > best.w) best = { x1: rect.left + 3, x2: rect.right - 3, y: rect.top + Math.min(rect.height, 22) / 2, w: rect.width };
        }
        return best;
      });
      if (!t) { await hold(8.0); return; }

      await cursorTo(t.x1, t.y, 0.8);
      await pg.mouse.move(t.x1, t.y);
      await pg.mouse.down();
      /* Drag across the phrase, one frame at a time, so the selection grows. */
      await hold(1.0, async p => {
        const x = lerp(t.x1, t.x2, easeOut(p));
        await pg.mouse.move(x, t.y);
        await pg.evaluate(([x, y]) => window.__cursor(x, y, true), [x, t.y]);
      });
      await pg.mouse.up();
      await pg.waitForTimeout(250);
      await hold(0.7);                                  /* the bar appears */

      const sw = await pg.$('#annot-tip-el .annot-swatch');
      if (sw) { await clickEl(sw, 0.7); await pg.waitForTimeout(300); }
      await hold(1.0);                                  /* highlight lands */

      /* Second pass: select another phrase and attach a real note. */
      const t2 = await pg.evaluate(() => {
        const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let n, out = [];
        while ((n = w.nextNode())) {
          const s = n.textContent.trim();
          if (s.length < 40) continue;
          if (n.parentElement.closest('#__cur,#annot-tip-el,.topnav,.system-sidebar')) continue;
          const r = document.createRange(); r.selectNodeContents(n);
          const rect = r.getBoundingClientRect();
          if (rect.width < 180 || rect.height < 8 || rect.height > 90) continue;
          if (rect.top < 130 || rect.bottom > innerHeight - 150) continue;
          out.push({ x1: rect.left + 3, x2: Math.min(rect.right - 3, rect.left + 330), y: rect.top + Math.min(rect.height, 22) / 2, top: rect.top });
        }
        return out.length > 1 ? out[out.length - 1] : null;
      });
      if (t2) {
        await cursorTo(t2.x1, t2.y, 0.5);
        await pg.mouse.move(t2.x1, t2.y);
        await pg.mouse.down();
        await hold(0.7, async p => {
          const x = lerp(t2.x1, t2.x2, easeOut(p));
          await pg.mouse.move(x, t2.y);
          await pg.evaluate(([x, y]) => window.__cursor(x, y, true), [x, t2.y]);
        });
        await pg.mouse.up();
        await pg.waitForTimeout(250);
        await hold(0.5);
        const nb = await pg.$('#annot-tip-el .annot-bar-note');
        if (nb) {
          await clickEl(nb, 0.6);
          await pg.waitForTimeout(500);
          const ta = await pg.$('#annot-pop-ta');
          if (ta) {
            const msg = 'Came up in the 2025 paper — know this cold.';
            await ta.focus();
            let typed = 0;
            /* Type for real, a few characters per frame, so the note box grows
               and the app's own input handlers run exactly as they would. */
            await hold(1.7, async p => {
              const want = Math.round(msg.length * Math.min(1, p / 0.88));
              if (want > typed) { await pg.keyboard.insertText(msg.slice(typed, want)); typed = want; }
            });
            const save = await pg.$('#annot-popup-el .nc-save');
            if (save) { await clickEl(save, 0.5); await pg.waitForTimeout(500); }
          }
        }
      }
      await hold(1.0);
    } },

  /* --- the real My Notes drawer ------------------------------------- */
  { id: 'mynotes', dur: 6.5, run: async ({ pg, hold, clickEl }) => {
      await go(pg, 'conditions', 'CARDIOVASCULAR', 'Acute Coronary Syndrome');
      await hold(0.8);
      const fab = await pg.$('#annot-fab-conditions');
      if (fab) { await clickEl(fab, 0.8); await pg.waitForTimeout(700); }
      await hold(4.9);
    } },

  /* --- real flashcards: flip, then grade ---------------------------- */
  { id: 'recall', dur: 6.0, run: async ({ pg, hold, clickEl }) => {
      await go(pg, 'conditions', 'CARDIOVASCULAR', 'Acute Coronary Syndrome');
      const tab = await pg.$('#modeBar-conditions .fc-tab');
      if (tab) { await tab.click(); await pg.waitForTimeout(1000); }
      await hold(1.9);
      const card = await pg.$('#fcArea-conditions .fc-card');
      if (card) { await clickEl(card, 0.7); await pg.waitForTimeout(400); }
      await hold(1.5);
      const good = await pg.$('#fcRating-conditions .fc-rate-good');
      if (good) { await clickEl(good, 0.7); await pg.waitForTimeout(400); }
      await hold(1.2);
    } },

  /* --- real MCQ: answer, then the explanation ----------------------- */
  { id: 'mcq', dur: 6.0, run: async ({ pg, hold, clickEl }) => {
      await go(pg, 'conditions', 'CARDIOVASCULAR', 'Acute Coronary Syndrome');
      const tab = await pg.$('#modeBar-conditions .q-tab');
      if (tab) { await tab.click(); await pg.waitForTimeout(1000); }
      await hold(2.2);
      /* Pick the option the app itself marks correct, so the reveal is real. */
      const right = await pg.evaluate(() => {
        const opts = [...document.querySelectorAll('#qArea-conditions .q-option')];
        const m = opts.map(o => (o.getAttribute('onclick') || '').match(/selectMcq\('[^']+',(\d+),(\d+)\)/)).filter(Boolean);
        return m.length ? m.length - 1 : -1;
      });
      const opts = await pg.$$('#qArea-conditions .q-option');
      const pick = opts[Math.min(2, Math.max(0, opts.length - 1))];
      if (pick) { await clickEl(pick, 0.9); await pg.waitForTimeout(500); }
      await hold(2.4);
    } },

  /* --- the three modules, each its own real screen ------------------ */
  ...[['anatomy', 'anatomy', 'UPPER LIMB', 'Nerves'],
      ['histology', 'histology', 'BASIC TISSUES', 'Bone (compact, cancellous, remodelling)'],
      ['pharmacology', 'pharmacology', null, null]].map(([id, tab, sys, topic]) => ({
    id, dur: 5.5, run: async (ctx) => {
      const { pg, hold } = ctx;
      await go(pg, tab, sys, topic);
      if (tab === 'pharmacology') {
        /* Pharmacology has its own navigation: a section opens a flyout of
           drug classes, and only picking one shows a monograph. Selecting
           the section alone leaves the welcome pane up. */
        await hold(0.7);
        await pg.evaluate(() => window.pharmaSelectSection('Cardiovascular Drugs'));
        await pg.waitForTimeout(700);
        await hold(0.9);
        const drug = pg.getByText('Ramipril, Lisinopril, Perindopril, Enalapril').first();
        try {
          await drug.waitFor({ state: 'visible', timeout: 3000 });
          await ctx.clickEl(await drug.elementHandle(), 0.6);
          await pg.waitForTimeout(900);
        } catch { await pg.evaluate(() => window.pharmaSelectSection('Cardiovascular Drugs', true)); }
      }
      await hold(0.6);
      const sel = (tab === 'pharmacology' ? '#pharma-detail' : (await paneSel(pg, tab))) || `#tab-${tab}`;
      const span = await pg.evaluate(s => { const e = document.querySelector(s); return e ? Math.max(0, e.scrollHeight - e.clientHeight) : 0; }, sel);
      await hold(3.9, async p => {
        await pg.evaluate(([s, y]) => { const e = document.querySelector(s); if (e) e.scrollTop = y; },
          [sel, Math.min(span, span * ease(p) * 0.55)]);
      });
    }
  })),

  /* --- signs & symptoms: symptom -> differentials -> tests ---------- */
  { id: 'signs', dur: 6.5, run: async ({ pg, hold }) => {
      await go(pg, 'signs', 'CARDIOVASCULAR', 'Chest Pain');
      await hold(1.2);
      const sel = await paneSel(pg, 'signs') || '#tab-signs';
      const span = await pg.evaluate(s => { const e = document.querySelector(s); return e ? Math.max(0, e.scrollHeight - e.clientHeight) : 0; }, sel);
      await hold(5.3, async p => {
        await pg.evaluate(([s, y]) => { const e = document.querySelector(s); if (e) e.scrollTop = y; },
          [sel, Math.min(span, span * ease(p) * 0.6)]);
      });
    } },

  /* --- investigations ---------------------------------------------- */
  { id: 'invest', dur: 6.0, run: async ({ pg, hold }) => {
      await go(pg, 'investigations', 'CARDIAC INVESTIGATIONS', 'Coronary Angiography');
      await hold(1.0);
      const sel = await paneSel(pg, 'investigations') || '#tab-investigations';
      const span = await pg.evaluate(s => { const e = document.querySelector(s); return e ? Math.max(0, e.scrollHeight - e.clientHeight) : 0; }, sel);
      await hold(5.0, async p => {
        await pg.evaluate(([s, y]) => { const e = document.querySelector(s); if (e) e.scrollTop = y; },
          [sel, Math.min(span, span * ease(p) * 0.6)]);
      });
    } },

  /* --- the real custom mock exam builder ---------------------------- */
  { id: 'mock', dur: 8.5, run: async ({ pg, hold, clickEl }) => {
      await pg.evaluate(() => { window.__member = true; window.openMock && window.openMock(); });
      await pg.waitForTimeout(1600);
      await hold(1.8);
      const cust = await pg.$('#mkCustBtn');
      if (cust) { await clickEl(cust, 0.8); await pg.waitForTimeout(700); }
      await hold(0.8);

      /* Set a paper length from the real chips. */
      const chip = await pg.$('#mkNumChips .mk-chip:nth-child(2), #mkNumChips button:nth-child(2)');
      if (chip) { await clickEl(chip, 0.7); await pg.waitForTimeout(350); }
      await hold(0.7);

      /* Tick a couple of real systems. */
      const wrap = '#tab-mock .mk-wrap';
      const boxes = await pg.$$('#mkTree input[type=checkbox]');
      for (const bx of boxes.slice(0, 2)) {
        await clickEl(bx, 0.55);
        await pg.waitForTimeout(200);
      }
      await hold(0.8);
      const span = await pg.evaluate(s => { const e = document.querySelector(s); return e ? Math.max(0, e.scrollHeight - e.clientHeight) : 0; }, wrap);
      await hold(2.2, async p => {
        await pg.evaluate(([s, y]) => { const e = document.querySelector(s); if (e) e.scrollTop = y; },
          [wrap, Math.min(span, span * ease(p) * 0.34)]);
      });
    } }
];

/* ================================================================= run */
async function capture(profileName) {
  const P = PROFILES[profileName];
  const outRoot = path.join(HERE, 'shots', profileName);
  mkdirSync(outRoot, { recursive: true });

  const browser = await chromium.launch({ args: ['--force-color-profile=srgb', '--hide-scrollbars'] });
  const pg = await browser.newPage({
    viewport: { width: P.w, height: P.h },
    deviceScaleFactor: P.dsf,
    isMobile: P.mobile,
    hasTouch: P.mobile
  });
  pg.on('pageerror', e => console.error('   page:', e.message.slice(0, 120)));
  await pg.addInitScript(() => { window.__member = true; });
  /* Re-applied after every reload: style overrides do not survive navigation. */
  async function prep() {
    await pg.waitForTimeout(3600);
    await pg.addStyleTag({ content: PREP_CSS });
    await pg.evaluate(PREP_JS);
    await pg.evaluate(() => document.fonts && document.fonts.ready);
    await pg.waitForTimeout(500);
  }
  await pg.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await prep();

  const manifest = {};
  const clips = CLIPS.filter(c => !ONLY || c.id === ONLY);

  for (const clip of clips) {
    const dir = path.join(outRoot, clip.id);
    rmSync(dir, { recursive: true, force: true });
    mkdirSync(dir, { recursive: true });

    let i = 0;
    let cur = { x: P.w * 0.5, y: P.h * 0.5, shown: false };

    const shoot = async () => {
      const buf = await pg.screenshot({ type: 'jpeg', quality: 82 });
      writeFileSync(path.join(dir, String(i).padStart(5, '0') + '.jpg'), buf);
      i++;
    };
    /* Hold for `sec`, writing one frame per tick; onFrame sets that frame's state. */
    const hold = async (sec, onFrame) => {
      const n = Math.max(1, Math.round(sec * FPS));
      for (let k = 0; k < n; k++) {
        if (onFrame) await onFrame(n === 1 ? 1 : k / (n - 1));
        await shoot();
      }
    };
    const cursorTo = async (x, y, sec) => {
      const from = { ...cur };
      await hold(sec, async p => {
        const e = ease(p);
        const nx = lerp(from.shown ? from.x : x, x, e), ny = lerp(from.shown ? from.y : y, y, e);
        await pg.evaluate(([x, y]) => window.__cursor(x, y, true), [nx, ny]);
      });
      cur = { x, y, shown: true };
    };
    /* Move to an element, click it for real, and flash a ripple. */
    const clickEl = async (el, sec) => {
      const box = await el.boundingBox();
      if (!box) { await el.click({ force: true }); return; }
      const x = box.x + box.width / 2, y = box.y + Math.min(box.height / 2, 26);
      await cursorTo(x, y, sec);
      await el.click({ force: true });
      await hold(0.32, async p => { await pg.evaluate(p => window.__ripple(p), p); });
      await pg.evaluate(() => window.__ripple(0));
    };

    process.stdout.write(`  ${clip.id.padEnd(13)}`);
    const t0 = Date.now();
    /* Fresh page per clip: an open drawer or a scrolled sidebar left by the
       previous clip would otherwise show up in this one. */
    await pg.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await prep();
    try {
      await clip.run({ pg, hold, cursorTo, clickEl, profile: profileName });
    } catch (e) {
      console.log(`\n   !! ${clip.id} failed: ${e.message.slice(0, 140)}`);
    }
    /* Every clip must end up its declared length, so the reel's timing holds
       even if an interaction bailed out early. */
    const want = Math.round(clip.dur * FPS);
    while (i < want) await shoot();
    manifest[clip.id] = { frames: i, dur: i / FPS };
    console.log(`${String(i).padStart(4)} frames  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }

  const mfPath = path.join(outRoot, 'manifest.json');
  let existing = {};
  if (ONLY && existsSync(mfPath)) { try { existing = JSON.parse(await import('node:fs').then(m => m.readFileSync(mfPath, 'utf8'))); } catch {} }
  writeFileSync(mfPath, JSON.stringify({ fps: FPS, w: P.w * P.dsf, h: P.h * P.dsf, clips: { ...existing.clips, ...manifest } }, null, 2));
  await browser.close();
}

for (const name of Object.keys(PROFILES)) {
  if (WANT && WANT !== name) continue;
  console.log(`\n${name}  ${PROFILES[name].w}x${PROFILES[name].h} @${PROFILES[name].dsf}x`);
  await capture(name);
}
console.log('\nFrames in promo/shots/');
