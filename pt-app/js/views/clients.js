import * as store from '../store.js';
import { FORMS } from '../data/forms.js';
import { esc, h, chevron, toast, fmtDate, initials, ageFrom } from '../ui.js';

// Routes:
//   #/clients                    list
//   #/clients/new                add client
//   #/clients/:id                overview
//   #/clients/:id/edit           edit profile
//   #/clients/:id/:formId        a form from data/forms.js
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
  const form = FORMS.find(f => f.id === section);
  if (form) return renderForm(sub, client, form);
  body.append(h('<p class="empty">Unknown section.</p>'));
}

/* ---------------- List ---------------- */

function renderList(ctx) {
  ctx.setTitle('Clients');
  ctx.setAction(h(`<a class="btn primary sm" href="#/clients/new">+ Add</a>`));

  const clients = store.listClients();
  if (!clients.length) {
    ctx.el.append(h(`<div class="empty stack">
      <p>No clients yet.</p>
      <a class="btn primary" href="#/clients/new">Add your first client</a>
    </div>`));
    return;
  }

  const root = h(`<div class="stack">
    <input class="search" type="search" placeholder="Search clients…" aria-label="Search clients">
    <ul class="list"></ul>
  </div>`);
  ctx.el.append(root);
  const listEl = root.querySelector('.list');

  const draw = q => {
    const items = clients.filter(c => c.name.toLowerCase().includes(q));
    listEl.innerHTML = items.map(c => {
      const st = formStatus(c);
      return `<li><a href="#/clients/${c.id}">
        <span class="avatar">${esc(initials(c.name))}</span>
        <div class="grow">
          <div class="title">${esc(c.name)}</div>
          <div class="sub">${esc(c.forms.goals?.values.primary || 'No goal set')}</div>
        </div>
        ${st.flag ? '<span class="tag danger">PAR-Q flag</span>'
          : st.done < st.total ? `<span class="tag warn">${st.done}/${st.total}</span>`
          : '<span class="tag ok">Ready</span>'}
        ${chevron}
      </a></li>`;
    }).join('') || '<li class="empty">No clients match.</li>';
  };
  root.querySelector('.search').addEventListener('input', e => draw(e.target.value.trim().toLowerCase()));
  draw('');
}

function formStatus(c) {
  const parq = FORMS.find(f => f.id === 'parq');
  return {
    done: FORMS.filter(f => c.forms[f.id]).length,
    total: FORMS.length,
    flag: c.forms.parq ? parq.flag(c.forms.parq.values) : false,
  };
}

/* ---------------- Section tabs ---------------- */

function sectionTabs(client, active) {
  const tabs = [['overview', 'Overview'], ...FORMS.map(f => [f.id, f.title]), ['notes', 'Notes']];
  const el = h(`<nav class="seg" aria-label="Client sections">
    ${tabs.map(([id, label]) => `<a href="#/clients/${client.id}/${id}" class="${id === active ? 'active' : ''}">${esc(label)}${client.forms[id] ? ' ✓' : ''}</a>`).join('')}
  </nav>`);
  // Keep the active tab in view on narrow screens.
  requestAnimationFrame(() => el.querySelector('.active')?.scrollIntoView({ inline: 'center', block: 'nearest' }));
  return el;
}

/* ---------------- Overview ---------------- */

function renderOverview(ctx, c) {
  const st = formStatus(c);
  const age = ageFrom(c.dob);
  ctx.el.append(h(`<div class="stack">
    ${st.flag ? `<div class="banner warn"><strong>PAR-Q flag:</strong> one or more "Yes" answers. Obtain medical clearance before training.</div>` : ''}
    <div class="card stack">
      <div style="display:flex;gap:12px;align-items:center">
        <span class="avatar" style="width:52px;height:52px;font-size:18px">${esc(initials(c.name))}</span>
        <div class="grow">
          <h2>${esc(c.name)}</h2>
          <div class="muted small">Client since ${fmtDate(c.createdAt)}</div>
        </div>
        <a class="btn sm" href="#/clients/${c.id}/edit">Edit</a>
      </div>
      <dl class="kv">
        ${age != null ? `<dt>Age</dt><dd>${age}</dd>` : ''}
        ${c.phone ? `<dt>Phone</dt><dd><a href="tel:${esc(c.phone)}">${esc(c.phone)}</a></dd>` : ''}
        ${c.email ? `<dt>Email</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd>` : ''}
        ${c.emergency ? `<dt>Emergency</dt><dd>${esc(c.emergency)}</dd>` : ''}
      </dl>
    </div>
    <div class="section-title">Onboarding</div>
    <ul class="list">
      ${FORMS.map(f => `<li><a href="#/clients/${c.id}/${f.id}">
        <div class="grow">
          <div class="title">${esc(f.title)}</div>
          <div class="sub">${c.forms[f.id] ? 'Completed ' + fmtDate(c.forms[f.id].savedAt) : 'Not started'}</div>
        </div>
        ${c.forms[f.id] ? '<span class="tag ok">Done</span>' : '<span class="tag">To do</span>'}
        ${chevron}
      </a></li>`).join('')}
    </ul>
    <div class="section-title">Coming soon</div>
    <ul class="list">
      <li><div class="row muted"><div class="grow">Programmes &amp; workouts</div></div></li>
      <li><div class="row muted"><div class="grow">Progress charts</div></div></li>
      <li><div class="row muted"><div class="grow">Session booking</div></div></li>
    </ul>
  </div>`));
}

