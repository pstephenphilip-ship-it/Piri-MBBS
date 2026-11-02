// build_STATS.js — AQA GCSE (9–1) Mathematics 8300, Statistics S1–S6 (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_STATS.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./aqa_maths_template');
const { calc, C } = T;

const DECK = {
  topic: 'S1–S6',
  topicLabel: 'Statistics',
  title: 'S1–S6',
  shortTitle: 'STATS',
  subtitle: 'Sampling, charts and diagrams, averages and spread, histograms, cumulative frequency, box plots and scatter graphs',
  specRange: 'S1–S6',
  pOnly: [],
  paper: 'Papers 1, 2 and 3',
  keywords: ['Sampling', 'Charts', 'Averages', 'Spread', 'Histograms', 'Cumulative frequency', 'Box plots', 'Scatter graphs'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH, W } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const r2 = v => Math.round(v * 100) / 100;

// ======================= DECK-SPECIFIC: statistics helpers (all numbers derive from these) =======================
const sum = a => a.reduce((p, q) => p + q, 0);
const mean = a => sum(a) / a.length;
const sorted = a => a.slice().sort((p, q) => p - q);
// value at 1-based position k in an ordered list; half positions average neighbours
const atPos = (a, k) => { const o = sorted(a); return Number.isInteger(k) ? o[k - 1] : (o[Math.floor(k) - 1] + o[Math.ceil(k) - 1]) / 2; };
const median = a => atPos(a, (a.length + 1) / 2);
const lq = a => atPos(a, (a.length + 1) / 4);
const uq = a => atPos(a, 3 * (a.length + 1) / 4);
const range = a => Math.max(...a) - Math.min(...a);
function mode(a) { const c = {}; a.forEach(v => { c[v] = (c[v] || 0) + 1; }); const m = Math.max(...Object.values(c)); const ks = Object.keys(c).filter(k => c[k] === m).map(Number); assert.strictEqual(ks.length, 1, 'mode not unique'); return ks[0]; }
const five = a => [Math.min(...a), lq(a), median(a), uq(a), Math.max(...a)];
// expand a frequency table {value: freq} into a raw list
const expand = (vals, freqs) => vals.flatMap((v, i) => Array(freqs[i]).fill(v));
// grouped table: classes [[lo, hi], ...], freqs
const mids = cls => cls.map(([a, b]) => (a + b) / 2);
const widths = cls => cls.map(([a, b]) => b - a);
const cumul = f => f.reduce((acc, v) => { acc.push((acc.length ? acc[acc.length - 1] : 0) + v); return acc; }, []);
// monotone cubic (Fritsch–Carlson) curve through cumulative frequency points: never wiggles backwards
function monoCurve(P) {
  const n = P.length, x = P.map(p => p[0]), y = P.map(p => p[1]), d = [], m = [];
  for (let i = 0; i < n - 1; i++) d.push((y[i + 1] - y[i]) / (x[i + 1] - x[i]));
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {
    if (d[i] === 0) { m[i] = m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
    if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
  }
  return v => {
    let i = 0; while (i < n - 2 && v > x[i + 1]) i++;
    const h = x[i + 1] - x[i], t = (v - x[i]) / h, t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * y[i] + (t3 - 2 * t2 + t) * h * m[i] + (-2 * t3 + 3 * t2) * y[i + 1] + (t3 - t2) * h * m[i + 1];
  };
}
const inverse = (f, yv, a, b) => { for (let k = 0; k < 80; k++) { const c = (a + b) / 2; if (f(c) < yv) a = c; else b = c; } return (a + b) / 2; };
// seeded PRNG (mulberry32) so the sampling illustration and mini scatter graphs are reproducible
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// ======================= DECK-SPECIFIC drawing helpers =======================
const PAL = [C.blue, C.orangeTab, C.green, C.waterDark, '8E6BB8', C.grey];
// caption for diagrams that ARE drawn to scale (the template caption says "Illustrative diagram")
function cap(s, p, t) { label(s, p.x + 0.15, p.y + p.h - 0.34, p.w - 0.3, t, { size: 10, italic: true, color: C.grey, h: 0.28 }); }
// small red-edged examiner-tip box
function tip(s, x, y, w, h, t, head = 'Examiner tip') {
  box(s, x, y, w, h, 'FFF5F5', 'E8A3A9', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1 });
  s.addText([{ text: head + '  ', options: { bold: true, color: C.red } }, ...T.rich(t, { color: C.text })], { x: x + 0.12, y, w: w - 0.24, h, fontFace: 'Calibri', fontSize: 10.5, valign: 'middle', margin: 0 });
}
// frame for a categorical chart: y-axis scale, gridlines, category labels; returns centre x of each category
function catFrame(s, g, cats, o = {}) {
  box(s, g.x, g.y, g.w, g.h, C.white, null);
  const minor = g.minor || 1;
  for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep / minor) {
    const maj = Math.abs(Math.round((v - g.ymin) / g.ystep) * g.ystep - (v - g.ymin)) < 1e-9;
    line(s, g.x, py(g, v), g.x + g.w, py(g, v), maj ? 'E6C9D3' : 'F4E6EB', 0.5);
  }
  for (let v = g.ymin; v <= g.ymax + 1e-9; v += g.ystep) {
    line(s, g.x - 0.06, py(g, v), g.x, py(g, v), C.ink, 1);
    label(s, g.x - 0.48, py(g, v) - 0.1, 0.4, String(+v.toFixed(2)), { size: 10, h: 0.2, align: 'right' });
  }
  line(s, g.x, g.y + g.h, g.x + g.w, g.y + g.h, C.ink, 1.5);
  line(s, g.x, g.y + g.h, g.x, g.y, C.ink, 1.5);
  const slot = g.w / cats.length, cx = cats.map((c, i) => g.x + slot * (i + 0.5));
  cats.forEach((c, i) => label(s, cx[i] - slot / 2, g.y + g.h + 0.05, slot, c, { size: 10.5, h: 0.24 }));
  if (g.xlabel) label(s, g.x, g.y + g.h + 0.3, g.w, g.xlabel, { size: 10.5, bold: true });
  if (g.ylabel) label(s, g.x - 0.62 - g.h / 2, g.y + g.h / 2 - 0.14, g.h, g.ylabel, { size: 10.5, bold: true, rotate: 270 });
  return { cx, slot };
}
// pie chart from the 12 o'clock line, clockwise; slices [{v (degrees), t, color}]
function pie(s, cx, cy, r, slices) {
  let a = 0;
  slices.forEach(sl => {
    const st = (270 + a) % 360, en = (270 + a + sl.v) % 360;
    s.addShape(SH.PIE, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, angleRange: [st, en === 0 ? 360 : en], fill: { color: sl.color }, line: { color: C.white, width: 1.5 } });
    const mid = (a + sl.v / 2 - 90) * Math.PI / 180, lr = sl.lr || 0.62;
    label(s, cx + r * lr * Math.cos(mid) - 0.6, cy + r * lr * Math.sin(mid) - 0.22, 1.2, sl.t, { h: 0.44, size: 10.5, bold: true, color: sl.tc || C.white });
    a += sl.v;
  });
  assert(Math.abs(a - 360) < 1e-9, 'pie angles must sum to 360');
}
// horizontal number line for box plots: g = {x, w, y (axis line), min, max, step}
function hScale(s, g, t) {
  line(s, g.x, g.y, g.x + g.w, g.y, C.ink, 1.5);
  for (let v = g.min; v <= g.max + 1e-9; v += g.step) {
    const X = g.x + (v - g.min) / (g.max - g.min) * g.w;
    line(s, X, g.y, X, g.y + 0.07, C.ink, 1);
    label(s, X - 0.3, g.y + 0.08, 0.6, String(v), { size: 10, h: 0.2 });
  }
  if (g.minor) for (let v = g.min; v <= g.max + 1e-9; v += g.minor) { const X = g.x + (v - g.min) / (g.max - g.min) * g.w; line(s, X, g.y, X, g.y + 0.04, C.ink, 0.75); }
  if (t) label(s, g.x, g.y + 0.3, g.w, t, { size: 10.5, bold: true });
}
const hx = (g, v) => g.x + (v - g.min) / (g.max - g.min) * g.w;
function boxPlot(s, g, f, yc, hh, color, name) {
  const [mn, q1, md, q3, mx] = f.map(v => hx(g, v));
  line(s, mn, yc, q1, yc, C.ink, 1.75); line(s, q3, yc, mx, yc, C.ink, 1.75);
  line(s, mn, yc - hh * 0.3, mn, yc + hh * 0.3, C.ink, 1.75); line(s, mx, yc - hh * 0.3, mx, yc + hh * 0.3, C.ink, 1.75);
  box(s, q1, yc - hh / 2, q3 - q1, hh, color, C.ink, { tr: 55, lw: 1.75 });
  line(s, md, yc - hh / 2, md, yc + hh / 2, C.ink, 2.5);
  if (name) label(s, g.x - 1.0, yc - 0.14, 0.95, name, { size: 11, bold: true, align: 'right', color });
}
// draw a table with native addTable; rows = arrays of strings or {text, options}
function table(s, x, y, colW, rows, o = {}) {
  const hdr = o.header !== false;
  const data = rows.map((r, i) => r.map(c => {
    const cell = typeof c === 'object' ? c : { text: String(c) };
    const base = hdr && i === 0 ? { bold: true, color: C.white, fill: { color: C.ink } } : { color: C.text, fill: { color: i % 2 ? C.white : C.cardBlue } };
    return { text: cell.text, options: Object.assign({}, base, cell.options || {}) };
  }));
  s.addTable(data, { x, y, w: sum(colW), colW, rowH: o.rowH || 0.36, fontFace: 'Calibri', fontSize: o.size || 12, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 }, margin: 0.03 });
}
const hi = (t, col = C.blue) => ({ text: String(t), options: { bold: true, color: col } });
const hiFill = (t, fill = 'FFE9B8', col = C.ink) => ({ text: String(t), options: { bold: true, color: col, fill: { color: fill } } });
function cross(s, X, Y, d = 0.06, color = C.ink, w = 1.5) { line(s, X - d, Y - d, X + d, Y + d, color, w); line(s, X - d, Y + d, X + d, Y - d, color, w); }
function ring(s, X, Y, r, color = C.red) { s.addShape(SH.OVAL, { x: X - r, y: Y - r, w: 2 * r, h: 2 * r, fill: { type: 'none' }, line: { color, width: 2 } }); }
function nodeBox(s, x, y, w, h, t, fill = C.white, border = C.blue, o = {}) {
  box(s, x, y, w, h, fill, border, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x + 0.05, y, w - 0.1, t, { h, size: o.size || 11.5, bold: o.bold !== false, color: o.color || C.ink });
}

// ======================= DATA SETS and CALCULATIONS (asserted) =======================
// --- starter
calc('starter 30% of 240', 0.30 * 240, 72); calc('starter 360/8', 360 / 8, 45);
calc('starter mean 4,7,10', mean([4, 7, 10]), 7); calc('starter midpoint 20,30', (20 + 30) / 2, 25);

// --- S1 sampling: school of 600, random sample of 40, 12 walk
const POP = 600, SAMP = 40, WALK = 12;
const estWalk = calc('S1 estimate walkers 600*12/40', POP * WALK / SAMP, 180);
calc('S1 sample fraction 40/600 %', 100 * SAMP / POP, 6.666666666666667, 1e-9);
const qcS1 = calc('S1 qc 1200*9/50', 1200 * 9 / 50, 216);
// random selection for the sampling illustration (40 distinct ids from 1..600)
const R = rng(8300), picked = new Set();
while (picked.size < SAMP) picked.add(1 + Math.floor(R() * POP));
assert.strictEqual(picked.size, 40);
const pickedSorted = [...picked].sort((a, b) => a - b);

