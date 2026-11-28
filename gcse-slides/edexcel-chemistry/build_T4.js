// build_T4.js — Edexcel GCSE Chemistry 1CH0 Topic 4 Extracting metals and equilibria (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T4.js
// Structure copied from build_T3.js / build_T1.js. edx_chem_template.js is NOT edited: the equation checker and
// glassware helpers are spliced in from build_T3.js; T4 helpers are below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 4,
  title: 'Extracting metals and equilibria',
  shortTitle: 'T4',
  subtitle: 'Reactivity, extraction, recycling, life cycles and reversible reactions',
  specRange: '4.1–4.17',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Reactivity series', 'Redox', 'Extraction', 'Recycling', 'Life cycle', 'Equilibrium'],
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



// --- Topic 4 equations (atoms and charges asserted) ---
eq('Mg+HCl', [[1, 'Mg', 's'], [2, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]);
eq('Na+H2O', [[2, 'Na', 's'], [2, 'H2O', 'l']], [[2, 'NaOH', 'aq'], [1, 'H2', 'g']]);
eq('Ca+H2O', [[1, 'Ca', 's'], [2, 'H2O', 'l']], [[1, 'Ca(OH)2', 'aq'], [1, 'H2', 'g']]);
eq('Zn+H2SO4', [[1, 'Zn', 's'], [1, 'H2SO4', 'aq']], [[1, 'ZnSO4', 'aq'], [1, 'H2', 'g']]);
eq('Mg+CuSO4', [[1, 'Mg', 's'], [1, 'CuSO4', 'aq']], [[1, 'MgSO4', 'aq'], [1, 'Cu', 's']]);
eq('Mg+Cu ionic', [[1, 'Mg', 's'], [1, 'Cu^2+', 'aq']], [[1, 'Mg^2+', 'aq'], [1, 'Cu', 's']]);
eq('Mg ox', [[1, 'Mg']], [[1, 'Mg^2+'], [2, 'e-']], { noStates: true });
eq('Cu red', [[1, 'Cu^2+'], [2, 'e-']], [[1, 'Cu']], { noStates: true });
eq('Fe+CuSO4', [[1, 'Fe', 's'], [1, 'CuSO4', 'aq']], [[1, 'FeSO4', 'aq'], [1, 'Cu', 's']]);
eq('Fe+Cu ionic', [[1, 'Fe', 's'], [1, 'Cu^2+', 'aq']], [[1, 'Fe^2+', 'aq'], [1, 'Cu', 's']]);
eq('Cu+AgNO3', [[1, 'Cu', 's'], [2, 'AgNO3', 'aq']], [[1, 'Cu(NO3)2', 'aq'], [2, 'Ag', 's']]);
eq('Cu+Ag ionic', [[1, 'Cu', 's'], [2, 'Ag^+', 'aq']], [[1, 'Cu^2+', 'aq'], [2, 'Ag', 's']]);
eq('Zn+CuSO4', [[1, 'Zn', 's'], [1, 'CuSO4', 'aq']], [[1, 'ZnSO4', 'aq'], [1, 'Cu', 's']]);
eq('Zn+Cu ionic', [[1, 'Zn', 's'], [1, 'Cu^2+', 'aq']], [[1, 'Zn^2+', 'aq'], [1, 'Cu', 's']]);
eq('Fe2O3+C', [[2, 'Fe2O3', 's'], [3, 'C', 's']], [[4, 'Fe', 'l'], [3, 'CO2', 'g']]);
eq('Fe2O3+CO', [[1, 'Fe2O3', 's'], [3, 'CO', 'g']], [[2, 'Fe', 'l'], [3, 'CO2', 'g']]);
eq('CuO+C', [[2, 'CuO', 's'], [1, 'C', 's']], [[2, 'Cu', 's'], [1, 'CO2', 'g']]);
eq('PbO+C', [[2, 'PbO', 's'], [1, 'C', 's']], [[2, 'Pb', 's'], [1, 'CO2', 'g']]);
eq('Al cathode', [[1, 'Al^3+'], [3, 'e-']], [[1, 'Al']], { noStates: true });
eq('O anode', [[2, 'O^2-']], [[1, 'O2'], [4, 'e-']], { noStates: true });
eq('Al2O3', [[2, 'Al2O3', 'l']], [[4, 'Al', 'l'], [3, 'O2', 'g']]);
eq('Haber', [[1, 'N2', 'g'], [3, 'H2', 'g']], [[2, 'NH3', 'g']], { rev: true });
eq('NH4Cl', [[1, 'NH4Cl', 's']], [[1, 'NH3', 'g'], [1, 'HCl', 'g']], { rev: true });
eq('CuSO4 hyd', [[1, 'CuSO4.5H2O', 's']], [[1, 'CuSO4', 's'], [5, 'H2O', 'l']], { rev: true });
eq('NO2', [[2, 'NO2', 'g']], [[1, 'N2O4', 'g']], { rev: true });
eq('C+O2', [[1, 'C', 's'], [1, 'O2', 'g']], [[1, 'CO2', 'g']]);
eq('Fe ox', [[1, 'Fe']], [[1, 'Fe^2+'], [2, 'e-']], { noStates: true });
eq('Ag red', [[1, 'Ag^+'], [1, 'e-']], [[1, 'Ag']], { noStates: true });

// ======================= CALCULATIONS AND DATA (asserted) =======================
const SERIES = ['K', 'Na', 'Ca', 'Mg', 'Al', 'C', 'Zn', 'Fe', 'H', 'Cu', 'Ag', 'Au'];
const rank = m => SERIES.indexOf(m);
const displaces = (metal, saltMetal) => rank(metal) < rank(saltMetal);
const GRID_M = ['Mg', 'Zn', 'Fe', 'Cu'];
const GRID = GRID_M.map(m => GRID_M.map(n => (m === n ? null : displaces(m, n))));
const ticks = GRID.flat().filter(v => v === true).length;
calc('displacement grid: reactions', ticks, 6);
assert.strictEqual(displaces('Mg', 'Cu'), true); assert.strictEqual(displaces('Cu', 'Mg'), false);
assert.strictEqual(displaces('Cu', 'Ag'), true); assert.strictEqual(displaces('Fe', 'Zn'), false);
// extraction method follows position relative to carbon
const method = m => (m === 'Au' || m === 'Ag' ? 'found native / heating' : rank(m) < rank('C') ? 'electrolysis' : 'heat with carbon');
assert.strictEqual(method('Al'), 'electrolysis'); assert.strictEqual(method('Fe'), 'heat with carbon'); assert.strictEqual(method('Zn'), 'heat with carbon');
// gas molecules either side of the Haber equation
const gasMol = side => side.filter(t => t[2] === 'g').reduce((a, t) => a + t[0], 0);
calc('Haber gas molecules left', gasMol(EQ.Haber_d.lhs), 4); calc('Haber gas molecules right', gasMol(EQ.Haber_d.rhs), 2);
calc('NO2 gas molecules left', gasMol(EQ.NO2_d.lhs), 2); calc('NO2 gas molecules right', gasMol(EQ.NO2_d.rhs), 1);
// recycling aluminium: about 95% energy saving (widely quoted figure)
calc('Al recycled energy (relative)', 100 * (1 - 0.95), 5, 1e-9);
// LCA (illustrative data for two drinks containers, per 1000 containers)
const LCA = [['Raw materials (MJ)', 900, 350], ['Manufacture (MJ)', 1600, 1100], ['Use: transport (MJ)', 400, 900], ['Disposal (MJ)', 100, 50]];
const tot = k => LCA.reduce((a, r) => a + r[k], 0);
calc('LCA total can', tot(1), 3000); calc('LCA total glass', tot(2), 2400);
calc('LCA CO2 can (kg)', 3000 * 0.06, 180, 1e-9); calc('LCA CO2 glass (kg)', 2400 * 0.06, 144, 1e-9);
// Haber yield curve (illustrative shape only)
const yieldIll = (T, P) => 100 * (P / (P + 120)) / (1 + Math.exp((T - 380) / 70));
assert(yieldIll(350, 200) > yieldIll(450, 200) && yieldIll(450, 200) > yieldIll(550, 200), 'yield falls with T');
assert(yieldIll(450, 400) > yieldIll(450, 200) && yieldIll(450, 200) > yieldIll(450, 100), 'yield rises with P');

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


// ======================= T4 drawing helpers =======================
const METALC = { Mg: ['D7DCE3', '6B7385'], Zn: ['C9CDD3', '5A6275'], Fe: ['8A8F99', '4A4F5A'], Cu: COPPER, Ag: ['E8EAEE', '9AA3B0'] };
function arrowsDown(s, x, y1, y2, col = C.ink) { arrow(s, x, y1, x, y2, col, 2); }
function flowBox(s, x, y, w, h, head, sub, col) {
  box(s, x, y, w, h, col[0], col[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x + 0.05, y + 0.04, w - 0.1, `**${head}**`, { size: 11, h: 0.3, color: C.ink });
  if (sub) label(s, x + 0.05, y + 0.34, w - 0.1, sub, { size: 9.5, h: h - 0.38, color: C.text, valign: 'top' });
}
function eqLine(s, x, y, w, key, o = {}) { eqn(s, x, y, w, EQ[key], Object.assign({ size: 11.5 }, o)); }

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Metals and equilibria',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • reactivity, extraction, recycling, life cycles, reversible reactions` },
    { icon: 'H', text: 'Higher & Foundation in one deck • redox as electrons, biological extraction, equilibrium shifts are HT' },
    { icon: '4', text: 'Topic 4 • Paper 1 • same content in Combined Science • every equation checked' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 4 Extracting metals and equilibria (Paper 1). Higher-only (HT pill): 4.2 displacement as redox in terms of electrons; 4.8 biological extraction methods; 4.17 predicting the effect of temperature, pressure and concentration on equilibrium position. Chemistry-only: none believed (shared with 1SC0). No Core Practical. Numbering reconstructed (medium confidence): see SPEC_T4.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '4.1', text: 'Deduce a **reactivity order** from reactions with **water**, **acid** and **displacement**.' },
  { code: '4.2', text: 'Explain displacement as **redox**: electrons lost and gained.', ht: true },
  { code: '4.3–4.6', text: 'Explain the **reactivity series**; **ores**; **oxidation** and **reduction** as oxygen gain and loss.' },
  { code: '4.7', text: 'Explain extraction by **heating with carbon** or **electrolysis**, and its **cost**.' },
  { code: '4.8', text: 'Evaluate **bioleaching** and **phytoextraction**.', ht: true },
  { code: '4.9–4.12', text: 'Explain **resistance to oxidation**; evaluate **recycling** and **life cycle assessments**.' },
  { code: '4.13–4.16', text: 'Describe **reversible reactions**, **dynamic equilibrium** and the **Haber process**.' },
  { code: '4.17', text: 'Predict how **temperature**, **pressure** and **concentration** shift an equilibrium.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = Higher-only statements 4.2, 4.8, 4.17 (medium confidence on the markers).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 4 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['4.1–4.3', 'Reactivity, displacement, reactivity series', 'BOTH COURSES', C.blue],
    ['4.2', 'Displacement as redox (electrons)', 'HIGHER ONLY', C.red],
    ['4.4–4.7', 'Ores, reduction, extraction methods', 'BOTH COURSES', C.blue],
    ['4.8', 'Biological extraction methods', 'HIGHER ONLY', C.red],
    ['4.9–4.12', 'Oxidation resistance, recycling, life cycles', 'BOTH COURSES', C.blue],
    ['4.13–4.16', 'Reversible reactions, equilibrium, Haber', 'BOTH COURSES', C.blue],
    ['4.17', 'Shifting the position of equilibrium', 'HIGHER ONLY', C.red],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 4\nMetals and equilibria', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 ions • Topic 3 electrolysis, half equations, OIL RIG • Topic 7 rates', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1CH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–5.',
      'Combined Science 1SC0 tests the **same** Topic 4 statements.',
      'Evaluation questions: **biological methods**, **recycling** and **LCA** data.',
      'No Core Practical in Topic 4.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**HT** pill: displacement as electron transfer, bioleaching and phytoextraction, equilibrium shifts.',
      '**No chemistry-only** statements believed in Topic 4.',
      'Every equation is checked for **atoms and charges**.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'HT statements 4.2, 4.8, 4.17 (medium confidence). Chemistry-only: none (medium). Numbering reconstructed: see SPEC_T4.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 3 • acids', q: 'Complete: metal + acid → ____ + ____' },
  { from: 'Topic 3 • gas tests', q: 'Describe the test for **hydrogen**.' },
  { from: 'Topic 1 • ions', q: 'What charge does a **magnesium ion** have? Why?' },
  { from: 'Topic 3 • electrolysis', q: 'Which electrode do **positive** ions move to?' },
  { from: 'Topic 3 • redox (HT)', q: 'What does **OIL RIG** stand for?' },
  { from: 'Topic 1 • formulae', q: 'Write the formula of **iron(III) oxide**.' },
], { subtitle: 'Recall from Topics 1 and 3 • 6 minutes • no notes', notes: 'ANSWERS\n1. A salt + hydrogen.\n2. A lighted splint gives a squeaky pop.\n3. 2+; it loses its 2 outer electrons (2.8.2).\n4. The cathode (negative electrode).\n5. Oxidation Is Loss (of electrons), Reduction Is Gain.\n6. Fe₂O₃.' }), 'Retrieval starter');