/* ---------------- Add / edit profile ---------------- */

function renderProfileForm(ctx, client) {
  ctx.setTitle(client ? 'Edit client' : 'New client');
  ctx.setBack(true);
  const v = client || {};
  const form = h(`<form class="stack" novalidate>
    <label class="field"><span>Full name *</span><input name="name" required autocomplete="off" value="${esc(v.name)}"></label>
    <label class="field"><span>Date of birth</span><input name="dob" type="date" value="${esc(v.dob)}"></label>
    <label class="field"><span>Phone</span><input name="phone" type="tel" value="${esc(v.phone)}"></label>
    <label class="field"><span>Email</span><input name="email" type="email" value="${esc(v.email)}"></label>
    <label class="field"><span>Emergency contact</span><input name="emergency" placeholder="Name & phone" value="${esc(v.emergency)}"></label>
    <button class="btn primary block" type="submit">${client ? 'Save changes' : 'Add client'}</button>
    ${client ? '<button class="btn danger block" type="button" data-del>Delete client</button>' : ''}
  </form>`);
  ctx.el.append(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.name = data.name.trim();
    if (!data.name) { form.elements.name.focus(); toast('Name is required'); return; }
    if (client) {
      store.updateClient(client.id, data);
      toast('Saved');
      history.back();
    } else {
      const c = store.createClient(data);
      location.replace(`#/clients/${c.id}`);
    }
  });

  form.querySelector('[data-del]')?.addEventListener('click', () => {
    if (!confirm(`Delete ${client.name} and all their records? This cannot be undone.`)) return;
    store.deleteClient(client.id);
    location.replace('#/clients');
  });
}

/* ---------------- Generic schema-driven form ---------------- */

