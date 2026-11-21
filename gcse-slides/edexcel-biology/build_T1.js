// build_T1.js — Edexcel GCSE Biology 1BI0 Topic 1 Key concepts in biology (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T1.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 1,
  title: 'Key concepts in biology',
  shortTitle: 'T1',
  subtitle: 'Cells, microscopy, enzymes, food tests and transport in and out of cells',
  specRange: '1.1–1.17',
  pOnly: [],
  paper: 'Papers 1 and 2',
  keywords: ['Cells', 'Microscopy', 'Units', 'Enzymes', 'Food tests', 'Diffusion & osmosis'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
// magnification
const mag = (img, real) => img / real;
calc('mag 36 mm / 0.012 mm', mag(36, 0.012), 3000, 1e-9);
calc('real 0.012 mm in µm', 0.012 * 1000, 12, 1e-12);
calc('MT mag 30 mm / 0.015 mm', mag(30, 0.015), 2000, 1e-9);
calc('MT real 24 mm / ×400 (µm)', 24 / 400 * 1000, 60, 1e-9);
calc('YT mag 45 mm / 0.009 mm', mag(45, 0.009), 5000, 1e-9);
calc('YT real 18 mm / ×1500 (µm)', 18 / 1500 * 1000, 12, 1e-9);
calc('eyepiece × objective 10 × 40', 10 * 40, 400);
// units / standard form
calc('25 µm in m', 25e-6, 2.5e-5, 1e-18);
calc('0.2 nm in m', 0.2e-9, 2e-10, 1e-20);
calc('red blood cell 8 µm in mm', 8 / 1000, 0.008, 1e-12);
calc('ribosome 25 nm in µm', 25 / 1000, 0.025, 1e-12);
calc('cell 100 µm ÷ bacterium 2 µm', 100 / 2, 50, 1e-12);
calc('nucleus 6 µm = 6000 nm', 6 * 1000, 6000);
calc('QC 3.5 mm in µm', 3.5 * 1000, 3500);
// estimation: 12 cells across a 0.4 mm field → cell length estimate
calc('estimate cell length 0.4 mm / 12 (µm)', 0.4 / 12 * 1000, 33.333333333333336, 1e-9);
calc('estimate 2 s.f.', sf(0.4 / 12 * 1000, 2), 33, 1e-12);
calc('estimate cells in 1 mm² (30 per 0.1 mm × 0.1 mm)', 30 * 100, 3000);
// enzymes: rate
calc('rate 1/50 s', 1 / 50, 0.02, 1e-12);
calc('rate 30 cm³ in 20 s', 30 / 20, 1.5, 1e-12);
calc('rate 1000/40', 1000 / 40, 25, 1e-12);
const PH = [[4, 200], [5, 90], [6, 40], [7, 50], [8, 125], [9, 250]];
const PHR = PH.map(([p, t]) => [p, 1000 / t]);
calc('pH 6 rate 1000/40', PHR[2][1], 25, 1e-12);
calc('pH 4 rate 1000/200', PHR[0][1], 5, 1e-12);
calc('pH 8 rate 1000/125', PHR[4][1], 8, 1e-12);
calc('optimum pH (fastest)', PHR.reduce((a, b) => (b[1] > a[1] ? b : a))[0], 6);
calc('MT rate 1/80 (3 s.f.)', sf(1 / 80, 3), 0.0125, 1e-12);
calc('MT rate 24 cm³ / 60 s', 24 / 60, 0.4, 1e-12);
calc('YT rate 1/25', 1 / 25, 0.04, 1e-12);
calc('YT rate 45 cm³ / 30 s', 45 / 30, 1.5, 1e-12);
// enzyme activity vs temperature (relative %)
const ENZ = t => (t <= 37 ? 100 * Math.exp(-((t - 37) ** 2) / (2 * 14 * 14)) : 100 * Math.exp(-((t - 37) ** 2) / (2 * 6 * 6)));
calc('enzyme peak at 37', ENZ(37), 100, 1e-9);
assert(ENZ(55) < 2, 'denatured by 55 °C');
const PHC = p => 100 * Math.exp(-((p - 7) ** 2) / (2 * 0.9 * 0.9));
calc('pH curve peak 7', PHC(7), 100, 1e-9);
// substrate concentration (saturating)
const SUB = x => 10 * x / (2 + x);
calc('substrate curve at 2', SUB(2), 5, 1e-12);
// calorimetry (HT)
const cal = (m, dT) => m * 4.2 * dT;
calc('calorimetry 20 g × 4.2 × 30', cal(20, 30), 2520, 1e-9);
calc('per gram 2520 / 1.0 g (kJ)', cal(20, 30) / 1000, 2.52, 1e-12);
calc('MT cal 25 g × 4.2 × 18 / 0.5 g (J/g)', cal(25, 18) / 0.5, 3780, 1e-9);
calc('YT cal 20 g × 4.2 × 24 / 0.8 g (J/g)', cal(20, 24) / 0.8, 2520, 1e-9);
// osmosis
const pct = (a, b) => (b - a) / a * 100;
calc('osmosis 2.50 → 2.80', pct(2.50, 2.80), 12, 1e-9);
calc('osmosis 3.20 → 2.88', pct(3.20, 2.88), -10, 1e-9);
calc('MT 2.40 → 2.64', pct(2.40, 2.64), 10, 1e-9);
calc('MT 5.00 → 4.60', pct(5.00, 4.60), -8, 1e-9);
calc('YT 4.00 → 4.30', pct(4.00, 4.30), 7.5, 1e-9);
calc('YT 2.50 → 2.20', pct(2.50, 2.20), -12, 1e-9);
const OSM = [[0, 14], [0.2, 7], [0.4, 1], [0.6, -6], [0.8, -12], [1.0, -17]];
const zero = 0.4 + 1 / (1 + 6) * 0.2;
calc('no-change concentration (interpolated)', zero, 0.42857142857142855, 1e-12);
calc('no-change 2 s.f.', sf(zero, 2), 0.43, 1e-12);
// diffusion surface area : volume
calc('SA:V 1 cm cube', 6 / 1, 6, 1e-12);
calc('SA:V 2 cm cube', 24 / 8, 3, 1e-12);
// recap / full question / homework
calc('R2 mag 40 mm / 0.02 mm', 40 / 0.02, 2000, 1e-9);
calc('R5 % 1.60 → 1.84', pct(1.60, 1.84), 15, 1e-9);
calc('FQ mag 50 mm / 0.025 mm', 50 / 0.025, 2000, 1e-9);
calc('FQ % 2.00 → 1.70', pct(2.00, 1.70), -15, 1e-9);
calc('FQ rate 1000/80', 1000 / 80, 12.5, 1e-12);
calc('HW mag image 6 mm ×1500 real (µm)', 6 / 1500 * 1000, 4, 1e-9);
calc('HW % 3.00 → 3.36', pct(3.00, 3.36), 12, 1e-9);
calc('starter 1 cm = 10 mm', 10, 10);

// ======================= DECK-SPECIFIC drawing helpers =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
    line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
function polyline(s, pts, col, w = 1.5, o = {}) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, w, o); }
function callout(s, lx, ly, lw, text, pX, pY, col, o = {}) {
  const right = lx > pX;
  label(s, lx, ly - (o.h || 0.3) / 2, lw, text, { size: o.size || 11, bold: o.bold !== false, color: col, align: right ? 'left' : 'right', h: o.h || 0.3, valign: 'middle' });
  line(s, right ? lx - 0.04 : lx + lw + 0.04, ly, pX, pY, col, 1);
  ball(s, pX, pY, 0.03, col);
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const table = (s, rows, o) => s.addTable(rows, Object.assign({ fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } }, o));
const NUC = ['C9B6E4', '6A4C93'], MITO = ['F0B26B', 'B5782E'], RIB = '555555', CHL = ['6DBE5A', '35582A'];
function mito(s, cx, cy, w = 0.42, h = 0.2, rot = 0) { oval(s, cx, cy, w, h, MITO[0], MITO[1], { rot }); line(s, cx - w * 0.3, cy, cx + w * 0.3, cy, MITO[1], 0.75); }
function animalCell(s, cx, cy, k = 1) {
  oval(s, cx, cy, 2.6 * k, 1.9 * k, 'FBE9E7', 'B5655B', { lw: 2 });
  ball(s, cx - 0.25 * k, cy, 0.38 * k, NUC[0], NUC[1], 1.5);
  mito(s, cx + 0.7 * k, cy - 0.4 * k, 0.42 * k, 0.2 * k); mito(s, cx + 0.55 * k, cy + 0.5 * k, 0.42 * k, 0.2 * k); mito(s, cx - 0.85 * k, cy + 0.45 * k, 0.42 * k, 0.2 * k);
  [[0.3, -0.62], [0.95, 0.1], [-0.75, -0.45], [0.15, 0.7], [-1.0, -0.05], [0.4, 0.15]].forEach(([dx, dy]) => ball(s, cx + dx * k, cy + dy * k, 0.045, RIB));
}
function plantCell(s, cx, cy, k = 1) {
  const w = 2.2 * k, h = 2.8 * k;
  box(s, cx - w / 2, cy - h / 2, w, h, 'E3F1DA', '3E7A2E', { lw: 4.5 });
  box(s, cx - w / 2 + 0.09, cy - h / 2 + 0.09, w - 0.18, h - 0.18, 'EEF7E8', '6A9E58', { lw: 1 });
  box(s, cx - w / 2 + 0.5 * k, cy - h / 2 + 0.75 * k, w - 1.0 * k, h - 1.2 * k, 'DDEBF7', '5B87B5', { lw: 1.5, shape: SH.ROUNDED_RECTANGLE, r: 0.1 });
  ball(s, cx + w / 2 - 0.4 * k, cy - h / 2 + 0.42 * k, 0.24 * k, NUC[0], NUC[1], 1.5);
  [[-w / 2 + 0.28 * k, -0.6], [-w / 2 + 0.28 * k, 0.15], [-w / 2 + 0.28 * k, 0.85], [w / 2 - 0.28 * k, 0.45], [w / 2 - 0.28 * k, 1.05]].forEach(([dx, dy]) => oval(s, cx + dx, cy + dy * k, 0.2 * k, 0.36 * k, CHL[0], CHL[1]));
  mito(s, cx - 0.35 * k, cy - h / 2 + 0.42 * k, 0.36 * k, 0.17 * k);
  [[0.0, -1.18], [0.45, 1.2], [-0.4, 1.2]].forEach(([dx, dy]) => ball(s, cx + dx * k, cy + dy * k, 0.045, RIB));
}
function bacterium(s, cx, cy, k = 1) {
  const w = 2.6 * k, h = 1.2 * k;
  box(s, cx - w / 2, cy - h / 2, w, h, 'E7F0F7', '2A6F8E', { lw: 3.5, shape: SH.ROUNDED_RECTANGLE, r: 0.5 });
  box(s, cx - w / 2 + 0.08, cy - h / 2 + 0.08, w - 0.16, h - 0.16, 'EEF5FA', '7FA9C9', { lw: 1, shape: SH.ROUNDED_RECTANGLE, r: 0.5 });
  polyline(s, [[cx - 0.75 * k, cy - 0.1], [cx - 0.5 * k, cy + 0.22], [cx - 0.2 * k, cy - 0.2], [cx + 0.05 * k, cy + 0.2], [cx + 0.25 * k, cy - 0.12], [cx - 0.1 * k, cy - 0.28], [cx - 0.55 * k, cy - 0.25], [cx - 0.75 * k, cy - 0.1]], '7A4E9C', 2.5);
  ball(s, cx + 0.72 * k, cy - 0.2 * k, 0.13 * k, C.white, C.red, 2); ball(s, cx + 0.78 * k, cy + 0.25 * k, 0.1 * k, C.white, C.red, 2);
  [[-0.95, 0.25], [0.45, 0.3], [0.5, -0.3], [-0.4, 0.38]].forEach(([dx, dy]) => ball(s, cx + dx * k, cy + dy * k, 0.04, RIB));
  const fx = cx + w / 2; polyline(s, [[fx, cy], [fx + 0.2, cy - 0.12], [fx + 0.4, cy + 0.1], [fx + 0.6, cy - 0.12], [fx + 0.8, cy + 0.08]], C.ink, 2);
}
function spermCell(s, x, y, k = 1) {
  oval(s, x, y, 0.9 * k, 0.55 * k, 'DCE6F5', '2F5F8F', { lw: 1.5 });
  oval(s, x - 0.27 * k, y, 0.32 * k, 0.48 * k, 'F5D9A8', 'B5782E', { lw: 1 });
  ball(s, x + 0.08 * k, y, 0.17 * k, NUC[0], NUC[1], 1);
  box(s, x + 0.42 * k, y - 0.1 * k, 0.55 * k, 0.2 * k, 'F7E3C6', MITO[1], { lw: 1 });
  [0.52, 0.7, 0.88].forEach(d => oval(s, x + d * k, y, 0.14 * k, 0.12 * k, MITO[0], MITO[1], { lw: 0.5 }));
  polyline(s, [[x + 0.97 * k, y], [x + 1.3 * k, y - 0.15], [x + 1.65 * k, y + 0.15], [x + 2.0 * k, y - 0.15], [x + 2.35 * k, y + 0.1]], '2F5F8F', 2);
}
function eggCell(s, cx, cy, r) {
  ball(s, cx, cy, r + 0.12, 'FFF6E6', 'D9B26B', 1.5);
  ball(s, cx, cy, r, 'FBE6C4', 'A4561C', 1.5);
  ball(s, cx + 0.15, cy - 0.1, r * 0.28, NUC[0], NUC[1], 1);
  [[-0.35, 0.3], [-0.2, -0.35], [0.3, 0.35], [-0.45, -0.05], [0.05, 0.5], [0.45, 0.05]].forEach(([dx, dy]) => ball(s, cx + dx * r / 0.75, cy + dy * r / 0.75, 0.06, 'E8B04B', 'B5782E', 0.5));
}
function ciliated(s, x, y, n, cw, ch) {
  for (let i = 0; i < n; i++) {
    const cx = x + i * cw;
    box(s, cx, y, cw, ch, 'FBE9E7', 'B5655B', { lw: 1.5 });
    ball(s, cx + cw / 2, y + ch * 0.62, cw * 0.22, NUC[0], NUC[1], 1);
    mito(s, cx + cw / 2, y + ch * 0.25, cw * 0.4, 0.12);
    for (let j = 0; j < 6; j++) { const hx = cx + 0.08 + j * (cw - 0.16) / 5; polyline(s, [[hx, y], [hx + 0.06, y - 0.18], [hx + 0.02, y - 0.36]], '8E2A33', 1.25); }
  }
}
function microscope(s, x0, y0, k = 1) {
  const S = v => v * k;
  box(s, x0 + S(0.1), y0 + S(3.2), S(1.9), S(0.28), '4A4A4A', '222222', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  poly(s, [[x0 + S(1.35), y0 + S(3.2)], [x0 + S(1.75), y0 + S(3.2)], [x0 + S(1.75), y0 + S(1.0)], [x0 + S(1.45), y0 + S(0.7)], [x0 + S(1.2), y0 + S(0.9)], [x0 + S(1.45), y0 + S(1.15)]], '5A5A5A', '222222');
  box(s, x0 + S(0.5), y0 + S(0.15), S(0.32), S(0.75), '9AA5B1', '333333', { lw: 1.25 });
  box(s, x0 + S(0.42), y0 + S(0.05), S(0.48), S(0.14), '333333', '222222');
  box(s, x0 + S(0.45), y0 + S(0.9), S(0.42), S(0.85), 'B7C0CA', '333333', { lw: 1.25 });
  poly(s, [[x0 + S(0.52), y0 + S(1.75)], [x0 + S(0.8), y0 + S(1.75)], [x0 + S(0.74), y0 + S(2.08)], [x0 + S(0.58), y0 + S(2.08)]], '6B7480', '333333');
  box(s, x0 + S(0.15), y0 + S(2.22), S(1.25), S(0.1), '333333', '222222');
  box(s, x0 + S(0.38), y0 + S(2.13), S(0.55), S(0.08), 'DCEFFB', '5B87B5', { lw: 0.75 });
  ball(s, x0 + S(1.58), y0 + S(1.75), S(0.17), '333333', '111111');
  ball(s, x0 + S(1.58), y0 + S(2.12), S(0.1), '666666', '111111');
  box(s, x0 + S(0.5), y0 + S(2.7), S(0.32), S(0.12), 'FFF3B0', 'B5782E');
}
// enzyme with notch (active site) at the top; substrate wedge
function enzyme(s, cx, cy, w, h, o = {}) {
  const nw = w * 0.34, nd = h * 0.38;
  const pts = o.denatured
    ? [[cx - w / 2, cy - h / 2 + 0.05], [cx - nw / 2, cy - h / 2 - 0.05], [cx - nw * 0.1, cy - h / 2 + nd * 0.7], [cx + nw * 0.3, cy - h / 2 + 0.1], [cx + w / 2, cy - h / 2 - 0.1], [cx + w / 2 + 0.1, cy + h / 2], [cx - w / 2 - 0.1, cy + h / 2 + 0.05]]
    : [[cx - w / 2, cy - h / 2], [cx - nw / 2, cy - h / 2], [cx, cy - h / 2 + nd], [cx + nw / 2, cy - h / 2], [cx + w / 2, cy - h / 2], [cx + w / 2, cy + h / 2], [cx - w / 2, cy + h / 2]];
  poly(s, pts, o.fill || '7FB3E0', o.edge || '2F5F8F', { lw: 1.5 });
}
function substrate(s, cx, ytop, w, d, col = 'E08A1E', edge = '9A5A0A') { poly(s, [[cx - w / 2, ytop], [cx + w / 2, ytop], [cx, ytop + d]], col, edge, { lw: 1.25 }); }
function tubeT(s, x, y, w, h, fill, lab, res) {
  box(s, x, y, w, h, C.white, '555555', { lw: 1.25 });
  box(s, x + 0.04, y + h * 0.45, w - 0.08, h * 0.55 - 0.04, fill, fill);
  if (lab) label(s, x - 0.5, y + h + 0.04, w + 1.0, lab, { size: 10.5, bold: true });
  if (res) label(s, x - 0.55, y + h + 0.3, w + 1.1, res, { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
}
function particleBox(s, x, y, w, h, n, seed, side) {
  let r = seed; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  for (let i = 0; i < n; i++) { const fx = side === 'L' ? rnd() * 0.45 : side === 'R' ? 0.55 + rnd() * 0.45 : rnd(); ball(s, x + 0.1 + fx * (w - 0.2), y + 0.1 + rnd() * (h - 0.2), 0.07, 'E08A1E', '9A5A0A'); }
}
function waterMol(s, cx, cy) { ball(s, cx, cy, 0.06, '5B9BD5', '2F5F8F'); }
function soluteMol(s, cx, cy) { ball(s, cx, cy, 0.11, 'E08A1E', '9A5A0A'); }

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Key concepts in biology',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • four Core Practicals (1.6, 1.10, 1.13B, 1.16)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and BIOLOGY ONLY slides are marked' },
    { icon: '1', text: 'Topic 1 of 9 • assessed on both Paper 1 and Paper 2' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 1 Key concepts in biology. Examined on BOTH papers. Higher-only (HT pill): 1.14B calorimetry. Biology only (BIOLOGY ONLY pill, not in Combined Science 1SC0): 1.12B, 1.13B, 1.14B. Core Practicals: 1.6 microscopy, 1.10 pH and enzyme activity, 1.13B food tests, 1.16 osmosis in potatoes. Spec wording is from memory, medium confidence: see SPEC_T1.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '1.1–1.2', text: 'Explain how **sub-cellular structures** relate to their functions; describe **sperm, egg and ciliated** cells.' },
  { code: '1.3', text: 'Explain how **light and electron microscopes** changed our understanding of cells.' },
  { code: '1.4–1.5', text: 'Use **estimations**, the units **milli, micro, nano, pico** and **standard form**.' },
  { code: '1.6', text: '**Core Practical:** use a microscope; calculate **magnification**; make labelled drawings.' },
  { code: '1.7–1.9', text: 'Explain the **active site**, **specificity**, **denaturing** and the factors that affect enzymes.' },
  { code: '1.10–1.11', text: '**Core Practical:** pH and amylase; calculate the **rate** of an enzyme reaction.' },
  { code: '1.12B–1.14B', text: 'Explain enzymes in **synthesis and breakdown**; do **food tests**; use **calorimetry**.', ht: true },
  { code: '1.15–1.17', text: 'Explain **diffusion, osmosis, active transport**; **Core Practical** osmosis; **% change**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT pill = 1.14B calorimetry (Higher only). B suffix = biology only (not in Combined Science 1SC0): 1.12B, 1.13B, 1.14B.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 1 is assessed on both papers`, { tag: 'Context' });
  const nodes = [
    ['1.1–1.2', 'Cells and specialised cells', 'BOTH COURSES'],
    ['1.3–1.6', 'Microscopy, units, CP microscopy', 'BOTH COURSES'],
    ['1.7–1.11', 'Enzymes; CP pH; rate calculations', 'BOTH COURSES'],
    ['1.12B', 'Enzymes in synthesis and breakdown', 'BIOLOGY ONLY'],
    ['1.13B', 'CP food tests', 'BIOLOGY ONLY'],
    ['1.14B', 'Calorimetry (HT)', 'BIOLOGY ONLY'],
    ['1.15–1.17', 'Diffusion, osmosis, active transport; CP osmosis', 'BOTH COURSES'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 1\nKey concepts', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Later links: Topic 2 cell division • Topic 6 transport in plants • Topic 8 exchange surfaces and respiration', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 1 is tested on **both** 1BI0 papers (each 1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **magnification**, **standard form**, **rate = 1 ÷ time**, **% change**.',
      '**Four Core Practicals**: 1.6, 1.10, 1.13B, 1.16.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: enzymes in synthesis, food tests and calorimetry (1.12B–1.14B). Combined classes skip these.',
      '**HT** pill: Higher only – calorimetry (1.14B).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Biology-only statements (not in 1SC0): 1.12B, 1.13B, 1.14B. Higher-only: 1.14B (medium-high confidence: check the bold H in the Pearson spec PDF). Combined Science route: skip slides 24–27.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 • cells', q: 'Name **three** parts found in both animal and plant cells.' },
  { from: 'KS3 • cells', q: 'Which part of a plant cell carries out **photosynthesis**?' },
  { from: 'KS3 • maths', q: 'How many **millimetres** are in **1 cm**? How many in **1 m**?' },
  { from: 'KS3 • digestion', q: 'Name the **enzyme** that breaks down starch.' },
  { from: 'KS3 • particles', q: 'Describe how a smell **spreads** across a room.' },
  { from: 'KS3 • maths', q: 'Write **0.004** in standard form.' },
], { subtitle: 'Recall from KS3 science and maths • 6 minutes • no notes', notes: 'ANSWERS\n1. Any three: nucleus, cell membrane, cytoplasm, mitochondria, ribosomes.\n2. Chloroplasts.\n3. 10 mm; 1000 mm.\n4. Amylase (carbohydrase).\n5. Particles move randomly from where there are lots of them to where there are fewer (diffusion).\n6. 4 × 10⁻³.' }), 'Retrieval starter');

// ======================= 5 ANIMAL AND PLANT CELLS =======================
{
  const s = D.contentHeader('Animal and plant cells', 'Specification 1.1 • eukaryotic cells: the genetic material is inside a nucleus', { tag: '1.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'not to scale; organelles drawn larger than life');
  label(s, 0.6, 1.4, 2.8, '**Animal cell**', { size: 13, color: '8C4A42' });
  animalCell(s, 2.0, 3.0, 0.95);
  callout(s, 0.6, 4.35, 1.3, 'nucleus', 1.76, 3.0, NUC[1]);
  callout(s, 2.25, 4.65, 1.6, 'cell membrane', 2.6, 3.88, 'B5655B');
  callout(s, 2.9, 1.85, 1.3, 'mitochondrion', 2.66, 2.62, MITO[1]);
  callout(s, 0.6, 2.0, 1.1, 'ribosome', 1.29, 2.57, '333333');
    label(s, 3.8, 1.4, 2.6, '**Plant cell**', { size: 13, color: '35582A' });
  plantCell(s, 5.05, 3.4, 0.82);
  callout(s, 3.75, 2.05, 0.95, 'cell wall', 4.15, 2.2, '3E7A2E', { size: 10 });
  callout(s, 3.75, 5.3, 0.95, 'chloroplast', 4.31, 4.11, CHL[1], { size: 10 });
  callout(s, 5.6, 5.55, 0.85, 'vacuole', 5.1, 4.6, '5B87B5', { size: 10 });
  callout(s, 5.75, 1.75, 0.75, 'nucleus', 5.82, 2.6, NUC[1], { size: 10 });
  const rows = [[HDR('Structure'), HDR('Function'), HDR('Found in')], ...[
    ['Nucleus', 'contains genetic material (DNA); controls the cell', 'both'],
    ['Cell membrane', 'controls what enters and leaves', 'both'],
    ['Mitochondria', 'aerobic respiration: releases energy', 'both'],
    ['Ribosomes', 'make proteins (protein synthesis)', 'both'],
    ['Cell wall', 'cellulose; strengthens and supports', 'plant'],
    ['Chloroplasts', 'photosynthesis (contain chlorophyll)', 'plant'],
    ['Vacuole', 'permanent; cell sap keeps the cell firm', 'plant'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i, { color: c === 'plant' ? '2E7D4F' : C.text, bold: c === 'plant' })])];
  table(s, rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.55, 3.45, 1.08], rowH: 0.52 });
  D.card(s, 6.8, 5.6, 6.08, 0.65, null, ['**Plant cells** have everything an animal cell has, **plus** a cell wall, chloroplasts and a permanent vacuole.'], { size: 11 });
  D.quickCheck(s, 'Name the structure where **aerobic respiration** happens. Give **two** structures found in plant cells but **not** in animal cells.');
  D.notes(s, 'QUICK CHECK ANSWER: mitochondria (1); any two of cell wall, chloroplasts, (permanent) vacuole (1 each).\nSpec 1.1a and 1.1b list exactly these structures. Cytoplasm is not listed in 1.1 but students should know it is where most reactions happen. Mitochondria RELEASE energy (do not say "make energy").');
  reg(s, '1.1 Animal and plant cells');
}

// ======================= 6 BACTERIA =======================
reg(D.contentSlide({
  title: 'Prokaryotic cells: bacteria',
  subtitle: 'Specification 1.1 • no nucleus; DNA free in the cytoplasm',
  tag: '1.1', caption: 'a bacterium is about 1–5 µm long; not to scale',
  draw: (s, p) => {
    bacterium(s, 3.0, 3.4, 1.3);
    callout(s, 0.6, 2.0, 1.7, 'chromosomal DNA (a loop)', 2.45, 3.12, '7A4E9C', { h: 0.45, size: 10.5 });
    callout(s, 4.4, 2.0, 1.4, 'plasmid DNA', 3.94, 3.14, C.red, { size: 10.5 });
    callout(s, 0.6, 4.75, 1.6, 'cell membrane', 1.6, 3.95, '7FA9C9', { size: 10.5 });
    callout(s, 0.6, 2.75, 1.0, 'cell wall', 1.45, 3.0, '2A6F8E', { size: 10.5 });
    callout(s, 2.7, 4.95, 1.2, 'ribosome', 2.48, 3.89, '333333', { size: 10.5 });
    callout(s, 4.9, 4.4, 1.2, 'flagellum', 5.25, 3.45, C.ink, { size: 10.5 });
  },
  head: 'Structures and their functions',
  lines: [
    '**Chromosomal DNA**: one large loop, free in the cytoplasm; controls the cell.',
    '**Plasmid DNA**: small extra rings; often carry genes such as **antibiotic resistance**.',
    '**Cell membrane**: controls what enters and leaves. (A cell **wall** surrounds it.)',
    '**Ribosomes**: make proteins (smaller than in eukaryotic cells).',
    '**Flagellum**: a tail that rotates so the bacterium can **move**.',
  ],
  worked: { head: 'Compare: eukaryotic vs prokaryotic', q: '',
    steps: [['DNA', 'in a nucleus / free loop + plasmids'], ['Size', 'about 10–100 µm / about 1–5 µm'], ['Organelles', 'mitochondria, (chloroplasts) / none'], ['Answer', 'bacteria are prokaryotic: smaller, no nucleus']] },
  qc: 'Give **two** differences between a bacterial cell and an animal cell.',
  notes: 'QUICK CHECK ANSWER: any two: bacteria have no nucleus / DNA free in cytoplasm (1); have plasmids (1); have a cell wall (1); no mitochondria (1); much smaller (1).\nSpec 1.1c lists chromosomal DNA, plasmid DNA, cell membrane, ribosomes and flagella. Not all bacteria have flagella.',
}), '1.1 Bacteria (prokaryotic)');

// ======================= 7 SPERM AND EGG =======================
reg(D.contentSlide({
  title: 'Specialised cells: sperm and egg',
  subtitle: 'Specification 1.2 • gametes are adapted for fertilisation',
  tag: '1.2', caption: 'not to scale: the egg is about 20 times longer than the sperm head',
  draw: (s, p) => {
    label(s, 0.6, 1.4, 3, '**Sperm cell**', { size: 13, align: 'left', color: '2F5F8F' });
    spermCell(s, 1.7, 2.35, 1.25);
    callout(s, 0.55, 3.15, 1.25, 'acrosome', 1.36, 2.4, 'B5782E', { size: 10.5 });
    callout(s, 1.75, 3.35, 1.55, 'haploid nucleus', 1.8, 2.4, NUC[1], { size: 10.5 });
    callout(s, 3.05, 1.6, 1.7, 'many mitochondria', 2.6, 2.33, MITO[1], { size: 10.5 });
    callout(s, 4.6, 3.1, 0.8, 'tail', 4.3, 2.4, '2F5F8F', { size: 10.5 });
    label(s, 0.6, 3.75, 3, '**Egg cell**', { size: 13, align: 'left', color: 'A4561C' });
    eggCell(s, 2.5, 4.85, 0.75);
    callout(s, 3.75, 4.15, 1.6, 'haploid nucleus', 2.7, 4.7, NUC[1], { size: 10.5 });
    callout(s, 3.75, 4.7, 2.0, 'nutrients in cytoplasm', 2.9, 5.0, 'B5782E', { size: 10.5 });
    callout(s, 3.75, 5.3, 2.0, 'membrane (changes)', 3.2, 5.3, 'A4561C', { size: 10.5 });
  },
  head: 'Adaptations',
  lines: [
    '**Sperm:** **acrosome** has enzymes to digest the egg’s outer layer; **haploid nucleus** (23 chromosomes); **many mitochondria** release energy for the **tail** to swim.',
    '**Egg:** **nutrients** in the cytoplasm feed the embryo; **haploid nucleus**; after fertilisation the **cell membrane changes** so no other sperm can enter.',
    'Haploid gametes mean the fertilised egg has the **full 46** chromosomes.',
  ],
  worked: { head: 'Exam technique: describe an adaptation', q: 'Describe how a sperm cell is adapted to reach the egg.',
    steps: [['Feature', 'many mitochondria in the middle section'], ['Function', 'release energy by respiration'], ['Link', 'energy for the tail to move'], ['Answer', 'so the sperm can swim to the egg']] },
  qc: 'Why does the egg cell membrane **change** after fertilisation? What is the job of the **acrosome**?',
  notes: 'QUICK CHECK ANSWER: so that no other sperm can enter / only one sperm fertilises the egg (1). The acrosome contains enzymes that digest (break down) the outer layer of the egg so the sperm can get in (1).\nSpec 1.2a–b list exactly these features.',
}), '1.2 Sperm and egg cells');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 1.1–1.2 • cells and specialised cells', [
  { q: 'Describe the function of **ribosomes** and of the **cell membrane**.', marks: 2, ms: 'Ribosomes: make proteins / protein synthesis (1); membrane: controls what enters and leaves the cell (1).' },
  { q: 'Give **two** structures found in a bacterium that are not found in an animal cell.', marks: 2, ms: 'Any two: plasmid (DNA); cell wall; flagellum; chromosomal DNA as a loop / no nucleus (1 each).' },
  { q: 'Explain why a sperm cell has many mitochondria.', marks: 2, ms: 'Mitochondria release energy by (aerobic) respiration (1); energy needed for the tail to move / swim to the egg (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 CILIATED CELLS =======================
reg(D.contentSlide({
  title: 'Specialised cells: ciliated epithelial cells',
  subtitle: 'Specification 1.2 • lining the airways (trachea and bronchi)',
  tag: '1.2', caption: 'cells lining the trachea; cilia beat to move mucus',
  draw: (s, p) => {
    box(s, 0.7, 1.55, 5.6, 0.75, 'FFF3B0', 'C9A227', { lw: 1 });
    label(s, 0.8, 1.55, 3.2, '**mucus** with trapped dust and bacteria', { size: 10.5, align: 'left', h: 0.4, color: '8A6A0A' });
    [1.4, 2.6, 3.9, 5.1].forEach(x => ball(s, x, 2.05, 0.06, '555555'));
    arrow(s, 3.5, 1.95, 5.9, 1.95, '8A6A0A', 2.5);
    label(s, 4.3, 2.05, 2.0, 'moved up to the throat', { size: 10, italic: true, color: '8A6A0A' });
    ciliated(s, 0.9, 2.75, 5, 1.04, 1.9);
    callout(s, 0.6, 5.2, 0.8, 'cilia', 1.0, 2.55, '8E2A33', { size: 10.5 });
    callout(s, 2.2, 5.2, 0.9, 'nucleus', 2.46, 4.0, NUC[1], { size: 10.5 });
    callout(s, 3.6, 5.2, 1.8, 'mitochondria', 3.54, 3.22, MITO[1], { size: 10.5 });
    box(s, 0.9, 4.65, 5.2, 0.12, 'D7C3A8', 'A88B63');
  },
  head: 'How they are adapted',
  lines: [
    'The cell surface is covered in tiny hair-like **cilia**.',
    'Cilia **beat** in waves to move **mucus** (with trapped dust and microbes) up and out of the airways.',
    'Many **mitochondria** release the energy needed for the cilia to beat.',
    'Nearby **goblet cells** make the mucus.',
  ],
  worked: { head: 'Link to health', q: 'Smoking damages cilia. Explain why smokers get more chest infections.',
    steps: [['Damage', 'cilia stop beating / are destroyed'], ['Effect', 'mucus is not moved out of the airways'], ['Link', 'microbes stay in the lungs'], ['Answer', 'more chance of infection (and a cough)']] },
  qc: 'Describe the role of the **cilia** on these cells. Why do they need many mitochondria?',
  notes: 'QUICK CHECK ANSWER: cilia beat / sweep (1) to move mucus containing dust and bacteria up out of the airways (1). Mitochondria release energy (by respiration) for the cilia to move (1).\nSpec 1.2c: ciliated epithelial cells. Links to Topic 5 (non-specific defences).',
}), '1.2 Ciliated epithelial cells');

// ======================= 10 MICROSCOPES =======================
{
  const s = D.contentHeader('Light and electron microscopes', 'Specification 1.3 • better technology shows more detail', { tag: '1.3' });
  D.panel(s, 0.45, 1.3, 4.2, 4.95, 'a light microscope');
  microscope(s, 1.35, 1.6, 1.25);
  callout(s, 3.75, 1.85, 0.85, 'eyepiece', 2.16, 1.75, C.ink, { size: 10 });
  callout(s, 3.75, 4.05, 0.85, 'objective', 2.25, 4.15, C.ink, { size: 10 });
  callout(s, 3.75, 4.45, 0.85, 'stage', 2.6, 4.45, C.ink, { size: 10 });
  callout(s, 0.55, 3.75, 0.8, 'focus', 3.33, 3.79, C.ink, { size: 10 });
  callout(s, 0.55, 5.1, 0.8, 'lamp', 1.97, 5.1, 'B5782E', { size: 10 });
  const rows = [[HDR(''), HDR('Light microscope'), HDR('Electron microscope')], ...[
    ['Uses', 'light', 'a beam of electrons'],
    ['Max magnification', 'about × 1500 (up to × 2000)', 'up to about × 2 000 000'],
    ['Resolution', 'about 200 nm', 'about 0.1–0.2 nm'],
    ['Shows', 'cells, nuclei, chloroplasts', 'ribosomes, inside mitochondria and chloroplasts'],
    ['Specimens', 'living or dead; cheap', 'dead (vacuum); large and expensive'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
  table(s, rows, { x: 4.9, y: 1.3, w: 7.98, colW: [1.9, 2.8, 3.28], rowH: 0.55 });
  D.card(s, 4.9, 4.75, 7.98, 1.5, 'Why it matters', [
    '**Resolution** is the smallest distance between two points that can still be seen as separate. Higher resolution = more **detail**.',
    'Electron microscopes revealed **sub-cellular structures** (e.g. ribosomes, the inner membrane of mitochondria), so we learned **what organelles do**.',
  ], { size: 11 });
  D.quickCheck(s, 'Give **one** advantage and **one** disadvantage of an electron microscope compared with a light microscope.');
  D.notes(s, 'QUICK CHECK ANSWER: advantage: higher magnification / higher resolution / shows more detail, e.g. ribosomes (1). Disadvantage: expensive / large / specimens must be dead / cannot see colour / needs training (1).\nSpec 1.3. Values are typical, not exact limits.');
  reg(s, '1.3 Light and electron microscopes');
}

// ======================= 11 UNITS & STANDARD FORM =======================
reg(D.contentSlide({
  title: 'Units and standard form',
  subtitle: 'Specification 1.5 • milli, micro, nano and pico',
  tag: '1.5', caption: 'each step down the ladder is 1000 times smaller',
  draw: (s, p) => {
    const rows = [['metre', 'm', '1', '—'], ['millimetre', 'mm', '10⁻³ m', 'a small seed'], ['micrometre', 'µm', '10⁻⁶ m', 'a cell (10–100 µm)'], ['nanometre', 'nm', '10⁻⁹ m', 'a ribosome (≈ 25 nm)'], ['picometre', 'pm', '10⁻¹² m', 'an atom (≈ 100 pm)']];
    rows.forEach(([n, u, v, e], i) => {
      const y = 1.5 + i * 0.86;
      box(s, 0.75, y, 5.5, 0.66, i % 2 ? C.white : 'E3F2E8', C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      label(s, 0.85, y, 1.6, `**${n}**`, { size: 11.5, align: 'left', h: 0.66 });
      label(s, 2.4, y, 0.6, `**${u}**`, { size: 13, color: C.blue, h: 0.66 });
      label(s, 3.0, y, 1.1, v, { size: 12, h: 0.66 });
      label(s, 4.1, y, 2.1, e, { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.66 });
      if (i < rows.length - 1) { arrow(s, 0.55, y + 0.5, 0.55, y + 1.0, C.red, 1.5); label(s, 0.1, y + 0.6, 0.45, '÷1000', { size: 8, color: C.red, h: 0.2 }); }
    });
  },
  head: 'Converting',
  lines: [
    '**Bigger → smaller unit: × 1000.** 1 mm = 1000 µm; 1 µm = 1000 nm.',
    '**Smaller → bigger unit: ÷ 1000.** 8 µm = 0.008 mm.',
    'Standard form: **25 µm = 25 × 10⁻⁶ m = 2.5 × 10⁻⁵ m**.',
    'Compare sizes by dividing: a 100 µm plant cell is **50 times** longer than a 2 µm bacterium.',
  ],
  worked: { head: 'Worked example', q: 'A nucleus is 6 µm across. Write this in nm and in metres (standard form).',
    steps: [['Step', '6 µm × 1000 = 6000 nm'], ['Step', '6 µm = 6 × 10⁻⁶ m'], ['Check', '10⁻⁶ is "micro"'], ['Answer', '6000 nm; 6 × 10⁻⁶ m']] },
  qc: 'Convert **3.5 mm** into µm. Write **0.2 nm** in metres in standard form.',
  notes: 'QUICK CHECK ANSWER: 3.5 × 1000 = 3500 µm (1). 0.2 nm = 0.2 × 10⁻⁹ m = 2 × 10⁻¹⁰ m (1).\nSpec 1.5a–e. All conversions checked in the build script.',
}), '1.5 Units and standard form');

// ======================= 12 ESTIMATION =======================
reg(D.contentSlide({
  title: 'Number, size and scale: estimating',
  subtitle: 'Specification 1.4 • when an exact count is not possible',
  tag: '1.4', caption: 'a field of view 0.4 mm across with about 12 cells in a row',
  draw: (s, p) => {
    ball(s, 3.5, 3.55, 2.05, C.white, '333333', 2);
    for (let i = 0; i < 12; i++) { const x = 1.7 + i * 0.3; box(s, x, 3.3, 0.3, 0.5, 'E3F1DA', '3E7A2E', { lw: 1 }); ball(s, x + 0.15, 3.55, 0.06, NUC[0], NUC[1], 0.5); }
    for (let r = -1; r <= 1; r += 2) for (let i = 0; i < 10; i++) { const x = 2.0 + i * 0.3; box(s, x, 3.3 + r * 0.55, 0.3, 0.5, 'EEF7E8', '6A9E58', { lw: 0.75 }); }
    line(s, 1.45, 5.72, 5.55, 5.72, C.red, 1.5, { head: true, tail: true });
    label(s, 4.6, 5.25, 1.9, '**0.4 mm** (field of view)', { size: 11, color: C.red });
  },
  head: 'Estimates',
  lines: [
    'An **estimate** is a sensible approximate value. Use it when exact counting is **too slow** or **impossible**, or to **check** a calculated answer.',
    'Count cells across the field of view, then **divide**: 0.4 mm ÷ 12 ≈ 0.033 mm ≈ **33 µm** per cell.',
    'Count a **small sample area**, then **scale up**: 30 cells in 0.1 mm × 0.1 mm → about **3000 cells per mm²**.',
  ],
  worked: { head: 'Is the answer sensible?', q: 'A student calculates a plant cell is 3 mm long. Is this likely?',
    steps: [['Know', 'plant cells are about 10–100 µm'], ['Convert', '3 mm = 3000 µm'], ['Compare', 'about 30–300 times too big'], ['Answer', 'no: check the units / magnification']] },
  qc: 'About **20** cheek cells fit across a field of view **1.2 mm** wide. Estimate the width of one cell in µm.',
  notes: 'QUICK CHECK ANSWER: 1.2 ÷ 20 = 0.06 mm (1) = 60 µm (1).\nSpec 1.4: number, size and scale, estimations and when to use them. Estimates checked in the build script (0.4/12 → 33 µm; 30 × 100 = 3000).',
}), '1.4 Estimating size and number');
calc('QC estimate 1.2/20 mm → µm', 1.2 / 20 * 1000, 60, 1e-9);

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 1.2–1.5 • ciliated cells, microscopes and units', [
  { q: 'Explain how electron microscopes have increased our understanding of cells.', marks: 2, ms: 'Higher magnification / resolution (1); can see sub-cellular structures (e.g. ribosomes, mitochondria detail) so their functions could be worked out (1).' },
  { q: 'Convert **40 µm** to mm and write **25 nm** in metres in standard form.', marks: 2, ms: '0.04 mm (1); 2.5 × 10⁻⁸ m (1).' },
  { q: 'An image of a cell is 40 mm long. The real cell is 0.02 mm long. Calculate the magnification.', marks: 2, ms: '40 ÷ 0.02 (1); × 2000 (1).' },
]);
calc('R2 40 µm in mm', 40 / 1000, 0.04, 1e-12); calc('R2 25 nm in m', 25e-9, 2.5e-8, 1e-18);
reg(R2.s, 'Recap 2');

// ======================= 14 CP MICROSCOPY =======================
reg(D.contentSlide({
  title: 'Core Practical: using a microscope',
  subtitle: 'Specification 1.6 • investigate biological specimens; magnification; scientific drawings',
  tag: '1.6', cp: true, caption: 'onion epidermis cells stained with iodine',
  draw: (s, p) => {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      const x = 0.85 + c * 1.05 + (r % 2) * 0.3, y = 1.55 + r * 0.95;
      if (x + 1.0 > 6.3) continue;
      box(s, x, y, 1.0, 0.9, 'F6EBC8', 'A07A2A', { lw: 1.5 });
      ball(s, x + 0.65, y + 0.4, 0.11, 'C88E3A', '7A5418', 0.75);
    }
    callout(s, 0.6, 5.55, 1.2, 'cell wall', 0.85, 4.4, 'A07A2A', { size: 10.5 });
    callout(s, 2.5, 5.55, 1.5, 'nucleus (stained)', 1.85, 4.2, '7A5418', { size: 10.5 });
  },
  head: 'Method',
  lines: [
    'Peel a thin layer of onion epidermis; place on a slide with a drop of **iodine** stain; lower a **cover slip** at an angle (no air bubbles).',
    'Start with the **lowest-power objective**; focus with the **coarse** then **fine** focus.',
    'Change to a higher power and refocus with the **fine** focus only.',
    'Measure, then draw a few cells: **pencil**, **clear single lines**, no shading, **labels with ruled lines**, a title and the magnification.',
  ],
  worked: { head: 'Total magnification', q: 'Eyepiece × 10, objective × 40.',
    steps: [['Rule', 'total = eyepiece × objective'], ['Substitute', '10 × 40'], ['Answer', '× 400']] , size: 11 },
  workedH: 1.6,
  qc: 'Why is the specimen **stained**? Why must the layer of onion be **thin**?',
  notes: 'QUICK CHECK ANSWER: stain makes structures (e.g. the nucleus) visible / adds contrast (1). Thin so light can pass through / cells are not overlapping (1).\nCP 1.6. Safety: iodine can stain skin; take care with glass slides. Cheek cells can be used with methylene blue.',
}), '1.6 CP: microscopy');

// ======================= 15 MAGNIFICATION =======================
reg(D.contentSlide({
  title: 'Magnification calculations',
  subtitle: 'Specification 1.6 • magnification = image size ÷ real size',
  tag: '1.6', cp: true, caption: 'cover the quantity you want',
  draw: (s, p) => {
    const tx = 1.6, ty = 1.65, tw = 3.8, th = 3.3;
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: tx, y: ty, w: tw, h: th, fill: { color: 'E3F2E8' }, line: { color: C.blue, width: 2.5 } });
    line(s, tx + tw * 0.2, ty + th * 0.58, tx + tw * 0.8, ty + th * 0.58, C.blue, 2.5);
    line(s, tx + tw / 2, ty + th * 0.58, tx + tw / 2, ty + th, C.blue, 2.5);
    label(s, tx + tw / 2 - 1.0, ty + th * 0.3, 2.0, '**image size**', { size: 14 });
    label(s, tx + tw * 0.12, ty + th * 0.72, 1.6, '**magnification**', { size: 12 });
    label(s, tx + tw * 0.52, ty + th * 0.72, 1.6, '**real size**', { size: 13 });
    label(s, 0.7, 5.25, 5.6, 'Use the **same units** for image and real size. Magnification has **no units**.', { size: 11, h: 0.45 });
  },
  head: 'Rearranging',
  lines: [
    'magnification = image ÷ real',
    'image size = magnification × real size',
    'real size = image size ÷ magnification',
  ],
  worked: { head: 'Worked example', q: 'A cell is 36 mm long in a drawing. Its real length is 0.012 mm. Find the magnification and the real length in µm.',
    steps: [['Equation', 'magnification = image ÷ real'], ['Substitute', '36 ÷ 0.012'], ['Units', '0.012 mm × 1000 = 12 µm'], ['Answer', '× 3000; real length 12 µm']] },
  workedH: 2.55,
  qc: 'An image is **24 mm** long at **× 400**. Calculate the real size in µm.',
  notes: 'QUICK CHECK ANSWER: real = 24 ÷ 400 = 0.06 mm (1) = 60 µm (1).\nAll values checked in the build script.',
}), '1.6 Magnification');

// ======================= 16 MY TURN magnification =======================
{
  const s = D.contentHeader('Practice: magnification', 'Specification 1.6 • my turn, then your turn', { tag: '1.6', cp: true });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A cell is 0.015 mm across and its image is 30 mm. A second image is 24 mm at × 400.',
    [['Mag', '30 ÷ 0.015 = **× 2000**'], ['Real', '24 ÷ 400 = 0.06 mm'], ['Convert', '0.06 mm × 1000'], ['Answer', '× 2000; 60 µm']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** An image is **45 mm** long. The real object is **0.009 mm**. Calculate the magnification.',
    '**2** An image is **18 mm** long at **× 1500**. Calculate the real size in µm.',
    '**3** A cell is **25 µm** across. How long is its image at **× 800**, in mm?',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Which **two** quantities must be in the **same units** before you divide?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 45 ÷ 0.009 = × 5000. 2) 18 ÷ 1500 = 0.012 mm = 12 µm. 3) 25 µm = 0.025 mm; × 800 = 20 mm.\nQUICK CHECK: image size and real size.');
  reg(s, '1.6 Practice: magnification');
}
calc('YT3 0.025 × 800', 0.025 * 800, 20, 1e-9);

