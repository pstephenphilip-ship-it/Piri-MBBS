// build_B5_6.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B5 The human body – staying alive, B5.6 What can happen when organs and control systems stop working?
// (one deck, Higher & Foundation; the last of 6 B5 decks)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B5_6.js
// Structure copied from build_B4_3.js / build_B5_4.js. ocr_bio_template.js is NOT edited by this deck: the body outline
// (from build_B5_3.js), hormone/receptor (from build_B5_3.js), liver, pancreas, glycogen, syringe, test tube and water-bath
// helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_B5_6.md): J260 B5.6 = B5.6.1 insulin controls blood glucose; B5.6.2 (HT) glucagon and insulin work
// together; B5.6.3 compare type 1 and type 2 diabetes and explain how they can be treated. Kidney failure, dialysis and
// transplants are NOT in the B5.6 statements found (the kidney is J257 B5.4 only): not taught. Homeostasis (B5.4) and
// negative feedback (B5.3) are recapped only. The glucose tolerance test and the urine-glucose activity are data /
// practical contexts for the statements, not statements in their own right.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B5', chapterTitle: 'The human body – staying alive', code: 'B5.6', title: 'What can happen when organs and control systems stop working?',
  part: 6, parts: 6, specRange: 'B5.6.1–B5.6.3',
  subtitle: 'What can happen when organs and control systems stop working?',
  keywords: ['Blood glucose', 'Insulin', 'Glucagon (HT)', 'Glycogen', 'Type 1 diabetes', 'Type 2 diabetes'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;

// ======================= CALCULATIONS (asserted) =======================
// slide 5: blood glucose over a day (model: baseline 5.0 mmol/L + a bump 45 min after each meal)
const MEALS = [8, 13, 19];
const day = t => 5.0 + MEALS.reduce((a, m) => a + 2.5 * Math.exp(-(((t - m - 0.75) / 0.7) ** 2)), 0);
const dayPts = []; for (let i = 0; i <= 240; i++) dayPts.push([i / 10, day(i / 10)]);
const dayMax = Math.max(...dayPts.map(p => p[1])), dayMin = Math.min(...dayPts.map(p => p[1]));
calc('day graph max 2 s.f.', sf(dayMax, 2), 7.5, 1e-12);
calc('day graph min 2 s.f.', sf(dayMin, 2), 5.0, 1e-12);
assert(dayMax < 8 && dayMin >= 4, 'day graph stays in the normal range');
const bloodVol = 5, glu = 5;
const mmolTot = calc('glucose in blood 5 L × 5 mmol/L', bloodVol * glu, 25, 1e-9);
const gTot = calc('25 mmol × 0.18 g/mmol', mmolTot * 0.18, 4.5, 1e-9);
calc('QC 5 L × 8 mmol/L', 5 * 8, 40, 1e-9);
calc('QC 40 × 0.18', 40 * 0.18, 7.2, 1e-9);
calc('rise after breakfast 7.5 − 5.0', 7.5 - 5.0, 2.5, 1e-9);
// slide 6: glycogen store (illustrative textbook values)
calc('liver glycogen 100 g ÷ 4.5 g in blood', 100 / 4.5, 22.22222222222222, 1e-9);
calc('liver glycogen ratio 2 s.f.', sf(100 / 4.5, 2), 22, 1e-12);
// slide 8: feedback worked example
calc('fall 8.2 → 5.0', 8.2 - 5.0, 3.2, 1e-9);
calc('fall per min over 90 min', 3.2 / 90, 0.035555555555555556, 1e-9);
// slide 10 (HT): after a meal, 0–240 min
const f = (t, p) => (t / p) * Math.exp(1 - t / p);
const G10 = t => 5 + 3 * f(t, 30) - 0.7 * f(t, 170);
const I10 = t => 1 + 8 * f(t, 45);
const Gn10 = t => 2.5 - 1.6 * f(t, 45) + 1.6 * f(t, 185);
const grid = []; for (let t = 0; t <= 240; t++) grid.push(t);
const argmax = fn => grid.reduce((b, t) => fn(t) > fn(b) ? t : b, 0);
const argmin = fn => grid.reduce((b, t) => fn(t) < fn(b) ? t : b, 0);
const tGmax = argmax(G10), tImax = argmax(I10), tGnmin = argmin(Gn10);
calc('HT glucose peak time', tGmax, 28);
calc('HT insulin peak time', tImax, 45);
assert(tImax > tGmax, 'insulin peaks after glucose');
calc('HT glucose peak 2 s.f.', sf(G10(tGmax), 2), 7.7, 1e-12);
calc('HT glucose at 180 min 2 s.f.', sf(G10(180), 2), 4.4, 1e-12);
assert(Gn10(200) > Gn10(0) && Gn10(tGnmin) < 2, 'glucagon falls after the meal and rises when glucose dips');
calc('HT glucagon min time', tGnmin, 30);
calc('HT insulin peak value', I10(45), 9, 1e-9);
calc('HT insulin rise factor 9 ÷ 1', I10(45) / I10(0), 9, 1e-9);
// slide 13: BMI
const bmi = (m, h) => m / (h * h);
const bmiA = calc('BMI 95 kg, 1.75 m', bmi(95, 1.75), 31.020408163265305, 1e-9);
calc('BMI A 3 s.f.', sf(bmiA, 3), 31.0, 1e-12);
calc('1.75²', 1.75 * 1.75, 3.0625, 1e-12);
const bmiQ = calc('QC BMI 68 kg, 1.70 m', bmi(68, 1.70), 23.529411764705884, 1e-9);
calc('QC BMI 3 s.f.', sf(bmiQ, 3), 23.5, 1e-12);
// slide 14: UK proportions (approximate, Diabetes UK; UNVERIFIED to the percent)
const UK = [['Type 2', 90], ['Type 1', 8], ['Other types', 2]];
calc('UK % sum', UK.reduce((a, [, v]) => a + v, 0), 100);
const ukTot = 4.4;
calc('type 2 of 4.4 million (90%)', ukTot * 0.9, 3.96, 1e-9);
calc('type 1 of 4.4 million (8%)', ukTot * 0.08, 0.352, 1e-9);
calc('ratio type 2 : type 1', 90 / 8, 11.25, 1e-9);
// slide 16: glucose tolerance test (75 g glucose drink at 0 min), illustrative
const GT_T = [0, 30, 60, 90, 120, 150, 180];
const GT_N = [4.8, 7.8, 7.0, 5.8, 5.0, 4.6, 4.7];
const GT_D = [8.0, 12.5, 15.0, 14.5, 13.0, 11.5, 10.0];
calc('GTT non-diabetic rise 7.8 − 4.8', Math.max(...GT_N) - GT_N[0], 3.0, 1e-9);
calc('GTT diabetic rise 15.0 − 8.0', Math.max(...GT_D) - GT_D[0], 7.0, 1e-9);
calc('GTT diabetic % rise (15 − 8) ÷ 8 × 100', (Math.max(...GT_D) - GT_D[0]) / GT_D[0] * 100, 87.5, 1e-9);
calc('GTT non-diabetic % rise 3 ÷ 4.8 × 100', 3 / 4.8 * 100, 62.5, 1e-9);
calc('GTT 2 h difference 13.0 − 5.0', GT_D[4] - GT_N[4], 8.0, 1e-9);
assert(GT_N[4] < 7.8 && GT_D[4] >= 11.1, 'GTT 2 h thresholds (WHO: < 7.8 normal, ≥ 11.1 diabetes)');
assert(GT_D[0] >= 7.0 && GT_N[0] < 6.1, 'fasting thresholds');
calc('QC GTT fall 15.0 → 10.0', GT_D[2] - GT_D[6], 5.0, 1e-9);
// slides 17–18: time for Benedict's to turn first green in a water bath vs glucose concentration (illustrative)
const STD = [0.25, 0.5, 1, 2, 4];               // g per 100 cm³
const REP = [[296, 305, 299], [186, 194, 190], [118, 123, 119], [74, 76, 75], [47, 50, 47]];
const STDm = REP.map(mean);
[300, 190, 120, 75, 48].forEach((v, i) => calc(`std mean ${STD[i]}`, STDm[i], v, 1e-9));
const model = c => 120 * c ** -0.66;
STD.forEach((c, i) => assert(Math.abs(model(c) - STDm[i]) < 3, `model fits std ${c}`));
const tY = 95, cY = (120 / tY) ** (1 / 0.66);
calc('unknown Y from model', sf(cY, 2), 1.4, 1e-12);
calc('dilution: 2% stock to 0.5%, 20 cm³: stock volume', 0.5 * 20 / 2, 5, 1e-9);
calc('dilution: water volume 20 − 5', 20 - 5, 15, 1e-9);
calc('range of 0.25 repeats', Math.max(...REP[0]) - Math.min(...REP[0]), 9);
// slide 20: zones
calc('hypo margin 4 − 2.8', 4 - 2.8, 1.2, 1e-9);
// starter, recaps, FQ, HW
calc('starter 6 × 4', 6 * 4, 24);
calc('R1 5 × 6', 5 * 6, 30);
calc('R1 30 × 0.18', 30 * 0.18, 5.4, 1e-9);
calc('R3 % type 2 of 500', 500 * 0.9, 450, 1e-9);
calc('R4 rise 4.5 → 9.0 %', (9.0 - 4.5) / 4.5 * 100, 100, 1e-9);
calc('FQ BMI 102 / 1.8²', sf(bmi(102, 1.8), 3), 31.5, 1e-12);
calc('FQ rise 5.2 → 7.6', 7.6 - 5.2, 2.4, 1e-9);
calc('HW mean (6.2 + 5.8 + 6.6) / 3', (6.2 + 5.8 + 6.6) / 3, 6.2, 1e-9);
calc('HW % 1 in 16 people', 1 / 16 * 100, 6.25, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_bio_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
    line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const SKIN = 'F6DDC8', SKIN_EDGE = 'B98E6E';
const PAN = ['D4A017', '8A6A0A'], LIV = ['A0522D', '6B3318'], GLU = '3B7DD8', GLY = '1F4E8C', INS = 'E08A1E', GCG = '8E44AD', HI = 'C8414C';
// body outline (copied from build_B5_3.js, organs removed). Height 4.5k, width 2.3k.
function body(s, cx, top, k = 1) {
  const parts = [
    ['rr', cx - 1.12 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, 7], ['rr', cx + 0.84 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, -7],
    ['rr', cx - 0.64 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0], ['rr', cx + 0.10 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0],
    ['rr', cx - 0.8 * k, top + 0.92 * k, 1.6 * k, 2.0 * k, 0], ['r', cx - 0.13 * k, top + 0.7 * k, 0.26 * k, 0.3 * k, 0], ['o', cx - 0.33 * k, top, 0.66 * k, 0.8 * k, 0],
  ];
  [true, false].forEach(edgePass => parts.forEach(([t, x, y, w, h, rot]) => {
    const shape = t === 'o' ? SH.OVAL : t === 'r' ? SH.RECTANGLE : SH.ROUNDED_RECTANGLE;
    s.addShape(shape, { x, y, w, h, rotate: rot, rectRadius: t === 'rr' ? Math.min(w, h) * 0.45 : undefined, fill: { color: SKIN },
      line: edgePass ? { color: SKIN_EDGE, width: 2.5 } : { type: 'none' } });
  }));
  line(s, cx, top + 2.95 * k, cx, top + 4.5 * k, SKIN_EDGE, 1.25);
}
// abdominal organs in a body at (cx, top, k): liver on the body's right (viewer's left), stomach on the body's left,
// pancreas behind the stomach with its head in the curve of the duodenum and tail towards the spleen. Returns points.
function abdomen(s, cx, top, k = 1) {
  const y = top + 1.35 * k;
  poly(s, [[cx - 0.74 * k, y], [cx + 0.12 * k, y - 0.06 * k], [cx + 0.18 * k, y + 0.08 * k], [cx - 0.1 * k, y + 0.38 * k], [cx - 0.72 * k, y + 0.48 * k]], LIV[0], LIV[1], { lw: 1 });
  oval(s, cx + 0.42 * k, y + 0.2 * k, 0.5 * k, 0.36 * k, 'F2C9B8', 'B07A66', { lw: 0.75, rot: 20 });
  // duodenum curve (C shape) then pancreas
  oval(s, cx - 0.12 * k, y + 0.62 * k, 0.3 * k, 0.32 * k, null, 'C9A06A', { lw: 3 });
  oval(s, cx + 0.2 * k, y + 0.6 * k, 0.78 * k, 0.17 * k, PAN[0], PAN[1], { rot: -10, lw: 1.25 });
  return { liver: [cx - 0.4 * k, y + 0.2 * k], stomach: [cx + 0.48 * k, y + 0.15 * k], pancreas: [cx + 0.35 * k, y + 0.58 * k] };
}
function callout(s, lx, ly, lw, text, px, py, col, o = {}) {
  const right = lx > px;
  label(s, lx, ly - (o.h || 0.3) / 2, lw, text, { size: o.size || 10.5, bold: o.bold !== false, color: col, align: right ? 'left' : 'right', h: o.h || 0.3, valign: 'middle' });
  line(s, right ? lx - 0.04 : lx + lw + 0.04, ly, px, py, col, 1);
  ball(s, px, py, 0.03, col);
}
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
// hormone molecule (triangle) and receptor (green block with a notch), from build_B5_3.js
function hormone(s, cx, cy, r = 0.08, col = INS) { s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r * 0.9, fill: { color: col }, line: { color: '9A5A0A', width: 0.75 } }); }
function receptor(s, cx, ytop, w = 0.24, col = C.green, bound) {
  box(s, cx - w / 2, ytop, w, 0.16, col, '1E6B40', { lw: 0.75 });
  poly(s, [[cx - 0.08, ytop - 0.001], [cx + 0.08, ytop - 0.001], [cx, ytop + 0.13]], C.white, '1E6B40', { lw: 0.5 });
  if (bound) s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.08, y: ytop - 0.01, w: 0.16, h: 0.14, rotate: 180, fill: { color: INS }, line: { color: '9A5A0A', width: 0.75 } });
}
// glucose (small blue hexagon-ish dot) and glycogen (branched chain of glucose dots)
function glucose(s, cx, cy, r = 0.055) { s.addShape(SH.HEXAGON, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: GLU }, line: { color: GLY, width: 0.5 } }); }
function glycogen(s, cx, cy, k = 1) {
  const pts = [];
  for (let i = 0; i < 6; i++) pts.push([cx - 0.3 * k + i * 0.12 * k, cy]);
  for (let i = 0; i < 3; i++) pts.push([cx - 0.06 * k + i * 0.11 * k, cy - 0.11 * k - i * 0.06 * k]);
  for (let i = 0; i < 3; i++) pts.push([cx - 0.18 * k + i * 0.1 * k, cy + 0.11 * k + i * 0.06 * k]);
  pts.forEach(([x, y]) => glucose(s, x, y, 0.05 * k));
}
// liver shape (large), lobe pointing right
function liver(s, x, y, w, h) {
  poly(s, [[x, y + 0.15 * h], [x + 0.55 * w, y], [x + w, y + 0.1 * h], [x + 0.75 * w, y + 0.6 * h], [x + 0.35 * w, y + h], [x + 0.05 * w, y + 0.8 * h]], LIV[0], LIV[1], { lw: 1.25 });
}
// pancreas (large): body with lobules and islets
function pancreas(s, x, y, w, h, o = {}) {
  oval(s, x + w / 2, y + h / 2, w, h, PAN[0], PAN[1], { lw: 1.5 });
  oval(s, x + 0.17 * w, y + h * 0.55, 0.32 * w, h * 1.25, PAN[0], PAN[1], { lw: 1.5 });
  if (o.islets !== false) [[0.3, 0.4], [0.55, 0.55], [0.75, 0.42], [0.18, 0.7]].forEach(([fx, fy]) => ball(s, x + fx * w, y + fy * h, Math.min(w, h) * 0.12, 'F5E6B0', PAN[1], 0.75));
}
// insulin pen
function insulinPen(s, x, y, w) {
  box(s, x, y, w * 0.7, 0.22, '5B9BD5', '2F5F8F', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
  box(s, x + w * 0.7, y + 0.03, w * 0.15, 0.16, 'E6EBF2', '6B7385');
  line(s, x + w * 0.85, y + 0.11, x + w, y + 0.11, '6B7385', 1);
  box(s, x - 0.12, y + 0.02, 0.12, 0.18, '2F5F8F', '2F5F8F');
  box(s, x + w * 0.35, y + 0.05, 0.2, 0.12, C.white, null);
}
// glucose meter
function meter(s, x, y, val) {
  box(s, x, y, 0.75, 1.05, 'E6EBF2', '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
  box(s, x + 0.1, y + 0.12, 0.55, 0.38, 'D8F0E2', '5A6275', { lw: 0.75 });
  label(s, x + 0.1, y + 0.12, 0.55, String(val), { size: 12, bold: true, h: 0.38 });
  box(s, x + 0.3, y + 1.05, 0.15, 0.25, C.white, '5A6275', { lw: 0.75 });
  ball(s, x + 0.375, y + 1.42, 0.06, HI, HI);
}
// test tube with liquid
function testTube(s, cx, ytop, h, liq, frac = 0.45) {
  const w = 0.3;
  const lh = h * frac;
  box(s, cx - w / 2, ytop + h - lh, w, lh - 0.05, liq, null);
  ball(s, cx, ytop + h - 0.12, w / 2 - 0.005, liq, liq);
  line(s, cx - w / 2, ytop, cx - w / 2, ytop + h - 0.12, '6B7385', 1.5);
  line(s, cx + w / 2, ytop, cx + w / 2, ytop + h - 0.12, '6B7385', 1.5);
  s.addShape(SH.ARC, { x: cx - w / 2, y: ytop + h - 0.27, w, h: 0.3, angleRange: [0, 180], line: { color: '6B7385', width: 1.5 }, fill: { type: 'none' } });
}
const BEN = ['3B6FD8', '5DA34A', 'C9B21E', 'E07A1E', 'B5361E']; // blue, green, yellow, orange, brick red

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Diabetes',
  footer: 'OCR J260 Combined Science B • B5.6 What can happen when organs and control systems stop working? • teacher deck • mark schemes in the notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • insulin, glucagon (HT), type 1 and type 2 diabetes and their treatment` },
    { icon: 'H', text: 'Higher & Foundation in one deck • B5.6.2 glucagon marked HT • stretch marked' },
    { icon: '▲', text: 'Blood glucose control • glucose tolerance data • testing for glucose • BMI and risk' },
  ],
  notes: 'B5.6 What can happen when organs and control systems stop working? is Part 6 of 6 in J260 Chapter B5 The human body – staying alive, and the last B5 deck.\nScope check (see SPEC_B5_6.md): the B5.6 statements found are B5.6.1 explain how insulin controls blood sugar levels in the body; B5.6.2 explain how glucagon and insulin work together to control blood sugar levels (HT); B5.6.3 compare type 1 and type 2 diabetes and explain how they can be treated. Kidney failure, dialysis and organ transplants were NOT found in J260 B5.6 (the kidney is in J257 Biology B B5.4 only), so they are not taught.\nHomeostasis (B5.4) and negative feedback (B5.3) are recapped, not re-taught. The wording comes from search extracts (ocr.org.uk and the specification mirrors could not be fetched): confidence medium–high.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B5.6.1', text: 'Explain why **blood glucose** must be kept within a **narrow range**, and where glucose comes from.' },
  { code: 'B5.6.1', text: 'Explain how the **pancreas** releases **insulin** and how insulin makes the blood glucose level **fall**.' },
  { code: 'B5.6.1', text: 'Describe blood glucose control as **negative feedback**, and the role of **glycogen** in the liver and muscles.' },
  { code: 'B5.6.2', text: 'Explain how **glucagon** and **insulin** work **together** to control blood glucose.', ht: true },
  { code: 'B5.6.3', text: 'Describe the **cause**, **symptoms** and **treatment** of **type 1** diabetes.' },
  { code: 'B5.6.3', text: 'Describe the cause, risk factors and treatment of **type 2** diabetes; calculate **BMI**.' },
  { code: 'B5.6.3', text: '**Compare** type 1 and type 2 diabetes and interpret **glucose tolerance test** data.' },
  { code: 'Activity', text: 'Test samples for **glucose** with Benedict\'s reagent and use a **calibration graph**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements found (tutordex J257 B5.6 listing, search extracts; the J260 specification copy on plutoniumscience quotes the same outcomes for J260 B5.6): B5.6.1 explain how insulin controls blood sugar levels in the body; B5.6.2 explain how glucagon and insulin work together to control blood sugar levels in the body; B5.6.3 compare type 1 and type 2 diabetes and explain how they can be treated.\nHT: B5.6.2 (glucagon). Evidence: docbrown combined page "blood sugar level is controlled by insulin and (HT only) glucagon"; Oak National Academy runs "Insulin, glucagon and the control of blood sugar level" only in its OCR Combined Higher programme. If your copy of the specification shows B5.6.2 in normal type, teach slides 9–10 to everyone.\nThe glucose test with Benedict\'s and the glucose tolerance test are contexts, not statements. BMI is used as a risk-factor calculation.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B5 The human body – staying alive • B5.6 is Part 6 of 6 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B5.6.1', 'Why control blood glucose? Insulin and glycogen', 'Both tiers', C.blue],
    ['B5.6.1', 'Blood glucose and negative feedback', 'Both tiers', C.blue],
    ['B5.6.2', 'Glucagon and insulin work together', 'HT', C.red],
    ['B5.6.3', 'Type 1 and type 2 diabetes: causes and treatments', 'Both tiers', C.blue],
    ['Data', 'Glucose tolerance test; BMI and risk', 'Both tiers', C.blue],
    ['Activity', 'Testing for glucose; calibration graph', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B5.6\nWhen control fails', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B4.1 respiration • B5.1 plasma • B5.3 pancreas, negative feedback • B5.4 homeostasis', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.25, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B5.1 How do substances get into, out of and around our bodies?',
      'B5.2 How does the nervous system help us respond to changes?',
      'B5.3 How do hormones control responses in the human body?',
      'B5.4 Why do we need to maintain a constant internal environment?',
      'B5.5 What role do hormones play in human reproduction?',
      '**B5.6 What can happen when organs and control systems stop working?** (this deck)',
    ], { size: 11, color: 'E3F2F0', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 3.05, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.75, 5.53, 2.1, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (glucagon) are for Higher tier only.',
      'Blood glucose is the example of a control system that can **stop working**: diabetes.',
      'Maths: reading **graphs**, **percentages**, **BMI**, **means**, interpolation.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.85, w: 5.15, h: 1.9, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B5 has six sub-topics (B5.1–B5.6); see SPEC_B5_1.md to SPEC_B5_5.md. This is the last B5 deck.\nOverlap control: the endocrine system and the pancreas\'s position were taught in B5.3 (insulin appeared there on the gland map only). Negative feedback was taught with thyroxine in B5.3 and the idea of antagonistic effectors in B5.4 (homeostasis); both are recapped and applied here. Respiration (B4.1) is recalled as the reason cells need glucose. Lifestyle and non-communicable disease risk factors may also appear in Chapter B2 (keeping healthy): BMI is used here only as a type 2 risk factor.\nNot taught: kidney failure, dialysis and transplants (not found in J260 B5.6; the kidney is J257 B5.4).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B4.1 • respiration', q: 'Write the word equation for **aerobic respiration**. Why do cells need a steady supply of **glucose**?' },
  { from: 'B5.1 • blood', q: 'Which part of the blood carries dissolved **glucose** and **hormones** around the body?' },
  { from: 'B5.3 • hormones', q: 'Where is the **pancreas**? How do hormones travel from a gland to their **target** organ?' },
  { from: 'B5.3 • feedback', q: 'What is **negative feedback**? Give the example you met in B5.3.' },
  { from: 'B5.4 • homeostasis', q: 'Define **homeostasis**. What are **antagonistic** effectors?' },
  { from: 'B3 • food tests', q: 'Which reagent tests for **glucose** (a reducing sugar)? What colour shows a lot of glucose? (A student does **6** tests of **4** min each: total time?)' },
], { subtitle: 'Recall from B3, B4.1, B5.1, B5.3 and B5.4 • 6 minutes • no notes', notes: 'ANSWERS\n1. Glucose + oxygen → carbon dioxide + water (energy released). Respiration releases the energy cells need for all their processes, and it never stops, so glucose must be supplied all the time.\n2. Plasma.\n3. In the abdomen, behind the stomach. In the blood (plasma); they act on target cells that have the right receptors.\n4. A change from the normal level causes a response that reverses the change. Thyroxine: high thyroxine → less TSH from the pituitary → less thyroxine.\n5. Keeping a constant internal environment. Two effectors with opposite effects on the same condition (e.g. sweating and shivering).\n6. Benedict\'s reagent, heated in a water bath: blue → green → yellow → orange → brick red; brick red = a lot. 6 × 4 = 24 min. (If your scheme taught food tests in a different chapter, treat Q6 as a pre-teach.)' }), 'Retrieval starter');

