// build_T7.js — Edexcel GCSE Chemistry 1CH0 Topic 7 Rates of reaction and energy changes (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T7.js
// Structure copied from build_T3.js / build_T6.js. edx_chem_template.js is NOT edited: the equation checker and
// glassware helpers are spliced in from build_T3.js; T7 helpers (gas syringe, reaction profile, particles) are below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 7,
  title: 'Rates of reaction and energy changes',
  shortTitle: 'T7',
  subtitle: 'Collision theory, measuring rates, catalysts, reaction profiles and bond energies',
  specRange: '7.1–7.15',
  pOnly: [],
  paper: 'Paper 2',
  keywords: ['Collision theory', 'Rate', 'Catalysts', 'Exothermic', 'Endothermic', 'Bond energies'],
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



// --- Topic 7 equations ---
eq('CaCO3+HCl', [[1, 'CaCO3', 's'], [2, 'HCl', 'aq']], [[1, 'CaCl2', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('thio', [[1, 'Na2S2O3', 'aq'], [2, 'HCl', 'aq']], [[2, 'NaCl', 'aq'], [1, 'SO2', 'g'], [1, 'S', 's'], [1, 'H2O', 'l']]);
eq('H2O2', [[2, 'H2O2', 'aq']], [[2, 'H2O', 'l'], [1, 'O2', 'g']]);
eq('Mg+HCl', [[1, 'Mg', 's'], [2, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]);
eq('NaOH+HCl', [[1, 'NaOH', 'aq'], [1, 'HCl', 'aq']], [[1, 'NaCl', 'aq'], [1, 'H2O', 'l']]);
eq('Zn+CuSO4', [[1, 'Zn', 's'], [1, 'CuSO4', 'aq']], [[1, 'ZnSO4', 'aq'], [1, 'Cu', 's']]);
eq('AgCl ppt', [[1, 'AgNO3', 'aq'], [1, 'NaCl', 'aq']], [[1, 'AgCl', 's'], [1, 'NaNO3', 'aq']]);
eq('H2+Cl2', [[1, 'H2', 'g'], [1, 'Cl2', 'g']], [[2, 'HCl', 'g']]);
eq('CH4 burn', [[1, 'CH4', 'g'], [2, 'O2', 'g']], [[1, 'CO2', 'g'], [2, 'H2O', 'g']]);
eq('Haber', [[1, 'N2', 'g'], [3, 'H2', 'g']], [[2, 'NH3', 'g']], { rev: true });
eq('H2+Br2', [[1, 'H2', 'g'], [1, 'Br2', 'g']], [[2, 'HBr', 'g']]);
eq('CaCO3 heat', [[1, 'CaCO3', 's']], [[1, 'CaO', 's'], [1, 'CO2', 'g']]);

// ======================= CALCULATIONS (asserted) =======================
// surface area : volume
const sav = (a, n) => [n * 6 * a * a, n * a * a * a];
const [sa1, v1] = sav(2, 1), [sa2, v2] = sav(1, 8);
calc('2 cm cube SA', sa1, 24); calc('2 cm cube V', v1, 8); calc('8 × 1 cm cubes SA', sa2, 48); calc('8 × 1 cm cubes V', v2, 8);
calc('SA:V big', sa1 / v1, 3); calc('SA:V small', sa2 / v2, 6);
// CP 7.1a: excess marble chips with 20.0 cm³ of HCl; CO2 volume from the equation, 24 dm³ per mole
const VMAX = c => c * 0.0200 / 2 * 24000;
calc('Vmax 0.20 mol/dm³', VMAX(0.20), 48, 1e-9); calc('Vmax 0.10 mol/dm³', VMAX(0.10), 24, 1e-9);
const TAU = { 0.20: 30, 0.10: 60 };
const Vt = (c, t) => VMAX(c) * (1 - Math.exp(-t / TAU[c]));
const TT = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180];
const DATA = { 0.20: TT.map(t => Math.round(Vt(0.20, t))), 0.10: TT.map(t => Math.round(Vt(0.10, t))) };
assert.deepStrictEqual(DATA[0.20], [0, 23, 35, 42, 45, 46, 47, 48, 48, 48]);
assert.deepStrictEqual(DATA[0.10], [0, 7, 12, 15, 18, 19, 21, 22, 22, 23]);
calc('mean rate 0.20 first 60 s (2 s.f.)', sf(DATA[0.20][3] / 60, 2), 0.70, 1e-12);
calc('mean rate 0.10 first 60 s (2 s.f.)', sf(DATA[0.10][3] / 60, 2), 0.25, 1e-12);
calc('initial rate 0.20 (tangent at 0)', VMAX(0.20) / TAU[0.20], 1.6, 1e-12);
calc('initial rate 0.10 (tangent at 0)', VMAX(0.10) / TAU[0.10], 0.4, 1e-12);
calc('tangent at 30 s, 0.20', Math.round(VMAX(0.20) / TAU[0.20] * Math.exp(-1) * 100) / 100, 0.59, 1e-12);
// CP 7.1b: thiosulfate times (illustrative: time halves for each 10 °C rise)
const THIO = [[20, 120], [30, 60], [40, 30], [50, 15]];
THIO.forEach(([T0, t], i) => { if (i) calc('thio halves ' + T0, THIO[i - 1][1] / t, 2); });
calc('1/t at 40 °C (×1000)', 1000 / 30, 33.33, 0.01);
// mean rate from mass loss (QC)
calc('mass loss rate', 0.88 / 40, 0.022, 1e-12);
// bond energies (kJ/mol, data book values)
const BE = { 'H–H': 436, 'Cl–Cl': 243, 'H–Cl': 432, 'C–H': 413, 'O=O': 498, 'C=O': 805, 'O–H': 464, 'N≡N': 945, 'N–H': 391, 'H–Br': 366, 'Br–Br': 193 };
const dH = (broken, made) => broken.reduce((a, [n, b]) => a + n * BE[b], 0) - made.reduce((a, [n, b]) => a + n * BE[b], 0);
calc('ΔH H2 + Cl2', dH([[1, 'H–H'], [1, 'Cl–Cl']], [[2, 'H–Cl']]), -185);
calc('broken H2 + Cl2', 436 + 243, 679); calc('made 2HCl', 2 * 432, 864);
calc('ΔH CH4', dH([[4, 'C–H'], [2, 'O=O']], [[2, 'C=O'], [4, 'O–H']]), -818);
calc('broken CH4', 4 * 413 + 2 * 498, 2648); calc('made CH4', 2 * 805 + 4 * 464, 3466);
calc('ΔH Haber', dH([[1, 'N≡N'], [3, 'H–H']], [[6, 'N–H']]), -93);
calc('ΔH HBr', dH([[1, 'H–H'], [1, 'Br–Br']], [[2, 'H–Br']]), -103);
// temperature changes (illustrative practical values)
const TEMPS = [['NaOH + HCl (neutralisation)', 21.0, 27.5], ['Zn + CuSO₄ (displacement)', 21.0, 30.0], ['NH₄NO₃ dissolving', 21.0, 14.5], ['AgNO₃ + NaCl (precipitation)', 21.0, 21.5]];
calc('ΔT neutralisation', 27.5 - 21.0, 6.5, 1e-9); calc('ΔT NH4NO3', 14.5 - 21.0, -6.5, 1e-9);

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


// ======================= T7 drawing helpers =======================
function eqLine(s, x, y, w, key, o = {}) { eqn(s, x, y, w, EQ[key], Object.assign({ size: 11.5 }, o)); }
function gasSyringe(s, x, y, w, vol, vmax) {
  box(s, x, y, w, 0.42, GLASS, C.ink, { lw: 1.25 });
  const pw = w * Math.min(1, vol / vmax);
  if (pw > 0) box(s, x, y + 0.02, pw, 0.38, 'F4F8FC', null);
  box(s, x + pw, y + 0.04, 0.07, 0.34, '6B7385', '4A4F5A');
  line(s, x + pw + 0.07, y + 0.21, x + w + 0.5, y + 0.21, '6B7385', 3);
  box(s, x + w + 0.5, y + 0.05, 0.08, 0.32, '6B7385', '4A4F5A');
  for (let k = 1; k < 10; k++) line(s, x + w * k / 10, y, x + w * k / 10, y + (k % 5 ? 0.08 : 0.14), C.ink, 0.6);
}
function chips(s, cx, y, n = 6) { for (let k = 0; k < n; k++) poly(s, [[cx - 0.3 + k * 0.11, y], [cx - 0.22 + k * 0.11, y - 0.1], [cx - 0.14 + k * 0.11, y - 0.02], [cx - 0.18 + k * 0.11, y + 0.04]], 'F4F4F4', '9AA3B0', { lw: 0.5 }); }
function particles(s, x, y, w, h, n, col, o = {}) {
  box(s, x, y, w, h, 'FFFFFF', '6B7385', { lw: 1.25 });
  for (let k = 0; k < n; k++) {
    const px0 = x + 0.18 + ((k * 0.618034) % 1) * (w - 0.36), py0 = y + 0.18 + ((k * 0.381966 + k * k * 0.01) % 1) * (h - 0.36);
    ball(s, px0, py0, 0.08, col[0], col[1], 0.75);
    if (o.arrows) arrow(s, px0 + 0.09, py0, px0 + 0.09 + o.arrows * (k % 2 ? 1 : 0.7), py0 - o.arrows * 0.5 * (k % 3 - 1), '8A8F99', 1);
  }
}
// reaction profile on axes g: reactant level r, product level pr, peak level pk (data units, x in 0..10)
function profile(s, g, r, pr, pk, col = C.ink, o = {}) {
  const sm = x => (x <= 3 ? 0 : x >= 7 ? 1 : (1 - Math.cos(Math.PI * (x - 3) / 4)) / 2);
  const bump = x => Math.exp(-Math.pow((x - 5) / 1.1, 2));
  const mid = r + (pr - r) * 0.5;
  const f = x => r + (pr - r) * sm(x) + (pk - mid) * bump(x);
  fnLine(s, g, f, 0.5, 9.5, 80, col, o.w || 2.5);
  return f;
}
const CA = ['B9E0A8', '3E7F2E'], CB = ['F6B0A8', 'B7372B'];
const STA = ['AED4F2', '2F6DB5'];

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Rates and energy',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • collision theory, rates, catalysts, energy changes, bond energies` },
    { icon: 'CP', text: 'Core Practical 7.1: rate by gas volume (marble chips) and by colour change (thiosulfate)' },
    { icon: 'H', text: 'Higher & Foundation in one deck • tangents and bond energy calculations are HT' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 7 Rates of reaction and energy changes (Paper 2). Core Practical 7.1 (two parts). Higher-only (HT pill, medium confidence): rate as the gradient of a tangent; 7.14 bond energy calculations. Chemistry-only: none believed (shared with 1SC0). Numbering reconstructed: see SPEC_T7.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '7.3', text: 'Explain reactions using **collision theory**: frequency and energy of collisions.' },
  { code: '7.4', text: 'Explain the effect of **temperature**, **concentration**, **surface area** and **pressure**.' },
  { code: '7.1–7.2 CP', text: '**Core Practical:** measure rate by **gas volume** and by **colour change**; suggest methods.' },
  { code: '7.5–7.6', text: 'Interpret **graphs** and calculate **mean rate**.' },
  { code: '7.6', text: 'Find a rate from the gradient of a **tangent**.', ht: true },
  { code: '7.7–7.9', text: 'Explain **catalysts** using **activation energy**; enzymes.' },
  { code: '7.10–7.13, 7.15', text: 'Describe **exothermic** and **endothermic** changes; draw **reaction profiles**; bonds broken and made.' },
  { code: '7.14', text: 'Calculate energy changes from **bond energies**.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT: tangents (rate at an instant) and 7.14 bond energy calculations (medium confidence).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 7 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['7.3–7.4', 'Collision theory and factors affecting rate', 'BOTH COURSES', C.blue],
    ['7.1–7.2', 'Core Practical: measuring rates', 'CORE PRACTICAL', C.orange],
    ['7.5–7.6', 'Rate graphs, mean rate (tangents HT)', 'BOTH COURSES', C.blue],
    ['7.7–7.9', 'Catalysts and enzymes', 'BOTH COURSES', C.blue],
    ['7.10–7.12', 'Exothermic, endothermic, reaction profiles', 'BOTH COURSES', C.blue],
    ['7.13, 7.15', 'Bonds broken and made; activation energy', 'BOTH COURSES', C.blue],
    ['7.14', 'Bond energy calculations', 'HIGHER ONLY', C.red],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 7\nRates and energy', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'CORE PRACTICAL' ? C.cream : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 2 particle model • Topic 4 Haber and catalysts • Topic 5 gas volumes', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1CH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 6–9.',
      'Combined Science 1SC0 tests the **same** Topic 7 statements.',
      'Core Practical **7.1**: method, graphs, rate calculations, evaluation.',
      'Explanations must mention **frequency** and/or **energy** of collisions.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**HT** pill: rate from a tangent; energy change from bond energies.',
      '**No chemistry-only** statements believed in Topic 7.',
      'Every equation, graph and calculation is **checked**.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'HT: tangents and 7.14 (medium confidence). Chemistry-only: none (medium). Numbering reconstructed: see SPEC_T7.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 2 • particles', q: 'Describe the movement of particles in a **gas**.' },
  { from: 'Topic 3 • acids', q: 'Name the gas made when an acid reacts with a **carbonate**. Give its test.' },
  { from: 'Topic 4 • Haber', q: 'What does the **iron catalyst** do in the Haber process?' },
  { from: 'Topic 5 • gas volume (HT)', q: 'What volume does **1 mole** of gas occupy at rtp?' },
  { from: 'Maths • gradient', q: 'Find the gradient of a line through (0, 0) and (20, 50).' },
  { from: 'KS3 • energy', q: 'What happens to the temperature of the surroundings in an **exothermic** reaction?' },
], { subtitle: 'Recall from KS3 and Topics 2–5 • 6 minutes • no notes', notes: 'ANSWERS\n1. Fast, random movement in all directions, far apart.\n2. Carbon dioxide; turns limewater milky / cloudy.\n3. Speeds up the reaction (reaches equilibrium faster) without being used up.\n4. 24 dm³.\n5. 2.5.\n6. It rises.' }), 'Retrieval starter');

// ======================= 5 COLLISION THEORY =======================
reg(D.contentSlide({
  title: 'Collision theory',
  subtitle: 'Specification 7.3 • particles must collide with enough energy',
  tag: '7.3', caption: 'only collisions with at least the activation energy are successful',
  draw: (s, p) => {
    [[0.8, 'too little energy: they bounce apart', false], [3.7, 'enough energy: they react', true]].forEach(([x, t, ok]) => {
      box(s, x, 1.6, 2.6, 2.6, 'FFFFFF', '6B7385', { lw: 1.25 });
      ball(s, x + 0.75, 2.75, 0.22, CA[0], CA[1], 1); ball(s, x + 1.85, 2.75, 0.22, CB[0], CB[1], 1);
      arrow(s, x + 0.25, 2.75, x + 0.5, 2.75, C.ink, ok ? 3 : 1.25); arrow(s, x + 2.35, 2.75, x + 2.1, 2.75, C.ink, ok ? 3 : 1.25);
      if (ok) { ball(s, x + 1.1, 3.6, 0.2, CA[0], CA[1], 1); ball(s, x + 1.48, 3.6, 0.2, CB[0], CB[1], 1); label(s, x + 0.2, 3.85, 2.2, 'product', { size: 10, h: 0.26, color: C.green, bold: true }); }
      else { arrow(s, x + 0.75, 3.1, x + 0.45, 3.6, '8A8F99', 1.25); arrow(s, x + 1.85, 3.1, x + 2.15, 3.6, '8A8F99', 1.25); }
      label(s, x, 4.3, 2.6, t, { size: 10.5, h: 0.5, color: ok ? C.green : C.red, bold: true });
    });
    label(s, 0.7, 5.0, 5.8, 'rate depends on the **frequency** of collisions and the **energy** of collisions', { size: 11, h: 0.5 });
  },
  head: 'Key ideas',
  lines: [
    'Reactions happen when particles **collide**.',
    'Only collisions with at least the **activation energy** (the minimum energy needed) are **successful**.',
    'The **rate** increases if collisions happen **more often** (higher frequency) or with **more energy** (more are successful).',
    'Rate = how fast reactants are used up or products are made.',
  ],
  worked: { head: 'Explain', q: 'Why do most collisions NOT lead to a reaction?',
    steps: [['Energy', 'most collisions have less than the activation energy'], ['Answer', 'the particles just bounce apart']], size: 11 },
  workedH: 1.5,
  qc: 'Define **activation energy**.',
  notes: 'QUICK CHECK ANSWER: the minimum energy that particles need when they collide in order to react (1).\nSpec 7.3 (and 7.15).',
}), '7.3 Collision theory');

// ======================= 6 TEMPERATURE AND CONCENTRATION =======================
reg(D.contentSlide({
  title: 'Temperature and concentration',
  subtitle: 'Specification 7.4 • frequency and energy of collisions',
  tag: '7.4', caption: 'left: low and high concentration; right: low and high temperature (arrows = speed)',
  draw: (s, p) => {
    label(s, 0.7, 1.45, 2.8, '**Concentration**', { size: 12, h: 0.3, color: C.blue });
    particles(s, 0.75, 1.85, 1.3, 1.3, 5, STA); particles(s, 2.2, 1.85, 1.3, 1.3, 14, STA);
    label(s, 0.75, 3.2, 1.3, 'dilute', { size: 10, h: 0.26 }); label(s, 2.2, 3.2, 1.3, 'concentrated', { size: 10, h: 0.26 });
    label(s, 3.75, 1.45, 2.8, '**Temperature**', { size: 12, h: 0.3, color: C.red });
    particles(s, 3.8, 1.85, 1.3, 1.3, 7, CB, { arrows: 0.12 }); particles(s, 5.25, 1.85, 1.3, 1.3, 7, CB, { arrows: 0.3 });
    label(s, 3.8, 3.2, 1.3, 'cold', { size: 10, h: 0.26 }); label(s, 5.25, 3.2, 1.3, 'hot', { size: 10, h: 0.26 });
    box(s, 0.7, 3.7, 5.9, 1.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.85, 3.75, 5.6, '**Higher concentration** (or gas **pressure**): more particles in the same volume → **more frequent** collisions.\n**Higher temperature**: particles move faster → **more frequent** collisions AND **more energetic** ones: more exceed the activation energy.', { size: 10.5, h: 1.5, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    '**Concentration** (solutions) and **pressure** (gases): more particles per unit volume, so collisions are **more frequent**.',
    '**Temperature**: particles have more **kinetic energy**: collisions are **more frequent** AND a **greater proportion** have energy ≥ activation energy.',
    'Temperature has the **biggest** effect because both factors increase.',
  ],
  worked: { head: 'Explain', q: 'Why does doubling the concentration of acid increase the rate?',
    steps: [['Particles', 'twice as many acid particles in the same volume'], ['Collisions', 'more frequent collisions with the solid'], ['Answer', 'more successful collisions per second']], size: 11 },
  workedH: 1.75,
  qc: 'Explain, using collision theory, why food goes off **more slowly** in a fridge.',
  notes: 'QUICK CHECK ANSWER: lower temperature: particles move more slowly / less energy (1); fewer collisions per second and fewer with enough energy (activation energy), so a slower rate (1).\nSpec 7.4. Common error: "more collisions" alone (must be "more frequent" / "per second").',
}), '7.4 Temperature and concentration');

// ======================= 7 SURFACE AREA AND PRESSURE =======================
reg(D.contentSlide({
  title: 'Surface area and pressure',
  subtitle: 'Specification 7.4 • surface area to volume ratio of a solid; gas pressure',
  tag: '7.4', caption: 'cutting a 2 cm cube into eight 1 cm cubes doubles the surface area (same volume)',
  draw: (s, p) => {
    const cube = (x, y, a, col) => { box(s, x, y, a, a, col[0], col[1], { lw: 1.25 }); const d = a * 0.35; poly(s, [[x, y], [x + d, y - d], [x + a + d, y - d], [x + a, y]], col[0], col[1], { lw: 1.25 }); poly(s, [[x + a, y], [x + a + d, y - d], [x + a + d, y + a - d], [x + a, y + a]], col[0], col[1], { lw: 1.25 }); };
    cube(0.9, 2.2, 1.6, ['F4F4F4', '6B7385']);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) for (let k = 0; k < 2; k++) cube(3.6 + i * 1.0 + k * 0.25, 2.0 + j * 0.95 - k * 0.25, 0.7, ['F4F4F4', '6B7385']);
    const rows = [[HDR(''), HDR('SA (cm²)'), HDR('V (cm³)'), HDR('SA : V')], [tcell('one 2 cm cube', 0, { bold: true }), tcell(String(sa1), 0, { align: 'center' }), tcell(String(v1), 0, { align: 'center' }), tcell('3 : 1', 0, { align: 'center', bold: true })],
      [tcell('eight 1 cm cubes', 1, { bold: true }), tcell(String(sa2), 1, { align: 'center' }), tcell(String(v2), 1, { align: 'center' }), tcell('6 : 1', 1, { align: 'center', bold: true, color: C.green })]];
    s.addTable(rows, { x: 0.7, y: 4.35, w: 5.8, colW: [2.2, 1.2, 1.2, 1.2], rowH: 0.36, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Key ideas',
  lines: [
    'Breaking a solid into **smaller pieces** (or powder) increases its **surface area to volume ratio**.',
    'More particles are **exposed** on the surface, so collisions are **more frequent**: faster rate.',
    'For **gases**, higher **pressure** puts more particles in the same volume: **more frequent** collisions.',
    'Powders can be dangerous: flour or coal dust can **explode**.',
  ],
  worked: { head: 'Explain', q: 'Why does powdered marble react faster than marble chips?',
    steps: [['SA : V', 'powder has a larger surface area to volume ratio'], ['Collisions', 'more acid particles collide with the surface per second'], ['Answer', 'more frequent successful collisions']], size: 11 },
  workedH: 1.75,
  qc: 'Calculate the SA : V ratio of a **3 cm** cube.',
  notes: 'QUICK CHECK ANSWER: SA = 6 × 9 = 54 cm²; V = 27 cm³ (1); ratio 2 : 1 (1).\nSA:V values checked in node. Spec 7.4.',
}), '7.4 Surface area and pressure');
calc('3 cm cube SA:V', (6 * 9) / 27, 2);

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 7.3–7.4 • collision theory', [
  { q: 'State **two** conditions needed for a collision to be successful.', marks: 2, ms: 'Particles must collide (1); with at least the activation energy (1).' },
  { q: 'Explain why increasing the **temperature** increases the rate of reaction.', marks: 3, ms: 'Particles have more (kinetic) energy / move faster (1); more frequent collisions (1); a greater proportion of collisions have at least the activation energy (1).' },
  { q: 'Explain why increasing the **pressure** of a gas increases the rate.', marks: 2, ms: 'More particles in the same volume (1); more frequent collisions (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 MEASURING RATES =======================
{
  const s = D.contentHeader('Ways to measure the rate of a reaction', 'Specification 7.2 • choose a method that suits the reaction', { tag: '7.2' });
  const cols = [['DCE8F7', '7A9CC9'], ['EFE6FA', 'A58BD1'], ['FFF1D6', 'D9A441'], ['E1F3E6', '4E9A65']];
  const m = [['Gas volume', 'collect gas in a gas syringe or upturned measuring cylinder; read every 10–20 s', 'acid + marble chips; Mg + acid'],
    ['Mass loss', 'flask on a balance with cotton wool in the neck; mass falls as gas escapes', 'acid + marble chips'],
    ['Colour change / precipitate', 'time how long until a cross under the flask disappears', 'thiosulfate + acid'],
    ['Change in pH or temperature', 'data logger with a pH probe or thermometer', 'neutralisation']];
  m.forEach(([h, t, e], i) => {
    const x = 0.45 + i * 3.15;
    box(s, x, 1.35, 2.95, 3.3, cols[i][0], cols[i][1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
    label(s, x + 0.1, 1.45, 2.75, `**${h}**`, { size: 13, h: 0.55 });
    label(s, x + 0.1, 2.05, 2.75, t, { size: 11, h: 1.6, valign: 'top' });
    label(s, x + 0.1, 3.7, 2.75, `e.g. ${e}`, { size: 10.5, h: 0.8, italic: true, color: C.grey, valign: 'top' });
  });
  D.card(s, 0.45, 4.85, 12.43, 1.4, 'Rate', ['**mean rate = amount of product formed ÷ time taken** (or amount of reactant used ÷ time). Units: cm³/s, g/s or 1/time (s⁻¹) for "time until" methods.'], { size: 12 });
  D.quickCheck(s, 'A flask loses **0.88 g** in the first **40 s**. Calculate the mean rate of mass loss.');
  D.notes(s, 'QUICK CHECK ANSWER: 0.88 ÷ 40 (1) = 0.022 g/s (1).\nSpec 7.2.');
  reg(s, '7.2 Measuring rates');
}

// ======================= 10 CP 7.1a METHOD =======================
{
  const s = D.contentSlide({
    title: 'Core Practical: gas volume (method)',
    subtitle: 'Specification 7.1a • marble chips and hydrochloric acid', cp: true,
    tag: '7.1 CP', caption: 'collect carbon dioxide in a gas syringe; read the volume every 20 s',
    draw: (s, p) => {
      conical(s, 1.6, 2.4, 1.4, 2.0, 0.35, ACIDC);
      box(s, 1.42, 2.25, 0.36, 0.22, '5A3E2B', '3A2A1B');
      chips(s, 1.6, 4.25, 6);
      line(s, 1.6, 2.25, 1.6, 1.85, C.ink, 2); line(s, 1.6, 1.85, 2.55, 1.85, C.ink, 2);
      gasSyringe(s, 2.55, 1.64, 2.6, 30, 100);
      label(s, 2.55, 1.15, 2.6, '**gas syringe** (0–100 cm³)', { size: 10.5, h: 0.3 });
      label(s, 0.6, 4.55, 2.2, 'marble chips + 20.0 cm³ HCl', { size: 10, h: 0.5 });
      eqLine(s, 0.65, 5.15, 5.75, 'CaCO3+HCl', { size: 10.5 });
      label(s, 3.4, 2.6, 3.0, '**Variables**\nindependent: acid concentration\ndependent: volume of CO₂\ncontrol: mass and size of chips, volume of acid, temperature', { size: 10, h: 1.6, align: 'left', valign: 'top' });
    },
    head: 'Method',
    lines: [
      '**1** Measure **20.0 cm³** of hydrochloric acid into a conical flask.',
      '**2** Add an **excess** of marble chips, quickly fit the bung and **start the stopwatch**.',
      '**3** Record the gas volume every **20 s** until no more gas is given off.',
      '**4** Repeat with a different **concentration** of acid (same volume, same chips).',
      '**Safety:** eye protection; acid is an irritant.',
    ],
    worked: { head: 'Alternative', q: 'How else could you follow this reaction?',
      steps: [['Mass loss', 'flask on a balance with cotton wool; record mass every 20 s'], ['Why it works', 'CO₂ escapes, so the mass falls']], size: 10.5 },
    workedH: 1.5,
    qc: 'Why must the bung be put in **quickly** after adding the chips?',
    notes: 'QUICK CHECK ANSWER: so no carbon dioxide escapes before it can be collected (1); the measured volume would be too low (1).\nSpec 7.1a Core Practical (PMT "CP rates").',
  });
  reg(s, '7.1a CP method');
}

// ======================= 11 CP 7.1a RESULTS =======================
reg(D.contentSlide({
  title: 'Core Practical: gas volume (results)',
  subtitle: 'Specification 7.1a, 7.5 • interpreting the graph', cp: true,
  tag: '7.1 CP', caption: 'illustrative results; 20.0 cm³ of acid, excess marble chips',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.55, w: 4.8, h: 3.3, xmin: 0, xmax: 180, xstep: 30, ymin: 0, ymax: 50, ystep: 10, xlabel: 'time (s)', ylabel: 'volume of CO₂ (cm³)', grid: true };
    axes(s, g);
    fnLine(s, g, t => Vt(0.20, t), 0, 180, 60, C.red, 2.25); fnLine(s, g, t => Vt(0.10, t), 0, 180, 60, '1F5F99', 2.25);
    points(s, g, TT.map((t, i) => [t, DATA[0.20][i]]), C.red); points(s, g, TT.map((t, i) => [t, DATA[0.10][i]]), '1F5F99');
    label(s, px(g, 95), py(g, 47) - 0.35, 2.2, '**0.20 mol dm⁻³**', { size: 10.5, h: 0.28, color: C.red, align: 'left' });
    label(s, px(g, 95), py(g, 20) - 0.35, 2.2, '**0.10 mol dm⁻³**', { size: 10.5, h: 0.28, color: '1F5F99', align: 'left' });
  },
  head: 'What the graph shows',
  lines: [
    '**Steepest at the start**: most reactant particles, fastest rate.',
    'The curve gets **less steep** as the acid is used up; it goes **flat** when the reaction stops.',
    'The **more concentrated** acid gives a **steeper** curve: faster rate.',
    'It makes **twice the volume** (48 vs 24 cm³): there is twice as much acid, and the acid is the limiting reactant.',
  ],
  worked: { head: 'Mean rate (first 60 s)', q: '',
    steps: [['0.20', `${DATA[0.20][3]} ÷ 60 = 0.70 cm³/s`], ['0.10', `${DATA[0.10][3]} ÷ 60 = 0.25 cm³/s`]], size: 11 },
  workedH: 1.4,
  qc: 'Explain why the curve for 0.20 mol dm⁻³ acid goes **flat** after about 140 s.',
  notes: `QUICK CHECK ANSWER: all the acid has been used up (the chips are in excess) (1); so no more CO₂ is made / the reaction has stopped (1).\nModel data: V = Vmax(1 − e^(−t/τ)), Vmax from the equation (0.20 × 0.0200 ÷ 2 × 24 000 = 48 cm³), τ = 30 s and 60 s; table values asserted. Illustrative, not real readings.\nSpec 7.1a, 7.5.`,
}), '7.1a CP results');

// ======================= 12 CP 7.1b THIOSULFATE =======================
reg(D.contentSlide({
  title: 'Core Practical: colour change',
  subtitle: 'Specification 7.1b • sodium thiosulfate and hydrochloric acid', cp: true,
  tag: '7.1 CP', caption: 'time how long it takes for the cross to disappear; illustrative results',
  draw: (s, p) => {
    box(s, 0.8, 3.15, 1.9, 0.35, 'FFFFFF', '9AA3B0', { lw: 1 });
    line(s, 1.55, 3.22, 1.95, 3.43, C.ink, 2.5); line(s, 1.55, 3.43, 1.95, 3.22, C.ink, 2.5);
    conical(s, 1.75, 1.6, 1.4, 1.55, 0.45, 'F2EFD8');
    ball(s, 1.75, 1.25, 0.12, 'FFFFFF', C.ink, 1); line(s, 1.75, 1.37, 1.75, 1.6, '8A8F99', 1, { dash: 'dash' });
    label(s, 0.6, 3.6, 2.4, 'cloudy sulfur hides the cross', { size: 10, h: 0.3 });
    const g = { x: 3.6, y: 1.55, w: 2.7, h: 2.3, xmin: 15, xmax: 55, xstep: 10, ymin: 0, ymax: 140, ystep: 20, xlabel: 'temperature (°C)', ylabel: 'time (s)', grid: true };
    axes(s, g);
    plotLine(s, g, THIO, C.red, 2); points(s, g, THIO, C.red);
    eqLine(s, 0.65, 4.65, 5.75, 'thio', { size: 10 });
    label(s, 0.65, 5.15, 5.75, 'rate ∝ **1 ÷ time**: at 40 °C, 1 ÷ 30 = 0.033 s⁻¹', { size: 10.5, h: 0.35 });
  },
  head: 'Method',
  lines: [
    'Put a flask of sodium thiosulfate solution on a paper marked with a **cross**.',
    'Add hydrochloric acid, swirl and **start the stopwatch**. Look down through the flask.',
    'Stop the clock when the cross **disappears** (sulfur precipitate makes it cloudy).',
    'Repeat at different **temperatures** (water bath) or concentrations; keep volumes the same.',
    '**Safety:** SO₂ is toxic: ventilated room; asthmatics take care.',
  ],
  worked: { head: 'Results', q: '',
    steps: [['Pattern', 'time halves for each 10 °C rise (illustrative)'], ['Rate', 'shorter time = faster rate']], size: 10.5 },
  workedH: 1.4,
  qc: 'Why is this method less precise than using a gas syringe?',
  notes: 'QUICK CHECK ANSWER: deciding when the cross "disappears" is a judgement / depends on the observer (1); so the timing varies (1). Improvement: use a light sensor and data logger.\nResults illustrative (asserted to halve each 10 °C). Spec 7.1b.',
}), '7.1b CP colour change');

// ======================= 13 RATE FROM GRAPHS =======================
reg(D.contentSlide({
  title: 'Calculating rates from graphs',
  subtitle: 'Specification 7.5–7.6 • mean rate and the rate at an instant',
  tag: '7.5–7.6', caption: 'the 0.20 mol dm⁻³ curve: a chord (mean rate) and a tangent (HT)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.55, w: 4.8, h: 3.4, xmin: 0, xmax: 180, xstep: 30, ymin: 0, ymax: 50, ystep: 10, xlabel: 'time (s)', ylabel: 'volume (cm³)', grid: true };
    axes(s, g);
    fnLine(s, g, t => Vt(0.20, t), 0, 180, 60, C.red, 2.25);
    plotLine(s, g, [[0, 0], [60, DATA[0.20][3]]], '1F5F99', 2);
    const m30 = VMAX(0.20) / TAU[0.20] * Math.exp(-1), v30 = Vt(0.20, 30);
    plotLine(s, g, [[0, v30 - m30 * 30], [60, v30 + m30 * 30]], C.orange, 2);
    points(s, g, [[30, v30]], C.orange);
    label(s, px(g, 62), py(g, 30), 1.6, '**chord**', { size: 10.5, h: 0.28, color: '1F5F99', align: 'left' });
    label(s, px(g, 3), py(g, 49), 1.8, '**tangent at 30 s**', { size: 10.5, h: 0.28, color: C.orange, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    '**Mean rate** = change in amount ÷ time taken = gradient of a straight line (chord) between two points.',
    'First 60 s: 42 ÷ 60 = **0.70 cm³/s**.',
    '**HT:** the rate at a **particular time** = gradient of the **tangent** to the curve at that time.',
    'Draw the tangent touching the curve, make a big triangle, then gradient = rise ÷ run.',
  ],
  worked: { head: 'HT: tangent at 30 s', q: 'Use the tangent to find the rate at 30 s.',
    steps: [['Triangle', 'tangent rises about 17.7 cm³ over 30 s'], ['Gradient', '17.7 ÷ 30'], ['Answer', 'about 0.59 cm³/s (accept a range)']], size: 11 },
  workedH: 1.75,
  qc: 'Is the rate at 30 s **higher or lower** than the mean rate over the first 60 s? Why?',
  notes: 'QUICK CHECK ANSWER: lower (0.59 < 0.70) (1); the rate is highest at the start and falls as acid is used up; 30 s is past the fastest part (1).\nTangent gradient from the model: 48/30 × e⁻¹ = 0.59 cm³/s (checked). In exams a range is accepted for tangents. Spec 7.5–7.6 (tangent HT).',
}), '7.5–7.6 Rates from graphs');

// ======================= 14 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 7.1–7.6 • measuring rates', [
  { q: 'Describe how to measure the rate of reaction between marble chips and acid by **mass loss**.', marks: 3, ms: 'Flask on a balance with cotton wool in the neck (1); record the mass at regular intervals (1); mass falls as CO₂ escapes; rate = mass lost ÷ time (1).' },
  { q: '**45 cm³** of gas is collected in **90 s**. Calculate the mean rate.', marks: 2, ms: '45 ÷ 90 (1); = 0.5 cm³/s (1).' },
  { q: 'Explain why the gradient of a volume–time graph decreases with time.', marks: 2, ms: 'Reactants are used up / concentration falls (1); fewer collisions per second so the rate decreases (1).' },
]);
calc('R2 mean rate', 45 / 90, 0.5, 1e-12);
reg(R2.s, 'Recap 2');

// ======================= 15 CATALYSTS =======================
reg(D.contentSlide({
  title: 'Catalysts',
  subtitle: 'Specification 7.7–7.9 • a different pathway with a lower activation energy',
  tag: '7.7–7.9', caption: 'reaction profile with (green) and without (red) a catalyst',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.8, h: 3.4, xmin: 0, xmax: 10, xstep: 2, ymin: 0, ymax: 10, ystep: 2, xlabel: 'progress of reaction', ylabel: 'energy', grid: false, fmt: () => '', yfmt: () => '' };
    axes(s, g);
    profile(s, g, 4, 2, 9, C.red); profile(s, g, 4, 2, 6.3, C.green, { w: 2 });
    line(s, px(g, 1.2), py(g, 4), px(g, 1.2), py(g, 8.9), C.red, 1.25, { head: true, tail: true });
    label(s, px(g, 0.2), py(g, 7.2), 1.3, 'Ea without', { size: 9.5, h: 0.26, color: C.red, align: 'left' });
    line(s, px(g, 2.4), py(g, 4), px(g, 2.4), py(g, 6.2), C.green, 1.25, { head: true, tail: true });
    label(s, px(g, 2.5), py(g, 5.2), 1.3, 'Ea with', { size: 9.5, h: 0.26, color: C.green, align: 'left' });
    label(s, px(g, 0.6), py(g, 4) + 0.02, 1.3, 'reactants', { size: 10, h: 0.26, align: 'left' });
    label(s, px(g, 8), py(g, 2) + 0.02, 1.3, 'products', { size: 10, h: 0.26, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'A **catalyst** speeds up a reaction **without being used up** or chemically changed.',
    'It provides an **alternative reaction pathway** with a **lower activation energy**, so **more collisions** are successful.',
    'The **overall energy change** is the **same**.',
    '**Enzymes** are biological catalysts, e.g. yeast enzymes in making **alcoholic drinks** (fermentation).',
  ],
  worked: { head: 'Example', q: 'Manganese(IV) oxide and hydrogen peroxide',
    steps: [['Equation', EQ.H2O2], ['Evidence', 'rapid bubbles of oxygen; MnO₂ mass unchanged at the end']], size: 10.5 },
  workedH: 1.5,
  qc: 'How could you show that manganese(IV) oxide is **not used up**?',
  notes: 'QUICK CHECK ANSWER: weigh it before and after the reaction (filter, dry) (1); the mass is unchanged / it can be used again (1).\nProfile drawn qualitatively (no energy values). Spec 7.7–7.9.',
}), '7.7–7.9 Catalysts');

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 7.7–7.9 • catalysts', [
  { q: 'What is a **catalyst**?', marks: 2, ms: 'A substance that speeds up a reaction (1); without being used up / chemically changed (1).' },
  { q: 'Explain how a catalyst increases the rate of reaction.', marks: 2, ms: 'Provides an alternative pathway with a lower activation energy (1); so more collisions are successful (have enough energy) (1).' },
  { q: 'What name is given to biological catalysts? Give **one** use.', marks: 2, ms: 'Enzymes (1); e.g. making alcoholic drinks / fermentation / biological washing powders (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 ENERGY CHANGES =======================
reg(D.contentSlide({
  title: 'Exothermic and endothermic changes',
  subtitle: 'Specification 7.10–7.11 • the temperature of the surroundings',
  tag: '7.10–7.11', caption: 'illustrative temperature changes measured in a polystyrene cup',
  draw: (s, p) => {
    const rows = [[HDR('Change'), HDR('Start (°C)'), HDR('End (°C)'), HDR('Type')], ...TEMPS.map(([n, a, b], i) => [tcell(n, i, { bold: true }), tcell(a.toFixed(1), i, { align: 'center' }), tcell(b.toFixed(1), i, { align: 'center' }), tcell(b > a + 1 ? 'exothermic' : b < a - 1 ? 'endothermic' : 'very small change', i, { bold: true, color: b > a + 1 ? C.red : b < a - 1 ? '1F5F99' : C.grey, align: 'center' })])];
    s.addTable(rows, { x: 0.65, y: 1.55, w: 5.75, colW: [2.65, 0.95, 0.95, 1.2], rowH: 0.5, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    box(s, 1.1, 4.65, 1.0, 0.85, 'F4F4F4', '9AA3B0', { lw: 1 }); box(s, 1.0, 4.53, 1.2, 0.14, 'E8E8E8', '9AA3B0', { lw: 1 });
    box(s, 1.55, 4.2, 0.08, 1.1, 'FFFFFF', '6B7385', { lw: 0.75 }); ball(s, 1.59, 5.3, 0.06, C.red, C.red);
    label(s, 2.35, 4.6, 4.0, 'polystyrene cup + lid: insulates, so less heat is lost or gained', { size: 10.5, h: 0.8, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'Heat energy changes happen when substances **dissolve**, and in **displacement**, **precipitation** and **neutralisation** reactions.',
    '**Exothermic:** energy is transferred **to** the surroundings: **temperature rises** (e.g. neutralisation, combustion).',
    '**Endothermic:** energy is taken **from** the surroundings: **temperature falls** (e.g. dissolving ammonium nitrate, thermal decomposition).',
  ],
  worked: { head: 'Classify', q: 'NaOH + HCl: 21.0 °C → 27.5 °C.',
    steps: [['Change', '+6.5 °C'], ['Answer', 'exothermic: energy given out to the surroundings']], size: 11 },
  workedH: 1.5,
  qc: 'Ammonium nitrate dissolves in water and the temperature falls from 21.0 °C to 14.5 °C. Classify and explain.',
  notes: `QUICK CHECK ANSWER: endothermic (1); energy is taken in from the surroundings (the water), so the temperature falls by 6.5 °C (1).\nEquations: ${EQ['NaOH+HCl']}; ${EQ['Zn+CuSO4']}; ${EQ['AgCl ppt']}. Temperatures illustrative. Spec 7.10–7.11.`,
}), '7.10–7.11 Energy changes');

// ======================= 18 REACTION PROFILES =======================
reg(D.contentSlide({
  title: 'Reaction profiles',
  subtitle: 'Specification 7.12, 7.15 • energy of reactants and products, activation energy',
  tag: '7.12, 7.15', caption: 'left: exothermic; right: endothermic',
  draw: (s, p) => {
    [[0.7, 6, 2.5, 8.7, 'exothermic', C.red], [3.7, 3, 6.5, 9, 'endothermic', '1F5F99']].forEach(([x, r, pr, pk, t, col]) => {
      const g = { x: x + 0.3, y: 1.6, w: 2.4, h: 3.1, xmin: 0, xmax: 10, xstep: 5, ymin: 0, ymax: 10, ystep: 5, xlabel: '', ylabel: 'energy', grid: false, fmt: () => '', yfmt: () => '' };
      axes(s, g);
      profile(s, g, r, pr, pk, col, { w: 2.25 });
      line(s, px(g, 1.6), py(g, r), px(g, 1.6), py(g, pk - 0.1), C.ink, 1, { head: true, tail: true }); label(s, px(g, 0.2), py(g, (r + pk) / 2) - 0.13, 0.5, 'Ea', { size: 10, h: 0.26, bold: true, align: 'left' });
      line(s, px(g, 8.8), py(g, r), px(g, 8.8), py(g, pr), col, 1.25, { head: true, tail: true }); label(s, px(g, 9.0), py(g, (r + pr) / 2) - 0.13, 0.6, 'ΔH', { size: 10, h: 0.26, bold: true, color: col, align: 'left' });
      line(s, px(g, 7), py(g, r), px(g, 9.3), py(g, r), '9AA3B0', 0.75, { dash: 'dash' });
      label(s, x, 4.9, 3.0, `**${t}**`, { size: 12, h: 0.3, color: col });
      label(s, x, 5.2, 3.0, t === 'exothermic' ? 'products lower than reactants' : 'products higher than reactants', { size: 10, h: 0.3 });
    });
  },
  head: 'Key ideas',
  lines: [
    'A **reaction profile** shows the energy of the **reactants** and **products**, the **activation energy** (Ea) and the **overall energy change** (ΔH).',
    '**Activation energy:** the energy from the reactants to the **peak**: the minimum energy needed to react.',
    '**Exothermic:** products **lower** than reactants (energy released).',
    '**Endothermic:** products **higher** than reactants (energy taken in).',
  ],
  worked: { head: 'Draw it', q: 'How do you label a reaction profile?',
    steps: [['Lines', 'reactants and products as levels'], ['Ea', 'arrow from reactants up to the peak'], ['ΔH', 'arrow from reactants to products']], size: 11 },
  workedH: 1.75,
  qc: 'On an exothermic profile, where is the **activation energy** measured from and to?',
  notes: 'QUICK CHECK ANSWER: from the energy of the reactants (1) to the top of the curve / peak (1).\nProfiles are qualitative. Spec 7.12, 7.15.',
}), '7.12, 7.15 Reaction profiles');

// ======================= 19 BOND ENERGIES (HT) =======================
reg(D.contentSlide({
  title: 'Bond breaking, bond making and bond energies',
  subtitle: 'Specification 7.13–7.14 • breaking is endothermic; making is exothermic', ht: true,
  tag: '7.13–7.14', caption: 'H₂ + Cl₂ → 2HCl: energy in to break bonds, energy out to make bonds',
  draw: (s, p) => {
    eqLine(s, 0.75, 1.55, 5.6, 'H2+Cl2', { size: 13 });
    const rows = [[HDR('Bond'), HDR('Energy (kJ/mol)')], ...[['H–H', 436], ['Cl–Cl', 243], ['H–Cl', 432]].map(([b, e], i) => [tcell(b, i, { bold: true }), tcell(String(e), i, { align: 'center' })])];
    s.addTable(rows, { x: 0.75, y: 2.15, w: 2.6, colW: [1.2, 1.4], rowH: 0.38, fontFace: 'Calibri', fontSize: 11.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    const W = 0.0032;
    box(s, 3.7, 2.2, 679 * W, 0.4, 'DCE8F7', '7A9CC9'); label(s, 3.7, 2.2, 679 * W, '**broken: 679**', { size: 10.5, h: 0.4 });
    box(s, 3.7, 2.75, 864 * W, 0.4, 'F9E0DA', 'C2685A'); label(s, 3.7, 2.75, 864 * W, '**made: 864**', { size: 10.5, h: 0.4 });
    label(s, 3.7, 3.25, 2.8, 'bar lengths to scale', { size: 9, h: 0.24, italic: true, color: C.grey, align: 'left' });
    box(s, 0.75, 3.85, 5.6, 1.5, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.85, 3.9, 5.4, '**ΔH = energy to break bonds − energy released making bonds**\n= (436 + 243) − (2 × 432) = 679 − 864 = **−185 kJ/mol**\nnegative = **exothermic**', { size: 11.5, h: 1.4 });
  },
  head: 'Key ideas',
  lines: [
    '**Breaking** bonds needs energy: **endothermic**.',
    '**Making** bonds releases energy: **exothermic**.',
    'If **more energy is released** making bonds than is used breaking them, the reaction is **exothermic** (ΔH negative).',
    '**HT:** use **bond energies** to calculate ΔH.',
  ],
  worked: { head: 'HT worked example', q: 'Calculate ΔH for CH₄ + 2O₂ → CO₂ + 2H₂O (C–H 413, O=O 498, C=O 805, O–H 464).',
    steps: [['Break', '4(413) + 2(498) = 2648'], ['Make', '2(805) + 4(464) = 3466'], ['ΔH', '2648 − 3466 = −818 kJ/mol']], size: 11 },
  workedH: 1.75,
  qc: 'Explain, in terms of bonds, why burning methane is **exothermic**.',
  notes: `QUICK CHECK ANSWER: more energy is released making the new bonds (C=O, O–H) (1) than is needed to break the bonds in the reactants (C–H, O=O) (1).\nBond energies (data book) and all ΔH values checked in node: H₂ + Cl₂ −185; CH₄ −818; Haber −93; HBr −103 kJ/mol. Equation: ${EQ['CH4 burn']}.\nSpec 7.13 (both tiers) and 7.14 (Higher only).`,
}), '7.13–7.14 Bond energies (HT)');

// ======================= 20 BOND ENERGY PRACTICE (HT) =======================
{
  const s = D.contentHeader('Bond energy calculations: practice', 'Specification 7.14 • count every bond, including the balancing numbers', { ht: true, tag: '7.14' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'Calculate ΔH for N₂ + 3H₂ ⇌ 2NH₃.  (N≡N 945, H–H 436, N–H 391 kJ/mol)',
    [['Break', '945 + 3 × 436 = 2253'], ['Make', '2 × 3 × 391 = 2346 (each NH₃ has 3 N–H)'], ['ΔH', '2253 − 2346'], ['Answer', '−93 kJ/mol: exothermic']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** H₂ + Br₂ → 2HBr  (H–H 436, Br–Br 193, H–Br 366). Calculate ΔH.',
    '**2** Is reaction 1 exothermic or endothermic? Explain.',
    '**3** A reaction has bonds broken = 1200 kJ/mol and bonds made = 950 kJ/mol. Calculate ΔH and classify it.',
    '**4** Why must you multiply by the **balancing numbers**?',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'What is the sign of ΔH for an **endothermic** reaction?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) (436 + 193) − (2 × 366) = 629 − 732 = −103 kJ/mol. 2) exothermic: more energy released making bonds than used breaking them. 3) 1200 − 950 = +250 kJ/mol, endothermic. 4) the equation shows how many of each molecule react, so how many of each bond are broken or made.\nQUICK CHECK: positive.\nAll values checked in node.');
  calc('YT3', 1200 - 950, 250);
  reg(s, '7.14 Bond energy practice (HT)');
}

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 7.10–7.15 • energy changes', [
  { q: 'A reaction mixture gets **colder**. Is the reaction exothermic or endothermic? Explain.', marks: 2, ms: 'Endothermic (1); energy is taken in from the surroundings (1).' },
  { q: 'Sketch and label a reaction profile for an **exothermic** reaction.', marks: 3, ms: 'Products lower than reactants (1); curve with a hump; activation energy arrow from reactants to peak (1); ΔH arrow from reactants down to products (1).' },
  { q: 'State whether **bond breaking** is exothermic or endothermic.', marks: 1, ms: 'Endothermic (1).' },
  { q: '**HT** Bonds broken 2648 kJ/mol; bonds made 3466 kJ/mol. Calculate ΔH.', marks: 1, ms: '−818 kJ/mol (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 SUMMARY =======================
{
  const s = D.contentHeader('Summary: rates and energy', 'Specification 7.1–7.15 • every equation and calculation checked', { tag: 'Summary' });
  const rows = [[HDR('Factor'), HDR('Effect on rate'), HDR('Why (collision theory)')],
    ...[['Temperature ↑', 'faster', 'more frequent AND more energetic collisions'], ['Concentration ↑', 'faster', 'more particles per volume: more frequent collisions'],
      ['Pressure ↑ (gases)', 'faster', 'more particles per volume: more frequent collisions'], ['Surface area ↑', 'faster', 'more particles exposed: more frequent collisions'],
      ['Catalyst', 'faster', 'lower activation energy: more successful collisions']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.6, 2.0, 7.83], rowH: 0.43, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 4.05, 6.1, 2.2, 'Rate calculations', ['**mean rate** = change in amount ÷ time', '**HT:** rate at an instant = gradient of the **tangent**', '"time until" methods: rate ∝ **1 ÷ time**'], { size: 12 });
  D.card(s, 6.78, 4.05, 6.1, 2.2, 'Energy', ['**Exothermic**: temperature rises; ΔH negative', '**Endothermic**: temperature falls; ΔH positive', '**HT:** ΔH = bonds broken − bonds made'], { size: 12 });
  D.quickCheck(s, 'Cover the right-hand column of the table. Explain each factor using collision theory.');
  D.notes(s, 'Equations checked in build_T7.js:\n' + EQLIST.join('\n'));
  reg(s, 'Summary');
}

// ======================= 23 KEY WORDS =======================
reg(D.keyWords([
  ['Rate of reaction', 'How fast reactants are used up or products made.'],
  ['Collision theory', 'Particles must collide with enough energy to react.'],
  ['Activation energy', 'Minimum energy needed for a reaction.'],
  ['Frequency of collisions', 'Number of collisions per second.'],
  ['Surface area : volume', 'Higher for smaller pieces or powders.'],
  ['Catalyst', 'Speeds up a reaction; not used up.'],
  ['Enzyme', 'A biological catalyst.'],
  ['Mean rate', 'Change in amount ÷ time taken.'],
  ['Tangent (HT)', 'Line touching a curve: its gradient is the rate.'],
  ['Gas syringe', 'Measures the volume of gas produced.'],
  ['Exothermic', 'Energy given out: temperature rises.'],
  ['Endothermic', 'Energy taken in: temperature falls.'],
  ['Reaction profile', 'Energy diagram: reactants, products, Ea, ΔH.'],
  ['Bond breaking', 'Endothermic: needs energy.'],
  ['Bond making', 'Exothermic: releases energy.'],
  ['Bond energy (HT)', 'Energy to break 1 mole of a bond (kJ/mol).'],
], { notes: 'Cover-and-recall activity. HT terms marked (HT).' }), 'Summary: key words');

// ======================= 24 FULL QUESTION =======================
reg(D.fullQuestion('A student investigates the reaction between **magnesium ribbon** and **hydrochloric acid**: ' + EQ['Mg+HCl'] + '.', [
  { l: 'a', q: 'Describe how the student could measure the rate of this reaction.', marks: 3, ms: 'Collect the hydrogen in a gas syringe (1); measure the volume at regular time intervals (1); same mass/length of Mg and volume of acid; rate = volume ÷ time (1).', h: 1.1 },
  { l: 'b', q: 'Explain why using **warmer** acid increases the rate.', marks: 3, ms: 'Particles have more energy / move faster (1); more frequent collisions (1); a greater proportion of collisions have at least the activation energy (1).', h: 1.1 },
  { l: 'c', q: '**60 cm³** of hydrogen is collected in **30 s**. Calculate the mean rate.', marks: 2, ms: '60 ÷ 30 (1); = 2.0 cm³/s (1).' },
  { l: 'd', q: 'The temperature of the acid rises during the reaction. What does this show?', marks: 1, ms: 'The reaction is exothermic (1).' },
  { l: 'e', q: '**HT** H₂ + Cl₂ → 2HCl. Use H–H 436, Cl–Cl 243 and H–Cl 432 kJ/mol to calculate ΔH.', marks: 3, ht: true, ms: 'Broken 436 + 243 = 679 (1); made 2 × 432 = 864 (1); ΔH = −185 kJ/mol (1).', h: 1.1 },
  { l: 'f', q: 'What is meant by **activation energy**?', marks: 1, ms: 'The minimum energy particles need (when they collide) to react (1).' },
], 13, { ht: true, subtitle: 'Specification 7.1–7.15 • answer every part • 13 marks (part e is HT)' }), 'Full question');
calc('FQ c', 60 / 30, 2, 1e-12);

// ======================= 25–26 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Give **two** ways to increase the rate of the reaction between marble chips and acid.', marks: 2, ms: 'Any two: use powder / smaller chips; increase acid concentration; increase temperature (1 each).', h: 0.8 },
  { n: '2', q: 'In the thiosulfate experiment, the cross disappears after **40 s**. Calculate 1/time.', marks: 1, ms: '0.025 s⁻¹ (1).', h: 0.7 },
  { n: '3', q: 'Explain how a **catalyst** increases the rate of a reaction.', marks: 2, ms: 'Provides an alternative pathway with lower activation energy (1); more collisions are successful (1).', h: 0.8 },
  { n: '4', q: '**HT** Calculate ΔH for H₂ + Br₂ → 2HBr (H–H 436, Br–Br 193, H–Br 366 kJ/mol). Is it exothermic?', marks: 3, ht: true, ms: 'Broken 629 (1); made 732 (1); −103 kJ/mol, exothermic (1).', h: 1.0 },
  { n: '5', q: 'Ammonium nitrate dissolves and the temperature falls. Classify the change and explain.', marks: 3, ms: 'Endothermic (1); energy is taken in from the surroundings / water (1); so the temperature of the surroundings falls (1).', h: 0.9 },
  { n: '6', q: 'Describe how to investigate the effect of **acid concentration** on the rate of reaction with marble chips, and explain the expected results using collision theory.', marks: 6, levels: true, h: 1.45, ms: levelsHW() },
];
calc('HW2', 1 / 40, 0.025, 1e-12);
function levelsHW() {
  return D.levels6([
    'Measure a fixed volume (e.g. 20 cm³) of acid into a conical flask; add a fixed mass of marble chips of the same size.',
    'Connect to a gas syringe (or measure mass loss on a balance); start the stopwatch.',
    'Record the volume of CO₂ every 20 s until the reaction stops.',
    'Repeat with different concentrations of acid, keeping temperature and chip size the same.',
    'Plot volume against time; compare initial gradients / mean rates.',
    'Higher concentration: more acid particles in the same volume, so more frequent collisions, so a faster rate (steeper graph).',
    'With excess chips, more concentrated acid also gives a greater final volume of gas.',
  ], 'Level 3 answers give a clear method with control variables AND explain the result using frequency of collisions.');
}
D.homework('Answer every question. Question 4 is Higher tier. Show your working.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 6); assert.strictEqual(R4.total, 7);
assert(D.slideNo >= 24 && D.slideNo <= 32, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T7_RatesEnergy.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
