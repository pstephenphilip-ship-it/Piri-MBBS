// build_T1.js — Edexcel GCSE Chemistry 1CH0 Topic 1 Key concepts in chemistry (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T1.js
// Structure copied from build_T3.js (approved). edx_chem_template.js is NOT edited: the equation checker and
// glassware helpers are spliced in from build_T3.js; atom, dot-and-cross, lattice and structure helpers are below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 1,
  title: 'Key concepts in chemistry',
  shortTitle: 'T1',
  subtitle: 'Atoms, bonding, structures and calculations',
  specRange: '1.1–1.53',
  pOnly: [],
  paper: 'Papers 1 and 2',
  keywords: ['Atomic structure', 'Isotopes', 'Periodic table', 'Bonding', 'Structures', 'Moles'],
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



// --- Topic 1 equations (atoms and charges asserted) ---
eq('Mg+O2', [[2, 'Mg', 's'], [1, 'O2', 'g']], [[2, 'MgO', 's']]);
eq('BaCl2+Na2SO4', [[1, 'BaCl2', 'aq'], [1, 'Na2SO4', 'aq']], [[1, 'BaSO4', 's'], [2, 'NaCl', 'aq']]);
eq('CaCO3+HCl', [[1, 'CaCO3', 's'], [2, 'HCl', 'aq']], [[1, 'CaCl2', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('CaCO3 heat', [[1, 'CaCO3', 's']], [[1, 'CaO', 's'], [1, 'CO2', 'g']]);
eq('Mg+HCl', [[1, 'Mg', 's'], [2, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]);
eq('Fe+Cl2', [[2, 'Fe', 's'], [3, 'Cl2', 'g']], [[2, 'FeCl3', 's']]);
eq('Na ion', [[1, 'Na']], [[1, 'Na^+'], [1, 'e-']], { noStates: true });
eq('Cl ion', [[1, 'Cl'], [1, 'e-']], [[1, 'Cl^-']], { noStates: true });
eq('Mg ion', [[1, 'Mg']], [[1, 'Mg^2+'], [2, 'e-']], { noStates: true });
eq('O ion', [[1, 'O'], [2, 'e-']], [[1, 'O^2-']], { noStates: true });
eq('Na+Cl2', [[2, 'Na', 's'], [1, 'Cl2', 'g']], [[2, 'NaCl', 's']]);

// ======================= CALCULATIONS (asserted) =======================
const AR = { H: 1, He: 4, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Ba: 137 };
const Mr = f => Object.entries(parseF(f).atoms).reduce((a, [k, v]) => { assert(AR[k], 'no Ar ' + k); return a + AR[k] * v; }, 0);
const ionQ = f => parseF(f).charge;
const neutral = (...terms) => terms.reduce((a, [n, f]) => a + n * ionQ(f), 0);
const NA = 6.02e23;
const r1 = x => Math.round(x * 10) / 10;
// atoms and ions: p, n, e
const pne = (Z, A, q = 0) => [Z, A - Z, Z - q];
assert.deepStrictEqual(pne(11, 23), [11, 12, 11]); assert.deepStrictEqual(pne(17, 37), [17, 20, 17]); assert.deepStrictEqual(pne(19, 39), [19, 20, 19]);
assert.deepStrictEqual(pne(12, 24, 2), [12, 12, 10]); assert.deepStrictEqual(pne(8, 16, -2), [8, 8, 10]); assert.deepStrictEqual(pne(13, 27, 3), [13, 14, 10]);
assert.deepStrictEqual(pne(6, 14), [6, 8, 6]); assert.deepStrictEqual(pne(12, 25), [12, 13, 12]); assert.deepStrictEqual(pne(16, 32, -2), [16, 16, 18]);
assert.deepStrictEqual(pne(20, 40, 2), [20, 20, 18]);
calc('nucleus/atom size ratio', 1e-10 / 1e-14, 1e4, 1e-6);
// relative atomic mass
const RAM = list => list.reduce((a, [m, p]) => a + m * p, 0) / list.reduce((a, [, p]) => a + p, 0);
calc('RAM Cl', RAM([[35, 75], [37, 25]]), 35.5, 1e-12);
calc('RAM Cu (1 d.p.)', r1(RAM([[63, 69.2], [65, 30.8]])), 63.6, 1e-12);
calc('RAM Br (1 d.p.)', r1(RAM([[79, 50.7], [81, 49.3]])), 80.0, 1e-12);
calc('RAM Li (1 d.p.)', r1(RAM([[6, 7.5], [7, 92.5]])), 6.9, 1e-12);
calc('RAM Mg (1 d.p.) full question', r1(RAM([[24, 79], [25, 10], [26, 11]])), 24.3, 1e-12);
calc('RAM B (1 d.p.) recap', r1(RAM([[10, 20], [11, 80]])), 10.8, 1e-12);
// electron configurations
const CONF = { H: [1], He: [2], Li: [2, 1], C: [2, 4], N: [2, 5], O: [2, 6], F: [2, 7], Ne: [2, 8], Na: [2, 8, 1], Mg: [2, 8, 2], Al: [2, 8, 3], Si: [2, 8, 4], P: [2, 8, 5], S: [2, 8, 6], Cl: [2, 8, 7], Ar: [2, 8, 8], K: [2, 8, 8, 1], Ca: [2, 8, 8, 2] };
const ZOF = { H: 1, He: 2, Li: 3, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, Si: 14, P: 15, S: 16, Cl: 17, Ar: 18, K: 19, Ca: 20 };
for (const [el, c] of Object.entries(CONF)) assert.strictEqual(c.reduce((a, b) => a + b, 0), ZOF[el], 'config ' + el);
// ionic formulae: charges must cancel
[['CaCl2', [1, 'Ca^2+'], [2, 'Cl^-']], ['Na2O', [2, 'Na^+'], [1, 'O^2-']], ['Mg(OH)2', [1, 'Mg^2+'], [2, 'OH^-']], ['Al2(SO4)3', [2, 'Al^3+'], [3, 'SO4^2-']],
 ['(NH4)2SO4', [2, 'NH4^+'], [1, 'SO4^2-']], ['Ca(NO3)2', [1, 'Ca^2+'], [2, 'NO3^-']], ['K2CO3', [2, 'K^+'], [1, 'CO3^2-']], ['Fe2O3', [2, 'Fe^3+'], [3, 'O^2-']],
 ['MgO', [1, 'Mg^2+'], [1, 'O^2-']], ['AlCl3', [1, 'Al^3+'], [3, 'Cl^-']], ['Na2SO4', [2, 'Na^+'], [1, 'SO4^2-']], ['CaCO3', [1, 'Ca^2+'], [1, 'CO3^2-']]].forEach(([f, a, b]) => {
  calc('charges cancel ' + f, neutral(a, b), 0);
  const sum = side([a, b]).atoms, want = parseF(f).atoms;
  assert.deepStrictEqual(Object.keys(sum).sort().map(k => sum[k]), Object.keys(want).sort().map(k => want[k]), 'ion formula atoms ' + f);
});
// relative formula masses
[['CO2', 44], ['H2SO4', 98], ['Ca(OH)2', 74], ['(NH4)2SO4', 132], ['Mg(NO3)2', 148], ['Ca(NO3)2', 164], ['MgO', 40], ['H2O', 18], ['NaCl', 58.5], ['CaCO3', 100], ['CaO', 56],
 ['Al2(SO4)3', 342], ['HCl', 36.5], ['FeCl3', 162.5], ['MgCl2', 95], ['NH3', 17], ['Fe2O3', 160], ['C4H8', 56], ['H2O2', 34], ['C3H8', 44]].forEach(([f, m]) => calc('Mr ' + f, Mr(f), m, 1e-9));
// empirical formulae
const ratio = (...m) => { const mn = Math.min(...m); return m.map(x => x / mn); };
assert.deepStrictEqual(ratio(2.4 / 24, 1.6 / 16).map(x => Math.round(x * 1000) / 1000), [1, 1]);
assert.deepStrictEqual(ratio(75 / 12, 25 / 1).map(x => Math.round(x * 1000) / 1000), [1, 4]);
calc('Fe2O3 ratio O/Fe', (30 / 16) / (70 / 56), 1.5, 1e-12);
calc('CH2 × 4 = 56', 56 / Mr('CH2'), 4, 1e-12); calc('HO × 2 = 34', 34 / Mr('HO'), 2, 1e-12);
calc('C3H8 HW ratio H/C', (0.08 / 1) / (0.36 / 12), 8 / 3, 1e-12);
calc('N2O recap ratio', (2.8 / 14) / (1.6 / 16), 2, 1e-12);
// MgO practical
const crucible = 25.20, withMg = 25.44, after = 25.60;
calc('MgO: Mg mass', withMg - crucible, 0.24, 1e-9); calc('MgO: O mass', after - withMg, 0.16, 1e-9);
calc('MgO: mol Mg', (withMg - crucible) / 24, 0.01, 1e-9); calc('MgO: mol O', (after - withMg) / 16, 0.01, 1e-9);
// reacting masses (mass ratio from Mr)
calc('12 g Mg → MgO', 12 * (2 * Mr('MgO')) / (2 * AR.Mg), 20, 1e-9);
calc('50 g CaCO3 → CaO', 50 * Mr('CaO') / Mr('CaCO3'), 28, 1e-9);
calc('100 g CaCO3 → CO2', 100 * Mr('CO2') / Mr('CaCO3'), 44, 1e-9);
calc('6 g Mg → MgO (QC)', 6 * 80 / 48, 10, 1e-9);
calc('0.48 g Mg → MgO (FQ)', 0.48 / 24 * 40, 0.80, 1e-9);
calc('mass lost open flask: 10 g CaCO3 gives CO2', 10 * 44 / 100, 4.4, 1e-9);
// concentration
calc('5.0 g in 250 cm³', 5.0 / 0.250, 20, 1e-9); calc('mass in 100 cm³ of 40 g/dm³', 40 * 0.100, 4, 1e-9);
calc('volume for 12 g at 48 g/dm³ (cm³)', 12 / 48 * 1000, 250, 1e-9); calc('recap conc 2.5 g in 500 cm³', 2.5 / 0.5, 5, 1e-12);
// moles (HT)
calc('36 g water mol', 36 / Mr('H2O'), 2, 1e-12);
calc('2 mol water molecules', 2 * NA, 1.204e24, 1e12);
calc('0.5 mol CO2 g', 0.5 * Mr('CO2'), 22, 1e-12);
calc('3.01e23 Na atoms → g', 3.01e23 / NA * AR.Na, 11.5, 1e-9);
calc('8.8 g CO2 molecules (HW)', sf(8.8 / 44 * NA, 3), 1.20e23, 1e18);
calc('8.8 g CO2 atoms (stretch)', sf(8.8 / 44 * NA * 3, 3), 3.61e23, 1e18);
calc('4.0 g NaOH mol', 4.0 / 40, 0.1, 1e-12);
calc('recap 0.25 mol MgO g', 0.25 * 40, 10, 1e-12);
// limiting reactant
const molMg = 4.8 / 24, molHCl = 18.25 / 36.5;
calc('lim Mg mol', molMg, 0.2, 1e-12); calc('lim HCl mol', molHCl, 0.5, 1e-12); calc('HCl needed', 2 * molMg, 0.4, 1e-12);
calc('H2 mass', molMg * 2, 0.4, 1e-12); calc('HCl left', molHCl - 2 * molMg, 0.1, 1e-12);
// stoichiometry from masses
calc('Fe mol', 11.2 / 56, 0.2, 1e-12); calc('Cl2 mol', 21.3 / 71, 0.3, 1e-12); calc('FeCl3 mol', 32.5 / 162.5, 0.2, 1e-12);
calc('mass conserved Fe + Cl2', 11.2 + 21.3, 32.5, 1e-9);
calc('stoich QC: 2.4 g Mg, 1.6 g O2', (2.4 / 24) / (1.6 / 32), 2, 1e-12);
// Mendeleev data (eka-silicon vs germanium, textbook values)
const EKA = [['Relative atomic mass', '72', '72.6'], ['Density (g/cm³)', '5.5', '5.3'], ['Formula of oxide', 'EsO₂', 'GeO₂'], ['Colour', 'grey metal', 'grey metal']];

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

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Key concepts',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • atoms, isotopes, periodic table, bonding, structures, masses and moles` },
    { icon: 'H', text: 'Higher & Foundation in one deck • moles and limiting reactants are HT' },
    { icon: '1', text: 'Topic 1 • assessed on both papers • same content in Combined Science' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 1 Key concepts in chemistry underpins every other topic and is assessed on both papers. Higher-only statements (HT pill): 1.50–1.53 (the mole, Avogadro constant, limiting reactants, stoichiometry from masses). Chemistry-only: none believed (Topic 1 is shared with Combined Science 1SC0). No Core Practical in Topic 1; the magnesium oxide empirical formula experiment (1.46) is a required description but not a Core Practical. Statement numbers are reconstructed: see SPEC_T1.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '1.1–1.10', text: 'Describe how **atomic models** changed; the **structure of an atom**; **isotopes**; count **p, n, e**.' },
  { code: '1.11–1.12', text: 'Explain and calculate **relative atomic mass** from isotope abundances.' },
  { code: '1.13–1.20', text: 'Explain **Mendeleev’s** table and the modern **periodic table**; write **electronic configurations**.' },
  { code: '1.21–1.27', text: 'Explain **ionic bonding** with **dot and cross** diagrams; deduce **ionic formulae**.' },
  { code: '1.28–1.34', text: 'Explain **covalent bonding** and the properties of **simple molecular** substances.' },
  { code: '1.35–1.42', text: 'Explain **giant covalent** (diamond, graphite, graphene, C₆₀), **polymers** and **metals**.' },
  { code: '1.43–1.49', text: 'Calculate **Mr**, **empirical formulae**, **reacting masses** and **concentration** in g dm⁻³.' },
  { code: '1.50–1.53', text: 'Use the **mole** and **Avogadro constant**; find **limiting reactants** and **stoichiometry**.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = Higher-only statements 1.50–1.53. Everything else is both tiers. Topic 1 is long: plan about four or five lessons.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 1 is assessed on both papers`, { tag: 'Context' });
  const nodes = [
    ['1.1–1.12', 'Atomic structure, isotopes, relative atomic mass', 'BOTH COURSES', C.blue],
    ['1.13–1.20', 'The periodic table and electronic configuration', 'BOTH COURSES', C.blue],
    ['1.21–1.27', 'Ionic bonding and ionic formulae', 'BOTH COURSES', C.blue],
    ['1.28–1.34', 'Covalent bonding, simple molecules', 'BOTH COURSES', C.blue],
    ['1.35–1.42', 'Giant covalent, polymers, metals, models', 'BOTH COURSES', C.blue],
    ['1.43–1.49', 'Mr, empirical formula, reacting masses', 'BOTH COURSES', C.blue],
    ['1.50–1.53', 'Moles, limiting reactants, stoichiometry', 'HIGHER ONLY', C.red],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 1\nKey concepts', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 0 formulae and equations • every later topic uses ions, bonding and moles', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 1 is assessed on **both** 1CH0 papers (1 h 45 min, 100 marks each).',
      'Combined Science 1SC0 tests the **same** Topic 1 statements.',
      'Calculations (Mr, empirical formula, reacting masses) appear on every paper.',
      'Relative atomic masses come from the **periodic table** on the paper.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**HT** pill: the mole, Avogadro constant, limiting reactants and stoichiometry (1.50–1.53).',
      '**No chemistry-only** statements believed in Topic 1.',
      '**No Core Practical**; the magnesium oxide experiment (1.46) is a described method.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Higher-only: 1.50–1.53 (medium-high confidence). Chemistry-only: none (medium confidence). Statement numbering is reconstructed from memory and may differ by one or two in places: see SPEC_T1.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 • particles', q: 'What is the difference between an **element** and a **compound**?' },
  { from: 'KS3 • atoms', q: 'Name the **three** particles found in an atom.' },
  { from: 'Topic 0 • formulae', q: 'How many atoms of each element are in **H₂SO₄**?' },
  { from: 'Topic 0 • equations', q: 'Balance:  Na + Cl₂ → NaCl' },
  { from: 'KS3 • periodic table', q: 'Is **sodium** a metal or a non-metal? Is **sulfur**?' },
  { from: 'Maths • ratio', q: 'Simplify the ratio **0.2 : 0.3**.' },
], { subtitle: 'Recall from KS3 and Topic 0 • 6 minutes • no notes', notes: `ANSWERS\n1. An element is made of one type of atom; a compound contains two or more elements chemically combined.\n2. Protons, neutrons, electrons.\n3. 2 H, 1 S, 4 O.\n4. ${EQ['Na+Cl2']}.\n5. Sodium: metal; sulfur: non-metal.\n6. 2 : 3.` }), 'Retrieval starter');

// ======================= 5 ATOMIC MODELS =======================
reg(D.contentSlide({
  title: 'How the model of the atom changed',
  subtitle: 'Specification 1.1 • new evidence led to new models',
  tag: '1.1', caption: 'four models in order; not to scale',
  draw: (s, p) => {
    const cells = [[0.6, 1.45, 'Dalton (1803)', 'solid sphere'], [3.55, 1.45, 'Thomson (1897)', 'plum pudding'], [0.6, 3.65, 'Rutherford (1911)', 'nuclear model'], [3.55, 3.65, 'Bohr (1913)', 'electron shells']];
    cells.forEach(([x, y, t, d], i) => {
      box(s, x, y, 2.8, 2.05, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, x, y + 0.05, 2.8, `**${t}**`, { size: 11, h: 0.28, color: C.blue });
      label(s, x, y + 1.72, 2.8, d, { size: 10, h: 0.28, italic: true, color: C.grey });
      const cx = x + 1.4, cy = y + 1.0;
      if (i === 0) ball(s, cx, cy, 0.55, '9AA3B0', '5A6275', 1.25);
      if (i === 1) { ball(s, cx, cy, 0.6, 'F6C6C2', 'C24A3A', 1.25); [[-0.3, -0.25], [0.25, -0.3], [0, 0.05], [-0.3, 0.3], [0.32, 0.25], [0.05, -0.45], [0.02, 0.45]].forEach(([dx, dy]) => { ball(s, cx + dx, cy + dy, 0.07, '1F5F99', '1F5F99'); }); label(s, cx + 0.62, cy - 0.5, 0.6, '+ve', { size: 9, h: 0.22, color: C.red, align: 'left' }); }
      if (i === 2) { oval(s, cx, cy, 1.3, 1.3, null, 'B8BEC9', { dash: 'dash', lw: 0.75 }); ball(s, cx, cy, 0.06, C.red, C.red); [0, 2.1, 4.2].forEach(a => ball(s, cx + 0.62 * Math.cos(a), cy + 0.62 * Math.sin(a), 0.06, '1F5F99', '1F5F99')); label(s, cx + 0.08, cy - 0.05, 0.9, 'nucleus', { size: 8.5, h: 0.2, color: C.red, align: 'left' }); }
      if (i === 3) shellAtom(s, cx, cy, [2, 3], 'B', { r0: 0.18, dr: 0.2, size: 9 });
    });
  },
  head: 'Evidence changes models',
  lines: [
    '**Dalton:** atoms are tiny, solid spheres that cannot be divided.',
    '**Thomson** discovered the **electron**: a ball of positive charge with electrons in it.',
    '**Rutherford’s** gold-foil experiment: most alpha particles passed straight through, a few bounced back. So the atom is **mostly empty space** with a tiny, dense, **positive nucleus**.',
    '**Bohr:** electrons orbit in fixed **shells**. **Chadwick** (1932) found the **neutron**.',
  ],
  worked: { head: 'Explain the evidence', q: 'Why did a few alpha particles bounce back from gold foil?',
    steps: [['Observation', 'very few bounced back'], ['Idea', 'they hit something small, dense and positive'], ['Answer', 'the positive charge and mass are in a tiny nucleus']], size: 11 },
  workedH: 1.85,
  qc: 'State **one** way the nuclear model is different from the plum-pudding model.',
  notes: 'QUICK CHECK ANSWER: any one: the positive charge is concentrated in a small nucleus (not spread out) (1); most of the atom is empty space (1); the mass is concentrated in the nucleus (1).\nSpec 1.1. Dalton is in the spec wording ("how the Dalton model has changed because of the discovery of subatomic particles").',
}), '1.1 Atomic models');

// ======================= 6 STRUCTURE OF AN ATOM =======================
reg(D.contentSlide({
  title: 'The structure of an atom',
  subtitle: 'Specification 1.2–1.6 • nucleus of protons and neutrons; electrons in shells',
  tag: '1.2–1.6', caption: 'a lithium atom (3 protons, 4 neutrons, 3 electrons); the nucleus is drawn far too big',
  draw: (s, p) => {
    const cx = 2.3, cy = 3.5;
    [0.75, 1.35].forEach(r => oval(s, cx, cy, 2 * r, 2 * r, null, '8A8F99', { lw: 1 }));
    [[-Math.PI / 2], [Math.PI / 2]].forEach(([a]) => ball(s, cx + 0.75 * Math.cos(a), cy + 0.75 * Math.sin(a), 0.09, '1F5F99', '1F5F99'));
    ball(s, cx + 1.35, cy, 0.09, '1F5F99', '1F5F99');
    nucleus(s, cx, cy, 3, 4, 0.1);
    callout(s, 4.15, 2.0, 1.9, '**electron** (−)', cx + 0.75 * Math.cos(-Math.PI / 2) + 0.1, cy - 0.75, { color: '1F5F99' });
    callout(s, 4.15, 3.2, 1.9, '**nucleus**', cx + 0.3, cy, {});
    callout(s, 4.15, 4.4, 1.9, '**shell**', cx + 1.0, cy + 0.9, {});
    ball(s, 4.3, 5.25, 0.09, NUC.p[0], NUC.p[1]); label(s, 4.45, 5.12, 1.0, 'proton', { size: 10, h: 0.26, align: 'left' });
    ball(s, 5.3, 5.25, 0.09, NUC.n[0], NUC.n[1]); label(s, 5.45, 5.12, 1.0, 'neutron', { size: 10, h: 0.26, align: 'left' });
    label(s, 0.6, 5.5, 3.6, 'atom radius about **1 × 10⁻¹⁰ m**', { size: 10.5, h: 0.28, align: 'left' });
  },
  head: 'Particles in the atom',
  lines: [
    '**Proton:** relative mass **1**, relative charge **+1** (in the nucleus).',
    '**Neutron:** relative mass **1**, relative charge **0** (in the nucleus).',
    '**Electron:** relative mass **1/1836** (very small), charge **−1** (in shells).',
    'An atom has **equal numbers** of protons and electrons, so it has **no overall charge**.',
    'The nucleus is **tiny** (about 1/10 000 of the atom’s radius) but holds almost **all the mass**.',
  ],
  worked: { head: 'Explain', q: 'Why is an atom neutral?',
    steps: [['Charges', 'each proton is +1, each electron is −1'], ['Numbers', 'number of protons = number of electrons'], ['Answer', 'the charges cancel']], size: 11 },
  workedH: 1.75,
  qc: 'Where is most of the **mass** of an atom? Why?',
  notes: 'QUICK CHECK ANSWER: in the nucleus (1); protons and neutrons each have relative mass 1, electrons have almost no mass (1).\nSpec 1.2–1.6 (1.30 also: atoms ~10⁻¹⁰ m). Nucleus radius ~10⁻¹⁴ m; ratio 10 000 (checked).',
}), '1.2–1.6 Structure of an atom');

// ======================= 7 ISOTOPES =======================
reg(D.contentSlide({
  title: 'Atomic number, mass number and isotopes',
  subtitle: 'Specification 1.7–1.10 • counting protons, neutrons and electrons',
  tag: '1.7–1.10', caption: 'three isotopes of carbon: same protons, different neutrons',
  draw: (s, p) => {
    nucSym(s, 0.8, 1.6, 23, 11, 'Na', { size: 40 });
    callout(s, 2.8, 1.55, 3.4, '**mass number** = protons + neutrons', 1.3, 1.75, { color: C.blue });
    callout(s, 2.8, 2.25, 3.4, '**atomic number** = protons', 1.3, 2.25, { color: C.red });
    [[12, 6, 0.6], [13, 7, 2.6], [14, 8, 4.6]].forEach(([A, n, x]) => {
      box(s, x, 3.15, 1.8, 2.45, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      nucSym(s, x + 0.1, 3.25, A, 6, 'C', { size: 24 });
      nucleus(s, x + 0.9, 4.45, 6, n, 0.085);
      label(s, x, 5.05, 1.8, `6 p, **${n} n**, 6 e`, { size: 10.5, h: 0.28 });
    });
  },
  head: 'Key ideas',
  lines: [
    '**Atomic number** = number of **protons**. It is **unique** to each element.',
    '**Mass number** = protons + neutrons.',
    'Neutrons = mass number − atomic number. In an atom, electrons = protons.',
    '**Isotopes:** atoms of the same element with the same number of protons but **different numbers of neutrons**.',
  ],
  worked: { head: 'Worked example', q: 'Find the protons, neutrons and electrons in chlorine-37 (atomic number 17).',
    steps: [['Protons', '17 (the atomic number)'], ['Neutrons', '37 − 17 = 20'], ['Electrons', '17 (same as protons)'], ['Answer', '17 p, 20 n, 17 e']] },
  qc: 'Potassium has atomic number 19 and mass number 39. Give its numbers of protons, neutrons and electrons.',
  notes: 'QUICK CHECK ANSWER: 19 protons, 20 neutrons, 19 electrons (2 marks: 1 for p and e, 1 for n).\nSpec 1.7–1.10. All counts checked in node.',
}), '1.7–1.10 Isotopes');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 1.1–1.10 • atoms and isotopes', [
  { q: 'Describe **one** piece of evidence from the gold-foil experiment and what it showed.', marks: 2, ms: 'Most alpha particles passed straight through (1) so the atom is mostly empty space (1); OR a few bounced back (1) so the nucleus is small, dense and positive (1).' },
  { q: 'Give the relative mass and relative charge of a **neutron**.', marks: 2, ms: 'Mass 1 (1); charge 0 (1).' },
  { q: 'Carbon-14 has atomic number 6. How many neutrons does it have?', marks: 1, ms: '8 (1).' },
  { q: 'Explain why chlorine-35 and chlorine-37 are **isotopes**.', marks: 2, ms: 'Same number of protons / same element (1); different numbers of neutrons (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 RELATIVE ATOMIC MASS =======================
reg(D.contentSlide({
  title: 'Relative atomic mass',
  subtitle: 'Specification 1.11–1.12 • a weighted mean of the isotopes',
  tag: '1.11–1.12', caption: 'abundance of chlorine isotopes (drawn to scale)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.75, w: 4.6, h: 3.3, xmin: 34, xmax: 38, xstep: 1, ymin: 0, ymax: 100, ystep: 20, xlabel: 'mass of isotope', ylabel: 'abundance (%)', grid: true };
    axes(s, g);
    [[35, 75, '³⁵Cl  75%'], [37, 25, '³⁷Cl  25%']].forEach(([m, a, t]) => {
      box(s, px(g, m) - 0.22, py(g, a), 0.44, py(g, 0) - py(g, a), 'B9E0A8', '3E7F2E', { lw: 1 });
      label(s, px(g, m) - 0.8, py(g, a) - 0.32, 1.6, `**${t}**`, { size: 11, h: 0.28, color: '3E7F2E' });
    });
  },
  head: 'Why is Ar not a whole number?',
  lines: [
    'Most elements are a **mixture of isotopes** with different masses.',
    '**Relative atomic mass (Ar)** is the **mean mass** of the atoms, weighted by how common each isotope is.',
    'Ar = (mass₁ × %₁ + mass₂ × %₂) ÷ 100',
  ],
  worked: { head: 'Worked example', q: 'Chlorine is 75% chlorine-35 and 25% chlorine-37. Calculate Ar.',
    steps: [['Multiply', '35 × 75 = 2625;  37 × 25 = 925'], ['Add', '2625 + 925 = 3550'], ['Divide', '3550 ÷ 100'], ['Answer', 'Ar = 35.5']] },
  qc: 'Copper is **69.2%** copper-63 and **30.8%** copper-65. Calculate Ar to 1 decimal place.',
  notes: 'QUICK CHECK ANSWER: (63 × 69.2 + 65 × 30.8) ÷ 100 (1) = 63.6 (1).\nOther checked examples: bromine 50.7% ⁷⁹Br, 49.3% ⁸¹Br → 80.0; lithium 7.5% ⁶Li, 92.5% ⁷Li → 6.9.\nSpec 1.11–1.12.',
}), '1.11–1.12 Relative atomic mass');

// ======================= 10 MENDELEEV =======================
{
  const s = D.contentSlide({
    title: 'Mendeleev’s periodic table',
    subtitle: 'Specification 1.13–1.15 • ordering, gaps and predictions',
    tag: '1.13–1.15', caption: 'Mendeleev’s prediction for "eka-silicon" (1871) and germanium (found 1886)',
    draw: (s, p) => {
      const rows = [[HDR('Property'), HDR('Predicted'), HDR('Germanium')], ...EKA.map((r, i) => r.map((c, j) => tcell(c, i, { bold: j === 0 })))];
      s.addTable(rows, { x: 0.65, y: 1.55, w: 5.7, colW: [2.3, 1.7, 1.7], rowH: 0.44, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
      label(s, 0.65, 3.95, 5.7, '**Tellurium and iodine**', { size: 12, h: 0.3, align: 'left', color: C.blue });
      [['Te', '128', 'group 6'], ['I', '127', 'group 7']].forEach(([sym, ar, gp], i) => {
        const x = 0.9 + i * 2.0;
        box(s, x, 4.35, 1.5, 1.1, 'EFE6FA', 'A58BD1', { lw: 1 });
        label(s, x, 4.4, 1.5, `**${sym}**`, { size: 22, h: 0.5 });
        label(s, x, 4.9, 1.5, `Ar ${ar} • ${gp}`, { size: 10, h: 0.3 });
      });
      arrow(s, 2.45, 4.9, 2.85, 4.9, C.red, 2);
      label(s, 4.35, 4.35, 2.0, 'swapped so they sit with elements of similar properties', { size: 10, h: 1.1, align: 'left', italic: true });
    },
    head: 'What did Mendeleev do?',
    lines: [
      'Arranged the known elements in order of **relative atomic mass**, then put elements with **similar properties** (and similar compounds) in the same column.',
      'Left **gaps** for elements not yet discovered and **predicted** their properties.',
      'When gallium and germanium were found, they matched: strong evidence for his table.',
      'Some pairs (e.g. Te and I) are out of mass order because of the **abundance of isotopes**; ordering by **atomic number** fixes this.',
    ],
    worked: { head: 'Explain', q: 'Why is tellurium placed before iodine?',
      steps: [['Properties', 'Te is like O and S; I is like Cl and Br'], ['Isotopes', 'Te has heavy isotopes, so a higher Ar'], ['Answer', 'atomic number order (52, 53) puts both in the right group']], size: 11 },
    workedH: 1.85,
    qc: 'Why did Mendeleev leave **gaps** in his table?',
    notes: 'QUICK CHECK ANSWER: for elements that had not yet been discovered (1), so that elements with similar properties stayed in the same groups (1).\nSpec 1.13–1.15. Eka-silicon values are the widely quoted textbook values.',
  });
  reg(s, '1.13–1.15 Mendeleev');
}

// ======================= 11 MODERN PERIODIC TABLE =======================
reg(D.contentSlide({
  title: 'The modern periodic table',
  subtitle: 'Specification 1.16–1.18 • atomic number, groups, periods, metals',
  tag: '1.16–1.18', caption: 'first 20 elements; metals in blue, non-metals in violet; red line = the dividing staircase',
  draw: (s, p) => {
    miniPT(s, 1.0, 1.85, 0.66, 0.78);
    label(s, 0.6, 5.15, 5.8, '**Group** = column (same number of outer electrons) • **Period** = row (same number of shells)', { size: 10.5, h: 0.5 });
  },
  head: 'Key ideas',
  lines: [
    'Elements are in order of **atomic number** (number of protons).',
    '**Periods** are rows; **groups** are columns of elements with **similar properties**.',
    '**Metals** are on the **left** and in the middle; **non-metals** are on the **right**.',
    'Metal atoms usually have **1, 2 or 3** outer electrons and **lose** them to form positive ions; non-metal atoms usually **gain or share** electrons.',
  ],
  worked: { head: 'Use the table', q: 'Find the position of magnesium (atomic number 12).',
    steps: [['Period', 'row 3'], ['Group', 'column 2'], ['Answer', 'a metal in group 2, period 3']], size: 11 },
  workedH: 1.75,
  qc: 'Element X is in **group 7, period 3**. Name it and say whether it is a metal or non-metal.',
  notes: 'QUICK CHECK ANSWER: chlorine (1); non-metal (1).\nSpec 1.16–1.18. Hydrogen is a non-metal; it is placed above group 1 by electron count but does not behave like the alkali metals.',
}), '1.16–1.18 The periodic table');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 1.11–1.18 • relative atomic mass and the periodic table', [
  { q: 'Boron is 20% boron-10 and 80% boron-11. Calculate its relative atomic mass.', marks: 2, ms: '(10 × 20 + 11 × 80) ÷ 100 (1); = 10.8 (1).' },
  { q: 'Give **two** reasons why Mendeleev’s table was accepted.', marks: 2, ms: 'He left gaps for undiscovered elements (1); his predictions (e.g. germanium) were later shown to be correct (1).' },
  { q: 'The modern table is in order of **atomic number**. What does atomic number tell you?', marks: 1, ms: 'Number of protons (in the nucleus) (1).' },
  { q: 'Where are the **metals** found in the periodic table?', marks: 1, ms: 'On the left and in the centre / left of the staircase line (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 ELECTRONIC CONFIGURATION =======================
reg(D.contentSlide({
  title: 'Electronic configuration',
  subtitle: 'Specification 1.19–1.20 • the first 20 elements',
  tag: '1.19–1.20', caption: 'shells fill from the inside: 2, then 8, then 8, then the rest',
  draw: (s, p) => {
    [['Na', 1.3, '2.8.1', 'group 1, period 3'], ['Cl', 3.5, '2.8.7', 'group 7, period 3'], ['Ca', 5.4, '2.8.8.2', 'group 2, period 4']].forEach(([el, x, c, gp]) => {
      shellAtom(s, x, 2.9, CONF[el], el, { r0: 0.2, dr: 0.17 });
      label(s, x - 0.9, 3.95, 1.8, `**${c}**`, { size: 14, h: 0.32, color: C.blue });
      label(s, x - 0.95, 4.28, 1.9, gp, { size: 10, h: 0.28, color: C.grey });
    });
    box(s, 0.7, 4.75, 5.6, 0.85, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 4.75, 5.4, 'number of **shells** = **period**;  electrons in the **outer shell** = **group**  (group 0: full outer shell)', { size: 11, h: 0.85 });
  },
  head: 'Key ideas',
  lines: [
    'Electrons fill the **lowest shell** first: up to **2** in the first shell, then up to **8**, then **8**.',
    'Write it with dots: sodium (11 electrons) is **2.8.1**.',
    'Elements in the **same group** have the **same number of outer electrons**, so they react in similar ways.',
  ],
  worked: { head: 'Worked example', q: 'Write the electronic configuration of sulfur (atomic number 16).',
    steps: [['First shell', '2 (14 left)'], ['Second shell', '8 (6 left)'], ['Third shell', '6'], ['Answer', '2.8.6: group 6, period 3']] },
  qc: 'Write the electronic configurations of **aluminium** (13) and **potassium** (19).',
  notes: 'QUICK CHECK ANSWER: Al 2.8.3 (1); K 2.8.8.1 (1).\nSpec 1.19–1.20. All configurations for the first 20 elements are checked to add up to the atomic number in node.',
}), '1.19–1.20 Electronic configuration');

// ======================= 14 IONIC BONDING =======================
reg(D.contentSlide({
  title: 'Ionic bonding: transferring electrons',
  subtitle: 'Specification 1.21–1.24 • dot and cross diagrams; metals form cations, non-metals form anions',
  tag: '1.21–1.24', caption: 'sodium (crosses) gives its outer electron to chlorine (dots)',
  draw: (s, p) => {
    shellAtom(s, 1.25, 2.4, [2, 8, 1], 'Na', { r0: 0.18, dr: 0.15, mark: 'x' });
    shellAtom(s, 3.3, 2.4, [2, 8, 7], 'Cl', { r0: 0.18, dr: 0.15 });
    label(s, 0.55, 3.15, 1.4, 'Na  2.8.1', { size: 10.5, h: 0.26 }); label(s, 2.6, 3.15, 1.4, 'Cl  2.8.7', { size: 10.5, h: 0.26 });
    arrow(s, 1.85, 1.75, 2.85, 1.75, C.red, 2); label(s, 1.7, 1.42, 1.3, '1 electron', { size: 9.5, h: 0.24, color: C.red });
    arrow(s, 4.05, 2.4, 4.6, 2.4, C.ink, 2);
    shellAtom(s, 1.4, 4.45, [2, 8], 'Na', { r0: 0.18, dr: 0.15, mark: 'x' });
    bracket(s, 0.72, 3.77, 1.36, 1.36, '+');
    shellAtom(s, 3.75, 4.45, [2, 8, 8], 'Cl', { r0: 0.18, dr: 0.15, lastCross: 1 });
    bracket(s, 2.95, 3.65, 1.6, 1.6, '−');
    label(s, 0.6, 5.32, 1.6, 'Na⁺  [2.8]⁺', { size: 10.5, h: 0.26 }); label(s, 2.95, 5.32, 1.6, 'Cl⁻  [2.8.8]⁻', { size: 10.5, h: 0.26 });
    label(s, 4.7, 2.0, 1.75, `${EQ['Na ion']}\n${EQ['Cl ion']}`, { size: 10, h: 0.8, align: 'left', bold: true });
  },
  head: 'Key ideas',
  lines: [
    'An **ion** is an atom or group of atoms with a **charge**.',
    'Metal atoms **lose** electrons to form positive ions (**cations**); non-metal atoms **gain** electrons to form negative ions (**anions**).',
    'Both ions have a **full outer shell** (like a noble gas).',
    'Group 1 → **1+**, group 2 → **2+**, group 6 → **2−**, group 7 → **1−**.',
  ],
  worked: { head: 'Counting particles in ions', q: 'Find p, n and e in ²⁴Mg²⁺ and ¹⁶O²⁻.',
    steps: [['Mg²⁺', '12 p, 12 n, 12 − 2 = 10 e'], ['O²⁻', '8 p, 8 n, 8 + 2 = 10 e'], ['Answer', 'both have 10 electrons (2.8)']], size: 11 },
  workedH: 1.85,
  qc: 'Magnesium (2.8.2) reacts with oxygen (2.6). Describe what happens to the **electrons**.',
  notes: `QUICK CHECK ANSWER: each magnesium atom loses / transfers 2 electrons (1) to an oxygen atom (1); Mg²⁺ and O²⁻ ions form, both with full outer shells / 2.8 (1).\nElectron equations checked for charge: ${EQ['Mg ion']}; ${EQ['O ion']}.\nSpec 1.21–1.24 (ion formation limited to groups 1, 2, 6 and 7).`,
}), '1.21–1.24 Ionic bonding');

// ======================= 15 IONIC FORMULAE =======================
{
  const s = D.contentSlide({
    title: 'Formulae of ionic compounds',
    subtitle: 'Specification 1.25–1.26 • -ide and -ate; balance the charges',
    tag: '1.25–1.26', caption: 'common ions to learn',
    draw: (s, p) => {
      const ions = [['Na⁺', 'sodium'], ['K⁺', 'potassium'], ['NH₄⁺', 'ammonium'], ['Mg²⁺', 'magnesium'], ['Ca²⁺', 'calcium'], ['Al³⁺', 'aluminium'], ['Fe³⁺', 'iron(III)'],
        ['Cl⁻', 'chloride'], ['O²⁻', 'oxide'], ['OH⁻', 'hydroxide'], ['NO₃⁻', 'nitrate'], ['SO₄²⁻', 'sulfate'], ['CO₃²⁻', 'carbonate'], ['S²⁻', 'sulfide']];
      ions.forEach(([f, n], i) => {
        const col = i < 7 ? 0 : 1, row = i % 7, x = 0.7 + col * 2.95, y = 1.5 + row * 0.56;
        box(s, x, y, 2.75, 0.48, col ? 'EFE6FA' : 'DCE8F7', col ? 'A58BD1' : '7A9CC9', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 0.75 });
        label(s, x + 0.08, y, 1.0, `**${f}**`, { size: 13, h: 0.48, align: 'left' });
        label(s, x + 1.05, y, 1.65, n, { size: 11, h: 0.48, align: 'left' });
      });
      label(s, 0.7, 5.45, 5.7, '**-ide**: just the element (oxide, chloride)   **-ate**: contains **oxygen** too (sulfate, nitrate)', { size: 10.5, h: 0.32 });
    },
    head: 'Writing formulae',
    lines: [
      'The **total positive charge** must equal the **total negative charge**.',
      'Use **brackets** when you need more than one of a group ion: Ca(NO₃)₂, Mg(OH)₂.',
      'Name the metal first, then the non-metal or group ion.',
    ],
    worked: { head: 'Worked example', q: 'Write the formula of aluminium sulfate.',
      steps: [['Ions', 'Al³⁺ and SO₄²⁻'], ['Balance', '2 × (+3) = +6;  3 × (−2) = −6'], ['Answer', 'Al₂(SO₄)₃']] },
    qc: 'Write the formulae of **calcium chloride**, **sodium oxide** and **ammonium sulfate**.',
    notes: 'QUICK CHECK ANSWER: CaCl₂ (1); Na₂O (1); (NH₄)₂SO₄ (1).\nAll formulae on this slide are checked in node: charges add to zero and atoms match the formula.\nSpec 1.25–1.26.',
  });
  reg(s, '1.25–1.26 Ionic formulae');
}

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 1.19–1.26 • electrons, ions and formulae', [
  { q: 'Write the electronic configuration of **calcium** (atomic number 20).', marks: 1, ms: '2.8.8.2 (1).' },
  { q: 'A sulfide ion is ³²S²⁻ (atomic number 16). Give its numbers of protons, neutrons and electrons.', marks: 2, ms: '16 protons and 16 neutrons (1); 18 electrons (1).' },
  { q: 'Explain how a calcium atom becomes a calcium ion.', marks: 2, ms: 'Loses 2 electrons (1); forms Ca²⁺ with a full outer shell / 2.8.8 (1).' },
  { q: 'Write the formulae of **potassium carbonate** and **iron(III) oxide**.', marks: 2, ms: 'K₂CO₃ (1); Fe₂O₃ (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 IONIC LATTICE =======================
reg(D.contentSlide({
  title: 'Ionic lattices and their properties',
  subtitle: 'Specification 1.27, 1.33 • giant structures of oppositely charged ions',
  tag: '1.27, 1.33', caption: 'one layer of a sodium chloride lattice; the pattern repeats in 3-D',
  draw: (s, p) => {
    const x0 = 1.0, y0 = 1.8, d = 0.62;
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { if (c < 5) line(s, x0 + c * d, y0 + r * d, x0 + (c + 1) * d, y0 + r * d, 'B8BEC9', 1); if (r < 4) line(s, x0 + c * d, y0 + r * d, x0 + c * d, y0 + (r + 1) * d, 'B8BEC9', 1); }
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) { const na = (r + c) % 2 === 0; if (na) plusIon(s, x0 + c * d, y0 + r * d, 0.17, '+', 'F7E08A', '9A7A1A'); else plusIon(s, x0 + c * d, y0 + r * d, 0.25, '−', 'B9E0A8', '3E7F2E'); }
    plusIon(s, 5.0, 2.0, 0.17, '+'); label(s, 5.25, 1.86, 1.2, 'Na⁺', { size: 11, h: 0.28, align: 'left' });
    plusIon(s, 5.0, 2.6, 0.25, '−', 'B9E0A8', '3E7F2E'); label(s, 5.3, 2.46, 1.2, 'Cl⁻', { size: 11, h: 0.28, align: 'left' });
    label(s, 0.7, 5.0, 5.7, 'strong **electrostatic forces** between oppositely charged ions act in **all directions**', { size: 10.5, h: 0.5 });
  },
  head: 'Structure → properties',
  lines: [
    'A **lattice**: a **regular arrangement** of ions held by strong **electrostatic forces** (ionic bonds).',
    '**High melting and boiling points:** lots of energy is needed to overcome the many strong forces.',
    '**Do not conduct when solid:** the ions are fixed in place.',
    '**Conduct when molten or dissolved:** the ions are **free to move** and carry charge.',
    'Many ionic compounds **dissolve in water**.',
  ],
  worked: { head: 'Explain', q: 'Why does molten sodium chloride conduct electricity?',
    steps: [['Particles', 'contains ions (Na⁺ and Cl⁻)'], ['State', 'molten: the ions can move'], ['Answer', 'moving ions carry the charge']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why sodium chloride has a **high melting point**.',
  notes: 'QUICK CHECK ANSWER: giant lattice with strong electrostatic forces between oppositely charged ions (1); a lot of energy is needed to overcome them (1).\nCommon error: "electrons move" in molten NaCl – it is the IONS that move.\nSpec 1.27 and 1.33.',
}), '1.27, 1.33 Ionic lattices');

// ======================= 18 COVALENT BONDING =======================
reg(D.contentSlide({
  title: 'Covalent bonding: sharing electrons',
  subtitle: 'Specification 1.28–1.31 • dot and cross diagrams of six simple molecules',
  tag: '1.28–1.31', caption: 'outer shells only; each overlap holds the shared pairs',
  draw: (s, p) => {
    const R = 0.44, Hr = 0.36, ov = 0.2, dd = (a, b) => a + b - ov;
    const cell = (i, f) => { const x = 0.55 + (i % 3) * 2.0, y = 1.45 + Math.floor(i / 3) * 2.15; f(x + 1.0, y + 0.95); };
    const nm = (i, t) => { const x = 0.55 + (i % 3) * 2.0, y = 1.45 + Math.floor(i / 3) * 2.15; label(s, x, y + 1.78, 2.0, t, { size: 10.5, h: 0.3, bold: true, color: C.blue }); };
    cell(0, (cx, cy) => { const h = dd(Hr, Hr) / 2; covMol(s, [{ x: cx - h, y: cy, r: Hr, sym: 'H', m: 'o' }, { x: cx + h, y: cy, r: Hr, sym: 'H', m: 'x' }], [{ a: 0, b: 1, n: 1 }]); }); nm(0, 'hydrogen, H₂');
    cell(1, (cx, cy) => { const d = dd(Hr, R); covMol(s, [{ x: cx - d / 2, y: cy, r: Hr, sym: 'H', m: 'x' }, { x: cx + d / 2, y: cy, r: R, sym: 'Cl', m: 'o', lone: [0, 90, 270] }], [{ a: 0, b: 1, n: 1 }]); }); nm(1, 'hydrogen chloride, HCl');
    cell(2, (cx, cy) => { const d = dd(Hr, R); covMol(s, [{ x: cx + 0.1, y: cy - 0.1, r: R, sym: 'O', m: 'o', lone: [0, 270] }, { x: cx + 0.1 - d, y: cy - 0.1, r: Hr, sym: 'H', m: 'x' }, { x: cx + 0.1, y: cy - 0.1 + d, r: Hr, sym: 'H', m: 'x' }], [{ a: 0, b: 1, n: 1 }, { a: 0, b: 2, n: 1 }]); }); nm(2, 'water, H₂O');
    cell(3, (cx, cy) => { const h3 = 0.3, d = 0.56; covMol(s, [{ x: cx, y: cy, r: R, sym: 'C', m: 'o' }, { x: cx - d, y: cy, r: h3, sym: 'H', m: 'x' }, { x: cx + d, y: cy, r: h3, sym: 'H', m: 'x' }, { x: cx, y: cy - d, r: h3, sym: 'H', m: 'x' }, { x: cx, y: cy + d, r: h3, sym: 'H', m: 'x' }], [1, 2, 3, 4].map(b => ({ a: 0, b, n: 1 }))); }); nm(3, 'methane, CH₄');
    cell(4, (cx, cy) => { const h = dd(R, R) / 2; covMol(s, [{ x: cx - h, y: cy, r: R, sym: 'O', m: 'o', lone: [140, 220] }, { x: cx + h, y: cy, r: R, sym: 'O', m: 'x', lone: [40, 320] }], [{ a: 0, b: 1, n: 2 }]); }); nm(4, 'oxygen, O₂');
    cell(5, (cx, cy) => { const r2 = 0.38, d = r2 * 2 - 0.2; covMol(s, [{ x: cx, y: cy, r: r2, sym: 'C', m: 'x' }, { x: cx - d, y: cy, r: r2, sym: 'O', m: 'o', lone: [140, 220] }, { x: cx + d, y: cy, r: r2, sym: 'O', m: 'o', lone: [40, 320] }], [{ a: 0, b: 1, n: 2 }, { a: 0, b: 2, n: 2 }], { size: 11 }); }); nm(5, 'carbon dioxide, CO₂');
  },
  head: 'Key ideas',
  lines: [
    'A **covalent bond** is a **shared pair of electrons** between two non-metal atoms.',
    'Covalent bonding forms **molecules**. Each atom gets a **full outer shell** (H gets 2).',
    'O₂ and CO₂ have **double bonds** (two shared pairs).',
    'Atoms are about **1 × 10⁻¹⁰ m** across; small molecules about **10⁻¹⁰ to 10⁻⁹ m**.',
  ],
  worked: { head: 'Count the bonds', q: 'How many shared pairs and lone pairs in water?',
    steps: [['Shared', '2 pairs (one with each H)'], ['Lone', '2 pairs on the oxygen'], ['Check', 'O has 8 outer electrons; each H has 2']], size: 11 },
  workedH: 1.75,
  qc: 'Draw a dot and cross diagram for **ammonia, NH₃** (N has 5 outer electrons).',
  notes: 'QUICK CHECK ANSWER: N in the centre with three H atoms (1); three shared pairs, each with one dot and one cross (1); one lone pair on N (1).\nSpec 1.28–1.31 (and 1.30 sizes). Diagrams drawn to the AQA/Edexcel convention of overlapping outer shells.',
}), '1.28–1.31 Covalent bonding');

// ======================= 19 SIMPLE MOLECULAR =======================
reg(D.contentSlide({
  title: 'Properties of simple molecular substances',
  subtitle: 'Specification 1.34 • strong bonds inside, weak forces between',
  tag: '1.34', caption: 'water molecules: strong covalent bonds (solid) and weak intermolecular forces (dashed)',
  draw: (s, p) => {
    const mols = [[1.4, 2.2], [3.3, 1.9], [5.1, 2.5], [1.9, 4.0], [3.8, 3.9], [5.3, 4.5], [2.9, 5.2]];
    mols.forEach(([x, y]) => { ball(s, x, y, 0.22, 'E06666', '9E2A2A', 1); line(s, x, y, x - 0.32, y + 0.25, C.ink, 2.5); line(s, x, y, x + 0.32, y + 0.25, C.ink, 2.5); ball(s, x - 0.34, y + 0.27, 0.13, 'FFFFFF', '8A8F99', 1); ball(s, x + 0.34, y + 0.27, 0.13, 'FFFFFF', '8A8F99', 1); ball(s, x, y, 0.22, 'E06666', '9E2A2A', 1); });
    [[0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [4, 5], [4, 6], [3, 6]].forEach(([a, b]) => line(s, mols[a][0] + 0.15, mols[a][1] + 0.1, mols[b][0] - 0.15, mols[b][1] + 0.1, C.red, 1, { dash: 'dash' }));
    callout(s, 4.6, 1.35, 1.8, '**covalent bond**', 3.6, 2.12, {});
    callout(s, 4.4, 5.5, 2.0, '**intermolecular force**', 4.2, 4.6, { color: C.red });
  },
  head: 'Structure → properties',
  lines: [
    '**Low melting and boiling points:** only the **weak forces between molecules** need to be overcome, not the covalent bonds.',
    '**Do not conduct electricity:** molecules have **no overall charge** and there are no free electrons or ions.',
    'Some dissolve in water, many do not.',
  ],
  worked: { head: 'Explain', q: 'Why does methane have a very low boiling point (−162 °C)?',
    steps: [['Type', 'simple molecular'], ['Forces', 'weak intermolecular forces between molecules'], ['Answer', 'little energy needed to separate the molecules']], size: 11 },
  workedH: 1.85,
  qc: 'A student says "water boils because the O–H bonds break." Explain why this is **wrong**.',
  notes: 'QUICK CHECK ANSWER: boiling only overcomes the weak forces between molecules (1); the covalent bonds inside the molecules do not break / steam is still H₂O molecules (1).\nSpec 1.34. Intermolecular forces drawn dashed to separate them clearly from covalent bonds.',
}), '1.34 Simple molecular substances');

// ======================= 20 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 1.27–1.34 • lattices and molecules', [
  { q: 'Describe the structure of sodium chloride.', marks: 2, ms: 'Giant lattice / regular arrangement of ions (1); held by strong electrostatic forces between oppositely charged ions (1).' },
  { q: 'Explain why solid sodium chloride does **not** conduct electricity.', marks: 2, ms: 'Ions are in fixed positions (1); they cannot move to carry charge (1).' },
  { q: 'What is a **covalent bond**?', marks: 1, ms: 'A shared pair of electrons (between two atoms) (1).' },
  { q: 'Explain why oxygen, O₂, is a gas at room temperature.', marks: 2, ms: 'Simple molecules with weak intermolecular forces (1); little energy needed to overcome them / low boiling point (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 21 DIAMOND AND GRAPHITE =======================
reg(D.contentSlide({
  title: 'Giant covalent: diamond and graphite',
  subtitle: 'Specification 1.35–1.37 • two forms of carbon',
  tag: '1.35–1.37', caption: 'left: diamond (each C bonded to 4 others, 2-D view); right: graphite layers',
  draw: (s, p) => {
    label(s, 0.6, 1.45, 2.6, '**Diamond**', { size: 12, h: 0.28, color: C.blue });
    const d0x = 0.95, d0y = 2.05, dd = 0.5;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) { const x = d0x + c * dd + (r % 2) * dd / 2, y = d0y + r * 0.5; if (c < 3) line(s, x, y, x + dd, y, '3A3F4A', 1.5); if (r < 5) { line(s, x, y, x + dd / 2, y + 0.5, '3A3F4A', 1.5); line(s, x, y, x - dd / 2, y + 0.5, '3A3F4A', 1.5); } }
    for (let r = 0; r < 6; r++) for (let c = 0; c < 4; c++) ball(s, d0x + c * dd + (r % 2) * dd / 2, d0y + r * 0.5, 0.07, '4A4F5A', '2A2F3A', 0.5);
    label(s, 3.4, 1.45, 3.0, '**Graphite**', { size: 12, h: 0.28, color: C.blue });
    [2.35, 3.55, 4.75].forEach((y, k) => hexRow(s, 3.75 + (k % 2) * 0.22, y, 4, 0.25));
    [[4.0, 2.65, 4.0, 3.25], [5.0, 2.65, 5.0, 3.25], [4.3, 3.85, 4.3, 4.45], [5.3, 3.85, 5.3, 4.45]].forEach(([a, b, c2, d]) => line(s, a, b, c2, d, C.red, 1, { dash: 'dash' }));
    label(s, 3.4, 5.15, 3.0, 'weak forces between layers (red)', { size: 10, h: 0.28, color: C.red });
  },
  head: 'Structure → properties and uses',
  lines: [
    '**Diamond:** each carbon forms **4** strong covalent bonds in a rigid giant network. **Very hard**, very high melting point, **does not conduct** (no free electrons). Used in **cutting tools**.',
    '**Graphite:** each carbon forms **3** covalent bonds in **layers of hexagons**; weak forces between layers, so layers **slide**: soft and a **lubricant**.',
    'Graphite has one **delocalised electron** per carbon, free to move: it **conducts**, so it is used for **electrodes**.',
  ],
  worked: { head: 'Compare', q: 'Why does graphite conduct but diamond does not?',
    steps: [['Graphite', '3 bonds per C: one delocalised electron each'], ['Diamond', '4 bonds per C: all electrons in bonds'], ['Answer', 'only graphite has free electrons to carry charge']], size: 11 },
  workedH: 1.85,
  qc: 'Explain why graphite is **soft** even though it has a very high melting point.',
  notes: 'QUICK CHECK ANSWER: layers are held by weak forces so they can slide over each other (1); but melting needs the strong covalent bonds within layers to break, which takes a lot of energy (1).\nSpec 1.35–1.37.',
}), '1.35–1.37 Diamond and graphite');

// ======================= 22 FULLERENES, GRAPHENE, POLYMERS =======================
reg(D.contentSlide({
  title: 'Graphene, fullerenes and polymers',
  subtitle: 'Specification 1.38–1.39 • more carbon structures',
  tag: '1.38–1.39', caption: 'graphene (one layer); C₆₀ (simplified 2-D view of the cage); poly(ethene)',
  draw: (s, p) => {
    label(s, 0.6, 1.45, 3.0, '**Graphene**', { size: 12, h: 0.28, color: C.blue });
    hexRow(s, 0.95, 2.15, 5, 0.22); hexRow(s, 0.95 + 0.19, 2.48, 5, 0.22);
    label(s, 3.65, 1.45, 2.8, '**Buckminsterfullerene, C₆₀**', { size: 11, h: 0.28, color: C.blue });
    const cx = 4.95, cy = 2.75, pent = [], mid = [], out = [];
    for (let k = 0; k < 5; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 5; pent.push([cx + 0.25 * Math.cos(a), cy + 0.25 * Math.sin(a)]); }
    for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + k * Math.PI / 5; mid.push([cx + 0.58 * Math.cos(a), cy + 0.58 * Math.sin(a)]); }
    for (let k = 0; k < 15; k++) { const a = -Math.PI / 2 + k * 2 * Math.PI / 15; out.push([cx + 0.9 * Math.cos(a), cy + 0.9 * Math.sin(a)]); }
    oval(s, cx, cy, 1.95, 1.95, 'F3EEFB', 'A58BD1', { lw: 1 });
    pent.forEach((q, k) => { const n2 = pent[(k + 1) % 5]; line(s, q[0], q[1], n2[0], n2[1], '3A3F4A', 1.25); line(s, q[0], q[1], mid[2 * k][0], mid[2 * k][1], '3A3F4A', 1.25); });
    mid.forEach((q, k) => { const n2 = mid[(k + 1) % 10]; line(s, q[0], q[1], n2[0], n2[1], '3A3F4A', 1.25); if (k % 2) { const o2 = out[Math.round(k * 1.5) % 15]; line(s, q[0], q[1], o2[0], o2[1], '3A3F4A', 1.25); } });
    out.forEach((q, k) => { const n2 = out[(k + 1) % 15]; line(s, q[0], q[1], n2[0], n2[1], '3A3F4A', 1.25); });
    [...pent, ...mid, ...out].forEach(([x, y]) => ball(s, x, y, 0.045, '4A4F5A', '2A2F3A', 0.5));
    label(s, 0.6, 3.72, 5.8, '**Poly(ethene)**: a long chain of carbon atoms', { size: 11, h: 0.28, align: 'left', color: C.blue });
    for (let k = 0; k < 6; k++) {
      const x = 0.95 + k * 0.85, y = 5.0;
      label(s, x - 0.2, y - 0.17, 0.4, '**C**', { size: 13, h: 0.34 });
      if (k < 5) line(s, x + 0.16, y, x + 0.69, y, C.ink, 1.5);
      label(s, x - 0.2, y - 0.72, 0.4, 'H', { size: 12, h: 0.3 }); line(s, x, y - 0.42, x, y - 0.2, C.ink, 1.25);
      label(s, x - 0.2, y + 0.42, 0.4, 'H', { size: 12, h: 0.3 }); line(s, x, y + 0.2, x, y + 0.42, C.ink, 1.25);
    }
    label(s, 0.55, 4.82, 0.3, '–', { size: 16, h: 0.34 }); label(s, 5.4, 4.82, 0.5, '–', { size: 16, h: 0.34 });
  },
  head: 'Key ideas',
  lines: [
    '**Graphene:** a single layer of graphite, one atom thick. Very **strong**, light and **conducts** (delocalised electrons).',
    '**Fullerenes:** hollow molecules of carbon. **C₆₀** is a sphere of hexagons and pentagons: **simple molecular**, so a lower melting point; weak forces between molecules make it slippery. **Nanotubes** are cylinders: strong and conducting.',
    '**Polymers** such as poly(ethene) are **very large molecules** with long **chains of carbon atoms**.',
  ],
  worked: { head: 'Explain', q: 'Why does C₆₀ melt at a much lower temperature than graphite?',
    steps: [['C₆₀', 'separate molecules: weak intermolecular forces'], ['Graphite', 'giant: covalent bonds must break'], ['Answer', 'less energy needed to melt C₆₀']], size: 11 },
  workedH: 1.85,
  qc: 'Give **one** property of graphene and explain it using its structure.',
  notes: 'QUICK CHECK ANSWER: any one: conducts electricity because it has delocalised electrons (1)(1); very strong because of strong covalent bonds in a giant layer (1)(1).\nSpec 1.38–1.39. The C₆₀ drawing is a simplified 2-D projection, as the caption says.',
}), '1.38–1.39 Graphene, fullerenes, polymers');

// ======================= 23 METALS =======================
reg(D.contentSlide({
  title: 'Metallic bonding and properties',
  subtitle: 'Specification 1.40, 1.42 • positive ions in a sea of delocalised electrons',
  tag: '1.40, 1.42', caption: 'metal ions in layers; electrons (blue) are free to move',
  draw: (s, p) => {
    const x0 = 1.0, y0 = 1.85, d = 0.72;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) plusIon(s, x0 + c * d, y0 + r * d, 0.25, '+', 'C9CDD3', '5A6275');
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) { const x = x0 + c * d + d / 2 + ((r + c) % 2 ? 0.08 : -0.06), y = y0 + r * d + d / 2 - 0.36 + ((r * 3 + c) % 3) * 0.12; if (r < 3 || c % 2) ball(s, x, y, 0.055, '1F5F99', '1F5F99'); }
    arrow(s, 2.4, 5.0, 4.4, 5.0, C.red, 2); label(s, 2.0, 5.1, 2.8, 'layers slide (malleable)', { size: 10, h: 0.3, color: C.red });
  },
  head: 'Structure → properties',
  lines: [
    'Metals are a giant structure of **positive ions** in a **sea of delocalised electrons**; strong attraction between them.',
    '**Conduct electricity and heat:** delocalised electrons move through the metal.',
    '**Malleable:** layers of ions can **slide** over each other.',
    'Most metals: **shiny**, **high melting point**, **high density**, good conductors. Most non-metals: low boiling points, poor conductors.',
  ],
  worked: { head: 'Explain', q: 'Why can copper be bent into wires?',
    steps: [['Structure', 'layers of positive ions'], ['Bonding', 'delocalised electrons hold the layers together'], ['Answer', 'layers slide without breaking the bonding']], size: 11 },
  workedH: 1.85,
  qc: 'Explain why metals **conduct electricity**.',
  notes: 'QUICK CHECK ANSWER: they have delocalised electrons (1) that are free to move through the structure / carry charge (1).\nSpec 1.40 and 1.42.',
}), '1.40, 1.42 Metals');

// ======================= 24 COMPARING STRUCTURES + MODELS =======================
{
  const s = D.contentHeader('Comparing structures; limits of models', 'Specification 1.32, 1.41 • classify a substance from its properties', { tag: '1.32, 1.41' });
  const data = [
    ['Ionic', 'NaCl, MgO', 'high', 'no', 'yes', 'often soluble'],
    ['Simple molecular', 'H₂O, CO₂, CH₄', 'low', 'no', 'no', 'varies'],
    ['Giant covalent', 'diamond, SiO₂', 'very high', 'no*', 'no', 'insoluble'],
    ['Metallic', 'Cu, Fe', 'high', 'yes', 'yes (molten)', 'insoluble'],
  ];
  const rows = [[HDR('Type'), HDR('Examples'), HDR('Melting point'), HDR('Conducts as solid?'), HDR('Molten / dissolved?'), HDR('In water')], ...data.map((r, i) => r.map((c, j) => tcell(c, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.1, 2.3, 1.8, 2.1, 2.2, 1.93], rowH: 0.42, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 0.45, 3.5, 12.4, '*graphite and graphene are giant covalent but **do** conduct (delocalised electrons).', { size: 10.5, h: 0.28, align: 'left', italic: true, color: C.grey });
  const lim = [
    ['Dot and cross', 'shows where electrons come from, but not the 3-D shape or the sizes of atoms; all electrons are really identical'],
    ['Ball and stick', 'shows 3-D shape and bond angles, but bonds are not sticks and atoms are not separate balls; gaps are too big'],
    ['2-D drawings', 'easy to draw, but cannot show the 3-D arrangement'],
    ['3-D space-filling', 'shows relative sizes, but hides the bonds and the inside of the structure'],
  ];
  D.card(s, 0.45, 3.9, 12.43, 2.35, 'Every model has limitations (1.41)', lim.map(([a, b]) => `**${a}:** ${b}.`), { size: 11.5 });
  D.quickCheck(s, 'Substance X melts at 801 °C and conducts only when molten or dissolved. Which **type** of structure is it?');
  D.notes(s, 'QUICK CHECK ANSWER: ionic (1) (it is sodium chloride).\nSpec 1.32 (classifying and explaining properties) and 1.41 (limitations of models).');
  reg(s, '1.32, 1.41 Comparing structures');
}

// ======================= 25 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 1.32–1.42 • giant structures and metals', [
  { q: 'Explain why diamond is used in **cutting tools**.', marks: 2, ms: 'Each carbon forms 4 strong covalent bonds (1); giant rigid structure so very hard (1).' },
  { q: 'Explain why graphite is used for **electrodes**.', marks: 2, ms: 'It has delocalised electrons (1) that can move and carry charge / conducts (1); (also high melting point).' },
  { q: 'Give **one** limitation of a **ball and stick** model.', marks: 1, ms: 'Any one: bonds are not physical sticks; atoms are not spaced apart; sizes not to scale (1).' },
  { q: 'Explain why metals are **malleable**.', marks: 2, ms: 'Layers of (positive) ions (1); can slide over each other (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 26 Mr AND EMPIRICAL FORMULAE =======================
reg(D.contentSlide({
  title: 'Relative formula mass and empirical formulae',
  subtitle: 'Specification 1.43–1.45 • from masses or percentages',
  tag: '1.43–1.45', caption: 'the empirical formula method as a table',
  draw: (s, p) => {
    eqn(s, 0.7, 1.5, 5.6, 'Mr of Ca(OH)₂ = 40 + 2 × (16 + 1) = 74', { size: 13 });
    const rows = [[HDR('Step'), HDR('C'), HDR('H')], ...[['mass or %', '75', '25'], ['÷ Ar', '75 ÷ 12 = 6.25', '25 ÷ 1 = 25'], ['÷ smallest', '1', '4'], ['formula', 'CH₄', '']].map((r, i) => r.map((c, j) => tcell(c, i, { bold: j === 0 || i === 3, color: i === 3 ? C.green : C.text })))];
    s.addTable(rows, { x: 0.7, y: 2.2, w: 5.6, colW: [1.7, 1.95, 1.95], rowH: 0.45, fontFace: 'Calibri', fontSize: 12.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    box(s, 0.7, 4.65, 5.6, 0.95, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 4.65, 5.4, '**Molecular formula** from empirical: empirical CH₂ (Mr 14), molecule Mr 56 → 56 ÷ 14 = 4 → **C₄H₈**', { size: 11, h: 0.95 });
  },
  head: 'Key ideas',
  lines: [
    '**Relative formula mass (Mr)** = sum of the Ar values of all the atoms in the formula.',
    'The **empirical formula** is the **simplest whole-number ratio** of atoms.',
    'Method: mass (or %) of each element → **÷ Ar** → **÷ smallest** → whole numbers.',
    'Molecular formula = empirical formula × (Mr ÷ empirical Mr). The empirical formula of H₂O₂ is **HO**.',
  ],
  worked: { head: 'Worked example', q: 'An iron oxide is 70% Fe and 30% O. Find its empirical formula. (Fe = 56)',
    steps: [['÷ Ar', 'Fe 70 ÷ 56 = 1.25;  O 30 ÷ 16 = 1.875'], ['÷ smallest', '1 : 1.5'], ['× 2', '2 : 3'], ['Answer', 'Fe₂O₃']] },
  qc: 'Calculate the Mr of **ammonium sulfate, (NH₄)₂SO₄**. (N = 14, H = 1, S = 32, O = 16)',
  notes: 'QUICK CHECK ANSWER: 2 × (14 + 4) + 32 + 4 × 16 (1) = 132 (1).\nAll Mr values and ratios checked in node. Spec 1.43–1.45.',
}), '1.43–1.45 Mr and empirical formulae');

// ======================= 27 MgO EXPERIMENT =======================
{
  const s = D.contentSlide({
    title: 'Practical: empirical formula of MgO',
    subtitle: 'Specification 1.46 • heating magnesium ribbon in a crucible',
    tag: '1.46', caption: 'crucible on a pipeclay triangle; lift the lid now and then to let air in',
    draw: (s, p) => {
      tripodBunsen(s, 2.0, 3.45, 5.55, { hw: 0.75 });
      poly(s, [[1.5, 2.65], [2.5, 2.65], [2.35, 3.4], [1.65, 3.4]], 'E8E2D8', '6B6457', { lw: 1.25 });
      box(s, 1.45, 2.42, 1.1, 0.1, 'E8E2D8', '6B6457', { lw: 1.25, rotate: -12 });
      line(s, 1.4, 3.42, 2.6, 3.42, 'D6C9A8', 3);
      [[1.75, 3.2], [1.95, 3.25], [2.2, 3.18]].forEach(([x, y]) => line(s, x, y, x + 0.15, y - 0.08, '9AA3B0', 2));
      callout(s, 3.2, 2.25, 1.6, '**lid** (ajar)', 2.4, 2.45, {});
      callout(s, 3.2, 2.9, 2.0, '**crucible** + Mg', 2.4, 3.0, {});
      const rows = [[HDR('Measurement'), HDR('Mass / g')], ...[['crucible + lid', crucible.toFixed(2)], ['+ magnesium', withMg.toFixed(2)], ['after heating', after.toFixed(2)]].map((r, i) => r.map((c, j) => tcell(c, i, { bold: j === 0 })))];
      s.addTable(rows, { x: 3.35, y: 3.65, w: 3.0, colW: [1.85, 1.15], rowH: 0.36, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    },
    head: 'Method',
    lines: [
      'Weigh an empty crucible and lid; add **cleaned** magnesium ribbon and weigh again.',
      'Heat strongly, **lifting the lid** from time to time to let oxygen in but keep the white MgO **smoke** inside.',
      'When it stops glowing, cool and weigh. **Heat again until the mass is constant**.',
      '**Safety:** eye protection; do not look directly at burning magnesium; hot crucible: use tongs.',
    ],
    worked: { head: 'Results', q: '',
      steps: [['Mg', '25.44 − 25.20 = 0.24 g → 0.24 ÷ 24 = 0.010 mol'], ['O', '25.60 − 25.44 = 0.16 g → 0.16 ÷ 16 = 0.010 mol'], ['Answer', '1 : 1, so MgO']], size: 11 },
    workedH: 1.75,
    qc: 'Why is the crucible **heated to constant mass**?',
    notes: `QUICK CHECK ANSWER: to make sure all the magnesium has reacted (1).\nErrors: lifting the lid too much lets MgO smoke escape (mass too low, ratio of O too small); some Mg reacts with nitrogen.\nEquation: ${EQ['Mg+O2']}. Spec 1.46 (a described practical; not one of the Edexcel Core Practicals).`,
  });
  reg(s, '1.46 Practical: MgO');
}

// ======================= 28 CONSERVATION OF MASS =======================
reg(D.contentSlide({
  title: 'Conservation of mass',
  subtitle: 'Specification 1.47 • closed and non-enclosed systems',
  tag: '1.47', caption: 'left: closed flask, mass unchanged; right: open flask, CO₂ escapes',
  draw: (s, p) => {
    conical(s, 1.8, 2.0, 1.4, 2.0, 0.45, 'EEF1F5');
    box(s, 1.6, 1.85, 0.4, 0.25, '5A3E2B', '3A2A1B');
    [[1.55, 3.6], [1.8, 3.7], [2.05, 3.55], [1.7, 3.8], [1.95, 3.82]].forEach(([x, y]) => ball(s, x, y, 0.05, 'FFFFFF', '8A8F99', 0.75));
    balance(s, 1.12, 4.25, '152.40 g');
    label(s, 0.6, 4.95, 2.6, 'precipitation: **no change**', { size: 10.5, h: 0.28 });
    conical(s, 4.7, 2.0, 1.4, 2.0, 0.45, ACIDC);
    bubbles(s, [[4.5, 3.4], [4.7, 3.2], [4.9, 3.45], [4.65, 2.6], [4.8, 2.3], [4.6, 1.8]]);
    balance(s, 4.02, 4.25, '148.00 g');
    label(s, 3.5, 4.95, 2.6, 'gas escapes: **mass falls**', { size: 10.5, h: 0.28 });
  },
  head: 'Key ideas',
  lines: [
    'No atoms are made or destroyed in a reaction, so the **total mass stays the same**.',
    '**Closed system** (sealed flask): the mass on the balance does **not change**.',
    '**Non-enclosed system:** if a **gas escapes**, the mass **decreases**; if a gas is **taken in** (e.g. oxygen when a metal burns), the mass **increases**.',
  ],
  worked: { head: 'Explain', q: 'Marble chips react with acid in an open flask. Why does the mass go down?',
    steps: [['Equation', EQ['CaCO3+HCl']], ['Gas', 'carbon dioxide escapes into the air'], ['Answer', 'mass lost = mass of CO₂ given off']], size: 10.5 },
  workedH: 1.85,
  qc: 'Magnesium is burned in an open crucible. Explain why the mass **increases**.',
  notes: `QUICK CHECK ANSWER: magnesium combines with oxygen from the air (1); so the product (MgO) has more mass than the magnesium (the mass of oxygen is added) (1).\nClosed-flask example: ${EQ['BaCl2+Na2SO4']} (barium sulfate is the white precipitate).\nSpec 1.47.`,
}), '1.47 Conservation of mass');

// ======================= 29 REACTING MASSES AND CONCENTRATION =======================
reg(D.contentSlide({
  title: 'Reacting masses and concentration',
  subtitle: 'Specification 1.48–1.49 • use the equation; concentration in g dm⁻³',
  tag: '1.48–1.49', caption: 'mass ratios come from Mr values and the balancing numbers',
  draw: (s, p) => {
    eqn(s, 0.7, 1.55, 5.6, EQ['Mg+O2'], { size: 13 });
    [['2Mg', '2 × 24 = 48', 1.3], ['O₂', '32', 3.1], ['2MgO', '2 × 40 = 80', 4.9]].forEach(([f, m, x]) => { label(s, x - 0.9, 2.1, 1.8, `**${f}**`, { size: 12, h: 0.3 }); label(s, x - 0.9, 2.4, 1.8, m, { size: 11, h: 0.3, color: C.blue }); });
    label(s, 0.7, 2.85, 5.6, '48 g of Mg makes 80 g of MgO, so **12 g** makes 12 × 80 ÷ 48 = **20 g**', { size: 11, h: 0.5 });
    box(s, 0.7, 3.55, 5.6, 2.05, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.85, 3.6, 5.3, '**concentration (g dm⁻³) = mass (g) ÷ volume (dm³)**', { size: 12.5, h: 0.4, align: 'left' });
    label(s, 0.85, 4.05, 5.3, '1 dm³ = 1000 cm³, so 250 cm³ = 0.250 dm³', { size: 11, h: 0.3, align: 'left' });
    label(s, 0.85, 4.4, 5.3, '5.0 g in 250 cm³:  5.0 ÷ 0.250 = **20 g dm⁻³**', { size: 11.5, h: 0.32, align: 'left' });
    label(s, 0.85, 4.8, 5.3, 'Mass in 100 cm³ of a 40 g dm⁻³ solution:  40 × 0.100 = **4.0 g**', { size: 11.5, h: 0.5, align: 'left' });
  },
  head: 'Method for reacting masses',
  lines: [
    'Write the **balanced equation**.',
    'Work out the **mass ratio** using Mr × balancing number for the two substances you need.',
    '**Scale** the ratio to the mass you are given.',
  ],
  worked: { head: 'Worked example', q: 'What mass of calcium oxide forms when 50 g of calcium carbonate is heated?',
    steps: [['Equation', EQ['CaCO3 heat']], ['Ratio', 'CaCO₃ 100 g → CaO 56 g'], ['Scale', '50 × 56 ÷ 100'], ['Answer', '28 g']], size: 11 },
  workedH: 2.25,
  qc: 'What mass of magnesium oxide is made from **6 g** of magnesium?',
  notes: 'QUICK CHECK ANSWER: 6 × 80 ÷ 48 (1) = 10 g (1).\nSpec 1.48–1.49 (Foundation can use the mass-ratio method; Higher students may use moles, next slides).',
}), '1.48–1.49 Reacting masses, concentration');

// ======================= 30 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 1.43–1.49 • calculations', [
  { q: 'Calculate the Mr of **magnesium nitrate, Mg(NO₃)₂**. (Mg = 24, N = 14, O = 16)', marks: 2, ms: '24 + 2 × (14 + 48) (1); = 148 (1).' },
  { q: 'A nitrogen oxide contains **2.8 g** of nitrogen and **1.6 g** of oxygen. Find its empirical formula.', marks: 3, ms: 'N 2.8 ÷ 14 = 0.2; O 1.6 ÷ 16 = 0.1 (1); ratio 2 : 1 (1); N₂O (1).' },
  { q: 'Explain why the mass of a flask of acid and marble chips **decreases** during the reaction.', marks: 2, ms: 'Carbon dioxide (gas) is made (1); it escapes from the open flask (1).' },
  { q: '**2.5 g** of salt is dissolved to make **500 cm³** of solution. Calculate the concentration in g dm⁻³.', marks: 2, ms: '2.5 ÷ 0.5 (1); = 5 g dm⁻³ (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 31 THE MOLE (HT) =======================
reg(D.contentSlide({
  title: 'The mole and the Avogadro constant',
  subtitle: 'Specification 1.50–1.51 • counting particles by weighing', ht: true,
  tag: '1.50–1.51', caption: 'formula triangle: cover the quantity you want',
  draw: (s, p) => {
    const ax = 1.0, ay = 4.6, bx = 4.2, top = 1.7;
    poly(s, [[(ax + bx) / 2, top], [bx, ay], [ax, ay]], 'EFE6FA', '6A3FA0', { lw: 2 });
    line(s, ax + 0.75, 3.4, bx - 0.75, 3.4, '6A3FA0', 2); line(s, (ax + bx) / 2, 3.4, (ax + bx) / 2, ay, '6A3FA0', 2);
    label(s, (ax + bx) / 2 - 0.7, 2.6, 1.4, '**mass (g)**', { size: 13, h: 0.4 });
    label(s, ax + 0.35, 3.75, 1.3, '**moles**', { size: 13, h: 0.4 }); label(s, (ax + bx) / 2 + 0.05, 3.75, 1.3, '**Mr**', { size: 13, h: 0.4 });
    box(s, 4.45, 1.7, 1.9, 2.9, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.5, 1.75, 1.8, '**1 mole** contains\n**6.02 × 10²³**\nparticles\n\nand has a mass of\n**Mr in grams**', { size: 11.5, h: 2.8 });
    label(s, 0.6, 4.9, 5.8, 'particles = moles × 6.02 × 10²³', { size: 13, h: 0.4, bold: true, color: C.blue });
  },
  head: 'Key ideas',
  lines: [
    'One **mole** of a substance contains the **Avogadro constant**, **6.02 × 10²³**, of particles (atoms, molecules, ions or formula units).',
    'One mole has a mass equal to its **relative particle mass in grams** (e.g. 1 mol H₂O = 18 g).',
    '**moles = mass ÷ Mr**;  **particles = moles × 6.02 × 10²³**.',
  ],
  worked: { head: 'Worked example', q: 'How many molecules are in 36 g of water?',
    steps: [['Moles', '36 ÷ 18 = 2.0 mol'], ['Particles', '2.0 × 6.02 × 10²³'], ['Answer', '1.204 × 10²⁴ molecules']] },
  qc: 'Calculate the mass of **0.5 mol** of carbon dioxide, and the mass of **3.01 × 10²³** sodium atoms.',
  notes: 'QUICK CHECK ANSWER: 0.5 × 44 = 22 g (1); 3.01 × 10²³ ÷ 6.02 × 10²³ = 0.5 mol, × 23 = 11.5 g (2).\nSpec 1.50–1.51 (Higher only). All values checked in node.',
}), '1.50–1.51 The mole (HT)');

// ======================= 32 LIMITING REACTANTS AND STOICHIOMETRY (HT) =======================
reg(D.contentSlide({
  title: 'Limiting reactants and stoichiometry',
  subtitle: 'Specification 1.52–1.53 • the reactant that runs out controls the product', ht: true,
  tag: '1.52–1.53', caption: 'moles needed vs moles available for Mg + 2HCl (bars to scale)',
  draw: (s, p) => {
    eqn(s, 0.7, 1.5, 5.6, EQ['Mg+HCl'], { size: 12.5 });
    const k = 6.0, x0 = 2.2;
    [['Mg have', 0.2, 'DCE8F7', '0.20 mol'], ['HCl needed', 0.4, 'F6B0A8', '0.40 mol'], ['HCl have', 0.5, 'F9E0DA', '0.50 mol']].forEach(([t, v, col, tx], i) => {
      const y = 2.2 + i * 0.6;
      label(s, 0.6, y, 1.5, `**${t}**`, { size: 11, h: 0.45, align: 'right' });
      box(s, x0, y + 0.05, v * k, 0.35, col, '6B7385', { lw: 0.75 });
      label(s, x0 + v * k + 0.08, y, 1.2, tx, { size: 11, h: 0.45, align: 'left' });
    });
    label(s, 0.7, 4.1, 5.6, 'HCl is in **excess** (0.10 mol left); **Mg is limiting** → 0.20 mol H₂ = **0.40 g**', { size: 11, h: 0.5 });
    box(s, 0.7, 4.7, 5.6, 0.95, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 4.7, 5.4, `**Stoichiometry:** 11.2 g Fe + 21.3 g Cl₂ → 32.5 g FeCl₃\n0.2 : 0.3 : 0.2 mol = **2 : 3 : 2** → ${EQ['Fe+Cl2']}`, { size: 10.5, h: 0.95 });
  },
  head: 'Key ideas',
  lines: [
    'The **limiting reactant** is completely used up; the other is **in excess**.',
    'The mass of product depends on the **limiting reactant**: double it, double the product.',
    '**Stoichiometry from masses:** convert each mass to **moles**, divide by the **smallest**, and use the ratio as the balancing numbers.',
  ],
  worked: { head: 'Worked example', q: '4.8 g Mg is added to 18.25 g HCl. Which is limiting? What mass of H₂ forms?',
    steps: [['Moles', 'Mg 4.8 ÷ 24 = 0.20;  HCl 18.25 ÷ 36.5 = 0.50'], ['Need', '0.20 mol Mg needs 0.40 mol HCl: HCl in excess'], ['Answer', 'Mg limiting; 0.20 mol H₂ × 2 = 0.40 g']], size: 11 },
  workedH: 2.0,
  qc: '**2.4 g** of magnesium reacts exactly with **1.6 g** of oxygen, O₂. Find the ratio of moles Mg : O₂.',
  notes: 'QUICK CHECK ANSWER: Mg 2.4 ÷ 24 = 0.1 mol; O₂ 1.6 ÷ 32 = 0.05 mol (1); ratio 2 : 1, matching 2Mg + O₂ → 2MgO (1).\nSpec 1.52–1.53 (Higher only). All numbers checked in node.',
}), '1.52–1.53 Limiting reactants (HT)');

// ======================= 33 RECAP 7 (HT) =======================
const R7 = D.recapSlide(7, 'Specification 1.50–1.53 • moles (Higher)', [
  { q: 'Calculate the number of moles in **4.0 g** of sodium hydroxide, NaOH. (Mr = 40)', marks: 1, ms: '0.1 mol (1).' },
  { q: 'Calculate the mass of **0.25 mol** of magnesium oxide.', marks: 2, ms: '0.25 × 40 (1); = 10 g (1).' },
  { q: 'Calculate the number of molecules in **8.8 g** of carbon dioxide.', marks: 2, ms: '8.8 ÷ 44 = 0.2 mol (1); 0.2 × 6.02 × 10²³ = 1.20 × 10²³ (1).' },
  { q: 'Explain what is meant by a **limiting reactant**.', marks: 2, ms: 'The reactant that is completely used up (1); it limits/controls the amount of product (1).' },
], { ht: true });
reg(R7.s, 'Recap 7 (HT)');

// ======================= 34 CALCULATION BANK =======================
{
  const s = D.contentHeader('Summary: Topic 1 calculations', 'Specification 1.10–1.53 • every example checked', { tag: 'Calculation bank' });
  const bank = [
    ['p, n, e', 'n = mass number − atomic number; ions: e = p − charge', '³⁷Cl: 17, 20, 17', '1.10, 1.23'],
    ['Relative atomic mass', 'Σ(mass × %) ÷ 100', 'Cl: 35.5', '1.12'],
    ['Relative formula mass', 'add up all the Ar values', 'Ca(OH)₂ = 74', '1.43'],
    ['Empirical formula', 'mass ÷ Ar → ÷ smallest → whole numbers', 'Fe₂O₃', '1.44–1.45'],
    ['Reacting masses', 'mass ratio from Mr × balancing numbers', '12 g Mg → 20 g MgO', '1.48'],
    ['Concentration', 'g dm⁻³ = mass ÷ volume (dm³)', '5 g in 250 cm³ = 20', '1.49'],
    ['Moles (HT)', 'moles = mass ÷ Mr', '36 g H₂O = 2 mol', '1.51'],
    ['Particles (HT)', 'particles = moles × 6.02 × 10²³', '2 mol = 1.204 × 10²⁴', '1.51'],
    ['Limiting reactant (HT)', 'compare moles with the equation ratio', 'Mg limiting → 0.40 g H₂', '1.52'],
    ['Stoichiometry (HT)', 'masses → moles → simplest ratio', '2Fe + 3Cl₂ → 2FeCl₃', '1.53'],
  ];
  const rows = [[HDR('Calculation'), HDR('Method'), HDR('Example'), HDR('Spec')], ...bank.map(([a, b, c, d], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i, { bold: true, color: C.ink }), tcell(d, i, { color: C.blue, align: 'center' })])];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.6, 5.0, 3.4, 1.43], rowH: 0.43, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, 'Cover the Method column. Say each method aloud, then check it.');
  D.notes(s, 'Retrieval grid. Every example on this slide comes from a slide in the deck and is checked in build_T1.js.\nEquations checked for atoms and charge:\n' + EQLIST.join('\n'));
  reg(s, 'Summary: calculations');
}

// ======================= 35 KEY WORDS =======================
reg(D.keyWords([
  ['Atomic number', 'Number of protons in the nucleus.'],
  ['Mass number', 'Number of protons + neutrons.'],
  ['Isotopes', 'Same protons, different numbers of neutrons.'],
  ['Relative atomic mass', 'Weighted mean mass of an element’s isotopes.'],
  ['Period / group', 'Row (number of shells) / column (outer electrons).'],
  ['Ion', 'Atom or group of atoms with a charge.'],
  ['Ionic bond', 'Electrostatic attraction between oppositely charged ions.'],
  ['Covalent bond', 'A shared pair of electrons.'],
  ['Lattice', 'Regular, repeating 3-D arrangement of particles.'],
  ['Intermolecular force', 'Weak force between simple molecules.'],
  ['Delocalised electron', 'Electron free to move through a structure.'],
  ['Empirical formula', 'Simplest whole-number ratio of atoms.'],
  ['Relative formula mass', 'Sum of the Ar values in a formula.'],
  ['Mole (HT)', '6.02 × 10²³ particles; Mr in grams.'],
  ['Limiting reactant (HT)', 'Reactant that is used up; controls the product.'],
  ['Closed system', 'Nothing can enter or leave; total mass constant.'],
], { notes: 'Cover-and-recall activity. HT terms are marked (HT).' }), 'Summary: key words');

// ======================= 36 FULL QUESTION =======================
reg(D.fullQuestion('Magnesium has three isotopes: **²⁴Mg (79%)**, **²⁵Mg (10%)** and **²⁶Mg (11%)**. Its atomic number is 12.', [
  { l: 'a', q: 'Give the numbers of protons, neutrons and electrons in an atom of ²⁵Mg.', marks: 2, ms: '12 protons and 12 electrons (1); 13 neutrons (1).' },
  { l: 'b', q: 'Calculate the relative atomic mass of magnesium to 1 decimal place.', marks: 2, ms: '(24 × 79 + 25 × 10 + 26 × 11) ÷ 100 (1); = 24.3 (1).' },
  { l: 'c', q: 'Write the electronic configuration of magnesium and explain how it shows magnesium’s position in the periodic table.', marks: 2, ms: '2.8.2 (1); 3 shells so period 3 AND 2 outer electrons so group 2 (1).', h: 1.0 },
  { l: 'd', q: 'Magnesium reacts with oxygen to form magnesium oxide. Describe what happens to the electrons and the type of bonding formed.', marks: 3, ms: 'Each Mg atom loses 2 electrons (1); each O atom gains 2 electrons, forming Mg²⁺ and O²⁻ (1); ionic bonding: electrostatic attraction between oppositely charged ions (1).', h: 1.1 },
  { l: 'e', q: 'Explain why magnesium oxide has a high melting point.', marks: 2, ms: 'Giant ionic lattice / strong electrostatic forces between ions (1); a lot of energy needed to overcome them (1).' },
  { l: 'f', q: 'Calculate the mass of magnesium oxide formed when **0.48 g** of magnesium burns completely.', marks: 2, ht: true, ms: '0.48 ÷ 24 = 0.02 mol Mg = 0.02 mol MgO (1); 0.02 × 40 = 0.80 g (1). (Mass-ratio method also accepted: 0.48 × 80 ÷ 48.)' },
], 13, { ht: true, subtitle: 'Specification 1.10–1.27, 1.48–1.51 • answer every part • 13 marks (part f uses moles: HT)' }), 'Full question');

// ======================= 37–38 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Give the relative mass and relative charge of an **electron**.', marks: 2, ms: 'Very small / 1/1836 (1); −1 (1).', h: 0.75 },
  { n: '2', q: 'Describe the bonding in a molecule of **water**. Include the number of shared pairs.', marks: 2, ms: 'Covalent: shared pairs of electrons (1); two shared pairs (one between O and each H) (1).', h: 0.85 },
  { n: '3', q: 'Calculate the relative formula mass of **calcium nitrate, Ca(NO₃)₂**. (Ca = 40, N = 14, O = 16)', marks: 2, ms: '40 + 2 × (14 + 3 × 16) (1); = 164 (1).', h: 0.85 },
  { n: '4', q: 'A hydrocarbon contains **0.36 g** of carbon and **0.08 g** of hydrogen. Find its empirical formula.', marks: 3, ms: 'C 0.36 ÷ 12 = 0.03; H 0.08 ÷ 1 = 0.08 (1); ratio 3 : 8 (1); C₃H₈ (1).', h: 0.95 },
  { n: '5', q: 'Calculate the number of molecules in **8.8 g** of carbon dioxide.', marks: 2, ht: true, ms: '8.8 ÷ 44 = 0.2 mol (1); 0.2 × 6.02 × 10²³ = 1.20 × 10²³ (1).', h: 0.8 },
  { n: '6', q: 'Diamond and graphite are both forms of carbon. Explain why diamond is very hard and does not conduct electricity, but graphite is soft, conducts electricity and is used as a lubricant.', marks: 6, levels: true, h: 1.55, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Both are giant covalent structures with strong covalent bonds.',
    'In diamond, each carbon atom is bonded to four others in a rigid 3-D network.',
    'So diamond is very hard: many strong bonds must be broken (used in cutting tools).',
    'All outer electrons in diamond are used in bonds, so there are no free electrons: no conduction.',
    'In graphite, each carbon is bonded to three others in layers of hexagons.',
    'Weak forces between the layers let them slide over each other: soft, slippery, a lubricant.',
    'Each carbon in graphite has one delocalised electron that can move through the layers, so graphite conducts.',
  ], 'Level 3 answers compare both structures AND link each property to the bonding (number of bonds, layers, delocalised electrons).');
}
D.homework('Answer every question. Question 5 is Higher tier. Show your working.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5, R6, R7].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7);
assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 9); assert.strictEqual(R7.total, 7);
assert(D.slideNo >= 34 && D.slideNo <= 46, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T1_KeyConcepts.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