function renderForm(ctx, client, schema) {
  const saved = client.forms[schema.id];
  const values = saved?.values || {};
  const today = new Date().toISOString().slice(0, 10);

  const fieldHtml = f => {
    const val = values[f.id] ?? (f.default === 'today' ? today : '');
    const req = schema.required?.includes(f.id) ? ' *' : '';
    switch (f.type) {
      case 'heading': return `<div class="section-title">${esc(f.label)}</div>`;
      case 'yesno': return `<div class="question" role="group" aria-label="${esc(f.label)}">
          <div>${esc(f.label)}</div>
          <div class="yn">
            <label><input type="radio" name="${f.id}" value="yes" ${val === 'yes' ? 'checked' : ''}>Yes</label>
            <label><input type="radio" name="${f.id}" value="no" ${val === 'no' ? 'checked' : ''}>No</label>
          </div></div>`;
      case 'checkbox': return `<label class="check"><input type="checkbox" name="${f.id}" ${val ? 'checked' : ''}><span>${esc(f.label)}${req}</span></label>`;
      case 'textarea': return `<label class="field"><span>${esc(f.label)}${req}</span><textarea name="${f.id}">${esc(val)}</textarea></label>`;
      case 'select': return `<label class="field"><span>${esc(f.label)}${req}</span><select name="${f.id}">
          <option value="">Select…</option>
          ${f.options.map(o => `<option ${o === val ? 'selected' : ''}>${esc(o)}</option>`).join('')}
        </select></label>`;
      case 'signature': return `<div class="field"><span>${esc(f.label)}</span>
          <canvas class="sig-pad" data-sig="${f.id}"></canvas>
          <div class="btn-row" style="margin-top:6px"><button type="button" class="btn sm" data-clear="${f.id}">Clear signature</button></div></div>`;
      default: return `<label class="field"><span>${esc(f.label)}${req}</span><input name="${f.id}" type="${f.type}"
          ${f.min != null ? `min="${f.min}"` : ''} ${f.max != null ? `max="${f.max}"` : ''}
          ${f.type === 'number' ? 'inputmode="decimal"' : ''}
          placeholder="${esc(f.placeholder || '')}" value="${esc(val)}"></label>`;
    }
  };

  const form = h(`<form class="stack" novalidate>
    <p class="muted small">${esc(schema.description)}</p>
    ${saved ? `<div class="banner ok">Last saved ${fmtDate(saved.savedAt)}</div>` : ''}
    ${schema.flag && saved && schema.flag(values) ? '<div class="banner warn">One or more "Yes" answers — medical clearance recommended before training.</div>' : ''}
    ${schema.fields.map(fieldHtml).join('')}
    <button class="btn primary block" type="submit">Save ${esc(schema.title)}</button>
  </form>`);
  ctx.el.append(form);

  // Signature pads
  const pads = {};
  form.querySelectorAll('[data-sig]').forEach(cv => {
    pads[cv.dataset.sig] = signaturePad(cv, values[cv.dataset.sig]);
  });
  form.querySelectorAll('[data-clear]').forEach(b =>
    b.addEventListener('click', () => pads[b.dataset.clear].clear()));

  form.addEventListener('submit', e => {
    e.preventDefault();
    const out = {};
    for (const f of schema.fields) {
      if (f.type === 'heading') continue;
      if (f.type === 'checkbox') out[f.id] = form.elements[f.id].checked;
      else if (f.type === 'signature') out[f.id] = pads[f.id].value();
      else if (f.type === 'yesno') out[f.id] = form.querySelector(`input[name="${f.id}"]:checked`)?.value || '';
      else out[f.id] = form.elements[f.id].value.trim();
    }
    const missing = (schema.required || []).filter(id => !out[id]);
    if (missing.length) { toast('Please complete all required (*) items'); return; }
    if (schema.id === 'parq' && schema.fields.some(f => f.type === 'yesno' && !out[f.id])) {
      toast('Please answer every question'); return;
    }
    store.saveForm(client.id, schema.id, out);
    toast(`${schema.title} saved`);
    ctx.rerender();
  });
}

/** Minimal canvas signature pad. Value is a PNG data URL ('' when empty). */
function signaturePad(canvas, initial) {
  const ctx = canvas.getContext('2d');
  let drawing = false, dirty = false;

  const fit = () => {
    const r = canvas.getBoundingClientRect(), d = window.devicePixelRatio || 1;
    canvas.width = r.width * d; canvas.height = r.height * d;
    ctx.scale(d, d);
    ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.strokeStyle = getComputedStyle(document.body).color;
  };
  requestAnimationFrame(() => {
    fit();
    if (initial) {
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height); dirty = true; };
      img.src = initial;
    }
  });

  const pos = e => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  canvas.addEventListener('pointerdown', e => { drawing = true; dirty = true; canvas.setPointerCapture(e.pointerId); ctx.beginPath(); ctx.moveTo(...pos(e)); });
  canvas.addEventListener('pointermove', e => { if (!drawing) return; ctx.lineTo(...pos(e)); ctx.stroke(); });
  const end = () => { drawing = false; };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);

  return {
    clear() { ctx.clearRect(0, 0, canvas.width, canvas.height); dirty = false; },
    value: () => dirty ? canvas.toDataURL('image/png') : '',
  };
}

/* ---------------- Notes ---------------- */

function renderNotes(ctx, client) {
  const form = h(`<form class="stack">
    <label class="field"><span>New session note</span><textarea name="text" placeholder="What did you do today? How did they feel?"></textarea></label>
    <button class="btn primary block" type="submit">Add note</button>
  </form>`);
  const list = h('<div class="stack" style="margin-top:16px"></div>');
  ctx.el.append(form, list);

  const draw = () => {
    const c = store.getClient(client.id);
    list.innerHTML = c.notes?.length ? c.notes.map(n => `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
          <span class="muted small">${fmtDate(n.at)}</span>
          <button class="btn sm danger" data-del="${n.id}" aria-label="Delete note">Delete</button>
        </div>
        <p style="margin:6px 0 0;white-space:pre-wrap">${esc(n.text)}</p>
      </div>`).join('') : '<p class="empty">No notes yet.</p>';
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = form.elements.text.value.trim();
    if (!text) return;
    store.addNote(client.id, text);
    form.reset();
    draw();
  });
  list.addEventListener('click', e => {
    const b = e.target.closest('[data-del]'); if (!b) return;
    if (!confirm('Delete this note?')) return;
    store.deleteNote(client.id, b.dataset.del);
    draw();
  });
  draw();
}
