// build_T6.js — Edexcel GCSE Chemistry 1CH0 Topic 6 Groups in the periodic table (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T6.js
// Structure copied from build_T1.js / build_T4.js. edx_chem_template.js is NOT edited: the equation checker and
// glassware helpers are spliced in from build_T3.js; atom and periodic-table helpers from build_T1.js.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 6,
  title: 'Groups in the periodic table',
  shortTitle: 'T6',
  subtitle: 'Alkali metals, halogens and noble gases',
  specRange: '6.1–6.16',
  pOnly: [],
  paper: 'Paper 2',
  keywords: ['Group 1', 'Alkali metals', 'Group 7', 'Halogens', 'Displacement', 'Noble gases'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= EQUATIONS: atom AND charge balance asserted; display text generated from the same data =======================
function parseFormula(f) {
  let charge = 0;
  if (f === 'e-') return { atoms: {}, charge: -1 };
  const m = f.match(/^(.*)\^(\d?)([+-])$/);
  let body = f;
  if (m) { body = m[1]; charge = (m[3] === '+' ? 1 : -1) * (m[2] ? +m[2] : 1); }
  const stack = [{}];
  const tokens = body.match(/([A-Z][a-z]?|\(|\)|\d+)/g) || [];
  let lastAdded = null;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === '(') { stack.push({}); lastAdded = null; }
    else if (t === ')') {
      const grp = stack.pop(); let n = 1;
      if (tokens[i + 1] && /^\d+$/.test(tokens[i + 1])) n = +tokens[++i];
      for (const [k, v] of Object.entries(grp)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] || 0) + v * n;
      lastAdded = null;
    } else if (/^\d+$/.test(t)) { stack[stack.length - 1][lastAdded] += +t - 1; }
    else { stack[stack.length - 1][t] = (stack[stack.length - 1][t] || 0) + 1; lastAdded = t; }
  }
  return { atoms: stack[0], charge };
}
// handles hydrates written 'CuSO4.5H2O'
function parseF(f) {
  if (f === 'e-') return parseFormula(f);
  const tot = { atoms: {}, charge: 0 };
  f.split('.').forEach((p, i) => {
    let n = 1; const mm = p.match(/^(\d+)(.*)$/);
    if (i > 0 && mm) { n = +mm[1]; p = mm[2]; }
    const r = parseFormula(p); tot.charge += n * r.charge;
    for (const [k, v] of Object.entries(r.atoms)) tot.atoms[k] = (tot.atoms[k] || 0) + n * v;
  });
  return tot;
}
function side(terms) {
  const tot = { atoms: {}, charge: 0 };
  terms.forEach(([n, f]) => { const p = parseF(f); tot.charge += n * p.charge; for (const [k, v] of Object.entries(p.atoms)) tot.atoms[k] = (tot.atoms[k] || 0) + n * v; });
  return tot;
}
const SUBD = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
const SUPD = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻' };
function fmtF(f) {
  if (f === 'e-') return 'e⁻';
  let body = f, ch = '';
  const m = f.match(/^(.*)\^(\d?[+-])$/);
  if (m) { body = m[1]; ch = m[2].split('').map(c => SUPD[c]).join(''); }
  return body.split('.').map((p, i) => {
    let lead = '';
    if (i > 0) { const mm = p.match(/^(\d+)(.*)$/); if (mm) { lead = mm[1]; p = mm[2]; } }
    return lead + p.replace(/([A-Za-z)])(\d+)/g, (_, a, d) => a + d.split('').map(c => SUBD[c]).join(''));
  }).join('·') + ch;
}
const termStr = ([n, f, st]) => (n === 1 ? '' : n) + fmtF(f) + (st ? `(${st})` : '');
const EQ = {}, EQLIST = [];
// eq(key, lhs, rhs, o): terms [coefficient, formula, state]. Asserts atoms and charge; returns the display string.
function eq(key, lhs, rhs, o = {}) {
  const a = side(lhs), b = side(rhs);
  const norm = x => Object.keys(x.atoms).filter(k => x.atoms[k]).sort().map(k => [k, x.atoms[k]]);
  assert.deepStrictEqual(norm(a), norm(b), `atoms not balanced: ${key}`);
  assert.strictEqual(a.charge, b.charge, `charge not balanced: ${key}`);
  if (!o.noStates) [...lhs, ...rhs].forEach(t => assert(t[1] === 'e-' || t[2], `state symbol missing in ${key}: ${t[1]}`));
  const str = lhs.map(termStr).join(' + ') + (o.rev ? ' ⇌ ' : ' → ') + rhs.map(termStr).join(' + ');
  assert(!EQ[key], 'duplicate key ' + key);
  EQ[key] = str; EQ[key + '_d'] = { lhs, rhs, a, b }; EQLIST.push(`${key}: ${str}`);
  return str;
}
// charge total of one side, as text (for the "check" steps)
const qStr = q => q === 0 ? '0' : (q > 0 ? '+' + q : '−' + Math.abs(q));
// parser and formatter self-tests
assert.deepStrictEqual(parseF('CuSO4.5H2O').atoms, { Cu: 1, S: 1, O: 9, H: 10 });
assert.strictEqual(fmtF('SO4^2-'), 'SO₄²⁻');
assert.strictEqual(fmtF('Ca(OH)2'), 'Ca(OH)₂');
assert.strictEqual(fmtF('CuSO4.5H2O'), 'CuSO₄·5H₂O');
assert.throws(() => eq('test unbalanced', [[1, 'Mg', 's'], [1, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]));
assert.throws(() => eq('test charge', [[1, 'Cl^-', 'aq']], [[1, 'Cl2', 'g']], { noStates: true }));



// --- Topic 6 equations (atoms and charges asserted) ---
eq('Li+H2O', [[2, 'Li', 's'], [2, 'H2O', 'l']], [[2, 'LiOH', 'aq'], [1, 'H2', 'g']]);
eq('Na+H2O', [[2, 'Na', 's'], [2, 'H2O', 'l']], [[2, 'NaOH', 'aq'], [1, 'H2', 'g']]);
eq('K+H2O', [[2, 'K', 's'], [2, 'H2O', 'l']], [[2, 'KOH', 'aq'], [1, 'H2', 'g']]);
eq('Rb+H2O', [[2, 'Rb', 's'], [2, 'H2O', 'l']], [[2, 'RbOH', 'aq'], [1, 'H2', 'g']]);
eq('Na+Cl2', [[2, 'Na', 's'], [1, 'Cl2', 'g']], [[2, 'NaCl', 's']]);
eq('Fe+Cl2', [[2, 'Fe', 's'], [3, 'Cl2', 'g']], [[2, 'FeCl3', 's']]);
eq('K+Br2', [[2, 'K', 's'], [1, 'Br2', 'l']], [[2, 'KBr', 's']]);
eq('Na+I2', [[2, 'Na', 's'], [1, 'I2', 's']], [[2, 'NaI', 's']]);
eq('H2+Cl2', [[1, 'H2', 'g'], [1, 'Cl2', 'g']], [[2, 'HCl', 'g']]);
eq('H2+Br2', [[1, 'H2', 'g'], [1, 'Br2', 'g']], [[2, 'HBr', 'g']]);
eq('HCl aq', [[1, 'HCl', 'g']], [[1, 'H^+', 'aq'], [1, 'Cl^-', 'aq']]);
eq('Cl2+KBr', [[1, 'Cl2', 'aq'], [2, 'KBr', 'aq']], [[2, 'KCl', 'aq'], [1, 'Br2', 'aq']]);
eq('Cl2+Br ionic', [[1, 'Cl2', 'aq'], [2, 'Br^-', 'aq']], [[2, 'Cl^-', 'aq'], [1, 'Br2', 'aq']]);
eq('Cl2+I ionic', [[1, 'Cl2', 'aq'], [2, 'I^-', 'aq']], [[2, 'Cl^-', 'aq'], [1, 'I2', 'aq']]);
eq('Br2+I ionic', [[1, 'Br2', 'aq'], [2, 'I^-', 'aq']], [[2, 'Br^-', 'aq'], [1, 'I2', 'aq']]);
eq('Br2+KI', [[1, 'Br2', 'aq'], [2, 'KI', 'aq']], [[2, 'KBr', 'aq'], [1, 'I2', 'aq']]);
eq('Cl red', [[1, 'Cl2'], [2, 'e-']], [[2, 'Cl^-']], { noStates: true });
eq('Br ox', [[2, 'Br^-']], [[1, 'Br2'], [2, 'e-']], { noStates: true });
eq('Br red', [[1, 'Br2'], [2, 'e-']], [[2, 'Br^-']], { noStates: true });
eq('I ox', [[2, 'I^-']], [[1, 'I2'], [2, 'e-']], { noStates: true });
eq('Na ox', [[1, 'Na']], [[1, 'Na^+'], [1, 'e-']], { noStates: true });

// ======================= DATA (asserted) =======================
const AM = [['Li', 3, 181, 'fizzes steadily; floats; disappears slowly'], ['Na', 11, 98, 'fizzes fast; melts into a ball; whizzes around'], ['K', 19, 63, 'very fast; lilac flame; may spark or explode']];
for (let i = 1; i < AM.length; i++) assert(AM[i][2] < AM[i - 1][2], 'alkali mp falls down the group');
const HAL = [['F₂', 'pale yellow', 'gas', -188], ['Cl₂', 'green', 'gas', -34], ['Br₂', 'red-brown', 'liquid', 59], ['I₂', 'grey-black (purple vapour)', 'solid', 184]];
for (let i = 1; i < HAL.length; i++) assert(HAL[i][3] > HAL[i - 1][3], 'halogen bp rises down the group');
const stateAt = (bp, mp, t) => (t < mp ? 'solid' : t < bp ? 'liquid' : 'gas');
assert.strictEqual(stateAt(-34, -101, 25), 'gas'); assert.strictEqual(stateAt(59, -7, 25), 'liquid'); assert.strictEqual(stateAt(184, 114, 25), 'solid');
const NG = [['He', 2, -269], ['Ne', 10, -246], ['Ar', 18, -186], ['Kr', 36, -153], ['Xe', 54, -108]];
for (let i = 1; i < NG.length; i++) assert(NG[i][2] > NG[i - 1][2], 'noble gas bp rises down the group');
// halogen displacement grid: a halogen displaces a less reactive halide
const HORDER = ['Cl', 'Br', 'I'];
const disp = (h, x) => HORDER.indexOf(h) < HORDER.indexOf(x);
const HGRID = HORDER.map(h => HORDER.map(x => (h === x ? null : disp(h, x))));
calc('halogen displacement reactions', HGRID.flat().filter(v => v === true).length, 3);
// electron counts
const CONF6 = { Li: [2, 1], Na: [2, 8, 1], K: [2, 8, 8, 1], F: [2, 7], Cl: [2, 8, 7], He: [2], Ne: [2, 8], Ar: [2, 8, 8] };
const ZZ = { Li: 3, Na: 11, K: 19, F: 9, Cl: 17, He: 2, Ne: 10, Ar: 18 };
for (const [e, c] of Object.entries(CONF6)) calc('config ' + e, c.reduce((a, b) => a + b, 0), ZZ[e]);
calc('Mr NaCl', 23 + 35.5, 58.5, 1e-12);
calc('FQ mass NaCl from 4.6 g Na', 4.6 / 23 * 58.5, 11.7, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in edx_chem_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
    line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), ...(o.open ? [] : [{ close: true }])],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle', align: o.align });
}
// equation box (bold, centred)
function eqn(s, x, y, w, t, o = {}) {
  box(s, x, y, w, o.h || 0.42, o.fill || C.white, o.edge || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: o.lw || 1 });
  label(s, x + 0.08, y, w - 0.16, t, { size: o.size || 12, h: o.h || 0.42, color: o.color || C.ink, bold: o.bold !== false, align: o.align });
}
function callout(s, x, y, w, t, tx, ty, o = {}) {
  label(s, x, y, w, t, { size: o.size || 10.5, h: o.h || 0.26, align: o.align || 'left', color: o.color || C.text, bold: o.bold, valign: 'middle' });
  const ax = o.align === 'right' ? x + w + 0.03 : x - 0.03, ay = y + (o.h || 0.26) / 2;
  line(s, ax, ay, tx, ty, o.lc || '8A8F99', 0.75);
}
function badge(s, cx, cy, n, col = C.blue, r = 0.2) { ball(s, cx, cy, r, col, C.white, 1.5); label(s, cx - r, cy - r, 2 * r, String(n), { size: 13, bold: true, color: C.white, h: 2 * r }); }
const GLASS = 'EEF5FB', WAT = ['CFE4F7', '5B9BD5'], ACIDC = 'F9E0DA', CUSO4 = ['8EC9F0', '2F7FC1'], CUO = ['3A3A3A', '1A1A1A'], GRAPH = ['4A4F5A', '2A2F3A'], COPPER = ['C8783A', '8A4A1A'];
const PINK = ['F6C6DC', 'C2185B'];
// ions: coloured ball with the symbol written on it
const IONC = {
  'H⁺': ['F6B0A8', 'B7372B'], 'OH⁻': ['A9C8F0', '2F5FA8'], 'Cl⁻': ['B9E0A8', '3E7F2E'], 'Na⁺': ['F7E08A', '9A7A1A'], 'NO₃⁻': ['D7C4EE', '6A3FA0'],
  'SO₄²⁻': ['F5D1A0', 'A86A12'], 'Ag⁺': ['E3E6EA', '6B7385'], 'Cu²⁺': ['8EC9F0', '1F5F99'], 'A⁻': ['D6E9C6', '4E7A35'], 'Ba²⁺': ['F2C9E0', '9A3F6E'],
  'Br⁻': ['E8B48A', '8A4A1A'], 'Pb²⁺': ['C9CDD3', '4A5262'], 'K⁺': ['F7E08A', '9A7A1A'],
};
function ion(s, cx, cy, t, r = 0.17, o = {}) {
  const [f, e] = IONC[t] || ['FFFFFF', '8A8F99'];
  ball(s, cx, cy, r, f, e, 1);
  label(s, cx - r - 0.12, cy - r, 2 * r + 0.24, `**${t}**`, { size: o.size || 10, h: 2 * r, color: C.ink });
}
// spectator: dashed ring round an ion
function ring(s, cx, cy, r) { oval(s, cx, cy, 2 * r + 0.12, 2 * r + 0.12, null, C.red, { dash: 'dash', lw: 1.25 }); }
function water(s, cx, cy, r = 0.1) {
  ball(s, cx - r * 1.05, cy + r * 0.75, r * 0.62, 'FFFFFF', '8A8F99', 0.75); ball(s, cx + r * 1.05, cy + r * 0.75, r * 0.62, 'FFFFFF', '8A8F99', 0.75);
  ball(s, cx, cy, r, 'E06666', '9E2A2A', 0.75);
}
// un-ionised weak-acid molecule "HA"
function molHA(s, cx, cy) {
  ball(s, cx - 0.1, cy, 0.12, 'F6B0A8', 'B7372B', 1); ball(s, cx + 0.12, cy, 0.15, 'D6E9C6', '4E7A35', 1);
  label(s, cx - 0.3, cy - 0.15, 0.6, '**HA**', { size: 10, h: 0.3, color: C.ink });
}
function beaker(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  box(s, x, y, w, h, GLASS, null);
  if (level) box(s, x, y + h - level * h, w, level * h, liq, null);
  if (level) line(s, x, y + h - level * h, x + w, y + h - level * h, o.surface || WAT[1], 1);
  line(s, x, y, x, y + h, C.ink, 1.5); line(s, x + w, y, x + w, y + h, C.ink, 1.5); line(s, x, y + h, x + w, y + h, C.ink, 1.5);
  line(s, x - 0.06, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.06, y, C.ink, 1.5);
}
function tube(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  const r = w / 2, cx = x + r, yb = y + h - r;
  const arc = (y0, a0, a1, n = 16) => { const p = []; for (let i = 0; i <= n; i++) { const t = a0 + (a1 - a0) * i / n; p.push([cx + r * Math.cos(t), y0 + r * Math.sin(t)]); } return p; };
  poly(s, [[x, y], [x + w, y], ...arc(yb, 0, Math.PI)], GLASS, null);
  if (level) { const ly = y + h - level * h; poly(s, [[x, Math.min(ly, yb)], [x + w, Math.min(ly, yb)], ...arc(yb, 0, Math.PI)], liq, null); }
  if (o.ppt) { poly(s, [[x, yb - 0.02], [x + w, yb - 0.02], ...arc(yb, 0, Math.PI)], o.ppt[0], null); for (let i = 0; i < 7; i++) ball(s, x + 0.08 + (w - 0.16) * ((i * 37) % 7) / 6, yb - 0.12 - ((i * 53) % 5) * 0.09, 0.025, o.ppt[0], o.ppt[1], 0.5); }
  line(s, x, y, x, yb, C.ink, 1.5); line(s, x + w, y, x + w, yb, C.ink, 1.5);
  poly(s, arc(yb, 0, Math.PI), null, C.ink, { open: true, lw: 1.5 });
  if (o.lip !== false) { line(s, x - 0.04, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.04, y, C.ink, 1.5); }
  return { cx, yb };
}
function bubbles(s, pts, r = 0.035) { pts.forEach(([x, y]) => ball(s, x, y, r, 'FFFFFF', WAT[1], 0.6)); }
function conical(s, cx, top, w, h, level = 0, liq = WAT[0]) {
  const nw = Math.min(0.32, w * 0.3), nh = h * 0.3;
  const pts = [[cx - nw / 2, top], [cx - nw / 2, top + nh], [cx - w / 2, top + h], [cx + w / 2, top + h], [cx + nw / 2, top + nh], [cx + nw / 2, top]];
  poly(s, pts, GLASS, null);
  if (level) {
    const ch = h - nh, yl = top + h - level * ch, hw = nw / 2 + (w / 2 - nw / 2) * ((yl - top - nh) / ch);
    poly(s, [[cx - hw, yl], [cx - w / 2, top + h], [cx + w / 2, top + h], [cx + hw, yl]], liq, null);
    line(s, cx - hw, yl, cx + hw, yl, WAT[1], 1);
  }
  poly(s, pts, null, C.ink, { open: true, lw: 1.5 });
}
function funnel(s, cx, top, w, h, o = {}) {
  const sw = 0.1, stem = o.stem || 0.45;
  poly(s, [[cx - w / 2, top], [cx + w / 2, top], [cx + sw / 2, top + h], [cx - sw / 2, top + h]], GLASS, C.ink, { lw: 1.5 });
  box(s, cx - sw / 2, top + h, sw, stem, GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - w / 2 + 0.07, top + 0.03], [cx + w / 2 - 0.07, top + 0.03], [cx, top + h + 0.02]], 'FFFFFF', '9AA3B0', { lw: 0.75 });
  if (o.residue) { const rh = h * 0.42, rw = (w / 2 - 0.07) * 0.42; poly(s, [[cx - rw, top + h - rh], [cx + rw, top + h - rh], [cx, top + h]], o.residue[0], o.residue[1], { lw: 0.5 }); }
  if (o.drip) ball(s, cx, top + h + stem + 0.07, 0.035, o.drip, o.drip);
}
function basin(s, cx, y, w, d, liq) {
  const pts = []; for (let i = 0; i <= 24; i++) { const t = Math.PI * i / 24; pts.push([cx + (w / 2) * Math.cos(t), y + d * Math.sin(t)]); }
  poly(s, pts, 'F4F4F4', null);
  if (liq) {
    const pts2 = []; for (let i = 0; i <= 24; i++) { const t = 0.35 + (Math.PI - 0.7) * i / 24; pts2.push([cx + (w / 2) * Math.cos(t), y + d * Math.sin(t)]); }
    poly(s, pts2, liq, null);
  }
  poly(s, pts, null, C.ink, { open: true, lw: 1.5 });
  line(s, cx - w / 2, y, cx + w / 2, y, C.ink, 1.5);
}
function crystal(s, cx, cy, r, col = CUSO4) { poly(s, [[cx - r * 0.3, cy - r], [cx + r, cy - r * 0.45], [cx + r * 0.3, cy + r], [cx - r, cy + r * 0.45]], col[0], col[1], { lw: 0.75 }); }
const UI = ['D7191C', 'E8402A', 'F26B22', 'F7941D', 'FDB813', 'FFDE17', 'C8D82B', '7DC242', '2FA84F', '00A88F', '00A4D6', '0072BC', '2E3192', '5B2C8F', '4B1E6E'];
function phStrip(s, x, y, w, h, o = {}) {
  const cw = w / 15;
  UI.forEach((c, i) => {
    box(s, x + i * cw, y, cw, h, c, 'FFFFFF', { lw: 0.5 });
    label(s, x + i * cw, y, cw, `**${i}**`, { size: o.size || 11, h, color: (i <= 1 || i >= 11) ? C.white : C.ink });
  });
  return cw;
}
function phMeter(s, x, y, w, reading, pxp, py0, py1) {
  box(s, x, y, w, 0.8, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, x + 0.12, y + 0.1, w - 0.24, 0.4, '1F2A3A', null);
  label(s, x + 0.12, y + 0.1, w - 0.24, reading, { size: 13, bold: true, color: '7CFC9A', h: 0.4 });
  label(s, x, y + 0.53, w, 'pH meter', { size: 10, h: 0.22, color: C.grey });
  line(s, x + w, y + 0.4, pxp, py0, '4A5568', 1.25);
  box(s, pxp - 0.05, py0, 0.1, py1 - py0, 'D9DEE6', '4A5568', { lw: 1 });
  ball(s, pxp, py1, 0.07, 'F2F2F2', '4A5568', 1);
}
function tripodBunsen(s, cx, y, yb, o = {}) {
  const hw = o.hw || 0.6;
  box(s, cx - hw - 0.05, y, 2 * hw + 0.1, 0.05, '9AA3B0', '5A6275', { lw: 0.75 });
  line(s, cx - hw + 0.05, y + 0.05, cx - hw - 0.05, yb, '5A6275', 2); line(s, cx + hw - 0.05, y + 0.05, cx + hw + 0.05, yb, '5A6275', 2);
  box(s, cx - 0.25, yb - 0.08, 0.5, 0.08, '5A6275', '3A4255');
  const th = Math.max(0.3, (yb - y) * 0.42);
  box(s, cx - 0.06, yb - th, 0.12, th - 0.08, '8C96A8', '5A6275', { lw: 0.75 });
  const fh = Math.min(0.45, yb - th - y - 0.08);
  if (fh > 0.05) {
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.11, y: yb - th - fh, w: 0.22, h: fh, fill: { color: '5B8DEF' }, line: { color: '2F5FBF', width: 0.75 } });
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.05, y: yb - th - fh * 0.6, w: 0.1, h: fh * 0.6, fill: { color: 'BFD4FB' }, line: { type: 'none' } });
  }
}
function balance(s, x, y, reading) {
  box(s, x, y, 1.35, 0.55, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, x + 0.1, y + 0.13, 1.15, 0.29, '1F2A3A', null);
  label(s, x + 0.1, y + 0.13, 1.15, reading, { size: 11, bold: true, color: '7CFC9A', h: 0.29 });
  box(s, x + 0.15, y - 0.12, 1.05, 0.11, '9AA3B0', '4A5568', { lw: 0.75 });
}
function spatula(s, x1, y1, x2, y2, powder) {
  line(s, x1, y1, x2, y2, '6B7385', 3);
  oval(s, x2, y2, 0.26, 0.11, 'B8BEC9', '6B7385', { lw: 0.75 });
  if (powder) oval(s, x2, y2 - 0.04, 0.2, 0.08, powder[0], powder[1], { lw: 0.5 });
}
// burette: centre cx, top yTop, tube length len; level = reading (cm³); scale 0 at top
function burette(s, cx, yTop, len, o = {}) {
  const w = o.w || 0.2, y0 = yTop + 0.15, y50 = yTop + len - 0.2, yv = v => y0 + (y50 - y0) * v / 50;
  box(s, cx - w / 2, yTop, w, len, GLASS, null);
  const ly = yv(o.level || 0);
  box(s, cx - w / 2, ly, w, yTop + len - ly, o.liquid || ACIDC, null);
  for (let v = 0; v <= 50; v += 5) {
    const maj = v % 10 === 0;
    line(s, cx - w / 2, yv(v), cx - w / 2 + (maj ? 0.1 : 0.06), yv(v), C.ink, 0.6);
    if (maj && o.numbers) label(s, cx - w / 2 - 0.4, yv(v) - 0.1, 0.36, String(v), { size: 10, h: 0.2, align: 'right', color: C.grey });
  }
  line(s, cx - w / 2, yTop, cx - w / 2, yTop + len, C.ink, 1.25); line(s, cx + w / 2, yTop, cx + w / 2, yTop + len, C.ink, 1.25);
  const yt = yTop + len;
  box(s, cx - 0.05, yt, 0.1, 0.16, o.liquid || ACIDC, C.ink, { lw: 1 });
  box(s, cx - 0.17, yt + 0.04, 0.34, 0.08, '4A5568', '2A2F3A', { lw: 0.75 });
  poly(s, [[cx - 0.05, yt + 0.16], [cx + 0.05, yt + 0.16], [cx + 0.02, yt + 0.38], [cx - 0.02, yt + 0.38]], o.liquid || ACIDC, C.ink, { lw: 1 });
  return { yTap: yt + 0.08, yJet: yt + 0.38, yv };
}
function pipette(s, cx, yTop, len) {
  const sw = 0.07, bulbH = len * 0.28, bulbW = 0.28, yb0 = yTop + len * 0.38, yb1 = yb0 + bulbH;
  box(s, cx - sw / 2, yTop, sw, yb0 - yTop + 0.03, GLASS, C.ink, { lw: 1 });
  oval(s, cx, (yb0 + yb1) / 2, bulbW, bulbH, GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - sw / 2, yb1 - 0.03], [cx + sw / 2, yb1 - 0.03], [cx + 0.015, yTop + len], [cx - 0.015, yTop + len]], GLASS, C.ink, { lw: 1 });
  line(s, cx - 0.09, yTop + len * 0.14, cx + 0.09, yTop + len * 0.14, C.red, 1.5);
}
function meniscus(s, x0, x1, yEdge, yBot, yEnd, col) {
  const pts = [];
  for (let i = 0; i <= 16; i++) { const t = i / 16, x = x0 + (x1 - x0) * t; pts.push([x, yBot - (yBot - yEdge) * Math.pow(2 * t - 1, 2)]); }
  poly(s, [...pts, [x1, yEnd], [x0, yEnd]], col, null);
  poly(s, pts, null, '3A6EA5', { open: true, lw: 1.5 });
}
// titration rig: clamp stand + burette over conical flask on a white tile
function rig(s, x, yBase, o = {}) {
  const bx = x + 1.15, len = o.len || 2.9, yTop = yBase - len - 1.55;
  box(s, x - 0.35, yBase - 0.12, 1.75, 0.12, '5A6275', '4A5262');
  box(s, x - 0.04, yTop - 0.15, 0.08, yBase - yTop + 0.03, '8C96A8', '6B7385');
  box(s, x, yTop + 0.45, bx - x - 0.1, 0.06, '8C96A8', '6B7385');
  box(s, bx - 0.16, yTop + 0.38, 0.32, 0.2, '4A5262', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
  const b = burette(s, bx, yTop, len, { level: o.level || 0, numbers: o.numbers });
  box(s, bx - 0.65, yBase - 0.22, 1.3, 0.1, C.white, '9AA3B0', { lw: 1 });
  conical(s, bx, yBase - 0.22 - 1.05, 1.0, 1.05, 0.42, o.flask || PINK[0]);
  return { bx, yTop, len, b };
}
// d.c. supply box with − (left) and + (right) terminals; returns terminal points
function dcSupply(s, cx, cy, w = 1.6) {
  box(s, cx - w / 2, cy - 0.3, w, 0.6, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, cx - w / 2, cy - 0.3, w, 'd.c. supply', { size: 10.5, bold: true, h: 0.6 });
  const tl = [cx - w / 2 - 0.12, cy], tr = [cx + w / 2 + 0.12, cy];
  ball(s, tl[0], tl[1], 0.1, '2A2F3A', '2A2F3A'); label(s, tl[0] - 0.1, tl[1] - 0.12, 0.2, '−', { size: 12, bold: true, color: C.white, h: 0.22 });
  ball(s, tr[0], tr[1], 0.1, C.red, C.red); label(s, tr[0] - 0.1, tr[1] - 0.12, 0.2, '+', { size: 12, bold: true, color: C.white, h: 0.22 });
  return { tl, tr };
}
// electrolysis cell: beaker top-left (x, y) size w×h; cathode (−) on the LEFT, anode (+) on the RIGHT
function eCell(s, x, y, w, h, o = {}) {
  beaker(s, x, y, w, h, o.level || 0.78, o.liq || CUSO4[0], { surface: o.surf || CUSO4[1] });
  const xC = x + w * 0.27, xA = x + w * 0.73, eTop = y - (o.above || 0.35), eBot = y + h - (o.gap || 0.3);
  const ew = o.ew || 0.16;
  const cc = o.cathode || GRAPH, ac = o.anode || GRAPH;
  box(s, xC - (o.cw || ew) / 2, eTop, o.cw || ew, eBot - eTop, cc[0], cc[1], { lw: 1 });
  box(s, xA - (o.aw || ew) / 2, eTop, o.aw || ew, eBot - eTop, ac[0], ac[1], { lw: 1 });
  const ySup = o.ySup != null ? o.ySup : y - 0.95;
  const T2 = dcSupply(s, (xC + xA) / 2, ySup, Math.min(1.6, xA - xC - 0.5));
  wire(s, [[xC, eTop], [xC, ySup], [T2.tl[0] - 0.1, ySup]], C.ink, 1.5);
  wire(s, [[xA, eTop], [xA, ySup], [T2.tr[0] + 0.1, ySup]], C.ink, 1.5);
  if (o.labels !== false) {
    const cwh = (o.cw || ew) / 2, awh = (o.aw || ew) / 2;
    label(s, xC - cwh - 1.4, y - (o.cNote ? 0.6 : 0.36), 1.32, '**cathode (−)**', { size: 10.5, align: 'right', color: '2A2F3A' });
    label(s, xA + awh + 0.08, y - (o.aNote ? 0.6 : 0.36), 1.32, '**anode (+)**', { size: 10.5, align: 'left', color: C.red });
    if (o.cNote) label(s, xC - cwh - 1.75, y - 0.36, 1.67, o.cNote, { size: 10, align: 'right', h: 0.24 });
    if (o.aNote) label(s, xA + awh + 0.08, y - 0.36, 1.67, o.aNote, { size: 10, align: 'left', h: 0.24 });
  }
  return { xC, xA, eTop, eBot, ySurf: y + h * (1 - (o.level || 0.78)), yb: y + h };
}
const HT_FILL = 'FBE3E4';
// equation as runs, with chosen terms struck through (spectator ions) — text from the same eq() data


// ======================= T1 drawing helpers =======================
const NUC = { p: ['F28B82', 'B3261E'], n: ['C9CDD3', '5A6275'] };
const eDot = (s, x, y, col = C.ink) => ball(s, x, y, 0.05, col, col, 0.5);
const eX = (s, x, y, col = C.red) => { const d = 0.048; line(s, x - d, y - d, x + d, y + d, col, 1.6); line(s, x - d, y + d, x + d, y - d, col, 1.6); };
const mark = (s, m, x, y) => (m === 'x' ? eX(s, x, y) : eDot(s, x, y, m === 'o' ? '1F5F99' : C.ink));
// shell diagram: config e.g. [2,8,1]; marks: 'o' dots or 'x' crosses; o.lastCross = n outer electrons shown as crosses
function shellAtom(s, cx, cy, config, sym, o = {}) {
  const r0 = o.r0 || 0.24, dr = o.dr || 0.16, m = o.mark || 'o';
  config.forEach((n, k) => {
    const r = r0 + dr * (k + 1);
    oval(s, cx, cy, 2 * r, 2 * r, null, '8A8F99', { lw: 1 });
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (n <= 2 ? i * Math.PI : 2 * Math.PI * i / n);
      const isX = k === config.length - 1 && i >= n - (o.lastCross || 0);
      mark(s, isX ? 'x' : m, cx + r * Math.cos(a), cy + r * Math.sin(a));
    }
  });
  ball(s, cx, cy, r0 - 0.03, o.nucFill || 'F7E3B5', o.nucEdge || 'A88B3A', 1);
  label(s, cx - 0.4, cy - 0.15, 0.8, `**${sym}**`, { size: o.size || 11, h: 0.3, color: C.ink });
}
// big nuclear-notation symbol, mass number top-left, atomic number bottom-left
function nucSym(s, x, y, A, Z, sym, o = {}) {
  const sz = o.size || 30;
  label(s, x, y, 0.55, String(A), { size: sz * 0.45, h: 0.32, align: 'right', color: o.color || C.blue, bold: true });
  label(s, x, y + sz / 72 * 0.95 - 0.05, 0.55, String(Z), { size: sz * 0.45, h: 0.32, align: 'right', color: o.zcolor || C.red, bold: true });
  label(s, x + 0.57, y + 0.05, 1.2, `**${sym}**`, { size: sz, h: sz / 72 * 1.3, align: 'left', color: C.ink });
}
// nucleus cluster of p and n balls
function nucleus(s, cx, cy, np, nn, r = 0.1) {
  const tot = np + nn, pts = [];
  for (let i = 0; i < tot; i++) { const a = i * 2.39996, rr = r * 1.05 * Math.sqrt(i); pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]); }
  pts.forEach(([x, y], i) => { const t = i % 2 === 0 && Math.floor(i / 2) < np ? 'p' : (i % 2 === 1 && Math.floor(i / 2) < nn ? 'n' : (np > nn ? 'p' : 'n')); ball(s, x, y, r, NUC[t][0], NUC[t][1], 0.75); });
}
// covalent dot-and-cross with overlapping outer shells
function covMol(s, atoms, bonds, o = {}) {
  atoms.forEach(a => { oval(s, a.x, a.y, 2 * a.r, 2 * a.r, a.fill || null, '6A6F7A', { lw: 1.25, tr: 70 }); });
  bonds.forEach(({ a, b, n }) => {
    const A = atoms[a], B = atoms[b], dx = B.x - A.x, dy = B.y - A.y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d, vx = -uy, vy = ux;
    const t = (d + A.r - B.r) / 2, mx = A.x + ux * t, my = A.y + uy * t;
    for (let k = 0; k < n; k++) {
      const off = (k - (n - 1) / 2) * 0.17;
      mark(s, A.m, mx - ux * 0.055 + vx * off, my - uy * 0.055 + vy * off);
      mark(s, B.m, mx + ux * 0.055 + vx * off, my + uy * 0.055 + vy * off);
    }
  });
  atoms.forEach(a => {
    (a.lone || []).forEach(deg => [-11, 11].forEach(dd => { const th = (deg + dd) * Math.PI / 180; mark(s, a.m, a.x + a.r * 0.78 * Math.cos(th), a.y + a.r * 0.78 * Math.sin(th)); }));
    label(s, a.x - 0.3, a.y - 0.13, 0.6, `**${a.sym}**`, { size: o.size || 11, h: 0.26, color: C.ink });
  });
}
function bracket(s, x, y, w, h, charge, col = C.ink) {
  line(s, x + 0.08, y, x, y, col, 1.5); line(s, x, y, x, y + h, col, 1.5); line(s, x, y + h, x + 0.08, y + h, col, 1.5);
  line(s, x + w - 0.08, y, x + w, y, col, 1.5); line(s, x + w, y, x + w, y + h, col, 1.5); line(s, x + w, y + h, x + w - 0.08, y + h, col, 1.5);
  label(s, x + w + 0.02, y - 0.12, 0.5, `**${charge}**`, { size: 13, h: 0.3, align: 'left', color: col });
}
function hexRow(s, x0, y0, nx, a, col = '3A3F4A', o = {}) {
  const w = Math.sqrt(3) * a;
  for (let i = 0; i < nx; i++) {
    const cx = x0 + i * w, pts = [];
    for (let k = 0; k < 6; k++) { const th = (30 + 60 * k) * Math.PI / 180; pts.push([cx + a * Math.cos(th), y0 + a * Math.sin(th)]); }
    for (let k = 0; k < 6; k++) line(s, pts[k][0], pts[k][1], pts[(k + 1) % 6][0], pts[(k + 1) % 6][1], col, o.lw || 1.5);
    pts.forEach(([x, y]) => ball(s, x, y, o.ar || 0.055, o.atom || '4A4F5A', '2A2F3A', 0.5));
  }
}
function plusIon(s, x, y, r, t = '+', fill = 'F7E08A', edge = '9A7A1A') { ball(s, x, y, r, fill, edge, 1); label(s, x - r, y - r, 2 * r, `**${t}**`, { size: 11, h: 2 * r, color: C.ink }); }
// small periodic table (first 20 elements)
const PT = [['H', 1, 1, 1], ['He', 2, 8, 1], ['Li', 3, 1, 2], ['Be', 4, 2, 2], ['B', 5, 3, 2], ['C', 6, 4, 2], ['N', 7, 5, 2], ['O', 8, 6, 2], ['F', 9, 7, 2], ['Ne', 10, 8, 2],
  ['Na', 11, 1, 3], ['Mg', 12, 2, 3], ['Al', 13, 3, 3], ['Si', 14, 4, 3], ['P', 15, 5, 3], ['S', 16, 6, 3], ['Cl', 17, 7, 3], ['Ar', 18, 8, 3], ['K', 19, 1, 4], ['Ca', 20, 2, 4]];