// ======================= 17 ENZYME ACTION =======================
reg(D.contentSlide({
  title: 'How enzymes work',
  subtitle: 'Specification 1.7 • the active site and specificity',
  tag: '1.7', caption: 'the lock-and-key model',
  draw: (s, p) => {
    const y = 2.6;
    enzyme(s, 1.35, y + 0.6, 1.3, 0.9);
    substrate(s, 1.35, y - 0.45, 0.45, 0.34);
    arrow(s, 1.35, y - 0.05, 1.35, y + 0.12, C.ink, 1.5);
    label(s, 0.5, y + 1.15, 1.7, 'enzyme + substrate', { size: 10.5, bold: true });
    arrow(s, 2.15, y + 0.6, 2.7, y + 0.6, C.ink, 2);
    enzyme(s, 3.45, y + 0.6, 1.3, 0.9);
    substrate(s, 3.45, y + 0.15, 0.44, 0.33);
    label(s, 2.6, y + 1.15, 1.7, 'enzyme–substrate complex', { size: 10.5, bold: true, h: 0.45, valign: 'top' });
    arrow(s, 4.25, y + 0.6, 4.8, y + 0.6, C.ink, 2);
    enzyme(s, 5.5, y + 0.6, 1.3, 0.9);
    poly(s, [[5.25, y - 0.45], [5.47, y - 0.45], [5.4, y - 0.15]], 'E08A1E', '9A5A0A'); poly(s, [[5.53, y - 0.45], [5.75, y - 0.45], [5.6, y - 0.15]], 'E08A1E', '9A5A0A');
    label(s, 4.75, y + 1.15, 1.6, 'products leave', { size: 10.5, bold: true });
    callout(s, 0.6, 4.75, 1.4, 'active site', 1.35, y + 0.35, C.blue, { size: 11 });
    substrate(s, 3.5, 4.55, 0.55, 0.3, '8E44AD', '5E2D73');
    label(s, 2.45, 5.0, 3.0, 'wrong shape: does **not** fit, no reaction', { size: 10.5, color: '5E2D73' });
  },
  head: 'Key ideas',
  lines: [
    'Enzymes are **biological catalysts**: proteins that **speed up** reactions without being used up.',
    'The **substrate** fits into the **active site**, forming an **enzyme–substrate complex**; the reaction happens and the products are released.',
    '**Specificity**: each enzyme’s active site has a **shape** that fits only **one** substrate (like a lock and key).',
  ],
  worked: { head: 'Exam technique: explain specificity', q: 'Explain why amylase breaks down starch but not protein.',
    steps: [['Shape', 'active site has a specific shape'], ['Fit', 'starch is complementary; protein is not'], ['Complex', 'only starch forms an enzyme–substrate complex'], ['Answer', 'so only starch is broken down']] },
  qc: 'What is the **active site**? Why can each enzyme only catalyse **one** reaction?',
  notes: 'QUICK CHECK ANSWER: the part of the enzyme where the substrate binds (1). The active site has a specific shape that only one substrate fits / is complementary to (1).\nSpec 1.7. The induced-fit model is not required at GCSE.',
}), '1.7 Enzyme action');