// --- S2 bar chart: pets of 35 Year 9 students
const PETS = ['Dog', 'Cat', 'Fish', 'Rabbit', 'Other'], PETF = [12, 9, 5, 3, 6];
const petN = calc('pets total', sum(PETF), 35);
calc('pets dog - cat', PETF[0] - PETF[1], 3);
calc('pets fraction dog', PETF[0] / petN, 12 / 35);
// --- S2 pictogram: ice creams sold, 1 symbol = 4
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], ICE = [10, 6, 8, 13, 15], KEY = 4;
const iceSym = ICE.map(v => v / KEY);
assert.deepStrictEqual(iceSym, [2.5, 1.5, 2, 3.25, 3.75]);
const iceN = calc('ice total', sum(ICE), 52);
calc('ice Thu+Fri', ICE[3] + ICE[4], 28);
// --- S2 pie chart: how 60 students travel to school
const TRAVEL = ['Walk', 'Bus', 'Car', 'Cycle'], TRF = [18, 15, 21, 6];
const trN = calc('travel total', sum(TRF), 60);
const degPer = calc('pie degrees per student 360/60', 360 / trN, 6);
const TRA = TRF.map(f => f * degPer);
assert.deepStrictEqual(TRA, [108, 90, 126, 36]);
calc('pie angles sum', sum(TRA), 360);
calc('pie qc: 54 deg -> students', 54 / degPer, 9);
// --- S2 vertical line chart: goals in 20 matches
const GOALS = [0, 1, 2, 3, 4], GF = [3, 6, 5, 4, 2];
const goalList = expand(GOALS, GF);
const gN = calc('goals matches', goalList.length, 20);
const gTot = calc('goals total sum fx', sum(GOALS.map((v, i) => v * GF[i])), 36);
const gMean = calc('goals mean 36/20', gTot / gN, 1.8);
const gMed = calc('goals median', median(goalList), 2);
const gMode = calc('goals mode', mode(goalList), 1);
calc('goals range', range(goalList), 4);
calc('goals cumulative to 2', GF[0] + GF[1] + GF[2], 14);
// --- S2 two-way table: languages, 80 Year 10 students
const TW = { boys: [14, 12, 9], girls: [18, 19, 8] };
const twB = calc('2way boys', sum(TW.boys), 35), twG = calc('2way girls', sum(TW.girls), 45);
const twCols = [0, 1, 2].map(i => TW.boys[i] + TW.girls[i]);
assert.deepStrictEqual(twCols, [32, 31, 17]);
const twN = calc('2way total', twB + twG, 80); calc('2way cols total', sum(twCols), 80);
calc('2way girls Spanish = 31 - 12', 31 - 12, 19); calc('2way girls German = 45 - 18 - 19', 45 - 18 - 19, 8);
calc('2way boys German = 35 - 14 - 12', 35 - 14 - 12, 9);
// --- S2 time series: umbrella sales (hundreds) by quarter, 2024–2025
const QL = ['Q1 ’24', 'Q2', 'Q3', 'Q4', 'Q1 ’25', 'Q2', 'Q3', 'Q4'], UMB = [42, 30, 18, 46, 48, 35, 22, 51];
calc('time series Q3 change 22-18', UMB[6] - UMB[2], 4);
calc('time series Q4 change 51-46', UMB[7] - UMB[3], 5);
const yr1 = calc('2024 total', sum(UMB.slice(0, 4)), 136), yr2 = calc('2025 total', sum(UMB.slice(4)), 156);
calc('time series yearly increase', yr2 - yr1, 20);
// --- S4 averages from a list: 9 quiz scores
const QUIZ = [12, 15, 7, 15, 18, 10, 15, 9, 16];
assert.deepStrictEqual(sorted(QUIZ), [7, 9, 10, 12, 15, 15, 15, 16, 18]);
calc('quiz sum', sum(QUIZ), 117);
const qMean = calc('quiz mean', mean(QUIZ), 13), qMed = calc('quiz median', median(QUIZ), 15);
const qMode = calc('quiz mode', mode(QUIZ), 15), qRange = calc('quiz range', range(QUIZ), 11);
const qcList = [4, 8, 3, 9, 6, 8];
calc('qc list mean', mean(qcList), 6.333333333333333, 1e-9); calc('qc list median', median(qcList), 7);
calc('qc list mode', mode(qcList), 8); calc('qc list range', range(qcList), 6);
// --- S4 outliers: pocket money
const POCKET = [5, 6, 6, 7, 8, 8, 8, 40];
const pMean = calc('pocket mean', mean(POCKET), 11), pMed = calc('pocket median', median(POCKET), 7.5);
const pMode = calc('pocket mode', mode(POCKET), 8);
const pNo = POCKET.slice(0, 7);
calc('pocket mean without outlier', mean(pNo), 48 / 7, 1e-9);
calc('pocket range', range(POCKET), 35); calc('pocket range without outlier', range(pNo), 3);
// --- S4/S3 grouped data: puzzle times, 40 students (used for estimated mean, equal-width histogram and cumulative frequency)
const PZC = [[0, 10], [10, 20], [20, 30], [30, 40], [40, 50]], PZF = [4, 9, 12, 10, 5];
const pzN = calc('puzzle n', sum(PZF), 40);
const pzMid = mids(PZC); assert.deepStrictEqual(pzMid, [5, 15, 25, 35, 45]);
const pzFx = pzMid.map((m, i) => m * PZF[i]); assert.deepStrictEqual(pzFx, [20, 135, 300, 350, 225]);
const pzSum = calc('puzzle sum fx', sum(pzFx), 1030);
const pzMean = calc('puzzle estimated mean', pzSum / pzN, 25.75);
const pzCF = cumul(PZF); assert.deepStrictEqual(pzCF, [4, 13, 25, 35, 40]);
calc('puzzle median position (n+1)/2', (pzN + 1) / 2, 20.5);
// cumulative frequency curve and readings (from the curve as drawn)
const CFP = [[0, 0], ...PZC.map((c, i) => [c[1], pzCF[i]])];
const cfF = monoCurve(CFP);
CFP.forEach(([x, y]) => calc(`CF curve passes (${x},${y})`, cfF(x), y, 1e-9));
const cfMed = inverse(cfF, pzN / 2, 0, 50), cfLQ = inverse(cfF, pzN / 4, 0, 50), cfUQ = inverse(cfF, 3 * pzN / 4, 0, 50);
const rdMed = calc('CF median read (nearest 0.5)', Math.round(cfMed * 2) / 2, 26);
const rdLQ = calc('CF LQ read', Math.round(cfLQ * 2) / 2, 17);
const rdUQ = calc('CF UQ read', Math.round(cfUQ * 2) / 2, 34.5);
const rdIQR = calc('CF IQR', rdUQ - rdLQ, 17.5);
const cf35 = calc('CF at 35 min (nearest whole)', Math.round(cfF(35)), 30);
calc('CF more than 35 min', pzN - cf35, 10);
calc('CF qc: at 15 min', Math.round(cfF(15)), 8);
// --- S3 equal-width histogram uses PZC/PZF (class width 10 everywhere)
assert.deepStrictEqual(widths(PZC), [10, 10, 10, 10, 10]);
calc('puzzle more than 30 min', PZF[3] + PZF[4], 15);
calc('puzzle percent more than 30', 100 * 15 / 40, 37.5);
// --- S3 unequal-width histogram: masses of 80 apples
const APC = [[100, 120], [120, 130], [130, 140], [140, 160], [160, 200]], APF = [8, 14, 20, 26, 12];
const apN = calc('apples n', sum(APF), 80);
const apW = widths(APC); assert.deepStrictEqual(apW, [20, 10, 10, 20, 40]);
const apFD = APF.map((f, i) => f / apW[i]);
[0.4, 1.4, 2.0, 1.3, 0.3].forEach((v, i) => calc(`apples fd class ${i + 1}`, apFD[i], v, 1e-12));
apFD.forEach((fd, i) => calc(`apples area = frequency ${i + 1}`, fd * apW[i], APF[i], 1e-9));
calc('apples qc fd 26/20', 26 / 20, 1.3);
// --- S3 reading a histogram: lengths of 80 fish
const FSC = [[0, 10], [10, 15], [15, 20], [20, 30], [30, 50]], FSD = [1.2, 3.6, 4.0, 2.2, 0.4];
const FSF = FSD.map((d, i) => Math.round(d * widths(FSC)[i] * 1e9) / 1e9);
assert.deepStrictEqual(FSF, [12, 18, 20, 22, 8]);
const fsN = calc('fish n', sum(FSF), 80);
const fs1225 = calc('fish estimate 12 to 25 cm', 3 * 3.6 + 5 * 4.0 + 5 * 2.2, 41.8, 1e-9);
calc('fish qc more than 25', 5 * 2.2 + 8, 19, 1e-9);
// --- S4 quartiles from a list (n = 11): daily rainfall mm
const RAIN = [3, 5, 6, 8, 9, 11, 12, 14, 15, 18, 21];
const rnF = five(RAIN); assert.deepStrictEqual(rnF, [3, 6, 11, 15, 21]);
calc('rain LQ position (11+1)/4', (11 + 1) / 4, 3); calc('rain UQ position', 3 * 12 / 4, 9);
const rnIQR = calc('rain IQR', rnF[3] - rnF[1], 9); calc('rain range', range(RAIN), 18);
const QCQ = [2, 4, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16, 18, 20, 22];
assert.deepStrictEqual(five(QCQ), [2, 5, 10, 16, 22]); calc('qc quartiles IQR', uq(QCQ) - lq(QCQ), 11);
// --- S4 comparing box plots: test scores out of 50, two classes of 15
const CLA = [12, 18, 22, 24, 25, 27, 29, 31, 32, 34, 36, 38, 40, 44, 47];
const CLB = [18, 24, 26, 27, 29, 31, 33, 34, 35, 35, 36, 37, 39, 41, 44];
const fA = five(CLA), fB = five(CLB);
assert.deepStrictEqual(fA, [12, 24, 31, 38, 47]); assert.deepStrictEqual(fB, [18, 27, 34, 37, 44]);
const iqA = calc('class A IQR', fA[3] - fA[1], 14), iqB = calc('class B IQR', fB[3] - fB[1], 10);
calc('class A range', range(CLA), 35); calc('class B range', range(CLB), 26);
calc('class B above 37 (UQ): a quarter of 15 is about 4', CLB.filter(v => v > 37).length, 3);
// --- S4 comparing distributions (mean and range): points in 8 games
const ALI = [21, 18, 24, 19, 22, 20, 23, 21], BEN = [30, 9, 25, 14, 28, 12, 27, 31];
const aliM = calc('Ali mean', mean(ALI), 21), benM = calc('Ben mean', mean(BEN), 22);
const aliR = calc('Ali range', range(ALI), 6), benR = calc('Ben range', range(BEN), 22);
// --- S5 describing a population: 50 of 1200 households, cars per household
const CARS = [0, 1, 2, 3], CARF = [6, 22, 16, 6];
const carN = calc('cars n', sum(CARF), 50);
const carSum = calc('cars sum fx', sum(CARS.map((v, i) => v * CARF[i])), 72);
const carMean = calc('cars mean', carSum / carN, 1.44);
const carTot = calc('cars estimated total 1.44*1200', carMean * 1200, 1728, 1e-9);
const car0 = calc('no-car estimate 1200*6/50', 1200 * 6 / 50, 144, 1e-9);
calc('no-car percent', 100 * 6 / 50, 12);
calc('cars median', median(expand(CARS, CARF)), 1);
calc('S5 qc 2 or more cars percent', 100 * (16 + 6) / 50, 44);
calc('S5 qc 2 or more cars estimate', 1200 * 22 / 50, 528, 1e-9);
// --- STRETCH: reverse and combined means
calc('stretch combined total 30*62', 30 * 62, 1860);
calc('stretch reverse: mean 8 of 5 then 9 of 6', 6 * 9 - 5 * 8, 14);
calc('stretch combined mean (12*15+18*20)/30', (12 * 15 + 18 * 20) / 30, 18);
calc('stretch qc: mean 7 of 4, add x mean 8 -> x', 5 * 8 - 4 * 7, 12);
// --- S6 scatter: hours of revision vs test score (out of 80), 12 students + 1 outlier
const SX = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 10], SY = [22, 30, 26, 35, 38, 45, 41, 50, 52, 60, 63, 68];
const OUT = [9, 18];
const smx = calc('scatter mean x', mean(SX), 62 / 12, 1e-12), smy = calc('scatter mean y', mean(SY), 530 / 12, 1e-12);
let sxy = 0, sxx = 0; SX.forEach((x, i) => { sxy += (x - smx) * (SY[i] - smy); sxx += (x - smx) ** 2; });
const slope = sxy / sxx, icpt = smy - slope * smx;
calc('line of best fit gradient (about 5)', Math.round(slope), 5);
calc('line at x = 0 (about 18)', Math.round(icpt), 18);
const est65 = calc('interpolate 6.5 h (nearest whole)', Math.round(icpt + slope * 6.5), 51);
const est20 = calc('extrapolate 20 h', Math.round(icpt + slope * 20), 119);
calc('qc interpolate 3.5 h', Math.round(icpt + slope * 3.5), 36);
assert(est20 > 80, 'extrapolation must exceed the maximum mark of 80');

// --- recaps
calc('R1 sample estimate 900*14/50', 900 * 14 / 50, 252); calc('R1 pie 25/90*360', 25 / 90 * 360, 100); calc('R1 pictogram 2.5*6', 2.5 * 6, 15);
const r2goals = expand([0, 1, 2, 3], [5, 8, 4, 3]);
calc('R2 mean (0*5+1*8+2*4+3*3)/20', mean(r2goals), 1.25); calc('R2 n', r2goals.length, 20);
calc('R2 two-way 50-23-12', 50 - 23 - 12, 15);
const R3L = [8, 3, 11, 6, 9, 14, 5];
calc('R3 median', median(R3L), 8); calc('R3 range', range(R3L), 11);
const R3C = [[0, 4], [4, 8], [8, 12]], R3F = [6, 10, 4];
calc('R3 est mean', sum(mids(R3C).map((m, i) => m * R3F[i])) / sum(R3F), 5.6, 1e-12);
calc('R4 fd 18/15', 18 / 15, 1.2); calc('R4 freq 2.5*20', 2.5 * 20, 50); calc('R4 estimate 1.6*5+0.8*5', 1.6 * 5 + 0.8 * 5, 12);
const R5L = [4, 7, 9, 10, 12, 15, 16, 19, 22, 25, 30];
assert.deepStrictEqual(five(R5L), [4, 9, 15, 22, 30]); calc('R5 IQR', uq(R5L) - lq(R5L), 13);
calc('R5 CF more than', 120 - 84, 36);
calc('R6 estimate 2000*18/80', 2000 * 18 / 80, 450); calc('R6 reverse 6*15-5*14', 6 * 15 - 5 * 14, 20);
// --- full question: fun run, 40 runners
const FRC = [[20, 25], [25, 30], [30, 35], [35, 45], [45, 65]], FRF = [4, 10, 14, 8, 4];
const frN = calc('FQ n', sum(FRF), 40);
const frMid = mids(FRC); assert.deepStrictEqual(frMid, [22.5, 27.5, 32.5, 40, 55]);
const frFx = frMid.map((m, i) => m * FRF[i]); assert.deepStrictEqual(frFx, [90, 275, 455, 320, 220]);
const frSum = calc('FQ sum fx', sum(frFx), 1360);
const frMean = calc('FQ estimated mean', frSum / frN, 34);
const frFD = FRF.map((f, i) => f / widths(FRC)[i]);
[0.8, 2, 2.8, 0.8, 0.2].forEach((v, i) => calc(`FQ fd ${i + 1}`, frFD[i], v, 1e-12));
calc('FQ more than 40 = half of 35-45 + 45-65', 8 * (5 / 10) + 4, 8);
calc('FQ more than 35 percent', 100 * (8 + 4) / 40, 30);
// --- homework
calc('HW1 pie 18/72*360', 18 / 72 * 360, 90);
const HWL = [6, 9, 4, 9, 7, 10, 5, 9, 4, 7];
calc('HW2 mean', mean(HWL), 7); calc('HW2 median', median(HWL), 7); calc('HW2 mode', mode(HWL), 9); calc('HW2 range', range(HWL), 6);
calc('HW3 two-way', 60 - 22 - 17, 21);
const hwAll = calc('HW5 total 30*62', 30 * 62, 1860), hwA = calc('HW5 class A 12*58', 12 * 58, 696);
const hwB = calc('HW5 class B total', hwAll - hwA, 1164), hwBm = calc('HW5 class B mean', hwB / 18, 64.66666666666667, 1e-9);
assert(63 < hwBm, 'Zara is below class B mean');

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'S1–S6',  // cover reads "Statistics  S1–S6"
  rows: [
    { icon: '§', text: 'AQA 8300 Statistics S1–S6 • sampling, diagrams, averages and spread, scatter graphs' },
    { icon: 'H', text: 'Higher & Foundation in one deck • Higher-only content carries a red HT pill' },
    { icon: '3', text: `Assessed on all three papers • ${DECK.paper} (Paper 1 non-calculator)` },
  ],
  footer: 'AQA GCSE (9–1) Mathematics 8300 • teacher deck • answers and AQA-style mark schemes (M1 A1 B1) in the speaker notes',
  notes: 'Statistics S1–S6 of AQA 8300. Higher-only (bold in the AQA specification): histograms with unequal class intervals and cumulative frequency graphs (S3), box plots and quartiles / inter-quartile range (S4). Everything else, including the estimated mean from grouped data, outliers and scatter graphs, is for both tiers. No statistics content was found underlined (Higher, harder). See SPEC_STATS.md for the wording and confidence notes.\nAll data sets are built in build_STATS.js and every statistic on the slides is derived from them and asserted with calc().',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'S1', text: 'Explain **populations and samples**, take a **random sample** and know the **limitations of sampling**.' },
  { code: 'S2', text: 'Construct and interpret **frequency tables, bar charts, pictograms, pie charts** and **vertical line charts**.' },
  { code: 'S2', text: 'Use **two-way tables** and **time series** line graphs; choose an appropriate diagram.' },
  { code: 'S3', text: 'Draw and interpret **histograms** for grouped data with **equal** class widths.' },
  { code: 'S3', text: 'Use **frequency density** for **unequal** class widths; draw **cumulative frequency** graphs.', ht: true },
  { code: 'S4', text: 'Find **mean, median, mode, range, modal class**; **estimate the mean** of grouped data; spot **outliers**.' },
  { code: 'S4', text: 'Find **quartiles** and the **IQR**; draw and compare **box plots**.', ht: true },
  { code: 'S4–S6', text: '**Compare distributions** in context; **describe a population**; use **scatter graphs** and lines of best fit.' },
], { subtitle: 'Specification S1–S6 • by the end of this unit you can…', notes: 'HT pills mark the Higher-only parts (bold in the AQA specification): unequal class widths and cumulative frequency (S3); quartiles, inter-quartile range and box plots (S4). Foundation classes can skip slides 21–29 apart from the equal-width histogram on slide 20. Confidence notes in SPEC_STATS.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'AQA 8300 Statistics S1–S6 • examined on all three papers', { tag: 'Context' });
  const nodes = [
    ['S1', 'Populations, samples, random sampling', 'BOTH TIERS', C.blue],
    ['S2', 'Tables, bar, pie, pictogram, line charts, time series', 'BOTH TIERS', C.blue],
    ['S3', 'Histograms (equal widths)', 'BOTH TIERS', C.blue],
    ['S3', 'Unequal widths • cumulative frequency', 'HT ONLY', C.red],
    ['S4', 'Averages, range, outliers, grouped mean', 'BOTH TIERS', C.blue],
    ['S4', 'Quartiles, IQR, box plots', 'HT ONLY', C.red],
    ['S5–S6', 'Describe a population • scatter graphs', 'BOTH TIERS', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Statistics\nS1–S6', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.3);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: N12 fractions and percentages • R9 percentages • A9 straight-line graphs • P probability (two-way tables)', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Three papers, each **1 h 30 min, 80 marks**. Paper 1 is **non-calculator**; Papers 2 and 3 allow a calculator.',
      'Statistics can appear on **any** paper, usually as **short questions** plus one longer problem.',
      'There is **no formulae sheet** for statistics: you must **remember every method**.',
    ], { size: 11.5, color: 'F7DCE5' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**HT pills** mark Higher-only content (bold in the specification).',
      'The **estimated mean**, **outliers** and **scatter graphs** are for **both** tiers.',
      '**Grade 7–9 stretch** slides go beyond typical questions.',
      'Mark schemes use AQA notation: **M1** method, **A1** accuracy, **B1** independent, **ft** follow-through, **oe** or equivalent.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'AQA 8300: three equally weighted papers (1 h 30 min, 80 marks each); Paper 1 non-calculator, Papers 2 and 3 calculator. Probability and statistics together carry about 15% of the marks in both tiers (DfE weighting, from memory, UNVERIFIED).\nHigher only: unequal class intervals and cumulative frequency graphs (S3); box plots, quartiles and IQR (S4). Check the bold text in the AQA specification PDF before publishing; see SPEC_STATS.md.\nAQA mark schemes: M marks for method, A marks for accuracy that depend on M marks, B marks independent of method; ft = follow through, oe = or equivalent.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 • ordering decimals', q: 'Write in order, smallest first: **0.4, 0.35, 0.5, 0.05**.' },
  { from: 'N12 • percentages', q: 'Work out **30% of 240**.' },
  { from: 'G • angles', q: 'A circle is split into **8 equal sectors**. What angle is each sector?' },
  { from: 'N • fractions', q: 'Write **15 out of 40** as a fraction in its simplest form.' },
  { from: 'KS3 • averages', q: 'Work out the **mean** of **4, 7 and 10**.' },
  { from: 'KS3 • number', q: 'What number is **halfway** between **20 and 30**?' },
], { subtitle: 'Recall from Key Stage 3 and earlier units • 6 minutes • no calculator', notes: 'ANSWERS\n1. 0.05, 0.35, 0.4, 0.5.\n2. 72.\n3. 360 ÷ 8 = 45°.\n4. 3/8.\n5. (4 + 7 + 10) ÷ 3 = 21 ÷ 3 = 7.\n6. 25 (this is the midpoint: needed for the estimated mean).' }), 'Retrieval starter');

