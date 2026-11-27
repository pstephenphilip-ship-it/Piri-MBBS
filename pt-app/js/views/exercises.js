import { EXERCISES, PATTERNS, EQUIPMENT } from '../data/exercises.js';
import { esc, h, chevron } from '../ui.js';

// Filter state survives navigating into a detail page and back.
const state = { q: '', pattern: null, equipment: null };

export function render(ctx) {
  const [id] = ctx.params;
  if (id) return renderDetail(ctx, id);
  renderList(ctx);
}

function renderList(ctx) {
  ctx.setTitle('Exercise Bank');

  const root = h(`<div class="stack">
    <input class="search" type="search" placeholder="Search exercises or muscles…" value="${esc(state.q)}" aria-label="Search exercises">
    <div class="chips" data-group="pattern"></div>
    <div class="chips" data-group="equipment"></div>
    <p class="muted small" data-count></p>
    <ul class="list cols"></ul>
  </div>`);
  ctx.el.append(root);

  const listEl = root.querySelector('.list');
  const countEl = root.querySelector('[data-count]');

  const makeChips = (group, values) => {
    const wrap = root.querySelector(`[data-group="${group}"]`);
    wrap.innerHTML = ['All', ...values].map(v =>
      `<button class="chip${(state[group] ?? 'All') === v ? ' active' : ''}" data-v="${esc(v)}">${esc(v)}</button>`).join('');
    wrap.addEventListener('click', e => {
      const b = e.target.closest('.chip'); if (!b) return;
      state[group] = b.dataset.v === 'All' ? null : b.dataset.v;
      wrap.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === b));
      draw();
    });
  };
  makeChips('pattern', PATTERNS);
  makeChips('equipment', EQUIPMENT);

  root.querySelector('.search').addEventListener('input', e => { state.q = e.target.value; draw(); });

  function draw() {
    const q = state.q.trim().toLowerCase();
    const items = EXERCISES.filter(x =>
      (!state.pattern || x.pattern === state.pattern) &&
      (!state.equipment || x.equipment === state.equipment) &&
      (!q || [x.name, ...x.primary, ...x.secondary].some(s => s.toLowerCase().includes(q))));

    countEl.textContent = `${items.length} exercise${items.length === 1 ? '' : 's'}`;
    listEl.innerHTML = items.length ? items.map(x => `
      <li><a href="#/exercises/${x.id}">
        <div class="grow">
          <div class="title">${esc(x.name)}</div>
          <div class="sub">${esc(x.primary.join(', '))} · ${esc(x.equipment)}</div>
        </div>
        <span class="tag">${esc(x.pattern)}</span>
        ${chevron}
      </a></li>`).join('')
      : `<li class="empty">No exercises match.</li>`;
  }
  draw();
}

// Map muscle names to their Muscles articles (first keyword match wins).
const MUSCLE_LINKS = [
  [/quadric|vastus|rectus femoris/i, 'quadriceps'], [/glute/i, 'glutes'], [/hamstring|biceps femoris/i, 'hamstrings'],
  [/adductor/i, 'adductors'], [/hip flexor/i, 'hip-flexors'], [/gastroc|soleus|calf|calves|tibialis|fibularis/i, 'lower-leg'],
  [/pector|serratus/i, 'chest'], [/deltoid|shoulders/i, 'deltoids'], [/rotator|supraspinatus|infraspinatus/i, 'rotator-cuff'],
  [/lat|teres major/i, 'lats'], [/trap|rhomboid/i, 'upper-back'], [/triceps/i, 'triceps'], [/biceps|brachialis/i, 'elbow-flexors'],
  [/forearm/i, 'forearm'], [/erector|quadratus lumborum|multifidus/i, 'back-extensors'],
  [/abdomin|oblique|core/i, 'abdominals'],
];
const muscleLink = m => {
  const hit = MUSCLE_LINKS.find(([re]) => re.test(m));
  return hit ? `<a href="#/knowledge/muscles/${hit[1]}">${esc(m)}</a>` : esc(m);
};