// ======================= 18 DENATURING =======================
reg(D.contentSlide({
  title: 'Denaturing',
  subtitle: 'Specification 1.8 • changing the shape of the active site',
  tag: '1.8', caption: 'a denatured enzyme: the active site has changed shape',
  draw: (s, p) => {
    enzyme(s, 1.9, 3.4, 1.8, 1.25);
    substrate(s, 1.9, 2.82, 0.62, 0.46);
    label(s, 0.9, 4.2, 2.0, '**normal**: substrate fits', { size: 11 });
    arrow(s, 3.0, 3.4, 3.9, 3.4, C.red, 2.5);
    label(s, 2.8, 2.85, 1.3, 'high temperature or wrong pH', { size: 10, color: C.red, h: 0.5 });
    enzyme(s, 5.1, 3.4, 1.8, 1.25, { denatured: true, fill: 'C9C9C9', edge: '6B6B6B' });
    substrate(s, 5.1, 2.25, 0.62, 0.46);
    label(s, 4.1, 4.2, 2.0, '**denatured**: no fit', { size: 11, color: C.red });
    D.card(s, 0.75, 4.75, 5.5, 1.05, null, ['The change is **permanent**: cooling does not restore the shape.'], { size: 11.5, fill: C.white });
  },
  head: 'What happens',
  lines: [
    'High temperatures or extremes of **pH** break the bonds that hold the enzyme’s **shape**.',
    'The **active site changes shape**, so the substrate **no longer fits**.',
    'No enzyme–substrate complexes form, so the reaction **stops**. The enzyme is **denatured**.',
  ],
  worked: { head: 'Common mistake', q: '"The enzyme is killed by heat." Correct this.',
    steps: [['Error', 'enzymes are not alive'], ['Correct', 'the enzyme is denatured'], ['Detail', 'the active site changes shape'], ['Answer', 'substrate no longer fits the active site']] },
  qc: 'Explain why an enzyme stops working at **70 °C**.',
  notes: 'QUICK CHECK ANSWER: the enzyme is denatured (1); the active site changes shape (1); the substrate no longer fits / no enzyme–substrate complexes (1).\nSpec 1.8.',
}), '1.8 Denaturing');