// ======================= 5 S1 POPULATIONS AND SAMPLES =======================
reg(D.contentSlide({
  title: 'Populations and samples',
  subtitle: 'Specification S1 • infer properties of a population from a sample',
  tag: 'S1', caption: 'a school of 600 students; the 40 red dots are a random sample',
  draw: (s, p) => {
    const cols = 30, rows = 20, gx = 0.75, gy = 1.55, dx = 0.18, dy = 0.163, r = 0.05;
    for (let i = 0; i < POP; i++) {
      const c = i % cols, rr = Math.floor(i / cols), on = picked.has(i + 1);
      const X = gx + c * dx, Y = gy + rr * dy;
      s.addShape(SH.OVAL, { x: X - (on ? r * 1.5 : r), y: Y - (on ? r * 1.5 : r), w: on ? 3 * r : 2 * r, h: on ? 3 * r : 2 * r, fill: { color: on ? C.red : 'D7C2CA' }, line: { type: 'none' } });
    }
    label(s, 0.7, gy + rows * dy + 0.05, 5.4, '● population: all 600 students       ● sample: 40 chosen at random', { size: 11, bold: true, color: C.ink });
    box(s, 0.75, 5.35, 5.4, 0.42, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, 5.35, 5.4, `12 of the 40 in the sample walk → estimate ${estWalk} walkers in the school`, { h: 0.42, size: 11, bold: true, color: C.blue });
  },
  head: 'Who are you asking?',
  lines: [
    'The **population** is everyone (or everything) you want to know about.',
    'A **sample** is a smaller group taken from the population.',
    'A sample is **quicker and cheaper**; asking everyone is a **census**.',
    'Use the sample to **estimate** the population: same **proportion**.',
    'A **bigger** sample usually gives a **more reliable** estimate.',
  ],
  worked: { head: 'Worked example', q: 'A random sample of 40 of the 600 students is taken. 12 of the sample walk to school. Estimate how many students walk.',
    steps: [['Fraction', 'fraction of sample who walk = 12/40'], ['Scale up', '12/40 × 600 = 7200 ÷ 40'], ['Answer', `about ${estWalk} students walk`]] },
  qc: 'A random sample of 50 of the 1200 people at a concert: 9 are under 16. Estimate how many people at the concert are under 16.',
  notes: `QUICK CHECK ANSWER: 9/50 × 1200 = ${qcS1} people (M1 9/50 × 1200 oe, A1 216).\nDiagram: 600 dots; 40 ids chosen by a seeded random-number generator in node (ids ${pickedSorted.slice(0, 8).join(', ')}, …). It is a genuine simple random sample, so the red dots have no pattern.\nThe estimate assumes the sample is representative. Say “estimate” or “about”: an exact answer is not possible from a sample.`,
}), 'S1 Populations and samples');

// ======================= 6 S1 RANDOM SAMPLING AND LIMITATIONS =======================
reg(D.contentSlide({
  title: 'Random sampling and its limits',
  subtitle: 'Specification S1 • random sampling, bias and the limitations of sampling',
  tag: 'S1', caption: 'how to take a simple random sample, and how bias creeps in',
  draw: (s, p) => {
    const steps = ['1  List the population\nnumber students 001–600', '2  Generate random numbers\ncalculator Ran# or a computer', '3  Ignore repeats and\nnumbers above 600', '4  Survey the 40 students\nwhose numbers come up'];
    steps.forEach((t, i) => {
      const y = 1.5 + i * 0.68;
      nodeBox(s, 0.75, y, 3.0, 0.55, t, C.white, C.blue, { size: 10.5 });
      if (i < 3) arrow(s, 2.25, y + 0.55, 2.25, y + 0.68, C.blue, 1.5);
    });
    box(s, 4.0, 1.5, 2.3, 2.59, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.05, 1.55, 2.2, 'random numbers', { size: 10.5, bold: true, color: C.blue });
    ['417', '052', '733 ✗', '268', '052 ✗', '590', '…'].forEach((t, i) => label(s, 4.05, 1.85 + i * 0.3, 2.2, t, { size: 12, bold: true, color: t.includes('✗') ? C.red : C.ink }));
    // bias box
    box(s, 0.75, 4.35, 2.7, 1.4, 'FFF5F5', 'E8A3A9', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 4.4, 2.6, 'BIASED', { size: 12, bold: true, color: C.red });
    label(s, 0.8, 4.7, 2.6, 'ask 40 students at the\nbus stop how they\ntravel to school', { h: 0.9, size: 10.5 });
    box(s, 3.6, 4.35, 2.7, 1.4, 'EEF7F1', '9BCFAE', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 3.65, 4.4, 2.6, 'RANDOM', { size: 12, bold: true, color: C.green });
    label(s, 3.65, 4.7, 2.6, 'every student has an\nequal chance of\nbeing chosen', { h: 0.9, size: 10.5 });
  },
  head: 'Making a sample fair',
  lines: [
    'In a **random sample** every member of the population has an **equal chance** of being chosen.',
    'A **biased** sample over-represents one group, so the results are not typical.',
    '**Limitations:** a sample may not represent the population; different samples give different results; a small sample is unreliable.',
    '!!Examiner tip:!! give a reason **in context**, e.g. “students at the bus stop are more likely to travel by bus”.',
  ],
  worked: { head: 'Worked example', q: 'Lily asks the first 30 people who leave a gym how many hours of exercise they do a week. Give one reason her sample is biased.',
    steps: [['Who is missed?', 'people who do not go to the gym'], ['Effect', 'gym users exercise more than most people'], ['Answer', 'biased: her estimate of weekly exercise will be too high']] },
  qc: 'Give one way Lily could improve her sample. Give one reason a larger sample is better.',
  notes: 'QUICK CHECK ANSWERS: choose people at random from the whole population (e.g. random numbers from a list of town residents), not only gym users (B1). A larger sample is more reliable / closer to the population / less affected by unusual values (B1).\nS1 only requires simple random sampling and its limitations. Stratified sampling is not in AQA 8300 S1 (it is in GCSE Statistics 8382): not taught here.',
}), 'S1 Random sampling and bias');

// ======================= 7 S2 FREQUENCY TABLES AND BAR CHARTS =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.55, ymin: 0, ymax: 14, ystep: 2, minor: 2, ylabel: 'frequency', xlabel: 'type of pet' };
  reg(D.contentSlide({
    title: 'Frequency tables and bar charts',
    subtitle: 'Specification S2 • categorical data: tally, frequency, bar chart',
    tag: 'S2',
    draw: (s, p) => {
      const { cx, slot } = catFrame(s, G, PETS);
      PETF.forEach((f, i) => { box(s, cx[i] - slot * 0.3, py(G, f), slot * 0.6, py(G, 0) - py(G, f), PAL[0], C.ink, { lw: 1 }); label(s, cx[i] - 0.3, py(G, f) - 0.24, 0.6, String(f), { size: 10.5, bold: true, color: C.ink, h: 0.22 }); });
      cap(s, p, `pets of ${petN} Year 9 students • plotted to scale • equal gaps, equal widths`);
    },
    head: 'Drawing a bar chart',
    lines: [
      'Collect data with a **tally**; count it into a **frequency table**.',
      '**Bars** are the **same width** with **equal gaps** (data is categorical).',
      'Label **both axes**; start the frequency axis at **0** with an even scale.',
      '**Dual / composite** bar charts compare two groups on one chart.',
      '!!Examiner tip:!! read the scale carefully: here each small square is **1** student.',
    ],
    worked: { head: 'Worked example', q: 'Use the bar chart. What fraction of the students have a dog? How many more have a dog than a cat?',
      steps: [['Read', `dog = ${PETF[0]}, cat = ${PETF[1]}, total = 12 + 9 + 5 + 3 + 6 = ${petN}`], ['Fraction', `dog: ${PETF[0]}/${petN}`], ['Answer', `12/35 have a dog; ${PETF[0] - PETF[1]} more dogs than cats`]] },
    qc: 'Which pet is the mode? What percentage of the 35 students chose fish?',
    notes: `QUICK CHECK ANSWERS: mode = dog (B1). Fish: 5/35 × 100 = 14.3% (M1 5/35 × 100, A1 14.3 or 14.28…).\nData: ${PETS.map((p, i) => p + ' ' + PETF[i]).join(', ')}; total ${petN} (asserted).`,
  }), 'S2 Frequency tables and bar charts');
}

// ======================= 8 S2 PICTOGRAMS =======================
reg(D.contentSlide({
  title: 'Pictograms',
  subtitle: 'Specification S2 • a key tells you what one symbol represents',
  tag: 'S2',
  draw: (s, p) => {
    const x0 = 1.65, y0 = 1.55, rh = 0.7, sw = 0.62, sq = 0.5;
    box(s, 0.75, y0 - 0.05, 5.5, rh * 5 + 0.1, C.white, C.line);
    DAYS.forEach((d, i) => {
      const y = y0 + i * rh;
      if (i) line(s, 0.75, y, 6.25, y, C.line, 0.75);
      label(s, 0.8, y, 0.8, d, { h: rh, size: 12, bold: true, align: 'left' });
      const n = iceSym[i];
      for (let k = 0; k < Math.ceil(n); k++) {
        const fr = Math.min(1, n - k);
        box(s, x0 + k * sw, y + (rh - sq) / 2, sq * fr, sq, C.blue, null);
      }
    });
    line(s, 1.55, y0 - 0.05, 1.55, y0 + rh * 5 + 0.05, C.line, 0.75);
    box(s, 0.95, 5.3, sq, sq, C.blue, null);
    label(s, 1.55, 5.3, 2.4, '= 4 ice creams', { h: sq, size: 12, bold: true, align: 'left' });
    box(s, 3.75, 5.3, sq / 4, sq, C.blue, null); label(s, 3.95, 5.3, 0.9, '= 1', { h: sq, size: 12, bold: true, align: 'left' });
    box(s, 4.75, 5.3, sq / 2, sq, C.blue, null); label(s, 5.08, 5.3, 0.9, '= 2', { h: sq, size: 12, bold: true, align: 'left' });
    cap(s, p, 'ice creams sold by a café • each part-symbol is drawn to scale');
  },
  head: 'Reading and drawing pictograms',
  lines: [
    'Every pictogram needs a **key**: here one square = **4** ice creams.',
    'Part symbols: **½ square = 2**, **¼ square = 1**.',
    'Symbols must be the **same size** and lined up.',
    '!!Examiner tip:!! to draw 13, work out 13 ÷ 4 = 3¼ → three full squares and a quarter.',
  ],
  worked: { head: 'Worked example', q: 'How many ice creams were sold on Thursday? How many were sold in the whole week?',
    steps: [['Count', `Thursday: 3¼ squares; 3.25 × 4 = ${ICE[3]}`], ['All days', `10 + 6 + 8 + 13 + 15`], ['Answer', `Thursday ${ICE[3]}; week ${iceN} ice creams`]] },
  qc: 'On Saturday 18 ice creams were sold. How many squares are needed? How many more were sold on Friday than Tuesday?',
  notes: `QUICK CHECK ANSWERS: 18 ÷ 4 = 4½ squares (B1). Friday − Tuesday = 15 − 6 = 9 (B1).\nSymbols per day: ${iceSym.join(', ')} (asserted). Part-symbols are drawn as fractions of the width so they can be read accurately.`,
}), 'S2 Pictograms');

