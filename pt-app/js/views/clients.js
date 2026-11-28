import * as store from '../store.js';
import { FORMS, FORM_BY_ID } from '../data/forms.js';
import { screening, onboarding } from '../data/screening.js';
import { EXERCISES } from '../data/exercises.js';
import { esc, h, chevron, toast, fmtDate, initials, ageFrom, confirmButton } from '../ui.js';

const EX_NAME = Object.fromEntries(EXERCISES.map(e => [e.id, e.name]));

// Routes:
//   #/clients                    list
//   #/clients/new                add client
//   #/clients/:id                overview (alerts, onboarding, considerations, goals)
//   #/clients/:id/edit           edit profile
//   #/clients/:id/:formId        a form from data/forms.js (goals has its own planner)
//   #/clients/:id/notes          session notes
export function render(ctx) {
  const [id, section] = ctx.params;
  if (!id) return renderList(ctx);
  if (id === 'new') return renderProfileForm(ctx, null);

  const client = store.getClient(id);
  if (!client) { ctx.setTitle('Not found'); ctx.el.append(h('<p class="empty">Client not found.</p>')); return; }
  if (section === 'edit') return renderProfileForm(ctx, client);

  ctx.setTitle(client.name);
  ctx.el.append(sectionTabs(client, section || 'overview'));
  const body = h('<div style="margin-top:16px"></div>');
  ctx.el.append(body);
  const sub = { ...ctx, el: body };

  if (!section || section === 'overview') return renderOverview(sub, client);
  if (section === 'notes') return renderNotes(sub, client);
  if (section === 'goals') return renderGoals(sub, client);
  const form = FORM_BY_ID[section];
  if (form) return renderForm(sub, client, form);
  body.append(h('<p class="empty">Unknown section.</p>'));
}

/* ================= List ================= */

function renderList(ctx) {
  ctx.setTitle('Clients');
  ctx.setAction(h(`<a class="btn primary sm" href="#/clients/new">+ Add</a>`));
  const clients = store.listClients();
  if (!clients.length) {
    ctx.el.append(h(`<div class="empty stack"><p>No clients yet.</p><a class="btn primary" href="#/clients/new">Add your first client</a></div>`));
    return;
  }
  const root = h(`<div class="stack"><input class="search" type="search" placeholder="Search clients…" aria-label="Search clients"><ul class="list cols"></ul></div>`);
  ctx.el.append(root);
  const listEl = root.querySelector('.list');
  const draw = q => {
    listEl.innerHTML = clients.filter(c => c.name.toLowerCase().includes(q)).map(c => {
      const sc = screening(c), ob = onboarding(c), done = ob.filter(s => s.done).length;
      const refer = sc.alerts.some(a => a.level === 'refer');
      return `<li><a href="#/clients/${c.id}">
        <span class="avatar">${esc(initials(c.name))}</span>
        <div class="grow">
          <div class="title">${esc(c.name)}</div>
          <div class="sub">${esc(c.forms.goals?.values.primary || 'No goal set')} · onboarding ${done}/${ob.length}</div>
        </div>
        ${refer ? '<span class="tag danger">Refer</span>' : ''}
        ${sc.conditions.length ? `<span class="tag warn" title="Special considerations">⚠ ${sc.conditions.length}</span>` : ''}
        ${!refer && done === ob.length ? '<span class="tag ok">Ready</span>' : ''}
        ${chevron}
      </a></li>`;
    }).join('') || '<li class="empty">No clients match.</li>';
  };
  root.querySelector('.search').addEventListener('input', e => draw(e.target.value.trim().toLowerCase()));
  draw('');
}

/* ================= Section tabs ================= */

function sectionTabs(client, active) {
  const ob = Object.fromEntries(onboarding(client).map(s => [s.id, s.done]));
  const tabs = [['overview', 'Overview'], ...FORMS.map(f => [f.id, f.title]), ['notes', 'Notes']];
  const el = h(`<nav class="seg" aria-label="Client sections">
    ${tabs.map(([id, label]) => `<a href="#/clients/${client.id}/${id}" class="${id === active ? 'active' : ''}">${esc(label)}${ob[id] ? ' ✓' : ''}</a>`).join('')}
  </nav>`);
  requestAnimationFrame(() => el.querySelector('.active')?.scrollIntoView({ inline: 'center', block: 'nearest' }));
  return el;
}

