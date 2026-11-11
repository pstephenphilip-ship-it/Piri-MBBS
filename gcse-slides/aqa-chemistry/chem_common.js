// chem_common.js — shared deck settings and helpers for AQA GCSE Chemistry (8462) lessons.
'use strict';
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

function deck(code, title) {
  return {
    code, title,
    kicker: 'AQA GCSE CHEMISTRY (8462)  •  HIGHER',
    footer: 'AQA GCSE Chemistry 8462', author: 'GCSE Chemistry', docPrefix: 'AQA 8462',
    palette: { maroon: '3F2A63', accent: '6A4C9C', soft: 'F3EFF9', line: 'DED5EC', ink: '1F1B2A' },
    light: 'DCD2EC',
  };
}

// ---- formula parser: 'Ca(OH)2' -> { Ca:1, O:2, H:2 }; handles brackets and a leading coefficient ----
function parse(f) {
  const stack = [{}];
  const re = /([A-Z][a-z]?|\(|\)|\d+)/g; let m, last = null;
  const toks = f.match(re);
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (t === '(') { stack.push({}); last = null; }
    else if (t === ')') { const g = stack.pop(); let k = 1; if (/^\d+$/.test(toks[i + 1] || '')) { k = +toks[++i]; } const top = stack[stack.length - 1]; for (const e in g) top[e] = (top[e] || 0) + g[e] * k; last = null; }
    else if (/^\d+$/.test(t)) { /* handled with element */ }
    else { let k = 1; if (/^\d+$/.test(toks[i + 1] || '')) k = +toks[++i]; const top = stack[stack.length - 1]; top[t] = (top[t] || 0) + k; }
  }
  return stack[0];
}
function atoms(f) { return Object.values(parse(f)).reduce((a, b) => a + b, 0); }
// side: [[coef, formula], ...]
function count(side) { const o = {}; side.forEach(([k, f]) => { const p = parse(f); for (const e in p) o[e] = (o[e] || 0) + k * p[e]; }); return o; }
function balanced(label, lhs, rhs) {
  const a = count(lhs), b = count(rhs);
  const ok = Object.keys({ ...a, ...b }).every(e => a[e] === b[e]);
  return calc('balanced ' + label, ok ? 1 : 0, 1);
}
const AR = { H: 1, He: 4, Li: 7, C: 12, N: 14, O: 16, F: 19, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Zn: 65, Br: 80, Ag: 108, I: 127, Ba: 137, Pb: 207 };
function Mr(f) { const p = parse(f); return Object.entries(p).reduce((a, [e, k]) => a + AR[e] * k, 0); }

function helpers(D) {
  const { txt, rect, circle } = D;
  function headCard(s, x, y, w, h, head, colour, fill) {
    rect(s, x, y, w, h, fill, colour);
    rect(s, x, y, w, 0.58, colour);
    txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
  }
  function bullets(s, x, y, w, items, size = 18, gap = 0.16) {
    items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
    return y;
  }
  function seg(s, x1, y1, x2, y2, color, width = 1.25, o = {}) {
    s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
      flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width, endArrowType: o.arrow ? 'triangle' : undefined, dashType: o.dash } });
  }
  function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2) {
    s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
      flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
  }
  function ell(s, x, y, w, h, fill, line, lw = 1.5) { s.addShape(D.SH.ellipse, { x, y, w, h, fill: { color: fill }, line: { color: line, width: lw } }); }
  // an atom drawn as a coloured ball with an optional symbol
  function ball(s, cx, cy, d, fill, label, tc) {
    circle(s, cx, cy, d, fill, '333333', 1);
    if (label) txt(s, label, cx - d / 2, cy - d / 2, d, d, { size: Math.max(9, Math.round(d * 26)), bold: true, color: tc || C.white, align: 'center', valign: 'middle' });
  }
  // table: head[], rows[][], col widths[], at x,y with row height
  function table(s, x, y, cws, head, rows, o = {}) {
    const rh = o.rh || 0.62, hh = o.hh || 0.6, size = o.size || 17;
    let cx = x;
    head.forEach((t, j) => { rect(s, cx, y, cws[j], hh, o.headFill || C.maroon); txt(s, t, cx + 0.15, y, cws[j] - 0.3, hh, { size, bold: true, color: C.white, valign: 'middle' }); cx += cws[j]; });
    rows.forEach((r, i) => { let cx2 = x; r.forEach((t, j) => { const yy = y + hh + i * rh; rect(s, cx2, yy, cws[j], rh, i % 2 ? C.white : C.soft, C.line); txt(s, t, cx2 + 0.15, yy, cws[j] - 0.3, rh, { size, bold: j === 0 && o.boldFirst !== false, valign: 'middle', align: (o.align && o.align[j]) || 'left' }); cx2 += cws[j]; }); });
    return y + hh + rows.length * rh;
  }
  // a box with text inside
  function note(s, x, y, w, h, str, o = {}) {
    rect(s, x, y, w, h, o.fill || C.orangeSoft, o.line || 'F3D9B5');
    txt(s, str, x + 0.3, y, w - 0.6, h, { size: o.size || 17, valign: 'middle', align: o.align });
  }
  return { headCard, bullets, seg, arrow, ell, ball, table, note };
}

module.exports = { T, C, calc, deck, parse, atoms, count, balanced, AR, Mr, helpers };