// ======================= 19 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 1.6–1.8 • microscopy and enzymes', [
  { q: 'Describe how to focus on a specimen with a light microscope.', marks: 3, ms: 'Start with the lowest power objective (1); use the coarse focus (to bring into view) (1); then the fine focus (and higher power with fine focus only) (1).' },
  { q: 'An image of a cell is 6 mm long at × 1500. Calculate the real length in µm.', marks: 2, ms: '6 ÷ 1500 = 0.004 mm (1); = 4 µm (1).' },
  { q: 'Explain what happens to an enzyme at a very low pH.', marks: 2, ms: 'Active site changes shape / enzyme denatured (1); substrate no longer fits so reaction stops / slows (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 20 TEMPERATURE & pH =======================
reg(D.contentSlide({
  title: 'Factors affecting enzymes: temperature and pH',
  subtitle: 'Specification 1.9 • each enzyme has an optimum',
  tag: '1.9', caption: 'typical human enzyme (left) and pH curve (right)',
  draw: (s, p) => {
    const g1 = { x: 1.15, y: 1.6, w: 2.1, h: 3.0, xmin: 0, xmax: 60, xstep: 20, ymin: 0, ymax: 100, ystep: 50, xlabel: 'Temperature (°C)', ylabel: 'Rate (%)' };
    axes(s, g1); fnLine(s, g1, ENZ, 0, 60, 60, C.red, 2.5);
    label(s, 1.15, 1.3, 2.1, 'optimum ≈ 37 °C', { size: 9.5, bold: true, color: C.red });
    const g2 = { x: 4.15, y: 1.6, w: 2.1, h: 3.0, xmin: 3, xmax: 11, xstep: 2, ymin: 0, ymax: 100, ystep: 50, xlabel: 'pH', ylabel: 'Rate (%)' };
    axes(s, g2); fnLine(s, g2, PHC, 3, 11, 60, C.blue, 2.5);
    label(s, 4.15, 1.3, 2.1, 'optimum ≈ pH 7', { size: 9.5, bold: true, color: C.blue });
    label(s, 0.7, 5.25, 5.6, 'Pepsin (stomach) has an optimum of about **pH 2**.', { size: 10.5, h: 0.4 });
  },
  head: 'Explaining the curves',
  lines: [
    '**Temperature rises:** particles move faster, so **more collisions** between enzyme and substrate → faster rate, up to the **optimum**.',
    '**Above the optimum:** the active site **changes shape**; the enzyme **denatures**, so the rate falls quickly.',
    '**pH:** each enzyme works best at its **optimum pH**; too acidic or alkaline changes the active site shape.',
  ],
  worked: { head: 'Reading a graph', q: 'Describe the temperature curve.',
    steps: [['Trend 1', 'rate increases up to 37 °C'], ['Peak', 'maximum rate at the optimum, 37 °C'], ['Trend 2', 'rate falls steeply after 37 °C'], ['Answer', 'almost zero by about 55 °C (denatured)']] },
  qc: 'Explain why increasing the temperature from **20 °C to 30 °C** increases the rate.',
  notes: 'QUICK CHECK ANSWER: (more kinetic energy) molecules move faster (1); more (successful) collisions between enzyme and substrate / more enzyme–substrate complexes per second (1).\nSpec 1.9. Curves are model data (asserted peaks at 37 °C and pH 7).',
}), '1.9 Temperature and pH');

// ======================= 21 SUBSTRATE CONC =======================
reg(D.contentSlide({
  title: 'Factors affecting enzymes: substrate concentration',
  subtitle: 'Specification 1.9 • the rate levels off when active sites are full',
  tag: '1.9', caption: 'model data',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.1, xmin: 0, xmax: 10, xstep: 2, ymin: 0, ymax: 10, ystep: 2, xlabel: 'Substrate concentration', ylabel: 'Rate of reaction' };
    axes(s, g); fnLine(s, g, SUB, 0, 10, 60, C.blue, 2.5);
    label(s, px(g, 0.4), py(g, 2.6), 1.6, '**A**: rate rises', { size: 10.5, align: 'left', color: C.blue });
    label(s, px(g, 6), py(g, 8.6), 2.0, '**B**: levels off', { size: 10.5, align: 'left', color: C.blue });
  },
  head: 'Explanation',
  lines: [
    '**A:** more substrate molecules → **more collisions** with active sites → more enzyme–substrate complexes per second, so the rate **increases**.',
    '**B:** all active sites are **occupied** (saturated). Adding more substrate cannot increase the rate: **enzyme concentration** is now the limiting factor.',
  ],
  worked: { head: 'Predict', q: 'Predict how adding more enzyme changes the graph at B.',
    steps: [['Idea', 'more active sites available'], ['Effect', 'more complexes per second'], ['Graph', 'levels off at a higher rate'], ['Answer', 'the plateau rises']] },
  qc: 'Why does the rate stop increasing at **high** substrate concentrations?',
  notes: 'QUICK CHECK ANSWER: all the active sites are occupied / enzyme is saturated (1); so the enzyme (concentration) limits the rate (1).\nSpec 1.9.',
}), '1.9 Substrate concentration');

