// maths_lesson.js — clean lesson-style house template for AQA GCSE Mathematics (8300) decks.
// Designed for maths: one idea per slide, large type (body >= 18 pt), real stacked fractions,
// "My turn / Your turn" example pairs with answer-reveal slides, hinge questions, practice + answers,
// AQA-style exam questions with M1/A1/B1 mark schemes. Widths are measured with the Arial metrics
// (Liberation Sans = Arial metrics, so layout is identical on Windows, Mac, iPhone and LibreOffice) so inline maths lines up without guessing.
'use strict';
const pptxgen = require('pptxgenjs');
const assert = require('assert');
const path = require('path');
const WID = require(path.join(__dirname, 'arial_widths.json'));

const C = {
  ink: '2B1A22', maroon: '7A1F3D', accent: 'A3284F', soft: 'FBF1F4', line: 'E9D3DB',
  orange: 'C86B12', orangeSoft: 'FFF4E6', green: '1E7A4C', greenSoft: 'EAF6EF', grey: '6E6670',
  greyLight: 'F4F2F3', white: 'FFFFFF', blue: '2F5DA8', blueSoft: 'EEF3FB', red: 'C0392B',
};
const FONT = 'Arial';
const W = 13.333, H = 7.5, MX = 0.6;

// ---------- measuring ----------
function textW(str, pt, bold = false) {
  const t = WID[bold ? 'b' : 'r'];
  let u = 0;
  for (const ch of str) u += (t[ch] != null ? t[ch] : 520);
  return u / 1000 * pt / 72;
}
// split "**bold**" markup into runs
function runs(str) {
  const out = []; const re = /\*\*([^*]+)\*\*/g; let last = 0, m;
  while ((m = re.exec(str))) { if (m.index > last) out.push({ t: str.slice(last, m.index), b: false }); out.push({ t: m[1], b: true }); last = re.lastIndex; }
  if (last < str.length) out.push({ t: str.slice(last), b: false });
  // "^{...}" marks a superscript run (e.g. 10^{−10}), for digits the font has no superscript glyph for
  const out2 = [];
  for (const r of out) {
    const re2 = /\^\{([^}]*)\}/g; let l2 = 0, m2;
    while ((m2 = re2.exec(r.t))) { if (m2.index > l2) out2.push({ t: r.t.slice(l2, m2.index), b: r.b }); out2.push({ t: m2[1], b: r.b, sup: true }); l2 = re2.lastIndex; }
    if (l2 < r.t.length) out2.push({ t: r.t.slice(l2), b: r.b });
  }
  return out2;
}
function plain(str) { return str.replace(/\*\*/g, '').replace(/\^\{([^}]*)\}/g, '$1'); }
// number of wrapped lines for a string in a box of width w (inches)
function lineCount(str, pt, w, bold = false) {
  let lines = 0;
  for (const para of plain(str).split('\n')) {
    const words = para.split(' '); let cur = 0; lines++;
    for (const wd of words) {
      const ww = textW(wd + ' ', pt, bold);
      if (cur > 0 && cur + ww > w * 0.97) { lines++; cur = ww; } else cur += ww;
    }
  }
  return lines;
}
const lineH = pt => pt / 72 * 1.22;
function textH(str, pt, w, bold) { return lineCount(str, pt, w, bold) * lineH(pt); }

// ---------- checks ----------
const CALCS = [];
function calc(label, value, expected, tol = 1e-9) {
  assert(Math.abs(value - expected) <= tol, `calc failed: ${label}: got ${value}, expected ${expected}`);
  CALCS.push(label); return value;
}

