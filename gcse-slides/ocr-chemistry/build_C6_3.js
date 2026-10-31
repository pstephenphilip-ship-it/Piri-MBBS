// build_C6_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C6 Making useful chemicals, C6.3 What factors affect the yield of chemical reactions?
// (one deck, Higher & Foundation; Part 3 of 3)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C6_3.js
// Structure copied from build_C5_2.js (approved, same template). ocr_chem_template.js is NOT edited: basin, tripod,
// Bunsen, sealed tube, syringe, thermometer, flask and particle helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C6_3.md): reversible reactions and the ⇌ symbol, no 100% yield in closed systems, dynamic equilibrium,
// HT effect of concentration, temperature and pressure on the position of equilibrium and choosing conditions for the
// most product. Suggested practical: reversible dehydration of hydrated copper(II) sulfate.
// NOT taught (overlap control): rates, collision theory and catalysts (C6.2: one line only, "a catalyst does not change
// the position of equilibrium"); acids and salts (C6.1); J258-only C6.4 industrial-scale content (atom economy,
// percentage yield calculations, feedstocks): only one GRADE 7–9 STRETCH line on the rate/yield compromise.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C6', chapterTitle: 'Making useful chemicals', code: 'C6.3', title: 'What factors affect the yield of chemical reactions?',
  part: 3, parts: 3, specRange: 'C6.3.1–C6.3.3',
  subtitle: 'What factors affect the yield of chemical reactions?',
  keywords: ['Reversible reaction', 'Closed system', 'Dynamic equilibrium', 'Position of equilibrium', 'Yield'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));

