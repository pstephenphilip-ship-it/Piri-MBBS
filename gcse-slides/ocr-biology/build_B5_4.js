// build_B5_4.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B5 The human body – staying alive, B5.4 Why do we need to maintain a constant internal environment?
// (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B5_4.js
// Structure copied from build_B4_3.js / build_B5_3.js. ocr_bio_template.js is NOT edited by this deck: the body outline
// (from build_B5_3.js), thermometer, Bunsen, tripod, ice, red-blood-cell-in-solution and control-loop helpers are in the
// DECK-SPECIFIC block below.
// Scope (see SPEC_B5_4.md): J260 B5.4 = B5.4.1 "explain the importance of maintaining a constant internal environment in
// response to internal and external change", with the J260 suggested activities (skin vs core temperature; modelling
// control with one effector vs antagonistic effectors). The skin's role in temperature control (sweating, hair erection,
// blood flow), the HT temperature-challenge statement, osmotic change, the kidney and ADH are Biology B (J257) only:
// NOT taught here. Insulin, glucagon and diabetes are J260 B5.6. Negative feedback is a recap of B5.3.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B5', chapterTitle: 'The human body – staying alive', code: 'B5.4', title: 'Why do we need to maintain a constant internal environment?',
  part: 4, parts: 6, specRange: 'B5.4.1',
  subtitle: 'Why do we need to maintain a constant internal environment?',
  keywords: ['Homeostasis', 'Internal environment', 'Receptor', 'Effector', 'Negative feedback', 'Antagonistic effectors'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));

