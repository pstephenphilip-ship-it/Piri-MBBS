// build_B5_5.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B5 The human body – staying alive, B5.5 What role do hormones play in human reproduction? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B5_5.js
// Structure copied from build_B4_3.js / build_B5_3.js. ocr_bio_template.js is NOT edited by this deck: the body outline,
// female reproductive system, hormone-curve, lining strip, pill pack, syringe, petri dish and embryo helpers are in the
// DECK-SPECIFIC block below.
// Scope: J260 B5.5.1 (roles of hormones in reproduction, menstrual cycle), B5.5.2 HT (FSH/LH/oestrogen/progesterone
// interactions), B5.5.3 (hormones in contraception; evaluate hormonal and non-hormonal methods), B5.5.4 HT (hormones to
// treat infertility, IVF). The endocrine system, pituitary and negative feedback are B5.3: recap only.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B5', chapterTitle: 'The human body – staying alive', code: 'B5.5', title: 'What role do hormones play in human reproduction?',
  part: 5, parts: 6, specRange: 'B5.5.1–B5.5.4',
  subtitle: 'What role do hormones play in human reproduction?',
  keywords: ['Oestrogen', 'Progesterone', 'Testosterone', 'FSH', 'LH', 'Menstrual cycle', 'Contraception', 'IVF'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= HORMONE MODEL (relative levels, arbitrary units, 28-day cycle) =======================
// Smooth model curves built from Gaussian bumps, repeated every 28 days so day 0 and day 28 match. Shapes follow the
// standard textbook graph: FSH a small rise early in the cycle and a small peak with the LH surge; LH a sharp surge just
// before ovulation (day 14); oestrogen peaks just BEFORE the LH surge, with a smaller second rise in the luteal phase;
// progesterone low before ovulation, peaks about day 21 and falls before day 28.
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
assert(oesPeakDay < lhPeakDay && lhPeakDay < OVU + 0.5, 'oestrogen must peak before the LH surge, which comes just before ovulation');
calc('FSH continuous day 0 vs 28', Math.abs(FSH(0) - FSH(28)) < 1e-9 ? 1 : 0, 1);
calc('PRO continuous day 0 vs 28', Math.abs(PRO(0) - PRO(28)) < 1e-9 ? 1 : 0, 1);
calc('progesterone low before ovulation (day 7 < 20 a.u.)', PRO(7) < 20 ? 1 : 0, 1);
calc('FSH below its early level in luteal phase', FSH(21) < FSH(3) ? 1 : 0, 1);
// uterus lining thickness / mm (typical textbook values; piecewise linear)
const LIN = [[0, 10], [5, 1.5], [14, 9], [21, 11], [27, 11], [28, 10]];
const lining = d => { for (let i = 0; i < LIN.length - 1; i++) { const [a, ya] = LIN[i], [b, yb] = LIN[i + 1]; if (d >= a && d <= b) return ya + (yb - ya) * (d - a) / (b - a); } return LIN[0][1]; };
calc('lining day 0 = day 28', lining(0), lining(28));
calc('lining at ovulation (day 14) / mm', lining(14), 9);

// ======================= CALCULATIONS (asserted) =======================
// slide 6: fraction of cycle that is menstruation
const mensPct = calc('menstruation 5 / 28 × 100', 5 / 28 * 100, 17.857142857142858, 1e-9);
calc('menstruation % 3 s.f.', sf(mensPct, 3), 17.9, 1e-12);
calc('QC lining 1.5 → 9 mm rise', 9 - 1.5, 7.5);
// slide 9: cycle lengths
const CL = [26, 29, 28, 31, 27, 27];
const clSum = calc('cycle length sum', CL.reduce((a, b) => a + b, 0), 168);
const clMean = calc('mean cycle length 168 / 6', clSum / CL.length, 28);
calc('ovulation ≈ 14 days before next period, 32-day cycle', 32 - 14, 18);
calc('QC 30-day cycle ovulation day', 30 - 14, 16);
calc('range of cycle lengths 31 − 26', Math.max(...CL) - Math.min(...CL), 5);
// slide 14: contraception failure (typical use, pregnancies per 100 women in the first year; CDC values)
const FAIL = [['Implant', 0.1, 'h'], ['Copper IUD (coil)', 0.8, 'n'], ['Injection', 4, 'h'], ['Pill (combined)', 7, 'h'], ['Male condom', 13, 'n'], ['Diaphragm', 17, 'n'], ['Spermicide alone', 21, 'n']];
calc('1000 women pill 7%', 1000 * 7 / 100, 70);
calc('1000 women condom 13%', 1000 * 13 / 100, 130);
calc('1000 women implant 0.1%', 1000 * 0.1 / 100, 1);
calc('condom ÷ implant', 13 / 0.1, 130, 1e-9);
calc('QC 200 women diaphragm 17%', 200 * 17 / 100, 34);
// slide 17: IVF births per embryo transferred, by age (approximate HFEA UK figures, own fresh eggs)
const IVF = [['under 35', 32], ['35–37', 25], ['38–39', 19], ['40–42', 11], ['43–44', 5], ['over 44', 4]];
calc('200 transfers age 40–42 at 11%', 200 * 11 / 100, 22);
calc('200 transfers under 35 at 32%', 200 * 32 / 100, 64);
const ivfRatio = calc('under 35 ÷ 40–42 success', 32 / 11, 2.909090909090909, 1e-9);
calc('ratio 2 s.f.', sf(ivfRatio, 2), 2.9, 1e-12);
calc('QC IVF 150 at 19%', 150 * 19 / 100, 28.5);
// starter, recaps, FQ, HW
calc('starter: chromosomes in a gamete 46 / 2', 46 / 2, 23);
calc('R3: 500 women pill 7%', 500 * 7 / 100, 35);
calc('R4: 200 transfers at 25%', 200 * 25 / 100, 50);
calc('FQ: 400 pill 7%', 400 * 7 / 100, 28);
calc('FQ: 400 condom 13%', 400 * 13 / 100, 52);
calc('FQ: difference', 52 - 28, 24);
calc('HW: 300 injection 4%', 300 * 4 / 100, 12);
calc('HW: 300 condom 13%', 300 * 13 / 100, 39);
calc('HW: difference', 39 - 12, 27);

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
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
function polyline(s, pts, col, w = 1.5) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, w); }
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
// hormone colours (used in every graph, diagram and table)
const HC = { fsh: ['2F6DB5', '1F4E8C'], lh: ['7B3FA0', '5E2D73'], oes: ['D4568F', '8E3466'], pro: ['D98A1E', '8A560A'], tes: ['3B7DD8', '1F4E8C'], pit: ['C8414C', '8E2A33'] };
const SKIN = 'F6DDC8', SKIN_EDGE = 'B98E6E';
const WALL = 'EFB4B8', WALL_EDGE = 'A33E48', LINING = 'C8414C', LUMEN = 'FBE3E5', OVARY = 'F3D3A6', OVARY_EDGE = '9A6A2A';
// body outline (front view), copied from build_B5_3.js with organs removed
function body(s, cx, top, k = 1) {
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
  oval(s, cx, top + 0.3 * k, 0.52 * k, 0.36 * k, 'F4C7D0', 'C98393', { lw: 0.75 });
  const pit = [cx, top + 0.53 * k];
  ball(s, pit[0], pit[1], 0.06 * k, HC.pit[0], HC.pit[1], 1);
  return { pit };
}
// ovary with follicles at different stages; o.mature adds a large follicle, o.cl a corpus luteum, o.none no mature follicle
function ovary(s, cx, cy, w, h, o = {}) {
  oval(s, cx, cy, w, h, OVARY, OVARY_EDGE, { lw: 1.25 });
  const r = Math.min(w, h);
  [[-0.3, -0.15, 0.07], [0.05, 0.22, 0.06], [-0.1, 0.12, 0.05]].forEach(([fx, fy, fr]) => ball(s, cx + fx * w, cy + fy * h, fr * r * 1.6, 'FFF6E8', OVARY_EDGE, 0.5));
  if (o.mature) { ball(s, cx + 0.22 * w, cy - 0.08 * h, 0.2 * r, 'FFF6E8', OVARY_EDGE, 1); ball(s, cx + 0.27 * w, cy - 0.12 * h, 0.06 * r, 'F2B279', 'A4561C', 0.75); }
  if (o.cl) ball(s, cx + 0.22 * w, cy - 0.05 * h, 0.17 * r, 'F5D76E', 'B8930A', 1);
}
// female reproductive system, front view (frontal section of the uterus). Returns label points.
function femaleSys(s, cx, top, k = 1, o = {}) {
  const yT = top + 0.45 * k, rx = 0.8 * k, ry = 0.42 * k;
  const P = {};
  // oviducts (behind the uterus outline) with fimbriae, and ovaries
  [-1, 1].forEach(sd => {
    const tube = [[cx + sd * 0.7 * k, yT - 0.12 * k], [cx + sd * 1.0 * k, top + 0.12 * k], [cx + sd * 1.35 * k, top + 0.02 * k], [cx + sd * 1.7 * k, top + 0.18 * k], [cx + sd * 1.88 * k, top + 0.45 * k]];
    polyline(s, tube, WALL_EDGE, 7 * k); polyline(s, tube, WALL, 4.5 * k);
    const [fx, fy] = tube[4];
    [-0.35, 0, 0.35].forEach(a => line(s, fx, fy, fx + sd * 0.1 * k + a * 0.12 * k, fy + 0.17 * k, WALL_EDGE, 1.25));
    ovary(s, cx + sd * 1.5 * k, top + 0.82 * k, 0.6 * k, 0.38 * k, { mature: o.mature && sd > 0, cl: o.cl && sd > 0 });
    line(s, cx + sd * 0.78 * k, yT + 0.08 * k, cx + sd * 1.2 * k, top + 0.8 * k, OVARY_EDGE, 1.25);
    if (o.cut) { line(s, cx + sd * 1.12 * k - 0.07, top + 0.0 * k - 0.05, cx + sd * 1.12 * k + 0.07, top + 0.15 * k + 0.07, C.ink, 2.5); }
  });
  P.ovary = [cx + 1.5 * k, top + 0.82 * k]; P.ovaryL = [cx - 1.5 * k, top + 0.82 * k]; P.oviduct = [cx + 1.35 * k, top + 0.02 * k]; P.oviductL = [cx - 1.35 * k, top + 0.02 * k];
  // uterus + cervix + vagina outline
  const out = [];
  for (let t = 180; t >= 0; t -= 10) { const a = t * Math.PI / 180; out.push([cx + rx * Math.cos(a), yT - ry * Math.sin(a)]); }
  out.push([cx + 0.74 * k, yT + 0.35 * k], [cx + 0.55 * k, yT + 0.75 * k], [cx + 0.3 * k, yT + 1.1 * k], [cx + 0.26 * k, yT + 1.42 * k],
    [cx + 0.3 * k, yT + 1.5 * k], [cx + 0.3 * k, yT + 2.25 * k], [cx - 0.3 * k, yT + 2.25 * k], [cx - 0.3 * k, yT + 1.5 * k],
    [cx - 0.26 * k, yT + 1.42 * k], [cx - 0.3 * k, yT + 1.1 * k], [cx - 0.55 * k, yT + 0.75 * k], [cx - 0.74 * k, yT + 0.35 * k]);
  poly(s, out, WALL, WALL_EDGE, { lw: 1.75 });
  // lining (endometrium) and cavity: triangle, apex down at the cervix
  const th = o.lining == null ? 1 : o.lining; // 0..1 lining thickness factor
  const lw = 0.08 * k * th + 0.02 * k;
  poly(s, [[cx - 0.55 * k - lw, yT - 0.12 * k - lw * 0.6], [cx + 0.55 * k + lw, yT - 0.12 * k - lw * 0.6], [cx + 0.05 * k, yT + 0.98 * k + lw], [cx - 0.05 * k, yT + 0.98 * k + lw]], LINING, '8E2A33', { lw: 0.75 });
  poly(s, [[cx - 0.55 * k + lw, yT - 0.12 * k + lw * 0.5], [cx + 0.55 * k - lw, yT - 0.12 * k + lw * 0.5], [cx + 0.03 * k, yT + 0.98 * k - lw * 0.3], [cx - 0.03 * k, yT + 0.98 * k - lw * 0.3]], LUMEN, null);
  // cervical canal and vagina
  line(s, cx, yT + 0.98 * k, cx, yT + 1.5 * k, '8E2A33', 1.5);
  box(s, cx - 0.17 * k, yT + 1.5 * k, 0.34 * k, 0.75 * k, LUMEN, null);
  line(s, cx - 0.3 * k, yT + 1.5 * k, cx + 0.3 * k, yT + 1.5 * k, WALL_EDGE, 0.75, { dash: 'dash' });
  P.uterus = [cx - 0.7 * k, yT + 0.3 * k]; P.lining = [cx + 0.4 * k, yT + 0.12 * k]; P.cervix = [cx + 0.27 * k, yT + 1.35 * k]; P.vagina = [cx - 0.3 * k, yT + 1.95 * k];
  P.cavity = [cx, yT + 0.3 * k]; P.yT = yT;
  return P;
}
// leader-line label
function callout(s, lx, ly, lw, text, px, py, col, o = {}) {
  const right = lx > px;
  label(s, lx, ly - 0.15, lw, text, { size: o.size || 11, bold: true, color: col, align: right ? 'left' : 'right', h: o.h || 0.3, valign: 'middle' });
  line(s, right ? lx - 0.04 : lx + lw + 0.04, ly, px, py, col, 1);
  ball(s, px, py, 0.03, col);
}
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
// small text tag with a white background, sitting on an arrow
function tag(s, cx, cy, w, h, text, col, o = {}) {
  box(s, cx - w / 2, cy - h / 2, w, h, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1 });
  label(s, cx - w / 2 + 0.03, cy - h / 2, w - 0.06, text, { size: o.size || 10, color: col, h, valign: 'middle' });
}
// inhibition: line ending in a flat bar (⊣)
function inhibit(s, x1, y1, x2, y2, col = C.red, w = 2) {
  line(s, x1, y1, x2, y2, col, w, { dash: 'dash' });
  const L = Math.hypot(x2 - x1, y2 - y1), nx = -(y2 - y1) / L, ny = (x2 - x1) / L, b = 0.13;
  line(s, x2 - nx * b, y2 - ny * b, x2 + nx * b, y2 + ny * b, col, 3);
}
function plusMinus(s, cx, cy, plus) {
  ball(s, cx, cy, 0.15, plus ? C.green : C.red, plus ? '1E6B40' : '8E2A33', 1);
  label(s, cx - 0.15, cy - 0.15, 0.3, plus ? '+' : '−', { size: 14, bold: true, color: C.white, h: 0.3 });
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
function egg(s, cx, cy, r) { ball(s, cx, cy, r, 'FBE6C4', 'A4561C', 1); ball(s, cx, cy, r * 0.32, C.nucleus, C.nucleusEdge, 0.5); }
function sperm(s, x, y, dir = 1, col = '3B5B8C') { oval(s, x, y, 0.08, 0.05, col, col); line(s, x + dir * 0.04, y, x + dir * 0.13, y + 0.025, col, 0.75); line(s, x + dir * 0.13, y + 0.025, x + dir * 0.22, y - 0.01, col, 0.75); }
function embryo(s, cx, cy, r) {
  oval(s, cx, cy, 2 * r, 2 * r, 'FFF6E8', 'A4561C', { lw: 1 });
  [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35], [0, -0.5], [0, 0.5], [-0.5, 0], [0.5, 0]].forEach(([a, b]) => ball(s, cx + a * r * 0.95, cy + b * r * 0.95, r * 0.36, 'F7D7B5', 'A4561C', 0.5));
}
// graph with hormone curves on the template axes
function curve(s, g, f, col, w = 2.5) { D.fnLine(s, g, f, g.xmin, g.xmax, 112, col, w); }
function key(s, x, y, col, text, w = 1.3) { line(s, x, y + 0.14, x + 0.3, y + 0.14, col, 3); label(s, x + 0.35, y, w, text, { size: 10.5, bold: true, color: col, align: 'left' }); }
// lining strip to scale: thickness vs day as a filled shape on a graph g (ymin 0)
function liningFill(s, g, fill = LINING) {
  const pts = [[D.px(g, 0), D.py(g, 0)]];
  for (let d = 0; d <= 28 + 1e-9; d += 0.5) pts.push([D.px(g, d), D.py(g, lining(d))]);
  pts.push([D.px(g, 28), D.py(g, 0)]);
  poly(s, pts, fill, '8E2A33', { lw: 0.75, tr: 15 });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Reproductive hormones',
  footer: 'OCR J260 Combined Science B • B5.5 What role do hormones play in human reproduction? • teacher deck • mark schemes and answers in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • sex hormones, the menstrual cycle, contraception, infertility` },
    { icon: 'H', text: 'Higher & Foundation in one deck • B5.5.2 (hormone interactions) and B5.5.4 (infertility, IVF) marked HT' },
    { icon: '⇄', text: 'Puberty • FSH, LH, oestrogen, progesterone • 28-day hormone graphs • evaluating methods' },
  ],
  notes: 'B5.5 What role do hormones play in human reproduction? is Part 5 of 6 in J260 Chapter B5 The human body – staying alive.\nScope (see SPEC_B5_5.md): B5.5.1 roles of hormones in human reproduction including the menstrual cycle; B5.5.2 (HT) interactions of FSH, LH, oestrogen and progesterone; B5.5.3 hormones in contraception, evaluating hormonal and non-hormonal methods; B5.5.4 (HT) hormones in modern reproductive technologies to treat infertility.\nThe endocrine system, the pituitary and negative feedback are taught in B5.3 and are recalled here only. Statement wording comes from search extracts (ocr.org.uk could not be fetched); the HT markers are inferred (UNVERIFIED).\nSensitivity: this topic can be personal for some students (periods, contraception, infertility, IVF). Keep it factual, give advance notice, and follow your school RSE policy.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B5.5.1', text: 'Name the **sex hormones** (oestrogen, progesterone, testosterone) and the glands that make them.' },
  { code: 'B5.5.1', text: 'Describe how sex hormones cause the changes at **puberty**.' },
  { code: 'B5.5.1', text: 'Describe the stages of the **menstrual cycle**: menstruation, the lining building up, **ovulation**.' },
  { code: 'B5.5.1', text: 'Describe the roles of **FSH**, **LH**, **oestrogen** and **progesterone** in the menstrual cycle.' },
  { code: 'B5.5.2', text: 'Explain how the four hormones **interact**, and read a **graph** of hormone levels over 28 days.', ht: true },
  { code: 'B5.5.3', text: 'Explain how **hormones** are used in **contraception** (pill, implant, injection).' },
  { code: 'B5.5.3', text: '**Evaluate** hormonal and non-hormonal methods of contraception, using data.' },
  { code: 'B5.5.4', text: 'Explain how **FSH** and **LH** are used to treat **infertility**, including **IVF**, and evaluate IVF.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statement wording found in search extracts (J257 mirror on tutordex and revision-site copies; the same B5.5 section is in J260 Combined, see SPEC_B5_5.md):\nB5.5.1 "describe the role of hormones in human reproduction, including the control of the menstrual cycle".\nB5.5.2 "explain the interactions of FSH, LH, oestrogen and progesterone in the control of the menstrual cycle" (HT).\nB5.5.3 "explain the use of hormones in contraception and evaluate hormonal and non-hormonal methods of contraception".\nB5.5.4 "explain the use of hormones in modern reproductive technologies to treat infertility" (HT).\nHT pills: inferred. Oak National Academy OCR Combined lists "Hormonal control of the menstrual cycle" and "Using hormones to treat infertility" in the Higher programme only, while "Hormones: puberty, the menstrual cycle and the menopause" and "Hormonal and non-hormonal methods of contraception" appear in Foundation too; BBC Bitesize (OCR 21C) titles the menstrual-cycle hormone page "Higher". If your specification shows B5.5.4 in normal type, teach slides 16–18 to all.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B5 The human body – staying alive • B5.5 is Part 5 of 6 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B5.5.1', 'Sex hormones and puberty', 'Both tiers', C.blue],
    ['B5.5.1', 'The menstrual cycle; the four hormones', 'Both tiers', C.blue],
    ['B5.5.2', 'Hormone graphs and interactions', 'HT', C.red],
    ['B5.5.3', 'Hormonal contraception', 'Both tiers', C.blue],
    ['B5.5.3', 'Non-hormonal methods; evaluating with data', 'Both tiers', C.blue],
    ['B5.5.4', 'Fertility drugs and IVF', 'HT', C.red],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B5.5\nHormones in reproduction', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B5.3 endocrine system, pituitary, negative feedback • B4.3 meiosis and gametes • B5.1 blood plasma', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.25, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B5.1 How do substances get into, out of and around our bodies?',
      'B5.2 How does the nervous system help us respond to changes?',
      'B5.3 How do hormones control responses in the human body?',
      'B5.4 Why do we need to maintain a constant internal environment?',
      '**B5.5 What role do hormones play in human reproduction?** (this deck)',
      'B5.6 What can happen when organs and control systems stop working?',
    ], { size: 11, color: 'E3F2F0', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 3.05, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.75, 5.53, 2.1, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Everyone learns the hormones, the cycle and contraception. Slides marked **HT** (interactions, IVF) are Higher tier.',
      'The pituitary and negative feedback were taught in **B5.3**: here we use them.',
      'Maths: reading **graphs** drawn to scale, **means** and **percentages** of a group.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.85, w: 5.15, h: 1.9, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Sequence: slides 5–6 puberty and the cycle (both tiers), recap 1; slide 8 the four hormones (both tiers), slides 9–10 graph and interactions (HT), recap 2; slides 12–14 contraception (both tiers), recap 3; slides 16–17 infertility and IVF (HT), recap 4.\nB5.4 (homeostasis, kidneys) and B5.6 (diabetes, failing organs) are not used here. Meiosis and gametes are B4.3: recall only.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B5.3 • hormones', q: 'What is a **hormone**? How does it travel round the body?' },
  { from: 'B5.3 • pituitary', q: 'Where is the **pituitary gland**? Why is it called the "**master gland**"?' },
  { from: 'B4.3 • meiosis', q: 'Which type of cell division makes **gametes**? How many chromosomes are in a human **egg** cell?' },
  { from: 'B5.3 • feedback', q: 'What is **negative feedback**? Give **one** hormone example from B5.3.' },
  { from: 'B5.1 • blood', q: 'Name the part of the **blood** that carries hormones.' },
  { from: 'KS3 • reproduction', q: 'Name the organ where (a) **eggs** are made, (b) a fertilised egg grows into a **baby**.' },
], { subtitle: 'Recall from B5.3, B4.3, B5.1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. A chemical messenger made by an endocrine gland; carried in the blood (plasma) to target organs.\n2. At the base of the brain. Its hormones control other glands (e.g. TSH → thyroid; FSH and LH → ovaries / testes).\n3. Meiosis. 46 ÷ 2 = 23 chromosomes.\n4. A change triggers a response that reverses the change. Thyroxine / TSH (HT in B5.3).\n5. Plasma.\n6. (a) Ovary. (b) Uterus (womb).\nQ2 and Q4 set up this lesson: FSH and LH come from the pituitary, and the cycle is controlled by feedback.' }), 'Retrieval starter');