// ======================= 9 S2 PIE CHARTS =======================
reg(D.contentSlide({
  title: 'Pie charts',
  subtitle: 'Specification S2 • angle = frequency × (360° ÷ total)',
  tag: 'S2',
  draw: (s, p) => {
    pie(s, 2.45, 3.45, 1.75, TRAVEL.map((t, i) => ({ v: TRA[i], t: `${t}\n${TRA[i]}°`, color: PAL[i], tc: i === 1 ? C.ink : C.white })));
    table(s, 4.5, 1.75, [0.9, 0.55, 0.65], [['Travel', 'f', 'Angle'], ...TRAVEL.map((t, i) => [t, TRF[i], TRA[i] + '°']), [hi('Total'), hi(trN), hi('360°')]], { size: 11, rowH: 0.36 });
    label(s, 4.4, 4.1, 2.0, `× ${degPer}° each`, { size: 11, bold: true, color: C.red });
    cap(s, p, `how ${trN} students travel to school • angles drawn exactly • total 360°`);
  },
  head: 'Drawing a pie chart',
  lines: [
    'Find the angle for **one item**: **360° ÷ total frequency**.',
    'Multiply each frequency by it; **check the angles add to 360°**.',
    'Draw a radius, then measure each angle with a protractor **from the previous line**.',
    '!!Examiner tip:!! a pie chart shows **proportions**, not frequencies: you cannot compare two pie charts without the totals.',
  ],
  worked: { head: 'Worked example', q: `${trN} students: Walk ${TRF[0]}, Bus ${TRF[1]}, Car ${TRF[2]}, Cycle ${TRF[3]}. Work out the angles.`,
    steps: [['One student', `360° ÷ ${trN} = ${degPer}°`], ['Angles', `18 × 6 = 108°, 15 × 6 = 90°, 21 × 6 = 126°, 6 × 6 = 36°`], ['Check', '108 + 90 + 126 + 36 = 360 ✓'], ['Answer', 'Walk 108°, Bus 90°, Car 126°, Cycle 36°']] },
  qc: 'In another survey of 60 students, the “Train” sector is 54°. How many students travel by train?',
  notes: `QUICK CHECK ANSWER: 54 ÷ 6 = 9 students (M1 54 ÷ (360 ÷ 60) oe, A1 9).\nAngles asserted in node: ${TRA.join(' + ')} = 360. Sectors are native PowerPoint pie shapes drawn clockwise from 12 o’clock.`,
}), 'S2 Pie charts');

// ======================= 10 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification S1, S2 • sampling, bar charts, pictograms and pie charts', [
  { q: 'Give **one** advantage of taking a sample rather than asking the whole population, and **one** limitation of a sample.', marks: 2, ms: 'B1 advantage: quicker / cheaper / easier oe. B1 limitation: may not represent the population / may be biased / different samples give different results oe.' },
  { q: 'A random sample of **50** students is taken from a school of **900**. **14** of the sample choose pizza. Estimate the number of students in the school who choose pizza.', marks: 2, ms: 'M1 14/50 × 900 oe. A1 252.' },
  { q: 'In a survey of **90** people, **25** chose tea. Work out the angle for tea on a pie chart.', marks: 2, ms: 'M1 360 ÷ 90 (= 4) or 25/90 × 360. A1 100°.' },
  { q: 'In a pictogram, one symbol represents **6** cars. How many cars do **2½** symbols represent?', marks: 1, ms: 'B1 15.' },
]);
reg(R1.s, 'Recap 1');

// ======================= 11 S2 VERTICAL LINE CHARTS (+ averages from a frequency table) =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, ymin: 0, ymax: 7, ystep: 1, ylabel: 'number of matches', xlabel: 'goals scored' };
  reg(D.contentSlide({
    title: 'Vertical line charts',
    subtitle: 'Specification S2, S4 • ungrouped discrete data, and averages from a frequency table',
    tag: 'S2',
    draw: (s, p) => {
      const { cx } = catFrame(s, G, GOALS.map(String));
      GF.forEach((f, i) => { line(s, cx[i], py(G, 0), cx[i], py(G, f), C.blue, 5); label(s, cx[i] - 0.3, py(G, f) - 0.26, 0.6, String(f), { size: 10.5, bold: true, h: 0.22 }); });
      cap(s, p, `goals scored by a team in ${gN} matches • plotted to scale`);
    },
    head: 'Discrete data: lines, not bars',
    lines: [
      'Use a **vertical line chart** for **ungrouped discrete** data (counts like 0, 1, 2…).',
      '**Mode** = value with the tallest line. **Range** = largest − smallest value.',
      '**Mean** = Σ(value × frequency) ÷ Σfrequency.',
      '**Median**: find the middle position, **(n + 1) ÷ 2**, and count along.',
      '!!Common mistake:!! dividing by the number of rows (5) instead of the number of matches (20).',
    ],
    worked: { head: 'Worked example', q: 'Find the mean and the median number of goals.', size: 10.5,
      steps: [['Σfx', '0×3 + 1×6 + 2×5 + 3×4 + 4×2 = 0 + 6 + 10 + 12 + 8 = 36'], ['Mean', `36 ÷ ${gN} = ${gMean}`], ['Median', '(20 + 1) ÷ 2 = 10.5th; running totals 3, 9, 14 → 10th and 11th are 2'], ['Answer', `mean = ${gMean} goals, median = ${gMed} goals`]] },
    qc: 'Write down the mode and the range of the number of goals.',
    notes: `QUICK CHECK ANSWERS: mode = ${gMode} goal (B1); range = 4 − 0 = 4 (B1). Common error: giving the mode as 6 (the frequency).\nMark scheme for the worked example (4 marks): M1 at least 3 correct products, M1 Σfx ÷ 20, A1 1.8; B1 median 2.\nData asserted: ${GF.join(', ')} matches with 0–4 goals.`,
  }), 'S2 Vertical line charts');
}

// ======================= 12 S2 TWO-WAY TABLES =======================
reg(D.contentSlide({
  title: 'Two-way tables',
  subtitle: 'Specification S2 • two sets of categories in one table',
  tag: 'S2',
  draw: (s, p) => {
    label(s, 0.75, 1.5, 5.5, 'Language studied by 80 Year 10 students', { size: 12, bold: true, color: C.ink });
    const G = (v) => hiFill(v);
    table(s, 0.75, 1.9, [1.3, 1.05, 1.05, 1.05, 1.05], [
      ['', 'French', 'Spanish', 'German', 'Total'],
      [hi('Boys', C.ink), TW.boys[0], TW.boys[1], G(TW.boys[2]), TW.boys.reduce((a, b) => a + b)],
      [hi('Girls', C.ink), TW.girls[0], G(TW.girls[1]), G(TW.girls[2]), twG],
      [hi('Total', C.ink), twCols[0], twCols[1], twCols[2], hi(twN)],
    ], { rowH: 0.55, size: 13 });
    box(s, 0.9, 4.35, 0.35, 0.3, 'FFE9B8', C.line); label(s, 1.35, 4.35, 4.6, 'cells found in the worked example', { size: 11, align: 'left', h: 0.3 });
    label(s, 0.75, 4.85, 5.5, 'Each row adds to its total → • Each column adds to its total ↓', { size: 11, italic: true, color: C.grey });
    cap(s, p, 'all rows and columns checked in node');
  },
  head: 'Filling in a two-way table',
  lines: [
    'Rows show one category (boys/girls); columns show another (language).',
    'Every **row** and every **column** adds up to its **total**.',
    'Start with any row or column that has **only one gap**.',
    'Two-way tables are also used for **probability**: P(girl studies German) = 8/80.',
  ],
  worked: { head: 'Worked example', q: '35 boys; 45 girls. Boys: 14 French, 12 Spanish. Girls: 18 French. 31 study Spanish. Complete the table.', size: 10.5,
    steps: [['Boys German', '35 − 14 − 12 = 9'], ['Girls Spanish', '31 − 12 = 19'], ['Girls German', '45 − 18 − 19 = 8'], ['Answer', 'German total 9 + 8 = 17; check 32 + 31 + 17 = 80 ✓']] },
  qc: 'One of the 80 students is picked at random. Find the probability that the student is a girl who studies Spanish.',
  notes: 'QUICK CHECK ANSWER: 19/80 (B1). Links to the probability unit (P).\nAQA lists two-way tables in its S2 teaching guidance rather than in the statement text; see SPEC_STATS.md (medium confidence).',
}), 'S2 Two-way tables');

// ======================= 13 S2 TIME SERIES =======================
{
  const G = { x: 1.4, y: 1.6, w: 4.8, h: 3.45, xmin: 0.5, xmax: 8.5, ymin: 0, ymax: 60, xstep: 1, ystep: 10, minor: 2, ylabel: 'sales (hundreds)', xlabel: 'quarter', fmt: v => '', yfmt: v => String(v) };
  reg(D.contentSlide({
    title: 'Time series line graphs',
    subtitle: 'Specification S2 • tables and line graphs for time series data',
    tag: 'S2',
    draw: (s, p) => {
      axes(s, G);
      QL.forEach((q, i) => label(s, px(G, i + 1) - 0.35, py(G, 0) + 0.07, 0.7, q, { size: 9.5, h: 0.2 }));
      const pts = UMB.map((v, i) => [i + 1, v]);
      plotLine(s, G, pts, C.blue, 2.25); points(s, G, pts, C.ink);
      plotLine(s, G, [[1, 35], [8, 43.5]], C.red, 1.5, { dash: 'dash' });
      label(s, px(G, 0.7), py(G, 58), 1.6, '- - upward trend', { size: 10.5, bold: true, color: C.red, align: 'left' });
      cap(s, p, 'umbrella sales each quarter, 2024–2025 • plotted to scale');
    },
    head: 'Trend and seasonal pattern',
    lines: [
      'Time goes on the **horizontal** axis; points are joined with **straight lines**.',
      'The joining lines only show the **trend**: values between points have no meaning.',
      '**Trend:** the general direction over time (up, down, steady).',
      '**Seasonal pattern:** a repeat each year, e.g. low sales every Q3 (summer).',
      '!!Examiner tip:!! compare the **same** quarter in different years.',
    ],
    worked: { head: 'Worked example', q: 'Describe the trend in sales. Compare Q3 2024 with Q3 2025.',
      steps: [['Trend', `sales are increasing: 2024 total ${yr1}, 2025 total ${yr2}`], ['Same quarter', `Q3: 18 → 22 hundred`], ['Answer', 'upward trend; Q3 is always lowest; Q3 sales rose by 400']] },
    qc: 'Which quarter has the highest sales each year? Suggest a reason.',
    notes: `QUICK CHECK ANSWER: Q4 (October–December) each year (B1): autumn/winter is the wettest season (B1 for a sensible reason).\nData asserted: ${UMB.join(', ')} (hundreds). Dashed red line is a sketched trend line for illustration only; trend lines/moving averages are not required by S2.`,
  }), 'S2 Time series');
}

// ======================= 14 S2 CHOOSING A DIAGRAM =======================
{
  const s = D.contentHeader('Choosing the right diagram', 'Specification S2, S3 • know the appropriate use of each diagram', { tag: 'S2' });
  table(s, 0.45, 1.3, [2.5, 3.45, 3.6, 2.883], [
    ['Diagram', 'Type of data', 'Use it to…', 'Watch out'],
    [hi('Bar chart'), 'categorical or discrete', 'compare frequencies', 'equal widths and gaps'],
    [hi('Pictogram'), 'categorical', 'show frequencies simply', 'needs a key'],
    [hi('Pie chart'), 'categorical', 'show proportions of a whole', 'angles sum to 360°'],
    [hi('Vertical line chart'), 'ungrouped discrete', 'show frequency of each value', 'thin lines, not bars'],
    [hi('Time series graph'), 'values over time', 'show trend and seasonal pattern', 'time on the x-axis'],
    [hi('Histogram'), 'grouped continuous', 'show a distribution', 'no gaps; HT: area = frequency'],
    [hi('Cumulative frequency (HT)'), 'grouped continuous', 'find median and quartiles', 'plot at upper bounds'],
    [hi('Box plot (HT)'), 'any numerical', 'compare averages and spread', 'needs min, LQ, median, UQ, max'],
    [hi('Scatter graph'), 'two numerical variables', 'show correlation', 'correlation ≠ causation'],
  ], { rowH: 0.43, size: 12 });
  tip(s, 0.45, 5.75, W - 0.9, 0.5, 'Misleading graphs: check for a **vertical axis that does not start at 0**, **uneven scales**, **3-D** or **different-width** bars and **missing labels**.', 'Examiner tip');
  D.quickCheck(s, 'Choose a diagram for: (a) favourite colour of 30 people (b) heights of 100 plants (c) temperature each hour for a day.');
  D.notes(s, 'QUICK CHECK ANSWERS: (a) bar chart / pie chart / pictogram (categorical). (b) histogram (grouped continuous) or, for Higher, a cumulative frequency graph. (c) time series line graph.\nS2 ends “… and know their appropriate use”. Misleading graphs are a common AO2 “give a criticism” question (B1 for each valid criticism).');
  reg(s, 'S2 Choosing a diagram');
}

// ======================= 15 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification S2, S4 • line charts, two-way tables, time series, choosing diagrams', [
  { q: 'The table shows the number of goals in 20 matches.  Goals 0, 1, 2, 3 have frequencies **5, 8, 4, 3**. Work out the **mean** number of goals.', marks: 3, ms: 'M1 at least 3 correct products (0, 8, 8, 9) or Σfx = 25. M1 Σfx ÷ 20 (dep). A1 1.25.' },
  { q: '50 people chose tea, coffee or juice. **23** chose tea and **12** chose juice. How many chose coffee?', marks: 2, ms: 'M1 50 − 23 − 12. A1 15.' },
  { q: 'A time series graph of monthly ice-cream sales peaks every July. Describe the **seasonal pattern**.', marks: 1, ms: 'B1 sales are highest in summer / July and lowest in winter, repeating each year oe.' },
  { q: 'Which diagram should you use to show the **proportion** of people who chose each drink?', marks: 1, ms: 'B1 pie chart.' },
]);
reg(R2.s, 'Recap 2');

// ======================= 16 S4 MEAN MEDIAN MODE RANGE =======================
reg(D.contentSlide({
  title: 'Mean, median, mode and range',
  subtitle: 'Specification S4 • measures of central tendency (average) and spread',
  tag: 'S4',
  draw: (s, p) => {
    label(s, 0.75, 1.5, 5.5, 'Quiz scores of 9 students', { size: 12, bold: true, color: C.ink });
    const raw = QUIZ, srt = sorted(QUIZ), cw = 0.58, x0 = 0.85;
    label(s, 0.75, 1.85, 1.6, 'as collected', { size: 10.5, italic: true, color: C.grey, align: 'left' });
    raw.forEach((v, i) => { box(s, x0 + i * cw, 2.15, cw - 0.06, 0.48, C.white, C.line); label(s, x0 + i * cw, 2.15, cw - 0.06, String(v), { h: 0.48, size: 15, bold: true }); });
    label(s, 0.75, 2.8, 1.6, 'in order', { size: 10.5, italic: true, color: C.grey, align: 'left' });
    srt.forEach((v, i) => { const mid = i === 4, md = v === qMode; box(s, x0 + i * cw, 3.1, cw - 0.06, 0.48, mid ? 'FFE9B8' : C.cardBlue, mid ? C.orangeBorder : C.line, { lw: mid ? 2 : 1 }); label(s, x0 + i * cw, 3.1, cw - 0.06, String(v), { h: 0.48, size: 15, bold: true, color: md ? C.blue : C.ink }); label(s, x0 + i * cw, 3.6, cw - 0.06, String(i + 1), { h: 0.2, size: 9, color: C.grey }); });
    arrow(s, x0 + 4 * cw + 0.26, 4.2, x0 + 4 * cw + 0.26, 3.85, C.orange, 2);
    label(s, x0 + 2.2 * cw, 4.2, 2.2, 'median: 5th value', { size: 11, bold: true, color: C.orange });
    // range bracket
    line(s, x0 + 0.26, 4.75, x0 + 8 * cw + 0.26, 4.75, C.red, 1.5, { head: true, tail: true });
    label(s, x0, 4.85, 9 * cw, `range = 18 − 7 = ${qRange}`, { size: 11, bold: true, color: C.red });
    label(s, 0.75, 5.3, 5.5, `mean = 117 ÷ 9 = ${qMean}    mode = ${qMode} (blue)`, { size: 12, bold: true, color: C.blue });
    cap(s, p, 'always put the data in order before finding the median');
  },
  head: 'Three averages and one measure of spread',
  lines: [
    '**Mean** = total ÷ number of values.',
    '**Median** = middle value **in order**; position **(n + 1) ÷ 2**. For an even n, take halfway between the two middle values.',
    '**Mode** = most common value (there can be more than one, or none).',
    '**Range** = largest − smallest: it measures **spread** (consistency).',
  ],
  worked: { head: 'Worked example', q: 'Find the mean, median, mode and range of 12, 15, 7, 15, 18, 10, 15, 9, 16.', size: 10.5,
    steps: [['Mean', `sum = 117; 117 ÷ 9 = ${qMean}`], ['Median', `order: 7 9 10 12 15 15 15 16 18; (9 + 1) ÷ 2 = 5th → ${qMed}`], ['Mode, range', `mode ${qMode}; range 18 − 7 = ${qRange}`], ['Answer', `mean ${qMean}, median ${qMed}, mode ${qMode}, range ${qRange}`]] },
  qc: 'Find the mean, median, mode and range of 4, 8, 3, 9, 6, 8.',
  notes: 'QUICK CHECK ANSWERS: mean = 38 ÷ 6 = 6.33 (6.333…); order 3 4 6 8 8 9, median = (6 + 8) ÷ 2 = 7; mode 8; range 9 − 3 = 6.\nCommon errors: not ordering before the median; giving the range as “3–9” instead of 6.',
}), 'S4 Mean, median, mode, range');