// ======================= CALCULATIONS (asserted) =======================
// slide 5: body water
const bodyMass = 70, waterFrac = 0.6;
const bodyWater = calc('body water 60% of 70 kg', bodyMass * waterFrac, 42, 1e-9);
calc('QC body water 60% of 50 kg', 50 * 0.6, 30, 1e-9);
// slide 6: water balance (illustrative daily values, litres)
const WIN = [['Drinks', 1.5], ['Food', 0.7], ['Respiration', 0.3]];
const WOUT = [['Urine', 1.5], ['Sweat', 0.5], ['Breath', 0.4], ['Faeces', 0.1]];
const wIn = calc('water in 1.5 + 0.7 + 0.3', WIN.reduce((a, [, v]) => a + v, 0), 2.5, 1e-9);
const wOut = calc('water out 1.5 + 0.5 + 0.4 + 0.1', WOUT.reduce((a, [, v]) => a + v, 0), 2.5, 1e-9);
calc('water balance in − out', wIn - wOut, 0, 1e-9);
const hotSweat = 1.5;
const extraDrink = calc('extra drink on hot day 1.5 − 0.5', hotSweat - 0.5, 1.0, 1e-9);
// slide 8: enzyme activity vs temperature (illustrative human enzyme)
const ENZ = [[0, 2], [10, 12], [20, 30], [30, 62], [37, 100], [40, 94], [45, 60], [50, 18], [55, 4], [60, 0]];
const enzAt = t => ENZ.find(p => p[0] === t)[1];
calc('enzyme activity at 30 °C as % of optimum', enzAt(30) / enzAt(37) * 100, 62, 1e-9);
calc('QC fall in activity 37 → 45 °C', enzAt(37) - enzAt(45), 40, 1e-9);
calc('fall from 37 to 30 °C', 37 - 30, 7);
// slide 9: dehydration
const athM = 60, athLoss = 1.8;
const athPct = calc('athlete water loss % of mass 1.8 / 60 × 100', athLoss / athM * 100, 3, 1e-9);
calc('QC 2% of 75 kg', 0.02 * 75, 1.5, 1e-9);
// slide 12: feedback graph (sine about the set point, 0–60 min)
const SET = 37.0, AMP = 0.3, PER = 20;
const fb = t => SET + AMP * Math.sin(2 * Math.PI * t / PER);
calc('feedback graph max', fb(5), 37.3, 1e-9);
calc('feedback graph min', fb(15), 36.7, 1e-9);
calc('feedback range 37.3 − 36.7', fb(5) - fb(15), 0.6, 1e-9);
// slides 15–16: beaker model, target 40 °C, readings every minute for 10 min (illustrative class data)
const TGT = 40;
const RUN_A = [40, 41.5, 42.5, 43, 42.5, 42, 41.5, 41, 40.5, 40, 39.5]; // Bunsen only (single effector)
const RUN_B = [40, 41, 40.5, 39.5, 40, 40.5, 40, 39.5, 40, 40.5, 40]; // Bunsen + ice (antagonistic effectors)
assert.strictEqual(RUN_A.length, 11); assert.strictEqual(RUN_B.length, 11);
const rng = a => Math.max(...a) - Math.min(...a);
const maxDev = a => Math.max(...a.map(v => Math.abs(v - TGT)));
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const rA = calc('run A range 43 − 39.5', rng(RUN_A), 3.5, 1e-9);
const rB = calc('run B range 41 − 39.5', rng(RUN_B), 1.5, 1e-9);
const dA = calc('run A max deviation from 40', maxDev(RUN_A), 3, 1e-9);
const dB = calc('run B max deviation from 40', maxDev(RUN_B), 1, 1e-9);
const mA = calc('run A mean', mean(RUN_A), 454 / 11, 1e-9);
const mB = calc('run B mean', mean(RUN_B), 441.5 / 11, 1e-9);
calc('run A sum', RUN_A.reduce((x, y) => x + y, 0), 454, 1e-9);
calc('run B sum', RUN_B.reduce((x, y) => x + y, 0), 441.5, 1e-9);
calc('run A mean 3 s.f.', sf(mA, 3), 41.3, 1e-12);
calc('run B mean 3 s.f.', sf(mB, 3), 40.1, 1e-12);
const minsAbove41A = calc('run A minutes above 41 °C', RUN_A.filter(v => v > 41).length, 6);
calc('run B minutes above 41 °C', RUN_B.filter(v => v > 41).length, 0);
// slide 17: skin vs core temperature (means of 3 readings, illustrative)
const SK = [
  ['Resting, room at 20 °C', [37.0, 36.9, 37.1], [32.4, 32.6, 32.5]],
  ['Hand in cold water, 5 min', [36.9, 36.9, 36.9], [21.2, 20.6, 21.2]],
  ['After 5 min exercise', [37.4, 37.3, 37.5], [33.4, 33.6, 33.5]],
  ['Outside at 5 °C, 10 min', [36.8, 36.8, 36.8], [24.1, 23.8, 24.1]],
];
const SKm = SK.map(([n, c, k]) => [n, mean(c), mean(k)]);
[[37.0, 32.5], [36.9, 21.0], [37.4, 33.5], [36.8, 24.0]].forEach(([c, k], i) => { calc(`core mean ${i}`, SKm[i][1], c, 1e-9); calc(`skin mean ${i}`, SKm[i][2], k, 1e-9); });
const coreR = calc('core range 37.4 − 36.8', Math.max(...SKm.map(r => r[1])) - Math.min(...SKm.map(r => r[1])), 0.6, 1e-9);
const skinR = calc('skin range 33.5 − 21.0', Math.max(...SKm.map(r => r[2])) - Math.min(...SKm.map(r => r[2])), 12.5, 1e-9);
calc('skin range ÷ core range', skinR / coreR, 20.833333333333332, 1e-9);
calc('skin range ÷ core range 2 s.f.', sf(skinR / coreR, 2), 21, 1e-12);
calc('core − skin, cold water', SKm[1][1] - SKm[1][2], 15.9, 1e-9);
// slide 19: limits
calc('runner rise 38.5 − 37.0', 38.5 - 37.0, 1.5, 1e-9);
calc('hypothermia margin 37 − 35', 37 - 35, 2);
calc('heat stroke margin 40 − 37', 40 - 37, 3);
calc('dehydration 10% of 70 kg', 0.1 * 70, 7, 1e-9);
// starter
calc('starter 2 × 23', 2 * 23, 46);
// recaps, full question, homework
calc('R4 range 36.8 → 37.2', 37.2 - 36.8, 0.4, 1e-9);
calc('R4 skin range 34.0 − 25.5', 34.0 - 25.5, 8.5, 1e-9);
calc('FQ % of body mass 2.4 / 80 × 100', 2.4 / 80 * 100, 3, 1e-9);
calc('FQ range 41.5 − 39', 41.5 - 39, 2.5, 1e-9);
calc('HW mean (36.9 + 37.1 + 37.0 + 37.2) / 4', (36.9 + 37.1 + 37.0 + 37.2) / 4, 37.05, 1e-9);
calc('HW water out 1.4 + 0.9 + 0.4 + 0.1', 1.4 + 0.9 + 0.4 + 0.1, 2.8, 1e-9);
calc('HW extra drink 2.8 − 2.5', 2.8 - 2.5, 0.3, 1e-9);

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
const HOT = 'D9534F', COLD = '3B7DD8';
const SKIN = 'F6DDC8', SKIN_EDGE = 'B98E6E';
// body(s, cx, top, k): front-view human outline (copied from build_B5_3.js, organs removed). Height 4.5k, width 2.3k.
function body(s, cx, top, k = 1) {
  const parts = [
    ['rr', cx - 1.12 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, 7],
    ['rr', cx + 0.84 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, -7],
    ['rr', cx - 0.64 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0],
    ['rr', cx + 0.10 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0],
    ['rr', cx - 0.8 * k, top + 0.92 * k, 1.6 * k, 2.0 * k, 0],
    ['r', cx - 0.13 * k, top + 0.7 * k, 0.26 * k, 0.3 * k, 0],
    ['o', cx - 0.33 * k, top, 0.66 * k, 0.8 * k, 0],
  ];
  [true, false].forEach(edgePass => parts.forEach(([t, x, y, w, h, rot]) => {
    const shape = t === 'o' ? SH.OVAL : t === 'r' ? SH.RECTANGLE : SH.ROUNDED_RECTANGLE;
    s.addShape(shape, { x, y, w, h, rotate: rot, rectRadius: t === 'rr' ? Math.min(w, h) * 0.45 : undefined, fill: { color: SKIN },
      line: edgePass ? { color: SKIN_EDGE, width: 2.5 } : { type: 'none' } });
  }));
  line(s, cx, top + 2.95 * k, cx, top + 4.5 * k, SKIN_EDGE, 1.25);
  return { head: [cx, top + 0.4 * k], ear: [cx - 0.33 * k, top + 0.42 * k], chest: [cx, top + 1.5 * k], handL: [cx - 1.05 * k, top + 2.8 * k], handR: [cx + 1.05 * k, top + 2.8 * k], belly: [cx, top + 2.2 * k] };
}
// rounded process box with centred text
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
// leader-line label
function callout(s, lx, ly, lw, text, px, py, col, o = {}) {
  const right = lx > px;
  label(s, lx, ly - (o.h || 0.3) / 2, lw, text, { size: o.size || 10.5, bold: o.bold !== false, color: col, align: right ? 'left' : 'right', h: o.h || 0.3, valign: 'middle' });
  line(s, right ? lx - 0.04 : lx + lw + 0.04, ly, px, py, col, 1);
  ball(s, px, py, 0.03, col);
}
// thermometer: glass tube from yTop (height h) with bulb; liquid fills fraction frac of the tube
function thermo(s, cx, yTop, h, frac, col = C.red, o = {}) {
  const w = o.w || 0.12, r = o.r || 0.1;
  box(s, cx - w / 2, yTop, w, h, 'F7FAFC', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: w / 2, lw: 1 });
  const fh = (h - r) * frac;
  box(s, cx - w * 0.22, yTop + h - r * 0.5 - fh, w * 0.44, fh, col, null);
  ball(s, cx, yTop + h, r, col, '8E2A33', 1);
}
// Bunsen burner standing on the bench at yb, barrel centred on cx; flame on
function bunsen(s, cx, yb, k = 1) {
  box(s, cx - 0.32 * k, yb - 0.08 * k, 0.64 * k, 0.08 * k, '5A6275', '4A5262');
  box(s, cx - 0.06 * k, yb - 0.72 * k, 0.12 * k, 0.64 * k, '8C96A8', '5A6275', { lw: 0.75 });
  box(s, cx - 0.09 * k, yb - 0.3 * k, 0.18 * k, 0.1 * k, '6B7385', '4A5262');
  line(s, cx - 0.32 * k, yb - 0.04 * k, cx - 0.55 * k, yb - 0.04 * k, 'D9822B', 3);
  oval(s, cx, yb - 0.9 * k, 0.15 * k, 0.38 * k, '7FA9E0', '3B6FB6', { lw: 0.75, tr: 15 });
  oval(s, cx, yb - 0.82 * k, 0.07 * k, 0.18 * k, '2F5FA8', null);
}
// tripod with gauze: top at yt, legs to yb, centred on cx, half-width hw
function tripod(s, cx, yt, yb, hw) {
  line(s, cx - hw + 0.08, yt, cx - hw - 0.08, yb, '4A5262', 2.5);
  line(s, cx + hw - 0.08, yt, cx + hw + 0.08, yb, '4A5262', 2.5);
  box(s, cx - hw, yt - 0.03, 2 * hw, 0.06, '4A5262', null);
  box(s, cx - hw + 0.05, yt - 0.07, 2 * hw - 0.1, 0.04, 'B8C0CD', '8C96A8', { lw: 0.5 });
}
function iceCube(s, x, y, a) { box(s, x, y, a, a, 'E8F6FC', '7FB8D8', { shape: SH.ROUNDED_RECTANGLE, r: 0.03, lw: 1 }); line(s, x + a * 0.2, y + a * 0.25, x + a * 0.45, y + a * 0.25, C.white, 1.5); }
// water-bath model set-up on the bench at yb, centred on cx. Returns the beaker's water level y.
function beakerRig(s, cx, yb, o = {}) {
  const yt = yb - 1.25;
  bunsen(s, cx, yb, 0.95);
  tripod(s, cx, yt, yb, 0.62);
  const bw = 0.95, bh = 1.05, bx = cx - bw / 2, by = yt - 0.07 - bh;
  const lv = D.liquidColumn(s, bx, by, bw, bh, 0.72);
  thermo(s, cx + 0.18, by - 0.75, 1.6, 0.62, C.red, { w: 0.1, r: 0.07 });
  if (o.ice) { iceCube(s, bx + 0.12, lv.top + 0.02, 0.18); iceCube(s, bx + 0.36, lv.top + 0.06, 0.15); }
  line(s, cx - 1.2, yb, cx + 1.2, yb, '8B6B3E', 2);
  return { top: lv.top, bx, by, bw, bh };
}
// red blood cell (face on) in a beaker: state 'shrink' | 'normal' | 'swell'
function rbcState(s, cx, cy, state) {
  if (state === 'normal') { ball(s, cx, cy, 0.42, HOT, '8E2A33', 1.25); ball(s, cx, cy, 0.18, 'EE8A8F', 'EE8A8F'); return; }
  if (state === 'swell') { oval(s, cx, cy, 1.22, 1.22, null, '8E2A33', { lw: 1, dash: 'dash' }); ball(s, cx, cy, 0.52, 'E86B6F', '8E2A33', 1.25); return; }
  // shrunken, crinkled cell: a star-like polygon
  const pts = []; for (let i = 0; i < 24; i++) { const a = i / 24 * 2 * Math.PI, r = i % 2 ? 0.27 : 0.34; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  poly(s, pts, 'B83A40', '6E1E23', { lw: 1 });
}
// sun and snowflake icons
function sunIcon(s, cx, cy, r = 0.16) {
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(s, cx + 1.3 * r * Math.cos(a), cy + 1.3 * r * Math.sin(a), cx + 1.8 * r * Math.cos(a), cy + 1.8 * r * Math.sin(a), 'E39A2F', 1.5); }
  ball(s, cx, cy, r, 'F5C342', 'D9822B', 1);
}
function snowIcon(s, cx, cy, r = 0.2) { for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; line(s, cx - r * Math.cos(a), cy - r * Math.sin(a), cx + r * Math.cos(a), cy + r * Math.sin(a), COLD, 2); } }
function dropIcon(s, cx, cy, r = 0.1, col = '5B9BD5') {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - r * 0.8, y: cy - r * 2.0, w: r * 1.6, h: r * 1.6, fill: { color: col }, line: { color: col, width: 0.5 } });
  ball(s, cx, cy - r * 0.2, r * 0.82, col, col);
}
function muscleIcon(s, cx, cy, k = 1) {
  oval(s, cx, cy, 0.7 * k, 0.28 * k, 'F4B6B9', 'A33E48', { lw: 1.25 });
  for (let i = -2; i <= 2; i++) line(s, cx + i * 0.1 * k, cy - 0.09 * k, cx + i * 0.1 * k, cy + 0.09 * k, 'C76A72', 0.75);
}
function brainIcon(s, cx, cy, k = 1) {
  oval(s, cx, cy, 0.62 * k, 0.44 * k, 'F4C7D0', 'C98393', { lw: 1.25 });
  line(s, cx, cy - 0.2 * k, cx, cy + 0.2 * k, 'C98393', 1);
  [[-0.15, -0.05], [0.15, 0.05]].forEach(([dx, dy]) => oval(s, cx + dx * k, cy + dy * k, 0.18 * k, 0.1 * k, null, 'C98393', { lw: 0.75 }));
}
function sensorIcon(s, cx, cy, k = 1) { ball(s, cx, cy, 0.17 * k, 'D8F0E2', C.green, 1.5); ball(s, cx, cy, 0.07 * k, C.green, C.green); }
function glandIcon(s, cx, cy, k = 1) { oval(s, cx, cy, 0.42 * k, 0.3 * k, 'F3D3A0', 'B8730A', { lw: 1.25 }); dropIcon(s, cx + 0.3 * k, cy + 0.12 * k, 0.06 * k, 'E08A1E'); }

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Homeostasis',
  footer: 'OCR J260 Combined Science B • B5.4 Why do we need to maintain a constant internal environment? • teacher deck • mark schemes in the notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • the importance of a constant internal environment • two suggested practicals` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements in J260 B5.4 found • stretch marked' },
    { icon: '⇄', text: 'Internal and external change • enzymes and cells • receptors, coordination, effectors • feedback' },
  ],
  notes: 'B5.4 Why do we need to maintain a constant internal environment? is Part 4 of 6 in J260 Chapter B5 The human body – staying alive.\nScope check (see SPEC_B5_4.md): in Combined Science B (J260) this sub-topic has one assessable statement, B5.4.1 "explain the importance of maintaining a constant internal environment in response to internal and external change", with suggested activities comparing skin and core body temperature and modelling control with a single effector vs antagonistic effectors. The statements on the skin\'s role in temperature control (sweating, hair erection, blood flow), the response to temperature challenges (HT), osmotic change, the kidney and ADH are in Biology B (J257) only, so this deck does NOT teach them. Insulin, glucagon and diabetes are J260 B5.6.\nWording from search extracts (ocr.org.uk and the specification mirrors could not be fetched): confidence medium. If your copy of the J260 specification includes the skin or kidney statements, add them from the J257 materials.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B5.4.1', text: 'Describe the **internal environment** and the conditions the body keeps **constant**.' },
  { code: 'B5.4.1', text: 'Give examples of **internal** and **external** changes that could alter these conditions.' },
  { code: 'B5.4.1', text: 'Explain why **enzymes** and **cells** only work properly within a **narrow range** of conditions.' },
  { code: 'B5.4.1', text: 'Define **homeostasis** and describe the roles of **receptors**, **coordination centres** and **effectors**.' },
  { code: 'B5.4.1', text: 'Recall **negative feedback** (B5.3) and explain how **antagonistic effectors** give finer control.' },
  { code: 'Practical', text: 'Model control with **one effector** vs **antagonistic effectors** (beaker at 40 °C) and analyse the data.' },
  { code: 'Practical', text: 'Compare **skin** and **core** body temperature in different conditions; explain the difference.' },
  { code: 'B5.4.1', text: 'Explain what happens when conditions go **outside** the safe range (temperature, water).' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statement found (docbrown combined-science B5 page, search extract): "explain the importance of maintaining a constant internal environment in response to internal and external change". The J260 specification text (plutoniumscience copy, search extract) adds: cells, enzymes and life processes work only in certain conditions, and best within a narrow range; homeostasis depends on receptors, nerves, hormones and (often antagonistic) effectors to counteract changes. Suggested activities: compare skin temperature and core body temperature under different conditions; model the control of temperature by keeping a beaker of water at 40 °C with just a Bunsen burner (single effector) compared to a Bunsen burner and ice (antagonistic effectors).\nNo HT marker found for B5.4.1. The statement code B5.4.1 is from search extracts (medium confidence). See SPEC_B5_4.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B5 The human body – staying alive • B5.4 is Part 4 of 6 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B5.4.1', 'The internal environment; internal and external change', 'Both tiers', C.blue],
    ['B5.4.1', 'Why constant? Enzymes, cells and water', 'Both tiers', C.blue],
    ['B5.4.1', 'Control systems, negative feedback, antagonistic effectors', 'Both tiers', C.blue],
    ['Practical', 'Modelling control: a beaker kept at 40 °C', 'Practical', C.orange],
    ['Practical', 'Skin temperature vs core temperature', 'Practical', C.orange],
    ['B5.4.1', 'Outside the safe range; exercise on a hot day', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B5.4\nWhy keep conditions constant?', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B3 enzymes and osmosis • B5.1 blood and tissue fluid • B5.2 receptors, effectors • B5.3 negative feedback', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.25, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B5.1 How do substances get into, out of and around our bodies?',
      'B5.2 How does the nervous system help us respond to changes?',
      'B5.3 How do hormones control responses in the human body?',
      '**B5.4 Why do we need to maintain a constant internal environment?** (this deck)',
      'B5.5 What role do hormones play in human reproduction?',
      'B5.6 What can happen when organs and control systems stop working? (insulin, glucagon, diabetes)',
    ], { size: 11, color: 'E3F2F0', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 3.05, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.75, 5.53, 2.1, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no B5.4 statement in J260 was found to be Higher only.',
      'In Combined Science you learn **why** conditions are kept constant. How the skin and the kidneys do it is in the separate Biology course.',
      'Maths: **mean**, **range**, **percentages**; plotting and reading **graphs**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.85, w: 5.15, h: 1.9, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B5 has six sub-topics (B5.1–B5.6), confirmed by the earlier decks in this series (see SPEC_B5_2.md, SPEC_B5_3.md).\nB5.4 in J260 vs J257: J257 Biology B has B5.4.1 to about B5.4.8 (importance of a constant internal environment; the skin in temperature control and practical investigations; the HT response to temperature challenges with receptors, processing and negative feedback; osmotic change; the kidney and nephron; ADH). Search extracts of a revision guide spec map and of PMT\'s OCR B notes mark the temperature-control statements as "biology only", and Oak National Academy runs only 4 lessons in its OCR combined-science unit against 7–9 in its OCR biology unit. This deck therefore teaches B5.4.1 only, using temperature and water as examples of conditions, and does not teach the skin mechanisms, kidney or ADH (UNVERIFIED, medium confidence).\nOverlap control: negative feedback was taught through thyroxine in B5.3 (recap only here). Blood glucose is named as a controlled condition but insulin, glucagon and diabetes are B5.6. Osmosis (B3) and tissue fluid / plasma (B5.1) are recapped only.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B3 • enzymes', q: 'What happens to the **active site** of an enzyme at a very **high** temperature? What is this called?' },
  { from: 'B3 • osmosis', q: 'Define **osmosis**.' },
  { from: 'B5.1 • blood', q: 'Name the liquid part of the blood. Name **two** substances it carries.' },
  { from: 'B5.2 • nervous system', q: 'Put in order: **effector**, **receptor**, **CNS (coordinator)**, **stimulus**, **response**.' },
  { from: 'B5.3 • hormones', q: 'What is **negative feedback**? Name the hormone in B5.3 that is controlled by it.' },
  { from: 'B4.1 • respiration', q: 'Aerobic respiration releases energy. Name **two** other products. Which of them is a **waste** the body must remove?' },
], { subtitle: 'Recall from B3, B4.1, B5.1, B5.2 and B5.3 • 6 minutes • no notes', notes: 'ANSWERS\n1. The active site changes shape (the enzyme is denatured), so the substrate no longer fits and the reaction stops.\n2. The diffusion (net movement) of water molecules from a dilute solution to a more concentrated solution through a partially permeable membrane.\n3. Plasma. Any two: glucose, amino acids, carbon dioxide, urea, hormones, mineral ions, water (also accept antibodies, proteins).\n4. Stimulus → receptor → CNS (coordinator) → effector → response.\n5. A change in a level causes a response that reverses the change / brings it back to normal. Thyroxine (via TSH).\n6. Carbon dioxide and water. Carbon dioxide is the waste (water can be used, but excess must also be lost).\nQ1, Q2, Q4 and Q5 are the key ideas of this lesson: enzymes need the right conditions, water moves by osmosis, control systems have receptors and effectors, and negative feedback keeps levels steady.' }), 'Retrieval starter');