function init(DECK) {
  // optional overrides so other subjects can reuse this template: DECK.palette (colour overrides),
  // DECK.kicker (title-slide line), DECK.footer (slide footer prefix), DECK.author, DECK.light (pale title-slide text)
  if (DECK.palette) Object.assign(C, DECK.palette);
  const KICKER = DECK.kicker || 'AQA GCSE MATHEMATICS (8300)', FOOT = DECK.footer || 'AQA GCSE Mathematics 8300', LIGHT = DECK.light || 'F2C9D6';
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';
  pres.author = DECK.author || 'GCSE Mathematics';
  pres.title = `${DECK.docPrefix || 'AQA 8300'} ${DECK.code} ${DECK.title}`;
  let n = 0;
  const SH = pres.ShapeType;

  function rich(str, base = {}) {
    return runs(str).map(r => ({ text: r.t, options: Object.assign({}, base, r.b ? { bold: true } : {}, r.sup ? { superscript: true } : {}) }));
  }
  function txt(s, str, x, y, w, h, o = {}) {
    s.addText(rich(str, { color: o.color || C.ink }), Object.assign({ x, y, w, h, fontFace: FONT, fontSize: o.size || 20, color: o.color || C.ink, bold: !!o.bold, italic: !!o.italic, align: o.align || 'left', valign: o.valign || 'top', margin: 0, paraSpaceAfter: o.psa || 0, lineSpacingMultiple: 1.0 }, o.extra || {}));
  }
  function rect(s, x, y, w, h, fill, line, o = {}) {
    s.addShape(SH.rect, { x, y, w, h, fill: { color: fill }, line: { color: line || fill, width: o.lw || 1 } });
  }
  function hline(s, x1, y, x2, color, w = 1.25) { s.addShape(SH.line, { x: x1, y, w: x2 - x1, h: 0, line: { color, width: w } }); }
  function vline(s, x, y1, y2, color, w = 1.25) { s.addShape(SH.line, { x, y: y1, w: 0, h: y2 - y1, line: { color, width: w } }); }
  function circle(s, cx, cy, d, fill, line, lw = 0.75) { s.addShape(SH.ellipse, { x: cx - d / 2, y: cy - d / 2, w: d, h: d, fill: { color: fill }, line: { color: line || fill, width: lw } }); }

  // ---------- inline maths ----------
  // parts: strings or {n:'12', d:'40'}; y = vertical centre of the line. Returns total width.
  function mathWidth(parts, pt, bold) {
    return parts.reduce((a, p) => a + (typeof p === 'string' ? textW(p, pt, bold) : Math.max(textW(String(p.n), pt, bold), textW(String(p.d), pt, bold)) + 0.14), 0);
  }
  function math(s, x, y, parts, o = {}) {
    const pt = o.size || 22, bold = !!o.bold, color = o.color || C.ink;
    let cx = x;
    if (o.align === 'center') cx = x + (o.w - mathWidth(parts, pt, bold)) / 2;
    const lh = lineH(pt);
    for (const p of parts) {
      if (typeof p === 'string') {
        const w = textW(p, pt, bold);
        s.addText(p, { x: cx, y: y - lh / 2, w: w + 0.15, h: lh, fontFace: FONT, fontSize: pt, bold, color, margin: 0, valign: 'middle' });
        cx += w;
      } else {
        const fw = Math.max(textW(String(p.n), pt, bold), textW(String(p.d), pt, bold)) + 0.14;
        s.addText(String(p.n), { x: cx, y: y - lh - 0.02, w: fw, h: lh, fontFace: FONT, fontSize: pt, bold, color, margin: 0, align: 'center', valign: 'bottom' });
        hline(s, cx + 0.03, y, cx + fw - 0.03, color, 1.5);
        s.addText(String(p.d), { x: cx, y: y + 0.03, w: fw, h: lh, fontFace: FONT, fontSize: pt, bold, color, margin: 0, align: 'center', valign: 'top' });
        cx += fw;
      }
    }
    return cx - x;
  }
  const hasFrac = parts => Array.isArray(parts) && parts.some(p => typeof p !== 'string');

  // ---------- slide frame ----------
  function frame(title, o = {}) {
    const s = pres.addSlide(); n++; s._no = n;
    s.background = { color: o.bg || C.white };
    if (!o.bare) {
      rect(s, 0, 0, 0.16, 1.05, C.accent);
      txt(s, title, MX, 0.28, W - 2 * MX - 2.6, 0.62, { size: 30, bold: true, color: C.maroon, valign: 'middle' });
      if (o.tag) {
        const tw = textW(o.tag, 13, true) + 0.4;
        rect(s, W - MX - tw, 0.4, tw, 0.4, o.tagColor || C.soft, o.tagColor || C.line, { round: true, r: 0.2 });
        txt(s, o.tag, W - MX - tw, 0.4, tw, 0.4, { size: 13, bold: true, color: o.tagText || C.accent, align: 'center', valign: 'middle' });
      }
      hline(s, MX, 1.08, W - MX, C.line, 1.5);
      txt(s, `${FOOT}  •  ${DECK.code} ${DECK.title}`, MX, 7.08, 8, 0.28, { size: 10, color: C.grey });
      txt(s, String(n), W - MX - 1, 7.08, 1, 0.28, { size: 10, color: C.grey, align: 'right' });
    }
    return s;
  }
  function notes(s, str) { s.addNotes(str.replace(/\^\{([^}]*)\}/g, '^$1')); }

  // ---------- slide types ----------
  function titleSlide(o) {
    const s = frame('', { bare: true, bg: C.maroon });
    rect(s, 0, 0, W, H, C.maroon);
    txt(s, KICKER, 0.9, 1.0, 11, 0.4, { size: 15, bold: true, color: LIGHT, extra: { charSpacing: 3 } });
    txt(s, `${DECK.code}  ${DECK.title}`, 0.9, 1.7, 11.5, 1.0, { size: textW(`${DECK.code}  ${DECK.title}`, 44, true) > 11.3 ? 36 : 44, bold: true, color: C.white, valign: 'middle' });
    txt(s, o.subtitle, 0.9, 2.85, 9.5, 0.9, { size: 22, color: DECK.light || 'F6DCE4' });
    hline(s, 0.9, 3.95, 3.4, 'F2B544', 3);
    (o.bullets || []).forEach((b, i) => txt(s, b, 0.9, 4.35 + i * 0.55, 10, 0.45, { size: 18, color: C.white }));
    txt(s, o.footer || 'Teacher deck  •  answers and mark schemes in the speaker notes', 0.9, 6.75, 10, 0.35, { size: 12, italic: true, color: LIGHT });
    if (o.notes) notes(s, o.notes);
    return s;
  }

  function objectives(o) {
    const s = frame('Learning objectives', { tag: o.tag });
    txt(s, 'By the end of this lesson you can…', MX, 1.35, 8, 0.45, { size: 20, italic: true, color: C.grey });
    let y = 2.0;
    o.items.forEach((it, i) => {
      circle(s, MX + 0.3, y + 0.28, 0.5, C.accent);
      txt(s, String(i + 1), MX + 0.05, y + 0.03, 0.5, 0.5, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
      txt(s, it, MX + 0.8, y, 7.4, 0.9, { size: 22 });
      y += Math.max(0.75, textH(it, 22, 7.4) + 0.3);
    });
    const kx = 9.0, kw = W - MX - kx;
    rect(s, kx, 1.4, kw, 5.4, C.soft, C.line, { round: true });
    txt(s, 'Key words', kx + 0.3, 1.6, kw - 0.6, 0.45, { size: 20, bold: true, color: C.maroon });
    o.keywords.forEach((k, i) => txt(s, k, kx + 0.3, 2.2 + i * 0.55, kw - 0.6, 0.45, { size: 20 }));
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // numbered question cards (Do Now / exit ticket / practice)
  function qCards(s, qs, o = {}) {
    const cols = o.cols || 2, gap = 0.3, top = o.top || 1.45, bottom = o.bottom || 6.85;
    const rows = Math.ceil(qs.length / cols);
    const cw = (W - 2 * MX - gap * (cols - 1)) / cols, ch = (bottom - top - gap * (rows - 1)) / rows;
    qs.forEach((q, i) => {
      const c = i % cols, r = Math.floor(i / cols);
      const x = MX + c * (cw + gap), y = top + r * (ch + gap);
      rect(s, x, y, cw, ch, o.fill || C.greyLight, o.border || C.greyLight, { round: true });
      circle(s, x + 0.42, y + 0.42, 0.48, o.numFill || C.accent);
      txt(s, String(i + 1 + (o.start || 0)), x + 0.18, y + 0.18, 0.48, 0.48, { size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
      const qt = typeof q === 'string' ? q : q.q;
      txt(s, qt, x + 0.85, y + 0.22, cw - 1.1, ch - 0.4, { size: o.size || 22, color: o.color, bold: !!o.bold });
      if (q.math) math(s, x + 0.85, y + 0.22 + textH(qt, o.size || 22, cw - 1.1) + 0.55, q.math, { size: o.size || 22 });
      if (o.answers && o.answers[i] != null) {
        const a = o.answers[i];
        const ah = Math.min(0.55 * Math.max(1, lineCount(a, 20, cw - 1.1, true)), ch - 0.3);
        txt(s, a, x + 0.85, y + ch - ah - 0.18, cw - 1.1, ah, { size: 20, bold: true, color: C.green, valign: 'bottom' });
      }
    });
  }
  function doNow(o) {
    const make = reveal => {
      const s = frame(reveal ? 'Do Now: answers' : 'Do Now', { tag: o.tag || '5 minutes • no calculator' });
      qCards(s, o.qs, { answers: reveal ? o.answers : null, size: 22 });
      if (o.notes) notes(s, o.notes);
      return s;
    };
    return [make(false), make(true)];
  }

  // definition cards with an optional small picture callback
  function vocab(o) {
    const s = frame(o.title || 'Key words', { tag: o.tag });
    const n = o.items.length, gap = 0.25, top = 1.45, bottom = 6.85;
    const rh = (bottom - top - gap * (n - 1)) / n;
    o.items.forEach((it, i) => {
      const y = top + i * (rh + gap);
      rect(s, MX, y, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line, { round: true });
      rect(s, MX, y, 0.12, rh, C.accent);
      txt(s, it.term, MX + 0.4, y, 3.2, rh, { size: 24, bold: true, color: C.maroon, valign: 'middle' });
      txt(s, it.def, MX + 3.7, y, W - 2 * MX - 4.0, rh, { size: 21, valign: 'middle' });
    });
    if (o.notes) notes(s, o.notes);
    return s;
  }

  // a list of steps (text or maths) in a column; returns y after
  function steps(s, list, x, y, w, o = {}) {
    for (const st of list) {
      const pt = o.size || 21;
      const lw = o.labelW || 1.6, lpt = o.labelSize || 16;
      if (st.label) txt(s, st.label, x, y + (hasFrac(st.math) ? 0.33 : 0), lw - 0.1, 0.45, { size: lpt, bold: !o.labelPlain, color: o.labelColor || C.accent });
      const sx = st.label ? x + lw : x, sw = st.label ? w - lw : w;
      const labH = st.label ? textH(st.label, lpt, lw - 0.1, !o.labelPlain) : 0;
      if (st.math) {
        const h = Math.max(hasFrac(st.math) ? 1.05 : 0.55, labH);
        math(s, sx, y + h / 2, st.math, { size: pt, bold: !!st.bold, color: st.color });
        y += h + 0.12;
      } else {
        const th = textH(st.text, pt, sw, st.bold), h = Math.max(th, labH);
        txt(s, st.text, sx, y, sw, th + 0.05, { size: pt, bold: !!st.bold, color: st.color });
        y += h + 0.18;
      }
    }
    return y;
  }

  // My turn / Your turn pair: returns [slide, revealSlide]
  function myTurnYourTurn(o) {
    const make = reveal => {
      const s = frame(o.title, { tag: o.tag });
      const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.35, bottom = 6.9;
      // My turn
      rect(s, MX, top, cw, bottom - top, C.white, C.line, { round: true });
      rect(s, MX, top, cw, 0.55, C.maroon, C.maroon, { round: true });
      rect(s, MX, top + 0.3, cw, 0.25, C.maroon);
      txt(s, 'My turn', MX + 0.3, top, cw - 0.6, 0.55, { size: 20, bold: true, color: C.white, valign: 'middle' });
      let y = top + 0.75;
      const qh = textH(o.mine.q, 20, cw - 0.6);
      txt(s, o.mine.q, MX + 0.3, y, cw - 0.6, qh + 0.05, { size: 20 });
      y += qh + 0.25;
      steps(s, o.mine.steps, MX + 0.3, y, cw - 0.6, { size: o.stepSize || 20, labelW: o.labelW, labelSize: o.labelSize, labelPlain: o.labelPlain, labelColor: o.labelColor });
      // Your turn
      const x2 = MX + cw + gap;
      rect(s, x2, top, cw, bottom - top, C.orangeSoft, 'F3D9B5', { round: true });
      rect(s, x2, top, cw, 0.55, C.orange, C.orange, { round: true });
      rect(s, x2, top + 0.3, cw, 0.25, C.orange);
      txt(s, reveal ? 'Your turn: answer' : 'Your turn', x2 + 0.3, top, cw - 0.6, 0.55, { size: 20, bold: true, color: C.white, valign: 'middle' });
      let y2 = top + 0.75;
      const qh2 = textH(o.yours.q, 20, cw - 0.6);
      txt(s, o.yours.q, x2 + 0.3, y2, cw - 0.6, qh2 + 0.05, { size: 20 });
      y2 += qh2 + 0.25;
      if (reveal) steps(s, o.yours.steps, x2 + 0.3, y2, cw - 0.6, { size: o.stepSize || 20, labelW: o.labelW, labelSize: o.labelSize, labelPlain: o.labelPlain, labelColor: o.labelColor || C.green });
      else if (o.showYourQs) steps(s, o.yours.steps.map(st => ({ label: st.label, text: ' ' })), x2 + 0.3, y2, cw - 0.6, { size: o.stepSize || 20, labelW: o.labelW, labelSize: o.labelSize, labelPlain: o.labelPlain, labelColor: o.labelColor });
      else txt(s, 'Write your working on your whiteboard.', x2 + 0.3, bottom - 0.65, cw - 0.6, 0.4, { size: 16, italic: true, color: C.grey });
      if (o.notes) notes(s, o.notes);
      return s;
    };
    return [make(false), make(true)];
  }

  // hinge question: 4 options; reveal highlights the correct one
  function hinge(o) {
    const make = reveal => {
      const s = frame(reveal ? `${o.title}: answer` : o.title, { tag: o.tag || 'Show me on your whiteboard' });
      let qh = textH(o.q, 24, W - 2 * MX);
      if (o.qMath) { qh = 1.0; txt(s, o.q, MX, 1.4, W - 2 * MX, qh, { size: 24, bold: true, valign: 'middle' }); math(s, MX + textW(plain(o.q), 24, true) + 0.2, 1.9, o.qMath, { size: 26, bold: true }); }
      else txt(s, o.q, MX, 1.4, W - 2 * MX, qh + 0.1, { size: 24, bold: true });
      const top = 1.4 + qh + 0.35, gap = 0.3, cw = (W - 2 * MX - gap) / 2, ch = (6.85 - top - gap) / 2;
      o.options.forEach((op, i) => {
        const c = i % 2, r = Math.floor(i / 2), x = MX + c * (cw + gap), y = top + r * (ch + gap);
        const ok = reveal && i === o.correct;
        rect(s, x, y, cw, ch, ok ? C.greenSoft : C.greyLight, ok ? C.green : C.greyLight, { round: true, lw: ok ? 3 : 1 });
        circle(s, x + 0.5, y + ch / 2, 0.62, ok ? C.green : C.accent);
        txt(s, 'ABCD'[i], x + 0.19, y + ch / 2 - 0.31, 0.62, 0.62, { size: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
        if (Array.isArray(op)) math(s, x + 1.05, y + ch / 2, op, { size: 34, bold: true, color: reveal && !ok ? C.grey : C.ink });
        else {
          const big = o.options.every(t => typeof t !== 'string' || t.length <= 12), mid = o.options.every(t => typeof t !== 'string' || t.length <= 18);
          txt(s, op, x + 1.05, y, cw - 1.3, ch, { size: big ? 34 : mid ? 28 : 20, bold: big || mid, valign: 'middle', color: reveal && !ok ? C.grey : C.ink });
        }
      });
      if (o.notes) notes(s, o.notes);
      return s;
    };
    return [make(false), make(true)];
  }

  // AQA-style exam question with answer lines and marks; plus a mark-scheme slide
  function examQuestion(o) {
    const s = frame(o.title || 'Exam question', { tag: o.tag || 'AQA style' });
    let y = 1.35;
    const pt = o.size || 20, gapL = o.lineGap || 0.42;
    if (o.stem) { const h = textH(o.stem, pt, W - 2 * MX); txt(s, o.stem, MX, y, W - 2 * MX, h + 0.05, { size: pt }); y += h + 0.2; }
    if (o.table) y = o.table(s, y) + 0.2;
    for (const p of o.parts) {
      const qw = W - 2 * MX - 1.6;
      const off = p.math ? 0.28 : 0;
      txt(s, `(${p.l})`, MX, y + off, 0.6, 0.45, { size: pt, bold: true, color: C.maroon });
      let h = textH(p.q, pt, qw - 0.6);
      if (p.math) {
        // one-line question with a stacked fraction after the words
        h = 1.0;
        txt(s, p.q, MX + 0.6, y, qw - 0.6, h, { size: pt, valign: 'middle' });
        math(s, MX + 0.6 + textW(plain(p.q), pt) + 0.15, y + h / 2, p.math, { size: pt });
      } else txt(s, p.q, MX + 0.6, y, qw - 0.6, h + 0.05, { size: pt });
      txt(s, `[${p.m} mark${p.m > 1 ? 's' : ''}]`, W - MX - 1.5, y + off, 1.5, 0.45, { size: pt - 2, bold: true, color: C.orange, align: 'right' });
      y += h + 0.05;
      const nl = p.lines == null ? 1 : p.lines;
      for (let k = 0; k < nl; k++) { y += gapL; hline(s, MX + 0.6, y, W - MX - 1.7, 'BFB5BA', 1); }
      y += 0.22;
    }
    const total = o.parts.reduce((a, p) => a + p.m, 0);
    assert(total === o.total, `exam total ${total} != ${o.total}`);
    assert(y < 6.95, `exam question overflows: y=${y.toFixed(2)}`);
    if (o.notes) notes(s, o.notes);
    // mark scheme
    const m = frame((o.title || 'Exam question') + ': mark scheme', { tag: o.schemeTag || 'M1 method • A1 accuracy • B1 independent' });
    const cols = [0.8, 5.2, 1.8, W - 2 * MX - 0.8 - 5.2 - 1.8];
    const heads = ['Part', 'Answer', 'Marks', 'Notes'];
    const rowsData = o.scheme;
    const opts = { x: MX, y: 1.4, w: W - 2 * MX, colW: cols, fontFace: FONT, fontSize: o.schemeSize || 20, color: C.ink, border: { type: 'solid', color: C.line, pt: 1 }, valign: 'middle', margin: 0.08 };
    const hdr = heads.map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.maroon } } }));
    const body = rowsData.map((r, i) => r.map((c, j) => ({ text: c, options: { fill: { color: i % 2 ? C.white : C.soft }, bold: j === 0 } })));
    m.addTable([hdr, ...body], opts);
    if (o.notes) notes(m, o.notes);
    return [s, m];
  }

  function save(file) { return pres.writeFile({ fileName: file }); }

  return { pres, SH, C, W, H, MX, frame, notes, txt, rect, hline, vline, circle, math, mathWidth, textW, textH, lineCount, titleSlide, objectives, qCards, doNow, vocab, steps, myTurnYourTurn, hinge, examQuestion, save, get count() { return n; } };
}

module.exports = { init, calc, C, CALCS, textW, textH, lineCount };