// ======================= 17 S4 OUTLIERS AND CHOOSING AN AVERAGE =======================
{
  const g = { x: 0.95, w: 5.1, y: 3.55, min: 0, max: 40, step: 5, minor: 1 };
  reg(D.contentSlide({
    title: 'Outliers and choosing an average',
    subtitle: 'Specification S4 • range, including consideration of outliers',
    tag: 'S4',
    draw: (s, p) => {
      label(s, 0.75, 1.5, 5.5, 'Weekly pocket money of 8 friends (£)', { size: 12, bold: true, color: C.ink });
      const cnt = {};
      POCKET.forEach(v => { cnt[v] = (cnt[v] || 0) + 1; const X = hx(g, v), Y = g.y - 0.2 - (cnt[v] - 1) * 0.3; s.addShape(SH.OVAL, { x: X - 0.11, y: Y - 0.11, w: 0.22, h: 0.22, fill: { color: v === 40 ? C.red : C.blue }, line: { color: C.white, width: 0.5 } }); });
      ring(s, hx(g, 40), g.y - 0.2, 0.25);
      label(s, hx(g, 40) - 1.6, g.y - 0.95, 1.6, 'outlier £40', { size: 11, bold: true, color: C.red, align: 'right' });
      hScale(s, g, 'pocket money (£)');
      // mean and median markers
      arrow(s, hx(g, pMean), 4.65, hx(g, pMean), 4.15, C.red, 2); label(s, hx(g, pMean) - 0.2, 4.65, 2.6, `mean £${pMean}: pulled up`, { size: 11, bold: true, color: C.red, align: 'left' });
      arrow(s, hx(g, pMed), 5.25, hx(g, pMed), 4.15, C.green, 2); label(s, hx(g, pMed) - 0.2, 5.25, 2.6, `median £${pMed}: not affected`, { size: 11, bold: true, color: C.green, align: 'left' });
      cap(s, p, 'dot plot drawn to scale • each dot is one friend');
    },
    head: 'Values that do not fit',
    lines: [
      'An **outlier** is a value much bigger or smaller than the rest.',
      'Check it: is it a **mistake** (remove it) or **real** (keep it, but choose the average carefully)?',
      'The **mean** and the **range** are affected by outliers.',
      'The **median** is not, so use it when there are outliers.',
      'Use the **mode** for categorical data (e.g. most popular shoe size).',
    ],
    worked: { head: 'Worked example', q: 'Pocket money: £5, 6, 6, 7, 8, 8, 8, 40. Which average best represents the data? Explain.', size: 10.5,
      steps: [['Mean', `sum = 88; 88 ÷ 8 = £${pMean}`], ['Median', `4th and 5th values: (7 + 8) ÷ 2 = £${pMed}`], ['Answer', `median £${pMed}: the mean (£${pMean}) is bigger than 7 of the 8 values, because of the outlier £40`]] },
    qc: 'Work out the range with and without the £40. What does this show about the range?',
    notes: `QUICK CHECK ANSWER: with £40: 40 − 5 = £${range(POCKET)}; without: 8 − 5 = £${range(pNo)}. One outlier makes the range much larger, so the range is a poor measure of spread here (the IQR, Higher, is better).\nMean without the outlier = 48 ÷ 7 = £6.86. Mode £${pMode}.\nAQA mark schemes for “which average” need the choice AND a reason linked to the data (B1 B1).`,
  }), 'S4 Outliers and choosing an average');
}

// ======================= 18 S4 GROUPED DATA =======================
reg(D.contentSlide({
  title: 'Grouped data: estimating the mean',
  subtitle: 'Specification S4 • modal class, class containing the median, estimated mean',
  tag: 'S4',
  draw: (s, p) => {
    label(s, 0.75, 1.5, 5.5, `Time taken by ${pzN} students to finish a puzzle`, { size: 12, bold: true, color: C.ink });
    table(s, 0.75, 1.9, [1.5, 1.2, 1.35, 1.45], [
      ['Time t (min)', 'Frequency f', 'Midpoint x', 'f × x'],
      ...PZC.map((c, i) => [`${c[0]} < t ≤ ${c[1]}`, i === 2 ? hiFill(PZF[i]) : PZF[i], hi(pzMid[i]), pzFx[i]]),
      [hi('Total', C.ink), hi(pzN, C.ink), '', hi(pzSum, C.red)],
    ], { rowH: 0.42, size: 12 });
    label(s, 0.75, 4.95, 5.5, `estimated mean = ${pzSum} ÷ ${pzN} = ${pzMean} minutes`, { size: 13, bold: true, color: C.red });
    label(s, 0.75, 5.3, 5.5, 'shaded: modal class 20 < t ≤ 30', { size: 10.5, italic: true, color: C.grey });
    cap(s, p, 'the same data is used for the histogram and cumulative frequency slides');
  },
  head: 'Why “estimate”?',
  lines: [
    'Grouped data hides the **exact values**, so assume every value is at the **midpoint** of its class.',
    'Estimated mean = **Σ(f × midpoint) ÷ Σf**.',
    '**Modal class** = class with the **highest frequency**.',
    'Median class: position (40 + 1) ÷ 2 = 20.5; running totals 4, 13, 25 → **20 < t ≤ 30**.',
    '!!Common mistakes:!! using class **widths** or **upper bounds** instead of midpoints; dividing by **5** (classes).',
  ],
  worked: { head: 'Worked example', q: 'Work out an estimate for the mean time.', size: 10.5,
    steps: [['Midpoints', '5, 15, 25, 35, 45'], ['f × x', `20 + 135 + 300 + 350 + 225 = ${pzSum}`], ['Divide', `${pzSum} ÷ ${pzN}`], ['Answer', `estimated mean = ${pzMean} minutes`]] },
  qc: 'Explain why the answer is only an estimate. Could the true mean be 27 minutes?',
  notes: `QUICK CHECK ANSWER: we do not know the actual times, only the classes; midpoints are assumed (B1). Yes, 27 is possible: the true mean must lie between Σ(f × lower bound) ÷ 40 = 20.75 and Σ(f × upper bound) ÷ 40 = 30.75.\nTypical AQA mark scheme (4 marks): M1 midpoints (at least 3 correct), M1 Σfx (allow 1 error), M1dep ÷ 40, A1 25.75 (accept 25.8).`,
}), 'S4 Grouped data: estimated mean');

// ======================= 19 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification S4 • averages, range, outliers and grouped data', [
  { q: 'Find the **median** and the **range** of: 8, 3, 11, 6, 9, 14, 5.', marks: 2, ms: 'B1 median 8 (order 3 5 6 8 9 11 14). B1 range 11.' },
  { q: 'House prices in a street: £180k, £195k, £205k, £210k, £1.2m. Explain why the **mean** is not a good average to use.', marks: 1, ms: 'B1 £1.2m is an outlier which makes the mean much higher than most of the prices oe.' },
  { q: 'Masses m (kg): 0 < m ≤ 4 frequency **6**; 4 < m ≤ 8 frequency **10**; 8 < m ≤ 12 frequency **4**. Work out an estimate for the mean mass.', marks: 4, ms: 'M1 midpoints 2, 6, 10. M1 Σfx = 12 + 60 + 40 = 112. M1dep 112 ÷ 20. A1 5.6 kg.' },
]);
reg(R3.s, 'Recap 3');

// ======================= 20 S3 EQUAL-WIDTH HISTOGRAM =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, xmin: 0, xmax: 50, ymin: 0, ymax: 14, xstep: 10, ystep: 2, minor: 2, xlabel: 'time t (minutes)', ylabel: 'frequency' };
  reg(D.contentSlide({
    title: 'Histograms: equal class widths',
    subtitle: 'Specification S3 • grouped continuous data',
    tag: 'S3',
    draw: (s, p) => {
      axes(s, G);
      PZC.forEach(([a, b], i) => box(s, px(G, a), py(G, PZF[i]), px(G, b) - px(G, a), py(G, 0) - py(G, PZF[i]), PAL[0], C.ink, { tr: 15, lw: 1 }));
      cap(s, p, `puzzle times of ${pzN} students (slide 18 data) • plotted to scale`);
    },
    head: 'Bars that touch',
    lines: [
      'Use a **histogram** for **grouped continuous** data (time, mass, length).',
      'The horizontal axis is a **continuous scale**: bars **touch**, no gaps.',
      'With **equal** class widths, the bar **height** can be the **frequency**.',
      'Each bar starts and ends at the **class boundaries** (e.g. 10 and 20).',
      '!!Examiner tip:!! a bar chart has gaps and labels; a histogram has a numbered scale.',
    ],
    worked: { head: 'Worked example', q: 'Use the histogram. How many students took more than 30 minutes? What percentage is this?',
      steps: [['Read bars', '30 < t ≤ 40: 10;  40 < t ≤ 50: 5'], ['Add', '10 + 5 = 15 students'], ['Answer', '15 ÷ 40 × 100 = 37.5%']] },
    qc: 'Estimate how many students took between 15 and 25 minutes.',
    notes: `QUICK CHECK ANSWER: half of the 10–20 bar + half of the 20–30 bar = 4.5 + 6 = 10.5 → about 10 or 11 students (assumes values spread evenly within each class).\nFrequency polygons (midpoints joined with straight lines) are not named in the AQA S3 statement; check the AQA teaching guidance (see SPEC_STATS.md) before teaching them.`,
  }), 'S3 Histograms: equal widths');
}

// ======================= 21 S3 HT UNEQUAL-WIDTH HISTOGRAM =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, xmin: 100, xmax: 200, ymin: 0, ymax: 2.2, xstep: 20, ystep: 0.5, minor: 5, xlabel: 'mass m (grams)', ylabel: 'frequency density', yfmt: v => String(+v.toFixed(1)) };
  reg(D.contentSlide({
    title: 'Histograms: unequal class widths',
    subtitle: 'Specification S3 • frequency density = frequency ÷ class width',
    tag: 'S3', ht: true,
    draw: (s, p) => {
      axes(s, G);
      APC.forEach(([a, b], i) => {
        box(s, px(G, a), py(G, apFD[i]), px(G, b) - px(G, a), py(G, 0) - py(G, apFD[i]), PAL[0], C.ink, { tr: 15, lw: 1 });
        label(s, px(G, a), py(G, apFD[i]) - 0.24, px(G, b) - px(G, a), `f = ${APF[i]}`, { size: 9.5, bold: true, color: C.ink, h: 0.22 });
      });
      cap(s, p, `masses of ${apN} apples • bar AREA = frequency • plotted to scale`);
    },
    head: 'Area, not height, shows frequency',
    lines: [
      'With **unequal** widths, plot **frequency density** on the vertical axis.',
      '**frequency density = frequency ÷ class width**',
      'Then **area of bar = frequency**.',
      'Without this, wide classes look too big: 160–200 has 12 apples but is 4 times as wide as 130–140.',
    ],
    worked: { head: 'Worked example', q: 'Masses: 100–120: 8, 120–130: 14, 130–140: 20, 140–160: 26, 160–200: 12. Find the frequency densities.', size: 10.5,
      steps: [['Widths', '20, 10, 10, 20, 40'], ['f ÷ width', '8 ÷ 20, 14 ÷ 10, 20 ÷ 10, 26 ÷ 20, 12 ÷ 40'], ['Answer', 'fd = 0.4, 1.4, 2.0, 1.3, 0.3']] },
    qc: '!!Common mistake:!! plotting frequency (26) for 140 < m ≤ 160. Check: area = 1.3 × 20 = ? Which class has the most apples per gram?',
    notes: `QUICK CHECK ANSWER: 1.3 × 20 = 26 ✓ (area = frequency). Most apples per gram: 130 < m ≤ 140 (highest frequency density, 2.0), even though 140–160 has the highest frequency.\nAll frequency densities and areas asserted in node: ${apFD.join(', ')}.\nAQA mark scheme for drawing (3 marks): B3 all bars correct, B2 three or four correct, B1 two correct or all fds correct.`,
  }), 'S3 Histograms: unequal widths (HT)');
}

// ======================= 22 S3 HT READING HISTOGRAMS =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, xmin: 0, xmax: 50, ymin: 0, ymax: 4.4, xstep: 10, ystep: 1, minor: 5, xlabel: 'length L (cm)', ylabel: 'frequency density', yfmt: v => String(v) };
  reg(D.contentSlide({
    title: 'Reading a histogram',
    subtitle: 'Specification S3 • frequency = frequency density × class width',
    tag: 'S3', ht: true,
    draw: (s, p) => {
      axes(s, G);
      FSC.forEach(([a, b], i) => box(s, px(G, a), py(G, FSD[i]), px(G, b) - px(G, a), py(G, 0) - py(G, FSD[i]), 'E7C3CF', C.ink, { lw: 1 }));
      // shaded part 12–25
      [[12, 15, 3.6], [15, 20, 4.0], [20, 25, 2.2]].forEach(([a, b, d]) => box(s, px(G, a), py(G, d), px(G, b) - px(G, a), py(G, 0) - py(G, d), C.orangeTab, null, { tr: 25 }));
      line(s, px(G, 12), py(G, 0), px(G, 12), py(G, 4.25), C.red, 1.5, { dash: 'dash' });
      line(s, px(G, 25), py(G, 0), px(G, 25), py(G, 4.25), C.red, 1.5, { dash: 'dash' });
      label(s, px(G, 12) - 0.3, py(G, 4.4) - 0.04, 0.6, '12', { size: 10, bold: true, color: C.red, h: 0.2 });
      label(s, px(G, 25) - 0.3, py(G, 4.4) - 0.04, 0.6, '25', { size: 10, bold: true, color: C.red, h: 0.2 });
      cap(s, p, `lengths of ${fsN} fish • orange: estimated number between 12 cm and 25 cm`);
    },
    head: 'Working backwards from a histogram',
    lines: [
      '**frequency = frequency density × class width** (the bar’s area).',
      'Read the frequency density from the **vertical scale** carefully: here 1 small square = 0.2.',
      'For part of a class, use the **fraction of the width** (assume values are spread evenly).',
      '!!Examiner tip:!! write the frequency of each bar above it before answering.',
    ],
    worked: { head: 'Worked example', q: 'Estimate the number of fish between 12 cm and 25 cm long.', size: 10.5,
      steps: [['12–15', '3 × 3.6 = 10.8'], ['15–20', '5 × 4.0 = 20'], ['20–25', '5 × 2.2 = 11'], ['Answer', `10.8 + 20 + 11 = ${r2(fs1225)} → about 42 fish`]] },
    qc: 'Work out the total number of fish. Then estimate how many are longer than 25 cm.',
    notes: `QUICK CHECK ANSWER: frequencies ${FSF.join(', ')} → total ${fsN} fish. Longer than 25 cm: 5 × 2.2 + 8 = 11 + 8 = 19.\nMark scheme for the worked example (3 marks): M1 one correct partial area, M1 all three parts added, A1 41.8 (accept 41 to 42).`,
  }), 'S3 Reading histograms (HT)');
}

