// build_T7.js — Edexcel GCSE Biology 1BI0 Topic 7 Animal coordination, control and homeostasis (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T7.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 7,
  title: 'Animal coordination, control and homeostasis',
  shortTitle: 'T7',
  subtitle: 'Hormones, the menstrual cycle, homeostasis, blood glucose and the kidney',
  specRange: '7.1–7.21',
  pOnly: [], // biology-only codes are written with their B suffix (7.10B…7.21B) and tagged with the BIOLOGY ONLY pill
  paper: 'Paper 2',
  keywords: ['Hormones', 'Menstrual cycle', 'Homeostasis', 'Blood glucose', 'Thermoregulation', 'Kidney'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;

// ======================= CALCULATIONS (asserted) =======================
// --- menstrual cycle model (relative levels, a.u.), from ../ocr-biology/build_B5_5.js ---
const CYC = 28, OVU = 14;
const gs = (d, m, w) => Math.exp(-((d - m) ** 2) / (2 * w * w));
const per = f => d => [-CYC, 0, CYC].reduce((a, k) => a + f(d + k), 0);
const FSH = d => 14 + per(x => 26 * gs(x, 3, 3.5) + 34 * gs(x, 13.6, 1.0))(d);
const LH = d => 10 + per(x => 86 * gs(x, 13.6, 0.9) + 6 * gs(x, 20, 4))(d);
const OES = d => 8 + per(x => 68 * gs(x, 12.3, 2.0) + 30 * gs(x, 21, 3.3))(d);
const PRO = d => 5 + per(x => 80 * gs(x, 21, 3.0))(d);
const argmax = (f, a, b) => { let best = a, bv = -1e9; for (let d = a; d <= b + 1e-9; d += 0.1) { const v = f(d); if (v > bv) { bv = v; best = d; } } return Math.round(best * 10) / 10; };
const lhPeakDay = calc('LH surge peak day (model)', argmax(LH, 0, 28), 13.6);
const oesPeakDay = calc('oestrogen peak day (model)', argmax(OES, 0, 28), 12.3);
const proPeakDay = calc('progesterone peak day (model)', argmax(PRO, 0, 28), 21);
assert(PRO(10) < 15 && PRO(21) > 80, 'progesterone low before ovulation, high day 21');
assert(Math.abs(FSH(0) - FSH(28)) < 1e-9 && Math.abs(LH(0) - LH(28)) < 1e-9, 'curves periodic');
const LIN = [[0, 10], [5, 1.5], [14, 9], [21, 11], [27, 11], [28, 10]];
const lining = d => { for (let i = 0; i < LIN.length - 1; i++) { const [a, ya] = LIN[i], [b, yb] = LIN[i + 1]; if (d >= a && d <= b) return ya + (yb - ya) * (d - a) / (b - a); } return LIN[0][1]; };
calc('lining day 5 (mm)', lining(5), 1.5, 1e-12);
calc('lining day 14 (mm)', lining(14), 9, 1e-12);
const linRise = calc('lining rise day 5 → 14', lining(14) - lining(5), 7.5, 1e-12);
const mensPct = calc('menstruation 5/28 × 100', 5 / 28 * 100, 17.857142857142858, 1e-9);
calc('QC 30-day cycle ovulation day', 30 - 14, 16);
// --- contraception (CDC typical use, pregnancies per 100 women in first year) ---
const FAIL = [['Implant', 0.1, 'h'], ['Copper IUD', 0.8, 'n'], ['Injection', 4, 'h'], ['Pill', 7, 'h'], ['Male condom', 13, 'b'], ['Diaphragm', 17, 'b']];
const pillEff = calc('pill typical-use effectiveness 100 − 7', 100 - 7, 93);
const condomEff = calc('condom typical-use effectiveness 100 − 13', 100 - 13, 87);
calc('condom ÷ pill failure ratio', 13 / 7, 1.8571428571428572, 1e-12);
// --- IVF ---
const ivfRatio = calc('IVF under 35 ÷ 40–42', 32 / 11, 2.909090909090909, 1e-12);
calc('IVF 32% of 200 cycles', 0.32 * 200, 64, 1e-9);
// --- homeostasis set-point model ---
const SET = 37.0, AMP = 0.3, PERD = 20;
const fb = t => SET + AMP * Math.sin(2 * Math.PI * t / PERD);
calc('feedback max', fb(5), 37.3, 1e-9);
// enzyme activity vs temperature (relative %, model data from build_B5_4.js)
const ENZ = [[0, 2], [10, 12], [20, 30], [30, 62], [37, 100], [40, 94], [45, 60], [50, 18], [55, 4], [60, 0]];
const enzAt = t => ENZ.find(p => p[0] === t)[1];
const enzDrop = calc('enzyme activity fall 37 → 45 °C', enzAt(37) - enzAt(45), 40);
calc('enzyme activity at 45 as % of max', enzAt(45) / enzAt(37) * 100, 60, 1e-9);
// --- body temperature ---
calc('fever 39.5 − 37.0', 39.5 - 37.0, 2.5, 1e-12);
// --- blood glucose models (mmol/dm³ vs minutes after a glucose drink) ---
const pk = (t, p) => t <= 0 ? 0 : (t / p) ** 2 * Math.exp(2 * (1 - t / p));
const gNorm = t => 5.0 + 2.8 * pk(t, 40);
const gT1 = t => 8.0 + 9.0 * pk(t, 75);
const insNorm = t => 10 + 50 * pk(t, 50);
const gcgNorm = t => 30 - 12 * pk(t, 45);
calc('normal glucose peak at 40 min', gNorm(40), 7.8, 1e-9);
const gN120 = calc('normal glucose at 120 min (2 s.f.)', sf(gNorm(120), 2), 5.5, 1e-12);
calc('type 1 glucose peak at 75 min', gT1(75), 17, 1e-9);
const gT120 = calc('type 1 glucose at 120 min (2 s.f.)', sf(gT1(120), 2), 15, 1e-12);
calc('normal rise 7.8 − 5.0', 7.8 - 5.0, 2.8, 1e-12);
// --- BMI and waist:hip ---
const bmi = (m, h) => m / (h * h);
const bmiA = calc('BMI 95 kg 1.75 m', bmi(95, 1.75), 31.020408163265305, 1e-9);
calc('BMI A 3 s.f.', sf(bmiA, 3), 31.0, 1e-12);
const bmiQ = calc('QC BMI 68 kg 1.70 m', bmi(68, 1.70), 23.529411764705884, 1e-9);
calc('QC BMI 3 s.f.', sf(bmiQ, 3), 23.5, 1e-12);
const whrM = calc('waist:hip man 102/98', 102 / 98, 1.0408163265306123, 1e-12);
calc('whr man 2 d.p.', +whrM.toFixed(2), 1.04, 1e-12);
const whrW = calc('waist:hip woman 76/100', 76 / 100, 0.76, 1e-12);
calc('QC whr 90/95 (2 d.p.)', +(90 / 95).toFixed(2), 0.95, 1e-12);
// illustrative: % adults with type 2 diabetes by BMI group
const T2D = [['under 25', 3], ['25–29.9', 7], ['30–34.9', 13], ['35 and over', 21]];
calc('T2D ratio ≥35 ÷ <25', 21 / 3, 7, 1e-12);
calc('T2D increase 25–29.9 → 30–34.9', 13 - 7, 6);
// --- kidney ---
const KD = { plasma: [80, 1.0, 0.3, 7.2], filtrate: [0, 1.0, 0.3, 7.2], urine: [0, 0, 20, 15] };
const ureaX = calc('urea concentration factor 20/0.3', 20 / 0.3, 66.66666666666667, 1e-9);
calc('urea factor 2 s.f.', sf(ureaX, 2), 67, 1e-12);
const filt = 180, urine = 1.5;
const reabPct = calc('% filtrate water reabsorbed (180 − 1.5)/180 × 100', (filt - urine) / filt * 100, 99.16666666666667, 1e-9);
calc('reab 3 s.f.', sf(reabPct, 3), 99.2, 1e-12);
const glucFilt = calc('glucose filtered per day 180 × 1.0', filt * 1.0, 180, 1e-12);
calc('QC urine % of filtrate 1.5/180', 1.5 / 180 * 100, 0.8333333333333334, 1e-12);
// dialysis
const dialHrs = calc('dialysis 3 sessions × 4 h', 3 * 4, 12);
calc('dialysis per year 12 × 52', 12 * 52, 624);
const ureaIn = 30, ureaOut = 12;
calc('urea fall across dialyser 30 → 12 %', (ureaIn - ureaOut) / ureaIn * 100, 60, 1e-9);
// recaps / full question / homework
calc('R5 BMI 110/1.80²', bmi(110, 1.80), 33.95061728395062, 1e-9);
calc('R5 BMI 1 d.p.', +bmi(110, 1.80).toFixed(1), 34.0, 1e-12);
calc('R5 whr 88/104 (2 d.p.)', +(88 / 104).toFixed(2), 0.85, 1e-12);
calc('FQ urea factor 18/0.3', 18 / 0.3, 60, 1e-9);
calc('FQ urine % 1.2/150', 1.2 / 150 * 100, 0.8, 1e-12);
calc('HW BMI 81/1.80²', bmi(81, 1.80), 25, 1e-9);
calc('HW whr 99/110', 99 / 110, 0.9, 1e-12);
// starter
calc('starter 23 chromosomes = 46/2', 46 / 2, 23);

// ======================= DECK-SPECIFIC drawing helpers (not in edx_bio_template.js) =======================
// copied/adapted from ../ocr-biology/build_B5_3.js, B5_4.js, B5_5.js, B5_6.js; kidney, nephron, skin and dialysis drawings are new
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
function polyline(s, pts, col, w = 1.5, o = {}) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, w, o); }
// tube: thick outlined pipe along a polyline (edge pass, then fill pass; round joints)
function tube(s, pts, fill, edge, wpt = 8) {
  [[edge, wpt + 3], [fill, wpt]].forEach(([c, w]) => {
    polyline(s, pts, c, w);
    pts.forEach(([x, y]) => ball(s, x, y, w / 144, c, c, 0));
  });
}
const wavy = (x1, x2, y, amp, waves, n = 60) => { const o = []; for (let i = 0; i <= n; i++) { const t = i / n; o.push([x1 + (x2 - x1) * t, y + amp * Math.sin(t * waves * 2 * Math.PI)]); } return o; };
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
// colours
const G = { pit: ['C8414C', '8E2A33'], thy: ['8E44AD', '5E2D73'], adr: ['E08A1E', '9A5A0A'], pan: ['D4A017', '8A6A0A'], ov: ['D45F9E', '8E3466'], tes: ['3B7DD8', '1F4E8C'] };
const HC = { fsh: ['2F6DB5', '1F4E8C'], lh: ['7B3FA0', '5E2D73'], oes: ['D4568F', '8E3466'], pro: ['D98A1E', '8A560A'], pit: ['C8414C', '8E2A33'] };
const SKIN = 'F6DDC8', SKIN_EDGE = 'B98E6E';
const WALL = 'EFB4B8', WALL_EDGE = 'A33E48', LINING = 'C8414C', LUMEN = 'FBE3E5', OVARY = 'F3D3A6', OVARY_EDGE = '9A6A2A';
const NUC = ['C9B6E4', '6A4C93'];
const HOT = 'D9534F', COLD = '3B7DD8';
const LIV = ['A0522D', '6B3318'], GLU = '3B7DD8', GLY = '1F4E8C', INS = 'E08A1E', GCG = '8E44AD';
const ART = 'C8414C', ARTE = '8E2A33', VEIN = '4A6FB5', VEINE = '2C4A80', KID = ['B5524A', '7A2E28'], URI = ['F2D46B', 'A08420'], TUB = ['FBEFD0', 'B8860B'], WAT = '5B9BD5';