// ======================= 22 CP pH =======================
{
  const s = D.contentHeader('Core Practical: the effect of pH on amylase', 'Specification 1.10 • time how long it takes for starch to disappear', { tag: '1.10', cp: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'a spotting tile with iodine; blue-black = starch still present');
  box(s, 0.75, 1.6, 5.5, 2.0, C.white, '999999', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
  for (let i = 0; i < 12; i++) {
    const cx = 1.25 + (i % 6) * 0.9, cy = 2.1 + Math.floor(i / 6) * 0.95;
    ball(s, cx, cy, 0.3, i < 7 ? '1C2541' : 'E0A040', '555555', 1);
    label(s, cx - 0.35, cy + 0.3, 0.7, `${(i + 1) * 10} s`, { size: 8.5, h: 0.18 });
  }
  label(s, 0.8, 3.65, 5.4, 'starch gone at **80 s** (iodine stays orange-brown)', { size: 10.5, color: '8A560A' });
  const rows = [[HDR('pH'), HDR('Time (s)'), HDR('Rate = 1000 ÷ time')], ...PH.map(([p, t], i) => [tcell(String(p), i, { bold: true }), tcell(String(t), i), tcell(String(+(1000 / t).toFixed(1)), i, { bold: p === 6, color: p === 6 ? C.red : C.text })])];
  table(s, rows, { x: 0.75, y: 4.05, w: 5.5, colW: [1.2, 1.6, 2.7], rowH: 0.27, fontSize: 9.5 });
  D.card(s, 6.8, 1.3, 6.08, 3.3, 'Method', [
    'Put a drop of **iodine** in each well of a spotting tile.',
    'Mix **amylase**, a **pH buffer** and **starch** solution in a test tube in a **water bath at 35 °C**; start the timer.',
    'Every **10 s**, add a drop of the mixture to the iodine. Record when it stays **orange-brown** (no starch).',
    'Repeat at different **pH** values. Control: temperature, volumes, concentrations.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.75, 6.08, 1.5, 'Results', '', [['Pattern', 'fastest at pH 6 (25); slower either side'], ['Answer', 'optimum pH for this amylase ≈ 6']], { size: 11 });
  D.quickCheck(s, 'Why is the test tube kept in a **water bath**? Why is a **buffer** used?', 6.38);
  D.notes(s, 'QUICK CHECK ANSWER: to keep the temperature constant (a control variable) (1); the buffer keeps the pH constant at the chosen value (1).\nCP 1.10. Data are illustrative and checked: rate = 1000 ÷ time gives 5, 11.1, 25, 20, 8, 4. Safety: iodine irritant; eye protection.');
  reg(s, '1.10 CP: pH and amylase');
}

// ======================= 23 RATE CALCS =======================
{
  const s = D.contentHeader('Rate of an enzyme reaction', 'Specification 1.11 • rate calculations', { tag: '1.11' });
  D.card(s, 0.45, 1.3, 6.1, 2.2, 'Two ways to calculate rate', [
    '**rate = amount of product made (or substrate used) ÷ time** e.g. 30 cm³ of gas in 20 s = **1.5 cm³/s**.',
    '**rate = 1 ÷ time** when you only know the time taken: 50 s → **0.02 s⁻¹** (or **1000 ÷ time** = 20 to give easier numbers).',
  ], { size: 12 });
  D.workedSteps(s, 0.45, 3.65, 6.1, 2.6, 'My turn', '', [['Q1', 'starch gone in 80 s: rate = 1 ÷ 80 = **0.0125 s⁻¹**'], ['Q2', '24 cm³ of oxygen in 60 s: 24 ÷ 60 = **0.4 cm³/s**'], ['Units', 's⁻¹ means "per second"'], ['Answer', '0.0125 s⁻¹; 0.4 cm³/s']], { size: 12 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Starch disappears after **25 s**. Calculate the rate using 1 ÷ time.',
    '**2** Catalase makes **45 cm³** of oxygen in **30 s**. Calculate the mean rate.',
    '**3** At pH 8 the time is **125 s**. Calculate 1000 ÷ time.',
    '**4** Explain why a shorter time means a **faster** rate.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'What are the units of a rate calculated as **cm³ of gas ÷ time in seconds**?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 0.04 s⁻¹. 2) 1.5 cm³/s. 3) 8. 4) rate is inversely proportional to time: the reaction is completed in less time.\nQUICK CHECK: cm³/s (cm³ s⁻¹).\nSpec 1.11. All checked in the build script.');
  reg(s, '1.11 Rate calculations');
}

// ======================= 24 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 1.9–1.11 • factors and the pH practical', [
  { q: 'Explain why the rate of an enzyme reaction levels off at high substrate concentration.', marks: 2, ms: 'All active sites are occupied (1); enzyme concentration becomes limiting / no more complexes per second (1).' },
  { q: 'In the amylase practical, give **two** variables that must be controlled.', marks: 2, ms: 'Any two: temperature; volume/concentration of amylase; volume/concentration of starch; interval between samples (1 each).' },
  { q: 'At pH 7 the starch disappears in 50 s. Calculate the rate using 1000 ÷ time.', marks: 1, ms: '20 (s⁻¹ × 1000) (1).' },
  { q: 'Explain why the rate falls above the optimum temperature.', marks: 2, ms: 'Enzyme denatured / active site changes shape (1); substrate no longer fits (1).' },
]);
calc('R4 1000/50', 1000 / 50, 20, 1e-12);
reg(R4.s, 'Recap 4');

// ======================= 25 SYNTHESIS & BREAKDOWN (B) =======================
reg(D.contentSlide({
  title: 'Enzymes build up and break down molecules',
  subtitle: 'Specification 1.12B • synthesis and breakdown of carbohydrates, proteins and lipids',
  tag: '1.12B', p: true, caption: 'enzymes break large molecules down and build them up',
  draw: (s, p) => {
    const rows = [['Carbohydrates', 'starch', 'sugars (glucose)', 'carbohydrases, e.g. amylase', '3B7DD8'], ['Proteins', 'protein', 'amino acids', 'proteases', '8E44AD'], ['Lipids', 'lipid (fat)', 'fatty acids + glycerol', 'lipases', 'D4A017']];
    rows.forEach(([n, big, small, enz, col], i) => {
      const y = 1.55 + i * 1.45;
      label(s, 0.7, y, 1.6, `**${n}**`, { size: 12, align: 'left', color: col });
      for (let j = 0; j < 6; j++) { ball(s, 0.9 + j * 0.28, y + 0.6, 0.13, col, C.white, 1); if (j) line(s, 0.9 + (j - 1) * 0.28 + 0.13, y + 0.6, 0.9 + j * 0.28 - 0.13, y + 0.6, col, 1.5); }
      label(s, 0.7, y + 0.85, 1.8, big, { size: 10.5, italic: true });
      arrow(s, 2.7, y + 0.45, 4.0, y + 0.45, C.red, 2); label(s, 2.5, y + 0.15, 1.7, 'breakdown', { size: 10, color: C.red });
      arrow(s, 4.0, y + 0.78, 2.7, y + 0.78, C.blue, 2); label(s, 2.5, y + 0.85, 1.7, 'synthesis', { size: 10, color: C.blue });
      for (let j = 0; j < 4; j++) ball(s, 4.4 + j * 0.42, y + 0.6, 0.13, col, C.white, 1);
      label(s, 4.2, y + 0.85, 2.2, small, { size: 10.5, italic: true });
      label(s, 2.55, y - 0.08, 1.65, enz, { size: 9, color: C.grey, h: 0.22 });
    });
  },
  head: 'Why enzymes matter',
  lines: [
    'Large molecules are **broken down** (e.g. in digestion) into small, soluble molecules that can be **absorbed** and used.',
    'Cells **synthesise** (build) large molecules from small ones, e.g. glucose → **starch, glycogen, cellulose**; amino acids → **proteins**; fatty acids + glycerol → **lipids**.',
    'Without enzymes these reactions would be far **too slow** at body temperature.',
  ],
  worked: { head: 'Link', q: 'Explain why starch must be digested before it is absorbed.',
    steps: [['Size', 'starch molecules are too large'], ['Enzyme', 'amylase breaks it into sugars'], ['Absorb', 'small, soluble sugars pass into the blood'], ['Answer', 'only small molecules can be absorbed']] },
  qc: 'Name the products when **lipids** are broken down. Which enzymes do this?',
  notes: 'QUICK CHECK ANSWER: fatty acids and glycerol (1); lipases (1).\nSpec 1.12B (biology only). The spec phrase: "synthesis of carbohydrates, proteins and lipids and their breakdown into sugars, amino acids and fatty acids and glycerol".',
}), '1.12B Synthesis and breakdown (BIOLOGY ONLY)');

// ======================= 26 FOOD TESTS (B, CP) =======================
{
  const s = D.contentHeader('Core Practical: food tests', 'Specification 1.13B • chemical reagents for starch, reducing sugars, proteins and fats', { tag: '1.13B', p: true, cp: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'positive results (left) and negative results (right of each pair)');
  const T4 = [['Starch', '1C2541', 'E0A040', 'blue-black'], ['Reducing sugar', 'C0392B', '3B7DD8', 'brick red'], ['Protein', '7B3FA0', '3B7DD8', 'purple'], ['Fat', 'F4F2EE', 'FAFAFA', 'cloudy white']];
  T4.forEach(([n, pos, neg, res], i) => {
    const x = 0.85 + i * 1.45;
    tubeT(s, x, 1.7, 0.42, 2.0, pos); tubeT(s, x + 0.55, 1.7, 0.42, 2.0, neg);
    label(s, x - 0.2, 3.85, 1.4, `**${n}**`, { size: 11 });
    label(s, x - 0.25, 4.15, 1.5, res, { size: 10.5, italic: true, color: C.grey });
  });
  label(s, 0.8, 4.75, 5.5, 'In each pair the **left** tube is positive and the **right** tube is negative.', { size: 10.5, color: C.grey, h: 0.5 });
  const rows = [[HDR('Test for'), HDR('Reagent and method'), HDR('Positive result')], ...[
    ['Starch', 'add iodine solution', 'orange-brown → blue-black'],
    ['Reducing sugars', 'add Benedict’s; heat in a water bath (≈ 80 °C)', 'blue → green → yellow → brick red'],
    ['Protein', 'add biuret reagent', 'blue → purple / lilac'],
    ['Fats (lipids)', 'shake with ethanol; pour into water', 'cloudy white emulsion'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
  table(s, rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.45, 2.6, 2.03], rowH: 0.62, fontSize: 11 });
  D.card(s, 6.8, 4.6, 6.08, 1.65, 'Safety and method points', [
    'Use a **water bath**, not a flame, to heat Benedict’s and ethanol (**flammable**).',
    'Grind solid food with water and filter first. Eye protection: biuret contains an alkali.',
  ], { size: 11 });
  D.quickCheck(s, 'A food turns **brick red** with Benedict’s and stays **blue** with biuret. What does it contain?');
  D.notes(s, 'QUICK CHECK ANSWER: reducing sugar (1); no protein (1).\nCP 1.13B (biology only). The colour of the Benedict’s precipitate gives a semi-quantitative idea of how much reducing sugar is present.');
  reg(s, '1.13B CP: food tests (BIOLOGY ONLY)');
}

// ======================= 27 CALORIMETRY (HT, B) =======================
reg(D.contentSlide({
  title: 'Calorimetry: energy in food',
  subtitle: 'Specification 1.14B • burning food to heat water',
  tag: '1.14B', ht: true, p: true, caption: 'simple calorimetry with a boiling tube of water',
  draw: (s, p) => {
    line(s, 1.6, 1.7, 1.6, 5.4, '555555', 3); box(s, 0.9, 5.4, 1.6, 0.2, '555555', '333333');
    line(s, 1.6, 2.1, 2.9, 2.1, '555555', 2.5);
    box(s, 2.85, 1.6, 0.7, 2.5, C.white, '333333', { lw: 1.5 }); box(s, 2.89, 2.4, 0.62, 1.66, C.water, C.water);
    line(s, 3.2, 1.2, 3.2, 3.6, C.red, 2); label(s, 3.3, 1.25, 1.3, 'thermometer', { size: 10.5, align: 'left' });
    label(s, 3.6, 2.9, 1.8, '**20 cm³ water**', { size: 10.5, align: 'left' });
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 3.0, y: 4.25, w: 0.4, h: 0.6, fill: { color: 'F39C12' }, line: { color: 'D35400', width: 1 } });
    ball(s, 3.2, 4.95, 0.13, 'C99A5B', '8A6A3A', 1);
    line(s, 3.2, 5.08, 4.3, 5.6, '777777', 2); label(s, 4.0, 5.55, 2.2, 'food on a mounted needle', { size: 10.5, h: 0.3 });
  },
  head: 'Calculating energy',
  lines: [
    '**energy (J) = mass of water (g) × 4.2 × temperature rise (°C)**',
    '1 cm³ of water has a mass of 1 g. 4.2 J is needed to warm 1 g of water by 1 °C.',
    'Divide by the **mass of food** to compare: **energy per gram (J/g)**.',
    'The value is **lower** than the true value: energy is lost to the air and the tube, and the food may not burn completely.',
  ],
  worked: { head: 'Worked example', q: '1.0 g of food heats 20 g of water from 21 °C to 51 °C.',
    steps: [['Rise', '51 − 21 = 30 °C'], ['Energy', '20 × 4.2 × 30 = 2520 J'], ['Per gram', '2520 ÷ 1.0 = 2520 J/g'], ['Answer', '2.52 kJ/g']] },
  qc: '**0.5 g** of bread heats **25 g** of water by **18 °C**. Calculate the energy per gram.',
  notes: 'QUICK CHECK ANSWER: 25 × 4.2 × 18 = 1890 J (1); ÷ 0.5 = 3780 J/g (1).\nSpec 1.14B (Higher and biology only, medium-high confidence). Improvements: insulate the tube, keep the flame close, use a calorimeter. All values checked.',
}), '1.14B Calorimetry (HT, BIOLOGY ONLY)');
calc('QC cal 25×4.2×18', 25 * 4.2 * 18, 1890, 1e-9);

// ======================= 28 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 1.12B–1.14B • enzymes in synthesis, food tests, calorimetry', [
  { q: 'Name the enzymes that break down **proteins** and the products formed.', marks: 2, ms: 'Proteases (1); amino acids (1).' },
  { q: 'Describe how to test a food for **protein**, giving the positive result.', marks: 2, ms: 'Add biuret reagent (1); turns purple / lilac (1).' },
  { q: '1.2 g of a nut heats 20 g of water by 24 °C. Calculate the energy released per gram.', marks: 3, ht: true, ms: '20 × 4.2 × 24 = 2016 J (1); ÷ 1.2 (1); = 1680 J/g (1).' },
]);
calc('R5 cal 20×4.2×24/1.2', 20 * 4.2 * 24 / 1.2, 1680, 1e-9);
reg(R5.s, 'Recap 5');

