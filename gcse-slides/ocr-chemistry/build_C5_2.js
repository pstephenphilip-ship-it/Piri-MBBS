// build_C5_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C5 Chemical analysis, C5.2 How are the amounts of substances in reactions calculated?
// (one deck, Higher & Foundation; Part 2 of 3)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C5_2.js
// Structure copied from build_C4_4.js (approved, same template). ocr_chem_template.js is NOT edited: flask, balance,
// crucible apparatus, particle, see-saw, flowchart and formula-mass helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C5_2.md): J260 C5.2 = J258 C5.3 renumbered (J258 C5.2 "How do chemists find the composition of
// unknown samples?" is separate-science only). Taught: conservation of mass (closed and open systems), relative formula
// mass, HT moles and the Avogadro constant, mass <-> moles, reacting masses, HT stoichiometry from masses, HT limiting
// reactants, suggested practical (burning magnesium). Separation and purity (C5.1) and amounts in solution /
// concentration (C5.3) are NOT taught here (one starter question on C5.1 only).
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C5', chapterTitle: 'Chemical analysis', code: 'C5.2', title: 'How are the amounts of substances in reactions calculated?',
  part: 2, parts: 3, specRange: 'C5.2.1–C5.2.8',
  subtitle: 'How are the amounts of substances in reactions calculated?',
  keywords: ['Conservation of mass', 'Relative formula mass', 'Mole', 'Avogadro constant', 'Limiting reactant'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));

