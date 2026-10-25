// edx_template.js — reusable pptxgenjs house style for Pearson Edexcel GCSE Physics (1PH0) decks.
// Usage: const T = require('./edx_template'); const D = T.init({topic:15, ...}); ... D.save(path)
// All drawing is native shapes. LAYOUT_WIDE 13.333 x 7.5 in. Georgia titles, Calibri body.
'use strict';
const pptxgen = require('pptxgenjs');
const assert = require('assert');

// ---------- palette ----------
const C = {
  navy: '1F2A4A', navyDeep: '16213E', ink: '1A2340', circ1: '2B4C9B', circ2: '3A63C9',
  kicker: '9FB8F0', blue: '2E5BD8', blueMid: '3A63C9', band: 'EEF2FA', panel: 'EEF1F8',
  card: 'FFFFFF', cardBlue: 'F5F8FE', line: 'D5DCEB', cream: 'FFF4E0', orange: 'B8730A',
  orangeTab: 'F5A742', orangeBorder: 'E39A2F', red: 'C8414C', grey: '6B7385', text: '262B3A',
  green: '2E8B57', water: 'BFD9F2', waterDark: '5B9BD5', wood: 'C99A5B', steel: '8C96A8',
  white: 'FFFFFF',
};
const F = { head: 'Georgia', body: 'Calibri' };
const W = 13.333, H = 7.5;

// ---------- calc: assert each number in node ----------
const CALCS = [];
function calc(label, value, expected, tol = 1e-9) {
  const ok = Math.abs(value - expected) <= Math.max(tol, Math.abs(expected) * 1e-9);
  assert(ok, `calc failed: ${label}: got ${value}, expected ${expected}`);
  CALCS.push(`${label} = ${value}`);
  return value;
}
// round to n significant figures (returns number)
const sf = (v, n) => Number(v.toPrecision(n));

// ---------- rich text: "**bold**", "__blue__", "!!red!!" ----------
function rich(str, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__|!![^!]+!!|\^\^[^^]+\^\^)/g;
  let last = 0, m;
  const push = (t, o) => { if (t) out.push({ text: t, options: Object.assign({}, base, o) }); };
  while ((m = re.exec(str))) {
    push(str.slice(last, m.index), {});
    const tok = m[0];
    if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true });
    else if (tok.startsWith('__')) push(tok.slice(2, -2), { bold: true, color: C.blue });
    else if (tok.startsWith('!!')) push(tok.slice(2, -2), { bold: true, color: C.red });
    else push(tok.slice(2, -2), { superscript: true });
    last = m.index + tok.length;
  }
  push(str.slice(last), {});
  return out;
}
// lines -> runs with bullets / paragraph breaks
function para(lines, o = {}) {
  const size = o.size || 11, color = o.color || C.text;
  const runs = [];
  lines.forEach((ln, i) => {
    const isObj = typeof ln === 'object';
    const t = isObj ? ln.t : ln;
    const bullet = isObj && ln.nob ? false : (o.bullets !== false);
    const pieces = rich(t, { fontSize: isObj && ln.size ? ln.size : size, color: isObj && ln.color ? ln.color : color, fontFace: F.body, bold: isObj && ln.b });
    pieces.forEach((p, j) => {
      if (j === pieces.length - 1) {
        p.options.breakLine = i < lines.length - 1;
      }
      // paragraph props only on the first run (a bullet on a later run would start a new paragraph);
      // save() strips the duplicate <a:pPr> that pptxgenjs 3.12 writes for every later run.
      if (j === 0) {
        p.options.bullet = bullet ? { code: '25AA', indent: 12 } : false;
        p.options.paraSpaceAfter = o.space != null ? o.space : 3;
      }
      runs.push(p);
    });
  });
  return runs;
}

// ---------- equations table ----------
// status: 'recall' (students must recall) or 'given' (on the Physics Equations List)
const EQS = {
  Fkx: { eq: 'F = k × x', words: 'force exerted on a spring (N) = spring constant (N/m) × extension (m)', status: 'recall' },
  E12: { eq: 'E = ½ × k × x²', words: 'energy transferred in stretching (J) = 0.5 × spring constant (N/m) × (extension (m))²', status: 'given' },
  pFA: { eq: 'p = F / A', words: 'pressure (Pa) = force normal to surface (N) / area of surface (m²)', status: 'recall' },
  phrg: { eq: 'P = h × ρ × g', words: 'pressure due to a column of liquid (Pa) = height of column (m) × density of liquid (kg/m³) × g (N/kg)', status: 'given' },
  Wmg: { eq: 'W = m × g', words: 'weight (N) = mass (kg) × gravitational field strength (N/kg)', status: 'recall' },
  rho: { eq: 'ρ = m / V', words: 'density (kg/m³) = mass (kg) / volume (m³)', status: 'recall' },
  WFd: { eq: 'E = F × d', words: 'work done (J) = force (N) × distance moved in the direction of the force (m)', status: 'recall' },
};
const eqStatus = k => EQS[k].status === 'recall' ? 'Recall: you must learn this' : 'Given on the Physics Equations List';