// body(s, cx, top, k, o): front-view human outline (from build_B5_3.js). o.glands=false for no endocrine glands.
function body(s, cx, top, k = 1, o = {}) {
  const parts = [
    ['rr', cx - 1.12 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, 7], ['rr', cx + 0.84 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, -7],
    ['rr', cx - 0.64 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0], ['rr', cx + 0.10 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0],
    ['rr', cx - 0.8 * k, top + 0.92 * k, 1.6 * k, 2.0 * k, 0], ['r', cx - 0.13 * k, top + 0.7 * k, 0.26 * k, 0.3 * k, 0],
    ['o', cx - 0.33 * k, top, 0.66 * k, 0.8 * k, 0],
  ];
  [true, false].forEach(edgePass => parts.forEach(([t, x, y, w, h, rot]) => {
    const shape = t === 'o' ? SH.OVAL : t === 'r' ? SH.RECTANGLE : SH.ROUNDED_RECTANGLE;
    s.addShape(shape, { x, y, w, h, rotate: rot, rectRadius: t === 'rr' ? Math.min(w, h) * 0.45 : undefined, fill: { color: SKIN },
      line: edgePass ? { color: SKIN_EDGE, width: 2.5 } : { type: 'none' } });
  }));
  line(s, cx, top + 2.95 * k, cx, top + 4.5 * k, SKIN_EDGE, 1.25);
  const P = { chest: [cx + 0.15 * k, top + 1.22 * k], thighL: [cx - 0.37 * k, top + 3.2 * k], thighR: [cx + 0.37 * k, top + 3.2 * k] };
  oval(s, cx, top + 0.3 * k, 0.52 * k, 0.36 * k, 'F4C7D0', 'C98393', { lw: 0.75 });
  P.brain = [cx, top + 0.3 * k];
  P.pit = [cx, top + 0.53 * k]; ball(s, P.pit[0], P.pit[1], 0.055 * k, G.pit[0], G.pit[1], 1);
  if (o.glands === false && !o.adrenal) return P;
  // kidneys (not glands) with adrenal glands on top
  [-1, 1].forEach(sd => {
    oval(s, cx + sd * 0.33 * k, top + 2.12 * k, 0.2 * k, 0.32 * k, 'E3C3BE', 'B08A84', { lw: 0.75 });
    poly(s, [[cx + sd * 0.33 * k - 0.1 * k, top + 1.97 * k], [cx + sd * 0.33 * k + 0.1 * k, top + 1.97 * k], [cx + sd * 0.33 * k, top + 1.82 * k]], G.adr[0], G.adr[1]);
  });
  P.adrL = [cx - 0.33 * k, top + 1.91 * k]; P.adrR = [cx + 0.33 * k, top + 1.91 * k]; P.kid = [cx + 0.33 * k, top + 2.12 * k];
  if (o.glands === false) return P;
  P.thy = [cx, top + 0.86 * k];
  oval(s, cx - 0.07 * k, P.thy[1], 0.11 * k, 0.17 * k, G.thy[0], G.thy[1]); oval(s, cx + 0.07 * k, P.thy[1], 0.11 * k, 0.17 * k, G.thy[0], G.thy[1]);
  box(s, cx - 0.05 * k, P.thy[1] - 0.02 * k, 0.1 * k, 0.05 * k, G.thy[0], null);
  P.pan = [cx + 0.15 * k, top + 1.66 * k];
  oval(s, P.pan[0], P.pan[1], 0.72 * k, 0.15 * k, G.pan[0], G.pan[1], { rot: -10 });
  P.ovL = [cx - 0.33 * k, top + 2.6 * k]; P.ovR = [cx + 0.33 * k, top + 2.6 * k];
  poly(s, [[cx - 0.13 * k, top + 2.5 * k], [cx + 0.13 * k, top + 2.5 * k], [cx, top + 2.78 * k]], 'F2B8C6', 'B5546E', { lw: 0.75 });
  [-1, 1].forEach(sd => { line(s, cx + sd * 0.12 * k, top + 2.52 * k, cx + sd * 0.29 * k, top + 2.56 * k, 'B5546E', 1); oval(s, cx + sd * 0.33 * k, top + 2.6 * k, 0.15 * k, 0.1 * k, G.ov[0], G.ov[1]); });
  return P;
}
// leader-line label (box at lx; line from its near edge to the point)
function callout(s, lx, ly, lw, text, pX, pY, col, o = {}) {
  const right = lx > pX;
  label(s, lx, ly - (o.h || 0.3) / 2, lw, text, { size: o.size || 11, bold: o.bold !== false, color: col, align: right ? 'left' : 'right', h: o.h || 0.3, valign: 'middle' });
  line(s, right ? lx - 0.04 : lx + lw + 0.04, ly, pX, pY, col, 1);
  ball(s, pX, pY, 0.03, col);
}
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
function tag(s, cx, cy, w, h, text, col, o = {}) {
  box(s, cx - w / 2, cy - h / 2, w, h, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1 });
  label(s, cx - w / 2 + 0.03, cy - h / 2, w - 0.06, text, { size: o.size || 10, color: col, h, valign: 'middle', bold: o.bold });
}
// numbered process badge
function badge(s, cx, cy, n, col = C.orange) { ball(s, cx, cy, 0.17, col, C.white, 1.5); label(s, cx - 0.17, cy - 0.17, 0.34, String(n), { size: 12, bold: true, color: C.white, h: 0.34 }); }
// inhibition: dashed line ending in a flat bar (⊣)
function inhibit(s, x1, y1, x2, y2, col = C.red, w = 2) {
  line(s, x1, y1, x2, y2, col, w, { dash: 'dash' });
  const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L, b = 0.13;
  line(s, x2 - nx * b, y2 - ny * b, x2 + nx * b, y2 + ny * b, col, 3);
}
function plusMinus(s, cx, cy, plus) {
  ball(s, cx, cy, 0.15, plus ? C.green : C.red, plus ? '1E6B40' : '8E2A33', 1);
  label(s, cx - 0.15, cy - 0.15, 0.3, plus ? '+' : '−', { size: 14, bold: true, color: C.white, h: 0.3 });
}
function hormone(s, cx, cy, r = 0.08, col = INS) { s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r * 0.9, fill: { color: col }, line: { color: '9A5A0A', width: 0.75 } }); }
function receptor(s, cx, ytop, w = 0.24, col = C.green, bound, hcol = INS) {
  box(s, cx - w / 2, ytop, w, 0.16, col, '1E6B40', { lw: 0.75 });
  poly(s, [[cx - 0.08, ytop - 0.001], [cx + 0.08, ytop - 0.001], [cx, ytop + 0.13]], C.white, '1E6B40', { lw: 0.5 });
  if (bound) s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.08, y: ytop - 0.01, w: 0.16, h: 0.14, rotate: 180, fill: { color: hcol }, line: { color: '9A5A0A', width: 0.75 } });
}
function glucose(s, cx, cy, r = 0.055) { s.addShape(SH.HEXAGON, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: GLU }, line: { color: GLY, width: 0.5 } }); }
function glycogen(s, cx, cy, k = 1) {
  const pts = [];
  for (let i = 0; i < 6; i++) pts.push([cx - 0.3 * k + i * 0.12 * k, cy]);
  for (let i = 0; i < 3; i++) pts.push([cx - 0.06 * k + i * 0.11 * k, cy - 0.11 * k - i * 0.06 * k]);
  for (let i = 0; i < 3; i++) pts.push([cx - 0.18 * k + i * 0.1 * k, cy + 0.11 * k + i * 0.06 * k]);
  pts.forEach(([x, y]) => glucose(s, x, y, 0.05 * k));
}
function liverShape(s, x, y, w, h) {
  poly(s, [[x, y + 0.15 * h], [x + 0.55 * w, y], [x + w, y + 0.1 * h], [x + 0.75 * w, y + 0.6 * h], [x + 0.35 * w, y + h], [x + 0.05 * w, y + 0.8 * h]], LIV[0], LIV[1], { lw: 1.25 });
}
function pancreasShape(s, x, y, w, h) {
  oval(s, x + w / 2, y + h / 2, w, h, G.pan[0], G.pan[1], { lw: 1.5 });
  oval(s, x + 0.17 * w, y + h * 0.55, 0.32 * w, h * 1.25, G.pan[0], G.pan[1], { lw: 1.5 });
  [[0.3, 0.4], [0.55, 0.55], [0.75, 0.42], [0.18, 0.7]].forEach(([fx, fy]) => ball(s, x + fx * w, y + fy * h, Math.min(w, h) * 0.12, 'F5E6B0', G.pan[1], 0.75));
}
function insulinPen(s, x, y, w) {
  box(s, x, y, w * 0.7, 0.22, '5B9BD5', '2F5F8F', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
  box(s, x + w * 0.7, y + 0.03, w * 0.15, 0.16, 'E6EBF2', '6B7385');
  line(s, x + w * 0.85, y + 0.11, x + w, y + 0.11, '6B7385', 1);
  box(s, x - 0.12, y + 0.02, 0.12, 0.18, '2F5F8F', '2F5F8F');
  box(s, x + w * 0.35, y + 0.05, 0.2, 0.12, C.white, null);
}
function heartIcon(s, cx, cy, k = 1) {
  ball(s, cx - 0.12 * k, cy - 0.06 * k, 0.14 * k, 'D9534F', '8E2A33', 1); ball(s, cx + 0.12 * k, cy - 0.06 * k, 0.14 * k, 'D9534F', '8E2A33', 1);
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.255 * k, y: cy - 0.04 * k, w: 0.51 * k, h: 0.34 * k, rotate: 180, fill: { color: 'D9534F' }, line: { color: 'D9534F', width: 0.5 } });
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
function sunIcon(s, cx, cy, r = 0.16) {
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(s, cx + 1.3 * r * Math.cos(a), cy + 1.3 * r * Math.sin(a), cx + 1.8 * r * Math.cos(a), cy + 1.8 * r * Math.sin(a), 'E39A2F', 1.5); }
  ball(s, cx, cy, r, 'F5C342', 'D9822B', 1);
}
function snowIcon(s, cx, cy, r = 0.2) { for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; line(s, cx - r * Math.cos(a), cy - r * Math.sin(a), cx + r * Math.cos(a), cy + r * Math.sin(a), COLD, 2); } }
function dropIcon(s, cx, cy, r = 0.1, col = WAT) {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - r * 0.8, y: cy - r * 2.0, w: r * 1.6, h: r * 1.6, fill: { color: col }, line: { color: col, width: 0.5 } });
  ball(s, cx, cy - r * 0.2, r * 0.82, col, col);
}
// red blood cell in a solution: 'shrink' | 'normal' | 'swell'
function rbcState(s, cx, cy, state) {
  if (state === 'normal') { ball(s, cx, cy, 0.4, HOT, '8E2A33', 1.25); ball(s, cx, cy, 0.17, 'EE8A8F', 'EE8A8F'); return; }
  if (state === 'swell') { oval(s, cx, cy, 1.1, 1.1, null, '8E2A33', { lw: 1, dash: 'dash' }); ball(s, cx, cy, 0.5, 'E86B6F', '8E2A33', 1.25); return; }
  const pts = []; for (let i = 0; i < 24; i++) { const a = i / 24 * 2 * Math.PI, r = i % 2 ? 0.25 : 0.32; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  poly(s, pts, 'B83A40', '6E1E23', { lw: 1 });
}
// reproduction helpers (from build_B5_5.js)
function ovary(s, cx, cy, w, h, o = {}) {
  oval(s, cx, cy, w, h, OVARY, OVARY_EDGE, { lw: 1.25 });
  const r = Math.min(w, h);
  [[-0.3, -0.15, 0.07], [0.05, 0.22, 0.06], [-0.1, 0.12, 0.05]].forEach(([fx, fy, fr]) => ball(s, cx + fx * w, cy + fy * h, fr * r * 1.6, 'FFF6E8', OVARY_EDGE, 0.5));
  if (o.mature) { ball(s, cx + 0.22 * w, cy - 0.08 * h, 0.2 * r, 'FFF6E8', OVARY_EDGE, 1); ball(s, cx + 0.27 * w, cy - 0.12 * h, 0.06 * r, 'F2B279', 'A4561C', 0.75); }
  if (o.cl) ball(s, cx + 0.22 * w, cy - 0.05 * h, 0.17 * r, 'F5D76E', 'B8930A', 1);
}
function femaleSys(s, cx, top, k = 1, o = {}) {
  const yT = top + 0.45 * k, rx = 0.8 * k, ry = 0.42 * k;
  const P = {};
  [-1, 1].forEach(sd => {
    const tb = [[cx + sd * 0.7 * k, yT - 0.12 * k], [cx + sd * 1.0 * k, top + 0.12 * k], [cx + sd * 1.35 * k, top + 0.02 * k], [cx + sd * 1.7 * k, top + 0.18 * k], [cx + sd * 1.88 * k, top + 0.45 * k]];
    polyline(s, tb, WALL_EDGE, 7 * k); polyline(s, tb, WALL, 4.5 * k);
    const [fx, fy] = tb[4];
    [-0.35, 0, 0.35].forEach(a => line(s, fx, fy, fx + sd * 0.1 * k + a * 0.12 * k, fy + 0.17 * k, WALL_EDGE, 1.25));
    ovary(s, cx + sd * 1.5 * k, top + 0.82 * k, 0.6 * k, 0.38 * k, { mature: o.mature && sd > 0, cl: o.cl && sd > 0 });
    line(s, cx + sd * 0.78 * k, yT + 0.08 * k, cx + sd * 1.2 * k, top + 0.8 * k, OVARY_EDGE, 1.25);
  });
  P.ovary = [cx + 1.5 * k, top + 0.82 * k]; P.oviduct = [cx + 1.35 * k, top + 0.02 * k];
  const out = [];
  for (let t = 180; t >= 0; t -= 10) { const a = t * Math.PI / 180; out.push([cx + rx * Math.cos(a), yT - ry * Math.sin(a)]); }
  out.push([cx + 0.74 * k, yT + 0.35 * k], [cx + 0.55 * k, yT + 0.75 * k], [cx + 0.3 * k, yT + 1.1 * k], [cx + 0.26 * k, yT + 1.42 * k],
    [cx + 0.3 * k, yT + 1.5 * k], [cx + 0.3 * k, yT + 2.25 * k], [cx - 0.3 * k, yT + 2.25 * k], [cx - 0.3 * k, yT + 1.5 * k],
    [cx - 0.26 * k, yT + 1.42 * k], [cx - 0.3 * k, yT + 1.1 * k], [cx - 0.55 * k, yT + 0.75 * k], [cx - 0.74 * k, yT + 0.35 * k]);
  poly(s, out, WALL, WALL_EDGE, { lw: 1.75 });
  const th = o.lining == null ? 1 : o.lining;
  const lw = 0.08 * k * th + 0.02 * k;
  poly(s, [[cx - 0.55 * k - lw, yT - 0.12 * k - lw * 0.6], [cx + 0.55 * k + lw, yT - 0.12 * k - lw * 0.6], [cx + 0.05 * k, yT + 0.98 * k + lw], [cx - 0.05 * k, yT + 0.98 * k + lw]], LINING, '8E2A33', { lw: 0.75 });
  poly(s, [[cx - 0.55 * k + lw, yT - 0.12 * k + lw * 0.5], [cx + 0.55 * k - lw, yT - 0.12 * k + lw * 0.5], [cx + 0.03 * k, yT + 0.98 * k - lw * 0.3], [cx - 0.03 * k, yT + 0.98 * k - lw * 0.3]], LUMEN, null);
  line(s, cx, yT + 0.98 * k, cx, yT + 1.5 * k, '8E2A33', 1.5);
  box(s, cx - 0.17 * k, yT + 1.5 * k, 0.34 * k, 0.75 * k, LUMEN, null);
  line(s, cx - 0.3 * k, yT + 1.5 * k, cx + 0.3 * k, yT + 1.5 * k, WALL_EDGE, 0.75, { dash: 'dash' });
  P.uterus = [cx - 0.7 * k, yT + 0.3 * k]; P.lining = [cx + 0.4 * k, yT + 0.12 * k]; P.cervix = [cx + 0.27 * k, yT + 1.35 * k]; P.vagina = [cx - 0.3 * k, yT + 1.95 * k];
  return P;
}
function miniUterus(s, ux, uy, k = 1) {
  const o = []; for (let t = 180; t >= 0; t -= 15) { const a = t * Math.PI / 180; o.push([ux + 0.5 * k * Math.cos(a), uy - 0.25 * k * Math.sin(a)]); }
  o.push([ux + 0.17 * k, uy + 0.65 * k], [ux - 0.17 * k, uy + 0.65 * k]);
  poly(s, o, WALL, WALL_EDGE, { lw: 1.25 });
  poly(s, [[ux - 0.33 * k, uy - 0.03 * k], [ux + 0.33 * k, uy - 0.03 * k], [ux, uy + 0.5 * k]], LINING, null);
  poly(s, [[ux - 0.22 * k, uy], [ux + 0.22 * k, uy], [ux, uy + 0.38 * k]], LUMEN, null);
}
function pillPack(s, x, y, w, h) {
  box(s, x, y, w, h, 'E9EEF5', '8C96A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  const cols = 7, rows = 3, dx = w / (cols + 0.5), dy = h / (rows + 0.6);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) ball(s, x + dx * (c + 0.75), y + dy * (r + 0.8), Math.min(dx, dy) * 0.3, 'F7C5D6', 'B5546E', 0.5);
}
function syringe(s, x, y, w = 1.0, col = HC.fsh[0]) {
  box(s, x + 0.18 * w, y - 0.08 * w, 0.55 * w, 0.16 * w, 'DDE9F7', '4A5262', { lw: 1 });
  box(s, x + 0.2 * w, y - 0.06 * w, 0.3 * w, 0.12 * w, col, null, { tr: 30 });
  line(s, x, y, x + 0.18 * w, y, '4A5262', 2.5);
  line(s, x + 0.73 * w, y, x + 0.95 * w, y, '4A5262', 2);
  line(s, x + 0.95 * w, y - 0.1 * w, x + 0.95 * w, y + 0.1 * w, '4A5262', 2.5);
  line(s, x - 0.18 * w, y, x, y, '8C96A8', 1);
}
function egg(s, cx, cy, r) { ball(s, cx, cy, r, 'FBE6C4', 'A4561C', 1); ball(s, cx, cy, r * 0.32, NUC[0], NUC[1], 0.5); }
function sperm(s, x, y, dir = 1, col = '3B5B8C') { oval(s, x, y, 0.08, 0.05, col, col); line(s, x + dir * 0.04, y, x + dir * 0.13, y + 0.025, col, 0.75); line(s, x + dir * 0.13, y + 0.025, x + dir * 0.22, y - 0.01, col, 0.75); }
function embryo(s, cx, cy, r) {
  oval(s, cx, cy, 2 * r, 2 * r, 'FFF6E8', 'A4561C', { lw: 1 });
  [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35], [0, -0.5], [0, 0.5], [-0.5, 0], [0.5, 0]].forEach(([a, b]) => ball(s, cx + a * r * 0.95, cy + b * r * 0.95, r * 0.36, 'F7D7B5', 'A4561C', 0.5));
}
function curve(s, g, f, col, w = 2.5) { fnLine(s, g, f, g.xmin, g.xmax, 112, col, w); }
function key(s, x, y, col, text, w = 1.3) { line(s, x, y + 0.14, x + 0.3, y + 0.14, col, 3); label(s, x + 0.35, y, w, text, { size: 10.5, bold: true, color: col, align: 'left' }); }
function liningFill(s, g, fill = LINING) {
  const pts = [[px(g, 0), py(g, 0)]];
  for (let d = 0; d <= 28 + 1e-9; d += 0.5) pts.push([px(g, d), py(g, lining(d))]);
  pts.push([px(g, 28), py(g, 0)]);
  poly(s, pts, fill, '8E2A33', { lw: 0.75, tr: 15 });
}
// bar on a graph g from y=0 to v, centred on x value xv, width bw (inches)
function bar(s, g, xv, v, bw, fill, edge) { box(s, px(g, xv) - bw / 2, py(g, v), bw, py(g, 0) - py(g, v), fill, edge || fill, { lw: 0.75 }); }
// kidney (front view) centred at cx, cy; side = -1 (viewer's left kidney, hilum on its right) or +1. Returns hilum point.
function kidney(s, cx, cy, w, h, side, o = {}) {
  oval(s, cx, cy, w, h, KID[0], KID[1], { lw: 1.5 });
  oval(s, cx, cy, w * 0.72, h * 0.8, 'C9706A', null);                     // medulla zone (paler)
  const hx = cx - side * w * 0.5;                                            // hilum on the medial side
  oval(s, hx, cy, w * 0.26, h * 0.3, o.bg || C.panel, null);               // notch → bean shape
  poly(s, [[hx + side * 0.04, cy - h * 0.1], [cx - side * w * 0.02, cy - h * 0.2], [cx - side * w * 0.02, cy + h * 0.2], [hx + side * 0.04, cy + h * 0.1]], URI[0], URI[1], { lw: 0.75 }); // renal pelvis (funnel into the ureter)
  return [hx, cy];
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Control & Homeostasis',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • no Core Practical in this topic` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and BIOLOGY ONLY slides are marked' },
    { icon: '7', text: `Topic 7 of 9 • ${DECK.paper} • the kidney is statements 7.18B–7.21B` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 7 Animal coordination, control and homeostasis (Paper 2). Higher-only statements (HT pill): 7.2, 7.3, 7.5, 7.8, 7.12B, 7.14, 7.20B. Biology-only statements (BIOLOGY ONLY pill, not in Combined Science 1SC0): 7.10B–7.12B (homeostasis importance and thermoregulation) and 7.18B–7.21B (the urinary system, nephron, ADH and kidney failure). There is no Core Practical in Topic 7. See SPEC_T7.md for sources and confidence. Spec spelling: "adrenalin".',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '7.1–7.3', text: 'Describe the **endocrine glands** and how hormones travel; explain **adrenalin** and **thyroxine** (negative feedback).', ht: true },
  { code: '7.4–7.5', text: 'Describe the **menstrual cycle**; explain how **FSH, LH, oestrogen and progesterone** interact.', ht: true },
  { code: '7.6–7.8', text: 'Explain and evaluate **contraception**; explain hormones in **IVF and clomifene therapy** (ART).', ht: true },
  { code: '7.9–7.12B', text: 'Explain why **homeostasis** matters; explain **thermoregulation** by the skin and hypothalamus.', ht: true },
  { code: '7.13–7.14', text: 'Explain how **insulin** (and **glucagon**) control blood glucose concentration.', ht: true },
  { code: '7.15–7.17', text: 'Explain **type 1** and **type 2 diabetes**; use **BMI** and **waist:hip** ratios.' },
  { code: '7.18B–7.19B', text: 'Describe the **urinary system**; explain how the **nephron** filters blood and forms urine.' },
  { code: '7.20B–7.21B', text: 'Describe the role of **ADH**; describe **dialysis** and **kidney transplants**.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT pill = the group contains at least one Higher-only (bold H) statement: 7.2, 7.3, 7.5, 7.8, 7.12B, 7.14, 7.20B. Statements with a B suffix are biology only (not in Combined Science 1SC0).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 7 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['7.1–7.3', 'Hormones, adrenalin, thyroxine', 'BOTH COURSES'],
    ['7.4–7.8', 'Menstrual cycle, contraception, ART', 'BOTH COURSES'],
    ['7.9', 'Homeostasis: a constant internal environment', 'BOTH COURSES'],
    ['7.10B–7.12B', 'Why homeostasis matters; thermoregulation', 'BIOLOGY ONLY'],
    ['7.13–7.17', 'Blood glucose, diabetes, BMI and waist:hip', 'BOTH COURSES'],
    ['7.18B–7.19B', 'Urinary system and the nephron', 'BIOLOGY ONLY'],
    ['7.20B–7.21B', 'ADH; dialysis and transplants', 'BIOLOGY ONLY'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 7\nCoordination & homeostasis', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Earlier links: Topic 1 enzymes, osmosis, active transport • Topic 2 nervous system • Topic 5 non-communicable disease', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1BI0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 6–9.',
      'Combined Science 1SC0 Paper 4 (Biology 2) tests the statements **without** a B.',
      'Maths: **BMI = mass ÷ height²**, waist:hip ratio, percentages and reading graphs.',
      '**No Core Practical** is linked to Topic 7.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: thermoregulation and the **whole kidney section** (7.10B–7.12B, 7.18B–7.21B). Combined classes skip these.',
      '**HT** pill: Higher only – adrenalin, thyroxine, hormone interactions, ART, vasoconstriction/dilation, glucagon, ADH.',
      'Foundation students still meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Biology-only statements (not in 1SC0): 7.10B, 7.11B, 7.12B, 7.18B, 7.19B, 7.20B, 7.21B. Higher-only: 7.2, 7.3, 7.5, 7.8, 7.12B, 7.14, 7.20B (7.2, 7.12B and 7.20B H markers medium confidence – check the bold H against the Pearson spec PDF; see SPEC_T7.md).\nCombined Science route: skip slides on thermoregulation (18–21) and the kidney (29–37).\nNo Core Practical is linked to Topic 7.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • enzymes', q: 'Explain why an enzyme stops working at a **high temperature**.' },
  { from: 'Topic 1 • osmosis', q: 'Define **osmosis**.' },
  { from: 'Topic 1 • active transport', q: 'How is **active transport** different from diffusion? Give **two** ways.' },
  { from: 'Topic 2 • nervous system', q: 'Name the type of cell that carries **electrical impulses** around the body.' },
  { from: 'Topic 3 • meiosis', q: 'A human body cell has **46** chromosomes. How many are in an **egg cell**?' },
  { from: 'Topic 5 • health', q: 'Give **one** lifestyle factor that increases the risk of a **non-communicable** disease.' },
], { subtitle: 'Recall from Topics 1, 2, 3 and 5 • 6 minutes • no notes', notes: 'ANSWERS\n1. The active site changes shape (the enzyme is denatured), so the substrate no longer fits.\n2. The net movement of water molecules from a dilute solution (high water potential) to a more concentrated solution, across a partially permeable membrane.\n3. Active transport moves substances AGAINST a concentration gradient (low → high) and needs energy from respiration; diffusion is down the gradient and passive.\n4. Neurones (nerve cells).\n5. 23 (46 ÷ 2: meiosis halves the number).\n6. e.g. smoking, poor diet / obesity, lack of exercise, alcohol.' }), 'Retrieval starter');

// ======================= 5 ENDOCRINE GLANDS =======================
{
  const s = D.contentHeader('The endocrine glands', 'Specification 7.1 • where hormones are produced', { tag: '7.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'front view; the glands are drawn larger than life');
  const P = body(s, 3.4, 1.42, 0.97);
  callout(s, 4.62, 1.75, 1.8, 'Pituitary gland', P.pit[0] + 0.06, P.pit[1], G.pit[1]);
  callout(s, 0.55, 2.28, 1.5, 'Thyroid gland', P.thy[0] - 0.13, P.thy[1], G.thy[1]);
  callout(s, 0.55, 3.05, 1.5, 'Adrenal glands', P.adrL[0] - 0.05, P.adrL[1], G.adr[1]);
  line(s, 2.09, 3.05, P.adrR[0], P.adrR[1] + 0.02, G.adr[1], 0.75, { dash: 'dash' });
  callout(s, 4.62, 2.9, 1.8, 'Pancreas', P.pan[0] + 0.3, P.pan[1] - 0.05, G.pan[1]);
  callout(s, 0.55, 3.95, 1.5, 'Ovaries (female)', P.ovL[0] - 0.08, P.ovL[1], G.ov[1]);
  line(s, 2.09, 3.95, P.ovR[0], P.ovR[1] + 0.02, G.ov[1], 0.75, { dash: 'dash' });
  label(s, 4.62, 3.3, 1.8, 'kidneys (not glands) under the adrenals', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.42, valign: 'top' });
  line(s, 4.6, 3.4, P.kid[0] + 0.1, P.kid[1], C.grey, 0.75);
  box(s, 4.55, 4.2, 1.85, 1.6, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, 4.6, 4.24, 1.75, 'Male: **testes**', { size: 11, color: G.tes[1] });
  [true, false].forEach(ep => [[4.9, 4.55, 1.15, 0.4], [4.9, 4.7, 0.36, 0.75], [5.69, 4.7, 0.36, 0.75]].forEach(([x, y, w, h]) =>
    s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: SKIN }, line: ep ? { color: SKIN_EDGE, width: 2 } : { type: 'none' } })));
  oval(s, 5.475, 5.12, 0.42, 0.36, SKIN, SKIN_EDGE, { lw: 1.5 });
  oval(s, 5.39, 5.13, 0.15, 0.22, G.tes[0], G.tes[1]); oval(s, 5.56, 5.13, 0.15, 0.22, G.tes[0], G.tes[1]);
  label(s, 4.6, 5.48, 1.75, 'in the scrotum', { size: 10, italic: true, color: C.grey });
  const rows = [[HDR('Gland'), HDR('Hormone(s)'), HDR('Main effect')],
    ...[
      ['Pituitary (base of brain)', 'TSH, FSH, LH, ADH, growth hormone', '"master gland": controls other glands', G.pit],
      ['Thyroid (neck)', 'thyroxine', 'controls metabolic rate', G.thy],
      ['Adrenal (on the kidneys)', 'adrenalin', 'prepares the body for "fight or flight"', G.adr],
      ['Pancreas', 'insulin, glucagon', 'control blood glucose concentration', G.pan],
      ['Ovaries', 'oestrogen, progesterone', 'menstrual cycle; female characteristics', G.ov],
      ['Testes', 'testosterone', 'sperm production; male characteristics', G.tes],
    ].map(([g, h, j, col], i) => [tcell(g, i, { bold: true, color: col[1] }), tcell(h, i), tcell(j, i)])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.85, 1.95, 2.28], rowH: 0.5, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.95, 6.08, 1.3, 'Learn the positions', [
    'Base of brain → **pituitary**; neck → **thyroid**; on top of each kidney → **adrenal**; behind the stomach → **pancreas**; pelvis → **ovaries**; scrotum → **testes**.',
  ], { size: 11 });
  D.quickCheck(s, 'Name the gland that sits on top of each **kidney** and the hormone it makes. Which gland is called the **"master gland"**? Why?');
  D.notes(s, 'QUICK CHECK ANSWER: adrenal gland (1); adrenalin (1). The pituitary (1) – its hormones (e.g. TSH, FSH, LH) control other glands (1).\nSpec 7.1 names exactly six glands: pituitary, thyroid, pancreas, adrenal glands, ovaries and testes. ADH is listed for the pituitary because it returns in 7.20B (kidney). Edexcel spells it "adrenalin"; "adrenaline" is accepted in mark schemes.');
  reg(s, '7.1 Endocrine glands (body map)');
}