// ======================= 5 REACTIVITY FROM EXPERIMENTS =======================
reg(D.contentSlide({
  title: 'Deducing reactivity from experiments',
  subtitle: 'Specification 4.1 • reactions with water and dilute acid',
  tag: '4.1', caption: 'metals in dilute hydrochloric acid: more bubbles = more reactive',
  draw: (s, p) => {
    [['Mg', 'fast fizzing', 14], ['Zn', 'steady fizzing', 7], ['Fe', 'slow bubbles', 3], ['Cu', 'no reaction', 0]].forEach(([m, obs, nb], i) => {
      const x = 0.95 + i * 1.4;
      const t = tube(s, x, 1.8, 0.55, 2.6, 0.75, ACIDC);
      box(s, x + 0.12, 3.95, 0.31, 0.25, METALC[m][0], METALC[m][1], { lw: 1 });
      const pts = []; for (let k = 0; k < nb; k++) pts.push([x + 0.12 + ((k * 37) % 9) * 0.035, 3.85 - ((k * 53) % 13) * 0.13]);
      bubbles(s, pts, 0.03);
      label(s, x - 0.3, 4.55, 1.15, `**${m}**`, { size: 13, h: 0.3 });
      label(s, x - 0.35, 4.85, 1.25, obs, { size: 9.5, h: 0.4, color: C.grey });
    });
    label(s, 0.6, 5.35, 5.8, 'fair test: same acid, same concentration and volume, same size of metal', { size: 10, h: 0.35, italic: true });
  },
  head: 'Observations to look for',
  lines: [
    '**Water:** potassium, sodium and calcium react with cold water, giving hydrogen and a metal hydroxide.',
    '**Acid:** more reactive metals fizz faster (more hydrogen per second) and get hotter.',
    'Copper, silver and gold do **not** react with dilute acid.',
    'Order from these results: **Mg > Zn > Fe > Cu**.',
  ],
  worked: { head: 'Equations', q: '',
    steps: [['Water', EQ['Na+H2O']], ['Acid', EQ['Mg+HCl']]], size: 10.5 },
  workedH: 1.4,
  qc: 'Give **two** observations when a small piece of calcium is added to water.',
  notes: `QUICK CHECK ANSWER: any two: fizzing / bubbles (1); calcium moves / disappears (1); solution goes cloudy (calcium hydroxide is slightly soluble) (1); gets warm (1).\nEquation: ${EQ['Ca+H2O']}.\nSpec 4.1.`,
}), '4.1 Reactivity from experiments');