/** Demo video: a local file (e.g. 'videos/goblet-squat.mp4'), or a YouTube / Vimeo link. */
function videoBlock(x) {
  const v = x.video;
  if (!v) return `<div class="ex-video ex-video-empty muted small">No video yet</div>`;
  const yt = v.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/);
  const vm = v.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  const src = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}` : vm ? `https://player.vimeo.com/video/${vm[1]}` : null;
  if (src) return `<div class="ex-video"><iframe src="${esc(src)}" title="${esc(x.name)} demo" allow="fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>
    <a class="small" href="${esc(v)}" target="_blank" rel="noopener">Open video in a new tab</a>`;
  return `<div class="ex-video"><video controls playsinline preload="metadata" ${x.poster ? `poster="${esc(x.poster)}"` : ''}><source src="${esc(v)}">Your browser can't play this video.</video></div>`;
}

function renderDetail(ctx, id) {
  const x = EXERCISES.find(e => e.id === id);
  if (!x) { ctx.setTitle('Not found'); ctx.el.append(h('<p class="empty">Exercise not found.</p>')); return; }
  ctx.setTitle(x.name);

  const ul = items => `<ul class="ex-list">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>`;
  const ol = items => `<ol class="ex-steps">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ol>`;
  const sec = (title, inner, cls = '') => inner ? `<section class="card ex-sec ${cls}"><h3>${title}</h3>${inner}</section>` : '';
  const joints = x.joints?.length ? `<div class="table-wrap"><table><thead><tr><th>Joint</th><th>Movement (lifting phase)</th><th>Plane</th></tr></thead><tbody>${x.joints.map(([j, m, p]) => `<tr><td>${esc(j)}</td><td>${esc(m)}</td><td>${esc(p)}</td></tr>`).join('')}</tbody></table></div>` : '';

  ctx.el.append(h(`<div class="stack prose ex-detail">
    <div class="card stack detail-grid" style="align-items:center">
      <div class="stack">
        <div class="tags">
          <span class="tag">${esc(x.pattern)}</span>
          <span class="tag">${esc(x.equipment)}</span>
          <span class="tag ${x.level === 'Beginner' ? 'ok' : x.level === 'Advanced' ? 'danger' : 'warn'}">${esc(x.level)}</span>
        </div>
        <dl class="kv">
          <dt>Primary</dt><dd>${x.primary.map(muscleLink).join(', ')}</dd>
          <dt>Secondary</dt><dd>${x.secondary.map(muscleLink).join(', ')}</dd>
          ${x.dose ? `<dt>Start with</dt><dd>${esc(x.dose)}</dd>` : ''}
        </dl>
      </div>
      ${videoBlock(x)}
    </div>
    <nav class="chips ex-jump" aria-label="Jump to section">
      ${[['setup', 'Set-up'], ['execution', 'Execution'], ['breathing', 'Breathing'], ['stability', 'Stability'], ['joints', 'Joint actions'], ['coaching', 'Coaching'], ['safety', 'Safety'], ['options', 'Options']]
        .map(([id, t]) => `<button type="button" class="chip" data-jump="${id}">${t}</button>`).join('')}
    </nav>
    <div class="detail-grid">
      ${sec('1. Set-up: from the ground up', x.setup && ol(x.setup), 'span-2" id="ex-setup')}
      ${sec('2. Execution', x.execution && ol(x.execution), 'span-2" id="ex-execution')}
      ${sec('Breathing & bracing', x.breathing && `<p>${esc(x.breathing)}</p>`, '" id="ex-breathing')}
      ${sec('Stability: what stays still', x.stability && ul(x.stability), '" id="ex-stability')}
      ${sec('Joint actions', joints, 'span-2" id="ex-joints')}
      ${sec('Coaching cues', ul(x.cues), '" id="ex-coaching')}
      ${sec('Common mistakes', ul(x.mistakes))}
      ${sec('Safety & who should modify', x.safety && ul(x.safety), 'span-2 ex-safety" id="ex-safety')}
      ${sec('Regressions (easier)', ul(x.regressions), '" id="ex-options')}
      ${sec('Progressions (harder)', ul(x.progressions))}
    </div>
  </div>`));
  ctx.el.querySelector('.ex-jump').addEventListener('click', e => {
    const b = e.target.closest('[data-jump]'); if (!b) return;
    document.getElementById('ex-' + b.dataset.jump)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