/* ================= Overview ================= */

function renderOverview(ctx, c) {
  const sc = screening(c), ob = onboarding(c), age = ageFrom(c.dob);
  const next = ob.find(s => !s.done);
  const goals = (c.smartGoals || []).filter(g => g.status === 'Active');
  const exList = (m, cls) => [...m.entries()].map(([id, why]) =>
    `<li><a href="#/exercises/${id}"><div class="grow"><div class="title">${esc(EX_NAME[id] || id)}</div><div class="sub">${esc([...new Set(why)].join(', '))}</div></div><span class="tag ${cls}">${cls === 'danger' ? 'Avoid' : 'Caution'}</span>${chevron}</a></li>`).join('');
  const listOrNone = (items, empty = '') => items?.length ? `<ul class="ex-list">${items.map(i => `<li>${esc(i)}</li>`).join('')}</ul>` : empty;

  ctx.el.append(h(`<div class="stack">
    ${sc.alerts.map(a => `<div class="banner ${a.level === 'refer' ? 'danger' : a.level === 'caution' ? 'warn' : 'ok'}"><strong>${a.level === 'refer' ? 'Refer / clearance needed' : 'Caution'}:</strong> ${esc(a.text)}</div>`).join('')}

    <div class="detail-grid">
      <div class="card stack">
        <div style="display:flex;gap:12px;align-items:center">
          <span class="avatar" style="width:52px;height:52px;font-size:18px">${esc(initials(c.name))}</span>
          <div class="grow"><h2>${esc(c.name)}</h2><div class="muted small">Client since ${fmtDate(c.createdAt)}</div></div>
          <a class="btn sm" href="#/clients/${c.id}/edit">Edit</a>
        </div>
        <dl class="kv">
          ${age != null ? `<dt>Age</dt><dd>${age}</dd>` : ''}
          ${c.sex ? `<dt>Sex</dt><dd>${esc(c.sex)}</dd>` : ''}
          ${c.phone ? `<dt>Phone</dt><dd><a href="tel:${esc(c.phone)}">${esc(c.phone)}</a></dd>` : ''}
          ${c.email ? `<dt>Email</dt><dd>${esc(c.email)}</dd>` : ''}
          ${c.emergency ? `<dt>Emergency</dt><dd>${esc(c.emergency)}</dd>` : ''}
          ${c.forms.goals?.values.primary ? `<dt>Main goal</dt><dd>${esc(c.forms.goals.values.primary)}</dd>` : ''}
        </dl>
      </div>

      <div class="card">
        <h3 style="margin-bottom:8px">Onboarding <span class="muted small">${ob.filter(s => s.done).length} of ${ob.length}</span></h3>
        <ol class="steps">
          ${ob.map(s => `<li class="${s.done ? 'done' : ''}"><a href="#/clients/${c.id}/${s.id}">${esc(s.title)}</a>${s.done ? `<span class="small muted">${s.savedAt ? fmtDate(s.savedAt) : 'done'}</span>` : ''}</li>`).join('')}
        </ol>
        ${next ? `<a class="btn primary block" style="margin-top:12px" href="#/clients/${c.id}/${next.id}">Next: ${esc(next.title)}</a>` : '<div class="banner ok" style="margin-top:12px">Onboarding complete</div>'}
      </div>
    </div>

    <section class="card ${sc.conditions.length ? 'consider' : ''}">
      <h3>Special considerations</h3>
      ${sc.conditions.length ? `
        <div class="tags" style="margin:8px 0 12px">${sc.conditions.map(x => `<span class="tag ${x.level === 'refer' ? 'danger' : 'warn'}">${esc(x.label)}</span>`).join('')}</div>
        ${sc.conditions.map(x => `<details class="consider-item">
          <summary><strong>${esc(x.label)}</strong> <span class="small muted">${x.level === 'refer' ? 'medical / specialist input' : 'caution'}</span></summary>
          ${x.avoid.length ? `<h4>Avoid</h4>${listOrNone(x.avoid)}` : ''}
          ${x.modify.length ? `<h4>Modify</h4>${listOrNone(x.modify)}` : ''}
          ${x.monitor.length ? `<h4>Monitor</h4>${listOrNone(x.monitor)}` : ''}
          ${x.refer ? `<h4>Refer / consent</h4><p>${esc(x.refer)}</p>` : ''}
        </details>`).join('')}
        <p class="small muted" style="margin-top:10px">Guidance only, not medical advice. Follow any instructions from the client's healthcare team, and work within your qualification.</p>`
      : `<p class="muted">None recorded. <a href="#/clients/${c.id}/considerations">Complete special considerations</a>.</p>`}
    </section>

    ${sc.avoid.size || sc.caution.size ? `<div class="detail-grid">
      ${sc.avoid.size ? `<section><div class="section-title" style="margin-top:0">Exercises to avoid (${sc.avoid.size})</div><ul class="list">${exList(sc.avoid, 'danger')}</ul></section>` : ''}
      ${sc.caution.size ? `<section><details class="ex-more" ${sc.caution.size <= 6 ? 'open' : ''}><summary class="section-title" style="margin-top:0">Use with caution or modify (${sc.caution.size}) <span class="small">tap to ${sc.caution.size <= 6 ? 'hide' : 'show'}</span></summary><ul class="list">${exList(sc.caution, 'warn')}</ul></details></section>` : ''}
    </div>` : ''}

    <section class="card">
      <h3>Active goals</h3>
      ${goals.length ? `<ul class="ex-list">${goals.map(g => `<li><strong>${esc(g.term)}:</strong> ${esc(g.title)}${g.due ? ` <span class="muted small">by ${fmtDate(g.due)}</span>` : ''}</li>`).join('')}</ul>`
        : `<p class="muted">No SMART goals yet. <a href="#/clients/${c.id}/goals">Set goals</a>.</p>`}
    </section>
  </div>`));
}

/* ================= Add / edit profile ================= */

function renderProfileForm(ctx, client) {
  ctx.setTitle(client ? 'Edit client' : 'New client');
  ctx.setBack(true);
  const v = client || {};
  const form = h(`<form class="stack narrow" novalidate>
    <label class="field"><span>Full name *</span><input name="name" required autocomplete="off" value="${esc(v.name)}"></label>
    <label class="field"><span>Date of birth</span><input name="dob" type="date" value="${esc(v.dob)}"><div class="hint">Used to flag young people (under 18) and older adults (65+), and for fitness test norms.</div></label>
    <label class="field"><span>Sex</span><select name="sex"><option value="">Select…</option>${['Female', 'Male', 'Prefer not to say'].map(o => `<option ${o === v.sex ? 'selected' : ''}>${o}</option>`).join('')}</select><div class="hint">Used for waist-risk bands and VO₂ max estimates.</div></label>
    <label class="field"><span>Phone</span><input name="phone" type="tel" value="${esc(v.phone)}"></label>
    <label class="field"><span>Email</span><input name="email" type="email" value="${esc(v.email)}"></label>
    <label class="field"><span>Emergency contact</span><input name="emergency" placeholder="Name, relationship & phone" value="${esc(v.emergency)}"></label>
    <label class="field"><span>GP surgery</span><input name="gp" value="${esc(v.gp)}"></label>
    <button class="btn primary block" type="submit">${client ? 'Save changes' : 'Add client and start onboarding'}</button>
    ${client ? '<button class="btn danger block" type="button" data-del>Delete client</button>' : ''}
  </form>`);
  ctx.el.append(form);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.name = data.name.trim();
    if (!data.name) { form.elements.name.focus(); toast('Name is required'); return; }
    if (client) { store.updateClient(client.id, data); toast('Saved'); history.back(); }
    else { const c = store.createClient(data); location.replace(`#/clients/${c.id}/parq`); }
  });
  const del = form.querySelector('[data-del]');
  if (del) confirmButton(del, `Tap again to permanently delete ${client.name}`, () => { store.deleteClient(client.id); location.replace('#/clients'); });
}

