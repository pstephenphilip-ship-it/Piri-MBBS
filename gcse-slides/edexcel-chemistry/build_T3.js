// build_T3.js — Edexcel GCSE Chemistry 1CH0 Topic 3 Chemical changes (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T3.js
// Structure copied from ../edexcel-physics/build_T10.js and ../edexcel-biology/build_T7.js (approved Edexcel decks).
// edx_chem_template.js is NOT edited: equation checker (atoms AND charges), ion, glassware, electrolysis-cell and
// titration helpers are in the DECK-SPECIFIC block below (glassware adapted from ../ocr-chemistry/build_C6_1.js and
// build_C5_3.js). Teacher focus: ionic equations (0.4, HT) and half equations (3.27, HT) as a thread through the deck.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 3,
  title: 'Chemical changes',
  shortTitle: 'T3',
  subtitle: 'Acids, salts, ionic equations, electrolysis and half equations',
  specRange: '3.1–3.31',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Acids & alkalis', 'pH', 'Salts', 'Ionic equations', 'Electrolysis', 'Half equations'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH, comp, wire, dot } = D;
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

// --- 3.1 acids and alkalis in water ---
eq('HCl', [[1, 'HCl', 'aq']], [[1, 'H^+', 'aq'], [1, 'Cl^-', 'aq']]);
eq('H2SO4', [[1, 'H2SO4', 'aq']], [[2, 'H^+', 'aq'], [1, 'SO4^2-', 'aq']]);
eq('HNO3', [[1, 'HNO3', 'aq']], [[1, 'H^+', 'aq'], [1, 'NO3^-', 'aq']]);
eq('NaOH', [[1, 'NaOH', 'aq']], [[1, 'Na^+', 'aq'], [1, 'OH^-', 'aq']]);
eq('CH3COOH', [[1, 'CH3COOH', 'aq']], [[1, 'CH3COO^-', 'aq'], [1, 'H^+', 'aq']], { rev: true });
// --- 3.11, 3.12 reactions of acids ---
eq('Mg+HCl', [[1, 'Mg', 's'], [2, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]);
eq('CuO+H2SO4', [[1, 'CuO', 's'], [1, 'H2SO4', 'aq']], [[1, 'CuSO4', 'aq'], [1, 'H2O', 'l']]);
eq('Mg(OH)2+HNO3', [[1, 'Mg(OH)2', 's'], [2, 'HNO3', 'aq']], [[1, 'Mg(NO3)2', 'aq'], [2, 'H2O', 'l']]);
eq('CaCO3+HCl', [[1, 'CaCO3', 's'], [2, 'HCl', 'aq']], [[1, 'CaCl2', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('limewater', [[1, 'Ca(OH)2', 'aq'], [1, 'CO2', 'g']], [[1, 'CaCO3', 's'], [1, 'H2O', 'l']]);
eq('pop', [[2, 'H2', 'g'], [1, 'O2', 'g']], [[2, 'H2O', 'l']]);
// --- 3.13, 3.14 neutralisation ---
eq('HCl+NaOH', [[1, 'HCl', 'aq'], [1, 'NaOH', 'aq']], [[1, 'NaCl', 'aq'], [1, 'H2O', 'l']]);
eq('HCl+NaOH split', [[1, 'H^+', 'aq'], [1, 'Cl^-', 'aq'], [1, 'Na^+', 'aq'], [1, 'OH^-', 'aq']], [[1, 'Na^+', 'aq'], [1, 'Cl^-', 'aq'], [1, 'H2O', 'l']]);
eq('H+OH', [[1, 'H^+', 'aq'], [1, 'OH^-', 'aq']], [[1, 'H2O', 'l']]);
eq('H2SO4+KOH', [[1, 'H2SO4', 'aq'], [2, 'KOH', 'aq']], [[1, 'K2SO4', 'aq'], [2, 'H2O', 'l']]);
// --- 3.6 CP ---
eq('CaOH2+HCl', [[1, 'Ca(OH)2', 's'], [2, 'HCl', 'aq']], [[1, 'CaCl2', 'aq'], [2, 'H2O', 'l']]);
eq('CaO+HCl', [[1, 'CaO', 's'], [2, 'HCl', 'aq']], [[1, 'CaCl2', 'aq'], [1, 'H2O', 'l']]);
eq('CaOH2 ionic', [[1, 'Ca(OH)2', 's'], [2, 'H^+', 'aq']], [[1, 'Ca^2+', 'aq'], [2, 'H2O', 'l']]);
// --- 0.4 ionic equations: method example and worked examples ---
eq('Na2CO3+HCl', [[1, 'Na2CO3', 'aq'], [2, 'HCl', 'aq']], [[2, 'NaCl', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('Na2CO3 split', [[2, 'Na^+', 'aq'], [1, 'CO3^2-', 'aq'], [2, 'H^+', 'aq'], [2, 'Cl^-', 'aq']], [[2, 'Na^+', 'aq'], [2, 'Cl^-', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('CO3+H', [[1, 'CO3^2-', 'aq'], [2, 'H^+', 'aq']], [[1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('Mg+HCl split', [[1, 'Mg', 's'], [2, 'H^+', 'aq'], [2, 'Cl^-', 'aq']], [[1, 'Mg^2+', 'aq'], [2, 'Cl^-', 'aq'], [1, 'H2', 'g']]);
eq('Mg+H ionic', [[1, 'Mg', 's'], [2, 'H^+', 'aq']], [[1, 'Mg^2+', 'aq'], [1, 'H2', 'g']]);
eq('CuO split', [[1, 'CuO', 's'], [2, 'H^+', 'aq'], [1, 'SO4^2-', 'aq']], [[1, 'Cu^2+', 'aq'], [1, 'SO4^2-', 'aq'], [1, 'H2O', 'l']]);
eq('CuO ionic', [[1, 'CuO', 's'], [2, 'H^+', 'aq']], [[1, 'Cu^2+', 'aq'], [1, 'H2O', 'l']]);
eq('KOH+HNO3', [[1, 'KOH', 'aq'], [1, 'HNO3', 'aq']], [[1, 'KNO3', 'aq'], [1, 'H2O', 'l']]);
eq('KOH split', [[1, 'K^+', 'aq'], [1, 'OH^-', 'aq'], [1, 'H^+', 'aq'], [1, 'NO3^-', 'aq']], [[1, 'K^+', 'aq'], [1, 'NO3^-', 'aq'], [1, 'H2O', 'l']]);
eq('CaCO3 ionic', [[1, 'CaCO3', 's'], [2, 'H^+', 'aq']], [[1, 'Ca^2+', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('MgO+HCl', [[1, 'MgO', 's'], [2, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2O', 'l']]);
eq('MgO ionic', [[1, 'MgO', 's'], [2, 'H^+', 'aq']], [[1, 'Mg^2+', 'aq'], [1, 'H2O', 'l']]);
eq('Zn+H2SO4', [[1, 'Zn', 's'], [1, 'H2SO4', 'aq']], [[1, 'ZnSO4', 'aq'], [1, 'H2', 'g']]);
eq('Zn ionic', [[1, 'Zn', 's'], [2, 'H^+', 'aq']], [[1, 'Zn^2+', 'aq'], [1, 'H2', 'g']]);
eq('Zn+HCl', [[1, 'Zn', 's'], [2, 'HCl', 'aq']], [[1, 'ZnCl2', 'aq'], [1, 'H2', 'g']]);
eq('K2CO3+HNO3', [[1, 'K2CO3', 'aq'], [2, 'HNO3', 'aq']], [[2, 'KNO3', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
// --- 3.15–3.18 soluble salts ---
eq('hydrate', [[1, 'CuSO4', 'aq'], [5, 'H2O', 'l']], [[1, 'CuSO4.5H2O', 's']]);
eq('dehydrate', [[1, 'CuSO4.5H2O', 's']], [[1, 'CuSO4', 's'], [5, 'H2O', 'g']]);
eq('NaOH+HCl titr', [[1, 'NaOH', 'aq'], [1, 'HCl', 'aq']], [[1, 'NaCl', 'aq'], [1, 'H2O', 'l']]);
// --- 3.19–3.21 precipitation ---
eq('AgNO3+NaCl', [[1, 'AgNO3', 'aq'], [1, 'NaCl', 'aq']], [[1, 'AgCl', 's'], [1, 'NaNO3', 'aq']]);
eq('AgNO3 split', [[1, 'Ag^+', 'aq'], [1, 'NO3^-', 'aq'], [1, 'Na^+', 'aq'], [1, 'Cl^-', 'aq']], [[1, 'AgCl', 's'], [1, 'Na^+', 'aq'], [1, 'NO3^-', 'aq']]);
eq('Ag+Cl', [[1, 'Ag^+', 'aq'], [1, 'Cl^-', 'aq']], [[1, 'AgCl', 's']]);
eq('BaCl2+Na2SO4', [[1, 'BaCl2', 'aq'], [1, 'Na2SO4', 'aq']], [[1, 'BaSO4', 's'], [2, 'NaCl', 'aq']]);
eq('BaCl2 split', [[1, 'Ba^2+', 'aq'], [2, 'Cl^-', 'aq'], [2, 'Na^+', 'aq'], [1, 'SO4^2-', 'aq']], [[1, 'BaSO4', 's'], [2, 'Na^+', 'aq'], [2, 'Cl^-', 'aq']]);
eq('Ba+SO4', [[1, 'Ba^2+', 'aq'], [1, 'SO4^2-', 'aq']], [[1, 'BaSO4', 's']]);
eq('CuSO4+NaOH', [[1, 'CuSO4', 'aq'], [2, 'NaOH', 'aq']], [[1, 'Cu(OH)2', 's'], [1, 'Na2SO4', 'aq']]);
eq('Cu+OH', [[1, 'Cu^2+', 'aq'], [2, 'OH^-', 'aq']], [[1, 'Cu(OH)2', 's']]);
eq('CuCl2+NaOH', [[1, 'CuCl2', 'aq'], [2, 'NaOH', 'aq']], [[1, 'Cu(OH)2', 's'], [2, 'NaCl', 'aq']]);
eq('CaCl2+Na2CO3', [[1, 'CaCl2', 'aq'], [1, 'Na2CO3', 'aq']], [[1, 'CaCO3', 's'], [2, 'NaCl', 'aq']]);
eq('Ca+CO3', [[1, 'Ca^2+', 'aq'], [1, 'CO3^2-', 'aq']], [[1, 'CaCO3', 's']]);
eq('Pb(NO3)2+Na2SO4', [[1, 'Pb(NO3)2', 'aq'], [1, 'Na2SO4', 'aq']], [[1, 'PbSO4', 's'], [2, 'NaNO3', 'aq']]);
eq('Pb+SO4', [[1, 'Pb^2+', 'aq'], [1, 'SO4^2-', 'aq']], [[1, 'PbSO4', 's']]);
eq('Ba(NO3)2+K2SO4', [[1, 'Ba(NO3)2', 'aq'], [1, 'K2SO4', 'aq']], [[1, 'BaSO4', 's'], [2, 'KNO3', 'aq']]);
// --- 3.22–3.31 electrolysis: half equations (electrons have no state symbol) ---
eq('Pb2+ cathode', [[1, 'Pb^2+', 'l'], [2, 'e-']], [[1, 'Pb', 'l']]);
eq('Br- anode', [[2, 'Br^-', 'l']], [[1, 'Br2', 'g'], [2, 'e-']]);
eq('PbBr2 overall', [[1, 'PbBr2', 'l']], [[1, 'Pb', 'l'], [1, 'Br2', 'g']]);
eq('Cu2+ cathode', [[1, 'Cu^2+', 'aq'], [2, 'e-']], [[1, 'Cu', 's']]);
eq('Cl- anode', [[2, 'Cl^-', 'aq']], [[1, 'Cl2', 'g'], [2, 'e-']]);
eq('CuCl2 overall', [[1, 'CuCl2', 'aq']], [[1, 'Cu', 's'], [1, 'Cl2', 'g']]);
eq('H+ cathode', [[2, 'H^+', 'aq'], [2, 'e-']], [[1, 'H2', 'g']]);
eq('OH- anode', [[4, 'OH^-', 'aq']], [[1, 'O2', 'g'], [2, 'H2O', 'l'], [4, 'e-']]);
eq('water overall', [[2, 'H2O', 'l']], [[2, 'H2', 'g'], [1, 'O2', 'g']]);
eq('NaCl(aq) overall', [[2, 'NaCl', 'aq'], [2, 'H2O', 'l']], [[2, 'NaOH', 'aq'], [1, 'H2', 'g'], [1, 'Cl2', 'g']]);
eq('Cu anode', [[1, 'Cu', 's']], [[1, 'Cu^2+', 'aq'], [2, 'e-']]);
eq('Na+ cathode', [[1, 'Na^+', 'l'], [1, 'e-']], [[1, 'Na', 'l']]);
eq('Cl- anode molten', [[2, 'Cl^-', 'l']], [[1, 'Cl2', 'g'], [2, 'e-']]);
eq('Zn2+ cathode', [[1, 'Zn^2+', 'l'], [2, 'e-']], [[1, 'Zn', 'l']]);
eq('K+ cathode', [[1, 'K^+', 'l'], [1, 'e-']], [[1, 'K', 'l']]);
eq('I- anode', [[2, 'I^-', 'l']], [[1, 'I2', 'g'], [2, 'e-']]);
eq('Al3+ cathode', [[1, 'Al^3+', 'l'], [3, 'e-']], [[1, 'Al', 'l']]);
eq('O2- anode', [[2, 'O^2-', 'l']], [[1, 'O2', 'g'], [4, 'e-']]);
eq('Br- anode molten KBr', [[2, 'Br^-', 'l']], [[1, 'Br2', 'g'], [2, 'e-']], {});
eq('Ag+ cathode', [[1, 'Ag^+', 'aq'], [1, 'e-']], [[1, 'Ag', 's']]);
// redox from half equations (3.28): Mg + Cu2+
eq('Mg ox', [[1, 'Mg', 's']], [[1, 'Mg^2+', 'aq'], [2, 'e-']]);
eq('Mg+Cu2+', [[1, 'Mg', 's'], [1, 'Cu^2+', 'aq']], [[1, 'Mg^2+', 'aq'], [1, 'Cu', 's']]);
eq('Mg+CuSO4', [[1, 'Mg', 's'], [1, 'CuSO4', 'aq']], [[1, 'MgSO4', 'aq'], [1, 'Cu', 's']]);
eq('Zn+Cu2+', [[1, 'Zn', 's'], [1, 'Cu^2+', 'aq']], [[1, 'Zn^2+', 'aq'], [1, 'Cu', 's']]);
// electrons: half equations combine only when electrons cancel
calc('Mg + Cu2+: electrons lost by Mg = gained by Cu2+', 2, 2);
calc('water: 4 e⁻ release 1 O₂ and make 2 H₂ (ratio H₂:O₂)', (4 / 2) / (4 / 4), 2);
calc('Al: 4 Al³⁺ need 12 e⁻ = 3 O₂ from 6 O²⁻', 4 * 3, 6 * 2);

// ======================= CALCULATIONS (asserted) =======================
const AR = { H: 1, C: 12, O: 16, Na: 23, S: 32, Cl: 35.5, Ca: 40, Cu: 63.5 };
const Mr = f => Object.entries(parseF(f).atoms).reduce((a, [k, v]) => { assert(AR[k], 'no Ar ' + k); return a + AR[k] * v; }, 0);
calc('Mr Ca(OH)2', Mr('Ca(OH)2'), 74);
calc('Mr CaO', Mr('CaO'), 56);
calc('Mr CuSO4.5H2O', Mr('CuSO4.5H2O'), 249.5);
calc('Mr CuO', Mr('CuO'), 79.5);
calc('Mr CaCO3 (starter)', Mr('CaCO3'), 100);
// --- pH ---
const pH = h => -Math.log10(h);
[1, 2, 3, 4, 5, 6].forEach(p => calc(`ladder pH ${p}`, pH(Math.pow(10, -p)), p, 1e-9));
calc('pH 2 → pH 5: [H+] ratio', Math.pow(10, 5 - 2), 1000, 1e-6);
calc('dilute 10 cm³ of pH 1 to 100 cm³ → pH', pH(0.1 * 10 / 100), 2, 1e-9);
calc('QC pH 3 → pH 1: ratio', Math.pow(10, 3 - 1), 100, 1e-9);
calc('R2 pH 1 → pH 3: ratio', Math.pow(10, 3 - 1), 100, 1e-9);
calc('HW pH 2 → pH 4: [H+] ÷', Math.pow(10, 4 - 2), 100, 1e-9);
// strong vs weak at 0.10 mol/dm³ (ethanoic acid Ka = 1.74 × 10⁻⁵, data-book value)
const KA = 1.74e-5, hWeak = (-KA + Math.sqrt(KA * KA + 4 * KA * 0.10)) / 2;
calc('weak acid pH 0.10 mol/dm³ (2 s.f.)', sf(pH(hWeak), 2), 2.9, 1e-12);
calc('weak acid % ionised (2 s.f.)', sf(hWeak / 0.10 * 100, 2), 1.3, 1e-12);
calc('strong acid pH 0.10 mol/dm³', pH(0.10), 1, 1e-12);
// --- CP 3.6: Ca(OH)2 into 50.0 cm³ of 0.40 mol/dm³ HCl ---
const V_HCL = 0.0500, C_HCL = 0.40, nH = calc('CP3.6 mol H+ = 0.40 × 0.0500', C_HCL * V_HCL, 0.020, 1e-12);
const mEnd = calc('CP3.6 end point mass Ca(OH)2 = 0.020/2 × 74', nH / 2 * 74, 0.74, 1e-9);
const OH_SAT = 0.040; // mol/dm³ OH⁻ in saturated Ca(OH)₂ (≈0.02 mol/dm³ Ca(OH)₂): pH levels off near 12.6
function cpPH(m) {
  const ex = nH - 2 * m / 74;
  if (ex > 1e-9) return pH(ex / V_HCL);
  if (ex < -1e-9) return 14 + Math.log10(Math.min(-ex / V_HCL, OH_SAT));
  return 7;
}
const CPM = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2];
const CPPH = [0.4, 0.5, 0.5, 0.6, 0.7, 0.9, 1.1, 1.7, 12.5, 12.6, 12.6, 12.6, 12.6];
CPM.forEach((m, i) => calc(`CP3.6 pH at ${m} g (1 d.p.)`, Math.round(cpPH(m) * 10) / 10 + 0, CPPH[i], 1e-9));
calc('CP3.6 pH at end point', cpPH(mEnd), 7, 1e-6);
// --- CP 3.17 copper sulfate ---
const nAcid = calc('CP3.17 mol H2SO4 = 1.0 × 25/1000', 1.0 * 25 / 1000, 0.025, 1e-12);
const mTheo = calc('CP3.17 theoretical mass CuSO4·5H2O', nAcid * Mr('CuSO4.5H2O'), 6.2375, 1e-9);
calc('CP3.17 theoretical 2 s.f.', sf(mTheo, 2), 6.2, 1e-12);
calc('CP3.17 min CuO needed', nAcid * Mr('CuO'), 1.9875, 1e-9);
const basinE = 52.36, basinC = 56.46;
const mCry = calc('CP3.17 mass crystals 56.46 − 52.36', Math.round((basinC - basinE) * 100) / 100, 4.10, 1e-9);
calc('CP3.17 % yield 4.10/6.2 × 100 (2 s.f.)', sf(mCry / 6.2 * 100, 2), 66, 1e-9);
// --- titration ---
const TIT = [[0.00, 23.10], [0.50, 22.95], [1.20, 23.55], [0.30, 22.70]];
const TITRE = TIT.map(([a, b]) => Math.round((b - a) * 100) / 100);
assert.deepStrictEqual(TITRE, [23.10, 22.45, 22.35, 22.40]);
const conc = TITRE.slice(1);
assert(Math.max(...conc) - Math.min(...conc) <= 0.10 + 1e-9, 'concordant within 0.10 cm³');
const meanT = calc('mean concordant titre', Math.round(conc.reduce((a, b) => a + b, 0) / 3 * 100) / 100, 22.40, 1e-9);
const nHCl = calc('n(HCl) = 0.100 × 22.40/1000', 0.100 * meanT / 1000, 0.00224, 1e-12);
calc('c(NaOH) = 0.00224/0.0250', nHCl / 0.0250, 0.0896, 1e-9);
calc('R4 c(KOH) = 0.150 × 20.00/25.0', 0.150 * 20.00 / 25.0, 0.120, 1e-12);
calc('R4 mean of 24.15, 24.25 (concordant)', (24.15 + 24.25) / 2, 24.20, 1e-9);
// --- CP 3.31 copper electrodes: model data, 10 min (Faraday used only to make realistic numbers) ---
const FAR = 96500, tCP = 10 * 60;
const CUI = [0.2, 0.4, 0.6, 0.8, 1.0];
const mDep = I => I * tCP * 63.5 / (2 * FAR);
const r2 = v => Math.round(v * 100) / 100;
const CUGAIN = [0.04, 0.08, 0.12, 0.16, 0.20], CULOSS = [0.04, 0.09, 0.13, 0.17, 0.21];
CUI.forEach((I, i) => { calc(`CP3.31 cathode gain at ${I} A`, r2(mDep(I)), CUGAIN[i], 1e-9); calc(`CP3.31 anode loss at ${I} A`, r2(mDep(I) * 1.05 + 0.003), CULOSS[i], 1e-9); });
calc('R7 read-off at 0.5 A', r2(mDep(0.5)), 0.10, 1e-9);
calc('FQ CP3.31 mass change 41.62 − 41.35', r2(41.62 - 41.35), 0.27, 1e-9);
// --- solubility rules (3.19) as a function, checked against known cases ---
function soluble(cat, an) {
  if (['Na', 'K', 'NH4'].includes(cat)) return true;
  if (an === 'NO3') return true;
  if (an === 'Cl') return !['Ag', 'Pb'].includes(cat);
  if (an === 'SO4') return !['Pb', 'Ba', 'Ca'].includes(cat);
  if (an === 'CO3' || an === 'OH') return false;
  throw new Error('anion ' + an);
}
assert.strictEqual(soluble('Ag', 'Cl'), false); assert.strictEqual(soluble('Ba', 'SO4'), false); assert.strictEqual(soluble('Cu', 'SO4'), true);
assert.strictEqual(soluble('K', 'CO3'), true); assert.strictEqual(soluble('Cu', 'OH'), false); assert.strictEqual(soluble('Pb', 'NO3'), true);
assert.strictEqual(soluble('Na', 'NO3') && soluble('K', 'Cl'), true, 'HW: no precipitate from NaCl + KNO3');
// starter
calc('starter Mr CaCO3 = 40 + 12 + 3 × 16', 40 + 12 + 3 * 16, 100);

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
function eqRuns(key, strike = [], o = {}) {
  const d = EQ[key + '_d'];
  const runs = [];
  const add = (t, extra = {}) => runs.push({ text: t, options: Object.assign({ fontFace: 'Calibri', fontSize: o.size || 12.5, bold: true, color: C.ink }, extra) });
  const terms = (list, sideName) => list.forEach((t, i) => {
    if (i) add(' + ');
    const isS = strike.includes(`${sideName}${i}`);
    add(termStr(t), isS ? { color: C.red, strike: 'sngStrike' } : {});
  });
  terms(d.lhs, 'L'); add(' → '); terms(d.rhs, 'R');
  return runs;
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Chemical changes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} (+ 0.4 ionic equations) • Core Practicals 3.6, 3.17, 3.31` },
    { icon: 'H', text: 'Higher & Foundation in one deck • ionic and half equations taught in depth (HT)' },
    { icon: '3', text: `Topic 3 • ${DECK.paper} • every equation checked for atoms and charges` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 3 Chemical changes (Paper 1). Higher-only statements (HT pill): 3.5 (pH factor of ten), 3.8 (strong and weak acids), 3.27 (half equations), 3.28 (oxidation and reduction as electron loss and gain) and Topic 0 statement 0.4 (write balanced ionic equations), which is assessed in every topic. Chemistry-only: no Topic 3 statement carries a C suffix in our check (Topic 3 is shared with Combined Science 1SC0); the titration Core Practical and calculation (5.9C, 5.10C) are chemistry only and are linked on the titration slides. Core Practicals: 3.6, 3.17, 3.31. See SPEC_T3.md for sources and confidence.\nIonic and half equations are a thread through the whole deck: dedicated method slides (ionic: slide 15; half equations: slide 31) plus practice in every recap, the full question and the homework.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '3.1–3.4', text: 'Explain acids and alkalis as sources of **H⁺** and **OH⁻** ions; use the **pH scale** and **indicators**.' },
  { code: '3.5, 3.7–3.8', text: 'Explain the **factor of ten** in pH, **dilute vs concentrated** and **strong vs weak** acids.', ht: true },
  { code: '3.6 CP', text: '**Core Practical:** follow the pH change when calcium hydroxide is added to hydrochloric acid.' },
  { code: '3.9–3.14', text: 'Describe **bases, alkalis and salts**, reactions of acids, **gas tests** and **neutralisation**.' },
  { code: '0.4', text: 'Write **balanced ionic equations** with state symbols, cancelling **spectator ions**.', ht: true },
  { code: '3.15–3.21', text: 'Make **soluble salts** (CP 3.17, titration) and **insoluble salts** using the **solubility rules**.' },
  { code: '3.22–3.26', text: 'Explain **electrolysis** of molten and aqueous ionic compounds; predict the products.' },
  { code: '3.27–3.31', text: 'Write **half equations**; explain **oxidation and reduction**; purify copper (**CP 3.31**).', ht: true },
], { subtitle: `Specification ${DECK.specRange} and 0.4 • by the end of this topic you can…`, notes: 'HT pill = the group contains a Higher-only (bold H) statement: 3.5, 3.8, 0.4, 3.27, 3.28. Foundation students still learn the word equations, observations, products of electrolysis, OIL RIG at the level of 3.29 (reduction at the cathode, oxidation at the anode) and all three Core Practicals.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 3 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['3.1–3.8', 'Acids, alkalis, pH, strong and weak acids', 'BOTH COURSES', C.blue],
    ['3.6', 'Core Practical: pH change with Ca(OH)₂', 'CORE PRACTICAL', C.orange],
    ['3.9–3.14, 0.4', 'Bases, salts, neutralisation, ionic equations', 'BOTH COURSES', C.blue],
    ['3.15–3.18', 'Soluble salts; CP 3.17 copper sulfate; titration', 'CORE PRACTICAL', C.orange],
    ['3.19–3.21', 'Solubility rules, precipitates, insoluble salts', 'BOTH COURSES', C.blue],
    ['3.22–3.29', 'Electrolysis, half equations, redox', 'BOTH COURSES', C.blue],
    ['3.30–3.31', 'Copper purification; CP 3.31 electrolysis', 'CORE PRACTICAL', C.orange],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 3\nChemical changes', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'CORE PRACTICAL' ? C.cream : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 ions, formulae, equations • Next: Topic 4 reactivity and redox', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1CH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–5.',
      '**Topic 3 has no chemistry-only (C) statements:** Combined Science 1SC0 Paper 3 tests the same content.',
      'Ionic equations (**0.4**) and half equations (**3.27**) are **Higher only** and appear on every Higher paper.',
      'Three Core Practicals: **3.6, 3.17, 3.31**.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**HT** pill: pH factor of ten, strong/weak acids, ionic equations, half equations, redox as electrons.',
      '**CHEMISTRY ONLY** pill: only the titration calculation (a link to Topic 5, 5.9C/5.10C).',
      'Every equation in the deck is checked for **atoms and charges**.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Chemistry-only statements in Topic 3: none found (medium confidence; 3.18 titration-to-make-a-salt is treated as both courses, UNVERIFIED). The titration Core Practical (5.9C) and titration calculations (5.10C) sit in Topic 5 Separate chemistry 1 and are chemistry only; this deck links to them on slide 22.\nHigher-only: 3.5, 3.8, 3.27, 3.28 and 0.4 (Topic 0). Check the bold H markers against the Pearson spec PDF (see SPEC_T3.md).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • ions', q: 'Write the formulae of the **sulfate**, **nitrate**, **hydroxide** and **carbonate** ions.' },
  { from: 'Topic 1 • ionic bonding', q: 'What happens to the **electrons** when sodium reacts with chlorine to form sodium chloride?' },
  { from: 'Topic 1 • ionic compounds', q: 'Explain why sodium chloride conducts electricity when **molten** but not when **solid**.' },
  { from: 'Topic 0 • equations', q: 'Balance:  Mg + O₂ → MgO' },
  { from: 'Topic 0 • state symbols', q: 'What do the state symbols **(s)**, **(l)**, **(g)** and **(aq)** mean?' },
  { from: 'Topic 1 • formula mass', q: 'Calculate the relative formula mass of **CaCO₃** (Ca = 40, C = 12, O = 16).' },
], { subtitle: 'Recall from Topics 0 and 1 • 6 minutes • no notes', notes: 'ANSWERS\n1. SO₄²⁻, NO₃⁻, OH⁻, CO₃²⁻ (all four for the mark).\n2. Each sodium atom loses (transfers) one electron to a chlorine atom; Na⁺ and Cl⁻ ions form (full outer shells), held by electrostatic attraction.\n3. Molten: the ions are free to move and carry charge; solid: the ions are held in fixed positions in the lattice.\n4. 2Mg + O₂ → 2MgO.\n5. solid, liquid, gas, aqueous (dissolved in water).\n6. 40 + 12 + 3 × 16 = 100.\nThese are exactly the skills the ionic-equation and half-equation slides need: ion formulae, charges and state symbols.' }), 'Retrieval starter');

// ======================= 5 ACIDS AND ALKALIS AS IONS =======================
reg(D.contentSlide({
  title: 'Acids and alkalis are sources of ions',
  subtitle: 'Specification 3.1 • acids release H⁺(aq); alkalis release OH⁻(aq)',
  tag: '3.1', caption: 'particles in solution; water molecules shown in red and white',
  draw: (s, p) => {
    [[0.85, ACIDC, '**Hydrochloric acid**, HCl(aq)', ['H⁺', 'Cl⁻']], [3.75, 'DCE8F7', '**Sodium hydroxide** solution, NaOH(aq)', ['Na⁺', 'OH⁻']]].forEach(([x, liq, t, ions]) => {
      label(s, x - 0.2, 1.45, 2.85, t, { size: 11, h: 0.5 });
      beaker(s, x, 2.05, 2.45, 2.5, 0.85, liq);
      const xs = [0.38, 0.95, 1.52, 2.08], ys = [2.8, 3.42, 4.04];
      ys.forEach((y, r) => xs.forEach((dx, c) => {
        if ((r + c) % 3 === 2) water(s, x + dx, y - 0.05, 0.09);
        else ion(s, x + dx, y, ions[(r + c) % 3 === 0 ? 0 : 1], 0.18);
      }));
    });
    eqn(s, 0.65, 4.78, 2.85, EQ.HCl, { size: 11 });
    eqn(s, 3.55, 4.78, 2.85, EQ.NaOH, { size: 11 });
    label(s, 0.65, 5.3, 5.75, 'They **dissociate**: the compound splits up into ions when it dissolves in water.', { size: 10.5, italic: true, h: 0.45 });
  },
  head: 'What makes a solution acidic or alkaline?',
  lines: [
    'An **acid** in solution is a source of **hydrogen ions, H⁺(aq)**.',
    'An **alkali** in solution is a source of **hydroxide ions, OH⁻(aq)**.',
    'The **other ion** (Cl⁻, SO₄²⁻, NO₃⁻, Na⁺, K⁺…) decides which **salt** is made later.',
    'State symbol **(aq)** = dissolved in water. The ions are free to move.',
  ],
  worked: { head: 'Writing the ions in solution', q: '',
    steps: [['HCl', EQ.HCl], ['H₂SO₄', EQ.H2SO4], ['HNO₃', EQ.HNO3], ['Answer', 'every acid gives H⁺(aq); every alkali gives OH⁻(aq)']], size: 11 },
  workedH: 2.25,
  qc: 'Write the ions present in nitric acid, HNO₃(aq), and in potassium hydroxide solution, KOH(aq). Which ion makes each one acidic or alkaline?',
  notes: `QUICK CHECK ANSWER: nitric acid: H⁺(aq) and NO₃⁻(aq) (1); potassium hydroxide: K⁺(aq) and OH⁻(aq) (1); H⁺ makes it acidic, OH⁻ makes it alkaline (1).\nEquations checked in node for atoms and charge: ${EQ.HCl}; ${EQ.H2SO4}; ${EQ.HNO3}; ${EQ.NaOH}.\nNote: sulfuric acid gives TWO H⁺ per formula; students often write H₂⁺ – stress the coefficient 2H⁺.`,
}), '3.1 Acids and alkalis as ions');

// ======================= 6 pH AND INDICATORS =======================
reg(D.contentSlide({
  title: 'The pH scale and indicators',
  subtitle: 'Specification 3.2–3.4 • neutral is pH 7; litmus, methyl orange, phenolphthalein',
  tag: '3.2–3.4', caption: 'universal indicator colours on the pH scale',
  draw: (s, p) => {
    label(s, 0.75, 1.38, 2.0, '← more acidic', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 2.5, 1.38, 1.5, 'neutral', { size: 10.5, bold: true, color: C.green });
    label(s, 4.25, 1.38, 2.0, 'more alkaline →', { size: 10.5, bold: true, color: '2E3192', align: 'right' });
    const cw = phStrip(s, 0.75, 1.72, 5.5, 0.5);
    [[1, 'stomach\nacid'], [3, 'vinegar'], [7, 'pure\nwater'], [10, 'soap'], [13, 'oven\ncleaner']].forEach(([v, t]) => {
      const cx = 0.75 + (v + 0.5) * cw;
      line(s, cx, 2.22, cx, 2.32, C.ink, 1);
      label(s, cx - 0.4, 2.32, 0.8, t, { size: 10, h: 0.42, valign: 'top' });
    });
    arrow(s, 3.25, 3.05, 0.8, 3.05, C.red, 2); label(s, 0.8, 2.78, 2.4, 'higher [H⁺] → lower pH', { size: 10.5, color: C.red, bold: true, h: 0.24 });
    arrow(s, 3.75, 3.05, 6.2, 3.05, '2E3192', 2); label(s, 3.8, 2.78, 2.4, 'higher [OH⁻] → higher pH', { size: 10.5, color: '2E3192', bold: true, h: 0.24 });
    const sw = (t, f, c = C.ink) => ({ text: t, options: { fill: { color: f }, color: c, bold: true, align: 'center' } });
    const rows = [[HDR('Indicator'), HDR('In acid'), HDR('In alkali')],
      [tcell('litmus', 0, { bold: true }), sw('red', 'EF9A9A'), sw('blue', '90CAF9')],
      [tcell('methyl orange', 1, { bold: true }), sw('red', 'EF9A9A'), sw('yellow', 'FFF59D')],
      [tcell('phenolphthalein', 0, { bold: true }), sw('colourless', 'FFFFFF'), sw('pink', 'F8BBD9')],
      [tcell('universal indicator', 1, { bold: true }), sw('red / orange / yellow', 'FFCC80'), sw('blue / purple', 'B39DDB')]];
    s.addTable(rows, { x: 0.75, y: 3.35, w: 5.5, colW: [1.9, 1.8, 1.8], rowH: 0.44, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Measuring acidity',
  lines: [
    'pH **7** = neutral. **Below 7** = acidic. **Above 7** = alkaline.',
    'The **higher the concentration of H⁺** ions, the **lower** the pH.',
    'The **higher the concentration of OH⁻** ions, the **higher** the pH.',
    '**Indicators** change colour: litmus, methyl orange and phenolphthalein show acid or alkali; **universal indicator** (or a **pH meter**) gives the pH number.',
  ],
  worked: { head: 'Exam technique: indicator colours', q: 'Which indicator suits a titration?',
    steps: [['Single change', 'methyl orange or phenolphthalein give one sharp colour change'], ['Not UI', 'universal indicator changes gradually through many colours'], ['Answer', 'use methyl orange or phenolphthalein for a titration']], size: 10.5 },
  workedH: 1.75,
  qc: 'Solution X turns methyl orange **red** and has pH 2. Solution Y turns phenolphthalein **pink**. Which is acidic? Which contains more OH⁻ ions than H⁺ ions?',
  notes: 'QUICK CHECK ANSWER: X is acidic (pH below 7; red in methyl orange) (1). Y is alkaline, so Y has more OH⁻ than H⁺ (1).\nSpec 3.3 names litmus, methyl orange and phenolphthalein. Methyl orange changes red → yellow at about pH 3–4.5 (orange at the end point); phenolphthalein colourless → pink at about pH 8.3–10. Universal indicator is a mixture of indicators, so it gives a range of colours.',
}), '3.2–3.4 pH scale and indicators');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 3.1–3.4 • acids, alkalis, pH and indicators', [
  { q: 'Name the ion that all acids produce in aqueous solution, and the ion that all alkalis produce.', marks: 2, ms: 'Hydrogen ion / H⁺ (1); hydroxide ion / OH⁻ (1).' },
  { q: 'Give the colour of **methyl orange** in an alkali and of **phenolphthalein** in an acid.', marks: 2, ms: 'Yellow (1); colourless (1).' },
  { q: 'Solution A has pH 3 and solution B has pH 5. Which solution has the higher concentration of hydrogen ions? Explain your answer.', marks: 2, ms: 'A (1); the lower the pH, the higher the concentration of H⁺ ions (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 FACTOR OF TEN (HT) =======================
reg(D.contentSlide({
  title: 'pH and the factor of ten',
  subtitle: 'Specification 3.5 • [H⁺] × 10 → pH falls by 1',
  tag: '3.5', ht: true, caption: 'each step down the ladder is ten times less H⁺',
  draw: (s, p) => {
    label(s, 0.8, 1.42, 0.9, '**pH**', { size: 11 });
    label(s, 1.85, 1.42, 2.4, '**[H⁺] / mol dm⁻³**', { size: 11 });
    const SUPX = ['⁻¹', '⁻²', '⁻³', '⁻⁴', '⁻⁵', '⁻⁶'];
    [1, 2, 3, 4, 5, 6].forEach((p2, i) => {
      const y = 1.78 + i * 0.66;
      box(s, 0.8, y, 0.9, 0.5, UI[p2], 'FFFFFF', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, 0.8, y, 0.9, `**${p2}**`, { size: 14, h: 0.5, color: p2 <= 1 ? C.white : C.ink });
      box(s, 1.85, y, 2.4, 0.5, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, 1.85, y, 2.4, `${Math.pow(10, -p2).toFixed(p2).replace(/0+$/, '').replace(/\.$/, '')}  =  10${SUPX[i]}`, { size: 12, h: 0.5, bold: true, color: C.ink });
      if (i < 5) { arrow(s, 4.45, y + 0.28, 4.45, y + 0.86, C.blue, 2); label(s, 4.6, y + 0.43, 1.85, '[H⁺] ÷ 10,  pH + 1', { size: 10.5, align: 'left', color: C.blue, bold: true }); }
    });
  },
  head: 'The rule',
  lines: [
    'As the **hydrogen ion concentration increases by a factor of 10**, the **pH decreases by 1**.',
    'A change of **n** pH units = a change in [H⁺] of **10ⁿ**.',
    'Diluting an acid **ten times** raises its pH by **1** (strong acid).',
  ],
  worked: { head: 'Worked example', q: 'Acid A has pH 2. Acid B has pH 5. Compare their [H⁺].',
    steps: [['Difference', '5 − 2 = 3 pH units'], ['Factor', '10³ = 1000'], ['Answer', 'A has 1000 times the H⁺ concentration of B']] },
  workedH: 1.75,
  qc: 'Acid P has pH 1 and acid Q has pH 3. How many times greater is [H⁺] in P? 10 cm³ of P is diluted to 100 cm³: what is the new pH?',
  notes: 'QUICK CHECK ANSWER: 3 − 1 = 2 units → 10² = 100 times (1). Diluting 10 times → [H⁺] ÷ 10 → pH 2 (1).\nValues checked in node: pH = −log₁₀[H⁺] for [H⁺] = 10⁻¹…10⁻⁶; 10^(5−2) = 1000; 0.1 × 10/100 = 0.01 → pH 2. Students do not need logarithms: only the factor-of-ten rule (3.5, Higher only).',
}), '3.5 pH factor of ten (HT)');

// ======================= 9 STRONG / WEAK, CONCENTRATED / DILUTE =======================
reg(D.contentSlide({
  title: 'Strong or weak? Concentrated or dilute?',
  subtitle: 'Specification 3.7 (both tiers) and 3.8 (HT) • two different ideas',
  tag: '3.7–3.8', ht: true, caption: 'HA = un-ionised weak-acid molecule (e.g. CH₃COOH); A⁻ = its anion',
  draw: (s, p) => {
    label(s, 0.95, 1.38, 2.4, '**concentrated**', { size: 11.5, color: C.ink });
    label(s, 3.7, 1.38, 2.4, '**dilute**', { size: 11.5, color: C.ink });
    const B = [[0.95, 1.75, 'strong, concentrated'], [3.7, 1.75, 'strong, dilute'], [0.95, 3.9, 'weak, concentrated'], [3.7, 3.9, 'weak, dilute']];
    B.forEach(([x, y, t], k) => {
      beaker(s, x, y, 2.4, 1.45, 0.85, k < 2 ? ACIDC : 'F2F6E6');
      label(s, x, y + 1.5, 2.4, `**${t}**`, { size: 10.5, color: k < 2 ? C.red : '4E7A35' });
      const g = (c, r) => [x + 0.38 + c * 0.55, y + 0.62 + r * 0.5];
      if (k === 0) [[0, 0, 'H⁺'], [1, 0, 'Cl⁻'], [2, 0, 'H⁺'], [3, 0, 'Cl⁻'], [0, 1, 'Cl⁻'], [1, 1, 'H⁺'], [2, 1, 'Cl⁻'], [3, 1, 'H⁺']].forEach(([c, r, t2]) => ion(s, ...g(c, r), t2, 0.15));
      if (k === 1) [[0, 0, 'H⁺'], [3, 0, 'Cl⁻'], [1, 1, 'Cl⁻'], [2, 1, 'H⁺']].forEach(([c, r, t2]) => ion(s, ...g(c, r), t2, 0.15));
      if (k === 2) { [[0, 0], [2, 0], [3, 0], [0, 1], [1, 1], [3, 1]].forEach(([c, r]) => molHA(s, ...g(c, r))); ion(s, ...g(1, 0), 'H⁺', 0.15); ion(s, ...g(2, 1), 'A⁻', 0.15); }
      if (k === 3) { molHA(s, ...g(0.5, 0)); molHA(s, ...g(2.5, 1)); }
    });
  },
  head: 'Two separate ideas',
  lines: [
    '**Concentrated / dilute** (3.7): the **amount of acid** dissolved in a given volume of solution (e.g. mol dm⁻³ or g dm⁻³).',
    '**Strong acid** (3.8, HT): **completely dissociates** into ions in water, e.g. hydrochloric, nitric, sulfuric acid.',
    '**Weak acid** (3.8, HT): only **partially dissociates**; the reaction is **reversible** (⇌), e.g. ethanoic, citric, carbonic acid.',
  ],
  worked: { head: 'Same concentration, different strength', q: 'Both acids are 0.10 mol dm⁻³.',
    steps: [['Strong', 'HCl(aq) → H⁺(aq) + Cl⁻(aq): all molecules ionise → pH 1.0'], ['Weak', `${EQ.CH3COOH}: about 1.3 % ionise → pH 2.9`], ['Answer', 'the strong acid has the higher [H⁺], so the lower pH']], size: 10.5 },
  workedH: 1.95,
  qc: 'A **dilute** solution of a **strong** acid and a **concentrated** solution of a **weak** acid can have the same pH. Explain how.',
  notes: `QUICK CHECK ANSWER: pH depends on [H⁺] (1). The strong acid ionises fully, so even a little acid gives many H⁺ ions; the weak acid ionises only partly, so a lot of acid is needed to give the same [H⁺] (1).\nNumbers checked in node: 0.10 mol dm⁻³ HCl pH 1.0; 0.10 mol dm⁻³ ethanoic acid (Ka = 1.74 × 10⁻⁵) pH 2.9, 1.3 % ionised. Equation checked: ${EQ.CH3COOH}.\nCommon error: using "strong" to mean "concentrated". In mark schemes, "strong = fully ionised/dissociated" is required; "weak = partially". 3.8 is Higher only; 3.7 is both tiers.`,
}), '3.7–3.8 Strong/weak and concentrated/dilute (HT)');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 3.5, 3.7, 3.8 • strength, concentration and pH', [
  { q: 'Explain the difference between a **strong** acid and a **weak** acid.', marks: 2, ht: true, ms: 'Strong acid is completely / fully dissociated / ionised in water (1); weak acid is only partially dissociated / ionised (1).' },
  { q: 'Explain the difference between a **concentrated** acid and a **dilute** acid.', marks: 2, ms: 'Concentrated: a large amount (mass / moles) of acid in a given volume (of water/solution) (1); dilute: a small amount of acid in the same volume (1).' },
  { q: 'The pH of an acid changes from **1** to **3** when it is diluted. Calculate the factor by which the hydrogen ion concentration has changed.', marks: 2, ht: true, ms: 'pH increased by 2 units (1); [H⁺] decreased by a factor of 10² = 100 (1).' },
], { ht: true });
reg(R2.s, 'Recap 2');

// ======================= 11 CP 3.6 METHOD =======================
reg(D.contentSlide({
  title: 'Core Practical: pH change on adding Ca(OH)₂',
  subtitle: 'Specification 3.6 • add powdered calcium hydroxide to a fixed volume of dilute hydrochloric acid',
  tag: 'CP 3.6', cp: true, caption: 'apparatus; a pH meter or universal indicator paper and a glass rod',
  draw: (s, p) => {
    line(s, 0.65, 5.2, 6.35, 5.2, '8A8F99', 2);
    beaker(s, 2.35, 3.45, 1.7, 1.75, 0.55, ACIDC);
    phMeter(s, 0.75, 1.6, 1.4, 'pH 0.4', 2.8, 2.55, 4.95);
    line(s, 3.8, 2.85, 3.45, 5.0, 'A8B4C4', 4);
    callout(s, 4.2, 3.55, 1.3, 'glass rod: stir', 3.67, 3.68);
    spatula(s, 4.85, 2.35, 3.55, 3.15, ['FFFFFF', '9AA3B0']);
    label(s, 4.3, 1.82, 2.1, '**Ca(OH)₂** powder (0.10 g each time)', { size: 10.5, h: 0.48, align: 'left' });
    // measuring cylinder
    box(s, 1.0, 3.1, 0.42, 2.1, GLASS, C.ink, { lw: 1.25 });
    box(s, 1.0, 3.9, 0.42, 1.3, ACIDC, null);
    line(s, 1.0, 3.9, 1.42, 3.9, WAT[1], 1);
    for (let k = 0; k < 8; k++) line(s, 1.0, 3.3 + k * 0.22, 1.12, 3.3 + k * 0.22, C.ink, 0.6);
    box(s, 0.85, 5.12, 0.72, 0.08, C.ink, null);
    balance(s, 4.85, 4.65, '0.10 g');
    poly(s, [[5.15, 4.42], [5.95, 4.42], [5.85, 4.53], [5.25, 4.53]], 'F4F4F4', '8A8F99', { lw: 0.75 });
    oval(s, 5.55, 4.42, 0.4, 0.1, 'FFFFFF', '9AA3B0', { lw: 0.5 });
    label(s, 0.55, 5.28, 1.35, 'measuring cylinder', { size: 10 });
    label(s, 2.3, 5.28, 1.8, '50 cm³ dilute HCl', { size: 10 });
    label(s, 4.85, 5.28, 1.35, 'balance', { size: 10 });
  },
  head: 'Method',
  lines: [
    'Measure **50 cm³** of dilute hydrochloric acid into a beaker with a **measuring cylinder**.',
    'Record the starting **pH** (pH meter, or a drop on universal indicator paper and the colour chart).',
    'Weigh **0.10 g** of calcium hydroxide powder; add it, **stir**, wait, record the pH.',
    'Repeat until about **1.2 g** in total has been added.',
    'Plot **pH (y-axis)** against **total mass added (x-axis)**.',
  ],
  worked: { head: 'Variables and safety', q: '',
    steps: [['IV', 'total mass of calcium hydroxide added (g)'], ['DV', 'pH of the mixture'], ['Control', 'volume and concentration of acid; size of each portion; stirring time'], ['Safety', 'eye protection; Ca(OH)₂ and CaO can cause serious eye damage; mop up spills']], size: 10.5 },
  workedH: 2.25,
  qc: 'Why must you **stir and wait** before reading the pH each time? Why is a pH meter better than universal indicator paper?',
  notes: `QUICK CHECK ANSWER: calcium hydroxide is only slightly soluble and reacts slowly; stirring and waiting lets it react/dissolve so the reading is steady (1). A pH meter gives a numerical reading (to 0.1 or 0.01) with no judgement of colour, so it is more precise/objective (1).\nReaction (balanced in node): ${EQ['CaOH2+HCl']}; with calcium oxide: ${EQ['CaO+HCl']}. Ionic (HT): ${EQ['CaOH2 ionic']}.\nCLEAPSS-style hazards: dilute HCl (about 0.4–1 mol dm⁻³) low hazard/irritant; calcium hydroxide IRRITANT, risk of serious eye damage; calcium oxide CORROSIVE and reacts exothermically with water – use calcium hydroxide where possible. Eye protection throughout; avoid raising dust. Calibrate the pH meter with buffer solutions first and rinse the probe with distilled water.`,
}), 'CP 3.6 Method and apparatus');

// ======================= 12 CP 3.6 RESULTS =======================
{
  const s = D.contentHeader('Core Practical: pH results and analysis', 'Specification 3.6 • sample results: 0.10 g portions of Ca(OH)₂ into 50.0 cm³ of 0.40 mol dm⁻³ HCl', { cp: true, tag: 'CP 3.6' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale (model results)');
  const G = { x: 1.45, y: 1.55, w: 4.8, h: 3.7, xmin: 0, xmax: 1.2, ymin: 0, ymax: 14, xstep: 0.2, ystep: 2, minor: 2, xlabel: 'total mass of Ca(OH)₂ added / g', ylabel: 'pH', fmt: v => v.toFixed(1), yfmt: v => String(v) };
  axes(s, G);
  line(s, px(G, 0), py(G, 7), px(G, 1.2), py(G, 7), C.green, 1, { dash: 'dash' });
  line(s, px(G, mEnd), py(G, 0), px(G, mEnd), py(G, 14), C.grey, 1, { dash: 'dash' });
  const pts = [];
  for (let i = 0; i <= 28; i++) pts.push([0.70 * i / 28, cpPH(0.70 * i / 28)]);
  for (let i = 1; i <= 40; i++) pts.push([0.70 + 0.09 * i / 40, cpPH(0.70 + 0.09 * i / 40)]);
  for (let i = 1; i <= 12; i++) pts.push([0.79 + 0.41 * i / 12, cpPH(0.79 + 0.41 * i / 12)]);
  plotLine(s, G, pts, C.blue, 2);
  points(s, G, CPM.map((m, i) => [m, CPPH[i]]), C.ink);
  label(s, px(G, 0.77), py(G, 8.4), 1.6, 'end point: 0.74 g', { size: 10.5, bold: true, color: C.grey, align: 'left' });
  label(s, px(G, 0.05), py(G, 8.4), 1.6, 'neutral, pH 7', { size: 10.5, bold: true, color: C.green, align: 'left' });
  label(s, px(G, 0.83), py(G, 11.4), 1.4, 'excess Ca(OH)₂', { size: 10.5, color: C.blue, align: 'left' });
  label(s, px(G, 0.05), py(G, 2.3), 1.6, 'excess acid', { size: 10.5, color: C.red, align: 'left' });
  const hd = ['mass / g', 'pH', 'mass / g', 'pH'].map(HDR);
  const rows = [hd];
  for (let i = 0; i < 7; i++) {
    const r = [tcell(CPM[i].toFixed(1), i, { bold: true }), tcell(CPPH[i].toFixed(1), i)];
    if (i + 7 < CPM.length) r.push(tcell(CPM[i + 7].toFixed(1), i, { bold: true }), tcell(CPPH[i + 7].toFixed(1), i)); else r.push(tcell('', i), tcell('', i));
    rows.push(r);
  }
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.52, 1.52, 1.52, 1.52], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, align: 'center', valign: 'middle', color: C.text, border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 3.82, 2.97, 2.43, 'Analysis', [
    'pH rises **slowly**: H⁺ ions are being removed but acid is still in excess.',
    '**Sudden rise** near **0.74 g**: the last H⁺ ions are neutralised.',
    'Then pH **levels off** (about 12.6): extra Ca(OH)₂ hardly dissolves.',
  ], { size: 10.5 });
  D.card(s, 9.91, 3.82, 2.97, 2.43, 'Errors and improvements', [
    'Reading taken **too soon** → pH too low; stir and wait for a steady value.',
    'Powder sticks to the spatula → mass added is uncertain; weigh by difference.',
    'Use **smaller portions** near the end point.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the graph: what mass of calcium hydroxide exactly neutralises the acid? Name the **two** substances dissolved in the beaker at 0.5 g.');
  D.notes(s, `QUICK CHECK ANSWER: about 0.74 g (accept 0.7–0.8 g) (1). At 0.5 g: calcium chloride and (unreacted) hydrochloric acid (1).\nModel (checked in node): n(H⁺) = 0.40 × 0.0500 = 0.020 mol; Ca(OH)₂ needed = 0.010 mol × 74 = 0.74 g. Before the end point pH = −log[H⁺ remaining]; afterwards pH is capped by a saturated Ca(OH)₂ solution (≈12.6). Real class results rise less sharply because the solid reacts slowly – a great discussion point.\nIonic (HT): ${EQ['CaOH2 ionic']}.`);
  reg(s, 'CP 3.6 Results, graph and analysis');
}

// ======================= 13 REACTIONS OF ACIDS =======================
reg(D.contentSlide({
  title: 'Bases, alkalis and the reactions of acids',
  subtitle: 'Specification 3.9–3.12 • acids react to make salts; tests for hydrogen and carbon dioxide',
  tag: '3.9–3.12', caption: 'four reactions of dilute acids, and the two gas tests',
  draw: (s, p) => {
    const X = [0.95, 2.35, 3.75, 5.15];
    tube(s, X[0], 1.6, 0.6, 1.75, 0.6, ACIDC); box(s, X[0] + 0.24, 2.55, 0.1, 0.65, '9AA3B0', '5A6275', { lw: 0.75 });
    bubbles(s, [[X[0] + 0.16, 2.8], [X[0] + 0.44, 2.65], [X[0] + 0.18, 2.45], [X[0] + 0.42, 2.95], [X[0] + 0.3, 2.35]]);
    tube(s, X[1], 1.6, 0.6, 1.75, 0.6, CUSO4[0]); [0.12, 0.22, 0.3, 0.38, 0.47].forEach((d, i) => ball(s, X[1] + d, 3.18 - (i % 2) * 0.05, 0.04, CUO[0], CUO[1]));
    tube(s, X[2], 1.6, 0.6, 1.75, 0.6, 'F3F3F3'); [0.15, 0.27, 0.4, 0.33, 0.2].forEach((d, i) => ball(s, X[2] + d, 3.18 - (i % 3) * 0.06, 0.04, 'FFFFFF', '9AA3B0'));
    tube(s, X[3], 1.6, 0.6, 1.75, 0.6, ACIDC); [[0.2, 3.13], [0.4, 3.12], [0.3, 2.98]].forEach(([d, y]) => ball(s, X[3] + d, y, 0.09, 'E8E4DA', '9A9080', 1));
    bubbles(s, [[X[3] + 0.12, 2.7], [X[3] + 0.45, 2.55], [X[3] + 0.25, 2.4], [X[3] + 0.4, 2.8], [X[3] + 0.18, 2.5], [X[3] + 0.32, 2.62]]);
    ['**metal**\nMg → H₂ fizz', '**metal oxide**\nCuO → blue', '**hydroxide**\nMg(OH)₂', '**carbonate**\nCaCO₃ → CO₂ fizz'].forEach((t, i) => label(s, X[i] - 0.4, 3.42, 1.4, t, { size: 10, h: 0.5, valign: 'top' }));
    line(s, 0.7, 4.05, 6.3, 4.05, C.line, 1);
    tube(s, 1.0, 4.45, 0.5, 1.25, 0, null);
    line(s, 2.35, 4.05, 1.4, 4.42, '8A5A2A', 3); s.addShape(SH.ISOSCELES_TRIANGLE, { x: 1.27, y: 4.2, w: 0.16, h: 0.24, rotate: -60, fill: { color: 'F5A742' }, line: { color: 'D9822B', width: 0.5 } });
    label(s, 1.7, 4.55, 1.6, '**H₂**: lighted splint → **squeaky pop**', { size: 10.5, h: 0.75, align: 'left', valign: 'top' });
    tube(s, 4.05, 4.45, 0.5, 1.25, 0.62, 'EDEDED', { ppt: ['FFFFFF', 'B0B0B0'] });
    wire(s, [[3.45, 4.2], [4.3, 4.2], [4.3, 5.45]], '6B7385', 2.5);
    bubbles(s, [[4.25, 5.1], [4.36, 4.95], [4.27, 4.8]], 0.03);
    label(s, 4.7, 4.55, 1.75, '**CO₂**: limewater turns **milky** (cloudy)', { size: 10.5, h: 0.75, align: 'left', valign: 'top' });
  },
  head: 'Acids make salts',
  lines: [
    'A **base** reacts with an acid to form a **salt and water only**. An **alkali** is a **soluble base**.',
    'acid + metal → salt + **hydrogen**',
    'acid + metal oxide / hydroxide → salt + **water**',
    'acid + metal carbonate → salt + water + **carbon dioxide**',
    'Salt name: **hydrochloric → chloride**, **sulfuric → sulfate**, **nitric → nitrate**.',
  ],
  worked: { head: 'Balanced equations with state symbols', q: '',
    steps: [['Metal', EQ['Mg+HCl']], ['Oxide', EQ['CuO+H2SO4']], ['Carbonate', EQ['CaCO3+HCl']], ['Limewater', EQ.limewater]], size: 10.5 },
  workedH: 2.15,
  qc: 'Name the salt formed when **zinc oxide** reacts with **nitric acid**. Describe the test for the gas made when zinc carbonate reacts with an acid.',
  notes: `QUICK CHECK ANSWER: zinc nitrate (1). Bubble the gas through limewater (calcium hydroxide solution); it turns milky/cloudy → carbon dioxide (1).\nAll equations checked in node (atoms and charges): ${EQ['Mg+HCl']}; ${EQ['CuO+H2SO4']}; ${EQ['Mg(OH)2+HNO3']}; ${EQ['CaCO3+HCl']}; limewater: ${EQ.limewater}; the "pop": ${EQ.pop}.\nThe limewater equation is a link to Topic 9 (tests) – students need only the observation for 3.12.`,
}), '3.9–3.12 Reactions of acids and gas tests');

// ======================= 14 NEUTRALISATION =======================
reg(D.contentSlide({
  title: 'Neutralisation: H⁺ + OH⁻ → H₂O',
  subtitle: 'Specification 3.13–3.14 • the H⁺ ions from the acid react with the OH⁻ ions from the alkali',
  tag: '3.13–3.14', caption: 'Na⁺ and Cl⁻ (dashed rings) do not change: they are spectator ions',
  draw: (s, p) => {
    box(s, 0.7, 1.6, 2.5, 2.45, 'FFF7F5', C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 3.8, 1.6, 2.5, 2.45, 'F5FAFF', C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.7, 1.32, 2.5, '**before**: HCl(aq) + NaOH(aq)', { size: 10.5 });
    label(s, 3.8, 1.32, 2.5, '**after**: NaCl(aq) + H₂O(l)', { size: 10.5 });
    const L = [[1.15, 2.05, 'H⁺'], [1.95, 2.0, 'Cl⁻'], [2.75, 2.1, 'Na⁺'], [1.2, 2.85, 'OH⁻'], [2.0, 2.9, 'Na⁺'], [2.8, 2.85, 'H⁺'], [1.25, 3.6, 'Cl⁻'], [2.15, 3.6, 'OH⁻']];
    L.forEach(([x, y, t]) => { ion(s, x, y, t, 0.19); if (t === 'Na⁺' || t === 'Cl⁻') ring(s, x, y, 0.19); });
    const R = [[4.25, 2.05, 'Na⁺'], [5.05, 2.0, 'Cl⁻'], [5.85, 2.1, 'Na⁺'], [4.3, 3.55, 'Cl⁻']];
    R.forEach(([x, y, t]) => { ion(s, x, y, t, 0.19); ring(s, x, y, 0.19); });
    water(s, 5.0, 2.85, 0.13); water(s, 5.4, 3.5, 0.13);
    arrow(s, 3.25, 2.82, 3.75, 2.82, C.ink, 2.5);
    eqn(s, 0.7, 4.3, 5.6, EQ['HCl+NaOH'], { size: 12 });
    eqn(s, 0.7, 4.85, 5.6, EQ['H+OH'], { size: 14, color: C.red, fill: HT_FILL, edge: C.red, h: 0.48 });
    label(s, 0.7, 5.38, 5.6, 'ionic equation: the same for **every** acid + alkali reaction', { size: 10.5, italic: true });
  },
  head: 'What neutralisation means',
  lines: [
    '**Neutralisation** is a reaction between an **acid** and a **base**.',
    'With an **alkali**, the **H⁺** ions from the acid react with the **OH⁻** ions from the alkali to form **water**.',
    'The other ions (here **Na⁺** and **Cl⁻**) are **spectator ions**: they stay in solution unchanged and make up the salt.',
  ],
  worked: { head: 'Neutralisation equations', q: '',
    steps: [['Full', EQ['HCl+NaOH']], ['Full', EQ['H2SO4+KOH']], ['Ionic', EQ['H+OH']], ['Answer', 'the spectator ions cancel; only H⁺ and OH⁻ react']], size: 10.5 },
  workedH: 2.05,
  qc: 'Potassium hydroxide solution neutralises nitric acid. Name the **spectator ions** and the **salt** formed.',
  notes: `QUICK CHECK ANSWER: spectator ions K⁺ and NO₃⁻ (1); salt = potassium nitrate (1).\nChecked in node: ${EQ['HCl+NaOH']}; split into ions: ${EQ['HCl+NaOH split']}; ionic: ${EQ['H+OH']}; ${EQ['H2SO4+KOH']}.\nThis slide sets up the ionic-equation METHOD on the next slide: write the ions, spot the ions that appear unchanged on both sides, cancel them.`,
}), '3.13–3.14 Neutralisation and spectator ions');

// ======================= helpers for ionic-equation slides =======================
eq('Pb+Cl', [[1, 'Pb^2+', 'aq'], [2, 'Cl^-', 'aq']], [[1, 'PbCl2', 's']]);
eq('Pb(NO3)2+NaCl', [[1, 'Pb(NO3)2', 'aq'], [2, 'NaCl', 'aq']], [[1, 'PbCl2', 's'], [2, 'NaNO3', 'aq']]);
function checkText(key) {
  const d = EQ[key + '_d'];
  const at = Object.keys(d.a.atoms).sort().map(k => `${k} ${d.a.atoms[k]}`).join(', ');
  return `atoms ${at} on each side; charge ${qStr(d.a.charge)} = ${qStr(d.b.charge)} ✓`;
}
// one worked ionic-equation card: numbered steps, struck spectators, red final equation
function ionicCard(s, x, y, w, h, title, fullKey, splitKey, strike, ionicKey, note) {
  box(s, x, y, w, h, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  box(s, x, y, w, 0.42, C.blue, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, x + 0.12, y, w - 0.24, title, { size: 12.5, bold: true, color: C.white, h: 0.42 });
  const runs = [];
  const head = (t, first) => runs.push({ text: t, options: { bold: true, color: C.blue, fontSize: 12, breakLine: true, paraSpaceBefore: first ? 0 : 10 } });
  const addRuns = rr => { rr.forEach(r => { r.options.fontSize = 12; runs.push(r); }); runs[runs.length - 1].options.breakLine = true; };
  head('1  Full equation', true); addRuns(eqRuns(fullKey));
  head('2  Split (aq) ionic compounds'); addRuns(eqRuns(splitKey));
  head('3  Cancel spectator ions'); addRuns(eqRuns(splitKey, strike));
  head('4  Ionic equation'); addRuns(eqRuns(ionicKey).map(r => { r.options.color = C.red; return r; }));
  head('5  Check'); runs.push({ text: checkText(ionicKey), options: { fontSize: 11.5, color: C.text, breakLine: !!note } });
  if (note) runs.push({ text: note, options: { fontSize: 11.5, italic: true, color: C.grey, paraSpaceBefore: 10 } });
  s.addText(runs, { x: x + 0.15, y: y + 0.5, w: w - 0.3, h: h - 0.58, fontFace: 'Calibri', valign: 'top', margin: 0 });
}

// ======================= 15 METHOD: IONIC EQUATIONS (HT) =======================
{
  const s = D.contentHeader('Method: writing ionic equations', 'Specification 0.4 • full equation → split into ions → cancel spectator ions → check atoms AND charges', { ht: true, tag: '0.4 method' });
  const d = EQ['CO3+H_d'];
  const steps = [
    ['Write the balanced full equation with state symbols', 'Example: sodium carbonate solution reacts with hydrochloric acid.', eqRuns('Na2CO3+HCl', [], { size: 12 })],
    ['Split every (aq) ionic compound into its ions', 'Keep solids (s), liquids (l), gases (g), water and covalent molecules (CO₂, H₂) whole.', eqRuns('Na2CO3 split', [], { size: 12 })],
    ['Cross out the ions that are identical on both sides', 'These are the spectator ions: 2Na⁺(aq) and 2Cl⁻(aq).', eqRuns('Na2CO3 split', ['L0', 'L3', 'R0', 'R1'], { size: 12 })],
    ['Write what is left, then check atoms AND charges', `C ${d.a.atoms.C} = ${d.b.atoms.C},  O ${d.a.atoms.O} = ${d.b.atoms.O},  H ${d.a.atoms.H} = ${d.b.atoms.H};   charge: (−2) + 2(+1) = ${qStr(d.a.charge)} on the left, ${qStr(d.b.charge)} on the right ✓`, eqRuns('CO3+H', [], { size: 13 }).map(r => { r.options.color = C.red; return r; })],
  ];
  steps.forEach(([t, dsc, runs], i) => {
    const y = 1.3 + i * 1.2;
    box(s, 0.45, y, 8.4, 1.1, i === 3 ? HT_FILL : C.cardBlue, i === 3 ? 'E8B4B8' : C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    badge(s, 0.8, y + 0.32, i + 1);
    label(s, 1.18, y + 0.08, 7.5, `**${t}**`, { size: 12.5, align: 'left', h: 0.3, color: C.ink });
    label(s, 1.18, y + 0.38, 7.5, dsc, { size: 10.5, italic: true, align: 'left', h: 0.26, color: C.grey });
    s.addText(runs, { x: 1.18, y: y + 0.66, w: 7.6, h: 0.38, valign: 'middle', margin: 0 });
  });
  D.card(s, 9.05, 1.3, 3.83, 2.95, 'Golden rules', [
    'Only split **aqueous ionic** compounds: acids, alkalis, soluble salts.',
    '**Never split** (s), (l), (g), H₂O or CO₂.',
    'Polyatomic ions stay whole: **SO₄²⁻, NO₃⁻, CO₃²⁻, OH⁻**.',
    'Coefficients carry over: **Na₂CO₃ → 2Na⁺ + CO₃²⁻**.',
    'Cancel **only** ions that are identical on both sides.',
  ], { size: 11 });
  D.card(s, 9.05, 4.4, 3.83, 1.6, 'Spectator ions', [
    'Ions that are in the mixture but **do not take part**: they are the same, in the same state, on both sides.',
  ], { size: 11, bullets: false });
  D.quickCheck(s, 'You try: write the ionic equation, with state symbols, for **potassium carbonate** solution reacting with **nitric acid**. Name the spectator ions.');
  D.notes(s, `QUICK CHECK ANSWER: full: ${EQ['K2CO3+HNO3']} (1); ionic: ${EQ['CO3+H']} (1); spectator ions K⁺ and NO₃⁻ (1). The ionic equation is identical to the sodium carbonate one – that is the point of ionic equations: they show only the particles that react.\nAll four lines are generated from the same data and checked in node for atoms and charges.\nTeaching tip: give students the ion "cards" (Na⁺, CO₃²⁻ …) and physically remove the spectators. Typical errors: splitting CO₂ or H₂O; writing Na₂⁺ instead of 2Na⁺; forgetting to balance charge; leaving out state symbols (mark schemes usually need states only when asked, but always practise them).`);
  reg(s, '0.4 METHOD: ionic equations (HT)');
}

// ======================= 16 IONIC EQUATIONS: WORKED EXAMPLES (HT) =======================
{
  const s = D.contentHeader('Ionic equations: three worked examples', 'Specification 0.4, 3.11, 3.14 • same method every time; solids stay whole', { ht: true, tag: '0.4 practice' });
  ionicCard(s, 0.45, 1.3, 4.0, 4.95, 'A  Metal + acid', 'Mg+HCl', 'Mg+HCl split', ['L2', 'R1'], 'Mg+H ionic', 'Mg(s) is a solid element: never split it.');
  ionicCard(s, 4.67, 1.3, 4.0, 4.95, 'B  Metal oxide + acid', 'CuO+H2SO4', 'CuO split', ['L2', 'R1'], 'CuO ionic', 'CuO(s) is insoluble: keep it whole.');
  ionicCard(s, 8.88, 1.3, 4.0, 4.95, 'C  Alkali + acid', 'KOH+HNO3', 'KOH split', ['L0', 'L3', 'R0', 'R1'], 'H+OH', 'Every acid + alkali gives H⁺ + OH⁻ → H₂O.');
  D.quickCheck(s, 'You try: **zinc** reacts with **hydrochloric acid** to form zinc chloride solution and hydrogen. Write the full and the ionic equations, with state symbols.');
  D.notes(s, `QUICK CHECK ANSWER: full: ${EQ['Zn+HCl']} (1); ionic: ${EQ['Zn ionic']} (1); spectator: Cl⁻ (1).\nEvery equation on this slide is checked in node for atoms and charge. Extension (HT): carbonate: ${EQ['CaCO3+HCl']} → ${EQ['CaCO3 ionic']} (CaCO₃ is a solid, so it stays whole; compare with Na₂CO₃(aq) on the method slide, where CO₃²⁻ is written separately).`);
  reg(s, '0.4 Ionic equations: worked examples (HT)');
}

// ======================= 17 RECAP 3 (HT) =======================
const R3 = D.recapSlide(3, 'Specification 0.4, 3.11–3.14 • ionic equations and neutralisation', [
  { q: 'Write the ionic equation, with state symbols, for the reaction between **any** acid and **any** alkali.', marks: 2, ht: true, ms: `${EQ['H+OH']}: correct species (1); state symbols (1).` },
  { q: 'Sodium hydroxide solution reacts with sulfuric acid. Name the **spectator ions** and explain why they are called spectator ions.', marks: 2, ms: 'Na⁺ and SO₄²⁻ (1); they do not take part in the reaction / are unchanged / appear the same on both sides (1).' },
  { q: 'Magnesium oxide reacts with hydrochloric acid:  ' + EQ['MgO+HCl'] + '.  Write the ionic equation and explain why magnesium oxide is **not** split into ions.', marks: 3, ht: true, ms: `${EQ['MgO ionic']}: correct species (1), balanced (1); MgO is a solid / insoluble, so its ions are not free in solution (1).` },
], { ht: true });
reg(R3.s, 'Recap 3 (ionic equations)');

// ======================= 18 SOLUBLE SALT FROM AN INSOLUBLE BASE =======================
reg(D.contentSlide({
  title: 'Soluble salts from insoluble bases',
  subtitle: 'Specification 3.15 • excess reactant added, excess removed, only salt and water left',
  tag: '3.15', caption: 'making copper sulfate solution from copper oxide and sulfuric acid',
  draw: (s, p) => {
    beaker(s, 0.8, 2.3, 1.45, 1.5, 0.62, CUSO4[0], { surface: CUSO4[1] });
    for (let i = 0; i < 9; i++) ball(s, 0.95 + i * 0.145, 3.72 - (i % 2) * 0.05, 0.05, CUO[0], CUO[1]);
    spatula(s, 2.45, 1.75, 1.75, 2.15, CUO);
    arrow(s, 2.4, 3.05, 2.85, 3.05, C.ink, 2);
    funnel(s, 3.6, 1.95, 1.0, 0.7, { residue: CUO, drip: CUSO4[0], stem: 0.4 });
    conical(s, 3.6, 3.12, 1.0, 1.0, 0.5, CUSO4[0]);
    arrow(s, 4.3, 3.05, 4.75, 3.05, C.ink, 2);
    basin(s, 5.55, 2.9, 1.25, 0.42, CUSO4[0]);
    ['**1** Add CuO to warm acid until **no more dissolves**: CuO is in **excess**', '**2** **Filter**: excess CuO stays in the filter paper', '**3** Filtrate = copper sulfate **and water only**'].forEach((t, i) => label(s, 0.6 + i * 1.95, 4.3, 1.9, t, { size: 10.5, h: 0.95, valign: 'top' }));
    eqn(s, 0.7, 5.35, 5.6, EQ['CuO+H2SO4'], { size: 12 });
  },
  head: 'Why each step?',
  lines: [
    '**a Excess** reactant is added so that **all the acid** reacts – no acid is left in the salt.',
    '**b** The **excess** is removed by **filtration** because it is insoluble.',
    '**c** The solution left contains **only the salt and water**, so pure crystals can be made from it.',
  ],
  worked: { head: 'Choosing the method', q: '',
    steps: [['Insoluble base', 'CuO, MgCO₃, Zn: add in excess, then filter (3.15)'], ['Soluble base', 'NaOH, KOH: no excess can be filtered → titration (3.16)'], ['Insoluble salt', 'mix two solutions → precipitate (3.21)'], ['Answer', 'the solubility of the reactants and the salt decides the method']], size: 10.5 },
  workedH: 2.1,
  qc: 'How can you tell when the copper oxide is in **excess**? Why does the excess not end up in the salt?',
  notes: `QUICK CHECK ANSWER: black solid remains / no more dissolves even after stirring (1); it is insoluble so it is removed by filtering (1).\nChecked in node: ${EQ['CuO+H2SO4']}. Ionic (HT): ${EQ['CuO ionic']}.`,
}), '3.15 Soluble salts from insoluble bases');

// ======================= 19 CP 3.17 METHOD =======================
reg(D.contentSlide({
  title: 'Core Practical: hydrated copper sulfate crystals',
  subtitle: 'Specification 3.17 • pure, dry hydrated copper sulfate from copper oxide, using a water bath',
  tag: 'CP 3.17', cp: true, caption: 'the four stages (apparatus not to scale)',
  draw: (s, p) => {
    const Q = [[0.6, 1.45], [3.6, 1.45], [0.6, 3.68], [3.6, 3.68]];
    Q.forEach(([x, y]) => box(s, x, y, 2.85, 2.15, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }));
    const T2 = ['warm the acid in a **water bath**; add CuO in portions', '**filter** off the excess copper oxide', 'heat in a **water bath** until crystals form at the edge', 'leave to **cool**; pat crystals **dry** with filter paper'];
    Q.forEach(([x, y], i) => { badge(s, x + 0.25, y + 0.25, i + 1, C.orange, 0.17); label(s, x + 0.48, y + 0.06, 2.3, T2[i], { size: 10, h: 0.42, align: 'left', valign: 'top' }); });
    // 1 water bath
    box(s, 0.85, 2.55, 2.35, 0.95, 'D7E9F8', '4A5568', { lw: 1.5 });
    line(s, 0.85, 2.7, 3.2, 2.7, WAT[1], 1);
    beaker(s, 1.4, 2.1, 0.9, 1.25, 0.55, ACIDC);
    line(s, 2.65, 1.98, 2.65, 3.3, 'B0B6C0', 2.5); ball(s, 2.65, 3.3, 0.05, C.red, C.red);
    label(s, 2.75, 2.0, 0.65, '50 °C', { size: 10.5, bold: true, color: C.red, align: 'left' });
    // 2 filtration
    funnel(s, 5.0, 1.98, 0.95, 0.6, { residue: CUO, drip: CUSO4[0], stem: 0.32 });
    conical(s, 5.0, 2.98, 0.95, 0.6, 0.45, CUSO4[0]);
    // 3 evaporate over water bath
    beaker(s, 1.4, 4.55, 1.2, 0.6, 0.7, WAT[0]);
    bubbles(s, [[1.6, 5.0], [1.9, 4.95], [2.3, 5.02]], 0.03);
    basin(s, 2.0, 4.5, 1.35, 0.32, CUSO4[0]);
    tripodBunsen(s, 2.0, 5.15, 5.8, { hw: 0.55 });
    // 4 crystals
    basin(s, 5.0, 4.45, 1.7, 0.55, 'CFE6F7');
    [[4.55, 4.7, 0.12], [4.85, 4.78, 0.15], [5.2, 4.72, 0.13], [5.45, 4.62, 0.1], [4.98, 4.6, 0.1]].forEach(([x, y, r]) => crystal(s, x, y, r));
    box(s, 4.15, 5.25, 1.7, 0.45, 'FFFFFF', '9AA3B0', { lw: 0.75 });
    [[4.5, 5.47], [4.9, 5.45], [5.3, 5.48]].forEach(([x, y]) => crystal(s, x, y, 0.1));
  },
  head: 'Method',
  lines: [
    'Warm **50 cm³** of dilute sulfuric acid in a **water bath** (about 50 °C).',
    'Add **copper oxide** a spatula at a time, stirring, until some stays **undissolved** (excess).',
    '**Filter** into an evaporating basin to remove the excess CuO.',
    'Heat the basin over a **boiling water bath** until crystals start to form at the edge.',
    'Leave to **cool and crystallise**; filter off and pat the blue crystals **dry**.',
  ],
  worked: { head: 'Safety (CLEAPSS-style)', q: '',
    steps: [['Hazards', 'copper oxide and copper sulfate harmful; dilute sulfuric acid irritant'], ['Heating', 'do not boil to dryness: crystals spit and lose their water'], ['Why bath', 'gentle, even heating at a controlled temperature'], ['Safety', 'eye protection; let apparatus cool before handling']], size: 10.5 },
  workedH: 2.25,
  qc: 'Why is copper oxide added **in small portions**? Why is the solution **not** heated to dryness?',
  notes: `QUICK CHECK ANSWER: to see when no more reacts (excess) without wasting a lot / to stop frothing over (1). Heating to dryness makes the crystals lose their water of crystallisation (turn white, anhydrous) and spit (1).\nChecked in node: ${EQ['CuO+H2SO4']}; crystallisation: ${EQ.hydrate}.\nVariables (preparation, not an investigation): to compare yields, control the volume and concentration of acid, the water-bath temperature and the time left to crystallise.\nCLEAPSS-style hazards: H₂SO₄ 0.5–1.0 mol dm⁻³ IRRITANT (skin, eyes); CuO HARMFUL if swallowed, hazardous to the aquatic environment; CuSO₄ HARMFUL if swallowed, causes eye and skin irritation, toxic to aquatic life – do not pour down the sink. Hot water bath and Bunsen: scald and burn risk; eye protection.`,
}), 'CP 3.17 Method and apparatus');

// ======================= 20 CP 3.17 RESULTS =======================
{
  const s = D.contentHeader('Core Practical: crystals, yield and errors', 'Specification 3.17 • sample results from 25 cm³ of 1.0 mol dm⁻³ sulfuric acid', { cp: true, tag: 'CP 3.17' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95);
  basin(s, 1.9, 2.0, 2.3, 0.75, 'CFE6F7');
  [[1.2, 2.3, 0.18], [1.6, 2.45, 0.22], [2.1, 2.35, 0.2], [2.55, 2.25, 0.15], [1.9, 2.18, 0.14]].forEach(([x, y, r]) => crystal(s, x, y, r));
  label(s, 0.7, 2.95, 2.4, '**blue** CuSO₄·5H₂O crystals', { size: 11 });
  arrow(s, 3.3, 2.35, 4.1, 2.35, C.red, 2.5); label(s, 3.15, 1.9, 1.1, 'heat too strongly', { size: 10, color: C.red, h: 0.4 });
  basin(s, 5.15, 2.0, 1.9, 0.6, 'F6F6F6');
  for (let i = 0; i < 9; i++) ball(s, 4.5 + i * 0.16, 2.22 + (i % 2) * 0.06, 0.06, 'FFFFFF', 'AAB2BE');
  label(s, 4.15, 2.95, 2.1, '**white** anhydrous CuSO₄', { size: 11 });
  eqn(s, 0.7, 3.5, 5.6, EQ.dehydrate, { size: 12 });
  label(s, 0.7, 3.95, 5.6, 'The water in the crystal is **water of crystallisation**. Too much heat drives it off, so use a water bath.', { size: 10.5, h: 0.5 });
  const rows = [[HDR('Measurement'), HDR('Value')],
    ...[['mass of empty evaporating basin', basinE.toFixed(2) + ' g'], ['mass of basin + dry crystals', basinC.toFixed(2) + ' g'], ['mass of crystals', mCry.toFixed(2) + ' g'], ['theoretical mass (from 0.025 mol acid)', '6.2 g'], ['percentage yield', '66 %']].map(([a, b], i) => [tcell(a, i), tcell(b, i, { bold: true, align: 'center' })])];
  s.addTable(rows, { x: 0.7, y: 4.5, w: 5.6, colW: [4.1, 1.5], rowH: 0.23, fontFace: 'Calibri', fontSize: 10, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 6.8, 1.3, 6.08, 2.25, 'Analysis', [
    'Mass of crystals = 56.46 − 52.36 = **4.10 g**.',
    '% yield = 4.10 ÷ 6.2 × 100 = **66 %** (percentage yield is met again in Topic 5).',
    '**Pure**: blue, well-shaped crystals; **dry**: constant mass, not sticky.',
  ], { size: 11 });
  D.card(s, 6.8, 3.7, 6.08, 2.55, 'Errors and improvements', [
    'Solution left in the filter paper / basin → **less** salt; rinse with a little water.',
    'Some CuSO₄ stays dissolved after crystallising → **lower** yield; evaporate the rest of the filtrate.',
    'Crystals still wet → mass **too high**; dry between filter papers or in a desiccator.',
    'Overheated → white anhydrous powder → mass **too low**; always use a water bath.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Give **two** reasons why the student obtained less than the theoretical 6.2 g of crystals.');
  D.notes(s, `QUICK CHECK ANSWER: any two (1 each): some solution lost when filtering/transferring; not all the copper sulfate crystallised (some left in the solution); crystals lost when drying; some crystals decomposed/overheated (lost water).\nChecked in node: 0.025 mol × Mr 249.5 = 6.24 g → 6.2 g; 4.10 g ÷ 6.2 g × 100 = 66 %. Dehydration: ${EQ.dehydrate}. Percentage yield calculations are chemistry-only Topic 5 content (link only).`);
  reg(s, 'CP 3.17 Results, yield and errors');
}

// ======================= 21 TITRATION TO MAKE A SALT =======================
reg(D.contentSlide({
  title: 'Soluble salts from alkalis: titration',
  subtitle: 'Specification 3.16 and 3.18 • burette, pipette and a suitable indicator',
  tag: '3.16, 3.18', caption: 'titration apparatus: acid in the burette, alkali + indicator in the flask',
  draw: (s, p) => {
    const R = rig(s, 0.95, 5.85, { level: 8, numbers: true, len: 2.9 });
    callout(s, 3.0, 2.0, 2.5, '**burette**: dilute acid', R.bx + 0.1, 2.3);
    callout(s, 3.0, 3.45, 2.5, 'tap: add acid **drop by drop** near the end', R.bx + 0.18, 4.5, { h: 0.45 });
    callout(s, 3.0, 4.75, 2.5, 'conical flask: **25.0 cm³** alkali + indicator', R.bx + 0.4, 5.15, { h: 0.45 });
    callout(s, 3.0, 5.35, 2.5, '**white tile**: see the colour change', R.bx + 0.6, 5.67);
    pipette(s, 5.95, 1.6, 2.3);
    label(s, 5.25, 3.95, 1.25, '**pipette**\n25.0 cm³', { size: 10.5, h: 0.45 });
  },
  head: 'Method (3.18)',
  lines: [
    'Use a **pipette** to put **25.0 cm³** of alkali into a conical flask; add a few drops of **indicator** (e.g. methyl orange).',
    'Fill the **burette** with acid; read the start volume (bottom of the **meniscus**).',
    'Add acid, swirling, then **drop by drop** until the indicator **just changes colour** (end point). Record the volume.',
    'Repeat **without indicator**, adding the same volume of acid.',
    'Evaporate some water, then leave to **crystallise**; dry the crystals.',
  ],
  worked: { head: 'Why titration? (3.16)', q: '',
    steps: [['a', 'both reactants are soluble: an excess cannot be filtered off'], ['b', 'titration finds the exact volumes that react: correct proportions'], ['c', 'the solution left is only salt and water'], ['Answer', 'repeat without indicator so it does not contaminate the salt']], size: 10.5 },
  workedH: 2.15,
  qc: 'Why is **universal indicator** not used in a titration? Why is the titration repeated **without** indicator?',
  notes: `QUICK CHECK ANSWER: UI changes colour gradually through many colours, so there is no sharp end point (1); indicator would contaminate the salt (1).\nChecked in node: ${EQ['NaOH+HCl titr']}.\n3.18 is listed in our sources for Topic 3 and treated as both courses (UNVERIFIED). The accurate-titration Core Practical (5.9C) and titration calculations (5.10C) are chemistry only – next slide.`,
}), '3.16, 3.18 Titration to make a soluble salt');

// ======================= 22 TITRATION RESULTS AND CALCULATION (HT, CHEMISTRY ONLY) =======================
{
  const s = D.contentHeader('Titration results and calculation', 'Link to Core Practical 5.9C and 5.10C (Topic 5) • concordant titres; concentration in mol dm⁻³', { ht: true, p: true, cp: true, tag: 'CP 5.9C link' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'results table and reading the burette at eye level');
  const head = [HDR(''), HDR('Rough'), HDR('1'), HDR('2'), HDR('3')];
  const conc = i => i > 0 ? { fill: { color: 'DDF0E0' }, bold: true } : {};
  const rows = [head,
    [tcell('final reading / cm³', 0, { bold: true }), ...TIT.map(([a, b], i) => tcell(b.toFixed(2), 0, { align: 'center' }))],
    [tcell('initial reading / cm³', 1, { bold: true }), ...TIT.map(([a, b], i) => tcell(a.toFixed(2), 1, { align: 'center' }))],
    [tcell('titre / cm³', 0, { bold: true }), ...TITRE.map((t, i) => tcell(t.toFixed(2), 0, Object.assign({ align: 'center' }, conc(i))))]];
  s.addTable(rows, { x: 0.65, y: 1.45, w: 5.7, colW: [1.9, 0.95, 0.95, 0.95, 0.95], rowH: 0.38, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 0.65, 3.02, 5.7, 'green = **concordant** (within 0.10 cm³ of each other) → mean = **22.40 cm³**', { size: 10.5, h: 0.3 });
  // burette close-up
  const yv = v => 3.55 + (v - 22.4) * 3.4;
  box(s, 1.3, 3.45, 0.7, 2.2, GLASS, null);
  meniscus(s, 1.3, 2.0, yv(22.7) - 0.08, yv(22.7), 5.65, ACIDC);
  line(s, 1.3, 3.45, 1.3, 5.65, C.ink, 1.5); line(s, 2.0, 3.45, 2.0, 5.65, C.ink, 1.5);
  for (let k = 0; k <= 6; k++) { const v = 22.4 + k * 0.1; line(s, 1.3, yv(v), 1.52, yv(v), C.ink, 1); label(s, 0.55, yv(v) - 0.1, 0.7, v.toFixed(1), { size: 10, h: 0.2, align: 'right' }); }
  oval(s, 3.15, yv(22.7), 0.36, 0.2, C.white, C.ink, { lw: 1.25 }); ball(s, 3.15, yv(22.7), 0.06, C.ink, C.ink);
  line(s, 2.0, yv(22.7), 2.95, yv(22.7), C.red, 1.25, { dash: 'dash' });
  label(s, 3.45, 3.75, 2.9, 'Eye **level** with the **bottom of the meniscus**. Reading: **22.70 cm³** (trial 3, final).', { size: 10.5, h: 0.75, align: 'left', valign: 'top' });
  label(s, 3.45, 4.75, 2.9, 'Record to the nearest **0.05 cm³** (two decimal places).', { size: 10.5, h: 0.5, align: 'left', valign: 'top' });
  D.card(s, 6.8, 1.3, 6.08, 1.95, 'Using the results', [
    '**Titre** = final reading − initial reading.',
    'Ignore the **rough** titre; use **concordant** titres (within 0.10 cm³).',
    'Mean = (22.45 + 22.35 + 22.40) ÷ 3 = **22.40 cm³**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 3.4, 6.08, 2.85, 'Worked example (HT, chemistry only)', '25.0 cm³ of NaOH(aq) needs 22.40 cm³ of 0.100 mol dm⁻³ HCl. Find c(NaOH).',
    [['Equation', EQ['NaOH+HCl titr'] + '   (1 : 1)'], ['Acid moles', 'n = c × V = 0.100 × 22.40/1000 = 2.24 × 10⁻³ mol'], ['Alkali moles', '1 : 1, so n(NaOH) = 2.24 × 10⁻³ mol'], ['Answer', 'c = n ÷ V = 2.24 × 10⁻³ ÷ 0.0250 = 0.0896 mol dm⁻³']], { size: 11 });
  D.quickCheck(s, 'Which titre is **not** used to calculate the mean, and why? A student reads the **top** of the meniscus every time: is this a random or a systematic error?');
  D.notes(s, 'QUICK CHECK ANSWER: the rough titre (23.10 cm³) – it is only a guide, overshot (1). Systematic error (same bias in every reading; but titres are differences so it largely cancels) (1).\nNumbers checked in node: titres 23.10, 22.45, 22.35, 22.40; concordant spread 0.10 cm³; mean 22.40 cm³; n(HCl) = 0.00224 mol; c(NaOH) = 0.0896 mol dm⁻³.\nSPEC NOTE: Edexcel places the accurate titration Core Practical (5.9C) and titration calculations (5.10C; mol dm⁻³ Higher) in Topic 5 Separate chemistry 1, which is CHEMISTRY ONLY. It is taught here because it uses the same apparatus as 3.18. Combined Science (1SC0) classes skip this slide.\nCLEAPSS-style hazards: 0.1 mol dm⁻³ HCl and NaOH low hazard / irritant to eyes; methyl orange is toxic if swallowed (small amounts); fill the burette below eye level using a funnel, then remove the funnel; pipette filler always.');
  reg(s, 'Titration results and calculation (HT, CHEMISTRY ONLY, CP 5.9C link)');
}

// ======================= 23 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 3.15–3.18 and CP 3.17 • making soluble salts', [
  { q: 'Copper oxide is added to warm sulfuric acid until it is in **excess**. Explain why an excess is used and how the excess is removed.', marks: 2, ms: 'So that all the acid reacts / no acid left in the salt (1); filter (it is insoluble) (1).' },
  { q: 'Explain why the copper sulfate solution is heated in a **water bath** and **not** evaporated to dryness.', marks: 2, ms: 'Water bath gives gentle / controlled heating (1); heating to dryness would remove the water of crystallisation / form anhydrous (white) copper sulfate / crystals spit (1).' },
  { q: 'Titres: 24.70 cm³ (rough), 24.15 cm³, 24.25 cm³, 24.60 cm³. Identify the **concordant** titres and calculate the mean titre.', marks: 2, ms: '24.15 and 24.25 (within 0.10 cm³) (1); mean = 24.20 cm³ (1).' },
  { q: '25.0 cm³ of potassium hydroxide solution is neutralised by 20.00 cm³ of 0.150 mol dm⁻³ nitric acid. Calculate the concentration of the potassium hydroxide (chemistry only).', marks: 3, ht: true, ms: 'n(HNO₃) = 0.150 × 20.00/1000 = 3.00 × 10⁻³ mol (1); 1 : 1 so n(KOH) = 3.00 × 10⁻³ mol (1); c = 3.00 × 10⁻³ ÷ 0.0250 = 0.120 mol dm⁻³ (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 24 SOLUBILITY RULES =======================
{
  const CATS = [['Na⁺', 'Na'], ['K⁺', 'K'], ['NH₄⁺', 'NH4'], ['Ca²⁺', 'Ca'], ['Ba²⁺', 'Ba'], ['Pb²⁺', 'Pb'], ['Ag⁺', 'Ag'], ['Cu²⁺', 'Cu']];
  const ANS = [['NO₃⁻', 'NO3'], ['Cl⁻', 'Cl'], ['SO₄²⁻', 'SO4'], ['CO₃²⁻', 'CO3'], ['OH⁻', 'OH']];
  reg(D.contentSlide({
    title: 'Solubility rules',
    subtitle: 'Specification 3.19 • which salts, carbonates and hydroxides dissolve in water?',
    tag: '3.19', caption: 'green = soluble; orange = insoluble (forms a precipitate)',
    draw: (s, p) => {
      const rows = [[HDR('ion'), ...ANS.map(a => HDR(a[0]))]];
      CATS.forEach(([c, ck], i) => rows.push([tcell(c, i, { bold: true, align: 'center' }), ...ANS.map(([a, ak]) => {
        const ok = soluble(ck, ak);
        return { text: ok ? 'soluble' : 'insoluble', options: { fill: { color: ok ? 'D8EFD9' : 'F9D5B5' }, color: ok ? '1E6B40' : '9A4A0A', bold: !ok, align: 'center' } };
      })]));
      s.addTable(rows, { x: 0.65, y: 1.45, w: 5.7, colW: [1.0, 0.94, 0.94, 0.94, 0.94, 0.94], rowH: 0.47, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: 'FFFFFF', pt: 1.5 } });
      label(s, 0.65, 5.75 - 0.05, 5.7, 'Calcium hydroxide is only **slightly** soluble (limewater is a dilute solution).', { size: 10, italic: true, color: C.grey, h: 0.22 });
    },
    head: 'The rules (learn these)',
    lines: [
      '**a** All common **sodium, potassium and ammonium** salts are **soluble**.',
      '**b** All **nitrates** are **soluble**.',
      '**c** Common **chlorides** are soluble **except silver and lead**.',
      '**d** Common **sulfates** are soluble **except lead, barium and calcium**.',
      '**e** Common **carbonates and hydroxides** are **insoluble** except sodium, potassium and ammonium.',
    ],
    worked: { head: 'Predicting a precipitate (3.20)', q: 'Swap partners, then check each new compound.',
      steps: [['AgNO₃ + NaCl', 'AgCl is insoluble → white precipitate'], ['CuSO₄ + NaOH', 'Cu(OH)₂ is insoluble → blue precipitate'], ['NaCl + KNO₃', 'NaNO₃ and KCl both soluble → no precipitate'], ['Answer', 'a precipitate forms only if a product is insoluble']], size: 10.5 },
    workedH: 2.2, size: 11,
    qc: 'Will a precipitate form when **barium chloride** solution is mixed with **sodium sulfate** solution? Name it. What about **lead nitrate** and **sodium nitrate**?',
    notes: 'QUICK CHECK ANSWER: yes – barium sulfate (white) (1); lead nitrate + sodium nitrate: no reaction / no precipitate, all nitrates are soluble (1).\nThe grid is generated in node from a function of rules a–e and checked against known cases (AgCl, BaSO₄, Cu(OH)₂ insoluble; CuSO₄, K₂CO₃, Pb(NO₃)₂ soluble). Silver hydroxide and silver/lead carbonates are shown as the rules predict; students are not asked about them.',
  }), '3.19 Solubility rules');
}

// ======================= 25 PRECIPITATION AND IONIC EQUATIONS =======================
reg(D.contentSlide({
  title: 'Precipitation reactions and their ionic equations',
  subtitle: 'Specification 3.20 and 0.4 (HT) • two solutions → an insoluble solid',
  tag: '3.20', ht: true, caption: 'Ag⁺ and Cl⁻ join into a solid lattice; Na⁺ and NO₃⁻ stay in solution',
  draw: (s, p) => {
    tube(s, 0.85, 1.6, 0.5, 1.5, 0.6, 'DCEAF7'); label(s, 0.55, 3.15, 1.1, 'AgNO₃(aq)', { size: 10.5, bold: true });
    label(s, 1.4, 2.2, 0.3, '**+**', { size: 16 });
    tube(s, 1.75, 1.6, 0.5, 1.5, 0.6, 'DCEAF7'); label(s, 1.45, 3.15, 1.1, 'NaCl(aq)', { size: 10.5, bold: true });
    arrow(s, 2.4, 2.4, 2.85, 2.4, C.ink, 2);
    tube(s, 3.0, 1.6, 0.5, 1.5, 0.75, 'DCEAF7', { ppt: ['FFFFFF', '9AA3B0'] }); label(s, 2.6, 3.15, 1.3, '**white** AgCl(s)', { size: 10.5 });
    oval(s, 5.15, 2.35, 2.2, 1.75, C.white, C.blue, { lw: 1.5 });
    line(s, 3.5, 2.85, 4.1, 2.6, C.blue, 1, { dash: 'dash' });
    [[0, 0, 'Ag⁺'], [1, 0, 'Cl⁻'], [2, 0, 'Ag⁺'], [0, 1, 'Cl⁻'], [1, 1, 'Ag⁺'], [2, 1, 'Cl⁻']].forEach(([c, r, t]) => ion(s, 4.68 + c * 0.36, 2.62 + r * 0.36, t, 0.18, { size: 10 }));
    ion(s, 4.7, 1.85, 'Na⁺', 0.18); ring(s, 4.7, 1.85, 0.18);
    ion(s, 5.65, 1.8, 'NO₃⁻', 0.2); ring(s, 5.65, 1.8, 0.2);
    s.addText(eqRuns('AgNO3+NaCl', [], { size: 11.5 }), { x: 0.7, y: 3.55, w: 5.6, h: 0.38, align: 'center', valign: 'middle', margin: 0 });
    s.addText(eqRuns('AgNO3 split', ['L1', 'L2', 'R1', 'R2'], { size: 11 }), { x: 0.6, y: 4.05, w: 5.8, h: 0.38, align: 'center', valign: 'middle', margin: 0 });
    eqn(s, 1.4, 4.6, 4.2, EQ['Ag+Cl'], { size: 14, color: C.red, fill: HT_FILL, edge: C.red, h: 0.5 });
    label(s, 0.7, 5.2, 5.6, 'ionic equation: only the ions that form the solid', { size: 10.5, italic: true });
  },
  head: 'What is a precipitate?',
  lines: [
    'A **precipitate** is an **insoluble solid** formed when two solutions are mixed.',
    'Use the **solubility rules** to predict it, and **name** it.',
    'Colours: AgCl **white**, BaSO₄ **white**, CaCO₃ **white**, Cu(OH)₂ **blue**.',
    'Ionic equation (HT): the two ions that make the solid → the solid **(s)**.',
  ],
  worked: { head: 'Worked example (HT)', q: 'Barium chloride solution + sodium sulfate solution.',
    steps: [['Full', EQ['BaCl2+Na2SO4']], ['Ions', 'cancel 2Na⁺(aq) and 2Cl⁻(aq) (spectators)'], ['Ionic', EQ['Ba+SO4']], ['Check', checkText('Ba+SO4')]], size: 10.5 },
  workedH: 2.2,
  qc: 'HT: write the ionic equation, with state symbols, for the **blue** precipitate formed when copper sulfate solution is mixed with sodium hydroxide solution.',
  notes: `QUICK CHECK ANSWER: ${EQ['Cu+OH']} – species (1), balanced with 2OH⁻ (1). Full equation: ${EQ['CuSO4+NaOH']}.\nAll checked in node for atoms and charges: ${EQ['AgNO3+NaCl']}; ${EQ['AgNO3 split']}; ${EQ['Ag+Cl']}; ${EQ['BaCl2+Na2SO4']}; ${EQ['BaCl2 split']}; ${EQ['Ba+SO4']}.\nThe silver nitrate and barium chloride tests reappear in Topic 9 (tests for halide and sulfate ions).`,
}), '3.20 Precipitation and ionic equations (HT)');

// ======================= 26 INSOLUBLE SALTS =======================
reg(D.contentSlide({
  title: 'Making a pure, dry insoluble salt',
  subtitle: 'Specification 3.21 • precipitate → filter → wash → dry',
  tag: '3.21', caption: 'making calcium carbonate from two solutions',
  draw: (s, p) => {
    const Q = [[0.6, 1.45], [3.6, 1.45], [0.6, 3.68], [3.6, 3.68]];
    Q.forEach(([x, y]) => box(s, x, y, 2.85, 2.15, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }));
    const T2 = ['**mix** the two solutions; stir', '**filter** to collect the precipitate', '**wash** with distilled water', '**dry** in a warm oven or between filter papers'];
    Q.forEach(([x, y], i) => { badge(s, x + 0.25, y + 0.25, i + 1, C.blue, 0.17); label(s, x + 0.48, y + 0.06, 2.3, T2[i], { size: 10.5, h: 0.42, align: 'left', valign: 'top' }); });
    beaker(s, 1.45, 2.25, 1.2, 1.15, 0.65, 'DCEAF7');
    for (let i = 0; i < 12; i++) ball(s, 1.55 + (i % 6) * 0.19, 3.3 - Math.floor(i / 6) * 0.08, 0.045, 'FFFFFF', '9AA3B0');
    tube(s, 2.6, 1.75, 0.3, 0.8, 0.5, 'DCEAF7');
    funnel(s, 5.0, 2.0, 1.0, 0.65, { residue: ['E2E2E2', '8A8F99'], drip: 'DCEAF7', stem: 0.32 });
    conical(s, 5.0, 3.0, 0.9, 0.55, 0.4, 'DCEAF7');
    funnel(s, 1.75, 4.25, 1.0, 0.65, { residue: ['E2E2E2', '8A8F99'], stem: 0.32 });
    poly(s, [[2.55, 4.0], [3.0, 4.0], [3.05, 4.55], [2.5, 4.55]], 'E3F0FB', '5B9BD5', { lw: 1 });
    line(s, 2.6, 4.0, 2.25, 4.35, '5B9BD5', 1.5);
    [[2.17, 4.45], [2.1, 4.52]].forEach(([x, y]) => ball(s, x, y, 0.03, WAT[0], WAT[1]));
    label(s, 2.45, 4.62, 0.95, 'distilled water', { size: 10, h: 0.4 });
    box(s, 4.05, 4.25, 1.9, 1.3, 'F2E6D8', '8A6A3A', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 });
    box(s, 4.3, 5.0, 1.4, 0.08, 'FFFFFF', '9AA3B0');
    for (let i = 0; i < 8; i++) ball(s, 4.45 + i * 0.16, 4.95, 0.045, 'FFFFFF', '9AA3B0');
    [4.5, 4.95, 5.4].forEach(x => { const pts = []; for (let j = 0; j <= 8; j++) pts.push([x + 0.05 * Math.sin(j * Math.PI / 2), 4.8 - j * 0.05]); wire(s, pts, C.red, 1.25); });
    label(s, 4.05, 5.58, 1.9, 'warm oven', { size: 10, h: 0.22 });
  },
  head: 'Method',
  lines: [
    'Mix solutions of **two soluble salts** that between them contain the ions of the insoluble salt.',
    '**Filter**: the precipitate stays on the filter paper (residue).',
    '**Wash** the residue with **distilled water** to remove the soluble spectator ions.',
    '**Dry** in a warm oven or between filter papers.',
  ],
  worked: { head: 'Example: calcium carbonate', q: '',
    steps: [['Full', EQ['CaCl2+Na2CO3']], ['Ionic (HT)', EQ['Ca+CO3']], ['Wash', 'removes dissolved NaCl (Na⁺ and Cl⁻ spectators)'], ['Answer', 'pure, dry CaCO₃(s) left on the paper']], size: 10.5 },
  workedH: 2.15,
  qc: 'Why is the precipitate washed with **distilled** water and not tap water? Why is it dried in a **warm** oven rather than a very hot one?',
  notes: `QUICK CHECK ANSWER: tap water contains dissolved ions/salts that would contaminate the solid (1); a very hot oven might decompose the salt (or spit) (1).\nChecked in node: ${EQ['CaCl2+Na2CO3']}; ${EQ['Ca+CO3']}. Alternative classic example (lead compounds are toxic, demonstration only): ${EQ['Pb(NO3)2+Na2SO4']} → ${EQ['Pb+SO4']}.`,
}), '3.21 Insoluble salts');

// ======================= 27 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 3.19–3.21 and 0.4 • solubility, precipitates and insoluble salts', [
  { q: 'Use the solubility rules to predict whether a precipitate forms when these solutions are mixed. Name any precipitate.\n(i) lead nitrate + sodium chloride     (ii) potassium carbonate + sodium nitrate', marks: 2, ms: '(i) yes, lead chloride (1); (ii) no precipitate (all sodium, potassium salts and nitrates are soluble) (1).' },
  { q: 'Write the ionic equation, with state symbols, for the precipitate formed in (i).', marks: 2, ht: true, ms: `${EQ['Pb+Cl']}: species and balancing (1); state symbols (1).` },
  { q: 'Describe how to obtain a **pure, dry** sample of the precipitate from the mixture.', marks: 3, ms: 'Filter (1); wash the residue with distilled water (1); dry in a warm oven / between filter papers (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 28 ELECTROLYSIS: IONS MOVE =======================
reg(D.contentSlide({
  title: 'Electrolysis: ions on the move',
  subtitle: 'Specification 3.22–3.24 • electrolytes, d.c. supply, cations to the cathode, anions to the anode',
  tag: '3.22–3.24', caption: 'copper chloride solution with inert (graphite) electrodes',
  draw: (s, p) => {
    const E = eCell(s, 1.55, 3.0, 3.3, 2.25, { liq: 'BDE3E0', surf: '3E8E7E', ySup: 2.05 });
    [[3.05, 3.75], [2.95, 4.75]].forEach(([x, y]) => { ion(s, x, y, 'Cu²⁺', 0.19); arrow(s, x - 0.22, y, E.xC + 0.13, y, '1F5F99', 2); });
    [[3.45, 3.55], [3.45, 4.25], [3.45, 4.9], [2.95, 4.25]].forEach(([x, y]) => { ion(s, x, y, 'Cl⁻', 0.17); if (x > 3.3) arrow(s, x + 0.2, y, E.xA - 0.13, y, '3E7F2E', 2); });
    label(s, 0.55, 5.32, 2.9, '**cations (+)** move to the **cathode (−)**', { size: 10.5, color: '1F5F99' });
    label(s, 3.45, 5.32, 3.0, '**anions (−)** move to the **anode (+)**', { size: 10.5, color: '3E7F2E' });
    label(s, 4.95, 3.35, 1.55, 'graphite electrodes (inert)', { size: 10, italic: true, h: 0.42, color: C.grey, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'An **electrolyte** is an **ionic compound** that is **molten** or **dissolved in water**: its ions can move.',
    '**Electrolysis**: electrical energy from a **direct current (d.c.)** supply **decomposes** the electrolyte.',
    '**Cations** (positive) move to the **cathode** (negative electrode).',
    '**Anions** (negative) move to the **anode** (positive electrode).',
    '**PANIC**: **P**ositive **A**node, **N**egative **I**s **C**athode.',
  ],
  worked: { head: 'Why not a solid?', q: '',
    steps: [['Solid', 'ions held in fixed positions in the lattice'], ['Molten', 'ions free to move → can carry charge'], ['Dissolved', 'ions free to move in water'], ['Answer', 'electrolysis needs mobile ions']], size: 10.5 },
  workedH: 2.05,
  qc: 'Explain why **solid** lead bromide cannot be electrolysed but **molten** lead bromide can. Which ion moves to the cathode?',
  notes: 'QUICK CHECK ANSWER: in the solid the ions are fixed in the lattice / cannot move (1); when molten the ions are free to move to the electrodes (and carry charge) (1). Pb²⁺ (lead ions) move to the cathode (1).\nInert electrodes (graphite or platinum) do not react; they only conduct. Products at each electrode are on the next slides.',
}), '3.22–3.24 Electrolytes and moving ions');

// ======================= 29 MOLTEN COMPOUNDS =======================
reg(D.contentSlide({
  title: 'Electrolysis of molten compounds',
  subtitle: 'Specification 3.25e and 3.26 • molten lead bromide (demonstration); predicting binary products',
  tag: '3.25–3.26', caption: 'demonstration in a fume cupboard: bromine vapour is toxic',
  draw: (s, p) => {
    const cx = 2.4, top = 3.45;
    tripodBunsen(s, cx, 4.6, 5.85, { hw: 0.75 });
    poly(s, [[cx - 0.85, top], [cx + 0.85, top], [cx + 0.6, top + 1.12], [cx - 0.6, top + 1.12]], 'E9E3D8', '6B5A45', { lw: 1.5 });
    poly(s, [[cx - 0.8, top + 0.22], [cx + 0.8, top + 0.22], [cx + 0.6, top + 1.1], [cx - 0.6, top + 1.1]], 'F2C28A', null);
    const xC = 1.95, xA = 2.85, eT = 2.85;
    box(s, xC - 0.06, eT, 0.12, 1.6, GRAPH[0], GRAPH[1]); box(s, xA - 0.06, eT, 0.12, 1.6, GRAPH[0], GRAPH[1]);
    oval(s, xC, 4.48, 0.4, 0.13, 'B3B9C2', '6B7385', { lw: 1 });
    [[3.3, 3.15, 0.34], [3.5, 2.8, 0.3], [3.3, 2.5, 0.26]].forEach(([x, y, r]) => oval(s, x, y, r, r * 0.75, 'B5651D', null, { tr: 45 }));
    wire(s, [[xC, eT], [xC, 1.95], [1.78, 1.95]]); wire(s, [[xA, eT], [xA, 1.95], [3.02, 1.95]]);
    dcSupply(s, cx, 1.95, 1.0);
    comp(s, 'lamp', xC, 2.25, xC, 2.8, { size: 0.75 });
    label(s, 0.55, 2.4, 1.2, 'lamp lights up', { size: 10, align: 'right' });
    label(s, 0.55, 3.1, 1.15, '**cathode (−)**', { size: 10.5, align: 'right' });
    label(s, 0.5, 4.05, 1.1, 'molten PbBr₂', { size: 10.5, align: 'right', bold: true, color: '8A5A1A' });
    // right column: products and half equations
    label(s, 3.75, 1.42, 2.7, '**Half equations (HT)**', { size: 11, align: 'left', color: C.red });
    label(s, 3.75, 1.72, 2.7, '**Cathode (−)**: grey **lead** collects under the electrode', { size: 10.5, h: 0.48, align: 'left', valign: 'top' });
    eqn(s, 3.75, 2.2, 2.7, EQ['Pb2+ cathode'], { size: 11, fill: HT_FILL, edge: 'E8B4B8' });
    label(s, 3.75, 2.75, 2.7, '**Anode (+)**: **bromine**, a red-brown vapour', { size: 10.5, h: 0.48, align: 'left', valign: 'top' });
    eqn(s, 3.75, 3.23, 2.7, EQ['Br- anode'], { size: 11, fill: HT_FILL, edge: 'E8B4B8' });
    label(s, 3.75, 3.8, 2.7, 'Overall:', { size: 10.5, bold: true, align: 'left' });
    eqn(s, 3.75, 4.1, 2.7, EQ['PbBr2 overall'], { size: 11 });
    label(s, 3.75, 4.7, 2.7, 'Lead bromide must be **molten** (heated) so its ions can move.', { size: 10.5, h: 0.5, align: 'left', valign: 'top' });
  },
  head: 'Molten binary compounds',
  lines: [
    'A **binary** ionic compound contains just **two elements**.',
    'When molten: the **metal** forms at the **cathode**; the **non-metal** forms at the **anode**.',
    'Lead bromide is a **teacher demonstration** (toxic lead and bromine; fume cupboard).',
  ],
  worked: { head: 'Predict the products (3.26)', q: '',
    steps: [['ZnCl₂(l)', 'zinc at the cathode; chlorine at the anode'], ['KI(l)', 'potassium at the cathode; iodine at the anode'], ['Al₂O₃(l)', 'aluminium at the cathode; oxygen at the anode'], ['Answer', 'metal ion gains electrons; non-metal ion loses electrons']], size: 10.5 },
  workedH: 2.15,
  qc: 'Predict the products at each electrode when **molten sodium chloride** is electrolysed. HT: write both half equations.',
  notes: `QUICK CHECK ANSWER: sodium at the cathode, chlorine at the anode (1). HT: ${EQ['Na+ cathode']} (1); ${EQ['Cl- anode molten']} (1).\nHalf equations for the worked examples (HT, all checked in node): ZnCl₂: ${EQ['Zn2+ cathode']}, ${EQ['Cl- anode molten']}; KI: ${EQ['K+ cathode']}, ${EQ['I- anode']}; Al₂O₃: ${EQ['Al3+ cathode']}, ${EQ['O2- anode']}.\nState symbols: in molten electrolysis the ions are (l). Bromine boils at 59 °C, so it leaves as a vapour (g). CLEAPSS: lead bromide TOXIC (reproductive toxicity), bromine TOXIC/CORROSIVE – teacher demonstration only in a fume cupboard, eye protection, small amounts. Zinc chloride is a safer alternative (chlorine at the anode – also fume cupboard).`,
}), '3.25e–3.26 Molten compounds');

// ======================= 30 AQUEOUS SOLUTIONS =======================
{
  const s = D.contentHeader('Electrolysis of aqueous solutions', 'Specification 3.25a–d • water adds H⁺ and OH⁻ ions: which ions are discharged?', { tag: '3.25' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'decision rules for inert electrodes');
  const col = (x, head, q, yes, no, colr) => {
    pbox(s, x, 1.45, 2.85, 0.62, head, colr === 'c' ? 'E3E8EE' : 'FBE3E4', colr === 'c' ? '2A2F3A' : C.red, { size: 11, bold: true });
    arrow(s, x + 1.42, 2.07, x + 1.42, 2.3, C.ink, 1.5);
    pbox(s, x, 2.3, 2.85, 0.85, q, C.white, C.blue, { size: 10.5 });
    arrow(s, x + 0.7, 3.15, x + 0.7, 3.5, C.green, 1.5); arrow(s, x + 2.15, 3.15, x + 2.15, 3.5, C.red, 1.5);
    label(s, x + 0.78, 3.2, 0.45, '**yes**', { size: 10, color: C.green, align: 'left' }); label(s, x + 2.23, 3.2, 0.45, '**no**', { size: 10, color: C.red, align: 'left' });
    pbox(s, x, 3.5, 1.38, 1.45, yes, 'E9F5EC', C.green, { size: 10.5 });
    pbox(s, x + 1.47, 3.5, 1.38, 1.45, no, 'FDEDE4', C.orange, { size: 10.5 });
  };
  col(0.6, 'Cathode (−): H⁺ or metal ion?', 'Is the metal **more reactive** than hydrogen?', '**hydrogen**, H₂\ne.g. Na⁺, K⁺, Mg²⁺, Ca²⁺', 'the **metal**\ne.g. Cu²⁺ → Cu, Ag⁺ → Ag', 'c');
  col(3.55, 'Anode (+): OH⁻ or the anion?', 'Is there a **halide** ion (Cl⁻, Br⁻, I⁻)?', 'the **halogen**\nCl₂, Br₂ or I₂', '**oxygen**, O₂ (from OH⁻)\ne.g. SO₄²⁻, NO₃⁻', 'a');
  label(s, 0.6, 5.1, 5.8, 'Water provides the extra ions:  H₂O(l) ⇌ H⁺(aq) + OH⁻(aq)', { size: 11, bold: true, color: C.blue, h: 0.3 });
  label(s, 0.6, 5.42, 5.8, 'Ions that are **not** discharged stay in the solution.', { size: 10.5, italic: true, h: 0.28 });
  const rows = [[HDR('Electrolyte (inert electrodes)'), HDR('Cathode (−)'), HDR('Anode (+)'), HDR('Left in solution')],
    ...[['a copper chloride solution', 'copper', 'chlorine', 'water'], ['b sodium chloride solution', 'hydrogen', 'chlorine', 'sodium hydroxide'], ['c sodium sulfate solution', 'hydrogen', 'oxygen', 'sodium sulfate'], ['d water + sulfuric acid', 'hydrogen', 'oxygen', 'sulfuric acid'], ['e molten lead bromide', 'lead', 'bromine', '—']].map((r, i) => r.map((t, j) => tcell(t, i, j === 0 ? { bold: true } : { align: 'center' })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [2.18, 1.2, 1.2, 1.5], rowH: [0.42, 0.44, 0.44, 0.44, 0.44, 0.44], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.15, 6.08, 2.1, 'Testing the gases', [
    '**Hydrogen**: lighted splint → squeaky pop.',
    '**Oxygen**: relights a **glowing** splint.',
    '**Chlorine**: bleaches **damp** blue litmus paper (it may turn red first). Use a fume cupboard.',
  ], { size: 11 });
  D.quickCheck(s, 'Predict the products at each electrode for **potassium bromide** solution and for **copper sulfate** solution (inert electrodes).');
  D.notes(s, `QUICK CHECK ANSWER: KBr(aq): hydrogen at the cathode (K more reactive than H), bromine at the anode (halide) (1). CuSO₄(aq): copper at the cathode (Cu less reactive than H), oxygen at the anode (no halide) (1).\nHalf equations (HT, checked in node): ${EQ['Cu2+ cathode']}; ${EQ['Cl- anode']}; ${EQ['H+ cathode']}; ${EQ['OH- anode']}. Overall: ${EQ['CuCl2 overall']}; ${EQ['NaCl(aq) overall']}; ${EQ['water overall']}.\nGCSE simplification: with very dilute chloride solutions some oxygen also forms at the anode – not required.`);
  reg(s, '3.25a–d Aqueous solutions');
}

// ======================= 31 METHOD: HALF EQUATIONS (HT) =======================
{
  const s = D.contentHeader('Method: writing half equations', 'Specification 3.27 • ion → atom or molecule; balance atoms; add electrons to balance charge; check', { ht: true, tag: '3.27 method' });
  const dH = EQ['H+ cathode_d'], dC = EQ['Cl- anode_d'];
  label(s, 4.9, 1.28, 3.9, '**Cathode (−)**: H⁺ ions in NaCl(aq)', { size: 12, color: '2A2F3A', h: 0.34 });
  label(s, 8.95, 1.28, 3.93, '**Anode (+)**: Cl⁻ ions in NaCl(aq)', { size: 12, color: C.red, h: 0.34 });
  const rows = [
    ['Write the ion and what it forms', 'Cations form the element at the cathode; anions form the element at the anode. Gases are diatomic: H₂, O₂, Cl₂, Br₂.', 'H⁺(aq) → H₂(g)', 'Cl⁻(aq) → Cl₂(g)'],
    ['Balance the atoms', 'Put a number in front of the ion.', '2H⁺(aq) → H₂(g)', '2Cl⁻(aq) → Cl₂(g)'],
    ['Add electrons to balance the charge', 'Cathode: electrons on the LEFT (gained). Anode: electrons on the RIGHT (lost). No state symbol on e⁻.', EQ['H+ cathode'], EQ['Cl- anode']],
    ['Check atoms AND charges; name it', 'OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons).',
      `charge ${qStr(dH.a.charge)} = ${qStr(dH.b.charge)} ✓  → REDUCTION (gain)`, `charge ${qStr(dC.a.charge)} = ${qStr(dC.b.charge)} ✓  → OXIDATION (loss)`],
  ];
  rows.forEach(([t, dsc, c1, c2], i) => {
    const y = 1.7 + i * 1.12;
    box(s, 0.45, y, 4.3, 1.02, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    badge(s, 0.78, y + 0.3, i + 1);
    label(s, 1.12, y + 0.06, 3.55, `**${t}**`, { size: 12, align: 'left', h: 0.3, color: C.ink });
    label(s, 1.12, y + 0.36, 3.55, dsc, { size: 10, italic: true, align: 'left', h: 0.62, valign: 'top', color: C.grey });
    const fin = i >= 2;
    [[4.9, 3.9, c1], [8.95, 3.93, c2]].forEach(([x, w, t2]) => {
      box(s, x, y, w, 1.02, i === 3 ? HT_FILL : C.white, i === 3 ? 'E8B4B8' : C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, x + 0.1, y, w - 0.2, t2, { size: i === 3 ? 12 : 14, bold: true, h: 1.02, color: i === 2 ? C.red : C.ink });
    });
  });
  D.quickCheck(s, 'You try: write the half equations at each electrode for **molten zinc chloride**. Which one is **oxidation**?');
  D.notes(s, `QUICK CHECK ANSWER: cathode: ${EQ['Zn2+ cathode']} (1); anode: ${EQ['Cl- anode molten']} (1); the anode reaction is oxidation – chloride ions lose electrons (1).\nCheck values come from the equation data (atoms and charges asserted in node). Hydrogen: atoms H 2 = 2; charge 2(+1) + 2(−1) = 0 = 0. Chlorine: Cl 2 = 2; charge 2(−1) = −2 = 0 + 2(−1).\nAlternative acceptable form (Edexcel mark schemes accept): 2Cl⁻ − 2e⁻ → Cl₂. Common errors: Cl instead of Cl₂; electrons on the wrong side; charges not balanced; writing e⁻ with a state symbol.`);
  reg(s, '3.27 METHOD: half equations (HT)');
}

// ======================= 32 HALF EQUATIONS IN ACTION (HT) =======================
calc('QC 40 cm³ H2 → O2 volume', 40 / 2, 20);
reg(D.contentSlide({
  title: 'Half equations for aqueous solutions',
  subtitle: 'Specification 3.25, 3.27 (HT) • oxygen from hydroxide ions; hydrogen from hydrogen ions',
  tag: '3.27', ht: true, caption: 'water acidified with sulfuric acid; gases collected in test tubes',
  draw: (s, p) => {
    const bx = 0.75, by = 2.45, bw = 2.6, bh = 2.0, xC = bx + bw * 0.27, xA = bx + bw * 0.73;
    beaker(s, bx, by, bw, bh, 0.8, 'E3F0FB');
    [[xC, 1.0, 'H₂'], [xA, 0.5, 'O₂']].forEach(([x, g, t]) => {
      box(s, x - 0.26, 1.95, 0.52, 2.2, 'E3F0FB', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.2 });
      box(s, x - 0.26, 1.95, 0.52, g + 0.05, 'FFFFFF', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.2 });
      line(s, x - 0.26, 2.15, x - 0.26, 4.15, C.ink, 1.25); line(s, x + 0.26, 2.15, x + 0.26, 4.15, C.ink, 1.25);
      s.addShape(SH.ARC, { x: x - 0.26, y: 1.95, w: 0.52, h: 0.4, angleRange: [180, 360], line: { color: C.ink, width: 1.25 } });
      label(s, x - 0.26, 2.05, 0.52, `**${t}**`, { size: 11, h: 0.3 });
      box(s, x - 0.06, 3.8, 0.12, 0.85, GRAPH[0], GRAPH[1]);
      bubbles(s, [[x - 0.08, 3.6], [x + 0.06, 3.35], [x - 0.04, 3.1]], 0.03);
    });
    line(s, xC, 4.65, xC, 5.25, C.ink, 1.5); line(s, xA, 4.65, xA, 5.25, C.ink, 1.5);
    const T2 = dcSupply(s, (xC + xA) / 2, 5.25, 0.6);
    line(s, xC, 5.25, T2.tl[0] - 0.1, 5.25, C.ink, 1.5); line(s, xA, 5.25, T2.tr[0] + 0.1, 5.25, C.ink, 1.5);
    label(s, 0.45, 4.5, xC - 0.6, 'cathode (−)', { size: 10, align: 'right', bold: true, h: 0.24 });
    label(s, xA + 0.14, 4.5, 0.85, 'anode (+)', { size: 10, align: 'left', bold: true, color: C.red, h: 0.24 });
    label(s, 3.7, 1.5, 2.75, '**Cathode (−)**: hydrogen', { size: 10.5, align: 'left' });
    eqn(s, 3.7, 1.82, 2.75, EQ['H+ cathode'], { size: 11, fill: HT_FILL, edge: 'E8B4B8' });
    label(s, 3.7, 2.45, 2.75, '**Anode (+)**: oxygen', { size: 10.5, align: 'left', color: C.red });
    eqn(s, 3.7, 2.77, 2.75, EQ['OH- anode'], { size: 10.5, fill: HT_FILL, edge: 'E8B4B8' });
    label(s, 3.7, 3.4, 2.75, '**Overall**', { size: 10.5, align: 'left' });
    eqn(s, 3.7, 3.72, 2.75, EQ['water overall'], { size: 11 });
    label(s, 3.7, 4.3, 2.75, '4 e⁻ make **2 H₂** but only **1 O₂** → volume ratio H₂ : O₂ = **2 : 1**', { size: 10.5, h: 0.62, align: 'left', valign: 'top' });
  },
  head: 'Hydroxide ions at the anode',
  lines: [
    'If there is **no halide**, **OH⁻** ions (from water) are discharged at the anode: oxygen forms.',
    'Balance it: **4OH⁻ → O₂ + 2H₂O + 4e⁻** (4 negative charges on each side).',
    'Sodium sulfate solution and acidified water give the **same** products: H₂ and O₂.',
  ],
  worked: { head: 'Worked example: sodium chloride solution', q: '',
    steps: [['Cathode', EQ['H+ cathode'] + '  (reduction)'], ['Anode', EQ['Cl- anode'] + '  (oxidation)'], ['Left', 'Na⁺ and OH⁻ ions stay → sodium hydroxide solution'], ['Overall', EQ['NaCl(aq) overall']]], size: 10.5 },
  workedH: 2.15,
  qc: 'In the electrolysis of acidified water, **40 cm³** of hydrogen is collected. Predict the volume of oxygen collected in the same time and explain using the half equations.',
  notes: `QUICK CHECK ANSWER: 20 cm³ (1); the same number of electrons (4e⁻) produces 2 H₂ molecules but only 1 O₂ molecule, so half the volume of oxygen (1).\nChecked in node: ${EQ['H+ cathode']}; ${EQ['OH- anode']}; ${EQ['water overall']}; ${EQ['NaCl(aq) overall']}. Electron count: 4 e⁻ → 2 H₂ and 1 O₂ (ratio 2 asserted).\nEdexcel also accepts the oxygen half equation written as 4OH⁻ − 4e⁻ → 2H₂O + O₂. Gas volumes in reality: slightly less oxygen than half because O₂ is a little more soluble in water.`,
}), '3.25, 3.27 Half equations in solution (HT)');

// ======================= 33 OXIDATION AND REDUCTION (HT) =======================
reg(D.contentSlide({
  title: 'Oxidation and reduction: OIL RIG',
  subtitle: 'Specification 3.28 (HT) and 3.29 • electron loss and gain; reduction at the cathode, oxidation at the anode',
  tag: '3.28–3.29', ht: true, caption: 'magnesium gives two electrons to a copper(II) ion',
  draw: (s, p) => {
    const atom = (x, y, t, f, e, r = 0.32) => { ball(s, x, y, r, f, e, 1.5); label(s, x - r, y - 0.17, 2 * r, `**${t}**`, { size: 12, h: 0.34 }); };
    atom(1.15, 2.05, 'Mg', 'C9CDD3', '4A5262'); arrow(s, 1.55, 2.05, 2.45, 2.05, C.ink, 2); atom(2.85, 2.05, 'Mg²⁺', 'E3E6EA', '4A5262', 0.36);
    atom(1.15, 3.9, 'Cu²⁺', '8EC9F0', '1F5F99', 0.36); arrow(s, 1.6, 3.9, 2.45, 3.9, C.ink, 2); atom(2.85, 3.9, 'Cu', 'C8783A', '8A4A1A');
    [[3.55, 2.05], [3.9, 2.05]].forEach(([x, y]) => { ball(s, x, y, 0.13, 'F5D04A', 'B8950A', 1); label(s, x - 0.13, y - 0.12, 0.26, '**e⁻**', { size: 10, h: 0.24 }); });
    arrow(s, 3.7, 2.3, 2.15, 3.72, 'B8950A', 2.5, { dash: 'dash' });
    label(s, 3.2, 2.95, 2.2, '2 electrons transferred', { size: 10.5, bold: true, color: 'B8950A', align: 'left' });
    label(s, 1.55, 3.55, 0.6, '+ 2e⁻', { size: 10.5, bold: true, color: 'B8950A' });
    label(s, 0.7, 2.5, 3.3, '**OXIDATION**: Mg **loses** electrons', { size: 11, color: C.red, align: 'left' });
    label(s, 0.7, 4.35, 3.3, '**REDUCTION**: Cu²⁺ **gains** electrons', { size: 11, color: '1F5F99', align: 'left' });
    box(s, 0.7, 4.85, 5.6, 0.92, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    s.addText([{ text: 'OIL RIG', options: { bold: true, fontSize: 20, color: 'F5D04A', fontFace: 'Georgia', breakLine: true } }, { text: 'Oxidation Is Loss • Reduction Is Gain (of electrons)', options: { fontSize: 11.5, color: C.white } }], { x: 0.85, y: 4.85, w: 3.6, h: 0.92, valign: 'middle', margin: 0, fontFace: 'Calibri' });
    s.addText([{ text: 'RED CAT', options: { bold: true, fontSize: 14, color: 'F5D04A', breakLine: true } }, { text: 'AN OX', options: { bold: true, fontSize: 14, color: 'F5D04A' } }], { x: 4.6, y: 4.85, w: 1.6, h: 0.92, valign: 'middle', align: 'center', margin: 0, fontFace: 'Calibri' });
  },
  head: 'In terms of electrons',
  lines: [
    '**Oxidation** is the **loss** of electrons (HT).',
    '**Reduction** is the **gain** of electrons (HT).',
    'In electrolysis, **reduction** happens at the **cathode** (cations gain electrons) and **oxidation** at the **anode** (anions lose electrons).',
    'Oxidation and reduction always happen **together**: **redox**.',
  ],
  worked: { head: 'From ionic equation to half equations', q: 'Magnesium is added to copper sulfate solution.',
    steps: [['Full', EQ['Mg+CuSO4']], ['Ionic', EQ['Mg+Cu2+'] + '  (SO₄²⁻ is a spectator)'], ['Halves', `${EQ['Mg ox']}  and  ${EQ['Cu2+ cathode']}`], ['Answer', 'Mg is oxidised (loses 2e⁻); Cu²⁺ is reduced (gains 2e⁻)']], size: 10.5 },
  workedH: 2.25,
  qc: 'In the electrolysis of molten lead bromide, which ion is **reduced** and which is **oxidised**? Explain in terms of electrons.',
  notes: `QUICK CHECK ANSWER: Pb²⁺ is reduced – it gains two electrons at the cathode (1); Br⁻ is oxidised – bromide ions lose electrons at the anode (1).\nChecked in node: ${EQ['Mg+CuSO4']}; ${EQ['Mg+Cu2+']}; ${EQ['Mg ox']}; ${EQ['Cu2+ cathode']}; electrons lost (2) = electrons gained (2). 3.28 is Higher only; 3.29 (reduction at the cathode, oxidation at the anode) is both tiers. Displacement redox returns in Topic 4: ${EQ['Zn+Cu2+']}.`,
}), '3.28–3.29 Oxidation and reduction (HT)');

// ======================= 34 RECAP 6 (HT) =======================
const R6 = D.recapSlide(6, 'Specification 3.22–3.29 • electrolysis and half equations', [
  { q: 'Predict the products at the cathode and at the anode when **molten zinc chloride** is electrolysed.', marks: 2, ms: 'Cathode: zinc (1); anode: chlorine (1).' },
  { q: 'Sodium chloride solution is electrolysed. Explain why **hydrogen**, not sodium, is produced at the cathode.', marks: 2, ms: 'Sodium is more reactive than hydrogen (1); so hydrogen ions (from water) are discharged / gain electrons instead (1).' },
  { q: 'Balance the anode half equation in the electrolysis of acidified water:   …OH⁻(aq) → O₂(g) + …H₂O(l) + …e⁻', marks: 2, ht: true, ms: `${EQ['OH- anode']}: 4OH⁻ and 4e⁻ (1); 2H₂O (1).` },
  { q: 'Copper is formed at the cathode when copper sulfate solution is electrolysed. Write the half equation and explain why this is **reduction**.', marks: 3, ht: true, ms: `${EQ['Cu2+ cathode']} (1, accept without states); copper ions gain electrons (1); reduction is gain of electrons (1).` },
], { ht: true });
reg(R6.s, 'Recap 6 (half equations)');

// ======================= 35 COPPER PURIFICATION =======================
reg(D.contentSlide({
  title: 'Copper electrodes and purifying copper',
  subtitle: 'Specification 3.30 • the impure anode dissolves; pure copper plates onto the cathode',
  tag: '3.30', caption: 'copper sulfate solution with an impure copper anode and a pure copper cathode',
  draw: (s, p) => {
    const E = eCell(s, 1.2, 2.75, 3.6, 2.25, { cathode: COPPER, anode: ['B58A60', '6B4A2A'], cw: 0.14, aw: 0.42, ySup: 1.8, gap: 0.42, cNote: 'pure: gets **thicker**', aNote: 'impure: **dissolves**' });
    [[E.xA - 0.12, 3.6], [E.xA + 0.08, 4.1], [E.xA - 0.1, 4.4]].forEach(([x, y]) => ball(s, x, y, 0.035, '3A3A3A', '3A3A3A'));
    poly(s, [[E.xA - 0.5, 5.0], [E.xA - 0.25, 4.85], [E.xA + 0.1, 4.8], [E.xA + 0.45, 4.88], [E.xA + 0.55, 5.0]], '6B5A45', '3A3020', { lw: 0.75 });
    [[3.2, 3.65], [2.85, 4.2], [3.2, 4.6]].forEach(([x, y]) => { ion(s, x, y, 'Cu²⁺', 0.19); arrow(s, x - 0.23, y, E.xC + 0.12, y, '1F5F99', 2); });
    callout(s, 4.95, 4.75, 1.5, 'anode sludge', E.xA + 0.4, 4.92, { size: 10 });
    eqn(s, 0.6, 5.35, 2.85, EQ['Cu2+ cathode'], { size: 11, fill: HT_FILL, edge: 'E8B4B8' });
    eqn(s, 3.55, 5.35, 2.85, EQ['Cu anode'], { size: 11, fill: HT_FILL, edge: 'E8B4B8' });
  },
  head: 'What happens',
  lines: [
    '**Anode (+)**: copper **atoms lose electrons** and go into solution as **Cu²⁺** ions (oxidation). The anode gets **thinner**.',
    '**Cathode (−)**: **Cu²⁺** ions **gain electrons** and are deposited as **copper** (reduction). The cathode gets **heavier**.',
    'Impurities do not dissolve and fall as **anode sludge**.',
  ],
  worked: { head: 'Explaining the observations', q: '',
    steps: [['Mass', 'anode loses mass; cathode gains about the same mass'], ['Colour', 'Cu²⁺ made at the anode = Cu²⁺ used at the cathode → blue stays the same'], ['Purity', 'only copper is deposited on the cathode'], ['Answer', 'copper moves from the impure anode to the pure cathode']], size: 10.5 },
  workedH: 2.15,
  qc: 'Why does the blue colour stay the same with **copper** electrodes but fade with **graphite** electrodes?',
  notes: `QUICK CHECK ANSWER: with copper electrodes, Cu²⁺ ions are made at the anode as fast as they are removed at the cathode, so [Cu²⁺] is constant (1); with graphite, oxygen forms at the anode instead, so Cu²⁺ is removed but not replaced (1).\nHalf equations checked in node: ${EQ['Cu2+ cathode']}; ${EQ['Cu anode']}. The anode sludge contains valuable metals such as silver and gold.`,
}), '3.30 Copper electrodes and purification');

// ======================= 36 CP 3.31 METHOD =======================
reg(D.contentSlide({
  title: 'Core Practical: electrolysis of copper sulfate',
  subtitle: 'Specification 3.31 • part 1 inert (graphite) electrodes; part 2 copper electrodes',
  tag: 'CP 3.31', cp: true, caption: 'circuit for part 2: weighed copper electrodes, ammeter and variable resistor',
  draw: (s, p) => {
    const E = eCell(s, 1.15, 3.35, 4.2, 1.95, { cathode: COPPER, anode: COPPER, ySup: 1.62, above: 0.45 });
    comp(s, 'ammeter', E.xC, 2.65, E.xC, 1.95, { label: 'ammeter', side: 1, lw: 1.0, off: 0.3 });
    comp(s, 'varResistor', E.xA, 2.7, E.xA, 2.05, { label: 'variable\nresistor', side: -1, lw: 1.0, lh: 0.45, off: 0.42 });
    label(s, 1.15, 5.35, 4.2, 'copper sulfate solution', { size: 10.5, bold: true, color: '1F5F99' });
    box(s, 0.7, 5.62, 5.6, 0.25, null, null);
  },
  head: 'Method',
  lines: [
    '**Part 1:** graphite electrodes for a few minutes; observe each electrode; test the anode gas with a **glowing splint**.',
    '**Part 2:** clean, dry and **weigh** two copper electrodes.',
    'Set the current to **0.20 A** with the variable resistor; electrolyse for **10 min**, keeping the current constant.',
    'Remove, rinse with distilled water then **propanone**, dry, **reweigh** both.',
    'Repeat with new electrodes at 0.40, 0.60, 0.80, 1.00 A.',
  ],
  worked: { head: 'Variables and safety', q: '',
    steps: [['IV', 'current (A)'], ['DV', 'change in mass of each electrode (g)'], ['Control', 'time; volume and concentration of CuSO₄; electrode size and spacing'], ['Safety', 'CuSO₄ harmful; propanone highly flammable – no flames; eye protection']], size: 10.5 },
  workedH: 2.15,
  qc: 'Why are the copper electrodes rinsed with **propanone** and dried before reweighing? Why must the current be kept **constant**?',
  notes: `QUICK CHECK ANSWER: propanone evaporates quickly, so the electrode is dry and the mass is not too high because of water (1); the mass of copper deposited depends on the current (and time), so it must be constant for a fair test (1).\nHalf equations (HT): graphite: ${EQ['Cu2+ cathode']} and ${EQ['OH- anode']}; copper: ${EQ['Cu2+ cathode']} and ${EQ['Cu anode']}.\nCLEAPSS-style hazards: copper sulfate solution (0.5 mol dm⁻³) HARMFUL if swallowed, eye irritant, toxic to aquatic life; propanone HIGHLY FLAMMABLE, eye irritant – no naked flames, use a small volume; low-voltage d.c. supply only; eye protection. Oxygen from part 1 is not a hazard in these small amounts.`,
}), 'CP 3.31 Method and apparatus');

// ======================= 37 CP 3.31 RESULTS =======================
{
  const s = D.contentHeader('Core Practical: results and analysis', 'Specification 3.31 • sample results: copper electrodes, 10 minutes at each current', { cp: true, tag: 'CP 3.31' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale (model results)');
  const G = { x: 1.5, y: 1.55, w: 4.75, h: 3.7, xmin: 0, xmax: 1.0, ymin: 0, ymax: 0.25, xstep: 0.2, ystep: 0.05, minor: 2, xlabel: 'current / A', ylabel: 'change in mass / g', fmt: v => v.toFixed(1), yfmt: v => v.toFixed(2) };
  axes(s, G);
  plotLine(s, G, [[0, 0], [1.0, mDep(1.0)]], COPPER[1], 2);
  plotLine(s, G, [[0, 0], [1.0, 0.21]], C.blue, 1.5, { dash: 'dash' });
  points(s, G, CUI.map((I, i) => [I, CUGAIN[i]]), COPPER[1]);
  points(s, G, CUI.map((I, i) => [I, CULOSS[i]]), C.blue);
  label(s, px(G, 0.45), py(G, 0.07), 1.8, 'cathode: mass gained', { size: 10.5, bold: true, color: COPPER[1], align: 'left' });
  label(s, px(G, 0.1), py(G, 0.13), 1.6, 'anode: mass lost', { size: 10.5, bold: true, color: C.blue, align: 'left' });
  const rows = [[HDR('current / A'), HDR('cathode gain / g'), HDR('anode loss / g')], ...CUI.map((I, i) => [tcell(I.toFixed(2), i, { bold: true }), tcell(CUGAIN[i].toFixed(2), i), tcell(CULOSS[i].toFixed(2), i)])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.9, 2.09, 2.09], rowH: 0.29, fontFace: 'Calibri', fontSize: 11, align: 'center', valign: 'middle', color: C.text, border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 3.2, 6.08, 1.45, 'Part 1: graphite electrodes', [
    '**Cathode**: pink-brown copper coating. **Anode**: bubbles of **oxygen** (relights a glowing splint).',
    'Blue colour **fades**; H⁺ and SO₄²⁻ are left, so the solution becomes **acidic**.',
  ], { size: 10.5 });
  D.card(s, 6.8, 4.75, 6.08, 1.5, 'Analysis and errors', [
    'Mass change is **directly proportional** to current: straight line through the origin.',
    'Anode loses slightly **more**: some copper flakes off; impurities. Electrodes not fully dry → mass too high.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the graph to find the mass of copper deposited at **0.50 A**. Why should the electrodes be handled only by their edges?');
  D.notes(s, `QUICK CHECK ANSWER: 0.10 g (accept 0.09–0.11) (1); grease/dirt from fingers changes the mass / stops copper depositing evenly (1).\nModel (checked in node): mass = I × t × 63.5 ÷ (2 × 96 500) with t = 600 s, rounded to 0.01 g: 0.04, 0.08, 0.12, 0.16, 0.20 g; anode losses modelled 5 % higher (flaking/impurities). Faraday's law is NOT on the GCSE spec; it is used only to make realistic data. Students only need the proportional relationship.\nHalf equations: ${EQ['Cu2+ cathode']}; ${EQ['Cu anode']}; graphite anode: ${EQ['OH- anode']}.`);
  reg(s, 'CP 3.31 Results, graph and analysis');
}

// ======================= 38 RECAP 7 =======================
calc('R7 0.40 A → 0.08 g; 0.80 A → ', 0.08 * 0.80 / 0.40, 0.16, 1e-12);
const R7 = D.recapSlide(7, 'Specification 3.30–3.31 • copper electrodes and the Core Practical', [
  { q: 'Explain why the mass of the copper **cathode** increases during electrolysis of copper sulfate solution.', marks: 2, ms: 'Cu²⁺ ions are attracted to the cathode (1); they gain electrons and are deposited as copper (atoms) (1).' },
  { q: 'In the purification of copper, state what happens to the **impurities** in the anode.', marks: 1, ms: 'They fall to the bottom (of the cell) as anode sludge (1).' },
  { q: 'At **0.40 A** the cathode gained **0.08 g** in 10 minutes. Predict the mass gained at **0.80 A** in 10 minutes. Explain your prediction.', marks: 2, ms: '0.16 g (1); mass is (directly) proportional to the current / double the current, double the mass (1).' },
  { q: 'Copper sulfate solution is electrolysed using **graphite** electrodes. Name the product at each electrode and explain why the solution becomes acidic.', marks: 3, ms: 'Copper at the cathode (1); oxygen at the anode (1); H⁺ (and SO₄²⁻) ions are left in solution / sulfuric acid forms (1).' },
]);
reg(R7.s, 'Recap 7');

// ======================= 39 EQUATION BANK =======================
{
  const s = D.contentHeader('Summary: ionic and half equations', 'Specification 0.4, 3.14, 3.20, 3.27–3.30 • every equation checked for atoms and charges', { ht: true, tag: 'Equation bank' });
  const bank = [
    ['Acid in water', EQ.HCl, '—', '3.1'],
    ['Neutralisation (ionic)', EQ['H+OH'], '—', '3.14, 0.4'],
    ['Metal + acid (ionic)', EQ['Mg+H ionic'], 'redox', '3.11, 0.4'],
    ['Carbonate + acid (ionic)', EQ['CO3+H'], '—', '3.11, 0.4'],
    ['Precipitation (ionic)', EQ['Ag+Cl'], '—', '3.20, 0.4'],
    ['Precipitation (ionic)', EQ['Ba+SO4'], '—', '3.20, 0.4'],
    ['Cathode: metal', EQ['Cu2+ cathode'], 'reduction', '3.27'],
    ['Cathode: hydrogen', EQ['H+ cathode'], 'reduction', '3.27'],
    ['Anode: halogen', EQ['Cl- anode'], 'oxidation', '3.27'],
    ['Anode: oxygen', EQ['OH- anode'], 'oxidation', '3.27'],
    ['Copper anode', EQ['Cu anode'], 'oxidation', '3.30'],
  ];
  const rows = [[HDR('Type'), HDR('Equation'), HDR('Electrons'), HDR('Spec')], ...bank.map(([a, b, c, d], i) => [tcell(a, i, { bold: true }), tcell(b, i, { bold: true, color: C.ink, fontSize: 12.5 }), tcell(c, i, { color: c === 'reduction' ? '1F5F99' : c === 'oxidation' ? C.red : C.grey, bold: true, align: 'center' }), tcell(d, i, { color: C.blue, align: 'center' })])];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.8, 6.4, 1.6, 1.63], rowH: 0.4, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, 'Cover the Equation column. For each row, write the equation from memory, then check **atoms** and **charges** on each side.');
  D.notes(s, 'Use as a retrieval grid: cover the middle column. All 11 equations are generated from the same data used elsewhere in the deck and asserted for atom and charge balance in node.\nFull list of equations checked in build_T3.js:\n' + EQLIST.join('\n'));
  reg(s, 'Summary: ionic and half equations (HT)');
}

// ======================= 40 KEY WORDS =======================
reg(D.keyWords([
  ['Acid', 'Source of H⁺ ions in solution; pH below 7.'],
  ['Alkali', 'Soluble base; source of OH⁻ ions in solution; pH above 7.'],
  ['Base', 'Reacts with an acid to form a salt and water only.'],
  ['Strong acid (HT)', 'Completely dissociates into ions in water.'],
  ['Weak acid (HT)', 'Only partially dissociates into ions (reversible).'],
  ['Concentrated', 'A large amount of substance in a given volume of solution.'],
  ['Neutralisation', 'Acid + base → salt + water; H⁺ + OH⁻ → H₂O.'],
  ['Spectator ion', 'Ion present that does not take part; same on both sides.'],
  ['Ionic equation (HT)', 'Shows only the ions/particles that react, with states.'],
  ['Precipitate', 'Insoluble solid formed when two solutions are mixed.'],
  ['Titration', 'Finds exact volumes of acid and alkali that react, using an indicator.'],
  ['Electrolyte', 'Ionic compound, molten or dissolved, that conducts and is decomposed.'],
  ['Cathode / anode', 'Negative electrode (cations go there) / positive electrode (anions).'],
  ['Half equation (HT)', 'Shows electrons gained or lost at one electrode.'],
  ['Oxidation / reduction (HT)', 'Loss / gain of electrons: OIL RIG.'],
  ['Anode sludge', 'Impurities left when an impure copper anode dissolves.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. HT terms are marked (HT).' }), 'Summary: key words');

// ======================= 41 FULL QUESTION =======================
reg(D.fullQuestion('A student electrolyses **copper chloride solution**, CuCl₂(aq), using graphite electrodes. Then she tests copper chloride solution with sodium hydroxide solution.', [
  { l: 'a', q: 'Explain why **solid** copper chloride cannot be electrolysed.', marks: 2, ms: 'The ions are in fixed positions / held in a lattice (1); they cannot move (to the electrodes) / need to be free to move to carry charge (1).' },
  { l: 'b', q: 'Name the product formed at the **cathode** and at the **anode**.', marks: 2, ms: 'Cathode: copper (1); anode: chlorine (1).' },
  { l: 'c', q: 'Write the half equation for the reaction at the **cathode**.', marks: 2, ht: true, ms: `${EQ['Cu2+ cathode']}: Cu²⁺ → Cu (1); 2e⁻ on the left (1).` },
  { l: 'd', q: 'The anode reaction is  ' + EQ['Cl- anode'] + '. Explain why this reaction is **oxidation**.', marks: 2, ht: true, ms: 'Chloride ions lose electrons (1); oxidation is the loss of electrons (1).', h: 1.05 },
  { l: 'e', q: 'Sodium hydroxide solution is added to copper chloride solution. A **blue precipitate** forms. Name the precipitate and write the **ionic equation**, with state symbols.', marks: 3, ht: true, ms: `Copper hydroxide (1); ${EQ['Cu+OH']}: species and balancing (1); state symbols (1). Full equation for reference: ${EQ['CuCl2+NaOH']}.`, h: 1.35 },
  { l: 'f', q: 'The student repeats the electrolysis with **sodium chloride solution**. Explain why hydrogen, not sodium, is produced at the cathode.', marks: 2, ms: 'Sodium is more reactive than hydrogen (1); so H⁺ ions (from water) gain electrons / are discharged instead (1).', h: 1.1 },
], 13, { ht: true, subtitle: 'Specification 0.4, 3.20, 3.22–3.29 • answer every part • 13 marks (parts c, d, e are HT)' }), 'Full question');

// ======================= 42–43 HOMEWORK =======================
const HW = [
  { n: '1', q: 'State the colour of **phenolphthalein** in sodium hydroxide solution.', marks: 1, ms: 'Pink (1).', h: 0.7 },
  { n: '2', q: 'The pH of a solution changes from **2** to **4**. Describe how the concentration of hydrogen ions has changed.', marks: 2, ht: true, ms: 'It decreases (1); by a factor of 100 / 10² (1).', h: 0.9 },
  { n: '3', q: 'Zinc reacts with dilute sulfuric acid to form zinc sulfate solution and hydrogen. Write the balanced equation **and** the ionic equation, with state symbols.', marks: 3, ht: true, ms: `${EQ['Zn+H2SO4']} (1); state symbols (1); ionic: ${EQ['Zn ionic']} (1).`, h: 1.25 },
  { n: '4', q: 'Molten potassium bromide is electrolysed. Write the half equation at each electrode and state which is **oxidation**.', marks: 3, ht: true, ms: `${EQ['K+ cathode']} (1); ${EQ['Br- anode molten KBr']} (1); the anode / bromide reaction is oxidation (loss of electrons) (1).`, h: 1.0 },
  { n: '5', q: 'Predict whether a precipitate forms; name any precipitate.\n(a) barium nitrate + potassium sulfate   (b) sodium chloride + potassium nitrate', marks: 2, ms: `(a) yes, barium sulfate (1) [${EQ['Ba(NO3)2+K2SO4']}]; (b) no precipitate (1).`, h: 0.95 },
  { n: '6', q: 'Describe how to prepare a pure, dry sample of **hydrated copper sulfate crystals** from copper oxide and dilute sulfuric acid. Explain the purpose of each step.', marks: 6, levels: true, h: 1.55, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Measure dilute sulfuric acid (e.g. 50 cm³) into a beaker; warm it in a water bath (to speed up the reaction).',
    'Add copper oxide a spatula at a time, stirring, until some remains undissolved – excess, so that all the acid reacts.',
    `Copper oxide reacts: ${EQ['CuO+H2SO4']}; the solution turns blue.`,
    'Filter to remove the excess (insoluble) copper oxide; the filtrate is copper sulfate solution and water only.',
    'Heat the filtrate in an evaporating basin over a water bath to evaporate some water / until crystals start to form (gentle heating; not to dryness, which would remove the water of crystallisation).',
    'Leave to cool so that crystals form (crystallisation).',
    'Filter / pour off the remaining solution; dry the crystals between filter papers or in a warm place.',
    'Safety: eye protection; copper oxide and copper sulfate are harmful.',
  ], 'Level 3 answers give a logical sequence of steps AND explain why excess is used, why filtering is needed and why the solution is not heated to dryness.');
}
D.homework('Answer every question. Questions 2–4 are Higher tier; show state symbols in all equations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 9);
assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 9); assert.strictEqual(R7.total, 8);
assert(D.slideNo >= 40 && D.slideNo <= 48, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T3_ChemicalChanges.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