// ======================= 29 DIFFUSION =======================
reg(D.contentSlide({
  title: 'Diffusion',
  subtitle: 'Specification 1.15 • net movement down a concentration gradient',
  tag: '1.15', caption: 'particles spread out until evenly mixed',
  draw: (s, p) => {
    box(s, 0.8, 1.6, 2.4, 2.0, C.white, '555555', { lw: 1.5 }); particleBox(s, 0.8, 1.6, 2.4, 2.0, 22, 11, 'L');
    label(s, 0.8, 3.65, 2.4, '**start**: high → low', { size: 10.5 });
    arrow(s, 3.35, 2.6, 3.95, 2.6, C.ink, 2);
    box(s, 4.05, 1.6, 2.4, 2.0, C.white, '555555', { lw: 1.5 }); particleBox(s, 4.05, 1.6, 2.4, 2.0, 22, 23, 'A');
    label(s, 4.05, 3.65, 2.4, '**later**: evenly spread', { size: 10.5 });
    D.card(s, 0.8, 4.1, 5.65, 1.75, 'Examples in the body', [
      '**Oxygen** diffuses from the alveoli into the blood; **carbon dioxide** from the blood into the alveoli.',
      'Urea diffuses from cells into the blood.',
    ], { size: 11, fill: C.white });
  },
  head: 'Diffusion',
  lines: [
    'The **net movement** of particles from an area of **higher concentration** to an area of **lower concentration**.',
    'It is **passive**: no energy from respiration is needed.',
    'Faster with a **bigger concentration gradient**, a **higher temperature** and a **larger surface area**; slower over a longer distance.',
  ],
  worked: { head: 'Surface area : volume', q: 'Why do large organisms need exchange surfaces?',
    steps: [['1 cm cube', 'SA 6 cm², V 1 cm³ → 6 : 1'], ['2 cm cube', 'SA 24 cm², V 8 cm³ → 3 : 1'], ['Idea', 'bigger → smaller SA : V'], ['Answer', 'diffusion alone is too slow for large organisms']] },
  qc: 'Give **two** factors that **increase** the rate of diffusion.',
  notes: 'QUICK CHECK ANSWER: any two: larger concentration gradient; higher temperature; larger surface area; shorter distance (1 each).\nSpec 1.15. SA:V values checked.',
}), '1.15 Diffusion');