// ======================= 23 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification S3 • histograms with equal and unequal class widths', [
  { q: 'Give **one** way a histogram is different from a bar chart.', marks: 1, ms: 'B1 bars touch / no gaps / continuous numerical scale on the x-axis / (HT) area represents frequency oe.' },
  { q: 'A class 10 < h ≤ 25 has frequency **18**. Work out its frequency density.', marks: 2, ht: true, ms: 'M1 18 ÷ 15. A1 1.2.' },
  { q: 'A histogram bar for 40 < t ≤ 60 has frequency density **2.5**. How many values are in this class?', marks: 2, ht: true, ms: 'M1 2.5 × 20. A1 50.' },
  { q: 'Frequency densities: 0 < x ≤ 10 is **1.6**; 10 < x ≤ 20 is **0.8**. Estimate how many values lie between **5 and 15**.', marks: 2, ht: true, ms: 'M1 1.6 × 5 or 0.8 × 5. A1 12.' },
]);
reg(R4.s, 'Recap 4');

// ======================= 24 S3 HT CUMULATIVE FREQUENCY =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, xmin: 0, xmax: 50, ymin: 0, ymax: 40, xstep: 10, ystep: 10, minor: 5, xlabel: 'time t (minutes)', ylabel: 'cumulative frequency' };
  reg(D.contentSlide({
    title: 'Cumulative frequency graphs',
    subtitle: 'Specification S3 • running totals plotted at the upper class bound',
    tag: 'S3', ht: true, panelW: 6.1,
    draw: (s, p) => {
      axes(s, G);
      fnLine(s, G, cfF, 0, 50, 60, C.blue, 2.25);
      points(s, G, CFP, C.ink);
      CFP.slice(1).forEach(([x, y]) => label(s, px(G, x) - 0.62, py(G, y) - 0.3, 0.6, `(${x}, ${y})`, { size: 9, bold: true, color: C.red, h: 0.2, align: 'right' }));
      cap(s, p, 'puzzle times (slide 18) • points at upper bounds • smooth curve');
    },
    head: 'Plotting a cumulative frequency curve',
    lines: [
      '**Cumulative frequency** = running total of the frequencies.',
      'Plot each running total at the **upper class bound**: (10, 4), (20, 13)…',
      'Start at (0, 0), the lower bound of the first class with 0.',
      'Join with a **smooth curve** (or straight lines). The curve always rises.',
      '!!Common mistake:!! plotting at the **midpoint** of each class.',
    ],
    worked: { head: 'Worked example', q: 'Frequencies 4, 9, 12, 10, 5 for classes 0–10, …, 40–50. Find the points to plot.', size: 10.5,
      steps: [['Running totals', `4, 4 + 9 = 13, 13 + 12 = 25, 25 + 10 = 35, 35 + 5 = 40`], ['Upper bounds', '10, 20, 30, 40, 50'], ['Answer', '(0, 0) (10, 4) (20, 13) (30, 25) (40, 35) (50, 40)']] },
    qc: 'Use the graph to estimate how many students took 15 minutes or less.',
    notes: `QUICK CHECK ANSWER: read up from 15 to the curve: about ${Math.round(cfF(15))} students (accept 8 to 9).\nThe curve is a monotone cubic through the plotted points (computed in node, so it passes exactly through every point and never decreases). AQA guidance: cumulative frequency diagrams are used for continuous data and may be curves or polygons.\nMark scheme (2 marks for plotting): B1 at least 4 points plotted at upper bounds; B1 joined with a curve or line segments.`,
  }), 'S3 Cumulative frequency (HT)');
}

// ======================= 25 S4 HT MEDIAN AND QUARTILES FROM CF =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, xmin: 0, xmax: 50, ymin: 0, ymax: 40, xstep: 10, ystep: 10, minor: 5, xlabel: 'time t (minutes)', ylabel: 'cumulative frequency' };
  reg(D.contentSlide({
    title: 'Median and quartiles from a graph',
    subtitle: 'Specification S4 • median, quartiles and inter-quartile range',
    tag: 'S4', ht: true,
    draw: (s, p) => {
      axes(s, G);
      fnLine(s, G, cfF, 0, 50, 60, C.blue, 2.25);
      [[10, rdLQ, C.green, 'LQ'], [20, rdMed, C.red, 'median'], [30, rdUQ, C.orange, 'UQ']].forEach(([cf, t, col, nm]) => {
        line(s, px(G, 0), py(G, cf), px(G, t), py(G, cf), col, 1.5, { dash: 'dash' });
        arrow(s, px(G, t), py(G, cf), px(G, t), py(G, 0), col, 1.5, { dash: 'dash' });
        label(s, px(G, t) + 0.04, py(G, 0) - 0.26, 0.9, `${nm} ${t}`, { size: 9.5, bold: true, color: col, h: 0.2, align: 'left' });
      });
      cap(s, p, 'read across at 10, 20 and 30, then down • plotted to scale');
    },
    head: 'Reading the curve',
    lines: [
      'For n values on a CF graph: **median** at **n ÷ 2**, **LQ** at **n ÷ 4**, **UQ** at **3n ÷ 4**.',
      'Read **across** to the curve, then **down** to the scale.',
      '**IQR = UQ − LQ**: the spread of the **middle half**. It ignores outliers.',
      '!!Examiner tip:!! draw the reading lines on the graph: they can earn method marks.',
    ],
    worked: { head: 'Worked example', q: `n = ${pzN}. Find the median and the inter-quartile range.`, size: 10.5,
      steps: [['Median', `40 ÷ 2 = 20th → about ${rdMed} min`], ['Quartiles', `10th → LQ ≈ ${rdLQ};  30th → UQ ≈ ${rdUQ}`], ['IQR', `${rdUQ} − ${rdLQ}`], ['Answer', `median ≈ ${rdMed} min, IQR ≈ ${rdIQR} min`]] },
    qc: 'Estimate how many students took more than 35 minutes.',
    notes: `QUICK CHECK ANSWER: at t = 35 the curve reads about ${cf35}; 40 − ${cf35} = ${pzN - cf35} students (accept 9 to 11). Common error: giving the reading (30) and not subtracting from 40.\nValues read from the curve as drawn (computed in node): median ${cfMed.toFixed(2)}, LQ ${cfLQ.toFixed(2)}, UQ ${cfUQ.toFixed(2)}. Mark schemes allow a tolerance (e.g. median 25 to 27). Using n ÷ 2 rather than (n + 1) ÷ 2 is the usual convention for large grouped data on a graph.\nCompare: estimated mean from slide 18 = ${pzMean} min, very close to the median.`,
  }), 'S4 Median and quartiles from CF (HT)');
}

// ======================= 26 S4 HT QUARTILES FROM A LIST =======================
reg(D.contentSlide({
  title: 'Quartiles from a list',
  subtitle: 'Specification S4 • quartiles and inter-quartile range for small data sets',
  tag: 'S4', ht: true,
  draw: (s, p) => {
    label(s, 0.75, 1.5, 5.5, 'Daily rainfall (mm) on 11 days, in order', { size: 12, bold: true, color: C.ink });
    const cw = 0.48, x0 = 0.85, y = 2.2;
    RAIN.forEach((v, i) => {
      const k = i + 1, col = k === 3 ? C.green : k === 6 ? C.red : k === 9 ? C.orange : null;
      box(s, x0 + i * cw, y, cw - 0.05, 0.5, col ? 'FFF4E0' : C.white, col || C.line, { lw: col ? 2 : 0.75 });
      label(s, x0 + i * cw, y, cw - 0.05, String(v), { h: 0.5, size: 14, bold: true, color: col || C.ink });
      label(s, x0 + i * cw, y + 0.52, cw - 0.05, String(k), { h: 0.2, size: 9, color: C.grey });
    });
    [[3, 'LQ = 6', C.green], [6, 'median = 11', C.red], [9, 'UQ = 15', C.orange]].forEach(([k, t, col]) => {
      const X = x0 + (k - 1) * cw + (cw - 0.05) / 2;
      arrow(s, X, 3.45, X, 2.98, col, 2); label(s, X - 0.8, 3.48, 1.6, t, { size: 11, bold: true, color: col });
    });
    box(s, 0.9, 4.1, 5.2, 1.4, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText(T.para(['n = 11: median position (11 + 1) ÷ 2 = **6th**', 'LQ position (11 + 1) ÷ 4 = **3rd**', 'UQ position 3(11 + 1) ÷ 4 = **9th**', `IQR = 15 − 6 = **${rnIQR} mm**`], { size: 11.5 }), { x: 1.05, y: 4.15, w: 5.0, h: 1.3, valign: 'middle', margin: 0 });
    cap(s, p, 'positions in the ordered list (n = 11)');
  },
  head: 'Splitting the data into quarters',
  lines: [
    'Put the data **in order** first.',
    'Positions: **LQ (n + 1) ÷ 4**, **median (n + 1) ÷ 2**, **UQ 3(n + 1) ÷ 4**.',
    'A quarter of the values are below the LQ; a quarter are above the UQ.',
    'A **small IQR** means the middle half of the data is **consistent**.',
  ],
  worked: { head: 'Worked example', q: 'Find the median and the IQR of 3, 5, 6, 8, 9, 11, 12, 14, 15, 18, 21.',
    steps: [['Median', '6th value = 11'], ['Quartiles', '3rd value = 6; 9th value = 15'], ['Answer', `median 11 mm; IQR = 15 − 6 = ${rnIQR} mm`]] },
  qc: 'Find the IQR of: 2, 4, 4, 5, 7, 8, 9, 10, 12, 13, 15, 16, 18, 20, 22.',
  notes: 'QUICK CHECK ANSWER: n = 15; LQ = 4th = 5, UQ = 12th = 16, IQR = 11 (M1 for either quartile, A1 11).\nOther conventions (e.g. median of each half) give the same answers when (n + 1) is divisible by 4, which is why exam lists usually have 7, 11, 15… values. AQA mark schemes accept any correct method.',
}), 'S4 Quartiles from a list (HT)');

// ======================= 27 S4 HT BOX PLOTS =======================
{
  const g = { x: 0.95, w: 5.1, y: 4.35, min: 0, max: 24, step: 2, minor: 1 };
  reg(D.contentSlide({
    title: 'Box plots',
    subtitle: 'Specification S4 • five-number summary on a scale',
    tag: 'S4', ht: true,
    draw: (s, p) => {
      // light grid
      for (let v = g.min; v <= g.max; v += 1) line(s, hx(g, v), 2.1, hx(g, v), g.y, v % 2 ? 'F4E6EB' : 'E6C9D3', 0.5);
      boxPlot(s, g, rnF, 3.1, 0.8, C.blue);
      const nm = ['min 3', 'LQ 6', 'median 11', 'UQ 15', 'max 21'];
      rnF.forEach((v, i) => label(s, hx(g, v) - 0.55, i % 2 ? 1.75 : 2.15, 1.1, nm[i], { size: 10, bold: true, color: i === 2 ? C.red : C.ink, h: 0.22 }));
      hScale(s, g, 'daily rainfall (mm)');
      line(s, hx(g, 6), 3.75, hx(g, 15), 3.75, C.red, 1.25, { head: true, tail: true });
      label(s, hx(g, 6), 3.8, hx(g, 15) - hx(g, 6), 'IQR 9', { size: 10, bold: true, color: C.red, h: 0.22 });
      cap(s, p, 'rainfall data from slide 26 • drawn to scale');
    },
    head: 'Drawing a box plot',
    lines: [
      'You need **five values**: minimum, LQ, median, UQ, maximum.',
      'Draw a **scale** first. The **box** goes from LQ to UQ with a line at the **median**.',
      '**Whiskers** go out to the minimum and maximum.',
      'Box length = **IQR**; whisker to whisker = **range**.',
      '!!Examiner tip:!! use a ruler and the given scale: plots are marked to ± half a small square.',
    ],
    worked: { head: 'Worked example', q: 'Draw a box plot for the rainfall data.', size: 10.5,
      steps: [['Five numbers', 'min 3, LQ 6, median 11, UQ 15, max 21'], ['Scale', '0 to 24 mm; 1 small square = 1 mm'], ['Answer', 'box 6 to 15, median line at 11, whiskers to 3 and 21']] },
    qc: 'What fraction of the days had more than 15 mm of rain? Between 6 mm and 15 mm?',
    notes: 'QUICK CHECK ANSWERS: a quarter (¼) above the UQ; a half between the quartiles.\nA box plot can also be drawn from a cumulative frequency graph: min and max from the class limits or given values, LQ/median/UQ read from the curve.\nMark scheme (3 marks): B3 fully correct; B2 box with median correct OR all five values plotted; B1 three values correct.',
  }), 'S4 Box plots (HT)');
}

// ======================= 28 S4 HT COMPARING BOX PLOTS =======================
{
  const g = { x: 1.3, w: 4.85, y: 4.6, min: 10, max: 50, step: 5, minor: 1 };
  reg(D.contentSlide({
    title: 'Comparing box plots',
    subtitle: 'Specification S4 • compare an average AND the spread, in context',
    tag: 'S4', ht: true,
    draw: (s, p) => {
      for (let v = g.min; v <= g.max; v += 1) line(s, hx(g, v), 1.6, hx(g, v), g.y, v % 5 ? 'F4E6EB' : 'E6C9D3', 0.5);
      boxPlot(s, g, fA, 2.35, 0.7, C.blue, 'Class A');
      boxPlot(s, g, fB, 3.75, 0.7, C.green, 'Class B');
      line(s, hx(g, fA[2]), 2.0, hx(g, fA[2]), 4.1, C.red, 1, { dash: 'dash' });
      hScale(s, g, 'test score (out of 50)');
      cap(s, p, 'two classes of 15 students • both plots on the same scale');
    },
    head: 'Two comparisons, both in context',
    lines: [
      '**1 Average:** compare the **medians**: which group is higher?',
      '**2 Spread:** compare the **IQRs** (or ranges): which group is more consistent?',
      'Write each in **context**, e.g. “Class B did better on average”.',
      '!!Common mistake:!! comparing only the averages, or giving numbers with no meaning.',
    ],
    worked: { head: 'Worked example', q: 'Compare the test scores of the two classes.', size: 10.5,
      steps: [['Averages', `median A = ${fA[2]}, median B = ${fB[2]}`], ['Spread', `IQR A = 38 − 24 = ${iqA}; IQR B = 37 − 27 = ${iqB}`], ['Answer', 'Class B scored higher on average (higher median) and was more consistent (smaller IQR)']] },
    qc: 'Write down the range of each class. Why is the IQR a better measure of spread than the range?',
    notes: `QUICK CHECK ANSWERS: range A = 47 − 12 = ${range(CLA)}; range B = 44 − 18 = ${range(CLB)}. The IQR uses the middle 50% so it is not affected by extreme values / outliers.\nTypical mark scheme (2 marks): B1 compares medians in context; B1 compares IQRs (or ranges) in context. No marks for comparing without context or for comparing maxima.\nRaw data (n = 15 each) built in node: A ${CLA.join(', ')}; B ${CLB.join(', ')}.`,
  }), 'S4 Comparing box plots (HT)');
}

// ======================= 29 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification S3, S4 • cumulative frequency, quartiles and box plots', [
  { q: 'Find the **inter-quartile range** of: 4, 7, 9, 10, 12, 15, 16, 19, 22, 25, 30.', marks: 3, ht: true, ms: 'M1 LQ = 9 (3rd value) or UQ = 22 (9th value). M1 22 − 9. A1 13.' },
  { q: 'Where should the point for the class **20 < t ≤ 30** be plotted on a cumulative frequency graph?', marks: 1, ht: true, ms: 'B1 at t = 30 (the upper class bound), at the running total.' },
  { q: 'Box plots: Town P median **£240**, IQR **£60**. Town Q median **£210**, IQR **£95**. Compare the weekly rents.', marks: 2, ht: true, ms: 'B1 rents are higher on average in town P (higher median). B1 rents in town P are more consistent / less spread out (smaller IQR).' },
  { q: 'A CF graph for **120** people reads **84** at 40 minutes. How many people took **more** than 40 minutes?', marks: 2, ht: true, ms: 'M1 120 − 84. A1 36.' },
], { ht: true });
reg(R5.s, 'Recap 5');