/* ================= Generic schema-driven form ================= */

const optVal = o => Array.isArray(o) ? o[0] : o;
const optLabel = o => Array.isArray(o) ? o[1] : o;

function fieldHtml(f, val, schema) {
  const req = schema.required?.includes(f.id) ? ' *' : '';
  const hint = f.hint ? `<div class="hint">${esc(f.hint)}</div>` : '';
  switch (f.type) {
    case 'heading': return `<div class="section-title">${esc(f.label)}</div>`;
    case 'info': return `<p class="muted small">${esc(f.label)}</p>`;
    case 'computed': return `<div class="computed"><span>${esc(f.label)}</span><output data-computed="${f.id}">—</output></div>`;
    case 'yesno': return `<div class="question" role="group" aria-label="${esc(f.label)}"><div>${esc(f.label)}</div><div class="yn">
        <label><input type="radio" name="${f.id}" value="yes" ${val === 'yes' ? 'checked' : ''}>Yes</label>
        <label><input type="radio" name="${f.id}" value="no" ${val === 'no' ? 'checked' : ''}>No</label></div></div>`;
    case 'checkbox': return `<label class="check"><input type="checkbox" name="${f.id}" ${val ? 'checked' : ''}><span>${esc(f.label)}${req}</span></label>`;
    case 'multi': return `<fieldset class="multi"><legend>${esc(f.label)}</legend>${f.options.map(o => `<label class="check"><input type="checkbox" name="${f.id}" value="${esc(optVal(o))}" ${(val || []).includes(optVal(o)) ? 'checked' : ''}><span>${esc(optLabel(o))}</span></label>`).join('')}</fieldset>`;
    case 'textarea': return `<label class="field"><span>${esc(f.label)}${req}</span><textarea name="${f.id}" placeholder="${esc(f.placeholder || '')}">${esc(val)}</textarea>${hint}</label>`;
    case 'select': return `<label class="field"><span>${esc(f.label)}${req}</span><select name="${f.id}"><option value="">Select…</option>${f.options.map(o => `<option ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select>${hint}</label>`;
    case 'signature': return `<div class="field"><span>${esc(f.label)}</span><canvas class="sig-pad" data-sig="${f.id}"></canvas>
        <div class="btn-row" style="margin-top:6px"><button type="button" class="btn sm" data-clear="${f.id}">Clear signature</button></div></div>`;
    default: return `<label class="field"><span>${esc(f.label)}${req}</span><input name="${f.id}" type="${f.type}"
        ${f.min != null ? `min="${f.min}"` : ''} ${f.max != null ? `max="${f.max}"` : ''} ${f.step != null ? `step="${f.step}"` : ''}
        ${f.type === 'number' ? 'inputmode="decimal"' : ''} placeholder="${esc(f.placeholder || '')}" value="${esc(val)}">${hint}</label>`;
  }
}

/** Build a live form (showIf + computed fields). Returns { el, read } */
function buildForm(schema, client, values, submitLabel) {
  const today = new Date().toISOString().slice(0, 10);
  const form = h(`<form class="stack narrow" novalidate>
    ${schema.fields.map(f => `<div class="fwrap" data-f="${f.id}">${fieldHtml(f, values[f.id] ?? (f.default === 'today' ? today : ''), schema)}</div>`).join('')}
    <button class="btn primary block" type="submit">${esc(submitLabel)}</button>
  </form>`);
  const pads = {};
  form.querySelectorAll('[data-sig]').forEach(cv => { pads[cv.dataset.sig] = signaturePad(cv, values[cv.dataset.sig]); });
  form.querySelectorAll('[data-clear]').forEach(b => b.addEventListener('click', () => pads[b.dataset.clear].clear()));

  const read = () => {
    const out = {};
    for (const f of schema.fields) {
      if (['heading', 'info', 'computed'].includes(f.type)) continue;
      if (f.type === 'checkbox') out[f.id] = form.elements.namedItem(f.id).checked;
      else if (f.type === 'signature') out[f.id] = pads[f.id].value();
      else if (f.type === 'yesno') out[f.id] = form.querySelector(`input[name="${f.id}"]:checked`)?.value || '';
      else if (f.type === 'multi') out[f.id] = [...form.querySelectorAll(`input[name="${CSS.escape(f.id)}"]:checked`)].map(i => i.value);
      else out[f.id] = (form.elements.namedItem(f.id)?.value ?? '').trim();
    }
    return out;
  };
  const refresh = () => {
    const v = read();
    for (const f of schema.fields) {
      const wrap = form.querySelector(`[data-f="${CSS.escape(f.id)}"]`);
      if (f.showIf) wrap.hidden = !f.showIf(v, client);
      if (f.type === 'computed') wrap.querySelector('output').textContent = f.compute(v, client) ?? '—';
    }
  };
  form.addEventListener('input', refresh);
  form.addEventListener('change', refresh);
  refresh();
  return { el: form, read, visible: id => !form.querySelector(`[data-f="${CSS.escape(id)}"]`)?.hidden };
}

function renderForm(ctx, client, schema) {
  const saved = client.forms[schema.id];
  const values = saved?.values || {};
  const top = h(`<div class="stack narrow">
    <p class="muted small" style="margin:0">${esc(schema.description)}</p>
    ${saved ? `<div class="banner ok">Last saved ${fmtDate(saved.savedAt)}</div>` : ''}
    ${schema.flag && saved && schema.flag(values) ? '<div class="banner danger">A "Yes" answer without recorded medical clearance: do not start training until cleared.</div>' : ''}
  </div>`);
  const { el, read, visible } = buildForm(schema, client, values, `Save ${schema.title}`);
  ctx.el.append(top, el);
  el.addEventListener('submit', e => {
    e.preventDefault();
    const out = read();
    const missing = (schema.required || []).filter(id => visible(id) && !out[id]);
    if (missing.length) { toast('Please complete all required (*) items'); return; }
    if (schema.id === 'parq' && schema.fields.some(f => f.type === 'yesno' && !out[f.id])) { toast('Please answer every question'); return; }
    store.saveForm(client.id, schema.id, out);
    toast(`${schema.title} saved`);
    const ob = onboarding(store.getClient(client.id)); const next = ob.find(s => !s.done);
    if (next && next.id !== schema.id) location.hash = `#/clients/${client.id}/${next.id}`; else ctx.rerender();
  });
}