// ======================= 6 HOW HORMONES TRAVEL =======================
reg(D.contentSlide({
  title: 'How hormones reach their target organs',
  subtitle: 'Specification 7.1 • secreted into the blood, carried in the plasma, detected by receptors',
  tag: '7.1', caption: 'a hormone affects only cells with matching receptors',
  draw: (s, p) => {
    oval(s, 1.45, 1.95, 1.5, 0.8, G.adr[0], G.adr[1], { lw: 1.5 });
    label(s, 0.7, 1.75, 1.5, '**endocrine gland**', { size: 11, color: C.white, h: 0.4 });
    [[1.25, 2.6], [1.6, 2.75], [1.4, 2.9]].forEach(([x, y]) => hormone(s, x, y, 0.08));
    arrow(s, 2.0, 2.45, 2.0, 3.05, G.adr[1], 2);
    label(s, 2.1, 2.48, 2.6, 'secreted **directly into the blood** (no duct)', { size: 10.5, align: 'left', h: 0.45, valign: 'top' });
    box(s, 0.7, 3.1, 5.6, 0.62, 'F6C9CC', ART, { lw: 1.5 });
    label(s, 0.8, 3.1, 2.4, 'blood vessel', { size: 10.5, bold: true, color: ARTE, align: 'left', h: 0.3 });
    [1.6, 2.4, 3.3, 4.1, 4.9, 5.6].forEach((x, i) => hormone(s, x, 3.48 + (i % 2) * 0.08, 0.08));
    arrow(s, 3.6, 3.22, 5.9, 3.22, ARTE, 2); label(s, 3.6, 2.85, 2.7, 'carried in the **plasma**', { size: 10.5, align: 'right', h: 0.3 });
    // target cell
    oval(s, 2.3, 4.85, 2.0, 1.05, 'FBF3DF', '8A6D3B', { lw: 1.5 }); ball(s, 2.3, 4.95, 0.17, NUC[0], NUC[1], 1);
    [1.75, 2.3, 2.85].forEach(x => receptor(s, x, 4.36, 0.24, C.green, true));
    arrow(s, 2.3, 3.78, 2.3, 4.2, C.green, 2);
    label(s, 1.1, 5.45, 2.4, '**target cell**: receptors fit → **responds**', { size: 10.5, color: '1E6B40', h: 0.4 });
    // non-target cell with square receptors
    oval(s, 5.0, 4.85, 2.0, 1.05, 'FBF3DF', '8A6D3B', { lw: 1.5 }); ball(s, 5.0, 4.95, 0.17, NUC[0], NUC[1], 1);
    [4.45, 5.0, 5.55].forEach(x => box(s, x - 0.1, 4.33, 0.2, 0.16, '7FA9E0', '2F5F8F', { lw: 0.75 }));
    hormone(s, 5.25, 4.05, 0.08);
    label(s, 3.85, 5.45, 2.4, '**non-target cell**: no matching receptor → **no effect**', { size: 10.5, color: C.grey, h: 0.4 });
  },
  head: 'Hormones are chemical messengers',
  lines: [
    'A **hormone** is a chemical made by an **endocrine gland** and secreted **directly into the bloodstream**.',
    'It is carried in the **blood plasma** all round the body, but only **target organs** respond: their cells have **receptors** that the hormone fits.',
    'Hormonal responses are **slower** to start than nervous responses but usually **last longer**.',
  ],
  worked: { head: 'Compare: nervous vs hormonal', q: '',
    steps: [['Signal', 'electrical impulse in neurones / chemical in the blood'], ['Speed', 'very fast / slower'], ['Duration', 'short / longer lasting'], ['Answer', 'nerves: precise, rapid; hormones: widespread, long-lasting']] },
  qc: 'Insulin travels all round the body in the blood. Explain why it affects liver cells but not skin cells.',
  notes: 'QUICK CHECK ANSWER: liver cells have receptors that insulin binds to / fits (1); skin cells do not have these receptors (so they do not respond) (1).\n7.1 includes "how they are transported from endocrine glands to their target organs": in the blood (plasma). Endocrine glands are ductless.',
}), '7.1 How hormones travel');

