import { CATEGORIES } from '../data/knowledge.js';
import { esc, h, chevron } from '../ui.js';

export function render(ctx) {
  const [catId, topicId] = ctx.params;
  if (topicId) return renderTopic(ctx, catId, topicId);
  if (catId) return renderCategory(ctx, catId);
  renderHome(ctx);
}

function renderHome(ctx) {
  ctx.setTitle('Knowledge Bank');
  const root = h(`<div class="stack">
    <input class="search" type="search" placeholder="Search all topics…" aria-label="Search topics">
    <div data-results></div>
    <div class="grid-2 tiles" data-grid>
      ${CATEGORIES.map(c => `
        <a class="tile" href="#/knowledge/${c.id}">
          <span class="emoji" aria-hidden="true">${c.emoji}</span>
          <strong>${esc(c.name)}</strong>
          <span class="small">${esc(c.blurb)}</span>
        </a>`).join('')}
    </div>
  </div>`);
  ctx.el.append(root);

  const grid = root.querySelector('[data-grid]');
  const results = root.querySelector('[data-results]');
  root.querySelector('.search').addEventListener('input', e => {
    const q = e.target.value.trim().toLowerCase();
    grid.hidden = !!q;
    if (!q) { results.innerHTML = ''; return; }
    const hits = CATEGORIES.flatMap(c => c.topics
      .filter(t => t.title.toLowerCase().includes(q) || (t.body || '').toLowerCase().includes(q))
      .map(t => ({ c, t })));
    results.innerHTML = hits.length
      ? `<ul class="list cols">${hits.map(({ c, t }) => topicRow(c, t)).join('')}</ul>`
      : '<p class="empty">No topics match.</p>';
  });
}

const topicRow = (c, t, showCat = true) => `
  <li><a href="#/knowledge/${c.id}/${t.id}">
    <div class="grow">
      <div class="title">${esc(t.title)}</div>
      <div class="sub">${t.body ? esc(showCat ? c.name : (t.summary || '')) : 'Coming soon'}</div>
    </div>${chevron}
  </a></li>`;

function renderCategory(ctx, catId) {
  const c = CATEGORIES.find(x => x.id === catId);
  if (!c) { ctx.setTitle('Not found'); ctx.el.append(h('<p class="empty">Category not found.</p>')); return; }
  ctx.setTitle(c.name);
  // Group topics under their section headings, preserving order.
  const groups = [];
  for (const t of c.topics) {
    const g = t.group || '';
    if (!groups.length || groups[groups.length - 1].name !== g) groups.push({ name: g, topics: [] });
    groups[groups.length - 1].topics.push(t);
  }
  const done = c.topics.filter(t => t.body).length;
  ctx.el.append(h(`<div class="stack">
    <p class="muted">${esc(c.blurb)} · ${done} of ${c.topics.length} topics written</p>
    ${groups.map(g => `
      ${g.name ? `<div class="section-title">${esc(g.name)}</div>` : ''}
      <ul class="list cols">${g.topics.map(t => topicRow(c, t, false)).join('')}</ul>`).join('')}
  </div>`));
}

function renderTopic(ctx, catId, topicId) {
  const c = CATEGORIES.find(x => x.id === catId);
  const t = c?.topics.find(x => x.id === topicId);
  if (!t) { ctx.setTitle('Not found'); ctx.el.append(h('<p class="empty">Topic not found.</p>')); return; }
  ctx.setTitle(t.title);

  const i = c.topics.indexOf(t);
  const prev = c.topics[i - 1], next = c.topics[i + 1];

  ctx.el.append(h(`<div class="stack">
    <article class="card prose">
      <p class="muted small" style="margin-bottom:4px">${esc(c.name)}</p>
      <h2 style="margin-bottom:12px">${esc(t.title)}</h2>
      ${t.body ?? '<p class="muted">Content coming soon. Add it in <code>js/data/knowledge.js</code>.</p>'}
    </article>
    <div class="btn-row narrow">
      ${prev ? `<a class="btn" href="#/knowledge/${c.id}/${prev.id}">‹ Prev</a>` : '<span></span>'}
      ${next ? `<a class="btn" href="#/knowledge/${c.id}/${next.id}">Next ›</a>` : '<span></span>'}
    </div>
  </div>`));
}