const METALS = ['Li', 'Be', 'Na', 'Mg', 'Al', 'K', 'Ca'];
function miniPT(s, x0, y0, cw, ch, o = {}) {
  ['1', '2', '3', '4', '5', '6', '7', '0'].forEach((g, i) => label(s, x0 + i * cw, y0 - 0.3, cw, `**${g}**`, { size: 10, h: 0.26, color: C.grey }));
  [1, 2, 3, 4].forEach(p => label(s, x0 - 0.42, y0 + (p - 1) * ch, 0.36, `**${p}**`, { size: 10, h: ch, color: C.grey, align: 'right' }));
  PT.forEach(([sym, Z, g, p]) => {
    const x = x0 + (g - 1) * cw, y = y0 + (p - 1) * ch, met = METALS.includes(sym), hl = o.highlight && o.highlight.includes(sym);
    box(s, x, y, cw - 0.04, ch - 0.04, hl ? C.cream : (met ? 'DCE8F7' : 'EFE6FA'), hl ? C.orange : (met ? '7A9CC9' : 'A58BD1'), { lw: hl ? 2 : 0.75 });
    label(s, x, y + 0.02, cw - 0.06, String(Z), { size: 8, h: 0.18, align: 'left', color: C.grey });
    label(s, x, y + 0.13, cw - 0.04, `**${sym}**`, { size: o.size || 13, h: ch - 0.2, color: C.ink });
  });
  // metal / non-metal staircase
  const X = g => x0 + (g - 1) * cw - 0.02, Y = p => y0 + (p - 1) * ch - 0.02;
  [[X(3), Y(2), X(3), Y(3)], [X(3), Y(3), X(4), Y(3)], [X(4), Y(3), X(4), Y(4)]].forEach(([a, b, c2, d]) => line(s, a, b, c2, d, C.red, 3));
}