// ---------- deck factory ----------
function init(DECK) {
  // DECK: {topic, title, shortTitle, specRange, pOnly:[codes], paper, kicker, subtitle, keywords, tierNote}
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'GCSE Physics';
  pres.title = `Edexcel 1PH0 Topic ${DECK.topic} ${DECK.title}`;
  const SH = pres.shapes;
  const footerText = `Pearson Edexcel GCSE (9–1) Physics (1PH0) | Topic ${DECK.topic} ${DECK.title} | Higher & Foundation`;
  let slideNo = 0;
  const spec = code => (DECK.pOnly || []).includes(code) ? code + 'P' : code;

  function newSlide(bg = C.white) {
    const s = pres.addSlide();
    s.background = { color: bg };
    slideNo++;
    s._no = slideNo;
    return s;
  }
  function footer(s, tag, dark = false) {
    s.addText(footerText, { x: 0.45, y: 7.08, w: 10.2, h: 0.28, fontFace: F.body, fontSize: 10, color: dark ? 'A9B4CF' : C.grey, margin: 0 });
    s.addText(`${tag ? tag + '  |  ' : ''}${s._no}`, { x: 10.7, y: 7.08, w: 2.2, h: 0.28, fontFace: F.body, fontSize: 10, color: dark ? 'A9B4CF' : C.grey, align: 'right', margin: 0 });
  }
  function pill(s, x, y, text, color = C.red, w) {
    const ww = w || (0.22 + text.length * 0.085);
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w: ww, h: 0.3, fill: { color }, line: { color }, rectRadius: 0.15 });
    s.addText(text, { x, y, w: ww, h: 0.3, fontFace: F.body, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    return ww;
  }
  // header band with title + subtitle + optional pills (opts.ht, opts.stretch, opts.cp)
  function contentHeader(title, subtitle, opts = {}) {
    const s = newSlide();
    s.addShape(SH.RECTANGLE, { x: 0, y: 0, w: W, h: 1.08, fill: { color: C.band }, line: { color: C.band } });
    s.addShape(SH.RECTANGLE, { x: 0, y: 1.08, w: W, h: 0.03, fill: { color: 'D3DCF0' }, line: { color: 'D3DCF0' } });
    s.addText(title, { x: 0.45, y: 0.13, w: 9.6, h: 0.55, fontFace: F.head, fontSize: 24, bold: true, color: C.ink, margin: 0, valign: 'middle' });
    if (subtitle) s.addText(subtitle, { x: 0.45, y: 0.7, w: 10.5, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.blue, margin: 0 });
    let px = W - 0.45;
    const pills = [];
    if (opts.stretch) pills.push(['GRADE 7–9 STRETCH', C.red, 1.75]);
    if (opts.ht) pills.push(['HT', C.red, 0.5]);
    if (opts.p) pills.push(['PHYSICS ONLY', C.blue, 1.3]);
    if (opts.cp) pills.push(['CORE PRACTICAL', C.orange, 1.5]);
    pills.forEach(([t, c, w]) => { px -= w; pill(s, px, 0.32, t, c, w); px -= 0.1; });
    footer(s, opts.tag || '');
    return s;
  }
  // left diagram panel with caption
  function panel(s, x = 0.45, y = 1.3, w = 6.1, h = 4.95, caption) {
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.panel }, line: { color: 'DCE2EF', width: 0.75 }, rectRadius: 0.08 });
    if (caption) s.addText('Illustrative diagram — ' + caption, { x: x + 0.15, y: y + h - 0.34, w: w - 0.3, h: 0.28, fontFace: F.body, fontSize: 10, italic: true, color: C.grey, margin: 0, align: 'center' });
    return { x, y, w, h };
  }
  // explanation card
  function card(s, x, y, w, h, head, lines, o = {}) {
    const fill = o.fill || C.cardBlue;
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: fill }, line: { color: o.border || C.line, width: 0.75 }, rectRadius: 0.06 });
    let ty = y + 0.1;
    if (head) {
      s.addText(head, { x: x + 0.18, y: ty, w: w - 0.36, h: 0.32, fontFace: F.body, fontSize: 13, bold: true, color: o.headColor || C.ink, margin: 0, valign: 'middle' });
      ty += 0.36;
    }
    if (lines && lines.length) {
      s.addText(para(lines, { size: o.size || 11, bullets: o.bullets }), { x: x + 0.18, y: ty, w: w - 0.36, h: y + h - ty - 0.08, fontFace: F.body, valign: 'top', margin: 0, paraSpaceAfter: 3 });
    }
  }
  // worked example card (cream)
  function workedSteps(s, x, y, w, h, head, q, steps, o = {}) {
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.cream }, line: { color: 'F1D9A8', width: 0.75 }, rectRadius: 0.06 });
    s.addText(head, { x: x + 0.18, y: y + 0.08, w: w - 0.36, h: 0.3, fontFace: F.body, fontSize: 13, bold: true, color: C.orange, margin: 0, valign: 'middle' });
    const runs = [];
    if (q) runs.push(...rich(q, { fontSize: o.size || 11, italic: true, color: C.text, fontFace: F.body }).map((r, i, a) => { if (i === a.length - 1) r.options.breakLine = true; return r; }));
    const labels = ['Equation', 'Rearrange', 'Substitute', 'Answer'];
    steps.forEach((st, i) => {
      const [lab, txt] = Array.isArray(st) ? st : [labels[i], st];
      const last = i === steps.length - 1;
      runs.push({ text: `${i + 1} ${lab}   `, options: { fontSize: o.size || 11, bold: true, color: C.blue, fontFace: F.body, paraSpaceBefore: 2 } });
      const body = rich(txt, { fontSize: o.size || 11, color: last ? C.red : C.text, bold: last, fontFace: F.body });
      body.forEach((r, j) => { if (j === body.length - 1 && !last) r.options.breakLine = true; runs.push(r); });
    });
    s.addText(runs, { x: x + 0.18, y: y + 0.42, w: w - 0.36, h: h - 0.5, valign: 'top', margin: 0 });
  }
  function quickCheck(s, q, y = 6.38) {
    s.addShape(SH.RECTANGLE, { x: 0.45, y, w: W - 0.9, h: 0.58, fill: { color: C.cream }, line: { color: 'F1D9A8', width: 0.5 } });
    s.addShape(SH.RECTANGLE, { x: 0.45, y, w: 0.09, h: 0.58, fill: { color: C.orangeBorder }, line: { color: C.orangeBorder } });
    s.addText([{ text: 'Quick check   ', options: { bold: true, color: C.orange, fontSize: 12 } }, ...rich(q, { fontSize: 11.5, color: C.text })],
      { x: 0.7, y, w: W - 1.3, h: 0.58, fontFace: F.body, valign: 'middle', margin: 0 });
  }
  function notes(s, txt) { s.addNotes(txt); }

  // standard content slide = header + panel + explanation card + worked card + quick check
  function contentSlide(o) {
    const s = contentHeader(o.title, o.subtitle, o);
    const p = panel(s, 0.45, 1.3, o.panelW || 6.1, 4.95, o.caption);
    if (o.draw) o.draw(s, p);
    const rx = 0.45 + (o.panelW || 6.1) + 0.25, rw = W - 0.45 - rx;
    const wh = o.worked ? (o.workedH || 2.15) : 0;
    const ch = 4.95 - (wh ? wh + 0.15 : 0);
    card(s, rx, 1.3, rw, ch, o.head, o.lines, { fill: o.cardFill || C.cardBlue, size: o.size || 11.5 });
    if (o.worked) workedSteps(s, rx, 1.3 + ch + 0.15, rw, wh, o.worked.head || 'Worked example', o.worked.q, o.worked.steps, { size: o.worked.size });
    if (o.qc) quickCheck(s, o.qc);
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // ---------- cover ----------
  function coverSlide(c) {
    const s = newSlide(C.navy);
    s.addShape(SH.OVAL, { x: 8.3, y: -1.6, w: 6.6, h: 6.6, fill: { color: C.circ1 }, line: { color: C.circ1 } });
    s.addShape(SH.OVAL, { x: 10.2, y: 2.6, w: 5.4, h: 5.4, fill: { color: C.circ2, transparency: 15 }, line: { color: C.circ2 } });
    s.addShape(SH.RECTANGLE, { x: 0, y: 0, w: 0.18, h: H, fill: { color: C.circ2 }, line: { color: C.circ2 } });
    s.addText(DECK.kicker || 'PEARSON EDEXCEL GCSE PHYSICS (1PH0)', { x: 0.8, y: 0.9, w: 8, h: 0.35, fontFace: F.body, fontSize: 13, bold: true, color: C.kicker, charSpacing: 4, margin: 0 });
    s.addText(`Topic ${DECK.topic}  ${c.bigTitle || DECK.title}`, { x: 0.8, y: 1.45, w: 10.5, h: 1.1, fontFace: F.head, fontSize: 40, bold: true, color: C.white, margin: 0, valign: 'middle', fit: 'none' });
    s.addText(DECK.subtitle, { x: 0.8, y: 2.6, w: 8.6, h: 0.5, fontFace: F.head, fontSize: 18, italic: true, color: 'C9D5F2', margin: 0 });
    s.addShape(SH.LINE, { x: 0.8, y: 3.3, w: 2.2, h: 0, line: { color: C.orangeTab, width: 2.5 } });
    s.addText(DECK.keywords.join('  •  '), { x: 0.8, y: 3.45, w: 8.8, h: 0.4, fontFace: F.body, fontSize: 13, color: 'DCE4F7', margin: 0 });
    const rows = c.rows;
    rows.forEach((r, i) => {
      const y = 4.25 + i * 0.68;
      s.addShape(SH.OVAL, { x: 0.8, y, w: 0.5, h: 0.5, fill: { color: C.circ2 }, line: { color: C.kicker, width: 1 } });
      s.addText(r.icon, { x: 0.8, y, w: 0.5, h: 0.5, fontFace: F.body, fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r.text, { x: 1.5, y, w: 7.6, h: 0.5, fontFace: F.body, fontSize: 14, color: C.white, valign: 'middle', margin: 0 });
    });
    s.addText(c.footer, { x: 0.8, y: 6.75, w: 9, h: 0.3, fontFace: F.body, fontSize: 10, italic: true, color: 'A9B4CF', margin: 0 });
    if (c.notes) notes(s, c.notes);
    return s;
  }

  // ---------- learning objectives ----------
  function objectivesSlide(objs, o = {}) {
    const s = contentHeader(o.title || 'Learning objectives', o.subtitle, { tag: 'Objectives' });
    const half = Math.ceil(objs.length / 2);
    const rowH = Math.min(0.95, 5.1 / half);
    objs.forEach((ob, i) => {
      const col = i < half ? 0 : 1, row = i < half ? i : i - half;
      const x = 0.55 + col * 6.3, y = 1.4 + row * rowH;
      s.addShape(SH.OVAL, { x, y: y + 0.05, w: 0.5, h: 0.5, fill: { color: C.blue }, line: { color: C.blue } });
      s.addText(String(i + 1), { x, y: y + 0.05, w: 0.5, h: 0.5, fontFace: F.head, fontSize: 16, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addText([{ text: ob.code + '   ', options: { bold: true, color: C.blue, fontSize: 11 } }, ...rich(ob.text, { fontSize: 12, color: C.text })],
        { x: x + 0.65, y, w: 5.0, h: rowH - 0.1, fontFace: F.body, valign: 'top', margin: 0 });
      if (ob.ht) pill(s, x + 5.2, y + rowH - 0.42, 'HT', C.red, 0.45);
    });
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // ---------- retrieval starter: 3x2 numbered cards ----------
  function retrievalSlide(qs, o = {}) {
    const s = contentHeader(o.title || 'Retrieval starter', o.subtitle, { tag: 'Starter' });
    qs.forEach((q, i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.45 + col * 4.2, y = 1.35 + row * 2.4, w = 4.0, h = 2.2;
      s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.cardBlue }, line: { color: C.line, width: 0.75 }, rectRadius: 0.06 });
      s.addShape(SH.OVAL, { x: x + 0.15, y: y + 0.15, w: 0.48, h: 0.48, fill: { color: C.blue }, line: { color: C.blue } });
      s.addText(String(i + 1), { x: x + 0.15, y: y + 0.15, w: 0.48, h: 0.48, fontFace: F.head, fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addText(q.from, { x: x + 0.75, y: y + 0.2, w: w - 0.9, h: 0.38, fontFace: F.body, fontSize: 10.5, italic: true, color: C.blue, margin: 0, valign: 'middle' });
      s.addText(rich(q.q, { fontSize: 12.5, color: C.text }), { x: x + 0.2, y: y + 0.75, w: w - 0.4, h: h - 0.9, fontFace: F.body, valign: 'top', margin: 0 });
    });
    s.addShape(SH.RECTANGLE, { x: 0.45, y: 6.25, w: W - 0.9, h: 0.6, fill: { color: C.band }, line: { color: C.line } });
    s.addText([{ text: 'Self-mark   ', options: { bold: true, color: C.blue } }, { text: o.selfMark || 'Swap and mark from the answers.  6/6 secure  •  4–5 nearly there  •  0–3 revisit the topic notes', options: { color: C.text } }],
      { x: 0.7, y: 6.25, w: W - 1.4, h: 0.6, fontFace: F.body, fontSize: 12, valign: 'middle', margin: 0 });
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // ---------- recap / exam practice ----------
  function recapSlide(n, subtitle, qs, o = {}) {
    const s = contentHeader(`Exam practice: recap ${n}`, subtitle, { ht: o.ht, tag: `Recap ${n}` });
    const total = qs.reduce((a, q) => a + q.marks, 0);
    const gap = 0.16, h = (5.55 - gap * (qs.length - 1)) / qs.length;
    qs.forEach((q, i) => {
      const y = 1.32 + i * (h + gap);
      s.addShape(SH.ROUNDED_RECTANGLE, { x: 0.45, y, w: W - 0.9, h, fill: { color: C.white }, line: { color: C.line, width: 1 }, rectRadius: 0.05 });
      s.addShape(SH.RECTANGLE, { x: 0.45, y, w: 2.3, h: 0.32, fill: { color: C.orangeTab }, line: { color: C.orangeTab } });
      s.addText('EXAM-STYLE QUESTION', { x: 0.45, y, w: 2.3, h: 0.32, fontFace: F.body, fontSize: 10.5, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0, charSpacing: 1 });
      if (q.ht) pill(s, 2.85, y + 0.01, 'HT', C.red, 0.45);
      s.addText(rich(q.q, { fontSize: 12.5, color: C.text }), { x: 0.7, y: y + 0.4, w: W - 2.9, h: h - 0.48, fontFace: F.body, valign: 'top', margin: 0 });
      s.addText(`[${q.marks} mark${q.marks > 1 ? 's' : ''}]`, { x: W - 2.05, y: y + h - 0.42, w: 1.45, h: 0.32, fontFace: F.body, fontSize: 12, bold: true, color: C.orangeTab, align: 'right', margin: 0 });
    });
    const ms = qs.map((q, i) => `Q${i + 1} [${q.marks}]: ${q.ms}`).join('\n');
    assert.strictEqual(qs.reduce((a, q) => a + q.marks, 0), total);
    notes(s, `MARK SCHEME — Recap ${n} (total ${total} marks)\n${ms}`);
    return { s, total };
  }

  // ---------- key words 4x4 ----------
  function keyWords(terms, o = {}) {
    assert.strictEqual(terms.length, 16, 'keyWords needs 16 terms');
    const s = contentHeader('Summary: key words', o.subtitle || `Topic ${DECK.topic} ${DECK.title} • learn these definitions`, { tag: 'Key words' });
    const cw = (W - 0.9 - 3 * 0.15) / 4, ch = 1.25;
    terms.forEach(([t, d], i) => {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 0.45 + col * (cw + 0.15), y = 1.3 + row * (ch + 0.12);
      s.addShape(SH.RECTANGLE, { x, y, w: cw, h: ch, fill: { color: C.cardBlue }, line: { color: C.line, width: 0.75 } });
      s.addShape(SH.RECTANGLE, { x, y, w: 0.08, h: ch, fill: { color: C.blue }, line: { color: C.blue } });
      s.addText([{ text: t, options: { bold: true, fontSize: 12, color: C.ink, breakLine: true } }, ...rich(d, { fontSize: 10, color: C.text })],
        { x: x + 0.18, y: y + 0.06, w: cw - 0.26, h: ch - 0.12, fontFace: F.body, valign: 'top', margin: 0 });
    });
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // ---------- equations summary ----------
  function equationsSlide(keys, o = {}) {
    const s = contentHeader(o.title || 'Summary: equations', o.subtitle, { tag: 'Equations' });
    const rows = [[
      { text: 'Equation', options: { bold: true, color: C.white, fill: { color: C.ink } } },
      { text: 'In words (units)', options: { bold: true, color: C.white, fill: { color: C.ink } } },
      { text: 'Recall or given?', options: { bold: true, color: C.white, fill: { color: C.ink } } },
      { text: 'Spec', options: { bold: true, color: C.white, fill: { color: C.ink } } }]];
    keys.forEach(([k, specRef], i) => {
      const e = EQS[k];
      const fill = { color: i % 2 ? C.white : C.cardBlue };
      rows.push([
        { text: e.eq, options: { bold: true, fontFace: F.head, fontSize: 14, color: C.ink, fill } },
        { text: e.words, options: { fill } },
        { text: e.status === 'recall' ? 'RECALL' : 'GIVEN', options: { bold: true, color: e.status === 'recall' ? C.red : C.green, fill } },
        { text: specRef, options: { color: C.blue, bold: true, fill } }]);
    });
    s.addTable(rows, { x: 0.45, y: 1.35, w: W - 0.9, colW: [2.6, 6.75, 1.6, 1.483], fontFace: F.body, fontSize: 12, color: C.text, border: { type: 'solid', color: C.line, pt: 0.75 }, valign: 'middle', rowH: 0.62 });
    if (o.qc) quickCheck(s, o.qc);
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // ---------- full question (a)-(f), two columns ----------
  function fullQuestion(intro, parts, expected, o = {}) {
    const s = contentHeader(o.title || 'Full exam question', o.subtitle, { ht: o.ht, tag: 'Full question' });
    const total = parts.reduce((a, p) => a + p.marks, 0);
    assert.strictEqual(total, expected, `full question total ${total} != ${expected}`);
    s.addText(rich(intro, { fontSize: 12, color: C.text, italic: true }), { x: 0.45, y: 1.25, w: W - 0.9, h: 0.55, fontFace: F.body, margin: 0, valign: 'middle' });
    const half = Math.ceil(parts.length / 2);
    const colW = (W - 0.9 - 0.25) / 2;
    [parts.slice(0, half), parts.slice(half)].forEach((col, ci) => {
      const x = 0.45 + ci * (colW + 0.25);
      const avail = 6.85 - 1.88, n = col.length, gap = 0.12;
      const weights = col.map(p => p.h || 1), wsum = weights.reduce((a, b) => a + b, 0);
      let y = 1.88;
      col.forEach((p, i) => {
        const h = (avail - gap * (n - 1)) * weights[i] / wsum;
        s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w: colW, h, fill: { color: i % 2 ? C.white : C.cardBlue }, line: { color: C.line, width: 0.75 }, rectRadius: 0.05 });
        s.addText([{ text: `(${p.l})  `, options: { bold: true, color: C.blue } }, ...rich(p.q, { color: C.text })], { x: x + 0.15, y: y + 0.08, w: colW - 0.3 - (p.ht ? 0.55 : 0), h: h - 0.4, fontFace: F.body, fontSize: 12, valign: 'top', margin: 0 });
        if (p.ht) pill(s, x + colW - 0.6, y + 0.08, 'HT', C.red, 0.45);
        s.addText(`[${p.marks} mark${p.marks > 1 ? 's' : ''}]`, { x: x + colW - 1.6, y: y + h - 0.34, w: 1.45, h: 0.28, fontFace: F.body, fontSize: 12, bold: true, color: C.orangeTab, align: 'right', margin: 0 });
        y += h + gap;
      });
    });
    s.addText(`Total: ${total} marks`, { x: W - 3.0, y: 6.82, w: 2.55, h: 0.24, fontFace: F.body, fontSize: 11, bold: true, color: C.orange, align: 'right', margin: 0 });
    notes(s, `MARK SCHEME — full question (total ${total} marks)\n` + parts.map(p => `(${p.l}) [${p.marks}]: ${p.ms}`).join('\n'));
    return s;
  }

  // ---------- 6-mark levels mark scheme text ----------
  function levels6(indicative, extra = '') {
    return [
      'Levels-based mark scheme (6 marks). Answers are marked holistically; use the indicative content below.',
      'Level 0 (0 marks): no rewardable material.',
      'Level 1 (1–2 marks): demonstrates elements of physics understanding, some of which is inaccurate; understanding of scientific ideas lacks detail; presents an explanation with some structure and coherence.',
      'Level 2 (3–4 marks): demonstrates physics understanding which is mostly relevant but may include some inaccuracies; understanding of scientific ideas is not fully detailed and/or developed; presents an explanation that has a structure which is mostly clear, coherent and logical.',
      'Level 3 (5–6 marks): demonstrates accurate and relevant physics understanding throughout; understanding of the scientific ideas is detailed and fully developed; presents an explanation that has a well-developed structure which is clear, coherent and logical.',
      'Indicative content:', ...indicative.map(t => ' • ' + t), extra].filter(Boolean).join('\n');
  }

  // ---------- homework divider + homework ----------
  function homework(intro, qs, expected, o = {}) {
    // divider
    const d = newSlide(C.blueMid);
    d.addShape(SH.OVAL, { x: 9.3, y: -1.2, w: 5.5, h: 5.5, fill: { color: C.circ1 }, line: { color: C.circ1 } });
    d.addShape(SH.OVAL, { x: 1.0, y: 2.35, w: 1.6, h: 1.6, fill: { color: C.white }, line: { color: C.white } });
    pencil(d, 1.8, 3.15, C.blueMid);
    d.addText('Homework', { x: 3.0, y: 2.3, w: 7, h: 1.1, fontFace: F.head, fontSize: 54, bold: true, color: C.white, margin: 0, valign: 'middle' });
    d.addText(o.dividerSub || `Topic ${DECK.topic} ${DECK.title} • ${expected} marks • about 30 minutes`, { x: 3.0, y: 3.4, w: 8, h: 0.5, fontFace: F.body, fontSize: 18, italic: true, color: 'E1E8FA', margin: 0 });
    footer(d, 'Homework', true);
    // homework slide
    const s = contentHeader('Homework', o.subtitle || `Answer in full sentences • show all working • ${expected} marks`, { tag: 'Homework', ht: o.ht });
    const total = qs.reduce((a, q) => a + q.marks, 0);
    assert.strictEqual(total, expected, `homework total ${total} != ${expected}`);
    if (intro) s.addText(rich(intro, { fontSize: 11.5, italic: true, color: C.text }), { x: 0.45, y: 1.22, w: W - 0.9, h: 0.38, fontFace: F.body, margin: 0, valign: 'middle' });
    const top = intro ? 1.66 : 1.32;
    const half = Math.ceil(qs.length / 2), colW = (W - 0.9 - 0.25) / 2;
    [qs.slice(0, half), qs.slice(half)].forEach((col, ci) => {
      const x = 0.45 + ci * (colW + 0.25);
      const gap = 0.12, avail = 6.92 - top;
      const weights = col.map(p => p.h || 1), wsum = weights.reduce((a, b) => a + b, 0);
      let y = top;
      col.forEach((q, i) => {
        const h = (avail - gap * (col.length - 1)) * weights[i] / wsum;
        s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w: colW, h, fill: { color: q.levels ? C.cream : C.cardBlue }, line: { color: q.levels ? 'F1D9A8' : C.line, width: 0.75 }, rectRadius: 0.05 });
        s.addText([{ text: `${q.n}  `, options: { bold: true, color: C.blue } }, ...rich(q.q, { color: C.text })], { x: x + 0.15, y: y + 0.08, w: colW - 0.3 - (q.ht ? 0.55 : 0), h: h - 0.38, fontFace: F.body, fontSize: 11.5, valign: 'top', margin: 0 });
        if (q.ht) pill(s, x + colW - 0.6, y + 0.08, 'HT', C.red, 0.45);
        s.addText(`[${q.marks} mark${q.marks > 1 ? 's' : ''}]`, { x: x + colW - 1.6, y: y + h - 0.32, w: 1.45, h: 0.26, fontFace: F.body, fontSize: 12, bold: true, color: C.orangeTab, align: 'right', margin: 0 });
        y += h + gap;
      });
    });
    notes(s, `MARK SCHEME — homework (total ${total} marks)\n` + qs.map(q => `${q.n} [${q.marks}]: ${q.ms}`).join('\n'));
    return s;
  }

  // ================= drawing helpers =================
  function line(s, x1, y1, x2, y2, color = C.ink, width = 1.5, o = {}) {
    const ln = { color, width };
    if (o.dash) ln.dashType = o.dash;
    if (o.head) ln.endArrowType = 'triangle';
    if (o.tail) ln.beginArrowType = 'triangle';
    s.addShape(SH.LINE, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1) || 0.0001, h: Math.abs(y2 - y1) || 0.0001, flipH: x2 < x1, flipV: y2 < y1, line: ln });
  }
  const arrow = (s, x1, y1, x2, y2, color = C.ink, width = 2, o = {}) => line(s, x1, y1, x2, y2, color, width, Object.assign({ head: true }, o));
  // force arrow from point (x,y) in direction dir with length len; label placed at the tip
  function forceArrow(s, x, y, dir, len, label, color = C.red, o = {}) {
    const d = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] }[dir];
    const x2 = x + d[0] * len, y2 = y + d[1] * len;
    arrow(s, x, y, x2, y2, color, o.width || 3);
    if (label) {
      const lw = o.lw || 1.4, fs = o.fs || 11;
      let lx = x2 - lw / 2, ly = y2 - 0.15;
      if (dir === 'up') ly = y2 - 0.32; if (dir === 'down') ly = y2 + 0.03;
      if (dir === 'left') { lx = x2 - lw - 0.05; ly = y2 - 0.15; }
      if (dir === 'right') { lx = x2 + 0.05; ly = y2 - 0.15; }
      if (o.lx != null) lx = o.lx; if (o.ly != null) ly = o.ly;
      s.addText(label, { x: lx, y: ly, w: lw, h: 0.3, fontFace: F.body, fontSize: fs, bold: true, color, align: dir === 'left' ? 'right' : dir === 'right' ? 'left' : 'center', margin: 0 });
    }
  }
  function label(s, x, y, w, t, o = {}) {
    s.addText(Array.isArray(t) ? t : rich(t, {}), { x, y, w, h: o.h || 0.28, fontFace: F.body, fontSize: o.size || 10.5, color: o.color || C.text, bold: o.bold, italic: o.italic, align: o.align || 'center', valign: o.valign || 'middle', margin: 0, rotate: o.rotate });
  }
  function box(s, x, y, w, h, fill, lineColor, o = {}) {
    s.addShape(o.shape || SH.RECTANGLE, { x, y, w, h, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: lineColor ? { color: lineColor, width: o.lw || 1 } : { type: 'none' }, rectRadius: o.r, rotate: o.rotate });
  }
  // spring: vertical zigzag from (x, y) down to y+len, centred on x
  function spring(s, x, y, len, o = {}) {
    const wdt = o.width || 0.32, n = o.coils || 12, color = o.color || '4A5568', lw = o.lw || 1.75;
    const lead = Math.min(0.12, len * 0.08);
    line(s, x, y, x, y + lead, color, lw);
    const zz = len - 2 * lead, step = zz / (2 * n);
    let px = x, py = y + lead;
    for (let i = 0; i < 2 * n; i++) {
      const nx = (i === 2 * n - 1) ? x : x + (i % 2 === 0 ? wdt / 2 : -wdt / 2);
      const ny = py + step;
      line(s, px, py, nx, ny, color, lw);
      px = nx; py = ny;
    }
    line(s, x, y + len - lead, x, y + len, color, lw);
  }
  // horizontal spring from x to x+len at height y
  function hspring(s, x, y, len, o = {}) {
    const ht = o.width || 0.3, n = o.coils || 8, color = o.color || '4A5568', lw = o.lw || 1.75;
    const lead = Math.min(0.12, len * 0.08), step = (len - 2 * lead) / (2 * n);
    line(s, x, y, x + lead, y, color, lw);
    let px = x + lead, py = y;
    for (let i = 0; i < 2 * n; i++) {
      const ny = (i === 2 * n - 1) ? y : y + (i % 2 === 0 ? -ht / 2 : ht / 2);
      line(s, px, py, px + step, ny, color, lw); px += step; py = ny;
    }
    line(s, px, y, x + len, y, color, lw);
  }
  // slotted-mass hanger hanging from (x, y): hook, stem, n slotted masses, base
  function massHanger(s, x, y, n = 1, o = {}) {
    const color = o.color || '5A6275';
    line(s, x, y, x, y + 0.2, color, 2);
    const mw = o.w || 0.55, mh = 0.12;
    let yy = y + 0.2;
    for (let i = 0; i < n; i++) { box(s, x - mw / 2, yy, mw, mh, i % 2 ? '7C8598' : '969FB1', '4A5262', { lw: 0.5 }); yy += mh; }
    box(s, x - mw / 2 - 0.05, yy, mw + 0.1, 0.07, '4A5262', '4A5262');
    if (o.label) label(s, x + mw / 2 + 0.05, y + 0.2 + (n * mh) / 2 - 0.14, o.lw || 1.1, o.label, { align: 'left', size: 10 });
    return yy + 0.07;
  }
  // clamp stand: base at y bottom, rod at x, boss & arm to armX at armY
  function clampStand(s, x, yBottom, height, armX, armY) {
    box(s, x - 0.6, yBottom - 0.12, 1.5, 0.12, '5A6275', '4A5262');
    box(s, x - 0.04, yBottom - height, 0.08, height - 0.12, '8C96A8', '6B7385');
    box(s, x - 0.09, armY - 0.08, 0.18, 0.16, '4A5262', '4A5262');
    box(s, Math.min(x, armX), armY - 0.03, Math.abs(armX - x), 0.06, '8C96A8', '6B7385');
  }
  // vertical metre rule with cm ticks from y0 (0 cm) downwards; scale in inches per cm
  function ruler(s, x, y0, cm, perCm, o = {}) {
    box(s, x, y0 - 0.05, 0.32, cm * perCm + 0.1, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let c = 0; c <= cm; c++) {
      const yy = y0 + c * perCm, major = c % (o.major || 5) === 0;
      line(s, x, yy, x + (major ? 0.16 : 0.08), yy, '6B5A2A', 0.75);
      if (major && o.numbers) label(s, x + 0.12, yy - 0.08, 0.22, String(c), { size: 10, align: 'right', h: 0.18 });
    }
  }
  // ---------- graph helpers ----------
  // g = {x,y,w,h, xmin,xmax,ymin,ymax, xstep,ystep, xlabel,ylabel, grid:true, minor:n}
  function px(g, v) { return g.x + (v - g.xmin) / (g.xmax - g.xmin) * g.w; }
  function py(g, v) { return g.y + g.h - (v - g.ymin) / (g.ymax - g.ymin) * g.h; }
  function axes(s, g) {
    box(s, g.x, g.y, g.w, g.h, C.white, null);
    if (g.grid !== false) {
      const minor = g.minor || 1;
      for (let v = g.xmin; v <= g.xmax + 1e-9; v += g.xstep / minor) {
        const maj = Math.abs(Math.round((v - g.xmin) / g.xstep) * g.xstep - (v - g.xmin)) < 1e-9;
        line(s, px(g, v), g.y, px(g, v), g.y + g.h, maj ? 'C9D3E6' : 'E6EBF4', 0.5);
      }
      for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep / minor) {
        const maj = Math.abs(Math.round((v - g.ymin) / g.ystep) * g.ystep - (v - g.ymin)) < 1e-9;
        line(s, g.x, py(g, v), g.x + g.w, py(g, v), maj ? 'C9D3E6' : 'E6EBF4', 0.5);
      }
    }
    line(s, g.x, g.y + g.h, g.x + g.w, g.y + g.h, C.ink, 1.5);
    line(s, g.x, g.y + g.h, g.x, g.y, C.ink, 1.5);
    ticks(s, g);
    if (g.xlabel) label(s, g.x, g.y + g.h + 0.27, g.w, g.xlabel, { size: 10.5, bold: true });
    if (g.ylabel) label(s, g.x - 0.62 - g.h / 2, g.y + g.h / 2 - 0.14, g.h, g.ylabel, { size: 10.5, bold: true, rotate: 270 });
  }
  function ticks(s, g) {
    const fmt = g.fmt || (v => String(+v.toFixed(3)));
    for (let v = g.xmin; v <= g.xmax + 1e-9; v += g.xstep) {
      line(s, px(g, v), g.y + g.h, px(g, v), g.y + g.h + 0.06, C.ink, 1);
      label(s, px(g, v) - 0.3, g.y + g.h + 0.06, 0.6, fmt(v), { size: 10, h: 0.2 });
    }
    for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep) {
      line(s, g.x - 0.06, py(g, v), g.x, py(g, v), C.ink, 1);
      label(s, g.x - 0.48, py(g, v) - 0.1, 0.4, (g.yfmt || fmt)(v), { size: 10, h: 0.2, align: 'right' });
    }
  }
  // plotted points as small crosses
  function points(s, g, pts, color = C.ink) {
    const d = 0.05;
    pts.forEach(([a, b]) => { const X = px(g, a), Y = py(g, b); line(s, X - d, Y - d, X + d, Y + d, color, 1.25); line(s, X - d, Y + d, X + d, Y - d, color, 1.25); });
  }
  // polyline through data points (pass many points for a smooth curve)
  function plotLine(s, g, pts, color = C.blue, width = 2, o = {}) {
    for (let i = 0; i < pts.length - 1; i++) line(s, px(g, pts[i][0]), py(g, pts[i][1]), px(g, pts[i + 1][0]), py(g, pts[i + 1][1]), color, width, o);
  }
  function fnLine(s, g, f, a, b, n = 40, color = C.blue, width = 2) {
    const pts = []; for (let i = 0; i <= n; i++) { const v = a + (b - a) * i / n; pts.push([v, f(v)]); }
    plotLine(s, g, pts, color, width);
  }
  // shaded triangle under a straight line from origin to (xv,yv): drawn as RIGHT_TRIANGLE
  function areaTriangle(s, g, xv, yv, color = 'F5A742', tr = 55) {
    s.addShape(SH.RIGHT_TRIANGLE, { x: px(g, 0), y: py(g, yv), w: px(g, xv) - px(g, 0), h: py(g, 0) - py(g, yv), flipH: true, fill: { color, transparency: tr }, line: { type: 'none' } });
  }
  // ---------- fluids ----------
  // container with liquid; level = fraction full
  function liquidColumn(s, x, y, w, h, level = 0.8, o = {}) {
    const lh = h * level;
    box(s, x, y + h - lh, w, lh, o.color || C.water, null);
    line(s, x, y, x, y + h, C.ink, 2); line(s, x + w, y, x + w, y + h, C.ink, 2); line(s, x, y + h, x + w, y + h, C.ink, 2);
    line(s, x, y + h - lh, x + w, y + h - lh, o.surface || C.waterDark, 1.25);
    return { top: y + h - lh, bottom: y + h };
  }
  // floating (or submerged) block: water surface at ySurf, block width bw height bh, fraction submerged f
  function floatingObject(s, cx, ySurf, bw, bh, f, o = {}) {
    const top = ySurf - bh * (1 - f);
    box(s, cx - bw / 2, top, bw, bh, o.fill || C.wood, '8A6A3A', { lw: 1 });
    if (o.text) label(s, cx - bw / 2, top, bw, o.text, { h: bh, size: 10.5, bold: true, color: C.white });
    if (o.weight) forceArrow(s, cx, top + bh / 2, 'down', o.weight, o.wLabel || 'weight', C.red, { lw: 1.2 });
    if (o.up) forceArrow(s, cx + (o.upDx || 0), top + bh, 'up', 0.0001, null);
    return { top, bottom: top + bh };
  }
  function pencil(s, cx, cy, color) {
    // a diagonal pencil drawn with a rotated rectangle + triangle tip
    s.addShape(SH.RECTANGLE, { x: cx - 0.55, y: cy - 0.11, w: 1.0, h: 0.22, fill: { color }, line: { color }, rotate: -45 });
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.53, y: cy + 0.18, w: 0.22, h: 0.24, fill: { color: 'F5A742' }, line: { color: 'F5A742' }, rotate: 225 });
    s.addShape(SH.RECTANGLE, { x: cx + 0.33, y: cy - 0.55, w: 0.2, h: 0.22, fill: { color: C.red }, line: { color: C.red }, rotate: -45 });
  }

  // pptxgenjs 3.12 emits one <a:pPr> per run, so multi-run paragraphs lose their bullet in
  // PowerPoint/LibreOffice. Keep only the first <a:pPr> in each paragraph, then write the file.
  function fixParagraphs(xml) {
    return xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (m, inner) => {
      let first = true;
      const fixed = inner.replace(/<a:pPr\b[^>]*?(?:\/>|>[\s\S]*?<\/a:pPr>)/g, t => { if (first) { first = false; return t; } return ''; });
      return '<a:p>' + fixed + '</a:p>';
    });
  }
  async function save(path) {
    const JSZip = require('jszip');
    const fs = require('fs');
    const buf = await pres.write({ outputType: 'nodebuffer' });
    const zip = await JSZip.loadAsync(buf);
    for (const name of Object.keys(zip.files).filter(n => /^ppt\/slides\/slide\d+\.xml$/.test(n))) {
      zip.file(name, fixParagraphs(await zip.file(name).async('string')));
    }
    fs.writeFileSync(path, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
    console.log(`wrote ${path} (${slideNo} slides, ${CALCS.length} calcs asserted)`);
    return slideNo;
  }

  return {
    pres, SH, C, F, W, H, DECK, spec, newSlide, footer, pill, contentHeader, panel, card, workedSteps, quickCheck, notes,
    contentSlide, coverSlide, objectivesSlide, retrievalSlide, recapSlide, keyWords, equationsSlide, fullQuestion, levels6, homework,
    line, arrow, forceArrow, label, box, spring, hspring, massHanger, clampStand, ruler, px, py, axes, ticks, points, plotLine, fnLine, areaTriangle,
    liquidColumn, floatingObject, pencil, rich, para, eqStatus, save, get slideNo() { return slideNo; },
  };
}

module.exports = { init, calc, sf, EQS, C, F, W, H, rich, para, eqStatus };