// ======================= 5 THE INTERNAL ENVIRONMENT =======================
reg(D.contentSlide({
  title: 'The internal environment',
  subtitle: `Specification ${sp('B5.4.1')} • the fluid that surrounds your cells must stay the same`,
  tag: 'B5.4.1', caption: 'body cells bathed in tissue fluid, with a capillary below; not to scale',
  draw: (s, p) => {
    // tissue fluid region
    box(s, 0.65, 1.5, 5.7, 3.0, 'DDEFF7', '7FA9C4', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1 });
    label(s, 0.75, 1.55, 5.5, '**tissue fluid**: the internal environment around every cell', { size: 11, color: '2F5F8F', align: 'left' });
    const cells = [[0.95, 1.95], [2.85, 1.95], [4.75, 1.95]];
    const pts = cells.map(([x, y]) => D.animalCell(s, x, y, 1.4, 1.05, { nucleus: [0.45, 0.5, 0.15], mw: 0.2 }));
    label(s, 0.7, 3.05, 0.85, 'body cell', { size: 10, color: C.grey, align: 'left' });
    // capillary
    box(s, 0.65, 4.65, 5.7, 0.6, 'F6C9CC', HOT, { shape: SH.ROUNDED_RECTANGLE, r: 0.28, lw: 1.5 });
    [1.2, 2.0, 2.8, 3.7, 4.6, 5.5].forEach((x, i) => { ball(s, x, 4.95, 0.13, HOT, '8E2A33'); ball(s, x, 4.95, 0.05, 'EE8A8F', 'EE8A8F'); });
    label(s, 0.75, 5.3, 2.5, 'capillary: **blood plasma**', { size: 10.5, color: C.red, align: 'left' });
    arrow(s, 5.8, 5.38, 6.25, 5.38, C.red, 1.5);
    // exchange arrows between capillary and cells
    [[1.65, 'O₂, glucose', true], [3.55, 'CO₂, urea', false], [5.45, 'water, ions', null]].forEach(([x, t, up]) => {
      if (up === true) arrow(s, x, 4.6, x, 3.1, C.green, 2);
      else if (up === false) arrow(s, x, 3.1, x, 4.6, C.orange, 2);
      else { arrow(s, x - 0.12, 4.6, x - 0.12, 3.1, '2F5F8F', 2); arrow(s, x + 0.12, 3.1, x + 0.12, 4.6, '2F5F8F', 2); }
      label(s, up === null ? x - 1.3 : x + 0.12, 3.6, 1.0, t, { size: 10, bold: true, align: up === null ? 'right' : 'left', color: up === true ? C.green : up === false ? C.orange : '2F5F8F', h: 0.42, valign: 'top' });
    });
  },
  head: 'Keeping conditions constant',
  lines: [
    'Your cells are bathed in **tissue fluid**, which comes from blood **plasma**. This is the **internal environment**.',
    'Conditions kept within narrow limits include: **core temperature** (about **37 °C**), **water** and **ion** (salt) concentration, **pH**, **blood glucose** (B5.6) and **carbon dioxide** level.',
    'Cells exchange substances with the tissue fluid all the time: **oxygen** and **glucose** in; **carbon dioxide** and **urea** out.',
    'Keeping a constant internal environment is called **homeostasis**. It keeps every cell working properly.',
  ],
  size: 12,
  worked: { head: 'Worked example: body water', q: `About 60% of an adult's body mass is water. How much water is in a ${bodyMass} kg adult?`,
    steps: [['Fraction', '60% = 0.60'], ['Substitute', `0.60 × ${bodyMass} kg`], ['Answer', `${bodyWater} kg of water (about ${bodyWater} litres)`]], size: 10.5 },
  workedH: 1.75,
  qc: 'What is the **internal environment**? Name **three** conditions in it that the body keeps constant. How much water is in a **50 kg** person (60%)?',
  notes: 'QUICK CHECK ANSWER: The fluid around the body cells (tissue fluid, from blood plasma). Any three: core body temperature, water content / concentration, ion / salt concentration, pH, blood glucose, carbon dioxide (also blood pressure, oxygen). 0.6 × 50 = 30 kg (30 litres).\nB5.4.1 (search extract): "explain the importance of maintaining a constant internal environment in response to internal and external change". Blood glucose is named as a condition only: its control by insulin and glucagon is B5.6. Tissue fluid formation is not required in detail. Node: 0.6 × 70 = 42; 0.6 × 50 = 30.',
}), 'B5.4.1 The internal environment');