// ======================= EQUATIONS: atom balance (asserted) =======================
function parseFormula(f) {
  let charge = 0;
  if (f === 'e-') return { atoms: {}, charge: -1 };
  const m = f.match(/^(.*?)(\d*)([+-])$/);
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
const EQ_CU = balanced('CuSO4 + 2NaOH → Cu(OH)2 + Na2SO4', [[1, 'CuSO4'], [2, 'NaOH']], [[1, 'Cu(OH)2'], [1, 'Na2SO4']]);
balanced('2Mg + O2 → 2MgO', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]);
balanced('CaCO3 → CaO + CO2', [[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']]);
balanced('CaCO3 + 2HCl → CaCl2 + H2O + CO2', [[1, 'CaCO3'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']]);
balanced('CH4 + 2O2 → CO2 + 2H2O', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]);
balanced('2H2 + O2 → 2H2O', [[2, 'H2'], [1, 'O2']], [[2, 'H2O']]);
balanced('C + O2 → CO2', [[1, 'C'], [1, 'O2']], [[1, 'CO2']]);
balanced('Mg + 2HCl → MgCl2 + H2', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
balanced('Zn + 2HCl → ZnCl2 + H2', [[1, 'Zn'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2']]);
balanced('2Cu + O2 → 2CuO', [[2, 'Cu'], [1, 'O2']], [[2, 'CuO']]);
balanced('CuCO3 → CuO + CO2', [[1, 'CuCO3']], [[1, 'CuO'], [1, 'CO2']]);
balanced('H2 + Cl2 → 2HCl', [[1, 'H2'], [1, 'Cl2']], [[2, 'HCl']]);
balanced('starter Fe2O3 + 3CO → 2Fe + 3CO2', [[1, 'Fe2O3'], [3, 'CO']], [[2, 'Fe'], [3, 'CO2']]);
assert.throws(() => balanced('unbalanced test', [[1, 'CH4'], [1, 'O2']], [[1, 'CO2'], [2, 'H2O']]));
assert.throws(() => balanced('unbalanced test 2', [[1, 'Mg'], [1, 'O2']], [[1, 'MgO']]));

// ======================= RELATIVE FORMULA MASS (Ar to 1 d.p., as on the OCR periodic table) =======================
const AR = { H: 1.0, C: 12.0, N: 14.0, O: 16.0, Na: 23.0, Mg: 24.3, Al: 27.0, S: 32.1, Cl: 35.5, K: 39.1, Ca: 40.1, Fe: 55.8, Cu: 63.5, Zn: 65.4 };
const r1 = v => Math.round(v * 10) / 10;
function Mr(f) { const p = parseFormula(f).atoms; return r1(Object.entries(p).reduce((a, [k, v]) => { assert(AR[k], 'no Ar for ' + k); return a + AR[k] * v; }, 0)); }
const MR = {};
[['H2O', 18.0], ['CO2', 44.0], ['NaCl', 58.5], ['MgO', 40.3], ['CaCO3', 100.1], ['CaO', 56.1], ['Ca(OH)2', 74.1], ['H2SO4', 98.1], ['Mg(OH)2', 58.3],
  ['CH4', 16.0], ['O2', 32.0], ['H2', 2.0], ['CuO', 79.5], ['CuCO3', 123.5], ['(NH4)2SO4', 132.1], ['HCl', 36.5], ['Cl2', 71.0], ['CuSO4', 159.6], ['NaOH', 40.0],
  ['Cu(OH)2', 97.5], ['Na2SO4', 142.1]].forEach(([f, v]) => { MR[f] = calc(`Mr ${f}`, Mr(f), v, 1e-9); });
// slide 9: Mr totals both sides of balanced equations
const sideMass = terms => r1(terms.reduce((a, [n, f]) => a + n * Mr(f), 0));
calc('2Mg + O2 left', r1(2 * AR.Mg + MR.O2), 80.6, 1e-9);
calc('2MgO right', r1(2 * MR.MgO), 80.6, 1e-9);
calc('CaCO3 = CaO + CO2', r1(MR.CaO + MR.CO2), MR.CaCO3, 1e-9);
calc('CH4 + 2O2 left', sideMass([[1, 'CH4'], [2, 'O2']]), 80.0, 1e-9);
calc('CO2 + 2H2O right', sideMass([[1, 'CO2'], [2, 'H2O']]), 80.0, 1e-9);
calc('QC 2H2 + O2 left', sideMass([[2, 'H2'], [1, 'O2']]), 36.0, 1e-9);
calc('QC 2H2O right', sideMass([[2, 'H2O']]), 36.0, 1e-9);
calc('CuSO4 + 2NaOH left', sideMass(EQ_CU.lhs), 239.6, 1e-9);
calc('Cu(OH)2 + Na2SO4 right', sideMass(EQ_CU.rhs), 239.6, 1e-9);

// ======================= CALCULATIONS (asserted) =======================
const NA = 6.02e23;
// slide 5: closed system
calc('flask 25.0 + 25.0 g', 25.0 + 25.0, 50.0, 1e-9);
calc('QC 12.0 g C + 32.0 g O2', 12.0 + 32.0, 44.0, 1e-9);
// slide 6: open systems
calc('balance 17.41 + 2.43', r1((17.41 + 2.43) * 100) / 100 , 19.84, 1e-9);
calc('balance 17.41 + 4.03', r1((17.41 + 4.03) * 100) / 100, 21.44, 1e-9);
calc('Mg 2.43 g → MgO 4.03 g: oxygen gained', r1((4.03 - 2.43) * 100) / 100, 1.60, 1e-9);
calc('2.43 g Mg × 40.3/24.3 = 4.03 g', 2.43 * MR.MgO / AR.Mg, 4.03, 1e-9);
calc('CaCO3 10.0 g → CaO 5.6 g: CO2 lost', r1(10.0 - 5.6), 4.4, 1e-9);
calc('CaCO3 10.0 g → CaO (theory) 3 s.f.', sf(10.0 * MR.CaO / MR.CaCO3, 2), 5.6, 1e-12);
calc('QC flask 152.40 → 151.52: CO2 lost', Math.round((152.40 - 151.52) * 100) / 100, 0.88, 1e-9);
// slide 11 HT: Avogadro
calc('2.5 mol water molecules', 2.5 * NA, 1.505e24, 1e9);
calc('2.5 mol water molecules 2 s.f.', sf(2.5 * NA, 2), 1.5e24, 1e9);
calc('atoms in 1 mol H2O = 3 × NA', 3 * NA, 1.806e24, 1e9);
calc('QC 0.50 mol Mg atoms', 0.50 * NA, 3.01e23, 1e9);
// slide 12 HT: mass <-> moles
calc('88.0 g CO2 → mol', 88.0 / MR.CO2, 2.00, 1e-12);
calc('0.250 mol CaCO3 → g', 0.250 * MR.CaCO3, 25.025, 1e-9);
calc('0.250 mol CaCO3 → g 3 s.f.', sf(0.250 * MR.CaCO3, 3), 25.0, 1e-12);
calc('QC 9.0 g water → mol', 9.0 / MR.H2O, 0.50, 1e-12);
calc('QC 2.00 mol NaCl → g', 2.00 * MR.NaCl, 117, 1e-9);
// slide 14: reacting masses
calc('F: 16.0 g CH4 → 44.0 g CO2; 4.0 g → ? (÷4)', 44.0 / 4, 11.0, 1e-12);
calc('F: 8.0 g CH4 → CO2', 44.0 / 2, 22.0, 1e-12);
const nCH4 = calc('HT: 8.0 g CH4 → mol', 8.0 / MR.CH4, 0.50, 1e-12);
const nH2O = calc('HT: mol H2O (1:2)', nCH4 * 2, 1.00, 1e-12);
calc('HT: mass H2O', nH2O * MR.H2O, 18.0, 1e-9);
const nCC = calc('QC HT: 25.0 g CaCO3 → mol', 25.0 / MR.CaCO3, 0.24975024975024976, 1e-12);
calc('QC HT: mass CO2 3 s.f.', sf(nCC * MR.CO2, 3), 11.0, 1e-12);
calc('QC F: 200.2 g CaCO3 → CO2', 2 * MR.CO2, 88.0, 1e-9);
// slide 15 HT: stoichiometry from masses
const SM = [['Mg', 2.43, AR.Mg], ['O₂', 1.60, MR.O2], ['MgO', 4.03, MR.MgO]];
const smMol = SM.map(([, m, M]) => m / M);
calc('stoich Mg mol', smMol[0], 0.1, 1e-9); calc('stoich O2 mol', smMol[1], 0.05, 1e-9); calc('stoich MgO mol', smMol[2], 0.1, 1e-9);
const smMin = Math.min(...smMol);
calc('stoich ratio Mg', smMol[0] / smMin, 2, 1e-9); calc('stoich ratio O2', smMol[1] / smMin, 1, 1e-9); calc('stoich ratio MgO', smMol[2] / smMin, 2, 1e-9);
calc('mass conserved 2.43 + 1.60', r1((2.43 + 1.60) * 100) / 100, 4.03, 1e-9);
calc('QC Cu 1.27/63.5', 1.27 / AR.Cu, 0.02, 1e-9); calc('QC O2 0.32/32.0', 0.32 / MR.O2, 0.01, 1e-9); calc('QC CuO 1.59/79.5', 1.59 / MR.CuO, 0.02, 1e-9);
// slide 17 HT: limiting reactants
const PARTICLES = { H2: 5, Cl2: 3 };
const madeHCl = calc('particles HCl made 2 × 3', 2 * Math.min(PARTICLES.H2, PARTICLES.Cl2), 6);
calc('particles H2 left 5 − 3', PARTICLES.H2 - PARTICLES.Cl2, 2);
calc('atoms conserved H: 2×5 = 6 + 2×2', 2 * PARTICLES.H2, madeHCl + 2 * 2);
const nMgL = calc('lim: 4.86 g Mg → mol', 4.86 / AR.Mg, 0.2, 1e-9);
const nO2L = calc('lim: 4.80 g O2 → mol', 4.80 / MR.O2, 0.15, 1e-9);
calc('lim: O2 needed for 0.200 mol Mg', nMgL / 2, 0.1, 1e-9);
assert(nO2L > nMgL / 2, 'O2 in excess, Mg limiting');
calc('lim: mass MgO', nMgL * MR.MgO, 8.06, 1e-9);
calc('lim: O2 left over mol', nO2L - nMgL / 2, 0.05, 1e-9);
calc('QC lim Cu 1.27 g', 1.27 / AR.Cu, 0.02, 1e-9); calc('QC lim O2 0.64 g', 0.64 / MR.O2, 0.02, 1e-9);
calc('QC lim CuO mass', 0.02 * MR.CuO, 1.59, 1e-9);
// slides 18–19: practical (illustrative data), mass in g
const PMG = [0.12, 0.24, 0.36, 0.48, 0.60];
const PMGO = [0.20, 0.40, 0.59, 0.75, 1.00];
const POX = PMG.map((m, i) => Math.round((PMGO[i] - m) * 100) / 100);
assert.deepStrictEqual(POX, [0.08, 0.16, 0.23, 0.27, 0.40]);
const PTH = PMG.map(m => m * AR.O / AR.Mg);
calc('theory O for 0.48 g', sf(PTH[3], 2), 0.32, 1e-12);
assert(PTH[3] - POX[3] > 0.04, '0.48 g run is the anomaly');
[0, 1, 2, 4].forEach(i => assert(Math.abs(PTH[i] - POX[i]) < 0.01, 'other runs within 0.01 g of theory ' + i));
const GRAD = 0.66;
calc('best-fit gradient = 16.0/24.3 (2 s.f.)', sf(AR.O / AR.Mg, 2), GRAD, 1e-12);
calc('line reading at 0.60 g Mg (2 s.f.)', sf(0.60 * GRAD, 2), 0.40, 1e-12);
const pMg = calc('HT prac mol Mg 0.60/24.3', 0.60 / AR.Mg, 0.024691358024691357, 1e-12);
const pO = calc('HT prac mol O 0.40/16.0', 0.40 / AR.O, 0.025, 1e-12);
calc('HT prac ratio O:Mg 2 s.f.', sf(pO / pMg, 2), 1.0, 1e-12);
calc('prac 0.12 + 0.08', r1((0.12 + 0.08) * 10) / 10, 0.2, 1e-9);
calc('QC practical expected MgO from 0.48 g', sf(0.48 * MR.MgO / AR.Mg, 2), 0.80, 1e-12);
// recaps
calc('R1 Q2 12.0 + 32.0', 12.0 + 32.0, 44.0, 1e-9);
calc('R2 Q4 CH4 balance', sideMass([[1, 'CH4'], [2, 'O2']]) - sideMass([[1, 'CO2'], [2, 'H2O']]), 0, 1e-9);
calc('R3 Q1 2.00 mol Mg atoms (3 s.f.)', sf(2.00 * NA, 3), 1.20e24, 1e10);
calc('R3 Q2 36.0 g water', 36.0 / MR.H2O, 2.00, 1e-12);
calc('R3 Q3 0.200 mol CaCO3 (3 s.f.)', sf(0.200 * MR.CaCO3, 3), 20.0, 1e-12);
calc('R3 Q4 12.0 g C mol', 12.0 / AR.C, 1, 1e-12); calc('R3 Q4 24.3 g Mg mol', 24.3 / AR.Mg, 1, 1e-12);
calc('R4 Q1 2.43 g Mg → MgO (÷10)', MR.MgO / 10, 4.03, 1e-9);
calc('R4 Q2 3.0 g C → CO2', 3.0 / AR.C * MR.CO2, 11.0, 1e-9);
calc('R4 Q3 2.43 g Mg → H2 g', 2.43 / AR.Mg * MR.H2, 0.2, 1e-9);
calc('R4 Q4 Cu 2.54/63.5', 2.54 / AR.Cu, 0.04, 1e-9); calc('R4 Q4 O2 0.64/32', 0.64 / MR.O2, 0.02, 1e-9); calc('R4 Q4 CuO 3.18/79.5', 3.18 / MR.CuO, 0.04, 1e-9);
calc('R5 Q2 0.10 mol O2 needs Mg', 0.10 * 2, 0.20, 1e-12); calc('R5 Q2 MgO from O2', 0.10 * 2, 0.20, 1e-12);
calc('R5 Q4 0.59 − 0.36', Math.round((0.59 - 0.36) * 100) / 100, 0.23, 1e-9);
calc('R5 Q4 expected MgO 2 s.f.', sf(0.36 * MR.MgO / AR.Mg, 2), 0.60, 1e-12);
// full question: CuCO3 → CuO + CO2
calc('FQ Mr CuCO3', MR.CuCO3, 123.5, 1e-9);
calc('FQ CuO + CO2', r1(MR.CuO + MR.CO2), 123.5, 1e-9);
calc('FQ CO2 lost 12.35 − 7.95', Math.round((12.35 - 7.95) * 100) / 100, 4.40, 1e-9);
const fqN = calc('FQ mol CuCO3', 12.35 / MR.CuCO3, 0.1, 1e-9);
calc('FQ mass CuO', fqN * MR.CuO, 7.95, 1e-9);
// homework
calc('HW Q2 Mg(OH)2', MR['Mg(OH)2'], 58.3, 1e-9);
calc('HW Q4 22.0 g CO2 mol', 22.0 / MR.CO2, 0.5, 1e-12);
calc('HW Q4 molecules', 0.5 * NA, 3.01e23, 1e9);
calc('HW Q5 HCl mol from 0.15 Cl2', 0.15 * 2, 0.30, 1e-12);
calc('HW Q6 16.0 → 36.0; 4.0 g → water', 36.0 / 4, 9.0, 1e-12);
calc('HW Q6 Mr check CH4 → 2H2O', 2 * MR.H2O, 36.0, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
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
const GLASS = 'EEF5FB', BLUE_SOL = ['9CC7EE', '3E7FC1'], WAT = ['CFE4F7', '5B9BD5'];
// atom colours (CPK-like)
const ATOM = { H: ['FFFFFF', '8A8F99'], O: ['E06666', '9E2A2A'], C: ['4A4A4A', '222222'], Mg: ['C9CED6', '6B7385'], Cl: ['7DBE6A', '3E7F2E'], Cu: ['D9894A', '9A5524'], Ca: ['E8E0C8', '8A7A50'] };
function atom(s, cx, cy, el, r = 0.13, o = {}) {
  const [f, e] = ATOM[el]; ball(s, cx, cy, r, f, e, 1);
  if (o.lab !== false) label(s, cx - r, cy - r, 2 * r, el, { size: o.size || 10, bold: true, color: el === 'C' ? C.white : C.ink, h: 2 * r });
}
// diatomic molecule centred at (cx, cy)
function diatomic(s, cx, cy, a, b, r = 0.12, o = {}) { atom(s, cx - r * 0.8, cy, a, r, o); atom(s, cx + r * 0.8, cy, b, r, o); }
// conical flask: neck top centre (cx, y), height h, base width bw; level 0..1 fraction of body filled
function flask(s, cx, y, h, bw, o = {}) {
  const nw = bw * 0.26, neck = h * 0.3;
  const P = [[cx - nw / 2, y], [cx + nw / 2, y], [cx + nw / 2, y + neck], [cx + bw / 2, y + h], [cx - bw / 2, y + h], [cx - nw / 2, y + neck]];
  poly(s, P, GLASS, null);
  if (o.level) {
    const ly = y + h - o.level * (h - neck);
    const wAt = yy => nw / 2 + (bw / 2 - nw / 2) * (yy - (y + neck)) / (h - neck);
    poly(s, [[cx - wAt(ly), ly], [cx + wAt(ly), ly], [cx + bw / 2, y + h], [cx - bw / 2, y + h]], o.liquid || BLUE_SOL[0], null, { tr: o.tr || 0 });
    if (o.ppt) for (let i = 0; i < o.ppt; i++) ball(s, cx - bw * 0.36 + (i % 7) * bw * 0.12, y + h - 0.07 - Math.floor(i / 7) * 0.08, 0.045, o.pptCol || '4F86C6', '2E5F99', 0.5);
  }
  poly(s, P, null, C.ink, { lw: 1.5 });
  if (o.bung) box(s, cx - nw / 2 - 0.04, y - 0.14, nw + 0.08, 0.22, '8C6A4A', '5A4030', { lw: 0.75 });
}
// electronic balance with pan top at y (centre cx), reading string
function balance(s, cx, y, w, reading) {
  box(s, cx - w / 2 + 0.12, y, w - 0.24, 0.07, '9AA3B0', '4A5568', { lw: 0.75 });
  box(s, cx - w / 2, y + 0.07, w, 0.55, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, cx - w / 2 + 0.15, y + 0.17, w - 0.3, 0.32, '1F2A3A', null);
  label(s, cx - w / 2 + 0.15, y + 0.17, w - 0.3, reading, { size: 11, bold: true, color: '7CFC9A', h: 0.32 });
}
// small test tube (for NaOH inside flask)
function smallTube(s, x, y, w, h, liq) {
  ball(s, x + w / 2, y + h - w / 2, w / 2, liq, C.ink, 1);
  box(s, x, y + h * 0.35, w, h * 0.65 - w / 2, liq, null);
  line(s, x, y, x, y + h - w / 2, C.ink, 1); line(s, x + w, y, x + w, y + h - w / 2, C.ink, 1);
}
// Bunsen burner: base centre (cx, yb)
function bunsen(s, cx, yb, o = {}) {
  box(s, cx - 0.3, yb - 0.1, 0.6, 0.1, '4A5568', '2D3748');
  box(s, cx - 0.07, yb - 0.75, 0.14, 0.65, '9AA3B0', '4A5568', { lw: 0.75 });
  if (o.flame !== false) {
    s.addShape(SH.OVAL, { x: cx - 0.1, y: yb - 1.15, w: 0.2, h: 0.42, fill: { color: '7FA8E8', transparency: 20 }, line: { color: '3E6FC1', width: 0.75 } });
    s.addShape(SH.OVAL, { x: cx - 0.05, y: yb - 1.0, w: 0.1, h: 0.24, fill: { color: '2F5FB0', transparency: 10 }, line: { type: 'none' } });
  }
}
// tripod with top at y (legs down to yb)
function tripod(s, cx, y, w, yb) {
  box(s, cx - w / 2, y, w, 0.06, '5A6275', '2D3748', { lw: 0.5 });
  line(s, cx - w / 2 + 0.05, y + 0.06, cx - w / 2 - 0.15, yb, '5A6275', 2.5);
  line(s, cx + w / 2 - 0.05, y + 0.06, cx + w / 2 + 0.15, yb, '5A6275', 2.5);
}
// crucible (trapezoid) sitting with its base at yb, top width tw, lid optional (raised)
function crucible(s, cx, yb, tw, h, o = {}) {
  const bw = tw * 0.62;
  poly(s, [[cx - tw / 2, yb - h], [cx + tw / 2, yb - h], [cx + bw / 2, yb], [cx - bw / 2, yb]], 'F3EFE6', '7A6E5A', { lw: 1.5 });
  if (o.content) box(s, cx - bw / 2 + 0.03, yb - 0.12, bw - 0.06, 0.1, o.content, null);
  if (o.lid) {
    const ly = yb - h - (o.lidUp || 0);
    box(s, cx - tw / 2 - 0.04, ly - 0.06, tw + 0.08, 0.06, 'F3EFE6', '7A6E5A', { lw: 1.25 });
    box(s, cx - 0.06, ly - 0.14, 0.12, 0.08, 'F3EFE6', '7A6E5A', { lw: 1 });
  }
}
// formula triangle: apex top
function triangleFormula(s, cx, ty, w, h, top, bl, br) {
  poly(s, [[cx, ty], [cx + w / 2, ty + h], [cx - w / 2, ty + h]], 'FFFFFF', C.blue, { lw: 2 });
  line(s, cx - w / 4, ty + h / 2, cx + w / 4, ty + h / 2, C.blue, 1.5);
  line(s, cx, ty + h / 2, cx, ty + h, C.blue, 1.5);
  label(s, cx - 0.5, ty + h * 0.2, 1.0, top, { size: 18, bold: true, color: C.ink, h: 0.35 });
  label(s, cx - w / 4 - 0.4, ty + h * 0.62, 0.8, bl, { size: 16, bold: true, color: C.ink, h: 0.35 });
  label(s, cx + w / 4 - 0.4, ty + h * 0.62, 0.8, br, { size: 16, bold: true, color: C.ink, h: 0.35 });
}
const HT_FILL = 'FBE3E4';

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Amounts in reactions',
    footer: 'OCR J260 Combined Science B • C5.2 how are the amounts of substances in reactions calculated • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • conservation of mass, relative formula mass, moles, reacting masses` },
      { icon: 'H', text: 'Higher & Foundation in one deck • moles, Avogadro constant and limiting reactants marked HT' },
      { icon: '▲', text: 'Suggested practical: the mass change when magnesium burns • worked calculations verified' },
    ],
    notes: 'C5.2 How are the amounts of substances in reactions calculated? is Part 2 of 3 in J260 Chapter C5 Chemical analysis (C5.1 How are chemicals separated and tested for purity?; C5.2 this deck; C5.3 How are the amounts of chemicals in solution measured?).\nNumbering: in J258 (Chemistry B, separate science) this sub-topic is C5.3. J258 C5.2 "How do chemists find the composition of unknown samples?" is separate-science only, so J260 numbers the later sub-topics one lower. Evidence: OCR J260 Advance Information (Summer 2022) section list and the docbrown.info combined page ("Chapter C5.2 How are the amounts of substances in reactions calculated?"); an RSC resource tags "Combined Science B C5.2.2" and "C5.2.3 / C5.2.7". See SPEC_C5_2.md.\nRelative atomic masses are used to 1 decimal place (Mg 24.3, Cl 35.5, Ca 40.1, Cu 63.5), as on the OCR periodic table.',
  });
  const sub = s._slideObjects.find(o => o._type === 'text' && JSON.stringify(o.text).includes('reactions calculated?') && o.options && o.options.fontSize === 18);
  assert(sub, 'cover subtitle object found');
  Object.assign(sub.options, { fontSize: 15, y: 2.55, h: 0.66, w: 7.3, valign: 'top' });
  sub.options._bodyProp && Object.assign(sub.options._bodyProp, { anchor: 't' });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C5.2.1', text: 'Recall and use the **law of conservation of mass** in a **closed system**.' },
  { code: 'C5.2.2', text: 'Explain **mass changes** in **non-enclosed** (open) systems using the **particle model**.' },
  { code: 'C5.2.3', text: 'Calculate **relative formula masses (Mr)** separately and in a **balanced equation**.' },
  { code: 'C5.2.4', text: 'Describe amounts in **moles** and use the **Avogadro constant**, 6.02 × 10²³.', ht: true },
  { code: 'C5.2.5', text: 'Convert between **mass** and **amount in moles**: n = m ÷ Mr.', ht: true },
  { code: 'C5.2.6', text: 'Deduce the **stoichiometry** (mole ratio) of an equation from **masses**.', ht: true },
  { code: 'C5.2.7', text: 'Use a **balanced equation** to calculate the **masses** of reactants or products.' },
  { code: 'C5.2.8', text: 'Explain the effect of a **limiting reactant** on the amount of product.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J258 C5.3 renumbered for J260 C5.2; see SPEC_C5_2.md for confidence):\nC5.2.1 recall and use the law of conservation of mass (J258 C5.3.1 wording quoted by an RSC resource)\nC5.2.2 explain any observed changes in mass in non-enclosed systems during a chemical reaction and explain them using the particle model (wording from search extracts; combined code C5.2.2 quoted by an RSC resource)\nC5.2.3 calculate relative formula masses of species separately and in a balanced chemical equation (combined code quoted by an RSC resource)\nC5.2.4 HT describe the measurement of amounts of substance in moles, including the Avogadro constant (wording and code UNVERIFIED)\nC5.2.5 HT relate the mass of a substance to its amount in moles and vice versa (wording and code UNVERIFIED)\nC5.2.6 HT deduce the stoichiometry of an equation from the masses of reactants and products (code UNVERIFIED)\nC5.2.7 use a balanced equation to calculate masses of reactants or products (combined code quoted by an RSC resource). Foundation: scale by ratio using Mr; HT: the moles method.\nC5.2.8 HT explain the effect of a limiting quantity of a reactant on the amount of products, in moles or masses in grams (wording from a revision extract of the OCR B statement; code UNVERIFIED)\nHT markers: moles, the Avogadro constant, stoichiometry and limiting reactants are Higher-only in every GCSE specification and in OCR Oak "Higher" lessons; the bold markers in the J260 document itself could not be seen (UNVERIFIED).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C5 Chemical analysis • C5.2 is Part 2 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C5.2.1–2', 'Conservation of mass: closed and open systems', 'Both tiers', C.blue],
    ['C5.2.3', 'Relative formula mass, Mr, in equations', 'Both tiers', C.blue],
    ['C5.2.4–5', 'Moles, Avogadro constant, n = m ÷ Mr', 'HT', C.red],
    ['C5.2.6–7', 'Reacting masses and stoichiometry', 'Both + HT', C.blue],
    ['C5.2.8', 'Limiting reactants', 'HT', C.red],
    ['Practical', 'Mass change when magnesium burns', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C5.2\nAmounts in reactions', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 combustion • C2 formulae and ions • C3 balanced equations, extraction • C5.1 purity', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C5.1 How are chemicals separated and tested for purity?',
      '**C5.2 How are the amounts of substances in reactions calculated?** (this deck)',
      'C5.3 How are the amounts of chemicals in solution measured?',
      'J258 (separate) has an extra C5.2 on unknown samples, so this is **C5.3** there.',
      'Concentration and solutions come next, in **C5.3**.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (moles, Avogadro, limiting reactants) are for Higher tier only.',
      'Foundation: conservation of mass, **Mr**, and reacting masses by **ratio**.',
      'Maths: **ratio**, **standard form**, rearranging, **significant figures**, plotting a **graph**.',
      'Use the **Ar** values from the OCR periodic table, to **1 d.p.** (Mg = 24.3).',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C5 has three sub-topics (OCR J260 Advance Information 2022 lists C5.1 separation and purity, C5.2 amounts of substances in reactions, C5.3 amounts of chemicals in solution; SPEC_C5_1.md reached the same list independently). J258 Chemistry B has four: its C5.2 "How do chemists find the composition of unknown samples?" is separate science only.\nOverlap control: separation, chromatography and purity are C5.1 (one starter question only). Concentration, solutions and titration are C5.3 and are NOT taught here. Writing formulae and balancing equations come from C2/C3 and are used, not retaught.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C1 • air and combustion', q: 'Name the **two** products when **methane** burns completely in air.' },
  { from: 'C2 • atoms', q: 'Magnesium has atomic number **12** and mass number **24**. How many **protons** and **neutrons**?' },
  { from: 'C2 • ionic formulae', q: 'Write the formulae of **magnesium oxide** and **calcium chloride**.' },
  { from: 'C3 • equations', q: 'Balance: **Fe₂O₃ + CO → Fe + CO₂** (extracting iron in a blast furnace).' },
  { from: 'C4.2 • bonding', q: 'What type of **bonding** is in a **CO₂** molecule? And in **MgO**?' },
  { from: 'C5.1 • purity', q: 'What is a **pure substance** in chemistry? How does a **melting point** show purity?' },
], { subtitle: 'Recall from C1–C4 and C5.1 • 6 minutes • no notes', notes: 'ANSWERS\n1. Carbon dioxide and water (C1).\n2. 12 protons; 24 − 12 = 12 neutrons (C2). Link: the relative atomic mass on the periodic table (24.3) is a weighted mean of the isotopes.\n3. MgO (Mg²⁺, O²⁻); CaCl₂ (Ca²⁺, 2Cl⁻) (C2).\n4. Fe₂O₃ + 3CO → 2Fe + 3CO₂ (C3; atom balance asserted in node).\n5. CO₂: covalent bonds (simple molecule); MgO: ionic bonding (giant ionic lattice) (C2/C4.2).\n6. A single element or compound, not mixed with anything else; a pure substance melts at a sharp, fixed temperature (impurities lower it and widen the range) (C5.1, recap only).' }), 'Retrieval starter');
calc('starter neutrons 24 − 12', 24 - 12, 12);

// ======================= 5 CONSERVATION OF MASS: CLOSED SYSTEM =======================
reg(D.contentSlide({
  title: 'Conservation of mass',
  subtitle: `Specification ${sp('C5.2.1')} • recall and use the law of conservation of mass in a closed system`,
  tag: 'C5.2.1', caption: 'a sealed flask on a balance, before and after mixing',
  draw: (s) => {
    [[1.95, 'Before: tube of NaOH(aq) inside', false], [4.95, 'After: tipped and mixed', true]].forEach(([cx, t, after]) => {
      label(s, cx - 1.4, 1.42, 2.8, `**${t}**`, { size: 10.5, h: 0.26 });
      flask(s, cx, 1.95, 1.6, 1.5, { level: 0.42, liquid: after ? '8EC0E8' : BLUE_SOL[0], bung: true, ppt: after ? 14 : 0 });
      if (!after) smallTube(s, cx - 0.1, 2.6, 0.2, 0.93, 'F4F4F4');
      balance(s, cx, 3.55, 1.9, '152.40 g');
    });
    label(s, 3.0, 2.35, 0.9, '=', { size: 30, bold: true, color: C.green, h: 0.5 });
    label(s, 0.7, 4.2, 2.4, 'copper sulfate (blue)', { size: 10, italic: true, color: BLUE_SOL[1], h: 0.22 });
    label(s, 3.85, 4.2, 2.4, 'blue precipitate forms', { size: 10, italic: true, color: BLUE_SOL[1], h: 0.22 });
    // atom count table
    const els = ['Cu', 'S', 'O', 'Na', 'H'];
    const rows = [[HDR('Atoms'), ...els.map(HDR)], [tcell('Reactants', 0, { bold: true }), ...els.map(e => tcell(String(EQ_CU.a.atoms[e]), 0))], [tcell('Products', 1, { bold: true }), ...els.map(e => tcell(String(EQ_CU.b.atoms[e]), 1))]];
    s.addTable(rows, { x: 0.75, y: 4.55, w: 5.5, colW: [1.25, 0.85, 0.85, 0.85, 0.85, 0.85], rowH: 0.25, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
    label(s, 0.6, 5.42, 5.8, 'Atoms are **rearranged**, not made or destroyed', { size: 11, color: C.ink, h: 0.3 });
  },
  head: 'The law of conservation of mass',
  lines: [
    'In a chemical reaction, **no atoms are made or destroyed**: they are only **rearranged**.',
    'So the **total mass of the products = total mass of the reactants**.',
    'A **closed system** is one where nothing can get in or out (e.g. a **sealed** flask), so the balance reading **does not change**.',
    'This is why equations must be **balanced**: the same number of each atom on both sides.',
    { t: 'CuSO₄(aq) + 2NaOH(aq) → Cu(OH)₂(s) + Na₂SO₄(aq)', b: true, color: C.blue, nob: true },
  ],
  size: 11.5,
  worked: { head: 'Worked example: using the law', q: '25.0 g of each solution is mixed in a sealed flask.',
    steps: [['Reactants', '25.0 + 25.0 = 50.0 g'], ['Answer', 'mass of products = **50.0 g** (nothing escapes)']], size: 10.5 },
  workedH: 1.3,
  qc: 'In a sealed container, **12.0 g** of carbon burns in **32.0 g** of oxygen. No carbon or oxygen is left. What mass of carbon dioxide forms?',
  notes: 'QUICK CHECK ANSWER: 12.0 + 32.0 = 44.0 g of carbon dioxide (all of the reactants become product; nothing escapes from a sealed container).\nAtom counts in the table are generated from the balanced equation in node (Cu 1, S 1, O 6, Na 2, H 2 on each side). Mr check: 159.6 + 2 × 40.0 = 239.6 = 97.5 + 142.1. CLEAPSS-style hazards for the demo: copper(II) sulfate solution (≥ 0.5 mol/dm³ is HARMFUL / irritant; use dilute, about 0.2 mol/dm³ = LOW HAZARD at this concentration but wear eye protection); sodium hydroxide solution 0.4 mol/dm³ is IRRITANT to eyes (CORROSIVE at 0.5 mol/dm³ and above); wear eye protection.',
}), 'C5.2.1 Conservation of mass');

// ======================= 6 OPEN SYSTEMS =======================
reg(D.contentSlide({
  title: 'Mass changes in open systems',
  subtitle: `Specification ${sp('C5.2.2')} • explain observed mass changes in non-enclosed systems using the particle model`,
  tag: 'C5.2.2', caption: 'left: mass goes up; right: mass goes down; not to scale',
  draw: (s) => {
    // left: magnesium burning in open crucible on balance
    label(s, 0.6, 1.42, 2.9, '**A** Magnesium burns in air', { size: 10.5, h: 0.26 });
    crucible(s, 2.05, 3.35, 1.2, 0.75, { content: 'F2F2F2' });
    [[1.75, 3.05], [2.05, 2.95], [2.35, 3.05]].forEach(([x, y]) => ball(s, x, y, 0.06, 'FFFFFF', 'B0B0B0', 0.5));
    [[1.35, 2.1], [2.75, 2.1]].forEach(([x, y], i) => { diatomic(s, x, y, 'O', 'O', 0.11, { size: 9 }); arrow(s, x + (i ? -0.1 : 0.1), y + 0.18, x + (i ? -0.35 : 0.35), y + 0.6, C.red, 1.5); });
    label(s, 0.55, 2.3, 1.0, 'O₂ from air **in**', { size: 10, color: C.red, h: 0.4, align: 'left' });
    balance(s, 2.05, 3.42, 1.9, '19.84 → 21.44 g');
    label(s, 0.6, 4.1, 2.9, 'Oxygen atoms **join** the Mg, so the solid gets **heavier**', { size: 10, h: 0.45, valign: 'top', color: C.ink });
    // right: marble chips + acid in open flask
    label(s, 3.5, 1.42, 2.95, '**B** Marble chips + acid', { size: 10.5, h: 0.26 });
    flask(s, 4.95, 2.15, 1.2, 1.4, { level: 0.42, liquid: WAT[0] });
    [[4.7, 3.24], [4.95, 3.26], [5.2, 3.24], [4.82, 3.15], [5.08, 3.15]].forEach(([x, y]) => ball(s, x, y, 0.07, 'EDEDED', '8A8F99', 0.75));
    [[4.86, 3.06], [5.04, 2.98]].forEach(([x, y]) => ball(s, x, y, 0.04, 'FFFFFF', WAT[1], 0.5));
    // CO2 molecules escaping
    [[4.4, 1.98], [5.3, 1.98]].forEach(([x, y]) => { atom(s, x - 0.18, y, 'O', 0.09, { lab: false }); atom(s, x, y, 'C', 0.09, { lab: false }); atom(s, x + 0.18, y, 'O', 0.09, { lab: false }); });
    arrow(s, 4.95, 2.1, 4.95, 1.75, C.grey, 1.5);
    label(s, 5.75, 1.86, 0.75, 'CO₂ **out**', { size: 10, color: C.grey, h: 0.25, align: 'left' });
    balance(s, 4.95, 3.42, 1.9, '152.40 → 151.52 g');
    label(s, 3.55, 4.1, 2.85, 'CO₂ gas **escapes** into the air, so the reading **falls**', { size: 10, h: 0.45, valign: 'top', color: C.ink });
    eqn(s, 0.7, 4.65, 5.6, '2Mg(s) + O₂(g) → 2MgO(s)', { size: 11, h: 0.36 });
    eqn(s, 0.7, 5.08, 5.6, 'CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)', { size: 11, h: 0.36 });
    label(s, 0.7, 5.5, 5.6, 'Total mass is still conserved: count the **gas** too', { size: 10.5, bold: true, color: C.green, h: 0.3 });
  },
  head: 'Why the balance reading changes',
  lines: [
    'A **non-enclosed** (open) system lets gases move **in** or **out**.',
    '**Mass goes up** when a **gas from the air** (usually **oxygen**) reacts and becomes part of a solid product.',
    '**Mass goes down** when a **gas is produced** and **escapes**, e.g. **CO₂** from a carbonate or **H₂** from a metal and acid.',
    'Particle model: gas particles move fast and spread out, so they leave an open container.',
    'The **atoms** are all still there: if we include the gas, **mass is conserved**.',
  ],
  size: 11,
  worked: { head: 'Worked example: mass of gas', q: 'Heating 10.0 g of calcium carbonate in an open tube leaves 5.6 g of calcium oxide.',
    steps: [['Lost', '10.0 − 5.6 = 4.4 g'], ['Answer', '**4.4 g** of carbon dioxide escaped (CaCO₃ → CaO + CO₂)']], size: 10.5 },
  workedH: 1.3,
  qc: 'In **B**, the reading fell from **152.40 g** to **151.52 g**. What mass of CO₂ escaped? How could you show that mass **is** conserved?',
  notes: 'QUICK CHECK ANSWER: 152.40 − 151.52 = 0.88 g of carbon dioxide. Do the reaction in a closed system: seal the flask (bung, or a balloon over the neck to collect the gas) and the reading stays the same.\nMg data: 2.43 g Mg gives 2.43 × 40.3 ÷ 24.3 = 4.03 g MgO, so 1.60 g of oxygen is gained (balance readings: illustrative crucible 17.41 g; 17.41 + 2.43 = 19.84 g before, 17.41 + 4.03 = 21.44 g after). CaCO₃ 10.0 g → 5.6 g CaO (10.0 × 56.1 ÷ 100.1 = 5.60) asserted. Equations atom-balanced in node. Hazards: dilute hydrochloric acid (below 2 mol/dm³) is LOW HAZARD, but wear eye protection; marble chips low hazard.',
}), 'C5.2.2 Mass changes in open systems');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C5.2.1')}, ${sp('C5.2.2')} • conservation of mass`, [
  { q: 'State the **law of conservation of mass** and explain it in terms of **atoms**.', marks: 2, ms: 'Total mass of products equals total mass of reactants / mass is not made or lost in a reaction (1); atoms are not created or destroyed, only rearranged (1).' },
  { q: 'In a sealed container, **12.0 g** of carbon reacts completely with **32.0 g** of oxygen. Calculate the mass of carbon dioxide made.', marks: 2, ms: '12.0 + 32.0 (1); = 44.0 g (1).' },
  { q: 'Magnesium ribbon is heated in an **open** crucible. The mass of the solid **increases**. Explain why.', marks: 2, ms: 'Magnesium reacts with / gains oxygen from the air (1); the oxygen atoms become part of the magnesium oxide, so the solid has more mass (1).' },
  { q: 'Zinc reacts with acid in an **open** flask on a balance. Use the **particle model** to explain why the reading **falls**.', marks: 2, ms: 'Hydrogen gas is produced (1); gas particles move quickly / spread out and escape from the open flask, so their mass is no longer on the balance (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 RELATIVE FORMULA MASS =======================
reg(D.contentSlide({
  title: 'Relative formula mass, Mr',
  subtitle: `Specification ${sp('C5.2.3')} • calculate relative formula masses of species`,
  tag: 'C5.2.3', caption: 'Ar values from the OCR periodic table (1 d.p.); ball models not to scale',
  draw: (s) => {
    label(s, 0.65, 1.42, 5.8, '**Relative atomic masses, Ar** (periodic table)', { size: 10.5, h: 0.26, align: 'left' });
    const tiles = ['H', 'C', 'N', 'O', 'Na', 'Mg', 'S', 'Cl', 'Ca', 'Cu'];
    tiles.forEach((el, i) => {
      const x = 0.7 + (i % 5) * 1.15, y = 1.75 + Math.floor(i / 5) * 0.82;
      box(s, x, y, 1.0, 0.72, C.white, C.blue, { lw: 1.25 });
      label(s, x, y + 0.04, 1.0, `**${el}**`, { size: 14, h: 0.34, color: C.ink });
      label(s, x, y + 0.38, 1.0, AR[el].toFixed(1), { size: 11, h: 0.28, color: C.blue, bold: true });
    });
    // water ball model
    const wy = 4.05;
    atom(s, 1.35, wy, 'O', 0.22, { size: 11 }); atom(s, 1.0, wy + 0.3, 'H', 0.15); atom(s, 1.7, wy + 0.3, 'H', 0.15);
    label(s, 0.55, wy + 0.55, 1.6, '**H₂O**', { size: 11, h: 0.24 });
    label(s, 2.15, wy - 0.15, 4.2, '(2 × 1.0) + 16.0 = **18.0**', { size: 12, h: 0.32, align: 'left' });
    // CO2 ball model
    const cy = 5.05;
    atom(s, 0.85, cy, 'O', 0.18, { size: 10 }); atom(s, 1.27, cy, 'C', 0.18, { size: 10 }); atom(s, 1.69, cy, 'O', 0.18, { size: 10 });
    label(s, 0.55, cy + 0.22, 1.6, '**CO₂**', { size: 11, h: 0.24 });
    label(s, 2.15, cy - 0.17, 4.2, '12.0 + (2 × 16.0) = **44.0**', { size: 12, h: 0.32, align: 'left' });
    label(s, 2.15, wy + 0.25, 4.2, 'Mr = add up the Ar of **every** atom', { size: 10.5, italic: true, color: C.grey, h: 0.26, align: 'left' });
  },
  head: 'Adding up atomic masses',
  lines: [
    '**Relative atomic mass, Ar**: the mean mass of an atom of an element compared with ¹/₁₂ of a carbon-12 atom.',
    '**Relative formula mass, Mr**: the **sum of the Ar** values of all the atoms in the formula. It has **no units**.',
    'Use the **small numbers**: in CO₂ there are **2** O atoms.',
    'A **bracket** multiplies everything inside: Ca(OH)₂ has 1 Ca, **2** O and **2** H.',
    'Examples: NaCl = **58.5**; MgO = **40.3**; CaCO₃ = **100.1**.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: brackets', q: 'Calculate the Mr of calcium hydroxide, Ca(OH)₂.',
    steps: [['OH group', '16.0 + 1.0 = 17.0'], ['Answer', '40.1 + (2 × 17.0) = **74.1**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Calculate the Mr of **sulfuric acid, H₂SO₄**, and of **magnesium hydroxide, Mg(OH)₂**.',
  notes: 'QUICK CHECK ANSWER: H₂SO₄ = (2 × 1.0) + 32.1 + (4 × 16.0) = 98.1. Mg(OH)₂ = 24.3 + 2 × (16.0 + 1.0) = 58.3.\nEvery Mr on this deck is computed in node from the formula and the Ar table (H 1.0, C 12.0, N 14.0, O 16.0, Na 23.0, Mg 24.3, S 32.1, Cl 35.5, Ca 40.1, Cu 63.5), the 1 d.p. values printed on the OCR periodic table. If your students use whole-number Ar values (Mg 24, Cl 35.5), answers differ slightly; accept either in class.\nCommon errors: multiplying only the H in (OH)₂; adding the charge of ions; giving units (Mr has none; molar mass in g/mol is a Higher idea on slide 11).',
}), 'C5.2.3 Relative formula mass');

// ======================= 9 Mr IN BALANCED EQUATIONS =======================
{
  const s = D.contentHeader('Mr in a balanced equation', `Specification ${sp('C5.2.3')} • relative formula masses in a balanced equation show mass is conserved`, { tag: 'C5.2.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'a balance beam: the two sides have the same total mass');
  // beam and pivot
  poly(s, [[3.5, 3.55], [3.8, 4.1], [3.2, 4.1]], '7D8794', '4A5568', { lw: 1 });
  box(s, 0.9, 3.47, 5.2, 0.08, '5A6275', '2D3748', { lw: 0.5 });
  [[1.9, 'Reactants'], [5.1, 'Products']].forEach(([cx, t]) => {
    box(s, cx - 1.05, 3.05, 2.1, 0.14, 'B9C0CC', '4A5568', { lw: 0.75 });
    label(s, cx - 1.05, 1.45, 2.1, `**${t}**`, { size: 11, h: 0.26 });
  });
  // reactant particles: 2 Mg + O2
  atom(s, 1.35, 2.75, 'Mg', 0.2, { size: 10 }); atom(s, 1.85, 2.75, 'Mg', 0.2, { size: 10 }); diatomic(s, 2.45, 2.75, 'O', 'O', 0.17, { size: 10 });
  // product particles: 2 MgO
  [[4.55, 2.75], [5.4, 2.75]].forEach(([x, y]) => { atom(s, x - 0.17, y, 'Mg', 0.2, { size: 10 }); atom(s, x + 0.2, y, 'O', 0.17, { size: 10 }); });
  label(s, 0.85, 1.8, 2.1, '2Mg + O₂', { size: 13, bold: true, color: C.ink, h: 0.3 });
  label(s, 4.05, 1.8, 2.1, '2MgO', { size: 13, bold: true, color: C.ink, h: 0.3 });
  label(s, 0.85, 2.15, 2.1, '(2 × 24.3) + 32.0', { size: 11, h: 0.26 });
  label(s, 4.05, 2.15, 2.1, '2 × 40.3', { size: 11, h: 0.26 });
  pbox(s, 0.95, 4.25, 1.9, 0.42, '**80.6**', C.white, C.blue, { size: 14 });
  pbox(s, 4.15, 4.25, 1.9, 0.42, '**80.6**', C.white, C.blue, { size: 14 });
  label(s, 2.85, 4.25, 1.3, '=', { size: 22, bold: true, color: C.green, h: 0.42 });
  label(s, 0.7, 4.85, 5.6, 'Second example: CaCO₃ → CaO + CO₂', { size: 11, bold: true, h: 0.26, color: C.ink });
  label(s, 0.7, 5.12, 5.6, '100.1  =  56.1 + 44.0  =  100.1', { size: 12, h: 0.3, color: C.blue, bold: true });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Using Mr with the big numbers', [
    'Multiply each **Mr** by the **balancing number** (coefficient) in front of the formula.',
    'Add up each side: total Mr of **reactants** = total Mr of **products**.',
    'This shows **mass is conserved**, and lets you **check** that an equation is balanced.',
    'The masses react in this **ratio**: 48.6 g of Mg reacts with 32.0 g of O₂ to make 80.6 g of MgO.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: methane burning', 'Show that mass is conserved: CH₄ + 2O₂ → CO₂ + 2H₂O', [
    ['Reactants', `16.0 + (2 × 32.0) = ${sideMass([[1, 'CH4'], [2, 'O2']]).toFixed(1)}`], ['Products', `44.0 + (2 × 18.0) = ${sideMass([[1, 'CO2'], [2, 'H2O']]).toFixed(1)}`],
    ['Answer', 'both sides total **80.0**, so mass is conserved']], { size: 10.5 });
  D.quickCheck(s, 'Show that mass is conserved in **2H₂ + O₂ → 2H₂O** using Mr values. What mass of water forms from **4.0 g** of hydrogen?');
  D.notes(s, 'QUICK CHECK ANSWER: Reactants (2 × 2.0) + 32.0 = 36.0; products 2 × 18.0 = 36.0, equal. 4.0 g of hydrogen (2H₂) makes 36.0 g of water (with 32.0 g of oxygen).\nAll totals computed in node from the Ar table and the balanced equations (2Mg + O₂: 80.6 = 80.6; CaCO₃: 100.1 = 56.1 + 44.0; CH₄: 80.0 = 80.0; 2H₂ + O₂: 36.0 = 36.0). Equations are atom-balanced in node. The Foundation route to reacting masses (scaling by ratio) builds on this slide (slide 14).');
  reg(s, 'C5.2.3 Mr in a balanced equation');
}

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C5.2.3')} • relative formula mass • use Ar: H 1.0, C 12.0, N 14.0, O 16.0, S 32.1, Ca 40.1`, [
  { q: 'Calculate the relative formula mass of **carbon dioxide, CO₂**, and of **water, H₂O**.', marks: 2, ms: 'CO₂ = 12.0 + 2 × 16.0 = 44.0 (1); H₂O = 2 × 1.0 + 16.0 = 18.0 (1).' },
  { q: 'Calculate the relative formula mass of **calcium hydroxide, Ca(OH)₂**.', marks: 2, ms: '40.1 + 2 × (16.0 + 1.0) or 40.1 + 34.0 (1); = 74.1 (1).' },
  { q: 'Calculate the relative formula mass of **ammonium sulfate, (NH₄)₂SO₄**.', marks: 2, ms: '2 × (14.0 + 4 × 1.0) + 32.1 + 4 × 16.0 / 36.0 + 32.1 + 64.0 (1); = 132.1 (1).' },
  { q: 'Use Mr values to show that mass is conserved in **CH₄ + 2O₂ → CO₂ + 2H₂O**.', marks: 2, ms: 'Reactants 16.0 + 2 × 32.0 = 80.0 (1); products 44.0 + 2 × 18.0 = 80.0, the same (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 THE MOLE (HT) =======================
reg(D.contentSlide({
  title: 'The mole and the Avogadro constant',
  subtitle: `Specification ${sp('C5.2.4')} • measuring amounts of substance in moles`,
  tag: 'C5.2.4', ht: true, caption: 'one mole of each substance; each contains 6.02 × 10²³ particles',
  draw: (s) => {
    // carbon pile
    poly(s, [[0.85, 3.6], [1.45, 2.75], [2.05, 3.6]], '3A3A3A', '1E1E1E', { lw: 1 });
    for (let i = 0; i < 9; i++) ball(s, 1.05 + (i % 3) * 0.2 + (Math.floor(i / 3) % 2) * 0.1, 3.45 - Math.floor(i / 3) * 0.2, 0.05, '5A5A5A', '1E1E1E', 0.5);
    // magnesium ribbon coil
    for (let i = 0; i < 4; i++) s.addShape(SH.OVAL, { x: 2.7 + i * 0.18, y: 2.85, w: 0.55, h: 0.7, fill: { type: 'none' }, line: { color: '8C96A8', width: 3 } });
    // water in measuring cylinder
    box(s, 4.85, 2.25, 0.55, 1.35, GLASS, C.ink, { lw: 1.25 });
    box(s, 4.86, 2.85, 0.53, 0.74, WAT[0], null);
    line(s, 4.86, 2.85, 5.39, 2.85, WAT[1], 1.25);
    box(s, 4.7, 3.6, 0.85, 0.08, GLASS, C.ink, { lw: 1 });
    [['Carbon, C', '12.0 g', 'Ar = 12.0', 1.45], ['Magnesium, Mg', '24.3 g', 'Ar = 24.3', 3.25], ['Water, H₂O', '18.0 g (18 cm³)', 'Mr = 18.0', 5.12]].forEach(([n, m, a, cx]) => {
      label(s, cx - 0.95, 1.5, 1.9, `**${n}**`, { size: 10.5, h: 0.26 });
      label(s, cx - 0.95, 1.8, 1.9, a, { size: 10, color: C.grey, h: 0.24 });
      pbox(s, cx - 0.85, 3.85, 1.7, 0.42, `**${m}**`, C.white, C.blue, { size: 11.5 });
      label(s, cx - 0.95, 4.32, 1.9, '= **1 mol**', { size: 11, h: 0.26, color: C.blue });
    });
    pbox(s, 0.75, 4.75, 5.5, 0.5, 'Each pile contains **6.02 × 10²³** particles (atoms or molecules)', HT_FILL, C.red, { size: 11.5, lw: 1 });
    label(s, 0.7, 5.35, 5.6, 'Like a “dozen” means 12, a “mole” means 602 000 000 000 000 000 000 000', { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
  },
  head: 'Counting particles by weighing',
  lines: [
    'Atoms are far too small to count, so chemists count them in **moles** (unit **mol**).',
    '**One mole** contains **6.02 × 10²³** particles: the **Avogadro constant**.',
    'The mass of 1 mole of a substance is its **Ar or Mr in grams** (its **molar mass**, g/mol).',
    '1 mol of C = 12.0 g; 1 mol of CO₂ = 44.0 g. Both contain the **same number** of particles.',
    'number of particles = **moles × 6.02 × 10²³**',
  ],
  size: 11.5,
  worked: { head: 'Worked example: number of molecules', q: 'How many molecules are in 2.5 mol of water?',
    steps: [['Multiply', '2.5 × 6.02 × 10²³'], ['Answer', `= ${(2.5 * 6.02).toFixed(2)} × 10²³ = **1.5 × 10²⁴** molecules (2 s.f.)`]], size: 10.5 },
  workedH: 1.3,
  qc: 'How many **atoms** are in **0.50 mol** of magnesium? What is the mass of **1 mol** of **CO₂**?',
  notes: 'QUICK CHECK ANSWER: 0.50 × 6.02 × 10²³ = 3.01 × 10²³ atoms (accept 3.0 × 10²³). 1 mol of CO₂ has a mass of 44.0 g.\nHT ONLY (C5.2.4; wording and code UNVERIFIED, see SPEC). Calculations asserted in node: 2.5 × 6.02 × 10²³ = 1.505 × 10²⁴ → 1.5 × 10²⁴ (2 s.f., as 2.5 has 2 s.f.).\nGRADE 7–9 STRETCH: 1 mol of H₂O molecules contains 3 × 6.02 × 10²³ = 1.81 × 10²⁴ atoms. Whether the J260 data sheet gives the Avogadro constant is UNVERIFIED: students should learn 6.02 × 10²³.',
}), 'C5.2.4 The mole and the Avogadro constant (HT)');

// ======================= 12 MASS AND MOLES (HT) =======================
reg(D.contentSlide({
  title: 'Converting mass and moles',
  subtitle: `Specification ${sp('C5.2.5')} • how the mass of a substance is related to its amount in moles`,
  tag: 'C5.2.5', ht: true, caption: 'cover the quantity you want; the other two show the calculation',
  draw: (s) => {
    triangleFormula(s, 2.15, 1.55, 2.8, 2.2, 'm', 'n', 'Mr');
    label(s, 0.7, 3.85, 2.9, '**m** = mass / g\n**n** = amount / mol\n**Mr** = relative formula mass', { size: 10.5, h: 0.8, align: 'left', valign: 'top' });
    [['n = m ÷ Mr', 'moles from mass'], ['m = n × Mr', 'mass from moles'], ['Mr = m ÷ n', 'Mr from data']].forEach(([f, t], i) => {
      pbox(s, 3.9, 1.65 + i * 0.72, 2.45, 0.6, `**${f}**\n${t}`, i ? C.white : HT_FILL, i ? C.blue : C.red, { size: 10.5, lw: 1 });
    });
    const rows = [[HDR('Formula'), HDR('Mr'), HDR('Mass / g'), HDR('Moles / mol')],
      [tcell('CO₂', 0), tcell('44.0', 0), tcell('88.0', 0), tcell('2.00', 0)],
      [tcell('CaCO₃', 1), tcell('100.1', 1), tcell('25.0', 1), tcell('0.250', 1)],
      [tcell('H₂O', 0), tcell('18.0', 0), tcell('9.0', 0), tcell('?', 0, { bold: true, color: C.red })],
      [tcell('NaCl', 1), tcell('58.5', 1), tcell('?', 1, { bold: true, color: C.red }), tcell('2.00', 1)]];
    s.addTable(rows, { x: 3.65, y: 3.95, w: 2.75, colW: [0.75, 0.6, 0.7, 0.7], rowH: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  },
  head: 'One equation, three uses',
  lines: [
    '**amount (mol) = mass (g) ÷ Mr**',
    'Find the **Mr** first, then divide the mass by it.',
    'Rearrange to find a **mass**: m = n × Mr.',
    'Give answers to a **sensible number of significant figures** (usually the same as the data, often 3).',
    'Always show the **units**: g for mass, mol for amount.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: both directions', q: 'Moles in 88.0 g of CO₂? Mass of 0.250 mol of CaCO₃?',
    steps: [['Moles', '88.0 ÷ 44.0 = **2.00 mol**'], ['Mass', `0.250 × 100.1 = ${fmt(0.250 * MR.CaCO3)} = **25.0 g** (3 s.f.)`]], size: 10.5 },
  workedH: 1.3,
  qc: 'Fill in the red **?** cells: how many moles are in **9.0 g** of water? What is the mass of **2.00 mol** of sodium chloride?',
  notes: 'QUICK CHECK ANSWER: 9.0 ÷ 18.0 = 0.50 mol. 2.00 × 58.5 = 117 g.\nHT ONLY (C5.2.5; wording and code UNVERIFIED). Every row of the table is asserted in node. The relationship n = m ÷ Mr is not on the J260 equation sheet (chemistry formulae must be recalled; UNVERIFIED whether any data sheet item covers it).\nCommon errors: dividing Mr by mass; using the Ar of one atom instead of the Mr of the whole formula; rounding too early.',
}), 'C5.2.5 Mass and moles (HT)');

// ======================= 13 RECAP 3 (HT) =======================
const R3 = D.recapSlide(3, `Specification ${sp('C5.2.4')}, ${sp('C5.2.5')} • moles • Avogadro constant = 6.02 × 10²³ • Ar: H 1.0, C 12.0, O 16.0, Mg 24.3, Ca 40.1`, [
  { q: 'Calculate the number of **atoms** in **2.00 mol** of magnesium. Give your answer in standard form.', marks: 2, ht: true, ms: '2.00 × 6.02 × 10²³ (1); = 1.20 × 10²⁴ atoms (1).' },
  { q: 'Calculate the amount, in moles, of water in **36.0 g** of water.', marks: 2, ht: true, ms: 'Mr H₂O = 18.0 (1); 36.0 ÷ 18.0 = 2.00 mol (1).' },
  { q: 'Calculate the mass of **0.200 mol** of calcium carbonate, CaCO₃ (Mr = 100.1).', marks: 2, ht: true, ms: '0.200 × 100.1 (1); = 20.0 g (accept 20.02 g) (1).' },
  { q: 'Which contains more atoms: **12.0 g** of carbon or **24.3 g** of magnesium? Explain your answer.', marks: 2, ht: true, ms: 'Same number / neither (1); each is 1 mol (mass = Ar in grams), so each contains 6.02 × 10²³ atoms (1).' },
], { ht: true });
reg(R3.s, 'Recap 3 (HT)');

// ======================= 14 REACTING MASSES =======================
{
  const s = D.contentHeader('Calculating reacting masses', `Specification ${sp('C5.2.7')} • use a balanced equation to calculate masses of reactants or products`, { tag: 'C5.2.7' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'two routes to the same answer');
  // Foundation route: scaling
  pbox(s, 0.7, 1.45, 1.6, 0.34, '**FOUNDATION + HT**', C.blue, C.blue, { size: 10, color: C.white });
  label(s, 2.4, 1.45, 4.0, 'Route 1: scale the Mr ratio', { size: 11, bold: true, h: 0.34, align: 'left', color: C.ink });
  eqn(s, 0.7, 1.92, 5.6, 'CH₄ + 2O₂ → CO₂ + 2H₂O', { size: 12, h: 0.38 });
  [['16.0 g CH₄', '44.0 g CO₂', ''], ['8.0 g CH₄', '22.0 g CO₂', '÷ 2'], ['4.0 g CH₄', '11.0 g CO₂', '÷ 4']].forEach(([a, b, k], i) => {
    const y = 2.42 + i * 0.42;
    pbox(s, 1.0, y, 1.6, 0.34, a, C.white, C.line, { size: 10.5, lw: 0.75 });
    arrow(s, 2.65, y + 0.17, 3.65, y + 0.17, C.blue, 1.5);
    pbox(s, 3.7, y, 1.6, 0.34, b, C.white, C.line, { size: 10.5, lw: 0.75 });
    if (k) label(s, 5.35, y, 0.8, k, { size: 10.5, bold: true, color: C.orange, h: 0.34 });
  });
  // HT route: moles flowchart
  pbox(s, 0.7, 3.85, 0.6, 0.34, '**HT**', C.red, C.red, { size: 10, color: C.white });
  label(s, 1.4, 3.85, 5.0, 'Route 2: via moles (mass → mol → mol → mass)', { size: 11, bold: true, h: 0.34, align: 'left', color: C.ink });
  const fl = [['mass of A', '8.0 g CH₄'], ['moles of A', '0.50 mol'], ['moles of B', '1.00 mol H₂O'], ['mass of B', '18.0 g']];
  fl.forEach(([t, v], i) => {
    const x = 0.7 + i * 1.45;
    pbox(s, x, 4.32, 1.2, 0.72, `**${t}**\n${v}`, i % 3 ? HT_FILL : C.white, i % 3 ? C.red : C.blue, { size: 10, lw: 1 });
    if (i < 3) arrow(s, x + 1.22, 4.68, x + 1.43, 4.68, C.ink, 1.5);
  });
  [['÷ Mr', 2.02], ['× ratio', 3.47], ['× Mr', 4.92]].forEach(([t, x]) => label(s, x - 0.5, 5.1, 1.0, t, { size: 10.5, bold: true, color: C.red, h: 0.24 }));
  label(s, 0.7, 5.42, 5.6, 'Ratio from the equation: 1 CH₄ : 2 H₂O', { size: 10.5, italic: true, color: C.grey, h: 0.3 });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Steps', [
    'Write the **balanced equation**. Find the **Mr** of the two substances you need.',
    '**Route 1**: multiply each Mr by its **balancing number**. These masses react in this **ratio**; scale them up or down.',
    '!!HT!! **Route 2**: moles of A = mass ÷ Mr; use the **mole ratio** from the equation; mass of B = moles × Mr.',
    'Check: does the answer make sense? Round to a sensible number of **significant figures**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example (HT): water from methane', 'What mass of water forms when 8.0 g of methane burns?', [
    ['Moles CH₄', '8.0 ÷ 16.0 = 0.50 mol'], ['Ratio 1 : 2', '0.50 × 2 = 1.00 mol H₂O'], ['Answer', '1.00 × 18.0 = **18.0 g** of water']], { size: 10.5 });
  D.quickCheck(s, 'CaCO₃ → CaO + CO₂. **(F)** 100.1 g of CaCO₃ gives 44.0 g of CO₂: what mass from **200.2 g**? **(HT)** What mass of CO₂ from **25.0 g** of CaCO₃?');
  D.notes(s, 'QUICK CHECK ANSWER: (F) double the mass, so 2 × 44.0 = 88.0 g. (HT) 25.0 ÷ 100.1 = 0.2498 mol CaCO₃ → 0.2498 mol CO₂ (1 : 1) → 0.2498 × 44.0 = 10.99 = 11.0 g (3 s.f.). Route 1 gives the same: 25.0 × 44.0 ÷ 100.1 = 11.0 g.\nC5.2.7 code from an RSC resource tag (Combined Science B). HT status of C5.2.7 is UNVERIFIED: the Foundation route (scaling the Mr ratio, which is conservation of mass plus ratio) is taught to all; the moles route is marked HT. All values asserted in node: 16.0 g → 44.0 g; 8.0 g → 22.0 g; 4.0 g → 11.0 g; 8.0 g CH₄ → 0.50 mol → 1.00 mol H₂O → 18.0 g.');
  reg(s, 'C5.2.7 Reacting masses');
}

// ======================= 15 STOICHIOMETRY FROM MASSES (HT) =======================
{
  const s = D.contentHeader('Balancing equations from masses', `Specification ${sp('C5.2.6')} • deduce the stoichiometry of an equation from masses of reactants and products`, { ht: true, tag: 'C5.2.6' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'moles calculated from measured masses (bars to scale)');
  label(s, 0.7, 1.42, 5.6, '2.43 g of Mg reacts with 1.60 g of O₂ to make 4.03 g of MgO', { size: 11, bold: true, h: 0.3, color: C.ink });
  const rows = [[HDR(''), HDR('Mg'), HDR('O₂'), HDR('MgO')],
    [tcell('Mass / g', 0, { bold: true }), ...SM.map(r => tcell(r[1].toFixed(2), 0))],
    [tcell('Ar or Mr', 1, { bold: true }), ...SM.map(r => tcell(r[2].toFixed(1), 1))],
    [tcell('Moles = m ÷ Mr', 0, { bold: true }), ...smMol.map(v => tcell(fmt(v).replace(/^0\.1$/, '0.100').replace(/^0\.05$/, '0.0500'), 0))],
    [tcell('÷ smallest (0.0500)', 1, { bold: true }), ...smMol.map(v => tcell(fmt(v / smMin), 1, { bold: true, color: C.red }))]];
  s.addTable(rows, { x: 0.7, y: 1.8, w: 5.6, colW: [1.85, 1.25, 1.25, 1.25], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  // bars of moles to scale
  const g = { x: 1.45, y: 3.55, w: 4.6, h: 1.6, xmin: 0, xmax: 3, ymin: 0, ymax: 0.12, xstep: 1, ystep: 0.04, grid: true, ylabel: 'Moles', fmt: () => '', yfmt: v => v.toFixed(2) };
  D.axes(s, g);
  const cats = [['Mg', smMol[0], 'C9CED6'], ['O₂', smMol[1], 'E06666'], ['MgO', smMol[2], 'B48ACF']];
  cats.forEach(([t, v, c], i) => {
    const xc = D.px(g, i + 0.5), bw = 0.7;
    box(s, xc - bw / 2, D.py(g, v), bw, D.py(g, 0) - D.py(g, v), c, C.ink, { lw: 0.75 });
    label(s, xc - 0.6, g.y + g.h + 0.05, 1.2, `**${t}**`, { size: 10.5, h: 0.22 });
  });
  label(s, 0.7, 5.55, 5.6, 'Ratio **2 : 1 : 2**  →  **2Mg + O₂ → 2MgO**', { size: 12, h: 0.3, color: C.blue, bold: true });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Method', [
    'Convert the mass of **each** substance to **moles** (mass ÷ Mr).',
    '**Divide** every amount by the **smallest** amount to get a simple ratio.',
    'If needed, multiply to get **whole numbers** (e.g. 1 : 1.5 → 2 : 3).',
    'The ratio gives the **balancing numbers** in the equation: the **stoichiometry**.',
  ], { size: 11.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: magnesium oxide', 'Use the table on the left.', [
    ['Moles', 'Mg 2.43 ÷ 24.3 = 0.100; O₂ 1.60 ÷ 32.0 = 0.0500; MgO 0.100'], ['÷ 0.0500', 'Mg 2, O₂ 1, MgO 2'], ['Answer', '**2Mg + O₂ → 2MgO**; check: 2.43 + 1.60 = 4.03 g']], { size: 10.5 });
  D.quickCheck(s, '**1.27 g** of copper reacts with **0.32 g** of oxygen, O₂, to make **1.59 g** of copper oxide, CuO. Deduce the balanced equation. (Cu = 63.5, CuO = 79.5)');
  D.notes(s, 'QUICK CHECK ANSWER: Cu 1.27 ÷ 63.5 = 0.0200 mol; O₂ 0.32 ÷ 32.0 = 0.0100 mol; CuO 1.59 ÷ 79.5 = 0.0200 mol. Divide by 0.0100: 2 : 1 : 2, so 2Cu + O₂ → 2CuO (atom balance asserted in node).\nHT ONLY (C5.2.6; code UNVERIFIED). All moles and ratios asserted in node. Note that masses are conserved (2.43 + 1.60 = 4.03 g; 1.27 + 0.32 = 1.59 g), linking back to C5.2.1. Bars plotted to scale from the computed moles.');
  reg(s, 'C5.2.6 Stoichiometry from masses (HT)');
}

// ======================= 16 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C5.2.6')}, ${sp('C5.2.7')} • reacting masses • Ar: H 1.0, C 12.0, O 16.0, Mg 24.3, Cu 63.5`, [
  { q: '24.3 g of magnesium makes 40.3 g of magnesium oxide. What mass of magnesium oxide is made from **2.43 g** of magnesium?', marks: 2, ms: '2.43 is 24.3 ÷ 10 / scale by the same factor (1); 40.3 ÷ 10 = 4.03 g (1).' },
  { q: 'Carbon burns: C + O₂ → CO₂. Calculate the mass of carbon dioxide made from **3.0 g** of carbon.', marks: 2, ht: true, ms: '3.0 ÷ 12.0 = 0.25 mol C, so 0.25 mol CO₂ (1); 0.25 × 44.0 = 11.0 g (accept 11 g) (1). Ratio method 3.0 × 44.0 ÷ 12.0 also scores.' },
  { q: 'Mg + 2HCl → MgCl₂ + H₂. Calculate the mass of hydrogen made from **2.43 g** of magnesium with excess acid.', marks: 2, ht: true, ms: '2.43 ÷ 24.3 = 0.100 mol Mg → 0.100 mol H₂ (1); 0.100 × 2.0 = 0.200 g (1).' },
  { q: '**2.54 g** of Cu reacts with **0.64 g** of O₂ to make **3.18 g** of CuO. Use moles to deduce the balanced equation.', marks: 2, ht: true, ms: 'Moles Cu 0.0400, O₂ 0.0200, CuO 0.0400 (1); ratio 2 : 1 : 2, so 2Cu + O₂ → 2CuO (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 17 LIMITING REACTANTS (HT) =======================
{
  const s = D.contentHeader('Limiting reactants', `Specification ${sp('C5.2.8')} • the effect of a limiting quantity of a reactant on the amount of product`, { ht: true, tag: 'C5.2.8' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'particle model: H₂ + Cl₂ → 2HCl; each molecule drawn once');
  eqn(s, 0.75, 1.45, 5.5, 'H₂(g) + Cl₂(g) → 2HCl(g)', { size: 12, h: 0.38 });
  [[0.75, 'Before: 5 H₂ + 3 Cl₂'], [3.6, 'After: 6 HCl + 2 H₂ left']].forEach(([x, t]) => {
    box(s, x, 2.25, 2.65, 2.3, C.white, C.ink, { lw: 1.25 });
    label(s, x, 1.95, 2.65, `**${t}**`, { size: 10.5, h: 0.26 });
  });
  arrow(s, 3.42, 3.4, 3.58, 3.4, C.ink, 2);
  // before
  [[1.15, 2.6], [2.1, 2.55], [2.9, 2.75], [1.4, 3.35], [2.6, 3.4]].forEach(([x, y]) => diatomic(s, x, y, 'H', 'H', 0.11, { size: 9 }));
  [[1.2, 4.1], [2.05, 3.9], [2.85, 4.2]].forEach(([x, y]) => diatomic(s, x, y, 'Cl', 'Cl', 0.14, { size: 9 }));
  // after
  [[4.0, 2.6], [4.85, 2.65], [3.95, 3.35], [4.75, 3.45], [4.1, 4.1], [4.95, 4.2]].forEach(([x, y]) => { atom(s, x - 0.11, y, 'H', 0.11, { size: 9 }); atom(s, x + 0.12, y, 'Cl', 0.14, { size: 9 }); });
  [[5.75, 2.8], [5.75, 3.8]].forEach(([x, y]) => { diatomic(s, x, y, 'H', 'H', 0.11, { size: 9 }); s.addShape(SH.OVAL, { x: x - 0.32, y: y - 0.25, w: 0.64, h: 0.5, fill: { type: 'none' }, line: { color: C.orange, width: 1.5, dashType: 'dash' } }); });
  pbox(s, 0.75, 4.75, 2.65, 0.5, '**Cl₂ is limiting**: all used up', HT_FILL, C.red, { size: 10.5, lw: 1 });
  pbox(s, 3.6, 4.75, 2.65, 0.5, '**H₂ is in excess**: 2 left over', 'FFF0D9', C.orange, { size: 10.5, lw: 1 });
  label(s, 0.7, 5.4, 5.6, 'Adding more H₂ makes **no more** HCl; adding more Cl₂ **would**', { size: 10.5, h: 0.3, color: C.ink });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'The reactant that runs out', [
    'The **limiting reactant** is completely **used up**; the reaction then stops.',
    'The other reactant is **in excess**: some is left over.',
    'The **amount of product** depends only on the limiting reactant: double it and you **double** the product.',
    'To find it: work out the **moles** of each reactant and compare with the **mole ratio** in the equation.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: 2Mg + O₂ → 2MgO', '4.86 g of Mg is heated with 4.80 g of O₂. Mass of MgO?', [
    ['Moles', 'Mg 4.86 ÷ 24.3 = 0.200; O₂ 4.80 ÷ 32.0 = 0.150'], ['Compare', '0.200 mol Mg needs only 0.100 mol O₂: **Mg is limiting**'], ['Answer', '0.200 mol MgO × 40.3 = **8.06 g**']], { size: 10.5 });
  D.quickCheck(s, '**1.27 g** of copper (0.0200 mol) is heated with **0.64 g** of oxygen (0.0200 mol O₂): 2Cu + O₂ → 2CuO. Which is limiting? What mass of CuO forms?');
  D.notes(s, `QUICK CHECK ANSWER: 0.0200 mol Cu needs only 0.0100 mol O₂, so copper is limiting and oxygen is in excess. 0.0200 mol CuO × 79.5 = 1.59 g.\nHT ONLY (C5.2.8; code UNVERIFIED; wording from an OCR B revision extract: "explain the effect of a limiting quantity of a reactant on the amount of products it is possible to make, in terms of amount of product in moles or masses in grams").\nParticle diagram counts asserted: 5 H₂ + 3 Cl₂ → 6 HCl with 2 H₂ left; H atoms 10 = 6 + 4. Worked example asserted: 0.200 mol Mg, 0.150 mol O₂ (0.0500 mol O₂ left over), 8.06 g MgO.\nLink to the practical: the lid is lifted so that oxygen is not the limiting reactant.`);
  reg(s, 'C5.2.8 Limiting reactants (HT)');
}

// ======================= 18 PRACTICAL: METHOD =======================
reg(D.contentSlide({
  title: 'Practical: burning magnesium',
  subtitle: `Specification ${sp('C5.2.2')}, ${sp('C5.2.6')} • suggested practical: the mass change when magnesium burns in air`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'crucible on a pipeclay triangle, heated strongly; balance reads to 0.01 g',
  draw: (s) => {
    // bench
    box(s, 0.6, 5.3, 5.8, 0.08, C.wood, '8A5A2B', { lw: 0.75 });
    box(s, 1.2, 5.18, 2.0, 0.12, 'E8E3D6', '9A8F78', { lw: 0.75 });
    label(s, 0.6, 5.4, 2.8, 'heat-resistant mat', { size: 10, italic: true, color: C.grey, h: 0.22 });
    pbox(s, 0.75, 1.5, 5.5, 0.5, 'mass of **oxygen** gained = (crucible + lid + MgO) − (crucible + lid + Mg)', C.white, C.blue, { size: 11, lw: 1 });
    pbox(s, 0.75, 2.12, 5.5, 0.42, 'Open system: oxygen enters from the air, so the mass **increases**', 'E8F4EC', C.green, { size: 10.5, lw: 1 });
    tripod(s, 2.2, 4.0, 1.7, 5.18);
    bunsen(s, 2.2, 5.18);
    // pipeclay triangle
    line(s, 1.45, 3.98, 2.95, 3.98, 'E6DCCB', 4);
    crucible(s, 2.2, 3.98, 1.0, 0.7, { content: 'BFC4CC', lid: true, lidUp: 0.18 });
    label(s, 0.5, 2.92, 1.12, 'lid lifted slightly', { size: 10, bold: true, color: C.ink, h: 0.3, align: 'right' });
    label(s, 2.85, 3.35, 1.8, 'crucible + Mg ribbon', { size: 10, bold: true, h: 0.22, align: 'left' });
    label(s, 3.1, 3.85, 1.5, 'pipeclay triangle', { size: 10, bold: true, h: 0.22, align: 'left' });
    label(s, 3.25, 4.35, 1.0, 'tripod', { size: 10, bold: true, h: 0.22, align: 'left' });
    label(s, 2.33, 4.62, 0.75, 'Bunsen\nburner', { size: 10, bold: true, h: 0.4, align: 'left' });
    // balance with crucible
    balance(s, 5.25, 4.6, 1.7, '20.24 g');
    crucible(s, 5.25, 4.6, 0.7, 0.5, { lid: true });
    label(s, 4.4, 3.4, 1.7, 'weigh crucible + lid + Mg', { size: 10, h: 0.4, valign: 'bottom' });
  },
  head: 'Method',
  lines: [
    'Weigh an empty **crucible and lid**. Add a coil of clean **magnesium ribbon**; weigh again.',
    'Heat strongly. **Lift the lid** slightly every minute with **tongs** to let air in, but keep the white smoke in.',
    'When the Mg no longer glows, remove the lid and heat for 2 more minutes. **Cool**, then **reweigh**.',
    'Repeat heating, cooling and weighing until the mass is **constant**.',
    '**IV**: mass of Mg. **DV**: mass of oxygen gained. **Control**: heating time, same crucible.',
    '**Safety**: eye protection; do not look directly at burning Mg; hot crucible: use tongs; **Mg ribbon is FLAMMABLE**.',
  ],
  size: 11,
  worked: { head: 'Worked example: mass of oxygen', q: 'Crucible + lid 20.12 g; + Mg 20.24 g; after heating 20.32 g.',
    steps: [['Mg', '20.24 − 20.12 = 0.12 g'], ['Answer', 'oxygen = 20.32 − 20.24 = **0.08 g**; MgO = **0.20 g**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why is the lid lifted only **slightly**? Why is the crucible **heated to constant mass**?',
  notes: 'QUICK CHECK ANSWER: Lifting the lid lets in oxygen (air) so that the magnesium is not short of oxygen, but keeping it nearly closed stops magnesium oxide smoke escaping (which would make the mass too low). Heating to constant mass shows that all the magnesium has reacted (reaction complete).\nSUGGESTED PRACTICAL: no OCR PAG code was found for this sub-topic. SPEC_C5_1.md lists the Combined Science chemistry PAGs as C1 electrolysis, C2 distillation, C3 separation, C4 salts, C5 rates; none is about reacting masses. Classic activity: RSC "The change in mass when magnesium burns", which supports C5.2.2 (open-system mass gain) and, for HT, C5.2.6 (finding the formula / stoichiometry).\nCLEAPSS-style hazards: magnesium ribbon FLAMMABLE (Hazcard 59A); burns with a very bright flame (UV): do not look directly at it; magnesium oxide low hazard; crucible and pipeclay triangle stay hot for a long time: use tongs, cool on a heat-resistant mat. Wear eye protection. Worked example values asserted (0.12 g, 0.08 g, 0.20 g).',
}), 'Practical: burning magnesium (method)');

// ======================= 19 PRACTICAL: RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C5.2.2')}, ${sp('C5.2.6')} • table, graph to scale, ratio and errors`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale from the class results (illustrative data)');
  const g = { x: 1.45, y: 1.55, w: 5.3, h: 2.85, xmin: 0, xmax: 0.7, ymin: 0, ymax: 0.5, xstep: 0.1, ystep: 0.1, minor: 2, xlabel: 'Mass of magnesium / g', ylabel: 'Mass of oxygen / g', fmt: v => v.toFixed(1) };
  D.axes(s, g);
  D.plotLine(s, g, [[0, 0], [0.7, 0.7 * GRAD]], C.blue, 2);
  D.points(s, g, PMG.map((m, i) => [m, POX[i]]), C.ink);
  s.addShape(SH.OVAL, { x: D.px(g, 0.48) - 0.13, y: D.py(g, 0.27) - 0.13, w: 0.26, h: 0.26, fill: { type: 'none' }, line: { color: C.red, width: 1.5 } });
  label(s, D.px(g, 0.48) + 0.1, D.py(g, 0.27) + 0.02, 1.0, 'anomaly', { size: 10, bold: true, color: C.red, align: 'left', h: 0.22 });
  label(s, D.px(g, 0.36) - 0.2, D.py(g, 0.42), 1.9, 'line of best fit\nthrough the origin', { size: 10, color: C.blue, bold: true, align: 'left', h: 0.4 });
  const rows = [[HDR('Mass of Mg / g'), ...PMG.map(v => HDR(v.toFixed(2)))], [tcell('Mass of MgO / g', 0, { bold: true }), ...PMGO.map(v => tcell(v.toFixed(2), 0))], [tcell('Mass of O / g', 1, { bold: true }), ...POX.map((v, i) => tcell(v.toFixed(2), 1, i === 3 ? { bold: true, color: C.red } : {}))]];
  s.addTable(rows, { x: 0.7, y: 4.98, w: 6.1, colW: [1.6, 0.9, 0.9, 0.9, 0.9, 0.9], rowH: 0.21, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.85, 'Worked example (HT): the formula', 'From the line: 0.60 g of Mg combines with 0.40 g of O.', [
    ['Mg', `0.60 ÷ 24.3 = ${sf(pMg, 3)} mol`], ['O atoms', `0.40 ÷ 16.0 = ${fmt(pO)} mol`], ['Answer', 'ratio ≈ **1 : 1**, so the formula is **MgO**']], { size: 10.5 });
  D.card(s, 7.3, 3.3, 5.58, 2.95, 'Conclusion and errors', [
    'The mass of oxygen is **directly proportional** to the mass of Mg: a straight line through the origin.',
    'Mass of Mg + mass of O = mass of MgO: **mass is conserved** once the oxygen is counted.',
    '**Errors**: MgO smoke escapes (gain too low, as at **0.48 g**); Mg not all reacted; crucible weighed while hot.',
    '**Improve**: heat to **constant mass**; repeat and find a **mean**; ignore the anomaly when drawing the line.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the graph: what mass of oxygen reacts with **0.30 g** of magnesium? What mass of MgO should **0.48 g** of Mg have made? (MgO = 40.3)');
  D.notes(s, `QUICK CHECK ANSWER: From the line, about 0.20 g of oxygen (0.30 × 0.66 = 0.198; accept 0.19–0.21 g). Expected MgO = 0.48 × 40.3 ÷ 24.3 = 0.796 = 0.80 g; the student got 0.75 g, so 0.05 g was lost (smoke escaped / not all Mg reacted).\nIllustrative data, asserted in node: oxygen = MgO − Mg for every row (0.08, 0.16, 0.23, 0.27, 0.40 g); every run except 0.48 g is within 0.01 g of the theoretical 16.0 ÷ 24.3 × mass of Mg; the 0.48 g run is 0.05 g low (anomaly). Line of best fit drawn with gradient 0.66 (theory 16.0 ÷ 24.3 = 0.658); it reads 0.40 g of oxygen at 0.60 g of Mg (0.396). HT ratio: 0.60 ÷ 24.3 = ${fmt(pMg)} mol Mg; 0.40 ÷ 16.0 = 0.025 mol O; ratio 1.0.\nGRADE 7–9 STRETCH: some Mg reacts with nitrogen in air to form magnesium nitride, Mg₃N₂, which also lowers the mass gained.`);
  reg(s, 'Practical: results and analysis');
}

// ======================= 20 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C5.2.8')} and the practical • limiting reactants • burning magnesium`, [
  { q: 'What is meant by a **limiting reactant**?', marks: 2, ht: true, ms: 'The reactant that is completely used up (1); it determines / limits the amount of product made (and the other reactant is in excess) (1).' },
  { q: '**0.30 mol** of Mg is heated with **0.10 mol** of O₂: 2Mg + O₂ → 2MgO. Which is limiting? How many moles of MgO form?', marks: 2, ht: true, ms: '0.10 mol O₂ needs 0.20 mol Mg, so O₂ is limiting / Mg in excess (1); 0.20 mol MgO (1).' },
  { q: 'Explain why the lid of the crucible is **lifted slightly** during the magnesium practical.', marks: 2, ms: 'To let air / oxygen in so that the magnesium reacts completely (1); but not fully, so that magnesium oxide (smoke) does not escape (1).' },
  { q: '**0.36 g** of Mg made **0.59 g** of MgO. Calculate the mass of oxygen that reacted, and suggest why it is **less** than the expected 0.24 g.', marks: 2, ms: '0.59 − 0.36 = 0.23 g (1); some MgO smoke escaped / not all the Mg reacted (1).' },
]);
reg(R5.s, 'Recap 5');
calc('R5 Q4 expected oxygen 0.24', sf(0.36 * AR.O / AR.Mg, 2), 0.24, 1e-12);

// ======================= 21 EQUATIONS SUMMARY =======================
T.addEq('CONS', { eq: 'mass reactants = mass products', words: 'law of conservation of mass: total mass before = total mass after (closed system)', status: 'recall' });
T.addEq('MR', { eq: 'Mr = Σ Ar', words: 'relative formula mass = sum of the relative atomic masses of all the atoms in the formula (no units)', status: 'recall' });
T.addEq('NMOL', { eq: 'n = m ÷ Mr', words: 'HT: amount (mol) = mass (g) ÷ relative formula mass', status: 'recall' });
T.addEq('NA', { eq: 'N = n × 6.02 × 10²³', words: 'HT: number of particles = amount (mol) × Avogadro constant', status: 'recall' });
reg(D.equationsSlide([['CONS', 'C5.2.1'], ['MR', 'C5.2.3'], ['NMOL', 'C5.2.5 HT'], ['NA', 'C5.2.4 HT']], {
  subtitle: `${DECK.code} • learn these relationships • the HT rows are Higher tier only`,
  qc: 'Rearrange **n = m ÷ Mr** to make **m** the subject. How many particles are in **0.10 mol** of any substance?',
  notes: 'QUICK CHECK ANSWER: m = n × Mr. 0.10 × 6.02 × 10²³ = 6.02 × 10²² particles.\nThese chemistry relationships are not on the J260 physics equation sheet, so students recall them. The OCR data sheet gives the periodic table with Ar values; whether it also lists the Avogadro constant is UNVERIFIED.',
}), 'Summary: equations');
calc('equations QC 0.10 × NA', 0.10 * NA, 6.02e22, 1e8);

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Conservation of mass', 'Atoms are not made or destroyed in a reaction, so total mass stays the same.'],
  ['Closed system', 'Nothing can enter or leave, e.g. a sealed flask: the mass does not change.'],
  ['Non-enclosed system', 'Open to the air: gases can enter or escape, so the measured mass changes.'],
  ['Balanced equation', 'Same number of each type of atom on both sides of the equation.'],
  ['Relative atomic mass, Ar', 'Mean mass of an atom of an element compared with ¹/₁₂ of a carbon-12 atom.'],
  ['Relative formula mass, Mr', 'Sum of the Ar values of all the atoms in a formula; no units.'],
  ['Mole (HT)', 'The amount of substance that contains 6.02 × 10²³ particles.'],
  ['Avogadro constant (HT)', '6.02 × 10²³: the number of particles in one mole.'],
  ['Molar mass (HT)', 'Mass of 1 mol: the Ar or Mr in grams (g/mol).'],
  ['Amount of substance (HT)', 'Measured in moles: n = m ÷ Mr.'],
  ['Stoichiometry (HT)', 'The mole ratio of reactants and products in a balanced equation.'],
  ['Reacting masses', 'The masses of substances that react together, in a fixed ratio.'],
  ['Limiting reactant (HT)', 'The reactant that is used up first and limits the amount of product.'],
  ['In excess', 'More than is needed: some is left over when the reaction stops.'],
  ['Constant mass', 'Heating, cooling and weighing until the mass stops changing.'],
  ['Standard form', 'A number written as A × 10ⁿ, e.g. 6.02 × 10²³.'],
], { notes: 'Use as a cover-and-recall activity. Terms marked (HT) are Higher tier only. Concentration terms (mol/dm³, g/dm³, titration) belong to C5.3 and are not included.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student heats **12.35 g** of green copper carbonate, CuCO₃, in an **open** crucible. It decomposes: **CuCO₃(s) → CuO(s) + CO₂(g)**. The black solid left has a mass of **7.95 g**. (Ar: C = 12.0, O = 16.0, Cu = 63.5)', [
  { l: 'a', q: 'The mass of the solid **decreases**. Explain why, using the **particle model**.', marks: 2, ms: 'Carbon dioxide gas is produced (1); the gas particles escape from the open crucible into the air (so their mass is not weighed) (1).' },
  { l: 'b', q: 'Calculate the relative formula mass, **Mr**, of copper carbonate, CuCO₃.', marks: 2, ms: '63.5 + 12.0 + (3 × 16.0) (1); = 123.5 (1).' },
  { l: 'c', q: 'Show that the total **Mr** of the products equals the Mr of CuCO₃. What law does this show?', marks: 2, ms: 'CuO 79.5 + CO₂ 44.0 = 123.5 (1); (law of) conservation of mass (1).', h: 1.1 },
  { l: 'd', q: 'Calculate the mass of **carbon dioxide** given off.', marks: 1, ms: '12.35 − 7.95 = 4.40 g (1).', h: 0.8 },
  { l: 'e', q: 'Calculate the **amount in moles** of CuCO₃ used, and the **mass of CuO** expected.', marks: 3, ht: true, ms: '12.35 ÷ 123.5 = 0.100 mol (1); 1 : 1 ratio, so 0.100 mol CuO (1); 0.100 × 79.5 = 7.95 g (1).', h: 1.2 },
  { l: 'f', q: 'In a repeat, 12.35 g gave **8.30 g** of solid. Suggest **why**, explain the effect on the calculated mass of CO₂, and suggest an **improvement**.', marks: 3, ms: 'Not all the copper carbonate decomposed / heating too short (1); so less CO₂ was lost and the calculated mass of CO₂ (4.05 g) is too low (1); heat to constant mass / heat for longer and reweigh until the mass stops changing (1).', h: 1.5 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (e) is HT` }), 'Full question');
calc('FQ (f) CO2 in repeat', Math.round((12.35 - 8.30) * 100) / 100, 4.05, 1e-9);

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Method: weigh an empty crucible and lid; add magnesium ribbon (cleaned) and reweigh; mass of Mg by subtraction.',
    'Heat strongly on a pipeclay triangle on a tripod with a Bunsen burner; lift the lid occasionally with tongs to let in air; avoid losing smoke.',
    'Cool and reweigh; reheat, cool and reweigh until constant mass; mass of oxygen = final mass − mass of crucible, lid and Mg.',
    'Repeat with different masses of Mg / repeat each mass and find a mean; plot mass of oxygen against mass of Mg.',
    'Safety: eye protection; do not look directly at the burning magnesium; tongs and heat-resistant mat; let the crucible cool.',
    'Explanation: magnesium combines with oxygen from the air (2Mg + O₂ → 2MgO), so the solid product contains the oxygen atoms as well and has a greater mass.',
    'Mass is still conserved: atoms are only rearranged; mass of Mg + mass of oxygen used = mass of MgO; the system is open, so oxygen enters from the air.',
  ], {
    l3: 'Describes a clear, workable method that would give the mass of oxygen (including weighing before and after, and heating to constant mass or lifting the lid) AND explains the mass increase using oxygen atoms from the air AND links this to conservation of mass.',
    l2: 'Describes a method with weighing before and after heating AND gives some explanation of the mass increase (oxygen added).',
    l1: 'Simple statements, e.g. "heat the magnesium and weigh it" or "it gains oxygen".',
  });
}
const HW = [
  { n: '1', q: 'State the **law of conservation of mass**.', marks: 1, ms: 'In a chemical reaction, the total mass of the products equals the total mass of the reactants / mass is not created or destroyed (1).' },
  { n: '2', q: 'Calculate the relative formula mass of **magnesium hydroxide, Mg(OH)₂**. (Ar: H 1.0, O 16.0, Mg 24.3)', marks: 2, ms: '24.3 + 2 × (16.0 + 1.0) (1); = 58.3 (1).' },
  { n: '3', q: 'Zinc reacts with hydrochloric acid in an **open** beaker on a balance. Explain why the reading **falls**.', marks: 2, ms: 'Hydrogen gas is made (1); it escapes from the open beaker into the air (1).' },
  { n: '4', q: 'Calculate the amount in moles in **22.0 g** of CO₂ (Mr 44.0), and the number of **molecules**.', marks: 2, ht: true, ms: '22.0 ÷ 44.0 = 0.500 mol (1); 0.500 × 6.02 × 10²³ = 3.01 × 10²³ molecules (1).', h: 1.1 },
  { n: '5', q: '**0.20 mol** H₂ is mixed with **0.15 mol** Cl₂: H₂ + Cl₂ → 2HCl. Which reactant is **limiting**? How many moles of HCl form?', marks: 2, ht: true, ms: 'Cl₂ is limiting (1:1 ratio, less Cl₂) (1); 0.15 × 2 = 0.30 mol HCl (1).', h: 1.1 },
  { n: '6', q: '16.0 g of methane burns to make **36.0 g** of water. What mass of water forms from **4.0 g** of methane?', marks: 2, ms: '4.0 is 16.0 ÷ 4 / ratio (1); 36.0 ÷ 4 = 9.0 g (1).' },
  { n: '7', q: 'Describe how a student could find the **mass of oxygen** that reacts with magnesium ribbon, and **explain** why the mass of the solid increases even though mass is **conserved**.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q4 and Q5 are Higher tier.', HW, 17, { dividerSub: 'C5.2 Amounts in reactions • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C5.2') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom-balanced`);
const out = path.join(__dirname, 'OCR21C_C5.2_AmountsInReactions_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