// ======================= T6 helpers =======================
function eqLine(s, x, y, w, key, o = {}) { eqn(s, x, y, w, EQ[key], Object.assign({ size: 11.5 }, o)); }
const HALC = { Cl: ['D8EFA0', '7A9A2A'], Br: ['E8A070', '9A4A1A'], I: ['8A6A9A', '4A2A5A'] };
function trough(s, x, y, w, h) { box(s, x, y, w, h, 'E3F0FA', '5B9BD5', { lw: 1.25 }); line(s, x, y + 0.25, x + w, y + 0.25, '5B9BD5', 1); }

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Groups in the table',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • group 1, group 7 and group 0 • Paper 2` },
    { icon: 'H', text: 'Higher & Foundation in one deck • halogen displacement as redox is HT' },
    { icon: '6', text: 'Topic 6 • same content in Combined Science • every equation checked' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 6 Groups in the periodic table (Paper 2). Higher-only (HT pill): 6.12 displacement reactions of halogens as redox in terms of electrons (medium confidence). Chemistry-only: none believed (shared with 1SC0). No Core Practical. Statement numbers reconstructed: see SPEC_T6.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '6.1', text: 'Classify elements as **alkali metals**, **halogens** or **noble gases** from their position.' },
  { code: '6.2–6.3', text: 'Describe the **properties** of the alkali metals and their **reactions with water**.' },
  { code: '6.4–6.5', text: 'Describe and **explain** the **reactivity trend** in group 1; predict for Rb and Cs.' },
  { code: '6.6–6.8', text: 'Recall halogen **colours and states**; describe **trends**; **test for chlorine**.' },
  { code: '6.9–6.10', text: 'Describe halogen reactions with **metals** and **hydrogen**.' },
  { code: '6.11, 6.13', text: 'Describe and explain halogen **displacement** reactions and the reactivity trend.' },
  { code: '6.12', text: 'Explain halogen displacement as **redox**.', ht: true },
  { code: '6.14–6.16', text: 'Explain why **noble gases** are inert; their **uses** and **trends**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = 6.12 (Higher only, medium confidence).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 6 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['6.1', 'Groups 1, 7 and 0', 'BOTH COURSES', C.blue],
    ['6.2–6.5', 'Alkali metals: properties, water, trend', 'BOTH COURSES', C.blue],
    ['6.6–6.10', 'Halogens: properties, test, reactions', 'BOTH COURSES', C.blue],
    ['6.11, 6.13', 'Halogen displacement and trend', 'BOTH COURSES', C.blue],
    ['6.12', 'Displacement as redox', 'HIGHER ONLY', C.red],
    ['6.14–6.15', 'Noble gases: inertness and uses', 'BOTH COURSES', C.blue],
    ['6.16', 'Noble gas trends and predictions', 'BOTH COURSES', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 6\nGroups', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 electronic configuration and ions • Topic 4 redox • Topic 3 half equations', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1CH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 6–9.',
      'Combined Science 1SC0 tests the **same** Topic 6 statements.',
      'Expect **prediction** questions: use a trend to predict an unfamiliar element.',
      'No Core Practical in Topic 6.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**HT** pill: halogen displacement as electron transfer (ionic and half equations).',
      '**No chemistry-only** statements believed in Topic 6.',
      'Trends are explained with **electronic configurations** for both tiers.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'HT: 6.12 (medium confidence). Chemistry-only: none (medium). Numbering reconstructed: see SPEC_T6.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • configuration', q: 'Write the electronic configurations of **sodium** and **chlorine**.' },
  { from: 'Topic 1 • ions', q: 'What ions do sodium and chlorine form? Why?' },
  { from: 'Topic 1 • periodic table', q: 'What does the **group number** tell you about an atom?' },
  { from: 'Topic 3 • acids', q: 'Which ion makes a solution **alkaline**?' },
  { from: 'Topic 3 • gas tests', q: 'Describe the test for **hydrogen**.' },
  { from: 'Topic 4 • redox (HT)', q: 'Define **oxidation** in terms of electrons.' },
], { subtitle: 'Recall from Topics 1, 3 and 4 • 6 minutes • no notes', notes: 'ANSWERS\n1. Na 2.8.1; Cl 2.8.7.\n2. Na⁺ (loses 1 electron) and Cl⁻ (gains 1 electron); both get a full outer shell.\n3. The number of electrons in the outer shell.\n4. OH⁻ (hydroxide).\n5. A lighted splint gives a squeaky pop.\n6. Loss of electrons.' }), 'Retrieval starter');