// ======================= 6 INTERNAL AND EXTERNAL CHANGE =======================
reg(D.contentSlide({
  title: 'Internal and external changes',
  subtitle: `Specification ${sp('B5.4.1')} • conditions are changed all the time, by the outside world and by the body itself`,
  tag: 'B5.4.1', caption: 'changes that push conditions away from normal',
  draw: (s, p) => {
    const P = body(s, 3.5, 1.75, 0.82);
    label(s, 0.6, 1.4, 2.0, 'External changes', { size: 12, bold: true, color: COLD, align: 'left' });
    label(s, 4.45, 1.4, 2.0, 'Internal changes', { size: 12, bold: true, color: C.orange, align: 'right' });
    const ext = [[1.75, 'Hot day: body **gains** heat', 'sun'], [2.95, 'Cold day: body **loses** heat fast', 'snow'], [4.15, 'Salty meal or a big **drink**: water and salt levels change', 'drop']];
    ext.forEach(([y, t, ic]) => {
      box(s, 0.6, y, 1.95, 1.0, C.white, COLD, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      if (ic === 'sun') sunIcon(s, 0.88, y + 0.3, 0.12); else if (ic === 'snow') snowIcon(s, 0.88, y + 0.3, 0.16); else dropIcon(s, 0.88, y + 0.38, 0.09);
      label(s, 1.12, y + 0.05, 1.38, t, { size: 10, align: 'left', valign: 'top', h: 0.9 });
      arrow(s, 2.58, y + 0.5, 2.95, y + 0.5 + (y < 3 ? 0.2 : -0.1), COLD, 1.75);
    });
    const int = [[1.75, 'Exercise: **respiration** in muscles releases heat', 'muscle'], [2.95, 'Respiration makes **CO₂**; it builds up in the blood', 'co2'], [4.15, '**Sweating** and breathing out **lose water**', 'drop2']];
    int.forEach(([y, t, ic]) => {
      box(s, 4.45, y, 1.95, 1.0, C.white, C.orange, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      if (ic === 'muscle') muscleIcon(s, 4.75, y + 0.3, 0.42); else if (ic === 'co2') label(s, 4.52, y + 0.15, 0.48, '**CO₂**', { size: 11, color: C.orange }); else dropIcon(s, 4.73, y + 0.38, 0.09, '5B9BD5');
      label(s, 5.0, y + 0.05, 1.36, t, { size: 10, align: 'left', valign: 'top', h: 0.9 });
      arrow(s, 4.42, y + 0.5, 4.05, y + 0.5 + (y < 3 ? 0.2 : -0.1), C.orange, 1.75);
    });
    box(s, 0.6, 5.35, 5.8, 0.48, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, 0.7, 5.35, 5.6, 'Homeostasis **counteracts** these changes so conditions stay close to normal', { size: 11, color: C.white, h: 0.48 });
  },
  head: 'What changes conditions?',
  lines: [
    '**External** changes come from the surroundings, e.g. air temperature, what you eat and drink.',
    '**Internal** changes come from the body\'s own activity, e.g. **respiration** releases heat and makes CO₂; water is lost in sweat, breath and urine.',
    'Many changes happen at once, e.g. during exercise on a hot day.',
    'The body must **detect** each change and **respond** to cancel it out.',
  ],
  size: 12,
  worked: { head: 'Worked example: water balance', q: `Each day water in = drinks 1.5 + food 0.7 + respiration 0.3 L; out = urine 1.5 + sweat 0.5 + breath 0.4 + faeces 0.1 L. On a hot day sweat rises to ${hotSweat} L. How much more must be drunk?`,
    steps: [['Normal', `in ${wIn} L = out ${wOut} L: balanced`], ['Change', `sweat ${hotSweat} − 0.5 = ${extraDrink} L more lost`], ['Answer', `drink about ${extraDrink} L more (if nothing else changes)`]], size: 10.5 },
  workedH: 2.05,
  qc: 'Classify each as an **internal** or **external** change: (a) running a race (b) sitting in a cold wind (c) eating crisps (d) a fever caused by an infection.',
  notes: `QUICK CHECK ANSWER: (a) internal (more respiration in muscles releases heat, makes CO₂, more sweating); (b) external; (c) external (salt taken in); (d) internal (the body itself raises its temperature).\nNode: in ${wIn} L = out ${wOut} L; extra sweat ${hotSweat} − 0.5 = ${extraDrink} L. Values are typical textbook daily figures (illustrative). How the kidneys change urine volume (ADH) is J257 only and is not taught here.`,
}), 'B5.4.1 Internal and external changes');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B5.4.1')} • the internal environment and changes to it`, [
  { q: 'What is meant by **homeostasis**?', marks: 1, ms: 'Keeping a constant internal environment / keeping conditions inside the body constant / within narrow limits (despite changes) (1).' },
  { q: 'Name **three** conditions in the internal environment that the body keeps constant.', marks: 3, ms: 'Any three (1 each): core body temperature; water content / concentration; ion / salt concentration; pH; blood glucose; carbon dioxide level (also accept oxygen level, blood pressure).' },
  { q: 'Give **one** internal change and **one** external change that could raise body temperature.', marks: 2, ms: 'Internal: exercise / more respiration in muscles / fever (1). External: hot weather / sunshine / hot room / hot drink or bath (1).' },
  { q: 'Explain why exercise increases the amount of **carbon dioxide** in the blood.', marks: 2, ms: 'Muscles respire faster (to release more energy) (1); carbon dioxide is a product of respiration, so more is made and passes into the blood (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 WHY: ENZYMES =======================
reg(D.contentSlide({
  title: 'Why keep conditions constant? Enzymes',
  subtitle: `Specification ${sp('B5.4.1')} • enzymes, and so cells, work best in a narrow range of conditions`,
  tag: 'B5.4.1', caption: 'activity of a typical human enzyme; graph plotted to scale from the data points',
  draw: (s, p) => {
    const g = { x: 1.35, y: 1.65, w: 4.85, h: 3.45, xmin: 0, xmax: 60, ymin: 0, ymax: 100, xstep: 10, ystep: 20, minor: 2, xlabel: 'Temperature / °C', ylabel: 'Enzyme activity / % of maximum' };
    box(s, D.px(g, 35), g.y, D.px(g, 40) - D.px(g, 35), g.h, 'D8F0E2', null);
    D.axes(s, g);
    box(s, D.px(g, 35), g.y, D.px(g, 40) - D.px(g, 35), g.h, 'D8F0E2', null, { tr: 40 });
    D.plotLine(s, g, ENZ, C.blue, 2.5);
    D.points(s, g, ENZ, C.ink);
    line(s, D.px(g, 37), g.y + 0.05, D.px(g, 37), g.y + g.h, C.green, 1.5, { dash: 'dash' });
    label(s, D.px(g, 37) - 1.45, g.y - 0.05, 1.4, 'optimum 37 °C', { size: 10, bold: true, color: C.green, align: 'right', h: 0.25 });
    label(s, D.px(g, 4), D.py(g, 62), 1.7, 'too cold: molecules move slowly, **fewer collisions**', { size: 10, align: 'left', h: 0.6, valign: 'top' });
    label(s, D.px(g, 46), D.py(g, 92), 1.0, 'too hot: active site changes shape: **denatured**', { size: 10, align: 'left', h: 0.85, valign: 'top', color: C.red });
  },
  head: 'Enzymes need the right conditions',
  lines: [
    'Almost every reaction in a cell is controlled by an **enzyme**.',
    'Human enzymes work best near **37 °C** and at their **optimum pH**.',
    '**Too cold**: reactions are too **slow** for the cell\'s needs.',
    '**Too hot**, or the **wrong pH**: the active site changes shape and the enzyme is **denatured**. Reactions stop and cells die.',
    'pH matters too: each enzyme has an **optimum pH** (most work near pH 7).',
    'So core temperature and pH must be kept within **narrow limits**.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: read the graph', q: 'Core temperature falls from 37 °C to 30 °C. What happens to the enzyme\'s activity?',
    steps: [['Read', `at 37 °C: ${enzAt(37)}%; at 30 °C: ${enzAt(30)}%`], ['Compare', `${enzAt(30)} ÷ ${enzAt(37)} × 100 = ${enzAt(30)}% of the maximum`], ['Answer', 'reactions run at about 60% of the rate: too slow']], size: 10.5 },
  workedH: 1.8,
  qc: `Use the graph: by how many percentage points does activity fall between **37 °C** and **45 °C**? Explain **why** it falls.`,
  notes: `QUICK CHECK ANSWER: ${enzAt(37)} − ${enzAt(45)} = ${enzAt(37) - enzAt(45)} percentage points (from 100% to 60%). Above the optimum, the enzyme's active site changes shape (bonds holding its shape break); the substrate no longer fits; the enzyme is denatured, so fewer enzyme–substrate complexes form.\nGraph: illustrative data for a human enzyme, plotted to scale (asserted in node): ${ENZ.map(p => p.join(' °C → ') + '%').join('; ')}. The green band 35–40 °C is the normal range. Enzyme mechanism is taught earlier in J260 (B3); recap only.`,
}), 'B5.4.1 Why constant: enzymes');

// ======================= 9 WHY: WATER AND CELLS =======================
{
  const s = D.contentHeader('Why keep conditions constant? Water and cells', `Specification ${sp('B5.4.1')} • if the water concentration of body fluids changes, cells gain or lose water by osmosis`, { tag: 'B5.4.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'red blood cells in three solutions; arrows: net water movement');
  const cols = [[1.45, 'More concentrated than the cell', 'shrink', 'D7E9F5', 'water **leaves** the cell: it **shrinks** and crinkles'], [3.5, 'Same concentration as the cell', 'normal', 'E8F3FA', 'no net movement: cell **stays normal**'], [5.55, 'More dilute than the cell', 'swell', 'F3F9FD', 'water **enters** the cell: it **swells** and may **burst**']];
  cols.forEach(([cx, h, st, col, t]) => {
    label(s, cx - 0.95, 1.45, 1.9, h, { size: 10.5, bold: true, color: C.ink, h: 0.45, valign: 'top' });
    D.liquidColumn(s, cx - 0.85, 1.95, 1.7, 1.85, 0.85, { color: col });
    rbcState(s, cx, 3.05, st);
    if (st === 'shrink') { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => arrow(s, cx + a * 0.32, 3.05 + b * 0.22, cx + a * 0.62, 3.05 + b * 0.5, '2F5F8F', 1.75)); }
    if (st === 'swell') { [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([a, b]) => arrow(s, cx + a * 0.75, 3.05 + b * 0.62, cx + a * 0.45, 3.05 + b * 0.38, '2F5F8F', 1.75)); }
    if (st === 'normal') { arrow(s, cx - 0.7, 2.65, cx - 0.45, 2.85, '2F5F8F', 1.25); arrow(s, cx + 0.45, 3.25, cx + 0.7, 3.45, '2F5F8F', 1.25); }
    label(s, cx - 0.95, 3.95, 1.9, t, { size: 10.5, h: 0.75, valign: 'top' });
  });
  box(s, 0.65, 4.8, 5.7, 1.0, C.white, C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, 0.8, 4.85, 5.4, '**Animal cells have no cell wall**, so too much water in can burst them, and too little shrinks them. Either way the cell cannot work properly.', { size: 10.5, h: 0.9, valign: 'middle', align: 'left' });
  D.card(s, 6.8, 1.3, 6.08, 2.55, 'Water and ion concentration', [
    'Water moves into and out of cells by **osmosis** (B3), from a dilute solution to a more concentrated one.',
    'The **water** and **ion** (salt) concentration of tissue fluid must stay the **same** as inside the cells.',
    'If you lose water (sweating, not drinking) body fluids become **too concentrated**; drinking far too much makes them **too dilute**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.0, 6.08, 2.25, 'Worked example: water lost in sweat', `A ${athM} kg athlete loses ${athLoss} kg of water as sweat in a race. Calculate this as a percentage of body mass.`, [
    ['Formula', '% = mass lost ÷ body mass × 100'], ['Substitute', `${athLoss} ÷ ${athM} × 100`], ['Answer', `${fmt(athPct)}% of body mass: enough to reduce performance`]], { size: 10.5 });
  D.quickCheck(s, 'A patient is given a drip of **pure water** straight into a vein. Explain what could happen to their red blood cells. What percentage of a **75 kg** person is **1.5 kg**?');
  D.notes(s, `QUICK CHECK ANSWER: The plasma becomes more dilute than the inside of the red blood cells; water moves into the cells by osmosis; they swell and may burst (they have no cell wall). 1.5 ÷ 75 × 100 = 2%.\nThis slide shows WHY water and ion concentration must be kept constant (B5.4.1), using osmosis from B3 and red blood cells from B5.1 (recap). How the body controls water balance (kidneys, nephron, ADH) is J257 only and is not taught. Node: ${athLoss} ÷ ${athM} × 100 = ${athPct}%; 2% of 75 = 1.5. Hospital drips are isotonic saline for this reason.`);
  reg(s, 'B5.4.1 Why constant: water and cells');
}

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B5.4.1')} • why enzymes and cells need constant conditions`, [
  { q: 'Explain why a core body temperature of **43 °C** could kill a person.', marks: 2, ms: 'Enzymes are denatured / active site changes shape (1); reactions in cells stop / slow greatly, so cells / organs stop working (1).' },
  { q: 'Explain why a body temperature that is **too low** is also dangerous.', marks: 2, ms: 'Enzyme-controlled reactions are too slow / molecules have less kinetic energy, fewer collisions (1); so cells cannot release enough energy / carry out life processes fast enough (1).' },
  { q: 'Red blood cells are put in a **very concentrated** salt solution. Describe and explain what happens to them.', marks: 3, ms: 'Water leaves the cells (1); by osmosis, from the more dilute cytoplasm to the more concentrated solution (1); the cells shrink / crinkle (1).' },
  { q: 'A 50 kg runner loses **1.0 kg** of water. Calculate the percentage of body mass lost.', marks: 1, ms: '1.0 ÷ 50 × 100 = 2% (1).' },
]);
calc('R2 1.0 / 50 × 100', 1.0 / 50 * 100, 2, 1e-9);
reg(R2.s, 'Recap 2');

// ======================= 11 CONTROL SYSTEMS =======================
{
  const s = D.contentHeader('Control systems in homeostasis', `Specification ${sp('B5.4.1')} • homeostasis depends on receptors, nerves, hormones and effectors`, { tag: 'B5.4.1' });
  D.panel(s, 0.45, 1.3, 12.43, 2.95, 'a general control system, with core temperature as the example');
  const steps = [
    ['Change', 'core temperature **rises** above 37\u00a0°C', C.red, 'chg'],
    ['Receptor', '**temperature receptors** detect the change', C.green, 'rec'],
    ['Coordination centre', 'the **brain** compares it with the set point', '6A4C93', 'brain'],
    ['Effector', '**muscles** or **glands**, e.g. sweat glands', C.orange, 'eff'],
    ['Response', 'temperature **falls** back to normal', C.blue, 'resp'],
  ];
  const bw = 2.2, gap = 0.3, x0 = 0.65;
  steps.forEach(([h, t, col, ic], i) => {
    const x = x0 + i * (bw + gap);
    box(s, x, 1.45, bw, 0.45, col, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, x, 1.45, bw, h, { size: 12, bold: true, color: C.white, h: 0.45 });
    box(s, x, 1.95, bw, 1.55, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    const icx = x + bw / 2, icy = 2.3;
    if (ic === 'chg') { thermo(s, icx - 0.3, 2.0, 0.5, 0.85, C.red, { w: 0.08, r: 0.06 }); arrow(s, icx + 0.05, 2.5, icx + 0.05, 2.05, C.red, 2); }
    if (ic === 'rec') sensorIcon(s, icx, icy, 1.1);
    if (ic === 'brain') brainIcon(s, icx, icy, 1);
    if (ic === 'eff') { muscleIcon(s, icx - 0.4, icy, 0.6); glandIcon(s, icx + 0.4, icy, 0.9); }
    if (ic === 'resp') { thermo(s, icx - 0.3, 2.0, 0.5, 0.45, C.red, { w: 0.08, r: 0.06 }); arrow(s, icx + 0.05, 2.05, icx + 0.05, 2.5, COLD, 2); }
    label(s, x + 0.08, 2.7, bw - 0.16, t, { size: 10.5, h: 0.75, valign: 'top' });
    if (i < 4) arrow(s, x + bw + 0.02, 2.6, x + bw + gap - 0.02, 2.6, C.ink, 2);
  });
  // feedback loop
  const xl = x0 + bw / 2, xr = x0 + 4 * (bw + gap) + bw / 2;
  line(s, xr, 3.5, xr, 3.75, C.red, 1.5, { dash: 'dash' });
  line(s, xl, 3.75, xr, 3.75, C.red, 1.5, { dash: 'dash' });
  arrow(s, xl, 3.75, xl, 3.52, C.red, 1.5);
  label(s, 3.2, 3.77, 6.9, '**negative feedback**: the response cancels out the original change', { size: 10.5, color: C.red, h: 0.24 });
  D.card(s, 0.45, 4.4, 6.1, 1.85, 'Parts of a control system', [
    '**Receptors** detect a change (stimulus) inside or outside the body.',
    'A **coordination centre** (brain, spinal cord or a gland such as the pancreas) processes the information and sends signals.',
    '**Effectors** (muscles or glands) bring conditions back. Signals travel by **nerves** (fast) or **hormones** (slower).',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: name the parts', 'During exercise the CO₂ level in the blood rises and you breathe faster.', [
    ['Receptor', 'chemical receptors detect the rise in CO₂'], ['Coordination', 'the brain sends impulses along nerves'], ['Effector', 'breathing muscles contract faster: more CO₂ is breathed out']], { size: 10.5 });
  D.quickCheck(s, 'Name the **two** types of effector. Why does homeostasis need **receptors** as well as effectors?');
  D.notes(s, 'QUICK CHECK ANSWER: Muscles and glands. Receptors are needed to detect a change in the condition (stimulus); without them, the coordination centre could not know when (or which way) to switch on the effectors.\nJ260 specification text (search extract): "The maintenance of a constant internal environment is homeostasis, and depends on receptors, nerves, hormones and (often antagonistic) effectors to counteract changes." The control system was met in B5.2 (reflex arc) and B5.3 (endocrine). The temperature example names receptors, brain and sweat glands only: details of the thermoregulatory centre (hypothalamus), vasodilation/vasoconstriction and hair erection are J257 Biology B only. The hypothalamus can be named as a stretch.');
  reg(s, 'B5.4.1 Control systems');
}

// ======================= 12 NEGATIVE FEEDBACK =======================
{
  const g = { x: 1.35, y: 1.75, w: 4.85, h: 3.2, xmin: 0, xmax: 60, ymin: 36, ymax: 38, xstep: 10, ystep: 0.5, minor: 2, xlabel: 'Time / min', ylabel: 'Core temperature / °C', yfmt: v => v.toFixed(1) };
  reg(D.contentSlide({
    title: 'Negative feedback and the set point',
    subtitle: `Specification ${sp('B5.4.1')} • recap of B5.3: a change switches on a response that reverses it`,
    tag: 'B5.4.1', caption: 'core temperature of a healthy person, plotted to scale; set point 37 °C',
    draw: (s, p) => {
      D.axes(s, g);
      box(s, g.x, D.py(g, 37.3), g.w, D.py(g, 36.7) - D.py(g, 37.3), 'D8F0E2', null, { tr: 45 });
      line(s, g.x, D.py(g, SET), g.x + g.w, D.py(g, SET), C.green, 1.5, { dash: 'dash' });
      D.fnLine(s, g, fb, 0, 60, 120, C.red, 2.5);
      label(s, g.x + g.w - 1.25, D.py(g, SET) - 0.05, 1.25, 'set point', { size: 10, bold: true, color: C.green, align: 'right', h: 0.24 });
      label(s, D.px(g, 0.5), D.py(g, 37.95), 2.5, 'above set point → effectors **cool** the body', { size: 10, color: C.red, align: 'left', h: 0.42, valign: 'top' });
      arrow(s, D.px(g, 5), D.py(g, 37.62), D.px(g, 5), D.py(g, 37.38), C.red, 1.25);
      label(s, D.px(g, 13), D.py(g, 36.3), 2.6, 'below set point → effectors **warm** the body', { size: 10, color: COLD, align: 'left', h: 0.42, valign: 'top' });
      arrow(s, D.px(g, 15), D.py(g, 36.38), D.px(g, 15), D.py(g, 36.62), COLD, 1.25);
    },
    head: 'Negative feedback',
    lines: [
      'Each condition has a normal level, the **set point** (37 °C for core temperature).',
      'If the level **rises**, the response makes it **fall**; if it **falls**, the response makes it **rise**.',
      'So the level goes up and down a little but stays **close** to the set point.',
      'You met this with **thyroxine** in B5.3. Most homeostasis uses negative feedback.',
    ],
    size: 11,
    worked: { head: 'Worked example: read the graph', q: 'Find the highest and lowest core temperature on the graph, and the range.',
      steps: [['Highest', `${fmt(fb(5))} °C (at 5 min)`], ['Lowest', `${fmt(fb(15))} °C (at 15 min)`], ['Answer', `range = ${fmt(fb(5))} − ${fmt(fb(15))} = ${fmt(fb(5) - fb(15))} °C`]], size: 10.5 },
    workedH: 1.75,
    qc: 'Explain why it is called **negative** feedback. Why does the line never stay **exactly** on 37 °C?',
    notes: `QUICK CHECK ANSWER: The response is opposite to (reverses / cancels) the change: a rise produces a fall and a fall produces a rise. The receptors only detect a change after it has happened, and the effectors take time to act, so the level overshoots a little each way: it fluctuates around the set point.\nGraph: T = 37 + 0.3 sin(2πt/20), plotted to scale; max ${fmt(fb(5))}, min ${fmt(fb(15))}, range ${fmt(fb(5) - fb(15))} °C (node). Real core temperature also varies by about 0.5 °C over a day. Negative feedback is taught in B5.3 (thyroxine, TSH); recap only.`,
  }), 'B5.4.1 Negative feedback (recap)');
}

// ======================= 13 ANTAGONISTIC EFFECTORS =======================
reg(D.contentSlide({
  title: 'Antagonistic effectors',
  subtitle: `Specification ${sp('B5.4.1')} • two effectors that push in opposite directions give faster, finer control`,
  tag: 'B5.4.1', caption: 'one effector compared with a pair of antagonistic effectors',
  draw: (s, p) => {
    // left: one effector
    label(s, 0.65, 1.42, 2.7, 'One effector only', { size: 12, bold: true, color: C.ink, align: 'left' });
    const sc = (x) => { box(s, x - 0.07, 1.95, 0.14, 2.6, 'F7FAFC', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.07 }); line(s, x - 0.25, 3.25, x + 0.25, 3.25, C.green, 2, { dash: 'dash' }); };
    sc(1.3);
    label(s, 0.6, 3.1, 0.45, 'set', { size: 10, color: C.green, h: 0.3 });
    ball(s, 1.3, 3.25, 0.13, C.ink, C.ink);
    arrow(s, 1.65, 3.95, 1.65, 3.4, HOT, 3);
    label(s, 1.8, 3.6, 1.6, '**heater**: pushes up', { size: 10.5, color: HOT, align: 'left', h: 0.3 });
    arrow(s, 1.65, 2.55, 1.65, 3.05, '9AA3B0', 1.5, { dash: 'dash' });
    label(s, 1.8, 2.45, 1.6, 'cooling: slow, just heat loss', { size: 10, color: C.grey, align: 'left', h: 0.42, valign: 'top' });
    // right: antagonistic pair
    label(s, 3.6, 1.42, 2.8, 'Antagonistic pair', { size: 12, bold: true, color: C.ink, align: 'left' });
    sc(4.2);
    label(s, 3.5, 3.1, 0.45, 'set', { size: 10, color: C.green, h: 0.3 });
    ball(s, 4.2, 3.25, 0.13, C.ink, C.ink);
    arrow(s, 4.55, 3.95, 4.55, 3.4, HOT, 3);
    label(s, 4.7, 3.6, 1.7, '**warming** effector', { size: 10.5, color: HOT, align: 'left', h: 0.3 });
    arrow(s, 4.55, 2.55, 4.55, 3.1, COLD, 3);
    label(s, 4.7, 2.5, 1.7, '**cooling** effector', { size: 10.5, color: COLD, align: 'left', h: 0.3 });
    line(s, 3.45, 1.85, 3.45, 4.6, C.line, 1, { dash: 'dash' });
    // body examples
    box(s, 0.65, 4.75, 5.7, 1.05, C.white, C.orange, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    muscleIcon(s, 1.1, 5.08, 0.6); dropIcon(s, 3.55, 5.18, 0.1);
    label(s, 1.5, 4.8, 1.9, '**Shivering**: muscles contract, respiration releases heat', { size: 10, align: 'left', h: 0.55, valign: 'top' });
    label(s, 3.75, 4.8, 2.5, '**Sweating**: sweat glands release sweat that cools the skin', { size: 10, align: 'left', h: 0.55, valign: 'top' });
    label(s, 0.75, 5.43, 5.5, 'Body example: one effector warms, the other cools', { size: 10, italic: true, color: C.orange, h: 0.3 });
  },
  head: 'Two effectors, opposite effects',
  lines: [
    '**Antagonistic** effectors have **opposite** effects on the same condition.',
    'With only **one** effector, the body can push the level one way; it must wait for it to drift back the other way.',
    'With **two**, it can correct a change in **either** direction straight away, so the level stays **closer** to the set point.',
    'Like driving: an **accelerator** and a **brake** give better control of speed than an accelerator alone.',
  ],
  size: 12,
  worked: { head: 'Worked example: explain', q: 'Explain why antagonistic effectors keep body temperature more constant than one effector.',
    steps: [['One effector', 'can only push temperature one way; the other way is slow'], ['Two effectors', 'one raises it, the other lowers it'], ['Answer', 'any change is corrected quickly: smaller ups and downs']], size: 10.5 },
  workedH: 1.85,
  qc: 'Which pair are antagonistic for body temperature: (a) sweating and shivering (b) shivering and breathing faster? Explain your choice.',
  notes: 'QUICK CHECK ANSWER: (a): sweating cools the body and shivering warms it, so they have opposite effects on the same condition. (b) is not a pair: breathing faster does not lower temperature in humans (it controls CO₂).\nThe J260 specification text (search extract) says homeostasis depends on "(often antagonistic) effectors" and suggests modelling one effector vs antagonistic effectors with a beaker of water (next slides). Sweating and shivering are named only as examples of effectors with opposite effects; how the skin controls heat loss (vasodilation, vasoconstriction, hair erection) is J257 only. Insulin and glucagon are another antagonistic pair: taught in B5.6.',
}), 'B5.4.1 Antagonistic effectors');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B5.4.1')} • control systems, negative feedback, antagonistic effectors`, [
  { q: 'Name the **three** main parts of a control system in homeostasis, in order.', marks: 2, ms: 'Receptor, coordination centre, effector (2). All three in the correct order = 2; all three named but in the wrong order = 1.' },
  { q: 'Give **two** ways that information travels from the coordination centre to the effectors.', marks: 2, ms: 'Nerves / electrical impulses (1); hormones in the blood (1).' },
  { q: 'Explain what is meant by **negative feedback**.', marks: 2, ms: 'A change from the set point / normal level is detected (1); the response reverses the change / brings the level back to normal (1).' },
  { q: 'Explain why having **antagonistic** effectors gives better control than having one effector.', marks: 2, ms: 'The effectors have opposite effects / one increases the level and one decreases it (1); so a change in either direction can be corrected quickly / the level stays closer to the set point / smaller fluctuations (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 PRACTICAL: MODEL — METHOD =======================
reg(D.contentSlide({
  title: 'Suggested practical: modelling control at 40 °C',
  subtitle: `Specification ${sp('B5.4.1')} • keep a beaker of water at 40 °C with one effector, then with antagonistic effectors`,
  tag: 'Practical', pag: true, caption: 'run A: Bunsen burner only • run B: Bunsen burner and ice',
  draw: (s, p) => {
    label(s, 0.6, 1.42, 2.9, 'Run A: one effector', { size: 11.5, bold: true, color: HOT, align: 'left' });
    label(s, 3.55, 1.42, 2.9, 'Run B: antagonistic effectors', { size: 11.5, bold: true, color: COLD, align: 'left' });
    const yb = 5.55;
    const A = beakerRig(s, 2.2, yb);
    const B = beakerRig(s, 4.75, yb, { ice: true });
    // labels for A
    callout(s, 0.55, 2.6, 1.0, 'thermometer', 2.38, 2.6, C.ink, { size: 10 });
    callout(s, 0.55, 3.75, 1.0, 'water', A.bx + 0.1, 3.75, '2F5F8F', { size: 10 });
    callout(s, 0.55, 4.25, 1.0, 'tripod, gauze', 1.62, 4.25, C.ink, { size: 10 });
    callout(s, 0.55, 4.95, 1.0, 'Bunsen: heats', 2.14, 4.95, HOT, { size: 10 });
    // ice dish for B
    box(s, 5.55, 2.2, 0.75, 0.42, 'F7FBFD', '7FA9C4', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1 });
    iceCube(s, 5.62, 2.27, 0.18); iceCube(s, 5.84, 2.3, 0.16); iceCube(s, 6.05, 2.26, 0.17);
    label(s, 5.4, 1.85, 1.05, 'ice: cools', { size: 10, bold: true, color: COLD, h: 0.3 });
    arrow(s, 5.6, 2.65, B.bx + 0.75, B.top - 0.05, COLD, 1.5);
    label(s, 0.6, yb + 0.07, 5.8, 'bench • heat-proof mat under each Bunsen', { size: 10, italic: true, color: C.grey, h: 0.24 });
  },
  head: 'Method',
  lines: [
    'Heat water in a beaker to **40 °C**. Start the stop clock.',
    '**Run A**: you may only **heat** (Bunsen on or off, or move it). Read the temperature every **minute** for 10 min.',
    '**Run B**: you may **heat** with the Bunsen **or cool** by adding a small ice cube. Record every minute for 10 min.',
    'Plot both runs on one graph and compare how close each stays to 40 °C.',
  ],
  size: 10.5,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'one effector (heat only) or two (heat and ice)'], ['Dependent', 'water temperature every minute'], ['Control', 'same volume of water, beaker, target 40 °C, time'], ['Safety', 'hot water and flame: goggles, tie hair back, do not move the hot beaker']], size: 10.5 },
  workedH: 2.05,
  qc: 'In this model, what do the **Bunsen burner** and the **ice** represent in the body? What does the **thermometer** plus the **student** represent?',
  notes: 'QUICK CHECK ANSWER: The Bunsen and the ice are the antagonistic effectors (e.g. shivering muscles warm, sweat glands cool). The thermometer is the receptor; the student reading it and deciding what to do is the coordination centre (brain). The model is a negative feedback system.\nSuggested activity from the J260 specification text (search extract): "Model the control of temperature by trying to keep a beaker of water at 40 °C using just a Bunsen burner (single effector) compared to a Bunsen burner and ice (antagonistic effectors)." No PAG code was found for it, so the slide uses the "SUGGESTED PRACTICAL" pill. A 250 cm³ beaker with 150 cm³ water works well; an electric hot plate can replace the Bunsen. Data on the next slide are illustrative.',
}), 'Practical: modelling control (method)');

