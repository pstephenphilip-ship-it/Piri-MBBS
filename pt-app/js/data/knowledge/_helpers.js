// Small helpers for writing knowledge articles as HTML template strings.

/** A scrollable table. headers: string[], rows: string[][] (cells may contain HTML). */
export const table = (headers, rows) => `
<div class="table-wrap"><table>
  <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
</table></div>`;

/** A highlighted box. kind: 'pt' (trainer application), 'warn' (safety), 'key' (key facts). */
export const callout = (kind, title, html) => `
<aside class="callout callout-${kind}"><strong>${title}</strong>${html}</aside>`;

/** Self-test questions with hidden answers. qa: [question, answer][] */
export const quiz = qa => `
<h3>Check your understanding</h3>
<div class="quiz">${qa.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>`;

/** Link to an exercise in the exercise bank. */
export const ex = (id, label) => `<a href="#/exercises/${id}">${label}</a>`;

/** Link to another knowledge topic. */
export const kb = (cat, id, label) => `<a href="#/knowledge/${cat}/${id}">${label}</a>`;

/**
 * Build a knowledge topic made of muscle cards.
 * muscles: [{ name, aka?, origin, insertion, action, train, notes }]
 * Fields are HTML strings. Each card gets an at-a-glance row in the summary table.
 */
export const muscleTopic = ({ id, group, title, summary, intro = '', muscles, after = '', qa = [] }) => ({
  id, group, title, summary,
  body: `
${intro}
${table(['Muscle', 'Main action'], muscles.map(m => [`<strong>${m.name}</strong>`, m.short || m.action]))}
${muscles.map(m => `
<section class="muscle">
  <h3>${m.name}${m.aka ? ` <span class="muted small">(${m.aka})</span>` : ''}</h3>
  <dl class="kv">
    <dt>Origin</dt><dd>${m.origin}</dd>
    <dt>Insertion</dt><dd>${m.insertion}</dd>
    <dt>Action</dt><dd>${m.action}</dd>
    ${m.train ? `<dt>Train it</dt><dd>${m.train}</dd>` : ''}
  </dl>
  ${m.notes ? `<div class="muscle-notes"><strong>Trainer notes</strong>${m.notes}</div>` : ''}
</section>`).join('')}
${after}
${qa.length ? quiz(qa) : ''}`,
});