// ======================= 7 ADRENALIN (HT) =======================
reg(D.contentSlide({
  title: 'Adrenalin: fight or flight',
  subtitle: 'Specification 7.2 • adrenal glands prepare the body for action',
  tag: '7.2', ht: true, caption: 'adrenalin travels in the blood to several target organs',
  draw: (s, p) => {
    const cx = 3.5, top = 1.42, k = 0.97;
    const P = body(s, cx, top, k, { glands: false, adrenal: true });
    heartIcon(s, P.chest[0], P.chest[1], 0.8);
    liverShape(s, cx - 0.74 * k, top + 1.42 * k, 0.72 * k, 0.32 * k);
    muscleIcon(s, P.thighR[0], P.thighR[1], 0.75);
    muscleIcon(s, P.thighL[0], P.thighL[1], 0.75);
    callout(s, 0.55, 3.15, 1.6, 'Adrenal glands release **adrenalin**', P.adrL[0] - 0.05, P.adrL[1], G.adr[1], { h: 0.5, size: 10.5 });
    callout(s, 4.75, 2.05, 1.7, '**Heart rate** ↑ and **blood pressure** ↑', P.chest[0] + 0.15, P.chest[1], 'B8323A', { h: 0.5, size: 10.5 });
    callout(s, 0.55, 2.2, 1.6, '**Liver**: glycogen → glucose; **blood sugar** ↑', cx - 0.5, top + 1.55 * k, LIV[1], { h: 0.5, size: 10.5 });
    callout(s, 4.75, 4.45, 1.7, '**Muscles**: more blood flow', P.thighR[0] + 0.2, P.thighR[1], 'A33E48', { h: 0.5, size: 10.5 });
    label(s, 0.55, 4.55, 1.9, 'Trigger: fear, stress, excitement', { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.5, valign: 'top' });
  },
  head: 'Effects of adrenalin',
  lines: [
    '**a** increases **heart rate**; **b** increases **blood pressure**.',
    '**c** increases **blood flow to the muscles** (vessels to muscles widen).',
    '**d** raises **blood sugar**: stimulates the **liver** to change **glycogen into glucose**.',
    'Result: muscle cells get more **oxygen and glucose** for **respiration**, so they can contract quickly (fight or run).',
  ],
  worked: { head: 'Exam technique: explain', q: 'Explain how adrenalin helps a sprinter at the start of a race.',
    steps: [['Effect', 'heart rate ↑ and more blood flow to the leg muscles'], ['Link', 'more oxygen and glucose delivered to muscle cells'], ['Process', 'faster (aerobic) respiration'], ['Answer', 'more energy transferred for muscle contraction']] },
  qc: 'Give **two** effects of adrenalin on the body. Which organ changes glycogen into glucose?',
  notes: 'QUICK CHECK ANSWER: any two of: increased heart rate, increased blood pressure, increased blood flow to muscles, raised blood sugar (1 each). The liver (1).\nSpec 7.2 lists exactly a–d. H marker for 7.2: medium confidence (see SPEC_T7.md). Adrenalin is a short-term response; contrast with thyroxine (long-term, next slide).',
}), '7.2 Adrenalin (HT)');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 7.1–7.2 • glands, hormones and adrenalin', [
  { q: 'Describe how a hormone travels from an endocrine gland to its target organ.', marks: 2, ms: 'Secreted (directly) into the blood(stream) (1); carried in the blood plasma to the target organ (which has receptors) (1).' },
  { q: 'Name the gland that produces **thyroxine** and the gland that produces **testosterone**.', marks: 2, ms: 'Thyroid (1); testes (1).' },
  { q: 'Explain how adrenalin increases the supply of glucose to muscle cells.', marks: 3, ht: true, ms: 'Adrenalin stimulates the liver (1); to convert glycogen into glucose / raises blood sugar (1); heart rate / blood flow to muscles increases so more glucose delivered (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 THYROXINE (HT) =======================
reg(D.contentSlide({
  title: 'Thyroxine and negative feedback',
  subtitle: 'Specification 7.3 • thyroxine controls the metabolic rate',
  tag: '7.3', ht: true, caption: 'TRH → TSH → thyroxine; normal thyroxine levels switch the chain off',
  draw: (s, p) => {
    const bx = 1.75, bw = 2.9;
    const nodes = [['**Hypothalamus** (brain)', 1.55, 'F4D9E0', G.pit[1]], ['**Pituitary gland**', 2.6, 'FBECEC', G.pit[0]], ['**Thyroid gland**', 3.65, 'EEE3F5', G.thy[1]], ['Body cells: **metabolic rate** ↑', 4.7, 'E3F2E8', '1E6B40']];
    nodes.forEach(([t, y, f, e]) => pbox(s, bx, y, bw, 0.6, t, f, e, { size: 11.5 }));
    const cx = bx + bw / 2;
    [[2.15, 2.6, 'TRH'], [3.2, 3.65, 'TSH'], [4.25, 4.7, 'thyroxine']].forEach(([y1, y2, t]) => { arrow(s, cx, y1, cx, y2, C.ink, 2.5); label(s, cx + 0.1, y1 + 0.08, 1.2, `**${t}**`, { size: 11, align: 'left', color: C.blue }); });
    // high thyroxine inhibits (right)
    const rx = 5.35;
    line(s, bx + bw, 4.0, rx, 4.0, C.red, 2, { dash: 'dash' }); line(s, rx, 4.0, rx, 1.85, C.red, 2, { dash: 'dash' });
    inhibit(s, rx, 1.85, bx + bw + 0.02, 1.85, C.red, 2); inhibit(s, rx, 2.9, bx + bw + 0.02, 2.9, C.red, 2);
    plusMinus(s, rx, 3.45, false);
    label(s, rx - 0.55, 4.08, 1.25, 'thyroxine **normal or high**: inhibits TRH and TSH', { size: 10, color: C.red, h: 0.75, valign: 'top' });
    // low thyroxine stimulates (left)
    const lx = 1.2;
    line(s, bx, 4.0, lx, 4.0, C.green, 2, { dash: 'dash' }); line(s, lx, 4.0, lx, 1.85, C.green, 2, { dash: 'dash' });
    arrow(s, lx, 1.85, bx - 0.02, 1.85, C.green, 2, { dash: 'dash' });
    plusMinus(s, lx, 2.9, true);
    label(s, 0.55, 4.08, 1.3, 'thyroxine **low**: stimulates TRH', { size: 10, color: '1E6B40', h: 0.6, valign: 'top' });
    label(s, 1.75, 5.45, 3.0, 'the result reverses the change = **negative feedback**', { size: 10.5, italic: true, color: C.ink });
  },
  head: 'The thyroxine control loop',
  lines: [
    '**Thyroxine** (from the thyroid) controls the **metabolic rate**: how fast chemical reactions happen in cells.',
    '**a** Low thyroxine stimulates the **hypothalamus** to make **TRH**. **b** TRH causes the **pituitary** to release **TSH**.',
    '**c** TSH acts on the **thyroid** to produce **thyroxine**.',
    '**d** When thyroxine is **normal**, it **inhibits** TRH release and TSH production, so levels stay steady.',
  ],
  size: 11,
  worked: { head: 'Why is this negative feedback?', q: 'Thyroxine levels fall. Describe what happens.',
    steps: [['Detect', 'low thyroxine → hypothalamus releases more TRH'], ['Amplify', 'more TSH from the pituitary'], ['Respond', 'thyroid makes more thyroxine'], ['Answer', 'level rises back to normal: the change is reversed']] },
  qc: 'Name the hormone released by the **pituitary** in this loop and its target gland. What does thyroxine control?',
  notes: 'QUICK CHECK ANSWER: TSH (thyroid-stimulating hormone) (1); the thyroid gland (1); metabolic rate (1).\nTRH = thyrotropin-releasing hormone (full name not needed). Spec 7.3 parts a–d are mirrored in the card. Negative feedback: a change away from the normal level causes a response that brings the level back.',
}), '7.3 Thyroxine negative feedback (HT)');

// ======================= 10 MENSTRUAL CYCLE STAGES =======================
{
  const s = D.contentHeader('The menstrual cycle', 'Specification 7.4 • stages of the cycle and the roles of oestrogen and progesterone', { tag: '7.4' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'female reproductive system, front view (uterus cut open)');
  const P = femaleSys(s, 3.45, 1.85, 1.28, { mature: true });
  callout(s, 5.45, 1.62, 0.95, 'Oviduct', P.oviduct[0] + 0.05, P.oviduct[1] + 0.03, WALL_EDGE);
  label(s, P.ovary[0] - 0.6, 3.2, 1.2, '**Ovary**', { size: 11, color: OVARY_EDGE });
  label(s, P.ovary[0] - 0.75, 3.45, 1.5, '(egg matures in a follicle)', { size: 10, italic: true, color: C.grey, h: 0.4, valign: 'top' });
  callout(s, 0.6, 3.5, 1.35, 'Uterus (womb)', 2.72, 3.3, WALL_EDGE);
  callout(s, 0.6, 4.1, 1.35, 'Lining (wall)', 3.07, 3.07, LINING);
  callout(s, 4.25, 4.35, 1.3, 'Cervix', P.cervix[0], P.cervix[1], WALL_EDGE);
  callout(s, 0.6, 4.95, 1.35, 'Vagina', P.vagina[0], P.vagina[1], WALL_EDGE);
  D.card(s, 6.8, 1.3, 6.08, 2.4, 'Four stages (day 1 = first day of a period)', [
    '**Days 1–5 menstruation**: the uterus lining breaks down and leaves the body.',
    '**Days 5–14**: **oestrogen** makes the lining **repair and thicken**; an egg matures.',
    '**About day 14 ovulation**: an egg is **released** from the ovary.',
    '**Days 14–28**: **progesterone** **maintains** the thick lining. No fertilisation → progesterone falls → next period.',
  ], { size: 10.5 });
  box(s, 6.8, 3.82, 6.08, 2.43, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  const g = { x: 7.55, y: 3.98, w: 5.1, h: 1.6, xmin: 0, xmax: 28, ymin: 0, ymax: 12, xstep: 2, ystep: 4, minor: 2, xlabel: 'day of cycle', ylabel: 'lining / mm' };
  axes(s, g);
  s.addShape(SH.RECTANGLE, { x: px(g, 0), y: g.y, w: px(g, 5) - px(g, 0), h: g.h, fill: { color: C.red, transparency: 85 }, line: { type: 'none' } });
  liningFill(s, g);
  line(s, px(g, OVU), g.y, px(g, OVU), g.y + g.h, C.orange, 1.5, { dash: 'dash' });
  label(s, px(g, OVU) - 1.55, g.y + 0.02, 1.5, 'ovulation', { size: 10, bold: true, color: C.orange, align: 'right' });
  label(s, px(g, 0) + 0.02, g.y + 0.02, 0.9, 'period', { size: 10, bold: true, color: C.red, align: 'left' });
  D.quickCheck(s, 'Which hormone makes the lining **thicken** after a period, and which **keeps** it thick? By how many mm does it thicken from day 5 to day 14?');
  D.notes(s, `QUICK CHECK ANSWER: oestrogen (1); progesterone (1); from 1.5 mm to 9 mm = ${linRise} mm (1).\nLining graph drawn to scale from typical values (about 1–2 mm after a period, 9–11 mm after ovulation; UNVERIFIED, varies between people). Menstruation is about 5 of 28 days = ${sf(mensPct, 3)}% of the cycle. The model counts day 0/1 as the first day of bleeding. Cycle length varies (21–35 days is common).`);
  reg(s, '7.4 Menstrual cycle stages');
}

// ======================= 11 FOUR HORMONES (HT) =======================
reg(D.contentSlide({
  title: 'FSH, LH, oestrogen and progesterone',
  subtitle: 'Specification 7.5 • how the four hormones interact to control the cycle',
  tag: '7.5', ht: true, panelW: 7.3, caption: 'model data drawn to scale; relative levels (arbitrary units)',
  draw: (s, p) => {
    const X = 1.35, Wd = 6.1;
    const gA = { x: X, y: 1.5, w: Wd, h: 1.25, xmin: 0, xmax: 28, ymin: 0, ymax: 100, xstep: 2, ystep: 50, minor: 2, ylabel: 'level / a.u.' };
    const gB = { x: X, y: 3.1, w: Wd, h: 1.25, xmin: 0, xmax: 28, ymin: 0, ymax: 100, xstep: 2, ystep: 50, minor: 2, ylabel: 'level / a.u.' };
    const gC = { x: X, y: 4.68, w: Wd, h: 0.8, xmin: 0, xmax: 28, ymin: 0, ymax: 12, xstep: 2, ystep: 12, minor: 1, xlabel: 'day of cycle', ylabel: 'lining / mm' };
    [gA, gB, gC].forEach(g => { axes(s, g); line(s, px(g, OVU), g.y, px(g, OVU), g.y + g.h, C.orange, 1.25, { dash: 'dash' }); });
    curve(s, gA, FSH, HC.fsh[0]); curve(s, gA, LH, HC.lh[0]);
    curve(s, gB, OES, HC.oes[0]); curve(s, gB, PRO, HC.pro[0]);
    liningFill(s, gC);
    key(s, px(gA, 18), gA.y + 0.05, HC.fsh[0], 'FSH', 0.6); key(s, px(gA, 22.5), gA.y + 0.05, HC.lh[0], 'LH', 0.6);
    key(s, px(gB, 1.0), gB.y + 0.02, HC.oes[0], 'oestrogen', 1.0); key(s, px(gB, 23.0), gB.y + 0.02, HC.pro[0], 'progesterone', 1.2);
    label(s, px(gA, lhPeakDay) - 1.0, py(gA, LH(lhPeakDay)) + 0.02, 0.88, 'LH surge', { size: 10, bold: true, color: HC.lh[1], align: 'right' });
    label(s, px(gB, OVU) + 0.06, gB.y + 0.03, 1.0, 'ovulation', { size: 10, bold: true, color: C.orange, align: 'left' });
  },
  head: 'The interactions',
  lines: [
    '**FSH** (pituitary): an egg matures in a follicle; stimulates the ovary to make **oestrogen**.',
    '**Oestrogen**: **repairs** the uterus wall; **inhibits FSH**; high levels stimulate **LH**.',
    '**LH** surge (pituitary) → **ovulation**; the empty follicle (corpus luteum) makes **progesterone**.',
    '**Progesterone**: **maintains** the uterus wall; **inhibits FSH and LH**.',
    'No pregnancy → progesterone falls → **menstruation**, FSH rises again.',
  ],
  size: 10.5,
  worked: { head: 'Read the graph', q: 'On which day does LH peak, and what happens next?',
    steps: [['Read', `LH peaks at about day ${Math.round(lhPeakDay)}`], ['Effect', 'the LH surge causes ovulation'], ['Then', `progesterone rises (peak about day ${proPeakDay})`], ['Answer', 'lining maintained ready for an embryo']], size: 10.5 },
  workedH: 2.0,
  qc: 'Which **two** hormones are made by the **pituitary**? Which hormone **inhibits both** FSH and LH?',
  notes: `QUICK CHECK ANSWER: FSH and LH (1); progesterone (1).\nGraph check (node): smooth periodic model curves; LH peak day ${lhPeakDay}, oestrogen peak day ${oesPeakDay} (just before LH), progesterone peak day ${proPeakDay}. Levels are relative; each hormone is on its own scale.\n7.5 requires "repair and maintenance of the uterus wall, ovulation and menstruation". The term corpus luteum is not required (stretch).`,
}), '7.5 Four hormones interact (HT)');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 7.3–7.5 • thyroxine and the menstrual cycle', [
  { q: 'Describe the role of **TSH** in the control of thyroxine.', marks: 2, ht: true, ms: 'TSH is released by the pituitary (gland) (1); it stimulates the thyroid to produce / release thyroxine (1).' },
  { q: 'Describe what happens to the uterus lining during the menstrual cycle.', marks: 2, ms: 'Lining breaks down / is shed (menstruation, days 1–5) (1); it is repaired / builds up / thickens and is then maintained (1).' },
  { q: 'Explain how **oestrogen** and **LH** cause ovulation.', marks: 3, ht: true, ms: 'Oestrogen levels rise / peak (1); high oestrogen stimulates (the pituitary to release) LH (1); the LH surge causes ovulation / release of an egg (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 HORMONAL CONTRACEPTION =======================
reg(D.contentSlide({
  title: 'Hormonal contraception',
  subtitle: 'Specification 7.6 • extra oestrogen and progesterone switch off FSH and LH',
  tag: '7.6', caption: 'how the combined pill works; other hormonal methods in the bottom row',
  draw: (s, p) => {
    pillPack(s, 0.7, 1.5, 1.6, 0.85);
    label(s, 0.65, 2.38, 1.7, 'pill taken daily', { size: 10, italic: true, color: C.grey });
    arrow(s, 2.35, 1.92, 3.0, 1.92, HC.oes[0], 2.5);
    pbox(s, 3.05, 1.55, 3.3, 0.75, '**oestrogen + progesterone** in the blood stay **high**', 'FDEFF5', HC.oes[0], { size: 10.5 });
    pbox(s, 3.4, 2.95, 2.6, 0.6, '**Pituitary gland**', 'FBECEC', HC.pit[0], { color: HC.pit[1] });
    inhibit(s, 4.7, 2.32, 4.7, 2.93, C.red, 2.5);
    label(s, 4.8, 2.45, 1.5, '− inhibits', { size: 10.5, bold: true, color: C.red, align: 'left' });
    line(s, 4.0, 3.57, 4.0, 4.24, HC.fsh[0], 2.5, { dash: 'dash' }); line(s, 5.4, 3.57, 5.4, 4.24, HC.lh[0], 2.5, { dash: 'dash' });
    [[4.0, 3.93], [5.4, 3.93]].forEach(([x, y]) => { line(s, x - 0.13, y - 0.13, x + 0.13, y + 0.13, C.red, 3); line(s, x - 0.13, y + 0.13, x + 0.13, y - 0.13, C.red, 3); });
    label(s, 3.0, 3.78, 0.85, '**no FSH**', { size: 10.5, color: HC.fsh[1], align: 'right' });
    label(s, 5.55, 3.78, 0.85, '**no LH**', { size: 10.5, color: HC.lh[1], align: 'left' });
    ovary(s, 4.7, 4.62, 1.3, 0.7, {});
    label(s, 3.3, 5.0, 2.8, '**no egg matures**, **no ovulation**', { size: 10.5, color: C.red });
    box(s, 0.7, 2.95, 2.3, 2.35, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    poly(s, [[1.15, 3.1], [2.35, 3.1], [2.05, 3.75], [1.45, 3.75]], WALL, WALL_EDGE, { lw: 1.25 });
    label(s, 1.15, 3.2, 1.2, 'uterus', { size: 10, italic: true, color: '8E2A33' });
    box(s, 1.55, 3.75, 0.4, 0.5, WALL, WALL_EDGE, { lw: 1.25 });
    box(s, 1.66, 3.75, 0.18, 0.5, 'EFE3A0', 'B8A858', { lw: 0.75 });
    box(s, 1.5, 4.25, 0.5, 0.42, LUMEN, WALL_EDGE, { lw: 1 });
    sperm(s, 1.66, 4.42, 1); sperm(s, 1.8, 4.55, 1);
    label(s, 2.02, 3.75, 0.95, '**cervix**: thick mucus', { size: 10, color: HC.pro[1], align: 'left', h: 0.45, valign: 'top' });
    label(s, 2.05, 4.35, 0.9, 'sperm blocked', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.4, valign: 'top' });
    label(s, 0.75, 4.75, 2.2, 'progesterone makes the **mucus thick**', { size: 10, color: HC.pro[1], h: 0.42, valign: 'top' });
    label(s, 0.7, 5.42, 1.1, '**Also:**', { size: 10.5, align: 'left' });
    box(s, 1.35, 5.52, 0.3, 0.07, 'D9C6A8', '8A6A3A', { lw: 0.75 }); label(s, 1.7, 5.42, 0.9, 'implant', { size: 10, align: 'left' });
    syringe(s, 2.6, 5.555, 0.45, HC.pro[0]); label(s, 3.1, 5.42, 0.9, 'injection', { size: 10, align: 'left' });
    box(s, 3.95, 5.46, 0.2, 0.2, 'F3D9B8', '8A6A3A', { lw: 0.75 }); label(s, 4.2, 5.42, 0.6, 'patch', { size: 10, align: 'left' });
    line(s, 4.85, 5.48, 5.15, 5.48, HC.pro[0], 2.5); line(s, 5.0, 5.48, 5.0, 5.68, HC.pro[0], 2.5); label(s, 5.2, 5.42, 1.3, 'hormonal coil (IUS)', { size: 10, align: 'left' });
  },
  head: 'How hormones prevent pregnancy',
  lines: [
    '**Combined pill**: oestrogen + progesterone. They **inhibit FSH and LH**, so **no egg matures** and there is **no ovulation**.',
    '**Progesterone** also makes **cervical mucus thick**, so sperm cannot reach an egg; some progesterone-only methods also thin the lining.',
    'Long-acting methods (**implant, injection, IUS**) release progesterone for months or years.',
  ],
  worked: { head: 'Exam technique: explain', q: 'Explain how the combined pill prevents pregnancy.',
    steps: [['Hormones', 'pill keeps oestrogen and progesterone levels high'], ['Pituitary', 'FSH and LH release is inhibited'], ['Ovary', 'no egg matures, no LH surge → no ovulation'], ['Answer', 'no egg to fertilise (and thick mucus blocks sperm)']] },
  qc: 'Which hormone in the pill stops an egg **maturing**, by inhibiting FSH? How does progesterone stop **sperm**?',
  notes: 'QUICK CHECK ANSWER: oestrogen (inhibits FSH) (1) – progesterone also inhibits FSH/LH; progesterone thickens the mucus at the cervix so sperm cannot pass through (1).\n7.6 "how hormonal contraception influences the menstrual cycle and prevents pregnancy".',
}), '7.6 Hormonal contraception');

// ======================= 14 EVALUATE CONTRACEPTION =======================
{
  const s = D.contentHeader('Evaluating contraception', 'Specification 7.7 • hormonal and barrier methods compared', { tag: '7.7' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'approximate CDC typical-use data; green hormonal, blue barrier');
  const g = { x: 1.55, y: 1.55, w: 4.75, h: 3.45, xmin: 0, xmax: 6, ymin: 0, ymax: 20, xstep: 1, ystep: 5, minor: 1, ylabel: 'pregnancies per 100 women per year', grid: true, fmt: () => '', yfmt: v => String(v) };
  axes(s, g);
  FAIL.forEach(([n, v, t], i) => {
    const col = t === 'h' ? C.green : t === 'b' ? '3B7DD8' : C.grey;
    bar(s, g, i + 0.5, v, 0.5, col, null);
    label(s, px(g, i + 0.5) - 0.4, py(g, v) - 0.25, 0.8, String(v), { size: 10.5, bold: true, color: col });
    label(s, px(g, i + 0.5) - 0.4, g.y + g.h + 0.06, 0.8, n, { size: 10, h: 0.4, valign: 'top' });
  });
  label(s, 0.7, 5.5, 5.7, 'Typical use = how people really use it (missed pills, condom errors).', { size: 10, italic: true, color: C.grey, h: 0.3 });
  const rows = [[HDR(''), HDR('Hormonal (pill, implant, injection)'), HDR('Barrier (condom, diaphragm)')],
    ['Advantages', 'very effective; implant/injection last months–years; can reduce heavy periods', 'no hormone side effects; condoms protect against STIs; used only when needed'],
    ['Disadvantages', 'side effects (mood, weight, blood clots); no STI protection; pill must be taken daily', 'less effective in typical use; can split or slip; must be used every time'],
  ].map((r, i) => i === 0 ? r : r.map((t, j) => tcell(t, i, j === 0 ? { bold: true, color: C.ink } : {})));
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.25, 2.42, 2.41], rowH: [0.45, 1.05, 1.05], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 4.05, 6.08, 2.2, 'Worked example: evaluate (use the data)', 'Compare the pill and the male condom.', [
    ['Data', `pill 7, condom 13 pregnancies per 100 → about ${pillEff}% vs ${condomEff}% effective`], ['For pill', 'more effective; no interruption'], ['For condom', 'protects against STIs; no hormones'], ['Judgement', 'pill + condom together gives both benefits']], { size: 10.5 });
  D.quickCheck(s, 'Give **one** advantage of a barrier method over a hormonal method, and **one** advantage of the implant over the pill.');
  D.notes(s, `QUICK CHECK ANSWER: barrier: protects against STIs / no hormonal side effects (1); implant: does not rely on remembering daily / lasts years / more effective in typical use (1).\nData: CDC (Trussell) typical-use first-year failure rates: implant 0.1, copper IUD 0.8, injection 4, pill 7, male condom 13, diaphragm 17 (approximate, UNVERIFIED against the latest table). Effectiveness = 100 − failures: pill ${pillEff}%, condom ${condomEff}%. Condom failure is about ${sf(13 / 7, 2)} × the pill's. "Evaluate" needs points for AND against plus a justified judgement.`);
  reg(s, '7.7 Evaluating contraception');
}

// ======================= 15 ART (HT) =======================
reg(D.contentSlide({
  title: 'Hormones in assisted reproduction',
  subtitle: 'Specification 7.8 • clomifene therapy and IVF',
  tag: '7.8', ht: true, panelW: 7.3, caption: 'IVF in five steps; clomifene therapy in the top strip',
  draw: (s, p) => {
    box(s, 0.65, 1.45, 6.9, 0.95, C.white, HC.fsh[0], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    label(s, 0.8, 1.5, 2.0, '**Clomifene therapy**', { size: 11.5, color: HC.fsh[1], align: 'left' });
    label(s, 0.8, 1.8, 6.6, 'tablets → pituitary releases **more FSH and LH** → eggs mature and **ovulation** happens → conceive naturally', { size: 10.5, align: 'left', h: 0.5, valign: 'top' });
    const tw = 1.25, th = 2.9, gx = 0.16, y = 2.6;
    const steps = [['1 **FSH (and LH)** injections', 'several eggs mature'], ['2 Eggs **collected**', 'fine needle from ovary'], ['3 **Fertilised** in a dish', 'eggs + sperm'], ['4 **Embryos** grow', 'a few days'], ['5 1–2 embryos **into the uterus**', 'may implant']];
    steps.forEach(([h, sub], i) => {
      const x = 0.65 + i * (tw + gx);
      box(s, x, y, tw, th, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      label(s, x + 0.05, y + 0.06, tw - 0.1, h, { size: 10.5, h: 0.7, valign: 'top' });
      label(s, x + 0.05, y + th - 0.5, tw - 0.1, sub, { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
      const cx = x + tw / 2, cy = y + 1.45;
      if (i === 0) { syringe(s, cx - 0.42, cy - 0.2, 0.85, HC.fsh[0]); ovary(s, cx, cy + 0.4, 0.95, 0.55, { mature: true }); }
      if (i === 1) { ovary(s, cx - 0.12, cy + 0.1, 0.8, 0.55, { mature: true }); line(s, cx + 0.12, cy, cx + 0.55, cy - 0.45, '4A5262', 2); egg(s, cx - 0.2, cy + 0.6, 0.09); egg(s, cx + 0.15, cy + 0.6, 0.09); }
      if (i === 2) { oval(s, cx, cy + 0.08, 1.05, 0.55, 'EEF5F4', '6B7385', { lw: 1.5 }); egg(s, cx - 0.18, cy + 0.08, 0.12); egg(s, cx + 0.22, cy + 0.12, 0.09); sperm(s, cx - 0.42, cy - 0.02, 1); sperm(s, cx + 0.02, cy + 0.22, -1); sperm(s, cx - 0.38, cy + 0.2, 1); }
      if (i === 3) { embryo(s, cx, cy - 0.15, 0.22); embryo(s, cx, cy + 0.42, 0.22); }
      if (i === 4) { miniUterus(s, cx, cy - 0.1, 0.95); ball(s, cx - 0.05, cy - 0.02, 0.06, 'F7D7B5', 'A4561C', 0.75); }
      if (i < 4) arrow(s, x + tw + 0.01, y + th / 2, x + tw + gx - 0.01, y + th / 2, C.blue, 2);
    });
  },
  head: 'Assisted Reproductive Technology (ART)',
  lines: [
    '**Clomifene**: for women who do not ovulate regularly. It causes **more FSH and LH** to be released, so eggs mature and are released.',
    '**IVF** (in vitro fertilisation): **FSH and LH** make **several eggs mature**; eggs are collected and **fertilised outside the body**; embryos are placed in the uterus.',
    'Issues: expensive, low success rate, **multiple births**, emotional stress.',
  ],
  size: 10.5,
  worked: { head: 'Use the data', q: 'IVF live-birth rate: about 32% (under 35) and 11% (age 40–42). Compare.',
    steps: [['Divide', `32 ÷ 11 = ${sf(ivfRatio, 2)}`], ['Answer', `about ${sf(ivfRatio, 2)} times more likely to succeed under 35`]], size: 10.5 },
  workedH: 1.55,
  qc: 'Why are women given **FSH** at the start of IVF? Give **one** disadvantage of IVF.',
  notes: `QUICK CHECK ANSWER: to make several eggs mature at once so more can be collected (1); any one: expensive / low success rate / multiple births (risk to mother and babies) / ovarian over-stimulation / emotional stress / ethical issues over spare embryos (1).\nIVF % figures are approximate HFEA-style values (illustrative). ${32}/${11} = ${ivfRatio}. LH is also given in IVF to make the eggs mature fully before collection.`,
}), '7.8 ART: clomifene and IVF (HT)');

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 7.6–7.8 • contraception and ART', [
  { q: 'Explain how the combined contraceptive pill prevents ovulation.', marks: 2, ms: 'Pill contains oestrogen / progesterone that inhibit FSH (and LH) (1); so no egg matures / no LH surge / no ovulation (1).' },
  { q: 'Give **one** advantage and **one** disadvantage of using a condom rather than the pill.', marks: 2, ms: 'Advantage: protects against STIs / no hormonal side effects (1). Disadvantage: less effective (in typical use) / can split / must be used every time (1).' },
  { q: 'Explain how **clomifene therapy** helps a woman who does not ovulate to become pregnant.', marks: 3, ht: true, ms: 'Clomifene increases release of FSH and LH (from the pituitary) (1); FSH causes eggs / follicles to mature (1); LH triggers ovulation so an egg can be fertilised (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 HOMEOSTASIS 7.9 =======================
reg(D.contentSlide({
  title: 'Homeostasis: a constant internal environment',
  subtitle: 'Specification 7.9 • responding to internal and external change',
  tag: '7.9', caption: 'a negative feedback loop keeps a factor close to its normal level',
  draw: (s, p) => {
    const nodes = [['change: level **rises** or **falls**', 1.0, 1.55, 'FDEDEE', C.red], ['**receptor** detects the change', 3.65, 1.55, 'E6F0FB', '3B7DD8'], ['**coordination centre** (brain, gland)', 3.65, 2.95, 'EEE3F5', G.thy[1]], ['**effector** (muscle, gland) responds', 1.0, 2.95, 'E3F2E8', '1E6B40']];
    nodes.forEach(([t, x, y, f, e]) => pbox(s, x, y, 2.4, 0.8, t, f, e, { size: 11 }));
    arrow(s, 3.42, 1.95, 3.63, 1.95, C.ink, 2.5); arrow(s, 4.85, 2.37, 4.85, 2.93, C.ink, 2.5); arrow(s, 3.63, 3.35, 3.42, 3.35, C.ink, 2.5);
    arrow(s, 2.2, 2.93, 2.2, 2.37, C.green, 2.5);
    label(s, 0.6, 2.47, 1.6, 'change **reversed**', { size: 10.5, color: '1E6B40', align: 'right' });
    const g = { x: 1.45, y: 4.05, w: 4.7, h: 1.25, xmin: 0, xmax: 60, ymin: 36.5, ymax: 37.5, xstep: 10, ystep: 0.5, minor: 1, xlabel: 'time / min', ylabel: '°C' };
    axes(s, g);
    line(s, g.x, py(g, SET), g.x + g.w, py(g, SET), C.orange, 1.25, { dash: 'dash' });
    curve(s, g, fb, C.red, 2.25);
    label(s, g.x + g.w - 1.8, g.y - 0.3, 1.8, 'normal level (37 °C)', { size: 10, bold: true, color: C.orange, align: 'right' });
  },
  head: 'Why keep conditions constant?',
  lines: [
    '**Homeostasis** = keeping the **internal environment** (body temperature, blood glucose, water content) **constant**.',
    'Cells need steady conditions for **enzymes** and for the **water balance** of cells.',
    'Conditions change **externally** (hot day, cold wind) and **internally** (exercise, a meal, sweating).',
    '**Negative feedback**: any change from normal triggers a response that **brings it back**.',
  ],
  worked: { head: 'Examples in Topic 7', q: '',
    steps: [['Temperature', 'about 37 °C – skin and hypothalamus'], ['Blood glucose', 'insulin and glucagon from the pancreas'], ['Water', 'kidneys and ADH'], ['Answer', 'all use negative feedback to stay near normal']] },
  qc: 'Give **one** internal and **one** external change that could affect body temperature.',
  notes: 'QUICK CHECK ANSWER: internal: exercise / respiration in muscles / fever (1); external: hot or cold weather / cold water (1).\nThe graph is a model: temperature fluctuates slightly (±0.3 °C) about the set point. 7.9 is in both courses.',
}), '7.9 Homeostasis and negative feedback');

// ======================= 18 IMPORTANCE 7.10B =======================
{
  const s = D.contentHeader('Why homeostasis matters', 'Specification 7.10B • thermoregulation and enzymes; osmoregulation and animal cells', { tag: '7.10B', p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'enzyme model data; red blood cells in three solutions');
  const g = { x: 1.3, y: 1.5, w: 4.9, h: 1.85, xmin: 0, xmax: 60, ymin: 0, ymax: 100, xstep: 10, ystep: 25, minor: 1, xlabel: 'temperature / °C', ylabel: 'activity / %' };
  axes(s, g);
  const sm = []; for (let i = 0; i < ENZ.length - 1; i++) { const [a, ya] = ENZ[i], [b, yb] = ENZ[i + 1]; for (let j = 0; j < 8; j++) { const t = j / 8, u = (1 - Math.cos(t * Math.PI)) / 2; sm.push([a + (b - a) * t, ya + (yb - ya) * u]); } } sm.push(ENZ[ENZ.length - 1]);
  plotLine(s, g, sm, C.blue, 2.5); points(s, g, ENZ, C.ink);
  line(s, px(g, 37), g.y, px(g, 37), g.y + g.h, C.orange, 1.25, { dash: 'dash' });
  label(s, px(g, 37) - 1.25, g.y + 0.02, 1.2, '37 °C', { size: 10.5, bold: true, color: C.orange, align: 'left' });
  label(s, px(g, 46), py(g, 70), 1.2, 'denatured', { size: 10, italic: true, color: C.red, align: 'left' });
  const ys = 4.75;
  [['concentrated (too little water)', 'shrink', 1.55, 'water leaves: cell shrinks'], ['same concentration', 'normal', 3.4, 'no net movement'], ['dilute (too much water)', 'swell', 5.25, 'water enters: cell swells, may burst']].forEach(([t, st, cx, r]) => {
    label(s, cx - 0.9, 3.95, 1.8, t, { size: 10, bold: true, color: C.ink, h: 0.3 });
    rbcState(s, cx, ys, st);
    label(s, cx - 0.9, 5.4, 1.8, r, { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
  });
  arrow(s, 1.55, 4.3, 1.55, 4.42, WAT, 1.5); arrow(s, 5.25, 4.12, 5.25, 4.22, WAT, 1.5);
  D.card(s, 6.8, 1.3, 6.08, 2.55, 'a Thermoregulation: the effect on enzymes', [
    'Body enzymes work best at about **37 °C** (the optimum).',
    'Too **hot**: the active site changes shape – the enzyme is **denatured**; reactions stop.',
    'Too **cold**: molecules move slowly, fewer collisions – reactions are **too slow**.',
  ], { size: 11 });
  D.card(s, 6.8, 3.97, 6.08, 2.28, 'b Osmoregulation: the effect on animal cells', [
    'Water moves into or out of cells by **osmosis** if blood plasma is too dilute or too concentrated.',
    'Animal cells have **no cell wall**: too much water in → they **swell and burst** (lysis); too much out → they **shrink**.',
  ], { size: 11 });
  D.quickCheck(s, `Use the graph: by how much does activity fall from 37 °C to 45 °C? Why could drinking a huge volume of water damage red blood cells?`);
  D.notes(s, `QUICK CHECK ANSWER: 100% − 60% = ${enzDrop} percentage points (1). Blood plasma becomes very dilute, so water enters red blood cells by osmosis (1); they swell and may burst (no cell wall) (1).\nEnzyme data: model values (relative activity), copied from the OCR B5.4 deck. 7.10B is biology only.`);
  reg(s, '7.10B Why homeostasis matters (BIOLOGY ONLY)');
}

// ======================= 19 SKIN 7.11B =======================
reg(D.contentSlide({
  title: 'The skin and thermoregulation',
  subtitle: 'Specification 7.11B • the dermis, sweat glands and blood vessels',
  tag: '7.11B', p: true, caption: 'cross-section of human skin (simplified, not to scale)',
  draw: (s, p) => {
    const x0 = 0.7, x1 = 4.55, yS = 1.95, yE = 2.3, yD = 4.35, yF = 5.25;
    box(s, x0, yS, x1 - x0, yE - yS, 'F2CFB4', 'B98E6E', { lw: 1 });                  // epidermis
    box(s, x0, yE, x1 - x0, yD - yE, 'F8E3D3', null);                                     // dermis
    box(s, x0, yD, x1 - x0, yF - yD, 'FFF3C4', null);                                     // fat
    for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) oval(s, x0 + 0.3 + i * 0.42 + (j % 2) * 0.2, yD + 0.25 + j * 0.42, 0.4, 0.34, null, 'E0C46A', { lw: 0.75 });
    line(s, x0, yD, x1, yD, 'D9B48A', 1); line(s, x0, yF, x1, yF, 'D9B48A', 1);
    // hair, follicle and erector muscle
    const hx = 1.35;
    oval(s, hx, 3.55, 0.32, 0.7, 'EBC9A8', '8A6A3A', { lw: 1 });
    line(s, hx, 3.8, hx - 0.3, 1.5, '4A3A2A', 3);
    line(s, hx + 0.12, 3.35, hx + 0.6, 2.6, 'C76A72', 3.5);
    // sweat gland (coil) and duct to a pore
    const sx = 2.55;
    for (let i = 0; i < 4; i++) oval(s, sx - 0.15 + (i % 2) * 0.22, 3.85 + Math.floor(i / 2) * 0.18, 0.3, 0.2, 'DCEBFA', '3B7DD8', { lw: 1.25 });
    line(s, sx, 3.75, sx, yS, '3B7DD8', 2);
    dropIcon(s, sx, yS - 0.05, 0.07); dropIcon(s, sx + 0.18, yS - 0.13, 0.05);
    // blood vessels: arteriole from below, capillary loop under the epidermis, venule back
    const vx = 3.65;
    line(s, vx - 0.15, yF, vx - 0.15, 2.55, ART, 3.5);
    line(s, vx + 0.25, 2.55, vx + 0.25, yF, VEIN, 3.5);
    s.addShape(SH.ARC, { x: vx - 0.15, y: 2.38, w: 0.4, h: 0.34, angleRange: [180, 0], line: { color: ART, width: 3 }, fill: { type: 'none' } });
    line(s, vx - 0.15, 3.65, vx + 0.25, 3.65, '9E4A7A', 2); label(s, vx + 0.3, 3.5, 0.6, 'shunt', { size: 10, italic: true, color: '9E4A7A', align: 'left' });
    // receptor (nerve ending)
    line(s, 3.1, 2.42, 3.1, 4.2, 'E0B000', 1.5); ball(s, 3.1, 2.42, 0.07, 'F5C342', '8A6A0A', 1);
    // labels on the right
    callout(s, 4.75, 2.12, 1.6, 'Epidermis', x1 - 0.05, 2.12, C.ink);
    callout(s, 4.75, 2.65, 1.6, 'Capillary loop', vx + 0.05, 2.45, ART);
    callout(s, 4.75, 3.15, 1.6, 'Arteriole', vx - 0.15, 3.2, ART);
    callout(s, 4.75, 3.6, 1.6, 'Dermis', x1 - 0.1, 3.75, C.ink);
    callout(s, 4.75, 4.7, 1.6, 'Fat (insulation)', x1 - 0.1, 4.75, '8A6A0A');
    // labels on the left/top
    label(s, 1.15, 1.42, 0.6, '**Hair**', { size: 10.5, align: 'left' });
    callout(s, 2.85, 1.6, 1.2, 'Sweat pore', sx + 0.03, yS - 0.03, '2F5F8F', { size: 10.5 });
    label(s, 0.72, 5.3, 1.2, 'hair erector muscle', { size: 10, h: 0.3, color: 'A33E48', align: 'left' });
    line(s, 1.3, 5.3, hx + 0.4, 2.95, 'A33E48', 0.75);
    label(s, 1.95, 5.3, 1.25, 'sweat gland', { size: 10, h: 0.3, color: '2F5F8F', align: 'left' });
    line(s, 2.45, 5.3, sx, 4.15, '2F5F8F', 0.75);
    label(s, 2.95, 5.55, 1.8, 'temperature receptor', { size: 10, h: 0.3, color: '8A6A0A', align: 'left' });
    line(s, 3.15, 5.55, 3.1, 4.2, '8A6A0A', 0.75);
  },
  head: 'The skin as an effector',
  lines: [
    'The **dermis** contains **temperature receptors**, **sweat glands**, **blood vessels**, hairs and their erector muscles.',
    '**Too hot**: sweat glands release **sweat**; water **evaporates**, transferring energy away and cooling the skin. More blood flows near the surface.',
    '**Too cold**: little or no sweat; less blood near the surface; hairs stand up to trap air; **shivering** muscles release heat by respiration.',
  ],
  size: 11,
  worked: { head: 'Explain the cooling', q: 'Explain how sweating cools the body.',
    steps: [['Release', 'sweat glands secrete sweat onto the skin'], ['Change', 'water in sweat evaporates'], ['Energy', 'evaporation transfers thermal energy from the skin'], ['Answer', 'skin and blood are cooled']] },
  qc: 'Name **two** structures in the dermis that help to **lose heat** on a hot day. Why does sweat not cool you well in very **humid** air?',
  notes: 'QUICK CHECK ANSWER: sweat glands (1); blood vessels / capillaries / arterioles near the surface (1). In humid air less sweat evaporates, so less energy is transferred away (1).\nDiagram: epidermis, dermis (receptor, sweat gland, hair and erector muscle, arteriole, capillary loop, shunt vessel, venule in blue) and fat layer. Shunt vessels are extension detail. 7.11B is biology only.',
}), '7.11B Skin and thermoregulation (BIOLOGY ONLY)');

// ======================= 20 HYPOTHALAMUS + VASO (HT, B) =======================
reg(D.contentSlide({
  title: 'Vasodilation and vasoconstriction',
  subtitle: 'Specification 7.12B • the hypothalamus controls blood flow to the skin',
  tag: '7.12B', ht: true, p: true, caption: 'skin arterioles widen or narrow; capillaries themselves do not change',
  draw: (s, p) => {
    brainIcon(s, 1.25, 1.95, 1.3);
    ball(s, 1.3, 2.12, 0.08, G.pit[0], G.pit[1], 1);
    label(s, 2.0, 1.55, 4.4, '**Hypothalamus**: thermoregulatory centre in the brain. Detects **blood temperature**; gets impulses from **skin receptors**.', { size: 10.5, align: 'left', h: 0.75, valign: 'top' });
    // two skin panels
    const panelSkin = (x, hot) => {
      const w = 2.75, y = 2.65, ph = 3.05;
      box(s, x, y, w, ph, C.white, hot ? HOT : COLD, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 });
      label(s, x + 0.1, y + 0.05, w - 0.5, hot ? '**Too hot: vasodilation**' : '**Too cold: vasoconstriction**', { size: 11, color: hot ? HOT : COLD, align: 'left' });
      if (hot) sunIcon(s, x + w - 0.3, y + 0.25, 0.11); else snowIcon(s, x + w - 0.3, y + 0.25, 0.15);
      const ys = y + 0.85;
      box(s, x + 0.15, ys, w - 0.3, 0.22, 'F2CFB4', 'B98E6E', { lw: 0.75 });
      label(s, x + 0.15, ys + 0.22, 1.3, 'epidermis', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.22 });
      const ax = x + 0.6, vx = x + 2.15, yc = ys + 0.55, yb = ys + 1.6;
      const aw = hot ? 0.22 : 0.06;
      box(s, vx - 0.06, yc, 0.12, yb - yc, VEIN, VEINE, { lw: 0.5 });
      box(s, ax, yc - 0.04, vx - ax, hot ? 0.12 : 0.04, hot ? ART : 'F2B8BB', hot ? ARTE : 'E58A8F', { lw: 0.5 });
      box(s, ax - aw / 2, yc, aw, yb - yc, ART, ARTE, { lw: 0.75 });
      if (!hot) { box(s, ax - 0.12, yc + 0.45, 0.07, 0.25, '8E2A33', null); box(s, ax + 0.05, yc + 0.45, 0.07, 0.25, '8E2A33', null); }
      label(s, ax + 0.2, yc + 0.35, 1.3, hot ? 'arteriole **wider**' : 'arteriole **narrower** (muscle contracts)', { size: 10, align: 'left', h: 0.5, valign: 'top' });
      label(s, x + 0.15, ys - 0.5, 0.6, 'heat', { size: 10, bold: true, color: HOT, align: 'left' });
      if (hot) [0, 1, 2].forEach(i => arrow(s, x + 0.8 + i * 0.55, ys - 0.03, x + 0.8 + i * 0.55, ys - 0.33, HOT, 1.75));
      else arrow(s, x + 1.35, ys - 0.03, x + 1.35, ys - 0.18, HOT, 1);
      label(s, x + 0.1, y + ph - 0.55, w - 0.2, hot ? 'more blood near surface → **more** heat lost' : 'less blood near surface → **less** heat lost', { size: 10, h: 0.5 });
    };
    panelSkin(0.7, true); panelSkin(3.65, false);
  },
  head: 'Control by the hypothalamus',
  lines: [
    'The **hypothalamus** compares blood temperature with the normal (about 37 °C) and sends **nerve impulses** to effectors.',
    '**Vasodilation** (too hot): arterioles supplying skin capillaries **widen** → more blood flows near the surface → more energy transferred to the surroundings.',
    '**Vasoconstriction** (too cold): arterioles **narrow** → less blood near the surface → less heat lost. **Shivering** also starts.',
  ],
  size: 10.5,
  worked: { head: 'Exam tip', q: 'Avoid common errors.',
    steps: [['Not', '"capillaries move" or "capillaries dilate"'], ['Say', 'arterioles (blood vessels) dilate / constrict'], ['Not', '"sweating makes heat"'], ['Answer', 'sweat evaporates, transferring energy away']], size: 10.5 },
  workedH: 1.95,
  qc: 'A person walks into a cold room. Describe **two** responses controlled by the hypothalamus, and explain how each reduces heat loss or increases heat production.',
  notes: 'QUICK CHECK ANSWER: vasoconstriction – arterioles to skin narrow, less blood near the surface, less energy lost (2); shivering – rapid muscle contractions, more respiration releases heat (2). Also: less sweating; hairs raised.\n7.12B: H marker medium confidence (Save My Exams: vasodilation/vasoconstriction mechanisms are Higher tier). Statement wording reconstructed – see SPEC_T7.md.',
}), '7.12B Hypothalamus and blood vessels (HT, BIOLOGY ONLY)');

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 7.9–7.12B • homeostasis and thermoregulation', [
  { q: 'State what is meant by **homeostasis**.', marks: 1, ms: 'Keeping the internal environment / conditions inside the body constant (despite internal and external changes) (1).' },
  { q: 'Explain why body temperature must be kept close to 37 °C.', marks: 2, ms: 'Enzymes work best / at optimum near 37 °C (1); too high: enzymes denature / active site changes shape; too low: reactions too slow (1).' },
  { q: 'Explain how **vasodilation** helps to lower body temperature.', marks: 3, ht: true, ms: 'Arterioles / blood vessels supplying the skin (capillaries) widen (1); more blood flows near the skin surface (1); more energy / heat transferred (radiated) to the surroundings (1).' },
  { q: 'Name the part of the brain that monitors blood temperature.', marks: 1, ms: 'Hypothalamus (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 INSULIN 7.13 =======================
reg(D.contentSlide({
  title: 'Insulin controls blood glucose',
  subtitle: 'Specification 7.13 • the pancreas responds to a rise in blood glucose',
  tag: '7.13', caption: 'after a meal: cells take up glucose; the liver stores it as glycogen',
  draw: (s, p) => {
    box(s, 0.7, 1.55, 5.6, 0.65, 'F6C9CC', ART, { lw: 1.5 });
    label(s, 0.8, 1.55, 2.6, '**blood**: glucose concentration **high** (after a meal)', { size: 10.5, align: 'left', h: 0.65 });
    for (let i = 0; i < 9; i++) glucose(s, 3.6 + i * 0.29, 1.75 + (i % 2) * 0.2, 0.06);
    pancreasShape(s, 0.85, 2.75, 1.7, 0.6);
    label(s, 0.7, 3.55, 2.0, '**Pancreas** detects the rise', { size: 10.5, color: G.pan[1], h: 0.3 });
    arrow(s, 1.7, 2.7, 1.7, 2.25, INS, 2.5);
    label(s, 1.85, 2.3, 1.6, '**insulin** released', { size: 10.5, color: '9A5A0A', align: 'left' });
    hormone(s, 1.45, 2.45, 0.09);
    // liver
    liverShape(s, 3.4, 2.7, 1.5, 0.95);
    label(s, 3.3, 3.7, 1.8, '**Liver**', { size: 11, color: LIV[1] });
    arrow(s, 4.0, 2.25, 4.0, 2.75, GLU, 2);
    glycogen(s, 4.15, 3.1, 0.9);
    label(s, 4.95, 2.65, 1.45, 'glucose → **glycogen** (stored)', { size: 10.5, align: 'left', h: 0.5, valign: 'top' });
    // muscle / body cells
    oval(s, 4.6, 4.75, 1.9, 0.95, 'FBF3DF', '8A6D3B', { lw: 1.5 });
    ball(s, 4.6, 4.8, 0.15, NUC[0], NUC[1], 1);
    [4.1, 4.6, 5.1].forEach(x => receptor(s, x, 4.3, 0.24, C.green, true));
    arrow(s, 5.55, 2.25, 5.55, 4.25, GLU, 2);
    glucose(s, 4.95, 4.95, 0.06); glucose(s, 4.25, 5.0, 0.06);
    label(s, 3.55, 5.27, 2.1, 'body cells (e.g. muscle) **take up glucose**', { size: 10.5, h: 0.45, valign: 'top' });
    pbox(s, 0.7, 4.3, 2.4, 0.95, 'blood glucose concentration **falls** back to normal', 'E3F2E8', '1E6B40', { size: 10.5 });
  },
  head: 'Insulin lowers blood glucose',
  lines: [
    'After a meal, **glucose** from digested carbohydrate is absorbed into the blood: concentration **rises**.',
    'The **pancreas** detects this and secretes **insulin** into the blood.',
    'Insulin causes **body cells** (especially muscle and liver) to **take up glucose** from the blood.',
    'In the **liver** and muscles, excess glucose is converted to **glycogen** for storage. Blood glucose returns to normal.',
  ],
  size: 11,
  worked: { head: 'Common mistakes', q: '',
    steps: [['Glucagon ≠ glycogen', 'glucagon is a hormone; glycogen is a stored carbohydrate'], ['Insulin', 'does not "turn into" glycogen; it triggers the change'], ['Where', 'glycogen is stored in the liver and muscles'], ['Answer', 'use the three words carefully']] },
  qc: 'Which organ detects a rise in blood glucose? What does the liver convert excess glucose into?',
  notes: 'QUICK CHECK ANSWER: the pancreas (1); glycogen (1).\n7.13 is in both courses. Normal fasting blood glucose is about 4–6 mmol/dm³ (context only).',
}), '7.13 Insulin');

// ======================= 23 GLUCAGON (HT) =======================
reg(D.contentSlide({
  title: 'Glucagon and the blood glucose feedback loop',
  subtitle: 'Specification 7.14 • insulin and glucagon act in opposite directions',
  tag: '7.14', ht: true, caption: 'two hormones from the pancreas keep blood glucose near normal',
  draw: (s, p) => {
    pbox(s, 2.3, 3.35, 2.4, 0.7, '**normal** blood glucose', 'E3F2E8', '1E6B40', { size: 11.5 });
    pbox(s, 0.7, 1.55, 2.5, 0.75, 'glucose **too high** (after a meal)', 'FDEDEE', C.red, { size: 10.5 });
    pbox(s, 3.8, 1.55, 2.5, 0.75, '**pancreas** releases **insulin**', 'FFF1DD', INS, { size: 10.5 });
    pbox(s, 3.8, 2.55, 2.5, 0.6, 'liver: glucose → **glycogen**; cells take up glucose', C.white, LIV[1], { size: 10 });
    pbox(s, 0.7, 4.85, 2.5, 0.75, 'glucose **too low** (exercise, fasting)', 'E6F0FB', '3B7DD8', { size: 10.5 });
    pbox(s, 3.8, 4.85, 2.5, 0.75, '**pancreas** releases **glucagon**', 'F3E8F8', GCG, { size: 10.5 });
    pbox(s, 3.8, 4.15, 2.5, 0.6, 'liver: **glycogen → glucose** released into blood', C.white, LIV[1], { size: 10 });
    arrow(s, 3.2, 1.92, 3.78, 1.92, C.ink, 2); arrow(s, 5.05, 2.3, 5.05, 2.53, C.ink, 2); arrow(s, 3.8, 3.0, 4.0, 3.33, C.ink, 2, {});
    arrow(s, 1.95, 3.33, 1.95, 2.32, C.red, 2); label(s, 0.55, 2.6, 1.3, 'rises', { size: 10.5, bold: true, color: C.red, align: 'right' });
    arrow(s, 1.95, 4.07, 1.95, 4.83, '3B7DD8', 2); label(s, 0.55, 4.25, 1.3, 'falls', { size: 10.5, bold: true, color: '3B7DD8', align: 'right' });
    line(s, 1.95, 3.33, 2.3, 3.7, C.grey, 0.75); line(s, 1.95, 4.07, 2.3, 3.7, C.grey, 0.75);
    arrow(s, 3.2, 5.22, 3.78, 5.22, C.ink, 2); arrow(s, 5.05, 4.85, 5.05, 4.77, C.ink, 2); arrow(s, 4.2, 4.13, 4.0, 4.07, C.ink, 2);
    hormone(s, 6.05, 1.75, 0.08, INS); hormone(s, 6.05, 5.05, 0.08, GCG);
  },
  head: 'Two hormones, opposite effects',
  lines: [
    '**Insulin** (blood glucose too **high**): cells take up glucose; liver stores it as **glycogen**.',
    '**Glucagon** (blood glucose too **low**): the liver converts **glycogen back into glucose**, which is released into the blood.',
    'Both are made by the **pancreas**. Together they keep blood glucose close to normal by **negative feedback**.',
  ],
  worked: { head: 'Explain a change', q: 'A runner\'s blood glucose falls during a long race. Explain how it is restored.',
    steps: [['Detect', 'pancreas detects low blood glucose'], ['Hormone', 'pancreas secretes glucagon into the blood'], ['Liver', 'glycogen is converted into glucose'], ['Answer', 'glucose released into blood: concentration rises to normal']] },
  qc: 'Which hormone is released when blood glucose is **low**? What does it cause the liver to do?',
  notes: 'QUICK CHECK ANSWER: glucagon (1); convert glycogen into glucose and release it into the blood (1).\n7.14 is Higher tier. Both hormones come from the islets of the pancreas (detail not required).',
}), '7.14 Glucagon (HT)');

// ======================= 24 TYPE 1 =======================
reg(D.contentSlide({
  title: 'Type 1 diabetes',
  subtitle: 'Specification 7.15 • cause and control',
  tag: '7.15', caption: 'blood glucose after a glucose drink at 0 min (model data drawn to scale)',
  draw: (s, p) => {
    const g = { x: 1.35, y: 1.55, w: 4.85, h: 3.35, xmin: 0, xmax: 180, ymin: 0, ymax: 20, xstep: 30, ystep: 5, minor: 1, xlabel: 'time after glucose drink / min', ylabel: 'blood glucose / mmol per dm³' };
    axes(s, g);
    curve(s, g, gNorm, C.green); curve(s, g, gT1, C.red);
    key(s, px(g, 95), py(g, 5.0) + 0.1, C.green, 'no diabetes', 1.2);
    key(s, px(g, 100), py(g, 19) - 0.05, C.red, 'type 1 (no insulin)', 1.6);
    points(s, g, [[120, gNorm(120)], [120, gT1(120)]], C.ink);
    line(s, px(g, 120), py(g, 0), px(g, 120), py(g, gT1(120)), C.grey, 1, { dash: 'dash' });
    insulinPen(s, 1.6, 5.56, 1.1);
    label(s, 2.9, 5.5, 3.1, 'insulin injected (pen or pump)', { size: 10.5, italic: true, color: C.grey, align: 'left' });
  },
  head: 'Cause and control',
  lines: [
    '**Cause**: the pancreas **does not produce enough insulin** (the insulin-secreting cells are destroyed by the immune system). Usually starts in childhood.',
    'Blood glucose can rise to dangerous levels; glucose may appear in the urine.',
    '**Control**: **insulin injections** (or a pump) matched to meals and exercise; regular **blood glucose tests**; careful **diet** (carbohydrate intake) and **exercise**.',
  ],
  worked: { head: 'Read the graph', q: 'Give the blood glucose at 120 min for each person.',
    steps: [['No diabetes', `about ${gN120} mmol/dm³ – back near normal`], ['Type 1', `about ${gT120} mmol/dm³ – still very high`], ['Why', 'no insulin, so cells do not take up the glucose'], ['Answer', `difference ≈ ${sf(gT120 - gN120, 2)} mmol/dm³`]] },
  qc: 'Why must people with type 1 diabetes inject insulin rather than **swallow** it as a tablet?',
  notes: `QUICK CHECK ANSWER: insulin is a protein, so it would be digested by protease enzymes in the gut (1) before it could reach the blood (1).\nGraph: model curves; node values gNorm(120) = ${sf(gNorm(120), 3)}, gT1(120) = ${sf(gT1(120), 3)} mmol/dm³. Values illustrative.`,
}), '7.15 Type 1 diabetes');

// ======================= 25 TYPE 2 =======================
reg(D.contentSlide({
  title: 'Type 2 diabetes',
  subtitle: 'Specification 7.16 • cause and control',
  tag: '7.16', caption: 'insulin binds in both cells, but only the healthy cell responds by taking up glucose',
  draw: (s, p) => {
    const cell = (cx, ok) => {
      oval(s, cx, 3.55, 2.4, 1.9, 'FBF3DF', '8A6D3B', { lw: 1.5 });
      ball(s, cx, 3.85, 0.22, NUC[0], NUC[1], 1);
      [cx - 0.6, cx, cx + 0.6].forEach(x => receptor(s, x, 2.62, 0.24, ok ? C.green : C.grey, true));
      label(s, cx - 1.2, 1.55, 2.4, ok ? '**Healthy cell**' : '**Type 2: insulin resistant**', { size: 11.5, color: ok ? '1E6B40' : C.red });
      [[-0.75, 2.05], [-0.25, 1.98], [0.35, 2.06], [0.8, 2.0]].forEach(([dx, y]) => glucose(s, cx + dx, y, 0.07));
      if (ok) { [[-0.3, 3.3], [0.3, 3.4], [-0.5, 3.75], [0.45, 4.0]].forEach(([dx, y]) => glucose(s, cx + dx, y, 0.07)); arrow(s, cx + 0.95, 2.3, cx + 0.75, 3.1, GLU, 2); }
      else { line(s, cx + 0.85, 2.35, cx + 0.85, 2.7, GLU, 2); line(s, cx + 0.72, 2.45, cx + 0.98, 2.65, C.red, 2.5); line(s, cx + 0.72, 2.65, cx + 0.98, 2.45, C.red, 2.5); }
      label(s, cx - 1.2, 4.6, 2.4, ok ? 'glucose taken **into** the cell' : 'cell does **not respond**: glucose stays in blood', { size: 10.5, h: 0.5, valign: 'top' });
    };
    cell(1.95, true); cell(5.0, false);
    label(s, 0.7, 5.25, 5.6, 'Risk factors: **obesity** (especially fat round the waist), inactivity, age, family history.', { size: 10.5, color: C.ink, h: 0.5 });
  },
  head: 'Cause and control',
  lines: [
    '**Cause**: body cells **no longer respond** properly to insulin (insulin resistance), or the pancreas does not make enough insulin. Usually develops in adults.',
    'Strongly linked to **obesity** and lack of exercise.',
    '**Control**: a **diet** low in sugar and refined carbohydrate, **regular exercise** and **losing weight**; if needed, **drugs** (e.g. metformin) and sometimes insulin.',
  ],
  worked: { head: 'Compare type 1 and type 2', q: '',
    steps: [['Type 1', 'no / too little insulin made; usually young; insulin injections'], ['Type 2', 'cells resistant to insulin; usually adults; diet, exercise, drugs'], ['Both', 'blood glucose too high'], ['Answer', 'cause decides the treatment']] },
  qc: 'Explain why **losing weight** and **exercising** can help to control type 2 diabetes.',
  notes: 'QUICK CHECK ANSWER: exercise – muscles respire more and take up more glucose from the blood (1); weight loss improves the response of cells to insulin / reduces insulin resistance (1).\n7.16 is in both courses. Most UK cases of diabetes (about 90%) are type 2 (context; approximate).',
}), '7.16 Type 2 diabetes');

// ======================= 26 BMI AND WAIST:HIP =======================
reg(D.contentSlide({
  title: 'BMI and waist:hip ratio',
  subtitle: 'Specification 7.17 • two ways to measure body mass and fat distribution',
  tag: '7.17', caption: 'measure the waist at its narrowest and the hips at their widest',
  draw: (s, p) => {
    const cx = 1.9, top = 1.45, k = 0.93;
    body(s, cx, top, k, { glands: false });
    const wy = top + 1.95 * k, hy = top + 2.55 * k;
    oval(s, cx, wy, 1.7 * k, 0.22, null, C.orange, { lw: 2, dash: 'dash' });
    oval(s, cx, hy, 1.85 * k, 0.24, null, C.blue, { lw: 2, dash: 'dash' });
    label(s, cx + 0.85, wy - 0.15, 0.9, '**waist**', { size: 11, color: C.orange, align: 'left' });
    label(s, cx + 0.92, hy - 0.15, 0.9, '**hips**', { size: 11, color: C.blue, align: 'left' });
    // BMI category bar
    const bx = 4.25, bw = 0.55, y0 = 1.55, y1 = 5.55;
    const g = { xmin: 0, xmax: 1, ymin: 15, ymax: 45, x: bx, y: y0, w: bw, h: y1 - y0 };
    const cats = [[15, 18.5, '7FA9E0', 'underweight'], [18.5, 25, '7BC596', 'healthy'], [25, 30, 'F5C342', 'overweight'], [30, 40, 'F08A4B', 'obese'], [40, 45, 'C8414C', 'severely obese']];
    cats.forEach(([a, b, c, n]) => { box(s, bx, py(g, b), bw, py(g, a) - py(g, b), c, C.white, { lw: 0.75 }); label(s, bx + bw + 0.08, (py(g, a) + py(g, b)) / 2 - 0.14, 1.4, n, { size: 10, align: 'left' }); });
    [18.5, 25, 30, 40].forEach(v => label(s, bx - 0.5, py(g, v) - 0.1, 0.45, String(v), { size: 10, align: 'right', h: 0.2 }));
    label(s, bx - 0.4, y0 - 0.3, 1.4, '**BMI**', { size: 11, color: C.ink });
    line(s, bx - 0.05, py(g, bmiA), bx + bw + 0.05, py(g, bmiA), C.ink, 2.5);
    label(s, bx + bw + 0.08, py(g, bmiA) - 0.02, 1.4, `← ${sf(bmiA, 3)}`, { size: 10.5, bold: true, color: C.ink, align: 'left' });
  },
  head: 'The two equations',
  lines: [
    { t: '__BMI = mass (kg) ÷ (height (m))²__', nob: true },
    'Healthy BMI is 18.5–24.9; **30 or more = obese**. BMI does not show **where** fat is, and counts muscle as "weight".',
    { t: '__waist:hip ratio = waist ÷ hip__ (same units)', nob: true },
    'A high ratio means fat stored round the **abdomen**; higher risk above about **1.0 for men** and **0.85 for women**.',
  ],
  size: 11,
  worked: { head: 'Worked example', q: 'A man has mass 95 kg, height 1.75 m, waist 102 cm and hips 98 cm.',
    steps: [['BMI', `95 ÷ 1.75² = 95 ÷ 3.0625 = ${sf(bmiA, 3)} → obese`], ['Ratio', `102 ÷ 98 = ${whrM.toFixed(2)}`], ['Compare', 'above 1.0 → fat stored round the waist'], ['Answer', 'both measures show a higher risk of type 2 diabetes']] },
  qc: 'Calculate the BMI of a woman with mass 68 kg and height 1.70 m. Which category is she in?',
  notes: `QUICK CHECK ANSWER: BMI = 68 ÷ 1.70² = 68 ÷ 2.89 = ${sf(bmiQ, 3)} (2); healthy (1).\nNode: 95/1.75² = ${bmiA}; 102/98 = ${whrM}. A woman with waist 76 cm, hips 100 cm: ${whrW} (below 0.85). BMI bands: NHS adult categories. Waist:hip thresholds vary between sources (0.9 or 1.0 for men); always use the value given in the question.`,
}), '7.17 BMI and waist:hip ratio');

// ======================= 27 CORRELATION =======================
reg(D.contentSlide({
  title: 'Body mass and type 2 diabetes: evaluating the link',
  subtitle: 'Specification 7.17 • evaluate the correlation',
  tag: '7.17', caption: 'illustrative data: % of adults with type 2 diabetes in each BMI group',
  draw: (s, p) => {
    const g = { x: 1.4, y: 1.6, w: 4.8, h: 3.45, xmin: 0, xmax: 4, ymin: 0, ymax: 25, xstep: 1, ystep: 5, minor: 1, ylabel: '% with type 2 diabetes', fmt: () => '', yfmt: v => String(v) };
    axes(s, g);
    T2D.forEach(([n, v], i) => {
      bar(s, g, i + 0.5, v, 0.7, ['7BC596', 'F5C342', 'F08A4B', 'C8414C'][i], null);
      label(s, px(g, i + 0.5) - 0.4, py(g, v) - 0.26, 0.8, `${v}%`, { size: 11, bold: true });
      label(s, px(g, i + 0.5) - 0.6, g.y + g.h + 0.06, 1.2, n, { size: 10.5 });
    });
    label(s, g.x, g.y + g.h + 0.35, g.w, 'BMI group', { size: 10.5, bold: true });
  },
  head: 'What the data show – and do not show',
  lines: [
    '**Positive correlation**: the higher the BMI group, the higher the % with type 2 diabetes.',
    'A correlation does **not prove** that body mass **causes** diabetes – other factors (diet, inactivity, age, genes) also vary.',
    'Scientists accept a causal link because there is a **mechanism**: excess (abdominal) fat makes cells **less sensitive to insulin**.',
    'Waist:hip ratio is often a **better predictor** than BMI because it measures fat around the abdomen.',
  ],
  size: 10.5,
  worked: { head: 'Use the data', q: 'Compare the "35 and over" group with the "under 25" group.',
    steps: [['Read', '21% and 3%'], ['Divide', '21 ÷ 3 = 7'], ['Answer', 'type 2 diabetes is about 7 times as common in the highest BMI group']], size: 10.5 },
  workedH: 1.75,
  qc: 'Give **one** reason why a person with a high BMI might **not** be at high risk of type 2 diabetes.',
  notes: 'QUICK CHECK ANSWER: BMI does not distinguish muscle from fat – e.g. a muscular athlete has a high BMI but little fat / fat may not be stored round the abdomen (1).\nData are ILLUSTRATIVE (round numbers chosen to show the pattern); they are not from a named survey. Node: 21/3 = 7; 13 − 7 = 6 percentage points between the middle groups.',
}), '7.17 Evaluating the correlation');

// ======================= 28 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 7.13–7.17 • blood glucose and diabetes', [
  { q: 'Describe how insulin lowers blood glucose concentration.', marks: 2, ms: 'Insulin causes cells / muscle and liver to take up glucose (1); liver / muscles convert glucose to glycogen (for storage) (1).' },
  { q: 'Explain the difference in the **cause** of type 1 and type 2 diabetes.', marks: 2, ms: 'Type 1: pancreas does not produce (enough) insulin (1); type 2: body cells do not respond to insulin / insulin resistance (1).' },
  { q: 'A man has mass **110 kg** and height **1.80 m**. Calculate his BMI to 1 decimal place. His waist is 88 cm and hips 104 cm: calculate his waist:hip ratio.', marks: 3, ms: `BMI = 110 ÷ 1.80² (1) = ${bmi(110, 1.80).toFixed(1)} (1); waist:hip = 88 ÷ 104 = ${(88 / 104).toFixed(2)} (1).` },
  { q: 'Explain how glucagon raises blood glucose.', marks: 2, ht: true, ms: 'Glucagon (from the pancreas) causes the liver to convert glycogen into glucose (1); glucose is released into the blood (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 29 URINARY SYSTEM 7.18B =======================
reg(D.contentSlide({
  title: 'The urinary system',
  subtitle: 'Specification 7.18B • kidneys, ureters, bladder and urethra',
  tag: '7.18B', p: true, caption: 'front view; the patient\'s right kidney is on the viewer\'s left',
  draw: (s, p) => {
    const cxL = 2.15, cxR = 4.85, ky = 2.75, kw = 0.95, kh = 1.5, vcx = 3.3, aox = 3.72;
    // renal arteries (drawn first: pass behind the vena cava)
    tube(s, [[aox, ky - 0.2], [cxL + 0.25, ky - 0.2]], ART, ARTE, 7);
    tube(s, [[aox, ky - 0.2], [cxR - 0.25, ky - 0.2]], ART, ARTE, 7);
    // vena cava and aorta
    tube(s, [[vcx, 1.5], [vcx, 4.55]], VEIN, VEINE, 16);
    tube(s, [[aox, 1.5], [aox, 4.55]], ART, ARTE, 13);
    // renal veins (in front)
    tube(s, [[vcx, ky + 0.12], [cxL + 0.25, ky + 0.12]], VEIN, VEINE, 8);
    tube(s, [[vcx, ky + 0.12], [cxR - 0.25, ky + 0.12]], VEIN, VEINE, 8);
    // kidneys (on top so vessels enter the hilum)
    const hL = kidney(s, cxL, ky, kw, kh, -1);
    const hR = kidney(s, cxR, ky, kw, kh, 1);
    // ureters to the bladder
    const bx = 3.5, by = 5.0;
    tube(s, [[hL[0] - 0.05, ky + 0.3], [hL[0] + 0.05, 3.8], [3.05, 4.75]], URI[0], URI[1], 5);
    tube(s, [[hR[0] + 0.05, ky + 0.3], [hR[0] - 0.05, 3.8], [3.95, 4.75]], URI[0], URI[1], 5);
    oval(s, bx, by, 1.25, 0.82, URI[0], URI[1], { lw: 1.75 });
    oval(s, bx, by - 0.05, 0.9, 0.5, 'F7E39A', null);
    tube(s, [[bx, by + 0.4], [bx, 5.8]], URI[0], URI[1], 5);
    // labels
    callout(s, 0.55, 1.55, 1.15, 'Kidney', cxL - 0.2, ky - 0.55, KID[1]);
    callout(s, 0.55, 3.75, 1.15, 'Ureter', hL[0] + 0.02, 3.6, URI[1]);
    callout(s, 0.55, 4.55, 1.55, 'Vena cava', vcx - 0.08, 4.3, VEINE);
    callout(s, 5.55, 1.75, 0.9, 'Aorta', aox + 0.08, 1.85, ARTE);
    callout(s, 5.45, 4.3, 1.0, 'Renal vein', 4.0, ky + 0.13, VEINE);
    callout(s, 5.45, 2.0, 1.0, 'Renal artery', 4.3, ky - 0.2, ARTE);
    callout(s, 4.6, 4.75, 1.4, 'Bladder', bx + 0.55, by, URI[1]);
    callout(s, 4.6, 5.5, 1.4, 'Urethra', bx + 0.05, 5.6, URI[1]);
    label(s, 0.55, 1.72, 1.05, 'filters blood; makes urine', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.45, valign: 'top' });
  },
  head: 'Structure and route of urine',
  lines: [
    '**Renal artery**: brings blood (with urea and excess water and ions) **to** the kidney. **Renal vein**: takes **filtered** blood away.',
    '**Kidneys**: filter the blood, reabsorb what is useful and make **urine** (urea, excess water and ions).',
    '**Ureters**: carry urine from each kidney to the **bladder**, which **stores** it.',
    '**Urethra**: carries urine out of the body.',
  ],
  size: 11,
  worked: { head: 'Learn the route', q: 'Trace a molecule of urea from the aorta to outside the body.',
    steps: [['Blood', 'aorta → renal artery → kidney'], ['Kidney', 'filtered into a nephron → urine'], ['Urine', 'ureter → bladder → urethra'], ['Answer', 'out of the body (urination)']] },
  qc: 'Which vessel carries blood **into** the kidney? Name the tube that carries urine **from the kidney to the bladder**.',
  notes: 'QUICK CHECK ANSWER: renal artery (1); ureter (1). (Common confusion: ureter = kidney to bladder; urethra = bladder to outside.)\nDiagram: front view. The aorta (red) lies to the body\'s left (viewer\'s right) of the vena cava (blue); the right renal artery passes behind the vena cava. Each kidney\'s hilum (vessels and ureter) faces the midline; the yellow funnel is the renal pelvis. Urea is made in the liver (from excess amino acids) – context only. 7.18B is biology only.',
}), '7.18B The urinary system (BIOLOGY ONLY)');

// ======================= 30 NEPHRON STRUCTURE 7.19B =======================
{
  const s = D.contentHeader('The nephron: structure', 'Specification 7.19B • about a million nephrons in each kidney filter the blood', { tag: '7.19B', p: true });
  D.panel(s, 0.45, 1.3, 7.55, 4.95, 'one nephron (simplified, not to scale); numbers show where each process happens');
  // cortex / medulla
  box(s, 0.6, 1.42, 7.25, 1.85, 'F6E5DE', null);
  box(s, 0.6, 3.27, 7.25, 2.35, 'EFD3CC', null);
  line(s, 0.6, 3.27, 7.85, 3.27, KID[1], 1, { dash: 'dash' });
  label(s, 6.9, 1.45, 0.9, 'cortex', { size: 10, italic: true, color: KID[1], align: 'right' });
  label(s, 6.9, 3.3, 0.9, 'medulla', { size: 10, italic: true, color: KID[1], align: 'right' });
  // geometry
  const bcX = 1.85, bcY = 2.3, bcR = 0.48, TW = 9;
  const pct = wavy(bcX + bcR - 0.02, 3.9, bcY, 0.17, 4);
  const loop = [[3.9, bcY], [3.9, 5.0], [3.95, 5.2], [4.15, 5.3], [4.4, 5.3], [4.6, 5.2], [4.65, 5.0], [4.65, 2.6]];
  const dct = wavy(4.65, 6.05, 2.6, 0.15, 3);
  // capillary network: efferent arteriole → round the tubules → venule (to renal vein); drawn first, behind the tubule
  const cap1 = [[1.0, 2.95], [2.45, 2.95], ...wavy(2.45, 3.75, 2.95, 0.08, 4).slice(1), [4.12, 2.95], [4.12, 5.05], [4.27, 5.15], [4.43, 5.05], [4.43, 3.0]];
  const cap2 = [[4.43, 3.0], ...wavy(4.6, 6.0, 3.05, 0.08, 3), [6.25, 3.05]];
  polyline(s, cap1, 'E58A8F', 2.5); polyline(s, cap2, '8FA8D6', 2.5);
  arrow(s, 6.25, 3.05, 6.25, 3.25, VEINE, 1.5);
  label(s, 4.75, 3.32, 1.4, 'to renal vein', { size: 10, italic: true, color: VEINE, align: 'right', h: 0.25 });
  // tubule
  tube(s, pct, TUB[0], TUB[1], TW); tube(s, loop, TUB[0], TUB[1], TW); tube(s, dct, TUB[0], TUB[1], TW);
  tube(s, [[6.05, 2.6], [6.6, 2.6]], TUB[0], TUB[1], TW);
  tube(s, [[6.6, 1.5], [6.6, 5.4]], 'FFF3B0', URI[1], 15);
  arrow(s, 6.6, 5.3, 6.6, 5.82, URI[1], 2.5);
  label(s, 6.75, 5.5, 1.2, 'urine → ureter', { size: 10, italic: true, color: URI[1], align: 'left', h: 0.25 });
  // water leaving the collecting duct and loop
  [[4.55], [4.95]].forEach(([y]) => { arrow(s, 6.45, y, 6.05, y, WAT, 2); });
  label(s, 5.35, 4.6, 0.65, 'water', { size: 10, bold: true, color: WAT, align: 'right', h: 0.25 });
  // Bowman's capsule (cup) with glomerulus
  oval(s, bcX, bcY, 2 * bcR, 2 * bcR, TUB[0], TUB[1], { lw: 2.5 });
  oval(s, bcX - 0.06, bcY, 2 * bcR - 0.24, 2 * bcR - 0.24, 'FFF9E8', TUB[1], { lw: 1 });
  [[-0.12, -0.12], [0.08, -0.15], [0.15, 0.05], [-0.02, 0.12], [-0.2, 0.08], [0.0, -0.02]].forEach(([dx, dy]) => oval(s, bcX - 0.06 + dx, bcY + dy, 0.2, 0.17, 'F6C9CC', ART, { lw: 1.5 }));
  // afferent (wide) in; efferent (narrow) out and down to the capillaries
  tube(s, [[0.62, 1.95], [bcX - 0.32, 2.17]], ART, ARTE, 8);
  tube(s, [[bcX - 0.32, 2.4], [1.0, 2.62], [1.0, 2.95]], ART, ARTE, 4.5);
  label(s, 0.6, 1.5, 2.0, '**afferent arteriole** (wide)', { size: 10, color: ARTE, align: 'left' });
  label(s, 0.55, 3.0, 2.0, '**efferent arteriole** (narrow)', { size: 10, color: ARTE, align: 'left', h: 0.25 });
  // labels
  callout(s, 2.75, 1.55, 1.1, 'Glomerulus', bcX - 0.06, bcY - 0.05, ARTE, { size: 10.5 });
  callout(s, 0.6, 3.75, 1.5, "Bowman's capsule", bcX - 0.25, bcY + 0.4, TUB[1], { size: 10.5 });
  callout(s, 2.3, 4.05, 1.3, 'Proximal (first) convoluted tubule', 3.05, bcY + 0.1, TUB[1], { size: 10, h: 0.55 });
  callout(s, 2.5, 4.95, 1.1, 'Loop of Henle', 3.9, 4.7, TUB[1], { size: 10.5, h: 0.45 });
  label(s, 4.45, 1.48, 1.9, 'Distal (second) convoluted tubule', { size: 10, bold: true, color: TUB[1], align: 'left', h: 0.4, valign: 'top' });
  line(s, 5.3, 1.9, 5.3, 2.42, TUB[1], 1); ball(s, 5.3, 2.42, 0.03, TUB[1]);
  callout(s, 6.85, 4.0, 1.05, 'Collecting duct', 6.72, 3.8, URI[1], { size: 10.5, h: 0.5 });
  callout(s, 4.75, 4.15, 1.15, 'Capillaries', 4.43, 4.15, 'C8414C', { size: 10.5 });
  badge(s, bcX + 0.38, bcY + 0.52, 1, C.orange); badge(s, 3.35, 1.88, 2, C.blue); badge(s, 6.25, 3.75, 3, '3B7DD8');
  // right card + key
  D.card(s, 8.25, 1.3, 4.63, 3.25, 'Parts of a nephron', [
    '**Glomerulus**: a knot of capillaries; blood at **high pressure**.',
    '**Bowman\'s capsule**: cup around the glomerulus that collects the **filtrate**.',
    '**Proximal convoluted tubule**: coiled; **reabsorbs** glucose, some water and ions.',
    '**Loop of Henle**: dips into the medulla; helps reabsorb **water**.',
    '**Distal tubule**, then **collecting duct**: water reabsorbed (ADH); urine to the ureter.',
  ], { size: 10.5 });
  box(s, 8.25, 4.67, 4.63, 1.58, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  [[1, C.orange, '**Filtration** (glomerulus → Bowman\'s capsule)'], [2, C.blue, '**Selective reabsorption** of glucose (proximal tubule)'], [3, '3B7DD8', '**Reabsorption of water** (loop, collecting duct)']].forEach(([n, c, t], i) => {
    badge(s, 8.55, 4.98 + i * 0.44, n, c);
    label(s, 8.8, 4.84 + i * 0.44, 4.0, t, { size: 10.5, align: 'left' });
  });
  D.quickCheck(s, 'Name the part of the nephron where blood is **filtered**, and the part that **collects** the filtrate. Which arteriole is **narrower**?');
  D.notes(s, 'QUICK CHECK ANSWER: glomerulus (1); Bowman\'s capsule (1); the efferent arteriole (leaving the glomerulus) (1) – this keeps the pressure in the glomerulus high.\nDiagram: blood enters the glomerulus by the wide afferent arteriole and leaves by the narrower efferent arteriole, which then forms the capillary network around the tubule (pink). Cortex holds the glomeruli and convoluted tubules; loops of Henle and collecting ducts run into the medulla. "Proximal/distal convoluted tubule" names are not required by Edexcel ("first/second coiled tubule" accepted). 7.19B is biology only.');
  reg(s, '7.19B Nephron structure (BIOLOGY ONLY)');
}

// ======================= 31 FILTRATION AND REABSORPTION 7.19B =======================
{
  const s = D.contentHeader('The nephron: forming urine', 'Specification 7.19B • filtration, selective reabsorption of glucose, reabsorption of water', { tag: '7.19B', p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'what moves where (simplified); arrows show net movement');
  // stage 1 filtration: capillary (top) and capsule space (bottom)
  label(s, 0.65, 1.42, 5.7, '**1 Filtration** in the glomerulus and Bowman\'s capsule', { size: 11, color: C.orange, align: 'left' });
  box(s, 0.7, 1.78, 5.6, 0.85, 'F6C9CC', ART, { lw: 1.25 });
  label(s, 0.75, 1.8, 1.4, 'blood (high pressure)', { size: 10, italic: true, color: ARTE, align: 'left', h: 0.25 });
  line(s, 0.7, 2.63, 6.3, 2.63, C.ink, 2, { dash: 'sysDash' });
  box(s, 0.7, 2.66, 5.6, 0.75, TUB[0], TUB[1], { lw: 1.25 });
  label(s, 0.75, 3.13, 1.5, 'filtrate in capsule', { size: 10, italic: true, color: TUB[1], align: 'left', h: 0.25 });
  // big things stay
  ball(s, 2.5, 2.08, 0.15, HOT, '8E2A33', 1); ball(s, 2.88, 2.12, 0.15, HOT, '8E2A33', 1);
  oval(s, 3.4, 2.1, 0.42, 0.24, 'B39DDB', '5E2D73', { lw: 1 });
  label(s, 2.0, 2.33, 1.9, 'cells, **protein** stay', { size: 10, bold: true, color: C.red, h: 0.22 });
  // small things pass
  [[4.3, 'water', WAT], [4.85, 'glucose', GLU], [5.35, 'urea', '8A6A0A'], [5.85, 'ions', '6B7385']].forEach(([x, t, c]) => {
    arrow(s, x, 2.05, x, 3.0, c, 2);
    label(s, x - 0.3, 3.08, 0.6, t, { size: 10, bold: true, color: c, h: 0.25 });
  });
  // stage 2 + 3: tubule and capillary
  label(s, 0.65, 3.55, 5.7, '**2–3 Reabsorption** along the tubule back into the blood', { size: 11, color: C.blue, align: 'left' });
  box(s, 0.7, 3.85, 5.6, 0.55, 'F6C9CC', ART, { lw: 1.25 });
  label(s, 0.75, 3.87, 1.6, 'capillary (blood)', { size: 10, italic: true, color: ARTE, align: 'left', h: 0.25 });
  box(s, 0.7, 4.5, 5.6, 0.62, TUB[0], TUB[1], { lw: 1.25 });
  label(s, 0.75, 4.85, 1.5, 'tubule (filtrate)', { size: 10, italic: true, color: TUB[1], align: 'left', h: 0.25 });
  arrow(s, 6.0, 4.81, 6.3, 4.81, TUB[1], 1.5);
  [[2.3, GLU, '**all** glucose (active transport)'], [3.9, WAT, '**most water** (osmosis)'], [5.2, '6B7385', 'some ions']].forEach(([x, c, t]) => {
    arrow(s, x, 4.95, x, 4.15, c, 2.5);
    label(s, x - 0.95, 5.15, 1.9, t, { size: 10, bold: true, color: c, h: 0.25 });
  });
  label(s, 0.7, 5.45, 5.6, 'Left in the tubule → **urine**: urea, excess water, excess ions', { size: 10.5, bold: true, color: URI[1], h: 0.25 });
  const rows = [[HDR('g per dm³'), HDR('Protein'), HDR('Glucose'), HDR('Urea'), HDR('Ions')],
    ...[['Blood plasma', KD.plasma], ['Filtrate', KD.filtrate], ['Urine', KD.urine]].map(([n, v], i) => [tcell(n, i, { bold: true, color: C.ink }), ...v.map((x, j) => tcell(j === 1 && x ? x.toFixed(1) : String(x), i, { align: 'center' }))])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.6, 1.12, 1.12, 1.12, 1.12], rowH: 0.38, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 2.95, 6.08, 1.55, 'What the table shows', [
    '**Protein**: 0 in filtrate – too large to be filtered. **Glucose**: in filtrate but **0 in urine** – all reabsorbed.',
    '**Urea**: much more concentrated in urine because **water is reabsorbed**.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.62, 6.08, 1.63, 'Worked example', 'How many times more concentrated is urea in urine than in plasma?', [
    ['Divide', `20 ÷ 0.3 = ${sf(ureaX, 3)}`], ['Answer', `about ${sf(ureaX, 2)} times more concentrated`]], { size: 10.5 });
  D.quickCheck(s, `The kidneys make about **180 dm³** of filtrate a day but only **1.5 dm³** of urine. What **percentage** of the filtrate is reabsorbed?`);
  D.notes(s, `QUICK CHECK ANSWER: (180 − 1.5) ÷ 180 × 100 = ${sf(reabPct, 3)}% (2). (Urine is only ${sf(1.5 / 180 * 100, 2)}% of the filtrate.)\nTable: typical textbook values (UNVERIFIED; real values vary). Glucose filtered per day ≈ 180 × 1.0 = ${glucFilt} g, all reabsorbed in a healthy person; glucose in urine is a sign of diabetes. Node: 20/0.3 = ${ureaX}.\nFiltration happens because blood in the glomerulus is at high pressure; small molecules are forced out, large proteins and cells stay in the blood. Selective reabsorption of glucose is by active transport (needs energy).`);
  reg(s, '7.19B Forming urine: filtration and reabsorption (BIOLOGY ONLY)');
}

// ======================= 32 STRUCTURE FITS FUNCTION 7.19B =======================
reg(D.contentSlide({
  title: 'The nephron: structure fits function',
  subtitle: 'Specification 7.19B • how the structure of the nephron is related to its function',
  tag: '7.19B', p: true, caption: 'one cell from the wall of the proximal tubule (simplified)',
  draw: (s, p) => {
    // tubule lumen (top) and capillary (bottom) either side of a tubule cell
    box(s, 0.7, 1.5, 5.6, 0.75, TUB[0], TUB[1], { lw: 1.25 });
    label(s, 0.8, 1.52, 3.0, 'filtrate in the tubule (lumen)', { size: 10.5, italic: true, color: TUB[1], align: 'left', h: 0.25 });
    for (let i = 0; i < 20; i++) box(s, 1.15 + i * 0.17, 2.0, 0.09, 0.3, 'F8DCCB', '8A6D3B', { lw: 0.5, shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    box(s, 1.0, 2.3, 3.6, 2.0, 'FBF3DF', '8A6D3B', { lw: 1.5 });
    ball(s, 1.7, 3.3, 0.3, NUC[0], NUC[1], 1);
    [[2.45, 2.75], [3.6, 3.05], [4.1, 2.65], [2.6, 3.8], [3.8, 3.85]].forEach(([x, y]) => { oval(s, x, y, 0.55, 0.28, 'F2B279', 'A4561C', { lw: 1 }); line(s, x - 0.18, y, x + 0.18, y, 'A4561C', 0.75); });
    box(s, 0.7, 4.55, 5.6, 0.7, 'F6C9CC', ART, { lw: 1.25 });
    label(s, 0.8, 4.95, 1.6, 'blood capillary', { size: 10.5, italic: true, color: ARTE, align: 'left', h: 0.25 });
    glucose(s, 3.1, 1.9, 0.08); arrow(s, 3.1, 2.05, 3.1, 4.8, GLU, 2.5);
    label(s, 3.2, 4.85, 2.9, '**glucose** reabsorbed into the blood', { size: 10.5, color: GLU, align: 'left', h: 0.3 });
    callout(s, 4.85, 2.05, 1.4, '**microvilli**: large surface area', 4.35, 2.15, '8A6D3B', { size: 10, h: 0.5, bold: false });
    callout(s, 4.85, 3.05, 1.4, '**many mitochondria**: energy for **active transport**', 4.1, 2.75, 'A4561C', { size: 10, h: 0.75, bold: false });
    callout(s, 4.85, 3.95, 1.4, 'tubule wall cell', 4.6, 3.95, '8A6D3B', { size: 10 });
  },
  head: 'Structure → function',
  lines: [
    '**Narrow efferent arteriole** → **high pressure** in the glomerulus → forces small molecules out (filtration).',
    '**Capsule and capillary walls** act as a filter: proteins and cells are **too big** to pass.',
    '**Proximal tubule**: **long and coiled**, cells with **microvilli** and **many mitochondria** → active reabsorption of **all glucose**.',
    '**Loop of Henle** and **collecting duct**: **water** reabsorbed by osmosis; the collecting duct\'s permeability is set by **ADH**.',
    '**Capillaries wrap round the tubule** → reabsorbed substances return to the blood quickly.',
  ],
  size: 10.5,
  worked: { head: 'Explain (2 marks)', q: 'Explain why tubule cells have many mitochondria.',
    steps: [['Need', 'glucose is reabsorbed by active transport (against a gradient)'], ['Answer', 'mitochondria carry out respiration to release the energy needed']], size: 10.5 },
  workedH: 1.5,
  qc: 'A person\'s urine contains **protein**. Suggest which part of the nephron is damaged and why.',
  notes: 'QUICK CHECK ANSWER: the glomerulus / Bowman\'s capsule (filter) is damaged (1); so large protein molecules can pass into the filtrate / are no longer held back (1).\nMicrovilli and mitochondria link to Topic 1 (cell structure, active transport). The loop of Henle concentrates salts in the medulla so water leaves the collecting duct by osmosis – the mechanism is beyond GCSE; "helps reabsorb water" is enough.',
}), '7.19B Structure fits function (BIOLOGY ONLY)');

// ======================= 33 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 7.18B–7.19B • the urinary system and the nephron', [
  { q: 'Name the tube that carries urine from the **bladder** to outside the body, and the organ that **stores** urine.', marks: 2, ms: 'Urethra (1); bladder (1).' },
  { q: 'Explain why there is **no protein** in the filtrate in Bowman\'s capsule.', marks: 2, ms: 'Protein molecules are too large (1); to pass through the (capillary / capsule) filter in the glomerulus (1).' },
  { q: 'Glucose is present in the filtrate but not in the urine of a healthy person. Explain why.', marks: 2, ms: 'All the glucose is (selectively) reabsorbed (1); in the (proximal / first) tubule back into the blood (by active transport) (1).' },
  { q: 'The concentration of urea is 0.3 g/dm³ in plasma and 21 g/dm³ in urine. Calculate how many times more concentrated urea is in urine.', marks: 2, ms: `21 ÷ 0.3 (1) = ${sf(21 / 0.3, 2)} (times) (1).` },
]);
calc('R6 urea factor 21/0.3', 21 / 0.3, 70, 1e-9);
reg(R6.s, 'Recap 6');

// ======================= 34 ADH (HT, B) =======================
reg(D.contentSlide({
  title: 'ADH controls the water content of the blood',
  subtitle: 'Specification 7.20B • a negative feedback loop between the brain and the kidney',
  tag: '7.20B', ht: true, p: true, caption: 'ADH makes the collecting duct more permeable to water',
  draw: (s, p) => {
    brainIcon(s, 3.5, 1.85, 1.3); ball(s, 3.55, 2.1, 0.09, G.pit[0], G.pit[1], 1);
    label(s, 0.65, 1.5, 2.4, 'receptors in the **hypothalamus** detect blood water content', { size: 10.5, align: 'right', h: 0.6, valign: 'top' });
    label(s, 4.1, 1.95, 2.3, '**pituitary** releases ADH', { size: 10.5, color: G.pit[1], align: 'left' });
    // left branch: too little water
    pbox(s, 0.7, 2.65, 2.6, 0.62, 'blood **too concentrated** (sweating, little drink)', 'FDEDEE', C.red, { size: 10 });
    pbox(s, 0.7, 3.4, 2.6, 0.5, '**more ADH** released', 'FFF1DD', INS, { size: 10.5 });
    pbox(s, 0.7, 4.03, 2.6, 0.62, 'collecting duct **more permeable**: **more water** reabsorbed', C.white, '3B7DD8', { size: 10 });
    pbox(s, 0.7, 4.78, 2.6, 0.62, '**small volume** of **concentrated** urine', 'FFF8D8', URI[1], { size: 10 });
    // right branch: too much water
    pbox(s, 3.7, 2.65, 2.6, 0.62, 'blood **too dilute** (drunk a lot of water)', 'E6F0FB', '3B7DD8', { size: 10 });
    pbox(s, 3.7, 3.4, 2.6, 0.5, '**less ADH** released', 'FFF1DD', INS, { size: 10.5 });
    pbox(s, 3.7, 4.03, 2.6, 0.62, 'collecting duct **less permeable**: **less water** reabsorbed', C.white, '3B7DD8', { size: 10 });
    pbox(s, 3.7, 4.78, 2.6, 0.62, '**large volume** of **dilute** urine', 'FFFBEA', URI[1], { size: 10 });
    [[2.0, 3.27, 3.4], [2.0, 3.9, 4.03], [2.0, 4.65, 4.78], [5.0, 3.27, 3.4], [5.0, 3.9, 4.03], [5.0, 4.65, 4.78]].forEach(([x, a, b]) => arrow(s, x, a, x, b, C.ink, 1.75));
    label(s, 0.7, 5.47, 5.6, 'Both lead back to **normal** blood water content = **negative feedback**', { size: 10.5, bold: true, color: '1E6B40', h: 0.3 });
  },
  head: 'Antidiuretic hormone (ADH)',
  lines: [
    'ADH is released by the **pituitary gland** when receptors in the brain detect that the blood is **too concentrated**.',
    'ADH travels in the blood to the kidney and makes the **collecting ducts more permeable to water**.',
    'More water is **reabsorbed into the blood** by osmosis, so **less, more concentrated** urine is produced.',
    'When the blood is too dilute, **less ADH** is released → more dilute urine.',
  ],
  size: 10.5,
  worked: { head: 'Explain (exam style)', q: 'After a long run on a hot day, a runner produces a small volume of dark urine. Explain why.',
    steps: [['Loss', 'water lost in sweat → blood too concentrated'], ['Signal', 'detected in the brain → pituitary releases more ADH'], ['Kidney', 'collecting ducts more permeable → more water reabsorbed'], ['Answer', 'less water in the urine: small volume, concentrated']], size: 10.5 },
  workedH: 2.2,
  qc: 'Which gland releases ADH? Which part of the nephron does ADH act on?',
  notes: 'QUICK CHECK ANSWER: the pituitary gland (1); the collecting duct (1).\nMark schemes reward "increases the permeability of the collecting duct to water". ADH is made in the hypothalamus and released from the (posterior) pituitary – "released by the pituitary" is enough at GCSE. 7.20B: biology only; H marker medium confidence (Save My Exams: Higher tier only).',
}), '7.20B ADH (HT, BIOLOGY ONLY)');

// ======================= 35 DIALYSIS 7.21B =======================
reg(D.contentSlide({
  title: 'Kidney failure: dialysis',
  subtitle: 'Specification 7.21B • a machine does the work of the kidneys',
  tag: '7.21B', p: true, caption: 'haemodialysis; blood and fluid flow in opposite directions',
  draw: (s, p) => {
    // arm
    s.addShape(SH.ROUNDED_RECTANGLE, { x: 0.7, y: 1.5, w: 4.3, h: 0.5, rectRadius: 0.2, fill: { color: SKIN }, line: { color: SKIN_EDGE, width: 2 } });
    oval(s, 5.1, 1.75, 0.55, 0.5, SKIN, SKIN_EDGE, { lw: 2 });
    label(s, 1.7, 1.52, 2.6, "patient's arm", { size: 10.5, italic: true, color: '8A6A3A', h: 0.45 });
    // blood out (red) → pump → dialyser
    tube(s, [[1.2, 2.0], [1.2, 3.25], [1.75, 3.25]], ART, ARTE, 5);
    ball(s, 1.2, 2.55, 0.2, 'E6EBF2', '5A6275', 1.5); label(s, 0.45, 2.42, 0.55, 'pump', { size: 10, align: 'right', h: 0.26 });
    line(s, 1.1, 2.55, 1.3, 2.55, '5A6275', 1.5);
    // dialyser
    box(s, 1.75, 2.85, 3.9, 0.8, 'DCEBFA', '2F5F8F', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.5 });
    box(s, 1.75, 3.13, 3.9, 0.24, 'F6C9CC', ART, { lw: 1 });
    line(s, 1.75, 3.13, 5.65, 3.13, '5A6275', 1, { dash: 'dash' }); line(s, 1.75, 3.37, 5.65, 3.37, '5A6275', 1, { dash: 'dash' });
    arrow(s, 2.3, 3.25, 3.0, 3.25, ARTE, 1.5);
    arrow(s, 4.9, 2.98, 4.2, 2.98, '2F5F8F', 1.5); arrow(s, 4.9, 3.52, 4.2, 3.52, '2F5F8F', 1.5);
    label(s, 3.0, 2.6, 1.8, '**dialyser**', { size: 10.5, color: '2F5F8F', h: 0.25 });
    // cleaned blood back (blue) to vein
    tube(s, [[5.65, 3.25], [6.15, 3.25], [6.15, 2.35], [4.3, 2.35], [4.3, 2.0]], VEIN, VEINE, 5);
    label(s, 4.5, 2.05, 1.6, 'cleaned blood back to a vein', { size: 10, color: VEINE, align: 'left', h: 0.3 });
    label(s, 1.35, 2.05, 1.5, 'blood out', { size: 10, color: ARTE, align: 'left', h: 0.3 });
    // fluid in/out
    arrow(s, 5.4, 4.05, 5.4, 3.67, '2F5F8F', 2); label(s, 4.4, 4.05, 1.9, 'fresh dialysis fluid in', { size: 10, color: '2F5F8F', align: 'left', h: 0.25 });
    arrow(s, 2.0, 3.67, 2.0, 4.05, '6B7385', 2); label(s, 1.15, 4.05, 1.9, 'used fluid out', { size: 10, color: '6B7385', h: 0.25 });
    // zoom of the membrane
    box(s, 0.7, 4.4, 5.6, 1.4, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 0.8, 4.48, 5.4, 0.45, 'F6C9CC', null); box(s, 0.8, 5.03, 5.4, 0.45, 'DCEBFA', null);
    line(s, 0.8, 4.98, 6.2, 4.98, C.ink, 2, { dash: 'sysDash' });
    label(s, 0.85, 4.48, 0.9, 'blood', { size: 10, italic: true, color: ARTE, align: 'left', h: 0.22 });
    label(s, 0.85, 5.25, 1.1, 'dialysis fluid', { size: 10, italic: true, color: '2F5F8F', align: 'left', h: 0.22 });
    arrow(s, 2.3, 4.6, 2.3, 5.35, '8A6A0A', 2); label(s, 2.4, 4.6, 1.0, '**urea** out', { size: 10, color: '8A6A0A', align: 'left', h: 0.25 });
    arrow(s, 3.6, 4.6, 3.6, 5.35, '6B7385', 2); label(s, 3.7, 4.6, 1.2, '**excess ions** out', { size: 10, color: '6B7385', align: 'left', h: 0.25 });
    ball(s, 5.2, 4.7, 0.11, HOT, '8E2A33', 0.75); oval(s, 5.6, 4.7, 0.3, 0.17, 'B39DDB', '5E2D73');
    label(s, 4.75, 5.48, 1.5, 'cells, protein stay', { size: 10, color: C.red, h: 0.25 });
    label(s, 0.8, 5.53, 3.9, 'glucose: same concentration in both → no net loss', { size: 10, italic: true, color: GLU, align: 'left', h: 0.25 });
  },
  head: 'How dialysis works',
  lines: [
    'Kidney failure: urea, excess ions and water build up in the blood – this can be fatal.',
    'In **dialysis**, blood flows past a **partially permeable membrane**. Urea and excess ions **diffuse** out into the dialysis fluid.',
    'The fluid has the **same glucose and normal ion concentrations** as healthy plasma, so useful substances are not lost.',
    'Flows in **opposite directions** keep a concentration gradient along the whole membrane.',
  ],
  size: 10.5,
  worked: { head: 'Living with dialysis', q: '',
    steps: [['Time', `about 3 sessions × 4 hours = ${dialHrs} hours a week`], ['Diet', 'strict control of salt, protein and fluid'], ['Limits', 'not a cure; risk of infection and blood clots'], ['Answer', 'keeps the patient alive until a transplant']], size: 10.5 },
  workedH: 2.0,
  qc: 'Why does dialysis fluid contain **glucose** at the same concentration as normal blood? Why does it contain **no urea**?',
  notes: `QUICK CHECK ANSWER: same glucose concentration → no concentration gradient, so glucose does not diffuse out of the blood (it is not lost) (1). No urea → steep concentration gradient, so urea diffuses out of the blood (1).\nExtra data: if urea falls from ${ureaIn} to ${ureaOut} units across the dialyser, that is a ${(ureaIn - ureaOut) / ureaIn * 100}% fall. ${dialHrs} h/week ≈ ${12 * 52} h a year. Haemodialysis is shown; peritoneal dialysis is not required. Blood is given an anticoagulant (heparin) – context only.`,
}), '7.21B Dialysis (BIOLOGY ONLY)');

// ======================= 36 TRANSPLANT 7.21B =======================
{
  const s = D.contentHeader('Kidney failure: transplants (organ donation)', 'Specification 7.21B • comparing the two treatments', { tag: '7.21B', p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'donor kidney placed low in the abdomen (simplified)');
  // torso outline
  const tx = 0.85, tw = 3.6, ty = 1.5, th = 4.25;
  s.addShape(SH.ROUNDED_RECTANGLE, { x: tx, y: ty, w: tw, h: th, rectRadius: 0.6, fill: { color: SKIN }, line: { color: SKIN_EDGE, width: 2.5 } });
  const cx = tx + tw / 2, yS = 4.0, yE = 5.5;
  // vena cava (blue) and aorta (red), each splitting into two iliac vessels
  tube(s, [[cx - 0.15, 1.7], [cx - 0.15, yS], [cx - 0.95, yE]], VEIN, VEINE, 8); tube(s, [[cx - 0.15, yS], [cx + 0.85, yE]], VEIN, VEINE, 7);
  // donor artery passes behind the vein: draw it before the left red iliac
  const dk = [cx - 1.25, 4.35];
  const aL = [cx - 0.39, yS + 0.6 * (yE - yS) * 1.2], vL = [cx - 0.63, 4.72];
  tube(s, [[dk[0] + 0.25, dk[1] - 0.12], [cx - 0.45, 4.6]], ART, ARTE, 5);
  tube(s, [[cx + 0.15, 1.7], [cx + 0.15, yS], [cx - 0.75, yE]], ART, ARTE, 7); tube(s, [[cx + 0.15, yS], [cx + 1.05, yE]], ART, ARTE, 6);
  tube(s, [[dk[0] + 0.28, dk[1] + 0.1], vL], VEIN, VEINE, 5);
  // failed kidneys (pale)
  oval(s, cx - 0.95, 2.45, 0.55, 0.95, 'D9C2BE', 'A08A86', { lw: 1.25 }); oval(s, cx + 0.95, 2.45, 0.55, 0.95, 'D9C2BE', 'A08A86', { lw: 1.25 });
  label(s, tx + 0.1, 3.0, 1.2, 'failed kidneys (left in place)', { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
  // bladder and donor ureter
  oval(s, cx, 5.25, 0.75, 0.45, URI[0], URI[1], { lw: 1.5 });
  tube(s, [[dk[0] + 0.12, dk[1] + 0.4], [cx - 0.55, 5.25], [cx - 0.37, 5.25]], URI[0], URI[1], 4);
  oval(s, dk[0], dk[1], 0.6, 0.92, KID[0], KID[1], { lw: 1.75 });
  label(s, tx + 0.1, 3.6, 1.3, '**donor kidney**', { size: 10.5, color: KID[1], align: 'left' });
  callout(s, 4.65, 4.3, 1.75, 'joined to the iliac artery and vein', cx - 0.5, 4.62, ARTE, { size: 10, h: 0.45 });
  callout(s, 4.65, 5.35, 1.75, 'donor ureter → bladder', cx + 0.3, 5.3, URI[1], { size: 10, h: 0.45 });
  callout(s, 4.65, 2.2, 1.75, 'aorta and vena cava', cx + 0.15, 2.2, ARTE, { size: 10, h: 0.45 });
  const rows = [[HDR(''), HDR('Dialysis'), HDR('Transplant')],
    ['For', 'available to most patients; no need to wait for a donor; no rejection', 'a cure – normal life and diet; cheaper over many years'],
    ['Against', 'hours each week; strict diet; not a cure; expensive; infection risk', 'shortage of donors; tissue must match; rejection – lifelong immunosuppressant drugs; surgery risks'],
  ].map((r, i) => i === 0 ? r : r.map((t, j) => tcell(t, i, j === 0 ? { bold: true, color: C.ink } : {})));
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.0, 2.54, 2.54], rowH: [0.42, 1.15, 1.35], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.37, 6.08, 1.88, 'Why rejection happens', [
    'The donor kidney has **antigens** that the patient\'s immune system recognises as foreign; white blood cells attack it.',
    'Reduce the risk: a **close tissue match** (often a relative) and **immunosuppressant drugs** – but these increase the risk of infections.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Give **one** advantage of a transplant over dialysis and **one** problem with transplants.');
  D.notes(s, 'QUICK CHECK ANSWER: advantage: a long-term cure / no time on a machine / normal diet / cheaper in the long term (1). Problem: shortage of donors / long wait / rejection / lifelong immunosuppressant drugs (increase infection risk) (1).\nOrgan donation: in England an opt-out system has operated since 2020 (context). Living donors can give one kidney. The diagram shows the donor kidney in the right iliac fossa joined to the iliac artery and vein (branches of the aorta and vena cava). 7.21B is biology only.');
  reg(s, '7.21B Transplants vs dialysis (BIOLOGY ONLY)');
}

// ======================= 37 RECAP 7 =======================
const R7 = D.recapSlide(7, 'Specification 7.20B–7.21B • ADH and kidney failure', [
  { q: 'Explain how ADH reduces the volume of urine produced.', marks: 3, ht: true, ms: 'ADH (from the pituitary) makes the collecting duct (walls) more permeable to water (1); more water reabsorbed into the blood (1); so less water left in the urine / smaller volume, more concentrated (1).' },
  { q: 'Explain why urea moves from the blood into the dialysis fluid.', marks: 2, ms: 'Dialysis fluid contains no urea / urea concentration higher in the blood (1); urea diffuses (down its concentration gradient) through the partially permeable membrane (1).' },
  { q: 'Give **two** reasons why kidney transplants are not available to every patient with kidney failure.', marks: 2, ms: 'Any two: shortage of donors; tissue type must match; risk of rejection; patient may be too ill for surgery (1 each).' },
]);
reg(R7.s, 'Recap 7');

// ======================= 38 KEY WORDS =======================
reg(D.keyWords([
  ['Hormone', 'Chemical messenger secreted by an endocrine gland into the blood; acts on target organs.'],
  ['Adrenalin', 'Hormone from the adrenal glands; prepares the body for fight or flight.'],
  ['Thyroxine', 'Hormone from the thyroid; controls metabolic rate (TRH, TSH loop).'],
  ['Negative feedback', 'A change from normal triggers a response that reverses it.'],
  ['Oestrogen', 'Ovary hormone: repairs the uterus lining; inhibits FSH; triggers LH.'],
  ['Progesterone', 'Maintains the uterus lining; inhibits FSH and LH.'],
  ['FSH / LH', 'Pituitary hormones: FSH matures an egg; LH triggers ovulation.'],
  ['Homeostasis', 'Keeping the internal environment constant.'],
  ['Vasodilation', 'Skin arterioles widen: more blood near the surface, more heat lost.'],
  ['Insulin / glucagon', 'Pancreas hormones: lower / raise blood glucose (glycogen store).'],
  ['Type 2 diabetes', 'Cells stop responding to insulin; linked to obesity.'],
  ['BMI', 'mass (kg) ÷ (height (m))²; 30 or above = obese.'],
  ['Nephron', 'Filtering unit of the kidney: glomerulus, capsule, tubules, collecting duct.'],
  ['Selective reabsorption', 'Useful substances (all glucose) taken back into the blood from the tubule.'],
  ['ADH', 'Pituitary hormone: makes collecting ducts more permeable to water.'],
  ['Dialysis', 'Urea and excess ions diffuse from blood into dialysis fluid across a membrane.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. HT terms: thyroxine loop, LH/FSH interactions, vasodilation, glucagon, ADH.' }), 'Summary: key words');

// ======================= 39 FULL QUESTION =======================
reg(D.fullQuestion('Concentrations (g per dm³) in the **blood plasma** / **filtrate** in Bowman\'s capsule / **urine** of a healthy person:  protein 80 / 0 / 0;  glucose 1.0 / 1.0 / 0;  urea 0.3 / 0.3 / 18.', [
  { l: 'a', q: 'Name the part of the nephron where the blood is filtered.', marks: 1, ms: 'Glomerulus (1) (accept Bowman\'s capsule / glomerulus and Bowman\'s capsule).' },
  { l: 'b', q: 'Explain why there is no protein in the filtrate.', marks: 2, ms: 'Protein molecules are too large (1); cannot pass through the filter / capillary and capsule walls (1).' },
  { l: 'c', q: 'Explain why the concentration of glucose in the urine is 0.', marks: 2, ms: 'All glucose is (selectively) reabsorbed (1); in the (proximal) tubule into the blood, by active transport (1).' },
  { l: 'd', q: 'Calculate how many times more concentrated urea is in the urine than in the plasma.', marks: 2, ms: '18 ÷ 0.3 (1); = 60 (times) (1).' },
  { l: 'e', q: 'The kidneys make 150 dm³ of filtrate a day and 1.2 dm³ of urine. Calculate the urine volume as a percentage of the filtrate.', marks: 2, ms: '1.2 ÷ 150 × 100 (1); = 0.8% (1).', h: 1.1 },
  { l: 'f', q: 'On a hot day the person sweats a lot. Explain how ADH changes the volume and concentration of their urine.', marks: 4, ht: true, ms: 'Blood becomes more concentrated / less water in blood, detected (by the brain / hypothalamus) (1); pituitary releases more ADH (1); collecting ducts become more permeable to water / more water reabsorbed into the blood (1); smaller volume of more concentrated urine (1).', h: 1.4 },
], 13, { subtitle: 'Specification 7.19B–7.20B • answer every part • 13 marks (part (f) is HT)' }), 'Full question');

// ======================= 40–41 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the gland that releases **insulin** and **glucagon**.', marks: 1, ms: 'Pancreas (1).' },
  { n: '2', q: 'A woman has mass **81 kg** and height **1.80 m**. Calculate her BMI. Her waist is 99 cm and hips 110 cm: calculate her waist:hip ratio and comment on her risk (above 0.85 = higher risk).', marks: 3, ms: 'BMI = 81 ÷ 1.80² = 25 (1); waist:hip = 99 ÷ 110 = 0.90 (1); above 0.85 so higher risk of type 2 diabetes / fat stored round the abdomen (1).' },
  { n: '3', q: 'Describe how thyroxine levels are returned to normal when they fall too low.', marks: 3, ht: true, ms: 'Hypothalamus releases (more) TRH (1); pituitary releases (more) TSH (1); thyroid produces / releases more thyroxine (1).' },
  { n: '4', q: 'Describe **two** ways the skin helps to cool the body on a hot day.', marks: 2, ms: 'Sweat produced, evaporates, transferring energy away (1); more blood flows near the skin surface / vasodilation so more heat lost (1).' },
  { n: '5', q: 'Give **two** differences between the composition of the filtrate in Bowman\'s capsule and urine.', marks: 2, ms: 'Filtrate contains glucose, urine does not (1); urine has a higher concentration of urea / less water / different ion concentration (1).' },
  { n: '6', q: 'A patient has kidney failure. **Evaluate** the use of dialysis and a kidney transplant as treatments for this patient.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Dialysis: blood passes over a partially permeable membrane; urea and excess ions diffuse into dialysis fluid.',
    'Dialysis fluid has normal glucose / ion concentrations so useful substances are not lost.',
    'Dialysis for: available without a donor; no rejection; keeps patient alive.',
    'Dialysis against: several sessions (hours) every week; strict diet; not a cure; expensive over time; infection / clot risk.',
    'Transplant for: long-term cure; normal life and diet; cheaper in the long term.',
    'Transplant against: shortage of donors / long waiting lists; tissue match needed; rejection by immune system.',
    'Must take immunosuppressant drugs for life → greater risk of infections; risks of surgery.',
    'Judgement: e.g. dialysis as a short-term treatment while waiting; transplant better long term if a matching donor is found.',
  ], 'Level 3 answers must include a justified conclusion / judgement.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7);
assert.strictEqual(R5.total, 9); assert.strictEqual(R6.total, 8); assert.strictEqual(R7.total, 7);
assert(D.slideNo >= 38 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T7_CoordinationHomeostasis.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