// ======================= 30 OSMOSIS =======================
reg(D.contentSlide({
  title: 'Osmosis',
  subtitle: 'Specification 1.15 • the diffusion of water across a partially permeable membrane',
  tag: '1.15', caption: 'small water molecules pass through; larger solute molecules cannot',
  draw: (s, p) => {
    box(s, 0.8, 1.6, 5.6, 2.9, C.white, '555555', { lw: 1.5 });
    line(s, 3.6, 1.6, 3.6, 4.5, '7F8C8D', 3, { dash: 'dash' });
    let r = 5; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    for (let i = 0; i < 26; i++) waterMol(s, 0.95 + rnd() * 2.5, 1.75 + rnd() * 2.6);
    for (let i = 0; i < 3; i++) soluteMol(s, 1.3 + i * 0.9, 2.2 + (i % 2) * 1.5);
    for (let i = 0; i < 10; i++) waterMol(s, 3.75 + rnd() * 2.5, 1.75 + rnd() * 2.6);
    for (let i = 0; i < 9; i++) soluteMol(s, 3.95 + (i % 3) * 0.8, 2.0 + Math.floor(i / 3) * 0.85);
    arrow(s, 2.9, 4.2, 4.3, 4.2, C.blue, 3);
    label(s, 0.85, 4.6, 2.7, '**dilute** solution (more water)', { size: 10.5, h: 0.45 });
    label(s, 3.7, 4.6, 2.7, '**concentrated** solution', { size: 10.5, h: 0.45 });
    callout(s, 3.75, 1.45, 2.4, 'partially permeable membrane', 3.6, 1.75, '7F8C8D', { size: 10 });
    waterMol(s, 0.95, 5.35); label(s, 1.05, 5.22, 0.9, 'water', { size: 10, align: 'left' });
    soluteMol(s, 2.15, 5.35); label(s, 2.3, 5.22, 1.4, 'solute (sugar)', { size: 10, align: 'left' });
  },
  head: 'Osmosis',
  lines: [
    'The **net movement of water** molecules from a **dilute** solution to a more **concentrated** solution, across a **partially permeable membrane**.',
    'It is a type of diffusion, so it is **passive**.',
    '**Animal cells** in pure water swell and may **burst**; in strong solutions they **shrink**.',
    '**Plant cells** in water become **turgid** (the cell wall stops bursting); in strong solutions they become **flaccid** / plasmolysed.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why a plant cell placed in pure water becomes turgid.',
    steps: [['Compare', 'water is more dilute than the cell sap'], ['Move', 'water enters by osmosis'], ['Through', 'the partially permeable membrane'], ['Answer', 'vacuole swells, pushing on the cell wall']] },
  qc: 'A red blood cell is put in **pure water**. Predict and explain what happens.',
  notes: 'QUICK CHECK ANSWER: water moves into the cell by osmosis (1) from a dilute solution to a more concentrated one / across the partially permeable membrane (1); the cell swells and bursts (no cell wall) (1).\nSpec 1.15.',
}), '1.15 Osmosis');

// ======================= 31 ACTIVE TRANSPORT =======================
reg(D.contentSlide({
  title: 'Active transport',
  subtitle: 'Specification 1.15 • moving substances against a concentration gradient',
  tag: '1.15', caption: 'a root hair cell taking up mineral ions from the soil',
  draw: (s, p) => {
    box(s, 0.75, 1.6, 2.2, 3.7, 'E8D5B0', 'A88B63', { lw: 1 }); label(s, 0.75, 1.65, 2.2, '**soil water**', { size: 11, h: 0.3 });
    box(s, 3.15, 1.6, 3.2, 3.7, 'E3F1DA', '3E7A2E', { lw: 3 });
    label(s, 3.15, 1.65, 3.2, '**root hair cell**', { size: 11, h: 0.3 });
    [[1.3, 2.6], [2.2, 3.7]].forEach(([x, y]) => ball(s, x, y, 0.11, '8E44AD', '5E2D73'));
    [[3.8, 2.4], [4.4, 3.0], [5.2, 2.6], [5.6, 3.6], [4.0, 4.1], [4.9, 4.5], [5.7, 4.7], [3.7, 3.4]].forEach(([x, y]) => ball(s, x, y, 0.11, '8E44AD', '5E2D73'));
    box(s, 2.85, 3.05, 0.4, 0.55, 'F0B26B', 'B5782E', { lw: 1.25, shape: SH.ROUNDED_RECTANGLE, r: 0.1 });
    arrow(s, 2.3, 3.32, 3.6, 3.32, C.red, 2.5);
    mito(s, 4.6, 3.75, 0.55, 0.26);
    label(s, 4.0, 4.0, 1.4, 'mitochondria', { size: 10, color: MITO[1] });
    label(s, 0.75, 4.6, 2.2, 'low concentration of ions', { size: 10.5, italic: true, h: 0.45 });
    label(s, 3.2, 5.0, 3.1, 'high concentration of ions', { size: 10.5, italic: true });
    label(s, 0.85, 2.7, 1.9, '**carrier protein**', { size: 10, color: 'B5782E' });
  },
  head: 'Active transport',
  lines: [
    'Moves substances from a **lower** to a **higher** concentration: **against** the concentration gradient.',
    'Needs **energy** from **respiration** (many **mitochondria**) and **carrier proteins** in the membrane.',
    'Examples: **mineral ions** into root hair cells; **glucose** into the blood from the gut and kidney tubules.',
  ],
  worked: { head: 'Compare the three', q: '',
    steps: [['Diffusion', 'high → low; any particle; passive'], ['Osmosis', 'water only; partially permeable membrane; passive'], ['Active', 'low → high; needs energy'], ['Answer', 'only active transport uses energy from respiration']] },
  qc: 'Explain why root hair cells contain many **mitochondria**.',
  notes: 'QUICK CHECK ANSWER: mitochondria carry out (aerobic) respiration to release energy (1); needed for active transport of mineral ions against the concentration gradient (1).\nSpec 1.15. Carrier proteins are useful extra detail.',
}), '1.15 Active transport');

