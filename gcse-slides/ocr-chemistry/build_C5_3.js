// build_C5_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C5 Chemical analysis, C5.3 How are the amounts of chemicals in solution measured?
// (one deck, Higher & Foundation; Part 3 of 3, the last C5 deck)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C5_3.js
// Structure copied from build_C4_4.js. ocr_chem_template.js is NOT edited: beaker, conical flask, volumetric flask,
// burette, pipette, funnel, balance, meniscus, Mr and equation-balance helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C5_3.md): J260 C5.3 = J258 C5.4 renumbered (J258 C5.2 "composition of unknown samples" is
// separate-science only). Taught: concentration in g/dm³ (both tiers), mol/dm³ and conversions (HT), standard
// solutions, titration (apparatus, indicator, procedure), titration calculations (HT), precision, accuracy,
// uncertainty and evaluating titration data. Separation and purity (C5.1) and moles / reacting masses (C5.2) are
// recap only.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C5', chapterTitle: 'Chemical analysis', code: 'C5.3', title: 'How are the amounts of chemicals in solution measured?',
  part: 3, parts: 3, specRange: 'C5.3.1–C5.3.7',
  subtitle: 'How are the amounts of chemicals in solution measured?',
  keywords: ['Concentration', 'Standard solution', 'Titration', 'Concordant titres', 'Uncertainty'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
const f2 = v => v.toFixed(2);

// ======================= EQUATIONS: atom and charge balance (asserted) =======================
function parseFormula(f) {
  if (f === 'e-') return { atoms: {}, charge: -1 };
  let charge = 0, body = f;
  const m = f.match(/^(.*?)(\d*)([+-])$/);
  if (m) { body = m[1]; charge = (m[3] === '+' ? 1 : -1) * (m[2] ? +m[2] : 1); }
  const stack = [{}]; let lastAdded = null;
  const tokens = body.match(/([A-Z][a-z]?|\(|\)|\d+)/g) || [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === '(') { stack.push({}); lastAdded = null; }
    else if (t === ')') {
      const grp = stack.pop(); let n = 1;
      if (tokens[i + 1] && /^\d+$/.test(tokens[i + 1])) n = +tokens[++i];
      for (const [k, v] of Object.entries(grp)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] || 0) + v * n;
      lastAdded = null;
    } else if (/^\d+$/.test(t)) stack[stack.length - 1][lastAdded] += +t - 1;
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
}
balanced('NaOH + HCl → NaCl + H2O', [[1, 'NaOH'], [1, 'HCl']], [[1, 'NaCl'], [1, 'H2O']]);
balanced('ionic H+ + OH- → H2O', [[1, 'H+'], [1, 'OH-']], [[1, 'H2O']]);
balanced('H2SO4 + 2NaOH → Na2SO4 + 2H2O', [[1, 'H2SO4'], [2, 'NaOH']], [[1, 'Na2SO4'], [2, 'H2O']]);
balanced('KOH + HNO3 → KNO3 + H2O', [[1, 'KOH'], [1, 'HNO3']], [[1, 'KNO3'], [1, 'H2O']]);
balanced('starter 2Na + 2H2O → 2NaOH + H2', [[2, 'Na'], [2, 'H2O']], [[2, 'NaOH'], [1, 'H2']]);
balanced('Na2CO3 + 2HCl → 2NaCl + H2O + CO2', [[1, 'Na2CO3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'H2O'], [1, 'CO2']]);
assert.throws(() => balanced('unbalanced test', [[1, 'H2SO4'], [1, 'NaOH']], [[1, 'Na2SO4'], [2, 'H2O']]));
assert.throws(() => balanced('unbalanced charge', [[1, 'H+']], [[1, 'H2O']]));

// relative formula mass from the formula (Ar values as on the OCR data sheet, Cl = 35.5)
const AR = { H: 1, C: 12, O: 16, Na: 23, S: 32, Cl: 35.5, K: 39, N: 14 };
const Mr = f => Object.entries(parseFormula(f).atoms).reduce((a, [k, v]) => a + AR[k] * v, 0);
const MR = {};
[['NaOH', 40], ['HCl', 36.5], ['H2SO4', 98], ['Na2CO3', 106], ['NaCl', 58.5], ['KOH', 56], ['HNO3', 63]].forEach(([f, v]) => { MR[f] = calc(`Mr ${f}`, Mr(f), v, 1e-9); });

// ======================= CALCULATIONS (asserted) =======================
const cm3 = v => v / 1000; // cm³ → dm³
// starter
calc('starter Mr NaOH', MR.NaOH, 40);
calc('starter HT moles in 4.0 g NaOH', 4.0 / 40, 0.10, 1e-12);
// slide 5: g/dm³
calc('250 cm³ in dm³', cm3(250), 0.25, 1e-12);
calc('5.0 g in 250 cm³', 5.0 / cm3(250), 20, 1e-9);
calc('1 dm³ = 10 × 10 × 10 cm³', 10 * 10 * 10, 1000);
calc('QC 12 g in 400 cm³', 12 / cm3(400), 30, 1e-9);
calc('QC 1.5 dm³ in cm³', 1.5 * 1000, 1500, 1e-9);
// slide 6: rearranging
calc('mass in 25.0 cm³ of 40 g/dm³', 40 * cm3(25.0), 1.0, 1e-12);
calc('volume to hold 6.0 g at 30 g/dm³ (dm³)', 6.0 / 30, 0.2, 1e-12);
calc('volume in cm³', 0.2 * 1000, 200, 1e-9);
[[10, 250], [20, 500], [40, 1000]].forEach(([m, v]) => calc(`${m} g in ${v} cm³ = 40 g/dm³`, m / cm3(v), 40, 1e-9));
calc('QC 2.5 g in 50 cm³', 2.5 / cm3(50), 50, 1e-9);
calc('QC sea water 2.0 dm³ × 35 g/dm³', 2.0 * 35, 70, 1e-9);
// slide 8 (HT): mol/dm³
const nNa = calc('4.0 g NaOH → mol', 4.0 / MR.NaOH, 0.1, 1e-12);
calc('0.10 mol in 250 cm³', nNa / cm3(250), 0.4, 1e-12);
calc('40 g NaOH = 1 mol in 1 dm³', 40 / MR.NaOH / 1, 1, 1e-12);
calc('QC 0.050 mol in 200 cm³', 0.050 / cm3(200), 0.25, 1e-12);
calc('QC moles in 25.0 cm³ of 0.100', 0.100 * cm3(25.0), 0.0025, 1e-12);
// slide 9 (HT): converting
calc('0.100 mol/dm³ HCl → g/dm³', 0.100 * MR.HCl, 3.65, 1e-9);
calc('9.8 g/dm³ H2SO4 → mol/dm³', 9.8 / MR.H2SO4, 0.1, 1e-12);
calc('QC 20 g/dm³ NaOH → mol/dm³', 20 / MR.NaOH, 0.5, 1e-12);
calc('QC 0.20 mol/dm³ KOH → g/dm³', 0.20 * MR.KOH, 11.2, 1e-9);
// slide 11: standard solution
calc('Na2CO3 250 cm³ of 10.6 g/dm³', 10.6 * cm3(250), 2.65, 1e-9);
calc('HT 10.6 g/dm³ Na2CO3 → mol/dm³', 10.6 / MR.Na2CO3, 0.1, 1e-12);
calc('HT 0.0250 mol × 106', 0.100 * cm3(250) * MR.Na2CO3, 2.65, 1e-9);
calc('QC NaCl 100 cm³ of 20 g/dm³', 20 * cm3(100), 2.0, 1e-12);
// practical data (illustrative): 25.0 cm³ of 0.100 mol/dm³ NaOH titrated with HCl of unknown concentration
const RUNS = [['Rough', 0.00, 23.10], ['1', 0.20, 22.65], ['2', 0.10, 22.65], ['3', 0.35, 22.85]];
const TITRES = RUNS.map(([n, a, b]) => +(b - a).toFixed(2));
assert.deepStrictEqual(TITRES, [23.10, 22.45, 22.55, 22.50]);
const conc = TITRES.slice(1);
calc('concordant range', +(Math.max(...conc) - Math.min(...conc)).toFixed(2), 0.10, 1e-9);
const meanT = calc('mean titre', conc.reduce((a, b) => a + b, 0) / 3, 22.50, 1e-9);
// HT titration calculation
const nOH = calc('n NaOH = 0.100 × 0.0250', 0.100 * cm3(25.0), 0.0025, 1e-12);
const cHCl = calc('c HCl = 0.00250 ÷ 0.02250', nOH / cm3(meanT), 0.1111111111111111, 1e-9);
calc('c HCl 3 s.f.', sf(cHCl, 3), 0.111, 1e-12);
calc('c HCl g/dm³ (3 s.f.)', sf(cHCl * MR.HCl, 3), 4.06, 1e-12);
calc('QC 20.0 cm³ of 0.150 HCl → 25.0 cm³ NaOH', 0.150 * cm3(20.0) / cm3(25.0), 0.12, 1e-12);
// 1:2 example
calc('H2SO4 eg n NaOH 0.200 × 0.0250', 0.200 * cm3(25.0), 0.005, 1e-12);
calc('H2SO4 eg n acid', 0.005 / 2, 0.0025, 1e-12);
calc('H2SO4 eg c = 0.00250 ÷ 0.0200', 0.0025 / cm3(20.0), 0.125, 1e-12);
// pH curve for the practical (illustrative but computed): 25.0 cm³ 0.100 NaOH + V cm³ HCl at cHCl
function pH(V) {
  const nA = cHCl * V / 1000, vol = (25 + V) / 1000, ex = nOH - nA;
  if (Math.abs(ex) < 1e-12) return 7;
  return ex > 0 ? 14 + Math.log10(ex / vol) : -Math.log10(-ex / vol);
}
calc('pH at start', pH(0), 13, 1e-9);
calc('pH at end point', pH(meanT), 7, 1e-9);
calc('pH at 40 cm³ (2 d.p.)', +pH(40).toFixed(2), 1.52, 1e-9);
// slide 18: uncertainty
calc('% uncertainty titre 0.10 / 22.50', 0.10 / 22.50 * 100, 0.4444444444444445, 1e-9);
calc('% titre 2 s.f.', sf(0.10 / 22.50 * 100, 2), 0.44, 1e-12);
calc('% pipette 0.06 / 25.0', 0.06 / 25.0 * 100, 0.24, 1e-9);
calc('% cylinder 0.5 / 25', 0.5 / 25 * 100, 2.0, 1e-9);
calc('QC % 0.10 / 12.50', 0.10 / 12.50 * 100, 0.8, 1e-9);
// slide 19: evaluating data
const SA = [22.45, 22.50, 22.55], SB = [21.80, 22.40, 22.90], SC = [23.35, 23.40, 23.45];
const mean = a => a.reduce((x, y) => x + y, 0) / a.length, range = a => +(Math.max(...a) - Math.min(...a)).toFixed(2);
calc('A mean', mean(SA), 22.5, 1e-9); calc('A range', range(SA), 0.10, 1e-12);
calc('B mean (2 d.p.)', +mean(SB).toFixed(2), 22.37, 1e-12); calc('B range', range(SB), 1.10, 1e-12);
calc('C mean', mean(SC), 23.4, 1e-9); calc('C range', range(SC), 0.10, 1e-12);
calc('QC concordant mean 22.40, 22.35, 22.45', mean([22.40, 22.35, 22.45]), 22.4, 1e-9);
// recaps
calc('R1 Q2 250 cm³ → dm³', cm3(250), 0.25, 1e-12); calc('R1 Q2 2.5 dm³ → cm³', 2.5 * 1000, 2500, 1e-9);
calc('R1 Q3 8.0 g in 200 cm³', 8.0 / cm3(200), 40, 1e-9);
calc('R1 Q4 0.50 dm³ × 120 g/dm³', 0.50 * 120, 60, 1e-9);
calc('R2 Q1 10 g NaOH', 10 / MR.NaOH, 0.25, 1e-12);
calc('R2 Q2 0.020 mol in 250 cm³', 0.020 / cm3(250), 0.08, 1e-12);
calc('R2 Q3 20.0 cm³ × 0.50', 0.50 * cm3(20.0), 0.01, 1e-12);
calc('R2 Q4 0.20 × 36.5', 0.20 * MR.HCl, 7.3, 1e-9);
calc('R4 Q1 23.15 − 0.40', 23.15 - 0.40, 22.75, 1e-9);
calc('R4 Q2 mean 23.85, 23.90, 23.80', mean([23.85, 23.90, 23.80]), 23.85, 1e-9);
calc('R4 Q3 0.00250 / 0.0200', 0.100 * cm3(25.0) / cm3(20.00), 0.125, 1e-12);
calc('R4 Q4 0.050 × 0.0200 × 2', 0.050 * cm3(20.0) * 2, 0.002, 1e-12);
calc('R5 Q2 0.10 / 25.00', 0.10 / 25.00 * 100, 0.4, 1e-9);
// full question
const FQ = [20.60, 20.05, 20.15, 20.10];
const fqMean = calc('FQ mean of concordant', mean(FQ.slice(1)), 20.1, 1e-9);
calc('FQ range', range(FQ.slice(1)), 0.10, 1e-12);
calc('FQ (d) mass HCl 3.65 × 0.02010 (3 s.f.)', sf(3.65 * cm3(fqMean), 3), 0.0734, 1e-12);
const fqn = calc('FQ (e) n HCl', 0.100 * cm3(fqMean), 0.00201, 1e-12);
calc('FQ (e) c NaOH', fqn / cm3(25.0), 0.0804, 1e-9);
// homework
calc('HW Q2 6.0 g in 150 cm³', 6.0 / cm3(150), 40, 1e-9);
calc('HW Q3 mean 18.20, 18.25, 18.15', mean([18.20, 18.25, 18.15]), 18.2, 1e-9);
calc('HW Q5 2.0 g NaOH in 500 cm³', 2.0 / MR.NaOH / cm3(500), 0.1, 1e-12);
calc('HW Q6 0.25 mol/dm³ NaOH → g/dm³', 0.25 * MR.NaOH, 10, 1e-9);

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
const GLASS = 'EEF5FB', WAT = ['CFE4F7', '5B9BD5'], PINK = ['F4B6D2', 'C2185B'], ACID = 'DDEFF7', SOLUTE = ['6A3FA0', '4A2A75'];
// beaker: top-left (x, y), level = fraction filled
function beaker(s, x, y, w, h, o = {}) {
  box(s, x, y, w, h, GLASS, null);
  if (o.level) box(s, x, y + h * (1 - o.level), w, h * o.level, o.liquid || WAT[0], null);
  line(s, x, y, x, y + h, C.ink, 1.25); line(s, x + w, y, x + w, y + h, C.ink, 1.25); line(s, x, y + h, x + w, y + h, C.ink, 1.25);
  line(s, x - 0.06, y, x, y, C.ink, 1.25); line(s, x + w, y, x + w + 0.06, y, C.ink, 1.25);
  if (o.dots) o.dots.forEach(([dx, dy]) => ball(s, x + dx * w, y + h * (1 - o.level) + dy * h * o.level, o.r || 0.05, SOLUTE[0], SOLUTE[1], 0.5));
}
// conical flask: centre cx, bottom yb
function conical(s, cx, yb, w, h, o = {}) {
  const nw = 0.3 * w, nh = 0.3 * h, bh = h - nh;
  const outline = [[cx - nw / 2, yb - h], [cx - nw / 2, yb - bh], [cx - w / 2, yb], [cx + w / 2, yb], [cx + nw / 2, yb - bh], [cx + nw / 2, yb - h]];
  poly(s, outline, GLASS, null);
  if (o.level) {
    const L = o.level * bh, wl = w - (w - nw) * (L / bh);
    poly(s, [[cx - wl / 2, yb - L], [cx - w / 2, yb], [cx + w / 2, yb], [cx + wl / 2, yb - L]], o.liquid || WAT[0], null);
  }
  poly(s, outline, null, C.ink, { open: true, lw: 1.25 });
  line(s, cx - w / 2, yb, cx + w / 2, yb, C.ink, 1.25);
}
// burette: centre cx, top yTop, tube length len; level = reading (cm³) of liquid surface; scale 0 at top, 50 at bottom
function burette(s, cx, yTop, len, o = {}) {
  const w = o.w || 0.2, y0 = yTop + 0.15, y50 = yTop + len - 0.2, yv = v => y0 + (y50 - y0) * v / 50;
  box(s, cx - w / 2, yTop, w, len, GLASS, null);
  const ly = yv(o.level || 0);
  box(s, cx - w / 2, ly, w, yTop + len - ly, o.liquid || ACID, null);
  for (let v = 0; v <= 50; v += 5) {
    const maj = v % 10 === 0;
    line(s, cx - w / 2, yv(v), cx - w / 2 + (maj ? 0.1 : 0.06), yv(v), C.ink, 0.6);
    if (maj && o.numbers) label(s, cx - w / 2 - 0.36, yv(v) - 0.1, 0.32, String(v), { size: 10, h: 0.2, align: 'right', color: C.grey });
  }
  line(s, cx - w / 2, yTop, cx - w / 2, yTop + len, C.ink, 1.25); line(s, cx + w / 2, yTop, cx + w / 2, yTop + len, C.ink, 1.25);
  // tap and jet
  const yt = yTop + len;
  box(s, cx - 0.05, yt, 0.1, 0.16, o.liquid || ACID, C.ink, { lw: 1 });
  box(s, cx - 0.17, yt + 0.04, 0.34, 0.08, '4A5568', '2A2F3A', { lw: 0.75 });
  poly(s, [[cx - 0.05, yt + 0.16], [cx + 0.05, yt + 0.16], [cx + 0.02, yt + 0.38], [cx - 0.02, yt + 0.38]], o.liquid || ACID, C.ink, { lw: 1 });
  if (o.funnel) poly(s, [[cx - 0.22, yTop - 0.28], [cx + 0.22, yTop - 0.28], [cx + 0.05, yTop - 0.05], [cx + 0.05, yTop + 0.1], [cx - 0.05, yTop + 0.1], [cx - 0.05, yTop - 0.05]], GLASS, C.ink, { lw: 1 });
  return { yTap: yt + 0.08, yJet: yt + 0.38, yv };
}
// pipette: centre cx, top yTop, total length len; bulb in the middle; graduation mark on the upper stem
function pipette(s, cx, yTop, len, o = {}) {
  const sw = 0.07, bulbH = len * 0.28, bulbW = 0.3, yb0 = yTop + len * 0.38, yb1 = yb0 + bulbH;
  box(s, cx - sw / 2, yTop, sw, yb0 - yTop + 0.03, o.full ? (o.liquid || WAT[0]) : GLASS, C.ink, { lw: 1 });
  if (o.full) box(s, cx - sw / 2, yTop + len * 0.14, sw, yb0 - yTop - len * 0.14 + 0.03, o.liquid || WAT[0], C.ink, { lw: 1 });
  if (o.full) box(s, cx - sw / 2, yTop, sw, len * 0.14, GLASS, C.ink, { lw: 1 });
  oval(s, cx, (yb0 + yb1) / 2, bulbW, bulbH, o.full ? (o.liquid || WAT[0]) : GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - sw / 2, yb1 - 0.03], [cx + sw / 2, yb1 - 0.03], [cx + 0.015, yTop + len], [cx - 0.015, yTop + len]], o.full ? (o.liquid || WAT[0]) : GLASS, C.ink, { lw: 1 });
  line(s, cx - 0.09, yTop + len * 0.14, cx + 0.09, yTop + len * 0.14, C.red, 1.5);
  if (o.filler) { oval(s, cx, yTop - 0.2, 0.32, 0.36, 'D14B4B', '8E2A2A', { lw: 1 }); box(s, cx - 0.06, yTop - 0.05, 0.12, 0.12, '8E2A2A', '8E2A2A'); }
  return { yMark: yTop + len * 0.14 };
}
// volumetric flask: centre cx, bottom yb, bulb diameter d, neck height nh; liquid to mark if o.full
function volFlask(s, cx, yb, d, nh, o = {}) {
  const nw = 0.16, yNeckBot = yb - d + 0.06, yNeckTop = yNeckBot - nh, yMark = yNeckTop + nh * 0.35;
  oval(s, cx, yb - d / 2, d, d, o.full ? (o.liquid || WAT[0]) : GLASS, C.ink, { lw: 1.25 });
  if (o.part) {
    const r = d / 2, yc = yb - r, yl = yb - d * o.part, hx = Math.sqrt(r * r - (yl - yc) * (yl - yc)), seg = [[cx - hx, yl], [cx + hx, yl]];
    for (let i = 1; i < 24; i++) { const dx = hx - 2 * hx * i / 24; seg.push([cx + dx, yc + Math.sqrt(Math.max(0, r * r - dx * dx))]); }
    poly(s, seg, o.liquid || WAT[0], null);
    oval(s, cx, yc, d, d, null, C.ink, { lw: 1.25 });
  }
  box(s, cx - nw / 2, yNeckTop, nw, nh + 0.06, GLASS, null);
  if (o.full) box(s, cx - nw / 2, yMark, nw, yNeckBot - yMark + 0.06, o.liquid || WAT[0], null);
  line(s, cx - nw / 2, yNeckTop, cx - nw / 2, yNeckBot + 0.03, C.ink, 1.25); line(s, cx + nw / 2, yNeckTop, cx + nw / 2, yNeckBot + 0.03, C.ink, 1.25);
  line(s, cx - nw / 2 - 0.05, yMark, cx + nw / 2 + 0.05, yMark, C.red, 1.5);
  box(s, cx - d * 0.3, yb - 0.04, d * 0.6, 0.04, C.ink, null);
  if (o.stopper) box(s, cx - 0.11, yNeckTop - 0.14, 0.22, 0.16, 'C9CDD3', '6B7385', { lw: 0.75 });
  return { yMark, yNeckTop };
}
function funnel(s, cx, yTop, w = 0.5, o = {}) {
  poly(s, [[cx - w / 2, yTop], [cx + w / 2, yTop], [cx + 0.04, yTop + w * 0.6], [cx + 0.04, yTop + w * 0.6 + (o.stem || 0.3)], [cx - 0.04, yTop + w * 0.6 + (o.stem || 0.3)], [cx - 0.04, yTop + w * 0.6]], GLASS, C.ink, { lw: 1 });
}
function balance(s, x, y, reading) {
  box(s, x, y, 1.25, 0.55, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, x + 0.1, y + 0.13, 1.05, 0.28, '1F2A3A', null);
  label(s, x + 0.1, y + 0.13, 1.05, reading, { size: 10.5, bold: true, color: '7CFC9A', h: 0.28 });
  box(s, x + 0.15, y - 0.13, 0.95, 0.12, '9AA3B0', '4A5568', { lw: 0.75 });
}
function tile(s, cx, yb, w = 1.3) { box(s, cx - w / 2, yb, w, 0.1, C.white, '9AA3B0', { lw: 1 }); }
// titration rig: clamp stand + burette over conical flask on a white tile; returns key coordinates
function rig(s, x, yBase, o = {}) {
  const bx = x + 1.15, len = o.len || 2.9, yTop = yBase - len - 1.55;
  box(s, x - 0.35, yBase - 0.12, 1.75, 0.12, '5A6275', '4A5262');
  box(s, x - 0.04, yTop - 0.15, 0.08, yBase - yTop + 0.03, '8C96A8', '6B7385');
  box(s, x, yTop + 0.45, bx - x - 0.1, 0.06, '8C96A8', '6B7385');
  box(s, bx - 0.16, yTop + 0.38, 0.32, 0.2, '4A5262', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
  const b = burette(s, bx, yTop, len, { level: o.level || 0, numbers: o.numbers, liquid: o.acid || ACID, funnel: o.funnel });
  tile(s, bx, yBase - 0.22, 1.3);
  conical(s, bx, yBase - 0.22, 1.0, 1.05, { level: 0.42, liquid: o.flask || PINK[0] });
  return { bx, yTop, len, b };
}
// concave meniscus close-up between walls x0..x1; edge at yEdge, bottom of meniscus at yBot; liquid to yEnd
function meniscus(s, x0, x1, yEdge, yBot, yEnd, col) {
  const pts = [];
  for (let i = 0; i <= 16; i++) { const t = i / 16, x = x0 + (x1 - x0) * t; pts.push([x, yBot - (yBot - yEdge) * Math.pow(2 * t - 1, 2)]); }
  poly(s, [...pts, [x1, yEnd], [x0, yEnd]], col, null);
  poly(s, pts, null, '3A6EA5', { open: true, lw: 1.5 });
}

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Concentration',
    footer: 'OCR J260 Combined Science B • C5.3 how are the amounts of chemicals in solution measured? • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • concentration in g/dm³ and mol/dm³, standard solutions, titration` },
      { icon: 'H', text: 'Higher & Foundation in one deck • mol/dm³ and titration calculations marked HT' },
      { icon: '▲', text: 'Suggested practical: acid–alkali titration • precision, accuracy and uncertainty' },
    ],
    notes: 'C5.3 How are the amounts of chemicals in solution measured? is Part 3 of 3 in J260 Chapter C5 Chemical analysis (C5.1 separation and purity; C5.2 amounts of substances in reactions; C5.3 amounts of chemicals in solution). It is the LAST C5 deck; Chapter C6 Making useful chemicals follows.\nNumbering: in J258 (Chemistry B, separate science) this sub-topic is C5.4, because J258 C5.2 "How do chemists find the composition of unknown samples?" is separate-science only (OCR C5 scheme of work: 6 h separate / 0 h combined). Evidence: docbrown.info combined page (2016ocr21chemB2c.htm) lists "Chapter C5.3 How are the amounts of chemicals in solution measured?"; RSC resource pages quote Combined Science B codes C5.3.1, C5.3.2, C5.3.6 and C5.3.7 for this content. See SPEC_C5_3.md.',
  });
  const sub = s._slideObjects.find(o => o._type === 'text' && JSON.stringify(o.text).includes('in solution measured?') && o.options && o.options.fontSize === 18);
  assert(sub, 'cover subtitle object found');
  Object.assign(sub.options, { fontSize: 15, y: 2.55, h: 0.66, w: 7.3, valign: 'top' });
  sub.options._bodyProp && Object.assign(sub.options._bodyProp, { anchor: 't' });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C5.3.1', text: 'Explain how **mass of solute** and **volume of solution** give **concentration in g/dm³**; calculate it.' },
  { code: 'C5.3.2', text: 'Calculate **concentration in mol/dm³** from moles (or mass) and volume; convert g/dm³ ⇄ mol/dm³.', ht: true },
  { code: 'C5.3.3', text: 'Describe how to make a **standard solution** of accurately known concentration.' },
  { code: 'C5.3.4', text: 'Describe how a **titration** with an **indicator** measures the volumes of acid and alkali that react.' },
  { code: 'C5.3.5', text: 'Calculate an **unknown concentration** from titration results and the balanced equation.', ht: true },
  { code: 'C5.3.6', text: 'Describe and explain a titration procedure that gives **precise, accurate, valid, repeatable** results.' },
  { code: 'C5.3.7', text: '**Evaluate the quality of data** from titrations: concordant titres, uncertainty, errors.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J258 C5.4 wording from search extracts, renumbered for J260 C5.3; see SPEC_C5_3.md for confidence):\nC5.3.1 explain how the mass of a solute and the volume of the solution is related to the concentration of the solution and calculate concentration using the formula: concentration (g/dm³) = mass of solute (g) / volume (dm³) [code and wording seen in an RSC listing]\nC5.3.2 (HT) explain how the concentration of a solution in mol/dm³ is related to the mass of the solute and the volume of the solution and calculate the molar concentration using the formula: concentration (mol/dm³) = number of moles of solute / volume (dm³) [code and wording seen; HT per docbrown]\nC5.3.3–C5.3.5: exact wording NOT found in any reachable source. The deck teaches the content all sources agree is in this sub-topic (making a standard solution; titration with an indicator; calculating an unknown concentration from titration results). Codes are inferred from position: UNVERIFIED.\nC5.3.6 describe and explain the procedure for a titration to give precise, accurate, valid and repeatable results [code and wording seen]\nC5.3.7 evaluate the quality of data from titrations [code and wording seen]\nHT: mol/dm³ (C5.3.2) and titration calculations in mol/dm³ (C5.3.5) are marked HT; the mole is Higher-only in J260 (C5.2). One docbrown extract marks C5.3.1 as HT too; most sources treat g/dm³ as both tiers, so it is taught to all here.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C5 Chemical analysis • C5.3 is Part 3 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C5.3.1', 'Concentration in g/dm³', 'Both tiers', C.blue],
    ['C5.3.2', 'Concentration in mol/dm³; converting', 'HT', C.red],
    ['C5.3.3', 'Making a standard solution', 'Both tiers', C.blue],
    ['C5.3.4', 'Titration: apparatus and indicators', 'Both tiers', C.blue],
    ['Practical', 'Acid–alkali titration', 'Practical', C.orange],
    ['C5.3.5', 'Titration calculations', 'HT', C.red],
    ['C5.3.6–7', 'Precision, accuracy, quality of data', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'C5.3\nAmounts in solution', { h: 0.7, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.64 + 0.28, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.64;
    line(s, 1.0, y + 0.28, 1.45, y + 0.28, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.56, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.56, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.13, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.68, 6.6, 'Earlier links: C2 group 1 hydroxides • C3 balanced equations • C5.1 purity • C5.2 moles and Mr (HT)', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.8, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C5.1 How are chemicals separated and tested for purity?',
      'C5.2 How are the amounts of substances in reactions calculated?',
      '**C5.3 How are the amounts of chemicals in solution measured?** (this deck)',
      'J258 (separate) has an extra sub-topic on identifying unknown samples, so this is **C5.4** there.',
      'C5.3 is the **last** C5 deck; **C6 Making useful chemicals** follows.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.6, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (moles, mol/dm³, titration calculations) are for Higher tier only.',
      'Practical skills: reading a **burette** and **pipette**, **concordant** results, **uncertainty**.',
      'Maths: **unit conversion** (cm³ → dm³), rearranging, **means**, **ratios**, **significant figures**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C5 has three sub-topics. J258 C5.2 "How do chemists find the composition of unknown samples?" (flame tests, ion tests, instrumental methods) is separate-science only (OCR scheme of work: 6 h separate / 0 h combined), so the later sub-topics are renumbered down by one: J258 C5.3 → J260 C5.2, J258 C5.4 → J260 C5.3. SPEC_C5_1.md reached the same list independently.\nOverlap control: chromatography, distillation, crystallisation and purity are C5.1 (recap only: starter Q5). Relative formula mass, moles and reacting masses are C5.2 (recap only: starter Q6, and used as a tool on the HT slides). Acids, alkalis, pH and salts in detail are C6 (only the neutralisation needed for a titration is taught here).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C1 • water', q: 'In salt water, which substance is the **solute** and which is the **solvent**? What is the mixture called?' },
  { from: 'C2 • group 1', q: 'Write the word equation for **sodium + water**. What colour does universal indicator turn in the solution?' },
  { from: 'C3 • equations', q: 'Balance: (…) Na(s) + (…) H₂O(l) → (…) NaOH(aq) + H₂(g). What does **(aq)** mean?' },
  { from: 'C4.2 • bonding', q: 'Why does a solution of sodium chloride **conduct electricity** but solid sodium chloride does not?' },
  { from: 'C5.1 • purity', q: 'How does a **melting point** show whether a sample is **pure**? What is a **formulation**?' },
  { from: 'C5.2 • moles (HT)', q: 'Calculate the **Mr** of NaOH (Na = 23, O = 16, H = 1). How many **moles** are in **4.0 g**?' },
], { subtitle: 'Recall from C1–C4, C5.1 and C5.2 • 6 minutes • no notes', notes: 'ANSWERS\n1. Salt (sodium chloride) is the solute; water is the solvent; the mixture is a solution (C1 / KS3).\n2. sodium + water → sodium hydroxide + hydrogen. Universal indicator turns purple / blue: the solution is alkaline (C2 group 1).\n3. 2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g) (atom-balanced in node). (aq) = aqueous: dissolved in water (C3).\n4. In solution the ions are free to move and carry charge; in the solid the ions are held in fixed positions in the lattice (C4.2).\n5. A pure substance melts at a sharp, fixed temperature (matching the data book value); impurities lower the melting point and make it melt over a range. A formulation is a mixture designed as a useful product, with each component in a measured quantity (C5.1; recap only).\n6. Mr = 23 + 16 + 1 = 40. Moles = 4.0 ÷ 40 = 0.10 mol (C5.2, HT; recap only).' }), 'Retrieval starter');