// ======================= 5 THREE GROUPS =======================
reg(D.contentSlide({
  title: 'Groups 1, 7 and 0',
  subtitle: 'Specification 6.1 • the group number is the number of outer electrons',
  tag: '6.1', caption: 'first 20 elements; group 1, group 7 and group 0 highlighted',
  draw: (s, p) => {
    miniPT(s, 1.0, 1.85, 0.66, 0.78, { highlight: ['Li', 'Na', 'K', 'F', 'Cl', 'He', 'Ne', 'Ar'] });
    label(s, 0.6, 5.15, 5.8, '**group 1**: 1 outer electron   **group 7**: 7   **group 0**: full outer shell', { size: 11, h: 0.5 });
  },
  head: 'Key ideas',
  lines: [
    '**Group 1: alkali metals** (Li, Na, K…). One outer electron; react with water to make **alkaline** solutions.',
    '**Group 7: halogens** (F, Cl, Br, I…). Seven outer electrons; non-metals made of **diatomic molecules** (Cl₂).',
    '**Group 0: noble gases** (He, Ne, Ar…). **Full outer shell**; very unreactive (inert).',
    'Elements in the same group have the **same number of outer electrons**, so they react in similar ways.',
  ],
  worked: { head: 'Classify', q: 'Element X has the configuration 2.8.8.1. Which group?',
    steps: [['Outer shell', '1 electron'], ['Answer', 'group 1: an alkali metal (potassium)']], size: 11 },
  workedH: 1.5,
  qc: 'Element Y is 2.8.8. Which group is it in, and how reactive would you expect it to be?',
  notes: 'QUICK CHECK ANSWER: group 0 / noble gas (argon) (1); very unreactive / inert because it has a full outer shell (1).\nSpec 6.1. Configurations checked.',
}), '6.1 Groups 1, 7 and 0');