// ======================= 5 WHY CONTROL BLOOD GLUCOSE =======================
{
  const g = { x: 1.4, y: 1.65, w: 4.85, h: 3.25, xmin: 0, xmax: 24, ymin: 0, ymax: 10, xstep: 4, ystep: 2, minor: 2, xlabel: 'Time of day / hours', ylabel: 'Blood glucose / mmol/L' };
  reg(D.contentSlide({
    title: 'Why blood glucose must be controlled',
    subtitle: `Specification ${sp('B5.6.1')} • glucose comes in at meals but cells use it all the time`,
    tag: 'B5.6.1', caption: 'blood glucose of a healthy person over one day, plotted to scale (model data)',
    draw: (s) => {
      D.axes(s, g);
      box(s, g.x, D.py(g, 7), g.w, D.py(g, 4) - D.py(g, 7), 'D8F0E2', null, { tr: 40 });
      label(s, g.x + 0.05, D.py(g, 4) - 0.27, 2.0, 'normal range 4–7', { size: 10, bold: true, color: C.green, align: 'left', h: 0.24 });
      D.plotLine(s, g, dayPts, HI, 2.25);
      MEALS.forEach((m, i) => {
        arrow(s, D.px(g, m), D.py(g, 9.6), D.px(g, m), D.py(g, 8.2), C.orange, 1.5);
        label(s, D.px(g, m) - 0.6, D.py(g, 9.95), 1.2, ['breakfast', 'lunch', 'dinner'][i], { size: 10, bold: true, color: C.orange, h: 0.22 });
      });
      label(s, g.x + 0.1, D.py(g, 2.6), 4.6, 'between meals, the liver releases stored glucose', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.24 });
    },
    head: 'Glucose in, glucose out',
    lines: [
      'Glucose enters the blood from **digested food** (carbohydrates) after a meal.',
      'Every cell uses glucose for **respiration** (B4.1), all the time, even when you sleep.',
      'Too **high**: water leaves cells by osmosis and blood vessels are damaged. Too **low**: cells, especially **brain** cells, run short of energy.',
      'So blood glucose is kept between about **4 and 7 mmol/L**: an example of **homeostasis** (B5.4).',
    ],
    size: 11,
    worked: { head: 'Worked example: how much glucose?', q: `Blood volume ${bloodVol} L at ${glu} mmol/L. 1 mmol of glucose has a mass of 0.18 g.`,
      steps: [['Amount', `${bloodVol} × ${glu} = ${mmolTot} mmol`], ['Mass', `${mmolTot} × 0.18 g`], ['Answer', `${gTot} g: about one teaspoon of sugar`]], size: 10.5 },
    workedH: 1.6,
    qc: 'Give **one** reason blood glucose rises and **one** reason it falls. Repeat the worked example for **8 mmol/L**.',
    notes: `QUICK CHECK ANSWER: Rises: a meal / eating carbohydrates / sugary drink (glucose absorbed from the gut). Falls: respiration in cells uses it / exercise. 5 × 8 = 40 mmol; 40 × 0.18 = 7.2 g.\nGraph model (node): 5.0 + 2.5 exp(−((t − meal − 0.75)/0.7)²) for meals at 8, 13 and 19 h; max ${sf(dayMax, 3)} mmol/L, min ${sf(dayMin, 3)} mmol/L. UK units are mmol/L; some exam questions use mg per 100 cm³ (5 mmol/L ≈ 90 mg/100 cm³). 1 mmol glucose (C₆H₁₂O₆) = 180 mg.\nB5.4 recap only: homeostasis and why conditions must be constant were taught there.`,
  }), 'B5.6.1 Why control blood glucose?');
}

