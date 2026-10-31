// build_C6_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C6 Making useful chemicals, C6.1 What useful products can be made from acids?
// (one deck, Higher & Foundation; Part 1 of 3)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C6_1.js
// Structure copied from build_C5_2.js / build_C4_4.js (approved, same template). ocr_chem_template.js is NOT edited:
// ion, beaker, test tube, flask, funnel, basin, pH strip, pH meter and equation-balance helpers are in the
// DECK-SPECIFIC block below.
// Scope (see SPEC_C6_1.md): acids and alkalis as H+ and OH- ions, pH (universal indicator, pH meter), neutralisation
// (acid + alkali/base -> salt + water; H+ + OH- -> H2O), acids with metals (HT redox in electrons) and carbonates,
// predicting products and formulae of salts, useful salts, HT strong/weak and concentrated/dilute, HT pH and the
// factor-of-ten rule, PAG C4 production of salts (magnesium sulfate from magnesium carbonate; C5.1 already did copper
// sulfate). Rates (C6.2) and yield / percentage yield (C6.3) are NOT taught here. Titration is C5.3 (recap only).
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C6', chapterTitle: 'Making useful chemicals', code: 'C6.1', title: 'What useful products can be made from acids?',
  part: 1, parts: 3, specRange: 'C6.1.1–C6.1.8',
  subtitle: 'What useful products can be made from acids?',
  keywords: ['Acid', 'Alkali', 'Salt', 'Neutralisation', 'pH', 'Strong and weak acids'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= EQUATIONS: atom and charge balance (asserted) =======================
function parseFormula(f) {
  let charge = 0;
  if (f === 'e-') return { atoms: {}, charge: -1 };
  const m = f.match(/^(.*)\^(\d?)([+-])$/); // ion charge written after ^, e.g. 'Mg^2+', 'NH4^+'
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
function side(terms) {
  const tot = { atoms: {}, charge: 0 };
  terms.forEach(([n, f]) => { const p = parseFormula(f); tot.charge += n * p.charge; for (const [k, v] of Object.entries(p.atoms)) tot.atoms[k] = (tot.atoms[k] || 0) + n * v; });
  return tot;
}
const EQN = [];
function balanced(name, lhs, rhs) {
  const a = side(lhs), b = side(rhs);
  assert.deepStrictEqual(Object.keys(a.atoms).sort().map(k => [k, a.atoms[k]]), Object.keys(b.atoms).sort().map(k => [k, b.atoms[k]]), `atoms not balanced: ${name}`);
  assert.strictEqual(a.charge, b.charge, `charge not balanced: ${name}`);
  EQN.push(name);
  return { lhs, rhs, a, b };
}
// parser self-test on ions
assert.deepStrictEqual(parseFormula('Mg^2+'), { atoms: { Mg: 1 }, charge: 2 });
assert.deepStrictEqual(parseFormula('OH^-'), { atoms: { O: 1, H: 1 }, charge: -1 });
assert.deepStrictEqual(parseFormula('NH4^+'), { atoms: { N: 1, H: 4 }, charge: 1 });
assert.deepStrictEqual(parseFormula('CH3COO^-'), { atoms: { C: 2, H: 3, O: 2 }, charge: -1 });
// acids and alkalis in water (slide 5)
balanced('HCl → H+ + Cl-', [[1, 'HCl']], [[1, 'H^+'], [1, 'Cl^-']]);
balanced('HNO3 → H+ + NO3-', [[1, 'HNO3']], [[1, 'H^+'], [1, 'NO3^-']]);
balanced('NaOH → Na+ + OH-', [[1, 'NaOH']], [[1, 'Na^+'], [1, 'OH^-']]);
// neutralisation (slide 8)
balanced('HCl + NaOH → NaCl + H2O', [[1, 'HCl'], [1, 'NaOH']], [[1, 'NaCl'], [1, 'H2O']]);
balanced('H+ + OH- → H2O', [[1, 'H^+'], [1, 'OH^-']], [[1, 'H2O']]);
balanced('H2SO4 + 2KOH → K2SO4 + 2H2O', [[1, 'H2SO4'], [2, 'KOH']], [[1, 'K2SO4'], [2, 'H2O']]);
balanced('CuO + H2SO4 → CuSO4 + H2O', [[1, 'CuO'], [1, 'H2SO4']], [[1, 'CuSO4'], [1, 'H2O']]);
balanced('HNO3 + NaOH → NaNO3 + H2O', [[1, 'HNO3'], [1, 'NaOH']], [[1, 'NaNO3'], [1, 'H2O']]);
// metals (slide 9)
balanced('Mg + 2HCl → MgCl2 + H2', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
balanced('Zn + H2SO4 → ZnSO4 + H2', [[1, 'Zn'], [1, 'H2SO4']], [[1, 'ZnSO4'], [1, 'H2']]);
balanced('Zn + 2HCl → ZnCl2 + H2', [[1, 'Zn'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2']]);
balanced('Fe + 2HCl → FeCl2 + H2', [[1, 'Fe'], [2, 'HCl']], [[1, 'FeCl2'], [1, 'H2']]);
balanced('HT Mg → Mg2+ + 2e-', [[1, 'Mg']], [[1, 'Mg^2+'], [2, 'e-']]);
balanced('HT 2H+ + 2e- → H2', [[2, 'H^+'], [2, 'e-']], [[1, 'H2']]);
balanced('HT Mg + 2H+ → Mg2+ + H2', [[1, 'Mg'], [2, 'H^+']], [[1, 'Mg^2+'], [1, 'H2']]);
balanced('QC 2Al + 6HCl → 2AlCl3 + 3H2', [[2, 'Al'], [6, 'HCl']], [[2, 'AlCl3'], [3, 'H2']]);
balanced('QC HT Zn + 2H+ → Zn2+ + H2', [[1, 'Zn'], [2, 'H^+']], [[1, 'Zn^2+'], [1, 'H2']]);
// carbonates (slide 10)
balanced('CaCO3 + 2HCl → CaCl2 + H2O + CO2', [[1, 'CaCO3'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']]);
balanced('Na2CO3 + 2HCl → 2NaCl + H2O + CO2', [[1, 'Na2CO3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'H2O'], [1, 'CO2']]);
balanced('Ca(OH)2 + CO2 → CaCO3 + H2O', [[1, 'Ca(OH)2'], [1, 'CO2']], [[1, 'CaCO3'], [1, 'H2O']]);
balanced('CuCO3 + 2HNO3 → Cu(NO3)2 + H2O + CO2', [[1, 'CuCO3'], [2, 'HNO3']], [[1, 'Cu(NO3)2'], [1, 'H2O'], [1, 'CO2']]);
// useful products (slide 13)
balanced('NH3 + HNO3 → NH4NO3', [[1, 'NH3'], [1, 'HNO3']], [[1, 'NH4NO3']]);
balanced('2NH3 + H2SO4 → (NH4)2SO4', [[2, 'NH3'], [1, 'H2SO4']], [[1, '(NH4)2SO4']]);
balanced('Mg(OH)2 + 2HCl → MgCl2 + 2H2O', [[1, 'Mg(OH)2'], [2, 'HCl']], [[1, 'MgCl2'], [2, 'H2O']]);
balanced('3NH3 + H3PO4 → (NH4)3PO4', [[3, 'NH3'], [1, 'H3PO4']], [[1, '(NH4)3PO4']]);
// strong and weak (slide 15)
balanced('CH3COOH ⇌ CH3COO- + H+', [[1, 'CH3COOH']], [[1, 'CH3COO^-'], [1, 'H^+']]);
// PAG C4 (slides 19–20)
balanced('MgCO3 + H2SO4 → MgSO4 + H2O + CO2', [[1, 'MgCO3'], [1, 'H2SO4']], [[1, 'MgSO4'], [1, 'H2O'], [1, 'CO2']]);
balanced('MgSO4 + 7H2O → MgSO4.7H2O', [[1, 'MgSO4'], [7, 'H2O']], [[1, 'MgSO4(H2O)7']]);
// recaps, FQ, HW
balanced('ZnO + 2HCl → ZnCl2 + H2O', [[1, 'ZnO'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2O']]);
balanced('K2CO3 + 2HNO3 → 2KNO3 + H2O + CO2', [[1, 'K2CO3'], [2, 'HNO3']], [[2, 'KNO3'], [1, 'H2O'], [1, 'CO2']]);
balanced('Mg + H2SO4 → MgSO4 + H2', [[1, 'Mg'], [1, 'H2SO4']], [[1, 'MgSO4'], [1, 'H2']]);
balanced('KOH + HNO3 → KNO3 + H2O', [[1, 'KOH'], [1, 'HNO3']], [[1, 'KNO3'], [1, 'H2O']]);
balanced('extra 2Mg + O2 → 2MgO', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]);
assert.throws(() => balanced('unbalanced test', [[1, 'Mg'], [1, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]));
assert.throws(() => balanced('unbalanced charge test', [[1, 'Mg']], [[1, 'Mg^2+'], [1, 'e-']]));

// ======================= SALT FORMULAE FROM ION CHARGES (slide 12, asserted) =======================
const CAT = [['Na⁺', 'Na', 1], ['K⁺', 'K', 1], ['NH₄⁺', 'NH₄', 1, true], ['Mg²⁺', 'Mg', 2], ['Ca²⁺', 'Ca', 2], ['Zn²⁺', 'Zn', 2], ['Cu²⁺', 'Cu', 2], ['Al³⁺', 'Al', 3]];
const AN = [['Cl⁻', 'Cl', 1, false, 'chloride'], ['NO₃⁻', 'NO₃', 1, true, 'nitrate'], ['SO₄²⁻', 'SO₄', 2, true, 'sulfate']];
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const SUB = { 1: '', 2: '₂', 3: '₃', 4: '₄' };
function saltFormula(c, a) {
  const [, cs, cq, cpoly] = c, [, as, aq, apoly] = a;
  const L = cq * aq / gcd(cq, aq), nc = L / cq, na = L / aq;
  assert.strictEqual(nc * cq - na * aq, 0, 'charges cancel');
  const part = (sym, n, poly) => n === 1 ? sym : (poly ? `(${sym})${SUB[n]}` : `${sym}${SUB[n]}`);
  return part(cs, nc, cpoly) + part(as, na, apoly);
}
const SALT = {};
CAT.forEach(c => AN.forEach(a => { SALT[c[1] + '|' + a[1]] = saltFormula(c, a); }));
assert.strictEqual(SALT['Al|SO₄'], 'Al₂(SO₄)₃');
assert.strictEqual(SALT['Mg|Cl'], 'MgCl₂');
assert.strictEqual(SALT['NH₄|SO₄'], '(NH₄)₂SO₄');
assert.strictEqual(SALT['Ca|NO₃'], 'Ca(NO₃)₂');
assert.strictEqual(SALT['Na|SO₄'], 'Na₂SO₄');
assert.strictEqual(SALT['Zn|Cl'], 'ZnCl₂');
assert.strictEqual(SALT['K|NO₃'], 'KNO₃');
calc('Al2(SO4)3 charge: 2 × (+3) + 3 × (−2)', 2 * 3 + 3 * -2, 0);
calc('QC Ca(NO3)2 charge', 2 + 2 * -1, 0);

// ======================= RELATIVE FORMULA MASS (Ar to 1 d.p., OCR data sheet) =======================
const AR = { H: 1.0, C: 12.0, N: 14.0, O: 16.0, Na: 23.0, Mg: 24.3, S: 32.1, Cl: 35.5, K: 39.1, Ca: 40.1, Zn: 65.4, Cu: 63.5 };
const r1 = v => Math.round(v * 10) / 10;
function Mr(f) { const p = parseFormula(f).atoms; return r1(Object.entries(p).reduce((a, [k, v]) => { assert(AR[k], 'no Ar for ' + k); return a + AR[k] * v; }, 0)); }
const MR = {};
[['MgCO3', 84.3], ['H2SO4', 98.1], ['MgSO4', 120.4], ['HCl', 36.5], ['CH3COOH', 60.0], ['CaCO3', 100.1], ['H2O', 18.0]].forEach(([f, v]) => { MR[f] = calc(`Mr ${f}`, Mr(f), v, 1e-9); });

// ======================= pH CALCULATIONS (asserted) =======================
const pH = h => -Math.log10(h);
calc('pH of 0.1 mol/dm³ H+', pH(0.1), 1, 1e-12);
calc('pH of 0.001 mol/dm³ H+', pH(0.001), 3, 1e-12);
calc('pH of 1e-7 (neutral)', pH(1e-7), 7, 1e-12);
const LADDER = [1, 2, 3, 4, 5, 6, 7].map(p => [p, Math.pow(10, -p)]);
LADDER.forEach(([p, h], i) => { calc(`ladder pH ${p}`, pH(h), p, 1e-9); if (i) calc(`ladder ratio ${p}`, LADDER[i - 1][1] / h, 10, 1e-6); });
// dilution: 10 cm³ of pH 1 made up to 100 cm³
calc('dilute ×10: [H+] 0.1 → 0.01', 0.1 * 10 / 100, 0.01, 1e-12);
calc('dilute ×10: pH', pH(0.1 * 10 / 100), 2, 1e-9);
calc('QC pH 2 diluted ×100', pH(0.01 / 100), 4, 1e-9);
calc('pH 2 vs pH 5 ratio', Math.pow(10, 5 - 2), 1000, 1e-9);
calc('HW pH 2 vs pH 4 ratio', Math.pow(10, 4 - 2), 100, 1e-9);
calc('R4 pH 3 → pH 1 ratio', Math.pow(10, 3 - 1), 100, 1e-9);
calc('FQ 10 cm³ → 1000 cm³: factor', 1000 / 10, 100, 1e-12);
calc('FQ pH after ×100 dilution', pH(0.1 / 100), 3, 1e-9);
// strong vs weak at 0.10 mol/dm³ (ethanoic acid Ka = 1.74 × 10⁻⁵ mol/dm³, data-book value)
const KA = 1.74e-5;
const hWeak = (-KA + Math.sqrt(KA * KA + 4 * KA * 0.10)) / 2;
calc('weak [H+] 0.10 mol/dm³ ethanoic (2 s.f.)', sf(hWeak, 2), 0.0013, 1e-12);
calc('weak pH (2 s.f.)', sf(pH(hWeak), 2), 2.9, 1e-12);
calc('weak % ionised (2 s.f.)', sf(hWeak / 0.10 * 100, 2), 1.3, 1e-12);
calc('strong pH 0.10 mol/dm³ HCl', pH(0.10), 1.0, 1e-12);
calc('strong / weak [H+] ratio (2 s.f.)', sf(0.10 / hWeak, 2), 76, 1e-12);
// concentration (links to C5.3): g/dm³ for both tiers, mol/dm³ HT
calc('dilute HCl 7.3 g in 1.0 dm³', 7.3 / 1.0, 7.3, 1e-12);
calc('concentrated HCl 73 g in 1.0 dm³', 73 / 1.0, 73, 1e-12);
calc('HT 7.3 g/dm³ HCl → mol/dm³', 7.3 / MR.HCl, 0.2, 1e-9);
calc('HT 73 g/dm³ HCl → mol/dm³', 73 / MR.HCl, 2.0, 1e-9);
calc('QC HT 6.0 g ethanoic in 0.500 dm³', 6.0 / MR.CH3COOH / 0.500, 0.20, 1e-9);

// ======================= PAG C4: magnesium sulfate (illustrative) =======================
const V_ACID = 25.0, C_ACID = 0.50; // cm³, mol/dm³ sulfuric acid
const nAcid = calc('PAG mol H2SO4 = 0.50 × 25.0/1000', C_ACID * V_ACID / 1000, 0.0125, 1e-12);
const mNeed = calc('PAG mass MgCO3 to neutralise', nAcid * MR.MgCO3, 1.05375, 1e-9);
calc('PAG mass MgCO3 3 s.f.', sf(mNeed, 3), 1.05, 1e-12);
calc('PAG mass MgSO4 in solution (3 s.f.)', sf(nAcid * MR.MgSO4, 3), 1.51, 1e-12);
// pH-meter readings while MgCO3 is added (model: H2SO4 treated as fully ionised, both H+; illustrative after end point)
const hLeft = m => 2 * (nAcid - m / MR.MgCO3) / (V_ACID / 1000);
const PM = [0, 0.20, 0.40, 0.60, 0.80, 1.00, 1.20, 1.40];
const PPH = [0.0, 0.1, 0.2, 0.4, 0.6, 1.3, 6.9, 7.6];
PM.forEach((m, i) => { if (m < mNeed) calc(`PAG pH at ${m} g (1 d.p.)`, Math.round(pH(hLeft(m)) * 10) / 10 + 0, PPH[i], 1e-9); });
assert(PM[6] > mNeed && PPH[6] > 6 && PPH[7] > PPH[6], 'after the end point the pH is near neutral (excess MgCO3, dissolved CO2)');
const POST = m => 6.4 + (m - 1.06) / (1.40 - 1.06) * (7.6 - 6.4);
calc('post-end-point line at 1.20 g (1 d.p.)', Math.round(POST(1.20) * 10) / 10, 6.9, 1e-9);
calc('post-end-point line at 1.40 g', POST(1.40), 7.6, 1e-9);
// worked: excess weighed back
calc('PAG F worked 2.50 − 1.43', Math.round((2.50 - 1.43) * 100) / 100, 1.07, 1e-9);
calc('QC graph reading half-way pH (0.60 g)', PPH[3], 0.4, 1e-12);
// recaps / HW numbers
calc('R5 Q3 mass read from graph 1.05', sf(mNeed, 3), 1.05, 1e-12);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
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
function eqn(s, x, y, w, t, o = {}) {
  box(s, x, y, w, o.h || 0.42, o.fill || C.white, o.edge || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, x + 0.08, y, w - 0.16, t, { size: o.size || 12, h: o.h || 0.42, color: C.ink, bold: true });
}
const GLASS = 'EEF5FB', WAT = ['CFE4F7', '5B9BD5'], ACIDC = 'F9D9D2', ALKC = 'D6E4F7', MGSO4 = ['E9EEF5', '8A97AB'], LIME = 'F2F2F2';
// ion: coloured ball with its symbol written on it
const IONC = { 'H⁺': ['F6B0A8', 'B7372B'], 'OH⁻': ['A9C8F0', '2F5FA8'], 'Cl⁻': ['B9E0A8', '3E7F2E'], 'Na⁺': ['F7E08A', '9A7A1A'], 'NO₃⁻': ['D7C4EE', '6A3FA0'], 'SO₄²⁻': ['F5D1A0', 'A86A12'], 'Mg²⁺': ['D9DEE6', '6B7385'] };
function ion(s, cx, cy, t, r = 0.17, o = {}) {
  const [f, e] = IONC[t] || ['FFFFFF', '8A8F99'];
  ball(s, cx, cy, r, f, e, 1);
  label(s, cx - r - 0.1, cy - r, 2 * r + 0.2, `**${t}**`, { size: o.size || 9.5, h: 2 * r, color: C.ink });
}
// water molecule (V shape): O centre (cx, cy)
function water(s, cx, cy, r = 0.11) {
  ball(s, cx - r * 1.05, cy + r * 0.75, r * 0.62, 'FFFFFF', '8A8F99', 0.75); ball(s, cx + r * 1.05, cy + r * 0.75, r * 0.62, 'FFFFFF', '8A8F99', 0.75);
  ball(s, cx, cy, r, 'E06666', '9E2A2A', 0.75);
}
// labelled pointer: text box with a thin line to (tx, ty)
function callout(s, x, y, w, t, tx, ty, o = {}) {
  label(s, x, y, w, t, { size: o.size || 10, h: o.h || 0.24, align: o.align || 'left', color: o.color || C.text, bold: o.bold, valign: 'middle' });
  const ax = o.align === 'right' ? x + w + 0.03 : x - 0.03, ay = y + (o.h || 0.24) / 2;
  line(s, ax, ay, tx, ty, o.lc || '8A8F99', 0.75);
}
// beaker: open top at y, liquid level as a fraction of h
function beaker(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  box(s, x, y, w, h, GLASS, null);
  if (level) box(s, x, y + h - level * h, w, level * h, liq, null);
  if (level) line(s, x, y + h - level * h, x + w, y + h - level * h, o.surface || WAT[1], 1);
  line(s, x, y, x, y + h, C.ink, 1.5); line(s, x + w, y, x + w, y + h, C.ink, 1.5); line(s, x, y + h, x + w, y + h, C.ink, 1.5);
  line(s, x - 0.06, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.06, y, C.ink, 1.5);
}
// test tube: top-left (x, y), width w, height h (incl. round bottom); liquid fills from the bottom to level (0..1)
function tube(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  const r = w / 2, cx = x + r, yb = y + h - r;
  const arc = (y0, a0, a1, n = 16) => { const p = []; for (let i = 0; i <= n; i++) { const t = a0 + (a1 - a0) * i / n; p.push([cx + r * Math.cos(t), y0 + r * Math.sin(t)]); } return p; };
  poly(s, [[x, y], [x + w, y], ...arc(yb, 0, Math.PI)], GLASS, null);
  if (level) { const ly = y + h - level * h; poly(s, [[x, Math.min(ly, yb)], [x + w, Math.min(ly, yb)], ...arc(yb, 0, Math.PI)], liq, null); }
  line(s, x, y, x, yb, C.ink, 1.5); line(s, x + w, y, x + w, yb, C.ink, 1.5);
  poly(s, arc(yb, 0, Math.PI), null, C.ink, { open: true, lw: 1.5 });
  if (o.lip !== false) { line(s, x - 0.04, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.04, y, C.ink, 1.5); }
  return { cx, yb };
}
function bubbles(s, pts, r = 0.035) { pts.forEach(([x, y]) => ball(s, x, y, r, 'FFFFFF', WAT[1], 0.6)); }
// conical flask: neck top at (cx, top), base width w, total height h; level = fraction of the cone height
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
// filter funnel: top at y, width w, cone height h; stem below; paper and residue optional
function funnel(s, cx, top, w, h, o = {}) {
  const sw = 0.1, stem = o.stem || 0.45;
  poly(s, [[cx - w / 2, top], [cx + w / 2, top], [cx + sw / 2, top + h], [cx - sw / 2, top + h]], GLASS, C.ink, { lw: 1.5 });
  box(s, cx - sw / 2, top + h, sw, stem, GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - w / 2 + 0.07, top + 0.03], [cx + w / 2 - 0.07, top + 0.03], [cx, top + h + 0.02]], 'FFFFFF', '9AA3B0', { lw: 0.75 });
  if (o.residue) { const rh = h * 0.42, rw = (w / 2 - 0.07) * 0.42; poly(s, [[cx - rw, top + h - rh], [cx + rw, top + h - rh], [cx, top + h]], o.residue[0], o.residue[1], { lw: 0.5 }); }
  if (o.drip) ball(s, cx, top + h + stem + 0.07, 0.035, o.drip, o.drip);
}
// evaporating basin: lower half-ellipse, rim at y
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
// needle-like crystal (Epsom salt crystals are colourless prisms)
function prism(s, cx, cy, l, ang) {
  const a = ang * Math.PI / 180, dx = Math.cos(a) * l / 2, dy = Math.sin(a) * l / 2, nx = -Math.sin(a) * 0.045, ny = Math.cos(a) * 0.045;
  poly(s, [[cx - dx - nx, cy - dy - ny], [cx + dx - nx, cy + dy - ny], [cx + dx + 0.03 * Math.cos(a), cy + dy + 0.03 * Math.sin(a)], [cx + dx + nx, cy + dy + ny], [cx - dx + nx, cy - dy + ny], [cx - dx - 0.03 * Math.cos(a), cy - dy - 0.03 * Math.sin(a)]], MGSO4[0], MGSO4[1], { lw: 0.75 });
}
// universal-indicator colours, pH 0..14
const UI = ['D7191C', 'E8402A', 'F26B22', 'F7941D', 'FDB813', 'FFDE17', 'C8D82B', '7DC242', '2FA84F', '00A88F', '00A4D6', '0072BC', '2E3192', '5B2C8F', '4B1E6E'];
function phStrip(s, x, y, w, h, o = {}) {
  const cw = w / 15;
  UI.forEach((c, i) => {
    box(s, x + i * cw, y, cw, h, c, 'FFFFFF', { lw: 0.5 });
    label(s, x + i * cw, y, cw, `**${i}**`, { size: o.size || 10, h, color: (i <= 1 || i >= 11) ? C.white : C.ink });
  });
  return cw;
}
// pH meter: display box at (x, y) with reading; probe from (px, py0) down to (px, py1)
function phMeter(s, x, y, w, reading, pxp, py0, py1) {
  box(s, x, y, w, 0.75, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, x + 0.12, y + 0.1, w - 0.24, 0.38, '1F2A3A', null);
  label(s, x + 0.12, y + 0.1, w - 0.24, reading, { size: 13, bold: true, color: '7CFC9A', h: 0.38 });
  label(s, x, y + 0.5, w, 'pH meter', { size: 9.5, h: 0.2, color: C.grey });
  line(s, x + w, y + 0.4, pxp, py0, '4A5568', 1.25);
  box(s, pxp - 0.05, py0, 0.1, py1 - py0, 'D9DEE6', '4A5568', { lw: 1 });
  ball(s, pxp, py1, 0.07, 'F2F2F2', '4A5568', 1);
}
// tripod + gauze with top at y; Bunsen burner below (base at yb)
function tripodBunsen(s, cx, y, yb, o = {}) {
  const hw = o.hw || 0.6;
  box(s, cx - hw - 0.05, y, 2 * hw + 0.1, 0.05, '9AA3B0', '5A6275', { lw: 0.75 });
  line(s, cx - hw + 0.05, y + 0.05, cx - hw - 0.05, yb, '5A6275', 2); line(s, cx + hw - 0.05, y + 0.05, cx + hw + 0.05, yb, '5A6275', 2);
  box(s, cx - 0.25, yb - 0.08, 0.5, 0.08, '5A6275', '3A4255');
  const th = Math.max(0.35, (yb - y) * 0.45);
  box(s, cx - 0.06, yb - th, 0.12, th - 0.08, '8C96A8', '5A6275', { lw: 0.75 });
  const fh = Math.min(0.5, yb - th - y - 0.08);
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.11, y: yb - th - fh, w: 0.22, h: fh, fill: { color: '5B8DEF' }, line: { color: '2F5FBF', width: 0.75 } });
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.05, y: yb - th - fh * 0.6, w: 0.1, h: fh * 0.6, fill: { color: 'BFD4FB' }, line: { type: 'none' } });
}
const HT_FILL = 'FBE3E4';

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Acids and salts',
    footer: 'OCR J260 Combined Science B • C6.1 what useful products can be made from acids • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • reactions of acids, pH, neutralisation, salts and their uses` },
      { icon: 'H', text: 'Higher & Foundation in one deck • redox, strong and weak acids and the pH factor of ten marked HT' },
      { icon: '▲', text: 'PAG C4 production of salts: magnesium sulfate (Epsom salts) • every equation balance-checked' },
    ],
    notes: 'C6.1 What useful products can be made from acids? is Part 1 of 3 in J260 Chapter C6 Making useful chemicals (C6.1 this deck; C6.2 How do chemists control the rate of reactions?; C6.3 What factors affect the yield of chemical reactions?). J258 (separate) has a fourth sub-topic, C6.4 How are chemicals made on an industrial scale?, which the OCR C6 scheme of work marks "separate science only". OCR scheme-of-work hours for C6.1: 7.5 h separate / 7.5 h combined. See SPEC_C6_1.md for the evidence and the confidence of each statement code.\nRelative atomic masses are used to 1 decimal place (Mg 24.3, S 32.1, Cl 35.5, Ca 40.1), as on the OCR data sheet.',
  });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C6.1.1', text: 'Recall that acids react with some **metals** and with **carbonates**; write equations to **predict the products**.' },
  { code: 'C6.1.2', text: 'Describe **neutralisation**: acid + alkali or base → **salt + water**; name salts and work out their **formulae**.' },
  { code: 'C6.1.3', text: 'Recall that acids form **H⁺ ions** in water and alkalis form **OH⁻ ions**; **H⁺ + OH⁻ → H₂O**.' },
  { code: 'C6.1.4', text: 'Recall that acidity and alkalinity are measured by **pH**, using **universal indicator** and **pH meters**.' },
  { code: 'C6.1.5', text: 'Use the terms **dilute / concentrated** and **weak / strong** for acids, including reactivity.', ht: true },
  { code: 'C6.1.6', text: 'Use the idea that when [H⁺] rises by a **factor of ten**, the **pH falls by one**.', ht: true },
  { code: 'C6.1.7', text: 'Describe **neutrality** and relative **acidity** and **alkalinity** in terms of H⁺ concentration and pH.', ht: true },
  { code: 'C6.1.8', text: 'Describe a safe method to make a **pure, dry salt** from an insoluble base or carbonate (**PAG C4**).' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statement codes and wording (see SPEC_C6_1.md for sources and confidence):\nC6.1.1 recall that acids react with some metals and with carbonates and write equations predicting products from given reactants (wording and combined code HIGH: RSC Education quotes "Combined Science B C6.1.1").\nC6.1.2 neutralisation by alkalis and bases to make salts, naming and formulae of salts (code UNVERIFIED; one RSC extract gives C6.1.2 as a salt-making procedure statement instead).\nC6.1.3 acids form H⁺(aq) in water; alkalis contain OH⁻(aq); aqueous neutralisation is H⁺ + OH⁻ → H₂O (code UNVERIFIED; wording from OCR B revision extracts).\nC6.1.4 recall that relative acidity and alkalinity are measured by pH including the use of universal indicator and pH meters (wording and combined code HIGH: RSC "Combined Science B C6.1.4").\nC6.1.5 use and explain the terms dilute and concentrated (amount of substance) and weak and strong (degree of ionisation) in relation to acids, including differences in reactivity with metals and carbonates (wording HIGH: OCR PAG document; code medium).\nC6.1.6 use the idea that as hydrogen ion concentration increases by a factor of ten the pH value of a solution decreases by one (wording HIGH: OCR PAG document; code medium).\nC6.1.7 describe neutrality and relative acidity and alkalinity in terms of the effect of the concentration of hydrogen ions on the numerical value of pH (whole numbers only) (wording HIGH: RSC; code CONFLICT: RSC tags it Combined Science B C6.1.6 in one resource and Suite B C6.1.7 in another).\nC6.1.8 safe procedure for a pure, dry soluble salt from an insoluble oxide or carbonate (code and wording UNVERIFIED; PAG C4 production of salts is confirmed in OCR\'s combined PAG list).\nHT: C6.1.5–C6.1.7 are Higher-tier only in the DfE subject content and in every other board; the bold markers in the J260 document could not be seen (UNVERIFIED). The HT redox box on the metals slide is DfE Higher content; where OCR places it (C6.1 or C3) is UNVERIFIED.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C6 Making useful chemicals • C6.1 is Part 1 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C6.1.3–4', 'Acids, alkalis, ions and the pH scale', 'Both tiers', C.blue],
    ['C6.1.1–2', 'Neutralisation; acids with metals and carbonates', 'Both tiers', C.blue],
    ['C6.1.1–2', 'Predicting salts, formulae and useful products', 'Both tiers', C.blue],
    ['C6.1.5', 'Strong / weak and concentrated / dilute acids', 'HT', C.red],
    ['C6.1.6–7', 'pH and hydrogen ion concentration', 'HT', C.red],
    ['C6.1.8', 'Making magnesium sulfate crystals', 'PAG C4', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C6.1\nAcids and salts', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C2 ions and formulae • C3 reactivity • C5.1 filtration, crystallisation • C5.3 titration', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**C6.1 What useful products can be made from acids?** (this deck)',
      'C6.2 How do chemists control the rate of reactions?',
      'C6.3 What factors affect the yield of chemical reactions?',
      'J258 (separate) adds **C6.4** on making chemicals on an industrial scale.',
      'Rates and yield come next, in **C6.2** and **C6.3**.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (strong and weak acids, pH and [H⁺]) are for Higher tier only.',
      'Foundation: reactions of acids, **pH**, **neutralisation**, naming salts, making a salt.',
      'Maths: **ratio**, **powers of ten**, reading and plotting a **graph**, balancing **charges**.',
      'Every equation here has **state symbols**: (s), (l), (g), (aq).',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C6 has three sub-topics: C6.1 acids (this deck), C6.2 rates, C6.3 yield. Evidence: the docbrown.info Combined Science B page lists C6.1, C6.2 and C6.3 revision summaries; the OCR C6 outline scheme of work marks C6.4 "How are chemicals made on an industrial scale?" as separate science only. Chapter total 28.5 h separate / 18.5 h combined; C6.1 is 7.5 h / 7.5 h.\nOverlap control: rates of reaction are C6.2 (only "bubbles faster / slower" is used here when comparing acids). Yield and percentage yield are C6.3: no yield is calculated in the practical. Titration and concentration were taught in C5.3 and are recap only. The copper sulfate crystallisation practical was done in C5.1, so this deck uses magnesium sulfate.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C2 • ions', q: 'Give the **charge** on a magnesium ion and on a chloride ion. Write the formula of **magnesium chloride**.' },
  { from: 'C3 • reactivity', q: 'Put these metals in order of **reactivity**, most reactive first: **copper, magnesium, zinc, iron**.' },
  { from: 'C4.2 • bonding', q: 'Why does solid **sodium chloride** not conduct electricity, but its **solution** does?' },
  { from: 'C5.1 • separation', q: 'Name the method to remove an **insoluble** solid from a liquid, and the method to get a **dissolved** solid back.' },
  { from: 'C5.2 • Mr', q: 'Calculate the relative formula mass of **magnesium carbonate, MgCO₃**. (Mg 24.3, C 12.0, O 16.0)' },
  { from: 'C5.3 • titration', q: 'In a titration, what does the **indicator** show? Name the apparatus that adds the acid **drop by drop**.' },
], { subtitle: 'Recall from C2–C5 • 6 minutes • no notes', notes: 'ANSWERS\n1. Mg²⁺ and Cl⁻; MgCl₂ (two chloride ions balance one 2+ charge) (C2).\n2. Magnesium > zinc > iron > copper (C3).\n3. In the solid the ions are fixed in a lattice and cannot move; in solution the ions are free to move and carry charge (C4.2).\n4. Filtration; crystallisation (or evaporation) (C5.1).\n5. 24.3 + 12.0 + 3 × 16.0 = 84.3 (C5.2; asserted in node).\n6. The end point, when the acid has just neutralised the alkali (colour change); a burette (C5.3).' }), 'Retrieval starter');
calc('starter Mr MgCO3', MR.MgCO3, 84.3, 1e-9);

// ======================= 5 ACIDS AND ALKALIS: IONS =======================
reg(D.contentSlide({
  title: 'Acids and alkalis in water',
  subtitle: `Specification ${sp('C6.1.3')} • acids form hydrogen ions in water; alkalis form hydroxide ions`,
  tag: 'C6.1.3', caption: 'ions in solution; water molecules not drawn; not to scale',
  draw: (s) => {
    [[0.75, 'Hydrochloric acid, HCl(aq)', ACIDC, [['H⁺', 'Cl⁻']], 'acidic: H⁺ ions'], [3.65, 'Sodium hydroxide, NaOH(aq)', ALKC, [['Na⁺', 'OH⁻']], 'alkaline: OH⁻ ions']].forEach(([x, t, col, pairs, cap], k) => {
      label(s, x - 0.1, 1.45, 2.8, `**${t}**`, { size: 10.5, h: 0.26 });
      beaker(s, x, 1.85, 2.4, 2.1, 0.85, col);
      const P = [[0.35, 2.35], [1.05, 2.25], [1.8, 2.4], [0.6, 2.95], [1.4, 3.0], [2.05, 3.05], [0.35, 3.55], [1.05, 3.6], [1.75, 3.6]];
      P.forEach(([dx, y], i) => ion(s, x + dx, y, pairs[0][i % 2 === 0 ? 0 : 1], 0.17));
      label(s, x, 4.02, 2.4, cap, { size: 10.5, bold: true, color: k ? '2F5FA8' : 'B7372B', h: 0.26 });
    });
    eqn(s, 0.7, 4.45, 5.6, 'HCl(g) → H⁺(aq) + Cl⁻(aq)', { size: 12, h: 0.38 });
    eqn(s, 0.7, 4.92, 5.6, 'NaOH(s) → Na⁺(aq) + OH⁻(aq)', { size: 12, h: 0.38 });
    label(s, 0.7, 5.38, 5.6, '(aq) = dissolved in water. The ions are free to move.', { size: 10.5, italic: true, color: C.grey, h: 0.3 });
  },
  head: 'What makes a solution acidic or alkaline?',
  lines: [
    'An **acid** is a substance that forms **hydrogen ions, H⁺(aq)**, when it dissolves in water.',
    'A **base** neutralises an acid. Metal **oxides**, **hydroxides** and **carbonates** are bases.',
    'An **alkali** is a base that **dissolves in water**. Its solution contains **hydroxide ions, OH⁻(aq)**.',
    'Common lab acids: **hydrochloric** HCl, **sulfuric** H₂SO₄, **nitric** HNO₃. Common alkalis: NaOH, KOH, Ca(OH)₂.',
    'Dilute acids and alkalis can still be **irritant**; concentrated ones are **corrosive**. Wear eye protection.',
  ],
  size: 11,
  worked: { head: 'Worked example: ions from an acid', q: 'Which ions are in dilute nitric acid, HNO₃(aq)?',
    steps: [['Split', 'HNO₃(aq) → H⁺(aq) + NO₃⁻(aq)'], ['Answer', '**H⁺** (makes it acidic) and **NO₃⁻** (nitrate) ions']], size: 10.5 },
  workedH: 1.3,
  qc: 'Copper(II) oxide neutralises acids but does **not** dissolve in water. Is it a **base**, an **alkali**, or both? Explain.',
  notes: 'QUICK CHECK ANSWER: It is a base but not an alkali: it neutralises acids (base), but it is insoluble in water, so it cannot form a solution of OH⁻ ions (an alkali is a soluble base).\nAll ionisation equations are atom- and charge-balanced in node. Teacher note: H⁺(aq) is really H₃O⁺, but GCSE uses H⁺(aq). Ion drawings show only the dissolved ions; real solutions are mostly water molecules.\nCLEAPSS-style hazards: hydrochloric acid below 2 mol/dm³ LOW HAZARD (IRRITANT at 2 mol/dm³ and above); sodium hydroxide solution 0.05–0.5 mol/dm³ IRRITANT, CORROSIVE at 0.5 mol/dm³ and above. Wear eye protection.',
}), 'C6.1.3 Acids and alkalis: ions');

// ======================= 6 THE pH SCALE =======================
reg(D.contentSlide({
  title: 'Measuring acidity: the pH scale',
  subtitle: `Specification ${sp('C6.1.4')} • relative acidity and alkalinity are measured by pH, with universal indicator or a pH meter`,
  tag: 'C6.1.4', caption: 'universal indicator colours (approximate) and a pH meter',
  draw: (s) => {
    label(s, 0.65, 1.42, 5.8, '**Universal indicator colours**', { size: 10.5, h: 0.26 });
    const x0 = 0.7, w = 5.6, cw = phStrip(s, x0, 1.75, w, 0.42);
    const ex = [[1, 'stomach acid'], [3, 'vinegar'], [7, 'pure water'], [8, 'sea water'], [11, 'ammonia'], [13, 'oven cleaner']];
    ex.forEach(([p, t], i) => {
      const xc = x0 + (p + 0.5) * cw, yy = 2.3 + (i % 2) * 0.3;
      line(s, xc, 2.17, xc, yy, '9AA3B0', 0.75, { dash: 'dash' });
      label(s, xc - 0.6, yy, 1.2, t, { size: 9.5, h: 0.22 });
    });
    arrow(s, x0 + 7 * cw - 0.05, 3.0, x0 + 0.1, 3.0, 'B7372B', 2); label(s, x0 + 0.1, 3.05, 2.6, '**more acidic**', { size: 10, color: 'B7372B', h: 0.22 });
    arrow(s, x0 + 8 * cw + 0.05, 3.0, x0 + w - 0.1, 3.0, '2E3192', 2); label(s, x0 + 3.0, 3.05, 2.5, '**more alkaline**', { size: 10, color: '2E3192', h: 0.22 });
    line(s, x0 + 7.5 * cw, 2.9, x0 + 7.5 * cw, 3.1, '2FA84F', 1.5); label(s, x0 + 7 * cw - 0.5, 3.3, cw + 1.0, '**pH 7 neutral**', { size: 10, color: '2FA84F', h: 0.22 });
    // pH meter in vinegar beaker
    beaker(s, 3.6, 4.25, 1.3, 1.2, 0.65, 'F6E7C8');
    phMeter(s, 1.0, 4.1, 1.5, '3.0', 4.25, 3.95, 5.2);
    label(s, 3.45, 5.48, 1.6, 'vinegar', { size: 10, italic: true, h: 0.22 });
    // UI test tube
    tube(s, 5.55, 4.0, 0.32, 1.35, 0.55, UI[3]);
    label(s, 5.0, 5.42, 1.4, 'UI: orange', { size: 10, italic: true, h: 0.22 });
  },
  head: 'pH numbers',
  lines: [
    '**pH** is a number that shows **how acidic or alkaline** a solution is, usually from **0 to 14**.',
    '**pH < 7: acidic**. The **lower** the pH, the **more acidic**.',
    '**pH 7: neutral** (e.g. pure water). **pH > 7: alkaline**; higher pH, more alkaline.',
    '**Universal indicator** (UI) is a mixture of dyes: compare its colour with a **colour chart**.',
    'A **pH meter** gives a **number** (often to 0.1 or 0.01). It is more **precise** and not affected by the colour of the solution. Calibrate it first.',
  ],
  size: 11,
  worked: { head: 'Worked example: reading UI', q: 'UI turns green-blue in a solution.',
    steps: [['Chart', 'green-blue ≈ pH 9'], ['Answer', 'pH about **9**: **weakly alkaline**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Solution A turns UI **red**; solution B turns it **yellow**. Which is **more acidic**? Give **two** reasons to use a pH meter instead.',
  notes: 'QUICK CHECK ANSWER: A (red is about pH 0–2; yellow about pH 5). A pH meter gives a numerical reading / is more precise (finer resolution); it is not subjective (no colour judgement); it works with coloured solutions; readings can be logged.\nUI colours are approximate (brands differ slightly). Example pH values are typical: stomach acid about 1–2, vinegar about 3, sea water about 8, household ammonia about 11, oven cleaner about 13.\nCLEAPSS: universal indicator solution is made up in ethanol: HIGHLY FLAMMABLE; keep away from flames. Calibrate a pH meter with buffer solutions (pH 4 and 7) and rinse the probe between readings.',
}), 'C6.1.4 The pH scale');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C6.1.3')}, ${sp('C6.1.4')} • ions in acids and alkalis • pH`, [
  { q: 'Name the ion that all **acids** form in water, and the ion that all **alkalis** form in water.', marks: 2, ms: 'Hydrogen ion, H⁺ (1); hydroxide ion, OH⁻ (1).' },
  { q: 'Universal indicator turns **orange** in lemon juice. Estimate the **pH** and state whether lemon juice is acidic, neutral or alkaline.', marks: 2, ms: 'pH 3–4 (accept 2–5) (1); acidic (1).' },
  { q: 'Give **two** advantages of using a **pH meter** rather than universal indicator.', marks: 2, ms: 'Any two: more precise / gives a number (to 0.1); no colour judgement (more objective); works in coloured solutions; can record data continuously (1 each).' },
  { q: 'Hydrogen chloride gas dissolves in water. Write an equation, with **state symbols**, for the ions it forms.', marks: 2, ms: 'HCl → H⁺ + Cl⁻ (1); state symbols (g) → (aq) + (aq) (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 NEUTRALISATION =======================
reg(D.contentSlide({
  title: 'Neutralisation makes a salt',
  subtitle: `Specification ${sp('C6.1.2')}, ${sp('C6.1.3')} • acid + alkali or base → salt + water; H⁺ + OH⁻ → H₂O`,
  tag: 'C6.1.2', caption: 'particle model: Na⁺ and Cl⁻ do not change (spectator ions)',
  draw: (s) => {
    [[0.7, 'Before mixing: H⁺ Cl⁻ + Na⁺ OH⁻'], [3.65, 'After: Na⁺ Cl⁻ + H₂O']].forEach(([x, t]) => {
      box(s, x, 1.75, 2.65, 1.85, C.white, C.ink, { lw: 1.25 });
      label(s, x, 1.45, 2.65, `**${t}**`, { size: 10, h: 0.26 });
    });
    arrow(s, 3.38, 2.68, 3.62, 2.68, C.ink, 2);
    // before: 3 H+, 3 Cl-, 3 Na+, 3 OH-
    [['H⁺', 1.05, 2.05], ['Cl⁻', 1.75, 2.1], ['H⁺', 2.6, 2.0], ['Cl⁻', 1.05, 2.65], ['OH⁻', 1.8, 2.7], ['Na⁺', 2.65, 2.6],
      ['Na⁺', 1.0, 3.25], ['OH⁻', 1.85, 3.3], ['Na⁺', 2.75, 3.25], ['H⁺', 1.4, 2.95], ['Cl⁻', 2.25, 3.0], ['OH⁻', 2.3, 2.38]].forEach(([t, x, y]) => ion(s, x, y, t, 0.16, { size: 9 }));
    // after: 3 Na+, 3 Cl-, 3 water
    [['Na⁺', 4.05, 2.05], ['Cl⁻', 4.85, 2.05], ['Na⁺', 5.75, 2.1], ['Cl⁻', 4.0, 3.27], ['Na⁺', 4.85, 3.27], ['Cl⁻', 5.8, 3.27]].forEach(([t, x, y]) => ion(s, x, y, t, 0.16, { size: 9 }));
    [[4.25, 2.6], [5.0, 2.65], [5.75, 2.65]].forEach(([x, y]) => water(s, x, y, 0.11));
    eqn(s, 0.7, 3.72, 5.6, 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)', { size: 12, h: 0.38 });
    eqn(s, 0.7, 4.17, 5.6, 'Ionic: H⁺(aq) + OH⁻(aq) → H₂O(l)', { size: 12, h: 0.38, fill: 'E8F4EC', edge: C.green });
    const rows = [[HDR('Acid'), HDR('Salt name ends'), HDR('Example salt')], [tcell('hydrochloric', 0), tcell('…chloride', 0, { bold: true }), tcell('sodium chloride', 0)], [tcell('sulfuric', 1), tcell('…sulfate', 1, { bold: true }), tcell('copper sulfate', 1)], [tcell('nitric', 0), tcell('…nitrate', 0, { bold: true }), tcell('potassium nitrate', 0)]];
    s.addTable(rows, { x: 0.7, y: 4.65, w: 5.6, colW: [1.6, 1.8, 2.2], rowH: 0.24, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  },
  head: 'Acid + base → salt + water',
  lines: [
    '**Neutralisation**: an acid reacts with an **alkali** or a **base** to make a **salt** and **water**.',
    'acid + **metal hydroxide** → salt + water.  acid + **metal oxide** → salt + water.',
    'In solution, the **H⁺** from the acid and the **OH⁻** from the alkali join to make **water**: **H⁺ + OH⁻ → H₂O**.',
    'The other ions (here Na⁺ and Cl⁻) are **spectator ions**: they make up the **salt**.',
    'A **salt** forms when the **H** of an acid is replaced by a **metal** (or **ammonium**) ion. Name: **metal first**, then from the **acid**.',
  ],
  size: 11,
  worked: { head: 'Worked example: predict the salt', q: 'Copper(II) oxide reacts with sulfuric acid.',
    steps: [['Name', 'copper + sulfate → **copper sulfate** + water'], ['Answer', '**CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Name the salt made from **potassium hydroxide + sulfuric acid**. Balance: **KOH + H₂SO₄ → K₂SO₄ + H₂O**.',
  notes: 'QUICK CHECK ANSWER: Potassium sulfate. 2KOH(aq) + H₂SO₄(aq) → K₂SO₄(aq) + 2H₂O(l) (atom balance asserted in node).\nThe particle diagram counts are consistent: 3 H⁺ + 3 OH⁻ → 3 H₂O; 3 Na⁺ and 3 Cl⁻ unchanged on both sides. The ionic equation H⁺ + OH⁻ → H₂O was used in C5.3 for titrations; here it is explained. Neutralisation is exothermic (the temperature rises), which can be shown with a thermometer.\nCopper(II) oxide: HARMFUL if swallowed, very toxic to aquatic life. Sulfuric acid 0.5–1.5 mol/dm³ IRRITANT.',
}), 'C6.1.2 Neutralisation');

// ======================= 9 ACIDS + METALS =======================
{
  const s = D.contentHeader('Acids with metals', `Specification ${sp('C6.1.1')} • acids react with some metals to make a salt and hydrogen`, { tag: 'C6.1.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'same acid and same size of metal; more bubbles = faster reaction');
  label(s, 0.65, 1.42, 5.8, '**Four metals in dilute hydrochloric acid**', { size: 10.5, h: 0.26 });
  const M = [['copper', 0, 'D9894A'], ['iron', 3, '8C8C8C'], ['zinc', 7, 'B8C0CC'], ['magnesium', 14, 'D9DEE6']];
  M.forEach(([n, nb, mc], i) => {
    const x = 0.95 + i * 1.2;
    tube(s, x, 1.85, 0.42, 1.75, 0.62, WAT[0]);
    box(s, x + 0.12, 3.05, 0.18, 0.38, mc, '4A5568', { lw: 0.75 });
    const pts = []; for (let k = 0; k < nb; k++) pts.push([x + 0.08 + ((k * 37) % 26) / 100, 2.9 - ((k * 53) % 70) / 100 * 0.6 - (k > 8 ? 0.1 : 0)]);
    bubbles(s, pts, 0.03);
    label(s, x - 0.3, 3.68, 1.02, `**${n}**`, { size: 10, h: 0.22 });
    label(s, x - 0.3, 3.9, 1.02, ['no reaction', 'slow', 'steady', 'fast, fizzes'][i], { size: 9.5, h: 0.22, color: C.grey });
  });
  // squeaky pop test
  pbox(s, 0.7, 4.22, 2.6, 0.62, '**Test for hydrogen**: lighted splint → **squeaky pop**', 'E8F4EC', C.green, { size: 10.5, lw: 1 });
  eqn(s, 3.45, 4.22, 2.85, 'Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g)', { size: 10.5, h: 0.62 });
  // HT electron box
  box(s, 0.7, 5.0, 5.6, 0.85, HT_FILL, C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1 });
  D.pill(s, 0.8, 5.08, 'HT', C.red, 0.45);
  s.addText([
    { text: 'Redox: ', options: { bold: true, color: C.red } }, { text: 'Mg → Mg²⁺ + 2e⁻  (', options: {} }, { text: 'oxidation', options: { bold: true } }, { text: ': loses electrons)', options: { breakLine: true } },
    { text: '2H⁺ + 2e⁻ → H₂  (', options: {} }, { text: 'reduction', options: { bold: true } }, { text: ': gains electrons)', options: {} },
  ], { x: 1.35, y: 5.02, w: 4.9, h: 0.8, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', margin: 0 });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'Acid + metal → salt + hydrogen', [
    'Metals **above hydrogen** in the reactivity series react with dilute acids; **copper**, silver and gold do **not**.',
    'The more **reactive** the metal, the more **vigorous** the fizzing (very reactive metals such as sodium are too dangerous).',
    'The gas is **hydrogen**. The salt is named from the metal and the acid: zinc + sulfuric acid → **zinc sulfate** + hydrogen.',
    '!!HT!! The metal atoms **lose electrons** (oxidised); the H⁺ ions **gain electrons** (reduced): a **redox** reaction.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: write the equation', 'Zinc reacts with dilute sulfuric acid.', [
    ['Words', 'zinc + sulfuric acid → zinc sulfate + hydrogen'], ['Formulae', 'Zn + H₂SO₄ → ZnSO₄ + H₂ (already balanced)'], ['Answer', '**Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)**']], { size: 10.5 });
  D.quickCheck(s, 'Balance: **Al + HCl → AlCl₃ + H₂**. **(HT)** Write the ionic equation for zinc + acid and say which species is **oxidised**.');
  D.notes(s, 'QUICK CHECK ANSWER: 2Al(s) + 6HCl(aq) → 2AlCl₃(aq) + 3H₂(g). (HT) Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g); zinc is oxidised (it loses two electrons; Zn → Zn²⁺ + 2e⁻) and the hydrogen ions are reduced. All equations atom- and charge-balanced in node.\nBubble counts are illustrative of the reactivity order from C3 (Mg > Zn > Fe > Cu). Comparing how fast the bubbles form is qualitative only here: measuring rates is C6.2. Aluminium reacts slowly at first because of its oxide layer.\nHT redox in terms of electron transfer is DfE Higher-only content for acids + metals; whether OCR places it in C6.1 or in C3 is UNVERIFIED, so it is kept to this box.\nCLEAPSS-style hazards: magnesium ribbon FLAMMABLE; zinc granules LOW HAZARD (powder is flammable); hydrogen EXTREMELY FLAMMABLE gas, so test only small amounts, no naked flames near larger volumes; hydrochloric acid below 2 mol/dm³ LOW HAZARD. Eye protection.');
  reg(s, 'C6.1.1 Acids with metals');
}

// ======================= 10 ACIDS + CARBONATES =======================
reg(D.contentSlide({
  title: 'Acids with carbonates',
  subtitle: `Specification ${sp('C6.1.1')} • acid + metal carbonate → salt + water + carbon dioxide`,
  tag: 'C6.1.1', caption: 'carbon dioxide bubbled through limewater; not to scale',
  draw: (s) => {
    // flask with marble chips + acid, bung, delivery tube to limewater tube
    conical(s, 2.0, 1.9, 1.7, 2.1, 0.45, WAT[0]);
    box(s, 1.82, 1.72, 0.36, 0.3, '8C6A4A', '5A4030', { lw: 0.75 });
    [[1.6, 3.85], [1.85, 3.88], [2.1, 3.86], [2.35, 3.88], [1.75, 3.73], [2.2, 3.74], [1.98, 3.72]].forEach(([x, y]) => ball(s, x, y, 0.08, 'EDEDED', '8A8F99', 0.75));
    bubbles(s, [[1.7, 3.5], [1.95, 3.4], [2.25, 3.52], [2.05, 3.3], [1.85, 3.6]], 0.035);
    // delivery tube
    const tcol = '7D8794';
    line(s, 2.0, 1.72, 2.0, 1.55, tcol, 3); line(s, 2.0, 1.55, 4.55, 1.55, tcol, 3); line(s, 4.55, 1.55, 4.55, 3.5, tcol, 3);
    tube(s, 4.3, 2.1, 0.5, 1.75, 0.6, LIME);
    bubbles(s, [[4.5, 3.3], [4.6, 3.05], [4.5, 2.85]], 0.035);
    for (let k = 0; k < 12; k++) ball(s, 4.4 + (k % 4) * 0.1, 3.35 + Math.floor(k / 4) * 0.12, 0.022, 'FFFFFF', 'C7C7C7', 0.4);
    callout(s, 4.95, 2.6, 1.4, 'limewater turns **milky**', 4.75, 3.0, { h: 0.45, size: 10 });
    callout(s, 0.55, 2.6, 0.9, 'dilute HCl', 1.5, 3.4, { size: 10, align: 'right' });
    callout(s, 2.95, 4.08, 1.9, '**marble chips**, CaCO₃', 2.4, 3.88, { size: 10 });
    label(s, 2.6, 1.62, 1.6, 'CO₂ gas →', { size: 10, bold: true, h: 0.24, color: C.grey });
    eqn(s, 0.7, 4.55, 5.6, 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)', { size: 11.5, h: 0.4 });
    eqn(s, 0.7, 5.03, 5.6, 'Limewater: Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)', { size: 11, h: 0.38, fill: 'E8F4EC', edge: C.green });
  },
  head: 'Fizzing with carbonates',
  lines: [
    'acid + metal **carbonate** → **salt + water + carbon dioxide**.',
    'You see **fizzing**; a solid carbonate **disappears** as it reacts.',
    '**Test for CO₂**: bubble the gas through **limewater**; it turns **milky** (cloudy).',
    'Hydrogencarbonates react the same way, e.g. **baking powder** in cooking and **antacid** tablets.',
    'Carbonates react with acids **whatever** the metal, even copper carbonate.',
  ],
  size: 11,
  worked: { head: 'Worked example: sodium carbonate', q: 'Sodium carbonate solution reacts with hydrochloric acid.',
    steps: [['Formulae', 'Na₂CO₃ + HCl → NaCl + H₂O + CO₂'], ['Answer', '**Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Name the **three** products when copper(II) carbonate reacts with **nitric acid**. Why does a carbonate **fizz** but a metal oxide does not?',
  notes: 'QUICK CHECK ANSWER: Copper(II) nitrate, water and carbon dioxide (CuCO₃ + 2HNO₃ → Cu(NO₃)₂ + H₂O + CO₂, balanced in node). The carbonate gives off a gas (CO₂); a metal oxide makes only a salt and water, so there is no gas.\nAll equations atom-balanced in node. CLEAPSS-style hazards: limewater (saturated calcium hydroxide solution) is an eye IRRITANT; calcium carbonate LOW HAZARD; hydrochloric acid below 2 mol/dm³ LOW HAZARD; never let limewater suck back into the hot or reacting flask (remove the delivery tube from the limewater before the reaction stops). Eye protection.',
}), 'C6.1.1 Acids with carbonates');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C6.1.1')}, ${sp('C6.1.2')} • neutralisation • metals • carbonates`, [
  { q: 'Complete the word equation: **sulfuric acid + sodium hydroxide →** ……… + ………', marks: 2, ms: 'Sodium sulfate (1); water (1).' },
  { q: 'Write the **ionic equation**, with state symbols, for every neutralisation of an acid by an alkali in solution.', marks: 2, ms: 'H⁺ + OH⁻ → H₂O (1); (aq) + (aq) → (l) (1).' },
  { q: 'Describe the test for **hydrogen** and its result.', marks: 2, ms: 'Hold a lighted splint at the mouth of the tube (1); squeaky pop (1).' },
  { q: 'Mg + 2H⁺ → Mg²⁺ + H₂. Which species is **oxidised**? Explain in terms of **electrons**.', marks: 2, ht: true, ms: 'Magnesium (atoms) are oxidised (1); each Mg atom loses two electrons (Mg → Mg²⁺ + 2e⁻) (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 PREDICTING SALTS AND FORMULAE =======================
{
  const s = D.contentHeader('Predicting salts and their formulae', `Specification ${sp('C6.1.1')}, ${sp('C6.1.2')} • predict products from given reactants; formulae from ion charges`, { tag: 'C6.1.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'every formula below is worked out from the ion charges');
  const cats = CAT.filter(c => ['Na', 'NH₄', 'Mg', 'Zn', 'Al'].includes(c[1]));
  const rows = [[HDR('Ions'), ...AN.map(a => HDR(`${a[0]} (${a[4]})`))], ...cats.map((c, i) => [tcell(c[0], i, { bold: true }), ...AN.map(a => tcell(SALT[c[1] + '|' + a[1]], i))])];
  s.addTable(rows, { x: 0.7, y: 1.5, w: 5.6, colW: [1.1, 1.4, 1.5, 1.6], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  // charge tiles for Al2(SO4)3
  label(s, 0.7, 3.45, 5.6, '**Aluminium sulfate**: make the total charge **zero**', { size: 10.5, h: 0.26, color: C.ink });
  const ty = 3.85;
  [0, 1].forEach(k => { pbox(s, 0.8 + k * 0.85, ty, 0.75, 0.45, '**Al³⁺**', 'D9DEE6', '6B7385', { size: 11, lw: 1 }); });
  [0, 1, 2].forEach(k => { pbox(s, 2.75 + k * 0.85, ty, 0.75, 0.45, '**SO₄²⁻**', IONC['SO₄²⁻'][0], IONC['SO₄²⁻'][1], { size: 11, lw: 1 }); });
  label(s, 0.8, ty + 0.5, 1.6, '2 × (+3) = **+6**', { size: 10.5, h: 0.26 });
  label(s, 2.75, ty + 0.5, 2.5, '3 × (−2) = **−6**', { size: 10.5, h: 0.26 });
  pbox(s, 5.4, ty, 0.85, 0.45, '**= 0**', 'E8F4EC', C.green, { size: 11, lw: 1 });
  eqn(s, 0.7, 4.85, 5.6, 'Formula: Al₂(SO₄)₃', { size: 12.5, h: 0.4 });
  label(s, 0.7, 5.3, 5.6, 'Use **brackets** when more than one polyatomic ion is needed', { size: 10, italic: true, color: C.grey, h: 0.26 });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'Four steps to predict the products', [
    '**1** Which type? metal → salt + **hydrogen**; oxide or hydroxide → salt + **water**; carbonate → salt + water + **CO₂**.',
    '**2** Name the salt: **metal** (or ammonium) + **chloride / sulfate / nitrate**.',
    '**3** Write each formula: balance the **ion charges** so they add up to **zero**.',
    '**4** **Balance** the equation and add **state symbols**: salts in solution are (aq), water (l), gases (g).',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: calcium carbonate + nitric acid', 'Predict the products and write the equation.', [
    ['Salt', 'Ca²⁺ + 2NO₃⁻ → calcium nitrate, **Ca(NO₃)₂**'], ['Balance', 'two HNO₃ give the two NO₃⁻ ions'], ['Answer', '**CaCO₃(s) + 2HNO₃(aq) → Ca(NO₃)₂(aq) + H₂O(l) + CO₂(g)**']], { size: 10.5 });
  balanced('CaCO3 + 2HNO3 → Ca(NO3)2 + H2O + CO2', [[1, 'CaCO3'], [2, 'HNO3']], [[1, 'Ca(NO3)2'], [1, 'H2O'], [1, 'CO2']]);
  D.quickCheck(s, 'Write the formula of **zinc nitrate** and of **ammonium sulfate**. Predict the products of **zinc oxide + hydrochloric acid**.');
  D.notes(s, `QUICK CHECK ANSWER: Zn(NO₃)₂ (Zn²⁺ needs two NO₃⁻); (NH₄)₂SO₄ (two NH₄⁺ balance one SO₄²⁻); zinc chloride and water: ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l).\nThe table is generated in node from the ion charges (lowest common multiple; brackets for polyatomic ions) and checked: Al₂(SO₄)₃, MgCl₂, (NH₄)₂SO₄, Ca(NO₃)₂, Na₂SO₄, ZnCl₂, KNO₃ asserted. Ion formulae come from C2 (recap). All equations atom-balanced in node (${EQN.length} so far).`);
  reg(s, 'C6.1.2 Predicting salts and formulae');
}

// ======================= 13 USEFUL PRODUCTS =======================
reg(D.contentSlide({
  title: 'Useful products made from acids',
  subtitle: `Specification ${sp('C6.1.1')}, ${sp('C6.1.2')} • salts made by acid reactions are in fertilisers, food, medicines and cleaners`,
  tag: 'C6.1.2', caption: 'examples of salts and acid reactions in everyday products',
  draw: (s) => {
    pbox(s, 2.25, 3.0, 2.5, 0.9, '**acid +\nbase / alkali / carbonate / metal\n→ salt**', C.ink, C.ink, { size: 10.5, color: C.white });
    const P = [
      [0.65, 1.45, 'Fertilisers', 'ammonia + nitric acid → **ammonium nitrate**, NH₄NO₃', 'E8F4EC', C.green],
      [3.65, 1.45, 'Medicines', 'antacids: Mg(OH)₂ + 2HCl → **MgCl₂** + 2H₂O', 'FDECEC', C.red],
      [0.65, 4.25, 'Food', 'baking powder: hydrogencarbonate + acid → **CO₂** makes cakes rise', 'FFF4E0', C.orange],
      [3.65, 4.25, 'Cleaning', 'descalers: acid + **limescale** (CaCO₃) → soluble salt + CO₂', 'EAF2FB', '2F5FA8'],
    ];
    P.forEach(([x, y, h, t, f, e]) => {
      box(s, x, y, 2.7, 1.25, f, e, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
      label(s, x + 0.1, y + 0.05, 2.5, `**${h}**`, { size: 11.5, h: 0.3, color: e });
      label(s, x + 0.1, y + 0.36, 2.5, t, { size: 10, h: 0.82, valign: 'top' });
    });
    [[2.0, 2.7, 2.55, 3.0], [4.35, 2.7, 4.45, 3.0], [2.0, 4.25, 2.55, 3.9], [4.35, 4.25, 4.45, 3.9]].forEach(([x1, y1, x2, y2]) => arrow(s, x2, y2, x1, y1, C.blue, 1.5));
    label(s, 0.65, 5.6, 5.6, 'Also: Epsom salts (MgSO₄), plaster (CaSO₄), food additives (e.g. calcium chloride)', { size: 10, italic: true, color: C.grey, h: 0.28 });
  },
  head: 'Why make salts?',
  lines: [
    'Many products need **ingredients made by reacting acids**: cleaning products, food additives, medicines and dyes.',
    'Acids are used on an **industrial scale** to make chemicals such as **fertilisers**.',
    '**Ammonium salts** are made from **ammonia** (an alkali) and an acid. They supply **nitrogen** to plants.',
    'Antacids are **bases**: they neutralise excess stomach acid (HCl) to relieve indigestion.',
    'Choosing the reactants: pick the **acid** that gives the right negative ion and the **base or carbonate** that gives the right positive ion.',
  ],
  size: 11,
  worked: { head: 'Worked example: a fertiliser', q: 'Which reactants make ammonium sulfate, (NH₄)₂SO₄?',
    steps: [['Choose', 'ammonia (gives NH₄⁺) + sulfuric acid (gives SO₄²⁻)'], ['Answer', '**2NH₃(aq) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Name the acid and the base you would use to make **potassium nitrate** (a fertiliser). Write the balanced equation.',
  notes: 'QUICK CHECK ANSWER: Nitric acid and potassium hydroxide (an alkali): KOH(aq) + HNO₃(aq) → KNO₃(aq) + H₂O(l) (balanced in node). Potassium carbonate would also work (with CO₂ given off).\nEquations atom-balanced in node: NH₃ + HNO₃ → NH₄NO₃; 2NH₃ + H₂SO₄ → (NH₄)₂SO₄; Mg(OH)₂ + 2HCl → MgCl₂ + 2H₂O; 3NH₃ + H₃PO₄ → (NH₄)₃PO₄ (ammonium phosphate, extension).\nOverlap control: making fertilisers on an industrial scale (the Haber process, contact process, batch vs continuous) is J258 C6.4, which is separate science only. Here fertilisers are used only as an example of a useful salt. A docbrown Combined Science B quiz lists "ammonium salts" as Higher tier, so the ammonia + acid reaction is not examined on Foundation papers (UNVERIFIED).',
}), 'C6.1.2 Useful products from acids');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C6.1.1')}, ${sp('C6.1.2')} • predicting products • formulae • useful salts`, [
  { q: 'Use the ions **Al³⁺** and **SO₄²⁻** to work out the formula of **aluminium sulfate**. Show your reasoning.', marks: 2, ms: 'Two Al³⁺ (+6) balance three SO₄²⁻ (−6) (1); Al₂(SO₄)₃ (1).' },
  { q: 'Balance and add state symbols: **Na₂CO₃ + HCl → NaCl + H₂O + CO₂**', marks: 2, ms: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂ (1); (aq) + (aq) → (aq) + (l) + (g) (1).' },
  { q: 'Ammonia reacts with **nitric acid**. Name the product and give **one** use of it.', marks: 2, ms: 'Ammonium nitrate (1); fertiliser (provides nitrogen for plants) (1).' },
  { q: 'An antacid tablet contains **magnesium hydroxide**. Write a balanced equation for its reaction with stomach acid (HCl).', marks: 2, ms: 'Correct formulae Mg(OH)₂ + HCl → MgCl₂ + H₂O (1); balanced 1 : 2 → 1 : 2 (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 STRONG AND WEAK (HT) =======================
reg(D.contentSlide({
  title: 'Strong and weak acids',
  subtitle: `Specification ${sp('C6.1.5')} • strong and weak describe the degree of ionisation of an acid`,
  tag: 'C6.1.5', ht: true, caption: 'same concentration (0.10 mol/dm³); water molecules not drawn',
  draw: (s) => {
    [[0.75, 'Strong: hydrochloric acid'], [3.65, 'Weak: ethanoic acid']].forEach(([x, t]) => {
      label(s, x - 0.1, 1.45, 2.8, `**${t}**`, { size: 10.5, h: 0.26 });
      beaker(s, x, 1.85, 2.4, 2.1, 0.85, ACIDC);
    });
    // strong: all ionised
    [[0.35, 2.35], [1.05, 2.25], [1.8, 2.4], [0.6, 2.95], [1.4, 3.0], [2.05, 3.05], [0.35, 3.55], [1.05, 3.6], [1.75, 3.6], [2.1, 2.2]].forEach(([dx, y], i) => ion(s, 0.75 + dx, y, i % 2 ? 'Cl⁻' : 'H⁺', 0.16, { size: 9 }));
    // weak: mostly molecules, one pair ionised
    const mol = (cx, cy) => { oval(s, cx, cy, 0.62, 0.3, 'E5DED0', '8A7A50', { lw: 1 }); label(s, cx - 0.35, cy - 0.15, 0.7, 'CH₃COOH', { size: 8, bold: true, h: 0.3, color: C.ink }); };
    [[0.5, 2.35], [1.3, 2.3], [2.0, 2.45], [0.55, 3.0], [1.3, 3.05], [0.5, 3.6], [1.3, 3.62], [2.0, 3.55]].forEach(([dx, y]) => mol(3.65 + dx, y));
    ion(s, 3.65 + 1.95, 2.98, 'H⁺', 0.16, { size: 9 });
    label(s, 0.75, 4.02, 2.4, 'all molecules **ionised**', { size: 10.5, color: 'B7372B', h: 0.26 });
    label(s, 3.65, 4.02, 2.4, 'only about **1 in 75** ionised', { size: 10.5, color: '8A7A50', h: 0.26 });
    eqn(s, 0.7, 4.45, 5.6, 'Strong:  HCl(aq) → H⁺(aq) + Cl⁻(aq)', { size: 11.5, h: 0.38 });
    eqn(s, 0.7, 4.92, 5.6, 'Weak:  CH₃COOH(aq) ⇌ H⁺(aq) + CH₃COO⁻(aq)', { size: 11.5, h: 0.38 });
    label(s, 0.7, 5.38, 5.6, '⇌ means the reaction is **reversible**: most molecules stay whole', { size: 10.5, italic: true, color: C.grey, h: 0.3 });
  },
  head: 'Degree of ionisation',
  lines: [
    'A **strong acid** is **completely ionised** in water: every molecule forms H⁺ ions. Examples: **hydrochloric, sulfuric, nitric**.',
    'A **weak acid** is only **partially ionised**: most molecules stay whole. Examples: **ethanoic** (vinegar), **citric**, **carbonic**.',
    'At the **same concentration**, a strong acid has a **higher [H⁺]**, so a **lower pH**.',
    'It also reacts **more vigorously** with metals and carbonates (more H⁺ ions to react).',
    '**Strong / weak** is about the **type** of acid. It is **not** the same as concentrated / dilute.',
  ],
  size: 11,
  worked: { head: 'Worked example: compare the pH', q: '0.10 mol/dm³ HCl has pH 1.0; 0.10 mol/dm³ ethanoic acid has pH 2.9.',
    steps: [['Explain', 'HCl fully ionised: more H⁺ at the same concentration'], ['Answer', '**HCl** is the **strong** acid: lower pH']], size: 10.5 },
  workedH: 1.3,
  qc: 'Magnesium is added to 0.10 mol/dm³ HCl and to 0.10 mol/dm³ ethanoic acid. Predict and explain the **difference** you would see.',
  notes: 'QUICK CHECK ANSWER: Both fizz (hydrogen), but the hydrochloric acid fizzes much more vigorously / the magnesium disappears faster, because HCl is a strong acid, fully ionised, so its concentration of H⁺ ions is higher than in the weak ethanoic acid at the same acid concentration. (With enough time both make the same amount of hydrogen, because the same amount of acid is present.)\nHT ONLY (C6.1.5; code medium, HT marker from DfE content, UNVERIFIED for J260). Values calculated in node with Ka(ethanoic acid) = 1.74 × 10⁻⁵ mol/dm³ (data-book value): [H⁺] = 0.0013 mol/dm³, pH 2.9, about 1.3% ionised (about 1 in 75 molecules); HCl [H⁺] = 0.10 mol/dm³, pH 1.0; about 76 times more H⁺. The beaker drawing (8 whole molecules, 1 ionised) is schematic, not to scale. Teach the reactivity difference qualitatively only: measuring rates is C6.2.\nCLEAPSS: ethanoic acid below 1.7 mol/dm³ LOW HAZARD; glacial ethanoic acid is CORROSIVE and FLAMMABLE (not used).',
}), 'C6.1.5 Strong and weak acids (HT)');

// ======================= 16 CONCENTRATED AND DILUTE (HT) =======================
{
  const s = D.contentHeader('Concentrated and dilute acids', `Specification ${sp('C6.1.5')} • concentrated and dilute describe the amount of acid in a volume of solution`, { ht: true, tag: 'C6.1.5' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'each beaker holds the same volume; ● = acid particle (ionised or not)');
  const cells = [['strong', 'concentrated', 12, 1.0], ['strong', 'dilute', 4, 1.0], ['weak', 'concentrated', 12, 0.1], ['weak', 'dilute', 4, 0.1]];
  label(s, 2.0, 1.42, 2.0, '**Concentrated**', { size: 11, h: 0.26 });
  label(s, 4.25, 1.42, 2.0, '**Dilute**', { size: 11, h: 0.26 });
  label(s, 0.55, 2.3, 1.0, '**Strong**', { size: 11, h: 0.26 });
  label(s, 0.55, 4.1, 1.0, '**Weak**', { size: 11, h: 0.26 });
  cells.forEach(([sw, cd, n], i) => {
    const x = 2.2 + (i % 2) * 2.25, y = 1.75 + Math.floor(i / 2) * 1.8;
    beaker(s, x, y, 1.6, 1.45, 0.85, ACIDC);
    for (let k = 0; k < n; k++) {
      const cx = x + 0.22 + (k % 4) * 0.38, cy = y + 0.45 + Math.floor(k / 4) * 0.35;
      if (sw === 'strong') { ball(s, cx - 0.06, cy, 0.06, IONC['H⁺'][0], IONC['H⁺'][1], 0.75); ball(s, cx + 0.08, cy + 0.02, 0.06, IONC['Cl⁻'][0], IONC['Cl⁻'][1], 0.75); }
      else if (k === 0) { ball(s, cx - 0.06, cy, 0.06, IONC['H⁺'][0], IONC['H⁺'][1], 0.75); ball(s, cx + 0.08, cy + 0.02, 0.06, 'F2E3B3', '8A7A50', 0.75); }
      else oval(s, cx, cy, 0.24, 0.13, 'E5DED0', '8A7A50', { lw: 0.75 });
    }
  });
  pbox(s, 0.7, 5.45, 2.65, 0.4, '● pairs = **ions** (H⁺ + anion)', 'FFFFFF', C.line, { size: 10, lw: 0.75 });
  pbox(s, 3.55, 5.45, 2.75, 0.4, '⬭ = **un-ionised** molecule', 'FFFFFF', C.line, { size: 10, lw: 0.75 });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'Two different ideas', [
    '**Concentrated**: a **large amount** of acid dissolved in a given volume. **Dilute**: a **small amount** in the same volume.',
    'Concentration is measured in **g/dm³** or **mol/dm³** (from C5.3). Adding water **dilutes** an acid.',
    '**Strong / weak**: how much of the acid **ionises**. So you can have a **dilute strong** acid or a **concentrated weak** acid.',
    'More concentrated acid (same type) → **more H⁺** per dm³ → **lower pH**, reacts **more vigorously**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: concentrations of HCl', '7.3 g of HCl in 1.0 dm³ and 73 g of HCl in 1.0 dm³.', [
    ['g/dm³', '7.3 g/dm³ is **dilute**; 73 g/dm³ is **concentrated** (×10)'], ['mol/dm³', '7.3 ÷ 36.5 = 0.20; 73 ÷ 36.5 = 2.0 mol/dm³'], ['Answer', 'Both are **strong**; the second is **10×** as concentrated']], { size: 10.5 });
  D.quickCheck(s, '6.0 g of ethanoic acid (Mr 60.0) is dissolved to make **0.500 dm³**. Calculate the concentration in mol/dm³. Is this acid **strong** or **weak**?');
  D.notes(s, 'QUICK CHECK ANSWER: 6.0 ÷ 60.0 = 0.10 mol; 0.10 ÷ 0.500 = 0.20 mol/dm³. Ethanoic acid is weak (only partly ionised), whatever its concentration.\nHT ONLY (C6.1.5; marker UNVERIFIED for J260). Foundation students meet "concentrated" and "dilute" in everyday terms and in g/dm³ (C5.3.1). Values asserted: 7.3 g/dm³ = 0.20 mol/dm³; 73 g/dm³ = 2.0 mol/dm³ (Mr HCl 36.5); ethanoic 0.20 mol/dm³ (Mr CH₃COOH 60.0). The grid is schematic: 12 vs 4 particles shows 3× concentration; the weak beakers show 1 ionised particle in each, only to show "mostly un-ionised" (not to scale).\nCLEAPSS: hydrochloric acid at 2.0 mol/dm³ is IRRITANT (CORROSIVE at 6.5 mol/dm³ and above).');
  reg(s, 'C6.1.5 Concentrated and dilute (HT)');
}

// ======================= 17 pH AND [H+] (HT) =======================
{
  const s = D.contentHeader('pH and hydrogen ion concentration', `Specification ${sp('C6.1.6')}, ${sp('C6.1.7')} • [H⁺] × 10 → pH − 1; neutrality and acidity in terms of [H⁺]`, { ht: true, tag: 'C6.1.6' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'each step is a factor of ten; bars on a logarithmic scale');
  label(s, 0.7, 1.42, 5.6, '**[H⁺] / mol/dm³** against **pH**', { size: 10.5, h: 0.26, color: C.ink });
  const top = 1.8, rh = 0.5;
  LADDER.forEach(([p, h], i) => {
    const y = top + i * rh;
    box(s, 0.75, y + 0.05, 0.6, rh - 0.1, UI[p], null, { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 0.75, y + 0.05, 0.6, `**pH ${p}**`, { size: 10, h: rh - 0.1, color: p <= 1 ? C.white : C.ink });
    const bw = 0.42 * (8 - p); // log scale bar: length ∝ (8 − pH) = log10([H⁺]) + 8
    box(s, 1.5, y + 0.1, bw, rh - 0.2, 'F6B0A8', 'B7372B', { lw: 0.75 });
    const txt = ['0.1', '0.01', '0.001', '0.0001', '0.00001', '0.000001', '0.0000001'][i];
    label(s, 1.55 + bw, y + 0.05, 2.0, `${txt}  (10⁻${['¹', '²', '³', '⁴', '⁵', '⁶', '⁷'][i]})`, { size: 10, h: rh - 0.1, align: 'left' });
    if (i) label(s, 5.2, y - 0.08, 1.1, '÷ 10', { size: 10, bold: true, color: C.red, h: 0.22 });
  });
  label(s, 0.7, top + 7 * rh + 0.02, 5.6, 'pH 7: **neutral**, [H⁺] = [OH⁻]. Above pH 7, [OH⁻] > [H⁺]', { size: 10.5, h: 0.3, color: '2FA84F', bold: true });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'The factor-of-ten rule', [
    'pH depends on the **concentration of H⁺ ions**, [H⁺]. The **higher** [H⁺], the **lower** the pH.',
    'If [H⁺] **increases × 10**, the pH **decreases by 1**. ×100 → pH falls by 2; ×1000 → by 3.',
    '**Neutral** (pH 7): [H⁺] = [OH⁻]. **Acidic**: more H⁺ than OH⁻. **Alkaline**: more OH⁻ than H⁺.',
    'Diluting an acid **× 10** (e.g. 10 cm³ made up to 100 cm³) **raises** its pH by **1**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: comparing two acids', 'Acid A has pH 2. Acid B has pH 5. How many times greater is [H⁺] in A?', [
    ['Difference', '5 − 2 = 3 pH units'], ['Factor', '10 × 10 × 10 = 10³'], ['Answer', '[H⁺] in A is **1000 times** greater']], { size: 10.5 });
  D.quickCheck(s, '10 cm³ of an acid of **pH 2** is made up to **1000 cm³** with water. What is the new pH? Explain.');
  D.notes(s, 'QUICK CHECK ANSWER: Volume × 100, so [H⁺] ÷ 100 (from 0.01 to 0.0001 mol/dm³); each factor of ten raises the pH by 1, so the pH rises by 2: pH 4.\nHT ONLY (C6.1.6 and C6.1.7; wording from OCR PAG and RSC extracts; HT marker UNVERIFIED). Whole-number pH only: students do not use pH = −log[H⁺], but the ladder values are computed in node from it and each step is asserted as a factor of 10. Dilution examples asserted: 0.1 → 0.01 mol/dm³ (pH 1 → 2); pH 2 → pH 4 after ×100. Bar lengths are proportional to log₁₀[H⁺] + 8 (a logarithmic scale), so equal steps mean equal factors of ten.\nGRADE 7–9 STRETCH: dilution of a strong acid by × 10 raises pH by exactly 1; for a weak acid the rise is smaller (about 0.5), because more molecules ionise on dilution.');
  reg(s, 'C6.1.6–7 pH and [H⁺] (HT)');
}

// ======================= 18 RECAP 4 (HT) =======================
const R4 = D.recapSlide(4, `Specification ${sp('C6.1.5')}–${sp('C6.1.7')} • strong / weak • concentrated / dilute • pH and [H⁺]`, [
  { q: 'What is meant by a **strong acid**?', marks: 2, ht: true, ms: 'An acid that is completely / fully ionised (1); in (aqueous) solution, into H⁺ ions (1).' },
  { q: 'Explain the difference between a **dilute** acid and a **weak** acid.', marks: 2, ht: true, ms: 'Dilute: a small amount of acid in a given volume (of water) / low concentration (1); weak: only partially ionised (1).' },
  { q: 'The pH of a solution changes from **pH 3** to **pH 1**. How has the **hydrogen ion concentration** changed?', marks: 2, ht: true, ms: 'It has increased (1); by a factor of 100 (1).' },
  { q: '0.1 mol/dm³ hydrochloric acid has pH 1; 0.1 mol/dm³ ethanoic acid has pH 3. Explain the difference.', marks: 2, ht: true, ms: 'Hydrochloric acid is strong / fully ionised; ethanoic acid is weak / partially ionised (1); so HCl has a higher concentration of H⁺ ions (100 times higher) (1).' },
], { ht: true });
reg(R4.s, 'Recap 4 (HT)');

// ======================= 19 PAG C4 METHOD =======================
reg(D.contentSlide({
  title: 'Practical: making Epsom salts',
  subtitle: `Specification ${sp('C6.1.8')} • PAG C4 production of salts: magnesium sulfate from magnesium carbonate`,
  tag: 'PAG C4', pag: 'PAG C4', caption: 'the four stages; apparatus not to scale',
  draw: (s) => {
    const cells = [[0.65, 1.45], [3.55, 1.45], [0.65, 3.4], [3.55, 3.4]];
    cells.forEach(([x, y], i) => { box(s, x, y, 2.8, 1.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, x + 0.08, y + 0.05, 0.35, `**${i + 1}**`, { size: 12, color: C.blue, h: 0.28 }); });
    // 1 acid + MgCO3 spatula at a time; fizzing
    beaker(s, 1.05, 1.95, 1.0, 1.05, 0.6, ACIDC);
    for (let i = 0; i < 8; i++) ball(s, 1.15 + i * 0.11, 2.93 - (i % 2) * 0.04, 0.04, 'FFFFFF', '8A8F99', 0.5);
    bubbles(s, [[1.3, 2.7], [1.55, 2.6], [1.8, 2.72], [1.45, 2.5]], 0.03);
    line(s, 2.15, 1.7, 1.65, 2.05, '9AA3B0', 2.5);
    label(s, 2.2, 1.75, 1.2, 'add **MgCO₃** until **no more fizzing** and some is left', { size: 10, h: 0.85, align: 'left', valign: 'top' });
    label(s, 0.75, 3.02, 2.6, '25 cm³ dilute sulfuric acid', { size: 10, h: 0.25, italic: true });
    // 2 filter
    funnel(s, 4.4, 1.8, 0.9, 0.5, { residue: ['FFFFFF', '8A8F99'], drip: WAT[0], stem: 0.25 });
    conical(s, 4.4, 2.45, 0.9, 0.5, 0.4, WAT[0]);
    label(s, 5.0, 1.75, 1.35, '**filter** off the excess MgCO₃', { size: 10, h: 0.45, align: 'left', valign: 'top' });
    label(s, 3.65, 3.02, 2.6, 'filtrate: magnesium sulfate solution', { size: 10, h: 0.25, italic: true });
    // 3 evaporate on water bath
    beaker(s, 1.3, 4.35, 0.9, 0.55, 0.75, WAT[0]);
    basin(s, 1.75, 4.15, 1.1, 0.3, WAT[0]);
    [1.55, 1.75, 1.95].forEach(x => line(s, x, 4.05, x + 0.05, 3.78, 'B0B8C4', 1.25, { dash: 'sysDot' }));
    label(s, 2.35, 3.75, 1.05, 'heat to the **crystallisation point**', { size: 10, h: 0.6, align: 'left', valign: 'top' });
    label(s, 0.75, 4.97, 2.6, 'on a water bath', { size: 10, h: 0.25, italic: true });
    // 4 crystals
    oval(s, 4.4, 4.5, 1.3, 0.3, 'F4F4F4', '7D8794', { lw: 1 });
    [[4.05, 4.45, 20], [4.3, 4.42, -30], [4.55, 4.47, 10], [4.78, 4.43, -15], [4.2, 4.55, 60], [4.62, 4.55, -60]].forEach(([x, y, a]) => prism(s, x, y, 0.26, a));
    label(s, 5.15, 3.75, 1.2, 'cool, **filter**, dry between filter papers', { size: 10, h: 0.75, align: 'left', valign: 'top' });
    label(s, 3.65, 4.97, 2.6, 'colourless crystals of MgSO₄·7H₂O', { size: 10, h: 0.25, italic: true });
    eqn(s, 0.65, 5.4, 5.7, 'MgCO₃(s) + H₂SO₄(aq) → MgSO₄(aq) + H₂O(l) + CO₂(g)', { size: 11.5, h: 0.42 });
  },
  head: 'Method: a pure, dry salt from an insoluble carbonate',
  lines: [
    'Measure **25 cm³** of dilute sulfuric acid (0.50 mol/dm³) into a beaker; warm gently (do **not** boil).',
    'Add **magnesium carbonate** a spatula at a time, stirring, until it **stops fizzing** and some solid is **left over**: the acid is all used up.',
    '**Filter** to remove the excess carbonate. The **filtrate** is magnesium sulfate solution.',
    'Evaporate on a **water bath** to the crystallisation point; leave to cool; **filter** off the crystals and **dry** them.',
    '**Variables**: control the **volume** and **concentration** of acid and the **temperature**; the end point is seen when fizzing stops (or by pH, next slide).',
    '**Safety**: eye protection. Sulfuric acid 0.50 mol/dm³ **IRRITANT**. MgCO₃ and MgSO₄ **low hazard**. Add the carbonate slowly: froth can overflow.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: mass of carbonate reacted', q: '2.50 g of MgCO₃ was weighed out. The dried excess had a mass of 1.43 g.',
    steps: [['Subtract', '2.50 − 1.43'], ['Answer', '**1.07 g** of magnesium carbonate reacted']], size: 10.5 },
  workedH: 1.3,
  qc: 'How do you know when **all the acid** has reacted? Why use an **insoluble** carbonate rather than an alkali for this method?',
  notes: 'QUICK CHECK ANSWER: The fizzing stops and solid magnesium carbonate stays undissolved (in excess). An insoluble carbonate can be added in excess and the excess removed by filtering, so no acid or base is left in the salt; with a soluble alkali you would need a titration (indicator, then repeat without it: C5.3) to add exactly the right amount.\nPAG C4 Production of salts (OCR Combined Science PAG list; C6.1.8 code UNVERIFIED). C5.1 already used copper sulfate crystals (CuO + H₂SO₄) to teach filtration and crystallisation, so this deck uses magnesium sulfate (Epsom salts), which is low hazard and gives an end point you can see (fizzing stops).\nVariables (preparation, not an investigation): the dependent observation is the end point; control the volume and concentration of acid, temperature (warm, not boiling) and stirring.\nCLEAPSS-style hazards: sulfuric acid 0.5–1.5 mol/dm³ IRRITANT (skin and eye irritation); magnesium carbonate LOW HAZARD; magnesium sulfate LOW HAZARD; hot water bath: take care with scalds. Do not evaporate to dryness (crystals spit, and the hydrated crystals would lose water).\nEquations balanced in node: MgCO₃ + H₂SO₄ → MgSO₄ + H₂O + CO₂; MgSO₄ + 7H₂O → MgSO₄·7H₂O. No percentage yield is calculated here: yield is C6.3.',
}), 'PAG C4 Making magnesium sulfate (method)');

// ======================= 20 PAG C4 RESULTS =======================
{
  const s = D.contentHeader('Practical: following the reaction with pH', `Specification ${sp('C6.1.4')}, ${sp('C6.1.8')} • PAG C4: pH as magnesium carbonate is added; graph, calculation and errors`, { pag: 'PAG C4', tag: 'PAG C4' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale (illustrative pH-meter readings)');
  const g = { x: 1.45, y: 1.55, w: 5.3, h: 2.85, xmin: 0, xmax: 1.6, ymin: 0, ymax: 8, xstep: 0.2, ystep: 1, minor: 2, xlabel: 'Mass of MgCO₃ added / g', ylabel: 'pH', fmt: v => v.toFixed(1), yfmt: v => String(v) };
  D.axes(s, g);
  const curve = []; for (let m = 0; m <= 1.04 + 1e-9; m += 0.02) curve.push([m, pH(hLeft(m))]);
  curve.push([1.06, 6.4]); curve.push([1.40, 7.6]);
  D.plotLine(s, g, curve, C.blue, 2);
  D.points(s, g, PM.map((m, i) => [m, PPH[i]]), C.ink);
  line(s, D.px(g, mNeed), D.py(g, 0), D.px(g, mNeed), D.py(g, 4.5), C.red, 1.25, { dash: 'dash' });
  label(s, D.px(g, mNeed) - 1.85, D.py(g, 4.9), 1.7, '**end point ≈ 1.05 g**', { size: 10, color: C.red, align: 'right', h: 0.24 });
  label(s, D.px(g, 0.1), D.py(g, 2.4), 2.0, 'acid left: pH low', { size: 10, color: C.blue, bold: true, align: 'left', h: 0.24 });
  label(s, D.px(g, 1.1), D.py(g, 5.6), 1.4, 'MgCO₃ in excess', { size: 10, color: C.blue, bold: true, align: 'left', h: 0.24 });
  const rows = [[HDR('MgCO₃ / g'), ...PM.map(v => HDR(v.toFixed(2)))], [tcell('pH', 0, { bold: true }), ...PPH.map(v => tcell(v.toFixed(1), 0))]];
  s.addTable(rows, { x: 0.7, y: 5.08, w: 6.1, colW: [1.1, ...PM.map(() => 5.0 / PM.length)], rowH: 0.24, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.45, 'Worked example (HT): carbonate needed', '25.0 cm³ of 0.50 mol/dm³ H₂SO₄; MgCO₃ : H₂SO₄ = 1 : 1 (Mr MgCO₃ 84.3).', [
    ['Moles', '0.50 × 25.0 ÷ 1000 = 0.0125 mol'], ['Answer', '0.0125 × 84.3 = **1.05 g**: matches the graph']], { size: 10.5 });
  D.card(s, 7.3, 2.9, 5.58, 3.35, 'Conclusion and errors', [
    'The pH stays **low** while acid is left, then **jumps** to about 7 when all the acid has reacted.',
    'Extra carbonate does **not** react: it stays as solid (**excess**), so the salt solution is **not acidic**.',
    '**Errors**: carbonate stuck to the spatula or beaker; crystals still **wet** (mass too high); some salt **stays dissolved**.',
    '**Improve**: calibrate the pH meter; add smaller amounts near the end point; dry crystals to **constant mass**.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the graph: what is the pH after **0.60 g** has been added? Why is the pH **not** much higher than 7 when excess carbonate is added?');
  D.notes(s, `QUICK CHECK ANSWER: About pH 0.4 (still very acidic: acid remains). Magnesium carbonate is insoluble, so the excess stays as solid and only makes the solution very slightly alkaline (dissolved CO₂ also keeps it near 7).\nIllustrative pH-meter data. Model (asserted in node): before the end point, [H⁺] = 2 × (0.0125 − m ÷ 84.3) ÷ 0.0250 dm³, treating sulfuric acid as fully ionised; readings rounded to 1 d.p. (0.0, 0.1, 0.2, 0.4, 0.6, 1.3). End point at 0.0125 × 84.3 = 1.054 g. After the end point, readings of 6.9 and 7.6 are illustrative (excess insoluble carbonate and dissolved CO₂). The curve before the end point is computed, not sketched. Expected mass of MgSO₄ in solution: 0.0125 × 120.4 = 1.51 g (anhydrous; not used: yield is C6.3). Worked F example: 2.50 − 1.43 = 1.07 g reacted (close to 1.05 g).\nLink: C6.1.4 pH meter; C5.3 concentration (HT moles).`);
  reg(s, 'PAG C4 pH results and analysis');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C6.1.8')} and PAG C4 • making a pure, dry salt`, [
  { q: 'Why is magnesium carbonate added until **no more fizzing** happens and some solid is **left over**?', marks: 2, ms: 'To make sure all the (sulfuric) acid has reacted / is used up (1); so the salt solution / crystals contain no acid (1).' },
  { q: 'Explain why the excess magnesium carbonate is removed by **filtration**, and why the filtrate is heated on a **water bath**.', marks: 2, ms: 'Magnesium carbonate is insoluble, so it stays on the filter paper (1); water bath heats gently / stops the solution spitting / boiling dry (1).' },
  { q: 'Use the graph on the previous slide. What mass of magnesium carbonate reacted with all the acid? Explain how you can tell.', marks: 2, ms: 'About 1.05 g (accept 1.0–1.1 g) (1); this is where the pH rises sharply (to about 7) (1).' },
  { q: 'Name the salt made from **zinc oxide** and **hydrochloric acid**, and write its formula.', marks: 2, ms: 'Zinc chloride (1); ZnCl₂ (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Acid', 'A substance that forms hydrogen ions, H⁺(aq), when it dissolves in water.'],
  ['Base', 'A substance that neutralises an acid, e.g. metal oxides, hydroxides, carbonates.'],
  ['Alkali', 'A base that dissolves in water, forming hydroxide ions, OH⁻(aq).'],
  ['pH', 'Scale (0–14) of acidity and alkalinity; below 7 acidic, 7 neutral, above 7 alkaline.'],
  ['Universal indicator', 'Mixture of dyes that shows the pH of a solution by its colour.'],
  ['pH meter', 'Electronic meter with a probe; gives a numerical pH reading.'],
  ['Neutralisation', 'Acid + base → salt + water; in solution H⁺ + OH⁻ → H₂O.'],
  ['Salt', 'Compound made when the hydrogen of an acid is replaced by a metal or ammonium ion.'],
  ['Spectator ion', 'An ion that is present but does not change during the reaction.'],
  ['Carbonate', 'Reacts with acid to give a salt, water and carbon dioxide (fizzing).'],
  ['Strong acid (HT)', 'Completely ionised in water, e.g. hydrochloric, sulfuric, nitric acid.'],
  ['Weak acid (HT)', 'Only partially ionised in water, e.g. ethanoic, citric, carbonic acid.'],
  ['Concentrated (HT)', 'A large amount of acid dissolved in a given volume of solution.'],
  ['Dilute (HT)', 'A small amount of acid dissolved in a given volume of solution.'],
  ['Crystallisation', 'Evaporating a solution to the crystallisation point, then cooling so crystals form.'],
  ['Excess', 'More than is needed: some is left over when the reaction stops.'],
], { notes: 'Use as a cover-and-recall activity. Terms marked (HT) are Higher tier only for the strong/weak and concentrated/dilute statements (C6.1.5); dilute and concentrated are also everyday words for Foundation. Rate and yield words belong to C6.2 and C6.3 and are not included.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student adds marble chips (**calcium carbonate**) to dilute **hydrochloric acid** until no more fizzing happens. Some marble chips are left over. The acid had a **pH of 1** before the reaction.', [
  { l: 'a', q: 'Name the **salt** formed. Name the **gas** given off and describe a **test** for it.', marks: 2, ms: 'Calcium chloride (1); carbon dioxide: turns limewater milky / cloudy (1).' },
  { l: 'b', q: 'Write a balanced **symbol equation**, with **state symbols**, for the reaction.', marks: 2, ms: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ correctly balanced (1); (s), (aq), (aq), (l), (g) (1).' },
  { l: 'c', q: 'Give **one** advantage of measuring the pH with a **pH meter** rather than universal indicator.', marks: 1, ms: 'Any one: more precise / numerical value; not a matter of colour judgement; works with coloured solutions (1).', h: 0.8 },
  { l: 'd', q: 'Explain why **excess** calcium carbonate is used, and how the student gets a solution of the **salt only**.', marks: 3, ms: 'To make sure all the acid reacts / is neutralised (1); excess calcium carbonate is insoluble (1); filter it off; the filtrate is the salt solution (1).', h: 1.2 },
  { l: 'e', q: '10 cm³ of the pH 1 acid is diluted with water to **1000 cm³**. Predict the new **pH** and explain.', marks: 2, ht: true, ms: 'pH 3 (1); [H⁺] decreases by a factor of 100 / two factors of ten, and each factor of ten raises the pH by 1 (1).', h: 1.0 },
  { l: 'f', q: 'Ethanoic acid of the **same concentration** reacts much **less vigorously** with marble. Explain why.', marks: 3, ht: true, ms: 'Ethanoic acid is a weak acid; hydrochloric acid is strong (1); ethanoic acid is only partially ionised / HCl fully ionised (1); so ethanoic acid has a lower concentration of H⁺ ions (to react with the carbonate) (1).', h: 1.3 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (e) and (f) are HT` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Measure a volume of dilute sulfuric acid (e.g. 25 cm³ with a measuring cylinder) into a beaker; warm gently.',
    'Add magnesium carbonate a little at a time with stirring until no more fizzing / some solid remains (excess), so that all the acid has reacted and none is left in the product.',
    'Filter to remove the excess (insoluble) magnesium carbonate; collect the filtrate (magnesium sulfate solution).',
    'Heat the filtrate in an evaporating basin (on a water bath) to the crystallisation point (crystals form on a cold glass rod); do not evaporate to dryness.',
    'Leave to cool so crystals form (solubility falls); filter off the crystals; dry between filter papers or in a warm oven / desiccator.',
    'Equation: MgCO₃(s) + H₂SO₄(aq) → MgSO₄(aq) + H₂O(l) + CO₂(g); the fizzing is carbon dioxide.',
    'Safety: eye protection; sulfuric acid is an irritant; add the carbonate slowly to stop frothing over; take care with hot apparatus.',
  ], {
    l3: 'Describes a clear, logically ordered method to make pure, dry crystals (excess carbonate, filtering, crystallising and drying) AND explains the purpose of most steps.',
    l2: 'Describes the main steps of the method (reacting with excess, filtering, evaporating or crystallising) with some explanation.',
    l1: 'Simple statements, e.g. "mix them and filter" or "heat to get crystals".',
  });
}
const HW = [
  { n: '1', q: 'Name the **three** products when an acid reacts with a metal **carbonate**.', marks: 1, ms: 'Salt, water and carbon dioxide (all three for 1).' },
  { n: '2', q: 'Name the salt made from: (a) **magnesium + sulfuric acid**; (b) **potassium hydroxide + nitric acid**.', marks: 2, ms: '(a) magnesium sulfate (1); (b) potassium nitrate (1).' },
  { n: '3', q: 'Universal indicator turns **purple** in a solution. Estimate its **pH** and explain what this tells you about its **ions**.', marks: 2, ms: 'pH 12–14 (accept 11–14) (1); strongly alkaline: contains (many more) hydroxide ions, OH⁻, than H⁺ (1).' },
  { n: '4', q: 'Write a balanced equation, with **state symbols**, for **zinc** reacting with dilute **hydrochloric acid**.', marks: 2, ms: 'Zn + 2HCl → ZnCl₂ + H₂ (1); (s), (aq), (aq), (g) (1).' },
  { n: '5', q: 'Solution A has **pH 2**. Solution B has **pH 4**. How many times greater is the **[H⁺]** in A? Explain.', marks: 2, ht: true, ms: '100 times (1); each decrease of 1 pH unit means ten times more H⁺ (two units: 10 × 10) (1).', h: 1.1 },
  { n: '6', q: 'Explain the difference between a **concentrated weak** acid and a **dilute strong** acid.', marks: 2, ht: true, ms: 'Concentrated weak: lots of acid in the volume but only partly ionised (1); dilute strong: little acid in the volume but fully ionised (1).', h: 1.1 },
  { n: '7', q: 'Describe how to make **pure, dry crystals** of magnesium sulfate from **magnesium carbonate** and dilute **sulfuric acid**. Explain the reason for each step.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q5 and Q6 are Higher tier.', HW, 17, { dividerSub: 'C6.1 Acids and salts • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C6.1') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom/charge-balanced`);
const out = path.join(__dirname, 'OCR21C_C6.1_AcidsSalts_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