// ======================= 16 PRACTICAL: MODEL — RESULTS =======================
{
  const s = D.contentHeader('Modelling control: results and analysis', `Specification ${sp('B5.4.1')} • sample class data: temperature every minute for 10 minutes`, { pag: true, tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'both runs plotted to scale from the table; target 40 °C dashed');
  const g = { x: 1.35, y: 1.6, w: 4.95, h: 3.6, xmin: 0, xmax: 10, ymin: 38, ymax: 44, xstep: 1, ystep: 1, minor: 2, xlabel: 'Time / min', ylabel: 'Water temperature / °C' };
  D.axes(s, g);
  line(s, g.x, D.py(g, TGT), g.x + g.w, D.py(g, TGT), C.green, 1.5, { dash: 'dash' });
  const ptsA = RUN_A.map((v, i) => [i, v]), ptsB = RUN_B.map((v, i) => [i, v]);
  D.plotLine(s, g, ptsA, HOT, 2.25); D.points(s, g, ptsA, HOT);
  D.plotLine(s, g, ptsB, COLD, 2.25); D.points(s, g, ptsB, COLD);
  label(s, D.px(g, 3.3), D.py(g, 43.55), 2.4, 'A: Bunsen only', { size: 10.5, bold: true, color: HOT, align: 'left', h: 0.26 });
  label(s, D.px(g, 5.2), D.py(g, 39.45), 2.4, 'B: Bunsen and ice', { size: 10.5, bold: true, color: COLD, align: 'left', h: 0.26 });
  label(s, g.x + g.w - 0.85, D.py(g, TGT) - 0.27, 0.85, '40 °C', { size: 10, bold: true, color: C.green, align: 'right', h: 0.24 });
  // table: transposed
  const head = [HDR('Time / min'), ...RUN_A.map((_, i) => HDR(String(i)))];
  const rowA = [tcell('A / °C', 0, { bold: true, color: HOT, align: 'left' }), ...RUN_A.map(v => tcell(fmt(v), 0))];
  const rowB = [tcell('B / °C', 1, { bold: true, color: COLD, align: 'left' }), ...RUN_B.map(v => tcell(fmt(v), 1))];
  s.addTable([head, rowA, rowB], { x: 6.8, y: 1.3, w: 6.08, colW: [0.88, ...Array(11).fill(5.2 / 11)], rowH: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  const stat = [[HDR(''), HDR('Run A'), HDR('Run B')],
    [tcell('Range / °C', 0, { bold: true, align: 'left' }), tcell(fmt(rA), 0), tcell(fmt(rB), 0)],
    [tcell('Biggest difference from 40 °C', 1, { bold: true, align: 'left' }), tcell(fmt(dA), 1), tcell(fmt(dB), 1)],
    [tcell('Mean / °C (3 s.f.)', 0, { bold: true, align: 'left' }), tcell(fmt(sf(mA, 3)), 0), tcell(fmt(sf(mB, 3)), 0)]];
  s.addTable(stat, { x: 6.8, y: 2.35, w: 6.08, colW: [3.08, 1.5, 1.5], rowH: 0.29, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 3.65, 6.08, 1.35, 'Worked example: range and mean for run B', '', [
    ['Range', `highest − lowest = ${Math.max(...RUN_B)} − ${Math.min(...RUN_B)} = ${fmt(rB)} °C`],
    ['Answer', `mean = sum ÷ 11 = ${fmt(RUN_B.reduce((a, b) => a + b, 0))} ÷ 11 = ${fmt(sf(mB, 3))} °C (3 s.f.)`]], { size: 10.5 });
  D.card(s, 6.8, 5.1, 6.08, 1.15, 'Sources of error and improvements', [
    'Thermometer read late or at an angle → use a **data logger** and probe; read at eye level.',
    'Water not mixed: hot and cold patches → **stir** before each reading.',
  ], { size: 10.5 });
  D.quickCheck(s, `Which run kept the temperature closer to 40 °C? Use the **range** and the **biggest difference** to explain. Why does run A take so long to come back down?`);
  D.notes(s, `QUICK CHECK ANSWER: Run B: range ${fmt(rB)} °C vs ${fmt(rA)} °C; biggest difference from 40 °C ${fmt(dB)} °C vs ${fmt(dA)} °C; run A was above 41 °C for ${minsAbove41A} of the 11 readings, run B for none. In run A the only way to cool is to turn off the Bunsen and wait for heat to be lost to the surroundings, which is slow; in run B ice can be added to cool quickly (antagonistic effector).\nNode: A = ${RUN_A.join(', ')}; B = ${RUN_B.join(', ')}; ranges ${rA} and ${rB}; max deviations ${dA} and ${dB}; means ${mA.toFixed(4)} and ${mB.toFixed(4)}. Data are illustrative class results. Link to the body: the body has antagonistic effectors (e.g. sweating vs shivering), so core temperature stays within about ±0.5 °C.`);
  reg(s, 'Practical: modelling control (results)');
}

// ======================= 17 PRACTICAL: SKIN VS CORE =======================
{
  const s = D.contentHeader('Suggested practical: skin and core temperature', `Specification ${sp('B5.4.1')} • compare skin temperature and core body temperature under different conditions`, { pag: true, tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 3.3, 4.95, 'where to measure');
  const P = body(s, 2.1, 1.55, 0.88);
  // ear thermometer
  box(s, 0.62, 1.55, 0.5, 0.2, '8C96A8', '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
  line(s, 1.12, 1.65, P.ear[0] + 0.02, P.ear[1], '5A6275', 2);
  label(s, 0.55, 1.8, 1.25, '**core**: ear (or under the tongue)', { size: 10, color: C.red, align: 'left', h: 0.62, valign: 'top' });
  // skin probe on hand
  ball(s, P.handR[0] + 0.02, P.handR[1] - 0.15, 0.06, C.ink, C.ink);
  line(s, P.handR[0] + 0.02, P.handR[1] - 0.15, 3.55, 4.4, C.ink, 1.25);
  box(s, 3.15, 4.4, 0.5, 0.36, 'E6EBF2', '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, 3.15, 4.4, 0.5, '24.0', { size: 10, bold: true, h: 0.36 });
  label(s, 2.5, 4.8, 1.2, '**skin**: probe on back of hand', { size: 10, color: COLD, align: 'right', h: 0.62, valign: 'top' });
  // table
  const rows = [[HDR('Condition'), HDR('Core / °C'), HDR('Skin / °C')],
    ...SKm.map(([n, c, k], i) => [tcell(n, i, { align: 'left' }), tcell(c.toFixed(1), i, { color: C.red, bold: true }), tcell(k.toFixed(1), i, { color: COLD, bold: true })])];
  s.addTable(rows, { x: 3.95, y: 1.3, w: 4.7, colW: [2.5, 1.1, 1.1], rowH: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 3.95, 2.83, 4.7, 'each value is the mean of 3 readings', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.22 });
  // bar chart
  const g = { x: 4.5, y: 3.2, w: 4.0, h: 2.35, xmin: 0, xmax: 4, ymin: 0, ymax: 40, xstep: 1, ystep: 10, grid: true, minor: 2, ylabel: 'Temperature / °C' };
  D.box(s, g.x, g.y, g.w, g.h, C.white, null);
  for (let v = 0; v <= 40; v += 5) line(s, g.x, D.py(g, v), g.x + g.w, D.py(g, v), v % 10 ? 'E3EFED' : 'C5DCD9', 0.5);
  line(s, g.x, g.y + g.h, g.x + g.w, g.y + g.h, C.ink, 1.5); line(s, g.x, g.y, g.x, g.y + g.h, C.ink, 1.5);
  for (let v = 0; v <= 40; v += 10) { line(s, g.x - 0.06, D.py(g, v), g.x, D.py(g, v), C.ink, 1); label(s, g.x - 0.45, D.py(g, v) - 0.1, 0.38, String(v), { size: 10, h: 0.2, align: 'right' }); }
  label(s, g.x - 0.6 - g.h / 2, g.y + g.h / 2 - 0.14, g.h, 'Temperature / °C', { size: 10, bold: true, rotate: 270 });
  const short = ['Rest', 'Cold water', 'Exercise', 'Outside 5 °C'];
  SKm.forEach(([, c, k], i) => {
    const cx = D.px(g, i + 0.5), bw = 0.32;
    box(s, cx - bw - 0.02, D.py(g, c), bw, D.py(g, 0) - D.py(g, c), HOT, '8E2A33', { lw: 0.5 });
    box(s, cx + 0.02, D.py(g, k), bw, D.py(g, 0) - D.py(g, k), COLD, '1F4E8C', { lw: 0.5 });
    label(s, cx - 0.5, g.y + g.h + 0.04, 1.0, short[i], { size: 10, h: 0.22 });
  });
  box(s, 6.95, 5.97, 0.18, 0.14, HOT, null); label(s, 7.17, 5.92, 0.6, 'core', { size: 10, align: 'left', h: 0.24 });
  box(s, 7.75, 5.97, 0.18, 0.14, COLD, null); label(s, 7.97, 5.92, 0.6, 'skin', { size: 10, align: 'left', h: 0.24 });
  label(s, 3.95, 5.92, 2.95, 'bar chart to scale from the means', { size: 10, italic: true, color: C.grey, h: 0.24, align: 'left' });
  D.card(s, 8.85, 1.3, 4.03, 2.85, 'Method and safety', [
    'Measure **core** temperature with an ear (or digital oral) thermometer.',
    'Measure **skin** temperature with a probe on the back of the hand.',
    'Take 3 readings in each condition; find the **mean**.',
    'Safety: cold water no colder than 10 °C, max 5 min; stop if it hurts; mild exercise only; clean the thermometer between uses.',
  ], { size: 10 });
  D.workedSteps(s, 8.85, 4.25, 4.03, 2.0, 'Worked example: compare ranges', '', [
    ['Core', `${Math.max(...SKm.map(r => r[1])).toFixed(1)} − ${Math.min(...SKm.map(r => r[1])).toFixed(1)} = ${coreR.toFixed(1)} °C`],
    ['Skin', `${Math.max(...SKm.map(r => r[2])).toFixed(1)} − ${Math.min(...SKm.map(r => r[2])).toFixed(1)} = ${skinR.toFixed(1)} °C`],
    ['Answer', `skin varies about ${fmt(sf(skinR / coreR, 2))} times as much as core`]], { size: 10.5 });
  D.quickCheck(s, 'Skin temperature changed by over 12 °C but core temperature by less than 1 °C. Explain why it matters **more** to keep **core** temperature constant.');
  D.notes(s, `QUICK CHECK ANSWER: The core contains the vital organs (brain, heart, liver, etc.) whose cells and enzymes must stay near 37 °C to work; the skin is at the surface and can cool or warm without serious harm (and changing skin temperature is how the body gains or loses heat). Homeostasis keeps the core constant.\nSuggested activity from the J260 specification text (search extract): "Compare skin temperature and core body temperature under different conditions." No PAG code found: "SUGGESTED PRACTICAL" pill. Data illustrative (3 readings each; means asserted in node): ${SKm.map(([n, c, k]) => `${n}: core ${c.toFixed(1)}, skin ${k.toFixed(1)}`).join('; ')}. Core range ${coreR}, skin range ${skinR}, ratio ${(skinR / coreR).toFixed(2)}.\nEthics/safety: students volunteer and may opt out; no one with a heart condition or Raynaud's does the cold-water step. Why skin temperature changes (blood flow, vasoconstriction) is J257 only: do not develop it here.`);
  reg(s, 'Practical: skin vs core temperature');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B5.4.1')} • the two suggested practicals`, [
  { q: 'In the beaker model, what part of a control system is the **thermometer**? What is the **ice**?', marks: 2, ms: 'Thermometer: receptor (1). Ice: effector (a cooling / antagonistic effector) (1).' },
  { q: 'A student kept a beaker between **36.8 °C** and **37.2 °C**. Calculate the range.', marks: 1, ms: '37.2 − 36.8 = 0.4 °C (1).' },
  { q: 'Give **two** variables that should be kept the same in both runs of the beaker model.', marks: 2, ms: 'Any two (1 each): volume of water; size / type of beaker; target temperature (40 °C); time between readings / total time; same thermometer; same Bunsen flame / heat source; size of ice cubes.' },
  { q: 'A student\'s skin temperature fell from **34.0 °C** to **25.5 °C** outside, but core temperature stayed at **37.0 °C**. Calculate the fall in skin temperature and explain why the core stayed the same.', marks: 3, ms: '34.0 − 25.5 = 8.5 °C (1); core temperature is kept constant by homeostasis / negative feedback (1); so that enzymes in the vital organs keep working at their optimum (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 OUTSIDE THE SAFE RANGE =======================
{
  const s = D.contentHeader('When conditions go outside the safe range', `Specification ${sp('B5.4.1')} • small changes are corrected; big changes can be fatal`, { tag: 'B5.4.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'core temperature and water loss: approximate limits for an adult');
  // temperature scale (vertical) 30 to 44 °C
  const y0 = 1.6, y1 = 5.6, tmin = 30, tmax = 44, yT = t => y1 - (t - tmin) / (tmax - tmin) * (y1 - y0);
  const zones = [[30, 35, 'C9DDF5', 'Hypothermia below 35 °C: enzymes too slow; confusion, heart stops'], [35, 36.5, 'E4EEF9', ''], [36.5, 37.5, 'BFE6CF', 'Normal 36.5–37.5 °C'], [37.5, 40, 'FBE3C8', 'Fever 38 °C +'], [40, 44, 'F6C3C3', 'Heat stroke above 40 °C: enzymes denature; organs fail']];
  zones.forEach(([a, b, col]) => box(s, 1.3, yT(b), 0.55, yT(a) - yT(b), col, null));
  box(s, 1.3, y0, 0.55, y1 - y0, null, '6B7385', { lw: 1.25 });
  for (let t = 30; t <= 44; t += 2) { line(s, 1.85, yT(t), 2.0, yT(t), C.ink, 1); label(s, 0.7, yT(t) - 0.11, 0.55, `${t} °C`, { size: 10, h: 0.22, align: 'right' }); }
  thermo(s, 1.575, y0 + 0.05, y1 - y0 - 0.05, (37 - tmin) / (tmax - tmin), C.red, { w: 0.12, r: 0.11 });
  [[32.5, zones[0][3], COLD], [37, zones[2][3], C.green], [38.8, zones[3][3], C.orange], [42, zones[4][3], C.red]].forEach(([t, txt, col]) => {
    line(s, 2.0, yT(t), 2.2, yT(t), col, 1.25);
    label(s, 2.25, yT(t) - 0.24, 1.65, txt, { size: 10, color: col, bold: true, align: 'left', h: 0.6, valign: 'middle' });
  });
  // water loss bar (horizontal stack) on the right
  label(s, 4.0, 1.45, 2.4, 'Water lost, % of body mass', { size: 10.5, bold: true, color: '2F5F8F' });
  const wl = [[0, 2, 'D8EAF7', '1–2%: thirst'], [2, 5, 'A9CBEA', '3–5%: tired, headache, worse performance'], [5, 10, '6E9FD3', '6–10%: dizzy, confused; needs treatment'], [10, 12, '2F5F8F', '10% +: can be fatal']];
  const xw = 4.25, ywTop = 1.85, ywBot = 5.6, yv = v => ywTop + v / 12 * (ywBot - ywTop);
  wl.forEach(([a, b, col, t]) => { box(s, xw, yv(a), 0.42, yv(b) - yv(a), col, '2F5F8F', { lw: 0.5 }); label(s, xw + 0.5, (yv(a) + yv(b)) / 2 - 0.3, 1.6, t, { size: 10, align: 'left', h: 0.6, valign: 'middle' }); });
  [0, 2, 5, 10].forEach(v => label(s, xw - 0.42, yv(v) - 0.1, 0.38, `${v}%`, { size: 10, h: 0.2, align: 'right' }));
  D.card(s, 6.8, 1.3, 6.08, 2.65, 'Why homeostasis matters', [
    'Homeostasis copes with **small** changes all the time.',
    'If a change is **too big** or lasts **too long**, the body cannot correct it and conditions leave the safe range.',
    'Cells and enzymes then stop working properly: **organs fail**. This is why core temperature and water content are kept within narrow limits.',
    'People can help their bodies: warm clothes, shade, cool drinks, rest.',
  ], { size: 11.5 });
  D.workedSteps(s, 6.8, 4.1, 6.08, 2.15, 'Worked example: how close to danger?', 'A marathon runner\'s core temperature rises from 37.0 °C to 38.5 °C. How far is this from normal, and from heat stroke (40 °C)?', [
    ['Rise', '38.5 − 37.0 = 1.5 °C above normal'], ['Margin', '40 − 38.5 = 1.5 °C below heat stroke'], ['Answer', 'the runner should slow down, drink and cool off']], { size: 10.5 });
  D.quickCheck(s, 'Use the chart: a 70 kg walker loses **7 kg** of water in a desert. Calculate the % of body mass lost and describe the danger.');
  D.notes(s, 'QUICK CHECK ANSWER: 7 ÷ 70 × 100 = 10% of body mass: severe dehydration; can be fatal; body fluids become too concentrated so cells lose water by osmosis and cannot work; needs urgent treatment.\nLimits are approximate textbook values (illustrative): hypothermia below 35 °C; normal about 36.5–37.5 °C; fever from about 38 °C; heat stroke above about 40 °C. Dehydration bands are approximate. Node: 38.5 − 37.0 = 1.5; 40 − 38.5 = 1.5; 10% of 70 = 7.\nOverlap: B5.6 covers what happens when organs and control systems stop working (diabetes); this slide only explains why the limits matter (B5.4.1).');
  reg(s, 'B5.4.1 Outside the safe range');
}
calc('runner margin to heat stroke 40 − 38.5', 40 - 38.5, 1.5, 1e-9);
calc('QC 7 / 70 × 100', 7 / 70 * 100, 10, 1e-9);

// ======================= 20 PUTTING IT TOGETHER =======================
{
  const s = D.contentHeader('Putting it together: a run on a hot day', `Specification ${sp('B5.4.1')} • several conditions change at once; each is detected and counteracted`, { tag: 'B5.4.1' });
  D.panel(s, 0.45, 1.3, 3.3, 4.95, 'changes during a run');
  body(s, 2.1, 1.75, 0.82);
  sunIcon(s, 0.95, 1.75, 0.18);
  label(s, 0.55, 2.05, 0.9, 'hot sun', { size: 10, bold: true, color: C.orange, h: 0.24 });
  [[2.6, 3.2], [1.6, 3.5], [2.4, 4.05]].forEach(([x, y]) => dropIcon(s, x, y, 0.07));
  label(s, 0.55, 5.55, 3.1, 'muscles respire faster: **heat**, **CO₂**; water lost in **sweat**', { size: 10, h: 0.55, valign: 'top' });
  const rows = [[HDR('Condition'), HDR('Change'), HDR('Internal / external?'), HDR('Why it is a problem'), HDR('Effector response')],
    ['Core temperature', 'rises', 'both: sun and respiration', 'enzymes may denature', 'sweat glands: sweating cools'],
    ['Water content', 'falls', 'internal: sweating', 'cells lose water by osmosis', 'thirst: drink more'],
    ['CO₂ level', 'rises', 'internal: respiration', 'lowers the pH of the blood', 'breathing muscles: faster, deeper'],
    ['Blood glucose', 'falls', 'internal: used in respiration', 'too little for respiration', 'hormones (learn in B5.6)'],
  ].map((r, i) => i === 0 ? r : r.map((t, j) => tcell(t, i, { bold: j === 0 })));
  s.addTable(rows, { x: 3.95, y: 1.3, w: 8.93, colW: [1.55, 0.85, 2.05, 2.2, 2.28], rowH: 0.48, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 3.95, 3.85, 4.35, 2.4, 'Key idea', [
    'The same control system works for each condition: **receptor → coordination centre → effector**.',
    'Each uses **negative feedback**; many use **antagonistic** effectors.',
    'Nerves give fast responses; hormones give slower, longer ones.',
  ], { size: 10.5 });
  D.workedSteps(s, 8.45, 3.85, 4.43, 2.4, 'Worked example: link the ideas', 'Explain why the runner\'s core temperature must not rise much.', [
    ['Change', 'respiration and the sun add heat'], ['Problem', 'above about 40 °C enzymes denature'], ['Answer', 'so sweating (an effector) cools the body by negative feedback']], { size: 10.5 });
  D.quickCheck(s, 'For the runner, name **one** change that is **external** and **one** that is **internal**. Suggest why the runner should drink water during the race.');
  D.notes(s, 'QUICK CHECK ANSWER: External: heat from the sun / hot air. Internal: heat or CO₂ from respiration in muscles; water lost in sweat; glucose used up. Drinking replaces the water lost in sweat, so body fluids do not become too concentrated (cells would lose water by osmosis) and so sweating can continue to cool the body.\nThis slide pulls B5.4.1 together. Blood glucose control by insulin and glucagon is B5.6, so the response is given only as "hormones". CO₂ and pH: CO₂ dissolves to make the blood more acidic (stretch). Details of how sweating, blood flow and the kidneys work are J257 only.');
  reg(s, 'B5.4.1 Putting it together');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('B5.4.1')} • limits, and why homeostasis matters`, [
  { q: 'Normal core body temperature is about 37 °C. Explain why a core temperature of **33 °C** is dangerous.', marks: 2, ms: 'Enzymes work too slowly (below optimum) (1); so reactions in cells / respiration are too slow for cells / organs to work (hypothermia) (1).' },
  { q: 'A 60 kg hiker loses **4.8 kg** of water. Calculate the percentage of body mass lost.', marks: 2, ms: '4.8 ÷ 60 × 100 (1); = 8% (1).' },
  { q: 'Give **one** internal change and **one** external change during a run on a hot day.', marks: 2, ms: 'Internal: heat / CO₂ from respiration; water lost in sweat; glucose used (1). External: heat from the sun / hot air (1).' },
  { q: 'Explain why **water content** of the body must be kept constant.', marks: 2, ms: 'If body fluids are too concentrated / too dilute, water leaves / enters cells by osmosis (1); cells shrink / swell or burst and cannot work properly (1).' },
]);
calc('R5 4.8 / 60 × 100', 4.8 / 60 * 100, 8, 1e-9);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Homeostasis', 'Keeping a constant internal environment, despite internal and external changes.'],
  ['Internal environment', 'The tissue fluid and blood plasma that surround the body\'s cells.'],
  ['Tissue fluid', 'Fluid from the plasma that bathes the cells; exchanges substances with them.'],
  ['Core temperature', 'Temperature inside the body (vital organs); kept close to 37 °C.'],
  ['Internal change', 'A change caused by the body\'s own activity, e.g. heat from respiration.'],
  ['External change', 'A change caused by the surroundings, e.g. a hot or cold day.'],
  ['Optimum', 'The condition (e.g. temperature, pH) at which an enzyme works fastest.'],
  ['Denatured', 'An enzyme whose active site has changed shape, so it no longer works.'],
  ['Osmosis', 'Net movement of water through a partially permeable membrane, dilute → concentrated.'],
  ['Receptor', 'Cells that detect a change (stimulus) inside or outside the body.'],
  ['Coordination centre', 'Brain, spinal cord or gland that processes information and sends signals.'],
  ['Effector', 'A muscle or gland that brings about a response.'],
  ['Negative feedback', 'A change causes a response that reverses it, back to the set point.'],
  ['Set point', 'The normal level of a condition, e.g. 37 °C for core temperature.'],
  ['Antagonistic effectors', 'Two effectors with opposite effects on the same condition.'],
  ['Dehydration', 'Losing too much water, so body fluids become too concentrated.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. Osmosis and denatured are recap terms from B3.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('The human body keeps a **constant internal environment**. A class models the control of body temperature by keeping a beaker of water at **40 °C**.', [
  { l: 'a', q: 'What is the name for keeping a constant internal environment? Name **two** conditions that are kept constant.', marks: 3, ms: 'Homeostasis (1); any two (1 each): core body temperature, water content, ion / salt concentration, pH, blood glucose, carbon dioxide level.' },
  { l: 'b', q: 'Explain why core body temperature must be kept close to **37 °C**.', marks: 2, ms: 'Enzymes work best at / have an optimum of about 37 °C (1); too high: enzymes denature / too low: reactions too slow, so cells cannot work properly (1).' },
  { l: 'c', q: 'In run B the temperature stayed between **39 °C** and **41.5 °C**. Calculate the range.', marks: 1, ms: '41.5 − 39 = 2.5 °C (1).' },
  { l: 'd', q: 'Run A used only a Bunsen. Run B used a Bunsen **and** ice. Explain why run B kept the temperature closer to 40 °C.', marks: 2, ms: 'Run B had antagonistic effectors / one to heat and one to cool (1); so temperature could be corrected quickly in either direction / in run A it could only cool slowly by losing heat (1).', h: 1.15 },
  { l: 'e', q: 'An **80 kg** footballer loses **2.4 kg** of water in a match. Calculate the percentage of body mass lost.', marks: 2, ms: '2.4 ÷ 80 × 100 (1); = 3% (1).' },
  { l: 'f', q: 'Explain how losing this much water could affect the footballer\'s **cells**.', marks: 3, ms: 'Body fluids / blood plasma become more concentrated (1); water leaves the cells by osmosis (1); cells shrink / cannot work properly (so performance falls) (1).', h: 1.15 },
], 13, { subtitle: `Specification ${sp('B5.4.1')} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'The internal environment is the tissue fluid / plasma around cells; homeostasis keeps it constant.',
    'Conditions kept constant: core temperature (about 37 °C), water and ion concentration, pH, blood glucose, CO₂.',
    'Internal changes, e.g. respiration releases heat and CO₂; sweating loses water. External changes, e.g. hot or cold weather, food and drink.',
    'Enzymes have an optimum temperature and pH: too hot or wrong pH → active site changes shape, denatured; too cold → reactions too slow.',
    'Water: if fluids too concentrated, cells lose water by osmosis and shrink; too dilute, cells gain water, swell and may burst.',
    'Control: receptors detect the change; coordination centre (brain / gland); effectors (muscles / glands) respond; nerves and hormones carry signals.',
    'Negative feedback reverses the change and returns the level to the set point; antagonistic effectors (e.g. sweating and shivering) give faster, finer control.',
    'Consequence: if a condition leaves the safe range (e.g. heat stroke above about 40 °C, hypothermia below 35 °C, severe dehydration) cells and organs fail.',
  ], {
    l3: 'Explains WHY constant conditions are needed (enzymes AND/OR cells and water, with a reason) AND explains HOW they are kept constant (receptor, coordination centre, effector, negative feedback), with examples of internal or external change.',
    l2: 'Explains why conditions must be constant with one reason, OR describes how they are controlled, with some detail and an example.',
    l1: 'Simple statements, e.g. "the body needs to stay at 37 °C" or "sweating cools you down".',
  });
}
const HW = [
  { n: '1', q: 'Define **homeostasis**.', marks: 1, ms: 'Keeping a constant internal environment / keeping internal conditions within narrow limits (1).' },
  { n: '2', q: 'Name the **two** types of effector, and the part of a control system that **detects** a change.', marks: 2, ms: 'Muscles and glands (1); receptor (1).' },
  { n: '3', q: 'Four readings of a student\'s core temperature were **36.9**, **37.1**, **37.0** and **37.2 °C**. Calculate the mean.', marks: 2, ms: '(36.9 + 37.1 + 37.0 + 37.2) ÷ 4 (1); = 37.05 °C (accept 37.1 °C) (1).' },
  { n: '4', q: 'On a hot day a student loses **1.4 L** in urine, **0.9 L** in sweat, **0.4 L** in breath and **0.1 L** in faeces. Water in is **2.5 L**. How much more must they drink to balance?', marks: 2, ms: 'Water out = 1.4 + 0.9 + 0.4 + 0.1 = 2.8 L (1); 2.8 − 2.5 = 0.3 L more (1).', h: 1.15 },
  { n: '5', q: 'Explain what is meant by **antagonistic effectors**, and give an example for body temperature.', marks: 2, ms: 'Two effectors with opposite effects on the same condition (1); e.g. sweating (cools) and shivering (warms) (1).' },
  { n: '6', q: 'Explain why **skin** temperature can change a lot but **core** temperature changes very little.', marks: 2, ms: 'Core is kept constant by homeostasis / negative feedback (1); because the vital organs\' cells / enzymes need about 37 °C, while the skin is at the surface and exposed to the surroundings (1).', h: 1.15 },
  { n: '7', q: '**Explain** why the human body needs to maintain a **constant internal environment**, and describe how it does this. Use examples of internal and external changes.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer.', HW, 17, { dividerSub: 'B5.4 Homeostasis • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 8);
assert.strictEqual(R4.total, 8); assert.strictEqual(R5.total, 8);
const out = path.join(__dirname, 'OCR21C_B5.4_Homeostasis_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