// ======================= 6 INSULIN =======================
reg(D.contentSlide({
  title: 'Insulin lowers blood glucose',
  subtitle: `Specification ${sp('B5.6.1')} • explain how insulin controls blood sugar levels in the body`,
  tag: 'B5.6.1', caption: 'where the organs are (front view) and what insulin does; not to scale',
  draw: (s) => {
    body(s, 1.55, 1.5, 0.95);
    const P = abdomen(s, 1.55, 1.5, 0.95);
    callout(s, 0.55, 1.75, 0.6, 'Liver', P.liver[0] - 0.15, P.liver[1], LIV[1], { h: 0.26 });
    callout(s, 2.8, 2.6, 0.85, 'Stomach', P.stomach[0] + 0.1, P.stomach[1], 'B07A66', { h: 0.26, size: 10 });
    callout(s, 2.8, 3.25, 0.95, 'Pancreas', P.pancreas[0] + 0.2, P.pancreas[1], PAN[1], { h: 0.26 });
    label(s, 2.8, 3.55, 1.0, 'liver on the body\'s **right** (your left)', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.8, valign: 'top' });
    // flow on the right
    const x = 3.85, w = 2.55;
    pbox(s, x, 1.45, w, 0.55, '**Blood glucose rises** after a meal', 'FBE3E4', HI, { size: 10.5 });
    arrow(s, x + w / 2, 2.0, x + w / 2, 2.2, C.ink, 1.75);
    pbox(s, x, 2.2, w, 0.62, '**Pancreas** detects it and releases **insulin** into the blood', 'FBF0D0', PAN[1], { size: 10.5 });
    hormone(s, x + 0.2, 2.98, 0.08); hormone(s, x + 0.45, 3.03, 0.08); hormone(s, x + 0.7, 2.98, 0.08);
    arrow(s, x + w / 2, 2.82, x + w / 2, 3.05, C.ink, 1.75);
    box(s, x, 3.05, w, 1.55, C.white, LIV[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    label(s, x + 0.08, 3.08, w - 0.16, '**Liver** and **muscle** cells take glucose **in** from the blood', { size: 10.5, h: 0.48, valign: 'top' });
    liver(s, x + 0.15, 3.6, 0.85, 0.65);
    [0, 1, 2].forEach(i => glucose(s, x + 1.2 + i * 0.13, 3.85, 0.055));
    arrow(s, x + 1.55, 3.86, x + 1.75, 3.86, C.ink, 1.25);
    glycogen(s, x + 2.1, 3.9, 0.85);
    label(s, x + 1.1, 4.22, 1.4, 'glucose → **glycogen**', { size: 10, color: GLY, h: 0.3 });
    arrow(s, x + w / 2, 4.6, x + w / 2, 4.8, C.ink, 1.75);
    pbox(s, x, 4.8, w, 0.55, '**Blood glucose falls** back to normal', 'E3F0FB', GLU, { size: 10.5 });
  },
  head: 'What insulin does',
  lines: [
    'The **pancreas** monitors the blood glucose level.',
    'When it is **too high** the pancreas releases the hormone **insulin** into the blood.',
    'Insulin makes body cells, especially **liver** and **muscle** cells, take up **glucose** from the blood.',
    'Liver and muscle cells convert glucose to **glycogen** (insoluble) and **store** it.',
    'So the blood glucose level **falls** back to normal.',
    'Insulin acts only on **target cells** that have **insulin receptors**.',
  ],
  size: 12.5,
  worked: { head: 'Worked example: how big is the store?', q: 'The liver stores about 100 g of glycogen. The blood holds about 4.5 g of glucose.',
    steps: [['Divide', '100 ÷ 4.5 = 22.2…'], ['Answer', 'the liver store is about **22 times** the glucose in the blood']], size: 10.5 },
  workedH: 1.35,
  qc: 'Name the **gland** that makes insulin, and the **storage** substance made in the liver. Why does blood glucose fall after insulin is released?',
  notes: 'QUICK CHECK ANSWER: The pancreas; glycogen. Insulin makes cells (especially liver and muscle cells) take up glucose from the blood; the liver and muscles convert it to glycogen and store it, so less glucose is left in the blood.\nDiagram: front view; the liver is on the body\'s right (viewer\'s left), the stomach on the body\'s left, and the pancreas lies behind the stomach with its head in the curve of the duodenum (drawn as the brown ring). Insulin is made in the islets of Langerhans (stretch name; the pale spots on the large pancreas drawings).\nStatement B5.6.1 "explain how insulin controls blood sugar levels in the body" (search extracts). 100 g liver glycogen is a typical textbook value (UNVERIFIED); 100 ÷ 4.5 = 22.2 (node). Muscles store more glycogen in total (about 400 g) but use it themselves.',
}), 'B5.6.1 Insulin');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B5.6.1')} • why control blood glucose; insulin`, [
  { q: 'Give **two** reasons why the body must keep the blood glucose level within a narrow range.', marks: 2, ms: 'Too low: cells / brain do not get enough glucose for respiration / energy (1); too high: water leaves cells by osmosis / damages blood vessels / organs (1).' },
  { q: 'Name the organ that releases **insulin**, and describe how insulin travels to its target cells.', marks: 2, ms: 'Pancreas (1); in the blood / plasma (1).' },
  { q: 'Explain how insulin makes the blood glucose level **fall**.', marks: 2, ms: 'Insulin makes (liver / muscle) cells take up glucose from the blood (1); glucose converted to glycogen and stored (1).' },
  { q: 'A person has **5 L** of blood at **6 mmol/L** glucose. 1 mmol = 0.18 g. Calculate the mass of glucose in their blood.', marks: 2, ms: '5 × 6 = 30 mmol (1); 30 × 0.18 = 5.4 g (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 NEGATIVE FEEDBACK =======================
{
  const s = D.contentHeader('Blood glucose and negative feedback', `Specification ${sp('B5.6.1')} • recap of B5.3: a change switches on a response that reverses it`, { tag: 'B5.6.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'the insulin feedback loop');
  // loop of four boxes around a centre
  const cx = 3.5, cy = 3.6;
  oval(s, cx, cy, 2.0, 1.0, 'D8F0E2', C.green, { lw: 1.5 });
  label(s, cx - 1.0, cy - 0.5, 2.0, '**Normal** blood glucose\n4–7 mmol/L', { size: 11, h: 1.0, color: '1E6B40' });
  pbox(s, 0.75, 1.5, 2.3, 0.75, '**1 Change**: a meal makes blood glucose **rise**', 'FBE3E4', HI, { size: 10.5 });
  pbox(s, 3.95, 1.5, 2.4, 0.75, '**2 Receptor and gland**: pancreas detects it, releases **insulin**', 'FBF0D0', PAN[1], { size: 10.5 });
  pbox(s, 3.95, 4.95, 2.4, 0.75, '**3 Effectors**: liver and muscle cells take up glucose', 'F3E3DA', LIV[1], { size: 10.5 });
  pbox(s, 0.75, 4.95, 2.3, 0.75, '**4 Response**: blood glucose **falls** to normal', 'E3F0FB', GLU, { size: 10.5 });
  arrow(s, 3.07, 1.87, 3.93, 1.87, C.ink, 2);
  arrow(s, 5.15, 2.27, 5.15, 4.93, C.ink, 2);
  arrow(s, 3.93, 5.32, 3.07, 5.32, C.ink, 2);
  arrow(s, 1.9, 4.93, 1.9, 2.27, C.red, 2, { dash: 'dash' });
  label(s, 0.55, 3.1, 1.25, 'insulin release **stops**: feedback', { size: 10, color: C.red, h: 0.75, valign: 'middle', align: 'left' });
  hormone(s, 5.4, 3.1, 0.09); hormone(s, 5.6, 3.35, 0.09); hormone(s, 5.4, 3.6, 0.09);
  label(s, 5.25, 3.8, 1.2, 'insulin in blood', { size: 10, color: INS, bold: true, h: 0.4, valign: 'top' });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'A control system (B5.4) using a hormone', [
    'The **change** (rise in glucose) is detected by cells in the **pancreas**.',
    'The pancreas acts as the gland and releases **insulin**; the **effectors** are liver and muscle cells.',
    'As glucose returns to normal, the pancreas **releases less insulin**. The response has cancelled the change: **negative feedback**, as with thyroxine in B5.3.',
    'Hormones act more **slowly** than nerves, so the level takes 1–2 hours to return.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: rate of fall', 'After a meal, blood glucose falls from 8.2 to 5.0 mmol/L in 90 minutes.', [
    ['Fall', '8.2 − 5.0 = 3.2 mmol/L'], ['Rate', '3.2 ÷ 90 = 0.0356 mmol/L per min'], ['Answer', 'about **0.036 mmol/L per minute** (2 s.f.)']], { size: 10.5 });
  D.quickCheck(s, 'In the loop, which part is the **receptor**, which is the **hormone**, and which are the **effectors**? Why is it called **negative** feedback?');
  D.notes(s, 'QUICK CHECK ANSWER: Receptor: cells in the pancreas that detect the glucose level. Hormone: insulin. Effectors: liver and muscle (and other body) cells. Negative because the response (a fall) reverses / opposes the change (a rise), and as the level returns to normal the insulin release is switched off.\nRecap only: negative feedback was taught through thyroxine in B5.3, and control systems (receptor, coordination, effector) in B5.4. Node: 8.2 − 5.0 = 3.2; 3.2/90 = 0.03556.');
  reg(s, 'B5.6.1 Negative feedback (recap and apply)');
}

// ======================= 9 GLUCAGON (HT) =======================
reg(D.contentSlide({
  title: 'Glucagon and insulin work together',
  subtitle: `Specification ${sp('B5.6.2')} • explain how glucagon and insulin work together to control blood sugar levels`,
  tag: 'B5.6.2', ht: true, caption: 'two hormones from the pancreas with opposite effects on the liver',
  draw: (s) => {
    // centre: normal band; top branch high -> insulin; bottom branch low -> glucagon
    const lx = 0.7;
    pbox(s, lx, 1.5, 2.0, 0.6, 'Blood glucose **too high**', 'FBE3E4', HI, { size: 11 });
    pbox(s, lx, 4.85, 2.0, 0.6, 'Blood glucose **too low**', 'E3F0FB', GLU, { size: 11 });
    pbox(s, lx, 3.18, 2.0, 0.6, '**Normal** 4–7 mmol/L', 'D8F0E2', C.green, { size: 11 });
    arrow(s, lx + 1.0, 2.12, lx + 1.0, 3.16, HI, 2, { dash: 'dash' });
    arrow(s, lx + 1.0, 4.83, lx + 1.0, 3.8, GLU, 2, { dash: 'dash' });
    label(s, lx + 1.05, 2.4, 1.0, 'falls', { size: 10, bold: true, color: HI, align: 'left', h: 0.25 });
    label(s, lx + 1.05, 4.25, 1.0, 'rises', { size: 10, bold: true, color: GLU, align: 'left', h: 0.25 });
    // pancreas
    pancreas(s, 2.95, 3.12, 1.25, 0.6);
    label(s, 2.8, 3.73, 1.6, '**pancreas**', { size: 10.5, color: PAN[1], h: 0.25 });
    arrow(s, 2.72, 1.8, 3.3, 3.08, C.ink, 1.25);
    arrow(s, 2.72, 5.15, 3.3, 3.78, C.ink, 1.25);
    // insulin path (top)
    hormone(s, 4.3, 2.45, 0.1, INS);
    arrow(s, 3.95, 3.05, 4.85, 2.3, INS, 2.25);
    label(s, 3.0, 2.3, 1.0, '**insulin**', { size: 11, color: INS, h: 0.28, align: 'right' });
    // glucagon path (bottom)
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 4.2, y: 4.5, w: 0.2, h: 0.18, fill: { color: GCG }, line: { color: '5E2D73', width: 0.75 } });
    arrow(s, 3.95, 3.8, 4.85, 4.6, GCG, 2.25);
    label(s, 2.9, 4.45, 1.1, '**glucagon**', { size: 11, color: GCG, h: 0.28, align: 'right' });
    // liver with glycogen <-> glucose
    liver(s, 4.75, 2.85, 1.65, 1.3);
    label(s, 4.85, 3.15, 1.0, 'liver', { size: 11, bold: true, color: C.white, h: 0.3 });
    glycogen(s, 5.3, 3.6, 0.75);
    line(s, 5.6, 2.3, 5.62, 2.9, LIV[1], 1.25, { dash: 'dash' }); line(s, 5.45, 4.6, 5.36, 4.12, LIV[1], 1.25, { dash: 'dash' });
    box(s, 4.65, 1.45, 1.8, 0.85, C.white, INS, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.7, 1.47, 1.7, '**Liver**: glucose → **glycogen** (stored)', { size: 10, h: 0.8, color: C.text });
    box(s, 4.65, 4.6, 1.8, 0.85, C.white, GCG, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.7, 4.62, 1.7, '**Liver**: **glycogen** → glucose (released into blood)', { size: 10, h: 0.8, color: C.text });
  },
  head: 'Two antagonistic hormones',
  lines: [
    'Glucose **too high** → pancreas releases **insulin** → liver (and muscle) cells take up glucose and convert it to **glycogen** → level **falls**.',
    'Glucose **too low** (e.g. between meals, exercise) → pancreas releases **glucagon** → liver converts **glycogen back to glucose** and releases it → level **rises**.',
    'Insulin and glucagon have **opposite** effects: they are **antagonistic**, like the effectors in B5.4. Together they correct a change in **either** direction.',
    'Both are controlled by **negative feedback**.',
    'Glucagon acts mainly on the **liver**; insulin acts on liver, muscle and other body cells.',
  ],
  size: 12.5,
  qc: 'Do not mix them up: **glucagon** is a hormone; **glycogen** is a stored carbohydrate. Which one is released when you have not eaten for 6 hours?',
  notes: 'QUICK CHECK ANSWER: Glucagon (the hormone) is released by the pancreas when blood glucose falls, e.g. after 6 hours without food; it makes the liver break glycogen down to glucose and release it.\nHT: B5.6.2 "explain how glucagon and insulin work together to control blood sugar levels in the body" (search extract wording). HT status: docbrown combined B5 page "(HT only) glucagon"; Oak OCR Combined Higher only. Exam tip: spell glucagon and glycogen correctly; examiners do not credit "glucogen".\nMuscle glycogen is used by the muscle itself; glucagon acts mainly on the liver. Alpha and beta cells of the islets are stretch names only.',
}), 'B5.6.2 Glucagon and insulin (HT)');

// ======================= 10 HORMONE GRAPHS (HT) =======================
{
  const s = D.contentHeader('Reading hormone graphs', `Specification ${sp('B5.6.2')} • blood glucose, insulin and glucagon after a meal`, { ht: true, tag: 'B5.6.2' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'model curves plotted to scale; meal eaten at 0 min');
  const g1 = { x: 1.45, y: 1.5, w: 5.3, h: 1.6, xmin: 0, xmax: 240, ymin: 3, ymax: 9, xstep: 30, ystep: 2, minor: 1, ylabel: 'Glucose / mmol/L' };
  const g2 = { x: 1.45, y: 3.55, w: 5.3, h: 1.85, xmin: 0, xmax: 240, ymin: 0, ymax: 10, xstep: 30, ystep: 2, minor: 1, xlabel: 'Time after meal / min', ylabel: 'Hormone / arbitrary units' };
  D.axes(s, g1); D.axes(s, g2);
  D.fnLine(s, g1, G10, 0, 240, 120, HI, 2.25);
  D.fnLine(s, g2, I10, 0, 240, 120, INS, 2.25);
  D.fnLine(s, g2, Gn10, 0, 240, 120, GCG, 2.25);
  line(s, D.px(g2, tImax), g2.y, D.px(g2, tImax), g2.y + g2.h, C.grey, 1, { dash: 'dash' });
  label(s, D.px(g1, 75), D.py(g1, 8.6), 1.6, 'blood glucose', { size: 10, bold: true, color: HI, align: 'left', h: 0.22 });
  label(s, D.px(g2, 95), D.py(g2, 8.4), 1.0, 'insulin', { size: 10, bold: true, color: INS, align: 'left', h: 0.22 });
  label(s, D.px(g2, 185), D.py(g2, 5.1), 1.0, 'glucagon', { size: 10, bold: true, color: GCG, align: 'left', h: 0.22 });
  D.card(s, 7.3, 1.3, 5.58, 2.55, 'What the graphs show', [
    `Glucose peaks about **${tGmax} min** after the meal; insulin peaks **later**, at **${tImax} min**.`,
    'While insulin is high, glucagon is **low**: the liver stores glucose as glycogen.',
    `By about 180 min glucose dips a little below 5 (to ${fmt(sf(G10(180), 2))}); glucagon **rises** and the liver releases glucose.`,
    'The two hormone curves are roughly **mirror images**: as one rises, the other falls.',
  ], { size: 12 });
  D.workedSteps(s, 7.3, 4.0, 5.58, 2.25, 'Worked example: explain the delay', 'Why does insulin peak after glucose?', [
    ['Detect', 'the pancreas responds only once the glucose level has risen'],
    ['Travel', 'insulin is carried in the blood; cells then take up glucose'],
    ['Answer', `so insulin rises **after** glucose and stays high until glucose falls (peak ×${fmt(I10(45) / I10(0))} the resting level)`]], { size: 10.5 });
  D.quickCheck(s, 'From the graphs: at what time is glucagon **lowest**? Explain why glucagon is low while insulin is high.');
  D.notes(s, `QUICK CHECK ANSWER: About ${tGnmin} min (node: minimum at ${tGnmin} min; accept 25–45 min). Blood glucose is high, so no glucose needs to be released from the liver; the pancreas releases insulin (to lower glucose) and very little glucagon, because the two hormones have opposite effects.\nModel (node, illustrative shapes, not real patient data): f(t,p) = (t/p)e^(1−t/p); glucose = 5 + 3f(t,30) − 0.7f(t,170); insulin = 1 + 8f(t,45); glucagon = 2.5 − 1.6f(t,45) + 1.6f(t,185). Glucose peak ${fmt(sf(G10(tGmax), 3))} mmol/L at ${tGmax} min; insulin peak 9 au at 45 min; glucose at 180 min ${fmt(sf(G10(180), 3))}.`);
  reg(s, 'B5.6.2 Hormone graphs (HT)');
}

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B5.6.1')}, ${sp('B5.6.2')} • feedback; glucagon and insulin`, [
  { q: 'Blood glucose rises after a meal and then returns to normal. Explain why this is an example of **negative feedback**.', marks: 2, ms: 'The rise is detected and causes insulin release (1); the response (glucose uptake) reverses the change / brings the level back to normal, then insulin release falls (1).' },
  { q: 'After a meal, glucose falls from **7.6** to **5.2 mmol/L** in 80 minutes. Calculate the fall.', marks: 2, ms: '7.6 − 5.2 (1); = 2.4 mmol/L (1).' },
  { q: 'Describe what **glucagon** does when blood glucose is too low.', marks: 2, ht: true, ms: 'Glucagon released by the pancreas (1); liver converts glycogen to glucose and releases it into the blood (1).' },
  { q: 'Explain why insulin and glucagon are described as **antagonistic**.', marks: 2, ht: true, ms: 'They have opposite effects on blood glucose (1); insulin lowers it, glucagon raises it / they correct changes in either direction (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 TYPE 1 =======================
reg(D.contentSlide({
  title: 'Type 1 diabetes',
  subtitle: `Specification ${sp('B5.6.3')} • the pancreas makes little or no insulin`,
  tag: 'B5.6.3', caption: 'the cause (left) and the treatment (right); not to scale',
  draw: (s) => {
    label(s, 0.65, 1.42, 2.9, 'Cause: insulin-making cells destroyed', { size: 11, bold: true, color: C.ink, align: 'left', h: 0.3 });
    // islet with beta cells, some destroyed
    oval(s, 2.0, 3.0, 2.5, 2.1, 'F5E6B0', PAN[1], { lw: 1.5 });
    label(s, 0.75, 4.1, 2.5, 'islet in the pancreas', { size: 10, italic: true, color: PAN[1], h: 0.24 });
    const cells = [[1.4, 2.4], [2.0, 2.3], [2.6, 2.45], [1.25, 3.0], [1.85, 3.0], [2.45, 3.05], [2.95, 3.1], [1.55, 3.6], [2.2, 3.6], [2.75, 3.6]];
    cells.forEach(([x, y], i) => {
      const dead = [1, 3, 4, 6, 8, 9].includes(i);
      ball(s, x, y, 0.22, dead ? 'E6E6E6' : 'F3D3A0', dead ? '9AA3B0' : PAN[1], 1);
      if (dead) { line(s, x - 0.13, y - 0.13, x + 0.13, y + 0.13, HI, 2); line(s, x - 0.13, y + 0.13, x + 0.13, y - 0.13, HI, 2); }
      else ball(s, x, y, 0.07, '8A6A0A', '8A6A0A');
    });
    // immune cells
    [[0.95, 2.25], [3.15, 2.55], [2.35, 4.0]].forEach(([x, y]) => { ball(s, x, y, 0.17, 'E8E2F4', '6A4C93', 1.25); ball(s, x + 0.03, y, 0.08, 'B9A6D8', '6A4C93'); });
    label(s, 0.6, 4.45, 3.0, '**white blood cells** (immune system) attack the cells that make insulin', { size: 10, color: '6A4C93', align: 'left', h: 0.6, valign: 'top' });
    line(s, 3.65, 1.5, 3.65, 5.8, C.line, 1, { dash: 'dash' });
    label(s, 3.8, 1.42, 2.6, 'Treatment', { size: 11, bold: true, color: C.ink, align: 'left', h: 0.3 });
    meter(s, 3.95, 1.9, '9.8');
    label(s, 4.8, 1.95, 1.6, '**test** blood glucose (finger prick)', { size: 10, align: 'left', h: 0.6, valign: 'top' });
    insulinPen(s, 4.1, 3.75, 1.6);
    label(s, 3.85, 4.05, 2.6, '**inject insulin** (pen or pump) several times a day', { size: 10, align: 'left', h: 0.5, valign: 'top' });
    label(s, 3.85, 4.6, 2.6, 'match food (carbohydrate) and exercise to the insulin dose', { size: 10, align: 'left', h: 0.6, valign: 'top' });
  },
  head: 'Type 1: no insulin',
  lines: [
    '**Cause**: the pancreas makes **little or no insulin**. The immune system destroys the insulin-making cells. It usually starts in **childhood** or the teenage years; genes play a part. It is **not** caused by lifestyle.',
    '**Symptoms**: blood glucose stays **high**; thirst, passing a lot of urine, **glucose in the urine**, tiredness, weight loss.',
    '**Treatment**: **insulin injections** for life, regular blood glucose **tests**, and a controlled diet and exercise.',
    'Insulin cannot be swallowed as a tablet: it is a **protein**, so it would be **digested**.',
  ],
  size: 11.5,
  qc: 'Explain why a person with type 1 diabetes must **inject** insulin rather than take it as a tablet.',
  notes: 'QUICK CHECK ANSWER: Their pancreas cannot make enough insulin, so it must be replaced. Insulin is a protein: in a tablet it would be broken down by protease enzymes in the gut (digested) before it reached the blood, so it is injected into the fat under the skin.\nB5.6.3 "compare type 1 and type 2 diabetes and explain how they can be treated" (search extract). Type 1 is an autoimmune condition; the exact trigger is not known (genes plus an environmental trigger). Pancreas transplants and islet cell transplants exist for a few patients (stretch only; not in the statements found).\nThe meter reading 9.8 mmol/L is above the normal range (illustrative).',
}), 'B5.6.3 Type 1 diabetes');

// ======================= 13 TYPE 2 =======================
reg(D.contentSlide({
  title: 'Type 2 diabetes',
  subtitle: `Specification ${sp('B5.6.3')} • body cells no longer respond properly to insulin`,
  tag: 'B5.6.3', caption: 'insulin binding to receptors on a body cell; not to scale',
  draw: (s) => {
    const cellAt = (x, title, ok) => {
      label(s, x, 1.42, 2.75, title, { size: 11, bold: true, color: ok ? C.green : HI, h: 0.3 });
      box(s, x, 1.85, 2.75, 1.3, 'E3F0FB', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      label(s, x + 0.05, 1.87, 1.0, 'blood', { size: 10, italic: true, color: GLY, align: 'left', h: 0.22 });
      box(s, x, 3.15, 2.75, 1.75, 'FBF3DF', '8A6D3B', { lw: 1.5 });
      label(s, x + 0.05, 4.6, 1.2, 'body cell', { size: 10, italic: true, color: '8A6D3B', align: 'left', h: 0.24 });
      [0.55, 1.4, 2.25].forEach((dx, i) => {
        receptor(s, x + dx, 3.0, 0.3, C.green, true);
      });
      if (ok) {
        [0.9, 1.8].forEach(dx => arrow(s, x + dx, 2.4, x + dx, 3.55, GLY, 1.75));
        [[0.4, 3.5], [1.1, 3.95], [1.6, 3.6], [2.1, 4.1], [2.45, 3.6], [0.7, 4.3]].forEach(([dx, y]) => glucose(s, x + dx, y));
        [[0.5, 2.15], [2.3, 2.3]].forEach(([dx, y]) => glucose(s, x + dx, y));
      } else {
        [[0.3, 2.15], [0.7, 2.6], [1.0, 2.2], [1.25, 2.55], [1.6, 2.2], [1.9, 2.6], [2.2, 2.15], [2.55, 2.5], [0.55, 2.35], [2.0, 2.35]].forEach(([dx, y]) => glucose(s, x + dx, y));
        [[0.8, 3.8], [2.0, 4.2]].forEach(([dx, y]) => glucose(s, x + dx, y));
        label(s, x + 0.1, 3.85, 2.55, 'insulin binds, but the cell does not respond: little glucose enters', { size: 10, color: HI, h: 0.5, valign: 'top', bold: true });
      }
    };
    cellAt(0.65, 'Normal: cell responds', true);
    cellAt(3.6, 'Type 2: insulin resistance', false);
    box(s, 0.65, 5.0, 5.7, 0.75, C.white, C.orange, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    hormone(s, 0.9, 5.2, 0.08); label(s, 1.05, 5.08, 1.0, 'insulin', { size: 10, align: 'left', h: 0.24 });
    glucose(s, 0.9, 5.52, 0.06); label(s, 1.05, 5.4, 1.0, 'glucose', { size: 10, align: 'left', h: 0.24 });
    receptor(s, 2.25, 5.25, 0.3); label(s, 2.5, 5.2, 1.3, 'insulin receptor', { size: 10, align: 'left', h: 0.24 });
    label(s, 3.95, 5.05, 2.35, 'In type 2 the pancreas often still makes insulin', { size: 10, italic: true, color: C.orange, h: 0.65, align: 'left', valign: 'middle' });
  },
  head: 'Type 2: cells stop responding',
  lines: [
    '**Cause**: body cells become **resistant** to insulin (they no longer respond to it), and the pancreas may make **less** insulin over time. Blood glucose stays **high**.',
    '**Risk factors**: **obesity** (especially fat around the waist), **lack of exercise**, poor diet, **older age**, family history (genes).',
    '**Treatment**: first a **diet** low in sugar and refined carbohydrate, **regular exercise** and **weight loss**; then **medicines** (tablets) that lower glucose; insulin injections in some cases.',
  ],
  size: 11,
  worked: { head: 'Worked example: BMI, a risk factor', q: 'BMI = mass in kg ÷ (height in m)². An adult is 95 kg and 1.75 m tall. BMI 30 or more = obese.',
    steps: [['Square', '1.75² = 3.0625'], ['Divide', '95 ÷ 3.0625 = 31.02…'], ['Answer', `BMI = ${sf(bmiA, 3).toFixed(1)}: obese, higher risk of type 2`]], size: 10.5 },
  workedH: 1.75,
  qc: 'Calculate the BMI of a **68 kg** adult who is **1.70 m** tall (3 s.f.). Give **two** changes that lower the risk of type 2 diabetes.',
  notes: `QUICK CHECK ANSWER: 1.70² = 2.89; 68 ÷ 2.89 = ${fmt(sf(bmiQ, 3))} (healthy range 18.5–24.9). Any two: lose weight / eat less sugar and fat / eat more fibre and fewer refined carbohydrates / exercise regularly.\nB5.6.3 (search extract). Type 2 is the most common type (about 90% of UK cases). It is linked to lifestyle but is not only caused by it: genes, ethnicity and age also matter. Medicines are named generally (e.g. metformin is a stretch name only). Node: 95/1.75² = ${bmiA.toFixed(3)}; 68/1.70² = ${bmiQ.toFixed(3)}. BMI and lifestyle risk factors may also appear in Chapter B2; used here only as a type 2 risk factor.`,
}), 'B5.6.3 Type 2 diabetes');

// ======================= 14 COMPARING =======================
{
  const s = D.contentHeader('Comparing type 1 and type 2 diabetes', `Specification ${sp('B5.6.3')} • compare type 1 and type 2 diabetes and explain how they can be treated`, { tag: 'B5.6.3' });
  const rows = [[HDR(''), HDR('Type 1'), HDR('Type 2')],
    ...[
      ['Cause', 'Pancreas makes little or **no insulin** (cells destroyed by the immune system)', 'Body cells **stop responding** to insulin (resistance); less insulin later'],
      ['Usual onset', 'Childhood or teenage years; sudden', 'Usually adults over 40 (now younger); slow'],
      ['Main risk', 'Genes and an unknown trigger; **not** lifestyle', '**Obesity**, inactivity, poor diet, age, genes'],
      ['Treatment', '**Insulin injections** for life; test glucose; plan food and exercise', '**Diet**, **exercise**, weight loss; then tablets; sometimes insulin'],
      ['Same in both', 'Blood glucose too **high**; thirst, lots of urine, tiredness; long-term damage to eyes, kidneys, nerves, heart', ''],
    ].map(([a, b, c], i) => i === 4
      ? [tcell(a, i, { bold: true }), { text: D.rich(b, { fontSize: 10.5, color: C.text }), options: { colspan: 2, fill: { color: i % 2 ? C.white : C.cardBlue } } }]
      : [tcell(a, i, { bold: true }), { text: D.rich(b, { fontSize: 10.5, color: C.text }), options: { fill: { color: i % 2 ? C.white : C.cardBlue } } }, { text: D.rich(c, { fontSize: 10.5, color: C.text }), options: { fill: { color: i % 2 ? C.white : C.cardBlue } } }])];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 7.6, colW: [1.3, 3.15, 3.15], rowH: [0.32, 0.72, 0.5, 0.55, 0.72, 0.72], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  // bar chart
  D.panel(s, 8.3, 1.3, 4.58, 3.75, 'UK diagnosed cases, approximate %');
  const g = { x: 9.25, y: 1.55, w: 3.4, h: 2.55, xmin: 0, xmax: 3, ymin: 0, ymax: 100, xstep: 1, ystep: 20, ylabel: '% of cases' };
  box(s, g.x, g.y, g.w, g.h, C.white, null);
  for (let v = 0; v <= 100; v += 10) line(s, g.x, D.py(g, v), g.x + g.w, D.py(g, v), v % 20 ? 'E3EFED' : 'C5DCD9', 0.5);
  line(s, g.x, g.y + g.h, g.x + g.w, g.y + g.h, C.ink, 1.5); line(s, g.x, g.y, g.x, g.y + g.h, C.ink, 1.5);
  for (let v = 0; v <= 100; v += 20) label(s, g.x - 0.48, D.py(g, v) - 0.1, 0.4, String(v), { size: 10, h: 0.2, align: 'right' });
  label(s, g.x - 0.62 - g.h / 2, g.y + g.h / 2 - 0.14, g.h, '% of cases', { size: 10.5, bold: true, rotate: 270 });
  UK.forEach(([n, v], i) => {
    const bx = D.px(g, i + 0.2), bw = D.px(g, i + 0.8) - bx;
    box(s, bx, D.py(g, v), bw, D.py(g, 0) - D.py(g, v), [HI, GLU, '9AA3B0'][i], null);
    label(s, bx - 0.1, D.py(g, v) - 0.24, bw + 0.2, `${v}%`, { size: 10, bold: true, h: 0.22 });
    label(s, bx - 0.15, g.y + g.h + 0.05, bw + 0.3, n, { size: 10, h: 0.22 });
  });
  D.workedSteps(s, 8.3, 5.17, 4.58, 1.08, 'Worked example', '', [
    ['Type 2', `90% of ${ukTot} million = ${fmt(ukTot * 0.9)} million people`]], { size: 10.5 });
  label(s, 0.45, 4.9, 7.6, 'Both types: untreated high glucose → glucose in urine; long-term damage to blood vessels (eyes, kidneys, feet, heart).', { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.45, valign: 'top' });
  D.card(s, 0.45, 5.4, 7.6, 0.85, null, [
    'Exam tip: "compare" means give a **similarity** and a **difference**, with both types in each point, e.g. "type 1 is treated with insulin, **whereas** type 2 is first treated with diet and exercise".',
  ], { size: 10.5 });
  D.quickCheck(s, 'Give **one similarity** and **two differences** between type 1 and type 2 diabetes. About how many times more common is type 2?');
  D.notes(s, `QUICK CHECK ANSWER: Similarity: in both, blood glucose is too high / both can be helped by diet and exercise / both may use insulin. Differences: type 1 = no insulin made, type 2 = cells resistant; type 1 usually starts in childhood, type 2 usually in adults; type 1 always treated with insulin, type 2 first with diet and exercise; type 2 linked to obesity. 90 ÷ 8 ≈ 11 times.\nUK figures: Diabetes UK reports about 4.4 million people diagnosed (2023), about 90% type 2 and about 8% type 1 (UNVERIFIED to the percent; rounded for teaching). Node: 4.4 × 0.9 = 3.96; 4.4 × 0.08 = 0.352; 90/8 = 11.25.`);
  reg(s, 'B5.6.3 Comparing type 1 and type 2');
}

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B5.6.3')} • type 1 and type 2 diabetes`, [
  { q: 'Describe the **cause** of type 1 diabetes.', marks: 2, ms: 'Pancreas produces little / no insulin (1); because the insulin-producing cells are destroyed (by the immune system) (1).' },
  { q: 'Give **two** risk factors for type 2 diabetes.', marks: 2, ms: 'Any two (1 each): obesity / high BMI; lack of exercise; diet high in sugar / refined carbohydrate / fat; older age; family history / genes.' },
  { q: 'A clinic has **500** patients with diabetes. About **90%** have type 2. How many is this?', marks: 2, ms: '500 × 0.9 / 500 × 90 ÷ 100 (1); = 450 (1).' },
  { q: '**Compare** the treatment of type 1 and type 2 diabetes.', marks: 2, ms: 'Type 1: insulin injections (always / for life) (1); type 2: diet / exercise / weight loss first, then tablets (insulin only sometimes) (1). Both types needed for the marks.' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 GLUCOSE TOLERANCE TEST =======================
{
  const s = D.contentHeader('Data: the glucose tolerance test', `Specification ${sp('B5.6.3')} • interpreting data about diabetes`, { tag: 'B5.6.3' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'plotted to scale from the table; 75 g glucose drink at 0 min after fasting');
  const g = { x: 1.5, y: 1.55, w: 5.2, h: 3.6, xmin: 0, xmax: 180, ymin: 0, ymax: 16, xstep: 30, ystep: 2, minor: 2, xlabel: 'Time after glucose drink / min', ylabel: 'Blood glucose / mmol/L' };
  D.axes(s, g);
  line(s, g.x, D.py(g, 11.1), g.x + g.w, D.py(g, 11.1), C.orange, 1.25, { dash: 'dash' });
  label(s, D.px(g, 88), D.py(g, 11.1) + 0.03, 1.75, '11.1: diabetes if above at 2 h', { size: 10, bold: true, color: C.orange, align: 'left', h: 0.22 });
  const pN = GT_T.map((t, i) => [t, GT_N[i]]), pD = GT_T.map((t, i) => [t, GT_D[i]]);
  D.plotLine(s, g, pN, GLU, 2.25); D.points(s, g, pN, GLY);
  D.plotLine(s, g, pD, HI, 2.25); D.points(s, g, pD, '8E2A33');
  label(s, D.px(g, 66), D.py(g, 16.0), 1.6, 'person B', { size: 10.5, bold: true, color: HI, align: 'left', h: 0.24 });
  label(s, D.px(g, 92), D.py(g, 5.2), 1.6, 'person A', { size: 10.5, bold: true, color: GLU, align: 'left', h: 0.24 });
  const rows = [[HDR('Time / min'), ...GT_T.map(t => HDR(String(t)))],
    [tcell('A / mmol/L', 0, { bold: true, color: GLU, align: 'left' }), ...GT_N.map(v => tcell(v.toFixed(1), 0))],
    [tcell('B / mmol/L', 1, { bold: true, color: HI, align: 'left' }), ...GT_D.map(v => tcell(v.toFixed(1), 1))]];
  s.addTable(rows, { x: 7.3, y: 1.3, w: 5.58, colW: [1.17, ...Array(7).fill(4.41 / 7)], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 7.3, 2.35, 5.58, 1.75, 'How to read it', [
    'Fasting level: A **4.8** (normal); B **8.0** (high).',
    'A rises a little and is back to normal by **120 min**: insulin works.',
    'B rises much higher and is still **13.0** at 120 min (over 11.1): **diabetes**.',
    'A fasting level of **7.0** or more also suggests diabetes.',
  ], { size: 11 });
  D.workedSteps(s, 7.3, 4.22, 5.58, 2.03, 'Worked example: percentage rise for B', '', [
    ['Rise', `peak − start = ${Math.max(...GT_D).toFixed(1)} − ${GT_D[0].toFixed(1)} = 7.0 mmol/L`],
    ['Divide', '7.0 ÷ 8.0 × 100'],
    ['Answer', `**87.5%** rise (A: 3.0 ÷ 4.8 × 100 = 62.5%)`]], { size: 10.5 });
  D.quickCheck(s, 'By how much did B\'s glucose fall from 60 to 180 min? Suggest **why** B\'s glucose stays high (two possible reasons).');
  D.notes(s, 'QUICK CHECK ANSWER: 15.0 − 10.0 = 5.0 mmol/L. B makes too little insulin (type 1) OR B\'s cells do not respond to insulin (type 2), so glucose is not taken up into cells / stored as glycogen quickly.\nThe oral glucose tolerance test: fast overnight, drink 75 g glucose, measure blood glucose for 2 hours. WHO criteria (asserted in node): fasting ≥ 7.0 mmol/L or 2-hour ≥ 11.1 mmol/L = diabetes; 2-hour < 7.8 = normal. Data are illustrative. Plotted points are joined with straight lines, as is usual for measured data. Node: rises 3.0 and 7.0; 62.5% and 87.5%; 2 h difference 8.0.');
  reg(s, 'B5.6.3 Data: glucose tolerance test');
}

// ======================= 17 ACTIVITY: METHOD =======================
reg(D.contentSlide({
  title: 'Testing for glucose: method',
  subtitle: `Specification ${sp('B5.6.3')} • why doctors used to test urine for glucose (simulated samples)`,
  tag: 'Activity', pag: 'SUGGESTED ACTIVITY', caption: 'apparatus: water bath at 80 °C, test tubes, Benedict\'s reagent, stop clock',
  draw: (s) => {
    // water bath
    box(s, 0.8, 2.9, 3.4, 2.0, 'E6EBF2', '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
    box(s, 0.95, 3.35, 3.1, 1.4, C.water, null);
    line(s, 0.95, 3.35, 4.05, 3.35, C.waterDark, 1.25);
    label(s, 0.95, 4.92, 3.1, 'water bath at **80 °C**', { size: 10.5, h: 0.26 });
    box(s, 3.5, 3.0, 0.6, 0.28, '263040', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 3.5, 3.0, 0.6, '80 °C', { size: 10, bold: true, color: '7FE08A', h: 0.28 });
    const cols = [BEN[0], BEN[1], BEN[2], BEN[3], BEN[4]];
    cols.forEach((c, i) => testTube(s, 1.25 + i * 0.5, 2.1, 2.35, c, 0.4));
    ['0', '0.5', '1', '2', '4'].forEach((t, i) => label(s, 1.0 + i * 0.5, 1.75, 0.5, t, { size: 10, bold: true, h: 0.24 }));
    label(s, 0.7, 1.42, 3.6, 'glucose standards / g per 100 cm³', { size: 10, color: C.grey, h: 0.26 });
    // colour scale
    label(s, 4.45, 1.42, 1.9, 'Colour sequence', { size: 10.5, bold: true, h: 0.26 });
    ['blue', 'green', 'yellow', 'orange', 'brick red'].forEach((t, i) => {
      box(s, 4.55, 1.8 + i * 0.42, 0.35, 0.32, BEN[i], null, { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
      label(s, 4.98, 1.8 + i * 0.42, 1.3, t, { size: 10, align: 'left', h: 0.32 });
    });
    label(s, 4.45, 3.95, 1.9, 'more glucose →', { size: 10, italic: true, color: C.grey, h: 0.26 });
    // stop clock
    ball(s, 5.35, 4.65, 0.35, C.white, C.ink, 1.5);
    line(s, 5.35, 4.65, 5.35, 4.4, C.ink, 1.5); line(s, 5.35, 4.65, 5.52, 4.72, C.ink, 1.5);
    box(s, 5.29, 4.22, 0.12, 0.08, C.ink, null);
    label(s, 4.75, 5.05, 1.2, 'stop clock', { size: 10, h: 0.24 });
    label(s, 0.7, 5.3, 5.6, 'the tubes show the colours after 5 min (left to right: 0 to 4 g per 100 cm³)', { size: 10, italic: true, color: C.grey, h: 0.24 });
  },
  head: 'Method',
  lines: [
    'Make glucose **standards** (0.25, 0.5, 1, 2, 4 g per 100 cm³) by diluting a stock solution.',
    'Put **2 cm³** of each into a test tube with **2 cm³** of **Benedict\'s** reagent.',
    'Place in the water bath at **80 °C** and start the clock. Record the time for the first **green** colour.',
    'Repeat **3 times** for each standard, then test the unknown samples **X**, **Y** and **Z** in the same way.',
    '**IV**: glucose concentration. **DV**: time to turn green. **Control**: volumes, temperature, end-point colour.',
    '**Safety**: eye protection; Benedict\'s is an irritant; hot water: use a test-tube holder.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: making a standard', q: 'Make 20 cm³ of 0.5 g/100 cm³ glucose from a 2 g/100 cm³ stock.',
    steps: [['Fraction', '0.5 ÷ 2 = ¼ of the volume is stock'], ['Volumes', '¼ × 20 = 5 cm³ stock + 15 cm³ water'], ['Answer', '**5 cm³** stock and **15 cm³** distilled water']], size: 10.5 },
  workedH: 1.6,
  qc: 'Why must every tube use the **same volume** of Benedict\'s and the **same** water bath temperature? What is the **control** tube (0 g) for?',
  notes: 'QUICK CHECK ANSWER: So that only the glucose concentration affects the time (fair test; they are control variables). The 0 g tube shows the colour with no glucose: it stays blue, showing that any change in the other tubes is caused by glucose.\nSuggested activity, not a PAG code (no PAG link to B5.6 was found). Context: before blood glucose meters, glucose in the urine was a sign of diabetes (glucose spills into the urine when blood glucose is very high). Use simulated urine (dilute glucose solution with a drop of yellow food colouring); never real body fluids. Benedict\'s test was met as a food test (B3 or KS3); the timed version gives quantitative data for a calibration graph. Node: 0.5 × 20 / 2 = 5 cm³; 20 − 5 = 15 cm³.',
}), 'Activity: testing for glucose (method)');

// ======================= 18 ACTIVITY: RESULTS =======================
{
  const s = D.contentHeader('Testing for glucose: results', `Specification ${sp('B5.6.3')} • use a calibration graph to find an unknown concentration`, { pag: 'SUGGESTED ACTIVITY', tag: 'Activity' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'calibration curve plotted to scale from the mean times');
  const g = { x: 1.5, y: 1.55, w: 5.2, h: 3.6, xmin: 0, xmax: 4.5, ymin: 0, ymax: 350, xstep: 0.5, ystep: 50, minor: 1, xlabel: 'Glucose concentration / g per 100 cm³', ylabel: 'Time to turn green / s', fmt: v => String(+v.toFixed(2)) };
  D.axes(s, g);
  D.fnLine(s, g, model, 0.22, 4.5, 80, C.blue, 2);
  D.points(s, g, STD.map((c, i) => [c, STDm[i]]), C.ink);
  // read-off for Y
  line(s, g.x, D.py(g, tY), D.px(g, cY), D.py(g, tY), C.red, 1.5, { dash: 'dash' });
  arrow(s, D.px(g, cY), D.py(g, tY), D.px(g, cY), g.y + g.h, C.red, 1.5, { dash: 'dash' });
  label(s, D.px(g, cY) + 0.05, D.py(g, tY) - 0.3, 2.3, `Y: ${tY} s → about ${fmt(sf(cY, 2))} g`, { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.26 });
  const rows = [[HDR('Glucose / g per 100 cm³'), HDR('Time 1 / s'), HDR('Time 2 / s'), HDR('Time 3 / s'), HDR('Mean / s')],
    ...STD.map((c, i) => [tcell(fmt(c), i), ...REP[i].map(v => tcell(String(v), i)), tcell(String(STDm[i]), i, { bold: true })])];
  s.addTable(rows, { x: 7.3, y: 1.3, w: 5.58, colW: [1.78, 0.95, 0.95, 0.95, 0.95], rowH: 0.29, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 7.3, 3.08, 5.58, `Unknowns: X stayed **blue** after 5 min; Y took **${tY} s**; Z took **45 s**.`, { size: 10.5, align: 'left', h: 0.28 });
  D.workedSteps(s, 7.3, 3.45, 5.58, 1.45, 'Worked example: mean for 0.25 g', '', [
    ['Add', '296 + 305 + 299 = 900'], ['Answer', '900 ÷ 3 = **300 s** (range 305 − 296 = 9 s)']], { size: 10.5 });
  D.card(s, 7.3, 5.0, 5.58, 1.25, 'Sources of error and improvements', [
    'Judging "first green" by eye is **subjective** → use a colour card, or a **colorimeter**.',
    'Tubes heat at different rates → pre-warm tubes; same tube size.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Which unknown sample is most likely from a person with **untreated diabetes**? Explain using the graph. Why could Z not be read accurately?');
  D.notes(s, `QUICK CHECK ANSWER: Z: it turned green fastest (45 s), so it has the most glucose (about 4 g per 100 cm³ or more; it is at / beyond the end of the curve). Glucose in urine shows blood glucose was very high. Z cannot be read accurately because 45 s is outside / at the edge of the range of the standards (extrapolation). X has no detectable glucose (normal).\nData illustrative; model t = 120 c^(−0.66) used to set the means (node checks each mean is within 3 s of the model). Y: (120/95)^(1/0.66) = ${cY.toFixed(3)} → about 1.4 g per 100 cm³ (read from the graph). Means 300, 190, 120, 75, 48 s (node).`);
  reg(s, 'Activity: testing for glucose (results)');
}

// ======================= 19 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B5.6.3')} • diabetes data and the glucose activity`, [
  { q: 'In a glucose tolerance test, person C\'s glucose rose from **4.5** to **9.0 mmol/L**. Calculate the percentage increase.', marks: 2, ms: '(9.0 − 4.5) ÷ 4.5 × 100 (1); = 100% (1).' },
  { q: 'Person D\'s glucose was **12.4 mmol/L** two hours after the glucose drink. What does this suggest? Explain.', marks: 2, ms: 'Diabetes (1); glucose not brought back to normal / above 11.1 so insulin missing or cells not responding (1).' },
  { q: 'In the Benedict\'s activity, name the **independent** and **dependent** variables.', marks: 2, ms: 'IV: glucose concentration (1); DV: time taken to turn green / colour change (1).' },
  { q: 'Explain why a **calibration graph** made from standards is needed to find the glucose concentration of an unknown sample.', marks: 2, ms: 'Standards have known concentrations (1); the unknown\'s time is read off the graph to give its concentration / interpolation (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 20 WHEN CONTROL FAILS =======================
{
  const s = D.contentHeader('When the control system stops working', `Specification ${sp('B5.6.3')} • putting it together: too high and too low`, { tag: 'B5.6.3' });
  D.panel(s, 0.45, 1.3, 12.43, 2.25, 'blood glucose scale drawn to scale, 0–20 mmol/L');
  const g = { x: 1.0, y: 2.0, w: 11.3, xmin: 0, xmax: 20 };
  const X = v => g.x + v / 20 * g.w;
  [[0, 4, '7FB3E8', 'too low (hypoglycaemia): below 4'], [4, 7, '8FD19E', 'normal 4–7'], [7, 11.1, 'F5D58A', 'raised'], [11.1, 20, 'EE8A8F', 'too high (hyperglycaemia)']].forEach(([a, b, col, t]) => {
    box(s, X(a), g.y, X(b) - X(a), 0.55, col, null);
    label(s, X(a), g.y, X(b) - X(a), t, { size: 10.5, bold: true, h: 0.55 });
  });
  line(s, g.x, g.y + 0.55, g.x + g.w, g.y + 0.55, C.ink, 1.5);
  for (let v = 0; v <= 20; v += 2) { line(s, X(v), g.y + 0.55, X(v), g.y + 0.65, C.ink, 1); label(s, X(v) - 0.3, g.y + 0.66, 0.6, String(v), { size: 10, h: 0.2 }); }
  label(s, g.x, g.y + 0.88, g.w, 'Blood glucose / mmol/L', { size: 10.5, bold: true, h: 0.24 });
  label(s, 0.65, 1.45, 12, 'Too much insulin, a missed meal or hard exercise ← → no insulin, insulin resistance, sugary food', { size: 10.5, italic: true, color: C.grey, h: 0.3 });
  D.card(s, 0.45, 3.7, 4.05, 2.55, 'Too low (hypo)', [
    'Cause: **too much insulin**, a missed meal or exercise.',
    'Shaky, sweaty, confused, can faint: **brain** cells lack glucose.',
    'Treat fast: **sugary** drink or glucose tablets.',
  ], { size: 12, fill: 'E3F0FB' });
  D.card(s, 4.64, 3.7, 4.05, 2.55, 'Too high (diabetes)', [
    'Cause: **no insulin** (type 1) or cells **not responding** (type 2).',
    'Thirst, lots of urine, **glucose in urine**, tiredness.',
    'Long term: damage to **blood vessels**, eyes, kidneys, nerves, heart.',
  ], { size: 12, fill: 'FBE3E4' });
  D.card(s, 8.83, 3.7, 4.05, 2.55, 'Why this matters', [
    'A control system works only if **every part** works: gland, hormone, **receptors** on the target cells.',
    'Type 1: the **gland** fails. Type 2: the **target cells** fail.',
    'Treatments **replace** the missing part (insulin) or **reduce the load** (diet, exercise).',
  ], { size: 11.5 });
  D.quickCheck(s, 'A person with type 1 diabetes injects insulin but then misses lunch. Explain what may happen to their blood glucose, and what they should do.');
  D.notes(s, 'QUICK CHECK ANSWER: The insulin makes cells keep taking up glucose but no new glucose arrives from food, so blood glucose falls too low (below 4 mmol/L, a hypo): shaky, confused, may faint. They should eat or drink something sugary (fast-acting glucose), then a carbohydrate snack.\nThe title idea of B5.6 ("what can happen when organs and control systems stop working") is shown with diabetes, which is the only example in the B5.6 statements found. Thresholds: hypo below 4 mmol/L (NHS "4 is the floor"); 11.1 mmol/L is the WHO 2-hour diagnostic value. Kidney failure / dialysis are not in J260 B5.6 and are not taught.');
  reg(s, 'B5.6.3 When control fails (putting it together)');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${DECK.specRange} • putting it together`, [
  { q: 'Explain why a person with type 1 diabetes may become **shaky and confused** if they inject insulin and then exercise hard without eating.', marks: 2, ms: 'Insulin plus exercise / respiration uses glucose, so blood glucose falls too low (1); brain cells do not get enough glucose (for respiration) (1).' },
  { q: 'Give **two** symptoms of high blood glucose.', marks: 2, ms: 'Any two (1 each): thirst; passing a lot of urine; glucose in urine; tiredness; weight loss; blurred vision.' },
  { q: 'Explain how type 2 diabetes is different from type 1 in terms of **where** the control system fails.', marks: 2, ms: 'Type 1: the pancreas / gland does not make (enough) insulin (1); type 2: target cells / receptors do not respond to insulin (1).' },
  { q: 'After a long time without food, explain how the liver keeps blood glucose up.', marks: 2, ht: true, ms: 'Pancreas releases glucagon (1); liver converts glycogen to glucose and releases it into the blood (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Blood glucose', 'Concentration of glucose in the blood; normally about 4–7 mmol/L.'],
  ['Pancreas', 'Gland behind the stomach that releases insulin (and glucagon).'],
  ['Insulin', 'Hormone that makes cells take up glucose, lowering blood glucose.'],
  ['Glucagon (HT)', 'Hormone that makes the liver turn glycogen into glucose, raising blood glucose.'],
  ['Glycogen', 'Insoluble storage carbohydrate made from glucose in liver and muscle cells.'],
  ['Liver', 'Organ that stores glycogen and releases glucose into the blood.'],
  ['Target cells', 'Cells with receptors for a hormone, e.g. liver and muscle cells for insulin.'],
  ['Negative feedback', 'A change causes a response that reverses it (recap of B5.3).'],
  ['Antagonistic (HT)', 'Insulin and glucagon have opposite effects on blood glucose.'],
  ['Type 1 diabetes', 'The pancreas makes little or no insulin; treated with insulin injections.'],
  ['Type 2 diabetes', 'Body cells stop responding to insulin; treated with diet, exercise, tablets.'],
  ['Insulin resistance', 'Cells no longer respond properly to insulin (type 2).'],
  ['Risk factor', 'Something that increases the chance of a disease, e.g. obesity for type 2.'],
  ['BMI', 'Body mass index = mass (kg) ÷ height² (m²); 30 or more = obese.'],
  ['Glucose tolerance test', 'Blood glucose measured for 2 h after a glucose drink.'],
  ['Hypoglycaemia', 'Blood glucose too low (below about 4 mmol/L); treated with sugar.'],
], { notes: 'Use as a cover-and-recall activity. Spelling check: glucagon (hormone) vs glycogen (store). Negative feedback is a recap term from B5.3. Glucagon and "antagonistic" (as applied to insulin and glucagon) are HT.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A doctor carries out a **glucose tolerance test** on a patient. The patient\'s blood glucose rises from **5.2** to **7.6 mmol/L** in 30 minutes, then falls back to normal.', [
  { l: 'a', q: 'Name the **gland** that detects the rise and the **hormone** it releases.', marks: 2, ms: 'Pancreas (1); insulin (1).' },
  { l: 'b', q: 'Calculate the rise in blood glucose.', marks: 1, ms: '7.6 − 5.2 = 2.4 mmol/L (1).' },
  { l: 'c', q: 'Explain how the hormone in (a) returns blood glucose to normal.', marks: 3, ms: 'Insulin carried in the blood to target cells (1); liver / muscle cells take up glucose (1); converted to glycogen and stored (1).', h: 1.2 },
  { l: 'd', q: 'A second patient, **102 kg** and **1.80 m** tall, has type 2 diabetes. Calculate their BMI (3 s.f.).', marks: 2, ms: '102 ÷ 1.8² = 102 ÷ 3.24 (1); = 31.5 (1).' },
  { l: 'e', q: '**Compare** the cause and the treatment of type 1 and type 2 diabetes.', marks: 3, ms: 'Cause: type 1 pancreas makes no / little insulin, type 2 cells do not respond / resistant (1); treatment: type 1 insulin injections (1); type 2 diet / exercise / weight loss / tablets (1).', h: 1.2 },
  { l: 'f', q: 'Explain the role of **glucagon** if the patient\'s blood glucose falls too low.', marks: 2, ht: true, ms: 'Pancreas releases glucagon (1); liver converts glycogen to glucose, released into blood so level rises (1).' },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (f) is HT` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Both: blood glucose too high; symptoms: thirst, lots of urine, glucose in urine, tiredness; long-term damage to eyes, kidneys, nerves, blood vessels.',
    'Type 1 cause: pancreas makes little / no insulin; insulin-producing cells destroyed by the immune system; usually starts in childhood; not caused by lifestyle.',
    'Type 2 cause: body cells become resistant / do not respond to insulin; pancreas may make less insulin later; usually adults.',
    'Type 2 risk factors: obesity / high BMI, lack of exercise, poor diet, age, genes / family history.',
    'Type 1 treatment: insulin injections (pen / pump) for life; regular blood glucose tests; match diet and exercise to the dose; insulin injected because it is a protein that would be digested.',
    'Type 2 treatment: diet low in sugar / refined carbohydrate, exercise, weight loss; then medicines (tablets); insulin in some cases.',
    'Explanation of treatments: insulin replaces the missing hormone so cells take up glucose; diet reduces the glucose entering the blood; exercise uses glucose and improves the response to insulin; weight loss reduces resistance.',
  ], {
    l3: 'Compares BOTH the causes AND the treatments of type 1 and type 2, with comparative statements, AND explains how at least one treatment works.',
    l2: 'Describes the cause and treatment of both types, OR compares one aspect in detail, with some explanation.',
    l1: 'Simple statements about one or both types, e.g. "type 1 needs insulin" or "type 2 is caused by being overweight".',
  });
}
const HW = [
  { n: '1', q: 'Name the **storage carbohydrate** that glucose is converted to in the liver.', marks: 1, ms: 'Glycogen (1). Do not accept glucagon.' },
  { n: '2', q: 'A patient\'s fasting blood glucose was measured on three days: **6.2**, **5.8** and **6.6 mmol/L**. Calculate the mean.', marks: 2, ms: '(6.2 + 5.8 + 6.6) ÷ 3 (1); = 6.2 mmol/L (1).' },
  { n: '3', q: 'About **1 in 16** people in the UK has diabetes. Write this as a percentage.', marks: 2, ms: '1 ÷ 16 × 100 (1); = 6.25% (accept 6.3% or 6%) (1).' },
  { n: '4', q: 'Explain why insulin is given by **injection** and not as a tablet.', marks: 2, ms: 'Insulin is a protein (1); it would be digested / broken down by enzymes in the gut (before reaching the blood) (1).' },
  { n: '5', q: 'Explain what happens to blood glucose between meals, and how the body stops it falling too low.', marks: 2, ht: true, ms: 'Glucose is used in respiration so the level falls (1); pancreas releases glucagon so the liver converts glycogen to glucose (and releases it) (1).', h: 1.15 },
  { n: '6', q: 'Suggest why the number of people with **type 2** diabetes has increased in the UK.', marks: 2, ms: 'More people are obese / overweight / less active / eat more sugar (1); these are risk factors that make cells resistant to insulin (1). Accept: people living longer / ageing population (1).', h: 1.15 },
  { n: '7', q: '**Compare** type 1 and type 2 diabetes. In your answer, describe the causes of each type and explain how each can be treated.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q5 is Higher tier.', HW, 17, { dividerSub: 'B5.6 Diabetes • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
const out = path.join(__dirname, 'OCR21C_B5.6_Diabetes_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