// ======================= 5 SEX HORMONES AND PUBERTY =======================
reg(D.contentSlide({
  title: 'Sex hormones and puberty',
  subtitle: `Specification ${sp('B5.5.1')} • testosterone and oestrogen cause the changes at puberty`,
  tag: 'B5.5.1', caption: 'front view; pituitary (red), testes (blue) and ovaries (pink) drawn larger than life',
  draw: (s, p) => {
    const k = 0.74, top = 1.75;
    [[1.9, 'f'], [5.05, 'm']].forEach(([cx, sx]) => {
      const B = body(s, cx, top, k);
      label(s, cx - 1.1, top - 0.36, 2.2, sx === 'f' ? '**Female**' : '**Male**', { size: 12, color: sx === 'f' ? HC.oes[1] : HC.tes[1] });
      let gx, gy;
      if (sx === 'f') {
        [-1, 1].forEach(sd => oval(s, cx + sd * 0.3 * k, top + 2.55 * k, 0.17, 0.11, HC.oes[0], HC.oes[1]));
        gx = cx + 0.3 * k; gy = top + 2.55 * k;
      } else {
        oval(s, cx, top + 2.98 * k, 0.4, 0.28, SKIN, SKIN_EDGE, { lw: 1.25 });
        oval(s, cx - 0.08, top + 2.99 * k, 0.13, 0.18, HC.tes[0], HC.tes[1]); oval(s, cx + 0.08, top + 2.99 * k, 0.13, 0.18, HC.tes[0], HC.tes[1]);
        gx = cx + 0.13; gy = top + 2.99 * k;
      }
      // pituitary → gonad
      const ax = cx + 1.0;
      line(s, B.pit[0] + 0.05, B.pit[1], ax, B.pit[1], HC.pit[0], 1.75);
      arrow(s, ax, B.pit[1], ax, gy - 0.25, HC.pit[0], 1.75);
      label(s, ax + 0.05, B.pit[1] + 0.25, 0.75, '**FSH, LH**', { size: 10, color: HC.pit[1], align: 'left' });
      line(s, ax, gy - 0.25, gx + 0.05, gy - 0.05, HC.pit[0], 1.75);
      label(s, cx - 1.3, top + 4.52 * k, 2.6, sx === 'f' ? '**ovaries** → **oestrogen**' : '**testes** → **testosterone**', { size: 10.5, color: sx === 'f' ? HC.oes[1] : HC.tes[1], h: 0.3 });
    });
    label(s, 0.65, 5.5, 5.7, 'Pituitary **FSH** and **LH** → ovaries / testes → **sex hormones**', { size: 10.5, h: 0.3 });
  },
  head: 'What sex hormones do',
  lines: [
    '**Testosterone** (made in the **testes**) is the main male hormone. It starts **sperm production** and causes male **secondary sexual characteristics**: deeper voice, facial and body hair, more muscle.',
    '**Oestrogen** (made in the **ovaries**) is the main female hormone. It causes breasts to develop, hips to widen, body hair, and starts the **menstrual cycle**: eggs mature and are released.',
    '**Progesterone** (ovaries) keeps the uterus lining ready for a pregnancy.',
    'Puberty is usually about age 10–16. At the **menopause** (about 50) the ovaries stop releasing eggs and oestrogen falls.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: explain', q: 'Explain how the pituitary gland causes a boy\'s voice to deepen at puberty.',
    steps: [['Signal', 'the pituitary releases FSH and LH into the blood'], ['Target', 'they reach the testes, which have receptors for them'], ['Hormone', 'the testes make more testosterone'], ['Answer', 'testosterone acts on the larynx: the voice deepens']], size: 10.5 },
  workedH: 1.95,
  qc: 'Name the sex hormone made by (a) the **testes** (b) the **ovaries**. Give **one** change each hormone causes at puberty.',
  notes: 'QUICK CHECK ANSWER: (a) testosterone (1) — e.g. sperm production / deeper voice / facial hair / muscle growth (1). (b) oestrogen (1) — e.g. breasts develop / hips widen / menstrual cycle starts / eggs mature (1).\nB5.5.1 "describe the role of hormones in human reproduction". Puberty ages are typical ranges. Menopause is included because the Oak OCR Foundation lesson covers it (context, not a separate statement). The pituitary was taught in B5.3: FSH and LH are recalled here as its gonad-stimulating hormones. Hair, voice and muscle changes are examples of secondary sexual characteristics; primary sexual characteristics are the sex organs present from birth.',
}), 'B5.5.1 Sex hormones and puberty');