// ======================= 5 CONCENTRATION IN g/dm³ =======================
reg(D.contentSlide({
  title: 'What concentration means',
  subtitle: `Specification ${sp('C5.3.1')} • mass of solute, volume of solution and concentration`,
  tag: 'C5.3.1', caption: 'solute particles shown as dots; not to scale',
  draw: (s) => {
    const B = [
      [0.8, '5 g in **0.5 dm³**', 0.5, 5, '10 g/dm³'],
      [2.75, '10 g in **1.0 dm³**', 1.0, 10, '10 g/dm³'],
      [4.7, '10 g in **0.5 dm³**', 0.5, 10, '20 g/dm³'],
    ];
    const DOTS = [[0.2, 0.3], [0.5, 0.55], [0.78, 0.25], [0.32, 0.75], [0.68, 0.8], [0.15, 0.62], [0.88, 0.58], [0.45, 0.18], [0.58, 0.4], [0.3, 0.45]];
    B.forEach(([x, t, v, n, c], i) => {
      beaker(s, x, 1.65, 1.3, 1.9, { level: v === 1.0 ? 0.84 : 0.42, dots: DOTS.slice(0, n), r: 0.055 });
      label(s, x - 0.2, 3.62, 1.7, t, { size: 10.5, h: 0.26 });
      pbox(s, x + 0.05, 3.95, 1.2, 0.34, `**${c}**`, i === 2 ? 'F6DCCB' : 'E3F0FB', i === 2 ? C.orange : WAT[1], { size: 11, lw: 0.75 });
    });
    label(s, 0.7, 1.35, 3.3, 'Same concentration', { size: 10.5, bold: true, color: WAT[1], h: 0.25 });
    label(s, 4.3, 1.35, 2.1, 'More concentrated', { size: 10.5, bold: true, color: C.orange, h: 0.25 });
    // 1 dm³ cube
    box(s, 0.9, 4.55, 0.85, 0.85, 'E9E0F7', C.blue, { lw: 1.25 });
    poly(s, [[0.9, 4.55], [1.15, 4.35], [2.0, 4.35], [1.75, 4.55]], 'D8CBEE', C.blue, { lw: 1 });
    poly(s, [[1.75, 4.55], [2.0, 4.35], [2.0, 5.2], [1.75, 5.4]], 'C9B6E4', C.blue, { lw: 1 });
    label(s, 0.9, 5.42, 0.85, '10 cm', { size: 10, h: 0.2 });
    label(s, 2.1, 4.45, 4.3, '**1 dm³** = 10 cm × 10 cm × 10 cm = **1000 cm³** (= 1 litre)', { size: 10.5, align: 'left', h: 0.3 });
    pbox(s, 2.15, 4.9, 1.75, 0.42, 'cm³  **÷ 1000** →  dm³', C.white, C.blue, { size: 10.5, lw: 1 });
    pbox(s, 4.1, 4.9, 1.75, 0.42, 'dm³  **× 1000** →  cm³', C.white, C.blue, { size: 10.5, lw: 1 });
  },
  head: 'Concentration',
  lines: [
    'A **solution** is a **solute** dissolved in a **solvent** (often water: an **aqueous** solution).',
    '**Concentration** = how much solute is dissolved in a **unit volume** of solution.',
    'More solute in the same volume, or the same solute in less volume, gives a **higher** concentration.',
    { t: 'concentration (g/dm³) = mass of solute (g) ÷ volume of solution (dm³)', b: true, color: C.blue, nob: true },
    'Volumes must be in **dm³**: divide cm³ by **1000**.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: g/dm³', q: '5.0 g of copper sulfate is dissolved to make 250 cm³ of solution.',
    steps: [['Volume', '250 ÷ 1000 = 0.250 dm³'], ['Answer', '5.0 ÷ 0.250 = **20 g/dm³**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Calculate the concentration when **12 g** of salt is dissolved to make **400 cm³** of solution. Convert **1.5 dm³** to cm³.',
  notes: 'QUICK CHECK ANSWER: 400 cm³ = 0.400 dm³; 12 ÷ 0.400 = 30 g/dm³. 1.5 dm³ = 1500 cm³.\nCommon errors: dividing by the volume in cm³ (gives 0.03); using the volume of water added rather than the final volume of solution. The particle pictures show that concentration depends on both amount and volume (beakers 1 and 2 have the same concentration). All values asserted in node. Copper(II) sulfate solid: CLEAPSS HARMFUL if swallowed, IRRITANT to eyes and skin, hazardous to the aquatic environment (teacher note only).',
}), 'C5.3.1 What concentration means');

// ======================= 6 USING THE g/dm³ EQUATION =======================
reg(D.contentSlide({
  title: 'Calculating with concentration',
  subtitle: `Specification ${sp('C5.3.1')} • rearranging: concentration, mass of solute, volume`,
  tag: 'C5.3.1', caption: 'three solutions with the same concentration, 40 g/dm³',
  draw: (s) => {
    // formula triangle
    const cx = 1.85, top = 1.55, base = 3.55, hw = 1.25;
    poly(s, [[cx, top], [cx + hw, base], [cx - hw, base]], 'F1ECF8', C.blue, { lw: 1.5 });
    line(s, cx - hw * 0.5, (top + base) / 2 + 0.02, cx + hw * 0.5, (top + base) / 2 + 0.02, C.blue, 1.25);
    line(s, cx, (top + base) / 2 + 0.02, cx, base, C.blue, 1.25);
    label(s, cx - 0.6, 2.1, 1.2, '**mass**\n(g)', { size: 11, h: 0.5 });
    label(s, cx - 1.05, 2.75, 1.0, '**conc.**\n(g/dm³)', { size: 10.5, h: 0.6 });
    label(s, cx + 0.05, 2.75, 1.0, '**volume**\n(dm³)', { size: 10.5, h: 0.6 });
    const R = [['mass = conc. × volume'], ['conc. = mass ÷ volume'], ['volume = mass ÷ conc.']];
    R.forEach(([t], i) => pbox(s, 3.55, 1.65 + i * 0.6, 2.8, 0.48, `**${t}**`, i === 1 ? 'E3F0FB' : C.white, C.blue, { size: 11, lw: 0.75 }));
    // three flasks, same concentration
    [[1.25, '10 g in 250 cm³', 0.7], [3.2, '20 g in 500 cm³', 0.85], [5.15, '40 g in 1000 cm³', 1.0]].forEach(([cx2, t, sc]) => {
      volFlask(s, cx2, 5.45, 0.85 * sc, 0.45 * sc + 0.1, { full: true, liquid: 'D8CBEE', stopper: true });
      label(s, cx2 - 0.85, 5.5, 1.7, t, { size: 10.5, h: 0.24 });
    });
    label(s, 0.7, 3.66, 5.6, 'Double the mass **and** double the volume: concentration is **unchanged**', { size: 10.5, color: C.ink, h: 0.28 });
  },
  head: 'Rearranging the equation',
  lines: [
    'Cover the quantity you want in the triangle to see how to find it.',
    'To find the **mass of solute** in a sample: mass = concentration × volume.',
    'To find the **volume** that contains a given mass: volume = mass ÷ concentration.',
    'Always convert **cm³ to dm³** first, and give the **unit** with your answer.',
    'Give answers to a sensible number of **significant figures** (the same as the data).',
  ],
  size: 11.5,
  worked: { head: 'Worked example: mass and volume', q: '(a) Mass of solute in 25.0 cm³ of a 40 g/dm³ solution? (b) Volume of a 30 g/dm³ solution that contains 6.0 g?',
    steps: [['(a)', '40 × (25.0 ÷ 1000) = 40 × 0.0250 = **1.0 g**'], ['(b)', '6.0 ÷ 30 = **0.20 dm³** (= 200 cm³)']], size: 10.5 },
  workedH: 1.55,
  qc: 'Calculate the concentration of **2.5 g** in **50 cm³**. Sea water is about **35 g/dm³** salt: what mass of salt is in **2.0 dm³**?',
  notes: 'QUICK CHECK ANSWER: 50 cm³ = 0.050 dm³; 2.5 ÷ 0.050 = 50 g/dm³. 35 × 2.0 = 70 g.\nThe three flasks: 10 ÷ 0.250 = 20 ÷ 0.500 = 40 ÷ 1.000 = 40 g/dm³ (asserted). This proportional reasoning is the key idea in "explain how the mass of a solute and the volume of the solution is related to the concentration". Recovering salt by evaporation is C5.1 (recap only).',
}), 'C5.3.1 Calculating with concentration');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C5.3.1')} • concentration in g/dm³`, [
  { q: 'State what is meant by the **concentration** of a solution, and give a unit.', marks: 2, ms: 'The mass / amount of solute dissolved in a given / unit volume of solution (1); g/dm³ (accept mol/dm³) (1).' },
  { q: 'Convert **250 cm³** into dm³, and **2.5 dm³** into cm³.', marks: 2, ms: '0.25 dm³ (1); 2500 cm³ (1).' },
  { q: 'A student dissolves **8.0 g** of sodium hydroxide to make **200 cm³** of solution. Calculate the concentration in g/dm³.', marks: 2, ms: '200 cm³ = 0.200 dm³ and 8.0 ÷ 0.200 (1); = 40 g/dm³ (1). Correct answer alone scores 2.' },
  { q: 'A drink contains **120 g/dm³** of sugar. Calculate the mass of sugar in a **0.50 dm³** bottle.', marks: 2, ms: 'mass = concentration × volume = 120 × 0.50 (1); = 60 g (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 CONCENTRATION IN mol/dm³ (HT) =======================
reg(D.contentSlide({
  title: 'Concentration in mol/dm³',
  subtitle: `Specification ${sp('C5.3.2')} • molar concentration from moles, or mass, and volume`,
  tag: 'C5.3.2', ht: true, caption: 'sodium hydroxide solutions; particles not to scale',
  draw: (s) => {
    const F = [[0.7, '**mass**\n(g)'], [2.55, '**moles**\n(mol)'], [4.4, '**concentration**\n(mol/dm³)']];
    F.forEach(([x, t], i) => pbox(s, x, 1.6, 1.5, 0.7, t, i === 2 ? 'E9E0F7' : C.white, C.blue, { size: 11, lw: 1.25 }));
    arrow(s, 2.22, 1.82, 2.53, 1.82, C.blue, 2); arrow(s, 4.07, 1.82, 4.38, 1.82, C.blue, 2);
    arrow(s, 2.53, 2.12, 2.22, 2.12, C.orange, 2); arrow(s, 4.38, 2.12, 4.07, 2.12, C.orange, 2);
    label(s, 1.85, 2.38, 1.1, '÷ Mr', { size: 10.5, bold: true, color: C.blue, h: 0.22 });
    label(s, 3.65, 2.38, 1.2, '÷ volume (dm³)', { size: 10.5, bold: true, color: C.blue, h: 0.22 });
    label(s, 0.7, 2.66, 5.2, '← reverse: **× volume**, then **× Mr**', { size: 10.5, bold: true, color: C.orange, h: 0.24 });
    const DOTS = [[0.2, 0.3], [0.5, 0.55], [0.78, 0.25], [0.32, 0.75], [0.68, 0.8], [0.15, 0.62], [0.88, 0.58], [0.45, 0.18], [0.6, 0.35], [0.4, 0.9]];
    beaker(s, 1.0, 3.2, 1.45, 1.8, { level: 0.84, dots: DOTS, r: 0.055 });
    label(s, 2.55, 3.3, 1.3, 'each dot = 0.10 mol', { size: 10, italic: true, color: C.grey, h: 0.4, align: 'left', valign: 'top' });
    label(s, 0.5, 5.05, 2.45, '40 g NaOH = **1 mol** in **1 dm³**', { size: 10.5, h: 0.24 });
    pbox(s, 1.05, 5.35, 1.35, 0.34, '**1.0 mol/dm³**', 'E3F0FB', WAT[1], { size: 11, lw: 0.75 });
    beaker(s, 4.05, 4.1, 1.45, 0.9, { level: 0.42, dots: [[0.5, 0.5]], r: 0.055 });
    label(s, 3.5, 5.05, 2.6, '4.0 g = **0.10 mol** in **0.25 dm³**', { size: 10.5, h: 0.24 });
    pbox(s, 4.1, 5.35, 1.35, 0.34, '**0.40 mol/dm³**', 'F6DCCB', C.orange, { size: 11, lw: 0.75 });
  },
  head: 'Molar concentration',
  lines: [
    'Chemists count particles in **moles**, so concentration is often given in **mol/dm³**.',
    { t: 'concentration (mol/dm³) = moles of solute (mol) ÷ volume (dm³)', b: true, color: C.blue, nob: true },
    'If you are given a **mass**, first find the moles: moles = mass ÷ **Mr** (C5.2).',
    'Rearranged: **moles = concentration × volume**. You will use this in titration calculations.',
    'Square brackets mean concentration: **[NaOH]** = concentration of sodium hydroxide.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: mol/dm³', q: '4.0 g of NaOH (Mr 40) is dissolved to make 250 cm³ of solution.',
    steps: [['Moles', '4.0 ÷ 40 = 0.10 mol'], ['Volume', '250 ÷ 1000 = 0.250 dm³'], ['Answer', '0.10 ÷ 0.250 = **0.40 mol/dm³**']], size: 10.5 },
  workedH: 1.55,
  qc: 'Calculate the concentration of **0.050 mol** in **200 cm³**. How many moles of NaOH are in **25.0 cm³** of a **0.100 mol/dm³** solution?',
  notes: 'QUICK CHECK ANSWER: 0.050 ÷ 0.200 = 0.25 mol/dm³.\nDiagram: 1 dot = 0.10 mol, so 1.0 mol/dm³ = 10 dots per dm³ and 0.40 mol/dm³ in 0.25 dm³ = 1 dot (dot density in proportion). moles = 0.100 × 0.0250 = 0.00250 mol (2.50 × 10⁻³ mol).\nHT: C5.3.2 is Higher tier (the mole is Higher-only in J260). Mr and moles from mass are C5.2 (recap only). All values asserted in node; Mr values computed from the formulae with Ar Na 23, O 16, H 1.',
}), 'C5.3.2 Concentration in mol/dm³ (HT)');

// ======================= 9 CONVERTING g/dm³ AND mol/dm³ (HT) =======================
{
  const s = D.contentHeader('Converting g/dm³ and mol/dm³', `Specification ${sp('C5.3.2')} • using relative formula mass, Mr`, { ht: true, tag: 'C5.3.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'one dm³ of each solution; Mr from Ar values on the data sheet');
  pbox(s, 0.85, 1.65, 2.0, 0.85, '**g/dm³**\nmass in 1 dm³', C.white, C.blue, { size: 12 });
  pbox(s, 4.15, 1.65, 2.0, 0.85, '**mol/dm³**\nmoles in 1 dm³', 'E9E0F7', C.blue, { size: 12 });
  arrow(s, 2.95, 1.88, 4.05, 1.88, C.blue, 2.5); arrow(s, 4.05, 2.28, 2.95, 2.28, C.orange, 2.5);
  label(s, 2.9, 1.55, 1.2, '**÷ Mr**', { size: 12, color: C.blue, h: 0.26 });
  label(s, 2.9, 2.36, 1.2, '**× Mr**', { size: 12, color: C.orange, h: 0.26 });
  const rows = [[HDR('Solute'), HDR('Formula'), HDR('Mr'), HDR('1.00 mol/dm³ is')]];
  [['sodium hydroxide', 'NaOH'], ['potassium hydroxide', 'KOH'], ['hydrochloric acid', 'HCl'], ['nitric acid', 'HNO3'], ['sulfuric acid', 'H2SO4'], ['sodium carbonate', 'Na2CO3']].forEach(([n, f], i) => {
    const pretty = f.replace(/(\d)/g, d => '₀₁₂₃₄₅₆₇₈₉'[+d]);
    rows.push([tcell(n, i), tcell(pretty, i, { bold: true }), tcell(String(MR[f]), i), tcell(`${MR[f]} g/dm³`, i)]);
  });
  s.addTable(rows, { x: 0.75, y: 2.85, w: 5.5, colW: [1.75, 1.05, 0.9, 1.8], rowH: 0.36, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 6.8, 1.3, 6.08, 2.45, 'Why convert?', [
    'A **balance** measures **mass**, so we make up solutions in **g/dm³**.',
    'Reactions happen **particle by particle**, so calculations from equations need **mol/dm³**.',
    'g/dm³ **÷ Mr** = mol/dm³.   mol/dm³ **× Mr** = g/dm³.',
    'Mr = sum of the relative atomic masses in the formula, e.g. H₂SO₄ = 2 + 32 + 64 = **98**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 3.9, 6.08, 2.35, 'Worked example: converting', 'Hydrochloric acid is 0.100 mol/dm³. Sulfuric acid is 9.8 g/dm³.', [
    ['HCl', 'Mr = 1 + 35.5 = 36.5;  0.100 × 36.5 = **3.65 g/dm³**'],
    ['H₂SO₄', 'Mr = 98;  9.8 ÷ 98 = 0.10 mol/dm³'],
    ['Answer', 'HCl **3.65 g/dm³**; H₂SO₄ **0.10 mol/dm³**']], { size: 11 });
  D.quickCheck(s, 'Convert **20 g/dm³** sodium hydroxide into mol/dm³. Convert **0.20 mol/dm³** potassium hydroxide into g/dm³.');
  D.notes(s, 'QUICK CHECK ANSWER: 20 ÷ 40 = 0.50 mol/dm³. 0.20 × 56 = 11.2 g/dm³ (accept 11 g/dm³).\nMr values are calculated in node from the formulae (Ar: H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35.5, K 39) and asserted: NaOH 40, KOH 56, HCl 36.5, HNO₃ 63, H₂SO₄ 98, Na₂CO₃ 106. HT: part of C5.3.2.');
  reg(s, 'C5.3.2 Converting g/dm³ and mol/dm³ (HT)');
}

// ======================= 10 RECAP 2 (HT) =======================
const R2 = D.recapSlide(2, `Specification ${sp('C5.3.2')} • concentration in mol/dm³ (Higher tier)`, [
  { q: 'Calculate the number of moles in **10 g** of sodium hydroxide, NaOH (Mr = 40).', marks: 2, ht: true, ms: '10 ÷ 40 (1); = 0.25 mol (1).' },
  { q: '**0.020 mol** of solute is dissolved to make **250 cm³** of solution. Calculate the concentration in mol/dm³.', marks: 2, ht: true, ms: '0.020 ÷ 0.250 (1); = 0.080 mol/dm³ (1).' },
  { q: 'Calculate the number of moles of acid in **20.0 cm³** of **0.50 mol/dm³** hydrochloric acid.', marks: 2, ht: true, ms: '0.50 × (20.0 ÷ 1000) (1); = 0.010 mol (1).' },
  { q: 'Hydrochloric acid has a concentration of **0.20 mol/dm³**. Calculate its concentration in g/dm³ (Mr HCl = 36.5).', marks: 2, ht: true, ms: '0.20 × 36.5 (1); = 7.3 g/dm³ (1).' },
], { ht: true });
reg(R2.s, 'Recap 2');

// ======================= 11 STANDARD SOLUTION =======================
reg(D.contentSlide({
  title: 'Making a standard solution',
  subtitle: `Specification ${sp('C5.3.3')} • a solution whose concentration is known accurately`,
  tag: 'C5.3.3', caption: 'making 250 cm³ of sodium carbonate solution; apparatus not to scale',
  draw: (s) => {
    const xs = [0.55, 2.05, 3.55, 5.05];
    ['1 Weigh', '2 Dissolve', '3 Transfer', '4 Make up'].forEach((t, i) => label(s, xs[i], 1.4, 1.45, `**${t}**`, { size: 11, color: C.blue, h: 0.26 }));
    // 1 balance + weighing boat
    balance(s, 0.65, 3.6, '2.650 g');
    poly(s, [[0.85, 3.32], [1.75, 3.32], [1.62, 3.46], [0.98, 3.46]], 'F7F7F7', '6B7385', { lw: 1 });
    for (let i = 0; i < 6; i++) ball(s, 1.05 + i * 0.1, 3.27, 0.04, 'FFFFFF', '9AA3B0', 0.5);
    label(s, 0.55, 4.25, 1.4, 'solid in a weighing boat', { size: 10, h: 0.4, valign: 'top' });
    // 2 beaker + rod
    beaker(s, 2.3, 2.75, 0.95, 1.2, { level: 0.5 });
    line(s, 2.55, 2.4, 3.0, 3.85, '9AA3B0', 3);
    label(s, 2.05, 4.05, 1.4, 'dissolve in distilled water; stir', { size: 10, h: 0.4, valign: 'top' });
    // 3 funnel into flask, rinse arrow
    volFlask(s, 4.25, 4.0, 0.95, 0.85, { part: 0.45 });
    funnel(s, 4.25, 1.85, 0.5, { stem: 0.35 });
    label(s, 3.55, 4.05, 1.4, 'rinse beaker and rod into flask', { size: 10, h: 0.4, valign: 'top' });
    // 4 make up to the mark
    volFlask(s, 5.75, 4.0, 0.95, 0.85, { full: true, stopper: true });
    oval(s, 5.25, 2.27, 0.24, 0.14, C.white, C.ink, { lw: 0.75 }); ball(s, 5.25, 2.27, 0.04, C.ink);
    line(s, 5.38, 2.27, 5.67, 2.27, C.green, 1.25, { dash: 'dash' });
    label(s, 5.05, 4.05, 1.4, 'to the mark; stopper; invert', { size: 10, h: 0.4, valign: 'top' });
    label(s, 0.7, 4.75, 5.6, 'Graduation mark: bottom of the **meniscus** on the line, read at **eye level**', { size: 10.5, color: C.red, h: 0.28 });
    label(s, 0.7, 5.1, 5.6, 'Volumetric flask: one accurate volume, e.g. **250.0 cm³**', { size: 10.5, color: C.ink, h: 0.28 });
  },
  head: 'Method',
  lines: [
    'A **standard solution** has an **accurately known** concentration.',
    '**Weigh** the solid accurately on a 2 or 3 d.p. balance; reweigh the boat to find the mass **transferred**.',
    '**Dissolve** in a little distilled water in a beaker; stir.',
    'Pour into a **volumetric flask** with a funnel; **rinse** the beaker, rod and funnel into the flask so **no solute is lost**.',
    'Add distilled water **dropwise** to the **graduation mark**; stopper and **invert** to mix.',
  ],
  size: 11,
  worked: { head: 'Worked example: mass to weigh out', q: 'Make 250 cm³ of 10.6 g/dm³ sodium carbonate.',
    steps: [['Mass', '10.6 × (250 ÷ 1000) = **2.65 g**'], ['HT', 'Mr 106: 10.6 g/dm³ = **0.100 mol/dm³** (0.0250 mol)']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why is the beaker **rinsed** into the flask? What mass of sodium chloride is needed for **100 cm³** of a **20 g/dm³** solution?',
  notes: 'QUICK CHECK ANSWER: So that all of the weighed solute ends up in the flask; otherwise the concentration would be lower than calculated. 20 × 0.100 = 2.0 g.\nCode C5.3.3 inferred (UNVERIFIED wording); docbrown says this topic covers "how to make a standard solution". Sodium carbonate (anhydrous) is used because it is pure and stable; sodium hydroxide absorbs water and CO₂ from the air, so its solutions are standardised by titration instead (GRADE 7–9 STRETCH). HT line asserted: 10.6 ÷ 106 = 0.100 mol/dm³; 0.100 × 0.250 = 0.0250 mol; × 106 = 2.65 g.\nCLEAPSS: sodium carbonate (anhydrous solid) IRRITANT, causes serious eye irritation; its 0.1 mol/dm³ solution is low hazard. Wear eye protection.',
}), 'C5.3.3 Making a standard solution');

// ======================= 12 TITRATION =======================
reg(D.contentSlide({
  title: 'Titration',
  subtitle: `Specification ${sp('C5.3.4')} • measuring the volumes of acid and alkali that react, using an indicator`,
  tag: 'C5.3.4', caption: 'burette clamped over a conical flask on a white tile; not to scale',
  draw: (s) => {
    const r = rig(s, 0.95, 5.85, { level: 0, numbers: true, flask: PINK[0], len: 2.75 });
    const lab = (y, t, ty) => { line(s, r.bx + 0.2, y, 3.2, ty || y, C.grey, 0.75); label(s, 3.25, (ty || y) - 0.13, 1.6, t, { size: 10.5, align: 'left', h: 0.26 }); };
    lab(r.yTop + 0.9, '**burette**: acid', r.yTop + 0.9);
    lab(r.b.yTap, '**tap**', r.b.yTap);
    lab(5.15, '**conical flask**: alkali + indicator', 5.0);
    lab(5.68, '**white tile**', 5.62);
    // pipette with filler on the right
    pipette(s, 5.6, 1.85, 2.2, { filler: true, full: true });
    label(s, 4.95, 4.12, 1.3, '**pipette** + filler: 25.0 cm³ alkali', { size: 10.5, h: 0.45, valign: 'top' });
    // indicator colour change
    conical(s, 4.85, 5.75, 0.55, 0.6, { level: 0.45, liquid: PINK[0] });
    conical(s, 5.95, 5.75, 0.55, 0.6, { level: 0.45, liquid: 'F7F7F7' });
    arrow(s, 5.2, 5.5, 5.6, 5.5, C.ink, 1.5);
    label(s, 4.45, 4.62, 2.0, 'phenolphthalein: **pink → colourless**', { size: 10, h: 0.45, valign: 'top' });
  },
  head: 'How a titration works',
  lines: [
    'A **titration** measures exactly what volume of one solution reacts with a fixed volume of another.',
    'A **pipette** delivers an accurate volume (e.g. **25.0 cm³**) of alkali into a **conical flask**.',
    'Acid is added from a **burette**, which measures the volume added to **±0.05 cm³**.',
    'An **indicator** changes colour at the **end point**, when the alkali is just **neutralised**.',
    { t: 'NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)', b: true, color: C.blue, nob: true },
    { t: 'ionic: H⁺(aq) + OH⁻(aq) → H₂O(l)', color: C.blue, nob: true },
  ],
  size: 11,
  worked: { head: 'Choosing an indicator', q: 'Strong acid with strong alkali: use a single-colour-change indicator.',
    steps: [['Phenol.', 'pink in alkali → **colourless** at the end point'], ['Methyl or.', 'yellow in alkali → **orange** at the end point (red in acid)']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why is a **white tile** placed under the flask? Why is **universal indicator** not used for a titration?',
  notes: 'QUICK CHECK ANSWER: So the colour change at the end point is easy to see. Universal indicator changes gradually through many colours, so there is no sharp end point.\nCode C5.3.4 inferred (UNVERIFIED wording, along the lines of "explain how the volumes of acid and alkali solutions that react with each other can be measured by titration using a suitable indicator"). Neutralisation equations atom- and charge-balanced in node. Acids, alkalis and pH in detail are C6 (recap later); only the neutralisation reaction needed here is taught.',
}), 'C5.3.4 Titration');

// ======================= 13 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C5.3.3')}, ${sp('C5.3.4')} • standard solutions and titration`, [
  { q: 'What is a **standard solution**? Name the piece of glassware it is made up in.', marks: 2, ms: 'A solution of accurately known concentration (1); volumetric flask (1).' },
  { q: 'When making a standard solution, a student did not rinse the beaker into the flask. Explain the effect on the concentration.', marks: 2, ms: 'Some solute was left in the beaker / not all the solute reached the flask (1); so the concentration is lower than calculated (1).' },
  { q: 'Name the apparatus used to (i) measure **25.0 cm³** of alkali accurately, and (ii) add the acid and measure its volume.', marks: 2, ms: '(i) (volumetric) pipette (with a pipette filler) (1); (ii) burette (1).' },
  { q: 'Phenolphthalein is added to sodium hydroxide in a flask. State the colour change at the end point as acid is added, and why acid is added **dropwise** near the end point.', marks: 2, ms: 'Pink to colourless (1); so the end point is not overshot / to find the exact volume at which the colour changes (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 14 PRACTICAL: METHOD =======================
reg(D.contentSlide({
  title: 'Practical: an acid–alkali titration',
  subtitle: `Specification ${sp('C5.3.6')} • suggested practical: find the concentration of hydrochloric acid`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'reading the burette before and after; scale numbers increase downwards',
  draw: (s) => {
    const r = rig(s, 0.95, 5.85, { level: 0.2, numbers: true, flask: PINK[0], len: 2.75, funnel: false });
    label(s, 1.85, r.yTop - 0.3, 1.9, 'remove the funnel before reading', { size: 10, italic: true, color: C.red, h: 0.24, align: 'left' });
    // initial and final reading close-ups
    const Z = [[3.55, 'initial', 0.20, 0.0, 0.5], [5.15, 'final', 22.65, 22.4, 22.9]];
    Z.forEach(([x, t, read, lo, hi]) => {
      const top = 1.85, h = 2.2, w = 0.6, yv = v => top + 0.15 + (v - lo) / (hi - lo) * (h - 0.3);
      box(s, x, top, w, h, GLASS, null);
      meniscus(s, x, x + w, yv(read) - 0.12, yv(read), top + h, ACID);
      for (let k = 0; k <= 5; k++) {
        const v = lo + k * 0.1; line(s, x, yv(v), x + (k % 5 === 0 ? 0.3 : 0.18), yv(v), C.ink, 0.75);
        if (k % 1 === 0) label(s, x - 0.5, yv(v) - 0.09, 0.46, v.toFixed(1), { size: 10, h: 0.18, align: 'right', color: C.grey });
      }
      line(s, x, top, x, top + h, C.ink, 1.25); line(s, x + w, top, x + w, top + h, C.ink, 1.25);
      line(s, x + w + 0.02, yv(read), x + w + 0.3, yv(read), C.green, 1.25);
      label(s, x - 0.3, top + h + 0.08, 1.3, `${t}: **${f2(read)} cm³**`, { size: 10.5, h: 0.26 });
    });
    pbox(s, 3.35, 4.65, 3.0, 0.42, 'titre = 22.65 − 0.20 = **22.45 cm³**', 'E3F0FB', C.blue, { size: 11, lw: 1 });
    label(s, 3.3, 5.15, 3.1, 'read the **bottom of the meniscus** at eye level, to **0.05 cm³**', { size: 10, h: 0.42, valign: 'top' });
  },
  head: 'Method',
  lines: [
    'Rinse the pipette with alkali and the burette with **acid**. Fill the burette; run some acid through the **jet**.',
    'Pipette **25.0 cm³** of 0.100 mol/dm³ NaOH into a conical flask; add 3 drops of **phenolphthalein**.',
    '**Rough** titration: add acid quickly, swirling, until colourless. Then repeat, adding acid **dropwise** near the end point.',
    'Record **initial** and **final** readings to 0.05 cm³. Repeat until **concordant** (within **0.10 cm³**).',
    '**Measured**: the titre. **Control**: same pipette volume, same indicator and number of drops, swirl each time.',
    '**Safety**: eye protection; NaOH 0.1 mol/dm³ **IRRITANT**; fill burette below eye level.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: a titre', q: 'Initial reading 0.20 cm³; final reading 22.65 cm³.',
    steps: [['Titre', 'final − initial = 22.65 − 0.20'], ['Answer', '**22.45 cm³** (to 2 d.p.)']], size: 10.5 },
  workedH: 1.25,
  qc: 'Why is the burette rinsed with **acid** and not water? Why is the conical flask **swirled**?',
  notes: 'QUICK CHECK ANSWER: Water left in the burette would dilute the acid, so a larger volume would be needed (titre too big). Swirling mixes the acid and alkali so all the alkali reacts and the colour change is seen at the true end point.\nPRACTICAL STATUS: OCR\'s combined-science chemistry PAGs are C1 electrolysis, C2 distillation, C3 separation, C4 salts and C5 rates (see SPEC_C5_1.md); titration is PAG 6 in separate chemistry (J258) only. The titration procedure is still a C5.3 statement (C5.3.6), so it is taught here as a SUGGESTED PRACTICAL.\nCLEAPSS-style hazards: sodium hydroxide solution 0.1 mol/dm³ IRRITANT (causes skin and serious eye irritation; it is corrosive at 0.5 mol/dm³ and above); hydrochloric acid 0.1 mol/dm³ low hazard; phenolphthalein indicator (in ethanol) HIGHLY FLAMMABLE, keep away from flames. Wear eye protection; use a pipette filler (never mouth-pipette); fill the burette below eye level with a funnel, then remove the funnel; clamp the burette vertically.',
}), 'Practical: titration method');

// ======================= 15 PRACTICAL: RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C5.3.6')} • results table, concordant titres, mean titre`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'pH curve plotted to scale from pH-probe readings (illustrative data)');
  const g = { x: 1.3, y: 1.5, w: 4.95, h: 3.6, xmin: 0, xmax: 40, ymin: 0, ymax: 14, xstep: 5, ystep: 2, minor: 1, xlabel: 'Volume of hydrochloric acid added / cm³', ylabel: 'pH' };
  // phenolphthalein range band
  box(s, g.x, D.py(g, 10), g.w, D.py(g, 8.3) - D.py(g, 10), 'FBE3EE', null);
  D.axes(s, g);
  box(s, g.x + 0.02, D.py(g, 10), g.w - 0.04, D.py(g, 8.3) - D.py(g, 10), PINK[0], null, { tr: 55 });
  const curve = []; for (let v = 0; v <= 40.0001; v += 0.25) curve.push([v, Math.min(13.5, Math.max(0, pH(v)))]);
  D.plotLine(s, g, curve, C.blue, 2);
  const PTS = [0, 5, 10, 15, 20, 22, 23, 25, 30, 35, 40].map(v => [v, pH(v)]);
  D.points(s, g, PTS, C.ink);
  line(s, D.px(g, meanT), D.py(g, 0), D.px(g, meanT), D.py(g, 7), C.red, 1.25, { dash: 'dash' });
  label(s, D.px(g, meanT) + 0.05, D.py(g, 1.6), 1.5, `end point ${f2(meanT)} cm³`, { size: 10, bold: true, color: C.red, align: 'left', h: 0.22 });
  label(s, D.px(g, 26), D.py(g, 10.3), 2.0, 'phenolphthalein changes', { size: 10, bold: true, color: PINK[1], align: 'left', h: 0.22 });
  label(s, D.px(g, 26), D.py(g, 7.4), 2.0, 'pH 7: neutral', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.22 });
  // results table on the right
  const rows = [[HDR('Titration'), ...RUNS.map(r => HDR(r[0]))],
    [tcell('Final / cm³', 0, { bold: true }), ...RUNS.map(r => tcell(f2(r[2]), 0))],
    [tcell('Initial / cm³', 1, { bold: true }), ...RUNS.map(r => tcell(f2(r[1]), 1))],
    [tcell('Titre / cm³', 0, { bold: true }), ...TITRES.map((t, i) => tcell(f2(t), 0, i ? { bold: true, color: C.blue } : { italic: true }))]];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.48, 1.15, 1.15, 1.15, 1.15], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 6.8, 2.6, 6.08, 1.65, 'Worked example: mean titre', 'Ignore the rough. Titres 1–3 are within 0.10 cm³: concordant.', [
    ['Add', '22.45 + 22.55 + 22.50 = 67.50 cm³'], ['Answer', `67.50 ÷ 3 = **${f2(meanT)} cm³**`]], { size: 11 });
  D.card(s, 6.8, 4.4, 6.08, 1.85, 'Analysis', [
    'The **rough** titre overshoots the end point, so it is **not** used in the mean.',
    '**Concordant** titres agree within **0.10 cm³**: the results are **precise** (repeatable).',
    'The pH falls **steeply** near 22.5 cm³: one drop changes the indicator colour.',
  ], { size: 11 });
  D.quickCheck(s, 'Titres: **24.30** (rough), **23.85**, **23.90**, **23.80** cm³. Which are concordant? Calculate the mean titre.');
  D.notes(s, `QUICK CHECK ANSWER: 23.85, 23.90 and 23.80 are concordant (range 0.10 cm³); mean = 71.55 ÷ 3 = 23.85 cm³.\nIllustrative data (asserted in node): titres = final − initial = 23.10, 22.45, 22.55, 22.50; concordant range 0.10; mean ${fmt(meanT)} cm³. The pH curve is CALCULATED (not sketched) for 25.0 cm³ of 0.100 mol/dm³ NaOH with HCl of ${fmt(sf(cHCl, 3))} mol/dm³: start pH 13.0, pH 7 at ${f2(meanT)} cm³, pH ${pH(40).toFixed(2)} at 40 cm³. Plotted crosses are the readings at 0, 5, 10 … 40 cm³. Phenolphthalein colour range (pH 8.3–10) is shaded: it lies on the vertical part, so the colour change is within one drop of the end point.\nRESULTS-TABLE RULES: readings and titres to 2 d.p. (ending in 0 or 5); units in the column headings.`);
  calc('QC mean 23.85', mean([23.85, 23.90, 23.80]), 23.85, 1e-9);
  reg(s, 'Practical: results and analysis');
}

// ======================= 16 TITRATION CALCULATIONS (HT) =======================
{
  const s = D.contentHeader('Titration calculations', `Specification ${sp('C5.3.5')} • calculating an unknown concentration from titration results`, { ht: true, tag: 'C5.3.5' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'the three steps: known solution → ratio → unknown solution');
  const S3 = [
    ['1  Known solution', 'moles = c × V', 'NaOH: 0.100 × 0.0250\n= 0.00250 mol', 'E3F0FB', WAT[1]],
    ['2  Ratio from equation', 'NaOH : HCl = 1 : 1', 'HCl = 0.00250 mol', 'E9E0F7', C.blue],
    ['3  Unknown solution', 'c = moles ÷ V', `HCl: 0.00250 ÷ 0.02250\n= ${fmt(sf(cHCl, 3))} mol/dm³`, 'F6DCCB', C.orange],
  ];
  S3.forEach(([h, f, w, fill, edge], i) => {
    const y = 1.55 + i * 1.2;
    box(s, 0.75, y, 5.5, 0.98, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    label(s, 0.9, y + 0.06, 2.6, `**${h}**`, { size: 11.5, h: 0.3, align: 'left', color: C.ink });
    label(s, 0.9, y + 0.42, 2.6, f, { size: 11, h: 0.4, align: 'left', color: edge, bold: true });
    label(s, 3.45, y + 0.08, 2.7, w, { size: 11, h: 0.82, align: 'left' });
    if (i < 2) arrow(s, 3.5, y + 0.98, 3.5, y + 1.2, C.ink, 2);
  });
  eqn(s, 0.75, 5.15, 5.5, 'NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)', { size: 11.5, h: 0.4 });
  label(s, 0.75, 5.6, 5.5, 'Volumes: 25.0 cm³ = 0.0250 dm³; 22.50 cm³ = 0.02250 dm³', { size: 10.5, h: 0.24 });
  D.card(s, 6.8, 1.3, 6.08, 2.2, 'Method', [
    'Write the **balanced equation** and find the **mole ratio**.',
    'Use the solution where you know **both** c and V: **moles = c × V** (V in dm³).',
    'Use the ratio to find moles of the other substance, then **c = moles ÷ V**.',
    'Check: a 1 : 2 ratio (e.g. H₂SO₄ with NaOH) halves or doubles the moles.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 3.65, 6.08, 2.6, 'Worked example: a 1 : 2 reaction', '25.0 cm³ of 0.200 mol/dm³ NaOH is neutralised by 20.0 cm³ of sulfuric acid.  H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O', [
    ['NaOH', '0.200 × 0.0250 = 0.00500 mol'], ['Ratio', 'H₂SO₄ : NaOH = 1 : 2, so 0.00500 ÷ 2 = 0.00250 mol'],
    ['Answer', '0.00250 ÷ 0.0200 = **0.125 mol/dm³**']], { size: 11 });
  D.quickCheck(s, '**20.0 cm³** of **0.150 mol/dm³** HCl neutralises **25.0 cm³** of NaOH. Calculate the concentration of the NaOH in mol/dm³.');
  D.notes(s, `QUICK CHECK ANSWER: moles HCl = 0.150 × 0.0200 = 0.00300 mol; ratio 1 : 1 so NaOH = 0.00300 mol; c = 0.00300 ÷ 0.0250 = 0.120 mol/dm³.\nPractical result: c(HCl) = 0.00250 ÷ 0.02250 = ${fmt(cHCl)} → ${fmt(sf(cHCl, 3))} mol/dm³ (3 s.f., matching the data); in g/dm³: × 36.5 = ${fmt(sf(cHCl * MR.HCl, 3))} g/dm³. All asserted in node; equations atom-balanced.\nHT: code C5.3.5 inferred (UNVERIFIED wording). Foundation students should be able to calculate a titre and a mean titre and say the more acid needed, the more concentrated the alkali.`);
  reg(s, 'C5.3.5 Titration calculations (HT)');
}

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C5.3.5')}, ${sp('C5.3.6')} • titration results and calculations`, [
  { q: 'A burette reads **0.40 cm³** at the start and **23.15 cm³** at the end point. Calculate the titre.', marks: 2, ms: '23.15 − 0.40 (1); = 22.75 cm³ (1).' },
  { q: 'Titres: **24.30** (rough), **23.85**, **23.90**, **23.80** cm³. Calculate the mean titre, explaining which results you use.', marks: 2, ms: 'Use the concordant titres 23.85, 23.90, 23.80 / ignore the rough (1); mean = 23.85 cm³ (1).' },
  { q: '**25.0 cm³** of **0.100 mol/dm³** NaOH is neutralised by **20.00 cm³** of HCl. Calculate the concentration of the HCl.', marks: 2, ht: true, ms: 'moles NaOH = 0.100 × 0.0250 = 0.00250 mol = moles HCl (1); 0.00250 ÷ 0.02000 = 0.125 mol/dm³ (1).' },
  { q: '**20.0 cm³** of **0.050 mol/dm³** H₂SO₄ reacts with sodium hydroxide: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Calculate the moles of NaOH that react.', marks: 2, ht: true, ms: 'moles H₂SO₄ = 0.050 × 0.0200 = 0.0010 mol (1); × 2 = 0.0020 mol NaOH (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 PRECISION, ACCURACY, UNCERTAINTY =======================
reg(D.contentSlide({
  title: 'Precise and accurate titrations',
  subtitle: `Specification ${sp('C5.3.6')} • a procedure that gives precise, accurate, valid and repeatable results`,
  tag: 'C5.3.6', caption: 'magnified burette scale; eye positions exaggerated',
  draw: (s) => {
    const x = 2.4, w = 0.75, top = 1.5, h = 2.75, lo = 22.3, hi = 22.8, yv = v => top + 0.15 + (v - lo) / (hi - lo) * (h - 0.3);
    box(s, x, top, w, h, GLASS, null);
    meniscus(s, x, x + w, yv(22.55) - 0.16, yv(22.55), top + h, ACID);
    for (let k = 0; k <= 5; k++) {
      const v = lo + k * 0.1;
      line(s, x, yv(v), x + 0.35, yv(v), C.ink, 0.75);
      label(s, x - 0.55, yv(v) - 0.1, 0.5, v.toFixed(1), { size: 10, h: 0.2, align: 'right', color: C.grey });
      if (k < 5) line(s, x, yv(v + 0.05), x + 0.18, yv(v + 0.05), C.ink, 0.5);
    }
    line(s, x, top, x, top + h, C.ink, 1.25); line(s, x + w, top, x + w, top + h, C.ink, 1.25);
    // eyes
    const eye = (ex, ey, col) => { oval(s, ex, ey, 0.32, 0.18, C.white, C.ink, { lw: 0.75 }); ball(s, ex, ey, 0.05, C.ink); };
    eye(4.6, yv(22.55), C.green); line(s, x + w + 0.05, yv(22.55), 4.42, yv(22.55), C.green, 1.5);
    label(s, 4.35, yv(22.55) + 0.12, 1.9, 'eye level: **22.55 cm³** ✓', { size: 10.5, color: C.green, h: 0.24, align: 'left' });
    eye(4.6, top + 0.15, C.red); line(s, x + w + 0.05, yv(22.55), 4.42, top + 0.2, C.red, 1, { dash: 'dash' });
    label(s, 4.35, top + 0.28, 2.0, 'too high: parallax error', { size: 10, color: C.red, h: 0.22, align: 'left' });
    label(s, 0.55, yv(22.55) - 0.5, 1.25, 'bottom of the meniscus', { size: 10, bold: true, color: '3A6EA5', h: 0.4, valign: 'bottom' });
    arrow(s, 0.65, yv(22.55), x + w / 2 - 0.04, yv(22.55), '3A6EA5', 1.25);
    // uncertainty table
    const rows = [[HDR('Apparatus'), HDR('Uncertainty'), HDR('Volume'), HDR('% uncertainty')],
      [tcell('burette (2 readings)', 0), tcell('±0.10 cm³', 0), tcell('22.50 cm³', 0), tcell('0.44%', 0, { bold: true, color: C.green })],
      [tcell('pipette (class B)', 1), tcell('±0.06 cm³', 1), tcell('25.0 cm³', 1), tcell('0.24%', 1, { bold: true, color: C.green })],
      [tcell('measuring cylinder', 0), tcell('±0.5 cm³', 0), tcell('25 cm³', 0), tcell('2.0%', 0, { bold: true, color: C.red })]];
    s.addTable(rows, { x: 0.7, y: 4.5, w: 5.6, colW: [1.75, 1.2, 1.15, 1.5], rowH: 0.28, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  },
  head: 'Getting good data',
  lines: [
    '**Precise**: repeat results are **close together** (concordant). **Accurate**: close to the **true value**.',
    '**Repeatable**: the same person gets the same results again. **Valid**: it measures what it should.',
    'Use a **pipette** and **burette**, not a measuring cylinder: lower **% uncertainty**.',
    'Read the **bottom of the meniscus** at **eye level**; swirl; add **dropwise**; use a **white tile**.',
    'Rinse apparatus with the solution it will hold; fill the burette **jet**; remove the **funnel**.',
  ],
  size: 11,
  worked: { head: 'Worked example: % uncertainty', q: 'Each burette reading is ±0.05 cm³, so a titre is ±0.10 cm³.',
    steps: [['Titre', '0.10 ÷ 22.50 × 100 = 0.444…'], ['Answer', '**0.44%** (2 s.f.)']], size: 10.5 },
  workedH: 1.25,
  qc: 'Calculate the % uncertainty in a titre of **12.50 cm³** (±0.10 cm³). Why is a **larger** titre better?',
  notes: 'QUICK CHECK ANSWER: 0.10 ÷ 12.50 × 100 = 0.80%. The uncertainty (±0.10 cm³) is fixed, so a larger titre gives a smaller percentage uncertainty.\nC5.3.6 "describe and explain the procedure for a titration to give precise, accurate, valid and repeatable results" (code and wording seen in an RSC listing). Percentages asserted in node: 0.44%, 0.24%, 2.0%. Class B 25 cm³ pipette tolerance ±0.06 cm³ (class A ±0.03 cm³). Burette scale divisions are 0.1 cm³; readings are estimated to the nearest 0.05 cm³.',
}), 'C5.3.6 Precise and accurate titrations');

// ======================= 19 EVALUATING DATA =======================
{
  const s = D.contentHeader('Evaluating titration data', `Specification ${sp('C5.3.7')} • the quality of data from titrations`, { tag: 'C5.3.7' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'each cross is one titre, plotted to scale; true value 22.50 cm³');
  const ax = { x0: 1.3, x1: 6.1, lo: 21.6, hi: 23.6 }, X = v => ax.x0 + (v - ax.lo) / (ax.hi - ax.lo) * (ax.x1 - ax.x0);
  const yAx = 4.75;
  line(s, ax.x0, yAx, ax.x1, yAx, C.ink, 1.5);
  for (let k = 0; k <= 10; k++) { const v = ax.lo + k * 0.2; line(s, X(v), yAx, X(v), yAx + 0.07, C.ink, 1); label(s, X(v) - 0.3, yAx + 0.08, 0.6, v.toFixed(1), { size: 10, h: 0.2 }); }
  label(s, ax.x0, yAx + 0.32, ax.x1 - ax.x0, '**Titre / cm³**', { size: 10.5, h: 0.24 });
  line(s, X(22.5), 1.55, X(22.5), yAx, C.green, 1.5, { dash: 'dash' });
  label(s, X(22.5) - 0.8, 1.42, 1.6, 'true value', { size: 10, bold: true, color: C.green, h: 0.2 });
  const SETS = [['A', SA, C.blue, 'precise and accurate'], ['B', SB, C.orange, 'not precise (spread out)'], ['C', SC, C.red, 'precise, not accurate']];
  SETS.forEach(([n, data, col, t], i) => {
    const y = 2.05 + i * 0.85;
    label(s, 0.55, y - 0.14, 0.7, `**${n}**`, { size: 13, color: col, h: 0.28 });
    line(s, ax.x0, y, ax.x1, y, 'E3DCEF', 0.75);
    data.forEach(v => { const d = 0.07; line(s, X(v) - d, y - d, X(v) + d, y + d, col, 2); line(s, X(v) - d, y + d, X(v) + d, y - d, col, 2); });
    line(s, X(mean(data)), y - 0.2, X(mean(data)), y + 0.2, col, 1.25);
    label(s, ax.x0, y + 0.14, ax.x1 - ax.x0, t, { size: 10, italic: true, color: col, h: 0.22, align: n === 'C' ? 'left' : 'right' });
  });
  label(s, 0.6, 5.35, 5.8, 'Short vertical line = mean of the three titres', { size: 10, italic: true, color: C.grey, h: 0.22 });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'What the data tell you', [
    '**Range** (spread) shows **precision**: A and C range 0.10 cm³; B ranges 1.10 cm³.',
    '**Random errors** scatter results (B): e.g. misjudging the end point, reading errors. Repeats and a mean reduce their effect.',
    '**Systematic errors** shift every result the same way (C): e.g. burette rinsed with **water**, so the acid is diluted and every titre is too **large**.',
    'An **anomalous** result is far from the others: repeat it, do not include it in the mean.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: student B', 'Titres 21.80, 22.40, 22.90 cm³.', [
    ['Range', '22.90 − 21.80 = 1.10 cm³: **not concordant**'], ['Mean', '67.10 ÷ 3 = 22.37 cm³'],
    ['Answer', 'close to 22.50 by chance, but **not precise**: more repeats needed']], { size: 10.5 });
  D.quickCheck(s, 'Titres: **22.40**, **22.35**, **23.10**, **22.45** cm³. Identify the anomalous result and calculate the mean of the others.');
  D.notes(s, 'QUICK CHECK ANSWER: 23.10 cm³ is anomalous (more than 0.10 cm³ from the others). Mean = (22.40 + 22.35 + 22.45) ÷ 3 = 22.40 cm³.\nC5.3.7 "evaluate the quality of data from titrations" (code and wording seen in a search extract). Data illustrative and asserted: A mean 22.50, range 0.10; B mean 22.37 (2 d.p.), range 1.10; C mean 23.40, range 0.10. Crosses plotted to scale (2.4 in per cm³). Language follows the AQA/OCR shared practical-skills vocabulary: precision, accuracy, repeatable, reproducible, random and systematic error.');
  reg(s, 'C5.3.7 Evaluating titration data');
}

// ======================= 20 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C5.3.6')}, ${sp('C5.3.7')} • quality of titration data`, [
  { q: 'Explain the difference between results that are **precise** and results that are **accurate**.', marks: 2, ms: 'Precise: repeat results are close together / small spread (1); accurate: close to the true value (1).' },
  { q: 'A burette reading has an uncertainty of ±0.05 cm³. Calculate the percentage uncertainty in a titre of **25.00 cm³**.', marks: 2, ms: 'Titre uncertainty ±0.10 cm³ (two readings) and 0.10 ÷ 25.00 × 100 (1); = 0.40% (1). Accept 0.20% for 1 mark if one reading only is used.' },
  { q: 'A student rinsed the burette with **water** before filling it with acid. Explain the effect on the titre and the calculated concentration of the alkali.', marks: 2, ms: 'The acid is diluted, so a larger titre is needed (1); so the calculated concentration of the alkali is too high (1).' },
  { q: 'Explain why a **pipette** is used to measure the alkali rather than a measuring cylinder.', marks: 2, ms: 'A pipette has a much smaller (percentage) uncertainty / is more accurate (1); e.g. ±0.06 cm³ compared with ±0.5 cm³ for 25 cm³ / 0.24% compared with 2% (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Solute', 'The substance that dissolves in a solvent to make a solution.'],
  ['Solvent', 'The liquid that a solute dissolves in, e.g. water.'],
  ['Concentration', 'The amount of solute in a unit volume of solution: g/dm³ or mol/dm³.'],
  ['dm³ (cubic decimetre)', '1 dm³ = 1000 cm³ = 1 litre. cm³ ÷ 1000 = dm³.'],
  ['Molar concentration (HT)', 'Moles of solute per dm³: mol/dm³ = mol ÷ dm³.'],
  ['Standard solution', 'A solution whose concentration is known accurately.'],
  ['Volumetric flask', 'Glassware with one mark, holding one accurate volume, e.g. 250.0 cm³.'],
  ['Pipette', 'Delivers one accurate volume of liquid, e.g. 25.0 cm³; use a filler.'],
  ['Burette', 'Graduated tube with a tap; measures the volume of solution added, to 0.05 cm³.'],
  ['Titration', 'Finding the volume of one solution that exactly reacts with a known volume of another.'],
  ['Indicator', 'A dye that changes colour at the end point, e.g. phenolphthalein.'],
  ['End point', 'The point where the indicator changes colour: the reaction is just complete.'],
  ['Titre', 'The volume added from the burette: final reading − initial reading.'],
  ['Concordant', 'Titres that agree closely, within 0.10 cm³ of each other.'],
  ['Precise', 'Repeat measurements are close together.'],
  ['Accurate', 'A measurement close to the true value.'],
], { notes: 'Use as a cover-and-recall activity. Molar concentration is HT. Mr and the mole are C5.2 terms (recap only); acid, alkali and pH in detail are C6.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student finds the concentration of a **sodium hydroxide** solution by titration with **0.100 mol/dm³ hydrochloric acid** (3.65 g/dm³). She uses **25.0 cm³** portions of the alkali. Her titres: **20.60** (rough), **20.05**, **20.15**, **20.10** cm³.', [
  { l: 'a', q: 'Name the apparatus she should use to measure **25.0 cm³** of sodium hydroxide accurately.', marks: 1, ms: '(Volumetric) pipette (with a pipette filler) (1). Do not accept measuring cylinder.' },
  { l: 'b', q: 'Phenolphthalein indicator is added. State the colour change at the end point and why a **white tile** is used.', marks: 2, ms: 'Pink to colourless (1); so the colour change / end point is easier to see (1).' },
  { l: 'c', q: 'Identify the concordant titres and calculate the **mean titre**.', marks: 2, ms: '20.05, 20.15, 20.10 / ignore the rough (1); mean = 20.10 cm³ (1).' },
  { l: 'd', q: 'Calculate the **mass** of HCl in the mean titre of acid. Give your answer to 3 significant figures.', marks: 2, ms: 'mass = 3.65 × (20.10 ÷ 1000) (1); = 0.0734 g (1).', h: 1.1 },
  { l: 'e', q: 'Calculate the concentration of the sodium hydroxide in **mol/dm³**. NaOH + HCl → NaCl + H₂O', marks: 3, ht: true, ms: 'moles HCl = 0.100 × 0.02010 = 0.00201 mol (1); ratio 1 : 1 so moles NaOH = 0.00201 mol (1); c = 0.00201 ÷ 0.0250 = 0.0804 mol/dm³ (1).', h: 1.3 },
  { l: 'f', q: 'Describe and explain **three** things she should do to make her results **precise** and **accurate**.', marks: 3, ms: 'Any three, each with a reason (1 each): rinse burette with acid / pipette with alkali (so not diluted); add acid dropwise near the end point (so not overshot); swirl the flask (to mix); read the bottom of the meniscus at eye level (avoid parallax); repeat until concordant within 0.10 cm³ and find a mean (reduce effect of random error); fill the jet / remove the funnel (correct volume readings).', h: 1.3 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (e) is HT` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Rinse the pipette with sodium hydroxide solution and the burette with the hydrochloric acid, so neither solution is diluted by water.',
    'Use a pipette and filler to transfer 25.0 cm³ of the standard NaOH into a conical flask; add a few drops of indicator (phenolphthalein or methyl orange); place on a white tile.',
    'Fill the burette with acid using a funnel, below eye level; remove the funnel; fill the jet; record the initial reading at eye level, bottom of the meniscus, to 0.05 cm³.',
    'Do a rough titration first; then add acid quickly to about 1 cm³ before the rough value, then dropwise, swirling, until the indicator just changes colour (end point).',
    'Record the final reading; titre = final − initial; repeat until at least two (three) titres are concordant within 0.10 cm³; calculate the mean of the concordant titres.',
    'Precision from repeats and concordant results; accuracy from pipette / burette (low uncertainty), standard solution of known concentration, avoiding parallax. Safety: eye protection; NaOH irritant.',
  ], {
    l3: 'Describes a full, logically ordered titration method AND explains how at least two steps make the results precise or accurate.',
    l2: 'Describes most steps of a titration method in a sensible order, with some reference to precision or accuracy.',
    l1: 'Simple statements about using a burette, an indicator or adding acid to alkali; may be out of order.',
  });
}
const HW = [
  { n: '1', q: 'State the units of concentration when the amount of solute is measured (i) as a mass and (ii) in moles.', marks: 1, ms: 'g/dm³ AND mol/dm³ (both for 1 mark).' },
  { n: '2', q: '**6.0 g** of potassium nitrate is dissolved to make **150 cm³** of solution. Calculate the concentration in g/dm³.', marks: 2, ms: '150 cm³ = 0.150 dm³ and 6.0 ÷ 0.150 (1); = 40 g/dm³ (1).' },
  { n: '3', q: 'Titres: **18.65** (rough), **18.20**, **18.25**, **18.15** cm³. Calculate the mean titre and explain your choice of results.', marks: 2, ms: 'Use the concordant titres / ignore the rough (1); (18.20 + 18.25 + 18.15) ÷ 3 = 18.20 cm³ (1).' },
  { n: '4', q: 'Explain why a student should add the acid **drop by drop** near the end point and **swirl** the flask.', marks: 2, ms: 'Dropwise: so the end point is not overshot / the exact volume is found (1); swirl: to mix so all the alkali reacts / the colour change is seen at the true end point (1).' },
  { n: '5', q: '**2.0 g** of NaOH (Mr = 40) is dissolved to make **500 cm³** of solution. Calculate the concentration in mol/dm³.', marks: 2, ht: true, ms: 'moles = 2.0 ÷ 40 = 0.050 mol (1); 0.050 ÷ 0.500 = 0.10 mol/dm³ (1).', h: 1.1 },
  { n: '6', q: 'Convert **0.25 mol/dm³** sodium hydroxide into g/dm³ (Mr = 40).', marks: 2, ht: true, ms: '0.25 × 40 (1); = 10 g/dm³ (1).' },
  { n: '7', q: 'Describe how a student should carry out a **titration** to find the concentration of hydrochloric acid using a standard solution of sodium hydroxide. Explain how she makes her results **precise and accurate**.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q5 and Q6 are Higher tier.', HW, 17, { dividerSub: 'C5.3 Amounts in solution • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C5.3') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom/charge-balanced`);
const out = path.join(__dirname, 'OCR21C_C5.3_SolutionAmounts_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