// ======================= EQUATIONS: atom and charge balance (asserted) =======================
function parseFormula(f) {
  let charge = 0;
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
// gas-molecule count on each side (for the pressure rule)
const nGas = terms => terms.reduce((a, [n]) => a + n, 0);
// hydrated copper(II) sulfate written as CuSO4 + 5 H2O units on the left
balanced('CuSO4.5H2O ⇌ CuSO4 + 5H2O', [[1, 'CuSO4'], [5, 'H2O']], [[1, 'CuSO4'], [5, 'H2O']]);
balanced('NH4Cl ⇌ NH3 + HCl', [[1, 'NH4Cl']], [[1, 'NH3'], [1, 'HCl']]);
balanced('CaCO3 → CaO + CO2', [[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']]);
const HABER = balanced('N2 + 3H2 ⇌ 2NH3', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]);
const NO2 = balanced('2NO2 ⇌ N2O4', [[2, 'NO2']], [[1, 'N2O4']]);
const HI = balanced('H2 + I2 ⇌ 2HI', [[1, 'H2'], [1, 'I2']], [[2, 'HI']]);
balanced('Fe3+ + SCN- ⇌ FeSCN2+', [[1, 'Fe3+'], [1, 'SCN-']], [[1, 'FeSCN2+']]);
const SO3 = balanced('2SO2 + O2 ⇌ 2SO3', [[2, 'SO2'], [1, 'O2']], [[2, 'SO3']]);
const ETH = balanced('C2H4 + H2O ⇌ C2H5OH', [[1, 'C2H4'], [1, 'H2O']], [[1, 'C2H5OH']]);
const SMR = balanced('CH4 + H2O ⇌ CO + 3H2', [[1, 'CH4'], [1, 'H2O']], [[1, 'CO'], [3, 'H2']]);
const MEOH = balanced('CO + 2H2 ⇌ CH3OH', [[1, 'CO'], [2, 'H2']], [[1, 'CH3OH']]);
balanced('starter Mg + 2HCl → MgCl2 + H2', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
assert.throws(() => balanced('unbalanced test', [[1, 'N2'], [1, 'H2']], [[1, 'NH3']]));
assert.throws(() => balanced('charge test', [[1, 'Fe3+'], [1, 'SCN-']], [[1, 'FeSCN+']]));
// molecule counts used by the pressure slides and questions
calc('Haber gas molecules left', nGas(HABER.lhs), 4); calc('Haber gas molecules right', nGas(HABER.rhs), 2);
calc('NO2 molecules left', nGas(NO2.lhs), 2); calc('N2O4 molecules right', nGas(NO2.rhs), 1);
calc('HI left', nGas(HI.lhs), 2); calc('HI right', nGas(HI.rhs), 2);
calc('SO3 left', nGas(SO3.lhs), 3); calc('SO3 right', nGas(SO3.rhs), 2);
calc('ethanol left (steam)', nGas(ETH.lhs), 2); calc('ethanol right', nGas(ETH.rhs), 1);
calc('SMR left', nGas(SMR.lhs), 2); calc('SMR right', nGas(SMR.rhs), 4);
calc('methanol left', nGas(MEOH.lhs), 3); calc('methanol right', nGas(MEOH.rhs), 1);

// ======================= RELATIVE FORMULA MASS (Ar to 1 d.p., OCR data sheet) =======================
const AR = { H: 1.0, C: 12.0, N: 14.0, O: 16.0, S: 32.1, Cl: 35.5, Mg: 24.3, Cu: 63.5 };
const r1 = v => Math.round(v * 10) / 10;
function Mr(f) { const p = parseFormula(f).atoms; return r1(Object.entries(p).reduce((a, [k, v]) => { assert(AR[k], 'no Ar for ' + k); return a + AR[k] * v; }, 0)); }
const MR_ANH = calc('Mr CuSO4', Mr('CuSO4'), 159.6, 1e-9);
const MR_W = calc('Mr H2O', Mr('H2O'), 18.0, 1e-9);
const MR_HYD = calc('Mr CuSO4.5H2O', r1(MR_ANH + 5 * MR_W), 249.6, 1e-9);

// ======================= CALCULATIONS (asserted) =======================
// practical (illustrative data): heating 2.50 g of hydrated copper(II) sulfate to constant mass
const PT = [0, 2, 4, 6, 8, 10, 12, 14];
const PM = [2.50, 2.20, 1.95, 1.77, 1.65, 1.60, 1.60, 1.60];
assert(PM.every((m, i) => i === 0 || m <= PM[i - 1]), 'mass never increases on heating');
calc('constant mass from 10 min', PM[5], PM[7], 1e-12);
const ANH_TH = calc('theory anhydrous from 2.50 g (3 s.f.)', sf(2.50 * MR_ANH / MR_HYD, 3), 1.60, 1e-12);
calc('measured final = theory', PM[7], ANH_TH, 1e-12);
const WLOST = calc('water lost 2.50 − 1.60', r1((2.50 - 1.60) * 100) / 100 * 1, 0.90, 1e-9);
calc('% water by mass (measured) 3 s.f.', sf(0.90 / 2.50 * 100, 3), 36.0, 1e-9);
calc('% water by mass (theory) 3 s.f.', sf(5 * MR_W / MR_HYD * 100, 3), 36.1, 1e-9);
const nW = calc('HT stretch mol water', 0.90 / MR_W, 0.05, 1e-12);
const nA = calc('HT stretch mol CuSO4', 1.60 / MR_ANH, 0.010025062656641603, 1e-12);
calc('HT stretch ratio water : CuSO4 (2 s.f.)', sf(nW / nA, 2), 5.0, 1e-12);
calc('rehydration temperature rise', r1(31.0 - 20.5), 10.5, 1e-9);
calc('QC 2 min mass lost', r1((2.50 - 2.20) * 100) / 100, 0.30, 1e-9);
calc('practical QC 5.00 g → anhydrous (3 s.f.)', sf(5.00 * MR_ANH / MR_HYD, 3), 3.20, 1e-12);
// slide 9: closed system, ammonia
const N2_0 = 1.0, H2_0 = 3.0, NH3_EQ = 0.60;
const NH3_MAX = calc('max NH3 from 1.0 mol N2 (1 : 2)', 2 * N2_0, 2.0, 1e-12);
calc('H2 needed is exactly 3.0 (1 : 3)', 3 * N2_0, H2_0, 1e-12);
calc('% of maximum NH3', NH3_EQ / NH3_MAX * 100, 30, 1e-9);
const N2_EQ = calc('N2 left', N2_0 - NH3_EQ / 2, 0.70, 1e-9);
const H2_EQ = calc('H2 left', H2_0 - 3 * NH3_EQ / 2, 2.10, 1e-9);
calc('QC HI max', 2 * 1.0, 2.0, 1e-12);
calc('QC HI % of max', 1.56 / 2.0 * 100, 78, 1e-9);
// slide 10: amounts vs time (illustrative), equilibrium from 8 min
const ET = [0, 2, 4, 6, 8, 10, 12];
const ENH3 = [0, 0.36, 0.50, 0.57, 0.60, 0.60, 0.60];
const EN2 = ENH3.map(v => r1((N2_0 - v / 2) * 1000) / 1000);
assert.deepStrictEqual(EN2, [1.0, 0.82, 0.75, 0.715, 0.7, 0.7, 0.7]);
calc('eq NH3 = 0.60', ENH3[4], NH3_EQ, 1e-12); calc('eq N2 = 0.70', EN2[4], N2_EQ, 1e-12);
// slide 15: syringe particle diagram (NO2/N2O4) — atoms conserved on compression
const SYR1 = { NO2: 6, N2O4: 2 }, SYR2 = { NO2: 2, N2O4: 4 };
const atomsSyr = q => ({ N: q.NO2 + 2 * q.N2O4, O: 2 * q.NO2 + 4 * q.N2O4 });
assert.deepStrictEqual(atomsSyr(SYR1), atomsSyr(SYR2), 'syringe atoms conserved');
calc('syringe 1 molecules', SYR1.NO2 + SYR1.N2O4, 8); calc('syringe 2 molecules', SYR2.NO2 + SYR2.N2O4, 6);
// slide 16: Haber equilibrium yields (illustrative, rounded from published curves)
const HP = [50, 100, 200, 300, 400];
const HY = { 350: [25, 37, 50, 58, 64], 450: [9, 16, 28, 36, 42], 550: [4, 7, 13, 18, 22] };
Object.values(HY).forEach(a => assert(a.every((v, i) => i === 0 || v > a[i - 1]), 'yield rises with pressure'));
HP.forEach((_, i) => assert(HY[350][i] > HY[450][i] && HY[450][i] > HY[550][i], 'yield falls with temperature'));
calc('graph read 450 °C, 200 atm', HY[450][2], 28); calc('graph read 350 °C, 200 atm', HY[350][2], 50);
calc('QC graph 550 °C, 400 atm', HY[550][4], 22);
calc('rise 450 °C 100 → 300 atm', HY[450][3] - HY[450][1], 20);
// full question & homework
calc('FQ SO3 drop 400 → 600 °C', 98 - 76, 22);
calc('HW methanol molecules 3 → 1', nGas(MEOH.lhs) - nGas(MEOH.rhs), 2);

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
const GLASS = 'EEF5FB';
const BLUE_CU = '3F7FD0', WHITE_CU = 'F4F4EE';
const ATOM = { H: ['FFFFFF', '8A8F99'], O: ['E06666', '9E2A2A'], N: ['6D8FE0', '2F4F9E'], C: ['4A4A4A', '222222'], I: ['8E5BB5', '5A2F80'], S: ['F2D04B', 'A68A12'] };
function atom(s, cx, cy, el, r = 0.13, o = {}) {
  const [f, e] = ATOM[el]; ball(s, cx, cy, r, f, e, 1);
  if (o.lab !== false) label(s, cx - r, cy - r, 2 * r, el, { size: o.size || 10, bold: true, color: el === 'C' || el === 'I' ? C.white : C.ink, h: 2 * r });
}
function diatomic(s, cx, cy, a, b, r = 0.12, o = {}) { atom(s, cx - r * 0.8, cy, a, r, o); atom(s, cx + r * 0.8, cy, b, r, o); }
// NH3: N with 3 H
function ammonia(s, cx, cy, r = 0.1, o = {}) {
  atom(s, cx - r * 1.1, cy + r * 0.7, 'H', r * 0.7, { lab: false }); atom(s, cx + r * 1.1, cy + r * 0.7, 'H', r * 0.7, { lab: false }); atom(s, cx, cy - r * 1.1, 'H', r * 0.7, { lab: false });
  atom(s, cx, cy, 'N', r, o);
}
// NO2 (brown-ish O-N-O, bent) and N2O4 (two NO2 joined)
function no2(s, cx, cy, r = 0.075) { atom(s, cx - r * 1.3, cy + r * 0.6, 'O', r, { lab: false }); atom(s, cx + r * 1.3, cy + r * 0.6, 'O', r, { lab: false }); atom(s, cx, cy, 'N', r, { lab: false }); }
function n2o4(s, cx, cy, r = 0.075) { no2(s, cx - r * 0.85, cy, r); no2(s, cx + r * 1.0, cy - r * 0.0, r); }
// conical flask: neck top centre (cx, y)
function flask(s, cx, y, h, bw, o = {}) {
  const nw = bw * 0.26, neck = h * 0.3;
  const P = [[cx - nw / 2, y], [cx + nw / 2, y], [cx + nw / 2, y + neck], [cx + bw / 2, y + h], [cx - bw / 2, y + h], [cx - nw / 2, y + neck]];
  poly(s, P, o.fill || GLASS, null);
  poly(s, P, null, C.ink, { lw: 1.5 });
  if (o.bung) box(s, cx - nw / 2 - 0.04, y - 0.14, nw + 0.08, 0.22, '8C6A4A', '5A4030', { lw: 0.75 });
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
function tripod(s, cx, y, w, yb) {
  box(s, cx - w / 2, y, w, 0.06, '5A6275', '2D3748', { lw: 0.5 });
  line(s, cx - w / 2 + 0.05, y + 0.06, cx - w / 2 - 0.15, yb, '5A6275', 2.5);
  line(s, cx + w / 2 - 0.05, y + 0.06, cx + w / 2 + 0.15, yb, '5A6275', 2.5);
}
// gauze on top of tripod at y
function gauze(s, cx, y, w) {
  box(s, cx - w / 2, y - 0.05, w, 0.05, 'B8BEC8', '6B7385', { lw: 0.5 });
  box(s, cx - w * 0.22, y - 0.05, w * 0.44, 0.05, 'E8E3D6', '9A8F78', { lw: 0.5 });
}
// evaporating basin: rim at ytop, centre cx, width w, depth h; solid fill colour (with heap)
function basin(s, cx, ytop, w, h, solid, o = {}) {
  const pts = [];
  for (let i = 0; i <= 16; i++) { const a = Math.PI * i / 16; pts.push([cx - (w / 2) * Math.cos(a), ytop + h * Math.sin(a)]); }
  poly(s, pts, 'F7F3EA', null);
  if (solid) {
    const sp2 = [];
    for (let i = 3; i <= 13; i++) { const a = Math.PI * i / 16; sp2.push([cx - (w / 2) * Math.cos(a), ytop + h * Math.sin(a)]); }
    const yS = ytop + h * Math.sin(Math.PI * 3 / 16);
    poly(s, [...sp2, [cx + (w / 2) * Math.cos(Math.PI * 3 / 16) * 0.6, yS - 0.05], [cx, yS - 0.1], [cx - (w / 2) * Math.cos(Math.PI * 3 / 16) * 0.6, yS - 0.05]], solid, o.solidEdge || null);
  }
  poly(s, pts, null, '7A6E5A', { lw: 1.5, open: true });
  line(s, cx - w / 2 - 0.05, ytop, cx + w / 2 + 0.05, ytop, '7A6E5A', 1.5);
}
// thermometer: bulb bottom at yb, top at yt, x
function thermometer(s, x, yt, yb, fillTo) {
  box(s, x - 0.045, yt, 0.09, yb - yt - 0.06, 'FFFFFF', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: 0.75 });
  ball(s, x, yb - 0.05, 0.07, 'D9534F', '8A2A2A', 0.75);
  box(s, x - 0.018, fillTo, 0.036, yb - 0.08 - fillTo, 'D9534F', null);
}
// dropping pipette, tip at (x, ytip)
function pipette(s, x, ytip) {
  poly(s, [[x - 0.03, ytip], [x + 0.03, ytip], [x + 0.06, ytip - 0.45], [x - 0.06, ytip - 0.45]], GLASS, C.ink, { lw: 1 });
  box(s, x - 0.09, ytip - 0.78, 0.18, 0.34, '6B4E9B', '3E2B5E', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
  ball(s, x, ytip + 0.07, 0.035, 'CFE4F7', '5B9BD5', 0.5);
}
// sealed glass tube (rounded ends) with gas colour (brown transparency)
function sealedTube(s, x, y, w, h, brownTr) {
  box(s, x, y, w, h, '8B4513', null, { shape: SH.ROUNDED_RECTANGLE, r: w / 2, tr: brownTr });
  box(s, x, y, w, h, null, C.ink, { shape: SH.ROUNDED_RECTANGLE, r: w / 2, lw: 1.25 });
}
// beaker (open top) at x,y,w,h with water fill colour
function beaker(s, x, y, w, h, water, o = {}) {
  box(s, x + 0.02, y + h * 0.3, w - 0.04, h * 0.7 - 0.02, water, null, { tr: o.tr || 0 });
  line(s, x, y, x, y + h, C.ink, 1.5); line(s, x + w, y, x + w, y + h, C.ink, 1.5); line(s, x, y + h, x + w, y + h, C.ink, 1.5);
}
// gas syringe: barrel x..x+w at y (height h), plunger position px (inner end)
// gas syringe: barrel x..x+w at y (height h), sealed nozzle on the left, plunger face at pxI, rod of fixed length rod
function syringe(s, x, y, w, h, pxI, rod) {
  box(s, x, y, w, h, 'FFFFFF', C.ink, { lw: 1.25, tr: 0 });
  box(s, x - 0.18, y + h * 0.35, 0.18, h * 0.3, 'D8DEE6', C.ink, { lw: 1 });
  box(s, pxI, y + 0.03, 0.08, h - 0.06, '9AA3B0', '4A5568', { lw: 0.75 });
  box(s, pxI + 0.08, y + h / 2 - 0.04, rod - 0.08, 0.08, 'B8BEC8', '4A5568', { lw: 0.75 });
  box(s, pxI + rod, y - 0.05, 0.08, h + 0.1, '9AA3B0', '4A5568', { lw: 0.75 });
}
// Catmull-Rom smooth curve through points (graph coordinates)
function smooth(pts, n = 8) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const t = k / n, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}
const HT_FILL = 'FBE3E4';

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Equilibrium and yield',
    footer: 'OCR J260 Combined Science B • C6.3 what factors affect the yield of chemical reactions • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • reversible reactions, closed systems, dynamic equilibrium, changing conditions` },
      { icon: 'H', text: 'Higher & Foundation in one deck • concentration, temperature and pressure effects marked HT' },
      { icon: '▲', text: 'Suggested practical: the reversible dehydration of hydrated copper(II) sulfate • data verified' },
    ],
    notes: 'C6.3 What factors affect the yield of chemical reactions? is Part 3 of 3 in J260 Chapter C6 Making useful chemicals (C6.1 What useful products can be made from acids?; C6.2 How do chemists control the rate of reactions?; C6.3 this deck).\nJ258 (Chemistry B, separate science) has a fourth sub-topic, C6.4 How are chemicals made on an industrial scale?, which the OCR Chapter C6 scheme of work marks "separate science only". It is NOT part of J260 and is not taught here (no atom economy, no percentage-yield calculations, no feedstock/process flow content).\nEvidence for C6.3 in J260: the docbrown.info Combined Science B page (2016ocr21chemB2c.htm) lists "C6.3 What factors affect the yield of chemical reactions?"; thinka.ai has the same title under "Twenty First Century Science Combined Science B J260"; the OCR J260 specification-at-a-glance lists C6 as acids, rates and yield; RSC resources tag the equilibrium statements to OCR Combined Science B C6.3. See SPEC_C6_3.md.',
  });
  const sub = s._slideObjects.find(o => o._type === 'text' && JSON.stringify(o.text).includes('yield of chemical reactions?') && o.options && o.options.fontSize === 18);
  assert(sub, 'cover subtitle object found');
  Object.assign(sub.options, { fontSize: 16, w: 7.4 });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C6.3.1', text: 'Recall that some reactions can be **reversed** by changing the **conditions**.' },
  { code: 'C6.3.1', text: 'Use the **⇌** symbol for a **reversible reaction**.' },
  { code: 'C6.3.1', text: 'Explain why reversible reactions in **closed systems** do **not** reach **100% yield**.' },
  { code: 'C6.3.2', text: 'Recall that **dynamic equilibrium** occurs when the **rates** of the forward and reverse reactions are **equal**.' },
  { code: 'C6.3.3', text: 'Predict the effect of changing **concentration**, **temperature** and **pressure** on the **position of equilibrium**.', ht: true },
  { code: 'C6.3.3', text: 'Suggest **conditions** that produce **as much product as possible**.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J260 C6.3 = J258 C6.3; see SPEC_C6_3.md for wording sources and confidence):\nC6.3.1 recall that some reactions may be reversed by altering the reaction conditions, including: reversible reactions are shown by the symbol ⇌; reversible reactions (in closed systems) do not reach 100% yield (wording from an OCR Combined Science B resource extract; high).\nC6.3.2 recall that dynamic equilibrium occurs when the rates of forward and reverse reactions are equal (wording from an OCR B revision extract; high).\nC6.3.3 HT predict the effect of changing reaction conditions (concentration, temperature and pressure) on equilibrium position and suggest appropriate conditions to produce as much of a particular product as possible (wording from an RSC teaching-notes extract tagged OCR Combined Science B C6.3; medium–high). Students use Le Chatelier\'s principle qualitatively.\nHT marker: the bold type in the J260 document could not be seen. C6.3.3 is treated as Higher only, as in every GCSE board (AQA "HT only", OCR Gateway) and the J258 structure (UNVERIFIED for J260). C6.3.1 and C6.3.2 are taught to both tiers.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C6 Making useful chemicals • C6.3 is Part 3 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C6.3.1', 'Reversible reactions and the ⇌ symbol', 'Both tiers', C.blue],
    ['Practical', 'Dehydrating copper(II) sulfate, and back', 'Practical', C.orange],
    ['C6.3.1', 'Closed systems: never 100% yield', 'Both tiers', C.blue],
    ['C6.3.2', 'Dynamic equilibrium: equal rates', 'Both tiers', C.blue],
    ['C6.3.3', 'Concentration, temperature, pressure', 'HT', C.red],
    ['C6.3.3', 'Choosing conditions for most product', 'HT', C.red],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C6.3\nEquilibrium and yield', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 air (nitrogen) • C2 formulae • C5.2 moles and masses • C6.2 rates and collisions', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C6.1 What useful products can be made from acids?',
      'C6.2 How do chemists control the rate of reactions?',
      '**C6.3 What factors affect the yield of chemical reactions?** (this deck, the last in C6)',
      'J258 (separate) adds **C6.4** on making chemicals on an industrial scale: not in J260.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Foundation: **reversible reactions**, **closed systems** and **dynamic equilibrium**.',
      'Slides with the red **HT** pill (changing **concentration**, **temperature**, **pressure**) are Higher only.',
      'Skills: reading **graphs**, counting **gas molecules**, explaining a **prediction**.',
      'Rates and catalysts were C6.2: here we only ask what they do to **yield**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C6 has three sub-topics: C6.1 acids, C6.2 rates, C6.3 yield (OCR specification at a glance via search; docbrown combined page; SPEC_C6_1.md reached the same list). J258 Chemistry B also has C6.4 How are chemicals made on an industrial scale?, marked "separate science only" in the OCR Chapter C6 scheme of work.\nOverlap control: collision theory, rate graphs and how catalysts work are C6.2 (only one line here: a catalyst does not change the position of equilibrium). Acids, neutralisation and salts are C6.1 (starter question only). Atom economy, percentage yield calculations and the details of industrial processes are J258 C6.4 and are not taught.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C1 • air', q: 'Which gas makes up about **78%** of dry air? Name **one** gas made by burning fuels.' },
  { from: 'C2 • formulae', q: 'Write the formulae of **ammonia** and **nitrogen**. How many **atoms** are in one ammonia molecule?' },
  { from: 'C5.2 • moles', q: 'Mg + 2HCl → MgCl₂ + H₂. How many **moles of HCl** react with **0.5 mol** of Mg?' },
  { from: 'C6.1 • acids', q: 'Name the **salt** made when **sulfuric acid** neutralises **copper(II) oxide**.' },
  { from: 'C6.2 • rates', q: 'Use **collision theory** to explain why a reaction is **faster** at a higher **temperature**.' },
  { from: 'Energy changes', q: 'What is the difference between an **exothermic** and an **endothermic** reaction?' },
], { subtitle: 'Recall from C1–C6.2 • 6 minutes • no notes', notes: 'ANSWERS\n1. Nitrogen (about 78%). Carbon dioxide / water vapour / carbon monoxide / sulfur dioxide / nitrogen oxides (C1).\n2. NH₃ and N₂; 4 atoms (1 N + 3 H) (C2).\n3. 1.0 mol of HCl (1 : 2 ratio) (C5.2; equation atom-balanced in node).\n4. Copper(II) sulfate (C6.1, recap only). Link: its hydrated crystals are used in today\'s practical.\n5. Particles move faster and have more energy, so they collide more often and more collisions have enough energy to react (C6.2, recap only).\n6. Exothermic: transfers energy to the surroundings (temperature rises). Endothermic: takes in energy from the surroundings (temperature falls). Needed for the HT temperature rule on slide 13.' }), 'Retrieval starter');
calc('starter 0.5 mol Mg → HCl', 0.5 * 2, 1.0, 1e-12);