// ======================= 6 ALKALI METALS AND WATER =======================
reg(D.contentSlide({
  title: 'Alkali metals and water',
  subtitle: 'Specification 6.2–6.3 • soft metals with low melting points',
  tag: '6.2–6.3', caption: 'a small piece of each metal in a trough of water (teacher demonstration)',
  draw: (s, p) => {
    AM.forEach(([m, , mp, obs], i) => {
      const y = 1.55 + i * 1.3;
      trough(s, 0.75, y + 0.3, 2.3, 0.8);
      ball(s, 1.9, y + 0.48, 0.12 + i * 0.02, i === 2 ? 'C9CDD3' : 'D7DCE3', '6B7385', 1);
      if (i === 2) { oval(s, 1.9, y + 0.25, 0.4, 0.35, 'C8A2E8', null, { tr: 30 }); }
      bubbles(s, [[1.6, y + 0.55], [2.2, y + 0.6], [1.75, y + 0.7], [2.05, y + 0.52]].slice(0, 2 + i));
      label(s, 3.2, y + 0.25, 0.7, `**${m}**`, { size: 14, h: 0.4, align: 'left' });
      label(s, 3.75, y + 0.15, 2.65, obs, { size: 10, h: 0.6, align: 'left' });
      label(s, 3.75, y + 0.75, 2.65, `melting point ${mp} °C`, { size: 9.5, h: 0.26, align: 'left', color: C.grey });
    });
  },
  head: 'Key ideas',
  lines: [
    'Alkali metals are **soft** (cut with a knife) and have **low melting points** for metals. Shiny when freshly cut, then tarnish.',
    'They react with **water** to form a **metal hydroxide** (an alkali) and **hydrogen**.',
    'metal + water → metal hydroxide + hydrogen',
    '**Safety:** tiny pieces, safety screen, eye protection; stored under **oil**.',
  ],
  worked: { head: 'Equation', q: 'Write the balanced equation for sodium with water.',
    steps: [['Equation', EQ['Na+H2O']], ['Evidence', 'fizzing (H₂); universal indicator turns purple (NaOH)']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why are alkali metals stored under **oil**?',
  notes: `QUICK CHECK ANSWER: to stop them reacting with oxygen and water vapour in the air (1).\nEquations checked: ${EQ['Li+H2O']}; ${EQ['K+H2O']}. Melting points are data-book values (Li 181, Na 98, K 63 °C) and are asserted to fall down the group.\nSpec 6.2–6.3.`,
}), '6.2–6.3 Alkali metals and water');

// ======================= 7 GROUP 1 TREND =======================
reg(D.contentSlide({
  title: 'Explaining the group 1 trend',
  subtitle: 'Specification 6.4–6.5 • reactivity increases down the group',
  tag: '6.4–6.5', caption: 'the outer electron is further from the nucleus in larger atoms',
  draw: (s, p) => {
    [['Li', 1.2, 2.8], ['Na', 3.05, 2.8], ['K', 5.25, 2.8]].forEach(([e, x, y]) => {
      shellAtom(s, x, y, CONF6[e], e, { r0: 0.2, dr: 0.17, lastCross: 1 });
      label(s, x - 0.9, 3.85, 1.8, `**${CONF6[e].join('.')}**`, { size: 12, h: 0.3, color: C.blue });
    });
    arrow(s, 0.8, 4.4, 6.2, 4.4, C.red, 2.5);
    label(s, 0.8, 4.5, 5.4, 'more shells → outer electron further away and more shielded → lost **more easily**', { size: 10.5, h: 0.5, color: C.red });
    label(s, 0.6, 5.1, 5.8, 'predict: **rubidium** and **caesium** react even more violently (explosively)', { size: 10.5, h: 0.4 });
  },
  head: 'Why reactivity increases',
  lines: [
    'All group 1 atoms **lose one electron** to form a **1+ ion** when they react.',
    'Going down the group, atoms have **more shells**: the outer electron is **further from the nucleus** and **more shielded** by inner electrons.',
    'So the attraction to the nucleus is **weaker** and the outer electron is **lost more easily**: more reactive.',
  ],
  worked: { head: 'Predict', q: 'Rubidium is below potassium. Predict its reaction with water.',
    steps: [['Trend', 'reactivity increases down group 1'], ['Equation', EQ['Rb+H2O']], ['Answer', 'faster than potassium; may explode']], size: 10.5 },
  workedH: 1.75,
  qc: 'Explain why potassium is **more reactive** than sodium.',
  notes: `QUICK CHECK ANSWER: potassium's outer electron is further from the nucleus / more shells / more shielding (1); weaker attraction so it is lost more easily (1).\n${EQ['Na ox']}. Spec 6.4–6.5.`,
}), '6.4–6.5 Group 1 trend');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 6.1–6.5 • alkali metals', [
  { q: 'Give **two** physical properties of the alkali metals.', marks: 2, ms: 'Any two: soft; low melting points; low density; shiny when cut (1 each).' },
  { q: 'Give **two** observations when potassium is added to water.', marks: 2, ms: 'Any two: fizzes / bubbles; lilac flame; moves around; melts; disappears (1 each).' },
  { q: 'Write the balanced equation for lithium with water, with state symbols.', marks: 2, ms: `${EQ['Li+H2O']}: formulae and balancing (1); state symbols (1).` },
  { q: 'Explain why caesium is more reactive than sodium.', marks: 2, ms: 'Outer electron further from nucleus / more shells / more shielding (1); lost more easily (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 HALOGEN PROPERTIES =======================
reg(D.contentSlide({
  title: 'The halogens: physical properties',
  subtitle: 'Specification 6.6–6.7 • colours, states and the trend down group 7',
  tag: '6.6–6.7', caption: 'boiling points of the halogens (data-book values)',
  draw: (s, p) => {
    const g = { x: 1.4, y: 1.55, w: 4.7, h: 2.4, xmin: 0.5, xmax: 4.5, xstep: 1, ymin: -200, ymax: 200, ystep: 100, xlabel: '', ylabel: 'boiling point (°C)', grid: true, fmt: () => '', yfmt: v => String(v).replace('-', '−') };
    axes(s, g);
    const pts = HAL.map(([, , , bp], i) => [i + 1, bp]);
    plotLine(s, g, pts, '7B4FB8', 2); points(s, g, pts, '7B4FB8');
    HAL.forEach(([f], i) => label(s, px(g, i + 1) - 0.4, py(g, -200) + 0.05, 0.8, `**${f}**`, { size: 11, h: 0.28 }));
    const rows = [[HDR('Halogen'), HDR('Colour'), HDR('State at 25 °C')], ...HAL.slice(1).map(([f, c2, st], i) => [tcell(f, i, { bold: true }), tcell(c2, i), tcell(st, i)])];
    s.addTable(rows, { x: 0.65, y: 4.4, w: 5.75, colW: [1.2, 2.85, 1.7], rowH: 0.32, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Key ideas',
  lines: [
    'Halogens exist as **diatomic molecules**: F₂, Cl₂, Br₂, I₂.',
    'Going **down** the group: colour gets **darker**, **melting and boiling points increase** (gas → liquid → solid).',
    'This is because the molecules get **bigger**, so the **forces between molecules** get stronger.',
    'Predict **astatine**: a **black solid** with a higher boiling point than iodine.',
  ],
  worked: { head: 'Predict', q: 'Fluorine is above chlorine. Predict its state and colour.',
    steps: [['Trend', 'lower bp and paler going up'], ['Answer', 'a pale (yellow) gas']], size: 11 },
  workedH: 1.5,
  qc: 'Give the **colour** and **state** of bromine at room temperature.',
  notes: 'QUICK CHECK ANSWER: red-brown (1); liquid (1).\nBoiling points (data book): F₂ −188, Cl₂ −34, Br₂ 59, I₂ 184 °C; asserted to rise down the group. States at 25 °C checked. Spec 6.6–6.7.',
}), '6.6–6.7 Halogen properties');

// ======================= 10 HALOGEN REACTIONS =======================
reg(D.contentSlide({
  title: 'Halogen reactions and the test for chlorine',
  subtitle: 'Specification 6.8–6.10 • metal halides, hydrogen halides, damp litmus',
  tag: '6.8–6.10', caption: 'test for chlorine: damp blue litmus paper turns red, then white (bleached)',
  draw: (s, p) => {
    box(s, 1.22, 2.0, 0.56, 1.45, 'E8F5C8', null);
    tube(s, 1.2, 1.95, 0.6, 1.75, 0.0, 'FFFFFF');
    box(s, 1.22, 2.0, 0.56, 1.3, 'E8F5C8', null);
    [['8EC9F0', 'blue'], ['F28B82', 'red'], ['FFFFFF', 'white']].forEach(([col, t], i) => {
      const x = 2.6 + i * 1.25;
      box(s, x, 2.0, 0.55, 1.1, col, '6B7385', { lw: 1 });
      label(s, x - 0.3, 3.15, 1.15, t, { size: 10, h: 0.26 });
      if (i < 2) arrow(s, x + 0.6, 2.55, x + 1.2, 2.55, C.ink, 1.5);
    });
    label(s, 0.55, 1.5, 2.0, 'chlorine gas', { size: 10.5, h: 0.3, color: '7A9A2A', bold: true });
    eqLine(s, 0.7, 4.0, 5.7, 'Na+Cl2'); eqLine(s, 0.7, 4.5, 5.7, 'H2+Cl2'); eqLine(s, 0.7, 5.0, 5.7, 'HCl aq');
  },
  head: 'Key ideas',
  lines: [
    '**Test for chlorine:** damp **blue litmus** turns **red** then is **bleached white**.',
    'Halogens react with **metals** to form **metal halides** (ionic salts): sodium + chlorine → sodium chloride.',
    'Halogens react with **hydrogen** to form **hydrogen halides** (HCl, HBr, HI). These **dissolve in water** to form **acidic** solutions (hydrochloric acid).',
    'Reactions get **less vigorous** down the group.',
  ],
  worked: { head: 'Predict', q: 'Write the equation for potassium reacting with bromine.',
    steps: [['Pattern', 'metal + halogen → metal halide'], ['Equation', EQ['K+Br2']]], size: 10.5 },
  workedH: 1.5,
  qc: 'Iron wool reacts with chlorine to form iron(III) chloride. Write the balanced equation.',
  notes: `QUICK CHECK ANSWER: ${EQ['Fe+Cl2']} (formulae 1; balancing 1).\nAlso: ${EQ['H2+Br2']}; ${EQ['Na+I2']}. All checked. Spec 6.8–6.10.`,
}), '6.8–6.10 Halogen reactions');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 6.6–6.10 • halogens', [
  { q: 'Describe the trend in boiling points down group 7.', marks: 1, ms: 'Boiling points increase down the group (1).' },
  { q: 'Predict the state of **astatine** at room temperature. Explain your prediction.', marks: 2, ms: 'Solid (1); boiling/melting points increase down the group and iodine is already a solid (1).' },
  { q: 'Describe the test for chlorine and its result.', marks: 2, ms: 'Damp blue litmus paper (1); turns red then white / is bleached (1).' },
  { q: 'Hydrogen chloride dissolves in water. What type of solution forms?', marks: 1, ms: 'Acidic (hydrochloric acid) (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 HALOGEN DISPLACEMENT =======================
reg(D.contentSlide({
  title: 'Halogen displacement reactions',
  subtitle: 'Specification 6.11 • a more reactive halogen displaces a less reactive halide',
  tag: '6.11', caption: 'halogen solutions added to potassium halide solutions',
  draw: (s, p) => {
    const rows = [[HDR('Halogen ↓  /  solution →'), ...HORDER.map(x => HDR(`K${x === 'Cl' ? 'Cl' : x === 'Br' ? 'Br' : 'I'}`))],
      ...HORDER.map((h, i) => [tcell(`${h}₂ water`, i, { bold: true }), ...HGRID[i].map((v, j) => tcell(v === null ? '—' : (v ? (HORDER[j] === 'Br' ? '✓ orange' : '✓ brown') : '✗'), i, { align: 'center', bold: true, color: v ? C.green : (v === null ? C.grey : C.red) }))])];
    s.addTable(rows, { x: 0.65, y: 1.55, w: 5.75, colW: [1.85, 1.3, 1.3, 1.3], rowH: 0.5, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    eqLine(s, 0.65, 3.75, 5.75, 'Cl2+KBr'); eqLine(s, 0.65, 4.25, 5.75, 'Br2+KI');
    label(s, 0.65, 4.8, 5.75, 'reactivity: **Cl₂ > Br₂ > I₂**  → predict: astatine displaces **none** of them', { size: 11, h: 0.5 });
  },
  head: 'Key ideas',
  lines: [
    'A **more reactive** halogen **displaces** a less reactive halogen from a solution of its halide (salt).',
    'Chlorine displaces bromine and iodine; bromine displaces iodine; iodine displaces neither.',
    'Signs: the solution changes colour: **orange** (bromine formed) or **brown** (iodine formed).',
    'So reactivity **decreases** down group 7.',
  ],
  worked: { head: 'Predict', q: 'Would iodine water react with potassium chloride solution?',
    steps: [['Compare', 'iodine is less reactive than chlorine'], ['Answer', 'no reaction: no colour change']], size: 11 },
  workedH: 1.5,
  qc: 'Chlorine water is added to potassium iodide solution. Describe what you see and name the products.',
  notes: `QUICK CHECK ANSWER: colourless solution turns brown (1); iodine and potassium chloride form (1). Ionic: ${EQ['Cl2+I ionic']}.\nGrid generated from the reactivity order and checked (3 reactions). Spec 6.11.`,
}), '6.11 Halogen displacement');

// ======================= 13 DISPLACEMENT AS REDOX (HT) =======================
reg(D.contentSlide({
  title: 'Halogen displacement as redox',
  subtitle: 'Specification 6.12 • which species is oxidised and which is reduced?', ht: true,
  tag: '6.12', caption: 'chlorine takes electrons from bromide ions; K⁺ ions are spectators',
  draw: (s, p) => {
    ['Cl₂', 'Br⁻', 'Br⁻'].forEach((t, i) => {
      const x = i === 0 ? 1.4 : 3.6 + (i - 1) * 1.2, y = 2.5;
      if (i === 0) { ball(s, x - 0.17, y, 0.24, HALC.Cl[0], HALC.Cl[1], 1); ball(s, x + 0.17, y, 0.24, HALC.Cl[0], HALC.Cl[1], 1); label(s, x - 0.5, y - 0.15, 1.0, '**Cl₂**', { size: 11, h: 0.3 }); }
      else { ball(s, x, y, 0.3, HALC.Br[0], HALC.Br[1], 1); label(s, x - 0.4, y - 0.15, 0.8, '**Br⁻**', { size: 11, h: 0.3 }); }
    });
    arrow(s, 3.25, 2.1, 1.9, 2.1, '1F5F99', 2); label(s, 2.0, 1.7, 1.3, '2e⁻', { size: 12, h: 0.3, color: '1F5F99', bold: true });
    eqLine(s, 0.65, 3.35, 5.75, 'Cl2+Br ionic', { size: 12.5 });
    label(s, 0.65, 3.95, 5.75, `**reduction:** ${EQ['Cl red']}`, { size: 12, h: 0.35, color: '1F5F99' });
    label(s, 0.65, 4.35, 5.75, `**oxidation:** ${EQ['Br ox']}`, { size: 12, h: 0.35, color: C.red });
    label(s, 0.65, 4.85, 5.75, 'OIL RIG: chlorine **gains** electrons (reduced); bromide ions **lose** electrons (oxidised)', { size: 10.5, h: 0.5 });
  },
  head: 'Electrons explain it',
  lines: [
    'Write the **ionic equation**: the metal ions (K⁺) are **spectators** and cancel.',
    'The **more reactive halogen** gains electrons: it is **reduced** to halide ions.',
    'The **halide ions** of the less reactive halogen lose electrons: they are **oxidised** to the halogen.',
  ],
  worked: { head: 'Your turn', q: 'Bromine water reacts with iodide ions. Write both half equations.',
    steps: [['Ionic', EQ['Br2+I ionic']], ['Reduced', EQ['Br red']], ['Oxidised', EQ['I ox']]], size: 10.5 },
  workedH: 1.85,
  qc: 'In ' + EQ['Cl2+I ionic'] + ', which species is **oxidised**? Explain.',
  notes: 'QUICK CHECK ANSWER: iodide ions (1); they lose electrons to form iodine (1).\nAll equations checked for atoms and charges. Spec 6.12 (Higher only).',
}), '6.12 Displacement as redox (HT)');

// ======================= 14 HALOGEN TREND EXPLAINED =======================
reg(D.contentSlide({
  title: 'Explaining the group 7 trend',
  subtitle: 'Specification 6.13 • reactivity decreases down the group',
  tag: '6.13', caption: 'a halogen atom needs to GAIN one electron; it is attracted less in bigger atoms',
  draw: (s, p) => {
    [['F', 1.6], ['Cl', 4.4]].forEach(([e, x]) => {
      shellAtom(s, x, 2.85, CONF6[e], e, { r0: 0.22, dr: 0.2 });
      ball(s, x + 0.95, 2.0, 0.06, C.red, C.red); arrow(s, x + 0.9, 2.05, x + 0.55, 2.45, C.red, 1.5);
      label(s, x - 0.9, 4.0, 1.8, `**${CONF6[e].join('.')}**`, { size: 12, h: 0.3, color: C.blue });
    });
    arrow(s, 0.8, 4.5, 6.2, 4.5, '1F5F99', 2.5);
    label(s, 0.8, 4.6, 5.4, 'more shells → incoming electron further from the nucleus → gained **less easily**', { size: 10.5, h: 0.5, color: '1F5F99' });
  },
  head: 'Why reactivity decreases',
  lines: [
    'Halogen atoms react by **gaining one electron** to form a **1− ion** (a full outer shell).',
    'Going down the group, atoms have **more shells**; the outer shell is **further from the nucleus** and **more shielded**.',
    'So the **attraction** for an extra electron is **weaker**: the electron is gained **less easily**, so the halogen is **less reactive**.',
    'Compare group 1: there reactivity **increases** down the group because electrons are **lost**.',
  ],
  worked: { head: 'Explain', q: 'Why is chlorine more reactive than bromine?',
    steps: [['Size', 'chlorine has fewer shells'], ['Attraction', 'stronger pull on an incoming electron'], ['Answer', 'gains an electron more easily']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why reactivity **increases** down group 1 but **decreases** down group 7.',
  notes: 'QUICK CHECK ANSWER: group 1 atoms lose an electron: easier when it is further from the nucleus (1); group 7 atoms gain an electron: harder when the outer shell is further from the nucleus / more shielded (1).\nSpec 6.13.',
}), '6.13 Group 7 trend');

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 6.11–6.13 • displacement and the halogen trend', [
  { q: 'Bromine water is added to potassium iodide solution. Describe the observation and name the products.', marks: 2, ms: 'Turns (darker) brown (1); iodine and potassium bromide (1).' },
  { q: 'Predict whether **iodine** reacts with **potassium bromide** solution. Explain.', marks: 2, ms: 'No reaction (1); iodine is less reactive than bromine (1).' },
  { q: '**HT** Write the half equation for chlorine in its displacement reactions and state whether it is oxidised or reduced.', marks: 2, ms: `${EQ['Cl red']} (1); reduced / gains electrons (1).` },
  { q: 'Explain why fluorine is the most reactive halogen.', marks: 2, ms: 'Smallest atom / outer shell closest to nucleus / least shielding (1); attracts an extra electron most strongly (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 NOBLE GASES =======================
reg(D.contentSlide({
  title: 'The noble gases',
  subtitle: 'Specification 6.14–6.15 • inert because of a full outer shell; uses',
  tag: '6.14–6.15', caption: 'full outer shells: no tendency to lose, gain or share electrons',
  draw: (s, p) => {
    [['He', 1.1], ['Ne', 3.0], ['Ar', 5.15]].forEach(([e, x]) => {
      shellAtom(s, x, 2.55, CONF6[e], e, { r0: 0.2, dr: 0.17 });
      label(s, x - 0.8, 3.45, 1.6, `**${CONF6[e].join('.')}**`, { size: 12, h: 0.3, color: C.blue });
    });
    const uses = [['Helium', 'balloons, airships', 'low density, non-flammable'], ['Neon', 'advertising signs', 'glows when electricity passes'], ['Argon', 'filament lamps, welding', 'inert: stops metal reacting']];
    uses.forEach(([a, b, c2], i) => { const y = 3.95 + i * 0.5; box(s, 0.65, y, 5.75, 0.44, i % 2 ? C.white : C.cardBlue, C.line, { lw: 0.75 }); label(s, 0.75, y, 1.2, `**${a}**`, { size: 11, h: 0.44, align: 'left' }); label(s, 1.95, y, 1.9, b, { size: 10.5, h: 0.44, align: 'left' }); label(s, 3.85, y, 2.5, c2, { size: 10.5, h: 0.44, align: 'left', color: C.grey }); });
  },
  head: 'Key ideas',
  lines: [
    'Noble gases have a **full outer shell** (helium 2, others 8).',
    'They have **no tendency** to lose, gain or share electrons, so they are **chemically inert** and exist as **single atoms** (monatomic).',
    'Their **uses** depend on being **inert**, having **low density** and being **non-flammable**.',
  ],
  worked: { head: 'Explain a use', q: 'Why is argon used inside filament lamps instead of air?',
    steps: [['Air', 'oxygen would react with the hot filament'], ['Argon', 'inert: does not react'], ['Answer', 'the filament does not burn away']], size: 11 },
  workedH: 1.75,
  qc: 'Why is helium used in airships instead of hydrogen?',
  notes: 'QUICK CHECK ANSWER: helium is non-flammable (hydrogen is flammable / explosive) (1); and it still has a low density (1).\nSpec 6.14–6.15.',
}), '6.14–6.15 Noble gases');

// ======================= 17 NOBLE GAS TRENDS =======================
reg(D.contentSlide({
  title: 'Noble gas trends and predictions',
  subtitle: 'Specification 6.16 • boiling point and density increase down the group',
  tag: '6.16', caption: 'boiling points of the noble gases (data-book values)',
  draw: (s, p) => {
    const g = { x: 1.4, y: 1.6, w: 4.7, h: 3.2, xmin: 0, xmax: 60, xstep: 10, ymin: -280, ymax: -80, ystep: 40, xlabel: 'atomic number', ylabel: 'boiling point (°C)', grid: true };
    axes(s, g);
    const pts = NG.map(([, z, bp]) => [z, bp]);
    plotLine(s, g, pts, '1F5F99', 2); points(s, g, pts, '1F5F99');
    NG.forEach(([e, z, bp]) => label(s, px(g, z) - 0.15, py(g, bp) - 0.35, 0.6, `**${e}**`, { size: 10.5, h: 0.26, align: 'left' }));
    label(s, 0.65, 5.3, 5.75, 'predict radon (Rn): boiling point **higher than −108 °C**', { size: 11, h: 0.35 });
  },
  head: 'Key ideas',
  lines: [
    'Going **down** group 0, **boiling points increase** and **density increases**.',
    'The atoms get **bigger**, so the forces between atoms get **stronger**.',
    'All are **colourless gases** at room temperature.',
    'Use the pattern to **predict** values for other noble gases (e.g. radon).',
  ],
  worked: { head: 'Predict', q: 'Krypton boils at −153 °C and xenon at −108 °C. Predict the boiling point of radon.',
    steps: [['Trend', 'increase of about 45 °C per step'], ['Answer', 'about −60 °C (actual −62 °C)']], size: 11 },
  workedH: 1.5,
  qc: 'Describe the trend in **density** down group 0.',
  notes: 'QUICK CHECK ANSWER: density increases down the group (1).\nBoiling points (data book): He −269, Ne −246, Ar −186, Kr −153, Xe −108, Rn −62 °C; asserted to increase. Spec 6.16.',
}), '6.16 Noble gas trends');

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 6.14–6.16 • noble gases', [
  { q: 'Explain why the noble gases are **unreactive**.', marks: 2, ms: 'Full outer shell of electrons (1); no tendency to lose, gain or share electrons (1).' },
  { q: 'Give **one** use of argon and the property it depends on.', marks: 2, ms: 'Filament lamps / welding (1); inert / does not react with the hot metal (1).' },
  { q: 'Describe the trend in boiling points down group 0.', marks: 1, ms: 'Increase down the group (1).' },
  { q: 'Why do noble gases exist as **single atoms**?', marks: 1, ms: 'They do not form bonds / already have a full outer shell (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 COMPARING GROUPS / EQUATION BANK =======================
{
  const s = D.contentHeader('Summary: comparing the three groups', 'Specification 6.1–6.16 • every equation checked for atoms and charges', { tag: 'Summary' });
  const rows = [[HDR(''), HDR('Group 1: alkali metals'), HDR('Group 7: halogens'), HDR('Group 0: noble gases')],
    ...[['Outer electrons', '1', '7', 'full (2 or 8)'], ['Form ions?', '1+ (lose 1 e⁻)', '1− (gain 1 e⁻)', 'no'], ['Reactivity down group', 'increases', 'decreases', 'unreactive'],
      ['Melting / boiling points down group', 'decrease', 'increase', 'increase'], ['Typical reaction', EQ['Na+H2O'], EQ['Cl2+KBr'], 'none']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.6, 3.4, 3.6, 2.83], rowH: 0.5, fontFace: 'Calibri', fontSize: 11.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 4.45, 12.43, 1.8, 'HT ionic and half equations', [EQ['Cl2+Br ionic'] + '     •     ' + EQ['Cl red'] + '  (reduction)     •     ' + EQ['Br ox'] + '  (oxidation)'], { size: 12 });
  D.quickCheck(s, 'Cover a column. Describe that group from memory: outer electrons, ions, trends, a typical reaction.');
  D.notes(s, 'Equations checked in build_T6.js:\n' + EQLIST.join('\n'));
  reg(s, 'Summary: comparing groups');
}

// ======================= 20 KEY WORDS =======================
reg(D.keyWords([
  ['Alkali metal', 'Group 1 metal: 1 outer electron; forms 1+ ions.'],
  ['Halogen', 'Group 7 non-metal: 7 outer electrons; diatomic.'],
  ['Noble gas', 'Group 0: full outer shell; inert.'],
  ['Diatomic', 'Molecule of two atoms, e.g. Cl₂.'],
  ['Monatomic', 'Exists as single atoms, e.g. Ar.'],
  ['Metal hydroxide', 'Alkali formed when group 1 metals react with water.'],
  ['Metal halide', 'Salt of a metal and a halogen, e.g. NaCl.'],
  ['Hydrogen halide', 'HCl, HBr…; dissolves to give an acid.'],
  ['Displacement', 'More reactive halogen takes the place of a less reactive one.'],
  ['Halide ion', 'Cl⁻, Br⁻, I⁻.'],
  ['Shielding', 'Inner electrons reduce the pull of the nucleus.'],
  ['Inert', 'Does not react.'],
  ['Redox (HT)', 'Oxidation and reduction at the same time.'],
  ['Oxidation (HT)', 'Loss of electrons.'],
  ['Reduction (HT)', 'Gain of electrons.'],
  ['Bleach', 'Chlorine bleaches damp litmus white.'],
], { notes: 'Cover-and-recall activity. HT terms marked (HT).' }), 'Summary: key words');

// ======================= 21 FULL QUESTION =======================
reg(D.fullQuestion('This question is about **sodium** and **chlorine** and the groups they belong to.', [
  { l: 'a', q: 'Sodium is added to water containing universal indicator. Give **two** observations.', marks: 2, ms: 'Any two: fizzing; moves around; melts into a ball; indicator turns purple / blue (1 each).' },
  { l: 'b', q: 'Write the balanced equation for sodium with water, with state symbols.', marks: 2, ms: `${EQ['Na+H2O']}: formulae and balancing (1); state symbols (1).` },
  { l: 'c', q: 'Explain why potassium reacts more vigorously with water than sodium.', marks: 2, ms: 'Outer electron further from the nucleus / more shells / more shielding (1); lost more easily (1).' },
  { l: 'd', q: 'Calculate the mass of sodium chloride formed when **4.6 g** of sodium reacts with excess chlorine. (Na = 23, Cl = 35.5)', marks: 2, ms: '4.6 ÷ 23 = 0.20 mol Na → 0.20 mol NaCl (1); 0.20 × 58.5 = 11.7 g (1). Mass-ratio method accepted.', h: 1.05 },
  { l: 'e', q: 'Chlorine water is added to sodium bromide solution. Describe what is seen.', marks: 1, ms: 'Colourless solution turns orange / yellow-orange (1).' },
  { l: 'f', q: '**HT** For (e), write the ionic equation and explain which species is oxidised.', marks: 3, ht: true, ms: `${EQ['Cl2+Br ionic']} (1); bromide ions are oxidised (1); they lose electrons (to form bromine) (1).`, h: 1.1 },
  { l: 'g', q: 'Explain why argon does not react with sodium.', marks: 1, ms: 'Argon has a full outer shell / is inert (1).' },
], 13, { ht: true, subtitle: 'Specification 6.1–6.14 • answer every part • 13 marks (part f is HT)' }), 'Full question');

// ======================= 22–23 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Give the **colour** and **state** of iodine at room temperature.', marks: 2, ms: 'Grey-black (1); solid (1).', h: 0.75 },
  { n: '2', q: 'Predict how **rubidium** reacts with water compared with potassium, and name the products.', marks: 2, ms: 'More vigorously / explosively (1); rubidium hydroxide and hydrogen (1).', h: 0.85 },
  { n: '3', q: 'Describe the test for chlorine and give the result.', marks: 2, ms: 'Damp blue litmus paper (1); turns red then white / bleached (1).', h: 0.8 },
  { n: '4', q: '**HT** Write the half equations for ' + EQ['Br2+I ionic'] + ' and label oxidation and reduction.', marks: 3, ht: true, ms: `${EQ['Br red']}: reduction (1)(1 for equation); ${EQ['I ox']}: oxidation (1).`, h: 1.0 },
  { n: '5', q: 'Explain why **neon** is used in advertising signs and **helium** in balloons.', marks: 2, ms: 'Neon glows (red) when electricity passes through it (1); helium has a low density and is non-flammable (1).', h: 0.85 },
  { n: '6', q: 'Compare the reactivity trends in **group 1** and **group 7**. Explain both trends using electronic configurations.', marks: 6, levels: true, h: 1.45, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Group 1: reactivity increases down the group.',
    'Group 1 atoms have 1 outer electron, which is lost to form a 1+ ion.',
    'Down group 1, more shells: the outer electron is further from the nucleus and more shielded, so it is lost more easily.',
    'Group 7: reactivity decreases down the group.',
    'Group 7 atoms have 7 outer electrons and gain 1 electron to form a 1− ion.',
    'Down group 7, the outer shell is further from the nucleus and more shielded, so an extra electron is attracted less strongly and gained less easily.',
    'Examples: K reacts faster with water than Na; Cl₂ displaces Br₂ from bromides but I₂ does not.',
  ], 'Level 3 answers describe BOTH trends AND explain each in terms of losing or gaining electrons and the distance / shielding of the outer shell.');
}
D.homework('Answer every question. Question 4 is Higher tier. Include state symbols in equations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 8); assert.strictEqual(R4.total, 6);
assert(D.slideNo >= 20 && D.slideNo <= 30, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T6_Groups.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