// ======================= 6 DISPLACEMENT =======================
reg(D.contentSlide({
  title: 'Displacement reactions',
  subtitle: 'Specification 4.1 • a more reactive metal displaces a less reactive one from a solution',
  tag: '4.1', caption: 'results grid: ✓ = reaction (coating, colour change, temperature rise)',
  draw: (s, p) => {
    const rows = [[HDR('Metal ↓  /  solution →'), ...GRID_M.map(m => HDR(`${m} sulfate`))], ...GRID_M.map((m, i) => [tcell(m, i, { bold: true }), ...GRID[i].map(v => tcell(v === null ? '—' : (v ? '✓' : '✗'), i, { align: 'center', bold: true, color: v ? C.green : (v === null ? C.grey : C.red), fontSize: 14 }))])];
    s.addTable(rows, { x: 0.65, y: 1.55, w: 5.75, colW: [1.95, 0.95, 0.95, 0.95, 0.95], rowH: 0.5, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    label(s, 0.65, 4.2, 5.75, 'Mg reacts with 3 solutions, Zn with 2, Fe with 1, Cu with 0 → **Mg > Zn > Fe > Cu**', { size: 11, h: 0.5 });
    eqLine(s, 0.65, 4.85, 5.75, 'Mg+CuSO4');
  },
  head: 'Key ideas',
  lines: [
    'A **more reactive** metal **displaces** a less reactive metal from a solution of its compound.',
    'Signs: the metal gets a **coating** of the less reactive metal; blue copper sulfate fades; temperature **rises**.',
    'Count the reactions for each metal to find the order.',
    'No reaction if the metal is **less** reactive than the metal in the solution.',
  ],
  worked: { head: 'Worked example', q: 'Iron nail in copper sulfate solution: what do you see?',
    steps: [['Equation', EQ['Fe+CuSO4']], ['See', 'pink-brown copper on the nail; blue colour fades to pale green'], ['Answer', 'iron is more reactive than copper']], size: 10.5 },
  workedH: 1.85,
  qc: 'Will copper react with **silver nitrate** solution? Explain and name the products.',
  notes: `QUICK CHECK ANSWER: yes, copper is more reactive than silver (1); silver and copper nitrate form (1). Equation: ${EQ['Cu+AgNO3']}.\nThe grid is generated from the reactivity series and checked (6 reactions).\nSpec 4.1.`,
}), '4.1 Displacement reactions');

// ======================= 7 DISPLACEMENT AS REDOX (HT) =======================
reg(D.contentSlide({
  title: 'Displacement as redox',
  subtitle: 'Specification 4.2 • electrons move from the more reactive metal', ht: true,
  tag: '4.2', caption: 'magnesium atoms give electrons to copper ions; sulfate ions are spectators',
  draw: (s, p) => {
    box(s, 0.8, 1.8, 0.9, 2.8, METALC.Mg[0], METALC.Mg[1], { lw: 1.5 });
    label(s, 0.8, 4.65, 0.9, '**Mg**', { size: 12, h: 0.3 });
    ion(s, 3.0, 2.3, 'Cu²⁺', 0.24); ion(s, 3.4, 3.6, 'Cu²⁺', 0.24); ion(s, 4.8, 2.7, 'SO₄²⁻', 0.26); ion(s, 5.3, 4.0, 'SO₄²⁻', 0.26);
    ring(s, 4.8, 2.7, 0.26); ring(s, 5.3, 4.0, 0.26);
    [[1.75, 2.35], [1.75, 3.6]].forEach(([x, y], i) => { arrow(s, x, y, i ? 3.12 : 2.72, y, '1F5F99', 2); label(s, x + 0.15, y - 0.32, 1.0, '2e⁻', { size: 11, h: 0.26, color: '1F5F99', bold: true }); });
    label(s, 3.6, 4.85, 2.8, 'dashed ring = spectator ion', { size: 9.5, h: 0.26, color: C.red });
    eqLine(s, 0.65, 5.2, 5.75, 'Mg+Cu ionic');
  },
  head: 'Electrons explain it',
  lines: [
    'The **more reactive** metal **loses electrons**: it is **oxidised**.  ' + EQ['Mg ox'],
    'The ions of the **less reactive** metal **gain electrons**: they are **reduced**.  ' + EQ['Cu red'],
    'Both happen together, so it is a **redox** reaction. Sulfate ions do not change: **spectator ions**.',
    'OIL RIG: **O**xidation **I**s **L**oss, **R**eduction **I**s **G**ain.',
  ],
  worked: { head: 'Worked example', q: 'Zinc reacts with copper sulfate. Write the ionic equation and say what is oxidised.',
    steps: [['Ionic', EQ['Zn+Cu ionic']], ['Oxidised', 'Zn → Zn²⁺: loses 2 electrons'], ['Reduced', 'Cu²⁺ → Cu: gains 2 electrons']], size: 10.5 },
  workedH: 1.85,
  qc: 'In ' + EQ['Cu+Ag ionic'] + ', which species is **reduced**? Write its half equation.',
  notes: `QUICK CHECK ANSWER: silver ions are reduced (1); ${EQ['Ag red']} (1).\nAll equations checked for atoms and charge. Links to Topic 3 half equations (3.27, 3.28). Spec 4.2 (Higher only).`,
}), '4.2 Displacement as redox (HT)');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 4.1–4.2 • reactivity and displacement', [
  { q: 'Zinc and magnesium are added to dilute acid. Describe how you could tell which is **more reactive**.', marks: 2, ms: 'Compare the rate of bubbling / gas given off (1); the faster one (magnesium) is more reactive; fair test: same acid concentration and metal size (1).' },
  { q: 'Predict whether **iron** reacts with **zinc sulfate** solution. Explain.', marks: 2, ms: 'No reaction (1); iron is less reactive than zinc (1).' },
  { q: 'Write the **word equation** for magnesium reacting with copper sulfate solution.', marks: 1, ms: 'Magnesium + copper sulfate → magnesium sulfate + copper (1).' },
  { q: '**HT** In ' + EQ['Fe+Cu ionic'] + ', explain which species is **oxidised**.', marks: 2, ms: 'Iron (atoms) (1); they lose electrons (to form Fe²⁺) (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 REACTIVITY SERIES =======================
reg(D.contentSlide({
  title: 'The reactivity series',
  subtitle: 'Specification 4.3 • reactivity = tendency to form positive ions',
  tag: '4.3', caption: 'carbon and hydrogen are included for comparison',
  draw: (s, p) => {
    const names = { K: 'potassium', Na: 'sodium', Ca: 'calcium', Mg: 'magnesium', Al: 'aluminium', C: 'carbon', Zn: 'zinc', Fe: 'iron', H: 'hydrogen', Cu: 'copper', Ag: 'silver', Au: 'gold' };
    SERIES.forEach((m, i) => {
      const y = 1.5 + i * 0.36, ref = m === 'C' || m === 'H';
      box(s, 1.4, y, 2.4, 0.32, ref ? C.cream : 'DCE8F7', ref ? C.orange : '7A9CC9', { lw: ref ? 1.5 : 0.75 });
      label(s, 1.45, y, 2.3, `**${m}**  ${names[m]}`, { size: 11, h: 0.32, align: 'left', italic: ref });
    });
    arrow(s, 0.9, 5.7, 0.9, 1.5, C.red, 3); label(s, 4.0, 2.55, 2.4, '↑ most reactive at the top', { size: 10.5, h: 0.4, align: 'left', color: C.red, bold: true });
    label(s, 4.0, 1.6, 2.4, 'above carbon:\n**electrolysis**', { size: 10.5, h: 0.6, align: 'left', color: '7B4FB8' });
    label(s, 4.0, 3.75, 2.4, 'below carbon:\n**heat with carbon**', { size: 10.5, h: 0.6, align: 'left', color: C.orange });
    label(s, 4.0, 5.05, 2.4, 'gold: found **native**', { size: 10.5, h: 0.4, align: 'left', color: 'B8860B' });
  },
  head: 'Key ideas',
  lines: [
    'Metals react by **losing electrons** to form **positive ions (cations)**.',
    'The **more easily** a metal forms cations, the **more reactive** it is.',
    'Metals above **hydrogen** react with dilute acids; those below do not.',
    'Metals below **carbon** can be extracted by **heating with carbon**.',
  ],
  worked: { head: 'Explain', q: 'Why is potassium more reactive than magnesium?',
    steps: [['Ions', 'K forms K⁺ (loses 1 electron); Mg forms Mg²⁺ (loses 2)'], ['Answer', 'potassium loses its outer electron more easily']], size: 11 },
  workedH: 1.5,
  qc: 'Use the series: will **zinc** react with dilute hydrochloric acid? Explain.',
  notes: 'QUICK CHECK ANSWER: yes (1); zinc is above hydrogen in the reactivity series (1).\nSpec 4.3.',
}), '4.3 The reactivity series');

// ======================= 10 ORES AND REDUCTION =======================
reg(D.contentSlide({
  title: 'Ores, oxidation and reduction',
  subtitle: 'Specification 4.4–4.6 • extracting a metal means reducing its ore',
  tag: '4.4–4.6', caption: 'oxygen is removed from the metal oxide (reduction) and added to carbon (oxidation)',
  draw: (s, p) => {
    eqLine(s, 0.65, 1.6, 5.75, 'CuO+C', { size: 13 });
    line(s, 1.25, 2.1, 1.25, 2.6, '1F5F99', 1.5); line(s, 1.25, 2.6, 3.65, 2.6, '1F5F99', 1.5); arrow(s, 3.65, 2.6, 3.65, 2.1, '1F5F99', 1.5);
    label(s, 1.4, 2.62, 2.4, '**reduction**: loses oxygen', { size: 10.5, h: 0.3, color: '1F5F99', align: 'left' });
    line(s, 2.35, 1.6, 2.35, 1.35, C.red, 1.5); line(s, 2.35, 1.35, 4.95, 1.35, C.red, 1.5); arrow(s, 4.95, 1.35, 4.95, 1.6, C.red, 1.5);
    label(s, 2.5, 1.07, 2.6, '**oxidation**: gains oxygen', { size: 10.5, h: 0.28, color: C.red, align: 'left' });
    const ores = [['haematite', 'Fe₂O₃', 'iron'], ['bauxite', 'Al₂O₃', 'aluminium'], ['malachite', 'CuCO₃·Cu(OH)₂', 'copper']];
    ores.forEach(([o, f, m], i) => { const y = 3.2 + i * 0.6; box(s, 0.65, y, 5.75, 0.5, i % 2 ? C.white : C.cardBlue, C.line, { lw: 0.75 }); label(s, 0.75, y, 1.7, `**${o}**`, { size: 11, h: 0.5, align: 'left' }); label(s, 2.4, y, 2.2, f, { size: 11, h: 0.5, align: 'left' }); label(s, 4.6, y, 1.7, `→ ${m}`, { size: 11, h: 0.5, align: 'left', color: C.green }); });
    label(s, 0.65, 5.05, 5.75, '**gold** and **platinum** are found as the **uncombined** elements', { size: 10.5, h: 0.4 });
  },
  head: 'Key ideas',
  lines: [
    'Most metals are found in the Earth’s crust as **ores**: rocks containing enough metal compound to extract it **economically**.',
    'Very **unreactive** metals (gold) are found **uncombined** (native).',
    '**Oxidation** = **gain of oxygen**; **reduction** = **loss of oxygen**.',
    'Extracting a metal from its oxide is **reduction**.',
  ],
  worked: { head: 'Worked example', q: 'Lead is extracted by heating lead oxide with carbon. What is reduced?',
    steps: [['Equation', EQ['PbO+C']], ['Answer', 'lead oxide is reduced (loses oxygen); carbon is oxidised']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why is gold found **uncombined** in the Earth’s crust but iron is not?',
  notes: 'QUICK CHECK ANSWER: gold is very unreactive so it does not react with oxygen or water (1); iron is more reactive and is found combined (as oxides) (1).\nSpec 4.4–4.6.',
}), '4.4–4.6 Ores and reduction');

// ======================= 11 EXTRACTION METHODS =======================
reg(D.contentSlide({
  title: 'Extraction: carbon or electrolysis?',
  subtitle: 'Specification 4.7 • the method depends on reactivity and cost',
  tag: '4.7', caption: 'left: blast furnace (simplified); right: electrolysis of molten aluminium oxide',
  draw: (s, p) => {
    poly(s, [[1.1, 1.6], [2.3, 1.6], [2.7, 4.6], [0.7, 4.6]], 'F2D2C2', '8A4A1A', { lw: 1.5 });
    poly(s, [[0.85, 4.0], [2.55, 4.0], [2.62, 4.55], [0.78, 4.55]], 'E8743B', null);
    label(s, 0.6, 1.25, 1.0, '**iron**', { size: 12, h: 0.3, color: C.blue, align: 'left' });
    label(s, 1.0, 2.0, 1.4, 'iron ore, coke, limestone', { size: 9, h: 0.6, color: C.ink });
    arrow(s, 1.7, 1.2, 1.7, 1.6, C.ink, 1.5);
    arrow(s, 0.2, 3.7, 0.85, 3.7, C.red, 2); label(s, 0.1, 3.35, 0.9, 'hot air', { size: 9, h: 0.24, color: C.red });
    label(s, 0.9, 4.1, 1.6, 'molten iron', { size: 9.5, h: 0.4, color: C.white, bold: true });
    label(s, 0.55, 4.7, 2.3, EQ['Fe2O3+CO'], { size: 9, h: 0.5, bold: true });
    box(s, 3.5, 2.6, 2.7, 2.0, '3A3F4A', '1A1F2A', { lw: 1.5 });
    box(s, 3.65, 2.7, 2.4, 1.8, 'F5D7A0', null);
    box(s, 3.65, 4.15, 2.4, 0.35, 'B8BEC9', null);
    [3.95, 4.7, 5.45].forEach(x => box(s, x, 1.9, 0.35, 1.3, GRAPH[0], GRAPH[1], { lw: 1 }));
    label(s, 3.3, 1.25, 3.0, '**aluminium**', { size: 12, h: 0.3, color: C.blue });
    label(s, 3.6, 1.55, 2.6, 'graphite anodes (+)', { size: 9.5, h: 0.3, color: C.ink });
    label(s, 3.65, 3.35, 2.4, 'Al₂O₃ in molten cryolite', { size: 9.5, h: 0.4 });
    label(s, 3.65, 4.15, 2.4, 'molten Al', { size: 9.5, h: 0.35, bold: true });
    label(s, 3.5, 4.65, 2.7, 'cathode (−): steel case lined with graphite', { size: 9, h: 0.4 });
    label(s, 3.4, 5.1, 2.9, `${EQ['Al cathode']}\n${EQ['O anode']}`, { size: 9.5, h: 0.55, bold: true });
  },
  head: 'Key ideas',
  lines: [
    'Metals **below carbon** (e.g. iron, zinc): **heat the oxide with carbon**; carbon removes the oxygen. Cheap.',
    'Metals **above carbon** (e.g. aluminium): carbon cannot reduce them, so use **electrolysis** of the molten compound. Uses a lot of **electricity**: expensive.',
    'Aluminium oxide is dissolved in **cryolite** to lower the melting point and save energy. The anodes **burn away** in oxygen and must be replaced.',
  ],
  worked: { head: 'Explain', q: 'Why is aluminium more expensive to extract than iron?',
    steps: [['Position', 'aluminium is above carbon'], ['Method', 'electrolysis: large amounts of electricity, high temperature'], ['Answer', 'higher energy cost; anodes replaced']], size: 10.5 },
  workedH: 1.75,
  qc: 'Explain why **zinc** oxide can be reduced by carbon but **magnesium** oxide cannot.',
  notes: `QUICK CHECK ANSWER: zinc is below carbon in the reactivity series, so carbon is more reactive and removes the oxygen (1); magnesium is above carbon, so carbon cannot remove the oxygen (1).\nOverall electrolysis: ${EQ['Al2O3']}. Spec 4.7.`,
}), '4.7 Extraction methods');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 4.3–4.7 • reactivity series and extraction', [
  { q: 'Explain the reactivity series in terms of **ions**.', marks: 2, ms: 'More reactive metals form positive ions / cations more easily (1); by losing electrons (1).' },
  { q: 'What is an **ore**?', marks: 1, ms: 'A rock containing enough of a metal (compound) to extract it economically (1).' },
  { q: 'In ' + EQ['CuO+C'] + ' identify the substance **oxidised** and the substance **reduced**.', marks: 2, ms: 'Carbon is oxidised (1); copper oxide is reduced (1).' },
  { q: 'Explain why aluminium is extracted by **electrolysis**, not by heating with carbon.', marks: 2, ms: 'Aluminium is more reactive than carbon / above carbon (1); so carbon cannot reduce aluminium oxide / remove the oxygen (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 BIOLOGICAL METHODS (HT) =======================
{
  const s = D.contentHeader('Biological extraction methods', 'Specification 4.8 • bioleaching and phytoextraction for low-grade ores', { ht: true, tag: '4.8' });
  const cols = [['DCE8F7', '7A9CC9'], ['E1F3E6', '4E9A65']];
  [['Bioleaching', ['**Bacteria** feed on low-grade ore and produce a solution of metal ions (**leachate**).', 'Copper is then obtained from the leachate, e.g. by **displacement with scrap iron**: ' + EQ['Fe+Cu ionic'] + ', or by electrolysis.']],
   ['Phytoextraction', ['**Plants** are grown on soil containing metal compounds; they absorb the metal through their roots.', 'The plants are harvested and **burned**; the **ash** contains metal compounds, from which the metal is extracted.']]].forEach(([h, lines], i) => {
    D.card(s, 0.45 + i * 6.3, 1.3, 6.1, 2.25, h, lines, { size: 12, fill: cols[i][0], border: cols[i][1] });
  });
  const rows = [[HDR(''), HDR('Advantages'), HDR('Disadvantages')],
    ...[['Bioleaching', 'uses low-grade ores and waste tips; less energy; no large mines or smoke', 'very slow; leachate can be toxic and pollute water'],
      ['Phytoextraction', 'uses low-grade ores; can clean contaminated land; less damage to landscape', 'very slow (growing seasons); depends on weather; low yield']].map((r, i) => r.map((c, j) => tcell(c, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 3.75, w: 12.43, colW: [2.2, 5.3, 4.93], rowH: 0.62, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 0.45, 5.75, 12.4, 'Why bother? High-grade copper ores are **running out**; these methods get metal from ores that would be **too expensive** to mine and smelt.', { size: 12, h: 0.45, align: 'left' });
  D.quickCheck(s, 'Give **one** advantage and **one** disadvantage of phytoextraction compared with traditional mining.');
  D.notes(s, `QUICK CHECK ANSWER: advantage, e.g. can use low-grade ores / less energy / less landscape damage (1); disadvantage, e.g. very slow / low yield (1).\nEquation checked: ${EQ['Fe+CuSO4']} (displacement from leachate).\nSpec 4.8 (Higher only; evaluation).`);
  reg(s, '4.8 Biological extraction (HT)');
}

// ======================= 14 OXIDATION RESISTANCE AND RECYCLING =======================
reg(D.contentSlide({
  title: 'Resisting oxidation; recycling metals',
  subtitle: 'Specification 4.9–4.10 • reactivity, corrosion and the case for recycling',
  tag: '4.9–4.10', caption: 'energy to make 1 tonne of aluminium (relative): recycling saves about 95%',
  draw: (s, p) => {
    const g = { x: 1.5, y: 1.7, w: 4.2, h: 3.0, xmin: 0, xmax: 2, xstep: 1, ymin: 0, ymax: 100, ystep: 20, xlabel: '', ylabel: 'relative energy', grid: true, fmt: () => '' };
    axes(s, g);
    [[0.5, 100, 'from ore', '7B4FB8'], [1.5, 5, 'recycled', C.green]].forEach(([x, v, t, col]) => { box(s, px(g, x) - 0.45, py(g, v), 0.9, py(g, 0) - py(g, v), col, col); label(s, px(g, x) - 0.8, py(g, 0) + 0.05, 1.6, `**${t}**`, { size: 11, h: 0.28 }); label(s, px(g, x) - 0.6, py(g, v) - 0.3, 1.2, String(v), { size: 11, h: 0.26, bold: true }); });
    label(s, 0.65, 5.1, 5.75, 'gold stays shiny for thousands of years; iron rusts quickly', { size: 10.5, h: 0.4, italic: true });
  },
  head: 'Key ideas',
  lines: [
    'The **less reactive** a metal, the **more resistant** it is to oxidation (corrosion). Gold and silver keep their shine.',
    '**Recycling** metals: saves **energy** (melting scrap uses much less than extraction), conserves **limited ores**, reduces **mining** damage and **landfill**.',
    'Costs: **collecting**, **transporting** and **sorting** scrap; recycling is worth it when it is cheaper than extracting new metal.',
  ],
  worked: { head: 'Evaluate', q: 'Why is aluminium recycling especially worthwhile?',
    steps: [['Energy', 'extraction by electrolysis uses a lot of electricity'], ['Saving', 'recycling uses about 5% of the energy'], ['Answer', 'large energy and cost saving; bauxite conserved']], size: 10.5 },
  workedH: 1.85,
  qc: 'Give **two** reasons why recycling metals is better for the **environment**.',
  notes: 'QUICK CHECK ANSWER: any two: less mining / quarrying damage (1); less energy so less fossil fuel burned / less CO₂ (1); less waste in landfill (1); conserves finite ores (1).\nThe 95% figure for aluminium is the widely quoted value.\nSpec 4.9–4.10.',
}), '4.9–4.10 Corrosion and recycling');

// ======================= 15 LIFE CYCLE ASSESSMENT =======================
{
  const s = D.contentHeader('Life cycle assessment', 'Specification 4.11–4.12 • four stages; evaluating LCA data', { tag: '4.11–4.12' });
  const stg = [['1 Raw materials', 'extracting and processing'], ['2 Manufacture', 'making the product and packaging'], ['3 Use', 'energy and transport during use'], ['4 Disposal', 'landfill, incineration or recycling']];
  stg.forEach(([h, t], i) => { flowBox(s, 0.45 + i * 3.15, 1.35, 2.85, 0.95, h, t, [['DCE8F7', '7A9CC9'], ['EFE6FA', 'A58BD1'], ['FFF1D6', 'D9A441'], ['E1F3E6', '4E9A65']][i]); if (i < 3) arrow(s, 3.33 + i * 3.15, 1.82, 3.58 + i * 3.15, 1.82, C.ink, 2); });
  const rows = [[HDR('Energy per 1000 containers (illustrative)'), HDR('Aluminium cans'), HDR('Glass bottles (reused)')],
    ...LCA.map(([a, b, c2], i) => [tcell(a, i, { bold: true }), tcell(String(b), i, { align: 'center' }), tcell(String(c2), i, { align: 'center' })]),
    [tcell('Total (MJ)', 0, { bold: true }), tcell(String(tot(1)), 0, { align: 'center', bold: true }), tcell(String(tot(2)), 0, { align: 'center', bold: true })]];
  s.addTable(rows, { x: 0.45, y: 2.5, w: 7.2, colW: [3.4, 1.9, 1.9], rowH: 0.42, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 7.9, 2.5, 4.98, 3.75, 'Evaluating the data', [
    'Glass uses **less** energy overall (2400 vs 3000 MJ), but **more** in the **use** stage (heavier to transport).',
    'Cans use more energy in **manufacture** (aluminium extraction).',
    'LCAs can be **subjective**: some effects (e.g. pollution, landscape) are hard to give a number to, and data may be chosen to favour one product.',
  ], { size: 11.5 });
  D.quickCheck(s, 'Which stage uses the most energy for **glass bottles**? Suggest why the **use** stage is higher for glass than for cans.');
  D.notes(s, 'QUICK CHECK ANSWER: manufacture (1100 MJ) (1); glass bottles are heavier, so more fuel is used transporting them (and they are transported back for reuse) (1).\nData are illustrative; totals checked in node (3000 and 2400 MJ). Spec 4.11–4.12.');
  reg(s, '4.11–4.12 Life cycle assessment');
}

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 4.8–4.12 • biological methods, recycling and LCA', [
  { q: '**HT** Describe how **bioleaching** is used to obtain copper.', marks: 2, ms: 'Bacteria act on low-grade ore to produce a solution of copper ions / leachate (1); copper obtained by displacement with scrap iron or electrolysis (1).' },
  { q: 'Explain why **silver** jewellery does not corrode as quickly as **iron**.', marks: 2, ms: 'Silver is less reactive than iron (1); so it is more resistant to oxidation (1).' },
  { q: 'Give **one** economic advantage of recycling aluminium.', marks: 1, ms: 'Uses much less energy (about 5%) so it is cheaper / saves the cost of extraction (1).' },
  { q: 'Name the **four** stages considered in a life cycle assessment.', marks: 2, ms: 'Obtaining raw materials, manufacture, use, disposal (2 for four; 1 for two or three).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 REVERSIBLE REACTIONS =======================
reg(D.contentSlide({
  title: 'Reversible reactions',
  subtitle: 'Specification 4.13 • the ⇌ symbol; conditions change the direction',
  tag: '4.13', caption: 'heating ammonium chloride: it breaks down at the bottom and re-forms higher up the tube',
  draw: (s, p) => {
    tube(s, 1.2, 1.7, 0.55, 3.0, 0.08, 'F4F4F4', { lip: true });
    [[1.32, 4.45], [1.47, 4.5], [1.62, 4.42]].forEach(([x, y]) => ball(s, x, y, 0.05, 'FFFFFF', '8A8F99', 0.75));
    box(s, 1.22, 2.2, 0.51, 0.25, 'FFFFFF', 'B8BEC9', { lw: 0.75 });
    tripodBunsen(s, 1.47, 5.4, 5.75, { hw: 0.3 });
    callout(s, 2.05, 2.15, 2.2, 'white solid re-forms (cool)', 1.73, 2.33, { size: 10 });
    callout(s, 2.05, 4.3, 2.2, 'NH₄Cl decomposes (hot)', 1.73, 4.45, { size: 10 });
    box(s, 4.3, 2.0, 0.8, 0.6, '8EC9F0', '2F7FC1', { lw: 1.25 }); label(s, 4.3, 2.65, 0.8, 'blue', { size: 9.5, h: 0.24 });
    box(s, 5.5, 2.0, 0.8, 0.6, 'F4F4F4', '9AA3B0', { lw: 1.25 }); label(s, 5.5, 2.65, 0.8, 'white', { size: 9.5, h: 0.24 });
    arrow(s, 5.12, 2.18, 5.48, 2.18, C.red, 1.75); arrow(s, 5.48, 2.42, 5.12, 2.42, '1F5F99', 1.75);
    label(s, 4.2, 1.6, 2.2, 'heat →   ← add water', { size: 9.5, h: 0.3 });
    label(s, 4.0, 3.0, 2.4, 'hydrated ⇌ anhydrous copper sulfate', { size: 9.5, h: 0.4, italic: true });
  },
  head: 'Key ideas',
  lines: [
    'In a **reversible reaction** the products can react to form the reactants again.',
    'The symbol **⇌** shows a reversible reaction.',
    'The **direction** can be changed by changing the **conditions**, e.g. heating or cooling.',
    EQ.NH4Cl,
  ],
  worked: { head: 'Worked example', q: 'Hydrated copper sulfate is heated, then water is added.',
    steps: [['Equation', EQ['CuSO4 hyd']], ['Heat', 'blue → white (water driven off)'], ['Add water', 'white → blue (and it gets hot)']], size: 10.5 },
  workedH: 1.85,
  qc: 'What does the symbol **⇌** mean? Give one way to change the direction of a reversible reaction.',
  notes: 'QUICK CHECK ANSWER: the reaction is reversible / can go in both directions (1); change the temperature (or pressure / concentration) (1).\nEquations checked. The colour change of anhydrous copper sulfate is the test for water. Spec 4.13.',
}), '4.13 Reversible reactions');

// ======================= 18 DYNAMIC EQUILIBRIUM =======================
reg(D.contentSlide({
  title: 'Dynamic equilibrium',
  subtitle: 'Specification 4.14 • forward and backward rates become equal',
  tag: '4.14', caption: 'in a closed system the two rates meet (illustrative)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.9, h: 3.4, xmin: 0, xmax: 10, xstep: 2, ymin: 0, ymax: 10, ystep: 2, xlabel: 'time', ylabel: 'rate of reaction', grid: false, fmt: () => '', yfmt: () => '' };
    axes(s, g);
    fnLine(s, g, t => 4 + 5.5 * Math.exp(-t / 1.6), 0, 10, 60, C.red, 2.5);
    fnLine(s, g, t => 4 - 4 * Math.exp(-t / 1.6), 0, 10, 60, '1F5F99', 2.5);
    label(s, px(g, 0.4), py(g, 9.3), 1.8, '**forward**', { size: 11, h: 0.28, color: C.red, align: 'left' });
    label(s, px(g, 0.6), py(g, 1.5), 1.8, '**backward**', { size: 11, h: 0.28, color: '1F5F99', align: 'left' });
    line(s, px(g, 6), py(g, 0), px(g, 6), py(g, 10), C.grey, 1, { dash: 'dash' });
    label(s, px(g, 6.1), py(g, 6.2), 2.0, 'equilibrium: rates equal', { size: 10, h: 0.5, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'In a **closed system**, a reversible reaction reaches **equilibrium**.',
    'At **dynamic equilibrium** the **forward and backward reactions** are still happening, at the **same rate**.',
    'So the **amounts** (concentrations) of reactants and products stay **constant**, but they are **not** necessarily equal.',
  ],
  worked: { head: 'Explain', q: 'Why is it called "dynamic"?',
    steps: [['Particles', 'molecules keep reacting in both directions'], ['Rates', 'forward rate = backward rate'], ['Answer', 'it looks still, but reactions continue']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why equilibrium can only be reached in a **closed system**.',
  notes: 'QUICK CHECK ANSWER: in an open system products (e.g. gases) escape (1); so the backward reaction cannot happen at the same rate / concentrations cannot stay constant (1).\nGraph is illustrative (shape only). Spec 4.14.',
}), '4.14 Dynamic equilibrium');

// ======================= 19 HABER PROCESS =======================
{
  const s = D.contentHeader('The Haber process', 'Specification 4.15–4.16 • making ammonia: 450 °C, 200 atmospheres, iron catalyst', { tag: '4.15–4.16' });
  const C1 = ['DCE8F7', '7A9CC9'], C2 = ['FFF1D6', 'D9A441'], C3 = ['F9E0DA', 'C2685A'], C4 = ['E1F3E6', '4E9A65'];
  flowBox(s, 0.45, 1.35, 2.5, 0.95, 'Nitrogen', 'from the air (fractional distillation)', C1);
  flowBox(s, 0.45, 2.55, 2.5, 0.95, 'Hydrogen', 'from natural gas (methane)', C1);
  arrow(s, 2.98, 1.82, 3.4, 2.3, C.ink, 2); arrow(s, 2.98, 3.02, 3.4, 2.5, C.ink, 2);
  flowBox(s, 3.45, 1.9, 2.3, 1.05, 'Compressor', 'to 200 atmospheres', C2);
  arrow(s, 5.78, 2.42, 6.2, 2.42, C.ink, 2);
  flowBox(s, 6.25, 1.65, 2.6, 1.55, 'Reactor', '450 °C, iron catalyst; some N₂ and H₂ react', C3);
  arrow(s, 8.88, 2.42, 9.3, 2.42, C.ink, 2);
  flowBox(s, 9.35, 1.9, 2.4, 1.05, 'Cooled', 'ammonia condenses to a liquid', C4);
  arrow(s, 11.78, 2.42, 12.3, 2.42, C.ink, 2); label(s, 11.75, 2.55, 1.15, 'liquid NH₃', { size: 10.5, h: 0.3, bold: true });
  line(s, 10.55, 2.95, 10.55, 3.75, '1F5F99', 2); line(s, 10.55, 3.75, 4.6, 3.75, '1F5F99', 2); arrow(s, 4.6, 3.75, 4.6, 2.98, '1F5F99', 2);
  label(s, 5.4, 3.78, 4.5, 'unreacted N₂ and H₂ recycled', { size: 10.5, h: 0.3, color: '1F5F99' });
  eqn(s, 0.45, 4.25, 6.0, EQ.Haber, { size: 15 });
  D.card(s, 6.75, 4.2, 6.13, 2.05, 'Key points', [
    'Forward reaction is **exothermic**; the reaction is **reversible** and reaches **dynamic equilibrium**.',
    'Conditions to recall: **450 °C**, **200 atmospheres**, **iron catalyst**.',
    'Ammonia is used to make **fertilisers**.',
  ], { size: 11.5 });
  D.card(s, 0.45, 4.85, 6.0, 1.4, 'Why recycle?', ['Only some of the nitrogen and hydrogen reacts each time; recycling the unreacted gases avoids waste.'], { size: 11.5 });
  D.quickCheck(s, 'State the **temperature**, **pressure** and **catalyst** used in the Haber process.');
  D.notes(s, 'QUICK CHECK ANSWER: 450 °C (1); 200 atmospheres (1); iron (1).\nSpec 4.15–4.16.');
  reg(s, '4.15–4.16 The Haber process');
}

// ======================= 20 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 4.13–4.16 • reversible reactions and the Haber process', [
  { q: 'Describe what happens when blue hydrated copper sulfate is heated, then water is added to the product.', marks: 2, ms: 'Turns white when heated / water given off (1); turns blue again (and heats up) when water is added (1).' },
  { q: 'State **two** features of a **dynamic equilibrium**.', marks: 2, ms: 'Forward and backward rates are equal (1); concentrations of reactants and products stay constant (1).' },
  { q: 'Name the raw materials for the nitrogen and the hydrogen in the Haber process.', marks: 2, ms: 'Air (1); natural gas / methane (1).' },
  { q: 'Write the balanced equation for the Haber process with state symbols.', marks: 1, ms: `${EQ.Haber} (1).` },
]);
reg(R4.s, 'Recap 4');

// ======================= 21 CHANGING THE POSITION OF EQUILIBRIUM (HT) =======================
{
  const s = D.contentHeader('Changing the position of equilibrium', 'Specification 4.17 • the equilibrium shifts to oppose the change', { ht: true, tag: '4.17' });
  const rows = [[HDR('Change'), HDR('Equilibrium shifts…'), HDR(`Effect on ${EQ.Haber}`)],
    ...[['Increase temperature', 'in the **endothermic** direction', 'shifts left: **less** NH₃ (forward is exothermic)'],
      ['Decrease temperature', 'in the **exothermic** direction', 'shifts right: **more** NH₃'],
      ['Increase pressure (gases)', 'to the side with **fewer gas molecules**', '4 molecules → 2: shifts right: **more** NH₃'],
      ['Decrease pressure', 'to the side with **more gas molecules**', 'shifts left: **less** NH₃'],
      ['Add more reactant', 'to use it up: **towards products**', 'more N₂ added: shifts right'],
      ['Remove product', 'to replace it: **towards products**', 'NH₃ removed by cooling: shifts right'],
      ['Add a catalyst', '**no shift**: equilibrium is reached faster', 'iron: faster, same yield']].map((r, i) => r.map((c, j) => tcell(c.replace(/\*\*/g, ''), i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [3.0, 4.3, 5.13], rowH: 0.48, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 5.3, 12.43, 0.95, 'Example', [`${EQ.NO2} (brown ⇌ colourless; forward exothermic): increasing pressure shifts right (2 → 1 gas molecules): the colour gets **paler**.`], { size: 11.5 });
  D.quickCheck(s, 'Predict the effect of **lowering the pressure** on the equilibrium 2NO₂ ⇌ N₂O₄. Explain.');
  D.notes(s, 'QUICK CHECK ANSWER: shifts left / towards NO₂ (1); the side with more gas molecules (2 v 1) (1); the mixture becomes darker brown.\nGas molecule counts are checked in node from the equation data (Haber 4 → 2; NO₂ 2 → 1). Spec 4.17 (Higher only).');
  reg(s, '4.17 Shifting equilibrium (HT)');
}

// ======================= 22 HABER COMPROMISE (HT) =======================
reg(D.contentSlide({
  title: 'Choosing the Haber conditions',
  subtitle: 'Specification 4.16–4.17 • yield, rate and cost: a compromise', ht: true,
  tag: '4.16–4.17', caption: 'equilibrium yield of ammonia: shape only (illustrative, not real data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.9, h: 3.4, xmin: 300, xmax: 600, xstep: 50, ymin: 0, ymax: 80, ystep: 20, xlabel: 'temperature (°C)', ylabel: 'yield of NH₃', grid: true, yfmt: () => '' };
    axes(s, g);
    [[400, 'E04848', '400 atm'], [200, '7B4FB8', '200 atm'], [100, '1F5F99', '100 atm']].forEach(([P, col, t], i) => { fnLine(s, g, T => yieldIll(T, P), 300, 600, 60, col, 2.25); label(s, px(g, 305), py(g, yieldIll(305, P)) - 0.3 + i * 0.02, 1.2, `**${t}**`, { size: 10, h: 0.26, color: col, align: 'left' }); });
    line(s, px(g, 450), py(g, 0), px(g, 450), py(g, 80), C.orange, 1.5, { dash: 'dash' });
    label(s, px(g, 455), py(g, 74), 1.5, '450 °C', { size: 10, h: 0.26, color: C.orange, bold: true, align: 'left' });
  },
  head: 'Why 450 °C and 200 atm?',
  lines: [
    '**Temperature:** a **lower** temperature gives a **higher yield** (forward reaction exothermic) but the rate is **too slow**. 450 °C is a **compromise** between rate and yield.',
    '**Pressure:** a **higher** pressure gives a higher yield (fewer gas molecules on the right) and a faster rate, but **costs more** and is more **dangerous**. 200 atm is a compromise.',
    '**Catalyst:** iron speeds up the reaction; it does **not** change the yield.',
  ],
  worked: { head: 'Explain', q: 'Why not use 1000 atmospheres?',
    steps: [['Yield', 'would increase'], ['But', 'very expensive equipment and energy; safety risk'], ['Answer', 'extra yield not worth the cost']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why the Haber process is not run at **200 °C**, even though the yield would be higher.',
  notes: 'QUICK CHECK ANSWER: the rate would be too slow (1); so less ammonia is made per hour / not economical (1).\nThe graph uses an illustrative function asserted to fall with temperature and rise with pressure; it is NOT real data and has no y-axis numbers. Spec 4.16–4.17.',
}), '4.16–4.17 Haber conditions (HT)');

// ======================= 23 RECAP 5 (HT) =======================
const R5 = D.recapSlide(5, 'Specification 4.17 • equilibrium position (Higher)', [
  { q: 'Predict the effect of **increasing the temperature** on the yield of ammonia. Explain.', marks: 2, ms: 'Yield decreases / equilibrium shifts left (1); the forward reaction is exothermic, so the endothermic (backward) direction is favoured (1).' },
  { q: 'Explain why **increasing the pressure** increases the yield of ammonia.', marks: 2, ms: 'Equilibrium shifts to the side with fewer gas molecules (1); 2 molecules on the right v 4 on the left (1).' },
  { q: 'State the effect of the **iron catalyst** on the position of equilibrium.', marks: 1, ms: 'No effect (it only increases the rate) (1).' },
  { q: 'More nitrogen is added to the equilibrium mixture. Predict the effect on the amount of ammonia.', marks: 2, ms: 'Increases (1); equilibrium shifts right to use up the added nitrogen (1).' },
], { ht: true });
reg(R5.s, 'Recap 5 (HT)');

// ======================= 24 EQUATION BANK =======================
{
  const s = D.contentHeader('Summary: Topic 4 equations', 'Specification 4.1–4.17 • every equation checked for atoms and charges', { tag: 'Equation bank' });
  const bank = [
    ['Metal + water', EQ['Na+H2O'], '4.1'], ['Metal + acid', EQ['Mg+HCl'], '4.1'], ['Displacement', EQ['Mg+CuSO4'], '4.1'],
    ['Displacement (ionic, HT)', EQ['Mg+Cu ionic'], '4.2'], ['Half equations (HT)', `${EQ['Mg ox']};   ${EQ['Cu red']}`, '4.2'],
    ['Reduction with carbon', EQ['Fe2O3+C'], '4.6–4.7'], ['Blast furnace', EQ['Fe2O3+CO'], '4.7'], ['Electrolysis of Al₂O₃', EQ['Al2O3'], '4.7'],
    ['Reversible', EQ['CuSO4 hyd'], '4.13'], ['Haber process', EQ.Haber, '4.15'],
  ];
  const rows = [[HDR('Type'), HDR('Equation'), HDR('Spec')], ...bank.map(([a, b, c2], i) => [tcell(a, i, { bold: true }), tcell(b, i, { bold: true, color: C.ink, fontSize: 12.5 }), tcell(c2, i, { color: C.blue, align: 'center' })])];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [3.0, 8.03, 1.4], rowH: 0.43, fontFace: 'Calibri', fontSize: 11.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, 'Cover the Equation column. Write each equation from memory, then check **atoms**, **charges** and **state symbols**.');
  D.notes(s, 'Retrieval grid. Full list of equations asserted in build_T4.js:\n' + EQLIST.join('\n'));
  reg(s, 'Summary: equations');
}

// ======================= 25 KEY WORDS =======================
reg(D.keyWords([
  ['Reactivity series', 'Metals in order of reactivity.'],
  ['Displacement', 'More reactive metal pushes out a less reactive one.'],
  ['Ore', 'Rock with enough metal compound to extract economically.'],
  ['Oxidation', 'Gain of oxygen (HT: loss of electrons).'],
  ['Reduction', 'Loss of oxygen (HT: gain of electrons).'],
  ['Redox (HT)', 'Oxidation and reduction together.'],
  ['Spectator ion (HT)', 'Ion that does not change in a reaction.'],
  ['Electrolysis', 'Using electricity to extract reactive metals.'],
  ['Bioleaching (HT)', 'Bacteria produce a solution of metal ions.'],
  ['Phytoextraction (HT)', 'Plants absorb metal; ash is processed.'],
  ['Recycling', 'Melting and reusing metal: saves energy and ores.'],
  ['Life cycle assessment', 'Environmental impact from raw materials to disposal.'],
  ['Reversible reaction', 'Products can react to re-form reactants: ⇌.'],
  ['Dynamic equilibrium', 'Forward rate = backward rate; amounts constant.'],
  ['Haber process', 'N₂ + 3H₂ ⇌ 2NH₃; 450 °C, 200 atm, iron.'],
  ['Le Chatelier (HT)', 'Equilibrium shifts to oppose a change.'],
], { notes: 'Cover-and-recall activity. HT terms marked (HT).' }), 'Summary: key words');

// ======================= 26 FULL QUESTION =======================
reg(D.fullQuestion('A student adds four metals, W, X, Y and Z, to copper sulfate solution and to dilute hydrochloric acid.', [
  { l: 'a', q: 'Metal Y does not react with either solution. Suggest which metal Y could be. Explain.', marks: 2, ms: 'Silver or gold (or copper is not allowed as it is in the salt) (1); less reactive than copper and hydrogen (1).' },
  { l: 'b', q: 'Magnesium reacts with copper sulfate solution. Give **two** observations.', marks: 2, ms: 'Any two: pink/brown solid (copper) forms (1); blue colour fades (1); temperature rises / fizzing (1).' },
  { l: 'c', q: '**HT** Write the ionic equation for (b) and explain why it is a **redox** reaction.', marks: 3, ht: true, ms: `${EQ['Mg+Cu ionic']} (1); magnesium loses electrons / is oxidised (1); copper ions gain electrons / are reduced (1).`, h: 1.15 },
  { l: 'd', q: 'Iron is extracted by heating iron oxide with carbon. Explain why aluminium cannot be extracted this way.', marks: 2, ms: 'Aluminium is more reactive than carbon (1); so carbon cannot reduce it / remove the oxygen; electrolysis is needed (1).' },
  { l: 'e', q: 'In the Haber process, ' + EQ.Haber + '. State what is meant by **dynamic equilibrium**.', marks: 2, ms: 'Forward and backward reactions happen at the same rate (1); amounts / concentrations stay constant (1).', h: 1.1 },
  { l: 'f', q: '**HT** Explain why a pressure of 200 atm is chosen rather than a higher one.', marks: 2, ht: true, ms: 'Higher pressure would increase yield (fewer gas molecules on the right) (1); but costs more / more dangerous equipment, so 200 atm is a compromise (1).' },
], 13, { ht: true, subtitle: 'Specification 4.1–4.17 • answer every part • 13 marks (parts c and f are HT)' }), 'Full question');

// ======================= 27–28 HOMEWORK =======================
const HW = [
  { n: '1', q: 'What is **reduction** in terms of oxygen?', marks: 1, ms: 'Loss of oxygen (1).', h: 0.7 },
  { n: '2', q: 'Predict whether **zinc** reacts with **iron sulfate** solution. Write the word equation if it does.', marks: 2, ms: 'Yes, zinc is more reactive (1); zinc + iron sulfate → zinc sulfate + iron (1).', h: 0.85 },
  { n: '3', q: '**HT** Write the two half equations for ' + EQ['Fe+Cu ionic'] + ' and label oxidation and reduction.', marks: 3, ht: true, ms: `${EQ['Fe ox']}: oxidation (1)(1 for equation); ${EQ['Cu red']}: reduction (1).`, h: 1.05 },
  { n: '4', q: 'State the **three** conditions for the Haber process.', marks: 3, ms: '450 °C (1); 200 atmospheres (1); iron catalyst (1).', h: 0.85 },
  { n: '5', q: '**HT** Predict and explain the effect of **lowering the temperature** on the yield of ammonia.', marks: 2, ht: true, ms: 'Yield increases (1); forward reaction is exothermic, so equilibrium shifts right / in the exothermic direction (1).', h: 0.9 },
  { n: '6', q: 'Copper is extracted from ores. Evaluate the advantages and disadvantages of **recycling copper** compared with extracting it from ore.', marks: 6, levels: true, h: 1.45, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Recycling uses less energy than mining, transporting and extracting copper from ore.',
    'So less fossil fuel is burned and less carbon dioxide is released.',
    'Conserves finite / limited copper ores for the future.',
    'Less mining: less damage to landscapes and habitats; less waste rock and noise.',
    'Less copper waste in landfill.',
    'Disadvantages: scrap must be collected, transported and sorted, which costs money and energy.',
    'Recycled copper may contain impurities and need purifying (electrolysis).',
    'Judgement: overall recycling is better when collection costs are lower than extraction costs.',
  ], 'Level 3 answers give advantages AND disadvantages (economic and environmental) and reach a reasoned judgement.');
}
D.homework('Answer every question. Questions 3 and 5 are Higher tier. Include state symbols in equations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 26 && D.slideNo <= 36, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T4_MetalsEquilibria.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