// ======================= 5 REVERSIBLE REACTIONS =======================
reg(D.contentSlide({
  title: 'Reversible reactions',
  subtitle: `Specification ${sp('C6.3.1')} • some reactions can be reversed by changing the conditions`,
  tag: 'C6.3.1', caption: 'two reversible reactions; colours as seen in the lab',
  draw: (s) => {
    label(s, 0.65, 1.42, 5.8, '**A** Hydrated copper(II) sulfate', { size: 11, h: 0.26, align: 'left' });
    basin(s, 1.55, 2.25, 1.4, 0.6, BLUE_CU, { solidEdge: '2A5FA8' });
    basin(s, 5.35, 2.25, 1.4, 0.6, WHITE_CU, { solidEdge: 'B8B8A8' });
    label(s, 0.7, 2.95, 1.7, '**blue** crystals\n(hydrated)', { size: 10, h: 0.45, color: BLUE_CU });
    label(s, 4.5, 2.95, 1.7, '**white** powder\n(anhydrous) + water', { size: 10, h: 0.45, color: C.grey });
    arrow(s, 2.5, 2.1, 4.4, 2.1, C.red, 2);
    label(s, 2.5, 1.78, 1.9, '**heat**: water given off', { size: 10, h: 0.28, color: C.red });
    arrow(s, 4.4, 2.6, 2.5, 2.6, C.blue, 2);
    label(s, 2.4, 2.66, 2.1, '**add water**: turns blue, gets **hot**', { size: 10, h: 0.42, color: C.blue });
    eqn(s, 0.7, 3.5, 5.6, 'CuSO₄·5H₂O(s) ⇌ CuSO₄(s) + 5H₂O(l)', { size: 12, h: 0.4 });
    // B: ammonium chloride in a test tube
    label(s, 0.65, 4.05, 5.8, '**B** Ammonium chloride', { size: 11, h: 0.26, align: 'left' });
    const tx = 1.0, ty = 4.4, tw = 0.32, th = 1.35;
    box(s, tx, ty, tw, th - tw / 2, GLASS, null);
    ball(s, tx + tw / 2, ty + th - tw / 2, tw / 2, GLASS, C.ink, 1.25);
    box(s, tx + 0.02, ty + th - 0.3, tw - 0.04, 0.2, 'FFFFFF', 'B0B0B0', { lw: 0.5 });
    box(s, tx + 0.02, ty + 0.18, tw - 0.04, 0.12, 'FFFFFF', 'B0B0B0', { lw: 0.5 });
    line(s, tx, ty, tx, ty + th - tw / 2, C.ink, 1.25); line(s, tx + tw, ty, tx + tw, ty + th - tw / 2, C.ink, 1.25);
    label(s, tx + 0.4, ty + th - 0.38, 1.6, '← heated: solid **breaks up**', { size: 10, h: 0.26, align: 'left', color: C.red });
    label(s, tx + 0.4, ty + 0.1, 1.9, '← cool top: white solid **re-forms**', { size: 10, h: 0.26, align: 'left', color: C.blue });
    eqn(s, 3.35, 4.65, 2.95, 'NH₄Cl(s) ⇌ NH₃(g) + HCl(g)', { size: 11, h: 0.4 });
    label(s, 3.35, 5.12, 2.95, 'forward ⟶ endothermic\nreverse ⟵ exothermic', { size: 10, h: 0.45, color: C.ink });
  },
  head: 'Reactions that go both ways',
  lines: [
    'A **reversible reaction** can go **forwards** (reactants → products) and **backwards** (products → reactants).',
    'The symbol **⇌** means the reaction is reversible.',
    'Changing the **conditions** (e.g. heating or cooling, adding or removing a substance) decides which way it goes.',
    'If the forward reaction is **endothermic**, the reverse reaction is **exothermic**: the **same amount** of energy is transferred.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: reading ⇌', q: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g). What does the equation tell you?',
    steps: [['Forward', 'nitrogen and hydrogen react to make ammonia'], ['Answer', 'ammonia can also **break down** into N₂ and H₂: the reaction is **reversible**']], size: 10.5 },
  workedH: 1.45,
  qc: 'White anhydrous copper(II) sulfate is used to **test for water**. What would you **see**, and what would you **feel** on the side of the tube?',
  notes: 'QUICK CHECK ANSWER: The white powder turns blue; the tube gets warm/hot because the reverse (rehydration) reaction is exothermic.\nC6.3.1 first part ("some reactions may be reversed by altering the reaction conditions; reversible reactions are shown by the symbol ⇌"). Equations atom-balanced in node (the hydrate is checked as CuSO₄ + 5H₂O units). The dot in CuSO₄·5H₂O shows water of crystallisation; this is not required by the J260 statement and is used only as notation.\nNH₄Cl demonstration (teacher or careful student work): ammonium chloride is HARMFUL if swallowed and an eye IRRITANT; ammonia and hydrogen chloride gases are both irritant/corrosive: heat only a small amount (one spatula tip), in a well-ventilated room, with eye protection. The solid re-forms on the cooler upper part of the tube.',
}), 'C6.3.1 Reversible reactions');

