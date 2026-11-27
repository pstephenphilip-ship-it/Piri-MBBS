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

function renderDetail(ctx, id) {
  const x = EXERCISES.find(e => e.id === id);
  if (!x) { ctx.setTitle('Not found'); ctx.el.append(h('<p class="empty">Exercise not found.</p>')); return; }
  ctx.setTitle(x.name);

  const list = (title, items) => items?.length
    ? `<div class="card"><h3>${title}</h3><ul class="prose" style="margin:0;padding-left:20px">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>` : '';

  ctx.el.append(h(`<div class="stack">
    <div class="card stack detail-grid" style="align-items:center">
      <div class="stack"><div class="tags">
        <span class="tag">${esc(x.pattern)}</span>
        <span class="tag">${esc(x.equipment)}</span>
        <span class="tag ${x.level === 'Beginner' ? 'ok' : x.level === 'Advanced' ? 'danger' : 'warn'}">${esc(x.level)}</span>
      </div>
      <dl class="kv">
        <dt>Primary</dt><dd>${esc(x.primary.join(', '))}</dd>
        <dt>Secondary</dt><dd>${esc(x.secondary.join(', '))}</dd>
      </dl>
      </div>
      <!-- Placeholder for demo video / image -->
      <div style="max-width:100%;aspect-ratio:16/9;border-radius:10px;background:var(--surface-2);display:grid;place-items:center" class="muted small">Video / demo image</div>
    </div>
    <div class="detail-grid">
      ${list('Coaching cues', x.cues)}
      ${list('Common mistakes', x.mistakes)}
      ${list('Regressions', x.regressions)}
      ${list('Progressions', x.progressions)}
    </div>
  </div>`));
}