// ======================= 6 FEMALE SYSTEM + CYCLE =======================
{
  const s = D.contentHeader('The menstrual cycle', `Specification ${sp('B5.5.1')} • a cycle of about 28 days that releases an egg and prepares the uterus`, { tag: 'B5.5.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'female reproductive system, front view (uterus cut open)');
  const P = femaleSys(s, 3.45, 1.85, 1.28, { mature: true });
  callout(s, 5.45, 1.62, 0.95, 'Oviduct', P.oviduct[0] + 0.05, P.oviduct[1] + 0.03, WALL_EDGE);
  label(s, P.ovary[0] - 0.6, 3.2, 1.2, '**Ovary**', { size: 11, color: OVARY_EDGE });
  label(s, P.ovary[0] - 0.75, 3.45, 1.5, '(an egg matures in a follicle)', { size: 10, italic: true, color: C.grey, h: 0.4, valign: 'top' });
  callout(s, 0.6, 3.5, 1.35, 'Uterus (womb)', 2.72, 3.3, WALL_EDGE);
  callout(s, 0.6, 4.1, 1.2, 'Lining', 3.07, 3.07, LINING);
  callout(s, 4.25, 4.35, 1.3, 'Cervix', P.cervix[0], P.cervix[1], WALL_EDGE);
  callout(s, 0.6, 4.95, 1.35, 'Vagina', P.vagina[0], P.vagina[1], WALL_EDGE);
  // right: stages card + lining graph (to scale)
  D.card(s, 6.8, 1.3, 6.08, 2.3, 'Four stages (day 0 = first day of a period)', [
    '**Days 0–5 menstruation**: the uterus lining breaks down and leaves the body (a period).',
    '**Days 5–14**: an egg matures in the ovary; the lining **builds up** again.',
    '**About day 14 ovulation**: the egg is **released** from the ovary into the oviduct.',
    '**Days 14–28**: the lining is **kept** thick. If the egg is not fertilised, the cycle repeats.',
  ], { size: 10.5 });
  box(s, 6.8, 3.72, 6.08, 2.53, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  const g = { x: 7.55, y: 3.88, w: 5.1, h: 1.7, xmin: 0, xmax: 28, ymin: 0, ymax: 12, xstep: 2, ystep: 4, minor: 2, xlabel: 'day of cycle', ylabel: 'lining / mm' };
  D.axes(s, g);
  s.addShape(SH.RECTANGLE, { x: D.px(g, 0), y: g.y, w: D.px(g, 5) - D.px(g, 0), h: g.h, fill: { color: C.red, transparency: 85 }, line: { type: 'none' } });
  liningFill(s, g);
  line(s, D.px(g, OVU), g.y, D.px(g, OVU), g.y + g.h, C.orange, 1.5, { dash: 'dash' });
  label(s, D.px(g, OVU) - 1.55, g.y + 0.02, 1.5, 'ovulation', { size: 10, bold: true, color: C.orange, align: 'right' });
  label(s, D.px(g, 0) + 0.02, g.y + 0.02, 0.9, 'period', { size: 10, bold: true, color: C.red, align: 'left' });
  D.quickCheck(s, 'On what day is the egg usually released? What happens to the uterus **lining** between day **5** and day **14**?');
  D.notes(s, `QUICK CHECK ANSWER: About day 14 (ovulation) (1). The lining builds up / thickens again (from about 1.5 mm to 9 mm on the graph, a rise of 7.5 mm) (1), ready to receive a fertilised egg.\nMaths: menstruation is 5 of 28 days = ${sf(mensPct, 3)}% of the cycle (node: ${mensPct}).\nThe lining graph is drawn to scale from typical textbook values (about 1–2 mm after a period, about 9–11 mm in the second half of the cycle; values UNVERIFIED and vary between people). Cycle length varies (about 21–35 days is common); 28 days is the textbook model. In the diagram the right ovary shows a mature follicle; fimbriae of each oviduct sit close to the ovary. The oviduct is also called the fallopian tube or egg tube.`);
  reg(s, 'B5.5.1 The menstrual cycle (system and lining graph)');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B5.5.1')} • sex hormones, puberty and the menstrual cycle`, [
  { q: 'Name the main male sex hormone and the organ that makes it.', marks: 2, ms: 'Testosterone (1); testes (1).' },
  { q: 'Give **two** changes caused by **oestrogen** at puberty.', marks: 2, ms: 'Any two (1 each): breasts develop; hips widen; pubic / body hair; menstrual cycle starts / eggs mature / are released.' },
  { q: 'What is **ovulation**, and on about which day of a 28-day cycle does it happen?', marks: 2, ms: 'Release of an egg from the ovary (1); about day 14 (1).' },
  { q: 'Describe what happens to the **uterus lining** during the menstrual cycle.', marks: 2, ms: 'Lining breaks down / is shed in menstruation (days 0–5) (1); then builds up / thickens again and is maintained (ready for a fertilised egg) (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 THE FOUR HORMONES =======================
{
  const s = D.contentHeader('Four hormones control the cycle', `Specification ${sp('B5.5.1')} • FSH and LH from the pituitary; oestrogen and progesterone from the ovaries`, { tag: 'B5.5.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'where each hormone is made and what it acts on (simplified)');
  // pituitary (top centre)
  ball(s, 1.4, 1.95, 0.24, HC.pit[0], HC.pit[1], 1.5);
  label(s, 0.6, 2.25, 1.6, '**Pituitary gland**', { size: 11, color: HC.pit[1] });
  // ovary (middle) and uterus (right)
  ovary(s, 1.4, 4.25, 1.3, 0.85, { mature: true });
  label(s, 0.6, 4.75, 1.6, '**Ovary**', { size: 11, color: OVARY_EDGE });
  // FSH, LH arrows
  arrow(s, 1.15, 2.55, 1.15, 3.8, HC.fsh[0], 2.5);
  arrow(s, 1.65, 2.55, 1.65, 3.8, HC.lh[0], 2.5);
  label(s, 0.45, 2.95, 0.65, '**FSH**', { size: 11, color: HC.fsh[1], align: 'right' });
  label(s, 1.72, 2.95, 0.6, '**LH**', { size: 11, color: HC.lh[1], align: 'left' });
  pbox(s, 2.45, 1.55, 3.9, 0.75, '**FSH**: makes an **egg mature** in a follicle; makes the ovary release **oestrogen**', C.white, HC.fsh[0], { size: 10.5 });
  pbox(s, 2.45, 2.45, 3.9, 0.75, '**LH**: causes **ovulation** (egg released, about day 14)', C.white, HC.lh[0], { size: 10.5 });
  // uterus mini
  const ux = 5.2, uy = 4.05;
  poly(s, (() => { const o = []; for (let t = 180; t >= 0; t -= 15) { const a = t * Math.PI / 180; o.push([ux + 0.55 * Math.cos(a), uy - 0.3 * Math.sin(a)]); } o.push([ux + 0.2, uy + 0.85], [ux - 0.2, uy + 0.85]); return o; })(), WALL, WALL_EDGE, { lw: 1.5 });
  poly(s, [[ux - 0.38, uy - 0.05], [ux + 0.38, uy - 0.05], [ux, uy + 0.65]], LINING, '8E2A33', { lw: 0.75 });
  poly(s, [[ux - 0.26, uy + 0.0], [ux + 0.26, uy + 0.0], [ux, uy + 0.5]], LUMEN, null);
  box(s, ux - 0.12, uy + 0.85, 0.24, 0.22, WALL, WALL_EDGE, { lw: 1.25 });
  label(s, ux - 0.8, uy + 1.1, 1.6, '**Uterus lining**', { size: 11, color: LINING });
  arrow(s, 2.1, 4.05, ux - 0.65, 4.0, HC.oes[0], 2.5);
  arrow(s, 2.1, 4.45, ux - 0.45, 4.45, HC.pro[0], 2.5);
  label(s, 2.2, 3.62, 2.3, '**oestrogen**: lining **builds up**', { size: 10.5, color: HC.oes[1], align: 'left' });
  label(s, 2.2, 4.55, 2.4, '**progesterone**: lining **kept** thick', { size: 10.5, color: HC.pro[1], align: 'left' });
  label(s, 0.65, 5.35, 5.7, 'Progesterone is made by the **empty follicle** after ovulation.', { size: 10.5, italic: true, color: C.grey, h: 0.3 });
  // table
  const rows = [[HDR('Hormone'), HDR('Made in'), HDR('Main role in the cycle')],
    ...[
      ['FSH (follicle-stimulating hormone)', 'pituitary', 'an egg matures in a follicle; ovary makes oestrogen', HC.fsh],
      ['LH (luteinising hormone)', 'pituitary', 'triggers ovulation: the egg is released', HC.lh],
      ['Oestrogen', 'ovaries', 'uterus lining builds up (repairs)', HC.oes],
      ['Progesterone', 'ovaries (empty follicle)', 'keeps the lining thick, ready for pregnancy', HC.pro],
    ].map(([h, m, r, col], i) => [tcell(h, i, { bold: true, color: col[1] }), tcell(m, i), tcell(r, i)])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.95, 1.4, 2.73], rowH: 0.56, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 4.25, 6.08, 2.0, 'Worked example: predict', 'A woman\'s pituitary makes very little LH. Predict the effect on her cycle. Explain.', [
    ['Role', 'LH is the hormone that triggers ovulation'], ['Effect', 'without enough LH the mature egg is not released'], ['Answer', 'no ovulation, so she cannot become pregnant naturally']], { size: 10.5 });
  D.quickCheck(s, 'Which **two** hormones are made by the **pituitary**? Which hormone makes the uterus lining **build up**?');
  D.notes(s, 'QUICK CHECK ANSWER: FSH and LH (1). Oestrogen (1).\nB5.5.1 asks for the roles of the hormones; how they control each other (feedback) is B5.5.2 (HT) on the next two slides. The empty follicle is the corpus luteum (name not needed at GCSE; given as stretch on slide 10). Oestrogen also repairs the lining after menstruation.');
  reg(s, 'B5.5.1 The four hormones');
}

// ======================= 9 HORMONE GRAPHS (HT) =======================
reg(D.contentSlide({
  title: 'Hormone levels over 28 days',
  subtitle: `Specification ${sp('B5.5.2')} • reading the hormone graph: each peak causes the next event`,
  tag: 'B5.5.2', ht: true, panelW: 7.3, caption: 'model data drawn to scale; relative levels (arbitrary units); day 0 = start of a period',
  draw: (s, p) => {
    const X = 1.35, Wd = 5.9;
    const gA = { x: X, y: 1.5, w: Wd, h: 1.25, xmin: 0, xmax: 28, ymin: 0, ymax: 100, xstep: 2, ystep: 50, minor: 2, ylabel: 'level / a.u.' };
    const gB = { x: X, y: 3.1, w: Wd, h: 1.25, xmin: 0, xmax: 28, ymin: 0, ymax: 100, xstep: 2, ystep: 50, minor: 2, ylabel: 'level / a.u.' };
    const gC = { x: X, y: 4.68, w: Wd, h: 0.8, xmin: 0, xmax: 28, ymin: 0, ymax: 12, xstep: 2, ystep: 12, minor: 1, xlabel: 'day of cycle', ylabel: 'lining / mm' };
    [gA, gB, gC].forEach(g => {
      D.axes(s, g);
      line(s, D.px(g, OVU), g.y, D.px(g, OVU), g.y + g.h, C.orange, 1.25, { dash: 'dash' });
    });
    curve(s, gA, FSH, HC.fsh[0]); curve(s, gA, LH, HC.lh[0]);
    curve(s, gB, OES, HC.oes[0]); curve(s, gB, PRO, HC.pro[0]);
    liningFill(s, gC);
    key(s, D.px(gA, 18), gA.y + 0.05, HC.fsh[0], 'FSH', 0.6); key(s, D.px(gA, 22.5), gA.y + 0.05, HC.lh[0], 'LH', 0.6);
    key(s, D.px(gB, 1.0), gB.y + 0.02, HC.oes[0], 'oestrogen', 1.0); key(s, D.px(gB, 23.3), gB.y + 0.02, HC.pro[0], 'progesterone', 1.2);
    label(s, D.px(gA, lhPeakDay) - 1.0, D.py(gA, LH(lhPeakDay)) + 0.02, 0.88, 'LH surge', { size: 10, bold: true, color: HC.lh[1], align: 'right' });
    label(s, D.px(gB, OVU) + 0.06, gB.y + 0.03, 1.0, 'ovulation', { size: 10, bold: true, color: C.orange, align: 'left' });
  },
  head: 'Read the graph left to right',
  lines: [
    '**FSH** rises early: a follicle and egg mature, and the ovary makes **oestrogen**.',
    '**Oestrogen** peaks **just before** day 14 and the lining builds up.',
    'High oestrogen triggers the **LH surge**, which causes **ovulation** at about day 14.',
    '**Progesterone** rises after ovulation (peak about day 21) and keeps the lining thick.',
    'No pregnancy: progesterone **falls**, the lining breaks down, and FSH rises again.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: mean cycle length', q: `One woman's last six cycles lasted ${CL.join(', ')} days. Find the mean, and the ovulation day in a 32-day cycle.`,
    steps: [['Add', `${CL.join(' + ')} = ${clSum}`], ['Mean', `${clSum} ÷ ${CL.length} = ${clMean} days`], ['Ovulation', 'about 14 days before the next period'], ['Answer', `mean ${clMean} days; 32-day cycle: day 32 − 14 = 18`]], size: 10.5 },
  workedH: 2.05,
  qc: 'A woman has a **30-day** cycle. On about which day does she ovulate? Which hormone peaks just before?',
  notes: `QUICK CHECK ANSWER: 30 − 14 = day 16 (1); LH (the LH surge) (1). (Oestrogen also peaks just before the LH surge.)\nGraph check (node): the curves are smooth Gaussian models repeated every 28 days, so day 0 joins day 28. Asserted: LH peak day ${lhPeakDay}, oestrogen peak day ${oesPeakDay} (before LH), progesterone peak day ${proPeakDay}; progesterone low before ovulation; FSH lower in the second half. Levels are relative (each hormone on its own arbitrary scale); real units differ between hormones. Mean cycle node: ${clSum} ÷ ${CL.length} = ${clMean}; range ${Math.max(...CL) - Math.min(...CL)} days.\nThe second half of the cycle (after ovulation) is about 14 days in most women, so variation in cycle length is mainly in the first half: this is why ovulation is counted back from the next period.`,
}), 'B5.5.2 Hormone graphs over 28 days (HT)');

// ======================= 10 INTERACTIONS (HT) =======================
reg(D.contentSlide({
  title: 'How the four hormones interact',
  subtitle: `Specification ${sp('B5.5.2')} • each hormone switches others on (+) or off (−)`,
  tag: 'B5.5.2', ht: true, caption: '+ stimulates (solid arrow); − inhibits (dashed line with a bar)',
  draw: (s, p) => {
    pbox(s, 2.35, 1.5, 2.3, 0.6, '**Pituitary gland**', 'FBECEC', HC.pit[0], { color: HC.pit[1] });
    // follicle (left) and empty follicle (right)
    box(s, 0.65, 3.55, 2.15, 0.95, 'FFF6E8', OVARY_EDGE, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
    ball(s, 1.0, 4.02, 0.24, 'FFF6E8', OVARY_EDGE, 1); ball(s, 1.04, 3.98, 0.08, 'F2B279', 'A4561C', 0.75);
    label(s, 1.3, 3.55, 1.45, '**Follicle** with egg\n(ovary, days 1–14)', { size: 10, h: 0.95, color: OVARY_EDGE });
    box(s, 4.2, 3.55, 2.15, 0.95, 'FFF6E8', OVARY_EDGE, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
    ball(s, 4.55, 4.02, 0.22, 'F5D76E', 'B8930A', 1);
    label(s, 4.82, 3.55, 1.48, '**Empty follicle**\n(after ovulation)', { size: 10, h: 0.95, color: OVARY_EDGE });
    pbox(s, 2.35, 5.15, 2.3, 0.6, '**Uterus lining**', 'FBE3E5', LINING, { color: '8E2A33' });
    // FSH: pit -> follicle (+)
    arrow(s, 2.55, 2.1, 1.25, 3.55, HC.fsh[0], 2.5);
    tag(s, 1.55, 2.75, 1.0, 0.42, '**FSH** +\negg matures', HC.fsh[1]);
    // oestrogen: follicle -> pituitary (− FSH, + LH)
    line(s, 2.4, 3.55, 3.05, 2.1, HC.oes[0], 2.5, { head: true });
    tag(s, 3.0, 3.0, 1.15, 0.42, '**oestrogen**\n− FSH  + LH', HC.oes[1]);
    // LH: pit -> follicle/ovulation -> empty follicle
    arrow(s, 3.95, 2.1, 4.75, 3.55, HC.lh[0], 2.5);
    tag(s, 4.25, 2.62, 0.95, 0.42, '**LH** +\novulation', HC.lh[1]);
    // progesterone: empty follicle -> pituitary (− FSH and LH)
    inhibit(s, 5.75, 3.55, 4.55, 2.22, HC.pro[0], 2.5);
    tag(s, 5.65, 2.75, 1.25, 0.42, '**progesterone**\n− FSH and LH', HC.pro[1]);
    // ovulation transition
    arrow(s, 2.82, 4.02, 4.18, 4.02, OVARY_EDGE, 2);
    label(s, 2.85, 4.08, 1.3, 'egg released', { size: 10, italic: true, color: OVARY_EDGE });
    // to the uterus
    arrow(s, 1.7, 4.5, 2.45, 5.15, HC.oes[0], 2);
    label(s, 0.55, 4.85, 1.5, '**oestrogen**: builds', { size: 10, color: HC.oes[1], align: 'left' });
    arrow(s, 5.25, 4.5, 4.55, 5.15, HC.pro[0], 2);
    label(s, 4.9, 4.85, 1.55, '**progesterone**: maintains', { size: 10, color: HC.pro[1], align: 'right' });
  },
  head: 'The sequence of control',
  lines: [
    'Pituitary releases **FSH** → a follicle and egg **mature**; the follicle makes **oestrogen**.',
    'Rising **oestrogen** **inhibits FSH** (so only one egg matures) and high oestrogen **stimulates LH**.',
    'The **LH surge** causes **ovulation**; the empty follicle then makes **progesterone**.',
    '**Progesterone** **inhibits FSH and LH**, so no more eggs mature, and it keeps the lining thick.',
    'No pregnancy: the empty follicle breaks down, progesterone falls, FSH is no longer inhibited and the cycle restarts.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: explain', q: 'Explain why only one egg is usually released in each cycle.',
    steps: [['FSH', 'FSH makes a follicle mature and release oestrogen'], ['Feedback', 'rising oestrogen inhibits FSH from the pituitary'], ['Then', 'after ovulation, progesterone also inhibits FSH and LH'], ['Answer', 'low FSH stops other follicles maturing']], size: 10.5 },
  workedH: 1.95,
  qc: 'Explain why the **uterus lining breaks down** at the end of the cycle if the egg is **not fertilised**.',
  notes: 'QUICK CHECK ANSWER: The empty follicle (corpus luteum) breaks down, so progesterone level falls (1); progesterone is needed to maintain the lining, so the lining breaks down / is shed (menstruation) (1). [Stretch: the fall in progesterone also removes inhibition of FSH, so a new cycle begins.]\nB5.5.2 "explain the interactions of FSH, LH, oestrogen and progesterone in the control of the menstrual cycle" (HT, inferred). Oestrogen feedback: at GCSE, rising oestrogen inhibits FSH and (high) oestrogen stimulates LH release; this is how examiners phrase it. Stretch: the empty follicle is the corpus luteum; in pregnancy the embryo keeps it (and progesterone) going. This links to negative feedback (B5.3): progesterone and oestrogen inhibiting FSH are negative feedback.',
}), 'B5.5.2 Hormone interactions (HT)');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B5.5.1')}–${sp('B5.5.2')} • the four hormones; graphs and interactions (HT)`, [
  { q: 'Name the gland that makes **FSH**, and state **one** effect of FSH on the ovary.', marks: 2, ms: 'Pituitary (gland) (1); makes an egg / follicle mature OR stimulates the ovary to make oestrogen (1).' },
  { q: 'State the role of **progesterone** in the menstrual cycle.', marks: 1, ms: 'Maintains / keeps the uterus lining thick (ready for pregnancy) (also accept: inhibits FSH and LH) (1).' },
  { q: 'Describe how **oestrogen** affects the release of FSH and LH.', marks: 2, ht: true, ms: 'Oestrogen inhibits FSH (release) (1); high oestrogen stimulates LH (release) / causes the LH surge (1).' },
  { q: 'Use the hormone graph to explain why ovulation happens at about day 14 and why the lining is shed after day 28.', marks: 3, ht: true, ms: 'LH surge / LH peaks just before day 14 (1) (after oestrogen peaks); LH causes ovulation (1); progesterone falls towards day 28 so the lining is no longer maintained / breaks down (1).' },
]);
reg(R2.s, 'Recap 2 (part HT)');

// ======================= 12 HORMONAL CONTRACEPTION =======================
reg(D.contentSlide({
  title: 'Hormonal contraception',
  subtitle: `Specification ${sp('B5.5.3')} • extra oestrogen and progesterone switch off FSH and LH`,
  tag: 'B5.5.3', caption: 'how the combined pill works; other hormonal methods in the bottom row',
  draw: (s, p) => {
    pillPack(s, 0.7, 1.5, 1.6, 0.85);
    label(s, 0.65, 2.38, 1.7, 'pill taken daily', { size: 10, italic: true, color: C.grey });
    arrow(s, 2.35, 1.92, 3.0, 1.92, HC.oes[0], 2.5);
    pbox(s, 3.05, 1.55, 3.3, 0.75, '**oestrogen + progesterone** in the blood stay **high**', 'FDEFF5', HC.oes[0], { size: 10.5 });
    pbox(s, 3.4, 2.95, 2.6, 0.6, '**Pituitary gland**', 'FBECEC', HC.pit[0], { color: HC.pit[1] });
    inhibit(s, 4.7, 2.32, 4.7, 2.93, C.red, 2.5);
    label(s, 4.8, 2.45, 1.5, '− inhibits', { size: 10.5, bold: true, color: C.red, align: 'left' });
    // FSH / LH blocked
    line(s, 4.0, 3.57, 4.0, 4.24, HC.fsh[0], 2.5, { dash: 'dash' }); line(s, 5.4, 3.57, 5.4, 4.24, HC.lh[0], 2.5, { dash: 'dash' });
    [[4.0, 3.93], [5.4, 3.93]].forEach(([x, y]) => { line(s, x - 0.13, y - 0.13, x + 0.13, y + 0.13, C.red, 3); line(s, x - 0.13, y + 0.13, x + 0.13, y - 0.13, C.red, 3); });
    label(s, 3.0, 3.78, 0.85, '**no FSH**', { size: 10.5, color: HC.fsh[1], align: 'right' });
    label(s, 5.55, 3.78, 0.85, '**no LH**', { size: 10.5, color: HC.lh[1], align: 'left' });
    ovary(s, 4.7, 4.62, 1.3, 0.7, {});
    label(s, 3.3, 5.0, 2.8, '**no egg matures**, **no ovulation**', { size: 10.5, color: C.red });
    // cervix mucus inset
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
    // other hormonal methods row
    label(s, 0.7, 5.42, 1.1, '**Also:**', { size: 10.5, align: 'left' });
    box(s, 1.35, 5.52, 0.3, 0.07, 'D9C6A8', '8A6A3A', { lw: 0.75 }); label(s, 1.7, 5.42, 0.9, 'implant', { size: 10, align: 'left' });
    syringe(s, 2.6, 5.555, 0.45, HC.pro[0]); label(s, 3.1, 5.42, 0.9, 'injection', { size: 10, align: 'left' });
    box(s, 3.95, 5.46, 0.2, 0.2, 'F3D9B8', '8A6A3A', { lw: 0.75 }); label(s, 4.2, 5.42, 0.6, 'patch', { size: 10, align: 'left' });
    line(s, 4.85, 5.48, 5.15, 5.48, HC.pro[0], 2.5); line(s, 5.0, 5.48, 5.0, 5.68, HC.pro[0], 2.5); label(s, 5.2, 5.42, 1.3, 'hormonal coil (IUS)', { size: 10, align: 'left' });
  },
  head: 'Using hormones to prevent pregnancy',
  lines: [
    '**Combined pill**: oestrogen + progesterone, taken daily. They **inhibit FSH and LH**, so **no egg matures** and there is **no ovulation**.',
    'Progesterone also makes **cervical mucus thick**, so sperm cannot get through.',
    '**Progesterone-only** methods: mini-pill, **implant** in the arm (about 3 years), **injection** (every 8–13 weeks), hormonal coil (IUS).',
    'Very effective if used correctly, but they give **no protection** from sexually transmitted infections (**STIs**).',
    'Possible side effects: headaches, mood changes, irregular bleeding; a small increased risk of blood clots with oestrogen.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: evaluate', q: 'In typical use the implant fails for 0.1 in 100 women a year, the pill for 7 in 100. Suggest why.',
    steps: [['Pill', 'must be taken every day; missed pills let FSH rise'], ['Implant', 'releases progesterone all the time for about 3 years'], ['Answer', 'the implant does not rely on remembering, so fewer mistakes']], size: 10.5 },
  workedH: 1.75,
  qc: 'Explain how taking **oestrogen** and **progesterone** each day stops a woman from becoming pregnant.',
  notes: 'QUICK CHECK ANSWER: The hormones inhibit FSH (and LH) release from the pituitary (1); so no egg matures / no egg is released (no ovulation) (1); progesterone also thickens cervical mucus so sperm cannot reach an egg (1).\nB5.5.3 "explain the use of hormones in contraception". This is the same negative feedback as in the natural cycle (slide 10): the pill keeps oestrogen and progesterone high all the time. Durations are typical NHS values (implant up to 3 years; injection every 8 or 13 weeks depending on type). Side-effect lists are simplified; use as context only. Myth to tackle: the pill does NOT protect against STIs.',
}), 'B5.5.3 Hormonal contraception');

// ======================= 13 NON-HORMONAL =======================
{
  const s = D.contentHeader('Non-hormonal contraception', `Specification ${sp('B5.5.3')} • stop sperm reaching an egg, or stop an embryo implanting`, { tag: 'B5.5.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'where each method works (female system, front view)');
  const P = femaleSys(s, 3.45, 1.95, 1.28, { cut: true });
  // copper IUD (T shape) inside the cavity
  const yT = P.yT, cx = 3.45;
  line(s, cx - 0.42, yT + 0.02, cx + 0.42, yT + 0.02, 'B87333', 3.5);
  line(s, cx, yT + 0.02, cx, yT + 1.0, 'B87333', 3.5);
  for (let i = 0; i < 5; i++) line(s, cx - 0.06, yT + 0.2 + i * 0.13, cx + 0.06, yT + 0.25 + i * 0.13, '7A4A1A', 1.25);
  line(s, cx, yT + 1.0, cx + 0.05, yT + 1.75, '6B7385', 0.75);
  // diaphragm cap over the cervix
  s.addShape(SH.ARC, { x: cx - 0.42, y: yT + 1.48, w: 0.84, h: 0.5, angleRange: [180, 360], line: { color: '2F6DB5', width: 3 } });
  // labels
  const nb = (x, y, n) => { ball(s, x, y, 0.15, C.ink, C.ink); label(s, x - 0.15, y - 0.15, 0.3, String(n), { size: 11, bold: true, color: C.white, h: 0.3 }); };
  callout(s, 5.25, 1.6, 1.2, 'Sterilisation: oviducts cut', 4.88, 2.03, C.ink, { size: 10, h: 0.45 });
  callout(s, 0.55, 3.65, 1.45, 'Copper IUD (coil)', cx, yT + 0.55, 'B87333', { size: 10.5 });
  callout(s, 4.55, 4.0, 1.85, 'Diaphragm / cap over the cervix', cx + 0.4, yT + 1.6, '2F6DB5', { size: 10, h: 0.45 });
  callout(s, 0.55, 4.55, 1.45, 'Female condom (lines the vagina)', cx - 0.3, yT + 2.1, C.green, { size: 10, h: 0.45 });
  label(s, 0.6, 5.5, 5.8, 'Not drawn: **condom** on the penis; **vasectomy** (sperm ducts cut); natural methods (avoid sex around ovulation).', { size: 10, italic: true, color: C.grey, h: 0.4, valign: 'top' });
  const rows = [[HDR('Method'), HDR('How it works'), HDR('STI protection?')],
    ...[
      ['Condom (male or female)', 'barrier: stops sperm reaching the egg', 'yes'],
      ['Diaphragm / cap (+ spermicide)', 'barrier over the cervix', 'no'],
      ['Spermicide', 'chemical that kills sperm', 'no'],
      ['Copper IUD (coil)', 'copper is toxic to sperm; stops an embryo implanting', 'no'],
      ['Sterilisation', 'oviducts or sperm ducts cut: permanent', 'no'],
      ['Natural methods / abstinence', 'no sex on fertile days around ovulation', 'no'],
    ].map((r, i) => r.map((t, j) => tcell(t, i, { bold: j === 0 || (j === 2 && t === 'yes'), color: j === 2 && t === 'yes' ? C.green : C.text })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [2.0, 2.85, 1.23], rowH: 0.5, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.95, 6.08, 1.3, 'No hormones, so…', [
    'no hormonal side effects, and most can be stopped at once (not sterilisation).',
    'barrier methods must be used correctly **every time**; only **condoms** protect against **STIs**.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Give **one** advantage and **one** disadvantage of using **condoms** rather than the **pill**.');
  D.notes(s, 'QUICK CHECK ANSWER: Advantage (1): protects against STIs / no hormonal side effects / used only when needed / easy to get. Disadvantage (1): less effective in typical use (higher failure rate: 13% vs 7%) / can split or slip / must be used every time / interrupts sex.\nB5.5.3 "evaluate hormonal and non-hormonal methods of contraception". The copper IUD is non-hormonal (the IUS / hormonal coil releases progesterone and is on slide 12). Diagram: the T-shaped copper IUD sits in the uterus cavity with threads through the cervix; the diaphragm (blue arc) covers the cervix from the vagina; black marks across the oviducts show female sterilisation. Natural methods rely on knowing when ovulation happens (slide 9).');
  reg(s, 'B5.5.3 Non-hormonal contraception');
}

// ======================= 14 EVALUATING (DATA) =======================
{
  const s = D.contentHeader('Evaluating contraception with data', `Specification ${sp('B5.5.3')} • how many women in 100 become pregnant in a year of typical use?`, { tag: 'B5.5.3', pag: 'Data analysis' });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'typical use, first year (approximate CDC figures); drawn to scale');
  const g = { x: 2.6, y: 1.5, w: 3.95, h: 3.35, xmin: 0, xmax: 25, ymin: 0, ymax: 1, xstep: 5, ystep: 1, grid: false };
  // custom horizontal bar chart (to scale on x)
  const n = FAIL.length, bh = g.h / n;
  box(s, g.x, g.y, g.w, g.h, C.white, null);
  for (let v = 0; v <= 25; v += 5) {
    line(s, D.px(g, v), g.y, D.px(g, v), g.y + g.h, v ? 'C5DCD9' : C.ink, v ? 0.5 : 1.5);
    label(s, D.px(g, v) - 0.3, g.y + g.h + 0.05, 0.6, String(v), { size: 10, h: 0.2 });
  }
  line(s, g.x, g.y + g.h, g.x + g.w, g.y + g.h, C.ink, 1.5);
  label(s, g.x, g.y + g.h + 0.28, g.w, 'pregnancies per 100 women per year', { size: 10.5, bold: true });
  FAIL.forEach(([nm, v, t], i) => {
    const y = g.y + i * bh + bh * 0.18, hh = bh * 0.64;
    const col = t === 'h' ? HC.oes[0] : '2F6DB5';
    box(s, g.x, y, Math.max(0.02, D.px(g, v) - g.x), hh, col, null);
    label(s, 0.6, y, 1.95, nm, { size: 10.5, align: 'right', h: hh });
    label(s, D.px(g, v) + 0.05, y, 0.5, String(v), { size: 10.5, bold: true, color: col, align: 'left', h: hh });
  });
  box(s, 0.75, 5.55, 0.22, 0.18, HC.oes[0], null); label(s, 1.02, 5.5, 1.1, 'hormonal', { size: 10.5, bold: true, color: HC.oes[1], align: 'left' });
  box(s, 2.1, 5.55, 0.22, 0.18, '2F6DB5', null); label(s, 2.37, 5.5, 1.3, 'non-hormonal', { size: 10.5, bold: true, color: '1F4E8C', align: 'left' });
  label(s, 3.7, 5.42, 3.0, 'No method: about **85** in 100 (off the scale)', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.4 });
  D.workedSteps(s, 7.1, 1.3, 5.78, 1.8, 'Worked example: use the data', '1000 women use the pill and 1000 use condoms for a year. How many more pregnancies with condoms?', [
    ['Pill', '7 in 100 → 1000 × 7 ÷ 100 = 70'], ['Condom', '13 in 100 → 1000 × 13 ÷ 100 = 130'], ['Answer', '130 − 70 = 60 more pregnancies with condoms']], { size: 10.5 });
  D.card(s, 7.1, 3.22, 5.78, 3.03, 'Evaluate: weigh up, then decide', [
    '**Effectiveness**: implants and IUDs work without remembering; pills and condoms fail more in typical use.',
    '**STIs**: only condoms protect.',
    '**Side effects**: hormonal methods can have them; barrier methods do not.',
    '**Convenience and reversibility**: implant lasts years; sterilisation is permanent.',
    'A good evaluation ends with a **justified conclusion** for a given person.',
  ], { size: 10.5 });
  D.quickCheck(s, '**200** women use a **diaphragm** for a year. Use the chart to estimate how many become pregnant.');
  D.notes(s, 'QUICK CHECK ANSWER: 17 in 100 → 200 × 17 ÷ 100 = 34 women.\nData: approximate typical-use failure rates (percentage of women with an unintended pregnancy in the first year) from the US CDC contraceptive effectiveness chart: implant 0.1, copper IUD 0.8, injection 4, combined pill 7, male condom 13, diaphragm 17, spermicide 21, no method 85 (UNVERIFIED to the decimal; NHS figures are similar in pattern). "Typical use" includes mistakes such as missed pills; with perfect use the pill and condoms are much more effective (about 0.3 and 2). Node: 1000 × 13% = 130, implant 1, condom ÷ implant = 130 times.\nThe chart is to scale on the x axis (0–25). No PAG is linked to B5.5; this is a data-analysis activity.');
  reg(s, 'B5.5.3 Evaluating contraception (data)');
}

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B5.5.3')} • contraception`, [
  { q: 'Explain how the **combined pill** prevents pregnancy.', marks: 2, ms: 'Oestrogen and progesterone inhibit FSH (and LH) (1); so no eggs mature / no ovulation (1). (Accept progesterone thickens cervical mucus for 1 mark.)' },
  { q: 'Name **one** method of contraception that protects against **STIs**, and explain how it works.', marks: 2, ms: 'Condom (1); barrier that stops sperm (and pathogens) passing between partners / reaching the egg (1).' },
  { q: 'In typical use the pill fails for **7 in 100** women a year. How many of **500** women using the pill would be expected to become pregnant?', marks: 2, ms: '500 × 7 ÷ 100 (1); = 35 (1).' },
  { q: 'Suggest **two** reasons why a woman might choose an **implant** rather than the pill.', marks: 2, ms: 'Any two (1 each): more effective / lower failure rate; no need to remember daily; lasts about 3 years; progesterone only (if oestrogen unsuitable).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 INFERTILITY AND IVF (HT) =======================
reg(D.contentSlide({
  title: 'Using hormones to treat infertility',
  subtitle: `Specification ${sp('B5.5.4')} • FSH and LH as fertility drugs, and in IVF`,
  tag: 'B5.5.4', ht: true, caption: 'the main steps of in vitro fertilisation (IVF)',
  draw: (s, p) => {
    const tw = 1.75, th = 1.95, gx = 0.15;
    const steps = [
      ['1  **FSH and LH** injections', 'several eggs mature'],
      ['2  Eggs mature', 'in follicles in the ovaries'],
      ['3  Eggs **collected**', 'with a fine needle'],
      ['4  **Fertilised** in a dish', 'eggs mixed with sperm'],
      ['5  **Embryos** grow', 'for a few days'],
      ['6  **Embryo** placed in the uterus', '1 or 2 embryos'],
    ];
    steps.forEach(([h, sub], i) => {
      const col = i % 3, row = Math.floor(i / 3);
      const x = 0.7 + col * (tw + gx + 0.05), y = 1.5 + row * (th + 0.25);
      box(s, x, y, tw, th, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      label(s, x + 0.05, y + 0.05, tw - 0.1, h, { size: 10.5, h: 0.45, valign: 'top' });
      label(s, x + 0.05, y + th - 0.36, tw - 0.1, sub, { size: 10, italic: true, color: C.grey, h: 0.3 });
      const cx = x + tw / 2, cy = y + 1.05;
      if (i === 0) { syringe(s, cx - 0.5, cy, 1.05, HC.fsh[0]); label(s, cx - 0.6, cy + 0.15, 1.2, 'FSH, LH', { size: 10, bold: true, color: HC.fsh[1] }); }
      if (i === 1) ovary(s, cx, cy, 1.2, 0.72, { mature: true });
      if (i === 2) { ovary(s, cx - 0.25, cy + 0.05, 0.8, 0.55, { mature: true }); line(s, cx + 0.05, cy - 0.05, cx + 0.75, cy - 0.45, '4A5262', 2); egg(s, cx + 0.55, cy + 0.3, 0.09); egg(s, cx + 0.75, cy + 0.2, 0.09); }
      if (i === 3) { oval(s, cx, cy + 0.08, 1.3, 0.55, 'EEF5F4', '6B7385', { lw: 1.5 }); egg(s, cx - 0.2, cy + 0.08, 0.13); egg(s, cx + 0.3, cy + 0.12, 0.1); sperm(s, cx - 0.48, cy - 0.02, 1); sperm(s, cx + 0.05, cy + 0.2, -1); sperm(s, cx - 0.42, cy + 0.2, 1); }
      if (i === 4) { embryo(s, cx - 0.3, cy + 0.05, 0.22); embryo(s, cx + 0.3, cy + 0.05, 0.22); }
      if (i === 5) {
        const ux = cx, uy = cy - 0.15;
        poly(s, (() => { const o = []; for (let t = 180; t >= 0; t -= 15) { const a = t * Math.PI / 180; o.push([ux + 0.5 * Math.cos(a), uy - 0.25 * Math.sin(a)]); } o.push([ux + 0.17, uy + 0.65], [ux - 0.17, uy + 0.65]); return o; })(), WALL, WALL_EDGE, { lw: 1.25 });
        poly(s, [[ux - 0.33, uy - 0.03], [ux + 0.33, uy - 0.03], [ux, uy + 0.5]], LINING, null);
        poly(s, [[ux - 0.22, uy + 0.0], [ux + 0.22, uy + 0.0], [ux, uy + 0.38]], LUMEN, null);
        ball(s, ux - 0.06, uy + 0.07, 0.06, 'F7D7B5', 'A4561C', 0.75);
      }
      if (col < 2) arrow(s, x + tw + 0.01, y + th / 2, x + tw + gx + 0.04, y + th / 2, C.blue, 2);
    });
    // row link 3 -> 4
    const yA = 1.5 + 1.95, yB = 1.5 + 1.95 + 0.25;
    line(s, 0.7 + 2 * (tw + gx + 0.05) + tw / 2, yA, 0.7 + 2 * (tw + gx + 0.05) + tw / 2, yA + 0.12, C.blue, 2);
    line(s, 0.7 + 2 * (tw + gx + 0.05) + tw / 2, yA + 0.12, 0.7 + tw / 2, yA + 0.12, C.blue, 2);
    arrow(s, 0.7 + tw / 2, yA + 0.12, 0.7 + tw / 2, yB, C.blue, 2);
  },
  head: 'Two ways hormones help',
  lines: [
    '**Fertility drugs**: some women do not make enough **FSH**, so no egg matures. Injections of **FSH and LH** make eggs **mature** and cause **ovulation**, so she can become pregnant naturally.',
    '**IVF** (in vitro fertilisation): used when, for example, the oviducts are blocked or sperm count is low.',
    'FSH and LH make **several eggs** mature. They are collected and **fertilised by sperm in a dish**.',
    'The fertilised eggs divide (mitosis) to form **embryos**; one or two are put into the **uterus**.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: explain', q: 'A woman\'s oviducts are blocked. Explain why fertility drugs alone will not help, but IVF can.',
    steps: [['Problem', 'sperm cannot reach the egg in the blocked oviduct'], ['Drugs', 'FSH and LH release an egg, but it is still blocked'], ['IVF', 'eggs are collected from the ovary and fertilised in a dish'], ['Answer', 'the embryo goes straight into the uterus: no oviduct needed']], size: 10.5 },
  workedH: 2.15,
  qc: 'Explain why a woman having IVF is first given injections of **FSH**.',
  notes: 'QUICK CHECK ANSWER: FSH stimulates eggs / follicles to mature (1); so several eggs mature and can be collected for fertilisation (1).\nB5.5.4 "explain the use of hormones in modern reproductive technologies to treat infertility" (HT, inferred: Oak lists "Using hormones to treat infertility" in its OCR Combined Higher programme only). An OCR B mark scheme found in search extracts credits FSH for stimulating the ovaries in IVF. Step 6: the embryo is drawn as a small dot in the uterus cavity. Embryos are usually transferred at 2–5 days (ball of cells / blastocyst). Mitosis link: B4.3 (recap only). "In vitro" means "in glass", i.e. outside the body.',
}), 'B5.5.4 Infertility and IVF (HT)');

// ======================= 17 EVALUATING IVF (HT) =======================
{
  const s = D.contentHeader('Evaluating IVF', `Specification ${sp('B5.5.4')} • success rate falls with age; benefits, risks and issues`, { tag: 'B5.5.4', ht: true });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'approximate UK (HFEA) figures, own eggs; drawn to scale');
  const g = { x: 1.45, y: 1.6, w: 5.0, h: 3.4, xmin: 0, xmax: 6, ymin: 0, ymax: 35, xstep: 1, ystep: 5, minor: 1, ylabel: 'births per embryo transferred / %', grid: true };
  // y-axis only (bar chart): draw axes with blank x tick labels
  D.box(s, g.x, g.y, g.w, g.h, C.white, null);
  for (let v = 0; v <= 35; v += 5) { line(s, g.x, D.py(g, v), g.x + g.w, D.py(g, v), v ? 'C5DCD9' : C.ink, v ? 0.5 : 1.5); label(s, g.x - 0.48, D.py(g, v) - 0.1, 0.4, String(v), { size: 10, h: 0.2, align: 'right' }); }
  line(s, g.x, g.y, g.x, g.y + g.h, C.ink, 1.5);
  label(s, g.x - 0.62 - g.h / 2, g.y + g.h / 2 - 0.14, g.h, g.ylabel, { size: 10.5, bold: true, rotate: 270 });
  IVF.forEach(([a, v], i) => {
    const x0 = D.px(g, i + 0.18), x1 = D.px(g, i + 0.82);
    box(s, x0, D.py(g, v), x1 - x0, D.py(g, 0) - D.py(g, v), i === 3 ? HC.lh[0] : '2F6DB5', null);
    label(s, x0 - 0.1, D.py(g, v) - 0.25, x1 - x0 + 0.2, String(v), { size: 10.5, bold: true, color: C.ink, h: 0.22 });
    label(s, D.px(g, i) , g.y + g.h + 0.05, D.px(g, i + 1) - D.px(g, i), a, { size: 10, h: 0.22 });
  });
  label(s, g.x, g.y + g.h + 0.3, g.w, 'age of woman / years', { size: 10.5, bold: true });
  D.workedSteps(s, 7.1, 1.3, 5.78, 2.15, 'Worked example: use the chart', '200 embryos are transferred to women aged 40–42. Estimate the number of births. Compare with under 35.', [
    ['Read', '40–42: 11 per 100 embryos'], ['Calculate', '200 × 11 ÷ 100 = 22 births (under 35: 64)'], ['Answer', `under-35s are about ${sf(ivfRatio, 2)} times as likely to succeed`]], { size: 10.5 });
  const rows = [[HDR('Benefits'), HDR('Risks and issues')],
    ['Infertile couples can have a child that is genetically theirs', 'Low success rate, especially for older women; may need several cycles'],
    ['Helps when oviducts are blocked or sperm count is low', 'Several embryos: risk of twins or triplets (risks to mother and babies)'],
    ['Embryos can be screened for some genetic disorders', 'Expensive; stressful; side effects of the hormones; spare embryos raise ethical questions']]
    .map((r, i) => i === 0 ? r : r.map(t => tcell(t, i)));
  s.addTable(rows, { x: 7.1, y: 3.6, w: 5.78, colW: [2.7, 3.08], rowH: [0.32, 0.72, 0.72, 0.72], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, '**150** embryos are transferred to women aged **38–39**. Estimate the number of births. Suggest **one** reason why clinics often transfer only **one** embryo.');
  D.notes(s, `QUICK CHECK ANSWER: 150 × 19 ÷ 100 = 28.5, so about 28–29 births (1). Transferring one embryo reduces the chance of multiple births (twins, triplets), which carry higher risks such as premature birth / low birth weight (1).\nData: approximate HFEA (UK) birth rates per embryo transferred, own fresh eggs, about 2019: under 35 32%, 35–37 25%, 38–39 19%, 40–42 11%, 43–44 5%, over 44 4% (values UNVERIFIED to the percent; the pattern of steep decline with age is well established). Node: 200 × 11% = 22; 200 × 32% = 64; ratio ${ivfRatio} ≈ ${sf(ivfRatio, 2)}.\nB5.5.4 is "explain the use of hormones": the evaluation is context for 6-mark questions (IaS: weighing benefits, risks and ethics). Ovarian hyperstimulation syndrome is a possible hormone side effect (stretch).`);
  reg(s, 'B5.5.4 Evaluating IVF (HT)');
}

// ======================= 18 RECAP 4 (HT) =======================
const R4 = D.recapSlide(4, `Specification ${sp('B5.5.4')} • fertility drugs and IVF`, [
  { q: 'Name **two** hormones given to women as **fertility drugs**.', marks: 2, ms: 'FSH (1); LH (1).' },
  { q: 'Describe the main stages of **IVF** after the eggs have matured.', marks: 3, ms: 'Eggs collected from the ovaries (1); fertilised with sperm in a dish / in the lab (1); embryos (grow and) are placed / implanted in the uterus (1).' },
  { q: 'IVF succeeds for **25** in every 100 embryos transferred to women aged 35–37. How many births would be expected from **200** embryos?', marks: 2, ms: '200 × 25 ÷ 100 (1); = 50 (1).' },
  { q: 'Give **one** risk of IVF.', marks: 1, ms: 'Any one (1): multiple births (twins / triplets); side effects of hormones; low success rate / stress; expensive.' },
], { ht: true });
reg(R4.s, 'Recap 4 (HT)');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Testosterone', 'Main male sex hormone, made in the testes; sperm production and male characteristics.'],
  ['Oestrogen', 'Main female sex hormone, made in the ovaries; builds the uterus lining.'],
  ['Progesterone', 'Ovary hormone (from the empty follicle) that keeps the uterus lining thick.'],
  ['FSH', 'Follicle-stimulating hormone (pituitary): makes an egg mature; ovary makes oestrogen.'],
  ['LH', 'Luteinising hormone (pituitary): causes ovulation.'],
  ['Puberty', 'When sex hormones cause the body to become sexually mature.'],
  ['Secondary sexual characteristics', 'Changes at puberty, e.g. breasts, facial hair, deeper voice.'],
  ['Menstrual cycle', 'About 28 days: egg matures and is released; uterus lining builds and breaks down.'],
  ['Menstruation', 'Breakdown and loss of the uterus lining (a period), days 0–5.'],
  ['Ovulation', 'Release of an egg from the ovary, about day 14.'],
  ['Follicle', 'Fluid-filled sac in the ovary in which an egg matures.'],
  ['Contraception', 'Methods used to prevent pregnancy.'],
  ['Barrier method', 'Contraception that stops sperm reaching the egg, e.g. condom, diaphragm.'],
  ['STI', 'Sexually transmitted infection; only condoms protect against them.'],
  ['Infertility', 'Being unable to become pregnant after trying for a long time (about a year).'],
  ['IVF', 'In vitro fertilisation: eggs fertilised by sperm outside the body; embryo put in the uterus.'],
], { notes: 'Use as a cover-and-recall activity. FSH/LH interactions (B5.5.2) and IVF (B5.5.4) are Higher tier (inferred).' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('Hormones control the menstrual cycle and can be used to control fertility.', [
  { l: 'a', q: 'Name the gland that makes:\n(i) FSH  (ii) oestrogen', marks: 2, ms: '(i) pituitary (gland) (1); (ii) ovary / ovaries (1).' },
  { l: 'b', q: 'Describe the role of **oestrogen** and of **LH** in the menstrual cycle.', marks: 2, ms: 'Oestrogen: makes the uterus lining build up / thicken / repair (1); LH: causes ovulation / release of an egg (1).' },
  { l: 'c', q: 'A woman has a 28-day cycle. On which day does she usually **ovulate**, and what happens to the **uterus lining** during days 0–5?', marks: 2, ms: 'About day 14 (1); the lining breaks down / is shed (menstruation / period) (1).' },
  { l: 'd', q: '400 women use the pill (7 in 100 fail a year) and 400 use condoms (13 in 100). Calculate how many **more** pregnancies occur with condoms. Give **one** reason a couple might still choose condoms.', marks: 3, ms: 'Pill 400 × 7 ÷ 100 = 28 and condoms 400 × 13 ÷ 100 = 52 (1); difference = 24 (1); reason: protect against STIs / no hormonal side effects / only used when needed (1).', h: 1.35 },
  { l: 'e', q: 'Explain how **progesterone** controls the release of other hormones in the second half of the cycle.', marks: 2, ht: true, ms: 'Progesterone inhibits FSH and LH (release from the pituitary) (1); so no more eggs mature / no further ovulation (in that cycle) (1).' },
  { l: 'f', q: 'Explain why women having **IVF** are given **FSH** injections.', marks: 2, ht: true, ms: 'FSH stimulates eggs / follicles to mature (1); so several eggs can be collected (and fertilised in the lab) (1).' },
], 13, { subtitle: `Specification ${sp('B5.5.1')}–${sp('B5.5.4')} • answer every part • 13 marks • (e) and (f) are Higher tier` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Hormonal (combined pill, progesterone-only pill, implant, injection, IUS): oestrogen / progesterone inhibit FSH and LH so no egg matures and there is no ovulation; progesterone thickens cervical mucus.',
    'Hormonal: very effective (implant about 0.1 in 100 per year; pill about 7 in 100 in typical use because pills are missed); implants and injections need no daily action.',
    'Hormonal: possible side effects (headaches, mood changes, irregular bleeding, small risk of blood clots); no protection against STIs.',
    'Non-hormonal barrier methods (condom, diaphragm): stop sperm reaching the egg; condoms protect against STIs; no hormonal side effects; used only when needed.',
    'Non-hormonal: less effective in typical use (condom about 13, diaphragm about 17 in 100); must be used correctly every time; can split.',
    'Other non-hormonal: copper IUD (very effective, lasts years); sterilisation (permanent, very effective); natural methods (no side effects but unreliable).',
    'Conclusion: the best method depends on the person, e.g. a condom plus a hormonal method gives high effectiveness and STI protection.',
  ], {
    l3: 'Explains how at least one hormonal method works AND evaluates hormonal and non-hormonal methods using several criteria (e.g. effectiveness with data, STIs, side effects, convenience), reaching a justified conclusion.',
    l2: 'Describes how a hormonal method works OR compares hormonal and non-hormonal methods on at least two criteria, with some evaluation.',
    l1: 'Gives simple points about one or more methods, e.g. "condoms stop STIs" or "the pill has side effects".',
  });
}
const HW = [
  { n: '1', q: 'What is **ovulation**?', marks: 1, ms: 'The release of an egg from an ovary (1).' },
  { n: '2', q: 'Name the hormone made by the **testes**, and give **one** change it causes at puberty.', marks: 2, ms: 'Testosterone (1); any one: sperm production / deeper voice / facial or body hair / muscle growth (1).' },
  { n: '3', q: 'Describe the role of **progesterone** in the menstrual cycle, and what happens when its level falls.', marks: 2, ms: 'Maintains / keeps the uterus lining thick (1); when it falls the lining breaks down / menstruation starts (1).' },
  { n: '4', q: 'Typical use: injection 4 in 100 women a year become pregnant; condoms 13 in 100. For **300** women using each, how many **more** pregnancies with condoms?', marks: 2, ms: 'Injection 12 and condoms 39 (1); 39 − 12 = 27 (1).' },
  { n: '5', q: 'Explain how high **oestrogen** levels lead to **ovulation**.', marks: 2, ht: true, ms: 'High oestrogen stimulates the pituitary to release LH / causes the LH surge (1); LH causes the egg to be released / ovulation (1).' },
  { n: '6', q: 'A woman does not ovulate because she makes too little FSH. Explain how **fertility drugs** could help.', marks: 2, ht: true, ms: 'Injections of FSH (and LH) (1); FSH makes eggs mature and LH causes ovulation, so she can become pregnant (1).', h: 1.1 },
  { n: '7', q: '**Evaluate** hormonal and non-hormonal methods of contraception. Explain how hormonal methods work and use data in your answer.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q5 and Q6 are Higher tier. Q7 is a 6-mark extended answer: use the chart on slide 14.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 8); assert.strictEqual(R4.total, 8);
const out = path.join(__dirname, 'OCR21C_B5.5_ReproductiveHormones_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
