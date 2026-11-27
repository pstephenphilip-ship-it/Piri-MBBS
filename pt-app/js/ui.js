// Tiny DOM helpers shared by the views.

/** Escape text for safe interpolation into HTML template strings. */
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/** Build an element from an HTML string (first element). */
export function h(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}

export const chevron = '<svg class="chev" width="18" height="18" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function toast(msg) {
  const t = h(`<div class="toast" role="status">${esc(msg)}</div>`);
  document.body.append(t);
  setTimeout(() => t.remove(), 2300);
}

/**
 * Two-tap confirmation for destructive buttons (native confirm() dialogs are
 * blocked in some embedded viewers). First tap arms the button, second tap
 * within 4 s runs the action.
 */
export function confirmButton(btn, armedLabel, action) {
  const label = btn.textContent;
  let timer = null;
  btn.addEventListener('click', e => {
    e.preventDefault();
    if (btn.classList.contains('confirm-armed')) { clearTimeout(timer); action(); return; }
    btn.classList.add('confirm-armed');
    btn.textContent = armedLabel;
    timer = setTimeout(() => { btn.classList.remove('confirm-armed'); btn.textContent = label; }, 4000);
  });
}

export const fmtDate = iso => iso ? new Date(iso).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export const initials = name => name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');

export function ageFrom(dob) {
  if (!dob) return null;
  const d = new Date(dob), n = new Date();
  let a = n.getFullYear() - d.getFullYear();
  if (n.getMonth() < d.getMonth() || (n.getMonth() === d.getMonth() && n.getDate() < d.getDate())) a--;
  return a;
}