// ======================= 32 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 1.15 • diffusion, osmosis and active transport', [
  { q: 'Define **osmosis**.', marks: 2, ms: 'Net movement of water (molecules) (1); from a dilute to a more concentrated solution across a partially permeable membrane (1).' },
  { q: 'Give **two** differences between diffusion and active transport.', marks: 2, ms: 'Active transport needs energy / diffusion is passive (1); active transport goes against the concentration gradient / diffusion goes down it (1).' },
  { q: 'Explain why a plant cell in a concentrated salt solution becomes flaccid.', marks: 3, ms: 'Solution is more concentrated than the cell sap (1); water leaves the cell by osmosis (1); vacuole shrinks / cell loses turgor / membrane pulls away from wall (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 33 CP OSMOSIS =======================
{
  const s = D.contentHeader('Core Practical: osmosis in potatoes', 'Specification 1.16 • measure the change in mass of potato cylinders', { tag: '1.16', cp: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'one cylinder in each sucrose concentration');
  const conc = ['0.0', '0.2', '0.4', '0.6', '0.8', '1.0'];
  conc.forEach((c, i) => {
    const x = 0.8 + i * 0.95;
    box(s, x, 1.8, 0.7, 2.1, C.white, '555555', { lw: 1.25 });
    box(s, x + 0.04, 2.3, 0.62, 1.56, C.water, C.water, { tr: Math.round(60 - i * 10) });
    box(s, x + 0.22, 2.7, 0.26, 0.9, 'F2DFA0', 'A8892F', { lw: 1 });
    label(s, x - 0.1, 3.95, 0.9, c, { size: 11, bold: true });
  });
  label(s, 0.8, 4.25, 5.6, 'sucrose concentration (mol/dm³)', { size: 10.5, italic: true });
  D.card(s, 0.75, 4.65, 5.5, 1.2, null, ['Cut cylinders with a **cork borer**, trim to the **same length**, **blot dry** and weigh. Leave in each solution for the same time (e.g. 24 h), blot and re-weigh.'], { size: 11, fill: C.white });
  D.card(s, 6.8, 1.3, 6.08, 2.55, 'Variables', [
    '**Independent:** concentration of sucrose solution.',
    '**Dependent:** % change in mass.',
    '**Control:** size of cylinder, same potato, volume of solution, time, temperature.',
  ], { size: 11.5 });
  D.workedSteps(s, 6.8, 4.0, 6.08, 2.25, 'Why blot and why % change?', '', [['Blot', 'removes surface water so only water inside is weighed'], ['% change', 'cylinders start at different masses'], ['Repeat', 'calculate a mean; spot anomalies'], ['Answer', '% change makes results comparable']], { size: 11 });
  D.quickCheck(s, 'Which cylinder **gains** mass the most, and why?', 6.38);
  D.notes(s, 'QUICK CHECK ANSWER: the one in 0.0 mol/dm³ (pure water) (1); it is the most dilute solution, so most water enters the potato cells by osmosis (1).\nCP 1.16. Safety: care with cork borers and scalpels.');
  reg(s, '1.16 CP: osmosis in potatoes');
}

// ======================= 34 % CHANGE =======================
reg(D.contentSlide({
  title: 'Percentage change in mass',
  subtitle: 'Specification 1.17 • and finding where there is no change',
  tag: '1.17', caption: 'mean % change in mass (model data)',
  draw: (s, p) => {
    const g = { x: 1.4, y: 1.6, w: 4.6, h: 3.4, xmin: 0, xmax: 1.0, xstep: 0.2, ymin: -20, ymax: 20, ystep: 10, xlabel: 'Sucrose concentration (mol/dm³)', ylabel: '% change in mass', fmt: v => (+v.toFixed(1)).toString() };
    axes(s, g); line(s, px(g, 0), py(g, 0), px(g, 1), py(g, 0), C.ink, 1.5);
    points(s, g, OSM, C.red); plotLine(s, g, OSM, C.red, 2);
    line(s, px(g, zero), py(g, 0), px(g, zero), py(g, -20), C.blue, 1.5, { dash: 'dash' });
    label(s, px(g, zero) + 0.08, py(g, -14), 1.6, '**≈ 0.43**: no change', { size: 10.5, align: 'left', color: C.blue });
  },
  head: 'Calculating % change',
  lines: [
    '**% change = (final mass − initial mass) ÷ initial mass × 100**',
    'Positive = **gain** (water entered); negative = **loss** (water left).',
    'Where the line **crosses zero**, the solution has the **same concentration** as the potato cells: no net osmosis.',
  ],
  worked: { head: 'Worked example', q: 'A cylinder goes from 2.50 g to 2.80 g. Another goes from 3.20 g to 2.88 g.',
    steps: [['Change 1', '2.80 − 2.50 = +0.30 g'], ['% 1', '0.30 ÷ 2.50 × 100 = +12%'], ['% 2', '(2.88 − 3.20) ÷ 3.20 × 100 = −10%'], ['Answer', '+12% and −10%']] },
  qc: 'A cylinder goes from **5.00 g** to **4.60 g**. Calculate the % change in mass.',
  notes: 'QUICK CHECK ANSWER: (4.60 − 5.00) ÷ 5.00 × 100 (1) = −8% (1).\nSpec 1.17. Zero crossing interpolated between 0.4 (+1%) and 0.6 (−6%) = 0.43 mol/dm³ (checked).',
}), '1.17 Percentage change in mass');

// ======================= 35 RECAP 7 =======================
const R7 = D.recapSlide(7, 'Specification 1.16–1.17 • osmosis in potatoes', [
  { q: 'Explain why potato cylinders are blotted dry before weighing.', marks: 1, ms: 'To remove surface water / so only water absorbed by the cells is measured (1).' },
  { q: 'A cylinder changes from 1.60 g to 1.84 g. Calculate the % change in mass.', marks: 2, ms: '0.24 ÷ 1.60 × 100 (1); = +15% (1).' },
  { q: 'Explain why the % change in mass is used instead of the change in mass.', marks: 2, ms: 'Cylinders have different starting masses (1); % allows fair comparison (1).' },
  { q: 'Explain how to use the results to estimate the concentration of the potato cells.', marks: 2, ms: 'Plot % change against concentration; draw a line of best fit (1); read the concentration where it crosses 0 / no change in mass (1).' },
]);
reg(R7.s, 'Recap 7');

// ======================= 36 KEY WORDS =======================
reg(D.keyWords([
  ['Eukaryotic', 'Cell with its DNA inside a nucleus (animal and plant cells).'],
  ['Prokaryotic', 'Cell with no nucleus; DNA in a loop plus plasmids (bacteria).'],
  ['Mitochondria', 'Site of aerobic respiration: release energy.'],
  ['Ribosomes', 'Site of protein synthesis.'],
  ['Haploid', 'Having one set of chromosomes (23 in human gametes).'],
  ['Resolution', 'Smallest distance at which two points can be seen as separate.'],
  ['Magnification', 'image size ÷ real size; no units.'],
  ['Micrometre (µm)', '10⁻⁶ m; 1 mm = 1000 µm.'],
  ['Active site', 'Region of an enzyme where the substrate binds.'],
  ['Specificity', 'Each active site fits only one substrate shape.'],
  ['Denatured', 'Active site has changed shape; substrate no longer fits.'],
  ['Optimum', 'Temperature or pH at which an enzyme works fastest.'],
  ['Calorimetry', 'Measuring the energy in food by heating water (HT).'],
  ['Diffusion', 'Net movement of particles from high to low concentration.'],
  ['Osmosis', 'Net movement of water across a partially permeable membrane, dilute → concentrated.'],
  ['Active transport', 'Movement against a concentration gradient using energy.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. HT term: calorimetry (1.14B, Higher and biology only).' }), 'Summary: key words');

// ======================= 37 FULL QUESTION =======================
reg(D.fullQuestion('A student uses a microscope to look at potato cells, then investigates osmosis and enzyme activity in potato.', [
  { l: 'a', q: 'Name **two** structures that are in a potato cell but not in a human cheek cell.', marks: 2, ms: 'Any two: cell wall; vacuole; (some) chloroplasts/plastids (1 each).' },
  { l: 'b', q: 'A drawing of a cell is 50 mm long. The real cell is 0.025 mm long. Calculate the magnification.', marks: 2, ms: '50 ÷ 0.025 (1); × 2000 (1).' },
  { l: 'c', q: 'A potato cylinder changes from 2.00 g to 1.70 g in a sugar solution. Calculate the % change in mass.', marks: 2, ms: '(1.70 − 2.00) ÷ 2.00 × 100 (1); = −15% (1).' },
  { l: 'd', q: 'Explain why the cylinder in (c) lost mass.', marks: 3, ms: 'Solution more concentrated than the potato cells (1); water moved out by osmosis (1); across a partially permeable membrane (1).', h: 1.2 },
  { l: 'e', q: 'Potato catalase produces oxygen. At pH 7 it takes 80 s to collect a set volume. Calculate the rate using 1000 ÷ time.', marks: 1, ms: '12.5 (1).' },
  { l: 'f', q: 'Explain why catalase does not work at pH 2.', marks: 3, ms: 'pH far from the optimum (1); active site changes shape / enzyme denatured (1); substrate (hydrogen peroxide) no longer fits / no enzyme–substrate complexes (1).', h: 1.2 },
], 13, { subtitle: 'Specification 1.1, 1.6, 1.8, 1.15–1.17 • answer every part • 13 marks' }), 'Full question');

// ======================= 38–39 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the structure in a bacterium that often carries genes for **antibiotic resistance**.', marks: 1, ms: 'Plasmid (1).' },
  { n: '2', q: 'An image of a cell is **6 mm** at **× 1500**. Calculate the real size in µm.', marks: 2, ms: '6 ÷ 1500 = 0.004 mm (1); = 4 µm (1).' },
  { n: '3', q: 'A potato cylinder goes from **3.00 g** to **3.36 g**. Calculate the % change and explain the result.', marks: 3, ms: '0.36 ÷ 3.00 × 100 = +12% (1)(1); water entered by osmosis / solution more dilute than the cells (1).' },
  { n: '4', q: 'Describe the test for **reducing sugars**, including the positive result.', marks: 2, ms: 'Add Benedict’s reagent and heat (in a water bath) (1); blue → brick red (precipitate) (1).' },
  { n: '5', q: 'Explain how a sperm cell is adapted for its function. Give **two** features.', marks: 2, ms: 'Any two with function: acrosome with enzymes to digest the egg layer; many mitochondria release energy for the tail; tail to swim; haploid nucleus (1 each).' },
  { n: '6', q: 'A student investigates the effect of temperature on the enzyme amylase. **Explain** how temperature affects the rate of the reaction.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Enzymes are biological catalysts; the substrate (starch) binds to the active site forming an enzyme–substrate complex.',
    'As temperature increases, molecules have more kinetic energy and move faster.',
    'More collisions between enzyme and substrate; more enzyme–substrate complexes per second; rate increases.',
    'The rate is highest at the optimum temperature (about 37 °C for human amylase).',
    'Above the optimum, bonds holding the enzyme’s shape break; the active site changes shape.',
    'The substrate no longer fits; the enzyme is denatured; rate falls rapidly to zero.',
    'Denaturing is permanent (cooling does not restore activity).',
    'Could refer to the method: time for starch to disappear (iodine test) at each temperature; rate = 1 ÷ time.',
  ], 'Level 3 answers explain BOTH the rise to the optimum (collisions) and the fall (denaturing / active site).');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7);
assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7); assert.strictEqual(R7.total, 7);
assert(D.slideNo >= 36 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T1_KeyConcepts.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