// ======================= 30 S4 COMPARING DISTRIBUTIONS (both tiers) =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 3.4, xmin: 0.5, xmax: 8.5, ymin: 0, ymax: 35, xstep: 1, ystep: 5, minor: 1, xlabel: 'game', ylabel: 'points scored', fmt: v => '', yfmt: v => String(v) };
  reg(D.contentSlide({
    title: 'Comparing distributions',
    subtitle: 'Specification S4 • compare an average and a measure of spread, in context',
    tag: 'S4',
    draw: (s, p) => {
      axes(s, G);
      for (let i = 1; i <= 8; i++) label(s, px(G, i) - 0.2, py(G, 0) + 0.07, 0.4, String(i), { size: 10, h: 0.2 });
      const pa = ALI.map((v, i) => [i + 1, v]), pb = BEN.map((v, i) => [i + 1, v]);
      plotLine(s, G, pa, C.blue, 2); plotLine(s, G, pb, C.orangeTab, 2);
      pa.forEach(([x, y]) => s.addShape(SH.OVAL, { x: px(G, x) - 0.07, y: py(G, y) - 0.07, w: 0.14, h: 0.14, fill: { color: C.blue }, line: { color: C.blue } }));
      pb.forEach(([x, y]) => box(s, px(G, x) - 0.07, py(G, y) - 0.07, 0.14, 0.14, C.orangeTab, null));
      label(s, px(G, 8.5) - 3.0, py(G, 2) - 0.1, 1.4, '● Ali', { size: 11, bold: true, color: C.blue, align: 'left' });
      label(s, px(G, 8.5) - 1.6, py(G, 2) - 0.1, 1.4, '■ Ben', { size: 11, bold: true, color: C.orange, align: 'left' });
      cap(s, p, 'points scored by two basketball players in 8 games • plotted to scale');
    },
    head: 'Average AND spread, in context',
    lines: [
      'Compare an **average** (mean or median): who is higher **on average**?',
      'Compare a **spread** (range, or IQR at Higher): who is more **consistent**?',
      'A **smaller** spread means **more consistent**.',
      'Use the **numbers** and say what they mean in the **context**.',
      '!!Examiner tip:!! “Ben is better” gets no marks; say “on average” and refer to consistency.',
    ],
    worked: { head: 'Worked example', q: 'Ali: 21 18 24 19 22 20 23 21. Ben: 30 9 25 14 28 12 27 31. Compare their scores.', size: 10.5,
      steps: [['Means', `Ali 168 ÷ 8 = ${aliM}; Ben 176 ÷ 8 = ${benM}`], ['Ranges', `Ali 24 − 18 = ${aliR}; Ben 31 − 9 = ${benR}`], ['Answer', 'Ben scored more points on average; Ali was much more consistent (smaller range)']] },
    qc: 'The coach needs a player who will reliably score at least 18 points. Who should she pick? Give a reason.',
    notes: `QUICK CHECK ANSWER: Ali: he scored 18 or more in every game, and his range is only ${aliR}; Ben scored below 18 in three games (9, 14, 12). B1 choice with reason.\nMark scheme for “compare” (2 marks): B1 compares averages in context, B1 compares spread in context. Values asserted: Ali mean ${aliM}, range ${aliR}; Ben mean ${benM}, range ${benR}.`,
  }), 'S4 Comparing distributions');
}

// ======================= 31 S5 DESCRIBING A POPULATION =======================
{
  const G = { x: 1.35, y: 1.65, w: 4.85, h: 2.4, ymin: 0, ymax: 25, ystep: 5, minor: 5, ylabel: 'households', xlabel: 'cars per household' };
  reg(D.contentSlide({
    title: 'Using a sample to describe a population',
    subtitle: 'Specification S5 • apply statistics to describe a population',
    tag: 'S5',
    draw: (s, p) => {
      const { cx, slot } = catFrame(s, G, CARS.map(String));
      CARF.forEach((f, i) => { box(s, cx[i] - slot * 0.3, py(G, f), slot * 0.6, py(G, 0) - py(G, f), PAL[3], C.ink, { lw: 1 }); label(s, cx[i] - 0.3, py(G, f) - 0.24, 0.6, String(f), { size: 10.5, bold: true, h: 0.22 }); });
      box(s, 0.75, 4.75, 5.5, 1.05, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      s.addText(T.para([`sample: **${carN}** of the **1200** households`, `sample mean = ${carSum} ÷ ${carN} = **${carMean}** cars per household`, `no car: 6/50 = **12%** → about **${car0}** households`], { size: 11 }), { x: 0.9, y: 4.8, w: 5.2, h: 0.95, valign: 'middle', margin: 0 });
      cap(s, p, 'a random sample of 50 households in a village • plotted to scale');
    },
    head: 'From the sample to the population',
    lines: [
      'Work out a **statistic** from the sample (mean, median, proportion…).',
      'Assume the **population** is similar: same mean, same proportions.',
      'Scale up **proportions** to estimate **totals** in the population.',
      'State any **assumption**: the sample is random and representative.',
      'The estimate is better if the sample is **larger**.',
    ],
    worked: { head: 'Worked example', q: 'Estimate the total number of cars owned by the 1200 households.', size: 10.5,
      steps: [['Σfx', `0×6 + 1×22 + 2×16 + 3×6 = ${carSum}`], ['Sample mean', `${carSum} ÷ ${carN} = ${carMean}`], ['Scale up', `${carMean} × 1200`], ['Answer', `about ${carTot} cars (assuming the sample is representative)`]] },
    qc: 'Estimate the number of households in the village with 2 or more cars.',
    notes: `QUICK CHECK ANSWER: (16 + 6)/50 = 22/50 = 44%; 0.44 × 1200 = 528 households (M1 22/50 × 1200, A1 528).\nS5 is a one-line statement (“apply statistics to describe a population”); AQA assesses it through questions like these that link S1 sampling with S4 statistics. Sample median = 1 car.`,
  }), 'S5 Describing a population');
}

// ======================= 32 STRETCH: REVERSE AND COMBINED MEANS =======================
reg(D.contentSlide({
  title: 'Working backwards with the mean',
  subtitle: 'Specification S4 • problem solving: totals unlock mean problems',
  tag: 'S4', stretch: true,
  draw: (s, p) => {
    // bar model: class of 12 and class of 18 combine
    label(s, 0.75, 1.5, 5.5, 'Bar model: total = mean × number of values', { size: 12, bold: true, color: C.ink });
    const x0 = 0.85, k = 5.2 / 30, y1 = 2.0;
    box(s, x0, y1, 12 * k, 0.55, PAL[0], C.ink, { tr: 20 }); label(s, x0, y1, 12 * k, '12 students\nmean 15', { h: 0.55, size: 10.5, bold: true, color: C.white });
    box(s, x0 + 12 * k, y1, 18 * k, 0.55, PAL[2], C.ink, { tr: 20 }); label(s, x0 + 12 * k, y1, 18 * k, '18 students, mean 20', { h: 0.55, size: 10.5, bold: true, color: C.white });
    label(s, x0, y1 + 0.6, 12 * k, 'total 180', { size: 11, bold: true, color: C.blue });
    label(s, x0 + 12 * k, y1 + 0.6, 18 * k, 'total 360', { size: 11, bold: true, color: C.green });
    box(s, x0, 3.3, 30 * k, 0.55, 'E7C3CF', C.ink); label(s, x0, 3.3, 30 * k, 'all 30 students: total 540 → mean 540 ÷ 30 = 18', { h: 0.55, size: 11, bold: true });
    label(s, 0.75, 4.0, 5.5, '18 is NOT (15 + 20) ÷ 2 = 17.5: the groups are different sizes', { size: 10.5, italic: true, color: C.red });
    // reverse mean
    box(s, 0.85, 4.45, 5.2, 1.2, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText(T.para(['**Reverse:** 5 numbers, mean 8 → total **40**', 'Add a 6th number: mean 9 → total **54**', 'Sixth number = 54 − 40 = **14**'], { size: 11 }), { x: 1.0, y: 4.5, w: 5.0, h: 1.1, valign: 'middle', margin: 0 });
    cap(s, p, 'bar lengths are in proportion to the number of students');
  },
  head: 'Think in totals',
  lines: [
    '**Total = mean × number of values.** Find totals first.',
    'To **combine** groups: add the totals, add the numbers, then divide.',
    'A **missing value**: new total − old total.',
    'Never average two means unless the groups are the **same size**.',
  ],
  worked: { head: 'Worked example', q: 'The mean of 5 numbers is 8. A sixth number is added and the mean becomes 9. Find the sixth number.', size: 10.5,
    steps: [['Old total', '5 × 8 = 40'], ['New total', '6 × 9 = 54'], ['Answer', 'sixth number = 54 − 40 = 14']] },
  qc: 'The mean of 4 numbers is 7. One more number is added and the mean is now 8. What number was added?',
  notes: 'QUICK CHECK ANSWER: 5 × 8 − 4 × 7 = 40 − 28 = 12 (M1 either total, A1 12).\nGrade 7–9 stretch: these AO3 problems appear on both tiers but are usually the last parts of a question. The homework ends with one.',
}), 'Stretch: reverse and combined means');

// ======================= 33 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification S4, S5 • comparing distributions, describing a population, means', [
  { q: 'Team X: mean **4.2** goals, range **3**. Team Y: mean **3.5** goals, range **7**. Compare the two teams.', marks: 2, ms: 'B1 team X scored more goals on average (higher mean). B1 team X was more consistent (smaller range).' },
  { q: 'In a random sample of **80** trees in a forest of **2000**, **18** have a disease. Estimate how many trees in the forest have the disease. State one assumption.', marks: 3, ms: 'M1 18/80 × 2000 oe. A1 450. B1 the sample is representative / random oe.' },
  { q: 'The mean of **5** numbers is **14**. A sixth number is added and the mean becomes **15**. Find the sixth number.', marks: 2, ms: 'M1 6 × 15 − 5 × 14 (= 90 − 70). A1 20.' },
]);
reg(R6.s, 'Recap 6');

// ======================= 34 S6 SCATTER GRAPHS AND CORRELATION =======================
{
  const R2g = rng(6);
  const mk = (f) => Array.from({ length: 14 }, (_, i) => { const x = 1 + i * 0.65 + R2g() * 0.4; return [x, f(x) + (R2g() - 0.5) * 2.4]; });
  const sets = [['positive', mk(x => 1.2 + 0.85 * x), C.blue], ['negative', mk(x => 9.2 - 0.85 * x), C.red], ['none', Array.from({ length: 14 }, () => [1 + R2g() * 8.5, 1 + R2g() * 8]), C.grey]];
  reg(D.contentSlide({
    title: 'Scatter graphs and correlation',
    subtitle: 'Specification S6 • use and interpret scatter graphs of bivariate data',
    tag: 'S6',
    draw: (s, p) => {
      sets.forEach(([nm, pts, col], i) => {
        const g = { x: 0.75 + i * 1.95, y: 1.65, w: 1.65, h: 1.65, xmin: 0, xmax: 10, ymin: 0, ymax: 10 };
        box(s, g.x, g.y, g.w, g.h, C.white, null);
        line(s, g.x, g.y + g.h, g.x + g.w, g.y + g.h, C.ink, 1.25); line(s, g.x, g.y, g.x, g.y + g.h, C.ink, 1.25);
        pts.forEach(([x, y]) => cross(s, px(g, x), py(g, Math.max(0.3, Math.min(9.7, y))), 0.04, col, 1.25));
        label(s, g.x, g.y + g.h + 0.05, g.w, nm, { size: 11.5, bold: true, color: col });
      });
      table(s, 0.75, 3.95, [1.55, 4.0], [
        ['Correlation', 'Meaning'],
        [hi('Positive'), 'as one variable increases, the other increases'],
        [hi('Negative'), 'as one variable increases, the other decreases'],
        [hi('None'), 'no relationship between the variables'],
      ], { rowH: 0.36, size: 11 });
      cap(s, p, 'strong = points close to a line; weak = points more spread out');
    },
    head: 'Two variables, one point each',
    lines: [
      '**Bivariate** data: two measurements for each item (e.g. hours revised and test score).',
      'Plot each pair as a **cross**; do **not** join the points.',
      'Describe the **correlation**: positive, negative or none (and strong or weak).',
      'In words: “the **more** hours revised, the **higher** the score”.',
    ],
    worked: { head: 'Worked example', q: 'Describe the correlation between a car’s age and its value.',
      steps: [['Think', 'older cars are usually worth less'], ['Type', 'as age increases, value decreases'], ['Answer', 'negative correlation']] },
    qc: 'Describe the likely correlation for: (a) height and arm span (b) shoe size and maths test score.',
    notes: 'QUICK CHECK ANSWERS: (a) positive (B1). (b) no correlation (B1).\nThe three mini graphs use seeded random scatter around y = 1.2 + 0.85x, y = 9.2 − 0.85x and uniform noise (generated in node).\nAQA accepts “positive” / “negative” for a 1-mark “describe the correlation”; “strong/weak” is not needed unless asked. Answers like “it goes up” score 0.',
  }), 'S6 Scatter graphs and correlation');
}