/* ================= SMART goals ================= */

const TERMS = [
  ['Short term', 'Up to 1 month', 28, [0, 42]],
  ['Medium term', '1–6 months', 84, [21, 200]],
  ['Long term', '6 months or more', 182, [150, 3650]],
];
const daysFrom = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
const smartLetters = g => [['S', g.specific], ['M', g.measure && g.target], ['A', g.agreed], ['R', g.relevant], ['T', g.due]];

function renderGoals(ctx, client) {
  const schema = FORM_BY_ID.goals;
  const values = client.forms.goals?.values || {};
  ctx.el.append(h(`<div class="stack narrow"><div class="section-title" style="margin-top:0">1. Goal-setting consultation</div></div>`));
  const intro = buildForm(schema, client, values, 'Save consultation');
  ctx.el.append(intro.el);
  intro.el.addEventListener('submit', e => { e.preventDefault(); store.saveForm(client.id, 'goals', intro.read()); toast('Consultation saved'); });

  const wrap = h(`<div class="stack" style="margin-top:20px">
    <div class="section-title">2. SMART goals</div>
    <aside class="callout callout-key narrow"><strong>Remember</strong><p><strong>S</strong>pecific · <strong>M</strong>easurable · <strong>A</strong>greed / achievable · <strong>R</strong>ealistic / relevant · <strong>T</strong>ime-bound. Mix <em>outcome</em> goals (the result), <em>performance</em> goals (personal measures) and <em>process</em> goals (the habits within the client's control: best for beginners).</p></aside>
    <div data-goals></div>
    <button type="button" class="btn primary" data-add>+ Add a SMART goal</button>
    <div data-editor></div>
  </div>`);
  ctx.el.append(wrap);
  const list = wrap.querySelector('[data-goals]'), editor = wrap.querySelector('[data-editor]');

  const draw = () => {
    const goals = store.getClient(client.id).smartGoals || [];
    list.innerHTML = TERMS.map(([term, span]) => {
      const gs = goals.filter(g => g.term === term);
      return `<section class="goal-term"><h3>${term} <span class="muted small">${span}</span></h3>
        ${gs.length ? gs.map(g => {
          const days = g.due ? Math.round((new Date(g.due) - new Date(g.created || Date.now())) / 864e5) : null;
          const [, , , [lo, hi]] = TERMS.find(t => t[0] === g.term);
          const mismatch = days != null && (days < lo || days > hi);
          return `<article class="card goal ${g.status !== 'Active' ? 'goal-closed' : ''}">
            <div class="goal-head"><strong>${esc(g.title)}</strong>
              <span class="tag">${esc(g.type)}</span>
              <span class="tag ${g.status === 'Achieved' ? 'ok' : g.status === 'Active' ? '' : 'warn'}">${esc(g.status)}</span></div>
            <div class="smart">${smartLetters(g).map(([l, ok]) => `<span class="${ok ? 'on' : ''}" title="${ok ? 'Complete' : 'Missing'}">${l}</span>`).join('')}</div>
            <dl class="kv small">
              ${g.specific ? `<dt>Specific</dt><dd>${esc(g.specific)}</dd>` : ''}
              ${g.measure ? `<dt>Measure</dt><dd>${esc(g.measure)}${g.baseline ? ` · now: ${esc(g.baseline)}` : ''}${g.target ? ` · target: ${esc(g.target)}` : ''}</dd>` : ''}
              ${g.achievable ? `<dt>Achievable</dt><dd>${esc(g.achievable)}</dd>` : ''}
              ${g.relevant ? `<dt>Relevant</dt><dd>${esc(g.relevant)}</dd>` : ''}
              ${g.due ? `<dt>By</dt><dd>${fmtDate(g.due)}</dd>` : ''}
              ${g.notes ? `<dt>Review</dt><dd>${esc(g.notes)}</dd>` : ''}
            </dl>
            ${mismatch ? `<div class="banner warn small">Target date doesn't fit a ${g.term.toLowerCase()} goal: adjust the date or the term.</div>` : ''}
            <div class="btn-row" style="margin-top:8px">
              <button type="button" class="btn sm" data-edit="${g.id}">Edit / review</button>
              ${g.status === 'Active' ? `<button type="button" class="btn sm" data-done="${g.id}">Mark achieved</button>` : ''}
              <button type="button" class="btn sm danger" data-del="${g.id}">Delete</button>
            </div>
          </article>`;
        }).join('') : '<p class="muted small">None yet.</p>'}
      </section>`;
    }).join('');
    list.querySelectorAll('[data-del]').forEach(b => confirmButton(b, 'Tap again to delete', () => save(goals.filter(g => g.id !== b.dataset.del))));
  };
  const save = goals => { store.updateClient(client.id, { smartGoals: goals }); draw(); };

  list.addEventListener('click', e => {
    const goals = store.getClient(client.id).smartGoals || [];
    const ed = e.target.closest('[data-edit]'), dn = e.target.closest('[data-done]');
    if (ed) openEditor(goals.find(g => g.id === ed.dataset.edit));
    if (dn) { save(goals.map(g => g.id === dn.dataset.done ? { ...g, status: 'Achieved', achievedAt: new Date().toISOString() } : g)); toast('Goal achieved — celebrate it!'); }
  });
  wrap.querySelector('[data-add]').addEventListener('click', () => openEditor(null));

  function openEditor(goal) {
    const g = goal || { term: 'Short term', type: 'Process', status: 'Active', due: daysFrom(28) };
    const sel = (name, opts, v) => `<select name="${name}">${opts.map(o => `<option ${o === v ? 'selected' : ''}>${o}</option>`).join('')}</select>`;
    editor.innerHTML = '';
    const f = h(`<form class="card stack narrow goal-editor" novalidate>
      <h3>${goal ? 'Edit goal' : 'New SMART goal'}</h3>
      <div class="detail-grid">
        <label class="field"><span>Term</span>${sel('term', TERMS.map(t => t[0]), g.term)}</label>
        <label class="field"><span>Type</span>${sel('type', ['Process', 'Performance', 'Outcome'], g.type)}</label>
      </div>
      <label class="field"><span>Goal in one line *</span><input name="title" value="${esc(g.title)}" placeholder="e.g. Walk 5 km without stopping"></label>
      <label class="field"><span>S: Specific: exactly what will be achieved?</span><textarea name="specific">${esc(g.specific)}</textarea></label>
      <div class="detail-grid">
        <label class="field"><span>M: How will it be measured?</span><input name="measure" value="${esc(g.measure)}" placeholder="e.g. timed walk, waist cm, 5RM"></label>
        <label class="field"><span>Starting point</span><input name="baseline" value="${esc(g.baseline)}" placeholder="e.g. 2 km"></label>
      </div>
      <label class="field"><span>Target</span><input name="target" value="${esc(g.target)}" placeholder="e.g. 5 km"></label>
      <label class="field"><span>A: Why is it achievable?</span><textarea name="achievable">${esc(g.achievable)}</textarea></label>
      <label class="check"><input type="checkbox" name="agreed" ${g.agreed ? 'checked' : ''}><span>Agreed with the client</span></label>
      <label class="field"><span>R: Realistic / relevant: why does it matter and does it fit their life?</span><textarea name="relevant">${esc(g.relevant)}</textarea></label>
      <div class="detail-grid">
        <label class="field"><span>T: Target date</span><input type="date" name="due" value="${esc(g.due)}"></label>
        <label class="field"><span>Status</span>${sel('status', ['Active', 'Achieved', 'Revised', 'Not achieved'], g.status)}</label>
      </div>
      <label class="field"><span>Review notes</span><textarea name="notes">${esc(g.notes)}</textarea></label>
      <div class="btn-row"><button class="btn primary" type="submit">Save goal</button><button class="btn" type="button" data-cancel>Cancel</button></div>
    </form>`);
    editor.append(f);
    let dateTouched = !!goal;
    f.elements.due.addEventListener('input', () => { dateTouched = true; });
    f.elements.term.addEventListener('change', () => { if (!dateTouched) f.elements.due.value = daysFrom(TERMS.find(t => t[0] === f.elements.term.value)[2]); });
    f.querySelector('[data-cancel]').addEventListener('click', () => { editor.innerHTML = ''; });
    f.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(f)); d.agreed = f.elements.agreed.checked;
      if (!d.title.trim()) { toast('Give the goal a one-line title'); return; }
      const goals = store.getClient(client.id).smartGoals || [];
      const next = goal ? goals.map(x => x.id === goal.id ? { ...x, ...d } : x)
        : [...goals, { ...d, id: Date.now().toString(36), created: new Date().toISOString() }];
      save(next); editor.innerHTML = ''; toast('Goal saved');
    });
    f.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  draw();
}