// ======================= 6 PRACTICAL: METHOD =======================
reg(D.contentSlide({
  title: 'Practical: a reversible reaction',
  subtitle: `Specification ${sp('C6.3.1')} • suggested practical: dehydrating copper(II) sulfate and adding the water back`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'step 1 heat to constant mass; step 2 cool, then add water dropwise',
  draw: (s) => {
    box(s, 0.6, 5.3, 5.8, 0.08, C.wood, '8A5A2B', { lw: 0.75 });
    label(s, 0.65, 1.42, 2.9, '**Step 1** Heat gently', { size: 11, h: 0.26 });
    label(s, 3.55, 1.42, 2.9, '**Step 2** Cool, then add water', { size: 11, h: 0.26 });
    // step 1: basin on gauze on tripod over Bunsen
    const X1 = 2.35;
    box(s, X1 - 1.0, 5.18, 2.0, 0.12, 'E8E3D6', '9A8F78', { lw: 0.75 });
    tripod(s, X1, 3.95, 1.6, 5.18);
    gauze(s, X1, 3.95, 1.8);
    bunsen(s, X1, 5.18);
    basin(s, X1, 3.3, 1.3, 0.6, BLUE_CU, { solidEdge: '2A5FA8' });
    [[X1 - 0.25, 2.85], [X1 + 0.05, 2.65], [X1 + 0.3, 2.9]].forEach(([x, y]) => s.addShape(SH.ARC, { x: x - 0.08, y, w: 0.16, h: 0.3, angleRange: [270, 90], line: { color: 'A0A8B8', width: 1.25 }, fill: { type: 'none' } }));
    label(s, 0.6, 2.55, 1.2, 'steam', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 0.5, 3.3, 0.95, 'basin', { size: 10, bold: true, h: 0.22, align: 'right' });
    label(s, 0.5, 3.8, 0.85, 'gauze', { size: 10, bold: true, h: 0.22, align: 'right' });
    label(s, 0.5, 4.45, 0.75, 'tripod', { size: 10, bold: true, h: 0.22, align: 'right' });
    label(s, X1 + 0.15, 4.62, 0.75, 'Bunsen\nburner', { size: 10, bold: true, h: 0.4, align: 'left' });
    // step 2: white powder in basin on mat, pipette + thermometer
    box(s, 3.9, 5.18, 2.3, 0.12, 'E8E3D6', '9A8F78', { lw: 0.75 });
    basin(s, 5.0, 4.55, 1.4, 0.62, WHITE_CU, { solidEdge: 'B8B8A8' });
    pipette(s, 4.65, 4.35);
    label(s, 3.4, 3.35, 1.1, 'water from a dropping pipette', { size: 10, h: 0.45, align: 'right' });
    thermometer(s, 5.45, 2.3, 4.9, 3.3);
    label(s, 5.6, 2.45, 0.9, '20.5 → 31.0 °C', { size: 10, bold: true, color: C.red, h: 0.4, align: 'left' });
    label(s, 3.9, 5.4, 2.3, 'heat-resistant mat', { size: 10, italic: true, color: C.grey, h: 0.22 });
  },
  head: 'Method',
  lines: [
    'Weigh an empty **evaporating basin**, add about **2.50 g** of blue hydrated copper(II) sulfate and weigh again.',
    '**Heat gently**, stirring. Every 2 minutes let it cool briefly and **reweigh**. Stop when the mass is **constant** (all white).',
    'Let the white powder cool fully. Put in a **thermometer** and add water **drop by drop**. Record the colour and the **temperature**.',
    '**IV**: time of heating. **DV**: mass of solid. **Control**: same mass of crystals, same Bunsen flame.',
    '**Safety**: eye protection; **HARMFUL** if swallowed, eye and skin **IRRITANT**; heat gently (strong heating gives toxic fumes); the basin is hot.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: mass of water given off', q: 'Basin 31.42 g; basin + crystals 33.92 g; basin + white solid 33.02 g.',
    steps: [['Crystals', '33.92 − 31.42 = 2.50 g'], ['Answer', 'water lost = 33.92 − 33.02 = **0.90 g**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why must the white powder **cool** before you add water? Why does the temperature **rise** when the water is added?',
  notes: 'QUICK CHECK ANSWER: So that the temperature rise measured is caused by the reaction, not by a hot basin, and so that the water does not boil and spit. The reverse reaction (anhydrous + water → hydrated) is exothermic: it transfers the same amount of energy to the surroundings as the forward reaction took in.\nSUGGESTED PRACTICAL: no OCR PAG covers C6.3. The Combined Science chemistry PAGs are C1 electrolysis, C2 distillation, C3 separation, C4 production of salts (C6.1) and C5 rates (C6.2), see SPEC_C6_1.md. This is a different practical from the C5.1 copper sulfate crystals (PAG C4): here the salt is dehydrated and rehydrated to show a reversible reaction.\nCLEAPSS-style hazards (Hazcard 27C): copper(II) sulfate, hydrated or anhydrous, is HARMFUL if swallowed, causes serious eye irritation and skin irritation, and is very toxic to aquatic life: do not pour down the sink in quantity. Heat gently: above about 600 °C it decomposes, giving toxic sulfur oxides. Hot basin: use tongs, cool on a heat-resistant mat. Adding water to warm anhydrous solid can spit: add drop by drop. Eye protection throughout.\nWorked example values asserted (2.50 g, 0.90 g). Temperature rise 20.5 → 31.0 °C = 10.5 °C (illustrative).',
}), 'Practical: copper(II) sulfate (method)');

// ======================= 7 PRACTICAL: RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C6.3.1')} • table, graph to scale, mass of water and sources of error`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale from the results (illustrative data)');
  const g = { x: 1.45, y: 1.55, w: 5.3, h: 2.75, xmin: 0, xmax: 14, ymin: 1.4, ymax: 2.6, xstep: 2, ystep: 0.2, minor: 2, xlabel: 'Heating time / min', ylabel: 'Mass of solid / g', fmt: v => String(+v.toFixed(1)), yfmt: v => v.toFixed(1) };
  D.axes(s, g);
  line(s, D.px(g, 0), D.py(g, 1.60), D.px(g, 14), D.py(g, 1.60), C.green, 1.25, { dash: 'dash' });
  label(s, D.px(g, 0.2), D.py(g, 1.60) + 0.02, 2.6, 'constant mass 1.60 g (all anhydrous)', { size: 10, bold: true, color: C.green, align: 'left', h: 0.22 });
  D.plotLine(s, g, smooth(PT.map((t, i) => [t, PM[i]])), C.blue, 2);
  D.points(s, g, PT.map((t, i) => [t, PM[i]]), C.ink);
  label(s, D.px(g, 4.3), D.py(g, 2.30), 2.2, 'curve of best fit', { size: 10, bold: true, color: C.blue, align: 'left', h: 0.22 });
  const rows = [[HDR('Time / min'), ...PT.map(v => HDR(String(v)))], [tcell('Mass / g', 0, { bold: true }), ...PM.map(v => tcell(v.toFixed(2), 0))]];
  s.addTable(rows, { x: 0.7, y: 5.1, w: 6.1, colW: [1.3, ...PT.map(() => 0.6)], rowH: 0.25, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.95, 'Worked example: water in the crystals', 'Use the table: start 2.50 g, constant mass 1.60 g.', [
    ['Water lost', '2.50 − 1.60 = 0.90 g'], ['Percentage', '0.90 ÷ 2.50 × 100 = 36%'], ['Answer', '**36%** of the crystals’ mass is water (theory 36.1%)']], { size: 10.5 });
  D.card(s, 7.3, 3.4, 5.58, 2.85, 'Conclusion and errors', [
    'Heating drives the **forward** reaction; water drives the **reverse** reaction: it is **reversible**.',
    'The mass stops falling when **all** the water has gone: heat to **constant mass**.',
    '**Errors**: solid **spits** out (mass too low); not heated to constant mass (too high); powder takes in **moisture** from the air while cooling.',
    '**Improve**: heat gently with a lid; cool in a dry place; repeat and find a **mean**.',
  ], { size: 10.5 });
  D.quickCheck(s, 'How much mass was lost in the **first 2 minutes**? Why does the curve **level off**? What mass of white solid would **5.00 g** of crystals give?');
  D.notes(s, `QUICK CHECK ANSWER: 2.50 − 2.20 = 0.30 g. It levels off because all the water of crystallisation has been driven off, so no more mass can be lost (constant mass, 1.60 g). 5.00 g would give twice as much: 3.20 g (5.00 × 159.6 ÷ 249.6 = 3.197).\nIllustrative data asserted in node: masses never increase; constant at 1.60 g from 10 min; theory 2.50 × 159.6 ÷ 249.6 = ${fmt(sf(2.50 * MR_ANH / MR_HYD, 4))} → 1.60 g (Mr CuSO₄ = 159.6, CuSO₄·5H₂O = 249.6, Ar to 1 d.p.); water 0.90 g = 36.0% (theory 5 × 18.0 ÷ 249.6 = 36.1%). The curve is a smooth curve through the points (Catmull-Rom), axes to scale; the y-axis starts at 1.4 g (marked).\nGRADE 7–9 STRETCH (HT, links C5.2): moles of water 0.90 ÷ 18.0 = 0.0500; moles of CuSO₄ 1.60 ÷ 159.6 = 0.0100; ratio 5.0 : 1, so the formula is CuSO₄·5H₂O.`);
  reg(s, 'Practical: results and analysis');
}

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C6.3.1')} and the practical • reversible reactions`, [
  { q: 'What does the symbol **⇌** in an equation mean?', marks: 2, ms: 'The reaction is reversible (1); it can go in both directions / products can turn back into reactants (1).' },
  { q: 'Blue hydrated copper(II) sulfate is heated. Describe what you would **see**, and what happens when water is **added** to the product.', marks: 2, ms: 'Blue crystals turn to a white powder (and steam is given off) (1); with water the white powder turns blue again and gets hot (1).' },
  { q: 'The forward reaction for dehydrating copper(II) sulfate is **endothermic**. What can you say about the **reverse** reaction? Give evidence from the practical.', marks: 2, ms: 'The reverse reaction is exothermic / transfers the same amount of energy to the surroundings (1); the temperature rose (from 20.5 °C to 31.0 °C) when water was added (1).' },
  { q: 'A student heats crystals until the mass is **constant**. Explain why this is done, and why the white powder is cooled in a **dry** place.', marks: 2, ms: 'Constant mass shows all the water has been removed / the reaction is complete (1); in moist air the reverse reaction happens: the powder takes in water and the mass rises (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 CLOSED SYSTEMS: NOT 100% =======================
{
  const s = D.contentHeader('Why the yield is never 100%', `Specification ${sp('C6.3.1')} • reversible reactions in closed systems do not reach 100% yield`, { tag: 'C6.3.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'particles in a sealed flask; bars drawn to scale');
  label(s, 0.65, 1.42, 2.8, '**Closed system**: sealed flask', { size: 10.5, h: 0.26 });
  flask(s, 2.0, 1.95, 1.9, 2.1, { bung: true, fill: 'F4F8FC' });
  // contents at equilibrium: 7 N2, 21 H2 scaled to 0.70 : 2.10 : 0.60 → draw 7 N2 : 21 H2 : 6 NH3 → too many; use 2 N2 : 6 H2 : 2 NH3 ≈ (simplified)
  [[1.65, 3.05], [2.4, 3.55]].forEach(([x, y]) => diatomic(s, x, y, 'N', 'N', 0.085, { lab: false }));
  [[1.35, 3.6], [2.05, 3.25], [2.65, 3.1], [1.75, 3.6], [2.1, 3.65], [2.75, 3.65]].forEach(([x, y]) => diatomic(s, x, y, 'H', 'H', 0.06, { lab: false }));
  [[1.4, 3.3], [2.35, 2.75]].forEach(([x, y]) => ammonia(s, x, y, 0.07, { lab: false }));
  label(s, 0.65, 3.95, 2.8, 'N₂, H₂ and NH₃ are **all** present', { size: 10, h: 0.26, color: C.ink });
  // legend
  [['N', 'N₂'], ['H', 'H₂']].forEach(([el, t], i) => { diatomic(s, 3.75, 1.95 + i * 0.35, el, el, el === 'N' ? 0.085 : 0.06, { lab: false }); label(s, 4.0, 1.83 + i * 0.35, 0.6, t, { size: 10, h: 0.24, align: 'left' }); });
  ammonia(s, 3.75, 2.68, 0.07, { lab: false }); label(s, 4.0, 2.56, 0.6, 'NH₃', { size: 10, h: 0.24, align: 'left' });
  label(s, 4.6, 1.85, 1.85, 'not all reactants turn into product', { size: 10, italic: true, h: 0.7, color: C.grey, valign: 'top' });
  // bars to scale: max NH3 2.0 mol vs equilibrium 0.60 mol
  const g = { x: 1.25, y: 4.45, w: 4.9, h: 1.0, xmin: 0, xmax: 2.0, ymin: 0, ymax: 2, xstep: 0.5, ystep: 1, grid: false, fmt: v => v.toFixed(1) };
  box(s, g.x, g.y + 0.1, D.px(g, NH3_MAX) - g.x, 0.3, 'E9E0F7', C.blue, { lw: 1 });
  box(s, g.x, g.y + 0.55, D.px(g, NH3_EQ) - g.x, 0.3, '6D8FE0', '2F4F9E', { lw: 1 });
  line(s, g.x, g.y, g.x, g.y + 1.0, C.ink, 1.25);
  label(s, 0.5, g.y + 0.1, 0.72, 'max', { size: 10, bold: true, h: 0.3, align: 'right' });
  label(s, 0.5, g.y + 0.55, 0.72, 'actual', { size: 10, bold: true, h: 0.3, align: 'right' });
  label(s, D.px(g, NH3_MAX) - 1.6, g.y + 0.1, 1.55, '2.0 mol NH₃', { size: 10, bold: true, h: 0.3, align: 'right' });
  label(s, D.px(g, NH3_EQ) + 0.08, g.y + 0.55, 2.4, '0.60 mol NH₃ (30%)', { size: 10, bold: true, h: 0.3, align: 'left', color: '2F4F9E' });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Closed systems', [
    'A **closed system**: no substances can get **in** or **out** (e.g. a sealed container).',
    'As soon as some product forms, the **reverse** reaction starts turning it back into reactants.',
    'So a reversible reaction in a closed system **never** turns all the reactants into products: the **yield** is **less than 100%**.',
    '**Yield**: the amount of product made. In an **open** system a gas can escape, so a reaction such as CaCO₃ → CaO + CO₂ can go to completion.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: how far did it go?', '1.0 mol of N₂ and 3.0 mol of H₂ are sealed in a flask. At the end there is 0.60 mol of NH₃.', [
    ['Maximum', 'N₂ : NH₃ = 1 : 2, so at most 2.0 mol of NH₃'], ['Answer', '0.60 ÷ 2.0 × 100 = **30%** of the maximum']], { size: 10.5 });
  D.quickCheck(s, 'H₂(g) + I₂(g) ⇌ 2HI(g). 1.0 mol of H₂ and 1.0 mol of I₂ are sealed in a flask and **1.56 mol** of HI forms. What is the **maximum**? What **percentage** of it formed?');
  D.notes(s, `QUICK CHECK ANSWER: Maximum = 2.0 mol of HI (1 : 2). 1.56 ÷ 2.0 × 100 = 78%. The reaction is reversible, so some HI is always breaking down again.\nC6.3.1 second part ("reversible reactions (in closed systems) do not reach 100% yield"). Values asserted in node: max 2.0 mol NH₃; 0.60 ÷ 2.0 = 30%; N₂ left ${fmt(N2_EQ)} mol, H₂ left ${fmt(H2_EQ)} mol (the particle picture is simplified, not to scale). Bars drawn to scale (2.0 and 0.60 mol). The ratio work is Foundation-friendly (from the balanced equation); moles calculations in C5.2 are HT. Percentage yield calculations from masses and atom economy are J258 C6.4 (separate only) and are not taught.`);
  reg(s, 'C6.3.1 Closed systems: not 100%');
}

// ======================= 10 DYNAMIC EQUILIBRIUM =======================
{
  const s = D.contentHeader('Dynamic equilibrium', `Specification ${sp('C6.3.2')} • dynamic equilibrium occurs when the rates of the forward and reverse reactions are equal`, { tag: 'C6.3.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'N₂ + 3H₂ ⇌ 2NH₃ in a sealed flask; shapes of the curves are illustrative');
  // graph A: rates
  const ga = { x: 1.25, y: 1.55, w: 4.95, h: 1.55, xmin: 0, xmax: 12, ymin: 0, ymax: 1.0, xstep: 2, ystep: 0.5, grid: true, ylabel: 'Rate', fmt: () => '', yfmt: () => '' };
  D.axes(s, ga);
  const kf = t => 0.4 + 0.6 * Math.exp(-t / 2.2), kr = t => 0.4 * (1 - Math.exp(-t / 2.2));
  D.fnLine(s, ga, kf, 0, 12, 40, C.red, 2);
  D.fnLine(s, ga, kr, 0, 12, 40, C.blue, 2);
  label(s, D.px(ga, 1.6), D.py(ga, 0.9), 2.2, 'forward rate falls', { size: 10, bold: true, color: C.red, align: 'left', h: 0.22 });
  label(s, D.px(ga, 1.3), D.py(ga, 0.12), 2.4, 'reverse rate rises', { size: 10, bold: true, color: C.blue, align: 'left', h: 0.22 });
  label(s, D.px(ga, 8.2), D.py(ga, 0.62), 2.0, 'rates **equal**', { size: 10, bold: true, color: C.green, align: 'left', h: 0.22 });
  label(s, ga.x, ga.y + ga.h + 0.04, ga.w, 'Time', { size: 10, bold: true, h: 0.2 });
  // graph B: amounts
  const gb = { x: 1.25, y: 3.75, w: 4.95, h: 1.55, xmin: 0, xmax: 12, ymin: 0, ymax: 1.0, xstep: 2, ystep: 0.5, grid: true, xlabel: 'Time / min', ylabel: 'Amount / mol', fmt: v => String(v), yfmt: v => v.toFixed(1) };
  D.axes(s, gb);
  D.plotLine(s, gb, smooth(ET.map((t, i) => [t, ENH3[i]])), '2F4F9E', 2);
  D.plotLine(s, gb, smooth(ET.map((t, i) => [t, EN2[i]])), C.orange, 2);
  label(s, D.px(gb, 9.0), D.py(gb, 0.72) - 0.27, 1.0, 'N₂', { size: 10, bold: true, color: C.orange, h: 0.22 });
  label(s, D.px(gb, 9.0), D.py(gb, 0.60) + 0.03, 1.0, 'NH₃', { size: 10, bold: true, color: '2F4F9E', h: 0.22 });
  line(s, D.px(gb, 8), gb.y, D.px(gb, 8), gb.y + gb.h, C.green, 1.25, { dash: 'dash' });
  line(s, D.px(ga, 8), ga.y, D.px(ga, 8), ga.y + ga.h, C.green, 1.25, { dash: 'dash' });
  label(s, D.px(gb, 8) + 0.05, D.py(gb, 0.3), 1.7, 'amounts constant', { size: 10, bold: true, color: C.green, h: 0.22, align: 'left' });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Equilibrium is dynamic', [
    'At the start only the **forward** reaction happens. As products build up, the **reverse** reaction speeds up.',
    '**Dynamic equilibrium**: the forward and reverse reactions happen at the **same rate**.',
    '**Both reactions keep going** (dynamic), but the **amounts** of reactants and products stay **constant**.',
    'It only happens in a **closed system**. The amounts are constant, but usually **not equal**.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: reading the graph', 'When is equilibrium reached? Use the lower graph.', [
    ['Look for', 'the time when the amounts stop changing'], ['Answer', 'at about **8 min**: NH₃ stays at 0.60 mol and N₂ at 0.70 mol']], { size: 10.5 });
  D.quickCheck(s, 'A student says "at equilibrium the reaction has **stopped**, and there are **equal amounts** of reactants and products". Correct **both** mistakes.');
  D.notes(s, 'QUICK CHECK ANSWER: (1) The reaction has not stopped: the forward and reverse reactions are both still happening, at the same rate (dynamic). (2) The amounts are constant, not necessarily equal (here 0.60 mol NH₃ and 0.70 mol N₂ and 2.10 mol H₂).\nC6.3.2 "recall that dynamic equilibrium occurs when the rates of forward and reverse reactions are equal". Lower-graph data asserted in node (NH₃ 0, 0.36, 0.50, 0.57, 0.60, 0.60, 0.60 mol; N₂ = 1.0 − NH₃ ÷ 2), linked to slide 9. The rate curves are qualitative (no scale), drawn as forward 0.4 + 0.6e^(−t/2.2) and reverse 0.4(1 − e^(−t/2.2)); they become equal as equilibrium is reached.\nAnalogy for class: an up and a down escalator with people moving at the same rate: the number on each floor stays constant although people keep moving. Link to C6.2: "rate" here is how fast each reaction goes.');
  reg(s, 'C6.3.2 Dynamic equilibrium');
}

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C6.3.1')}, ${sp('C6.3.2')} • closed systems and dynamic equilibrium`, [
  { q: 'Explain why a reversible reaction in a **closed system** does not reach **100% yield**.', marks: 2, ms: 'As products form, they react to re-form the reactants / the reverse reaction happens (1); so not all reactants can be converted to products (equilibrium is reached with reactants still present) (1).' },
  { q: 'What is meant by **dynamic equilibrium**?', marks: 2, ms: 'The forward and reverse reactions happen at the same rate (1); both reactions are still happening / the amounts of reactants and products stay constant (1).' },
  { q: 'N₂ + 3H₂ ⇌ 2NH₃. **2.0 mol** of N₂ reacts with excess H₂ in a sealed vessel. What is the **maximum** amount of NH₃? Explain why less than this is made.', marks: 2, ms: '4.0 mol (1 : 2 ratio) (1); the reaction is reversible / reaches equilibrium, so some NH₃ breaks down again (1).' },
  { q: 'Calcium carbonate is heated in an **open** tube: CaCO₃ → CaO + CO₂. All of it decomposes. Explain why this reaction **can** go to completion.', marks: 2, ms: 'It is an open system / carbon dioxide gas escapes (1); so CO₂ cannot react with CaO to re-form CaCO₃ (no reverse reaction / no equilibrium) (1).' },
]);
reg(R2.s, 'Recap 2');
calc('R2 Q3 max NH3 from 2.0 mol N2', 2 * 2.0, 4.0, 1e-12);

// ======================= 12 HT CONCENTRATION =======================
reg(D.contentSlide({
  title: 'Changing concentration',
  subtitle: `Specification ${sp('C6.3.3')} • predict the effect of changing concentration on the position of equilibrium`,
  tag: 'C6.3.3', ht: true, caption: 'test tubes of the same equilibrium mixture; colours as seen',
  draw: (s) => {
    eqn(s, 0.7, 1.45, 5.6, 'Fe³⁺(aq) + SCN⁻(aq) ⇌ FeSCN²⁺(aq)', { size: 12, h: 0.4 });
    label(s, 0.7, 1.88, 5.6, 'Fe³⁺ pale yellow  •  SCN⁻ colourless  •  FeSCN²⁺ blood red', { size: 10, italic: true, color: C.grey, h: 0.24 });
    const tubes = [[1.35, 'A61E1E', 'add more Fe³⁺', 'deeper red', 'shifts **right**'], [3.15, 'D9694F', 'equilibrium mixture', 'orange-red', 'start'], [4.95, 'EDB27A', 'remove Fe³⁺', 'paler', 'shifts **left**']];
    tubes.forEach(([cx, col, t1, t2, t3], i) => {
      const tw = 0.5, ty = 2.7, th = 2.0;
      label(s, cx - 0.85, 2.2, 1.7, `**${t1}**`, { size: 10, h: 0.42, color: i === 1 ? C.ink : C.red });
      box(s, cx - tw / 2 + 0.02, ty + 0.6, tw - 0.04, th - 0.6 - tw / 2, col, null);
      ball(s, cx, ty + th - tw / 2, tw / 2 - 0.02, col, col, 0.5);
      line(s, cx - tw / 2, ty, cx - tw / 2, ty + th - tw / 2, C.ink, 1.25); line(s, cx + tw / 2, ty, cx + tw / 2, ty + th - tw / 2, C.ink, 1.25);
      s.addShape(SH.ARC, { x: cx - tw / 2, y: ty + th - tw, w: tw, h: tw, angleRange: [0, 180], line: { color: C.ink, width: 1.25 }, fill: { type: 'none' } });
      label(s, cx - 0.85, 4.8, 1.7, t2, { size: 10, h: 0.24, italic: true });
      label(s, cx - 0.85, 5.05, 1.7, t3, { size: 10.5, h: 0.26, color: i === 1 ? C.grey : C.ink });
    });
    arrow(s, 2.6, 3.7, 1.9, 3.7, C.red, 2); arrow(s, 3.7, 3.7, 4.4, 3.7, C.red, 2);
    label(s, 0.7, 5.42, 5.6, 'The equilibrium shifts to **use up** what is added, or **replace** what is removed', { size: 10.5, h: 0.4, color: C.ink });
  },
  head: 'Le Chatelier’s principle',
  lines: [
    'The **position of equilibrium** tells you how much of the mixture is products compared with reactants.',
    'If a condition is changed, the position of equilibrium **shifts to oppose the change**.',
    '**Add more of a reactant**: the equilibrium shifts **right**, making **more product**.',
    '**Remove a product** as it forms: the equilibrium shifts **right**, making more product.',
    'Add more product, or remove a reactant: it shifts **left**.',
  ],
  size: 11,
  worked: { head: 'Worked example: removing a product', q: 'N₂ + 3H₂ ⇌ 2NH₃. Ammonia is cooled and removed as a liquid.',
    steps: [['Change', 'less NH₃ in the mixture'], ['Answer', 'equilibrium shifts **right** to replace it: **more NH₃** is made']], size: 10.5 },
  workedH: 1.35,
  qc: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g). Predict the effect on the amount of **SO₃** of (a) adding **more oxygen**, (b) **removing SO₃** as it forms.',
  notes: 'QUICK CHECK ANSWER: (a) The equilibrium shifts right to use up the extra oxygen, so more SO₃ forms. (b) It shifts right to replace the SO₃, so more SO₃ is made overall.\nHT ONLY (C6.3.3; HT marker UNVERIFIED for J260, see SPEC). Equations atom- and charge-balanced in node (Fe³⁺ + SCN⁻: charge +3 − 1 = +2).\nDemonstration (RSC-style "effect of concentration on equilibrium"): dilute iron(III) chloride and potassium thiocyanate solutions. CLEAPSS-style hazards: iron(III) chloride solution (dilute, about 0.1 mol/dm³) is an eye and skin IRRITANT; potassium thiocyanate (solid HARMFUL; contact with acids gives very toxic gas: keep away from acids); dilute solutions are LOW HAZARD; wear eye protection. Fe³⁺ can be removed by adding a little sodium fluoride or disodium hydrogenphosphate solution (teacher choice); the colour goes paler.\nThe name "Le Chatelier" is helpful but students can simply state that the equilibrium shifts to oppose the change.',
}), 'C6.3.3 Concentration (HT)');

// ======================= 13 HT TEMPERATURE =======================
reg(D.contentSlide({
  title: 'Changing temperature',
  subtitle: `Specification ${sp('C6.3.3')} • predict the effect of changing temperature on the position of equilibrium`,
  tag: 'C6.3.3', ht: true, caption: 'three sealed tubes of the same NO₂ / N₂O₄ mixture; teacher demonstration',
  draw: (s) => {
    eqn(s, 0.7, 1.45, 5.6, '2NO₂(g) ⇌ N₂O₄(g)   forward: exothermic', { size: 12, h: 0.4 });
    label(s, 0.7, 1.88, 5.6, 'NO₂ brown  •  N₂O₄ colourless', { size: 10, italic: true, color: C.grey, h: 0.24 });
    const T3 = [[1.35, 'ice, 0 °C', 'D7EAF7', 82, 'paler: more N₂O₄'], [3.15, 'room, 20 °C', null, 55, 'brown'], [4.95, 'hot water, 80 °C', 'F8D7C8', 20, 'darker: more NO₂']];
    T3.forEach(([cx, t, bath, tr, res]) => {
      label(s, cx - 0.85, 2.2, 1.7, `**${t}**`, { size: 10, h: 0.26 });
      if (bath) beaker(s, cx - 0.7, 2.75, 1.4, 1.95, bath);
      sealedTube(s, cx - 0.22, 2.55, 0.44, 1.95, tr);
      label(s, cx - 0.85, 4.85, 1.7, res, { size: 10, h: 0.26, bold: true });
    });
    pbox(s, 0.75, 5.25, 5.5, 0.55, 'Heating favours the **endothermic** direction (here, **left**)', HT_FILL, C.red, { size: 11, lw: 1 });
  },
  head: 'Temperature and the energy change',
  lines: [
    'First decide whether the **forward** reaction is **exothermic** or **endothermic**.',
    '**Increase** the temperature: the equilibrium shifts in the **endothermic** direction (it takes in the extra energy).',
    '**Decrease** the temperature: the equilibrium shifts in the **exothermic** direction.',
    'If the forward reaction is exothermic, a **lower** temperature gives **more product**.',
  ],
  size: 11,
  worked: { head: 'Worked example: the Haber process', q: 'N₂ + 3H₂ ⇌ 2NH₃. The forward reaction is exothermic.',
    steps: [['Lower T', 'favours the exothermic (forward) direction'], ['Answer', 'a **lower temperature** gives a **higher yield** of NH₃']], size: 10.5 },
  workedH: 1.45,
  qc: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g). The forward reaction is **endothermic**. What happens to the amount of **hydrogen** if the temperature is **raised**? Explain.',
  notes: 'QUICK CHECK ANSWER: More hydrogen. Raising the temperature shifts the equilibrium in the endothermic direction, which is the forward direction here (to the right).\nHT ONLY (C6.3.3). Equations atom-balanced in node. The tube colours are drawn as brown with decreasing transparency (ice palest, hot darkest).\nDEMONSTRATION ONLY: nitrogen dioxide is VERY TOXIC by inhalation (CLEAPSS: fatal if inhaled). Use commercially sealed tubes or tubes prepared and sealed by a technician following CLEAPSS guidance; check for cracks before use; do not heat directly in a flame (use a beaker of hot water). Eye protection.\nCommon error: saying "heating shifts it right" without checking whether the forward reaction is exothermic or endothermic.',
}), 'C6.3.3 Temperature (HT)');

// ======================= 14 RECAP 3 (HT) =======================
const R3 = D.recapSlide(3, `Specification ${sp('C6.3.3')} • concentration and temperature`, [
  { q: 'State what happens to the **position of equilibrium** when a condition is changed.', marks: 2, ht: true, ms: 'The position of equilibrium shifts / moves (1); in the direction that opposes / counteracts the change (1).' },
  { q: 'C₂H₄(g) + H₂O(g) ⇌ C₂H₅OH(g). Predict and explain the effect on the amount of **ethanol** of adding **more steam**.', marks: 2, ht: true, ms: 'More ethanol / equilibrium shifts right (1); to use up the added steam (water) (1).' },
  { q: '2NO₂(g) ⇌ N₂O₄(g). A sealed tube goes **darker brown** in hot water. Use this to decide whether the **forward** reaction is exothermic or endothermic.', marks: 2, ht: true, ms: 'Heating shifts the equilibrium left / more NO₂ forms (1); heating favours the endothermic direction, so the reverse is endothermic and the forward is exothermic (1).' },
  { q: 'CO(g) + 2H₂(g) ⇌ CH₃OH(g). The forward reaction is **exothermic**. Suggest a temperature change that gives **more methanol** and explain why.', marks: 2, ht: true, ms: 'Lower temperature (1); a decrease in temperature favours the exothermic / forward direction (1).' },
], { ht: true });
reg(R3.s, 'Recap 3 (HT)');

// ======================= 15 HT PRESSURE =======================
{
  const s = D.contentHeader('Changing pressure', `Specification ${sp('C6.3.3')} • predict the effect of changing pressure on the position of equilibrium of gases`, { ht: true, tag: 'C6.3.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'a gas syringe of NO₂ / N₂O₄ before and after it is compressed; molecules counted');
  eqn(s, 0.7, 1.45, 5.6, '2NO₂(g) ⇌ N₂O₄(g)      2 molecules ⇌ 1 molecule', { size: 11.5, h: 0.4 });
  const draw = (y, x, w, pxI, q, title, pos) => {
    label(s, 0.7, y - 0.3, 5.6, title, { size: 10.5, h: 0.26, align: 'left' });
    syringe(s, x, y, w, 0.95, pxI, 2.6);
    pos.forEach(([a, b], i) => { if (i < q.NO2) no2(s, a, b, 0.06); else n2o4(s, a, b, 0.06); });
  };
  draw(2.35, 0.95, 2.6, 3.4, SYR1, '**Before**: 6 NO₂ + 2 N₂O₄ = **8** molecules', [[1.25, 2.6], [1.75, 2.95], [2.2, 2.55], [2.75, 3.0], [3.15, 2.6], [1.3, 3.05], [2.3, 3.0], [2.75, 2.58]]);
  draw(3.85, 0.95, 2.6, 2.45, SYR2, '**After pushing in**: 2 NO₂ + 4 N₂O₄ = **6** molecules', [[1.3, 4.1], [2.15, 4.5], [1.72, 4.1], [2.15, 4.1], [1.3, 4.5], [1.72, 4.5]]);
  arrow(s, 6.3, 3.63, 5.25, 3.63, C.red, 2);
  label(s, 4.0, 3.5, 1.15, 'push plunger', { size: 10, bold: true, color: C.red, h: 0.26, align: 'right' });
  pbox(s, 0.75, 5.1, 5.5, 0.62, 'Higher pressure: the mixture shifts to the side with **fewer gas molecules** (here, **right**: paler)', HT_FILL, C.red, { size: 10.5, lw: 1 });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Count the gas molecules', [
    'Pressure only matters for reactions with **gases**. Count the **gas molecules** on each side using the balancing numbers.',
    '**Increase** the pressure: shifts to the side with **fewer** gas molecules. **Decrease** it: shifts to the side with **more**.',
    'Same number on each side (e.g. H₂ + I₂ ⇌ 2HI): pressure has **no effect** on the position.',
    'A **catalyst** does **not** change the position or the yield: it only makes equilibrium happen **sooner** (C6.2).',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: ammonia', 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g). Effect of high pressure?', [
    ['Count', 'left 1 + 3 = **4** molecules; right **2** molecules'], ['Answer', 'high pressure shifts **right** (fewer molecules): **more NH₃**']], { size: 10.5 });
  D.quickCheck(s, 'Predict the effect of **increasing the pressure** on the yield of product: (a) H₂(g) + I₂(g) ⇌ 2HI(g); (b) C₂H₄(g) + H₂O(g) ⇌ C₂H₅OH(g).');
  D.notes(s, 'QUICK CHECK ANSWER: (a) No effect: 2 gas molecules on each side. (b) More ethanol: 2 gas molecules on the left, 1 on the right, so higher pressure shifts the equilibrium right.\nHT ONLY (C6.3.3). Molecule counts computed in node from the balanced equations (Haber 4 → 2; NO₂ 2 → 1; HI 2 → 2; ethanol 2 → 1; SO₃ 3 → 2; methanol 3 → 1). Syringe particle picture asserted: before 6 NO₂ + 2 N₂O₄ (N 10, O 20) = after 2 NO₂ + 4 N₂O₄ (N 10, O 20), so atoms are conserved while the number of molecules falls from 8 to 6.\nDemonstration note: when the syringe is first compressed the colour darkens (same molecules in less space), then becomes paler as the equilibrium shifts right. Nitrogen dioxide VERY TOXIC: sealed apparatus, teacher demonstration only.\nThe catalyst line is a link to C6.2 only; how catalysts work is taught in C6.2.');
  reg(s, 'C6.3.3 Pressure (HT)');
}

// ======================= 16 HT CHOOSING CONDITIONS =======================
{
  const s = D.contentHeader('Choosing conditions for most product', `Specification ${sp('C6.3.3')} • suggest conditions to produce as much of a product as possible`, { ht: true, tag: 'C6.3.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'illustrative values, rounded from published curves');
  const g = { x: 1.3, y: 1.55, w: 4.95, h: 3.4, xmin: 0, xmax: 400, ymin: 0, ymax: 70, xstep: 100, ystep: 10, minor: 2, xlabel: 'Pressure / atmospheres', ylabel: 'NH₃ at equilibrium / %', fmt: v => String(v), yfmt: v => String(v) };
  D.axes(s, g);
  const col = { 350: '2F4F9E', 450: C.orange, 550: C.red };
  Object.entries(HY).forEach(([t, ys]) => {
    D.plotLine(s, g, smooth(HP.map((p, i) => [p, ys[i]])), col[t], 2);
    D.points(s, g, HP.map((p, i) => [p, ys[i]]), col[t]);
    label(s, D.px(g, 400) - 1.05, D.py(g, ys[4]) - 0.3, 1.0, `${t} °C`, { size: 10, bold: true, color: col[t], h: 0.22, align: 'right' });
  });
  line(s, D.px(g, 200), D.py(g, 0), D.px(g, 200), D.py(g, HY[350][2]), C.grey, 1, { dash: 'dash' });
  label(s, 0.7, 5.42, 5.6, 'Most NH₃: **high pressure** and **low temperature**', { size: 11, h: 0.3, color: C.ink, bold: true });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Putting the rules together', [
    'Use the balanced equation: count **gas molecules** and check whether the forward reaction is **exo-** or **endothermic**.',
    'For N₂ + 3H₂ ⇌ 2NH₃ (exothermic, 4 → 2 molecules): **high pressure**, **low temperature**, and **remove NH₃** as it forms.',
    'The graph agrees: yield **rises** with pressure and **falls** with temperature.',
    '**GRADE 7–9 STRETCH**: a low temperature is **slow**, and very high pressure is costly and dangerous, so industry uses a **compromise**.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: reading the graph', 'Percentage of NH₃ at 200 atm at 350 °C and at 450 °C?', [
    ['Read up', 'from 200 atm to each curve, then across'], ['Answer', '350 °C: **50%**; 450 °C: **28%**: lower temperature, more NH₃']], { size: 10.5 });
  D.quickCheck(s, 'Which conditions **on the graph** give the **highest** percentage of NH₃? Read the value at **550 °C and 400 atm**. Explain the effect of **pressure** using molecules.');
  D.notes(s, 'QUICK CHECK ANSWER: 350 °C and 400 atm (about 64%). At 550 °C and 400 atm: about 22%. There are 4 gas molecules on the left and 2 on the right, so a higher pressure shifts the equilibrium to the right (fewer molecules), giving more ammonia.\nHT ONLY (C6.3.3 "suggest appropriate conditions to produce as much of a particular product as possible"). Graph data are ILLUSTRATIVE, rounded to whole percentages from the shape of commonly published Haber equilibrium curves, and asserted in node to rise with pressure and fall with temperature (350 °C: 25, 37, 50, 58, 64%; 450 °C: 9, 16, 28, 36, 42%; 550 °C: 4, 7, 13, 18, 22% at 50, 100, 200, 300, 400 atm). Plotted to scale with smooth curves through the points.\nThe rate–yield compromise (about 450 °C, about 200 atm, iron catalyst) belongs to J258 C6.4 (separate only), so it appears only as a GRADE 7–9 STRETCH line and is not examined here (UNVERIFIED whether J260 C6.3 expects it).');
  reg(s, 'C6.3.3 Choosing conditions (HT)');
}

// ======================= 17 RECAP 4 (HT) =======================
const R4 = D.recapSlide(4, `Specification ${sp('C6.3.3')} • pressure and choosing conditions`, [
  { q: '2SO₂(g) + O₂(g) ⇌ 2SO₃(g). Explain the effect of **increasing the pressure** on the amount of SO₃.', marks: 2, ht: true, ms: '3 gas molecules on the left, 2 on the right (1); so the equilibrium shifts right / to fewer molecules, giving more SO₃ (1).' },
  { q: 'H₂(g) + I₂(g) ⇌ 2HI(g). Explain why changing the **pressure** has **no effect** on the yield of HI.', marks: 2, ht: true, ms: 'Same number of gas molecules on each side / 2 and 2 (1); so neither direction reduces the number of molecules / the position does not change (1).' },
  { q: 'A **catalyst** is added to a reaction at equilibrium. State its effect on the **yield** and on the **time** taken to reach equilibrium.', marks: 2, ht: true, ms: 'No change to the yield / position of equilibrium (1); equilibrium is reached faster / sooner (1).' },
  { q: 'Use the ammonia graph: by how much does the percentage of NH₃ at **450 °C** rise from **100 atm** to **300 atm**? Explain the trend.', marks: 2, ht: true, ms: '36 − 16 = 20 (percentage points) (1); higher pressure favours the side with fewer gas molecules (4 → 2), the ammonia side (1).' },
], { ht: true });
reg(R4.s, 'Recap 4 (HT)');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Reversible reaction', 'A reaction that can go forwards and backwards, depending on the conditions.'],
  ['⇌', 'The symbol for a reversible reaction.'],
  ['Forward reaction', 'Reactants → products (left to right in the equation).'],
  ['Reverse reaction', 'Products → reactants (right to left in the equation).'],
  ['Closed system', 'Nothing can get in or out, e.g. a sealed container.'],
  ['Yield', 'The amount of product made in a reaction.'],
  ['Dynamic equilibrium', 'Forward and reverse reactions happen at the same rate; amounts stay constant.'],
  ['Hydrated', 'Containing water in the crystals, e.g. blue copper(II) sulfate.'],
  ['Anhydrous', 'Without water, e.g. white copper(II) sulfate.'],
  ['Exothermic', 'Transfers energy to the surroundings: the temperature rises.'],
  ['Endothermic', 'Takes in energy from the surroundings: the temperature falls.'],
  ['Constant mass', 'Heating and weighing again until the mass stops changing.'],
  ['Position of equilibrium (HT)', 'How much of the equilibrium mixture is products compared with reactants.'],
  ['Le Chatelier’s principle (HT)', 'If conditions change, the equilibrium shifts to oppose the change.'],
  ['Gas molecules (HT)', 'Higher pressure favours the side with fewer gas molecules.'],
  ['Catalyst', 'Speeds up both reactions equally: equilibrium is reached sooner, yield unchanged.'],
], { notes: 'Use as a cover-and-recall activity. Terms marked (HT) are Higher tier only. Rate words (collision, activation energy) belong to C6.2; atom economy and percentage yield calculations belong to J258 C6.4 and are not included.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('Sulfur trioxide is made from sulfur dioxide and oxygen in a **closed** reactor: **2SO₂(g) + O₂(g) ⇌ 2SO₃(g)**. The forward reaction is **exothermic**. At 1 atm, the percentage of SO₃ at equilibrium is **98%** at 400 °C and **76%** at 600 °C.', [
  { l: 'a', q: 'What does the symbol **⇌** tell you about this reaction?', marks: 1, ms: 'The reaction is reversible / can go in both directions (1).', h: 0.75 },
  { l: 'b', q: 'Explain why the yield of SO₃ is **less than 100%** in the closed reactor.', marks: 2, ms: 'The reaction is reversible / SO₃ breaks down into SO₂ and O₂ (1); in a closed system equilibrium is reached with some reactants still present (1).', h: 1.0 },
  { l: 'c', q: 'The mixture reaches **dynamic equilibrium**. Describe what is happening to the **forward** and **reverse** reactions, and to the **amount** of SO₃.', marks: 2, ms: 'Forward and reverse reactions both continue at the same rate (1); the amount of SO₃ stays constant (1).', h: 1.1 },
  { l: 'd', q: 'Predict and explain the effect of **increasing the pressure** on the amount of SO₃ at equilibrium.', marks: 3, ht: true, ms: 'More SO₃ / equilibrium shifts right (1); there are 3 gas molecules on the left and 2 on the right (1); higher pressure favours the side with fewer gas molecules (1).', h: 1.2 },
  { l: 'e', q: 'Use the data to describe the effect of **temperature** on the yield, and explain it in terms of the **energy change**.', marks: 3, ht: true, ms: 'Higher temperature gives less SO₃ (98% → 76%, a fall of 22 percentage points) (1); increasing temperature shifts the equilibrium in the endothermic direction (1); the reverse reaction is endothermic, so the equilibrium shifts left (1).', h: 1.2 },
  { l: 'f', q: 'A catalyst of vanadium(V) oxide is used. State its effect on the **yield** of SO₃ and on the **time** to reach equilibrium.', marks: 2, ms: 'No effect on the yield / position of equilibrium (1); equilibrium is reached faster (1).', h: 1.0 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (d) and (e) are HT • data illustrative` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Weigh an empty evaporating basin; add blue hydrated copper(II) sulfate and reweigh.',
    'Heat gently (Bunsen, tripod, gauze), stirring; cool and reweigh every few minutes; repeat until constant mass.',
    'Observations: blue crystals turn to a white powder; steam / water vapour is given off; the mass decreases.',
    'Cool the white powder fully, add water drop by drop, measure the temperature with a thermometer.',
    'Observations: the powder turns blue again; the temperature rises (it gets hot), so the reverse reaction is exothermic and the forward reaction is endothermic.',
    'This shows the reaction is reversible: CuSO₄·5H₂O ⇌ CuSO₄ + 5H₂O; changing the conditions (heating or adding water) changes the direction.',
    'Safety: eye protection; copper(II) sulfate is harmful if swallowed and an irritant; heat gently to avoid spitting and decomposition; hot basin, use tongs; add water slowly.',
  ], {
    l3: 'Describes a clear, safe method for BOTH directions (heating to constant mass AND adding water with a temperature measurement) AND gives the observations AND explains how they show the reaction is reversible, including the energy changes.',
    l2: 'Describes a method for both directions with some observations, OR one direction in detail with an explanation of reversibility.',
    l1: 'Simple statements, e.g. "heat the crystals and they go white" or "add water and it goes blue".',
  });
}
const HW = [
  { n: '1', q: 'What is a **reversible reaction**?', marks: 1, ms: 'A reaction that can go in both directions / where the products can react to re-form the reactants (1).', h: 0.8 },
  { n: '2', q: 'Explain why a reversible reaction in a **closed system** cannot reach **100% yield**.', marks: 2, ms: 'Products react to re-form reactants / the reverse reaction happens (1); so equilibrium is reached with some reactants left (1).' },
  { n: '3', q: 'Describe **two** features of a mixture at **dynamic equilibrium**.', marks: 2, ms: 'Forward and reverse reactions happen at the same rate (1); amounts / concentrations of reactants and products stay constant (and it is in a closed system) (1).' },
  { n: '4', q: 'CO(g) + 2H₂(g) ⇌ CH₃OH(g). Predict the effect of **increasing the pressure** on the yield of methanol. Explain your answer.', marks: 2, ht: true, ms: 'More methanol / shifts right (1); 3 gas molecules on the left and 1 on the right, so it shifts to fewer molecules (1).', h: 1.15 },
  { n: '5', q: 'CH₄(g) + H₂O(g) ⇌ CO(g) + 3H₂(g). The forward reaction is **endothermic**. Suggest a **temperature** and a **pressure** that give as much **hydrogen** as possible.', marks: 2, ht: true, ms: 'High temperature, because it favours the endothermic / forward direction (1); low pressure, because the right has more gas molecules (4 vs 2) (1).', h: 1.15 },
  { n: '6', q: 'A student says that adding a **catalyst** increases the **yield** of ammonia. Is the student correct? Explain.', marks: 2, ms: 'No (1); a catalyst speeds up the forward and reverse reactions equally, so equilibrium is reached sooner but the position / yield is unchanged (1).' },
  { n: '7', q: 'Describe how you could show that the reaction of **hydrated copper(II) sulfate** is **reversible**. Include the observations you would expect and what they show about the **energy changes**.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q4 and Q5 are Higher tier.', HW, 17, { dividerSub: 'C6.3 Equilibrium and yield • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4].forEach(r => assert.strictEqual(r.total, 8));
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C6.3') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom-balanced`);
const out = path.join(__dirname, 'OCR21C_C6.3_EquilibriumYield_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