// ======================= 35 S6 LINE OF BEST FIT =======================
const GS = { x: 1.35, y: 1.6, w: 4.85, h: 3.5, xmin: 0, xmax: 12, ymin: 0, ymax: 80, xstep: 2, ystep: 10, minor: 2, xlabel: 'hours of revision', ylabel: 'test score (out of 80)' };
reg(D.contentSlide({
  title: 'Lines of best fit and predictions',
  subtitle: 'Specification S6 • estimated lines of best fit, interpolation and extrapolation',
  tag: 'S6',
  draw: (s, p) => {
    axes(s, GS);
    points(s, GS, SX.map((x, i) => [x, SY[i]]), C.ink);
    cross(s, px(GS, OUT[0]), py(GS, OUT[1]), 0.05, C.ink, 1.25); ring(s, px(GS, OUT[0]), py(GS, OUT[1]), 0.17);
    label(s, px(GS, OUT[0]) + 0.22, py(GS, OUT[1]) - 0.2, 0.95, 'outlier:\nignore it', { h: 0.4, size: 10, bold: true, color: C.red, align: 'left' });
    const yAt = x => icpt + slope * x;
    plotLine(s, GS, [[0, yAt(0)], [12, yAt(12)]], C.blue, 2);
    line(s, px(GS, 6.5), py(GS, 0), px(GS, 6.5), py(GS, yAt(6.5)), C.green, 1.5, { dash: 'dash' });
    arrow(s, px(GS, 6.5), py(GS, yAt(6.5)), px(GS, 0), py(GS, yAt(6.5)), C.green, 1.5, { dash: 'dash' });
    label(s, px(GS, 0) + 0.05, py(GS, yAt(6.5)) - 0.27, 1.2, `≈ ${est65}`, { size: 10.5, bold: true, color: C.green, align: 'left' });
    cap(s, p, '12 students plus one outlier • line of best fit drawn through the mean point');
  },
  head: 'Making predictions',
  lines: [
    'A **line of best fit** is a straight line that follows the trend, with points evenly either side.',
    'It should pass close to the **mean point** (mean of x, mean of y) and need not go through (0, 0).',
    '**Interpolation:** predict **inside** the data range: reliable.',
    '**Extrapolation:** predict **outside** the data range: unreliable, the trend may not continue.',
    'Ignore **outliers** when drawing the line.',
  ],
  worked: { head: 'Worked example', q: 'Estimate the score of a student who revised for 6.5 hours.',
    steps: [['Read up', 'from 6.5 on the x-axis up to the line'], ['Read across', 'to the score axis'], ['Answer', `about ${est65} marks (inside the data, so reliable)`]] },
  qc: 'Use the line to predict the score for 20 hours of revision. Why is this prediction not sensible?',
  notes: `QUICK CHECK ANSWER: the line gives about ${est20}, but the test is out of 80: extrapolation beyond the data (max 10 hours) is unreliable and here impossible (B1).\nLine: least-squares fit of the 12 points (outlier excluded), y ≈ ${slope.toFixed(2)}x + ${icpt.toFixed(1)}, through the mean point (${smx.toFixed(2)}, ${smy.toFixed(2)}). Mark schemes accept a reading from the candidate’s line within a range (e.g. 48–54). QC 3.5 h → about 36.`,
}), 'S6 Lines of best fit');

// ======================= 36 S6 CAUSATION AND OUTLIERS =======================
{
  const G = { x: 1.35, y: 1.6, w: 4.85, h: 2.6, xmin: 15, xmax: 35, ymin: 0, ymax: 400, xstep: 5, ystep: 100, minor: 2, xlabel: 'daily max temperature (°C)', ylabel: 'ice creams sold' };
  const R3g = rng(35);
  const IC = Array.from({ length: 12 }, (_, i) => { const t = 16 + i * 1.6 + R3g() * 0.8; return [t, Math.round(-180 + 15.5 * t + (R3g() - 0.5) * 50)]; });
  reg(D.contentSlide({
    title: 'Correlation is not causation',
    subtitle: 'Specification S6 • recognise correlation and know that it does not indicate causation',
    tag: 'S6',
    draw: (s, p) => {
      axes(s, G);
      points(s, G, IC, C.ink);
      nodeBox(s, 2.45, 4.75, 2.1, 0.45, 'hot weather', C.cream, C.orangeBorder);
      nodeBox(s, 0.8, 5.35, 2.2, 0.45, 'ice-cream sales ↑', C.white, C.blue, { size: 10.5 });
      nodeBox(s, 4.0, 5.35, 2.2, 0.45, 'sunburn cases ↑', C.white, C.blue, { size: 10.5 });
      arrow(s, 3.0, 5.2, 2.2, 5.35, C.orange, 1.75); arrow(s, 4.0, 5.2, 4.8, 5.35, C.orange, 1.75);
      line(s, 3.0, 5.57, 4.0, 5.57, C.red, 1.5, { dash: 'dash' }); label(s, 3.0, 5.6, 1.0, '✗ cause', { size: 9.5, bold: true, color: C.red, h: 0.2 });
      cap(s, p, 'a third factor can cause both variables to rise');
    },
    head: 'A link is not a cause',
    lines: [
      'Correlation shows two variables are **related**; it does not prove one **causes** the other.',
      'Ice-cream sales and sunburn are positively correlated, but ice cream does not cause sunburn: **hot weather** causes both.',
      'Some correlations are **coincidence** (spurious).',
      'An **outlier** on a scatter graph does not fit the pattern: check it, and leave it out of the line of best fit.',
    ],
    worked: { head: 'Worked example', q: '“Towns with more libraries have more crime, so libraries cause crime.” Explain why this is wrong.',
      steps: [['Correlation?', 'yes: positive correlation'], ['Third factor', 'bigger towns have more people'], ['Answer', 'more people → more libraries AND more crime; correlation does not show causation']] },
    qc: 'A scatter graph shows a positive correlation between hours of TV watched and number of snacks eaten. Does TV cause snacking? Explain.',
    notes: `QUICK CHECK ANSWER: Not necessarily (B1): the graph shows correlation, not causation; e.g. both may depend on free time / being at home (B1 for a reason).\nIce-cream data: 12 seeded points around 15.5t − 180, strong positive correlation (illustrative data generated in node).\nAQA “explain” questions: B1 states correlation does not mean causation, B1 gives a context reason or third factor.`,
  }), 'S6 Correlation and causation');
}

// ======================= 37 RECAP 7 =======================
const R7 = D.recapSlide(7, 'Specification S6 • scatter graphs, lines of best fit and causation', [
  { q: 'A scatter graph shows engine size (litres) and fuel economy (miles per gallon). Bigger engines go fewer miles per gallon. Describe the correlation.', marks: 1, ms: 'B1 negative.' },
  { q: 'On a revision-hours scatter graph, one point (9 hours, 18 marks) is far below the others. Suggest a reason, and say what to do with it when drawing a line of best fit.', marks: 2, ms: 'B1 e.g. the student was ill / a recording error oe. B1 ignore it / leave it out.' },
  { q: 'Using a line of best fit y ≈ 5x + 18, estimate the score for **4** hours of revision. Is the estimate reliable? (Data runs from 1 to 10 hours.)', marks: 2, ms: 'M1 5 × 4 + 18 or reading from the line. A1 38 (accept 36–40) and yes: interpolation / within the data range.' },
  { q: 'Explain why a positive correlation between ice-cream sales and sunburn does **not** mean ice cream causes sunburn.', marks: 2, ms: 'B1 correlation does not show causation. B1 both are caused by hot / sunny weather oe.' },
]);
reg(R7.s, 'Recap 7');

// ======================= 38 METHODS TO REMEMBER =======================
{
  const s = D.contentHeader('Summary: methods to remember', 'No formulae sheet in AQA GCSE Maths • every method below must be learned', { tag: 'Methods' });
  table(s, 0.45, 1.3, [3.0, 5.4, 4.033], [
    ['Method', 'How', 'Watch out'],
    [hi('Pie chart angle'), 'frequency × (360° ÷ total)', 'angles must add to 360°'],
    [hi('Mean from a table'), 'Σ(value × f) ÷ Σf', 'divide by Σf, not the number of rows'],
    [hi('Estimated mean'), 'Σ(f × midpoint) ÷ Σf', 'it is an estimate: midpoints assumed'],
    [hi('Median position'), '(n + 1) ÷ 2 in an ordered list', 'order the data first'],
    [hi('Frequency density (HT)'), 'frequency ÷ class width', 'area of bar = frequency'],
    [hi('Cumulative frequency (HT)'), 'running totals plotted at upper bounds', 'not at midpoints'],
    [hi('Quartiles (HT)'), 'list: (n + 1) ÷ 4, 3(n + 1) ÷ 4; graph: n ÷ 4, 3n ÷ 4', 'IQR = UQ − LQ'],
    [hi('Comparing'), 'an average AND a spread, in context', '“on average” and “more consistent”'],
    [hi('Sample → population'), 'sample fraction × population size', 'assumes the sample is representative'],
    [hi('Scatter predictions'), 'read from the line of best fit', 'extrapolation is unreliable'],
  ], { rowH: 0.44, size: 12 });
  D.quickCheck(s, 'Cover the “How” column. Say each method aloud, then check. Which three methods are Higher only?', 6.38);
  D.notes(s, 'QUICK CHECK: Higher only = frequency density, cumulative frequency, quartiles (and box plots).\nThe template’s RECALL/GIVEN equations table is not used: AQA 8300 has no formulae sheet and none of these methods is given in the paper.');
  reg(s, 'Summary: methods to remember');
}

// ======================= 39 KEY WORDS =======================
reg(D.keyWords([
  ['Population', 'The whole group you want to find out about.'],
  ['Sample', 'A smaller group taken from the population.'],
  ['Random sample', 'Every member has an equal chance of being chosen.'],
  ['Bias', 'A sample that over-represents one group.'],
  ['Discrete data', 'Can only take certain values, e.g. number of goals.'],
  ['Continuous data', 'Measured on a scale, e.g. time, mass, length.'],
  ['Mean', 'Total ÷ number of values.'],
  ['Median', 'Middle value when the data is in order.'],
  ['Mode / modal class', 'Most common value / class with the highest frequency.'],
  ['Range', 'Largest − smallest: a measure of spread.'],
  ['Outlier', 'A value that does not fit the pattern of the rest.'],
  ['Frequency density (H)', 'Frequency ÷ class width; area of a histogram bar = frequency.'],
  ['Cumulative frequency (H)', 'Running total of the frequencies.'],
  ['IQR (H)', 'Upper quartile − lower quartile: spread of the middle half.'],
  ['Correlation', 'A relationship between two variables: positive, negative or none.'],
  ['Extrapolation', 'Predicting outside the data range: unreliable.'],
], { notes: 'Cover-and-recall: hide the definitions, students say them, then reveal. (H) terms are Higher only.' }), 'Summary: key words');

// ======================= 40 FULL QUESTION =======================
reg(D.fullQuestion(`Times, t minutes, of the first **${frN}** finishers in a fun run:   20 < t ≤ 25: **4**  •  25 < t ≤ 30: **10**  •  30 < t ≤ 35: **14**  •  35 < t ≤ 45: **8**  •  45 < t ≤ 65: **4**`, [
  { l: 'a', q: 'Write down the modal class.', marks: 1, ms: 'B1 30 < t ≤ 35.' },
  { l: 'b', q: 'Work out an estimate for the mean time.', marks: 4, h: 1.3, ms: `M1 midpoints 22.5, 27.5, 32.5, 40, 55 (at least 3 correct). M1 Σfx = 90 + 275 + 455 + 320 + 220 (= ${frSum}). M1dep Σfx ÷ ${frN}. A1 ${frMean} minutes.` },
  { l: 'c', q: 'Explain why your answer to (b) is only an estimate.', marks: 1, ms: 'B1 the actual times are not known / midpoints are used oe.' },
  { l: 'd', q: 'Calculate the frequency densities needed to draw a histogram of the data.', marks: 2, ht: true, ms: 'M1 frequency ÷ class width for at least two classes. A1 0.8, 2, 2.8, 0.8, 0.2.' },
  { l: 'e', q: 'Estimate how many runners took **more than 40 minutes**.', marks: 2, ht: true, ms: 'M1 ½ × 8 (= 4) or 0.8 × 5. A1 8.' },
  { l: 'f', q: 'Sam says, “More than a quarter of these runners took longer than 35 minutes.” Is Sam correct? Show your working.', marks: 2, ms: 'M1 (8 + 4) ÷ 40 or 40 ÷ 4 = 10 compared with 12. A1 yes, 30% (12 > 10).' },
  { l: 'g', q: '**300** people ran. The organiser uses these **first 40** runners as a sample of all runners. Give one reason this sample is biased.', marks: 1, ms: 'B1 the first 40 to finish are the fastest, so they do not represent all runners / not random oe.' },
], 13, { subtitle: 'Specification S1, S3, S4 • mixed Foundation and Higher • answer every part • 13 marks' }), 'Full question');

// ======================= 41–42 HOMEWORK =======================
const HW = [
  { n: '1', q: 'In a survey of **72** people, **18** chose rugby. Work out the angle for rugby on a pie chart.', marks: 2, ms: 'M1 18/72 × 360 or 360 ÷ 72 = 5. A1 90°.' },
  { n: '2', q: 'For the data **6, 9, 4, 9, 7, 10, 5, 9, 4, 7** work out the mean, the median, the mode and the range.', marks: 4, ms: 'B1 mean 7 (70 ÷ 10). B1 median 7 (order 4 4 5 6 7 7 9 9 9 10; 5th and 6th both 7). B1 mode 9. B1 range 6.' },
  { n: '3', q: '60 students chose PE, art or music. **22** chose PE; **17** chose art. Of the **25** boys, 12 chose PE and 6 chose art. How many **girls** chose music?', marks: 3, ms: 'M1 music total 60 − 22 − 17 = 21. M1 boys music 25 − 12 − 6 = 7. A1 14 girls.' },
  { n: '4', q: 'Box plots of journey times: Bus median **24 min**, IQR **6 min**. Train median **19 min**, IQR **15 min**. Compare the journey times. Which would you choose to be sure of arriving on time? Give a reason.', marks: 3, ht: true, ms: 'B1 the train is quicker on average (lower median, 19 < 24). B1 the bus is more consistent / reliable (smaller IQR, 6 < 15). B1 the bus, because its times vary less oe (accept the train if justified by its lower median, e.g. most train journeys are still quicker).' },
  { n: '5', q: 'All **30** students in a year group took a test: mean **62**. Class A has **12** students with mean **58**; the rest are in class B. Zara (class B) scored **63**. She says, “I scored above the mean for class B.” Is she correct? Show your working.', marks: 5, h: 1.6, ms: `M1 30 × 62 = ${hwAll}. M1 12 × 58 = ${hwA}. M1 (${hwAll} − ${hwA}) ÷ 18 = ${hwB} ÷ 18. A1 ${hwBm.toFixed(1)} (64.66…). B1ft No: 63 < 64.7 (conclusion consistent with their mean).` },
];
D.homework('Answer every question. Show all your working. A calculator may be used.', HW, 17, { subtitle: 'Statistics S1–S6 • show all working • 17 marks • Q5 is a multi-step problem (AO3)' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R6, R7].forEach(r => assert.strictEqual(r.total, 7));
assert.strictEqual(R5.total, 8);
assert(D.slideNo >= 40 && D.slideNo <= 48, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'AQA_8300_Statistics.pptx');
D.save(out).then(() => { console.log(SLIDES.join('\n')); });
