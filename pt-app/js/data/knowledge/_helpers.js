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
