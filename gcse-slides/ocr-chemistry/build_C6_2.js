// build_C6_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C6 Making useful chemicals, C6.2 How do chemists control the rate of reactions?
// (one deck, Higher & Foundation; Part 2 of 3)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C6_2.js
// Structure copied from build_C5_2.js (approved, same template). ocr_chem_template.js is NOT edited: flask, balance,
// gas syringe, trough, cube, particle-box and reaction-profile helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C6_2.md): measuring rates (methods, graphs, mean rate, HT tangents), effect of temperature,
// concentration, pressure and surface area (collision theory, SA:V), catalysts, activation energy, enzymes,
// PAG C5 measuring rates of reaction (gas syringe: concentration; disappearing cross: temperature).
// NOT taught: acids and salts (C6.1, recap only), reversible reactions / equilibrium / yield (C6.3),
// industrial-scale production (J258 C6.4, separate only).
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C6', chapterTitle: 'Making useful chemicals', code: 'C6.2', title: 'How do chemists control the rate of reactions?',
  part: 2, parts: 3, specRange: 'C6.2.1–C6.2.10',
  subtitle: 'How do chemists control the rate of reactions?',
  keywords: ['Rate of reaction', 'Collision theory', 'Surface area to volume', 'Catalyst', 'Activation energy'],
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
balanced('Mg + 2HCl → MgCl2 + H2', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
balanced('CaCO3 + 2HCl → CaCl2 + H2O + CO2', [[1, 'CaCO3'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']]);
balanced('2H2O2 → 2H2O + O2', [[2, 'H2O2']], [[2, 'H2O'], [1, 'O2']]);
balanced('Na2S2O3 + 2HCl → 2NaCl + H2O + SO2 + S', [[1, 'Na2S2O3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'H2O'], [1, 'SO2'], [1, 'S']]);
balanced('2CO + 2NO → 2CO2 + N2', [[2, 'CO'], [2, 'NO']], [[2, 'CO2'], [1, 'N2']]);
balanced('Zn + H2SO4 → ZnSO4 + H2', [[1, 'Zn'], [1, 'H2SO4']], [[1, 'ZnSO4'], [1, 'H2']]);
balanced('starter: CH4 + 2O2 → CO2 + 2H2O', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]);
assert.throws(() => balanced('unbalanced test', [[1, 'H2O2']], [[1, 'H2O'], [1, 'O2']]));
assert.throws(() => balanced('unbalanced test 2', [[1, 'Mg'], [1, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]));

// ======================= Ar (OCR data sheet, 1 d.p.) =======================
const AR = { H: 1.0, C: 12.0, O: 16.0, Mg: 24.3, Ca: 40.1, Cl: 35.5 };
const r1 = v => Math.round(v * 10) / 10;
const r2 = v => Math.round(v * 100) / 100;
const MR_CO2 = calc('Mr CO2', r1(AR.C + 2 * AR.O), 44.0, 1e-9);
const MR_H2 = calc('Mr H2', 2 * AR.H, 2.0, 1e-9);

// ======================= DATA MODELS (illustrative; every table value asserted) =======================
// gas syringe, Mg + HCl: V = 40(1 − e^(−kt)); k = 0.050 /s at 1.0 mol/dm³, 0.025 /s at 0.50 mol/dm³
const VMAX = 40;
const Vt = (k, t) => VMAX * (1 - Math.exp(-k * t));
const K1 = 0.050, K05 = 0.025;
const TT = [0, 10, 20, 30, 40, 60, 80, 100, 120];
const V1 = TT.map(t => Math.round(Vt(K1, t)));
const V05 = TT.map(t => Math.round(Vt(K05, t)));
assert.deepStrictEqual(V1, [0, 16, 25, 31, 35, 38, 39, 40, 40]);
assert.deepStrictEqual(V05, [0, 9, 16, 21, 25, 31, 35, 37, 38]);
const V05REC = V05.slice(); V05REC[4] = 21;   // anomaly: plunger stuck at 40 s
assert(Vt(K05, 40) - V05REC[4] > 3, '0.50 M 40 s reading is the anomaly');
// tangent at 20 s on the 1.0 mol/dm³ curve (HT)
const TAN_T = 20, TAN_G = VMAX * K1 * Math.exp(-K1 * TAN_T), TAN_V = Vt(K1, TAN_T);
const TAN0 = TAN_V - TAN_G * TAN_T, TAN40 = TAN_V + TAN_G * 20;
calc('tangent at 20 s meets t = 0 (1 d.p.)', r1(TAN0), 10.6, 1e-9);
calc('tangent at 20 s at t = 40 (1 d.p.)', r1(TAN40), 40.0, 1e-9);
calc('tangent gradient from points (0,10.6),(40,40.0)', (40.0 - 10.6) / 40, 0.735, 1e-9);
calc('tangent gradient 2 s.f. (half up)', Math.round((40.0 - 10.6) / 40 * 100 + 1e-9) / 100, 0.74, 1e-12);
calc('true gradient at 20 s 2 s.f.', sf(TAN_G, 2), 0.74, 1e-12);
calc('initial rate 1.0 M (tangent at 0)', VMAX * K1, 2.0, 1e-12);
calc('initial rate 0.50 M (tangent at 0)', VMAX * K05, 1.0, 1e-12);
calc('QC HT tangent at 0 through (20, 40)', 40 / 20, 2.0, 1e-12);
// slide 7 mean rates on the same curve
calc('mean rate 1.0 M first 30 s 2 s.f.', sf(V1[3] / 30, 2), 1.0, 1e-12);
calc('mean rate 1.0 M first 20 s 2 s.f.', sf(V1[2] / 20, 2), 1.3, 1e-12);
calc('mean rate 0.50 M first 20 s', V05[2] / 20, 0.80, 1e-12);
calc('mean rate 1.0 M whole reaction to 100 s', V1[7] / 100, 0.40, 1e-12);
// marble chips mass loss: m = 2.20(1 − e^(−t/60)) g of CO2
const MT = [0, 30, 60, 90, 120, 180, 240, 300];
const ML = MT.map(t => r2(2.20 * (1 - Math.exp(-t / 60))));
assert.deepStrictEqual(ML, [0, 0.87, 1.39, 1.71, 1.9, 2.09, 2.16, 2.19]);
calc('mean rate CO2 first 60 s 2 s.f.', sf(ML[2] / 60, 2), 0.023, 1e-12);
calc('QC mean rate 0–30 s 2 s.f.', sf(ML[1] / 30, 2), 0.029, 1e-12);
calc('mean rate whole 300 s 2 s.f.', sf(ML[7] / 300, 2), 0.0073, 1e-12);
calc('HT CO2 moles in 1.39 g', sf(1.39 / MR_CO2, 3), 0.0316, 1e-12);
calc('HT mean rate first 60 s mol/s 2 s.f.', sf(1.39 / MR_CO2 / 60, 2), 5.3e-4, 1e-12);
// slide 5: H2 mass from 0.040 g Mg is too small for a 0.01 g balance
calc('H2 from 0.040 g Mg (g, 2 s.f.)', sf(0.040 / AR.Mg * MR_H2, 2), 0.0033, 1e-12);
assert(0.040 / AR.Mg * MR_H2 < 0.005, 'H2 mass below balance resolution');
// SA:V cubes
const cubeSA = a => 6 * a * a, cubeV = a => a ** 3;
calc('2 cm cube SA', cubeSA(2), 24); calc('2 cm cube V', cubeV(2), 8); calc('2 cm cube SA:V', cubeSA(2) / cubeV(2), 3);
calc('8 × 1 cm cubes SA', 8 * cubeSA(1), 48); calc('8 × 1 cm cubes V', 8 * cubeV(1), 8); calc('8 × 1 cm cubes SA:V', 8 * cubeSA(1) / (8 * cubeV(1)), 6);
calc('QC 4 cm cube SA:V', cubeSA(4) / cubeV(4), 1.5); calc('QC 4 cm → 8 × 2 cm SA:V', 8 * cubeSA(2) / (8 * cubeV(2)), 3);
calc('QC 4 cm → 8 × 2 cm total SA', 8 * cubeSA(2), 192);
calc('0.1 cm powder SA:V', cubeSA(0.1) / cubeV(0.1), 60, 1e-9);
// reaction profile (illustrative kJ)
const RP = { R: 100, P: 40, peak: 180, peakCat: 140 };
calc('Ea uncatalysed', RP.peak - RP.R, 80); calc('Ea catalysed', RP.peakCat - RP.R, 40); calc('energy released', RP.R - RP.P, 60);
calc('Ea halved by catalyst', (RP.peakCat - RP.R) / (RP.peak - RP.R), 0.5, 1e-12);
// catalyst mass
calc('MnO2 mass unchanged 0.50 − 0.50', r2(0.50 - 0.50), 0);
// disappearing cross (temperature)
const DT = [20, 30, 40, 50];
const DREP = [[98, 95, 101], [52, 49, 55], [27, 36, 29], [15, 16, 14]];
const DANOM = [2, 1];
const DMEAN = DREP.map((r, i) => { const use = r.filter((_, j) => !(i === DANOM[0] && j === DANOM[1])); return Math.round(use.reduce((a, b) => a + b, 0) / use.length); });
assert.deepStrictEqual(DMEAN, [98, 52, 28, 15]);
const DRATE = DMEAN.map(t => r1(1000 / t));
assert.deepStrictEqual(DRATE, [10.2, 19.2, 35.7, 66.7]);
const FB = Math.log(DRATE[3] / DRATE[0]) / 30, FA = DRATE[0] / Math.exp(FB * 20);
DT.forEach((Tc, i) => assert(Math.abs(FA * Math.exp(FB * Tc) - DRATE[i]) / DRATE[i] < 0.03, 'fit within 3% at ' + Tc));
calc('40 °C mean ignoring 36 s', (27 + 29) / 2, 28);
calc('40 °C mean with anomaly (1 d.p.)', r1((27 + 36 + 29) / 3), 30.7, 1e-9);
calc('rate ratio 30→20 °C (1 d.p.)', r1(DRATE[1] / DRATE[0]), 1.9, 1e-9);
calc('QC read curve at 45 °C (2 s.f.)', sf(FA * Math.exp(FB * 45), 2), 49, 1e-9);
calc('QC time at 45 °C ≈ 1000/49 (2 s.f.)', sf(1000 / 49, 2), 20, 1e-9);
// PAG C5 Mg + HCl acid in excess check
const nMg = 0.040 / AR.Mg;
assert(0.050 * 0.50 > 2 * nMg, 'acid in excess at 0.50 mol/dm³');
calc('teacher check: 0.040 g Mg → H2 at RTP (cm³, 2 s.f.)', sf(nMg * 24000, 2), 40, 1e-9);
// recaps
calc('R1 Q2 48 cm³ in 60 s', 48 / 60, 0.80, 1e-12);
calc('R1 Q4 HT tangent (10,12)–(50,44)', (44 - 12) / (50 - 10), 0.80, 1e-12);
calc('R2 Q3 3 cm cube SA', cubeSA(3), 54); calc('R2 Q3 3 cm cube V', cubeV(3), 27); calc('R2 Q3 SA:V', cubeSA(3) / cubeV(3), 2);
calc('R3 Q2 CuO 1.00 → 1.00', r2(1.00 - 1.00), 0);
// full question: marble chips m = 1.10(1 − e^(−t/40))
const FT = [0, 20, 40, 60, 80, 100, 120];
const FM = FT.map(t => r2(1.10 * (1 - Math.exp(-t / 40))));
assert.deepStrictEqual(FM, [0, 0.43, 0.7, 0.85, 0.95, 1.01, 1.05]);
calc('FQ (c) mean rate first 60 s 2 s.f.', sf(FM[3] / 60, 2), 0.014, 1e-12);
const FQG = 1.10 / 40 * Math.exp(-1), FQ0 = FM[2] - FQG * 40, FQ80 = FM[2] + FQG * 40;
calc('FQ tangent at 40 s meets t = 0 (2 d.p.)', r2(FQ0), 0.30, 1e-9);
calc('FQ tangent at 80 s (2 d.p.)', r2(FQ80), 1.10, 1e-9);
calc('FQ (d) HT gradient (0,0.30)–(80,1.10)', (1.10 - 0.30) / 80, 0.010, 1e-12);
// homework
calc('HW Q3 1 cm cube SA:V', cubeSA(1) / cubeV(1), 6); calc('HW Q3 0.5 cm cube SA:V', cubeSA(0.5) / cubeV(0.5), 12, 1e-9);
calc('HW Q4 mean rate 60 cm³ in 50 s', 60 / 50, 1.2, 1e-12);
calc('HW Q5 HT tangent (0,4)–(30,22)', (22 - 4) / 30, 0.60, 1e-12);
calc('HW Q6 Ea 150 − 90', 150 - 90, 60); calc('HW Q6 released 90 − 30', 90 - 30, 60);

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
const GLASS = 'EEF5FB', ACID = ['DCEBF8', '5B9BD5'], CLOUDY = 'F3E9B0', HT_FILL = 'FBE3E4', MGC = ['C9CED6', '6B7385'];
// conical flask: neck top centre (cx, y), height h, base width bw; level 0..1 of body
function flask(s, cx, y, h, bw, o = {}) {
  const nw = bw * 0.26, neck = h * 0.3;
  const P = [[cx - nw / 2, y], [cx + nw / 2, y], [cx + nw / 2, y + neck], [cx + bw / 2, y + h], [cx - bw / 2, y + h], [cx - nw / 2, y + neck]];
  poly(s, P, GLASS, null);
  if (o.level) {
    const ly = y + h - o.level * (h - neck);
    const wAt = yy => nw / 2 + (bw / 2 - nw / 2) * (yy - (y + neck)) / (h - neck);
    poly(s, [[cx - wAt(ly), ly], [cx + wAt(ly), ly], [cx + bw / 2, y + h], [cx - bw / 2, y + h]], o.liquid || ACID[0], null, { tr: o.tr || 0 });
    if (o.bubbles) for (let i = 0; i < o.bubbles; i++) ball(s, cx - bw * 0.28 + ((i * 7) % 11) / 11 * bw * 0.56, ly + 0.06 + ((i * 5) % 7) / 7 * (y + h - ly - 0.16), 0.03, 'FFFFFF', ACID[1], 0.5);
    if (o.solid) for (let i = 0; i < o.solid.n; i++) ball(s, cx - bw * 0.3 + (i % 6) * bw * 0.12, y + h - 0.06 - Math.floor(i / 6) * 0.07, o.solid.r || 0.04, o.solid.c, o.solid.e, 0.5);
  }
  poly(s, P, null, C.ink, { lw: 1.5 });
  if (o.bung) box(s, cx - nw / 2 - 0.04, y - 0.12, nw + 0.08, 0.2, '8C6A4A', '5A4030', { lw: 0.75 });
  if (o.cotton) s.addShape(SH.OVAL, { x: cx - nw / 2 - 0.06, y: y - 0.16, w: nw + 0.12, h: 0.24, fill: { color: 'FAFAFA' }, line: { color: 'A0A0A0', width: 0.75 } });
}
function balance(s, cx, y, w, reading) {
  box(s, cx - w / 2 + 0.12, y, w - 0.24, 0.06, '9AA3B0', '4A5568', { lw: 0.75 });
  box(s, cx - w / 2, y + 0.06, w, 0.5, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, cx - w / 2 + 0.15, y + 0.15, w - 0.3, 0.3, '1F2A3A', null);
  label(s, cx - w / 2 + 0.15, y + 0.15, w - 0.3, reading, { size: 10.5, bold: true, color: '7CFC9A', h: 0.3 });
}
// horizontal gas syringe: nozzle at (x, yc), barrel length len, fraction of barrel filled with gas
function gasSyringe(s, x, yc, len, frac, o = {}) {
  const h = o.h || 0.3, bx = x + 0.12;
  box(s, x, yc - 0.04, 0.12, 0.08, GLASS, C.ink, { lw: 1 });
  box(s, bx, yc - h / 2, len, h, GLASS, C.ink, { lw: 1.25 });
  const pxp = bx + frac * len * 0.92 + 0.02;
  if (frac > 0) box(s, bx + 0.01, yc - h / 2 + 0.02, pxp - bx - 0.01, h - 0.04, 'E3F1E3', null);
  box(s, pxp, yc - h / 2 + 0.02, 0.07, h - 0.04, '9AA3B0', '4A5568', { lw: 0.75 });
  line(s, pxp + 0.07, yc, bx + len + (o.rod || 0.35), yc, '4A5568', 2);
  box(s, bx + len + (o.rod || 0.35), yc - h * 0.45, 0.05, h * 0.9, '4A5568', null);
  const nt = o.ticks || 10;
  for (let i = 0; i <= nt; i++) line(s, bx + 0.02 + i * len * 0.92 / nt, yc - h / 2, bx + 0.02 + i * len * 0.92 / nt, yc - h / 2 + (i % 5 ? 0.06 : 0.11), C.ink, 0.75);
}
function stopclock(s, cx, cy, r) {
  ball(s, cx, cy, r, C.white, C.ink, 1.5);
  box(s, cx - 0.05, cy - r - 0.09, 0.1, 0.09, '4A5568', null);
  line(s, cx, cy, cx, cy - r * 0.75, C.ink, 1.5); line(s, cx, cy, cx + r * 0.55, cy + r * 0.2, C.red, 1.25);
}
// isometric-ish cube: front face top-left (x, y), side a (in), depth d
function cube(s, x, y, a, o = {}) {
  const d = a * 0.4, f = o.fill || 'EDE7DA', e = o.edge || '8A7A50';
  poly(s, [[x, y], [x + d, y - d], [x + a + d, y - d], [x + a, y]], o.top || 'F7F3EA', e, { lw: 1 });
  poly(s, [[x + a, y], [x + a + d, y - d], [x + a + d, y + a - d], [x + a, y + a]], o.side || 'D8CFBD', e, { lw: 1 });
  box(s, x, y, a, a, f, e, { lw: 1 });
}
// particle box with motion arrows
function particleBox(s, x, y, w, h, parts, o = {}) {
  box(s, x, y, w, h, C.white, C.ink, { lw: 1.25 });
  parts.forEach(([px_, py_, kind, dx, dy]) => {
    const [f, e] = kind === 'A' ? ['E06666', '9E2A2A'] : ['5B8FD6', '2E5F99'];
    const L = o.len || 0.18;
    arrow(s, px_, py_, px_ + dx * L, py_ + dy * L, C.grey, 1, {});
    ball(s, px_, py_, 0.07, f, e, 0.75);
  });
}
// deterministic particle layout
function layout(n, x, y, w, h, seed) {
  let q = seed; const rnd = () => { q = (q * 9301 + 49297) % 233280; return q / 233280; };
  const out = [];
  let guard = 0;
  while (out.length < n && guard++ < 5000) {
    const px_ = x + 0.15 + rnd() * (w - 0.3), py_ = y + 0.15 + rnd() * (h - 0.3);
    if (out.every(([a, b]) => Math.hypot(a - px_, b - py_) > 0.28)) { const ang = rnd() * 2 * Math.PI; out.push([px_, py_, out.length % 2 ? 'B' : 'A', Math.cos(ang), Math.sin(ang)]); }
  }
  assert.strictEqual(out.length, n, 'particle layout placed all particles');
  return out;
}
// smooth reaction-profile curve on graph g: flat R, hump to `peak`, flat P
function profile(s, g, R, P, peak, color, width, o = {}) {
  const sm = x => { const u = Math.min(1, Math.max(0, (x - 2) / 2)); return u * u * (3 - 2 * u); };
  const base = x => R + (P - R) * sm(x);
  const bump = x => Math.exp(-(((x - 3) / 0.62) ** 2));
  let A = peak - R;
  for (let it = 0; it < 60; it++) { let mx = -1e9; for (let i = 0; i <= 600; i++) { const x = 0.5 + i * 5 / 600; mx = Math.max(mx, base(x) + A * bump(x)); } A += peak - mx; }
  const pts = []; for (let i = 0; i <= 120; i++) { const x = 0.5 + i * 5 / 120; pts.push([x, base(x) + A * bump(x)]); }
  let mx = -1e9; pts.forEach(p => { mx = Math.max(mx, p[1]); });
  assert(Math.abs(mx - peak) < 1.5, 'profile peak height ' + mx);
  D.plotLine(s, g, pts, color, width, o);
}
// short vertical double-headed arrow
function dArrow(s, x, y1, y2, color, w = 1.5) { line(s, x, y1, x, y2, color, w, { head: true, tail: true }); }
function eye(s, cx, cy) {
  s.addShape(SH.OVAL, { x: cx - 0.2, y: cy - 0.09, w: 0.4, h: 0.18, fill: { color: C.white }, line: { color: C.ink, width: 1 } });
  ball(s, cx, cy, 0.06, '3E6FC1', C.ink, 0.5);
}

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Rates of reaction',
    footer: 'OCR J260 Combined Science B • C6.2 how do chemists control the rate of reactions • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • measuring rates, collision theory, surface area, catalysts, enzymes` },
      { icon: 'H', text: 'Higher & Foundation in one deck • tangents to curves and rates in mol/s marked HT' },
      { icon: '▲', text: 'PAG C5 Measuring rates of reaction: gas syringe and disappearing cross • data verified' },
    ],
    notes: 'C6.2 How do chemists control the rate of reactions? is Part 2 of 3 in J260 Chapter C6 Making useful chemicals (C6.1 What useful products can be made from acids?; C6.2 this deck; C6.3 What factors affect the yield of chemical reactions?). J258 (separate) has a fourth sub-topic, C6.4 How are chemicals made on an industrial scale?, which is separate science only.\nThe sub-topic code is the same in J258 and J260 (C6.2). The OCR scheme of work gives 11 h separate / 9.5 h combined. Statement codes C6.2.1 and C6.2.9 are quoted for Combined Science B by an RSC lesson plan; the other codes follow the J258 order (see SPEC_C6_2.md for confidence).\nRelative atomic masses are used to 1 decimal place (Mg 24.3, C 12.0, O 16.0), as on the OCR periodic table.',
  });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C6.2.1', text: 'Describe the effect of **temperature**, **concentration**, **pressure** and **surface area** on rate.' },
  { code: 'C6.2.2', text: 'Explain these effects using the **frequency** and **energy** of **collisions**.' },
  { code: 'C6.2.3', text: 'Explain the effect of **piece size** using **surface area to volume ratio**.' },
  { code: 'C6.2.4', text: 'Describe the **characteristics of catalysts** and their effect on rate.' },
  { code: 'C6.2.5', text: '**Identify catalysts** in reactions.' },
  { code: 'C6.2.6', text: 'Explain **catalytic action** using **activation energy** and reaction profiles.' },
  { code: 'C6.2.7', text: 'Recall that **enzymes** are **catalysts** in biological systems.' },
  { code: 'C6.2.8', text: 'Suggest **practical methods** to measure the rate of a reaction (PAG C5).' },
  { code: 'C6.2.9', text: '**Interpret graphs** of reaction conditions and rate.' },
  { code: 'C6.2.10', text: 'Calculate **mean rates**; use the **gradient of a tangent** for rate at a time.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J260 C6.2 = J258 C6.2; see SPEC_C6_2.md for confidence):\nC6.2.1 describe the effect on rate of reaction of changes in temperature, concentration, pressure, and surface area (wording and Combined Science B code quoted by search extracts and an RSC lesson plan: HIGH)\nC6.2.2 explain the effects on rates of reaction of changes in temperature, concentration and pressure in terms of frequency and energy of collision between particles (wording HIGH, code MEDIUM)\nC6.2.3 explain the effects on rates of reaction of changes in the size of the pieces of a reacting solid in terms of surface area to volume ratio (wording HIGH, listed third in OCR-B notes)\nC6.2.4 describe the characteristics of catalysts and their effects on rates of reaction (wording and code HIGH from a search extract)\nC6.2.5 identify catalysts in reactions (UNVERIFIED wording and code)\nC6.2.6 explain catalytic action in terms of activation energy (MEDIUM; one extract places activation energy at C6.2.6)\nC6.2.7 recall that enzymes act as catalysts in biological systems (UNVERIFIED code)\nC6.2.8 suggest practical methods for determining the rate of a given reaction (UNVERIFIED wording; PAG C5)\nC6.2.9 interpret graphs of reaction conditions versus rate (code and wording quoted by an RSC lesson plan for Combined Science B: HIGH)\nC6.2.10 calculate rates of reaction from graphs, including mean rate; HT: gradient of a tangent to a curve as the rate at a given time (wording UNVERIFIED; HT marker follows the DfE subject content, where the tangent is Higher only)\nThe only HT content in this deck is the tangent method and rates in mol/s (the mole is HT in J260 C5.2).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C6 Making useful chemicals • C6.2 is Part 2 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C6.2.8–10', 'Measuring rates: methods, graphs, mean rate, tangents', 'Both + HT', C.blue],
    ['C6.2.1–2', 'Temperature, concentration, pressure: collision theory', 'Both tiers', C.blue],
    ['C6.2.3', 'Piece size and surface area to volume ratio', 'Both tiers', C.blue],
    ['C6.2.4–5', 'Catalysts: what they do and how to identify them', 'Both tiers', C.blue],
    ['C6.2.6–7', 'Activation energy, reaction profiles and enzymes', 'Both tiers', C.blue],
    ['PAG C5', 'Measuring rates: gas syringe and disappearing cross', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C6.2\nRates of reaction', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 particle model, catalytic converters • C3 equations • C4.3 SA:V • C5.2 mass changes', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C6.1 What useful products can be made from acids?',
      '**C6.2 How do chemists control the rate of reactions?** (this deck)',
      'C6.3 What factors affect the yield of chemical reactions?',
      'J258 (separate) adds C6.4 on making chemicals on an **industrial scale**.',
      'Reversible reactions and **yield** come next, in **C6.3**.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (**tangents** to curves; rates in **mol/s**) are for Higher tier only.',
      'Everyone: factors, **collision theory**, **SA:V**, catalysts, **mean rate** from a graph.',
      'Maths: **gradients**, **reciprocals** (1/t), plotting **graphs**, units such as **cm³/s**.',
      'Practical: **PAG C5** Measuring rates of reaction (two methods).',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C6 has three sub-topics: C6.1 acids, C6.2 rates, C6.3 yield (docbrown.info combined page; SPEC_C6_1.md reached the same list). J258 C6.4 "How are chemicals made on an industrial scale?" is separate science only (OCR C6 scheme of work extract).\nTeaching time: 11 h separate / 9.5 h combined. No J258 C6.2 statement could be confirmed as separate-only, so the 1.5 h difference is most likely extra practical time (J258 PAG 8 rates is a fuller practical) and depth. This deck teaches only the statements listed on the objectives slide (see SPEC_C6_2.md).\nOverlap control: acids, neutralisation and salts are C6.1 (one starter question only). Reversible reactions, equilibrium and yield (and the Haber process) are C6.3 and are NOT taught here.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C1 • air quality', q: 'A **catalytic converter** cleans car exhaust. Name **two** pollutant gases that it removes.' },
  { from: 'C1/C2 • particle model', q: 'Compare the **spacing** and **movement** of particles in a **gas** and in a **liquid**.' },
  { from: 'C3 • equations', q: 'Balance and add state symbols: **Mg + HCl → MgCl₂ + H₂**.' },
  { from: 'C4.3 • nanoparticles', q: 'Why does a **powder** have a larger **surface area to volume ratio** than a lump?' },
  { from: 'C5.2 • mass changes', q: 'Marble chips react with acid in an **open** flask on a balance. Why does the reading **fall**?' },
  { from: 'C6.1 • acids', q: 'Name the **salt** formed when magnesium reacts with **hydrochloric acid**.' },
], { subtitle: 'Recall from C1–C5 and C6.1 • 6 minutes • no notes', notes: 'ANSWERS\n1. Any two: carbon monoxide; nitrogen oxides (nitrogen monoxide); unburnt hydrocarbons. (C1; catalytic converters return on slide 13: 2CO + 2NO → 2CO₂ + N₂, atom-balanced in node.)\n2. Gas: particles far apart, moving fast in random directions; liquid: particles close together (touching), moving around each other more slowly.\n3. Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g) (atom balance asserted in node).\n4. Breaking a lump into small pieces exposes more surface but the volume stays the same, so surface area ÷ volume increases (C4.3).\n5. Carbon dioxide gas is produced and escapes from the open flask, so its mass is lost from the balance (C5.2).\n6. Magnesium chloride (C6.1, recap only).' }), 'Retrieval starter');

// ======================= 5 MEASURING RATE: METHODS =======================
reg(D.contentSlide({
  title: 'Measuring the rate of a reaction',
  subtitle: `Specification ${sp('C6.2.8')} • suggest practical methods for determining the rate of a given reaction`,
  tag: 'C6.2.8', caption: 'four ways to follow a reaction; not to scale',
  draw: (s) => {
    // A gas syringe
    label(s, 0.6, 1.4, 2.9, '**A** Gas syringe: **volume** of gas', { size: 10.5, h: 0.26, align: 'left' });
    flask(s, 1.05, 2.3, 0.95, 0.85, { level: 0.4, bung: true, bubbles: 5 });
    line(s, 1.05, 2.18, 1.05, 1.95, C.ink, 1.5); line(s, 1.05, 1.95, 1.6, 1.95, C.ink, 1.5);
    gasSyringe(s, 1.6, 1.95, 1.4, 0.45, { h: 0.26, rod: 0.25 });
    label(s, 1.55, 2.25, 1.95, 'reads to 1 cm³', { size: 10, italic: true, color: C.grey, h: 0.22 });
    // B upturned measuring cylinder
    label(s, 3.6, 1.4, 2.9, '**B** Collect over **water**', { size: 10.5, h: 0.26, align: 'left' });
    flask(s, 3.95, 2.6, 0.85, 0.75, { level: 0.4, bung: true, bubbles: 4 });
    box(s, 4.55, 2.7, 1.85, 0.75, ACID[0], null);
    poly(s, [[4.55, 2.45], [4.55, 3.45], [6.4, 3.45], [6.4, 2.45]], null, C.ink, { lw: 1.5, open: true });
    box(s, 5.3, 1.75, 0.42, 1.5, GLASS, null);
    box(s, 5.3, 2.25, 0.42, 1.0, ACID[0], null);
    poly(s, [[5.3, 3.25], [5.3, 1.75], [5.72, 1.75], [5.72, 3.25]], null, C.ink, { lw: 1.25, open: true });
    for (let i = 1; i <= 5; i++) line(s, 5.3, 1.75 + i * 0.22, 5.42, 1.75 + i * 0.22, C.ink, 0.75);
    line(s, 3.95, 2.48, 3.95, 2.35, C.ink, 1.5); line(s, 3.95, 2.35, 4.9, 2.35, C.ink, 1.5);
    line(s, 4.9, 2.35, 4.9, 3.35, C.ink, 1.5); line(s, 4.9, 3.35, 5.5, 3.35, C.ink, 1.5); line(s, 5.5, 3.35, 5.5, 3.15, C.ink, 1.5);
    label(s, 5.78, 1.85, 0.75, 'gas', { size: 10, bold: true, color: C.green, h: 0.22, align: 'left' });
    // C mass loss
    label(s, 0.6, 3.62, 2.9, '**C** Balance: **mass** of gas lost', { size: 10.5, h: 0.26, align: 'left' });
    flask(s, 1.75, 4.15, 0.95, 0.9, { level: 0.4, cotton: true, solid: { n: 5, c: 'EDEDED', e: '8A8F99', r: 0.05 } });
    balance(s, 1.75, 5.1, 1.6, '151.52 g');
    label(s, 2.35, 3.95, 1.2, 'cotton wool lets gas out, keeps spray in', { size: 10, italic: true, color: C.grey, h: 0.6, align: 'left', valign: 'top' });
    // D disappearing cross
    label(s, 3.6, 3.62, 2.9, '**D** Disappearing **cross**', { size: 10.5, h: 0.26, align: 'left' });
    eye(s, 4.55, 3.98);
    line(s, 4.55, 4.08, 4.55, 4.85, C.grey, 1, { dash: 'dash' });
    flask(s, 4.55, 4.3, 0.9, 0.95, { level: 0.45, liquid: CLOUDY });
    box(s, 3.85, 5.2, 1.4, 0.14, C.white, C.ink, { lw: 0.75 });
    line(s, 4.4, 5.22, 4.7, 5.32, C.ink, 2); line(s, 4.4, 5.32, 4.7, 5.22, C.ink, 2);
    label(s, 5.3, 5.17, 1.2, 'paper with **X**', { size: 10, h: 0.22, align: 'left' });
    label(s, 5.1, 4.25, 1.4, 'time until the **X** is hidden by a **precipitate**', { size: 10, h: 0.75, align: 'left', valign: 'top' });
  },
  head: 'Follow a reactant or a product',
  lines: [
    '**Rate of reaction** = how fast a **reactant is used up** or a **product is made**.',
    'Measure the amount at regular **time intervals** (e.g. every 10 s) with a stopclock.',
    '**Gas made?** Measure its **volume** (A or B) or the **mass lost** from an open flask (C).',
    '**Precipitate made?** Time how long it takes to hide a cross (D): a shorter time means a **faster** rate.',
    'Choose a method that gives a **big enough change** to measure accurately.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: choosing a method', q: 'Hydrogen peroxide breaks down: 2H₂O₂(aq) → 2H₂O(l) + O₂(g).',
    steps: [['Product', 'a gas (oxygen) is made'], ['Answer', 'collect the O₂ in a **gas syringe** and read the **volume** every 10 s']], size: 10.5 },
  workedH: 1.3,
  qc: '0.040 g of magnesium reacts with acid and makes only **0.0033 g** of hydrogen. Why is method **C** (mass loss) a poor choice for this reaction?',
  notes: 'QUICK CHECK ANSWER: Hydrogen is very light, so the mass change (about 0.003 g) is smaller than a 0.01 g balance can detect; measure the volume of gas instead (gas syringe or collection over water).\nCheck asserted in node: 0.040 ÷ 24.3 × 2.0 = 0.0033 g H₂ (2 s.f.). Equations atom-balanced in node: 2H₂O₂ → 2H₂O + O₂; Mg + 2HCl → MgCl₂ + H₂; CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂; Na₂S₂O₃ + 2HCl → 2NaCl + H₂O + SO₂ + S.\nMethod notes: CO₂ is slightly soluble in water, so collecting it over water gives slightly low volumes; a gas syringe avoids this. Method C works well for CO₂ (heavy gas, Mr 44.0). PAG C5 (slides 16–18) uses methods A and D.',
}), 'C6.2.8 Measuring rate: methods');

// ======================= 6 RATE GRAPHS AND MEAN RATE =======================
reg(D.contentSlide({
  title: 'Rate graphs and mean rate',
  subtitle: `Specification ${sp('C6.2.9')}, ${sp('C6.2.10')} • interpret rate graphs; calculate a mean rate`,
  tag: 'C6.2.9', caption: 'marble chips + excess acid; mass of CO₂ lost plotted to scale (illustrative data)',
  draw: (s) => {
    const g = { x: 1.35, y: 1.55, w: 4.9, h: 3.3, xmin: 0, xmax: 300, ymin: 0, ymax: 2.5, xstep: 60, ystep: 0.5, minor: 2, xlabel: 'Time / s', ylabel: 'Mass of CO₂ lost / g', fmt: v => String(v), yfmt: v => v.toFixed(1) };
    D.axes(s, g);
    D.fnLine(s, g, t => 2.20 * (1 - Math.exp(-t / 60)), 0, 300, 60, C.blue, 2);
    D.points(s, g, MT.map((t, i) => [t, ML[i]]), C.ink);
    // mean-rate chord over first 60 s
    line(s, D.px(g, 0), D.py(g, 0), D.px(g, 60), D.py(g, ML[2]), C.orange, 1.5, { dash: 'dash' });
    line(s, D.px(g, 60), D.py(g, 0), D.px(g, 60), D.py(g, ML[2]), C.orange, 1.25, { dash: 'dash' });
    label(s, D.px(g, 60) + 0.05, D.py(g, 0.7), 1.2, '1.39 g in 60 s', { size: 10, bold: true, color: C.orange, h: 0.22, align: 'left' });
    label(s, D.px(g, 70), D.py(g, 2.0) - 0.35, 1.3, '**steep**: fast at the start', { size: 10, color: C.ink, h: 0.22, align: 'left' });
    label(s, D.px(g, 150), D.py(g, 1.75), 1.6, 'less steep: **slowing**', { size: 10, color: C.ink, h: 0.22, align: 'left' });
    label(s, D.px(g, 195), D.py(g, 2.18) - 0.3, 1.45, '**flat**: reaction over', { size: 10, color: C.ink, h: 0.22, align: 'left' });
  },
  head: 'Reading a rate graph',
  lines: [
    'The **steeper** the line, the **faster** the reaction. The **gradient** is the rate.',
    'Rate is **fastest at the start**, when there are most reactant particles; it **slows** as they are used up.',
    'The line goes **flat** when one reactant is **used up**: the reaction has stopped.',
    '**Mean rate** = amount of product formed ÷ time taken. Units: **g/s** or **cm³/s**.',
    '!!HT!! You can also give rate in **mol/s**: convert the mass to moles first.',
  ],
  size: 11,
  worked: { head: 'Worked example: mean rate', q: 'Mean rate over the first 60 s?',
    steps: [['Read graph', '1.39 g of CO₂ lost in 60 s'], ['Answer', '1.39 ÷ 60 = **0.023 g/s** (2 s.f.)']], size: 10.5 },
  workedH: 1.3,
  qc: 'Use the graph: calculate the mean rate over the **first 30 s**. Is it bigger or smaller than the mean rate over **0–300 s**? Why?',
  notes: `QUICK CHECK ANSWER: 0.87 g ÷ 30 s = 0.029 g/s. Over 0–300 s: 2.19 ÷ 300 = 0.0073 g/s, which is smaller, because the reaction slows down as the reactants are used up (the later part of the graph is almost flat).\nIllustrative data from m = 2.20(1 − e^(−t/60)), rounded to 0.01 g and asserted in node: ${MT.map((t, i) => `${t} s ${ML[i]} g`).join('; ')}.\nHT: 1.39 g CO₂ = 1.39 ÷ 44.0 = 0.0316 mol, so the mean rate over 60 s = 5.3 × 10⁻⁴ mol/s (2 s.f.).\nCommon errors: reading the time axis wrongly; giving no unit; using the final mass when asked for an early interval.`,
}), 'C6.2.9 Rate graphs and mean rate');

// ======================= 7 TANGENTS (HT) =======================
reg(D.contentSlide({
  title: 'Rate at a given time: tangents',
  subtitle: `Specification ${sp('C6.2.10')} • HT: the gradient of a tangent to the curve is the rate at that time`,
  tag: 'C6.2.10', ht: true, caption: 'Mg + 1.0 mol/dm³ HCl; tangent drawn at 20 s (illustrative data, to scale)',
  draw: (s) => {
    const g = { x: 1.35, y: 1.55, w: 4.9, h: 3.3, xmin: 0, xmax: 120, ymin: 0, ymax: 50, xstep: 20, ystep: 10, minor: 2, xlabel: 'Time / s', ylabel: 'Volume of H₂ / cm³', fmt: v => String(v) };
    D.axes(s, g);
    D.fnLine(s, g, t => Vt(K1, t), 0, 120, 60, C.blue, 2);
    D.points(s, g, TT.map((t, i) => [t, V1[i]]), C.ink);
    D.plotLine(s, g, [[0, TAN0], [52, TAN_V + TAN_G * 32]], C.red, 1.75);
    line(s, D.px(g, 0), D.py(g, 10.6), D.px(g, 40), D.py(g, 10.6), C.orange, 1.25, { dash: 'dash' });
    line(s, D.px(g, 40), D.py(g, 10.6), D.px(g, 40), D.py(g, 40.0), C.orange, 1.25, { dash: 'dash' });
    label(s, D.px(g, 8), D.py(g, 10.6) + 0.02, 1.4, 'change in x = 40 s', { size: 10, bold: true, color: C.orange, h: 0.22, align: 'left' });
    label(s, D.px(g, 41), D.py(g, 24), 1.6, 'change in y\n= 40.0 − 10.6\n= 29.4 cm³', { size: 10, bold: true, color: C.orange, h: 0.6, align: 'left' });
    ball(s, D.px(g, TAN_T), D.py(g, TAN_V), 0.05, C.red, C.red);
    label(s, D.px(g, 54), D.py(g, 46), 1.3, 'tangent at 20 s', { size: 10, bold: true, color: C.red, h: 0.22, align: 'left' });
  },
  head: 'Rate at one instant',
  lines: [
    'A **tangent** is a straight line that just **touches** the curve at one point, with the **same slope** as the curve there.',
    'Draw it with a ruler; pick **two points far apart** on the tangent.',
    '**Rate = gradient = change in y ÷ change in x**.',
    'The tangent at **t = 0** gives the **initial rate** (the fastest).',
    'Later tangents are **less steep**: the rate falls as reactants are used up.',
  ],
  size: 11,
  worked: { head: 'Worked example (HT): gradient', q: 'Rate at 20 s, from the red tangent?',
    steps: [['Gradient', '29.4 cm³ ÷ 40 s = 0.735'], ['Answer', '= **0.74 cm³/s** (2 s.f.)']], size: 10.5 },
  workedH: 1.3,
  qc: 'A tangent drawn at **t = 0** passes through **(0 s, 0 cm³)** and **(20 s, 40 cm³)**. Calculate the **initial rate**. Compare it with the rate at 20 s.',
  notes: 'QUICK CHECK ANSWER: 40 ÷ 20 = 2.0 cm³/s. This is about 2.7 times the rate at 20 s (0.74 cm³/s): the reaction is fastest at the start.\nHT ONLY (C6.2.10; the tangent method is Higher-only in the DfE subject content; J260 wording UNVERIFIED). Asserted in node: curve V = 40(1 − e^(−0.050t)); exact tangent at 20 s has gradient 0.736 cm³/s and passes through (0, 10.6) and (40, 40.0); (40.0 − 10.6) ÷ 40 = 0.735 → 0.74 cm³/s. The exact initial gradient is 2.0 cm³/s. Accept answers in the range 0.65–0.85 cm³/s from a hand-drawn tangent.\nGRADE 7–9 STRETCH: use a mirror (normal) method or a ruler held so the angles either side of the point look equal; longer tangent = smaller reading error.',
}), 'C6.2.10 Tangents (HT)');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C6.2.8')}, ${sp('C6.2.9')}, ${sp('C6.2.10')} • measuring rate and rate graphs`, [
  { q: 'Zinc reacts with sulfuric acid to make hydrogen gas. Name **two** pieces of apparatus that could be used to measure the **volume** of gas made.', marks: 2, ms: 'Gas syringe (1); upturned measuring cylinder / burette over water (in a trough) (1). Also needs a stopclock (not a volume measure).' },
  { q: 'A reaction makes **48 cm³** of gas in the first **60 s**. Calculate the **mean rate** of reaction. Give the unit.', marks: 2, ms: '48 ÷ 60 (1); = 0.80 cm³/s (1; unit needed).' },
  { q: 'Describe how the rate changes during a reaction, as shown by a curve of volume of gas against time, and explain why the line ends **flat**.', marks: 2, ms: 'Fastest at the start / steepest, then slows / gets less steep (1); flat because a reactant is used up so the reaction has stopped / no more gas is made (1).' },
  { q: 'A tangent to a curve of volume of gas against time passes through **(10 s, 12 cm³)** and **(50 s, 44 cm³)**. Calculate the rate at that time.', marks: 2, ht: true, ms: '(44 − 12) ÷ (50 − 10) = 32 ÷ 40 (1); = 0.80 cm³/s (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 FACTORS THAT CHANGE RATE =======================
reg(D.contentSlide({
  title: 'Factors that change the rate',
  subtitle: `Specification ${sp('C6.2.1')}, ${sp('C6.2.9')} • the effect of temperature, concentration, pressure and surface area on rate`,
  tag: 'C6.2.1', caption: 'same mass of limiting reactant in each run; curves to scale',
  draw: (s) => {
    const g = { x: 1.35, y: 1.5, w: 4.9, h: 2.3, xmin: 0, xmax: 200, ymin: 0, ymax: 50, xstep: 40, ystep: 10, xlabel: 'Time / s', ylabel: 'Volume of gas / cm³', fmt: v => String(v) };
    D.axes(s, g);
    D.fnLine(s, g, t => Vt(0.06, t), 0, 200, 80, C.red, 2.25);
    D.fnLine(s, g, t => Vt(0.03, t), 0, 200, 80, C.blue, 2.25);
    D.fnLine(s, g, t => Vt(0.015, t), 0, 200, 80, C.green, 2.25);
    label(s, D.px(g, 4) - 0.3, D.py(g, 34) - 0.11, 0.6, '**A**', { size: 11, color: C.red, h: 0.22 });
    label(s, D.px(g, 62) - 0.3, D.py(g, 27.5) - 0.11, 0.6, '**B**', { size: 11, color: C.blue, h: 0.22 });
    label(s, D.px(g, 112) - 0.3, D.py(g, 24) - 0.11, 0.6, '**C**', { size: 11, color: C.green, h: 0.22 });
    const rows = [[HDR('Change'), HDR('Applies to'), HDR('Rate')],
      [tcell('Higher temperature', 0), tcell('all reactions', 0), tcell('increases', 0, { bold: true, color: C.red })],
      [tcell('Higher concentration', 1), tcell('solutions', 1), tcell('increases', 1, { bold: true, color: C.red })],
      [tcell('Higher pressure', 0), tcell('gases', 0), tcell('increases', 0, { bold: true, color: C.red })],
      [tcell('Smaller pieces (more SA)', 1), tcell('solids', 1), tcell('increases', 1, { bold: true, color: C.red })]];
    s.addTable(rows, { x: 0.75, y: 4.4, w: 5.5, colW: [2.3, 1.7, 1.5], rowH: 0.25, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  },
  head: 'Four conditions chemists can change',
  lines: [
    'Increasing the **temperature**, **concentration** (solutions), **pressure** (gases) or **surface area** (solids) **increases** the rate.',
    'A faster reaction gives a **steeper** curve that **levels off sooner**.',
    'If the amount of the **limiting reactant** is the same, the **same total** amount of product forms: only the **time** changes.',
    'Chemists choose conditions that are **fast enough**, but also **safe** and **not too costly**.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: reading curves', q: 'B is acid at 20 °C. Which curve is the same acid at 40 °C?',
    steps: [['Hotter', 'faster, so steeper at the start'], ['Answer', '**A**: it levels off at the same 40 cm³, but sooner']], size: 10.5 },
  workedH: 1.3,
  qc: 'Curve **B** used marble **chips**. Which curve could be the same mass of marble as **lumps**? Which curve would **powder** give?',
  notes: 'QUICK CHECK ANSWER: Lumps: curve C (smaller surface area, slower, less steep). Powder: curve A (larger surface area, faster, steeper). All three level off at the same volume because the same mass of limiting marble is used with excess acid.\nCurves plotted to scale from V = 40(1 − e^(−kt)) with k = 0.060, 0.030 and 0.015 per second (all level off at 40 cm³; C reaches 38 cm³ by 200 s). Note for teachers: a catalyst also gives curve A (slide 13), but catalysts are taught separately (C6.2.4).\nWhy pressure only for gases: increasing pressure squashes gas particles into a smaller volume; solids and liquids hardly compress.',
}), 'C6.2.1 Factors that change rate');

// ======================= 10 COLLISION THEORY =======================
{
  const s = D.contentHeader('Collision theory', `Specification ${sp('C6.2.2')} • explain rate changes using the frequency and energy of collisions between particles`, { tag: 'C6.2.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'particle models; arrows show speed; not to scale');
  const boxes = [[0.65, 'Low concentration', 6, 0.25, 11], [2.6, 'High concentration', 14, 0.25, 29], [4.55, 'High temperature', 6, 0.45, 11]];
  boxes.forEach(([x, t, n, len, seed]) => {
    label(s, x - 0.05, 1.42, 1.95, `**${t}**`, { size: 10.5, h: 0.26 });
    particleBox(s, x, 1.72, 1.85, 1.75, layout(n, x, 1.72, 1.85, 1.75, seed), { len });
  });
  label(s, 0.65, 3.52, 1.85, 'few collisions per second', { size: 10, italic: true, color: C.grey, h: 0.4, valign: 'top' });
  label(s, 2.6, 3.52, 1.85, '**more frequent** collisions', { size: 10, color: C.ink, h: 0.4, valign: 'top' });
  label(s, 4.55, 3.52, 1.85, 'more frequent **and** more **energetic**', { size: 10, color: C.ink, h: 0.4, valign: 'top' });
  // successful vs unsuccessful collision
  box(s, 0.65, 4.05, 5.75, 1.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  ball(s, 1.1, 4.6, 0.12, 'E06666', '9E2A2A'); ball(s, 1.36, 4.6, 0.12, '5B8FD6', '2E5F99');
  s.addShape(SH.STAR_8_POINT || SH.OVAL, { x: 1.08, y: 4.38, w: 0.3, h: 0.3, fill: { color: 'F5C342', transparency: 30 }, line: { color: C.orange, width: 0.75 } });
  arrow(s, 1.55, 4.6, 2.0, 4.6, C.ink, 1.5);
  ball(s, 2.2, 4.6, 0.11, '9B6FC0', '5A3590'); ball(s, 2.45, 4.6, 0.11, '9B6FC0', '5A3590');
  label(s, 2.75, 4.38, 3.55, '**Successful**: energy ≥ **activation energy**, so the particles **react**', { size: 10.5, h: 0.45, align: 'left' });
  ball(s, 1.1, 5.35, 0.12, 'E06666', '9E2A2A'); ball(s, 1.36, 5.35, 0.12, '5B8FD6', '2E5F99');
  arrow(s, 1.0, 5.35, 0.75, 5.15, C.grey, 1.25); arrow(s, 1.46, 5.35, 1.71, 5.15, C.grey, 1.25);
  label(s, 2.75, 5.13, 3.55, '**Unsuccessful**: too little energy, so the particles just **bounce apart**', { size: 10.5, h: 0.45, align: 'left' });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Why the conditions matter', [
    'Particles must **collide** with at least the **activation energy** to react.',
    'Rate depends on the number of **successful collisions per second**.',
    '**Concentration** or **pressure** up: more particles in the same volume, so collisions are **more frequent**.',
    '**Temperature** up: particles move **faster**, so collisions are **more frequent** and a **greater proportion** have enough **energy**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: explain', 'Why does more concentrated acid react faster with magnesium?', [
    ['Particles', 'more acid particles in the same volume'], ['Collisions', 'more frequent collisions with the Mg surface'], ['Answer', 'more **successful collisions per second**, so a **faster** rate']], { size: 10.5 });
  D.quickCheck(s, 'Explain why increasing the **pressure** of a mixture of two **gases** increases the rate. Why does temperature have a **bigger** effect than its effect on collision frequency alone?');
  D.notes(s, 'QUICK CHECK ANSWER: Higher pressure: the same number of gas particles in a smaller volume (closer together), so they collide more often: more successful collisions per second. Temperature: particles also have more energy, so a greater proportion of collisions have energy ≥ the activation energy; this energy effect is larger than the small increase in collision frequency.\nC6.2.2 (wording HIGH, code MEDIUM). Particle positions are generated in node (seeded, no overlaps): 6 particles in the low-concentration box, 14 in the high-concentration box, 6 with doubled arrow length for high temperature.\nCommon errors: "particles collide more" without "per second" / more frequently; saying that higher concentration gives particles more energy (it does not); confusing pressure with force.');
  reg(s, 'C6.2.2 Collision theory');
}

// ======================= 11 SURFACE AREA TO VOLUME =======================
reg(D.contentSlide({
  title: 'Surface area to volume ratio',
  subtitle: `Specification ${sp('C6.2.3')} • the effect of the size of the pieces of a reacting solid, in terms of SA:V`,
  tag: 'C6.2.3', caption: 'cubes drawn to the same scale; the volume is the same in both',
  draw: (s) => {
    label(s, 0.7, 1.42, 2.4, '**One 2 cm cube**', { size: 10.5, h: 0.26 });
    cube(s, 1.05, 2.25, 1.4);
    label(s, 0.8, 3.72, 1.9, '2 cm', { size: 10, color: C.grey, h: 0.22 });
    arrow(s, 3.0, 2.95, 3.5, 2.95, C.ink, 2);
    label(s, 2.8, 2.5, 0.9, 'cut', { size: 10, italic: true, h: 0.22 });
    label(s, 3.7, 1.42, 2.6, '**Eight 1 cm cubes**', { size: 10.5, h: 0.26 });
    [[0, 0], [1, 0], [0, 1], [1, 1]].forEach(([i, j]) => cube(s, 3.95 + i * 0.95, 2.25 + j * 0.85, 0.6, { fill: 'F2EBDD' }));
    label(s, 3.95, 3.95, 2.2, 'four shown; four more behind', { size: 10, italic: true, color: C.grey, h: 0.22, align: 'left' });
    const rows = [[HDR(''), HDR('2 cm cube'), HDR('Eight 1 cm cubes')],
      [tcell('Surface area / cm²', 0, { bold: true }), tcell('6 × 2 × 2 = 24', 0), tcell('8 × 6 × 1 × 1 = 48', 0)],
      [tcell('Volume / cm³', 1, { bold: true }), tcell('2 × 2 × 2 = 8', 1), tcell('8 × 1 = 8', 1)],
      [tcell('SA : V', 0, { bold: true }), tcell('24 ÷ 8 = 3', 0, { bold: true, color: C.blue }), tcell('48 ÷ 8 = 6', 0, { bold: true, color: C.red })]];
    s.addTable(rows, { x: 0.7, y: 4.3, w: 5.6, colW: [1.7, 1.75, 2.15], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  },
  head: 'Smaller pieces react faster',
  lines: [
    'A solid can only react at its **surface**, where acid particles can **collide** with it.',
    'Cutting a solid into **smaller pieces** keeps the **volume** the same but exposes **more surface**.',
    'So the **surface area to volume ratio (SA:V)** goes **up**.',
    'More surface: **more frequent collisions**, so a **faster** rate. Powder reacts fastest.',
    'Same mass of solid: the **same total** product, made **sooner**.',
  ],
  size: 11,
  worked: { head: 'Worked example: SA:V', q: 'Compare a 2 cm cube with eight 1 cm cubes.',
    steps: [['SA:V', '24 ÷ 8 = 3, and 48 ÷ 8 = 6'], ['Answer', 'SA:V **doubles**, so collisions are more frequent']], size: 10.5 },
  workedH: 1.3,
  qc: 'A **4 cm** cube is cut into **eight 2 cm** cubes. Calculate SA:V **before** and **after**. Why are powders a fire or explosion risk in flour mills?',
  notes: 'QUICK CHECK ANSWER: Before: SA 6 × 16 = 96 cm², V = 64 cm³, SA:V = 1.5. After: SA 8 × 24 = 192 cm², V = 64 cm³, SA:V = 3. Flour dust has a huge SA:V, so it burns extremely fast in air (an explosion) if ignited.\nAll SA, V and ratios asserted in node. For powder of 0.1 mm grains (0.01 cm), SA:V = 600; for 1 mm grains (0.1 cm), SA:V = 60. SA:V is a ratio with units of 1/cm; at GCSE it is usually written as a ratio, e.g. 6 : 1.\nLink to C4.3: nanoparticles have very high SA:V, which is why they make good catalysts (recap only).',
}), 'C6.2.3 Surface area to volume');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C6.2.1')}, ${sp('C6.2.2')}, ${sp('C6.2.3')} • factors, collisions and SA:V`, [
  { q: 'Use collision theory to explain why magnesium reacts **faster** with **more concentrated** hydrochloric acid.', marks: 2, ms: 'More acid particles in the same volume (1); so more frequent collisions / more successful collisions per second (1).' },
  { q: 'Give **two** reasons why a reaction is faster at a **higher temperature**.', marks: 2, ms: 'Particles move faster so collide more often / more frequent collisions (1); more collisions have energy ≥ activation energy / more energetic collisions (1).' },
  { q: 'Calculate the **surface area to volume ratio** of a cube with sides of **3 cm**.', marks: 2, ms: 'SA = 6 × 3 × 3 = 54 cm² and V = 27 cm³ (1); 54 ÷ 27 = 2 (or 2 : 1) (1).' },
  { q: 'Explain why marble **powder** reacts faster with acid than the same mass of marble **chips**, but gives the **same** total mass of CO₂.', marks: 2, ms: 'Powder has a larger surface area to volume ratio so more frequent collisions (1); same mass / amount of calcium carbonate (limiting), so the same amount of product (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 CATALYSTS =======================
reg(D.contentSlide({
  title: 'Catalysts',
  subtitle: `Specification ${sp('C6.2.4')}, ${sp('C6.2.5')} • the characteristics of catalysts; identify catalysts in reactions`,
  tag: 'C6.2.4', caption: 'hydrogen peroxide with and without manganese(IV) oxide; graph to scale',
  draw: (s) => {
    label(s, 0.6, 1.42, 1.9, '**No catalyst**', { size: 10.5, h: 0.26 });
    flask(s, 1.55, 1.85, 1.2, 1.15, { level: 0.42, bubbles: 2 });
    label(s, 2.4, 1.42, 1.9, '**+ MnO₂ powder**', { size: 10.5, h: 0.26 });
    flask(s, 3.35, 1.85, 1.2, 1.15, { level: 0.42, bubbles: 14, solid: { n: 8, c: '2A2A2A', e: '111111', r: 0.035 } });
    label(s, 0.6, 3.1, 3.8, 'few bubbles of O₂ / **lots** of bubbles of O₂', { size: 10, h: 0.22, color: C.ink });
    pbox(s, 4.35, 1.7, 2.0, 1.25, 'MnO₂ at start **0.50 g**\nfiltered, dried at end **0.50 g**', 'E8F4EC', C.green, { size: 10.5, lw: 1 });
    eqn(s, 0.7, 3.42, 5.6, '2H₂O₂(aq) → 2H₂O(l) + O₂(g)    (MnO₂ catalyst)', { size: 11, h: 0.34 });
    const g = { x: 1.35, y: 3.98, w: 4.9, h: 1.3, xmin: 0, xmax: 120, ymin: 0, ymax: 50, xstep: 20, ystep: 25, xlabel: 'Time / s', ylabel: 'O₂ / cm³', fmt: v => String(v) };
    D.axes(s, g);
    D.fnLine(s, g, t => Vt(0.06, t), 0, 120, 50, C.red, 2);
    D.fnLine(s, g, t => Vt(0.008, t), 0, 120, 50, C.blue, 2);
    label(s, D.px(g, 22), D.py(g, 40) - 0.2, 1.4, 'with catalyst', { size: 10, bold: true, color: C.red, h: 0.22, align: 'left' });
    label(s, D.px(g, 72), D.py(g, 7) - 0.11, 1.5, 'no catalyst', { size: 10, bold: true, color: C.blue, h: 0.22, align: 'left' });
  },
  head: 'Speeding up without being used up',
  lines: [
    'A **catalyst** **speeds up** a reaction but is **not used up**: it is **chemically unchanged** and has the **same mass** at the end.',
    'Only a **small amount** is needed, and it can be **reused**. Most catalysts work only for **particular** reactions.',
    'It does **not** change the **amount of product**, only how **fast** it forms.',
    '**Identify a catalyst**: it is written **over the arrow**, not as a reactant or product, and it is **recovered** at the end.',
  ],
  size: 11,
  worked: { head: 'Worked example: identify the catalyst', q: 'Car exhaust: 2CO(g) + 2NO(g) → 2CO₂(g) + N₂(g), over platinum.',
    steps: [['Check', 'Pt is not in the equation and is not used up'], ['Answer', '**platinum** is the catalyst (in a catalytic converter)']], size: 10.5 },
  workedH: 1.3,
  qc: 'A student adds **1.00 g** of copper(II) oxide to hydrogen peroxide. Bubbling is fast. Afterwards the black solid is filtered and dried: **1.00 g**. What does this show?',
  notes: 'QUICK CHECK ANSWER: Copper(II) oxide is acting as a catalyst: it speeds up the decomposition but its mass is unchanged, so it was not used up. (To be sure it is chemically unchanged, test that the recovered solid still speeds up a fresh sample.)\nC6.2.4 (wording and code HIGH from a search extract); C6.2.5 identify catalysts (UNVERIFIED). Equations atom-balanced in node: 2H₂O₂ → 2H₂O + O₂; 2CO + 2NO → 2CO₂ + N₂. Graph to scale: V = 40(1 − e^(−kt)), k = 0.060 and 0.008 per second; both curves head to the same final 40 cm³ (same amount of H₂O₂); the uncatalysed curve is still rising at 120 s.\nCLEAPSS-style hazards for the demo: hydrogen peroxide below 5% ("10 volume" is about 3%) is LOW HAZARD, but wear eye protection; at higher concentrations it is IRRITANT/CORROSIVE. Manganese(IV) oxide is HARMFUL if swallowed or inhaled: use a spatula tip, avoid raising dust. Copper(II) oxide is HARMFUL and DANGEROUS TO THE ENVIRONMENT: do not pour down the sink.\nOverlap: the iron catalyst in the Haber process belongs to C6.3 and is not used here.',
}), 'C6.2.4–5 Catalysts');

// ======================= 14 ACTIVATION ENERGY AND ENZYMES =======================
reg(D.contentSlide({
  title: 'Activation energy and enzymes',
  subtitle: `Specification ${sp('C6.2.6')}, ${sp('C6.2.7')} • explain catalytic action using activation energy; enzymes as biological catalysts`,
  tag: 'C6.2.6', caption: 'reaction profile for an exothermic reaction; energy values illustrative',
  draw: (s) => {
    const g = { x: 1.4, y: 1.55, w: 4.85, h: 3.05, xmin: 0, xmax: 6, ymin: 0, ymax: 200, xstep: 6, ystep: 20, grid: false, xlabel: 'Progress of reaction', ylabel: 'Energy / kJ', fmt: () => '', yfmt: v => (Math.round(v) % 40 === 0 ? String(Math.round(v)) : '') };
    D.axes(s, g);
    profile(s, g, RP.R, RP.P, RP.peak, C.blue, 2.25);
    profile(s, g, RP.R, RP.P, RP.peakCat, C.red, 2, { dash: 'dash' });
    // guide lines
    line(s, D.px(g, 1.6), D.py(g, RP.R), D.px(g, 5.75), D.py(g, RP.R), C.grey, 0.75, { dash: 'dash' });
    line(s, D.px(g, 3.0), D.py(g, RP.peak), D.px(g, 4.8), D.py(g, RP.peak), C.grey, 0.75, { dash: 'dash' });
    line(s, D.px(g, 1.3), D.py(g, RP.peakCat), D.px(g, 2.9), D.py(g, RP.peakCat), C.grey, 0.75, { dash: 'dash' });
    dArrow(s, D.px(g, 4.7), D.py(g, RP.R), D.py(g, RP.peak), C.blue, 1.5);
    dArrow(s, D.px(g, 3.0), D.py(g, RP.R), D.py(g, RP.peakCat) + 0.03, C.red, 1.5);
    label(s, D.px(g, 4.75), D.py(g, 150) - 0.11, 1.0, '**Ea** = 80', { size: 10, color: C.blue, h: 0.22, align: 'left' });
    label(s, D.px(g, 1.0), D.py(g, 128) - 0.21, 1.15, '**Ea** = 40\n(catalyst, dashed)', { size: 10, color: C.red, h: 0.42, align: 'left' });
    line(s, D.px(g, 5.3), D.py(g, RP.R), D.px(g, 5.3), D.py(g, RP.P), C.green, 1.5, { head: true });
    label(s, D.px(g, 5.32), D.py(g, 75) - 0.11, 0.9, 'energy\nout 60', { size: 10, bold: true, color: C.green, h: 0.4, align: 'left' });
    label(s, D.px(g, 0.5), D.py(g, RP.R) + 0.04, 1.2, 'reactants', { size: 10, bold: true, h: 0.22, align: 'left' });
    label(s, D.px(g, 4.2), D.py(g, RP.P) + 0.03, 1.2, 'products', { size: 10, bold: true, h: 0.22, align: 'left' });
    pbox(s, 0.7, 5.12, 5.6, 0.62, '**Enzymes**: protein catalysts in living things, e.g. **amylase** (starch → sugars) and **catalase** (breaks down H₂O₂)', 'E8F4EC', C.green, { size: 10.5, lw: 1 });
  },
  head: 'How a catalyst works',
  lines: [
    '**Activation energy (Ea)**: the **minimum energy** particles need when they collide for a reaction to happen.',
    'A catalyst provides an **alternative reaction pathway** with a **lower activation energy**.',
    'So a **greater proportion** of collisions have enough energy: **more successful collisions per second**.',
    'The catalyst does **not** change the energy of the reactants or products.',
    '**Enzymes** are **biological catalysts**; industry uses them to work at **lower temperatures**, saving energy.',
  ],
  size: 11,
  worked: { head: 'Worked example: reading a profile', q: 'Use the diagram to find both activation energies.',
    steps: [['Uncatalysed', '180 − 100 = 80 kJ'], ['Answer', 'catalysed: 140 − 100 = **40 kJ**: the catalyst **halves** Ea']], size: 10.5 },
  workedH: 1.3,
  qc: 'On the profile, how much energy is **released**? Does the catalyst change this? Explain why an enzyme in a washing powder lets clothes be washed at **30 °C**.',
  notes: 'QUICK CHECK ANSWER: 100 − 40 = 60 kJ released (exothermic); the catalyst does not change it, because the reactants and products have the same energies. The enzymes lower the activation energy for breaking down stains, so the reaction is fast enough at a low temperature (saving energy; enzymes would also be denatured at high temperatures: biology link, not needed here).\nC6.2.6 (code MEDIUM), C6.2.7 (code UNVERIFIED). Values asserted in node: Ea 80, catalysed Ea 40 (ratio 0.5), energy released 60. The profile curves are generated in node and their peak heights checked (180 and 140 within 1.5 kJ).\nPossible J258-only depth NOT taught: detailed roles of enzymes in DNA replication, protein synthesis and digestion (one extract lists these under a later J258 statement, "C6.2.12", which could not be confirmed for J260). Lock and key and denaturing belong to Biology B.',
}), 'C6.2.6–7 Activation energy and enzymes');

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C6.2.4')}–${sp('C6.2.7')} • catalysts, activation energy and enzymes`, [
  { q: 'Give **two** characteristics of a catalyst.', marks: 2, ms: 'Any two: speeds up / increases the rate of a reaction (1); is not used up / chemically unchanged / same mass at the end (1); only a small amount needed / can be reused / specific to a reaction (1).' },
  { q: '1.00 g of copper(II) oxide is added to hydrogen peroxide. Afterwards **1.00 g** of solid is recovered. The rate was much faster. Is copper(II) oxide a **catalyst**? Explain.', marks: 2, ms: 'Yes (1); it increased the rate and its mass is unchanged / it was not used up (1).' },
  { q: 'Explain, in terms of **activation energy**, how a catalyst increases the rate of a reaction.', marks: 2, ms: 'Provides an alternative pathway / route with a lower activation energy (1); so more collisions have enough energy / more successful collisions per second (1).' },
  { q: 'What are **enzymes**? Give **one** example of an enzyme and the reaction it catalyses.', marks: 2, ms: 'Biological catalysts / catalysts in living things (made of protein) (1); e.g. amylase: starch → sugars / catalase: hydrogen peroxide → water + oxygen / protease: proteins → amino acids (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 PAG C5: METHOD (GAS SYRINGE) =======================
reg(D.contentSlide({
  title: 'Practical: concentration and rate',
  subtitle: `Specification ${sp('C6.2.1')}, ${sp('C6.2.8')} • PAG C5 Measuring rates of reaction: magnesium and hydrochloric acid`,
  tag: 'PAG C5', pag: 'PAG C5', caption: 'gas syringe method; apparatus not to scale',
  draw: (s) => {
    box(s, 0.6, 4.75, 5.8, 0.08, C.wood, '8A5A2B', { lw: 0.75 });
    // clamp stand
    box(s, 4.35, 4.62, 1.5, 0.13, '5A6275', '2D3748', { lw: 0.5 });
    box(s, 5.5, 2.0, 0.08, 2.62, '8C96A8', '5A6275', { lw: 0.5 });
    box(s, 4.3, 2.12, 1.25, 0.07, '8C96A8', '5A6275', { lw: 0.5 });
    flask(s, 1.5, 2.55, 2.1, 1.7, { level: 0.35, bung: true, bubbles: 8 });
    // Mg ribbon in acid
    box(s, 1.2, 4.42, 0.55, 0.05, MGC[0], MGC[1], { lw: 0.75 });
    line(s, 1.5, 2.43, 1.5, 1.95, C.ink, 1.75); line(s, 1.5, 1.95, 2.25, 1.95, C.ink, 1.75);
    gasSyringe(s, 2.25, 1.95, 2.55, 0.4, { h: 0.36, rod: 0.4 });
    label(s, 2.3, 1.45, 2.6, '**gas syringe** (0–100 cm³)', { size: 10.5, h: 0.26, align: 'left' });
    label(s, 0.5, 2.33, 0.68, '**bung**', { size: 10, h: 0.22, align: 'right' });
    label(s, 2.4, 3.55, 1.7, '**1.0 mol/dm³ HCl**\n50 cm³', { size: 10, h: 0.42, align: 'left' });
    label(s, 0.6, 4.88, 2.3, '4.0 cm **Mg ribbon** (0.040 g)', { size: 10, h: 0.22, align: 'left' });
    stopclock(s, 3.55, 4.25, 0.3);
    label(s, 3.0, 4.88, 1.2, '**stopclock**', { size: 10, h: 0.22 });
    pbox(s, 0.7, 5.22, 5.6, 0.5, 'IV: acid concentration • DV: volume of H₂ every 10 s • Control: Mg length, acid volume, temperature', C.white, C.blue, { size: 10, lw: 1 });
  },
  head: 'Method',
  lines: [
    'Measure **50 cm³** of 1.0 mol/dm³ hydrochloric acid into a conical flask. Connect the **gas syringe**, set to zero.',
    'Add a **4.0 cm** strip of clean **Mg ribbon**, put the bung in **quickly** and start the stopclock.',
    'Record the gas **volume every 10 s** until no more gas is made.',
    'Repeat with **0.50 mol/dm³** acid (and other concentrations). Repeat each run and find a **mean**.',
    '**Safety**: eye protection; HCl below 2 mol/dm³ is **LOW HAZARD**; Mg is **FLAMMABLE**; H₂ is **EXTREMELY FLAMMABLE**: no flames nearby.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: is the acid in excess?', q: '50 cm³ of 0.50 mol/dm³ HCl has 0.025 mol; 0.040 g Mg needs 0.0033 mol HCl.',
    steps: [['Compare', '0.025 mol ≫ 0.0033 mol'], ['Answer', 'acid in **excess**: Mg is **limiting** in every run']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why must the **bung** go in **quickly**? Why is the **same length** of magnesium used each time?',
  notes: 'QUICK CHECK ANSWER: Gas made before the bung is in escapes, so the volumes would be too low (and the start time would be wrong). The same length (mass) of Mg is a control variable: it is the limiting reactant, so it fixes the total volume of gas and the surface area, keeping the test fair.\nPAG C5 Measuring rates of reaction (OCR "example set of combined science practicals"; the separate-science equivalent is J258 PAG 8). Worked example (HT moles, asserted in node): 0.050 dm³ × 0.50 mol/dm³ = 0.025 mol HCl; 0.040 ÷ 24.3 = 0.00165 mol Mg needs 2 × 0.00165 = 0.0033 mol HCl. Teacher check only: 0.00165 mol H₂ × 24 000 cm³/mol = 40 cm³ at RTP (molar gas volume is not in J260).\nCLEAPSS-style hazards: hydrochloric acid below 2.0 mol/dm³ LOW HAZARD (wear eye protection; 2–6.5 mol/dm³ IRRITANT); magnesium ribbon FLAMMABLE (Hazcard 59A); hydrogen EXTREMELY FLAMMABLE (no naked flames; small volumes only); magnesium chloride solution low hazard. Do not let the syringe plunger be pushed out: use a 100 cm³ syringe and no more than about 0.05 g Mg.',
}), 'PAG C5: concentration (method)');

// ======================= 17 PAG C5: RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C6.2.9')}, ${sp('C6.2.10')} • PAG C5: table, graph to scale, mean and initial rates, errors`, { pag: 'PAG C5', tag: 'PAG C5' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale from the results table (illustrative data)');
  const g = { x: 1.45, y: 1.5, w: 5.3, h: 2.75, xmin: 0, xmax: 120, ymin: 0, ymax: 50, xstep: 20, ystep: 10, minor: 2, xlabel: 'Time / s', ylabel: 'Volume of H₂ / cm³', fmt: v => String(v) };
  D.axes(s, g);
  D.fnLine(s, g, t => Vt(K1, t), 0, 120, 60, C.red, 2);
  D.fnLine(s, g, t => Vt(K05, t), 0, 120, 60, C.blue, 2);
  D.points(s, g, TT.map((t, i) => [t, V1[i]]), C.ink);
  D.points(s, g, TT.map((t, i) => [t, V05REC[i]]), C.ink);
  s.addShape(SH.OVAL, { x: D.px(g, 40) - 0.13, y: D.py(g, 21) - 0.13, w: 0.26, h: 0.26, fill: { type: 'none' }, line: { color: C.orange, width: 1.5 } });
  label(s, D.px(g, 40) + 0.17, D.py(g, 21) - 0.02, 0.9, 'anomaly', { size: 10, bold: true, color: C.orange, align: 'left', h: 0.22 });
  label(s, D.px(g, 62), D.py(g, 42) - 0.12, 1.6, '1.0 mol/dm³', { size: 10, bold: true, color: C.red, align: 'left', h: 0.22 });
  label(s, D.px(g, 70), D.py(g, 30) - 0.02, 1.6, '0.50 mol/dm³', { size: 10, bold: true, color: C.blue, align: 'left', h: 0.22 });
  const rows = [[HDR('Time / s'), ...TT.map(t => HDR(String(t)))],
    [tcell('1.0 mol/dm³ / cm³', 0, { bold: true }), ...V1.map(v => tcell(String(v), 0))],
    [tcell('0.50 mol/dm³ / cm³', 1, { bold: true }), ...V05REC.map((v, i) => tcell(String(v), 1, i === 4 ? { bold: true, color: C.orange } : {}))]];
  s.addTable(rows, { x: 0.65, y: 4.92, w: 6.2, colW: [1.7, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], rowH: 0.22, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.85, 'Worked example: compare the rates', 'Mean rate over the first 20 s for each acid.', [
    ['1.0 mol/dm³', '25 ÷ 20 = 1.25 = **1.3 cm³/s**'], ['0.50 mol/dm³', '16 ÷ 20 = 0.80 cm³/s'], ['Answer', 'the more concentrated acid reacts **faster**']], { size: 10.5 });
  D.card(s, 7.3, 3.3, 5.58, 2.95, 'Conclusion and errors', [
    'Higher concentration: **steeper** curve, **faster** rate; both reach **40 cm³** because the Mg is **limiting**.',
    '!!HT!! Initial rates (tangents at 0 s): **2.0** and **1.0 cm³/s**: doubling concentration **doubles** the initial rate.',
    '**Errors**: gas lost before the bung is in; the plunger **sticks** (as at 40 s); acid warms up as it reacts.',
    '**Improve**: repeat and take a **mean**; ignore the anomaly; use a water bath at constant temperature.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the graph: how long does each reaction take to make **30 cm³** of gas? Why do **both** curves level off at the **same** volume?');
  D.notes(s, `QUICK CHECK ANSWER: About 28 s with 1.0 mol/dm³ and about 55 s with 0.50 mol/dm³ (accept ±3 s). Both level off at 40 cm³ because the same mass of Mg is used and it is the limiting reactant (acid in excess), so the same amount of hydrogen forms.\nIllustrative data from V = 40(1 − e^(−kt)), k = 0.050 /s (1.0 mol/dm³) and 0.025 /s (0.50 mol/dm³), rounded to 1 cm³ and asserted in node: 1.0: ${V1.join(', ')}; 0.50: ${V05.join(', ')} (the recorded 21 cm³ at 40 s is the anomaly; expected 25 cm³). Mean rates asserted: 25 ÷ 20 = 1.25 → 1.3 cm³/s; 16 ÷ 20 = 0.80 cm³/s. Exact times to 30 cm³: ln 4 ÷ k = 27.7 s and 55.5 s.\nHT: initial gradients = 40k = 2.0 and 1.0 cm³/s. Mean rates over 20 s give a ratio of only 1.6 because the faster reaction is already slowing; initial rates show the true effect.`);
  reg(s, 'PAG C5: concentration (results)');
}
calc('QC time to 30 cm³ at 1.0 M', r1(Math.log(4) / K1), 27.7, 1e-9);
calc('QC time to 30 cm³ at 0.50 M', r1(Math.log(4) / K05), 55.5, 1e-9);

// ======================= 18 PAG C5: DISAPPEARING CROSS (TEMPERATURE) =======================
{
  const s = D.contentHeader('Practical: temperature and rate', `Specification ${sp('C6.2.1')}, ${sp('C6.2.8')} • PAG C5: sodium thiosulfate and acid, the disappearing cross`, { pag: 'PAG C5', tag: 'PAG C5' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'graph of relative rate (1000 ÷ time) against temperature, to scale');
  const g = { x: 1.4, y: 1.5, w: 4.85, h: 3.6, xmin: 10, xmax: 60, ymin: 0, ymax: 80, xstep: 10, ystep: 10, minor: 2, xlabel: 'Temperature / °C', ylabel: 'Relative rate (1000 ÷ time)', fmt: v => String(v) };
  D.axes(s, g);
  D.fnLine(s, g, Tc => FA * Math.exp(FB * Tc), 17, 52, 50, C.blue, 2);
  assert(FA * Math.exp(FB * 52) < 80, 'fit curve stays inside the axes');
  D.points(s, g, DT.map((Tc, i) => [Tc, DRATE[i]]), C.ink);
  label(s, D.px(g, 18), D.py(g, 60), 2.4, 'curve gets **steeper**: rate rises faster at higher temperatures', { size: 10, color: C.blue, h: 0.45, align: 'left', valign: 'top' });
  // mini apparatus to the right side of panel bottom
  box(s, 6.8, 1.3, 2.0, 2.05, C.panel, 'DED4EE', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  eye(s, 7.8, 1.52);
  line(s, 7.8, 1.62, 7.8, 2.1, C.grey, 1, { dash: 'dash' });
  flask(s, 7.8, 2.18, 0.8, 0.95, { level: 0.45, liquid: CLOUDY });
  box(s, 7.05, 2.98, 1.5, 0.1, C.white, C.ink, { lw: 0.75 });
  line(s, 7.65, 3.0, 7.95, 3.06, C.ink, 2); line(s, 7.65, 3.06, 7.95, 3.0, C.ink, 2);
  label(s, 6.85, 3.1, 1.9, 'paper with **X**', { size: 10, h: 0.22 });
  D.card(s, 9.0, 1.3, 3.88, 2.05, 'Method', [
    'Warm **50 cm³** sodium thiosulfate solution to the set temperature.',
    'Add **5 cm³** of HCl, swirl, start timing.',
    'Stop when the **X** is hidden. Repeat 3 times.',
  ], { size: 10.5 });
  const rows = [[HDR('T / °C'), HDR('t1 / s'), HDR('t2 / s'), HDR('t3 / s'), HDR('Mean / s'), HDR('1000 ÷ t')],
    ...DT.map((Tc, i) => [tcell(String(Tc), i, { bold: true }), ...DREP[i].map((v, j) => tcell(String(v), i, i === DANOM[0] && j === DANOM[1] ? { bold: true, color: C.orange } : {})), tcell(String(DMEAN[i]), i, { bold: true }), tcell(DRATE[i].toFixed(1), i)])];
  s.addTable(rows, { x: 6.8, y: 3.45, w: 6.08, colW: [0.95, 0.95, 0.95, 0.95, 1.13, 1.15], rowH: 0.24, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 6.8, 5.02, 6.08, 1.23, null, [
    '**Safety**: **SO₂** is **TOXIC**: ventilate well, asthma sufferers take care; do not heat above **50 °C**; eye protection.',
    '**Errors**: judging when the X disappears; temperature falls during the run. **Improve**: same person and X; use a light sensor.',
  ], { size: 10.5 });
  D.quickCheck(s, 'At 40 °C, which time is **anomalous**? Calculate the mean **without** it. Use the graph to predict the time taken at **45 °C**.');
  D.notes(s, `QUICK CHECK ANSWER: 36 s is anomalous (the others are 27 s and 29 s). Mean = (27 + 29) ÷ 2 = 28 s (including 36 s would give 30.7 s). At 45 °C the curve reads about 49, so time ≈ 1000 ÷ 49 ≈ 20 s (accept 18–22 s).\nEquation (atom balance asserted in node): Na₂S₂O₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + SO₂(g) + S(s); the sulfur precipitate hides the cross. Data asserted in node: means ${DMEAN.join(', ')} s; 1000 ÷ t = ${DRATE.join(', ')}. The curve is an exponential fit (within 3% of every point). Rate roughly doubles for each 10 °C rise (19.2 ÷ 10.2 = 1.9).\nCLEAPSS-style hazards: sodium thiosulfate solution LOW HAZARD; hydrochloric acid 1.0 mol/dm³ LOW HAZARD; sulfur dioxide gas TOXIC and can trigger asthma: use dilute solutions and small volumes, good ventilation, do not heat thiosulfate above 50 °C, pour away into a sink with plenty of water (or neutralise with sodium carbonate) straight after each run. Eye protection.\nGRADE 7–9 STRETCH: 1000 ÷ t is used because rate is inversely proportional to the time for the same amount of sulfur to form.`);
  reg(s, 'PAG C5: temperature (disappearing cross)');
}

// ======================= 19 RECAP 4 =======================
const R4 = D.recapSlide(4, 'PAG C5 Measuring rates of reaction • gas syringe and disappearing cross', [
  { q: 'In the magnesium and acid practical, state the **independent variable** and **one control variable**.', marks: 2, ms: 'IV: concentration of the acid (1); control: any one of length / mass of magnesium, volume of acid, temperature (1).' },
  { q: 'The 1.0 mol/dm³ and 0.50 mol/dm³ curves both level off at **40 cm³**. Explain why.', marks: 2, ms: 'The same mass / amount of magnesium is used (1); magnesium is the limiting reactant / acid in excess, so the same amount of hydrogen is made (1).' },
  { q: 'Disappearing-cross times at 40 °C were **27 s**, **36 s** and **29 s**. Identify the anomaly and calculate the mean time.', marks: 2, ms: '36 s is anomalous (1); (27 + 29) ÷ 2 = 28 s (1).' },
  { q: 'Suggest **one** source of error in the disappearing-cross method and **one** improvement.', marks: 2, ms: 'Error: judging the moment the cross disappears is subjective / temperature falls during the run / timing reaction (1); improvement: same person, same cross and lighting / use a light sensor and data logger / water bath (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 20 EQUATIONS SUMMARY =======================
T.addEq('MEAN', { eq: 'rate = amount ÷ t', words: 'mean rate of reaction = amount of product formed (or reactant used) ÷ time taken (g/s, cm³/s; HT mol/s)', status: 'recall' });
T.addEq('TAN', { eq: 'rate = Δy ÷ Δx', words: 'HT: rate at a given time = gradient of the tangent to the curve at that time', status: 'recall' });
T.addEq('RECIP', { eq: 'rate ∝ 1 ÷ time', words: 'for a fixed end point (e.g. the cross disappears), relative rate = 1 ÷ time (or 1000 ÷ time)', status: 'recall' });
T.addEq('SAV', { eq: 'SA:V = SA ÷ V', words: 'surface area to volume ratio = surface area (cm²) ÷ volume (cm³); cube of side a: 6a² ÷ a³', status: 'recall' });
reg(D.equationsSlide([['MEAN', 'C6.2.10'], ['TAN', 'C6.2.10 HT'], ['RECIP', 'PAG C5'], ['SAV', 'C6.2.3']], {
  subtitle: `${DECK.code} • learn these relationships • the HT row is Higher tier only`,
  qc: 'A reaction makes **60 cm³** of gas in **50 s**. Calculate the mean rate. The cross disappears in **20 s**: what is 1000 ÷ time?',
  notes: 'QUICK CHECK ANSWER: 60 ÷ 50 = 1.2 cm³/s. 1000 ÷ 20 = 50 (relative rate, per second ×1000).\nThese relationships are not on the J260 equation sheet (that sheet covers physics), so students recall them. The SA:V formula for a cube links to C4.3 (nanoparticles) and Biology B.',
}), 'Summary: equations');
calc('equations QC 1000/20', 1000 / 20, 50);

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Rate of reaction', 'How fast a reactant is used up or a product is formed.'],
  ['Mean rate', 'Amount of product formed ÷ time taken, e.g. in cm³/s or g/s.'],
  ['Gradient', 'The slope of a graph: change in y ÷ change in x. On a rate graph it is the rate.'],
  ['Tangent (HT)', 'A straight line touching a curve at one point; its gradient is the rate at that time.'],
  ['Collision theory', 'Particles must collide, with enough energy, for a reaction to happen.'],
  ['Collision frequency', 'The number of collisions per second.'],
  ['Successful collision', 'A collision with energy ≥ the activation energy, so the particles react.'],
  ['Activation energy', 'The minimum energy colliding particles need for a reaction to happen.'],
  ['Concentration', 'How much solute is dissolved in a given volume of solution.'],
  ['Pressure (gas)', 'Higher pressure: gas particles closer together, so more frequent collisions.'],
  ['SA:V ratio', 'Surface area ÷ volume. Smaller pieces have a larger SA:V.'],
  ['Catalyst', 'Speeds up a reaction; not used up; chemically unchanged at the end.'],
  ['Alternative pathway', 'The route a catalyst provides, with a lower activation energy.'],
  ['Enzyme', 'A biological catalyst (a protein), e.g. amylase or catalase.'],
  ['Reaction profile', 'Energy diagram showing reactants, products and the activation energy.'],
  ['Gas syringe', 'Apparatus that collects and measures the volume of gas made.'],
], { notes: 'Use as a cover-and-recall activity. The tangent is Higher tier only. Yield, reversible reactions and equilibrium terms belong to C6.3 and are not included.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student adds marble chips (calcium carbonate) to **excess** hydrochloric acid in an open flask on a balance, with a cotton wool plug. Mass of CO₂ lost / g at 0, 20, 40, 60, 80, 100, 120 s: **0, 0.43, 0.70, 0.85, 0.95, 1.01, 1.05**.', [
  { l: 'a', q: 'Write the **balanced equation**, with state symbols, for the reaction of calcium carbonate with hydrochloric acid.', marks: 2, ms: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂ (formulae and balancing) (1); state symbols (s), (aq), (aq), (l), (g) (1).' },
  { l: 'b', q: 'Explain why the student used a **cotton wool plug** and not a bung.', marks: 1, ms: 'Lets the CO₂ escape (so mass is lost and can be measured) but stops acid spray / liquid escaping (1).', h: 0.8 },
  { l: 'c', q: 'Calculate the **mean rate** of reaction over the first **60 s**. Give the unit.', marks: 2, ms: '0.85 ÷ 60 (1); = 0.014 g/s (accept 0.0142 g/s; unit needed) (1).', h: 0.9 },
  { l: 'd', q: 'A tangent to the curve at 40 s passes through **(0 s, 0.30 g)** and **(80 s, 1.10 g)**. Calculate the rate at 40 s.', marks: 2, ht: true, ms: '(1.10 − 0.30) ÷ (80 − 0) = 0.80 ÷ 80 (1); = 0.010 g/s (1).', h: 1.0 },
  { l: 'e', q: 'The student repeats the experiment with the **same mass** of marble **powder**. Describe and explain the effect on the **rate** and on the **total mass** of CO₂ lost.', marks: 3, ms: 'Rate faster / steeper curve (1); powder has a larger surface area to volume ratio, so more frequent collisions (1); total mass of CO₂ the same because the same mass of (limiting) calcium carbonate is used (1).', h: 1.3 },
  { l: 'f', q: 'Use collision theory to explain why the reaction is **faster** if the acid is **warmer**.', marks: 3, ms: 'Particles have more (kinetic) energy / move faster (1); collide more frequently (1); a greater proportion of collisions have energy ≥ the activation energy / more successful collisions per second (1).', h: 1.2 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (d) is HT` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Apparatus: conical flask, bung and delivery tube, gas syringe (or upturned measuring cylinder in a trough of water), stopclock, measuring cylinder.',
    'Method: measure a fixed volume of acid (e.g. 50 cm³); add a fixed length / mass of magnesium ribbon; insert bung quickly; start the clock; read the gas volume every 10 s until no more gas.',
    'Vary the concentration (e.g. 0.25, 0.50, 0.75, 1.0 mol/dm³); keep temperature, volume of acid and length of Mg the same; repeat each concentration and calculate means.',
    'Results: plot volume of gas against time for each concentration; compare the gradients / mean rates over the first 20 s (HT: tangents at t = 0 for initial rates).',
    'Safety: eye protection; hydrogen is extremely flammable, so no flames; dilute acid low hazard.',
    'Expected result: higher concentration gives a steeper curve / faster rate; same final volume (Mg limiting).',
    'Explanation: more acid particles in the same volume, so more frequent collisions with the magnesium surface, so more successful collisions per second.',
  ], {
    l3: 'Describes a clear, workable method that would give valid rates (including how the gas is measured over time and the control variables) AND explains the expected effect of concentration using the frequency of collisions.',
    l2: 'Describes a method that measures gas volume or mass over time AND states the expected effect of concentration, with a partial explanation.',
    l1: 'Simple statements, e.g. "time how long it takes" or "stronger acid reacts faster".',
  });
}
const HW = [
  { n: '1', q: 'What is a **catalyst**?', marks: 1, ms: 'A substance that speeds up / increases the rate of a reaction without being used up / is chemically unchanged at the end (1).' },
  { n: '2', q: 'Give **two** ways to increase the rate of reaction between **zinc** granules and **sulfuric acid**, other than using a catalyst.', marks: 2, ms: 'Any two: increase the temperature / heat the acid (1); use more concentrated acid (1); use zinc powder / smaller pieces (1).' },
  { n: '3', q: 'Calculate SA:V for a **1 cm** cube and for a **0.5 cm** cube. Which reacts faster with acid, per gram?', marks: 2, ms: '6 and 12 (both needed) (1); the 0.5 cm cubes (larger SA:V) (1).' },
  { n: '4', q: 'A reaction makes **60 cm³** of gas in the first **50 s**. Calculate the **mean rate**, with its unit.', marks: 2, ms: '60 ÷ 50 (1); = 1.2 cm³/s (1).' },
  { n: '5', q: 'A tangent to a curve of volume of gas against time passes through **(0 s, 4 cm³)** and **(30 s, 22 cm³)**. Calculate the rate.', marks: 2, ht: true, ms: '(22 − 4) ÷ 30 = 18 ÷ 30 (1); = 0.60 cm³/s (1).', h: 1.1 },
  { n: '6', q: 'On a reaction profile the reactants are at **90 kJ**, the peak at **150 kJ** and the products at **30 kJ**. Find the **activation energy** and the energy **released**.', marks: 2, ms: 'Activation energy 150 − 90 = 60 kJ (1); energy released 90 − 30 = 60 kJ (1).', h: 1.1 },
  { n: '7', q: 'Describe how a student could investigate the effect of acid **concentration** on the rate of reaction between **magnesium** and **hydrochloric acid**, and **explain** the result they should get.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q5 is Higher tier.', HW, 17, { dividerSub: 'C6.2 Rates of reaction • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4].forEach(r => assert.strictEqual(r.total, 8));
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C6.2') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom-balanced`);
const out = path.join(__dirname, 'OCR21C_C6.2_RatesOfReaction_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
