// ocr_chem_template.js — pptxgenjs house style for OCR GCSE (9–1) Twenty First Century Science, Combined Science B
// (J260) CHEMISTRY decks (chapters C1–C6). A copy of ../ocr-biology/ocr_bio_template.js with ONLY the palette changed
// (biology teal -> chemistry violet) and spec codes that look like C4.1.1. Key names are kept (C.blue holds the violet
// accent, C.navy the cover navy-violet) so build scripts move between templates unchanged. Cell/physics helpers kept.
// Usage: const T = require('./ocr_chem_template');
//        const D = T.init({chapter:'C4', chapterTitle:'Material choices', code:'C4.1',
//                          title:'...', part:1, parts:N, subtitle, keywords, specRange});
// All drawing is native shapes. LAYOUT_WIDE 13.333 x 7.5 in. Georgia titles, Calibri body.
'use strict';
const pptxgen = require('pptxgenjs');
const assert = require('assert');

// ---------- palette ----------
const C = {
  // chemistry violet (physics values in brackets): cover 2E1A47 (1F2A4A), circles 5B3A8C / 7A52B3 (2B4C9B / 3A63C9)
  navy: '2E1A47', navyDeep: '22133A', ink: '2A1F3D', circ1: '5B3A8C', circ2: '7A52B3',
  kicker: 'CDB8F0', blue: '6A3FA0', blueMid: '5A3590', band: 'F1ECF8', panel: 'F4F0FA',
  card: 'FFFFFF', cardBlue: 'F8F5FC', line: 'DDD3EC', cream: 'FFF4E0', orange: 'B8730A',
  orangeTab: 'F5A742', orangeBorder: 'E39A2F', red: 'C8414C', grey: '6B7385', text: '262B3A',
  green: '2E8B57', water: 'BFD9F2', waterDark: '5B9BD5', wood: 'C99A5B', steel: '8C96A8',
  white: 'FFFFFF',
  // biology drawing colours (used by the cell helpers below)
  cyto: 'FBF3DF', membrane: '8A6D3B', nucleus: 'C9B6E4', nucleusEdge: '6A4C93', mito: 'F2B279', mitoEdge: 'A4561C',
  chloro: '7DBE6A', chloroEdge: '3E7F2E', wall: '5E9E4A', vacuole: 'DDEFF7',
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

// ---------- rich text: "**bold**", "__blue__", "!!red!!", "^^superscript^^", "~~subscript~~" ----------
function rich(str, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|__[^_]+__|!![^!]+!!|\^\^[^^]+\^\^|~~[^~]+~~)/g;
  let last = 0, m;
  const push = (t, o) => { if (t) out.push({ text: t, options: Object.assign({}, base, o) }); };
  while ((m = re.exec(str))) {
    push(str.slice(last, m.index), {});
    const tok = m[0];
    if (tok.startsWith('**')) push(tok.slice(2, -2), { bold: true });
    else if (tok.startsWith('__')) push(tok.slice(2, -2), { bold: true, color: C.blue });
    else if (tok.startsWith('!!')) push(tok.slice(2, -2), { bold: true, color: C.red });
    else if (tok.startsWith('~~')) push(tok.slice(2, -2), { subscript: true });
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
// status: 'recall' (students must recall) or 'given' (on the J260 equation sheet).
// Register each deck's equations with T.addEq(key, {eq, words, status}) after checking the J260 equation list
// (spec Appendix: equations). Biology decks rarely need it. Example: T.addEq('VIR', {eq:'V = I × R', words:'potential difference (V) =
// current (A) × resistance (Ω)', status:'recall'}). The table starts empty so no Edexcel status leaks into OCR decks.
const EQS = {};
const eqStatus = k => EQS[k].status === 'recall' ? 'Recall: you must learn this' : 'Given on the J260 equation sheet';
function addEq(key, e) { assert(e.status === 'recall' || e.status === 'given', 'status must be recall or given'); EQS[key] = e; return key; }

// ---------- deck factory ----------
function init(DECK) {
  // DECK: {chapter:'P5', chapterTitle, code:'P5.1', title, part, parts, specRange, subtitle, keywords, kicker?}
  for (const k of ['chapter', 'chapterTitle', 'code', 'title', 'part', 'parts']) assert(DECK[k] != null, `DECK.${k} is required`);
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = 'GCSE Chemistry';
  pres.title = `OCR J260 ${DECK.code} ${DECK.title}`;
  const SH = pres.shapes;
  const footerText = `OCR GCSE Twenty First Century Science — Combined Science B (J260) | ${DECK.code} ${DECK.title} | Higher & Foundation`;
  const badgeText = `Part ${DECK.part} of ${DECK.parts} in Chapter ${DECK.chapter}: ${DECK.chapterTitle}`;
  let slideNo = 0;
  // OCR learning-outcome codes look like P5.1.1. spec('P5.1.1') checks the form and returns it unchanged.
  const spec = code => { assert(/^C\d\.\d\.\d{1,2}$/.test(code), 'OCR spec code must look like C4.1.1: ' + code); return code; };

  function newSlide(bg = C.white) {
    const s = pres.addSlide();
    s.background = { color: bg };
    slideNo++;
    s._no = slideNo;
    return s;
  }
  function footer(s, tag, dark = false) {
    s.addText(footerText, { x: 0.45, y: 7.08, w: 10.2, h: 0.28, fontFace: F.body, fontSize: 10, color: dark ? 'DDD0F2' : C.grey, margin: 0 });
    s.addText(`${tag ? tag + '  |  ' : ''}${s._no}`, { x: 10.7, y: 7.08, w: 2.2, h: 0.28, fontFace: F.body, fontSize: 10, color: dark ? 'DDD0F2' : C.grey, align: 'right', margin: 0 });
  }
  function pill(s, x, y, text, color = C.red, w) {
    const ww = w || (0.22 + text.length * 0.085);
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w: ww, h: 0.3, fill: { color }, line: { color }, rectRadius: 0.15 });
    s.addText(text, { x, y, w: ww, h: 0.3, fontFace: F.body, fontSize: 10, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
    return ww;
  }
  // header band with title + subtitle + optional pills (opts.ht, opts.stretch, opts.pag)
  // opts.pag: practical label, e.g. 'PAG P1' (OCR practical activity group) or 'SUGGESTED PRACTICAL'
  function contentHeader(title, subtitle, opts = {}) {
    const s = newSlide();
    s.addShape(SH.RECTANGLE, { x: 0, y: 0, w: W, h: 1.08, fill: { color: C.band }, line: { color: C.band } });
    s.addShape(SH.RECTANGLE, { x: 0, y: 1.08, w: W, h: 0.03, fill: { color: 'DCCFEE' }, line: { color: 'DCCFEE' } });
    s.addText(title, { x: 0.45, y: 0.13, w: 9.6, h: 0.55, fontFace: F.head, fontSize: 24, bold: true, color: C.ink, margin: 0, valign: 'middle' });
    if (subtitle) s.addText(subtitle, { x: 0.45, y: 0.7, w: 10.5, h: 0.3, fontFace: F.body, fontSize: 11, italic: true, color: C.blue, margin: 0 });
    let px = W - 0.45;
    const pills = [];
    if (opts.stretch) pills.push(['GRADE 7–9 STRETCH', C.red, 1.75]);
    if (opts.ht) pills.push(['HT', C.red, 0.5]);
    if (opts.pag) { const t = opts.pag === true ? 'SUGGESTED PRACTICAL' : String(opts.pag).toUpperCase(); pills.push([t, C.orange, 0.3 + t.length * 0.09]); }
    pills.forEach(([t, c, w]) => { px -= w; pill(s, px, 0.32, t, c, w); px -= 0.1; });
    footer(s, opts.tag || '');
    return s;
  }
  // left diagram panel with caption
  function panel(s, x = 0.45, y = 1.3, w = 6.1, h = 4.95, caption) {
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, fill: { color: C.panel }, line: { color: 'DED4EE', width: 0.75 }, rectRadius: 0.08 });
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
    s.addText(DECK.kicker || 'OCR GCSE COMBINED SCIENCE B (TWENTY FIRST CENTURY)', { x: 0.8, y: 0.9, w: 9.5, h: 0.35, fontFace: F.body, fontSize: 13, bold: true, color: C.kicker, charSpacing: 4, margin: 0 });
    s.addText(`${DECK.code}  ${c.bigTitle || DECK.title}`, { x: 0.8, y: 1.45, w: 10.5, h: 1.1, fontFace: F.head, fontSize: 40, bold: true, color: C.white, margin: 0, valign: 'middle', fit: 'none' });
    s.addText(DECK.subtitle, { x: 0.8, y: 2.6, w: 8.6, h: 0.5, fontFace: F.head, fontSize: 18, italic: true, color: 'DCCDF3', margin: 0 });
    s.addShape(SH.LINE, { x: 0.8, y: 3.3, w: 2.2, h: 0, line: { color: C.orangeTab, width: 2.5 } });
    s.addText(DECK.keywords.join('  •  '), { x: 0.8, y: 3.45, w: 8.8, h: 0.4, fontFace: F.body, fontSize: 13, color: 'E4DAF5', margin: 0 });
    const rows = c.rows;
    rows.forEach((r, i) => {
      const y = 4.25 + i * 0.68;
      s.addShape(SH.OVAL, { x: 0.8, y, w: 0.5, h: 0.5, fill: { color: C.circ2 }, line: { color: C.kicker, width: 1 } });
      s.addText(r.icon, { x: 0.8, y, w: 0.5, h: 0.5, fontFace: F.body, fontSize: 15, bold: true, color: C.white, align: 'center', valign: 'middle', margin: 0 });
      s.addText(r.text, { x: 1.5, y, w: 7.6, h: 0.5, fontFace: F.body, fontSize: 14, color: C.white, valign: 'middle', margin: 0 });
    });
    // part badge: "Part n of N in Chapter P5: Radioactive materials"
    const bw = 0.5 + badgeText.length * 0.095, by = 4.25 + rows.length * 0.68 + 0.02;
    s.addShape(SH.ROUNDED_RECTANGLE, { x: 0.8, y: by, w: bw, h: 0.4, fill: { color: C.navyDeep }, line: { color: C.orangeTab, width: 1.25 }, rectRadius: 0.2 });
    s.addText(badgeText, { x: 0.8, y: by, w: bw, h: 0.4, fontFace: F.body, fontSize: 12, bold: true, color: C.orangeTab, align: 'center', valign: 'middle', margin: 0 });
    s.addText(c.footer || `OCR J260 Combined Science B • ${DECK.code} ${DECK.title} • teacher deck • mark schemes and answers in the speaker notes`, { x: 0.8, y: 6.75, w: 9, h: 0.3, fontFace: F.body, fontSize: 10, italic: true, color: 'DDD0F2', margin: 0 });
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
    const s = contentHeader('Summary: key words', o.subtitle || `${DECK.code} ${DECK.title} • learn these definitions`, { tag: 'Key words' });
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
        { text: e.status === 'recall' ? 'RECALL' : 'GIVEN (J260 sheet)', options: { bold: true, color: e.status === 'recall' ? C.red : C.green, fill } },
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

  // ---------- 6-mark OCR level-of-response mark scheme text ----------
  // indicative: array of scientific points. d: per-level content descriptors {l3, l2, l1} for this question
  // (what the answer must do), e.g. l3: 'Gives a full description of the method AND explains how the results are used'.
  function levels6(indicative, d = {}, extra = '') {
    if (typeof d === 'string') { extra = d; d = {}; }
    return [
      'OCR level-of-response mark scheme (6 marks). Read the whole answer, decide the level from the content descriptor, then the mark within the level from the quality of the line of reasoning. Use the indicative scientific points below.',
      `Level 3 (5–6 marks): ${d.l3 || 'Gives a full and accurate response covering all parts of the question.'} There is a well-developed line of reasoning which is clear and logically structured. The information presented is relevant and substantiated.`,
      `Level 2 (3–4 marks): ${d.l2 || 'Gives a partial response covering most parts of the question, with some detail.'} There is a line of reasoning presented with some structure. The information presented is relevant and supported by some evidence.`,
      `Level 1 (1–2 marks): ${d.l1 || 'Gives a limited response with some relevant points.'} There is an attempt at a logical structure with a line of reasoning. The information is in the most part relevant.`,
      '0 marks: no response or no response worthy of credit.',
      'Indicative scientific points may include:', ...indicative.map(t => ' • ' + t), extra].filter(Boolean).join('\n');
  }

  // ---------- homework divider + homework ----------
  function homework(intro, qs, expected, o = {}) {
    // divider
    const d = newSlide(C.blueMid);
    d.addShape(SH.OVAL, { x: 9.3, y: -1.2, w: 5.5, h: 5.5, fill: { color: C.circ1 }, line: { color: C.circ1 } });
    d.addShape(SH.OVAL, { x: 1.0, y: 2.35, w: 1.6, h: 1.6, fill: { color: C.white }, line: { color: C.white } });
    pencil(d, 1.8, 3.15, C.blueMid);
    d.addText('Homework', { x: 3.0, y: 2.3, w: 7, h: 1.1, fontFace: F.head, fontSize: 54, bold: true, color: C.white, margin: 0, valign: 'middle' });
    d.addText(o.dividerSub || `${DECK.code} ${DECK.title} • ${expected} marks • about 30 minutes`, { x: 3.0, y: 3.4, w: 8, h: 0.5, fontFace: F.body, fontSize: 18, italic: true, color: 'EDE6F8', margin: 0 });
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
        line(s, px(g, v), g.y, px(g, v), g.y + g.h, maj ? 'D6CBE8' : 'EEE9F6', 0.5);
      }
      for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep / minor) {
        const maj = Math.abs(Math.round((v - g.ymin) / g.ystep) * g.ystep - (v - g.ymin)) < 1e-9;
        line(s, g.x, py(g, v), g.x + g.w, py(g, v), maj ? 'D6CBE8' : 'EEE9F6', 0.5);
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

  // ---------- graph with axes through the origin (for I–V characteristics, a.c. traces) ----------
  // same g object as axes(); xmin/ymin may be negative. Tick labels sit beside the axes; 0 is labelled once.
  function axesO(s, g) {
    box(s, g.x, g.y, g.w, g.h, C.white, null);
    const minor = g.minor || 1;
    if (g.grid !== false) {
      for (let v = g.xmin; v <= g.xmax + 1e-9; v += g.xstep / minor) {
        const maj = Math.abs(Math.round((v - g.xmin) / g.xstep) * g.xstep - (v - g.xmin)) < 1e-9;
        line(s, px(g, v), g.y, px(g, v), g.y + g.h, maj ? 'D6CBE8' : 'EEE9F6', 0.5);
      }
      for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep / minor) {
        const maj = Math.abs(Math.round((v - g.ymin) / g.ystep) * g.ystep - (v - g.ymin)) < 1e-9;
        line(s, g.x, py(g, v), g.x + g.w, py(g, v), maj ? 'D6CBE8' : 'EEE9F6', 0.5);
      }
    }
    const X0 = px(g, Math.max(g.xmin, Math.min(0, g.xmax))), Y0 = py(g, Math.max(g.ymin, Math.min(0, g.ymax)));
    line(s, g.x, Y0, g.x + g.w, Y0, C.ink, 1.5);
    line(s, X0, g.y + g.h, X0, g.y, C.ink, 1.5);
    const fmt = g.fmt || (v => String(+v.toFixed(3)));
    for (let v = g.xmin; v <= g.xmax + 1e-9; v += g.xstep) {
      if (Math.abs(v) < 1e-9 && g.xmin < 0) continue;
      line(s, px(g, v), Y0, px(g, v), Y0 + 0.06, C.ink, 1);
      label(s, px(g, v) - 0.3, Y0 + 0.06, 0.6, fmt(v), { size: 10, h: 0.2 });
    }
    for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep) {
      if (Math.abs(v) < 1e-9 && (g.xmin < 0 || g.ymin < 0)) continue;
      line(s, X0 - 0.06, py(g, v), X0, py(g, v), C.ink, 1);
      label(s, X0 - 0.5, py(g, v) - 0.1, 0.42, (g.yfmt || fmt)(v), { size: 10, h: 0.2, align: 'right' });
    }
    if (g.xmin < 0) label(s, X0 - 0.3, Y0 + 0.04, 0.24, '0', { size: 10, h: 0.2, align: 'right' });
    if (g.xlabel) label(s, g.x + g.w - (g.xlw || 2.2), Y0 - 0.3, g.xlw || 2.2, g.xlabel, { size: 10.5, bold: true, align: 'right' });
    if (g.ylabel) label(s, X0 + 0.08, g.y + 0.02, g.ylw || 2.2, g.ylabel, { size: 10.5, bold: true, align: 'left' });
  }

  // ================= circuit symbols (UK / OCR convention), native shapes =================
  // comp(s, type, x1, y1, x2, y2, o) draws the wire from (x1,y1) to (x2,y2) with the symbol centred on its
  // midpoint. Use horizontal or vertical wires (rectangles are axis-aligned).
  // types: wire, cell, battery, switchOpen, switchClosed, lamp, resistor, varResistor, ammeter, voltmeter,
  //        motor, diode, led, ldr, thermistor, fuse
  // cell/battery: long (+) plate towards (x1,y1) unless o.flip. diode/led: arrow points from (x1,y1) to (x2,y2)
  // (forward bias = conventional current in that direction). o.label text, o.side ±1 picks the side,
  // o.off label offset (in), o.lw label width.
  function comp(s, type, x1, y1, x2, y2, o = {}) {
    const col = o.color || C.ink, lw = o.width || 1.5, k = o.size || 1;
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const nx = -uy, ny = ux;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const P = (u, v) => [mx + u * ux + v * nx, my + u * uy + v * ny];
    const seg = (u1, v1, u2, v2, c = col, w = lw, oo) => { const a = P(u1, v1), b = P(u2, v2); line(s, a[0], a[1], b[0], b[1], c, w, oo); };
    const arr = (u1, v1, u2, v2) => { const a = P(u1, v1), b = P(u2, v2); arrow(s, a[0], a[1], b[0], b[1], col, 1.25); };
    const circ = (r, fill = C.white) => s.addShape(SH.OVAL, { x: mx - r, y: my - r, w: 2 * r, h: 2 * r, fill: fill ? { color: fill } : { type: 'none' }, line: { color: col, width: lw } });
    const rect = (hl, hw) => { const a = P(-hl, -hw), b = P(hl, hw); box(s, Math.min(a[0], b[0]), Math.min(a[1], b[1]), Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]), C.white, col, { lw }); };
    const leads = h => { seg(-L / 2, 0, -h, 0); seg(h, 0, L / 2, 0); };
    const letter = t => s.addText(t, { x: mx - 0.2 * k, y: my - 0.2 * k, w: 0.4 * k, h: 0.4 * k, fontFace: F.body, fontSize: 13 * k, bold: true, color: col, align: 'center', valign: 'middle', margin: 0 });
    let off = 0.38 * k;
    switch (type) {
      case 'wire': seg(-L / 2, 0, L / 2, 0); off = 0.18; break;
      case 'cell': { const h = 0.06 * k, f = o.flip ? -1 : 1; leads(h); seg(-h * f, -0.22 * k, -h * f, 0.22 * k, col, lw); seg(h * f, -0.11 * k, h * f, 0.11 * k, col, 4.5); off = 0.36 * k; break; }
      case 'battery': {
        const f = o.flip ? -1 : 1, a = 0.17 * k, b = 0.07 * k; leads(a);
        seg(-a * f, -0.22 * k, -a * f, 0.22 * k); seg(-b * f, -0.11 * k, -b * f, 0.11 * k, col, 4.5);
        seg(-b, 0, b, 0);
        seg(b * f, -0.22 * k, b * f, 0.22 * k); seg(a * f, -0.11 * k, a * f, 0.11 * k, col, 4.5);
        off = 0.36 * k; break;
      }
      case 'switchOpen': case 'switchClosed': {
        const t = 0.18 * k, r = 0.035 * k; leads(t);
        [-t, t].forEach(u => { const [cx, cy] = P(u, 0); s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: col }, line: { color: col, width: 1 } }); });
        if (type === 'switchOpen') seg(-t, 0, t * 0.85, -0.2 * k); else seg(-t, 0, t, 0);
        off = 0.32 * k; break;
      }
      case 'lamp': { const r = 0.18 * k, d = r * 0.7071; leads(r); circ(r); seg(-d, -d, d, d); seg(-d, d, d, -d); off = 0.36 * k; break; }
      case 'resistor': { leads(0.27 * k); rect(0.27 * k, 0.1 * k); off = 0.3 * k; break; }
      case 'varResistor': { leads(0.27 * k); rect(0.27 * k, 0.1 * k); arr(-0.32 * k, 0.22 * k, 0.34 * k, -0.24 * k); off = 0.38 * k; break; }
      case 'ammeter': case 'voltmeter': case 'motor': { const r = 0.19 * k; leads(r); circ(r); letter(type === 'ammeter' ? 'A' : type === 'voltmeter' ? 'V' : 'M'); off = 0.36 * k; break; }
      case 'fuse': { leads(0.27 * k); rect(0.27 * k, 0.09 * k); seg(-0.27 * k, 0, 0.27 * k, 0); off = 0.3 * k; break; }
      case 'thermistor': { leads(0.27 * k); rect(0.27 * k, 0.1 * k); seg(-0.42 * k, 0.21 * k, -0.3 * k, 0.21 * k); seg(-0.3 * k, 0.21 * k, 0.3 * k, -0.21 * k); off = 0.38 * k; break; }
      case 'ldr': {
        const r = 0.3 * k; s.addShape(SH.OVAL, { x: mx - r, y: my - r, w: 2 * r, h: 2 * r, fill: { color: C.white }, line: { color: col, width: lw } });
        leads(0.2 * k); rect(0.2 * k, 0.075 * k);
        arr(-0.48 * k, -0.62 * k, -0.2 * k, -0.33 * k); arr(-0.2 * k, -0.7 * k, 0.04 * k, -0.37 * k);
        off = 0.45 * k; break;
      }
      case 'diode': case 'led': {
        const b = -0.12 * k, a = 0.11 * k, hw = 0.14 * k;
        leads(0); // wire runs through the symbol
        const [cx, cy] = P((a + b) / 2, 0), ang = Math.atan2(uy, ux) * 180 / Math.PI + 90;
        s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - hw, y: cy - (a - b) / 2, w: 2 * hw, h: a - b, rotate: ang, fill: { color: col }, line: { color: col, width: 1 } });
        seg(a, -hw, a, hw, col, 2);
        if (type === 'led') { arr(-0.02 * k, -0.2 * k, 0.16 * k, -0.42 * k); arr(0.12 * k, -0.2 * k, 0.3 * k, -0.42 * k); off = 0.42 * k; }
        else off = 0.3 * k;
        break;
      }
      default: throw new Error('unknown component ' + type);
    }
    if (o.label) {
      const side = o.side || -1, d = o.off != null ? o.off : off, w = o.lw || 1.3, h = o.lh || 0.26;
      const [lx, ly] = P(0, side * d);
      const fs = o.fs || 10.5;
      if (Math.abs(nx) > 0.5) label(s, lx < mx ? lx - w : lx, ly - h / 2, w, o.label, { h, size: fs, bold: true, color: o.lcolor || col, align: lx < mx ? 'right' : 'left' });
      else label(s, lx - w / 2, ly - h / 2, w, o.label, { h, size: fs, bold: true, color: o.lcolor || col });
    }
  }
  // polyline wire through points [[x,y],...]
  function wire(s, pts, color = C.ink, width = 1.5) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], color, width); }
  // junction dot
  function dot(s, x, y, color = C.ink, r = 0.055) { s.addShape(SH.OVAL, { x: x - r, y: y - r, w: 2 * r, h: 2 * r, fill: { color }, line: { color, width: 0.5 } }); }

  // ================= nuclear physics helpers (P5) =================
  // nuclide(s, x, y, A, Z, sym, o): conventional notation with mass number A over atomic number Z, left of the
  // symbol. (x, y) is the top-left; o.size = symbol font size (default 28); o.color. Returns the total width used.
  function nuclide(s, x, y, A, Z, sym, o = {}) {
    const fs = o.size || 28, col = o.color || C.ink, k = fs / 28;
    const nw = 0.42 * k, sw = (0.24 + 0.2 * String(sym).length) * k, h = 0.5 * k;
    s.addText(String(A), { x, y: y + 0.0 * k, w: nw, h: h * 0.5, fontFace: F.body, fontSize: fs * 0.48, bold: true, color: o.aColor || col, align: 'right', valign: 'bottom', margin: 0 });
    s.addText(String(Z), { x, y: y + h * 0.55, w: nw, h: h * 0.5, fontFace: F.body, fontSize: fs * 0.48, bold: true, color: o.zColor || col, align: 'right', valign: 'top', margin: 0 });
    s.addText(String(sym), { x: x + nw + 0.02 * k, y: y + 0.02 * k, w: sw, h, fontFace: F.head, fontSize: fs, bold: true, color: col, align: 'left', valign: 'middle', margin: 0 });
    return nw + 0.02 * k + sw;
  }
  // nucleus(s, cx, cy, p, n, o): packed cluster of p protons (red) and n neutrons (grey) inside radius ~ o.r.
  // Deterministic sunflower packing; protons and neutrons interleaved evenly. Returns the cluster radius.
  function nucleus(s, cx, cy, p, n, o = {}) {
    const tot = p + n, d = o.d || 0.16, cR = d * 0.56;
    const types = []; let pi = 0, ni = 0;
    for (let i = 0; i < tot; i++) { if ((pi + 0.5) / p <= (ni + 0.5) / n || ni >= n) { types.push('p'); pi++; } else { types.push('n'); ni++; } }
    const pts = [];
    for (let i = 0; i < tot; i++) { const r = cR * Math.sqrt(i + 0.5) * 0.95, t = i * 2.39996; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); }
    pts.slice().map((q, i) => [q, i]).sort((a, b) => a[0][1] - b[0][1]).forEach(([q, i]) => {
      const pr = types[i] === 'p';
      s.addShape(SH.OVAL, { x: q[0] - d / 2, y: q[1] - d / 2, w: d, h: d, fill: { color: pr ? (o.pColor || C.red) : (o.nColor || '8C96A8') }, line: { color: pr ? '8E2A33' : '5A6275', width: 0.5 } });
    });
    return cR * Math.sqrt(tot) + d / 2;
  }

  // ================= biology cell helpers (generic; native shapes) =================
  // mitochondrion(s, cx, cy, w, h, o): long axis = w. o.rot = rotation in degrees about the centre.
  // o.detail = true draws the folded inner membrane (cristae) as fingers from alternate sides; otherwise a
  // simple zigzag (for small mitochondria inside a cell). o.folds = number of cristae (default 5).
  function mitochondrion(s, cx, cy, w, h, o = {}) {
    const rot = o.rot || 0, a = rot * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
    const P = (u, v) => [cx + u * ca - v * sa, cy + u * sa + v * ca];
    s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: rot, fill: { color: o.fill || C.mito }, line: { color: C.mitoEdge, width: o.lw || 1.25 } });
    if (o.detail) {
      const t = Math.min(w, h) * 0.08, iw = w - 2 * t, ih = h - 2 * t;
      s.addShape(SH.OVAL, { x: cx - iw / 2, y: cy - ih / 2, w: iw, h: ih, rotate: rot, fill: { color: o.matrix || 'FCE3C8' }, line: { color: C.mitoEdge, width: 1 } });
      const n = o.folds || 5, fw = Math.max(0.05, iw * 0.05);
      for (let i = 0; i < n; i++) {
        const u = -iw / 2 + (i + 1) * iw / (n + 1);
        const edge = (ih / 2) * Math.sqrt(Math.max(0, 1 - (2 * u / iw) ** 2));
        const L = edge * 1.25, sgn = i % 2 ? 1 : -1;
        const [qx, qy] = P(u, sgn * (edge - L / 2));
        s.addShape(SH.ROUNDED_RECTANGLE, { x: qx - fw / 2, y: qy - L / 2, w: fw, h: L, rotate: rot, rectRadius: fw / 2, fill: { color: o.fill || C.mito }, line: { color: C.mitoEdge, width: 0.75 } });
      }
    } else {
      const n = 6, pts = [];
      for (let i = 0; i <= n; i++) pts.push(P(-w * 0.34 + i * w * 0.68 / n, (i % 2 ? 1 : -1) * h * 0.22));
      for (let i = 0; i < n; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.mitoEdge, 0.75);
    }
  }
  // animalCell(s, x, y, w, h, o): oval cell (membrane + cytoplasm), nucleus, and small mitochondria.
  // o.nucleus = [fx, fy, fr] as fractions of w/h (default centre-left); o.mito = [[fx, fy, rot], ...]
  // positions as fractions of the box (default four). o.mw = mitochondrion length. Returns key points.
  function animalCell(s, x, y, w, h, o = {}) {
    s.addShape(SH.OVAL, { x, y, w, h, fill: { color: o.fill || C.cyto }, line: { color: C.membrane, width: o.lw || 1.75 } });
    const [nfx, nfy, nfr] = o.nucleus || [0.42, 0.5, 0.15];
    const nr = Math.min(w, h) * nfr * 1.4, ncx = x + w * nfx, ncy = y + h * nfy;
    s.addShape(SH.OVAL, { x: ncx - nr, y: ncy - nr, w: 2 * nr, h: 2 * nr, fill: { color: C.nucleus }, line: { color: C.nucleusEdge, width: 1.25 } });
    s.addShape(SH.OVAL, { x: ncx - nr * 0.3, y: ncy - nr * 0.3, w: nr * 0.6, h: nr * 0.6, fill: { color: C.nucleusEdge, transparency: 40 }, line: { type: 'none' } });
    const mw = o.mw || Math.min(w, h) * 0.22;
    const mito = o.mito || [[0.72, 0.3, 30], [0.78, 0.62, -20], [0.5, 0.82, 10], [0.25, 0.25, -35]];
    const mpts = mito.map(([fx, fy, r]) => { mitochondrion(s, x + w * fx, y + h * fy, mw, mw * 0.5, { rot: r }); return [x + w * fx, y + h * fy]; });
    return { nucleus: [ncx, ncy, nr], mito: mpts };
  }
  // plantCell(s, x, y, w, h, o): cell wall, membrane, cytoplasm, large vacuole, nucleus, chloroplasts and
  // mitochondria. o.chloro = false for a root cell (no chloroplasts). Returns key points for labels.
  function plantCell(s, x, y, w, h, o = {}) {
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: 'E4F1D8' }, line: { color: C.wall, width: 3 } });
    const t = 0.07;
    s.addShape(SH.ROUNDED_RECTANGLE, { x: x + t, y: y + t, w: w - 2 * t, h: h - 2 * t, rectRadius: 0.06, fill: { color: C.cyto }, line: { color: C.membrane, width: 1 } });
    const vx = x + w * 0.2, vy = y + h * 0.22, vw = w * 0.6, vh = h * 0.56;
    s.addShape(SH.ROUNDED_RECTANGLE, { x: vx, y: vy, w: vw, h: vh, rectRadius: 0.12, fill: { color: C.vacuole }, line: { color: '7FA9C4', width: 1 } });
    const nr = Math.min(w, h) * 0.11, ncx = x + w * 0.8, ncy = y + h * 0.82;
    s.addShape(SH.OVAL, { x: ncx - nr, y: ncy - nr, w: 2 * nr, h: 2 * nr, fill: { color: C.nucleus }, line: { color: C.nucleusEdge, width: 1.25 } });
    const cpts = [];
    if (o.chloro !== false) {
      const cw = Math.min(w, h) * 0.17, chh = cw * 0.55;
      [[0.13, 0.15], [0.5, 0.1], [0.87, 0.2], [0.1, 0.55], [0.9, 0.55], [0.4, 0.9]].forEach(([fx, fy]) => {
        const cx = x + w * fx, cy = y + h * fy;
        s.addShape(SH.OVAL, { x: cx - cw / 2, y: cy - chh / 2, w: cw, h: chh, fill: { color: C.chloro }, line: { color: C.chloroEdge, width: 1 } });
        [-0.2, 0, 0.2].forEach(d => line(s, cx + d * cw - cw * 0.06, cy - chh * 0.18, cx + d * cw - cw * 0.06, cy + chh * 0.18, C.chloroEdge, 1.5));
        cpts.push([cx, cy]);
      });
    }
    const mw = Math.min(w, h) * 0.15;
    const mpts = (o.mito || [[0.15, 0.82, 20], [0.885, 0.38, 80]]).map(([fx, fy, r]) => { mitochondrion(s, x + w * fx, y + h * fy, mw, mw * 0.5, { rot: r }); return [x + w * fx, y + h * fy]; });
    return { nucleus: [ncx, ncy, nr], vacuole: [vx + vw / 2, vy + vh / 2], chloro: cpts, mito: mpts, wall: [x, y + h * 0.4] };
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
    pres, SH, C, F, W, H, DECK, spec, badgeText, newSlide, footer, pill, contentHeader, panel, card, workedSteps, quickCheck, notes,
    contentSlide, coverSlide, objectivesSlide, retrievalSlide, recapSlide, keyWords, equationsSlide, fullQuestion, levels6, homework,
    line, arrow, forceArrow, label, box, spring, hspring, massHanger, clampStand, ruler, px, py, axes, ticks, points, plotLine, fnLine, areaTriangle,
    liquidColumn, floatingObject, pencil, rich, para, eqStatus, save, axesO, comp, wire, dot, nuclide, nucleus,
    mitochondrion, animalCell, plantCell, get slideNo() { return slideNo; },
  };
}

module.exports = { init, calc, sf, EQS, addEq, C, F, W, H, rich, para, eqStatus };