/* ================= Signature pad ================= */

function signaturePad(canvas, initial) {
  const ctx = canvas.getContext('2d');
  let drawing = false, dirty = false;
  const fit = () => {
    const r = canvas.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    canvas.width = r.width * d; canvas.height = r.height * d;
    ctx.scale(d, d); ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = getComputedStyle(document.body).color;
  };
  requestAnimationFrame(() => {
    fit();
    if (initial) { const img = new Image(); img.onload = () => { const r = canvas.getBoundingClientRect(); ctx.drawImage(img, 0, 0, r.width, r.height); dirty = true; }; img.src = initial; }
  });
  const pos = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  canvas.addEventListener('pointerdown', e => { drawing = true; dirty = true; canvas.setPointerCapture(e.pointerId); ctx.beginPath(); ctx.moveTo(...pos(e)); });
  canvas.addEventListener('pointermove', e => { if (!drawing) return; ctx.lineTo(...pos(e)); ctx.stroke(); });
  const end = () => { drawing = false; };
  canvas.addEventListener('pointerup', end); canvas.addEventListener('pointercancel', end);
  return { clear() { ctx.clearRect(0, 0, canvas.width, canvas.height); dirty = false; }, value: () => dirty ? canvas.toDataURL('image/png') : '' };
}

/* ================= Notes ================= */

function renderNotes(ctx, client) {
  const form = h(`<form class="stack narrow">
    <label class="field"><span>New session note</span><textarea name="text" placeholder="What did you do today? How did they feel? Any pain, RPE, changes in health?"></textarea></label>
    <button class="btn primary block" type="submit">Add note</button>
  </form>`);
  const list = h('<div class="stack narrow" style="margin-top:16px"></div>');
  ctx.el.append(form, list);
  const draw = () => {
    const c = store.getClient(client.id);
    list.innerHTML = c.notes?.length ? c.notes.map(n => `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
          <span class="muted small">${fmtDate(n.at)}</span>
          <button type="button" class="btn sm danger" data-del="${n.id}" aria-label="Delete note">Delete</button>
        </div>
        <p style="margin:6px 0 0;white-space:pre-wrap">${esc(n.text)}</p>
      </div>`).join('') : '<p class="empty">No notes yet.</p>';
    list.querySelectorAll('[data-del]').forEach(b => confirmButton(b, 'Tap again to delete', () => { store.deleteNote(client.id, b.dataset.del); draw(); }));
  };
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = form.elements.text.value.trim(); if (!text) return;
    store.addNote(client.id, text); form.reset(); draw();
  });
  draw();
}
